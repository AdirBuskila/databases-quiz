# -*- coding: utf-8 -*-
"""S08 · חילוק: "לכל ה-___" — video script (build: tools/video/vid.py S08).

Source: sql/levels/S08.js (lesson + goal: "X related to ALL the Y" = "there is no Y (of the required kind) that X is
not related to": double NOT EXISTS read inside out; the counting version with the WHERE filter and COUNT(DISTINCT);
CONTAINS in direction (his) CONTAINS (required); the fixed distractors: single negation, EXISTS, plain JOIN, forgetting
the filter, counting without DISTINCT).
Exam anchor: 26S-A-Q12 (passengers who booked ALL the flights to 'London'), not cited by any level quiz.
Avoided on purpose: the S08 quiz (Students/Courses/Enrollments, 'Mathematics', Adi's repeated course, Ido's Physics
course) and the exam items it cites (25B-A-Q10, 25B-A-Q11, 24B-A-Q9, 23B-A2-Q11, 23B-A-Q12, 22B-A-Q10).
Worked examples use an original Tourists/Sites/Visits database; the exam check an original Passenger/Flight/Booking
instance. CONTAINS is not run (SQLite has none): it is only named on a card. Every query shown runs in SQLite.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_sql as w

# ---------------------------------------------------------------- data (original)
TO = w.T("Tourists", ["t_id", "t_name"], [[1, "Noa"], [2, "Tom"], [3, "Lior"], [4, "Maya"], [5, "Ben"]], pk=["t_id"])
SI = w.T("Sites", ["site_id", "s_name", "city"], [
    [1, "Wall", "Jerusalem"], [2, "Old City", "Jerusalem"], [3, "Museum", "Jerusalem"], [4, "Beach", "Tel Aviv"]],
    pk=["site_id"])
VI = w.T("Visits", ["t_id", "site_id", "v_date"], [
    [1, 1, "05-01"], [1, 2, "05-01"], [1, 3, "05-02"], [2, 1, "05-01"], [2, 1, "05-03"], [2, 2, "05-03"],
    [3, 1, "05-02"], [3, 2, "05-02"], [3, 3, "05-04"], [3, 4, "05-05"], [4, 4, "05-01"]], pk=["t_id", "site_id", "v_date"])
db = w.DB(TO, SI, VI)
JER = [r[0] for r in SI["rows"] if r[2] == "Jerusalem"]
seen = {t: {v[1] for v in VI["rows"] if v[0] == t} for t, _ in TO["rows"]}
ALL = [n for t, n in TO["rows"] if set(JER) <= seen[t]]
assert ALL == ["Noa", "Lior"]                                     # by hand: nothing missing

# the grid: for every tourist, which Jerusalem site is missing
GRID = w.T("בדיקה", ["t_name", "Wall", "Old City", "Museum", "missing"], [
    [n] + ["✓" if s in seen[t] else "✗" for s in JER] + [(lambda m: "—" if not m else "all 3" if len(m) == 3 else ", ".join(m))(
        [SI["rows"][s - 1][1] for s in JER if s not in seen[t]])] for t, n in TO["rows"]])
GOOD = [i for i, r in enumerate(GRID["rows"]) if r[4] == "—"]
assert [GRID["rows"][i][0] for i in GOOD] == ALL

QD = ("SELECT T.t_name FROM Tourists T\nWHERE NOT EXISTS (\n  SELECT * FROM Sites S\n  WHERE S.city = 'Jerusalem'\n"
      "    AND NOT EXISTS (\n      SELECT * FROM Visits V\n      WHERE V.t_id = T.t_id\n        AND V.site_id = S.site_id))")
RD = db.result(QD)
assert [r[0] for r in RD["rows"]] == ALL

QC = ("SELECT T.t_name\nFROM Tourists T JOIN Visits V ON T.t_id = V.t_id\nJOIN Sites S ON V.site_id = S.site_id\n"
      "WHERE S.city = 'Jerusalem'\nGROUP BY T.t_id, T.t_name\nHAVING COUNT(DISTINCT S.site_id) =\n"
      "  (SELECT COUNT(*) FROM Sites WHERE city = 'Jerusalem')")
RC = db.result(QC)
assert [r[0] for r in RC["rows"]] == ALL
QC_NODIST = QC.replace("COUNT(DISTINCT S.site_id)", "COUNT(S.site_id)")
QC_NOFILT = QC.replace("WHERE S.city = 'Jerusalem'\n", "")
RCN, RCF = db.result(QC_NODIST), db.result(QC_NOFILT)
assert [r[0] for r in RCN["rows"]] == ["Noa", "Tom", "Lior"]      # Tom's repeated visit counts twice: 3
assert [r[0] for r in RCF["rows"]] == ["Noa"]                     # Lior's Beach makes 4, and he falls
assert db.rows("SELECT COUNT(*) FROM Sites WHERE city = 'Jerusalem'") == [[3]]

# ---------------------------------------------------------------- exam 26S-A-Q12
Q = BANK["26S-A-Q12"]
assert Q["correctId"] == "a"
OPTS = w.bank_opts(Q)
PA = w.T("Passenger", ["passenger_id", "full_name", "city", "birth_year"], [
    [1, "Dana", "Haifa", 1990], [2, "Yossi", "Eilat", 1985], [3, "Maya", "Haifa", 2000], [4, "Avi", "Ashdod", 1978],
    [5, "Lea", "Akko", 1999]], pk=["passenger_id"])
FL = w.T("Flight", ["flight_number", "origin", "destination", "dep_date", "price"], [
    [101, "TLV", "London", "2026-06-01", 900], [102, "TLV", "London", "2026-06-08", 950],
    [103, "TLV", "London", "2026-06-15", 870], [104, "TLV", "Paris", "2026-06-03", 700]], pk=["flight_number"])
BK = w.T("Booking", ["passenger_id", "flight_number", "seat_no", "booking_date"], [
    [1, 101, "3A", "2026-05-01"], [1, 102, "4C", "2026-05-01"], [1, 103, "9F", "2026-05-02"],
    [2, 101, "12B", "2026-05-03"], [2, 102, "12B", "2026-05-03"],
    [3, 101, "1A", "2026-05-04"], [3, 102, "1A", "2026-05-04"], [3, 103, "1A", "2026-05-04"], [3, 104, "2C", "2026-05-04"],
    [4, 103, "20D", "2026-05-05"], [4, 104, "20E", "2026-05-05"]], pk=["passenger_id", "flight_number"])
xdb = w.DB(PA, FL, BK)
XR = {o: xdb.result(s) for o, k, s in OPTS if k == "code"}
got = {o: sorted(r[0] for r in t["rows"]) for o, t in XR.items()}
assert got == {"a": [1, 3], "b": [1, 2, 3, 4, 5], "c": [1, 2, 3], "d": [3], "e": [1, 2, 3, 4]}
assert len({tuple(v) for v in got.values()}) == 5
CAPS = {"a": "חילוק", "b": w.ic("EXISTS"), "c": w.ic("COUNT(*) > 1"), "d": "בלי " + w.ic("'London'"),
        "e": w.ic("DISTINCT … 'London'")}
GB = {i: r[0] - 1 for i, r in enumerate(BK["rows"])}

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נפתור את סוג השאלה שמפחיד הכי הרבה: ״לכל ה...״. זה נקרא חילוק.",
      say="בסרטון הזה נפתור את סוג השאלה שמפחיד הכי הרבה: שאלות לכל. זה נקרא חילוק."),
    P("נראה איך הופכים ״לכל״ לשלילה כפולה, ואיך עושים את אותו הדבר בספירה, בלי ליפול במלכודות."),
    P("ובסוף נפתור שאלה אמיתית ממבחן.", hold=0.4),
], stage='<div class="kicker">S08 · SQL</div><h1>חילוק: ״לכל ה-___״</h1>'
         '<p>לזהות שאלת ״לכל״ ולכתוב אותה בשלילה כפולה (NOT EXISTS כפול), ב-CONTAINS או בספירה.</p>', layout="title")

idea = Scene("idea", "לכל = אין חסר", [
    P("תיירים, אתרים וביקורים. מי ביקר בכל האתרים שבירושלים?", do=show("it", "is", "iv")),
    P("ב-SQL אין ״לכל״. לכן הופכים את השאלה: מי שאין אתר בירושלים שהוא לא ביקר בו.", do=show("i-c1")),
    P("נבדוק תייר אחרי תייר: לכל אחד מחפשים אתר ירושלמי שחסר לו.", do=show("ig")),
    P("לנועה לא חסר אף אתר: היא עוברת.", do=show("ig-hi0")),
    P("לתום חסר המוזיאון, למרות שבכותל הוא היה פעמיים.", do=show("ig-x1")),
    P("לליאור לא חסר כלום. החוף בתל אביב לא משנה: הוא לא נדרש.", do=show("ig-hi2")),
    P("ולמאיה ולבן חסרים כל השלושה.", do=show("ig-x3", "ig-x4"), hold=0.4),
], stage=w.row(w.col(w.table("it", TO, size="sm", hidden=True), w.table("is", SI, size="sm", hidden=True), gap=24),
               w.table("iv", VI, size="sm", hidden=True), gap=40),
   panel=w.table("ig", GRID, size="sm", hidden=True, cap="אתר ירושלמי חסר?") + st.card("i-c1", "rule", "🔑 ״ביקר <b>בכל</b> ה-Y״ = ״<b>אין</b> Y ש<b>לא</b> ביקר בו״"))

double = Scene("double", "NOT EXISTS כפול", [
    P("ועכשיו לשאילתה. קוראים אותה מבפנים החוצה.", do=show("dq")),
    P("הפנימית שואלת: האם התייר הזה ביקר באתר הזה? שני תנאי קישור: לתייר, ולאתר.", do=show("dq-m6", "dq-m7")),
    P("NOT EXISTS שלפניה: האתר הזה חסר לתייר.", do=hide("dq-m6", "dq-m7") + show("dq-m4")),
    P("האמצעית עוברת על האתרים, ורק על אתרי ירושלים. זה המחלק: מה שנדרש.", do=hide("dq-m4") + show("dq-m3")),
    P("והחיצונית: לא קיים אתר ירושלמי חסר. נועה וליאור.", do=hide("dq-m3") + show("dq-m1") + w.rows_do("dr", RD)),
    P("ארבעת המסיחים הקבועים: שלילה אחת בלבד, EXISTS במקום NOT EXISTS, JOIN רגיל, ולשכוח את הסינון לירושלים.",
      do=show("d-c1")),
    P("וב-CONTAINS הכיוון קבוע: האתרים שלו מכילים את האתרים הנדרשים.", do=show("d-c2"), hold=0.4,
      say="ובקוֹנְטֵיינְס הכיוון קבוע: האתרים שלו מכילים את האתרים הנדרשים."),
], stage=w.row(w.code("dq", QD, size="sm h"), w.result("dr", RD, size="sm"), gap=36, cls="mid"),
   panel=st.card("d-c1", "trap", "⚠️ שלילה אחת · " + w.ic("EXISTS") + " · " + w.ic("JOIN") + " · בלי " + w.ic("city = …"))
         + st.card("d-c2", "ex", "(שלו) " + w.ic("CONTAINS") + " (הנדרש)"))

count = Scene("count", "גרסת הספירה", [
    P("דרך שנייה: ספירה. משאירים רק ביקורים באתרי ירושלים, וסופרים לכל תייר כמה אתרים שונים ראה.", do=show("cq")),
    P("ומשווים למספר אתרי ירושלים: שלושה.", do=show("cq-m5", "cq-m6")),
    P("נועה וליאור, כמו בשלילה הכפולה.", do=hide("cq-m5", "cq-m6") + w.rows_do("cr", RC)),
    P("בלי DISTINCT, הביקור הכפול של תום בכותל נספר פעמיים. הוא מגיע לשלוש, ונכנס בטעות.",
      do=show("cn") + w.rows_do("cn", RCN)),
    P("ובלי הסינון לירושלים, החוף של ליאור נספר. הוא מגיע לארבע, ונופל בטעות.", do=show("cf") + w.rows_do("cf", RCF)),
    P("לכן בספירה צריך את שניהם: WHERE על הסוג הנדרש, ו-COUNT DISTINCT.", do=show("c-c1"), hold=0.4,
      say="לכן בספירה צריך את שניהם: וֶור על הסוג הנדרש, וקָאוּנְט דִיסְטִינְקְט."),
], stage=w.row(w.code("cq", QC, size="xs h"),
               w.col(w.result("cr", RC, size="sm", cap="נכון"),
                     w.result("cn", RCN, size="sm", cap="בלי " + w.ic("DISTINCT"), hidden=True),
                     w.result("cf", RCF, size="sm", cap="בלי " + w.ic("WHERE"), hidden=True), gap=16), gap=36, cls="mid"),
   panel=st.card("c-c1", "rule", "🔑 ספירה: " + w.ic("WHERE") + " על הנדרש + " + w.ic("COUNT(DISTINCT …)")))

stem_x = "מיהם הנוסעים, לפי מזהה, שהזמינו את <b>כל</b> הטיסות ליעד " + w.ic("'London'") + "?"
exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: מיהם הנוסעים שהזמינו את כל הטיסות ללונדון?"),
    P("״את כל הטיסות ללונדון״: חילוק. לא קיימת טיסה ללונדון שהנוסע לא הזמין.", do=show("x-c1")),
    P("השאילתה עם EXISTS לבד לא תלויה בנוסע בכלל: אם יש טיסה ללונדון, חוזרים כולם.", do=show("q-x-b", "q-n-b")),
    P("השאילתה עם COUNT גדול מאחת סופרת ״יותר מטיסה אחת ללונדון״, לא ״את כולן״.", do=show("q-x-c", "q-n-c"),
      say="השאילתה עם קָאוּנְט גדול מאחת סופרת יותר מטיסה אחת ללונדון, לא את כולן."),
    P("השאילתה עם DISTINCT מחזירה מי שהזמין לפחות טיסה אחת ללונדון.", do=show("q-x-e", "q-n-e")),
    P("ויש שתי שלילות כפולות. אחת שכחה את הסינון ללונדון, ולכן דורשת את כל הטיסות בכלל.", do=show("q-x-d", "q-n-d")),
    P("נשארה השלילה הכפולה עם הסינון: הפנימית בודקת NOT IN בהזמנות של הנוסע.", do=show("q-ok-a"), hold=0.5),
], stage=w.col(w.stem(Q["id"], stem_x), w.chip("x-c1", "״את כל״ ← אין טיסה ללונדון שלא הזמין"),
               w.opts("q", OPTS, ncols=3, size="xs", notes={"b": "לא תלוי בנוסע", "c": "יותר מטיסה אחת",
                                                            "d": "בלי London", "e": "לפחות טיסה אחת"}), gap=18),
   layout="full")

check = Scene("check", "בודקים על נתונים", [
    P("נבדוק: שלוש טיסות ללונדון, ואחת לפריז. ואלה ההזמנות.", do=show("xf", "xb") + show(*[f"xb-g{i}" for i in GB])),
    P("נוסע מספר 1 הזמין את שלוש טיסות לונדון. נוסע מספר 3 גם, ועוד טיסה לפריז. שניהם עונים על השאלה.",
      do=show("xr-a") + w.rows_do("xr-a", XR["a"])),
    P("השלילה בלי הסינון דורשת גם את פריז, ומשאירה רק את נוסע מספר 3.", do=show("xr-d") + w.rows_do("xr-d", XR["d"])),
    P("״יותר מטיסה אחת״ מכניס גם את נוסע מספר 2, עם שתי טיסות ללונדון מתוך שלוש.", do=show("xr-c") + w.rows_do("xr-c", XR["c"])),
    P("״לפחות טיסה אחת״ מכניס גם את נוסע מספר 4, ו-EXISTS לבד מחזיר את כל חמשת הנוסעים.",
      do=show("xr-e", "xr-b") + w.rows_do("xr-e", XR["e"]) + w.rows_do("xr-b", XR["b"]), hold=0.5),
], stage=w.row(w.table("xf", FL, size="sm", hidden=True, cols=[0, 2]),
               w.table("xb", BK, size="sm", hidden=True, cols=[0, 1], groups=GB),
               w.col(w.row(*[w.result(f"xr-{k}", XR[k], size="sm", cap=CAPS[k], hidden=True) for k in "abc"], gap=26),
                     w.row(*[w.result(f"xr-{k}", XR[k], size="sm", cap=CAPS[k], hidden=True) for k in "de"], gap=26),
                     gap=30, cls="start"), gap=40),
   layout="full")

recap = Scene("recap", "סיכום", [
    P("לסיכום: ״לכל האתרים״ הוא חילוק. הופכים אותו ל״אין אתר שחסר לו״.", do=show("r-1"),
      say="לסיכום: לכל האתרים, זה חילוק. הופכים אותו לאין אתר שחסר לו."),
    P("NOT EXISTS כפול: הפנימי קושר את שני הצדדים, והאמצעי מסונן לסוג הנדרש.", do=show("r-2")),
    P("בספירה: WHERE על הנדרש, COUNT DISTINCT, והשוואה למספר הנדרש.", do=show("r-3"),
      say="בספירה: וֶור על הנדרש, קָאוּנְט דִיסְטִינְקְט, והשוואה למספר הנדרש."),
    P("ו״לפחות אחד״ או ״יותר מאחד״ זה לא ״כולם״. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.code("rq", QD, size="sm"),
   panel=st.card("r-1", "rule", "🔑 ״לכל ה-Y״ = ״אין Y שחסר״")
         + st.card("r-2", "rule", "🔑 " + w.ic("NOT EXISTS") + " כפול + סינון המחלק")
         + st.card("r-3", "ex", "ספירה: " + w.ic("WHERE") + " + " + w.ic("COUNT(DISTINCT …)"))
         + st.card("r-4", "trap", "⚠️ ״לפחות אחד״ ≠ ״כולם״"))

VIDEO = Video("S08", "sql", "חילוק: \"לכל ה-___\"", [title, idea, double, count, exam, check, recap], bank={"26S-A-Q12": "a"})
