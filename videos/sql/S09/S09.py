# -*- coding: utf-8 -*-
"""S09 · VIEW, תת-שאילתה ב-FROM ושאילתות בשלבים — video script (build: tools/video/vid.py S09).

Source: sql/levels/S09.js (lesson + goal: aggregate on aggregate = a subquery in FROM with an alias (AVG(MAX(x)) is
invalid); CREATE VIEW (and INTO) as a named helper used like a table; self-join with two aliases, < gives each pair
once, <> twice).
Exam anchor: 26Z-CL-Q9 (a VIEW of passengers whose total paid is over 2000), not cited by any level quiz.
Avoided on purpose: the S09 quiz (Employees with dept/salary/manager_id, Assignments, numProj, dept_size/max_size)
and the exam items it cites (26B-A-Q12, 23B-A-Q7, 24B-A-Q13, 22B-A-Q5, 24B-A-Q8); also 26S-A-Q9 (a twin of
26B-A-Q12) and 21B-C-Q8/Q9 (the 3-generation chain, twins of S09-Q7). Worked examples use original Deliveries and
Couriers tables; the exam check an original Bookings instance.
After review: the steps example uses MAX of a per-city SUM (not S09-Q1/Q2's AVG of MAX), and the self-join scene only
states the rule and shows the correct query (it does not run S09-Q6's distractors).
Not run on purpose: the exam option with HAVING before GROUP BY (standard SQL and the course reject it; SQLite 3.39+
accepts it as an extension), reasoned by the clause order. Every other query runs in SQLite.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_sql as w

# ---------------------------------------------------------------- data (original)
DE = w.T("Deliveries", ["courier", "city", "minutes"], [
    ["Gal", "Haifa", 30], ["Ori", "Haifa", 45], ["Uri", "Haifa", 40], ["Ron", "Eilat", 20], ["Tal", "Eilat", 50],
    ["Ido", "Akko", 25]])
CO = w.T("Couriers", ["c_id", "c_name", "city"], [
    [1, "Gal", "Haifa"], [2, "Ori", "Haifa"], [3, "Ron", "Eilat"], [4, "Tal", "Eilat"], [5, "Uri", "Haifa"]], pk=["c_id"])
db = w.DB(DE, CO)

Q1 = "SELECT city, SUM(minutes) AS total\nFROM Deliveries\nGROUP BY city"
R1 = db.result(Q1 + "\nORDER BY total DESC", columns=["city", "total"])
assert R1["rows"] == [["Haifa", 115], ["Eilat", 70], ["Akko", 25]]
Q2 = "SELECT MAX(total)\nFROM (SELECT city, SUM(minutes) AS total\n      FROM Deliveries\n      GROUP BY city) AS T"
R2 = db.result(Q2, columns=["MAX(total)"])
assert R2["rows"] == [[115]] and 30 + 45 + 40 == 115
assert db.rows("SELECT MAX(minutes) FROM Deliveries") == [[50]]            # not the longest single delivery
QE = "SELECT MAX(SUM(minutes))\nFROM Deliveries\nGROUP BY city"
EE = db.err(QE)
assert EE and "misuse of aggregate" in EE
GC = {i: {"Haifa": 0, "Eilat": 1, "Akko": 2}[r[1]] for i, r in enumerate(DE["rows"])}
GR = {i: {"Haifa": 0, "Eilat": 1, "Akko": 2}[r[0]] for i, r in enumerate(R1["rows"])}

QV = "CREATE VIEW city_total AS\nSELECT city, SUM(minutes) AS total\nFROM Deliveries\nGROUP BY city"
QV2 = "SELECT MAX(total) FROM city_total"
RV = w.T("תוצאה", ["MAX(total)"], db.rows(QV + ";\n" + QV2))
assert RV["rows"] == R2["rows"]
QV3 = "SELECT city FROM city_total\nWHERE total > 60"
RV3 = w.T("תוצאה", ["city"], db.rows(QV3))
assert sorted(r[0] for r in RV3["rows"]) == ["Eilat", "Haifa"]

QS = ("SELECT C1.c_name, C2.c_name\nFROM Couriers C1, Couriers C2\nWHERE C1.city = C2.city\n  AND C1.c_id < C2.c_id")
RS = db.result(QS, columns=["c_name", "c_name"])
assert w.bag(RS["rows"]) == w.bag([["Gal", "Ori"], ["Gal", "Uri"], ["Ori", "Uri"], ["Ron", "Tal"]])
QS2 = QS.replace("C1.c_id < C2.c_id", "C1.c_id <> C2.c_id")
assert len(db.rows(QS2)) == 8 == 2 * len(RS["rows"])
assert len(db.rows(QS.replace("\n  AND C1.c_id < C2.c_id", ""))) == 13        # without it: each with himself too

# ---------------------------------------------------------------- exam 26Z-CL-Q9
Q = BANK["26Z-CL-Q9"]
assert Q["correctId"] == "a"
OPTS = w.bank_opts(Q)
SQL = {o: s for o, k, s in OPTS if k == "code"}
assert SQL["d"].index("HAVING") < SQL["d"].index("GROUP BY")                 # d: HAVING before GROUP BY (not run)
BK = w.T("Bookings", ["passenger_id", "flight_id", "seat_class", "paid"], [
    [1, 10, "Business", 1800], [1, 11, "Economy", 450], [2, 12, "Business", 2500], [2, 13, "Economy", 300],
    [3, 10, "Economy", 900], [3, 14, "Economy", 600]], pk=["passenger_id", "flight_id"])
xdb = w.DB(BK)


def view_rows(sql):
    d = w.DB(BK)
    return d.rows(sql + ";\nSELECT * FROM BigSpenders")


XA, XB = view_rows(SQL["a"]), view_rows(SQL["b"])
assert w.bag(XA) == w.bag([[1, 2250], [2, 2800]])           # the sums of whole groups
assert XB == [[2, 2500]]                                    # WHERE paid > 2000 first: P1 lost, P2 gets a partial sum
EC = xdb.err(SQL["c"] + "; SELECT * FROM BigSpenders")
assert EC and "misuse of aggregate" in EC
RA, RB = w.T("BigSpenders", ["passenger_id", "total"], XA), w.T("BigSpenders", ["passenger_id", "total"], XB)
GB = {i: r[0] - 1 for i, r in enumerate(BK["rows"])}

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נבנה שאילתות בשלבים: קודם מחשבים משהו, ואז מחשבים על התוצאה."),
    P("נראה תת-שאילתה בתוך FROM, את VIEW, וצירוף של טבלה לעצמה."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">S09 · SQL</div><h1>VIEW, תת-שאילתה ב-FROM ושאילתות בשלבים</h1>'
         '<p>לבנות שאילתה בשלבים: אגרגציה על אגרגציה, VIEW / INTO כעזר, וצירוף טבלה לעצמה.</p>', layout="title")

steps = Scene("steps", "אגרגציה על אגרגציה", [
    P("שליחויות בשלוש ערים. השאלה: מהו סך הדקות הגדול ביותר שנצבר בעיר אחת?", do=show("st")),
    P("אלה שני שלבים: קודם סכום לכל עיר, ואז המקסימום של הסכומים.", do=show("s-c1")),
    P("הדבר הטבעי לכתוב הוא MAX של SUM. אבל זו אגרגציה על אגרגציה, והיא פסולה.", do=show("se")),
    P("שלב ראשון: GROUP BY לפי עיר, ו-SUM. שלוש שורות.", do=show("s1") + show(*[f"st-g{i}" for i in GC]) + w.rows_do("sr1", R1)),
    P("שלב שני: התוצאה הזו נכנסת לתוך FROM, כאילו הייתה טבלה, והשאילתה החיצונית מחשבת עליה מקסימום.", do=show("s2")),
    P("115 בחיפה: זה הסכום הגדול ביותר. לא 50, שזו השליחות הארוכה ביותר לבד.", do=w.rows_do("sr2", R2),
      say="מאה וחמש עשרה בחיפה: זה הסכום הגדול ביותר. לא חמישים, שזו השליחות הארוכה ביותר לבד."),
    P("ולטבלה הזמנית נותנים שם עם AS, כאן T, כמו בכל טבלה.", do=show("s2-m3", "s-c2"), hold=0.4,
      say="ולטבלה הזמנית נותנים שם עם אֶז, כאן טִי, כמו בכל טבלה."),
], stage=w.col(w.note("se", w.ic("MAX(SUM(minutes))") + ": <b class='sq-bad'>שגיאה</b>"),
               w.row(w.table("st", DE, size="sm", hidden=True, groups=GC),
                     w.col(w.code("s1", Q1, size="xs h"), w.result("sr1", R1, size="sm", groups=GR), gap=12),
                     gap=30),
               w.row(w.code("s2", Q2, size="xs h"), w.result("sr2", R2, size="sm"), gap=30, cls="mid"), gap=18),
   panel=st.card("s-c1", "rule", "🔑 שלב 1 בתוך " + w.ic("FROM") + ", שלב 2 מבחוץ")
         + st.card("s-c2", "ex", "לטבלה הזמנית נותנים שם: " + w.ic("AS T")))

view = Scene("view", "VIEW", [
    P("אפשר לתת לשלב הראשון שם קבוע: CREATE VIEW.", do=show("vq")),
    P("VIEW שומר את השאילתה בשם, ומשתמשים בו בדיוק כמו בטבלה רגילה.", do=show("v-c1")),
    P("המקסימום של הסכומים, עכשיו מתוך ה-VIEW: שוב 115.", do=show("vq2") + w.rows_do("vr2", RV),
      say="המקסימום של הסכומים, עכשיו מתוך הוְיוּ: שוב מאה וחמש עשרה."),
    P("ועל VIEW אפשר גם לסנן ב-WHERE, כמו על טבלה: ערים שצברו יותר מ-60 דקות.",
      do=show("vq3") + w.rows_do("vr3", RV3), say="ועל וְיוּ אפשר גם לסנן בוֶור, כמו על טבלה: ערים שצברו יותר משישים דקות."),
    P("במבחנים מופיע גם SELECT INTO: הוא יוצר טבלת עזר, ופועל כמו VIEW.", do=show("v-c2"), hold=0.4,
      say="במבחנים מופיע גם סֶלֶקְט אִינְטוּ: הוא יוצר טבלת עזר, ופועל כמו וְיוּ."),
], stage=w.col(w.code("vq", QV, size="sm h"),
               w.row(w.code("vq2", QV2, size="xs h"), w.result("vr2", RV, size="sm"), gap=30, cls="mid"),
               w.row(w.code("vq3", QV3, size="xs h"), w.result("vr3", RV3, size="sm"), gap=30, cls="mid"), gap=22),
   panel=st.card("v-c1", "rule", "🔑 " + w.ic("VIEW") + " = שאילתה עם שם, משתמשים בה כמו בטבלה")
         + st.card("v-c2", "ex", w.ic("SELECT … INTO name") + " ≈ " + w.ic("CREATE VIEW name")))

selfj = Scene("selfjoin", "צירוף טבלה לעצמה", [
    P("ועכשיו צירוף של טבלה לעצמה: כל הזוגות של שליחים מאותה עיר.", do=show("jt")),
    P("פותחים את אותה טבלה פעמיים, עם שני כינויים: C1 ו-C2. כל כינוי הוא שליח אחר בזוג.", do=show("jq"),
      say="פותחים את אותה טבלה פעמיים, עם שני כינויים: סִי אחת וסִי שתיים. כל כינוי הוא שליח אחר בזוג."),
    P("התנאי הראשון: אותה עיר.", do=show("jq-m2")),
    P("והשני: המזהה של הראשון קטן מהמזהה של השני. כך כל זוג מופיע פעם אחת.",
      do=hide("jq-m2") + show("jq-m3", "j-c1")),
    P("ארבעה זוגות: שלושה בחיפה, ואחד באילת.", do=hide("jq-m3") + w.rows_do("jr", RS), hold=0.4),
], stage=w.row(w.table("jt", CO, size="sm", hidden=True), w.code("jq", QS, size="xs h"), w.result("jr", RS, size="sm"),
               gap=30, cls="mid"),
   panel=st.card("j-c1", "rule", "🔑 שני כינויים, ותנאי לכל עותק"))

stem_x = ("איזו פקודה יוצרת " + w.ic("VIEW") + " שמציג לכל נוסע את המזהה שלו ואת הסכום הכולל ששילם, <b>רק</b> עבור "
          "נוסעים שהסכום הכולל שלהם גבוה מ-2000?")
exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: VIEW שמציג לכל נוסע את הסכום הכולל ששילם, רק לנוסעים שהסכום הכולל שלהם מעל 2000.",
      say="שאלה ממבחן: וְיוּ שמציג לכל נוסע את הסכום הכולל ששילם, רק לנוסעים שהסכום הכולל שלהם מעל אלפיים."),
    P("״הסכום הכולל״: SUM לכל נוסע, כלומר GROUP BY לפי הנוסע.", do=show("x-c1")),
    P("והתנאי הוא על הסכום של הקבוצה, ולא על הזמנה בודדת. לכן HAVING.", do=show("x-c2")),
    P("השאילתה עם WHERE על הסכום ששולם מסננת הזמנות בודדות, לפני הקיבוץ.", do=show("q-x-b", "q-n-b")),
    P("השאילתה עם SUM בתוך WHERE: אגרגציה ב-WHERE, פסולה.", do=show("q-x-c", "q-n-c")),
    P("והשאילתה שכותבת HAVING לפני GROUP BY הפכה את סדר הסעיפים. בקורס זו שגיאת תחביר.", do=show("q-x-d", "q-n-d")),
    P("נשארה הפקודה עם GROUP BY ואחריו HAVING.", do=show("q-ok-a", "q-x-e", "q-n-e"), hold=0.5),
], stage=w.col(w.stem(Q["id"], stem_x),
               w.row(w.chip("x-c1", "סכום לכל נוסע ← " + w.ic("GROUP BY")),
                     w.chip("x-c2", "תנאי על הסכום ← " + w.ic("HAVING")), gap=24),
               w.opts("q", OPTS, ncols=3, size="xs", notes={"b": "מסנן הזמנות", "c": "SUM ב-WHERE",
                                                            "d": "הסדר הפוך", "e": "יש נכונה"}), gap=20),
   layout="full")

check = Scene("check", "בודקים על נתונים", [
    P("נבדוק על שלושה נוסעים. נוסע מספר 1 שילם 1800 ועוד 450: בסך הכול 2250, אבל אף הזמנה לבד לא מעל 2000.",
      do=show("xb") + show(*[f"xb-g{i}" for i in GB]),
      say="נבדוק על שלושה נוסעים. נוסע מספר אחת שילם אלף שמונה מאות ועוד ארבע מאות חמישים: בסך הכול אלפיים מאתיים חמישים, אבל אף הזמנה לבד לא מעל אלפיים."),
    P("ה-VIEW הנכון מחזיר את נוסע מספר 1 ואת נוסע מספר 2, עם הסכומים המלאים.", do=show("xr-a") + w.rows_do("xr-a", RA),
      say="הוְיוּ הנכון מחזיר את נוסע מספר אחת ואת נוסע מספר שתיים, עם הסכומים המלאים."),
    P("ה-VIEW עם WHERE מאבד את נוסע מספר 1. ולנוסע מספר 2 הוא סוכם רק את ההזמנה הגדולה: 2500 במקום 2800.",
      do=show("xr-b") + w.rows_do("xr-b", RB),
      say="הוְיוּ עם וֶור מאבד את נוסע מספר אחת. ולנוסע מספר שתיים הוא סוכם רק את ההזמנה הגדולה: אלפיים וחמש מאות, במקום אלפיים שמונה מאות."),
    P("ואחרי שיש VIEW, משתמשים בו כמו בטבלה, למשל בשלב הבא של שאילתה בשלבים.", hold=0.5),
], stage=w.row(w.table("xb", BK, size="sm", hidden=True, cols=[0, 1, 3], groups=GB),
               w.result("xr-a", RA, cap=w.ic("GROUP BY … HAVING"), hidden=True),
               w.result("xr-b", RB, cap=w.ic("WHERE paid > 2000"), hidden=True), gap=50),
   layout="full")

recap = Scene("recap", "סיכום", [
    P("לסיכום: אגרגציה על אגרגציה כותבים בשני שלבים. השלב הראשון בתוך FROM, עם שם.", do=show("r-1")),
    P("VIEW נותן לשלב שם קבוע, ומשתמשים בו כמו בטבלה. גם INTO.", do=show("r-2"),
      say="וְיוּ נותן לשלב שם קבוע, ומשתמשים בו כמו בטבלה. גם אִינְטוּ."),
    P("צירוף טבלה לעצמה: שני כינויים, ותנאי שהמזהה הראשון קטן מהשני, כדי שכל זוג יופיע פעם אחת.", do=show("r-3")),
    P("ותנאי על סכום של קבוצה הולך ל-HAVING, אחרי GROUP BY. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.code("rq", Q2, size="sm"),
   panel=st.card("r-1", "trap", "⚠️ " + w.ic("MAX(SUM(x))") + ": פסול. תת-שאילתה ב-" + w.ic("FROM") + " עם שם")
         + st.card("r-2", "rule", "🔑 " + w.ic("CREATE VIEW") + " = טבלת עזר עם שם")
         + st.card("r-3", "ex", "self-join: " + w.ic("C1.c_id < C2.c_id"))
         + st.card("r-4", "rule", "🔑 " + w.ic("GROUP BY … HAVING SUM(…) > …")))

VIDEO = Video("S09", "sql", "VIEW, תת-שאילתה ב-FROM ושאילתות בשלבים", [title, steps, view, selfj, exam, check, recap], bank={"26Z-CL-Q9": "a"})
