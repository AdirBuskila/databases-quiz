// Relational-algebra course: data lint + every `verify` evaluated by tools/ralib.js on sample tables.
// usage: node tools/alg_check.js [A03] [--show]
// data = verify.db || question.db || ctx.tables (shown) || level.db. A question's verify is one or more of:
//   {expr:"Π_{…}…", expect:[[…],…]}           the expression returns exactly these rows (any order)
//   {expr:"…", rows:4, cols:3}                  only the size
//   {ref:"…", same:[ids], differ:[ids], invalid:[ids]}
//       options (their algebra text) in `same` return ref's rows; `differ` return other rows or are
//       invalid; `invalid` must fail (unknown column, ÷ with a bad divisor, incompatible ∪/−/∩)
//   template:"… ____ …" on a ref check: each option is pasted into the blank before evaluating
const fs = require("fs"), path = require("path");
const { evaluate } = require("./ralib.js"), lint = require("./course_lint.js");
const ROOT = path.join(__dirname, "..");
global.window = globalThis;
const load = f => (0, eval)(fs.readFileSync(path.join(ROOT, f), "utf8"));
load("courses.js");
const dir = path.join(ROOT, "alg", "levels");
fs.readdirSync(dir).filter(f => /^A\d+\.js$/.test(f)).sort().forEach(f => load("alg/levels/" + f));
const args = process.argv.slice(2), only = args.find(a => /^A\d+$/.test(a)), show = args.includes("--show");
const LV = (window.COURSES.alg || { levels: [] }).levels.filter(L => !only || L.id === only);
let bad = lint(LV, { types: ["text", "algebra", "schema", "code"] }), nv = 0;
const err = (...a) => { console.log("ERROR", ...a); bad++; };
const keyOf = rows => rows.map(r => JSON.stringify(r.map(v => typeof v === "number" ? v : String(v)))).sort().join("\n");
const run = (src, db) => { try { return { r: evaluate(src, db) }; } catch (e) { return { error: e.message }; } };
const fmt = x => x.error ? "ERR " + x.error : `${x.r.rows.length} rows ` + JSON.stringify(x.r.rows.slice(0, 6));
let nq = 0;
LV.forEach(L => {
  ((L.lesson && L.lesson.figs) || []).forEach((f, i) => {
    if (!(f.alg && f.tables && f.result)) return;
    nv++;
    const x = run(f.alg, f.tables);
    if (x.error) err(`${L.id} fig ${i}`, "expression fails:", x.error);
    else if (keyOf(x.r.rows) !== keyOf(f.result.rows || [])) err(`${L.id} fig ${i}`, "result table ≠ actual", JSON.stringify(x.r.rows));
    else if (show) console.log("   ", L.id, "fig", i, "✓");
  });
  L.questions.forEach(q => {
    nq++;
    if (!q.verify) return;
    const db = (q.verify.db) || q.db || (q.ctx && q.ctx.tables) || L.db;
    [].concat(q.verify).forEach(v => {
      const data = v.db || db;
      if (!data){ err(q.id, "verify without data"); return; }
      nv++;
      if (v.expr){
        const x = run(v.expr, data);
        if (x.error) return err(q.id, "verify.expr fails:", x.error);
        if (v.expect && keyOf(x.r.rows) !== keyOf(v.expect)) err(q.id, "verify.expect ≠ actual", JSON.stringify(x.r.rows));
        if (v.rows != null && x.r.rows.length !== v.rows) err(q.id, `rows ${x.r.rows.length} ≠ ${v.rows}`);
        if (v.cols != null && x.r.cols.length !== v.cols) err(q.id, `cols ${x.r.cols.length} ≠ ${v.cols}`);
        if (show) console.log("   ", q.id, "expr", fmt(x));
      }
      if (v.ref){
        const R = run(v.ref, data);
        if (R.error) return err(q.id, "verify.ref fails:", R.error);
        if (show) console.log("   ", q.id, "ref", fmt(R));
        const optSrc = id => { const o = q.options.find(o => o.id === id); if (!o) return null; return v.template ? v.template.replace(/_{3,}(\([^)]*\))?_*/, o.value) : o.value; };
        (v.same || []).forEach(id => { const s = optSrc(id); if (s == null) return err(q.id, "unknown option", id);
          const x = run(s, data); if (x.error) err(q.id, `option ${id} should equal ref but fails:`, x.error);
          else if (keyOf(x.r.rows) !== keyOf(R.r.rows)) err(q.id, `option ${id} should equal ref:`, fmt(x), "vs", fmt(R)); else if (show) console.log("     ", id, "= ref ✓"); });
        (v.differ || []).forEach(id => { const s = optSrc(id); if (s == null) return err(q.id, "unknown option", id);
          const x = run(s, data); if (!x.error && keyOf(x.r.rows) === keyOf(R.r.rows)) err(q.id, `option ${id} should differ but returns the same rows:`, fmt(x)); else if (show) console.log("     ", id, "≠ ref ✓", fmt(x)); });
        (v.invalid || []).forEach(id => { const s = optSrc(id); if (s == null) return err(q.id, "unknown option", id);
          const x = run(s, data); if (!x.error) err(q.id, `option ${id} should be invalid but evaluates:`, fmt(x)); else if (show) console.log("     ", id, "invalid ✓", x.error); });
      }
    });
  });
});
console.log(`\n${LV.length} levels · ${nq} questions · ${nv} evaluated checks · ${bad} errors`);
LV.forEach(L => console.log(`  ${L.id}  ${String(L.questions.length).padStart(2)} Q  ${String(L.questions.filter(q => q.verify).length).padStart(2)} verified  ${L.title}`));
process.exit(bad ? 1 : 0);
