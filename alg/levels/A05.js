/* Algebra course · level 5 — maximum / minimum: Π(T) − Π σ (ρ_{T1}T × ρ_{T2}T) */
(function(){
  const EMP = { name: "Emp", pk: ["w_id"], columns: ["w_id", "name", "dept", "salary"],
    rows: [
      [1, "Dana", "IT", 9000],
      [2, "Adi", "HR", 5000],
      [3, "Ido", "IT", 12000],
      [4, "Noa", "HR", 13000],
      [5, "Maya", "IT", 5000],
      [6, "Gal", "IT", 7000],
      [7, "Tal", "HR", 13000],
    ] };
  const SMALL = { name: "Emp", pk: ["w_id"], columns: ["w_id", "name", "dept", "salary"],
    rows: [[1, "Dana", "IT", 9000], [2, "Adi", "HR", 5000], [3, "Ido", "IT", 12000], [5, "Maya", "IT", 5000]] };
  const DB = [EMP];
  const schema = { relations: [ { schema: "Emp([u]w_id[/u], name, dept, salary)", meaning: "עובד: מזהה, שם, מחלקה ומשכורת" } ] };
  const withData = { title: "הטבלה Emp (נתונים לדוגמה)", tables: [EMP] };
  const PROD = "(ρ_{T1} Emp × ρ_{T2} Emp)";

  ALG_LEVEL({
    id: "A05", order: 5, icon: "📈", title: "מקסימום ומינימום",
    goal: "לבנות ולקרוא את תבנית הקיצון: כולם פחות מי ש\"מפסיד\" בהשוואה עם עותק של אותה טבלה.",
    db: DB,
    lesson: {
      html: `
<p>באלגברה אין <code>MAX</code> ו-<code>MIN</code>. במקום זה מוצאים את מי ש<strong>לא</strong> מפסיד לאף אחד:</p>
<ol>
  <li>מכפלה של הטבלה עם עצמה, עם שני כינויים: <code>ρ_{T1} Emp × ρ_{T2} Emp</code>. כל זוג עובדים מופיע.</li>
  <li><code>σ_{T1.salary > T2.salary}</code> משאיר זוגות שבהם T1 מרוויח יותר מ-T2.</li>
  <li>מקרינים <strong>כינוי אחד</strong>. ‏<code>Π_{T1.w_id}</code> = כל מי שיש מישהו שמרוויח פחות ממנו, כלומר כולם חוץ מהמינימום.</li>
  <li>כולם פחות התוצאה: <code>Π_{w_id} (Emp) − …</code> ← נשאר <strong>המינימום</strong> (כולל תיקו).</li>
</ol>
{fig:0}
<div class="lesson-rule">🔑 <strong>הכינוי שמקרינים "מפסיד":</strong> מקרינים את T1 והתנאי אומר T1 <strong>גדול</strong> ← מוציאים את הגדולים ← נשאר המינימום. הפוך <strong>אחד</strong> מהשניים (את הסימן או את הכינוי המוקרן) ← מקסימום. הפוך את שניהם ← שוב מינימום.<br>
• Π_{T1} עם T1 > T2 ← מינימום · Π_{T2} עם T2 > T1 ← מינימום<br>
• Π_{T1} עם T1 < T2 ← מקסימום · Π_{T2} עם T2 < T1 ← מקסימום</div>
<div class="lesson-trap">⚠️ <strong>הביטוי תמיד מתחיל ב-"Π_{id}(T) −"</strong>. מכפלה בהתחלה, או השמטת ההפרש, הם חסרי פשר (25B-A, שאלה 13). ועוד: אם רוצים קיצון <strong>בתוך קבוצה</strong> (למשל רק עובדי IT), צריך לסנן את <strong>שני</strong> הכינויים, לא רק את הצד השמאלי (22B-A, שאלה 13).</div>`,
      figs: [
        { caption: "Adi ו-Maya מרוויחים 5000, אין מי שמרוויח פחות מהם, ולכן שניהם נשארים (תיקו).", tables: [SMALL],
          alg: "Π_{w_id} (Emp) − Π_{T1.w_id} σ_{T1.salary > T2.salary} " + PROD,
          result: { columns: ["w_id"], rows: [[2], [5]] } },
      ],
    },
    questions: [
      { id: "A05-Q1", ctx: withData,
        question: "מה מחזיר הביטוי?$$Π_{w_id} (Emp) − Π_{T1.w_id} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)$$",
        options: [
          {id:"a", type:"text", value:"{2, 5}: העובדים עם המשכורת הנמוכה ביותר"},
          {id:"b", type:"text", value:"{2}: רק העובד הראשון עם המשכורת הנמוכה ביותר"},
          {id:"c", type:"text", value:"{4, 7}: העובדים עם המשכורת הגבוהה ביותר"},
          {id:"d", type:"text", value:"{1, 3, 4, 6, 7}"},
        ], correctId: "a",
        verify: { expr: "Π_{w_id} (Emp) − Π_{T1.w_id} σ_{T1.salary > T2.salary} " + PROD, expect: [[2], [5]] },
        recap: "Π(T) − Π_{T1} σ_{T1 > T2} = מינימום, כולל תיקו",
        explanation: "התת-ביטוי מחזיר כל עובד T1 **שיש מישהו שמרוויח פחות ממנו**: כולם חוץ מ-Adi ו-Maya (5000). כולם פחות אלה = {2, 5}. שניהם מקבלים 5000, ואין מי שמרוויח פחות מאף אחד מהם, ולכן **שניהם** חוזרים. אלגברה לא בוחרת \"ראשון\". ‏{1, 3, 4, 6, 7} הוא התת-ביטוי עצמו, לפני ההפרש." },

      { id: "A05-Q2", ctx: withData,
        question: "מה מחזיר **רק** החלק שמחסירים?$$Π_{T1.w_id} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)$$",
        options: [
          {id:"a", type:"text", value:"העובדים עם המשכורת הגבוהה ביותר: {4, 7}"},
          {id:"b", type:"text", value:"כל העובדים שיש מישהו שמרוויח פחות מהם: {1, 3, 4, 6, 7}"},
          {id:"c", type:"text", value:"כל העובדים שיש מישהו שמרוויח יותר מהם: {1, 2, 3, 5, 6}"},
          {id:"d", type:"text", value:"כל העובדים: {1, …, 7}"},
        ], correctId: "b",
        verify: { expr: "Π_{T1.w_id} σ_{T1.salary > T2.salary} " + PROD, expect: [[1], [3], [4], [6], [7]] },
        recap: "התת-ביטוי = מי ש\"מפסיד\" בהשוואה; ההפרש משאיר את השאר",
        explanation: "‏σ משאיר זוגות שבהם T1 מרוויח **יותר** מ-T2. מקרינים את T1, ולכן מקבלים כל עובד שיש לפחות עובד אחד שמרוויח פחות ממנו. רק מי שמרוויח הכי מעט (Adi, Maya) לא מופיע כאן. לכן הביטוי המלא, כולם פחות זה, מחזיר את המינימום. {1, 2, 3, 5, 6} היה יוצא אם היו מקרינים את T2." },

      { id: "A05-Q3", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי העובדים עם המשכורת **הגבוהה** ביותר?",
        options: [
          {id:"a", type:"algebra", value:"Π_{w_id} (Emp) − Π_{T1.w_id} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)"},
          {id:"b", type:"algebra", value:"Π_{w_id} (Emp) − Π_{T2.w_id} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)"},
          {id:"c", type:"algebra", value:"Π_{w_id} (Emp) − Π_{T2.w_id} σ_{T2.salary > T1.salary} (ρ_{T1} Emp × ρ_{T2} Emp)"},
          {id:"d", type:"algebra", value:"Π_{T1.w_id} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "b",
        verify: { ref: "Π_{w_id} σ_{salary = 13000} (Emp)", same: ["b"], differ: ["a", "c", "d"] },
        recap: "מקרינים את T2 עם T1 > T2 ← T2 \"מפסיד\" כשהוא קטן ← נשאר המקסימום",
        explanation: "ב-{opt:b} מקרינים את T2, והתנאי אומר ש-T2 מרוויח **פחות** מ-T1. מוציאים כל מי שיש מישהו שמרוויח יותר ממנו, ונשאר המקסימום: {4, 7}. ‏{opt:a} ו-{opt:c} מחזירות את המינימום: ב-{opt:c} התהפכו גם הכינוי וגם הסימן, ולכן חזרנו למינימום. ‏{opt:d} היא רק החלק המוחסר, בלי ההפרש. זו התבנית של 21S-B שאלה 15 (הדירה היקרה ביותר)." },

      { id: "A05-Q4", ctx: schema,
        question: "מה ישלים את הקטע החסר ____ כך שהביטוי יחזיר את מזהי העובדים עם המשכורת **הנמוכה** ביותר?$$Π_{w_id} (Emp) − Π_{T2.w_id} ____ (ρ_{T1} Emp × ρ_{T2} Emp)$$",
        options: [
          {id:"a", type:"algebra", value:"σ_{T2.salary > T1.salary}"},
          {id:"b", type:"algebra", value:"σ_{T1.salary > T2.salary}"},
          {id:"c", type:"algebra", value:"Π_{T2.salary > T1.salary}"},
          {id:"d", type:"text", value:"לא ניתן להשלים את הביטוי באלגברת היחסים"},
        ], correctId: "a",
        verify: { template: "Π_{w_id} (Emp) − Π_{T2.w_id} ____ (ρ_{T1} Emp × ρ_{T2} Emp)", ref: "Π_{w_id} σ_{salary = 5000} (Emp)", same: ["a"], differ: ["b"], invalid: ["c"] },
        recap: "מקרינים את T2? אז T2 צריך \"להפסיד\" כשהוא גדול: σ_{T2.x > T1.x}",
        explanation: "מקרינים את T2, ולכן מוציאים מהתוצאה כל T2 שמקיים את התנאי. כדי שיישאר המינימום צריך להוציא את מי **שגדול ממישהו**: ‏`σ_{T2.salary > T1.salary}`. ‏{opt:b} מוציאה את מי שקטן ממישהו ולכן משאירה את המקסימום. ‏{opt:c} משתמשת ב-Π עם תנאי, וזה לא ביטוי חוקי: תנאים כותבים ב-σ. זו 21B-C שאלה 16." },

      { id: "A05-Q5", ctx: schema,
        question: "מה מחזיר הביטוי?$$Π_{w_id} σ_{dept=\"IT\"} (Emp) − Π_{T2.w_id} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)$$",
        options: [
          {id:"a", type:"text", value:"את מזהי העובדים עם המשכורת הגבוהה ביותר בחברה."},
          {id:"b", type:"text", value:"את מזהי עובדי IT שמשכורתם הגבוהה ביותר מבין עובדי IT."},
          {id:"c", type:"text", value:"את מזהי עובדי IT שמשכורתם הנמוכה ביותר מבין עובדי IT."},
          {id:"d", type:"text", value:"את מזהי כל עובדי IT."},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה."},
        ], correctId: "e",
        verify: { expr: "Π_{w_id} σ_{dept=\"IT\"} (Emp) − Π_{T2.w_id} σ_{T1.salary > T2.salary} " + PROD, expect: [] },
        recap: "קיצון בתוך קבוצה: לסנן את שני הכינויים, לא רק את הצד השמאלי",
        explanation: "החלק המוחסר משווה את T2 מול **כל** עובדי החברה, ולכן הוא מוציא כל עובד שיש בחברה מישהו שמרוויח יותר ממנו. מה שנשאר הם עובדי IT שמשכורתם היא **המקסימום של כל החברה**. אף ניסוח לא מתאר את זה, ולכן התשובה היא \"אף אחת\". בנתוני הדוגמה המקסימום בחברה (13000) נמצא ב-HR, ולכן הביטוי מחזיר קבוצה ריקה, ולא את Ido שהוא המקסימום של IT. זה המבנה של 22B-A שאלה 13." },

      { id: "A05-Q6", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי עובדי `IT` שמשכורתם **הגבוהה ביותר מבין עובדי IT**?",
        options: [
          {id:"a", type:"algebra", value:"Π_{w_id} σ_{dept=\"IT\"} (Emp) − Π_{T2.w_id} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)"},
          {id:"b", type:"algebra", value:"Π_{w_id} σ_{dept=\"IT\"} (Emp) − Π_{T2.w_id} σ_{T1.salary > T2.salary ∧ T1.dept=\"IT\" ∧ T2.dept=\"IT\"} (ρ_{T1} Emp × ρ_{T2} Emp)"},
          {id:"c", type:"algebra", value:"Π_{w_id} σ_{dept=\"IT\"} (Emp) − Π_{T1.w_id} σ_{T1.salary > T2.salary ∧ T1.dept=\"IT\" ∧ T2.dept=\"IT\"} (ρ_{T1} Emp × ρ_{T2} Emp)"},
          {id:"d", type:"algebra", value:"Π_{w_id} σ_{dept=\"IT\" ∧ salary > salary} (Emp)"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "b",
        verify: { ref: "Π_{w_id} σ_{dept=\"IT\" ∧ salary = 12000} (Emp)", same: ["b"], differ: ["a", "c", "d"] },
        recap: "קיצון בתוך קבוצה: התנאי על הקבוצה בשני הכינויים",
        explanation: "רוצים להשוות עובד IT **רק לעובדי IT אחרים**, ולכן שני הכינויים מסוננים ל-IT בתוך ה-σ. ב-{opt:b} מקרינים את T2 עם T1 > T2, ולכן נשאר המקסימום של IT: Ido (3). ‏{opt:a} משווה מול כל החברה ומחזירה כאן ריק. ‏{opt:c} מקרינה את T1 ולכן מחזירה את המינימום של IT (Maya). ‏{opt:d} משווה עמודה לעצמה בתוך שורה אחת, וזה תמיד שקר." },

      { id: "A05-Q7", ctx: schema,
        question: "איזה ביטוי מחזיר את **ערך** המשכורת הנמוכה ביותר (המספר עצמו)?",
        options: [
          {id:"a", type:"algebra", value:"(ρ_{T1} Emp × ρ_{T2} Emp) − Π_{T1.salary} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)"},
          {id:"b", type:"algebra", value:"Π_{T1.salary} σ_{T1.salary < T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)"},
          {id:"c", type:"algebra", value:"Π_{salary} (Emp) − Π_{T1.salary} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)"},
          {id:"d", type:"algebra", value:"Π_{salary} σ_{salary < salary} (Emp)"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "c",
        verify: { ref: "Π_{salary} σ_{salary = 5000} (Emp)", same: ["c"], differ: ["b", "d"], invalid: ["a"] },
        recap: "מתחילים תמיד ב-Π(T) −, אף פעם לא במכפלה",
        explanation: "אותה תבנית, רק שמקרינים את עמודת המשכורת במקום המזהה: כל ערכי המשכורת, פחות כל ערך שיש ערך קטן ממנו, ונשאר {5000}. ‏{opt:a} מתחילה במכפלה (8 עמודות) ומחסירה ממנה יחס עם עמודה אחת, וזה ביטוי לא חוקי (25B-A, שאלה 13). ‏{opt:b} מחזירה כל ערך שיש ערך גדול ממנו, כלומר כל הערכים חוץ מהמקסימום. ‏{opt:d} תמיד ריקה." },

      { id: "A05-Q8", ctx: schema,
        question: "מה מחזירה השורה האחרונה?$$A ← Π_{T1.salary} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)$$$$B ← Π_{T2.salary} σ_{T1.salary > T2.salary} (ρ_{T1} Emp × ρ_{T2} Emp)$$$$Π_{salary} (Emp) − (A ∩ B)$$",
        options: [
          {id:"a", type:"text", value:"את המשכורת הנמוכה ביותר בלבד"},
          {id:"b", type:"text", value:"את המשכורת הגבוהה ביותר בלבד"},
          {id:"c", type:"text", value:"את המשכורת הנמוכה ביותר וגם את הגבוהה ביותר"},
          {id:"d", type:"text", value:"את כל המשכורות שאינן קיצוניות (לא הכי נמוכה ולא הכי גבוהה)"},
          {id:"e", type:"text", value:"קבוצה ריקה"},
        ], correctId: "c",
        verify: { expr: "A ← Π_{T1.salary} σ_{T1.salary > T2.salary} " + PROD + "\nB ← Π_{T2.salary} σ_{T1.salary > T2.salary} " + PROD + "\nΠ_{salary} (Emp) − (A ∩ B)", expect: [[5000], [13000]] },
        recap: "Π_{T1} = הכול חוץ מהמינימום · Π_{T2} = הכול חוץ מהמקסימום · החיתוך = האמצעיים",
        explanation: "‏A = כל משכורת שיש קטנה ממנה, כלומר הכול חוץ מהמינימום. ‏B = כל משכורת שיש גדולה ממנה, כלומר הכול חוץ מהמקסימום. ‏A ∩ B = המשכורות שאינן קיצוניות (7000, 9000, 12000). כל המשכורות פחות האמצעיות = **הנמוכה והגבוהה**: {5000, 13000}. זה בדיוק המבנה של 25B-A שאלה 14: כשיש השמות מדורגות, רשום בצד מה כל שורה מחזיקה." },
    ],
  });
})();
