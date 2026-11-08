# -*- coding: utf-8 -*-
"""Normalization-course pronunciations (merged into lexicon.py for every video of the app). The course's own spoken
math (closures X⁺ as "הסגור של X", X → Y as "X קובע את Y") is built in widgets/w_norm.py (its P wrapper); here only
TeX tokens that lexicon.py does not speak, and a few whole technical terms."""

WORDS = {
    "superkey": "סוּפֶּר קִי",
    "candidate key": "קַנְדִידֵייט קִי",
    "lossless join": "לוֹסְלֶס ג'וֹיְן",
    "extraneous": "אֶקְסְטְרֵיינְיוּס",
    "chase": "צֵ'ייס",
}

TEX_TOKENS = {
    r"\setminus": "פחות",
    r"\nsubseteq": "לא מוכל ב",
    r"\not\supseteq": "לא מכיל את",
    r"\nsupseteq": "לא מכיל את",
}
