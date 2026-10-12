/* Normalization course · level 1 — what a functional dependency is; reading a table instance */
(function(){
  const T1 = { name: "R", columns: ["A", "B", "C"], rows: [[1, "x", 10], [1, "x", 20], [2, "y", 30], [3, "z", 30]] };
  const T2 = { name: "R", columns: ["A", "B", "C"], rows: [["a", 1, "T"], ["a", 2, "F"], ["b", 3, "T"], ["c", 3, "T"]] };
  const T3 = { name: "R", columns: ["A", "B", "C", "D"], rows: [[1, 1, 1, 1], [1, 2, 1, 2], [2, 1, 1, 3], [2, 2, 2, 3]] };
  const T4 = { name: "R", columns: ["A", "B", "C"], rows: [[1, "x", "p"], [2, "x", "q"], [3, "y", "p"], [4, "y", "p"]] };
  const EMP = { name: "Emp", columns: ["id", "name", "dept", "mgr", "city"], rows: [
    [1, "Dana", "IT", "Ron", "Haifa"], [2, "Adi", "IT", "Ron", "Tel Aviv"], [3, "Ido", "HR", "Gal", "Haifa"],
    [4, "Noa", "Sales", "Gal", "Eilat"], [5, "Dana", "HR", "Gal", "Haifa"]] };
  const inst = (t, title) => ({ kind: "relations", title: title || "מופע חוקי של היחס", tables: [t] });

  NORM_LEVEL({
    id: "N01", order: 1, icon: "🔗", title: "תלות פונקציונלית",
    goal: "להבין מה אומרת X → Y, לזהות תלות טריוויאלית ולקרוא מופע של טבלה: מה הוא מוכיח ומה לא.",
    lesson: {
      html: `
<p><strong>תלות פונקציונלית</strong> <code>X → Y</code> אומרת: בכל מופע חוקי של היחס, <strong>לכל ערך של X מתאים ערך יחיד של Y</strong>. שתי שורות שמסכימות על X חייבות להסכים גם על Y.</p>
<ul>
  <li>X ו-Y הן <strong>קבוצות</strong> של תכונות: <code>AB → C</code> אומרת שהצירוף של A ו-B קובע את C.</li>
  <li><strong>תלות טריוויאלית</strong>: Y ⊆ X, למשל <code>AB → A</code>. היא מתקיימת תמיד, בכל טבלה.</li>
  <li>F = קבוצת התלויות שהיחס חייב לקיים <strong>תמיד</strong>, בכל מופע עתידי, לא רק בטבלה שמולך.</li>
  <li><strong>מפתח-על</strong> (superkey): קבוצה X שקובעת את <strong>כל</strong> התכונות של R (<code>X → R</code>). שתי שורות שמסכימות על X מסכימות על הכול. למשל ב-R = (A, B, C) עם <code>A → BC</code>, ‏{A} הוא מפתח-על.</li>
</ul>
{fig:0}
<div class="lesson-rule">🔑 <strong>איך בודקים מופע:</strong> מחפשים <strong>זוג שורות</strong> שמסכימות בצד שמאל וחולקות בצד ימין. מצאת זוג כזה? המופע <strong>מפר</strong> את התלות. לא מצאת? המופע <strong>מקיים</strong> אותה.</div>
<div class="lesson-trap">⚠️ <strong>מה מופע מוכיח (23B-A, שאלה 17):</strong> מופע שמפר את X → Y מוכיח בוודאות ש-<strong>X → Y אינה ב-F</strong>. מופע שמקיים את X → Y <strong>לא</strong> מוכיח שהיא ב-F, אלא רק ש"ייתכן". מופע אחר, עתידי, עלול להפר אותה.</div>`,
      figs: [
        { caption: "השורות הראשונה והשנייה מסכימות על A (1) אבל חולקות על C (5 מול 7), ולכן המופע מפר את A → C. לעומת זאת A → B מתקיימת: A=1 תמיד עם p, ו-A=2 עם q.",
          tables: [{ name: "R", columns: ["A", "B", "C"], rows: [[1, "p", 5], [1, "p", 7], [2, "q", 5]] }] },
      ],
    },
    questions: [
      { id: "N01-Q1", ctx: inst(T1),
        question: "איזו מהתלויות הבאות המופע **מפר**?",
        options: [
          {id:"a", type:"algebra", value:"A → B"},
          {id:"b", type:"algebra", value:"A → C"},
          {id:"c", type:"algebra", value:"B → A"},
          {id:"d", type:"algebra", value:"AC → B"},
        ], correctId: "b",
        verify: [ {instance:true, holds:"A → C", is:false}, {instance:true, holds:"A → B", is:true},
                  {instance:true, holds:"B → A", is:true}, {instance:true, holds:"A C → B", is:true} ],
        recap: "מפרה = זוג שורות שמסכים בשמאל וחולק בימין",
        explanation: "מחפשים זוג שורות שמסכימות בצד שמאל וחולקות בצד ימין. ב-A → C: השורות (1, x, 10) ו-(1, x, 20) מסכימות על A=1 וחולקות על C, ולכן **מפרות**. A → B מתקיימת (A=1 תמיד עם x). B → A מתקיימת (x ← 1, y ← 2, z ← 3). ב-AC → B כל צירוף של A ו-C מופיע פעם אחת בלבד, ולכן אין זוג שיכול להפר." },

      { id: "N01-Q2", ctx: inst(T2),
        question: "נתון מופע חוקי של R, ותהי F קבוצת התלויות מעל R. קבעו האם ייתכן ש:\n(1) התלות B → C היא תלות ב-F.\n(2) התלות A → B היא תלות ב-F.",
        options: [
          {id:"a", type:"text", value:"(1) ייתכן, (2) ייתכן"},
          {id:"b", type:"text", value:"(1) ייתכן, (2) לא ייתכן"},
          {id:"c", type:"text", value:"(1) לא ייתכן, (2) ייתכן"},
          {id:"d", type:"text", value:"(1) לא ייתכן, (2) לא ייתכן"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "b",
        verify: [ {instance:true, holds:"B → C", is:true}, {instance:true, holds:"A → B", is:false} ],
        recap: "מקיים ← \"ייתכן\" · מפר ← \"לא ייתכן\"",
        explanation: "(1) B → C: ‏B=1 ← T, ‏B=2 ← F, ‏B=3 ← T בשתי השורות. המופע מקיים אותה, ולכן **ייתכן** שהיא ב-F. לא \"בוודאות\": מופע אחר עלול להפר אותה. (2) A → B: השורות (a, 1, T) ו-(a, 2, F) מסכימות על A וחולקות על B. המופע מפר אותה, ולכן **לא ייתכן** שהיא ב-F, כי כל מופע חוקי חייב לקיים את כל F. זה המבנה של 23B-A, שאלה 17." },

      { id: "N01-Q3", noDiagram: true,
        question: "מופע חוקי של R **מקיים** את התלות X → Y. מה אפשר להסיק?",
        options: [
          {id:"a", type:"text", value:"X → Y בוודאות נמצאת ב-F."},
          {id:"b", type:"text", value:"ייתכן ש-X → Y נמצאת ב-F, אבל אי אפשר לקבוע זאת מהמופע לבדו."},
          {id:"c", type:"text", value:"X → Y בוודאות אינה נמצאת ב-F."},
          {id:"d", type:"text", value:"X הוא מפתח של R."},
        ], correctId: "b",
        recap: "מופע אחד יכול רק להפריך תלות, לא להוכיח אותה",
        explanation: "F מתארת את מה שחייב להתקיים **בכל** מופע חוקי, גם בעתיד. מופע אחד שמקיים את X → Y הוא רק דוגמה, ומחר תיכנס שורה שתפר אותה. לכן אפשר לומר רק ש**ייתכן**. הכיוון ההפוך כן חד-משמעי: מופע אחד שמפר את X → Y מוכיח שהיא **לא** ב-F. דוגמה: בטבלת עובדים שבה במקרה אין שני עובדים עם אותו שם, name → id מתקיימת, אבל ברור שהיא לא כלל של העולם." },

      { id: "N01-Q4", noDiagram: true,
        question: "איזו מהתלויות הבאות היא **טריוויאלית**?",
        options: [
          {id:"a", type:"algebra", value:"A → AB"},
          {id:"b", type:"algebra", value:"AB → C"},
          {id:"c", type:"algebra", value:"AB → A"},
          {id:"d", type:"algebra", value:"A → B"},
        ], correctId: "c",
        verify: [ {implies:"AB → A", F:"F = {}", is:true}, {implies:"A → AB", F:"F = {}", is:false},
                  {implies:"AB → C", F:"F = {}", is:false}, {implies:"A → B", F:"F = {}", is:false} ],
        recap: "טריוויאלית = צד ימין מוכל בצד שמאל",
        explanation: "תלות היא **טריוויאלית** כש-Y ⊆ X: היא נכונה בכל טבלה, בלי שום מידע. ב-AB → A התכונה A כבר נמצאת משמאל: שתי שורות שמסכימות על A ו-B מסכימות כמובן על A. ב-A → AB צד ימין כולל את B, שלא נמצא בשמאל, ולכן היא אומרת משהו אמיתי (A קובע את B) ואינה טריוויאלית." },

      { id: "N01-Q5", ctx: inst(T3),
        question: "איזו טענה נכונה לגבי המופע?",
        options: [
          {id:"a", type:"text", value:"המופע מקיים את D → A, ולכן D → A בוודאות נמצאת ב-F."},
          {id:"b", type:"text", value:"המופע מפר את A → C, ולכן A → C בוודאות אינה נמצאת ב-F."},
          {id:"c", type:"text", value:"המופע מפר את AB → D."},
          {id:"d", type:"text", value:"המופע מקיים את C → A."},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: [ {instance:true, holds:"A → C", is:false}, {instance:true, holds:"D → A", is:true},
                  {instance:true, holds:"A B → D", is:true}, {instance:true, holds:"C → A", is:false} ],
        recap: "הפרה מוכיחה \"לא ב-F\" · קיום מוכיח רק \"ייתכן\"",
        explanation: "A → C: השורות (2, 1, 1, 3) ו-(2, 2, 2, 3) מסכימות על A=2 וחולקות על C (1 מול 2), ולכן הפרה **מוכיחה** ש-A → C לא ב-F. {opt:a} מסיקה \"בוודאות\" ממופע שמקיים, וזו בדיוק הטעות. AB → D מתקיימת, כי כל צירוף של A ו-B מופיע פעם אחת. C → A מופרת: C=1 מופיע עם A=1 ועם A=2." },

      { id: "N01-Q6", ctx: inst(T4),
        question: "בטבלה כל ערכי A שונים זה מזה. מה נכון?",
        options: [
          {id:"a", type:"text", value:"המופע מקיים את A → BC, אבל אי אפשר להסיק מכך ש-A → BC ב-F."},
          {id:"b", type:"text", value:"המופע מקיים את A → BC, ולכן A הוא בוודאות מפתח של R."},
          {id:"c", type:"text", value:"המופע מפר את A → BC, כי B חוזר על עצמו."},
          {id:"d", type:"text", value:"המופע מקיים את B → C."},
        ], correctId: "a",
        verify: [ {instance:true, holds:"A → B C", is:true}, {instance:true, holds:"B → C", is:false} ],
        recap: "צד שמאל ייחודי בטבלה ← התלות מתקיימת בה, אבל זה עדיין רק \"ייתכן\"",
        explanation: "כשכל ערכי A שונים, אין שתי שורות שמסכימות על A, ולכן **אין זוג שיכול להפר** את A → BC: המופע מקיים אותה. כפילות ב-B לא משנה, כי ההפרה צריכה הסכמה בצד **שמאל**. אבל זה מופע אחד, ולכן אי אפשר להסיק ש-A → BC ב-F, ובוודאי שלא ש-A מפתח. B → C מופרת: B=x מופיע עם p ועם q." },

      { id: "N01-Q7", ctx: inst(EMP, "מופע חוקי של היחס Emp"),
        question: "איזו מהתלויות הבאות **ייתכן** שנמצאת ב-F (כלומר, המופע לא סותר אותה)?",
        options: [
          {id:"a", type:"algebra", value:"mgr → dept"},
          {id:"b", type:"algebra", value:"name → dept"},
          {id:"c", type:"algebra", value:"dept → mgr"},
          {id:"d", type:"algebra", value:"city → mgr"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "c",
        verify: [ {instance:true, holds:"dept → mgr", is:true}, {instance:true, holds:"mgr → dept", is:false},
                  {instance:true, holds:"name → dept", is:false}, {instance:true, holds:"city → mgr", is:false} ],
        recap: "בודקים כל אפשרות: יש זוג מפר? פסולה",
        explanation: "בודקים כל תלות בנפרד ומחפשים זוג מפר. dept → mgr: ‏IT ← Ron (פעמיים), ‏HR ← Gal (פעמיים), ‏Sales ← Gal. אין הפרה, ולכן **ייתכן**. mgr → dept: ‏Gal מופיע עם HR ועם Sales, הפרה. name → dept: שתי Dana, אחת ב-IT ואחת ב-HR, הפרה. city → mgr: ‏Haifa מופיעה עם Ron ועם Gal, הפרה. שימו לב: \"מנהל קובע מחלקה\" לא נובע מ\"מחלקה קובעת מנהל\". תלות היא בכיוון אחד." },

      { id: "N01-Q8", noDiagram: true,
        question: "ב-R = (A, B, C, D) נתון ש-AB → CD (כלומר AB קובע את כל שאר התכונות). איך נקראת קבוצה כמו AB?",
        options: [
          {id:"a", type:"text", value:"מפתח-על (superkey) של R"},
          {id:"b", type:"text", value:"מפתח זר"},
          {id:"c", type:"text", value:"תלות טריוויאלית"},
          {id:"d", type:"text", value:"תכונה עודפת"},
        ], correctId: "a",
        verify: [ {superkey:"AB", R:"R = (A, B, C, D)", F:"F = {AB → CD}", is:true} ],
        recap: "X שקובע את כל R = מפתח-על",
        explanation: "קבוצה X שקובעת את **כל** התכונות של R (‏X → R) היא **מפתח-על**: שתי שורות שמסכימות על X מסכימות על הכול, ולכן הן אותה שורה. אם בנוסף אי אפשר להוריד ממנה אף תכונה, היא **מפתח קביל**. את זה נבדוק בשלב 4, אחרי שנלמד לחשב סגור (שלב 3)." },
    ],
  });
})();
