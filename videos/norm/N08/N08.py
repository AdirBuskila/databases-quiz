# -*- coding: utf-8 -*-
"""N08 · אלגוריתמי נרמול: BCNF ו-3NF — video script (build: tools/video/vid.py N08).

Source: norm/levels/N08.js (lesson + goal: the BCNF decomposition (split on a violation X → Y into X ∪ Y and
R ∖ (Y ∖ X), repeat on each component with the FDs that hold on it) and the 3NF synthesis (minimal cover, a component
per FD, a key component if needed, drop contained components); judge a component by its projected FDs).
Exam part: an original question "בסגנון מבחן" (bank={}): the free bank items of this level are 21S-B-Q24 (its 3NF
cover would reveal the quiz item 21S-B-Q22) and the N08/N09 quiz ids (21S-B-Q21, 21S-B-Q23, 25B-A-Q20).
Avoided on purpose: the N08 quiz schemas (A → B, B → C on ABC and ABCD; AB → C, C → B; A → B, C → D, AC → E;
A → BC, D → E; A → B, B → C, CD → E, E → G) and their shapes, the lesson examples, and the guarantee table "which
algorithm always preserves what" (it answers N08-Q8 and 21S-B-Q23): the video shows one concrete run that loses an FD
and one synthesis, without stating the general rule. Every split, projection, NF verdict, lossless and preservation
result is asserted with w_norm (cross-checked with tools/fdlib.js).
"""
from vid import Scene, Video
import stage as st
import w_norm as w
from w_norm import P, show, hide

# ---------------------------------------------------------------- BCNF decomposition (verified)
R = "ABCDE"
F = w.parse_f("AB -> C, C -> D, B -> E")
assert w.candidate_keys(R, F) == ["AB"] and w.normal_form(R, F) != "BCNF"
S1 = w.bcnf_split(R, "C", "D", F)
assert S1 == ("CD", "ABCE")
assert sorted(w.show_cover("ABCE", F)) == [("AB", "C"), ("B", "E")]                  # what holds on ABCE
assert w.candidate_keys("ABCE", w.project("ABCE", F)) == ["AB"]
S2 = w.bcnf_split("ABCE", "B", "E", F)
assert S2 == ("BE", "ABC")
FIN = ["CD", "BE", "ABC"]
assert [w.nf_of_component(c, F) for c in FIN] == ["BCNF"] * 3
assert w.lossless(R, FIN, F) and w.preserves(FIN, F)
BT = w.table("bt", ["רכיב", "תלות מפרה", "מפרקים ל-"], [
    ["$ABCDE$", "$C \\to D$", "$CD$ &nbsp;+&nbsp; $ABCE$"],
    ["$ABCE$", "$B \\to E$", "$BE$ &nbsp;+&nbsp; $ABC$"]], ids=["bt-0", "bt-1"])
BC, _ = w.comps("bf", FIN, F)

# ---------------------------------------------------------------- 3NF synthesis (verified)
R3 = "ABCDE"
F3 = w.parse_f("A -> C, C -> E, B -> D")
assert w.is_minimal_cover_of(F3, F3)
SY, ADDED = w.synth_3nf(R3, F3)
assert SY == ["AC", "CE", "BD", "AB"] and ADDED == "AB" and w.candidate_keys(R3, F3) == ["AB"]
assert w.lossless(R3, SY, F3) and w.preserves(SY, F3)
assert not w.lossless(R3, SY[:3], F3)                                       # without the key component: lossy
SC, SINFO = w.comps("sy", SY, F3)
assert [f for _, f in SINFO] == ["BCNF"] * 4

# ---------------------------------------------------------------- exam-style (original): the projection trap
RX = "ABCDE"
FX = w.parse_f("A -> BC, BC -> D, E -> A")
assert w.candidate_keys(RX, FX) == ["E"]
X1 = w.bcnf_split(RX, "A", "BC", FX)
assert X1 == ("ABC", "ADE")
assert w.show_cover("ADE", FX) == [("A", "D"), ("E", "A")]                   # A → D holds on ADE (via BC → D)
assert w.nf_of_component("ADE", FX) != "BCNF"
X2 = w.bcnf_split("ADE", "A", "D", FX)
assert X2 == ("AD", "AE")
XFIN = ["ABC", "AD", "AE"]
assert [w.nf_of_component(c, FX) for c in XFIN] == ["BCNF"] * 3
assert w.lossless(RX, XFIN, FX) and w.lost_fds(XFIN, FX) == [("BC", "D")]
assert w.preserve_trace(("BC", "D"), XFIN, FX) == ([], "BC")                  # the Z-loop never grows
assert w.closure("E", FX) == RX and "E" not in "".join(r for _, r in FX)
# option c: the other start (BC → D first) keeps every FD
Y1 = w.bcnf_split(RX, "BC", "D", FX)
assert Y1 == ("BCD", "ABCE")
Y2 = w.bcnf_split("ABCE", "A", "BC", FX)
assert Y2 == ("ABC", "AE")
YFIN = ["BCD", "ABC", "AE"]
assert [w.nf_of_component(c, FX) for c in YFIN] == ["BCNF"] * 3 and w.preserves(YFIN, FX)
XOPTS = [("a", "$R_1(A, B, C)$, $R_2(A, D)$, $R_3(A, E)$: משמר מידע, והתלות $BC \\to D$ אבדה"),
         ("b", "$R_1(A, B, C)$, $R_2(A, D, E)$: שניהם כבר ב-BCNF, משמר מידע ותלויות"),
         ("c", "$R_1(A, B, C)$, $R_2(B, C, D)$, $R_3(A, E)$: משמר מידע ותלויות"),
         ("d", "$R_1(A, B, C)$, $R_2(A, D)$, $R_3(A, E)$: הפירוק מפסיד מידע")]
TRUTH = {"a": True, "b": False, "c": False, "d": False}
assert w.nf_of_component("ADE", FX) != "BCNF"                                # b is false
assert XFIN != YFIN                                                          # c is another run, not this one
assert w.lossless(RX, XFIN, FX)                                              # d is false
assert [k for k, v in TRUTH.items() if v] == ["a"]
XC, _ = w.comps("xc", XFIN, FX)
assert w.crosscheck() > 0

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נבנה פירוקים בעצמנו, עם שני האלגוריתמים של הקורס."),
    P("פירוק ל-BCNF מלמעלה למטה, וסינתזה ל-3NF מלמטה למעלה. ונראה איך שופטים כל רכיב לפי התלויות שחלות עליו."),
    P("ובסוף נפתור שאלה בסגנון מבחן.", hold=0.4),
], stage='<div class="kicker">N08 · תלויות ונרמול</div><h1>אלגוריתמי נרמול: BCNF ו-3NF</h1>'
         '<p>להריץ את אלגוריתם הפירוק ל-BCNF ואת הסינתזה ל-3NF, ולשפוט כל רכיב לפי התלויות שחלות עליו.</p>',
   layout="title")

bcnf = Scene("bcnf", "פירוק ל-BCNF", [
    P("פירוק ל-BCNF: מוצאים תלות $X \\to Y$ שמפרה, כלומר $X$ אינו מפתח-על של הרכיב.", do=show("b-c1")),
    P("ומפרקים לשניים: רכיב אחד הוא $X$ עם $Y$, והשני הוא כל השאר, בלי $Y$ אבל עם $X$.", do=show("b-c2")),
    P("נריץ. חמש תכונות, והמפתח היחיד הוא $AB$. $C \\to D$ מפרה, כי $C$ אינה מפתח-על.",
      do=show("b-f", "b-f-fh1")),
    P("מפרקים: $CD$, ו-$ABCE$.", do=show("bt", "bt-0")),
    P("עכשיו בודקים את $ABCE$, לפי התלויות שחלות עליו: $AB \\to C$ ו-$B \\to E$. גם כאן המפתח $AB$.",
      do=hide("b-f-fh1") + show("b-f-fh2")),
    P("$B \\to E$ מפרה. מפרקים שוב: $BE$, ו-$ABC$.", do=show("bt-1")),
    P("קיבלנו שלושה רכיבים, וכל אחד מהם ב-BCNF. וכאן כל התלויות נשמרו, כל אחת ברכיב משלה.",
      do=hide("b-f-fh2") + show("bf-c0", "bf-c1", "bf-c2", "bf-v0", "bf-v1", "bf-v2"), hold=0.4),
], stage=w.stack(w.fd_set("b-f", R, F, hidden=True, cls="sm"), BT, BC, gap=22),
   panel=st.card("b-c1", "rule", "1. הפרה: $X \\to Y$, ו-$X$ לא מפתח-על")
         + st.card("b-c2", "rule", "2. $R_1 = X \\cup Y$, &nbsp;$R_2 = R \\setminus (Y \\setminus X)$"))

synth = Scene("synth", "סינתזה ל-3NF", [
    P("ועכשיו סינתזה ל-3NF. מתחילים מכיסוי מינימלי. כאן הוא כבר נתון.", do=show("s-f", "s-c1")),
    P("לכל תלות בכיסוי בונים רכיב: הצד השמאלי והימני יחד. $AC$, $CE$ ו-$BD$.",
      do=show("s-c2", "sy", "sy-c0", "sy-c1", "sy-c2")),
    P("ואז שואלים: האם יש רכיב שמכיל מפתח קביל של $R$?", do=show("s-c3")),
    P("$A$ ו-$B$ לא מופיעות בצד ימין, אז הן בכל מפתח, והסגור של $AB$ הוא כל היחס. המפתח הוא $AB$."),
    P("אף רכיב לא מכיל את $AB$. לכן מוסיפים רכיב רביעי: $AB$.", do=show("sy-c3")),
    P("ובדקנו: כאן, בלי $AB$, הצירוף של שלושת הרכיבים האחרים היה מפסיד מידע.", do=show("s-c4")),
    P("ואחרון: מוחקים רכיב שמוכל כולו ברכיב אחר. כאן אין כזה.", do=show("s-c5")),
    P("וכל תלות מהכיסוי יושבת כאן שלמה ברכיב משלה, ולכן בדוגמה הזאת אף תלות לא אבדה.",
      do=show("sy-v0", "sy-v1", "sy-v2", "sy-v3"), hold=0.4),
], stage=w.stack(w.fd_set("s-f", R3, F3, hidden=True, cls="sm"), SC, gap=34),
   panel=st.card("s-c1", "rule", "1. כיסוי מינימלי $F_c$")
         + st.card("s-c2", "rule", "2. רכיב לכל תלות: $X \\cup Y$")
         + st.card("s-c3", "rule", "3. אין רכיב עם מפתח? מוסיפים")
         + st.card("s-c4", "trap", "⚠️ בלי $AB$: מפסיד מידע")
         + st.card("s-c5", "rule", "4. מוחקים רכיב שמוכל באחר"))

exam = Scene("exam", "שאלה בסגנון מבחן", [
    P("שאלה בסגנון מבחן: חמש תכונות ושלוש תלויות.", do=show("x-f")),
    P("המפתח היחיד הוא $E$, כי $E$ לא מופיעה בצד ימין, והסגור שלה הוא כל היחס."),
    P("מריצים פירוק ל-BCNF, ומתחילים מההפרה $A \\to BC$. מה מתקבל?", do=show("x-f-fh0")),
    P("הפיצול הראשון: $ABC$, ו-$ADE$. ב-$ABC$, $A$ הוא מפתח. הרכיב הזה ב-BCNF.", do=show("xc", "xc-c0", "xc-v0")),
    P("ועכשיו $ADE$. מ-$F$ יושבת בו רק $E \\to A$, ו-$E$ מפתח שלו, אז הוא נראה תקין. אבל צריך את כל התלויות **שחלות** עליו.",
      do=hide("x-f-fh0") + show("x-1")),
    P("הסגור של $A$ הוא $A$, $B$, $C$ ו-$D$, דרך $BC \\to D$. אז ב-$ADE$ חלה $A \\to D$, ו-$A$ אינה מפתח שם.",
      do=show("x-2")),
    P("זו המלכודת: מי שעוצר כאן חושב ש-$ADE$ כבר ב-BCNF.", do=show("q-x-b", "q-n-b")),
    P("מפרקים אותו ל-$AD$ ו-$AE$. החיתוך $A$ קובע את $D$, אז גם כאן הצירוף בלי הפסד, והתוצאה משמרת מידע.", do=show("xc-c1", "xc-c2", "xc-v1", "xc-v2",
                                                                              "q-x-d", "q-n-d")),
    P("אבל $BC \\to D$: $B$ ו-$C$ ב-$ABC$, ו-$D$ ב-$AD$. אין רכיב שמחזיק את שלושתן.", do=show("x-f-fh1")),
    P("וגם אין דרך לגזור אותה: מתחילים מ-$BC$, וב-$ABC$ הן קובעות רק את עצמן. ב-$AD$ וב-$AE$ אין להן כלום.",
      do=show("x-3")),
    P("היא אבדה. וזו התשובה.", do=show("q-ok-a")),
    P("ואם הייתם מתחילים מ-$BC \\to D$, הייתם מקבלים $BCD$, $ABC$ ו-$AE$, ושום תלות לא הייתה אובדת.",
      do=show("q-x-c", "q-n-c")),
    P("אבל השאלה ביקשה להתחיל מ-$A \\to BC$. בפירוק ל-BCNF, סדר ההפרות משנה את התוצאה.",
      do=show("x-c1"), hold=0.5),
], stage=w.stack(w.fd_set("x-f", RX, FX, hidden=True, cls="sm"), XC.replace('class="nf-comps ', 'class="nf-comps h ', 1),
                 w.row("x-1", "$ADE$: מה חל עליו?", cls="sm"),
                 w.row("x-2", "$A^+ = \\{A, B, C, D\\}$ ← $A \\to D$", cls="sm"),
                 w.row("x-3", '$Z = \\{B, C\\}$, לא גדל &nbsp;<span class="nf-no">$BC \\to D$ אבדה</span>', cls="sm"), gap=18),
   panel='<div class="qstem nf-qsm"><span class="qid">בסגנון מבחן</span>מריצים פירוק ל-BCNF ומתחילים מההפרה '
         '$A \\to BC$. מה מתקבל?</div>'
         + '<div class="nf-osm">' + st.options("q", XOPTS, notes={"b": "$A \\to D$ חלה", "c": "סדר אחר",
                                                                 "d": "משמר"}) + '</div>'
         + st.card("x-c1", "trap", "⚠️ שופטים רכיב לפי מה <b>שחל</b> עליו"))

recap = Scene("recap", "סיכום", [
    P("לסיכום: פירוק ל-BCNF מפצל על הפרה $X \\to Y$, לרכיב של $X$ ו-$Y$, ולרכיב של כל השאר עם $X$.",
      do=show("r-1")),
    P("וממשיכים על כל רכיב, לפי התלויות שחלות עליו, גם אם הן לא כתובות ב-$F$.", do=show("r-2")),
    P("סינתזה ל-3NF: כיסוי מינימלי, רכיב לכל תלות, רכיב מפתח אם חסר, ומחיקת רכיבים מוכלים.", do=show("r-3")),
    P("ובפירוק ל-BCNF, בדקו תמיד אילו תלויות אבדו בדרך. נתראה בשלב הגמר.", do=show("r-4"), hold=0.6),
], stage=w.stack(w.big("r-f", r"R_1 = X \cup Y,\ \ R_2 = R \setminus (Y \setminus X)", hidden=False, cls="xs")),
   panel=st.card("r-1", "rule", "🔑 BCNF: מפצלים על הפרה")
         + st.card("r-2", "trap", "⚠️ רכיב נשפט לפי מה שחל עליו")
         + st.card("r-3", "rule", "🔑 3NF: רכיב לכל תלות + מפתח")
         + st.card("r-4", "ex", "בדקו אילו תלויות אבדו"))

VIDEO = Video("N08", "norm", "אלגוריתמי נרמול: BCNF ו-3NF", [title, bcnf, synth, exam, recap], bank={})
