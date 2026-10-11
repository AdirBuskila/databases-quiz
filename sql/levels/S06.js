/* SQL course · level 6 — subqueries and extremum: IN, = (SELECT MAX), >= ALL, NOT EXISTS, MAX(COUNT) */
(function(){
  const EMP = { name: "Employees", pk: ["emp_id"], columns: ["emp_id", "name", "dept", "salary", "age"],
    rows: [
      [1, "Dana", "R&D", 9000, 30],
      [2, "Adi", "R&D", 12000, 41],
      [3, "Ido", "Sales", 12000, 25],
      [4, "Noa", "Sales", 7000, 25],
      [5, "Gal", "HR", 4000, 52],
    ] };
  const ASG = { name: "Assignments", pk: ["emp_id", "project_id"], columns: ["emp_id", "project_id"],
    rows: [[1, 100], [1, 101], [1, 102], [2, 100], [2, 103], [3, 101], [3, 102], [3, 103], [4, 100]] };
  const PRJ = { name: "Projects", pk: ["project_id"], columns: ["project_id", "title", "budget"],
    rows: [[100, "Apollo", 50000], [101, "Hermes", 80000], [102, "Zeus", 80000], [103, "Atlas", 20000]] };
  // the VIEW numProj of Q7, materialized so the checker can run the options against it
  const NUMPROJ = { name: "numProj", columns: ["emp_id", "n"], rows: [[1, 3], [2, 2], [3, 3], [4, 1]] };

  const schema = { relations: [
    { schema: "Employees([u]emp_id[/u], name, dept, salary, age)", meaning: "עובד: מזהה, שם, מחלקה, שכר וגיל" },
    { schema: "Projects([u]project_id[/u], title, budget)", meaning: "פרויקט: מזהה, שם ותקציב" },
    { schema: "Assignments([u]emp_id[/u], [u]project_id[/u])", meaning: "שיבוץ של עובד לפרויקט" },
  ] };
  const empData = { title: "הטבלה Employees (נתונים לדוגמה)", tables: [EMP] };

  SQL_LEVEL({
    id: "S06", order: 6, icon: "🏔️", title: "תת-שאילתות וקיצון",
    goal: "למצוא את המקסימום והמינימום בשלוש הדרכים הכשרות, ולזהות את המסיחים הפסולים.",
    db: [EMP, ASG, PRJ],
    lesson: {
      html: `
<p>תת-שאילתה היא שאילתה בתוך שאילתה. <code>WHERE x IN (SELECT …)</code> בודק אם x נמצא בתוצאה של תת-השאילתה, ו-<code>WHERE x = (SELECT MAX(x) …)</code> משווה לערך יחיד.</p>
{fig:0}
<div class="lesson-rule">🔑 <strong>שלוש הדרכים הכשרות למקסימום</strong> (מינימום: הופכים את הסימן):<br>
1. <code>WHERE x = (SELECT MAX(x) FROM T)</code><br>
2. <code>WHERE x &gt;= ALL (SELECT x FROM T)</code><br>
3. <code>WHERE NOT EXISTS (SELECT * FROM T t2 WHERE t2.x &gt; t1.x)</code>, כלומר "לא קיים מישהו גדול ממני".<br>
שלושתן מחזירות <strong>את כל</strong> מי שבשיא, גם כשיש תיקו.</div>
{fig:1}
<ul>
  <li>ב-NOT EXISTS הסימן בתת-השאילתה מראה <strong>מי נפסל</strong>: ‏<code>t2.x &lt; t1.x</code> פוסל את מי שיש קטן ממנו, ולכן נשאר המינימום (21B-A, שאלה 10).</li>
  <li><code>&gt; ALL</code> (בלי שווה) מחזיר <strong>כלום</strong>: אף ערך לא גדול מעצמו (26B-A, שאלה 11).</li>
</ul>
<div class="lesson-trap">⚠️ <strong>שלושה מסיחים שחוזרים כמעט מילה במילה:</strong><br>
• <code>SELECT MAX(salary), name FROM Employees</code> בלי GROUP BY: פסול. ‏MAX מחזיר ערך אחד ו-name ערך לכל שורה (21B-A שאלה 12, 22B-A שאלה 8, 21B-C שאלה 5).<br>
• <code>WHERE salary = MAX(salary)</code>: אגרגציה ב-WHERE, פסול.<br>
• <code>MAX(COUNT(…))</code>: אגרגציה על אגרגציה, פסול. התחליף: <code>HAVING COUNT(…) &gt;= ALL (SELECT COUNT(…) … GROUP BY …)</code> (23B-A שאלה 9, 23B-A2 שאלה 8).</div>`,
      figs: [
        { caption: "יש תיקו בשכר המקסימלי, ושני העובדים חוזרים.",
          tables: [EMP], sql: "SELECT name, salary\nFROM Employees\nWHERE salary = (SELECT MAX(salary) FROM Employees)",
          result: { columns: ["name", "salary"], rows: [["Adi", 12000], ["Ido", 12000]] } },
        { caption: "\"לא קיים עובד מבוגר ממני\": נשאר רק המבוגר ביותר.",
          tables: [EMP], sql: "SELECT E1.name, E1.age\nFROM Employees E1\nWHERE NOT EXISTS (SELECT *\n                  FROM Employees E2\n                  WHERE E2.age > E1.age)",
          result: { columns: ["name", "age"], rows: [["Gal", 52]] } },
      ],
    },
    questions: [
      { id: "S06-Q1", ctx: { title: "הטבלאות Employees ו-Assignments (נתונים לדוגמה)", tables: [EMP, ASG] },
        question: "מה מחזירה השאילתה?",
        code: "SELECT name\nFROM Employees\nWHERE emp_id IN (SELECT emp_id\n                 FROM Assignments\n                 WHERE project_id = 100)",
        options: [
          {id:"a", type:"text", value:"Dana, Adi, Noa"},
          {id:"b", type:"text", value:"Ido, Gal"},
          {id:"c", type:"text", value:"Dana בלבד"},
          {id:"d", type:"text", value:"שגיאה: אסור תת-שאילתה בתוך WHERE"},
        ], correctId: "a",
        verify: { sql: "SELECT name FROM Employees WHERE emp_id IN (SELECT emp_id FROM Assignments WHERE project_id = 100)", expect: [["Dana"], ["Adi"], ["Noa"]] },
        recap: "IN (SELECT …) = נמצא בתוצאה של תת-השאילתה",
        explanation: "תת-השאילתה מחזירה את העובדים המשובצים לפרויקט 100: ‏1, 2, 4. השאילתה החיצונית מחזירה את שמות העובדים שהמזהה שלהם **נמצא** ברשימה: Dana, Adi ו-Noa. אפשרות b היא התשובה של `NOT IN`." },

      { id: "S06-Q2", ctx: empData,
        question: "מה מחזירה השאילתה?",
        code: "SELECT name\nFROM Employees\nWHERE salary = (SELECT MAX(salary) FROM Employees)",
        options: [
          {id:"a", type:"text", value:"רק Adi, העובד הראשון עם השכר המקסימלי."},
          {id:"b", type:"text", value:"את המספר 12000."},
          {id:"c", type:"text", value:"Adi ו-Ido, שני העובדים עם השכר המקסימלי."},
          {id:"d", type:"text", value:"שגיאה, כי תת-השאילתה מחזירה ערך ולא טבלה."},
        ], correctId: "c",
        verify: { sql: "SELECT name FROM Employees WHERE salary = (SELECT MAX(salary) FROM Employees)", expect: [["Adi"], ["Ido"]] },
        recap: "= (SELECT MAX) מחזיר את כל מי שבשיא, כולל תיקו",
        explanation: "תת-השאילתה מחזירה ערך יחיד, 12000, וכל עובד שהשכר שלו שווה לו נכנס לתוצאה. יש תיקו, ולכן **שניהם** חוזרים: Adi ו-Ido. שאילתה שמחזירה ערך יחיד מותרת בהשוואה עם `=`. זו הדרך הראשונה מבין שלוש הדרכים הכשרות למקסימום." },

      { id: "S06-Q3", ctx: schema,
        question: "מהו הפרויקט בעל התקציב **הגבוה ביותר**? בחרו את התשובה הנכונה ביותר.",
        options: [
          {id:"a", type:"code", value:"SELECT title FROM Projects WHERE budget = MAX(budget)"},
          {id:"b", type:"code", value:"SELECT title FROM Projects WHERE budget > ALL (SELECT budget FROM Projects)"},
          {id:"c", type:"code", value:"SELECT MAX(title) FROM Projects"},
          {id:"d", type:"code", value:"SELECT title FROM Projects WHERE budget >= ALL (SELECT budget FROM Projects)"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { ref: "SELECT title FROM Projects P1 WHERE NOT EXISTS (SELECT * FROM Projects P2 WHERE P2.budget > P1.budget)", same: [], differ: ["a", "c"] },
        recap: ">= ALL = מקסימום · > ALL = כלום · MAX ב-WHERE = פסול",
        explanation: "`>= ALL` = תקציב שגדול **או שווה** לכל התקציבים, כלומר המקסימום (כולל תיקו: Hermes ו-Zeus). ‏`> ALL` דורש תקציב גדול גם מעצמו, ולכן מחזיר כלום. ‏`WHERE budget = MAX(budget)` שם אגרגציה ב-WHERE, וזה פסול. ‏`MAX(title)` מחזיר את השם האחרון בסדר האלפביתי, לא את היקר ביותר. זו שאלה 11 של 26B-A." },

      { id: "S06-Q4", ctx: schema,
        question: "נתונות 3 הצעות פתרון לשאלה: \"הציגו את השכר המקסימלי, ואת שם העובד ומחלקתו\". סמנו את הטענה הנכונה:",
        code: "-- פתרון 1:\nSELECT salary, name, dept\nFROM Employees\nWHERE salary >= ALL (SELECT salary FROM Employees)\n\n-- פתרון 2:\nSELECT MAX(salary), name, dept\nFROM Employees\n\n-- פתרון 3:\nSELECT salary, name, dept\nFROM Employees\nWHERE salary = (SELECT MAX(salary) FROM Employees)",
        options: [
          {id:"a", type:"text", value:"פתרון 1 ופתרון 2 נכונים."},
          {id:"b", type:"text", value:"פתרון 1 ופתרון 3 נכונים."},
          {id:"c", type:"text", value:"כל שלושת הפתרונות נכונים."},
          {id:"d", type:"text", value:"רק פתרון 2 נכון."},
          {id:"e", type:"text", value:"רק פתרון 3 נכון."},
        ], correctId: "b",
        verify: { sql: "SELECT salary, name, dept FROM Employees WHERE salary = (SELECT MAX(salary) FROM Employees)", expect: [[12000, "Adi", "R&D"], [12000, "Ido", "Sales"]] },
        recap: "MAX(x) ליד עמודה רגילה בלי GROUP BY = פסול",
        explanation: "פתרון 1 (`>= ALL`) ופתרון 3 (`= (SELECT MAX)`) הן שתיים מהדרכים הכשרות. שתיהן מחזירות את Adi ואת Ido. פתרון 2 פסול: `MAX(salary)` מחזיר ערך אחד לכל הטבלה, ו-name ו-dept הם ערכים לכל שורה, בלי GROUP BY. גם במערכת שמקבלת אותו (כמו SQLite) תצא רק שורה אחת, וחצי מהתיקו ילך לאיבוד. זו השאלה שחזרה כמעט מילה במילה ב-21B-A שאלה 12 וב-22B-A שאלה 8." },

      { id: "S06-Q5", ctx: schema,
        question: "סמנו את השאלה (מנוסחת בשפה טבעית) המתאימה ביותר לשאילתה:",
        code: "SELECT E1.name, E1.dept\nFROM Employees AS E1\nWHERE NOT EXISTS (SELECT E2.age\n                  FROM Employees AS E2\n                  WHERE E2.age < E1.age)",
        options: [
          {id:"a", type:"text", value:"הצג את שמות העובדים המבוגרים ביותר ואת המחלקה של כל אחד מהם."},
          {id:"b", type:"text", value:"הצג את שמות העובדים הצעירים ביותר מבין כל העובדים, ולכל אחד את המחלקה שלו."},
          {id:"c", type:"text", value:"הצג לכל מחלקה את העובד הצעיר ביותר בה."},
          {id:"d", type:"text", value:"השאילתה כתובה באופן שגוי, ולכן אי אפשר לנסח לה שאלה מתאימה."},
        ], correctId: "b",
        verify: { sql: "SELECT E1.name, E1.dept FROM Employees AS E1 WHERE NOT EXISTS (SELECT E2.age FROM Employees AS E2 WHERE E2.age < E1.age)", expect: [["Ido", "Sales"], ["Noa", "Sales"]] },
        recap: "NOT EXISTS (… < me) = אין צעיר ממני = מינימום",
        explanation: "\"לא קיים עובד E2 שצעיר מ-E1\" = E1 הוא מהצעירים ביותר. הסימן `<` בתת-השאילתה פוסל כל מי שיש צעיר ממנו, ולכן נשאר **המינימום**. בנתונים לדוגמה יש תיקו בגיל 25, ושניהם חוזרים: Ido ו-Noa. אין תנאי על המחלקה בתת-השאילתה, ולכן זה הצעיר מבין **כל** העובדים, לא בכל מחלקה (אפשרות c). צריך גם לספור עמודות: SELECT מחזיר שם **ומחלקה**. זו שאלה 10 של 21B-A." },

      { id: "S06-Q6", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות העובדים המשובצים **למספר הגדול ביותר של פרויקטים**?",
        options: [
          {id:"a", type:"code", value:"SELECT E.name\nFROM Employees E JOIN Assignments A ON E.emp_id = A.emp_id\nGROUP BY E.emp_id, E.name\nHAVING COUNT(*) = MAX(COUNT(*))"},
          {id:"b", type:"code", value:"SELECT E.name, MAX(COUNT(*))\nFROM Employees E JOIN Assignments A ON E.emp_id = A.emp_id\nGROUP BY E.emp_id, E.name"},
          {id:"c", type:"code", value:"SELECT E.name\nFROM Employees E JOIN Assignments A ON E.emp_id = A.emp_id\nGROUP BY E.emp_id, E.name\nHAVING COUNT(*) >= ALL (SELECT COUNT(*)\n                        FROM Assignments\n                        GROUP BY emp_id)"},
          {id:"d", type:"code", value:"SELECT E.name\nFROM Employees E JOIN Assignments A ON E.emp_id = A.emp_id\nGROUP BY E.emp_id, E.name\nHAVING COUNT(*) = (SELECT MAX(project_id) FROM Assignments)"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { ref: "SELECT E.name FROM Employees E JOIN Assignments A ON E.emp_id = A.emp_id GROUP BY E.emp_id, E.name HAVING COUNT(*) = (SELECT MAX(cnt) FROM (SELECT COUNT(*) AS cnt FROM Assignments GROUP BY emp_id) AS T)",
          same: [], differ: ["a", "b", "d"] },
        recap: "MAX(COUNT) פסול · HAVING COUNT(*) >= ALL (SELECT COUNT(*) … GROUP BY …)",
        explanation: "צריך להשוות את המספר של כל עובד למספרים של **כל** העובדים, ולכן `HAVING COUNT(*) >= ALL (SELECT COUNT(*) FROM Assignments GROUP BY emp_id)`. הביטוי `MAX(COUNT(*))` הוא אגרגציה על אגרגציה, ולכן גם אפשרות a וגם אפשרות b פסולות. אפשרות d משווה מספר פרויקטים למזהה הפרויקט הגבוה ביותר (103), ואין לזה משמעות. בנתונים לדוגמה Dana ו-Ido משובצים לשלושה פרויקטים כל אחד, ושניהם חוזרים. זו התבנית של 23B-A שאלה 9 ו-23B-A2 שאלה 8." },

      { id: "S06-Q7", ctx: schema,
        question: "רוצים להציג את שמות העובדים המשובצים למספר הגדול ביותר של פרויקטים. היעזרו ב-VIEW הנתון. מה מהבאים נכון?",
        code: "CREATE VIEW numProj AS\n(SELECT emp_id, COUNT(*) AS n\n FROM Assignments\n GROUP BY emp_id)",
        options: [
          {id:"a", type:"code", value:"SELECT name\nFROM Employees JOIN numProj USING(emp_id)\nWHERE n >= ALL (SELECT n FROM numProj)"},
          {id:"b", type:"code", value:"SELECT name, MAX(n)\nFROM Employees JOIN numProj USING(emp_id)"},
          {id:"c", type:"code", value:"SELECT name\nFROM Employees JOIN numProj USING(emp_id)\nWHERE MAX(n)"},
          {id:"d", type:"code", value:"SELECT name\nFROM Employees JOIN numProj USING(emp_id)\nWHERE n = (SELECT MAX(n) FROM numProj)"},
          {id:"e", type:"text", value:"השאילתות {opt:a} ו-{opt:d} שתיהן נכונות."},
        ], correctId: "e",
        verify: { db: [EMP, ASG, NUMPROJ], ref: "SELECT name FROM Employees JOIN numProj USING(emp_id) WHERE n = (SELECT MAX(n) FROM numProj)", same: ["d"], differ: ["b", "c"] },
        recap: "ה-VIEW הופך את הספירה לעמודה רגילה n, ועליה מחפשים מקסימום בדרך כשרה",
        explanation: "ה-VIEW כבר ספר את הפרויקטים לכל עובד, כך ש-n הוא עמודה רגילה. כאן מותר למצוא מקסימום בכל אחת מהדרכים הכשרות: `>= ALL` (אפשרות {opt:a}) או `= (SELECT MAX(n) …)` (אפשרות {opt:d}), ולכן שתיהן נכונות. אפשרות b שמה `MAX(n)` ליד name בלי GROUP BY, ואפשרות c כותבת `WHERE MAX(n)`, שהוא גם אגרגציה ב-WHERE וגם לא תנאי. זה המבנה של 24B-A, שאלה 13." },

      { id: "S06-Q8", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות העובדים שמשתכרים **יותר מהשכר הממוצע במחלקה שלהם**?",
        options: [
          {id:"a", type:"code", value:"SELECT name\nFROM Employees\nWHERE salary > (SELECT AVG(salary) FROM Employees)"},
          {id:"b", type:"code", value:"SELECT E1.name\nFROM Employees E1\nWHERE E1.salary > (SELECT AVG(E2.salary)\n                   FROM Employees E2\n                   WHERE E2.dept = E1.dept)"},
          {id:"c", type:"code", value:"SELECT name\nFROM Employees\nGROUP BY dept\nHAVING salary > AVG(salary)"},
          {id:"d", type:"code", value:"SELECT E1.name\nFROM Employees E1\nWHERE E1.salary > (SELECT AVG(E2.salary)\n                   FROM Employees E2\n                   WHERE E2.dept <> E1.dept)"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: { ref: "SELECT E1.name FROM Employees E1 WHERE E1.salary > (SELECT AVG(E2.salary) FROM Employees E2 WHERE E2.dept = E1.dept)", same: ["b"], differ: ["a", "d"] },
        recap: "תת-שאילתה מתואמת: מפנה לשורה החיצונית (E2.dept = E1.dept)",
        explanation: "\"הממוצע **במחלקה שלו**\" משתנה מעובד לעובד, ולכן תת-השאילתה חייבת להיות **מתואמת**: היא מפנה לשורה החיצונית דרך `E2.dept = E1.dept` ומחושבת מחדש לכל עובד. אפשרות a משווה לממוצע של **כל** החברה (8800), ולכן Dana נכנסת בטעות. אפשרות d משווה לממוצע של המחלקות **האחרות**. אפשרות c מקבצת לפי מחלקה, ואז salary כבר לא ערך של שורה אחת: זה פסול. בנתונים לדוגמה עונים על הדרישה Adi (מעל 10500 ב-R&D) ו-Ido (מעל 9500 ב-Sales)." },
    ],
  });
})();
