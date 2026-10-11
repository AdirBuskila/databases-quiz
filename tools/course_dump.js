// Dump a course for blind review: questions without answers (context, given expression/code, options)
// + a separate key.   usage: node tools/course_dump.js <sql|norm|alg> <outDir> [ids,comma,separated]
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
global.window = globalThis;
const load = f => (0, eval)(fs.readFileSync(path.join(ROOT, f), "utf8"));
load("courses.js");
const [course, out, only] = process.argv.slice(2);
const dir = { sql: "sql", norm: "norm", alg: "alg" }[course], pre = { sql: "S", norm: "N", alg: "A" }[course];
fs.readdirSync(path.join(ROOT, dir, "levels")).sort().forEach(f => load(dir + "/levels/" + f));
fs.mkdirSync(out, { recursive: true });
const want = only ? new Set(only.split(",")) : null;
const tbl = t => `  TABLE ${t.name}(${t.columns.join(", ")})` + (t.rows ? "\n" + t.rows.map(r => "    " + r.map(v => v === null ? "NULL" : v).join(" | ")).join("\n") : "");
let qmd = "", key = "";
window.COURSES[course].levels.filter(L => !want || want.has(L.id)).forEach(L => {
  qmd += `\n# ${L.id} — ${L.title}\n`;
  L.questions.forEach(q => {
    qmd += `\n## ${q.id}\n`;
    const c = q.ctx || {};
    if (c.title) qmd += `Context title: ${c.title}\n`;
    [].concat(c.algebra || []).forEach(a => qmd += `  ${a}\n`);
    (c.relations || []).forEach(r => qmd += `  SCHEMA ${r.schema}${r.meaning ? "   -- " + r.meaning : ""}\n`);
    (c.tables || []).forEach(t => qmd += tbl(t) + "\n");
    if (c.text) qmd += `Context: ${c.text}\n`;
    if (c.note) qmd += `Note: ${c.note}\n`;
    qmd += `Question: ${q.question}\n`;
    if (q.code) qmd += "```\n" + q.code + "\n```\n";
    q.options.forEach(o => qmd += `  (${o.id}) ${o.type === "code" ? "\n```\n" + o.value + "\n```" : o.value}\n`);
    key += `${q.id}: ${q.correctId}${q.acceptedIds ? " (accepted " + q.acceptedIds.join(",") + ")" : ""}\n   EXPLANATION: ${q.explanation}\n`;
  });
});
fs.writeFileSync(path.join(out, "questions.md"), qmd);
fs.writeFileSync(path.join(out, "key.md"), key);
console.log("wrote", path.join(out, "questions.md"), "and key.md");
