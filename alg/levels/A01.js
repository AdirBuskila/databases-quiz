/* Algebra course · level 1 — σ (selection) and Π (projection) on one relation */
(function(){
  const STUDENT = { name: "Student", pk: ["sid"],
    columns: ["sid", "name", "city", "age"],
    rows: [
      [1, "Dana", "Haifa", 22],
      [2, "Adi", "Tel Aviv", 25],
      [3, "Ido", "Haifa", 22],
      [4, "Nataf", "Eilat", 30],
      [5, "Dana", "Eilat", 25],
      [6, "Maya", "Haifa", 27],
    ] };
  // a person may live in more than one city (one row per person-city pair)
  const LIVES = { name: "Lives", pk: ["name", "city"], columns: ["name", "city"],
    rows: [["Dana", "Haifa"], ["Dana", "Eilat"], ["Adi", "Haifa"], ["Nataf", "Eilat"], ["Ido", "Tel Aviv"], ["Ido", "Haifa"]] };
  const R = { name: "R", columns: ["A", "B", "C"], rows: [[2, 2, 3], [1, 2, 5], [3, 2, 7], [2, 5, 3], [2, 2, 5]] };

  const schema = { relations: [ { schema: "Student([u]sid[/u], name, city, age)", meaning: "סטודנט: מזהה, שם, עיר מגורים וגיל. שני סטודנטים שונים יכולים לשאת אותו שם." } ] };
  const withData = { title: "היחס Student (נתונים לדוגמה)", tables: [STUDENT] };

  ALG_LEVEL({
    id: "A01", order: 1, icon: "🔎", title: "σ ו-Π: בחירה והיטל",
    goal: "לבחור שורות עם σ ועמודות עם Π, לזכור ש-Π מוחק כפילויות, ולספור שורות ועמודות בתוצאה.",
    db: [STUDENT],
    lesson: {
      html: `
<p>אלגברת היחסים היא שפה של <strong>פעולות על טבלאות</strong>: כל פעולה מקבלת יחס (טבלה) ומחזירה יחס חדש. שתי הפעולות הבסיסיות:</p>
<ul>
  <li><strong>σ<sub>תנאי</sub> (בחירה)</strong> משאיר רק את ה<strong>שורות</strong> שמקיימות את התנאי. מספר העמודות לא משתנה. זה ה-WHERE של SQL.</li>
  <li><strong>Π<sub>עמודות</sub> (היטל)</strong> משאיר רק את ה<strong>עמודות</strong> שנבחרו, <strong>ומוחק שורות כפולות</strong>, כי יחס הוא קבוצה. זה SELECT DISTINCT.</li>
  <li>בתנאי של σ: <code>∧</code> = וגם, <code>∨</code> = או, <code>¬</code> = לא. מחרוזות במירכאות: <code>city="Haifa"</code>.</li>
  <li>השוואות בתנאי: <code>=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code> (≤), <code>&gt;=</code> (≥). <strong>"שונה מ-"</strong> נכתב במבחנים כמעט תמיד <code>&lt;&gt;</code>, ולפעמים <code>!=</code> או <code>≠</code>: שלושתם אותו דבר. <code>city &lt;&gt; "Haifa"</code> שקול ל-<code>¬(city="Haifa")</code>.</li>
  <li>שני ביטויים עם אותן עמודות אפשר לשלב: <code>A ∩ B</code> = השורות שיש בשניהם, <code>A − B</code> = השורות שיש ב-A ואין ב-B (הרחבה ברמה 4).</li>
  <li>פעולה חד-מקומית חלה על מה שבא <strong>מיד אחריה</strong>: <code>Π<sub>name</sub> σ<sub>age&gt;24</sub> (Student)</code> = קודם σ, ואז Π.</li>
</ul>
{fig:0}
<div class="lesson-rule">🔑 <strong>Π מוחק כפילויות.</strong> כשסופרים שורות אחרי היטל, סופרים <strong>ערכים שונים</strong> בלבד. ב-25B-A שאלה 16, ‏<code>Π<sub>A,B</sub>(R)</code> הוא 4 שורות ולא 5, כי (2,2) מופיע פעמיים.</div>
{fig:1}
<div class="lesson-trap">⚠️ <strong>σ בודק שורה אחת בכל פעם.</strong> <code>σ<sub>city="Haifa" ∧ city="Eilat"</sub></code> תמיד ריק: אין שורה שבה העיר היא גם חיפה וגם אילת. "גם וגם" על פני <strong>שתי שורות</strong> דורש חיתוך ∩ של שני ביטויים (21S-B, שאלה 14). ועוד: אחרי Π אי אפשר לסנן לפי עמודה שהושלכה. <code>σ<sub>age&gt;24</sub> Π<sub>name</sub>(Student)</code> אינו תקין.</div>`,
      figs: [
        { caption: "σ משאיר שורות: רק הסטודנטים מחיפה. כל 4 העמודות נשארות.",
          tables: [STUDENT], alg: "σ_{city=\"Haifa\"} (Student)",
          result: { columns: ["sid", "name", "city", "age"], rows: [[1, "Dana", "Haifa", 22], [3, "Ido", "Haifa", 22], [6, "Maya", "Haifa", 27]] } },
        { caption: "Π משאיר עמודות ומוחק כפילויות: 6 סטודנטים, אבל רק 3 ערים שונות.",
          tables: [STUDENT], alg: "Π_{city} (Student)",
          result: { columns: ["city"], rows: [["Haifa"], ["Tel Aviv"], ["Eilat"]] } },
      ],
    },
    questions: [
      { id: "A01-Q1", ctx: withData,
        question: "כמה שורות וכמה עמודות יש בתוצאה של הביטוי הבא? $$σ_{city=\"Haifa\"} (Student)$$",
        options: [
          {id:"a", type:"text", value:"3 שורות ועמודה אחת"},
          {id:"b", type:"text", value:"6 שורות ו-4 עמודות"},
          {id:"c", type:"text", value:"3 שורות ו-4 עמודות"},
          {id:"d", type:"text", value:"3 שורות ו-3 עמודות"},
        ], correctId: "c",
        verify: { expr: "σ_{city=\"Haifa\"} (Student)", rows: 3, cols: 4 },
        recap: "σ משנה רק את מספר השורות, לא את העמודות",
        explanation: "σ בוחר **שורות** ולא נוגע בעמודות. בחיפה גרים Dana, Ido ו-Maya, כלומר 3 שורות, וכל 4 העמודות (sid, name, city, age) נשארות. \"עמודה אחת\" היה נכון רק אם היה גם Π על עמודה אחת." },

      { id: "A01-Q2", ctx: withData,
        question: "כמה שורות יש בתוצאה? $$Π_{name} (Student)$$",
        options: [
          {id:"a", type:"text", value:"6"},
          {id:"b", type:"text", value:"5"},
          {id:"c", type:"text", value:"1"},
          {id:"d", type:"text", value:"4"},
        ], correctId: "b",
        verify: { expr: "Π_{name} (Student)", rows: 5, cols: 1 },
        recap: "Π מוחק שורות כפולות: סופרים ערכים שונים",
        explanation: "יש 6 סטודנטים, אבל השם Dana מופיע פעמיים (sid 1 ו-sid 5). אחרי היטל לעמודת השם בלבד שתי השורות זהות, ו-Π מוחק את הכפילות, ולכן 5 שורות: Dana, Adi, Ido, Nataf, Maya. אותה מלכודת כמו ב-25B-A שאלה 16 (4 שורות ולא 5)." },

      { id: "A01-Q3", ctx: withData,
        question: "מה מחזיר הביטוי? $$Π_{name} σ_{city=\"Haifa\" ∨ age > 26} (Student)$$",
        options: [
          {id:"a", type:"text", value:"Maya בלבד"},
          {id:"b", type:"text", value:"Dana, Ido, Maya, Nataf"},
          {id:"c", type:"text", value:"Nataf בלבד"},
          {id:"d", type:"text", value:"Dana, Ido, Maya, Nataf, Maya (חמש שורות)"},
        ], correctId: "b",
        verify: { expr: "Π_{name} σ_{city=\"Haifa\" ∨ age > 26} (Student)", expect: [["Dana"], ["Ido"], ["Maya"], ["Nataf"]] },
        recap: "∨ = מספיק תנאי אחד · Π לא משאיר כפילויות",
        explanation: "∨ = \"או\": שורה עוברת אם היא מחיפה **או** שהגיל מעל 26. מחיפה: Dana, Ido, Maya. מעל 26: Nataf (30) ו-Maya (27). Maya עומדת בשני התנאים, אבל מופיעה פעם אחת, כי Π מוחק כפילויות. \"Maya בלבד\" הוא הפירוש של ∧ (וגם)." },

      { id: "A01-Q4", ctx: { relations: [ { schema: "Lives([u]name[/u], [u]city[/u])", meaning: "אדם ועיר שבה הוא גר. אדם יכול לגור בכמה ערים, ואז יש לו כמה שורות." } ] },
        question: "איזה ביטוי מחזיר את שמות האנשים שגרים **גם** ב-Haifa **וגם** ב-Eilat?",
        options: [
          {id:"a", type:"algebra", value:"Π_{name} σ_{city=\"Haifa\" ∧ city=\"Eilat\"} (Lives)"},
          {id:"b", type:"algebra", value:"Π_{name} σ_{city=\"Haifa\" ∨ city=\"Eilat\"} (Lives)"},
          {id:"c", type:"algebra", value:"Π_{name} σ_{city=\"Haifa\"} (Lives) ∩ Π_{name} σ_{city=\"Eilat\"} (Lives)"},
          {id:"d", type:"algebra", value:"Π_{name} σ_{city=\"Haifa\"} (Lives) − Π_{name} σ_{city=\"Eilat\"} (Lives)"},
        ], correctId: "c",
        verify: { db: [LIVES], ref: "Π_{name} σ_{city=\"Haifa\"} (Lives) ∩ Π_{name} σ_{city=\"Eilat\"} (Lives)", same: ["c"], differ: ["a", "b", "d"] },
        recap: "\"גם וגם\" על שתי שורות = ∩ · σ עם ∧ על אותה עמודה = ריק",
        explanation: "העיר של כל שורה היא ערך **אחד**, ולכן `city=\"Haifa\" ∧ city=\"Eilat\"` לעולם לא מתקיים, והתוצאה ריקה. מי שגר בשתי ערים מופיע ב**שתי שורות**, ולכן לוקחים את קבוצת השמות מחיפה ואת קבוצת השמות מאילת, ומחשבים **חיתוך** ∩. ‏∨ מחזיר מי שגר באחת מהן לפחות, ו-− מחזיר מי שבחיפה ולא באילת. זו בדיוק 21S-B שאלה 14." },

      { id: "A01-Q5", ctx: schema,
        question: "איזה מהביטויים הבאים **אינו תקין**?",
        options: [
          {id:"a", type:"algebra", value:"Π_{name} σ_{age > 24} (Student)"},
          {id:"b", type:"algebra", value:"σ_{age > 24} Π_{name} (Student)"},
          {id:"c", type:"algebra", value:"Π_{name} σ_{age > 24 ∧ city=\"Haifa\"} (Student)"},
          {id:"d", type:"algebra", value:"σ_{age > 24} Π_{name, age} (Student)"},
          {id:"e", type:"text", value:"כל הביטויים תקינים"},
        ], correctId: "b",
        verify: [
          { ref: "Π_{name} σ_{age > 24} (Student)", same: ["a"], invalid: ["b"] },
          { ref: "Π_{name} σ_{age > 24 ∧ city=\"Haifa\"} (Student)", same: ["c"] },
          { ref: "σ_{age > 24} Π_{name, age} (Student)", same: ["d"] },
        ],
        recap: "קוראים מבפנים החוצה: אחרי Π נשארות רק העמודות שבו",
        explanation: "קוראים מבפנים החוצה. ב-{opt:b} קודם מתבצע `Π_{name}`, ונשארת רק עמודת השם. אז σ מנסה לבדוק `age`, שכבר לא קיימת ביחס, ולכן הביטוי לא תקין. ב-{opt:d} ההיטל משאיר גם את age, ולכן הסינון אחריו חוקי. הבדיקה הזו, \"האם העמודה קיימת ביחס שממנו קוראים אותה\", פותרת כמה שאלות \"אף תשובה\" במבחנים." },

      { id: "A01-Q6", ctx: schema,
        question: "איזה ביטוי מחזיר את שמות הסטודנטים שגרים ב-Haifa **ו**גילם מעל 23?",
        options: [
          {id:"a", type:"algebra", value:"Π_{name} σ_{city=\"Haifa\" ∨ age > 23} (Student)"},
          {id:"b", type:"algebra", value:"Π_{name} σ_{city=\"Haifa\"} (Student)"},
          {id:"c", type:"algebra", value:"Π_{name, city} σ_{city=\"Haifa\" ∧ age > 23} (Student)"},
          {id:"d", type:"algebra", value:"Π_{name} σ_{city=\"Haifa\" ∧ age > 23} (Student)"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "d",
        verify: { ref: "Π_{name} σ_{city=\"Haifa\" ∧ age > 23} (Student)", same: ["d"], differ: ["a", "b", "c"] },
        recap: "שני תנאים שחייבים יחד = ∧ · עמודות התוצאה הן חלק מהתשובה",
        explanation: "שני תנאים שחייבים להתקיים באותה שורה, ולכן ∧. ‏{opt:a} מחליף ב-∨ (המסיח הנפוץ), {opt:b} שוכח את תנאי הגיל, ו-{opt:c} מחזיר גם את עמודת העיר, כשביקשו רק שמות. בנתונים לדוגמה רק Maya (27) עונה על שני התנאים." },

      { id: "A01-Q7", ctx: schema,
        question: "מה מחזיר את שמות הסטודנטים ש**אינם** גרים ב-Haifa?",
        options: [
          {id:"a", type:"algebra", value:"Π_{name} σ_{¬(city=\"Haifa\")} (Student)"},
          {id:"b", type:"algebra", value:"Π_{name} σ_{city != \"Haifa\"} (Student)"},
          {id:"c", type:"text", value:"{opt:a} ו-{opt:b} מחזירים שניהם את התשובה הנכונה"},
          {id:"d", type:"algebra", value:"Π_{name} (Student) − Π_{name} σ_{city=\"Haifa\"} (Student)"},
        ], correctId: "c",
        verify: { ref: "Π_{name} σ_{¬(city=\"Haifa\")} (Student)", same: ["a", "b"], differ: ["d"] },
        recap: "¬(x=v) שקול ל-x != v · הפרש על שם (לא מפתח) מוחק גם אנשים אחרים עם אותו שם",
        explanation: "‏`¬(city=\"Haifa\")` ו-`city != \"Haifa\"` הם אותו תנאי, ושניהם משאירים את Adi, Nataf ו-Dana מאילת. ‏{opt:d} נראה נכון אבל הוא מלכודת: ההפרש נעשה על **השם**, ו-Dana מחיפה מוחקת גם את Dana מאילת, שהיא סטודנטית אחרת. כשמחסירים, מחסירים לפי **מפתח** (sid) ורק אחר כך מקרינים לשם." },

      { id: "A01-Q8", ctx: { title: "היחס R (נתונים לדוגמה)", tables: [R] },
        question: "כמה שורות וכמה עמודות יש בתוצאה? $$Π_{A, B} σ_{C > 3} (R)$$",
        options: [
          {id:"a", type:"text", value:"5 שורות ו-2 עמודות"},
          {id:"b", type:"text", value:"4 שורות ו-2 עמודות"},
          {id:"c", type:"text", value:"3 שורות ו-3 עמודות"},
          {id:"d", type:"text", value:"3 שורות ו-2 עמודות"},
          {id:"e", type:"text", value:"אף אחת מהתשובות"},
        ], correctId: "d",
        verify: { expr: "Π_{A, B} σ_{C > 3} (R)", rows: 3, cols: 2, expect: [[1, 2], [3, 2], [2, 2]] },
        recap: "קודם σ (מבפנים), אחר כך Π, ובסוף מוחקים כפילויות",
        explanation: "מבפנים החוצה: σ משאיר את השורות עם C > 3: ‏(1,2,5), (3,2,7), (2,2,5). ‏Π על A, B נותן (1,2), (3,2), (2,2): ‏**3 שורות ו-2 עמודות**. \"4 שורות\" הוא Π בלי ה-σ (הכפילות (2,2) נמחקת), ו-\"5 שורות\" שוכח גם את הסינון וגם את מחיקת הכפילויות." },
    ],
  });
})();
