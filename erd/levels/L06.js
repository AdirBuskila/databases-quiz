/* ERD course · level 6 — weak entities: partial key + owner key, identifying relationship */
(function(){
  // בניין ⟸ נמצא ב ⟸ חדר (weak) — reused in Q1/Q2
  const rooms = {
    w: 640, h: 210, alt: "בניין, קשר מזהה נמצא ב, ישות חלשה חדר",
    nodes: [
      {id:"BL", t:"entity", x:130, y:105, label:"בניין"},
      {id:"bid", t:"attr", x:70, y:35, label:"מס' בניין", key:true, of:"BL"},
      {id:"ad", t:"attr", x:130, y:180, label:"כתובת", of:"BL"},
      {id:"R", t:"rel", x:320, y:105, label:"נמצא ב", ident:true},
      {id:"RM", t:"entity", x:510, y:105, label:"חדר", weak:true},
      {id:"rn", t:"attr", x:570, y:35, label:"מס' חדר", partial:true, of:"RM"},
      {id:"sz", t:"attr", x:510, y:180, label:"גודל", of:"RM"},
    ],
    edges: [ {a:"R", b:"BL", arrow:true}, {a:"R", b:"RM", total:true} ],
  };
  // מלון ⟸ חדר (weak), אורח מתארח ב חדר (N:M) — reused in Q5/Q6
  const hotel = {
    w: 740, h: 250, alt: "מלון, חדר חלש, אורח מתארח ב חדר",
    nodes: [
      {id:"H", t:"entity", x:110, y:130, label:"מלון"},
      {id:"hid", t:"attr", x:70, y:45, label:"מס' מלון", key:true, of:"H"},
      {id:"hn", t:"attr", x:110, y:215, label:"שם מלון", of:"H"},
      {id:"R", t:"rel", x:270, y:130, label:"שייך ל", ident:true},
      {id:"RM", t:"entity", x:430, y:130, label:"חדר", weak:true},
      {id:"rn", t:"attr", x:430, y:45, label:"מס' חדר", partial:true, of:"RM"},
      {id:"bd", t:"attr", x:430, y:215, label:"מס' מיטות", of:"RM"},
      {id:"ST", t:"rel", x:580, y:130, label:"מתארח ב"},
      {id:"rt", t:"attr", x:580, y:215, label:"דירוג", of:"ST"},
      {id:"G", t:"entity", x:690, y:60, label:"אורח"},
      {id:"gid", t:"attr", x:690, y:200, label:"ת\"ז", key:true, of:"G", w:70},
    ],
    edges: [ {a:"R", b:"H", arrow:true}, {a:"R", b:"RM", total:true}, {a:"ST", b:"RM"}, {a:"ST", b:"G"} ],
  };

  ERD_LEVEL({
    id: "L06", order: 6, icon: "🪢", title: "ישות חלשה",
    goal: "לזהות ישות חלשה וקשר מזהה, ולבנות את המפתח שלה: מפתח חלקי + מפתח הבעלים.",
    lesson: {
      html: `
<p><strong>ישות חלשה</strong> היא ישות שאין לה מפתח משלה. היא מזוהה רק <strong>יחד עם הישות שהיא שייכת לה</strong> (ה"בעלים", הישות השולטת). דוגמה: "חדר 12" לא מזהה חדר. בכל בניין יש חדר 12. רק "חדר 12 בבניין 3" מזהה.</p>
<ul>
  <li><strong>מלבן כפול</strong> = ישות חלשה.</li>
  <li><strong>מעוין כפול</strong> = <strong>קשר מזהה</strong>, שמחבר את החלשה לבעלים שלה (חץ אל הבעלים, קו כפול מצד החלשה).</li>
  <li><strong>קו תחתון מקווקו</strong> = <strong>מפתח חלקי</strong> (discriminator), ייחודי רק בתוך אותו בעלים.</li>
</ul>
{fig:0}
<div class="lesson-rule">🔑 <strong>מפתח ישות חלשה = מפתח חלקי + מפתח הבעלים.</strong> חדר(<u>מס' בניין</u>, <u>מס' חדר</u>, גודל). הקשר המזהה <strong>לא</strong> הופך לטבלה: מפתח הבעלים כבר נכנס לטבלת החלשה (25C-A, שאלה 4; 24B-A, שאלה 2).</div>
<div class="lesson-trap">⚠️ <strong>כל ישות חלשה היא נשלטת, אבל לא כל ישות נשלטת היא חלשה</strong> (24B-A, שאלה 5). <br>⚠️ <strong>קשר מזהה מול קשר 1:N רגיל</strong> (26B-A, שאלה 4): בשניהם מפתח זר נכנס לטבלה. בקשר מזהה הוא נהיה <strong>חלק מהמפתח הראשי</strong>, ובקשר רגיל הוא <strong>שדה רגיל</strong> מחוץ למפתח.<br>⚠️ <strong>תלות קיום:</strong> מוחקים בניין? החדרים שלו נמחקים איתו.</div>
{fig:1}`,
      figs: [
        { caption: "חדר הוא ישות חלשה. המפתח: (מס' בניין, מס' חדר).", erd: rooms },
        { caption: "שרשרת: רחוב חלש של עיר, ועיר חלשה של מדינה. מפתח רחוב = (קוד מדינה, שם עיר, שם רחוב).", erd: {
          w: 700, h: 170, nodes: [
            {id:"C", t:"entity", x:90, y:95, label:"מדינה"},
            {id:"cid", t:"attr", x:90, y:28, label:"קוד מדינה", key:true, of:"C"},
            {id:"R1", t:"rel", x:225, y:95, label:"עיר ב", ident:true},
            {id:"T", t:"entity", x:360, y:95, label:"עיר", weak:true},
            {id:"tn", t:"attr", x:360, y:28, label:"שם עיר", partial:true, of:"T"},
            {id:"R2", t:"rel", x:495, y:95, label:"רחוב ב", ident:true},
            {id:"S", t:"entity", x:630, y:95, label:"רחוב", weak:true},
            {id:"sn", t:"attr", x:630, y:28, label:"שם רחוב", partial:true, of:"S"},
          ], edges: [ {a:"R1", b:"C", arrow:true}, {a:"R1", b:"T", total:true}, {a:"R2", b:"T", arrow:true}, {a:"R2", b:"S", total:true} ] } },
      ],
    },
    questions: [
      { id: "L06-Q1", ctx: { erd: rooms },
        question: "מה יהיה המפתח הראשי של טבלת \"חדר\"?",
        options: [
          {id:"a", type:"text", value:"{מס' חדר}"},
          {id:"b", type:"text", value:"{מס' בניין}"},
          {id:"c", type:"text", value:"{מס' חדר, גודל}"},
          {id:"d", type:"text", value:"{מס' בניין, מס' חדר}"},
        ], correctId: "d",
        recap: "מפתח חלשה = מפתח חלקי + מפתח הבעלים",
        explanation: "\"חדר\" היא ישות חלשה (מלבן כפול), ו\"מס' חדר\" הוא רק **מפתח חלקי** (קו מקווקו): בכל בניין יש חדר 1. המפתח המלא הוא **המפתח החלקי ומפתח הבעלים** יחד: {מס' בניין, מס' חדר}. \"מס' חדר\" לבד יוצר כפילויות בין בניינים. \"גודל\" הוא סתם תכונה, לא מזהה." },

      { id: "L06-Q2", ctx: { erd: rooms },
        question: "האם הקשר המזהה \"נמצא ב\" יהפוך לטבלה נפרדת?",
        options: [
          {id:"a", type:"text", value:"כן, כל מעוין כפול הופך לטבלה עם המפתחות של שתי הישויות"},
          {id:"b", type:"text", value:"לא, מפתח הבעלים (מס' בניין) כבר נכנס לטבלת חדר כחלק מהמפתח שלה"},
          {id:"c", type:"text", value:"כן, כי יש קו כפול מצד החדר"},
          {id:"d", type:"text", value:"לא, ו\"מס' חדר\" נכנס לטבלת בניין כמפתח זר"},
        ], correctId: "b",
        recap: "קשר מזהה ⇐ אין טבלה",
        explanation: "קשר מזהה הוא תמיד \"הרבה חדרים ← בניין אחד\" (חץ אל הבעלים), ולכן הוא לא מקבל טבלה. המפתח של הבעלים נכנס לטבלה של הישות החלשה, ושם הוא חלק מהמפתח הראשי: חדר(מס' בניין, מס' חדר, גודל). הקו הכפול מסמן רק השתתפות מלאה (לכל חדר יש בניין) ולא יוצר טבלה. לבניין יש הרבה חדרים, ולכן מס' חדר לא נכנס לטבלת בניין." },

      { id: "L06-Q3", ctx: { erd: {
          w: 640, h: 200, alt: "C, קשר מזהה R, ישות חלשה E",
          nodes: [
            {id:"C", t:"entity", x:130, y:100, label:"C"},
            {id:"kC", t:"attr", x:60, y:35, label:"KeyC", key:true, of:"C"},
            {id:"pC", t:"attr", x:60, y:165, label:"PropC_1", of:"C"},
            {id:"R", t:"rel", x:320, y:100, label:"R", ident:true},
            {id:"E", t:"entity", x:500, y:100, label:"E", weak:true},
            {id:"dE", t:"attr", x:575, y:35, label:"DiscE_1", partial:true, of:"E"},
            {id:"pE", t:"attr", x:575, y:165, label:"PropE_1", of:"E"},
          ], edges: [ {a:"R", b:"C", arrow:true}, {a:"R", b:"E", total:true} ] } },
        question: "המר את קבוצת/טיפוס ישויות E לטבלה. מה יתקבל?",
        options: [
          {id:"a", type:"schema", value:"E ([d]DiscE_1[/d], PropE_1)"},
          {id:"b", type:"schema", value:"E ([d]DiscE_1[/d], PropE_1, [u]KeyC[/u])"},
          {id:"c", type:"schema", value:"E ([d]DiscE_1[/d], PropE_1, [u]KeyC[/u], PropC_1)"},
          {id:"d", type:"schema", value:"E ([u]DiscE_1[/u], PropE_1, KeyC)"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        recap: "חלשה ⇐ מבחין + תכונות עצמיות + מפתח הבעלים",
        explanation: "E חלשה, ולכן הטבלה שלה מכילה את **המבחין** `DiscE_1`, את **התכונה העצמית** `PropE_1` ואת **מפתח הבעלים** `KeyC`, שהוא חלק מהמפתח הראשי. בלי KeyC, E לא מזוהה. `PropC_1` שייך לטבלת C, לא ל-E. אם KeyC הוא מפתח זר רגיל מחוץ למפתח, DiscE_1 לבד לא ייחודי. זו שאלה 4 של 25C-A." },

      { id: "L06-Q4", noDiagram: true,
        question: "שאלה בנושא אפיון ERD: איזו טענה מבין הבאות היא נכונה?",
        options: [
          {id:"a", type:"text", value:"כל טיפוס ישויות נשלט הוא חלש"},
          {id:"b", type:"text", value:"טיפוס ישויות יכול להיות גם חזק וגם חלש בו זמנית"},
          {id:"c", type:"text", value:"כל טיפוס ישויות חלש הוא נשלט"},
          {id:"d", type:"text", value:"טיפוס ישויות לא יכול להיות חלש ונשלט בו זמנית"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "c",
        recap: "חלש ⇐ נשלט (לא להפך)",
        explanation: "לישות חלשה אין מפתח משלה, ולכן היא **חייבת** להישען על ישות שולטת, כלומר כל חלשה היא נשלטת. הכיוון ההפוך לא נכון: ישות חזקה יכולה להיות תלויה (נשלטת) בישות אחרת, ועדיין יש לה מפתח משלה. ישות לא יכולה להיות גם חזקה וגם חלשה. זו שאלה 5 של 24B-A." },

      { id: "L06-Q5", ctx: { erd: hotel },
        question: "מה קורה לחדרים של מלון כאשר המלון נמחק מבסיס הנתונים?",
        options: [
          {id:"a", type:"text", value:"החדרים נשארים, ו\"מס' מלון\" שלהם מתעדכן ל-NULL"},
          {id:"b", type:"text", value:"החדרים נמחקים גם הם: לישות חלשה יש תלות קיום בבעלים שלה"},
          {id:"c", type:"text", value:"החדרים עוברים אוטומטית למלון אחר"},
          {id:"d", type:"text", value:"אי אפשר למחוק מלון שיש לו אורחים"},
        ], correctId: "b",
        recap: "תלות קיום: מוחקים בעלים ⇐ נמחקות החלשות",
        explanation: "\"חדר\" היא ישות חלשה של \"מלון\". מס' המלון הוא **חלק מהמפתח** של החדר, ומפתח ראשי לא יכול להיות NULL (שלמות ישות). חדר בלי מלון לא מזוהה בכלל. זו **תלות קיום**: מחיקת הישות השולטת מוחקת את הישויות החלשות שתלויות בה." },

      { id: "L06-Q6", ctx: { erd: hotel },
        question: "מה יהיה המפתח הראשי של טבלת הקשר \"מתארח ב\"?",
        options: [
          {id:"a", type:"text", value:"{ת\"ז, מס' חדר}"},
          {id:"b", type:"text", value:"{ת\"ז, מס' מלון}"},
          {id:"c", type:"text", value:"{ת\"ז, מס' מלון, מס' חדר, דירוג}"},
          {id:"d", type:"text", value:"{ת\"ז, מס' מלון, מס' חדר}"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        recap: "משתתף חלש תורם את כל המפתח שלו",
        explanation: "\"מתארח ב\" הוא N:M (אין חצים), ולכן הוא טבלה שהמפתח שלה הוא **המפתחות של כל המשתתפים**. אורח תורם ת״ז. חדר הוא ישות חלשה, והמפתח **המלא** שלו הוא {מס' מלון, מס' חדר}, ולכן הוא תורם שני שדות. סך הכול 3 שדות מפתח. \"דירוג\" הוא תכונה של הקשר ולא חלק מהמפתח. כמו ב-25C-A (שאלה 1), סופרים את שדות המפתח של כל משתתף." },

      { id: "L06-Q7", ctx: { erd: {
          w: 720, h: 260, alt: "חברה, עובד ב, עובד, קשר מזהה הורה של, ילד",
          nodes: [
            {id:"F", t:"entity", x:110, y:80, label:"חברה"},
            {id:"fid", t:"attr", x:110, y:20, label:"ח\"פ", key:true, of:"F"},
            {id:"R3", t:"rel", x:290, y:80, label:"עובד ב"},
            {id:"E", t:"entity", x:470, y:80, label:"עובד"},
            {id:"eid", t:"attr", x:470, y:20, label:"ת\"ז", key:true, of:"E"},
            {id:"en", t:"attr", x:620, y:80, label:"שם", of:"E"},
            {id:"R4", t:"rel", x:470, y:165, label:"הורה של", ident:true},
            {id:"K", t:"entity", x:470, y:235, label:"ילד", weak:true},
            {id:"kn", t:"attr", x:310, y:235, label:"שם ילד", partial:true, of:"K"},
            {id:"kb", t:"attr", x:630, y:235, label:"תאריך לידה", of:"K"},
          ], edges: [ {a:"R3", b:"F", arrow:true}, {a:"R3", b:"E", total:true}, {a:"R4", b:"E", arrow:true}, {a:"R4", b:"K", total:true} ] } },
        question: "\"הורה של\" הוא קשר מזהה ו\"עובד ב\" הוא קשר אחד-לרבים רגיל, ושניהם ממוזגים. מה ההבדל המהותי בתרגומם?",
        options: [
          {id:"a", type:"text", value:"בשני המקרים המפתח הזר הופך לחלק מהמפתח הראשי"},
          {id:"b", type:"text", value:"ב\"הורה של\" ת\"ז העובד הופך לחלק מהמפתח הראשי של ילד, ואילו ב\"עובד ב\" ח\"פ נשאר שדה רגיל (מפתח זר) מחוץ למפתח הראשי של עובד"},
          {id:"c", type:"text", value:"\"הורה של\" דורש טבלה נפרדת ו\"עובד ב\" ממוזג"},
          {id:"d", type:"text", value:"\"עובד ב\" דורש טבלה נפרדת ו\"הורה של\" ממוזג"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        recap: "קשר מזהה: המפתח הזר נכנס למפתח הראשי",
        explanation: "שני הקשרים ממוזגים, ואף אחד מהם לא מקבל טבלה. ההבדל הוא **איפה המפתח הזר יושב**. ילד(ת״ז, שם ילד, תאריך לידה): ת״ז העובד הוא חלק מהמפתח, כי בלעדיו הילד לא מזוהה. עובד(ת״ז, שם, ח״פ): ח״פ הוא מפתח זר רגיל (NOT NULL בגלל הקו הכפול), והמפתח של עובד נשאר ת״ז בלבד. זו שאלה 4 של 26B-A." },

      { id: "L06-Q8", ctx: { erd: {
          w: 720, h: 230, alt: "מדינה, עיר חלשה, רחוב חלש",
          nodes: [
            {id:"C", t:"entity", x:90, y:110, label:"מדינה"},
            {id:"cid", t:"attr", x:90, y:35, label:"קוד מדינה", key:true, of:"C"},
            {id:"cn", t:"attr", x:90, y:190, label:"שם מדינה", of:"C"},
            {id:"R1", t:"rel", x:230, y:110, label:"עיר ב", ident:true},
            {id:"T", t:"entity", x:370, y:110, label:"עיר", weak:true},
            {id:"tn", t:"attr", x:370, y:35, label:"שם עיר", partial:true, of:"T"},
            {id:"tp", t:"attr", x:370, y:190, label:"אוכלוסייה", of:"T"},
            {id:"R2", t:"rel", x:510, y:110, label:"רחוב ב", ident:true},
            {id:"S", t:"entity", x:645, y:110, label:"רחוב", weak:true},
            {id:"sn", t:"attr", x:645, y:35, label:"שם רחוב", partial:true, of:"S"},
            {id:"sl", t:"attr", x:645, y:190, label:"אורך", of:"S"},
          ], edges: [ {a:"R1", b:"C", arrow:true}, {a:"R1", b:"T", total:true}, {a:"R2", b:"T", arrow:true}, {a:"R2", b:"S", total:true} ] } },
        question: "\"עיר\" חלשה של \"מדינה\", ו\"רחוב\" חלשה של \"עיר\". מהו המפתח הראשי של טבלת \"רחוב\"?",
        options: [
          {id:"a", type:"text", value:"{שם רחוב}"},
          {id:"b", type:"text", value:"{שם רחוב, שם עיר}"},
          {id:"c", type:"text", value:"{שם רחוב, קוד מדינה}"},
          {id:"d", type:"text", value:"{שם רחוב, שם עיר, קוד מדינה}"},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "d",
        recap: "שרשרת חלשות: אוספים את כל המפתחות למעלה",
        explanation: "מפתח רחוב = המפתח החלקי שלו + **המפתח המלא של הבעלים** (עיר). אבל עיר עצמה חלשה, והמפתח המלא שלה הוא {שם עיר, קוד מדינה}. לכן: {שם רחוב, שם עיר, קוד מדינה}. עם {שם רחוב, שם עיר} בלבד אי אפשר להבחין בין \"הרצל, רמת גן\" בישראל לבין עיר עם אותו שם במדינה אחרת." },
    ],
  });
})();
