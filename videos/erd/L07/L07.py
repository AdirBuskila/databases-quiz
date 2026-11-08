# -*- coding: utf-8 -*-
"""L07 · ISA: היררכיית תת-סוגים — video script (build: tools/video/vid.py L07).

Source: erd/levels/L07.js (goal: convert a subtype to a table, tell specialization from generalization, and spot the
wrong claims about ISA).
Exam anchor: 26S-A-Q2 (key a: Attendant(employee_id, full_name, salary) + AttendantLanguages(employee_id,
language), in the method that copies the inherited attributes), on 26S-A-erd.png. Not a quiz id. Not discussed on
purpose: the participation of this figure's ISA (26S-A-Q1, twin of L07-Q9) and 26S-A-Q3/Q4.
Avoided on purpose: 25S-B-Q4, 22B-A-Q1, 25S-B-Q3, 21B-A-Q1, 23B-A-Q1, 21S-B-Q2 and the L07 quiz / lesson diagrams
(אדם/סטודנט/מרצה, רכב/פרטי/משאית/אופנוע, תואר ראשון/שני, עובד/מנכ״ל/ראש צוות/מתכנת, עובד/מדריך/קופאי,
עובד/נהג/מנהל/רכב, אדם/מטופל/רופא, עובד/טייס/דייל).
Worked example: bank account -> savings / checking (a multi-valued attribute and its own relationship to card).
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_erd as w

BANKSPEC = {"w": 1060, "h": 480, "nodes": [
    {"id": "AC", "t": "entity", "x": 330, "y": 90, "label": "חשבון"},
    {"id": "acid", "t": "attr", "x": 130, "y": 90, "label": "מס' חשבון", "key": True, "of": "AC"},
    {"id": "bal", "t": "attr", "x": 530, "y": 90, "label": "יתרה", "of": "AC"},
    {"id": "isa", "t": "isa", "x": 330, "y": 195},
    {"id": "SV", "t": "entity", "x": 150, "y": 305, "label": "חיסכון"},
    {"id": "rate", "t": "attr", "x": 150, "y": 425, "label": "ריבית", "of": "SV"},
    {"id": "CH", "t": "entity", "x": 510, "y": 305, "label": "עו״ש"},
    {"id": "lim", "t": "attr", "x": 430, "y": 430, "label": "מסגרת", "of": "CH"},
    {"id": "sig", "t": "attr", "x": 655, "y": 430, "label": "מורשי חתימה", "multi": True, "of": "CH",
     "tname": "מורשי חתימה", "col": "מורשה"},
    {"id": "BL", "t": "rel", "x": 760, "y": 305, "label": "שייך ל"},
    {"id": "CD", "t": "entity", "x": 960, "y": 305, "label": "כרטיס"},
    {"id": "cdid", "t": "attr", "x": 960, "y": 185, "label": "מס' כרטיס", "key": True, "of": "CD"},
], "edges": [{"a": "isa", "b": "AC"}, {"a": "isa", "b": "SV"}, {"a": "isa", "b": "CH"},
             {"a": "BL", "b": "CD"}, {"a": "BL", "b": "CH", "arrow": True}]}
D1 = w.Diagram("b", BANKSPEC, hidden=["BL", "CD", "cdid"])
S_CARD = D1.reveal("BL", "CD", "cdid")
TABS, HOME, _ = w.translate(BANKSPEC)
TXT = [w.schema_text(t) for t in TABS]
assert TXT == ["חשבון([u]מס' חשבון[/u], יתרה)", "חיסכון([u]מס' חשבון[/u], ריבית)", "עו״ש([u]מס' חשבון[/u], מסגרת)",
               "מורשי חתימה([u]מס' חשבון[/u], [u]מורשה[/u])", "כרטיס([u]מס' כרטיס[/u], מס' חשבון)"], TXT
assert w.count_parts(TABS) == (4, 1, 0) and len(TABS) == 5
assert HOME["BL"] is TABS[4] and TABS[4].cols[1].fk == "CH"          # the card points at the checking account
SCH = "".join(w.schema_line(f"s{i}", t, extra_cls="sm") for i, t in enumerate(TABS))
# the other method: the subtype's table also copies the parent's (non-key) attributes
PARENT_EXTRA = [c.name for c in TABS[0].cols if c.kind == "a"]
ALT = TABS[2].cols[:1] + [w.Col(n) for n in PARENT_EXTRA] + TABS[2].cols[1:]
ALT_T = w.Table("עו״ש", "תת-סוג", "CH")
for c in ALT:
    ALT_T.add(c)
assert w.schema_text(ALT_T) == "עו״ש([u]מס' חשבון[/u], יתרה, מסגרת)"
ALT_LINE = w.schema_line("alt", ALT_T, extra_cls="sm")

# ---------------------------------------------------------------- exam 26S-A-Q2
Q = BANK["26S-A-Q2"]
assert Q["correctId"] == "a" and Q["contextId"] == "26S-A-erd"
AIR = {"w": 700, "h": 360, "nodes": [            # the Employee ISA part of 26S-A-erd.png, as drawn
    {"id": "E", "t": "entity", "x": 350, "y": 90, "label": "Employee"},
    {"id": "eid", "t": "attr", "x": 120, "y": 40, "label": "employee_id", "key": True, "of": "E"},
    {"id": "fn", "t": "attr", "x": 350, "y": 30, "label": "full_name", "of": "E"},
    {"id": "sal", "t": "attr", "x": 560, "y": 40, "label": "salary", "of": "E"},
    {"id": "isa", "t": "isa", "x": 350, "y": 175},
    {"id": "PI", "t": "entity", "x": 180, "y": 270, "label": "Pilot"},
    {"id": "lic", "t": "attr", "x": 160, "y": 335, "label": "license_number", "of": "PI"},
    {"id": "AT", "t": "entity", "x": 520, "y": 270, "label": "Attendant"},
    {"id": "lang", "t": "attr", "x": 560, "y": 335, "label": "languages", "multi": True, "of": "AT",
     "tname": "AttendantLanguages", "col": "language"},
], "edges": [{"a": "isa", "b": "E"}, {"a": "isa", "b": "PI"}, {"a": "isa", "b": "AT"}]}
AT_T, AH, _ = w.translate(AIR)
std = {t.name: t for t in AT_T}
inh = [c.name for c in std["Employee"].cols if c.kind == "a"]
att_copy = std["Attendant"].cols[:1] + [w.Col(n) for n in inh] + std["Attendant"].cols[1:]
GOT = f"Attendant([u]{att_copy[0].name}[/u], {', '.join(c.name for c in att_copy[1:])})   " \
      + w.schema_text(std["AttendantLanguages"])
assert GOT.replace(" ", "") == Q["options"][0]["value"].replace(" ", ""), GOT
assert "license_number" in Q["options"][3]["value"] and "languages" in Q["options"][1]["value"]
OPTS = w.bank_opts(Q)
RINGS = [("at", 346, 233, 70), ("lang", 458, 175, 60), ("par", 255, 50, 150), ("pil", 171, 233, 55),
         ("lic", 86, 174, 75)]
EXAM_FIG = st.raster("x", "images/exams/26S-A-erd.png", 1060, (1222, 540), rings=RINGS)

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נכיר את המשולש: ISA, היררכיה של תתי סוגים."),
    P("נראה מה תת סוג יורש, איך הופכים אותו לטבלה, ואילו טענות על המשולש שגויות."),
    P("ובסוף נפתור שאלה ממבחן, בשיטת המרה אחרת.", hold=0.4),
], stage='<div class="kicker">L07 · מודל ERD</div><h1>ISA: היררכיית תת-סוגים</h1>'
         '<p>להמיר תת-סוג לטבלה, להבחין בין הפרדה להכללה, ולזהות טענות שגויות על ISA.</p>', layout="title")

isa = Scene("isa", "ירושה", [
    P("בנק מנהל חשבונות. לכל חשבון יש מספר, שהוא המפתח, ויתרה."),
    P("יש שני סוגים מיוחדים: חשבון חיסכון, וחשבון עובר ושב. המשולש אומר: כל אחד מהם **הוא** חשבון.",
      do=show(*D1.hn("isa"))),
    P("תת סוג **יורש** את כל מה שיש לאב: את המפתח ואת התכונות. לעובר ושב יש מספר חשבון ויתרה, גם בלי לצייר אותם.",
      do=hide(*D1.hn("isa")) + show(*D1.hn("CH"), "i-1")),
    P("ויש לו תכונות משלו: מסגרת, ומורשי חתימה, שהיא תכונה מרובת ערכים.", do=show(*D1.hn("lim", "sig"))),
    P("ירושה זורמת **רק למטה**. הריבית של החיסכון לא עוברת לעובר ושב, ולא עולה לחשבון.",
      do=hide(*D1.hn("CH", "lim", "sig")) + show(*D1.hn("rate"), "i-2")),
    P("ולמה בכלל תת סוג? כי יש לו קשרים משלו. רק לחשבון עובר ושב מקושרים כרטיסי אשראי.",
      do=hide(*D1.hn("rate")) + show(*S_CARD)),
    P("ועוד שני דברים על המשולש. הקו בין האב למשולש: קו בודד אומר שיכול להיות חשבון שאינו מאף סוג.",
      do=show(D1.he("isa", "AC"))),
    P("קו כפול היה אומר שכל חשבון חייב להיות לפחות אחד מהסוגים. וכאן אין קו כפול.", do=show("i-3")),
    P("ואיך הגענו להיררכיה? **הפרדה**: מתחילים מהחשבון הכללי ומפצלים. הרשימה פתוחה, ואפשר להוסיף סוגים בעתיד.",
      do=hide(D1.he("isa", "AC")) + show("i-4")),
    P("**הכללה** היא הכיוון ההפוך: מאחדים ישויות קיימות לאב משותף, והרשימה סגורה.", hold=0.4),
], stage=D1.svg(),
   panel=st.card("i-1", "rule", "🔑 תת-סוג יורש את המפתח ואת כל התכונות של האב")
         + st.card("i-2", "trap", "⚠️ ירושה רק למטה: לא לאב ולא לאחים")
         + st.card("i-3", "ex", "קו בודד לאב = חלקית · קו כפול = מלאה")
         + st.card("i-4", "ex", "הפרדה: מלמעלה, רשימה פתוחה · הכללה: מלמטה, סגורה"))

tables = Scene("tables", "המרה לטבלאות", [
    P("עכשיו טבלאות. האב מקבל טבלה רגילה: מספר חשבון ויתרה.", do=show("s0")),
    P("ותת סוג? בשיטה של הקורס: **המפתח היורש**, ועוד **התכונות של תת הסוג בלבד**.", do=show("t-1")),
    P("חיסכון: מספר חשבון וריבית. את היתרה לא מעתיקים, היא כבר בטבלה של החשבון.", do=show("s1")),
    P("עובר ושב: מספר חשבון ומסגרת. ומורשי החתימה? מרובת ערכים, אז היא יוצאת לטבלה משלה.", do=show("s2", "s3")),
    P("בדיוק כמו בישות רגילה: תכונה מורכבת של תת סוג מתפרקת, ומרובת ערכים יוצאת החוצה."),
    P("והכרטיס? החץ אל עובר ושב אומר שכל כרטיס שייך לחשבון אחד לכל היותר. אז ממזגים.", do=show("s4", "s4-hi")),
    P("והמפתח הזר הוא המפתח ש**עובר ושב יורש**: מספר חשבון. לתת סוג אין מפתח אחר.", do=hide("s4-hi")),
    P("יש גם שיטה אחרת, שמופיעה בפתרונות של מבחנים: להעתיק לטבלת תת הסוג גם את תכונות האב.", do=show("t-2", "alt")),
    P("בשתי השיטות פוסלים את אותן טעויות: תכונה של תת סוג אחר, או מרובת ערכים שנשארה בשורה.", do=show("t-3"),
      hold=0.4),
], stage='<div class="er-schemas">' + SCH + '</div>',
   panel=st.card("t-1", "rule", "🔑 תת-סוג = מפתח יורש + התכונות שלו בלבד")
         + st.card("t-2", "ex", "שיטה חלופית: גם תכונות האב") + ALT_LINE
         + st.card("t-3", "trap", "⚠️ לא תכונה של אח · מרובת ערכים יוצאת"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן, על התרשים של חברת התעופה. העובדים מתחלקים לטייסים ולדיילים."),
    P("השאלה מבקשת את השיטה שבה טבלת תת הסוג כוללת גם את תכונות האב. איך ייראו הדייל, והשפות שלו?",
      do=show("x-ring-at", "x-ring-lang")),
    P("לפי השיטה הזאת, טבלת הדייל מקבלת את מזהה העובד, וגם את השם המלא והמשכורת של האב.",
      do=show("x-ring-par")),
    P("השפות מצוירות באליפסה כפולה: מרובת ערכים. אז הן יוצאות לטבלה נפרדת, של מזהה עובד ושפה.",
      do=hide("x-ring-par")),
    P("שתי הטבלאות יחד: זו האפשרות הנכונה.", do=show("q-ok-a")),
    P("האפשרות שמשאירה את השפות בתוך טבלת הדייל נופלת, כי מרובת ערכים לא נכנסת לשורה.", do=show("q-x-b", "q-n-b")),
    P("גם השפות בתוך טבלת העובד נופלות: השפות שייכות לדייל בלבד.", do=show("q-x-c", "q-n-c")),
    P("מספר הרישיון שייך לטייס, תת סוג אחר. ובלי טבלת הדייל עצמה, ההמרה חלקית.",
      do=hide("x-ring-at", "x-ring-lang") + show("x-ring-pil", "x-ring-lic", "q-x-d", "q-n-d", "q-x-e", "q-n-e")),
    P("המלכודת: לבחור רק טבלה אחת מתוך השתיים. ההמרה המלאה של תת סוג עם מרובת ערכים היא תמיד שתי טבלאות.",
      do=hide("x-ring-pil", "x-ring-lic"), hold=0.4),
], stage=EXAM_FIG,
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q["id"] + '</span>בשיטה שבה טבלת תת-הסוג כוללת '
         'גם את התכונות הנורשות: מה מייצג נכון את Attendant ואת languages?</div></div>'
         + '<div class="er-oxs">' + st.options("q", OPTS, notes={"b": "בשורה", "c": "עולה לאב", "d": "של טייס",
                                                                          "e": "חלקי"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: תת סוג יורש את המפתח ואת התכונות של האב, וירושה זורמת רק למטה.", do=show("r-1")),
    P("טבלת תת סוג: המפתח היורש, ועוד התכונות שלו בלבד. מרובת ערכים יוצאת לטבלה משלה.", do=show("r-2")),
    P("משולש ISA הוא לא קשר. ותת סוג יכול להשתתף בקשרים משלו, עם המפתח היורש.", do=show("r-3")),
    P("הפרדה היא רשימה פתוחה, והכללה סגורה. נתראה בשלב הבא, על קשרים מיוחדים.", do=show("r-4"), hold=0.6),
], stage=w.Diagram("br", BANKSPEC).svg(),
   panel=st.card("r-1", "rule", "🔑 ירושה רק למטה")
         + st.card("r-2", "rule", "🔑 תת-סוג = מפתח יורש + שלו")
         + st.card("r-3", "trap", "⚠️ ISA אינו קשר")
         + st.card("r-4", "ex", "הפרדה פתוחה · הכללה סגורה"))

VIDEO = Video("L07", "erd", "ISA: היררכיית תת-סוגים", [title, isa, tables, exam, recap], bank={"26S-A-Q2": "a"})
