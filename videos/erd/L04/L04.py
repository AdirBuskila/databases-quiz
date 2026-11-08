# -*- coding: utf-8 -*-
"""L04 · השתתפות — video script (build: tools/video/vid.py L04).

Source: erd/levels/L04.js (goal: read a double line (must), combine it with an arrow (exactly one), read (min,max)).
Exam anchor: 21B-A-Q2 (official key c: "מנכ״ל הוא מנהל של לפחות חברת סטארט-אפ אחת"), on 21B-A-erd.png. Not a quiz
id. Avoided on purpose: 21B-A-Q4 (the changed figure, twin of L04-Q2), 21S-B-Q3/Q6 and 23B-A2-Q2 (the lesson / quiz
cases), 23B-A-Q3, and the L04 quiz diagrams (עובד/מחלקה, עובד/חברה, רכב/בעלים, סטודנט/קורס (1,3), בית/קבלן,
מסלול/מדריך, שחקן/פרס, עובד/מחלקה/חברה/פרויקט). No (2,2) example (that is L04-Q5).
Worked examples: passport issued to a citizen (double line + arrow = exactly one); team includes players with
(0,1) and (2,5). Every claim's truth is computed from the edge flags below.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_erd as w

PASS = {"w": 1000, "h": 330, "nodes": [
    {"id": "CZ", "t": "entity", "x": 150, "y": 220, "label": "אזרח"},
    {"id": "czid", "t": "attr", "x": 150, "y": 90, "label": "ת״ז", "key": True, "of": "CZ"},
    {"id": "IS", "t": "rel", "x": 490, "y": 220, "label": "הונפק ל"},
    {"id": "PS", "t": "entity", "x": 830, "y": 220, "label": "דרכון"},
    {"id": "psid", "t": "attr", "x": 830, "y": 90, "label": "מס' דרכון", "key": True, "of": "PS"},
], "edges": [{"a": "IS", "b": "CZ", "arrow": True}, {"a": "IS", "b": "PS", "total": True}]}
D1 = w.Diagram("p", PASS)


def side(spec, r, x):
    """(min, max) of how many partners each x has through binary relationship r, from the double line and the
    arrow: min = 1 if x's own line is double; max = 1 if there is an arrow to the other side"""
    es = [e for e in spec["edges"] if e["a"] == r]
    mine = next(e for e in es if e["b"] == x)
    other = next(e for e in es if e["b"] != x)
    return (1 if mine.get("total") else 0), (1 if other.get("arrow") else None)


assert side(PASS, "IS", "PS") == (1, 1)            # each passport: exactly one citizen
assert side(PASS, "IS", "CZ") == (0, None)         # a citizen: zero or many passports
CL1 = [("c1", "כל דרכון הונפק לאזרח אחד בדיוק", side(PASS, "IS", "PS") == (1, 1)),
       ("c2", "ייתכן דרכון שלא הונפק לאף אזרח", side(PASS, "IS", "PS")[0] == 0),
       ("c3", "כל אזרח חייב שיהיה לו דרכון", side(PASS, "IS", "CZ")[0] == 1),
       ("c4", "לאזרח יכולים להיות כמה דרכונים", side(PASS, "IS", "CZ")[1] is None)]
assert [c[2] for c in CL1] == [True, False, False, True]

TEAM = {"w": 1000, "h": 300, "nodes": [
    {"id": "TM", "t": "entity", "x": 150, "y": 190, "label": "קבוצה"},
    {"id": "IN", "t": "rel", "x": 490, "y": 190, "label": "כוללת"},
    {"id": "PL", "t": "entity", "x": 830, "y": 190, "label": "שחקן"},
], "edges": [{"a": "IN", "b": "TM", "label": "(0,1)"}, {"a": "IN", "b": "PL", "label": "(2,5)"}]}
D2 = w.Diagram("t", TEAM)
# (a,b) next to X = how many X each instance on the other side has
MINMAX = {"PL": (2, 5), "TM": (0, 1)}
PER_TEAM, PER_PLAYER = MINMAX["PL"], MINMAX["TM"]
assert PER_TEAM == (2, 5) and PER_PLAYER == (0, 1)
assert PER_TEAM[0] >= 1          # every team must take part: what a double line on the team's side would say
assert PER_PLAYER[1] == 1        # each player at most one team: what an arrow to the team would say

# ---------------------------------------------------------------- exam 21B-A-Q2
Q = BANK["21B-A-Q2"]
assert Q["correctId"] == "c" and Q.get("official") is True and Q["contextId"] == "21B-A-erd"
OV = {o["id"]: o["value"] for o in Q["options"]}
assert "כמה מנהלים" in OV["a"] and "חייב" in OV["b"] and "מנכ" in OV["c"] and "כמה חברות" in OV["d"]
# the figure, read by eye: עובד ב: plain line at עובד, double line + arrow at the company;
# מנהל: double line at the company, double line + arrow at מנכ"ל.
FIG = {"עובד ב": {"עובד": {"total": False, "arrow": False}, "חברה": {"total": True, "arrow": True}},
       "מנהל": {"חברה": {"total": True, "arrow": False}, "מנכ\"ל": {"total": True, "arrow": True}}}


def fig_side(r, x):
    es = FIG[r]
    other = next(k for k in es if k != x)
    return (1 if es[x]["total"] else 0), (1 if es[other]["arrow"] else None)


VERD = {"a": fig_side("מנהל", "חברה")[1] is None,           # several managers per company needs no arrow to מנכ"ל
        "b": fig_side("עובד ב", "עובד")[0] == 1,
        "c": fig_side("מנהל", "מנכ\"ל")[0] == 1,
        "d": fig_side("עובד ב", "עובד")[1] is None}
assert [k for k, v in VERD.items() if v] == [Q["correctId"]]
OPTS = w.bank_opts(Q)
RINGS = [("mgr", 2240, 1080, 150), ("ceo", 1135, 1118, 95), ("co", 2229, 760, 95), ("wk", 1445, 409, 150),
         ("wl", 990, 409, 90), ("ca", 2151, 422, 90)]
EXAM_FIG = st.raster("x", "images/exams/21B-A-erd.png", 1060, (2830, 1550), rings=RINGS)

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הקודם החץ ענה על השאלה: לכל היותר כמה."),
    P("עכשיו נלמד את הסימן שעונה על השאלה השנייה: האם חייב. הקו הכפול."),
    P("נשלב אותו עם חץ, נקרא סימון של מינימום ומקסימום, ובסוף נפתור שאלה ממבחן.", hold=0.4),
], stage='<div class="kicker">L04 · מודל ERD</div><h1>השתתפות</h1>'
         '<p>לקרוא קו כפול (חובה), לשלב אותו עם חץ (בדיוק אחד) ולקרוא סימון (min,max).</p>', layout="title")

double = Scene("double", "קו כפול וחץ", [
    P("משרד הפנים מנפיק דרכונים לאזרחים. הנה התרשים."),
    P("קו רגיל בין ישות לקשר אומר השתתפות **חלקית**: אפס או יותר. ״יכול״, ״ייתכן״.", do=show("d-1")),
    P("**קו כפול** אומר השתתפות **מלאה**: כל מופע של הישות משתתף בקשר לפחות פעם אחת.", do=show("d-2")),
    P("כאן הקו הכפול נמצא בצד הדרכון. אז כל דרכון הונפק **לפחות** לאזרח אחד.",
      do=show(D1.he("IS", "PS"), *D1.hn("PS"))),
    P("ויש גם חץ אל האזרח. כלומר כל דרכון הונפק לאזרח אחד **לכל היותר**.",
      do=hide(D1.he("IS", "PS")) + show(D1.he("IS", "CZ"))),
    P("לפחות אחד, וגם לכל היותר אחד: **בדיוק אחד**. זה הצירוף הכי נפוץ במבחן.", do=show("d-3")),
    P("עכשיו נבדוק ארבעה היגדים. כל דרכון הונפק לאזרח אחד בדיוק: נכון, ראינו.",
      do=hide(D1.he("IS", "CZ"), *D1.hn("PS")) + show("c-c1", "c-v-c1")),
    P("ייתכן דרכון שלא הונפק לאף אזרח? לא. הקו הכפול בצד הדרכון אוסר את זה.", do=show("c-c2", "c-v-c2")),
    P("כל אזרח חייב שיהיה לו דרכון? בצד האזרח הקו רגיל, אז לא. אפשר לחיות בלי דרכון.",
      do=show("c-c3", "c-v-c3", *D1.hn("CZ"))),
    P("ולאזרח יכולים להיות כמה דרכונים? אין חץ אל הדרכון, אז כן. למשל, דרכון ישן ודרכון חדש.",
      do=show("c-c4", "c-v-c4")),
    P("הכלל: הקו הכפול מחייב את הישות שלידו, והחץ מגביל את הצד השני.",
      do=hide(*D1.hn("CZ")) + show("d-4"), hold=0.4),
], stage=w.stack(D1.svg(), w.claims("c", CL1), gap=24),
   panel=st.card("d-1", "ex", "קו רגיל = <b>חלקית</b>: 0 או יותר")
         + st.card("d-2", "ex", "קו כפול = <b>מלאה</b>: לפחות 1")
         + st.card("d-3", "rule", "🔑 קו כפול בצד X + חץ אל Y = כל X קשור ל-Y <b>אחד בדיוק</b>")
         + st.card("d-4", "trap", "⚠️ ״חייב״ ← קו כפול · ״לכל היותר״ ← חץ"))

minmax = Scene("minmax", "הסימון (min,max)", [
    P("יש עוד דרך לכתוב את אותו מידע: זוג מספרים ליד הקו, מינימום ומקסימום."),
    P("וחשוב לדעת איך הקורס קורא אותו: הזוג שליד ישות $X$ סופר **כמה מופעים של $X$** יש לכל מופע בצד השני.", do=show("m-1")),
    P("ליד השחקן כתוב שתיים עד חמש. אז לכל קבוצה יש לפחות שני שחקנים, ולכל היותר חמישה.",
      do=show(*D2.hn("PL"), D2.he("IN", "PL"))),
    P("המינימום שתיים אומר שכל קבוצה חייבת להשתתף בקשר. כמו קו כפול בצד הקבוצה.", do=show("m-2")),
    P("וליד הקבוצה כתוב אפס עד אחת. אז לכל שחקן יש לכל היותר קבוצה אחת, ואולי אף אחת.",
      do=hide(*D2.hn("PL"), D2.he("IN", "PL")) + show(*D2.hn("TM"), D2.he("IN", "TM"))),
    P("המקסימום, אחד, הוא בדיוק מה שהיה אומר חץ אל הקבוצה. והמינימום אפס הוא קו רגיל בצד השחקן.", do=show("m-3")),
    P("המלכודת: לקרוא את הזוג כאילו הוא מתאר את הישות שהוא כתוב לידה. שניים עד חמישה **שחקנים** לכל קבוצה, לא קבוצות לכל שחקן.",
      do=hide(*D2.hn("TM"), D2.he("IN", "TM")) + show("m-t"), hold=0.4),
], stage=D2.svg(),
   panel=st.card("m-1", "rule", "🔑 (a,b) ליד X = לכל מופע בצד השני, <b>בין a ל-b מופעים של X</b>")
         + st.card("m-2", "ex", "מינימום ≥ 1 ← כמו קו כפול בצד השני")
         + st.card("m-3", "ex", "מקסימום 1 ← כמו חץ אל X")
         + st.card("m-t", "trap", "⚠️ (2,5) ליד שחקן = 2 עד 5 <b>שחקנים</b> לכל קבוצה"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: עובדים, חברות סטארט אפ, ותתי סוגים של עובד, ביניהם מנכ״ל. איזה מההיגדים נכון?"),
    P("נתחיל מהקשר מנהל. מהחברה אליו יורד קו כפול.", do=show("x-ring-mgr", "x-ring-co")),
    P("ומהמעוין אל המנכ״ל: קו כפול, ובסופו חץ. שני סימנים על אותו קו, וכל אחד עונה על שאלה אחרת.",
      do=show("x-ring-ceo")),
    P("הקו הכפול בצד המנכ״ל: כל מנכ״ל משתתף במנהל לפחות פעם אחת. כלומר מנהל לפחות חברה אחת.",
      do=show("q-ok-c")),
    P("והחץ אל המנכ״ל: לכל חברה מנכ״ל אחד לכל היותר. ולכן ״לחברה ייתכנו כמה מנהלים״ נופל.",
      do=show("q-x-a", "q-n-a")),
    P("עכשיו הקשר עובד ב. הקו מהעובד אליו רגיל. אז עובד לא חייב לעבוד בחברה.",
      do=hide("x-ring-mgr", "x-ring-co", "x-ring-ceo") + show("x-ring-wk", "x-ring-wl", "q-x-b", "q-n-b")),
    P("ובצד החברה יש חץ. אז כל עובד עובד בחברה אחת לכל היותר, ולא בכמה חברות.",
      do=show("x-ring-ca", "q-x-d", "q-n-d")),
    P("המלכודת כאן: לקרוא את הקו הכפול של המנכ״ל כאילו הוא אומר ״רק אחת״. הוא אומר ״לפחות אחת״.",
      do=hide("x-ring-wk", "x-ring-wl", "x-ring-ca"), hold=0.4),
], stage=EXAM_FIG,
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q["id"] + '</span>' + Q["question"] + '</div></div>'
         + '<div class="er-osm">' + st.options("q", OPTS, notes={"a": "חץ אל מנכ״ל", "b": "קו רגיל",
                                                                  "d": "חץ אל חברה"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: קו רגיל זה השתתפות חלקית, וקו כפול זה מלאה: לפחות פעם אחת.", do=show("r-1")),
    P("קו כפול בצד אחד וחץ אל הצד השני: בדיוק אחד.", do=show("r-2")),
    P("זוג המספרים ליד X סופר כמה X יש לכל מופע בצד השני.", do=show("r-3"),
      say="זוג המספרים ליד ישות סופר כמה מופעים שלה יש לכל מופע בצד השני."),
    P("ואל תתבלבלו: חץ אינו חובה, וקו כפול אינו ״רק אחד״. נתראה בשלב הבא, כשנהפוך קשרים לטבלאות.", do=show("r-4"), hold=0.6),
], stage=w.Diagram("pr", PASS).svg(),
   panel=st.card("r-1", "rule", "🔑 קו כפול = לפחות 1")
         + st.card("r-2", "rule", "🔑 קו כפול + חץ = בדיוק 1")
         + st.card("r-3", "rule", "🔑 (a,b) ליד X = כמה X לכל מופע בצד השני")
         + st.card("r-4", "trap", "⚠️ חץ אינו ״חייב״, קו כפול אינו ״רק אחד״"))

VIDEO = Video("L04", "erd", "השתתפות", [title, double, minmax, exam, recap], bank={"21B-A-Q2": "c"})
