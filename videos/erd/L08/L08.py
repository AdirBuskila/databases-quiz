# -*- coding: utf-8 -*-
"""L08 · קשרים מיוחדים — video script (build: tools/video/vid.py L08).

Source: erd/levels/L08.js (goal: a recursive relationship with roles, a ternary relationship, an attribute on a
relationship, and what the diagram cannot enforce).
Exam anchor: 26Z-CL-Q2 (key c: the key of R3 is {KeyC, KeyE, DiscW_1}); the context is the bank's own `erd` spec,
drawn with w_erd at video size by w_erd.relayout (same nodes, flags and edges, coordinates spread; asserted), and the
key is computed by w_erd.translate. Not a quiz id. The same diagram's Q4 is solved in L09 and its Q1 in the L10 boss.
Avoided on purpose: 21B-C-Q4 (twin of L08-Q2: no "mentor" example), 24B-A-Q3, 25B-A-Q1/Q2/Q3, and the L08 quiz /
lesson diagrams (נושא/נושא אב, מנכ״ל/חונך, ספק/חלק/פרויקט, שחקן/סרט, נהג/אוטובוס/מסוף, סטודנט/קורס/מרצה,
עובד/מנהל).
Worked examples: users who follow / invite users (recursive N:M and 1:N); teacher-subject-class (ternary, an arrow,
an attribute on the relationship).
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_erd as w

SOC = {"w": 1000, "h": 520, "nodes": [
    {"id": "U", "t": "entity", "x": 300, "y": 260, "label": "משתמש"},
    {"id": "uid", "t": "attr", "x": 110, "y": 260, "label": "מס' משתמש", "key": True, "of": "U"},
    {"id": "F", "t": "rel", "x": 720, "y": 110, "label": "עוקב אחרי"},
    {"id": "I", "t": "rel", "x": 720, "y": 410, "label": "הזמין את"},
], "edges": [{"a": "F", "b": "U", "label": "עוקב", "pts": [[300, 110]], "labelSide": -1},
             {"a": "F", "b": "U", "label": "נעקב"},
             {"a": "I", "b": "U", "label": "מוזמן"},
             {"a": "I", "b": "U", "label": "מזמין", "pts": [[300, 410]], "arrow": True}]}
D1 = w.Diagram("u", SOC, hidden=["I"])
S_INV = D1.reveal("I")
T1, H1, _ = w.translate(SOC)
TX1 = [w.schema_text(t) for t in T1]
assert TX1 == ["משתמש([u]מס' משתמש[/u], מס' משתמש מזמין)",
               "עוקב אחרי([u]מס' משתמש עוקב[/u], [u]מס' משתמש נעקב[/u])"], TX1
assert H1["I"] is T1[0] and H1["F"] is T1[1]
SCH1 = "".join(w.schema_line(f"a{i}", t, extra_cls="sm") for i, t in enumerate(T1))

TEACH = {"w": 1060, "h": 470, "nodes": [
    {"id": "T", "t": "entity", "x": 150, "y": 250, "label": "מורה"},
    {"id": "tid", "t": "attr", "x": 150, "y": 120, "label": "ת״ז מורה", "key": True, "of": "T"},
    {"id": "TC", "t": "rel", "x": 500, "y": 250, "label": "מלמד"},
    {"id": "hrs", "t": "attr", "x": 500, "y": 120, "label": "שעות שבועיות", "of": "TC"},
    {"id": "SB", "t": "entity", "x": 870, "y": 250, "label": "מקצוע"},
    {"id": "sbid", "t": "attr", "x": 870, "y": 120, "label": "קוד מקצוע", "key": True, "of": "SB"},
    {"id": "CL", "t": "entity", "x": 500, "y": 410, "label": "כיתה"},
    {"id": "clid", "t": "attr", "x": 790, "y": 410, "label": "מס' כיתה", "key": True, "of": "CL"},
], "edges": [{"a": "TC", "b": "T"}, {"a": "TC", "b": "SB"}, {"a": "TC", "b": "CL"}]}
TEACH_A = {**TEACH, "edges": [{"a": "TC", "b": "T", "arrow": True}, {"a": "TC", "b": "SB"}, {"a": "TC", "b": "CL"}]}
D2 = w.Diagram("t", TEACH)
D2A = w.Diagram("ta", TEACH_A)
T2, H2, _ = w.translate(TEACH)
T2A, H2A, _ = w.translate(TEACH_A)
assert w.schema_text(H2["TC"]) == "מלמד([u]ת״ז מורה[/u], [u]קוד מקצוע[/u], [u]מס' כיתה[/u], שעות שבועיות)"
assert w.schema_text(H2A["TC"]) == "מלמד(ת״ז מורה, [u]קוד מקצוע[/u], [u]מס' כיתה[/u], שעות שבועיות)"
assert len(T2A) == len(T2) == 4                       # a ternary relationship keeps its table, arrow or not
TERN = w.schema_line("tn", H2["TC"], extra_cls="sm")
TERNA = w.schema_line("tna", H2A["TC"], extra_cls="sm")

# ---------------------------------------------------------------- exam 26Z-CL-Q2
Q = BANK["26Z-CL-Q2"]
assert Q["correctId"] == "c" and Q["contextId"] == "26Z-CL-erd"
import json, pathlib
_ctx = json.loads((pathlib.Path(w.__file__).resolve().parents[2] / "questions.json").read_text(encoding="utf-8"))
SRC = _ctx["contexts"]["26Z-CL-erd"]["erd"]
BIG = w.relayout(SRC, 1.1, 1.28, moves={"pC2": (-14, 0), "pD": (-8, 0)})
DX = w.Diagram("z", BIG, fs=20)
ZT, ZH, _ = w.translate(SRC)
R3 = ZH["R3"]
assert R3.why == "קשר טרינארי" and set(R3.key) == {"KeyC", "KeyE", "DiscW_1"} and "KeyD" in [c.name for c in R3.cols]
OPT_SETS = {o["id"]: set(o["value"].strip("{}").replace(" ", "").split(",")) for o in Q["options"] if "{" in o["value"]}
assert [k for k, v in OPT_SETS.items() if v == set(R3.key)] == ["c"]
OPTS = w.bank_opts(Q, ltr=True)

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נכיר קשרים שלא מחברים פשוט שתי ישויות שונות."),
    P("קשר של ישות עם עצמה, קשר של שלוש ישויות, ותכונה שיושבת על קשר."),
    P("ובסוף נפתור שאלה מורכבת, שמשלבת קשר טרינארי עם ישות חלשה ועם תת סוג.", hold=0.4),
], stage='<div class="kicker">L08 · מודל ERD</div><h1>קשרים מיוחדים</h1>'
         '<p>קשר רקורסיבי עם תפקידים, קשר טרינארי, תכונה על קשר, ומה התרשים לא יכול לאכוף.</p>', layout="title")

rec = Scene("rec", "קשר רקורסיבי", [
    P("רשת חברתית: משתמשים עוקבים אחרי משתמשים. זה קשר בין **שני מופעים של אותה ישות**."),
    P("מציירים מעוין שמחובר **פעמיים** לאותו מלבן. ועל כל קו כותבים את **התפקיד**: עוקב, ונעקב.",
      do=show(D1.he("F", "U"), D1.he("F", "U", 2))),
    P("אין חצים: משתמש עוקב אחרי הרבה משתמשים, ויש לו הרבה עוקבים. אז זה רבים לרבים, והוא הופך לטבלה.",
      do=hide(D1.he("F", "U"), D1.he("F", "U", 2)) + show("a1")),
    P("ובטבלה מופיע **אותו מפתח פעמיים**, פעם לכל תפקיד: מספר המשתמש העוקב, ומספר המשתמש הנעקב.", do=show("a1-hi")),
    P("עכשיו קשר נוסף: משתמש הזמין משתמש אחר להצטרף.", do=hide("a1-hi") + show(*S_INV)),
    P("על קו התפקיד מזמין יש חץ. כלומר לכל משתמש מוזמן יש מזמין **אחד לכל היותר**.",
      do=show(D1.he("I", "U", 2))),
    P("זה קשר אחד לרבים, אז אין טבלה. מוסיפים לטבלת המשתמש עמודה שמפנה **לאותה טבלה**: מספר המשתמש שהזמין.",
      do=hide(D1.he("I", "U", 2)) + show("a0", "a0-hi", "r-c1")),
    P("בלי התפקידים, אי אפשר לדעת מי הזמין את מי. לכן כותבים אותם על הקווים.", do=hide("a0-hi"), hold=0.4),
], stage=w.stack(D1.svg(), '<div class="er-schemas">' + SCH1 + '</div>', gap=14),
   panel=st.card("r-c1", "rule", "🔑 רקורסיבי <span class='er-code'>1:N</span> ← מפתח זר לאותה טבלה · N:M ← טבלה, המפתח פעמיים"))

tern = Scene("tern", "קשר טרינארי", [
    P("ועכשיו מעוין אחד שמחבר **שלוש** ישויות: מורה מלמד מקצוע בכיתה. זה קשר **טרינארי**."),
    P("שורה אחת בקשר: המורה הזה מלמד את המקצוע הזה, בכיתה הזאת. שלושתם יחד."),
    P("בלי חצים, כל צירוף יכול להופיע. אז המפתח של הטבלה הוא **שלושת המפתחות**.", do=show("tn", "tn-hi", "n-1")),
    P("ושעות שבועיות? הן תלויות בצירוף כולו. אותו מורה, במקצוע אחר, מלמד מספר שעות אחר.",
      do=hide("tn-hi") + show(*D2.hn("hrs"))),
    P("זה המבחן לתכונה על קשר: אם הערך משתנה כשמחליפים אחת מהישויות המשתתפות, ושאר הצירוף נשאר, התכונה שייכת לקשר.", do=show("n-2")),
    P("עכשיו נוסיף חץ אל המורה.", do=hide(*D2.hn("hrs"), "t-wrap") + show("ta-wrap")),
    P("בקשר טרינארי, חץ אל X אומר: **לכל צירוף של שתי האחרות** יש X אחד לכל היותר.", do=show("n-3"),
      say="בקשר טרינארי, חץ אל ישות אומר: לכל צירוף של שתי האחרות, יש ממנה מופע אחד לכל היותר."),
    P("כאן: לכל מקצוע בכל כיתה יש מורה אחד לכל היותר. אז המורה כבר לא נדרש כדי לזהות שורה.",
      do=show(*D2A.hn("T"), D2A.he("TC", "T"))),
    P("הוא **יוצא מהמפתח**, ונשאר עמודה רגילה. המפתח: קוד מקצוע ומספר כיתה.", do=show("tna", "tna-hi")),
    P("והטבלה נשארת. החץ משנה את המפתח, ולא מבטל את הטבלה של קשר טרינארי.", do=hide("tna-hi"), hold=0.4),
], stage=w.stack('<div class="er-swap2"><div id="t-wrap">' + D2.svg() + '</div><div id="ta-wrap" class="h er-over">' + D2A.svg() + '</div></div>',
                 '<div class="er-schemas">' + TERN + TERNA + '</div>', gap=14),
   panel=st.card("n-1", "rule", "🔑 טרינארי בלי חצים ← מפתח = שלושת המפתחות")
         + st.card("n-2", "ex", "ערך שתלוי בצירוף ← תכונה של הקשר")
         + st.card("n-3", "rule", "🔑 חץ אל X ← X יוצא מהמפתח, הטבלה נשארת"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה מתרגול מבחן, על תרשים גדול. מה יהיה המפתח הראשי של הטבלה של $R_3$?"),
    P("$R_3$ הוא קשר טרינארי: הוא מחבר את $C_2$, את $W$ ואת $D$.", do=show(*DX.hn("R3", "C2", "W", "D"))),
    P("יש בו חץ אל $D$. אז לכל צירוף של $C_2$ ו-$W$, יש $D$ אחד לכל היותר, ו-$D$ יוצא מהמפתח.",
      do=hide(*DX.hn("C2", "W")) + show(DX.he("R3", "D"))),
    P("זה פוסל את האפשרות עם ארבעת השדות, שהשאירה את המפתח של $D$.", do=show("q-x-a", "q-n-a")),
    P("ופוסל גם את האפשרות שאין טבלה בכלל: קשר טרינארי לא מתמזג לישות, גם כשיש בו חץ.", do=show("q-x-e", "q-n-e")),
    P("עכשיו המפתח של $C_2$. הוא תת סוג של $C$, ולכן אין לו מפתח משלו. הוא יורש את המפתח של $C$.",
      do=hide(*DX.hn("R3", "D"), DX.he("R3", "D")) + show(*DX.hn("C2", "isa", "kC"))),
    P("אז האפשרות עם מפתח של $C_2$ נופלת: אין תכונה כזאת בכלל.", do=show("q-x-d", "q-n-d")),
    P("ו-$W$ היא ישות חלשה, של $E$, דרך הקשר המזהה $R_4$. המפתח שלה: המבחין, ועוד המפתח של $E$.",
      do=hide(*DX.hn("C2", "isa", "kC")) + show(*DX.hn("W", "dW", "R4", "kE"))),
    P("אז המפתח של $R_3$: המפתח של $C$, המפתח של $E$, והמבחין של $W$. שלושה שדות.", do=show("q-ok-c")),
    P("והמלכודת: לקחת את המבחין לבד. מפתח של ישות חלשה כולל תמיד את מפתח הבעלים.", do=show("q-x-b", "q-n-b"),
      hold=0.4),
], stage=DX.svg(),
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q["id"] + '</span>מה יהיה המפתח הראשי של הטבלה של '
         '<span class="er-code">R3</span>?</div></div>'
         + '<div class="er-osm">' + st.options("q", OPTS, notes={"a": "החץ", "b": "בלי בעלים", "d": "אין כזה",
                                                                  "e": "טרינארי"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: קשר רקורסיבי מחבר ישות לעצמה, ועל כל קו כותבים תפקיד.", do=show("r-1")),
    P("רקורסיבי עם חץ הוא מפתח זר לאותה טבלה. בלי חץ, טבלה עם המפתח פעמיים.", do=show("r-2")),
    P("קשר טרינארי תמיד טבלה. חץ אל ישות מוציא אותה מהמפתח.", do=show("r-3")),
    P("ותכונה שתלויה בצירוף כולו יושבת על הקשר. נתראה בשלב הבא, על הקבצה.",
      do=show("r-4"), hold=0.6),
], stage=w.Diagram("tr", TEACH).svg(),
   panel=st.card("r-1", "rule", "🔑 רקורסיבי: מעוין פעמיים + תפקידים")
         + st.card("r-2", "rule", "🔑 עם חץ ← מפתח זר לאותה טבלה")
         + st.card("r-3", "rule", "🔑 טרינארי ← תמיד טבלה")
         + st.card("r-4", "ex", "ערך שתלוי בצירוף ← תכונה של הקשר"))

VIDEO = Video("L08", "erd", "קשרים מיוחדים", [title, rec, tern, exam, recap], bank={"26Z-CL-Q2": "c"})
