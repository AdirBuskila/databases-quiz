#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build learn.js from the Obsidian exam summary (סיכום למבחן).

Source of truth: one Markdown note in the Obsidian vault (SRC below). Each "## "
section becomes a learn-mode chapter; the text before the first "## " plus the
topic-weight table become the opening chapter. Math is pre-rendered with the
vendored KaTeX via Node, so the page needs no extra runtime work —
katex.min.css is already loaded by index.html.

Run:  python tools/build_learn.py
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(
    os.path.expanduser("~"), "Desktop", "Adir", "busi-notes", "Year-2-Sem-C", "Databases",
    "סיכום למבחן - מערכות בסיסי נתונים.md",
)

# The note links to the "Practice by subject" pages, which are not in the app.
# Each one maps to the summary chapter that covers the same topic, by the
# number that opens that chapter's "## " heading (0 = the opening chapter).
WIKI_CHAPTER = {
    "00 - Index": 0,
    "01 - SQL": 4,
    "02 - אלגברה רלציונית": 3,
    "03 - מודל ERD": 1,
    "04 - תלויות ונרמול": 2,
    "05 - NoSQL": 6,
    "06 - חמש התבניות הגדולות": 5,
}
CHAPTERS = []    # [(id, title)] filled by split_chapters(); index = position in window.LEARN
NUM_TO_INDEX = {}  # leading section number -> chapter index

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

    def code(m):
        body = m.group(1)
        dl = re.fullmatch(r"index\.html\?practice=([a-z_]+)", body)
        if dl:  # a deep link into practice mode: make it clickable
            return stash('<a href="?practice=%s"><code dir="ltr">%s</code></a>' % (dl.group(1), esc(body)))
        return stash('<code dir="ltr">%s</code>' % esc(body))

    text = re.sub(r"`([^`]+)`", code, text)
    # display math must be handled by the caller; here only $...$
    text = re.sub(r"\$([^$]+)\$", lambda m: stash(math_slot(m.group(1), False)), text)

    text = esc(text)

    def wiki(m):
        target = m.group(1)
        label = m.group(2) or target
        num = WIKI_CHAPTER.get(target)
        if num is not None and num in NUM_TO_INDEX:
            i = NUM_TO_INDEX[num]
            return '<a href="#" data-learn-goto="%d">%s</a>' % (i, esc(CHAPTERS[i][1]))
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
            cm = re.match(r"^\[!(\w+)\][+-]?\s*(.*)$", body[0].strip()) if body else None
            if cm:  # Obsidian callout: first line carries the type and title
                title = cm.group(2).strip()
                head = '<p class="learn-note-title"><strong>%s</strong></p>' % inline(title, chapter_base) if title else ""
                out.append('<div class="learn-note learn-note-%s">%s%s</div>' % (
                    cm.group(1).lower(), head, render(body[1:], chapter_base)))
            else:
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
            tag = {2: "h3", 3: "h3", 4: "h4"}.get(lvl, "h5")
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


def strip_frontmatter(lines):
    if lines and lines[0].strip() == "---":
        for j in range(1, len(lines)):
            if lines[j].strip() == "---":
                return lines[j + 1:]
    return lines


def clean_title(raw):
    """'1.\u200f מודל ERD (חלק א׳) – 40 שאלות ‏·‏ 4 במבחן' -> (1, 'פרק 1 — מודל ERD (חלק א׳)')."""
    t = raw.replace("\u200f", "").strip()
    m = re.match(r"^(\d+)\.\s*(.*)$", t)
    if not m:
        return None, t
    num, rest = int(m.group(1)), m.group(2)
    rest = re.split(r"\s+–\s+(?=\d)", rest)[0].strip()   # drop "– 40 שאלות · 4 במבחן"
    return num, "פרק %d — %s" % (num, rest)


def split_chapters(lines):
    """Opening chapter = everything before the first numbered "## " section
    (title, callouts, topic-weight table); then one chapter per numbered section."""
    parts, cur = [[0, "מבוא — איך ללמוד למבחן", []]], None
    cur = parts[0]
    for ln in lines:
        m = re.match(r"^##\s+(.*)$", ln)
        if m:
            num, title = clean_title(m.group(1))
            if num is not None:
                cur = [num, title, []]
                parts.append(cur)
                continue
        cur[2].append(ln)
    return parts


def main():
    lines = strip_frontmatter(open(SRC, encoding="utf-8").read().split("\n"))
    # Obsidian block ids ("^prep-1" on its own line, or trailing " ^id") are link anchors, not text
    lines = [re.sub(r"\s\^[\w-]+\s*$", "", ln) for ln in lines if not re.fullmatch(r"\s*\^[\w-]+\s*", ln)]
    parts = split_chapters(lines)
    for i, (num, title, _) in enumerate(parts):
        CHAPTERS.append(("summary-%d" % num, title))
        NUM_TO_INDEX[num] = i

    chapters = []
    for (num, title, body), (cid, _) in zip(parts, CHAPTERS):
        chapters.append({"id": cid, "title": title, "html": render(body, 0)})

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
        "/* Generated by tools/build_learn.py — do not edit by hand.\n"
        "   Source: the Obsidian exam summary \"סיכום למבחן - מערכות בסיסי נתונים\".\n"
        "   window.LEARN = [{id, title, html}] is consumed by initLearn() in app.js.\n"
        "   Math is pre-rendered with the vendored KaTeX. */\n"
        "window.LEARN = "
        + json.dumps(chapters, ensure_ascii=False, indent=1)
        + ";\n"
    )
    dest = os.path.join(ROOT, "learn.js")
    with open(dest, "w", encoding="utf-8") as fh:
        fh.write(out)
    print("wrote %s — %d chapters, %d math spans, %d KB"
          % (os.path.basename(dest), len(chapters), len(MATH), len(out) // 1024))
    for c in chapters:
        print("  ", c["title"])


if __name__ == "__main__":
    main()
