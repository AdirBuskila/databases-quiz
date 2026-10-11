/* Algebra course · level 8 — SQL ↔ algebra: the five patterns side by side (division, extremum, difference, intersection, self-join) */
(function(){
  const READER = { name: "Reader", pk: ["rid"], columns: ["rid", "name", "city"],
    rows: [[1, "Dana", "Haifa"], [2, "Adi", "Haifa"], [3, "Ido", "Eilat"], [4, "Noa", "Tel Aviv"], [5, "Gal", "Haifa"]] };
  const BOOK = { name: "Book", pk: ["isbn"], columns: ["isbn", "title", "genre", "pages"],
    rows: [[100, "Dune", "SciFi", 600], [101, "Foundation", "SciFi", 250], [102, "Emma", "Romance", 400], [103, "Hamlet", "Drama", 250]] };
  const LOAN = { name: "Loan", pk: ["rid", "isbn", "year"], columns: ["rid", "isbn", "year"],
    rows: [[1, 100, 2023], [1, 101, 2023], [1, 102, 2024], [2, 100, 2023], [2, 100, 2024], [3, 101, 2024], [3, 100, 2022],
           [4, 103, 2024], [2, 103, 2023], [4, 103, 2023]] };

  const schema = { relations: [
    { schema: "Reader([u]rid[/u], name, city)", meaning: "קורא: מזהה, שם ועיר" },
    { schema: "Book([u]isbn[/u], title, genre, pages)", meaning: "ספר: מסת\"ב, שם, ז'אנר ומספר עמודים" },
    { schema: "Loan([u]rid[/u], [u]isbn[/u], [u]year[/u])", meaning: "הקורא rid השאיל את הספר isbn בשנה year" },
  ] };

  ALG_LEVEL({
    id: "A08", order: 8, icon: "🔁", title: "SQL ↔ אלגברה: חמש התבניות",
    goal: "לזהות את התבנית מהניסוח ולתרגם בין SQL לאלגברה: חילוק, קיצון, הפרש, חיתוך וצירוף עצמי.",
    db: [READER, BOOK, LOAN],
    lesson: {
      html: `
<p>SQL ואלגברה הן <strong>אותן חמש שאלות לוגיות בשתי שפות</strong>. מזהים את התבנית מהניסוח בעברית, כותבים את השלד, ורק אז קוראים את האפשרויות:</p>
<div class="learn-tablewrap"><table>
<thead><tr><th>מה כתוב בשאלה</th><th>התבנית</th><th>SQL</th><th>אלגברה</th></tr></thead>
<tbody>
<tr><td>"לכל ה___" · "את כל ה___"</td><td>חילוק</td><td><code>NOT EXISTS</code> כפול · <code>CONTAINS</code> · <code>COUNT(DISTINCT) =</code></td><td>÷</td></tr>
<tr><td>"המקסימלי" · "המינימלי" · "הכי"</td><td>קיצון</td><td><code>&gt;= ALL</code> · <code>= (SELECT MAX)</code></td><td>Π − Πσ(ρ×ρ)</td></tr>
<tr><td>"אף פעם לא" · "אין לו" · "רק"</td><td>הפרש</td><td><code>NOT IN</code> · <code>NOT EXISTS</code> · <code>LEFT JOIN … IS NULL</code></td><td>−</td></tr>
<tr><td>"גם X וגם Y" (בשתי שורות)</td><td>חיתוך</td><td><code>INTERSECT</code> · שתי תת-שאילתות</td><td>∩</td></tr>
<tr><td>"יותר מפעם אחת" · "פעמיים"</td><td>צירוף עצמי</td><td><code>T1, T2 WHERE t1.k = t2.k AND t1.x &lt;&gt; t2.x</code> · <code>COUNT(DISTINCT) &gt; 1</code></td><td>ρ + × עם = ו-≠</td></tr>
</tbody></table></div>
{fig:0}
<div class="lesson-rule">🔑 <strong>ארבע בדיקות לחילוק:</strong> (1) ב-SQL שלילה <strong>כפולה</strong>, לא יחידה. (2) באלגברה המחולק הוא <strong>זוג</strong> תכונות (מי, מה). (3) תוצאת החילוק = סכמת המחולק פחות סכמת המחלק, ולכן עמודה מיותרת במחולק (כמו year) נכנסת לתוצאה. (4) חיתוך אינו חילוק: "גם וגם" אינו "לכל".</div>
<div class="lesson-trap">⚠️ <strong>"רק" נשמע חיובי ומתורגם לחיסור,</strong> ו-<code>!=</code> אינו "אף פעם לא": σ<sub>year != 2024</sub> מחזיר מי שיש לו <em>לפחות</em> השאלה אחת שאינה ב-2024, גם אם השאיל ב-2024.</div>`,
      figs: [
        { caption: "חילוק: הזוגות (קורא, ספר) ÷ ספרי ה-SciFi = הקוראים שהשאילו את כל ספרי ה-SciFi. ב-SQL זה NOT EXISTS כפול.",
          tables: [BOOK, LOAN], alg: 'Π_{rid, isbn} (Loan) ÷ Π_{isbn} σ_{genre="SciFi"} (Book)',
          result: { columns: ["rid"], rows: [[1], [3]] } },
      ],
    },
    questions: [
      { id: "A08-Q1", ctx: schema,
        question: "איזה ביטוי באלגברה שקול לשאילתה הבאה (הקוראים שהשאילו את כל ספרי ה-SciFi)? (הניחו שיש לפחות ספר SciFi אחד.)",
        code: "SELECT R.rid FROM Reader R\nWHERE NOT EXISTS (\n  SELECT * FROM Book B WHERE B.genre = 'SciFi'\n  AND NOT EXISTS (\n    SELECT * FROM Loan L\n    WHERE L.rid = R.rid AND L.isbn = B.isbn))",
        options: [
          {id:"a", type:"algebra", value:'Π_{rid, isbn} (Loan) ÷ Π_{isbn} σ_{genre="SciFi"} (Book)'},
          {id:"b", type:"algebra", value:'Π_{rid} (Loan) ÷ Π_{isbn} σ_{genre="SciFi"} (Book)'},
          {id:"c", type:"algebra", value:'Π_{rid} σ_{genre="SciFi"} (Loan ⊗ Book)'},
          {id:"d", type:"algebra", value:'Loan ÷ Π_{isbn} σ_{genre="SciFi"} (Book)'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "a",
        verify: { ref: 'Π_{rid, isbn} (Loan) ÷ Π_{isbn} σ_{genre="SciFi"} (Book)', same: ["a"], differ: ["c", "d"], invalid: ["b"] },
        recap: "NOT EXISTS כפול = ÷ · המחולק = בדיוק (מי, מה)",
        explanation: "NOT EXISTS כפול = \"אין ספר SciFi שהקורא לא השאיל\" = **חילוק**. המחולק הוא הזוגות (rid, isbn), והמחלק הוא ספרי ה-SciFi. ב-{opt:b} למחולק עמודה אחת, ולכן isbn של המחלק לא מוכל בו והביטוי פסול. {opt:c} מחזיר מי שהשאיל **לפחות** ספר SciFi אחד (גם Adi). ב-{opt:d} המחולק כולל גם את year, ולכן התוצאה היא זוגות (rid, year), ו\"לכל\" נבדק בכל שנה בנפרד." },

      { id: "A08-Q2", ctx: schema,
        question: "איזה ביטוי באלגברה שקול לשאילתה הבאה? (הניחו שכותרות הספרים ייחודיות.)",
        code: "SELECT title FROM Book\nWHERE pages >= ALL (SELECT pages FROM Book)",
        options: [
          {id:"a", type:"algebra", value:'Π_{title} (Book) − Π_{B1.title} σ_{B1.pages > B2.pages} (ρ_{B1} Book × ρ_{B2} Book)'},
          {id:"b", type:"algebra", value:'Π_{B1.title} σ_{B1.pages > B2.pages} (ρ_{B1} Book × ρ_{B2} Book)'},
          {id:"c", type:"algebra", value:'Π_{title} (Book) − Π_{B1.title} σ_{B1.pages < B2.pages} (ρ_{B1} Book × ρ_{B2} Book)'},
          {id:"d", type:"algebra", value:'Π_{title} (Book) − Π_{B2.title} σ_{B1.pages < B2.pages} (ρ_{B1} Book × ρ_{B2} Book)'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "c",
        verify: { ref: 'Π_{title} (Book) − Π_{B1.title} σ_{B1.pages < B2.pages} (ρ_{B1} Book × ρ_{B2} Book)', same: ["c"], differ: ["a", "b", "d"] },
        recap: ">= ALL = מקסימום = הכול פחות מי שיש גדול ממנו · מי שמוקרן מפסיד",
        explanation: "`>= ALL` = הספר הארוך ביותר. באלגברה: כל הספרים **פחות** מי שיש ספר ארוך ממנו. ב-{opt:c} מקרינים את B1 כשהוא **הקצר** בזוג, ולכן יוצאים כל מי שאינם מקסימום ונשאר Dune. {opt:a} מוציא את מי שארוך ממישהו, כלומר מחזיר את המינימום. {opt:d} מקרין את B2 כשהוא הארוך, וגם הוא מחזיר מינימום. {opt:b} בלי ההפרש מחזיר את כל מי שארוך ממישהו (Dune וגם Emma)." },

      { id: "A08-Q3", ctx: schema,
        question: "איזה ביטוי באלגברה שקול לשאילתה הבאה? (הניחו ששמות הקוראים ייחודיים.)",
        code: "SELECT name FROM Reader\nWHERE rid NOT IN (SELECT rid FROM Loan)",
        options: [
          {id:"a", type:"algebra", value:'Π_{name} (Reader ⊗ Loan) − Π_{name} (Reader)'},
          {id:"b", type:"algebra", value:'Π_{name} (Reader) − Π_{name} (Reader ⊗ Loan)'},
          {id:"c", type:"algebra", value:'Π_{name} σ_{year != 2024} (Reader ⊗ Loan)'},
          {id:"d", type:"algebra", value:'Π_{rid} (Reader) − Π_{rid} (Loan)'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "b",
        verify: { ref: 'Π_{name} (Reader) − Π_{name} (Reader ⊗ Loan)', same: ["b"], differ: ["a", "c", "d"] },
        recap: "NOT IN = − · הכול פחות מי שעשה, באותה עמודה שמבקשים",
        explanation: "NOT IN = **הפרש**: כל הקוראים פחות מי שמופיע בהשאלות. {opt:b} מחזיר את Gal. ב-{opt:a} הסדר הפוך, ולכן התוצאה ריקה (21S-B שאלה 19). {opt:c} מחזיר מי שהשאיל משהו שלא ב-2024, ולא מי שלא השאיל כלל. {opt:d} מחשב את הקבוצה הנכונה, אבל מחזיר `rid` ולא `name` כמו שהשאילתה מבקשת." },

      { id: "A08-Q4", ctx: schema,
        question: "איזה ביטוי באלגברה שקול לשאילתה הבאה?",
        code: "SELECT rid FROM Loan WHERE year = 2023\nINTERSECT\nSELECT rid FROM Loan WHERE year = 2024",
        options: [
          {id:"a", type:"algebra", value:'Π_{rid} σ_{year=2023 ∧ year=2024} (Loan)'},
          {id:"b", type:"algebra", value:'Π_{rid} σ_{year=2023} (Loan) ∪ Π_{rid} σ_{year=2024} (Loan)'},
          {id:"c", type:"algebra", value:'Π_{rid} σ_{year=2023} (Loan) ∩ Π_{rid} σ_{year=2024} (Loan)'},
          {id:"d", type:"algebra", value:'Π_{rid} σ_{year=2023} (Loan) − Π_{rid} σ_{year=2024} (Loan)'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "c",
        verify: { ref: 'Π_{rid} σ_{year=2023} (Loan) ∩ Π_{rid} σ_{year=2024} (Loan)', same: ["c"], differ: ["a", "b", "d"] },
        recap: "\"גם וגם\" על שתי שורות = ∩ · σ עם שני ערכים לאותה עמודה = ריק",
        explanation: "INTERSECT = **חיתוך**: מי שמופיע בשתי הרשימות. {opt:a} תמיד ריק: σ בודק שורה אחת, ושורה לא יכולה להיות גם 2023 וגם 2024 (21S-B שאלה 14). {opt:b} (איחוד) = \"או\". {opt:d} (הפרש) = מי שהשאיל ב-2023 ולא ב-2024." },

      { id: "A08-Q5", ctx: schema,
        question: "איזה ביטוי באלגברה שקול לשאילתה הבאה (קוראים שהשאילו את **אותו ספר** יותר מפעם אחת)?",
        code: "SELECT DISTINCT L1.rid\nFROM Loan L1, Loan L2\nWHERE L1.rid = L2.rid AND L1.isbn = L2.isbn\n  AND L1.year <> L2.year",
        options: [
          {id:"a", type:"algebra", value:'Π_{L1.rid} σ_{L1.rid = L2.rid ∧ L1.isbn = L2.isbn} (ρ_{L1} Loan × ρ_{L2} Loan)'},
          {id:"b", type:"algebra", value:'Π_{L1.rid} σ_{L1.rid = L2.rid ∧ L1.isbn != L2.isbn} (ρ_{L1} Loan × ρ_{L2} Loan)'},
          {id:"c", type:"algebra", value:'Π_{L1.rid} σ_{L1.rid = L2.rid ∧ L1.isbn = L2.isbn ∧ L1.year != L2.year} (ρ_{L1} Loan × ρ_{L2} Loan)'},
          {id:"d", type:"algebra", value:'Π_{rid} (Loan)'},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "c",
        verify: { ref: 'Π_{L1.rid} σ_{L1.rid = L2.rid ∧ L1.isbn = L2.isbn ∧ L1.year != L2.year} (ρ_{L1} Loan × ρ_{L2} Loan)', same: ["c"], differ: ["a", "b", "d"] },
        recap: "יותר מפעם = ρ+× עם = על מה שחוזר ו-≠ על מה שמבדיל",
        explanation: "צירוף עצמי: שתי שורות של **אותו קורא ואותו ספר** בשנים **שונות**. זה בדיוק התנאי של {opt:c}. בלי ה-≠ ({opt:a}) כל שורה מתאימה לעצמה, ולכן חוזר כל מי שהשאיל משהו. {opt:b} מוצא מי שהשאיל שני ספרים **שונים**, וזו שאלה אחרת. זה המבנה של 21B-A שאלה 14 ו-24B-A שאלה 16." },

      { id: "A08-Q6", ctx: schema,
        question: "השאלה: \"מזהי הקוראים ש**מעולם לא** השאילו ספר דרמה\". איזו תבנית היא דורשת?",
        options: [
          {id:"a", type:"text", value:"חילוק"},
          {id:"b", type:"text", value:"הפרש"},
          {id:"c", type:"text", value:"חיתוך"},
          {id:"d", type:"text", value:"צירוף עצמי"},
          {id:"e", type:"text", value:"קיצון (מקסימום/מינימום)"},
        ], correctId: "b",
        verify: { expr: 'Π_{rid} (Reader) − Π_{rid} σ_{genre="Drama"} (Loan ⊗ Book)', expect: [[1], [3], [5]] },
        recap: "\"מעולם לא\" = הפרש: הכול פחות מי שכן",
        explanation: "\"מעולם לא\" = **הפרש**: כל הקוראים פחות מי שהשאיל דרמה, $Π_{rid} (Reader) − Π_{rid} σ_{genre=\"Drama\"} (Loan ⊗ Book)$. זה לא חילוק, כי אין קבוצה שצריך לכסות. בנתוני הדוגמה Adi ו-Noa השאילו את Hamlet, ולכן נשארים Dana, Ido ו-Gal (שלא השאילה כלום). כך גם 25C-A שאלה 15 ו-23B-A שאלה 12." },

      { id: "A08-Q7", ctx: schema,
        question: "איזה ביטוי באלגברה שקול לשאילתה הבאה?",
        code: "SELECT rid FROM Loan\nGROUP BY rid\nHAVING COUNT(DISTINCT isbn) > 1",
        options: [
          {id:"a", type:"algebra", value:'Π_{L1.rid} σ_{L1.rid = L2.rid ∧ L1.isbn != L2.isbn} (ρ_{L1} Loan × ρ_{L2} Loan)'},
          {id:"b", type:"algebra", value:'Π_{L1.rid} σ_{L1.rid = L2.rid ∧ L1.year != L2.year} (ρ_{L1} Loan × ρ_{L2} Loan)'},
          {id:"c", type:"algebra", value:'Π_{L1.rid} σ_{L1.isbn != L2.isbn} (ρ_{L1} Loan × ρ_{L2} Loan)'},
          {id:"d", type:"text", value:"אין ביטוי שקול, כי באלגברה אין COUNT."},
          {id:"e", type:"text", value:"אף אחת מהתשובות אינה נכונה"},
        ], correctId: "a",
        verify: { ref: 'Π_{L1.rid} σ_{L1.rid = L2.rid ∧ L1.isbn != L2.isbn} (ρ_{L1} Loan × ρ_{L2} Loan)', same: ["a"], differ: ["b", "c"] },
        recap: "COUNT(DISTINCT x) > 1 = צירוף עצמי עם k שווה ו-x שונה",
        explanation: "\"יותר מספר אחד שונה\" = קיימות שתי השאלות של אותו קורא עם isbn **שונה**: {opt:a}. אין COUNT באלגברה, אבל \"יותר מ-1\" כן ניתן לביטוי עם צירוף עצמי, ולכן {opt:d} שגויה. {opt:b} בודק שנים שונות: Noa השאילה את אותו ספר בשתי שנים ונכנסת בטעות. ב-{opt:c} חסר `L1.rid = L2.rid`, ולכן כל קורא מזווג עם השאלות של אחרים." },

      { id: "A08-Q8", noDiagram: true,
        question: "איזו מהטענות הבאות **נכונה**?",
        options: [
          {id:"a", type:"text", value:"NOT EXISTS כפול ב-SQL מתאים לחיתוך (∩) באלגברה."},
          {id:"b", type:"text", value:"`>= ALL` ב-SQL מתאים לביטוי $Π_{x}(T) − Π_{T1.x} σ_{T1.x < T2.x} (ρ_{T1} T × ρ_{T2} T)$ באלגברה."},
          {id:"c", type:"text", value:"NOT IN ב-SQL מתאים לחילוק (÷) באלגברה."},
          {id:"d", type:"text", value:"INTERSECT ב-SQL מתאים להפרש (−) באלגברה."},
          {id:"e", type:"text", value:"כל התשובות האחרות אינן נכונות"},
        ], correctId: "b",
        recap: "÷ ↔ NOT EXISTS כפול · − ↔ NOT IN · ∩ ↔ INTERSECT · קיצון ↔ >= ALL",
        explanation: "`>= ALL` = מקסימום, ובאלגברה: הכול פחות מי שיש גדול ממנו. מקרינים את T1 כשהוא הקטן בזוג, ולכן הוא \"מפסיד\". השאר מחליפים תבניות: NOT EXISTS כפול ↔ **חילוק**, NOT IN ↔ **הפרש**, INTERSECT ↔ **חיתוך**." },
    ],
  });
})();
