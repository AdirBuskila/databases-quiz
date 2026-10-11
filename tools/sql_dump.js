// Dump the SQL course for blind review: questions without answers (schema, data, code) + a key.
// usage: node tools/sql_dump.js <outDir> [S01,S02,...]
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
global.window = globalThis;
const load = f => (0, eval)(fs.readFileSync(path.join(ROOT, f), "utf8"));
load("courses.js");
fs.readdirSync(path.join(ROOT, "sql", "levels")).filter(f => /^S\d+\.js$/.test(f)).sort().forEach(f => load("sql/levels/" + f));
const [out, only] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const want = only ? new Set(only.split(",")) : null;
const tbl = t => `  TABLE ${t.name}(${t.columns.join(", ")})` + (t.rows ? "\n" + t.rows.map(r => "    " + r.map(v => v === null ? "NULL" : v).join(" | ")).join("\n") : "");
let qmd = "", key = "";
SQL_COURSE.filter(L => !want || want.has(L.id)).forEach(L => {
  qmd += `\n# ${L.id} — ${L.title}\n`;
  L.questions.forEach(q => {
    qmd += `\n## ${q.id}\n`;
    const c = q.ctx || {};
    (c.relations || []).forEach(r => qmd += `  SCHEMA ${r.schema}${r.meaning ? "   -- " + r.meaning : ""}\n`);
    (c.tables || []).forEach(t => qmd += tbl(t) + "\n");
    if (c.text) qmd += `Context: ${c.text}\n`;
    if (c.note) qmd += `Note: ${c.note}\n`;
    qmd += `Question: ${q.question}\n`;
    if (q.code) qmd += "```sql\n" + q.code + "\n```\n";
    q.options.forEach(o => qmd += `  (${o.id}) ${o.type === "code" ? "\n```sql\n" + o.value + "\n```" : o.value}\n`);
    key += `${q.id}: ${q.correctId}${q.acceptedIds ? " (accepted " + q.acceptedIds.join(",") + ")" : ""}\n   EXPLANATION: ${q.explanation}\n`;
  });
});
fs.writeFileSync(path.join(out, "questions.md"), qmd);
fs.writeFileSync(path.join(out, "key.md"), key);
console.log("wrote", path.join(out, "questions.md"), "and key.md");
