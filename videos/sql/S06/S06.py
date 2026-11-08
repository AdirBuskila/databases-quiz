# -*- coding: utf-8 -*-
"""S06 · תת-שאילתות וקיצון — video script (build: tools/video/vid.py S06).

Source: sql/levels/S06.js (lesson + goal: the three legal ways to the maximum, = (SELECT MAX), >= ALL, NOT EXISTS
"nobody is bigger than me", all of them return every tied row; > ALL returns nothing; MIN by flipping the sign;
MAX(salary), name / MAX in WHERE / MAX(COUNT) are invalid, HAVING COUNT(*) >= ALL (...) instead).
Exam anchor: 26Z-CL-Q12 (the second-highest price), not cited by any level quiz.
Avoided on purpose: the S06 quiz (Employees/Assignments/Projects, salaries 12000, ages, project counts) and the exam
items it cites (21B-A-Q12, 22B-A-Q8, 23B-A-Q9, 23B-A2-Q8, 24B-A-Q13); also 26S-A-Q10, a twin of 26B-A-Q11.
Worked examples use an original Players table; the exam check an original Flights instance.
SQLite has no ALL/ANY: a query with ALL is reasoned by hand and asserted through its equivalent
(x >= ALL S  <=>  x >= MAX(S),  x > ALL S  <=>  x > MAX(S),  x < ALL S  <=>  x < MIN(S); S non-empty, no NULL).
Every other query runs in SQLite (w_sql.DB); results on screen come from its output.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_sql as w

# ---------------------------------------------------------------- data (original)
PL = w.T("Players", ["p_name", "team", "goals"], [
    ["Avi", "Red", 12], ["Beni", "Blue", 7], ["Dor", "Red", 12], ["Eli", "Green", 3], ["Guy", "Blue", 9]],
    pk=["p_name"])
db = w.DB(PL)
N = len(PL["rows"])
assert all(r[2] is not None for r in PL["rows"])           # no NULL: the ALL equivalences below hold

QM1 = "SELECT p_name FROM Players\nWHERE goals = (SELECT MAX(goals) FROM Players)"
QM2 = "SELECT p_name FROM Players\nWHERE goals >= ALL (SELECT goals FROM Players)"
QM2_EQ = "SELECT p_name FROM Players WHERE goals >= (SELECT MAX(goals) FROM Players)"
QM3 = ("SELECT P1.p_name FROM Players P1\nWHERE NOT EXISTS (SELECT * FROM Players P2\n"
       "                  WHERE P2.goals > P1.goals)")
QM4 = "SELECT p_name FROM Players\nWHERE goals > ALL (SELECT goals FROM Players)"
QM4_EQ = "SELECT p_name FROM Players WHERE goals > (SELECT MAX(goals) FROM Players)"
RM1 = db.result(QM1)
RM2 = w.T("תוצאה", ["p_name"], db.rows(QM2_EQ))
RM3 = db.result(QM3)
RM4 = w.T("תוצאה", ["p_name"], db.rows(QM4_EQ))
assert [r[0] for r in RM1["rows"]] == ["Avi", "Dor"] and RM2["rows"] == RM1["rows"] and RM3["rows"] == RM1["rows"]
assert RM4["rows"] == []                                  # nobody has more goals than himself
# by hand, the ALL forms on these 5 values: >= every value only for 12; > every value never (12 > 12 is false)
gl = [r[2] for r in PL["rows"]]
assert [r[0] for r in PL["rows"] if all(r[2] >= g for g in gl)] == ["Avi", "Dor"]
assert [r[0] for r in PL["rows"] if all(r[2] > g for g in gl)] == []
TOP = [0, 2]
BEATS_BENI = [i for i, r in enumerate(PL["rows"]) if r[2] > 7]
assert BEATS_BENI == [0, 2, 4]

# minimum: flip the sign inside NOT EXISTS
QN = ("SELECT P1.p_name FROM Players P1\nWHERE NOT EXISTS (SELECT * FROM Players P2\n"
      "                  WHERE P2.goals < P1.goals)")
RN = db.result(QN)
assert RN["rows"] == [["Eli"]]

# the most players per team: HAVING COUNT(*) >= ALL (...)  (MAX(COUNT(*)) is invalid)
QT = ("SELECT team FROM Players\nGROUP BY team\nHAVING COUNT(*) >= ALL (SELECT COUNT(*) FROM Players\n"
      "                         GROUP BY team)")
QT_EQ = ("SELECT team FROM Players GROUP BY team HAVING COUNT(*) >= "
         "(SELECT MAX(c) FROM (SELECT COUNT(*) AS c FROM Players GROUP BY team) AS T)")
RT = w.T("תוצאה", ["team"], db.rows(QT_EQ))
assert sorted(r[0] for r in RT["rows"]) == ["Blue", "Red"]
cnt = {}
for r in PL["rows"]:
    cnt[r[1]] = cnt.get(r[1], 0) + 1
assert sorted(t for t, c in cnt.items() if all(c >= d for d in cnt.values())) == ["Blue", "Red"]
EMC = db.err("SELECT MAX(COUNT(*)) FROM Players GROUP BY team")
assert EMC and "misuse of aggregate" in EMC
GT = {i: {"Red": 0, "Blue": 1, "Green": 2}[r[1]] for i, r in enumerate(PL["rows"])}

# ---------------------------------------------------------------- exam 26Z-CL-Q12
Q = BANK["26Z-CL-Q12"]
assert Q["correctId"] == "d"
OPTS = w.bank_opts(Q)
FL = w.T("Flights", ["flight_id", "origin", "destination", "flight_date", "price"], [
    [1, "TLV", "Paris", "2026-05-01", 900], [2, "TLV", "Rome", "2026-05-02", 700], [3, "TLV", "Rome", "2026-05-03", 450],
    [4, "TLV", "Paris", "2026-05-04", 610], [5, "TLV", "London", "2026-05-05", 500]], pk=["flight_id"])
xdb = w.DB(FL)
SQL = {o: s for o, k, s in OPTS if k == "code"}
assert "MAX(price)" in SQL["a"].split("WHERE")[1] and "< ALL" in SQL["b"]
EA = xdb.err(SQL["a"])
assert EA and "misuse of aggregate" in EA                                     # MAX inside WHERE
B_EQ = "SELECT MAX(price) FROM Flights WHERE price < (SELECT MIN(price) FROM Flights)"
XB = xdb.rows(B_EQ)
assert XB == [[None]]                                                         # nothing is below every price: NULL
prices = [r[4] for r in FL["rows"]]
assert [p for p in prices if all(p < q for q in prices)] == []               # by hand: < ALL keeps no row
XC, XD = xdb.rows(SQL["c"]), xdb.rows(SQL["d"])
assert XD == [[700]] and sorted(prices)[-2] == 700                           # the real second-highest
assert XC == [[610]]                                                          # removed 900, 700 AND 500 (every max)
per_dest_max = xdb.rows("SELECT MAX(price) FROM Flights GROUP BY destination")
assert sorted(r[0] for r in per_dest_max) == [500, 700, 900]
RES = {"a": None, "b": w.T("תוצאה", ["MAX(price)"], XB), "c": w.T("תוצאה", ["MAX(price)"], XC),
       "d": w.T("תוצאה", ["MAX(price)"], XD)}
MAXROWS = [0, 1, 4]                                                           # Paris 900, Rome 700, London 500

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נמצא ערכי קיצון: המקסימום והמינימום."),
    P("נכיר שלוש דרכים כשרות, ונראה את המסיחים שחוזרים כמעט מילה במילה במבחנים."),
    P("ובסוף נפתור שאלה אמיתית ממבחן: המחיר השני בגובהו.", hold=0.4),
], stage='<div class="kicker">S06 · SQL</div><h1>תת-שאילתות וקיצון</h1>'
         '<p>למצוא את המקסימום והמינימום בשלוש הדרכים הכשרות, ולזהות את המסיחים הפסולים.</p>', layout="title")

ways = Scene("ways", "שלוש דרכים", [
    P("טבלת שחקנים, עם מספר השערים של כל אחד. מי הבקיע הכי הרבה?", do=show("wt")),
    P("שימו לב: אבי ודור הבקיעו שניהם 12. יש תיקו בצמרת.", do=show(*[f"wt-hi{i}" for i in TOP]),
      say="שימו לב: אבי ודור הבקיעו שניהם שתים עשרה. יש תיקו בצמרת."),
    P("דרך ראשונה: תת-שאילתה מחשבת את המקסימום, ו-WHERE משווה אליו כל שורה.", do=show("w1") + w.rows_do("wr1", RM1)),
    P("דרך שנייה: גדול או שווה ל-ALL. כלומר גדול או שווה לכל ערך שתת-השאילתה מחזירה.",
      do=show("w2") + w.rows_do("wr2", RM2), say="דרך שנייה: גדול או שווה לאוֹל. כלומר גדול או שווה לכל ערך שתת השאילתה מחזירה."),
    P("דרך שלישית: NOT EXISTS. שחקן נכנס אם לא קיים שחקן אחר שהבקיע יותר ממנו.", do=show("w3") + w.rows_do("wr3", RM3)),
    P("שלוש הדרכים מחזירות את שני השחקנים. כל מי שבשיא חוזר, גם בתיקו.", do=show("w-c1")),
    P("ומלכודת: גדול ממש מ-ALL, בלי שווה. אף שחקן לא הבקיע יותר מעצמו, ולכן אין אף שורה.",
      do=show("w4") + w.rows_do("wr4", RM4), say="ומלכודת: גדול ממש מאוֹל, בלי שווה. אף שחקן לא הבקיע יותר מעצמו, ולכן אין אף שורה."),
    P("ולכן עם ALL כותבים תמיד גדול או שווה.", do=show("w-c2"), hold=0.4, say="ולכן עם אוֹל כותבים תמיד גדול או שווה."),
], stage=w.col(w.row(w.code("w1", QM1, size="xs h"), w.result("wr1", RM1, size="xs", cap="1"), gap=20, cls="mid"),
               w.row(w.code("w2", QM2, size="xs h"), w.result("wr2", RM2, size="xs", cap="2"), gap=20, cls="mid"),
               w.row(w.code("w3", QM3, size="xs h"), w.result("wr3", RM3, size="xs", cap="3"), gap=20, cls="mid"),
               w.row(w.code("w4", QM4, size="xs h"), w.result("wr4", RM4, size="xs", cap="&gt; ALL"), gap=20, cls="mid"),
               gap=12),
   panel=w.table("wt", PL, hidden=True)
         + st.card("w-c1", "rule", "🔑 שלוש הדרכים מחזירות <b>את כל</b> מי שבשיא")
         + st.card("w-c2", "trap", "⚠️ " + w.ic("> ALL") + " מחזיר כלום. רק " + w.ic(">= ALL")))

nex = Scene("notexists", "NOT EXISTS מבפנים", [
    P("נבין את NOT EXISTS לאט. לכל שחקן, תת-השאילתה מחפשת מישהו שהבקיע יותר ממנו.", do=show("nq")),
    P("בני הבקיע שבעה. יש שלושה שהבקיעו יותר: אבי, דור וגיא. תת-השאילתה לא ריקה, ובני בחוץ.",
      do=show("nt-c1-2") + show(*[f"nt-hi{i}" for i in BEATS_BENI])),
    P("ולאבי? אין אף אחד מעל 12. תת-השאילתה ריקה, ולכן NOT EXISTS אמת, ואבי בפנים.",
      do=hide("nt-c1-2", *[f"nt-hi{i}" for i in BEATS_BENI]) + show("nt-c0-2"),
      say="ולאבי? אין אף אחד מעל שתים עשרה. תת השאילתה ריקה, ולכן נוֹט אֶגְזִיסְטְס אמת, ואבי בפנים."),
    P("הסימן שבפנים קובע מי נפסל. אם הופכים את הסימן, ובודקים מי הבקיע פחות, נפסל כל מי שיש מישהו שהבקיע פחות ממנו.", do=show("nn", "n-c2")),
    P("ונשאר המינימום: אלי, עם שלושה שערים.", do=hide("nt-c0-2") + w.rows_do("nr", RN)),
    P("ועוד דבר: מה שכתוב ב-SELECT של תת-השאילתה לא משנה. בודקים רק אם היא ריקה.", do=show("n-c1"), hold=0.4),
], stage=w.col(w.code("nq", QM3, size="sm h"), w.code("nn", QN, size="sm h"),
               w.row(w.table("nt", PL, size="sm", cells=[(1, 2), (0, 2)]), w.result("nr", RN, size="sm", cap="המינימום"),
                     gap=40), gap=18),
   panel=st.card("n-c1", "rule", "🔑 " + w.ic("NOT EXISTS") + " = תת-השאילתה ריקה")
         + st.card("n-c2", "ex", w.ic("P2.goals > P1.goals") + " ← מקסימום<br>" + w.ic("P2.goals < P1.goals")
                   + " ← מינימום"))

mc = Scene("maxcount", "הכי הרבה מ...", [
    P("ומה אם רוצים את הנבחרת עם הכי הרבה שחקנים? זה מקסימום של ספירות."),
    P("MAX של COUNT נראה טבעי, אבל זו אגרגציה על אגרגציה, והיא פסולה.", do=show("me")),
    P("במקום זה: מקבצים לפי נבחרת, ו-HAVING דורש שהספירה תהיה גדולה או שווה לכל הספירות.",
      do=show("mq", *[f"mt-g{i}" for i in GT])),
    P("לאדומים ולכחולים יש שני שחקנים, ולירוקים אחד. חוזרות שתי נבחרות: שוב, תיקו.", do=w.rows_do("mr", RT)),
    P("ואותו רעיון עובד גם עם VIEW שסופר לכל נבחרת. על VIEW נדבר בהרחבה בשלב 9.", do=show("m-c1"), hold=0.4,
      say="ואותו רעיון עובד גם עם וְיוּ שסופר לכל נבחרת. על וְיוּ נדבר בהרחבה בשלב תשע."),
], stage=w.col(w.note("me", w.ic("MAX(COUNT(*))") + ": <b class='sq-bad'>פסול</b>"), w.code("mq", QT, size="sm h"),
               w.row(w.table("mt", PL, size="sm", groups=GT), w.result("mr", RT, size="sm"), gap=40), gap=20),
   panel=st.card("m-c1", "rule", "🔑 ״הכי הרבה X״ = " + w.ic("HAVING COUNT(*) >= ALL (…)")))

stem_x = ("איזו שאילתה מחזירה את <b>המחיר השני בגובהו</b> בטבלה " + w.ic("Flights")
          + ", כלומר את המחיר הגבוה ביותר שקטן מהמחיר המקסימלי?")
exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: איזו שאילתה מחזירה את המחיר השני בגובהו בטבלת הטיסות?"),
    P("הרעיון: מוציאים את המקסימום, ולוקחים את המקסימום של מה שנשאר.", do=show("x-c1")),
    P("השאילתה עם MAX בתוך WHERE: אגרגציה ב-WHERE, פסולה.", do=show("q-x-a", "q-n-a")),
    P("קטן מ-ALL דורש מחיר שקטן מכל המחירים, כולל מעצמו. אין כזה, ומתקבל NULL.", do=show("q-x-b", "q-n-b"),
      say="קטן מאוֹל דורש מחיר שקטן מכל המחירים, כולל מעצמו. אין כזה, ומתקבל נָאל."),
    P("NOT IN על המקסימום של כל יעד מוציא יותר מדי: את המקסימום של כל יעד ויעד, לא רק את הגבוה ביותר.",
      do=show("q-x-c", "q-n-c")),
    P("ונשארה השאילתה עם תת-שאילתה שמחזירה ערך אחד: המחיר המקסימלי. כל מה שקטן ממנו נשאר, ולוקחים את הגבוה.",
      do=show("q-ok-d", "q-x-e", "q-n-e"), hold=0.5),
], stage=w.col(w.stem(Q["id"], stem_x),
               w.chip("x-c1", "מוציאים את המקסימום ← לוקחים את המקסימום של השאר"),
               w.opts("q", OPTS, ncols=2, size="sm", notes={"a": "MAX ב-WHERE", "b": "אין קטן מכולם",
                                                            "c": "מוציא כל מקסימום", "e": "יש נכונה"}), gap=22),
   layout="full")

check = Scene("check", "בודקים על נתונים", [
    P("נבדוק על חמש טיסות. המחיר הגבוה ביותר 900, והשני בגובהו 700.", do=show("xf", "xf-c0-4", "xf-c1-4"),
      say="נבדוק על חמש טיסות. המחיר הגבוה ביותר תשע מאות, והשני בגובהו שבע מאות."),
    P("השאילתה הנכונה מחזירה 700.", do=show("xr-d") + w.rows_do("xr-d", RES["d"]), say="השאילתה הנכונה מחזירה שבע מאות."),
    P("השאילתה עם NOT IN מוציאה את המקסימום של פריז, של רומא ושל לונדון. כולל 700!",
      do=show(*[f"xf-x{i}" for i in MAXROWS]), say="השאילתה עם נוֹט אִין מוציאה את המקסימום של פריז, של רומא ושל לונדון. כולל שבע מאות!"),
    P("ולכן היא מחזירה 610, מחיר נמוך מדי.", do=show("xr-c") + w.rows_do("xr-c", RES["c"]),
      say="ולכן היא מחזירה שש מאות ועשר, מחיר נמוך מדי."),
    P("קטן מ-ALL מחזיר NULL, ו-MAX בתוך WHERE לא רץ בכלל.",
      do=show("xr-b", "xe-a") + w.rows_do("xr-b", RES["b"]), say="קטן מאוֹל מחזיר נָאל, ומַקְס בתוך וֶור לא רץ בכלל.", hold=0.5),
], stage=w.row(w.table("xf", FL, hidden=True, cols=[0, 2, 4], cells=[(0, 4), (1, 4)]),
               w.note("xe-a", w.ic("WHERE price <> MAX(price)") + "<br><b class='sq-bad'>שגיאה</b>", cls="sm"),
               *[w.result(f"xr-{k}", RES[k], cap=c, hidden=True) for k, c in
                 (("b", w.ic("< ALL")), ("c", w.ic("NOT IN … GROUP BY")), ("d", w.ic("< (SELECT MAX …)")))], gap=40),
   layout="full")

recap = Scene("recap", "סיכום", [
    P("לסיכום, שלוש דרכים כשרות למקסימום: שווה לתת-שאילתה עם MAX, גדול או שווה ל-ALL, ו-NOT EXISTS.",
      do=show("r-1"), say="לסיכום, שלוש דרכים כשרות למקסימום: שווה לתת שאילתה עם מַקְס, גדול או שווה לאוֹל, ונוֹט אֶגְזִיסְטְס."),
    P("כולן מחזירות את כל מי שבשיא. וגדול ממש מ-ALL מחזיר כלום.", do=show("r-2"),
      say="כולן מחזירות את כל מי שבשיא. וגדול ממש מאוֹל מחזיר כלום."),
    P("למינימום הופכים את הסימן.", do=show("r-3")),
    P("ואסור: MAX ב-WHERE, וגם MAX של COUNT. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.col(w.code("rq1", "WHERE x = (SELECT MAX(x) FROM T)", size="sm"),
               w.code("rq2", "WHERE x >= ALL (SELECT x FROM T)", size="sm"),
               w.code("rq3", "WHERE NOT EXISTS (SELECT * FROM T t2\n                  WHERE t2.x > t1.x)", size="sm"),
               gap=20),
   panel=st.card("r-1", "rule", "🔑 שלוש דרכים כשרות")
         + st.card("r-2", "trap", "⚠️ " + w.ic("> ALL") + ": אין אף שורה")
         + st.card("r-3", "ex", "מינימום: הופכים את הסימן")
         + st.card("r-4", "trap", "⚠️ " + w.ic("WHERE x = MAX(x)") + " · " + w.ic("MAX(COUNT(*))")))

VIDEO = Video("S06", "sql", "תת-שאילתות וקיצון", [title, ways, nex, mc, exam, check, recap], bank={"26Z-CL-Q12": "d"})
