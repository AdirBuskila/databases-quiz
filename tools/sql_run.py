"""Run one SQL job for tools/sql_check.js: stdin JSON {tables:[{name,columns,rows}], sql} ->
stdout JSON {rows:[[...]]} or {error}. Rows come back as tuples, so SELECT a.x, b.x keeps both
columns (node:sqlite returns name-keyed objects and would merge them)."""
import json, sqlite3, sys

job = json.load(sys.stdin)
db = sqlite3.connect(":memory:")
try:
    for t in job["tables"]:
        cols = []
        for i, c in enumerate(t["columns"]):
            v = next((r[i] for r in t.get("rows", []) if r[i] not in (None, "NULL")), None)
            ty = "INTEGER" if isinstance(v, int) and not isinstance(v, bool) else "REAL" if isinstance(v, float) else "TEXT"
            cols.append(f'"{c}" {ty}')
        db.execute(f'CREATE TABLE "{t["name"]}" ({", ".join(cols)})')
        db.executemany(f'INSERT INTO "{t["name"]}" VALUES ({",".join("?" * len(t["columns"]))})',
                       [[None if x == "NULL" else x for x in r] for r in t.get("rows", [])])
    out = []
    stmts = [s.strip() for s in job["sql"].split(";") if s.strip()]
    for s in stmts:
        cur = db.execute(s)
        if cur.description is not None:
            out = [list(r) for r in cur.fetchall()]
    print(json.dumps({"rows": out}))
except Exception as e:
    print(json.dumps({"error": str(e)}))
