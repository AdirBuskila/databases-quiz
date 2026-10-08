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
  var HE = /[֐-׿יִ-ﭏ]+(?:\s+[֐-׿יִ-ﭏ]+)*/g;   // multi-word names ("תל אביב") stay one run
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

  // wrap = how plain text is escaped: bidi() for an LTR schema, esc() for an RTL one
  function schemaInner(src, wrap) {
    return String(src).split(/(\[u\][\s\S]*?\[\/u\]|\[d\][\s\S]*?\[\/d\])/g).map(function (p) {
      var m;
      if ((m = /^\[u\]([\s\S]*?)\[\/u\]$/.exec(p))) return '<span class="pk">' + wrap(m[1]) + "</span>";
      if ((m = /^\[d\]([\s\S]*?)\[\/d\]$/.exec(p))) return '<span class="ppk">' + wrap(m[1]) + "</span>";
      return wrap(p);
    }).join("");
  }
  // A schema written in Hebrew (מנהל(שם חברה, מס' עובד)) reads right-to-left: forcing it
  // LTR and isolating each Hebrew word reverses multi-word names ("חברה שם").
  function renderSchema(src) {
    // 2+ spaces separate relations in a multi-relation option: render a visible gap
    var gap = function (h) { return h.replace(/ {2,}/g, '<span class="schema-gap"></span>'); };
    HE.lastIndex = 0;
    if (HE.test(String(src))) return '<span class="schema schema-rtl" dir="rtl">' + gap(schemaInner(src, esc)) + "</span>";
    return '<span class="schema" dir="ltr">' + gap(schemaInner(src, bidi)) + "</span>";
  }

  var api = { renderAlgebra: renderAlgebra, renderSchema: renderSchema };
  if (typeof window !== "undefined") { window.renderAlgebra = renderAlgebra; window.renderSchema = renderSchema; }
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
