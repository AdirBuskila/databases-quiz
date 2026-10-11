/* SQL course · level 9 — VIEW, subquery in FROM, multi-step queries, self-join */
(function(){
  const EMP = { name: "Employees", pk: ["emp_id"],
    columns: ["emp_id", "name", "dept", "salary", "manager_id"],
    rows: [
      [1, "Rina", "Sales", 9000, null],
      [2, "Omer", "Sales", 7000, 1],
      [3, "Tal", "Sales", 7000, 1],
      [4, "Gil", "IT", 12000, null],
      [5, "Lior", "IT", 10000, 4],
      [6, "Shir", "IT", 8000, 5],
      [7, "Ben", "HR", 6000, null],
    ] };
  const ASG = { name: "Assignments", pk: ["emp_id", "project"],
    columns: ["emp_id", "project"],
    rows: [
      [1, "Beta"], [2, "Alpha"], [2, "Beta"], [3, "Alpha"],
      [4, "Alpha"], [4, "Beta"], [4, "Gamma"], [5, "Alpha"], [5, "Beta"], [6, "Gamma"],
    ] };
  const DB = [EMP, ASG];
  // what the VIEW numProj holds on this data (used to run the options that read the view)
  const NUMPROJ = { name: "numProj", columns: ["emp_id", "n"], rows: [[1, 1], [2, 2], [3, 1], [4, 3], [5, 2], [6, 1]] };
  const schema = { relations: [
    { schema: "Employees([u]emp_id[/u], name, dept, salary, manager_id)", meaning: "עובד: מחלקה, משכורת, והמנהל הישיר שלו (מזהה של עובד אחר, או NULL)" },
    { schema: "Assignments([u]emp_id[/u], [u]project[/u])", meaning: "שיבוץ של עובד לפרויקט" },
  ] };
  const empData = { title: "הטבלה Employees (נתונים לדוגמה)", tables: [EMP] };

  SQL_LEVEL({
    id: "S09", order: 9, icon: "🧱", title: "VIEW, תת-שאילתה ב-FROM ושאילתות בשלבים",
    goal: "לבנות שאילתה בשלבים: אגרגציה על אגרגציה, VIEW / INTO כעזר, וצירוף טבלה לעצמה.",
    db: DB,
    lesson: {
      html: `
<p>חלק מהשאלות דורשות <strong>שני שלבים</strong>: קודם מחשבים ערך לכל קבוצה, ואז מחשבים משהו <strong>על התוצאות</strong> (ממוצע של מקסימומים, מקסימום של ספירות).</p>
<div class="lesson-rule">🔑 <strong>אגרגציה על אגרגציה = תת-שאילתה ב-FROM, עם שם (alias).</strong> <code>AVG(MAX(salary))</code> אינו חוקי. השלב הראשון נכתב כטבלה זמנית בתוך FROM, והשלב השני רץ עליה (26B-A שאלה 12, 23B-A שאלה 7).</div>
{fig:0}
{fig:1}
<h3>VIEW ו-INTO</h3>
<ul>
  <li><code>CREATE VIEW name AS (SELECT …)</code> נותן שם לתוצאה של שאילתה, ואפשר להשתמש בה בהמשך כמו בטבלה.</li>
  <li>במבחנים מופיע גם <code>SELECT … INTO name FROM …</code>, שפועל <strong>כמו CREATE VIEW</strong> (21B-A שאלות 5 ו-7, 22B-A שאלה 5).</li>
  <li>שימוש קלאסי: VIEW שסופר לכל עובד, ואז "מי עם הספירה המקסימלית" בעזרת <code>&gt;= ALL</code> מול ה-VIEW (24B-A שאלה 13).</li>
  <li>כשמחברים שני VIEW-ים בפסיק, צריך <strong>גם</strong> תנאי חיבור (אותו מפתח) <strong>וגם</strong> תנאי התוכן (21B-A שאלה 5).</li>
</ul>
<h3>צירוף טבלה לעצמה (self-join)</h3>
<p>כדי להשוות שתי שורות מאותה טבלה (זוגות, מנהל ועובד, שרשרת דורות) פותחים את הטבלה פעמיים עם כינויים שונים. כל עותק מקבל תנאי משלו.</p>
{fig:2}
<div class="lesson-trap">⚠️ <strong>מלכודות:</strong> תת-שאילתה ב-FROM <strong>בלי alias</strong> פסולה (ב-23B-A שאלה 7 זה מה שפסל את המסיח). בזוגות, <code>E1.emp_id &lt;&gt; E2.emp_id</code> מחזיר כל זוג <strong>פעמיים</strong> ו-<code>&lt;</code> מחזיר פעם אחת. ובשרשרת של 3 דורות כל עותק חייב להיקשר לקודם (21B-C שאלות 8 ו-9). וגם <strong>סדר העמודות ב-SELECT</strong> הוא חלק מהתשובה: (first_name, course_name) כפי שנדרש (25B-A שאלה 12).</div>`,
      figs: [
        { caption: "שלב 1: המשכורת המקסימלית בכל מחלקה.",
          tables: [EMP], sql: "SELECT dept, MAX(salary) AS maxs\nFROM Employees\nGROUP BY dept",
          result: { columns: ["dept", "maxs"], rows: [["Sales", 9000], ["IT", 12000], ["HR", 6000]] } },
        { caption: "שלב 2: הממוצע של המקסימומים, (9000 + 12000 + 6000) / 3. ה-alias T חובה.",
          tables: [EMP], sql: "SELECT AVG(maxs) AS avg_max\nFROM (SELECT dept, MAX(salary) AS maxs\n      FROM Employees\n      GROUP BY dept) AS T",
          result: { columns: ["avg_max"], rows: [[9000]] } },
        { caption: "self-join: שני עובדים באותה מחלקה ובאותה משכורת. `<` מחזיר כל זוג פעם אחת.",
          tables: [EMP], sql: "SELECT E1.name AS name1, E2.name AS name2\nFROM Employees E1, Employees E2\nWHERE E1.dept = E2.dept\n  AND E1.salary = E2.salary\n  AND E1.emp_id < E2.emp_id",
          result: { columns: ["name1", "name2"], rows: [["Omer", "Tal"]] } },
      ],
    },
    questions: [
      { id: "S09-Q1", ctx: empData,
        question: "מה מחזירה השאילתה?",
        code: "SELECT AVG(maxs)\nFROM (SELECT dept, MAX(salary) AS maxs\n      FROM Employees\n      GROUP BY dept) AS T",
        options: [
          {id:"a", type:"text", value:"8428.57: הממוצע של כל המשכורות"},
          {id:"b", type:"text", value:"12000: המשכורת הגבוהה ביותר"},
          {id:"c", type:"text", value:"9000: הממוצע של המשכורת המקסימלית בכל מחלקה"},
          {id:"d", type:"text", value:"שגיאה: אסור לכתוב תת-שאילתה בתוך FROM"},
        ], correctId: "c",
        verify: { sql: "SELECT AVG(maxs) FROM (SELECT dept, MAX(salary) AS maxs FROM Employees GROUP BY dept) AS T", expect: [[9000]] },
        recap: "תת-שאילתה ב-FROM = שלב ראשון, האגרגציה החיצונית רצה על התוצאה שלו",
        explanation: "קודם התת-שאילתה מחשבת מקסימום לכל מחלקה: Sales 9000, IT 12000, HR 6000. אחר כך AVG החיצוני רץ על שלוש השורות האלה: (9000 + 12000 + 6000) / 3 = **9000**. תת-שאילתה ב-FROM חוקית לגמרי, ובלבד שיש לה שם (`AS T`)." },

      { id: "S09-Q2", ctx: schema,
        question: "לכל מחלקה מחושבת המשכורת המקסימלית בה. איזו שאילתה מחזירה את **הממוצע** של המקסימומים האלה?",
        options: [
          {id:"a", type:"code", value:"SELECT AVG(maxs)\nFROM (SELECT dept, MAX(salary) AS maxs\n      FROM Employees GROUP BY dept) AS T"},
          {id:"b", type:"code", value:"SELECT AVG(MAX(salary))\nFROM Employees\nGROUP BY dept"},
          {id:"c", type:"code", value:"SELECT AVG(maxs)\nFROM (SELECT dept, MAX(salary) AS maxs\n      FROM Employees GROUP BY dept)"},
          {id:"d", type:"code", value:"SELECT dept, AVG(MAX(salary))\nFROM Employees\nGROUP BY dept"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "a",
        verify: { ref: "SELECT AVG(maxs) FROM (SELECT dept, MAX(salary) AS maxs FROM Employees GROUP BY dept) AS T", same: ["a"], differ: ["b", "d"] },
        recap: "AVG(MAX(…)) פסול · תת-שאילתה ב-FROM חייבת alias",
        explanation: "אגרגציה בתוך אגרגציה (`AVG(MAX(salary))`) אסורה, ולכן {opt:b} ו-{opt:d} נפסלות. {opt:c} כמעט נכונה, אבל לתת-שאילתה ב-FROM **אין שם**, ובסטנדרט (ובמבחן) זה פסול. רק {opt:a} מחשבת את המקסימומים בתת-שאילתה עם alias ואת הממוצע עליהם. זו 26B-A שאלה 12 כמעט מילה במילה. (יש מערכות סלחניות שמקבלות גם {opt:c}, אבל במבחן התשובה היא זו עם ה-alias.)" },

      { id: "S09-Q3", ctx: schema,
        question: "מה ממוצע **הפרשי המשכורות** במחלקות? (בכל מחלקה: המשכורת הגבוהה פחות הנמוכה, ואז ממוצע על פני המחלקות.)",
        options: [
          {id:"a", type:"code", value:"SELECT (MAX(salary) - MIN(salary)) / COUNT(*)\nFROM Employees"},
          {id:"b", type:"code", value:"SELECT AVG(d)\nFROM (SELECT dept, MAX(salary) - MIN(salary) AS d\n      FROM Employees) AS T"},
          {id:"c", type:"code", value:"SELECT AVG(d)\nFROM (SELECT dept, MAX(salary) - MIN(salary) AS d\n      FROM Employees\n      GROUP BY dept) AS T"},
          {id:"d", type:"code", value:"SELECT AVG(MAX(salary) - MIN(salary))\nFROM Employees\nGROUP BY dept"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { ref: "SELECT AVG(d) FROM (SELECT dept, MAX(salary) - MIN(salary) AS d FROM Employees GROUP BY dept) AS T", same: ["c"], differ: ["a", "b", "d"] },
        recap: "\"ממוצע של ___ בכל קבוצה\" = GROUP BY בתת-שאילתה, AVG מבחוץ",
        explanation: "שלב 1 (בתוך FROM, עם **GROUP BY dept**): הפרש לכל מחלקה. Sales 9000−7000 = 2000, IT 12000−8000 = 4000, HR 0. שלב 2: AVG על ההפרשים, כלומר 2000. ב-{opt:b} חסר GROUP BY, ולכן מחושב הפרש אחד על כל העובדים יחד. {opt:a} מחלקת את ההפרש הכללי במספר העובדים, וזה לא ממוצע של כלום. {opt:d} מקננת אגרגציה, וזה אסור. זה המבנה של 23B-A שאלה 7." },

      { id: "S09-Q4", ctx: Object.assign({}, schema, { note: "נתון ה-VIEW: `CREATE VIEW numProj AS (SELECT emp_id, COUNT(DISTINCT project) AS n FROM Assignments GROUP BY emp_id)`" }),
        question: "בעזרת ה-VIEW הנתון, איזו שאילתה מחזירה את שמות העובדים שמשובצים **בהכי הרבה** פרויקטים?",
        options: [
          {id:"a", type:"code", value:"SELECT name, MAX(n)\nFROM Employees JOIN numProj USING(emp_id)"},
          {id:"b", type:"code", value:"SELECT name\nFROM Employees JOIN numProj USING(emp_id)\nWHERE MAX(n)"},
          {id:"c", type:"code", value:"SELECT name\nFROM Employees JOIN numProj USING(emp_id)\nWHERE n > (SELECT MIN(n) FROM numProj)"},
          {id:"d", type:"code", value:"SELECT name\nFROM Employees JOIN numProj USING(emp_id)\nWHERE n >= ALL (SELECT n FROM numProj)"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { db: [EMP, NUMPROJ], ref: "SELECT name FROM Employees JOIN numProj USING(emp_id) WHERE n = (SELECT MAX(n) FROM numProj)", differ: ["a", "b", "c"] },
        recap: "מקסימום של ספירות: VIEW שסופר, ואז >= ALL מול ה-VIEW",
        explanation: "ה-VIEW כבר סופר לכל עובד. נשאר למצוא מי ש-n שלו **גדול או שווה לכל** ה-n-ים: `n >= ALL (SELECT n FROM numProj)`. כאן זה Gil, עם 3 פרויקטים. {opt:a} היא המסיח הקבוע: שם לצד MAX בלי GROUP BY. {opt:b} שמה אגרגציה ב-WHERE. {opt:c} מחזירה את כל מי שמעל המינימום (Omer, Gil ו-Lior), לא רק את המקסימום. זה המבנה של 24B-A שאלה 13." },

      { id: "S09-Q5", ctx: schema,
        question: "\"הציגו את המחלקות שבהן מספר העובדים מקסימלי, ואת המספר הזה.\" הפתרון בנוי משלוש שאילתות (`INTO` פועל כמו `CREATE VIEW`). מהו הקטע החסר __(I)__?",
        code: "-- שאילתה 1:\nSELECT dept, COUNT(*) AS emp_num INTO dept_size\nFROM Employees\nGROUP BY dept\n\n-- שאילתה 2:\nSELECT MAX(emp_num) AS max_num INTO max_size\nFROM dept_size\n\n-- שאילתה 3:\nSELECT dept, max_num\n__(I)__",
        options: [
          {id:"a", type:"code", value:"FROM dept_size, max_size"},
          {id:"b", type:"code", value:"FROM Employees, max_size\nHAVING dept_size.emp_num = max_size.max_num"},
          {id:"c", type:"code", value:"FROM dept_size, max_size\nWHERE dept_size.emp_num = max_size.max_num"},
          {id:"d", type:"code", value:"FROM max_size, dept_size\nGROUP BY max_size.max_num\nHAVING dept_size.emp_num = max_size.max_num"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { db: [
            { name: "dept_size", columns: ["dept", "emp_num"], rows: [["Sales", 3], ["IT", 3], ["HR", 1]] },
            { name: "max_size", columns: ["max_num"], rows: [[3]] } ],
          sql: "SELECT dept, max_num FROM dept_size, max_size WHERE dept_size.emp_num = max_size.max_num",
          expect: [["Sales", 3], ["IT", 3]] },
        recap: "שני \"VIEW-ים\" בפסיק → חייב תנאי WHERE שמחבר ביניהם",
        explanation: "dept_size מחזיק מספר עובדים לכל מחלקה (Sales 3, IT 3, HR 1), ו-max_size מחזיק שורה אחת: 3. שאילתה 3 צריכה את שתיהן ב-FROM **ותנאי** שמשאיר רק את המחלקות שה-emp_num שלהן שווה למקסימום. כך יוצאות Sales ו-IT. בלי התנאי ({opt:a}) מתקבלת מכפלה, וכל המחלקות חוזרות. {opt:b} לא מכניסה את dept_size ל-FROM ומשתמשת ב-HAVING בלי קיבוץ. {opt:d} מקבצת לפי עמודה לא נכונה. זה המבנה של 22B-A שאלה 5." },

      { id: "S09-Q6", ctx: schema,
        question: "איזו שאילתה מחזירה את **זוגות** העובדים שעובדים באותה מחלקה ומקבלים אותה משכורת, כשכל זוג מופיע **פעם אחת בלבד**?",
        options: [
          {id:"a", type:"code", value:"SELECT E1.name AS name1, E2.name AS name2\nFROM Employees E1, Employees E2\nWHERE E1.dept = E2.dept AND E1.salary = E2.salary"},
          {id:"b", type:"code", value:"SELECT E1.name AS name1, E2.name AS name2\nFROM Employees E1, Employees E2\nWHERE E1.dept = E2.dept AND E1.salary = E2.salary\n  AND E1.emp_id < E2.emp_id"},
          {id:"c", type:"code", value:"SELECT E1.name AS name1, E2.name AS name2\nFROM Employees E1, Employees E2\nWHERE E1.dept = E2.dept AND E1.salary = E2.salary\n  AND E1.emp_id <> E2.emp_id"},
          {id:"d", type:"code", value:"SELECT name\nFROM Employees\nGROUP BY dept, salary\nHAVING COUNT(*) > 1"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: { ref: "SELECT E1.name AS name1, E2.name AS name2 FROM Employees E1, Employees E2 WHERE E1.dept = E2.dept AND E1.salary = E2.salary AND E1.emp_id < E2.emp_id", same: ["b"], differ: ["a", "c", "d"] },
        recap: "זוגות: self-join עם `<` (פעם אחת) · `<>` = פעמיים · בלי תנאי = כל עובד עם עצמו",
        explanation: "פותחים את Employees פעמיים (E1, E2) ומשווים מחלקה ומשכורת. בלי תנאי על המזהים ({opt:a}) כל עובד מוצמד **לעצמו** (Rina, Rina וכו'). `<>` ({opt:c}) מחזיר את הזוג פעמיים: (Omer, Tal) וגם (Tal, Omer). `E1.emp_id < E2.emp_id` משאיר רק סדר אחד, ולכן כל זוג מופיע פעם אחת. {opt:d} מחזירה שם אחד לכל קבוצה ולא זוגות, ושם שלא נמצא ב-GROUP BY אסור ב-SELECT." },

      { id: "S09-Q7", ctx: schema,
        question: "רוצים להציג שלשות (מנהל של מנהל, מנהל, עובד), כלומר שרשרת ניהול באורך 3. מהו הקטע החסר?",
        code: "SELECT E1.name, E2.name, E3.name\nFROM Employees E1, Employees E2, Employees E3\nWHERE E2.manager_id = E1.emp_id\n  ____?____",
        options: [
          {id:"a", type:"code", value:"AND E3.manager_id = E1.emp_id"},
          {id:"b", type:"code", value:"AND E2.manager_id = E3.emp_id"},
          {id:"c", type:"code", value:"AND E3.manager_id = E2.emp_id"},
          {id:"d", type:"text", value:"לא חסר כלום"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { sql: "SELECT E1.name AS a, E2.name AS b, E3.name AS c FROM Employees E1, Employees E2, Employees E3 WHERE E2.manager_id = E1.emp_id AND E3.manager_id = E2.emp_id", expect: [["Gil", "Lior", "Shir"]] },
        recap: "שרשרת: כל עותק נקשר לעותק הקודם (E2→E1, E3→E2)",
        explanation: "כל חוליה בשרשרת דורשת תנאי משלה: E2 מנוהל על ידי E1 (נתון), ו-**E3 מנוהל על ידי E2** (החסר). על הנתונים יוצא Gil → Lior → Shir. ב-{opt:a} גם E3 מנוהל על ידי E1, כלומר שני אחים ולא שרשרת. ב-{opt:b} E3 הוא המנהל של E2, ולכן יוצא E3 = E1. בלי תנאי בכלל E3 חופשי, ומתקבלת מכפלה עם כל העובדים. זה המבנה של 21B-C שאלות 8 ו-9 (סבתא, אם, נכדה)." },

      { id: "S09-Q8", ctx: schema,
        question: "רוצים להציג לכל מחלקה את **ממוצע מספר הפרויקטים לעובד**. בפתרון בתבנית של **תת-שאילתה ב-FROM** (ממוצע של ספירות), כמה רמות GROUP BY וכמה טבלאות צריך לחבר?",
        options: [
          {id:"a", type:"text", value:"GROUP BY אחד, וצירוף של 2 טבלאות"},
          {id:"b", type:"text", value:"שתי רמות GROUP BY (תת-שאילתה), וצירוף של 2 טבלאות"},
          {id:"c", type:"text", value:"שתי רמות GROUP BY (תת-שאילתה), וצירוף של 3 טבלאות"},
          {id:"d", type:"text", value:"GROUP BY אחד, וטבלה אחת"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: { sql: "SELECT dept, AVG(cnt) FROM (SELECT E.emp_id, E.dept, COUNT(*) AS cnt FROM Employees E JOIN Assignments A ON E.emp_id = A.emp_id GROUP BY E.emp_id, E.dept) AS T GROUP BY dept", expect: [["Sales", 1.333333], ["IT", 2]] },
        recap: "\"ממוצע של ספירות\" = שתי רמות קיבוץ · מספר הטבלאות = מאיפה מגיעים הנתונים",
        explanation: "רמה 1: לכל **עובד** סופרים פרויקטים, וצריך את Employees (בשביל dept) ואת Assignments, כלומר 2 טבלאות: `GROUP BY emp_id, dept`. רמה 2: לכל **מחלקה** ממוצע של הספירות: `GROUP BY dept` מעל תת-השאילתה. אי אפשר לכתוב `AVG(COUNT(…))` בקיבוץ אחד, כי אגרגציה על אגרגציה אסורה. על הנתונים: Sales 1.33, IT 2 (עובד בלי פרויקטים, כמו Ben, נשמט ב-JOIN רגיל). זה המבנה של 24B-A שאלה 8, שבה נדרשו 3 טבלאות כי הנתונים ישבו בשלוש." },
    ],
  });
})();
