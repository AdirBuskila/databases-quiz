/* SQL course · level 10 — final exam: one exam-sized schema (a streaming service), 12 mixed questions */
(function(){
  const USERS = { name: "Users", pk: ["user_id"],
    columns: ["user_id", "name", "country", "join_year"],
    rows: [
      [1, "Dana", "Israel", 2021], [2, "Omer", "Israel", 2023], [3, "Lea", "France", 2023],
      [4, "Ken", "Japan", 2022], [5, "Mia", "France", 2024], [6, "Tom", "Israel", 2024],
    ] };
  const SHOWS = { name: "Shows", pk: ["show_id"],
    columns: ["show_id", "title", "genre", "release_year"],
    rows: [
      [10, "Dark Waters", "Drama", 2019], [11, "Laugh Lab", "Comedy", 2021],
      [12, "Space Run", "SciFi", 2022], [13, "Dark Matter", "SciFi", 2023],
      [14, "Family Jokes", "Comedy", 2020], [15, "Silent Road", "Drama", 2024],
      [16, "Old Tales", "Drama", 2018],
    ] };
  const WATCH = { name: "Watch", pk: ["user_id", "show_id"],
    columns: ["user_id", "show_id", "rating"],
    rows: [
      [1, 10, 5], [1, 11, 4], [1, 12, 5], [1, 13, 4], [1, 14, 3], [1, 15, 4],
      [2, 10, 3], [2, 12, 4], [2, 13, 5],
      [3, 11, 2], [3, 14, 5], [3, 10, null],
      [4, 12, 5], [4, 13, 3],
      [5, 11, 4], [5, 12, 4],
    ] };
  const ACTORS = { name: "Actors", pk: ["actor_id"],
    columns: ["actor_id", "a_name"],
    rows: [[100, "Noa Kirel"], [101, "Alon Abutbul"], [102, "Gal Gadot"], [103, "Sasha Baron"]] };
  const SHOWCAST = { name: "ShowCast", pk: ["show_id", "actor_id"],
    columns: ["show_id", "actor_id"],
    rows: [[10, 101], [13, 101], [12, 102], [13, 102], [11, 103], [14, 103], [15, 100]] };
  const DB = [USERS, SHOWS, WATCH, ACTORS, SHOWCAST];
  const schema = { title: "חלק ב׳: SQL, שירות סטרימינג",
    intro: "נתונות תבניות היחסים הבאות של שירות סטרימינג. קו תחתון מסמן מפתח ראשי.",
    relations: [
      { schema: "Users([u]user_id[/u], name, country, join_year)", meaning: "מנוי: שם, מדינה ושנת הצטרפות" },
      { schema: "Shows([u]show_id[/u], title, genre, release_year)", meaning: "סדרה: שם, ז'אנר ושנת יציאה" },
      { schema: "Watch([u]user_id[/u], [u]show_id[/u], rating)", meaning: "מנוי צפה בסדרה; rating = דירוג 1–5, או NULL אם לא דירג" },
      { schema: "Actors([u]actor_id[/u], a_name)", meaning: "שחקן" },
      { schema: "ShowCast([u]show_id[/u], [u]actor_id[/u])", meaning: "שחקן משתתף בסדרה" },
    ] };
  const J = "FROM Users U\nJOIN Watch W ON U.user_id = W.user_id";

  SQL_LEVEL({
    id: "S10", order: 10, icon: "🏆", title: "מבחן גמר", boss: true,
    goal: "12 שאלות ברמת המבחן על סכמה אחת חדשה: כל חמש התבניות (קיבוץ, חיבור, חילוק, קיצון, שלילה) ועוד.",
    db: DB,
    lesson: {
      html: `
<p>זה חלק ב׳ של המבחן בקטן: סכמה אחת ו-12 שאלות. לפני כל שאלה עוברים על הצ׳קליסט:</p>
<ol>
  <li><strong>זהה את התבנית</strong> לפי מילת המפתח: "לכל X" → קיבוץ · "לכל ה-___" → חילוק · "הכי / מקסימלי" → קיצון · "אף פעם / שלא" → שלילה · נתון מטבלה רחוקה → שרשרת JOIN.</li>
  <li><strong>שורת הזהב:</strong> FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. אגרגציה ב-WHERE, או עמודה רגילה לצד MAX בלי GROUP BY, נפסלות מיד.</li>
  <li><strong>שרשרת מלאה:</strong> כל טבלה שעמודה שלה מופיעה בשאילתה חייבת להיות ב-FROM, וכל ON חייב לחבר מפתחות תואמים.</li>
  <li><strong>ספור תנאים</strong> והשווה ל-AND-ים. "שונים" → COUNT(DISTINCT). "יותר מ-N" → ‎> N. "לפחות N" → ‎>= N.</li>
  <li><strong>קיצון:</strong> <code>&gt;= ALL</code> (לא <code>&gt; ALL</code>) · <code>= (SELECT MAX …)</code> · MAX(COUNT) / AVG(MAX) אסורים, ובמקומם תת-שאילתה ב-FROM עם alias.</li>
  <li><strong>שלילה:</strong> NOT IN · NOT EXISTS · LEFT JOIN … IS NULL. INNER JOIN עם IS NULL תמיד ריק, ו-<code>!=</code> אינו "אף פעם".</li>
  <li><strong>חילוק:</strong> NOT EXISTS כפול עם סינון של המחלק · (שלו) CONTAINS (הנדרש) · ספירה עם WHERE ו-DISTINCT.</li>
</ol>
<div class="lesson-rule">🔑 בכל שאלה של "איזו שאילתה נכונה": פסול קודם לפי <strong>תחביר</strong> (שורת הזהב), אחר כך לפי <strong>כיוון ותנאים</strong> (from/to, AND/OR, &gt;/&gt;=), ורק בסוף לפי <strong>משמעות</strong>. אם כולן נפסלו, סמן "כל התשובות האחרות אינן נכונות" בלי לפחד: זו הייתה התשובה הנכונה ב-5 שאלות מבחן.</div>
<div class="lesson-trap">⚠️ <strong>NULL בדירוג:</strong> AVG מתעלם מ-NULL, ו-<code>rating &lt; 4</code> לא מתקיים עבור NULL. כשהשאלה תלויה בזה, עקוב אחרי השורה עם ה-NULL.</div>`,
      figs: [],
    },
    questions: [
      { id: "S10-Q1", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הסדרות שהשם שלהן **מתחיל** ב-`Dark` ושיצאו **אחרי** 2020?",
        options: [
          {id:"a", type:"code", value:"SELECT title FROM Shows\nWHERE title LIKE 'Dark%' OR release_year > 2020"},
          {id:"b", type:"code", value:"SELECT title FROM Shows\nWHERE title LIKE '%Dark' AND release_year > 2020"},
          {id:"c", type:"code", value:"SELECT title FROM Shows\nWHERE title = 'Dark%' AND release_year > 2020"},
          {id:"d", type:"code", value:"SELECT title FROM Shows\nWHERE title LIKE 'Dark%' AND release_year > 2020"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { ref: "SELECT title FROM Shows WHERE title LIKE 'Dark%' AND release_year > 2020", same: ["d"], differ: ["a", "b", "c"] },
        recap: "מתחיל = 'x%' · שני תנאים = AND",
        explanation: "\"מתחיל ב-Dark\" הוא `LIKE 'Dark%'`, ושני תנאים שחייבים להתקיים יחד מחוברים ב-AND. על הנתונים יוצאת רק Dark Matter (2023), כי Dark Waters יצאה ב-2019. {opt:a} מחליפה ל-OR, {opt:b} בודקת \"מסתיים ב-Dark\", ו-{opt:c} משתמשת ב-`=` עם תבנית." },

      { id: "S10-Q2", ctx: schema,
        question: "איזו שאילתה מציגה לכל ז'אנר את **מספר המנויים השונים** שצפו בסדרה מהז'אנר?",
        options: [
          {id:"a", type:"code", value:"SELECT S.genre, COUNT(W.user_id)\nFROM Shows S JOIN Watch W ON S.show_id = W.show_id\nGROUP BY S.genre"},
          {id:"b", type:"code", value:"SELECT S.genre, COUNT(DISTINCT W.user_id)\nFROM Shows S JOIN Watch W ON S.show_id = W.show_id\nGROUP BY S.genre"},
          {id:"c", type:"code", value:"SELECT S.genre, COUNT(DISTINCT W.user_id)\nFROM Shows S JOIN Watch W ON S.show_id = W.show_id\nGROUP BY S.title"},
          {id:"d", type:"code", value:"SELECT genre, COUNT(DISTINCT user_id)\nFROM Shows\nGROUP BY genre"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: { ref: "SELECT S.genre, COUNT(DISTINCT W.user_id) FROM Shows S JOIN Watch W ON S.show_id = W.show_id GROUP BY S.genre", same: ["b"], differ: ["a", "c", "d"] },
        recap: "\"מנויים שונים\" = COUNT(DISTINCT) · \"לכל ז'אנר\" = GROUP BY genre",
        explanation: "\"לכל ז'אנר\" → `GROUP BY S.genre`, ו\"מנויים **שונים**\" → `COUNT(DISTINCT W.user_id)`. Dana צפתה בשתי סדרות קומדיה, ובלי DISTINCT ({opt:a}) היא נספרת פעמיים. {opt:c} מקבצת לפי סדרה ולא לפי ז'אנר. ב-{opt:d} חסר JOIN: אין user_id בטבלה Shows." },

      { id: "S10-Q3", ctx: schema,
        question: "השלימו את החסר במקום X כך שהשאילתה תחזיר את שמות המנויים שצפו **ביותר מ-3** סדרות.",
        code: "SELECT U.name\nFROM Users U\nJOIN Watch W ON U.user_id = W.user_id\n____X____",
        options: [
          {id:"a", type:"code", value:"WHERE COUNT(*) > 3\nGROUP BY U.user_id, U.name"},
          {id:"b", type:"code", value:"GROUP BY U.user_id, U.name\nHAVING COUNT(*) >= 3"},
          {id:"c", type:"code", value:"GROUP BY U.user_id, U.name\nHAVING COUNT(*) > 3"},
          {id:"d", type:"code", value:"HAVING COUNT(*) > 3"},
          {id:"e", type:"code", value:"GROUP BY U.name\nWHERE COUNT(*) > 3"},
        ], correctId: "c",
        verify: { sql: "SELECT U.name FROM Users U JOIN Watch W ON U.user_id = W.user_id GROUP BY U.user_id, U.name HAVING COUNT(*) > 3", expect: [["Dana"]] },
        recap: "תנאי על COUNT → HAVING אחרי GROUP BY · \"יותר מ-3\" = > 3",
        explanation: "תנאי על ספירה שייך ל-**HAVING**, אחרי `GROUP BY`. מקבצים לפי המזהה (ולא רק לפי השם, כי שמות יכולים לחזור). \"יותר מ-3\" הוא `> 3`, ולכן `>= 3` ({opt:b}) מכניס גם את Omer ואת Lea, שצפו ב-3 בדיוק. ב-{opt:a} וב-{opt:e} יש אגרגציה ב-WHERE (וב-{opt:e} גם GROUP BY לפני WHERE). ב-{opt:d} יש HAVING בלי GROUP BY, ולכן כל השורות נספרות כקבוצה אחת. רק Dana (6 סדרות) עונה על הדרישה." },

      { id: "S10-Q4", ctx: schema,
        question: "איזו שאילתה מחזירה את שם הסדרה (או הסדרות) עם **הדירוג הממוצע הגבוה ביותר**?",
        options: [
          {id:"a", type:"code", value:"SELECT S.title\nFROM Shows S JOIN Watch W ON S.show_id = W.show_id\nGROUP BY S.show_id, S.title\nHAVING AVG(W.rating) > ALL\n  (SELECT AVG(rating) FROM Watch\n   WHERE rating IS NOT NULL GROUP BY show_id)"},
          {id:"b", type:"code", value:"SELECT S.title\nFROM Shows S JOIN Watch W ON S.show_id = W.show_id\nWHERE W.rating = (SELECT MAX(rating) FROM Watch)"},
          {id:"c", type:"code", value:"SELECT S.title\nFROM Shows S JOIN Watch W ON S.show_id = W.show_id\nGROUP BY S.show_id, S.title\nHAVING AVG(W.rating) >= ALL\n  (SELECT AVG(rating) FROM Watch\n   WHERE rating IS NOT NULL GROUP BY show_id)"},
          {id:"d", type:"code", value:"SELECT S.title, MAX(AVG(W.rating))\nFROM Shows S JOIN Watch W ON S.show_id = W.show_id\nGROUP BY S.title"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { ref: "SELECT S.title FROM Shows S JOIN Watch W ON S.show_id = W.show_id GROUP BY S.show_id, S.title HAVING AVG(W.rating) = (SELECT MAX(a) FROM (SELECT AVG(rating) AS a FROM Watch GROUP BY show_id) AS T)", differ: ["b", "d"] },
        recap: "מקסימום של ממוצעים: HAVING AVG(…) >= ALL (ממוצעים לכל קבוצה) · > ALL ריק",
        explanation: "מחשבים ממוצע לכל סדרה ומשאירים את מי שהממוצע שלה **גדול או שווה לכל** הממוצעים. כאן זו Space Run, עם 4.5. ב-{opt:a} ‏`> ALL` דורש להיות גדול **גם מעצמו**, ולכן התוצאה ריקה (26B-A שאלה 11). {opt:b} מחזירה סדרות שקיבלו **דירוג בודד** של 5, וזה לא ממוצע. {opt:d} מקננת אגרגציה (MAX(AVG)), וזה אסור (23B-A2 שאלה 8). הערה: AVG מתעלם מה-NULL של Lea, ולכן Dark Waters מקבלת 4 ולא 2.67. בתת-השאילתה מסננים `rating IS NOT NULL`: אם הייתה סדרה שאף אחד לא דירג, הממוצע שלה היה NULL, והשוואה ל-NULL אף פעם לא אמת, ולכן `>= ALL` היה מחזיר תוצאה ריקה." },

      { id: "S10-Q5", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות המנויים ש**מעולם לא** צפו בסדרה מז'אנר `'Comedy'`?",
        options: [
          {id:"a", type:"code", value:"SELECT name FROM Users\nWHERE user_id NOT IN\n  (SELECT W.user_id\n   FROM Watch W JOIN Shows S ON W.show_id = S.show_id\n   WHERE S.genre = 'Comedy')"},
          {id:"b", type:"code", value:"SELECT DISTINCT U.name\nFROM Users U\nJOIN Watch W ON U.user_id = W.user_id\nJOIN Shows S ON W.show_id = S.show_id\nWHERE S.genre <> 'Comedy'"},
          {id:"c", type:"code", value:"SELECT name FROM Users\nWHERE user_id NOT IN\n  (SELECT user_id FROM Shows WHERE genre = 'Comedy')"},
          {id:"d", type:"code", value:"SELECT U.name\nFROM Users U LEFT JOIN Watch W ON U.user_id = W.user_id\nWHERE W.user_id IS NULL"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "a",
        verify: { ref: "SELECT name FROM Users WHERE user_id NOT IN (SELECT W.user_id FROM Watch W JOIN Shows S ON W.show_id = S.show_id WHERE S.genre = 'Comedy')", same: ["a"], differ: ["b", "c", "d"] },
        recap: "\"מעולם לא\" = NOT IN (מי שכן) · <> מחזיר מי שצפה במשהו אחר",
        explanation: "\"מעולם לא צפו בקומדיה\" = כל המנויים **פחות** מי שצפה בקומדיה. התוצאה: Omer, Ken ו-Tom (Tom לא צפה בכלום, ולכן גם הוא בפנים). {opt:b} מחזירה מי שצפה **לפחות בסדרה אחת שאינה קומדיה**, כולל Dana שצפתה בקומדיות. ב-{opt:c} תת-השאילתה שואלת את Shows, שאין בה user_id, אותה טעות כמו ב-26B-A שאלה 7. {opt:d} מחזירה רק את מי שלא צפה בשום דבר (Tom)." },

      { id: "S10-Q6", ctx: schema,
        question: "נתונות שלוש הצעות לשאלה \"הציגו את שמות הסדרות שאף מנוי לא צפה בהן\". מה נכון?",
        code: "-- פתרון 1:\nSELECT title FROM Shows\nWHERE show_id NOT IN (SELECT show_id FROM Watch)\n\n-- פתרון 2:\nSELECT title FROM Shows S\nWHERE NOT EXISTS (SELECT * FROM Watch W\n                  WHERE W.show_id = S.show_id)\n\n-- פתרון 3:\nSELECT S.title\nFROM Shows S JOIN Watch W ON W.show_id = S.show_id\nWHERE W.user_id IS NULL",
        options: [
          {id:"a", type:"text", value:"כל שלושת הפתרונות נכונים."},
          {id:"b", type:"text", value:"רק פתרון 3 נכון."},
          {id:"c", type:"text", value:"רק פתרון 1 ופתרון 2 נכונים."},
          {id:"d", type:"text", value:"רק פתרון 1 נכון."},
          {id:"e", type:"text", value:"אף פתרון אינו נכון."},
        ], correctId: "c",
        verify: { sql: "SELECT title FROM Shows S WHERE NOT EXISTS (SELECT * FROM Watch W WHERE W.show_id = S.show_id)", expect: [["Old Tales"]] },
        recap: "שלילה: NOT IN ✓ · NOT EXISTS ✓ · INNER JOIN + IS NULL = תמיד ריק",
        explanation: "פתרונות 1 ו-2 הם שתיים משלוש הצורות הכשרות לשלילה, ושניהם מחזירים את Old Tales. פתרון 3 משתמש ב-**INNER** JOIN, שמוחק סדרות בלי צפייה עוד לפני ה-WHERE. ובשורות שנשארו user_id לא NULL, ולכן התוצאה תמיד ריקה. כדי שהוא יעבוד צריך LEFT JOIN, וזו הצורה השלישית (25S-B שאלות 7 ו-12)." },

      { id: "S10-Q7", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות המנויים שצפו **בכל** הסדרות מז'אנר `'SciFi'`?",
        options: [
          {id:"a", type:"code", value:"SELECT DISTINCT U.name\nFROM Users U\nJOIN Watch W ON U.user_id = W.user_id\nJOIN Shows S ON W.show_id = S.show_id\nWHERE S.genre = 'SciFi'"},
          {id:"b", type:"code", value:"SELECT name FROM Users U\nWHERE NOT EXISTS (\n  SELECT * FROM Shows S\n  WHERE NOT EXISTS (\n    SELECT * FROM Watch W\n    WHERE W.user_id = U.user_id\n      AND W.show_id = S.show_id))"},
          {id:"c", type:"code", value:"SELECT name FROM Users U\nWHERE NOT EXISTS (\n  SELECT * FROM Watch W\n  WHERE W.user_id = U.user_id\n    AND W.show_id IN (SELECT show_id FROM Shows\n                      WHERE genre = 'SciFi'))"},
          {id:"d", type:"code", value:"SELECT name FROM Users U\nWHERE NOT EXISTS (\n  SELECT * FROM Shows S\n  WHERE S.genre = 'SciFi'\n    AND NOT EXISTS (\n      SELECT * FROM Watch W\n      WHERE W.user_id = U.user_id\n        AND W.show_id = S.show_id))"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { ref: "SELECT name FROM Users U WHERE NOT EXISTS (SELECT * FROM Shows S WHERE S.genre = 'SciFi' AND NOT EXISTS (SELECT * FROM Watch W WHERE W.user_id = U.user_id AND W.show_id = S.show_id))", same: ["d"], differ: ["a", "b", "c"] },
        recap: "חילוק: NOT EXISTS כפול + סינון המחלק (genre = 'SciFi')",
        explanation: "שלילה כפולה: **אין** סדרת SciFi ש**אין** למנוי צפייה בה. יוצאים Dana, Omer ו-Ken. {opt:a} מחזירה מי שצפה **לפחות** בסדרת SciFi אחת, ולכן גם Mia, שראתה רק את Space Run, נכנסת. {opt:b} שכחה את `genre = 'SciFi'` ודורשת **את כל הסדרות**, ולכן אף אחד לא עובר. {opt:c} היא שלילה יחידה: מי שלא צפה באף SciFi (Lea, Tom)." },

      { id: "S10-Q8", ctx: schema,
        question: "איזו שאילתה (בגרסת הספירה) מחזירה את שמות המנויים שצפו בכל סדרות ה-`'Comedy'`?",
        options: [
          {id:"a", type:"code", value:"SELECT U.name\nFROM Users U\nJOIN Watch W ON U.user_id = W.user_id\nGROUP BY U.user_id, U.name\nHAVING COUNT(DISTINCT W.show_id) =\n  (SELECT COUNT(*) FROM Shows WHERE genre = 'Comedy')"},
          {id:"b", type:"code", value:"SELECT U.name\nFROM Users U\nJOIN Watch W ON U.user_id = W.user_id\nJOIN Shows S ON W.show_id = S.show_id\nWHERE S.genre = 'Comedy'\nGROUP BY U.user_id, U.name\nHAVING COUNT(DISTINCT W.show_id) =\n  (SELECT COUNT(*) FROM Shows)"},
          {id:"c", type:"code", value:"SELECT U.name\nFROM Users U\nJOIN Watch W ON U.user_id = W.user_id\nJOIN Shows S ON W.show_id = S.show_id\nWHERE S.genre = 'Comedy'\nGROUP BY U.user_id, U.name\nHAVING COUNT(DISTINCT W.show_id) =\n  (SELECT COUNT(*) FROM Shows WHERE genre = 'Comedy')"},
          {id:"d", type:"code", value:"SELECT name FROM Users U\nWHERE (SELECT show_id FROM Shows WHERE genre = 'Comedy')\n  CONTAINS\n  (SELECT show_id FROM Watch W WHERE W.user_id = U.user_id)"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { ref: "SELECT U.name FROM Users U JOIN Watch W ON U.user_id = W.user_id JOIN Shows S ON W.show_id = S.show_id WHERE S.genre = 'Comedy' GROUP BY U.user_id, U.name HAVING COUNT(DISTINCT W.show_id) = (SELECT COUNT(*) FROM Shows WHERE genre = 'Comedy')", same: ["c"], differ: ["a", "b"] },
        recap: "ספירה: WHERE על המחלק + COUNT(DISTINCT) = מספר הנדרשים",
        explanation: "סופרים רק צפיות **בקומדיה** (WHERE) ומשווים למספר הקומדיות (2). יוצאות Dana ו-Lea. {opt:a} סופרת את **כל** הצפיות, ולכן Mia (קומדיה ו-SciFi) ו-Ken (שתי סדרות SciFi), עם 2 צפיות כל אחד, \"עוברים\" בטעות, ו-Dana (6) ו-Lea (3) נופלות. {opt:b} משווה למספר **כל** הסדרות. {opt:d} הופכת את כיוון ה-CONTAINS: \"הקומדיות מכילות את כל מה שצפה בו\", כלומר צפה **רק** בקומדיות, ומי שלא צפה בכלום (Tom) עובר." },

      { id: "S10-Q9", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות השחקנים שמשתתפים בסדרות ש-`'Ken'` צפה בהן?",
        options: [
          {id:"a", type:"code", value:"SELECT DISTINCT A.a_name\nFROM Watch W\nJOIN ShowCast C ON W.show_id = C.show_id\nJOIN Actors A ON C.actor_id = A.actor_id\nWHERE W.name = 'Ken'"},
          {id:"b", type:"code", value:"SELECT DISTINCT A.a_name\nFROM Users U\nJOIN Watch W ON U.user_id = W.user_id\nJOIN ShowCast C ON W.show_id = C.actor_id\nJOIN Actors A ON C.actor_id = A.actor_id\nWHERE U.name = 'Ken'"},
          {id:"c", type:"code", value:"SELECT DISTINCT A.a_name\nFROM Users U, Watch W, ShowCast C, Actors A\nWHERE U.name = 'Ken'"},
          {id:"d", type:"code", value:"SELECT DISTINCT A.a_name\nFROM Users U\nJOIN Watch W ON U.user_id = W.user_id\nJOIN ShowCast C ON W.show_id = C.show_id\nJOIN Actors A ON C.actor_id = A.actor_id\nWHERE U.name = 'Ken'"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { ref: "SELECT DISTINCT A.a_name FROM Users U JOIN Watch W ON U.user_id = W.user_id JOIN ShowCast C ON W.show_id = C.show_id JOIN Actors A ON C.actor_id = A.actor_id WHERE U.name = 'Ken'", same: ["d"], differ: ["a", "b", "c"] },
        recap: "שרשרת מלאה Users → Watch → ShowCast → Actors, וכל ON על המפתח הנכון",
        explanation: "השם 'Ken' יושב ב-Users ושם השחקן ב-Actors, ולכן צריך את כל השרשרת: Users → Watch → ShowCast → Actors. Ken צפה ב-Space Run וב-Dark Matter, ולכן יוצאים Gal Gadot ו-Alon Abutbul. {opt:a} עוצרת לפני Users ומחפשת `W.name`, שלא קיים (24B-A שאלה 6). {opt:b} מחברת `show_id` ל-`actor_id`, החיבור לפי המזהה הלא-נכון. ב-{opt:c} יש פסיקים בלי תנאי חיבור, כלומר מכפלה קרטזית שמחזירה את כל השחקנים." },

      { id: "S10-Q10", ctx: schema,
        question: "סמנו את התיאור המתאים ביותר לשאילתה:",
        code: "SELECT name\nFROM Users\nWHERE user_id NOT IN (SELECT user_id\n                      FROM Watch\n                      WHERE rating < 4)",
        options: [
          {id:"a", type:"text", value:"מנויים שנתנו לפחות דירוג אחד של 4 ומעלה."},
          {id:"b", type:"text", value:"מנויים שכל הדירוגים שנתנו הם 4 ומעלה, ובהם גם מנויים שלא צפו כלל."},
          {id:"c", type:"text", value:"מנויים שכל הדירוגים שנתנו הם 4 ומעלה, ושצפו לפחות בסדרה אחת."},
          {id:"d", type:"text", value:"מנויים שלא נתנו אף דירוג."},
          {id:"e", type:"text", value:"השאילתה כתובה באופן שגוי."},
        ], correctId: "b",
        verify: { sql: "SELECT name FROM Users WHERE user_id NOT IN (SELECT user_id FROM Watch WHERE rating < 4)", expect: [["Mia"], ["Tom"]] },
        recap: "\"כולם מקיימים P\" = NOT IN (מי שמפר את P), ומי שאין לו שורות עובר אוטומטית",
        explanation: "תת-השאילתה מוצאת את מי שנתן **דירוג מתחת ל-4** לפחות פעם אחת (Dana, Omer, Lea ו-Ken). NOT IN משאיר את כל השאר, כלומר מי ש**אף דירוג שלו** אינו מתחת ל-4. זו התבנית \"כולם מקיימים P\" (23B-A2 שאלה 6). Tom לא צפה בכלום, ולכן הוא לא מפר כלום ונשאר בתוצאה. ה-NULL של Lea לא משנה כאן, כי היא כבר בפנים בגלל הדירוג 2." },

      { id: "S10-Q11", ctx: schema,
        question: "לכל מדינה, מהו **ממוצע מספר הסדרות** שצפה בהן מנוי (מבין המנויים שצפו בסדרה אחת לפחות)?",
        options: [
          {id:"a", type:"code", value:"SELECT country, AVG(COUNT(*))\nFROM Users JOIN Watch USING(user_id)\nGROUP BY country"},
          {id:"b", type:"code", value:"SELECT AVG(cnt)\nFROM (SELECT U.user_id, U.country, COUNT(*) AS cnt\n      FROM Users U JOIN Watch W ON U.user_id = W.user_id\n      GROUP BY U.user_id, U.country) AS T"},
          {id:"c", type:"code", value:"SELECT country, AVG(cnt)\nFROM (SELECT U.user_id, U.country, COUNT(*) AS cnt\n      FROM Users U JOIN Watch W ON U.user_id = W.user_id\n      GROUP BY U.user_id, U.country) AS T\nGROUP BY country"},
          {id:"d", type:"code", value:"SELECT country, COUNT(*)\nFROM Users JOIN Watch USING(user_id)\nGROUP BY country"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { ref: "SELECT country, AVG(cnt) FROM (SELECT U.user_id, U.country, COUNT(*) AS cnt FROM Users U JOIN Watch W ON U.user_id = W.user_id GROUP BY U.user_id, U.country) AS T GROUP BY country", same: ["c"], differ: ["a", "b", "d"] },
        recap: "ממוצע של ספירות = תת-שאילתה ב-FROM (רמה 1) + GROUP BY בחוץ (רמה 2)",
        explanation: "רמה 1, בתוך FROM: כמה סדרות צפה כל מנוי. רמה 2: ממוצע **לכל מדינה**. יוצא Israel 4.5 (Dana 6, Omer 3), France 2.5 (Lea 3, Mia 2) ו-Japan 2. {opt:a} מקננת AVG(COUNT), וזה אסור. ב-{opt:b} חסר `GROUP BY country` בחוץ, ולכן מתקבל ממוצע אחד לכולם. {opt:d} מחזירה **סך** צפיות לכל מדינה, לא ממוצע. (Tom לא צפה בכלום, ולכן ה-JOIN משמיט אותו, וזה מה שהשאלה ביקשה.)" },

      { id: "S10-Q12", ctx: schema,
        question: "איזו שאילתה מציגה את הז'אנר ואת שם הסדרה, כשהז'אנרים **בסדר עולה**, ובתוך כל ז'אנר הסדרה **החדשה ביותר ראשונה**?",
        options: [
          {id:"a", type:"code", value:"SELECT genre, title FROM Shows\nORDER BY genre DESC, release_year"},
          {id:"b", type:"code", value:"SELECT genre, title FROM Shows\nORDER BY genre, release_year"},
          {id:"c", type:"code", value:"SELECT genre, title FROM Shows\nGROUP BY genre, title"},
          {id:"d", type:"code", value:"SELECT genre, title FROM Shows\nORDER BY genre, release_year DESC"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { ref: "SELECT genre, title FROM Shows ORDER BY genre, release_year DESC", same: ["d"], differ: ["a", "b", "c"] },
        recap: "DESC חל רק על העמודה שלפניו · ברירת המחדל עולה",
        explanation: "`ORDER BY genre, release_year DESC`: הז'אנר בסדר עולה (ברירת מחדל), ובתוך כל ז'אנר שנת היציאה בסדר יורד, כלומר החדשה ראשונה. **DESC חל רק על העמודה שלפניו**. {opt:a} הופכת את הסדר: ז'אנרים יורדים וסדרות מהישנה לחדשה. {opt:b} מסדרת מהישנה לחדשה. GROUP BY ({opt:c}) לא מבטיח שום סדר. מותר למיין לפי עמודה שלא מוצגת ב-SELECT. זו 21B-A שאלה 8 / 22B-A שאלה 9." },
    ],
  });
})();
