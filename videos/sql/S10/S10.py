# -*- coding: utf-8 -*-
"""S10 · מבחן גמר: שאלות ממבחנים — boss video (build: tools/video/vid.py S10).

Source: sql/levels/S10.js (the boss checklist: find the pattern by its keyword, the golden order, full chain,
COUNT(DISTINCT), extremum forms, negation forms, LEFT JOIN with COUNT(col)).
Walkthrough of three exam questions, none cited by any level quiz: 26Z-CL-Q8 (every pilot with his number of flights,
including 0: LEFT JOIN + COUNT(col)), 26Z-CL-Q7 (the most expensive flight per destination: correlated subquery),
26Z-CL-Q11 (passengers who flew with at least 3 different pilots: COUNT(DISTINCT) on a join).
Avoided on purpose: the 12 boss questions of S10 (the streaming schema Users/Shows/Watch/Actors/ShowCast) and every
exam item cited by any level quiz; no other video of the course uses these three.
Each question runs on an original instance (the exam gives no data). Not run on purpose: 26Z-CL-Q7's option with
GROUP BY destination and a bare flight_id (standard SQL rejects it, SQLite runs it with an arbitrary flight_id) — it is
reasoned by the GROUP BY rule; its option with >= ALL is asserted through >= (SELECT MAX ...).
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_sql as w

# ---------------------------------------------------------------- Q1: 26Z-CL-Q8
Q1 = BANK["26Z-CL-Q8"]
assert Q1["correctId"] == "d"
O1 = w.bank_opts(Q1)
S1 = {o: s for o, k, s in O1 if k == "code"}
PI = w.T("Pilots", ["pilot_id", "name", "hire_year"], [[1, "Ada", 2015], [2, "Ben", 2019], [3, "Cy", 2024]],
         pk=["pilot_id"])
AS1 = w.T("Assignments", ["pilot_id", "flight_id"], [[1, 10], [1, 11], [2, 10]], pk=["pilot_id", "flight_id"])
d1 = w.DB(PI, AS1)
R1 = {o: w.T("תוצאה", ["name", "COUNT"], d1.rows(s)) for o, s in S1.items()}
g1 = {o: w.bag(t["rows"]) for o, t in R1.items()}
assert g1["d"] == w.bag([["Ada", 2], ["Ben", 1], ["Cy", 0]])           # Cy, never assigned, gets 0
assert g1["a"] == w.bag([["Ada", 2], ["Ben", 1], ["Cy", 1]])           # COUNT(*) counts the NULL row
assert g1["b"] == w.bag([["Ada", 2], ["Ben", 1]]) == g1["c"]          # inner join / LEFT JOIN from Assignments: no Cy
LJ = w.T("Pilots LEFT JOIN Assignments", ["name", "flight_id"],
         d1.rows("SELECT P.name, A.flight_id FROM Pilots P LEFT JOIN Assignments A ON P.pilot_id = A.pilot_id"))
assert ["Cy", None] in LJ["rows"] and len(LJ["rows"]) == 4
CY = [i for i, r in enumerate(LJ["rows"]) if r[0] == "Cy"]

# ---------------------------------------------------------------- Q2: 26Z-CL-Q7
Q2 = BANK["26Z-CL-Q7"]
assert Q2["correctId"] == "b"
O2 = w.bank_opts(Q2)
S2 = {o: s for o, k, s in O2 if k == "code"}
FL = w.T("Flights", ["flight_id", "origin", "destination", "flight_date", "price"], [
    [1, "TLV", "Rome", "2026-07-01", 520], [2, "TLV", "Rome", "2026-07-02", 450], [3, "TLV", "Paris", "2026-07-03", 450],
    [4, "TLV", "Paris", "2026-07-04", 380]], pk=["flight_id"])
d2 = w.DB(FL)
assert "GROUP BY destination" in S2["c"] and "flight_id" in S2["c"].split("FROM")[0]     # bare flight_id: invalid
R2 = {o: d2.result(S2[o]) for o in "ab"}
assert sorted(r[0] for r in R2["b"]["rows"]) == [1, 3]                  # each destination's own maximum
assert sorted(r[0] for r in R2["a"]["rows"]) == [1, 2, 3]               # Rome 450 equals PARIS's maximum
D_EQ = "SELECT flight_id, destination, price FROM Flights WHERE price >= (SELECT MAX(price) FROM Flights)"
R2["d"] = w.T("תוצאה", ["flight_id", "destination", "price"], d2.rows(D_EQ))
assert [r[0] for r in R2["d"]["rows"]] == [1]                           # only the dearest flight overall
pr = [r[4] for r in FL["rows"]]
assert [r[0] for r in FL["rows"] if all(r[4] >= p for p in pr)] == [1]  # >= ALL by hand
G2 = {0: 0, 1: 0, 2: 1, 3: 1}

# ---------------------------------------------------------------- Q3: 26Z-CL-Q11
Q3 = BANK["26Z-CL-Q11"]
assert Q3["correctId"] == "c"
O3 = w.bank_opts(Q3)
S3 = {o: s for o, k, s in O3 if k == "code"}
BK = w.T("Bookings", ["passenger_id", "flight_id", "seat_class", "paid"], [
    [1, 10, "Economy", 300], [1, 11, "Economy", 320], [2, 10, "Economy", 300], [2, 11, "Business", 900],
    [2, 12, "Economy", 280], [3, 10, "Economy", 300], [3, 13, "Economy", 350]], pk=["passenger_id", "flight_id"])
AS3 = w.T("Assignments", ["pilot_id", "flight_id"], [[1, 10], [2, 10], [1, 11], [1, 12], [3, 13]],
          pk=["pilot_id", "flight_id"])
d3 = w.DB(BK, AS3)
E3 = d3.err(S3["d"])
assert E3 and "misuse of aggregate" in E3
R3 = {o: d3.result(S3[o]) for o in "abc"}
g3 = {o: sorted(r[0] for r in t["rows"]) for o, t in R3.items()}
assert g3 == {"a": [1, 2, 3], "b": [2], "c": [3]}
JN = d3.result("SELECT B.passenger_id, B.flight_id, A.pilot_id FROM Bookings B JOIN Assignments A "
               "ON B.flight_id = A.flight_id ORDER BY B.passenger_id, B.flight_id, A.pilot_id")
assert len(JN["rows"]) == 10 and [sum(1 for r in JN["rows"] if r[0] == p) for p in (1, 2, 3)] == [3, 4, 3]
assert [len({r[2] for r in JN["rows"] if r[0] == p}) for p in (1, 2, 3)] == [2, 2, 3]
G3 = {i: r[0] - 1 for i, r in enumerate(JN["rows"])}

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("זה סרטון הסיום של קורס ה-SQL: שלוש שאלות אמיתיות ממבחן, מההתחלה ועד הסוף."),
    P("בכל שאלה נזהה קודם את התבנית לפי מילת המפתח, נפסול לפי תחביר ותנאים, ונבדוק על נתונים."),
    P("ובסוף, הצ'קליסט לחלק ב׳ של המבחן.", hold=0.4, say="ובסוף, הצ'קליסט לחלק בֵּית של המבחן."),
], stage='<div class="kicker">S10 · SQL</div><h1>מבחן גמר: שאלות ממבחנים</h1>'
         '<p>שלוש שאלות ברמת המבחן: חיבור חיצוני וספירה, קיצון לכל קבוצה, וספירה של ערכים שונים.</p>', layout="title")

st1 = ("איזו שאילתה מחזירה <b>לכל טייס</b>, כולל טייסים שלא שובצו לאף טיסה, את שמו ואת מספר הטיסות שאליהן שובץ?")
ex1 = Scene("q1", "שאלה 1: לכל טייס, כולל 0", [
    P("שאלה ראשונה: לכל טייס, כולל טייסים שלא שובצו לאף טיסה, שמו ומספר הטיסות שלו."),
    P("״כולל מי שלא שובץ״: הוא חייב להופיע עם אפס. JOIN רגיל מעלים אותו, ולכן LEFT JOIN מטבלת הטייסים.",
      do=show("a-c1")),
    P("השאילתה עם JOIN רגיל: הטייס בלי שיבוצים נעלם.", do=show("p-x-b", "p-n-b")),
    P("LEFT JOIN מטבלת השיבוצים שומר את כל השיבוצים, לא את כל הטייסים. גם בה הוא נעלם.", do=show("p-x-c", "p-n-c")),
    P("ונשארו שתיים עם LEFT JOIN מהטייסים. ההבדל: <bdi>COUNT(*)</bdi> מול COUNT של מזהה הטיסה.", do=show("a-c2"),
      say="ונשארו שתיים עם לֶפְט ג'וֹיְן מהטייסים. ההבדל: קָאוּנְט כּוֹכָבִית, מול קָאוּנְט של מזהה הטיסה."),
], stage=w.col(w.stem(Q1["id"], st1),
               w.row(w.chip("a-c1", "״כולל מי שלא״ ← " + w.ic("LEFT JOIN") + " מ-" + w.ic("Pilots")),
                     w.chip("a-c2", w.ic("COUNT(*)") + " מול " + w.ic("COUNT(A.flight_id)")), gap=24),
               w.opts("p", O1, ncols=2, size="xs", notes={"a": "סופר את ה-NULL", "b": "JOIN רגיל",
                                                         "c": "הכיוון הפוך", "e": "יש נכונה"}), gap=20),
   layout="full")

ck1 = Scene("q1-check", "שאלה 1: על נתונים", [
    P("נבדוק: שלושה טייסים. סַיי חדש, ועוד לא שובץ לאף טיסה.", do=show("t1p", "t1a"),
      say="נבדוק: שלושה טייסים. סַיי חדש, ועוד לא שובץ לאף טיסה."),
    P("אחרי ה-LEFT JOIN יש לו שורה אחת, ובה מזהה הטיסה NULL.", do=show("t1j") + show(*[f"t1j-hi{i}" for i in CY])),
    P("<bdi>COUNT(*)</bdi> סופר את השורה הזו, ונותן לו אחת. זה לא נכון: הוא לא שובץ.", do=show("r1-a") + w.rows_do("r1-a", R1["a"]),
      say="קָאוּנְט כּוֹכָבִית סופר את השורה הזו, ונותן לו אחת. זה לא נכון: הוא לא שובץ."),
    P("COUNT של מזהה הטיסה מדלג על NULL, ונותן לו אפס. זו התשובה.",
      do=show("r1-d") + w.rows_do("r1-d", R1["d"])),
    P("ושתי השאילתות האחרות מחזירות רק שני טייסים.", do=show("r1-b") + w.rows_do("r1-b", R1["b"]), hold=0.5),
], stage=w.row(w.col(w.table("t1p", PI, size="sm", hidden=True, cols=[0, 1]), w.table("t1a", AS1, size="sm", hidden=True),
                     gap=20),
               w.table("t1j", LJ, size="sm", hidden=True, cap="אחרי " + w.ic("LEFT JOIN")),
               w.result("r1-a", R1["a"], size="sm", cap=w.ic("COUNT(*)"), hidden=True),
               w.result("r1-d", R1["d"], size="sm", cap=w.ic("COUNT(A.flight_id)"), hidden=True),
               w.result("r1-b", R1["b"], size="sm", cap=w.ic("JOIN") + " רגיל", hidden=True), gap=34),
   layout="full")

st2 = "איזו שאילתה מחזירה, <b>לכל יעד</b>, את הטיסה (או הטיסות) היקרה ביותר לאותו יעד?"
ex2 = Scene("q2", "שאלה 2: הכי יקר לכל יעד", [
    P("שאלה שנייה: לכל יעד, הטיסה היקרה ביותר לאותו יעד."),
    P("זה קיצון, אבל לא של כל הטבלה: כל טיסה מושווית למקסימום של היעד שלה. תת-שאילתה מתואמת.", do=show("b-c1")),
    P("השאילתה עם GROUP BY לפי יעד בוחרת גם את מזהה הטיסה, שלא בקבוצה ולא באגרגציה. פסולה.",
      do=show("p2-x-c", "p2-n-c")),
    P("גדול או שווה ל-ALL מול כל הטבלה: רק הטיסה היקרה ביותר בכלל, ולא אחת לכל יעד.", do=show("p2-x-d", "p2-n-d"),
      say="גדול או שווה לאוֹל מול כל הטבלה: רק הטיסה היקרה ביותר בכלל, ולא אחת לכל יעד."),
    P("ונשארו שתיים: IN על רשימת המקסימומים, ושווה למקסימום של אותו היעד. נבדוק אותן על נתונים.",
      do=show("b-c2")),
], stage=w.col(w.stem(Q2["id"], st2),
               w.row(w.chip("b-c1", "״לכל יעד, הכי״ ← תת-שאילתה מתואמת"),
                     w.chip("b-c2", w.ic("IN (… GROUP BY …)") + " מול " + w.ic("F2.destination = F1.destination")), gap=24),
               w.opts("p2", O2, ncols=2, size="sm", notes={"c": "flight_id לא בקבוצה", "d": "מקסימום כללי",
                                                           "e": "יש נכונה"}), gap=20),
   layout="full")

ck2 = Scene("q2-check", "שאלה 2: על נתונים", [
    P("ארבע טיסות: שתיים לרומא, ושתיים לפריז. המקסימום לרומא 520, ולפריז 450.",
      do=show("t2") + show(*[f"t2-g{i}" for i in G2]),
      say="ארבע טיסות: שתיים לרומא, ושתיים לפריז. המקסימום לרומא חמש מאות עשרים, ולפריז ארבע מאות חמישים."),
    P("השאילתה המתואמת משווה כל טיסה למקסימום של היעד שלה: טיסה 1 לרומא, וטיסה 3 לפריז.",
      do=show("r2-b") + w.rows_do("r2-b", R2["b"])),
    P("IN בודק רק אם המחיר מופיע ברשימת המקסימומים: 520 או 450. גם טיסה 2 לרומא עולה 450!",
      do=show("t2-c1-4", "r2-a") + w.rows_do("r2-a", R2["a"]),
      say="אִין בודק רק אם המחיר מופיע ברשימת המקסימומים: חמש מאות עשרים או ארבע מאות חמישים. גם טיסה שתיים לרומא עולה ארבע מאות חמישים!"),
    P("היא לא הכי יקרה לרומא. היא רק שווה למקסימום של יעד אחר. לכן IN נופל.", do=show("t2-x1")),
    P("והמקסימום הכללי מחזיר טיסה אחת בלבד. התשובה: התת-שאילתה המתואמת.",
      do=show("r2-d") + w.rows_do("r2-d", R2["d"]), hold=0.5),
], stage=w.row(w.table("t2", FL, hidden=True, cols=[0, 2, 4], groups=G2, cells=[(1, 4)]),
               w.result("r2-b", R2["b"], size="sm", cap="מתואמת", hidden=True),
               w.result("r2-a", R2["a"], size="sm", cap=w.ic("IN"), hidden=True),
               w.result("r2-d", R2["d"], size="sm", cap=w.ic(">= ALL"), hidden=True), gap=34),
   layout="full")

st3 = "איזו שאילתה מחזירה את המזהים של הנוסעים שטסו עם <b>לפחות 3 טייסים שונים</b>?"
ex3 = Scene("q3", "שאלה 3: טייסים שונים", [
    P("שאלה שלישית: נוסעים שטסו עם לפחות שלושה טייסים שונים."),
    P("שתי מילות מפתח: ״לפחות שלושה״ זה גדול או שווה, ו״שונים״ זה COUNT DISTINCT.", do=show("c-c1"),
      say="שתי מילות מפתח: לפחות שלושה זה גדול או שווה, ושונים זה קָאוּנְט דִיסְטִינְקְט."),
    P("והתנאי על הספירה הוא תנאי על קבוצה. השאילתה עם COUNT בתוך WHERE פסולה.", do=show("p3-x-d", "p3-n-d")),
    P("נשארו שלוש, עם שלוש ספירות שונות: שורות, טיסות שונות, וטייסים שונים.", do=show("c-c2")),
], stage=w.col(w.stem(Q3["id"], st3),
               w.row(w.chip("c-c1", "״לפחות 3 שונים״ ← " + w.ic("COUNT(DISTINCT …) >= 3")),
                     w.chip("c-c2", w.ic("COUNT(*)") + " · " + w.ic("DISTINCT flight_id") + " · "
                            + w.ic("DISTINCT pilot_id")), gap=24),
               w.opts("p3", O3, ncols=2, size="xs", notes={"a": "סופר שורות", "b": "טיסות, לא טייסים",
                                                          "d": "COUNT ב-WHERE", "e": "יש נכונה"}), gap=20),
   layout="full")

ck3 = Scene("q3-check", "שאלה 3: על נתונים", [
    P("אחרי הצירוף יש שורה לכל זוג של הזמנה וטייס בטיסה. בטיסה 10 יש שני טייסים, ולכן היא מכפילה שורות.",
      do=show("t3") + show(*[f"t3-g{i}" for i in G3])),
    P("<bdi>COUNT(*)</bdi> סופר שורות: לכל שלושת הנוסעים יש לפחות שלוש, וכולם עוברים.", do=show("r3-a") + w.rows_do("r3-a", R3["a"]),
      say="קָאוּנְט כּוֹכָבִית סופר שורות: לכל שלושת הנוסעים יש לפחות שלוש, וכולם עוברים."),
    P("טיסות שונות: נוסע מספר 2 טס בשלוש טיסות, אבל כולן עם אותו טייס, ועוד טייס אחד בטיסה 10. רק שני טייסים.",
      do=show("r3-b") + w.rows_do("r3-b", R3["b"])),
    P("וטייסים שונים: רק נוסע מספר 3 טס עם שלושה טייסים. זו התשובה.",
      do=show("r3-c") + w.rows_do("r3-c", R3["c"]), hold=0.5),
], stage=w.row(w.table("t3", JN, size="sm", hidden=True, groups=G3, cap="אחרי ה-" + w.ic("JOIN")),
               w.result("r3-a", R3["a"], size="sm", cap=w.ic("COUNT(*)"), hidden=True),
               w.result("r3-b", R3["b"], size="sm", cap=w.ic("DISTINCT B.flight_id"), hidden=True),
               w.result("r3-c", R3["c"], size="sm", cap=w.ic("DISTINCT A.pilot_id"), hidden=True), gap=40),
   layout="full")

recap = Scene("recap", "הצ'קליסט", [
    P("הצ'קליסט לחלק ב׳: קודם מזהים את התבנית לפי מילת המפתח.", do=show("r-1"),
      say="הצ'קליסט לחלק בֵּית: קודם מזהים את התבנית לפי מילת המפתח."),
    P("״לכל קורס״ זה קיבוץ. ״לכל הקורסים״ זה חילוק. ״הכי״ זה קיצון. ״אף פעם״ זו שלילה.", do=show("r-2"),
      say="לכל קורס, זה קיבוץ. לכל הקורסים, זה חילוק. הכי, זה קיצון. אף פעם, זו שלילה."),
    P("פוסלים לפי תחביר: אגרגציה ב-WHERE, ועמודה רגילה שלא ב-GROUP BY.", do=show("r-3")),
    P("ואז לפי תנאים: AND מול OR, גדול מול גדול או שווה, DISTINCT, וכיוון ה-LEFT JOIN.", do=show("r-4")),
    P("ובספק, בונים שלוש שורות של נתונים ומריצים בראש. בהצלחה במבחן!", do=show("r-5"), hold=0.6),
], stage=w.code("rq", '-- FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY', size="sm"),
   panel=st.card("r-1", "rule", "🔑 מזהים תבנית לפי מילת מפתח")
         + st.card("r-2", "ex", "קיבוץ · חילוק · קיצון · שלילה")
         + st.card("r-3", "trap", "⚠️ " + w.ic("WHERE COUNT(…)") + " · עמודה לא ב-" + w.ic("GROUP BY"))
         + st.card("r-4", "trap", "⚠️ " + w.ic("AND/OR") + " · " + w.ic("> / >=") + " · " + w.ic("DISTINCT"))
         + st.card("r-5", "rule", "🔑 בספק: נתונים קטנים, ומריצים"))

VIDEO = Video("S10", "sql", "מבחן גמר: שאלות ממבחנים", [title, ex1, ck1, ex2, ck2, ex3, ck3, recap], bank={"26Z-CL-Q8": "d", "26Z-CL-Q7": "b", "26Z-CL-Q11": "c"})
