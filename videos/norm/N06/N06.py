# -*- coding: utf-8 -*-
"""N06 · צורות נורמליות — video script (build: tools/video/vid.py N06).

Source: norm/levels/N06.js (lesson + goal: 1NF, 2NF, 3NF, BCNF; the decision tree: all candidate keys -> prime
attributes -> an FD whose left side is not a superkey: none = BCNF, right side prime = 3NF only, else not 3NF).
Exam anchors: 26Z-CL-Q17 (all candidate keys, key c) and 26Z-CL-Q18 (3NF but not BCNF, key d), one schema.
Avoided on purpose: the N06 quiz schemas (A → BC; A → B, B → C; AB → C, C → B; A → BC, AE → D; AB → CD, D → A;
AB → C, B → D; the N06-Q8 decomposition), the quiz ids 21B-A-Q21, 21B-C-Q22, 25C-A-Q20, and the lesson example.
The worked schema below is new; keys, primes and every NF verdict come from w_norm.nf_table / normal_form, which mirror
tools/fdlib.js normalForm and are cross-checked with it.
"""
from vid import Scene, Video, BANK
import stage as st
import w_norm as w
from w_norm import P, show, hide

# ---------------------------------------------------------------- worked example (verified)
R = "ABCDE"
F = w.parse_f("AB -> CE, C -> A, E -> D")
assert w.minus(R, w.norm("".join(r for _, r in F))) == "B"               # B on no right side: in every key
assert w.candidate_keys(R, F) == ["AB", "BC"] and w.primes(R, F) == "ABC"
assert w.closure("B", F) == "B" and w.closure("BE", F) == "BDE" and w.closure("BD", F) == "BD"
NT, NF_, NFORM = w.nf_table("n", R, F)
assert NF_ == [(True, None), (False, True), (False, False)]            # AB → CE ok · C → A 3NF-ok · E → D violates 3NF
assert NFORM == "2NF"                                                  # not 3NF, but no partial dependency
assert all(w.minus(w.minus(w.closure(s, F), s), "ABC") == "" for s in "ABC")   # parts of keys determine only primes

# ---------------------------------------------------------------- exam 26Z-CL-Q17 + Q18
Q1, Q2 = BANK["26Z-CL-Q17"], BANK["26Z-CL-Q18"]
assert Q1["correctId"] == "c" and Q2["correctId"] == "d" and Q1["contextId"] == Q2["contextId"] == "26Z-CL-fd"
FX = w.parse_f("AB -> C, C -> D, D -> A, BD -> E")
assert w.minus(R, w.norm("".join(r for _, r in FX))) == "B" and w.closure("B", FX) == "B"
KX = w.candidate_keys(R, FX)
assert KX == ["AB", "BC", "BD"]
XT, XF = w.key_table("xk", R, FX, ["AB", "BC", "BD", "BE"], cls="xs")
assert [(sk, ck) for _, sk, ck in XF] == [(True, True), (True, True), (True, True), (False, False)]
assert w.closure("BE", FX) == "BE"
O1 = {o["id"]: o["value"] for o in Q1["options"]}
assert "{B, C}" in O1["c"] and "{B, D}" in O1["c"] and "{C, D}" in O1["d"] and "{B, E}" in O1["e"]
assert not w.is_superkey("CD", R, FX) and not w.is_superkey("BE", R, FX)
NX, NXF, NXFORM = w.nf_table("xn", R, FX, cls="xs")
assert NXF == [(True, None), (False, True), (False, True), (True, None)] and NXFORM == "3NF"
assert w.primes(R, FX) == "ABCD"
O2 = {o["id"]: o["value"] for o in Q2["options"]}
assert "BCNF" in O2["a"] and "C → D" in O2["b"] and "D → A" in O2["c"] and "3NF" in O2["d"]
OPTS1 = [(k, w.opt_tex(v)) for k, v in O1.items()]
OPTS2 = [(k, w.opt_tex(v)) for k, v in O2.items()]
assert w.crosscheck() > 0

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד את הצורות הנורמליות: מהראשונה ועד BCNF."),
    P("נראה מה כל אחת דורשת, ונבנה עץ החלטה אחד שעובד על כל שאלה."),
    P("ובסוף נפתור שאלה ממבחן, בשני חלקים.", hold=0.4),
], stage='<div class="kicker">N06 · תלויות ונרמול</div><h1>צורות נורמליות</h1>'
         '<p>לקבוע אם יחס נמצא ב-1NF, ‏2NF, ‏3NF או BCNF בעזרת עץ ההחלטה: מפתחות, תכונות ראשוניות ותלות מפרה.</p>',
   layout="title")

forms = Scene("forms", "ארבע צורות", [
    P("1NF: כל ערך בתא הוא **אטומי**. אין רשימה של כמה טלפונים בתוך תא אחד.", do=show("f-1")),
    P("2NF: אין תכונה **לא-ראשונית** שתלויה בחלק ממפתח קביל. תלות כזו נקראת תלות חלקית.", do=show("f-2")),
    P("3NF: לכל תלות לא טריוויאלית $X \\to Y$, או ש-$X$ מפתח-על, או שכל התכונות ב-$Y$ שאינן ב-$X$ ראשוניות.",
      do=show("f-3")),
    P("BCNF: לכל תלות לא טריוויאלית, $X$ חייב להיות מפתח-על. בלי יוצאים מן הכלל.", do=show("f-4")),
    P("כל יחס ב-BCNF הוא גם ב-3NF, כל יחס ב-3NF הוא גם ב-2NF, וכן הלאה. ההפך לא נכון.", do=show("f-c1"),
      hold=0.4),
], stage=w.table("f-t", ["צורה", "הדרישה"], [
    ["1NF", "ערכים אטומיים"],
    ["2NF", "אין תכונה לא-ראשונית שתלויה בחלק ממפתח"],
    ["3NF", "$X$ מפתח-על, או $Y$ ראשוני"],
    ["BCNF", "$X$ מפתח-על, תמיד"]], hidden=False, ids=["f-1", "f-2", "f-3", "f-4"]),
   panel=st.card("f-c1", "rule", "🔑 כל BCNF הוא 3NF, כל 3NF הוא 2NF, כל 2NF הוא 1NF"))

tree = Scene("tree", "עץ ההחלטה", [
    P("ובשאלה, הולכים תמיד באותו מסלול.", do=show("t-1")),
    P("קודם מוצאים את **כל** המפתחות הקבילים.", do=show("t-2")),
    P("ואז מסמנים את התכונות הראשוניות: אלה שמופיעות במפתח קביל כלשהו.", do=show("t-3")),
    P("ומחפשים תלות שהצד השמאלי שלה **אינו** מפתח-על. אין כזו? היחס ב-BCNF.", do=show("t-4")),
    P("יש כזו, והצד הימני שלה ראשוני? היחס ב-3NF, אבל לא ב-BCNF.", do=show("t-5")),
    P("ויש כזו, והצד הימני לא ראשוני? היחס לא ב-3NF, ובטח שלא ב-BCNF.", do=show("t-6"), hold=0.4),
], stage=w.stack(w.row("t-1", "<b>עץ ההחלטה</b>"),
                 w.row("t-2", "1. כל המפתחות הקבילים", cls="sm"),
                 w.row("t-3", "2. התכונות הראשוניות", cls="sm"),
                 w.row("t-4", "3. שמאל לא מפתח-על? &nbsp;אין ← <span class=\"nf-ok\">BCNF</span>", cls="sm"),
                 w.row("t-5", "יש, וימין ראשוני ← <span class=\"nf-warn\">3NF בלבד</span>", cls="sm"),
                 w.row("t-6", "יש, וימין לא ראשוני ← <span class=\"nf-no\">לא 3NF</span>", cls="sm"), gap=22))

example = Scene("example", "מריצים את העץ", [
    P("נריץ את העץ. חמש תכונות ושלוש תלויות.", do=show("e-f")),
    P("$B$ לא מופיעה באף צד ימין, אז היא בכל מפתח. והסגור של $AB$ הוא כל היחס.", do=show("e-1")),
    P("גם $BC$: $C \\to A$ נותנת את $A$, ואז $AB \\to CE$ ו-$E \\to D$. שני מפתחות: $AB$ ו-$BC$.",
      do=show("e-2")),
    P("לכן התכונות הראשוניות הן $A$, $B$ ו-$C$. ו-$D$ ו-$E$ לא ראשוניות.", do=show("e-3")),
    P("עכשיו התלויות. $AB \\to CE$: הצד השמאלי הוא מפתח. תקינה.", do=show("n", "n-r0", "n-k0", "n-p0", "n-v0")),
    P("$C \\to A$: $C$ לבדה אינה מפתח-על. אבל $A$ ראשונית, ולכן מותרת ב-3NF. היא רק מפרה BCNF.",
      do=show("n-r1", "n-k1", "n-p1", "n-v1")),
    P("$E \\to D$: $E$ אינה מפתח-על, ו-$D$ לא ראשונית. זו הפרה של 3NF.", do=show("n-r2", "n-k2", "n-p2", "n-v2")),
    P("אז היחס לא ב-3NF, וגם לא ב-BCNF. ומה עם 2NF?", do=show("e-4")),
    P("החלקים של המפתחות הם $A$, $B$ ו-$C$, וכל אחד מהם קובע רק תכונות ראשוניות. אין תלות חלקית.",
      do=show("e-5")),
    P("לכן הצורה הגבוהה ביותר כאן היא 2NF. והתלות $E \\to D$ היא תלות **מעבר**, דרך תכונה שאינה מפתח.",
      do=show("e-6"), hold=0.4),
], stage=w.stack(w.fd_set("e-f", R, F, hidden=True, cls="sm"), NT, gap=26),
   panel=w.row("e-1", "$AB^+ = R$", cls="sm") + w.row("e-2", "$BC^+ = R$", cls="sm")
         + st.card("e-3", "ex", "ראשוניות: $A, B, C$")
         + st.card("e-4", "trap", "⚠️ $E \\to D$ ← לא 3NF")
         + st.card("e-5", "ex", "חלקי מפתח ← רק ראשוניות")
         + st.card("e-6", "rule", "🔑 התוצאה: 2NF"))

exam1 = Scene("exam1", "מבחן: המפתחות", [
    P("שאלה ממבחן, חלק ראשון: מהם **כל** המפתחות הקבילים?", do=show("x-f")),
    P("$B$ לא מופיעה באף צד ימין, אז היא בכל מפתח. אבל הסגור של $B$ לבד הוא רק $B$.", do=show("x-c1")),
    P("מנסים את $B$ עם כל תכונה. $AB$: $AB \\to C$, ואז $D$, ו-$BD \\to E$. הכול.", do=show("xk", "xk-r0", "xk-s0")),
    P("$BC$: $C \\to D$ ו-$D \\to A$, ואז שתי התלויות האחרות. גם הכול.", do=show("xk-r1", "xk-s1")),
    P("$BD$: $D \\to A$, ואז $AB \\to C$ ו-$BD \\to E$. גם הכול. ו-$BE$ לא מגיע לשום מקום.",
      do=show("xk-r2", "xk-s2", "xk-r3", "xk-s3", "xk-m3")),
    P("כל השלושה מינימליים, כי אף תכונה לבד אינה מפתח. לכן יש שלושה מפתחות: $AB$, $BC$ ו-$BD$.",
      do=show("xk-m0", "xk-m1", "xk-m2", "a-ok-c")),
    P("$CD$ אינו מפתח כי אין בו $B$, ו-$BE$ אינו מפתח-על. שאר האפשרויות שוכחות מפתח.",
      do=show("a-x-a", "a-x-b", "a-x-d", "a-n-d", "a-x-e", "a-n-e"), hold=0.4),
], stage=w.stack(w.fd_set("x-f", R, FX, name="F_1", hidden=True, cls="sm"), XT, gap=24),
   panel=f'<div class="qstem nf-qsm"><span class="qid">{Q1["id"]}</span>מהם <b>כל</b> המפתחות הקבילים של $R$ '
         'בהינתן $F_1$?</div>' + st.card("x-c1", "rule", "🔑 $B$ בכל מפתח")
         + '<div class="nf-osm">' + st.options("a", OPTS1, notes={"d": "בלי $B$", "e": "$BE$ לא"}) + '</div>')

exam2 = Scene("exam2", "מבחן: הצורה", [
    P("חלק שני: באיזו צורה נורמלית היחס? הראשוניות: $A$, $B$, $C$ ו-$D$. רק $E$ לא ראשונית.", do=show("y-c1")),
    P("$AB \\to C$ ו-$BD \\to E$: הצד השמאלי הוא מפתח. תקינות.",
      do=show("xn", "xn-r0", "xn-k0", "xn-p0", "xn-v0", "xn-r3", "xn-k3", "xn-p3", "xn-v3")),
    P("$C \\to D$: $C$ אינה מפתח-על, ולכן BCNF נופלת. אבל $D$ ראשונית, אז 3NF מתירה אותה.",
      do=show("xn-r1", "xn-k1", "xn-p1", "xn-v1")),
    P("$D \\to A$: אותו דבר. $D$ אינה מפתח-על, ו-$A$ ראשונית.", do=show("xn-r2", "xn-k2", "xn-p2", "xn-v2")),
    P("לכן היחס ב-3NF, אבל לא ב-BCNF. זו התשובה.", do=show("b-ok-d")),
    P("״לא ב-3NF בגלל $C \\to D$״ שוכחת לבדוק ראשוניות: $D$ ראשונית.", do=show("b-x-b", "b-n-b")),
    P("ו״לא ב-2NF בגלל $D \\to A$״: תלות חלקית פוסלת 2NF רק כשהיא קובעת תכונה **לא** ראשונית, ו-$A$ ראשונית.",
      do=show("b-x-c", "b-n-c")),
    P("זו המלכודת של הפרק: מצאתם הפרה? לפני שבוחרים, בדקו אם הצד הימני ראשוני.",
      do=show("b-x-a", "b-x-e"), hold=0.5),
], stage=w.stack(w.fd_set("y-f", R, FX, name="F_1", cls="xs"), NX, gap=24),
   panel=f'<div class="qstem nf-qsm"><span class="qid">{Q2["id"]}</span>איזו מהטענות הבאות נכונה לגבי $R$ עם '
         '$F_1$?</div>' + st.card("y-c1", "ex", "ראשוניות: $A, B, C, D$")
         + '<div class="nf-osm">' + st.options("b", OPTS2, notes={"b": "$D$ ראשונית", "c": "$A$ ראשונית"})
         + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: BCNF דורשת שכל צד שמאל יהיה מפתח-על.", do=show("r-1")),
    P("3NF מתירה גם תלות שהצד הימני שלה ראשוני.", do=show("r-2")),
    P("והמסלול קבוע: מפתחות, ראשוניות, ואז מחפשים צד שמאל שאינו מפתח-על.", do=show("r-3")),
    P("ורכיב של פירוק בודקים לפי התלויות שחלות עליו, גם אם הן לא כתובות ב-$F$. על זה ברמות הבאות. נתראה.",
      do=show("r-4"), hold=0.6),
], stage=w.stack(w.big("r-f", r"X \to Y", hidden=False)),
   panel=st.card("r-1", "rule", "🔑 BCNF: $X$ מפתח-על")
         + st.card("r-2", "rule", "🔑 3NF: או $Y$ ראשוני")
         + st.card("r-3", "ex", "מפתחות ← ראשוניות ← הפרה")
         + st.card("r-4", "trap", "⚠️ מצאתם הפרה? בדקו ראשוניות"))

VIDEO = Video("N06", "norm", "צורות נורמליות", [title, forms, tree, example, exam1, exam2, recap],
              bank={"26Z-CL-Q17": "c", "26Z-CL-Q18": "d"})
