# -*- coding: utf-8 -*-
"""SQL-course widgets for the videos (S01-S10): highlighted SQL code, data tables with row overlays, result tables
revealed row by row, a grid of exam options, and a real SQLite runner (every query a video shows is executed here and
the displayed result is built from what SQLite returns).

Ids (an element with class `h` starts hidden; show()/hide() fade it):
  code(pfx, sql)        {pfx}-l{i} line i (hidden when hidden=True), {pfx}-m{i} highlight bar behind line i
  table(pfx, t)         {pfx}-r{i} row i (hidden when rows_hidden=True), {pfx}-hi{i} row highlight, {pfx}-x{i} row
                        struck out (filtered away), {pfx}-g{i} group colour band (groups={i: k}), {pfx}-c{i}-{j} a
                        cell highlight (cells=[(i, j)]), {pfx}-empty the "no rows" note (empty=True)
  opts(pfx, items)      {pfx}-o-<oid> option card, {pfx}-x-<oid> crossed out, {pfx}-ok-<oid> marked right,
                        {pfx}-n-<oid> short note on the card
Token colours are the app's (styles.css --tok-*, dark theme), the tokenizer is sql-highlight.js ported 1:1.
All classes start with sq- (every widgets/*.css loads into every video of the app).
"""
import html as _html
import re
import sqlite3

# ---------------------------------------------------------------- highlighter (port of sql-highlight.js)
KEYWORDS = set("""select from where group by having order join inner left right full outer cross natural on using as and
or not in exists all any some between like is null distinct union intersect except insert into values update set
delete create table view index drop alter add column primary key foreign references check default constraint unique
cascade case when then else end limit offset fetch first only asc desc with recursive over partition true false begin
commit rollback grant revoke if escape collate contains""".split())
FUNCTIONS = set("""count sum avg min max round abs coalesce nullif cast upper lower length substr substring trim concat now
current_date current_timestamp extract to_char to_date rank dense_rank row_number nvl ifnull greatest least""".split())
RULES = [
    ("sq-com", re.compile(r"--[^\n]*")),
    ("sq-com", re.compile(r"/\*[\s\S]*?\*/")),
    ("sq-str", re.compile(r"'(?:''|[^'])*'")),
    ("sq-str", re.compile(r'"[^"]*"')),
    ("sq-num", re.compile(r"\b\d+(?:\.\d+)?\b")),
    ("sq-op", re.compile(r"<>|!=|<=|>=|\|\||::|[-+*/%=<>]")),
    ("sq-pu", re.compile(r"[(),;.]")),
    ("word", re.compile(r"[A-Za-z_][A-Za-z0-9_]*")),
    ("ws", re.compile(r"\s+")),
    ("other", re.compile(r"\S")),
]


def esc(s):
    return _html.escape(str(s), quote=False)


def hl(src):
    """SQL source -> HTML with <span class="sq-*"> tokens; never drops or reorders a character"""
    s, out, i = str(src), [], 0
    while i < len(s):
        for cls, rx in RULES:
            m = rx.match(s, i)
            if not m:
                continue
            tok = m.group(0)
            if cls == "word":
                lw = tok.lower()
                if lw in FUNCTIONS and re.match(r"\s*\(", s[m.end():]):
                    out.append(f'<span class="sq-fn">{esc(tok)}</span>')
                elif lw in KEYWORDS:
                    out.append(f'<span class="sq-kw">{esc(tok)}</span>')
                else:
                    out.append(esc(tok))
            elif cls in ("ws", "other"):
                out.append(esc(tok))
            elif cls == "sq-com" and re.search(r"[֐-׿]", tok):
                out.append(f'<span class="sq-com">{esc(tok[:2])}<bdi dir="rtl">{esc(tok[2:])}</bdi></span>')
            else:
                out.append(f'<span class="{cls}">{esc(tok)}</span>')
            i = m.end()
            break
    return "".join(out)


def ic(sql):
    """inline SQL inside Hebrew text (cards, stems): LTR-isolated, highlighted"""
    return f'<span class="sq-ic">{hl(sql)}</span>'


# ---------------------------------------------------------------- SQLite
def T(name, columns, rows, pk=()):
    return {"name": name, "columns": list(columns), "rows": [list(r) for r in rows], "pk": list(pk)}


class DB:
    """an in-memory SQLite database built from T(...) tables. LIKE is case sensitive (as the course reads it)."""
    def __init__(self, *tables):
        self.tables = {t["name"]: t for t in tables}
        self.con = sqlite3.connect(":memory:")
        self.con.execute("PRAGMA case_sensitive_like = ON")
        for t in tables:
            cols = []
            for j, c in enumerate(t["columns"]):
                v = next((r[j] for r in t["rows"] if r[j] is not None), None)
                ty = "INTEGER" if isinstance(v, int) else "REAL" if isinstance(v, float) else "TEXT"
                cols.append(f'"{c}" {ty}')
            self.con.execute(f'CREATE TABLE "{t["name"]}" ({", ".join(cols)})')
            self.con.executemany(f'INSERT INTO "{t["name"]}" VALUES ({",".join("?" * len(t["columns"]))})', t["rows"])

    def run(self, sql):
        """-> (column names, rows as lists). Several statements (a VIEW, then a SELECT): the last result counts."""
        cols, rows = [], []
        for st in [x.strip() for x in sql.split(";") if x.strip()]:
            cur = self.con.execute(st)
            if cur.description is not None:
                cols, rows = [d[0] for d in cur.description], [list(r) for r in cur.fetchall()]
        return cols, rows

    def rows(self, sql):
        return self.run(sql)[1]

    def err(self, sql):
        """the SQLite error message, or None when the query runs"""
        try:
            self.run(sql)
            return None
        except sqlite3.Error as e:
            return str(e)

    def result(self, sql, name="תוצאה", columns=None):
        """the query's result as a table for table(): built from SQLite's own output"""
        cols, rows = self.run(sql)
        return T(name, columns or cols, rows)


def bag(rows):
    """multiset of rows, for comparing results regardless of order"""
    return sorted((tuple(r) for r in rows), key=repr)


def fmt(v):
    if v is None:
        return "NULL"
    if isinstance(v, float):
        if v == int(v):
            return str(int(v))
        return f"{v:.2f}".rstrip("0").rstrip(".")
    return str(v)


# ---------------------------------------------------------------- code block
def code(pfx, sql, hidden=False, size="", shown=()):
    """the query, one div per line (LTR, Consolas). hidden=True: every line starts hidden except `shown` indices"""
    lines = sql.split("\n")
    out = []
    for i, ln in enumerate(lines):
        h = " h" if hidden and i not in shown else ""
        out.append(f'<div id="{pfx}-l{i}" class="sq-line{h}"><i id="{pfx}-m{i}" class="sq-mark h"></i>'
                   f'<span class="sq-lt">{hl(ln) if ln.strip() else "&#8203;"}</span></div>')
    return f'<div class="sq-code {size}" id="{pfx}" dir="ltr">{"".join(out)}</div>'


def lines_do(pfx, idx):
    return [("show", f"{pfx}-l{i}") for i in idx]


# ---------------------------------------------------------------- tables
def table(pfx, t, hidden=False, rows_hidden=False, groups=None, cells=(), size="", cap=None, empty=False,
          cols=None):
    """a data table (LTR). cap: caption html (default: the table name). cols: subset of column indices to show."""
    groups = groups or {}
    cells = set(cells)
    cj = list(range(len(t["columns"]))) if cols is None else list(cols)
    head = [t["columns"][j] for j in cj]
    disp = [[fmt(r[j]) for j in cj] for r in t["rows"]]
    widths = [max([len(h)] + [len(d[k]) for d in disp]) for k, h in enumerate(head)]
    tmpl = " ".join(f"calc({w}ch + 26px)" for w in widths)
    pk = set(t.get("pk", []))
    hcells = "".join(f'<span class="sq-cell sq-th{" sq-pk" if h in pk else ""}">{esc(h)}</span>' for h in head)
    rows = []
    for i, d in enumerate(disp):
        cs = []
        for k, v in enumerate(d):
            j = cj[k]
            mark = f'<i id="{pfx}-c{i}-{j}" class="sq-ch h"></i>' if (i, j) in cells else ""
            val = '<span class="sq-null">NULL</span>' if t["rows"][i][j] is None else esc(v)
            cs.append(f'<span class="sq-cell">{mark}{val}</span>')
        g = f'<i id="{pfx}-g{i}" class="sq-g sq-g{groups[i]} h"></i>' if i in groups else ""
        rows.append(f'<div id="{pfx}-r{i}" class="sq-row{" h" if rows_hidden else ""}">{g}{"".join(cs)}'
                    f'<i id="{pfx}-hi{i}" class="sq-hi h"></i><i id="{pfx}-x{i}" class="sq-x h"></i></div>')
    caption = cap if cap is not None else f'<span class="sq-tn">{esc(t["name"])}</span>'
    emp = f'<div id="{pfx}-empty" class="sq-empty h">אין אף שורה</div>' if empty else ""
    return (f'<div id="{pfx}" class="sq-tw {size}{" h" if hidden else ""}" style="--sq-cols:{tmpl}">'
            f'<div class="sq-cap">{caption}</div><div class="sq-tab" dir="ltr"><div class="sq-row sq-head">{hcells}</div>'
            f'{"".join(rows)}</div>{emp}</div>')


def result(pfx, t, size="", cap="תוצאה", hidden=False, groups=None, cells=()):
    """a result table whose rows start hidden (revealed with rows_do); an empty result shows 'אין אף שורה'"""
    return table(pfx, t, hidden=hidden, rows_hidden=True, size=size, cap=f'<span class="sq-rc">{cap}</span>',
                 empty=not t["rows"], groups=groups, cells=cells)


def rows_do(pfx, t):
    """show every row of a result table (or its 'no rows' note)"""
    if not t["rows"]:
        return [("show", f"{pfx}-empty")]
    return [("show", f"{pfx}-r{i}") for i in range(len(t["rows"]))]


def where_do(pfx, keep, n):
    """WHERE on a data table: kept rows highlighted, the others struck out"""
    keep = set(keep)
    return [("show", f"{pfx}-hi{i}" if i in keep else f"{pfx}-x{i}") for i in range(n)]


def undo_where(pfx, keep, n):
    keep = set(keep)
    return [("hide", f"{pfx}-hi{i}" if i in keep else f"{pfx}-x{i}") for i in range(n)]


def kept(t, pred):
    """indices of the rows of t for which pred(row dict) holds"""
    return [i for i, r in enumerate(t["rows"]) if pred(dict(zip(t["columns"], r)))]


# ---------------------------------------------------------------- layout helpers
def row(*parts, gap=36, cls=""):
    return f'<div class="sq-hrow {cls}" style="gap:{gap}px">{"".join(parts)}</div>'


def col(*parts, gap=22, cls=""):
    return f'<div class="sq-vcol {cls}" style="gap:{gap}px">{"".join(parts)}</div>'


def note(id_, html_, hidden=True, cls=""):
    """a short Hebrew line on the stage"""
    return f'<div id="{id_}" class="sq-note {cls}{" h" if hidden else ""}">{html_}</div>'


def chip(id_, html_, hidden=True, cls=""):
    return f'<span id="{id_}" class="sq-chip {cls}{" h" if hidden else ""}">{html_}</span>'


def stem(qid, html_):
    """an exam question stem (RTL) with its bank id chip"""
    return f'<div class="sq-stem"><span class="qid">{esc(qid)}</span>{html_}</div>'


def bank_opts(q):
    """a bank question's options -> [(oid, kind, value)] in bank order"""
    out = []
    for o in q["options"]:
        v = o["value"].rstrip()
        if o["type"] == "code":
            v = re.sub(r";\s*$", "", v)
        out.append((o["id"], "code" if o["type"] == "code" else "text", v))
    return out


def opts(pfx, items, ncols=2, size="", notes=None, widths=None):
    """exam options as a grid of cards (bank order, no letters). items: [(oid, 'code'|'text', value)]"""
    notes = notes or {}
    cards = []
    for oid, kind, v in items:
        body = (f'<div class="sq-ocode" dir="ltr">{hl(v)}</div>' if kind == "code"
                else f'<div class="sq-otext">{v}</div>')
        ls = v.split(chr(10))
        top = kind == "code" and len(ls[-1]) > len(ls[0])          # the note goes where the code line is shorter
        n = (f'<span id="{pfx}-n-{oid}" class="sq-onote{" sq-ntop" if top else ""} h">{notes[oid]}</span>'
             if oid in notes else "")
        cards.append(f'<div id="{pfx}-o-{oid}" class="sq-opt sq-k-{kind}">{body}{n}'
                     f'<i id="{pfx}-x-{oid}" class="sq-ox h"></i><b id="{pfx}-ok-{oid}" class="sq-ook h">✓</b></div>')
    tmpl = widths or " ".join(["1fr"] * ncols)
    return f'<div class="sq-opts {size}" id="{pfx}-opts" style="grid-template-columns:{tmpl}">{"".join(cards)}</div>'
