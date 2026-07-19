"use strict";
/* Self-contained renderer for relational-algebra / FD notation and relation schemas.
   No dependency (replaces KaTeX for this course's math, which KaTeX can't do because
   selection conditions contain Hebrew string literals, e.g. σ_city="חולון").

   Two exports on window:
     renderAlgebra(src, display?) -> HTML  (RA / FD / set notation)
     renderSchema(src)            -> HTML  (relation schema with underlined keys)

   Algebra markup (write real Unicode operators — Π σ ⊗ ÷ ∧ → ∩ ∪ − ρ ⋈ × …):
     _{...}  -> subscript     ^{...} -> superscript
     a bare _ or ^ stays literal, so identifiers like student_id / F1^+ survive
     (write closures as F1^{+}).  Hebrew runs are auto bidi-isolated in <bdi>.
   Schema markup (relation templates):
     [u]attr[/u] -> solid underline   (primary-key attribute)
     [d]attr[/d] -> dashed underline  (weak-entity discriminator / partial key)                */

(function () {
  function esc(s) {
    return String(s).replace(/[&<>]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m]));
  }
  // escape + wrap maximal Hebrew runs so they sit correctly inside an LTR expression
  var HE = /[֐-׿יִ-ﭏ]+/g;
  function bidi(s) { return esc(s).replace(HE, m => "<bdi>" + m + "</bdi>"); }

  // render sub/superscript groups; everything else literal (+ Hebrew isolation)
  function algInner(src) {
    return String(src).split(/(_\{[^}]*\}|\^\{[^}]*\})/g).map(function (p) {
      if (/^_\{[^}]*\}$/.test(p)) return "<sub>" + bidi(p.slice(2, -1)) + "</sub>";
      if (/^\^\{[^}]*\}$/.test(p)) return "<sup>" + bidi(p.slice(2, -1)) + "</sup>";
      return bidi(p);
    }).join("");
  }

  function renderAlgebra(src, display) {
    var tag = display ? "div" : "span";
    var cls = display ? "alg alg-block" : "alg";
    return "<" + tag + ' class="' + cls + '" dir="ltr">' + algInner(src) + "</" + tag + ">";
  }

  function schemaInner(src) {
    return String(src).split(/(\[u\][\s\S]*?\[\/u\]|\[d\][\s\S]*?\[\/d\])/g).map(function (p) {
      var m;
      if ((m = /^\[u\]([\s\S]*?)\[\/u\]$/.exec(p))) return '<span class="pk">' + bidi(m[1]) + "</span>";
      if ((m = /^\[d\]([\s\S]*?)\[\/d\]$/.exec(p))) return '<span class="ppk">' + bidi(m[1]) + "</span>";
      return bidi(p);
    }).join("");
  }
  function renderSchema(src) {
    return '<span class="schema" dir="ltr">' + schemaInner(src) + "</span>";
  }

  var api = { renderAlgebra: renderAlgebra, renderSchema: renderSchema };
  if (typeof window !== "undefined") { window.renderAlgebra = renderAlgebra; window.renderSchema = renderSchema; }
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
