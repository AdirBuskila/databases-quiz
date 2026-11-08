# -*- coding: utf-8 -*-
"""N03 · סגור X⁺ — video script (build: tools/video/vid.py N03).

Source: norm/levels/N03.js (lesson + goal: the closure algorithm step by step, X ⊆ X⁺, and X → Y ∈ F⁺ iff Y ⊆ X⁺;
an attribute that is never on a left side determines only itself).
Exam anchor: 26B-A-Q18 (B⁺ under F = {A → B, B → C, A → D, AC → E}; key a = {B, C}).
Avoided on purpose: the N03 quiz FDs and the 25B-A/25C-A schema (25B-A-Q17, 25C-A-Q17 are quiz ids), the lesson
example (B → C, C → D, AD → E), 22B-A-Q15 and 23B-A2-Q17 (quiz ids). 26B-A-Q17 on the same schema is solved in the N09
boss video, 26B-A-Q20 in N05. The worked schema below is new; every closure comes from w_norm.closure_steps and is
cross-checked with tools/fdlib.js.
"""
from vid import Scene, Video, BANK
import stage as st
import w_norm as w
from w_norm import P, show, hide

# ---------------------------------------------------------------- worked example (verified)
R = "ABCDEG"
F = w.parse_f("A -> C, BC -> E, E -> G, D -> B")
CL_AD, ST_AD = w.closure_table("ad", "AD", F)
assert [(i, a) for i, a, _ in ST_AD] == [(0, "C"), (3, "B"), (1, "E"), (2, "G")]   # two passes over F
assert w.closure("AD", F) == R
assert w.closure("D", F) == "BD"                                   # BC → E needs C: stops
assert w.closure("G", F) == "G" and not any("G" in l for l, _ in F)  # G is never on a left side
assert w.implies(F, ("AD", "G")) and not w.implies(F, ("D", "E")) and not w.implies(F, ("G", "A"))
CL_D, ST_D = w.closure_table("dd", "D", F, cls="sm")

# ---------------------------------------------------------------- exam 26B-A-Q18
Q = BANK["26B-A-Q18"]
assert Q["correctId"] == "a"
FX = w.parse_f("A -> B, B -> C, A -> D, AC -> E")
assert Q["contextId"] == "26B-A-fd"
CL_X, ST_X = w.closure_table("xb", "B", FX, cls="sm")
assert w.closure("B", FX) == "BC" and [(i, a) for i, a, _ in ST_X] == [(1, "C")]
VAL = {o["id"]: w.norm(o["value"]) for o in Q["options"]}
assert VAL == {"a": "BC", "b": "B", "c": "BCD", "d": "ABC", "e": "ABCDE"}
assert [k for k, v in VAL.items() if v == w.closure("B", FX)] == ["a"]
OPTS = [(o["id"], w.fd_opt(o["value"])) for o in Q["options"]]
assert w.crosscheck() > 0

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד את הכלי הכי חשוב בפרק: הסגור של קבוצת תכונות."),
    P("נריץ את האלגוריתם צעד אחרי צעד, ונשתמש בו כדי להכריע אם תלות נובעת מ-$F$, בלי לכתוב הוכחה."),
    P("ובסוף נפתור שאלה ממבחן.", hold=0.4),
], stage='<div class="kicker">N03 · תלויות ונרמול</div><h1>סגור X⁺‎</h1>'
         '<p>לחשב סגור של קבוצת תכונות צעד-אחר-צעד, ולהשתמש בו כדי להכריע אם תלות נובעת מ-F.</p>', layout="title")

idea = Scene("idea", "האלגוריתם", [
    P("הסגור של $X$, שכותבים $X^+$, הוא כל התכונות ש-$X$ קובע לפי $F$.", do=show("i-1"),
      say="הסגור של אֶקְס, שכותבים אֶקְס פלוס, הוא כל התכונות שאֶקְס קובע לפי אֶף."),
    P("מתחילים מ-$X$ עצמו. $X$ תמיד בתוך הסגור של עצמו.", do=show("i-c1")),
    P("עוברים על התלויות. כשכל הצד השמאלי של תלות כבר בפנים, מוסיפים את הצד הימני שלה.", do=show("i-c2")),
    P("וחוזרים על המעבר, עד שסבב שלם לא מוסיף כלום.", do=show("i-c3"), hold=0.4),
], stage=w.stack(w.big("i-1", r"X^+")),
   panel=st.card("i-c1", "rule", "1. מתחילים: $X^+ := X$")
         + st.card("i-c2", "rule", "2. $Y \\to Z$ עם $Y \\subseteq X^+$: מוסיפים את $Z$")
         + st.card("i-c3", "rule", "3. חוזרים עד שאין שינוי"))

run = Scene("run", "מריצים", [
    P("נריץ. ביחס יש שש תכונות וארבע תלויות, ונחשב את הסגור של $AD$.", do=show("f", "ad", "ad-r0")),
    P("מתחילים מ-$A$ ו-$D$ עצמם."),
    *w.closure_phrases("ad", "AD", F, ST_AD[:1], fd_pfx="f")[0],
    P("$BC \\to E$: צריך גם $B$ וגם $C$. $B$ עוד לא בפנים, אז בינתיים מדלגים.",
      do=hide("f-fh0") + show("f-fh1")),
    P("$E \\to G$: גם $E$ עוד לא בפנים. מדלגים.", do=hide("f-fh1") + show("f-fh2")),
    P("$D \\to B$: $D$ בפנים, ולכן מוסיפים את $B$.", do=hide("f-fh2") + show("f-fh3", "ad-r2")),
    P("הסבב הראשון נגמר, אבל הוא הוסיף תכונות. אז עוברים שוב, מההתחלה.", do=hide("f-fh3")),
    P("עכשיו $BC \\to E$ כן עובדת: $B$ ו-$C$ שניהם בפנים. מוסיפים את $E$.", do=show("f-fh1", "ad-r3")),
    P("ואחריה $E \\to G$: מוסיפים את $G$.", do=hide("f-fh1") + show("f-fh2", "ad-r4")),
    P("סבב שלישי לא מוסיף כלום. הסגור של $AD$ הוא כל היחס.", do=hide("f-fh2") + show("ad-rend")),
    P("שימו לב: $BC \\to E$ דילגה בסבב הראשון ועבדה בשני. בגלל זה חוזרים על המעבר.", do=show("u-c1"),
      hold=0.4),
], stage=w.stack(w.fd_set("f", R, F, hidden=True, cls="sm"), CL_AD, gap=28),
   panel=st.card("u-c1", "trap", "⚠️ תלות שדילגה בסבב אחד יכולה לעבוד בסבב הבא"))
assert run.phrases[2].sub.startswith("$A \\to C$")

decide = Scene("decide", "האם תלות נובעת", [
    P("ולמה זה כל כך שימושי? כי $X \\to Y$ נובעת מ-$F$ אם ורק אם $Y$ מוכל ב-$X^+$.", do=show("d-1"),
      say="כי התלות מאֶקְס לוַואי נובעת מאֶף, אם ורק אם וַואי מוכלת בסגור של אֶקְס."),
    P("לא צריך לבנות הוכחה עם כללי ארמסטרונג. מחשבים סגור לצד שמאל, ובודקים."),
    P("למשל $AD \\to G$: הסגור של $AD$ הוא הכול, ולכן היא נובעת.", do=show("d-2")),
    P("ו-$D \\to E$? נחשב את הסגור של $D$.", do=show("dd", "dd-r0")),
    P("$D \\to B$ מוסיפה את $B$. ו-$BC \\to E$ צריכה גם $C$, שאף פעם לא נכנס.", do=show("dd-r1")),
    P("אז הסגור של $D$ הוא $B$ ו-$D$ בלבד. $E$ לא שם, ולכן $D \\to E$ **לא** נובעת.",
      do=show("dd-rend", "d-3")),
    P("ועוד קיצור: $G$ לא מופיעה באף צד שמאל. לכן היא קובעת רק את עצמה, ולא נובעת שום תלות ממנה לתכונה אחרת.",
      do=show("d-c1"), hold=0.4),
], stage=w.stack(w.fd_set("f2", R, F, cls="xs", show_r=False), CL_D, gap=26),
   panel=st.card("d-1", "rule", "🔑 $X \\to Y \\in F^+$ אם ורק אם $Y \\subseteq X^+$")
         + w.row("d-2", '$AD \\to G$ &nbsp; <span class="nf-ok">נובעת</span>')
         + w.row("d-3", '$D \\to E$ &nbsp; <span class="nf-no">לא נובעת</span>')
         + st.card("d-c1", "ex", "$G$ אף פעם לא בשמאל: $G^+ = \\{G\\}$"))

trap = Scene("trap", "הטעות מספר אחת", [
    P("והטעות הכי נפוצה בשאלות סגור: לשכוח את $X$ עצמו.", do=show("t-1")),
    P("הסגור של $D$ הוא לא $B$ לבד. $D$ שייכת לסגור של עצמה, כבר מהצעד הראשון.", do=show("t-2")),
    P("במבחנים כמעט תמיד יש מסיח שמשמיט את $X$, ולפעמים התשובה הנכונה היא ״אף אחת מהתשובות״.", do=show("t-c1"),
      hold=0.4),
], stage=w.stack(w.row("t-1", '<span class="nf-no">$D^+ = \\{B\\}$ ✗</span>'),
                 w.row("t-2", '<span class="nf-ok">$D^+ = \\{B, D\\}$ ✓</span>'), gap=50),
   panel=st.card("t-c1", "trap", "⚠️ תמיד $X \\subseteq X^+$"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: ארבע תלויות. מהו הסגור של $B$?", do=show("x-f")),
    P("מתחילים מ-$B$.", do=show("xb", "xb-r0")),
    P("$A \\to B$: הצד השמאלי הוא $A$, והיא לא בפנים. שימו לב, $B$ בצד **ימין** לא עוזר.", do=show("x-f-fh0")),
    P("$B \\to C$: $B$ בפנים, ולכן מוסיפים את $C$.", do=hide("x-f-fh0") + show("x-f-fh1", "xb-r1")),
    P("$A \\to D$ ו-$AC \\to E$ צריכות את $A$, ו-$A$ לא בפנים. סבב נוסף לא משנה כלום.",
      do=hide("x-f-fh1") + show("x-f-fh2", "x-f-fh3")),
    P("הסגור של $B$ הוא $B$ ו-$C$.", do=hide("x-f-fh2", "x-f-fh3") + show("xb-rend", "q-ok-a")),
    P("האפשרות $B$ לבד שוכחת את $C$, ומי שמוסיף את $D$ השתמש ב-$A \\to D$ בלי שיש לו $A$.",
      do=show("q-x-b", "q-n-b", "q-x-c", "q-n-c")),
    P("ו-$A$ לא נכנסת בכלל: $A \\to B$ נותנת את $B$ מתוך $A$, ולא להפך. אז גם $R$ כולו נופל.",
      do=show("q-x-d", "q-n-d", "q-x-e", "q-n-e"), hold=0.5),
], stage=w.stack(w.fd_set("x-f", "ABCDE", FX, hidden=True, cls="sm"), CL_X, gap=28),
   panel=f'<div class="qstem nf-qsm"><span class="qid">{Q["id"]}</span>מהו הסגור של קבוצת התכונות $\\{{B\\}}$, '
         'כלומר $B^+$, ביחס ל-$F$?</div>'
         + '<div class="nf-osm">' + st.options("q", OPTS, notes={"b": "חסר $C$", "c": "בלי $A$", "d": "הפוך",
                                                                "e": "הפוך"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: הסגור מתחיל מ-$X$ עצמו.", do=show("r-1")),
    P("מוסיפים צד ימין של כל תלות שהצד השמאלי שלה כבר בפנים, וחוזרים עד שאין שינוי.", do=show("r-2")),
    P("ותלות נובעת מ-$F$ בדיוק כשהצד הימני שלה מוכל בסגור של הצד השמאלי.", do=show("r-3")),
    P("ברמה הבאה נשתמש בסגור כדי למצוא מפתחות. נתראה שם.", do=show("r-4"), hold=0.6),
], stage=w.stack(w.big("r-f", r"X^+", hidden=False)),
   panel=st.card("r-1", "rule", "🔑 $X \\subseteq X^+$")
         + st.card("r-2", "rule", "🔑 מוסיפים, וחוזרים עד שאין שינוי")
         + st.card("r-3", "rule", "🔑 $X \\to Y \\in F^+ \\iff Y \\subseteq X^+$")
         + st.card("r-4", "ex", "הבא בתור: מפתחות"))

VIDEO = Video("N03", "norm", "סגור X⁺‎", [title, idea, run, decide, trap, exam, recap], bank={"26B-A-Q18": "a"})
