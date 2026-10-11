/* Normalization course · level 7 — decomposition: lossless join and dependency preservation */
(function(){
  const fd = (R, F, D, title) => ({ kind: "fd", title: title || "הסכמה, התלויות והפירוק", algebra: [R, F].concat(D ? [D] : []) });
  const BOTH = "הפירוק משמר מידע ומשמר תלויות";
  const INFO = "הפירוק משמר מידע, אך לא תלויות";
  const DEPS = "הפירוק משמר תלויות, אך לא מידע";
  const NONE = "הפירוק אינו משמר מידע ואינו משמר תלויות";
  const BAD  = "זהו אינו פירוק של R על פי הגדרה";

  NORM_LEVEL({
    id: "N07", order: 7, icon: "✂️", title: "פירוק: שימור מידע ושימור תלויות",
    goal: "לקבוע לפירוק נתון אם הוא משמר מידע (lossless join) ואם הוא משמר תלויות, ולבדוק כל תכונה בנפרד.",
    lesson: {
      html: `
<p>פירוק של R הוא אוסף רכיבים R<sub>1</sub>,…,R<sub>n</sub> ש<strong>האיחוד שלהם הוא R</strong>. אם תכונה של R לא מופיעה באף רכיב, זה בכלל לא פירוק. על כל פירוק שואלים שתי שאלות <strong>נפרדות</strong>:</p>
<h3>1. שימור מידע (lossless join)</h3>
<p>האם ה-JOIN של הרכיבים מחזיר בדיוק את R, בלי שורות "רפאים"? לפירוק <strong>לשני רכיבים</strong> יש מבחן של שורה אחת:</p>
<div class="lesson-rule">🔑 מחשבים את <code>I = R1 ∩ R2</code> ואת הסגור <code>I⁺</code>. אם <code>I⁺ ⊇ R1</code> <strong>או</strong> <code>I⁺ ⊇ R2</code>, הפירוק משמר מידע. במילים: החיתוך הוא מפתח-על של אחד הרכיבים.</div>
<p><strong>דוגמה:</strong> R=(A,B,C), F={A→B}, R1=(A,B), R2=(A,C). החיתוך הוא A, ו-A⁺={A,B} ⊇ R1, ולכן הפירוק משמר מידע. בפירוק ליותר משני רכיבים מפעילים את המבחן שלב-שלב (מאחדים שני רכיבים שהחיתוך שלהם הוא מפתח של אחד מהם, וממשיכים), או משתמשים באלגוריתם הטבלה (chase).</p>
<h3>2. שימור תלויות</h3>
<p>האם אפשר לאכוף את כל F בלי לעשות JOIN? בודקים <strong>כל תלות</strong> X→Y:</p>
<ol>
  <li>יש רכיב אחד שמכיל את כל X∪Y? התלות נשמרת.</li>
  <li>אם לא, בודקים אם היא נגזרת מהתלויות שנשמרו ברכיבים (מתחילים מ-Z=X, ובכל רכיב R<sub>i</sub> מוסיפים ל-Z את (Z∩R<sub>i</sub>)⁺∩R<sub>i</sub>, עד שאין שינוי). אם Y⊆Z, היא נשמרת.</li>
  <li>מספיק תלות <strong>אחת</strong> שאבדה, והפירוק לא משמר תלויות.</li>
</ol>
<div class="lesson-trap">⚠️ <strong>אחרי "מפסיד מידע" אל תעצור:</strong> שתי התכונות בלתי-תלויות. ב-23B-A שאלה 19 הפירוק מפסיד מידע <u>וגם</u> תלות אבדה, ולכן התשובה "לא ולא". ב-23B-A2 שאלה 19 הוא מפסיד מידע אבל כל התלויות יושבות שלמות ברכיבים, ולכן "משמר תלויות בלבד". ולהפך: פירוק יכול לשמר מידע ולאבד תלות (25B-A שאלה 19).</div>
<div class="lesson-rule">📌 <strong>לזכור בעל פה (21S-B שאלה 23):</strong> פירוק ל-<strong>3NF</strong> בסינתזה משמר <strong>תמיד</strong> גם מידע וגם תלויות. פירוק ל-<strong>BCNF</strong> משמר <strong>תמיד</strong> מידע, אבל <strong>לא תמיד</strong> תלויות.</div>`,
    },
    questions: [
      { id: "N07-Q1", ctx: fd("R = (A, B, C)", "F = {A → B}", "R1 = (A, B),  R2 = (A, C)"),
        question: "מה נכון לגבי הפירוק?",
        options: [
          {id:"a", type:"text", value: INFO},
          {id:"b", type:"text", value: BOTH},
          {id:"c", type:"text", value: DEPS},
          {id:"d", type:"text", value: NONE},
          {id:"e", type:"text", value: BAD},
        ], correctId: "b",
        verify: [ {lossless:["AB","AC"], is:true}, {preserves:["AB","AC"], is:true} ],
        recap: "שימור מידע: (R1∩R2)⁺ מכיל את R1 או את R2",
        explanation: "**מידע:** החיתוך הוא A, ו-A⁺={A,B} מכיל את כל R1=(A,B). החיתוך הוא מפתח-על של R1, ולכן הפירוק משמר מידע. **תלויות:** התלות היחידה A→B יושבת כולה בתוך R1, ולכן היא נשמרת. שתי התכונות מתקיימות." },

      { id: "N07-Q2", ctx: fd("R = (A, B, C)", "F = {A → B, C → B}", "R1 = (A, B),  R2 = (B, C)"),
        question: "מה נכון לגבי הפירוק?",
        options: [
          {id:"a", type:"text", value: BOTH},
          {id:"b", type:"text", value: INFO},
          {id:"c", type:"text", value: NONE},
          {id:"d", type:"text", value: DEPS},
          {id:"e", type:"text", value: BAD},
        ], correctId: "d",
        verify: [ {lossless:["AB","BC"], is:false}, {preserves:["AB","BC"], is:true}, {closure:"B", is:"B"} ],
        recap: "אחרי \"מפסיד מידע\" בודקים תלויות בנפרד",
        explanation: "**מידע:** החיתוך הוא B, ו-B⁺={B} (B לא בצד שמאל של אף תלות). הוא לא מכיל את R1 ולא את R2, ולכן הפירוק **מפסיד מידע**. **תלויות:** A→B שלמה בתוך R1, ו-C→B שלמה בתוך R2, ולכן כל התלויות נשמרות. זה המבנה של 23B-A2 שאלה 19: מי שעוצר אחרי \"מפסיד מידע\" ובוחר \"לא ולא\" טועה." },

      { id: "N07-Q3", ctx: fd("R = (A, B, C)", "F = {A → C, C → B}", "R1 = (A, B),  R2 = (B, C)"),
        question: "מה נכון לגבי הפירוק?",
        options: [
          {id:"a", type:"text", value: DEPS},
          {id:"b", type:"text", value: INFO},
          {id:"c", type:"text", value: NONE},
          {id:"d", type:"text", value: BOTH},
          {id:"e", type:"text", value: BAD},
        ], correctId: "c",
        verify: [ {lossless:["AB","BC"], is:false}, {preserves:["AB","BC"], is:false}, {closure:"B", is:"B"} ],
        recap: "תלות שהצדדים שלה מפוזרים בין רכיבים עלולה לאבד",
        explanation: "**מידע:** החיתוך B, ו-B⁺={B}, ולכן הפירוק מפסיד מידע. **תלויות:** C→B יושבת ב-R2. אבל A→C: אין רכיב שמכיל גם את A וגם את C. בודקים גזירה: Z={A}; מ-R1 מוסיפים (A⁺∩R1) = {A,B}; מ-R2 מוסיפים (B⁺∩R2) = {B}. C לא נכנס, ולכן A→C **אבדה**. כמו ב-23B-A שאלה 19: לא מידע ולא תלויות." },

      { id: "N07-Q4", ctx: fd("R = (A, B, C, D)", "F = {A → B, B → C}", "R1 = (A, B),  R2 = (A, C, D)"),
        question: "מה נכון לגבי הפירוק?",
        options: [
          {id:"a", type:"text", value: BOTH},
          {id:"b", type:"text", value: DEPS},
          {id:"c", type:"text", value: INFO},
          {id:"d", type:"text", value: NONE},
          {id:"e", type:"text", value: BAD},
        ], correctId: "c",
        verify: [ {lossless:["AB","ACD"], is:true}, {preserves:["AB","ACD"], is:false}, {closure:"A", is:"ABC"} ],
        recap: "פירוק יכול לשמר מידע ובכל זאת לאבד תלות",
        explanation: "**מידע:** החיתוך הוא A, ו-A⁺={A,B,C} מכיל את R1=(A,B), ולכן הפירוק משמר מידע. **תלויות:** A→B ב-R1. B→C: B נמצא רק ב-R1 ו-C רק ב-R2. גזירה: Z={B}; מ-R1: B⁺∩R1={B}; מ-R2: אין ל-Z חיתוך עם R2. C לא מגיע, ולכן B→C **אבדה**. זה המצב של 25B-A שאלה 19: מידע כן, תלויות לא." },

      { id: "N07-Q5", noDiagram: true,
        question: "נתון פירוק של R לשני רכיבים R1 ו-R2. איזו בדיקה מבטיחה שהפירוק **משמר מידע**?",
        options: [
          {id:"a", type:"text", value:"לבדוק ש-R1 ∪ R2 = R."},
          {id:"b", type:"text", value:"לבדוק שכל תלות ב-F נמצאת כולה בתוך אחד הרכיבים."},
          {id:"c", type:"text", value:"לחשב את הסגור של R1 ∩ R2 ולוודא שהוא מכיל את R1 או את R2."},
          {id:"d", type:"text", value:"לוודא ש-R1 ∩ R2 ריק, כך שאין כפילות בין הטבלאות."},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        recap: "lossless לשני רכיבים: (R1∩R2)⁺ ⊇ R1 או R2",
        explanation: "החיתוך הוא העמודות שלפיהן עושים את ה-JOIN. אם הוא מפתח-על של אחד הרכיבים (הסגור שלו מכיל אותו), כל שורה של הרכיב השני מתחברת לשורה אחת בלבד, ואין שורות רפאים. `R1 ∪ R2 = R` הוא רק התנאי לכך שזה פירוק בכלל. \"כל תלות בתוך רכיב\" זו הבדיקה של **שימור תלויות**, לא של מידע. חיתוך ריק הוא דווקא הגרוע ביותר: ה-JOIN נהיה מכפלה קרטזית." },

      { id: "N07-Q6", ctx: fd("R = (A, B, C, D)", "F = {A → B, B → C}", "R1 = (A, B),  R2 = (B, C)"),
        question: "מה נכון לגבי הפירוק?",
        options: [
          {id:"a", type:"text", value: DEPS},
          {id:"b", type:"text", value: NONE},
          {id:"c", type:"text", value: BOTH},
          {id:"d", type:"text", value: BAD},
          {id:"e", type:"text", value: INFO},
        ], correctId: "d",
        recap: "קודם כול: האיחוד של הרכיבים חייב להיות R",
        explanation: "התכונה **D** לא מופיעה באף רכיב: R1 ∪ R2 = {A,B,C} ≠ R. לכן זה בכלל לא פירוק של R, ואין טעם לבדוק מידע או תלויות. האפשרות \"זהו אינו פירוק של R על פי הגדרה\" מופיעה במבחנים (25B-A, שאלות 19-20) בדיוק בשביל מקרים כאלה. שווה לבדוק אותה **ראשונה**, זה לוקח שנייה." },

      { id: "N07-Q7", ctx: fd("R = (A, B, C, D, E)", "F = {A → C, B → D, CD → E}", "R1 = (A, C),  R2 = (B, D),  R3 = (C, D, E),  R4 = (A, B)"),
        question: "מה נכון לגבי הפירוק?",
        options: [
          {id:"a", type:"text", value: BOTH},
          {id:"b", type:"text", value: INFO},
          {id:"c", type:"text", value: DEPS},
          {id:"d", type:"text", value: NONE},
          {id:"e", type:"text", value: BAD},
        ], correctId: "a",
        verify: [ {lossless:["AC","BD","CDE","AB"], is:true}, {preserves:["AC","BD","CDE","AB"], is:true}, {keys:true, is:["AB"]},
                  {lossless:["AC","BD","CDE"], is:false} ],
        recap: "יותר משני רכיבים: מאחדים צעד-צעד, והרכיב עם המפתח מחזיק הכול יחד",
        explanation: "**תלויות:** A→C ב-R1, B→D ב-R2, CD→E ב-R3. כולן נשמרות. **מידע:** מאחדים צעד-צעד. R4=(A,B) ו-R1=(A,C): החיתוך A, ו-A⁺ מכיל את R1, ולכן מקבלים (A,B,C) בלי הפסד. עם R2=(B,D): החיתוך B, ו-B⁺={B,D} מכיל את R2, ומקבלים (A,B,C,D). עם R3=(C,D,E): החיתוך {C,D}, ו-{C,D}⁺ מכיל את R3, ומקבלים את כל R. שימו לב לתפקיד של R4=(A,B), שהוא המפתח של R: בלעדיו (רק R1, R2, R3) הפירוק היה **מפסיד מידע**." },

      { id: "N07-Q8", ctx: fd("R = (A, B, C, D, E)", "F = {AB → C, C → D, D → E, E → A}", "R1 = (A, B, C),  R2 = (C, D),  R3 = (D, E)"),
        question: "הפירוק משמר מידע. האם הוא משמר תלויות? אם לא, איזו תלות אבדה?",
        options: [
          {id:"a", type:"text", value:"הפירוק משמר את כל התלויות."},
          {id:"b", type:"text", value:"AB → C אבדה."},
          {id:"c", type:"text", value:"E → A אבדה."},
          {id:"d", type:"text", value:"C → D ו-D → E אבדו."},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: [ {lossless:["ABC","CD","DE"], is:true}, {preserves:["ABC","CD","DE"], is:false},
                  {preserves:["ABC","CD","DE","EA"], is:true} ],
        recap: "תלות שהצדדים שלה לא נמצאים יחד באף רכיב, ולא נגזרת, אבדה",
        explanation: "עוברים תלות-תלות. AB→C ב-R1, C→D ב-R2, D→E ב-R3. **E→A:** E נמצא רק ב-R3=(D,E) ו-A רק ב-R1. גזירה: Z={E}; מ-R3: E⁺∩R3={E} (E⁺={E,A} אבל A לא ב-R3); שאר הרכיבים לא נוגעים ב-E. A לא מגיע, ולכן E→A **אבדה**. אם היינו מוסיפים רכיב R4=(E,A), כל התלויות היו נשמרות." },
    ],
  });
})();
