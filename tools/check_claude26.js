// Verifies "המבחן הקשה של קלוד 2026" (tools/raw/PRAC-CL26.json, from tools/gen_claude26.py).
// usage: node tools/check_claude26.js [--show]
//  SQL     every option runs in SQLite (tools/sql_run.py) on the sample airline DB below; the keyed
//          option must return the reference rows and every distractor must differ or fail to run
//          (options using ALL, or grouping a bare column that SQLite tolerates, are reviewed by hand)
//  algebra every option is evaluated by tools/ralib.js on the sample streaming DB; same rule
//  FDs     keys / normal form / decomposition / canonical cover recomputed by tools/fdlib.js
//  ERD     diagram lint (canvas bounds, overlaps, owners, edges) + render through erd.js
const fs = require("fs"), path = require("path"), { spawnSync } = require("child_process");
const ROOT = path.join(__dirname, "..");
const show = process.argv.includes("--show");
const X = JSON.parse(fs.readFileSync(path.join(__dirname, "raw", "PRAC-CL26.json"), "utf8"));
const Q = n => X.questions.find(q => q.num === n);
const opt = (n, id) => Q(n).options.find(o => o.id === id).value;
let bad = 0, checks = 0;
const ok = (cond, ...msg) => { checks++; if (!cond) { console.log("FAIL", ...msg); bad++; } else if (show) console.log("ok  ", ...msg); };

/* ---------------- SQL ---------------- */
const DB = [
  { name: "Passengers", columns: ["passenger_id", "name", "country", "birth_year"], rows: [
    [1, "Dana", "Israel", 1995], [2, "Omer", "Israel", 1990], [3, "Lia", "France", 1988],
    [4, "Noam", "Italy", 2000], [5, "Tal", "Israel", 1999], [6, "Ben", "USA", 1985]] },
  { name: "Flights", columns: ["flight_id", "origin", "destination", "flight_date", "price"], rows: [
    [101, "TLV", "Rome", "2026-03-01", 450], [102, "TLV", "Rome", "2026-04-10", 520],
    [103, "Paris", "Rome", "2026-05-05", 300], [104, "TLV", "Paris", "2026-03-15", 600],
    [105, "Rome", "TLV", "2026-03-20", 450], [106, "TLV", "London", "2026-06-01", 900],
    [107, "London", "TLV", "2026-06-08", 380]] },
  { name: "Bookings", columns: ["passenger_id", "flight_id", "seat_class", "paid"], rows: [
    [1, 101, "Economy", 450], [1, 104, "Business", 1800],
    [2, 101, "Economy", 450], [2, 102, "Economy", 520], [2, 103, "Economy", 300],
    [3, 102, "Business", 1500], [3, 103, "Economy", 300], [3, 107, "Economy", 380],
    [4, 103, "Economy", 300], [4, 106, "Economy", 900],
    [5, 104, "Economy", 600], [5, 106, "Business", 2500], [5, 107, "Economy", 380],
    [6, 101, "Economy", 450]] },
  { name: "Pilots", columns: ["pilot_id", "name", "hire_year"], rows: [
    [1, "Avi", 2010], [2, "Rina", 2015], [3, "Gil", 2018], [4, "Yael", 2022]] },
  { name: "Assignments", columns: ["pilot_id", "flight_id"], rows: [
    [1, 101], [1, 102], [1, 103], [1, 104], [1, 106],
    [2, 101], [2, 104], [2, 105],
    [3, 102], [3, 106], [3, 107]] },
];
function sql(s){
  const p = spawnSync("python", ["-I", path.join(__dirname, "sql_run.py")], { input: JSON.stringify({ tables: DB, sql: s }), encoding: "utf8" });
  try { return JSON.parse(p.stdout); } catch (e) { return { error: "runner: " + (p.stderr || p.error) }; }
}
const key = rows => rows.map(r => r.map(v => v === null ? "∅" : String(v)).join("|")).sort().join(" ; ");
function sqlCase(n, ref, keyed, wrong, manual){
  const R = sql(ref);
  ok(!R.error, `Q${n} reference runs`, R.error || "");
  if (show) console.log(`      Q${n} reference →`, key(R.rows || []));
  const o = sql(keyed.sql || opt(n, keyed));
  ok(!o.error && key(o.rows) === key(R.rows), `Q${n} keyed option ${keyed.id || keyed} matches reference`, o.error || key(o.rows || []));
  for (const w of wrong){
    const s = typeof w === "string" ? opt(n, w) : w.sql, label = typeof w === "string" ? w : w.label;
    const r = sql(s);
    ok(r.error || key(r.rows) !== key(R.rows), `Q${n} distractor ${label} differs`, r.error ? "(error: " + r.error + ")" : key(r.rows));
  }
  (manual || []).forEach(m => show && console.log(`      Q${n} option ${m} reviewed by hand (not runnable in SQLite / SQLite-only leniency)`));
}
// Q5 Rome bookers who never booked Business anywhere
sqlCase(5, "SELECT name FROM Passengers WHERE passenger_id IN (SELECT B.passenger_id FROM Bookings B JOIN Flights F USING(flight_id) WHERE F.destination='Rome') AND passenger_id NOT IN (SELECT passenger_id FROM Bookings WHERE seat_class='Business')",
  "b", ["a", "c", "d"]);
// Q6 the shown query = passengers who booked every Rome flight; the "only Rome" / "≥1 Rome" readings must differ
{
  const div = "SELECT name FROM Passengers P WHERE NOT EXISTS (SELECT * FROM Flights F WHERE F.destination='Rome' AND NOT EXISTS (SELECT * FROM Bookings B WHERE B.flight_id=F.flight_id AND B.passenger_id=P.passenger_id))";
  sqlCase(6, div, { id: "shown query", sql: Q(6).code }, [
    { label: "a (≥1 Rome)", sql: "SELECT DISTINCT P.name FROM Passengers P JOIN Bookings B USING(passenger_id) JOIN Flights F USING(flight_id) WHERE F.destination='Rome'" },
    { label: "b (only Rome)", sql: "SELECT name FROM Passengers P WHERE passenger_id IN (SELECT passenger_id FROM Bookings) AND NOT EXISTS (SELECT * FROM Bookings B JOIN Flights F USING(flight_id) WHERE B.passenger_id=P.passenger_id AND F.destination<>'Rome')" },
    { label: "d (total bookings = #Rome flights)", sql: "SELECT P.name FROM Passengers P JOIN Bookings B USING(passenger_id) GROUP BY P.passenger_id, P.name HAVING COUNT(*) = (SELECT COUNT(*) FROM Flights WHERE destination='Rome')" },
  ]);
}
sqlCase(7, "SELECT flight_id, destination, price FROM Flights F WHERE NOT EXISTS (SELECT * FROM Flights G WHERE G.destination=F.destination AND G.price>F.price)",
  "b", ["a"], ["c (bare column in GROUP BY: invalid SQL, SQLite allows it)", "d (ALL)"]);
sqlCase(8, "SELECT name, (SELECT COUNT(*) FROM Assignments A WHERE A.pilot_id=P.pilot_id) FROM Pilots P", "d", ["a", "b", "c"]);
{
  const v = s => s + ";\nSELECT * FROM BigSpenders";
  const ref = "SELECT passenger_id, total FROM (SELECT passenger_id, SUM(paid) AS total FROM Bookings GROUP BY passenger_id) WHERE total > 2000";
  sqlCase(9, ref, { id: "a", sql: v(opt(9, "a")) }, ["b", "c", "d"].map(id => ({ label: id, sql: v(opt(9, id)) })));
}
{
  const parts = Q(10).code.split(/\n\s*\n/).map(s => s.replace(/^\([ABC]\)\s*/, ""));
  const ref = "SELECT name FROM Pilots P WHERE (SELECT COUNT(*) FROM Assignments A JOIN Flights F USING(flight_id) WHERE F.origin='TLV' AND A.pilot_id=P.pilot_id) = (SELECT COUNT(*) FROM Flights WHERE origin='TLV')";
  sqlCase(10, ref, { id: "(A)", sql: parts[0] }, [{ label: "(B)", sql: parts[1] }]);
  sqlCase(10, ref, { id: "(C)", sql: parts[2] }, []);
}
sqlCase(11, "SELECT passenger_id FROM Bookings B WHERE 3 <= (SELECT COUNT(DISTINCT pilot_id) FROM Assignments A JOIN Bookings B2 USING(flight_id) WHERE B2.passenger_id=B.passenger_id) GROUP BY passenger_id",
  "c", ["a", "b", "d"]);
sqlCase(12, "SELECT DISTINCT price FROM Flights F WHERE 1 = (SELECT COUNT(DISTINCT price) FROM Flights G WHERE G.price > F.price)",
  "d", ["a", "c"], ["b (ALL)"]);

/* ---------------- relational algebra ---------------- */
const RA = require("./ralib.js");
const RADB = [
  { name: "listener", columns: ["listener_id", "name", "country", "age"], rows: [
    [1, "Noa", "Israel", 25], [2, "Ido", "Israel", 31], [3, "Mia", "France", 22],
    [4, "Leo", "France", 22], [5, "Ana", "Spain", 40], [6, "Ray", "Israel", 31]] },
  { name: "artist", columns: ["artist_id", "name", "country"], rows: [
    [10, "Noa", "Israel"], [11, "Mia", "Spain"], [12, "Sol", "France"]] },
  { name: "album", columns: ["album_id", "title", "artist_id", "genre"], rows: [
    [100, "Blue", 10, "Jazz"], [101, "Night", 11, "Jazz"], [102, "Sun", 12, "Pop"], [103, "Rain", 12, "Rock"]] },
  { name: "plays", columns: ["listener_id", "album_id"], rows: [
    [1, 100], [1, 101], [1, 102],
    [2, 100], [2, 101],
    [3, 100],
    [4, 102], [4, 103],
    [5, 100], [5, 101], [5, 103]] },
];
const raKey = r => r.rows.map(x => x.join("|")).sort().join(" ; ");
function raRun(src, db){ try { return RA.evaluate(src, db); } catch (e) { return { error: e.message }; } }
function raCase(n, refRows, keyedIds, wrongIds, db){
  const ref = refRows.map(r => r.join("|")).sort().join(" ; ");
  if (show) console.log(`      Q${n} reference →`, ref);
  for (const id of keyedIds){ const r = raRun(opt(n, id), db || RADB); ok(!r.error && raKey(r) === ref, `Q${n} keyed option ${id} matches reference`, r.error || raKey(r)); }
  for (const id of wrongIds){ const r = raRun(opt(n, id), db || RADB); ok(r.error || raKey(r) !== ref, `Q${n} distractor ${id} differs`, r.error ? "(error: " + r.error + ")" : raKey(r)); }
}
const L = RADB[0].rows, AR = RADB[1].rows, AL = RADB[2].rows, PL = RADB[3].rows;
// Q13: names shared by a listener and an artist from the same country (here only Noa/Israel; Mia differs by country)
{
  const ref = [...new Set(L.filter(l => AR.some(a => a[1] === l[1] && a[2] === l[2])).map(l => l[1]))].map(x => [x]);
  const r = raRun(Q(13).question.match(/\$\$(.*)\$\$/)[1], RADB);
  ok(!r.error && raKey(r) === ref.map(x => x.join("|")).sort().join(" ; "), "Q13 shown query = same name AND same country", r.error || raKey(r));
  const sameCountry = [...new Set(L.filter(l => AR.some(a => a[2] === l[2])).map(l => l[1]))];
  ok(sameCountry.length !== ref.length, "Q13 'same country' reading differs on the sample", sameCountry.join(","));
}
// Q14: oldest listener per country (ties kept)
raCase(14, L.filter(l => !L.some(m => m[2] === l[2] && m[3] > l[3])).map(l => [l[0]]), ["d"], ["a", "b", "c"]);
// Q15: listeners who played every Jazz album
{
  const jazz = AL.filter(a => a[3] === "Jazz").map(a => a[0]);
  const ids = [...new Set(PL.map(p => p[0]))].filter(l => jazz.every(j => PL.some(p => p[0] === l && p[1] === j)));
  raCase(15, ids.map(x => [x]), ["a", "c"], ["b", "d"]);
}
// Q16: rows × columns on the shown tables
{
  const ctx = X.contexts.q16;
  const r = raRun(Q(16).question.match(/\$\$(.*)\$\$/)[1].replace(/D < 7/, "D < 7"), ctx.tables.map(t => ({ ...t, rows: t.rows.map(row => row.map(v => /^\d+$/.test(v) ? +v : v)) })));
  ok(!r.error && r.rows.length === 4 && r.cols.length === 3, "Q16 result is 4 rows × 3 columns", r.error || `${r.rows.length}×${r.cols.length} ${raKey(r)}`);
  ok(/ארבע שורות ושלוש/.test(opt(16, Q(16).correctId)), "Q16 keyed option says 4 rows / 3 columns");
}

/* ---------------- FDs ---------------- */
const F = require("./fdlib.js");
{
  const R = "ABCDE", F1 = F.parseF(X.contexts.fd.algebra[1]);
  const keys = F.candidateKeys(R, F1);
  ok(keys.join(",") === "AB,BC,BD", "Q17 candidate keys = AB, BC, BD", keys.join(","));
  ok(/\{A, B\}, ‏\{B, C\} ו-\{B, D\}$/.test(opt(17, Q(17).correctId)), "Q17 keyed option lists exactly AB, BC, BD");
  ok(F.normalForm(R, F1) === "3NF", "Q18 R is 3NF (not BCNF)", F.normalForm(R, F1));
  ok(/BCNF, אבל נמצאת ב-3NF/.test(opt(18, Q(18).correctId)), "Q18 keyed option = 3NF not BCNF");
}
{
  const F2 = F.parseF("{A → B, B → C, C → A, D → E}"), comps = ["AB", "BC", "CDE"];
  ok(F.lossless("ABCDE", comps, F2), "Q19 lossless");
  ok(F.preserves(comps, F2), "Q19 preserves FDs (C → A derived through R2, R1)");
  const nfs = comps.map(c => F.nfOfComponent(c, F2));
  ok(nfs[2] !== "3NF" && nfs[2] !== "BCNF", "Q19 R3(C,D,E) is below 3NF", nfs.join(","));
  ok(/משמר מידע ומשמר תלויות, אך לא כל/.test(opt(19, Q(19).correctId)), "Q19 keyed option matches");
}
{
  const F3 = F.parseF("{A → BC, B → C, AB → D, CD → E}");
  for (const o of Q(20).options){
    const G = F.parseF(o.value), canon = F.isMinimalCoverOf(G, F3);
    ok(canon === (o.id === Q(20).correctId), `Q20 option ${o.id} ${o.value} canonical=${canon}`, `equivalent=${F.equivalent(G, F3)}`);
  }
}

/* ---------------- ERD ---------------- */
global.window = globalThis;
(0, eval)(fs.readFileSync(path.join(ROOT, "erd.js"), "utf8"));
{
  const spec = X.contexts.erd.erd, size = window.ERD._size, N = {};
  spec.nodes.forEach(n => { ok(!N[n.id], "ERD unique node id " + n.id); N[n.id] = n; });
  const box = n => { const s = size(n); return { n, x1: n.x - s.hw, x2: n.x + s.hw, y1: n.y - s.hh, y2: n.y + s.hh }; };
  const boxes = spec.nodes.map(box);
  boxes.forEach(b => ok(!(b.x1 < 2 || b.y1 < 2 || b.x2 > spec.w - 2 || b.y2 > spec.h - 2), `ERD ${b.n.id} inside canvas`, [b.x1, b.y1, b.x2, b.y2].map(Math.round).join(",")));
  const shrink = n => n.t === "attr" || n.t === "rel" ? .78 : n.t === "isa" ? .8 : 1;
  const solid = boxes.filter(b => b.n.t !== "agg");
  for (let i = 0; i < solid.length; i++) for (let j = i + 1; j < solid.length; j++){
    const a = solid[i], b = solid[j], ka = shrink(a.n), kb = shrink(b.n);
    const ax = (a.x2 - a.x1) / 2 * ka, ay = (a.y2 - a.y1) / 2 * ka, bx = (b.x2 - b.x1) / 2 * kb, by = (b.y2 - b.y1) / 2 * kb;
    if (Math.abs(a.n.x - b.n.x) < ax + bx + 4 && Math.abs(a.n.y - b.n.y) < ay + by + 4) ok(false, `ERD overlap ${a.n.id} × ${b.n.id}`);
  }
  boxes.filter(b => b.n.t === "agg").forEach(g => solid.forEach(b => {
    const inside = b.x1 >= g.x1 && b.x2 <= g.x2 && b.y1 >= g.y1 && b.y2 <= g.y2;
    const outside = b.x2 <= g.x1 || b.x1 >= g.x2 || b.y2 <= g.y1 || b.y1 >= g.y2;
    ok(inside || outside, `ERD ${b.n.id} does not straddle the aggregation`);
  }));
  spec.nodes.filter(n => n.t === "attr").forEach(n => ok(N[n.of], `ERD attr ${n.id} has owner`));
  spec.edges.forEach((e, i) => ok(N[e.a] && N[e.b], `ERD edge #${i} endpoints exist`));
  let svg = ""; try { svg = window.renderERD(JSON.parse(JSON.stringify(spec))); } catch (e) { svg = "ERR " + e.message; }
  ok(svg.startsWith("<svg"), "ERD renders", svg.slice(0, 60));
}

/* ---------------- shape ---------------- */
{
  const parts = {}; X.questions.forEach(q => parts[q.part + ":" + q.topic] = (parts[q.part + ":" + q.topic] || 0) + 1);
  ok(JSON.stringify(parts) === JSON.stringify({ "א:erd": 4, "ב:sql": 8, "ג:relalg": 4, "ד:fd_norm": 4 }), "exam shape 4/8/4/4", JSON.stringify(parts));
  const ids = X.questions.map(q => q.correctId);
  ok(new Set(ids).size >= 4, "answer letters are spread", ids.join(""));
}

console.log(`\n${checks} checks, ${bad} failed`);
console.log(bad ? "CHECK FAILED" : "CHECK PASSED");
process.exit(bad ? 1 : 0);
