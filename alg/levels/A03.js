/* Algebra course · level 3 — renaming ρ and self-join ("more than once", "someone older") */
(function(){
  const PERSON = { name: "Person", pk: ["pid"], columns: ["pid", "name", "city", "age"],
    rows: [[1, "Dana", "Haifa", 30], [2, "Adi", "Haifa", 25], [3, "Ido", "Eilat", 22], [4, "Noa", "Tel Aviv", 40], [5, "Gal", "Eilat", 22]] };
  // a voter may vote for several parties (one row per voter-party pair)
  const VOTE = { name: "Vote", pk: ["vid", "party"], columns: ["vid", "party"],
    rows: [[1, "A"], [1, "B"], [2, "A"], [3, "C"], [4, "A"], [4, "B"], [4, "C"]] };
  const REPRESENT = { name: "Represent", pk: ["band", "year"], columns: ["band", "year"],
    rows: [["Abba", 1974], ["Abba", 1975], ["Queen", 1980], ["Muse", 2001], ["Muse", 2003]] };

  const personSchema = { relations: [ { schema: "Person([u]pid[/u], name, city, age)", meaning: "אדם: מזהה, שם, עיר וגיל." } ] };
  const voteSchema = { relations: [ { schema: "Vote([u]vid[/u], [u]party[/u])", meaning: "הצבעה: מזהה מצביע ומפלגה. מצביע יכול להצביע לכמה מפלגות, ואז יש לו כמה שורות." } ] };

  ALG_LEVEL({
    id: "A03", order: 3, icon: "🪞", title: "ρ וצירוף עצמי",
    goal: "לתת שמות לשני עותקים של אותה טבלה עם ρ, ולבטא \"יותר מפעם אחת\", \"מישהו מבוגר ממני\" וזוגות.",
    db: [PERSON, VOTE],
    lesson: {
      html: `
<p>יש שאלות שמשוות שורה לשורה <strong>באותה טבלה</strong>: "מי הצביע ליותר ממפלגה אחת?", "מי גר באותה עיר כמו מישהו אחר?". בשביל זה לוקחים <strong>שני עותקים</strong> של הטבלה ונותנים להם שמות עם <strong>ρ (שינוי שם)</strong>:</p>
<ul>
  <li><code>ρ<sub>P1</sub> Person</code> = אותה טבלה, בשם P1. עכשיו <code>P1.city</code> ו-<code>P2.city</code> הן עמודות שונות.</li>
  <li><code>ρ<sub>P1</sub> Person × ρ<sub>P2</sub> Person</code> = כל זוג שורות. ב-σ כותבים מה מקשר ביניהן.</li>
  <li><code>ρ<sub>V(voter, choice)</sub> Vote</code> משנה גם את שמות העמודות.</li>
</ul>
{fig:0}
<div class="lesson-rule">🔑 <strong>"יותר מפעם אחת" = אותו מפתח, שני ערכים שונים:</strong> <code>Π<sub>V1.vid</sub> σ<sub>V1.vid = V2.vid ∧ V1.party != V2.party</sub>(ρ<sub>V1</sub> Vote × ρ<sub>V2</sub> Vote)</code> (21B-A שאלה 14, 23B-A2 שאלה 16). בלי התנאי <code>!=</code> כל שורה מתאימה לעצמה, וכולם עוברים.</div>
<div class="lesson-trap">⚠️ <strong>צירוף עצמי מוכיח שקיים מקרה, אבל לא שולל.</strong> "פעם אחת בדיוק", "רק" או "אך ורק" אי אפשר לבטא בלי <strong>הפרש</strong> (−): כל המזהים פחות אלה שהצביעו פעמיים. 23B-A שאלה 16 בנויה על זה: הניסוחים "אך ורק" ו"לכל" לא מתאימים לצירוף עצמי, ולכן "אף אחת מהתשובות". ועוד: בלי ρ, הביטוי <code>σ<sub>city = city</sub>(Person × Person)</code> לא תקין, כי אי אפשר לדעת לאיזה עותק כל city שייך.</div>`,
      figs: [
        { caption: "זוגות של אנשים שונים שגרים באותה עיר. בלי P1.pid != P2.pid כל אחד היה מופיע גם עם עצמו.",
          tables: [PERSON], alg: "Π_{P1.name, P2.name} σ_{P1.city = P2.city ∧ P1.pid != P2.pid} (ρ_{P1} Person × ρ_{P2} Person)",
          result: { columns: ["name", "name"], rows: [["Dana", "Adi"], ["Adi", "Dana"], ["Ido", "Gal"], ["Gal", "Ido"]] } },
      ],
    },
    questions: [
      { id: "A03-Q1", ctx: { title: "היחס Person (נתונים לדוגמה)", tables: [PERSON] },
        question: "כמה שורות וכמה עמודות יש בתוצאה? $$ρ_{P1} Person × ρ_{P2} Person$$",
        options: [
          {id:"a", type:"text", value:"5 שורות ו-4 עמודות"},
          {id:"b", type:"text", value:"25 שורות ו-8 עמודות"},
          {id:"c", type:"text", value:"25 שורות ו-4 עמודות"},
          {id:"d", type:"text", value:"20 שורות ו-8 עמודות"},
        ], correctId: "b",
        verify: { expr: "ρ_{P1} Person × ρ_{P2} Person", rows: 25, cols: 8 },
        recap: "ρ לא משנה תוכן · עותק × עותק = כל זוג, גם אדם עם עצמו",
        explanation: "ρ רק נותן שם, ולא משנה את התוכן: שני עותקים של 5 שורות. המכפלה נותנת 5·5 = **25** שורות, כולל כל אדם מול עצמו, ו-4 + 4 = **8** עמודות (P1.pid, …, P2.age). ‏20 היה נכון רק אם היינו מסננים כבר את הזוגות של אדם עם עצמו, ואין כאן σ." },

      { id: "A03-Q2", ctx: personSchema,
        question: "איזה ביטוי מחזיר זוגות של שמות של **שני אנשים שונים** שגרים באותה עיר?",
        options: [
          {id:"a", type:"algebra", value:"Π_{P1.name, P2.name} σ_{P1.city = P2.city} (ρ_{P1} Person × ρ_{P2} Person)"},
          {id:"b", type:"algebra", value:"Π_{name, name} σ_{city = city} (Person × Person)"},
          {id:"c", type:"algebra", value:"Π_{P1.name, P2.name} σ_{P1.city = P2.city ∧ P1.pid != P2.pid} (ρ_{P1} Person × ρ_{P2} Person)"},
          {id:"d", type:"algebra", value:"Π_{P1.name, P2.name} σ_{P1.city = P2.city ∧ P1.pid != P2.pid} (ρ_{P1} Person ⊗ ρ_{P2} Person)"},
        ], correctId: "c",
        verify: { ref: "Π_{P1.name, P2.name} σ_{P1.city = P2.city ∧ P1.pid != P2.pid} (ρ_{P1} Person × ρ_{P2} Person)", same: ["c"], differ: ["a", "d"], invalid: ["b"] },
        recap: "צירוף עצמי: ρ לשני העותקים + × + תנאי שמבדיל ביניהם",
        explanation: "צריך שני עותקים עם שמות (ρ), מכפלה, ותנאי: אותה עיר **ו**מזהה שונה. ‏{opt:a} שוכח את `P1.pid != P2.pid`, ולכן כל אדם מופיע גם כזוג עם עצמו. ‏{opt:b} בלי ρ אינו תקין: `city = city` לא מבחין בין העותקים. ‏{opt:d} משתמש ב-⊗, שמשווה את **כל** העמודות בעלות אותו שם (pid, name, city, age). לכן כל שורה מזווגת רק עם עצמה, ואחרי הצירוף נשאר עותק אחד של כל עמודה. התנאי `P1.pid != P2.pid` כבר לא מבחין בין שני אנשים: הוא אף פעם לא מתקיים, או שאינו מוגדר בכלל. כך או כך, הזוגות לא מתקבלים." },

      { id: "A03-Q3", ctx: { title: "היחס Vote (נתונים לדוגמה)", tables: [VOTE] },
        question: "מה מחזיר הביטוי? $$Π_{V1.vid} σ_{V1.vid = V2.vid ∧ V1.party != V2.party} (ρ_{V1} Vote × ρ_{V2} Vote)$$",
        options: [
          {id:"a", type:"text", value:"1, 2, 3, 4"},
          {id:"b", type:"text", value:"2, 3"},
          {id:"c", type:"text", value:"1, 4"},
          {id:"d", type:"text", value:"4 בלבד"},
        ], correctId: "c",
        verify: { expr: "Π_{V1.vid} σ_{V1.vid = V2.vid ∧ V1.party != V2.party} (ρ_{V1} Vote × ρ_{V2} Vote)", expect: [[1], [4]] },
        recap: "אותו מזהה + ערך שונה = לפחות שתי שורות לאותו מזהה",
        explanation: "התנאי מחפש שתי שורות של **אותו** מצביע עם מפלגות **שונות**. מצביע 1 (A, B) ומצביע 4 (A, B, C) עוברים. מצביעים 2 ו-3 הצביעו פעם אחת, ולכן אין להם שורה שנייה להשוות אליה. \"4 בלבד\" הוא \"יותר מפעמיים\", ולזה צריך שלושה עותקים." },

      { id: "A03-Q4", ctx: { relations: [ { schema: "Represent([u]band[/u], [u]year[/u])", meaning: "השתתפות של להקה בתחרות בשנה מסוימת." } ] },
        question: "מה מחזירה השאילתה? $$Π_{R1.band} σ_{(R1.band = R2.band) ∧ (R1.year <> R2.year)} (ρ_{R1} Represent × ρ_{R2} Represent)$$",
        options: [
          {id:"a", type:"text", value:"שמות כל הלהקות שהשתתפו בתחרות לפחות פעם אחת."},
          {id:"b", type:"text", value:"שמות כל הלהקות שהשתתפו בתחרות יותר מפעם אחת."},
          {id:"c", type:"text", value:"שמות הלהקות שהשתתפו בתחרות פעם אחת בדיוק."},
          {id:"d", type:"text", value:"יותר מתשובה אחת נכונה."},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה."},
        ], correctId: "b",
        verify: { db: [REPRESENT], expr: "Π_{R1.band} σ_{(R1.band = R2.band) ∧ (R1.year <> R2.year)} (ρ_{R1} Represent × ρ_{R2} Represent)", expect: [["Abba"], ["Muse"]] },
        recap: "צירוף עצמי עם <> על השנה = \"יותר מפעם אחת\"",
        explanation: "אותה להקה (`R1.band = R2.band`) בשתי שנים שונות (`R1.year <> R2.year`), כלומר להקה שהשתתפה **יותר מפעם אחת**. בדוגמה: Abba (1974, 1975) ו-Muse (2001, 2003). Queen השתתפה פעם אחת ולכן לא מופיעה. \"פעם אחת בדיוק\" דורש הפרש. זו 23B-A2 שאלה 16 כמעט מילה במילה." },

      { id: "A03-Q5", ctx: voteSchema,
        question: "איזה ביטוי מחזיר את המצביעים שהצביעו **למפלגה אחת בלבד**?",
        options: [
          {id:"a", type:"algebra", value:"Π_{V1.vid} σ_{V1.vid = V2.vid ∧ V1.party = V2.party} (ρ_{V1} Vote × ρ_{V2} Vote)"},
          {id:"b", type:"algebra", value:"Π_{V1.vid} σ_{V1.vid = V2.vid ∧ V1.party != V2.party} (ρ_{V1} Vote × ρ_{V2} Vote)"},
          {id:"c", type:"algebra", value:"Π_{vid} (Vote) − Π_{V1.vid} σ_{V1.vid = V2.vid ∧ V1.party != V2.party} (ρ_{V1} Vote × ρ_{V2} Vote)"},
          {id:"d", type:"algebra", value:"Π_{V1.vid} σ_{V1.vid != V2.vid} (ρ_{V1} Vote × ρ_{V2} Vote)"},
          {id:"e", type:"text", value:"אי אפשר לבטא זאת באלגברת היחסים"},
        ], correctId: "c",
        verify: { ref: "Π_{vid} (Vote) − Π_{V1.vid} σ_{V1.vid = V2.vid ∧ V1.party != V2.party} (ρ_{V1} Vote × ρ_{V2} Vote)", same: ["c"], differ: ["a", "b", "d"] },
        recap: "\"בדיוק פעם אחת\" = כולם − מי שהצביע יותר מפעם אחת",
        explanation: "צירוף עצמי לבד יכול רק להוכיח ש**קיים** זוג שורות. \"למפלגה אחת בלבד\" פירושו \"**אין** לו מפלגה שנייה\", ולכן לוקחים את כל המצביעים ומחסירים את מי שהצביע ליותר ממפלגה אחת ({opt:b} הוא בדיוק החלק שמחסירים). ‏{opt:a} עם `=` מתאים כל שורה לעצמה ומחזיר את כולם, ו-{opt:d} משווה מצביעים שונים, וזה לא קשור לשאלה. אפשר לבטא זאת, כי באלגברה יש הפרש." },

      { id: "A03-Q6", ctx: personSchema,
        question: "איזה ביטוי מחזיר את שמות האנשים ש**יש מישהו מבוגר מהם שגר באותה עיר**?",
        options: [
          {id:"a", type:"algebra", value:"Π_{P2.name} σ_{P1.city = P2.city ∧ P1.age < P2.age} (ρ_{P1} Person × ρ_{P2} Person)"},
          {id:"b", type:"algebra", value:"Π_{P1.name} σ_{P1.age < P2.age} (ρ_{P1} Person × ρ_{P2} Person)"},
          {id:"c", type:"algebra", value:"Π_{P1.name} σ_{P1.city = P2.city ∧ P1.age <= P2.age} (ρ_{P1} Person × ρ_{P2} Person)"},
          {id:"d", type:"algebra", value:"Π_{P1.name} σ_{P1.city = P2.city ∧ P1.age < P2.age} (ρ_{P1} Person × ρ_{P2} Person)"},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "d",
        verify: { ref: "Π_{P1.name} σ_{P1.city = P2.city ∧ P1.age < P2.age} (ρ_{P1} Person × ρ_{P2} Person)", same: ["d"], differ: ["a", "b", "c"] },
        recap: "מקרינים את העותק שהתנאי מתאר (P1 הצעיר) · < ולא <=",
        explanation: "P1 הוא האדם שאנחנו מחזירים, ו-P2 הוא \"המבוגר ממנו\": אותה עיר ו-`P1.age < P2.age`, ומקרינים את **P1**. ‏{opt:a} מקרין את P2, כלומר את המבוגרים. ‏{opt:b} שוכח את העיר. ‏{opt:c} עם `<=` מתאים כל אדם לעצמו (גיל שווה לעצמו), ולכן מחזיר את כולם. בדוגמה רק Adi (25, ובחיפה גרה Dana בת 30) עונה. Ido ו-Gal מאילת באותו גיל, ולכן אף אחד מהם לא \"מבוגר\" מהשני. זה השלד של שאלות המקסימום והמינימום בשלב הבא." },

      { id: "A03-Q7", ctx: voteSchema,
        question: "איזה ביטוי מחזיר את המצביעים שהצביעו ל**שלוש מפלגות שונות לפחות**?",
        options: [
          {id:"a", type:"algebra", value:"Π_{V1.vid} σ_{V1.vid = V2.vid ∧ V1.party != V2.party} (ρ_{V1} Vote × ρ_{V2} Vote)"},
          {id:"b", type:"algebra", value:"Π_{V1.vid} σ_{V1.vid = V2.vid ∧ V2.vid = V3.vid ∧ V1.party != V2.party ∧ V2.party != V3.party} (ρ_{V1} Vote × ρ_{V2} Vote × ρ_{V3} Vote)"},
          {id:"c", type:"algebra", value:"Π_{V1.vid} σ_{V1.vid = V2.vid ∧ V2.vid = V3.vid ∧ V1.party != V2.party ∧ V2.party != V3.party ∧ V1.party != V3.party} (ρ_{V1} Vote × ρ_{V2} Vote × ρ_{V3} Vote)"},
          {id:"d", type:"text", value:"אי אפשר לבטא זאת באלגברת היחסים, כי אין בה COUNT"},
        ], correctId: "c",
        verify: { ref: "Π_{V1.vid} σ_{V1.vid = V2.vid ∧ V2.vid = V3.vid ∧ V1.party != V2.party ∧ V2.party != V3.party ∧ V1.party != V3.party} (ρ_{V1} Vote × ρ_{V2} Vote × ρ_{V3} Vote)", same: ["c"], differ: ["a", "b"] },
        recap: "\"לפחות k שונים\" = k עותקים, וכל זוג מהם שונה",
        explanation: "אין COUNT, אבל \"לפחות 3\" אפשר: שלושה עותקים של אותו מצביע, ושלוש המפלגות **שונות זו מזו בכל זוג**. ‏{opt:b} שוכח את `V1.party != V3.party`, ולכן התבנית A, B, A עוברת, ומצביע 1 (שתי מפלגות בלבד) נכנס. ‏{opt:a} הוא \"לפחות 2\". בדוגמה רק מצביע 4 (A, B, C) עונה. מה שבאמת אי אפשר הוא לספור ולהחזיר **מספר**." },

      { id: "A03-Q8", noDiagram: true,
        question: "מה מהבאים **אי אפשר** לבטא באלגברת היחסים (עם Π, σ, ρ, ×, ⊗, −, ∪, ∩, ÷)?",
        options: [
          {id:"a", type:"text", value:"המצביעים שהצביעו ליותר ממפלגה אחת."},
          {id:"b", type:"text", value:"האנשים שגרים באותה עיר כמו אדם אחר."},
          {id:"c", type:"text", value:"מספר המפלגות שכל מצביע הצביע להן."},
          {id:"d", type:"text", value:"האדם הצעיר ביותר."},
        ], correctId: "c",
        recap: "באלגברה אין COUNT / SUM / AVG: \"כמה\" לא ניתן, \"לפחות k\" וקיצון כן",
        explanation: "באלגברה הבסיסית אין פונקציות צבירה (COUNT, SUM, AVG, GROUP BY), ולכן אי אפשר להחזיר **מספר** כמו \"כמה מפלגות\". כל השאר אפשרי: \"יותר מאחת\" בצירוף עצמי, \"באותה עיר\" בצירוף עצמי עם מזהה שונה, ו\"הצעיר ביותר\" בהפרש: כולם פחות מי שיש מישהו צעיר ממנו. זו 21B-A שאלה 17." },
    ],
  });
})();
