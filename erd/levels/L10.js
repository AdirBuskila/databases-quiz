/* ERD course · level 10 — final exam: two exam-sized diagrams, every question type from the exams */
(function(){
  // X — abstract, exam style (26B-A / 25C-A family): aggregation, ISA, weak entity, arrows, double lines
  const X = {
    w: 920, h: 480, alt: "תרשים גמר מופשט: הקבצה A-R1-B, היררכיית C, ישות חלשה W",
    nodes: [
      {id:"G", t:"agg", x:285, y:110, w:510, h:170, label:"A - R1 - B"},
      {id:"A", t:"entity", x:150, y:130, label:"A"},
      {id:"kA", t:"attr", x:160, y:70, label:"KeyA", key:true, of:"A"},
      {id:"pA", t:"attr", x:105, y:174, label:"PropA_1", of:"A"},
      {id:"R1", t:"rel", x:285, y:130, label:"R1"},
      {id:"pR1", t:"attr", x:285, y:62, label:"PropR1_1", of:"R1"},
      {id:"B", t:"entity", x:420, y:130, label:"B"},
      {id:"kB", t:"attr", x:420, y:70, label:"KeyB", key:true, of:"B"},
      {id:"R2", t:"rel", x:285, y:280, label:"R2"},
      {id:"C", t:"entity", x:620, y:100, label:"C"},
      {id:"kC", t:"attr", x:575, y:38, label:"KeyC", key:true, of:"C"},
      {id:"pC", t:"attr", x:700, y:35, label:"PropC_1", multi:true, of:"C"},
      {id:"R3", t:"rel", x:745, y:100, label:"R3"},
      {id:"D", t:"entity", x:860, y:100, label:"D"},
      {id:"kD", t:"attr", x:860, y:35, label:"KeyD", key:true, of:"D"},
      {id:"pD", t:"attr", x:760, y:178, label:"PropD_2", derived:true, of:"D"},
      {id:"isa", t:"isa", x:620, y:180},
      {id:"C1", t:"entity", x:520, y:280, label:"C1"},
      {id:"pC1", t:"attr", x:520, y:360, label:"PropC1_1", of:"C1"},
      {id:"C2", t:"entity", x:700, y:280, label:"C2"},
      {id:"pC2", t:"attr", x:700, y:360, label:"PropC2_1", of:"C2"},
      {id:"R4", t:"rel", x:860, y:270, label:"R4", ident:true},
      {id:"W", t:"entity", x:860, y:370, label:"W", weak:true},
      {id:"dW", t:"attr", x:760, y:440, label:"DiscW_1", partial:true, of:"W"},
      {id:"pW", t:"attr", x:860, y:445, label:"PropW_1", of:"W"},
    ],
    edges: [
      {a:"R1", b:"A"}, {a:"R1", b:"B"},
      {a:"R2", b:"G"}, {a:"R2", b:"C1"},
      {a:"R3", b:"C", total:true}, {a:"R3", b:"D", arrow:true},
      {a:"isa", b:"C"}, {a:"isa", b:"C1"}, {a:"isa", b:"C2"},
      {a:"R4", b:"D", arrow:true}, {a:"R4", b:"W", total:true},
    ],
  };

  // Y — Hebrew domain (21S-B / 22B-A / 24B-A family): a library
  const Y = {
    w: 920, h: 620, alt: "תרשים גמר: ספרייה — קורא, ספר, עותק, סופר, סניף",
    nodes: [
      {id:"AU", t:"entity", x:150, y:80, label:"סופר"},
      {id:"auid", t:"attr", x:60, y:28, label:"מס' סופר", key:true, of:"AU"},
      {id:"aun", t:"attr", x:240, y:28, label:"שם", of:"AU"},
      {id:"WR", t:"rel", x:340, y:80, label:"מחבר"},
      {id:"BK", t:"entity", x:540, y:80, label:"ספר"},
      {id:"isbn", t:"attr", x:450, y:25, label:"מסת\"ב", key:true, of:"BK"},
      {id:"ttl", t:"attr", x:640, y:25, label:"כותרת", of:"BK"},
      {id:"CO", t:"rel", x:540, y:180, label:"עותק של", ident:true},
      {id:"CP", t:"entity", x:540, y:290, label:"עותק", weak:true},
      {id:"cpn", t:"attr", x:470, y:380, label:"מס' עותק", partial:true, of:"CP"},
      {id:"cst", t:"attr", x:610, y:380, label:"מצב", of:"CP"},
      {id:"LN", t:"rel", x:330, y:290, label:"השאלה"},
      {id:"lnd", t:"attr", x:330, y:380, label:"תאריך השאלה", of:"LN"},
      {id:"RD", t:"entity", x:150, y:290, label:"קורא"},
      {id:"rid", t:"attr", x:50, y:240, label:"ת\"ז", key:true, of:"RD"},
      {id:"rn", t:"attr", x:190, y:200, label:"שם", of:"RD"},
      {id:"rfn", t:"attr", x:90, y:150, label:"פרטי", of:"rn"},
      {id:"rln", t:"attr", x:290, y:165, label:"משפחה", of:"rn"},
      {id:"rag", t:"attr", x:50, y:330, label:"גיל", derived:true, of:"RD"},
      {id:"rph", t:"attr", x:50, y:410, label:"טלפון", multi:true, of:"RD"},
      {id:"isa", t:"isa", x:150, y:400},
      {id:"ST", t:"entity", x:70, y:500, label:"סטודנט"},
      {id:"sti", t:"attr", x:70, y:580, label:"מוסד", of:"ST"},
      {id:"PN", t:"entity", x:240, y:500, label:"גמלאי"},
      {id:"pnd", t:"attr", x:240, y:580, label:"הנחה", of:"PN"},
      {id:"BL", t:"rel", x:720, y:290, label:"שייך ל"},
      {id:"BR", t:"entity", x:860, y:290, label:"סניף"},
      {id:"brid", t:"attr", x:860, y:215, label:"קוד סניף", key:true, of:"BR"},
      {id:"brc", t:"attr", x:860, y:365, label:"עיר", of:"BR"},
    ],
    edges: [
      {a:"WR", b:"AU"}, {a:"WR", b:"BK"},
      {a:"CO", b:"BK", arrow:true}, {a:"CO", b:"CP", total:true},
      {a:"LN", b:"RD", arrow:true}, {a:"LN", b:"CP"},
      {a:"BL", b:"CP", total:true}, {a:"BL", b:"BR", arrow:true},
      {a:"isa", b:"RD"}, {a:"isa", b:"ST"}, {a:"isa", b:"PN"},
    ],
  };

  const none = "כל התשובות האחרות אינן נכונות";

  ERD_LEVEL({
    id: "L10", order: 10, icon: "🏆", title: "מבחן גמר", boss: true,
    goal: "שאלות ברמת מבחן על שני תרשימים גדולים, שמשלבות את כל מה שלמדת. מכאן ממשיכים לשאלות האמיתיות.",
    lesson: {
      html: `
<p>זהו שלב הגמר: <strong>שני תרשימים בגודל של מבחן</strong> ו-12 שאלות בסגנון שלו בדיוק. לפני שמתחילים, זו הפרוצדורה שעובדת על כל תרשים:</p>
<div class="lesson-rule">🔑 <strong>צ'קליסט מבחן (לפי הסדר):</strong>
<ul>
  <li><strong>1. מסמנים קודם, קוראים אפשרויות אחר כך.</strong> לכל מעוין: איפה יש <strong>חץ</strong> (לכל היותר אחד) ואיפה <strong>קו כפול</strong> (לפחות אחד). שניהם יחד = בדיוק אחד.</li>
  <li><strong>2. מסווגים כל קשר:</strong> בלי חץ = N:M ‏←‏ טבלה. עם חץ = מתמזג כמפתח זר לצד ה"רבים". מעוין כפול = קשר מזהה ‏←‏ אין טבלה, מפתח הבעלים נכנס לישות החלשה.</li>
  <li><strong>3. ספירת טבלאות</strong> = ישויות (כולל תת-סוגים וחלשות) + תכונות מרובות-ערכים + קשרי N:M. לא סופרים קשרים עם חץ, קשרים מזהים, תכונות מחושבות או את משולש ה-ISA.</li>
  <li><strong>4. ארבע בדיקות המרה</strong> על כל אפשרות סכמה: מורכבת <em>התפרקה</em>? מרובת-ערכים <em>יצאה</em> לטבלה? אין תכונה <em>זרה</em> (מחושבת, של תת-סוג אחר)? <em>כולן</em> נמצאות?</li>
  <li><strong>5. מפתחות:</strong> ישות חלשה = מפתח חלקי + מפתח הבעלים · תת-סוג = המפתח היורש בלבד · הקבצה = מפתחות כל הישויות שבתוכה · חץ אל X מוציא את X ממפתח טבלת הקשר.</li>
  <li><strong>6. אילוצים:</strong> השתתפות מלאה בצד שמוזג ‏←‏ NOT NULL. "האם ייתכן?" על שני קשרים שונים ‏←‏ כמעט תמיד כן.</li>
</ul></div>
<div class="lesson-trap">⚠️ "כל התשובות האחרות אינן נכונות" <strong>היא לפעמים התשובה</strong> (25S-B, שאלה 1). אם כל אפשרות נפסלת בצ'קליסט, אל תחפש תשובה "הכי פחות גרועה".</div>
<p>אחרי שתעבור את השלב, הכפתור בסיכום יעביר אותך ישר ל-44 שאלות ה-ERD מהמבחנים האמיתיים.</p>`,
    },
    questions: [
      /* ---------- diagram X (abstract) ---------- */
      { id: "L10-Q1", ctx: { title: "תרשים גמר 1", erd: X },
        question: "בתרגום היעיל ביותר, כמה טבלאות נדרשות לכל התרשים?",
        options: [
          {id:"a", type:"text", value:"8"},
          {id:"b", type:"text", value:"9"},
          {id:"c", type:"text", value:"10"},
          {id:"d", type:"text", value:"11"},
          {id:"e", type:"text", value:"12"},
        ], correctId: "c",
        recap: "ישויות + מרובות-ערכים + N:M",
        explanation: "**ישויות:** A, B, C, C1, C2, D, W, כלומר 7 (גם תת-סוגים וישות חלשה מקבלים טבלה). **מרובות-ערכים:** PropC_1, כלומר 1. **קשרי N:M:** R1 (בלי חצים) ו-R2 (בין C1 להקבצה, בלי חצים), כלומר 2. R3 עם חץ מתמזג ל-C, R4 הוא קשר מזהה בלי טבלה, PropD_2 מחושבת. סה״כ 7+1+2 = **10**. המסיחים 11 ו-12 מוסיפים טבלאות ל-R3/R4." },

      { id: "L10-Q2", ctx: { title: "תרשים גמר 1", erd: X },
        question: "לפי דיאגרמת ה-ERD הנתונה, מתקיים כי:",
        options: [
          {id:"a", type:"text", value:"בטבלה של C1 יש 2 שדות המהווים מפתח: KeyC ו-PropC1_1."},
          {id:"b", type:"text", value:"בטבלה של W יש שדה מפתח אחד בלבד: DiscW_1."},
          {id:"c", type:"text", value:"בטבלה של R2 יש 3 שדות המהווים מפתח."},
          {id:"d", type:"text", value:"בטבלה של R3 יש 2 שדות המהווים מפתח."},
          {id:"e", type:"text", value:none},
        ], correctId: "c",
        recap: "R2 על הקבצה: מפתח C1 (יורש KeyC) + KeyA + KeyB",
        explanation: "R2 מחבר את C1 עם ההקבצה A-R1-B ואין בו חצים. המפתח = המפתח של C1, שהוא **KeyC היורש**, ועוד מפתח ההקבצה {KeyA, KeyB}: **3 שדות**. מפתח C1 הוא KeyC בלבד, ו-PropC1_1 תכונה רגילה. ב-W המפתח הוא DiscW_1 + KeyD, כלומר 2 שדות. ל-R3 אין טבלה כי יש בו חץ." },

      { id: "L10-Q3", ctx: { title: "תרשים גמר 1", erd: X },
        question: "המר את טיפוס הישויות W לטבלה. מה יתקבל?",
        options: [
          {id:"a", type:"schema", value:"W ([d]DiscW_1[/d], PropW_1)"},
          {id:"b", type:"schema", value:"W ([d]DiscW_1[/d], PropW_1, [u]KeyD[/u], PropD_2)"},
          {id:"c", type:"schema", value:"W ([d]DiscW_1[/d], PropW_1, [u]KeyD[/u])"},
          {id:"d", type:"schema", value:"W ([u]DiscW_1[/u], PropW_1, KeyC)"},
          {id:"e", type:"text", value:none},
        ], correctId: "c",
        recap: "ישות חלשה = מבחין + תכונות עצמיות + מפתח הבעלים",
        explanation: "W היא **ישות חלשה** (מלבן כפול) והבעלים שלה הוא D, דרך הקשר המזהה R4 (מעוין כפול). המפתח שלה = **המבחין DiscW_1 + מפתח הבעלים KeyD**, ובנוסף התכונה העצמית PropW_1 (כמו 25C-A, שאלה 4). PropD_2 מחושבת ושייכת ל-D, ולכן לא נכנסת. KeyC שייך ל-C, שאינו הבעלים." },

      { id: "L10-Q4", ctx: { title: "תרשים גמר 1", erd: X },
        question: "ל-C יש השתתפות מלאה ב-R3 (קו כפול), ו-R3 מכוון אל D. איזו טענה נכונה לגבי תרגום R3?",
        options: [
          {id:"a", type:"text", value:"R3 הופך לטבלה נפרדת שמפתחה {KeyC, KeyD}."},
          {id:"b", type:"text", value:"R3 ממוזג לטבלת D: מוסיפים ל-D את KeyC כמפתח זר."},
          {id:"c", type:"text", value:"R3 ממוזג לטבלת C, ו-KeyD הופך לחלק מהמפתח הראשי של C."},
          {id:"d", type:"text", value:"R3 ממוזג לטבלת C: KeyD נוסף כמפתח זר מחוץ למפתח הראשי, ומוגדר NOT NULL בגלל ההשתתפות המלאה."},
          {id:"e", type:"text", value:none},
        ], correctId: "d",
        recap: "חץ ‏←‏ מיזוג לצד ה\"רבים\"; קו כפול בצד הזה ‏←‏ NOT NULL",
        explanation: "החץ אל D אומר שכל C קשור ל-D אחד לכל היותר, ולכן R3 הוא 1:N ו**מתמזג לצד ה\"רבים\", C**: KeyD נכנס כמפתח זר. הקו הכפול בצד C (כל C חייב D) נאכף ב-**NOT NULL** על KeyD (26B-A, שאלה 3). KeyD לא נכנס למפתח הראשי, כי זה לא קשר מזהה (26B-A, שאלה 4). מיזוג לתוך D הוא בכיוון ההפוך." },

      { id: "L10-Q5", ctx: { title: "תרשים גמר 1", erd: X },
        question: "מה נדרש לשנות בדיאגרמה, כדי שכל מופע של C1 יהיה קשור למופע אחד לכל היותר של ההקבצה A-R1-B?",
        options: [
          {id:"a", type:"text", value:"להוסיף חץ המכוון מ-R2 אל C1."},
          {id:"b", type:"text", value:"להוסיף קו כפול בין C1 ל-R2."},
          {id:"c", type:"text", value:"להוסיף חץ המכוון מ-R1 אל A."},
          {id:"d", type:"text", value:"להוסיף חץ המכוון מ-R2 אל ההקבצה A-R1-B."},
          {id:"e", type:"text", value:none},
        ], correctId: "d",
        recap: "\"כל X קשור לכל היותר ל-Y אחד\" ‏←‏ חץ אל Y",
        explanation: "\"כל C1 קשור **לכל היותר** למופע אחד של ההקבצה\" = חץ **אל ההקבצה**. אחרי השינוי המפתח של R2 יורד ל-{KeyC} בלבד. חץ אל C1 מגביל את הכיוון ההפוך (כל צירוף (A, B) קשור ל-C1 אחד). קו כפול הוא \"לפחות אחד\" ולא \"לכל היותר\". חץ ב-R1 משנה את הקשר שבתוך ההקבצה." },

      { id: "L10-Q6", ctx: { title: "תרשים גמר 1", erd: X },
        question: "בהמרת תת-הסוג C2 לטבלה, יתקבל:",
        options: [
          {id:"a", type:"schema", value:"C2 ([u]KeyC[/u], PropC_1, PropC2_1)"},
          {id:"b", type:"schema", value:"C2 ([u]KeyC[/u], PropC2_1)"},
          {id:"c", type:"schema", value:"C2 ([u]KeyC[/u], PropC2_1, KeyD)"},
          {id:"d", type:"schema", value:"C2 ([u]PropC2_1[/u])"},
          {id:"e", type:"text", value:none},
        ], correctId: "b",
        recap: "תת-סוג = מפתח יורש + תכונות התת-סוג בלבד",
        explanation: "תת-סוג ב-ISA מקבל טבלה עם **המפתח היורש מהאב (KeyC)** ו**התכונות שלו בלבד** (PropC2_1), כמו 25S-B, שאלה 4. PropC_1 היא תכונה מרובת-ערכים של האב, ונמצאת בטבלה נפרדת של C. KeyD נכנס לטבלת **C** (דרך R3) ולא לתת-הסוג. לתת-סוג אין מפתח משלו." },

      /* ---------- diagram Y (library) ---------- */
      { id: "L10-Q7", ctx: { title: "תרשים גמר 2 · ספרייה", erd: Y },
        question: "איזה מההיגדים הבאים נכון?",
        options: [
          {id:"a", type:"text", value:"כל קורא חייב לשאול לפחות עותק אחד."},
          {id:"b", type:"text", value:"עותק יכול להיות מושאל לכמה קוראים באותו זמן."},
          {id:"c", type:"text", value:"לכל ספר חייב להיות לפחות עותק אחד."},
          {id:"d", type:"text", value:"כל עותק שייך לסניף אחד בדיוק."},
          {id:"e", type:"text", value:none},
        ], correctId: "d",
        recap: "חץ + קו כפול = בדיוק אחד",
        explanation: "ב\"שייך ל\" יש **קו כפול בצד העותק** (כל עותק חייב סניף) ו**חץ אל סניף** (לכל היותר אחד), ולכן **בדיוק אחד**. הקו בין קורא ל\"השאלה\" רגיל, אז קורא לא חייב לשאול. החץ אל קורא אומר שעותק מושאל לקורא אחד לכל היותר. בצד הספר של \"עותק של\" יש חץ ולא קו כפול, ולכן ספר יכול להיות בלי עותקים." },

      { id: "L10-Q8", ctx: { title: "תרשים גמר 2 · ספרייה", erd: Y },
        question: "איזו המרה של \"קורא\" היא הנכונה?",
        options: [
          {id:"a", type:"schema", value:"קורא([u]ת\"ז[/u], פרטי, משפחה, גיל)   טלפונים([u]ת\"ז[/u], [u]טלפון[/u])"},
          {id:"b", type:"schema", value:"קורא([u]ת\"ז[/u], שם, טלפון)"},
          {id:"c", type:"schema", value:"קורא([u]ת\"ז[/u], פרטי, משפחה)   טלפונים([u]ת\"ז[/u], [u]טלפון[/u])"},
          {id:"d", type:"schema", value:"קורא([u]ת\"ז[/u], פרטי, משפחה, מוסד, הנחה)   טלפונים([u]ת\"ז[/u], [u]טלפון[/u])"},
          {id:"e", type:"text", value:none},
        ], correctId: "c",
        recap: "התפרקה? יצאה? זרה? כולן?",
        explanation: "ארבע הבדיקות: **התפרקה?** \"שם\" מורכבת ולכן היא פרטי + משפחה. **יצאה?** \"טלפון\" מרובת-ערכים ולכן יוצאת לטבלה טלפונים(ת״ז, טלפון). **זרה?** \"גיל\" מחושבת ולא מופיעה, ו\"מוסד\"/\"הנחה\" שייכות לתת-הסוגים. **כולן?** כן. \"השאלה\" מתמזגת לעותק ולא לקורא, ולכן לקורא אין מפתח זר." },

      { id: "L10-Q9", ctx: { title: "תרשים גמר 2 · ספרייה", erd: Y },
        question: "מאילו שדות יורכב המפתח של טיפוס הישויות \"עותק\"?",
        options: [
          {id:"a", type:"text", value:"מס' עותק"},
          {id:"b", type:"text", value:"מסת\"ב, מס' עותק"},
          {id:"c", type:"text", value:"מסת\"ב, מס' עותק, קוד סניף"},
          {id:"d", type:"text", value:"מס' עותק, ת\"ז"},
          {id:"e", type:"text", value:none},
        ], correctId: "b",
        recap: "ישות חלשה: מפתח חלקי + מפתח הבעלים",
        explanation: "\"עותק\" היא ישות חלשה (מלבן כפול), שמזוהה דרך הקשר המזהה \"עותק של\" (מעוין כפול) עם הבעלים \"ספר\". המפתח = **המפתח החלקי** \"מס' עותק\" (קו מקווקו) + **מפתח הבעלים** \"מסת״ב\" (כמו 24B-A, שאלה 2). קוד סניף ות״ז נכנסים לטבלה כמפתחות זרים רגילים, לא כחלק מהמפתח." },

      { id: "L10-Q10", ctx: { title: "תרשים גמר 2 · ספרייה", erd: Y },
        question: "בתרגום היעיל ביותר, מה יהיה מספר השדות בטבלה של \"עותק\"?",
        options: [
          {id:"a", type:"text", value:"3"},
          {id:"b", type:"text", value:"4"},
          {id:"c", type:"text", value:"5"},
          {id:"d", type:"text", value:"6"},
          {id:"e", type:"text", value:"\"עותק\" לא תהיה טבלה, כי היא ישות חלשה"},
        ], correctId: "d",
        recap: "ישות חלשה + שני קשרים עם חץ שמתמזגים אליה (עם תכונות הקשר)",
        explanation: "בונים את הטבלה: **מסת״ב + מס' עותק** (המפתח, 2), **מצב** (תכונה עצמית, 3). \"שייך ל\" עם חץ אל סניף מתמזג לעותק: **קוד סניף** (4, NOT NULL בגלל הקו הכפול). \"השאלה\" עם חץ אל קורא מתמזג לעותק יחד עם תכונת הקשר: **ת״ז** (5) ו**תאריך השאלה** (6). סה״כ 6. 4 שוכח את \"השאלה\", ו-5 שוכח את תכונת הקשר." },

      { id: "L10-Q11", ctx: { title: "תרשים גמר 2 · ספרייה", erd: Y },
        question: "איזה מבין הקשרים הבאים יהפוך בהכרח לסכמה (טבלה)?",
        options: [
          {id:"a", type:"text", value:"השאלה"},
          {id:"b", type:"text", value:"שייך ל"},
          {id:"c", type:"text", value:"מחבר"},
          {id:"d", type:"text", value:"עותק של"},
          {id:"e", type:"text", value:none},
        ], correctId: "c",
        recap: "רק N:M (בלי חץ בשני הצדדים) הופך לטבלה בהכרח",
        explanation: "\"מחבר\" הוא **N:M** (אין חץ באף צד): ספר יכול להיכתב ע״י כמה סופרים, וסופר יכול לכתוב כמה ספרים. לכן הוא חייב טבלה: מחבר(מס' סופר, מסת״ב), כמו 24B-A, שאלה 1. ב\"השאלה\" וב\"שייך ל\" יש חץ, והם מתמזגים לעותק. \"עותק של\" הוא קשר מזהה, ומפתח הבעלים נכנס לעותק." },

      { id: "L10-Q12", ctx: { title: "תרשים גמר 2 · ספרייה", erd: Y },
        question: "בתרגום היעיל ביותר, כמה טבלאות נדרשות לכל התרשים?",
        options: [
          {id:"a", type:"text", value:"8"},
          {id:"b", type:"text", value:"9"},
          {id:"c", type:"text", value:"10"},
          {id:"d", type:"text", value:"12"},
        ], correctId: "b",
        recap: "ישויות (7) + מרובות-ערכים (1) + N:M (1) = 9",
        explanation: "**ישויות:** סופר, ספר, עותק, קורא, סטודנט, גמלאי, סניף, כלומר 7. **מרובות-ערכים:** טלפון, כלומר 1. **N:M:** מחבר, כלומר 1. השאלה ושייך ל (חץ) מתמזגים לעותק, \"עותק של\" הוא קשר מזהה, גיל מחושבת ו\"שם\" מורכבת (עמודות, לא טבלה). סה״כ **9**, כמו בחישוב של 21S-B, שאלה 5. 10 מוסיף טבלה ל\"השאלה\", ו-12 נותן טבלה לכל קשר." },
    ],
  });
})();
