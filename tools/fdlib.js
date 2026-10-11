// Functional-dependency engine for checking the normalization course (tools/norm_check.js).
// Attributes are single capital letters (the exam's style). Sets are strings like "ABE".
//   parseR("R = (A, B, C)") → "ABC"        parseF("F = {A → BC, AE → D}") → [{l:"A", r:"BC"}, …]
const norm = s => [...new Set(String(s).replace(/[^A-Z]/g, ""))].sort().join("");
const has = (X, Y) => [...norm(Y)].every(c => X.includes(c));        // Y ⊆ X
const minus = (X, Y) => [...norm(X)].filter(c => !Y.includes(c)).join("");
const union = (...S) => norm(S.join(""));
const inter = (X, Y) => [...norm(X)].filter(c => Y.includes(c)).join("");

function parseR(s){ const m = String(s).match(/\(([^)]*)\)/); return norm(m ? m[1] : s); }
function parseFD(s){
  const [l, r] = String(s).split(/→|->/);
  if (r === undefined) throw new Error("bad FD: " + s);
  return { l: norm(l), r: norm(r) };
}
function parseF(s){
  const body = String(s).replace(/^[^{]*\{/, "").replace(/\}[^}]*$/, "");
  return body.split(/[,;]/).map(x => x.trim()).filter(Boolean).map(parseFD);
}
const showF = F => "{" + F.map(d => d.l + "→" + d.r).join(", ") + "}";

function closure(X, F){
  let C = norm(X), grew = true;
  while (grew){ grew = false; for (const d of F) if (has(C, d.l) && !has(C, d.r)){ C = union(C, d.r); grew = true; } }
  return C;
}
const implies = (F, fd) => { const d = typeof fd === "string" ? parseFD(fd) : fd; return has(closure(d.l, F), d.r); };
const isSuperkey = (X, R, F) => has(closure(X, F), R);
const isCandidate = (X, R, F) => isSuperkey(X, R, F) && [...norm(X)].every(a => !isSuperkey(minus(X, a), R, F));

function subsets(S){ const a = [...S], out = []; for (let m = 0; m < 1 << a.length; m++) out.push(a.filter((_, i) => m & (1 << i)).join("")); return out; }
function candidateKeys(R, F){
  return subsets(R).sort((x, y) => x.length - y.length || x.localeCompare(y)).filter(X => isCandidate(X, R, F));
}
const primes = (R, F) => norm(candidateKeys(R, F).join(""));

// FDs that hold on a component Ri (projection of F⁺), as X → (X⁺ ∩ Ri) − X for every X ⊆ Ri
function project(Ri, F){
  const out = [];
  for (const X of subsets(Ri)) { if (!X) continue; const Y = minus(inter(closure(X, F), Ri), X); if (Y) out.push({ l: X, r: Y }); }
  return out;
}
// highest normal form of R under F (assumes 1NF): "BCNF" | "3NF" | "2NF" | "1NF"
function normalForm(R, F){
  const keys = candidateKeys(R, F), P = norm(keys.join(""));
  const nontriv = F.map(d => ({ l: d.l, r: minus(d.r, d.l) })).filter(d => d.r && has(R, d.l + d.r));
  const bcnf = nontriv.every(d => isSuperkey(d.l, R, F));
  if (bcnf) return "BCNF";
  const third = nontriv.every(d => isSuperkey(d.l, R, F) || has(P, d.r));
  if (third) return "3NF";
  // 2NF: no non-prime attribute depends on a proper subset of a candidate key
  const second = keys.every(K => subsets(K).filter(S => S.length < K.length).every(S => !minus(minus(closure(S, F), S), P)));
  return second ? "2NF" : "1NF";
}
const nfOfComponent = (Ri, F) => normalForm(Ri, project(Ri, F));

// lossless join (chase): true iff some row becomes all-distinguished
function lossless(R, comps, F){
  const A = [...R];
  const T = comps.map((Ri, i) => A.map(a => Ri.includes(a) ? "a" + a : "b" + i + a));
  let changed = true;
  while (changed){
    changed = false;
    for (const d of F){
      const L = [...d.l].map(a => A.indexOf(a)), Rr = [...d.r].map(a => A.indexOf(a));
      for (let i = 0; i < T.length; i++) for (let j = i + 1; j < T.length; j++){
        if (L.every(k => T[i][k] === T[j][k])) for (const k of Rr){
          if (T[i][k] !== T[j][k]){
            const keep = T[i][k][0] === "a" ? T[i][k] : T[j][k][0] === "a" ? T[j][k] : (T[i][k] < T[j][k] ? T[i][k] : T[j][k]);
            const drop = keep === T[i][k] ? T[j][k] : T[i][k];
            T.forEach(row => { if (row[k] === drop) row[k] = keep; });
            changed = true;
          }
        }
      }
    }
  }
  return T.some(row => row.every(v => v[0] === "a"));
}
// dependency preservation (no need to compute F⁺): Z := X; repeat Z ∪= (Z∩Ri)⁺ ∩ Ri
function preservedFD(d, comps, F){
  let Z = d.l, grew = true;
  while (grew){ grew = false; for (const Ri of comps){ const add = inter(closure(inter(Z, Ri), F), Ri); if (!has(Z, add)){ Z = union(Z, add); grew = true; } } }
  return has(Z, d.r);
}
const preserves = (comps, F) => F.every(d => preservedFD(d, comps, F));
const lostFDs = (comps, F) => F.filter(d => !preservedFD(d, comps, F));

const equivalent = (F1, F2) => F1.every(d => implies(F2, d)) && F2.every(d => implies(F1, d));
// extraneous attributes of one FD inside F: [{side:"L"|"R", attr}]
function extraneousIn(d, F){
  const out = [], i = F.findIndex(x => x.l === d.l && x.r === d.r);
  if (d.l.length > 1) for (const a of d.l) if (has(closure(minus(d.l, a), F), d.r)) out.push({ side: "L", attr: a });
  for (const b of d.r){
    const F2 = F.slice(); F2[i] = { l: d.l, r: minus(d.r, b) };
    if (implies(F2.filter(x => x.r), { l: d.l, r: b })) out.push({ side: "R", attr: b });
  }
  return out;
}
const allExtraneous = F => F.flatMap(d => extraneousIn(d, F).map(e => Object.assign({ fd: d.l + "→" + d.r }, e)));
function redundantFDs(F){ return F.filter((d, i) => implies(F.filter((_, j) => j !== i), d)); }
// minimal (canonical) cover check: equivalent to F, no extraneous attribute, no redundant FD
function isMinimalCoverOf(G, F){ return equivalent(G, F) && allExtraneous(G).length === 0 && redundantFDs(G).length === 0; }

// does a table instance satisfy X→Y?  rows: array of arrays, cols: column names
function instanceHolds(cols, rows, fd){
  const [l, r] = String(fd).split(/→|->/).map(s => s.trim().split(/[\s,]+/).filter(Boolean));
  const L = l.map(c => cols.indexOf(c)), Rr = r.map(c => cols.indexOf(c));
  if (L.includes(-1) || Rr.includes(-1)) throw new Error("instance FD uses unknown column: " + fd);
  const seen = new Map();
  for (const row of rows){
    const k = L.map(i => row[i]).join("|"), v = Rr.map(i => row[i]).join("|");
    if (seen.has(k) && seen.get(k) !== v) return false;
    seen.set(k, v);
  }
  return true;
}

module.exports = { norm, has, minus, union, inter, parseR, parseF, parseFD, showF, closure, implies, isSuperkey,
  isCandidate, candidateKeys, primes, project, normalForm, nfOfComponent, lossless, preserves, lostFDs,
  equivalent, extraneousIn, allExtraneous, redundantFDs, isMinimalCoverOf, instanceHolds, subsets };
