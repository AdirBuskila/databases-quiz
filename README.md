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
- `learn.js` — learn-mode content (generated; empty until M3)
- `images/exams/` — cropped ERD diagrams, tables, and image-based options
- `tools/` — Python + Node pipeline

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
node tools/smoke.js                                 # integrity + id-shuffle scoring invariant
node tools/shoot.js                                 # screenshots (desktop/mobile/light/dark)
```

## Status
**Shipped** — live at https://adirbuskila.github.io/databases-quiz/

206 questions across 10 exams (2021–2025), 36 shared context blocks.
By topic: SQL 81 · ERD 40 · אלגברה רלציונית 40 · תלויות ונרמול 38 · NoSQL 7.
Answer provenance: 186 from official keys, 20 derived. See `tools/build_report.md`
for the full breakdown and `docs/build_plan.md` for the build history.

Note: the rendered exam pages under `tools/raw/<CODE>/` are not committed (196M of
source scans). The transcriptions `tools/raw/*.json` are, so the build is reproducible.

## Sources & disclaimer
Built from the course's 2021–2025 exams with matching solution files. Answers come from real
פתרון/פתרונות files (no "טופס 0" rule); questions without a key are flagged. Answers marked
"לא רשמי" were derived from course material — verify against the source.
