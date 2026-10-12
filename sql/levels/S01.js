/* SQL course · level 1 — SELECT on one table: WHERE, AND/OR, LIKE, DISTINCT, BETWEEN */
(function(){
  const STUDENTS = { name: "Students", pk: ["student_id"],
    columns: ["student_id", "first_name", "city", "birth_year"],
    rows: [
      [1, "Dana", "Haifa", 2001],
      [2, "Adi", "Tel Aviv", 1999],
      [3, "Ido", "Haifa", 1998],
      [4, "Nataf", "Eilat", 2002],
      [5, "David", "Tel Aviv", 2000],
      [6, "Maya", "Haifa", 2000],
    ] };
  const schema = { relations: [ { schema: "Students([u]student_id[/u], first_name, city, birth_year)", meaning: "סטודנט: מזהה, שם פרטי, עיר מגורים ושנת לידה" } ] };
  const withData = Object.assign({ title: "הטבלה Students (נתונים לדוגמה)", tables: [STUDENTS] });

  SQL_LEVEL({
    id: "S01", order: 1, icon: "🔎", title: "SELECT בסיסי",
    goal: "לבחור עמודות ושורות מטבלה אחת: WHERE, AND/OR, LIKE, DISTINCT ו-BETWEEN.",
    db: [STUDENTS],
    lesson: {
      html: `
<p>שאילתה בסיסית עונה על שתי שאלות: <strong>אילו עמודות</strong> (SELECT) ו<strong>אילו שורות</strong> (WHERE), מתוך <strong>איזו טבלה</strong> (FROM).</p>
{fig:0}
<ul>
  <li><code>WHERE</code> משאיר רק שורות שהתנאי עליהן <strong>אמת</strong>. כל שאר השורות נזרקות.</li>
  <li>אופרטורי השוואה: <code>=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>, ו<strong>"שונה מ"</strong> נכתב <code>&lt;&gt;</code> או <code>!=</code>. שניהם בדיוק אותו דבר, ושניהם מופיעים במבחן (באלגברה יחסית כמעט תמיד <code>&lt;&gt;</code>).</li>
  <li><code>AND</code> = שני התנאים חייבים להתקיים · <code>OR</code> = מספיק אחד. ל-AND יש <strong>קדימות</strong> על OR (כמו כפל לפני חיבור).</li>
  <li><code>LIKE</code> עם <code>%</code> = רצף תווים כלשהו (גם ריק), <code>_</code> = תו אחד בדיוק: <code>'D%'</code> מתחיל ב-D · <code>'%584'</code> מסתיים ב-584 · <code>'%e%'</code> מכיל e.</li>
  <li><code>DISTINCT</code> אחרי SELECT מוחק שורות כפולות בתוצאה.</li>
  <li><code>BETWEEN a AND b</code> כולל את <strong>שני</strong> הקצוות (‎>= a AND <= b).</li>
</ul>
<div class="lesson-rule">🔑 <strong>ספור תנאים:</strong> בשאלה כתוב "מחיפה <u>ו</u>נולד אחרי 2000"? אז בשאילתה צריך בדיוק את שני התנאים, מחוברים ב-<strong>AND</strong>. החלפת AND ב-OR היא המסיח הנפוץ ביותר (שש שאלות מבחן, למשל 25B-A שאלה 9, 25C-A שאלה 6).</div>
<div class="lesson-trap">⚠️ <strong>LIKE ולא =:</strong> <code>= '%584'</code> מחפש מחרוזת שהיא ממש <code>%584</code>, ולכן לא מוצא כלום. תבניות עובדות רק עם LIKE. ו-<code>'%584%'</code> ("מכיל") תופס גם 15847, שלא מסתיים ב-584 (23B-A2, שאלה 5).</div>
{fig:1}`,
      figs: [
        { caption: "WHERE בוחר שורות, SELECT בוחר עמודות.",
          tables: [STUDENTS], sql: "SELECT first_name, birth_year\nFROM Students\nWHERE city = 'Haifa'",
          result: { name: "תוצאה", columns: ["first_name", "birth_year"], rows: [["Dana", 2001], ["Ido", 1998], ["Maya", 2000]] } },
        { caption: "AND לפני OR, ולכן התנאי נקרא `city = 'Haifa' OR (city = 'Eilat' AND birth_year > 2000)`",
          tables: [STUDENTS], sql: "SELECT first_name\nFROM Students\nWHERE city = 'Haifa' OR city = 'Eilat' AND birth_year > 2000",
          result: { name: "תוצאה", columns: ["first_name"], rows: [["Dana"], ["Ido"], ["Nataf"], ["Maya"]] } },
      ],
    },
    questions: [
      { id: "S01-Q1", ctx: withData,
        question: "כמה שורות תחזיר השאילתה?",
        code: "SELECT first_name\nFROM Students\nWHERE city = 'Haifa'",
        options: [
          {id:"a", type:"text", value:"6"},
          {id:"b", type:"text", value:"3"},
          {id:"c", type:"text", value:"1"},
          {id:"d", type:"text", value:"0, כי first_name אינו עמודת העיר"},
        ], correctId: "b",
        verify: { sql: "SELECT first_name FROM Students WHERE city = 'Haifa'", expect: [["Dana"], ["Ido"], ["Maya"]] },
        recap: "WHERE משאיר רק את השורות שהתנאי עליהן אמת",
        explanation: "WHERE עובר על כל שורה ומשאיר רק את מי שגר ב-Haifa: Dana, Ido ו-Maya, כלומר **3** שורות. אפשר לסנן לפי עמודה שלא מופיעה ב-SELECT: הסינון קורה לפני שבוחרים עמודות." },

      { id: "S01-Q2", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הסטודנטים שגרים ב-Haifa **וגם** נולדו אחרי 2000?",
        options: [
          {id:"a", type:"code", value:"SELECT first_name\nFROM Students\nWHERE city = 'Haifa' OR birth_year > 2000"},
          {id:"b", type:"code", value:"SELECT first_name\nFROM Students\nWHERE city = 'Haifa' AND birth_year >= 2000"},
          {id:"c", type:"code", value:"SELECT first_name\nFROM Students\nWHERE city = 'Haifa' AND birth_year > 2000"},
          {id:"d", type:"code", value:"SELECT first_name, city, birth_year\nFROM Students\nWHERE city = 'Haifa'"},
        ], correctId: "c",
        verify: { ref: "SELECT first_name FROM Students WHERE city = 'Haifa' AND birth_year > 2000", same: ["c"], differ: ["a", "b", "d"] },
        recap: "\"וגם\" = AND · \"אחרי 2000\" = > 2000, לא >=",
        explanation: "שני תנאים שחייבים להתקיים יחד, ולכן **AND**. \"אחרי 2000\" הוא `> 2000`. `>= 2000` מכניס גם את מי שנולד ב-2000 (Maya), ו-OR מחזיר כל מי שמקיים לפחות אחד מהתנאים (גם Nataf מ-Eilat). אפשרות d לא בודקת את שנת הלידה בכלל." },

      { id: "S01-Q3", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הסטודנטים ששמם **מתחיל** באות D?",
        options: [
          {id:"a", type:"code", value:"SELECT first_name FROM Students WHERE first_name LIKE 'D%'"},
          {id:"b", type:"code", value:"SELECT first_name FROM Students WHERE first_name LIKE '%D%'"},
          {id:"c", type:"code", value:"SELECT first_name FROM Students WHERE first_name = 'D%'"},
          {id:"d", type:"code", value:"SELECT first_name FROM Students WHERE first_name LIKE '%D'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "a",
        verify: { ref: "SELECT first_name FROM Students WHERE first_name LIKE 'D%'", same: ["a"], differ: ["b", "c", "d"] },
        recap: "'D%' מתחיל · '%D' מסתיים · '%D%' מכיל · = לא מבין תבניות",
        explanation: "`%` מחליף כל רצף תווים. `'D%'` = D ואחריה כל דבר, כלומר **מתחיל ב-D**. `'%D%'` = מכיל D בכל מקום, `'%D'` = מסתיים ב-D. עם `=` הסימן % הוא תו רגיל, ולכן `= 'D%'` מחפש שם שהוא ממש \"D%\". כך נפסלו המסיחים ב-23B-A2 שאלה 5 וב-24B-A שאלה 11." },

      { id: "S01-Q4", ctx: withData,
        question: "כמה שורות מחזירה השאילתה?",
        code: "SELECT DISTINCT city\nFROM Students",
        options: [
          {id:"a", type:"text", value:"6"},
          {id:"b", type:"text", value:"1"},
          {id:"c", type:"text", value:"3"},
          {id:"d", type:"text", value:"2"},
        ], correctId: "c",
        verify: { sql: "SELECT DISTINCT city FROM Students", expect: [["Haifa"], ["Tel Aviv"], ["Eilat"]] },
        recap: "DISTINCT מוחק שורות כפולות בתוצאה",
        explanation: "בלי DISTINCT היו חוזרות 6 שורות (עיר לכל סטודנט). DISTINCT מוחק כפילויות: Haifa, Tel Aviv, Eilat, כלומר **3** שורות. DISTINCT פועל על השורה כולה שב-SELECT, כאן עמודה אחת." },

      { id: "S01-Q5", ctx: withData,
        question: "כמה סטודנטים מחזירה השאילתה?",
        code: "SELECT first_name\nFROM Students\nWHERE birth_year BETWEEN 1999 AND 2001",
        options: [
          {id:"a", type:"text", value:"2 (רק מי שנולד ב-2000)"},
          {id:"b", type:"text", value:"3"},
          {id:"c", type:"text", value:"4"},
          {id:"d", type:"text", value:"6"},
        ], correctId: "c",
        verify: { sql: "SELECT first_name FROM Students WHERE birth_year BETWEEN 1999 AND 2001", expect: [["Dana"], ["Adi"], ["David"], ["Maya"]] },
        recap: "BETWEEN כולל את שני הקצוות",
        explanation: "`BETWEEN 1999 AND 2001` שקול ל-`birth_year >= 1999 AND birth_year <= 2001`, **כולל הקצוות**: Dana (2001), Adi (1999), David (2000), Maya (2000), כלומר 4. Ido (1998) ו-Nataf (2002) בחוץ." },

      { id: "S01-Q6", ctx: withData,
        question: "מה מחזירה השאילתה?",
        code: "SELECT first_name\nFROM Students\nWHERE city = 'Haifa' OR city = 'Eilat' AND birth_year > 2000",
        options: [
          {id:"a", type:"text", value:"סטודנטים מ-Haifa או מ-Eilat שנולדו אחרי 2000 (Dana, Nataf)."},
          {id:"b", type:"text", value:"כל הסטודנטים מ-Haifa, ובנוסף סטודנטים מ-Eilat שנולדו אחרי 2000 (Dana, Ido, Nataf, Maya)."},
          {id:"c", type:"text", value:"רק סטודנטים מ-Eilat שנולדו אחרי 2000 (Nataf)."},
          {id:"d", type:"text", value:"השאילתה שגויה: אסור לשלב AND ו-OR בלי סוגריים."},
        ], correctId: "b",
        verify: { sql: "SELECT first_name FROM Students WHERE city = 'Haifa' OR city = 'Eilat' AND birth_year > 2000", expect: [["Dana"], ["Ido"], ["Nataf"], ["Maya"]] },
        recap: "AND קודם ל-OR: a OR b AND c = a OR (b AND c)",
        explanation: "ל-AND יש קדימות, כמו כפל לפני חיבור. התנאי נקרא `city = 'Haifa' OR (city = 'Eilat' AND birth_year > 2000)`: כל מי שמ-Haifa (Dana, Ido, Maya), ובנוסף מי שמ-Eilat ונולד אחרי 2000 (Nataf). כדי לקבל את הפירוש של אפשרות a צריך סוגריים: `(city = 'Haifa' OR city = 'Eilat') AND birth_year > 2000`. השילוב חוקי לגמרי." },

      { id: "S01-Q7", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הסטודנטים שגרים ב-`'Tel Aviv'` ושמם מכיל את האות `'i'`?",
        options: [
          {id:"a", type:"code", value:"SELECT first_name\nFROM Students\nWHERE city = 'Tel Aviv' OR first_name LIKE '%i%'"},
          {id:"b", type:"code", value:"SELECT first_name\nFROM Students\nWHERE city = 'Tel Aviv' AND first_name = '%i%'"},
          {id:"c", type:"code", value:"SELECT first_name\nFROM Students\nWHERE city LIKE 'Tel Aviv' AND first_name LIKE 'i%'"},
          {id:"d", type:"code", value:"SELECT first_name\nFROM Students\nWHERE city = 'Tel Aviv' AND first_name LIKE '%i%'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { ref: "SELECT first_name FROM Students WHERE city = 'Tel Aviv' AND first_name LIKE '%i%'", same: ["d"], differ: ["a", "b", "c"] },
        recap: "שני תנאים = AND · \"מכיל\" = '%i%'",
        explanation: "שני תנאים שחייבים להתקיים יחד, ולכן AND, ו\"מכיל\" הוא `LIKE '%i%'`. אפשרות a משתמשת ב-OR, b משתמשת ב-`=` עם תבנית, ו-c בודקת \"מתחיל ב-i\". `city LIKE 'Tel Aviv'` בלי % שקול ל-`=`, ולכן הוא לא הבעיה ב-c. זה המבנה של 25B-A שאלה 9." },
    ],
  });
})();
