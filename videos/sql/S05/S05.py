# -*- coding: utf-8 -*-
"""S05 · GROUP BY ו-HAVING — video script (build: tools/video/vid.py S05).

Source: sql/levels/S05.js (lesson + goal: GROUP BY makes one row per group, aggregates per group; the golden order
FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY; row conditions in WHERE, group conditions in HAVING; every
plain SELECT column is in GROUP BY; COUNT(DISTINCT); no aggregate in WHERE).
Exam anchor: 25C-A-Q10 (users per course, only Programming courses), not cited by any level quiz.
Avoided on purpose: the S05 quiz (Students/Courses/Enrollments with 'Spring 2024', the Score table) and the exam items
it cites (21B-C-Q7, 25B-A-Q7, 23B-A-Q10, 25S-B-Q11); also 26S-A-Q13 / 26B-A-Q8 (twins of S05-Q6).
Worked examples use an original Trips table; the exam check an original Courses/Enrollments instance.
Every query runs in SQLite (w_sql.DB); results on screen come from its output.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_sql as w

# ---------------------------------------------------------------- data (original)
TR = w.T("Trips", ["trip_id", "driver", "city", "km"], [
    [1, "Dan", "Haifa", 12], [2, "Dan", "Haifa", 5], [3, "Lea", "Eilat", 30], [4, "Dan", "Akko", 18],
    [5, "Lea", "Eilat", 8], [6, "Ron", "Haifa", 25], [7, "Lea", "Haifa", 14], [8, "Ron", "Haifa", 9]], pk=["trip_id"])
db = w.DB(TR)
N = len(TR["rows"])
DRV = {"Dan": 0, "Lea": 1, "Ron": 2}
G = {i: DRV[r[1]] for i, r in enumerate(TR["rows"])}

Q1 = "SELECT driver, COUNT(*) AS n, SUM(km) AS total\nFROM Trips\nGROUP BY driver"
R1 = db.result(Q1)
assert R1["rows"] == [["Dan", 3, 35], ["Lea", 3, 52], ["Ron", 2, 34]]
G1 = {0: 0, 1: 1, 2: 2}

Q2 = "SELECT driver, COUNT(*) AS n\nFROM Trips\nWHERE km >= 10\nGROUP BY driver\nHAVING COUNT(*) >= 2"
R2 = db.result(Q2)
assert R2["rows"] == [["Dan", 2], ["Lea", 2]]
K2 = w.kept(TR, lambda r: r["km"] >= 10)
assert K2 == [0, 2, 3, 5, 6]
RON_LEFT = [i for i in K2 if TR["rows"][i][1] == "Ron"]
assert RON_LEFT == [5]                                     # Ron keeps one trip, HAVING drops his group
# without WHERE, Ron's group would have 2 rows and pass: the WHERE runs first
assert db.rows("SELECT driver FROM Trips GROUP BY driver HAVING COUNT(*) >= 2") == [["Dan"], ["Lea"], ["Ron"]]

Q3 = "SELECT driver, COUNT(city) AS c,\n       COUNT(DISTINCT city) AS d\nFROM Trips\nGROUP BY driver"
R3 = db.result(Q3)
assert R3["rows"] == [["Dan", 3, 2], ["Lea", 3, 2], ["Ron", 2, 1]]

QE = "SELECT driver FROM Trips\nWHERE COUNT(*) >= 2\nGROUP BY driver"
EE = db.err(QE)
assert EE and "misuse of aggregate" in EE
QB = "SELECT driver, city, COUNT(*)\nFROM Trips\nGROUP BY driver"
assert len({r[2] for r in TR["rows"] if r[1] == "Dan"}) > 1   # Dan has two cities: which one would be shown?

# ---------------------------------------------------------------- exam 25C-A-Q10
Q = BANK["25C-A-Q10"]
assert Q["correctId"] == "b"
OPTS = w.bank_opts(Q)
CO = w.T("Courses", ["course_id", "course_title", "category", "level", "hours"], [
    [1, "Python Basics", "Programming", "Beginner", 20], [2, "Deep Learning", "AI", "Advanced", 40],
    [3, "Java Core", "Programming", "Intermediate", 30], [4, "Statistics", "Data Science", "Beginner", 25]],
    pk=["course_id"])
EN = w.T("Enrollments", ["enrollment_id", "user_id", "course_id", "enroll_date", "progress", "status"], [
    [1, 11, 1, "2025-01-05", 40, "Active"], [2, 12, 1, "2025-01-07", 100, "Completed"],
    [3, 13, 2, "2025-02-01", 10, "Active"], [4, 11, 3, "2025-02-03", 0, "Active"],
    [5, 14, 1, "2025-02-09", 75, "Active"], [6, 12, 2, "2025-03-01", 55, "Active"]], pk=["enrollment_id"])
xdb = w.DB(CO, EN)
XE = {}
for oid, kind, sql in OPTS:
    if kind == "code":
        e = xdb.err(sql)
        if e:
            XE[oid] = e
assert set(XE) == {"a", "c", "d"}
assert "syntax error" in XE["a"]                                   # WHERE after GROUP BY
assert "no such column" in XE["c"] and "no such column" in XE["d"] # category is not in Enrollments, user_id not in Courses
XB = xdb.result(dict((o, s) for o, _, s in OPTS)["b"])
assert XB["rows"] == [["Java Core", 1], ["Python Basics", 3]]
QJ = "SELECT C.course_title, C.category, E.user_id\nFROM Courses C JOIN Enrollments E ON C.course_id = E.course_id"
XJ = xdb.result(QJ + "\nORDER BY E.enrollment_id", columns=["course_title", "category", "user_id"])
KJ = [i for i, r in enumerate(XJ["rows"]) if r[1] == "Programming"]
GJ = {i: (0 if XJ["rows"][i][0] == "Python Basics" else 1) for i in KJ}
assert len(KJ) == 4 and sorted(GJ.values()) == [0, 0, 0, 1]

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נחלק שורות לקבוצות: GROUP BY, והסינון של קבוצות: HAVING."),
    P("נלמד את שורת הזהב, הסדר שבו השאילתה באמת רצה, ונראה מתי התנאי שייך ל-WHERE ומתי ל-HAVING."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">S05 · SQL</div><h1>GROUP BY ו-HAVING</h1>'
         '<p>לקבץ שורות לקבוצות, לסנן לפני הקיבוץ (WHERE) ואחריו (HAVING), ולספור נכון.</p>', layout="title")

idea = Scene("idea", "קבוצות", [
    P("טבלת נסיעות של נהגי מונית. כמה נסיעות עשה כל נהג, וכמה קילומטרים?", do=show("it")),
    P("GROUP BY driver אוסף את כל השורות של אותו נהג לקבוצה אחת.", do=show("iq") + show(*[f"it-g{i}" for i in G]),
      say="גְרוּפּ בַּאי דְרַייבֶר אוסף את כל השורות של אותו נהג לקבוצה אחת."),
    P("שלושה נהגים, שלוש קבוצות. ומכל קבוצה יוצאת שורה אחת בדיוק.", do=w.rows_do("ir", R1) + show(*[f"ir-g{i}" for i in G1])),
    P("COUNT ו-SUM מחושבות לכל קבוצה בנפרד: לדן שלוש נסיעות, ו-35 קילומטר.",
      say="קָאוּנְט וסָאם מחושבות לכל קבוצה בנפרד: לדן שלוש נסיעות, ושלושים וחמישה קילומטר."),
    P("״לכל נהג״ בשאלה, זה הרמז ל-GROUP BY לפי הנהג.", do=show("i-c1")),
    P("והמילה AS רק נותנת שם לעמודה בתוצאה. היא לא משנה אילו שורות חוזרות.", do=show("i-c2"), hold=0.4,
      say="והמילה אֶז רק נותנת שם לעמודה בתוצאה. היא לא משנה אילו שורות חוזרות."),
], stage=w.col(w.code("iq", Q1, size="sm h"),
               w.row(w.table("it", TR, size="sm", hidden=True, groups=G), w.result("ir", R1, size="sm", groups=G1),
                     gap=40), gap=24),
   panel=st.card("i-c1", "rule", "🔑 ״לכל X״ = " + w.ic("GROUP BY X"))
         + st.card("i-c2", "ex", w.ic("COUNT(*) AS n") + ": רק שם לעמודה"))

order = Scene("order", "שורת הזהב", [
    P("ועכשיו הסדר שבו שאילתה באמת רצה. זו שורת הזהב.", do=show("o-flow")),
    P("FROM, ואז WHERE, ואז GROUP BY, ואז HAVING, ורק בסוף SELECT ו-ORDER BY."),
    P("השאלה: אילו נהגים עשו לפחות שתי נסיעות של 10 קילומטר ומעלה?", do=show("oq"),
      say="השאלה: אילו נהגים עשו לפחות שתי נסיעות, של עשרה קילומטר ומעלה?"),
    P("קודם WHERE, על כל שורה לבד: נסיעות קצרות מ-10 קילומטר נזרקות.", do=show("oq-m2") + w.where_do("ot", K2, N),
      say="קודם וֶור, על כל שורה לבד: נסיעות קצרות מעשרה קילומטר נזרקות."),
    P("אחר כך GROUP BY: השורות שנשארו מתקבצות לפי נהג.",
      do=hide("oq-m2", *[f"ot-hi{i}" for i in K2]) + show("oq-m3") + show(*[f"ot-g{i}" for i in K2])),
    P("ואז HAVING, על קבוצות שלמות: לרון נשארה רק נסיעה אחת, והקבוצה שלו נופלת.",
      do=hide("oq-m3") + show("oq-m4", "ot-x5")),
    P("התוצאה: דן ולאה.", do=hide("oq-m4") + w.rows_do("or", R2)),
    P("שימו לב: בלי ה-WHERE, לרון היו שתי נסיעות, והוא היה עובר. הסדר משנה את התשובה.", do=show("o-c1")),
    P("הכלל: תנאי על שורה, כמו קילומטרים, הולך ל-WHERE. תנאי על קבוצה, כמו COUNT, הולך ל-HAVING.",
      do=show("o-c2"), hold=0.4),
], stage=w.col(w.note("o-flow", '<span class="sq-flow">FROM → <b>WHERE</b> → GROUP BY → <b>HAVING</b> → SELECT → ORDER BY'
                      '</span>'),
               w.row(w.code("oq", Q2, size="sm h"), w.table("ot", TR, size="sm", groups=G), w.result("or", R2, size="sm"), gap=30),
               gap=26),
   panel=st.card("o-c1", "ex", "בלי " + w.ic("WHERE") + ", גם רון עובר")
         + st.card("o-c2", "rule", "🔑 תנאי על שורה ← " + w.ic("WHERE") + "<br>תנאי על קבוצה ← " + w.ic("HAVING")))

dist = Scene("distinct", "ספירה נכונה", [
    P("ועכשיו: בכמה ערים שונות נסע כל נהג?", do=show("dq")),
    P("COUNT של העיר סופר הופעות, כולל כפילויות. לדן שלוש.", do=show("dr") + w.rows_do("dr", R3),
      say="קָאוּנְט של העיר סופר הופעות, כולל כפילויות. לדן שלוש."),
    P("אבל שתיים מהן בחיפה. COUNT DISTINCT סופר ערכים שונים, ולדן יוצא שתיים.", do=show("dt-g0", "dt-g1", "dt-g3"),
      say="אבל שתיים מהן בחיפה. קָאוּנְט דִיסְטִינְקְט סופר ערכים שונים, ולדן יוצא שתיים."),
    P("״שונים״ בשאלה, זה DISTINCT בתוך ה-COUNT.", do=show("d-c1")),
    P("ועוד הבדל קטן שמפיל: ״לפחות שתיים״ זה גדול או שווה. ״יותר משתיים״ זה גדול ממש.", do=show("d-c2"), hold=0.4),
], stage=w.col(w.code("dq", Q3, size="sm h"),
               w.row(w.table("dt", TR, size="sm", cols=[1, 2], groups={0: 0, 1: 0, 3: 1}),
                     w.result("dr", R3, size="sm", hidden=True), gap=50), gap=26),
   panel=st.card("d-c1", "rule", "🔑 ״שונים״ = " + w.ic("COUNT(DISTINCT city)"))
         + st.card("d-c2", "trap", "⚠️ ״לפחות 2״ = " + w.ic(">= 2") + " · ״יותר מ-2״ = " + w.ic("> 2")))

rules = Scene("rules", "שני כללים", [
    P("שני כללים שפוסלים מסיחים מיד. הראשון: אין אגרגציה ב-WHERE.", do=show("eq")),
    P("כש-WHERE רץ, עוד אין קבוצות, אז אין מה לספור. השאילתה נכשלת.", do=show("ee")),
    P("והשני: כל עמודה ב-SELECT שאינה בתוך אגרגציה חייבת להופיע ב-GROUP BY.", do=show("bq")),
    P("כאן מקבצים לפי נהג, אבל בוחרים גם עיר. לדן יש שתי ערים: איזו להציג? לכן זה פסול.", do=show("r-c1"), hold=0.4),
], stage=w.col(w.code("eq", QE, size="sm h"), w.note("ee", "<b class='sq-bad'>שגיאה</b>: " + w.ic(EE), cls="sm"),
               w.code("bq", QB, size="sm h"), gap=26),
   panel=st.card("r-c1", "trap", "⚠️ " + w.ic("SELECT driver, city … GROUP BY driver") + ": פסול"))

stem_x = ("איזו שאילתה מציגה את מספר המשתמשים שנרשמו לכל קורס, רק אם הקורס שייך לקטגוריה " + w.ic("'Programming'") + "?")
exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: מספר המשתמשים שנרשמו לכל קורס, רק לקורסים מקטגוריית תכנות."),
    P("״לכל קורס״: מקבצים לפי קורס, וסופרים.", do=show("x-c1")),
    P("והתנאי על הקטגוריה הוא תנאי על שורה, לא על קבוצה. הוא שייך ל-WHERE, לפני הקיבוץ.", do=show("x-c2")),
    P("השאילתה שכותבת WHERE אחרי GROUP BY: שגיאת תחביר. הסדר הפוך משורת הזהב.", do=show("q-x-a", "q-n-a")),
    P("השאילתה שמסננת לפי קטגוריה בטבלת ההרשמות: אין שם עמודת קטגוריה. היא בטבלת הקורסים.",
      do=show("q-x-c", "q-n-c")),
    P("והשאילתה שסופרת מזהי משתמש בטבלת הקורסים: אין שם מזהה משתמש. וגם היא בוחרת את הקטגוריה, שלא מופיעה ב-GROUP BY.",
      do=show("q-x-d", "q-n-d")),
    P("נשארה השאילתה שמחברת קורסים להרשמות, מסננת ב-WHERE, ואז מקבצת וסופרת.", do=show("q-ok-b", "q-x-e", "q-n-e"),
      hold=0.5),
], stage=w.col(w.stem(Q["id"], stem_x),
               w.row(w.chip("x-c1", "״לכל קורס״ ← " + w.ic("GROUP BY")),
                     w.chip("x-c2", "קטגוריה = תנאי על שורה ← " + w.ic("WHERE")), gap=24),
               w.opts("q", OPTS, ncols=3, size="xs", notes={"a": "WHERE אחרי GROUP BY", "c": "אין category",
                                                            "d": "אין user_id", "e": "יש נכונה"}), gap=22),
   layout="full")

check = Scene("check", "בודקים על נתונים", [
    P("נבדוק את השאילתה הנכונה על נתונים: ארבעה קורסים, ושש הרשמות.", do=show("xc", "xe")),
    P("אחרי החיבור, כל הרשמה יודעת את שם הקורס ואת הקטגוריה שלו.", do=show("xj")),
    P("WHERE משאיר רק את ההרשמות לקורסי תכנות.", do=w.where_do("xj", KJ, len(XJ["rows"]))),
    P("GROUP BY מקבץ לפי קורס: שלוש הרשמות לקורס הפייתון, ואחת לקורס הג'אווה.",
      do=hide(*[f"xj-hi{i}" for i in KJ]) + show(*[f"xj-g{i}" for i in GJ])),
    P("והתוצאה: שורה לכל קורס תכנות, עם מספר הנרשמים.", do=w.rows_do("xr", XB)),
    P("ושלוש השאילתות האחרות לא רצות בכלל: הן נכשלות עם שגיאה.",
      do=show("xe-n"), hold=0.5),
], stage=w.row(w.col(w.table("xc", CO, size="sm", hidden=True, cols=[0, 1, 2]),
                     w.table("xe", EN, size="sm", hidden=True, cols=[0, 1, 2]), gap=24),
               w.table("xj", XJ, size="sm", hidden=True, groups=GJ, cap="אחרי ה-" + w.ic("JOIN")),
               w.col(w.result("xr", XB, size="sm"),
                     w.note("xe-n", "שלוש האחרות: <b class='sq-bad'>שגיאה</b>", cls="sm"), gap=20), gap=50),
   layout="full")

recap = Scene("recap", "סיכום", [
    P("לסיכום: GROUP BY יוצר קבוצות, ומכל קבוצה יוצאת שורה אחת.", do=show("r-1")),
    P("שורת הזהב: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY.", do=show("r-2")),
    P("תנאי על שורה ב-WHERE, ותנאי על קבוצה ב-HAVING. ואין אגרגציה ב-WHERE.", do=show("r-3")),
    P("וכל עמודה רגילה ב-SELECT חייבת להופיע ב-GROUP BY. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.code("rq", Q2),
   panel=st.card("r-1", "rule", "🔑 שורה אחת לכל קבוצה")
         + st.card("r-2", "rule", '🔑 שורת הזהב:<br><span class="sq-flow">FROM → WHERE → GROUP BY<br>→ HAVING → SELECT</span>')
         + st.card("r-3", "trap", "⚠️ " + w.ic("COUNT") + " ב-" + w.ic("WHERE") + ": פסול")
         + st.card("r-4", "trap", "⚠️ עמודה רגילה ב-" + w.ic("SELECT") + " = חייבת ב-" + w.ic("GROUP BY")))

VIDEO = Video("S05", "sql", "GROUP BY ו-HAVING", [title, idea, order, dist, rules, exam, check, recap], bank={"25C-A-Q10": "b"})
