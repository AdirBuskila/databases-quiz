/* Normalization course · level 5 — extraneous attributes, equivalence, minimal cover */
(function(){
  const fd = (R, F, title) => ({ kind: "fd", title, algebra: [R, F] });

  NORM_LEVEL({
    id: "N05", order: 5, icon: "✂️", title: "תכונות עודפות וכיסוי מינימלי",
    goal: "למצוא תכונה עודפת בשני הצדדים של תלות, לבדוק שקילות בין קבוצות תלויות ולזהות כיסוי מינימלי.",
    lesson: {
      html: `
<p>תכונה <strong>עודפת</strong> היא תכונה שאפשר למחוק מתלות בלי לשנות את F⁺. בודקים כל צד בנפרד:</p>
<ul>
  <li><strong>בצד שמאל</strong> של <code>XA → Y</code>: ‏A עודפת אם <code>X⁺</code> (לפי כל F) כבר מכיל את Y. כלומר התלות מתקיימת גם בלי A.</li>
  <li><strong>בצד ימין</strong> של <code>X → YB</code>: ‏B עודפת אם <code>X → B</code> נגזרת גם אחרי שמוחקים את B מהתלות, כלומר בדרך אחרת.</li>
  <li>תלות עם תכונה <strong>יחידה</strong> בצד שמאל: אין בה מה למחוק בשמאל.</li>
</ul>
<p>דוגמה: F = {A → B, AB → C}. האם B עודפת ב-AB → C? ‏A⁺ = {A, B, C}, כלומר A לבדה כבר גוררת את C, ולכן <strong>B עודפת</strong>, והתלות מתקצרת ל-A → C.</p>
<div class="lesson-rule">🔑 <strong>התבנית שחוזרת (21B-A שאלה 19, 25C-A שאלה 18):</strong> יש X → A, ואז A מופיעה בצד שמאל יחד עם X (‏XA → W). לכן A עודפת שם, כי X לבד כבר גורר אותה. חפש בעין: "משהו גורר את A, ואז A יושבת ליד אותו משהו".</div>
<div class="lesson-trap">⚠️ <strong>תמיד בדוק את שני הצדדים.</strong> ב-21S-B שאלה 22 כל המסיחים הם תכונות מצד שמאל, והתשובה היא H בצד <strong>ימין</strong> של EG → HI (כי E → FH כבר נותן H). ו"אין תכונה עודפת" היא תשובה לגיטימית (25S-B שאלה 18).</div>
<p><strong>שקילות</strong> (<code>F⁺ = G⁺</code>): כל תלות של F נגזרת מ-G, <strong>וגם</strong> כל תלות של G נגזרת מ-F. בודקים את <strong>שני הכיוונים</strong> (22B-A שאלה 16).</p>
<p><strong>כיסוי מינימלי</strong> G של F: (1) ‏G שקול ל-F, (2) אין ב-G תכונה עודפת, (3) אין ב-G תלות מיותרת (תלות שנגזרת מהשאר). את המינימליות בודקים על <strong>G</strong>, הכיסוי, ולא על F (24B-A שאלה 19).</p>`,
      figs: [],
    },
    questions: [
      { id: "N05-Q1", ctx: fd("R = (A, B, C)", "F = {A → B, AB → C}"),
        question: "האם יש תכונה עודפת בתלות AB → C?",
        options: [
          {id:"a", type:"text", value:"לא, אין תכונה עודפת"},
          {id:"b", type:"text", value:"כן, A עודפת"},
          {id:"c", type:"text", value:"כן, B עודפת"},
          {id:"d", type:"text", value:"כן, C עודפת"},
        ], correctId: "c",
        verify: [ {extraneous:"AB→C", is:["L:B"]}, {closure:"A", is:"ABC"}, {closure:"B", is:"B"} ],
        recap: "שמאל: A עודפת ב-XA→Y אם X⁺ ⊇ Y",
        explanation: "בודקים כל תכונה בצד שמאל: אם מוחקים את B נשאר A → C. ‏A⁺ = {A, B, C} מכיל את C, ולכן **B עודפת**. אם מוחקים את A נשאר B → C, אבל B⁺ = {B} לא מכיל את C, ולכן A לא עודפת. ‏C היא כל הצד הימני, ומחיקתה תמחק את התלות כולה." },

      { id: "N05-Q2", ctx: fd("R = (A, B, C)", "F = {A → BC, B → C}"),
        question: "האם יש תכונה עודפת בתלות A → BC?",
        options: [
          {id:"a", type:"text", value:"כן, C עודפת בצד ימין"},
          {id:"b", type:"text", value:"כן, B עודפת בצד ימין"},
          {id:"c", type:"text", value:"כן, A עודפת"},
          {id:"d", type:"text", value:"לא, בצד שמאל יש תכונה אחת ולכן אין מה להשמיט"},
        ], correctId: "a",
        verify: [ {extraneous:"A→BC", is:["R:C"]} ],
        recap: "ימין: B עודפת ב-X→YB אם X→B נגזרת בדרך אחרת",
        explanation: "בצד שמאל אין מה למחוק, אבל **בצד ימין** יש. אם מוחקים את C מ-A → BC נשארות A → B ו-B → C, ומהן A → C עדיין נגזרת בטרנזיטיביות. לכן **C עודפת**. ‏B לא עודפת: בלי B נשאר A → C, ו-B → C לא עוזרת לקבל את B. המסיח \"אין מה להשמיט\" שוכח לבדוק את הצד הימני." },

      { id: "N05-Q3", ctx: fd("R = (A, C, D, E)", "F = {A → C, AC → D, D → E}"),
        question: "באיזו תלות יש תכונה עודפת, ומהי?",
        options: [
          {id:"a", type:"text", value:"A עודפת ב-AC → D"},
          {id:"b", type:"text", value:"C עודפת ב-AC → D"},
          {id:"c", type:"text", value:"E עודפת ב-D → E"},
          {id:"d", type:"text", value:"אין תכונה עודפת באף תלות"},
        ], correctId: "b",
        verify: [ {extraneous:"all", is:["AC→D L:C"]}, {closure:"C", is:"C"} ],
        recap: "X → A ואז XA → W ⇒ A עודפת",
        explanation: "זו התבנית הקלאסית: יש A → C, ואז C יושבת ליד A בצד שמאל של AC → D. ‏A⁺ = {A, C, D, E} כבר מכיל את D, ולכן **C עודפת**, והתלות היא בעצם A → D. ‏A לא עודפת: ‏C⁺ = {C}. ‏D → E היא תלות עם תכונה יחידה בכל צד. זה המבנה של 21B-A שאלה 19 ושל 25C-A שאלה 18." },

      { id: "N05-Q4", ctx: fd("R = (A, B, C, D, E, G)", "F = {A → BD, C → BE, AC → DG}"),
        question: "האם יש תכונה עודפת ב-AC → DG?",
        options: [
          {id:"a", type:"text", value:"כן, A עודפת"},
          {id:"b", type:"text", value:"כן, C עודפת"},
          {id:"c", type:"text", value:"כן, D עודפת"},
          {id:"d", type:"text", value:"כן, G עודפת"},
          {id:"e", type:"text", value:"לא, אין תכונה עודפת"},
        ], correctId: "c",
        verify: [ {extraneous:"AC→DG", is:["R:D"]}, {closure:"A", is:"ABD"}, {closure:"C", is:"BCE"} ],
        recap: "תמיד בודקים את שני הצדדים",
        explanation: "בצד שמאל: ‏A⁺ = {A, B, D} ו-C⁺ = {B, C, E}, ואף אחת לבד לא גוררת את G. לכן לא A ולא C עודפות. בצד ימין: ‏D מגיעה כבר מ-A → BD, ולכן AC → D נגזרת גם בלי D בתלות הזו, ו-**D עודפת**. ‏G לא עודפת, כי היא מגיעה רק מהתלות הזו. כמו 21S-B שאלה 22: המסיחים מושכים לצד שמאל, והתשובה בצד ימין." },

      { id: "N05-Q5", ctx: fd("R = (A, B, C, D, E)", "F = {A → B, B → C, CD → E}"),
        question: "האם יש ב-F תכונה עודפת?",
        options: [
          {id:"a", type:"text", value:"כן, C עודפת ב-CD → E"},
          {id:"b", type:"text", value:"כן, D עודפת ב-CD → E"},
          {id:"c", type:"text", value:"כן, B עודפת ב-A → B"},
          {id:"d", type:"text", value:"לא, אין תכונה עודפת"},
        ], correctId: "d",
        verify: [ {extraneous:"all", is:[]}, {closure:"C", is:"C"}, {closure:"D", is:"D"} ],
        recap: "\"אין עודפת\" היא תשובה לגיטימית",
        explanation: "‏A → B ו-B → C: תכונה יחידה בכל צד, אין מה להשמיט. ב-CD → E: ‏C⁺ = {C} ו-D⁺ = {D}, ואף אחת לבד לא גוררת E. לכן **אין תכונה עודפת**, כמו ב-25S-B שאלה 18. מחיקת B מ-A → B תמחק את התלות כולה, וזו לא \"תכונה עודפת\"." },

      { id: "N05-Q6", ctx: fd("R = (A, B, C)", "F = {A → B, B → C}"),
        question: "מי מבין הקבוצות הבאות G מקיימת G⁺ = F⁺?",
        options: [
          {id:"a", type:"algebra", value:"G = {A → B, A → C}"},
          {id:"b", type:"algebra", value:"G = {A → BC, B → C}"},
          {id:"c", type:"algebra", value:"G = {A → B, B → C, C → A}"},
          {id:"d", type:"algebra", value:"G = {A → C, B → C}"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "b",
        verify: [ {equiv:"{A → BC, B → C}", is:true}, {equiv:"{A → B, A → C}", is:false}, {equiv:"{A → B, B → C, C → A}", is:false}, {equiv:"{A → C, B → C}", is:false} ],
        recap: "שקילות = שני הכיוונים: F נגזרת מ-G וגם G נגזרת מ-F",
        explanation: "‏{A → BC, B → C}: מ-A → BC מקבלים A → B, ו-B → C קיימת, ולכן F נגזרת מ-G. בכיוון השני, A → BC נגזרת מ-F בטרנזיטיביות. שקולות. ‏{A → B, A → C}: כל התלויות שלה ב-F⁺, אבל B → C לא נגזרת ממנה, ולכן רק כיוון אחד מתקיים. ‏{…, C → A}: מכילה את F, אבל C → A לא ב-F⁺. ‏{A → C, B → C}: ‏A → B לא נגזרת. צריך את **שני** הכיוונים (22B-A שאלה 16)." },

      { id: "N05-Q7", noDiagram: true,
        question: "נתונות קבוצות תלויות F1 ו-F2 מעל R. כדי להוכיח ש-F2 הוא **כיסוי מינימלי** של F1 יש:",
        options: [
          {id:"a", type:"text", value:"לוודא ש-F1⁺ = F2⁺, ובנוסף שב-F1 אין תלויות או תכונות עודפות."},
          {id:"b", type:"text", value:"לוודא ש-F1⁺ = F2⁺ בלבד."},
          {id:"c", type:"text", value:"לוודא ש-F1⁺ = F2⁺, ובנוסף שב-F2 אין תלויות או תכונות עודפות."},
          {id:"d", type:"text", value:"לוודא שכל תלות של F1 מופיעה גם ב-F2."},
          {id:"e", type:"text", value:"לוודא ש-F1⁺ = F2⁺, ובנוסף שגם ב-F1 וגם ב-F2 אין תלויות או תכונות עודפות."},
        ], correctId: "c",
        recap: "כיסוי מינימלי: שקילות + אין עודפות בכיסוי (F2), לא ב-F1",
        explanation: "כיסוי מינימלי צריך שני דברים: (1) הוא **שקול** למקור, ‏F1⁺ = F2⁺, ו-(2) הוא עצמו **מינימלי**, כלומר אין ב-F2 תכונה עודפת או תלות מיותרת. ‏F1 יכול להיות מלא עודפויות, ובשביל זה מחפשים לו כיסוי. לא נדרשת הכלה תחבירית: מספיקה שקילות. זו 24B-A שאלה 19, שבה המסיחים דורשים מינימליות של F1." },

      { id: "N05-Q8", ctx: fd("R = (A, B, C, D, E)", "F = {A → BC, B → C, AB → D, D → E, A → E}"),
        question: "מי מבין הבאים הוא **כיסוי מינימלי** של F?",
        options: [
          {id:"a", type:"algebra", value:"{A → B, B → C, AB → D, D → E}"},
          {id:"b", type:"algebra", value:"{A → B, B → C, A → D, D → E, A → E}"},
          {id:"c", type:"algebra", value:"{A → B, A → D, D → E}"},
          {id:"d", type:"algebra", value:"{A → B, B → C, A → D, D → E}"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "d",
        verify: [ {mincover:"{A → B, B → C, A → D, D → E}", is:true},
                  {mincover:"{A → B, B → C, AB → D, D → E}", is:false}, {equiv:"{A → B, B → C, AB → D, D → E}", is:true},
                  {mincover:"{A → B, B → C, A → D, D → E, A → E}", is:false}, {equiv:"{A → B, B → C, A → D, D → E, A → E}", is:true},
                  {equiv:"{A → B, A → D, D → E}", is:false},
                  {extraneous:"all", is:["A→BC R:C", "AB→D L:B", "A→E R:E"]} ],
        recap: "מצמצמים: תכונות עודפות ← תלויות מיותרות ← בודקים שקילות",
        explanation: "שלבים: (1) ב-A → BC התכונה C עודפת (A → B → C), ולכן A → B. (2) ב-AB → D התכונה B עודפת (A⁺ כבר מכיל את B), ולכן A → D. (3) ‏A → E מיותרת, כי A → D → E. נשאר {A → B, B → C, A → D, D → E}. ‏{opt:a} שקולה ל-F אבל עם B עודפת ב-AB → D. ‏{opt:b} שקולה אבל עם תלות מיותרת A → E. ‏{opt:c} כבר לא שקולה, כי B → C אבדה." },
    ],
  });
})();
