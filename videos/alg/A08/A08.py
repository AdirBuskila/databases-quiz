# -*- coding: utf-8 -*-
"""A08 · SQL ↔ אלגברה: חמש התבניות — video script (build: tools/video/vid.py A08).

Source: alg/levels/A08.js (goal: recognise the pattern from the wording and translate between SQL and algebra:
division, extremum, difference, intersection, self-join). Exam part: an original question "בסגנון מבחן" (bank={}):
which SQL query equals Π_vid(Did) − Π_vid σ_{task≠"paint"}(Did) ("only paint", the lesson's trap: "only" is a difference
and ≠ is not "never"). No fresh relalg bank question is an SQL↔algebra translation; the A08 quiz covers all five
patterns with Reader/Book/Loan, so the worked examples and the question use a new Volunteer/Did/Task schema, and the
question goes the other way (algebra -> SQL) on the "only" reading, which no A08 quiz item asks.
Verification: every algebra expression by w_alg.ev (cross-checked with tools/ralib.js), every SQL query by sqlite3 on the
same rows; each pair shown as equivalent is asserted to return the same set, each wrong option a different one.
"""
import sqlite3
from vid import P, Scene, Video, show, hide
import stage as st
import w_alg as w

# ---------------------------------------------------------------- data (new)
VOL = w.T("Volunteer", ["vid", "name"], [[1, "Rina"], [2, "Omer"], [3, "Shir"], [4, "Tal"], [5, "Gal"]], pk=["vid"])
TASK = w.T("Task", ["task", "urgent"], [["paint", "yes"], ["cook", "yes"], ["clean", "no"]], pk=["task"])
DID = w.T("Did", ["vid", "task"], [[1, "paint"], [1, "cook"], [2, "paint"], [2, "cook"], [3, "paint"], [3, "clean"],
                                   [4, "paint"]], pk=["vid", "task"])
DB = [VOL, TASK, DID]
con = sqlite3.connect(":memory:")
for t in DB:
    con.execute(f'CREATE TABLE {t["name"]} ({", ".join(t["columns"])})')
    con.executemany(f'INSERT INTO {t["name"]} VALUES ({", ".join("?" * len(t["columns"]))})', t["rows"])


def sql(q):
    return {r[0] for r in con.execute(q).fetchall()}


# division <-> double NOT EXISTS
SQL_DIV = ("SELECT V.vid FROM Volunteer V\nWHERE NOT EXISTS (\n  SELECT * FROM Task T WHERE T.urgent = 'yes'\n"
           "  AND NOT EXISTS (\n    SELECT * FROM Did D\n    WHERE D.vid = V.vid AND D.task = T.task))")
ALG_DIV = 'Did ÷ Π_{task} σ_{urgent="yes"} (Task)'
R_DIV = w.ev(ALG_DIV, DB)
assert sql(SQL_DIV) == R_DIV.values() == {1, 2}
GRID, INFO = w.div_grid("g", "Did", 'Π_{task} σ_{urgent="yes"} (Task)', DB, fs=26)
assert [x[0] for x, _, ok in INFO if ok] == [1, 2]

# difference <-> NOT IN ("never cooked")
SQL_NEV = "SELECT vid FROM Volunteer\nWHERE vid NOT IN (\n  SELECT vid FROM Did WHERE task = 'cook')"
ALG_NEV = 'Π_{vid} (Volunteer) − Π_{vid} σ_{task="cook"} (Did)'
R_NEV = w.ev(ALG_NEV, DB)
assert sql(SQL_NEV) == R_NEV.values() == {3, 4, 5}
ALG_NE = 'Π_{vid} σ_{task != "cook"} (Did)'
assert w.ev(ALG_NE, DB).values() == {1, 2, 3, 4}                        # != keeps Rina and Omer, who did cook

# ---------------------------------------------------------------- the exam-style question
ALG_Q = 'Π_{vid} (Did) − Π_{vid} σ_{task != "paint"} (Did)'
R_Q = w.ev(ALG_Q, DB)
assert R_Q.values() == {4}
QOPT = {
    "a": "SELECT DISTINCT vid FROM Did\nWHERE task = 'paint'",
    "b": "SELECT DISTINCT vid FROM Did\nWHERE task <> 'paint'",
    "c": "SELECT DISTINCT vid FROM Did\nWHERE vid NOT IN (SELECT vid FROM Did\n                  WHERE task <> 'paint')",
    "d": "SELECT DISTINCT vid FROM Did WHERE task <> 'paint'\nEXCEPT\nSELECT vid FROM Did WHERE task = 'paint'",
}
QRES = {k: sql(v) for k, v in QOPT.items()}
assert QRES == {"a": {1, 2, 3, 4}, "b": {1, 2, 3}, "c": {4}, "d": set()}
assert [k for k, v in QRES.items() if v == R_Q.values()] == ["c"]
R_NP = w.ev('Π_{vid} σ_{task != "paint"} (Did)', DB)
assert R_NP.values() == {1, 2, 3}
QOPTS = [(k, f'<pre class="ra-ocode">{w.esc(v)}</pre>') for k, v in QOPT.items()] + [("e", "אף אחת מהתשובות אינה נכונה")]

N = w.crosscheck()
assert N >= 6

PATTERNS = [("\"לכל\"", "÷", "NOT EXISTS ×2"), ("\"הכי\"", "Π − Πσ(ρ×ρ)", ">= ALL"),
            ("\"אף פעם\" · \"רק\"", "−", "NOT IN"), ("\"גם וגם\"", "∩", "INTERSECT"),
            ("\"יותר מפעם\"", "ρ, ×, =, ≠", "T1, T2 … <>")]


def ptable():
    rows = "".join(f'<tr id="p-r{i}" class="h"><td>{a}</td><td class="ra-pc">{w.esc(b)}</td>'
                   f'<td class="ra-ps">{w.esc(c)}</td></tr>' for i, (a, b, c) in enumerate(PATTERNS))
    return (f'<table class="ra-pt"><thead><tr><th>בשאלה</th><th>אלגברה</th><th>SQL</th></tr></thead>'
            f'<tbody>{rows}</tbody></table>')


# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נחבר בין SQL לאלגברה: אותן חמש שאלות לוגיות, בשתי שפות."),
    P("נזהה את התבנית מהניסוח, ונתרגם בשני הכיוונים."),
    P("ובסוף נפתור שאלה בסגנון מבחן.", hold=0.4),
], stage='<div class="kicker">A08 · אלגברה רלציונית</div><h1>SQL ↔ אלגברה: חמש התבניות</h1>'
         '<p>לזהות את התבנית מהניסוח ולתרגם בין SQL לאלגברה: חילוק, קיצון, הפרש, חיתוך וצירוף עצמי.</p>', layout="title")

pat = Scene("pat", "חמש התבניות", [
    P("לפני שקוראים את האפשרויות, מזהים את התבנית מהמילים של השאלה."),
    P("״לכל״, ״את כל״: חילוק. ב-SQL זה NOT EXISTS כפול.", do=show("p-r0")),
    P("״הכי״, ״המקסימלי״: תבנית הקיצון. ב-SQL, גדול או שווה לכולם.", do=show("p-r1")),
    P("״אף פעם לא״ ו״רק״: הפרש. ב-SQL זה NOT IN.", do=show("p-r2")),
    P("״גם וגם״, בשתי שורות שונות: חיתוך, כמו INTERSECT.", do=show("p-r3")),
    P("ו״יותר מפעם אחת״: צירוף עצמי, עם שוויון על המפתח ושוני במה שסופרים.", do=show("p-r4")),
    P("כותבים את השלד של התבנית, ורק אז משווים אותו לאפשרויות.", do=show("p-c1"), hold=0.3),
], stage=w.stack(ptable()),
   panel=st.card("p-c1", "rule", "🔑 קודם התבנית, אחר כך האפשרויות"))

div = Scene("div", "NOT EXISTS כפול = חילוק", [
    P("מתנדבים, משימות, ומי עשה מה. מי עשה **את כל** המשימות הדחופות?", do=show("d-t", "d-k")),
    P("ב-SQL: מחפשים מתנדב שאין משימה דחופה שהוא לא עשה. שתי שלילות.", do=show("d-sql")),
    P("השלילה הפנימית: אין שורה שבה הוא עשה את המשימה הזו. כלומר, המשימה **חסרה** לו."),
    P("השלילה החיצונית: אין אף משימה דחופה כזו שחסרה. זו בדיוק ההגדרה של ״לכל״.", do=show("d-c1")),
    P("באלגברה: הזוגות של מי עשה מה, חלקי המשימות הדחופות.", do=show("d-alg")),
    P("שתיהן מחזירות את רינה ועומר: הם צבעו וגם בישלו.", do=show("g", "g-v0", "g-v1", "g-v2", "g-v3")
      + show(*[f"g-c{i}-{j}" for i in range(4) for j in range(2)])),
    P("שלילה אחת בלבד הייתה נותנת שאלה אחרת. ״לכל״ צריך שתיים.", do=show("d-c2"), hold=0.4),
], stage=w.stack(w.code("d-sql", SQL_DIV, size=22), w.alg("d-alg", ALG_DIV, size=30),
                 GRID.replace('class="ra-tw"', 'class="ra-tw h"', 1), gap=20),
   panel=w.stack(w.row(w.table("d-t", DID, hidden=True, fs=22), w.table("d-k", TASK, hidden=True, fs=22), gap=30),
                 st.card("d-c1", "rule", "🔑 NOT EXISTS כפול = $\\div$")
                 + st.card("d-c2", "trap", "⚠️ שלילה אחת לא מספיקה"), gap=20))

nev = Scene("nev", "NOT IN = הפרש", [
    P("ועכשיו ״אף פעם״: מי מהמתנדבים **מעולם לא** בישל?", do=show("n-sql")),
    P("ב-SQL: המתנדבים שהמזהה שלהם לא נמצא ברשימת המבשלים. NOT IN.", say="באֶס קְיוּ אֶל: המתנדבים שהמזהה שלהם לא נמצא ברשימת המבשלים. נוֹט אִין."),
    P("באלגברה: כל המתנדבים, פחות מי שבישל. שלוש, ארבע וחמש.", do=show("n-alg", "n-r")),
    P("שימו לב לגל, מספר חמש. היא לא עשתה כלום, ולכן היא בתוצאה: היא מעולם לא בישלה.", do=show("n-r-hl2")),
    P("והמלכודת: בחירה עם ״שונה מבישול״ מחזירה את מי שעשה משהו אחר, לפחות פעם אחת.", do=show("n-ne")),
    P("רינה ועומר צבעו, ולכן עוברים אותה, למרות שבישלו. ״שונה מ־״ אינו ״אף פעם״.", do=show("n-c1"), hold=0.4),
], stage=w.stack(w.code("n-sql", SQL_NEV, size=24), w.alg("n-alg", ALG_NEV, size=30),
                 w.row(w.table("n-r", R_NEV, title="", hidden=True, fs=26),
                       w.stack(w.alg(None, ALG_NE, size=26, hidden=False),
                               w.note(None, "= {1, 2, 3, 4}  ✗", cls="bad", hidden=False), gap=4, id_="n-ne", hidden=True),
                       gap=60, align="center"), gap=24),
   panel=st.card("n-c1", "trap", "⚠️ $\\neq$ אינו \"אף פעם\""))

exam = Scene("exam", "שאלה בסגנון מבחן", [
    P("שאלה בסגנון מבחן, בכיוון ההפוך: נתון ביטוי באלגברה. איזו שאילתה שקולה לו?", do=show("x-alg")),
    P("הביטוי: מי שעשה משימה כלשהי, פחות מי שעשה משימה שאינה צביעה. כלומר: מי שעשה **רק** צביעה.",
      do=show("x-c1")),
    P("על הנתונים: רק טל, מספר ארבע. כל השאר עשו גם משהו אחר.", do=show("x-d", "x-r")),
    P("השאילתה עם NOT IN על רשימת מי שעשה משהו שאינו צביעה, מתוך טבלת המשימות שבוצעו: בדיוק זה.",
      do=show("q-ok-c"), say="השאילתה עם נוֹט אִין על רשימת מי שעשה משהו שאינו צביעה, מתוך טבלת המשימות שבוצעו: בדיוק זה."),
    P("״צביעה״ לבד מחזירה כל מי שצבע פעם אחת לפחות: אחת עד ארבע.", do=show("q-x-a", "q-n-a")),
    P("״שונה מצביעה״ מחזירה את החלק שמחסירים, ולא את התוצאה: אחת, שתיים ושלוש.", do=show("q-x-b", "q-n-b")),
    P("וההפרש ההפוך, מי שעשה משהו אחר ואף פעם לא צבע, הוא שאלה אחרת. על הנתונים הוא ריק.",
      do=show("q-x-d", "q-n-d"),
      hold=0.6),
], stage=w.stack(f'<div class="qstem ra-qs"><span class="qid">בסגנון מבחן</span>איזו שאילתה שקולה לביטוי?</div>',
                 w.alg("x-alg", ALG_Q, size=30),
                 f'<div class="ra-opts ra-sqlopts" style="width:100%">{st.options("q", QOPTS, notes={"a": w.ltr("{1,2,3,4}"), "b": w.ltr("{1,2,3}"), "d": "∅"})}</div>',
                 gap=10),
   panel=w.stack(w.row(w.table("x-d", DID, hidden=True, fs=24), w.table("x-r", R_Q, title="", hidden=True, fs=24), gap=40),
                 st.card("x-c1", "rule", "🔑 \"רק\" = מי שעשה $-$ מי שעשה משהו אחר"), gap=24))

recap = Scene("recap", "סיכום", [
    P("לסיכום: מזהים את התבנית מהמילים. ״לכל״ זה חילוק, ובשאילתה NOT EXISTS כפול.", do=show("r-1")),
    P("״אף פעם״ ו״רק״ הם הפרש, וב-SQL זה NOT IN. ו״שונה מ־״ אינו ״אף פעם״.", do=show("r-2")),
    P("ובכל שאלה, כותבים קודם את שלד התבנית, ורק אז קוראים את האפשרויות. נתראה ברמה הבאה.", hold=0.6),
], stage=w.stack(ptable().replace(' class="h"', "")),
   panel=st.card("r-1", "rule", "🔑 NOT EXISTS כפול = $\\div$")
         + st.card("r-2", "rule", "🔑 NOT IN = $-$"))

VIDEO = Video("A08", "alg", "SQL ↔ אלגברה: חמש התבניות", [title, pat, div, nev, exam, recap], bank={})
