#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build learn-briefs.js from the Obsidian "Practice by Subject" briefs.

Source of truth: the Markdown briefs in the Obsidian vault (BRIEF_DIR below).
Output: learn-briefs.js, which appends chapters onto window.LEARN (defined in
learn.js).  Math is pre-rendered with the vendored KaTeX via Node, so the page
needs no extra runtime work — katex.min.css is already loaded by index.html.

Run:  python tools/build_learn_briefs.py
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BRIEF_DIR = os.path.join(
    os.path.expanduser("~"),
    "Desktop", "Adir", "busi-notes", "Year-2-Sem-C", "Databases", "Practice by subject",
)

# file -> (chapter id, chapter title, sections to drop [by "## " heading prefix])
CHAPTERS = [
    ("00 - Index.md", "brief-map", "פרק 6 — מדריך המבחן: מבנה וסדר עדיפויות",
     ["2. איך מריצים את האפליקציה", "4. לוח תוצאות"]),
    ("01 - SQL.md", "brief-sql", "פרק 7 — פתרון שאלות SQL", []),
    ("02 - אלגברה רלציונית.md", "brief-relalg", "פרק 8 — פתרון שאלות אלגברה רלציונית", []),
    ("03 - מודל ERD.md", "brief-erd", "פרק 9 — פתרון שאלות ERD", []),
    ("04 - תלויות ונרמול.md", "brief-fd", "פרק 10 — פתרון שאלות תלויות ונרמול", []),
    ("05 - NoSQL.md", "brief-nosql", "פרק 11 — NoSQL", []),
    ("06 - חמש התבניות הגדולות.md", "brief-patterns", "פרק 12 — חמש התבניות הגדולות (חזרה)", []),
]
# wikilink target -> index into CHAPTERS (for in-app cross links)
LINK_TARGET = {name[:-3]: i for i, (name, _, _, _) in enumerate(CHAPTERS)}

MATH = []  # collected TeX; replaced by rendered KaTeX at the end


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def math_slot(tex, display):
    MATH.append((tex, display))
    return "\x00M%d\x00" % (len(MATH) - 1)


def inline(text, chapter_base):
    """Inline markdown -> HTML. Code and math are extracted first so that
    emphasis markers inside them are never touched."""
    slots = []

    def stash(html):
        slots.append(html)
        return "\x00S%d\x00" % (len(slots) - 1)

    # display math must be handled by the caller; here only $...$
    text = re.sub(r"`([^`]+)`", lambda m: stash('<code dir="ltr">%s</code>' % esc(m.group(1))), text)
    text = re.sub(r"\$([^$]+)\$", lambda m: stash(math_slot(m.group(1), False)), text)

    text = esc(text)

    def wiki(m):
        target = m.group(1)
        label = m.group(2) or target
        if target in LINK_TARGET:
            i = LINK_TARGET[target]
            return '<a href="#" data-learn-goto="%d">%s</a>' % (
                chapter_base + i, esc(CHAPTERS[i][2]))
        return esc(label)

    text = re.sub(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]", wiki, text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", text)
    text = re.sub(r"\x00S(\d+)\x00", lambda m: slots[int(m.group(1))], text)
    return text


def split_row(row):
    return [c.strip() for c in row.strip().strip("|").split("|")]


def render(lines, chapter_base):
    """Block-level markdown -> HTML for a list of already de-prefixed lines."""
    out, i, n = [], 0, len(lines)
    while i < n:
        line = lines[i]
        s = line.strip()

        if not s:
            i += 1
            continue

        if s.startswith("```"):
            j = i + 1
            body = []
            while j < n and not lines[j].strip().startswith("```"):
                body.append(lines[j])
                j += 1
            out.append('<pre><code dir="ltr">%s</code></pre>' % esc("\n".join(body)))
            i = j + 1
            continue

        if s.startswith("$$") and s.endswith("$$") and len(s) > 4:
            out.append('<div class="learn-math" dir="ltr">%s</div>'
                       % math_slot(s[2:-2].strip(), True))
            i += 1
            continue

        if s.startswith(">"):
            body = []
            while i < n and lines[i].strip().startswith(">"):
                body.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            out.append('<div class="learn-note">%s</div>' % render(body, chapter_base))
            continue

        if re.match(r"^-{3,}$", s):
            out.append("<hr>")
            i += 1
            continue

        m = re.match(r"^(#{1,6})\s+(.*)$", s)
        if m:
            lvl = len(m.group(1))
            if lvl == 1:            # doc title -> chapter title, skip
                i += 1
                continue
            tag = {2: "h3", 3: "h4", 4: "h5"}.get(lvl, "h5")
            out.append("<%s>%s</%s>" % (tag, inline(m.group(2), chapter_base), tag))
            i += 1
            continue

        # table: header row + delimiter row
        if s.startswith("|") and i + 1 < n and re.match(r"^\s*\|[\s:|\-]+\|\s*$", lines[i + 1]):
            head = split_row(s)
            i += 2
            rows = []
            while i < n and lines[i].strip().startswith("|"):
                rows.append(split_row(lines[i].strip()))
                i += 1
            th = "".join("<th>%s</th>" % inline(c, chapter_base) for c in head)
            body = ""
            for r in rows:
                r = (r + [""] * len(head))[:len(head)]
                body += "<tr>%s</tr>" % "".join(
                    "<td>%s</td>" % inline(c, chapter_base) for c in r)
            out.append('<div class="learn-tablewrap"><table><thead><tr>%s</tr>'
                       '</thead><tbody>%s</tbody></table></div>' % (th, body))
            continue

        # lists (task / bullet / ordered)
        m = re.match(r"^(\s*)([-*+]|\d+\.)\s+(.*)$", line)
        if m:
            ordered = bool(re.match(r"^\d+\.$", m.group(2)))
            items, is_check = [], False
            while i < n:
                mm = re.match(r"^(\s*)([-*+]|\d+\.)\s+(.*)$", lines[i])
                if not mm:
                    if lines[i].strip() and lines[i].startswith(("  ", "\t")) and items:
                        items[-1] += " " + lines[i].strip()   # lazy continuation
                        i += 1
                        continue
                    break
                if bool(re.match(r"^\d+\.$", mm.group(2))) != ordered:
                    break
                txt = mm.group(3)
                cm = re.match(r"^\[([ xX])\]\s+(.*)$", txt)
                if cm:
                    is_check = True
                    txt = cm.group(2)
                items.append(txt)
                i += 1
            tag = "ol" if ordered else "ul"
            cls = ' class="learn-check"' if is_check else ""
            out.append("<%s%s>%s</%s>" % (
                tag, cls,
                "".join("<li>%s</li>" % inline(t, chapter_base) for t in items),
                tag))
            continue

        # paragraph
        para = []
        while i < n and lines[i].strip() and not re.match(
                r"^\s*(#{1,6}\s|>|```|\||-{3,}$|[-*+]\s|\d+\.\s|\$\$)", lines[i]):
            para.append(lines[i].strip())
            i += 1
        if para:
            out.append("<p>%s</p>" % inline("<br>".join(para), chapter_base).replace("&lt;br&gt;", "<br>"))
        else:
            i += 1
    return "".join(out)


def main():
    existing = 0
    with open(os.path.join(ROOT, "learn.js"), encoding="utf-8") as fh:
        existing = len(re.findall(r"^\s*id: \"", fh.read(), re.M))

    chapters = []
    for fname, cid, title, drop in CHAPTERS:
        path = os.path.join(BRIEF_DIR, fname)
        text = open(path, encoding="utf-8").read()
        lines = text.split("\n")
        if drop:
            kept, skipping = [], False
            for ln in lines:
                m = re.match(r"^##\s+(.*)$", ln)
                if m:
                    skipping = any(m.group(1).startswith(d) for d in drop)
                if not skipping:
                    kept.append(ln)
            lines = kept
        html = render(lines, existing)
        chapters.append({"id": cid, "title": title, "html": html})

    # pre-render math with the vendored KaTeX
    tmp = os.path.join(ROOT, "tools", "_math.json")
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump([{"tex": t, "display": d} for t, d in MATH], fh, ensure_ascii=False)
    node = r"""
const k=require('./katex/katex.min.js'), fs=require('fs');
const items=JSON.parse(fs.readFileSync('tools/_math.json','utf8'));
fs.writeFileSync('tools/_math.out.json', JSON.stringify(items.map(
  it=>k.renderToString(it.tex,{throwOnError:false,displayMode:it.display,output:'html'}))));
"""
    subprocess.run(["node", "-e", node], cwd=ROOT, check=True)
    rendered = json.load(open(os.path.join(ROOT, "tools", "_math.out.json"), encoding="utf-8"))
    os.remove(tmp)
    os.remove(os.path.join(ROOT, "tools", "_math.out.json"))

    for ch in chapters:
        ch["html"] = re.sub(r"\x00M(\d+)\x00",
                            lambda m: rendered[int(m.group(1))], ch["html"])
        if "\x00" in ch["html"]:
            sys.exit("unresolved placeholder in " + ch["id"])

    out = (
        "/* Generated by tools/build_learn_briefs.py — do not edit by hand.\n"
        "   Source: the Obsidian \"Practice by Subject\" briefs.\n"
        "   Appends exam-technique chapters onto window.LEARN (see learn.js).\n"
        "   Math is pre-rendered with the vendored KaTeX. */\n"
        "window.LEARN = (window.LEARN || []).concat(\n"
        + json.dumps(chapters, ensure_ascii=False, indent=1)
        + "\n);\n"
        + "window.LEARN_BRIEFS_META = %s;\n" % json.dumps(
            {"chapters": len(chapters), "math": len(MATH)}, ensure_ascii=False)
    )
    dest = os.path.join(ROOT, "learn-briefs.js")
    with open(dest, "w", encoding="utf-8") as fh:
        fh.write(out)
    print("wrote %s — %d chapters, %d math spans, %d KB"
          % (os.path.basename(dest), len(chapters), len(MATH), len(out) // 1024))


if __name__ == "__main__":
    main()
