// Normalization course: data lint + every `verify` fact recomputed by the FD engine (tools/fdlib.js).
// usage: node tools/norm_check.js [N03] [--show]
// R and F come from the question's ctx.algebra lines ("R = (A, B, …)", "F = {A → B, …}") unless a
// check gives its own R / F. A question's verify is one check or an array of checks:
//   {closure:"A", is:"ABE"}            {keys:true, is:["AC"]}         (all candidate keys, any order)
//   {superkey:"BFE", is:true}          {candidate:"BC", is:false}    {implies:"EC→D", is:true}
//   {nf:"R", is:"3NF"} / {nf:"BCE", is:"BCNF"}   (a component is judged on the projection of F)
//   {lossless:["AB","BC"], is:false}  {preserves:["AB","BC"], is:true}
//   {extraneous:"AE→C", is:["L:E"]}   {extraneous:"all", is:["AE→C L:E"]}   (is:[] = none)
//   {equiv:"{A→B, …}", is:true}       {mincover:"{…}", is:true}
//   {instance:true, holds:"P1 P3 → P2", is:false}   (uses ctx.tables[0])
const fs = require("fs"), path = require("path");
const L = require("./fdlib.js"), lint = require("./course_lint.js");
const ROOT = path.join(__dirname, "..");
global.window = globalThis;
const load = f => (0, eval)(fs.readFileSync(path.join(ROOT, f), "utf8"));
load("courses.js");
const dir = path.join(ROOT, "norm", "levels");
fs.readdirSync(dir).filter(f => /^N\d+\.js$/.test(f)).sort().forEach(f => load("norm/levels/" + f));
const args = process.argv.slice(2), only = args.find(a => /^N\d+$/.test(a)), show = args.includes("--show");
const LV = (window.COURSES.norm || { levels: [] }).levels.filter(Lv => !only || Lv.id === only);
let bad = lint(LV, { types: ["text", "algebra", "schema"] }), nv = 0;
const err = (...a) => { console.log("ERROR", ...a); bad++; };
const eqSet = (a, b) => JSON.stringify([...a].map(String).sort()) === JSON.stringify([...b].map(String).sort());

function ctxRF(q){
  const lines = (q.ctx && q.ctx.algebra) ? [].concat(q.ctx.algebra) : [];
  const r = lines.find(s => /^\s*R\w*\s*=\s*\(/.test(s)), f = lines.find(s => /^\s*F\w*\s*=\s*\{/.test(s));
  return { R: r ? L.parseR(r) : null, F: f ? L.parseF(f) : null };
}
function check(q, c){
  const base = ctxRF(q);
  const R = c.R ? L.parseR(c.R) : base.R, F = c.F ? L.parseF(c.F) : base.F;
  const need = (x, n) => { if (!x) throw new Error("no " + n + " for check " + JSON.stringify(c)); };
  let got;
  if ("closure" in c){ need(F, "F"); got = L.closure(c.closure, F); return [got === L.norm(c.is), got]; }
  if ("keys" in c){ need(R, "R"); need(F, "F"); got = L.candidateKeys(R, F); return [eqSet(got, c.is.map(L.norm)), got]; }
  if ("superkey" in c){ got = L.isSuperkey(c.superkey, R, F); return [got === c.is, got]; }
  if ("candidate" in c){ got = L.isCandidate(c.candidate, R, F); return [got === c.is, got]; }
  if ("implies" in c){ got = L.implies(F, c.implies); return [got === c.is, got]; }
  if ("nf" in c){ got = c.nf === "R" ? L.normalForm(R, F) : L.nfOfComponent(L.norm(c.nf), F); return [got === c.is, got]; }
  if ("lossless" in c){ got = L.lossless(R, c.lossless.map(L.norm), F); return [got === c.is, got]; }
  if ("preserves" in c){ got = L.preserves(c.preserves.map(L.norm), F); return [got === c.is, got + " lost " + L.showF(L.lostFDs(c.preserves.map(L.norm), F))]; }
  if ("extraneous" in c){
    if (c.extraneous === "all"){ got = L.allExtraneous(F).map(e => `${e.fd} ${e.side}:${e.attr}`); return [eqSet(got, c.is), got]; }
    const d = L.parseFD(c.extraneous), fd = F.find(x => x.l === d.l && x.r === d.r);
    if (!fd) throw new Error("FD not in F: " + c.extraneous);
    got = L.extraneousIn(fd, F).map(e => `${e.side}:${e.attr}`); return [eqSet(got, c.is), got];
  }
  if ("equiv" in c){ got = L.equivalent(F, L.parseF(c.equiv)); return [got === c.is, got]; }
  if ("mincover" in c){ got = L.isMinimalCoverOf(L.parseF(c.mincover), F); return [got === c.is, got]; }
  if ("instance" in c){ const t = (c.table || q.ctx.tables[0]); got = L.instanceHolds(t.columns, t.rows, c.holds); return [got === c.is, got]; }
  throw new Error("unknown check " + JSON.stringify(c));
}
let nq = 0;
LV.forEach(Lv => Lv.questions.forEach(q => {
  nq++;
  if (!q.verify) return;
  [].concat(q.verify).forEach(c => {
    nv++;
    try { const [ok, got] = check(q, c); if (!ok) err(q.id, "verify failed:", JSON.stringify(c), "→ engine says", JSON.stringify(got)); else if (show) console.log("   ", q.id, "✓", JSON.stringify(c)); }
    catch (e) { err(q.id, e.message); }
  });
}));
console.log(`\n${LV.length} levels · ${nq} questions · ${nv} facts recomputed · ${bad} errors`);
LV.forEach(Lv => console.log(`  ${Lv.id}  ${String(Lv.questions.length).padStart(2)} Q  ${String(Lv.questions.filter(q => q.verify).length).padStart(2)} verified  ${Lv.title}`));
process.exit(bad ? 1 : 0);
