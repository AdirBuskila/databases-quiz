# -*- coding: utf-8 -*-
"""N05 · תכונות עודפות וכיסוי מינימלי — video script (build: tools/video/vid.py N05).

Source: norm/levels/N05.js (lesson + goal: an extraneous attribute on the left (X⁺ without it still contains the right
side) and on the right (the FD still follows after deleting it); equivalence of FD sets in both directions; a minimal
cover: equivalent, no extraneous attribute, no redundant FD).
Exam anchor: 26B-A-Q20 (which attribute is extraneous? key a = C in AC → E).
Avoided on purpose: the N05 quiz FD sets (A → B, AB → C; A → BC, B → C; …; the N05-Q8 set and its near twin
26Z-CL-Q20), the quiz ids 21B-A-Q19, 21S-B-Q22, 22B-A-Q16, 24B-A-Q19, 25C-A-Q18, 25S-B-Q18, the 22B-A F1 set (N04-Q7)
with 22B-A-Q17, and 26S-A-Q20 (its schema carries the quiz item 26S-A-Q18). The worked set below is new; every
extraneous/redundant verdict comes from w_norm (cross-checked with tools/fdlib.js), and the final set is asserted to be
a minimal cover.
"""
from vid import Scene, Video, BANK
import stage as st
import w_norm as w
from w_norm import P, show, hide

# ---------------------------------------------------------------- worked example (verified)
R = "ABCDE"
F = w.parse_f("C -> AD, AD -> E, CE -> B, A -> D, C -> E")
EXT = w.all_extraneous(F)
assert EXT == [("C→AD", "R", "D"), ("AD→E", "L", "D"), ("CE→B", "L", "E"), ("C→E", "R", "E")]
assert w.redundant_fds(F) == [("C", "E")]
assert w.closure("A", F) == "ADE" and w.closure("D", F) == "D"          # D extraneous in AD → E, A is not
assert w.closure("C", F) == "ABCDE" and w.closure("E", F) == "E"         # E extraneous in CE → B, C is not
assert w.implies([("C", "A"), ("AD", "E"), ("CE", "B"), ("A", "D"), ("C", "E")], ("C", "D"))   # D on the right of C → AD
assert w.extraneous_in(("C", "AD"), F) == [("R", "D")]                   # A on the right is needed
G = [("C", "AB"), ("A", "DE")]
assert w.min_cover(F) == G and w.is_minimal_cover_of(G, F) and w.equivalent(F, G)
GS = [("C", "A"), ("A", "D"), ("A", "E"), ("C", "B")]
assert w.is_minimal_cover_of(GS, F) and w.equivalent(GS, F)
assert w.implies(GS, ("CE", "B")) and w.implies(G, ("C", "E")) and w.implies(F, ("C", "B"))
TAGS = {0: "$D$ עודפת מימין", 1: "$D$ עודפת משמאל", 2: "$E$ עודפת משמאל", 4: "מיותרת"}

# ---------------------------------------------------------------- exam 26B-A-Q20
Q = BANK["26B-A-Q20"]
assert Q["correctId"] == "a" and Q["contextId"] == "26B-A-fd"
FX = w.parse_f("A -> B, B -> C, A -> D, AC -> E")
assert w.extraneous_in(("AC", "E"), FX) == [("L", "C")]
assert w.all_extraneous(FX) == [("AC→E", "L", "C")]                     # the only one: so b, c, d, e are wrong
assert w.closure("A", FX) == "ABCDE" and w.closure("C", FX) == "C"
O = {o["id"]: o["value"] for o in Q["options"]}
assert "AC -> E" in O["a"] and O["a"].endswith("C") and O["b"].endswith("A") and "A -> D" in O["c"]
assert "B -> C" in O["d"] and O["e"].startswith("אין")
OPTS = [(k, w.opt_tex(v)) for k, v in O.items()]
XT, XS = w.closure_table("xa", "A", FX, cls="xs")
assert w.crosscheck() > 0

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד לנקות קבוצת תלויות: למצוא תכונות עודפות ותלויות מיותרות."),
    P("נבדוק את שני הצדדים של כל תלות, ונגיע לכיסוי מינימלי, הגרסה הרזה של $F$."),
    P("ובסוף נפתור שאלה ממבחן.", hold=0.4),
], stage='<div class="kicker">N05 · תלויות ונרמול</div><h1>תכונות עודפות וכיסוי מינימלי</h1>'
         '<p>למצוא תכונה עודפת בשני הצדדים של תלות, לבדוק שקילות בין קבוצות תלויות ולזהות כיסוי מינימלי.</p>',
   layout="title")

idea = Scene("idea", "מה זו תכונה עודפת", [
    P("**תכונה עודפת** היא תכונה שאפשר למחוק מתלות, בלי לשנות את מה שנובע מ-$F$.", do=show("i-c0")),
    P("בצד שמאל: ב-$XA \\to Y$, התכונה $A$ עודפת אם $X$ לבד כבר קובע את $Y$.", do=show("i-c1")),
    P("את זה בודקים עם סגור: מחשבים את $X^+$ לפי כל $F$, ובודקים אם $Y$ בפנים.", do=show("i-c1b"),
      say="את זה בודקים עם סגור: מחשבים את הסגור של אֶקְס, לפי כל אֶף, ובודקים אם וַואי בפנים."),
    P("בצד ימין: ב-$X \\to YB$, התכונה $B$ עודפת אם $X \\to B$ נובעת גם אחרי שמוחקים את $B$ מהתלות.",
      do=show("i-c2")),
    P("כלומר יש ל-$X$ דרך אחרת להגיע ל-$B$.", hold=0.4),
], stage=w.stack(w.big("i-1", r"XA \to Y", hidden=False), w.big("i-2", r"X \to YB", hidden=False), gap=70),
   panel=st.card("i-c0", "plain", "עודפת = אפשר למחוק, ו-$F^+$ לא משתנה")
         + st.card("i-c1", "rule", "🔑 שמאל: $A$ עודפת אם $Y \\subseteq X^+$")
         + st.card("i-c1b", "ex", "$X^+$ מחושב לפי <b>כל</b> $F$")
         + st.card("i-c2", "rule", "🔑 ימין: $B$ עודפת אם $X \\to B$ נובעת גם בלעדיה"))

left = Scene("left", "בודקים את F", [
    P("נתונות חמש תלויות. נעבור עליהן אחת אחת.", do=show("f")),
    P("$AD \\to E$: האם $D$ עודפת? נחשב את הסגור של $A$ לבד.", do=show("f-fh1")),
    P("$A \\to D$ מוסיפה את $D$, ואז $AD \\to E$ מוסיפה את $E$. $E$ בפנים, ולכן $D$ עודפת.",
      do=show("l-1", "f-ft1")),
    P("ו-$A$? הסגור של $D$ הוא $D$ בלבד, אז $A$ נחוצה. התלות מתקצרת ל-$A \\to E$."),
    P("$CE \\to B$: הסגור של $C$ לבד הוא כל היחס, כי $C \\to AD$, ומשם $E$ ו-$B$. אז $E$ עודפת.",
      do=hide("f-fh1") + show("f-fh2", "l-2", "f-ft2")),
    P("ועכשיו צד ימין. ב-$C \\to AD$, האם $D$ עודפת? נמחק אותה, ונשאיר $C \\to A$.",
      do=hide("f-fh2") + show("f-fh0")),
    P("עדיין $C \\to A$, ו-$A \\to D$. אז $C$ מגיעה ל-$D$ בדרך אחרת, ו-$D$ עודפת מימין.",
      do=show("l-3", "f-ft0")),
    P("ואת $A$ אי אפשר למחוק מימין: בלעדיה, אין ל-$C$ שום דרך להגיע ל-$A$.", hold=0.3),
    P("ונשארה $C \\to E$. היא כולה מיותרת: $C \\to A$ ו-$A \\to E$ כבר נותנות אותה.",
      do=hide("f-fh0") + show("f-fh4", "f-fx4", "f-ft4", "l-4")),
    P("תלות שנובעת מהאחרות היא **תלות מיותרת**, ומוחקים אותה כולה.", hold=0.4),
], stage=w.stack(w.fd_set("f", R, F, hidden=True, tags=TAGS), gap=20),
   panel=w.row("l-1", "$A^+ = \\{A, D, E\\}$", cls="sm")
         + w.row("l-2", "$C^+ = R$", cls="sm")
         + w.row("l-3", "$C \\to A,\\ A \\to D$", cls="sm")
         + w.row("l-4", "$C \\to A,\\ A \\to E$", cls="sm"))

cover = Scene("cover", "כיסוי מינימלי", [
    P("נאסוף את מה שנשאר: $C \\to A$, $A \\to D$, $A \\to E$, ו-$C \\to B$.", do=show("c-1")),
    P("**כיסוי מינימלי** של $F$ הוא קבוצה שמקיימת שלושה תנאים.", do=show("c-c0")),
    P("היא **שקולה** ל-$F$: אותו סגור. אין בה **תכונה עודפת**. ואין בה **תלות מיותרת**.",
      do=show("c-c1", "c-c2", "c-c3")),
    P("בכיסוי שלנו כל צד ימין הוא תכונה אחת, כמו שנהוג לכתוב כיסוי מינימלי. וכל ארבע התלויות נחוצות."),
    P("ושקילות בודקים בשני הכיוונים: כל תלות של $F$ נובעת מהכיסוי, וכל תלות של הכיסוי נובעת מ-$F$.",
      do=show("c-c5")),
    P("למשל $CE \\to B$ מ-$F$: בכיסוי, הסגור של $C$ הוא שוב כל היחס, ולכן היא נובעת.", hold=0.4),
], stage=w.stack(w.fd_set("c-1", "", GS, name="G", hidden=True,
                          show_r=False),
                 gap=60),
   panel=st.card("c-c0", "plain", "כיסוי מינימלי $G$ של $F$:")
         + st.card("c-c1", "rule", "1. $G^+ = F^+$")
         + st.card("c-c2", "rule", "2. אין תכונה עודפת ב-$G$")
         + st.card("c-c3", "rule", "3. אין תלות מיותרת ב-$G$")
         + st.card("c-c5", "ex", "שקילות: שני הכיוונים"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: ארבע תלויות. בחישוב הכיסוי הקנוני, איזו תכונה היא עודפת?", do=show("x-f")),
    P("רק ל-$AC \\to E$ יש שתי תכונות בצד שמאל, אז נתחיל בה. האם $C$ עודפת? נחשב את הסגור של $A$.",
      do=show("x-f-fh3", "xa", "xa-r0")),
    P("$A \\to B$ ואז $B \\to C$: יש לנו $C$. $A \\to D$ מוסיפה את $D$, ועכשיו $AC \\to E$ מוסיפה את $E$.",
      do=show("xa-r1", "xa-r2", "xa-r3", "xa-r4")),
    P("$A$ לבד מגיעה ל-$E$, ולכן $C$ עודפת ב-$AC \\to E$. זו התשובה.", do=show("xa-rend", "q-ok-a")),
    P("ו-$A$ לא עודפת שם: הסגור של $C$ הוא $C$ בלבד, ולא מגיע ל-$E$.", do=show("q-x-b", "q-n-b")),
    P("$D$ ב-$A \\to D$ ו-$B$ ב-$B \\to C$ הן כל הצד שלהן בתלות, ואין להן תחליף: מחיקה שלהן משנה את הסגור.",
      do=show("q-x-c", "q-n-c", "q-x-d", "q-n-d")),
    P("ו״אין תכונה עודפת״ נופלת, כי מצאנו אחת.", do=show("q-x-e", "q-n-e"), hold=0.5),
], stage=w.stack(w.fd_set("x-f", "ABCDE", FX, hidden=True, cls="sm"), XT, gap=24),
   panel=f'<div class="qstem nf-qsm"><span class="qid">{Q["id"]}</span>בחישוב הכיסוי הקנוני של $F$, איזו תכונה '
         'היא תכונה <b>עודפת</b>?</div>'
         + '<div class="nf-osm">' + st.options("q", OPTS, notes={"b": "$C^+ = \\{C\\}$", "c": "אין דרך אחרת",
                                                                "d": "אין דרך אחרת", "e": "יש"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: בצד שמאל, תכונה עודפת אם הסגור של שאר הצד השמאלי כבר מכיל את הצד הימני.", do=show("r-1")),
    P("בצד ימין, תכונה עודפת אם התלות עדיין נובעת אחרי שמוחקים אותה.", do=show("r-2")),
    P("תלות שנובעת מהשאר היא מיותרת, ומוחקים אותה כולה.", do=show("r-3")),
    P("וכיסוי מינימלי: שקול ל-$F$, בלי עודפות ובלי מיותרות. בודקים את שני הצדדים, תמיד. נתראה ברמה הבאה.",
      do=show("r-4"), hold=0.6),
], stage=w.stack(w.fd_set("r-g", "", GS, name="G", show_r=False)),
   panel=st.card("r-1", "rule", "🔑 שמאל: $Y \\subseteq X^+$")
         + st.card("r-2", "rule", "🔑 ימין: נובעת גם בלעדיה")
         + st.card("r-3", "ex", "תלות שנובעת מהשאר: מוחקים")
         + st.card("r-4", "trap", "⚠️ בודקים את שני הצדדים"))

VIDEO = Video("N05", "norm", "תכונות עודפות וכיסוי מינימלי", [title, idea, left, cover, exam, recap],
              bank={"26B-A-Q20": "a"})
