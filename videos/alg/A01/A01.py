# -*- coding: utf-8 -*-
"""A01 · σ ו-Π: בחירה והיטל — video script (build: tools/video/vid.py A01).

Source: alg/levels/A01.js (goal: σ picks rows, Π picks columns and removes duplicates, count rows and columns; read
from the inside out). Exam anchor: 26S-A-Q16 (names of the passengers from Holon: σ first, then Π; key b), which no
guided quiz cites. Its options are evaluated on a small Passenger instance below (two are invalid, one returns nothing).
Avoided on purpose: the A01 quiz tables (Student, Lives, R) and their questions, 21S-B-Q14 (A01-Q4), 25B-A-Q16 (the
lesson's R). Worked examples use a new Movie table. Every expression is evaluated by w_alg.ev and cross-checked
against tools/ralib.js (w.crosscheck()).
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_alg as w

# ---------------------------------------------------------------- data (new)
MOVIE = w.T("Movie", ["mid", "title", "genre", "len"],
            [[1, "Up", "Animation", 96], [2, "Jaws", "Thriller", 124], [3, "Coco", "Animation", 105],
             [4, "Heat", "Crime", 170], [5, "Cars", "Animation", 117], [6, "Psycho", "Thriller", 109]], pk=["mid"])
DB = [MOVIE]

# σ on one condition
E_S1 = 'σ_{genre="Animation"} (Movie)'
R_S1 = w.ev(E_S1, DB)
KEEP1 = w.row_index(MOVIE, lambda r: r[2] == "Animation")
assert KEEP1 == [0, 2, 4] and len(R_S1) == 3 and len(R_S1.cols) == 4
DROP1 = [i for i in range(6) if i not in KEEP1]

# σ with ∧ and with ∨
E_S2 = 'σ_{genre="Animation" ∧ len > 100} (Movie)'
R_S2 = w.ev(E_S2, DB)
assert [r[1] for r in R_S2.rows] == ["Coco", "Cars"]
K2 = w.row_index(MOVIE, lambda r: r[2] == "Animation" and r[3] > 100)
assert K2 == [2, 4]
E_S3 = 'σ_{genre="Thriller" ∨ len > 150} (Movie)'
R_S3 = w.ev(E_S3, DB)
assert [r[1] for r in R_S3.rows] == ["Jaws", "Heat", "Psycho"]
K3 = w.row_index(MOVIE, lambda r: r[2] == "Thriller" or r[3] > 150)
assert K3 == [1, 3, 5]

# Π removes duplicates
E_P = "Π_{genre} (Movie)"
R_P = w.ev(E_P, DB)
assert R_P.rows == [("Animation",), ("Thriller",), ("Crime",)]
DUPS = [i for i, r in enumerate(MOVIE["rows"]) if r[2] in [q[2] for q in MOVIE["rows"][:i]]]
assert DUPS == [2, 4, 5] and 6 - len(DUPS) == len(R_P)

# inside out, and the reversed (invalid) order
E_O = "Π_{title} σ_{len > 110} (Movie)"
R_O = w.ev(E_O, DB)
assert [r[0] for r in R_O.rows] == ["Jaws", "Heat", "Cars"]
KO = w.row_index(MOVIE, lambda r: r[3] > 110)
assert KO == [1, 3, 4]
E_BAD = "σ_{len > 110} Π_{title} (Movie)"
assert w.invalid(E_BAD, DB)
R_PT = w.ev("Π_{title} (Movie)", DB)

# counting after σ and Π
E_C = "Π_{genre} σ_{len > 100} (Movie)"
R_C1 = w.ev("σ_{len > 100} (Movie)", DB)
R_C = w.ev(E_C, DB)
assert len(R_C1) == 5 and len(R_C) == 3 and len(R_C.cols) == 1
KC = w.row_index(MOVIE, lambda r: r[3] > 100)
assert KC == [1, 2, 3, 4, 5]
DUPC = [i for i in KC if MOVIE["rows"][i][2] in [MOVIE["rows"][k][2] for k in KC if k < i]]
assert DUPC == [4, 5]

# ---------------------------------------------------------------- exam 26S-A-Q16
Q = BANK["26S-A-Q16"]
assert Q["correctId"] == "b" and [o["id"] for o in Q["options"]] == list("abcde")
PASS = w.T("Passenger", ["passenger_id", "full_name", "city", "birth_year"],
           [[1, "Dana Levi", "Holon", 1990], [2, "Avi Cohen", "Haifa", 1985], [3, "Noa Bar", "Holon", 2001]],
           pk=["passenger_id"])
QDB = [PASS]
OPT = {o["id"]: o["value"] for o in Q["options"]}
RES = {}
for k, src in OPT.items():
    try:
        RES[k] = w.ev(src, QDB)
    except w.RAError:
        RES[k] = None
assert RES["a"] is None and RES["c"] is None and RES["e"] is None          # city / destination / full_name gone
assert [r[0] for r in RES["b"].rows] == ["Dana Levi", "Noa Bar"]
assert RES["d"] is not None and len(RES["d"]) == 0 and RES["d"].names == ["city"]   # valid, but asks the wrong thing
KQ = w.row_index(PASS, lambda r: r[2] == "Holon")
assert KQ == [0, 2]
OPTS = [(k, w.inl(v)) for k, v in OPT.items()]

N = w.crosscheck()
assert N >= 12

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נכיר את שתי הפעולות הבסיסיות של אלגברת היחסים: בחירה והיטל."),
    P("נראה איך כל אחת משנה טבלה, ולמה אחרי היטל צריך לספור רק ערכים שונים."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">A01 · אלגברה רלציונית</div><h1>σ ו-Π: בחירה והיטל</h1>'
         '<p>לבחור שורות עם σ ועמודות עם Π, לזכור ש-Π מוחק כפילויות, ולספור שורות ועמודות בתוצאה.</p>',
   layout="title")

idea = Scene("idea", "הרעיון", [
    P("אלגברת היחסים היא שפה של פעולות על טבלאות.", do=show("i-tab")),
    P("כל פעולה מקבלת יחס, כלומר טבלה, ומחזירה יחס חדש. אפשר להפעיל עליו עוד פעולה, וכך הלאה."),
    P("ויחס הוא **קבוצה** של שורות: אין בו שתי שורות זהות. זה יהיה חשוב עוד מעט.", do=show("i-c1")),
    P("הבחירה, $\\sigma$, משאירה רק חלק מה**שורות**. זה ה-WHERE של SQL.", do=show("i-c2")),
    P("וההיטל, $\\Pi$, משאיר רק חלק מה**עמודות**. זה SELECT DISTINCT.", do=show("i-c3"), hold=0.3),
    P("נעבוד עם טבלת סרטים: מזהה, שם, ז'אנר, ואורך בדקות.", say="נעבוד עם טבלת סרטים: מזהה, שם, ז'אנר, ואורך בדקות."),
], stage=w.stack(w.table("i-tab", MOVIE, hidden=True, fs=30)),
   panel=st.card("i-c1", "plain", "יחס = <b>קבוצה</b> של שורות, בלי כפילויות")
         + st.card("i-c2", "rule", "$\\sigma$ (בחירה): בוחרת <b>שורות</b>")
         + st.card("i-c3", "rule", "$\\Pi$ (היטל): בוחר <b>עמודות</b>"))

sigma = Scene("sigma", "בחירה σ", [
    P("נתחיל בבחירה: הסרטים מז'אנר אנימציה.", do=show("s-e1")),
    P("התנאי כתוב קטן מתחת ל-$\\sigma$, והטבלה בסוגריים אחריו."),
    P("$\\sigma$ עוברת על השורות **אחת אחת**, ובודקת את התנאי על כל שורה.", do=show(*w.ids("s-t", "hl", KEEP1))),
    P("שלוש שורות עומדות בתנאי. שלוש האחרות נמחקות.", do=show(*w.ids("s-t", "x", DROP1))),
    P("כמה עמודות נשארו? כל הארבע. בחירה לא נוגעת בעמודות.", do=show("s-c1"), hold=0.3),
    P("בתנאי אפשר לחבר כמה בדיקות. הסימן $\\land$ פירושו וגם: שני התנאים יחד.", do=hide("s-e1") + show("s-e2")
      + hide(*w.ids("s-t", "hl", KEEP1)) + hide(*w.ids("s-t", "x", DROP1))),
    P("אנימציה, וגם יותר ממאה דקות: נשארים קוקו ומכוניות.",
      do=show(*w.ids("s-t", "hl", K2)) + show(*w.ids("s-t", "x", [i for i in range(6) if i not in K2])),
      say="אנימציה, וגם יותר ממאה דקות: נשארים קוקו ומכוניות."),
    P("והסימן $\\lor$ פירושו או: מספיק שאחד יתקיים.", do=hide("s-e2") + show("s-e3")
      + hide(*w.ids("s-t", "hl", K2)) + hide(*w.ids("s-t", "x", [i for i in range(6) if i not in K2]))),
    P("מותחנים, או יותר ממאה וחמישים דקות: שלוש שורות.",
      do=show(*w.ids("s-t", "hl", K3)) + show(*w.ids("s-t", "x", [i for i in range(6) if i not in K3]))),
    P("הסרט היט עובר בגלל האורך, ושני המותחנים בגלל הז'אנר.", do=show("s-c2"), hold=0.3),
], stage=w.stack(w.swap(w.alg("s-e1", E_S1, size=38), w.alg("s-e2", E_S2, size=38), w.alg("s-e3", E_S3, size=38)),
                 w.table("s-t", MOVIE, fs=30), gap=24),
   panel=st.card("s-c1", "rule", "🔑 $\\sigma$ משנה רק את מספר ה<b>שורות</b>")
         + st.card("s-c2", "ex", "$\\land$ = וגם &nbsp;·&nbsp; $\\lor$ = או &nbsp;·&nbsp; $\\neg$ = לא"))

pi = Scene("pi", "היטל Π", [
    P("עכשיו היטל: רק עמודת הז'אנר.", do=show("p-e")),
    P("שלוש העמודות האחרות נמחקות. השורות לא מסוננות, אז נשארות שש.", do=show("p-t-col0", "p-t-col1", "p-t-col3")),
    P("אבל עכשיו יש שורות זהות: אנימציה מופיעה שלוש פעמים, ומותחן פעמיים.", do=show(*[f"p-t-c{i}-2" for i in (0, 2, 4, 1, 5)])),
    P("והתוצאה היא יחס, כלומר קבוצה. לכן $\\Pi$ **מוחק** את הכפילויות.", do=show(*w.ids("p-t", "dup", DUPS))),
    P("נשארות שלוש שורות בלבד: אנימציה, מותחן ופשע.", do=show("p-r")),
    P("זה בדיוק כמו SELECT DISTINCT. כשסופרים שורות אחרי היטל, סופרים **ערכים שונים**.", do=show("p-c1"), hold=0.4),
], stage=w.stack(w.alg("p-e", E_P, size=40),
                 w.row(w.table("p-t", MOVIE, fs=30), w.table("p-r", R_P, title="Π_{genre} (Movie)", hidden=True, fs=30),
                       gap=60), gap=24),
   panel=st.card("p-c1", "rule", "🔑 $\\Pi$ מוחק כפילויות.<br>סופרים <b>ערכים שונים</b>"))

order = Scene("order", "מבפנים החוצה", [
    P("ועכשיו שתי פעולות יחד: שמות הסרטים שאורכם מעל מאה ועשר דקות.", do=show("o-e")),
    P("פעולה חד-מקומית חלה על מה שבא **מיד אחריה**. לכן קוראים מבפנים החוצה.", do=show("o-c1")),
    P("קודם הבחירה: שלושה סרטים ארוכים.", do=show("o-e-m1") + show(*w.ids("o-t", "hl", KO))
      + show(*w.ids("o-t", "x", [i for i in range(6) if i not in KO]))),
    P("ואז ההיטל על השם: מלתעות, היט ומכוניות.", do=hide("o-e-m1") + show("o-e-m2", "o-r"),
      say="ואז ההיטל על השם: מלתעות, היט ומכוניות."),
    P("מה אם נהפוך את הסדר? קודם היטל לשם, ואחר כך בחירה לפי האורך.", do=show("o-bad")),
    P("אחרי ההיטל נשארה רק עמודת השם. אין יותר עמודת אורך, ואין על מה לבדוק את התנאי.", do=show("o-pt")),
    P("לכן הביטוי הזה **לא תקין**. אחרי $\\Pi$ אפשר לסנן רק לפי עמודה ששרדה.", do=show("o-c2", "o-bn"), hold=0.4),
], stage=w.stack(w.alg("o-e", E_O, size=38, marks=[("o-e-m1", "σ_{len > 110} (Movie)"), ("o-e-m2", "Π_{title}")]),
                 w.row(w.table("o-t", MOVIE, fs=26), w.table("o-r", R_O, title="", hidden=True, fs=26), gap=40),
                 w.row(w.stack(w.alg("o-bad", E_BAD, size=32), w.note("o-bn", "✗ לא תקין", cls="bad"), gap=4), w.table("o-pt", R_PT, title="", hidden=True, fs=22),
                       gap=30, align="center"), gap=18),
   panel=st.card("o-c1", "rule", "🔑 קוראים <b>מבפנים החוצה</b>: קודם $\\sigma$, אחר כך $\\Pi$")
         + st.card("o-c2", "trap", "⚠️ $\\sigma$ אחרי $\\Pi$: רק על עמודה שנשארה"))

count = Scene("count", "ספירת שורות", [
    P("שאלה נפוצה במבחן: כמה שורות וכמה עמודות יש בתוצאה?", do=show("c-e")),
    P("הז'אנרים של הסרטים שאורכם מעל מאה דקות."),
    P("הבחירה משאירה חמישה סרטים. רק הסרט ״למעלה״, שאורכו תשעים ושש דקות, נמחק.",
      do=show(*w.ids("c-t", "hl", KC)) + show("c-t-x0")),
    P("ההיטל לז'אנר נותן חמש שורות, אבל שתיים מהן חוזרות: אנימציה ומותחן.",
      do=show("c-t-col0", "c-t-col1", "c-t-col3") + show(*w.ids("c-t", "dup", DUPC))),
    P("לכן התוצאה: **שלוש** שורות ועמודה אחת.", do=show("c-r", "c-c1")),
    P("מי שעונה חמש, שכח שההיטל מוחק כפילויות. ומי שעונה ארבע עמודות, שכח את ההיטל.", do=show("c-c2"), hold=0.4),
], stage=w.stack(w.alg("c-e", E_C, size=38),
                 w.row(w.table("c-t", MOVIE, fs=28), w.table("c-r", R_C, title="", hidden=True, fs=28), gap=60),
                 gap=24),
   panel=st.card("c-c1", "ex", "$3$ שורות, עמודה $1$")
         + st.card("c-c2", "trap", "⚠️ $5$ = שכחו את מחיקת הכפילויות"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: טבלת נוסעים, עם מזהה, שם מלא, עיר ושנת לידה.", do=show("x-t")),
    P("איזה ביטוי מחזיר את שמות הנוסעים שגרים בחולון?"),
    P("הדרך הנכונה: קודם בוחרים את השורות של חולון, ורק אז מקרינים על השם.",
      do=show(*w.ids("x-t", "hl", KQ)) + show("q-ok-b")),
    P("על הנתונים לדוגמה: דנה לוי ונועה בר.", do=show("x-r")),
    P("הביטוי שמקרין קודם על השם, ואחר כך בודק את העיר, לא תקין: העיר כבר נמחקה.", do=show("q-x-a", "q-n-a")),
    P("גם הבחירה לפי יעד לא תקינה. לטבלת הנוסעים אין עמודת יעד בכלל.", do=show("q-x-c", "q-n-c")),
    P("ושתי האפשרויות שמחליפות בין שם לעיר: אחת מחפשת נוסע ששמו חולון, ומחזירה ריק.", do=show("q-x-d", "q-n-d")),
    P("והשנייה מקרינה על העיר, ואז בודקת את השם, שכבר לא קיים.", do=show("q-x-e", "q-n-e"), hold=0.6),
], stage=w.stack(w.table("x-t", PASS, fs=28, hidden=True),
                 w.table("x-r", RES["b"], title="", hidden=True, fs=28), gap=40),
   panel=f'<div class="qstem ra-qs"><span class="qid">{Q["id"]}</span>איזה ביטוי מחזיר את שמות הנוסעים '
         'המתגוררים בעיר Holon?</div>'
         + f'<div class="ra-opts">{st.options("q", OPTS, notes={"a": "city נמחקה", "c": "אין destination", "d": "ריק", "e": "full_name נמחקה"})}</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: $\\sigma$ בוחרת שורות לפי תנאי, שנבדק על כל שורה לבד. העמודות לא משתנות.", do=show("r-1")),
    P("$\\Pi$ בוחר עמודות, ומוחק שורות כפולות, כי יחס הוא קבוצה.", do=show("r-2")),
    P("קוראים מבפנים החוצה, ואחרי היטל אפשר לסנן רק לפי עמודה שנשארה.", do=show("r-3")),
    P("ובספירת שורות סופרים ערכים שונים. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.stack(w.alg(None, E_O, size=40, hidden=False)),
   panel=st.card("r-1", "rule", "🔑 $\\sigma$: שורות")
         + st.card("r-2", "rule", "🔑 $\\Pi$: עמודות, בלי כפילויות")
         + st.card("r-3", "trap", "⚠️ מבפנים החוצה")
         + st.card("r-4", "ex", "ספירה = ערכים שונים"))

VIDEO = Video("A01", "alg", "σ ו-Π: בחירה והיטל", [title, idea, sigma, pi, order, count, exam, recap], bank={"26S-A-Q16": "b"})
