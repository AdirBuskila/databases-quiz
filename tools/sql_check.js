// SQL course integrity + execution check.   usage: node tools/sql_check.js [S03] [--show]
// Loads courses.js + sql/levels/*.js the way the browser does, then:
//  data: level/question ids unique, correctId ∈ options, {opt:x} refs valid, 5–12 questions per level
//  run (SQLite in memory, via python tools/sql_run.py) — needs sample rows:
//   · lesson figs with {tables (with rows), sql, result}: running sql on tables must give result
//   · question.verify = { ref:"SQL", same:[optIds], differ:[optIds], db?:[tables] }
//       every `same` option must return exactly ref's rows; every `differ` option must return
//       different rows or fail to run. db = verify.db || question.db || ctx.tables (shown) || level.db
//   · question.verify = { sql:"SQL", expect:[[…],…] }  → sql must return exactly these rows
//   rows compare as multisets unless the SQL has ORDER BY. SQLite has no ALL/ANY/CONTAINS:
//   leave those options out of same/differ (they're checked by review, not here).
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
global.window = globalThis;
const load = f => (0, eval)(fs.readFileSync(path.join(ROOT, f), "utf8"));
load("courses.js");
const dir = path.join(ROOT, "sql", "levels");
fs.readdirSync(dir).filter(f => /^S\d+\.js$/.test(f)).sort().forEach(f => load("sql/levels/" + f));
const args = process.argv.slice(2), only = args.find(a => /^S\d+$/.test(a)), show = args.includes("--show");
const LV = window.SQL_COURSE.filter(L => !only || L.id === only);

let bad = 0, runs = 0;
const err = (...a) => { console.log("ERROR", ...a); bad++; };
const note = (...a) => { if (show) console.log("      ", ...a); };

// queries run in Python's sqlite3 (tools/sql_run.py): rows come back as tuples, so duplicate
// column names (SELECT E1.name, E2.name) stay two columns
const { spawnSync } = require("child_process");
function run(tables, sql){
  const p = spawnSync("python", ["-I", path.join(__dirname, "sql_run.py")], { input: JSON.stringify({ tables: tables || [], sql }), encoding: "utf8" });
  runs++;
  try { return JSON.parse(p.stdout); } catch (e) { return { error: "runner: " + (p.stderr || p.error || "no output") }; }
}
const norm = v => v === null || v === undefined || v === "NULL" ? "∅" : typeof v === "number" ? String(Math.round(v * 1e6) / 1e6) : String(v);
function same(a, b, ordered){
  if (a.length !== b.length) return false;
  const ka = a.map(r => r.map(norm).join("|")), kb = b.map(r => r.map(norm).join("|"));
  if (!ordered){ ka.sort(); kb.sort(); }
  return ka.every((k, i) => k === kb[i]);
}
const fmt = r => r.error ? "ERR " + r.error : `${r.rows.length} rows ` + JSON.stringify(r.rows.slice(0, 6));
const codeOf = (q, id) => { const o = (q.options || []).find(o => o.id === id); return o && o.value; };

const lvIds = new Set(), qIds = new Set(), orders = new Set();
let nq = 0, nv = 0;
LV.forEach(L => {
  const W = L.id;
  if (lvIds.has(L.id)) err(W, "duplicate level id"); lvIds.add(L.id);
  if (orders.has(L.order)) err(W, "duplicate order"); orders.add(L.order);
  ["title", "goal"].forEach(k => { if (!L[k]) err(W, "missing", k); });
  if (!L.lesson || !L.lesson.html) err(W, "missing lesson.html");
  ((L.lesson && L.lesson.figs) || []).forEach((f, i) => {
    if (f.sql && f.tables && f.result){
      nv++;
      const r = run(f.tables, f.sql);
      if (r.error) err(`${W} fig ${i}`, "sql failed:", r.error);
      else if (!same(r.rows, f.result.rows || [], /order\s+by/i.test(f.sql))) err(`${W} fig ${i}`, "result table ≠ actual:", JSON.stringify(r.rows));
      else note(`${W} fig ${i} ✓`);
    }
  });
  const qs = L.questions || [];
  if (qs.length < 5 || qs.length > 12) err(W, `has ${qs.length} questions (want 5–12)`);
  qs.forEach(q => {
    nq++;
    const w = q.id;
    if (qIds.has(q.id)) err(w, "duplicate question id"); qIds.add(q.id);
    if (!q.question) err(w, "missing question");
    if (!q.explanation || q.explanation.length < 25) err(w, "missing/short explanation");
    const ids = (q.options || []).map(o => o.id);
    if (ids.length < 3) err(w, "fewer than 3 options");
    if (new Set(ids).size !== ids.length) err(w, "duplicate option ids");
    if (!ids.includes(q.correctId)) err(w, "correctId not in options:", q.correctId);
    (q.options || []).forEach(o => {
      if (!["text", "code", "schema", "algebra"].includes(o.type || "text")) err(w, "bad option type", o.type);
      if (typeof o.value !== "string" || !o.value.trim()) err(w, "empty option", o.id);
      String(o.value).replace(/\{opt:([a-z])\}/g, (m, id) => { if (!ids.includes(id)) err(w, "{opt:} ref unknown", id); });
    });
    const vals = (q.options || []).map(o => String(o.value).trim());
    if (new Set(vals).size !== vals.length) err(w, "two options have identical text");
    const v = q.verify; if (!v) return;
    const tables = v.db || q.db || (q.ctx && q.ctx.tables) || L.db;   // the data the student sees wins over the hidden level data
    if (!tables) { err(w, "verify without data"); return; }
    nv++;
    if (v.sql && v.expect){
      const r = run(tables, v.sql);
      if (r.error) err(w, "verify.sql failed:", r.error);
      else if (!same(r.rows, v.expect, /order\s+by/i.test(v.sql))) err(w, "verify.expect ≠ actual", JSON.stringify(r.rows));
      else note(`${w} expect ✓`, fmt(r));
    }
    if (v.ref){
      const R = run(tables, v.ref);
      if (R.error) { err(w, "verify.ref failed:", R.error); return; }
      note(`${w} ref`, fmt(R));
      if (!R.rows.length) err(w, "ref returns 0 rows: data can't tell options apart");
      const ordered = /order\s+by/i.test(v.ref);
      (v.same || []).forEach(id => {
        const sql = id === "@code" ? q.code : codeOf(q, id); if (!sql) return err(w, "verify.same unknown option", id);
        const r = run(tables, sql);
        if (r.error) err(w, `option ${id} should equal ref but fails:`, r.error);
        else if (!same(r.rows, R.rows, ordered)) err(w, `option ${id} should equal ref:`, fmt(r), " vs ref ", fmt(R));
        else note(`${w} ${id} = ref ✓`);
      });
      (v.differ || []).forEach(id => {
        const sql = codeOf(q, id); if (!sql) return err(w, "verify.differ unknown option", id);
        const r = run(tables, sql);
        if (!r.error && same(r.rows, R.rows, ordered)) err(w, `option ${id} should differ from ref on this data but returns the same rows:`, fmt(r));
        else note(`${w} ${id} ≠ ref ✓`, fmt(r));
      });
    }
  });
});
console.log(`\n${LV.length} levels · ${nq} questions · ${nv} executed checks (${runs} SQL runs) · ${bad} errors`);
LV.forEach(L => console.log(`  ${L.id}  ${String(L.questions.length).padStart(2)} Q  ${String(L.questions.filter(q => q.verify).length).padStart(2)} verified  ${L.title}`));
process.exit(bad ? 1 : 0);
