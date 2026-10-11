"use strict";
/* ERD renderer — Chen notation, the way the course exams draw it.
   window.renderERD(spec) -> "<svg …>" string; window.ERD.finish(root) fixes key underlines
   once the SVG is in the DOM (text widths can only be measured there).

   spec = { w, h, nodes:[…], edges:[…] }           (coordinates are the SVG viewBox, px)
   nodes:
     {id, t:"entity",  x, y, label, weak?, w?}       rectangle (weak → double rectangle)
     {id, t:"rel",     x, y, label, ident?, w?}      diamond (ident → double diamond)
     {id, t:"attr",    x, y, label, of, key?, partial?, multi?, derived?, w?}
         ellipse; `of` = owner node id (entity / rel / composite parent attr) → edge drawn
         key → solid underline · partial → dashed underline · multi → double · derived → dashed
     {id, t:"isa",     x, y, label?}                 triangle, apex up (parent above it)
     {id, t:"agg",     x, y, w, h, label?}           aggregation box (x,y = centre)
     {id, t:"note",    x, y, label}                  free text
   edges: {a, b, arrow?, total?, label?, pts?:[[x,y],…]}
     arrow → arrowhead at b (draw a=relation, b=entity) · total → double line (total participation)
     label → "(1,2)" / role name, drawn near b · pts → bend points (recursive relationships)
   any node / edge may carry hl:true to highlight it (used by the lessons).             */
(function(){
  const NS = "http://www.w3.org/2000/svg";
  const esc = s => String(s).replace(/[&<>"]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]));
  const he = s => /[֐-׿]/.test(String(s));
  const FS = 14;                                     // label font size
  // rough text width before the DOM can measure it (only used to size shapes)
  function textW(s, fs){
    let w = 0;
    for (const ch of String(s)) w += /[֐-׿]/.test(ch) ? .62 : /[A-Z0-9_]/.test(ch) ? .66 : /\s/.test(ch) ? .3 : .55;
    return w * (fs || FS);
  }
  const lines = s => String(s == null ? "" : s).split("\n");
  const widest = s => Math.max(...lines(s).map(l => textW(l)));

  function size(n){
    const L = lines(n.label).length;
    if (n.t === "entity") return { hw: (n.w || Math.max(74, widest(n.label) + 30)) / 2, hh: (n.h || 22 + L * 18) / 2 };
    if (n.t === "rel")    return { hw: (n.w || Math.max(84, widest(n.label) * 1.25 + 46)) / 2, hh: (n.h || 30 + L * 18) / 2 };
    if (n.t === "attr")   return { hw: (n.w || Math.max(66, widest(n.label) + 30)) / 2, hh: (n.h || 18 + L * 17) / 2 };
    if (n.t === "isa")    return { hw: 30, hh: 20 };
    if (n.t === "agg")    return { hw: n.w / 2, hh: n.h / 2 };
    return { hw: widest(n.label) / 2, hh: 10 };
  }

  // distance from the centre to the shape's border along unit vector (ux,uy)
  function reach(n, ux, uy){
    const { hw, hh } = n._s;
    const ax = Math.abs(ux), ay = Math.abs(uy);
    if (n.t === "rel")  return 1 / (ax / hw + ay / hh);
    if (n.t === "attr") return 1 / Math.sqrt((ux / hw) ** 2 + (uy / hh) ** 2);
    if (n.t === "isa"){
      // apex up: lines leaving upward start at the apex, others at the base / sides
      if (uy < 0 && ay > ax * .6) return hh / ay;
      return Math.min(ax ? hw / ax : 1e9, ay ? hh / ay : 1e9);
    }
    return Math.min(ax ? hw / ax : 1e9, ay ? hh / ay : 1e9);
  }
  function border(n, tx, ty){
    const dx = tx - n.x, dy = ty - n.y, d = Math.hypot(dx, dy) || 1;
    const r = reach(n, dx / d, dy / d);
    return [n.x + dx / d * r, n.y + dy / d * r];
  }

  function textSvg(n, cls, dy){
    const ls = lines(n.label), lh = 17, y0 = n.y - (ls.length - 1) * lh / 2 + (dy || 0);
    const dir = he(n.label) ? ' direction="rtl"' : "";
    return ls.map((l, i) =>
      `<text class="${cls}" x="${n.x}" y="${y0 + i * lh}" text-anchor="middle" dominant-baseline="central"${dir}` +
      (n.key || n.partial ? ` data-ul="${n.partial ? "d" : "s"}"` : "") + `>${esc(l)}</text>`).join("");
  }

  function nodeSvg(n){
    const { hw, hh } = n._s, x = n.x, y = n.y, hl = n.hl ? " hl" : "";
    if (n.t === "entity"){
      let s = `<rect class="erd-shape${hl}" x="${x - hw}" y="${y - hh}" width="${hw * 2}" height="${hh * 2}"/>`;
      if (n.weak) s += `<rect class="erd-shape inner${hl}" x="${x - hw + 4}" y="${y - hh + 4}" width="${hw * 2 - 8}" height="${hh * 2 - 8}"/>`;
      return `<g class="erd-node erd-entity">${s}${textSvg(n, "erd-label strong")}</g>`;
    }
    if (n.t === "rel"){
      const pts = (k) => `${x},${y - hh + k} ${x + hw - k * 1.6},${y} ${x},${y + hh - k} ${x - hw + k * 1.6},${y}`;
      let s = `<polygon class="erd-shape${hl}" points="${pts(0)}"/>`;
      if (n.ident) s += `<polygon class="erd-shape inner${hl}" points="${pts(5)}"/>`;
      return `<g class="erd-node erd-rel">${s}${textSvg(n, "erd-label strong")}</g>`;
    }
    if (n.t === "attr"){
      const cls = "erd-shape" + (n.derived ? " dashed" : "") + hl;
      let s = `<ellipse class="${cls}" cx="${x}" cy="${y}" rx="${hw}" ry="${hh}"/>`;
      if (n.multi) s += `<ellipse class="erd-shape inner${hl}" cx="${x}" cy="${y}" rx="${hw - 4}" ry="${hh - 4}"/>`;
      return `<g class="erd-node erd-attr">${s}${textSvg(n, "erd-label")}</g>`;
    }
    if (n.t === "isa"){
      return `<g class="erd-node erd-isa"><polygon class="erd-shape${hl}" points="${x},${y - hh} ${x + hw},${y + hh} ${x - hw},${y + hh}"/>` +
        `<text class="erd-label small" x="${x}" y="${y + 6}" text-anchor="middle" dominant-baseline="central">${esc(n.label || "ISA")}</text></g>`;
    }
    if (n.t === "agg"){
      const lbl = n.label ? `<text class="erd-label agg" x="${x - hw + 10}" y="${y - hh + 15}" text-anchor="start" dominant-baseline="central" direction="ltr">${esc(n.label)}</text>` : "";
      return `<g class="erd-node erd-agg"><rect class="erd-shape agg${hl}" x="${x - hw}" y="${y - hh}" width="${hw * 2}" height="${hh * 2}"/>${lbl}</g>`;
    }
    return `<g class="erd-node erd-note">${textSvg(n, "erd-label note")}</g>`;
  }

  function seg(x1, y1, x2, y2, cls){ return `<line class="${cls}" x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}"/>`; }
  const r = v => Math.round(v * 10) / 10;

  function edgeSvg(e, N){
    const A = N[e.a], B = N[e.b];
    if (!A || !B) return "";
    const via = e.pts || [];
    const first = via[0] || [B.x, B.y], last = via[via.length - 1] || [A.x, A.y];
    const p = [border(A, first[0], first[1]), ...via, border(B, last[0], last[1])];
    // aggregation boxes: the line touches the box edge, never crosses into it
    const cls = "erd-edge" + (e.hl ? " hl" : "");
    let s = "";
    // stop the line short of an arrowhead so the tip stays sharp
    const n = p.length;
    if (e.arrow){
      const [px, py] = p[n - 2], [qx, qy] = p[n - 1], d = Math.hypot(qx - px, qy - py) || 1;
      p[n - 1] = [qx - (qx - px) / d * 9, qy - (qy - py) / d * 9];
      p._tip = [qx, qy, (qx - px) / d, (qy - py) / d];
    }
    for (let i = 0; i < n - 1; i++){
      const [x1, y1] = p[i], [x2, y2] = p[i + 1];
      if (e.total){
        const d = Math.hypot(x2 - x1, y2 - y1) || 1, ox = -(y2 - y1) / d * 2.4, oy = (x2 - x1) / d * 2.4;
        s += seg(x1 + ox, y1 + oy, x2 + ox, y2 + oy, cls) + seg(x1 - ox, y1 - oy, x2 - ox, y2 - oy, cls);
      } else s += seg(x1, y1, x2, y2, cls);
    }
    if (p._tip){
      const [tx, ty, ux, uy] = p._tip, L = 12, W = 6;
      const bx = tx - ux * L, by = ty - uy * L;
      s += `<polygon class="erd-arrow${e.hl ? " hl" : ""}" points="${r(tx)},${r(ty)} ${r(bx - uy * W)},${r(by + ux * W)} ${r(bx + uy * W)},${r(by - ux * W)}"/>`;
    }
    if (e.label){
      // near the b end, pushed off the line
      const [x1, y1] = p[n - 2], [x2, y2] = p._tip ? [p._tip[0], p._tip[1]] : p[n - 1];
      const d = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / d, uy = (y2 - y1) / d;
      // clear the line by the label's own half-extent along the perpendicular (long role names)
      const tw = textW(e.label, 12), px = -uy, py = ux;
      const off = 9 + Math.abs(px) * tw / 2 + Math.abs(py) * 8;
      const back = Math.min(26 + Math.abs(ux) * tw / 2, d * .45);
      const side = e.labelSide === -1 ? -1 : 1;
      const lx = x2 - ux * back + px * off * side, ly = y2 - uy * back + py * off * side;
      const dir = he(e.label) ? ' direction="rtl"' : "";
      s += `<text class="erd-label elabel" x="${r(lx)}" y="${r(ly)}" text-anchor="middle" dominant-baseline="central"${dir}>${esc(e.label)}</text>`;
    }
    return `<g class="erd-e">${s}</g>`;
  }

  function renderERD(spec){
    const nodes = spec.nodes || [], N = {};
    nodes.forEach(n => { n._s = size(n); N[n.id] = n; });
    const edges = [];
    nodes.forEach(n => { if (n.t === "attr" && n.of) edges.push({ a: n.id, b: n.of, hl: n.hl }); });
    (spec.edges || []).forEach(e => edges.push(e));
    const order = ["agg", "note", "isa", "rel", "entity", "attr"];
    const body =
      nodes.filter(n => n.t === "agg").map(nodeSvg).join("") +
      edges.map(e => edgeSvg(e, N)).join("") +
      nodes.filter(n => n.t !== "agg").sort((a, b) => order.indexOf(a.t) - order.indexOf(b.t)).map(nodeSvg).join("");
    const w = spec.w || 600, h = spec.h || 300;
    return `<svg class="erd-svg" xmlns="${NS}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"` +
      ` aria-label="${esc(spec.alt || "תרשים ERD")}" style="max-width:${w}px">${body}</svg>`;
  }

  // underline key / partial-key labels with their real rendered width
  function finish(root){
    (root || document).querySelectorAll(".erd-svg text[data-ul]").forEach(t => {
      if (t.dataset.done) return;
      let len = 0; try { len = t.getComputedTextLength(); } catch (e) {}
      if (!len) return;
      const x = +t.getAttribute("x"), y = +t.getAttribute("y") + 9;
      const l = document.createElementNS(NS, "line");
      l.setAttribute("x1", x - len / 2); l.setAttribute("x2", x + len / 2);
      l.setAttribute("y1", y); l.setAttribute("y2", y);
      l.setAttribute("class", "erd-ul" + (t.dataset.ul === "d" ? " dashed" : ""));
      t.parentNode.appendChild(l);
      t.dataset.done = "1";
    });
  }

  window.renderERD = renderERD;
  window.ERD = { render: renderERD, finish, _size: size };
})();
