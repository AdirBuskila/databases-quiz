# -*- coding: utf-8 -*-
"""L01 · אבני הבניין — video script (build: tools/video/vid.py L01).

Source: erd/levels/L01.js (goal: identify every shape: entity, relationship, attribute, key, and count them).
Exam part: an original "שאלה בסגנון מבחן" (bank={}): every fresh bank ERD question is used for a later level, and the
counting ones (21B-C-Q3) are quiz ids. Avoided on purpose: the L01 quiz diagrams (ספר/סופר, עובד/מהנדס/מנהל,
מטופל, לקוח/הזמנה, רופא/מטופל/מחלקה) and the lesson's סטודנט/קורס and עובד/מחלקה/בניין figures.
Worked examples: צלם-מצלם ב-אירוע (shapes, a key, an attribute on a relationship), a museum (count with ISA),
exam-style: singer-song-album. Every count below is computed from the spec.
"""
from vid import P, Scene, Video, show, hide
import stage as st
import w_erd as w

# ---------------------------------------------------------------- example 1: the four shapes
PHOTO = {"w": 1000, "h": 380, "nodes": [
    {"id": "P", "t": "entity", "x": 200, "y": 200, "label": "צלם"},
    {"id": "pid", "t": "attr", "x": 110, "y": 75, "label": "מס' צלם", "key": True, "of": "P"},
    {"id": "pn", "t": "attr", "x": 110, "y": 320, "label": "שם", "of": "P"},
    {"id": "R", "t": "rel", "x": 500, "y": 200, "label": "מצלם ב"},
    {"id": "hr", "t": "attr", "x": 500, "y": 75, "label": "שעות", "of": "R"},
    {"id": "E", "t": "entity", "x": 800, "y": 200, "label": "אירוע"},
    {"id": "eid", "t": "attr", "x": 890, "y": 75, "label": "קוד אירוע", "key": True, "of": "E"},
    {"id": "ed", "t": "attr", "x": 890, "y": 320, "label": "תאריך", "of": "E"},
], "edges": [{"a": "R", "b": "P"}, {"a": "R", "b": "E"}]}
D1 = w.Diagram("d1", PHOTO, hidden="*")
S_P = D1.reveal("P")
S_R = D1.reveal("R", "E")
S_A = D1.reveal("pn", "ed")
S_K = D1.reveal("pid", "eid")
S_H = D1.reveal("hr")
T1, _, _ = w.translate(PHOTO)
assert [t.key for t in T1 if t.src in ("P", "E")] == [["מס' צלם"], ["קוד אירוע"]]

# ---------------------------------------------------------------- example 2: counting with an ISA
MUSEUM = {"w": 1010, "h": 470, "nodes": [
    {"id": "A", "t": "entity", "x": 170, "y": 130, "label": "אמן"},
    {"id": "aid", "t": "attr", "x": 120, "y": 40, "label": "מס' אמן", "key": True, "of": "A"},
    {"id": "an", "t": "attr", "x": 140, "y": 240, "label": "שם", "of": "A"},
    {"id": "MK", "t": "rel", "x": 400, "y": 130, "label": "יצר"},
    {"id": "W", "t": "entity", "x": 630, "y": 130, "label": "יצירה"},
    {"id": "wid", "t": "attr", "x": 520, "y": 40, "label": "קוד יצירה", "key": True, "of": "W"},
    {"id": "wn", "t": "attr", "x": 740, "y": 40, "label": "שם יצירה", "of": "W"},
    {"id": "isa", "t": "isa", "x": 630, "y": 235},
    {"id": "PT", "t": "entity", "x": 500, "y": 345, "label": "ציור"},
    {"id": "pt", "t": "attr", "x": 380, "y": 425, "label": "טכניקה", "of": "PT"},
    {"id": "SC", "t": "entity", "x": 720, "y": 345, "label": "פסל"},
    {"id": "sc", "t": "attr", "x": 690, "y": 432, "label": "חומר", "of": "SC"},
    {"id": "SH", "t": "rel", "x": 880, "y": 130, "label": "מוצגת ב"},
    {"id": "H", "t": "entity", "x": 900, "y": 280, "label": "אולם"},
    {"id": "hid", "t": "attr", "x": 905, "y": 390, "label": "מס' אולם", "key": True, "of": "H"},
], "edges": [{"a": "MK", "b": "A"}, {"a": "MK", "b": "W"}, {"a": "isa", "b": "W"}, {"a": "isa", "b": "PT"},
             {"a": "isa", "b": "SC"}, {"a": "SH", "b": "W"}, {"a": "SH", "b": "H"}]}
D2 = w.Diagram("d2", MUSEUM)
KINDS = lambda spec, t: [n["id"] for n in spec["nodes"] if n["t"] == t]
ENT2, REL2, ATT2 = KINDS(MUSEUM, "entity"), KINDS(MUSEUM, "rel"), KINDS(MUSEUM, "attr")
assert (len(ENT2), len(REL2), len(ATT2), len(KINDS(MUSEUM, "isa"))) == (5, 2, 7, 1)
KEYS2 = {n["of"]: n["label"] for n in MUSEUM["nodes"] if n.get("key")}
assert KEYS2 == {"A": "מס' אמן", "W": "קוד יצירה", "H": "מס' אולם"}       # subtypes draw no key of their own

# ---------------------------------------------------------------- exam-style question
MUSIC = {"w": 1010, "h": 400, "nodes": [
    {"id": "S", "t": "entity", "x": 130, "y": 200, "label": "זמר"},
    {"id": "sid", "t": "attr", "x": 110, "y": 80, "label": "מס' זמר", "key": True, "of": "S"},
    {"id": "sn", "t": "attr", "x": 110, "y": 320, "label": "שם", "of": "S"},
    {"id": "PF", "t": "rel", "x": 345, "y": 200, "label": "מבצע"},
    {"id": "yr", "t": "attr", "x": 345, "y": 320, "label": "שנת הקלטה", "of": "PF"},
    {"id": "G", "t": "entity", "x": 565, "y": 200, "label": "שיר"},
    {"id": "gid", "t": "attr", "x": 510, "y": 80, "label": "קוד שיר", "key": True, "of": "G"},
    {"id": "gl", "t": "attr", "x": 600, "y": 320, "label": "אורך", "of": "G"},
    {"id": "IN", "t": "rel", "x": 765, "y": 200, "label": "שייך ל"},
    {"id": "AL", "t": "entity", "x": 920, "y": 200, "label": "אלבום"},
    {"id": "alid", "t": "attr", "x": 900, "y": 80, "label": "קוד אלבום", "key": True, "of": "AL"},
    {"id": "aln", "t": "attr", "x": 900, "y": 320, "label": "שם אלבום", "of": "AL"},
], "edges": [{"a": "PF", "b": "S"}, {"a": "PF", "b": "G"}, {"a": "IN", "b": "G"}, {"a": "IN", "b": "AL"}]}
D3 = w.Diagram("d3", MUSIC, scale=1.0)
ENT3, REL3 = KINDS(MUSIC, "entity"), KINDS(MUSIC, "rel")
OWN = {n["label"]: n["of"] for n in MUSIC["nodes"] if n["t"] == "attr"}
assert (len(ENT3), len(REL3)) == (3, 2) and OWN["שנת הקלטה"] == "PF" and MUSIC["nodes"][[n["id"] for n in MUSIC["nodes"]].index("PF")]["t"] == "rel"
KEY_S = [n["label"] for n in MUSIC["nodes"] if n.get("key") and n["of"] == "S"]
assert KEY_S == ["מס' זמר"]
OPTS = [("a", "בתרשים 3 ישויות ו-2 קשרים, ו״שנת הקלטה״ היא תכונה של הקשר ״מבצע״."),
        ("b", "בתרשים 3 ישויות ו-2 קשרים, ו״שנת הקלטה״ היא תכונה של ״שיר״."),
        ("c", "בתרשים 5 ישויות: גם ״מבצע״ ו״שייך ל״ הן ישויות."),
        ("d", "המפתח של ״זמר״ הוא ״שם״.")]
TRUTH = {"a": (len(ENT3), len(REL3)) == (3, 2) and MUSIC["nodes"][3]["t"] == "rel",
         "b": OWN["שנת הקלטה"] == "G",
         "c": len(ENT3) + 0 == 5,
         "d": KEY_S == ["שם"]}
assert TRUTH == {"a": True, "b": False, "c": False, "d": False}

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נכיר את אבני הבניין של תרשים ERD."),
    P("ארבע צורות, ומה כל אחת מהן אומרת. ואז נספור אותן נכון, כמו שמבקשים במבחן."),
    P("ובסוף נפתור שאלה בסגנון מבחן.", hold=0.4),
], stage='<div class="kicker">L01 · מודל ERD</div><h1>אבני הבניין</h1>'
         '<p>לזהות כל צורה בתרשים: ישות, קשר, תכונה ומפתח, ולספור אותן נכון.</p>', layout="title")

shapes = Scene("shapes", "ארבע צורות", [
    P("תרשים ERD מתאר את המבנה של בסיס הנתונים, עוד לפני שבונים טבלאות."),
    P("נבנה תרשים קטן. סוכנות צילום שולחת צלמים לאירועים."),
    P("**מלבן** הוא טיפוס ישויות: משהו שקיים בפני עצמו. כאן, צלם.", do=show(*S_P, "c-ent")),
    P("כל צלם הוא **מופע** של הישות. בטבלה, כל מופע יהיה שורה אחת."),
    P("**מעוין** הוא טיפוס קשרים: פועל שמחבר בין ישויות. צלם מצלם באירוע.", do=show(*S_R, "c-rel")),
    P("שימו לב: שני המלבנים לא מתחברים ישירות. החיבור עובר תמיד דרך מעוין.", do=show(*D1.hn("R"))),
    P("**אליפסה** היא תכונה. היא מחוברת בקו לישות שהיא מתארת: לצלם יש שם, ולאירוע יש תאריך.",
      do=hide(*D1.hn("R")) + show(*S_A, "c-att")),
    P("ותכונה עם **קו תחתון** היא המפתח: היא מזהה כל מופע באופן חד ערכי.", do=show(*S_K, "c-key")),
    P("שני צלמים יכולים להיקרא באותו שם. אבל מספר צלם לא חוזר אף פעם.", do=show(*D1.hn("pid"))),
    P("ועוד דבר: תכונה יכולה להיות מחוברת גם למעוין. שעות הצילום מחוברות לקשר.", do=hide(*D1.hn("pid")) + show(*S_H)),
    P("כי הן מתארות צילום מסוים: צלם מסוים, באירוע מסוים. לא את הצלם לבד, ולא את האירוע לבד.",
      do=show(*D1.hn("hr")), hold=0.4),
], stage=D1.svg(),
   panel=st.card("c-ent", "ex", "▭ מלבן = טיפוס ישויות")
         + st.card("c-rel", "ex", "◇ מעוין = טיפוס קשרים")
         + st.card("c-att", "ex", "⬭ אליפסה = תכונה")
         + st.card("c-key", "rule", "🔑 קו תחתון = מפתח"))

count = Scene("count", "לספור נכון", [
    P("עכשיו תרשים גדול יותר, של מוזיאון. במבחן שואלים: כמה ישויות, כמה קשרים?"),
    P("ישויות סופרים לפי **מלבנים**: אמן, יצירה, ציור, פסל ואולם. חמש.",
      do=show(*D2.hn(*ENT2), "n-e")),
    P("שימו לב: גם ציור ופסל הם מלבנים. הם ישויות לכל דבר, ולכן הם נספרים."),
    P("קשרים סופרים לפי **מעוינים**: יצר, ומוצגת ב. שניים.", say="קשרים סופרים לפי מעוינים: הקשר יצר, והקשר מוצגת־ב. שניים.", do=hide(*D2.hn(*ENT2)) + show(*D2.hn(*REL2), "n-r")),
    P("והמשולש? הוא מסמן היררכיה: ציור ופסל הם סוגים של יצירה. נלמד עליו בשלב שבע.",
      do=hide(*D2.hn(*REL2)) + show(*D2.hn("isa"))),
    P("הוא **לא** קשר. מי שסופר אותו מקבל שלושה קשרים, וזו בדיוק המלכודת של המבחן.", do=show("n-t")),
    P("תכונות סופרים לפי אליפסות: יש כאן שבע. אבל הן לא ישויות, ולא נספרות כמו מלבנים.",
      do=hide(*D2.hn("isa")) + show(*D2.hn(*ATT2), "n-a")),
    P("ומפתחות: לאמן, ליצירה ולאולם יש קו תחתון. ולציור ולפסל אין מפתח משלהם, כי הם יורשים אותו.",
      do=hide(*D2.hn(*ATT2)) + show(*D2.hn("aid", "wid", "hid")), hold=0.4),
], stage=D2.svg(),
   panel=w.box("n-e", "מלבנים = ישויות: <b>5</b>")
         + w.box("n-r", "מעוינים = קשרים: <b>2</b>")
         + st.card("n-t", "trap", "⚠️ משולש ISA אינו קשר")
         + w.box("n-a", "אליפסות = תכונות: <b>7</b>"))

exam = Scene("exam", "שאלה בסגנון מבחן", [
    P("ועכשיו שאלה בסגנון מבחן, על תרשים של זמרים, שירים ואלבומים. איזו טענה נכונה?"),
    P("הדרך הבטוחה: לא לקרוא את האפשרויות מיד. קודם מסמנים בתרשים מה רואים, ואז בודקים כל טענה."),
    P("מתחילים מהספירה. מלבנים: זמר, שיר ואלבום. שלוש ישויות.", do=show(*D3.hn(*ENT3))),
    P("מעוינים: מבצע, ושייך ל. שני קשרים. ולכן הטענה על חמש ישויות נופלת: מעוין הוא לא ישות.", say="מעוינים: הקשר מבצע, והקשר שייך־ל. שני קשרים. ולכן הטענה על חמש ישויות נופלת: מעוין הוא לא ישות.",
      do=hide(*D3.hn(*ENT3)) + show(*D3.hn(*REL3), "q-x-c", "q-n-c")),
    P("עכשיו שנת ההקלטה. למה היא מחוברת? לא למלבן של השיר, אלא למעוין של מבצע.",
      do=hide(*D3.hn(*REL3)) + show(*D3.hn("yr"), D3.he("yr", "PF"))),
    P("אז היא תכונה של הקשר: אותו שיר יכול להיות מוקלט בשנים שונות, על ידי זמרים שונים.",
      do=show("q-x-b", "q-n-b")),
    P("והמפתח של זמר? הקו התחתון נמצא מתחת למספר זמר, לא מתחת לשם.",
      do=hide(*D3.hn("yr"), D3.he("yr", "PF")) + show(*D3.hn("sid"), "q-x-d", "q-n-d")),
    P("שם הוא סתם תכונה: שני זמרים שונים יכולים לשאת אותו שם, ולכן הוא לא מזהה זמר."),
    P("נשארה טענה אחת: שלוש ישויות, שני קשרים, ושנת ההקלטה שייכת לקשר.", do=show("q-ok-a"), hold=0.4),
], stage=D3.svg(),
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">שאלה בסגנון מבחן</span>איזו טענה נכונה לגבי התרשים?</div></div>'
         + '<div class="er-osm">' + st.options("q", OPTS, notes={"b": "מחוברת למעוין", "c": "מעוין אינו ישות",
                                                                  "d": "הקו תחת מס' זמר"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: מלבן הוא ישות, מעוין הוא קשר, ואליפסה היא תכונה.", do=show("r-1")),
    P("קו תחתון מסמן את המפתח, שמזהה כל מופע.", do=show("r-2")),
    P("ישויות מתחברות רק דרך מעוין, ותכונה יכולה לשבת גם על קשר.", do=show("r-3")),
    P("ובספירה: את המשולש לא סופרים כקשר. נתראה בשלב הבא, על סוגי התכונות.", do=show("r-4"), hold=0.6),
], stage=w.Diagram("d2r", MUSEUM).svg(),
   panel=st.card("r-1", "rule", "🔑 ▭ ישות · ◇ קשר · ⬭ תכונה")
         + st.card("r-2", "rule", "🔑 קו תחתון = מפתח")
         + st.card("r-3", "ex", "ישות ↔ ישות רק דרך ◇")
         + st.card("r-4", "trap", "⚠️ ISA אינו קשר"))

VIDEO = Video("L01", "erd", "אבני הבניין", [title, shapes, count, exam, recap], bank={})
