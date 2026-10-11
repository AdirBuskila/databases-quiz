/* SQL course · level 5 — GROUP BY and HAVING: the golden order, WHERE vs HAVING, COUNT(DISTINCT), >= vs > */
(function(){
  // small table shown in the lesson and the first questions
  const ENR_S = { name: "Enrollments", pk: ["student_id", "course_id"],
    columns: ["student_id", "course_id", "grade"],
    rows: [
      [1, 10, 90], [1, 11, 80], [2, 10, 60], [2, 12, 88],
      [3, 10, 95], [4, 11, 65], [4, 12, 77], [5, 12, 100],
    ] };

  // the level's full sample database (hidden; the checker runs on it)
  const STUDENTS = { name: "Students", pk: ["student_id"], columns: ["student_id", "first_name"],
    rows: [[1, "Dana"], [2, "Adi"], [3, "Dana"], [4, "Ido"], [5, "Noa"]] };
  const COURSES = { name: "Courses", pk: ["course_id"], columns: ["course_id", "course_name", "department", "credits"],
    rows: [[10, "DB", "CS", 4], [11, "Algo", "CS", 3], [12, "Calculus", "Math", 5], [13, "Linear", "Math", 4], [14, "Stats", "Math", 3]] };
  const ENR = { name: "Enrollments", pk: ["student_id", "course_id"], columns: ["student_id", "course_id", "semester", "grade"],
    rows: [
      [1, 10, "Spring 2024", 90], [1, 11, "Spring 2024", 80], [1, 12, "Spring 2024", 70], [1, 13, "Winter 2024", 85],
      [2, 10, "Spring 2024", 60], [2, 11, "Spring 2024", 75], [2, 12, "Spring 2024", 88], [2, 14, "Spring 2024", 92],
      [3, 12, "Spring 2024", 95], [3, 13, "Spring 2024", 70],
      [4, 10, "Winter 2024", 55], [4, 11, "Winter 2024", 65], [4, 12, "Winter 2024", 77], [4, 13, "Winter 2024", 81],
      [5, 14, "Spring 2024", 100],
    ] };
  const SCORE = { name: "Score", columns: ["from_country", "to_country", "year", "num_points"],
    rows: [
      ["Israel", "Sweden", 2023, 12], ["Norway", "Sweden", 2023, 12], ["Israel", "Italy", 2022, 12],
      ["Sweden", "Israel", 2022, 12], ["Italy", "Sweden", 2022, 8], ["Norway", "Israel", 2023, 10],
    ] };

  const schema = { relations: [
    { schema: "Students([u]student_id[/u], first_name)", meaning: "סטודנט: מזהה ושם פרטי (שמות יכולים לחזור)" },
    { schema: "Courses([u]course_id[/u], course_name, department, credits)", meaning: "קורס: מזהה, שם, מחלקה ונקודות זכות" },
    { schema: "Enrollments([u]student_id[/u], [u]course_id[/u], semester, grade)", meaning: "רישום של סטודנט לקורס בסמסטר, והציון שקיבל" },
  ] };
  const scoreSchema = { relations: [
    { schema: "Score(from_country, to_country, year, num_points)", meaning: "המדינה from_country נתנה ל-to_country מספר נקודות num_points בשנה year" },
  ] };
  const small = { title: "הטבלה Enrollments (נתונים לדוגמה)", tables: [ENR_S] };

  SQL_LEVEL({
    id: "S05", order: 5, icon: "🗂️", title: "GROUP BY ו-HAVING",
    goal: "לקבץ שורות לקבוצות, לסנן לפני הקיבוץ (WHERE) ואחריו (HAVING), ולספור נכון.",
    db: [STUDENTS, COURSES, ENR, SCORE],
    lesson: {
      html: `
<p><code>GROUP BY X</code> אוסף את כל השורות עם אותו ערך X לקבוצה אחת, ומכל קבוצה יוצאת <strong>שורה אחת</strong> בתוצאה. פונקציות כמו <code>COUNT</code>, <code>MAX</code>, <code>AVG</code> מחושבות <strong>לכל קבוצה בנפרד</strong>.</p>
{fig:0}
<div class="lesson-rule">🔑 <strong>שורת הזהב (סדר הביצוע):</strong> <code>FROM</code> ← <code>WHERE</code> ← <code>GROUP BY</code> ← <code>HAVING</code> ← <code>SELECT</code> ← <code>ORDER BY</code>.<br>
מכאן: תנאי על <strong>שורה</strong> (סמסטר, ציון, מחלקה) ← <code>WHERE</code>, לפני הקיבוץ. תנאי על <strong>קבוצה</strong> (תוצאה של COUNT, AVG, SUM) ← <code>HAVING</code>, אחרי הקיבוץ.</div>
{fig:1}
<ul>
  <li><strong>כל עמודה ב-SELECT שאינה בתוך אגרגציה חייבת להופיע ב-GROUP BY.</strong> "לכל X" ← <code>GROUP BY X</code>; "לכל זוג X ו-Y" ← <code>GROUP BY X, Y</code> (21B-A, שאלה 13).</li>
  <li>"כמה <strong>שונים</strong>" ← <code>COUNT(DISTINCT …)</code>. <code>COUNT(col)</code> סופר הופעות, כולל כפילויות (26B-A שאלה 8, 25S-B שאלה 11).</li>
  <li>"<strong>לפחות</strong> 3" ← <code>&gt;= 3</code> · "<strong>יותר</strong> מ-3" ← <code>&gt; 3</code>.</li>
  <li>מקבצים לפי <strong>מזהה</strong>, לא לפי שם: שני סטודנטים בשם Dana יתמזגו לקבוצה אחת (25B-A, שאלה 7).</li>
</ul>
<div class="lesson-trap">⚠️ <strong>אגרגציה ב-WHERE פסולה תמיד:</strong> ‏<code>WHERE AVG(grade) &gt; 80</code> או <code>WHERE COUNT(*) &gt; 3</code>. בזמן ש-WHERE רץ עוד אין קבוצות. ראית COUNT/AVG בתוך WHERE? פסול מיד, בלי לקרוא הלאה (21B-C שאלה 7, 24B-A שאלה 12).</div>`,
      figs: [
        { caption: "שמונה שורות, שלושה קורסים, ולכן שלוש שורות בתוצאה: אחת לכל קבוצה.",
          tables: [ENR_S], sql: "SELECT course_id, COUNT(*) AS n, MAX(grade) AS best\nFROM Enrollments\nGROUP BY course_id",
          result: { columns: ["course_id", "n", "best"], rows: [[10, 3, 95], [11, 2, 80], [12, 3, 100]] } },
        { caption: "קודם WHERE זורק את הציונים מתחת ל-80, אחר כך מקבצים, ואז HAVING משאיר רק קבוצות עם 2 שורות לפחות.",
          tables: [ENR_S], sql: "SELECT course_id, COUNT(*) AS n\nFROM Enrollments\nWHERE grade >= 80\nGROUP BY course_id\nHAVING COUNT(*) >= 2",
          result: { columns: ["course_id", "n"], rows: [[10, 2], [12, 2]] } },
      ],
    },
    questions: [
      { id: "S05-Q1", ctx: small,
        question: "מה מחזירה השאילתה?",
        code: "SELECT course_id, COUNT(*)\nFROM Enrollments\nGROUP BY course_id",
        options: [
          {id:"a", type:"text", value:"8 שורות, שורה לכל רישום, ובכל אחת המספר 1."},
          {id:"b", type:"text", value:"שורה אחת עם המספר 8."},
          {id:"c", type:"text", value:"3 שורות: (10, 3), (11, 2), (12, 3)."},
          {id:"d", type:"text", value:"שגיאה, כי course_id לא נמצא בתוך פונקציית אגרגציה."},
        ], correctId: "c",
        verify: { db: [ENR_S], sql: "SELECT course_id, COUNT(*) FROM Enrollments GROUP BY course_id", expect: [[10, 3], [11, 2], [12, 3]] },
        recap: "GROUP BY = שורה אחת לכל קבוצה",
        explanation: "`GROUP BY course_id` יוצר קבוצה לכל קורס, ומכל קבוצה יוצאת שורה אחת: לקורס 10 שלוש שורות, ל-11 שתיים, ל-12 שלוש. course_id מופיע ב-GROUP BY, ולכן מותר לבחור אותו ב-SELECT ליד ה-COUNT. שורה אחת עם 8 הייתה יוצאת בלי GROUP BY בכלל." },

      { id: "S05-Q2", ctx: small,
        question: "מה מחזירה השאילתה?",
        code: "SELECT course_id, AVG(grade)\nFROM Enrollments\nWHERE grade >= 70\nGROUP BY course_id\nHAVING COUNT(*) >= 2",
        options: [
          {id:"a", type:"text", value:"קורסים 10 ו-12. הממוצע של קורס 10 הוא 92.5."},
          {id:"b", type:"text", value:"קורסים 10 ו-12. הממוצע של קורס 10 הוא 81.67, כי הממוצע מחושב על כל הציונים."},
          {id:"c", type:"text", value:"קורסים 10, 11 ו-12, כי לכל אחד מהם יש לפחות 2 רישומים בטבלה."},
          {id:"d", type:"text", value:"רק קורס 12."},
        ], correctId: "a",
        verify: { db: [ENR_S], sql: "SELECT course_id, AVG(grade) FROM Enrollments WHERE grade >= 70 GROUP BY course_id HAVING COUNT(*) >= 2", expect: [[10, 92.5], [12, 88.333333]] },
        recap: "WHERE מסנן שורות לפני הקיבוץ, HAVING מסנן קבוצות אחריו",
        explanation: "לפי שורת הזהב WHERE רץ **קודם**: הציונים 60 ו-65 נזרקים. נשארים לקורס 10 הציונים 90 ו-95 (ממוצע 92.5), לקורס 11 רק 80, ולקורס 12 הציונים 88, 77, 100. אחרי הקיבוץ HAVING בודק את הקבוצות שנשארו: לקורס 11 נשארה שורה אחת, ולכן הוא נפסל. הממוצע 81.67 היה נכון רק אם WHERE היה רץ אחרי הקיבוץ." },

      { id: "S05-Q3", ctx: schema,
        question: "מי מהשאילתות עונה על הדרישה: \"הצג **רק** את קודי הקורסים (בלי עמודות נוספות) שהציון הממוצע בהם גבוה מ-80\"?",
        code: "-- שאילתה 1:\nSELECT course_id\nFROM Enrollments\nWHERE AVG(grade) > 80\nGROUP BY course_id\n\n-- שאילתה 2:\nSELECT course_id\nFROM Enrollments\nGROUP BY course_id\nHAVING AVG(grade) > 80\n\n-- שאילתה 3:\nSELECT course_id, AVG(grade)\nFROM Enrollments\nGROUP BY course_id\nHAVING AVG(grade) > 80",
        options: [
          {id:"a", type:"text", value:"כל השאילתות נכונות."},
          {id:"b", type:"text", value:"רק שאילתות 2 ו-3 נכונות."},
          {id:"c", type:"text", value:"רק שאילתה 1 נכונה."},
          {id:"d", type:"text", value:"רק שאילתה 2 נכונה."},
          {id:"e", type:"text", value:"כל השאילתות שגויות."},
        ], correctId: "d",
        verify: { sql: "SELECT course_id FROM Enrollments GROUP BY course_id HAVING AVG(grade) > 80", expect: [[12], [14]] },
        recap: "AVG/COUNT בתוך WHERE פסול · עמודה נוספת ב-SELECT = לא מה שביקשו",
        explanation: "שאילתה 1 פסולה: אגרגציה בתוך WHERE, ו-WHERE רץ לפני שיש קבוצות. שאילתה 2 נכונה: קיבוץ לפי קורס ותנאי על הקבוצה ב-HAVING. שאילתה 3 מחזירה **גם** את הממוצע, והדרישה הייתה להציג רק את קודי הקורסים. זה בדיוק המבנה של 21B-C שאלה 7, שם התשובה הייתה \"רק שאילתה 2 נכונה\"." },

      { id: "S05-Q4", ctx: schema,
        question: "רוצים להציג, **לכל זוג של מחלקה וסמסטר**, את מספר הרישומים לקורסים של המחלקה באותו סמסטר. מהו הקטע החסר ____(1)____?",
        code: "SELECT C.department, E.semester, COUNT(*)\nFROM Enrollments E JOIN Courses C ON E.course_id = C.course_id\n____(1)____",
        options: [
          {id:"a", type:"code", value:"GROUP BY C.department"},
          {id:"b", type:"code", value:"GROUP BY C.department, E.semester"},
          {id:"c", type:"code", value:"ORDER BY C.department, E.semester"},
          {id:"d", type:"code", value:"GROUP BY E.semester\nHAVING C.department"},
          {id:"e", type:"text", value:"הקטע מיותר, אין צורך לרשום דבר."},
        ], correctId: "b",
        verify: { sql: "SELECT C.department, E.semester, COUNT(*) FROM Enrollments E JOIN Courses C ON E.course_id = C.course_id GROUP BY C.department, E.semester",
          expect: [["CS", "Spring 2024", 4], ["Math", "Spring 2024", 6], ["CS", "Winter 2024", 2], ["Math", "Winter 2024", 3]] },
        recap: "\"לכל זוג X ו-Y\" = GROUP BY X, Y",
        explanation: "\"לכל זוג\" = קבוצה לכל צירוף של מחלקה וסמסטר, ולכן `GROUP BY C.department, E.semester`. גם הכלל אומר זאת: שתי העמודות ב-SELECT שאינן בתוך אגרגציה חייבות להופיע ב-GROUP BY. קיבוץ לפי מחלקה בלבד משאיר את semester בלי קבוצה. ORDER BY רק ממיין ולא מקבץ. זו שאלה 13 של 21B-A (\"לכל זוג של עיר ותחביב\")." },

      { id: "S05-Q5", ctx: schema,
        question: "איזו מהשאילתות מחזירה את שמות הסטודנטים שנרשמו **ליותר מ-3 קורסים** בסמסטר `'Spring 2024'`?",
        options: [
          {id:"a", type:"code", value:"SELECT S.first_name\nFROM Students S JOIN Enrollments E ON S.student_id = E.student_id\nWHERE E.semester = 'Spring 2024'\nGROUP BY S.first_name\nHAVING COUNT(E.course_id) > 3"},
          {id:"b", type:"code", value:"SELECT S.first_name\nFROM Students S JOIN Enrollments E ON S.student_id = E.student_id\nWHERE E.semester = 'Spring 2024' AND COUNT(*) > 3\nGROUP BY S.student_id, S.first_name"},
          {id:"c", type:"code", value:"SELECT S.first_name\nFROM Students S JOIN Enrollments E ON S.student_id = E.student_id\nWHERE E.semester = 'Spring 2024'\nGROUP BY S.student_id, S.first_name\nHAVING COUNT(E.course_id) > 3"},
          {id:"d", type:"code", value:"SELECT S.first_name\nFROM Students S JOIN Enrollments E ON S.student_id = E.student_id\nGROUP BY S.student_id, S.first_name\nHAVING COUNT(E.course_id) > 3 AND E.semester = 'Spring 2024'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "c",
        verify: { ref: "SELECT S.first_name FROM Students S JOIN Enrollments E ON S.student_id = E.student_id WHERE E.semester = 'Spring 2024' GROUP BY S.student_id, S.first_name HAVING COUNT(E.course_id) > 3",
          same: ["c"], differ: ["a", "b"] },
        recap: "תנאי שורה (סמסטר) ב-WHERE · מקבצים לפי מזהה, לא לפי שם",
        explanation: "הסמסטר הוא תנאי על **שורה**, ולכן הוא ב-WHERE, לפני הקיבוץ. התנאי \"יותר מ-3\" הוא על **הקבוצה**, ולכן ב-HAVING. אפשרות a מקבצת לפי `first_name`, וכך שני סטודנטים בשם Dana מתמזגים לקבוצה אחת (3 + 2 = 5 רישומים) ונכנסים בטעות. זו המלכודת של 25B-A שאלה 7. אפשרות b שמה COUNT בתוך WHERE, וזה פסול. אפשרות d בודקת את הסמסטר ב-HAVING, אבל semester לא נמצא ב-GROUP BY ואינו תכונה של הקבוצה. יש מערכות (למשל SQLite) שמקבלות את d בלי שגיאה, אבל ב-SQL תקני ולפי הקורס היא שגויה." },

      { id: "S05-Q6", ctx: schema,
        question: "איזו שאילתה מחזירה את מזהי הסטודנטים שנרשמו לקורסים **מיותר ממחלקה אחת** (כלומר ממספר מחלקות שונות)?",
        options: [
          {id:"a", type:"code", value:"SELECT student_id\nFROM Enrollments JOIN Courses USING(course_id)\nGROUP BY student_id\nHAVING COUNT(department) > 1"},
          {id:"b", type:"code", value:"SELECT student_id\nFROM Enrollments JOIN Courses USING(course_id)\nGROUP BY student_id\nHAVING COUNT(DISTINCT department) > 1"},
          {id:"c", type:"code", value:"SELECT student_id\nFROM Enrollments JOIN Courses USING(course_id)\nWHERE COUNT(DISTINCT department) > 1\nGROUP BY student_id"},
          {id:"d", type:"code", value:"SELECT student_id, COUNT(department)\nFROM Courses\nGROUP BY student_id\nHAVING COUNT(department) > 1"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "b",
        verify: { ref: "SELECT student_id FROM Enrollments JOIN Courses USING(course_id) GROUP BY student_id HAVING COUNT(DISTINCT department) > 1",
          same: ["b"], differ: ["a", "c", "d"] },
        recap: "\"שונים\" = COUNT(DISTINCT)",
        explanation: "\"מיותר ממחלקה אחת\" = מספר המחלקות **השונות** גדול מ-1, ולכן `COUNT(DISTINCT department)`. ‏`COUNT(department)` סופר רישומים: סטודנט שלקח שני קורסים באותה מחלקה ייספר פעמיים וייכנס בטעות. בנתונים לדוגמה זה סטודנט 3, שלקח שני קורסי Math. אפשרות c שמה אגרגציה ב-WHERE, ואפשרות d מחפשת את student_id בטבלה Courses, שבה אין עמודה כזו. זו שאלה 8 של 26B-A." },

      { id: "S05-Q7", ctx: scoreSchema,
        question: "כתוב שאילתה שמחזירה לכל מדינה כמה פעמים היא **קיבלה** 12 נקודות. בחרו את התשובה הנכונה ביותר.",
        options: [
          {id:"a", type:"code", value:"SELECT from_country, COUNT(*)\nFROM Score\nWHERE num_points = 12\nGROUP BY from_country"},
          {id:"b", type:"code", value:"SELECT to_country, SUM(num_points)\nFROM Score\nWHERE num_points = 12\nGROUP BY to_country"},
          {id:"c", type:"code", value:"SELECT to_country, COUNT(*)\nFROM Score\nGROUP BY to_country\nHAVING num_points = 12"},
          {id:"d", type:"code", value:"SELECT to_country, COUNT(*)\nFROM Score\nWHERE num_points = 12\nGROUP BY to_country"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "d",
        verify: { ref: "SELECT to_country, COUNT(*) FROM Score WHERE num_points = 12 GROUP BY to_country", same: ["d"], differ: ["a", "b"] },
        recap: "\"קיבלה\" = to_country · \"נתנה\" = from_country · \"כמה פעמים\" = COUNT",
        explanation: "\"קיבלה\" ← `to_country`. אפשרות a סופרת כמה פעמים כל מדינה **נתנה** 12, ההחלפה של 23B-A שאלה 10. ‏\"כמה פעמים\" ← `COUNT(*)`, בעוד אפשרות b סוכמת נקודות (מדינה שקיבלה 12 פעמיים תקבל 24). באפשרות c התנאי `num_points = 12` הוא תנאי על **שורה**, ולכן צריך להיות ב-WHERE ולא ב-HAVING. יש מערכות שמקבלות את c בלי שגיאה ומחזירות שם אקראי, אבל ב-SQL תקני ולפי הקורס היא שגויה." },

      { id: "S05-Q8", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הקורסים שנרשמו אליהם **לפחות 3** סטודנטים שונים?",
        options: [
          {id:"a", type:"code", value:"SELECT C.course_name\nFROM Courses C JOIN Enrollments E ON C.course_id = E.course_id\nGROUP BY C.course_id, C.course_name\nHAVING COUNT(DISTINCT E.student_id) > 3"},
          {id:"b", type:"code", value:"SELECT C.course_name\nFROM Courses C JOIN Enrollments E ON C.course_id = E.course_id\nGROUP BY C.course_id, C.course_name\nHAVING COUNT(DISTINCT E.student_id) >= 3"},
          {id:"c", type:"code", value:"SELECT C.course_name, COUNT(*)\nFROM Courses C JOIN Enrollments E ON C.course_id = E.course_id\nHAVING COUNT(*) >= 3"},
          {id:"d", type:"code", value:"SELECT C.course_name\nFROM Courses C JOIN Enrollments E ON C.course_id = E.course_id\nWHERE COUNT(DISTINCT E.student_id) >= 3\nGROUP BY C.course_name"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "b",
        verify: { ref: "SELECT C.course_name FROM Courses C JOIN Enrollments E ON C.course_id = E.course_id GROUP BY C.course_id, C.course_name HAVING COUNT(DISTINCT E.student_id) >= 3",
          same: ["b"], differ: ["a", "c", "d"] },
        recap: "\"לפחות 3\" = >= 3 · \"יותר מ-3\" = > 3",
        explanation: "\"לפחות 3\" כולל את 3, ולכן `>= 3`. ‏`> 3` (אפשרות a) מפספס קורסים עם בדיוק 3 סטודנטים. זה המסיח היחיד בשתי שאלות מבחן. אפשרות c פסולה: `course_name` מופיע ליד `COUNT(*)` בלי GROUP BY, ו-HAVING בלי GROUP BY פסול לפי הקורס. אפשרות d שמה COUNT ב-WHERE. ‏`COUNT(DISTINCT E.student_id)` עונה על \"סטודנטים **שונים**\" (25S-B, שאלה 11)." },
    ],
  });
})();
