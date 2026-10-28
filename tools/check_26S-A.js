// Verifies the 2026 summer moed A exam (tools/raw/26S-A.json, from tools/gen_26S-A.py).
// No key was published, so every answer is self-solved; this recomputes them.
// usage: node tools/check_26S-A.js [--show]
//  SQL     every option runs in SQLite (tools/sql_run.py) on the sample airline DB below; the keyed
//          option must return the reference rows and every distractor must differ or fail to run
//  algebra every option is evaluated by tools/ralib.js on the same data
//  FDs     non-implied FD / decomposition / key / canonical cover recomputed by tools/fdlib.js
const fs = require("fs"), path = require("path"), { spawnSync } = require("child_process");
const show = process.argv.includes("--show");
const X = JSON.parse(fs.readFileSync(path.join(__dirname, "raw", "26S-A.json"), "utf8"));
const Q = n => X.questions.find(q => q.num === n);
const opt = (n, id) => Q(n).options.find(o => o.id === id).value;
let bad = 0, checks = 0;
const ok = (cond, ...msg) => { checks++; if (!cond) { console.log("FAIL", ...msg); bad++; } else if (show) console.log("ok  ", ...msg); };

/* sample data, built so each distractor's mistake shows up:
   Dana (1) booked Paris and Rome; Omer (2) only Rome; Lia (3) nothing; Noa (4) Paris only;
   Tal (5) every London flight; Ben (6) two of three London flights; Gal (7) two New York flights;
   Dana booked every TLV flight; two flights tie on the max price */
const DB = [
  { name: "Passenger", columns: ["passenger_id", "full_name", "city", "birth_year"], rows: [
    [1, "Dana Levi", "Holon", 1995], [2, "Omer", "Haifa", 1990], [3, "Lia", "Holon", 1988],
    [4, "Noa", "Eilat", 2000], [5, "Tal", "Haifa", 1999], [6, "Ben", "Holon", 1985],
    [7, "Gal", "Eilat", 1992]] },
  { name: "Flight", columns: ["flight_number", "origin", "destination", "dep_date", "price"], rows: [
    [10, "TLV", "Paris", "2026-07-01", 800], [11, "TLV", "Rome", "2026-07-02", 450],
    [12, "TLV", "New York", "2026-07-03", 1500], [13, "Paris", "York", "2026-07-04", 300],
    [14, "Rome", "London", "2026-07-05", 1500], [15, "TLV", "London", "2026-07-06", 900],
    [16, "Rome", "Paris", "2026-07-07", 200], [17, "TLV", "New York", "2026-07-08", 700],
    [18, "Rome", "London", "2026-07-09", 400]] },
  { name: "Booking", columns: ["passenger_id", "flight_number", "seat_no", "booking_date"], rows: [
    [1, 10, "1A", "2026-06-01"], [1, 11, "2A", "2026-06-02"], [1, 12, "3A", "2026-06-03"],
    [1, 15, "3B", "2026-06-03"], [1, 17, "3C", "2026-06-04"],
    [2, 11, "4A", "2026-06-01"], [2, 13, "4B", "2026-06-02"],
    [4, 16, "5A", "2026-06-05"],
    [5, 14, "6A", "2026-06-06"], [5, 15, "6B", "2026-06-06"], [5, 12, "6C", "2026-06-07"],
    [5, 18, "6D", "2026-06-07"], [6, 15, "7A", "2026-06-08"], [6, 14, "7B", "2026-06-08"],
    [7, 12, "8A", "2026-06-09"], [7, 17, "8B", "2026-06-09"]] },
  { name: "Aircraft", columns: ["tail_number", "model", "capacity"], rows: [["4X-EKA", "B737", 180]] },
];
function sql(s){
  const p = spawnSync("python", ["-I", path.join(__dirname, "sql_run.py")], { input: JSON.stringify({ tables: DB, sql: s }), encoding: "utf8" });
  try { return JSON.parse(p.stdout); } catch (e) { return { error: "runner: " + (p.stderr || p.error) }; }
}
const key = rows => rows.map(r => r.map(v => v === null ? "∅" : String(v)).join("|")).sort().join(" ; ");
function sqlCase(n, ref, wrong, manual){
  const R = sql(ref);
  ok(!R.error, `Q${n} reference runs`, R.error || "");
  if (show) console.log(`      Q${n} reference →`, key(R.rows || []));
  const k = Q(n).correctId, o = sql(opt(n, k));
  ok(!o.error && key(o.rows) === key(R.rows), `Q${n} keyed option ${k} matches reference`, o.error || key(o.rows || []));
  for (const w of wrong){
    const r = sql(opt(n, w));
    ok(r.error || key(r.rows) !== key(R.rows), `Q${n} distractor ${w} differs`, r.error ? "(error: " + r.error + ")" : key(r.rows));
  }
  (manual || []).forEach(m => show && console.log(`      Q${n} option ${m} reviewed by hand`));
}
sqlCase(6, "SELECT DISTINCT destination FROM Flight WHERE instr(destination,'York')>0 AND price>500", ["a", "b", "d", "e"]);
sqlCase(7, "SELECT full_name, destination FROM Booking JOIN Passenger USING(passenger_id) JOIN Flight USING(flight_number) WHERE price>1000", ["a", "c", "d", "e"]);
sqlCase(8, "SELECT full_name FROM Passenger WHERE passenger_id NOT IN (SELECT passenger_id FROM Booking JOIN Flight USING(flight_number) WHERE destination='Paris')", ["a", "c", "d", "e"]);
sqlCase(9, "SELECT AVG(m) FROM (SELECT MAX(price) AS m FROM Flight GROUP BY destination)", ["a", "b", "c"], ["d (nested aggregate: rejected by MySQL)"]);
sqlCase(10, "SELECT flight_number FROM Flight WHERE price=(SELECT price FROM Flight ORDER BY price DESC LIMIT 1)", ["b", "c", "e"], ["d (ALL)"]);
sqlCase(11, "SELECT passenger_id, (SELECT COUNT(*) FROM Booking B WHERE B.passenger_id=P.passenger_id) FROM Passenger P", ["a", "b", "c", "e"]);
sqlCase(12, "SELECT passenger_id FROM Passenger P WHERE (SELECT COUNT(*) FROM Booking JOIN Flight USING(flight_number) WHERE destination='London' AND passenger_id=P.passenger_id) = (SELECT COUNT(*) FROM Flight WHERE destination='London')", ["b", "c", "d", "e"]);
sqlCase(13, "SELECT passenger_id FROM (SELECT DISTINCT passenger_id, destination FROM Booking JOIN Flight USING(flight_number)) GROUP BY passenger_id HAVING COUNT(*)>1", ["a", "c", "d", "e"]);

/* ---------------- relational algebra (same data) ---------------- */
const RA = require("./ralib.js");
const raKey = r => r.rows.map(x => x.join("|")).sort().join(" ; ");
function raRun(src){ try { return RA.evaluate(src, DB); } catch (e) { return { error: e.message }; } }
function raCase(n, refSql, wrong){
  const R = sql(refSql), ref = key(R.rows || []);
  if (show) console.log(`      Q${n} reference →`, ref);
  const k = Q(n).correctId, r = raRun(opt(n, k));
  ok(!r.error && raKey(r) === ref, `Q${n} keyed option ${k} matches reference`, r.error || raKey(r));
  for (const w of wrong){ const x = raRun(opt(n, w)); ok(x.error || raKey(x) !== ref, `Q${n} distractor ${w} differs`, x.error ? "(error: " + x.error + ")" : raKey(x)); }
}
raCase(14, "SELECT passenger_id FROM Passenger P WHERE NOT EXISTS (SELECT * FROM Flight F WHERE origin='TLV' AND NOT EXISTS (SELECT * FROM Booking B WHERE B.flight_number=F.flight_number AND B.passenger_id=P.passenger_id))", ["b", "c", "d", "e"]);
raCase(15, "SELECT DISTINCT destination FROM Passenger JOIN Booking USING(passenger_id) JOIN Flight USING(flight_number) WHERE full_name='Dana Levi'", ["a", "b", "c", "d"]);
raCase(16, "SELECT DISTINCT full_name FROM Passenger WHERE city='Holon'", ["a", "c", "d", "e"]);

/* ---------------- FDs ---------------- */
const F = require("./fdlib.js");
{
  const R = "ABCDE", F1 = F.parseF(X.contexts.fd.algebra[1]);
  for (const o of Q(17).options) ok(F.implies(F1, o.value) === (o.id !== Q(17).correctId), `Q17 ${o.value} implied=${F.implies(F1, o.value)}`);
  const comps = ["ABD", "ACE"], ll = F.lossless(R, comps, F1), pr = F.preserves(comps, F1);
  ok(ll && !pr, "Q18 lossless but not dependency-preserving", `lossless=${ll} preserves=${pr} lost=${F.showF ? F.showF(F.lostFDs(comps, F1)) : ""}`);
  ok(Q(18).correctId === "d" && /משמר מידע, אך אינו משמר תלויות/.test(opt(18, "d")), "Q18 keyed option = lossless, not preserving");
  const keys = F.candidateKeys(R, F1);
  ok(keys.join(",") === "E", "Q19 only candidate key is E", keys.join(","));
  ok(opt(19, Q(19).correctId) === "{E}", "Q19 keyed option is {E}");
  for (const o of Q(20).options){
    const G = F.parseF(o.value), canon = F.isMinimalCoverOf(G, F1);
    ok(canon === (o.id === Q(20).correctId), `Q20 option ${o.id} ${o.value} canonical=${canon}`, `equivalent=${F.equivalent(G, F1)}`);
  }
}

/* ---------------- shape ---------------- */
{
  const parts = {}; X.questions.forEach(q => parts[q.part + ":" + q.topic] = (parts[q.part + ":" + q.topic] || 0) + 1);
  ok(JSON.stringify(parts) === JSON.stringify({ "א:erd": 5, "ב:sql": 8, "ג:relalg": 3, "ד:fd_norm": 4 }), "exam shape 5/8/3/4", JSON.stringify(parts));
}

console.log(`\n${checks} checks, ${bad} failed`);
console.log(bad ? "CHECK FAILED" : "CHECK PASSED");
process.exit(bad ? 1 : 0);
