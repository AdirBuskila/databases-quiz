# -*- coding: utf-8 -*-
"""N02 · כללי ארמסטרונג — video script (build: tools/video/vid.py N02).

Source: norm/levels/N02.js (lesson + goal: reflexivity, augmentation, transitivity; union, decomposition,
pseudo-transitivity; a proof as a chain of rules; decomposition works only on the right side).
Exam anchor: 21B-A-Q20 (is EC → D in F⁺, and by which rule?) — official key b (reflexivity), the official answer table
also accepted c and d: the proof can be written in more than one way, and the video shows two of them.
Avoided on purpose: the N02 quiz items and their examples (A → B, B → C ⇒ A → C; A → B ⇒ AC → BC; A → BC ⇒ A → B;
AB → C; A → B, BC → D ⇒ AC → D; A → B, A → C, C → D; C → DE, E → B, AC → B; the chain A → B → C → D) and the lesson's
chain (B → CD, D → E, AB → E); 21S-B-Q25 and 21B-A-Q19 are quiz ids. Every derived FD below is checked with
w_norm.implies (cross-checked with tools/fdlib.js).
"""
from vid import Scene, Video, BANK
import stage as st
import w_norm as w
from w_norm import P, show, hide

# ---------------------------------------------------------------- rule examples (verified)
assert w.implies([], ("CD", "D"))                                     # reflexivity
assert w.implies([("B", "C")], ("BD", "CD"))                          # augmentation by D
assert w.implies([("A", "D"), ("D", "E")], ("A", "E"))                # transitivity
assert w.implies([("D", "E"), ("D", "G")], ("D", "EG"))               # union
assert w.implies([("E", "GH")], ("E", "G"))                           # decomposition
assert w.implies([("D", "E"), ("CE", "G")], ("CD", "G"))              # pseudo-transitivity
# the trap: decomposition does not work on the left; no reversal
assert not w.implies([("CD", "E")], ("C", "E")) and not w.implies([("CD", "E")], ("D", "E"))
assert not w.implies([("A", "D")], ("D", "A"))

# ---------------------------------------------------------------- the chain proof: F = {B → C, B → E, CE → D} ⊢ BG → DG
FC = [("B", "C"), ("B", "E"), ("CE", "D")]
CHAIN = [("B", "CE", "איחוד של 1 ו-2"), ("B", "D", "טרנזיטיביות עם 3"), ("BG", "DG", "הרחבה ב-$G$")]
for k, (l, r, _) in enumerate(CHAIN):
    assert w.implies(FC, (l, r))
    # each step follows from F plus the steps before it by the named rule alone
assert w.implies([("B", "C"), ("B", "E")], ("B", "CE"))
assert w.implies([("B", "CE"), ("CE", "D")], ("B", "D"))
assert w.implies([("B", "D")], ("BG", "DG"))
assert not w.implies(FC, ("C", "D")) and not w.implies(FC, ("E", "D"))   # neither C nor E alone gives D

# ---------------------------------------------------------------- exam 21B-A-Q20
Q = BANK["21B-A-Q20"]
assert Q["correctId"] == "b" and set(Q["acceptedIds"]) == {"b", "c", "d"}
FX = w.parse_f("A -> BE, AE -> C, C -> D")
assert BANK["21B-A-Q20"]["contextId"] == "21B-A-fd"
assert w.implies(FX, ("CE", "D"))
assert w.implies([], ("CE", "C")) and w.implies([("CE", "C"), ("C", "D")], ("CE", "D"))        # reflexivity + transitivity
assert w.implies([("C", "D")], ("CE", "DE")) and w.implies([("CE", "DE")], ("CE", "D"))        # augmentation + decomposition
O = {o["id"]: o["value"] for o in Q["options"]}
assert "רפלקסיביות" in O["b"] and "פירוק" in O["c"] and O["a"].startswith("לא")
OPTS = [(o["id"], o["value"]) for o in Q["options"]]
assert w.crosscheck() > 0

PROOF = w.table("pr", ["#", "תלות", "נימוק"],
                [["1", "$B \\to C$", "נתון"], ["2", "$B \\to E$", "נתון"], ["3", "$CE \\to D$", "נתון"]]
                + [[str(k + 4), f"${w.tfd(l, r)}$", why] for k, (l, r, why) in enumerate(CHAIN)],
                ids=[None, None, None, "pr-4", "pr-5", "pr-6"], cls="nf-pr")

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד להסיק תלויות חדשות מתוך תלויות נתונות."),
    P("נכיר שלושה כללי היסק בסיסיים ושלושה נגזרים, נבנה הוכחה בשרשרת, ונראה איזו ״הוכחה״ לא חוקית."),
    P("ובסוף נפתור שאלה ממבחן.", hold=0.4),
], stage='<div class="kicker">N02 · תלויות ונרמול</div><h1>כללי ארמסטרונג</h1>'
         '<p>להכיר את שלושת כללי ההיסק ואת שלושת הנגזרים, ולזהות איזה כלל מוכיח תלות ואיזו "הוכחה" לא חוקית.</p>',
   layout="title")

idea = Scene("idea", "מסיקים תלויות", [
    P("נתונה קבוצת תלויות $F$. מתוכה נובעות עוד תלויות, שלא כתובות בה במפורש.", do=show("i-1")),
    P("למשל, אם סטודנט קובע מחלקה, ומחלקה קובעת דיקן, אז סטודנט קובע דיקן.", do=show("i-c1")),
    P("כל התלויות שאפשר להסיק מ-$F$ נקראות $F^+$, הסגור של $F$.", do=show("i-2"),
      say="כל התלויות שאפשר להסיק מאֶף נקראות אֶף פלוס, הסגור של אֶף."),
    P("כללי ארמסטרונג הם הכלים להסקה הזאת. הם מסיקים רק דברים נכונים, ומגיעים לכל מה שנובע.",
      do=show("i-c2"), hold=0.4),
], stage=w.stack(w.big("i-1", r"F"), w.big("i-2", r"F^+", cls="sm"), gap=50),
   panel=st.card("i-c1", "ex", "סטודנט $\\to$ מחלקה $\\to$ דיקן")
         + st.card("i-c2", "rule", "🔑 ארמסטרונג: נאותים ושלמים"))

basic = Scene("basic", "שלושת הכללים", [
    P("הכלל הראשון: **רפלקסיביות**. אם $Y$ מוכלת ב-$X$, אז מתקיימת $X \\to Y$.", do=show("b-1")),
    P("למשל $CD \\to D$. אלה התלויות הטריוויאליות מהשלב הקודם.", do=show("b-1e")),
    P("הכלל השני: **הרחבה**. אם מתקיימת $X \\to Y$, מותר להוסיף את אותן תכונות **לשני** הצדדים.", do=show("b-2")),
    P("מ-$B \\to C$ נקבל $BD \\to CD$: הוספנו את $D$ משמאל וגם מימין.", do=show("b-2e")),
    P("הכלל השלישי: **טרנזיטיביות**. אם מתקיימות $X \\to Y$ ו-$Y \\to Z$, אז מתקיימת גם $X \\to Z$.", do=show("b-3")),
    P("מ-$A \\to D$ ו-$D \\to E$ נקבל $A \\to E$. זה בדיוק הסטודנט, המחלקה והדיקן.", do=show("b-3e"),
      hold=0.4),
], stage=w.table("bt", ["כלל", "אם", "אז", "דוגמה"], [
    ["רפלקסיביות", "$Y \\subseteq X$", "$X \\to Y$", "$CD \\to D$"],
    ["הרחבה", "$X \\to Y$", "$WX \\to WY$", "$BD \\to CD$"],
    ["טרנזיטיביות", "$X \\to Y,\\ Y \\to Z$", "$X \\to Z$", "$A \\to E$"]], hidden=False, ids=["b-1", "b-2", "b-3"]),
   panel=st.card("b-1e", "ex", "$CD \\to D$: תמיד נכון")
         + st.card("b-2e", "ex", "$B \\to C$ ולכן $BD \\to CD$")
         + st.card("b-3e", "ex", "$A \\to D,\\ D \\to E$ ולכן $A \\to E$"))

derived = Scene("derived", "הכללים הנגזרים", [
    P("משלושת הכללים נגזרים עוד שלושה, שחוסכים הרבה עבודה.", do=show("d-t")),
    P("**איחוד**: אם מתקיימות $D \\to E$ וגם $D \\to G$, אז גם $D \\to EG$. אותו צד שמאל, מחברים את הימניים.",
      do=show("d-1")),
    P("**פירוק**: ההפך. מ-$E \\to GH$ נקבל $E \\to G$, וגם $E \\to H$.", do=show("d-2")),
    P("**טרנזיטיביות למחצה**: מ-$D \\to E$ ו-$CE \\to G$ נקבל $CD \\to G$.", do=show("d-3")),
    P("למה? $D$ נותנת את $E$, וה-$C$ נשארת לידה. ביחד יש לנו $C$ ו-$E$, וזה מספיק ל-$G$.", do=show("d-c1"),
      hold=0.4),
], stage=w.table("d-t", ["כלל", "אם", "אז"], [
    ["איחוד", "$X \\to Y,\\ X \\to Z$", "$X \\to YZ$"],
    ["פירוק", "$X \\to YZ$", "$X \\to Y,\\ X \\to Z$"],
    ["טרנזיטיביות למחצה", "$X \\to Y,\\ WY \\to Z$", "$WX \\to Z$"]], ids=["d-1", "d-2", "d-3"]),
   panel=st.card("d-c1", "ex", "$D \\to E$ ולכן $CD \\to CE$, ואז $CE \\to G$"))

chain = Scene("chain", "הוכחה בשרשרת", [
    P("עכשיו הוכחה שלמה. נתונות שלוש תלויות, ורוצים להוכיח את $BG \\to DG$.", do=show("pr", "c-g")),
    P("ל-$D$ צריך גם את $C$ וגם את $E$. ו-$B$ נותנת את שתיהן."),
    P("צעד ראשון: איחוד של התלות הראשונה והשנייה, ומקבלים $B \\to CE$.", do=show("pr-4")),
    P("צעד שני: טרנזיטיביות עם $CE \\to D$. קיבלנו $B \\to D$.", do=show("pr-5")),
    P("וצעד אחרון: הרחבה. מוסיפים $G$ לשני הצדדים, ומקבלים $BG \\to DG$. סיימנו.", do=show("pr-6")),
    P("כל שורה בהוכחה היא תלות נתונה, או תוצאה של כלל אחד שמופעל על שורות קודמות.", do=show("c-c1"),
      hold=0.4),
], stage=w.stack(PROOF),
   panel=st.card("c-g", "plain", "מטרה: $BG \\to DG$")
         + st.card("c-c1", "rule", "🔑 כל שורה: נתון, או כלל על שורות קודמות"))

trap = Scene("trap", "הוכחה לא חוקית", [
    P("ועכשיו הטעות הנפוצה: לפרק את הצד **השמאלי**.", do=show("t-1")),
    P("מ-$CD \\to E$ לא נובעת $C \\to E$. צריך את $C$ ואת $D$ **יחד**.", do=show("t-2")),
    P("דוגמה: מספר טיסה ותאריך קובעים טייס. אבל מספר הטיסה לבד לא קובע טייס, כי בכל יום טס מישהו אחר.",
      do=show("t-c1")),
    P("ופירוק עובד רק בצד **הימני**: מ-$E \\to GH$ מותר לקבל $E \\to G$.", do=show("t-c2")),
    P("וטעות שנייה: להפוך תלות. מ-$A \\to D$ לא נובעת $D \\to A$. סטודנט קובע מחלקה, אבל מחלקה לא קובעת סטודנט.",
      do=show("t-3"), hold=0.4),
], stage=w.stack(w.row("t-1", '<span class="nf-warn">פירוק בשמאל?</span>'),
                 w.row("t-2", '$CD \\to E$ &nbsp; $\\not\\Rightarrow$ &nbsp; $C \\to E$'),
                 w.row("t-3", '$A \\to D$ &nbsp; $\\not\\Rightarrow$ &nbsp; $D \\to A$'), gap=50),
   panel=st.card("t-c1", "ex", "(טיסה, תאריך) $\\to$ טייס, אבל טיסה לבד לא")
         + st.card("t-c2", "trap", "⚠️ פירוק: רק בצד ימין"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן. נתונות שלוש תלויות. האם $EC \\to D$ נמצאת בסגור של $F$? ואם כן, למה?", do=show("x-f")),
    P("ל-$D$ יש רק תלות אחת שמגיעה אליה: $C \\to D$. ו-$C$ נמצאת בצד שמאל שלנו.", do=show("x-f-fh2")),
    P("הוכחה אחת: $EC \\to C$ ברפלקסיביות, כי $C$ מוכלת ב-$EC$.", do=show("x-1")),
    P("ואז טרנזיטיביות עם $C \\to D$: קיבלנו $EC \\to D$. אז כן, ובעזרת רפלקסיביות.", do=show("x-2", "q-ok-b")),
    P("אבל יש גם הוכחה אחרת: הרחבה של $C \\to D$ ב-$E$ נותנת $EC \\to ED$, ופירוק נותן $EC \\to D$.",
      do=show("x-3", "q-n-c")),
    P("לכן בטבלת התשובות הרשמית התקבלו כל שלוש התשובות שאומרות ״כן״: אפשר לכתוב את ההוכחה בכמה דרכים.",
      do=show("q-n-d")),
    P("והתשובות ״לא״ ו״אין מספיק נתונים״ נופלות: התלות נובעת, והנתונים מספיקים כדי להוכיח אותה.",
      do=show("q-x-a", "q-n-a", "q-x-e", "q-n-e"), hold=0.5),
], stage=w.stack(w.fd_set("x-f", "ABCDE", FX, hidden=True),
                 w.row("x-1", "1. &nbsp;$EC \\to C$ &nbsp;<span class=\"nf-warn\">רפלקסיביות</span>", cls="sm"),
                 w.row("x-2", "2. &nbsp;$EC \\to D$ &nbsp;<span class=\"nf-warn\">טרנזיטיביות</span>", cls="sm"),
                 w.row("x-3", "או: &nbsp;$EC \\to ED$ &nbsp;<span class=\"nf-warn\">הרחבה</span>, &nbsp;"
                       "$EC \\to D$ &nbsp;<span class=\"nf-warn\">פירוק</span>", cls="sm"), gap=26),
   panel=f'<div class="qstem nf-qsm"><span class="qid">{Q["id"]}</span>האם התלות $EC \\to D$ נמצאת בסגור של $F$? '
         'אם כן, מדוע?</div>'
         + '<div class="nf-osm">' + st.options("q", OPTS, notes={"a": "נובעת", "c": "גם הוכחה", "d": "גם היא התקבלה רשמית",
                                                                "e": "מספיק"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: שלושה כללים בסיסיים. רפלקסיביות, הרחבה וטרנזיטיביות.", do=show("r-1")),
    P("ושלושה נגזרים: איחוד, פירוק וטרנזיטיביות למחצה.", do=show("r-2")),
    P("פירוק עובד רק בצד הימני, ותלות לא הופכים.", do=show("r-3")),
    P("וברמה הבאה נלמד דרך מהירה יותר: לחשב סגור של קבוצת תכונות, בלי לכתוב הוכחה. נתראה שם.", do=show("r-4"),
      hold=0.6),
], stage=w.stack(w.big("r-f", r"F^+", hidden=False)),
   panel=st.card("r-1", "rule", "🔑 רפלקסיביות · הרחבה · טרנזיטיביות")
         + st.card("r-2", "rule", "🔑 איחוד · פירוק · טרנזיטיביות למחצה")
         + st.card("r-3", "trap", "⚠️ פירוק רק בימין · לא הופכים תלות")
         + st.card("r-4", "ex", "הבא בתור: הסגור $X^+$"))

VIDEO = Video("N02", "norm", "כללי ארמסטרונג", [title, idea, basic, derived, chain, trap, exam, recap],
              bank={"21B-A-Q20": "b"})
