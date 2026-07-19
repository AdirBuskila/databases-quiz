/* Learn-mode content for the Databases quiz (HIT course 61303).
   Mirrors the data-science-quiz learn schema: window.LEARN = [{id, title, html}]
   consumed by initLearn() in app.js (reads only .title and .html; html is injected raw).
   Algebra/schema fragments are pre-rendered to the app's CSS classes
   (.alg / .alg-block for RA & FD notation, .schema/.pk/.ppk for relation templates)
   so they match algebra.js output without needing the richText pipeline.
   Grounded in the course cheat-sheet (דף עזר 2016) and course summaries. */
window.LEARN = [
{
  id: "erd",
  title: "פרק 1 — מודל ישויות-קשרים (ERD)",
  html: `
<p>מודל <strong>הישויות-קשרים</strong> (Entity-Relationship) הוא מודל קונספטואלי לתיאור מבנה בסיס הנתונים בשלב התכן, <em>לפני</em> המימוש הפיזי. הדיאגרמה (ERD) מתארת <strong>טיפוסי ישויות</strong>, <strong>תכונות</strong> ו<strong>קשרים</strong> ביניהם, ומשמשת נקודת מוצא להמרה למודל היחסים (פרק 2).</p>

<h3>מקרא הסימונים בדיאגרמה</h3>
<table>
<thead><tr><th>רכיב</th><th>סימון בדיאגרמה</th></tr></thead>
<tbody>
<tr><td>טיפוס ישויות</td><td>מלבן</td></tr>
<tr><td>טיפוס ישויות חלש</td><td>מלבן כפול</td></tr>
<tr><td>תכונה</td><td>אליפסה</td></tr>
<tr><td>תכונה מרובת-ערכים</td><td>אליפסה כפולה</td></tr>
<tr><td>תכונה מחושבת</td><td>אליפסה מקווקוות</td></tr>
<tr><td>מפתח ראשי (תכונת מזהה)</td><td>שם התכונה בקו תחתון</td></tr>
<tr><td>טיפוס קשרים</td><td>מעוין</td></tr>
<tr><td>קשר מזהה (לישות חלשה)</td><td>מעוין כפול</td></tr>
<tr><td>אילוץ השתתפות מלאה</td><td>קו מקשר כפול</td></tr>
</tbody>
</table>

<h3>ישויות ותכונות</h3>
<ul>
<li><strong>טיפוס ישויות</strong> (Entity type) — אוסף אובייקטים בעלי אותן תכונות (למשל <em>סטודנט</em>, <em>קורס</em>). <strong>ישות</strong> (Entity) היא מופע בודד מתוך הטיפוס.</li>
<li><strong>תכונה פשוטה</strong> — תכונה בעלת מרכיב אחד (למשל <code>age</code>).</li>
<li><strong>תכונה מורכבת</strong> — מורכבת מכמה מרכיבים לאותה התכונה (<code>address</code> = עיר + רחוב + מיקוד).</li>
<li><strong>תכונה מרובת-ערכים</strong> — יש לה יותר מערך אחד (טלפונים של אדם); מסומנת באליפסה כפולה.</li>
<li><strong>תכונה מחושבת</strong> — תכונה שנגזרת/מצטברת מתכונות אחרות (גיל מתוך תאריך לידה). לא ממירים אותה לטבלה — מחשבים אותה בשאילתא בעת הצורך.</li>
<li><strong>תכונה ריקה</strong> (NULL) — ערך לא ידוע או לא רלוונטי.</li>
</ul>

<h3>מפתחות בדיאגרמה</h3>
<ul>
<li><strong>מפתח על</strong> (Superkey) — תכונה או צירוף תכונות שמאפשר להבחין בין שתי ישויות שונות מאותו טיפוס.</li>
<li><strong>מפתח קביל</strong> (Candidate key) — מפתח-על מינימלי: אין בו תכונה מיותרת שאפשר להסיר ועדיין להישאר מפתח.</li>
<li><strong>מפתח ראשי</strong> (Primary key) — מפתח קביל שנבחר לייצג את הטיפוס; בדיאגרמה מסומן בקו תחתון.</li>
</ul>
<p>בסימון סכמות של האפליקציה מפתח ראשי מודגש בקו תחתון מלא: <span class="schema" dir="ltr">Student(<span class="pk">id</span>, name, age)</span></p>

<h3>קשרים ומקושרוּת</h3>
<ul>
<li><strong>טיפוס קשרים</strong> (Relationship type) — קושר בין שני טיפוסי ישויות או יותר (מעוין). <strong>דרגת הקשר</strong> = מספר הטיפוסים המשתתפים (בינארי, טרנארי…).</li>
<li><strong>יחס מקושרוּת</strong> (Cardinality ratio): <strong>1:1</strong>, <strong>1:N</strong> (אחד-לרבים) או <strong>N:M</strong> (רבים-לרבים).</li>
<li><strong>אילוץ השתתפות</strong> (Participation): <strong>מלאה/כוללת</strong> (קו כפול) — כל ישות מהטיפוס <em>חייבת</em> להשתתף בקשר; <strong>חלקית</strong> — יכולות להיות ישויות שאינן משתתפות.</li>
<li>מפתח של טיפוס קשרים: ב<strong>רבים-לרבים</strong> — צירוף המפתחות הראשיים של הטיפוסים המחוברים; ב<strong>רבים-לאחד</strong> — המפתח של צד ה"רבים" מספיק כמפתח קביל של הקשר.</li>
</ul>

<h3>ישויות חלשות</h3>
<ul>
<li>טיפוס ישויות <strong>חלש</strong> אינו יכול להתקיים בלי טיפוס ישויות <strong>שולט</strong> (חזק) שהוא תלוי בו — <strong>תלות קיום</strong>: אם נמחק ישות שולטת, יימחקו אוטומטית כל הישויות החלשות התלויות בה.</li>
<li>לטיפוס השולט יש <strong>מפתח</strong> מלא; לטיפוס החלש יש <strong>מזהה חלקי</strong> (Partial key / discriminator) בלבד — מסומן בקו תחתון מקווקו.</li>
<li>המפתח של הטיפוס החלש = הצירוף של המזהה החלקי שלו עם המפתח הראשי של הטיפוס השולט.</li>
</ul>
<p>למשל, <em>Dependent</em> (בן-משפחה של עובד) כישות חלשה של <em>Employee</em>: <span class="schema" dir="ltr">Dependent(<span class="pk">emp_ssn</span>, <span class="ppk">name</span>, age)</span> — כאשר <code>emp_ssn</code> מושאל מהטיפוס השולט (קו מלא) ו-<code>name</code> הוא המזהה החלקי (קו מקווקו).</p>

<h3>IS-A — הכללה והתמחות</h3>
<ul>
<li><strong>IS-A</strong> מקשר בין טיפוס-על (Superclass) לטיפוסי-משנה (Subclasses). טיפוס-המשנה <strong>יורש</strong> את כל תכונות טיפוס-העל ומוסיף תכונות ייחודיות לו.</li>
<li><strong>הכללה</strong> (Generalization) — טיפוס-העל הוא איחוד טיפוסי-המשנה (מלמטה למעלה).</li>
<li><strong>התמחות/הפרדה</strong> (Specialization) — פירוק טיפוס-העל לטיפוסי-משנה; ייתכנו ישויות בטיפוס-העל שלא ייוצגו באף טיפוס-משנה.</li>
<li><strong>הקבצה</strong> (Aggregation) — התייחסות לטיפוס קשרים שלם כאילו היה טיפוס ישויות, כדי לקשר אותו בקשר נוסף.</li>
</ul>
`
},
{
  id: "relational",
  title: "פרק 2 — המודל הרלציוני",
  html: `
<p>המודל הרלציוני (Codd) מייצג את הנתונים כאוסף של <strong>יחסים</strong> (טבלאות). זהו המודל הלוגי שאליו מומר ה-ERD, והבסיס לשפת SQL ולאלגברה הרלציונית.</p>

<h3>יחס, תבנית ומופע</h3>
<ul>
<li><strong>תבנית יחס / סכמה</strong> (Relation schema): <span class="schema" dir="ltr">R(A<sub>1</sub>, A<sub>2</sub>, …, A<sub>n</sub>)</span> — שם היחס ורשימת תכונותיו. לכל תכונה <strong>תחום</strong> (Domain) — קבוצת הערכים החוקיים שלה.</li>
<li><strong>יחס</strong> (Relation / instance): קבוצה של <strong>שורות</strong> (tuples). היחס הוא <strong>תת-קבוצה של המכפלה הקרטזית</strong> של תחומי התכונות.</li>
<li><strong>דרגת היחס</strong> (Degree) = מספר התכונות (עמודות); <strong>עוצמה</strong> (Cardinality) = מספר השורות.</li>
<li>אין חשיבות לסדר בין השורות, אך יש חשיבות לסדר התכונות בתוך השורה. מכיוון שיחס הוא קבוצה — <strong>אין שורות כפולות</strong>.</li>
</ul>

<h3>מפתחות</h3>
<ul>
<li><strong>מפתח על</strong> (Superkey) — קבוצת תכונות שערכן ייחודי לכל שורה.</li>
<li><strong>מפתח קביל</strong> (Candidate key) — מפתח-על מינימלי (אין תת-קבוצה שלו שהיא מפתח-על).</li>
<li><strong>מפתח ראשי</strong> (Primary key) — מפתח קביל שנבחר; שאר המפתחות הקבילים נקראים <strong>מפתחות חלופיים</strong>.</li>
<li><strong>מפתח זר</strong> (Foreign key) — תכונה ביחס אחד המפנה למפתח הראשי של יחס אחר, ובכך מקשרת ביניהם.</li>
</ul>

<h3>אילוצי שלמות</h3>
<ul>
<li><strong>אילוץ תחום</strong> — ערך כל תכונה חייב להיות מהתחום שלה.</li>
<li><strong>אילוץ מפתח</strong> — אין שתי שורות עם אותו ערך למפתח.</li>
<li><strong>שלמות ישות</strong> (Entity integrity) — ערך המפתח הראשי לעולם אינו <code>NULL</code>.</li>
<li><strong>שלמות התייחסותית</strong> (Referential integrity) — כל ערך של מפתח זר חייב להופיע כמפתח ראשי ביחס המפנה, או להיות <code>NULL</code>.</li>
</ul>

<h3>המרת ERD למודל היחסים</h3>
<p>מיפוי שיטתי (כללי דף העזר):</p>
<ul>
<li><strong>כלל א' — טיפוס ישויות חזק:</strong> טבלה נפרדת עם עמודה לכל תכונה; המפתח הראשי = מפתח הישות.</li>
<li><strong>כלל ב' — טיפוס ישויות חלש:</strong> טבלה עם עמודה לכל תכונה, בתוספת המפתח הראשי של הטיפוס השולט (כמפתח זר). המפתח = המזהה החלקי + מפתח השולט.</li>
<li><strong>כלל ג' — תכונה מרובת-ערכים:</strong> טבלה נפרדת עם מפתח הישות + עמודת הערך (מפתח = שניהם יחד).</li>
<li><strong>כלל ד' — תכונה מורכבת:</strong> עמודה נפרדת לכל מרכיב.</li>
<li><strong>כלל ה' — קשר N:M:</strong> טבלה נפרדת עם המפתחות הראשיים של המשתתפים + תכונות הקשר.</li>
<li><strong>כלל ו' — קשר 1:N:</strong> או טבלה נפרדת לקשר, או (מקובל) הטמעת מפתח צד ה"אחד" כמפתח זר בטבלת צד ה"רבים".</li>
<li><strong>IS-A:</strong> אחת משלוש דרכים — (1) טבלה אחת לטיפוס-העל עם איחוד כל התכונות; (2) טבלה לכל טיפוס-משנה היורשת את תכונות העל; (3) טבלה לעל + טבלה לכל משנה שיורשת רק את המפתח.</li>
</ul>

<h3>דוגמה מעובדת — מיפוי סכֵמה קטנה</h3>
<p>נתון ERD: עובד <em>Employee</em>(ssn, name, salary) עם תכונת טלפונים מרובת-ערכים; מחלקה <em>Department</em>(dnum, dname); קשר <strong>1:N</strong> "עובד במחלקה"; וישות חלשה <em>Dependent</em>(name, age) התלויה בעובד. היחסים המתקבלים:</p>
<div class="schema" dir="ltr" style="display:block">
<span class="schema" dir="ltr">Employee(<span class="pk">ssn</span>, name, salary, dnum)</span><br>
<span class="schema" dir="ltr">Department(<span class="pk">dnum</span>, dname)</span><br>
<span class="schema" dir="ltr">Emp_Phone(<span class="pk">ssn</span>, <span class="pk">phone</span>)</span><br>
<span class="schema" dir="ltr">Dependent(<span class="pk">ssn</span>, <span class="pk">name</span>, age)</span>
</div>
<p>ב-<code>Employee</code> נוסף <code>dnum</code> כמפתח זר (כלל ו', צד הרבים); הטלפונים עברו לטבלה נפרדת (כלל ג'); ל-<code>Dependent</code> מפתח מורכב <code>ssn+name</code> ו-<code>ssn</code> הוא מפתח זר ל-<code>Employee</code> (כלל ב').</p>
`
},
{
  id: "sql",
  title: "פרק 3 — SQL",
  html: `
<p>SQL היא שפה <strong>דקלרטיבית</strong> לבסיסי נתונים רלציוניים: מתארים <em>מה</em> רוצים לקבל ולא <em>איך</em> לחשב. נהוג לחלק אותה ל-<strong>DDL</strong> (הגדרת נתונים) ו-<strong>DML</strong> (שליפה ועדכון נתונים).</p>

<h3>DDL — הגדרת מבנה</h3>
<ul>
<li><code>CREATE TABLE</code> — הגדרת טבלה, טיפוסי עמודות ואילוצים: <code>PRIMARY KEY</code>, <code>FOREIGN KEY … REFERENCES</code>, <code>NOT NULL</code>, <code>UNIQUE</code>, <code>CHECK</code>, <code>DEFAULT</code>.</li>
<li><code>ALTER TABLE</code> — הוספה/שינוי עמודות ואילוצים; <code>DROP TABLE</code> — מחיקת טבלה.</li>
</ul>

<h3>שאילתת SELECT הבסיסית</h3>
<ul>
<li>שלד: <code>SELECT</code> עמודות <code>FROM</code> טבלאות <code>WHERE</code> תנאי.</li>
<li><code>DISTINCT</code> — בא אחרי <code>SELECT</code> ומנפה שורות כפולות מהתוצאה.</li>
<li><code>AS</code> — מתן שם חדש (כינוי) לעמודה או לטבלה.</li>
<li><code>LIKE</code> עם תווים כלליים: <code>%</code> = רצף תווים כלשהו, <code>_</code> = תו בודד.</li>
<li><code>ORDER BY</code> — מיון התוצאה: <code>ASC</code> (עולה, ברירת מחדל) או <code>DESC</code> (יורד).</li>
</ul>

<h3>צירופים (Joins)</h3>
<ul>
<li><strong>צירוף מרומז</strong>: מונים כמה טבלאות ב-<code>FROM</code> ומקשרים ב-<code>WHERE</code> על שוויון מפתחות.</li>
<li><code>INNER JOIN … ON</code>, <code>NATURAL JOIN</code> (על תכונות משותפות), וצירוף-עצמי (self-join) באמצעות <strong>משתני שורה</strong> (כינויי טבלה).</li>
</ul>

<h3>הקבצה (Aggregation)</h3>
<ul>
<li>פונקציות הקבצה: <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>.</li>
<li><code>GROUP BY</code> — חלוקת השורות לקבוצות לפי ערך; פונקציית ההקבצה מחושבת לכל קבוצה.</li>
<li><code>HAVING</code> — תנאי הנבדק על כל קבוצה בנפרד (בניגוד ל-<code>WHERE</code> שמסנן שורות בודדות <em>לפני</em> ההקבצה).</li>
<li><strong>סדר הביצוע הלוגי:</strong> <code>FROM</code> ← <code>WHERE</code> ← <code>GROUP BY</code> ← <code>HAVING</code> ← <code>SELECT</code> ← <code>ORDER BY</code>.</li>
</ul>

<h3>תת-שאילתות ופעולות קבוצה</h3>
<ul>
<li>השוואת ערך לקבוצה: <code>IN</code> / <code>NOT IN</code>, <code>= ANY</code> (שקול ל-<code>IN</code>), <code>&gt; ANY</code>, <code>&gt; ALL</code>, <code>&lt;&gt; ALL</code> (שקול ל-<code>NOT IN</code>).</li>
<li><code>EXISTS</code> / <code>NOT EXISTS</code> — בדיקת קיום שורות בתת-שאילתא (נפוץ בתת-שאילתא <em>מתואמת</em>).</li>
<li>פעולות קבוצה בין תוצאות שאילתא: <code>UNION</code> (איחוד), <code>INTERSECT</code> (חיתוך), <code>MINUS</code>/<code>EXCEPT</code> (הפרש).</li>
</ul>

<h3>סמנטיקת NULL</h3>
<ul>
<li>SQL עובד בלוגיקה <strong>תלת-ערכית</strong>: True / False / <strong>Unknown</strong>.</li>
<li>כל השוואה מול <code>NULL</code> מחזירה <strong>Unknown</strong>; לכן משתמשים ב-<code>IS NULL</code> / <code>IS NOT NULL</code> ולא ב-<code>= NULL</code>.</li>
<li>שורה נכללת בתוצאה רק אם תנאי ה-<code>WHERE</code> הוא <strong>True</strong> (לא Unknown).</li>
<li>פונקציות הקבצה <strong>מתעלמות</strong> מ-<code>NULL</code> — למעט <code>COUNT(*)</code> שסופרת את כל השורות.</li>
</ul>

<h3>דוגמה מעובדת</h3>
<p>על היחסים <span class="schema" dir="ltr">Employee(<span class="pk">ssn</span>, name, salary, dnum)</span> ו-<span class="schema" dir="ltr">Department(<span class="pk">dnum</span>, dname)</span>:</p>
<p><strong>1. שם כל מחלקה ומספר עובדיה, רק למחלקות עם יותר מ-5 עובדים:</strong></p>
<pre><code>SELECT   D.dname, COUNT(*) AS num_emp
FROM     Employee E, Department D
WHERE    E.dnum = D.dnum
GROUP BY D.dname
HAVING   COUNT(*) &gt; 5;</code></pre>
<p><strong>2. שמות המחלקות שאין בהן אף עובד (תת-שאילתא מתואמת):</strong></p>
<pre><code>SELECT dname
FROM   Department D
WHERE  NOT EXISTS ( SELECT *
                    FROM   Employee E
                    WHERE  E.dnum = D.dnum );</code></pre>
`
},
{
  id: "algebra",
  title: "פרק 4 — אלגברה רלציונית",
  html: `
<p>האלגברה הרלציונית היא שפת שאילתות <strong>פרוצדורלית</strong>: כל פעולה מקבלת יחס אחד או שניים ומחזירה יחס. מכיוון שהפלט הוא תמיד יחס, אפשר <strong>להרכיב</strong> פעולות זו בתוך זו — זהו הבסיס לבניית שאילתות מורכבות.</p>

<h3>פעולות יסוד חד-מקומיות</h3>
<ul>
<li><strong>בחירה</strong> <span class="alg" dir="ltr">σ</span> (Selection) — מסננת <em>שורות</em> לפי תנאי. תנאים אפשר לחבר ב-<span class="alg" dir="ltr">∧</span> (וגם), <span class="alg" dir="ltr">∨</span> (או), <span class="alg" dir="ltr">¬</span> (לא):
  <div class="alg alg-block" dir="ltr">σ<sub>age&gt;18 ∧ dnum=5</sub>(Employee)</div></li>
<li><strong>היטל</strong> <span class="alg" dir="ltr">π</span> (Projection) — בוחר <em>עמודות</em> ומנפה כפילויות בתוצאה:
  <div class="alg alg-block" dir="ltr">π<sub>name, salary</sub>(Employee)</div></li>
<li><strong>שינוי שם</strong> <span class="alg" dir="ltr">ρ</span> (Rename) — יוצר עותק של יחס ונותן לו (ולתכונותיו) שם חדש; חיוני לצירוף-עצמי:
  <div class="alg alg-block" dir="ltr">ρ<sub>E2</sub>(Employee)</div></li>
</ul>

<h3>פעולות קבוצה</h3>
<p>מוגדרות רק בין <strong>יחסים תואמים</strong> (Union-compatible): אותו מספר עמודות, ותחומים תואמים בהתאמה.</p>
<ul>
<li><span class="alg" dir="ltr">R ∪ S</span> — <strong>איחוד</strong>: כל השורות שבאחד היחסים לפחות (בלי כפילויות).</li>
<li><span class="alg" dir="ltr">R ∩ S</span> — <strong>חיתוך</strong>: השורות שבשני היחסים.</li>
<li><span class="alg" dir="ltr">R − S</span> — <strong>הפרש</strong>: השורות שב-R ואינן ב-S.</li>
</ul>

<h3>מכפלה קרטזית וצירוף טבעי</h3>
<ul>
<li><span class="alg" dir="ltr">R X S</span> — <strong>מכפלה קרטזית</strong>: כל הזוגות האפשריים של שורה מ-R עם שורה מ-S. דרגת התוצאה = סכום הדרגות.</li>
<li><span class="alg" dir="ltr">R ⊗ S</span> — <strong>צירוף טבעי</strong>: מכפלה קרטזית מסוננת לזוגות בעלי <em>אותם ערכים בתכונות המשותפות</em>, כאשר העמודה המשותפת נשמרת <strong>פעם אחת</strong> בלבד. שקול ל-<span class="alg" dir="ltr">π<sub>…</sub>(σ<sub>R.A=S.A</sub>(R X S))</span>.</li>
</ul>

<h3>חילוק</h3>
<p><span class="alg" dir="ltr">R ÷ S</span> — <strong>חילוק</strong> (Division) עונה על שאלות מסוג "<em>לכל</em>". תבנית המחלק S חייבת להיות תת-קבוצה ממש של תבנית המחולק R. תבנית התוצאה = תכונות R פרט לתכונות S. שורה נכללת בתוצאה אם צירופה עם <strong>כל</strong> שורות S מופיע ב-R.</p>

<h3>דוגמה מעובדת — חילוק</h3>
<p>נתונים <strong>Takes</strong>(student, course) ו-<strong>AllCourses</strong>(course). נחפש את הסטודנטים שלמדו את <em>כל</em> הקורסים:</p>
<div style="display:flex;gap:1.2rem;flex-wrap:wrap;align-items:flex-start">
<table style="width:auto">
<thead><tr><th>student</th><th>course</th></tr></thead>
<tbody>
<tr><td dir="ltr">S1</td><td dir="ltr">DB</td></tr>
<tr><td dir="ltr">S1</td><td dir="ltr">OS</td></tr>
<tr><td dir="ltr">S2</td><td dir="ltr">DB</td></tr>
<tr><td dir="ltr">S3</td><td dir="ltr">DB</td></tr>
<tr><td dir="ltr">S3</td><td dir="ltr">OS</td></tr>
</tbody>
</table>
<table style="width:auto">
<thead><tr><th>course</th></tr></thead>
<tbody>
<tr><td dir="ltr">DB</td></tr>
<tr><td dir="ltr">OS</td></tr>
</tbody>
</table>
<table style="width:auto">
<thead><tr><th>תוצאה: student</th></tr></thead>
<tbody>
<tr><td dir="ltr">S1</td></tr>
<tr><td dir="ltr">S3</td></tr>
</tbody>
</table>
</div>
<div class="alg alg-block" dir="ltr">Takes ÷ AllCourses = { S1, S3 }</div>
<p>S1 ו-S3 למדו גם DB וגם OS; S2 למד רק DB ולכן אינו בתוצאה.</p>

<h3>הרכבת שאילתות</h3>
<p>שאילתא ריאלית נבנית מהרכבה של הפעולות. למשל, "שמות הסטודנטים שלמדו את הקורס DB":</p>
<div class="alg alg-block" dir="ltr">π<sub>name</sub>( Student ⊗ σ<sub>course="DB"</sub>(Takes) )</div>
<p>תחילה <span class="alg" dir="ltr">σ</span> מסננת את שורות ה-DB מ-<code>Takes</code>, <span class="alg" dir="ltr">⊗</span> מצרף אותן ל-<code>Student</code> לפי מזהה הסטודנט, ולבסוף <span class="alg" dir="ltr">π</span> משאיר רק את השם.</p>
`
},
{
  id: "normalization",
  title: "פרק 5 — תלויות פונקציונליות ונרמול",
  html: `
<p>תלויות פונקציונליות (FDs) הן אילוצים המבטאים כיצד ערך של קבוצת תכונות קובע ערך של תכונות אחרות. הן הבסיס למציאת מפתחות ולתהליך ה<strong>נרמול</strong>, שמטרתו לפרק תבניות כדי למנוע כפילויות מיותרות ואנומליות עדכון.</p>

<h3>תלות פונקציונלית</h3>
<p>ביחס R, מתקיים <span class="alg" dir="ltr">X → Y</span> ("Y תלוי פונקציונלית ב-X") אם לכל ערך של X מתאים ערך <strong>ייחודי</strong> של Y בכל מופע חוקי של R. תלות היא <strong>טריוויאלית</strong> אם <span class="alg" dir="ltr">Y ⊆ X</span>.</p>

<h3>כללי ההיסק (ארמסטרונג)</h3>
<ul>
<li><strong>רפלקסיביות:</strong> אם <span class="alg" dir="ltr">Y ⊆ X</span> אז <span class="alg" dir="ltr">X → Y</span>.</li>
<li><strong>הכלה (הרחבה):</strong> אם <span class="alg" dir="ltr">X → Y</span> אז <span class="alg" dir="ltr">WX → WY</span>.</li>
<li><strong>טרנזיטיביות:</strong> אם <span class="alg" dir="ltr">X → Y</span> ו-<span class="alg" dir="ltr">Y → Z</span> אז <span class="alg" dir="ltr">X → Z</span>.</li>
</ul>
<p>שלושת הכללים <strong>נאותים</strong> (לא ניתן להסיק בעזרתם תלות שגויה) ו<strong>שלמים</strong> (ניתן להסיק בעזרתם את כל התלויות שבסגור). מהם נגזרים כללי עזר:</p>
<ul>
<li><strong>איחוד:</strong> אם <span class="alg" dir="ltr">X → Y</span> ו-<span class="alg" dir="ltr">X → Z</span> אז <span class="alg" dir="ltr">X → YZ</span>.</li>
<li><strong>פירוק:</strong> אם <span class="alg" dir="ltr">X → YZ</span> אז <span class="alg" dir="ltr">X → Y</span> וגם <span class="alg" dir="ltr">X → Z</span>.</li>
<li><strong>טרנזיטיביות למחצה:</strong> אם <span class="alg" dir="ltr">X → Y</span> ו-<span class="alg" dir="ltr">WY → Z</span> אז <span class="alg" dir="ltr">XW → Z</span>.</li>
</ul>

<h3>סגור F<sup>+</sup> וסגור תכונות X<sup>+</sup></h3>
<ul>
<li><span class="alg" dir="ltr">F<sup>+</sup></span> — <strong>הסגור של F</strong>: כל התלויות הניתנות להסקה מ-F.</li>
<li><span class="alg" dir="ltr">X<sup>+</sup></span> — <strong>סגור קבוצת התכונות X</strong>: קבוצת התכונות המרבית ש-X גורר. תמיד <span class="alg" dir="ltr">X ⊆ X<sup>+</sup></span>.</li>
<li><strong>אלגוריתם ל-</strong><span class="alg" dir="ltr">X<sup>+</sup></span>: אתחל <span class="alg" dir="ltr">cx = X</span>; כל עוד קיימת ב-F תלות <span class="alg" dir="ltr">Y → Z</span> עם <span class="alg" dir="ltr">Y ⊆ cx</span> — הוסף את Z ל-cx; החזר את cx.</li>
<li>כדי לבדוק אם <span class="alg" dir="ltr">X → Y</span> שייכת ל-F<sup>+</sup>: בדוק אם <span class="alg" dir="ltr">Y ⊆ X<sup>+</sup></span>.</li>
</ul>

<h3>מציאת מפתחות מתוך FDs</h3>
<ul>
<li>X הוא <strong>מפתח-על</strong> אם <span class="alg" dir="ltr">X<sup>+</sup></span> = כל תכונות היחס.</li>
<li>X הוא <strong>מפתח קביל</strong> אם הוא מפתח-על מינימלי (אף תת-קבוצה שלו אינה מפתח-על).</li>
<li>תכונה השייכת למפתח קביל כלשהו נקראת <strong>תכונת מפתח</strong> (Prime); אחרת — <strong>לא-מפתח</strong> (Non-prime).</li>
</ul>

<h3>דוגמה מעובדת — סגור ומפתח</h3>
<p>נתון <span class="schema" dir="ltr">R(A, B, C, D, E, F)</span> עם <span class="alg" dir="ltr">F = { A→BC, E→CF, B→E, CD→EF }</span>. נחשב את <span class="alg" dir="ltr">(AD)<sup>+</sup></span>:</p>
<div class="alg alg-block" dir="ltr">AD → (A→BC) → ABCD → (B→E) → ABCDE → (E→CF) → ABCDEF</div>
<p>מכיוון ש-<span class="alg" dir="ltr">(AD)<sup>+</sup></span> = כל התכונות, <strong>AD הוא מפתח-על</strong>. הוא גם מינימלי (בדיקה: <span class="alg" dir="ltr">A<sup>+</sup>=ABCEF</span> חסר D, ו-<span class="alg" dir="ltr">D<sup>+</sup>=D</span>), ולכן <strong>AD הוא מפתח קביל</strong>.</p>

<h3>כיסוי מינימלי (קנוני)</h3>
<p>קבוצת תלויות <span class="alg" dir="ltr">Fc</span> היא כיסוי מינימלי של F אם: (1) <span class="alg" dir="ltr">Fc<sup>+</sup> = F<sup>+</sup></span>; (2) אין בה תכונה עודפת בצד שמאל; (3) אין שתי תלויות עם אותו צד שמאל (איחוד), וכל צד ימין הוא תכונה בודדת. תכונה A <strong>עודפת בצד שמאל</strong> בתלות <span class="alg" dir="ltr">X→Y</span> אם ניתן להסיק <span class="alg" dir="ltr">(X−A)→Y</span>.</p>

<h3>צורות נורמליות</h3>
<table>
<thead><tr><th>צורה</th><th>התנאי</th></tr></thead>
<tbody>
<tr><td><strong>1NF</strong></td><td>כל הערכים אטומיים (אין תכונות מרובות-ערכים או מורכבות בתוך תא).</td></tr>
<tr><td><strong>2NF</strong></td><td>1NF, ואין תלות <em>חלקית</em> של תכונת לא-מפתח בחלק ממפתח קביל (רלוונטי רק למפתח מורכב).</td></tr>
<tr><td><strong>3NF</strong></td><td>לכל <span class="alg" dir="ltr">X→Y</span> ב-F<sup>+</sup>: התלות טריוויאלית, <em>או</em> X מפתח-על, <em>או</em> כל תכונה ב-<span class="alg" dir="ltr">(Y−X)</span> היא תכונת מפתח.</td></tr>
<tr><td><strong>BCNF</strong></td><td>לכל <span class="alg" dir="ltr">X→Y</span> לא-טריוויאלית ב-F<sup>+</sup>: X הוא מפתח-על. (מחמיר יותר מ-3NF.)</td></tr>
</tbody>
</table>

<h3>פירוק</h3>
<ul>
<li><strong>פירוק משמר מידע</strong> (Lossless-join) — ניתן לשחזר את R המקורי מ-<span class="alg" dir="ltr">R1 ⊗ R2</span>. תנאי מספיק: <span class="alg" dir="ltr">(R1 ∩ R2) → R1</span> <em>או</em> <span class="alg" dir="ltr">(R1 ∩ R2) → R2</span>.</li>
<li><strong>פירוק משמר תלויות</strong> — ניתן לבדוק את כל התלויות המקוריות על התבניות שלאחר הפירוק: <span class="alg" dir="ltr">(F1 ∪ … ∪ Fn)<sup>+</sup> = F<sup>+</sup></span>.</li>
<li><strong>פירוק ל-BCNF:</strong> מוצאים תלות <span class="alg" dir="ltr">X→Y</span> המפרה BCNF ומפרקים ל-<span class="alg" dir="ltr">R1(X, Y)</span> ו-<span class="alg" dir="ltr">R2(R − Y)</span>. הפירוק תמיד משמר מידע, אך <em>לא תמיד</em> משמר תלויות. לעומת זאת, ל-3NF תמיד קיים פירוק משמר מידע <em>וגם</em> משמר תלויות.</li>
</ul>

<h3>דוגמה מעובדת — פירוק ל-BCNF</h3>
<p>נתון <span class="schema" dir="ltr">R(A, B, C)</span> עם <span class="alg" dir="ltr">F = { A→B, B→C }</span>. המפתח הקביל היחיד הוא A. התלות <span class="alg" dir="ltr">B→C</span> מפרה BCNF כי B אינו מפתח-על. נפרק לפיה:</p>
<div class="alg alg-block" dir="ltr">R1(B, C)   |   R2(A, B)</div>
<p><span class="alg" dir="ltr">R1 ∩ R2 = {B}</span>, ומכיוון ש-<span class="alg" dir="ltr">B→C</span> מתקיים ב-R1 — הפירוק <strong>משמר מידע</strong>. שתי התבניות ב-BCNF, ואיחוד התלויות <span class="alg" dir="ltr">{A→B, B→C}</span> שקול ל-F — כאן הפירוק גם <strong>משמר תלויות</strong>. (הערה: אילו הייתה במקום זאת <span class="alg" dir="ltr">C→B</span> עם המפתחות AB, AC — פירוק BCNF היה מאבד את התלות, ולכן היינו מסתפקים ב-3NF.)</p>
`
}
];
window.LEARN_META = { generated: "2026-07-19", chapters: 5, images: 0 };
