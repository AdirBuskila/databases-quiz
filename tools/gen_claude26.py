# -*- coding: utf-8 -*-
"""Generate tools/raw/PRAC-CL26.json — "המבחן הקשה של קלוד 2026".

An original practice exam (not a past paper), written in the 2024–2026 format:
4 ERD · 8 SQL · 4 relational algebra · 4 FDs/normalization. Each question takes a
pattern from a recent exam and pushes one step harder (an extra trap, a combined
concept). Answers are computed, not keyed: tools/check_claude26.js runs every SQL
option in SQLite on sample data, evaluates every algebra option with ralib and
recomputes every FD fact with fdlib.
"""
import json, pathlib

OUT = pathlib.Path(__file__).parent / "raw" / "PRAC-CL26.json"
SRC = "claude-practice"
NONE_TEXT = "אף תשובה אינה נכונה"
OTHERS_TEXT = "כל התשובות האחרות אינן נכונות"


def t(i, v): return {"id": i, "type": "text", "value": v}
def c(i, v): return {"id": i, "type": "code", "lang": "sql", "value": v}
def al(i, v): return {"id": i, "type": "algebra", "value": v}
def sc(i, v): return {"id": i, "type": "schema", "value": v}


def q(num, part, topic, question, options, correct, explanation, ctx=None, code=None):
    d = {"num": num, "part": part, "topic": topic}
    if ctx: d["contextId"] = ctx
    d["question"] = question
    if code: d["code"] = code
    d.update({"options": options, "correctId": correct, "answerSource": SRC,
              "explanation": explanation, "confidence": "high"})
    return d


ERD = {
    "w": 960, "h": 560,
    "alt": "תרשים מופשט: הקבצה A-R1-B, הקשר R2 אל C1, היררכיית C, קשר טרינארי R3, ישות חלשה W",
    "nodes": [
        {"id": "G", "t": "agg", "x": 300, "y": 120, "w": 540, "h": 200, "label": "A - R1 - B"},
        {"id": "A", "t": "entity", "x": 130, "y": 130, "label": "A"},
        {"id": "kA", "t": "attr", "x": 120, "y": 62, "label": "KeyA", "key": True, "of": "A"},
        {"id": "pA", "t": "attr", "x": 150, "y": 190, "label": "PropA_2", "multi": True, "of": "A"},
        {"id": "R1", "t": "rel", "x": 300, "y": 130, "label": "R1"},
        {"id": "pR1", "t": "attr", "x": 300, "y": 55, "label": "PropR1_1", "of": "R1"},
        {"id": "B", "t": "entity", "x": 470, "y": 130, "label": "B"},
        {"id": "kB", "t": "attr", "x": 480, "y": 55, "label": "KeyB", "key": True, "of": "B"},
        {"id": "R2", "t": "rel", "x": 300, "y": 300, "label": "R2"},
        {"id": "C", "t": "entity", "x": 720, "y": 110, "label": "C"},
        {"id": "kC", "t": "attr", "x": 720, "y": 40, "label": "KeyC", "key": True, "of": "C"},
        {"id": "pC", "t": "attr", "x": 840, "y": 110, "label": "PropC_1", "of": "C"},
        {"id": "isa", "t": "isa", "x": 720, "y": 190},
        {"id": "C1", "t": "entity", "x": 600, "y": 300, "label": "C1"},
        {"id": "pC1", "t": "attr", "x": 600, "y": 375, "label": "PropC1_1", "of": "C1"},
        {"id": "C2", "t": "entity", "x": 820, "y": 300, "label": "C2"},
        {"id": "pC2", "t": "attr", "x": 900, "y": 230, "label": "PropC2_1", "of": "C2"},
        {"id": "R3", "t": "rel", "x": 760, "y": 420, "label": "R3"},
        {"id": "D", "t": "entity", "x": 900, "y": 440, "label": "D"},
        {"id": "kD", "t": "attr", "x": 900, "y": 370, "label": "KeyD", "key": True, "of": "D"},
        {"id": "pD", "t": "attr", "x": 900, "y": 515, "label": "PropD_1", "derived": True, "of": "D"},
        {"id": "W", "t": "entity", "x": 620, "y": 440, "label": "W", "weak": True},
        {"id": "dW", "t": "attr", "x": 560, "y": 515, "label": "DiscW_1", "partial": True, "of": "W"},
        {"id": "pW", "t": "attr", "x": 680, "y": 515, "label": "PropW_1", "of": "W"},
        {"id": "R4", "t": "rel", "x": 450, "y": 440, "label": "R4", "ident": True},
        {"id": "E", "t": "entity", "x": 280, "y": 440, "label": "E"},
        {"id": "kE", "t": "attr", "x": 280, "y": 370, "label": "KeyE", "key": True, "of": "E"},
        {"id": "pE", "t": "attr", "x": 280, "y": 515, "label": "PropE_1", "of": "E"},
    ],
    "edges": [
        {"a": "R1", "b": "A"}, {"a": "R1", "b": "B"},
        {"a": "R2", "b": "G", "total": True}, {"a": "R2", "b": "C1", "arrow": True},
        {"a": "isa", "b": "C"}, {"a": "isa", "b": "C1"}, {"a": "isa", "b": "C2"},
        {"a": "R3", "b": "C2"}, {"a": "R3", "b": "D", "arrow": True}, {"a": "R3", "b": "W"},
        {"a": "R4", "b": "E", "arrow": True}, {"a": "R4", "b": "W", "total": True},
    ],
}

contexts = {
    "erd": {
        "kind": "erd",
        "title": "חלק א׳ — ERD",
        "intro": "התייחסו לתרשים ה-ERD הנתון וענו על השאלות. הניחו שבתרגום משתמשים בשיטה הסטנדרטית של הקורס (טבלה לכל תת-סוג עם המפתח היורש), ושאר הקשרים מתורגמים בתרגום היעיל ביותר.",
        "erd": ERD,
    },
    "sql": {
        "kind": "schema",
        "title": "חלק ב׳ — SQL: חברת תעופה",
        "intro": "נתונות תבניות היחסים הבאות של חברת תעופה. קו תחתון מסמן מפתח ראשי.",
        "relations": [
            {"schema": "Passengers([u]passenger_id[/u], name, country, birth_year)",
             "meaning": "נוסע — מזהה, שם, מדינה ושנת לידה."},
            {"schema": "Flights([u]flight_id[/u], origin, destination, flight_date, price)",
             "meaning": "טיסה — מזהה, שדה מוצא (למשל `'TLV'`), יעד (למשל `'Rome'`), תאריך ומחיר בסיס."},
            {"schema": "Bookings([u]passenger_id[/u], [u]flight_id[/u], seat_class, paid)",
             "meaning": "הזמנה — נוסע הזמין מקום בטיסה. מחלקה (`'Economy'` / `'Business'`) והסכום ששולם בפועל (`paid`). נוסע מזמין טיסה מסוימת פעם אחת לכל היותר."},
            {"schema": "Pilots([u]pilot_id[/u], name, hire_year)",
             "meaning": "טייס — מזהה, שם ושנת קליטה."},
            {"schema": "Assignments([u]pilot_id[/u], [u]flight_id[/u])",
             "meaning": "שיבוץ — טייס שובץ לטיסה (בטיסה יכולים להיות כמה טייסים)."},
        ],
    },
    "ra": {
        "kind": "schema",
        "title": "חלק ג׳ — אלגברת היחסים: שירות סטרימינג למוזיקה",
        "intro": "נתונות סכמות היחסים הבאות. ניתן להניח שאין ערכים ריקים (Null).",
        "relations": [
            {"schema": "listener([u]listener_id[/u], name, country, age)",
             "meaning": "מאזין: מזהה, שם, מדינה וגיל."},
            {"schema": "artist([u]artist_id[/u], name, country)",
             "meaning": "אמן: מזהה, שם ומדינת מוצא."},
            {"schema": "album([u]album_id[/u], title, artist_id, genre)",
             "meaning": "אלבום: מזהה, שם, מזהה האמן וז׳אנר (למשל `\"Jazz\"`)."},
            {"schema": "plays([u]listener_id[/u], [u]album_id[/u])",
             "meaning": "האזנה: המאזין האזין לאלבום (לפחות פעם אחת)."},
        ],
    },
    "q16": {
        "kind": "relations",
        "title": "שני יחסים R, S",
        "tables": [
            {"name": "R", "columns": ["A", "B", "C"],
             "rows": [["1", "x", "10"], ["2", "y", "20"], ["3", "x", "10"], ["4", "z", "30"]]},
            {"name": "S", "columns": ["B", "C", "D"],
             "rows": [["x", "10", "5"], ["x", "12", "5"], ["x", "10", "6"],
                      ["y", "20", "7"], ["y", "25", "8"], ["w", "30", "9"]]},
        ],
    },
    "fd": {
        "kind": "fd",
        "title": "חלק ד׳ — יחס ותלויות",
        "algebra": ["R = (A, B, C, D, E)", "F1 = {AB → C, C → D, D → A, BD → E}"],
    },
}

questions = [
    # ---------------- חלק א׳ — ERD ----------------
    q(1, "א", "erd",
      "בתרגום היעיל ביותר, כמה טבלאות נדרשות לכל התרשים?",
      [t("a", "9"), t("b", "10"), t("c", "11"), t("d", "12"), t("e", "13")],
      "c",
      "**ישויות:** A, B, C, C1, C2, D, E, W, כלומר 8 (תת-סוגים וישות חלשה מקבלים טבלה). "
      "**מרובות-ערכים:** PropA_2, כלומר 1. **R1:** קשר N:M, כלומר 1. **R3:** קשר טרינארי, שתמיד מקבל טבלה (גם עם חץ), כלומר 1. סה״כ **11**.\n"
      "לא סופרים: R2 (חץ אל C1, ולכן הוא מתמזג לטבלת R1, שהיא הטבלה של ההקבצה), R4 (קשר מזהה), PropD_1 (מחושבת) ואת משולש ה-ISA. "
      "מי שסופר את R2 מגיע ל-12, ומי ששוכח את PropA_2 מגיע ל-10.",
      ctx="erd"),
    q(2, "א", "erd",
      "מה יהיה המפתח הראשי של הטבלה של `R3`?",
      [t("a", "{KeyC, KeyD, KeyE, DiscW_1}"),
       t("b", "{KeyC, DiscW_1}"),
       t("c", "{KeyC, KeyE, DiscW_1}"),
       t("d", "{KeyC2, KeyE, DiscW_1}"),
       t("e", "ל-R3 אין טבלה: בגלל החץ הוא מתמזג לטבלה של D")],
      "c",
      "בקשר טרינארי, חץ אל D אומר שלכל צירוף (C2, W) יש D אחד לכל היותר, ולכן KeyD יוצא מהמפתח ונשאר עמודה רגילה. "
      "המפתח = מפתח C2 + מפתח W. ל-C2 אין מפתח משלו, והוא **יורש את KeyC**. ‏W היא ישות חלשה, והמפתח שלה הוא **DiscW_1 + KeyE** (מפתח הבעלים דרך R4). "
      "לכן {KeyC, KeyE, DiscW_1}. מי שלוקח רק את DiscW_1 שוכח שמפתח של ישות חלשה כולל את מפתח הבעלים. "
      "קשר טרינארי לא מתמזג לישות גם כשיש בו חץ.",
      ctx="erd"),
    q(3, "א", "erd",
      "לפי התרשים, איזו מהטענות הבאות נכונה לגבי הקשר `R2`?",
      [t("a", "כל מופע של C1 חייב להיות קשור דרך R2 לזוג (A, B) אחד לפחות"),
       t("b", "כל זוג (A, B) שמופיע ב-R1 קשור דרך R2 ל-C1 אחד בדיוק, ו-C1 יכול להיות קשור לכמה זוגות או לאף זוג"),
       t("c", "זוג (A, B) שמופיע ב-R1 יכול להיות קשור דרך R2 לכמה מופעים שונים של C1"),
       t("d", "כל מופע של C1 קשור לזוג (A, B) אחד לכל היותר"),
       t("e", OTHERS_TEXT)],
      "b",
      "קוראים כל קו בנפרד. **קו כפול בצד ההקבצה:** כל מופע של R1, כלומר כל זוג (A, B), חייב להשתתף ב-R2 (לפחות אחד). "
      "**חץ אל C1:** כל זוג קשור ל-C1 אחד לכל היותר. יחד: **בדיוק אחד**. "
      "בצד של C1 הקו רגיל ואין חץ שמכוון אל ההקבצה, ולכן C1 יכול להיות קשור לכמה זוגות או לאף זוג. "
      "בתרגום זה בדיוק מה שאוכפים: KeyC נכנס לטבלת R1 כמפתח זר מוגדר NOT NULL.",
      ctx="erd"),
    q(4, "א", "erd",
      "בתרגום היעיל ביותר, איזו סכמה תתקבל עבור הטבלה של `R1`?",
      [sc("a", "R1 ([u]KeyA[/u], [u]KeyB[/u], PropR1_1)"),
       sc("b", "R1 ([u]KeyA[/u], [u]KeyB[/u], [u]KeyC[/u], PropR1_1)"),
       sc("c", "R1 ([u]KeyA[/u], [u]KeyB[/u], PropR1_1, KeyC)"),
       sc("d", "R1 ([u]KeyA[/u], [u]KeyB[/u], PropR1_1, PropA_2, KeyC)"),
       t("e", OTHERS_TEXT)],
      "c",
      "‏R1 הוא N:M, ולכן המפתח שלו הוא {KeyA, KeyB}, ותכונת הקשר PropR1_1 נכנסת לטבלה. "
      "‏R2 יוצא מההקבצה עם חץ אל C1, כלומר כל זוג קשור ל-C1 אחד לכל היותר. לכן R2 **מתמזג לטבלת R1** (הטבלה של ההקבצה) ו-KeyC נכנס כמפתח זר, "
      "**מחוץ למפתח** (עם NOT NULL, בגלל הקו הכפול). "
      "אם KeyC נכנס למפתח, החץ הולך לאיבוד. סכמה בלי KeyC מחייבת טבלה נפרדת ל-R2, וזה לא התרגום היעיל ביותר. "
      "‏PropA_2 מרובת-ערכים, ולכן יוצאת לטבלה משלה ולא נכנסת ל-R1.",
      ctx="erd"),

    # ---------------- חלק ב׳ — SQL ----------------
    q(5, "ב", "sql",
      "איזו שאילתה מחזירה את שמות הנוסעים שהזמינו לפחות טיסה אחת ליעד `'Rome'`, ו**מעולם לא** הזמינו מקום במחלקת `'Business'` (באף טיסה)?",
      [c("a", "SELECT DISTINCT P.name\nFROM Passengers P JOIN Bookings B ON P.passenger_id = B.passenger_id\n  JOIN Flights F ON B.flight_id = F.flight_id\nWHERE F.destination = 'Rome' AND B.seat_class <> 'Business'"),
       c("b", "SELECT DISTINCT P.name\nFROM Passengers P JOIN Bookings B ON P.passenger_id = B.passenger_id\n  JOIN Flights F ON B.flight_id = F.flight_id\nWHERE F.destination = 'Rome'\n  AND P.passenger_id NOT IN (SELECT passenger_id FROM Bookings\n                             WHERE seat_class = 'Business')"),
       c("c", "SELECT DISTINCT P.name\nFROM Passengers P JOIN Bookings B ON P.passenger_id = B.passenger_id\n  JOIN Flights F ON B.flight_id = F.flight_id\nWHERE F.destination = 'Rome'\n  AND P.passenger_id NOT IN (SELECT B2.passenger_id\n      FROM Bookings B2 JOIN Flights F2 ON B2.flight_id = F2.flight_id\n      WHERE F2.destination = 'Rome' AND B2.seat_class = 'Business')"),
       c("d", "SELECT DISTINCT P.name\nFROM Passengers P JOIN Bookings B ON P.passenger_id = B.passenger_id\n  JOIN Flights F ON B.flight_id = F.flight_id\nWHERE F.destination = 'Rome'\n  AND B.passenger_id NOT IN (SELECT flight_id FROM Bookings\n                             WHERE seat_class = 'Business')"),
       t("e", NONE_TEXT)],
      "b",
      "\"מעולם לא\" זו שלילה על **כל** ההזמנות של הנוסע, ולכן `NOT IN` על תת-שאילתה שמוצאת את כל מי שהזמין Business אי-פעם. "
      "התנאי `seat_class <> 'Business'` בודק רק את השורה הנוכחית: נוסע שטס לרומא באקונומי ובמקום אחר בביזנס עדיין נכנס. "
      "תת-שאילתה שמסוננת ל-Rome פוסלת רק ביזנס **לרומא**, ולא ביזנס בטיסה אחרת. "
      "ההשוואה של `passenger_id` מול `flight_id` משווה עמודות שאינן מאותו תחום.",
      ctx="sql"),
    q(6, "ב", "sql",
      "מה מחזירה השאילתה הבאה? בחרו את התשובה הנכונה ביותר.",
      [t("a", "את שמות הנוסעים שהזמינו לפחות טיסה אחת לרומא"),
       t("b", "את שמות הנוסעים שכל ההזמנות שלהם הן לרומא"),
       t("c", "את שמות הנוסעים שהזמינו את **כל** הטיסות שהיעד שלהן רומא"),
       t("d", "את שמות הנוסעים שמספר ההזמנות הכולל שלהם שווה למספר הטיסות לרומא"),
       t("e", "השאילתה אינה תקינה, כי `P.name` מופיע ב-SELECT")],
      "c",
      "זה **חילוק בעזרת ספירה**. ה-WHERE משאיר רק הזמנות לרומא, ה-GROUP BY סופר לכל נוסע כמה טיסות לרומא הזמין, "
      "וה-HAVING דורש שהמספר יהיה שווה למספר כל הטיסות לרומא. מכיוון שנוסע מזמין טיסה פעם אחת לכל היותר (המפתח של Bookings), "
      "ספירה שווה = הזמין את כולן. "
      "הספירה נעשית **אחרי** הסינון לרומא, ולכן היא לא סופרת את סך ההזמנות. "
      "נוסע שכל הזמנותיו לרומא אבל לא הזמין את כל הטיסות לרומא לא יוחזר. "
      "‏`P.name` מופיע ב-GROUP BY, ולכן מותר לבחור אותו.",
      ctx="sql",
      code="SELECT P.name\nFROM Passengers P JOIN Bookings B ON P.passenger_id = B.passenger_id\n  JOIN Flights F ON B.flight_id = F.flight_id\nWHERE F.destination = 'Rome'\nGROUP BY P.passenger_id, P.name\nHAVING COUNT(*) = (SELECT COUNT(*) FROM Flights\n                   WHERE destination = 'Rome')"),
    q(7, "ב", "sql",
      "איזו שאילתה מחזירה, **לכל יעד**, את הטיסה (או הטיסות) היקרה ביותר לאותו יעד?",
      [c("a", "SELECT flight_id, destination, price FROM Flights\nWHERE price IN (SELECT MAX(price) FROM Flights GROUP BY destination)"),
       c("b", "SELECT flight_id, destination, price FROM Flights F1\nWHERE price = (SELECT MAX(price) FROM Flights F2\n               WHERE F2.destination = F1.destination)"),
       c("c", "SELECT flight_id, destination, MAX(price) FROM Flights\nGROUP BY destination"),
       c("d", "SELECT flight_id, destination, price FROM Flights\nWHERE price >= ALL (SELECT price FROM Flights)"),
       t("e", NONE_TEXT)],
      "b",
      "צריך להשוות כל טיסה **למקסימום של היעד שלה**, ולכן תת-שאילתה **מתואמת** (`F2.destination = F1.destination`). "
      "‏`IN` על רשימת המקסימומים של כל היעדים מחזיר גם טיסה שמחירה שווה למקסימום של יעד **אחר**. "
      "דוגמה: טיסה לרומא ב-450, כשהמקסימום לרומא 520 אבל המקסימום ל-TLV הוא 450. "
      "‏GROUP BY destination עם `flight_id` ב-SELECT אינה תקינה, כי `flight_id` אינו בקבוצה ואינו בצבירה. "
      "‏`>= ALL` מול כל הטבלה מחזיר רק את הטיסה היקרה ביותר בכלל, ולא אחת לכל יעד.",
      ctx="sql"),
    q(8, "ב", "sql",
      "איזו שאילתה מחזירה **לכל טייס**, כולל טייסים שלא שובצו לאף טיסה, את שמו ואת מספר הטיסות שאליהן שובץ?",
      [c("a", "SELECT P.name, COUNT(*)\nFROM Pilots P LEFT JOIN Assignments A ON P.pilot_id = A.pilot_id\nGROUP BY P.pilot_id, P.name"),
       c("b", "SELECT P.name, COUNT(A.flight_id)\nFROM Pilots P JOIN Assignments A ON P.pilot_id = A.pilot_id\nGROUP BY P.pilot_id, P.name"),
       c("c", "SELECT P.name, COUNT(A.flight_id)\nFROM Assignments A LEFT JOIN Pilots P ON P.pilot_id = A.pilot_id\nGROUP BY P.pilot_id, P.name"),
       c("d", "SELECT P.name, COUNT(A.flight_id)\nFROM Pilots P LEFT JOIN Assignments A ON P.pilot_id = A.pilot_id\nGROUP BY P.pilot_id, P.name"),
       t("e", NONE_TEXT)],
      "d",
      "כדי שטייס בלי שיבוצים יופיע צריך `LEFT JOIN` **מ-Pilots**. אז הוא מקבל שורה אחת שבה עמודות Assignments הן NULL. "
      "‏`COUNT(A.flight_id)` לא סופר NULL, ולכן הוא נותן 0. ‏`COUNT(*)` סופר את השורה עצמה ונותן 1, וזו טעות. "
      "‏JOIN רגיל מעלים את הטייסים בלי שיבוצים. ‏LEFT JOIN בכיוון ההפוך (מ-Assignments) שומר את כל השיבוצים ולא את כל הטייסים, ולכן גם הוא מעלים אותם.",
      ctx="sql"),
    q(9, "ב", "sql",
      "איזו פקודה יוצרת VIEW שמציג לכל נוסע את המזהה שלו ואת הסכום הכולל ששילם, **רק** עבור נוסעים שהסכום הכולל שלהם גבוה מ-2000?",
      [c("a", "CREATE VIEW BigSpenders AS\nSELECT passenger_id, SUM(paid) AS total\nFROM Bookings\nGROUP BY passenger_id\nHAVING SUM(paid) > 2000"),
       c("b", "CREATE VIEW BigSpenders AS\nSELECT passenger_id, SUM(paid) AS total\nFROM Bookings\nWHERE paid > 2000\nGROUP BY passenger_id"),
       c("c", "CREATE VIEW BigSpenders AS\nSELECT passenger_id, SUM(paid) AS total\nFROM Bookings\nWHERE SUM(paid) > 2000\nGROUP BY passenger_id"),
       c("d", "CREATE VIEW BigSpenders AS\nSELECT passenger_id, SUM(paid) AS total\nFROM Bookings\nHAVING SUM(paid) > 2000\nGROUP BY passenger_id"),
       t("e", NONE_TEXT)],
      "a",
      "תנאי על **סכום הקבוצה** שייך ל-`HAVING`, שבא **אחרי** `GROUP BY`. "
      "‏`WHERE paid > 2000` מסנן הזמנות בודדות לפני הקיבוץ: נוסע ששילם 1800 + 450 לא ייכנס, ונוסע שיישאר יקבל סכום חלקי. "
      "פונקציית צבירה ב-WHERE אסורה. ‏HAVING לפני GROUP BY היא שגיאת תחביר (הסדר הוא WHERE ← GROUP BY ← HAVING).",
      ctx="sql"),
    q(10, "ב", "sql",
      "מי הטייסים ששובצו ל**כל** הטיסות שיוצאות מ-`'TLV'`? עיינו בשלוש ההצעות וקבעו מה נכון.",
      [t("a", "רק השאילתה A נכונה"),
       t("b", "רק השאילתה C נכונה"),
       t("c", "השאילתות A ו-C נכונות, ו-B שגויה"),
       t("d", "כל שלוש השאילתות נכונות"),
       t("e", NONE_TEXT)],
      "c",
      "‏A היא החילוק הקלאסי: \"לא קיימת טיסה מ-TLV שאין שיבוץ **של הטייס הזה** אליה\". "
      "‏C עושה את אותו הדבר בעזרת הפרש: (כל הטיסות מ-TLV) EXCEPT (הטיסות של הטייס). אם לא נשאר כלום, הטייס שובץ לכולן. "
      "ב-B תת-השאילתה הפנימית **לא מקושרת לטייס** (אין `A.pilot_id = P.pilot_id`). היא בודקת רק שלכל טיסה יש טייס כלשהו, "
      "ולכן מחזירה את כל הטייסים או אף אחד.",
      ctx="sql",
      code="(A) SELECT name FROM Pilots P WHERE NOT EXISTS\n      (SELECT * FROM Flights F WHERE F.origin = 'TLV' AND NOT EXISTS\n         (SELECT * FROM Assignments A\n          WHERE A.flight_id = F.flight_id AND A.pilot_id = P.pilot_id))\n\n"
           "(B) SELECT name FROM Pilots P WHERE NOT EXISTS\n      (SELECT * FROM Flights F WHERE F.origin = 'TLV' AND NOT EXISTS\n         (SELECT * FROM Assignments A WHERE A.flight_id = F.flight_id))\n\n"
           "(C) SELECT name FROM Pilots P WHERE NOT EXISTS\n      (SELECT flight_id FROM Flights WHERE origin = 'TLV'\n       EXCEPT\n       SELECT flight_id FROM Assignments A WHERE A.pilot_id = P.pilot_id)"),
    q(11, "ב", "sql",
      "איזו שאילתה מחזירה את המזהים של הנוסעים שטסו (הזמינו טיסות) עם לפחות **3 טייסים שונים**?",
      [c("a", "SELECT B.passenger_id\nFROM Bookings B JOIN Assignments A ON B.flight_id = A.flight_id\nGROUP BY B.passenger_id\nHAVING COUNT(*) >= 3"),
       c("b", "SELECT B.passenger_id\nFROM Bookings B JOIN Assignments A ON B.flight_id = A.flight_id\nGROUP BY B.passenger_id\nHAVING COUNT(DISTINCT B.flight_id) >= 3"),
       c("c", "SELECT B.passenger_id\nFROM Bookings B JOIN Assignments A ON B.flight_id = A.flight_id\nGROUP BY B.passenger_id\nHAVING COUNT(DISTINCT A.pilot_id) >= 3"),
       c("d", "SELECT B.passenger_id\nFROM Bookings B JOIN Assignments A ON B.flight_id = A.flight_id\nWHERE COUNT(DISTINCT A.pilot_id) >= 3\nGROUP BY B.passenger_id"),
       t("e", NONE_TEXT)],
      "c",
      "אחרי הצירוף יש שורה לכל (הזמנה, טייס בטיסה). סופרים **טייסים שונים**, ולכן `COUNT(DISTINCT A.pilot_id)`. "
      "‏`COUNT(*)` סופר שורות: אותו טייס בשתי טיסות ייספר פעמיים, וגם נוסע עם 2 טיסות של 2 טייסים כל אחת יגיע ל-4. "
      "ספירת טיסות שונות בודקת שלוש טיסות, אבל כולן יכולות להיות עם אותו טייס. "
      "צבירה ב-WHERE אסורה.",
      ctx="sql"),
    q(12, "ב", "sql",
      "איזו שאילתה מחזירה את **המחיר השני בגובהו** בטבלה `Flights`, כלומר את המחיר הגבוה ביותר שקטן מהמחיר המקסימלי?",
      [c("a", "SELECT MAX(price) FROM Flights\nWHERE price <> MAX(price)"),
       c("b", "SELECT MAX(price) FROM Flights\nWHERE price < ALL (SELECT price FROM Flights)"),
       c("c", "SELECT MAX(price) FROM Flights\nWHERE price NOT IN (SELECT MAX(price) FROM Flights\n                    GROUP BY destination)"),
       c("d", "SELECT MAX(price) FROM Flights\nWHERE price < (SELECT MAX(price) FROM Flights)"),
       t("e", NONE_TEXT)],
      "d",
      "מסירים את המקסימום בעזרת תת-שאילתה סקלרית (`price < (SELECT MAX…)`), ואז לוקחים את המקסימום של מה שנשאר. "
      "‏`MAX` ב-WHERE אסור. ‏`< ALL` דורש מחיר שקטן מכל המחירים, כולל מעצמו, ולכן אין כזה ומתקבל NULL. "
      "‏`NOT IN` של המקסימום **לכל יעד** מוריד מחירים רבים מדי (כל מקסימום של כל יעד), ולכן מתקבל מחיר נמוך מהנדרש.",
      ctx="sql"),

    # ---------------- חלק ג׳ — אלגברת היחסים ----------------
    q(13, "ג", "relalg",
      "מה מחזירה השאילתה הבאה? בחרו את התשובה הנכונה ביותר.\n$$Π_{name}(listener ⊗ artist)$$",
      [t("a", "את שמות המאזינים שגרים במדינה שיש בה לפחות אמן אחד"),
       t("b", "את השמות של מאזינים שיש אמן **עם אותו שם ומאותה מדינה** כמוהם"),
       t("c", "את שמות כל המאזינים ואת שמות כל האמנים (איחוד)"),
       t("d", "את שמות כל המאזינים, כי ליחסים אין מפתח משותף והצירוף הוא מכפלה קרטזית"),
       t("e", "השאילתה אינה תקינה, כי לשני היחסים יש תכונה בשם `name`")],
      "b",
      "צירוף טבעי משווה את **כל** התכונות בעלות שם משותף. ל-listener ול-artist יש שתיים כאלה: `name` **וגם** `country`. "
      "לכן נשארים רק זוגות (מאזין, אמן) עם אותו שם ואותה מדינה, ומהם מוקרן השם. "
      "מי שמשווה רק לפי country מקבל את האפשרות של \"גרים באותה מדינה\". "
      "המפתחות (`listener_id`, `artist_id`) שונים בשמם ולא משתתפים בצירוף. תכונה משותפת היא בדיוק מה שהצירוף הטבעי משתמש בו, ולא שגיאה.",
      ctx="ra"),
    q(14, "ג", "relalg",
      "איזו שאילתה מחזירה את המזהים של **המאזין המבוגר ביותר בכל מדינה** (מאזין שאין מאזין מבוגר ממנו באותה מדינה)?",
      [al("a", "Π_{listener_id}(listener) − Π_{L1.listener_id}(σ_{L1.age < L2.age}(ρ_{L1}(listener) × ρ_{L2}(listener)))"),
       al("b", "Π_{L1.listener_id}(σ_{L1.country = L2.country ∧ L1.age > L2.age}(ρ_{L1}(listener) × ρ_{L2}(listener)))"),
       al("c", "Π_{listener_id}(listener) − Π_{L1.listener_id}(σ_{L1.country = L2.country ∧ L1.age > L2.age}(ρ_{L1}(listener) × ρ_{L2}(listener)))"),
       al("d", "Π_{listener_id}(listener) − Π_{L1.listener_id}(σ_{L1.country = L2.country ∧ L1.age < L2.age}(ρ_{L1}(listener) × ρ_{L2}(listener)))"),
       t("e", "אף אחת מהאפשרויות.")],
      "d",
      "התבנית של מקסימום: **כולם פחות מי שיש מישהו גדול ממנו**. "
      "‏`L1.age < L2.age` עם `L1.country = L2.country` מוצא כל מאזין שיש מאזין מבוגר ממנו **באותה מדינה**. מחסירים אותם מכולם ונשאר המבוגר ביותר בכל מדינה. "
      "מאזין יחיד במדינתו נשאר, כי אין לו עם מי להשוות. "
      "בלי תנאי המדינה מתקבל רק המבוגר ביותר בכלל. "
      "עם `>` בהפרש מתקבל הצעיר ביותר בכל מדינה. "
      "בלי הפרש בכלל, `>` מחזיר כל מי שמבוגר ממישהו במדינתו, כלומר כל מי שאינו הצעיר ביותר.",
      ctx="ra"),
    q(15, "ג", "relalg",
      "איזו שאילתה מחזירה את המזהים של המאזינים שהאזינו ל**כל** האלבומים מז׳אנר `\"Jazz\"`?",
      [al("a", "plays ÷ Π_{album_id}(σ_{genre = \"Jazz\"}(album))"),
       al("b", "Π_{listener_id}(plays ⊗ σ_{genre = \"Jazz\"}(album))"),
       al("c", "Π_{listener_id}(plays) − Π_{listener_id}((Π_{listener_id}(plays) × Π_{album_id}(σ_{genre = \"Jazz\"}(album))) − plays)"),
       al("d", "Π_{listener_id}(plays) − Π_{listener_id}(σ_{genre ≠ \"Jazz\"}(plays ⊗ album))"),
       t("e", "תשובות {opt:a} ו-{opt:c} נכונות.")],
      "e",
      "\"כל\" = **חילוק**. ‏plays(listener_id, album_id) ÷ (מזהי אלבומי הג׳אז) מחזיר מאזינים שמופיעים עם **כל** אלבומי הג׳אז. "
      "השאילתה הארוכה היא **הגדרת החילוק** בפעולות בסיסיות: (כל מאזין × כל אלבום ג׳אז) פחות מה שקרה באמת נותן את הזוגות החסרים. "
      "מאזין שחסר לו אלבום ג׳אז כלשהו מוחסר מכל המאזינים. לכן שתיהן נכונות. "
      "הצירוף עם אלבומי ג׳אז מחזיר מי שהאזין לאלבום ג׳אז **אחד לפחות**. "
      "ההפרש עם `genre ≠ \"Jazz\"` מחזיר מי שהאזין **רק** לג׳אז, ולא בהכרח לכל אלבומי הג׳אז.",
      ctx="ra"),
    q(16, "ג", "relalg",
      "נתונים היחסים R ו-S (ראו טבלאות) ונתונה השאילתה:\n$$σ_{D < 7}(Π_{A,B}(R) ⊗ Π_{B,D}(S))$$\nכמה שורות וכמה עמודות תכיל תוצאת השאילתה? (`⊗` — צירוף טבעי)",
      [t("a", "שש שורות ושלוש עמודות."),
       t("b", "ארבע שורות וארבע עמודות."),
       t("c", "ארבע שורות ושלוש עמודות."),
       t("d", "שתי שורות ושלוש עמודות."),
       t("e", "חמש שורות ושלוש עמודות.")],
      "c",
      "‏$Π_{B,D}(S)$ הוא **קבוצה**: השורות (x, 10, 5) ו-(x, 12, 5) הופכות לזוג אחד (x, 5). נשארים (x,5), (x,6), (y,7), (y,8), (w,9). "
      "‏$Π_{A,B}(R)$ = (1,x), (2,y), (3,x), (4,z). אחרי ההטלות התכונה המשותפת היחידה היא **B** (‏C כבר לא קיימת). "
      "הצירוף: A=1 ו-A=3 עם (x,5), (x,6) ‏←‏ 4 שורות, ו-A=2 עם (y,7), (y,8) ‏←‏ 2 שורות. ‏$σ_{D<7}$ משאיר את 4 השורות של x. "
      "התוצאה היא **4 שורות ו-3 עמודות (A, B, D)**. מי שלא מוחק כפילויות מקבל 6 שורות. מי שמצרף גם לפי C מקבל 2.",
      ctx="q16"),

    # ---------------- חלק ד׳ — תלויות פונקציונליות ----------------
    q(17, "ד", "fd_norm",
      "מהם **כל** המפתחות הקבילים (candidate keys) של R בהינתן F1?",
      [t("a", "{A, B} בלבד"),
       t("b", "{A, B} ו-{B, D} בלבד"),
       t("c", "{A, B}, ‏{B, C} ו-{B, D}"),
       t("d", "{A, B}, ‏{B, C} ו-{C, D}"),
       t("e", "{A, B}, ‏{B, C}, ‏{B, D} ו-{B, E}")],
      "c",
      "‏B לא מופיע באף צד ימין, ולכן הוא חייב להיות בכל מפתח, אבל B⁺ = {B} לבדו. בודקים את B עם כל תכונה: "
      "‏{A,B}⁺: ‏AB → C, ‏C → D, ‏BD → E, כלומר הכול. ‏{B,C}⁺: ‏C → D, ‏D → A, ואז AB → C ו-BD → E, כלומר הכול. "
      "‏{B,D}⁺: ‏D → A, ‏AB → C, ‏BD → E, כלומר הכול. ‏{B,E}⁺ = {B, E}. "
      "שלושתם מינימליים, כי אף תכונה לבדה אינה מפתח. ‏{C,D} אינו מפתח, כי אין בו B.",
      ctx="fd"),
    q(18, "ד", "fd_norm",
      "איזו מהטענות הבאות נכונה לגבי R עם F1?",
      [t("a", "‏R נמצאת ב-BCNF"),
       t("b", "‏R לא נמצאת ב-3NF, בגלל התלות C → D"),
       t("c", "‏R לא נמצאת ב-2NF, בגלל התלות D → A (‏D הוא חלק מהמפתח BD)"),
       t("d", "‏R לא נמצאת ב-BCNF, אבל נמצאת ב-3NF"),
       t("e", OTHERS_TEXT)],
      "d",
      "המפתחות הם AB, ‏BC ו-BD, ולכן התכונות הראשיות הן **A, B, C, D**. ‏E היא היחידה שאינה ראשית. "
      "**BCNF:** ‏C → D ו-D → A הן תלויות שהצד השמאלי שלהן אינו על-מפתח, ולכן R אינה ב-BCNF. "
      "**3NF:** בשתיהן צד ימין (‏D, ‏A) הוא תכונה **ראשית**, ולכן הן מותרות. ‏AB → C ו-BD → E הן על מפתח. לכן R ב-3NF. "
      "גם 2NF מתקיימת: תלות חלקית פוסלת 2NF רק כשהיא קובעת תכונה **לא ראשית**, ו-A ראשית.",
      ctx="fd"),
    q(19, "ד", "fd_norm",
      "נתונה הסכמה $R = (A, B, C, D, E)$ וקבוצת התלויות $F = \\{A → B, B → C, C → A, D → E\\}$. "
      "כמו כן נתון הפירוק `R1(A, B)`, `R2(B, C)`, `R3(C, D, E)`. יש לבחור את הטענה הנכונה מבין הבאות:",
      [t("a", "הפירוק משמר מידע, אך אינו משמר תלויות, כי התלות C → A אובדת"),
       t("b", "הפירוק משמר מידע ומשמר תלויות, אך לא כל היחסים בפירוק נמצאים ב-3NF"),
       t("c", "הפירוק משמר מידע ומשמר תלויות, וכל היחסים בפירוק נמצאים ב-BCNF"),
       t("d", "הפירוק אינו משמר מידע"),
       t("e", "הפירוק אינו משמר מידע ואינו משמר תלויות")],
      "b",
      "**משמר מידע:** ‏R1 ⋈ R2 על B, ו-B → C, ולכן B מפתח של R2 והצירוף בלי אובדן, ומתקבל (A,B,C). את זה מצרפים עם R3 על C, ו-C → A → B, ולכן C מפתח של (A,B,C). "
      "**משמר תלויות:** ‏A → B ב-R1, ‏B → C ב-R2, ‏D → E ב-R3. ‏C → A לא נמצאת באף יחס, אבל **נגזרת**: בודקים את C⁺ על פני הרכיבים. "
      "ב-R2 נקבל C → B, וב-R1 נקבל B → A. לכן היא נשמרת. "
      "**צורה נורמלית:** ב-R3(C,D,E) המפתח הוא CD, והתלות D → E היא תלות חלקית של תכונה לא ראשית. לכן R3 אינו אפילו ב-2NF, והטענה שכל היחסים ב-BCNF נופלת.",
      ),
    q(20, "ד", "fd_norm",
      "נתונה קבוצת התלויות $F = \\{A → BC, B → C, AB → D, CD → E\\}$. מהו הכיסוי הקנוני (canonical cover) של F?",
      [al("a", "{A → BCD, B → C, CD → E}"),
       al("b", "{A → B, B → C, CD → E}"),
       al("c", "{A → BD, B → C, D → E}"),
       al("d", "{A → D, B → C, CD → E}"),
       al("e", "{A → BD, B → C, CD → E}")],
      "e",
      "מחפשים תכונות עודפות. ב-**AB → D** התכונה **B עודפת**, כי A⁺ מכיל את B ‏(A → B), ולכן A → D. "
      "ב-**A → BC** התכונה **C עודפת בצד ימין**, כי A → B ו-B → C כבר נותנות A → C. "
      "מאחדים את A → B ו-A → D ל-**A → BD**. ב-CD → E אין עודפות, כי C⁺ = {C} ו-D⁺ = {D}. "
      "התוצאה היא {A → BD, B → C, CD → E}. ‏A → BCD שקולה ל-F, אבל עדיין יש בה את C העודפת, ולכן אינה קנונית. "
      "בשלוש האפשרויות האחרות חסרה תלות או שהשתנתה, ולכן אינן שקולות ל-F."),
]

data = {
    "examCode": "PRAC-CL26",
    "examLabel": "המבחן הקשה של קלוד 2026",
    "year": 2026,
    "course": "61303",
    "contexts": contexts,
    "questions": questions,
}
OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"wrote {OUT} ({len(questions)} questions)")
