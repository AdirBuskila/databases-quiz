// Shared data lint for course levels (used by norm_check.js / alg_check.js).
// lint(levels, {types, minQ, maxQ}) → error count, printing each problem.
module.exports = function lint(LV, opts){
  const types = new Set(opts.types || ["text", "code", "schema", "algebra"]);
  const minQ = opts.minQ || 5, maxQ = opts.maxQ || 12;
  let bad = 0; const err = (...a) => { console.log("ERROR", ...a); bad++; };
  const lvIds = new Set(), qIds = new Set(), orders = new Set();
  LV.forEach(L => {
    const W = L.id;
    if (lvIds.has(L.id)) err(W, "duplicate level id"); lvIds.add(L.id);
    if (orders.has(L.order)) err(W, "duplicate order"); orders.add(L.order);
    ["title", "goal"].forEach(k => { if (!L[k]) err(W, "missing", k); });
    if (!L.lesson || !L.lesson.html) err(W, "missing lesson.html");
    const qs = L.questions || [];
    if (qs.length < minQ || qs.length > maxQ) err(W, `has ${qs.length} questions (want ${minQ}–${maxQ})`);
    qs.forEach(q => {
      const w = q.id;
      if (qIds.has(q.id)) err(w, "duplicate question id"); qIds.add(q.id);
      if (!q.question) err(w, "missing question");
      if (!q.explanation || q.explanation.length < 25) err(w, "missing/short explanation");
      const ids = (q.options || []).map(o => o.id);
      if (ids.length < 3) err(w, "fewer than 3 options");
      if (new Set(ids).size !== ids.length) err(w, "duplicate option ids");
      if (!ids.includes(q.correctId)) err(w, "correctId not in options:", q.correctId);
      (q.acceptedIds || []).forEach(a => { if (!ids.includes(a)) err(w, "acceptedIds unknown", a); });
      (q.options || []).forEach(o => {
        if (!types.has(o.type || "text")) err(w, "bad option type", o.type);
        if (typeof o.value !== "string" || !o.value.trim()) err(w, "empty option", o.id);
        String(o.value).replace(/\{opt:([a-z])\}/g, (m, id) => { if (!ids.includes(id)) err(w, "{opt:} ref unknown", id); });
      });
      const vals = (q.options || []).map(o => String(o.value).trim());
      if (new Set(vals).size !== vals.length) err(w, "two options have identical text");
      if (/SQLite|verify|checker/i.test(q.explanation || "")) err(w, "explanation mentions tooling");
    });
  });
  return bad;
};
