/* Normalization course · level 9 — 🏆 final exam: two exam-sized schemas, every procedure */
(function(){
  const X = ["R = (A, B, C, D, E, G)", "F = {AB → C, C → D, D → E, E → A, B → G}"];
  const Y = ["R = (H, I, J, K, L, M)", "F = {H → IJ, HI → J, JK → L, L → M, M → K}"];
  const ctxX = (D) => ({ kind: "fd", title: "סכמה 1", algebra: X.concat(D ? [D] : []) });
  const ctxY = (D) => ({ kind: "fd", title: "סכמה 2", algebra: Y.concat(D ? [D] : []) });

  NORM_LEVEL({
    id: "N09", order: 9, icon: "🏆", boss: true, title: "מבחן גמר",
    goal: "שתי סכמות בגודל של מבחן ו-12 שאלות בסגנון חלק ד׳: סגור, מפתחות, תכונות עודפות, גזירה, צורות נורמליות, פירוקים, כיסוי מינימלי ומופע חוקי.",
    lesson: {
      html: `
<p>זה הצ'קליסט שעובר על כל שאלה של חלק ד׳ במבחן. שלוש פרוצדורות פותרות כמעט הכול:</p>
<h3>1. סגור X⁺</h3>
<ul>
  <li>מתחילים מ-X <strong>עצמו</strong>, ומוסיפים צד ימין של כל תלות שהשמאל שלה כבר בפנים, עד שאין שינוי.</li>
  <li><code>X→Y</code> נובעת מ-F אם ורק אם <code>Y ⊆ X⁺</code>. לא צריך "להוכיח" עם כללים.</li>
</ul>
<h3>2. מפתחות</h3>
<ul>
  <li>תכונה שלא מופיעה באף צד ימין נמצאת <strong>בכל</strong> מפתח. תכונה שמופיעה רק בצד ימין לא נמצאת <strong>באף</strong> מפתח.</li>
  <li>"מי מהבאים מפתח?" בודקים את האפשרויות: סגור לכל אחת, ואז מינימליות (זורקים תכונה ובודקים שזה נשבר).</li>
  <li><strong>קביל</strong> = מינימלי. <strong>על</strong> = כל מה שמכיל מפתח. קוראים את המילה פעמיים.</li>
</ul>
<h3>3. בדיקת פירוק</h3>
<ul>
  <li>קודם: האיחוד הוא R? אם לא, "זהו אינו פירוק".</li>
  <li>מידע: (R1∩R2)⁺ מכיל את אחד הרכיבים (וליותר משני רכיבים, צעד-צעד).</li>
  <li>תלויות: כל תלות בתוך רכיב, או נגזרת מההיטלים. בודקים בנפרד ממידע.</li>
</ul>
<div class="lesson-rule">🔑 <strong>צורה נורמלית:</strong> מוצאים מפתחות ← מסמנים ראשוניות ← מחפשים תלות שהשמאל שלה אינו מפתח-על. אין כזו? BCNF. יש, והימין ראשוני? 3NF בלבד. יש, והימין לא ראשוני? לא 3NF ולא BCNF.</div>
<div class="lesson-trap">⚠️ <strong>המלכודות שחוזרות:</strong> לשכוח את X בתוך X⁺ (22B-A שאלה 15) · מפתח-על "שמן" מול קביל (23B-A ו-23B-A2, שאלה 18) · לבדוק תכונה עודפת רק בצד שמאל (21S-B שאלה 22) · מינימליות נבדקת על הכיסוי ולא על F המקורי (24B-A שאלה 19) · מופע שמקיים תלות לא מוכיח שהיא ב-F (23B-A שאלה 17).</div>`,
    },
    questions: [
      { id: "N09-Q1", ctx: ctxX(),
        question: "מהו הסגור של התכונה C?",
        options: [
          {id:"a", type:"text", value:"{D, E, A}"},
          {id:"b", type:"text", value:"{C, D, E}"},
          {id:"c", type:"text", value:"{A, C, D, E}"},
          {id:"d", type:"text", value:"R"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "c",
        verify: {closure:"C", is:"ACDE"},
        recap: "X⁺ מתחיל מ-X עצמו",
        explanation: "C⁺ := {C}. C→D מוסיף D. D→E מוסיף E. E→A מוסיף A. עכשיו {A,C,D,E}: AB→C דורש B, ו-B→G דורש B, ו-B אינו בפנים, ולכן עוצרים. C⁺ = {A,C,D,E}. {opt:a} שכחה את C עצמה, הטעות של 22B-A שאלה 15. {opt:b} עצרה מוקדם מדי ופספסה את E→A." },

      { id: "N09-Q2", ctx: ctxX(),
        question: "כמה מפתחות קבילים יש ל-R?",
        options: [
          {id:"a", type:"text", value:"1"},
          {id:"b", type:"text", value:"2"},
          {id:"c", type:"text", value:"3"},
          {id:"d", type:"text", value:"4"},
          {id:"e", type:"text", value:"5"},
        ], correctId: "d",
        verify: {keys:true, is:["AB","BC","BD","BE"]},
        recap: "תכונה שלא בצד ימין נמצאת בכל מפתח, ומשם בודקים מה משלים אותה",
        explanation: "B לא מופיעה באף צד ימין, ולכן היא בכל מפתח. B⁺ = {B,G}, לא מספיק. מוסיפים לה תכונה אחת: AB⁺: AB→C, ואז D, ‏E ו-G, ולכן R. CB⁺: C גורר D, E, A, ואז G, ולכן R. DB⁺: D→E→A, ואז AB→C, ולכן R. EB⁺: E→A, ואז AB→C וכו', ולכן R. GB⁺ = {B,G}, לא מפתח. ארבעה מפתחות קבילים: AB, BC, BD, BE. כל אחת מ-C, D, E מגיעה בשרשרת C→D→E→A עד A, ו-A יחד עם B נותנת את C ואת כל השאר." },

      { id: "N09-Q3", ctx: ctxX(),
        question: "מי מהבאים הוא מפתח **קביל** של R?",
        options: [
          {id:"a", type:"text", value:"{B}"},
          {id:"b", type:"text", value:"{A, B, E}"},
          {id:"c", type:"text", value:"{B, E}"},
          {id:"d", type:"text", value:"{A, G}"},
          {id:"e", type:"text", value:"אף אחד מהם"},
        ], correctId: "c",
        verify: [ {candidate:"BE", is:true}, {candidate:"ABE", is:false}, {superkey:"ABE", is:true}, {superkey:"B", is:false}, {superkey:"AG", is:false} ],
        recap: "קביל = מפתח-על מינימלי",
        explanation: "{B,E}⁺ = R, ושתי תת-הקבוצות B⁺={B,G} ו-E⁺={E,A} אינן R, ולכן BE **קביל**. {A,B,E} הוא מפתח-על, אבל לא מינימלי (גם AB לבדו מפתח). זה המסיח של 24B-A שאלה 20 (BDGIA מול BDGI). {B} לבדה לא מספיקה. {A,G} לא מכיל את B, ולכן נפסל מיד." },

      { id: "N09-Q4", ctx: ctxX(),
        question: "מה נכון לגבי R?",
        options: [
          {id:"a", type:"text", value:"R ב-BCNF, ולכן גם ב-3NF."},
          {id:"b", type:"text", value:"R ב-3NF ולא ב-BCNF."},
          {id:"c", type:"text", value:"R אינו ב-3NF ואינו ב-BCNF."},
          {id:"d", type:"text", value:"R ב-BCNF ולא ב-3NF."},
        ], correctId: "c",
        verify: [ {nf:"R", is:"1NF"}, {keys:true, is:["AB","BC","BD","BE"]}, {superkey:"B", is:false} ],
        recap: "הפרה עם ימין לא-ראשוני ← לא 3NF ולא BCNF",
        explanation: "הראשוניות: A, B, C, D, E (כל אחת באיזשהו מפתח). G **לא ראשונית**. C→D, ‏D→E, ‏E→A: השמאל אינו מפתח-על, אבל הימין ראשוני, ולכן הן לבדן היו משאירות 3NF. **B→G**: B אינו מפתח-על, ו-G לא ראשונית, ולכן 3NF נשברת (וזו גם תלות חלקית, B חלק מהמפתח). המסיח {opt:b} מתאים למי שבדק רק את C→D וחבריה. ו-{opt:d} בלתי אפשרי: BCNF גורר 3NF." },

      { id: "N09-Q5", ctx: ctxX(),
        question: "איזו מהתלויות הבאות נובעת מ-F?",
        options: [
          {id:"a", type:"text", value:"G → B"},
          {id:"b", type:"text", value:"C → B"},
          {id:"c", type:"text", value:"BE → C"},
          {id:"d", type:"text", value:"AD → B"},
          {id:"e", type:"text", value:"יותר מתשובה אחת נכונה"},
        ], correctId: "c",
        verify: [ {implies:"BE → C", is:true}, {implies:"G → B", is:false}, {implies:"C → B", is:false}, {implies:"AD → B", is:false} ],
        recap: "X→Y נובעת אם ורק אם Y ⊆ X⁺, ובודקים את כל האפשרויות",
        explanation: "בודקים סגור לכל אחת. {B,E}⁺: E→A נותן A, ואז AB→C נותן C, ולכן BE→C **נובעת**. G⁺={G}: G לא בצד שמאל של אף תלות. C⁺={A,C,D,E}, בלי B. ‏{A,D}⁺={A,D,E}, בלי B. B לא מופיעה באף צד ימין, ולכן שום תלות שלא מכילה את B משמאל לא יכולה לגרור אותה. רק אחת נובעת, ולכן {opt:e} שגויה (ב-23B-A2 שאלה 17 התשובה הייתה דווקא \"יותר מאחת\", ולכן בודקים את כולן)." },

      { id: "N09-Q6", ctx: ctxX("R1 = (A, B, C),  R2 = (C, D),  R3 = (D, E),  R4 = (E, A),  R5 = (B, G)"),
        question: "זה הפירוק שמתקבל מסינתזה ל-3NF. מה נכון לגביו?",
        options: [
          {id:"a", type:"text", value:"משמר מידע ותלויות, וכל רכיב בו ב-BCNF."},
          {id:"b", type:"text", value:"משמר מידע ותלויות, וכל רכיב בו ב-3NF, אך R1 אינו ב-BCNF."},
          {id:"c", type:"text", value:"משמר מידע, אך לא תלויות."},
          {id:"d", type:"text", value:"משמר תלויות, אך לא מידע."},
          {id:"e", type:"text", value:"זהו אינו פירוק של R על פי הגדרה"},
        ], correctId: "b",
        verify: [ {lossless:["ABC","CD","DE","EA","BG"], is:true}, {preserves:["ABC","CD","DE","EA","BG"], is:true},
                  {nf:"ABC", is:"3NF"}, {nf:"CD", is:"BCNF"}, {nf:"DE", is:"BCNF"}, {nf:"EA", is:"BCNF"}, {nf:"BG", is:"BCNF"} ],
        recap: "סינתזה ל-3NF: מידע ותלויות מובטחים, BCNF לא",
        explanation: "סינתזה תמיד משמרת מידע (R1 מכיל את המפתח AB) ותלויות (כל תלות קיבלה רכיב משלה). אבל ב-R1=(A,B,C) חלות AB→C וגם **C→A** (דרך C→D→E→A). המפתחות של R1 הם AB ו-BC. ב-C→A השמאל אינו מפתח-על של R1, אבל A ראשונית, ולכן R1 ב-3NF ולא ב-BCNF. שאר הרכיבים הם שתי תכונות עם תלות אחת, ולכן ב-BCNF." },

      { id: "N09-Q7", ctx: ctxY(),
        question: "האם יש ב-F תכונה עודפת? אם כן, מהי?",
        options: [
          {id:"a", type:"text", value:"לא, אין תכונה עודפת."},
          {id:"b", type:"text", value:"כן, I עודפת ב-HI → J."},
          {id:"c", type:"text", value:"כן, K עודפת ב-JK → L."},
          {id:"d", type:"text", value:"כן, H עודפת ב-HI → J."},
          {id:"e", type:"text", value:"כן, J עודפת ב-JK → L."},
        ], correctId: "b",
        verify: [ {extraneous:"HI → J", is:["L:I","R:J"]}, {extraneous:"JK → L", is:[]}, {closure:"H", is:"HIJ"}, {closure:"I", is:"I"} ],
        recap: "XA→Y: A עודפת אם X⁺ כבר מכיל את Y",
        explanation: "ב-HI→J: H⁺ = {H,I,J} כבר מכיל את J, ולכן **I עודפת** בצד שמאל. זו התבנית הקבועה: H גורר את I, ואז I מופיע ליד H בשמאל (21B-A שאלה 19). H לא עודפת: I⁺={I}, בלי J. ב-JK→L: J⁺={J} ו-K⁺={K}, ואף אחת לבדה לא גוררת L, ולכן אין שם עודפות. (גם J בצד ימין של H→IJ עודפת, כי HI→J נותנת אותה. אחרי שמסירים את HI→J כולה, זה כבר לא נכון.)" },

      { id: "N09-Q8", ctx: ctxY(),
        question: "איזו מהקבוצות הבאות היא כיסוי מינימלי של F?",
        options: [
          {id:"a", type:"algebra", value:"{H → I, JK → L, L → M, M → K}"},
          {id:"b", type:"algebra", value:"{H → IJ, JK → L, L → MK}"},
          {id:"c", type:"algebra", value:"{H → I, H → J, JK → L, L → M, M → K}"},
          {id:"d", type:"algebra", value:"{HI → J, JK → L, L → M, M → K}"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "c",
        verify: [ {mincover:"{H → I, H → J, JK → L, L → M, M → K}", is:true},
                  {equiv:"{H → I, JK → L, L → M, M → K}", is:false}, {equiv:"{H → IJ, JK → L, L → MK}", is:false},
                  {equiv:"{HI → J, JK → L, L → M, M → K}", is:false} ],
        recap: "כיסוי מינימלי: שקול ל-F, ובו עצמו אין תכונה או תלות עודפת",
        explanation: "HI→J מיותרת כולה, כי H→IJ כבר נותנת את J. מה שנשאר, אחרי פיצול צד ימין לתכונות בודדות כפי שדורשת ההגדרה בקורס, הוא {H→I, H→J, JK→L, L→M, M→K}. הוא שקול ל-F, ואין בו עודפות: אף צד שמאל לא ניתן לקצר, ואף תלות לא נגזרת מהאחרות. {opt:a} איבדה את H→J. ב-{opt:b} L→MK נותנת L→K, אבל לא M→K. ב-{opt:d} אין יותר דרך לגזור את H→I. המינימליות נבדקת על הכיסוי, לא על F (24B-A שאלה 19)." },

      { id: "N09-Q9", ctx: ctxY(),
        question: "מי מהבאים **אינו** מפתח-על של R?",
        options: [
          {id:"a", type:"text", value:"{H, K}"},
          {id:"b", type:"text", value:"{H, L}"},
          {id:"c", type:"text", value:"{H, M}"},
          {id:"d", type:"text", value:"{H, J}"},
          {id:"e", type:"text", value:"אף אחד מהם"},
        ], correctId: "d",
        verify: [ {superkey:"HK", is:true}, {superkey:"HL", is:true}, {superkey:"HM", is:true}, {superkey:"HJ", is:false}, {keys:true, is:["HK","HL","HM"]} ],
        recap: "מחשבים סגור לכל אפשרות",
        explanation: "H חייבת להיות בכל מפתח (לא בצד ימין), אבל H⁺={H,I,J} בלבד. צריך עוד אחת מ-K, L, M (שמסתובבות במעגל L→M→K, ו-JK→L סוגרת אותו): HK⁺: J ו-K נותנים L, ואז M, ולכן R. HL⁺: L→M→K, ולכן R. HM⁺: M→K, ואז JK→L, ולכן R. HJ⁺ = {H,I,J}, ולכן **אינו** מפתח-על." },

      { id: "N09-Q10", ctx: ctxY(),
        question: "איזו מהתלויות הבאות **אינה** נובעת מ-F?",
        options: [
          {id:"a", type:"text", value:"HK → M"},
          {id:"b", type:"text", value:"L → K"},
          {id:"c", type:"text", value:"J → L"},
          {id:"d", type:"text", value:"HM → L"},
          {id:"e", type:"text", value:"כולן נובעות"},
        ], correctId: "c",
        verify: [ {implies:"HK → M", is:true}, {implies:"L → K", is:true}, {implies:"J → L", is:false}, {implies:"HM → L", is:true} ],
        recap: "תכונה בודדת שלא נמצאת לבד בצד שמאל: הסגור שלה הוא רק היא",
        explanation: "J⁺ = {J}: J מופיעה בשמאל רק יחד עם K (JK→L), ולכן לבדה היא לא גוררת כלום, ו-J→L **לא נובעת**. השאר כן: HK⁺ = R, ובו M. L⁺ = {L,M,K}, ובו K (דרך L→M→K, טרנזיטיביות). HM⁺: M→K, ו-H→IJ נותן J, ואז JK→L, ולכן L." },

      { id: "N09-Q11", ctx: ctxY("R1 = (H, I, J),  R2 = (J, K, L),  R3 = (L, M),  R4 = (H, K)"),
        question: "מה נכון לגבי הפירוק?",
        options: [
          {id:"a", type:"text", value:"הפירוק משמר מידע ומשמר תלויות"},
          {id:"b", type:"text", value:"הפירוק משמר מידע, אך לא תלויות"},
          {id:"c", type:"text", value:"הפירוק משמר תלויות, אך לא מידע"},
          {id:"d", type:"text", value:"הפירוק אינו משמר מידע ואינו משמר תלויות"},
          {id:"e", type:"text", value:"זהו אינו פירוק של R על פי הגדרה"},
        ], correctId: "b",
        verify: [ {lossless:["HIJ","JKL","LM","HK"], is:true}, {preserves:["HIJ","JKL","LM","HK"], is:false},
                  {preserves:["HIJ","JKL","LM","HK","MK"], is:true} ],
        recap: "מאחדים צעד-צעד, ובודקים כל תלות בנפרד",
        explanation: "**מידע:** R4=(H,K) ו-R1=(H,I,J): החיתוך H, ו-H⁺ ⊇ R1, ולכן (H,I,J,K). עם R2=(J,K,L): החיתוך {J,K}, ו-{J,K}⁺ ⊇ R2, ולכן (H,I,J,K,L). עם R3=(L,M): החיתוך L, ו-L⁺ ⊇ R3, ולכן R כולו. משמר מידע. **תלויות:** H→IJ ב-R1, JK→L ב-R2, L→M ב-R3. **M→K:** M נמצא רק ב-R3=(L,M), ו-M⁺∩R3 = {M}, ולכן K לא מגיע. M→K **אבדה**. (HI→J עודפת ונגזרת מ-H→IJ, ולכן לא צריך לבדוק אותה בנפרד.)" },

      { id: "N09-Q12",
        ctx: { kind: "fd", title: "שאלה נפרדת: מופע חוקי של S = (P, Q, T)",
          tables: [ { name: "S", columns: ["P", "Q", "T"], rows: [["p1", 10, "x"], ["p1", 20, "x"], ["p2", 10, "y"], ["p3", 30, "x"]] } ] },
        question: "נתון מופע **חוקי** של S, ותהי F קבוצת התלויות מעל S. קבעו האם ייתכן ש: (1) התלות P → T היא תלות ב-F. (2) התלות Q → T היא תלות ב-F.",
        options: [
          {id:"a", type:"text", value:"(1) ייתכן, (2) ייתכן"},
          {id:"b", type:"text", value:"(1) לא ייתכן, (2) ייתכן"},
          {id:"c", type:"text", value:"(1) ייתכן, (2) לא ייתכן"},
          {id:"d", type:"text", value:"(1) לא ייתכן, (2) לא ייתכן"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "c",
        verify: [ {instance:true, holds:"P → T", is:true}, {instance:true, holds:"Q → T", is:false} ],
        recap: "מופע שמפר ← ודאי לא ב-F · מופע שמקיים ← רק \"ייתכן\"",
        explanation: "(1) P→T: שתי השורות עם p1 מסכימות גם ב-T (x ו-x), ושאר ערכי P מופיעים פעם אחת. המופע **מקיים** את התלות, ולכן ייתכן שהיא ב-F. ייתכן ולא ודאי, כי מופע עתידי עלול להפר אותה. (2) Q→T: השורות (p1,10,x) ו-(p2,10,y) מסכימות ב-Q=10 ונבדלות ב-T. המופע **מפר** את התלות, ומאחר שהוא חוקי, היא ודאי **לא** ב-F. אותה לוגיקה כמו 23B-A שאלה 17." },
    ],
  });
})();
