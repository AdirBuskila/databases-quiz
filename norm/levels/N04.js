/* Normalization course · level 4 — keys: superkey (X⁺ = R) vs candidate key (minimal superkey) */
(function(){
  const fd = (R, F, title) => ({ kind: "fd", title, algebra: [R, F] });
  const twin = fd("R = (A, B, C, D, E)", "F = {B → AC, A → D, D → E}");

  NORM_LEVEL({
    id: "N04", order: 4, icon: "🔑", title: "מפתחות: מפתח-על ומפתח קביל",
    goal: "לזהות מפתח-על ומפתח קביל בעזרת סגור, ולזהות מהר אילו תכונות חייבות להיות בכל מפתח.",
    lesson: {
      html: `
<p><strong>מפתח-על</strong> = קבוצת תכונות X שהסגור שלה הוא כל היחס: <code>X⁺ = R</code>. <strong>מפתח קביל</strong> = מפתח-על <strong>מינימלי</strong>: אם זורקים ממנו תכונה כלשהי, הוא כבר לא מפתח-על.</p>
<ol>
  <li>חשב <code>X⁺</code>. אם יצא R, אז X מפתח-על.</li>
  <li>בדוק מינימליות: זרוק כל תכונה בנפרד וחשב שוב. אם אף אחת מהתת-קבוצות לא מגיעה ל-R, אז X מפתח קביל.</li>
</ol>
<div class="lesson-rule">🔑 <strong>שלושת חוקי הזהב (סרוק את F לפני שמחשבים):</strong><br>
• תכונה שמופיעה <strong>רק בצד שמאל</strong>, או בשום צד, נמצאת <strong>בכל</strong> מפתח, כי אף תלות לא מייצרת אותה.<br>
• תכונה שמופיעה <strong>רק בצד ימין</strong> לא נמצאת <strong>באף</strong> מפתח קביל, כי תמיד אפשר לקבל אותה מתכונות אחרות.<br>
• "מי מהבאים מפתח?" ← <strong>בדוק את האפשרויות</strong> (סגור לכל אחת). אל תחפש את כל המפתחות מאפס.</div>
<p>דוגמה: R = (A, B, C, D), F = {A → B, B → C, C → D}. ‏A לא מופיעה אף פעם בצד ימין, ולכן היא בכל מפתח. ‏A⁺ = {A, B, C, D} = R, ולכן {A} הוא המפתח הקביל היחיד. ‏{A, B} הוא מפתח-על (מכיל את A), אבל לא קביל, כי B מיותר.</p>
<div class="lesson-trap">⚠️ <strong>"קביל" מול "על", קרא את המילה פעמיים.</strong> ב-23B-A שאלה 18 וב-23B-A2 שאלה 18 הנתונים זהים, ורק המילה שונה: "מי מפתח קביל?" ← אף אחד (כולם שמנים), "מי מפתח-על?" ← כולם. אותו מסיח ב-24B-A שאלה 20: ‏BDGIA הוא מפתח-על, אבל לא קביל.</div>
<p>תכונה <strong>ראשונית</strong> (prime) = תכונה שמופיעה באיזשהו מפתח קביל. זה יהיה חשוב מאוד בשלב 6 (צורות נורמליות).</p>`,
      figs: [],
    },
    questions: [
      { id: "N04-Q1", ctx: fd("R = (A, B, C)", "F = {A → B, B → C}"),
        question: "מי מהבאים הוא **מפתח-על** של R?",
        options: [
          {id:"a", type:"algebra", value:"{B}"},
          {id:"b", type:"algebra", value:"{A}"},
          {id:"c", type:"algebra", value:"{C}"},
          {id:"d", type:"algebra", value:"{B, C}"},
        ], correctId: "b",
        verify: [ {superkey:"A", is:true}, {superkey:"B", is:false}, {superkey:"C", is:false}, {superkey:"BC", is:false}, {closure:"A", is:"ABC"} ],
        recap: "מפתח-על = X⁺ = R",
        explanation: "‏A⁺: מתחילים מ-{A}, ‏A → B מוסיף B, ‏B → C מוסיף C, כלומר A⁺ = {A, B, C} = R. ‏B⁺ = {B, C} ו-(BC)⁺ = {B, C}, ושניהם חסרים את A. ‏C⁺ = {C}. רק {A} מגיע לכל R." },

      { id: "N04-Q2", ctx: fd("R = (A, B, C, D)", "F = {A → B, B → C, C → D}"),
        question: "מי מהבאים הוא **מפתח קביל** של R?",
        options: [
          {id:"a", type:"algebra", value:"{A, B}"},
          {id:"b", type:"algebra", value:"{B}"},
          {id:"c", type:"algebra", value:"{A}"},
          {id:"d", type:"algebra", value:"{B, C}"},
          {id:"e", type:"text", value:"אף אחד מהם"},
        ], correctId: "c",
        verify: [ {candidate:"A", is:true}, {superkey:"AB", is:true}, {candidate:"AB", is:false}, {superkey:"B", is:false}, {superkey:"BC", is:false}, {keys:true, is:["A"]} ],
        recap: "קביל = מפתח-על מינימלי",
        explanation: "‏A⁺ = {A, B, C, D} = R, ו-{A} לא ניתן להקטנה, ולכן הוא מפתח קביל. ‏{A, B} הוא מפתח-על, אבל לא מינימלי: אפשר לזרוק את B ועדיין להגיע ל-R. ‏B⁺ = {B, C, D} ו-(BC)⁺ = {B, C, D}, ושניהם חסרים את A." },

      { id: "N04-Q3", ctx: fd("R = (A, B, C, D, E)", "F = {A → C, B → D, CD → E}"),
        question: "אילו תכונות חייבות להופיע **בכל** מפתח קביל של R?",
        options: [
          {id:"a", type:"text", value:"C ו-D"},
          {id:"b", type:"text", value:"E"},
          {id:"c", type:"text", value:"A בלבד"},
          {id:"d", type:"text", value:"A ו-B"},
          {id:"e", type:"text", value:"אין תכונה שחייבת להופיע בכל מפתח"},
        ], correctId: "d",
        verify: [ {keys:true, is:["AB"]}, {closure:"AB", is:"ABCDE"}, {superkey:"A", is:false} ],
        recap: "תכונה שאף פעם לא בצד ימין ← בכל מפתח",
        explanation: "סורקים את F: ‏A ו-B מופיעות **רק בצד שמאל**. אף תלות לא מייצרת אותן, ולכן כל מפתח חייב להכיל אותן. ‏E מופיעה רק בצד ימין, ולכן היא לא באף מפתח. בדיקה: (AB)⁺ = {A, B, C, D, E} = R, ולכן {A, B} הוא המפתח הקביל היחיד. ‏A לבדה נותנת רק {A, C}." },

      { id: "N04-Q4", ctx: twin,
        question: "מי מהבאים הוא **מפתח קביל** של R?",
        options: [
          {id:"a", type:"algebra", value:"{A, B}"},
          {id:"b", type:"algebra", value:"{B, C}"},
          {id:"c", type:"algebra", value:"{B, D}"},
          {id:"d", type:"algebra", value:"{A, B, E}"},
          {id:"e", type:"text", value:"אף אחד מהם"},
        ], correctId: "e",
        verify: [ {keys:true, is:["B"]}, {candidate:"AB", is:false}, {candidate:"BC", is:false}, {candidate:"BD", is:false}, {candidate:"ABE", is:false}, {superkey:"AB", is:true} ],
        recap: "מכיל את המפתח + עוד תכונה = מפתח-על, לא קביל",
        explanation: "‏B מופיעה רק בצד שמאל, ולכן היא בכל מפתח. ‏B⁺: ‏B → AC מוסיף A ו-C, ‏A → D מוסיף D, ‏D → E מוסיף E, כלומר B⁺ = R. לכן {B} לבדו הוא **המפתח הקביל היחיד**. כל האפשרויות מכילות את B ועוד תכונה, ולכן כולן מפתחות-על אבל **לא מינימליות**. התשובה: אף אחד. זו בדיוק 23B-A שאלה 18." },

      { id: "N04-Q5", ctx: twin,
        question: "באותם נתונים: מי מהבאים הוא **מפתח-על** של R?",
        options: [
          {id:"a", type:"algebra", value:"{A, B}"},
          {id:"b", type:"algebra", value:"{B, C}"},
          {id:"c", type:"algebra", value:"{B, D, E}"},
          {id:"d", type:"text", value:"כל שלוש הקבוצות האחרות"},
          {id:"e", type:"text", value:"אף אחת מהקבוצות"},
        ], correctId: "d",
        verify: [ {superkey:"AB", is:true}, {superkey:"BC", is:true}, {superkey:"BDE", is:true} ],
        recap: "אותם נתונים, מילה אחת שונה: מפתח-על יכול להיות \"שמן\"",
        explanation: "כל קבוצה שמכילה את המפתח {B} היא מפתח-על, כי הסגור שלה מכיל את B⁺ = R. ‏{A, B}, {B, C} ו-{B, D, E} כולן מכילות את B, ולכן כולן מפתחות-על. בשאלה הקודמת, עם אותם נתונים, אף אחת מהן לא הייתה מפתח **קביל**. זה הזוג 23B-A שאלה 18 מול 23B-A2 שאלה 18." },

      { id: "N04-Q6", ctx: fd("R = (A, B, C)", "F = {A → B, B → C, C → A}"),
        question: "כמה מפתחות קבילים יש ל-R?",
        options: [
          {id:"a", type:"text", value:"1"},
          {id:"b", type:"text", value:"2"},
          {id:"c", type:"text", value:"3"},
          {id:"d", type:"text", value:"6"},
          {id:"e", type:"text", value:"0, כי כל תכונה מופיעה גם בצד ימין"},
        ], correctId: "c",
        verify: [ {keys:true, is:["A", "B", "C"]} ],
        recap: "מעגל תלויות ← כל תכונה בודדת היא מפתח",
        explanation: "התלויות יוצרות מעגל A → B → C → A, ולכן כל תכונה בודדת גוררת את כל השאר: A⁺ = B⁺ = C⁺ = R. כל אחת מהן היא מפתח קביל, כלומר 3. זה המספר המקסימלי האפשרי ל-R(A, B, C) (25C-A שאלה 19). למה לא 0? תמיד קיים מפתח, ולכל הפחות R כולו הוא מפתח-על. קבוצות של שתי תכונות כבר לא מינימליות." },

      { id: "N04-Q7", ctx: fd("R = (A, B, C, D, E)", "F = {A → CE, C → DE, B → A}"),
        question: "מי מהבאים **אינו** מפתח-על של R?",
        options: [
          {id:"a", type:"algebra", value:"{B}"},
          {id:"b", type:"algebra", value:"{A, B}"},
          {id:"c", type:"algebra", value:"{A}"},
          {id:"d", type:"algebra", value:"{B, D}"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "c",
        verify: [ {superkey:"A", is:false}, {closure:"A", is:"ACDE"}, {superkey:"B", is:true}, {superkey:"AB", is:true}, {superkey:"BD", is:true} ],
        recap: "חסרה תכונה שרק בצד שמאל ← לא מפתח-על",
        explanation: "‏B מופיעה רק בצד שמאל, ולכן כל מפתח-על חייב להכיל אותה. ‏{A} לא מכיל את B: ‏A⁺ = {A, C, D, E}, בלי B, ולכן הוא לא מפתח-על. ‏B⁺ = {B, A, C, E, D} = R, ולכן {B}, {A, B} ו-{B, D} כולן מפתחות-על. זו 22B-A שאלה 18 (שימו לב ל\"אינו\")." },

      { id: "N04-Q8", ctx: fd("R = (A, B, C, D, E, G, H)", "F = {AB → C, C → D, D → A, E → G, BE → H, H → E}"),
        question: "מי מהבאים הוא **מפתח קביל** של R?",
        options: [
          {id:"a", type:"algebra", value:"{B, E}"},
          {id:"b", type:"algebra", value:"{A, B, E, H}"},
          {id:"c", type:"algebra", value:"{B, D, H}"},
          {id:"d", type:"algebra", value:"{A, C, E}"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        verify: [ {candidate:"BDH", is:true}, {closure:"BDH", is:"ABCDEGH"}, {superkey:"BE", is:false}, {superkey:"ABEH", is:true}, {candidate:"ABEH", is:false}, {superkey:"ACE", is:false}, {closure:"BE", is:"BEGH"}, {closure:"BD", is:"ABCD"}, {closure:"BH", is:"BEGH"}, {closure:"DH", is:"ADEGH"}, {candidate:"ABE", is:true} ],
        recap: "בדוק אפשרויות: סגור + מינימליות. תכונה שאף פעם לא בימין (B) חייבת להופיע",
        explanation: "סורקים: ‏B אף פעם לא בצד ימין, ולכן כל מפתח מכיל אותה. לכן {A, C, E} נפסלת מיד. ‏(BE)⁺ = {B, E, G, H}, חסרים A, C ו-D. ‏(BDH)⁺: ‏H → E, ‏E → G, ‏D → A, ‏AB → C, כלומר כל R. זריקת תכונה שוברת: (BD)⁺ = {A, B, C, D}, ‏(BH)⁺ = {B, E, G, H}, ‏(DH)⁺ = {A, D, E, G, H}. לכן {B, D, H} **קביל**. ‏{A, B, E, H} הוא מפתח-על, אבל לא מינימלי (גם {A, B, E} לבדו מגיע ל-R). זה המסיח השמן של 24B-A שאלה 20." },
    ],
  });
})();
