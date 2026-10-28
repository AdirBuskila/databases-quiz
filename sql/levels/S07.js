/* SQL course · level 7 — negation: NOT IN / NOT EXISTS / LEFT JOIN … IS NULL, and the traps around them */
(function(){
  const READERS = { name: "Readers", pk: ["reader_id"], columns: ["reader_id", "name", "city"],
    rows: [[1, "Dana", "Haifa"], [2, "Adi", "Tel Aviv"], [3, "Ido", "Haifa"], [4, "Nataf", "Eilat"], [5, "Gal", "Haifa"]] };
  const BOOKS = { name: "Books", pk: ["book_id"], columns: ["book_id", "title", "genre"],
    rows: [[100, "Dune", "SciFi"], [101, "Emma", "Classic"], [102, "Ubik", "SciFi"], [103, "Odyssey", "Classic"], [104, "Matilda", "Kids"], [105, "Hamlet", "Classic"]] };
  const LOANS = { name: "Loans", pk: ["reader_id", "book_id"], columns: ["reader_id", "book_id", "loan_year"],
    rows: [[1, 100, 2023], [1, 101, 2024], [2, 101, 2023], [2, 103, 2024], [3, 100, 2024], [3, 102, 2024], [4, 104, 2023]] };
  const SCORE = { name: "Score", columns: ["from_country", "to_country", "year", "num_points"],
    rows: [
      ["Israel", "Sweden", 2023, 12], ["Israel", "Italy", 2023, 8], ["Norway", "Sweden", 2023, 10], ["Norway", "Israel", 2023, 6],
      ["Italy", "Israel", 2023, 12], ["Spain", "Italy", 2023, 4], ["Sweden", "Spain", 2023, 12],
    ] };

  const schema = { relations: [
    { schema: "Readers([u]reader_id[/u], name, city)", meaning: "קורא בספרייה: מזהה, שם ועיר" },
    { schema: "Books([u]book_id[/u], title, genre)", meaning: "ספר: מזהה, שם וז'אנר" },
    { schema: "Loans([u]reader_id[/u], [u]book_id[/u], loan_year)", meaning: "השאלה של ספר לקורא, ובאיזו שנה" },
  ] };
  const scoreSchema = { relations: [
    { schema: "Score(from_country, to_country, year, num_points)", meaning: "המדינה from_country נתנה ל-to_country מספר נקודות num_points בשנה year" },
  ] };
  const rl = { title: "הטבלאות Readers ו-Loans (נתונים לדוגמה)", tables: [READERS, LOANS] };

  SQL_LEVEL({
    id: "S07", order: 7, icon: "🚫", title: "שלילה: אף פעם לא / אין לו",
    goal: "לכתוב \"מי שאין לו\" ו\"מעולם לא\" בשלוש הדרכים הנכונות, ולזהות את המסיחים שתמיד מחזירים תשובה שגויה.",
    db: [READERS, BOOKS, LOANS, SCORE],
    lesson: {
      html: `
<p>JOIN רגיל (INNER) מחזיר רק שורות <strong>שיש להן התאמה</strong>. קורא שלא השאיל אף ספר פשוט נעלם. כדי למצוא "מי שאין לו" צריך כלי אחר.</p>
<p><code>LEFT JOIN</code> שומר <strong>את כל</strong> השורות מהטבלה השמאלית. למי שאין התאמה, העמודות של הטבלה הימנית מתמלאות ב-<code>NULL</code>:</p>
{fig:0}
<div class="lesson-rule">🔑 <strong>שלוש הדרכים הכשרות ל"אין לו / מעולם לא":</strong><br>
1. <code>WHERE x NOT IN (SELECT x FROM R)</code><br>
2. <code>WHERE NOT EXISTS (SELECT * FROM R WHERE R.x = T.x)</code><br>
3. <code>FROM T LEFT JOIN R ON R.x = T.x WHERE R.x IS NULL</code><br>
"כולם מקיימים P" = "אין אף אחד שמפר את P": ‏<code>NOT IN (מי שמפר את P)</code> (23B-A2, שאלה 6).</div>
{fig:1}
<div class="lesson-trap">⚠️ <strong>ארבעת המסיחים הקבועים:</strong><br>
• <code>WHERE genre &lt;&gt; 'SciFi'</code> מחזיר מי שהשאיל <strong>לפחות ספר אחד אחר</strong>, ולא מי שמעולם לא השאיל מדע בדיוני.<br>
• <code>INNER JOIN … WHERE R.x IS NULL</code>: חיבור פנימי לא מייצר NULL, ולכן התוצאה תמיד ריקה.<br>
• <code>INNER JOIN … HAVING COUNT(*) = 0</code>: קבוצה ריקה לא נוצרת בכלל, ולכן תמיד ריק (25S-B שאלות 7, 12).<br>
• <code>LEFT JOIN</code> ואחריו WHERE על עמודה מהצד הימני: ‏<code>NULL = 2024</code> אינו אמת, ולכן השורות בלי התאמה נזרקות וה-LEFT הופך ל-INNER (25B-A, שאלה 8).</div>
<div class="lesson-trap">⚠️ <strong>עוד שני מסיחים (26S-A, שאלה 8):</strong><br>
• <code>NOT EXISTS</code> <strong>בלי תנאי קישור</strong> לשורה החיצונית (<code>WHERE L.reader_id = R.reader_id</code>) בודק שאלה אחת לכל הטבלה: אם קיים בכלל ספר כזה, אף אחד לא חוזר. אחרת, חוזרים כולם.<br>
• <code>x NOT IN (… WHERE genre &lt;&gt; 'SciFi')</code> הוא שלילה כפולה: "לא בין הספרים שאינם SciFi" = <strong>כן</strong> SciFi. השאילתה מחזירה בדיוק את מי שכן השאיל.</div>`,
      figs: [
        { caption: "ל-Gal אין השאלות, ולכן העמודה book_id שלה מתמלאת ב-NULL. ב-JOIN רגיל היא הייתה נעלמת.",
          tables: [READERS, LOANS], sql: "SELECT R.name, L.book_id\nFROM Readers R LEFT JOIN Loans L ON R.reader_id = L.reader_id",
          result: { columns: ["name", "book_id"], rows: [["Dana", 100], ["Dana", 101], ["Adi", 101], ["Adi", 103], ["Ido", 100], ["Ido", 102], ["Nataf", 104], ["Gal", "NULL"]] } },
        { caption: "השלמה ל-anti-join: משאירים רק את השורות שבהן לא נמצאה התאמה.",
          tables: [READERS, LOANS], sql: "SELECT R.name\nFROM Readers R LEFT JOIN Loans L ON R.reader_id = L.reader_id\nWHERE L.reader_id IS NULL",
          result: { columns: ["name"], rows: [["Gal"]] } },
      ],
    },
    questions: [
      { id: "S07-Q1", ctx: rl,
        question: "מה מחזירה השאילתה?",
        code: "SELECT R.name, L.book_id\nFROM Readers R LEFT JOIN Loans L ON R.reader_id = L.reader_id",
        options: [
          {id:"a", type:"text", value:"7 שורות, אחת לכל השאלה. Gal לא מופיעה."},
          {id:"b", type:"text", value:"8 שורות: אחת לכל השאלה, ועוד שורה ל-Gal עם NULL בעמודה book_id."},
          {id:"c", type:"text", value:"5 שורות, אחת לכל קורא."},
          {id:"d", type:"text", value:"8 שורות: אחת לכל השאלה, ועוד שורה ל-Gal עם 0 בעמודה book_id."},
        ], correctId: "b",
        verify: { db: [READERS, LOANS], sql: "SELECT R.name, L.book_id FROM Readers R LEFT JOIN Loans L ON R.reader_id = L.reader_id",
          expect: [["Dana", 100], ["Dana", 101], ["Adi", 101], ["Adi", 103], ["Ido", 100], ["Ido", 102], ["Nataf", 104], ["Gal", null]] },
        recap: "LEFT JOIN שומר את כל השורות משמאל; בלי התאמה = NULL",
        explanation: "לכל קורא עם השאלות יוצאת שורה לכל השאלה (7 שורות). LEFT JOIN שומר גם את מי שאין לו התאמה: Gal מופיעה פעם אחת, והעמודות מהטבלה Loans מתמלאות ב-**NULL**, לא ב-0. ב-JOIN רגיל היו יוצאות רק 7 השורות. זו שאלה 11 של 21S-B." },

      { id: "S07-Q2", ctx: rl,
        question: "מה מחזירה השאילתה?",
        code: "SELECT R.name, L.loan_year\nFROM Readers R LEFT JOIN Loans L ON R.reader_id = L.reader_id\nWHERE L.loan_year = 2024",
        options: [
          {id:"a", type:"text", value:"את כל הקוראים. למי שלא השאיל ב-2024 תופיע השנה NULL."},
          {id:"b", type:"text", value:"רק השאלות משנת 2024: Dana, Adi, ו-Ido פעמיים. Gal לא מופיעה."},
          {id:"c", type:"text", value:"את Gal בלבד, כי רק לה יש NULL."},
          {id:"d", type:"text", value:"שגיאה: אסור WHERE אחרי LEFT JOIN."},
        ], correctId: "b",
        verify: { db: [READERS, LOANS], sql: "SELECT R.name, L.loan_year FROM Readers R LEFT JOIN Loans L ON R.reader_id = L.reader_id WHERE L.loan_year = 2024",
          expect: [["Dana", 2024], ["Adi", 2024], ["Ido", 2024], ["Ido", 2024]] },
        recap: "WHERE על הצד הימני של LEFT JOIN הופך אותו ל-INNER",
        explanation: "LEFT JOIN יוצר גם את השורה של Gal עם NULL, אבל אז WHERE בודק `NULL = 2024`. התוצאה אינה אמת, ולכן השורה נזרקת, וכך גם כל השורות של 2023. נשארות רק ההשאלות של 2024, כאילו כתבנו JOIN רגיל. זו המלכודת של 25B-A שאלה 8 (\"מציגה את כל הסטודנטים\" הוא המסיח)." },

      { id: "S07-Q3", ctx: { title: "הטבלאות Readers, Books ו-Loans (נתונים לדוגמה)", tables: [READERS, BOOKS, LOANS] },
        question: "האם השאילתה עונה על הדרישה \"הצג את שמות הקוראים שמעולם לא השאילו ספר מז'אנר SciFi\"?",
        code: "SELECT DISTINCT R.name\nFROM Readers R JOIN Loans L ON R.reader_id = L.reader_id\n              JOIN Books B ON L.book_id = B.book_id\nWHERE B.genre <> 'SciFi'",
        options: [
          {id:"a", type:"text", value:"כן, השאילתה נכונה."},
          {id:"b", type:"text", value:"השאילתה נכונה, אבל צריך להחליף את <> ב-!=."},
          {id:"c", type:"text", value:"לא. היא מחזירה גם את Dana, שהשאילה את Dune, ולא מחזירה את Gal, שלא השאילה כלום."},
          {id:"d", type:"text", value:"לא. היא מחזירה רק את Ido."},
        ], correctId: "c",
        verify: { db: [READERS, BOOKS, LOANS], sql: "SELECT DISTINCT R.name FROM Readers R JOIN Loans L ON R.reader_id = L.reader_id JOIN Books B ON L.book_id = B.book_id WHERE B.genre <> 'SciFi'",
          expect: [["Dana"], ["Adi"], ["Nataf"]] },
        recap: "col <> value = \"יש לו לפחות ערך אחר\", לא \"מעולם לא\"",
        explanation: "התנאי `<>` בודק כל השאלה **בנפרד**: Dana השאילה גם את Emma (Classic), ולכן היא עוברת למרות ש-Dune הוא SciFi. בנוסף, ה-JOIN הרגיל מעלים את Gal, שלא השאילה כלום ולכן מעולם לא השאילה SciFi. ‏`<>` ו-`!=` זהים. התשובה הנכונה היא Adi, Nataf ו-Gal, ומקבלים אותה עם `NOT IN (מי שכן השאיל SciFi)`. זו המלכודת של 21B-A שאלה 6." },

      { id: "S07-Q4", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הספרים **שמעולם לא הושאלו**?",
        options: [
          {id:"a", type:"code", value:"SELECT title\nFROM Books\nWHERE book_id IN (SELECT book_id FROM Loans)"},
          {id:"b", type:"code", value:"SELECT B.title\nFROM Books B JOIN Loans L ON L.book_id = B.book_id\nGROUP BY B.title\nHAVING COUNT(*) = 0"},
          {id:"c", type:"code", value:"SELECT B.title\nFROM Books B JOIN Loans L ON L.book_id = B.book_id\nWHERE L.book_id IS NULL"},
          {id:"d", type:"code", value:"SELECT B.title\nFROM Books B LEFT JOIN Loans L ON L.book_id = B.book_id\nWHERE L.book_id IS NULL"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "d",
        verify: { ref: "SELECT B.title FROM Books B LEFT JOIN Loans L ON L.book_id = B.book_id WHERE L.book_id IS NULL", same: ["d"], differ: ["a", "b", "c"] },
        recap: "anti-join = LEFT JOIN … WHERE right.key IS NULL",
        explanation: "LEFT JOIN שומר גם ספרים בלי השאלות, עם NULL בצד של Loans, ו-`IS NULL` משאיר רק אותם (Hamlet). אפשרות a מחזירה את ההפך: ספרים **שכן** הושאלו. באפשרויות b ו-c החיבור פנימי, ולכן ספר בלי השאלות בכלל לא מגיע לשלב הבא: אין קבוצה עם `COUNT(*) = 0` ואין שורה עם NULL, והתוצאה תמיד ריקה. זו בדיוק שאלה 7 של 25S-B, וגם שאלה 12 שם." },

      { id: "S07-Q5", ctx: schema,
        question: "מיהם הקוראים **שמעולם לא** השאילו ספר מז'אנר `'SciFi'`? בחרו את השאילתה הנכונה.",
        options: [
          {id:"a", type:"code", value:"SELECT DISTINCT name\nFROM Readers JOIN Loans USING(reader_id)\n             JOIN Books USING(book_id)\nWHERE genre <> 'SciFi'"},
          {id:"b", type:"code", value:"SELECT name\nFROM Readers\nWHERE reader_id NOT IN\n  (SELECT book_id FROM Books WHERE genre = 'SciFi')"},
          {id:"c", type:"code", value:"SELECT name\nFROM Readers\nWHERE reader_id NOT IN\n  (SELECT L.reader_id\n   FROM Loans L JOIN Books B ON L.book_id = B.book_id\n   WHERE B.genre = 'SciFi')"},
          {id:"d", type:"code", value:"SELECT name\nFROM Readers\nWHERE genre <> 'SciFi'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "c",
        verify: { ref: "SELECT name FROM Readers WHERE reader_id NOT IN (SELECT L.reader_id FROM Loans L JOIN Books B ON L.book_id = B.book_id WHERE B.genre = 'SciFi')", same: ["c"], differ: ["a", "b", "d"] },
        recap: "\"מעולם לא X\" = NOT IN (מי שכן עשה X), עם החיבור עד הטבלה שמסננים לפיה",
        explanation: "מוצאים את מי **שכן** השאיל SciFi (צריך את Loans ואת Books, כי הז'אנר יושב ב-Books), ושוללים: `NOT IN`. התוצאה: Adi, Nataf ו-Gal. אפשרות a היא מסיח ה-`<>`, שמחזיר את מי שהשאיל לפחות ספר אחד שאינו SciFi. אפשרות b משווה מזהה קורא למזהה ספר, וזו תת-שאילתה על הטבלה הלא נכונה. אפשרות d מחפשת את genre בטבלה Readers, שבה אין עמודה כזו. זה המבנה של 26B-A, שאלה 7." },

      { id: "S07-Q6", ctx: schema,
        question: "מיהם הקוראים שהשאילו ספרים, ו**כל** ההשאלות שלהם היו בשנת 2024?",
        options: [
          {id:"a", type:"code", value:"SELECT DISTINCT R.name\nFROM Readers R JOIN Loans L ON R.reader_id = L.reader_id\nWHERE L.loan_year = 2024"},
          {id:"b", type:"code", value:"SELECT DISTINCT R.name\nFROM Readers R JOIN Loans L ON R.reader_id = L.reader_id\nWHERE R.reader_id NOT IN\n  (SELECT reader_id FROM Loans WHERE loan_year <> 2024)"},
          {id:"c", type:"code", value:"SELECT name\nFROM Readers\nWHERE reader_id NOT IN\n  (SELECT reader_id FROM Loans WHERE loan_year = 2024)"},
          {id:"d", type:"code", value:"SELECT DISTINCT R.name\nFROM Readers R JOIN Loans L ON R.reader_id = L.reader_id\nWHERE L.loan_year <> 2023"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "b",
        verify: { ref: "SELECT DISTINCT R.name FROM Readers R JOIN Loans L ON R.reader_id = L.reader_id WHERE R.reader_id NOT IN (SELECT reader_id FROM Loans WHERE loan_year <> 2024)", same: ["b"], differ: ["a", "c", "d"] },
        recap: "\"כולם מקיימים P\" = NOT IN (מי שיש לו מקרה שמפר את P)",
        explanation: "\"כל ההשאלות ב-2024\" = \"אין לו אף השאלה שאינה מ-2024\". לכן מוצאים את מי שמפר את התנאי (השאלה עם `loan_year <> 2024`) ושוללים אותו ב-`NOT IN`. החיבור ל-Loans בחוץ מבטיח שהקורא באמת השאיל משהו. התוצאה: Ido. אפשרויות a ו-d מחזירות את מי שיש לו **לפחות** השאלה אחת מתאימה (Dana, Adi, Ido). אפשרות c מחזירה את מי שלא השאיל **אף פעם** ב-2024. זה המבנה של 23B-A2, שאלה 6 (\"כל המבצעים בגובה 1.80 ומעלה\")." },

      { id: "S07-Q7", ctx: scoreSchema,
        question: "מיהן המדינות שמעולם לא **נתנו** 12 נקודות למדינה אחרת?",
        options: [
          {id:"a", type:"code", value:"SELECT DISTINCT from_country\nFROM Score\nWHERE num_points != 12"},
          {id:"b", type:"code", value:"SELECT DISTINCT to_country\nFROM Score\nWHERE to_country NOT IN\n  (SELECT from_country FROM Score WHERE num_points = 12)"},
          {id:"c", type:"code", value:"SELECT DISTINCT from_country\nFROM Score\nWHERE from_country NOT IN\n  (SELECT from_country FROM Score WHERE num_points = 12)"},
          {id:"d", type:"code", value:"SELECT DISTINCT from_country\nFROM Score\nWHERE from_country NOT IN\n  (SELECT to_country FROM Score WHERE num_points = 12)"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "c",
        verify: { ref: "SELECT DISTINCT from_country FROM Score WHERE from_country NOT IN (SELECT from_country FROM Score WHERE num_points = 12)", same: ["c"], differ: ["a", "b", "d"] },
        recap: "\"נתנה\" = from_country, משני הצדדים של ה-NOT IN",
        explanation: "\"נתנה\" ← `from_country`, גם בשאילתה החיצונית וגם בתת-השאילתה: מכל המדינות שנתנו נקודות, שוללים את אלה שנתנו 12 לפחות פעם אחת. התוצאה: Norway ו-Spain. אפשרות a היא מסיח ה-`!=`: ישראל נתנה 8 פעם אחת, ולכן נכנסת למרות שגם נתנה 12. אפשרויות b ו-d מחליפות בין נתנה לקיבלה בצד אחד. זו שאלה 10 של 23B-A2." },

      { id: "S07-Q8", ctx: schema,
        question: "נתונה השאילתה הבאה, שמחזירה את הקוראים שלא השאילו אף ספר. מי מהשאילתות שאחריה שקולות לה?",
        code: "-- השאילתה הנתונה:\nSELECT R.name\nFROM Readers AS R\nWHERE NOT EXISTS (SELECT *\n                  FROM Loans AS L\n                  WHERE L.reader_id = R.reader_id)\n\n-- שאילתה 1:\nSELECT R.name\nFROM Readers AS R\nWHERE R.reader_id NOT IN (SELECT L.reader_id\n                          FROM Loans AS L\n                          WHERE L.reader_id = R.reader_id)\n\n-- שאילתה 2:\nSELECT R.name\nFROM Readers AS R JOIN Loans AS L ON L.reader_id = R.reader_id\nWHERE L.reader_id IS NULL",
        options: [
          {id:"a", type:"text", value:"רק שאילתה 1 שקולה לשאילתה הנתונה."},
          {id:"b", type:"text", value:"רק שאילתה 2 שקולה לשאילתה הנתונה."},
          {id:"c", type:"text", value:"שתי השאילתות (כל אחת בנפרד) שקולות לשאילתה הנתונה."},
          {id:"d", type:"text", value:"אין שאילתה השקולה לשאילתה הנתונה."},
        ], correctId: "a",
        verify: { sql: "SELECT R.name FROM Readers AS R WHERE R.reader_id NOT IN (SELECT L.reader_id FROM Loans AS L WHERE L.reader_id = R.reader_id)", expect: [["Gal"]] },
        recap: "NOT IN מתואם שקול ל-NOT EXISTS · INNER JOIN + IS NULL = תמיד ריק",
        explanation: "שאילתה 1 היא NOT IN **מתואם**: לכל קורא תת-השאילתה מחזירה את המזהה שלו עצמו אם יש לו השאלות, ורשימה ריקה אם אין. ‏`NOT IN` מצליח בדיוק כשהרשימה ריקה, ולכן זה אותו דבר כמו NOT EXISTS (Gal). כך זה היה ב-21B-C, שאלות 12–13. שאילתה 2 משתמשת ב-JOIN **פנימי**: הוא לא מייצר NULL, ולכן `L.reader_id IS NULL` לעולם לא מתקיים והתוצאה תמיד ריקה." },

      { id: "S07-Q9", ctx: schema,
        question: "מיהם הקוראים **שמעולם לא** השאילו ספר מז'אנר `'Classic'`? בחרו את השאילתה הנכונה.",
        options: [
          {id:"a", type:"code", value:"SELECT R.name\nFROM Readers R\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM Loans L JOIN Books B ON L.book_id = B.book_id\n  WHERE L.reader_id = R.reader_id\n    AND B.genre = 'Classic')"},
          {id:"b", type:"code", value:"SELECT R.name\nFROM Readers R\nWHERE NOT EXISTS (\n  SELECT 1 FROM Books B\n  WHERE B.genre = 'Classic')"},
          {id:"c", type:"code", value:"SELECT R.name\nFROM Readers R JOIN Loans L ON R.reader_id = L.reader_id\nWHERE L.book_id NOT IN (\n  SELECT book_id FROM Books\n  WHERE genre <> 'Classic')"},
          {id:"d", type:"code", value:"SELECT DISTINCT R.name\nFROM Readers R JOIN Loans L ON R.reader_id = L.reader_id\n               JOIN Books B ON L.book_id = B.book_id\nWHERE B.genre <> 'Classic'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "a",
        verify: { ref: "SELECT name FROM Readers WHERE reader_id NOT IN (SELECT L.reader_id FROM Loans L JOIN Books B ON L.book_id = B.book_id WHERE B.genre = 'Classic')", same: ["a"], differ: ["b", "c", "d"] },
        recap: "NOT EXISTS חייב תנאי קישור לשורה החיצונית · NOT IN על \"שאינם X\" = כן X",
        explanation: "‏{opt:a} שואלת לכל קורא: האם **הוא** השאיל ספר Classic? אם לא, הוא חוזר: Ido, Nataf ו-Gal. ‏{opt:b} לא מקושרת לקורא: ספרי Classic קיימים, ולכן היא לא מחזירה אף אחד. ‏{opt:c} היא שלילה כפולה: \"השאלה של ספר שאינו בין הלא-Classic\" = השאלה של ספר Classic. לכן היא מחזירה בדיוק את Dana ואת Adi (את Adi פעמיים), ומפספסת גם את Gal, שאין לה השאלות בכלל. ‏{opt:d} היא מסיח ה-`<>` המוכר. זה המבנה של 26S-A, שאלה 8." },
    ],
  });
})();
