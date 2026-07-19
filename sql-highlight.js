"use strict";
/* Tiny self-contained SQL syntax highlighter (no dependencies, works offline).
   highlightSQL(src) -> HTML string with <span class="sql-*"> token wrappers.
   Every emitted piece of source text is HTML-escaped, so the output is safe to
   inject with innerHTML. Designed for the short SQL snippets that appear as
   answer options in the Databases exams, where a single token flips the answer,
   so the tokenizer never drops or reorders characters — untyped text passes
   through verbatim (escaped). */
(function (global) {
  var KEYWORDS = new Set([
    "select","from","where","group","by","having","order","join","inner","left",
    "right","full","outer","cross","natural","on","using","as","and","or","not",
    "in","exists","all","any","some","between","like","is","null","distinct",
    "union","intersect","except","insert","into","values","update","set","delete",
    "create","table","view","index","drop","alter","add","column","primary","key",
    "foreign","references","check","default","constraint","unique","cascade",
    "case","when","then","else","end","limit","offset","fetch","first","only",
    "asc","desc","with","recursive","over","partition","true","false","begin",
    "commit","rollback","grant","revoke","if","escape","collate"
  ]);
  var FUNCTIONS = new Set([
    "count","sum","avg","min","max","round","abs","coalesce","nullif","cast",
    "upper","lower","length","substr","substring","trim","concat","now",
    "current_date","current_timestamp","extract","to_char","to_date","rank",
    "dense_rank","row_number","nvl","ifnull","greatest","least"
  ]);

  function esc(s) {
    return s.replace(/[&<>]/g, function (m) {
      return m === "&" ? "&amp;" : m === "<" ? "&lt;" : "&gt;";
    });
  }
  function wrap(cls, text) { return '<span class="' + cls + '">' + esc(text) + "</span>"; }

  // Ordered token matchers. First match wins at each position.
  var RULES = [
    ["sql-com", /^--[^\n]*/],                 // -- line comment
    ["sql-com", /^\/\*[\s\S]*?\*\//],         // /* block comment */
    ["sql-str", /^'(?:''|[^'])*'/],           // 'single-quoted' (doubled '' escape)
    ["sql-str", /^"(?:[^"])*"/],              // "double-quoted identifier/string"
    ["sql-num", /^\b\d+(?:\.\d+)?\b/],        // numbers
    ["sql-op",  /^(?:<>|!=|<=|>=|\|\||::|[-+*/%=<>])/], // operators
    ["sql-punct", /^[(),;.]/],                // punctuation
    ["word", /^[A-Za-z_][A-Za-z0-9_]*/],      // identifier / keyword / function
    ["ws", /^\s+/],                           // whitespace
    ["other", /^[^\s]/]                       // any other single char (passes through)
  ];

  function highlightSQL(src) {
    var s = String(src);
    var out = "";
    while (s.length) {
      var matched = false;
      for (var i = 0; i < RULES.length; i++) {
        var m = RULES[i][1].exec(s);
        if (!m) continue;
        var tok = m[0];
        var cls = RULES[i][0];
        if (cls === "word") {
          var lw = tok.toLowerCase();
          // a function is a keyword-ish word immediately followed by '('
          var after = s.slice(tok.length);
          if (FUNCTIONS.has(lw) && /^\s*\(/.test(after)) out += wrap("sql-fn", tok);
          else if (KEYWORDS.has(lw)) out += wrap("sql-kw", tok);
          else out += esc(tok);
        } else if (cls === "ws" || cls === "other") {
          out += esc(tok);
        } else {
          out += wrap(cls, tok);
        }
        s = s.slice(tok.length);
        matched = true;
        break;
      }
      if (!matched) { out += esc(s[0]); s = s.slice(1); } // safety: never loop forever
    }
    return out;
  }

  global.highlightSQL = highlightSQL;
})(typeof window !== "undefined" ? window : this);
