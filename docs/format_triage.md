# Format triage — 2019+ Databases exams

Which exams fit the single-answer **MCQ** quiz model, and how each was sourced. **M2 complete.**

## Format finding
All **2021–2025** exams use the same **Zipgrade A–E bubble sheet**, ~20–25 closed questions,
course 61303, sections ERD / SQL / relational-algebra / FD-normalization (order & counts vary;
some add a small **NoSQL** section). These match the app's MCQ model → extractable. **2019** predates
this format (open-ended). Adir confirmed the closed-format window is the target; nothing older kept.

## Per-exam status — all extracted (206 questions total)
| Code | Exam | Date | Q | Key source | Confidence |
|---|---|---|---|---|---|
| 25C-A | סמ ג מועד א | 22.10.2025 | 20 | official key PDF | ✅ high |
| 25B-A | סמ ב מועד א | 21.7.2025 | 20 | solution PDF | ✅ high |
| 25S-B | קיץ מועד ב | 13.11.2025 | 20 | official answers PDF | ✅ high |
| 24B-A | סמ ב מועד א | 22.7.2024 | 20 | accepted-answers **docx** (form 000; **verified matches this exam**) | ✅ high |
| 23B-A | סמ ב מועד א | 19.6.2023 | 17 | solution PDF | ✅ high |
| 23B-A2 | סמ ב (17.7) | 17.7.2023 | 23 | solution PDF | ✅ high (incl. 5 NoSQL) |
| 22B-A | סמ ב מועד א | 22.6.2022 | 18 | solution PDF (yellow highlights + filled sheet) | ✅ high (incl. 2 NoSQL) |
| 21B-A | סמ ב מועד א | 13.6.2021 | 21 | solution PDF (yellow highlights) | ✅ high |
| 21S-B | קיץ מועד ב | 21.11.2021 | 25 | combined PDF (bold marking) | ✅ high |
| 21B-C | סמ ב מועד ג | 31.8.2021 | 22 | combined PDF (**student-made** solution) | ⚠️ **low — provisional** |

**By topic:** erd 40 · sql 81 · relalg 40 · fd_norm 38 · nosql 7.
**By part:** א 40 · ב 81 · ג 40 · ד 38 · ה 7 (ה = NoSQL).

## Excluded / skipped
- **19A-A** (2019 סמ א מועד א, 13.2.2019) — **open-ended / free-response**. Not convertible. Pages at `tools/raw/19A-A-SOL/`.
- **Open sub-questions inside kept exams** (skipped, not MCQ): 22B-A Q4/Q14/Q19 ("שאלה פתוחה").
- **No answer key** (excluded): 2019 סמ א מועד ב · 2021 סמ ב מועד ב (11.7.21) · 2024 סמ ב מועד ב (18.8.24).
- **2024 קיץ מועד א/ב** — נספח-only (appendix, no exam paper). Skipped.
- **2002–2018** — out of scope (older than 2019).

## ask-Adir items — reviewed & resolved (2026-07-19)
- ✅ **21S-B Q19** — resolved to **א only** (contractors who didn't build = all minus builders; b=∅, c=all contractors, so d "all correct" is false). Source's second bold was a marking slip. Now confidence high.
- ✅ **24B-A Q14** — the printed option א was **incomplete/broken** (dangling `∩`, Martin half missing), which is exactly why the key's answer is **ו (none)**. Restored the faithful broken option text; answer ו now makes sense; confidence high.
- ✅ **24B-A Q15** — transcription matches the print exactly; the exam had a division operand-order print error corrected verbally, after which **א** is correct. Confidence high.
- ✅ **21B-C** (5 spots) — reviewed each against the source pages: **Q5=D**, **Q10=E**, **Q18=B** confirmed by SQL/RA logic; **Q13 corrected A→C** (the correlated `NOT IN` in query 2 is logically equivalent, so both queries are equivalent); **Q4=A** (recursive mentor relationship — the textbook model; student's B/C don't fit, though C is a defensible ternary reading). *Whole exam still `official:false, confidence:low` — it's an unofficial student key; verify against an official one if found.*
- ✅ **21B-A Q10 & Q15** — exam print-typos its official solution corrected mid-exam (`P1.a_name`→`p_name`; `Elect`→`Citizen`); corrected forms presented, confidence medium.
- ✅ **2024 docx confirmed to key the 22.7.24 מועד א exam** — form "000" (correct answer placed first → key reads mostly א).

**Net remaining caveat:** only 21B-C stays inherently provisional (no official answer key exists); its answers are now logic-verified where determinable.
