# -*- coding: utf-8 -*-
"""L03 · קרדינליות — video script (build: tools/video/vid.py L03).

Source: erd/levels/L03.js (goal: read arrows: who is limited to "at most one", and what that says about the other side).
Exam anchor: 22B-A-Q2 (official key d: "סטודנט חייב ללמוד במכללה אחת לכל היותר"), on 22B-A-erd.png. Not a quiz id and
not cited by any L03 question (those cite 23B-A2-Q1, 25B-A-Q4, 25B-A-Q2 and resemble 23B-A-Q2: all avoided here).
Avoided on purpose: the L03 quiz diagrams (עובד/מחלקה, שחקן/מדינה, סטודנט/קורס, נשיא/מדינה, קורס/מחלקה,
מרצה/קורס/סטודנט, חנות/מוכר/מוצר/רשת) and the lesson's three rows (סטודנט/קורס, עובד/מחלקה, נשיא/מדינה).
Worked examples: reader-magazine (N:M), car-parking lot (N:1), city-capital-country (1:1); coach-team-league claims.
Each claim's truth comes from the rule "an arrow from R to X: each instance on the other side has at most one X".
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_erd as w

ROWS = {"w": 1000, "h": 560, "nodes": [
    {"id": "RD", "t": "entity", "x": 150, "y": 90, "label": "קורא"},
    {"id": "SB", "t": "rel", "x": 500, "y": 90, "label": "מנוי ל"},
    {"id": "MG", "t": "entity", "x": 850, "y": 90, "label": "מגזין"},
    {"id": "CR", "t": "entity", "x": 150, "y": 280, "label": "רכב"},
    {"id": "PK", "t": "rel", "x": 500, "y": 280, "label": "חונה ב"},
    {"id": "LT", "t": "entity", "x": 850, "y": 280, "label": "חניון"},
    {"id": "CT", "t": "entity", "x": 150, "y": 470, "label": "עיר"},
    {"id": "CP", "t": "rel", "x": 500, "y": 470, "label": "בירה של"},
    {"id": "CO", "t": "entity", "x": 850, "y": 470, "label": "מדינה"},
], "edges": [{"a": "SB", "b": "RD"}, {"a": "SB", "b": "MG"},
             {"a": "PK", "b": "CR"}, {"a": "PK", "b": "LT", "arrow": True},
             {"a": "CP", "b": "CT", "arrow": True}, {"a": "CP", "b": "CO", "arrow": True}]}
D1 = w.Diagram("k", ROWS, hidden=["CR", "PK", "LT", "CT", "CP", "CO"])
S_ROW2 = D1.reveal("CR", "PK", "LT")
S_ROW3 = D1.reveal("CT", "CP", "CO")


def kind(spec, r):
    """N:M / N:1 / 1:1 from the arrows of a binary relationship"""
    n = sum(1 for e in spec["edges"] if e["a"] == r and e.get("arrow"))
    return {0: "N:M", 1: "N:1", 2: "1:1"}[n]


assert [kind(ROWS, r) for r in ("SB", "PK", "CP")] == ["N:M", "N:1", "1:1"]


def at_most_one(spec, r, frm, to):
    """does each `frm` instance relate through r to at most one `to`? = is there an arrow from r to `to`"""
    es = [e for e in spec["edges"] if e["a"] == r]
    assert {e["b"] for e in es} == {frm, to}
    return any(e["b"] == to and e.get("arrow") for e in es)


assert at_most_one(ROWS, "PK", "CR", "LT") and not at_most_one(ROWS, "PK", "LT", "CR")

LEAGUE = {"w": 1060, "h": 330, "nodes": [
    {"id": "CH", "t": "entity", "x": 110, "y": 240, "label": "מאמן"},
    {"id": "chid", "t": "attr", "x": 110, "y": 105, "label": "מס' מאמן", "key": True, "of": "CH"},
    {"id": "TR", "t": "rel", "x": 320, "y": 240, "label": "מאמן את"},
    {"id": "TM", "t": "entity", "x": 540, "y": 240, "label": "קבוצה"},
    {"id": "tmid", "t": "attr", "x": 540, "y": 105, "label": "קוד קבוצה", "key": True, "of": "TM"},
    {"id": "PL", "t": "rel", "x": 760, "y": 240, "label": "משחקת ב"},
    {"id": "LG", "t": "entity", "x": 960, "y": 240, "label": "ליגה"},
    {"id": "lgid", "t": "attr", "x": 955, "y": 105, "label": "קוד ליגה", "key": True, "of": "LG"},
], "edges": [{"a": "TR", "b": "CH", "arrow": True}, {"a": "TR", "b": "TM"},
             {"a": "PL", "b": "TM"}, {"a": "PL", "b": "LG", "arrow": True}]}
D2 = w.Diagram("l", LEAGUE)
CL = [("c1", "לכל קבוצה יש מאמן אחד לכל היותר", at_most_one(LEAGUE, "TR", "TM", "CH")),
      ("c2", "כל מאמן מאמן קבוצה אחת לכל היותר", at_most_one(LEAGUE, "TR", "CH", "TM")),
      ("c3", "בליגה יכולות לשחק הרבה קבוצות", not at_most_one(LEAGUE, "PL", "LG", "TM")),
      ("c4", "כל קבוצה חייבת לשחק בליגה", False)]          # an arrow is a maximum: nothing forces participation
assert [c[2] for c in CL] == [True, False, True, False]
assert not any(e.get("total") for e in LEAGUE["edges"])  # no double line anywhere: c4 cannot follow

# ---------------------------------------------------------------- exam 22B-A-Q2
Q = BANK["22B-A-Q2"]
assert Q["correctId"] == "d" and Q.get("official") is True and Q["contextId"] == "22B-A-erd"
OV = {o["id"]: o["value"] for o in Q["options"]}
assert "מעסיקה" in OV["a"] and "כיתה" in OV["b"] and "סטודנט" in OV["c"] and "לכל היותר" in OV["d"]
# the figure, read by eye: לומד ב: arrow -> מכללה, double line on the student's side; מעסיקה: plain lines, no
# arrows; מלמד ב: arrow -> מרצה, double line on the class's side; מכילה: double line on the class's side.
FIGREAD = {"לומד ב": {"arrow": "מכללה", "total": "סטודנט"}, "מעסיקה": {"arrow": None, "total": None},
           "מלמד ב": {"arrow": "מרצה", "total": "כיתה"}}
VERD = {"a": FIGREAD["מעסיקה"]["total"] == "מכללה",          # "at least one" needs a double line at מכללה
        "b": FIGREAD["מלמד ב"]["arrow"] == "כיתה",            # "each lecturer at most one class" needs an arrow to כיתה
        "c": False,                                           # מכללה's line to לומד ב is plain
        "d": FIGREAD["לומד ב"]["arrow"] == "מכללה"}
assert [k for k, v in VERD.items() if v] == [Q["correctId"]]
OPTS = w.bank_opts(Q)
RINGS = [("learn", 1682, 314, 140), ("arr", 1965, 183, 80), ("emp", 2167, 484, 140), ("teach", 2167, 1111, 140),
         ("tarr", 2174, 924, 80), ("col", 2165, 183, 160)]
EXAM_FIG = st.raster("x", "images/exams/22B-A-erd.png", 1060, (2932, 1772), rings=RINGS)

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד לקרוא את הסימן החשוב ביותר בתרשים: החץ."),
    P("נראה מה אומר חץ, על מי הוא מגביל, ומה הוא לא אומר."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">L03 · מודל ERD</div><h1>קרדינליות</h1>'
         '<p>לקרוא חצים: מי מוגבל ל"לכל היותר אחד", ומה זה אומר על הצד השני.</p>', layout="title")

arrows = Scene("arrows", "שלושה סוגי קשרים", [
    P("נתחיל בקשר בלי חצים בכלל: קורא מנוי למגזין."),
    P("קורא יכול להיות מנוי לכמה מגזינים, ולמגזין יש הרבה קוראים. אין שום הגבלה.", do=show("a-nm")),
    P("זה קשר **רבים לרבים**, ובקיצור N:M.", say="זה קשר רבים לרבים, ובקיצור אֶן אֶם."),
    P("עכשיו רכב שחונה בחניון. יש כאן חץ, מהמעוין אל החניון.", do=show(*S_ROW2, D1.he("PK", "LT"))),
    P("החץ אומר: כל רכב חונה בחניון **אחד לכל היותר**.", do=show("a-n1")),
    P("שימו לב לכיוון. החץ מצביע אל החניון, אבל ההגבלה היא על הרכב שבצד השני.", do=show(*D1.hn("CR"))),
    P("ובחניון? שם אין הגבלה: בחניון אחד חונים הרבה רכבים. זה קשר **רבים לאחד**.",
      do=hide(*D1.hn("CR"), D1.he("PK", "LT")) + show(*D1.hn("LT"))),
    P("ושני חצים: עיר שהיא בירה של מדינה.", do=hide(*D1.hn("LT")) + show(*S_ROW3)),
    P("החץ אל המדינה: כל עיר היא בירה של מדינה אחת לכל היותר.", do=show(D1.he("CP", "CO"))),
    P("והחץ אל העיר: לכל מדינה יש בירה אחת לכל היותר. זה קשר **אחד לאחד**.",
      do=hide(D1.he("CP", "CO")) + show(D1.he("CP", "CT"), "a-11"), hold=0.4),
], stage=D1.svg(),
   panel=st.card("a-nm", "ex", "בלי חצים = <b>רבים לרבים</b>")
         + st.card("a-n1", "rule", "🔑 חץ אל X = כל מופע <b>בצד השני</b> קשור ל-X <b>אחד לכל היותר</b>")
         + st.card("a-11", "ex", "שני חצים = <b>אחד לאחד</b>"))

read = Scene("read", "לקרוא היגדים", [
    P("עכשיו נתרגל את הפרוצדורה, כמו בשאלות של איזה היגד נכון. מאמנים, קבוצות וליגות."),
    P("שלושה צעדים: מוצאים את הקשר שההיגד מדבר עליו. עומדים על הישות שהמשפט מתחיל ממנה.", do=show("p-1")),
    P("ושואלים: יש חץ אל **הצד השני**? אז לכל היותר אחד. אין חץ? אז כמה שרוצים.", do=show("p-2")),
    P("היגד ראשון: לכל קבוצה יש מאמן אחד לכל היותר.", do=show("cl-c1")),
    P("עומדים על הקבוצה. בקשר מאמן את, יש חץ אל המאמן. אז נכון.", do=show(*D2.hn("TM"), D2.he("TR", "CH"), "cl-v-c1")),
    P("היגד שני: כל מאמן מאמן קבוצה אחת לכל היותר.", do=hide(*D2.hn("TM"), D2.he("TR", "CH")) + show("cl-c2")),
    P("עומדים על המאמן. יש חץ אל הקבוצה? לא. אז מאמן יכול לאמן כמה קבוצות, וההיגד שגוי.",
      do=show(*D2.hn("CH"), "cl-v-c2")),
    P("היגד שלישי: בליגה יכולות לשחק הרבה קבוצות.", do=hide(*D2.hn("CH")) + show("cl-c3")),
    P("עומדים על הליגה. החץ פונה אליה, לא אל הקבוצה. אז אין הגבלה על הליגה, ונכון.",
      do=show(*D2.hn("LG"), D2.he("PL", "LG"), "cl-v-c3")),
    P("והיגד רביעי: כל קבוצה **חייבת** לשחק בליגה.", do=hide(*D2.hn("LG"), D2.he("PL", "LG")) + show("cl-c4")),
    P("זו המלכודת. החץ אומר **לכל היותר** אחד, כלומר אפס או אחד. הוא לא אומר לפחות אחד.", do=show("cl-v-c4")),
    P("קבוצה שעוד לא שובצה לליגה מותרת לגמרי. את החובה מראה סימן אחר, שנכיר בשלב הבא.", do=show("p-t"),
      hold=0.4),
], stage=w.stack(D2.svg(), w.claims("cl", CL), gap=20),
   panel=st.card("p-1", "ex", "1. מוצאים את הקשר · 2. עומדים על הישות שבתחילת המשפט")
         + st.card("p-2", "rule", "🔑 3. חץ <b>אל הצד השני</b>? לכל היותר אחד. אין חץ? כמה שרוצים")
         + st.card("p-t", "trap", "⚠️ חץ = מקסימום, לא מינימום. ״חייב״ לא נובע מחץ"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן, על התרשים של המכללה. איזה מההיגדים נכון?"),
    P("מסמנים קודם את החצים. בקשר לומד ב, יש חץ אל המכללה.", do=show("x-ring-learn", "x-ring-arr")),
    P("אז כל סטודנט לומד במכללה אחת לכל היותר. זה ההיגד הנכון.", do=show("q-ok-d")),
    P("ויש שם גם קו כפול בצד הסטודנט, שמוסיף שהוא לומד במכללה אחת לפחות. נלמד אותו בשלב הבא."),
    P("ההיגד על מכללה שחייבת להכיל סטודנט: בצד המכללה הקו רגיל. אין שום חובה.",
      do=hide("x-ring-learn", "x-ring-arr") + show("x-ring-col", "q-x-c", "q-n-c")),
    P("מכללה מעסיקה מרצה אחד לפחות? בקשר מעסיקה אין חצים ואין קו כפול. גם זה לא נובע.",
      do=hide("x-ring-col") + show("x-ring-emp", "q-x-a", "q-n-a")),
    P("ואחרון: כל מרצה מלמד בכיתה אחת לכל היותר. בקשר מלמד ב, החץ פונה **אל המרצה**.",
      do=hide("x-ring-emp") + show("x-ring-teach", "x-ring-tarr")),
    P("כלומר לכל כיתה יש מרצה אחד לכל היותר. המרצה עצמו יכול ללמד בהרבה כיתות. המלכודת הפכה את הכיוון.",
      do=show("q-x-b", "q-n-b")),
    P("ומכיוון שמצאנו היגד נכון, האפשרות שאף תשובה לא נכונה נופלת.",
      do=hide("x-ring-teach", "x-ring-tarr") + show("q-x-e"), hold=0.4),
], stage=EXAM_FIG,
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q["id"] + '</span>' + Q["question"] + '</div></div>'
         + '<div class="er-osm">' + st.options("q", OPTS, notes={"a": "אין סימן", "b": "כיוון הפוך",
                                                                  "c": "קו רגיל"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: בלי חצים זה רבים לרבים. חץ אחד זה רבים לאחד, ושני חצים זה אחד לאחד.", do=show("r-1")),
    P("חץ אל X מגביל את הצד **השני**: כל מופע שם קשור ל-X אחד לכל היותר.", do=show("r-2"),
      say="חץ אל ישות מגביל את הצד השני: כל מופע שם קשור למופע אחד לכל היותר של הישות הזאת."),
    P("והחץ הוא רק מקסימום. ״חייב״ לא נובע ממנו. נתראה בשלב הבא, על הקו הכפול.", do=show("r-3"), hold=0.6),
], stage=w.Diagram("kr", ROWS).svg(),
   panel=st.card("r-1", "rule", "🔑 0 חצים <span class='er-code'>N:M</span> · 1 חץ <span class='er-code'>N:1</span> · 2 חצים <span class='er-code'>1:1</span>")
         + st.card("r-2", "rule", "🔑 חץ אל X מגביל את הצד השני")
         + st.card("r-3", "trap", "⚠️ חץ = לכל היותר, לא ״חייב״"))

VIDEO = Video("L03", "erd", "קרדינליות", [title, arrows, read, exam, recap], bank={"22B-A-Q2": "d"})
