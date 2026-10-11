// ERD course integrity + layout lint.  usage: node tools/erd_check.js
// Loads erd.js + erd/course.js + erd/levels/*.js the way the browser does, then checks:
//  data: level/question ids unique, correctId/acceptedIds ∈ options, {opt:x} refs valid,
//        every question has a diagram (ctx.erd) unless noDiagram:true, 5–12 questions per level
//  diagrams: node ids unique, edge endpoints / attr owners exist, every shape inside the
//        canvas, no two shapes overlapping (aggregation boxes may contain shapes)
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
global.window = globalThis;
const load = f => (0, eval)(fs.readFileSync(path.join(ROOT, f), "utf8"));
load("erd.js"); load("courses.js");
const lvDir = path.join(ROOT, "erd", "levels");
const files = fs.readdirSync(lvDir).filter(f => /^L\d+\.js$/.test(f)).sort();
files.forEach(f => load("erd/levels/" + f));
const LV = window.ERD_COURSE, size = window.ERD._size;

let bad = 0, warn = 0;
const err = (...a) => { console.log("ERROR", ...a); bad++; };
const wrn = (...a) => { console.log("warn ", ...a); warn++; };

function lintDiagram(where, spec){
  const N = {};
  (spec.nodes || []).forEach(n => {
    if (N[n.id]) err(where, "duplicate node id", n.id);
    N[n.id] = n;
    if (!["entity", "rel", "attr", "isa", "agg", "note"].includes(n.t)) err(where, "unknown node type", n.id, n.t);
  });
  const W = spec.w || 600, H = spec.h || 300;
  const box = n => { const s = size(n); return { n, x1: n.x - s.hw, x2: n.x + s.hw, y1: n.y - s.hh, y2: n.y + s.hh }; };
  const boxes = Object.values(N).map(box);
  boxes.forEach(b => {
    if (b.x1 < 2 || b.y1 < 2 || b.x2 > W - 2 || b.y2 > H - 2)
      err(where, `node ${b.n.id} (${b.n.label || b.n.t}) outside canvas ${W}x${H}:`, [b.x1, b.y1, b.x2, b.y2].map(Math.round).join(","));
  });
  // overlap: shrink ellipses / diamonds a little (their bbox corners are empty)
  const shrink = n => n.t === "attr" || n.t === "rel" ? .78 : n.t === "isa" ? .8 : 1;
  const solid = boxes.filter(b => b.n.t !== "agg");
  for (let i = 0; i < solid.length; i++) for (let j = i + 1; j < solid.length; j++){
    const a = solid[i], b = solid[j], ka = shrink(a.n), kb = shrink(b.n);
    const ax = (a.x2 - a.x1) / 2 * ka, ay = (a.y2 - a.y1) / 2 * ka, bx = (b.x2 - b.x1) / 2 * kb, by = (b.y2 - b.y1) / 2 * kb;
    if (Math.abs(a.n.x - b.n.x) < ax + bx + 4 && Math.abs(a.n.y - b.n.y) < ay + by + 4)
      err(where, `overlap: ${a.n.id} (${a.n.label || a.n.t}) × ${b.n.id} (${b.n.label || b.n.t})`);
  }
  // shapes straddling an aggregation border
  boxes.filter(b => b.n.t === "agg").forEach(g => solid.forEach(b => {
    const inside = b.x1 >= g.x1 && b.x2 <= g.x2 && b.y1 >= g.y1 && b.y2 <= g.y2;
    const outside = b.x2 <= g.x1 || b.x1 >= g.x2 || b.y2 <= g.y1 || b.y1 >= g.y2;
    if (!inside && !outside) err(where, `node ${b.n.id} straddles aggregation ${g.n.id}`);
  }));
  Object.values(N).forEach(n => { if (n.t === "attr" && (!n.of || !N[n.of])) err(where, "attr without valid owner", n.id, n.of); });
  (spec.edges || []).forEach((e, i) => {
    if (!N[e.a] || !N[e.b]) err(where, `edge #${i} endpoint missing: ${e.a} → ${e.b}`);
    if (e.arrow && N[e.b] && !["entity", "agg"].includes(N[e.b].t)) wrn(where, `edge #${i} arrow points at a ${N[e.b].t} (${e.b}), expected entity/agg`);
  });
  try { window.renderERD(JSON.parse(JSON.stringify(spec))); } catch (e) { err(where, "render threw", e.message); }
}

const lvIds = new Set(), qIds = new Set(), orders = new Set();
let nq = 0, nd = 0;
LV.forEach(L => {
  const W = L.id || "(level?)";
  if (lvIds.has(L.id)) err(W, "duplicate level id"); lvIds.add(L.id);
  if (orders.has(L.order)) err(W, "duplicate order", L.order); orders.add(L.order);
  ["title", "goal"].forEach(k => { if (!L[k]) err(W, "missing", k); });
  if (!L.lesson || !L.lesson.html) err(W, "missing lesson.html");
  ((L.lesson && L.lesson.figs) || []).forEach((f, i) => { nd++; lintDiagram(`${W} lesson fig ${i}`, f.erd); });
  const qs = L.questions || [];
  if (qs.length < 5 || qs.length > 12) err(W, `has ${qs.length} questions (want 5–12)`);
  qs.forEach(q => {
    nq++;
    const w = q.id || W + "(q?)";
    if (qIds.has(q.id)) err(w, "duplicate question id"); qIds.add(q.id);
    if (!q.question) err(w, "missing question");
    if (!q.explanation || q.explanation.length < 25) err(w, "missing/short explanation");
    const ids = (q.options || []).map(o => o.id);
    if (ids.length < 3) err(w, "fewer than 3 options");
    if (new Set(ids).size !== ids.length) err(w, "duplicate option ids");
    if (!ids.includes(q.correctId)) err(w, "correctId not in options:", q.correctId);
    (q.acceptedIds || []).forEach(a => { if (!ids.includes(a)) err(w, "acceptedIds unknown", a); });
    (q.options || []).forEach(o => {
      if (!["text", "schema", "erd", "code", "algebra"].includes(o.type || "text")) err(w, "bad option type", o.type);
      if (o.type === "erd") { nd++; lintDiagram(`${w} opt ${o.id}`, o.value); }
      else if (typeof o.value !== "string" || !o.value.trim()) err(w, "empty option", o.id);
      String(o.value).replace(/\{opt:([a-z])\}/g, (m, id) => { if (!ids.includes(id)) err(w, "{opt:} ref unknown", id); });
    });
    const vals = (q.options || []).map(o => typeof o.value === "string" ? o.value.trim() : JSON.stringify(o.value));
    if (new Set(vals).size !== vals.length) err(w, "two options have identical text");
    if (q.ctx && q.ctx.erd) { nd++; lintDiagram(w, q.ctx.erd); }
    else if (!q.noDiagram) err(w, "no diagram (set noDiagram:true if intended)");
  });
});
console.log(`\n${LV.length} levels · ${nq} questions · ${nd} diagrams · ${bad} errors · ${warn} warnings`);
LV.forEach(L => console.log(`  ${L.id}  ${String(L.questions.length).padStart(2)} Q  ${L.title}`));
process.exit(bad ? 1 : 0);
