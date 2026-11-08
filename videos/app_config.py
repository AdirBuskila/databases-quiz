# -*- coding: utf-8 -*-
"""App configuration for the video engine (tools/video/vid.py and friends)."""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parents[1]

APP_NAME = "מערכות בסיסי נתונים"
COURSE_CODE = "61303"
SITE = "https://adirbuskila.github.io/databases-quiz/"
BANK = "questions.json"
SIM_PATHS = ["tools"]

# same order, names and icons as course-ui.js META. The level ids are unique across courses (L01 erd, S01 sql,
# N01 norm, A01 alg), so a video id is the level id: videos/<course>/<ID>/<ID>.py
COURSES = [
    ("erd", "מודל ERD", "🧩"),
    ("sql", "SQL", "💾"),
    ("norm", "תלויות ונרמול", "🧮"),
    ("alg", "אלגברה רלציונית", "➗"),
]
LETTER = {"L": "erd", "S": "sql", "N": "norm", "A": "alg"}

BONUS_GOAL = {}


def level_id(video_id):
    """the guided level a video belongs to: the video id itself (bonus suffix dropped)"""
    return video_id[:3]


def level_file(video_id):
    return ROOT / LETTER[video_id[0]] / "levels" / f"{video_id[:3]}.js"


# The level quizzes are written inline in the level files (no bank ids). Many of them are modelled on a real exam
# question and say so in their explanation ("21B-C, שאלה 3"): solving that exam question in a video would answer the
# level question too, so every bank question cited inside a level's `questions:` part counts as a quiz id.
# (Citations in the lesson text are fine: the lesson already explains them.)
_CITE = re.compile(r"(\d\d[A-Z]-[A-Z0-9]+)[,\s(]*שאלה\s*(\d+)")
_CITE_REV = re.compile(r"שאלה\s*(\d+)\s*(?:של|ב-|מ-)\s*(\d\d[A-Z]-[A-Z0-9]+)")   # "שאלה 4 של 21B-A"
_QID = re.compile(r"\b(\d\d[A-Z]-[A-Z0-9]+-Q\d+)\b")


def _quiz_part(text):
    i = text.find("questions:")
    return text[i:] if i >= 0 else ""


def quiz_ids():
    """bank ids the guided-course quizzes (level quizzes and boss levels) are built on: never solved in a video"""
    ids = set()
    for course in LETTER.values():
        for f in (ROOT / course / "levels").glob("*.js"):
            t = _quiz_part(f.read_text(encoding="utf-8"))
            ids |= {f"{m.group(1)}-Q{m.group(2)}" for m in _CITE.finditer(t)}
            ids |= {f"{m.group(2)}-Q{m.group(1)}" for m in _CITE_REV.finditer(t)}
            ids |= set(_QID.findall(t))
    return ids


def boss_ids():
    return quiz_ids()


def is_boss(video_id):
    f = level_file(video_id)
    return f.exists() and re.search(r"boss:\s*true", f.read_text(encoding="utf-8")) is not None


def level_goal(course, level_id):
    """level_id is the video id (L03)"""
    f = ROOT / course / "levels" / f"{level_id[:3]}.js"
    m = re.search(r'goal:\s*"([^"]*)"', f.read_text(encoding="utf-8")) if f.exists() else None
    return m.group(1) if m else ""
