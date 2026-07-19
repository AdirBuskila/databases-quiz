// Node smoke test: data integrity + option-id shuffle/scoring invariant.
// Loads questions.js (window.DB_QUIZ) and the SQL highlighter, checks the
// extended schema (contexts, option objects, correctId, parts), and simulates
// the app's shuffle-by-id 5000x to prove scoring never mismaps.
const fs = require("fs"), path = require("path");
global.window = {};
require(path.join(__dirname, "..", "sql-highlight.js"));
eval(fs.readFileSync(path.join(__dirname, "..", "questions.js"), "utf8"));

const D = window.DB_QUIZ || {};
const QS = D.questions || [];
const CTX = D.contexts || {};
const TOPICS = new Set(["erd", "sql", "relalg", "fd_norm", "rel_model", "nosql"]);
const PARTS = new Set(["א", "ב", "ג", "ד", "ה"]);
const OPT_TYPES = new Set(["text", "code", "math", "image", "algebra", "schema"]);

let bad = 0;
const byTopic = {}, byPart = {};
for (const q of QS) {
  byTopic[q.topic] = (byTopic[q.topic] || 0) + 1;
  byPart[q.part || "—"] = (byPart[q.part || "—"] || 0) + 1;
  if (!Array.isArray(q.options) || q.options.length < 2) { console.log("BAD options", q.id); bad++; }
  const ids = (q.options || []).map(o => o.id);
  if (new Set(ids).size !== ids.length) { console.log("DUP option ids", q.id); bad++; }
  if (!ids.includes(q.correctId)) { console.log("correctId not in options", q.id); bad++; }
  if (Array.isArray(q.acceptedIds)) {
    if (!q.acceptedIds.length) { console.log("EMPTY acceptedIds", q.id); bad++; }
    if (q.acceptedIds.some(a => !ids.includes(a))) { console.log("acceptedIds unknown id", q.id); bad++; }
    if (!q.acceptedIds.includes(q.correctId)) { console.log("correctId not in acceptedIds", q.id); bad++; }
  }
  if (!TOPICS.has(q.topic)) { console.log("BAD topic", q.id, q.topic); bad++; }
  if (q.part && !PARTS.has(q.part)) { console.log("BAD part", q.id, q.part); bad++; }
  if (q.contextId && !CTX[q.contextId]) { console.log("MISSING context", q.id, q.contextId); bad++; }
  if (!q.question || !String(q.question).trim()) { console.log("EMPTY q", q.id); bad++; }
  for (const o of q.options || []) {
    if (!OPT_TYPES.has(o.type || "text")) { console.log("BAD opt type", q.id, o.type); bad++; }
    if (!String(o.value).trim()) { console.log("BLANK opt", q.id, o.id); bad++; }
    if (o.type === "code" && /[֐-׿]/.test(String(o.value))) { console.log("HEBREW in code opt", q.id, o.id); bad++; }
  }
}

// shuffle-by-id invariant: clicking the displayed-correct must map back to correctId
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
let mismatch = 0;
for (let t = 0; t < 5000 && QS.length; t++) {
  const q = QS[t % QS.length];
  const order = shuffle(q.options.map(o => o.id));
  const correctDisplay = order.indexOf(q.correctId);
  if (order[correctDisplay] !== q.correctId) mismatch++;
}

console.log("total questions:", QS.length, "| contexts:", Object.keys(CTX).length);
console.log("by topic:", byTopic);
console.log("by part:", byPart);
console.log("integrity problems:", bad);
console.log("id-shuffle scoring mismatches:", mismatch, "(must be 0)");
console.log(bad === 0 && mismatch === 0 ? "\nSMOKE TEST PASSED" : "\nSMOKE TEST FAILED");
process.exit(bad === 0 && mismatch === 0 ? 0 : 1);
