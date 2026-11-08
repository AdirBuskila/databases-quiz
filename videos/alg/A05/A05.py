# -*- coding: utf-8 -*-
"""A05 · מקסימום ומינימום — video script (build: tools/video/vid.py A05).

Source: alg/levels/A05.js (goal: the extremum pattern Π(T) − Π_{T1} σ_{T1 > T2}(ρ_{T1} T × ρ_{T2} T): everyone minus
whoever "loses" a comparison; the projected copy and the sign decide min or max; ties stay). Exam anchor: 26Z-CL-Q14
(oldest listener in each country: the equality on country inside the σ; key d), which no guided quiz cites. Every option
is evaluated on a five-listener instance with three countries.
Avoided on purpose: the A05 quiz data (Emp) and the exam items its quiz and lesson use (25B-A-Q13, 22B-A-Q13), and
21B-A-Q15 (solved in the A09 boss video). Worked example: Car(cid, model, price) (new). Every expression is evaluated by
w_alg.ev and cross-checked against tools/ralib.js.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_alg as w

# ---------------------------------------------------------------- data (new)
CAR = w.T("Car", ["cid", "model", "price"], [[1, "Fiat", 90], [2, "Kia", 120], [3, "Seat", 90], [4, "Audi", 200]],
          pk=["cid"])
DB = [CAR]
PROD = "ρ_{C1} Car × ρ_{C2} Car"
R_X = w.ev(PROD, DB)
assert len(R_X) == 16
WIN = [i for i, r in enumerate(R_X.rows) if r[2] > r[5]]
assert WIN == [4, 6, 12, 13, 14]
E_LOSE = "Π_{C1.cid} σ_{C1.price > C2.price} (" + PROD + ")"
R_LOSE = w.ev(E_LOSE, DB)
assert R_LOSE.values() == {2, 4}                                      # everyone with someone cheaper
E_MIN = "Π_{cid} (Car) − " + E_LOSE
R_MIN = w.ev(E_MIN, DB)
assert R_MIN.values() == {1, 3}                                       # both cheapest (a tie: 90)
R_ALL = w.ev("Π_{cid} (Car)", DB)
E_MAX = "Π_{cid} (Car) − Π_{C2.cid} σ_{C1.price > C2.price} (" + PROD + ")"
assert w.ev(E_MAX, DB).values() == {4}
# the four combinations of projected copy and sign
RULE = {("C1", ">"): {1, 3}, ("C2", "<"): {1, 3}, ("C1", "<"): {4}, ("C2", ">"): {4}}
for (cp, sg), want in RULE.items():
    e = f"Π_{{cid}} (Car) − Π_{{{cp}.cid}} σ_{{C1.price {sg} C2.price}} ({PROD})"
    assert w.ev(e, DB).values() == want, (cp, sg)
assert w.invalid("(" + PROD + ") − " + E_LOSE, DB)                     # a product first: 6 columns vs 1

# ---------------------------------------------------------------- exam 26Z-CL-Q14
Q = BANK["26Z-CL-Q14"]
assert Q["correctId"] == "d" and [o["id"] for o in Q["options"]] == list("abcde")
LIS = w.T("listener", ["listener_id", "name", "country", "age"],
          [[1, "Ann", "IL", 30], [2, "Ben", "IL", 25], [3, "Cara", "US", 40], [4, "Dan", "US", 22], [5, "Eli", "FR", 19]],
          pk=["listener_id"])
QDB = [LIS]
OPT = {o["id"]: o["value"] for o in Q["options"] if o["type"] == "algebra"}
RES = {k: w.ev(v, QDB).values() for k, v in OPT.items()}
assert RES == {"a": {3}, "b": {1, 3}, "c": {2, 4, 5}, "d": {1, 3, 5}}
R_D = w.ev(OPT["d"], QDB)
SUB = "Π_{L1.listener_id}(σ_{L1.country = L2.country ∧ L1.age < L2.age}(ρ_{L1}(listener) × ρ_{L2}(listener)))"
assert SUB in OPT["d"]
R_SUB = w.ev(SUB, QDB)
assert R_SUB.values() == {2, 4}                                       # has an older listener in the same country
OPTS = [(o["id"], w.inl(o["value"]) if o["type"] == "algebra" else o["value"]) for o in Q["options"]]

N = w.crosscheck()
assert N >= 14

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נמצא את הערך הגבוה ביותר, או הנמוך ביותר, באלגברת היחסים."),
    P("אין כאן פונקציית מקסימום. במקום זה נבנה תבנית אחת, ונלמד לקרוא אותה בשתי הדרכים."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">A05 · אלגברה רלציונית</div><h1>מקסימום ומינימום</h1>'
         '<p>לבנות ולקרוא את תבנית הקיצון: כולם פחות מי ש"מפסיד" בהשוואה עם עותק של אותה טבלה.</p>', layout="title")

idea = Scene("idea", "הרעיון", [
    P("טבלת מכוניות: מזהה, דגם ומחיר. איזו מכונית הכי זולה?", do=show("i-t")),
    P("באלגברה אין מקסימום ואין מינימום. אבל יש דרך עקיפה."),
    P("המכונית הזולה ביותר היא זו ש**אין** מכונית זולה ממנה.", do=show("i-c1")),
    P("זו בדיוק המחשבה מאחורי קטן או שווה לכל הערכים, ALL, ב-SQL. כאן נבנה אותה מפעולות שכבר מכירים.",
      say="זו בדיוק המחשבה מאחורי קטן או שווה לכל הערכים, אוֹל, באֶס קְיוּ אֶל. כאן נבנה אותה מפעולות שכבר מכירים."),
    P("אז נמצא קודם את כל מי שיש מכונית זולה ממנו, ונחסיר אותם מכולם.", do=show("i-c2"), hold=0.3),
], stage=w.stack(w.table("i-t", CAR, hidden=True, fs=34)),
   panel=st.card("i-c1", "rule", "🔑 מינימום = מי ש<b>אין</b> זול ממנו")
         + st.card("i-c2", "ex", "כולם $-$ מי שיש זול ממנו"))

build = Scene("build", "בונים את התבנית", [
    P("שלב ראשון: שני עותקים, ומכפלה. שש עשרה שורות, כל זוג מכוניות.", do=show("b-e1", "b-t")),
    P("שלב שני: בחירה. המחיר בעותק הראשון **גדול** מהמחיר בעותק השני.",
      do=hide("b-e1") + show("b-e2") + show(*w.ids("b-t", "hl", WIN)) + show(*w.ids("b-t", "x", [i for i in range(16) if i not in WIN]))),
    P("נשארו חמישה זוגות. בכל אחד, המכונית משמאל יקרה יותר מזו שמימין."),
    P("למשל קיה מול פיאט: מאה עשרים מול תשעים. ואאודי מופיעה שלוש פעמים, מול כל השאר.", do=show("b-t-c4-1", "b-t-c4-4"),
      say="למשל קִיָה מול פִיאַט: מאה עשרים מול תשעים. ואַאוּדִי מופיעה שלוש פעמים, מול כל השאר."),
    P("ופיאט לא מופיעה אף פעם משמאל: אין מכונית זולה ממנה.", do=hide("b-t-c4-1", "b-t-c4-4"),
      say="ופִיאַט לא מופיעה אף פעם משמאל: אין מכונית זולה ממנה."),
    P("שלב שלישי: מקרינים על המזהה של העותק **הראשון**: שתיים וארבע. לכל אחת מהן יש מכונית זולה ממנה.",
      do=hide("b-e2") + show("b-e3", "b-l")),
    P("שלב אחרון: כל המזהים, פחות אלה. נשארות אחת ושלוש.", do=hide("b-e3") + show("b-e4", "b-r")),
    P("שתיהן עולות תשעים. זה **תיקו**, ושתיהן נשארות, כי אף אחת לא זולה מהשנייה.", do=show("b-c1"), hold=0.4),
], stage=w.stack(w.swap(w.alg("b-e1", PROD, size=34), w.alg("b-e2", "σ_{C1.price > C2.price} (" + PROD + ")", size=30),
                        w.alg("b-e3", E_LOSE, size=28), w.alg("b-e4", E_MIN, size=24), h=54),
                 w.row(w.table("b-t", R_X, title="", hidden=True, fs=19, qual=True),
                       w.stack(w.table("b-l", R_LOSE, title="Π_{C1.cid}", hidden=True, fs=26),
                               w.table("b-r", R_MIN, title="Π_{cid} (Car) − …", hidden=True, fs=26), gap=24),
                       gap=50), gap=8),
   panel=st.card("b-c1", "rule", "🔑 תיקו: כל השוות נשארות"))

rule = Scene("rule", "מינימום או מקסימום", [
    P("איך יודעים אם ביטוי כזה מחזיר מינימום או מקסימום? שואלים: מי **נמחק**?"),
    P("מקרינים את העותק הראשון, והתנאי אומר שהוא **גדול**. אז נמחקים הגדולים, ונשאר המינימום.", do=show("u-1")),
    P("הופכים **אחד** מהשניים: את הסימן, או את העותק שמקרינים. עכשיו נמחקים הקטנים, ונשאר המקסימום.",
      do=show("u-2", "u-3")),
    P("והופכים את **שניהם**? חוזרים למינימום.", do=show("u-4")),
    P("בדקנו את ארבעת הצירופים על המכוניות: פעמיים אחת ושלוש, ופעמיים ארבע, האאודי.", do=show("u-c1"),
      say="בדקנו את ארבעת הצירופים על המכוניות: פעמיים אחת ושלוש, ופעמיים ארבע, האַאוּדִי."),
    P("ועוד: הביטוי תמיד **מתחיל** בהיטל של כל הטבלה, פחות. מכפלה בהתחלה היא חסרת פשר.", do=show("u-c2"), hold=0.4),
], stage=w.stack(*[w.row(w.alg(None, f"Π_{{{cp}.cid}} σ_{{C1.price {sg} C2.price}}", size=34, hidden=False),
                         w.note(None, ("מינימום" if RULE[(cp, sg)] == {1, 3} else "מקסימום"),
                                cls="ok" if RULE[(cp, sg)] == {1, 3} else "bad", hidden=False),
                         gap=30, align="center", id_=f"u-{k + 1}", hidden=True)
                   for k, (cp, sg) in enumerate([("C1", ">"), ("C1", "<"), ("C2", ">"), ("C2", "<")])], gap=26),
   panel=st.card("u-c1", "rule", "🔑 מי שמוקרן ו\"מנצח\" בתנאי <b>נמחק</b>")
         + st.card("u-c2", "trap", "⚠️ תמיד מתחילים כך: <span class=\"ra-ltr\">Π(T) − …</span>"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: טבלת מאזינים, עם מדינה וגיל. מי **המאזין המבוגר ביותר בכל מדינה**?", do=show("x-t")),
    P("״בכל מדינה״ אומר שמשווים רק בין מאזינים **מאותה מדינה**. לכן בבחירה צריך גם שוויון של המדינה."),
    P("נעבור על הנתונים. בישראל אן בת שלושים, ובן בגיל עשרים וחמש. לבן יש מישהי מבוגרת ממנו, אז הוא נמחק.",
      do=show("x-t-t0", "x-t-t1", "x-t-x1"), say="נעבור על הנתונים. בישראל אַן בת שלושים, ובֶּן בגיל עשרים וחמש. לבֶּן יש מישהי מבוגרת ממנו, אז הוא נמחק."),
    P("בארצות הברית קרה בת ארבעים ודן בן עשרים ושתיים: דן נמחק.", do=show("x-t-t2", "x-t-t3", "x-t-x3"),
      say="בארצות הברית קָרָה בת ארבעים ודָן בן עשרים ושתיים: דָן נמחק."),
    P("החלק שמחסירים מחזיר בדיוק אותם: שתיים וארבע.", do=show("x-s", "x-t-t4")),
    P("נשארים המבוגרים בכל מדינה: אחת, שלוש וחמש. אלי לבד בצרפת, אין לו עם מי להשוות, ולכן הוא נשאר.",
      do=show("x-r", "q-ok-d")),
    P("בלי תנאי המדינה, נשאר רק המבוגר ביותר בכלל: קרה.", do=show("q-x-a", "q-n-a")),
    P("בלי ההפרש, ועם ״גדול״, מקבלים את כל מי שמבוגר ממישהו במדינתו: אחת ושלוש.", do=show("q-x-b", "q-n-b")),
    P("ועם ״גדול״ ועם ההפרש, נמחקים המבוגרים, ונשאר **הצעיר** בכל מדינה.", do=show("q-x-c", "q-n-c"), hold=0.6),
], stage=w.stack(f'<div class="qstem ra-qs"><span class="qid">{Q["id"]}</span>המזהים של <b>המאזין המבוגר ביותר בכל מדינה</b>?</div>',
                 f'<div class="ra-opts" style="width:100%">{st.options("q", OPTS, notes={"a": "בכלל", "b": w.ltr("{1, 3}"), "c": "הצעיר"})}</div>',
                 gap=10),
   panel=w.stack(w.table("x-t", LIS, hidden=True, fs=26, tags={0: "IL", 1: "IL", 2: "US", 3: "US", 4: "FR"}, tagw=50),
                 w.row(w.table("x-s", R_SUB, title="Π_{L1.listener_id} σ_{…}", hidden=True, fs=26),
                       w.table("x-r", R_D, title="", hidden=True, fs=26), gap=70), gap=30))

recap = Scene("recap", "סיכום", [
    P("לסיכום: אין מקסימום ומינימום. לוקחים את כולם, ומחסירים את מי שמפסיד בהשוואה עם עותק שני.", do=show("r-1")),
    P("מי שמוקרן ומנצח בתנאי, נמחק. הופכים סימן או עותק, ומחליפים בין מינימום למקסימום.", do=show("r-2")),
    P("תיקו: כולם נשארים. ו״בכל קבוצה״: מוסיפים שוויון על הקבוצה בתוך הבחירה. נתראה ברמה הבאה.", do=show("r-3"),
      hold=0.6),
], stage=w.stack(w.alg(None, E_MIN, size=26, hidden=False)),
   panel=st.card("r-1", "rule", "🔑 כולם $-$ מי שמפסיד")
         + st.card("r-2", "rule", "🔑 הפוך אחד: מינימום ↔ מקסימום")
         + st.card("r-3", "trap", "⚠️ \"בכל מדינה\": שוויון בתנאי"))

VIDEO = Video("A05", "alg", "מקסימום ומינימום", [title, idea, build, rule, exam, recap], bank={"26Z-CL-Q14": "d"})
