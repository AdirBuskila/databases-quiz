/* Algebra course · level 7 — validity first, what algebra can't do, multi-step queries (←), counting operations */
(function(){
  const STUDENT = { name: "Student", pk: ["sid"], columns: ["sid", "name", "city", "age"],
    rows: [[1, "Dana", "Haifa", 22], [2, "Adi", "Tel Aviv", 25], [3, "Ido", "Haifa", 22], [4, "Noa", "Eilat", 30], [5, "Gal", "Tel Aviv", 27]] };
  const COURSE = { name: "Course", pk: ["cid"], columns: ["cid", "title", "dept"],
    rows: [[10, "DB", "CS"], [11, "Algo", "CS"], [12, "Calculus", "Math"], [13, "Stats", "Math"]] };
  const TAKES = { name: "Takes", pk: ["sid", "cid"], columns: ["sid", "cid", "grade"],
    rows: [[1, 10, 90], [1, 12, 85], [2, 10, 70], [2, 11, 95], [3, 12, 60], [4, 13, 88], [1, 11, 75]] };
  const TEACHES = { name: "Teaches", pk: ["tid", "course_no"], columns: ["tid", "course_no"],
    rows: [[7, 10], [7, 11], [7, 12], [7, 13], [8, 12], [8, 13], [9, 10], [9, 12]] };

  const schema = { relations: [
    { schema: "Student([u]sid[/u], name, city, age)", meaning: "סטודנט: מזהה, שם, עיר וגיל" },
    { schema: "Course([u]cid[/u], title, dept)", meaning: "קורס: מזהה, שם ומחלקה" },
    { schema: "Takes([u]sid[/u], [u]cid[/u], grade)", meaning: "הסטודנט sid למד את הקורס cid וקיבל ציון" },
  ] };
  const schemaT = { relations: schema.relations.concat([
    { schema: "Teaches([u]tid[/u], [u]course_no[/u])", meaning: "המרצה tid מלמד את הקורס שמספרו course_no (זה ה-cid של Course)" },
  ]) };

  ALG_LEVEL({
    id: "A07", order: 7, icon: "🧱", title: "תקינות, גבולות האלגברה ושאילתות בשלבים",
    goal: "לבדוק קודם שהביטוי חוקי, לדעת מה אי אפשר לבטא באלגברה, לעקוב אחרי שאילתות בשלבים (←) ולספור פעולות.",
    db: [STUDENT, COURSE, TAKES, TEACHES],
    lesson: {
      html: `
<p>לפני ששואלים "מה הביטוי מחזיר", שואלים "<strong>האם הוא בכלל חוקי</strong>". בכל מבחן יש שאלה או שתיים שבהן התשובה היא "אף תשובה אינה נכונה", כי הביטוי פונה לעמודה שלא קיימת.</p>
<ul>
  <li><strong>כל עמודה ב-Π וב-σ חייבת להיות קיימת ביחס שממנו קוראים אותה.</strong> σ<sub>dept="CS"</sub>(Takes) פסול, כי ל-Takes אין dept. צריך קודם לצרף את Course (22B-A שאלה 13: m_id ב-one_man_band; 23B-A: p_name ב-Instrument).</li>
  <li><strong>פעולות קבוצה (∪, ∩, −) רק בין יחסים תואמים</strong>: אותו מספר עמודות, ותחומים תואמים. Π<sub>sid, name</sub>(Student) − Π<sub>sid</sub>(Takes) פסול.</li>
  <li><strong>מה אי אפשר:</strong> אין באלגברה COUNT, SUM, AVG או GROUP BY. "כמה סטודנטים יש בקורס" לא ניתן לביטוי. אבל <strong>מקסימום/מינימום</strong> (הפרש + צירוף עצמי) ו"<strong>יותר מפעם אחת</strong>" (צירוף עצמי עם ≠) כן ניתנים (21B-A שאלה 17).</li>
  <li><strong>שאילתה בשלבים</strong>: <code>X ← ביטוי</code> נותן שם לתוצאת ביניים. בשאלות כאלה רושמים בצד מה כל שם מחזיק (25B-A שאלה 14).</li>
</ul>
{fig:0}
<div class="lesson-rule">🔑 <strong>ספירת פעולות (25B-A שאלה 15):</strong> כשמבקשים "בכמה מהפעולות הפרש, חיתוך, איחוד, חילוק, שינוי שם תצטרכו", סופרים רק אותן. σ, Π, ⊗ ו-× "חינם". חילוק נספר בגלל "כל", ו<strong>שינוי שם</strong> נספר כשהעמודה נקראת אחרת בשני היחסים, כי אחרת סכמת המחלק לא מוכלת בסכמת המחולק.</div>
<div class="lesson-trap">⚠️ <strong>"נראה הגיוני" זה לא "חוקי":</strong> מסיח עם ניסוח מילולי משכנע לשאילתה פסולה הוא מלכודת קבועה. סמן על דף הסכמות את העמודות של כל יחס, ורק אז קרא את הביטוי.</div>`,
      figs: [
        { caption: "TR1 = כל גיל שגדול מגיל אחר (מקרינים את T1, המבוגר). TR2 = כל הגילאים פחות אלה, כלומר הגיל המינימלי.",
          tables: [STUDENT],
          alg: "TR1 ← Π_{T1.age} σ_{T1.age > T2.age} (ρ_{T1} Student × ρ_{T2} Student)\nTR2 ← Π_{age} (Student) − TR1",
          result: { columns: ["age"], rows: [[22]] } },
      ],
    },
    questions: [
      { id: "A07-Q1", ctx: schema,
        question: "איזה מהביטויים הבאים **אינו תקין**?",
        options: [
          {id:"a", type:"algebra", value:'Π_{name} σ_{grade > 80} (Student ⊗ Takes)'},
          {id:"b", type:"algebra", value:'Π_{name} σ_{grade > 80} (Student)'},
          {id:"c", type:"algebra", value:'Π_{title} (Course ⊗ Takes)'},
          {id:"d", type:"algebra", value:'Π_{sid} (Student) − Π_{sid} (Takes)'},
          {id:"e", type:"text", value:"כל הביטויים תקינים"},
        ], correctId: "b",
        verify: [
          { ref: 'Π_{name} σ_{grade > 80} (Student ⊗ Takes)', same: ["a"], invalid: ["b"] },
          { ref: 'Π_{title} (Course ⊗ Takes)', same: ["c"] },
          { ref: 'Π_{sid} (Student) − Π_{sid} (Takes)', same: ["d"] },
        ],
        recap: "כל עמודה ב-σ/Π חייבת להיות ביחס שממנו קוראים",
        explanation: "ל-Student אין עמודה grade, היא נמצאת ב-Takes. לכן $σ_{grade > 80} (Student)$ פסול. ב-{opt:a} הצירוף עם Takes מביא את grade, ולכן הוא תקין. {opt:c} ו-{opt:d} תקינים: לשני היחסים ב-{opt:d} עמודה אחת (sid), והם תואמים." },

      { id: "A07-Q2", ctx: schema,
        question: "מה עושה השאילתה הבאה?\n$$Π_{sid} σ_{dept=\"CS\"} (Takes) − Π_{T2.sid} σ_{T1.grade > T2.grade} (ρ_{T1} Takes × ρ_{T2} Takes)$$",
        options: [
          {id:"a", type:"text", value:"מחזירה את מזהי הסטודנטים שקיבלו את הציון הנמוך ביותר בקורסי CS."},
          {id:"b", type:"text", value:"מחזירה את מזהי הסטודנטים שקיבלו את הציון הגבוה ביותר בקורסי CS."},
          {id:"c", type:"text", value:"מחזירה את מזהי הסטודנטים שלמדו לפחות קורס CS אחד."},
          {id:"d", type:"text", value:"מחזירה את מזהי הסטודנטים שקיבלו את הציון הגבוה ביותר בכל הקורסים."},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה."},
        ], correctId: "e",
        verify: { ref: 'Π_{sid} σ_{dept="CS"} (Takes ⊗ Course) − Π_{T2.sid} σ_{T1.grade > T2.grade} (ρ_{T1} Takes × ρ_{T2} Takes)',
          template: 'Π_{sid} σ_{dept="CS"} (Takes) − Π_{T2.sid} σ_{T1.grade > T2.grade} (ρ_{T1} Takes × ρ_{T2} Takes)', invalid: ["e"] },
        recap: "בודקים חוקיות לפני משמעות: dept לא קיים ב-Takes",
        explanation: "התבנית נראית כמו מקסימום (מקרינים את T2 שהציון שלו קטן), אבל החלק הראשון פסול: $σ_{dept=\"CS\"} (Takes)$ פונה לעמודה dept, ול-Takes אין כזו. ביטוי לא חוקי לא מחזיר כלום, ולכן אף ניסוח אינו מתאים. זו בדיוק המלכודת של 22B-A שאלה 13, שבה הביטוי פנה לעמודה שלא קיימת ב-one_man_band." },

      { id: "A07-Q3", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי הסטודנטים **שלא למדו אף קורס**?",
        options: [
          {id:"a", type:"algebra", value:'Π_{sid} (Student) − Π_{sid} (Takes)'},
          {id:"b", type:"algebra", value:'Π_{sid, name} (Student) − Π_{sid} (Takes)'},
          {id:"c", type:"algebra", value:'Π_{sid} (Takes) − Π_{sid} (Student)'},
          {id:"d", type:"algebra", value:'Student − Takes'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "a",
        verify: { ref: 'Π_{sid} (Student) − Π_{sid} (Takes)', same: ["a"], differ: ["c"], invalid: ["b", "d"] },
        recap: "הפרש רק בין יחסים תואמים · הסדר: הכול פחות מי שעשה",
        explanation: "\"לא למד אף קורס\" = כל הסטודנטים **פחות** מי שמופיע ב-Takes: {opt:a}. ב-{opt:b} יש שתי עמודות מול עמודה אחת, ולכן הוא לא תואם ופסול. גם ב-{opt:d} ל-Student 4 עמודות ול-Takes 3. ב-{opt:c} הסדר הפוך: כל מי שב-Takes הוא גם סטודנט, ולכן התוצאה ריקה." },

      { id: "A07-Q4", ctx: schemaT,
        question: "איזה מהבאים **אי אפשר** לבטא באלגברת היחסים?",
        options: [
          {id:"a", type:"text", value:"מזהה הסטודנט הצעיר ביותר."},
          {id:"b", type:"text", value:"העיר של הסטודנט הצעיר ביותר."},
          {id:"c", type:"text", value:"מספר הסטודנטים שלמדו את הקורס DB."},
          {id:"d", type:"text", value:"הסטודנטים שלמדו יותר מקורס אחד."},
          {id:"e", type:"text", value:"הסטודנטים שלמדו את כל קורסי CS."},
        ], correctId: "c",
        recap: "אין באלגברה COUNT/SUM/AVG · קיצון ו\"יותר מפעם\" כן אפשר",
        explanation: "באלגברה אין פעולות צבירה (COUNT, SUM, AVG, GROUP BY), ולכן \"מספר הסטודנטים\" לא ניתן לביטוי. את כל השאר אפשר: הצעיר ביותר = הכול פחות מי שיש מישהו צעיר ממנו (הפרש + צירוף עצמי), והעיר שלו מתקבלת בצירוף התוצאה עם Student. \"יותר מקורס אחד\" = צירוף עצמי של Takes עם `sid` שווה ו-`cid` שונה. \"כל קורסי CS\" = חילוק. זה המבנה של 21B-A שאלה 17." },

      { id: "A07-Q5", ctx: schema,
        question: "נתונות ההגדרות הבאות:\n$$TR1 ← Π_{T1.age} σ_{T1.age > T2.age} (ρ_{T1} Student × ρ_{T2} Student)$$$$TR2 ← Π_{age} (Student) − TR1$$מה נקבל ב-`TR2`?",
        options: [
          {id:"a", type:"text", value:"הגיל הגבוה ביותר."},
          {id:"b", type:"text", value:"הגיל הנמוך ביותר."},
          {id:"c", type:"text", value:"כל הגילאים פרט לנמוך ביותר."},
          {id:"d", type:"text", value:"כל הגילאים פרט לגבוה ביותר."},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה."},
        ], correctId: "b",
        verify: { expr: "TR1 ← Π_{T1.age} σ_{T1.age > T2.age} (ρ_{T1} Student × ρ_{T2} Student)\nTR2 ← Π_{age} (Student) − TR1", expect: [[22]] },
        recap: "TR1 = מי שגדול ממישהו · הכול פחות TR1 = המינימום",
        explanation: "התנאי בוחר זוגות שבהם T1 מבוגר מ-T2. ב-TR1 מקרינים את **T1**, כלומר כל גיל שגדול מגיל אחר. כל הגילאים פחות אלה = הגיל שאף גיל לא קטן ממנו, כלומר **המינימום**. \"מי שמוקרן מפסיד\": מקרינים את המבוגר, והוא יוצא מהתוצאה. בנתוני הדוגמה הגילאים הם 22, 25, 27, 30, ולכן TR1 = {25, 27, 30} ו-TR2 = {22}." },

      { id: "A07-Q6", ctx: schema,
        question: "נתונות ההגדרות הבאות:\n$$TR1 ← Π_{T1.age} σ_{T1.age > T2.age} (ρ_{T1} Student × ρ_{T2} Student)$$$$TR5 ← Π_{T2.age} σ_{T1.age > T2.age} (ρ_{T1} Student × ρ_{T2} Student)$$$$TR3 ← TR1 ∩ TR5$$$$TR4 ← Π_{age} (Student) − TR3$$מה נקבל ב-`TR4`?",
        options: [
          {id:"a", type:"text", value:"הגיל הנמוך ביותר בלבד."},
          {id:"b", type:"text", value:"כל הגילאים פרט לנמוך ולגבוה ביותר."},
          {id:"c", type:"text", value:"הגיל הנמוך ביותר וגם הגיל הגבוה ביותר."},
          {id:"d", type:"text", value:"תוצאה ריקה תמיד."},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה."},
        ], correctId: "c",
        verify: { expr: "TR1 ← Π_{T1.age} σ_{T1.age > T2.age} (ρ_{T1} Student × ρ_{T2} Student)\nTR5 ← Π_{T2.age} σ_{T1.age > T2.age} (ρ_{T1} Student × ρ_{T2} Student)\nTR3 ← TR1 ∩ TR5\nTR4 ← Π_{age} (Student) − TR3", expect: [[22], [30]] },
        recap: "מקרינים T1 = הכול פרט למינימום · מקרינים T2 = הכול פרט למקסימום · החיתוך = האמצעיים",
        explanation: "TR1 = גילאים שגדולים מגיל אחר, כלומר הכול **פרט למינימום**. TR5 = גילאים שקטנים מגיל אחר, כלומר הכול **פרט למקסימום**. החיתוך = הגילאים האמצעיים, ו\"הכול פחות האמצעיים\" = **הנמוך וגם הגבוה**. בנתוני הדוגמה: TR3 = {25, 27}, ולכן TR4 = {22, 30}. זו בדיוק 25B-A שאלה 14." },

      { id: "A07-Q7", ctx: schema,
        question: "השאלה: \"מזהי הסטודנטים שלמדו **את כל** קורסי מחלקת CS\". לרשותכם: הפרש, חיתוך, איחוד, חילוק, שינוי שם. **בכמה** מהפעולות האלה תצטרכו להשתמש? (לפי הקונבנציה של הקורס, 25B-A שאלה 15: מחלקים ישירות את טבלת הקשר, בלי לצרף טבלה נוספת רק כדי ליישר שמות עמודות.)",
        options: [
          {id:"a", type:"text", value:"0"},
          {id:"b", type:"text", value:"1"},
          {id:"c", type:"text", value:"2"},
          {id:"d", type:"text", value:"3"},
          {id:"e", type:"text", value:"4"},
        ], correctId: "b",
        verify: { expr: 'Π_{sid, cid} (Takes) ÷ Π_{cid} σ_{dept="CS"} (Course)', expect: [[1], [2]] },
        recap: "\"כל\" = חילוק · ρ נדרש רק כששם העמודה שונה",
        explanation: "\"את כל\" = **חילוק**: $Π_{sid, cid} (Takes) ÷ Π_{cid} σ_{dept=\"CS\"} (Course)$. העמודה נקראת `cid` בשני היחסים, ולכן סכמת המחלק כבר מוכלת בסכמת המחולק ואין צורך בשינוי שם. σ ו-Π לא נספרות, ולכן התשובה היא פעולה **אחת**. השווה ל-25B-A שאלה 15, שם `id` מול `student_id` חייב ρ והתשובה הייתה 2." },

      { id: "A07-Q8", ctx: schemaT,
        question: "השאלה: \"מזהי המרצים שמלמדים **את כל** קורסי מחלקת Math\" (שימו לב לשמות העמודות). לרשותכם: הפרש, חיתוך, איחוד, חילוק, שינוי שם. **בכמה** מהפעולות האלה תצטרכו להשתמש? (לפי הקונבנציה של הקורס, 25B-A שאלה 15: מחלקים ישירות את טבלת הקשר, בלי לצרף טבלה נוספת רק כדי ליישר שמות עמודות.)",
        options: [
          {id:"a", type:"text", value:"0"},
          {id:"b", type:"text", value:"1"},
          {id:"c", type:"text", value:"2"},
          {id:"d", type:"text", value:"3"},
          {id:"e", type:"text", value:"4"},
        ], correctId: "c",
        verify: [
          { expr: 'Π_{tid, course_no} (Teaches) ÷ ρ_{M(course_no)} (Π_{cid} σ_{dept="Math"} (Course))', expect: [[7], [8]] },
          { ref: 'Π_{tid, course_no} (Teaches) ÷ ρ_{M(course_no)} (Π_{cid} σ_{dept="Math"} (Course))',
            template: 'Π_{tid, course_no} (Teaches) ÷ Π_{cid} σ_{dept="Math"} (Course)', invalid: ["c"] },
        ],
        recap: "שם עמודה שונה בין המחולק למחלק = עוד ρ",
        explanation: "\"את כל\" = חילוק. אבל ב-Teaches הקורס נקרא `course_no`, וב-Course הוא נקרא `cid`. בלי שינוי שם סכמת המחלק ({cid}) לא מוכלת בסכמת המחולק, והחילוק פסול. לכן: $Π_{tid, course_no} (Teaches) ÷ ρ_{M(course_no)} (Π_{cid} σ_{dept=\"Math\"} (Course))$, כלומר חילוק + שינוי שם = **2** פעולות. זה המבנה של 25B-A שאלה 15." },
    ],
  });
})();
