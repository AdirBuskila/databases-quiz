# -*- coding: utf-8 -*-
"""Generate tools/raw/26B-A.json — 2026 סמסטר ב׳ מועד א׳ (28.6.2026).

The paper is "מבחן מס' 000" (טופס 0): the correct answer is always option א.
No solution file was published; every question was also solved independently and
each one lands on א, so correctId is "a" throughout with answerSource "form-0".
"""
import json, pathlib

OUT = pathlib.Path(__file__).parent / "raw" / "26B-A.json"
SRC = "form-0"
NONE_TEXT = "אף תשובה אינה נכונה"
OTHERS_TEXT = "כל התשובות האחרות אינן נכונות"


def t(i, v): return {"id": i, "type": "text", "value": v}
def c(i, v): return {"id": i, "type": "code", "lang": "sql", "value": v}
def al(i, v): return {"id": i, "type": "algebra", "value": v}


def q(num, part, topic, question, options, explanation, ctx=None, code=None):
    d = {"num": num, "part": part, "topic": topic}
    if ctx: d["contextId"] = ctx
    d["question"] = question
    if code: d["code"] = code
    d.update({"options": options, "correctId": "a", "answerSource": SRC,
              "explanation": explanation, "confidence": "high"})
    return d


contexts = {
    "erd": {
        "kind": "image",
        "title": "חלק א׳ — ERD",
        "image": "images/exams/26B-A-erd.png",
        "caption": "התייחסו לתרשים ה-ERD הנתון וענו על השאלות. (התרשים חולץ מהמבחן.)",
    },
    "sql": {
        "kind": "schema",
        "title": "חלק ב׳ — SQL: רשת מועדוני כושר",
        "intro": "נתונות תבניות היחסים הבאות, המתארות אפליקציה של רשת מועדוני כושר. קו תחתון מסמן מפתח קביל.",
        "relations": [
            {"schema": "Member([u]member_id[/u], name, city, age)",
             "meaning": "מנוי — מזהה מנוי, שם, עיר מגורים, גיל."},
            {"schema": "Class([u]class_id[/u], title, type, price, studio)",
             "meaning": "שיעור — מזהה שיעור, כותרת, סוג (Pilates / Spin / Yoga), מחיר, סטודיו."},
            {"schema": "Trainer([u]trainer_id[/u], name, country)",
             "meaning": "מאמן/ת — מזהה מאמן, שם, מדינה."},
            {"schema": "Teaches([u]trainer_id[/u], [u]class_id[/u])",
             "meaning": "הוראה — איזה מאמן מעביר איזה שיעור (יחס רבים-לרבים)."},
            {"schema": "Attendance([u]member_id[/u], [u]class_id[/u], [u]attend_date[/u], fee_paid)",
             "meaning": "השתתפות — מנוי השתתף בשיעור בתאריך מסוים, והמחיר ששילם בפועל (`fee_paid`)."},
        ],
    },
    "ra": {
        "kind": "schema",
        "title": "חלק ג׳ — אלגברת היחסים: פלטפורמת פרילנסרים",
        "intro": "נתונות תבניות/סכמות יחסים מתוך בסיס נתונים של פלטפורמה המקשרת בין פרילנסרים ללקוחות. ניתן להניח שבטבלאות אין ערכים ריקים (Null).",
        "relations": [
            {"schema": "freelancer([u]id[/u], name, age, country)",
             "meaning": "פרטי פרילנסר: מספר מזהה, שם, גיל ומדינת מגורים."},
            {"schema": "client([u]id[/u], industry, country, is_verified)",
             "meaning": "פרטי לקוח: מספר מזהה, תחום/ענף, מדינה, והאם הלקוח מאומת."},
            {"schema": "project([u]project_id[/u], title, client_id, description, is_remote)",
             "meaning": "פרויקט: מזהה פרויקט, כותרת, מזהה הלקוח שפרסם, פרטים, והאם מתבצע מרחוק."},
            {"schema": "bid([u]freelancer_id[/u], [u]project_id[/u])",
             "meaning": "הגשת הצעה של פרילנסר לפרויקט (מזהה פרילנסר, מזהה פרויקט)."},
            {"schema": "contract([u]contract_id[/u], project_id, freelancer_id, client_id, is_remote)",
             "meaning": "חוזה חתום: מזהה חוזה, מזהה הפרויקט שהוא נושא החוזה, מזהה פרילנסר, מזהה לקוח, והאם מתבצע מרחוק."},
        ],
        "note": "**הערות:** פרילנסר יכול גם להיות לקוח (לפרסם פרויקטים משלו). פרילנסר יכול להגיש הצעה לפרויקט, לחתום על חוזה, או שניהם.",
    },
    "fd": {
        "kind": "fd",
        "title": "חלק ד׳ — תלויות פונקציונליות",
        "algebra": ["R = (A, B, C, D, E)", "F = {A → B, B → C, A → D, AC → E}"],
    },
}

questions = [
    # ---------------- חלק א׳ — ERD ----------------
    q(1, "א", "erd",
      "בתרגום היעיל ביותר, כמה טבלאות נדרשות עבור `M` ו-`A` והקשר `R3` שביניהן (בלי לספור את `M1`, `M2`)?",
      [t("a", "2 — (M, A). R3 ממוזג לתוך M"),
       t("b", "3 — (M, A, R3)."),
       t("c", "1 — הכול ממוזג לטבלה אחת"),
       t("d", "2 — (A, R3). M ממוזגת לתוך A"),
       t("e", OTHERS_TEXT)],
      "‏R3 הוא קשר אחד-לרבים: החץ פונה אל A, כלומר כל M קשור ל-A אחד לכל היותר. קשר כזה ממזגים לצד ה'רבים' — מוסיפים את `KeyA` כמפתח זר לטבלת M. נשארות שתי טבלאות: M ו-A.",
      ctx="erd"),
    q(2, "א", "erd",
      "אם נוסיף חץ המכוון מ-`R2` לישות `A`, מה יהיה המפתח הראשי של טבלת `R2`?",
      [t("a", "{KeyG, KeyB}"),
       t("b", "{KeyA}"),
       t("c", "{KeyG, KeyB, KeyA}"),
       t("d", "{KeyG, KeyA}"),
       t("e", OTHERS_TEXT)],
      "‏R2 מקשר את A עם הצבירה B-R1-G, שהמפתח שלה הוא המפתח של R1: ‏{KeyG, KeyB}. חץ אל A אומר שכל מופע של הצבירה קשור ל-A אחד לכל היותר, ולכן המפתח של R2 הוא המפתח של הצד ה'רבים' — {KeyG, KeyB}.",
      ctx="erd"),
    q(3, "א", "erd",
      "לישות `M` יש השתתפות מלאה ב-`R3` (קו כפול). כיצד אילוץ זה נשמר בתרגום לסכמה רלציונית?",
      [t("a", "נשמר באמצעות הגדרת KeyA כשדה NOT NULL בטבלת M (מכיוון ש-R3 הוא אחד-לרבים וממוזג לתוך M)"),
       t("b", "אינו ניתן לאכיפה ישירה ודורש אילוץ נוסף (trigger / assertion)"),
       t("c", "נשמר אוטומטית על-ידי כך ש-KeyM הוא מפתח ראשי"),
       t("d", "נשמר על-ידי הוספת PropA_1 לטבלת M"),
       t("e", OTHERS_TEXT)],
      "כש-R3 ממוזג לתוך M, כל שורה ב-M מחזיקה את `KeyA` כמפתח זר. השתתפות מלאה = כל M חייב להיות קשור ל-A, ולכן מגדירים את `KeyA` כ-NOT NULL — וזה אוכף את האילוץ ישירות.",
      ctx="erd"),
    q(4, "א", "erd",
      "‏`R4` הוא קשר מזהה (בין ישות חזקה לחלשה) ו-`R3` הוא קשר אחד-לרבים רגיל — שניהם ממוזגים. מה ההבדל המהותי בתרגומם?",
      [t("a", "ב-R4 מפתח הבעלים (KeyM) הופך לחלק מהמפתח הראשי של W, ואילו ב-R3 המפתח הזר (KeyA) נשאר שדה רגיל מחוץ למפתח הראשי של M"),
       t("b", "בשני המקרים המפתח הזר הופך לחלק מהמפתח הראשי"),
       t("c", "R4 דורש טבלה נפרדת ו-R3 ממוזג"),
       t("d", "R3 דורש טבלה נפרדת ו-R4 ממוזג"),
       t("e", OTHERS_TEXT)],
      "‏W היא ישות חלשה: המפתח שלה הוא המפתח של הבעלים (‏KeyM, דרך M1) יחד עם המפריד `DiscW_1`. לכן ב-R4 המפתח הזר נכנס למפתח הראשי. ב-R3 ‏`KeyA` הוא סתם מפתח זר בטבלת M, והמפתח של M נשאר `KeyM`.",
      ctx="erd"),

    # ---------------- חלק ב׳ — SQL ----------------
    q(5, "ב", "sql",
      "כתבו שאילתא המחזירה לכל מנוי את שמו (`name`) ואת כותרות השיעורים (`title`) שבהם השתתף ושילם **מעל 100 ₪**. עיינו בהצעות וקבעו מה מהבאים נכון.",
      [t("a", "רק השאילתא B נכונה"),
       t("b", "רק השאילתא A נכונה"),
       t("c", "רק השאילתא C נכונה"),
       t("d", "השאילתות A ו-B נכונות"),
       t("e", NONE_TEXT)],
      "‏A מחזירה מזהים (`member_id`, `class_id`) ולא שם וכותרת. ‏C לא מצרפת את `Class`, ולכן `title` לא קיים בה. רק B מצרפת את שלוש הטבלאות ומחזירה `name` ו-`title`.",
      ctx="sql",
      code="(A) SELECT member_id, class_id FROM Attendance WHERE fee_paid > 100\n"
           "(B) SELECT name, title FROM Attendance JOIN Member USING(member_id)\n"
           "    JOIN Class USING(class_id) WHERE fee_paid > 100\n"
           "(C) SELECT name, title FROM Attendance JOIN Member USING(member_id)\n"
           "    WHERE fee_paid > 100"),
    q(6, "ב", "sql",
      "מיהם השיעורים שכותרתם מכילה את המילה `Power` ומחירם גבוה מ-50 ₪? השלימו את החסר במקום `X`.",
      [c("a", "LIKE '%Power%'"),
       c("b", "= '%Power%'"),
       c("c", "LIKE 'Power'"),
       c("d", "LIKE '_Power_'"),
       c("e", "= 'Power%'")],
      "‏\"מכילה\" = כל רצף תווים לפני ואחרי, כלומר `LIKE '%Power%'`. עם `=` התווים `%` הם תווים רגילים ולא תווים כלליים; `LIKE 'Power'` תופס רק את המילה בדיוק; ו-`_` מחליף תו אחד בדיוק.",
      ctx="sql",
      code="SELECT title FROM Class WHERE title ____X____ AND price > 50"),
    q(7, "ב", "sql",
      "מיהם המנויים **שמעולם לא** השתתפו בשיעור מסוג `'Spin'`? בחרו את השאילתא הנכונה.",
      [c("a", "SELECT name FROM Member WHERE member_id NOT IN\n  (SELECT member_id FROM Attendance JOIN Class USING(class_id)\n   WHERE type='Spin')"),
       c("b", "SELECT name FROM Member JOIN Attendance USING (member_id)\n JOIN Class USING (class_id) WHERE type <> 'Spin'"),
       c("c", "SELECT name FROM Member WHERE member_id NOT IN\n(SELECT member_id FROM Class WHERE type='Spin')"),
       c("d", "SELECT name FROM Member WHERE type <> 'Spin'"),
       t("e", NONE_TEXT)],
      "\"מעולם לא\" = כל המנויים פחות אלה שכן השתתפו ב-Spin, ולכן `NOT IN` על תת-שאילתא שמוצאת את משתתפי ה-Spin. ‏B מחזירה מי שהשתתף בשיעור כלשהו שאינו Spin (גם אם השתתף ב-Spin). ב-C וב-D אין עמודה `member_id`/`type` בטבלה שבה משתמשים.",
      ctx="sql"),
    q(8, "ב", "sql",
      "מיהם המנויים שהשתתפו בשיעורים מיותר מסוג אחד (כלומר ממספר סוגים שונים)?",
      [c("a", "SELECT member_id FROM Attendance JOIN Class USING (class_id)\n GROUP BY member_id HAVING COUNT (DISTINCT type) > 1"),
       c("b", "SELECT member_id FROM Attendance JOIN Class USING (class_id)\n GROUP BY member_id HAVING COUNT(type) > 1"),
       c("c", "SELECT member_id FROM Attendance JOIN Class USING(class_id)\n WHERE COUNT(DISTINCT type) > 1"),
       c("d", "SELECT member_id, COUNT(type) FROM Class\n GROUP BY member_id HAVING COUNT(type) > 1"),
       t("e", NONE_TEXT)],
      "צריך לספור סוגים **שונים** לכל מנוי, ולכן `COUNT(DISTINCT type)` ב-`HAVING`. ‏B סופרת השתתפויות (שני שיעורי Yoga ייספרו כ-2). ב-C פונקציית צבירה ב-`WHERE` אסורה. ב-D אין `member_id` בטבלת `Class`.",
      ctx="sql"),
    q(9, "ב", "sql",
      "מהו ממוצע המחיר ששולם (`fee_paid`) עבור ההשתתפויות בשיעורים מסוג `'Yoga'`?",
      [c("a", "SELECT AVG (fee_paid) FROM Attendance JOIN Class USING (class_id)\nWHERE type='Yoga'"),
       c("b", "SELECT AVG (fee_paid) FROM Attendance, Class WHERE type='Yoga'"),
       c("c", "SELECT AVG (fee_paid) FROM Attendance WHERE type='Yoga'"),
       c("d", "SELECT AVG(fee_paid) FROM Class WHERE type='Yoga'"),
       t("e", NONE_TEXT)],
      "‏`fee_paid` נמצא ב-Attendance ו-`type` נמצא ב-Class, לכן צריך לצרף לפי `class_id`. ‏B היא מכפלה קרטזית בלי תנאי צירוף. ב-C אין `type`, וב-D אין `fee_paid`.",
      ctx="sql"),
    q(10, "ב", "sql",
      "מיהם המנויים שהשתתפו בכל השיעורים מסוג `'Yoga'`? בחרו את השאילתא הנכונה.",
      [c("a", "SELECT name FROM Member m WHERE NOT EXISTS\n(SELECT class_id FROM Class c WHERE c.type='Yoga' AND\n   c.class_id NOT IN (SELECT a.class_id FROM Attendance a\n   WHERE a.member_id = m.member_id))"),
       c("b", "SELECT DISTINCT name FROM Member JOIN Attendance USING(member_id)\n  JOIN Class USING(class_id) WHERE type='Yoga'"),
       c("c", "SELECT name FROM Member m WHERE NOT EXISTS\n  (SELECT class_id FROM Class c WHERE c.class_id NOT IN\n   (SELECT a.class_id FROM Attendance a\n    WHERE a.member_id = m.member_id))"),
       c("d", "SELECT name FROM Member WHERE member_id IN\n  (SELECT member_id FROM Attendance JOIN Class USING(class_id)\n   WHERE type='Yoga')"),
       t("e", NONE_TEXT)],
      "חילוק ב-SQL: \"לא קיים שיעור Yoga שהמנוי לא השתתף בו\". ‏C בודקת את **כל** השיעורים (בלי סינון ל-Yoga). ‏B ו-D מחזירות מי שהשתתף בשיעור Yoga **אחד לפחות**.",
      ctx="sql"),
    q(11, "ב", "sql",
      "מהו השיעור **היקר** ביותר (בעל המחיר הגבוה ביותר)? בחרו את התשובה הנכונה ביותר.",
      [c("a", "SELECT title FROM Class WHERE price >= ALL (SELECT price FROM Class)"),
       c("b", "SELECT title FROM Class WHERE price = MAX(price)"),
       c("c", "SELECT title FROM Class WHERE price > ALL (SELECT price FROM Class)"),
       c("d", "SELECT MAX(title) FROM Class"),
       t("e", NONE_TEXT)],
      "‏`>= ALL` מחזיר את השיעור שמחירו גדול או שווה לכל המחירים, כלומר המקסימום. ‏`> ALL` לא מחזיר כלום, כי מחיר לא גדול ממש מעצמו. ב-B פונקציית צבירה ב-`WHERE` אסורה. ‏D מחזירה את הכותרת המקסימלית לפי סדר אלפביתי.",
      ctx="sql"),
    q(12, "ב", "sql",
      "לכל סוג שיעור מחושב המחיר המקסימלי של שיעור מאותו סוג. החזירו את הממוצע של ערכים מקסימליים אלו (כלומר ממוצע המקסימומים על פני כל הסוגים).",
      [c("a", "SELECT AVG(maxp) FROM\n  (SELECT type, MAX(price) AS maxp FROM Class GROUP BY type) AS T"),
       c("b", "SELECT AVG(MAX(price)) FROM Class GROUP BY type"),
       c("c", "SELECT AVG(maxp) FROM\n  (SELECT type, MAX(price) AS maxp FROM Class GROUP BY type)"),
       c("d", "SELECT type, AVG(MAX(price)) FROM Class GROUP BY type"),
       t("e", NONE_TEXT)],
      "מחשבים קודם את המקסימום לכל סוג בתת-שאילתא ב-`FROM`, ואז ממוצע עליה. טבלה נגזרת ב-`FROM` חייבת כינוי (`AS T`), ולכן C שגויה. ב-B וב-D יש צבירה מקוננת `AVG(MAX(...))`, שאסורה.",
      ctx="sql"),

    # ---------------- חלק ג׳ — אלגברת היחסים ----------------
    q(13, "ג", "relalg",
      "איזו שאילתה מחזירה את כותרות הפרויקטים שפורסמו על-ידי לקוח מאומת (`is_verified = True`)?",
      [al("a", "Π_{title}(σ_{is_verified=True ∧ project.client_id = client.id}(project × client))"),
       al("b", "Π_{title}(σ_{is_verified=True}(project ⊗ client))"),
       al("c", "Π_{title}(σ_{is_verified=True}(project))"),
       al("d", "Π_{title}(project ⊗ σ_{is_verified=True}(client))"),
       t("e", "אף אחת מהאפשרויות.")],
      "ל-project ול-client אין תכונה בשם משותף (`client_id` מול `id`), ולכן צירוף טבעי ביניהם הוא בעצם מכפלה קרטזית — B ו-D מחזירות את כל הכותרות. צריך מכפלה עם תנאי `project.client_id = client.id`. ב-C אין `is_verified` ב-project.",
      ctx="ra"),
    q(14, "ג", "relalg",
      "מה עושה השאילתה הבאה? בחרו את התשובה הנכונה ביותר.\n$$Π_{freelancer_id}(contract ⊗ bid ⊗ project)$$",
      [t("a", "מחזירה את המזהים של פרילנסרים שהגישו הצעה לפרויקט וחתמו על חוזה לאותו פרויקט, אצל אותו לקוח, וגם באותו אופן עבודה (מרחוק או לא)."),
       t("b", "מחזירה את המזהים של פרילנסרים שגם הגישו הצעה לפרויקט וגם חתמו על חוזה כלשהו."),
       t("c", "מחזירה את המזהים של פרילנסרים שחתמו על חוזה לפרויקט מסוים וגם הגישו הצעה לפרויקט כלשהו, לא בהכרח אותו פרויקט."),
       t("d", "מחזירה את המזהים של פרילנסרים שהגישו הצעה לפרויקט וחתמו על חוזה לאותו פרויקט, אצל אותו לקוח, לא בהכרח באותו אופן עבודה (מרחוק או לא)."),
       t("e", "השאילתה אינה תקינה.")],
      "הצירוף הטבעי משווה את כל התכונות בעלות שם משותף: contract ו-bid לפי `freelancer_id` ו-`project_id`; ‏contract ו-project לפי `project_id`, `client_id` **וגם** `is_remote`. לכן ההצעה, החוזה והפרויקט הם על אותו פרויקט, אצל אותו לקוח ובאותו אופן עבודה.",
      ctx="ra"),
    q(15, "ג", "relalg",
      "נתונים שני יחסים: יחס $R(A, B)$ ויחס $S(B)$. נתבונן ברצף הפעולות הבא באלגברת היחסים:\n"
      "$$T_{1} = Π_{A}(R) × S$$\n$$T_{2} = T_{1} − R$$\n$$T_{3} = Π_{A}(T_{2})$$\n$$Result = Π_{A}(R) − T_{3}$$\n"
      "איזו פעולה מורכבת באלגברת היחסים שקולה מתמטית לתוצאה המתקבלת ב-`Result`?",
      [t("a", "פעולת החילוק — Division: $R ÷ S$"),
       t("b", "פעולת החיתוך — Intersection: $R ∩ S$"),
       t("c", "צירוף טבעי — Natural Join: $R ⊗ S$"),
       t("d", "צירוף חיצוני שמאלי — Left Outer Join"),
       t("e", "הפרש סימטרי — Symmetric Difference: $(R − S) ∪ (S − R)$")],
      "זו ההגדרה של חילוק: ‏T1 = כל הזוגות האפשריים (A, B); ‏T2 = הזוגות החסרים ב-R; ‏T3 = ערכי A שחסר להם B כלשהו מ-S; ‏Result = ערכי A שמופיעים עם **כל** ערכי B ב-S, כלומר $R ÷ S$.",
      ctx="ra"),
    q(16, "ג", "relalg",
      "איזו שאילתה מחזירה את הגיל של הפרילנסר המבוגר ביותר (הגיל המקסימלי בטבלת `freelancer`)?",
      [al("a", "Π_{age}(freelancer) − Π_{f1.age}(σ_{f1.age < f2.age}(ρ_{f1}(freelancer) × ρ_{f2}(freelancer)))"),
       al("b", "Π_{age}(freelancer) − Π_{f1.age}(σ_{f1.age > f2.age}(ρ_{f1}(freelancer) × ρ_{f2}(freelancer)))"),
       al("c", "Π_{f1.age}(σ_{f1.age > f2.age}(ρ_{f1}(freelancer) × ρ_{f2}(freelancer)))"),
       al("d", "Π_{age}(freelancer) − Π_{age}(σ_{freelancer.age < freelancer.age}(freelancer × freelancer))"),
       t("e", "אף אחת מהאפשרויות.")],
      "‏`f1.age < f2.age` מוצא את כל הגילים שיש גיל גדול מהם (כלומר לא מקסימליים). מחסירים אותם מכל הגילים ונשאר המקסימום. ‏B מחזירה את המינימום. ‏C מחזירה כל גיל שאינו המינימלי. ב-D אין שינוי שם, ולכן אי אפשר להבחין בין שני העותקים.",
      ctx="ra"),

    # ---------------- חלק ד׳ — תלויות פונקציונליות ----------------
    q(17, "ד", "fd_norm",
      "איזו מהתלויות הבאות **אינה נובעת** מ-F (כלומר אינה נמצאת בסגור $F^{+}$)?",
      [al("a", "C → D"),
       al("b", "A → C"),
       al("c", "A → E"),
       al("d", "AB → E"),
       al("e", "A → BCDE")],
      "‏C⁺ = {C}, כי C לבדו אינו צד שמאל של אף תלות, ולכן C → D אינה נובעת. לעומת זאת A⁺ = {A, B, C, D, E}, ולכן A → C, ‏A → E, ‏AB → E ו-A → BCDE כולן נובעות.",
      ctx="fd"),
    q(18, "ד", "fd_norm",
      "מהו הסגור של קבוצת התכונות {B}, כלומר {B}⁺, ביחס ל-F?",
      [al("a", "{B, C}"),
       al("b", "{B}"),
       al("c", "{B, C, D}"),
       al("d", "{A, B, C}"),
       al("e", "{A, B, C, D, E}")],
      "מתחילים מ-{B}. ‏B → C מוסיפה את C. אין תלות נוספת שהצד השמאלי שלה מוכל ב-{B, C}, ולכן {B}⁺ = {B, C}.",
      ctx="fd"),
    q(19, "ד", "fd_norm",
      "מהו מפתח קביל של R (ביחס ל-F)?",
      [al("a", "{A}"),
       al("b", "{A, B}"),
       al("c", "{A, C}"),
       al("d", "{B, C}"),
       t("e", "אף אחד מהם")],
      "‏A⁺: ‏A → B, ‏A → D, ואז B → C ו-AC → E, כך ש-A⁺ = {A, B, C, D, E}. ‏A מינימלי (תכונה יחידה), ולכן הוא מפתח קביל. ‏{A, B} ו-{A, C} הם על-מפתחות לא מינימליים, ו-{B, C}⁺ = {B, C}.",
      ctx="fd"),
    q(20, "ד", "fd_norm",
      "בחישוב הכיסוי הקנוני של F, איזו תכונה היא תכונה **עודפת** (תכונה שאפשר למחוק מבלי לשנות את הסגור)?",
      [t("a", "בתלות `AC -> E` התכונה C"),
       t("b", "בתלות `AC -> E` התכונה A"),
       t("c", "בתלות `A -> D` התכונה D"),
       t("d", "בתלות `B -> C` התכונה B"),
       t("e", "אין תכונה עודפת באף תלות")],
      "‏A⁺ (בלי C) = {A, B, C, D, E}, כי A → B → C, ולכן כבר A → E, ו-C עודפת ב-AC → E. ‏A לא עודפת, כי C⁺ = {C} לא מכיל את E. ‏D ו-B הן הצד היחיד של התלות שלהן, ומחיקתן משנה את הסגור.",
      ctx="fd"),
]

data = {
    "examCode": "26B-A",
    "examLabel": "2026 סמסטר ב׳ מועד א׳",
    "year": 2026,
    "examDate": "28.6.2026",
    "course": "61303",
    "contexts": contexts,
    "questions": questions,
}
OUT.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"wrote {OUT} ({len(questions)} questions)")
