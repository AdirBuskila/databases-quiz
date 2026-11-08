# -*- coding: utf-8 -*-
"""S04 · אגרגציה — video script (build: tools/video/vid.py S04).

Source: sql/levels/S04.js (lesson + goal: COUNT(*) / COUNT(col) / COUNT(DISTINCT col), SUM, AVG, MIN, MAX on a whole
table = one row; aggregates skip NULL; the MAX(x), name trap; no aggregate inside WHERE, compare to a subquery).
Exam anchor: 26B-A-Q9 (average fee paid for Yoga attendances), not cited by any level quiz.
Avoided on purpose: the S04 quiz (the Instruments table, its counts 6/5/4 and AVG 1700, SUM(height), the String
category) and the exam items it cites (23B-A2-Q9, 21B-A-Q12, 22B-A-Q8). Worked examples use an original Games table
(counts 7/6/4, AVG 130); the exam check an original Class/Attendance instance.
Every query runs in SQLite (w_sql.DB); results on screen come from its output. SQLite runs `SELECT MAX(x), name`
(a bare column); the video says so and shows that it returns one arbitrary name although two rows share the maximum.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_sql as w

# ---------------------------------------------------------------- data (original)
GA = w.T("Games", ["g_name", "genre", "players", "price"], [
    ["Chess", "Board", 2, 120], ["Catan", "Board", 4, 200], ["Uno", "Cards", 6, None], ["Poker", "Cards", 8, 40],
    ["Twister", "Party", 4, 120], ["Jenga", "Party", 6, 100], ["Monopoly", "Board", 4, 200]], pk=["g_name"])
db = w.DB(GA)
N = len(GA["rows"])

Q1 = "SELECT COUNT(*), MIN(price), MAX(price)\nFROM Games"
R1 = db.result(Q1, columns=["COUNT(*)", "MIN(price)", "MAX(price)"])
assert R1["rows"] == [[7, 40, 200]]

QC = "SELECT COUNT(*), COUNT(price),\n       COUNT(DISTINCT price)\nFROM Games"
RC = db.result(QC, columns=["COUNT(*)", "COUNT(price)", "COUNT(DISTINCT price)"])
assert RC["rows"] == [[7, 6, 4]]
QA = "SELECT AVG(price)\nFROM Games"
RA = db.result(QA, columns=["AVG(price)"])
assert RA["rows"] == [[130.0]] and db.rows("SELECT SUM(price) FROM Games") == [[780]] and 780 / 6 == 130
assert round(780 / 7, 2) == 111.43                       # what dividing by every row would give
NULLC = (2, 3)
PRICE_GROUPS = {0: 0, 4: 0, 1: 1, 6: 1}                 # the repeated prices: 120 twice, 200 twice

QM = "SELECT MAX(price), g_name\nFROM Games"
RM = db.rows(QM)
assert len(RM) == 1 and RM[0][0] == 200                  # SQLite returns ONE name ...
QMX = "SELECT g_name, price\nFROM Games\nWHERE price = (SELECT MAX(price) FROM Games)"
RMX = db.result(QMX)
assert sorted(r[0] for r in RMX["rows"]) == ["Catan", "Monopoly"]   # ... although two games share the maximum
assert w.bag(db.rows("SELECT g_name, price FROM Games WHERE price IN (SELECT MAX(price) FROM Games)")) == w.bag(RMX["rows"])

QW = "SELECT g_name FROM Games\nWHERE price < AVG(price)"
EW = db.err(QW)
assert EW and "misuse of aggregate" in EW
QS = "SELECT g_name FROM Games\nWHERE price < (SELECT AVG(price) FROM Games)"
RS = db.result(QS)
assert [r[0] for r in RS["rows"]] == ["Chess", "Poker", "Twister", "Jenga"]       # Uno (NULL price) is not compared
KS = [0, 3, 4, 5]

# ---------------------------------------------------------------- exam 26B-A-Q9
Q = BANK["26B-A-Q9"]
assert Q["correctId"] == "a"
OPTS = w.bank_opts(Q)
CLS = w.T("Class", ["class_id", "title", "type", "price", "studio"], [
    [1, "Morning Flow", "Yoga", 60, "A"], [2, "Spin Max", "Spin", 50, "B"], [3, "Sunset Yoga", "Yoga", 80, "A"],
    [4, "Core", "Pilates", 70, "C"]], pk=["class_id"])
ATT = w.T("Attendance", ["member_id", "class_id", "attend_date", "fee_paid"], [
    [1, 1, "2026-03-01", 60], [2, 1, "2026-03-01", 40], [1, 3, "2026-03-02", 80], [3, 2, "2026-03-02", 50],
    [2, 2, "2026-03-03", 50], [3, 4, "2026-03-03", 70]], pk=["member_id", "class_id", "attend_date"])
xdb = w.DB(CLS, ATT)
XR, XE = {}, {}
for oid, kind, sql in OPTS:
    if kind != "code":
        continue
    e = xdb.err(sql)
    if e:
        XE[oid] = e
    else:
        XR[oid] = xdb.result(sql, columns=["AVG(fee_paid)"])
assert set(XE) == {"c", "d"} and all("no such column" in e for e in XE.values())   # type / fee_paid are elsewhere
assert XR["a"]["rows"] == [[60.0]] and (60 + 40 + 80) / 3 == 60                     # the three Yoga attendances
assert abs(XR["b"]["rows"][0][0] - 350 / 6) < 1e-9                                    # product: the average of ALL fees
assert xdb.rows("SELECT COUNT(*) FROM Attendance, Class WHERE type='Yoga'") == [[12]]
YOGA_ATT = [0, 1, 2]
CAPS = {"a": w.ic("JOIN Class USING (class_id)"), "b": w.ic("Attendance, Class")}

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נכווץ טבלה שלמה לשורה אחת: אגרגציה."),
    P("נכיר את COUNT, SUM, AVG, MIN ו-MAX, נראה מה הן עושות עם NULL, ונכיר את המלכודת הכי נפוצה ב-SQL."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">S04 · SQL</div><h1>אגרגציה</h1>'
         '<p>לחשב ערך אחד מכל הטבלה (COUNT, SUM, AVG, MIN, MAX) ולזהות את המלכודת MAX(x), name.</p>', layout="title")

idea = Scene("idea", "שורה אחת", [
    P("פונקציית אגרגציה לוקחת הרבה שורות, ומחזירה ערך אחד.", do=show("it")),
    P("COUNT סופרת, SUM סוכמת, AVG מחשבת ממוצע, ו-MIN ו-MAX מוצאות את הקטן והגדול.", do=show("i-c1")),
    P("כאן: כמה משחקים יש, ומה המחיר הנמוך והגבוה ביותר.", do=show("iq")),
    P("בלי GROUP BY, כל הטבלה היא קבוצה אחת. לכן התוצאה היא שורה אחת בדיוק.", do=w.rows_do("ir", R1)),
    P("שבעה משחקים, המחיר הנמוך 40, והגבוה 200.", do=show("i-c2"), hold=0.4,
      say="שבעה משחקים, המחיר הנמוך ארבעים, והגבוה מאתיים."),
], stage=w.col(w.code("iq", Q1, size="sm h"), w.row(w.table("it", GA, size="sm", hidden=True), w.result("ir", R1, size="sm"),
                                                   gap=36, cls="mid"), gap=28),
   panel=st.card("i-c1", "ex", w.ic("COUNT") + " · " + w.ic("SUM") + " · " + w.ic("AVG") + " · " + w.ic("MIN")
                 + " · " + w.ic("MAX"))
         + st.card("i-c2", "rule", "🔑 בלי " + w.ic("GROUP BY") + ": שורה אחת"))

counts = Scene("counts", "שלוש ספירות ו-NULL", [
    P("שלוש ספירות על אותה טבלה, ושלוש תשובות שונות.", do=show("cq")),
    P("<bdi>COUNT(*)</bdi> סופרת שורות: שבע.", do=show("cr-r0", "cr-c0-0"), say="קָאוּנְט כּוֹכָבִית סופרת שורות: שבע."),
    P("COUNT של עמודת המחיר סופרת רק ערכים שאינם NULL. לאונו אין מחיר, ולכן שש.",
      do=show("ct-c2-3", "cr-c0-1")),
    P("ו-COUNT DISTINCT סופרת ערכים שונים: 120 ו-200 מופיעים פעמיים כל אחד, ולכן ארבעה.",
      do=show(*[f"ct-g{i}" for i in PRICE_GROUPS], "cr-c0-2"),
      say="וקָאוּנְט דִיסְטִינְקְט סופרת ערכים שונים: מאה עשרים ומאתיים מופיעים פעמיים כל אחד, ולכן ארבעה."),
    P("כל האגרגציות מדלגות על NULL, חוץ מ-<bdi>COUNT(*)</bdi>. גם AVG.", do=show("c-c1"),
      say="כל האגרגציות מדלגות על נָאל, חוץ מקָאוּנְט כּוֹכָבִית. גם אַבֶרֶג'."),
    P("ולכן הממוצע הוא 780 חלקי שש, כלומר 130. לא חלקי שבע.", do=show("aq") + w.rows_do("ar", RA),
      say="ולכן הממוצע הוא שבע מאות ושמונים חלקי שש, כלומר מאה שלושים. לא חלקי שבע."),
    P("״כמה שונים״ בשאלה הוא הרמז ל-COUNT DISTINCT.", do=show("c-c2"), hold=0.4,
      say="כמה שונים בשאלה, הוא הרמז לקָאוּנְט דִיסְטִינְקְט."),
], stage=w.col(w.row(w.code("cq", QC, size="sm h"), w.code("aq", QA, size="sm h"), gap=30, cls="mid"),
               w.row(w.table("ct", GA, size="sm", groups=PRICE_GROUPS, cells=[NULLC]),
                     w.col(w.result("cr", RC, size="sm", cells=[(0, 0), (0, 1), (0, 2)]), w.result("ar", RA, size="sm"),
                           gap=24), gap=30), gap=24),
   panel=st.card("c-c1", "rule", "🔑 אגרגציות מדלגות על " + w.ic("NULL") + " (חוץ מ-" + w.ic("COUNT(*)") + ")")
         + st.card("c-c2", "ex", "״כמה שונים״ = " + w.ic("COUNT(DISTINCT …)")))

maxtrap = Scene("maxtrap", "המלכודת MAX, name", [
    P("ועכשיו המסיח הכי נפוץ בכל ה-SQL: המחיר המקסימלי, ולידו שם המשחק.", do=show("mq")),
    P("MAX מחזירה ערך אחד לכל הטבלה. אבל שם המשחק הוא ערך לכל שורה.", do=show("m-c1")),
    P("איזה שם להצמיד? אין דרך לדעת. בקורס, השאילתה הזו פסולה תמיד.", do=show("m-c2")),
    P("יש מערכות שמריצות אותה בכל זאת, ומחזירות שם אחד, שרירותי. אבל כאן שני משחקים עולים 200!",
      do=show("mt-hi1", "mt-hi6"),
      say="יש מערכות שמריצות אותה בכל זאת, ומחזירות שם אחד, שרירותי. אבל כאן שני משחקים עולים מאתיים!"),
    P("הדרך הנכונה: תת-שאילתה מחשבת את המקסימום, ו-WHERE משווה אליו כל שורה.", do=show("mx")),
    P("וחוזרים שני המשחקים, כמו שצריך.", do=w.rows_do("mr", RMX) + show("m-c3"), hold=0.4),

], stage=w.col(w.code("mq", QM, size="sm h"), w.code("mx", QMX, size="sm h"),
               w.row(w.table("mt", GA, size="sm", cols=[0, 3]), w.result("mr", RMX, size="sm"), gap=40), gap=20),
   panel=st.card("m-c1", "trap", "⚠️ " + w.ic("MAX(price), g_name") + ": ערך אחד מול ערך לכל שורה")
         + st.card("m-c2", "trap", "⚠️ בלי " + w.ic("GROUP BY") + ": פסול תמיד")
         + st.card("m-c3", "rule", "🔑 " + w.ic("WHERE price = (SELECT MAX(price) …)")))

where = Scene("where", "אין אגרגציה ב-WHERE", [
    P("עוד כלל: אין אגרגציה בתוך WHERE.", do=show("wq")),
    P("WHERE רץ על כל שורה לבד, לפני שמישהו חישב ממוצע. השאילתה הזו נכשלת עם שגיאה.", do=show("we", "w-c1")),
    P("גם כאן הפתרון הוא תת-שאילתה: היא מחשבת את הממוצע, 130, ו-WHERE משווה אליו.", do=show("ws"),
      say="גם כאן הפתרון הוא תת שאילתה: היא מחשבת את הממוצע, מאה שלושים, ו-וֶור משווה אליו."),
    P("ארבעה משחקים זולים מהממוצע.", do=w.where_do("wt", KS, N) + w.rows_do("wr", RS)),
    P("ואונו? המחיר שלו NULL. השוואה מול NULL היא Unknown, ולכן הוא לא בתוצאה.", do=show("wt-c2-3"), hold=0.4),
], stage=w.col(w.code("wq", QW, size="sm h"), w.note("we", "<b class='sq-bad'>שגיאה</b>: " + w.ic(EW), cls="sm"),
               w.code("ws", QS, size="sm h"),
               w.row(w.table("wt", GA, size="sm", cols=[0, 3], cells=[NULLC]), w.result("wr", RS, size="sm"), gap=40),
               gap=16),
   panel=st.card("w-c1", "rule", "🔑 " + w.ic("WHERE") + " רץ על שורה אחת, לפני כל ממוצע"))

stem_x = "מהו ממוצע המחיר ששולם (" + w.ic("fee_paid") + ") עבור ההשתתפויות בשיעורים מסוג " + w.ic("'Yoga'") + "?"
exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן, על רשת של מועדוני כושר: מה הממוצע של המחיר ששולם, על ההשתתפויות בשיעורי יוגה?"),
    P("איפה כל עמודה? המחיר ששולם בטבלת ההשתתפויות, וסוג השיעור בטבלת השיעורים.", do=show("x-c1")),
    P("שתי עמודות משתי טבלאות: צריך לחבר, לפי מזהה השיעור.", do=show("x-c2")),
    P("השאילתה שמסננת לפי סוג בטבלת ההשתתפויות: אין שם עמודת סוג.", do=show("q-x-c", "q-n-c")),
    P("והשאילתה שמחשבת ממוצע בטבלת השיעורים: אין שם מחיר ששולם.", do=show("q-x-d", "q-n-d")),
    P("השאילתה עם פסיק: אין תנאי חיבור. זו מכפלה, וכל השתתפות מוצמדת לכל שיעור יוגה.",
      do=show("q-x-b", "q-n-b")),
    P("נשארה השאילתה עם החיבור לפי מזהה השיעור, ולכן ״אף תשובה אינה נכונה״ נופלת.", do=show("q-ok-a", "q-x-e", "q-n-e"),
      hold=0.5),
], stage=w.col(w.stem(Q["id"], stem_x),
               w.row(w.chip("x-c1", w.ic("fee_paid") + " ← " + w.ic("Attendance") + " · " + w.ic("type") + " ← "
                            + w.ic("Class")), w.chip("x-c2", "מחברים לפי " + w.ic("class_id")), gap=24),
               w.opts("q", OPTS, ncols=2, notes={"b": "מכפלה", "c": "אין type", "d": "אין fee_paid", "e": "יש נכונה"}), gap=26),
   layout="full")

check = Scene("check", "בודקים על נתונים", [
    P("נבדוק על נתונים: שני שיעורי יוגה, ושלוש השתתפויות בהם, ששילמו 60, 40 ו-80.",
      do=show("xc", "xa", "xc-hi0", "xc-hi2") + [("show", f"xa-hi{i}") for i in YOGA_ATT],
      say="נבדוק על נתונים: שני שיעורי יוגה, ושלוש השתתפויות בהם, ששילמו שישים, ארבעים ושמונים."),
    P("הממוצע הנכון: 60.", do=show("xr-a") + w.rows_do("xr-a", XR["a"]), say="הממוצע הנכון: שישים."),
    P("המכפלה נותנת 58.33. כל השתתפות, מכל סוג, הוצמדה פעמיים, פעם לכל שיעור יוגה.",
      do=show("xr-b") + w.rows_do("xr-b", XR["b"]),
      say="המכפלה נותנת חמישים ושמונה נקודה שלוש שלוש. כל השתתפות, מכל סוג, הוצמדה פעמיים, פעם לכל שיעור יוגה."),
    P("כלומר יצא הממוצע של כל המחירים, והסינון ליוגה לא עשה כלום.", do=show("xb-n")),
    P("ושתי השאילתות האחרות לא רצות בכלל: בכל אחת יש עמודה שלא קיימת בטבלה.", do=show("xe-c", "xe-d"), hold=0.5),
], stage=w.col(w.row(w.table("xc", CLS, size="sm", hidden=True, cols=[0, 1, 2]),
                     w.table("xa", ATT, size="sm", hidden=True, cols=[0, 1, 3]), gap=50),
               w.row(w.result("xr-a", XR["a"], cap=CAPS["a"], hidden=True),
                     w.col(w.result("xr-b", XR["b"], cap=CAPS["b"], hidden=True),
                           w.note("xb-n", "= הממוצע של <b>כל</b> המחירים", cls="sm"), gap=10),
                     w.note("xe-c", w.ic("WHERE type='Yoga'") + ": <b class='sq-bad'>שגיאה</b>", cls="sm"),
                     w.note("xe-d", w.ic("FROM Class") + ": <b class='sq-bad'>שגיאה</b>", cls="sm"), gap=40),
               gap=36),
   layout="full")

recap = Scene("recap", "סיכום", [
    P("לסיכום: אגרגציה בלי GROUP BY מחזירה שורה אחת.", do=show("r-1")),
    P("<bdi>COUNT(*)</bdi> סופרת שורות, COUNT של עמודה מדלגת על NULL, ו-DISTINCT סופר ערכים שונים.", do=show("r-2"),
      say="קָאוּנְט כּוֹכָבִית סופרת שורות, קָאוּנְט של עמודה מדלגת על נָאל, ודִיסְטִינְקְט סופר ערכים שונים."),
    P("MAX ולידה עמודה רגילה: פסול. משווים לתת-שאילתה.", do=show("r-3")),
    P("ואין אגרגציה ב-WHERE. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.code("rq", QMX),
   panel=st.card("r-1", "rule", "🔑 בלי " + w.ic("GROUP BY") + ": שורה אחת")
         + st.card("r-2", "rule", "🔑 " + w.ic("COUNT(*)") + " · " + w.ic("COUNT(col)") + " · " + w.ic("COUNT(DISTINCT col)"))
         + st.card("r-3", "trap", "⚠️ " + w.ic("MAX(x), name") + ": פסול")
         + st.card("r-4", "trap", "⚠️ " + w.ic("WHERE x > AVG(x)") + ": פסול"))

VIDEO = Video("S04", "sql", "אגרגציה", [title, idea, counts, maxtrap, where, exam, check, recap], bank={"26B-A-Q9": "a"})
