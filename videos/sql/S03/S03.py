# -*- coding: utf-8 -*-
"""S03 · JOIN: חיבור טבלאות — video script (build: tools/video/vid.py S03).

Source: sql/levels/S03.js (lesson + goal: JOIN ... ON / USING, aliases, NATURAL JOIN, comma = Cartesian product, the
full chain through the middle table, INNER JOIN drops unmatched rows, joining on the wrong id).
Exam anchor: 26S-A-Q7 (passenger name + destination for bookings of flights over 1000), not cited by any level quiz.
Avoided on purpose: the S03 quiz (Students/Enrollments/Courses/Lecturers, 'Levi', 'Haifa', the self-join on 101/103)
and the exam questions its items cite (24B-A-Q6, 25C-A-Q8, 25S-B-Q5). Worked examples use an original
Clients/Orders/Dishes database; the exam check uses an original Passenger/Flight/Booking instance.
Every query runs in SQLite (w_sql.DB); result tables are built from its output.
"""
from vid import P, Scene, Video, show, hide, BANK
import stage as st
import w_sql as w

# ---------------------------------------------------------------- data (original)
CL = w.T("Clients", ["client_id", "c_name", "city"], [
    [1, "Noam", "Haifa"], [2, "Shira", "Eilat"], [3, "Tamar", "Haifa"], [4, "Omri", "Tel Aviv"]], pk=["client_id"])
OR = w.T("Orders", ["order_id", "client_id", "dish_id"], [
    [100, 1, 1], [101, 1, 2], [102, 2, 3], [103, 3, 1], [104, 2, 1]], pk=["order_id"])
DI = w.T("Dishes", ["dish_id", "dish", "price"], [[1, "Pizza", 60], [2, "Salad", 45], [3, "Sushi", 90]], pk=["dish_id"])
db = w.DB(CL, OR, DI)

QJ = "SELECT c_name, order_id\nFROM Clients\nJOIN Orders ON Clients.client_id = Orders.client_id"
RJ = db.result(QJ)
assert sorted(r[1] for r in RJ["rows"]) == [100, 101, 102, 103, 104] and "Omri" not in {r[0] for r in RJ["rows"]}
assert w.bag(db.rows("SELECT c_name, order_id FROM Clients JOIN Orders USING(client_id)")) == w.bag(RJ["rows"])
assert w.bag(db.rows("SELECT C.c_name, O.order_id FROM Clients C JOIN Orders O ON C.client_id = O.client_id")) == \
    w.bag(RJ["rows"])
assert db.rows("SELECT COUNT(*) FROM Clients NATURAL JOIN Dishes") == [[12]]      # no common column: a product
GC = {i: r[0] - 1 for i, r in enumerate(CL["rows"])}                            # colour = the client
GO = {i: r[1] - 1 for i, r in enumerate(OR["rows"])}

QC1 = "SELECT COUNT(*)\nFROM Clients, Orders"
QC2 = "SELECT COUNT(*)\nFROM Clients, Orders\nWHERE Clients.client_id = Orders.client_id"
RC1, RC2 = db.result(QC1, columns=["COUNT(*)"]), db.result(QC2, columns=["COUNT(*)"])
assert RC1["rows"] == [[20]] and RC2["rows"] == [[5]] and len(CL["rows"]) * len(OR["rows"]) == 20

QS = ("SELECT C.c_name\nFROM Clients C\nJOIN Orders O ON C.client_id = O.client_id\n"
      "JOIN Dishes D ON O.dish_id = D.dish_id\nWHERE D.dish = 'Sushi'")
QW = "SELECT C.c_name\nFROM Clients C\nJOIN Dishes D ON C.client_id = D.dish_id\nWHERE D.dish = 'Sushi'"
RS, RW = db.result(QS), db.result(QW)
assert RS["rows"] == [["Shira"]] and RW["rows"] == [["Tamar"]]                  # the wrong id looks plausible
assert db.rows("SELECT COUNT(*) FROM Orders WHERE client_id = 3 AND dish_id = 3") == [[0]]   # Tamar never had sushi

# ---------------------------------------------------------------- exam 26S-A-Q7
Q = BANK["26S-A-Q7"]
assert Q["correctId"] == "b"
OPTS = w.bank_opts(Q)
PA = w.T("Passenger", ["passenger_id", "full_name", "city", "birth_year"], [
    [1, "Dana Cohen", "Haifa", 1990], [2, "Yossi Levi", "Eilat", 1985], [3, "Maya Katz", "Haifa", 2000],
    [4, "Avi Peretz", "Ashdod", 1978]], pk=["passenger_id"])
FL = w.T("Flight", ["flight_number", "origin", "destination", "dep_date", "price"], [
    [1, "TLV", "London", "2026-08-01", 1200], [2, "TLV", "Rome", "2026-08-02", 700],
    [3, "TLV", "Tokyo", "2026-08-03", 2500], [4, "TLV", "Paris", "2026-08-04", 900]], pk=["flight_number"])
BK = w.T("Booking", ["passenger_id", "flight_number", "seat_no", "booking_date"], [
    [1, 3, "12A", "2026-06-01"], [2, 2, "30C", "2026-06-02"], [3, 1, "7F", "2026-06-03"],
    [4, 4, "22B", "2026-06-04"]], pk=["passenger_id", "flight_number"])
xdb = w.DB(PA, FL, BK)
XR, XE = {}, {}
for oid, _, sql in OPTS:
    e = xdb.err(sql)
    if e:
        XE[oid] = e
    else:
        XR[oid] = xdb.result(sql)
assert set(XE) == {"c"} and "no such column" in XE["c"]                    # Booking has no price, f is not defined
assert w.bag(XR["b"]["rows"]) == w.bag([["Dana Cohen", "Tokyo"], ["Maya Katz", "London"]])
assert w.bag(XR["a"]["rows"]) == w.bag([["Dana Cohen", "London"], ["Maya Katz", "Tokyo"]])   # names and places swapped
assert w.bag(XR["d"]["rows"]) == w.bag([[1, "Tokyo"], [3, "London"]])                      # ids, not names
assert len(XR["e"]["rows"]) == 8 == 4 * 2                                                  # every passenger x every expensive flight
CAPS = {"a": w.ic("p.passenger_id = f.flight_number"), "b": "דרך " + w.ic("Booking"), "d": w.ic("b.passenger_id"),
        "e": w.ic("Passenger p, Flight f")}

# ---------------------------------------------------------------- scenes
title = Scene("title", "", [
    P("בסרטון הזה נחבר טבלאות: JOIN."),
    P("נראה איך JOIN מצמיד שורות, מה עושה פסיק בין טבלאות, ואיך עוברים דרך טבלה באמצע."),
    P("ובסוף נפתור שאלה אמיתית ממבחן, עם המסיחים שלה.", hold=0.4),
], stage='<div class="kicker">S03 · SQL</div><h1>JOIN: חיבור טבלאות</h1>'
         '<p>לחבר טבלאות נכון: ON ו-USING, שרשרת מלאה עד הטבלה שמסננים לפיה, ולזהות חיבור לפי המזהה הלא נכון.</p>',
   layout="title")

idea = Scene("idea", "JOIN", [
    P("המידע מפוזר בכמה טבלאות. שם הלקוח בטבלת הלקוחות, וההזמנות בטבלת ההזמנות.", do=show("jc", "jo")),
    P("העמודה המשותפת היא מזהה הלקוח. בהזמנות הוא מפתח זר, שמצביע על המפתח הראשי של הלקוחות.",
      do=show(*[f"jc-g{i}" for i in GC], *[f"jo-g{i}" for i in GO])),
    P("JOIN מצמיד לכל הזמנה את שורת הלקוח שלה, לפי התנאי שאחרי ON.", do=show("jq")),
    P("כל שורה בתוצאה היא זוג: הזמנה, והלקוח שלה. אותו צבע, אותו לקוח.", do=w.rows_do("jr", RJ)),
    P("לעומרי אין אף הזמנה, ולכן הוא לא בתוצאה. JOIN רגיל משאיר רק שורות שיש להן התאמה.", do=show("jc-x3", "j-c1")),
    P("כשלעמודה יש אותו שם בשתי הטבלאות, אפשר לכתוב USING. זה אותו חיבור בדיוק.", do=show("j-c2")),
    P("ואפשר לתת לטבלה כינוי קצר. זו אותה טבלה, לא עותק נוסף.", do=show("j-c3")),
    P("NATURAL JOIN מחבר לבד, לפי כל העמודות עם שם זהה. ובלי אף עמודה משותפת, הוא נותן מכפלה.",
      do=show("j-c4"), hold=0.4),
], stage=w.col(w.code("jq", QJ, size="sm h"),
               w.row(w.table("jc", CL, size="sm", hidden=True, groups=GC),
                     w.table("jo", OR, size="sm", hidden=True, groups=GO), w.result("jr", RJ, size="sm"), gap=30),
               gap=24),
   panel=st.card("j-c1", "trap", "⚠️ " + w.ic("JOIN") + " רגיל: רק שורות עם התאמה")
         + st.card("j-c2", "ex", w.ic("JOIN Orders USING(client_id)"))
         + st.card("j-c3", "ex", w.ic("FROM Clients C JOIN Orders O"))
         + st.card("j-c4", "trap", "⚠️ " + w.ic("NATURAL JOIN") + " בלי עמודה משותפת = מכפלה"))

comma = Scene("comma", "פסיק בין טבלאות", [
    P("ומה עושה פסיק בין שתי טבלאות? מכפלה קרטזית: כל שורה עם כל שורה.", do=show("cq1")),
    P("ארבעה לקוחות כפול חמש הזמנות: עשרים שורות, ורובן זוגות בלי שום קשר.", do=w.rows_do("cr1", RC1)),
    P("פסיק עובד רק יחד עם תנאי חיבור ב-WHERE.", do=show("cq2")),
    P("עם התנאי נשארות חמש שורות, בדיוק כמו ב-JOIN.", do=w.rows_do("cr2", RC2)),
    P("ולכן הכלל: כל זוג טבלאות ב-FROM צריך תנאי חיבור. בלי תנאי, זו מכפלה.", do=show("c-c1"), hold=0.4),
], stage=w.col(w.row(w.code("cq1", QC1, size="sm h"), w.result("cr1", RC1), gap=40, cls="mid"),
               w.row(w.code("cq2", QC2, size="sm h"), w.result("cr2", RC2), gap=40, cls="mid"), gap=50),
   panel=st.card("c-c1", "rule", "🔑 " + w.ic("FROM A, B") + " בלי תנאי = כל שורה עם כל שורה"))

chain = Scene("chain", "שרשרת מלאה", [
    P("עכשיו: מי הזמין סושי? שם הלקוח בטבלה אחת, ושם המנה בטבלה אחרת.", do=show("hc", "ho", "hd")),
    P("ואין ביניהן עמודה משותפת. הקשר עובר דרך טבלת ההזמנות שבאמצע.", do=show("h-c1")),
    P("לכן מחברים שלוש טבלאות: לקוח להזמנה לפי מזהה הלקוח, והזמנה למנה לפי מזהה המנה.", do=show("hs")),
    P("והתוצאה: שירה. היא היחידה שהזמינה סושי.", do=w.rows_do("hrs", RS)),
    P("ועכשיו המסיח השקט: חיבור לפי המזהה הלא נכון.", do=show("hw")),
    P("כאן מזהה הלקוח מושווה למזהה המנה. זה נראה תקין, אבל אין שום קשר בין שני המספרים.", do=show("hw-m2")),
    P("והתוצאה: תמר, שלא הזמינה סושי אף פעם. רק שהמספר שלה, שלוש, שווה למספר של הסושי.", do=w.rows_do("hrw", RW)),
    P("לכן בכל ON בודקים: שני הצדדים מתארים את אותו הדבר?", do=show("h-c2"), hold=0.4),
], stage=w.col(w.row(w.table("hc", CL, size="xs", hidden=True), w.table("ho", OR, size="xs", hidden=True),
                     w.table("hd", DI, size="xs", hidden=True), gap=26),
               w.row(w.code("hs", QS, size="xs h"), w.result("hrs", RS, size="sm"), gap=26, cls="mid"),
               w.row(w.code("hw", QW, size="xs h"), w.result("hrw", RW, size="sm"), gap=26, cls="mid"), gap=18),
   panel=st.card("h-c1", "rule", "🔑 " + w.ic("Clients") + " ← " + w.ic("Orders") + " ← " + w.ic("Dishes"))
         + st.card("h-c2", "trap", "⚠️ " + w.ic("C.client_id = D.dish_id") + ": מזהים שאין ביניהם קשר"))

stem_x = ("לכל הזמנה שבה מחיר הטיסה גבוה מ-1000, החזירו את <b>שם הנוסע</b> ואת <b>יעד הטיסה</b>.")
exam = Scene("exam", "שאלה ממבחן", [
    P("שאלה ממבחן: לכל הזמנה של טיסה שמחירה מעל 1000, החזירו את שם הנוסע ואת יעד הטיסה.",
      say="שאלה ממבחן: לכל הזמנה של טיסה שהמחיר שלה מעל אלף, החזירו את שם הנוסע ואת יעד הטיסה."),
    P("איפה כל עמודה? השם בטבלת הנוסעים, והיעד והמחיר בטבלת הטיסות.", do=show("x-c1")),
    P("ומי מקשר בין נוסע לטיסה? טבלת ההזמנות. לכן צריך שלוש טבלאות.", do=show("x-c2")),
    P("השאילתה שמשווה מזהה נוסע למספר טיסה מדלגת על ההזמנות. אלה מזהים שאין ביניהם קשר.",
      do=show("q-x-a", "q-n-a")),
    P("השאילתה שמסננת לפי המחיר בטבלת ההזמנות: אין שם מחיר, וגם הכינוי של הטיסות לא הוגדר.",
      do=show("q-x-c", "q-n-c")),
    P("השאילתה שמחזירה את מזהה הנוסע: ביקשו שם, לא מזהה.", do=show("q-x-d", "q-n-d")),
    P("והשאילתה עם פסיק ובלי תנאי חיבור: מכפלה. כל נוסע עם כל טיסה יקרה.", do=show("q-x-e", "q-n-e")),
    P("נשארה השרשרת המלאה: הזמנה לנוסע, והזמנה לטיסה.", do=show("q-ok-b"), hold=0.5),
], stage=w.col(w.stem(Q["id"], stem_x),
               w.row(w.chip("x-c1", "שם ← " + w.ic("Passenger") + " · יעד ומחיר ← " + w.ic("Flight")),
                     w.chip("x-c2", "הקשר ← " + w.ic("Booking")), gap=24),
               w.opts("q", OPTS, ncols=3, size="xs", notes={"a": "מזהים לא קשורים", "c": "אין price ב-Booking",
                                                            "d": "מזהה, לא שם", "e": "מכפלה"}), gap=22),
   layout="full")

err_c = w.note("xe-c", "<b>שגיאה</b>: " + w.ic("no such column"), cls="sm")
check = Scene("check", "בודקים על נתונים", [
    P("נבדוק על נתונים: ארבעה נוסעים, ארבע טיסות, וכל נוסע הזמין טיסה אחת.", do=show("xp", "xb", "xf")),
    P("שתי טיסות יקרות: לטוקיו וללונדון. דנה טסה לטוקיו, ומאיה ללונדון.",
      do=show("xf-hi0", "xf-hi2", "xb-hi0", "xb-hi2")),
    P("השרשרת המלאה מחזירה בדיוק את זה.", do=show("xr-b") + w.rows_do("xr-b", XR["b"])),
    P("החיבור בין מזהה הנוסע למספר הטיסה מחזיר את אותם שמות, אבל עם היעדים הפוכים.",
      do=show("xr-a") + w.rows_do("xr-a", XR["a"])),
    P("כי לדנה יש מזהה אחד, ולטיסה ללונדון יש מספר אחד. צירוף מקרים, לא הזמנה.", do=show("xp-c0-0", "xf-c0-0")),
    P("השאילתה שמסננת לפי המחיר בהזמנות לא רצה בכלל: שגיאה.", do=show("xe-c")),
    P("זו עם מזהה הנוסע מחזירה מספרים במקום שמות. והמכפלה: שמונה שורות, ארבעה נוסעים כפול שתי טיסות.",
      do=show("xr-d", "xr-e") + w.rows_do("xr-d", XR["d"]) + w.rows_do("xr-e", XR["e"]), hold=0.5),
], stage=w.col(w.row(w.table("xp", PA, size="sm", hidden=True, cols=[0, 1], cells=[(0, 0)]),
                     w.table("xb", BK, size="sm", hidden=True, cols=[0, 1]),
                     w.table("xf", FL, size="sm", hidden=True, cols=[0, 2, 4], cells=[(0, 0)]), gap=40),
               w.row(*[w.result(f"xr-{k}", XR[k], size="xs", cap=CAPS[k], hidden=True) for k in "ab"], err_c,
                     *[w.result(f"xr-{k}", XR[k], size="xs", cap=CAPS[k], hidden=True) for k in "de"], gap=24),
               gap=30),
   layout="full")

recap = Scene("recap", "סיכום", [
    P("לסיכום: JOIN מצמיד שורות לפי מפתח זר ומפתח ראשי, ומשאיר רק שורות עם התאמה.", do=show("r-1")),
    P("פסיק בלי תנאי חיבור הוא מכפלה קרטזית.", do=show("r-2")),
    P("אם אין עמודה משותפת, עוברים דרך הטבלה שבאמצע, עד הטבלה שבה יושבת העמודה.", do=show("r-3")),
    P("ובכל ON בודקים ששני הצדדים מתארים את אותו הדבר. נתראה ברמה הבאה.", do=show("r-4"), hold=0.6),
], stage=w.code("rq", Q["options"][1]["value"].rstrip(";")),
   panel=st.card("r-1", "rule", "🔑 " + w.ic("JOIN … ON") + ": מפתח זר = מפתח ראשי")
         + st.card("r-2", "trap", "⚠️ " + w.ic("FROM A, B") + " בלי תנאי = מכפלה")
         + st.card("r-3", "rule", "🔑 שרשרת מלאה דרך הטבלה שבאמצע")
         + st.card("r-4", "trap", "⚠️ " + w.ic("ON") + " בין מזהים לא קשורים"))

VIDEO = Video("S03", "sql", "JOIN: חיבור טבלאות", [title, idea, comma, chain, exam, check, recap], bank={"26S-A-Q7": "b"})
