# -*- coding: utf-8 -*-
"""S01 · SELECT בסיסי — video script (build: tools/video/vid.py S01).

Source: sql/levels/S01.js (lesson + goal: SELECT/FROM/WHERE, AND vs OR, LIKE with %, DISTINCT, BETWEEN inclusive).
Exam anchor: 26S-A-Q6 (distinct destinations containing 'York', price > 500), not cited by any level quiz.
Avoided on purpose: the S01 quiz (its Students table, Haifa/birth_year conditions, 'D%' / '%i%') and the exam questions
it is modelled on (25B-A-Q9, 23B-A2-Q5, 24B-A-Q11). Worked examples use an original Hotels table.
Every query on screen runs in SQLite (w_sql.DB); the result tables are built from its output and asserted here.
For the exam, an original Flight instance (the exam gives no data) runs every option.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_sql as w

# ---------------------------------------------------------------- data (original)
HOT = w.T("Hotels", ["h_name", "city", "stars", "price"], [
    ["Sea View", "Eilat", 4, 650],
    ["Olive Inn", "Haifa", 3, 380],
    ["Desert Rose", "Eilat", 5, 900],
    ["City Lights", "Tel Aviv", 4, 720],
    ["Blue Bay", "Eilat", 3, 420],
    ["Royal Garden", "Haifa", 5, 980],
    ["Port Rooms", "Haifa", 2, 250],
], pk=["h_name"])
db = w.DB(HOT)
N = len(HOT["rows"])

# idea: FROM -> WHERE -> SELECT
Q1 = "SELECT h_name, price\nFROM Hotels\nWHERE city = 'Eilat'"
R1 = db.result(Q1)
K1 = w.kept(HOT, lambda r: r["city"] == "Eilat")
assert R1["rows"] == [["Sea View", 650], ["Desert Rose", 900], ["Blue Bay", 420]] and K1 == [0, 2, 4]

# AND / OR
QA = "SELECT h_name FROM Hotels\nWHERE city = 'Eilat' AND price < 700"
QO = "SELECT h_name FROM Hotels\nWHERE city = 'Eilat' OR price < 700"
RA, RO = db.result(QA), db.result(QO)
KA = w.kept(HOT, lambda r: r["city"] == "Eilat" and r["price"] < 700)
KO = w.kept(HOT, lambda r: r["city"] == "Eilat" or r["price"] < 700)
assert len(RA["rows"]) == 2 and len(RO["rows"]) == 5 and [HOT["rows"][i][0] for i in KA] == [r[0] for r in RA["rows"]]
assert [HOT["rows"][i][0] for i in KO] == [r[0] for r in RO["rows"]] and set(KA) <= set(KO)
# precedence: AND binds first (the card states it), checked on this table
assert w.bag(db.rows("SELECT h_name FROM Hotels WHERE stars = 5 OR city = 'Eilat' AND price < 500")) == \
    w.bag(db.rows("SELECT h_name FROM Hotels WHERE stars = 5 OR (city = 'Eilat' AND price < 500)")) != \
    w.bag(db.rows("SELECT h_name FROM Hotels WHERE (stars = 5 OR city = 'Eilat') AND price < 500"))

# LIKE
QL1 = "SELECT h_name FROM Hotels\nWHERE h_name LIKE 'Ro%'"
QL2 = "SELECT h_name FROM Hotels\nWHERE h_name LIKE '%Ro%'"
QL3 = "SELECT h_name FROM Hotels\nWHERE h_name = '%Ro%'"
RL1, RL2, RL3 = db.result(QL1), db.result(QL2), db.result(QL3)
assert RL1["rows"] == [["Royal Garden"]] and len(RL2["rows"]) == 3 and RL3["rows"] == []
KL1 = w.kept(HOT, lambda r: r["h_name"].startswith("Ro"))
KL2 = w.kept(HOT, lambda r: "Ro" in r["h_name"])
assert [HOT["rows"][i][0] for i in KL2] == [r[0] for r in RL2["rows"]]
# the result does not depend on LIKE's case sensitivity (MySQL compares case-insensitively)
ci = w.DB(HOT)
ci.con.execute("PRAGMA case_sensitive_like = OFF")
assert ci.rows(QL1) == RL1["rows"] and ci.rows(QL2) == RL2["rows"]

# DISTINCT
QD0 = "SELECT city\nFROM Hotels"
QD1 = "SELECT DISTINCT city\nFROM Hotels"
RD0, RD1 = db.result(QD0), db.result(QD1)
assert len(RD0["rows"]) == 7 and len(RD1["rows"]) == 3

# BETWEEN: both ends included
QB = "SELECT h_name, price\nFROM Hotels\nWHERE price BETWEEN 420 AND 720"
RB = db.result(QB)
KB = w.kept(HOT, lambda r: 420 <= r["price"] <= 720)
assert sorted(r[1] for r in RB["rows"]) == [420, 650, 720]
assert w.bag(RB["rows"]) == w.bag(db.rows("SELECT h_name, price FROM Hotels WHERE price >= 420 AND price <= 720"))

# ---------------------------------------------------------------- exam 26S-A-Q6
Q = BANK["26S-A-Q6"]
assert Q["correctId"] == "c"
OPTS = w.bank_opts(Q)
FL = w.T("Flight", ["flight_number", "origin", "destination", "dep_date", "price"], [
    [101, "TLV", "New York", "2026-07-01", 820],
    [102, "TLV", "New York", "2026-07-08", 650],
    [103, "TLV", "York", "2026-07-03", 600],
    [104, "TLV", "London", "2026-07-04", 900],
    [105, "TLV", "Paris", "2026-07-05", 450],
], pk=["flight_number"])
fdb = w.DB(FL)
XR = {oid: fdb.result(v, columns=["destination"]) for oid, _, v in OPTS}
got = {k: [r[0] for r in t["rows"]] for k, t in XR.items()}
assert got["a"] == []                                            # '=' takes % literally
assert sorted(got["b"]) == ["London", "New York", "York"]        # OR lets every expensive flight in
assert sorted(got["c"]) == ["New York", "York"]                  # the key: contains + expensive, once each
assert got["d"] == ["York"]                                      # no %: York exactly, New York is lost
assert sorted(got["e"]) == ["New York", "New York", "York"]      # no DISTINCT: one row per flight
assert len({tuple(sorted(v)) for v in got.values()}) == 5        # the instance tells every option apart
CAPS = {"a": w.ic("= '%York%'"), "b": w.ic("OR"), "c": w.ic("LIKE … AND"), "d": w.ic("LIKE 'York'"),
        "e": "בלי " + w.ic("DISTINCT")}

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נכתוב את השאילתה הבסיסית ביותר: שאילתה על טבלה אחת."),
    P("נראה איך בוחרים שורות ועמודות, איך מחברים תנאים, ומה עושים LIKE, DISTINCT ו-BETWEEN."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">S01 · SQL</div><h1>SELECT בסיסי</h1>'
         '<p>לבחור עמודות ושורות מטבלה אחת: WHERE, AND/OR, LIKE, DISTINCT ו-BETWEEN.</p>', layout="title")

idea = Scene("idea", "שאילתה אחת", [
    P("שאילתה בסיסית עונה על שלוש שאלות: מאיזו טבלה, אילו שורות, ואילו עמודות."),
    P("FROM אומר מאיזו טבלה קוראים. כאן: הטבלה של המלונות.", do=show("i1-l1", "ih")),
    P("WHERE נותן תנאי. הוא עובר שורה אחרי שורה, ומשאיר רק שורות שהתנאי עליהן אמת.", do=show("i1-l2")),
    P("התנאי כאן: העיר היא אילת. שלושה מלונות עוברים, וארבעה נזרקים.", do=w.where_do("ih", K1, N)),
    P("ורק בסוף SELECT בוחר עמודות: שם המלון, והמחיר.", do=show("i1-l0")),
    P("התוצאה: שלוש שורות, בשתי עמודות.", do=w.rows_do("ir", R1)),
    P("שימו לב לסדר: SELECT נכתב ראשון, אבל רץ אחרי FROM ו-WHERE.", do=show("i-c1")),
    P("ולכן מותר לסנן לפי עמודה שלא בחרנו: העיר לא מופיעה בתוצאה בכלל.", do=show("i-c2"), hold=0.4),
], stage=w.col(w.code("i1", Q1, hidden=True),
               w.row(w.table("ih", HOT, hidden=True), w.result("ir", R1)), gap=30),
   panel=st.card("i-c1", "rule", "🔑 סדר הביצוע: " + w.ic("FROM") + " ← " + w.ic("WHERE") + " ← " + w.ic("SELECT"))
         + st.card("i-c2", "ex", "מותר לסנן לפי עמודה שלא מופיעה ב-" + w.ic("SELECT")))

andor = Scene("andor", "AND מול OR", [
    P("עכשיו שני תנאים: מלונות באילת, שהמחיר שלהם מתחת ל-700.", do=show("aq"),
      say="עכשיו שני תנאים: מלונות באילת, שהמחיר שלהם מתחת לשבע מאות."),
    P("AND: שני התנאים חייבים להתקיים יחד.", do=w.where_do("at", KA, N)),
    P("נשארים רק שני מלונות.", do=w.rows_do("ar", RA)),
    P("ועכשיו אותו דבר עם OR: מספיק שאחד התנאים יתקיים.", do=w.undo_where("at", KA, N) + show("oq")),
    P("כל מלון באילת נכנס, וגם כל מלון זול, מכל עיר שהיא.", do=w.where_do("at", KO, N)),
    P("חמש שורות במקום שתיים. OR אף פעם לא מחזיר פחות מ-AND.", do=w.rows_do("or", RO)),
    P("בשאלה כתוב ״וגם״? ספרו את התנאים, וחברו את כולם ב-AND. זה המסיח הכי נפוץ במבחן.", do=show("a-c1")),
    P("ואם מערבבים: AND קודם ל-OR, כמו כפל לפני חיבור. בספק, שימו סוגריים.", do=show("a-c2"), hold=0.4),
], stage=w.col(w.code("aq", QA, size="sm h"), w.code("oq", QO, size="sm h"),
               w.row(w.table("at", HOT, size="sm"), w.result("ar", RA, size="sm", cap="תוצאה עם AND"),
                     w.result("or", RO, size="sm", cap="תוצאה עם OR"), gap=26), gap=18),
   panel=st.card("a-c1", "rule", "🔑 ״וגם״ = " + w.ic("AND") + " · ״או״ = " + w.ic("OR"))
         + st.card("a-c2", "trap", "⚠️ " + w.ic("a OR b AND c") + " נקרא " + w.ic("a OR (b AND c)")))

like = Scene("like", "LIKE", [
    P("LIKE משווה לתבנית. הסימן אחוז מחליף רצף תווים כלשהו, גם רצף ריק.", do=show("l-c0")),
    P("Ro ואחריו אחוז: שם שמתחיל ב-Ro. יש רק מלון אחד כזה.", do=show("l1") + w.where_do("lt", KL1, N) + w.rows_do("lr1", RL1),
      say="אָר אוֹ ואחריו אחוז: שם שמתחיל באותיות אָר אוֹ. יש רק מלון אחד כזה."),
    P("אחוז משני הצדדים: שם שמכיל Ro בכל מקום. עכשיו שלושה מלונות.",
      do=w.undo_where("lt", KL1, N) + show("l2") + w.where_do("lt", KL2, N) + w.rows_do("lr2", RL2),
      say="אחוז משני הצדדים: שם שמכיל אָר אוֹ, בכל מקום. עכשיו שלושה מלונות."),
    P("ועם סימן שווה במקום LIKE, האחוז הוא סתם תו. אף מלון לא נקרא ממש כך, ולכן אין אף שורה.",
      do=w.undo_where("lt", KL2, N) + show("l3") + w.rows_do("lr3", RL3)),
    P("תבנית עובדת רק עם LIKE.", do=show("l-c1")),
    P("ויש עוד סימן: קו תחתון מחליף תו אחד בדיוק.", do=show("l-c2"), hold=0.4),
], stage=w.col(w.code("l1", QL1, size="xs h"), w.code("l2", QL2, size="xs h"), w.code("l3", QL3, size="xs h"),
               w.row(w.table("lt", HOT, size="sm", cols=[0]), w.result("lr1", RL1, size="sm", cap=w.ic("'Ro%'")),
                     w.result("lr2", RL2, size="sm", cap=w.ic("'%Ro%'")),
                     w.result("lr3", RL3, size="sm", cap=w.ic("= '%Ro%'")), gap=24), gap=12),
   panel=st.card("l-c0", "ex", w.ic("%") + " = רצף תווים כלשהו (גם ריק)")
         + st.card("l-c1", "trap", "⚠️ " + w.ic("= '%Ro%'") + " מחפש את המחרוזת עצמה")
         + st.card("l-c2", "ex", w.ic("_") + " = תו אחד בדיוק"))

dist = Scene("distinct", "DISTINCT", [
    P("SELECT של העיר מחזיר שורה לכל מלון: שבע שורות, עם כפילויות.", do=show("d0") + w.rows_do("dr0", RD0)),
    P("DISTINCT אחרי SELECT מוחק שורות כפולות בתוצאה. נשארות שלוש ערים.", do=show("d1") + w.rows_do("dr1", RD1)),
    P("השאלה אומרת ״שונים״, או ״בלי כפילויות״? זה הרמז ל-DISTINCT.", do=show("d-c1"), hold=0.4),
], stage=w.row(w.col(w.code("d0", QD0, size="sm h"), w.result("dr0", RD0)),
               w.col(w.code("d1", QD1, size="sm h"), w.result("dr1", RD1)), gap=60),
   panel=st.card("d-c1", "rule", "🔑 ״שונים״ = " + w.ic("DISTINCT")))

betw = Scene("between", "BETWEEN", [
    P("BETWEEN בודק טווח, וכולל את שני הקצוות.", do=show("b0")),
    P("בין 420 ל-720: המלון שעולה בדיוק 720 נכנס, וגם זה שעולה בדיוק 420.",
      do=w.where_do("bt", KB, N) + show("bt-c3-3", "bt-c4-3"),
      say="בין ארבע מאות עשרים לשבע מאות עשרים: המלון שעולה בדיוק שבע מאות עשרים נכנס, וגם זה שעולה בדיוק ארבע מאות עשרים."),
    P("התוצאה: שלושה מלונות.", do=w.rows_do("br", RB)),
    P("כלומר BETWEEN הוא קיצור של גדול או שווה, וגם קטן או שווה.", do=show("b-c1"), hold=0.4),
], stage=w.col(w.code("b0", QB, hidden=False, size="sm h"),
               w.row(w.table("bt", HOT, cells=[(3, 3), (4, 3)]), w.result("br", RB), gap=40), gap=26),
   panel=st.card("b-c1", "rule", "🔑 " + w.ic("x BETWEEN a AND b") + "<br>= " + w.ic("x >= a AND x <= b")))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: אילו יעדים **שונים**, ששמם **מכיל** את המילה York, מופיעים בטיסות שמחירן מעל 500?",
      say="שאלה ממבחן: אילו יעדים שונים, שהשם שלהם מכיל את המילה יוֹרְק, מופיעים בטיסות שהמחיר שלהן מעל חמש מאות?"),
    P("נספור דרישות. ״מכיל״: LIKE, עם אחוז משני הצדדים.", do=show("xc1")),
    P("״מחירן מעל 500״, ויחד עם הדרישה הקודמת: AND.", do=show("xc2"),
      say="המחיר מעל חמש מאות, ויחד עם הדרישה הקודמת: אֶנְד."),
    P("ו״שונים״: DISTINCT.", do=show("xc3")),
    P("עכשיו נפסול. סימן שווה עם אחוזים מחפש יעד שנקרא ממש כך, עם האחוזים.", do=show("q-x-a", "q-n-a")),
    P("OR מחזיר כל טיסה יקרה, לכל יעד.", do=show("q-x-b", "q-n-b")),
    P("LIKE בלי אחוזים תופס רק את York בדיוק, ולא את New York.", do=show("q-x-d", "q-n-d"),
      say="לַייק בלי אחוזים תופס רק את יוֹרְק בדיוק, ולא את נְיוּ יוֹרְק."),
    P("ובלי DISTINCT, יעד חוזר פעם לכל טיסה.", do=show("q-x-e", "q-n-e")),
    P("נשארה השאילתה עם LIKE, AND ו-DISTINCT. זו התשובה.", do=show("q-ok-c"), hold=0.5),
], stage=w.col(w.stem(Q["id"], "אילו יעדים <b>שונים</b> ששמם <b>מכיל</b> את המילה " + w.ic("'York'")
                      + " מופיעים בטיסות שמחירן גבוה מ-500?"),
               w.row(w.chip("xc1", "מכיל ← " + w.ic("LIKE '%York%'")), w.chip("xc2", "וגם ← " + w.ic("AND")),
                     w.chip("xc3", "שונים ← " + w.ic("DISTINCT")), gap=24),
               w.opts("q", OPTS, ncols=2, notes={"a": "= לא מבין %", "b": "OR במקום AND", "d": "בלי %",
                                                  "e": "כפילויות"}), gap=26),
   layout="full")

check = Scene("check", "בודקים על נתונים", [
    P("נבדוק על נתונים. חמש טיסות: שתיים לניו יורק, אחת ליורק, אחת ללונדון ואחת לפריז.", do=show("ft")),
    P("השאילתה עם סימן השווה: אין אף שורה.", do=show("xr-a") + w.rows_do("xr-a", XR["a"])),
    P("עם OR: גם לונדון נכנסת, רק כי היא יקרה.", do=show("xr-b") + w.rows_do("xr-b", XR["b"])),
    P("LIKE בלי אחוזים: רק יורק. ניו יורק נעלמה.", do=show("xr-d") + w.rows_do("xr-d", XR["d"])),
    P("בלי DISTINCT: ניו יורק מופיעה פעמיים.", do=show("xr-e") + w.rows_do("xr-e", XR["e"])),
    P("והשאילתה הנכונה: ניו יורק ויורק, כל אחת פעם אחת.", do=show("xr-c") + w.rows_do("xr-c", XR["c"]), hold=0.5),
], stage=w.row(w.table("ft", FL, hidden=True, cols=[0, 2, 4]),
               *[w.result(f"xr-{k}", XR[k], cap=CAPS[k], hidden=True) for k in "abcde"], gap=26),
   layout="full")

recap = Scene("recap", "סיכום", [
    P("לסיכום: FROM בוחר טבלה, WHERE בוחר שורות, ו-SELECT בוחר עמודות, ורץ אחריהם.", do=show("r-1")),
    P("״וגם״ זה AND, ו-OR מחזיר יותר שורות.", do=show("r-2")),
    P("תבנית רק עם LIKE: אחוז הוא רצף כלשהו. DISTINCT מוחק כפילויות.", do=show("r-3")),
    P("ו-BETWEEN כולל את שני הקצוות. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.code("rq", "SELECT DISTINCT destination\nFROM Flight\nWHERE destination LIKE '%York%'\n  AND price > 500"),
   panel=st.card("r-1", "rule", "🔑 " + w.ic("FROM") + " ← " + w.ic("WHERE") + " ← " + w.ic("SELECT"))
         + st.card("r-2", "rule", "🔑 ״וגם״ = " + w.ic("AND"))
         + st.card("r-3", "trap", "⚠️ " + w.ic("%") + " רק עם " + w.ic("LIKE"))
         + st.card("r-4", "ex", w.ic("BETWEEN") + " כולל את הקצוות"))

VIDEO = Video("S01", "sql", "SELECT בסיסי", [title, idea, andor, like, dist, betw, exam, check, recap], bank={"26S-A-Q6": "c"})
