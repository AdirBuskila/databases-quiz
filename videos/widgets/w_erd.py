# -*- coding: utf-8 -*-
"""ERD widgets for the erd course videos (L01-L10): the app's Chen-notation renderer (erd.js) ported to Python and
drawn at video scale, a lint for the diagrams (tools/erd_check.js: canvas + overlap), and an ER -> relational
translator that implements the course's rules exactly as the lessons state them (L10's checklist):

  entity            -> a table: its key (solid underline), its simple attributes; a composite attribute is replaced
                       by its leaves; a derived attribute is dropped; a multi-valued one gets its own table
                       (owner key, value) whose key is both
  weak entity       -> partial key (dashed) + the owner's full key (solid, part of the key); the identifying
                       relationship (double diamond) gets no table
  ISA subtype       -> inherited key (the root's key) + the subtype's own attributes only
  binary, no arrow  -> N:M -> a table; key = the keys of both sides; the relationship's attributes are columns
  binary, arrow ->X -> merged into the other side Y: X's key enters Y's table as a foreign key outside Y's key,
                       NOT NULL when Y's line is double; the relationship's attributes move with it
  recursive         -> roles; arrow on one role -> a foreign key to the same table; no arrow -> a table, key twice
  ternary           -> always a table; key = the keys of the participants without an arrow
  aggregation       -> no table of its own: the inner relationship's table is its table and its key is the key
                       of that table; a relationship merged "into the aggregation" adds columns to that table
  table count       = entities (subtypes and weak ones included) + multi-valued attributes + relationship tables

Spec format (same as erd.js): {w, h, nodes:[...], edges:[...]}; nodes {id, t, x, y, label, ...} with t in
entity/rel/attr/isa/agg/note, flags weak/ident/key/partial/multi/derived; edges {a: rel, b: entity|agg, arrow,
total, label}. Coordinates are px of the video at font size `fs`.

Ids drawn by Diagram(pfx, spec):
  {pfx}-g-<node>      a node group (class h when the node starts hidden; reveal() returns what to show)
  {pfx}-ge-<edge>     an edge group (hidden while one of its ends is hidden)
  {pfx}-hn-<node>     highlight over a node            {pfx}-he-<edge>  highlight over an edge
  {pfx}-tag-<name>    a small hidden badge next to a node (tags=[(name, node, text, dx, dy)])
edge key: "<a>-<b>" ("-2" for a second edge between the same pair); an attribute's own line: "<attr>-<owner>".
Class names start with er- (all widget css files load into every video of the app).
"""
import math
import re
from html import escape as _esc

HEB = re.compile(r"[֐-׿]")


def esc(s):
    return _esc(str(s), quote=True)


def he(s):
    return bool(HEB.search(str(s)))


def text_w(s, fs):
    """rough rendered width (the same estimate erd.js uses before the DOM can measure)"""
    w = 0.0
    for ch in str(s):
        if HEB.match(ch):
            w += .62
        elif re.match(r"[A-Z0-9_]", ch):
            w += .66
        elif ch.isspace():
            w += .3
        else:
            w += .55
    return w * fs


def lines(s):
    return str("" if s is None else s).split("\n")


# ---------------------------------------------------------------- geometry (erd.js size / reach / border)
def size(n, fs):
    k = fs / 14.0
    L = len(lines(n.get("label")))
    wid = max(text_w(l, fs) for l in lines(n.get("label")))
    t = n["t"]
    if t == "entity":
        return (n.get("w") or max(74 * k, wid + 30 * k)) / 2, (n.get("h") or 22 * k + L * 18 * k) / 2
    if t == "rel":
        return (n.get("w") or max(84 * k, wid * 1.25 + 46 * k)) / 2, (n.get("h") or 30 * k + L * 18 * k) / 2
    if t == "attr":
        return (n.get("w") or max(66 * k, wid + 30 * k)) / 2, (n.get("h") or 18 * k + L * 17 * k) / 2
    if t == "isa":
        return 30 * k, 20 * k
    if t == "agg":
        return n["w"] / 2, n["h"] / 2
    return wid / 2, 10 * k


def reach(n, s, ux, uy):
    hw, hh = s
    ax, ay = abs(ux), abs(uy)
    t = n["t"]
    if t == "rel":
        return 1 / (ax / hw + ay / hh)
    if t == "attr":
        return 1 / math.sqrt((ux / hw) ** 2 + (uy / hh) ** 2)
    if t == "isa":
        if uy < 0 and ay > ax * .6:
            return hh / ay
    return min(hw / ax if ax else 1e9, hh / ay if ay else 1e9)


def border(n, s, tx, ty):
    dx, dy = tx - n["x"], ty - n["y"]
    d = math.hypot(dx, dy) or 1
    r = reach(n, s, dx / d, dy / d)
    return n["x"] + dx / d * r, n["y"] + dy / d * r


# ---------------------------------------------------------------- lint (tools/erd_check.js)
def lint(spec, fs):
    """errors: duplicate ids, unknown owners/endpoints, shapes outside the canvas, overlapping shapes"""
    errs, N = [], {}
    for n in spec["nodes"]:
        if n["id"] in N:
            errs.append(f"duplicate node id {n['id']}")
        N[n["id"]] = n
    W, H = spec["w"], spec["h"]
    boxes = []
    for n in spec["nodes"]:
        hw, hh = size(n, fs)
        b = (n, n["x"] - hw, n["x"] + hw, n["y"] - hh, n["y"] + hh)
        boxes.append(b)
        if b[1] < 2 or b[3] < 2 or b[2] > W - 2 or b[4] > H - 2:
            errs.append(f"node {n['id']} ({n.get('label', n['t'])}) outside canvas {W}x{H}: "
                        f"{[round(v) for v in b[1:]]}")
    shrink = {"attr": .78, "rel": .78, "isa": .8}
    solid = [b for b in boxes if b[0]["t"] != "agg"]
    for i in range(len(solid)):
        for j in range(i + 1, len(solid)):
            a, b = solid[i], solid[j]
            ka, kb = shrink.get(a[0]["t"], 1), shrink.get(b[0]["t"], 1)
            ax, ay = (a[2] - a[1]) / 2 * ka, (a[4] - a[3]) / 2 * ka
            bx, by = (b[2] - b[1]) / 2 * kb, (b[4] - b[3]) / 2 * kb
            if abs(a[0]["x"] - b[0]["x"]) < ax + bx + 4 and abs(a[0]["y"] - b[0]["y"]) < ay + by + 4:
                errs.append(f"overlap: {a[0]['id']} x {b[0]['id']}")
    for g in [b for b in boxes if b[0]["t"] == "agg"]:
        for b in solid:
            inside = b[1] >= g[1] and b[2] <= g[2] and b[3] >= g[3] and b[4] <= g[4]
            outside = b[2] <= g[1] or b[1] >= g[2] or b[4] <= g[3] or b[3] >= g[4]
            if not inside and not outside:
                errs.append(f"node {b[0]['id']} straddles aggregation {g[0]['id']}")
    for n in spec["nodes"]:
        if n["t"] == "attr" and n.get("of") not in N:
            errs.append(f"attr without valid owner {n['id']}")
    for e in spec.get("edges", []):
        if e["a"] not in N or e["b"] not in N:
            errs.append(f"edge endpoint missing {e['a']} -> {e['b']}")
    return errs


# ---------------------------------------------------------------- drawing
def _r(v):
    return f"{round(v, 1):g}"


def _all_edges(spec):
    """attribute lines first (owner -> attr), then the spec edges, each with a unique key"""
    out, seen = [], {}
    for n in spec["nodes"]:
        if n["t"] == "attr" and n.get("of"):
            out.append(({"a": n["id"], "b": n["of"]}, f"{n['id']}-{n['of']}"))
    for e in spec.get("edges", []):
        k = f"{e['a']}-{e['b']}"
        seen[k] = seen.get(k, 0) + 1
        out.append((e, k if seen[k] == 1 else f"{k}-{seen[k]}"))
    return out


class Diagram:
    def __init__(self, pfx, spec, fs=24, hidden=(), tags=(), scale=1.0, cls=""):
        """hidden: node ids that start hidden ("*" = all); tags: [(name, node_id, text, dx, dy)]"""
        errs = lint(spec, fs)
        assert not errs, f"{pfx}: " + "; ".join(errs)
        self.pfx, self.spec, self.fs, self.scale, self.cls = pfx, spec, fs, scale, cls
        self.N = {n["id"]: n for n in spec["nodes"]}
        self.S = {i: size(n, fs) for i, n in self.N.items()}
        self.hidden = set(self.N) if hidden == "*" else set(hidden)
        self._shown = set(self.N) - self.hidden
        self.edges = _all_edges(spec)
        self.tags = list(tags)

    # ids
    def hn(self, *nodes):
        return [f"{self.pfx}-hn-{n}" for n in nodes]

    def he(self, a, b, k=1):
        key = f"{a}-{b}" if k == 1 else f"{a}-{b}-{k}"
        assert any(kk == key for _, kk in self.edges), key
        return f"{self.pfx}-he-{key}"

    def tag(self, name):
        return f"{self.pfx}-tag-{name}"

    def reveal(self, *nodes):
        """node ids (and attributes owned by them when `with_attrs`) -> ids to show: the node groups and the edges
        whose both ends are visible now"""
        out = []
        for n in nodes:
            assert n in self.N, n
            if n not in self._shown:
                self._shown.add(n)
                out.append(f"{self.pfx}-g-{n}")
        for e, k in self.edges:
            if e["a"] in self._shown and e["b"] in self._shown and (e["a"] in nodes or e["b"] in nodes):
                if e["a"] in self.hidden or e["b"] in self.hidden:
                    out.append(f"{self.pfx}-ge-{k}")
        return list(dict.fromkeys(out))

    def attrs_of(self, *owners):
        """attribute nodes hanging (directly or through a composite) from the owners"""
        out, frontier = [], set(owners)
        while frontier:
            nxt = {n["id"] for n in self.spec["nodes"] if n["t"] == "attr" and n.get("of") in frontier}
            out += sorted(nxt - set(out), key=lambda i: [n["id"] for n in self.spec["nodes"]].index(i))
            frontier = nxt
        return out

    # svg
    def _text(self, n, cls, fs):
        ls = lines(n.get("label"))
        lh = 17 * self.fs / 14
        y0 = n["y"] - (len(ls) - 1) * lh / 2
        d = ' direction="rtl"' if he(n.get("label")) else ""
        out = []
        for i, l in enumerate(ls):
            y = y0 + i * lh
            out.append(f'<text class="{cls}" x="{_r(n["x"])}" y="{_r(y)}" font-size="{_r(fs)}" text-anchor="middle" '
                       f'dominant-baseline="central"{d}>{esc(l)}</text>')
            if n.get("key") or n.get("partial"):
                w = text_w(l, fs) * (.88 if he(l) else .98)
                yy = y + fs * .62
                out.append(f'<line class="er-ul{" dashed" if n.get("partial") else ""}" x1="{_r(n["x"] - w / 2)}" '
                           f'y1="{_r(yy)}" x2="{_r(n["x"] + w / 2)}" y2="{_r(yy)}"/>')
        return "".join(out)

    def _shape(self, n, cls, extra=""):
        hw, hh = self.S[n["id"]]
        x, y, t = n["x"], n["y"], n["t"]
        k = self.fs / 14
        if t == "entity":
            s = f'<rect class="{cls}" x="{_r(x - hw)}" y="{_r(y - hh)}" width="{_r(2 * hw)}" height="{_r(2 * hh)}"{extra}/>'
            if n.get("weak") and "er-hi" not in cls:
                g = 5 * k
                s += (f'<rect class="{cls} inner" x="{_r(x - hw + g)}" y="{_r(y - hh + g)}" width="{_r(2 * hw - 2 * g)}" '
                      f'height="{_r(2 * hh - 2 * g)}"/>')
            return s
        if t == "rel":
            def pts(g):
                return f"{_r(x)},{_r(y - hh + g)} {_r(x + hw - g * 1.6)},{_r(y)} {_r(x)},{_r(y + hh - g)} {_r(x - hw + g * 1.6)},{_r(y)}"
            s = f'<polygon class="{cls}" points="{pts(0)}"{extra}/>'
            if n.get("ident") and "er-hi" not in cls:
                s += f'<polygon class="{cls} inner" points="{pts(6 * k)}"/>'
            return s
        if t == "attr":
            c = cls + (" dashed" if n.get("derived") and "er-hi" not in cls else "")
            s = f'<ellipse class="{c}" cx="{_r(x)}" cy="{_r(y)}" rx="{_r(hw)}" ry="{_r(hh)}"{extra}/>'
            if n.get("multi") and "er-hi" not in cls:
                g = 5 * k
                s += f'<ellipse class="{cls} inner" cx="{_r(x)}" cy="{_r(y)}" rx="{_r(hw - g)}" ry="{_r(hh - g)}"/>'
            return s
        if t == "isa":
            return f'<polygon class="{cls}" points="{_r(x)},{_r(y - hh)} {_r(x + hw)},{_r(y + hh)} {_r(x - hw)},{_r(y + hh)}"{extra}/>'
        if t == "agg":
            return (f'<rect class="{cls} agg" x="{_r(x - hw)}" y="{_r(y - hh)}" width="{_r(2 * hw)}" height="{_r(2 * hh)}" '
                    f'rx="{_r(6 * k)}"{extra}/>')
        return ""

    def _node(self, n):
        t, fs = n["t"], self.fs
        if t in ("entity", "rel"):
            body = self._shape(n, "er-shape") + self._text(n, "er-label strong", fs * 1.06)
        elif t == "attr":
            body = self._shape(n, "er-shape") + self._text(n, "er-label", fs)
        elif t == "isa":
            body = self._shape(n, "er-shape") + (f'<text class="er-label small" x="{_r(n["x"])}" y="{_r(n["y"] + 6 * fs / 14)}" '
                                                 f'font-size="{_r(fs * .7)}" text-anchor="middle" dominant-baseline="central">'
                                                 f'{esc(n.get("label") or "ISA")}</text>')
        elif t == "agg":
            hw, hh = self.S[n["id"]]
            lbl = ""
            if n.get("label"):
                rtl = he(n["label"])
                lx = n["x"] + hw - 12 if rtl else n["x"] - hw + 12
                lbl = (f'<text class="er-label agg" x="{_r(lx)}" y="{_r(n["y"] - hh + fs * .75)}" '
                       f'font-size="{_r(fs * .82)}" text-anchor="start" dominant-baseline="central" '
                       f'direction="{"rtl" if rtl else "ltr"}">{esc(n["label"])}</text>')
            body = self._shape(n, "er-shape") + lbl
        else:
            body = self._text(n, "er-label note", fs * .85)
        h = " h" if n["id"] in self.hidden else ""
        return f'<g id="{self.pfx}-g-{n["id"]}" class="er-node{h}">{body}</g>'

    def _edge_pts(self, e):
        A, B = self.N[e["a"]], self.N[e["b"]]
        via = e.get("pts") or []
        first = via[0] if via else (B["x"], B["y"])
        last = via[-1] if via else (A["x"], A["y"])
        return [border(A, self.S[A["id"]], *first)] + [tuple(p) for p in via] + [border(B, self.S[B["id"]], *last)]

    def _edge(self, e, key):
        k = self.fs / 14
        p = self._edge_pts(e)
        n = len(p)
        tip = None
        if e.get("arrow"):
            (px, py), (qx, qy) = p[-2], p[-1]
            d = math.hypot(qx - px, qy - py) or 1
            tip = (qx, qy, (qx - px) / d, (qy - py) / d)
            p[-1] = (qx - (qx - px) / d * 9 * k, qy - (qy - py) / d * 9 * k)
        s = []
        for i in range(n - 1):
            (x1, y1), (x2, y2) = p[i], p[i + 1]
            if e.get("total"):
                d = math.hypot(x2 - x1, y2 - y1) or 1
                ox, oy = -(y2 - y1) / d * 2.6 * k, (x2 - x1) / d * 2.6 * k
                for sg in (1, -1):
                    s.append(f'<line class="er-edge" x1="{_r(x1 + sg * ox)}" y1="{_r(y1 + sg * oy)}" '
                             f'x2="{_r(x2 + sg * ox)}" y2="{_r(y2 + sg * oy)}"/>')
            else:
                s.append(f'<line class="er-edge" x1="{_r(x1)}" y1="{_r(y1)}" x2="{_r(x2)}" y2="{_r(y2)}"/>')
        if tip:
            tx, ty, ux, uy = tip
            L, W = 13 * k, 6.5 * k
            bx, by = tx - ux * L, ty - uy * L
            s.append(f'<polygon class="er-arrow" points="{_r(tx)},{_r(ty)} {_r(bx - uy * W)},{_r(by + ux * W)} '
                     f'{_r(bx + uy * W)},{_r(by - ux * W)}"/>')
        if e.get("label"):
            (x1, y1) = p[-2]
            (x2, y2) = (tip[0], tip[1]) if tip else p[-1]
            d = math.hypot(x2 - x1, y2 - y1) or 1
            ux, uy = (x2 - x1) / d, (y2 - y1) / d
            fs = 12 * k
            tw = text_w(e["label"], fs)
            px, py = -uy, ux
            off = 9 * k + abs(px) * tw / 2 + abs(py) * 8 * k
            back = min(26 * k + abs(ux) * tw / 2, d * .45)
            side = -1 if e.get("labelSide") == -1 else 1
            lx, ly = x2 - ux * back + px * off * side, y2 - uy * back + py * off * side
            dr = ' direction="rtl"' if he(e["label"]) else ""
            s.append(f'<text class="er-label elabel" x="{_r(lx)}" y="{_r(ly)}" font-size="{_r(fs * 1.1)}" '
                     f'text-anchor="middle" dominant-baseline="central"{dr}>{esc(e["label"])}</text>')
        hid = e["a"] in self.hidden or e["b"] in self.hidden
        return f'<g id="{self.pfx}-ge-{key}" class="er-e{" h" if hid else ""}">{"".join(s)}</g>'

    def _edge_hi(self, e, key):
        p = self._edge_pts(e)
        if e.get("arrow"):          # the highlight ends at the tip
            pass
        d = "M" + " L".join(f"{_r(x)},{_r(y)}" for x, y in p)
        return f'<path id="{self.pfx}-he-{key}" class="er-ehi h" d="{d}"/>'

    def svg(self):
        sp = self.spec
        nodes = sp["nodes"]
        order = ["agg", "note", "isa", "rel", "entity", "attr"]
        body = [self._node(n) for n in nodes if n["t"] == "agg"]
        body += [self._edge(e, k) for e, k in self.edges]
        body += [self._edge_hi(e, k) for e, k in self.edges]
        body += [self._node(n) for n in sorted((n for n in nodes if n["t"] != "agg"), key=lambda n: order.index(n["t"]))]
        k = self.fs / 14
        for n in nodes:                                          # node highlights over everything
            if n["t"] == "note":
                continue
            ext = f' id="{self.pfx}-hn-{n["id"]}"'
            body.append(self._shape(n, "er-hi h", ext))
        for name, nid, text, dx, dy in self.tags:
            n = self.N[nid]
            fs = self.fs * .82
            tw = text_w(text, fs) + 22 * k
            x, y = n["x"] + dx, n["y"] + dy
            dr = ' direction="rtl"' if he(text) else ""
            body.append(f'<g id="{self.pfx}-tag-{name}" class="h"><rect class="er-tagbg" x="{_r(x - tw / 2)}" '
                        f'y="{_r(y - fs * .8)}" width="{_r(tw)}" height="{_r(fs * 1.6)}" rx="{_r(fs * .8)}"/>'
                        f'<text class="er-tag" x="{_r(x)}" y="{_r(y)}" font-size="{_r(fs)}" text-anchor="middle" '
                        f'dominant-baseline="central"{dr}>{esc(text)}</text></g>')
        w, h = sp["w"], sp["h"]
        return (f'<svg class="er-svg {self.cls}" id="{self.pfx}" viewBox="0 0 {w} {h}" width="{_r(w * self.scale)}" '
                f'height="{_r(h * self.scale)}" direction="ltr">{"".join(body)}</svg>')


# ---------------------------------------------------------------- ER -> relational (the course's rules)
class Col:
    def __init__(self, name, kind="a", fk=None, notnull=False):
        """kind: pk (solid underline), ppk (partial key, dashed), a (plain). fk: the table it references."""
        self.name, self.kind, self.fk, self.notnull = name, kind, fk, notnull

    def __repr__(self):
        return f"{self.name}:{self.kind}{'*' if self.fk else ''}{'!' if self.notnull else ''}"


class Table:
    def __init__(self, name, why, src):
        self.name, self.why, self.src, self.cols = name, why, src, []

    def add(self, col):
        names = [c.name for c in self.cols]
        assert col.name not in names, f"column clash in {self.name}: {col.name}"
        self.cols.append(col)

    @property
    def key(self):
        return [c.name for c in self.cols if c.kind in ("pk", "ppk")]

    def __repr__(self):
        return f"{self.name}({', '.join(map(repr, self.cols))})"


def _leaves(spec, attr_id):
    kids = [n for n in spec["nodes"] if n["t"] == "attr" and n.get("of") == attr_id]
    if not kids:
        return [attr_id]
    out = []
    for k in kids:
        out += _leaves(spec, k["id"])
    return out


def translate(spec, names=None):
    """the course's translation -> (list of Table, {node_id: Table it lives in}, notes).
    names: {node_id: table name} overrides (default: the node label; multi-valued: attr 'tname' or the label)."""
    names = dict(names or {})
    N = {n["id"]: n for n in spec["nodes"]}
    edges = spec.get("edges", [])
    attrs = lambda owner: [n for n in spec["nodes"] if n["t"] == "attr" and n.get("of") == owner]
    lab = lambda i: N[i]["label"].replace("\n", " ")
    isa_parent, isa_kids = {}, {}
    for i in [n["id"] for n in spec["nodes"] if n["t"] == "isa"]:
        es = [e for e in edges if e["a"] == i]
        par = [e["b"] for e in es if N[e["b"]]["y"] < N[i]["y"]]
        assert len(par) == 1, f"isa {i}: parent = the entity above the triangle"
        for e in es:
            if e["b"] != par[0]:
                isa_parent[e["b"]] = par[0]
                isa_kids.setdefault(par[0], []).append(e["b"])
    rels = [n["id"] for n in spec["nodes"] if n["t"] == "rel"]
    parts = {r: [e for e in edges if e["a"] == r and N[e["b"]]["t"] in ("entity", "agg")] for r in rels}
    for e in edges:
        assert N[e["a"]]["t"] in ("rel", "isa"), f"edges go from a relationship/isa to an entity: {e}"
    agg_inner = {}
    for g in [n for n in spec["nodes"] if n["t"] == "agg"]:
        hw, hh = g["w"] / 2, g["h"] / 2
        inside = [r for r in rels if abs(N[r]["x"] - g["x"]) < hw and abs(N[r]["y"] - g["y"]) < hh]
        assert len(inside) == 1, f"aggregation {g['id']} must hold exactly one relationship"
        agg_inner[g["id"]] = inside[0]
    owner = {}
    for r in rels:
        if N[r].get("ident"):
            ps = parts[r]
            own = [e["b"] for e in ps if e.get("arrow")]
            weak = [e["b"] for e in ps if not e.get("arrow")]
            assert len(own) == 1 and len(weak) == 1 and N[weak[0]].get("weak"), f"identifying {r}"
            owner[weak[0]] = own[0]

    def key_of(x):
        """the key columns of a participant: [(column name, kind in its own table)]"""
        n = N[x]
        if n["t"] == "agg":
            return [(c, "pk") for c, _ in rel_key(agg_inner[x])]
        if x in isa_parent:
            return key_of(isa_parent[x])
        if n.get("weak"):
            return [(c, "pk") for c, _ in key_of(owner[x])] + [(lab(a["id"]), "ppk") for a in attrs(x) if a.get("partial")]
        ks = [(lab(a["id"]), "pk") for a in attrs(x) if a.get("key")]
        assert ks, f"entity {x} has no key"
        return ks

    def rel_key(r):
        ps = parts[r]
        free = [e for e in ps if not e.get("arrow")] if len(ps) > 2 else ps
        out = []
        for e in free:
            out += key_of(e["b"])
        return out

    tables, home, notes = [], {}, []

    def ent_table(x):
        n = N[x]
        why = "תת-סוג" if x in isa_parent else ("ישות חלשה" if n.get("weak") else "ישות")
        T = Table(names.get(x, lab(x)), why, x)
        if x in isa_parent:
            for c, _ in key_of(x):
                T.add(Col(c, "pk", fk=isa_parent[x]))
        elif n.get("weak"):
            for c, _ in key_of(owner[x]):
                T.add(Col(c, "pk", fk=owner[x]))
        for a in attrs(x):
            if a.get("derived"):
                notes.append(f"{lab(a['id'])}: מחושבת, לא נשמרת")
                continue
            if a.get("multi"):
                continue
            if a.get("partial"):
                T.add(Col(lab(a["id"]), "ppk"))
                continue
            for leaf in _leaves(spec, a["id"]):
                T.add(Col(lab(leaf), "pk" if a.get("key") else "a"))
        # keep the solid key first for strong entities (as the lessons write them)
        tables.append(T)
        home[x] = T
        for a in attrs(x):
            if a.get("multi"):
                M = Table(a.get("tname") or names.get(a["id"], lab(a["id"])), "מרובת ערכים", a["id"])
                for c, _ in key_of(x):
                    M.add(Col(c, "pk", fk=x))
                M.add(Col(a.get("col") or lab(a["id"]), "pk"))
                tables.append(M)
                home[a["id"]] = M

    for n in spec["nodes"]:
        if n["t"] == "entity":
            ent_table(n["id"])

    def rel_attr_cols(r, T):
        for a in attrs(r):
            if a.get("derived"):
                continue
            assert not a.get("multi"), "multi-valued attribute on a relationship: not in the course"
            for leaf in _leaves(spec, a["id"]):
                T.add(Col(lab(leaf), "a"))

    def add_fk(T, x, role=None, notnull=False, pk=False, clash_label=None):
        for c, _ in key_of(x):
            name = c if role is None else f"{c} {role}"
            old = next((cc for cc in T.cols if cc.name == name), None)
            if old is not None:                   # same key name on both sides: name each by its entity
                if old.fk and T.src not in (old.fk,) and old.fk != x:
                    old.name = f"{c} {lab(old.fk)}"
                name = f"{c} {clash_label or lab(x)}"
            T.add(Col(name, "pk" if pk else "a", fk=x, notnull=notnull))

    # relationships: tables first (so an aggregation's table exists before something merges into it)
    order = sorted(rels, key=lambda r: (0 if any(agg_inner.get(g) == r for g in agg_inner) else 1, rels.index(r)))
    for r in order:
        if N[r].get("ident"):
            continue
        ps = parts[r]
        arrows = [e for e in ps if e.get("arrow")]
        ents = [e["b"] for e in ps]
        recursive = len(ps) == 2 and ents[0] == ents[1]
        if len(ps) > 2:                                    # ternary: always a table
            T = Table(names.get(r, lab(r)), "קשר טרינארי", r)
            for e in ps:
                add_fk(T, e["b"], pk=not e.get("arrow"))
            rel_attr_cols(r, T)
            tables.append(T)
            home[r] = T
            continue
        if recursive:
            roles = [e.get("label") for e in ps]
            assert all(roles), f"recursive {r} needs role labels"
            if arrows:
                assert len(arrows) == 1
                T = home[ents[0]]
                add_fk(T, ents[0], role=arrows[0]["label"])
                rel_attr_cols(r, T)
                home[r] = T
            else:
                T = Table(names.get(r, lab(r)), "קשר N:M", r)
                for e in ps:
                    add_fk(T, e["b"], role=e["label"], pk=True)
                rel_attr_cols(r, T)
                tables.append(T)
                home[r] = T
            continue
        if not arrows:                                     # N:M
            T = Table(names.get(r, lab(r)), "קשר N:M", r)
            for e in ps:
                add_fk(T, e["b"], pk=True)
            rel_attr_cols(r, T)
            tables.append(T)
            home[r] = T
            continue
        if len(arrows) == 2:                              # 1:1: merge into a side with total participation
            into = next((e for e in ps if e.get("total")), ps[0])
        else:
            into = next(e for e in ps if not e.get("arrow"))
        other = next(e for e in ps if e is not into)
        tgt = into["b"]
        T = home[agg_inner[tgt]] if N[tgt]["t"] == "agg" else home[tgt]
        add_fk(T, other["b"], notnull=bool(into.get("total")))
        rel_attr_cols(r, T)
        home[r] = T
    return tables, home, notes


def count_parts(tables):
    """(entities, multi-valued, relationship tables) as the lessons count them"""
    e = sum(1 for t in tables if t.why in ("ישות", "ישות חלשה", "תת-סוג"))
    m = sum(1 for t in tables if t.why == "מרובת ערכים")
    r = len(tables) - e - m
    return e, m, r


# ---------------------------------------------------------------- schema lines
def col_html(c, ids=None):
    cls = {"pk": "er-pk", "ppk": "er-ppk", "a": ""}[c.kind]
    nn = '<span class="er-nn">NOT NULL</span>' if c.notnull else ""
    fk = " er-fk" if c.fk and c.kind == "a" else ""
    i = f' id="{ids}"' if ids else ""
    return f'<span class="er-col {cls}{fk}"{i}>{esc(c.name)}{nn}</span>'


def schema_line(pfx, T, hidden=True, extra_cls="", hi=True):
    """one table as Name(col, col, ...); id {pfx}; column ids {pfx}-c<j>; a highlight bar {pfx}-hi"""
    d = "rtl" if he(T.name) or any(he(c.name) for c in T.cols) else "ltr"
    cols = ", ".join(col_html(c, f"{pfx}-c{j}") for j, c in enumerate(T.cols))
    h = " h" if hidden else ""
    bar = f'<i id="{pfx}-hi" class="er-sbar h"></i>' if hi else ""
    return (f'<div class="er-sch{h} {extra_cls}" id="{pfx}" dir="{d}">{bar}<b>{esc(T.name)}</b>'
            f'<span class="er-par">(</span>{cols}<span class="er-par">)</span></div>')


def schema_text(T):
    """plain text with [u]/[d] marks, the bank's option format, for comparisons"""
    def one(c):
        return f"[u]{c.name}[/u]" if c.kind == "pk" else (f"[d]{c.name}[/d]" if c.kind == "ppk" else c.name)
    return f"{T.name}({', '.join(one(c) for c in T.cols)})"


def bank_markup(s):
    """bank option markup -> HTML ([u] solid, [d] dashed, **bold**, `code`)"""
    s = esc(s)
    s = re.sub(r"\[u\](.+?)\[/u\]", r'<span class="er-pk">\1</span>', s)
    s = re.sub(r"\[d\](.+?)\[/d\]", r'<span class="er-ppk">\1</span>', s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    s = re.sub(r"`(.+?)`", r'<span class="er-code">\1</span>', s)
    return s


def bank_opts(Q, ltr=False):
    out = []
    for o in Q["options"]:
        h = bank_markup(o["value"])
        if o.get("type") == "schema" or ltr:
            d = "rtl" if he(o["value"]) else "ltr"
            h = f'<span class="er-osch" dir="{d}">{h}</span>'
        out.append((o["id"], h))
    return out


# ---------------------------------------------------------------- small layout helpers
def stack(*parts, gap=24, cls=""):
    return f'<div class="er-stack {cls}" style="gap:{gap}px">{"".join(parts)}</div>'


def box(id_, html, cls="", hidden=True):
    return f'<div id="{id_}" class="er-box {cls}{" h" if hidden else ""}">{html}</div>'


def count_row(pfx, parts, total, hidden=True):
    """[(label, n)] -> 'label n + label n = total' with ids {pfx}-p<i> and {pfx}-tot"""
    cells = []
    for i, (lbl, n) in enumerate(parts):
        plus = '<span class="er-op">+</span>' if i else ""
        cells.append(f'<span id="{pfx}-p{i}" class="er-cnt{" h" if hidden else ""}">{plus}<span class="er-cl">{lbl}</span>'
                     f'<b>{n}</b></span>')
    cells.append(f'<span id="{pfx}-tot" class="er-cnt tot{" h" if hidden else ""}"><span class="er-op">=</span>'
                 f'<b>{total}</b></span>')
    assert sum(n for _, n in parts) == total
    return f'<div class="er-count" dir="rtl">{"".join(cells)}</div>'


def claims(pfx, rows):
    """statements to judge: rows [(cid, html, truth)] -> row {pfx}-<cid> (hidden), verdict {pfx}-v-<cid}"""
    out = []
    for cid, h, ok in rows:
        mark = '<b class="er-ok">✓</b>' if ok else '<b class="er-no">✗</b>'
        out.append(f'<div class="er-claim h" id="{pfx}-{cid}"><span>{h}</span>'
                   f'<span class="er-v h" id="{pfx}-v-{cid}">{mark}</span></div>')
    return f'<div class="er-claims">{"".join(out)}</div>'


def relayout(spec, sx, sy, moves=None):
    """the same diagram (same nodes, flags, labels and edges) spread to video size: every x*sx, y*sy, then the
    nudges in moves {node_id: (dx, dy)}. Used for the bank's own `erd` contexts, which the app draws at font 14."""
    import copy
    out = copy.deepcopy(spec)
    out["w"], out["h"] = round(spec["w"] * sx), round(spec["h"] * sy)
    for n in out["nodes"]:
        n["x"], n["y"] = round(n["x"] * sx), round(n["y"] * sy)
        if n["t"] == "agg":
            n["w"], n["h"] = round(n["w"] * sx), round(n["h"] * sy)
        dx, dy = (moves or {}).get(n["id"], (0, 0))
        n["x"] += dx
        n["y"] += dy
    assert same_content(spec, out)
    return out


def same_content(a, b):
    """True when two specs differ only in coordinates / canvas size"""
    strip = lambda n: {k: v for k, v in n.items() if k not in ("x", "y", "w", "h")}
    return ([strip(n) for n in a["nodes"]] == [strip(n) for n in b["nodes"]]
            and a.get("edges", []) == b.get("edges", []))
