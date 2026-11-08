# -*- coding: utf-8 -*-
"""Pronunciation lexicon for the מערכות בסיסי נתונים videos: the shared machinery (tools/video/lexicon_base.py) plus the
course's own terms. TeX is spoken token by token (TEX_TOKENS, longest first); a span with any token outside the table
is refused, and the script must give P(..., say=...) — the usual case for real formulas (σ with a condition, joins…).
Per-course additions go in videos/lex_<course>.py (WORDS, HOMOPHONES, TEX_TOKENS), merged below into every video.

Latin words in a subtitle are spoken through WORDS (SQL keywords, ERD, BCNF…), matched as whole words. Any Latin letter
left in the spoken text after that is an error (the voice misreads English): add the word to WORDS or give say=.
"""
import re
from lexicon_base import *          # noqa: F401,F403
from lexicon_base import WORDS, SYMBOL, DIGIT, base_tex_say

# meaning-flipping mishearings to flag in the STT report: {what the recognizer wrote: what was said}
HOMOPHONES = {"שלא": "שלו", "הקלה": "הכלה", "לו": "לא"}

# shared DB vocabulary (every course of the app uses some of it). Courses add their own in lex_<course>.py.
WORDS.update({
    # SQL keywords (spoken as Israeli students say them)
    "SELECT": "סֶלֶקְט", "FROM": "פְרוֹם", "WHERE": "וֶור", "GROUP BY": "גְרוּפּ בַּאי", "ORDER BY": "אוֹרְדֶר בַּאי",
    "HAVING": "הֶבִינְג", "JOIN": "ג'וֹיְן", "LEFT JOIN": "לֶפְט ג'וֹיְן", "RIGHT JOIN": "רַייט ג'וֹיְן",
    "INNER JOIN": "אִינֶר ג'וֹיְן", "NATURAL JOIN": "נֶצֶ'רַל ג'וֹיְן", "OUTER JOIN": "אָאוּטֶר ג'וֹיְן",
    "ON": "אוֹן", "AS": "אֶז", "DISTINCT": "דִיסְטִינְקְט", "COUNT": "קָאוּנְט", "SUM": "סָאם", "AVG": "אַבֶרֶג'",
    "MAX": "מַקְס", "MIN": "מִין", "IN": "אִין", "NOT": "נוֹט", "EXISTS": "אֶגְזִיסְטְס", "AND": "אֶנְד", "OR": "אוֹר",
    "NULL": "נָאל", "IS": "אִיז", "LIKE": "לַייק", "BETWEEN": "בִּיטְוִוין", "ALL": "אוֹל", "ANY": "אֶנִי",
    "UNION": "יוּנְיוֹן", "INTERSECT": "אִינְטֶרְסֶקְט", "EXCEPT": "אֶקְסֶפְּט", "LIMIT": "לִימִיט", "DESC": "דֶסְק",
    "ASC": "אַסְק", "USING": "יוּזִינְג", "CREATE TABLE": "קְרִיאֵייט טֵייבֶּל", "PRIMARY KEY": "פְּרַיימֶרִי קִי",
    "FOREIGN KEY": "פוֹרֶן קִי", "REFERENCES": "רֶפֶרֶנְסֶס", "UPDATE": "אַפְּדֵייט", "DELETE": "דִילִיט",
    "INSERT": "אִינְסֶרְט", "VIEW": "וְיוּ",
    # names of the course's notations
    "SQL": "אֶס קְיוּ אֶל", "NoSQL": "נוֹ אֶס קְיוּ אֶל", "ERD": "אִי אָר דִי", "ER": "אִי אָר", "ISA": "אִיז אֵיי",
    "BCNF": "בִּי סִי אֶן אֶף", "3NF": "צורה נורמלית שלישית", "2NF": "צורה נורמלית שנייה",
    "1NF": "צורה נורמלית ראשונה", "N:M": "רבים לרבים", "1:N": "אחד לרבים", "N:1": "רבים לאחד", "1:1": "אחד לאחד",
    # Hebrew abbreviations
    "ת״ז": "תעודת זהות", "מס'": "מספר", "סה״כ": "סך הכול",
})

TEX_TOKENS = {
    r"\infty": "אינסוף", r"\to": "קובע", r"\rightarrow": "קובע", r"\leftarrow": "מקבל", r"\Rightarrow": "גורר",
    r"\iff": "אם ורק אם", r"\in": "שייך ל", r"\notin": "לא שייך ל", r"\ne": "שונה מ", r"\neq": "שונה מ",
    r"=": "שווה", r"<": "קטן מ", r">": "גדול מ", r"\le": "קטן או שווה ל", r"\leq": "קטן או שווה ל",
    r"\ge": "גדול או שווה ל", r"\geq": "גדול או שווה ל", r"\cdot": "כפול", r"\times": "כפול", r"+": "ועוד",
    r"-": "פחות", r",": ",", r"^2": "בריבוע",
    r"\sigma": "סִיגְמָא", r"\pi": "פַּאי", r"\Pi": "פַּאי", r"\rho": "רוֹ", r"\bowtie": "ג'וֹיְן",
    r"\cup": "איחוד", r"\cap": "חיתוך", r"\div": "חילוק", r"\subseteq": "מוכל ב", r"\subset": "מוכל ב",
    r"\supseteq": "מכיל את", r"\land": "וגם", r"\wedge": "וגם", r"\lor": "או", r"\vee": "או", r"\neg": "לא",
    r"\emptyset": "הקבוצה הריקה", r"\varnothing": "הקבוצה הריקה", r"\{": "", r"\}": "",
    # attribute and relation names: the English letter names
    "A": "אֵיי", "B": "בִּי", "C": "סִי", "D": "דִּי", "E": "אִי", "F": "אֶף", "G": "גִ'י", "H": "אֵייץ'", "I": "אַיי",
    "J": "גֵ'יי", "K": "קֵיי", "L": "אֶל", "M": "אֶם", "N": "אֶן", "O": "אוֹ", "P": "פִּי", "Q": "קְיוּ", "R": "אָר",
    "S": "אֶס", "T": "טִי", "U": "יוּ", "V": "וִי", "W": "דַאבֶּלְיוּ", "X": "אֶקְס", "Y": "וַואי", "Z": "זֶד",
    "a": "אֵיי", "b": "בִּי", "c": "סִי", "d": "דִּי", "e": "אִי", "f": "אֶף", "g": "גִ'י", "h": "אֵייץ'",
    "k": "קֵיי", "n": "אֶן", "p": "פִּי", "q": "קְיוּ", "r": "אָר", "s": "אֶס", "t": "טִי", "u": "יוּ", "v": "וִי",
    "x": "אֶקְס", "y": "וַואי", "z": "זֶד",
}
import importlib, pathlib
for _f in sorted(pathlib.Path(__file__).parent.glob("lex_*.py")):   # per-course additions: lex_erd.py, lex_sql.py, …
    _m = importlib.import_module(_f.stem)
    WORDS.update(getattr(_m, "WORDS", {}))
    HOMOPHONES.update(getattr(_m, "HOMOPHONES", {}))
    TEX_TOKENS.update(getattr(_m, "TEX_TOKENS", {}))
for d, s in DIGIT.items():
    TEX_TOKENS[d] = s
_TOK = sorted(TEX_TOKENS, key=len, reverse=True)
_LATIN = re.compile(r"[A-Za-z]")


def _spell(t):
    """speak a TeX span token by token; None if a token is unknown"""
    t = t.replace(r"\,", " ").replace(r"\ ", " ").replace(r"\quad", " ").replace(r"\mathrm", "").replace(r"\text", "")
    out, i = [], 0
    while i < len(t):
        c = t[i]
        if c in " {}":
            i += 1
            continue
        m = re.match(r"_\{?(\d+)\}?", t[i:])
        if m:                                    # R_1, A_2: the index as a number word
            out.append(" ".join(DIGIT[d] for d in m.group(1)))
            i += m.end()
            continue
        if c in "()_":                           # \pi_{A} R: the subscript is spoken right after the operator
            i += 1
            continue
        m = re.match(r"\d+(?:\.\d+)?", t[i:])
        if m and len(m.group(0)) > 1:            # 12, 0.9: as a number (the voice reads numerals well)
            out.append(m.group(0))
            i += m.end()
            continue
        hit = next((k for k in _TOK if t.startswith(k, i)), None)
        if hit is None:
            return None
        if TEX_TOKENS[hit]:
            out.append(TEX_TOKENS[hit])
        i += len(hit)
    s = " ".join(out).replace(" ,", ",")
    s = re.sub(r"(^|\s)([לבמ])\s+", r"\1\2", s)      # "שייך ל" + "אָר": one word, not the letter's name
    return re.sub(r"\s+", " ", s).strip() or None


def tex_say(tex):
    t = tex.strip()
    if re.fullmatch(r"\d+", t):
        return t
    return _spell(t)


def say_hebrew(s):
    """subtitle/say text -> what the TTS reads. Latin words are replaced as whole words (so IN never hits JOIN),
    Hebrew entries as substrings (both gershayim forms). Latin left over is an error."""
    keys = sorted(WORDS, key=len, reverse=True)
    for k in keys:
        for v in dict.fromkeys((k, k.replace("״", '"'))):
            if _LATIN.search(v):
                s = re.sub(r"(?<![A-Za-z0-9])" + re.escape(v) + r"(?![A-Za-z0-9])", WORDS[k], s)
            else:
                s = s.replace(v, WORDS[k])
    # a prefix (ו, ב, ומ, …) glued with a hyphen ("ו-$A$", "ב-SQL") is read as one word, not "vav, hyphen"
    s = re.sub(r"(^|[\s(])([ובכלמהש]{1,3})-", r"\1\2", s)
    left = _LATIN.findall(s)
    if left:
        raise ValueError(f"Latin letters left in the spoken text (add the word to WORDS in videos/lex_<course>.py, "
                         f"or give say=): {s}")
    return s
