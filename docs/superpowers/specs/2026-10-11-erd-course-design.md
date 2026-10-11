# "צריך עזרה ב-ERD?" — ERD course design

Date: 2026-10-11 · Exam: 2026-10-15 · Status: approved in chat ("GO!")

## Goal
A separate section that teaches ERD from the smallest diagram up to exam-sized
diagrams (many entities, relationships, ISA, weak entities, aggregation), with
questions in the same style as the 44 real exam ERD questions. Finishing it should
leave the student able to solve any exam ERD question.

## Decisions (from brainstorming)
- Format: **mini-lesson + MCQ** per level (lesson card → 6–8 MCQs → level summary).
- Progression: **soft unlock** — all levels open; ✓ at ≥80%; recommended next level highlighted.
- Diagrams: drawn by a new **SVG renderer** (`erd.js`) from a declarative spec with
  hand-placed coordinates, in the exam's Chen notation. (Mermaid `erDiagram` is
  crow's-foot only — can't draw diamonds/double lines/ISA/aggregation.)
- Language: Hebrew RTL; terms and rules follow the Obsidian exam summary (Learn mode ch. 1).
- Mixed naming: Hebrew domains (students, clinic, library…) and the abstract
  `A / R1 / KeyA` style of the recent exams.

## Curriculum (10 levels)
1. אבני הבניין — shapes, keys, counting entities/relationships (IsA is not a relationship).
2. סוגי תכונות — composite / multivalued / derived and their conversion.
3. קרדינליות — arrow = at most one; reading "which statement is true".
4. השתתפות — double line = at least one; arrow+double = exactly one; (min,max).
5. המרת קשרים — N:M → table; 1:N → FK on the many side; table/field counts; NOT NULL for total.
6. ישות חלשה — partial key + owner key; identifying relationship; weak ⇒ dominated.
7. ISA — subtype table = inherited key + own attributes; specialization/generalization; syntax errors.
8. קשרים מיוחדים — recursive (roles), ternary, attributes on a relationship.
9. צבירה — key of a relationship on an aggregation; effect of adding an arrow.
10. 🏆 מבחן גמר — 2–3 new exam-sized diagrams, mixed questions; then a button into the
    real exam ERD questions (`topic=erd`).

## Architecture
- `erd.js` — `window.renderERD(spec) → <svg>` string. Node kinds: entity (strong/weak),
  relation (regular/identifying), attr (plain/key/partial/multi/derived, composite children),
  isa triangle, aggregation box. Edges: plain / arrow / double (total) / both, optional
  `(min,max)` or role label. Colors via `currentColor`/CSS vars (themes work).
- `erd/levels/L01.js … L10.js` — each pushes one level onto `window.ERD_COURSE`:
  `{id, title, icon, goal, lesson:{html, erd?}, questions:[…]}`. Questions use the
  existing question shape (`options:[{id,type,value}]`, `correctId`, `explanation`) plus
  an inline `ctx:{kind:"erdsvg", erd, title?}`.
- `app.js` — new mode `course`: reuses `renderQuestion` / shuffle / feedback; level order
  is fixed; after the last question → level summary. Answers recorded in
  `localStorage["dbq_erd_v1"]` (not in the main bank stats). `contextHtml` renders `ctx.erd`.
  SVG zoom uses the lightbox.
- `index.html` — header button "🧩 צריך עזרה ב-ERD?", a start-screen card, `screen-erd`
  (level map / lesson / summary).

## Testing
- `tools/erd_check.js` — every level/question id unique, `correctId` in options, every edge
  endpoint exists, every question has a diagram or explicit `noDiagram`, each level 5–10 Qs.
- Screenshots of every diagram (light/dark, desktop/mobile) to catch overlaps.
- Independent re-solve pass on all answers. `smoke.js` + `validate.py` still pass.
