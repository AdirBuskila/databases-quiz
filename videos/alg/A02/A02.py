# -*- coding: utf-8 -*-
"""A02 · מכפלה קרטזית וצירוף טבעי — video script (build: tools/video/vid.py A02).

Source: alg/levels/A02.js (goal: what × and ⊗ return, ⊗ with no common column name is ×, and with × every join
condition must be written: n tables, n−1 conditions). Exam anchor: 26B-A-Q13 (verified clients' project titles: client.id
vs project.client_id share no name, so ⊗ is a product; key a), which no guided quiz cites. Each option is evaluated on a
small client/project instance below.
Avoided on purpose: the A02 quiz data (Student/Enroll/Course, Morning/Evening, Customer/Orders/Courier) and the exam
questions its quiz is built on (21S-B-Q17, 25C-A-Q13/Q14, 25S-B-Q13/Q14, 21B-C-Q18). Worked examples: Owner/Pet (new).
Every expression is evaluated by w_alg.ev and cross-checked against tools/ralib.js.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_alg as w

# ---------------------------------------------------------------- data (new)
OWNER = w.T("Owner", ["oid", "oname", "city"], [[1, "Rina", "Haifa"], [2, "Omer", "Akko"], [3, "Shir", "Haifa"]], pk=["oid"])
PET = w.T("Pet", ["pet", "kind", "oid"], [["Rex", "dog", 1], ["Tom", "cat", 1], ["Bo", "dog", 3]], pk=["pet"])
DB = [OWNER, PET]

E_X = "Owner × Pet"
R_X = w.ev(E_X, DB)
assert len(R_X) == 9 and len(R_X.cols) == 6
MATCH = [i for i, r in enumerate(R_X.rows) if r[0] == r[5]]
assert MATCH == [0, 1, 8]
E_XS = "σ_{Owner.oid = Pet.oid} (Owner × Pet)"
R_XS = w.ev(E_XS, DB)
assert len(R_XS) == 3 and len(R_XS.cols) == 6 and R_XS.rows == [R_X.rows[i] for i in MATCH]

E_J = "Owner ⊗ Pet"
R_J = w.ev(E_J, DB)
assert R_J.names == ["oid", "oname", "city", "pet", "kind"] and len(R_J) == 3
assert {r[1] for r in R_J.rows} == {"Rina", "Shir"}                 # Omer has no pet: gone
assert w.same(R_J, w.ev("Π_{Owner.oid, oname, city, pet, kind} σ_{Owner.oid = Pet.oid} (Owner × Pet)", DB))

# no common name -> the natural join is a product
PET2 = w.T("Pet2", ["pet", "kind", "owner_id"], PET["rows"])
R_J2 = w.ev("Owner ⊗ Pet2", DB + [PET2])
assert len(R_J2) == 9 and w.same(R_J2, w.ev("Owner × Pet2", DB + [PET2]))
# one more common name -> it must match too
PET3 = w.T("Pet3", ["pet", "kind", "oid", "city"], [["Rex", "dog", 1, "Haifa"], ["Tom", "cat", 1, "Akko"],
                                                    ["Bo", "dog", 3, "Haifa"]])
R_J3 = w.ev("Owner ⊗ Pet3", DB + [PET3])
assert [r[3] for r in R_J3.rows] == ["Rex", "Bo"]                   # Tom: same oid, other city -> no pair

# ---------------------------------------------------------------- exam 26B-A-Q13
Q = BANK["26B-A-Q13"]
assert Q["correctId"] == "a" and [o["id"] for o in Q["options"]] == list("abcde")
CLIENT = w.T("client", ["id", "industry", "country", "is_verified"],
             [[1, "tech", "IL", True], [2, "food", "US", False]], pk=["id"])
PROJECT = w.T("project", ["project_id", "title", "client_id", "description", "is_remote"],
              [[10, "Site", 1, "web", True], [11, "App", 2, "mobile", False], [12, "Bot", 1, "chat", False]],
              pk=["project_id"])
QDB = [CLIENT, PROJECT]
OPT = {o["id"]: o["value"] for o in Q["options"] if o["type"] == "algebra"}
assert set(OPT) == set("abcd")
RES = {}
for k, src in OPT.items():
    RES[k] = None if w.invalid(src, QDB) else w.ev(src, QDB)
assert RES["a"].values() == {"Site", "Bot"}
assert RES["b"].values() == RES["d"].values() == {"Site", "App", "Bot"}   # a product: every title comes back
assert RES["c"] is None                                                 # no is_verified in project
assert w.ev("project ⊗ client", QDB).rows == w.ev("project × client", QDB).rows
OPTS = [(o["id"], w.inl(o["value"]) if o["type"] == "algebra" else o["value"]) for o in Q["options"]]

N = w.crosscheck()
assert N >= 10

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד לחבר מידע משתי טבלאות: מכפלה קרטזית, וצירוף טבעי."),
    P("נראה מה כל אחת מחזירה, ומתי הצירוף הטבעי מתנהג בדיוק כמו מכפלה."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">A02 · אלגברה רלציונית</div><h1>מכפלה קרטזית וצירוף טבעי</h1>'
         '<p>להבין מה × ו-⊗ מחזירים, למה ⊗ בלי עמודה משותפת הוא ×, ולכתוב את כל תנאי החיבור כשמשתמשים ב-×.</p>',
   layout="title")

idea = Scene("idea", "שתי טבלאות", [
    P("שתי טבלאות: בעלים, עם מזהה, שם ועיר. וחיות מחמד, עם שם, סוג, ומזהה הבעלים.", do=show("i-o", "i-p")),
    P("העמודה של מזהה הבעלים מופיעה בשתיהן. היא הקשר: רקס וטום שייכים לבעלים מספר אחת.",
      do=show("i-o-ch0", "i-p-ch2")),
    P("איך מקבלים טבלה אחת שבה כל חיה עומדת ליד הבעלים שלה? יש שתי דרכים.", hold=0.3),
], stage=w.row(w.table("i-o", OWNER, hidden=True, fs=32), w.table("i-p", PET, hidden=True, fs=32), gap=70),
   panel="")

prod = Scene("prod", "מכפלה קרטזית ×", [
    P("הדרך הראשונה: מכפלה קרטזית. כל שורה של הבעלים, מול **כל** שורה של החיות.", do=show("x-e", "x-t")),
    P("שלוש כפול שלוש: תשע שורות. ושש עמודות: שלוש ועוד שלוש.", do=show("x-c1")),
    P("מזהה הבעלים מופיע **פעמיים**, אחד מכל טבלה. לכן כותבים לפניו את שם הטבלה.", do=show("x-t-ch0", "x-t-ch5")),
    P("רוב הזוגות חסרי משמעות. למשל עומר ליד רקס, שהוא בכלל הכלב של רינה.", do=show("x-t-hl3")),
    P("מכפלה לבד לא מחברת כלום. צריך תנאי: מזהה הבעלים משמאל שווה למזהה מימין.",
      do=hide("x-e", "x-t-hl3", "x-t-ch0", "x-t-ch5") + show("x-e2")),
    P("נשארות שלוש שורות, שבהן כל חיה עומדת ליד הבעלים שלה.",
      do=show(*w.ids("x-t", "hl", MATCH)) + show(*w.ids("x-t", "x", [i for i in range(9) if i not in MATCH]))),
    P("זה כל העניין: מכפלה, ואחריה בחירה שכותבת את **תנאי החיבור**.", do=show("x-c2"), hold=0.4),
], stage=w.stack(w.swap(w.alg("x-e", E_X, size=36), w.alg("x-e2", E_XS, size=36), h=64),
                 w.table("x-t", R_X, title="", hidden=True, fs=23, qual=True), gap=14),
   panel=st.card("x-c1", "ex", "שורות: $3 \\cdot 3 = 9$<br>עמודות: $3 + 3 = 6$")
         + st.card("x-c2", "rule", "🔑 מכפלה + בחירה עם <b>תנאי חיבור</b>"))

join = Scene("join", "צירוף טבעי ⊗", [
    P("הדרך השנייה, הקצרה: צירוף טבעי.", do=show("j-e")),
    P("הצירוף מחפש לבד עמודות עם **אותו שם** בשתי הטבלאות. כאן יש אחת: מזהה הבעלים.",
      do=show("j-o", "j-p", "j-o-ch0", "j-p-ch2")),
    P("הוא מזווג רק שורות שמסכימות עליה, וכותב אותה **פעם אחת**.", do=show("j-r")),
    P("התוצאה: שלוש שורות וחמש עמודות. אותן שורות כמו קודם, בלי העמודה הכפולה.", do=show("j-c1")),
    P("ועומר? אין לו אף חיה, אז אין לו עם מי להתאים. הוא נעלם מהתוצאה.", do=show("j-o-x1")),
    P("לכן היטל על צירוף כזה מחזיר רק בעלים שיש להם לפחות חיה אחת.", do=show("j-c2"), hold=0.4),
], stage=w.stack(w.alg("j-e", E_J, size=40),
                 w.row(w.table("j-o", OWNER, hidden=True, fs=28), w.table("j-p", PET, hidden=True, fs=28), gap=50),
                 w.table("j-r", R_J, title="", hidden=True, fs=28), gap=22),
   panel=st.card("j-c1", "ex", "$3$ שורות, $5$ עמודות")
         + st.card("j-c2", "rule", "🔑 צירוף טבעי: התאמה בכל <b>שם משותף</b>, והעמודה פעם אחת"))

names = Scene("names", "הכול לפי השם", [
    P("שימו לב: הצירוף הטבעי מסתכל רק על **שמות** העמודות, לא על המשמעות שלהן."),
    P("נניח שבטבלת החיות מזהה הבעלים נקרא אחרת. אין אף שם משותף.", do=show("n-1", "n-1b")),
    P("אז אין על מה להשוות, וכל זוג \"מתאים\". הצירוף הוא בדיוק מכפלה קרטזית: תשע שורות.", do=show("n-1c", "n-c1")),
    P("ולהפך: נניח שגם לחיות יש עמודת עיר, העיר שבה אומצו.", do=show("n-2", "n-2b")),
    P("עכשיו יש **שני** שמות משותפים, והצירוף דורש התאמה בשניהם.", do=show("n-2m", "n-2m2", "n-2bm", "n-2bm2")),
    P("טום גר אצל רינה מחיפה, אבל אומץ בעכו. לכן הוא נופל, ונשארות שתי שורות.", do=show("n-2c", "n-c2")),
    P("ועוד כלל ספירה: מכפלה של שלוש טבלאות צריכה **שני** תנאי חיבור. בכל אחד מחברים שתיים.",
      do=show("n-c3"), hold=0.4),
], stage=w.stack(
    w.stack(w.alg("n-1", "Owner(oid, oname, city)", size=32),
            w.alg("n-1b", "Pet(pet, kind, owner_id)", size=32), w.note("n-1c", "אין שם משותף ← 9 שורות", cls="bad"),
            gap=2),
    w.stack(w.alg("n-2", "Owner(oid, oname, city)", size=32, marks=[("n-2m", "oid"), ("n-2m2", "city")]),
            w.alg("n-2b", "Pet(pet, kind, oid, city)", size=32, marks=[("n-2bm", "oid"), ("n-2bm2", "city")]),
            w.note("n-2c", "oid וגם city ← 2 שורות", cls="bad"), gap=2), gap=60),
   panel=st.card("n-c1", "trap", "⚠️ אין שם משותף: צירוף טבעי = מכפלה")
         + st.card("n-c2", "trap", "⚠️ כל שם משותף חייב להתאים")
         + st.card("n-c3", "rule", "🔑 מכפלה של $n$ טבלאות: $n-1$ תנאי חיבור"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: פלטפורמת פרילנסרים. לקוח, עם מזהה, ועם עמודה שאומרת אם הוא מאומת. ופרויקט, עם המזהה של הלקוח שפרסם.",
      do=show("q-sc")),
    P("איזה ביטוי מחזיר את כותרות הפרויקטים שפורסמו על ידי לקוח מאומת?"),
    P("קודם בודקים שמות משותפים. בלקוח המזהה נקרא סתם מזהה. בפרויקט הוא נקרא מזהה הלקוח.", do=show("q-sc-m1", "q-sc-m2")),
    P("השמות שונים, ואין אף שם משותף אחר. לכן צירוף טבעי ביניהם הוא **מכפלה**.", do=show("q-tc", "q-tp")),
    P("ניקח נתונים קטנים: רק הלקוח הראשון מאומת, והוא פרסם שניים מתוך שלושה פרויקטים.", do=show("q-tc-hl0")),
    P("הביטוי עם הצירוף הטבעי מחזיר את כל שלוש הכותרות, כי כל פרויקט מוצמד גם ללקוח המאומת.", do=show("q-x-b", "q-n-b")),
    P("אותו דבר כשמסננים קודם את הלקוחות: עדיין מכפלה, ועדיין כל הכותרות.", do=show("q-x-d", "q-n-d")),
    P("וזה שמסנן רק את הפרויקטים לא תקין: אין לפרויקט עמודה של אימות.", do=show("q-x-c", "q-n-c")),
    P("התשובה: מכפלה, ובבחירה גם האימות וגם תנאי החיבור, המזהה של הלקוח בפרויקט שווה למזהה הלקוח.",
      do=show("q-ok-a", "q-ra")),
    P("והתוצאה: רק שתי הכותרות של הלקוח המאומת.", hold=0.6),
], stage=w.stack(
    w.stack(w.alg("q-sc1", "client(id, industry, country, is_verified)", size=27, hidden=False, marks=[("q-sc-m1", "id")]),
            w.alg("q-sc2", "project(project_id, title, client_id, description, is_remote)", size=27, hidden=False,
                  marks=[("q-sc-m2", "client_id")]), gap=0, id_="q-sc", hidden=True),
    w.row(w.table("q-tc", CLIENT, hidden=True, fs=24), w.table("q-ra", RES["a"], title="Π_{title}", hidden=True, fs=24),
          gap=60),
    w.table("q-tp", PROJECT, hidden=True, fs=24), gap=20),
   panel=f'<div class="qstem ra-qs"><span class="qid">{Q["id"]}</span>איזו שאילתה מחזירה את כותרות הפרויקטים '
         'שפורסמו על-ידי לקוח מאומת?</div>'
         + f'<div class="ra-opts">{st.options("q", OPTS, notes={"b": "מכפלה", "c": "לא תקין", "d": "מכפלה"})}</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: מכפלה קרטזית מצמידה כל שורה לכל שורה. מכפילים את מספר השורות, ומחברים את העמודות.", do=show("r-1")),
    P("כדי לחבר באמת, מוסיפים בחירה עם תנאי חיבור, ובשלוש טבלאות שני תנאים.", do=show("r-2")),
    P("צירוף טבעי עושה את זה לבד, לפי כל השמות המשותפים, ומשאיר רק מי שיש לו התאמה.", do=show("r-3")),
    P("ואם אין שם משותף, הצירוף הוא מכפלה. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.stack(w.alg(None, E_XS, size=38, hidden=False), w.alg(None, E_J, size=38, hidden=False), gap=30),
   panel=st.card("r-1", "rule", "🔑 מכפלה: שורות כפול, עמודות ועוד")
         + st.card("r-2", "rule", "🔑 $n$ טבלאות: $n-1$ תנאי חיבור")
         + st.card("r-3", "rule", "🔑 צירוף טבעי: כל השמות המשותפים")
         + st.card("r-4", "trap", "⚠️ אין שם משותף: מכפלה"))

VIDEO = Video("A02", "alg", "מכפלה קרטזית וצירוף טבעי", [title, idea, prod, join, names, exam, recap], bank={"26B-A-Q13": "a"})
