# -*- coding: utf-8 -*-
"""A09 · מבחן גמר: שאלות ממבחנים — video script (build: tools/video/vid.py A09).

Boss walkthrough (alg/levels/A09.js is boss: true): three real exam questions that no guided quiz or boss item cites.
  26Z-CL-Q16  rows and columns of σ_{D<7}(Π_{A,B}(R) ⊗ Π_{B,D}(S)) on the exam's own tables (key c: 4 rows, 3 columns)
  21B-A-Q15   the id of the youngest voter, five self-join variants (key e)
  26B-A-Q15   T1..Result built from ×, −, Π: which compound operation it is (key a: division)
Every expression is evaluated by w_alg.ev on the exam's tables (26Z-CL-Q16) or on small instances (the other two), and
cross-checked against tools/ralib.js. Found while checking: the bank explanation of 26Z-CL-Q16 says that joining on C as
well gives 2 rows; on the exam's tables σ_{D<7}(R ⊗ S) has 4 rows and 4 columns (that is the distractor with 4 columns),
asserted below, so the video says that instead.
Avoided on purpose: the twelve A09 boss items (own music-school schema) and every A01-A08 quiz item; anchors used by the
other alg videos (26S-A-Q16, 26B-A-Q13, 23B-A-Q16, 25S-B-Q16, 26Z-CL-Q14, 26Z-CL-Q15, 24B-A-Q17).
"""
import json
import re
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_alg as w

_bank = json.loads((w.ROOT / "questions.json").read_text(encoding="utf-8"))


def tex_to_alg(s):
    """bank option text with $…$ (Unicode operators) -> HTML with an inline expression"""
    return re.sub(r"\$([^$]+)\$", lambda m: w.inl(m.group(1)), s)


# ---------------------------------------------------------------- 26Z-CL-Q16
Q1 = BANK["26Z-CL-Q16"]
assert Q1["correctId"] == "c"
CTX = _bank["contexts"][Q1["contextId"]]
TABS = [w.T(t["name"], t["columns"], t["rows"]) for t in CTX["tables"]]
R1, S1 = TABS
E1 = Q1["question"].split("$$")[1]
assert E1 == "σ_{D < 7}(Π_{A,B}(R) ⊗ Π_{B,D}(S))"
PAB, PBD = w.ev("Π_{A,B}(R)", TABS), w.ev("Π_{B,D}(S)", TABS)
assert len(PAB) == 4 and PBD.rows == [("x", "5"), ("x", "6"), ("y", "7"), ("y", "8"), ("w", "9")]
DUPS1 = [i for i, r in enumerate(S1["rows"]) if (r[0], r[2]) in [(q[0], q[2]) for q in S1["rows"][:i]]]
assert DUPS1 == [1]                                                  # (x, 12, 5) projects onto (x, 5) again
J1 = w.ev("Π_{A,B}(R) ⊗ Π_{B,D}(S)", TABS)
assert J1.names == ["A", "B", "D"] and len(J1) == 6
R_Q1 = w.ev(E1, TABS)
assert (len(R_Q1), len(R_Q1.cols)) == (4, 3)
KEEP1 = [i for i, r in enumerate(J1.rows) if int(r[2]) < 7]
assert len(KEEP1) == 4
BAG = [(a, b, d) for a, b in PAB.rows for b2, c, d in S1["rows"] if b2 == b and int(d) < 7]
assert len(BAG) == 6                                                 # without removing duplicates: the 6-row option
WITHC = w.ev("σ_{D < 7}(R ⊗ S)", TABS)
assert (len(WITHC), len(WITHC.cols)) == (4, 4)                       # joining on C too (no projections): 4 x 4
O1 = {o["id"]: o["value"] for o in Q1["options"]}
assert O1["c"].startswith("ארבע שורות ושלוש") and O1["a"].startswith("שש") and O1["b"].startswith("ארבע שורות וארבע")
OPTS1 = [(k, v) for k, v in O1.items()]

# ---------------------------------------------------------------- 21B-A-Q15
Q2 = BANK["21B-A-Q15"]
assert Q2["correctId"] == "e"
CIT = w.T("Citizen", ["AnonymousId", "Area", "Age"], [[1, "North", 30], [2, "South", 22], [3, "North", 22], [4, "Center", 45]],
          pk=["AnonymousId"])
O2 = {o["id"]: o["value"] for o in Q2["options"]}
RES2 = {k: (None if w.invalid(v, [CIT]) else w.ev(v, [CIT]).values()) for k, v in O2.items()}
assert RES2 == {"a": {1, 4}, "b": {1, 2, 3}, "c": None, "d": {4}, "e": {2, 3}}
OPTS2 = [(k, w.inl(v)) for k, v in O2.items()]

# ---------------------------------------------------------------- 26B-A-Q15
Q3 = BANK["26B-A-Q15"]
assert Q3["correctId"] == "a" and Q3.get("official") is True
LINES = Q3["question"].split("$$")[1::2]
assert len(LINES) == 4 and LINES[0] == "T_{1} = Π_{A}(R) × S"
SRC3 = "\n".join(re.sub(r"_\{(\d)\}", r"\1", ln).replace(" = ", " ← ", 1) for ln in LINES)
RR = w.T("R", ["A", "B"], [[1, "x"], [1, "y"], [2, "x"], [3, "x"], [3, "y"], [3, "z"]])
SS = w.T("S", ["B"], [["x"], ["y"]])
D3 = [RR, SS]
steps = lambda k: "\n".join(SRC3.split("\n")[:k])
T1, T2, T3, RES3 = (w.ev(steps(k), D3) for k in (1, 2, 3, 4))
assert len(T1) == 6 and set(T2.rows) == {(2, "y")} and T3.values() == {2} and RES3.values() == {1, 3}
assert w.same(RES3, w.ev("R ÷ S", D3))                                # a: division
assert w.invalid("R ∩ S", D3) and w.invalid("(R − S) ∪ (S − R)", D3)   # b, e: R(A,B) and S(B) are not compatible
assert not w.same(RES3, w.ev("R ⊗ S", D3))                            # c: two columns, every pair with B in S
T2I = [i for i, r in enumerate(T1.rows) if r == (2, "y")]
assert T2I == [3]
OPTS3 = [(o["id"], tex_to_alg(o["value"])) for o in Q3["options"]]

N = w.crosscheck()
assert N >= 18

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("זה הסרטון של מבחן הגמר: שלוש שאלות אמיתיות ממבחנים, אחת אחרי השנייה."),
    P("נספור שורות ועמודות, נמצא מינימום, ונזהה פעולה שבנויה מפעולות פשוטות."),
    P("בכל שאלה נמצא את התשובה, ונפסול כל אחת מהאחרות עם סיבה.", hold=0.4),
], stage='<div class="kicker">A09 · אלגברה רלציונית</div><h1>מבחן גמר: שאלות ממבחנים</h1>'
         '<p>שאלות ברמת מבחן: צירוף מול מכפלה, קיצון, חילוק, תקינות וספירת שורות.</p>', layout="title")

q1 = Scene("q1", "שאלה 1: ספירת שורות", [
    P("שאלה ראשונה. שני יחסים קטנים: לשניהם יש עמודות בשם $B$ ו-$C$. כמה שורות וכמה עמודות יש בתוצאה?",
      do=show("a-r", "a-s", "a-e")),
    P("מבפנים החוצה. היטל של $R$ על $A$ ו-$B$: ארבע שורות, אין כפילויות.", do=show("a-pab")),
    P("היטל של $S$ על $B$ ו-$D$. שימו לב לשורה השנייה: גם היא נותנת $x$ וחמש. כפילות, והיא נמחקת.",
      do=show("a-pbd", "a-s-dup1")),
    P("אחרי ההיטלים, $C$ כבר לא קיימת. העמודה המשותפת היחידה היא $B$.", do=show("a-c1")),
    P("הצירוף: אחת ושלוש מתאימות לשתי שורות של $x$, ושתיים לשתי שורות של $y$. שש שורות.", do=show("a-j")),
    P("שימו לב: ארבע, עם $z$, לא מתאים לאף שורה, ונעלם מהצירוף.", do=show("a-pab-x3")),
    P("ועכשיו הבחירה, $D$ קטן משבע: נשארות ארבע השורות של $x$. ארבע שורות, ושלוש עמודות.",
      do=show(*w.ids("a-j", "hl", KEEP1)) + show(*w.ids("a-j", "x", [i for i in range(6) if i not in KEEP1]))
      + show("q1-ok-c")),
    P("שש שורות מקבל מי ששכח למחוק את הכפילות בהיטל.", do=show("q1-x-a", "q1-n-a")),
    P("וארבע עמודות מקבל מי שמצרף את הטבלאות המקוריות, גם לפי $C$, ושוכח את ההיטלים.", do=show("q1-x-b", "q1-n-b"),
      hold=0.5),
], stage=w.stack(w.alg("a-e", E1, size=30),
                 w.row(w.table("a-r", R1, hidden=True, fs=21), w.table("a-s", S1, hidden=True, fs=21),
                       w.table("a-pab", PAB, title="Π_{A,B}(R)", hidden=True, fs=21),
                       w.table("a-pbd", PBD, title="Π_{B,D}(S)", hidden=True, fs=21), gap=26),
                 w.table("a-j", J1, title="⊗", hidden=True, fs=21), gap=14),
   panel=f'<div class="qstem ra-qs"><span class="qid">{Q1["id"]}</span>כמה שורות וכמה עמודות בתוצאה?</div>'
         + f'<div class="ra-opts">{st.options("q1", OPTS1, notes={"a": "בלי מחיקת כפילות", "b": "גם לפי C"})}</div>'
         + st.card("a-c1", "rule", "🔑 אחרי ההיטלים: רק <b>B</b> משותפת"))

q2 = Scene("q2", "שאלה 2: הגיל המינימלי", [
    P("שאלה שנייה: טבלת אזרחים, עם מזהה, אזור וגיל. איזו שאילתה מחזירה את המזהה של המצביע הצעיר ביותר?",
      do=show("b-t")),
    P("התבנית: כל המזהים, פחות מי שיש מישהו צעיר ממנו. מי מפסיד? מי שגדול בתנאי."),
    P("התנאי בכל האפשרויות עם שני עותקים: הגיל בעותק הראשון גדול מהגיל בעותק השני. אז הגדול הוא העותק הראשון."),
    P("על הנתונים: אזרח מספר אחת, בן שלושים, ויש צעירים ממנו. הוא מופיע כעותק הראשון בזוג, ולכן נמחק. גם מספר ארבע.",
      do=show("b-t-x0", "b-t-x3")),
    P("שתיים ושלוש בני עשרים ושתיים. אין צעיר מהם, והם אף פעם לא משמאל. שניהם נשארים: תיקו.",
      do=show("b-t-hl1", "b-t-hl2")),
    P("לכן מקרינים את העותק הראשון, ומחסירים. על הנתונים: שתיים ושלוש, שניהם בני עשרים ושתיים.",
      do=show("b-r", "q2-ok-e")),
    P("האפשרות שמקרינה את העותק השני ומחסירה, מחזירה את המבוגר ביותר: ארבע.", do=show("q2-x-d", "q2-n-d")),
    P("ושתי האפשרויות בלי הפרש מחזירות את מי שאינו הצעיר, או את מי שאינו המבוגר.",
      do=show("q2-x-a", "q2-n-a", "q2-x-b", "q2-n-b")),
    P("והאפשרות עם מינימום בתוך הבחירה לא תקינה: באלגברה אין פונקציית מינימום.", do=show("q2-x-c", "q2-n-c"),
      hold=0.5),
], stage=w.stack(f'<div class="qstem ra-qs"><span class="qid">{Q2["id"]}</span>המזהה של המצביע עם הגיל המינימלי?</div>',
                 f'<div class="ra-opts" style="width:100%">{st.options("q2", OPTS2, notes={"a": "לא הצעיר", "b": "לא המבוגר", "c": "לא תקין", "d": "המבוגר"})}</div>',
                 gap=10),
   panel=w.stack(w.table("b-t", CIT, hidden=True, fs=26), w.table("b-r", w.ev(O2["e"], [CIT]), title="", hidden=True, fs=26),
                 gap=30))

q3 = Scene("q3", "שאלה 3: איזו פעולה?", [
    P("שאלה שלישית: יחס $R$ עם $A$ ו-$B$, ויחס $S$ עם $B$. ארבעה שלבים. לאיזו פעולה הם שקולים?",
      do=show("c-st", "c-r", "c-s")),
    P("$T_1$: כל $A$ של $R$, עם כל $B$ של $S$. כל הזוגות האפשריים: שש שורות.", do=show("c-st-l0", "c-t1")),
    P("$T_2$: פחות מה שבאמת יש ב-$R$. נשאר הזוג **החסר**: שתיים ו-$y$.", do=show("c-st-l1", "c-t1-hl3")),
    P("$T_3$: מי שחסר לו משהו: שתיים. והתוצאה: כל $A$, פחות מי שחסר לו. אחת ושלוש.",
      do=show("c-st-l2", "c-st-l3", "c-res")),
    P("אחת ושלוש מופיעות עם **כל** ערכי $B$ של $S$. שלוש מופיעה גם עם $z$, וזה לא מפריע. זה חילוק.", do=show("q3-ok-a")),
    P("וזה בדיוק המבנה של כל שאילתת \"לכל\": מי שלא חסר לו אף ערך של המחלק.", hold=0.2),
    P("חיתוך והפרש סימטרי לא מוגדרים כאן: ל-$R$ שתי עמודות ול-$S$ אחת. היחסים לא תואמים.",
      do=show("q3-x-b", "q3-n-b", "q3-x-e", "q3-n-e")),
    P("וצירוף, טבעי או חיצוני, מחזיר זוגות של שתי עמודות, ולא רק את $A$.", do=show("q3-x-c", "q3-n-c", "q3-x-d", "q3-n-d"),
      hold=0.5),
], stage=w.stack(w.steps("c-st", [(n, e) for n, e in (ln.split(" ← ") for ln in SRC3.split("\n"))], size=28)
                 .replace('class="ra-steps"', 'class="ra-steps h"', 1),
                 w.row(w.table("c-r", RR, hidden=True, fs=24), w.table("c-s", SS, hidden=True, fs=24),
                       w.table("c-t1", T1, title="T1", hidden=True, fs=24),
                       w.table("c-res", RES3, title="Result", hidden=True, fs=24), gap=40), gap=26),
   panel=f'<div class="qstem ra-qs"><span class="qid">{Q3["id"]}</span>איזו פעולה שקולה לתוצאה ב-Result?</div>'
         + f'<div class="ra-opts">{st.options("q3", OPTS3, notes={"b": "לא תואמים", "c": "2 עמודות", "d": "2 עמודות", "e": "לא תואמים"})}</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: בספירת שורות, מבצעים מבפנים החוצה, מוחקים כפילויות בכל היטל, ובודקים אילו שמות עדיין משותפים.",
      do=show("r-1")),
    P("בקיצון: מי שמוקרן וגדול בתנאי, נמחק. ובאלגברה אין פונקציית מינימום.", do=show("r-2")),
    P("וחילוק הוא: כל הזוגות, פחות מה שיש, ומי שחסר לו משהו נמחק. בהצלחה במבחן!", do=show("r-3"), hold=0.6),
], stage=w.stack(w.steps(None, [(n, e) for n, e in (ln.split(" ← ") for ln in SRC3.split("\n"))], size=30, hidden=False)),
   panel=st.card("r-1", "rule", "🔑 מבפנים החוצה, כפילויות נמחקות")
         + st.card("r-2", "rule", "🔑 קיצון: מי שמוקרן ו\"מנצח\" נמחק")
         + st.card("r-3", "rule", "🔑 $\\div$ = כולם $-$ מי שחסר לו"))

VIDEO = Video("A09", "alg", "מבחן גמר: שאלות ממבחנים", [title, q1, q2, q3, recap], bank={"26Z-CL-Q16": "c", "21B-A-Q15": "e", "26B-A-Q15": "a"})
