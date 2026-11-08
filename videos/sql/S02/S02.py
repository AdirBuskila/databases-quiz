# -*- coding: utf-8 -*-
"""S02 · ORDER BY ו-NULL — video script (build: tools/video/vid.py S02).

Source: sql/levels/S02.js (lesson + goal: ORDER BY ascending by default, DESC applies to the column before it, ties
broken by the next column; NULL is unknown: = NULL is never true, IS NULL, <> drops NULL rows, WHERE keeps True only).
Exam part: an original question "בסגנון מבחן" (bank={}): no fresh bank question is about ORDER BY or NULL (the two
ORDER BY exam items, 21B-A-Q8 and 22B-A-Q9, are S02 quiz items; the NULL items left are LEFT JOIN questions that later
levels use). The question combines OR with Unknown and a two-column ORDER BY.
Avoided on purpose: the S02 quiz (Students with avg_grade/phone/city, phone = NULL, city != 'Haifa', COUNT(phone)).
Worked examples use an original Workers table; the exam-style question an original Products table.
Every query runs in SQLite (w_sql.DB); results on screen come from its output.
"""
from vid import P, Scene, Video, show, hide
import stage as st
import w_sql as w

# ---------------------------------------------------------------- teaching data (original)
WK = w.T("Workers", ["w_name", "dept", "salary", "bonus"], [
    ["Avi", "Sales", 8000, 500],
    ["Bat", "IT", 9500, None],
    ["Ella", "Sales", 8000, None],
    ["Gil", "IT", 7000, 300],
    ["Rami", "HR", 9500, 0],
    ["Yoni", "HR", 6000, None],
], pk=["w_name"])
db = w.DB(WK)
N = len(WK["rows"])

QO1 = "SELECT w_name, salary\nFROM Workers\nORDER BY salary"
QO2 = "SELECT w_name, salary\nFROM Workers\nORDER BY salary DESC, w_name"
RO1, RO2 = db.result(QO1), db.result(QO2)
assert [r[0] for r in RO1["rows"]][:2] == ["Yoni", "Gil"] and [r[1] for r in RO1["rows"]] == sorted(r[2] for r in WK["rows"])
assert [r[0] for r in RO2["rows"]] == ["Bat", "Rami", "Avi", "Ella", "Gil", "Yoni"]
TIE = {0: 0, 1: 0, 2: 1, 3: 1}                    # the two salary ties in RO2 (9500, 8000)
assert RO2["rows"][0][1] == RO2["rows"][1][1] == 9500 and RO2["rows"][2][1] == RO2["rows"][3][1] == 8000

QN1 = "SELECT w_name FROM Workers\nWHERE bonus = NULL"
QN2 = "SELECT w_name FROM Workers\nWHERE bonus IS NULL"
QN3 = "SELECT w_name FROM Workers\nWHERE bonus <> 500"
RN1, RN2, RN3 = db.result(QN1), db.result(QN2), db.result(QN3)
assert RN1["rows"] == [] and [r[0] for r in RN2["rows"]] == ["Bat", "Ella", "Yoni"]
assert [r[0] for r in RN3["rows"]] == ["Gil", "Rami"]           # the NULL bonuses are not "different from 500"
NULLS = [(i, 3) for i, r in enumerate(WK["rows"]) if r[3] is None]
assert NULLS == [(1, 3), (2, 3), (5, 3)] and WK["rows"][4][3] == 0
KN2 = [i for i, r in enumerate(WK["rows"]) if r[3] is None]
KN3 = [i for i, r in enumerate(WK["rows"]) if r[3] is not None and r[3] != 500]

# three-valued logic, as SQLite computes it (1 = True, 0 = False, None = Unknown)
assert db.con.execute("SELECT (1 OR NULL), (0 OR NULL), (1 AND NULL), (0 AND NULL)").fetchone() == (1, None, None, 0)
QL = "SELECT w_name FROM Workers\nWHERE bonus > 100 OR dept = 'IT'"
RL = db.result(QL)
assert [r[0] for r in RL["rows"]] == ["Avi", "Bat", "Gil"]
KL = [0, 1, 3]
TT = "TRUE  OR  UNKNOWN  =  TRUE\nFALSE OR  UNKNOWN  =  UNKNOWN\nTRUE  AND UNKNOWN  =  UNKNOWN\nFALSE AND UNKNOWN  =  FALSE"

# ---------------------------------------------------------------- exam-style question (original data)
PR = w.T("Products", ["p_name", "price", "discount"], [
    ["Lamp", 120, 10],
    ["Mug", 40, None],
    ["Chair", 300, None],
    ["Pen", 15, 5],
    ["Desk", 450, 20],
    ["Stapler", 40, None],
    ["Clock", 120, 15],
], pk=["p_name"])
pdb = w.DB(PR)
QX = "SELECT p_name\nFROM Products\nWHERE discount < 15 OR price < 50\nORDER BY price DESC, p_name"
names = lambda sql: [r[0] for r in pdb.rows(sql)]
RX = names(QX)
assert RX == ["Lamp", "Mug", "Stapler", "Pen"]
# each distractor is what a specific mistake produces (run as its own query)
WRONG = {
    "a": names("SELECT p_name FROM Products WHERE discount < 15 OR price < 50 ORDER BY price DESC, p_name DESC"),
    "c": names("SELECT p_name FROM Products WHERE COALESCE(discount, 0) < 15 OR price < 50 ORDER BY price DESC, p_name"),
    "d": names("SELECT p_name FROM Products WHERE discount < 15 OR price < 50 ORDER BY price, p_name"),
    "e": names("SELECT p_name FROM Products WHERE discount IS NOT NULL AND (discount < 15 OR price < 50) "
               "ORDER BY price DESC, p_name"),
}
assert WRONG == {"a": ["Lamp", "Stapler", "Mug", "Pen"], "c": ["Chair", "Lamp", "Mug", "Stapler", "Pen"],
                 "d": ["Pen", "Mug", "Stapler", "Lamp"], "e": ["Lamp", "Pen"]}
XO = {"a": WRONG["a"], "b": RX, "c": WRONG["c"], "d": WRONG["d"], "e": WRONG["e"]}
assert len({tuple(v) for v in XO.values()}) == 5 and [k for k, v in XO.items() if v == RX] == ["b"]
OPTS = [(k, "text", '<span class="sq-ic">' + ", ".join(v) + "</span>") for k, v in XO.items()]
IN_T = [0, 3]                 # discount < 15 is True
IN_U = [1, 5]                 # discount NULL (Unknown), price < 50 True
OUT_U = [2]                   # Unknown OR False
OUT_F = [4, 6]                # False OR False
assert sorted(IN_T + IN_U) == sorted(i for i, r in enumerate(PR["rows"]) if r[0] in RX)

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד שני דברים: איך ממיינים תוצאה, ומה זה NULL."),
    P("נראה למה NULL לא שווה לשום דבר, אפילו לא לעצמו, ומה זה עושה ל-WHERE."),
    P("ובסוף נפתור שאלה בסגנון מבחן.", hold=0.4),
], stage='<div class="kicker">S02 · SQL</div><h1>ORDER BY ו-NULL</h1>'
         '<p>למיין תוצאה (עולה, יורד, לפי כמה עמודות) ולהבין למה NULL לא שווה לשום דבר.</p>', layout="title")

order = Scene("order", "ORDER BY", [
    P("ORDER BY קובע את סדר השורות בתוצאה. הוא השלב האחרון, אחרי SELECT.", do=show("o1")),
    P("בלי מילה נוספת, הסדר הוא עולה: מהמשכורת הנמוכה לגבוהה.", do=w.rows_do("or1", RO1) + show("o-c1")),
    P("ועכשיו: משכורת בסדר יורד, ובתוך משכורת זהה, שם בסדר עולה.", do=show("o2")),
    P("DESC אחרי המשכורת: הגבוהים למעלה.", do=w.rows_do("or2", RO2)),
    P("שני עובדים מרוויחים 9500, ושניים 8000. ביניהם מכריעה העמודה השנייה: השם.",
      do=show(*[f"or2-g{i}" for i in TIE]),
      say="שני עובדים מרוויחים תשעת אלפים וחמש מאות, ושניים שמונת אלפים. ביניהם מכריעה העמודה השנייה: השם."),
    P("ושימו לב: DESC חל רק על העמודה שלפניו. אחרי השם אין DESC, ולכן השמות בסדר עולה.", do=show("o-c2")),
    P("״X בסדר עולה ו-Y בסדר יורד״ נכתב: ORDER BY X, Y DESC.", do=show("o-c3"),
      say="אֶקְס בסדר עולה, וַואי בסדר יורד, נכתב: אוֹרְדֶר בַּאי אֶקְס, פסיק, וַואי, ואחריו דֶסְק."),
    P("ו-GROUP BY לא ממיין בכלל: זה מסיח שחוזר במבחנים.", do=show("o-c4"), hold=0.4),
], stage=w.row(w.col(w.code("o1", QO1, size="sm h"), w.result("or1", RO1, size="sm", cap="סדר עולה")),
               w.col(w.code("o2", QO2, size="sm h"), w.result("or2", RO2, size="sm", cap="יורד, ואז שם", groups=TIE)), gap=40),
   panel=st.card("o-c1", "rule", "🔑 ברירת המחדל: סדר עולה (" + w.ic("ASC") + ")")
         + st.card("o-c2", "rule", "🔑 " + w.ic("DESC") + " חל רק על העמודה שלפניו")
         + st.card("o-c3", "ex", "״X עולה, Y יורד״ = " + w.ic("ORDER BY X, Y DESC"))
         + st.card("o-c4", "trap", "⚠️ " + w.ic("GROUP BY") + " מקבץ, לא ממיין"))

null = Scene("null", "NULL", [
    P("NULL הוא ערך חסר: לא יודעים מה הבונוס של העובד.", do=show(*[f"nt-c{i}-{j}" for i, j in NULLS])),
    P("NULL הוא לא אפס. לרמי יש בונוס אפס, וזה ערך ידוע.", do=show("nt-c4-3")),
    P("כל השוואה מול NULL נותנת תשובה שלישית: Unknown, לא ידוע.", do=show("n-c1")),
    P("ו-WHERE משאיר שורה רק אם התנאי True. Unknown נזרק, בדיוק כמו False.", do=show("n-c2")),
    P("לכן ״הבונוס שווה NULL״ לא מחזיר אף שורה. גם לא את מי שהבונוס שלו חסר.",
      do=show("n1", "nr1") + w.rows_do("nr1", RN1)),
    P("ערך חסר בודקים רק עם IS NULL. עכשיו חוזרים שלושה עובדים.",
      do=show("n2", "nr2") + w.rows_do("nr2", RN2)),
    P("ומה עם ״הבונוס שונה מ-500״? חוזרים רק שניים.", do=show("n3", "nr3") + w.rows_do("nr3", RN3),
      say="ומה עם הבונוס שונה מחמש מאות? חוזרים רק שניים."),
    P("מי שהבונוס שלו חסר לא חוזר: לא ידוע אם הבונוס שלו שונה מ-500. זה Unknown.", do=show("n-c3"),
      say="מי שהבונוס שלו חסר לא חוזר: לא ידוע אם הבונוס שלו שונה מחמש מאות. זה אַנְנוֹאוּן.", hold=0.4),
], stage=w.col(w.code("n1", QN1, size="xs h"), w.code("n2", QN2, size="xs h"), w.code("n3", QN3, size="xs h"),
               w.row(w.table("nt", WK, size="sm", cells=NULLS + [(4, 3)]),
                     w.result("nr1", RN1, size="sm", cap=w.ic("= NULL"), hidden=True),
                     w.result("nr2", RN2, size="sm", cap=w.ic("IS NULL"), hidden=True),
                     w.result("nr3", RN3, size="sm", cap=w.ic("<> 500"), hidden=True), gap=22), gap=12),
   panel=st.card("n-c1", "rule", "🔑 השוואה מול " + w.ic("NULL") + " = " + w.ic("Unknown"))
         + st.card("n-c2", "rule", "🔑 " + w.ic("WHERE") + " משאיר רק " + w.ic("True"))
         + st.card("n-c3", "trap", "⚠️ " + w.ic("<> 500") + " לא מחזיר שורות עם " + w.ic("NULL")))

logic = Scene("logic", "Unknown עם AND ו-OR", [
    P("ומה קורה כש-Unknown פוגש OR או AND?", do=show("tt")),
    P("OR צריך רק צד אחד אמיתי. True או Unknown, זה True.", do=show("tt-m0", "l-c1")),
    P("אבל False או Unknown, נשאר Unknown.", do=hide("tt-m0") + show("tt-m1")),
    P("AND צריך את שני הצדדים. True וגם Unknown, נשאר Unknown. ו-False וגם Unknown, זה False.",
      do=hide("tt-m1") + show("tt-m2", "tt-m3", "l-c2")),
    P("נבדוק: בונוס מעל 100, או עובד במחלקת IT.", do=hide("tt-m2", "tt-m3") + show("lq"),
      say="נבדוק: בונוס מעל מאה, או עובד במחלקת אַיי טִי."),
    P("לבת אין בונוס, אבל היא ב-IT: צד אחד אמיתי, והיא בפנים.", do=show("lt-hi1"),
      say="לבת אין בונוס, אבל היא באַיי טִי: צד אחד אמיתי, והיא בפנים."),
    P("לאלה וליוני אין בונוס, והם לא ב-IT: Unknown, ולכן בחוץ.", do=show("lt-x2", "lt-x5"),
      say="לאלה וליוני אין בונוס, והם לא באַיי טִי: אַנְנוֹאוּן, ולכן בחוץ."),
    P("אבי וגיל עוברים בזכות הבונוס, ורמי נופל: בונוס אפס, ומחלקה אחרת.", do=show("lt-hi0", "lt-hi3", "lt-x4")),
    P("התוצאה: שלושה עובדים.", do=w.rows_do("lr", RL), hold=0.4),
], stage=w.col(w.code("tt", TT, size="sm h"), w.code("lq", QL, size="sm h"),
               w.row(w.table("lt", WK, size="sm"), w.result("lr", RL, size="sm"), gap=36), gap=20),
   panel=st.card("l-c1", "rule", "🔑 " + w.ic("OR") + ": מספיק צד אחד " + w.ic("True"))
         + st.card("l-c2", "rule", "🔑 " + w.ic("AND") + ": צריך את שני הצדדים"))

stem_html = ("נתונה הטבלה " + w.ic("Products") + ". מה מחזירה השאילתה, <b>לפי הסדר</b>?")
exam = Scene("exam", "שאלה בסגנון מבחן", [
    P("שאלה בסגנון מבחן. נתונות הטבלה והשאילתה. מה התוצאה, לפי הסדר?"),
    P("קודם WHERE: הנחה מתחת ל-15, או מחיר מתחת ל-50.", do=show("xq-m2"),
      say="קודם וֶור: הנחה מתחת לחמש עשרה, או מחיר מתחת לחמישים."),
    P("Lamp ו-Pen: ההנחה שלהם מתחת ל-15. הם בפנים.", do=show(*[f"xt-hi{i}" for i in IN_T]),
      say="הלַמְפּ והפֶּן: ההנחה שלהם מתחת לחמש עשרה. הם בפנים."),
    P("ל-Mug ול-Stapler אין הנחה, אבל המחיר 40. Unknown או True זה True, וגם הם בפנים.",
      do=show(*[f"xt-hi{i}" for i in IN_U]),
      say="למָאג ולסְטֵייפְּלֶר אין הנחה, אבל המחיר ארבעים. אַנְנוֹאוּן או טְרוּ זה טְרוּ, וגם הם בפנים."),
    P("גם ל-Chair אין הנחה, אבל הוא עולה 300. Unknown או False נשאר Unknown, והוא בחוץ.",
      do=show(*[f"xt-x{i}" for i in OUT_U]),
      say="גם לצֶ'ייר אין הנחה, אבל הוא עולה שלוש מאות. אַנְנוֹאוּן או פוֹלְס נשאר אַנְנוֹאוּן, והוא בחוץ."),
    P("Desk ו-Clock: ההנחה לא מתחת ל-15, והמחיר גבוה. בחוץ.", do=show(*[f"xt-x{i}" for i in OUT_F]),
      say="הדֶסְק והקְלוֹק: ההנחה לא מתחת לחמש עשרה, והמחיר גבוה. בחוץ."),
    P("נשארו ארבעה. עכשיו ORDER BY: מחיר בסדר יורד. Lamp ראשון, ו-Pen אחרון.", do=hide("xq-m2") + show("xq-m3"),
      say="נשארו ארבעה. עכשיו אוֹרְדֶר בַּאי: מחיר בסדר יורד. הלַמְפּ ראשון, והפֶּן אחרון."),
    P("Mug ו-Stapler עולים שניהם 40. ביניהם מכריע השם, בסדר עולה: Mug לפני Stapler.",
      say="המָאג והסְטֵייפְּלֶר עולים שניהם ארבעים. ביניהם מכריע השם, בסדר עולה: מָאג לפני סְטֵייפְּלֶר."),
    P("Stapler לפני Mug: זה שם בסדר יורד. אבל DESC לא חל על השם.", do=show("q-x-a", "q-n-a"),
      say="סְטֵייפְּלֶר לפני מָאג: זה שם בסדר יורד. אבל דֶסְק לא חל על השם."),
    P("מהזול ליקר: זה סדר עולה, אבל על המחיר כתוב DESC.", do=show("q-x-d", "q-n-d")),
    P("עם Chair: כאילו NULL הוא אפס. אבל NULL הוא לא אפס.", do=show("q-x-c", "q-n-c"),
      say="עם הצֶ'ייר: כאילו נָאל הוא אפס. אבל נָאל הוא לא אפס."),
    P("ורק שניים: כאילו Unknown מפיל גם OR. אבל צד אחד אמיתי מספיק.", do=show("q-x-e", "q-n-e")),
    P("התשובה: ארבע שורות, בסדר הזה.", do=show("q-ok-b"), hold=0.5),
], stage=w.row(w.col(w.code("xq", QX, size="sm"), w.table("xt", PR, size="sm"), gap=20),
               w.col(w.stem("בסגנון מבחן", stem_html),
                     w.opts("q", OPTS, ncols=1, notes={"a": "השם הפוך", "c": "NULL כאפס", "d": "סדר עולה",
                                                        "e": "Unknown הפיל את OR"}), gap=24), gap=60),
   layout="full")

recap = Scene("recap", "סיכום", [
    P("לסיכום: ORDER BY רץ אחרון, וברירת המחדל שלו היא סדר עולה.", do=show("r-1")),
    P("DESC חל רק על העמודה שלפניו. העמודה הבאה מכריעה רק בתיקו.", do=show("r-2")),
    P("השוואה מול NULL היא Unknown, ו-WHERE משאיר רק True. לכן בודקים עם IS NULL.", do=show("r-3")),
    P("ו-OR עם צד אמיתי אחד הוא True, גם כשהצד השני Unknown. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.code("rq", QX),
   panel=st.card("r-1", "rule", "🔑 " + w.ic("ORDER BY") + ": עולה כברירת מחדל")
         + st.card("r-2", "rule", "🔑 " + w.ic("DESC") + " רק על העמודה שלפניו")
         + st.card("r-3", "trap", "⚠️ " + w.ic("= NULL") + " אף פעם לא אמת: " + w.ic("IS NULL"))
         + st.card("r-4", "ex", w.ic("TRUE OR UNKNOWN = TRUE")))

VIDEO = Video("S02", "sql", "ORDER BY ו-NULL", [title, order, null, logic, exam, recap], bank={})
