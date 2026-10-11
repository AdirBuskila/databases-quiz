/* Algebra course · level 2 — Cartesian product × and natural join ⊗ */
(function(){
  const STUDENT = { name: "Student", pk: ["sid"], columns: ["sid", "name", "city"],
    rows: [[1, "Dana", "Haifa"], [2, "Adi", "Tel Aviv"], [3, "Ido", "Haifa"], [4, "Noa", "Eilat"], [5, "Gal", "Eilat"]] };
  const ENROLL = { name: "Enroll", pk: ["sid", "cid"], columns: ["sid", "cid"],
    rows: [[1, 101], [1, 102], [2, 101], [3, 103], [4, 102]] };
  const COURSE = { name: "Course", pk: ["cid"], columns: ["cid", "title", "credits"],
    rows: [[101, "DB", 4], [102, "Algo", 3], [103, "AI", 4], [104, "OS", 2]] };
  // same teacher + same room, morning vs evening (three shared column names)
  const MORNING = { name: "Morning", columns: ["sid", "teacher", "room"], rows: [[1, "Cohen", 10], [2, "Levi", 11], [3, "Cohen", 12]] };
  const EVENING = { name: "Evening", columns: ["sid", "teacher", "room"], rows: [[1, "Cohen", 10], [2, "Levi", 20], [3, "Mor", 12], [4, "Cohen", 10]] };
  // deliveries (4 relations, 25S-B / 25C-A style)
  const CUSTOMER = { name: "Customer", pk: ["cust_id"], columns: ["cust_id", "name", "city"], rows: [[1, "Dana", "Haifa"], [2, "Adi", "Haifa"], [3, "Noa", "Eilat"]] };
  const COURIER = { name: "Courier", pk: ["courier_id"], columns: ["courier_id", "cname", "region"], rows: [[10, "Moshe", "Haifa"], [11, "Rina", "Eilat"]] };
  const ORDERS = { name: "Orders", pk: ["order_id"], columns: ["order_id", "cust_id", "courier_id", "express"],
    rows: [[100, 1, 10, "yes"], [101, 2, 11, "yes"], [102, 3, 11, "yes"], [103, 2, 10, "no"]] };

  const schema = { relations: [
    { schema: "Student([u]sid[/u], name, city)", meaning: "סטודנט: מזהה, שם ועיר." },
    { schema: "Enroll([u]sid[/u], [u]cid[/u])", meaning: "רישום של סטודנט לקורס." },
    { schema: "Course([u]cid[/u], title, credits)", meaning: "קורס: קוד, שם ומספר נקודות זכות." },
  ] };
  const withData = { title: "נתונים לדוגמה", tables: [STUDENT, ENROLL, COURSE] };
  const shipSchema = { relations: [
    { schema: "Customer([u]cust_id[/u], name, city)", meaning: "לקוח: מזהה, שם ועיר מגורים." },
    { schema: "Orders([u]order_id[/u], cust_id, courier_id, express)", meaning: "הזמנה: הלקוח שהזמין, השליח שמסר, והאם המשלוח באקספרס (\"yes\" / \"no\")." },
    { schema: "Courier([u]courier_id[/u], cname, region)", meaning: "שליח: מזהה, שם ואזור פעילות." },
  ] };

  ALG_LEVEL({
    id: "A02", order: 2, icon: "🔗", title: "מכפלה קרטזית וצירוף טבעי",
    goal: "להבין מה × ו-⊗ מחזירים, למה ⊗ בלי עמודה משותפת הוא ×, ולכתוב את כל תנאי החיבור כשמשתמשים ב-×.",
    db: [STUDENT, ENROLL, COURSE],
    lesson: {
      html: `
<p>כדי לשלב מידע משתי טבלאות יש שתי פעולות:</p>
<ul>
  <li><strong>A × B (מכפלה קרטזית)</strong>: כל שורה של A מול <strong>כל</strong> שורה של B. מספר השורות = |A|·|B|, מספר העמודות = סכום העמודות. בלי תנאי, רוב הזוגות חסרי משמעות.</li>
  <li><strong>A ⊗ B (צירוף טבעי)</strong>: מזווג רק שורות שמסכימות על <strong>כל</strong> העמודות שיש להן <strong>שם משותף</strong>, אוטומטית, והעמודה המשותפת מופיעה <strong>פעם אחת</strong>.</li>
  <li>אין אף עמודה משותפת? אז <strong>A ⊗ B = A × B</strong> (21S-B שאלה 17).</li>
</ul>
{fig:0}
<div class="lesson-rule">🔑 <strong>חוק הספירה:</strong> השתמשת ב-× בין n טבלאות? חייבים <strong>n−1 תנאי חיבור</strong> (שוויון בין מפתחות) בתוך ה-σ. ספור אותם בלי לקרוא את שאר התנאים. תנאים כמו <code>city="Haifa"</code> הם <strong>סינון</strong>, לא חיבור (25C-A שאלה 14, 25S-B שאלה 14).</div>
<div class="lesson-trap">⚠️ <strong>⊗ מזווג לפי כל השמות המשותפים, לא רק לפי המפתח.</strong> אם לשתי טבלאות יש sid, teacher ו-room, הצירוף דורש התאמה בשלושתן (25C-A שאלה 13). ולהפך: עמודות שמשמעותן זהה אבל השם שונה (cow_id מול mom_id) <strong>לא</strong> מתחברות, והתוצאה היא מכפלה קרטזית (21B-C שאלה 18).</div>`,
      figs: [
        { caption: "Student ⊗ Enroll מזווג לפי sid. ‏sid מופיע פעם אחת, ו-Gal, שלא נרשמה לאף קורס, נעלמת.",
          tables: [STUDENT, ENROLL], alg: "Student ⊗ Enroll",
          result: { columns: ["sid", "name", "city", "cid"], rows: [[1, "Dana", "Haifa", 101], [1, "Dana", "Haifa", 102], [2, "Adi", "Tel Aviv", 101], [3, "Ido", "Haifa", 103], [4, "Noa", "Eilat", 102]] } },
      ],
    },
    questions: [
      { id: "A02-Q1", ctx: withData,
        question: "כמה שורות וכמה עמודות יש בתוצאה? $$Student × Course$$",
        options: [
          {id:"a", type:"text", value:"20 שורות ו-6 עמודות"},
          {id:"b", type:"text", value:"9 שורות ו-6 עמודות"},
          {id:"c", type:"text", value:"20 שורות ו-5 עמודות"},
          {id:"d", type:"text", value:"5 שורות ו-6 עמודות"},
        ], correctId: "a",
        verify: { expr: "Student × Course", rows: 20, cols: 6 },
        recap: "× : שורות = מכפלה, עמודות = סכום",
        explanation: "במכפלה קרטזית כל שורה מ-Student (5) מול כל שורה מ-Course (4): ‏5·4 = **20** שורות. העמודות מצטרפות זו לזו: 3 + 3 = **6**. ב-× לא נמחקת אף עמודה; רק ⊗ מאחד עמודות עם שם משותף." },

      { id: "A02-Q2", ctx: withData,
        question: "כמה שורות וכמה עמודות יש בתוצאה? $$Student ⊗ Enroll$$",
        options: [
          {id:"a", type:"text", value:"5 שורות ו-5 עמודות"},
          {id:"b", type:"text", value:"25 שורות ו-5 עמודות"},
          {id:"c", type:"text", value:"5 שורות ו-4 עמודות"},
          {id:"d", type:"text", value:"4 שורות ו-4 עמודות"},
        ], correctId: "c",
        verify: { expr: "Student ⊗ Enroll", rows: 5, cols: 4 },
        recap: "⊗ : העמודה המשותפת פעם אחת · שורה לכל זוג מתאים",
        explanation: "העמודה המשותפת היא sid. כל רישום ב-Enroll מתחבר לסטודנט שלו, ולכן יש **5** שורות, אחת לכל רישום (ל-Dana שתיים). העמודות: sid, name, city, cid, כלומר **4**, כי sid מופיע פעם אחת. \"5 עמודות\" סופר את sid פעמיים, ו-25 שורות זו המכפלה הקרטזית. 4 שורות סופר סטודנטים במקום רישומים." },

      { id: "A02-Q3", ctx: withData,
        question: "מה מחזיר הביטוי? $$Π_{name} (Student ⊗ Enroll)$$",
        options: [
          {id:"a", type:"text", value:"Dana, Adi, Ido, Noa: הסטודנטים שרשומים לקורס אחד לפחות"},
          {id:"b", type:"text", value:"Dana, Adi, Ido, Noa, Gal: כל הסטודנטים"},
          {id:"c", type:"text", value:"Gal: הסטודנטים שלא רשומים לאף קורס"},
          {id:"d", type:"text", value:"Dana בלבד: הסטודנטים שרשומים ליותר מקורס אחד"},
        ], correctId: "a",
        verify: { expr: "Π_{name} (Student ⊗ Enroll)", expect: [["Dana"], ["Adi"], ["Ido"], ["Noa"]] },
        recap: "⊗ משאיר רק מי שיש לו התאמה = \"לפחות אחד\"",
        explanation: "הצירוף משאיר רק שורות שיש להן התאמה בשתי הטבלאות. Gal לא מופיעה ב-Enroll ולכן נעלמת. התוצאה היא הסטודנטים עם **לפחות** רישום אחד, ו-Dana מופיעה פעם אחת אחרי Π. \"מי שלא נרשם כלל\" דורש הפרש, ו\"יותר מאחד\" דורש צירוף עצמי. זה המבנה של 25S-B שאלה 13." },

      { id: "A02-Q4", ctx: withData,
        question: "כמה שורות יש בתוצאה? $$Student ⊗ Course$$",
        options: [
          {id:"a", type:"text", value:"0, כי אין עמודה משותפת, והתוצאה ריקה"},
          {id:"b", type:"text", value:"20"},
          {id:"c", type:"text", value:"5"},
          {id:"d", type:"text", value:"הביטוי אינו תקין"},
        ], correctId: "b",
        verify: { expr: "Student ⊗ Course", rows: 20, cols: 6 },
        recap: "⊗ בלי עמודה משותפת = ×",
        explanation: "ל-Student ול-Course אין אף עמודה בשם משותף. כשאין על מה להשוות, כל זוג שורות \"מסכים\" על אפס עמודות, ולכן הצירוף הטבעי מתנוון ל**מכפלה קרטזית**: 5·4 = 20 שורות. התשובה \"טבלה ריקה\" היא המסיח הקבוע (21S-B שאלה 17)." },

      { id: "A02-Q5", ctx: schema,
        question: "איזה ביטוי מחזיר את שמות הסטודנטים שרשומים לקורס של **4** נקודות זכות?",
        options: [
          {id:"a", type:"algebra", value:"Π_{name} σ_{credits = 4} (Student × Enroll × Course)"},
          {id:"b", type:"algebra", value:"Π_{name} σ_{credits = 4 ∧ Student.sid = Enroll.sid} (Student × Enroll × Course)"},
          {id:"c", type:"algebra", value:"Π_{name} σ_{credits = 4 ∧ Student.sid = Enroll.sid ∧ Enroll.cid = Course.cid} (Student × Enroll × Course)"},
          {id:"d", type:"algebra", value:"Π_{name} σ_{Student.sid = Enroll.sid ∧ Enroll.cid = Course.cid} (Student × Enroll × Course)"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "c",
        verify: { ref: "Π_{name} σ_{credits = 4 ∧ Student.sid = Enroll.sid ∧ Enroll.cid = Course.cid} (Student × Enroll × Course)", same: ["c"], differ: ["a", "b", "d"] },
        recap: "3 טבלאות ב-× = 2 תנאי חיבור + תנאי הסינון",
        explanation: "שלוש טבלאות ב-×, ולכן צריך **שני** תנאי חיבור: Student עם Enroll (sid), ו-Enroll עם Course (cid), ובנוסף את הסינון credits = 4. ‏{opt:a} בלי תנאי חיבור מחבר כל סטודנט לכל קורס של 4 נקודות, ולכן מחזיר את כולם. ‏{opt:b} בלי חיבור Enroll-Course מחזיר כל מי שרשום לקורס כלשהו (גם Noa, שרשומה רק לקורס של 3). ‏{opt:d} שוכח את הסינון. זו 25C-A שאלה 14 בקטן." },

      { id: "A02-Q6", ctx: schema,
        question: "איזה ביטוי מחזיר את **אותה** תשובה (שמות הסטודנטים שרשומים לקורס של 4 נקודות) בעזרת צירוף טבעי?",
        options: [
          {id:"a", type:"algebra", value:"Π_{name} σ_{credits = 4} (Student ⊗ Course)"},
          {id:"b", type:"algebra", value:"Π_{name} σ_{credits = 4} (Student ⊗ Enroll ⊗ Course)"},
          {id:"c", type:"algebra", value:"Π_{name} σ_{credits = 4} (Student × Enroll ⊗ Course)"},
          {id:"d", type:"algebra", value:"Π_{name} σ_{credits = 4} (Enroll ⊗ Course)"},
        ], correctId: "b",
        verify: { ref: "Π_{name} σ_{credits = 4 ∧ Student.sid = Enroll.sid ∧ Enroll.cid = Course.cid} (Student × Enroll × Course)", same: ["b"], differ: ["a", "c"], invalid: ["d"] },
        recap: "⊗ כותב את תנאי החיבור לבד, אבל רק בין טבלאות עם שם משותף",
        explanation: "‏`Student ⊗ Enroll` מתחבר לפי sid, ואחר כך `⊗ Course` לפי cid, כלומר שני תנאי החיבור נכתבים אוטומטית. ‏{opt:a} מדלג על Enroll: ל-Student ול-Course אין עמודה משותפת, ולכן זה × וכל הסטודנטים חוזרים. ב-{opt:c} ה-× בין Student ל-Enroll לא מחבר לפי sid. ‏{opt:d} אינו תקין: אין עמודת name ב-Enroll ⊗ Course." },

      { id: "A02-Q7", ctx: { relations: [
          { schema: "Morning([u]sid[/u], teacher, room)", meaning: "שיעור בוקר של סטודנט: אצל איזה מורה ובאיזה חדר." },
          { schema: "Evening([u]sid[/u], teacher, room)", meaning: "שיעור ערב של סטודנט: אצל איזה מורה ובאיזה חדר." } ] },
        question: "מה עושה השאילתה? $$Π_{sid} (Morning ⊗ Evening)$$",
        options: [
          {id:"a", type:"text", value:"מחזירה את הסטודנטים שיש להם גם שיעור בוקר וגם שיעור ערב."},
          {id:"b", type:"text", value:"מחזירה את הסטודנטים שיש להם שיעור בוקר ושיעור ערב אצל אותו מורה, לא בהכרח באותו חדר."},
          {id:"c", type:"text", value:"מחזירה את הסטודנטים שיש להם שיעור בוקר ושיעור ערב אצל אותו מורה וגם באותו חדר."},
          {id:"d", type:"text", value:"השאילתה אינה תקינה, כי לשני היחסים אותן עמודות."},
        ], correctId: "c",
        verify: { db: [MORNING, EVENING], expr: "Π_{sid} (Morning ⊗ Evening)", expect: [[1]] },
        recap: "⊗ = התאמה בכל העמודות עם שם משותף, לא רק במפתח",
        explanation: "שלוש עמודות משותפות: sid, teacher, room. הצירוף הטבעי דורש התאמה **בשלושתן**: אותו סטודנט, אותו מורה, ואותו חדר. סטודנט 2 למד אצל Levi בשני השיעורים אבל בחדרים שונים, ולכן לא עובר. סטודנט 3 היה באותו חדר אבל אצל מורים שונים. המסיחים מוותרים כל פעם על עמודה אחת, בדיוק כמו ב-25C-A שאלה 13. הפרוצדורה: כתוב את שתי הסכמות זו מתחת לזו והקף כל שם שמופיע בשתיהן." },

      { id: "A02-Q8", ctx: shipSchema,
        question: "איזה ביטוי מחזיר את שמות הלקוחות מ-Haifa שקיבלו משלוח **אקספרס** משליח שפועל ב**אותו אזור** שבו הלקוח גר?",
        options: [
          {id:"a", type:"algebra", value:"Π_{name} σ_{city = \"Haifa\" ∧ region = city ∧ express = \"yes\"} (Customer × Orders × Courier)"},
          {id:"b", type:"algebra", value:"Π_{name} σ_{city = \"Haifa\" ∧ region = city ∧ express = \"yes\" ∧ Customer.cust_id = Orders.cust_id} (Customer × Orders × Courier)"},
          {id:"c", type:"algebra", value:"Π_{name} σ_{city = \"Haifa\" ∧ region = city ∧ express = \"yes\" ∧ Customer.cust_id = Orders.cust_id ∧ Customer.cust_id = Courier.courier_id} (Customer × Orders × Courier)"},
          {id:"d", type:"algebra", value:"Π_{name} σ_{city = \"Haifa\" ∧ region = city ∧ express = \"yes\" ∧ Customer.cust_id = Orders.cust_id ∧ Orders.courier_id = Courier.courier_id} (Customer × Orders × Courier)"},
          {id:"e", type:"text", value:"אף אחת מהאפשרויות"},
        ], correctId: "d",
        verify: { db: [CUSTOMER, ORDERS, COURIER],
          ref: "Π_{name} σ_{city = \"Haifa\" ∧ region = city ∧ express = \"yes\" ∧ Customer.cust_id = Orders.cust_id ∧ Orders.courier_id = Courier.courier_id} (Customer × Orders × Courier)",
          same: ["d"], differ: ["a", "b", "c"] },
        recap: "סופרים רק שוויונות בין מפתחות: n טבלאות = n−1 חיבורים",
        explanation: "שלוש טבלאות, ולכן צריך **שני** חיבורים: לקוח↔הזמנה (cust_id) והזמנה↔שליח (courier_id). התנאים city, region ו-express הם **סינון**, ולא נספרים. ‏{opt:a} בלי חיבורים בכלל, ו-{opt:b} מחבר רק לקוח להזמנה, ולכן Adi עוברת: יש לה הזמנת אקספרס (משליח מאילת), ובנפרד יש שליח בחיפה. ‏{opt:c} מחבר לקוח לשליח לפי מזהים שלא קשורים זה לזה. זה בדיוק 25S-B שאלה 14." },
    ],
  });
})();
