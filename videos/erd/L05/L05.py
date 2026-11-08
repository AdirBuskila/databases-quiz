# -*- coding: utf-8 -*-
"""L05 · המרת קשרים לטבלאות — video script (build: tools/video/vid.py L05).

Source: erd/levels/L05.js (goal: which relationship becomes a table and which merges as a foreign key; count tables
and fields as in the exam).
Exam anchor: 26S-A-Q5 (key c: Booking(passenger_id, flight_number, seat_no, booking_date)), on 26S-A-erd.png; the
answer is also computed by w_erd.translate on a transcription of the Passenger-Booking-Flight part of the figure.
Not a quiz id (the L07 quiz cites 26S-A only for Q1). Avoided on purpose: 24B-A-Q4 and 26B-A-Q1 (twins of L05-Q5 and
L05-Q8), 21S-B-Q5, 26B-A-Q3, 24B-A-Q1/Q3, the L05 quiz diagrams (סטודנט/קורס רישום, עובד/מחלקה, לקוח/מוצר/ספק,
שאלה/מקור, ספר/סופר/קטגוריה, A/M/D) and the lesson's רישום / ניתן ע״י figures.
Worked example: volunteers, shifts, branches (N:M with a role; 1:N with total participation and an attribute).
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_erd as w

VOL = {"w": 1060, "h": 410, "nodes": [
    {"id": "V", "t": "entity", "x": 110, "y": 215, "label": "מתנדב"},
    {"id": "vid", "t": "attr", "x": 115, "y": 85, "label": "מס' מתנדב", "key": True, "of": "V"},
    {"id": "vn", "t": "attr", "x": 110, "y": 345, "label": "שם", "of": "V"},
    {"id": "AS", "t": "rel", "x": 350, "y": 215, "label": "משובץ ל"},
    {"id": "rl", "t": "attr", "x": 350, "y": 345, "label": "תפקיד", "of": "AS"},
    {"id": "S", "t": "entity", "x": 585, "y": 215, "label": "משמרת"},
    {"id": "sid", "t": "attr", "x": 520, "y": 85, "label": "קוד משמרת", "key": True, "of": "S"},
    {"id": "sd", "t": "attr", "x": 585, "y": 345, "label": "תאריך", "of": "S"},
    {"id": "HD", "t": "rel", "x": 800, "y": 215, "label": "מתקיימת ב"},
    {"id": "rm", "t": "attr", "x": 800, "y": 345, "label": "חדר", "of": "HD"},
    {"id": "B", "t": "entity", "x": 990, "y": 215, "label": "סניף"},
    {"id": "bid", "t": "attr", "x": 972, "y": 85, "label": "מס' סניף", "key": True, "of": "B"},
], "edges": [{"a": "AS", "b": "V"}, {"a": "AS", "b": "S"},
             {"a": "HD", "b": "S", "total": True}, {"a": "HD", "b": "B", "arrow": True}]}
D1 = w.Diagram("v", VOL, scale=1.0)
TABS, HOME, _ = w.translate(VOL)
TXT = [w.schema_text(t) for t in TABS]
assert TXT == ["מתנדב([u]מס' מתנדב[/u], שם)",
               "משמרת([u]קוד משמרת[/u], תאריך, מס' סניף, חדר)",
               "סניף([u]מס' סניף[/u])",
               "משובץ ל([u]מס' מתנדב[/u], [u]קוד משמרת[/u], תפקיד)"], TXT
SH = TABS[1]
assert [c.name for c in SH.cols if c.notnull] == ["מס' סניף"] and HOME["HD"] is SH      # merged into משמרת
E, M, R = w.count_parts(TABS)
assert (E, M, R, len(TABS)) == (3, 0, 1, 4)
ASN = TABS[3]
assert len(ASN.cols) == 3 and ASN.key == ["מס' מתנדב", "קוד משמרת"]        # 2 foreign keys + 1 attribute
SCH = "".join(w.schema_line(f"s{i}", t, extra_cls="sm") for i, t in enumerate(TABS))
COUNT = w.count_row("n", [("ישויות", E), ("מרובות ערכים", M), ("קשרי N:M", R)], len(TABS))
WRONG_DIR = w.box("wd", "✗ סניף(<span class=\"er-pk\">מס' סניף</span>, קוד משמרת)", cls="er-bad")

# ---------------------------------------------------------------- exam 26S-A-Q5
Q = BANK["26S-A-Q5"]
assert Q["correctId"] == "c" and Q["contextId"] == "26S-A-erd"
AIR = {"w": 900, "h": 300, "nodes": [            # the Passenger-Booking-Flight part of 26S-A-erd.png, as drawn
    {"id": "F", "t": "entity", "x": 150, "y": 150, "label": "Flight"},
    {"id": "fn", "t": "attr", "x": 150, "y": 50, "label": "flight_number", "key": True, "of": "F"},
    {"id": "BK", "t": "rel", "x": 450, "y": 150, "label": "Booking"},
    {"id": "sn", "t": "attr", "x": 380, "y": 255, "label": "seat_no", "of": "BK"},
    {"id": "bd", "t": "attr", "x": 560, "y": 255, "label": "booking_date", "of": "BK"},
    {"id": "PS", "t": "entity", "x": 750, "y": 150, "label": "Passenger"},
    {"id": "pid", "t": "attr", "x": 750, "y": 50, "label": "passenger_id", "key": True, "of": "PS"},
], "edges": [{"a": "BK", "b": "PS"}, {"a": "BK", "b": "F"}]}
AT, AH, _ = w.translate(AIR)
assert w.schema_text(AH["BK"]).replace(" ", "") == Q["options"][2]["value"].replace(" ", "")
OPTS = w.bank_opts(Q)
RINGS = [("bk", 782, 380, 70), ("att", 775, 500, 85), ("pid", 932, 284, 65), ("fn", 503, 284, 65),
         ("ps", 1000, 380, 70), ("fl", 577, 380, 60)]
EXAM_FIG = st.raster("x", "images/exams/26S-A-erd.png", 1060, (1222, 540), rings=RINGS)

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("עד עכשיו קראנו תרשימים. מהסרטון הזה מתחילים להפוך אותם לטבלאות."),
    P("כל ישות הופכת לטבלה. השאלה היא מה קורה לקשרים, והתשובה תלויה בחצים."),
    P("נבנה טבלאות, נספור אותן, ובסוף נפתור שאלה ממבחן.", hold=0.4),
], stage='<div class="kicker">L05 · מודל ERD</div><h1>המרת קשרים לטבלאות</h1>'
         '<p>לדעת איזה קשר הופך לטבלה ואיזה מתמזג כמפתח זר, ולספור טבלאות ושדות כמו במבחן.</p>', layout="title")

rules = Scene("rules", "שני סוגי קשרים", [
    P("ארגון מתנדבים: מתנדבים משובצים למשמרות, וכל משמרת מתקיימת בסניף."),
    P("קודם הישויות. כל ישות מקבלת טבלה, עם המפתח שלה ועם התכונות שלה.", do=show("s0", "s1", "s2")),
    P("עכשיו הקשר משובץ ל. אין בו חצים, אז הוא **רבים לרבים**.", do=show(*D1.hn("AS"))),
    P("מתנדב עושה הרבה משמרות, ובמשמרת יש הרבה מתנדבים. אין עמודה אחת שיכולה להחזיק את זה."),
    P("לכן קשר כזה **חייב טבלה משלו**. המפתח שלה: המפתחות של שני הצדדים, יחד.", do=show("s3", "c-1")),
    P("והתפקיד, שהוא תכונה של הקשר, נכנס לטבלה הזאת כעמודה רגילה.", do=show(*D1.hn("rl"))),
    P("ועכשיו מתקיימת ב. יש חץ אל הסניף: כל משמרת מתקיימת בסניף אחד לכל היותר.",
      do=hide(*D1.hn("AS", "rl")) + show(*D1.hn("HD"), D1.he("HD", "B"))),
    P("קשר כזה **לא** מקבל טבלה. לוקחים את המפתח של הסניף, ומוסיפים אותו כמפתח זר לטבלה של המשמרת.",
      do=show("s1-hi", "c-2")),
    P("למה דווקא למשמרת? כי לכל משמרת יש סניף אחד, ערך אחד בשורה שלה.", do=show(*D1.hn("S"))),
    P("בכיוון ההפוך זה לא עובד: בסניף יש הרבה משמרות, ואין מקום לכולן בעמודה אחת.", do=show("wd")),
    P("ולקשר הזה יש תכונה, חדר. היא **עוברת יחד** עם המפתח הזר, לאותה טבלה של המשמרת.",
      do=hide(*D1.hn("S")) + show(*D1.hn("rm"))),
    P("ואחרון: הקו הכפול בצד המשמרת. כל משמרת **חייבת** סניף, ולכן העמודה של מספר הסניף לא יכולה להיות ריקה.",
      do=hide(*D1.hn("rm"), D1.he("HD", "B")) + show(D1.he("HD", "S"))),
    P("את זה אוכפים בהגדרת העמודה כ-NOT NULL.", do=show("c-3"), hold=0.4),
], stage=w.stack(D1.svg(), '<div class="er-schemas">' + SCH + '</div>', gap=18),
   panel=st.card("c-1", "rule", "🔑 בלי חץ (N:M) ← <b>טבלה</b>: שני המפתחות + תכונות הקשר")
         + st.card("c-2", "rule", "🔑 חץ אל X ← <b>אין טבלה</b>: מפתח X נכנס כמפתח זר לצד השני")
         + WRONG_DIR
         + st.card("c-3", "ex", "קו כפול בצד שמוזג ← <b>NOT NULL</b>"))

count = Scene("count", "לספור טבלאות ושדות", [
    P("במבחן שואלים: כמה טבלאות יתקבלו? יש נוסחה פשוטה."),
    P("סופרים ישויות: שלוש.", do=show("n-p0")),
    P("מוסיפים תכונות מרובות ערכים, כי כל אחת מהן יוצאת לטבלה. כאן אין, אז אפס.", do=show("n-p1")),
    P("ומוסיפים את קשרי הרבים לרבים: אחד, משובץ ל. קשר עם חץ מוסיף אפס.", do=show("n-p2")),
    P("סך הכול ארבע טבלאות.", do=show("n-tot")),
    P("ושדות בטבלה של קשר רבים לרבים: המפתחות הזרים של המשתתפים, ועוד תכונות הקשר.", do=show("f-1")),
    P("במשובץ ל: מספר מתנדב, קוד משמרת, ותפקיד. שלושה שדות. השם של המתנדב **לא** שם, הוא בטבלה שלו.",
      do=show("f-2"), hold=0.4),
], stage=w.stack(COUNT, w.box("f-1", "שדות בטבלת N:M = מפתחות זרים + תכונות הקשר"),
                 w.box("f-2", "משובץ ל: <b>2</b> מפתחות + <b>1</b> תכונה = <b>3</b> שדות", cls="big"), gap=40),
   panel=st.card("n-r", "rule", "🔑 טבלאות = ישויות + מרובות ערכים + קשרי N:M").replace(' h"', '"'))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן, על תרשים של חברת תעופה. הקשר הזמנה מחבר נוסעים לטיסות."),
    P("נתון שהוא רבים לרבים, ויש לו שתי תכונות: מספר מושב ותאריך הזמנה. איזו סכמה מייצגת אותו נכון?",
      do=show("x-ring-bk", "x-ring-att")),
    P("רבים לרבים, אז קודם כול: טבלה משלו. שתי האפשרויות שמכניסות עמודה לטבלת הנוסע או לטבלת הטיסה נופלות.",
      do=show("q-x-a", "q-n-a", "q-x-d", "q-n-d")),
    P("מיזוג כזה מתאים רק לקשר עם חץ. כאן נוסע מזמין הרבה טיסות, ולא תהיה לו עמודה אחת של טיסה."),
    P("עכשיו המפתח: המפתחות של **שני** הצדדים. מזהה הנוסע, ומספר הטיסה.",
      do=hide("x-ring-bk", "x-ring-att") + show("x-ring-pid", "x-ring-fn")),
    P("ועוד שתי התכונות, כעמודות רגילות. זו האפשרות הנכונה.", do=show("q-ok-c")),
    P("ושתי האפשרויות עם מפתח אחד בלבד? עם מספר הטיסה לבד, טיסה לא יכולה להכיל שני נוסעים.",
      do=show("q-x-b", "q-n-b")),
    P("ועם מזהה הנוסע לבד, נוסע לא יכול להזמין שתי טיסות. המלכודת: מפתח של צד אחד בלבד.",
      do=hide("x-ring-pid", "x-ring-fn") + show("q-x-e", "q-n-e"), hold=0.4),
], stage=EXAM_FIG,
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q["id"] + '</span>Booking: רבים-לרבים, עם seat_no ו-booking_date. '
         'איזו תבנית יחס מייצגת אותו נכון?</div></div>'
         + '<div class="er-oxs">' + st.options("q", OPTS, notes={"a": "מיזוג", "b": "צד אחד", "d": "מיזוג",
                                                                         "e": "צד אחד"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: כל ישות היא טבלה. קשר בלי חצים הוא טבלה, עם המפתחות של שני הצדדים.", do=show("r-1")),
    P("קשר עם חץ מתמזג: מפתח הישות שהחץ מצביע אליה נכנס לטבלה של הצד השני, יחד עם תכונות הקשר.", do=show("r-2")),
    P("קו כפול בצד שאליו מיזגנו הופך ל-NOT NULL.", do=show("r-3")),
    P("וטבלאות סופרים כך: ישויות, ועוד מרובות ערכים, ועוד קשרי רבים לרבים. נתראה בשלב הבא, על ישויות חלשות.",
      do=show("r-4"), hold=0.6),
], stage=w.Diagram("vr", VOL).svg(),
   panel=st.card("r-1", "rule", "🔑 N:M ← טבלה, מפתח = שני המפתחות")
         + st.card("r-2", "rule", "🔑 חץ אל X ← מפתח X לצד השני")
         + st.card("r-3", "ex", "קו כפול ← NOT NULL")
         + st.card("r-4", "trap", "⚠️ מפתח זר הולך לצד ה״רבים״"))

VIDEO = Video("L05", "erd", "המרת קשרים לטבלאות", [title, rules, count, exam, recap], bank={"26S-A-Q5": "c"})
