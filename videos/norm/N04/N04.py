# -*- coding: utf-8 -*-
"""N04 · מפתחות: מפתח-על ומפתח קביל — video script (build: tools/video/vid.py N04).

Source: norm/levels/N04.js (lesson + goal: superkey = X⁺ is all of R; candidate key = a minimal superkey; the golden
rules: an attribute on no right side is in every key, an attribute only on right sides is in no key; "קביל" vs "על").
Exam anchor: 21B-C-Q20 (which is a superkey? key b = {B, F, E}).
Avoided on purpose: the N04 quiz schemas (incl. 22B-A F1 = N04-Q7, and 22B-A-Q18), 23B-A-Q18 / 23B-A2-Q18 / 24B-A-Q20 /
25B-A-Q18 (quiz ids or the N03 quiz schema), the lesson example (A → B, B → C, C → D), 25S-B-Q19 (same shape as
N04-Q1). 26Z-CL-Q17 (all keys) is solved in N06. The worked schema below is new; closures, keys and primes come from
w_norm and are cross-checked with tools/fdlib.js.
"""
from vid import Scene, Video, BANK
import stage as st
import w_norm as w
from w_norm import P, show, hide

# ---------------------------------------------------------------- worked example (verified)
R = "ABCDEG"
F = w.parse_f("A -> B, BC -> D, D -> CE")
LEFT = w.norm("".join(l for l, _ in F))
RIGHT = w.norm("".join(r for _, r in F))
assert w.minus(R, RIGHT) == "AG"                 # never on a right side: in every key (G appears nowhere)
assert w.minus(RIGHT, LEFT) == "E"               # only on right sides: in no key
assert w.inter(LEFT, RIGHT) == "BCD"             # both sides: maybe
KEYS = w.candidate_keys(R, F)
assert KEYS == ["ACG", "ADG"]
assert w.primes(R, F) == "ACDG"
assert w.closure("AG", F) == "ABG"
assert w.closure("ABG", F) == "ABG" and w.closure("AEG", F) == "ABEG"
CANDS = ["AG", "ABG", "ACG", "ADG", "ACDG"]
KT, KF = w.key_table("k", R, F, CANDS)
assert [(sk, ck) for _, sk, ck in KF] == [(False, False), (False, False), (True, True), (True, True), (True, False)]
assert w.closure("CG", F) == "CG" and w.closure("AC", F) == "ABCDE"   # ACG minus one attribute: never all of R

# ---------------------------------------------------------------- exam 21B-C-Q20
Q = BANK["21B-C-Q20"]
assert Q["correctId"] == "b" and Q["contextId"] == "21B-C-fd"
RX = "ABCDEF"
FX = w.parse_f("F -> AE, BE -> C, C -> AD")
assert w.minus(RX, w.norm("".join(r for _, r in FX))) == "BF"        # B and F are on no right side
VAL = {o["id"]: o["value"] for o in Q["options"]}
SETS = {k: w.norm(v) for k, v in VAL.items() if k != "e"}
assert SETS == {"a": "AB", "b": "BEF", "c": "CF", "d": "CDF"}
XT, XF = w.key_table("xk", RX, FX, ["BEF", "BF"], cls="sm")
assert [(sk, ck) for _, sk, ck in XF] == [(True, False), (True, True)]
assert [k for k in "abcd" if w.is_superkey(SETS[k], RX, FX)] == ["b"]
assert not w.is_candidate("BEF", RX, FX) and w.candidate_keys(RX, FX) == ["BF"]
assert all(not w.has(SETS[k], "BF") for k in "acd")                  # each of the others misses B or F
OPTS = [(o["id"], w.fd_opt(o["value"]) if o["id"] != "e" else o["value"]) for o in Q["options"]]
assert w.crosscheck() > 0

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד לזהות מפתחות: מפתח-על ומפתח קביל."),
    P("נבדוק מפתחות בעזרת סגור, ונכיר שני כללים שחוסכים חצי מהעבודה."),
    P("ובסוף נפתור שאלה ממבחן.", hold=0.4),
], stage='<div class="kicker">N04 · תלויות ונרמול</div><h1>מפתחות: מפתח-על ומפתח קביל</h1>'
         '<p>לזהות מפתח-על ומפתח קביל בעזרת סגור, ולזהות מהר אילו תכונות חייבות להיות בכל מפתח.</p>', layout="title")

idea = Scene("idea", "שתי הגדרות", [
    P("**מפתח-על** הוא קבוצת תכונות $X$ שהסגור שלה הוא כל היחס.", do=show("i-1"),
      say="מפתח-על הוא קבוצת תכונות אֶקְס, שהסגור שלה הוא כל היחס."),
    P("כלומר $X$ קובע את כל התכונות, ושתי שורות שמסכימות על $X$ הן אותה שורה.", do=show("i-c1")),
    P("**מפתח קביל** הוא מפתח-על **מינימלי**: אם זורקים ממנו תכונה כלשהי, הוא כבר לא מפתח-על.",
      do=show("i-2")),
    P("אז הבדיקה היא בשני שלבים. קודם מחשבים את $X^+$, ובודקים שיצא כל $R$.", do=show("i-c2"),
      say="אז הבדיקה היא בשני שלבים. קודם מחשבים את הסגור של אֶקְס, ובודקים שיצא כל אָר."),
    P("ואז זורקים כל תכונה בנפרד, ומוודאים שאף תת-קבוצה כבר לא מגיעה ל-$R$.", do=show("i-c3"), hold=0.4),
], stage=w.stack(w.big("i-1", r"X^+ = R"), w.row("i-2", "קביל = מפתח-על <b>מינימלי</b>"), gap=60),
   panel=st.card("i-c1", "ex", "$X$ קובע את כל התכונות")
         + st.card("i-c2", "rule", "1. $X^+ = R$? אז מפתח-על")
         + st.card("i-c3", "rule", "2. בלי אף תכונה: כבר לא? אז קביל"))

gold = Scene("gold", "הכללים לפני החישוב", [
    P("לפני שמחשבים, סורקים את $F$. נתון יחס עם שש תכונות ושלוש תלויות.", do=show("g-f")),
    P("$A$ לא מופיעה באף צד ימני. אף תלות לא מייצרת אותה, ולכן היא חייבת להיות **בכל** מפתח.", do=show("g-1")),
    P("ו-$G$ לא מופיעה בכלל באף תלות. אותו דבר: אין דרך לקבל אותה, אז גם היא בכל מפתח.", do=show("g-2")),
    P("$E$ מופיעה **רק** בצד ימין. תמיד אפשר לקבל אותה מתכונות אחרות, ולכן היא לא נמצאת באף מפתח קביל.",
      do=show("g-3")),
    P("ו-$B$, $C$ ו-$D$ מופיעים משני הצדדים. עליהם צריך לחשוב.", do=show("g-4"), hold=0.4),
], stage=w.stack(w.fd_set("g-f", R, F, hidden=True),
                 w.table("g-t", ["תכונות", "איפה ב-$F$", "במפתח?"], [
                     ["$A$", "רק בשמאל", '<span class="nf-ok">בכל מפתח</span>'],
                     ["$G$", "בשום מקום", '<span class="nf-ok">בכל מפתח</span>'],
                     ["$E$", "רק בימין", '<span class="nf-no">באף מפתח</span>'],
                     ["$B, C, D$", "בשני הצדדים", '<span class="nf-warn">אולי</span>']],
                     hidden=False, ids=["g-1", "g-2", "g-3", "g-4"]), gap=36))

search = Scene("search", "מחפשים מפתחות", [
    P("נתחיל מ-$AG$, החובה. הסגור: $A \\to B$ מוסיפה את $B$, וזהו. $C$, $D$ ו-$E$ חסרים.",
      do=show("k", "k-r0", "k-s0", "k-m0")),
    P("להוסיף את $B$ לא יעזור: $B$ ממילא כבר בפנים, כי $A$ נותנת אותה.", do=show("k-r1", "k-s1", "k-m1")),
    P("נוסיף את $C$. עכשיו יש $B$ ו-$C$, אז $BC \\to D$ מוסיפה את $D$, ו-$D \\to CE$ מוסיפה את $E$. קיבלנו הכול.",
      do=show("k-r2", "k-s2")),
    P("ומינימלי? בלי $A$ נקבל רק $C$ ו-$G$. ובלי $C$ או בלי $G$ חסרות תכונות. לכן $ACG$ הוא מפתח קביל.",
      do=show("k-m2")),
    P("ומה עם $D$ במקום $C$? $D \\to CE$ נותנת את $C$ ואת $E$, ו-$A$ נותנת את $B$. גם $ADG$ מפתח קביל.",
      do=show("k-r3", "k-s3", "k-m3")),
    P("ובלי אף אחת מהשלוש כבר לא מגיעים לכל היחס."),
    P("התכונות שמופיעות במפתח קביל כלשהו נקראות **ראשוניות**: כאן $A$, $C$, $D$ ו-$G$. נצטרך אותן בהמשך.",
      do=show("s-c1"), hold=0.4),
], stage=w.stack(w.fd_set("s-f", R, F, cls="xs"), KT, gap=26),
   panel=st.card("s-c1", "ex", "ראשוניות: $A, C, D, G$"))

trap = Scene("trap", "על מול קביל", [
    P("ועכשיו המלכודת. האם $ACDG$ הוא מפתח?",
      do=show(*[f"k2-{c}{i}" for i in range(4) for c in "rsm"], "k2-r4")),
    P("הסגור שלו הוא כל היחס, ולכן הוא **מפתח-על**.", do=show("k2-s4")),
    P("אבל הוא לא **קביל**: אפשר לזרוק ממנו את $D$, ו-$ACG$ שנשאר עדיין מפתח.", do=show("k2-m4")),
    P("כל קבוצה שמכילה מפתח היא מפתח-על. קביל זו רק הקבוצה הרזה, שאין בה שום דבר מיותר.", do=show("t-c1")),
    P("במבחן השאלה ״מי מפתח קביל?״ והשאלה ״מי מפתח-על?״ יכולות להופיע על אותם נתונים בדיוק. קראו את המילה פעמיים.",
      do=show("t-c2"), hold=0.4),
], stage=w.stack(w.key_table("k2", R, F, CANDS, hidden=False)[0], gap=26),
   panel=st.card("t-c1", "rule", "🔑 מכיל מפתח ← מפתח-על")
         + st.card("t-c2", "trap", "⚠️ ״קביל״ או ״על״? קראו פעמיים"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: שש תכונות ושלוש תלויות. מי מהקבוצות היא **מפתח-על**?", do=show("x-f")),
    P("שימו לב: אחת התכונות כאן נקראת $F$, כמו קבוצת התלויות."),
    P("נסרוק את התלויות: $B$ ו-$F$ לא מופיעות באף צד ימין. לכן כל מפתח-על חייב להכיל את שתיהן.",
      do=show("x-c1")),
    P("$AB$ בלי $F$, ו-$CF$ ו-$CDF$ בלי $B$. שלושתן נופלות עוד לפני שמחשבים.",
      do=show("q-x-a", "q-n-a", "q-x-c", "q-n-c", "q-x-d", "q-n-d")),
    P("ונוודא את $BEF$: $F \\to AE$ נותנת $A$, $BE \\to C$ נותנת $C$, ו-$C \\to AD$ נותנת $D$. כל היחס.",
      do=show("xk", "xk-r0", "xk-s0", "q-ok-b")),
    P("לכן התשובה היא $BEF$, ו״אף אחת״ נופלת.", do=show("q-x-e", "q-n-e")),
    P("ושימו לב: $BEF$ הוא מפתח-על, אבל לא קביל. $BF$ לבד כבר מגיע לכל היחס. אבל כאן שאלו על מפתח-**על**.",
      do=show("xk-m0", "xk-r1", "xk-s1", "xk-m1"), hold=0.5),
], stage=w.stack(w.fd_set("x-f", RX, FX, hidden=True, cls="sm"), XT, gap=26),
   panel=f'<div class="qstem nf-qsm"><span class="qid">{Q["id"]}</span>מי מהבאים הוא מפתח-על ביחס $R$ בהינתן '
         '$F$ הנתונה?</div>' + st.card("x-c1", "rule", "🔑 $B$ ו-$F$ לא בימין ← בכל מפתח")
         + '<div class="nf-osm">' + st.options("q", OPTS, notes={"a": "חסר $F$", "c": "חסר $B$", "d": "חסר $B$",
                                                                "e": "יש"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: מפתח-על הוא קבוצה שהסגור שלה הוא כל היחס.", do=show("r-1")),
    P("ומפתח קביל הוא מפתח-על מינימלי: כל תכונה בו נחוצה.", do=show("r-2")),
    P("תכונה שאינה באף צד ימין נמצאת בכל מפתח, ותכונה שרק בצד ימין לא נמצאת באף מפתח.", do=show("r-3")),
    P("וקראו את המילה פעמיים: קביל, או על. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.stack(w.big("r-f", r"X^+ = R", hidden=False)),
   panel=st.card("r-1", "rule", "🔑 מפתח-על: $X^+ = R$")
         + st.card("r-2", "rule", "🔑 קביל: מפתח-על מינימלי")
         + st.card("r-3", "ex", "לא בימין ← בכל מפתח · רק בימין ← באף מפתח")
         + st.card("r-4", "trap", "⚠️ קביל או על?"))

VIDEO = Video("N04", "norm", "מפתחות: מפתח-על ומפתח קביל", [title, idea, gold, search, trap, exam, recap],
              bank={"21B-C-Q20": "b"})
