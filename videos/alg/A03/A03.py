# -*- coding: utf-8 -*-
"""A03 · ρ וצירוף עצמי — video script (build: tools/video/vid.py A03).

Source: alg/levels/A03.js (goal: two named copies of one table with ρ; "more than once" = same key, different value;
a self-join proves that a pair exists, it cannot say "only" or "for each" without a difference). Exam anchor: 23B-A-Q16
(Score self-join; key e, none of the readings is exact), which no guided quiz cites (the lesson mentions it). The query
and the four readings are evaluated on a four-row Score instance found by search, on which the query returns a set
different from each reading.
Avoided on purpose: the A03 quiz data (Person, Vote, Represent) and 21B-A-Q14 / 23B-A2-Q16 (A03 quiz items).
Worked example: Play(player, sport) (new). Every expression is evaluated by w_alg.ev and cross-checked with ralib.js.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_alg as w

# ---------------------------------------------------------------- data (new)
PLAY = w.T("Play", ["player", "sport"], [["Lior", "tennis"], ["Lior", "chess"], ["Maya", "chess"], ["Noam", "golf"]],
           pk=["player", "sport"])
DB = [PLAY]
PROD = "ρ_{P1} Play × ρ_{P2} Play"
R_X = w.ev(PROD, DB)
assert len(R_X) == 16 and len(R_X.cols) == 4
SAMEP = [i for i, r in enumerate(R_X.rows) if r[0] == r[2]]
assert SAMEP == [0, 1, 4, 5, 10, 15]
TWO = [i for i in SAMEP if R_X.rows[i][1] != R_X.rows[i][3]]
assert TWO == [1, 4]
E_MORE = "Π_{P1.player} σ_{P1.player = P2.player ∧ P1.sport != P2.sport} (ρ_{P1} Play × ρ_{P2} Play)"
R_MORE = w.ev(E_MORE, DB)
assert R_MORE.values() == {"Lior"}
E_NOT = "Π_{P1.player} σ_{P1.player = P2.player} (ρ_{P1} Play × ρ_{P2} Play)"
assert w.ev(E_NOT, DB).values() == {"Lior", "Maya", "Noam"}          # without ≠ each row pairs with itself
E_ONE = "Π_{player} (Play) − " + E_MORE
R_ONE = w.ev(E_ONE, DB)
assert R_ONE.values() == {"Maya", "Noam"}
assert w.invalid("σ_{player = player} (Play × Play)", DB)              # no ρ: which copy?

# ---------------------------------------------------------------- exam 23B-A-Q16
Q = BANK["23B-A-Q16"]
assert Q["correctId"] == "e" and [o["id"] for o in Q["options"]] == list("abcde")
SRC = Q["question"].split("$$")[1]
assert SRC.startswith("Π_{S1.from_country}") and " X " in SRC
SCORE = w.T("Score", ["from_country", "to_country", "num_points", "year"],
            [["ES", "IL", 12, 2023], ["IL", "ES", 10, 2023], ["IL", "IT", 8, 2023], ["IT", "ES", 6, 2023]],
            pk=["from_country", "to_country", "year"])
QDB = [SCORE]
R_Q = w.ev(SRC, QDB)
GOT = R_Q.values()
assert GOT == {"ES", "IL", "IT"}
E = [(r[0], r[1]) for r in SCORE["rows"]]
FROM = {a for a, _ in E}
out_ = lambda x: {b for a, b in E if a == x}
in_ = lambda x: {a for a, b in E if b == x}
READ = {"a": {x for x in FROM if not (out_(x) & in_(x))},          # voted only to countries that did not vote for it
        "b": {x for x in FROM if out_(x) & in_(x)},                # voted to at least one country that voted for it
        "c": {x for x in FROM if in_(x) <= out_(x)},               # voted to every country that voted for it
        "d": {x for x in FROM if len(out_(x) & in_(x)) > 2}}       # voted to more than two of them
assert READ == {"a": {"IT"}, "b": {"ES", "IL"}, "c": {"IL"}, "d": set()}
assert all(v != GOT for v in READ.values())
# the witnesses shown on screen: IT voted to ES (S1), IL voted to IT (S2), ES != IL; ES voted to IL (S1), IT voted to ES (S2)
assert ("IT", "ES") in E and ("IL", "IT") in E and ("ES", "IL") in E
OPTS = [(o["id"], o["value"].replace("שמות המדינות הבאות: ", "")) for o in Q["options"]]

N = w.crosscheck()
assert N >= 6

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נשווה שורות של **אותה** טבלה זו לזו, בעזרת שינוי שם וצירוף עצמי."),
    P("נבטא \"יותר מפעם אחת\", ונראה מה צירוף עצמי לא יכול לבטא."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">A03 · אלגברה רלציונית</div><h1>ρ וצירוף עצמי</h1>'
         '<p>לתת שמות לשני עותקים של אותה טבלה עם ρ, ולבטא "יותר מפעם אחת", "מישהו מבוגר ממני" וזוגות.</p>',
   layout="title")

idea = Scene("idea", "למה שני עותקים", [
    P("טבלה של שחקנים וענפי ספורט. שחקן שמשחק בכמה ענפים מופיע בכמה שורות.", do=show("i-t")),
    P("מי משחק ביותר מענף אחד? בשביל זה צריך להשוות **שתי שורות** של אותה טבלה.", do=show("i-t-hl0", "i-t-hl1")),
    P("אבל בחירה בודקת שורה אחת בכל פעם. לכן לוקחים שני עותקים של הטבלה, ומצמידים אותם במכפלה."),
    P("כדי להבדיל ביניהם, נותנים לכל עותק שם משלו עם $\\rho$, שינוי שם.", do=show("i-e")),
    P("עכשיו לכל עמודה יש שם מלא: השחקן של העותק הראשון, והשחקן של העותק השני.", do=show("i-c1")),
    P("בלי שינוי שם, התנאי ״שחקן שווה לשחקן״ לא תקין: אי אפשר לדעת לאיזה עותק כל אחד שייך.", do=show("i-c2"),
      hold=0.3),
], stage=w.stack(w.table("i-t", PLAY, hidden=True, fs=32), w.alg("i-e", PROD, size=40), gap=50),
   panel=st.card("i-c1", "ex", "<span class=\"ra-ltr\">P1.player</span> מול <span class=\"ra-ltr\">P2.player</span>")
         + st.card("i-c2", "trap", "⚠️ בלי $\\rho$: <span class=\"ra-ltr\">player = player</span> לא תקין"))

self_ = Scene("self", "יותר מפעם אחת", [
    P("הנה המכפלה: ארבע כפול ארבע, שש עשרה שורות. כל זוג שורות, כולל שורה עם עצמה.", do=show("s-t")),
    P("תנאי ראשון: אותו שחקן בשני העותקים. נשארות שש שורות.", do=show("s-e1") + show(*w.ids("s-t", "hl", SAMEP))
      + show(*w.ids("s-t", "x", [i for i in range(16) if i not in SAMEP]))),
    P("אבל ארבע מהן הן שורה מול עצמה. למשל ליאור וטניס, מול ליאור וטניס.", do=show("s-t-c0-1", "s-t-c0-3")),
    P("לכן תנאי שני: הענפים **שונים**. נשארות שתי שורות, שתיהן של ליאור.",
      do=hide("s-e1", "s-t-c0-1", "s-t-c0-3") + show("s-e2") + show(*w.ids("s-t", "x", [i for i in SAMEP if i not in TWO]))),
    P("מקרינים על השחקן של העותק הראשון, ומקבלים: ליאור. רק הוא משחק ביותר מענף אחד.", do=show("s-r")),
    P("והכלל: ״יותר מפעם אחת״ זה אותו מפתח, וערך **שונה** במה שסופרים.", do=show("s-c1")),
    P("בלי תנאי השוני, כל שורה מתאימה לעצמה, וכל השחקנים עוברים.", do=show("s-c2"), hold=0.4),
], stage=w.stack(w.swap(w.alg("s-e1", "σ_{P1.player = P2.player} (" + PROD + ")", size=30),
                        w.alg("s-e2", "σ_{P1.player = P2.player ∧ P1.sport != P2.sport} (" + PROD + ")", size=30), h=52),
                 w.row(w.table("s-t", R_X, title="", hidden=True, fs=20, qual=True),
                       w.table("s-r", R_MORE, title="Π_{P1.player}", hidden=True, fs=26), gap=50), gap=10),
   panel=st.card("s-c1", "rule", "🔑 יותר מפעם אחת: אותו מפתח, ערך <b>שונה</b>")
         + st.card("s-c2", "trap", "⚠️ בלי $\\neq$ כל שורה מתאימה לעצמה"))

only = Scene("only", "פעם אחת בדיוק", [
    P("ומי משחק בענף **אחד בלבד**? כאן צירוף עצמי לבד לא מספיק."),
    P("צירוף עצמי מוכיח שקיים זוג מתאים. הוא לא יכול להבטיח שאין זוג כזה.", do=show("o-c1")),
    P("לכן מתחילים מכל השחקנים: ליאור, מאיה ונועם.", do=show("o-all")),
    P("ומוחקים מהם את מי שכבר מצאנו, זה שמשחק ביותר מענף אחד: ליאור.", do=show("o-more", "o-all-x0")),
    P("נשארים מאיה ונועם: כל אחד מהם משחק בענף אחד בלבד.", do=show("o-r")),
    P("״רק״, ״בדיוק אחד״, ״לכל״: כל אלה צריכים **הפרש**. נזכור את זה בשאלת המבחן.", do=show("o-c2"), hold=0.4),
], stage=w.stack(w.row(w.table("o-all", w.ev("Π_{player} (Play)", DB), title="כל השחקנים", hidden=True, fs=30),
                       w.table("o-more", R_MORE, title="יותר מענף", hidden=True, fs=30),
                       w.table("o-r", R_ONE, title="ענף אחד", hidden=True, fs=30), gap=70), gap=40),
   panel=st.card("o-c1", "rule", "🔑 צירוף עצמי מוכיח <b>שקיים</b> זוג")
         + st.card("o-c2", "trap", "⚠️ \"רק\" / \"בדיוק\" / \"לכל\": צריך הפרש"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: תחרות שירים. כל שורה אומרת שמדינה אחת נתנה נקודות למדינה אחרת.", do=show("x-t")),
    P("שני עותקים: בעותק הראשון מדינה נותנת נקודות. בעותק השני מדינה כלשהי נותנת לה.", do=show("x-e")),
    P("והתנאי האחרון: המדינה שהיא נתנה לה שונה מהמדינה שנתנה לה. מה זה מחזיר?"),
    P("כל מדינה שיש לה זוג כזה: היא הצביעה למישהו, ומישהו **אחר** הצביע לה. אין כאן שום הפרש.", do=show("x-c1")),
    P("נבדוק על ארבע שורות. איטליה נתנה לספרד, וישראל נתנה לאיטליה. ספרד שונה מישראל, אז איטליה בתוצאה.",
      do=show("x-t-t3", "x-t-t2")),
    P("ספרד נתנה לישראל, ואיטליה נתנה לספרד. גם ספרד בתוצאה, וכך גם ישראל.",
      do=hide("x-t-t3", "x-t-t2") + show("x-t-t0", "x-t-t3b", "x-r")),
    P("הקריאה ״רק למדינות שלא הצביעו לה״ נופלת: ספרד הצביעה לישראל, שהצביעה לה.", do=show("q-x-a", "q-n-a")),
    P("״לפחות אחת שהצביעה לה״ נופלת: איטליה בתוצאה, אבל ספרד, שאיטליה הצביעה לה, לא הצביעה לאיטליה.",
      do=show("q-x-b", "q-n-b")),
    P("״לכל אחת שהצביעה לה״ נופלת: ספרד לא החזירה לאיטליה. ו״יותר משתיים״ ריקה כאן.",
      do=show("q-x-c", "q-n-c", "q-x-d", "q-n-d")),
    P("אז אף קריאה לא מדויקת, והתשובה: אף אחת מהתשובות.", do=show("q-ok-e"), hold=0.6),
], stage=w.stack(w.alg("x-e", SRC.replace(" X ", " × "), size=24),
                 w.row(w.table("x-t", SCORE, hidden=True, fs=26,
                               tags={0: "S1", 2: "S2", 3: ["S1", "S2"]}, tagw=60),
                       w.table("x-r", R_Q, title="", hidden=True, fs=26), gap=40), gap=30),
   panel=f'<div class="qstem ra-qs"><span class="qid">{Q["id"]}</span>מה מחזירה השאילתה? (שמות המדינות הבאות)</div>'
         + f'<div class="ra-opts">{st.options("q", OPTS, notes={"a": "ספרד", "b": "איטליה", "c": "ספרד", "d": "ריק"})}</div>'
         + st.card("x-c1", "rule", "🔑 רק \"קיים זוג\", בלי הפרש"))

recap = Scene("recap", "סיכום", [
    P("לסיכום: כדי להשוות שורות של אותה טבלה, לוקחים שני עותקים עם שינוי שם, ומכפלה.", do=show("r-1")),
    P("יותר מפעם אחת: אותו מפתח, וערך שונה. בלי תנאי השוני, כל שורה מתאימה לעצמה.", do=show("r-2")),
    P("וצירוף עצמי רק מוכיח שקיים זוג. ״רק״, ״בדיוק״ ו״לכל״ צריכים הפרש. נתראה ברמה הבאה.", do=show("r-3"),
      hold=0.6),
], stage=w.stack(w.alg(None, E_MORE, size=26, hidden=False), 
                 gap=40),
   panel=st.card("r-1", "rule", "🔑 $\\rho$ + מכפלה = שני עותקים")
         + st.card("r-2", "rule", "🔑 אותו מפתח, ערך שונה")
         + st.card("r-3", "trap", "⚠️ \"רק\" / \"לכל\": הפרש"))

VIDEO = Video("A03", "alg", "ρ וצירוף עצמי", [title, idea, self_, only, exam, recap], bank={"23B-A-Q16": "e"})
