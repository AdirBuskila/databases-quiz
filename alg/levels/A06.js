/* Algebra course · level 6 — division ÷: "for all", schema checks, restricting the divisor, ρ */
(function(){
  const STUDENTS = { name: "Students", pk: ["s_id"], columns: ["s_id", "name", "city"],
    rows: [[1, "Dana", "Haifa"], [2, "Adi", "Haifa"], [3, "Ido", "Haifa"], [4, "Nataf", "Eilat"], [5, "Maya", "Eilat"]] };
  const ENROLL = { name: "Enroll", pk: ["s_id", "course"], columns: ["s_id", "course"],
    rows: [[1, "DB"], [1, "AI"], [1, "ML"], [2, "DB"], [2, "AI"], [3, "DB"], [3, "AI"], [3, "ML"], [3, "OS"], [4, "OS"], [4, "DB"]] };
  const COURSES = { name: "Courses", pk: ["course"], columns: ["course", "dept"],
    rows: [["DB", "CS"], ["AI", "CS"], ["ML", "CS"], ["OS", "EE"]] };
  const DB = [STUDENTS, ENROLL, COURSES];
  const schema = { relations: [
    { schema: "Students([u]s_id[/u], name, city)", meaning: "סטודנט: מזהה, שם, עיר" },
    { schema: "Enroll([u]s_id[/u], [u]course[/u])", meaning: "הסטודנט s_id רשום לקורס course" },
    { schema: "Courses([u]course[/u], dept)", meaning: "קורס והמחלקה שלו" } ] };
  const withData = { title: "הטבלאות (נתונים לדוגמה)", tables: [ENROLL, COURSES] };
  const TAKES = { name: "Takes", pk: ["student_id", "c_code"], columns: ["student_id", "c_code"],
    rows: [[1, "C1"], [1, "C2"], [2, "C1"], [3, "C1"], [3, "C2"], [3, "C3"]] };
  const REQUIRED = { name: "Required", pk: ["code"], columns: ["code", "track"],
    rows: [["C1", "Data"], ["C2", "Data"], ["C3", "Web"]] };
  const schema2 = { relations: [
    { schema: "Takes([u]student_id[/u], [u]c_code[/u])", meaning: "הסטודנט student_id לקח את הקורס c_code" },
    { schema: "Required([u]code[/u], track)", meaning: "הקורס code הוא חובה במסלול track" } ] };
  // "no required course missing": all (student, required) pairs minus what was taken
  const DIV_CS = "Π_{s_id} (Enroll) − Π_{s_id} ((Π_{s_id} (Enroll) × Π_{course} σ_{dept=\"CS\"} (Courses)) − Π_{s_id, course} (Enroll))";

  ALG_LEVEL({
    id: "A06", order: 6, icon: "➗", title: "חילוק ÷",
    goal: "לזהות שאלת \"לכל\", לבנות חילוק תקין (מחולק, מחלק, סכמות) ולקרוא חילוק בשפה טבעית.",
    db: DB,
    lesson: {
      html: `
<p><strong>חילוק</strong> עונה על "<strong>לכל</strong>": <code>R(x, y) ÷ S(y)</code> מחזיר כל x שמופיע ב-R עם <strong>כל</strong> ה-y שב-S.</p>
<ul>
  <li><strong>המחולק</strong> (משמאל) = הזוגות: (מי, מה). למשל <code>Π_{s_id, course} (Enroll)</code>.</li>
  <li><strong>המחלק</strong> (מימין) = הקבוצה שצריך לכסות. למשל קורסי CS: <code>Π_{course} σ_{dept="CS"} (Courses)</code>.</li>
  <li><strong>התוצאה</strong> = עמודות המחולק פחות עמודות המחלק. כאן: s_id.</li>
</ul>
{fig:0}
<div class="lesson-rule">🔑 <strong>שלוש בדיקות שפוסלות רוב המסיחים:</strong> (1) עמודות המחלק מוכלות בעמודות המחולק, <strong>באותו שם</strong>. (2) המחולק הוא לפחות זוג (מי, מה). מחולק עם עמודה אחת הוא פסול (23B-A2 שאלה 14, 21B-A שאלה 16). (3) מספר עמודות התוצאה = מחולק פחות מחלק, וזה נקבע מהסכמות עוד לפני הנתונים.</div>
<div class="lesson-rule">🔑 <strong>מסננים את המחלק</strong> לקבוצה שנדרשת בלבד ("כל קורסי CS" ← σ_{dept="CS"}). בלי הסינון שואלים "כל הקורסים בכלל". ואם שם העמודה שונה בין המחולק למחלק (c_code מול code), צריך <strong>ρ</strong> כדי לשנות שם, וגם זו פעולה שנספרת (25B-A, שאלה 15).</div>
<div class="lesson-trap">⚠️ <strong>חיתוך אינו חילוק:</strong> ∩ עונה על "גם וגם" של שני תנאים שכתובים מראש, לא על "לכל" של קבוצה שנקבעת מהנתונים. ו"בכל פעם לא" הוא הפרש, לא חילוק.</div>`,
      figs: [
        { caption: "Dana (1) ו-Ido (3) לקחו את כל שלושת קורסי CS. ‏Adi (2) חסר ML, ו-Nataf (4) חסרה AI ו-ML. ל-Ido יש גם OS, וזה לא מפריע.",
          tables: [ENROLL, COURSES],
          alg: "Π_{s_id, course} (Enroll) ÷ Π_{course} σ_{dept=\"CS\"} (Courses)",
          result: { columns: ["s_id"], rows: [[1], [3]] } },
      ],
    },
    questions: [
      { id: "A06-Q1", ctx: withData,
        question: "מה מחזיר הביטוי?$$Π_{s_id, course} (Enroll) ÷ Π_{course} σ_{dept=\"CS\"} (Courses)$$",
        options: [
          {id:"a", type:"text", value:"{1, 2, 3, 4}: מי שלקח לפחות קורס CS אחד"},
          {id:"b", type:"text", value:"{1, 3}"},
          {id:"c", type:"text", value:"{3}"},
          {id:"d", type:"text", value:"{1}"},
        ], correctId: "b",
        verify: { expr: "Π_{s_id, course} (Enroll) ÷ Π_{course} σ_{dept=\"CS\"} (Courses)", expect: [[1], [3]] },
        recap: "÷ = מי שמופיע עם כל הערכים של המחלק",
        explanation: "המחלק הוא קורסי CS: {DB, AI, ML}. בודקים לכל סטודנט אם יש לו את שלושתם: 1 ✓, 2 חסר ML ✗, 3 ✓ (יש לו גם OS, וזה לא מפריע), 4 ✗. התוצאה {1, 3}. ‏{3} יוצא אם שוכחים לסנן את המחלק ל-CS ומחלקים בכל הקורסים." },

      { id: "A06-Q2", ctx: withData,
        question: "כמה **עמודות** וכמה **שורות** בתוצאה?$$Π_{s_id, course} (Enroll) ÷ Π_{course} (Courses)$$",
        options: [
          {id:"a", type:"text", value:"עמודה אחת, שורה אחת"},
          {id:"b", type:"text", value:"2 עמודות, 4 שורות"},
          {id:"c", type:"text", value:"עמודה אחת, 2 שורות"},
          {id:"d", type:"text", value:"עמודה אחת, 0 שורות"},
        ], correctId: "a",
        verify: { expr: "Π_{s_id, course} (Enroll) ÷ Π_{course} (Courses)", rows: 1, cols: 1, expect: [[3]] },
        recap: "עמודות התוצאה = עמודות המחולק פחות עמודות המחלק",
        explanation: "עמודות: (s_id, course) פחות (course) = **s_id בלבד**. זה נקבע מהסכמות, לפני כל חישוב. שורות: המחלק הוא **כל** ארבעת הקורסים, ורק Ido (3) לקח את כולם, כלומר שורה אחת." },

      { id: "A06-Q3", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי הסטודנטים שנרשמו **לכל** הקורסים של מחלקת `CS`?",
        options: [
          {id:"a", type:"algebra", value:"Π_{s_id} (Enroll) ÷ Π_{course} σ_{dept=\"CS\"} (Courses)"},
          {id:"b", type:"algebra", value:"Π_{s_id, course} (Enroll) ÷ Π_{course} σ_{dept=\"CS\"} (Courses)"},
          {id:"c", type:"algebra", value:"Π_{s_id, course} (Enroll) ÷ Π_{course} (Courses)"},
          {id:"d", type:"algebra", value:"Π_{s_id} σ_{dept=\"CS\"} (Enroll ⊗ Courses)"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "b",
        verify: { ref: DIV_CS, same: ["b"], differ: ["c", "d"], invalid: ["a"] },
        recap: "מחולק = זוג (מי, מה) · מחלק = הקבוצה המסוננת · צירוף = \"לפחות אחד\"",
        explanation: "‏{opt:b}: הזוגות (סטודנט, קורס) מחולקים בקבוצת קורסי CS. ‏{opt:a} פסולה: במחולק יש רק s_id, ולכן עמודת המחלק (course) לא מוכלת בו (23B-A2 שאלה 14). ‏{opt:c} לא מסננת את המחלק, ולכן שואלת על **כל** הקורסים ומחזירה רק את Ido. ‏{opt:d} היא צירוף רגיל, ומחזירה כל מי שלקח **לפחות** קורס CS אחד (גם את Adi ואת Nataf)." },

      { id: "A06-Q4", ctx: schema,
        question: "מהי הפעולה העיקרית שהכי קרובה לענות על השאלה \"מיהו הסטודנט שנרשם לכל הקורסים של מחלקת CS\"?",
        options: [
          {id:"a", type:"text", value:"מכפלה קרטזית וחיסור"},
          {id:"b", type:"text", value:"חילוק ובחירה"},
          {id:"c", type:"text", value:"צירוף טבעי"},
          {id:"d", type:"text", value:"חיתוך"},
          {id:"e", type:"text", value:"חיסור וצירוף טבעי"},
        ], correctId: "b",
        recap: "\"לכל ה-___\" = חילוק, ו-σ מגדיר את הקבוצה שצריך לכסות",
        explanation: "\"לכל הקורסים של CS\" = שאלת חילוק. ה-**בחירה** (σ_{dept=\"CS\"}) מגדירה את הקבוצה שצריך לכסות, כלומר את המחלק. צירוף לבדו נותן \"לפחות אחד\", וחיתוך נותן \"גם וגם\" של תנאים קבועים. זו 21B-C שאלה 19 (\"אם של כל הפרות בביתן 8\" ← חילוק ובחירה) ו-22B-A שאלה 12." },

      { id: "A06-Q5", ctx: schema2,
        question: "איזה ביטוי מחזיר את מזהי הסטודנטים שלקחו **את כל** קורסי החובה של המסלול `Data`?",
        options: [
          {id:"a", type:"algebra", value:"Π_{student_id, c_code} (Takes) ÷ Π_{code} σ_{track=\"Data\"} (Required)"},
          {id:"b", type:"algebra", value:"Π_{student_id, c_code} (Takes) ÷ ρ_{Req(c_code)} (Π_{code} σ_{track=\"Data\"} (Required))"},
          {id:"c", type:"algebra", value:"Π_{student_id, c_code} (Takes) ÷ ρ_{Req(c_code)} (Π_{code} (Required))"},
          {id:"d", type:"algebra", value:"Π_{student_id} (Takes) ÷ ρ_{Req(c_code)} (Π_{code} σ_{track=\"Data\"} (Required))"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "b",
        verify: { db: [TAKES, REQUIRED],
          ref: "Π_{student_id} (Takes) − Π_{student_id} ((Π_{student_id} (Takes) × ρ_{Req(c_code)} (Π_{code} σ_{track=\"Data\"} (Required))) − Π_{student_id, c_code} (Takes))",
          same: ["b"], differ: ["c"], invalid: ["a", "d"] },
        recap: "שם עמודה שונה בין המחולק למחלק ← ρ",
        explanation: "במחולק העמודה נקראת `c_code` ובמחלק `code`. בלי שינוי שם, עמודת המחלק לא מוכלת במחולק ולכן {opt:a} פסולה. ‏{opt:b} משנה את שם העמודה ל-c_code עם ρ ומחלקת בקורסי Data בלבד. ‏{opt:c} מחלקת בכל הקורסים, גם ב-C3 של Web. ‏{opt:d} פסולה, כי המחולק בה הוא עמודה אחת." },

      { id: "A06-Q6", ctx: schema2,
        question: "כדי לענות על השאלה הקודמת (\"מי לקח את כל קורסי החובה של Data\"), בכמה פעולות מבין **÷, ρ, ∪, ∩, −** צריך להשתמש? (σ, Π, × ו-⊗ לא נספרות) (לפי הקונבנציה של הקורס, 25B-A שאלה 15: מחלקים ישירות את טבלת הקשר, בלי לצרף טבלה נוספת רק כדי ליישר שמות עמודות.)",
        options: [
          {id:"a", type:"text", value:"1: רק חילוק"},
          {id:"b", type:"text", value:"2: חילוק ושינוי שם"},
          {id:"c", type:"text", value:"3: חילוק, שינוי שם והפרש"},
          {id:"d", type:"text", value:"0: מספיקים σ ו-Π"},
        ], correctId: "b",
        recap: "÷ בגלל \"כל\" · ρ בגלל שם עמודה שונה",
        explanation: "\"את כל\" ← **חילוק**. שמות העמודות שונים (c_code מול code), ולכן צריך גם **שינוי שם** ρ, כדי שעמודת המחלק תהיה מוכלת במחולק. סך הכול 2 פעולות. זה בדיוק 25B-A שאלה 15, שם id נקרא בטבלה אחת student_id." },

      { id: "A06-Q7", ctx: schema,
        question: "מה מחזיר הביטוי?$$Π_{course, s_id} (Enroll) ÷ Π_{s_id} σ_{city=\"Haifa\"} (Students)$$",
        options: [
          {id:"a", type:"text", value:"את הקורסים שכל הסטודנטים מחיפה נרשמו אליהם"},
          {id:"b", type:"text", value:"את הסטודנטים מחיפה שנרשמו לכל הקורסים"},
          {id:"c", type:"text", value:"את הקורסים שלפחות סטודנט אחד מחיפה נרשם אליהם"},
          {id:"d", type:"text", value:"את הסטודנטים שנרשמו לכל הקורסים שנרשמו אליהם סטודנטים מחיפה"},
          {id:"e", type:"text", value:"הביטוי פסול, כי s_id מופיע במחלק"},
        ], correctId: "a",
        verify: { expr: "Π_{course, s_id} (Enroll) ÷ Π_{s_id} σ_{city=\"Haifa\"} (Students)", expect: [["DB"], ["AI"]] },
        recap: "קוראים חילוק: התוצאה = מה שנשאר במחולק; המחלק = \"לכל ה-___\"",
        explanation: "התוצאה היא עמודות המחולק פחות המחלק, כלומר **course**, ולכן מקבלים קורסים, לא סטודנטים. המחלק הוא קבוצת הסטודנטים מחיפה, וזו הקבוצה שצריך לכסות: קורסים ש**כל** הסטודנטים מחיפה נרשמו אליהם. בנתוני הדוגמה (Dana, Adi, Ido) אלה DB ו-AI. זה תרגיל הקריאה של 21S-B שאלה 16: קודם מזהים מה התוצאה, ואחר כך מה צריך לכסות." },

      { id: "A06-Q8", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי הסטודנטים שנרשמו לכל הקורסים ש**Adi** (`s_id = 2`) נרשמה אליהם?",
        options: [
          {id:"a", type:"algebra", value:"Π_{s_id, course} (Enroll) ÷ Π_{course} σ_{s_id=2} (Enroll)"},
          {id:"b", type:"algebra", value:"Π_{s_id, course} (Enroll) ∩ Π_{s_id, course} σ_{s_id=2} (Enroll)"},
          {id:"c", type:"algebra", value:"Π_{s_id} σ_{s_id=2} (Enroll) ÷ Π_{course} (Enroll)"},
          {id:"d", type:"algebra", value:"Π_{s_id} (Enroll ⊗ Π_{course} σ_{s_id=2} (Enroll))"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "a",
        verify: { ref: "Π_{s_id} (Enroll) − Π_{s_id} ((Π_{s_id} (Enroll) × Π_{course} σ_{s_id=2} (Enroll)) − Π_{s_id, course} (Enroll))",
          same: ["a"], differ: ["b", "d"], invalid: ["c"] },
        recap: "המחלק יכול להיות כל קבוצה מחושבת, גם \"הקורסים של Adi\"",
        explanation: "המחלק הוא הקבוצה שצריך לכסות, כאן הקורסים של Adi: {DB, AI}. ‏{opt:a} מחלקת את הזוגות בקבוצה הזו ומחזירה {1, 2, 3}. ‏{opt:b} היא חיתוך: מחזירה את הזוגות של Adi עצמה (2 עמודות), לא \"לכל\". ‏{opt:c} פסולה, כי המחולק הוא עמודה אחת. ‏{opt:d} היא צירוף, ומחזירה גם את Nataf (4), שלקחה רק את DB מתוך הקורסים של Adi." },
    ],
  });
})();
