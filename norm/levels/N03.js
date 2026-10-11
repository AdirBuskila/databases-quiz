/* Normalization course · level 3 — attribute closure X⁺ and deciding implication with it */
(function(){
  const fd = (R, F, title) => ({ kind: "fd", title: title || "יחס ותלויות", algebra: [R, F] });
  const EXAM = fd("R = (A, B, C, D, E)", "F = {A → B, C → BD, E → B, AB → E}", "יחס ותלויות (הסכמה של 25B-A ו-25C-A)");

  NORM_LEVEL({
    id: "N03", order: 3, icon: "🔁", title: "סגור X⁺",
    goal: "לחשב סגור של קבוצת תכונות צעד-אחר-צעד, ולהשתמש בו כדי להכריע אם תלות נובעת מ-F.",
    lesson: {
      html: `
<p><strong>הסגור X⁺</strong> = כל התכונות ש-X קובע (לפי F). זה הכלי המרכזי של כל הפרק: מפתחות, תכונות עודפות ופירוקים נבדקים כולם בעזרת סגור.</p>
<h3>האלגוריתם</h3>
<ol>
  <li>מתחילים ב-<strong>X⁺ := X</strong> (X תמיד בתוך הסגור של עצמו).</li>
  <li>עוברים על F: לכל Y → Z, אם <strong>Y ⊆ X⁺</strong>, מוסיפים את Z ל-X⁺.</li>
  <li>חוזרים על המעבר עד שסבב שלם לא מוסיף כלום.</li>
</ol>
<h3>דוגמה: R = (A, B, C, D, E), ‏F = {B → C, C → D, AD → E}. מה B⁺?</h3>
<ol>
  <li>‏B⁺ = {B}.</li>
  <li>‏B → C: ‏B בפנים, ולכן מוסיפים C: ‏{B, C}.</li>
  <li>‏C → D: ‏C בפנים, ולכן מוסיפים D: ‏{B, C, D}.</li>
  <li>‏AD → E: צריך גם A, ואין. סבב נוסף לא משנה כלום, ולכן <strong>B⁺ = {B, C, D}</strong>.</li>
</ol>
<div class="lesson-rule">🔑 <strong>X → Y ∈ F⁺ אם ורק אם Y ⊆ X⁺.</strong> לא צריך להוכיח עם כללי ארמסטרונג: מחשבים את הסגור של צד שמאל ובודקים שכל צד ימין בפנים. וקיצור: תכונה שלא מופיעה באף צד <strong>שמאל</strong> קובעת רק את עצמה, ולכן כל תלות שיוצאת ממנה (לתכונה אחרת) לא נובעת (25C-A, שאלה 17).</div>
<div class="lesson-trap">⚠️ <strong>הטעות מספר 1: לשכוח ש-X ⊆ X⁺.</strong> ב-22B-A שאלה 15 הסגור היה {A, C, D, E}, והאפשרות {C, D, E} השמיטה את A, ולכן התשובה הנכונה הייתה "אף אחת". ובשאלות "אילו מהתלויות נובעות?" בודקים את <strong>כולן</strong>: לפעמים "יותר מתשובה אחת" (23B-A2, שאלה 17).</div>`,
      figs: [],
    },
    questions: [
      { id: "N03-Q1", ctx: fd("R = (A, B, C, D)", "F = {A → B, B → C}"),
        question: "מהו הסגור של A?",
        options: [
          {id:"a", type:"algebra", value:"{B, C}"},
          {id:"b", type:"algebra", value:"{A, B}"},
          {id:"c", type:"algebra", value:"{A, B, C}"},
          {id:"d", type:"algebra", value:"{A, B, C, D}"},
        ], correctId: "c",
        verify: [ {closure:"A", is:"ABC"} ],
        recap: "X⁺ מתחיל מ-X עצמו",
        explanation: "‏A⁺ = {A}. ‏A → B מוסיף B: ‏{A, B}. ‏B → C מוסיף C: ‏{A, B, C}. אף תלות לא מכניסה את D, ולכן **A⁺ = {A, B, C}**. ‏{B, C} שוכחת את A עצמו. זו הטעות מספר 1." },

      { id: "N03-Q2", ctx: fd("R = (A, B, C, D)", "F = {A → B, B → C, CD → A}"),
        question: "מהו הסגור של CD?",
        options: [
          {id:"a", type:"algebra", value:"{C, D}"},
          {id:"b", type:"algebra", value:"{A, C, D}"},
          {id:"c", type:"algebra", value:"{A, B, C}"},
          {id:"d", type:"algebra", value:"{A, B, C, D}"},
        ], correctId: "d",
        verify: [ {closure:"CD", is:"ABCD"}, {closure:"C", is:"C"}, {closure:"D", is:"D"} ],
        recap: "חוזרים על המעבר עד שאין שינוי",
        explanation: "‏CD⁺ = {C, D}. ‏CD → A מוסיף A: ‏{A, C, D}. ‏A → B מוסיף B: ‏{A, B, C, D}. ‏B → C לא מוסיף (C כבר בפנים). התוצאה **{A, B, C, D}**, כלומר כל R. ‏{A, C, D} עוצרת אחרי צעד אחד, והאלגוריתם ממשיך עד שסבב שלם לא מוסיף כלום. שימו לב: לבד, C⁺ = {C} ו-D⁺ = {D}. רק ביחד הם מפעילים את CD → A." },

      { id: "N03-Q3", ctx: fd("R = (A, B, C, D, E)", "F = {B → CD, D → E, A → B}"),
        question: "מהו הסגור של התכונה B?",
        options: [
          {id:"a", type:"algebra", value:"{C, D, E}"},
          {id:"b", type:"algebra", value:"{C, D}"},
          {id:"c", type:"algebra", value:"R"},
          {id:"d", type:"algebra", value:"{B, C, D}"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "e",
        verify: [ {closure:"B", is:"BCDE"} ],
        recap: "אם האפשרות שוכחת את X עצמו, היא פסולה (\"אף אחת\" לגיטימית)",
        explanation: "‏B⁺ = {B}, ‏B → CD מוסיף C ו-D: ‏{B, C, D}, ‏D → E מוסיף E: ‏**{B, C, D, E}**. ‏A → B לא עוזר, כי A לא בסגור. אף אחת מהאפשרויות לא שווה ל-{B, C, D, E}: ‏{C, D, E} שוכחת את B, ‏{B, C, D} עוצרת לפני D → E, ו-R כוללת גם את A. לכן **אף אחת מהתשובות**. זו בדיוק המלכודת של 22B-A, שאלה 15." },

      { id: "N03-Q4", ctx: fd("R = (A, B, C, D, E)", "F = {A → C, C → D, BD → E}"),
        question: "מי מבין התלויות הבאות **אינה** נמצאת ב-F⁺?",
        options: [
          {id:"a", type:"algebra", value:"A → D"},
          {id:"b", type:"algebra", value:"AB → E"},
          {id:"c", type:"algebra", value:"C → E"},
          {id:"d", type:"algebra", value:"AB → C"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "c",
        verify: [ {implies:"C → E", is:false}, {implies:"A → D", is:true}, {implies:"AB → E", is:true}, {implies:"AB → C", is:true},
                  {closure:"C", is:"CD"}, {closure:"AB", is:"ABCDE"} ],
        recap: "X → Y נובעת ⇔ Y ⊆ X⁺",
        explanation: "מחשבים סגור לצד שמאל של כל אפשרות. ‏A⁺ = {A, C, D}, ולכן A → D נובעת. ‏AB⁺: ‏{A, B} ← C ← D ← (BD → E) E, כלומר R, ולכן AB → E ו-AB → C נובעות. ‏C⁺ = {C, D}: ל-BD → E צריך גם את B, ואין. לכן **C → E אינה נובעת**." },

      { id: "N03-Q5", ctx: fd("R = (A, B, C, D, E)", "F = {AB → C, C → D, D → E}"),
        question: "איזו מהתלויות הבאות נמצאת ב-F⁺?",
        options: [
          {id:"a", type:"algebra", value:"E → D"},
          {id:"b", type:"algebra", value:"D → C"},
          {id:"c", type:"algebra", value:"C → E"},
          {id:"d", type:"algebra", value:"E → A"},
          {id:"e", type:"text", value:"יותר מתשובה אחת נכונה"},
        ], correctId: "c",
        verify: [ {implies:"C → E", is:true}, {implies:"E → D", is:false}, {implies:"D → C", is:false}, {implies:"E → A", is:false},
                  {closure:"E", is:"E"} ],
        recap: "תכונה שאף פעם לא בצד שמאל: הסגור שלה הוא היא עצמה",
        explanation: "‏C⁺ = {C, D, E}, ולכן **C → E** נובעת. ‏E אף פעם לא מופיע בצד שמאל, ולכן E⁺ = {E}: ‏E → D ו-E → A לא נובעות **בלי לחשב כלום**. ‏D⁺ = {D, E} לא מכיל את C. קיצור הדרך הזה (לסמן תכונות שאף פעם לא בשמאל) פוסל מסיחים מהר מאוד." },

      { id: "N03-Q6", ctx: fd("R = (Q, S, T, U, V, W)", "F = {Q → U, U → V, QS → W, VW → T}"),
        question: "קבעו האם אחת מהתלויות הבאות נובעת מ-F:",
        options: [
          {id:"a", type:"algebra", value:"QS → T"},
          {id:"b", type:"algebra", value:"U → W"},
          {id:"c", type:"algebra", value:"Q → V"},
          {id:"d", type:"text", value:"יותר מתשובה אחת נכונה"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "d",
        verify: [ {implies:"QS → T", is:true}, {implies:"U → W", is:false}, {implies:"Q → V", is:true},
                  {closure:"QS", is:"QSTUVW"}, {closure:"U", is:"UV"} ],
        recap: "בודקים כל אפשרות, ואם שתיים נובעות: \"יותר מאחת\"",
        explanation: "‏QS⁺: ‏{Q, S} ← U ← V ← (QS → W) W ← (VW → T) T, כלומר הכול, ולכן QS → T נובעת. ‏Q⁺ = {Q, U, V}, ולכן Q → V נובעת. ‏U⁺ = {U, V}, ולכן U → W לא נובעת. שתי אפשרויות נכונות, ולכן **יותר מתשובה אחת נכונה**. זה המבנה של 23B-A2, שאלה 17." },

      { id: "N03-Q7", ctx: EXAM,
        question: "מה הסגור (closure) של התכונה A?",
        options: [
          {id:"a", type:"algebra", value:"{A}"},
          {id:"b", type:"algebra", value:"{A, B}"},
          {id:"c", type:"algebra", value:"{A, B, D}"},
          {id:"d", type:"algebra", value:"{A, B, E}"},
          {id:"e", type:"algebra", value:"R"},
        ], correctId: "d",
        verify: [ {closure:"A", is:"ABE"} ],
        recap: "A → B, ואז AB → E (שני שלבים)",
        explanation: "‏A⁺ = {A}. ‏A → B מוסיף B: ‏{A, B}. עכשיו AB ⊆ A⁺, ולכן AB → E מוסיף E: ‏{A, B, E}. ‏E → B לא מוסיף (B בפנים). ‏C → BD לא מופעל, כי C לא בסגור, ולכן D לא נכנס. **A⁺ = {A, B, E}**. זו 25B-A, שאלה 17." },

      { id: "N03-Q8", ctx: EXAM,
        question: "מי מבין התלויות הבאות **אינה** נמצאת ב-F⁺?",
        options: [
          {id:"a", type:"algebra", value:"AC → DE"},
          {id:"b", type:"algebra", value:"A → E"},
          {id:"c", type:"algebra", value:"E → A"},
          {id:"d", type:"algebra", value:"C → B"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "c",
        verify: [ {implies:"E → A", is:false}, {implies:"AC → DE", is:true}, {implies:"A → E", is:true}, {implies:"C → B", is:true},
                  {closure:"E", is:"BE"}, {closure:"AC", is:"ABCDE"} ],
        recap: "בודקים כל אפשרות דרך הסגור של צד שמאל",
        explanation: "‏E⁺ = {E, B}, ולא מכיל את A, ולכן **E → A אינה ב-F⁺**. השאר נובעות: ‏AC⁺ = {A, C, B, D, E} = R (ולכן AC → DE), ‏A⁺ = {A, B, E} (ולכן A → E), ‏C⁺ = {C, B, D} (ולכן C → B). באותה סכמה, 25C-A שאלה 17 שאלה על B → E: ‏B אף פעם לא בצד שמאל, ולכן B⁺ = {B}, והתלות לא נובעת." },
    ],
  });
})();
