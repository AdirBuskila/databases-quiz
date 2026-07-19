# Build plan — Databases MCQ Quiz App

Phase 0 deliverable. Mirrors the data-science-quiz app, extended for the richer
Databases exams. This doc is the source of truth and the resume point.

## Approved decisions (from brainstorming)
- **Location:** `C:\Users\Adir\Desktop\Coding\Dev\databases-quiz` (sibling of the DS app).
- **Rendering:** *hybrid* — SQL as real LTR highlighted code, relational algebra via
  vendored-offline **KaTeX**, R/S & schema as HTML tables; image-crop / "ask-Adir" only as
  fallback when a token can't be captured character-exact.
- **Sequencing:** *vertical slice first* — build the renderer, extract ONE flagship exam
  end-to-end, get sign-off, then scale.
- **Bank scope v1:** dated per-year 2019+ exam↔solution pairs; mine the merged/sample
  collections for extra 2019+ questions in a later pass.

## Architecture
Static, no-CDN, `file://`-friendly, GitHub-Pages-ready (same as DS). Runtime: `index.html`,
`styles.css`, `app.js`, `learn.js`, `questions.js`, `images/`, plus vendored `katex/` and a
self-contained `sql-highlight.js`. Pipeline in `tools/` (Python + Node), per-exam raw JSON in
`tools/raw/`.

## Data model (extended)
`window.DB_QUIZ = { meta, contexts, questions }`
- **contexts[id]**: `{ kind: erd|schema|relations|fd|text|image, title, image?, caption?,
  tables?:[{name,columns,rows?,pk?}], math?, text?, html? }` — shared block rendered above
  the questions that reference it.
- **questions[]**: `{ id, examCode, examLabel, year, part(א/ב/ג/ד), topic, topicLabel,
  question, contextId?, options:[{id,type,value,lang?}], correctId, official, answerSource,
  explanation, source, confidence }`.
  - `options` are **objects**; `type` ∈ `text | code | math | image`.
  - answer stored as **`correctId`** (stable option id) → shuffle & grade by id.
  - `topic` ∈ `erd | sql | relalg | fd_norm | rel_model`.
  - `answerSource` ∈ `solution-pdf | accepted-answers-docx | combined-pdf | answers-pdf |
    derived`; `official` = derived from a real key (anything but `derived`).

## Renderer (app.js)
- Context block above the stem (image w/ lightbox · quiz-side LTR tables · KaTeX · FD/text).
- `optionHtml()` switches on type: text (RTL, or LTR-isolated when Hebrew-free) · code
  (`<pre dir="ltr">` + SQL highlight) · math (KaTeX) · image.
- Stem/explanation via `richText()` (escape + inline `$…$` KaTeX).
- Shuffle by option id; grade by `correctId`. Part filter + per-part results breakdown.

## Extraction methodology (per exam)
1. `render_pdf.py` — exam **and** solution PDF → `tools/raw/<code>/page-NN.png` (~200 DPI).
2. Read pages visually; transcribe stems, options, shared contexts.
3. SQL/code captured **character-exact**; anything uncertain → `crop.py` image option or
   the **ask-Adir** list. Never guess.
4. Crop ERD diagrams, schema, R/S tables when cleaner than re-typing.
5. Answers from the solution PDF → `correctId`; `2024 מועד א` uses the accepted-answers docx.
6. `tools/raw/<code>.json` → `build_questions.py` → `questions.json` (+ `.js`). Dedup, tag.

## Milestones
- **M0 — Scaffold + renderer.** ✅ DONE.
- **M1 — Vertical slice.** ✅ DONE & VERIFIED (2026-07-16). Flagship `25C-A` extracted (20 Q:
  ERD 4 / SQL 8 / RA 4 / FD-norm 4), all answers from the official key PDF (all `official`).
  Added `algebra.js` (self-rendered RA/FD notation — KaTeX can't do Hebrew-in-conditions), the
  `schema` + `algebra` option types, `[u]`/`[d]` key underlines, `acceptedIds` (Q5 dual A+C),
  richText `$$…$$`/`$…$`/`` `code` ``/`**bold**`. Proven in-browser via `tools/verify_25C-A.js`:
  every render path, both themes, desktop + mobile (no overflow), zero JS errors. Adir opted to
  keep building past the approval stop; ask-Adir items still open (below).
- **M2 — Scale.** ✅ DONE. All 10 in-scope 2019+ exams extracted → **206 questions across 10 exams**
  (25C-A, 25B-A, 25S-B, 24B-A[docx form-000], 23B-A, 23B-A2, 22B-A, 21B-A, 21B-C[student soln], 21S-B).
  19A-A excluded (open-ended). Added a **NoSQL** topic/part (ה) for the sections found in 22B-A & 23B-A2.
  22B-A + 24B-A extracted in the foreground (API instability killed background agents mid-run three times);
  the last three via crash-safe incremental-write agents once the API stabilised. See `docs/format_triage.md`.
- **M3 — Learn mode.** ✅ DONE. `learn.js` = 5 chapters (ERD / relational model / SQL / relational algebra /
  FD-normalization), grounded in `דף עזר 2016.pdf` (the notation authority) + standard course material,
  using the app's algebra/schema HTML. Validated (parses, renders).
- **M4 — Verify + report.** ✅ DONE. `validate.py` 0 problems · `smoke.js` PASSED (0 integrity, 0 id-shuffle
  scoring mismatches) · `verify_25C-A.js` render pass on exemplars of every path, both themes, desktop +
  mobile (no overflow, no JS errors, all image assets present). Counts per topic/exam/part below; ask-Adir
  list in `docs/format_triage.md`.

## Renderer (M1 additions — see also `algebra.js`)
- **`algebra.js`**: `renderAlgebra(src, display)` + `renderSchema(src)`. Themeable, offline,
  Hebrew-safe (KaTeX vendored but now UNUSED — candidate to drop at M4). Markup: Unicode ops
  `Π σ ⊗ ÷ ∧ →`, `_{}`/`^{}` sub/superscripts, exam glyphs kept (`X`=Cartesian, `⊗`=natural join);
  schema `[u]key[/u]` solid / `[d]partial[/d]` dashed underline.
- Option types now `text | code | math | image | algebra | schema`; question `acceptedIds[]`
  grades chosen∈set. ERD assets: crop one of the 3 printed copies, invert for readability.

## In-scope exams & solution pairing (2019+)
| Year | Sitting | Exam | Solution | Note |
|---|---|---|---|---|
| 2025 | סמ ג מועד א | ✓ | `סמסטר ג מועד א - פתרונות.pdf` | **flagship / M1** |
| 2025 | סמ ב מועד א (21.7) | ✓ | `סמסטר ב מועד א - פתרונות 21.7.25.pdf` | paired |
| 2025 | קיץ מועד ב | ✓ | `תשובות למבחן מועד ב׳ קיץ 2025.pdf` | paired |
| 2024 | סמ ב מועד א (22.7) | ✓ | `מועד א 2024 תשובות שהתקבלו כנכונות.docx` | post-appeal key; **verify it keys this exam** |
| 2023 | סמ ב מועד א (19.6) | ✓ | `…פתרון 19.6.23.pdf` | paired |
| 2023 | סמ ב (17.7, "מעוד" typo) | ✓ | `…פתרון 17.7.23.pdf` | paired |
| 2022 | סמ ב מועד א | ✓ | `…פתרון 22.6.22.pdf` | paired |
| 2021 | סמ ב מועד א | ✓ | `…פתרון 13.6.21.pdf` | paired |
| 2021 | סמ ב מועד ג | combined | (in same PDF) | self-contained |
| 2021 | קיץ מועד ב | combined | (in same PDF) | self-contained |
| 2019 | סמ א מועד א | (embedded?) | `…פתרון 13.2.19.pdf` | solution only |

## ask-Adir list (open)
- **No solution key** → exclude unless Adir provides one: 2019 סמ א מועד ב · 2021 סמ ב מועד ב ·
  2024 סמ ב מועד ב.
- **Solution-only, no exam paper** (only נספח appendices): 2024 קיץ מועד א & מועד ב → confirm skip.
- **Verify**: `2024 …תשובות שהתקבלו כנכונות.docx` keys the `22.7.24 מועד א` exam.
- Any SQL option / algebra notation / diagram that can't be captured character-exact → paste or confirm crop.

## Proposed exam codes
`YY` + semester letter (A=א, B=ב, C=ג, S=summer/קיץ) + `-` + moed (A/B/C). E.g.
`25C-A` = 2025 סמסטר ג מועד א · `25B-A` = 2025 סמ ב מועד א · `25S-B` = 2025 קיץ מועד ב ·
`24B-A`, `23B-A`, `23B-A2` (17.7), `22B-A`, `21B-A`, `21B-C`, `21S-B`, `19A-A`.
