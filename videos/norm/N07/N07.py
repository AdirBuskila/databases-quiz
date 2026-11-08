# -*- coding: utf-8 -*-
"""N07 · פירוק: שימור מידע ושימור תלויות — video script (build: tools/video/vid.py N07).

Source: norm/levels/N07.js (lesson + goal: a decomposition's components must cover R; lossless join with the one-line
test (R1 ∩ R2)⁺ ⊇ R1 or R2, step by step for more components; dependency preservation FD by FD: inside a component,
or derived with the Z-loop; the two questions are separate).
Exam anchor: 26Z-CL-Q19 (three components: lossless, preserving through a derivation of C → A, but R3 is not in 3NF;
key b).
Avoided on purpose: the N07 quiz decompositions (A → B / AB, AC; A → B, C → B; A → C, C → B; A → B, B → C on ABCD; the
N07-Q7/Q8/Q9 sets), the quiz ids 23B-A-Q19, 23B-A2-Q19, 25B-A-Q19, 26S-A-Q18, 21S-B-Q23, and the lesson example.
Not stated as a rule on purpose (they answer N07-Q5 and N08-Q8 / 21S-B-Q23): the one-line lossless test as a bare
rule (it is shown only on the example), and which algorithm guarantees what. 25S-B-Q20 is solved in the N09 boss video. Every verdict comes from w_norm (chase, Z-loop, projections, NF of
components) cross-checked with tools/fdlib.js.
"""
from vid import Scene, Video, BANK
import stage as st
import w_norm as w
from w_norm import P, show, hide

# ---------------------------------------------------------------- worked example (verified)
R = "ABCD"
F = w.parse_f("A -> C, B -> D, D -> C")
C1 = ["BD", "ABC"]
assert w.union(*C1) == R and w.inter(*C1) == "B"
assert w.closure("B", F) == "BCD" and w.has(w.closure("B", F), "BD")         # B⁺ ⊇ R1: lossless
assert w.lossless(R, C1, F)
assert w.lost_fds(C1, F) == [("D", "C")] and not w.preserves(C1, F)
assert w.preserve_trace(("D", "C"), C1, F) == ([], "D")                     # Z = D never grows
C2 = ["AD", "BCD"]
assert w.inter(*C2) == "D" and w.closure("D", F) == "CD"
assert not w.has("CD", "AD") and not w.has("CD", "BCD") and not w.lossless(R, C2, F)
CP1, _ = w.comps("c1", C1, F, nf=False)
CP2, _ = w.comps("c2", C2, F, nf=False, fds=False)

# ---------------------------------------------------------------- exam 26Z-CL-Q19
Q = BANK["26Z-CL-Q19"]
assert Q["correctId"] == "b" and not Q.get("contextId")
RX = "ABCDE"
FX = w.parse_f("A -> B, B -> C, C -> A, D -> E")
CX = ["AB", "BC", "CDE"]
assert w.union(*CX) == RX
assert w.closure("B", FX) == "ABC" and w.lossless("ABC", ["AB", "BC"], w.project("ABC", FX))       # step 1: AB ⋈ BC on B
assert w.closure("C", FX) == "ABC" and w.lossless(RX, ["ABC", "CDE"], FX)        # step 2: ABC ⋈ CDE on C
assert w.lossless(RX, CX, FX) and w.preserves(CX, FX)
assert w.preserve_trace(("C", "A"), CX, FX) == ([(1, "C", "BC"), (0, "BC", "ABC")], "ABC")
CPX, INFO = w.comps("xc", CX, FX)
assert [f for _, f in INFO] == ["BCNF", "BCNF", "1NF"]                       # R3: D → E with key CD, E not prime
assert w.candidate_keys("CDE", w.project("CDE", FX)) == ["CD"] and INFO[2][0] == [("D", "E")]
O = {o["id"]: o["value"] for o in Q["options"]}
assert "C → A" in O["a"] and "3NF" in O["b"] and "BCNF" in O["c"]
OPTS = [(k, w.opt_tex(v)) for k, v in O.items()]
assert w.crosscheck() > 0

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נבדוק פירוקים: מפצלים טבלה לכמה טבלאות קטנות, ושואלים מה הפסדנו."),
    P("נלמד שתי בדיקות נפרדות: שימור מידע, ושימור תלויות."),
    P("ובסוף נפתור שאלה ממבחן.", hold=0.4),
], stage='<div class="kicker">N07 · תלויות ונרמול</div><h1>פירוק: שימור מידע ושימור תלויות</h1>'
         '<p>לקבוע לפירוק נתון אם הוא משמר מידע ואם הוא משמר תלויות, ולבדוק כל תכונה בנפרד.</p>', layout="title")

defs = Scene("defs", "מה זה פירוק", [
    P("**פירוק** של $R$ הוא אוסף של רכיבים, תת-קבוצות של התכונות, שהאיחוד שלהם הוא כל $R$.", do=show("d-1")),
    P("אם תכונה של $R$ לא מופיעה באף רכיב, זה בכלל לא פירוק.", do=show("d-c1")),
    P("ועל כל פירוק שואלים שתי שאלות נפרדות.", do=show("d-2")),
    P("שימור מידע: האם הצירוף של הרכיבים מחזיר בדיוק את הטבלה המקורית, בלי שורות רפאים?", do=show("d-3")),
    P("ושימור תלויות: האם אפשר לאכוף את כל $F$ בתוך הרכיבים, בלי לצרף אותם בחזרה?", do=show("d-4"), hold=0.4),
], stage=w.stack(w.big("d-1", r"R_1 \cup R_2 \cup \cdots = R", cls="sm"),
                 w.row("d-2", "<b>שתי שאלות נפרדות</b>"),
                 w.row("d-3", "1. שימור מידע", cls="sm"), w.row("d-4", "2. שימור תלויות", cls="sm"), gap=34),
   panel=st.card("d-c1", "trap", "⚠️ תכונה חסרה? זה לא פירוק"))

loss = Scene("loss", "שימור מידע", [
    P("נתחיל בשימור מידע. ביחס יש ארבע תכונות ושלוש תלויות, ומפרקים לשני רכיבים.", do=show("l-f", "c1-c0", "c1-c1")),
    P("הצירוף של שני הרכיבים נעשה על התכונות המשותפות להם. כאן, על $B$.", do=show("l-c1")),
    P("נבדוק מה $B$ קובעת: $B \\to D$, ו-$D \\to C$. הסגור של $B$ הוא $B$, $C$ ו-$D$.", do=show("l-1")),
    P("הסגור הזה מכיל את כל הרכיב $BD$. כלומר $B$ הוא מפתח-על של $BD$: לכל ערך של $B$ יש שם שורה אחת.",
      do=show("l-2")),
    P("ולכן הצירוף על $B$ לא מייצר שורות חדשות, והפירוק הזה משמר מידע.", do=show("l-c2")),
    P("ופירוק אחר: $AD$ ו-$BCD$. החיתוך הוא $D$, והסגור שלו הוא רק $C$ ו-$D$.", do=show("c2", "l-3")),
    P("הוא לא מכיל את $AD$, וגם לא את $BCD$. הפירוק הזה **מפסיד מידע**: הצירוף עלול לייצר שורות שלא היו.",
      do=show("l-4"), hold=0.4),
], stage=w.stack(w.fd_set("l-f", R, F, hidden=True, cls="sm"), CP1, CP2, gap=26),
   panel=st.card("l-c1", "ex", "משותף: $BD \\cap ABC = B$")
         + w.row("l-1", "$B^+ = \\{B, C, D\\}$", cls="sm")
         + w.row("l-2", "$B^+ \\supseteq BD$", cls="sm")
         + st.card("l-c2", "rule", '🔑 $B$ מפתח-על של $BD$ ← <span class="nf-ok">משמר מידע</span>')
         + w.row("l-3", "$D^+ = \\{C, D\\}$", cls="sm")
         + w.row("l-4", '<span class="nf-no">מפסיד מידע</span>', cls="sm"))

pres = Scene("pres", "שימור תלויות", [
    P("עכשיו שימור תלויות, על הפירוק הראשון. בודקים כל תלות בנפרד.", do=show("p-f", "p1-c0", "p1-c1")),
    P("$A \\to C$ יושבת כולה ברכיב $ABC$. נשמרת.", do=show("p-f-fh0", "p-1")),
    P("$B \\to D$ יושבת ברכיב $BD$. נשמרת.", do=hide("p-f-fh0") + show("p-f-fh1", "p-2")),
    P("ו-$D \\to C$? אין רכיב שיש בו גם $D$ וגם $C$.", do=hide("p-f-fh1") + show("p-f-fh2")),
    P("אז בודקים אם היא נגזרת מהרכיבים. מתחילים מ-$D$, ובכל רכיב מוסיפים את מה ש-$D$ קובעת בתוכו.",
      do=show("p-c1")),
    P("ברכיב $BD$: הסגור של $D$, בתוך הרכיב, הוא רק $D$. וברכיב $ABC$ אין $D$ בכלל, אז אין ממה להתחיל.",
      do=show("p-3")),
    P("שום דבר לא נוסף, ו-$C$ לא הגיעה. התלות $D \\to C$ אבדה, והפירוק **לא** משמר תלויות.", do=show("p-4")),
    P("אז הפירוק הראשון משמר מידע, אבל לא תלויות. שתי השאלות באמת נפרדות, ומתשובה לאחת לא מסיקים על השנייה.",
      do=show("p-c2"), hold=0.4),
], stage=w.stack(w.fd_set("p-f", R, F, hidden=True, cls="sm"), w.comps("p1", C1, F, nf=False)[0], gap=26),
   panel=w.row("p-1", '$A \\to C$ &nbsp; <span class="nf-ok">ב-$ABC$</span>', cls="sm")
         + w.row("p-2", '$B \\to D$ &nbsp; <span class="nf-ok">ב-$BD$</span>', cls="sm")
         + st.card("p-c1", "rule", "🔑 $Z := X$; בכל רכיב: $Z \\cup= (Z \\cap R_i)^+ \\cap R_i$")
         + w.row("p-3", "$Z = \\{D\\}$, לא גדל", cls="sm")
         + w.row("p-4", '$D \\to C$ &nbsp; <span class="nf-no">אבדה</span>', cls="sm")
         + st.card("p-c2", "trap", "⚠️ מידע ותלויות: שתי בדיקות נפרדות"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: חמש תכונות, ארבע תלויות, ופירוק לשלושה רכיבים. מה נכון?", do=show("x-f", "xc")),
    P("קודם, זה פירוק: $AB$, $BC$ ו-$CDE$ מכסים את כל חמש התכונות.", do=show("xc-c0", "xc-c1", "xc-c2")),
    P("מידע, צעד אחרי צעד. $AB$ ו-$BC$ נחתכים ב-$B$, והסגור של $B$ הוא $A$, $B$, $C$. מאחדים בלי הפסד.",
      do=show("x-1")),
    P("ואת $ABC$ עם $CDE$: החיתוך $C$, והסגור שלו שוב $A$, $B$, $C$. גם כאן אין הפסד. הפירוק משמר מידע.",
      do=show("x-2")),
    P("תלויות: $A \\to B$ ב-$AB$, $B \\to C$ ב-$BC$, ו-$D \\to E$ ב-$CDE$. ו-$C \\to A$?", do=show("x-f-fh2")),
    P("היא לא בתוך אף רכיב, אבל נגזרת: ב-$BC$ נקבל מ-$C$ את $B$, וב-$AB$ מ-$B$ את $A$. אז היא נשמרת.",
      do=show("x-3", "q-x-a", "q-n-a")),
    P("ועכשיו הצורה. ב-$CDE$ חלה רק $D \\to E$, והמפתח הוא $CD$. $E$ תלויה בחלק מהמפתח.",
      do=hide("x-f-fh2") + show("xc-v2")),
    P("זו תלות חלקית של תכונה לא ראשונית, ולכן $CDE$ אפילו לא ב-2NF. בטח שלא ב-3NF.", do=show("xc-v0", "xc-v1")),
    P("לכן: משמר מידע ותלויות, אבל לא כל הרכיבים ב-3NF. זו התשובה.",
      do=show("q-ok-b", "q-x-c", "q-n-c", "q-x-d", "q-x-e"), hold=0.5),
], stage=w.stack(w.fd_set("x-f", RX, FX, hidden=True, cls="sm"), CPX.replace('class="nf-comps ', 'class="nf-comps h ', 1),
                 gap=26),
   panel=f'<div class="qstem nf-qsm"><span class="qid">{Q["id"]}</span>הפירוק $R_1(A, B)$, $R_2(B, C)$, '
         '$R_3(C, D, E)$. מה נכון?</div>'
         + w.row("x-1", "$B^+ = \\{A, B, C\\}$ ✓", cls="sm") + w.row("x-2", "$C^+ = \\{A, B, C\\}$ ✓", cls="sm")
         + w.row("x-3", "$C \\to B \\to A$ ✓", cls="sm")
         + '<div class="nf-osm">' + st.options("q", OPTS, notes={"a": "נגזרת", "c": "$R_3$ לא"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: פירוק חייב לכסות את כל התכונות של $R$.", do=show("r-1")),
    P("שימור מידע: בודקים מה התכונות המשותפות קובעות, וביותר משני רכיבים, צעד אחרי צעד.", do=show("r-2")),
    P("שימור תלויות: כל תלות יושבת ברכיב, או נגזרת מהרכיבים.", do=show("r-3")),
    P("ושתי הבדיקות נפרדות. נתראה ברמה הבאה, שם נבנה פירוקים בעצמנו.", do=show("r-4"), hold=0.6),
], stage=w.stack(w.fd_set("r-fs", R, F, cls="sm"), w.comps("r1", C1, F, nf=False, hidden=False)[0], gap=30),
   panel=st.card("r-1", "rule", "🔑 האיחוד = $R$")
         + st.card("r-2", "rule", "🔑 מידע: מה המשותף קובע")
         + st.card("r-3", "rule", "🔑 תלויות: ברכיב, או נגזרת")
         + st.card("r-4", "trap", "⚠️ שתי בדיקות נפרדות"))

VIDEO = Video("N07", "norm", "פירוק: שימור מידע ושימור תלויות", [title, defs, loss, pres, exam, recap],
              bank={"26Z-CL-Q19": "b"})
