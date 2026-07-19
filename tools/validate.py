# -*- coding: utf-8 -*-
"""Validate the per-exam raw JSON files before building. Run before build_questions.py."""
import json, pathlib, glob, re, collections

RAW = pathlib.Path(__file__).parent / "raw"
TOPICS = {"erd", "sql", "relalg", "fd_norm", "rel_model", "nosql"}
PARTS = {"א", "ב", "ג", "ד", "ה"}
OPT_TYPES = {"text", "code", "math", "image", "algebra", "schema"}

def main():
    files = sorted(glob.glob(str(RAW / "*.json")))
    total = 0
    by_topic = collections.Counter()
    problems = []
    for fp in files:
        try:
            data = json.loads(pathlib.Path(fp).read_text(encoding="utf-8"))
        except Exception as e:
            problems.append(f"{fp}: JSON parse error: {e}"); continue
        code = data.get("examCode", pathlib.Path(fp).stem)
        ctx_ids = set((data.get("contexts") or {}).keys())
        qs = data.get("questions", [])
        for q in qs:
            total += 1
            tag = f"{code} Q{q.get('num')}"
            opts = q.get("options", [])
            ids = [o.get("id") for o in opts]
            if len(opts) < 2: problems.append(f"{tag}: <2 options")
            if len(set(ids)) != len(ids): problems.append(f"{tag}: duplicate option ids")
            if q.get("correctId") not in ids: problems.append(f"{tag}: correctId {q.get('correctId')} not in options")
            acc = q.get("acceptedIds")
            if acc is not None:
                if not isinstance(acc, list) or not acc: problems.append(f"{tag}: acceptedIds must be a non-empty list")
                else:
                    if any(a not in ids for a in acc): problems.append(f"{tag}: acceptedIds {acc} contains an unknown option id")
                    if q.get("correctId") not in acc: problems.append(f"{tag}: correctId {q.get('correctId')} not among acceptedIds {acc}")
            if q.get("topic") not in TOPICS: problems.append(f"{tag}: bad topic {q.get('topic')}")
            if q.get("part") is not None and q.get("part") not in PARTS: problems.append(f"{tag}: bad part {q.get('part')}")
            if not str(q.get("question", "")).strip(): problems.append(f"{tag}: empty question")
            if q.get("contextId") and q.get("contextId") not in ctx_ids:
                problems.append(f"{tag}: contextId {q.get('contextId')} not defined in this file")
            for o in opts:
                if o.get("type", "text") not in OPT_TYPES: problems.append(f"{tag}: bad option type {o.get('type')}")
                if not str(o.get("value", "")).strip(): problems.append(f"{tag}: blank option {o.get('id')}")
                if o.get("type") == "code" and re.search(r"[֐-׿]", str(o.get("value", ""))):
                    problems.append(f"{tag}: Hebrew char inside code option {o.get('id')} (likely mis-capture)")
            if q.get("topic") in TOPICS: by_topic[q["topic"]] += 1
        print(f"{code}: {len(qs)} questions, {len(ctx_ids)} contexts")
    print(f"\nTOTAL: {total} questions across {len(files)} exams")
    print("by topic:", dict(by_topic))
    print(f"\nPROBLEMS ({len(problems)}):")
    for p in problems: print("  -", p)

if __name__ == "__main__":
    main()
