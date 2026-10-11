/* Normalization course · level 6 — normal forms: 1NF, 2NF, 3NF, BCNF and the decision tree */
(function(){
  const fd = (R, F, title) => ({ kind: "fd", title, algebra: [R, F] });
  const NF4 = [
    {id:"a", type:"text", value:"היחס נמצא ב-3NF אבל לא ב-BCNF."},
    {id:"b", type:"text", value:"היחס נמצא ב-BCNF."},
    {id:"c", type:"text", value:"היחס אינו ב-3NF ואינו ב-BCNF."},
    {id:"d", type:"text", value:"היחס נמצא ב-BCNF אבל לא ב-3NF."},
  ];

  NORM_LEVEL({
    id: "N06", order: 6, icon: "🪜", title: "צורות נורמליות",
    goal: "לקבוע אם יחס נמצא ב-1NF, ‏2NF, ‏3NF או BCNF בעזרת עץ ההחלטה: מפתחות, תכונות ראשוניות ותלות מפרה.",
    lesson: {
      html: `
<ul>
  <li><strong>1NF</strong>: כל ערך בתא אטומי. אין רשימה של טלפונים בתוך תא אחד.</li>
  <li><strong>2NF</strong>: ‏1NF, ואין תכונה <strong>לא-ראשונית</strong> שתלויה ב<strong>חלק</strong> ממפתח קביל (תלות חלקית).</li>
  <li><strong>3NF</strong>: לכל תלות לא-טריוויאלית X → Y, או ש-X מפתח-על, או שכל תכונה ב-Y∖X <strong>ראשונית</strong>.</li>
  <li><strong>BCNF</strong>: לכל תלות לא-טריוויאלית X → Y, ‏X <strong>חייב</strong> להיות מפתח-על. נקודה.</li>
</ul>
<p>‏BCNF ⇒ 3NF ⇒ 2NF ⇒ 1NF, ולא להפך. כל BCNF הוא גם 3NF, אבל יש יחסים ב-3NF שאינם ב-BCNF.</p>
<div class="lesson-rule">🔑 <strong>עץ ההחלטה (אותו מסלול בכל שאלה):</strong>
<ol>
  <li>מצא את כל המפתחות הקבילים.</li>
  <li>סמן את התכונות הראשוניות (אלה שמופיעות באיזשהו מפתח).</li>
  <li>חפש תלות שהצד השמאלי שלה <strong>אינו</strong> מפתח-על:<br>
    · אין כזו ← <strong>BCNF</strong> (ולכן גם 3NF).<br>
    · יש, והצד הימני <strong>ראשוני</strong> ← <strong>3NF בלבד</strong>.<br>
    · יש, והצד הימני <strong>לא-ראשוני</strong> ← לא 3NF ולא BCNF.</li>
</ol></div>
<p>דוגמה: R = (A, B, C), F = {AB → C, C → B}. המפתחות: {A, B} ו-{A, C}, ולכן כל התכונות ראשוניות. ‏C → B מפרה BCNF, כי C אינו מפתח-על, אבל B ראשונית, ולכן היחס <strong>ב-3NF ולא ב-BCNF</strong>. זו 21B-C שאלה 22, ו-25C-A שאלה 20 היא אותה שאלה בתחפושת.</p>
<div class="lesson-trap">⚠️ <strong>המסיח שנראה "בטוח":</strong> "לא 3NF ולא BCNF" נכון <strong>רק</strong> כשהצד הימני של התלות המפרה לא-ראשוני (21B-A שאלה 21). מצאת הפרה? לפני שבוחרים, בדוק ראשוניות. ועוד: כדי לבדוק רכיב של פירוק, משתמשים בתלויות שמתקיימות <strong>עליו</strong> (ההיטל של F), לא רק במה שכתוב ב-F.</div>`,
      figs: [],
    },
    questions: [
      { id: "N06-Q1", ctx: { kind: "relations", title: "הטבלה Students", tables: [ { name: "Students", columns: ["id", "name", "phones"], pk: ["id"],
          rows: [[1, "Dana", "052-111, 054-222"], [2, "Adi", "050-333"], [3, "Noa", "053-444, 058-555"]] } ] },
        question: "האם הטבלה Students נמצאת ב-1NF?",
        options: [
          {id:"a", type:"text", value:"כן, כי יש לה מפתח (id)."},
          {id:"b", type:"text", value:"לא, כי בעמודה phones יש כמה ערכים בתוך תא אחד."},
          {id:"c", type:"text", value:"כן, כל טבלה נמצאת תמיד ב-1NF."},
          {id:"d", type:"text", value:"לא, כי אין בטבלה עמודה של שם משפחה."},
        ], correctId: "b",
        recap: "1NF = כל ערך בתא אטומי",
        explanation: "‏1NF דורשת שכל תא יכיל **ערך אטומי אחד**. בתא של Dana יש שני טלפונים (\"052-111, 054-222\"), כלומר תכונה מרובת-ערכים בתוך תא. מפתח לא מספיק. התיקון הוא בדיוק ההמרה מ-ERD: טבלה נפרדת Phones(id, phone)." },

      { id: "N06-Q2", ctx: fd("R = (A, B, C)", "F = {A → BC}"),
        question: "מה מהבאים נכון?",
        options: NF4, correctId: "b",
        verify: [ {nf:"R", is:"BCNF"}, {keys:true, is:["A"]} ],
        recap: "כל צד שמאל הוא מפתח-על ← BCNF",
        explanation: "המפתח היחיד הוא {A}, כי A⁺ = R. התלות היחידה A → BC יוצאת ממפתח-על, ולכן אין הפרה, והיחס **ב-BCNF**, ולכן גם ב-3NF. \"BCNF אבל לא 3NF\" בלתי אפשרי: ‏BCNF גורר 3NF." },

      { id: "N06-Q3", ctx: fd("R = (A, B, C)", "F = {A → B, B → C}"),
        question: "מהי הצורה הנורמלית **הגבוהה ביותר** ש-R נמצא בה?",
        options: [
          {id:"a", type:"text", value:"BCNF"},
          {id:"b", type:"text", value:"3NF"},
          {id:"c", type:"text", value:"2NF"},
          {id:"d", type:"text", value:"1NF בלבד"},
        ], correctId: "c",
        verify: [ {nf:"R", is:"2NF"}, {keys:true, is:["A"]} ],
        recap: "מפתח של תכונה אחת ← אין תלות חלקית ← לפחות 2NF",
        explanation: "המפתח הוא {A}, ולכן הראשונית היחידה היא A. ‏B → C מפרה: ‏B אינו מפתח-על, ו-C **לא-ראשונית**, ולכן לא 3NF (וגם לא BCNF). ‏2NF כן מתקיימת: המפתח הוא תכונה בודדת, ולכן אין \"חלק ממפתח\" שאפשר להיות תלוי בו. זו תלות **טרנזיטיבית** (A → B → C), לא חלקית." },

      { id: "N06-Q4", ctx: fd("R = (A, B, C)", "F = {AB → C, C → B}"),
        question: "מה מהבאים נכון?",
        options: NF4, correctId: "a",
        verify: [ {nf:"R", is:"3NF"}, {keys:true, is:["AB", "AC"]} ],
        recap: "הפרה עם צד ימין ראשוני ← 3NF בלבד",
        explanation: "‏A אף פעם לא בצד ימין, ולכן היא בכל מפתח. ‏(AB)⁺ = R ו-(AC)⁺ = {A, C, B} = R, ולכן המפתחות הם {A, B} ו-{A, C}, וכל שלוש התכונות ראשוניות. ‏C → B: ‏C אינו מפתח-על, ולכן **לא BCNF**. אבל B ראשונית, ולכן **כן 3NF**. זו 21B-C שאלה 22 ו-25C-A שאלה 20." },

      { id: "N06-Q5", ctx: fd("R = (A, B, C, D, E)", "F = {A → BC, AE → D}"),
        question: "מה מהבאים נכון?",
        options: NF4, correctId: "c",
        verify: [ {nf:"R", is:"1NF"}, {keys:true, is:["AE"]} ],
        recap: "הפרה עם צד ימין לא-ראשוני ← לא 3NF ולא BCNF",
        explanation: "‏A ו-E אף פעם לא בצד ימין, ו-(AE)⁺ = R, ולכן {A, E} הוא המפתח היחיד, והראשוניות הן A ו-E. ‏A → BC: ‏A אינו מפתח-על, ו-B ו-C **לא-ראשוניות**, ולכן **לא 3NF ולא BCNF**. זו גם תלות חלקית, ולכן אפילו לא 2NF. כאן המסיח \"הבטוח\" הוא התשובה. זו 21B-A שאלה 21." },

      { id: "N06-Q6", ctx: fd("R = (A, B, C, D)", "F = {AB → CD, D → A}"),
        question: "מה מהבאים נכון?",
        options: NF4, correctId: "a",
        verify: [ {nf:"R", is:"3NF"}, {keys:true, is:["AB", "BD"]}, {superkey:"D", is:false} ],
        recap: "מצאת הפרה? בדוק אם הצד הימני ראשוני",
        explanation: "‏B אף פעם לא בצד ימין. ‏(AB)⁺ = R, ו-(BD)⁺: ‏D → A ואז AB → CD, כלומר R. המפתחות: {A, B} ו-{B, D}, והראשוניות: A, B ו-D. ‏D → A מפרה BCNF (D אינו מפתח-על), אבל **A ראשונית**, ולכן היחס **ב-3NF ולא ב-BCNF**. מי שבוחר \"לא 3NF ולא BCNF\" מיד כשהוא רואה הפרה, נופל כאן." },

      { id: "N06-Q7", ctx: fd("R = (A, B, C, D)", "F = {AB → C, B → D}"),
        question: "איזו טענה נכונה?",
        options: [
          {id:"a", type:"text", value:"היחס נמצא ב-2NF אבל לא ב-3NF."},
          {id:"b", type:"text", value:"היחס אינו ב-2NF, כי D תלויה בחלק מהמפתח {A, B}."},
          {id:"c", type:"text", value:"היחס נמצא ב-3NF, כי כל התלויות יוצאות מתכונות של המפתח."},
          {id:"d", type:"text", value:"היחס נמצא ב-BCNF."},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        verify: [ {nf:"R", is:"1NF"}, {keys:true, is:["AB"]} ],
        recap: "תלות חלקית של לא-ראשונית = לא 2NF",
        explanation: "המפתח היחיד הוא {A, B}, כי A ו-B אף פעם לא בצד ימין ו-(AB)⁺ = R. ‏B → D: ‏D **לא-ראשונית** ותלויה ב-B, שהוא **חלק** מהמפתח. זו תלות חלקית, ולכן **לא 2NF**, וממילא לא 3NF ולא BCNF. \"תלות שיוצאת מתכונה של המפתח\" היא בדיוק הבעיה, לא ההצדקה." },

      { id: "N06-Q8", ctx: fd("R = (A, B, C, D, E, G)", "F = {A → B, B → C, AD → E, E → G}", "פירוק: R1(A, B), R2(B, C), R3(A, D, E), R4(E, G)"),
        question: "נתון הפירוק R1(A, B), ‏R2(B, C), ‏R3(A, D, E), ‏R4(E, G). מה מהבאים נכון?",
        options: [
          {id:"a", type:"text", value:"R נמצא ב-3NF, וכל רכיבי הפירוק ב-BCNF."},
          {id:"b", type:"text", value:"R אינו ב-3NF, והרכיב R3(A, D, E) אינו ב-BCNF."},
          {id:"c", type:"text", value:"R נמצא ב-BCNF."},
          {id:"d", type:"text", value:"R אינו ב-3NF, וכל רכיבי הפירוק ב-BCNF."},
          {id:"e", type:"text", value:"זה אינו פירוק של R"},
        ], correctId: "d",
        verify: [ {keys:true, is:["AD"]}, {nf:"R", is:"1NF"}, {nf:"AB", is:"BCNF"}, {nf:"BC", is:"BCNF"}, {nf:"ADE", is:"BCNF"}, {nf:"EG", is:"BCNF"} ],
        recap: "רכיב נבדק לפי התלויות שמתקיימות עליו (ההיטל של F)",
        explanation: "‏A ו-D אף פעם לא בצד ימין, ו-(AD)⁺ = R, ולכן {A, D} הוא המפתח היחיד. ‏A → B: ‏B לא-ראשונית, ולכן R **אינו ב-3NF**. הרכיבים: ב-R1 ‏A → B עם המפתח A, ב-R2 ‏B → C עם המפתח B, ב-R3 ‏AD → E עם המפתח {A, D}, וב-R4 ‏E → G עם המפתח E. בכל רכיב הצד השמאלי הוא מפתח-על, ולכן **כולם ב-BCNF**. הרכיבים מכסים את כל התכונות של R, ולכן זה פירוק תקין. זה המבנה של 25B-A שאלה 20." },
    ],
  });
})();
