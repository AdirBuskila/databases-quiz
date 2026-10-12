/* SQL course · level 4 — aggregation on a whole table: COUNT(*)/COUNT(col)/COUNT(DISTINCT), SUM, AVG, MIN, MAX */
(function(){
  const INSTR = { name: "Instruments", pk: ["serial_number"],
    columns: ["serial_number", "i_name", "category", "height", "price"],
    rows: [
      [1, "Guitar", "String", 100, 1200],
      [2, "Violin", "String", 60, 3000],
      [3, "Drum", "Percussion", 80, "NULL"],
      [4, "Flute", "Wind", 40, 500],
      [5, "Cello", "String", 120, 3000],
      [6, "Trumpet", "Wind", 45, 800],
    ] };
  const schema = { relations: [ { schema: "Instruments([u]serial_number[/u], i_name, category, height, price)", meaning: "כלי נגינה: מספר סידורי, שם, קטגוריה, גובה (ס\"מ), מחיר (ייתכן NULL)" } ] };
  const withData = { title: "הטבלה Instruments (נתונים לדוגמה)", tables: [INSTR] };

  SQL_LEVEL({
    id: "S04", order: 4, icon: "🧮", title: "אגרגציה",
    goal: "לחשב ערך אחד מכל הטבלה (COUNT, SUM, AVG, MIN, MAX) ולזהות את המלכודת MAX(x), name.",
    db: [INSTR],
    lesson: {
      html: `
<p>פונקציית אגרגציה <strong>מכווצת הרבה שורות לערך אחד</strong>: <code>COUNT</code> סופר, <code>SUM</code> סוכם, <code>AVG</code> ממצע, <code>MIN</code>/<code>MAX</code> מוצאות קיצון. בלי GROUP BY כל הטבלה היא קבוצה אחת, ולכן מתקבלת <strong>שורה אחת</strong>.</p>
<ul>
  <li><code>COUNT(*)</code> = מספר השורות · <code>COUNT(price)</code> = מספר הערכים שאינם NULL · <code>COUNT(DISTINCT category)</code> = מספר הערכים <strong>השונים</strong>.</li>
  <li>כל האגרגציות <strong>מתעלמות מ-NULL</strong> (מלבד <code>COUNT(*)</code>). <code>AVG(price)</code> מחלק ב-5, לא ב-6.</li>
  <li>"כמה <strong>שונים</strong>" / "ביותר משנה אחת" / "3 לקוחות שונים" ← <code>COUNT(DISTINCT …)</code> (23B-A שאלה 5, 24B-A שאלה 12, 25S-B שאלה 11).</li>
  <li>"קופסאות זו על גבי זו" ← <strong>SUM</strong>(height), לא COUNT (23B-A2, שאלה 9).</li>
  <li><code>x IN (SELECT …)</code> = x שווה <strong>לאחד</strong> מהערכים שתת-השאילתה מחזירה (וכך גם רשימה: <code>x IN (1, 2, 3)</code>). כשתת-השאילתה מחזירה ערך יחיד, <code>IN</code> שקול ל-<code>=</code>.</li>
</ul>
{fig:0}
<div class="lesson-trap">⚠️ <strong>המסיח הכי נפוץ בכל ה-SQL:</strong> <code>SELECT MAX(price), i_name FROM Instruments</code>. MAX מחזיר <strong>ערך אחד</strong>, אבל i_name הוא ערך <strong>לכל שורה</strong>. אין דרך לדעת איזה שם להצמיד, ולכן השאילתה <strong>פסולה תמיד</strong> (21B-A שאלה 12, 22B-A שאלה 8, 21B-C שאלה 5, 23B-A2 שאלה 8, 24B-A שאלה 13). הדרך הנכונה: <code>WHERE price = (SELECT MAX(price) FROM Instruments)</code>.</div>
<div class="lesson-rule">🔑 <strong>אין אגרגציה ב-WHERE:</strong> WHERE רץ על שורות בודדות, לפני שחושב ממוצע. <code>WHERE price > AVG(price)</code> פסול. משווים לתת-שאילתה: <code>WHERE price > (SELECT AVG(price) FROM Instruments)</code>.</div>
{fig:1}`,
      figs: [
        { caption: "שלוש ספירות שונות על אותה טבלה: שורות, מחירים ידועים, מחירים שונים.",
          tables: [INSTR], sql: "SELECT COUNT(*), COUNT(price), COUNT(DISTINCT price)\nFROM Instruments",
          result: { name: "תוצאה", columns: ["COUNT(*)", "COUNT(price)", "COUNT(DISTINCT price)"], rows: [[6, 5, 4]] } },
        { caption: "טעימה לשלב 5: GROUP BY מחלק לקבוצות, ומתקבלת שורה לכל קטגוריה.",
          tables: [INSTR], sql: "SELECT category, COUNT(*)\nFROM Instruments\nGROUP BY category",
          result: { name: "תוצאה", columns: ["category", "COUNT(*)"], rows: [["Percussion", 1], ["String", 3], ["Wind", 2]] } },
      ],
    },
    questions: [
      { id: "S04-Q1", ctx: withData,
        question: "מה מחזירה השאילתה?",
        code: "SELECT COUNT(*), COUNT(price), COUNT(DISTINCT price)\nFROM Instruments",
        options: [
          {id:"a", type:"text", value:"6, 6, 4"},
          {id:"b", type:"text", value:"6, 5, 5"},
          {id:"c", type:"text", value:"6, 5, 4"},
          {id:"d", type:"text", value:"5, 5, 4"},
        ], correctId: "c",
        verify: { sql: "SELECT COUNT(*), COUNT(price), COUNT(DISTINCT price) FROM Instruments", expect: [[6, 5, 4]] },
        recap: "COUNT(*) שורות · COUNT(col) בלי NULL · COUNT(DISTINCT col) ערכים שונים",
        explanation: "`COUNT(*)` = 6 שורות. `COUNT(price)` מדלג על ה-NULL של Drum, ולכן 5. `COUNT(DISTINCT price)` סופר ערכים שונים: 1200, 3000, 500, 800, כלומר **4**. ה-3000 מופיע פעמיים ונספר פעם אחת." },

      { id: "S04-Q2", ctx: withData,
        question: "מה מחזירה השאילתה?",
        code: "SELECT AVG(price)\nFROM Instruments",
        options: [
          {id:"a", type:"text", value:"1700"},
          {id:"b", type:"text", value:"1416.67 (הסכום חלקי 6)"},
          {id:"c", type:"text", value:"NULL, כי לאחד הכלים אין מחיר"},
          {id:"d", type:"text", value:"3000"},
        ], correctId: "a",
        verify: { sql: "SELECT AVG(price) FROM Instruments", expect: [[1700]] },
        recap: "AVG מתעלם מ-NULL: הסכום חלקי מספר הערכים הידועים",
        explanation: "AVG **מתעלם מ-NULL**: סוכם את 5 המחירים הידועים (1200 + 3000 + 500 + 3000 + 800 = 8500) ומחלק ב-**5**, כלומר 1700. חלוקה ב-6 הייתה נכונה רק אם ה-NULL היה נספר כ-0. NULL אחד לא הופך את כל הממוצע ל-NULL." },

      { id: "S04-Q3", ctx: schema,
        question: "רוצים לשים את כל הכלים במכולה, כל כלי בקופסה בגובה שלו, **קופסה על גבי קופסה**. איזו שאילתה מחשבת את הגובה הדרוש למכולה?",
        options: [
          {id:"a", type:"code", value:"SELECT COUNT(height) FROM Instruments"},
          {id:"b", type:"code", value:"SELECT MAX(height) FROM Instruments"},
          {id:"c", type:"code", value:"SELECT SUM(height) * COUNT(*) FROM Instruments"},
          {id:"d", type:"code", value:"SELECT SUM(height) FROM Instruments"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { ref: "SELECT SUM(height) FROM Instruments", same: ["d"], differ: ["a", "b", "c"] },
        recap: "\"זו על גבי זו\" = SUM(height), לא COUNT",
        explanation: "קופסאות זו על גבי זו: הגובה הכולל הוא **סכום** הגבהים, `SUM(height)` = 445. `COUNT(height)` סופר כלים (6) ולא סוכם גובה, `MAX` הוא הכלי הגבוה בלבד, והכפלה ב-COUNT היא חסרת משמעות. זו 23B-A2 שאלה 9." },

      { id: "S04-Q4", ctx: schema,
        question: "נתונות 3 הצעות פתרון לשאלה \"הציגו את המחיר הגבוה ביותר של כלי נגינה ואת שם הכלי\". מה נכון?",
        code: "-- פתרון 1:\nSELECT price, i_name FROM Instruments\nWHERE price = (SELECT MAX(price) FROM Instruments)\n\n-- פתרון 2:\nSELECT MAX(price), i_name FROM Instruments\n\n-- פתרון 3:\nSELECT price, i_name FROM Instruments\nWHERE price IN (SELECT MAX(price) FROM Instruments)",
        options: [
          {id:"a", type:"text", value:"פתרון 1 ופתרון 2 נכונים."},
          {id:"b", type:"text", value:"פתרון 1 ופתרון 3 נכונים."},
          {id:"c", type:"text", value:"כל שלושת הפתרונות נכונים."},
          {id:"d", type:"text", value:"רק פתרון 2 נכון."},
          {id:"e", type:"text", value:"רק פתרון 3 נכון."},
        ], correctId: "b",
        verify: { sql: "SELECT price, i_name FROM Instruments WHERE price IN (SELECT MAX(price) FROM Instruments)", expect: [[3000, "Violin"], [3000, "Cello"]] },
        recap: "SELECT MAX(x), name בלי GROUP BY פסול תמיד",
        explanation: "פתרונות 1 ו-3 משווים כל שורה למקסימום שחושב בתת-שאילתה ומחזירים את **שני** הכלים במחיר 3000 (Violin ו-Cello). מול ערך יחיד, `IN` שקול ל-`=`. פתרון 2 משלב אגרגציה (ערך אחד) עם עמודה רגילה (ערך לכל שורה) בלי GROUP BY, ולכן הוא **פסול**. זו בדיוק 21B-A שאלה 12 ו-22B-A שאלה 8, שהתשובה בהן היא \"1 ו-3 נכונים\". (SQLite מקבל את פתרון 2 ומחזיר שם אקראי, וזו לא SQL תקנית.)" },

      { id: "S04-Q5", ctx: withData,
        question: "מה עושה השאילתה?",
        code: "SELECT COUNT(DISTINCT category)\nFROM Instruments\nWHERE price >= 800",
        options: [
          {id:"a", type:"text", value:"סופרת את מספר הכלים שמחירם 800 או יותר (4)."},
          {id:"b", type:"text", value:"סופרת את מספר הקטגוריות השונות שיש בהן לפחות כלי אחד במחיר 800 או יותר (2)."},
          {id:"c", type:"text", value:"סופרת את מספר הקטגוריות שכל הכלים בהן במחיר 800 או יותר."},
          {id:"d", type:"text", value:"סופרת את מספר הכלים שמחירם בדיוק 800 (1)."},
        ], correctId: "b",
        verify: { sql: "SELECT COUNT(DISTINCT category) FROM Instruments WHERE price >= 800", expect: [[2]] },
        recap: "WHERE מסנן שורות קודם, ואז COUNT(DISTINCT) סופר ערכים שונים",
        explanation: "קודם WHERE משאיר את הכלים שמחירם לפחות 800: Guitar, Violin, Cello (String) ו-Trumpet (Wind). אחר כך `COUNT(DISTINCT category)` סופר קטגוריות **שונות**: String ו-Wind, כלומר **2**. אפשרות c מתארת \"כל הכלים בקטגוריה\", ובזה Wind נכשלת (ל-Flute מחיר 500). השאילתה לא בודקת דבר כזה." },

      { id: "S04-Q6", ctx: schema,
        question: "איזו שאילתה מחזירה את **מספר הקטגוריות השונות** של כלי נגינה?",
        options: [
          {id:"a", type:"code", value:"SELECT COUNT(category) FROM Instruments"},
          {id:"b", type:"code", value:"SELECT COUNT(DISTINCT category) FROM Instruments"},
          {id:"c", type:"code", value:"SELECT COUNT(*) FROM Instruments"},
          {id:"d", type:"code", value:"SELECT DISTINCT COUNT(category) FROM Instruments"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: { ref: "SELECT COUNT(DISTINCT category) FROM Instruments", same: ["b"], differ: ["a", "c", "d"] },
        recap: "\"כמה שונים\" = COUNT(DISTINCT col)",
        explanation: "\"שונות\" = `COUNT(DISTINCT category)`: String, Percussion, Wind, כלומר 3. `COUNT(category)` ו-`COUNT(*)` סופרים את כל 6 השורות. ב-`DISTINCT COUNT(...)` ה-DISTINCT חל על **שורת התוצאה** (שורה אחת עם 6), לא בתוך הספירה." },

      { id: "S04-Q7", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הכלים שמחירם **גבוה מהמחיר הממוצע**?",
        options: [
          {id:"a", type:"code", value:"SELECT i_name FROM Instruments\nWHERE price > AVG(price)"},
          {id:"b", type:"code", value:"SELECT i_name, AVG(price) FROM Instruments"},
          {id:"c", type:"code", value:"SELECT i_name FROM Instruments\nWHERE price > (SELECT AVG(price) FROM Instruments)"},
          {id:"d", type:"code", value:"SELECT i_name FROM Instruments\nWHERE price > (SELECT MIN(price) FROM Instruments)"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { ref: "SELECT i_name FROM Instruments WHERE price > (SELECT AVG(price) FROM Instruments)", same: ["c"], differ: ["a", "b", "d"] },
        recap: "אין אגרגציה ב-WHERE. משווים לתת-שאילתה (SELECT AVG …)",
        explanation: "WHERE רץ **לפני** שיש ממוצע, ולכן `WHERE price > AVG(price)` פסול (5 מועדים פסלו בדיוק את זה). הממוצע מחושב בתת-שאילתה (1700) וכל שורה מושווית אליו: Violin ו-Cello. אפשרות b היא מלכודת `AVG(x), name` בלי GROUP BY. d משווה למינימום ולא לממוצע." },

      { id: "S04-Q8", ctx: schema,
        question: "איזו שאילתה מחזירה את **סכום המחירים** של כל הכלים בקטגוריה `'String'`?",
        options: [
          {id:"a", type:"code", value:"SELECT SUM(price), category FROM Instruments"},
          {id:"b", type:"code", value:"SELECT COUNT(price) FROM Instruments\nWHERE category = 'String'"},
          {id:"c", type:"code", value:"SELECT SUM(price) FROM Instruments\nWHERE category = 'String'"},
          {id:"d", type:"code", value:"SELECT SUM(price) FROM Instruments\nWHERE category <> 'String'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { ref: "SELECT SUM(price) FROM Instruments WHERE category = 'String'", same: ["c"], differ: ["a", "b", "d"] },
        recap: "WHERE מסנן שורות לפני האגרגציה",
        explanation: "קודם WHERE משאיר את שורות String, ואז SUM סוכם אותן: 1200 + 3000 + 3000 = **7200**. אפשרות a היא שוב אגרגציה ליד עמודה רגילה בלי GROUP BY, והיא גם לא מסננת. b סופרת במקום לסכום. d הופכת את התנאי." },
    ],
  });
})();
