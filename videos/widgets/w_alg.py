# -*- coding: utf-8 -*-
"""Relational-algebra widgets for the alg videos (A01-A09): an evaluator, expressions in the app's look, and relation
tables with row / column overlays. Every class starts with ra- (all widget css files load into every video).

Evaluator: ev(src, tables) parses the exam notation exactly like the app's checker tools/ralib.js
  Π_{a, b} σ_{cond} ρ_{T1} R  (unary, apply to what follows) · × / X and ⊗ / ⋈ bind tighter than − ∪ ∩ ÷ (left to right)
  NAME ← expr (one per line) · conditions = != ≠ <> < > <= >= ≤ ≥ ∧ ∨ ¬, "strings", numbers, True/False
Relations are sets (first occurrence kept, so the order is the order ralib.js gives). An unknown/ambiguous column, a bad
divisor or an incompatible ∪/∩/− raises RAError (that is how "invalid" options are shown). Every ev() call is queued and
crosscheck() replays all of them through ralib.js with node and asserts the same columns and the same set of rows
(or that both fail). Scripts call crosscheck() before VIDEO.

Tables are dicts like ralib's: T(name, columns, rows, pk). Displayed result tables are built from ev() output.

HTML (hidden pieces carry ids that the timeline shows):
  alg(id, src, marks=[(mid, substring)])  expression, LTR, Cambria Math, _{…} as subscripts; {mid} = box around a part
  steps(pfx, [(name, src)])               assignment lines name ← src: {pfx}-l{i}
  table(pfx, data)                        a relation: {pfx}-row{i} the row, {pfx}-hl{i} keep (teal), {pfx}-x{i} drop (red
                                          strike), {pfx}-dup{i} duplicate (amber strike), {pfx}-col{j} column dropped,
                                          {pfx}-ch{j} column highlight, {pfx}-c{i}-{j} cell ring, {pfx}-t{i} tag at the
                                          row's end (tags={i: html or [html, html…]} -> t{i}, t{i}b, …)
  div_grid(pfx, R, S)                     ÷ check: a row per candidate, a column per divisor row: {pfx}-c{i}-{j} ✓/✗,
                                          {pfx}-v{i} verdict, {pfx}-row{i}; asserted equal to ev(R ÷ S)
"""
import json
import math
import os
import pathlib
import re
import subprocess
from html import escape as _esc

ROOT = pathlib.Path(__file__).resolve().parents[2]
RALIB = ROOT / "tools" / "ralib.js"


class RAError(Exception):
    pass


def T(name, columns, rows, pk=()):
    return {"name": name, "columns": list(columns), "rows": [list(r) for r in rows], "pk": list(pk)}


class Col:
    __slots__ = ("rel", "name", "alias")

    def __init__(self, rel, name, alias=None):
        self.rel, self.name, self.alias = rel, name, alias


class Rel:
    def __init__(self, cols, rows):
        seen, out = set(), []
        for r in rows:
            k = json.dumps(list(r))
            if k not in seen:
                seen.add(k)
                out.append(tuple(r))
        self.cols, self.rows = list(cols), out

    @property
    def names(self):
        return [c.name for c in self.cols]

    def keyset(self):
        return {json.dumps(list(r)) for r in self.rows}

    def __len__(self):
        return len(self.rows)

    def column(self, j):
        return [r[j] for r in self.rows]

    def values(self, j=0):
        """the values of one column (for a 1-column result: the result as a set)"""
        return {r[j] for r in self.rows}


lc = lambda s: str(s).lower()


# ---------------------------------------------------------------- tokens
def _tokenize(s):
    T_, i = [], 0

    def sub():
        nonlocal i
        if s[i:i + 2] != "_{":
            raise RAError(f"expected _{{…}} at {i}")
        d, j = 0, i + 1
        while j < len(s):
            if s[j] == "{":
                d += 1
            elif s[j] == "}":
                d -= 1
                if d == 0:
                    break
            j += 1
        body = s[i + 2:j]
        i = j + 1
        return body
    OPS = {"×": "X", "⊗": "J", "⋈": "J", "−": "-", "-": "-", "∪": "U", "∩": "I", "÷": "D", "←": "="}
    while i < len(s):
        c = s[i]
        if c.isspace():
            if c == "\n":
                T_.append(("sep", None))
            i += 1
            continue
        if c == ";":
            T_.append(("sep", None)); i += 1; continue
        if c in "Ππ":
            i += 1; T_.append(("pi", sub())); continue
        if c == "σ":
            i += 1; T_.append(("sigma", sub())); continue
        if c == "ρ":
            i += 1; T_.append(("rho", sub())); continue
        if c in "()":
            T_.append((c, None)); i += 1; continue
        if c in OPS:
            if c == "-" and s[i + 1:i + 2] == ">":
                raise RAError("'->' in an expression")
            T_.append(("op", OPS[c])); i += 1; continue
        if c == "<" and s[i + 1:i + 2] == "-":
            T_.append(("op", "=")); i += 2; continue
        m = re.match(r"[A-Za-z_֐-׿][\w֐-׿]*", s[i:])
        if m:
            T_.append(("name", m.group(0))); i += m.end(); continue
        raise RAError(f"unexpected '{c}' in expression")
    return T_


def _col_index(R, ref):
    parts = str(ref).strip().split(".")
    if len(parts) == 2:
        hits = [i for i, c in enumerate(R.cols)
                if (lc(c.rel) == lc(parts[0]) or lc(c.alias or "") == lc(parts[0])) and lc(c.name) == lc(parts[1])]
    else:
        hits = [i for i, c in enumerate(R.cols) if lc(c.name) == lc(parts[0])]
    if not hits:
        raise RAError(f"no column '{ref}'")
    if len(hits) > 1:
        raise RAError(f"ambiguous column '{ref}'")
    return hits[0]


# ---------------------------------------------------------------- conditions (same semantics as ralib.js)
def _cond_tokens(s):
    T_, i = [], 0
    while i < len(s):
        c = s[i]
        if c.isspace():
            i += 1; continue
        if c in "()":
            T_.append((c, None)); i += 1; continue
        two = s[i:i + 2]
        if two in ("!=", "<>", "<=", ">="):
            T_.append(("cmp", "!=" if two == "<>" else two)); i += 2; continue
        if c in "=<>≠≤≥":
            T_.append(("cmp", {"≠": "!=", "≤": "<=", "≥": ">="}.get(c, c))); i += 1; continue
        if c == "∧":
            T_.append(("and", None)); i += 1; continue
        if c == "∨":
            T_.append(("or", None)); i += 1; continue
        if c == "¬":
            T_.append(("not", None)); i += 1; continue
        if c in "\"'“”״":
            close = "”" if c == "“" else c
            j = i + 1
            while j < len(s) and s[j] != close and not (close == '"' and s[j] == "”"):
                j += 1
            T_.append(("val", s[i + 1:j])); i = j + 1; continue
        m = re.match(r"-?\d+(\.\d+)?", s[i:])
        if m:
            v = float(m.group(0)) if "." in m.group(0) else int(m.group(0))
            T_.append(("val", v)); i += m.end(); continue
        m = re.match(r"[A-Za-z_֐-׿][\w.֐-׿]*", s[i:])
        if m:
            w = m.group(0)
            u = w.upper()
            T_.append({"AND": ("and", None), "OR": ("or", None), "NOT": ("not", None)}.get(u, ("ref", w)))
            i += len(w); continue
        raise RAError(f"unexpected '{c}' in condition '{s}'")
    return T_


def _num(x):
    if isinstance(x, bool):
        return math.nan
    try:
        return float(x)
    except (TypeError, ValueError):
        return math.nan


def _compare(op, x, y):
    norm = lambda v: lc(v) if isinstance(v, bool) else v
    x, y = norm(x), norm(y)
    if x is None or y is None:
        return False
    if isinstance(x, (int, float)) or isinstance(y, (int, float)):
        u, v = _num(x), _num(y)
        eq = u == v
    else:
        u, v = str(x), str(y)
        eq = lc(u) == lc(v)
    if op == "=":
        return eq
    if op == "!=":
        return not eq
    return {"<": u < v, ">": u > v, "<=": u <= v, ">=": u >= v}[op]


def _compile(src, R):
    T_ = _cond_tokens(src)
    p = 0

    def peek():
        return T_[p] if p < len(T_) else None

    def eat(t):
        nonlocal p
        if peek() is None or peek()[0] != t:
            raise RAError(f"condition '{src}': expected {t}")
        p += 1

    def operand():
        nonlocal p
        if p >= len(T_):
            raise RAError(f"condition '{src}' ends early")
        k = T_[p]
        p += 1
        if k[0] == "val":
            return lambda row, v=k[1]: v
        if k[0] == "ref":
            if re.fullmatch(r"(?i)true|false", k[1]):
                try:
                    i = _col_index(R, k[1])
                    return lambda row, i=i: row[i]
                except RAError:
                    b = k[1].lower() == "true"
                    return lambda row, b=b: b
            i = _col_index(R, k[1])
            return lambda row, i=i: row[i]
        raise RAError(f"condition '{src}': bad operand")

    def atom():
        nonlocal p
        if peek() and peek()[0] == "not":
            p += 1
            f = atom()
            return lambda r: not f(r)
        if peek() and peek()[0] == "(":
            p += 1
            f = orr()
            eat(")")
            return f
        a = operand()
        if not peek() or peek()[0] != "cmp":
            return lambda r: a(r) is True
        op = T_[p][1]
        p += 1
        b = operand()
        return lambda r: _compare(op, a(r), b(r))

    def andd():
        nonlocal p
        f = atom()
        while peek() and peek()[0] == "and":
            p += 1
            g, h = atom(), f
            f = lambda r, g=g, h=h: h(r) and g(r)
        return f

    def orr():
        nonlocal p
        f = andd()
        while peek() and peek()[0] == "or":
            p += 1
            g, h = andd(), f
            f = lambda r, g=g, h=h: h(r) or g(r)
        return f
    f = orr()
    if p < len(T_):
        raise RAError(f"condition '{src}': trailing tokens")
    return f


# ---------------------------------------------------------------- operators
def _project(R, lst):
    refs = [s.strip() for s in str(lst).split(",") if s.strip()]
    idx = [_col_index(R, r) for r in refs]
    return Rel([R.cols[i] for i in idx], [[row[i] for i in idx] for row in R.rows])


def _select(R, cond):
    f = _compile(cond, R)
    return Rel(R.cols, [r for r in R.rows if f(r)])


def _rename(R, arg):
    m = re.fullmatch(r"\s*([\w֐-׿]+)\s*(?:\(([^)]*)\))?\s*", arg)
    if not m:
        raise RAError(f"bad ρ_{{{arg}}}")
    names = [s.strip() for s in m.group(2).split(",")] if m.group(2) else None
    if names and len(names) != len(R.cols):
        raise RAError("ρ column count mismatch")
    return Rel([Col(m.group(1), names[i] if names else c.name) for i, c in enumerate(R.cols)], R.rows)


def _product(A, B):
    return Rel(A.cols + B.cols, [a + b for a in A.rows for b in B.rows])


def _njoin(A, B):
    common = [(i, c) for i, c in enumerate(A.cols) if any(lc(d.name) == lc(c.name) for d in B.cols)]
    if not common:
        return _product(A, B)
    pairs = [(i, next(j for j, d in enumerate(B.cols) if lc(d.name) == lc(c.name))) for i, c in common]
    keep = [j for j in range(len(B.cols)) if not any(p[1] == j for p in pairs)]
    rows = [a + tuple(b[j] for j in keep) for a in A.rows for b in B.rows if all(a[i] == b[j] for i, j in pairs)]
    return Rel(A.cols + [B.cols[j] for j in keep], rows)


def _compat(A, B, op):
    if len(A.cols) != len(B.cols):
        raise RAError(f"{op}: not union-compatible ({len(A.cols)} vs {len(B.cols)} columns)")


def _setop(A, B, op):
    _compat(A, B, op)
    kb = B.keyset()
    if op == "∪":
        return Rel(A.cols, A.rows + B.rows)
    if op == "∩":
        return Rel(A.cols, [r for r in A.rows if json.dumps(list(r)) in kb])
    return Rel(A.cols, [r for r in A.rows if json.dumps(list(r)) not in kb])


def _divide(A, B):
    bi = []
    for c in B.cols:
        hit = [i for i, a in enumerate(A.cols) if lc(a.name) == lc(c.name)]
        if not hit:
            raise RAError(f"÷: divisor column '{c.name}' is not in the dividend")
        bi.append(hit[0])
    xi = [i for i in range(len(A.cols)) if i not in bi]
    if not xi:
        raise RAError("÷: dividend has no columns left over")
    have = {json.dumps([r[i] for i in xi] + [r[i] for i in bi]) for r in A.rows}
    xs = Rel([A.cols[i] for i in xi], [[r[i] for i in xi] for r in A.rows])
    return Rel(xs.cols, [x for x in xs.rows if all(json.dumps(list(x) + list(b)) in have for b in B.rows)])


def _evaluate(src, tables):
    env = {lc(t["name"]): Rel([Col(t["name"], n) for n in t["columns"]], [tuple(r) for r in t["rows"]]) for t in tables}
    T_ = _tokenize(src)
    p = 0

    def peek():
        return T_[p] if p < len(T_) else None

    def primary():
        nonlocal p
        if p >= len(T_):
            raise RAError("expression ends early")
        k = T_[p]
        p += 1
        if k[0] == "pi":
            return _project(primary(), k[1])
        if k[0] == "sigma":
            return _select(primary(), k[1])
        if k[0] == "rho":
            return _rename(primary(), k[1])
        if k[0] == "(":
            v = expr()
            if not peek() or peek()[0] != ")":
                raise RAError("missing )")
            p += 1
            return v
        if k[0] == "name":
            if lc(k[1]) not in env:
                raise RAError(f"unknown relation '{k[1]}'")
            return env[lc(k[1])]
        raise RAError(f"unexpected token {k}")

    def is_op(k, ops):
        return k is not None and ((k[0] == "op" and k[1] in ops) or ("X" in ops and k[0] == "name" and k[1] == "X"
                                                                    and "x" not in env))

    def prod():
        nonlocal p
        v = primary()
        while is_op(peek(), ("X", "J")):
            o = T_[p]
            p += 1
            w = primary()
            v = _njoin(v, w) if o[1] == "J" else _product(v, w)
        return v

    def expr():
        nonlocal p
        v = prod()
        while is_op(peek(), ("-", "U", "I", "D")):
            o = T_[p][1]
            p += 1
            w = prod()
            v = {"-": lambda: _setop(v, w, "−"), "U": lambda: _setop(v, w, "∪"), "I": lambda: _setop(v, w, "∩"),
                 "D": lambda: _divide(v, w)}[o]()
        return v
    last = None
    while p < len(T_):
        while peek() and peek()[0] == "sep":
            p += 1
        if p >= len(T_):
            break
        if T_[p][0] == "name" and p + 1 < len(T_) and T_[p + 1] == ("op", "="):
            name = T_[p][1]
            p += 2
            v = expr()
            env[lc(name)] = Rel([Col(name, c.name, c.rel) for c in v.cols], v.rows)
            last = env[lc(name)]
        else:
            last = expr()
        if peek() and peek()[0] != "sep":
            raise RAError(f"unexpected {peek()}")
    if last is None:
        raise RAError("empty expression")
    return last


_QUEUE = []


def ev(src, tables):
    """evaluate; queued for crosscheck() against tools/ralib.js. Raises RAError for an invalid expression."""
    try:
        r = _evaluate(src, tables)
    except RAError:
        _QUEUE.append((src, tables, None))
        raise
    _QUEUE.append((src, tables, r))
    return r


def invalid(src, tables):
    """True when the expression is invalid (queued for the cross-check too)"""
    try:
        ev(src, tables)
        return False
    except RAError:
        return True


def same(a, b):
    """same set of rows (column names ignored)"""
    return a.keyset() == b.keyset()


_JS = r"""
const {evaluate} = require(process.env.RALIB);
const d = JSON.parse(require('fs').readFileSync(0, 'utf8'));
console.log(JSON.stringify(d.map(x => { try { const r = evaluate(x.src, x.tables);
  return {cols: r.cols.map(c => c.name), rows: r.rows}; } catch (e) { return {error: e.message}; } })));
"""


def crosscheck():
    """replay every ev() through ralib.js: same columns and rows, or both invalid"""
    if not _QUEUE:
        return 0
    payload = [{"src": s, "tables": [{"name": t["name"], "columns": t["columns"], "rows": t["rows"]} for t in tb]}
               for s, tb, _ in _QUEUE]
    r = subprocess.run(["node", "-e", _JS], input=json.dumps(payload, ensure_ascii=False), capture_output=True,
                       text=True, encoding="utf-8", env={**os.environ, "RALIB": str(RALIB)})
    if r.returncode != 0:
        raise SystemExit("ralib cross-check failed to run:\n" + r.stderr[-1500:])
    res = json.loads(r.stdout)
    for (src, _, mine), js in zip(_QUEUE, res):
        if mine is None:
            assert "error" in js, f"invalid here but ralib.js evaluates it: {src}"
            continue
        assert "error" not in js, f"ralib.js fails ({js.get('error')}) on: {src}"
        assert js["cols"] == mine.names, (src, js["cols"], mine.names)
        assert {json.dumps(r_) for r_ in js["rows"]} == mine.keyset(), (src, js["rows"], mine.rows)
    n = len(_QUEUE)
    _QUEUE.clear()
    return n


# ---------------------------------------------------------------- HTML: expressions
def esc(s):
    return _esc(str(s), quote=False)


_SUB = re.compile(r"_\{([^{}]*)\}")


def alg_html(src, marks=()):
    """expression markup -> HTML (subscripts); marks: [(id, substring)] boxes, hidden"""
    s = str(src)
    for k, (mid, part) in enumerate(marks):
        i = s.find(part)
        assert i >= 0, (part, s)
        s = s[:i] + f"\x01{k}\x02" + part + "\x03" + s[i + len(part):]
    h = esc(s)
    h = _SUB.sub(lambda m: f"<sub>{m.group(1)}</sub>", h)
    for k, (mid, _) in enumerate(marks):
        h = h.replace(f"\x01{k}\x02", f'<span class="ra-mk"><i id="{mid}" class="ra-mkb h"></i>')
    return h.replace("\x03", "</span>")


def alg(id_, src, marks=(), cls="", hidden=True, size=None):
    st = f' style="font-size:{size}px"' if size else ""
    hid = " h" if hidden else ""
    idattr = f' id="{id_}"' if id_ else ""
    return f'<div{idattr} class="ra-alg {cls}{hid}"{st} dir="ltr"><span>{alg_html(src, marks)}</span></div>'


def inl(src):
    """inline expression (options, cards)"""
    return f'<span class="ra-in" dir="ltr">{alg_html(src)}</span>'


def steps(pfx, lines, size=None, hidden=True):
    st = f' style="font-size:{size}px"' if size else ""
    lid = (lambda i: f' id="{pfx}-l{i}"') if pfx else (lambda i: "")
    rows = "".join(f'<div{lid(i)} class="ra-step{" h" if hidden else ""}"><span class="ra-sn">{esc(n)}</span>'
                   f'<span class="ra-arrow">←</span><span>{alg_html(s)}</span></div>' for i, (n, s) in enumerate(lines))
    i_ = f' id="{pfx}"' if pfx else ""
    return f'<div class="ra-steps"{i_}{st} dir="ltr">{rows}</div>'


# ---------------------------------------------------------------- HTML: tables
def _fmt(v):
    if v is True:
        return "True"
    if v is False:
        return "False"
    return str(v)


def table(pfx, data, title=None, hidden=False, rows_hidden=False, fs=28, qual=False, pk=None, tags=None,
          tagw=0, headers=None):
    """a relation (T dict or Rel). Row/column overlays with ids (see the module doc). qual: header 'rel.name'."""
    if isinstance(data, Rel):
        heads = [f"{c.rel}.{c.name}" if qual else c.name for c in data.cols]
        rows = [list(r) for r in data.rows]
        name = title
        pk = pk or []
    else:
        heads = list(data["columns"])
        rows = data["rows"]
        name = data["name"] if title is None else title
        pk = data.get("pk", []) if pk is None else pk
    if headers:
        heads = headers
    cw = 0.56 * fs
    pad = 0.55 * fs
    widths = [round(max([len(h)] + [len(_fmt(r[j])) for r in rows]) * cw + 2 * pad) for j, h in enumerate(heads)]
    rh = round(fs * 1.6)
    tags = tags or {}
    o = [f'<div class="ra-tw{" h" if hidden else ""}" id="{pfx}">']
    if name:
        o.append(f'<div class="ra-cap">{alg_html(name)}</div>')
    tw = sum(widths)
    o.append(f'<div class="ra-tab" style="font-size:{fs}px;width:{tw}px;margin-right:{tagw}px">')
    hc = "".join(f'<span class="ra-td{" ra-pk" if h in pk else ""}" style="width:{w}px">{esc(h)}</span>'
                 for h, w in zip(heads, widths))
    o.append(f'<div class="ra-tr ra-hd" style="height:{rh}px">{hc}</div>')
    for i, r in enumerate(rows):
        cells = "".join(f'<span class="ra-td" style="width:{w}px"><i id="{pfx}-c{i}-{j}" class="ra-ring h"></i>'
                        f'{esc(_fmt(v))}</span>' for j, (v, w) in enumerate(zip(r, widths)))
        tv = tags.get(i, [])
        tag = "".join(f'<span id="{pfx}-t{i}{"bcdef"[k - 1] if k else ""}" class="ra-tag h">{t}</span>'
                      for k, t in enumerate(tv if isinstance(tv, list) else [tv]))
        o.append(f'<div id="{pfx}-row{i}" class="ra-tr{" ra-z" if i % 2 else ""}{" h" if rows_hidden else ""}" '
                 f'style="height:{rh}px">{cells}<i id="{pfx}-hl{i}" class="ra-ohl h"></i>'
                 f'<i id="{pfx}-x{i}" class="ra-ox h"></i><i id="{pfx}-dup{i}" class="ra-odup h"></i>{tag}</div>')
    x = 0
    for j, w in enumerate(widths):
        o.append(f'<i id="{pfx}-col{j}" class="ra-ocol h" style="left:{x}px;width:{w}px"></i>'
                 f'<i id="{pfx}-ch{j}" class="ra-och h" style="left:{x}px;width:{w}px"></i>')
        x += w
    o.append("</div></div>")
    return "".join(o)


def ids(pfx, kind, idx):
    """[f'{pfx}-{kind}{i}' for i in idx]  (kind: row, hl, x, dup, col, ch, t)"""
    return [f"{pfx}-{kind}{i}" for i in idx]


def row_index(data, pred):
    rows = data.rows if isinstance(data, Rel) else [tuple(r) for r in data["rows"]]
    return [i for i, r in enumerate(rows) if pred(r)]


def rows_of(data):
    return data.rows if isinstance(data, Rel) else [tuple(r) for r in data["rows"]]


# ---------------------------------------------------------------- HTML: division check
def div_grid(pfx, dividend_src, divisor_src, tables, fs=28, cand_head=None, ytxt=None):
    """÷ as a grid: candidates (dividend minus divisor columns) × divisor rows, ✓ where the pair is in the dividend.
    Returns (html, info) with info = [(candidate tuple, [bool per divisor row], passes)], asserted against ev(÷)."""
    R = ev(dividend_src, tables)
    S = ev(divisor_src, tables)
    Q = ev(f"({dividend_src}) ÷ ({divisor_src})", tables)
    bi = [next(i for i, a in enumerate(R.cols) if lc(a.name) == lc(c.name)) for c in S.cols]
    xi = [i for i in range(len(R.cols)) if i not in bi]
    have = {(tuple(r[i] for i in xi), tuple(r[i] for i in bi)) for r in R.rows}
    cands = list(dict.fromkeys(tuple(r[i] for i in xi) for r in R.rows))
    info = []
    for x in cands:
        marks = [(x, tuple(b)) in have for b in S.rows]
        info.append((x, marks, all(marks)))
    assert {x for x, _, ok in info if ok} == set(Q.rows), (info, Q.rows)
    cw = 0.56 * fs
    ch = cand_head or ", ".join(R.cols[i].name for i in xi)
    w0 = round(max([len(ch)] + [len(", ".join(map(_fmt, x))) for x in cands]) * cw + 1.1 * fs)
    ys = [", ".join(map(_fmt, b)) for b in S.rows]
    wy = [round(max(len(y), 2) * cw + 1.1 * fs) for y in ys]
    wv = round(4.5 * fs)
    rh = round(fs * 1.6)
    o = [f'<div class="ra-tw" id="{pfx}"><div class="ra-tab ra-grid" style="font-size:{fs}px;'
         f'width:{w0 + sum(wy) + wv}px">']
    hc = f'<span class="ra-td" style="width:{w0}px">{esc(ch)}</span>' + "".join(
        f'<span class="ra-td ra-yh" style="width:{w}px">{esc(y)}</span>' for y, w in zip(ys, wy)) + \
        f'<span class="ra-td" style="width:{wv}px"></span>'
    o.append(f'<div class="ra-tr ra-hd" style="height:{rh}px">{hc}</div>')
    for i, (x, marks, ok) in enumerate(info):
        cells = f'<span class="ra-td" style="width:{w0}px">{esc(", ".join(map(_fmt, x)))}</span>'
        for j, (m, w) in enumerate(zip(marks, wy)):
            cells += (f'<span class="ra-td" style="width:{w}px"><b id="{pfx}-c{i}-{j}" class="ra-mark '
                      f'{"ra-yes" if m else "ra-no"} h">{"✓" if m else "✗"}</b></span>')
        cells += (f'<span class="ra-td" style="width:{wv}px"><b id="{pfx}-v{i}" class="ra-verd '
                  f'{"ra-yes" if ok else "ra-no"} h">{"בתוצאה" if ok else "נפסל"}</b></span>')
        o.append(f'<div id="{pfx}-row{i}" class="ra-tr{" ra-z" if i % 2 else ""}" style="height:{rh}px">{cells}'
                 f'<i id="{pfx}-hl{i}" class="ra-ohl h"></i></div>')
    o.append("</div></div>")
    return "".join(o), info


# ---------------------------------------------------------------- layout helpers
def stack(*parts, gap=24, cls="", id_=None, hidden=False):
    i = f' id="{id_}"' if id_ else ""
    return f'<div{i} class="ra-stack {cls}{" h" if hidden else ""}" style="gap:{gap}px">{"".join(parts)}</div>'


def row(*parts, gap=40, cls="", align="flex-start", id_=None, hidden=False):
    i = f' id="{id_}"' if id_ else ""
    return f'<div{i} class="ra-row {cls}{" h" if hidden else ""}" style="gap:{gap}px;align-items:{align}">{"".join(parts)}</div>'


def swap(*parts, h=70):
    """several things in one spot, shown one after the other (each part is one element with its own id)"""
    return f'<div class="swap" style="--swap-h:{h}px">{"".join(parts)}</div>'


def note(id_, html, cls="", hidden=True):
    i = f' id="{id_}"' if id_ else ""
    return f'<div{i} class="ra-note {cls}{" h" if hidden else ""}">{html}</div>'


def ltr(s):
    return f'<span class="ra-ltr">{esc(s)}</span>'


def code(id_, text, hidden=True, size=26):
    """SQL on the stage (Consolas, LTR, keywords bold)"""
    kw = r"\b(SELECT|DISTINCT|FROM|WHERE|NOT|EXISTS|IN|AND|OR|INTERSECT|EXCEPT|UNION|GROUP BY|HAVING|COUNT|ALL)\b"
    h = re.sub(kw, r'<b class="ra-kw">\1</b>', esc(text))
    return f'<pre id="{id_}" class="ra-code{" h" if hidden else ""}" style="font-size:{size}px" dir="ltr">{h}</pre>'
