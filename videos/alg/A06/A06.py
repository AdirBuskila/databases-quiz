# -*- coding: utf-8 -*-
"""A06 · חילוק ÷ — video script (build: tools/video/vid.py A06).

Source: alg/levels/A06.js (goal: recognise "for all", build a valid division: the dividend is a pair (who, what), the
divisor's columns are in the dividend under the same name (else ρ), the result = dividend columns minus divisor columns;
filter the divisor). Exam anchor: 26Z-CL-Q15 (listeners of every Jazz album: the ÷ and its definition with ×, − are both
right; key e), which no guided quiz cites. All four algebra options are evaluated on a small plays/album instance.
Avoided on purpose: the A06 quiz data (Students/Enroll/Courses, Takes/Required) and the exam items its quiz cites
(23B-A2-Q14, 21B-A-Q16, 25B-A-Q15), 25S-B-Q15 and 25C-A-Q16 (not used), 26B-A-Q15 (solved in the A09 boss video).
Worked example: Cook(chef, dish) ÷ Sunday's dishes (new). Every expression is evaluated by w_alg.ev and cross-checked
against tools/ralib.js; the ✓/✗ grid comes from w_alg.div_grid, which asserts it agrees with ÷.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_alg as w

# ---------------------------------------------------------------- data (new)
COOK = w.T("Cook", ["chef", "dish"], [["Avi", "pasta"], ["Avi", "soup"], ["Avi", "cake"], ["Bat", "pasta"], ["Bat", "soup"],
                                     ["Gil", "pasta"], ["Gil", "soup"], ["Gil", "cake"], ["Gil", "salad"]],
           pk=["chef", "dish"])
DISH = w.T("Dish", ["dish", "day"], [["pasta", "Sun"], ["soup", "Sun"], ["cake", "Sun"], ["salad", "Mon"]], pk=["dish"])
DB = [COOK, DISH]
DIVISOR = 'Π_{dish} σ_{day="Sun"} (Dish)'
E_DIV = "Cook ÷ " + DIVISOR
R_DIV = w.ev(E_DIV, DB)
assert R_DIV.values() == {"Avi", "Gil"} and R_DIV.names == ["chef"]
R_SUN = w.ev(DIVISOR, DB)
assert R_SUN.values() == {"pasta", "soup", "cake"}
GRID, INFO = w.div_grid("g", "Cook", DIVISOR, DB, fs=30, cand_head="chef")
assert [(x[0], ok) for x, _, ok in INFO] == [("Avi", True), ("Bat", False), ("Gil", True)]
assert INFO[1][1] == [True, True, False]                              # Bat: no cake
assert w.ev("Cook ÷ Π_{dish} (Dish)", DB).values() == {"Gil"}         # unfiltered divisor: all four dishes
assert w.invalid("Π_{chef} (Cook) ÷ " + DIVISOR, DB)                   # the divisor's column (dish) is not in a chef-only dividend
MENU = w.T("Menu", ["item", "day"], DISH["rows"])
assert w.invalid('Cook ÷ Π_{item} σ_{day="Sun"} (Menu)', DB + [MENU])   # divisor column not in the dividend
E_RHO = 'Cook ÷ ρ_{M(dish)} (Π_{item} σ_{day="Sun"} (Menu))'
assert w.same(w.ev(E_RHO, DB + [MENU]), R_DIV)
G_ROWS = list(range(len(INFO)))

# ---------------------------------------------------------------- exam 26Z-CL-Q15
Q = BANK["26Z-CL-Q15"]
assert Q["correctId"] == "e" and [o["id"] for o in Q["options"]] == list("abcde")
OPT = {o["id"]: o["value"] for o in Q["options"] if o["type"] == "algebra"}
assert set(OPT) == set("abcd")
ALBUM = w.T("album", ["album_id", "title", "artist_id", "genre"],
            [[10, "Kind of Blue", 7, "Jazz"], [11, "Blue Train", 8, "Jazz"], [12, "Abbey Road", 9, "Rock"]], pk=["album_id"])
PLAYS = w.T("plays", ["listener_id", "album_id"],
            [[1, 10], [1, 11], [1, 12], [2, 10], [2, 12], [3, 10], [3, 11], [4, 10]], pk=["listener_id", "album_id"])
QDB = [ALBUM, PLAYS]
RES = {k: w.ev(v, QDB).values() for k, v in OPT.items()}
assert RES == {"a": {1, 3}, "b": {1, 2, 3, 4}, "c": {1, 3}, "d": {3, 4}}
QGRID, QINFO = w.div_grid("qg", "plays", 'Π_{album_id}(σ_{genre = "Jazz"}(album))', QDB, fs=26)
STEPS = [("T1", 'Π_{listener_id}(plays) × Π_{album_id}(σ_{genre = "Jazz"}(album))'), ("T2", "T1 − plays"),
         ("T3", "Π_{listener_id}(T2)"), ("R", "Π_{listener_id}(plays) − T3")]
SRC = "\n".join(f"{n} ← {e}" for n, e in STEPS)
assert w.ev(SRC, QDB).values() == {1, 3}
T2 = w.ev("\n".join(f"{n} ← {e}" for n, e in STEPS[:2]), QDB)
assert set(T2.rows) == {(2, 11), (4, 11)}                             # the missing (listener, Jazz album) pairs
assert len(w.ev("\n".join(f"{n} ← {e}" for n, e in STEPS[:1]), QDB)) == 8
assert "Π_{listener_id}(plays) − Π_{listener_id}((Π_{listener_id}(plays) × Π_{album_id}" in OPT["c"]
assert Q["options"][4]["value"] == "תשובות {opt:a} ו-{opt:c} נכונות."
E_TXT = "התשובה עם החילוק והתשובה עם ההגדרה המפורשת שלו נכונות."      # options are never named by letter
OPTS = [(o["id"], w.inl(o["value"]) if o["type"] == "algebra" else E_TXT) for o in Q["options"]]

N = w.crosscheck()
assert N >= 14

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד את החילוק: הפעולה שעונה על שאלות של \"לכל\"."),
    P("נראה איך בונים חילוק תקין, ואיך בודקים אותו שורה אחרי שורה."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">A06 · אלגברה רלציונית</div><h1>חילוק ÷</h1>'
         '<p>לזהות שאלת "לכל", לבנות חילוק תקין (מחולק, מחלק, סכמות) ולקרוא חילוק בשפה טבעית.</p>', layout="title")

idea = Scene("idea", "מחולק ומחלק", [
    P("טבלת טבחים: כל שורה אומרת שטבח יודע להכין מנה מסוימת.", do=show("i-c")),
    P("ומה בתפריט של יום ראשון? פסטה, מרק ועוגה.", do=show("i-d", "i-s")),
    P("מי יודע להכין **את כל** המנות של יום ראשון? זו שאלה של \"לכל\", והתשובה היא חילוק.", do=show("i-e")),
    P("משמאל, ה**מחולק**: זוגות של מי ומה. כאן טבח ומנה.", do=show("i-e-m1")),
    P("מימין, ה**מחלק**: הקבוצה שצריך לכסות. כאן המנות של יום ראשון.", do=hide("i-e-m1") + show("i-e-m2")),
    P("והתוצאה: העמודות של המחולק, פחות העמודות של המחלק. נשאר הטבח.", do=hide("i-e-m2") + show("i-c1"), hold=0.3),
], stage=w.stack(w.alg("i-e", E_DIV, size=36, marks=[("i-e-m1", "Cook"), ("i-e-m2", DIVISOR)]),
                 w.row(w.table("i-c", COOK, hidden=True, fs=24), w.table("i-d", DISH, hidden=True, fs=24),
                       w.table("i-s", R_SUN, title="Sun", hidden=True, fs=24), gap=46), gap=26),
   panel=st.card("i-c1", "rule", "🔑 עמודות התוצאה = מחולק $-$ מחלק"))

check = Scene("check", "בודקים כל מועמד", [
    P("איך מחשבים? לכל טבח שמופיע במחולק, בודקים כל מנה במחלק.", do=show("g")),
    P("אבי: פסטה, מרק, עוגה. שלושתן אצלו. אבי בתוצאה.", do=show("g-c0-0", "g-c0-1", "g-c0-2", "g-v0"),
      say="אַבִי: פסטה, מרק, עוגה. שלושתן אצלו. אַבִי בתוצאה."),
    P("בת: פסטה ומרק כן, אבל עוגה אין לה. מנה אחת חסרה, ובת נפסלת.", do=show("g-c1-0", "g-c1-1", "g-c1-2", "g-v1"),
      say="בַּת: פסטה ומרק כן, אבל עוגה אין לה. מנה אחת חסרה, ובַּת נפסלת."),
    P("גיל: כל השלוש, ועוד סלט. מנה מיותרת לא מפריעה. גיל בתוצאה.", do=show("g-c2-0", "g-c2-1", "g-c2-2", "g-v2"),
      say="גִיל: כל השלוש, ועוד סלט. מנה מיותרת לא מפריעה. גִיל בתוצאה."),
    P("התוצאה: אבי וגיל.", do=show("k-r"), say="התוצאה: אַבִי וגִיל."),
    P("ואם לא מסננים את המחלק, ושואלים על כל המנות כולן? רק גיל יודע גם סלט.", do=show("k-c1"),
      say="ואם לא מסננים את המחלק, ושואלים על כל המנות כולן? רק גִיל יודע גם סלט.", hold=0.4),
], stage=w.row(w.stack(w.alg(None, E_DIV, size=30, hidden=False), GRID.replace('class="ra-tw"', 'class="ra-tw h"', 1), gap=30),
               w.table("k-r", R_DIV, title="", hidden=True, fs=30), gap=50, align="center"),
   panel=st.card("k-c1", "trap", "⚠️ בלי סינון המחלק: \"כל המנות בכלל\""))

rules = Scene("rules", "בדיקות תקינות", [
    P("שלוש בדיקות פוסלות את רוב המסיחים, עוד לפני שמסתכלים על נתונים."),
    P("אחת: המחולק חייב להיות **זוג**, מי ומה. חילוק של עמודת הטבח בלבד לא תקין: עמודת המנה של המחלק לא נמצאת בו.",
      do=show("u-1")),
    P("שתיים: עמודות המחלק חייבות להופיע במחולק, ב**אותו שם**.", do=show("u-2")),
    P("נניח שבטבלת התפריט המנה נקראת פריט. אז צריך שינוי שם, $\\rho$, כדי שהשם יתאים.", do=show("u-3")),
    P("שלוש: מספר העמודות בתוצאה הוא מחולק פחות מחלק. זה נקבע מהסכמות לבד.", do=show("u-c1")),
    P("ועוד הבדל חשוב: חיתוך עונה על \"גם וגם\" של שני ערכים שכתובים מראש. חילוק עונה על \"לכל\" של קבוצה.",
      do=show("u-c2"), hold=0.4),
], stage=w.stack(w.row(w.alg(None, "Π_{chef} (Cook) ÷ " + DIVISOR, size=28, hidden=False),
                       w.note(None, "✗", cls="bad", hidden=False), gap=20, align="center", id_="u-1", hidden=True),
                 w.row(w.alg(None, 'Cook ÷ Π_{item} σ_{day="Sun"} (Menu)', size=28, hidden=False),
                       w.note(None, "✗", cls="bad", hidden=False), gap=20, align="center", id_="u-2", hidden=True),
                 w.row(w.alg(None, E_RHO, size=28, hidden=False),
                       w.note(None, "✓", cls="ok", hidden=False), gap=20, align="center", id_="u-3", hidden=True), gap=40),
   panel=st.card("u-c1", "rule", "🔑 מחולק = זוג · מחלק מוכל בו בשם (אחרת $\\rho$)")
         + st.card("u-c2", "trap", "⚠️ חיתוך אינו חילוק"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: מאזינים ואלבומים. מי האזין ל**כל** האלבומים מז'אנר ג'ז?", do=show("x-t")),
    P("״כל״ אומר חילוק. המחולק כאן הוא כל טבלת ההאזנות: מאזין ואלבום, בדיוק זוג.", do=show("q-ok-a")),
    P("על הנתונים: שני אלבומי ג'ז. המאזינים אחת ושלוש שמעו את שניהם.", do=show("qg")
      + show(*[f"qg-c{i}-{j}" for i in range(4) for j in range(2)]) + show(*[f"qg-v{i}" for i in range(4)])),
    P("האפשרות הארוכה היא **ההגדרה** של חילוק. קודם כל זוג אפשרי: כל מאזין עם כל אלבום ג'ז. שמונה זוגות.",
      do=hide("qg") + show("x-st", "x-st-l0")),
    P("מחסירים את מה שבאמת קרה. נשארים הזוגות ה**חסרים**: שתיים ואחת עשרה, ארבע ואחת עשרה.", do=show("x-st-l1")),
    P("מי שחסר לו משהו נמחק מכל המאזינים: נשארים אחת ושלוש. בדיוק כמו החילוק.", do=show("x-st-l2", "x-st-l3", "q-ok-c")),
    P("לכן שתיהן נכונות, והתשובה היא האפשרות שאומרת ששתיהן נכונות.", do=show("q-ok-e")),
    P("הצירוף עם אלבומי ג'ז מחזיר מי ששמע ג'ז **אחד לפחות**: כל הארבעה.", do=show("q-x-b", "q-n-b")),
    P("וההפרש עם ״לא ג'ז״ מחזיר מי ששמע **רק** ג'ז: שלוש וארבע. ארבע שמע רק חלק מהם.", do=show("q-x-d", "q-n-d"),
      hold=0.6),
], stage=w.stack(
    f'<div class="qstem ra-qs"><span class="qid">{Q["id"]}</span>המזהים של המאזינים שהאזינו ל<b>כל</b> האלבומים מז׳אנר Jazz?</div>',
    f'<div class="ra-opts" style="width:100%">{st.options("q", OPTS, notes={"b": "לפחות אחד", "d": "רק ג׳ז"})}</div>',
    gap=10),
   panel=w.stack(w.table("x-t", PLAYS, hidden=True, fs=22),
                 w.swap(QGRID.replace('class="ra-tw"', 'class="ra-tw h"', 1),
                        w.steps("x-st", STEPS, size=21).replace('class="ra-steps"', 'class="ra-steps h"', 1), h=230),
                 gap=16))

recap = Scene("recap", "סיכום", [
    P("לסיכום: \"לכל\" זה חילוק. המחולק הוא זוג של מי ומה, והמחלק הוא הקבוצה שצריך לכסות.", do=show("r-1")),
    P("מסננים את המחלק לקבוצה שנדרשת, ואם השם שונה, משנים אותו עם $\\rho$.", do=show("r-2")),
    P("התוצאה: כל מי שמופיע עם **כל** ערכי המחלק. מה שמיותר לא מפריע. נתראה ברמה הבאה.", do=show("r-3"), hold=0.6),
], stage=w.stack(w.alg(None, E_DIV, size=36, hidden=False)),
   panel=st.card("r-1", "rule", "🔑 \"לכל\" = $\\div$")
         + st.card("r-2", "rule", "🔑 מסננים את המחלק · $\\rho$ כשהשם שונה")
         + st.card("r-3", "ex", "עמודות התוצאה = מחולק $-$ מחלק"))

VIDEO = Video("A06", "alg", "חילוק ÷", [title, idea, check, rules, exam, recap], bank={"26Z-CL-Q15": "e"})
