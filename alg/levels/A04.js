/* Algebra course · level 4 — set operations: ∪ ∩ − (union-compatibility, "both", "never", "only") */
(function(){
  const STUDENTS = { name: "Students", pk: ["s_id"], columns: ["s_id", "name", "city"],
    rows: [[1, "Dana", "Haifa"], [2, "Adi", "Haifa"], [3, "Ido", "Eilat"], [4, "Noa", "Haifa"], [5, "Maya", "Eilat"]] };
  const ENROLL = { name: "Enroll", pk: ["s_id", "course"], columns: ["s_id", "course"],
    rows: [[1, "DB"], [1, "AI"], [2, "DB"], [3, "AI"], [3, "OS"], [5, "OS"]] };
  const COURSES = { name: "Courses", pk: ["course"], columns: ["course", "dept"],
    rows: [["DB", "CS"], ["AI", "CS"], ["OS", "EE"]] };
  const DB = [STUDENTS, ENROLL, COURSES];
  const schema = { relations: [
    { schema: "Students([u]s_id[/u], name, city)", meaning: "סטודנט: מזהה, שם, עיר" },
    { schema: "Enroll([u]s_id[/u], [u]course[/u])", meaning: "הסטודנט s_id רשום לקורס course" },
    { schema: "Courses([u]course[/u], dept)", meaning: "קורס והמחלקה שלו" } ] };
  const withData = { title: "הטבלאות (נתונים לדוגמה)", tables: DB };

  ALG_LEVEL({
    id: "A04", order: 4, icon: "🔀", title: "פעולות קבוצה: ∪ ∩ −",
    goal: "לבטא \"גם וגם\", \"או\", \"אף פעם לא\" ו\"רק\" בעזרת חיתוך, איחוד והפרש.",
    db: DB,
    lesson: {
      html: `
<p>שלוש פעולות הקבוצה עובדות על <strong>שני יחסים תואמים</strong>: אותו מספר עמודות, עם תחומים תואמים. התוצאה היא קבוצה, בלי כפילויות.</p>
<ul>
  <li><code>A ∪ B</code> (איחוד) = מה שיש ב-A <strong>או</strong> ב-B.</li>
  <li><code>A ∩ B</code> (חיתוך) = מה שיש <strong>גם</strong> ב-A <strong>וגם</strong> ב-B.</li>
  <li><code>A − B</code> (הפרש) = מה שיש ב-A <strong>ואין</strong> ב-B. הסדר קובע: B − A זו שאלה אחרת.</li>
</ul>
{fig:0}
<div class="lesson-rule">🔑 <strong>"גם X וגם Y" על שתי שורות שונות ← חיתוך:</strong> <code>Π_{s_id} σ_{course="DB"} (Enroll) ∩ Π_{s_id} σ_{course="AI"} (Enroll)</code>. ה-σ בודק <strong>שורה אחת</strong> בכל פעם, ולכן <code>σ_{course="DB" ∧ course="AI"}</code> תמיד ריק: אין שורה שהקורס בה הוא גם DB וגם AI (21S-B, שאלה 14).</div>
{fig:1}
<div class="lesson-rule">🔑 <strong>"אף פעם לא" / "אין לו" ← הפרש:</strong> כולם פחות מי שכן: <code>Π_{s_id} (Students) − Π_{s_id} (Enroll)</code> (21S-B שאלה 19, 25S-B שאלה 13). <strong>"רק X"</strong> = מי שעשה X, פחות מי שעשה משהו שאינו X (23B-A2, שאלה 15).</div>
<div class="lesson-trap">⚠️ <strong>הפוך את הסדר וקיבלת ריק:</strong> <code>Π_{s_id} (Enroll) − Π_{s_id} (Students)</code> מחפש רשומים שאינם סטודנטים, ואין כאלה. ועוד: איחוד או הפרש בין יחסים עם מספר עמודות שונה הוא <strong>ביטוי לא חוקי</strong>.</div>`,
      figs: [
        { caption: "מי רשום גם ל-DB וגם ל-AI? רק Dana (1).", tables: [ENROLL],
          alg: "Π_{s_id} σ_{course=\"DB\"} (Enroll) ∩ Π_{s_id} σ_{course=\"AI\"} (Enroll)",
          result: { columns: ["s_id"], rows: [[1]] } },
        { caption: "מי לא רשום לאף קורס? כל הסטודנטים פחות מי שמופיע ב-Enroll.", tables: [STUDENTS, ENROLL],
          alg: "Π_{s_id} (Students) − Π_{s_id} (Enroll)",
          result: { columns: ["s_id"], rows: [[4]] } },
      ],
    },
    questions: [
      { id: "A04-Q1", ctx: withData,
        question: "מה מחזיר הביטוי?$$Π_{s_id} σ_{course=\"DB\"} (Enroll) ∩ Π_{s_id} σ_{course=\"AI\"} (Enroll)$$",
        options: [
          {id:"a", type:"text", value:"{1, 2, 3}"},
          {id:"b", type:"text", value:"{1}"},
          {id:"c", type:"text", value:"קבוצה ריקה"},
          {id:"d", type:"text", value:"{2}"},
        ], correctId: "b",
        verify: { expr: "Π_{s_id} σ_{course=\"DB\"} (Enroll) ∩ Π_{s_id} σ_{course=\"AI\"} (Enroll)", expect: [[1]] },
        recap: "∩ = מי שמופיע בשתי התוצאות",
        explanation: "צד שמאל: מי רשום ל-DB, כלומר {1, 2}. צד ימין: מי רשום ל-AI, כלומר {1, 3}. החיתוך משאיר רק את מי שמופיע **בשניהם**: {1}. ‏{1, 2, 3} הוא האיחוד (\"או\"), לא החיתוך." },

      { id: "A04-Q2", ctx: withData,
        question: "מה מחזיר הביטוי?$$Π_{s_id} (Students) − Π_{s_id} (Enroll)$$",
        options: [
          {id:"a", type:"text", value:"{4}: הסטודנטים שלא רשומים לאף קורס"},
          {id:"b", type:"text", value:"{1, 2, 3, 5}: הסטודנטים שרשומים לקורס כלשהו"},
          {id:"c", type:"text", value:"קבוצה ריקה, כי כל סטודנט מופיע ב-Students"},
          {id:"d", type:"text", value:"{4, 5}"},
        ], correctId: "a",
        verify: { expr: "Π_{s_id} (Students) − Π_{s_id} (Enroll)", expect: [[4]] },
        recap: "הפרש = יש ב-A ואין ב-B",
        explanation: "‏Π_{s_id}(Students) = {1, 2, 3, 4, 5}. ‏Π_{s_id}(Enroll) = {1, 2, 3, 5}. ההפרש משאיר את מי שיש בראשון **ואין** בשני: {4}, כלומר Noa, שלא רשומה לאף קורס. זו התבנית של \"אף פעם לא\"." },

      { id: "A04-Q3", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי הסטודנטים שרשומים **גם** ל-DB **וגם** ל-AI?",
        options: [
          {id:"a", type:"algebra", value:"Π_{s_id} σ_{course=\"DB\" ∧ course=\"AI\"} (Enroll)"},
          {id:"b", type:"algebra", value:"Π_{s_id} σ_{course=\"DB\"} (Enroll) ∪ Π_{s_id} σ_{course=\"AI\"} (Enroll)"},
          {id:"c", type:"algebra", value:"Π_{s_id} σ_{course=\"DB\"} (Enroll) − Π_{s_id} σ_{course=\"AI\"} (Enroll)"},
          {id:"d", type:"algebra", value:"Π_{s_id} σ_{course=\"DB\"} (Enroll) ∩ Π_{s_id} σ_{course=\"AI\"} (Enroll)"},
        ], correctId: "d",
        verify: { ref: "Π_{s_id} σ_{course=\"DB\"} (Enroll) ∩ Π_{s_id} σ_{course=\"AI\"} (Enroll)", same: ["d"], differ: ["a", "b", "c"] },
        recap: "\"גם וגם\" על שתי שורות = ∩ · σ עם ∧ על אותה עמודה = ריק",
        explanation: "הרישום ל-DB והרישום ל-AI הם **שתי שורות שונות** ב-Enroll, ולכן מסננים כל אחת בנפרד ומחתכים. ‏{opt:a} בודקת שורה אחת שהקורס בה שווה לשני ערכים בבת אחת, וזה תמיד ריק (21S-B, שאלה 14). ‏{opt:b} היא \"או\". ‏{opt:c} היא \"DB אבל לא AI\"." },

      { id: "A04-Q4", ctx: withData,
        question: "מה מחזיר הביטוי?$$Π_{s_id} σ_{city=\"Haifa\"} (Students) ∪ Π_{s_id} σ_{course=\"OS\"} (Enroll)$$",
        options: [
          {id:"a", type:"text", value:"הסטודנטים מחיפה שרשומים גם ל-OS: קבוצה ריקה"},
          {id:"b", type:"text", value:"הסטודנטים שגרים בחיפה או רשומים ל-OS (או שניהם): {1, 2, 3, 4, 5}"},
          {id:"c", type:"text", value:"הביטוי לא חוקי, כי מאחדים שני יחסים שונים"},
          {id:"d", type:"text", value:"הסטודנטים מחיפה שאינם רשומים ל-OS: {1, 2, 4}"},
        ], correctId: "b",
        verify: { expr: "Π_{s_id} σ_{city=\"Haifa\"} (Students) ∪ Π_{s_id} σ_{course=\"OS\"} (Enroll)", expect: [[1], [2], [4], [3], [5]] },
        recap: "∪ = או · מותר לאחד תוצאות משני יחסים אם הן תואמות",
        explanation: "שני הצדדים הם יחס עם עמודה אחת של מזהי סטודנטים, ולכן הם **תואמים** והאיחוד חוקי, גם אם הגיעו מטבלאות שונות. מחיפה: {1, 2, 4}. ‏רשומים ל-OS: {3, 5}. האיחוד = {1, 2, 3, 4, 5}. ‏\"גם וגם\" היה ∩, ו\"מחיפה ולא OS\" היה −." },

      { id: "A04-Q5", ctx: schema,
        question: "איזה מהביטויים הבאים **אינו חוקי** באלגברת היחסים?",
        options: [
          {id:"a", type:"algebra", value:"Π_{s_id} (Students) − Π_{s_id} (Enroll)"},
          {id:"b", type:"algebra", value:"Π_{s_id, name} (Students) ∪ Π_{s_id} (Enroll)"},
          {id:"c", type:"algebra", value:"Π_{course} (Courses) − Π_{course} (Enroll)"},
          {id:"d", type:"algebra", value:"Π_{s_id} σ_{city=\"Eilat\"} (Students) ∩ Π_{s_id} (Enroll)"},
          {id:"e", type:"text", value:"כל הביטויים חוקיים"},
        ], correctId: "b",
        verify: [
          { ref: "Π_{s_id} (Students) − Π_{s_id} (Enroll)", same: ["a"], invalid: ["b"] },
          { expr: "Π_{course} (Courses) − Π_{course} (Enroll)", expect: [] },
          { expr: "Π_{s_id} σ_{city=\"Eilat\"} (Students) ∩ Π_{s_id} (Enroll)", expect: [[3], [5]] },
        ],
        recap: "∪ ∩ − רק בין יחסים תואמים: אותו מספר עמודות",
        explanation: "פעולות קבוצה מוגדרות רק בין יחסים **תואמים**: אותו מספר עמודות ותחומים תואמים. ב-{opt:b} מאחדים יחס עם 2 עמודות (s_id, name) עם יחס עם עמודה אחת, ולכן הביטוי לא חוקי. השאר חוקיים. ‏{opt:c} מחזיר קורסים שאין עליהם רישום (כאן ריק), וזה עדיין ביטוי חוקי." },

      { id: "A04-Q6", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי הסטודנטים ש**מעולם לא** נרשמו לקורס של מחלקת `CS` (כולל מי שלא נרשם לשום קורס)?",
        options: [
          {id:"a", type:"algebra", value:"Π_{s_id} σ_{dept!=\"CS\"} (Enroll ⊗ Courses)"},
          {id:"b", type:"algebra", value:"Π_{s_id} σ_{dept=\"CS\"} (Enroll ⊗ Courses) − Π_{s_id} (Students)"},
          {id:"c", type:"algebra", value:"Π_{s_id} (Students) − Π_{s_id} σ_{dept=\"CS\"} (Enroll ⊗ Courses)"},
          {id:"d", type:"algebra", value:"Π_{s_id} (Enroll) − Π_{s_id} σ_{dept=\"CS\"} (Enroll ⊗ Courses)"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "c",
        verify: { ref: "Π_{s_id} (Students) − Π_{s_id} σ_{dept=\"CS\"} (Enroll ⊗ Courses)", same: ["c"], differ: ["a", "b", "d"] },
        recap: "\"מעולם לא\" = כולם − מי שכן · != אינו \"אף פעם\" · סדר הפוך = ריק",
        explanation: "\"מעולם לא\" = **כל** הסטודנטים פחות מי שכן נרשם לקורס CS. בנתוני הדוגמה: {1..5} פחות {1, 2, 3} = {4, 5}. ‏{opt:a} מחזירה מי שנרשם לפחות לקורס אחד **שאינו** CS, ולכן גם את Ido (3), שלקח AI. ‏{opt:b} הפוכה בסדר ולכן ריקה תמיד. ‏{opt:d} מתחילה רק מהרשומים ב-Enroll, ולכן מפספסת את Noa שלא נרשמה לכלום." },

      { id: "A04-Q7", ctx: schema,
        question: "מזהי הסטודנטים שנרשמו **רק** לקורסים של מחלקת `CS` (נרשמו לפחות לקורס אחד, וכל הקורסים שלהם ב-CS). מה נכון?",
        options: [
          {id:"a", type:"algebra", value:"Π_{s_id} (Enroll) − Π_{s_id} σ_{dept!=\"CS\"} (Enroll ⊗ Courses)"},
          {id:"b", type:"algebra", value:"Π_{s_id} σ_{dept=\"CS\"} (Enroll ⊗ Courses) − Π_{s_id} σ_{dept!=\"CS\"} (Enroll ⊗ Courses)"},
          {id:"c", type:"algebra", value:"Π_{s_id} σ_{dept=\"CS\"} (Enroll ⊗ Courses)"},
          {id:"d", type:"text", value:"גם {opt:a} וגם {opt:b} נכונות"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "d",
        verify: { ref: "Π_{s_id} σ_{s_id=1 ∨ s_id=2} (Students)", same: ["a", "b"], differ: ["c"] },
        recap: "\"רק X\" = מי שעשה X (או בכלל) − מי שעשה משהו שאינו X",
        explanation: "\"רק CS\" = מי שנרשם, פחות מי שנרשם לפחות לקורס אחד **שאינו** CS. ‏{opt:a} מתחילה מכל הרשומים, ו-{opt:b} מתחילה ממי שלקח קורס CS. מכיוון שכל מי שנרשם רק ל-CS לקח קורס CS, שתיהן מחזירות אותו דבר: {1, 2}. ‏{opt:c} מחזירה גם את Ido (3), שלקח AI וגם OS. זה בדיוק המצב של 23B-A2 שאלה 15: שתי דרכים נכונות." },

      { id: "A04-Q8", ctx: schema,
        question: "השאלה \"החזירו את הסטודנטים שבכל פעם שנרשמו, **לא** נרשמו ל-OS\" (כלומר מעולם לא נרשמו ל-OS). איזו פעולה היא העיקר בפתרון?",
        options: [
          {id:"a", type:"text", value:"חיתוך"},
          {id:"b", type:"text", value:"איחוד"},
          {id:"c", type:"text", value:"הפרש"},
          {id:"d", type:"text", value:"חילוק"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "c",
        recap: "\"בכל פעם לא\" = \"אף פעם לא\" = הפרש, לא חילוק",
        explanation: "\"בכל פעם לא\" נשמע כמו \"לכל\", אבל אין כאן **קבוצה שצריך לכסות** (כמו \"כל הקורסים של CS\"). זה בדיוק \"מעולם לא נרשם ל-OS\": כולם פחות מי שנרשם ל-OS, כלומר **הפרש** (23B-A, שאלה 12). המבחן: אם אפשר להשלים \"לכל ה-___\" בשם עצם ברבים (כל הקורסים) זה חילוק; אם מתאים רק \"אף פעם\" זה הפרש." },
    ],
  });
})();
