// Relational-algebra evaluator for checking the algebra course (tools/alg_check.js).
// Parses the exam's notation exactly as the options are written (renderAlgebra markup):
//   Π_{a, b} σ_{cond} ρ_{T1} R      unary (apply to the operand right after them)
//   X / × (Cartesian)  ⊗ / ⋈ (natural join)   bind tighter than   − / - ∪ ∩ ÷ (left to right)
//   NAME ← expr  (one per line or ';'-separated) defines a temporary relation; the last line is the result
//   conditions: = != ≠ <> < > <= >= ≤ ≥, ∧ ∨ ¬ (or AND OR NOT), "strings" / 'strings', numbers, True/False
// Relations are sets (duplicates removed). Columns keep the relation they came from, so T1.x and x both
// resolve; an unknown or ambiguous column throws (that's how "the query is invalid" options are caught).
function tokenize(src){
  const T = []; let i = 0; const s = String(src);
  const sub = () => {                       // reads _{ … } with nested braces
    if (s[i] !== "_" || s[i + 1] !== "{") throw new Error("expected _{…} after operator at " + i);
    let d = 0, j = i + 1;
    for (; j < s.length; j++){ if (s[j] === "{") d++; else if (s[j] === "}" && --d === 0) break; }
    const body = s.slice(i + 2, j); i = j + 1; return body;
  };
  while (i < s.length){
    const c = s[i];
    if (/\s/.test(c)){ if (c === "\n") T.push({ t: "sep" }); i++; continue; }
    if (c === ";"){ T.push({ t: "sep" }); i++; continue; }
    if (c === "Π" || c === "π"){ i++; T.push({ t: "pi", arg: sub() }); continue; }
    if (c === "σ"){ i++; T.push({ t: "sigma", arg: sub() }); continue; }
    if (c === "ρ"){ i++; T.push({ t: "rho", arg: sub() }); continue; }
    if (c === "(" || c === ")"){ T.push({ t: c }); i++; continue; }
    if ("×⊗⋈−∪∩÷←-".includes(c)){
      if (c === "-" && s[i + 1] === ">") throw new Error("'->' in an expression");
      if (c === "<" ) {}
      T.push({ t: "op", v: { "×": "X", "⊗": "J", "⋈": "J", "−": "-", "-": "-", "∪": "U", "∩": "I", "÷": "D", "←": "=" }[c] }); i++; continue;
    }
    if (c === "<" && s[i + 1] === "-"){ T.push({ t: "op", v: "=" }); i += 2; continue; }
    const m = /^[A-Za-z_֐-׿][\w֐-׿]*/.exec(s.slice(i));
    if (m){ T.push({ t: "name", v: m[0] }); i += m[0].length; continue; }
    throw new Error(`unexpected '${c}' in expression`);
  }
  return T;
}

const lc = s => String(s).toLowerCase();
function rel(cols, rows){ // dedupe
  const seen = new Set(), out = [];
  for (const r of rows){ const k = JSON.stringify(r); if (!seen.has(k)){ seen.add(k); out.push(r); } }
  return { cols, rows: out };
}
function colIndex(R, ref){
  const parts = String(ref).trim().split(".");
  let hits;
  if (parts.length === 2) hits = R.cols.map((c, i) => [c, i]).filter(([c]) => lc(c.rel) === lc(parts[0]) && lc(c.name) === lc(parts[1]));
  else hits = R.cols.map((c, i) => [c, i]).filter(([c]) => lc(c.name) === lc(parts[0]));
  if (!hits.length) throw new Error(`no column '${ref}' (have ${R.cols.map(c => c.rel + "." + c.name).join(", ")})`);
  if (hits.length > 1) throw new Error(`ambiguous column '${ref}'`);
  return hits[0][1];
}

// ---- conditions ----
function condTokens(src){
  const T = []; let i = 0; const s = String(src);
  while (i < s.length){
    const c = s[i];
    if (/\s/.test(c)){ i++; continue; }
    if ("()".includes(c)){ T.push({ t: c }); i++; continue; }
    const two = s.slice(i, i + 2);
    if (["!=", "<>", "<=", ">="].includes(two)){ T.push({ t: "cmp", v: two === "<>" ? "!=" : two }); i += 2; continue; }
    if ("=<>≠≤≥".includes(c)){ T.push({ t: "cmp", v: { "≠": "!=", "≤": "<=", "≥": ">=" }[c] || c }); i++; continue; }
    if (c === "∧"){ T.push({ t: "and" }); i++; continue; }
    if (c === "∨"){ T.push({ t: "or" }); i++; continue; }
    if (c === "¬"){ T.push({ t: "not" }); i++; continue; }
    if (`"'“”״`.includes(c)){
      const close = c === "“" ? "”" : c; let j = i + 1;
      while (j < s.length && s[j] !== close && !(close === '"' && s[j] === "”")) j++;
      T.push({ t: "val", v: s.slice(i + 1, j) }); i = j + 1; continue;
    }
    const num = /^-?\d+(\.\d+)?/.exec(s.slice(i));
    if (num){ T.push({ t: "val", v: Number(num[0]) }); i += num[0].length; continue; }
    const m = /^[A-Za-z_֐-׿][\w.֐-׿]*/.exec(s.slice(i));
    if (m){
      const w = m[0], u = w.toUpperCase();
      if (u === "AND") T.push({ t: "and" }); else if (u === "OR") T.push({ t: "or" }); else if (u === "NOT") T.push({ t: "not" });
      else T.push({ t: "ref", v: w });
      i += w.length; continue;
    }
    throw new Error(`unexpected '${c}' in condition '${src}'`);
  }
  return T;
}
function compileCond(src, R){
  const T = condTokens(src); let p = 0;
  const peek = () => T[p], eat = t => { if (!T[p] || T[p].t !== t) throw new Error(`condition '${src}': expected ${t}`); return T[p++]; };
  function operand(){
    const k = T[p++];
    if (!k) throw new Error(`condition '${src}' ends early`);
    if (k.t === "val") return () => k.v;
    if (k.t === "ref"){
      if (/^(true|false)$/i.test(k.v)){
        try { const i = colIndex(R, k.v); return row => row[i]; } catch (e) { const b = /^true$/i.test(k.v); return () => b; }
      }
      const i = colIndex(R, k.v); return row => row[i];
    }
    throw new Error(`condition '${src}': bad operand`);
  }
  function atom(){
    if (peek() && peek().t === "not"){ p++; const f = atom(); return r => !f(r); }
    if (peek() && peek().t === "("){ p++; const f = or(); eat(")"); return f; }
    const a = operand();
    if (!peek() || peek().t !== "cmp"){ return r => a(r) === true; }
    const op = T[p++].v, b = operand();
    const norm = v => (v === true || v === false) ? String(v) : v;
    return r => { const x = norm(a(r)), y = norm(b(r));
      if (x === null || y === null) return false;
      const xn = typeof x === "number" || typeof y === "number" ? [Number(x), Number(y)] : [String(x), String(y)];
      const [u, v] = xn;
      return op === "=" ? (typeof x === "string" && typeof y === "string" ? lc(u) === lc(v) : u === v) : op === "!=" ? !(typeof x === "string" && typeof y === "string" ? lc(u) === lc(v) : u === v)
        : op === "<" ? u < v : op === ">" ? u > v : op === "<=" ? u <= v : u >= v; };
  }
  function and(){ let f = atom(); while (peek() && peek().t === "and"){ p++; const g = atom(), h = f; f = r => h(r) && g(r); } return f; }
  function or(){ let f = and(); while (peek() && peek().t === "or"){ p++; const g = and(), h = f; f = r => h(r) || g(r); } return f; }
  const f = or();
  if (p < T.length) throw new Error(`condition '${src}': trailing tokens`);
  return f;
}

// ---- operators ----
function project(R, list){
  const refs = String(list).split(",").map(s => s.trim()).filter(Boolean);
  const idx = refs.map(r => colIndex(R, r));
  return rel(idx.map(i => R.cols[i]), R.rows.map(row => idx.map(i => row[i])));
}
const select = (R, cond) => { const f = compileCond(cond, R); return rel(R.cols, R.rows.filter(f)); };
function rename(R, arg){
  const m = /^\s*([\w֐-׿]+)\s*(?:\(([^)]*)\))?\s*$/.exec(arg);
  if (!m) throw new Error("bad ρ_{" + arg + "}");
  const names = m[2] ? m[2].split(",").map(s => s.trim()) : null;
  if (names && names.length !== R.cols.length) throw new Error("ρ column count mismatch");
  return { cols: R.cols.map((c, i) => ({ rel: m[1], name: names ? names[i] : c.name })), rows: R.rows };
}
const product = (A, B) => rel(A.cols.concat(B.cols), A.rows.flatMap(a => B.rows.map(b => a.concat(b))));
function njoin(A, B){
  const common = A.cols.map((c, i) => [c, i]).filter(([c]) => B.cols.some(d => lc(d.name) === lc(c.name)));
  if (!common.length) return product(A, B);
  const pairs = common.map(([c, i]) => [i, B.cols.findIndex(d => lc(d.name) === lc(c.name))]);
  const keepB = B.cols.map((_, j) => j).filter(j => !pairs.some(p => p[1] === j));
  const rows = [];
  for (const a of A.rows) for (const b of B.rows) if (pairs.every(([i, j]) => a[i] === b[j])) rows.push(a.concat(keepB.map(j => b[j])));
  return rel(A.cols.concat(keepB.map(j => B.cols[j])), rows);
}
function compat(A, B, op){ if (A.cols.length !== B.cols.length) throw new Error(`${op}: relations are not union-compatible (${A.cols.length} vs ${B.cols.length} columns)`); }
const key = r => JSON.stringify(r);
const union = (A, B) => (compat(A, B, "∪"), rel(A.cols, A.rows.concat(B.rows)));
const intersect = (A, B) => (compat(A, B, "∩"), rel(A.cols, A.rows.filter(r => new Set(B.rows.map(key)).has(key(r)))));
const minus = (A, B) => (compat(A, B, "−"), rel(A.cols, A.rows.filter(r => !new Set(B.rows.map(key)).has(key(r)))));
function divide(A, B){
  const bi = B.cols.map(c => { const i = A.cols.findIndex(a => lc(a.name) === lc(c.name)); if (i < 0) throw new Error(`÷: divisor column '${c.name}' is not in the dividend`); return i; });
  const xi = A.cols.map((_, i) => i).filter(i => !bi.includes(i));
  if (!xi.length) throw new Error("÷: dividend has no columns left over");
  const have = new Set(A.rows.map(r => key(xi.map(i => r[i]).concat(bi.map(i => r[i])))));
  const xs = rel(xi.map(i => A.cols[i]), A.rows.map(r => xi.map(i => r[i])));
  return rel(xs.cols, xs.rows.filter(x => B.rows.every(b => have.has(key(x.concat(b))))));
}

// ---- parser / evaluator ----
function evaluate(src, tables){
  const env = {};
  for (const t of tables) env[lc(t.name)] = { cols: t.columns.map(n => ({ rel: t.name, name: n })), rows: t.rows.map(r => r.slice()) };
  const T = tokenize(src); let p = 0;
  const peek = () => T[p];
  function primary(){
    const k = T[p++];
    if (!k) throw new Error("expression ends early");
    if (k.t === "pi") return project(primary(), k.arg);
    if (k.t === "sigma") return select(primary(), k.arg);
    if (k.t === "rho") return rename(primary(), k.arg);
    if (k.t === "("){ const v = expr(); if (!T[p] || T[p].t !== ")") throw new Error("missing )"); p++; return v; }
    if (k.t === "name"){
      const r = env[lc(k.v)];
      if (!r) throw new Error(`unknown relation '${k.v}'`);
      return r;
    }
    throw new Error("unexpected token " + JSON.stringify(k));
  }
  const isOp = (k, set) => k && ((k.t === "op" && set.includes(k.v)) || (set.includes("X") && k.t === "name" && k.v === "X" && !env.x));
  function prod(){
    let v = primary();
    while (isOp(peek(), ["X", "J"])){ const o = T[p++]; const w = primary(); v = (o.v === "J") ? njoin(v, w) : product(v, w); }
    return v;
  }
  function expr(){
    let v = prod();
    while (isOp(peek(), ["-", "U", "I", "D"])){
      const o = T[p++].v, w = prod();
      v = o === "-" ? minus(v, w) : o === "U" ? union(v, w) : o === "I" ? intersect(v, w) : divide(v, w);
    }
    return v;
  }
  let last = null;
  while (p < T.length){
    while (peek() && peek().t === "sep") p++;
    if (p >= T.length) break;
    if (T[p].t === "name" && T[p + 1] && T[p + 1].t === "op" && T[p + 1].v === "="){
      const name = T[p].v; p += 2; const v = expr();
      env[lc(name)] = { cols: v.cols.map(c => ({ rel: name, name: c.name })), rows: v.rows }; last = env[lc(name)];
    } else last = expr();
    if (peek() && peek().t !== "sep") throw new Error("unexpected " + JSON.stringify(peek()));
  }
  if (!last) throw new Error("empty expression");
  return last;
}

module.exports = { evaluate, tokenize };
