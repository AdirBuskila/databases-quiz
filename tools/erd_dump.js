// Dump the ERD course for blind review: questions without answers + diagram PNG paths, and a key.
// usage: node tools/erd_dump.js <outDir> [L01,L02,...]   (run tools/erd_shoot.js first for the PNGs)
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
global.window = globalThis;
const load = f => (0, eval)(fs.readFileSync(path.join(ROOT, f), "utf8"));
load("erd.js"); load("courses.js");
fs.readdirSync(path.join(ROOT, "erd", "levels")).filter(f => /^L\d+\.js$/.test(f)).sort().forEach(f => load("erd/levels/" + f));
const [out, only] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const want = only ? new Set(only.split(",")) : null;
const shots = path.join(__dirname, "raw", "erdshots");
const png = k => path.join(shots, k.replace(/[^\w-]+/g, "_") + "-light.png");
const plain = v => typeof v === "string" ? v : "[diagram option: see PNG " + "]";
let qmd = "", key = "";
ERD_COURSE.filter(L => !want || want.has(L.id)).forEach(L => {
  qmd += `\n# ${L.id} — ${L.title}\n`;
  L.questions.forEach(q => {
    qmd += `\n## ${q.id}\n` + (q.ctx && q.ctx.erd ? `Diagram: ${png(q.id)}\n` : "No diagram.\n");
    if (q.ctx && q.ctx.text) qmd += `Context: ${q.ctx.text}\n`;
    qmd += `Question: ${q.question}\n`;
    q.options.forEach(o => qmd += `  (${o.id}) ${o.type === "erd" ? "[diagram option: " + png(q.id + " opt " + o.id) + "]" : (o.type === "schema" ? "[schema] " : "") + o.value}\n`);
    key += `${q.id}: ${q.correctId}${q.acceptedIds ? " (accepted " + q.acceptedIds.join(",") + ")" : ""}\n   EXPLANATION: ${q.explanation}\n`;
  });
});
fs.writeFileSync(path.join(out, "questions.md"), qmd);
fs.writeFileSync(path.join(out, "key.md"), key);
console.log("wrote", path.join(out, "questions.md"), "and key.md");
