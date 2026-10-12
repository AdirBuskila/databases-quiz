/* SQL course · level 3 — JOIN: ON / USING, comma = Cartesian product, the full join chain, wrong-id joins */
(function(){
  const STUDENTS = { name: "Students", pk: ["student_id"], columns: ["student_id", "first_name", "city"],
    rows: [ [1, "Dana", "Haifa"], [2, "Adi", "Tel Aviv"], [3, "Ido", "Eilat"], [4, "Nataf", "Eilat"], [5, "Yael", "Haifa"] ] };
  const LECTURERS = { name: "Lecturers", pk: ["lecturer_id"], columns: ["lecturer_id", "l_name"],
    rows: [ [10, "Cohen"], [20, "Levi"], [30, "Mizrahi"] ] };
  const COURSES = { name: "Courses", pk: ["course_id"], columns: ["course_id", "course_name", "department", "credits", "lecturer_id"],
    rows: [ [101, "DB", "CS", 4, 10], [102, "Algo", "CS", 3, 20], [103, "Calculus", "Math", 5, 30] ] };
  const ENROLL = { name: "Enrollments", pk: ["enrollment_id"], columns: ["enrollment_id", "student_id", "course_id", "grade"],
    rows: [ [1001, 1, 101, 90], [1002, 1, 103, 72], [1003, 2, 101, 85], [1004, 3, 102, 64], [1005, 2, 103, 95], [1006, 5, 101, 77] ] };
  const DB = [STUDENTS, LECTURERS, COURSES, ENROLL];
  const schema = { relations: [
    { schema: "Students([u]student_id[/u], first_name, city)", meaning: "סטודנט" },
    { schema: "Enrollments([u]enrollment_id[/u], student_id, course_id, grade)", meaning: "רישום של סטודנט לקורס, עם הציון" },
    { schema: "Courses([u]course_id[/u], course_name, department, credits, lecturer_id)", meaning: "קורס, והמרצה שמלמד אותו" },
    { schema: "Lecturers([u]lecturer_id[/u], l_name)", meaning: "מרצה" },
  ] };
  const twoTables = { title: "שתי טבלאות (נתונים לדוגמה)", tables: [STUDENTS, ENROLL] };

  SQL_LEVEL({
    id: "S03", order: 3, icon: "🔗", title: "JOIN: חיבור טבלאות",
    goal: "לחבר טבלאות נכון: ON ו-USING, שרשרת מלאה עד הטבלה שמסננים לפיה, ולזהות חיבור לפי המזהה הלא נכון.",
    db: DB,
    lesson: {
      html: `
<p>המידע מפוזר בכמה טבלאות: שם הסטודנט ב-<code>Students</code>, הקורס ב-<code>Courses</code>, ומי רשום לאן ב-<code>Enrollments</code>. <strong>JOIN</strong> מצמיד שורות מטבלאות שונות לפי עמודה משותפת (מפתח זר ← מפתח ראשי).</p>
{fig:0}
<ul>
  <li><code>A JOIN B ON A.x = B.x</code>: מחברים לפי תנאי מפורש.</li>
  <li><code>A JOIN B USING(x)</code>: אותו דבר, כשלעמודה <strong>אותו שם</strong> בשתי הטבלאות.</li>
  <li><code>A NATURAL JOIN B</code>: מחבר אוטומטית (בלי ON) לפי <strong>כל</strong> העמודות שיש להן אותו שם בשתי הטבלאות.</li>
  <li><strong>כינוי (alias):</strong> <code>FROM Students S</code> (או <code>Students AS S</code>) נותן לטבלה שם קצר, ומעכשיו כותבים <code>S.first_name</code>. זו אותה טבלה, לא עותק נוסף. כינוי שלא הוגדר ב-FROM (למשל <code>L.l_name</code> בלי <code>JOIN Lecturers L</code>) הוא שגיאה. ו-<code>SELECT *</code> = כל העמודות.</li>
  <li><code>FROM A, B</code> (פסיק) = <strong>מכפלה קרטזית</strong>: כל שורה של A עם כל שורה של B (5 × 6 = 30 שורות). פסיק עובד רק יחד עם תנאי חיבור ב-WHERE <strong>לכל זוג טבלאות</strong>.</li>
  <li>INNER JOIN משאיר רק שורות <strong>שיש להן התאמה</strong>: Nataf לא רשומה לאף קורס, ולכן היא נעלמת.</li>
  <li><strong>צירוף טבלה לעצמה (self-join)</strong> מותר: <code>FROM Students S1 JOIN Students S2 ON S1.city = S2.city</code> פותח את אותה טבלה פעמיים בשני כינויים, וכל שורה בתוצאה היא זוג סטודנטים מאותה עיר. כל כינוי יכול לקבל ב-WHERE תנאי משלו.</li>
</ul>
<div class="lesson-rule">🔑 <strong>שרשרת מלאה:</strong> אם מסננים לפי שם המרצה (<code>l_name</code> ב-Lecturers), והשם שבוחרים נמצא ב-Students, חייבים לעבור דרך <strong>כל</strong> הטבלאות שביניהן: Students ← Enrollments ← Courses ← Lecturers. עצירה באמצע, בלי הטבלה שבה יושבת עמודת הסינון, היא המסיח של 24B-A שאלה 6 ו-25S-B שאלה 8.</div>
<div class="lesson-trap">⚠️ <strong>חיבור לפי המזהה הלא נכון</strong> הוא המסיח הכי שקט: <code>ON E.enrollment_id = C.course_id</code> נראה תקין, אבל משווה שני מזהים שאין ביניהם קשר (25C-A, שאלה 8). בכל ON בדוק ששני הצדדים מתארים <strong>אותו דבר</strong>. ועוד: <code>NATURAL JOIN</code> בין טבלאות בלי עמודה משותפת (Students ו-Courses) הוא מכפלה קרטזית (25S-B, שאלה 5).</div>`,
      figs: [
        { caption: "כל רישום מקבל את שם הסטודנט שלו. ל-Nataf אין רישום, ולכן היא לא בתוצאה.",
          tables: [STUDENTS, ENROLL], sql: "SELECT first_name, course_id, grade\nFROM Students JOIN Enrollments USING(student_id)",
          result: { name: "תוצאה", columns: ["first_name", "course_id", "grade"],
            rows: [["Dana", 101, 90], ["Dana", 103, 72], ["Adi", 101, 85], ["Ido", 102, 64], ["Adi", 103, 95], ["Yael", 101, 77]] } },
      ],
    },
    questions: [
      { id: "S03-Q1", ctx: twoTables,
        question: "כמה שורות מחזירה השאילתה?",
        code: "SELECT *\nFROM Students, Enrollments",
        options: [
          {id:"a", type:"text", value:"6, שורה לכל רישום"},
          {id:"b", type:"text", value:"30"},
          {id:"c", type:"text", value:"11"},
          {id:"d", type:"text", value:"5, שורה לכל סטודנט"},
        ], correctId: "b",
        verify: { sql: "SELECT COUNT(*) FROM Students, Enrollments", expect: [[30]] },
        recap: "פסיק בלי תנאי חיבור = מכפלה קרטזית (כל שורה עם כל שורה)",
        explanation: "פסיק ב-FROM בלי תנאי חיבור הוא **מכפלה קרטזית**: כל אחד מ-5 הסטודנטים מוצמד לכל אחד מ-6 הרישומים, כלומר 5 × 6 = **30** שורות, רובן חסרות משמעות (Dana עם הרישום של Ido). כדי לקבל 6 שורות צריך `WHERE Students.student_id = Enrollments.student_id`." },

      { id: "S03-Q2", ctx: twoTables,
        question: "מה נכון לגבי תוצאת השאילתה?",
        code: "SELECT first_name, course_id\nFROM Students JOIN Enrollments USING(student_id)",
        options: [
          {id:"a", type:"text", value:"5 שורות, שורה אחת לכל סטודנט."},
          {id:"b", type:"text", value:"7 שורות. Nataf מופיעה עם course_id ריק (NULL)."},
          {id:"c", type:"text", value:"6 שורות. Nataf לא מופיעה, ו-Dana ו-Adi מופיעים פעמיים."},
          {id:"d", type:"text", value:"30 שורות, כי USING לא מגביל את החיבור."},
        ], correctId: "c",
        verify: { sql: "SELECT first_name, course_id FROM Students JOIN Enrollments USING(student_id)",
          expect: [["Dana", 101], ["Dana", 103], ["Adi", 101], ["Ido", 102], ["Adi", 103], ["Yael", 101]] },
        recap: "INNER JOIN = שורה לכל התאמה, ומי שאין לו התאמה נעלם",
        explanation: "JOIN יוצר שורה **לכל רישום** שיש לו סטודנט תואם: 6 שורות. Dana ו-Adi רשומים לשני קורסים, ולכן מופיעים פעמיים. Nataf לא רשומה לאף קורס, ולכן היא **נעלמת**: INNER JOIN לא ממציא שורות עם NULL. רק LEFT JOIN היה משאיר אותה עם NULL (שלב 7)." },

      { id: "S03-Q3", ctx: schema,
        question: "איזו שאילתה מציגה את שם הסטודנט ואת **שם הקורס** לכל רישום?",
        options: [
          {id:"a", type:"code", value:"SELECT S.first_name, C.course_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.enrollment_id = C.course_id"},
          {id:"b", type:"code", value:"SELECT first_name, course_name\nFROM Students, Enrollments, Courses\nWHERE Students.student_id = Enrollments.student_id"},
          {id:"c", type:"code", value:"SELECT S.first_name, C.course_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id"},
          {id:"d", type:"code", value:"SELECT S.first_name, C.course_name\nFROM Students S\nJOIN Courses C ON S.student_id = C.course_id"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { ref: "SELECT S.first_name, C.course_name FROM Students S JOIN Enrollments E ON S.student_id = E.student_id JOIN Courses C ON E.course_id = C.course_id", same: ["c"], differ: ["a", "b", "d"] },
        recap: "כל ON מחבר מפתח זר למפתח שהוא מצביע עליו",
        explanation: "סטודנט ← רישום לפי `student_id`, רישום ← קורס לפי `course_id`. אפשרות a מחברת לפי `enrollment_id = course_id`, שני מזהים שאין ביניהם קשר (המסיח של 25C-A שאלה 8), ולכן מחזירה 0 שורות. ב-b יש שלוש טבלאות בפסיק ותנאי חיבור אחד בלבד, כך שהקורסים מוכפלים קרטזית. d מדלגת על Enrollments ומשווה מזהה סטודנט למזהה קורס." },

      { id: "S03-Q4", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הסטודנטים שרשומים לקורס **שמלמד המרצה `'Levi'`**?",
        options: [
          {id:"a", type:"code", value:"SELECT DISTINCT S.first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE L.l_name = 'Levi'"},
          {id:"b", type:"code", value:"SELECT DISTINCT S.first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nJOIN Lecturers L ON C.lecturer_id = L.lecturer_id\nWHERE L.l_name = 'Levi'"},
          {id:"c", type:"code", value:"SELECT DISTINCT S.first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id, Lecturers L\nWHERE L.l_name = 'Levi'"},
          {id:"d", type:"code", value:"SELECT DISTINCT S.first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Lecturers L ON E.course_id = L.lecturer_id\nWHERE L.l_name = 'Levi'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: { ref: "SELECT DISTINCT S.first_name FROM Students S JOIN Enrollments E ON S.student_id = E.student_id JOIN Courses C ON E.course_id = C.course_id JOIN Lecturers L ON C.lecturer_id = L.lecturer_id WHERE L.l_name = 'Levi'", same: ["b"], differ: ["a", "c", "d"] },
        recap: "שרשרת מלאה: עד הטבלה שבה יושבת עמודת הסינון",
        explanation: "`l_name` נמצא ב-Lecturers, ולכן השרשרת חייבת להגיע אליה: Students ← Enrollments ← Courses ← Lecturers. אפשרות a עוצרת ב-Courses ומשתמשת ב-`L` בלי לצרף אותה (שגיאה, כמו 24B-A שאלה 6). ב-c ה-Lecturers מצורף בפסיק בלי תנאי, ולכן כל סטודנט רשום עובר את הסינון. d מחברת `course_id` ל-`lecturer_id`." },

      { id: "S03-Q5", ctx: schema,
        question: "נתונות שתי שאילתות. מה נכון?",
        code: "-- שאילתה 1:\nSELECT first_name, grade\nFROM Students JOIN Enrollments USING(student_id)\n\n-- שאילתה 2:\nSELECT S.first_name, E.grade\nFROM Students S JOIN Enrollments E ON S.student_id = E.student_id",
        options: [
          {id:"a", type:"text", value:"שתי השאילתות מחזירות בדיוק אותן שורות."},
          {id:"b", type:"text", value:"רק שאילתה 1 נכונה. ON דורש שמות עמודות שונים בשתי הטבלאות."},
          {id:"c", type:"text", value:"רק שאילתה 2 נכונה. USING מחזיר מכפלה קרטזית."},
          {id:"d", type:"text", value:"שאילתה 2 מחזירה יותר שורות, כי הכינויים S ו-E יוצרים עותק נוסף של כל טבלה."},
        ], correctId: "a",
        verify: { sql: "SELECT S.first_name, E.grade FROM Students S JOIN Enrollments E ON S.student_id = E.student_id",
          expect: [["Dana", 90], ["Dana", 72], ["Adi", 85], ["Ido", 64], ["Adi", 95], ["Yael", 77]] },
        recap: "USING(x) = ON A.x = B.x כשלעמודה אותו שם בשתי הטבלאות",
        explanation: "`USING(student_id)` הוא קיצור של `ON S.student_id = E.student_id`, ומותר כשלעמודה **אותו שם** בשתי הטבלאות (כאן כן). שתי השאילתות מחזירות את אותן 6 שורות. כינוי (`AS S` או רק `S`) הוא שם קצר לאותה טבלה, לא עותק נוסף." },

      { id: "S03-Q6", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הקורסים שרשומים אליהם סטודנטים מ-`'Haifa'`?",
        options: [
          {id:"a", type:"code", value:"SELECT DISTINCT course_name\nFROM Students NATURAL JOIN Courses\nWHERE city = 'Haifa'"},
          {id:"b", type:"code", value:"SELECT DISTINCT course_name\nFROM Students, Enrollments, Courses\nWHERE city = 'Haifa'"},
          {id:"c", type:"code", value:"SELECT DISTINCT course_name\nFROM Courses JOIN Enrollments USING(course_id)\nWHERE city = 'Haifa'"},
          {id:"d", type:"code", value:"SELECT DISTINCT C.course_name\nFROM Students S\nJOIN Enrollments E USING(student_id)\nJOIN Courses C USING(course_id)\nWHERE S.city = 'Haifa'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { ref: "SELECT DISTINCT C.course_name FROM Students S JOIN Enrollments E USING(student_id) JOIN Courses C USING(course_id) WHERE S.city = 'Haifa'", same: ["d"], differ: ["a", "b", "c"] },
        recap: "NATURAL JOIN בלי עמודה משותפת = מכפלה קרטזית",
        explanation: "רק d עוברת דרך Enrollments בשני תנאי חיבור, ומחזירה DB ו-Calculus (הקורסים של Dana ו-Yael). ל-Students ול-Courses אין עמודה משותפת, ולכן `NATURAL JOIN` ביניהן הוא מכפלה קרטזית שמחזירה את **כל** הקורסים (25S-B שאלה 5). ב-b אין אף תנאי חיבור. ב-c העמודה `city` לא קיימת ב-Courses או ב-Enrollments, ולכן השאילתה נכשלת." },

      { id: "S03-Q7", ctx: { title: "הטבלה Enrollments (נתונים לדוגמה)", tables: [ENROLL] },
        question: "מה מחזירה השאילתה?",
        code: "SELECT E1.student_id\nFROM Enrollments E1 JOIN Enrollments E2\n     ON E1.student_id = E2.student_id\nWHERE E1.course_id = 101 AND E2.course_id = 103",
        options: [
          {id:"a", type:"text", value:"סטודנטים שרשומים לקורס 101 או לקורס 103: 1, 2, 5."},
          {id:"b", type:"text", value:"סטודנטים שרשומים גם לקורס 101 וגם לקורס 103: 1, 2."},
          {id:"c", type:"text", value:"סטודנטים שרשומים ל-101 אבל לא ל-103: 5."},
          {id:"d", type:"text", value:"השאילתה שגויה: אי אפשר לחבר טבלה לעצמה."},
        ], correctId: "b",
        verify: { sql: "SELECT E1.student_id FROM Enrollments E1 JOIN Enrollments E2 ON E1.student_id = E2.student_id WHERE E1.course_id = 101 AND E2.course_id = 103", expect: [[1], [2]] },
        recap: "self-join: שני עותקים של אותה טבלה בכינויים שונים, כל אחד מסונן לחוד",
        explanation: "E1 ו-E2 הם שני \"עותקים\" של אותה טבלה (self-join). השורה נשארת רק אם **אותו סטודנט** מופיע ב-E1 עם 101 וב-E2 עם 103: סטודנטים 1 (Dana) ו-2 (Adi). Yael (5) רשומה רק ל-101. כך פותרים \"שרשרת דורות\" ב-21B-C, שאלות 8–9: אותו יחס כמה פעמים תחת כינויים שונים." },

      { id: "S03-Q8", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות המרצים שמלמדים קורס שהסטודנט `'Adi'` רשום אליו?",
        options: [
          {id:"a", type:"code", value:"SELECT DISTINCT L.l_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nJOIN Lecturers L ON C.lecturer_id = L.lecturer_id\nWHERE S.first_name = 'Adi'"},
          {id:"b", type:"code", value:"SELECT DISTINCT L.l_name\nFROM Enrollments E\nJOIN Courses C ON E.course_id = C.course_id\nJOIN Lecturers L ON C.lecturer_id = L.lecturer_id\nWHERE E.first_name = 'Adi'"},
          {id:"c", type:"code", value:"SELECT DISTINCT L.l_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nJOIN Lecturers L ON C.course_id = L.lecturer_id\nWHERE S.first_name = 'Adi'"},
          {id:"d", type:"code", value:"SELECT DISTINCT L.l_name\nFROM Students S, Lecturers L\nWHERE S.first_name = 'Adi'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "a",
        verify: { ref: "SELECT DISTINCT L.l_name FROM Students S JOIN Enrollments E ON S.student_id = E.student_id JOIN Courses C ON E.course_id = C.course_id JOIN Lecturers L ON C.lecturer_id = L.lecturer_id WHERE S.first_name = 'Adi'", same: ["a"], differ: ["b", "c", "d"] },
        recap: "שרשרת מלאה מהטבלה של הסינון (Students) עד הטבלה של הפלט (Lecturers)",
        explanation: "מסננים לפי שם הסטודנט (ב-Students) ומציגים שם מרצה (ב-Lecturers), ולכן צריך את כל השרשרת: Students ← Enrollments ← Courses ← Lecturers. התוצאה: Cohen ו-Mizrahi. אפשרות b מוותרת על Students ומחפשת את `first_name` ב-Enrollments, שם הוא לא קיים. c מחברת `course_id` ל-`lecturer_id`. d היא מכפלה קרטזית שמחזירה את כל המרצים." },
    ],
  });
})();
