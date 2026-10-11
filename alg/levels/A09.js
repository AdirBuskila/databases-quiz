/* Algebra course · level 9 — 🏆 final: one exam-sized schema (music school), every pattern mixed */
(function(){
  const STUDENT = { name: "Student", pk: ["sid"], columns: ["sid", "name", "city", "age"],
    rows: [[1, "Dana", "Haifa", 16], [2, "Adi", "Tel Aviv", 14], [3, "Ido", "Haifa", 17], [4, "Noa", "Eilat", 14], [5, "Gal", "Tel Aviv", 19], [6, "Maya", "Haifa", 15]] };
  const TEACHER = { name: "Teacher", pk: ["tid"], columns: ["tid", "t_name", "city", "instrument"],
    rows: [[10, "Levi", "Haifa", "piano"], [11, "Cohen", "Tel Aviv", "guitar"], [12, "Mizrahi", "Haifa", "violin"], [13, "Peretz", "Eilat", "piano"]] };
  const LESSON = { name: "Lesson", pk: ["sid", "tid", "instrument"], columns: ["sid", "tid", "instrument", "is_online"],
    rows: [[1, 10, "piano", false], [1, 12, "violin", true], [2, 11, "guitar", true], [2, 10, "piano", false], [3, 10, "piano", true],
           [3, 12, "piano", false], [4, 13, "piano", false], [5, 10, "guitar", true], [6, 12, "violin", false], [6, 12, "piano", true]] };
  const CONCERT = { name: "Concert", pk: ["cid"], columns: ["cid", "c_name", "city", "year"],
    rows: [[100, "Spring Gala", "Haifa", 2024], [101, "Jazz Night", "Tel Aviv", 2024], [102, "Winter Show", "Haifa", 2023]] };
  const PLAYS = { name: "Plays", pk: ["performer_id", "cid"], columns: ["performer_id", "cid"],
    rows: [[1, 100], [1, 101], [1, 102], [3, 100], [3, 102], [2, 101], [5, 101], [6, 100], [6, 101], [6, 102]] };

  const schema = { title: "בית ספר למוזיקה", relations: [
    { schema: "Student([u]sid[/u], name, city, age)", meaning: "תלמיד: מזהה, שם, עיר וגיל" },
    { schema: "Teacher([u]tid[/u], t_name, city, instrument)", meaning: "מורה: מזהה, שם, עיר והכלי שהוא מלמד" },
    { schema: "Lesson([u]sid[/u], [u]tid[/u], [u]instrument[/u], is_online)", meaning: "התלמיד sid לומד אצל המורה tid את הכלי instrument, אונליין (True) או פרונטלית (False)" },
    { schema: "Concert([u]cid[/u], c_name, city, year)", meaning: "קונצרט: מזהה, שם, עיר ושנה" },
    { schema: "Plays([u]performer_id[/u], [u]cid[/u])", meaning: "התלמיד שמזהה שלו performer_id (זה ה-sid) הופיע בקונצרט cid" },
  ] };

  ALG_LEVEL({
    id: "A09", order: 9, icon: "🏆", title: "מבחן גמר", boss: true,
    goal: "שאלות ברמת מבחן על סכמה אחת גדולה: צירוף מול מכפלה, חיתוך, הפרש, קיצון, חילוק, צירוף עצמי, תקינות וספירת שורות.",
    db: [STUDENT, TEACHER, LESSON, CONCERT, PLAYS],
    lesson: {
      html: `
<p>זה מבחן הגמר של הקורס: 12 שאלות על סכמה אחת, כמו חלק ג׳ במבחן. לפני כל שאלה, עבור על הרשימה:</p>
<ol>
  <li><strong>סמן את העמודות של כל יחס</strong> על דף הסכמות, ובמיוחד שמות משותפים. כאן <code>city</code> נמצא ב-Student, ב-Teacher וב-Concert. <code>instrument</code> נמצא ב-Teacher וב-Lesson. ב-Plays התלמיד נקרא <code>performer_id</code>, לא <code>sid</code>.</li>
  <li><strong>תקינות לפני משמעות:</strong> כל עמודה ב-Π וב-σ קיימת ביחס שממנו קוראים? ∪ / ∩ / − בין יחסים תואמים? אם לא, "אף תשובה".</li>
  <li><strong>⊗ מזווג לפי כל השמות המשותפים.</strong> ספור אותם. אין אף שם משותף = מכפלה קרטזית.</li>
  <li><strong>× של n טבלאות = n−1 תנאי חיבור ב-σ.</strong> ספור רק שוויונות בין מפתחות; תנאים כמו city = "Haifa" הם סינון.</li>
  <li><strong>זהה את התבנית מהניסוח:</strong> "לכל" = ÷ · "גם וגם" = ∩ · "מעולם לא / רק" = − (בסדר הנכון) · "הכי" = Π − Πσ(ρ×ρ), מי שמוקרן מפסיד · "יותר מפעם" = ρ+× עם = ו-≠.</li>
  <li><strong>חילוק:</strong> המחולק זוג (מי, מה); המחלק מוכל בו בשם (אחרת ρ); התוצאה = מחולק פחות מחלק.</li>
  <li><strong>ספירת שורות:</strong> Π מוריד כפילויות, ⊗ מכפיל רק התאמות, ואת σ מפעילים בסוף.</li>
  <li><strong>גבולות:</strong> אין COUNT / SUM / AVG. קיצון ו"יותר מאחד" כן אפשר.</li>
</ol>
<div class="lesson-rule">🔑 עבר את השלב הזה? הבא בתור: שאלות האלגברה מהמבחנים האמיתיים.</div>`,
    },
    questions: [
      { id: "A09-Q1", ctx: schema,
        question: "איזה ביטוי מחזיר את שמות התלמידים שלמדו שיעור **אונליין** אצל מורה **שגר באותה עיר** כמותם?",
        options: [
          {id:"a", type:"algebra", value:'Π_{name} σ_{Student.city = Teacher.city ∧ is_online = True} (Student × Lesson × Teacher)'},
          {id:"b", type:"algebra", value:'Π_{name} σ_{Student.city = Teacher.city ∧ is_online = True ∧ Student.sid = Lesson.sid ∧ Lesson.tid = Teacher.tid} (Student × Lesson × Teacher)'},
          {id:"c", type:"algebra", value:'Π_{name} σ_{Student.city = Teacher.city ∧ is_online = True ∧ Student.sid = Lesson.sid} (Student × Lesson × Teacher)'},
          {id:"d", type:"algebra", value:'Π_{name} σ_{is_online = True} (Student ⊗ Lesson ⊗ Teacher)'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "b",
        verify: { ref: 'Π_{name} σ_{Student.city = Teacher.city ∧ is_online = True ∧ Student.sid = Lesson.sid ∧ Lesson.tid = Teacher.tid} (Student × Lesson × Teacher)', same: ["b"], differ: ["a", "c", "d"] },
        recap: "× של 3 טבלאות = 2 תנאי חיבור · ⊗ מזווג גם city ו-instrument",
        explanation: "שלוש טבלאות ב-×, ולכן צריך **שני** תנאי חיבור: `Student.sid = Lesson.sid` ו-`Lesson.tid = Teacher.tid`. רק ב-{opt:b} יש את שניהם. התנאי על העיר הוא תנאי של השאלה, לא חיבור. ב-{opt:a} אין אף תנאי חיבור, וב-{opt:c} חסר החיבור למורה, ולכן Gal נכנסת דרך מורה מתל אביב שלא לימד אותה. {opt:d} נראה קצר ונכון, אבל ⊗ בין Lesson ל-Teacher מזווג גם לפי `instrument`, ולכן הוא מפיל את Maya, שלמדה פסנתר אצל מורה לכינור (25C-A שאלה 14, 25S-B שאלה 14)." },

      { id: "A09-Q2", ctx: schema,
        question: "מה עושה השאילתה הבאה? בחרו את התשובה הנכונה ביותר.\n$$Π_{sid} (Lesson ⊗ Teacher)$$",
        options: [
          {id:"a", type:"text", value:"מחזירה את מזהי כל התלמידים שלמדו שיעור כלשהו."},
          {id:"b", type:"text", value:"מחזירה את מזהי התלמידים שלמדו אצל מורה כלשהו בכלי שהמורה הזה מלמד."},
          {id:"c", type:"text", value:"מחזירה את מזהי התלמידים שלמדו אצל מורה מהעיר שלהם."},
          {id:"d", type:"text", value:"השאילתה אינה תקינה, כי ל-Lesson ול-Teacher אין מפתח משותף."},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "b",
        verify: [ { expr: 'Π_{sid} (Lesson ⊗ Teacher)', expect: [[1], [2], [3], [4], [6]] },
                  { expr: 'Π_{sid} (Lesson)', expect: [[1], [2], [3], [4], [5], [6]] } ],
        recap: "⊗ מזווג לפי **כל** השמות המשותפים: כאן tid וגם instrument",
        explanation: "לשני היחסים שתי עמודות משותפות: `tid` ו-`instrument`. לכן ⊗ משאיר רק שיעורים שבהם הכלי בשיעור הוא גם הכלי של המורה. בנתוני הדוגמה Gal למדה גיטרה אצל Levi, מורה לפסנתר, ולכן היא לא מופיעה, וזה מה שמבדיל את התשובה מ\"כל מי שלמד\". `city` לא נמצא ב-Lesson, ולכן ⊗ לא בודק את העיר. רשום את שתי הסכמות זו מתחת לזו והקף כל שם משותף (25C-A שאלה 13, 26B-A שאלה 14)." },

      { id: "A09-Q3", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי התלמידים שלמדו **גם** פסנתר (`\"piano\"`) **וגם** כינור (`\"violin\"`)?",
        options: [
          {id:"a", type:"algebra", value:'Π_{sid} σ_{instrument="piano" ∧ instrument="violin"} (Lesson)'},
          {id:"b", type:"algebra", value:'Π_{sid} σ_{instrument="piano"} (Lesson) ∪ Π_{sid} σ_{instrument="violin"} (Lesson)'},
          {id:"c", type:"algebra", value:'Π_{sid} σ_{instrument="piano"} (Lesson) − Π_{sid} σ_{instrument="violin"} (Lesson)'},
          {id:"d", type:"algebra", value:'Π_{sid} σ_{instrument="piano"} (Lesson) ∩ Π_{sid} σ_{instrument="violin"} (Lesson)'},
          {id:"e", type:"text", value:"יותר מתשובה אחת נכונה"},
        ], correctId: "d",
        verify: { ref: 'Π_{sid} σ_{instrument="piano"} (Lesson) ∩ Π_{sid} σ_{instrument="violin"} (Lesson)', same: ["d"], differ: ["a", "b", "c"] },
        recap: "\"גם וגם\" על שתי שורות = ∩",
        explanation: "פסנתר וכינור הם שני שיעורים, כלומר **שתי שורות** שונות. σ בודק שורה אחת, ולכן {opt:a} ריק תמיד. החיתוך {opt:d} משאיר מי שמופיע בשתי הרשימות (Dana, Maya). ∪ = \"או\", ו-− = \"פסנתר ולא כינור\" (23B-A שאלה 13, 24B-A שאלה 14)." },

      { id: "A09-Q4", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי התלמידים ש**מעולם לא** הופיעו בקונצרט?",
        options: [
          {id:"a", type:"algebra", value:'Π_{performer_id} (Plays) − Π_{sid} (Student)'},
          {id:"b", type:"algebra", value:'Π_{sid} (Student) − Π_{performer_id} (Plays)'},
          {id:"c", type:"algebra", value:'Π_{sid} (Student ⊗ Plays)'},
          {id:"d", type:"algebra", value:'Π_{sid} (Student) − Π_{sid} (Plays)'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "b",
        verify: { ref: 'Π_{sid} (Student) − Π_{performer_id} (Plays)', same: ["b"], differ: ["a", "c"], invalid: ["d"] },
        recap: "\"מעולם לא\" = הכול − מי שכן · ⊗ בלי שם משותף = ×",
        explanation: "כל התלמידים **פחות** מי שהופיע: {opt:b}. ההפרש פועל לפי מיקום העמודות, ולכן `sid` מול `performer_id` תקין (עמודה אחת מול עמודה אחת). ב-{opt:a} הסדר הפוך, ולכן התוצאה ריקה. ב-{opt:d} ל-Plays אין עמודה `sid`, ולכן הוא פסול. ב-{opt:c} אין ל-Student ול-Plays אף שם משותף, ולכן ⊗ הופך למכפלה קרטזית ומחזיר את כולם (כמו cow_id מול mom_id ב-21B-C שאלה 18)." },

      { id: "A09-Q5", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי התלמידים שהופיעו **רק** בקונצרטים בחיפה (`\"Haifa\"`)? (הנחה: רק מי שהופיע לפחות פעם אחת)",
        options: [
          {id:"a", type:"algebra", value:'Π_{performer_id} (Plays) − Π_{performer_id} σ_{city != "Haifa"} (Plays ⊗ Concert)'},
          {id:"b", type:"algebra", value:'Π_{performer_id} σ_{city = "Haifa"} (Plays ⊗ Concert)'},
          {id:"c", type:"algebra", value:'Π_{sid} (Student) − Π_{performer_id} σ_{city != "Haifa"} (Plays ⊗ Concert)'},
          {id:"d", type:"algebra", value:'Π_{performer_id} σ_{city = "Haifa"} (Plays ⊗ Concert) ∩ Π_{performer_id} σ_{city != "Haifa"} (Plays ⊗ Concert)'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "a",
        verify: { ref: 'Π_{performer_id} (Plays) − Π_{performer_id} σ_{city != "Haifa"} (Plays ⊗ Concert)', same: ["a"], differ: ["b", "c", "d"] },
        recap: "\"רק X\" = מי שהופיע − מי שהופיע גם במשהו שאינו X",
        explanation: "\"רק בחיפה\" = מי שהופיע **פחות** מי שהופיע ולו פעם אחת מחוץ לחיפה: {opt:a} (רק Ido). {opt:b} מחזיר מי שהופיע **לפחות** פעם בחיפה, גם אם הופיע גם בתל אביב. ב-{opt:c} מתחילים מכל התלמידים, ולכן נכנסת גם Noa שלא הופיעה בכלל, בניגוד להנחה. {opt:d} = מי שהופיע **גם** בחיפה **וגם** מחוצה לה. זה המבנה של 23B-A2 שאלה 15." },

      { id: "A09-Q6", ctx: schema,
        question: "איזה ביטוי מחזיר את שם התלמיד (או התלמידים) **המבוגר ביותר**? (הניחו ששמות התלמידים ייחודיים.)",
        options: [
          {id:"a", type:"algebra", value:'Π_{name} (Student) − Π_{S1.name} σ_{S1.age < S2.age} (ρ_{S1} Student × ρ_{S2} Student)'},
          {id:"b", type:"algebra", value:'Π_{name} (Student) − Π_{S1.name} σ_{S1.age > S2.age} (ρ_{S1} Student × ρ_{S2} Student)'},
          {id:"c", type:"algebra", value:'Π_{S1.name} σ_{S1.age > S2.age} (ρ_{S1} Student × ρ_{S2} Student)'},
          {id:"d", type:"algebra", value:'Π_{name} σ_{age = MAX(age)} (Student)'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "a",
        verify: { ref: 'Π_{name} (Student) − Π_{S1.name} σ_{S1.age < S2.age} (ρ_{S1} Student × ρ_{S2} Student)', same: ["a"], differ: ["b", "c"], invalid: ["d"] },
        recap: "מקסימום = הכול − Π(הקטן בזוג) · אין MAX באלגברה",
        explanation: "מקסימום = כל התלמידים פחות מי שיש מבוגר ממנו. ב-{opt:a} מקרינים את S1 כשהוא **הצעיר** בזוג, ולכן הצעירים יוצאים ונשאר Gal. {opt:b} הופך את הסימן ומחזיר את הצעירים ביותר (Adi ו-Noa). {opt:c} בלי הפרש מחזיר כל מי שמבוגר ממישהו. ב-{opt:d} אין `MAX` באלגברה, ולכן הביטוי פסול (26B-A שאלה 16, 21S-B שאלה 15). כדאי לשים לב: ההפרש לפי `name` עובד כאן כי השמות שונים זה מזה. אחרת מקרינים את `sid`." },

      { id: "A09-Q7", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי התלמידים שלמדו אצל **כל** המורים שגרים בחיפה?",
        options: [
          {id:"a", type:"algebra", value:'Π_{sid} (Lesson) ÷ Π_{tid} σ_{city="Haifa"} (Teacher)'},
          {id:"b", type:"algebra", value:'Π_{sid, tid} (Lesson) ÷ Π_{tid} (Teacher)'},
          {id:"c", type:"algebra", value:'Π_{sid, tid} (Lesson) ÷ Π_{tid} σ_{city="Haifa"} (Teacher)'},
          {id:"d", type:"algebra", value:'Π_{sid} σ_{city="Haifa"} (Lesson ⊗ Teacher)'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "c",
        verify: { ref: 'Π_{sid, tid} (Lesson) ÷ Π_{tid} σ_{city="Haifa"} (Teacher)', same: ["c"], differ: ["b", "d"], invalid: ["a"] },
        recap: "\"כל\" = ÷ · המחולק (מי, מה) · המחלק = הקבוצה המסוננת",
        explanation: "\"אצל כל\" = **חילוק**: הזוגות (תלמיד, מורה) ÷ המורים מחיפה. {opt:c} מחזיר את Dana ו-Ido, שלמדו גם אצל Levi וגם אצל Mizrahi. ב-{opt:a} למחולק אין את `tid`, ולכן הביטוי פסול. {opt:b} מחלק בכל המורים, לא רק בחיפאים. {opt:d} מחזיר מי שלמד אצל **מורה אחד לפחות** מחיפה (21B-A שאלה 16, 23B-A שאלה 14)." },

      { id: "A09-Q8", ctx: schema,
        question: "השאלה: \"מזהי הקונצרטים ש**כל** התלמידים מחיפה הופיעו בהם\". לרשותכם: הפרש, חיתוך, איחוד, חילוק, שינוי שם. **בכמה** מהפעולות האלה תצטרכו להשתמש? (לפי הקונבנציה של הקורס, 25B-A שאלה 15: מחלקים ישירות את טבלת הקשר, בלי לצרף טבלה נוספת רק כדי ליישר שמות עמודות.)",
        options: [
          {id:"a", type:"text", value:"0"},
          {id:"b", type:"text", value:"1"},
          {id:"c", type:"text", value:"2"},
          {id:"d", type:"text", value:"3"},
          {id:"e", type:"text", value:"4"},
        ], correctId: "c",
        verify: [
          { expr: 'Π_{cid, performer_id} (Plays) ÷ ρ_{H(performer_id)} (Π_{sid} σ_{city="Haifa"} (Student))', expect: [[100], [102]] },
          { ref: 'Π_{cid, performer_id} (Plays) ÷ ρ_{H(performer_id)} (Π_{sid} σ_{city="Haifa"} (Student))',
            template: 'Π_{cid, performer_id} (Plays) ÷ Π_{sid} σ_{city="Haifa"} (Student)', invalid: ["c"] },
        ],
        recap: "חילוק + ρ כששם העמודה שונה (performer_id מול sid)",
        explanation: "\"כל\" = **חילוק**: הזוגות (קונצרט, תלמיד) ÷ התלמידים מחיפה. אבל ב-Plays התלמיד נקרא `performer_id`, וב-Student הוא `sid`. בלי שינוי שם סכמת המחלק לא מוכלת בסכמת המחולק. לכן $Π_{cid, performer_id} (Plays) ÷ ρ_{H(performer_id)} (Π_{sid} σ_{city=\"Haifa\"} (Student))$, כלומר חילוק + שינוי שם = **2**. σ ו-Π לא נספרות. זה המבנה של 25B-A שאלה 15." },

      { id: "A09-Q9", ctx: schema,
        question: "איזה ביטוי מחזיר את מזהי התלמידים שלמדו אצל **יותר ממורה אחד**?",
        options: [
          {id:"a", type:"algebra", value:'Π_{L1.sid} σ_{L1.sid = L2.sid} (ρ_{L1} Lesson × ρ_{L2} Lesson)'},
          {id:"b", type:"algebra", value:'Π_{L1.sid} σ_{L1.sid = L2.sid ∧ L1.instrument != L2.instrument} (ρ_{L1} Lesson × ρ_{L2} Lesson)'},
          {id:"c", type:"algebra", value:'Π_{L1.sid} σ_{L1.sid = L2.sid ∧ L1.tid != L2.tid} (ρ_{L1} Lesson × ρ_{L2} Lesson)'},
          {id:"d", type:"text", value:"אי אפשר לבטא זאת באלגברה, כי צריך COUNT."},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "c",
        verify: { ref: 'Π_{L1.sid} σ_{L1.sid = L2.sid ∧ L1.tid != L2.tid} (ρ_{L1} Lesson × ρ_{L2} Lesson)', same: ["c"], differ: ["a", "b"] },
        recap: "יותר מאחד = צירוף עצמי: אותו מפתח, ערך שונה במה שסופרים",
        explanation: "\"יותר ממורה אחד\" = שתי שורות של **אותו תלמיד** עם **מורים שונים**: {opt:c}. {opt:b} בודק כלים שונים: Maya למדה שני כלים אצל אותו מורה ונכנסת בטעות. בלי ≠ ({opt:a}) כל שורה מתאימה לעצמה, ולכן חוזר כל מי שלמד. \"יותר מאחד\" **כן** ניתן לביטוי, רק \"בדיוק כמה\" לא (21B-A שאלה 17, 23B-A2 שאלה 16)." },

      { id: "A09-Q10", ctx: schema,
        question: "מה עושה השאילתה הבאה?\n$$Π_{t_name} σ_{age > 16} (Teacher ⊗ Lesson)$$",
        options: [
          {id:"a", type:"text", value:"מחזירה את שמות המורים שלימדו תלמיד מעל גיל 16."},
          {id:"b", type:"text", value:"מחזירה את שמות המורים שלימדו תלמיד מעל גיל 16 באותו כלי שהם מלמדים."},
          {id:"c", type:"text", value:"מחזירה את שמות המורים שגילם מעל 16."},
          {id:"d", type:"text", value:"השאילתה אינה תקינה."},
          {id:"e", type:"text", value:"מחזירה תוצאה ריקה תמיד."},
        ], correctId: "d",
        verify: { ref: 'Π_{t_name} σ_{age > 16} (Teacher ⊗ Lesson ⊗ Student)', template: 'Π_{t_name} σ_{age > 16} (Teacher ⊗ Lesson)', invalid: ["d"] },
        recap: "σ על עמודה שלא קיימת ביחס = שאילתה פסולה",
        explanation: "העמודה `age` נמצאת רק ב-Student. ל-Teacher ⊗ Lesson יש את העמודות tid, t_name, city, instrument, sid ו-is_online, ואין בהן `age`, ולכן σ פונה לעמודה שלא קיימת. זה המקור הקבוע לתשובות \"אף תשובה\" במבחנים (22B-A שאלה 13, 23B-A שאלה 15). כדי לתקן צריך לצרף גם את Student, ואז ⊗ מזווג גם לפי `city`, כלומר רק תלמידים מהעיר של המורה." },

      { id: "A09-Q11",
        ctx: { title: "שני יחסים קטנים", tables: [
          { name: "R", columns: ["A", "B"], rows: [[1, "x"], [2, "x"], [3, "y"], [1, "y"]] },
          { name: "S", columns: ["B", "C"], rows: [["x", 5], ["x", 6], ["y", 5], ["z", 7]] } ] },
        question: "כמה שורות וכמה עמודות תכיל תוצאת השאילתה?\n$$σ_{A ≥ 2} (R ⊗ S)$$",
        options: [
          {id:"a", type:"text", value:"6 שורות ו-3 עמודות"},
          {id:"b", type:"text", value:"3 שורות ו-4 עמודות"},
          {id:"c", type:"text", value:"3 שורות ו-3 עמודות"},
          {id:"d", type:"text", value:"16 שורות ו-4 עמודות"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "c",
        verify: [ { expr: 'σ_{A ≥ 2} (R ⊗ S)', rows: 3, cols: 3 }, { expr: 'R ⊗ S', rows: 6, cols: 3 } ],
        recap: "⊗: העמודה המשותפת פעם אחת · σ בסוף",
        explanation: "R ⊗ S מזווג לפי B: לערך x יש 2 שורות ב-R ו-2 ב-S, כלומר 4 צירופים. לערך y יש 2 שורות ב-R ושורה אחת ב-S, כלומר 2 צירופים. ל-z אין התאמה. סך הכול 6 שורות, עם העמודות A, B, C (B פעם אחת). אחרי σ<sub>A ≥ 2</sub> נשארות (2,x,5), (2,x,6) ו-(3,y,5): **3 שורות ו-3 עמודות**. 6 = שכחת את ה-σ, 4 עמודות = ספרת את B פעמיים, 16 = מכפלה קרטזית (25B-A שאלה 16)." },

      { id: "A09-Q12", ctx: schema,
        question: "איזה מהבאים **אי אפשר** לבטא באלגברת היחסים מעל הסכמה הנתונה?",
        options: [
          {id:"a", type:"text", value:"העיר של התלמיד הצעיר ביותר."},
          {id:"b", type:"text", value:"התלמידים שלמדו אצל יותר ממורה אחד."},
          {id:"c", type:"text", value:"לכל קונצרט, מספר התלמידים שהופיעו בו."},
          {id:"d", type:"text", value:"הקונצרטים שכל תלמידי חיפה הופיעו בהם."},
          {id:"e", type:"text", value:"כל התשובות האחרות ניתנות לביטוי"},
        ], correctId: "c",
        recap: "אין COUNT / SUM / AVG / GROUP BY באלגברה",
        explanation: "\"מספר התלמידים\" דורש ספירה, ובאלגברה אין COUNT ואין GROUP BY. את השאר אפשר: הצעיר ביותר עם הפרש וצירוף עצמי, ואת העיר שלו מקבלים בצירוף חזרה ל-Student. \"יותר ממורה אחד\" עם צירוף עצמי ו-≠ (שאלה 9). \"כל תלמידי חיפה\" עם חילוק ו-ρ (שאלה 8). זה המבנה של 21B-A שאלה 17." },
    ],
  });
})();
