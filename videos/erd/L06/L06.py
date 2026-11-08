# -*- coding: utf-8 -*-
"""L06 · ישות חלשה — video script (build: tools/video/vid.py L06).

Source: erd/levels/L06.js (goal: recognise a weak entity and an identifying relationship, and build its key:
partial key + the owner's key).
Exam anchor: 25S-B-Q1 (key e, "כל התשובות האחרות אינן נכונות"; official: false in the bank, from the accepted
answers), on 25S-B-erd.png. Its trap fits this level: a double line (כיתה in מכילה) does not make an entity weak, and a
key is never "extended" by another entity's key. Not a quiz id. Option b (the key of a subtype) is answered only by
the general rule; the conversion of the subtypes on this figure (25S-B-Q3/Q4, L02/L07 quiz items) is not shown.
Avoided on purpose: 24B-A-Q5 (twin of L06-Q4, so the "weak / dominated" claim is not stated), 25C-A-Q4, 24B-A-Q2,
26B-A-Q4, and the L06 quiz / lesson diagrams (בניין/חדר, C/E, מלון/חדר/אורח, חברה/עובד/ילד, מדינה/עיר/רחוב).
Worked example: TV series -> season (weak) -> episode (weak of the season). Keys from w_erd.translate.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_erd as w

TV = {"w": 1060, "h": 390, "nodes": [
    {"id": "S", "t": "entity", "x": 120, "y": 200, "label": "סדרה"},
    {"id": "sid", "t": "attr", "x": 120, "y": 75, "label": "קוד סדרה", "key": True, "of": "S"},
    {"id": "sn", "t": "attr", "x": 125, "y": 325, "label": "שם סדרה", "of": "S"},
    {"id": "R1", "t": "rel", "x": 330, "y": 200, "label": "עונה של", "ident": True},
    {"id": "SE", "t": "entity", "x": 540, "y": 200, "label": "עונה", "weak": True},
    {"id": "sno", "t": "attr", "x": 540, "y": 75, "label": "מס' עונה", "partial": True, "of": "SE"},
    {"id": "yr", "t": "attr", "x": 540, "y": 325, "label": "שנה", "of": "SE"},
    {"id": "R2", "t": "rel", "x": 750, "y": 200, "label": "פרק של", "ident": True},
    {"id": "EP", "t": "entity", "x": 950, "y": 200, "label": "פרק", "weak": True},
    {"id": "eno", "t": "attr", "x": 950, "y": 75, "label": "מס' פרק", "partial": True, "of": "EP"},
    {"id": "ln", "t": "attr", "x": 950, "y": 325, "label": "אורך", "of": "EP"},
], "edges": [{"a": "R1", "b": "S", "arrow": True}, {"a": "R1", "b": "SE", "total": True},
             {"a": "R2", "b": "SE", "arrow": True}, {"a": "R2", "b": "EP", "total": True}]}
D1 = w.Diagram("tv", TV, hidden=["R2", "EP", "eno", "ln"])
D2 = w.Diagram("tw", TV, hidden=["R2", "EP", "eno", "ln"])
S_EP = D2.reveal("R2", "EP", "eno", "ln")
TABS, HOME, _ = w.translate(TV)
TXT = [w.schema_text(t) for t in TABS]
assert TXT == ["סדרה([u]קוד סדרה[/u], שם סדרה)",
               "עונה([u]קוד סדרה[/u], [d]מס' עונה[/d], שנה)",
               "פרק([u]קוד סדרה[/u], [u]מס' עונה[/u], [d]מס' פרק[/d], אורך)"], TXT
assert len(TABS) == 3 and "R1" not in HOME and "R2" not in HOME       # identifying relationships: no table
assert TABS[2].key == ["קוד סדרה", "מס' עונה", "מס' פרק"]
SCH = "".join(w.schema_line(f"s{i}", t) for i, t in enumerate(TABS))
# instances: episode 3 exists in season 1 of two series -> only the full key separates them
ROWS = [("101", "1", "3"), ("101", "2", "3"), ("205", "1", "3")]
assert len({r[2] for r in ROWS}) == 1 and len({r[1:] for r in ROWS}) == 2 and len(set(ROWS)) == 3

# ---------------------------------------------------------------- exam 25S-B-Q1
Q = BANK["25S-B-Q1"]
assert Q["correctId"] == "e" and Q["contextId"] == "25S-B-erd" and not Q.get("acceptedIds")
OV = {o["id"]: o["value"] for o in Q["options"]}
assert "מרצה" in OV["a"] and "תואר ראשון" in OV["b"] and "מרצה" in OV["c"] and "כיתה" in OV["d"]
# the figure, read by eye: every rectangle is single (no weak entity, no double diamond); keys: מרצה -> שם,
# כיתה -> מס' כיתה, סטודנט -> תז; כיתה has a double line into מכילה (a participation mark, not identification)
FIG = {"weak": [], "key": {"מרצה": ["שם"], "כיתה": ["מס' כיתה"], "סטודנט": ["תז"]}}
VERD = {"a": len(FIG["key"]["מרצה"]) == 2,
        "b": False,                                    # a subtype's key is the inherited key only (ת"ז)
        "c": False,                                    # a key never repeats in its own table
        "d": "כיתה" in FIG["weak"]}                    # only a weak entity takes another entity's key into its key
VERD["e"] = not any(VERD.values())
assert [k for k, v in VERD.items() if v] == [Q["correctId"]]
OPTS = w.bank_opts(Q)
RINGS = [("lec", 1823, 715, 150), ("lk", 2197, 541, 110), ("cls", 1823, 1252, 150), ("ck", 1720, 1427, 100),
         ("dbl", 1600, 1080, 90), ("ba", 432, 1068, 160)]
EXAM_FIG = st.raster("x", "images/exams/25S-B-erd.png", 1060, (2595, 1575), rings=RINGS)

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נכיר ישות שאין לה מפתח משלה: ישות חלשה."),
    P("נראה איך מזהים אותה בתרשים, ואיך בונים לה מפתח."),
    P("ובסוף נפתור שאלה ממבחן, עם מלכודת של קו כפול.", hold=0.4),
], stage='<div class="kicker">L06 · מודל ERD</div><h1>ישות חלשה</h1>'
         '<p>לזהות ישות חלשה וקשר מזהה, ולבנות את המפתח שלה: מפתח חלקי + מפתח הבעלים.</p>', layout="title")

weak = Scene("weak", "מה זו ישות חלשה", [
    P("שירות סטרימינג שומר סדרות. לכל סדרה יש קוד, והוא המפתח שלה."),
    P("עכשיו עונות. ״עונה שתיים״ לא מזהה שום דבר: לכל סדרה יש עונה שתיים."),
    P("רק ״עונה שתיים של סדרה מאה ואחת״ מזהה עונה. אז לעונה אין מפתח משלה. היא **ישות חלשה**.",
      do=show(*D1.hn("SE"))),
    P("ישות חלשה מצוירת כ**מלבן כפול**.", do=show("w-1")),
    P("והקשר שמחבר אותה לסדרה, הבעלים שלה, הוא **קשר מזהה**: **מעוין כפול**.",
      do=hide(*D1.hn("SE")) + show(*D1.hn("R1"), "w-2")),
    P("יש בו חץ אל הבעלים, כי לכל עונה סדרה אחת. וקו כפול בצד העונה, כי אין עונה בלי סדרה."),
    P("ומספר העונה מסומן בקו תחתון **מקווקו**. זה **מפתח חלקי**: הוא ייחודי רק בתוך אותה סדרה.",
      do=hide(*D1.hn("R1")) + show(*D1.hn("sno"), "w-3")),
    P("המפתח המלא של עונה: המפתח החלקי, ועוד המפתח של הבעלים. קוד סדרה ומספר עונה, יחד.",
      do=hide(*D1.hn("sno")) + show("w-4", "s0", "s1")),
    P("בטבלה, מפתח הבעלים מקבל קו תחתון מלא, והמפתח החלקי נשאר מקווקו. שניהם יחד הם המפתח הראשי.",
      do=show("s1-hi")),
    P("ושימו לב: הקשר המזהה **לא** הופך לטבלה. מפתח הבעלים כבר נמצא בטבלה של העונה.", do=hide("s1-hi") + show("w-5"),
      hold=0.4),
], stage=w.stack(D1.svg(), '<div class="er-schemas">' + SCH + '</div>', gap=18),
   panel=st.card("w-1", "ex", "▭▭ מלבן כפול = ישות חלשה")
         + st.card("w-2", "ex", "◇◇ מעוין כפול = קשר מזהה")
         + st.card("w-3", "ex", "קו תחתון מקווקו = מפתח חלקי")
         + st.card("w-4", "rule", "🔑 מפתח = מפתח חלקי + מפתח הבעלים")
         + st.card("w-5", "rule", "🔑 קשר מזהה ← אין טבלה"))

chain = Scene("chain", "שרשרת", [
    P("ועכשיו פרקים. גם פרק שלוש קיים בכל עונה. אז גם הפרק הוא ישות חלשה, והבעלים שלו הוא **העונה**.",
      do=show(*S_EP)),
    P("המפתח של פרק: המפתח החלקי, מספר פרק, ועוד המפתח **המלא** של הבעלים.", do=show(*D2.hn("EP"))),
    P("והמפתח המלא של עונה הוא כבר שני שדות: קוד סדרה ומספר עונה. אז לפרק יש שלושה שדות מפתח.",
      do=hide(*D2.hn("EP")) + show("u2", "u2-hi", "c-1")),
    P("למה לא מספיק פחות? הנה שלוש שורות, כולן של פרק שלוש.", do=hide("u2-hi") + show("rows")),
    P("שתיים מהן בעונה אחת, של סדרות שונות. בלי קוד סדרה הן היו נראות אותו דבר.", do=show("c-2")),
    P("הטעות הנפוצה: לקחת רק את המפתח החלקי, או רק את המפתח החלקי של הבעלים. צריך את כל השרשרת.", do=show("c-t")),
    P("ועוד דבר: אם מוחקים סדרה, העונות והפרקים שלה נמחקים איתה. בלי הבעלים, החלשה לא מזוהה. זו **תלות קיום**.",
      do=show("c-3"), hold=0.4),
], stage=w.stack(D2.svg(), '<div class="er-schemas">' + w.schema_line("u2", TABS[2]) + '</div>',
                 '<div id="rows" class="h er-schemas">' + "".join(
                     f'<div class="er-sch sm" dir="rtl">פרק(<span class="er-pk">{a}</span>, <span class="er-pk">{b}</span>, '
                     f'<span class="er-ppk">{c}</span>, …)</div>' for a, b, c in ROWS) + '</div>', gap=16),
   panel=st.card("c-1", "rule", "🔑 בעלים חלש? לוקחים את המפתח <b>המלא</b> שלו")
         + st.card("c-2", "ex", "פרק 3 · עונה 1 · סדרות 101 ו-205: רק קוד סדרה מבדיל")
         + st.card("c-t", "trap", "⚠️ מפתח חלקי לבד, או בעלים חלקי: לא מזהה")
         + st.card("c-3", "ex", "מחיקת הבעלים מוחקת את החלשות: תלות קיום"))

exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן, על התרשים של המכללה. לפי התרשים, איזה היגד מתקיים? כולם עוסקים במפתחות."),
    P("לפני הכול: האם יש כאן ישות חלשה? מחפשים מלבן כפול ומעוין כפול. אין אף אחד מהם."),
    P("היגד על הכיתה: המפתח שלה כולל את קוד הכיתה וקוד המכללה. אבל לכיתה יש מפתח משלה: מספר כיתה.",
      do=show("x-ring-cls", "x-ring-ck")),
    P("והקו הכפול שלה אל מכילה? הוא רק השתתפות מלאה. קו כפול לא הופך ישות לחלשה.", do=show("x-ring-dbl")),
    P("ואין בתרשים קשר ישיר בין כיתה למכללה, כך שאין מאיפה לקחת קוד מכללה.", do=show("q-x-d", "q-n-d")),
    P("היגד על המרצה: שני שדות מפתח. אבל למרצה רק תכונה אחת עם קו תחתון, שם. שדה אחד.",
      do=hide("x-ring-cls", "x-ring-ck", "x-ring-dbl") + show("x-ring-lec", "x-ring-lk", "q-x-a", "q-n-a")),
    P("ושתי שורות של מרצה עם אותו מזהה? מפתח לא חוזר בטבלה שלו. לא משנה לאילו מכללות הן קשורות.",
      do=show("q-x-c", "q-n-c")),
    P("ותת הסוג, סטודנט לתואר ראשון: לתת סוג אין מפתח משלו. הוא יורש את המפתח של סטודנט, ולא מוסיפים לו את התואר.",
      do=hide("x-ring-lec", "x-ring-lk") + show("x-ring-ba", "q-x-b", "q-n-b")),
    P("כל ארבעת ההיגדים נופלים, ולכן התשובה: כל התשובות האחרות אינן נכונות.",
      do=hide("x-ring-ba") + show("q-ok-e")),
    P("המלכודת: לחשוב שקו כפול, או קשר לישות אחרת, מוסיפים שדות למפתח. רק ישות חלשה לוקחת מפתח של מישהו אחר.",
      hold=0.4),
], stage=EXAM_FIG,
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q["id"] + '</span>' + Q["question"] + '</div></div>'
         + '<div class="er-osm">' + st.options("q", OPTS, notes={"a": "שדה אחד", "b": "מפתח יורש", "c": "מפתח",
                                                                  "d": "לא חלשה"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: מלבן כפול הוא ישות חלשה, ומעוין כפול הוא הקשר המזהה שלה.", do=show("r-1")),
    P("מפתח של ישות חלשה: המפתח החלקי, המקווקו, ועוד המפתח המלא של הבעלים.", do=show("r-2")),
    P("הקשר המזהה לא הופך לטבלה.", do=show("r-3")),
    P("וקו כפול לבד לא עושה ישות חלשה. נתראה בשלב הבא, על היררכיות.", do=show("r-4"), hold=0.6),
], stage=w.Diagram("tr", TV).svg(),
   panel=st.card("r-1", "rule", "🔑 ▭▭ חלשה · ◇◇ קשר מזהה")
         + st.card("r-2", "rule", "🔑 מפתח = חלקי + מפתח הבעלים המלא")
         + st.card("r-3", "rule", "🔑 קשר מזהה ← אין טבלה")
         + st.card("r-4", "trap", "⚠️ קו כפול ≠ ישות חלשה"))

VIDEO = Video("L06", "erd", "ישות חלשה", [title, weak, chain, exam, recap], bank={"25S-B-Q1": "e"})
