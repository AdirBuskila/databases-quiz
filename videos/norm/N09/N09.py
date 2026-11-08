# -*- coding: utf-8 -*-
"""N09 · מבחן גמר: שאלות ממבחנים — video script (build: tools/video/vid.py N09).

Boss walkthrough (norm/levels/N09.js is boss: true): three real exam questions that no guided quiz uses.
  26B-A-Q17  which FD does NOT follow from F = {A → B, B → C, A → D, AC → E}? key a = C → D
  21B-C-Q21  which pair of FDs is in F⁺ for F = {F → AE, BE → C, C → AD}? key e = F → A and F → E
  original   a question "בסגנון מבחן" (bank={}): a four-component decomposition of F = {B → C, C → D, DE → A,
             A → E}: lossless step by step, preserving, and R1(A, D, E) is in 3NF but not BCNF (judged on its own
             keys AD, DE). It replaces 25S-B-Q20, whose bank key c is disputed (the chase says lossy; the coordinator
             reports it). The fresh fd_norm items left are all quiz-schema twins or leak a quiz item.
Avoided on purpose: the N09 boss items (schema 1, schema 2, the instance S) and every quiz id; 26B-A-Q18 (N03),
26B-A-Q20 (N05), 21B-C-Q20 (N04), 26Z-CL-Q17..Q19 (N06, N07) are solved in the earlier videos; 25S-B-Q17 is skipped
(its F1 is N07-Q8's set up to renaming). Every verdict is asserted with w_norm (cross-checked with tools/fdlib.js).
"""
from vid import Scene, Video, BANK
import stage as st
import w_norm as w
from w_norm import P, show, hide

# ---------------------------------------------------------------- 26B-A-Q17
Q1 = BANK["26B-A-Q17"]
assert Q1["correctId"] == "a" and Q1["contextId"] == "26B-A-fd"
F1 = w.parse_f("A -> B, B -> C, A -> D, AC -> E")
V1 = {o["id"]: w.parse_f(o["value"])[0] for o in Q1["options"]}
assert V1 == {"a": ("C", "D"), "b": ("A", "C"), "c": ("A", "E"), "d": ("AB", "E"), "e": ("A", "BCDE")}
assert [k for k, d in V1.items() if not w.implies(F1, d)] == ["a"]
assert w.closure("C", F1) == "C" and w.closure("A", F1) == "ABCDE" and w.closure("AB", F1) == "ABCDE"
CT1, ST1 = w.closure_table("a1", "A", F1, cls="xs")
OPTS1 = [(o["id"], w.fd_opt(o["value"])) for o in Q1["options"]]

# ---------------------------------------------------------------- 21B-C-Q21
Q2 = BANK["21B-C-Q21"]
assert Q2["correctId"] == "e" and Q2["contextId"] == "21B-C-fd"
F2 = w.parse_f("F -> AE, BE -> C, C -> AD")
PAIRS = {"a": [("F", "A"), ("B", "C")], "b": [("B", "C"), ("C", "D")], "c": [("F", "A"), ("E", "C")],
         "d": [("E", "C"), ("B", "C")], "e": [("F", "A"), ("F", "E")]}
for o in Q2["options"]:
    assert [w.parse_f(s.replace("$", ""))[0] for s in o["value"].split("וגם")] == PAIRS[o["id"]]
assert [k for k, ps in PAIRS.items() if all(w.implies(F2, d) for d in ps)] == ["e"]
assert w.closure("B", F2) == "B" and w.closure("E", F2) == "E" and w.closure("F", F2) == "AEF"
assert w.implies(F2, ("C", "D"))                                       # the true half of option b
OPTS2 = [(o["id"], w.opt_tex(o["value"])) for o in Q2["options"]]

# ---------------------------------------------------------------- original exam-style: a decomposition
R3 = "ABCDE"
F3 = w.parse_f("B -> C, C -> D, DE -> A, A -> E")
C3 = ["ADE", "CD", "BC", "BE"]
assert w.union(*C3) == R3 and w.candidate_keys(R3, F3) == ["AB", "BE"]
# lossless step by step: BC ⋈ CD on C, then ⋈ BE on B, then ⋈ ADE on DE
assert w.closure("C", F3) == "CD" and w.lossless("BCD", ["BC", "CD"], w.project("BCD", F3))
assert w.closure("B", F3) == "BCD" and w.lossless("BCDE", ["BCD", "BE"], w.project("BCDE", F3))
assert w.closure("DE", F3) == "ADE" and w.lossless(R3, ["BCDE", "ADE"], F3)
assert w.lossless(R3, C3, F3) and w.preserves(C3, F3)
assert all(any(w.has(c, l + r) for c in C3) for l, r in F3)                # every FD sits inside a component
CP3, INFO3 = w.comps("c3", C3, F3)
assert [f for _, f in INFO3] == ["3NF", "BCNF", "BCNF", "BCNF"]
assert w.candidate_keys("ADE", w.project("ADE", F3)) == ["AD", "DE"]
assert w.closure("A", F3) == "AE" and not w.has(w.inter(w.closure("A", F3), "ADE"), "ADE")   # A → E: A not a superkey of ADE
OPTS3 = [("a", "משמר מידע ותלויות, וכל הרכיבים ב-BCNF"),
         ("b", "אינו משמר מידע, אך משמר תלויות"),
         ("c", "משמר מידע, אך התלות $DE \\to A$ אובדת"),
         ("d", "משמר מידע ותלויות; $R_1(A, D, E)$ ב-3NF אבל לא ב-BCNF"),
         ("e", "זהו אינו פירוק של $R$")]
TRUTH3 = {"a": False, "b": False, "c": False, "d": True, "e": False}
assert [k for k, v in TRUTH3.items() if v] == ["d"]
assert w.crosscheck() > 0

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("זה הסרטון של שלב הגמר: שתי שאלות אמיתיות ממבחנים, ועוד שאלה בסגנון מבחן."),
    P("נכריע אילו תלויות נובעות, נבדוק זוגות של תלויות, ונבדוק פירוק עד הסוף, כולל הצורה של כל רכיב."),
    P("בכל שאלה נמצא את התשובה, ונפסול כל אחת מהאחרות עם סיבה.", hold=0.4),
], stage='<div class="kicker">N09 · תלויות ונרמול</div><h1>מבחן גמר: שאלות ממבחנים</h1>'
         '<p>סגור, גזירה ופירוקים: שתי שאלות מבחן אמיתיות ושאלה בסגנון מבחן, מהתחלה ועד הסוף.</p>', layout="title")

q1 = Scene("q1", "שאלה 1: מה לא נובע", [
    P("שאלה ראשונה: ארבע תלויות. איזו מהתלויות **אינה** נובעת מ-$F$?", do=show("p-f")),
    P("ארבע מהאפשרויות מתחילות ב-$A$, אז נחשב פעם אחת את הסגור של $A$.", do=show("a1", "a1-r0")),
    P("$A \\to B$, ואז $B \\to C$. $A \\to D$, ועכשיו יש $A$ ו-$C$, אז $AC \\to E$. הסגור של $A$ הוא כל היחס.",
      do=show("a1-r1", "a1-r2", "a1-r3", "a1-r4", "a1-rend")),
    P("לכן $A \\to C$, $A \\to E$ ו-$A \\to BCDE$ נובעות. ו-$AB \\to E$ גם, כי $AB$ מכיל את $A$.",
      do=show("a-x-b", "a-x-c", "a-x-d", "a-x-e", "a-n-d")),
    P("נשארה $C \\to D$. $C$ לבדה היא לא צד שמאל של אף תלות, אז הסגור שלה הוא $C$ בלבד.", do=show("p-1")),
    P("$D$ לא שם. $C \\to D$ אינה נובעת, וזו התשובה.", do=show("a-ok-a")),
    P("הקיצור לפעם הבאה: תכונה שאף פעם לא עומדת לבד בצד שמאל, קובעת רק את עצמה.", hold=0.4),
], stage=w.stack(w.fd_set("p-f", "ABCDE", F1, hidden=True, cls="sm"), CT1,
                 w.row("p-1", "$C^+ = \\{C\\}$", cls="sm"), gap=22),
   panel=f'<div class="qstem nf-qsm"><span class="qid">{Q1["id"]}</span>איזו מהתלויות הבאות <b>אינה נובעת</b> '
         'מ-$F$?</div>' + '<div class="nf-osm">' + st.options("a", OPTS1, notes={"d": "מכיל $A$"}) + '</div>')

q2 = Scene("q2", "שאלה 2: זוגות", [
    P("שאלה שנייה: שש תכונות ושלוש תלויות. ושימו לב, אחת התכונות נקראת $F$, כמו קבוצת התלויות.",
      do=show("b-f")),
    P("השאלה: באיזו אפשרות **שתי** התלויות נמצאות בסגור? מספיקה תלות אחת שלא נובעת, והזוג נופל."),
    P("$B$ ו-$E$ לא עומדות לבד באף צד שמאל. לכן הסגור של $B$ הוא $B$, והסגור של $E$ הוא $E$.",
      do=show("b-1", "b-2")),
    P("כל זוג עם $B \\to C$ או עם $E \\to C$ נופל. ככה נפסלות ארבע אפשרויות.",
      do=show("b-x-a", "b-x-b", "b-x-c", "b-x-d", "b-n-b")),
    P("ונוודא את האחרונה: $F \\to AE$ נתונה, ובפירוק נותנת גם $F \\to A$ וגם $F \\to E$.",
      do=show("b-f-fh0", "b-3", "b-ok-e")),
    P("המלכודת: באפשרות עם $C \\to D$, החצי הזה דווקא נכון, דרך $C \\to AD$. אבל $B \\to C$ שלידה לא.",
      hold=0.4),
], stage=w.stack(w.fd_set("b-f", "ABCDEF", F2, hidden=True, cls="sm"),
                 w.row("b-1", "$B^+ = \\{B\\}$", cls="sm"), w.row("b-2", "$E^+ = \\{E\\}$", cls="sm"),
                 w.row("b-3", "$F \\to AE$ ← $F \\to A$, &nbsp;$F \\to E$ &nbsp;(פירוק)", cls="sm"), gap=26),
   panel=f'<div class="qstem nf-qsm"><span class="qid">{Q2["id"]}</span>מי מהתלויות הבאות נמצאות בסגור של $F$?'
         '</div>' + '<div class="nf-osm">' + st.options("b", OPTS2, notes={"b": "חצי נכון"}) + '</div>')

q3 = Scene("q3", "שאלה 3: פירוק", [
    P("שאלה שלישית, בסגנון מבחן: ארבע תלויות, ופירוק לארבעה רכיבים. מה נכון?",
      do=show("c-f", "c3", "c3-c0", "c3-c1", "c3-c2", "c3-c3")),
    P("קודם, כל חמש התכונות מופיעות ברכיבים. אז זה פירוק.", do=show("q-x-e")),
    P("מידע, צעד אחרי צעד. $BC$ ו-$CD$ נחתכים ב-$C$, ו-$C$ קובעת את $D$. מאחדים בלי הפסד, ומקבלים $BCD$.",
      do=show("c-1")),
    P("$BCD$ ו-$BE$ נחתכים ב-$B$, והסגור של $B$ הוא $B$, $C$, $D$. שוב בלי הפסד: $BCDE$.", do=show("c-2")),
    P("ואחרון, עם $ADE$: החיתוך $DE$, והסגור שלה הוא $A$, $D$, $E$. כל הרכיב. הפירוק משמר מידע.",
      do=show("c-3", "q-x-b", "q-n-b")),
    P("תלויות: $B \\to C$ ב-$BC$, $C \\to D$ ב-$CD$, ושתי האחרות ב-$ADE$. כל אחת שלמה ברכיב, אז אף אחת לא אבדה.",
      do=show("c-4", "q-x-c", "q-n-c")),
    P("ועכשיו הצורה. ב-$ADE$ חלות $DE \\to A$ ו-$A \\to E$. המפתחות של הרכיב: $AD$ ו-$DE$.", do=show("c-5")),
    P("$A \\to E$: $A$ לבדה אינה מפתח-על של $ADE$, ולכן הרכיב לא ב-BCNF. אבל $E$ ראשונית ברכיב, אז הוא ב-3NF.",
      do=show("c3-v0", "c3-v1", "c3-v2", "c3-v3", "q-x-a", "q-n-a")),
    P("לכן: משמר מידע ותלויות, ו-$ADE$ ב-3NF אבל לא ב-BCNF. זו התשובה.", do=show("q-ok-d")),
    P("המלכודת: לשפוט רכיב לפי המפתחות של $R$. בודקים אותו לפי המפתחות **שלו**, והתלויות שחלות עליו.",
      hold=0.5),
], stage=w.stack(w.fd_set("c-f", R3, F3, hidden=True, cls="sm"), CP3.replace('class="nf-comps ', 'class="nf-comps h ', 1),
                 w.row("c-1", "$C^+ = \\{C, D\\}$ ← $BCD$", cls="sm"),
                 w.row("c-2", "$B^+ = \\{B, C, D\\}$ ← $BCDE$", cls="sm"),
                 w.row("c-3", '$DE^+ = \\{A, D, E\\}$ ← <span class="nf-ok">משמר מידע</span>', cls="sm"),
                 w.row("c-4", '<span class="nf-ok">כל תלות בתוך רכיב</span>', cls="sm"),
                 w.row("c-5", "$ADE$: מפתחות $AD$, $DE$", cls="sm"), gap=12),
   panel='<div class="qstem nf-qsm"><span class="qid">בסגנון מבחן</span>הפירוק $R_1(A, D, E)$, $R_2(C, D)$, '
         '$R_3(B, C)$, $R_4(B, E)$. מה נכון?</div>'
         + '<div class="nf-osm">' + st.options("q", OPTS3, notes={"a": "$A \\to E$", "b": "משמר", "c": "ב-$R_1$"})
         + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: תלות נובעת אם הצד הימני שלה בסגור של הצד השמאלי. ותכונה שלא עומדת לבד משמאל קובעת רק את עצמה.",
      do=show("r-1")),
    P("בשאלת זוגות, מספיקה תלות אחת שלא נובעת כדי לפסול את הזוג.", do=show("r-2")),
    P("ובפירוק, בודקים מידע ותלויות בנפרד, ולכל תלות שלא יושבת ברכיב, מריצים את הגזירה. בהצלחה במבחן!",
      do=show("r-3"), hold=0.6),
], stage=w.stack(w.big("r-f", r"X \to Y \in F^+ \iff Y \subseteq X^+", hidden=False, cls="sm")),
   panel=st.card("r-1", "rule", "🔑 סגור של הצד השמאלי")
         + st.card("r-2", "trap", "⚠️ זוג: שתיהן חייבות לנבוע")
         + st.card("r-3", "rule", "🔑 פירוק: מידע ותלויות, בנפרד"))

VIDEO = Video("N09", "norm", "מבחן גמר: שאלות ממבחנים", [title, q1, q2, q3, recap],
              bank={"26B-A-Q17": "a", "21B-C-Q21": "e"})
