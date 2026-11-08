# -*- coding: utf-8 -*-
"""S07 · שלילה: אף פעם לא / אין לו — video script (build: tools/video/vid.py S07).

Source: sql/levels/S07.js (lesson + goal: "never / has none" with NOT IN, NOT EXISTS (correlated) or LEFT JOIN ... IS
NULL; the traps: <> on the row instead of negation on the person, INNER JOIN + IS NULL is always empty, NOT EXISTS
without the link to the outer row).
Exam anchor: 26Z-CL-Q5 (booked Rome at least once AND never booked Business), not cited by any level quiz.
Avoided on purpose: the S07 quiz (Readers/Books/Loans, SciFi/Classic, the Score table) and the exam items it cites
(25B-A-Q8, 21B-A-Q6, 26B-A-Q7, 23B-A2-Q6, 26S-A-Q8); also 23B-A2-Q10 (= S07-Q7 word for word) and 25S-B-Q7,
25S-B-Q12, 25C-A-Q12 (twins of S07-Q4). Worked examples use an original Volunteers/Shifts database; the exam check
an original Passengers/Flights/Bookings instance. Every query runs in SQLite; results come from its output.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_sql as w

# ---------------------------------------------------------------- data (original)
VO = w.T("Volunteers", ["v_id", "v_name"], [[1, "Avi"], [2, "Bella"], [3, "Chen"], [4, "Dalia"], [5, "Eyal"]],
         pk=["v_id"])
SH = w.T("Shifts", ["v_id", "s_day", "kind"], [
    [1, "Mon", "Day"], [1, "Tue", "Night"], [2, "Mon", "Day"], [2, "Wed", "Day"], [3, "Tue", "Night"],
    [4, "Thu", "Day"]], pk=["v_id", "s_day"])
db = w.DB(VO, SH)
NEVER = ["Bella", "Dalia", "Eyal"]                       # by hand: no Night row (Eyal has no rows at all)
assert NEVER == [r[1] for r in VO["rows"] if not any(s[0] == r[0] and s[2] == "Night" for s in SH["rows"])]

QT = ("SELECT DISTINCT V.v_name\nFROM Volunteers V JOIN Shifts S ON V.v_id = S.v_id\nWHERE S.kind <> 'Night'")
RT = db.result(QT)
assert [r[0] for r in RT["rows"]] == ["Avi", "Bella", "Dalia"]        # Avi did a night shift; Eyal is missing
KT = [i for i, s in enumerate(SH["rows"]) if s[2] != "Night"]

Q1 = "SELECT v_name FROM Volunteers\nWHERE v_id NOT IN (SELECT v_id FROM Shifts\n                   WHERE kind = 'Night')"
Q2 = ("SELECT V.v_name FROM Volunteers V\nWHERE NOT EXISTS (SELECT * FROM Shifts S\n"
      "                  WHERE S.v_id = V.v_id\n                    AND S.kind = 'Night')")
R1, R2 = db.result(Q1), db.result(Q2)
assert [r[0] for r in R1["rows"]] == NEVER and R2["rows"] == R1["rows"]
NIGHT_IDS = sorted({s[0] for s in SH["rows"] if s[2] == "Night"})
assert NIGHT_IDS == [1, 3]

QL = "SELECT V.v_name, S.s_day\nFROM Volunteers V LEFT JOIN Shifts S\n  ON V.v_id = S.v_id"
RL = db.result(QL)
assert len(RL["rows"]) == 7 and ["Eyal", None] in RL["rows"]         # 6 shifts + Eyal with NULL
QL2 = QL + "\nWHERE S.v_id IS NULL"
RL2 = db.result(QL2, columns=["v_name", "s_day"])
assert RL2["rows"] == [["Eyal", None]]
QI = "SELECT V.v_name\nFROM Volunteers V JOIN Shifts S\n  ON V.v_id = S.v_id\nWHERE S.v_id IS NULL"
RI = db.result(QI)
assert RI["rows"] == []                                                 # an inner join never makes the NULL
EYAL = [i for i, r in enumerate(RL["rows"]) if r[0] == "Eyal"]

QU = ("SELECT V.v_name FROM Volunteers V\nWHERE NOT EXISTS (SELECT * FROM Shifts S\n"
      "                  WHERE S.kind = 'Night')")
RU = db.result(QU)
assert RU["rows"] == []                                                 # a Night row exists: nobody comes back
assert db.rows("SELECT v_name FROM Volunteers WHERE NOT EXISTS (SELECT * FROM Shifts WHERE kind = 'Evening')") == \
    [[r[1]] for r in VO["rows"]]                                        # ... and with no such row: everybody

# ---------------------------------------------------------------- exam 26Z-CL-Q5
Q = BANK["26Z-CL-Q5"]
assert Q["correctId"] == "b"
OPTS = w.bank_opts(Q)
PA = w.T("Passengers", ["passenger_id", "name", "country", "birth_year"], [
    [1, "Dana", "Israel", 1995], [2, "Omer", "Israel", 1990], [3, "Lea", "France", 1988], [4, "Ken", "Japan", 2000],
    [5, "Mia", "France", 1999]], pk=["passenger_id"])
FL = w.T("Flights", ["flight_id", "origin", "destination", "flight_date", "price"], [
    [10, "TLV", "Rome", "2026-04-01", 400], [11, "TLV", "Rome", "2026-04-08", 450], [12, "TLV", "Paris", "2026-04-02", 500],
    [13, "TLV", "London", "2026-04-03", 600]], pk=["flight_id"])
BK = w.T("Bookings", ["passenger_id", "flight_id", "seat_class", "paid"], [
    [1, 10, "Economy", 400], [2, 10, "Economy", 400], [2, 12, "Business", 1500], [3, 11, "Business", 1400],
    [4, 12, "Economy", 500], [5, 11, "Economy", 450], [5, 10, "Business", 1300]], pk=["passenger_id", "flight_id"])
xdb = w.DB(PA, FL, BK)
XR = {o: xdb.result(s) for o, k, s in OPTS if k == "code"}
got = {o: sorted(r[0] for r in t["rows"]) for o, t in XR.items()}
assert got["b"] == ["Dana"]                                   # Rome, and no Business booking anywhere
assert got["a"] == ["Dana", "Mia", "Omer"]                    # <> checks the row: Omer (Business to Paris), Mia slip in
assert got["c"] == ["Dana", "Omer"]                           # only Business TO ROME is excluded: Omer slips in
assert got["d"] == ["Dana", "Lea", "Mia", "Omer"]             # passenger ids vs flight ids: excludes nobody
assert len({tuple(v) for v in got.values()}) == 4
CAPS = {"a": w.ic("seat_class <> 'Business'"), "b": w.ic("NOT IN") + " כל הביזנס",
        "c": w.ic("NOT IN") + " ביזנס לרומא", "d": w.ic("NOT IN (SELECT flight_id …)")}
OMER = [1, 2]                                                 # Omer's two bookings

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נכתוב שלילה: מי שאף פעם לא עשה משהו, או מי שאין לו."),
    P("נראה שלוש דרכים נכונות, ואת המסיחים שתמיד מחזירים תשובה לא נכונה."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">S07 · SQL</div><h1>שלילה: אף פעם לא / אין לו</h1>'
         '<p>לכתוב ״מי שאין לו״ ו״מעולם לא״ בשלוש הדרכים הנכונות, ולזהות את המסיחים שתמיד מחזירים תשובה שגויה.</p>',
   layout="title")

trap = Scene("trap", "המסיח הטבעי", [
    P("עמותה של מתנדבים, וטבלת משמרות: יום או לילה. מי מהמתנדבים לא עשה אף פעם משמרת לילה?", do=show("tv", "ts")),
    P("הניסיון הטבעי: לחבר, ולהשאיר משמרות שאינן לילה.", do=show("tq")),
    P("אבל התנאי הזה בודק משמרת אחת, לא את המתנדב כולו.", do=w.where_do("ts", KT, len(SH["rows"]))),
    P("אבי עשה משמרת לילה, אבל יש לו גם משמרת יום. השורה הזו עוברת, ואבי בתוצאה.",
      do=show("ts-c0-2", "ts-c1-2") + w.rows_do("tr", RT)),
    P("ואייל, שלא עשה אף משמרת, נעלם לגמרי: ל-JOIN אין מה להצמיד לו.", do=show("tv-x4")),
    P("״אף פעם לא״ זו שלילה על האדם, על כל השורות שלו יחד. לא על שורה אחת.", do=show("t-c1"), hold=0.4),
], stage=w.col(w.code("tq", QT, size="sm h"),
               w.row(w.table("tv", VO, size="sm", hidden=True), w.table("ts", SH, size="sm", hidden=True,
                                                                     cells=[(0, 2), (1, 2)]),
                     w.result("tr", RT, size="sm", cap="תוצאה (שגויה)"), gap=30), gap=24),
   panel=st.card("t-c1", "trap", "⚠️ " + w.ic("kind <> 'Night'") + " בודק <b>שורה</b>, לא <b>אדם</b>"))

ways = Scene("ways", "שתי דרכים נכונות", [
    P("הדרך הנכונה: קודם מוצאים את מי שכן עשה משמרת לילה. אלה אבי וחן.", do=show("wq1-l1", "wq1-l2", "wv-hi0", "wv-hi2")),
    P("ואז NOT IN: לוקחים את כל השאר. בלה, דליה ואייל.",
      do=show("wq1-l0") + w.rows_do("wr1", R1) + show("wv-x0", "wv-x2"),
      say="ואז נוֹט אִין: לוקחים את כל השאר. בלה, דליה ואייל."),
    P("ושימו לב: אייל בפנים. מי שלא עשה כלום, בוודאי לא עשה משמרת לילה.", do=show("wv-c4-1")),
    P("דרך שנייה, NOT EXISTS: לכל מתנדב בודקים אם קיימת משמרת לילה שלו.", do=show("wq2")),
    P("השורה שקושרת את המשמרת למתנדב, היא מה שהופך את הבדיקה לאישית.", do=show("wq2-m2")),
    P("אותה תוצאה בדיוק.", do=w.rows_do("wr2", R2), hold=0.4),
], stage=w.col(w.row(w.code("wq1", Q1, size="xs", hidden=True), w.result("wr1", R1, size="xs", cap=w.ic("NOT IN")),
                     gap=24, cls="mid"),
               w.row(w.code("wq2", Q2, size="xs h"), w.result("wr2", R2, size="xs", cap=w.ic("NOT EXISTS")),
                     gap=24, cls="mid"), gap=26),
   panel=w.table("wv", VO, size="sm", cells=[(4, 1)])
         + st.card("w-c1", "rule", "🔑 קודם מוצאים את מי <b>שכן</b>, ואז לוקחים את <b>השאר</b>").replace(
             'class="card rule h"', 'class="card rule"'))

left = Scene("leftjoin", "LEFT JOIN", [
    P("הדרך השלישית משתמשת ב-LEFT JOIN. הוא שומר את כל השורות של הטבלה השמאלית.", do=show("lq")),
    P("למי שאין התאמה, העמודות של הטבלה הימנית מתמלאות ב-NULL. לאייל אין משמרות, ולכן היום שלו NULL.",
      do=w.rows_do("lr", RL) + show(*[f"lr-hi{i}" for i in EYAL])),
    P("עכשיו נשאיר רק את השורות עם NULL, ונקבל את מי שלא עשה אף משמרת: אייל.", do=show("lq2") + w.rows_do("lr2", RL2)),
    P("ומלכודת: JOIN רגיל עם IS NULL. JOIN רגיל לא מייצר אף NULL, ולכן התוצאה תמיד ריקה.",
      do=show("lq3") + w.rows_do("lr3", RI)),
    P("מאותה סיבה, JOIN רגיל עם HAVING COUNT שווה אפס תמיד ריק: קבוצה ריקה בכלל לא נוצרת.", do=show("l-c1")),
    P("ואחרי LEFT JOIN, תנאי השוואה ב-WHERE, כמו ״שווה ל...״, על עמודה מהטבלה הימנית, זורק את שורות ה-NULL.",
      do=show("l-c2"), hold=0.4),
], stage=w.row(w.col(w.code("lq", QL, size="xs h"), w.result("lr", RL, size="xs"), gap=14),
               w.col(w.code("lq2", "… WHERE S.v_id IS NULL", size="xs h"), w.result("lr2", RL2, size="xs"),
                     w.code("lq3", QI, size="xs h"), w.result("lr3", RI, size="xs", cap="תוצאה, " + w.ic("JOIN") + " רגיל"),
                     gap=14), gap=30),
   panel=st.card("l-c1", "trap", "⚠️ " + w.ic("JOIN") + " רגיל + " + w.ic("IS NULL") + " / " + w.ic("COUNT(*) = 0")
                 + ": תמיד ריק")
         + st.card("l-c2", "trap", "⚠️ " + w.ic("LEFT JOIN … WHERE S.kind = …") + " = " + w.ic("JOIN") + " רגיל"))

link = Scene("link", "NOT EXISTS בלי קישור", [
    P("עוד מסיח: NOT EXISTS בלי השורה שקושרת למתנדב.", do=show("uq")),
    P("עכשיו תת-השאילתה שואלת שאלה אחת על כל הטבלה: האם קיימת משמרת לילה כלשהי?"),
    P("קיימת, ולכן NOT EXISTS שקר לכל מתנדב, ואף אחד לא חוזר.", do=w.rows_do("ur", RU)),
    P("ואם לא הייתה אף משמרת לילה, היו חוזרים כולם. בכל מקרה, זו לא התשובה.", do=show("u-c1"), hold=0.4),
], stage=w.row(w.code("uq", QU, size="sm h"), w.result("ur", RU, size="sm"), gap=40, cls="mid"),
   panel=st.card("u-c1", "trap", "⚠️ " + w.ic("NOT EXISTS") + " בלי " + w.ic("S.v_id = V.v_id") + ": כולם או אף אחד"))

stem_x = ("איזו שאילתה מחזירה את שמות הנוסעים שהזמינו <b>לפחות טיסה אחת</b> ליעד " + w.ic("'Rome'")
          + ", ו<b>מעולם לא</b> הזמינו מקום במחלקת " + w.ic("'Business'") + " (באף טיסה)?")
exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: נוסעים שהזמינו לפחות טיסה אחת לרומא, ומעולם לא הזמינו מקום במחלקת עסקים, באף טיסה."),
    P("שני חלקים. ״לפחות טיסה אחת לרומא״: JOIN רגיל, עם תנאי על היעד.", do=show("x-c1")),
    P("״מעולם לא עסקים״: שלילה על הנוסע. NOT IN על כל מי שהזמין עסקים, בכל טיסה.", do=show("x-c2")),
    P("השאילתה שבודקת ״המחלקה שונה מעסקים״ בודקת רק את השורה הנוכחית. זה המסיח הטבעי.",
      do=show("q-x-a", "q-n-a")),
    P("השאילתה שתת-השאילתה שלה מסוננת לרומא פוסלת רק עסקים לרומא. מי שטס בעסקים לפריז לא נפסל.",
      do=show("q-x-c", "q-n-c")),
    P("והשאילתה שמשווה מזהה נוסע למזהי טיסות משווה עמודות מעולמות שונים.", do=show("q-x-d", "q-n-d")),
    P("נשארה השאילתה עם NOT IN על כל ההזמנות במחלקת עסקים.", do=show("q-ok-b", "q-x-e", "q-n-e"), hold=0.5),
], stage=w.col(w.stem(Q["id"], stem_x),
               w.row(w.chip("x-c1", "לפחות אחת ← " + w.ic("JOIN")),
                     w.chip("x-c2", "מעולם לא ← " + w.ic("NOT IN") + " על כל ההזמנות"), gap=24),
               w.opts("q", OPTS, ncols=2, size="xs", notes={"a": "בודק שורה", "c": "רק ביזנס לרומא",
                                                            "d": "מזהה נוסע מול טיסה", "e": "יש נכונה"}), gap=18),
   layout="full")

check = Scene("check", "בודקים על נתונים", [
    P("נבדוק על חמישה נוסעים. דנה טסה לרומא באקונומי, ואין לה שום הזמנה בעסקים.", do=show("xb", "xb-hi0")),
    P("עומר טס לרומא באקונומי, אבל לפריז בעסקים.", do=show(*[f"xb-hi{i}" for i in OMER])),
    P("והשאילתה הנכונה מחזירה רק את דנה.", do=show("xr-b") + w.rows_do("xr-b", XR["b"])),
    P("המסיח של ״שונה מעסקים״ מכניס את עומר, ואת מיה, שטסה לרומא גם בעסקים וגם באקונומי.",
      do=show("xr-a") + w.rows_do("xr-a", XR["a"])),
    P("המסיח שפוסל רק עסקים לרומא מכניס את עומר.", do=show("xr-c") + w.rows_do("xr-c", XR["c"])),
    P("והמסיח עם מזהי הטיסות לא פוסל אף אחד: כל מי שטס לרומא חוזר.",
      do=show("xr-d") + w.rows_do("xr-d", XR["d"]), hold=0.5),
], stage=w.row(w.table("xb", BK, size="sm", hidden=True, cols=[0, 1, 2]),
               w.table("xf", FL, size="sm", cols=[0, 2]),
               *[w.result(f"xr-{k}", XR[k], size="sm", cap=CAPS[k], hidden=True) for k in "abcd"], gap=30),
   layout="full")

recap = Scene("recap", "סיכום", [
    P("לסיכום: ״אף פעם לא״ זו שלילה על האדם, לא על שורה. תנאי ״שונה מעסקים״ על שורה אחת הוא מסיח.", do=show("r-1")),
    P("שלוש דרכים נכונות: NOT IN, NOT EXISTS עם קישור לשורה החיצונית, ו-LEFT JOIN עם IS NULL.", do=show("r-2")),
    P("JOIN רגיל עם IS NULL תמיד ריק.", do=show("r-3")),
    P("ו-NOT EXISTS בלי קישור מחזיר כולם או אף אחד. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.code("rq", Q2),
   panel=st.card("r-1", "trap", "⚠️ " + w.ic("<>") + " על שורה ≠ ״אף פעם לא״")
         + st.card("r-2", "rule", "🔑 " + w.ic("NOT IN") + " · " + w.ic("NOT EXISTS") + " · " + w.ic("LEFT JOIN … IS NULL"))
         + st.card("r-3", "trap", "⚠️ " + w.ic("JOIN") + " + " + w.ic("IS NULL") + " = ריק")
         + st.card("r-4", "trap", "⚠️ " + w.ic("NOT EXISTS") + " בלי קישור"))

VIDEO = Video("S07", "sql", "שלילה: אף פעם לא / אין לו", [title, trap, ways, left, link, exam, check, recap],
              bank={"26Z-CL-Q5": "b"})
