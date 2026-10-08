# -*- coding: utf-8 -*-
"""Merge per-exam raw JSON files into the canonical Databases dataset.

Inputs : tools/raw/<CODE>.json  — one object per exam:
    {
      "examCode": "25C-A", "examLabel": "2025 סמסטר ג׳ מועד א׳", "year": 2025,
      "contexts": { "<localId>": { "kind": ..., ... }, ... },
      "questions": [
        { "num": 1, "part": "ב", "topic": "sql", "contextId": "<localId>",
          "question": "...", "options": [ {"id","type","value","lang"?}, ... ],
          "correctId": "o2", "answerSource": "solution-pdf",
          "explanation": "...", "confidence": "high" }, ...
      ]
    }

Outputs: ../questions.json  { meta, contexts, questions }
         ../questions.js    window.DB_QUIZ = {...}
         build_report.md

Context ids are namespaced by examCode so ids never collide across exams.
Answers are stored by stable option id (correctId); the app shuffles by id.
"""
import json, re, pathlib, collections, glob

TOOLS = pathlib.Path(__file__).parent
RAW = TOOLS / "raw"
OUT = TOOLS.parent

# Options like "תשובות ב' וג' נכונות" point at their SIBLINGS by printed letter. The app
# shuffles options, which would make that reference land on whatever happens to fall in
# those slots. Such questions keep the source's printed order instead (app.js honours
# the lockOrder flag).
LETTER_REF = re.compile(r"(תשובות|תשובה|סעיפים|סעיף)\s+[אבגדה]['׳]?\s*[,ו]")


def locks_order(options):
    vals = [o.get("value", "") if isinstance(o, dict) else o for o in options]
    return any(LETTER_REF.search(str(v)) for v in vals)

TOPIC_LABEL = {
    "erd": "מודל ERD",
    "sql": "SQL",
    "relalg": "אלגברה רלציונית",
    "fd_norm": "תלויות ונרמול",
    "rel_model": "המודל הרלציוני",
    "nosql": "NoSQL",
}
PARTS = {"א", "ב", "ג", "ד", "ה"}
# answerSource values that count as an official (real-key) answer
OFFICIAL_SOURCES = {"solution-pdf", "accepted-answers-docx", "combined-pdf", "answers-pdf", "form-0"}

def norm(s):
    return re.sub(r"\s+", " ", str(s)).strip().lower()

def opt_text(o):
    return norm(o.get("value", ""))

def valid_question(q, code):
    errs = []
    opts = q.get("options", [])
    if len(opts) < 2: errs.append("few-options")
    ids = [o.get("id") for o in opts]
    if len(set(ids)) != len(ids): errs.append("dup-option-ids")
    if any(not str(o.get("value", "")).strip() for o in opts): errs.append("blank-option")
    if q.get("correctId") not in ids: errs.append("correctId-not-in-options")
    acc = q.get("acceptedIds")
    if acc is not None:
        if not isinstance(acc, list) or not acc: errs.append("bad-acceptedIds")
        else:
            if any(a not in ids for a in acc): errs.append("acceptedIds-unknown-id")
            if q.get("correctId") not in acc: errs.append("correctId-not-in-acceptedIds")
    if q.get("topic") not in TOPIC_LABEL: errs.append(f"bad-topic:{q.get('topic')}")
    if q.get("part") not in PARTS and q.get("part") is not None: errs.append(f"bad-part:{q.get('part')}")
    if not str(q.get("question", "")).strip(): errs.append("empty-question")
    # code options must be Hebrew-free (a stray Hebrew char means a mis-capture)
    for o in opts:
        if o.get("type") == "code" and re.search(r"[֐-׿]", str(o.get("value", ""))):
            errs.append(f"hebrew-in-code:{o.get('id')}")
    return errs

def main():
    raw_files = sorted(glob.glob(str(RAW / "*.json")))
    contexts = {}
    questions = []
    excl = collections.Counter()
    problems = []

    for fp in raw_files:
        data = json.loads(pathlib.Path(fp).read_text(encoding="utf-8"))
        # tolerate either a flat shape or a nested {"meta": {...}} shape
        if "examCode" not in data and isinstance(data.get("meta"), dict):
            data = {**data["meta"], **{k: v for k, v in data.items() if k != "meta"}}
        code = data["examCode"]
        label = data.get("examLabel", code)
        year = data.get("year")
        # namespace + copy contexts
        cmap = {}  # localId -> globalId
        for cid, ctx in (data.get("contexts") or {}).items():
            gid = cid if str(cid).startswith(code) else f"{code}-{cid}"
            contexts[gid] = ctx
            cmap[cid] = gid
        for q in data.get("questions", []):
            errs = valid_question(q, code)
            if errs:
                excl["+".join(errs)] += 1
                problems.append(f"{code} Q{q.get('num')}: {', '.join(errs)}")
                continue
            q = dict(q)
            q["id"] = f"{code}-Q{q['num']}"
            q["examCode"] = code
            q["examLabel"] = label
            q["year"] = year
            q["source"] = "exam"
            q["topicLabel"] = TOPIC_LABEL[q["topic"]]
            q["official"] = q.get("answerSource") in OFFICIAL_SOURCES
            if locks_order(q.get("options", [])):
                q["lockOrder"] = True
            if q.get("contextId"):
                q["contextId"] = cmap.get(q["contextId"], q["contextId"])
            q.pop("num", None)
            questions.append(q)

    # count cross-exam duplicates (kept, not merged — whole-exam mode needs full sets)
    seen = set(); dup = 0
    for q in questions:
        key = norm(q["question"]) + " || " + "|".join(sorted(opt_text(o) for o in q["options"]))
        if key in seen: dup += 1
        else: seen.add(key)

    questions.sort(key=lambda q: (q["topic"], q.get("part") or "", q["id"]))

    payload_obj = {
        "meta": {
            "generated": "build_questions.py",
            "exams": len(raw_files),
            "counts": {"total": len(questions), "contexts": len(contexts)},
        },
        "contexts": contexts,
        "questions": questions,
    }
    payload = json.dumps(payload_obj, ensure_ascii=False, indent=1)
    (OUT / "questions.json").write_text(payload, encoding="utf-8")
    (OUT / "questions.js").write_text("window.DB_QUIZ = " + payload + ";\n", encoding="utf-8")

    by_topic = collections.Counter(q["topic"] for q in questions)
    by_part = collections.Counter(q.get("part") or "—" for q in questions)
    by_exam = collections.Counter(q["examCode"] for q in questions)
    by_key = collections.Counter("official" if q["official"] else "derived" for q in questions)

    lines = ["# Build report — Databases questions", "",
             f"- Raw exam files: **{len(raw_files)}**",
             f"- Excluded: **{sum(excl.values())}** ({dict(excl)})",
             f"- Cross-exam duplicates (kept): **{dup}**",
             f"- Shared context blocks: **{len(contexts)}**",
             f"- **Final questions: {len(questions)}**", "",
             "## By topic", ""]
    for t, n in by_topic.most_common():
        lines.append(f"- {TOPIC_LABEL[t]} (`{t}`): {n}")
    lines += ["", "## By part", ""]
    for p, n in sorted(by_part.items()):
        lines.append(f"- חלק {p}: {n}")
    lines += ["", "## By exam", ""]
    for c, n in sorted(by_exam.items()):
        lines.append(f"- {c}: {n}")
    lines += ["", "## Answer provenance",
              f"- official key: {by_key['official']}  ·  derived: {by_key['derived']}", ""]
    if problems:
        lines += ["## Excluded / problems", ""] + [f"- {p}" for p in problems] + [""]
    (TOOLS / "build_report.md").write_text("\n".join(lines) + "\n", encoding="utf-8")

    print(f"final={len(questions)} excluded={sum(excl.values())} dup_kept={dup} contexts={len(contexts)}")
    print("by_topic:", dict(by_topic))
    print("by_part:", dict(by_part))
    if problems:
        print(f"PROBLEMS ({len(problems)}):")
        for p in problems: print("  -", p)

if __name__ == "__main__":
    main()
