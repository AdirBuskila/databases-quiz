/* SQL course · level 8 — division ("לכל ה-___"): double NOT EXISTS, CONTAINS, counting */
(function(){
  const STUDENTS = { name: "Students", pk: ["student_id"],
    columns: ["student_id", "first_name"],
    rows: [ [1, "Dana"], [2, "Adi"], [3, "Ido"], [4, "Noa"], [5, "Nataf"] ] };
  const COURSES = { name: "Courses", pk: ["course_id"],
    columns: ["course_id", "course_name", "department"],
    rows: [
      [101, "Calculus", "Mathematics"],
      [102, "Algebra", "Mathematics"],
      [103, "Logic", "Mathematics"],
      [201, "Mechanics", "Physics"],
      [301, "Organic", "Chemistry"],
    ] };
  const ENROLL = { name: "Enrollments", pk: ["student_id", "course_id", "semester"],
    columns: ["student_id", "course_id", "semester"],
    rows: [
      [1, 101, "A"], [1, 102, "A"], [1, 103, "B"],                    // Dana: all 3 math
      [2, 101, "A"], [2, 101, "B"], [2, 102, "A"],                    // Adi: 101 twice, no 103
      [3, 101, "A"], [3, 102, "B"], [3, 103, "B"], [3, 201, "A"],     // Ido: all math + physics
      [4, 201, "A"],                                                  // Noa: physics only
    ] };                                                              // Nataf: nothing
  const DB = [STUDENTS, COURSES, ENROLL];
  const schema = { relations: [
    { schema: "Students([u]student_id[/u], first_name)", meaning: "סטודנט" },
    { schema: "Courses([u]course_id[/u], course_name, department)", meaning: "קורס והמחלקה שמציעה אותו" },
    { schema: "Enrollments([u]student_id[/u], [u]course_id[/u], [u]semester[/u])", meaning: "רישום של סטודנט לקורס בסמסטר (אפשר לחזור על קורס)" },
  ] };
  const withData = { title: "נתונים לדוגמה", tables: DB };
  const DNE = "SELECT S.first_name\nFROM Students S\nWHERE NOT EXISTS (\n  SELECT * FROM Courses C\n  WHERE C.department = 'Mathematics'\n    AND NOT EXISTS (\n      SELECT * FROM Enrollments E\n      WHERE E.student_id = S.student_id\n        AND E.course_id = C.course_id))";

  SQL_LEVEL({
    id: "S08", order: 8, icon: "➗", title: "חילוק: \"לכל ה-___\"",
    goal: "לזהות שאלת \"לכל\" ולכתוב אותה בשלילה כפולה (NOT EXISTS כפול), ב-CONTAINS או בספירה.",
    db: DB,
    lesson: {
      html: `
<p>"סטודנט שנרשם <strong>לכל</strong> קורסי המתמטיקה" היא שאלת <strong>חילוק</strong>. ב-SQL אין "לכל", ולכן הופכים אותה לשלילה כפולה:</p>
<div class="lesson-rule">🔑 "X שקשור <strong>לכל</strong> ה-Y" ≡ "<strong>אין</strong> Y (מהסוג הנדרש) <strong>שאין</strong> לו קשר עם X". קוראים מבפנים החוצה: הפנימי בודק "האם X רשום ל-Y הזה?", והחיצוני בודק "האם קיים Y כזה שלא?".</div>
{fig:0}
<h3>צעד אחר צעד על הנתונים</h3>
<p>לכל סטודנט עוברים על שלושת קורסי המתמטיקה ומחפשים קורס <strong>חסר</strong>. מי שאין לו קורס חסר עובר:</p>
<table><thead><tr><th>סטודנט</th><th>101</th><th>102</th><th>103</th><th>קורס חסר?</th><th>בתוצאה?</th></tr></thead><tbody>
<tr><td>Dana</td><td>✓</td><td>✓</td><td>✓</td><td>אין</td><td>✅</td></tr>
<tr><td>Adi</td><td>✓ (פעמיים)</td><td>✓</td><td>✗</td><td>103</td><td>❌</td></tr>
<tr><td>Ido</td><td>✓</td><td>✓</td><td>✓</td><td>אין (Mechanics לא משנה)</td><td>✅</td></tr>
<tr><td>Noa</td><td>✗</td><td>✗</td><td>✗</td><td>כולם</td><td>❌</td></tr>
<tr><td>Nataf</td><td>✗</td><td>✗</td><td>✗</td><td>כולם</td><td>❌</td></tr>
</tbody></table>
<p>שתי דרכים נוספות לאותה שאלה:</p>
<ul>
  <li><strong>הכלה:</strong> <code>(הקורסים שלו) CONTAINS (קורסי המתמטיקה)</code>. הכיוון קבוע: <strong>מה שיש לו</strong> מכיל את <strong>מה שנדרש</strong> (25B-A שאלה 11, 21S-B שאלה 13). לא כל מימוש של SQL תומך ב-CONTAINS.</li>
  <li><strong>ספירה:</strong> מסננים רק את קורסי המתמטיקה, סופרים <code>COUNT(DISTINCT course_id)</code> לכל סטודנט ומשווים למספר קורסי המתמטיקה (23B-A2 שאלה 11).</li>
</ul>
{fig:1}
<div class="lesson-trap">⚠️ <strong>המסיחים הקבועים (25B-A שאלה 10):</strong> שלילה <strong>יחידה</strong> = "לא נרשם לאף קורס" · <code>EXISTS</code> פנימי = "לפחות קורס אחד" · JOIN רגיל = "לפחות אחד" · לשכוח את <code>department = 'Mathematics'</code> = "לכל הקורסים בכלל". ובספירה: בלי DISTINCT, Adi (שלמד את 101 פעמיים) נספר 3 ו"עובר" בטעות. בלי סינון המחלקה, Ido (שיש לו קורס פיזיקה נוסף) נספר 4 ונופל.</div>
<div class="lesson-trap">⚠️ <strong>"כל" שאינו חילוק (23B-A שאלה 12):</strong> "מדינות ש<strong>כל פעם לא</strong> נתנו נקודות לישראל" = "אף פעם לא" = <strong>הפרש</strong>. המבחן: אפשר לנסח "לכל ה-___" עם שם עצם ברבים (כל הקורסים, כל היעדים)? אז חילוק. מתאים רק "אף פעם"? אז הפרש.</div>`,
      figs: [
        { caption: "שלילה כפולה: Dana ו-Ido רשומים לכל שלושת קורסי המתמטיקה.",
          tables: DB, sql: DNE,
          result: { columns: ["first_name"], rows: [["Dana"], ["Ido"]] } },
        { caption: "גרסת הספירה: מסננים רק מתמטיקה, סופרים DISTINCT ומשווים ל-3.",
          tables: DB,
          sql: "SELECT S.first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.department = 'Mathematics'\nGROUP BY S.student_id, S.first_name\nHAVING COUNT(DISTINCT C.course_id) =\n  (SELECT COUNT(*) FROM Courses WHERE department = 'Mathematics')",
          result: { columns: ["first_name"], rows: [["Dana"], ["Ido"]] } },
      ],
    },
    questions: [
      { id: "S08-Q1", ctx: withData,
        question: "אילו סטודנטים מחזירה השאילתה?",
        code: DNE,
        options: [
          {id:"a", type:"text", value:"רק Dana, כי ל-Ido יש גם קורס שאינו במתמטיקה."},
          {id:"b", type:"text", value:"Dana, Adi ו-Ido"},
          {id:"c", type:"text", value:"Dana ו-Ido"},
          {id:"d", type:"text", value:"Noa ו-Nataf"},
        ], correctId: "c",
        verify: { sql: DNE, expect: [["Dana"], ["Ido"]] },
        recap: "שלילה כפולה = אין קורס נדרש שחסר לו",
        explanation: "קוראים מבפנים: לכל סטודנט מחפשים קורס מתמטיקה **שהוא לא רשום אליו**. ל-Dana ול-Ido אין קורס כזה, ולכן הם עוברים. ל-Adi חסר 103. קורסים נוספים מחוץ למתמטיקה לא מפריעים, כי השאילתה בודקת רק שאין **חוסר**, ולכן Ido עובר. Noa ו-Nataf הם בדיוק ההפך: חסרים להם כל הקורסים." },

      { id: "S08-Q2", ctx: withData,
        question: "מה מחזירה השאילתה?",
        code: "SELECT S.first_name\nFROM Students S\nWHERE NOT EXISTS (\n  SELECT * FROM Courses C\n  WHERE C.department = 'Mathematics'\n    AND EXISTS (\n      SELECT * FROM Enrollments E\n      WHERE E.student_id = S.student_id\n        AND E.course_id = C.course_id))",
        options: [
          {id:"a", type:"text", value:"סטודנטים שנרשמו לכל קורסי המתמטיקה (Dana, Ido)."},
          {id:"b", type:"text", value:"סטודנטים שלא נרשמו לאף קורס במתמטיקה (Noa, Nataf)."},
          {id:"c", type:"text", value:"סטודנטים שנרשמו לקורס מתמטיקה אחד לפחות (Dana, Adi, Ido)."},
          {id:"d", type:"text", value:"סטודנטים שחסר להם לפחות קורס מתמטיקה אחד (Adi, Noa, Nataf)."},
        ], correctId: "b",
        verify: { sql: "SELECT S.first_name FROM Students S WHERE NOT EXISTS (SELECT * FROM Courses C WHERE C.department = 'Mathematics' AND EXISTS (SELECT * FROM Enrollments E WHERE E.student_id = S.student_id AND E.course_id = C.course_id))", expect: [["Noa"], ["Nataf"]] },
        recap: "NOT EXISTS ( … EXISTS ) = \"אין אף קורס שהוא רשום אליו\"",
        explanation: "הפנימי כאן הוא **EXISTS** ולא NOT EXISTS: \"קיים קורס מתמטיקה שהסטודנט רשום אליו\". החיצוני שולל: **אין** קורס מתמטיקה שהוא רשום אליו, כלומר הוא לא נרשם לאף קורס במתמטיקה: Noa (רק פיזיקה) ו-Nataf (כלום). זה המסיח הקבוע של 25B-A שאלה 10: מספיקה מילה אחת (EXISTS במקום NOT EXISTS) והמשמעות מתהפכת מ\"לכל\" ל\"לאף אחד\"." },

      { id: "S08-Q3", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הסטודנטים שנרשמו **לכל** הקורסים שמציעה המחלקה `'Mathematics'`?",
        options: [
          {id:"a", type:"code", value:"SELECT first_name\nFROM Students S\nWHERE NOT EXISTS (\n  SELECT * FROM Enrollments E\n  WHERE S.student_id = E.student_id\n    AND E.course_id IN (\n      SELECT course_id FROM Courses\n      WHERE department = 'Mathematics'))"},
          {id:"b", type:"code", value:"SELECT DISTINCT S.first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.department = 'Mathematics'"},
          {id:"c", type:"code", value:"SELECT first_name\nFROM Students S\nWHERE NOT EXISTS (\n  SELECT * FROM Courses C\n  WHERE C.department = 'Mathematics'\n    AND NOT EXISTS (\n      SELECT * FROM Enrollments E\n      WHERE E.student_id = S.student_id\n        AND E.course_id = C.course_id))"},
          {id:"d", type:"code", value:"SELECT first_name\nFROM Students S\nWHERE EXISTS (\n  SELECT * FROM Courses C\n  WHERE C.department = 'Mathematics'\n    AND EXISTS (\n      SELECT * FROM Enrollments E\n      WHERE E.student_id = S.student_id\n        AND E.course_id = C.course_id))"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: { ref: DNE, same: ["c"], differ: ["a", "b", "d"] },
        recap: "רק NOT EXISTS כפול (על הקורסים הנדרשים) נותן \"לכל\"",
        explanation: "התשובה היא השלילה הכפולה: **אין** קורס מתמטיקה ש**אין** לסטודנט רישום אליו. אפשרות {opt:a} היא שלילה יחידה: \"אין לו אף רישום לקורס מתמטיקה\" (Noa, Nataf). אפשרות {opt:d} (EXISTS כפול) ואפשרות {opt:b} (JOIN רגיל) מחזירות את מי שנרשם **לפחות** לקורס מתמטיקה אחד, כולל Adi שחסר לו 103. זה בדיוק מבנה 25B-A שאלה 10." },

      { id: "S08-Q4", ctx: schema,
        question: "השלימו את החלקים החסרים __1__ ו-__2__ כך שהשאילתה תחזיר את הסטודנטים שנרשמו לכל קורסי המתמטיקה.",
        code: "SELECT S.first_name\nFROM Students S\nWHERE NOT EXISTS (\n  SELECT * FROM Courses C\n  WHERE ___1___\n    AND NOT EXISTS (\n      SELECT * FROM Enrollments E\n      WHERE ___2___ ))",
        options: [
          {id:"a", type:"code", value:"1:  C.department = 'Mathematics'\n2:  E.course_id = C.course_id"},
          {id:"b", type:"code", value:"1:  1 = 1\n2:  E.student_id = S.student_id AND E.course_id = C.course_id"},
          {id:"c", type:"code", value:"1:  C.department = 'Mathematics'\n2:  E.student_id = S.student_id"},
          {id:"d", type:"code", value:"1:  C.department = 'Mathematics'\n2:  E.student_id = S.student_id AND E.course_id = C.course_id"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        verify: { sql: DNE, expect: [["Dana"], ["Ido"]] },
        recap: "__1__ מגביל את המחלק (רק מתמטיקה) · __2__ קושר את שני הצדדים: הסטודנט וגם הקורס",
        explanation: "__1__ מגדיר **את מי צריך לכסות**: רק קורסי מתמטיקה. בלי הסינון (`1 = 1`, אפשרות {opt:b}) נדרשים כל הקורסים, וכאן אף סטודנט לא עובר. __2__ חייב לקשור את הרישום **גם לסטודנט החיצוני וגם לקורס הנבדק**. בלי `E.student_id = S.student_id` (אפשרות {opt:a}) נבדק \"מישהו רשום לקורס\", ולכן כולם עוברים. בלי `E.course_id = C.course_id` (אפשרות {opt:c}) נבדק \"יש לו רישום כלשהו\", ולכן עובר כל מי שנרשם למשהו. זה המבנה של 24B-A שאלה 9." },

      { id: "S08-Q5", ctx: schema,
        question: "איזו שאילתה מחזירה את שמות הסטודנטים שנרשמו לכל הקורסים של מחלקת `'Mathematics'`?",
        options: [
          {id:"a", type:"code", value:"SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Courses C\n   WHERE C.department = 'Mathematics')\n  CONTAINS\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id)"},
          {id:"b", type:"code", value:"SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id)\n  CONTAINS\n  (SELECT course_id\n   FROM Courses C\n   WHERE C.department = 'Mathematics')"},
          {id:"c", type:"code", value:"SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id)\n  CONTAINS\n  (SELECT course_id\n   FROM Courses C)"},
          {id:"d", type:"code", value:"SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id)\n  CONTAINS\n  (SELECT DISTINCT department\n   FROM Courses C\n   WHERE C.department = 'Mathematics')"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        recap: "(מה שיש לו) CONTAINS (מה שנדרש)",
        explanation: "הכיוון קבוע: **הקורסים של הסטודנט** מכילים את **קורסי המתמטיקה**. אפשרות {opt:a} הופכת את הכיוון: \"קורסי המתמטיקה מכילים את כל הקורסים שלו\", כלומר הוא נרשם **רק** למתמטיקה, ומי שלא נרשם לכלום עובר אוטומטית. אפשרות {opt:c} מרחיבה את הדרישה לכל הקורסים בכלל. אפשרות {opt:d} משווה מזהי קורסים מול **שמות מחלקות**, ערכים מסוגים שונים, ולכן לעולם לא מתקיים. זה המבנה של 25B-A שאלה 11. (ל-CONTAINS אין תמיכה בכל מימוש של SQL, אבל במבחן הוא מופיע.)" },

      { id: "S08-Q6", ctx: schema,
        question: "איזו שאילתה (בגרסת הספירה) מחזירה את שמות הסטודנטים שנרשמו לכל קורסי המתמטיקה? שימו לב: סטודנט יכול לחזור על קורס בסמסטר אחר.",
        options: [
          {id:"a", type:"code", value:"SELECT S.first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nGROUP BY S.student_id, S.first_name\nHAVING COUNT(DISTINCT C.course_id) =\n  (SELECT COUNT(*) FROM Courses WHERE department = 'Mathematics')"},
          {id:"b", type:"code", value:"SELECT S.first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.department = 'Mathematics'\nGROUP BY S.student_id, S.first_name\nHAVING COUNT(DISTINCT C.course_id) =\n  (SELECT COUNT(*) FROM Courses WHERE department = 'Mathematics')"},
          {id:"c", type:"code", value:"SELECT S.first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.department = 'Mathematics'\nGROUP BY S.student_id, S.first_name\nHAVING COUNT(C.course_id) =\n  (SELECT COUNT(*) FROM Courses WHERE department = 'Mathematics')"},
          {id:"d", type:"code", value:"SELECT S.first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nWHERE COUNT(DISTINCT E.course_id) =\n  (SELECT COUNT(*) FROM Courses WHERE department = 'Mathematics')\nGROUP BY S.student_id, S.first_name"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: { ref: DNE, same: ["b"], differ: ["a", "c", "d"] },
        recap: "ספירה: סינון רק לקורסים הנדרשים + COUNT(DISTINCT) = מספר הנדרשים",
        explanation: "בגרסת הספירה צריך שני דברים. ראשית, **לסנן** רק את קורסי המתמטיקה (WHERE), אחרת Ido נספר עם קורס הפיזיקה (4 ≠ 3) ונפסל בטעות, וזו אפשרות {opt:a}. שנית, לספור **DISTINCT**, אחרת Adi, שלמד את 101 פעמיים, נספר 3 ו\"עובר\" למרות שחסר לו 103, וזו אפשרות {opt:c}. באפשרות {opt:d} יש אגרגציה ב-WHERE, וזה אסור. זה המבנה של 23B-A2 שאלה 11." },

      { id: "S08-Q7", noDiagram: true,
        question: "\"החזירו את הסטודנטים שבכל סמסטר **לא** נרשמו לאף קורס בפיזיקה.\" באיזו פעולה השאלה צריכה להשתמש?",
        options: [
          {id:"a", type:"text", value:"חיתוך"},
          {id:"b", type:"text", value:"איחוד"},
          {id:"c", type:"text", value:"חילוק"},
          {id:"d", type:"text", value:"הפרש"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        recap: "\"כל פעם לא\" = \"אף פעם\" = הפרש, לא חילוק",
        explanation: "\"בכל סמסטר לא נרשמו\" פירושו \"**אף פעם** לא נרשמו לפיזיקה\": כל הסטודנטים **פחות** מי שנרשם לפיזיקה, כלומר **הפרש** (NOT IN / NOT EXISTS). המילה \"כל\" מטעה. חילוק דורש **קבוצה שצריך לכסות** (\"לכל קורסי הפיזיקה\"), וכאן אין כזו. זה בדיוק 23B-A שאלה 12 (מדינות שכל פעם לא חילקו נקודות לישראל)." },

      { id: "S08-Q8", ctx: schema,
        question: "סמנו את השאלה (בשפה טבעית) המתאימה ביותר לשאילתה הנתונה:",
        code: "SELECT S.first_name\nFROM Students S\nWHERE NOT EXISTS (\n  SELECT C.course_id\n  FROM Courses C\n  WHERE C.department = 'Mathematics'\n    AND C.course_id NOT IN (\n      SELECT E.course_id\n      FROM Enrollments E\n      WHERE E.student_id = S.student_id))",
        options: [
          {id:"a", type:"text", value:"הציגו סטודנטים שלא נרשמו לאף קורס במתמטיקה."},
          {id:"b", type:"text", value:"הציגו סטודנטים שנרשמו רק לקורסים במתמטיקה."},
          {id:"c", type:"text", value:"הציגו סטודנטים שאין קורס מתמטיקה שהם לא רשומים אליו, כלומר סטודנטים שנרשמו לכל קורסי המתמטיקה."},
          {id:"d", type:"text", value:"הציגו קורסי מתמטיקה שכל הסטודנטים רשומים אליהם."},
          {id:"e", type:"text", value:"השאילתה כתובה באופן שגוי, ולכן אי אפשר לנסח בשפה טבעית שאלה מתאימה."},
        ], correctId: "c",
        verify: { sql: "SELECT S.first_name FROM Students S WHERE NOT EXISTS (SELECT C.course_id FROM Courses C WHERE C.department = 'Mathematics' AND C.course_id NOT IN (SELECT E.course_id FROM Enrollments E WHERE E.student_id = S.student_id))", expect: [["Dana"], ["Ido"]] },
        recap: "NOT EXISTS + NOT IN = עוד צורה של שלילה כפולה",
        explanation: "גם זו שלילה כפולה, רק שהפנימית כתובה ב-NOT IN. קוראים מבפנים: `NOT IN (הקורסים של הסטודנט)` = קורס מתמטיקה **שהוא לא רשום אליו**. `NOT EXISTS` מבחוץ = **אין** קורס כזה, כלומר הוא רשום לכולם (Dana, Ido). ה-SELECT מחזיר סטודנטים ולא קורסים, ולכן הניסוח האחרון שגוי. ניסוח \"מילולי\" כמו זה הופיע כתשובה הנכונה ב-22B-A שאלה 10." },
    ],
  });
})();
