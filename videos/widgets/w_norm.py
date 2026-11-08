# -*- coding: utf-8 -*-
"""Widgets for the normalization course videos (N01-N09: functional dependencies, closure, keys, extraneous
attributes, normal forms, decompositions).

Engine: a Python port of the app's FD engine tools/fdlib.js (same definitions: closure, keys, 3NF/BCNF/2NF test of
normalForm, a component judged on the projection of F, the chase for lossless join, the Z-loop for dependency
preservation, extraneous attributes, minimal cover). Every top-level call is logged, and crosscheck() replays the log
through fdlib.js with node and asserts the same answer, so the narration never states a verdict the app's engine
would not give. Attributes are single capital letters; a set is a string "ABE"; F is a list of (left, right).

Widgets (hidden pieces carry ids the timeline shows):
  fd_set(pfx, R, F)        R = (…) and F = {…}; FD i: highlight {pfx}-fh{i}, strike {pfx}-fx{i}, tag {pfx}-ft{i}
  closure_table(pfx, X, F) closure step table: row 0 start, one row per FD that adds something: {pfx}-r{i}
  key_table(pfx, R, F, cands)  candidate X | X⁺ | superkey? | minimal?: row {pfx}-r{i}, cells {pfx}-s{i} {pfx}-m{i}
  nf_table(pfx, R, F)      per FD: left side superkey? right side prime? verdict: {pfx}-r{i} {pfx}-k{i} {pfx}-p{i} {pfx}-v{i}
  comps(pfx, comps, F)     decomposition: one card per component with its projected FDs: {pfx}-c{i}, verdict {pfx}-v{i}
  inst_table(pfx, cols, rows)  a table instance; row highlight {pfx}-h{i}, cell highlight {pfx}-c{i}-{j}
  table(id, head, rows)    a generic small RTL table (math in cells), optional row ids
Class names start with nf- (all widget css files load into every video of the app).

Speech: P() here wraps vid.P and builds the spoken text itself: $X^+$ -> "הסגור של X", $X \\to Y$ -> "X קובע את Y",
attribute strings letter by letter (AB -> "אֵיי בִּי"); anything else goes through lexicon.tex_say.
"""
import json
import pathlib
import re
import subprocess
from vid import P as _P
import lexicon

ROOT = pathlib.Path(__file__).resolve().parents[2]
FDLIB = ROOT / "tools" / "fdlib.js"


# ================================================================ the engine (port of tools/fdlib.js)
def norm(s):
    return "".join(sorted(set(c for c in str(s) if "A" <= c <= "Z")))


def has(X, Y):
    return all(c in X for c in norm(Y))


def minus(X, Y):
    return "".join(c for c in norm(X) if c not in Y)


def union(*S):
    return norm("".join(S))


def inter(X, Y):
    return "".join(c for c in norm(X) if c in Y)


def parse_f(s):
    """'A->BE, AE->C' or 'A → BE, AE → C' -> [('A','BE'), ('AE','C')]"""
    out = []
    for part in re.split(r"[,;]", s.replace("{", "").replace("}", "")):
        if not part.strip():
            continue
        l, r = re.split(r"→|->", part)
        out.append((norm(l), norm(r)))
    return out


_LOG = []
_DEPTH = [0]


def _rec(name, conv=None):
    """log top-level calls (not the engine's own inner calls) for crosscheck()"""
    def deco(fn):
        def wrapped(*args):
            _DEPTH[0] += 1
            try:
                res = fn(*args)
            finally:
                _DEPTH[0] -= 1
            if _DEPTH[0] == 0:
                _LOG.append((name, args, res if conv is None else conv(res)))
            return res
        wrapped.__name__ = fn.__name__
        return wrapped
    return deco


def _subsets(S):
    a = list(S)
    return ["".join(x for i, x in enumerate(a) if m & (1 << i)) for m in range(1 << len(a))]


@_rec("closure")
def closure(X, F):
    C, grew = norm(X), True
    while grew:
        grew = False
        for l, r in F:
            if has(C, l) and not has(C, r):
                C = union(C, r)
                grew = True
    return C


def closure_steps(X, F):
    """the closure algorithm as the course runs it: passes over F in order; [(fd index, added, running closure)]"""
    C, grew, steps = norm(X), True, []
    while grew:
        grew = False
        for i, (l, r) in enumerate(F):
            if has(C, l) and not has(C, r):
                add = minus(r, C)
                C = union(C, r)
                steps.append((i, add, C))
                grew = True
    assert C == closure(X, F)
    return steps


@_rec("implies")
def implies(F, fd):
    l, r = fd
    return has(closure(l, F), r)


@_rec("isSuperkey")
def is_superkey(X, R, F):
    return has(closure(X, F), R)


@_rec("isCandidate")
def is_candidate(X, R, F):
    return is_superkey(X, R, F) and all(not is_superkey(minus(X, a), R, F) for a in norm(X))


@_rec("candidateKeys")
def candidate_keys(R, F):
    return [X for X in sorted(_subsets(R), key=lambda x: (len(x), x)) if is_candidate(X, R, F)]


@_rec("primes")
def primes(R, F):
    return norm("".join(candidate_keys(R, F)))


@_rec("project", lambda res: [list(d) for d in res])
def project(Ri, F):
    out = []
    for X in _subsets(Ri):
        if not X:
            continue
        Y = minus(inter(closure(X, F), Ri), X)
        if Y:
            out.append((X, Y))
    return out


@_rec("normalForm")
def normal_form(R, F):
    keys = candidate_keys(R, F)
    P = norm("".join(keys))
    nontriv = [(l, minus(r, l)) for l, r in F]
    nontriv = [(l, r) for l, r in nontriv if r and has(R, l + r)]
    if all(is_superkey(l, R, F) for l, r in nontriv):
        return "BCNF"
    if all(is_superkey(l, R, F) or has(P, r) for l, r in nontriv):
        return "3NF"
    second = all(all(not minus(minus(closure(S, F), S), P) for S in _subsets(K) if len(S) < len(K)) for K in keys)
    return "2NF" if second else "1NF"


@_rec("nfOfComponent")
def nf_of_component(Ri, F):
    return normal_form(Ri, project(Ri, F))


@_rec("lossless")
def lossless(R, comps, F):
    A = list(R)
    T = [[("a" + a) if a in Ri else ("b" + str(i) + a) for a in A] for i, Ri in enumerate(comps)]
    changed = True
    while changed:
        changed = False
        for l, r in F:
            Lk = [A.index(a) for a in l]
            Rk = [A.index(a) for a in r]
            for i in range(len(T)):
                for j in range(i + 1, len(T)):
                    if all(T[i][k] == T[j][k] for k in Lk):
                        for k in Rk:
                            if T[i][k] != T[j][k]:
                                x, y = T[i][k], T[j][k]
                                keep = x if x[0] == "a" else y if y[0] == "a" else (x if x < y else y)
                                drop = y if keep == x else x
                                for row in T:
                                    if row[k] == drop:
                                        row[k] = keep
                                changed = True
    return any(all(v[0] == "a" for v in row) for row in T)


def _preserved_fd(fd, comps, F):
    Z, grew = fd[0], True
    while grew:
        grew = False
        for Ri in comps:
            add = inter(closure(inter(Z, Ri), F), Ri)
            if not has(Z, add):
                Z = union(Z, add)
                grew = True
    return has(Z, fd[1])


def preserve_trace(fd, comps, F):
    """the Z-loop of one FD: [(component index, Z before, Z after)] for every round that grew Z"""
    Z, grew, out = fd[0], True, []
    while grew:
        grew = False
        for i, Ri in enumerate(comps):
            add = inter(closure(inter(Z, Ri), F), Ri)
            if not has(Z, add):
                out.append((i, Z, union(Z, add)))
                Z = union(Z, add)
                grew = True
    assert has(Z, fd[1]) == _preserved_fd(fd, comps, F)
    return out, Z


@_rec("preserves")
def preserves(comps, F):
    return all(_preserved_fd(d, comps, F) for d in F)


@_rec("lostFDs", lambda res: [list(d) for d in res])
def lost_fds(comps, F):
    return [d for d in F if not _preserved_fd(d, comps, F)]


@_rec("equivalent")
def equivalent(F1, F2):
    return all(implies(F2, d) for d in F1) and all(implies(F1, d) for d in F2)


@_rec("extraneousIn", lambda res: [f"{s}:{a}" for s, a in res])
def extraneous_in(fd, F):
    """[(side 'L'|'R', attr)] for FD fd (which must be in F)"""
    out, i = [], F.index(fd)
    l, r = fd
    if len(l) > 1:
        for a in l:
            if has(closure(minus(l, a), F), r):
                out.append(("L", a))
    for b in r:
        F2 = list(F)
        F2[i] = (l, minus(r, b))
        if implies([x for x in F2 if x[1]], (l, b)):
            out.append(("R", b))
    return out


@_rec("allExtraneous", lambda res: [f"{fd} {s}:{a}" for fd, s, a in res])
def all_extraneous(F):
    out = []
    for d in F:
        for s, a in extraneous_in(d, F):
            out.append((f"{d[0]}→{d[1]}", s, a))
    return out


@_rec("redundantFDs", lambda res: [list(d) for d in res])
def redundant_fds(F):
    return [d for i, d in enumerate(F) if implies([x for j, x in enumerate(F) if j != i], d)]


@_rec("isMinimalCoverOf")
def is_minimal_cover_of(G, F):
    return equivalent(G, F) and not all_extraneous(G) and not redundant_fds(G)


@_rec("instanceHolds")
def instance_holds(cols, rows, fd):
    """fd as text 'A B -> C' (column names separated by spaces)"""
    l, r = [s.split() for s in re.split(r"→|->", fd)]
    L, Rr = [cols.index(c) for c in l], [cols.index(c) for c in r]
    seen = {}
    for row in rows:
        k, v = tuple(row[i] for i in L), tuple(row[i] for i in Rr)
        if k in seen and seen[k] != v:
            return False
        seen[k] = v
    return True


def violating_pair(cols, rows, fd):
    """first pair of rows (i, j) that agree on the left side and differ on the right, or None"""
    l, r = [s.split() for s in re.split(r"→|->", fd)]
    L, Rr = [cols.index(c) for c in l], [cols.index(c) for c in r]
    for i in range(len(rows)):
        for j in range(i + 1, len(rows)):
            if all(rows[i][k] == rows[j][k] for k in L) and any(rows[i][k] != rows[j][k] for k in Rr):
                return i, j
    return None


def min_cover(F):
    """a minimal cover in the course's form: split right sides, drop extraneous left attributes, drop redundant FDs,
    then merge equal left sides (the canonical form). Asserted equivalent to F and free of extraneous/redundant."""
    G = []
    for l, r in F:
        for b in r:
            if b not in l and (l, b) not in G:
                G.append((l, b))
    changed = True
    while changed:
        changed = False
        for i, (l, r) in enumerate(G):
            for a in l:
                if len(l) > 1 and has(closure(minus(l, a), G), r):
                    G[i] = (minus(l, a), r)
                    changed = True
                    break
    G = list(dict.fromkeys(G))
    i = 0
    while i < len(G):
        rest = G[:i] + G[i + 1:]
        if implies(rest, G[i]):
            G = rest
        else:
            i += 1
    merged = {}
    for l, r in G:
        merged[l] = union(merged.get(l, ""), r)
    C = list(merged.items())
    assert equivalent(C, F) and not redundant_fds(C) and not all_extraneous(C), C
    return C


def bcnf_split(Ri, X, Y, F):
    """one step of the BCNF decomposition on component Ri with the violating FD X → Y (which must hold on Ri and
    have X not a superkey of Ri): returns (X ∪ Y, Ri ∖ (Y ∖ X))"""
    assert has(Ri, X + Y) and implies(F, (X, Y)) and minus(Y, X), (Ri, X, Y)
    assert not has(inter(closure(X, F), Ri), Ri), f"{X} is a superkey of {Ri}"
    return union(X, Y), minus(Ri, minus(Y, X))


def synth_3nf(R, Fc):
    """3NF synthesis from a minimal cover Fc: a component per left side (merged), a key component if none contains a
    candidate key, components inside another dropped. Asserts Fc is a minimal cover of itself."""
    assert is_minimal_cover_of(Fc, Fc)
    cs = []
    for l, r in Fc:
        c = union(l, r)
        if c not in cs:
            cs.append(c)
    keys = candidate_keys(R, Fc)
    added = None
    if not any(has(c, k) for c in cs for k in keys):
        added = keys[0]
        cs.append(added)
    cs = [c for c in cs if not any(c != d and has(d, c) for d in cs)]
    return cs, added


def show_cover(Ri, F):
    """the FDs that hold on component Ri, as a small minimal cover of the projection (for display)"""
    P = project(Ri, F)
    return min_cover(P) if P else []


# ---------------------------------------------------------------- crosscheck against fdlib.js
_JS = r"""
const L = require(process.argv[1]);
const data = JSON.parse(require("fs").readFileSync(0, "utf8"));
const conv = a => Array.isArray(a) ? a.map(conv) : (a && a.__F) ? a.__F.map(([l, r]) => ({l, r})) : a;
const out = data.map(([fn, args]) => {
  let res = L[fn](...args.map(conv));
  if (fn === "project" || fn === "lostFDs" || fn === "redundantFDs") res = res.map(d => [d.l, d.r]);
  if (fn === "extraneousIn") res = res.map(e => e.side + ":" + e.attr);
  if (fn === "allExtraneous") res = res.map(e => e.fd + " " + e.side + ":" + e.attr);
  return res;
});
process.stdout.write(JSON.stringify(out));
"""


def _js_args(name, args):
    out = []
    for a in args:
        if isinstance(a, list) and a and isinstance(a[0], tuple):
            out.append({"__F": [list(d) for d in a]})
        elif isinstance(a, list) and not a and name not in ("lossless", "preserves", "lostFDs"):
            out.append({"__F": []})
        elif isinstance(a, tuple):                      # one FD (implies / extraneousIn)
            out.append({"l": a[0], "r": a[1]})
        else:
            out.append(a)
    if name == "instanceHolds":
        out[2] = args[2]
    return out


def crosscheck():
    """replay every logged call through tools/fdlib.js; assert identical answers. Returns the number of facts."""
    calls = list(_LOG)
    _LOG.clear()
    if not calls:
        return 0
    payload = json.dumps([[n, _js_args(n, a)] for n, a, _ in calls])
    r = subprocess.run(["node", "-e", _JS, str(FDLIB)], input=payload, capture_output=True, text=True,
                       encoding="utf-8")
    if r.returncode != 0:
        raise RuntimeError("fdlib crosscheck failed:\n" + r.stderr[-2000:])
    js = json.loads(r.stdout)
    for (n, a, py), j in zip(calls, js):
        same = sorted(map(str, py)) == sorted(map(str, j)) if isinstance(py, list) else py == j
        assert same, f"fdlib disagrees on {n}{a}: python {py!r}, fdlib {j!r}"
    return len(calls)


# ================================================================ speech
NAME = {c: lexicon.TEX_TOKENS[c] for c in "ABCDEFGHIJKLMNOPQRSTUVWXYZ"}


def say_attrs(X):
    return " ".join(NAME[c] for c in X)


def say_set(X):
    return ", ".join(NAME[c] for c in X)


def say_fd(l, r):
    return f"{say_attrs(l)} קובע את {say_attrs(r)}"


_CL = re.compile(r"([A-Z]+)\s*\^\s*\{?\+\}?")


def _plain_speak(t):
    """a TeX piece without closures: X \\to Y -> 'X קובע את Y', the rest through lexicon.tex_say"""
    out = []
    for k, piece in enumerate(t.split(r"\to")):
        if k:
            out.append("קובע את")
        if not piece.strip():
            continue
        s = lexicon.tex_say(piece)
        if s is None:
            return None
        out.append(s)
    return " ".join(out)


_FD = re.compile(r"([A-Z]+)\s*\\to\s*([A-Z]+)")


def fd_noun(l, r, bare=False):
    """an FD as a noun: 'התלות מאֵיי לסִי' (bare: 'מאֵיי לסִי', after the word תלות)"""
    s = f"מ{say_attrs(l)} ל{say_attrs(r)}"
    return s if bare else "התלות " + s


def _tex_speak(t, bare_first=False):
    """closures -> 'הסגור של X'; an FD X → Y -> the noun 'התלות מX לY' (an FD as a sentence's verb is written in
    words in the subtitle: '$X$ קובע את $Y$'); the rest through lexicon.tex_say"""
    out, first = [], True
    pos = 0
    tokens = []
    for m in re.finditer(r"([A-Z]+)\s*\^\s*\{?\+\}?|([A-Z]+)\s*\\to\s*([A-Z]+)", t):
        tokens.append(("txt", t[pos:m.start()]))
        tokens.append(("cl", m.group(1)) if m.group(1) else ("fd", (m.group(2), m.group(3))))
        pos = m.end()
    tokens.append(("txt", t[pos:]))
    for kind, v in tokens:
        if kind == "cl":
            out.append("הסגור של " + say_attrs(v))
        elif kind == "fd":
            out.append(fd_noun(*v, bare=bare_first and first))
            first = False
        elif v.strip():
            s = _plain_speak(v)
            if s is None:
                return None
            out.append(s)
    return re.sub(r"\s+,", ",", " ".join(out)).strip() or None


def spoken(sub):
    text = sub.replace("**", "")
    out, pos = [], 0
    for m in re.finditer(r"\$([^$]+)\$", text):
        before = text[pos:m.start()]
        bare = re.search(r"(תלות|תלות לא טריוויאלית|הפרה)\s*$", before) is not None
        s = _tex_speak(m.group(1), bare_first=bare)
        if s is None:
            raise ValueError(f"no spoken form for ${m.group(1)}$ in: {sub}\n  -> give P(..., say=...)")
        if s.startswith("התלות "):
            pm = re.search(r"(^|[\s(])([ו]?)([בלכ])-$", before)
            if pm:                                  # ב-התלות -> בתלות
                before = before[:pm.start(3)] + pm.group(3)
                s = s[1:]
        out.append(before + s)
        pos = m.end()
    out.append(text[pos:])
    s = re.sub(r"<[^>]+>", "", "".join(out))
    # a definite object needs את: "נקבל התלות מ…" -> "נקבל את התלות מ…"
    return re.sub(r"(^|\s)(נקבל|קיבלנו|ומקבלים|מקבלים|נותנת|נותן|לקבל|מוסיפה|מוכיחים|ונשאיר|נשאיר)( גם)? (ו?)התלות",
                  r"\1\2\3 \4את התלות", s)


def P(sub, say=None, do=(), hold=0.0):
    """vid.P with the course's spoken math (see the module docstring)"""
    return _P(sub, say=spoken(sub) if say is None else say, do=do, hold=hold)


# ================================================================ TeX / html helpers
def tset(X):
    return r"\{" + ", ".join(norm(X)) + r"\}"


def tfd(l, r):
    return f"{l} \\to {r}"


def tF(F, name="F"):
    return f"{name} = \\{{" + ", ".join(tfd(l, r) for l, r in F) + r"\}"


def tR(R, name="R"):
    return f"{name} = (" + ", ".join(R) + ")"


def ltr(s):
    return f'<span class="nf-ltr">{s}</span>'


def big(id_, tex, hidden=True, cls=""):
    return f'<div id="{id_}" class="nf-big {cls}{" h" if hidden else ""}">${tex}$</div>'


def row(id_, html_, hidden=True, cls=""):
    return f'<div id="{id_}" class="nf-row {cls}{" h" if hidden else ""}">{html_}</div>'


def stack(*parts, gap=22):
    return f'<div class="nf-stack" style="gap:{gap}px">{"".join(parts)}</div>'


OK = '<span class="nf-ok">✓</span>'
NO = '<span class="nf-no">✗</span>'


def mark(b):
    return OK if b else NO


def table(id_, head, rows, hidden=True, ids=None, cls=""):
    """a small RTL table; rows of html cells; ids: an id per row (those rows start hidden), None = always shown"""
    th = "".join(f"<th>{h}</th>" for h in head)
    trs = []
    for i, r in enumerate(rows):
        rid = f' id="{ids[i]}" class="h"' if ids and ids[i] else ""
        trs.append(f"<tr{rid}>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>")
    return (f'<table id="{id_}" class="nf-tab {cls}{" h" if hidden else ""}"><thead><tr>{th}</tr></thead>'
            f'<tbody>{"".join(trs)}</tbody></table>')


# ================================================================ widgets
def fd_set(pfx, R, F, name="F", rname="R", hidden=False, cls="", tags=None, show_r=True):
    """R = (…) over F = {…}; each FD is its own box with a highlight {pfx}-fh{i}, a strike {pfx}-fx{i} and an
    optional small tag under it {pfx}-ft{i} (tags: {i: html})."""
    tags = tags or {}
    fds = []
    for i, (l, r) in enumerate(F):
        tag = f'<span id="{pfx}-ft{i}" class="nf-ftag h">{tags[i]}</span>' if i in tags else ""
        fds.append(f'<span class="nf-fd" id="{pfx}-f{i}"><span class="nf-fdt"><i id="{pfx}-fh{i}" class="nf-hi h"></i>'
                   f'${tfd(l, r)}$<i id="{pfx}-fx{i}" class="nf-strike h"></i></span>{tag}</span>')
    rline = f'<div class="nf-rl">${tR(R, rname)}$</div>' if show_r and R else ""
    return (f'<div class="nf-fdset {cls}{" h" if hidden else ""}" id="{pfx}" dir="ltr">{rline}'
            f'<div class="nf-fl"><span class="nf-br">${name} = \\{{$</span>'
            + '<span class="nf-cm">,</span>'.join(fds) + r'<span class="nf-br">$\}$</span></div></div>')


def closure_table(pfx, X, F, hidden=True, final=True, cls=""):
    """the closure algorithm as a table: row 0 the start set, one row per FD that adds attributes, and (final=True)
    a last row 'no change' with the result. Rows {pfx}-r0 … {pfx}-r{n} ({pfx}-rend for the last). Returns
    (html, steps) with steps = closure_steps(X, F)."""
    steps = closure_steps(X, F)
    rows = [["התחלה", "—", f"${tset(X)}$", f"${tset(X)}$"]]
    ids = [f"{pfx}-r0"]
    for k, (i, add, C) in enumerate(steps, 1):
        l, r = F[i]
        rows.append([str(k), f"${tfd(l, r)}$", f"${', '.join(add)}$", f"${tset(C)}$"])
        ids.append(f"{pfx}-r{k}")
    if final:
        C = closure(X, F)
        rows.append(["", "אין עוד שינוי", "", f'<b class="nf-res">${norm(X)}^+ = {tset(C)}$</b>'])
        ids.append(f"{pfx}-rend")
    return table(pfx, ["צעד", "התלות", "נוסף", "הסגור עד עכשיו"], rows, hidden=hidden, ids=ids,
                 cls="nf-cl " + cls), steps


def closure_phrases(pfx, X, F, steps, fd_pfx=None, lead=None):
    """one phrase per step of closure_table: 'A → BE: A is inside, add B, E'; highlights FD i in fd_set fd_pfx"""
    ph = []
    prev = None
    for k, (i, add, C) in enumerate(steps, 1):
        l, r = F[i]
        do = show(f"{pfx}-r{k}")
        if fd_pfx:
            do += (hide(f"{fd_pfx}-fh{prev}") if prev is not None else []) + show(f"{fd_pfx}-fh{i}")
        prev = i
        inside = f"${l}$ כבר בפנים" if len(l) == 1 else f"גם ${l[0]}$ וגם ${l[1:]}$ בפנים" if len(l) == 2 else f"${l}$ כולו בפנים"
        sub = f"${tfd(l, r)}$: {inside}, ולכן מוסיפים את ${', '.join(add)}$."
        ph.append(P(sub, do=do))
    return ph, prev


def key_table(pfx, R, F, cands, hidden=True, cls=""):
    """candidates X: X | X⁺ | superkey? | minimal (candidate)? Row {pfx}-r{i} shows X and X⁺; cell spans
    {pfx}-s{i} (superkey mark) and {pfx}-m{i} (minimal mark; '—' when not a superkey). Returns (html, facts) with
    facts[i] = (closure, superkey, candidate)."""
    rows, ids, facts = [], [], []
    for i, X in enumerate(cands):
        C = closure(X, F)
        sk = is_superkey(X, R, F)
        ck = is_candidate(X, R, F)
        facts.append((C, sk, ck))
        mtxt = mark(ck) if sk else "—"
        rows.append([f"${tset(X)}$", f"${tset(C)}$" if C != norm(R) else "$R$",
                     f'<span id="{pfx}-s{i}" class="h">{mark(sk)}</span>',
                     f'<span id="{pfx}-m{i}" class="h">{mtxt}</span>'])
        ids.append(f"{pfx}-r{i}")
    return table(pfx, ["קבוצה", "הסגור", "מפתח-על?", "קביל?"], rows, hidden=hidden, ids=ids, cls="nf-kt " + cls), facts


def nf_table(pfx, R, F, hidden=True, cls="", note=None):
    """the normal-form check of R under F, FD by FD: X → Y | X superkey? | Y∖X prime? | verdict. Cells {pfx}-k{i},
    {pfx}-p{i}, {pfx}-v{i}; row {pfx}-r{i}. Returns (html, facts, nf) with facts[i] = (superkey, prime or None) and
    nf = normal_form(R, F) (asserted consistent with the rows)."""
    P_ = primes(R, F)
    rows, ids, facts = [], [], []
    for i, (l, r) in enumerate(F):
        rr = minus(r, l)
        sk = is_superkey(l, R, F)
        pr = None if sk else has(P_, rr)
        facts.append((sk, pr))
        if sk:
            verdict, pcell = '<span class="nf-ok">תקינה</span>', "—"
        elif pr:
            verdict, pcell = '<span class="nf-warn">מפרה BCNF, מותרת ב-3NF</span>', OK
        else:
            verdict, pcell = '<span class="nf-no">מפרה 3NF</span>', NO
        rows.append([f"${tfd(l, r)}$", f'<span id="{pfx}-k{i}" class="h">{mark(sk)}</span>',
                     f'<span id="{pfx}-p{i}" class="h">{pcell}</span>', f'<span id="{pfx}-v{i}" class="h">{verdict}</span>'])
        ids.append(f"{pfx}-r{i}")
    nf = normal_form(R, F)
    if all(sk for sk, _ in facts):
        assert nf == "BCNF"
    elif all(sk or pr for sk, pr in facts):
        assert nf == "3NF"
    else:
        assert nf in ("2NF", "1NF")
    return table(pfx, ["תלות", "שמאל מפתח-על?", "ימין ראשוני?", "מסקנה"], rows, hidden=hidden, ids=ids,
                 cls="nf-nt " + cls), facts, nf


def comps(pfx, cs, F, names=None, hidden=True, nf=True, fds=True, cls=""):
    """a decomposition: a card per component Ri = (…) with the FDs that hold on it (a minimal cover of the
    projection of F) and, when nf=True, its normal form tag {pfx}-v{i}. Card {pfx}-c{i}. Returns (html, info) with
    info[i] = (cover, nf)."""
    names = names or [f"R_{i + 1}" for i in range(len(cs))]
    cards, info = [], []
    for i, Ri in enumerate(cs):
        cov = show_cover(Ri, F)
        f = nf_of_component(Ri, F)
        info.append((cov, f))
        ftxt = ", ".join(f"${tfd(l, r)}$" for l, r in cov) if cov else "—"
        tag = (f'<span id="{pfx}-v{i}" class="nf-nf h {"ok" if f == "BCNF" else "mid" if f == "3NF" else "bad"}">'
               f'{f}</span>') if nf else ""
        fl = f'<div class="nf-cf">{ftxt}</div>' if fds else ""
        cards.append(f'<div id="{pfx}-c{i}" class="nf-comp{" h" if hidden else ""}"><div class="nf-cn">'
                     f'${tR(Ri, names[i])}$</div>{fl}{tag}</div>')
    return f'<div class="nf-comps {cls}" id="{pfx}" dir="ltr">{"".join(cards)}</div>', info


def inst_table(pfx, cols, rows, name=None, hidden=False, cls="", hidden_rows=()):
    """a table instance (LTR). Row highlight {pfx}-h{i}; cell highlight {pfx}-c{i}-{j}; rows in hidden_rows start
    hidden, id {pfx}-row{i}."""
    th = "".join(f"<th>{c}</th>" for c in cols)
    trs = []
    for i, r in enumerate(rows):
        tds = "".join(f'<td><i id="{pfx}-c{i}-{j}" class="nf-cellhi h"></i><span>{v}</span></td>' for j, v in enumerate(r))
        hid = f' id="{pfx}-row{i}" class="h"' if i in hidden_rows else ""
        trs.append(f'<tr{hid}><td class="nf-rowhi-cell"><i id="{pfx}-h{i}" class="nf-rowhi h"></i>{i + 1}</td>{tds}</tr>')
    cap = f'<caption>{name}</caption>' if name else ""
    return (f'<table id="{pfx}" class="nf-inst {cls}{" h" if hidden else ""}" dir="ltr">{cap}<thead><tr><th></th>{th}</tr>'
            f'</thead><tbody>{"".join(trs)}</tbody></table>')


def show(*ids):
    return [("show", i) for i in ids]


def hide(*ids):
    return [("hide", i) for i in ids]


def opt_html(v):
    """a bank option value -> html for stage.options (TeX kept as $…$; [u]…[/u] underline)"""
    v = re.sub(r"\[u\](.+?)\[/u\]", r"<u>\1</u>", v)
    v = re.sub(r"\[d\](.+?)\[/d\]", r'<u class="nf-dash">\1</u>', v)
    return v.replace("`", "")


def opt_tex(v):
    """a bank option written in text: sets {A, B} and FDs C → D (or $C→D$) become TeX, the rest stays text"""
    v = opt_html(v).replace("->", "→")
    v = re.sub(r"\$([A-Z]+)\s*→\s*([A-Z]+)\$", r"\1 → \2", v)
    v = re.sub(r"\{([A-Z](?:,\s*[A-Z])*)\}", lambda m: f"${tset(norm(m.group(1)))}$", v)
    v = re.sub(r"(?<![A-Za-z$])([A-Z]+) → ([A-Z]+)(?![A-Za-z$])", lambda m: f"${tfd(m.group(1), m.group(2))}$", v)
    return v


def fd_opt(v):
    """an option written like 'C → D' or '{A, B}' -> TeX"""
    s = v.strip()
    if re.fullmatch(r"\{[A-Z ,]*\}", s):
        return f"${tset(norm(s))}$"
    if re.fullmatch(r"[A-Z ]+→[A-Z ]+", s):
        l, r = s.split("→")
        return f"${tfd(norm(l), norm(r))}$"
    return opt_html(s)
