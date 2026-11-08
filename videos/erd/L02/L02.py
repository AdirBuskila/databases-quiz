# -*- coding: utf-8 -*-
"""L02 · סוגי תכונות — video script (build: tools/video/vid.py L02).

Source: erd/levels/L02.js (goal: composite vs multi-valued vs derived, and what each becomes in tables).
Exam anchor: 22B-A-Q3 (official key a: "פרויקט" and "מקצוע לימוד" are multi-valued; the trap is the composite
"תאריך תחילת לימודים"), on the original exam figure 22B-A-erd.png. Not a quiz id; the L02 quiz modelled on 21B-A-Q3
uses its own מרצה diagram. Avoided on purpose: the conversion of "סטודנט לתואר ראשון" on this figure (22B-A-Q1 /
25S-B-Q3, quiz items of L02 and L07), and the L02 quiz diagrams (מרצה, שחקן/מופע, מטופל).
Worked example: a gym member (מנוי) with a composite name, a multi-valued hobbies attribute and a derived seniority;
its tables come from w_erd.translate (the course's rules) and are asserted below.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_erd as w

GYM = {"w": 1000, "h": 560, "nodes": [
    {"id": "M", "t": "entity", "x": 500, "y": 270, "label": "מנוי"},
    {"id": "mid", "t": "attr", "x": 290, "y": 130, "label": "מס' מנוי", "key": True, "of": "M"},
    {"id": "nm", "t": "attr", "x": 290, "y": 395, "label": "שם", "of": "M"},
    {"id": "fn", "t": "attr", "x": 140, "y": 495, "label": "פרטי", "of": "nm"},
    {"id": "ln", "t": "attr", "x": 380, "y": 500, "label": "משפחה", "of": "nm"},
    {"id": "jd", "t": "attr", "x": 720, "y": 130, "label": "תאריך הצטרפות", "of": "M"},
    {"id": "wt", "t": "attr", "x": 560, "y": 470, "label": "משקל", "of": "M"},
    {"id": "hb", "t": "attr", "x": 790, "y": 400, "label": "תחביבים", "multi": True, "of": "M", "tname": "תחביבים",
     "col": "תחביב"},
    {"id": "sen", "t": "attr", "x": 850, "y": 255, "label": "ותק", "derived": True, "of": "M"},
], "edges": []}
D1 = w.Diagram("g", GYM, hidden=["fn", "ln", "nm", "hb", "sen", "jd", "wt"])
S_BASIC = D1.reveal("jd", "wt")
S_COMP = D1.reveal("nm")
S_KIDS = D1.reveal("fn", "ln")
S_MULTI = D1.reveal("hb")
S_DER = D1.reveal("sen")
TABS, HOME, NOTES = w.translate(GYM)
assert [w.schema_text(t) for t in TABS] == [
    "מנוי([u]מס' מנוי[/u], פרטי, משפחה, תאריך הצטרפות, משקל)", "תחביבים([u]מס' מנוי[/u], [u]תחביב[/u])"]
assert len(TABS) == 2 and len(TABS[0].cols) == 5 and NOTES == ["ותק: מחושבת, לא נשמרת"]
SCH = [w.schema_line(f"s{i}", t) for i, t in enumerate(TABS)]
# the wrong versions the four checks reject (each one breaks exactly one check)
BAD = {"b1": "מנוי(<span class=\"er-pk\">מס' מנוי</span>, שם, תאריך הצטרפות, משקל, תחביבים)",
       "b2": "מנוי(<span class=\"er-pk\">מס' מנוי</span>, פרטי, משפחה, תאריך הצטרפות, משקל, ותק)"}

# ---------------------------------------------------------------- exam 22B-A-Q3
Q = BANK["22B-A-Q3"]
assert Q["correctId"] == "a" and Q.get("official") is True and Q["contextId"] == "22B-A-erd"
assert "פרויקט" in Q["options"][0]["value"] and "מקצוע לימוד" in Q["options"][0]["value"]
assert "תאריך תחילת לימודים" in Q["options"][1]["value"] and "סטודנט" in Q["options"][2]["value"]
OPTS = w.bank_opts(Q)
# ring positions on the source image (2932 x 1772): the two double ellipses, the composite date, the entity
RINGS = [("proj", 575, 1484, 175), ("prof", 2605, 817, 175), ("date", 994, 316, 150), ("kids", 994, 106, 230),
         ("stud", 994, 538, 150)]
EXAM_FIG = st.raster("x", "images/exams/22B-A-erd.png", 1060, (2932, 1772), rings=RINGS)

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נלמד שלא כל אליפסה היא אותו דבר."),
    P("נכיר תכונה מורכבת, תכונה מרובת ערכים ותכונה מחושבת, ונראה מה כל אחת הופכת להיות בטבלאות."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">L02 · מודל ERD</div><h1>סוגי תכונות</h1>'
         '<p>להבחין בין תכונה מורכבת, מרובת-ערכים ומחושבת, ולדעת מה כל אחת הופכת להיות בטבלאות.</p>', layout="title")

kinds = Scene("kinds", "שלוש אליפסות מיוחדות", [
    P("נבנה ישות של מנוי בחדר כושר. יש לו מספר מנוי, שהוא המפתח."),
    P("ויש לו תכונות פשוטות: תאריך הצטרפות, ומשקל. לכל מנוי ערך אחד בכל אחת.", do=show(*S_BASIC)),
    P("עכשיו השם. שם מתחלק לשני חלקים: שם פרטי ושם משפחה.", do=show(*S_COMP)),
    P("אז מציירים אליפסה עם **תת אליפסות**. זו תכונה **מורכבת**.", do=show(*S_KIDS, "k-c")),
    P("לכל מנוי עדיין יש שם פרטי אחד ושם משפחה אחד. פשוט מפרקים את השם לחלקים.", do=show(*D1.hn("fn", "ln"))),
    P("ותחביבים? למנוי אחד יכולים להיות הרבה תחביבים, ומספרם משתנה ממנוי למנוי.",
      do=hide(*D1.hn("fn", "ln")) + show(*S_MULTI)),
    P("זו תכונה **מרובת ערכים**, ומציירים אותה כ**אליפסה כפולה**.", do=show(*D1.hn("hb"), "k-m")),
    P("ואחרונה, ותק. אין צורך לשמור אותו: מחשבים אותו מתאריך ההצטרפות.", do=hide(*D1.hn("hb")) + show(*S_DER)),
    P("זו תכונה **מחושבת**, והיא מצוירת באליפסה **מקווקוות**.", do=show(*D1.hn("sen"), "k-d"), hold=0.4),
], stage=D1.svg(),
   panel=st.card("k-c", "ex", "⬭ עם תת-אליפסות = <b>מורכבת</b>")
         + st.card("k-m", "ex", "◎ אליפסה כפולה = <b>מרובת ערכים</b>")
         + st.card("k-d", "ex", "⬭ מקווקוות = <b>מחושבת</b>"))

convert = Scene("convert", "ההמרה לטבלאות", [
    P("למה זה חשוב? כי הצורה של האליפסה קובעת מה קורה לתכונה בטבלאות."),
    P("בודקים ארבעה דברים, לפי הסדר. ראשון: המורכבת **התפרקה**?", do=show("v-1")),
    P("בטבלה אין עמודה בשם שם. יש שתי עמודות, פרטי ומשפחה, באותה שורה של המנוי.", do=show("s0")),
    P("שני: המרובת ערכים **יצאה** לטבלה נפרדת?", do=show("v-2")),
    P("בשורה אחת אין מקום לרשימה באורך משתנה. אז פותחים טבלה של תחביבים.", do=show("s1")),
    P("בכל שורה שלה: מספר המנוי, ותחביב אחד. ולמנוי עם שלושה תחביבים יהיו שלוש שורות."),
    P("המפתח הוא **שני השדות יחד**: מספר מנוי לבד חוזר, ותחביב לבד חוזר אצל מנויים שונים.",
      do=show("s1-hi")),
    P("שלישי: המחושבת **נעלמה**? ותק לא נשמר בשום טבלה. מחשבים אותו בשאילתה.", do=hide("s1-hi") + show("v-3")),
    P("ורביעי: **כולן** שם? תאריך ההצטרפות והמשקל נמצאים. אף תכונה פשוטה לא נשמטה.", do=show("v-4")),
    P("סך הכול שתי טבלאות: אחת לישות, ואחת לתכונה המרובת ערכים.", do=show("v-t")),
    P("וכך נראות המלכודות. מי שהשאיר את השם שלם, ואת התחביבים בתוך השורה, נכשל בשתי הבדיקות הראשונות.",
      do=show("b1")),
    P("ומי שהכניס את הוותק לטבלה, נכשל בבדיקה השלישית.", do=show("b2"), hold=0.4),
], stage=w.stack('<div class="er-schemas">' + "".join(SCH) + "</div>",
                 w.box("b1", "✗ " + BAD["b1"], cls="er-bad"), w.box("b2", "✗ " + BAD["b2"], cls="er-bad"), gap=26),
   panel=st.card("v-1", "rule", "1. <b>התפרקה?</b> מורכבת ← עמודות באותה טבלה")
         + st.card("v-2", "rule", "2. <b>יצאה?</b> מרובת ערכים ← טבלה נפרדת")
         + st.card("v-3", "rule", "3. <b>נעלמה?</b> מחושבת ← לא נשמרת")
         + st.card("v-4", "rule", "4. <b>כולן?</b> אף פשוטה לא חסרה")
         + w.box("v-t", "סה״כ: <b>2</b> טבלאות"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן. תרשים של מכללה: סטודנטים, תתי סוגים, מרצים וכיתות."),
    P("השאלה: האם יש בתרשים תכונה, או תכונות, מרובות ערכים?"),
    P("מחפשים **אליפסה כפולה**, ורק אותה. הנה אחת: פרויקט, למטה משמאל.", do=show("x-ring-proj")),
    P("והנה עוד אחת: מקצוע לימוד, ליד המרצה. מרצה יכול ללמד כמה מקצועות.", do=show("x-ring-prof")),
    P("אז יש שתיים: פרויקט ומקצוע לימוד.", do=show("q-ok-a")),
    P("והמלכודת: תאריך תחילת לימודים. יש לו שלוש תת אליפסות: יום, חודש ושנה.",
      do=hide("x-ring-proj", "x-ring-prof") + show("x-ring-date", "x-ring-kids")),
    P("זו תכונה **מורכבת**, לא מרובת ערכים: לכל סטודנט יש תאריך תחילת לימודים אחד בלבד.",
      do=show("q-x-b", "q-n-b")),
    P("סטודנט הוא מלבן, כלומר ישות, ולא תכונה בכלל.",
      do=hide("x-ring-date", "x-ring-kids") + show("x-ring-stud", "q-x-c", "q-n-c")),
    P("ומכיוון שמצאנו שתי תכונות כאלה, האפשרות שאף תשובה לא נכונה נופלת.", do=hide("x-ring-stud") + show("q-x-d"),
      hold=0.4),
], stage=EXAM_FIG,
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q["id"] + '</span>' + Q["question"] + '</div></div>'
         + '<div class="er-osm">' + st.options("q", OPTS, notes={"b": "מורכבת", "c": "ישות"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: אליפסה עם תת אליפסות היא מורכבת, והיא מתפרקת לעמודות באותה טבלה.", do=show("r-1")),
    P("אליפסה כפולה היא מרובת ערכים, והיא יוצאת לטבלה משלה: מפתח הישות, והערך.", do=show("r-2")),
    P("אליפסה מקווקוות היא מחושבת, והיא לא נשמרת בכלל.", do=show("r-3")),
    P("ובכל שאלת המרה: התפרקה, יצאה, נעלמה, כולן. נתראה בשלב הבא, על החצים.", do=show("r-4"), hold=0.6),
], stage=w.Diagram("gr", GYM).svg(),
   panel=st.card("r-1", "rule", "🔑 מורכבת ← מתפרקת")
         + st.card("r-2", "rule", "🔑 מרובת ערכים ← טבלה נפרדת")
         + st.card("r-3", "rule", "🔑 מחושבת ← נעלמת")
         + st.card("r-4", "trap", "⚠️ מורכבת ≠ מרובת ערכים"))

VIDEO = Video("L02", "erd", "סוגי תכונות", [title, kinds, convert, exam, recap], bank={"22B-A-Q3": "a"})
