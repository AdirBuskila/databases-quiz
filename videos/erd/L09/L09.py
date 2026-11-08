# -*- coding: utf-8 -*-
"""L09 · צבירה (הקבצה) — video script (build: tools/video/vid.py L09).

Source: erd/levels/L09.js (goal: read a relationship that takes part in another one: the aggregation's key, the key
of the relationship on it, and what an arrow changes).
Exam anchor: 26Z-CL-Q4 (key c: R1(KeyA, KeyB, PropR1_1, KeyC) — R2 merges into R1, the aggregation's table); the
context is the bank's own `erd` spec, drawn by w_erd.relayout at video size (same content, asserted) and translated
by w_erd.translate. Not a quiz id. Avoided on purpose: 25C-A-Q1/Q2 and 26B-A-Q2 (cited by L09 questions), and the
L09 quiz / lesson diagrams (A-R1-B with C, סטודנט-עובד על-פרויקט with מנחה). 26Z-CL-Q3 (the R2 reading) is not
solved: only R2's arrow and double line are used, for the merge.
Worked example: contestants in competitions (aggregation) scored by judges: N:M (3 key fields), then with an arrow to
the judge (merged into the aggregation's table).
"""
from vid import P, Scene, Video, show, hide, BANK
import json, pathlib
import stage as st
import w_erd as w

COMP = {"w": 1060, "h": 520, "nodes": [
    {"id": "G", "t": "agg", "x": 400, "y": 160, "w": 770, "h": 290, "label": "מתחרה - משתתף ב - תחרות"},
    {"id": "CT", "t": "entity", "x": 130, "y": 190, "label": "מתחרה"},
    {"id": "ctid", "t": "attr", "x": 130, "y": 100, "label": "מס' מתחרה", "key": True, "of": "CT"},
    {"id": "RP", "t": "rel", "x": 400, "y": 190, "label": "משתתף ב"},
    {"id": "CP", "t": "entity", "x": 665, "y": 190, "label": "תחרות"},
    {"id": "cpid", "t": "attr", "x": 600, "y": 100, "label": "קוד תחרות", "key": True, "of": "CP"},
    {"id": "SC", "t": "rel", "x": 400, "y": 390, "label": "מעניק ציון"},
    {"id": "sc", "t": "attr", "x": 220, "y": 470, "label": "ציון", "of": "SC"},
    {"id": "J", "t": "entity", "x": 800, "y": 390, "label": "שופט"},
    {"id": "jid", "t": "attr", "x": 960, "y": 470, "label": "מס' שופט", "key": True, "of": "J"},
], "edges": [{"a": "RP", "b": "CT"}, {"a": "RP", "b": "CP"}, {"a": "SC", "b": "G"}, {"a": "SC", "b": "J"}]}
COMP_A = {**COMP, "edges": COMP["edges"][:3] + [{"a": "SC", "b": "J", "arrow": True}]}
D1 = w.Diagram("c", COMP, hidden=["SC", "sc", "J", "jid"])
S_SC = D1.reveal("SC", "sc", "J", "jid")
T1, H1, _ = w.translate(COMP)
assert w.schema_text(H1["RP"]) == "משתתף ב([u]מס' מתחרה[/u], [u]קוד תחרות[/u])"
assert w.schema_text(H1["SC"]) == "מעניק ציון([u]מס' מתחרה[/u], [u]קוד תחרות[/u], [u]מס' שופט[/u], ציון)"
assert len(H1["SC"].key) == 3
assert [t.name for t in T1] == ["מתחרה", "תחרות", "שופט", "משתתף ב", "מעניק ציון"]
T2, H2, _ = w.translate(COMP_A)
assert H2["SC"] is H2["RP"] and len(T2) == len(T1) - 1                     # merged into the aggregation's table
assert w.schema_text(H2["RP"]) == "משתתף ב([u]מס' מתחרה[/u], [u]קוד תחרות[/u], מס' שופט, ציון)"
D2 = w.Diagram("ca", COMP_A)
SC1 = w.schema_line("k1", H1["SC"], extra_cls="sm")
SC0 = w.schema_line("k0", H1["RP"], extra_cls="sm")
SC2 = w.schema_line("k2", H2["RP"], extra_cls="sm")

# ---------------------------------------------------------------- exam 26Z-CL-Q4
Q = BANK["26Z-CL-Q4"]
assert Q["correctId"] == "c" and Q["contextId"] == "26Z-CL-erd"
_ctx = json.loads((pathlib.Path(w.__file__).resolve().parents[2] / "questions.json").read_text(encoding="utf-8"))
SRC = _ctx["contexts"]["26Z-CL-erd"]["erd"]
BIG = w.relayout(SRC, 1.1, 1.28, moves={"pC2": (-14, 0), "pD": (-8, 0)})
DX = w.Diagram("z", BIG, fs=20)
ZT, ZH, _ = w.translate(SRC)
R1 = ZH["R1"]
assert ZH["R2"] is R1 and [c.name for c in R1.cols if c.notnull] == ["KeyC"]
GOT = w.schema_text(R1).replace(" ", "")
assert [o["id"] for o in Q["options"] if o["value"].replace(" ", "") == GOT] == ["c"], GOT
assert any(t.name == "PropA_2" for t in ZT)                                 # the multi-valued attr has its own table
OPTS = w.bank_opts(Q, ltr=True)

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נחבר קשר אל קשר. לזה קוראים הקבצה, או צבירה."),
    P("נראה מה המפתח של ההקבצה, מה המפתח של קשר שמחובר אליה, ומה משנה חץ."),
    P("ובסוף נפתור שאלה מתרגול מבחן.", hold=0.4),
], stage='<div class="kicker">L09 · מודל ERD</div><h1>צבירה (הקבצה)</h1>'
         '<p>לקרוא קשר שמשתתף בקשר אחר: מה המפתח של ההקבצה, של הקשר עליה, ומה משנה חץ.</p>', layout="title")

agg = Scene("agg", "מה זו הקבצה", [
    P("תחרות בישול: מתחרים משתתפים בתחרויות. זה קשר רבים לרבים רגיל."),
    P("עכשיו שופט נותן ציון. אבל לא למתחרה לבד, וגם לא לתחרות לבד. הוא נותן ציון ל**השתתפות**: מתחרה מסוים בתחרות מסוימת."),
    P("כלומר צריך לחבר קשר אל קשר. ובתרשים אסור לחבר מעוין למעוין.", do=show(*D1.hn("RP"))),
    P("הפתרון: מקיפים את הקשר והישויות שלו **במלבן**. זו הקבצה, וכל המלבן מתנהג כמו **ישות אחת**.",
      do=hide(*D1.hn("RP")) + show(*D1.hn("G"), "g-1")),
    P("ועכשיו אפשר לחבר אותה לקשר חדש: מעניק ציון, עם השופט.", do=hide(*D1.hn("G")) + show(*S_SC)),
    P("מה המפתח של ההקבצה? מופע שלה הוא השתתפות אחת, כלומר זוג של מתחרה ותחרות.", do=show("k0", "k0-hi")),
    P("אז המפתח שלה הוא המפתח של הקשר שבתוכה: מספר מתחרה וקוד תחרות.", do=hide("k0-hi") + show("g-2")),
    P("ובהמרה, להקבצה **אין טבלה משלה**. הטבלה של משתתף ב היא הטבלה שלה.", do=show("g-3"), hold=0.4),
], stage=w.stack(D1.svg(), '<div class="er-schemas">' + SC0 + '</div>', gap=14),
   panel=st.card("g-1", "ex", "מלבן סביב קשר + ישויות = <b>הקבצה</b>")
         + st.card("g-2", "rule", "🔑 מפתח ההקבצה = מפתח הקשר שבתוכה")
         + st.card("g-3", "rule", "🔑 אין טבלה להקבצה: טבלת הקשר הפנימי היא הטבלה שלה"))

keys = Scene("keys", "המפתח של הקשר עליה", [
    P("עכשיו הקשר מעניק ציון. אין בו חצים, אז הוא רבים לרבים, והוא טבלה."),
    P("המפתח: המפתח של השופט, ועוד **כל** המפתח של ההקבצה. שלושה שדות.", do=show("k1", "k1-hi", "e-1")),
    P("והציון? הוא תלוי בשופט ובהשתתפות יחד, אז הוא עמודה רגילה בטבלה של הקשר.", do=hide("k1-hi")),
    P("עכשיו נוסיף חץ אל השופט: כל השתתפות מקבלת ציון משופט אחד לכל היותר.", do=hide("cb-wrap") + show("ca-wrap", D2.he("SC", "J"))),
    P("חץ אל אחד הצדדים מוציא את הצד הזה מהמפתח. אז השופט יוצא, והמפתח הוא רק מפתח ההקבצה.", do=show("e-2")),
    P("ויותר מזה: עם חץ, הקשר כבר לא צריך טבלה. ממזגים אותו לצד ה״רבים״, שהוא ההקבצה.", do=hide(D2.he("SC", "J"))),
    P("וההקבצה, כזכור, היא הטבלה של משתתף ב. לשם נכנסים מספר השופט, כמפתח זר, והציון.", do=show("k2", "k2-hi", "e-3")),
    P("מספר השופט **מחוץ** למפתח. אם הוא היה בפנים, אותה השתתפות הייתה יכולה לקבל כמה שופטים, והחץ היה הולך לאיבוד.",
      do=hide("k2-hi"), hold=0.4),
], stage=w.stack('<div class="er-swap2"><div id="cb-wrap">' + w.Diagram("cb", COMP).svg() + '</div><div id="ca-wrap" class="h er-over">'
                 + D2.svg() + '</div></div>', '<div class="er-schemas">' + SC1 + SC2 + '</div>', gap=14),
   panel=st.card("e-1", "rule", "🔑 בלי חצים: מפתח = מפתח הצד + <b>כל</b> מפתח ההקבצה")
         + st.card("e-2", "rule", "🔑 חץ אל X ← X יוצא מהמפתח")
         + st.card("e-3", "ex", "חץ מההקבצה ← מיזוג לטבלת הקשר הפנימי"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה מתרגול מבחן. בתרגום היעיל ביותר, איזו סכמה תתקבל לטבלה של $R_1$?"),
    P("$R_1$ נמצא בתוך ההקבצה, והוא רבים לרבים. המפתח שלו: המפתח של $A$ והמפתח של $B$, ועוד התכונה שלו.",
      do=show(*DX.hn("R1", "A", "B", "pR1"))),
    P("עכשיו $R_2$. הוא יוצא מההקבצה, ויש בו חץ אל $C_1$. כל זוג של $A$ ו-$B$ קשור למופע אחד לכל היותר של $C_1$.",
      say="עכשיו אָר שתיים. הוא יוצא מההקבצה, ויש בו חץ אל סִי אחת. כל זוג של אֵיי ובִּי קשור למופע אחד לכל היותר של סִי אחת.",
      do=hide(*DX.hn("R1", "A", "B", "pR1")) + show(*DX.hn("R2", "C1"), DX.he("R2", "C1"))),
    P("אז $R_2$ מתמזג לטבלה של ההקבצה, שהיא הטבלה של $R_1$. נכנס המפתח של $C_1$, שהוא המפתח היורש מ-$C$.",
      do=show(*DX.hn("isa", "kC"))),
    P("והוא נכנס **מחוץ** למפתח, עם NOT NULL בגלל הקו הכפול בצד ההקבצה. זו האפשרות הנכונה.",
      do=hide(DX.he("R2", "C1")) + show(DX.he("R2", "G"), "q-ok-c")),
    P("אם המפתח של $C$ נכנס למפתח, החץ הולך לאיבוד.", do=show("q-x-b", "q-n-b")),
    P("סכמה בלי המפתח של $C$ תחייב טבלה נפרדת ל-$R_2$, וזה לא התרגום היעיל ביותר.", do=show("q-x-a", "q-n-a")),
    P("ותכונה מרובת הערכים של $A$ לא נכנסת לשום טבלת קשר. היא יוצאת לטבלה משלה.",
      do=hide(*DX.hn("R2", "C1", "isa", "kC"), DX.he("R2", "G")) + show(*DX.hn("pA"), "q-x-d", "q-n-d")),
    P("ומכיוון שיש אפשרות נכונה, האפשרות שכל התשובות האחרות אינן נכונות נופלת.", do=hide(*DX.hn("pA")) + show("q-x-e"), hold=0.4),
], stage=DX.svg(),
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q["id"] + '</span>בתרגום היעיל ביותר, איזו סכמה '
         'תתקבל עבור הטבלה של <span class="er-code">R1</span>?</div></div>'
         + '<div class="er-oxs">' + st.options("q", OPTS, notes={"a": "חסר מיזוג", "b": "החץ אבד", "d": "מרובת ערכים"})
         + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: הקבצה היא מלבן סביב קשר והישויות שלו, והיא מתנהגת כמו ישות אחת.", do=show("r-1")),
    P("המפתח שלה הוא המפתח של הקשר שבתוכה, ואין לה טבלה משלה.", do=show("r-2")),
    P("קשר עליה בלי חצים: המפתח של הצד השני ועוד כל מפתח ההקבצה.", do=show("r-3")),
    P("וחץ מההקבצה אל ישות: ממזגים לטבלת הקשר הפנימי, והמפתח הזר מחוץ למפתח. נתראה בשלב הגמר.", do=show("r-4"),
      hold=0.6),
], stage=w.Diagram("cr", COMP).svg(),
   panel=st.card("r-1", "rule", "🔑 הקבצה = ישות אחת")
         + st.card("r-2", "rule", "🔑 מפתח ההקבצה = מפתח הקשר הפנימי")
         + st.card("r-3", "rule", "🔑 N:M עליה ← מפתח הצד + מפתח ההקבצה")
         + st.card("r-4", "trap", "⚠️ חץ ← מיזוג, מחוץ למפתח"))

VIDEO = Video("L09", "erd", "צבירה (הקבצה)", [title, agg, keys, exam, recap], bank={"26Z-CL-Q4": "c"})
