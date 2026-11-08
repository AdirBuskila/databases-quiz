# -*- coding: utf-8 -*-
"""L10 · מבחן גמר: שאלות ממבחנים — video script (build: tools/video/vid.py L10).

Boss walkthrough (erd/levels/L10.js is boss: true; goal: exam-level questions that combine everything). Three exam
questions that no level quiz uses, each solved with the L10 checklist:
  26Z-CL-Q1  table count of the big abstract diagram (key c = 11): w_erd.translate on the bank's own erd spec, drawn
             by w_erd.relayout (same content, asserted)
  21S-B-Q4   renting houses (official key d: "יכולים להיות בתים שלא הושכרו"), on 21S-B-erd.png
  26S-A-Q4   airline: Commands = double line at Flight + arrow to Pilot (key a: exactly one pilot), on 26S-A-erd.png
Avoided on purpose: the twelve L10 quiz items and their sources (21S-B-Q5, 24B-A-Q1/Q2, 25C-A-Q1/Q4, 26B-A-Q3/Q4,
25S-B-Q4), 21S-B-Q1/Q3/Q6 (lesson / quiz cases of L02/L04), 26S-A-Q1 (twin of L07-Q9: the participation of this
figure's ISA is not discussed), and every question solved in L01-L09 (22B-A-Q2/Q3, 21B-A-Q2, 26S-A-Q2/Q5, 25S-B-Q1,
26Z-CL-Q2/Q4).
"""
from vid import P, Scene, Video, show, hide, BANK
import json, pathlib
import stage as st
import w_erd as w

# ---------------------------------------------------------------- 26Z-CL-Q1
Q1 = BANK["26Z-CL-Q1"]
assert Q1["correctId"] == "c" and Q1["contextId"] == "26Z-CL-erd"
_ctx = json.loads((pathlib.Path(w.__file__).resolve().parents[2] / "questions.json").read_text(encoding="utf-8"))
SRC = _ctx["contexts"]["26Z-CL-erd"]["erd"]
BIG = w.relayout(SRC, 1.1, 1.28, moves={"pC2": (-14, 0), "pD": (-8, 0)})
DX = w.Diagram("z", BIG, fs=20)
ZT, ZH, ZN = w.translate(SRC)
E, M, R = w.count_parts(ZT)
assert (E, M, R, len(ZT)) == (8, 1, 2, 11)
V1 = {o["id"]: int(o["value"]) for o in Q1["options"]}
assert [k for k, v in V1.items() if v == len(ZT)] == ["c"]
assert sorted(t.src for t in ZT if t.why in ("קשר N:M", "קשר טרינארי")) == ["R1", "R3"]
assert ZH["R2"] is ZH["R1"] and "R4" not in ZH                  # R2 merged into R1; R4 identifying: no table
assert V1["d"] == len(ZT) + 1 and V1["b"] == len(ZT) - M          # the two traps: a table for R2, forgetting PropA_2
ENTS = [n["id"] for n in SRC["nodes"] if n["t"] == "entity"]
assert len(ENTS) == E
OPTS1 = [(o["id"], o["value"]) for o in Q1["options"]]

# ---------------------------------------------------------------- 21S-B-Q4
Q2 = BANK["21S-B-Q4"]
assert Q2["correctId"] == "d" and Q2.get("official") is True and Q2["contextId"] == "21S-B-erd"
OV2 = {o["id"]: o["value"] for o in Q2["options"]}
assert "2 לקוחות" in OV2["a"] and "כמה לקוחות" in OV2["b"] and "חייב" in OV2["c"] and "שלא הושכרו" in OV2["d"]
# the figure, read by eye: שוכר: a thick line ending in an arrow at לקוח; a plain line at בית with (1,2) next to בית
RENT = {"לקוח": {"total": True, "arrow": True}, "בית": {"total": False, "arrow": False, "label": (1, 2)}}
house_max = 1 if RENT["לקוח"]["arrow"] else None           # customers per house
house_min = 1 if RENT["בית"]["total"] else 0
VERD2 = {"a": house_max is None or house_max >= 2, "b": house_max is None, "c": house_min == 1, "d": house_min == 0}
assert [k for k, v in VERD2.items() if v] == ["d"]
assert RENT["בית"]["label"] == (1, 2)                       # each customer rents one or two houses
OPTS2 = w.bank_opts(Q2)
RINGS2 = [("rent", 1488, 924, 170), ("arr", 640, 1530, 110), ("thick", 1241, 919, 110), ("house", 1820, 935, 95),
          ("lbl", 1779, 885, 75)]
FIG2 = st.raster("y", "images/exams/21S-B-erd.png", 930, (2990, 2310), rings=RINGS2)

# ---------------------------------------------------------------- 26S-A-Q4
Q3 = BANK["26S-A-Q4"]
assert Q3["correctId"] == "a" and Q3["contextId"] == "26S-A-erd"
OV3 = {o["id"]: o["value"] for o in Q3["options"]}
assert "Pilot" in OV3["a"] and "טלפון" in OV3["b"] and "Pilot" in OV3["c"] and "Passenger" in OV3["d"]
# the figure: Commands: double line at Flight, arrow to Pilot; Booking: no arrows; phone: a double ellipse
FIG3 = {"Commands": {"Flight": {"total": True, "arrow": False}, "Pilot": {"total": False, "arrow": True}},
        "Booking": {"Flight": {"total": False, "arrow": False}, "Passenger": {"total": False, "arrow": False}},
        "phone_multi": True}
flight_pilots = (1 if FIG3["Commands"]["Flight"]["total"] else 0, 1 if FIG3["Commands"]["Pilot"]["arrow"] else None)
pilot_flights_max = 1 if FIG3["Commands"]["Flight"]["arrow"] else None
VERD3 = {"a": flight_pilots == (1, 1), "b": not FIG3["phone_multi"], "c": pilot_flights_max == 1,
         "d": FIG3["Booking"]["Passenger"]["arrow"], "e": False}     # ISA never forces both subtypes at once
assert [k for k, v in VERD3.items() if v] == ["a"]
OPTS3 = w.bank_opts(Q3)
RINGS3 = [("cmd", 290, 380, 75), ("dbl", 432, 378, 60), ("pil", 205, 255, 60), ("ph", 1153, 380, 50),
          ("bk", 782, 380, 70)]
FIG3_HTML = st.raster("x", "images/exams/26S-A-erd.png", 1060, (1222, 540), rings=RINGS3)

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("זה הסרטון של שלב הגמר: שלוש שאלות מבחן, אחת אחרי השנייה."),
    P("נספור טבלאות בתרשים גדול, ונקרא קווים כפולים וחצים בשני תרשימים מהמבחנים."),
    P("בכל שאלה נעבוד לפי הצ׳קליסט: מסמנים קודם, וקוראים את האפשרויות אחר כך.", hold=0.4),
], stage='<div class="kicker">L10 · מודל ERD</div><h1>מבחן גמר: שאלות ממבחנים</h1>'
         '<p>שאלות ברמת מבחן על תרשימים גדולים, שמשלבות את כל מה שלמדתם.</p>', layout="title")

q1 = Scene("q1", "שאלה 1: ספירת טבלאות", [
    P("שאלה ראשונה, על תרשים גדול. בתרגום היעיל ביותר, כמה טבלאות נדרשות?"),
    P("הנוסחה: ישויות, ועוד תכונות מרובות ערכים, ועוד קשרים שמקבלים טבלה."),
    P("ישויות: $A$, $B$, $C$, שני תתי הסוגים, $D$, $E$, והישות החלשה $W$. שמונה. גם תת סוג וגם ישות חלשה מקבלים טבלה.",
      do=show(*DX.hn(*ENTS), "n-p0")),
    P("תכונות מרובות ערכים: אחת, האליפסה הכפולה של $A$.", do=hide(*DX.hn(*ENTS)) + show(*DX.hn("pA"), "n-p1")),
    P("והקשרים. $R_1$, בתוך ההקבצה, בלי חצים: טבלה.", do=hide(*DX.hn("pA")) + show(*DX.hn("R1"))),
    P("$R_3$ הוא טרינארי. יש בו חץ, אבל קשר טרינארי תמיד מקבל טבלה. שתיים.", do=hide(*DX.hn("R1")) + show(*DX.hn("R3"), "n-p2")),
    P("$R_2$ יוצא מההקבצה עם חץ: הוא מתמזג לטבלה של $R_1$. ו-$R_4$ הוא קשר מזהה, בלי טבלה.",
      do=hide(*DX.hn("R3")) + show(*DX.hn("R2", "R4"))),
    P("והתכונה המקווקוות של $D$ מחושבת, ולא נשמרת. ואת משולש ה-ISA לא סופרים.",
      do=hide(*DX.hn("R2", "R4")) + show(*DX.hn("pD", "isa"))),
    P("שמונה ועוד אחת ועוד שתיים: אחת עשרה.", do=hide(*DX.hn("pD", "isa")) + show("n-tot", "a-ok-c")),
    P("מי שנותן טבלה גם ל-$R_2$ מגיע לשתים עשרה, ומי ששוכח את מרובת הערכים מגיע לעשר.",
      do=show("a-x-d", "a-n-d", "a-x-b", "a-n-b"), hold=0.4),
], stage=DX.svg(),
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q1["id"] + '</span>' + Q1["question"] + '</div></div>'
         + w.count_row("n", [("ישויות", E), ("מרובות", M), ("קשרים", R)], len(ZT))
         + '<div class="er-oxs">' + st.options("a", OPTS1, notes={"b": "שכח מרובת ערכים", "d": "טבלה ל-R2"}) + '</div>')

q2 = Scene("q2", "שאלה 2: השכרת בתים", [
    P("שאלה שנייה, ממבחן: קבלנים, בתים ולקוחות. איזו טענה נכונה ביותר? כולן על הקשר שוכר."),
    P("מסמנים. מהמעוין אל הלקוח יוצא קו עבה, שנגמר בחץ.", do=show("y-ring-rent", "y-ring-thick", "y-ring-arr")),
    P("הקו העבה בצד הלקוח: כל לקוח שוכר לפחות בית אחד. והחץ אל הלקוח: לכל בית לקוח אחד לכל היותר."),
    P("לכן שתי הטענות שבית יכול להיות מושכר על ידי שני לקוחות, או על ידי כמה, נופלות.",
      do=show("b-x-a", "b-n-a", "b-x-b", "b-n-b")),
    P("עכשיו הצד של הבית. הקו בינו לבין שוכר רגיל, ולידו כתוב אחת עד שתיים.",
      do=hide("y-ring-thick", "y-ring-arr") + show("y-ring-house", "y-ring-lbl")),
    P("הזוג ליד הבית סופר בתים: כל לקוח שוכר בית אחד או שניים. הוא לא מחייב שום דבר את הבית."),
    P("אז בית לא חייב להיות מושכר: יכולים להיות בתים שלא הושכרו. זו התשובה.", do=show("b-ok-d")),
    P("והמלכודת: הקו העבה אמיתי, אבל הוא בצד של הלקוח. הוא מחייב את הלקוח, לא את הבית.",
      do=hide("y-ring-house", "y-ring-lbl", "y-ring-rent") + show("b-x-c", "b-n-c"), hold=0.4),
], stage=FIG2,
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q2["id"] + '</span>' + Q2["question"] + '</div></div>'
         + '<div class="er-osm">' + st.options("b", OPTS2, notes={"a": "חץ ללקוח", "b": "חץ ללקוח",
                                                                   "c": "בצד הלקוח"}) + '</div>')

q3 = Scene("q3", "שאלה 3: חברת תעופה", [
    P("שאלה שלישית, על תרשים חברת התעופה. איזה מההיגדים נכון לפי התרשים?"),
    P("הקשר בין טייס לטיסה: מפקד. בצד הטיסה קו כפול: כל טיסה חייבת מפקד.", do=show("x-ring-cmd", "x-ring-dbl")),
    P("ובצד הטייס חץ: לכל טיסה טייס אחד לכל היותר. יחד: כל טיסה מפוקדת על ידי טייס **אחד בדיוק**.",
      do=show("x-ring-pil", "c-ok-a")),
    P("ההיגד שטייס מפקד על טיסה אחת בלבד הופך את הכיוון. החץ מגביל את הטיסה, לא את הטייס.",
      do=show("c-x-c", "c-n-c")),
    P("הטלפון של הנוסע מצויר באליפסה כפולה: מרובת ערכים. אז ״טלפון אחד בלבד״ נופל.",
      do=hide("x-ring-cmd", "x-ring-dbl", "x-ring-pil") + show("x-ring-ph", "c-x-b", "c-n-b")),
    P("הזמנה היא קשר בלי חצים, רבים לרבים. טיסה יכולה להיות מוזמנת על ידי הרבה נוסעים.",
      do=hide("x-ring-ph") + show("x-ring-bk", "c-x-d", "c-n-d")),
    P("ושום דבר בהיררכיה לא מחייב עובד להיות גם טייס וגם דייל בבת אחת.", do=hide("x-ring-bk") + show("c-x-e", "c-n-e")),
    P("שוב אותו צירוף: קו כפול בצד אחד, וחץ אל הצד השני. בדיוק אחד.", hold=0.4),
], stage=FIG3_HTML,
   panel='<div class="er-qsm"><div class="qstem"><span class="qid">' + Q3["id"] + '</span>' + Q3["question"] + '</div></div>'
         + '<div class="er-oxs">' + st.options("c", OPTS3, notes={"b": "מרובת ערכים", "c": "כיוון הפוך",
                                                                   "d": "N:M", "e": "לא נדרש"}) + '</div>')

recap = Scene("recap", "סיכום", [
    P("לסיכום: ספירת טבלאות היא ישויות, כולל תתי סוגים וחלשות, ועוד מרובות ערכים, ועוד קשרים שמקבלים טבלה.",
      do=show("r-1")),
    P("קשר עם חץ מתמזג, קשר מזהה לא מקבל טבלה, וקשר טרינארי תמיד טבלה.", do=show("r-2")),
    P("וזכרו: הקו הכפול מחייב את הישות שלידו, והחץ מגביל את הצד השני.", do=show("r-3")),
    P("עכשיו אתם מוכנים לשאלות האמיתיות. בהצלחה!", do=show("r-4"), hold=0.6),
], stage=w.Diagram("zr", BIG, fs=20).svg(),
   panel=st.card("r-1", "rule", "🔑 טבלאות = ישויות + מרובות ערכים + קשרים עם טבלה")
         + st.card("r-2", "rule", "🔑 חץ ← מיזוג · ◇◇ ← אין טבלה · טרינארי ← טבלה")
         + st.card("r-3", "trap", "⚠️ קו כפול מחייב את הצד שלו")
         + st.card("r-4", "ex", "מכאן: שאלות ה-ERD מהמבחנים"))

VIDEO = Video("L10", "erd", "מבחן גמר: שאלות ממבחנים", [title, q1, q2, q3, recap],
              bank={"26Z-CL-Q1": "c", "21S-B-Q4": "d", "26S-A-Q4": "a"})
