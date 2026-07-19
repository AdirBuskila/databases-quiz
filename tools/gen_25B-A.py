# -*- coding: utf-8 -*-
"""Generate tools/raw/25B-A.json for the Databases MCQ quiz app."""
import json, pathlib

RLM = "‏"  # right-to-left mark, for options starting with an LTR char

def opt(id, type, value, lang=None):
    o = {"id": id, "type": type, "value": value}
    if lang: o["lang"] = lang
    return o

def code(id, value):
    return {"id": id, "type": "code", "value": value, "lang": "sql"}

contexts = {
    "erd": {
        "kind": "image",
        "title": "חלק א׳ — תרשים ER (מערכת רישום של מכללה)",
        "image": "images/exams/25B-A-erd.png",
        "caption": "התרשים מתאר את מערכת הרישום של מכללה. התייחסו אליו וענו על השאלות. (התרשים חולץ מהמבחן ועבר היפוך צבעים לשיפור הקריאוּת; במבחן מופיעים שלושה עותקים זהים — כאן מוצג עותק אחד.)"
    },
    "sql": {
        "kind": "schema",
        "title": "חלק ב׳ — סכמות היחסים",
        "intro": "נתונות תבניות/סכמות היחסים הבאות מתוך בסיס נתונים. הסעיפים מתייחסים לאוסף זה:",
        "relations": [
            {
                "schema": "Students([u]student_id[/u], first_name, last_name, birth_year, major)",
                "meaning": "`student_id` — מזהה ייחודי של סטודנט (מפתח ראשי);\n`first_name` — שם פרטי; `last_name` — שם משפחה;\n`birth_year` — שנת הלידה; `major` — תחום הלימוד הראשי (חוג ראשי)."
            },
            {
                "schema": "Courses([u]course_id[/u], course_name, credits, department)",
                "meaning": "`course_id` — מזהה ייחודי של הקורס (מפתח ראשי);\n`course_name` — שם הקורס; `credits` — מספר נקודות הזכות שמוענקות על הקורס;\n`department` — שם המחלקה האחראית על הקורס."
            },
            {
                "schema": "Enrollments([u]enrollment_id[/u], student_id, course_id, grade, semester, enrollment_date, status)",
                "meaning": "`enrollment_id` — מזהה ייחודי של שורת הרשמה (מפתח ראשי);\n`student_id` — מזהה הסטודנט (מפתח זר אל Students); `course_id` — מזהה הקורס (מפתח זר אל Courses);\n`grade` — הציון שהסטודנט קיבל בקורס; `semester` — הסמסטר שבו התקיים הקורס (למשל 'Spring 2024');\n`enrollment_date` — תאריך ההרשמה; `status` — מצב ההרשמה (למשל 'active', 'withdrawn', 'completed')."
            },
            {
                "schema": "Instructors([u]instructor_id[/u], name, department, email, hire_date, office_location)",
                "meaning": "`instructor_id` — מזהה ייחודי של המרצה (מפתח ראשי);\n`name` — שם מלא; `department` — המחלקה האקדמית בה המרצה מלמד;\n`email` — כתובת הדוא\"ל; `hire_date` — תאריך תחילת העבודה במוסד;\n`office_location` — מיקום המשרד בקמפוס (למשל 'בניין B, חדר 204')."
            }
        ]
    },
    "ra": {
        "kind": "schema",
        "title": "חלק ג׳ — סכמות היחסים (תלמידים, קורסים ומורים פרטיים)",
        "intro": "נתונות תבניות/סכמות יחסים מתוך בסיס נתונים של תלמידים, קורסים ומורים פרטיים. ניתן להניח שבטבלאות אין ערכי Null / ערכים ריקים.",
        "relations": [
            {
                "schema": "student([u]id[/u], name, age, city)",
                "meaning": "היחס מתאר פרטים של תלמיד (מספר מזהה, שם, גיל ועיר מגורים)."
            },
            {
                "schema": "teacher([u]id[/u], teach_grade, city, can_zoom)",
                "meaning": "היחס מתאר פרטים של מורה (מספר מזהה, ציון יכולת הוראה, עיר מגורים, והאם הוא יכול ללמד בזום — `can_zoom`)."
            },
            {
                "schema": "group_lesson(lesson_id, lesson_name, teacher_id, details, is_zoom)",
                "meaning": "יחס זה מתאר שיעור קבוצתי (מזהה שיעור, שם השיעור, מזהה של המורה המלמד, פרטים על השיעור, והאם ניתן ללמוד בזום — `is_zoom`)."
            },
            {
                "schema": "studies([u]student_id[/u], [u]lesson_id[/u])",
                "meaning": "יחס זה מתאר למידה של תלמיד בשיעור (מזהה תלמיד, מזהה שיעור)."
            },
            {
                "schema": "private_lesson(session_id, lesson_id, student_id, teacher_id, is_zoom)",
                "meaning": "יחס זה מתאר שיעור פרטי (מזהה למפגש, מזהה לשיעור שהוא נושא המפגש הפרטי, מזהה תלמיד, מזהה מורה, והאם מתקיים בזום)."
            }
        ],
        "note": "**הערות:** תלמיד יכול גם להיות מורה. תלמיד יכול ללמוד בשיעור קבוצתי או בשיעור פרטי או בשניהם."
    },
    "q16": {
        "kind": "relations",
        "title": "שני יחסים R, S בעלי סכמה זהה",
        "tables": [
            {"name": "R", "columns": ["A", "B", "C"],
             "rows": [[2, 2, 3], [1, 2, 5], [3, 2, 7], [2, 5, 3], [2, 2, 5]]},
            {"name": "S", "columns": ["A", "B", "C"],
             "rows": [[1, 5, 7], [1, 2, 5], [3, 6, 5], [3, 2, 3], [2, 2, 2]]}
        ]
    },
    "fd": {
        "kind": "fd",
        "title": "חלק ד׳ — יחס ותלויות",
        "algebra": [
            "R = (A, B, C, D, E)",
            "F1 = {A → B, C → BD, E → B, AB → E}"
        ]
    }
}

questions = []

# ---------- חלק א׳ — ERD ----------
questions.append({
    "num": 1, "part": "א", "topic": "erd", "contextId": "erd",
    "question": "בהתבסס על הדיאגרמה, היכן יש למקם את התכונה \"ציון\"?",
    "options": [
        opt("a", "text", "בישות סטודנט, מכיוון שהציון שייך לסטודנט."),
        opt("b", "text", "בישות קורס, מכיוון שהציון ניתן בקורס ספציפי."),
        opt("c", "text", "על הקשר \"רישום\", מכיוון שהציון מתאר את הקשר הספציפי בין סטודנט לקורס."),
        opt("d", "text", "בישות מרצה, מכיוון שהמרצה הוא זה שנותן את הציון."),
    ],
    "correctId": "c", "answerSource": "solution-pdf",
    "explanation": "התכונה 'ציון' מתארת את היחס בין סטודנט מסוים לקורס מסוים (הציון שקיבל הסטודנט באותו קורס), ולכן מקומה על הקשר 'רישום' (קשר רבים-לרבים) ולא על אחת הישויות.",
    "confidence": "high"
})
questions.append({
    "num": 2, "part": "א", "topic": "erd", "contextId": "erd",
    "question": "סטודנט רוצה לדעת מי המרצה בקורס שהוא נרשם אליו. האם ניתן לדעת זאת באופן חד משמעי?",
    "options": [
        opt("a", "text", "לא ניתן לדעת, כי אין קשר ישיר בין מרצה לסטודנט."),
        opt("b", "text", "כן ניתן לדעת, כי סטודנט, קורס ומרצה מחוברים בקשר טרינארי."),
        opt("c", "text", "כן ניתן לדעת, כי לכל קורס מרצה אחד בלבד."),
        opt("d", "text", "לא ניתן לדעת, כי סטודנט יכול להירשם רק לקורס אחד אצל אותו המרצה."),
    ],
    "correctId": "c", "answerSource": "solution-pdf",
    "explanation": "לפי הדיאגרמה לכל קורס מרצה אחד המלמד אותו, ולכן דרך הקשר 'רישום' של הסטודנט לקורס ניתן לדעת באופן חד-משמעי מיהו המרצה של אותו קורס.",
    "confidence": "high"
})
questions.append({
    "num": 3, "part": "א", "topic": "erd", "contextId": "erd",
    "question": "בהתבסס על הדיאגרמה, האם ייתכן מצב בו מרצה מלמד קורס שאינו ניתן במחלקה בה המרצה עובד? (בהנחה שלמרצה יש שיוך למחלקה, שאינו מופיע בדיאגרמה)",
    "options": [
        opt("a", "text", "כן, הדיאגרמה אינה מגדירה מגבלה כזו. הקשרים מלמד ו-לתת אינם תלויים זה בזה."),
        opt("b", "text", "לא, מכיוון שקורס ניתן במחלקה, המרצה חייב להיות מאותה המחלקה."),
        opt("c", "text", "לא, הקשר מלמד הוא תת-סוג של הקשר לתת."),
        opt("d", "text", "הדיאגרמה שגויה מכיוון שהיא אינה מגדירה את הקשר בין מרצה למחלקה."),
    ],
    "correctId": "a", "answerSource": "solution-pdf",
    "explanation": "הדיאגרמה אינה כופה שהמחלקה שנותנת את הקורס (הקשר 'לתת') תהיה זהה למחלקה שאליה משויך המרצה שמלמד אותו (הקשר 'מלמד'); שני הקשרים בלתי-תלויים, ולכן ייתכן מרצה שמלמד קורס ממחלקה אחרת.",
    "confidence": "high"
})
questions.append({
    "num": 4, "part": "א", "topic": "erd", "contextId": "erd",
    "question": "על פי המודל, מה נכון לגבי הקשר בין קורס ל-מחלקה?",
    "options": [
        opt("a", "text", "אותו הקורס ניתן במספר מחלקות במקביל."),
        opt("b", "text", "למחלקה יכול להיות רק קורס אחד שהיא נותנת."),
        opt("c", "text", "כל קורס חייב להינתן בלא יותר ממחלקה אחת."),
        opt("d", "text", "הקשר בין קורס למחלקה הוא קשר מסוג רבים-לרבים."),
    ],
    "correctId": "c", "answerSource": "solution-pdf",
    "explanation": "החץ בקשר 'לתת' שבין קורס למחלקה מציין שכל קורס משויך למחלקה אחת לכל היותר (רבים-לאחד), ולכן קורס חייב להינתן בלא יותר ממחלקה אחת.",
    "confidence": "high"
})

# ---------- חלק ב׳ — SQL ----------
questions.append({
    "num": 5, "part": "ב", "topic": "sql", "contextId": "sql",
    "question": "איזו מהשאילתות הבאות מציגה את שמות הסטודנטים שקיבלו את הציון הנמוך ביותר מכלל הציונים שניתנו בכל הקורסים?",
    "options": [
        code("a", "SELECT first_name\nFROM Students\nJOIN Enrollments USING(student_id)\nWHERE grade = (SELECT MIN(grade) FROM Enrollments);"),
        code("b", "SELECT first_name\nFROM Students\nJOIN Enrollments USING(student_id)\nWHERE grade > (SELECT MIN(grade) FROM Enrollments);"),
        code("c", "SELECT first_name\nFROM Students\nJOIN Enrollments USING(student_id)\nWHERE grade <= ALL (SELECT MAX(grade) FROM Enrollments);"),
        code("d", "SELECT first_name\nFROM Students\nJOIN Enrollments USING(student_id)\nWHERE grade = ANY (SELECT MIN(grade) FROM Enrollments);"),
        code("e", "SELECT first_name\nFROM Students\nWHERE student_id = (\n  SELECT student_id\n  FROM Enrollments\n  WHERE grade = (SELECT MIN(grade) FROM Enrollments)\n);"),
    ],
    "correctId": "a", "acceptedIds": ["a", "d"], "answerSource": "solution-pdf",
    "explanation": "צריך לחבר Students↔Enrollments ולסנן `grade = (SELECT MIN(grade) FROM Enrollments)`. A עושה זאת ישירות; ל-D עם `= ANY (SELECT MIN(grade)…)` תוצאה זהה (ANY מול ערך יחיד ≡ שוויון) ולכן התקבל גם הוא (4 נק'). B בודק `> MIN`, ו-C בודק `<= MAX` (כלומר את כל הציונים).",
    "confidence": "high"
})
questions.append({
    "num": 6, "part": "ב", "topic": "sql", "contextId": "sql",
    "question": "מה עושה השאילתה הבאה?",
    "code": "SELECT COUNT(DISTINCT S.student_id) AS num_of_students\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.credits >= 3;",
    "options": [
        opt("a", "text", "סופרת את מספר הסטודנטים שנרשמו לפחות לקורס אחד שמעניק בדיוק 3 נקודות זכות."),
        opt("b", "text", "סופרת את כמות הקורסים שבהם רשומים סטודנטים עם 3 נקודות זכות."),
        opt("c", "text", "סופרת את כל ההרשמות לקורסים עם 3 נקודות זכות ומעלה."),
        opt("d", "text", "סופרת את מספר הסטודנטים שנרשמו לקורסים שמעניקים 3 נקודות זכות או יותר."),
        opt("e", "text", "כל התשובות האחרות אינן נכונות."),
    ],
    "correctId": "d", "answerSource": "solution-pdf",
    "explanation": "‏COUNT(DISTINCT student_id) עם סינון `C.credits >= 3` סופר את מספר הסטודנטים השונים שנרשמו לקורס כלשהו המעניק 3 נקודות זכות או יותר. A מגביל ל'בדיוק 3'; B סופר קורסים; C סופר הרשמות.",
    "confidence": "high"
})
questions.append({
    "num": 7, "part": "ב", "topic": "sql", "contextId": "sql",
    "question": "איזו מהשאילתות הבאות מחזירה את שמות הסטודנטים (`first_name`) שנרשמו ליותר מ-3 קורסים במהלך הסמסטר `'Spring 2024'`?",
    "options": [
        code("a", "SELECT S.first_name\nFROM Students S\nJOIN Enrollments E\n  ON S.student_id = E.student_id\nWHERE E.semester = 'Spring 2024'\nGROUP BY S.first_name\nHAVING COUNT(E.course_id) > 3;"),
        code("b", "SELECT S.first_name\nFROM Students S\nJOIN Enrollments E\n  ON S.student_id = E.student_id\nGROUP BY S.first_name\nHAVING COUNT(E.course_id) > 3\n  AND E.semester = 'Spring 2024';"),
        code("c", "SELECT S.first_name\nFROM Students S\nJOIN Enrollments E\n  ON S.student_id = E.student_id\n  AND E.semester = 'Spring 2024'\nWHERE COUNT(*) > 3\nGROUP BY S.first_name;"),
        code("d", "SELECT S.first_name\nFROM Students S\nJOIN Enrollments E\n  ON S.student_id = E.student_id\nJOIN Courses C\n  ON E.course_id = C.course_id\nWHERE E.semester = 'Spring 2024'\nGROUP BY S.first_name\nHAVING SUM(C.credits) > 3;"),
        opt("e", "text", "כל התשובות האחרות אינן נכונות."),
    ],
    "correctId": "a", "acceptedIds": ["a", "e"], "answerSource": "solution-pdf",
    "explanation": "צריך לסנן `semester = 'Spring 2024'` ב-WHERE ואז `HAVING COUNT(course_id) > 3`. B שם את תנאי הסמסטר ב-HAVING (שגוי); C משתמש ב-`WHERE COUNT(*)` (שגוי); D סוכם נקודות זכות. הערת ערעור: מאחר ש-GROUP BY לפי `first_name` אינו ייחודי (ייתכן שסופרים קורסים של סטודנטים שונים בעלי אותו שם), התקבלה כנכונה גם תשובה E.",
    "confidence": "high"
})
questions.append({
    "num": 8, "part": "ב", "topic": "sql", "contextId": "sql",
    "question": "מה מהבאים מתאר בצורה הנכונה ביותר את תוצאת השאילתה הבאה?",
    "code": "SELECT S.first_name, E.grade\nFROM Students S\nLEFT JOIN Enrollments E USING(student_id)\nWHERE grade < 60;",
    "options": [
        opt("a", "text", "השאילתה מציגה את שמות הסטודנטים שקיבלו ציון מתחת ל-60."),
        opt("b", "text", "השאילתה מציגה את כל הסטודנטים, גם אם לא נרשמו לקורסים, וציון מתחת ל-60 בלבד."),
        opt("c", "text", "השאילתה מציגה את כל הסטודנטים, ובמקרים שאין להם ציונים – תופיע עמודת `grade` עם NULL."),
        opt("d", "text", "השאילתה מציגה את כל הסטודנטים שנכשלו, גם אם לא נרשמו לאף קורס."),
        opt("e", "text", "כל התשובות האחרות אינן נכונות."),
    ],
    "correctId": "a", "acceptedIds": ["a", "e"], "answerSource": "solution-pdf",
    "explanation": "‏LEFT JOIN עם `WHERE grade < 60` מסנן החוצה את ערכי ה-NULL, כך שבפועל מוצגים רק הסטודנטים שקיבלו ציון מתחת ל-60. הכוונה הייתה ל-A, אך מכיוון שהיא אינה מציינת שגם הציון עצמו מוצג לצד השם — התקבלה כלגיטימית גם תשובה E.",
    "confidence": "high"
})
questions.append({
    "num": 9, "part": "ב", "topic": "sql", "contextId": "sql",
    "question": "איזו שאילתה תמצא את שמות הקורסים שאליהם נרשמו סטודנטים ששמם כולל את האות `'e'` ושגילם מעל 24? (הניחו כי `birth_year < 2001` משמעו גיל מעל 24)",
    "options": [
        code("a", "SELECT course_name\nFROM Courses C\nJOIN Enrollments E ON C.course_id = E.course_id\nJOIN Students S ON S.student_id = E.student_id\nWHERE first_name LIKE '%e%' OR birth_year < 2001;"),
        code("b", "SELECT course_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE S.first_name LIKE '%e%' AND S.birth_year < 2001;"),
        code("c", "SELECT C.course_name\nFROM Students S, Enrollments E, Courses C\nWHERE S.student_id = E.student_id\n  AND E.course_id = C.course_id\n  AND S.first_name LIKE '%e%' OR S.birth_year < 2001;"),
        code("d", "SELECT course_name\nFROM Courses\nJOIN Enrollments USING(course_id)\nJOIN Students USING(student_id)\nWHERE birth_year > 2001 AND first_name LIKE '%e%';"),
        opt("e", "text", "כל התשובות האחרות אינן נכונות."),
    ],
    "correctId": "b", "answerSource": "solution-pdf",
    "explanation": "צריך AND בין `first_name LIKE '%e%'` לבין `birth_year < 2001` (גיל מעל 24). A ו-C משתמשים ב-OR (וב-C גם קדימות שגויה של OR מול AND); D בודק `birth_year > 2001` (כיוון הפוך). רק B נכון.",
    "confidence": "high"
})
questions.append({
    "num": 10, "part": "ב", "topic": "sql", "contextId": "sql",
    "question": "איזו מהשאילתות הבאות תחזיר את שמות הסטודנטים שנרשמו לכל הקורסים שמציעה המחלקה `'Mathematics'`?",
    "options": [
        code("a", "SELECT first_name\nFROM Students S\nWHERE EXISTS (\n  SELECT *\n  FROM Courses C\n  WHERE C.department = 'Mathematics'\n    AND EXISTS (\n      SELECT *\n      FROM Enrollments E\n      WHERE E.student_id = S.student_id\n        AND E.course_id = C.course_id\n    )\n);"),
        code("b", "SELECT first_name\nFROM Students S\nWHERE NOT EXISTS (\n  SELECT *\n  FROM Enrollments E\n  WHERE S.student_id = E.student_id\n    AND E.course_id IN (\n      SELECT course_id\n      FROM Courses\n      WHERE department = 'Mathematics'\n    )\n);"),
        code("c", "SELECT first_name\nFROM Students S\nWHERE NOT EXISTS (\n  SELECT *\n  FROM Courses C\n  WHERE C.department = 'Mathematics'\n    AND NOT EXISTS (\n      SELECT *\n      FROM Enrollments E\n      WHERE E.student_id = S.student_id\n        AND E.course_id = C.course_id\n    )\n);"),
        code("d", "SELECT first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.department = 'Mathematics';"),
        opt("e", "text", "כל התשובות האחרות אינן נכונות."),
    ],
    "correctId": "c", "answerSource": "solution-pdf",
    "explanation": "\"נרשמו לכל הקורסים של Mathematics\" = חלוקה: אין קורס Mathematics שאליו הסטודנט לא נרשם — תבנית NOT EXISTS כפולה (C). B בודק היעדר הרשמה; ל-A מספיק קורס אחד; D הוא חיבור פנימי רגיל.",
    "confidence": "high"
})
questions.append({
    "num": 11, "part": "ב", "topic": "sql", "contextId": "sql",
    "question": "איזו מהשאילתות הבאות מחזירה את שמות הסטודנטים שנרשמו לכל הקורסים של מחלקת `'Mathematics'`?",
    "options": [
        code("a", "SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id)\n  CONTAINS\n  (SELECT course_id\n   FROM Courses C\n   WHERE C.department = 'Mathematics');"),
        code("b", "SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Courses C\n   WHERE C.department = 'Mathematics')\n  CONTAINS\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id);"),
        code("c", "SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id)\n  CONTAINS\n  (SELECT course_id\n   FROM Courses);"),
        code("d", "SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id)\n  CONTAINS\n  (SELECT DISTINCT department\n   FROM Courses\n   WHERE department = 'Mathematics');"),
        opt("e", "text", "כל התשובות האחרות אינן נכונות."),
    ],
    "correctId": "a", "answerSource": "solution-pdf",
    "explanation": "עם אופרטור CONTAINS: קבוצת הקורסים שאליהם נרשם הסטודנט חייבת להכיל את קבוצת קורסי Mathematics — כלומר (הרשמות הסטודנט) CONTAINS (קורסי Mathematics), כפי ש-A מנסח. B הופך את כיוון ההכלה; C משווה לכל הקורסים; D משווה `course_id` מול `department`.",
    "confidence": "high"
})
questions.append({
    "num": 12, "part": "ב", "topic": "sql", "contextId": "sql",
    "question": "איזו מהשאילתות הבאות יוצרת VIEW המציג את שמות הסטודנטים (שם פרטי) והקורסים (שם הקורס) שרשומים אליהם, אך רק עבור קורסים עם לפחות 4 נקודות זכות?",
    "options": [
        code("a", "CREATE VIEW student_courses_view AS\nSELECT S.first_name, C.course_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.credits >= 4;"),
        code("b", "CREATE VIEW student_courses_view AS\nSELECT first_name, course_name\nFROM Courses\nJOIN Enrollments USING(course_id)\nJOIN Students USING(student_id)\nWHERE credits > 4;"),
        code("c", "CREATE VIEW student_courses_view AS\nSELECT S.first_name, C.course_name\nFROM Enrollments E\nJOIN Students S ON S.student_id = E.student_id\nJOIN Courses C ON C.course_id = E.course_id\nWHERE C.credits = 4;"),
        code("d", "CREATE VIEW student_courses_view AS\nSELECT course_name, first_name\nFROM Students, Enrollments, Courses\nWHERE Students.student_id = Enrollments.student_id\n  AND Courses.course_id = Enrollments.course_id\n  AND credits >= 4;"),
        opt("e", "text", "כל התשובות האחרות אינן נכונות."),
    ],
    "correctId": "a", "answerSource": "solution-pdf",
    "explanation": "‏A מחבר Students↔Enrollments↔Courses ומסנן `credits >= 4` עם סדר העמודות הנכון (first_name, course_name). B בודק `credits > 4`; C בודק `credits = 4`. ל-D ניתן ניקוד חלקי בלבד (4 נק') — סדר העמודות הפוך (course_name, first_name) והשאילתה פחות יעילה.",
    "confidence": "high"
})

# ---------- חלק ג׳ — אלגברת היחסים ----------
questions.append({
    "num": 13, "part": "ג", "topic": "relalg", "contextId": "ra",
    "question": "מי מהתשובות הבאות מתאימה לשאילתה: \"מה מזהה המורה שקיבל את ציון יכולת ההוראה הנמוך ביותר\"?\nהשלימו את החלקים החסרים (1) ו-(2) בשאילתה:\n$$(1)  Π_{T1.id}(σ_{T1.teach_grade  (2)  T2.teach_grade}(ρ_{T1}(teacher) X ρ_{T2}(teacher)))$$",
    "options": [
        opt("a", "algebra", "‏(1):  Π_{id}(teacher) −      (2):  >"),
        opt("b", "algebra", "‏(1):  Π_{id}(teacher) X      (2):  <"),
        opt("c", "algebra", "‏(1):  Π_{id}(teacher) −      (2):  <"),
        opt("d", "algebra", "‏(1):  Π_{id}(teacher) X      (2):  >"),
        opt("e", "text", "אף אחת מהתשובות"),
    ],
    "correctId": "a", "answerSource": "solution-pdf",
    "explanation": "כדי לקבל את המורה בעל הציון הנמוך ביותר: כל מזהי המורים פחות אלו שקיים מורה עם ציון נמוך מהם. לכן חלק (1) = `Π_id(teacher) −` (הפרש) וחלק (2) = `>` (T1 גבוה מ-T2). לכן תשובה A.",
    "confidence": "high"
})
questions.append({
    "num": 14, "part": "ג", "topic": "relalg", "contextId": "ra",
    "question": "נתונות ההגדרות הבאות:\n$$TRes <- σ_{T1.teach_grade > T2.teach_grade}(ρ_{T1}(teacher) X ρ_{T2}(teacher))$$\n$$TR1 <- Π_{T1.teach_grade}(TRes) ∩ Π_{T2.teach_grade}(TRes)$$\n$$TR2 <- Π_{teach_grade}(teacher) − TR1$$\nמה נקבל ב-`TR2`?",
    "options": [
        opt("a", "text", "ציון יכולת ההוראה הנמוך ביותר"),
        opt("b", "text", "ציון יכולת ההוראה הגבוה ביותר"),
        opt("c", "text", "ציון יכולת ההוראה הנמוך ביותר וגם ציון יכולת ההוראה הגבוה ביותר"),
        opt("d", "text", "כל ציוני יכולת ההוראה למעט הציון הנמוך ביותר והציון הגבוה ביותר"),
        opt("e", "text", "אף אחת מאפשרויות"),
    ],
    "correctId": "c", "answerSource": "solution-pdf",
    "explanation": "‏TRes מכיל זוגות שבהם `T1.teach_grade > T2.teach_grade`. Π על T1 נותן את כל הציונים פרט למינימלי; Π על T2 נותן את כל הציונים פרט למקסימלי; החיתוך TR1 = הציונים האמצעיים. לכן TR2 = כל הציונים − האמצעיים = הציון הנמוך ביותר וגם הגבוה ביותר.",
    "confidence": "high"
})
questions.append({
    "num": 15, "part": "ג", "topic": "relalg", "contextId": "ra",
    "question": "השאלה היא: \"מהו המספר המזהה של המורה שמלמד בשיעורים פרטיים את כל התלמידים שגילם מעל 35?\"\nלרשותכם פעולות באלגברת היחסים: הפרש, חיתוך, איחוד, חילוק, שינוי שם.\nבכמה מפעולות הנ\"ל תצטרכו להשתמש בכדי לענות על השאלה? (כל שאר הפעולות באלגברת היחסים, אשר לא נזכרות כאן, ניתנות לשימוש חופשי ואינן משתתפות בספירה). שימוש באותה הפעולה יותר מפעם אחת – נספרת רק פעם אחת.",
    "options": [
        opt("a", "text", "0"),
        opt("b", "text", "1"),
        opt("c", "text", "2"),
        opt("d", "text", "3"),
        opt("e", "text", "4"),
    ],
    "correctId": "c", "answerSource": "solution-pdf",
    "explanation": "\"מורה שלימד בשיעורים פרטיים את כל התלמידים מעל גיל 35\" דורש חילוק (÷), ובנוסף שינוי-שם (ρ) כדי להתאים את `id` ל-`student_id`. סה\"כ 2 פעולות מתוך הרשימה — לכן C.",
    "confidence": "high"
})
questions.append({
    "num": 16, "part": "ג", "topic": "relalg", "contextId": "q16",
    "question": "נתונים שני יחסים R, S בעלי סכמה זהה (ראו טבלאות). נתונה השאילתה:\n$$σ_{R.A ≤ 2}(Π_{A,B}(R) ⊗ Π_{B,C}(S))$$\nכמה שורות וכמה עמודות תכיל תוצאת השאילתה? (`⊗` — צירוף טבעי)",
    "options": [
        opt("a", "text", "עשר שורות וארבע עמודות."),
        opt("b", "text", "עשר שורות ושלוש עמודות."),
        opt("c", "text", "שבע שורות וארבע עמודות."),
        opt("d", "text", "שבע שורות ושלוש עמודות."),
        opt("e", "text", "שלוש עשרה שורות ושלוש עמודות."),
    ],
    "correctId": "d", "answerSource": "solution-pdf",
    "explanation": "‏Π(A,B)(R) = {(2,2),(1,2),(3,2),(2,5)}; Π(B,C)(S) = {(5,7),(2,5),(6,5),(2,3),(2,2)}. החיבור הטבעי על B נותן 10 שורות (9 עבור B=2 ועוד 1 עבור B=5) ו-3 עמודות (A,B,C). לאחר σ_{R.A ≤ 2} נותרות 7 שורות ו-3 עמודות.",
    "confidence": "high"
})

# ---------- חלק ד׳ — תלויות ונרמול ----------
questions.append({
    "num": 17, "part": "ד", "topic": "fd_norm", "contextId": "fd",
    "question": "מה הסגור (closure) של התכונה `A`?",
    "options": [
        opt("a", "algebra", "{A}"),
        opt("b", "algebra", "{AB}"),
        opt("c", "algebra", "{ABD}"),
        opt("d", "algebra", "{ABE}"),
        opt("e", "algebra", "R"),
    ],
    "correctId": "d", "answerSource": "solution-pdf",
    "explanation": "‏A⁺: מ-A→B מוסיפים B; מ-AB→E מוסיפים E. C→BD דורש C (שאינו בסגור). לכן A⁺ = {A, B, E} = {ABE}.",
    "confidence": "high"
})
questions.append({
    "num": 18, "part": "ד", "topic": "fd_norm", "contextId": "fd",
    "question": "מי מהבאים הוא מפתח **קביל** (candidate key) של `R` בהינתן `F1`?",
    "options": [
        opt("a", "algebra", "{AB}"),
        opt("b", "algebra", "{AC}"),
        opt("c", "algebra", "{AD}"),
        opt("d", "algebra", "{ABD}"),
        opt("e", "algebra", "{ACD}"),
    ],
    "correctId": "b", "answerSource": "solution-pdf",
    "explanation": "‏AC⁺ = {A,B,C,D,E} = R, ואף אחת מ-A או C לבדה אינה מפתח (A⁺={ABE}, C⁺={CBD}). לכן {AC} הוא מפתח מועמד מינימלי. {ABD},{ACD} אינם מינימליים או אינם על-מפתח.",
    "confidence": "high"
})
questions.append({
    "num": 19, "part": "ד", "topic": "fd_norm",
    "question": "נתונה הסכמה `R=(A,B,C,D,E)` וקבוצת תלויות פונקציונליות שהיא מקיימת:\n$$F = {B → E, DE → CD, C → AB}$$\nכמו כן, נתון הפירוק הבא: `R1(A,B,C,D)`, `R2(C,E)`, `R3(D,E)`.\nיש לבחור את הטענה הנכונה מבין הבאות:",
    "options": [
        opt("a", "text", "הפירוק משמר מידע, אך לא תלויות"),
        opt("b", "text", "הפירוק משמר תלויות, אך לא מידע"),
        opt("c", "text", "הפירוק לא משמר תלויות, ולא משמר מידע"),
        opt("d", "text", "הפירוק משמר מידע ותלויות"),
        opt("e", "text", RLM + "זהו אינו פירוק של R על פי הגדרה"),
    ],
    "correctId": "a", "answerSource": "solution-pdf",
    "explanation": "הפירוק מחסר-אובדן (chase: בעזרת C→AB מתאחדים A,B ואז B→E מתאים את E, ומתקבלת שורה מלאה ב-R1). אך אינו משמר תלויות — `B → E` אינה נשמרת באף רכיב (E מופרד מ-B) ואינה נגזרת מאיחוד ההיטלים. לכן משמר מידע אך לא תלויות.",
    "confidence": "high"
})
questions.append({
    "num": 20, "part": "ד", "topic": "fd_norm",
    "question": "נתונה הסכמה `R=(A,B,C,D,E)` וקבוצת תלויות פונקציונליות שהיא מקיימת:\n$$F = {A → B, C → D, BC → E}$$\nכמו כן, נתון הפירוק הבא: `R1(A,B)`, `R2(C,D)`, `R3(B,C,E)`, `R4(A,C)`.\nיש לבחור את הטענה הנכונה מבין הבאות:",
    "options": [
        opt("a", "text", RLM + "R לא נמצאת ב-BCNF, והפירוק לא משמר מידע"),
        opt("b", "text", RLM + "R נמצאת ב-BCNF, והפירוק משמר תלויות"),
        opt("c", "text", RLM + "R נמצאת ב-3NF, והפירוק נמצא ב-3NF"),
        opt("d", "text", RLM + "R לא נמצאת ב-BCNF, והפירוק נמצא ב-3NF"),
        opt("e", "text", RLM + "זהו אינו פירוק של R על פי הגדרה"),
    ],
    "correctId": "d", "answerSource": "solution-pdf",
    "explanation": "המפתח היחיד של R הוא AC. התלות `A → B` מפרה BCNF (וגם 3NF, כי B לא-ראשוני), לכן R אינה ב-BCNF. כל רכיבי הפירוק R1..R4 הם ב-BCNF (ולכן גם ב-3NF). לכן: R לא ב-BCNF והפירוק ב-3NF.",
    "confidence": "high"
})

data = {
    "examCode": "25B-A",
    "examLabel": "2025 סמסטר ב׳ מועד א׳",
    "year": 2025,
    "examDate": "21.7.2025",
    "course": "61303",
    "contexts": contexts,
    "questions": questions,
}

out = pathlib.Path(__file__).parent / "raw" / "25B-A.json"
out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
print("wrote", out, "with", len(questions), "questions and", len(contexts), "contexts")
