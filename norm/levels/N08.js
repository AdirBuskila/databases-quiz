/* Normalization course · level 8 — normalization algorithms: BCNF decomposition and 3NF synthesis */
(function(){
  const fd = (R, F, D, title) => ({ kind: "fd", title: title || "הסכמה והתלויות", algebra: [R, F].concat(D ? [D] : []) });

  NORM_LEVEL({
    id: "N08", order: 8, icon: "🏗️", title: "אלגוריתמי נרמול: BCNF ו-3NF",
    goal: "להריץ את אלגוריתם הפירוק ל-BCNF ואת הסינתזה ל-3NF, ולשפוט כל רכיב לפי התלויות שחלות עליו.",
    lesson: {
      html: `
<h3>פירוק ל-BCNF (מלמעלה למטה)</h3>
<ol>
  <li>מוצאים תלות X→Y שמפרה BCNF: X <strong>אינו</strong> מפתח-על של הרכיב.</li>
  <li>מפרקים לשני רכיבים: <code>R1 = X ∪ Y</code> ו-<code>R2 = R ∖ (Y ∖ X)</code>. החיתוך הוא X, ו-X→Y, ולכן הפירוק משמר מידע.</li>
  <li>חוזרים על כל רכיב עם <strong>התלויות שחלות עליו</strong> (ההיטל של F⁺), עד שכל הרכיבים ב-BCNF.</li>
</ol>
<p><strong>דוגמה:</strong> R=(A,B,C), F={A→B, B→C}. המפתח הוא A. B→C מפרה (B אינו מפתח-על), ולכן R1=(B,C), R2=(A,B). שני הרכיבים ב-BCNF.</p>
<h3>סינתזה ל-3NF (מלמטה למעלה)</h3>
<ol>
  <li>מחשבים <strong>כיסוי מינימלי</strong> F<sub>c</sub>.</li>
  <li>לכל תלות X→Y ב-F<sub>c</sub> יוצרים רכיב (X,Y). אם כמה תלויות עם אותו X, מאחדים לרכיב אחד.</li>
  <li>אם <strong>אף רכיב לא מכיל מפתח קביל</strong> של R, מוסיפים רכיב שהוא מפתח.</li>
  <li>מוחקים רכיב שמוכל כולו ברכיב אחר.</li>
</ol>
<p><strong>דוגמה:</strong> R=(A,B,C,D), F={A→B, B→C}. מהכיסוי: (A,B) ו-(B,C). המפתח הוא AD, ואף רכיב לא מכיל אותו, ולכן מוסיפים (A,D).</p>
<div class="lesson-rule">🔑 <strong>מה מבטיח כל אלגוריתם:</strong> סינתזה ל-3NF ← משמרת <strong>תמיד</strong> מידע וגם תלויות. פירוק ל-BCNF ← משמר <strong>תמיד</strong> מידע, אבל <strong>לא תמיד</strong> תלויות. לכן בפועל מסתפקים לעיתים ב-3NF (21S-B שאלה 23).</div>
<div class="lesson-trap">⚠️ <strong>שופטים כל רכיב לפי התלויות שלו, לא לפי F המקורי:</strong> ב-R1=(A,B,C) עם F={A→B, B→C} חלה התלות B→C, ולכן הרכיב לא ב-3NF גם אם "נראה קטן". וההפך: R עצמו יכול להיות לא ב-BCNF, והפירוק שלו כולו ב-BCNF (25B-A שאלה 20).</div>`,
    },
    questions: [
      { id: "N08-Q1", ctx: fd("R = (A, B, C)", "F = {A → B, B → C}"),
        question: "איזו תלות ב-F מפרה את BCNF?",
        options: [
          {id:"a", type:"text", value:"A → B"},
          {id:"b", type:"text", value:"B → C"},
          {id:"c", type:"text", value:"שתיהן"},
          {id:"d", type:"text", value:"אף אחת, R כבר ב-BCNF"},
        ], correctId: "b",
        verify: [ {keys:true, is:["A"]}, {superkey:"A", is:true}, {superkey:"B", is:false} ],
        recap: "הפרת BCNF = צד שמאל שאינו מפתח-על",
        explanation: "המפתח הוא A (A⁺={A,B,C}). A→B: A מפתח-על, ולכן אין הפרה. B→C: B⁺={B,C}, ולכן B **אינו** מפתח-על, וזו הפרה של BCNF. C אינו ראשוני, ולכן זו גם הפרה של 3NF. תלות כזאת (תכונה לא-מפתח שגוררת תכונה אחרת) נקראת תלות טרנזיטיבית." },

      { id: "N08-Q2", ctx: fd("R = (A, B, C)", "F = {A → B, B → C}"),
        question: "מריצים את אלגוריתם הפירוק ל-BCNF ומתחילים מההפרה B → C. מה מתקבל?",
        options: [
          {id:"a", type:"text", value:"R1(A, B), R2(A, C)"},
          {id:"b", type:"text", value:"R1(B, C), R2(A, B)"},
          {id:"c", type:"text", value:"R1(B, C), R2(A, C)"},
          {id:"d", type:"text", value:"R כבר ב-BCNF, אין צורך בפירוק"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: [ {lossless:["BC","AB"], is:true}, {preserves:["BC","AB"], is:true}, {nf:"BC", is:"BCNF"}, {nf:"AB", is:"BCNF"},
                  {preserves:["AB","AC"], is:false}, {lossless:["BC","AC"], is:false} ],
        recap: "BCNF לפי X→Y: R1 = X∪Y, R2 = R∖(Y∖X)",
        explanation: "לפי האלגוריתם: R1 = X∪Y = (B,C), ו-R2 = R∖(Y∖X) = (A,B,C)∖{C} = (A,B). החיתוך B, ו-B→C, ולכן משמר מידע. שני הרכיבים ב-BCNF, ובמקרה הזה גם כל התלויות נשמרו. (A,B),(A,C) משמר מידע, אבל הוא לא מה שהאלגוריתם מייצר מ-B→C, וגם מאבד את B→C. (B,C),(A,C) מפסיד מידע: החיתוך C אינו מפתח של אף רכיב." },

      { id: "N08-Q3", ctx: fd("R = (A, B, C)", "F = {AB → C, C → B}"),
        question: "מה נכון?",
        options: [
          {id:"a", type:"text", value:"R ב-BCNF, ולכן אין צורך לפרק."},
          {id:"b", type:"text", value:"R לא ב-3NF, כי C → B מפרה אותה."},
          {id:"c", type:"text", value:"R ב-3NF ולא ב-BCNF. הפירוק ל-BCNF ‏(C, B), (A, C) משמר מידע אבל מאבד את AB → C."},
          {id:"d", type:"text", value:"R ב-3NF ולא ב-BCNF. הפירוק ל-BCNF ‏(C, B), (A, C) משמר מידע ותלויות."},
        ], correctId: "c",
        verify: [ {keys:true, is:["AB","AC"]}, {nf:"R", is:"3NF"}, {lossless:["CB","AC"], is:true}, {preserves:["CB","AC"], is:false} ],
        recap: "BCNF יכול לעלות בתלות: הדוגמה הקלאסית AB→C, C→B",
        explanation: "המפתחות: AB ו-AC, כלומר A, B, C כולן ראשוניות. C→B: C אינו מפתח-על, ולכן הפרה של BCNF. אבל B **ראשונית**, ולכן 3NF מתקיימת. פירוק ל-BCNF לפי C→B: (C,B) ו-(A,C). החיתוך C, ו-C→B, ולכן משמר מידע. אבל AB→C: A ו-B לא נמצאים יחד באף רכיב, והתלות **אבדה**. זו הסיבה ש-BCNF \"לא תמיד משמר תלויות\"." },

      { id: "N08-Q4", ctx: fd("R = (A, B, C, D)", "F = {A → B, B → C}"),
        question: "F הוא כבר כיסוי מינימלי. מה התוצאה של הסינתזה ל-3NF?",
        options: [
          {id:"a", type:"text", value:"R1(A, B), R2(B, C)"},
          {id:"b", type:"text", value:"R1(A, B, C), R2(A, D)"},
          {id:"c", type:"text", value:"R1(A, B), R2(B, C), R3(A, D)"},
          {id:"d", type:"text", value:"R1(A, B), R2(A, C), R3(A, D)"},
          {id:"e", type:"text", value:"היחס כבר ב-3NF"},
        ], correctId: "c",
        verify: [ {keys:true, is:["AD"]}, {nf:"R", is:"1NF"},
                  {lossless:["AB","BC","AD"], is:true}, {preserves:["AB","BC","AD"], is:true},
                  {lossless:["AB","BC"], is:false}, {nf:"ABC", is:"2NF"}, {preserves:["AB","AC","AD"], is:false} ],
        recap: "סינתזה: רכיב לכל תלות, ואם אין רכיב עם מפתח, מוסיפים אחד",
        explanation: "רכיב לכל תלות: (A,B) מ-A→B ו-(B,C) מ-B→C. המפתח של R הוא **AD** (D לא מופיע באף תלות, ולכן הוא בכל מפתח). אף רכיב לא מכיל את AD, ולכן מוסיפים R3=(A,D). בלעדיו ({opt:a}) הפירוק מפסיד מידע. ב-{opt:b} הרכיב (A,B,C) כולל את B→C, ו-B אינו מפתח-על בו, ולכן הוא לא ב-3NF. {opt:d} מאבד את B→C. R עצמו לא ב-3NF, כי B→C מפרה אותה." },

      { id: "N08-Q5", ctx: fd("R = (A, B, C, D, E)", "F = {A → B, C → D, AC → E}", "R1 = (A, B),  R2 = (C, D),  R3 = (A, C, E)"),
        question: "מה נכון?",
        options: [
          {id:"a", type:"text", value:"R ב-BCNF, והפירוק משמר תלויות."},
          {id:"b", type:"text", value:"R לא ב-BCNF, והפירוק אינו משמר מידע."},
          {id:"c", type:"text", value:"R לא ב-BCNF, וכל רכיבי הפירוק ב-BCNF (ולכן גם ב-3NF)."},
          {id:"d", type:"text", value:"R ב-3NF, והפירוק ב-3NF."},
          {id:"e", type:"text", value:"זהו אינו פירוק של R על פי הגדרה"},
        ], correctId: "c",
        verify: [ {keys:true, is:["AC"]}, {nf:"R", is:"1NF"}, {nf:"AB", is:"BCNF"}, {nf:"CD", is:"BCNF"}, {nf:"ACE", is:"BCNF"},
                  {lossless:["AB","CD","ACE"], is:true}, {preserves:["AB","CD","ACE"], is:true} ],
        recap: "R לא תקין לא אומר שהפירוק שלו לא תקין, ולהפך",
        explanation: "המפתח של R הוא AC. A→B ו-C→D: צד שמאל הוא **חלק** מהמפתח, והימין לא ראשוני. לכן R לא ב-BCNF וגם לא ב-3NF (ולכן {opt:a} ו-{opt:d} שגויות). רכיבי הפירוק: (A,B) עם A→B, (C,D) עם C→D, (A,C,E) עם AC→E. בכל רכיב צד שמאל הוא מפתח, ולכן כולם ב-BCNF, ולכן גם ב-3NF. הפירוק משמר מידע (אפשר לאחד צעד-צעד דרך A ודרך C), ולכן {opt:b} שגויה. אותו מבנה כמו 25B-A שאלה 20." },

      { id: "N08-Q6", ctx: fd("R = (A, B, C, D, E)", "F = {A → BC, D → E}"),
        question: "מה הפירוק הנכון לפי BCNF?",
        options: [
          {id:"a", type:"text", value:"R1(A, B, C), R2(D, E)"},
          {id:"b", type:"text", value:"R1(A, B, C), R2(D, E), R3(A, D)"},
          {id:"c", type:"text", value:"R1(A, B, C, D), R2(D, E)"},
          {id:"d", type:"text", value:"R1(A, B), R2(B, C), R3(D, E), R4(A, D)"},
          {id:"e", type:"text", value:"היחס כבר מנורמל לפי BCNF"},
        ], correctId: "b",
        verify: [ {keys:true, is:["AD"]},
                  {lossless:["ABC","DE","AD"], is:true}, {nf:"ABC", is:"BCNF"}, {nf:"DE", is:"BCNF"}, {nf:"AD", is:"BCNF"},
                  {lossless:["ABC","DE"], is:false}, {nf:"ABCD", is:"1NF"}, {lossless:["AB","BC","DE","AD"], is:false} ],
        recap: "אחרי הפירוק חייב להישאר רכיב שמחבר את הכול (כאן המפתח AD)",
        explanation: "המפתח הוא AD. לפי A→BC מפרקים ל-(A,B,C) ו-(A,D,E). ב-(A,D,E) חלה D→E, ו-D אינו מפתח-על בו, ולכן מפרקים שוב ל-(D,E) ו-(A,D). התוצאה (A,B,C), (D,E), (A,D): כל רכיב ב-BCNF, ומשמר מידע. בלי (A,D) הפירוק מפסיד מידע (החיתוך ריק). ברכיב (A,B,C,D) חלה A→BC בזמן שהמפתח הוא AD, ולכן הוא לא ב-BCNF. פיצול ל-(A,B),(B,C) מפסיד מידע, כי אין תלות B→C. זה דומה ל-21S-B שאלה 21." },

      { id: "N08-Q7", ctx: fd("R = (A, B, C, D, E, G)", "F = {A → B, B → C, CD → E, E → G}"),
        question: "F הוא כיסוי מינימלי. מה הפירוק הנכון לפי 3NF (סינתזה)?",
        options: [
          {id:"a", type:"text", value:"R1(A, B), R2(B, C), R3(C, D, E), R4(E, G)"},
          {id:"b", type:"text", value:"R1(A, B, C), R2(C, D, E, G), R3(A, D)"},
          {id:"c", type:"text", value:"R1(A, B), R2(B, C), R3(C, D, E), R4(E, G), R5(A, D)"},
          {id:"d", type:"text", value:"היחס כבר מנורמל לפי 3NF"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: [ {keys:true, is:["AD"]}, {nf:"R", is:"1NF"},
                  {lossless:["AB","BC","CDE","EG","AD"], is:true}, {preserves:["AB","BC","CDE","EG","AD"], is:true},
                  {lossless:["AB","BC","CDE","EG"], is:false}, {nf:"ABC", is:"2NF"}, {nf:"CDEG", is:"2NF"} ],
        recap: "סינתזה: תלות ← רכיב, ומפתח אם חסר. מאחדים רק תלויות עם אותו צד שמאל",
        explanation: "רכיב לכל תלות: (A,B), (B,C), (C,D,E), (E,G). המפתח: A ו-D לא מופיעים באף צד ימין, ו-AD⁺ = R, ולכן המפתח הוא **AD**. אף רכיב לא מכיל את AD, ולכן מוסיפים (A,D). בלעדיו ({opt:a}) הפירוק מפסיד מידע. ב-{opt:b} איחדו תלויות עם צדדי שמאל שונים: ב-(A,B,C) חלה B→C, וב-(C,D,E,G) חלה E→G, ואף אחד מהם לא ב-3NF. R עצמו לא ב-3NF (למשל B→C)." },

      { id: "N08-Q8", noDiagram: true,
        question: "מה נכון לגבי פירוק ל-3NF בשיטת הסינתזה ולגבי פירוק ל-BCNF?",
        options: [
          {id:"a", type:"text", value:"3NF: תמיד משמר מידע, לא תמיד תלויות. BCNF: תמיד משמר מידע ותלויות."},
          {id:"b", type:"text", value:"3NF: תמיד משמר מידע ותלויות. BCNF: תמיד משמר מידע, לא תמיד תלויות."},
          {id:"c", type:"text", value:"שניהם תמיד משמרים מידע ותלויות."},
          {id:"d", type:"text", value:"3NF: תמיד משמר תלויות, לא תמיד מידע. BCNF: תמיד משמר מידע, לא תמיד תלויות."},
        ], correctId: "b",
        recap: "3NF = תמיד שניהם · BCNF = מידע תמיד, תלויות לא תמיד",
        explanation: "הסינתזה ל-3NF בונה רכיב לכל תלות בכיסוי המינימלי, ולכן כל תלות נשמרת. הרכיב שמכיל מפתח מבטיח שימור מידע. הפירוק ל-BCNF מפצל לפי X→Y עם חיתוך X, ולכן תמיד משמר מידע, אבל עלול לפצל תלות בין רכיבים (הדוגמה AB→C, C→B מהשאלה הקודמת). {opt:a} הוא התיאור של BCNF שהודבק על 3NF, המסיח של 21S-B שאלה 23." },
    ],
  });
})();
