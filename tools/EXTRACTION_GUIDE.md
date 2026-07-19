# Exam extraction guide (for M2 — one exam per agent)

You are extracting ONE Databases exam into `tools/raw/<CODE>.json` for a Hebrew MCQ quiz app.
The **gold template is `tools/raw/25C-A.json`** — open it and mirror its structure exactly.
The app dir is `C:\Users\Adir\Desktop\Coding\Dev\databases-quiz`. Exams live under the course
folder `…\מערכות בסיסי נתונים\מבחנים\<year>\`.

## NON-NEGOTIABLE RULES
1. **Character-exact.** A single wrong SQL token flips the answer. If you are not 100% sure a
   code/notation token was captured verbatim, DO NOT GUESS — add it to your `askAdir` list and
   either crop that option as an image or omit the question. Never fabricate a question, option,
   answer, diagram, table, or SQL snippet.
2. **Answers come only from the real solution file** (there is NO "form-0 / first answer" rule).
   Read the correct **letter** per question from the solution PDF/DOCX (marked bubble, a
   letter table, or a worked solution that states the chosen option). If a question has no clear
   key, DO NOT include it — list it under `askAdir`.
3. When in doubt, flag — quality over coverage.

## STEPS
1. Render exam + solution to PNGs:
   `python tools/render_pdf.py "<full path to exam.pdf>" <CODE> --dpi 200`
   `python tools/render_pdf.py "<full path to solution.pdf>" <CODE>-SOL --dpi 200`
   (docx solutions: read via `python -c "import docx; ..."` or convert; the accepted-answers
   docx lists question→letter.)
2. Read EVERY page image (skip cover + Zipgrade bubble sheet). Transcribe stems, options,
   shared context blocks. For fine detail (ERD lines, underlines, tiny sub/superscripts) re-render
   that page at `--dpi 400 --pages N` and crop with `python tools/crop.py <src.png> <name> --box L T R B`
   or a Pillow crop; VIEW the crop at native resolution before trusting it.
3. Cross-check: independently reason out SQL/RA/FD answers where you can and confirm they match
   the solution's letter. Mismatch → re-read; if still stuck, flag it.
4. Write `tools/raw/<CODE>.json`. Prefer generating it with a small Python script (json.dumps,
   ensure_ascii=False) so Hebrew/quotes/newlines/Unicode escape correctly.
5. Run `python tools/validate.py` and fix any problems for YOUR file. DO NOT run build_questions.py.
6. Return a concise report: exam label/date, #questions, per-part counts, answer-key source,
   confidence, and the full `askAdir` list (with exact page + question numbers).

## DATA MODEL  (window.DB_QUIZ = {contexts, questions}; per-exam file below)
```
{ "examCode":"<CODE>", "examLabel":"<Hebrew label>", "year":<int>, "examDate":"d.m.yyyy",
  "course":"61303",
  "contexts": { "<localId>": { ...see kinds... } },
  "questions": [ { "num":1, "part":"א|ב|ג|ד", "topic":"erd|sql|relalg|fd_norm|rel_model",
    "contextId":"<localId or omit>", "question":"<stem>",
    "options":[ {"id":"a","type":"...","value":"..."} , ... ],  // ids a,b,c,d,e = exam letters
    "correctId":"<letter>", "acceptedIds":["a","c"]?,           // acceptedIds only if >1 accepted
    "answerSource":"solution-pdf|accepted-answers-docx|combined-pdf|answers-pdf",
    "explanation":"<short Hebrew why>", "confidence":"high|med|low" } ] }
```
- `topic`: ERD part→`erd`, SQL part→`sql`, relational-algebra part→`relalg`, FD/normalization
  part→`fd_norm`. Match the exam's own section headers (חלק א/ב/ג/ד).
- **option `type`**: `text` (Hebrew/plain), `code` (SQL — verbatim, `lang:"sql"`, `\n` newlines,
  NO Hebrew inside), `schema` (relation schema, see markup), `algebra` (RA/FD notation), `image`
  (crop path under images/exams/). Distractor "כל התשובות האחרות אינן נכונות." = plain text.

## RENDERING MARKUP (rendered by algebra.js / richText — write these literally in values)
- **Algebra/FD** (`type:"algebra"` and inside `$…$`/`$$…$$` in stems): real Unicode operators
  **Π σ ⊗ ÷ ∧ ∨ ¬ → ∩ ∪ − ρ ×**. Keep the EXAM's glyphs: **`X` = Cartesian product, `⊗` = natural
  join**. Subscript `_{…}`, superscript `^{…}` (closures: `F1^{+}`). A bare `_` stays literal, so
  `student_id`, `is_zoom` are fine. Hebrew inside a condition is auto bidi-isolated — just type it,
  e.g. `σ_{student.city = "חולון" ∧ …}`.
- **Schema** (`type:"schema"`, and context relations): `[u]attr[/u]` = solid underline (key),
  `[d]attr[/d]` = dashed underline (weak-entity discriminator / partial key). e.g.
  `Users([u]user_id[/u], first_name, …)` or `E ([d]DiscE_1[/d], PropE_1, [u]KeyC[/u])`.
- **Stems/explanations** via richText: `` `code token` `` for inline LTR tokens (e.g. `` `A-R1-B` ``,
  `` `progress = 0` ``, `` `'Data Science'` ``); `$inline algebra$`; `$$display algebra$$`
  (put a display RA/FD expression on its own line); `**bold**`.

## CONTEXT KINds (shared blocks referenced by contextId)
- **image** (ERD): `{ "kind":"image", "title":"…", "image":"images/exams/<CODE>-erd.png",
  "caption":"…" }`. ERDs usually print 3 identical copies side-by-side — crop ONE copy. If the
  diagram is on a black background, INVERT it for readability (`crop.py`/Pillow `ImageOps.invert`).
- **schema** (relation templates, e.g. SQL/RA sections): `{ "kind":"schema", "title":"…",
  "intro":"…"?, "relations":[ {"schema":"Name([u]pk[/u], a, b)", "meaning":"Hebrew; `field` tokens ok"} ],
  "note":"**הערות:** …"? }`.
- **relations** (DATA tables, e.g. R/S for algebra): `{ "kind":"relations", "title":"…",
  "tables":[ {"name":"R","columns":["A","B","C"],"rows":[[2,2,3],…]} ] }`.
- **fd** (given relation + FD set): `{ "kind":"fd", "title":"…",
  "algebra":["R = (A, B, C, D, E)", "F1 = {A → B, C → BD}"] }` (each string = a display block).
- **text**: `{ "kind":"text", "title":"…", "text":"…" }`.

Context `<localId>` is namespaced by build (`<CODE>-<localId>`), so keep local ids short
(e.g. `erd`, `sql`, `ra`, `fd`, `q16`). Only create a context when ≥1 question shares it; put a
question's own one-off relation/FDs inline in the stem via `$…$` instead.

## GOTCHAS
- Exams are Zipgrade MCQ (A–E), ~20–21 closed questions, 3 hours, course 61303. Sections are
  ERD / SQL / relational-algebra / FD-normalization (order & counts vary per exam).
- RA selection conditions often contain Hebrew city/name literals — that's why we render algebra
  ourselves (NOT KaTeX). Just type the Hebrew in the value.
- If an option's correctness hinges on an underline you can't read, re-render at 400 DPI and crop.
- If two answers were officially accepted (post-appeal note in the key), set `acceptedIds` to both
  and put correctId = the first; copy the official note into `explanation`.
- `answerSource`: 1-page/late key file = `solution-pdf`; a letter-only key = `answers-pdf`;
  a solution merged into the exam body = `combined-pdf`; the 2024 accepted-answers docx =
  `accepted-answers-docx`.
