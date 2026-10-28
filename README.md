# מערכות בסיסי נתונים — Quiz App

Hebrew RTL, mobile-first, light/dark MCQ quiz app for the Databases course
(מערכות בסיסי נתונים), mirroring the data-science-quiz app and extended for this
course's richer exams: shared **ERD diagrams**, **SQL code options**, **relational
algebra** (KaTeX), data tables, and **functional-dependency / normalization** questions.

## Run locally
No build/server needed — double-click `index.html`. Data loads from `questions.js`
(`window.DB_QUIZ`) as a global, so `file://` works offline. KaTeX is vendored under
`katex/` (offline, no CDN).

For screenshots/verify scripts it's easier to serve it:
`python -m http.server 8137` then open http://127.0.0.1:8137/index.html

## Files
- `index.html`, `styles.css`, `app.js` — the app (RTL, themed, mobile-first)
- `sql-highlight.js` — self-contained SQL syntax highlighter (no deps, offline, lossless)
- `katex/` — vendored KaTeX (min JS/CSS + woff2 fonts) for relational-algebra math
- `questions.js` / `questions.json` — `{ meta, contexts, questions }` (generated)
- `learn.js` — learn mode (generated): the Obsidian exam summary
  "סיכום למבחן - מערכות בסיסי נתונים", one chapter per `##` section
- `erd.js` — self-contained ERD renderer: Chen-notation diagram spec → inline SVG (themeable, offline)
- `courses.js` + `course-ui.js` — the guided courses **"צריך עזרה ב-ERD?"** and **"צריך עזרה ב-SQL?"**: level map /
  lesson card / summary; the quiz runs on the main engine with `S.mode="course"`; progress in
  `localStorage.dbq_erd_v1` / `dbq_sql_v1`. Deep links: `index.html?erd=1`, `?sql=S05`, `?sql=S05&play=1`
- `erd/levels/L01–L10.js` — ERD course (lesson + questions per level, small → exam-sized diagrams)
- `norm/levels/N01–N09.js` — FDs & normalization course; every computable answer is recomputed by
  `tools/fdlib.js` (closure, keys, normal forms on projected FDs, chase, preservation, minimal cover)
- `alg/levels/A01–A09.js` — relational-algebra course; options are evaluated on sample tables by
  `tools/ralib.js` (parses the exam notation: Π σ ρ × ⊗ − ∪ ∩ ÷ ←)
- `sql/levels/S01–S10.js` — SQL course (lessons with sample tables + results; every executable answer
  is checked in SQLite by `tools/sql_check.js`)
- `images/exams/` — cropped ERD diagrams, tables, and image-based options
- `tools/` — Python + Node pipeline
- `docs/formula-sheet/` — 2-page printable exam formula sheet: `index.html` (source), `render.js` (prints to `formula-sheet.pdf` via puppeteer-core + local Chrome and reports column overflow)

## Data model (extended vs data-science-quiz)
`window.DB_QUIZ = { meta, contexts, questions }`
- **contexts**: shared blocks keyed by id — `kind` = `erd`/`schema`/`relations`/`fd`/`text`,
  rendered above the questions that reference them via `contextId`.
- **questions[]**: `options` are **objects** `{id,type,value,lang?}` with
  `type` ∈ `text | code | math | image`; the answer is `correctId` (a stable option id),
  so shuffling works for code/image options. Each question also carries a `part` (א/ב/ג/ד)
  and a `topic` (`erd|sql|relalg|fd_norm|rel_model`).

## Pipeline
```
python tools/render_pdf.py "<exam.pdf>" <CODE>      # PDF -> tools/raw/<CODE>/page-NN.png
#   read pages visually, transcribe into tools/raw/<CODE>.json (character-exact SQL)
python tools/crop.py <page.png> <name> --box L T R B # crop ERD/tables/image-options
python tools/validate.py                            # sanity-check raw/*.json
python tools/build_questions.py                     # -> questions.json / questions.js / build_report.md
python tools/build_learn.py                         # Obsidian exam summary -> learn.js
node tools/smoke.js                                 # integrity + id-shuffle scoring invariant
node tools/shoot.js                                 # screenshots (desktop/mobile/light/dark)
node tools/erd_check.js                             # ERD course: data integrity + diagram layout lint
node tools/erd_shoot.js [L05|test] [light|dark]     # one PNG per course diagram (tools/erd_preview.html)
node tools/sql_check.js [S05] [--show]               # SQL course: integrity + runs every verify in SQLite
node tools/norm_check.js [N05] [--show]              # normalization course: lint + FD facts recomputed
node tools/alg_check.js [A05] [--show]               # algebra course: lint + options evaluated on sample data
node tools/course_dump.js <sql|norm|alg> <dir> [ids]  # questions without answers + key, for blind review
node tools/course_flow.js <erd|sql|norm|alg> [level] [light|dark] [mobile]  # a course end-to-end in the real app
```

## Status
**Shipped** — live at https://adirbuskila.github.io/databases-quiz/

272 questions across 12 exams (2021–2026) plus one original practice exam, 48 shared context blocks.
Learn mode is the Obsidian exam summary, split into 8 chapters (intro + sections 1–7).
By topic: SQL 105 · ERD 53 · אלגברה רלציונית 52 · תלויות ונרמול 50 · NoSQL 12.
Answer provenance: 192 from official keys, 20 from טופס 0 (26B-A), 20 derived, 20 computed (26Z-CL), 20 self-solved (26S-A). See `tools/build_report.md`
for the full breakdown and `docs/build_plan.md` for the build history.

Note: the rendered exam pages under `tools/raw/<CODE>/` are not committed (196M of
source scans). The transcriptions `tools/raw/*.json` are, so the build is reproducible.

**"המבחן הקשה של קלוד 2026"** (`26Z-CL`) is an original, harder-than-usual practice exam in the
2024–2026 format (4 ERD · 8 SQL · 4 algebra · 4 FDs), generated by `tools/gen_claude26.py`. Its answers are
computed, not keyed: `node tools/check_claude26.js` runs every SQL option in SQLite, evaluates every algebra
option with `ralib`, recomputes the FD facts with `fdlib` and lints the ERD (`answerSource: "claude-practice"`).

## Sources & disclaimer
Built from the course's 2021–2026 exams with matching solution files. Answers come from real
פתרון/פתרונות files; questions without a key are flagged. The one exception is 2026 סמסטר ב׳
מועד א׳ (`26B-A`): it is "מבחן מס' 000" (טופס 0, answer always א) with no published key, so its
answers use `answerSource: "form-0"` — every question was also solved independently and agrees.
2026 סמסטר קיץ מועד א׳ (`26S-A`) is a shuffled form (053) with no published key: its answers are
self-solved (`answerSource: "self-solved"`, shown as "לא רשמי") and recomputed by `node tools/check_26S-A.js`
(SQL in SQLite, algebra with `ralib`, FDs with `fdlib`). Answers marked
"לא רשמי" were derived from course material — verify against the source.
