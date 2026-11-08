# -*- coding: utf-8 -*-
"""A07 · תקינות, גבולות האלגברה ושאילתות בשלבים — video script (build: tools/video/vid.py A07).

Source: alg/levels/A07.js (goal: check validity first, know what algebra cannot express, follow multi-step queries (←),
count operations). Exam anchor: 24B-A-Q17 (MBD ← the earliest borrow date; RES ← the title borrowed on it; key a), which
no guided quiz cites. It is evaluated on a small Book/Borrow instance on which the four readings give different titles.
Two notes on the printed query (not shown on screen as errors, the meaning is clear): MBD's first term reads
"Π_{borrow_date} BR1" where BR1 only exists inside the ρ (it means Borrow; the instance supplies BR1 = BR), and RES's
condition "borrow_date = MBD.borrow_date" is ambiguous after the × (two borrow_date columns); it is evaluated as
BR.borrow_date = MBD.borrow_date, and the printed form is asserted to be rejected by both evaluators.
Avoided on purpose: the A07 quiz data (Student/Course/Takes/Teaches) and the exam items its quiz cites (22B-A-Q13,
21B-A-Q17, 25B-A-Q14, 25B-A-Q15). Worked examples: Product/Sale (new). Every expression is evaluated by w_alg.ev and
cross-checked against tools/ralib.js.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_alg as w

# ---------------------------------------------------------------- data (new)
PRODUCT = w.T("Product", ["pid", "pname", "cat", "price"],
              [[1, "Ball", "toys", 30], [2, "Lamp", "home", 80], [3, "Kite", "toys", 45], [4, "Mug", "home", 20],
               [5, "Fan", "home", 60]], pk=["pid"])
SALE = w.T("Sale", ["pid", "day", "qty"], [[1, "Mon", 2], [1, "Tue", 1], [2, "Mon", 1], [3, "Tue", 4], [4, "Wed", 3]],
           pk=["pid", "day"])
DB = [PRODUCT, SALE]
BAD1 = 'Π_{pid} σ_{cat="toys"} (Sale)'
GOOD1 = 'Π_{pid} σ_{cat="toys"} (Sale ⊗ Product)'
assert w.invalid(BAD1, DB) and w.ev(GOOD1, DB).values() == {1, 3}
BAD2 = "Π_{pid, pname} (Product) − Π_{pid} (Sale)"
GOOD2 = "Π_{pid} (Product) − Π_{pid} (Sale)"
assert w.invalid(BAD2, DB) and w.ev(GOOD2, DB).values() == {5}
# limits: the most expensive product and "sold on more than one day" are expressible
MAXP = "Π_{pid} (Product) − Π_{P1.pid} σ_{P1.price < P2.price} (ρ_{P1} Product × ρ_{P2} Product)"
assert w.ev(MAXP, DB).values() == {2}
MORE = "Π_{S1.pid} σ_{S1.pid = S2.pid ∧ S1.day != S2.day} (ρ_{S1} Sale × ρ_{S2} Sale)"
assert w.ev(MORE, DB).values() == {1}
# a query in steps
STEPS = [("A", 'Π_{pid} σ_{day="Mon"} (Sale)'), ("B", 'Π_{pid} σ_{day="Tue"} (Sale)'),
         ("C", "Π_{pname} ((A − B) ⊗ Product)")]
src = lambda k: "\n".join(f"{n} ← {e}" for n, e in STEPS[:k])
R_A, R_B, R_C = w.ev(src(1), DB), w.ev(src(2), DB), w.ev(src(3), DB)
assert R_A.values() == {1, 2} and R_B.values() == {1, 3} and R_C.values() == {"Lamp"}
R_AB = w.ev(src(2) + "\nA − B", DB)
assert R_AB.values() == {2}
# counting operations: Monday and Tuesday, never Wednesday -> ∩ and −
CNT = 'Π_{pid} σ_{day="Mon"} (Sale) ∩ Π_{pid} σ_{day="Tue"} (Sale) − Π_{pid} σ_{day="Wed"} (Sale)'
assert w.ev(CNT, DB).values() == {1}

# ---------------------------------------------------------------- exam 24B-A-Q17
Q = BANK["24B-A-Q17"]
assert Q["correctId"] == "a" and [o["id"] for o in Q["options"]] == list("abcde")
L_MBD, L_RES = [x for x in Q["question"].split("$$")[1::2]]
assert L_MBD.startswith("MBD ←") and L_RES.startswith("RES ←")
BOOK = w.T("B", ["ISBN", "title", "a_name", "genre", "published_year"],
           [[111, "Dune", "Herbert", "SciFi", 1965], [222, "Emma", "Austen", "Romance", 1815],
            [333, "Hamlet", "Shakespeare", "Drama", 1603]], pk=["ISBN"])
BORROW = [[1, 222, "2024-01-10", "2024-01-20"], [2, 111, "2024-01-03", "2024-01-09"], [1, 333, "2024-02-01", "2024-02-11"],
          [3, 333, "2024-02-15", "2024-02-25"], [2, 333, "2024-03-01", "2024-03-08"]]
BR = w.T("BR", ["m_id", "ISBN", "borrow_date", "return_date"], BORROW, pk=["m_id", "ISBN", "borrow_date"])
BR1 = w.T("BR1", BR["columns"], BORROW)                              # the printed "Π_{borrow_date} BR1" means Borrow
QDB = [BOOK, BR, BR1]
R_MBD = w.ev(L_MBD, QDB)
assert R_MBD.values() == {"2024-01-03"}
assert w.invalid(L_MBD + "\n" + L_RES, QDB)                           # printed RES: borrow_date is ambiguous after ×
L_RES2 = L_RES.replace("σ_{borrow_date=MBD.borrow_date}", "σ_{BR.borrow_date=MBD.borrow_date}")
assert L_RES2 != L_RES
R_RES = w.ev(L_MBD + "\n" + L_RES2, QDB)
assert R_RES.values() == {"Dune"}
# the other readings, on the same data: the last borrowed, borrowed more than once, borrowed most
last = max(BORROW, key=lambda r: r[2])[1]
counts = {i: sum(1 for r in BORROW if r[1] == i) for i in (111, 222, 333)}
title_of = {r[0]: r[1] for r in BOOK["rows"]}
assert title_of[last] == "Hamlet" and {title_of[i] for i, c in counts.items() if c > 1} == {"Hamlet"}
assert title_of[max(counts, key=counts.get)] == "Hamlet"
SUBMIN = w.ev("Π_{BR1.borrow_date} (σ_{(BR1.borrow_date > BR2.borrow_date)} (ρ_{BR1} BR X ρ_{BR2} BR))", QDB)
assert len(SUBMIN) == 4                                               # every date with an earlier one
OPTS = [(o["id"], o["value"]) for o in Q["options"]]

N = w.crosscheck()
assert N == 15

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד לבדוק קודם שביטוי **חוקי**, ורק אחר כך לשאול מה הוא מחזיר."),
    P("נראה מה אי אפשר לבטא באלגברה, ואיך עוקבים אחרי שאילתה שכתובה בשלבים."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">A07 · אלגברה רלציונית</div><h1>תקינות, גבולות האלגברה ושאילתות בשלבים</h1>'
         '<p>לבדוק קודם שהביטוי חוקי, לדעת מה אי אפשר לבטא באלגברה, לעקוב אחרי שאילתות בשלבים (←) ולספור פעולות.</p>',
   layout="title")

valid = Scene("valid", "קודם: האם זה חוקי?", [
    P("חנות: מוצרים, עם קטגוריה ומחיר. ומכירות: איזה מוצר נמכר באיזה יום.", do=show("v-p", "v-s")),
    P("בדיקה ראשונה: כל עמודה בבחירה ובהיטל קיימת ביחס שממנו קוראים אותה.", do=show("v-c1")),
    P("בחירה לפי קטגוריה מתוך טבלת המכירות? למכירות אין קטגוריה. הביטוי לא חוקי.", do=show("v-1", "v-p-ch2")),
    P("התיקון: קודם צירוף עם המוצרים, ואז העמודה קיימת.", do=hide("v-p-ch2") + show("v-1g")),
    P("בדיקה שנייה: הפרש, חיתוך ואיחוד רק בין יחסים תואמים.", do=show("v-c2")),
    P("מזהה ושם, פחות מזהה בלבד: שתי עמודות מול אחת. לא חוקי.", do=show("v-2")),
    P("ובמבחן, מסיח עם ניסוח משכנע לביטוי לא חוקי הוא מלכודת קבועה. התשובה אז: אף אחת מהתשובות.",
      do=show("v-c3"), hold=0.4),
], stage=w.stack(w.row(w.table("v-p", PRODUCT, hidden=True, fs=24), w.table("v-s", SALE, hidden=True, fs=24), gap=50),
                 w.alg("v-1", BAD1 + "   ✗", size=28), w.alg("v-1g", GOOD1 + "   ✓", size=28),
                 w.alg("v-2", BAD2 + "   ✗", size=28), gap=16),
   panel=st.card("v-c1", "rule", "🔑 כל עמודה קיימת ביחס שממנו קוראים")
         + st.card("v-c2", "rule", "🔑 $\\cup$ $\\cap$ $-$ רק בין יחסים תואמים")
         + st.card("v-c3", "trap", "⚠️ לא חוקי ← \"אף אחת מהתשובות\""))

limits = Scene("limits", "מה אי אפשר", [
    P("ומה אי אפשר לבטא בכלל? באלגברה אין ספירה, אין סכום, אין ממוצע, ואין קיבוץ.", do=show("l-c1")),
    P("לכן ״כמה מוצרים יש בכל קטגוריה״, או ״כמה יחידות נמכרו מכל מוצר״, לא ניתנים לביטוי.", do=show("l-x1", "l-x2")),
    P("אבל זהירות: לא כל מה שנשמע כמו ספירה הוא באמת ספירה.", hold=0.2),
    P("המוצר היקר ביותר אפשרי, בתבנית הקיצון: כולם, פחות מי שיש יקר ממנו.", do=show("l-o1")),
    P("ומוצר שנמכר ביותר מיום אחד אפשרי בצירוף עצמי: אותו מוצר, יום שונה.", do=show("l-o2"), hold=0.4),
], stage=w.stack(w.note("l-x1", "✗ כמה מוצרים בכל קטגוריה", cls="bad"), w.note("l-x2", "✗ כמה יחידות מכל מוצר", cls="bad"),
                 w.stack(w.note(None, "✓ המוצר היקר ביותר", cls="ok", hidden=False), w.alg(None, MAXP, size=22, hidden=False),
                         gap=0, id_="l-o1", hidden=True),
                 w.stack(w.note(None, "✓ נמכר ביותר מיום אחד", cls="ok", hidden=False), w.alg(None, MORE, size=22, hidden=False),
                         gap=0, id_="l-o2", hidden=True), gap=26),
   panel=st.card("l-c1", "trap", "⚠️ אין COUNT, SUM, AVG, GROUP BY"))

steps = Scene("steps", "שאילתה בשלבים", [
    P("שאילתות ארוכות נכתבות בשלבים. החץ שמאלה נותן שם לתוצאת ביניים.", do=show("s", "s-l0")),
    P("$A$: המוצרים שנמכרו ביום שני. אחד ושתיים. רושמים בצד מה כל שם מחזיק.", do=show("s-a")),
    P("$B$: המוצרים שנמכרו ביום שלישי. אחד ושלוש.", do=show("s-l1", "s-b")),
    P("$C$: $A$ פחות $B$ נותן שתיים, ואחרי צירוף עם המוצרים, השם: המנורה.", do=show("s-l2", "s-ab", "s-c")),
    P("כלומר: מוצרים שנמכרו בשני ולא בשלישי. בלי הרישום בצד, קל ללכת לאיבוד.", do=show("s-c1")),
    P("ועוד סוג שאלה: בכמה מהפעולות הפרש, חיתוך, איחוד, חילוק ושינוי שם צריך? בחירה, היטל וצירוף לא נספרים.",
      do=show("s-c2")),
    P("למשל: נמכר בשני וגם בשלישי, ואף פעם לא ברביעי. חיתוך והפרש: שתי פעולות.", do=show("s-cnt"), hold=0.4),
], stage=w.stack(w.steps("s", STEPS, size=30),
                 w.row(w.table("s-a", R_A, title="A", hidden=True, fs=26), w.table("s-b", R_B, title="B", hidden=True, fs=26),
                       w.table("s-ab", R_AB, title="A − B", hidden=True, fs=26), w.table("s-c", R_C, title="C", hidden=True, fs=26),
                       gap=46),
                 w.alg("s-cnt", CNT, size=22), gap=34).replace('class="ra-steps"', 'class="ra-steps h"', 1),
   panel=st.card("s-c1", "rule", "🔑 שאילתה בשלבים: רושמים מה כל שם מחזיק")
         + st.card("s-c2", "ex", "נספרים: <span class=\"ra-ltr\">− ∩ ∪ ÷ ρ</span><br>לא נספרים: <span class=\"ra-ltr\">σ Π × ⊗</span>"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: ספרייה. ספרים, והשאלות של ספרים עם תאריך השאלה. אין שני תאריכים זהים.", do=show("x-br")),
    P("שלב ראשון: כל התאריכים, פחות התאריכים שיש תאריך מוקדם מהם. זו תבנית הקיצון.", do=show("x-st", "x-st-l0")),
    P("מי שמוקרן גדול בתנאי נמחק, ולכן נשאר המינימום: התאריך המוקדם ביותר. השלישי בינואר.",
      do=show("x-mbd", "x-br-hl1"), say="מי שמוקרן גדול בתנאי נמחק, ולכן נשאר המינימום: התאריך המוקדם ביותר. השלישי בינואר."),
    P("שלב שני: מצרפים ספרים להשאלות, מצמידים את התאריך המינימלי, ומשאירים את השורה שבה התאריכים שווים.",
      do=show("x-st-l1")),
    P("ומקרינים על שם הספר: חולית. כלומר, הספר שהושאל **ראשון**.", do=show("x-res", "q-ok-a"),
      say="ומקרינים על שם הספר: חוֹלִית. כלומר, הספר שהושאל ראשון."),
    P("״הושאל אחרון״ היה דורש את המקסימום. על הנתונים זה המלט.", do=show("q-x-b", "q-n-b"),
      say="הושאל אחרון היה דורש את המקסימום. על הנתונים זה הַמְלֵט."),
    P("״יותר מפעם אחת״ ו״יותר מכל ספר אחר״ שואלות על ההשאלות של כל ספר. כאן אין שום השוואה כזו.",
      do=show("q-x-c", "q-n-c", "q-x-d", "q-n-d"), hold=0.6),
], stage=w.stack(w.table("x-br", BR, hidden=True, fs=22),
                 w.steps("x-st", [("MBD", L_MBD.split("←", 1)[1].strip()), ("RES", L_RES.split("←", 1)[1].strip())],
                         size=19).replace('class="ra-steps"', 'class="ra-steps h"', 1),
                 w.row(w.table("x-mbd", R_MBD, title="MBD", hidden=True, fs=24),
                       w.table("x-res", R_RES, title="RES", hidden=True, fs=24), gap=60), gap=20),
   panel=f'<div class="qstem ra-qs"><span class="qid">{Q["id"]}</span>מה נקבל ב-RES? (אין שני תאריכים זהים ב-Borrow)</div>'
         + f'<div class="ra-opts">{st.options("q", OPTS, notes={"b": "מקסימום", "c": "שאלה אחרת", "d": "ספירה"})}</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: לפני ששואלים מה ביטוי מחזיר, בודקים שכל עמודה קיימת, ושפעולות קבוצה הן בין יחסים תואמים.", do=show("r-1")),
    P("אין באלגברה ספירה, סכום או ממוצע. אבל קיצון ו״יותר מפעם אחת״ אפשריים.", do=show("r-2")),
    P("ובשאילתה בשלבים, רושמים בצד מה כל שם מחזיק. נתראה ברמה הבאה.", do=show("r-3"), hold=0.6),
], stage=w.stack(w.steps(None, STEPS, size=30, hidden=False)),
   panel=st.card("r-1", "rule", "🔑 תקינות לפני משמעות")
         + st.card("r-2", "trap", "⚠️ אין COUNT / SUM / AVG")
         + st.card("r-3", "ex", "בשלבים: רושמים מה כל שם מחזיק"))

VIDEO = Video("A07", "alg", "תקינות, גבולות האלגברה ושאילתות בשלבים", [title, valid, limits, steps, exam, recap], bank={"24B-A-Q17": "a"})
