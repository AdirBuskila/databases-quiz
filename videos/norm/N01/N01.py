# -*- coding: utf-8 -*-
"""N01 · תלות פונקציונלית — video script (build: tools/video/vid.py N01).

Source: norm/levels/N01.js (lesson + goal: X → Y means equal X forces equal Y; trivial FDs; reading an instance: a
violating pair proves the FD is not in F, an instance that satisfies it proves only "maybe").
Exam part: an original question "בסגנון מבחן" (bank={}): the only bank instance question of the topic, 23B-A-Q17, is a
quiz id (cited in the N01 quiz), and the fd_norm bank has no other instance question.
Avoided on purpose: the N01 quiz tables (T1-T4, Emp), the lesson figure, the lesson/quiz trivial examples (AB → A,
A → AB) and the N09 instance S(P, Q, T). The instance below is new; every holds/violates verdict is computed with
w_norm.instance_holds and cross-checked with tools/fdlib.js.
"""
from vid import Scene, Video
import stage as st
import w_norm as w
from w_norm import P, show, hide

# ---------------------------------------------------------------- the instance (verified)
COLS = ["A", "B", "C", "D"]
ROWS = [[1, "x", 5, "p"], [2, "y", 5, "q"], [1, "x", 7, "q"], [3, "y", 7, "p"], [1, "x", 5, "q"]]
T4 = ROWS[:4]
assert w.instance_holds(COLS, T4, "A -> B")
assert not w.instance_holds(COLS, T4, "A -> C") and w.violating_pair(COLS, T4, "A -> C") == (0, 2)
assert not w.instance_holds(COLS, T4, "B -> A") and w.violating_pair(COLS, T4, "B -> A") == (1, 3)
assert w.violating_pair(COLS, T4, "A -> B") is None
assert w.instance_holds(COLS, T4, "A C -> D")                     # every (A, C) pair appears once
assert len({(r[0], r[2]) for r in T4}) == 4
# the new row keeps A → B and breaks AC → D (with row 1)
assert w.instance_holds(COLS, ROWS, "A -> B") and not w.instance_holds(COLS, ROWS, "A C -> D")
assert w.violating_pair(COLS, ROWS, "A C -> D") == (0, 4)

# trivial vs not (no data needed): Y ⊆ X
assert w.has("BCD", "BD") and not w.has("B", "BE")
assert w.implies([], ("BCD", "BD")) and not w.implies([], ("B", "BE"))

# ---------------------------------------------------------------- exam-style question (original)
XC = ["A", "B", "C"]
XR = [[1, "x", 5], [2, "y", 5], [3, "x", 5], [4, "z", 8]]
assert w.instance_holds(XC, XR, "B -> C")                         # holds: only "maybe in F"
assert not w.instance_holds(XC, XR, "C -> B") and w.violating_pair(XC, XR, "C -> B") == (0, 1)
assert w.instance_holds(XC, XR, "A -> C")                         # A is unique: nothing can violate it
assert w.instance_holds(XC, XR, "A -> B C")
XOPTS = [("a", "המופע מקיים את $B \\to C$, ולכן $B \\to C$ בוודאות נמצאת ב-$F$."),
         ("b", "המופע מפר את $C \\to B$, ולכן $C \\to B$ בוודאות אינה נמצאת ב-$F$."),
         ("c", "המופע מפר את $A \\to C$."),
         ("d", "$A$ הוא בוודאות מפתח של $R$.")]
TRUTH = {"a": False, "b": True, "c": False, "d": False}
assert [k for k, v in TRUTH.items() if v] == ["b"]
assert w.crosscheck() > 0

INST = w.inst_table("t", COLS, ROWS, hidden_rows=(4,))
XINST = w.inst_table("e", XC, XR, cls="nf-sm")

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד מה זו תלות פונקציונלית, הבסיס של כל פרק הנרמול."),
    P("נראה מתי תלות היא טריוויאלית, ואיך קוראים מופע של טבלה: מה הוא מוכיח, ומה לא."),
    P("ובסוף נפתור שאלה בסגנון מבחן.", hold=0.4),
], stage='<div class="kicker">N01 · תלויות ונרמול</div><h1>תלות פונקציונלית</h1>'
         '<p>להבין מה אומרת X → Y, לזהות תלות טריוויאלית ולקרוא מופע של טבלה: מה הוא מוכיח ומה לא.</p>',
   layout="title")

idea = Scene("idea", "מה זו תלות", [
    P("תלות פונקציונלית נכתבת $X \\to Y$, וקוראים אותה: $X$ קובע את $Y$.", do=show("i-1"),
      say="תלות פונקציונלית נכתבת אֶקְס, חץ, וַואי, וקוראים אותה: אֶקְס קובע את וַואי."),
    P("המשמעות: לכל ערך של $X$ מתאים ערך **אחד בלבד** של $Y$.", do=show("i-c1")),
    P("ובמילים של טבלה: שתי שורות שמסכימות על $X$, חייבות להסכים גם על $Y$.", do=show("i-c2")),
    P("$X$ ו-$Y$ הן קבוצות של תכונות. למשל $AB \\to C$: הצירוף של $A$ ו-$B$ יחד קובע את $C$.", do=show("i-2")),
    P("דוגמה מהחיים: תעודת זהות קובעת שם. שתי שורות עם אותה תעודת זהות, הן אותו אדם, עם אותו שם.",
      do=show("i-c3")),
    P("ואוסף התלויות שהיחס חייב לקיים **תמיד**, בכל מצב עתידי של הטבלה, נקרא $F$.", do=show("i-c4"), hold=0.4),
], stage=w.stack(w.big("i-1", r"X \to Y"), w.big("i-2", r"AB \to C", cls="sm"), gap=60),
   panel=st.card("i-c1", "rule", "🔑 ערך אחד של $X$ ← ערך אחד של $Y$")
         + st.card("i-c2", "ex", "מסכימות על $X$ ← מסכימות על $Y$")
         + st.card("i-c3", "ex", "ת״ז $\\to$ שם")
         + st.card("i-c4", "plain", "$F$ = התלויות שחייבות להתקיים <b>בכל</b> מופע חוקי"))

triv = Scene("triv", "תלות טריוויאלית", [
    P("יש תלויות שנכונות תמיד, בלי לדעת שום דבר על הנתונים.", do=show("v-1")),
    P("קחו את $BCD \\to BD$. שתי שורות שמסכימות על $B$, $C$ ו-$D$, מסכימות כמובן על $B$ ועל $D$."),
    P("תלות שבה הצד הימני **מוכל** בצד השמאלי נקראת **טריוויאלית**. היא מתקיימת בכל טבלה.", do=show("v-c1")),
    P("לעומת זאת $B \\to BE$ אינה טריוויאלית: יש בה את $E$, שלא מופיעה משמאל.", do=show("v-2")),
    P("והיא אומרת משהו אמיתי על העולם: ש-$B$ קובע את $E$.", do=show("v-c2"), hold=0.4),
], stage=w.stack(w.row("v-1", f'${"BCD \\to BD"}$ &nbsp; <span class="nf-ok">טריוויאלית</span>'),
                 w.row("v-2", f'${"B \\to BE"}$ &nbsp; <span class="nf-no">לא טריוויאלית</span>'), gap=60),
   panel=st.card("v-c1", "rule", "🔑 טריוויאלית: $Y \\subseteq X$")
         + st.card("v-c2", "ex", "$E$ לא משמאל ← יש כאן מידע"))

read = Scene("read", "לקרוא מופע", [
    P("עכשיו מופע: טבלה עם ארבע שורות. איך בודקים אם הוא מקיים תלות?", do=show("t")),
    P("מחפשים **זוג שורות** שמסכימות בצד שמאל, וחולקות בצד ימין.", do=show("r-c1")),
    P("נבדוק את $A \\to B$. השורה הראשונה והשלישית מסכימות על $A$: בשתיהן אחת.",
      do=show("t-h0", "t-h2", "t-c0-0", "t-c2-0")),
    P("ובשתיהן $B$ הוא $x$. אין עוד זוג עם אותו $A$, ולכן המופע **מקיים** את $A \\to B$.",
      do=show("t-c0-1", "t-c2-1", "r-1")),
    P("עכשיו $A \\to C$. אותו זוג: $A$ שווה, אבל $C$ הוא חמש בראשונה ושבע בשלישית.",
      do=hide("t-c0-1", "t-c2-1") + show("t-c0-2", "t-c2-2")),
    P("זוג אחד כזה מספיק: המופע **מפר** את $A \\to C$.", do=show("r-2")),
    P("ו-$B \\to A$? השורה השנייה והרביעית: בשתיהן $B$ הוא $y$, אבל $A$ שתיים מול שלוש.",
      do=hide("t-h0", "t-h2", "t-c0-0", "t-c2-0", "t-c0-2", "t-c2-2") + show("t-h1", "t-h3", "t-c1-1", "t-c3-1",
                                                                              "t-c1-0", "t-c3-0")),
    P("גם היא מופרת. שימו לב: $A \\to B$ מתקיימת, ו-$B \\to A$ לא. תלות היא בכיוון אחד.", do=show("r-3"),
      hold=0.4),
], stage=w.stack(INST),
   panel=st.card("r-c1", "rule", "🔑 מפרה = זוג שמסכים בשמאל וחולק בימין")
         + w.row("r-1", '$A \\to B$ &nbsp; <span class="nf-ok">מתקיימת</span>')
         + w.row("r-2", '$A \\to C$ &nbsp; <span class="nf-no">מופרת</span>')
         + w.row("r-3", '$B \\to A$ &nbsp; <span class="nf-no">מופרת</span>'))

proves = Scene("proves", "מה מופע מוכיח", [
    P("ועכשיו השאלה החשובה: מה אפשר להסיק מזה על $F$?", do=show("p-r1")),
    P("$F$ חייבת להתקיים בכל מופע חוקי. אז מופע חוקי שמפר את $A \\to C$ מוכיח ש-$A \\to C$ **לא** נמצאת ב-$F$.",
      do=show("p-c1")),
    P("ומה עם תלות שהמופע מקיים? למשל $AC \\to D$: כל צירוף של $A$ ו-$C$ מופיע כאן רק פעם אחת.",
      do=show("p-r2")),
    P("אין שתי שורות שמסכימות בצד שמאל, ולכן אין מי שיפר. המופע מקיים אותה."),
    P("אבל מחר נכנסת שורה חדשה: אחת, $x$, חמש, $q$.", do=show("u-row4", "u-h4")),
    P("היא מסכימה עם השורה הראשונה על $A$ ועל $C$, וחולקת על $D$. עכשיו $AC \\to D$ מופרת.",
      do=show("u-h0", "u-c0-0", "u-c0-2", "u-c4-0", "u-c4-2", "u-c0-3", "u-c4-3")),
    P("כלומר מהמופע הקודם אפשר היה לומר רק ש**ייתכן** ש-$AC \\to D$ ב-$F$. לא בוודאות.", do=show("p-c2"),
      hold=0.4),
    P("ומושג אחרון: קבוצת תכונות שקובעת את **כל** התכונות של היחס, נקראת **מפתח-על**.", do=show("p-c3")),
], stage=w.stack(w.inst_table("u", COLS, ROWS, hidden_rows=(4,))),
   panel=w.row("p-r1", '$A \\to C$ &nbsp; <span class="nf-no">מופרת</span>')
         + st.card("p-c1", "rule", "🔑 מופר במופע חוקי ← בוודאות <b>לא</b> ב-$F$")
         + w.row("p-r2", '$AC \\to D$ &nbsp; <span class="nf-ok">מתקיימת</span>')
         + st.card("p-c2", "trap", "⚠️ מתקיים ← רק <b>ייתכן</b> שב-$F$")
         + st.card("p-c3", "ex", "מפתח-על: $X$ שקובע את כל $R$"))

exam = Scene("exam", "שאלה בסגנון מבחן", [
    P("שאלה בסגנון מבחן. נתון מופע **חוקי** של $R$, ו-$F$ קבוצת התלויות. איזו טענה נכונה?", do=show("e")),
    P("נתחיל ב-$B \\to C$. ערכי $B$: $x$ פעמיים, ובשתיהן חמש. $y$ ו-$z$ מופיעים פעם אחת.",
      do=show("e-c0-1", "e-c2-1", "e-c0-2", "e-c2-2")),
    P("המופע מקיים את $B \\to C$, אבל זה לא מוכיח שהיא ב-$F$. ולכן הטענה שהיא ב-$F$ ״בוודאות״ שגויה.",
      do=show("q-x-a", "q-n-a")),
    P("עכשיו $C \\to B$. השורה הראשונה והשנייה: בשתיהן $C$ חמש, אבל $B$ הוא $x$ מול $y$.",
      do=hide("e-c0-1", "e-c2-1", "e-c0-2", "e-c2-2") + show("e-h0", "e-h1", "e-c0-2", "e-c1-2", "e-c0-1",
                                                               "e-c1-1")),
    P("הפרה במופע חוקי היא הוכחה: $C \\to B$ בוודאות אינה ב-$F$. זו התשובה.", do=show("q-ok-b")),
    P("ו-$A \\to C$? כל ערכי $A$ שונים, ולכן אין זוג שמסכים בשמאל. המופע מקיים אותה, ולא מפר.",
      do=hide("e-h0", "e-h1", "e-c0-2", "e-c1-2", "e-c0-1", "e-c1-1") + show("q-x-c", "q-n-c")),
    P("ואותה סיבה בדיוק לא מוכיחה ש-$A$ מפתח: זה מופע אחד, ושורה עתידית יכולה לחזור על ערך של $A$.",
      do=show("q-x-d", "q-n-d"), hold=0.5),
], stage=w.stack(XINST),
   panel='<div class="qstem nf-qsm"><span class="qid">בסגנון מבחן</span>נתון מופע חוקי של $R$, ותהי $F$ קבוצת '
         'התלויות מעל $R$. איזו טענה נכונה?</div>'
         + '<div class="nf-osm">' + st.options("q", XOPTS, notes={"a": "רק ייתכן", "c": "אין זוג", "d": "מופע אחד"})
         + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: $X \\to Y$ אומרת ששתי שורות שמסכימות על $X$, מסכימות גם על $Y$.", do=show("s-1")),
    P("תלות שבה הצד הימני מוכל בשמאלי היא טריוויאלית, ומתקיימת תמיד.", do=show("s-2")),
    P("בודקים מופע עם זוג שורות: מסכימות בשמאל, וחולקות בימין? הפרה.", do=show("s-3")),
    P("והפרה מוכיחה שהתלות לא ב-$F$, ואילו קיום אומר רק ״ייתכן״. נתראה ברמה הבאה.", do=show("s-4"), hold=0.6),
], stage=w.stack(w.big("s-f", r"X \to Y", hidden=False)),
   panel=st.card("s-1", "rule", "🔑 מסכימות על $X$ ← מסכימות על $Y$")
         + st.card("s-2", "rule", "🔑 טריוויאלית: $Y \\subseteq X$")
         + st.card("s-3", "ex", "בדיקה: זוג שורות מפר")
         + st.card("s-4", "trap", "⚠️ מופר ← לא ב-$F$ · מתקיים ← רק ייתכן"))

VIDEO = Video("N01", "norm", "תלות פונקציונלית", [title, idea, triv, read, proves, exam, recap], bank={})
