# -*- coding: utf-8 -*-
"""A04 · פעולות קבוצה: ∪ ∩ − — video script (build: tools/video/vid.py A04).

Source: alg/levels/A04.js (goal: "both" = ∩, "or" = ∪, "never" / "only" = −, on union-compatible relations; σ checks one
row at a time). Exam anchor: 25S-B-Q16 (packages sent both express and not express: an ∩ of two projections; key a),
which no guided quiz cites. The query and the "only express" reading are evaluated on a small delivery instance.
Avoided on purpose: the A04 quiz data (Students/Enroll/Courses) and 21S-B-Q14 / 21S-B-Q19 / 23B-A2-Q15 (cited by A04's
quiz), and 23B-A2-Q13 (its options are those of the A09 boss item on piano ∩ violin). Worked example: Member/Visit
(gym branches, new). Every expression is evaluated by w_alg.ev and cross-checked against tools/ralib.js.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_alg as w

# ---------------------------------------------------------------- data (new)
MEMBER = w.T("Member", ["mid", "name"], [[1, "Rina"], [2, "Omer"], [3, "Shir"], [4, "Tal"]], pk=["mid"])
VISIT = w.T("Visit", ["mid", "branch"], [[1, "North"], [1, "South"], [2, "North"], [3, "South"], [3, "East"]],
            pk=["mid", "branch"])
DB = [MEMBER, VISIT]
EN = 'Π_{mid} σ_{branch="North"} (Visit)'
ES = 'Π_{mid} σ_{branch="South"} (Visit)'
RN, RS = w.ev(EN, DB), w.ev(ES, DB)
assert RN.values() == {1, 2} and RS.values() == {1, 3}
RI = w.ev(f"{EN} ∩ {ES}", DB)
RU = w.ev(f"{EN} ∪ {ES}", DB)
RD1 = w.ev(f"{EN} − {ES}", DB)
RD2 = w.ev(f"{ES} − {EN}", DB)
assert (RI.values(), RU.values(), RD1.values(), RD2.values()) == ({1}, {1, 2, 3}, {2}, {3})
VN = w.row_index(VISIT, lambda r: r[1] == "North")
VS = w.row_index(VISIT, lambda r: r[1] == "South")
assert VN == [0, 2] and VS == [1, 3]

E_AND = 'Π_{mid} σ_{branch="North" ∧ branch="South"} (Visit)'
assert len(w.ev(E_AND, DB)) == 0                                    # one row has one branch

E_NEVER = "Π_{mid} (Member) − Π_{mid} (Visit)"
R_NEVER = w.ev(E_NEVER, DB)
assert R_NEVER.values() == {4}
assert len(w.ev("Π_{mid} (Visit) − Π_{mid} (Member)", DB)) == 0      # reversed: empty
assert w.invalid("Π_{mid, name} (Member) − Π_{mid} (Visit)", DB)     # 2 columns vs 1
R_ALL, R_V = w.ev("Π_{mid} (Member)", DB), w.ev("Π_{mid} (Visit)", DB)

E_ONLY = 'Π_{mid} σ_{branch="North"} (Visit) − Π_{mid} σ_{branch != "North"} (Visit)'
R_ONLY = w.ev(E_ONLY, DB)
R_NOTN = w.ev('Π_{mid} σ_{branch != "North"} (Visit)', DB)
assert R_ONLY.values() == {2} and R_NOTN.values() == {1, 3}
assert w.ev('Π_{mid} σ_{branch != "North"} (Visit)', DB).values() != w.ev(
    'Π_{mid} (Member) − ' + EN, DB).values()                          # != is not "never": Rina visited North too

# ---------------------------------------------------------------- exam 25S-B-Q16
Q = BANK["25S-B-Q16"]
assert Q["correctId"] == "a" and [o["id"] for o in Q["options"]] == list("abcde")
SRC = Q["question"].split("$$")[1]
assert "∩" in SRC and "is_express=True" in SRC and "is_express=False" in SRC
DELIV = w.T("delivery", ["pkg_id", "courier", "is_express"],
            [["p1", "Moshe", True], ["p1", "Rina", False], ["p2", "Rina", True], ["p3", "Moshe", False]])
QDB = [DELIV]
R_Q = w.ev(SRC, QDB)
assert R_Q.values() == {"p1"}
L, Rr = SRC.split(" ∩ ")
R_L, R_R = w.ev(L, QDB), w.ev(Rr, QDB)
assert R_L.values() == {"p1", "p2"} and R_R.values() == {"p1", "p3"}
R_ONLYX = w.ev(f"{L} − {Rr}", QDB)                                  # what "only express" would need
assert R_ONLYX.values() == {"p2"} and not w.same(R_ONLYX, R_Q)
assert len(R_L.cols) == len(R_R.cols) == 1                          # compatible: the query is valid
OPTS = [(o["id"], o["value"]) for o in Q["options"]]

N = w.crosscheck()
assert N >= 15

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד את שלוש פעולות הקבוצה: איחוד, חיתוך והפרש."),
    P("נראה איך הן מבטאות \"גם וגם\", \"או\", \"אף פעם לא\" ו\"רק\"."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">A04 · אלגברה רלציונית</div><h1>פעולות קבוצה: ∪ ∩ −</h1>'
         '<p>לבטא "גם וגם", "או", "אף פעם לא" ו"רק" בעזרת חיתוך, איחוד והפרש.</p>', layout="title")

ops = Scene("ops", "∩ ∪ −", [
    P("חדר כושר עם כמה סניפים. כל שורה: מנוי, וסניף שבו התאמן.", do=show("o-v")),
    P("מי התאמן בסניף הצפוני? אחת ושתיים.", do=show("o-n") + show(*w.ids("o-v", "hl", VN))),
    P("ומי בסניף הדרומי? אחת ושלוש.", do=hide(*w.ids("o-v", "hl", VN)) + show("o-s") + show(*w.ids("o-v", "hl", VS))),
    P("עכשיו יש שתי קבוצות של מזהים. החיתוך: מי שנמצא **בשתיהן**. רק אחת: רינה התאמנה גם בצפון וגם בדרום.",
      do=hide(*w.ids("o-v", "hl", VS)) + show("o-i")),
    P("האיחוד: מי שנמצא באחת מהן **לפחות**. אחת, שתיים ושלוש.", do=show("o-u")),
    P("וההפרש: מי שנמצא בראשונה, ו**לא** בשנייה. צפון פחות דרום: רק שתיים.", do=show("o-d1")),
    P("והסדר קובע. דרום פחות צפון זו שאלה אחרת: רק שלוש.", do=show("o-d2", "o-c1")),
    P("פעולות קבוצה עובדות רק על יחסים **תואמים**: אותו מספר עמודות, מאותו סוג. השמות לא חייבים להיות זהים.",
      do=show("o-c2"), hold=0.3),
], stage=w.stack(
    w.row(w.table("o-v", VISIT, hidden=True, fs=26), w.table("o-n", RN, title="North", hidden=True, fs=26),
          w.table("o-s", RS, title="South", hidden=True, fs=26), gap=50),
    w.row(w.table("o-i", RI, title="N ∩ S", hidden=True, fs=26), w.table("o-u", RU, title="N ∪ S", hidden=True, fs=26),
          w.table("o-d1", RD1, title="N − S", hidden=True, fs=26), w.table("o-d2", RD2, title="S − N", hidden=True, fs=26),
          gap=50), gap=34),
   panel=st.card("o-c1", "trap", "⚠️ בהפרש הסדר קובע")
         + st.card("o-c2", "rule", "🔑 פעולות קבוצה רק בין יחסים <b>תואמים</b>: אותו מספר עמודות"))

row1 = Scene("row1", "שורה אחת בכל פעם", [
    P("למה צריך חיתוך? אולי פשוט נבחר שורות שבהן הסניף צפוני **וגם** דרומי?", do=show("a-e")),
    P("הבחירה בודקת **שורה אחת** בכל פעם. ולכל שורה יש סניף אחד בלבד.",
      do=show(*w.ids("a-t", "x", range(5)))),
    P("אין שורה שבה הסניף הוא גם צפון וגם דרום. התוצאה תמיד ריקה.", do=show("a-r")),
    P("רינה מופיעה בשתי שורות **שונות**. ״גם וגם״ על פני שתי שורות זה חיתוך של שתי תוצאות.", do=show("a-c1"),
      hold=0.4),
], stage=w.stack(w.alg("a-e", E_AND, size=34), w.table("a-t", VISIT, fs=28),
                 w.note("a-r", "∅ תוצאה ריקה", cls="bad"), gap=30),
   panel=st.card("a-c1", "rule", "🔑 \"גם וגם\" על שתי שורות = $\\cap$"))

never = Scene("never", "אף פעם לא", [
    P("ומי **אף פעם** לא התאמן? כאן הפרש: כל המנויים, פחות מי שמופיע בטבלת האימונים.", do=show("n-e")),
    P("כל המנויים: אחת עד ארבע. מי שהתאמן: אחת, שתיים ושלוש.", do=show("n-a", "n-v")),
    P("נשאר ארבע: טל, שנרשם ולא הגיע אף פעם.", do=show("n-a-x0", "n-a-x1", "n-a-x2", "n-r")),
    P("הפכו את הסדר, ותקבלו ריק: אין מי שהתאמן ואינו מנוי.", do=show("n-c1")),
    P("ועוד מלכודת: היטל על מזהה ושם, פחות היטל על מזהה בלבד. שתי עמודות מול אחת: הביטוי לא תקין.",
      do=show("n-c2"), hold=0.4),
], stage=w.stack(w.alg("n-e", E_NEVER, size=38),
                 w.row(w.table("n-a", R_ALL, title="Π_{mid} (Member)", hidden=True, fs=28),
                       w.table("n-v", R_V, title="Π_{mid} (Visit)", hidden=True, fs=28),
                       w.table("n-r", R_NEVER, title="", hidden=True, fs=28), gap=70), gap=36),
   panel=st.card("n-c1", "trap", "⚠️ הסדר הפוך = ריק")
         + st.card("n-c2", "trap", "⚠️ <span class=\"ra-ltr\">Π<sub>mid, name</sub> − Π<sub>mid</sub></span>: לא תקין"))

only = Scene("only", "רק", [
    P("ו״רק״? מי התאמן **רק** בסניף הצפוני?"),
    P("״רק״ נשמע חיובי, אבל הוא הפרש: מי שהתאמן בצפון, פחות מי שהתאמן אי פעם בסניף אחר.", do=show("y-e")),
    P("בצפון: אחת ושתיים. בסניף שאינו צפון: אחת ושלוש.", do=show("y-n", "y-o")),
    P("רינה, מספר אחת, התאמנה גם בדרום, ולכן נמחקת. נשאר עומר.", do=show("y-n-x0", "y-r")),
    P("שימו לב: הבחירה עם ״שונה מצפון״ לבדה מחזירה את מי שהתאמן **לפחות פעם אחת** במקום אחר.", do=show("y-c1")),
    P("זו לא ״אף פעם לא בצפון״: רינה עוברת אותה, למרות שהתאמנה בצפון.", hold=0.4),
], stage=w.stack(w.alg("y-e", E_ONLY, size=30),
                 w.row(w.table("y-n", RN, title="North", hidden=True, fs=28),
                       w.table("y-o", R_NOTN, title="branch ≠ North", hidden=True, fs=28),
                       w.table("y-r", R_ONLY, title="", hidden=True, fs=28), gap=70), gap=36),
   panel=st.card("y-c1", "trap", "⚠️ $\\neq$ זה \"לפחות פעם אחת אחרת\", לא \"אף פעם\""))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: טבלת משלוחים. חבילה יכולה להישלח כמה פעמים, בכל פעם באקספרס או לא.", do=show("x-e", "x-t")),
    P("החלק השמאלי: החבילות שנשלחו באקספרס. על הנתונים: p1 ו-p2.",
      say="החלק השמאלי: החבילות שנשלחו באקספרס. על הנתונים: חבילה מספר אחת וחבילה מספר שתיים.",
      do=show("x-l") + show(*w.ids("x-t", "hl", [0, 2]))),
    P("החלק הימני: החבילות שנשלחו לא באקספרס. p1 ו-p3.", say="החלק הימני: החבילות שנשלחו לא באקספרס. חבילה מספר אחת וחבילה מספר שלוש.",
      do=hide(*w.ids("x-t", "hl", [0, 2])) + show("x-r") + show(*w.ids("x-t", "hl", [1, 3]))),
    P("והחיתוך: חבילות שנמצאות בשתי הקבוצות. p1, שנשלחה פעם כך ופעם כך.",
      say="והחיתוך: חבילות שנמצאות בשתי הקבוצות. חבילה מספר אחת, שנשלחה פעם כך ופעם כך.",
      do=hide(*w.ids("x-t", "hl", [1, 3])) + show("x-i", "q-ok-a")),
    P("״רק באקספרס״ היה דורש הפרש, ומחזיר כאן את p2. זו תשובה אחרת.", do=show("q-x-b", "q-n-b"),
      say="רק באקספרס היה דורש הפרש, ומחזיר כאן את חבילה מספר שתיים. זו תשובה אחרת."),
    P("חבילה שלא נשלחה בכלל לא מופיעה בטבלה, ולכן גם לא בתוצאה.", do=show("q-x-c", "q-n-c")),
    P("על משלוח חוזר אין בטבלה שום מידע.", do=show("q-x-d", "q-n-d")),
    P("והשאילתה תקינה: בשני הצדדים עמודה אחת, אז החיתוך מוגדר.", do=show("q-x-e", "q-n-e"), hold=0.6),
], stage=w.stack(w.alg("x-e", SRC, size=24),
                 w.row(w.table("x-t", DELIV, hidden=True, fs=26),
                       w.table("x-l", R_L, title="True", hidden=True, fs=26),
                       w.table("x-r", R_R, title="False", hidden=True, fs=26),
                       w.table("x-i", R_Q, title="∩", hidden=True, fs=26), gap=36), gap=34),
   panel=f'<div class="qstem ra-qs"><span class="qid">{Q["id"]}</span>מה מחזירה השאילתה?</div>'
         + f'<div class="ra-opts">{st.options("q", OPTS, notes={"b": "צריך הפרש", "c": "לא בטבלה", "d": "אין מידע", "e": "תואמים"})}</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: חיתוך הוא ״גם וגם״, כשהשניים נמצאים בשורות שונות.", do=show("r-1")),
    P("איחוד הוא ״או״. והפרש הוא ״אף פעם לא״ ו״רק״, והסדר שלו קובע.", do=show("r-2")),
    P("בחירה בודקת שורה אחת בכל פעם, ופעולות קבוצה רק בין יחסים תואמים. נתראה ברמה הבאה.", do=show("r-3"),
      hold=0.6),
], stage=w.stack(w.alg(None, "N ∩ S", size=44, hidden=False), w.alg(None, "N ∪ S", size=44, hidden=False),
                 w.alg(None, "N − S", size=44, hidden=False), gap=20),
   panel=st.card("r-1", "rule", "🔑 $\\cap$ = גם וגם")
         + st.card("r-2", "rule", "🔑 $\\cup$ = או · $-$ = אף פעם / רק")
         + st.card("r-3", "trap", "⚠️ רק בין יחסים תואמים"))

VIDEO = Video("A04", "alg", "פעולות קבוצה: ∪ ∩ −", [title, ops, row1, never, only, exam, recap], bank={"25S-B-Q16": "a"})
