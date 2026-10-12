/* ERD course · level 9 — aggregation (הקבצה / צבירה): a relationship that participates in another relationship */
(function(){
  // A —R1— B inside an aggregation box, R2 connects the box to C
  const agg = (opt) => {
    opt = opt || {};
    const nodes = [
      {id:"G", t:"agg", x:340, y:115, w:500, h:160, label:"A - R1 - B"},
      {id:"A", t:"entity", x:200, y:140, label:"A"},
      {id:"kA", t:"attr", x:200, y:82, label:"KeyA", key:true, of:"A"},
      {id:"R1", t:"rel", x:340, y:140, label:"R1"},
      {id:"B", t:"entity", x:480, y:140, label:"B"},
      {id:"kB", t:"attr", x:480, y:82, label:"KeyB", key:true, of:"B"},
      {id:"R2", t:"rel", x:340, y:265, label:"R2"},
      {id:"C", t:"entity", x:340, y:350, label:"C"},
      {id:"kC", t:"attr", x:215, y:350, label:"KeyC", key:true, of:"C"},
    ];
    if (opt.prop) nodes.push({id:"pR2", t:"attr", x:480, y:265, label:"PropR2_1", of:"R2"});
    return {
      w: 680, h: 390, alt: "הקבצה A-R1-B שמשתתפת בקשר R2 עם C",
      nodes,
      edges: [ {a:"R1", b:"A"}, {a:"R1", b:"B"},
               {a:"R2", b:"G", arrow:!!opt.arrowAgg}, {a:"R2", b:"C", arrow:!!opt.arrowC} ],
    };
  };

  // Hebrew domain: (סטודנט —עובד על— פרויקט) —מפקח→ מנחה, total on the aggregate side
  const supervise = {
    w: 740, h: 420, alt: "סטודנט עובד על פרויקט, ומנחה מפקח על ההקבצה",
    nodes: [
      {id:"G", t:"agg", x:370, y:120, w:640, h:170, label:"סטודנט - עובד על - פרויקט"},
      {id:"S", t:"entity", x:170, y:150, label:"סטודנט"},
      {id:"sid", t:"attr", x:170, y:85, label:"ת\"ז", key:true, of:"S"},
      {id:"R1", t:"rel", x:370, y:150, label:"עובד על"},
      {id:"hrs", t:"attr", x:370, y:75, label:"שעות", of:"R1"},
      {id:"P", t:"entity", x:575, y:150, label:"פרויקט"},
      {id:"pid", t:"attr", x:575, y:80, label:"קוד פרויקט", key:true, of:"P"},
      {id:"R2", t:"rel", x:370, y:290, label:"מפקח"},
      {id:"M", t:"entity", x:370, y:380, label:"מנחה"},
      {id:"mid", t:"attr", x:220, y:380, label:"מס' מנחה", key:true, of:"M"},
      {id:"mn", t:"attr", x:520, y:380, label:"שם", of:"M"},
    ],
    edges: [ {a:"R1", b:"S"}, {a:"R1", b:"P"},
             {a:"R2", b:"G", total:true}, {a:"R2", b:"M", arrow:true} ],
  };

  ERD_LEVEL({
    id: "L09", order: 9, icon: "📦", title: "צבירה (הקבצה)",
    goal: "לקרוא קשר שמשתתף בקשר אחר: מה המפתח של ההקבצה, של הקשר עליה, ומה משנה חץ.",
    lesson: {
      html: `
<p>לפעמים צריך לחבר קשר אל קשר: "מנחה מפקח על <em>העבודה</em> של סטודנט בפרויקט". ב-ERD אסור לחבר מעוין למעוין, ולכן <strong>מקיפים את הקשר והישויות שלו במלבן</strong>. זו <strong>הקבצה (צבירה, aggregation)</strong>, וכל המלבן מתנהג כמו <strong>ישות אחת</strong> שאפשר לחבר לקשר נוסף.</p>
{fig:0}
<div class="lesson-rule">🔑 <strong>שלושה כללי מפתח:</strong><br>
1. <strong>המפתח של ההקבצה</strong> = המפתח של הקשר שבתוכה = סכום מפתחות הישויות שבתוכה. ב-A-R1-B זה {KeyA, KeyB}.<br>
2. <strong>R2 בלי חצים</strong> (N:M עם ההקבצה): המפתח = מפתח C + מפתח ההקבצה = {KeyC, KeyA, KeyB}, כלומר <strong>3 שדות מפתח</strong> (25C-A, שאלה 1).<br>
3. <strong>חץ מ-R2 אל צד X</strong> מוציא את X מהמפתח: חץ אל C ‏←‏ המפתח {KeyA, KeyB}. חץ אל ההקבצה ‏←‏ המפתח {KeyC}.</div>
<p>בהמרה <strong>אין להקבצה טבלה משלה</strong>: A, B ו-R1 הופכים לטבלאות כרגיל, ו<strong>טבלת R1 היא הטבלה של ההקבצה</strong>. לכן קשר עם חץ מההקבצה אל ישות X מתמזג לטבלת R1: מוסיפים לה את המפתח של X כמפתח זר.</p>
<div class="lesson-trap">⚠️ <strong>כיוון החץ (25C-A, שאלה 2):</strong> "אין שתי רשומות ב-R2 עם אותם (KeyA, KeyB)" פירושו שכל מופע של ההקבצה קשור ל-C <strong>אחד</strong> לכל היותר, ולכן החץ הולך <strong>אל C</strong>. חץ אל ההקבצה עונה על שאלה אחרת (כל C קשור לצירוף אחד), ושני חצים זה יותר ממה שנדרש. אותו עיקרון ב-26B-A, שאלה 2: חץ אל A ‏←‏ המפתח של R2 הוא מפתח ההקבצה (שם ההקבצה הייתה B-R1-G, ולכן {KeyG, KeyB}).</div>
{fig:1}`,
      figs: [
        { caption: "ההקבצה A-R1-B משתתפת בקשר R2 כאילו הייתה ישות. R2(KeyC, KeyA, KeyB): שלושה שדות מפתח.", erd: agg() },
        { caption: "חץ מ-R2 אל C: לכל צירוף (A, B) יש לכל היותר C אחד, ולכן המפתח של R2 הוא {KeyA, KeyB}.", erd: agg({arrowC:true}) },
      ],
    },
    questions: [
      { id: "L09-Q1", ctx: { erd: agg() },
        question: "מה מייצג המלבן הגדול שמקיף את A, R1 ו-B?",
        options: [
          {id:"a", type:"text", value:"ישות חלשה ש-A ו-B הם המפתח החלקי שלה."},
          {id:"b", type:"text", value:"היררכיית ISA ש-A ו-B הם תת-הסוגים שלה."},
          {id:"c", type:"text", value:"הקבצה: הקשר R1 עם הישויות שלו מתפקד כישות אחת שמשתתפת בקשר R2."},
          {id:"d", type:"text", value:"טבלה אחת שבה יאוחסנו A, R1 ו-B יחד."},
        ], correctId: "c",
        recap: "מלבן שמקיף קשר = הקבצה (קשר שמשמש כישות)",
        explanation: "מלבן שמקיף קשר וישויות הוא **הקבצה**: הקשר R1 \"נארז\" לישות-על אחת, והיא משתתפת בקשר אחר (R2). ישות חלשה היא מלבן כפול, ו-ISA הוא משולש. בהמרה A, B ו-R1 נשארים טבלאות נפרדות כרגיל, וההקבצה רק אומרת ש-R2 מתייחס למופעי R1." },

      { id: "L09-Q2", ctx: { erd: agg() },
        question: "מה המפתח של קבוצת הישויות-על (ההקבצה) A-R1-B?",
        options: [
          {id:"a", type:"text", value:"{KeyA}"},
          {id:"b", type:"text", value:"{KeyA, KeyB}"},
          {id:"c", type:"text", value:"{KeyA, KeyB, KeyC}"},
          {id:"d", type:"text", value:"להקבצה אין מפתח, כי היא לא ישות אמיתית"},
        ], correctId: "b",
        recap: "מפתח ההקבצה = מפתח הקשר שבתוכה = מפתחות הישויות שבתוכה",
        explanation: "מופע של ההקבצה הוא מופע של R1, כלומר זוג (A, B). R1 הוא N:M (אין חצים), ולכן מפתחו הוא **שני המפתחות** {KeyA, KeyB}, וזה גם מפתח ההקבצה. KeyC שייך ל-C, שנמצא מחוץ להקבצה." },

      { id: "L09-Q3", ctx: { erd: agg() },
        question: "לפי הדיאגרמה, מתקיים כי:",
        options: [
          {id:"a", type:"text", value:"לטבלה של R2 יש 2 שדות המהווים מפתח."},
          {id:"b", type:"text", value:"לטבלה של R2 יש 3 שדות המהווים מפתח."},
          {id:"c", type:"text", value:"אין שתי רשומות שונות בטבלה של R2 עם אותו ערך `KeyA`."},
          {id:"d", type:"text", value:"R2 לא יהפוך לטבלה, כי הוא מחובר להקבצה."},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "b",
        recap: "R2 בלי חצים ‏←‏ מפתח C + מפתח ההקבצה = 3 שדות",
        explanation: "R2 מחבר את C עם ההקבצה, ואין חצים, ולכן הוא N:M. המפתח = מפתח C (שדה 1) + מפתח ההקבצה {KeyA, KeyB} (2 שדות), כלומר **3 שדות מפתח** (25C-A, שאלה 1). KeyA לבדו יכול לחזור: אותו A עם B אחר, או עם C אחר. N:M תמיד הופך לטבלה." },

      { id: "L09-Q4", ctx: { erd: agg({prop:true}) },
        question: "מהי הסכמה הנכונה ביותר של הקשר R2?",
        options: [
          {id:"a", type:"schema", value:"R2([u]KeyC[/u], [u]KeyA[/u], PropR2_1)"},
          {id:"b", type:"schema", value:"R2([u]KeyC[/u], [u]KeyA[/u], [u]KeyB[/u], [u]PropR2_1[/u])"},
          {id:"c", type:"schema", value:"R2([u]KeyC[/u], [u]KeyA[/u], [u]KeyB[/u], PropR2_1)"},
          {id:"d", type:"schema", value:"R2([u]KeyC[/u], [u]R1[/u], PropR2_1)"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "c",
        recap: "טבלת קשר = מפתחות המשתתפים (כולל כל מפתחות ההקבצה) + תכונות הקשר",
        explanation: "המשתתפים ב-R2 הם C וההקבצה, ולכן המפתח הוא KeyC יחד עם **כל** מפתח ההקבצה (KeyA, KeyB). תכונת הקשר PropR2_1 היא עמודה רגילה, לא חלק מהמפתח. \"R1\" הוא שם של קשר ולא עמודה. בטבלה מופיעים המפתחות של R1, כלומר KeyA ו-KeyB." },

      { id: "L09-Q5", ctx: { erd: agg() },
        question: "מה נדרש לשנות בדיאגרמה, כדי שבטבלה של R2 לא יהיו שתי רשומות שונות עם אותם ערכים בשדות `KeyA` ו-`KeyB`?",
        options: [
          {id:"a", type:"text", value:"להוסיף חץ המכוון מ-R2 אל ההקבצה A-R1-B."},
          {id:"b", type:"text", value:"להוסיף חץ המכוון מ-R2 אל `C`."},
          {id:"c", type:"text", value:"להוסיף חץ המכוון מ-R2 אל `C`, וחץ נוסף מ-R2 אל ההקבצה."},
          {id:"d", type:"text", value:"להוסיף חץ המכוון מ-R1 אל `B`."},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "b",
        recap: "צירוף שלא יחזור ‏←‏ חץ מהקשר אל הצד השני",
        explanation: "(KeyA, KeyB) הוא מופע של ההקבצה. כדי שלא יחזור ב-R2, כל מופע הקבצה צריך להיות קשור ל**C אחד לכל היותר**, ולכן מוסיפים **חץ אל C** (25C-A, שאלה 2). חץ אל ההקבצה מגביל את הכיוון ההפוך (כל C קשור לצירוף אחד). שני חצים זה יותר מהנדרש. חץ ב-R1 משנה את R1 ולא את R2." },

      { id: "L09-Q6", ctx: { erd: agg({arrowAgg:true}) },
        question: "בדיאגרמה נוסף חץ מ-R2 אל ההקבצה A-R1-B. מה המפתח הראשי של טבלת R2?",
        options: [
          {id:"a", type:"text", value:"{KeyC}"},
          {id:"b", type:"text", value:"{KeyA, KeyB}"},
          {id:"c", type:"text", value:"{KeyC, KeyA, KeyB}"},
          {id:"d", type:"text", value:"{KeyC, KeyA}"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "a",
        recap: "חץ אל X ‏←‏ X יוצא מהמפתח; נשאר מפתח הצד ה\"רבים\"",
        explanation: "חץ אל ההקבצה אומר שכל C קשור ל**מופע הקבצה אחד** לכל היותר. לכן C לבדו מזהה שורה ב-R2, והמפתח הוא {KeyC}. KeyA ו-KeyB נשארים בטבלה כמפתח זר רגיל. זו המראה של 26B-A, שאלה 2: שם החץ הלך אל A, והמפתח נשאר מפתח ההקבצה (שם היא הייתה B-R1-G, ולכן {KeyG, KeyB}). הערה: מדובר במפתח של R2 כשהוא נשמר כטבלה. בתרגום היעיל ביותר אפשר גם למזג אותו לתוך C." },

      { id: "L09-Q7", ctx: { erd: supervise },
        question: "איזה מההיגדים הבאים נכון?",
        options: [
          {id:"a", type:"text", value:"כל מנחה מפקח על צירוף אחד בלבד של סטודנט ופרויקט."},
          {id:"b", type:"text", value:"כל סטודנט חייב לעבוד על פרויקט אחד לפחות."},
          {id:"c", type:"text", value:"על כל עבודה של סטודנט בפרויקט מפקח מנחה אחד בדיוק."},
          {id:"d", type:"text", value:"כל מנחה חייב לפקח על עבודה אחת לפחות."},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות."},
        ], correctId: "c",
        recap: "קו כפול מצד ההקבצה + חץ אל מנחה = בדיוק מנחה אחד לכל צירוף",
        explanation: "בין ההקבצה ל\"מפקח\" יש **קו כפול**: כל מופע של \"עובד על\" (סטודנט בפרויקט) חייב להשתתף, כלומר לפחות מנחה אחד. יש גם **חץ אל מנחה**: לכל היותר אחד. יחד זה **בדיוק אחד**. בצד המנחה אין קו כפול ואין הגבלה, כך שמנחה יכול לפקח על הרבה צירופים או על אף אחד. גם \"סטודנט ↔ עובד על\" הוא קו רגיל, ולכן סטודנט לא חייב לעבוד על פרויקט." },

      { id: "L09-Q8", ctx: { erd: supervise },
        question: "בתרגום היעיל ביותר, כמה טבלאות נדרשות לכל התרשים?",
        options: [
          {id:"a", type:"text", value:"3: סטודנט, פרויקט, מנחה"},
          {id:"b", type:"text", value:"4: סטודנט, פרויקט, מנחה, עובד_על (שבה מס' מנחה הוא מפתח זר NOT NULL)"},
          {id:"c", type:"text", value:"5: סטודנט, פרויקט, מנחה, עובד_על, מפקח"},
          {id:"d", type:"text", value:"6: טבלה לכל מלבן ומעוין, ועוד טבלה להקבצה"},
        ], correctId: "b",
        recap: "קשר עם חץ ממוזג לצד ה\"רבים\", גם כשהצד הזה הוא הקבצה",
        explanation: "3 ישויות = 3 טבלאות. \"עובד על\" הוא N:M, ולכן הוא טבלה: עובד_על(ת״ז, קוד פרויקט, שעות), וזו גם הטבלה של ההקבצה. \"מפקח\" יש לו **חץ** אל מנחה (לכל צירוף מנחה אחד), ולכן אין לו טבלה: ממזגים את מס' מנחה כמפתח זר לצד ה\"רבים\", שהוא טבלת עובד_על. הקו הכפול (השתתפות מלאה) נאכף ב-**NOT NULL** על מס' מנחה (כמו 26B-A, שאלה 3). סה״כ 4." },
    ],
  });
})();
