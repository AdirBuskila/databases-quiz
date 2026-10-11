/* SQL course · level 2 — ORDER BY (asc default, X, Y DESC) and NULL (IS NULL, three-valued logic) */
(function(){
  const STUDENTS = { name: "Students", pk: ["student_id"],
    columns: ["student_id", "first_name", "city", "avg_grade", "phone"],
    rows: [
      [1, "Dana", "Haifa", 88, "050-1111"],
      [2, "Adi", "Tel Aviv", 92, "NULL"],
      [3, "Ido", "Haifa", 75, "052-3333"],
      [4, "Noa", "NULL", 92, "054-4444"],
      [5, "David", "Tel Aviv", 81, "NULL"],
      [6, "Maya", "Haifa", 92, "053-6666"],
    ] };
  const schema = { relations: [ { schema: "Students([u]student_id[/u], first_name, city, avg_grade, phone)", meaning: "סטודנט: מזהה, שם, עיר (ייתכן NULL), ממוצע ציונים, טלפון (ייתכן NULL)" } ] };
  const withData = { title: "הטבלה Students (נתונים לדוגמה)", tables: [STUDENTS] };

  SQL_LEVEL({
    id: "S02", order: 2, icon: "↕️", title: "ORDER BY ו-NULL",
    goal: "למיין תוצאה (עולה, יורד, לפי כמה עמודות) ולהבין למה NULL לא שווה לשום דבר.",
    db: [STUDENTS],
    lesson: {
      html: `
<p><code>ORDER BY</code> קובע את <strong>סדר השורות</strong> בתוצאה, והוא הדבר <strong>האחרון</strong> שמתבצע (אחרי SELECT). ברירת המחדל היא סדר <strong>עולה</strong> (ASC).</p>
<ul>
  <li><code>ORDER BY avg_grade DESC, first_name</code> = קודם לפי ממוצע בסדר יורד, ובתוך ממוצע זהה לפי שם בסדר עולה.</li>
  <li><code>DESC</code> חל <strong>רק על העמודה שלפניו</strong>. כל עמודה בלי DESC ממוינת בסדר עולה.</li>
</ul>
{fig:0}
<div class="lesson-rule">🔑 <strong>"X בסדר עולה ו-Y בסדר יורד"</strong> נכתב <code>ORDER BY X, Y DESC</code>. השאלה הזו חזרה כמעט מילה במילה ב-21B-A (שאלה 8) וב-22B-A (שאלה 9). המסיחים הופכים את מקום ה-DESC או כותבים GROUP BY במקום ORDER BY.</div>
<p><strong>NULL</strong> = ערך חסר / לא ידוע. כל השוואה מול NULL (<code>=</code>, <code>!=</code>, <code>&lt;</code>…) נותנת <strong>Unknown</strong>, לא True. WHERE משאיר שורה <strong>רק אם התנאי True</strong>, ולכן:</p>
<ul>
  <li><code>WHERE phone = NULL</code> לא מחזיר אף שורה. בודקים ערך חסר רק עם <code>IS NULL</code> / <code>IS NOT NULL</code>.</li>
  <li><code>WHERE city != 'Haifa'</code> <strong>לא</strong> מחזיר את מי שהעיר שלו NULL.</li>
</ul>
{fig:1}
<div class="lesson-trap">⚠️ <strong>טעימה לשלב 4:</strong> <code>COUNT(*)</code> סופר שורות, ו-<code>COUNT(phone)</code> סופר רק ערכים שאינם NULL. בטבלה למעלה: 6 לעומת 4.</div>`,
      figs: [
        { caption: "ממוצע יורד, ובתוך 92 שמות בסדר עולה: Adi, Maya, Noa.",
          tables: [STUDENTS], sql: "SELECT first_name, avg_grade\nFROM Students\nORDER BY avg_grade DESC, first_name",
          result: { name: "תוצאה", columns: ["first_name", "avg_grade"], rows: [["Adi", 92], ["Maya", 92], ["Noa", 92], ["Dana", 88], ["David", 81], ["Ido", 75]] } },
        { caption: "רק IS NULL מוצא את מי שאין לו טלפון.",
          tables: [STUDENTS], sql: "SELECT first_name\nFROM Students\nWHERE phone IS NULL",
          result: { name: "תוצאה", columns: ["first_name"], rows: [["Adi"], ["David"]] } },
      ],
    },
    questions: [
      { id: "S02-Q1", ctx: withData,
        question: "מי יופיע **בשורה הראשונה** של התוצאה?",
        code: "SELECT first_name, avg_grade\nFROM Students\nORDER BY avg_grade",
        options: [
          {id:"a", type:"text", value:"Adi, כי הממוצע שלו הוא הגבוה ביותר"},
          {id:"b", type:"text", value:"Dana, כי היא הראשונה בטבלה"},
          {id:"c", type:"text", value:"Ido, כי הממוצע שלו הוא הנמוך ביותר"},
          {id:"d", type:"text", value:"לא ניתן לדעת, כי לא נכתב ASC או DESC"},
        ], correctId: "c",
        verify: { sql: "SELECT first_name, avg_grade FROM Students ORDER BY avg_grade LIMIT 1", expect: [["Ido", 75]] },
        recap: "ORDER BY בלי DESC = סדר עולה (ASC)",
        explanation: "בלי ASC/DESC ברירת המחדל היא **סדר עולה**: מהממוצע הנמוך לגבוה. לכן השורה הראשונה היא Ido (75). כדי לקבל את Adi למעלה צריך `ORDER BY avg_grade DESC`." },

      { id: "S02-Q2", ctx: withData,
        question: "מה סדר **שלוש השורות הראשונות** בתוצאה?",
        code: "SELECT first_name\nFROM Students\nORDER BY avg_grade DESC, first_name",
        options: [
          {id:"a", type:"text", value:"Noa, Maya, Adi"},
          {id:"b", type:"text", value:"Adi, Maya, Noa"},
          {id:"c", type:"text", value:"Ido, David, Dana"},
          {id:"d", type:"text", value:"Adi, Noa, Maya"},
        ], correctId: "b",
        verify: { sql: "SELECT first_name FROM Students ORDER BY avg_grade DESC, first_name", expect: [["Adi"], ["Maya"], ["Noa"], ["Dana"], ["David"], ["Ido"]] },
        recap: "DESC חל רק על העמודה שלפניו",
        explanation: "DESC חל רק על `avg_grade`, ולכן קודם באים בעלי 92. ביניהם הסדר נקבע לפי `first_name` בסדר **עולה** (אין אחריו DESC): Adi, Maya, Noa. Noa, Maya, Adi היה נכון רק עם `first_name DESC`. Ido, David, Dana הוא סוף הרשימה ההפוכה." },

      { id: "S02-Q3", ctx: schema,
        question: "איזו שאילתה מציגה את שמות הסטודנטים וממוצעיהם, כשהממוצעים **בסדר יורד**, ובתוך ממוצע זהה השמות **בסדר עולה**?",
        options: [
          {id:"a", type:"code", value:"SELECT first_name, avg_grade FROM Students\nORDER BY avg_grade, first_name DESC"},
          {id:"b", type:"code", value:"SELECT first_name, avg_grade FROM Students\nORDER BY first_name, avg_grade DESC"},
          {id:"c", type:"code", value:"SELECT first_name, avg_grade FROM Students\nORDER BY avg_grade DESC, first_name"},
          {id:"d", type:"code", value:"SELECT first_name, avg_grade FROM Students\nORDER BY avg_grade DESC, first_name DESC"},
          {id:"e", type:"code", value:"SELECT first_name, avg_grade FROM Students\nGROUP BY avg_grade, first_name"},
        ], correctId: "c",
        verify: { ref: "SELECT first_name, avg_grade FROM Students ORDER BY avg_grade DESC, first_name", same: ["c"], differ: ["a", "b", "d", "e"] },
        recap: "\"X יורד, ובתוכו Y עולה\" = ORDER BY X DESC, Y",
        explanation: "העמודה הראשית באה ראשונה: `avg_grade DESC`. העמודה המשנית אחריה, `first_name` בלי DESC (עולה). אפשרות a מעבירה את ה-DESC לשם, b ממיינת קודם לפי שם, d הופכת גם את השמות. GROUP BY לא ממיין אלא מקבץ, וזה המסיח של 21B-A שאלה 8 ו-22B-A שאלה 9." },

      { id: "S02-Q4", ctx: withData,
        question: "כמה שורות מחזירה השאילתה?",
        code: "SELECT first_name\nFROM Students\nWHERE phone = NULL",
        options: [
          {id:"a", type:"text", value:"2 (Adi ו-David)"},
          {id:"b", type:"text", value:"0"},
          {id:"c", type:"text", value:"4"},
          {id:"d", type:"text", value:"6"},
        ], correctId: "b",
        verify: { sql: "SELECT first_name FROM Students WHERE phone = NULL", expect: [] },
        recap: "השוואה מול NULL היא Unknown, אף פעם לא True",
        explanation: "`phone = NULL` אינו True גם כשהטלפון חסר: השוואה מול NULL נותנת **Unknown**, ו-WHERE משאיר רק שורות שהתנאי עליהן True. לכן **0** שורות. כדי לקבל את Adi ו-David צריך `WHERE phone IS NULL`." },

      { id: "S02-Q5", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הסטודנטים **שאין להם** מספר טלפון רשום?",
        options: [
          {id:"a", type:"code", value:"SELECT first_name FROM Students WHERE phone = NULL"},
          {id:"b", type:"code", value:"SELECT first_name FROM Students WHERE phone = 'NULL'"},
          {id:"c", type:"code", value:"SELECT first_name FROM Students WHERE phone IS NOT NULL"},
          {id:"d", type:"code", value:"SELECT first_name FROM Students WHERE phone IS NULL"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { ref: "SELECT first_name FROM Students WHERE phone IS NULL", same: ["d"], differ: ["a", "b", "c"] },
        recap: "ערך חסר נבדק רק ב-IS NULL",
        explanation: "רק `IS NULL` בודק ערך חסר. `= NULL` תמיד Unknown ולכן מחזיר 0 שורות. `= 'NULL'` מחפש את המחרוזת \"NULL\", ש-NULL אמיתי אינו שווה לה. `IS NOT NULL` הוא ההפך: מי **שיש** לו טלפון." },

      { id: "S02-Q6", ctx: withData,
        question: "כמה שורות מחזירה השאילתה?",
        code: "SELECT first_name\nFROM Students\nWHERE city != 'Haifa'",
        options: [
          {id:"a", type:"text", value:"3 (Adi, Noa, David)"},
          {id:"b", type:"text", value:"2 (Adi, David)"},
          {id:"c", type:"text", value:"6"},
          {id:"d", type:"text", value:"0"},
        ], correctId: "b",
        verify: { sql: "SELECT first_name FROM Students WHERE city != 'Haifa'", expect: [["Adi"], ["David"]] },
        recap: "!= לא מחזיר שורות שבהן הערך NULL",
        explanation: "ל-Noa העיר היא NULL, ו-`NULL != 'Haifa'` הוא **Unknown**, לא True, ולכן היא לא מופיעה. נשארים רק Adi ו-David מ-Tel Aviv. זו לוגיקה תלת-ערכית: True / False / Unknown, ו-WHERE משאיר רק True." },

      { id: "S02-Q7", ctx: withData,
        question: "מה מחזירה השאילתה?",
        code: "SELECT COUNT(*), COUNT(phone)\nFROM Students",
        options: [
          {id:"a", type:"text", value:"6, 6"},
          {id:"b", type:"text", value:"6, 4"},
          {id:"c", type:"text", value:"4, 4"},
          {id:"d", type:"text", value:"4, 6"},
        ], correctId: "b",
        verify: { sql: "SELECT COUNT(*), COUNT(phone) FROM Students", expect: [[6, 4]] },
        recap: "COUNT(*) סופר שורות · COUNT(col) מדלג על NULL",
        explanation: "`COUNT(*)` סופר **שורות**: 6. `COUNT(phone)` סופר רק ערכים שאינם NULL: לשניים (Adi, David) אין טלפון, ולכן 4. כל פונקציות האגרגציה מתעלמות מ-NULL, מלבד `COUNT(*)`. נרחיב על זה בשלב 4." },

      { id: "S02-Q8", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הסטודנטים שאינם גרים ב-`'Haifa'`, **כולל** סטודנטים שהעיר שלהם לא ידועה?",
        options: [
          {id:"a", type:"code", value:"SELECT first_name FROM Students\nWHERE city <> 'Haifa'"},
          {id:"b", type:"code", value:"SELECT first_name FROM Students\nWHERE city <> 'Haifa' OR city IS NULL"},
          {id:"c", type:"code", value:"SELECT first_name FROM Students\nWHERE city <> 'Haifa' AND city IS NULL"},
          {id:"d", type:"code", value:"SELECT first_name FROM Students\nWHERE NOT city = 'Haifa'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: { ref: "SELECT first_name FROM Students WHERE city <> 'Haifa' OR city IS NULL", same: ["b"], differ: ["a", "c", "d"] },
        recap: "כדי לכלול NULL צריך להוסיף OR col IS NULL",
        explanation: "`city <> 'Haifa'` לבדו מפספס את Noa (העיר שלה NULL, והתנאי Unknown). מוסיפים `OR city IS NULL`. גם `NOT city = 'Haifa'` לא עוזר: NOT של Unknown הוא עדיין Unknown. עם AND אין שורה שמקיימת את שני התנאים, ולכן אפשרות c מחזירה 0 שורות." },
    ],
  });
})();
