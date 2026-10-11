/* Normalization course · level 2 — Armstrong's axioms and the derived rules; F⁺ */
(function(){
  const fd = (R, F, title) => ({ kind: "fd", title: title || "יחס ותלויות", algebra: [R, F] });

  NORM_LEVEL({
    id: "N02", order: 2, icon: "📐", title: "כללי ארמסטרונג",
    goal: "להכיר את שלושת כללי ההיסק ואת שלושת הנגזרים, ולזהות איזה כלל מוכיח תלות ואיזו \"הוכחה\" לא חוקית.",
    lesson: {
      html: `
<p>מתוך התלויות ב-F אפשר <strong>להסיק</strong> תלויות נוספות. כל התלויות שאפשר להסיק נקראות <strong>F⁺</strong> (הסגור של F). כללי ארמסטרונג נאותים (מסיקים רק דברים נכונים) ושלמים (מסיקים את כל F⁺).</p>
<h3>שלושת הכללים הבסיסיים</h3>
<ul>
  <li><strong>רפלקסיביות</strong>: אם Y ⊆ X אז <code>X → Y</code>. למשל <code>AB → A</code>.</li>
  <li><strong>הרחבה</strong> (augmentation): אם <code>X → Y</code> אז <code>WX → WY</code>. למשל מ-<code>A → B</code>: ‏<code>AC → BC</code>.</li>
  <li><strong>טרנזיטיביות</strong>: אם <code>X → Y</code> ו-<code>Y → Z</code> אז <code>X → Z</code>.</li>
</ul>
<h3>שלושה כללים נגזרים</h3>
<ul>
  <li><strong>איחוד</strong>: <code>X → Y</code> ו-<code>X → Z</code> ולכן <code>X → YZ</code>.</li>
  <li><strong>פירוק</strong>: <code>X → YZ</code> ולכן <code>X → Y</code> וגם <code>X → Z</code>.</li>
  <li><strong>טרנזיטיביות למחצה</strong> (pseudo-transitivity): <code>X → Y</code> ו-<code>WY → Z</code> ולכן <code>XW → Z</code>.</li>
</ul>
<div class="lesson-rule">🔑 <strong>דוגמה להוכחה בשרשרת</strong> (בסגנון 21S-B, שאלה 25): F = {B → CD, D → E}. האם AB → E?<br>
1. ‏<code>AB → B</code> (רפלקסיביות) · 2. ‏<code>B → CD</code> ולכן <code>AB → CD</code> (טרנזיטיביות) · 3. ‏<code>AB → D</code> (פירוק) · 4. ‏<code>D → E</code> ולכן <code>AB → E</code> (טרנזיטיביות).</div>
<div class="lesson-trap">⚠️ <strong>פירוק עובד רק בצד ימין.</strong> מ-<code>X → YZ</code> נובע <code>X → Y</code>, אבל מ-<code>XY → Z</code> <strong>לא</strong> נובע <code>X → Z</code>. דוגמה: (קורס, סמסטר) → מרצה, אבל קורס לבדו לא קובע מרצה. וגם <code>X → Y</code> לא נותן <code>Y → X</code>.</div>
<p>בשלב הבא נלמד דרך מהירה יותר: <code>X → Y ∈ F⁺</code> אם ורק אם <code>Y ⊆ X⁺</code>. במבחן מחשבים סגור, לא כותבים הוכחה.</p>`,
      figs: [],
    },
    questions: [
      { id: "N02-Q1", noDiagram: true,
        question: "מ-A → B ו-B → C הסקנו A → C. באיזה כלל השתמשנו?",
        options: [
          {id:"a", type:"text", value:"רפלקסיביות"},
          {id:"b", type:"text", value:"הרחבה"},
          {id:"c", type:"text", value:"טרנזיטיביות"},
          {id:"d", type:"text", value:"איחוד"},
        ], correctId: "c",
        verify: [ {implies:"A → C", F:"F = {A → B, B → C}", is:true} ],
        recap: "X → Y ו-Y → Z ולכן X → Z: טרנזיטיביות",
        explanation: "**טרנזיטיביות**: אם X → Y ו-Y → Z אז X → Z. כאן X=A, ‏Y=B, ‏Z=C. דוגמה: ת״ז → מחלקה, ומחלקה → מנהל, ולכן ת״ז → מנהל. איחוד מחבר שני צדדים ימניים של **אותו** X, ורפלקסיביות נותנת רק תלויות טריוויאליות." },

      { id: "N02-Q2", noDiagram: true,
        question: "מ-A → B הסקנו AC → BC. באיזה כלל השתמשנו?",
        options: [
          {id:"a", type:"text", value:"הרחבה"},
          {id:"b", type:"text", value:"טרנזיטיביות"},
          {id:"c", type:"text", value:"פירוק"},
          {id:"d", type:"text", value:"רפלקסיביות"},
        ], correctId: "a",
        verify: [ {implies:"AC → BC", F:"F = {A → B}", is:true} ],
        recap: "מוסיפים אותה תכונה לשני הצדדים: הרחבה",
        explanation: "**הרחבה**: אם X → Y אז WX → WY, כלומר מוסיפים את אותה קבוצה W לשני הצדדים. כאן W=C. היגיון: אם A קובע את B, אז הזוג (A, C) קובע את הזוג (B, C), כי C כבר בידינו." },

      { id: "N02-Q3", noDiagram: true,
        question: "מ-A → BC הסקנו A → B. באיזה כלל השתמשנו?",
        options: [
          {id:"a", type:"text", value:"איחוד"},
          {id:"b", type:"text", value:"הרחבה"},
          {id:"c", type:"text", value:"טרנזיטיביות למחצה"},
          {id:"d", type:"text", value:"פירוק"},
        ], correctId: "d",
        verify: [ {implies:"A → B", F:"F = {A → BC}", is:true} ],
        recap: "מפצלים את צד ימין: פירוק",
        explanation: "**פירוק**: אם X → YZ אז X → Y וגם X → Z. אם A קובע את הזוג (B, C), הוא קובע כל אחד מהם בנפרד. הכלל ההפוך, **איחוד**, מחבר: A → B ו-A → C ולכן A → BC." },

      { id: "N02-Q4", ctx: fd("R = (A, B, C, D)", "F = {AB → C}"),
        question: "איזו מהתלויות הבאות נמצאת ב-F⁺?",
        options: [
          {id:"a", type:"algebra", value:"A → C"},
          {id:"b", type:"algebra", value:"B → C"},
          {id:"c", type:"algebra", value:"ABD → C"},
          {id:"d", type:"algebra", value:"C → AB"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "c",
        verify: [ {implies:"ABD → C", is:true}, {implies:"A → C", is:false}, {implies:"B → C", is:false}, {implies:"C → AB", is:false} ],
        recap: "XY → Z לא נותן X → Z · מותר להוסיף תכונות לשמאל",
        explanation: "**ABD → C** נובעת: ABD → AB (רפלקסיביות) ו-AB → C, ולכן ABD → C (טרנזיטיביות). הוספת תכונות לצד שמאל לא מקלקלת תלות. A → C ו-B → C הן המלכודת: פירוק עובד רק **בצד ימין**, ומ-AB → C לא נובע שאחת מהן לבדה מספיקה. C → AB הופכת את הכיוון, והיפוך תלות אינו כלל היסק (וכאן C⁺ = {C}, ולכן היא לא נובעת)." },

      { id: "N02-Q5", ctx: fd("R = (A, B, C, D)", "F = {A → B, BC → D}"),
        question: "איזו מהתלויות הבאות נמצאת ב-F⁺?",
        options: [
          {id:"a", type:"algebra", value:"A → D"},
          {id:"b", type:"algebra", value:"C → D"},
          {id:"c", type:"algebra", value:"B → D"},
          {id:"d", type:"algebra", value:"AC → D"},
        ], correctId: "d",
        verify: [ {implies:"AC → D", is:true}, {implies:"A → D", is:false}, {implies:"C → D", is:false}, {implies:"B → D", is:false} ],
        recap: "X → Y ו-WY → Z ולכן XW → Z: טרנזיטיביות למחצה",
        explanation: "זו **טרנזיטיביות למחצה**: A → B ו-BC → D ולכן AC → D. בהוכחה: A → B, ובהרחבה ב-C ‏AC → BC, ואז בטרנזיטיביות עם BC → D מקבלים AC → D. ל-D צריך **גם** את B **וגם** את C. A נותן רק את B, ו-C לבד לא נותן כלום, ולכן A → D, ‏C → D ו-B → D לא נובעות." },

      { id: "N02-Q6", ctx: fd("R = (A, B, C, D)", "F = {A → B, A → C, C → D}"),
        question: "מי מהבאים נמצא ב-F⁺?",
        options: [
          {id:"a", type:"algebra", value:"B → C"},
          {id:"b", type:"algebra", value:"A → BCD"},
          {id:"c", type:"algebra", value:"BC → A"},
          {id:"d", type:"algebra", value:"D → C"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "b",
        verify: [ {implies:"A → BCD", is:true}, {implies:"B → C", is:false}, {implies:"BC → A", is:false}, {implies:"D → C", is:false} ],
        recap: "איחוד: אותו צד שמאל ← מחברים את הצדדים הימניים",
        explanation: "A → B ו-A → C, ובאיחוד ‏A → BC. מ-A → C ו-C → D בטרנזיטיביות ‏A → D, ובאיחוד נוסף ‏**A → BCD**. B ו-C נקבעים שניהם ע״י A, אבל זה לא אומר שאחד קובע את השני (B → C), ולא שהם יחד קובעים את A (BC → A). ‏D → C הופכת את C → D." },

      { id: "N02-Q7", ctx: fd("R = (A, B, C, D, E)", "F = {C → DE, E → B}"),
        question: "האם התלות AC → B נמצאת בסגור של F? אם כן, באילו כללים אפשר להוכיח אותה?",
        options: [
          {id:"a", type:"text", value:"לא, כי A אינו מופיע באף תלות ב-F."},
          {id:"b", type:"text", value:"כן, ניתן להוכיח בעזרת רפלקסיביות + טרנזיטיביות + פירוק."},
          {id:"c", type:"text", value:"כן, ניתן להוכיח בעזרת איחוד בלבד."},
          {id:"d", type:"text", value:"לא ניתן לדעת."},
        ], correctId: "b",
        verify: [ {implies:"AC → B", is:true}, {implies:"A → B", is:false} ],
        recap: "שרשרת: AC → C (רפלקסיביות), ‏C → DE (טרנזיטיביות), ‏E (פירוק), ‏E → B (טרנזיטיביות)",
        explanation: "1. ‏AC → C (רפלקסיביות). 2. עם C → DE: ‏AC → DE (טרנזיטיביות). 3. ‏AC → E (פירוק). 4. עם E → B: ‏AC → B (טרנזיטיביות). התכונה A פשוט \"נגררת\" בשמאל, ותכונה מיותרת בשמאל לא מבטלת תלות. זה המבנה של 21S-B, שאלה 25 (שם FI → G באותם שלושה כללים)." },

      { id: "N02-Q8", ctx: fd("R = (A, B, C, D)", "F = {A → B, B → C, C → D}"),
        question: "אילו מהתלויות הבאות נמצאות ב-F⁺?",
        options: [
          {id:"a", type:"algebra", value:"A → D"},
          {id:"b", type:"algebra", value:"B → CD"},
          {id:"c", type:"algebra", value:"D → A"},
          {id:"d", type:"text", value:"יותר מתשובה אחת נכונה"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "d",
        verify: [ {implies:"A → D", is:true}, {implies:"B → CD", is:true}, {implies:"D → A", is:false} ],
        recap: "\"אילו נובעות\": לבדוק את כולן, לא לעצור באחת",
        explanation: "‏A → D: ‏A → B → C → D בטרנזיטיביות, נובעת. ‏B → CD: ‏B → C, וגם B → C → D, ובאיחוד ‏B → CD, נובעת. ‏D → A: ‏D לא מופיע באף צד שמאל, ולכן הוא לא קובע שום דבר מלבד עצמו, ולא נובעת. שתיים נכונות, ולכן **יותר מתשובה אחת**. המלכודת היא לעצור אחרי שמצאת את הראשונה (23B-A2, שאלה 17)." },
    ],
  });
})();
