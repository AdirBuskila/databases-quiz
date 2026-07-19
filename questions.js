window.DB_QUIZ = {
 "meta": {
  "generated": "build_questions.py",
  "exams": 10,
  "counts": {
   "total": 206,
   "contexts": 36
  }
 },
 "contexts": {
  "21B-A-erd": {
   "kind": "image",
   "title": "חלק א׳ — ERD: חברת סטארט-אפ ועובדים",
   "image": "images/exams/21B-A-erd.png",
   "caption": "השאלות הבאות מתייחסות ל-ERD הנתון (עובד, חברת סטארט-אפ, ותתי-הסוגים מתכנת / ראש צוות / מנכ\"ל)."
  },
  "21B-A-q4erd": {
   "kind": "image",
   "title": "שאלה 4 — התרשים לאחר השינוי",
   "image": "images/exams/21B-A-q4-erd.png",
   "caption": "התרשים שונה כך שהקשר \"עובד ב\" מחובר בקו כפול (השתתפות מלאה) הן לישות עובד והן לחברת סטארט-אפ."
  },
  "21B-A-sql": {
   "kind": "schema",
   "title": "חלק ב׳ — סכמת בסיס הנתונים (מועדון תחביבים)",
   "intro": "נתונות תבניות/סכמות יחסים מתוך בסיס נתונים של מועדון המציע עיסוק בתחביבים. למועדון נרשמים אנשים המציינים באילו תחביבים הם רוצים לעסוק. בבסיס הנתונים יש מידע על מי יכול לעסוק באיזה תפקיד (על סמך אישורים רפואיים לדוגמא ושלילת מגבלות).",
   "relations": [
    {
     "schema": "person([u]p-id[/u], p-name, p-city, p-age, p-gender)",
     "meaning": "היחס מתאר פרטי אדם המחפש תחביב: מס' תעודת זהות, שם, עיר מגורים, גיל ומגדר."
    },
    {
     "schema": "hobby([u]h-code[/u], h-name, h-type)",
     "meaning": "היחס מתאר פרטי תחביב שהמועדון מציע: קוד מזהה (`h-code`), שם מילולי (`h-name`), סוג תחביב (`h-type`) כגון ספורט, מוזיקה, וכו'."
    },
    {
     "schema": "capable([u]p-id[/u], [u]h-code[/u])",
     "meaning": "יחס זה מתאר אדם שמסוגל לעסוק בתחביב."
    },
    {
     "schema": "interested([u]p-id[/u], [u]h-code[/u])",
     "meaning": "יחס זה מתאר אדם שרוצה (מעוניין) לעסוק בתחביב."
    }
   ]
  },
  "21B-A-ra": {
   "kind": "schema",
   "title": "חלק ג׳ — נושא אלגברת היחסים (בחירות)",
   "intro": "נתון בסיס הנתונים הבא, בנושא בחירות:",
   "relations": [
    {
     "schema": "Citizen([u]AnonymousId[/u], Area, Age)",
     "meaning": "אזרח: מזהה אנונימי, איזור מגורים, גיל."
    },
    {
     "schema": "Elect(AnonymousId, partyElected)",
     "meaning": "בחירה: מזהה אנונימי, מפלגה נבחרת. (בחלק מהשאלות ניתן להצביע כמה פעמים.)"
    }
   ]
  },
  "21B-A-fd": {
   "kind": "fd",
   "title": "חלק ד׳ — תלויות ונרמול",
   "algebra": [
    "R = (A, B, C, D, E)",
    "F = { A → BE, AE → C, C → D }"
   ]
  },
  "21B-C-erd": {
   "kind": "image",
   "title": "חלק א׳ — ERD: חברת סטארט-אפ ועובדים",
   "image": "images/exams/21B-C-erd.png",
   "caption": "התייחסו לתרשים ה-ERD המתאר בסיס נתונים של חברת סטארט-אפ ועובדיה, וענו על השאלות."
  },
  "21B-C-db": {
   "kind": "schema",
   "title": "חלקים ב׳ / ג׳ — סכמת בסיס הנתונים (רפת פרות)",
   "intro": "נתונות תבניות/סכמות יחסים מתוך בסיס נתונים המתאר מצב של רפת פרות בחודש מסוים. הסכמה משמשת את חלק ב׳ (SQL) ואת חלק ג׳ (אלגברת יחסים).",
   "relations": [
    {
     "schema": "mother_of([u]mom_id[/u], [u]daughter_id[/u])",
     "meaning": "היחס מתאר קשר בין פרה אם (`mom_id`) ובתה (`daughter_id`)."
    },
    {
     "schema": "cow(nickname, [u]cow_id[/u], age)",
     "meaning": "פרטי פרה: קוד מזהה (`cow_id`), גיל הפרה בחודשים (`age`), ושם חיבה (`nickname`)."
    },
    {
     "schema": "milk_product([u]cow_id[/u], amount)",
     "meaning": "היחס מכיל מידע על כמות החלב (`amount`) שהפרה הניבה."
    },
    {
     "schema": "place_of([u]cow_id[/u], block_id)",
     "meaning": "היחס מתאר באיזה ביתן הפרה מתגוררת. `block_id` הוא קוד הביתן."
    },
    {
     "schema": "food_of([u]cow_id[/u], [u]food_code[/u])",
     "meaning": "היחס מתאר קשר בין פרה למזון שהיא אוכלת. פרה יכולה לאכול מספר מזונות (בעלי קודים שונים), ומזון בעל קוד מסוים יכול להינתן לפרות שונות. (נוסף לבסיס הנתונים עבור שאלות 14-15.)"
    }
   ]
  },
  "21B-C-fd": {
   "kind": "fd",
   "title": "חלק ד׳ — תלויות ונרמול (שאלות 20-21)",
   "algebra": [
    "R = (A, B, C, D, E, F)",
    "F = {F → AE,  BE → C,  C → AD}"
   ]
  },
  "21S-B-erd": {
   "kind": "image",
   "title": "חלק א׳ — ERD (בנייה ורכישת דירות)",
   "image": "images/exams/21S-B-erd.png",
   "caption": "התייחסו לתרשים ה-ERD המתאר מערכת של קבלנים, בתים ולקוחות (בנייה ורכישת דירות) וענו על השאלות."
  },
  "21S-B-schema": {
   "kind": "schema",
   "title": "חלק ב׳ / ג׳ — סכמת בסיס הנתונים (מערכת בנייה ורכישת דירות)",
   "intro": "נתונות הסכמות הבאות המייצגות חלק מבסיס נתונים של מערכת בנייה ורכישת דירות. שאלות אלגברת היחסים מתבססות על אותו בסיס נתונים כמו חלק ה-SQL.",
   "relations": [
    {
     "schema": "Building_contractor([u]contractor_id[/u], name, age, salary, Address, city)",
     "meaning": "קבלן בניין: מספר קבלן, שם, גיל, משכורת, כתובת מגורים, עיר מגורים."
    },
    {
     "schema": "Apartments([u]Apartments id[/u], Address, Description, contractor_id, Construction_cost, city)",
     "meaning": "דירות: מספר דירה, כתובת דירה, תיאור הדירה, מספר קבלן שבנה, עלות בנייה, עיר."
    },
    {
     "schema": "Purchases([u]Purchase number[/u], Apartments_id, contractor_id, cost, customer_id)",
     "meaning": "רכישות: מספר רכישה, מספר דירה, מספר קבלן, עלות, מספר לקוח."
    },
    {
     "schema": "Customer([u]customer_id[/u], salary, city, age, name)",
     "meaning": "לקוח: מספר לקוח, משכורת, עיר מגורים, גיל, שם."
    }
   ]
  },
  "21S-B-fd": {
   "kind": "fd",
   "title": "חלק ד׳ — תלויות ונרמול",
   "algebra": [
    "R = (E, F, G, H, I)  יחס כלשהו",
    "F = {E → FH,  I → FG,  EG → HI}"
   ]
  },
  "22B-A-erd": {
   "kind": "image",
   "title": "חלק א׳ — ERD",
   "image": "images/exams/22B-A-erd.png",
   "caption": "התייחסו לתרשים ה-ERD המתאר בסיס נתונים של מכללה וענו על השאלות."
  },
  "22B-A-schema": {
   "kind": "schema",
   "title": "חלק ב׳ / ג׳ — סכמת בסיס הנתונים (להקות, מוזיקאים וכלי נגינה)",
   "intro": "נתונות תבניות/סכמות יחסים מתוך בסיס נתונים של להקות, מוזיקאים, וכלי נגינה. ניתן להניח שבטבלאות אין Null, ערכים ריקים.",
   "relations": [
    {
     "schema": "musician([u]m_id[/u], m_name, instrument, m_age, m_gender)",
     "meaning": "פרטי מוסיקאי: מס' תעודת זהות (`m_id`), שם, שם כלי נגינה עליו מנגן (במקרה שהמוסיקאי אינו מנגן על כלי נגינה, ערך התכונה יהיה `\"none\"`), גיל ומגדר."
    },
    {
     "schema": "band([u]b_code[/u], b_name, b_leader_id, b_music_genre)",
     "meaning": "פרטי להקה שיש בה יותר מאדם אחד: קוד מזהה להקה (`b_code`), שם מילולי של הלהקה (`b_name`), תעודת זהות של מוסיקאי שהוא מנהיג הלהקה (`b_leader_id`), וסוג מוסיקה — ז'אנר (`b_music_genre`)."
    },
    {
     "schema": "one_man_band([u]b_code[/u], num_of_instruments)",
     "meaning": "יחס המתאר להקה שיש בה מוסיקאי אחד בלבד: קוד להקה (`b_code`) ומספר כלי הנגינה עליהם המוסיקאי מנגן בלהקה (`num_of_instruments`)."
    },
    {
     "schema": "band_musician([u]b_code[/u], [u]m_id[/u])",
     "meaning": "שייכות של מוסיקאי (`m_id`) ללהקה (`b_code`). מתאים ללהקה בת מוסיקאי יחיד, וכן ללהקה בת יותר ממוסיקאי אחד."
    },
    {
     "schema": "Instrument_belongs_to([u]instrument[/u], [u]set[/u])",
     "meaning": "שייכות ישירה של מכשיר נגינה ששמו (`instrument`) לקבוצה בהיררכיה של כלי נגינה ששמה (`set`). למשל: כלי נשיפה ממתכת — סקסופון, חצוצרה, טרומבון; כלי נשיפה מעץ — חליל, אבוב, קלרינט; כלי מיתר פריטה — גיטרה, נבל; כלי מיתר קשת — כינור, ויולה."
    }
   ]
  },
  "22B-A-fd": {
   "kind": "fd",
   "title": "חלק ד׳ — תלויות ונרמול",
   "algebra": [
    "R = (A, B, C, D, E)",
    "F1 = {A→CE,  C→DE,  B→A}"
   ]
  },
  "23B-A-erd": {
   "kind": "image",
   "title": "חלק א׳ — תרשים ER (אתר גלישת סקי)",
   "image": "images/exams/23B-A-erd.png",
   "caption": "התייחסו לתרשים ה-ERD המתאר בסיס נתונים של אתר גלישת סקי וענו על השאלות. (התרשים חולץ מהמבחן.)"
  },
  "23B-A-sql": {
   "kind": "schema",
   "title": "חלק ב׳/ג׳ — סכמות היחסים (תחרות שירה דומה לאירוויזיון)",
   "intro": "נתונות תבניות/סכמות היחסים הבאות מתוך בסיס נתונים של תחרות שירה דומה לאירוויזיון. הסעיפים של חלק ב׳ (SQL) וחלק ג׳ (אלגברת היחסים) מתייחסים לאוסף זה:",
   "relations": [
    {
     "schema": "Performer([u]p_name[/u], age, gender, height, country_name)",
     "meaning": "היחס מתאר את המבצעים — פרטי האנשים המופיעים: שם, גיל, מין (זכר, נקבה, לא מזדהה), גובה, והמדינה בה מתגורר."
    },
    {
     "schema": "Band([u]b_name[/u], [u]p_name[/u], serial_number)",
     "meaning": "היחס מתאר פרטי להקה ומי משתתף בה, ובאיזה כלי (`serial_number`) הוא השתמש — יתכן שיהיה `NULL` (ריק). תתכן להקה של אדם אחד."
    },
    {
     "schema": "Instrument([u]serial_number[/u], type, category, height, width, length)",
     "meaning": "היחס מתאר כלי נגינה או עזרים למופע: מספר סדרתי, סוג הכלי (`type` — גיטרה, תופים, עמוד, כסא), קטגוריה (`category` — פריטה, נשיפה, קלידים), ומידות רוחב/אורך/גובה לאחסון והובלה."
    },
    {
     "schema": "Represent([u]b_name[/u], [u]country_name[/u], [u]year[/u])",
     "meaning": "היחס מתאר את הלהקות המייצגות מדינה מסוימת בשנה מסוימת. אדם יכול להופיע בשנים שונות עם מדינות שונות, וגם באותה שנה בלהקות שונות. אם אדם מופיע לבדו — הוא יופיע כלהקה של אדם אחד."
    },
    {
     "schema": "Score([u]from_coutry[/u], [u]to_country[/u], num_points, [u]year[/u])",
     "meaning": "ניקוד הניתן ממדינה למדינה — מספר נקודות (`num_points`) בשנה מסוימת. ב-`from_country` וב-`to_country` יש התאמה ל-`country_name` מטבלאות Represent ו-Performer. מדינה שלא קיבלה ניקוד כלל לא תופיע כאן. (שימו לב: בכותרת הסכמה השדה נכתב `from_coutry`.)"
    }
   ]
  },
  "23B-A-q17": {
   "kind": "relations",
   "title": "מופע חוקי של היחס R = (P1, P2, P3)",
   "tables": [
    {
     "name": "R",
     "columns": [
      "P1",
      "P2",
      "P3"
     ],
     "rows": [
      [
       "a",
       50,
       "T"
      ],
      [
       "a",
       10,
       "F"
      ],
      [
       "b",
       80,
       "T"
      ],
      [
       "c",
       80,
       "T"
      ],
      [
       "b",
       50,
       "T"
      ]
     ]
    }
   ]
  },
  "23B-A2-erd": {
   "kind": "image",
   "title": "חלק א׳ — תרשים ER",
   "image": "images/exams/23B-A2-erd.png",
   "caption": "התרשים מתאר בסיס נתונים של חברות הפקה, מופעים, שחקנים/ות, פרסים ומדינות. (התרשים חולץ מהמבחן ועבר היפוך צבעים לשיפור הקריאוּת.)"
  },
  "23B-A2-sql": {
   "kind": "schema",
   "title": "חלקים ב׳ ו-ג׳ — סכמות היחסים (תחרות שירה דומה לאירוויזיון)",
   "intro": "נתונות תבניות/סכמות היחסים הבאות, מתוך בסיס נתונים של תחרות שירה דומה לאירוויזיון. הסעיפים בחלק ב׳ (SQL) ובחלק ג׳ (אלגברת יחסים) מתייחסים לאוסף זה:",
   "relations": [
    {
     "schema": "Performer([u]p_name[/u], age, gender, height, country_name)",
     "meaning": "היחס מתאר את המבצעים — פרטי האנשים המופיעים: שם, גיל, מין (זכר, נקבה, לא מזדהה), גובה, והמדינה בה מתגורר."
    },
    {
     "schema": "Band([u]b_name[/u], [u]p_name[/u], serial_number)",
     "meaning": "היחס מתאר פרטי להקה, מי משתתף בה ובאיזה כלי הוא השתמש. ייתכן שהכלי יהיה `NULL` (ריק). תיתכן להקה של אדם אחד."
    },
    {
     "schema": "Instrument([u]serial_number[/u], type, category, height, width, length)",
     "meaning": "היחס מתאר כלי נגינה או עזרים למופע: מספר סדרתי, סוג הכלי (גיטרה, תופים, עמוד, כסא), קטגוריה (פריטה, נשיפה, קלידים), ומידות רוחב אורך וגובה לאחסון והובלה."
    },
    {
     "schema": "Represent([u]b_name[/u], country_name, [u]year[/u])",
     "meaning": "היחס מתאר את הלהקות שמייצגות מדינה מסוימת בשנה מסוימת. אדם יכול להופיע בשנים שונות עם מדינות שונות, וגם באותה שנה בלהקות שונות. גם אם מופיע אדם אחד — הוא יופיע כלהקה של אדם אחד."
    },
    {
     "schema": "Score([u]from_country[/u], [u]to_country[/u], num_points, [u]year[/u])",
     "meaning": "ניקוד ניתן ממדינה למדינה, עם מספר נקודות בשנה מסוימת. ב-`from_country` וב-`to_country` יש התאמה ל-`country_name` מטבלת `Performer`/`Represent`. מדינה שלא קיבלה ניקוד כלל לא תופיע כאן."
    }
   ]
  },
  "24B-A-erd": {
   "kind": "image",
   "title": "חלק א׳ — ERD: דיאגרמת \"ניהול שאלות\"",
   "image": "images/exams/24B-A-erd.png",
   "caption": "התייחסו לתרשים ה-ERD \"ניהול שאלות\" המתאר בסיס נתונים, וענו על השאלות."
  },
  "24B-A-sql": {
   "kind": "schema",
   "title": "חלק ב׳ — סכמת בסיס הנתונים (טיסות)",
   "intro": "נתונות תבניות/סכמות יחסים מתוך בסיס נתונים של טיסות:",
   "relations": [
    {
     "schema": "Airline([u]AirlineID[/u], Name, Country)",
     "meaning": "חברת תעופה: מזהה חברת תעופה, שם חברת תעופה, מדינת חברת התעופה."
    },
    {
     "schema": "Flight([u]FlightID[/u], AirlineID, Origin, Destination)",
     "meaning": "טיסה: מזהה טיסה, מזהה חברת תעופה, מקום המוצא, יעד הטיסה."
    },
    {
     "schema": "Schedule([u]ScheduleID[/u], FlightID, DepartureTime, ArrivalTime, Date)",
     "meaning": "לוח זמנים: מזהה לוח זמנים, מזהה הטיסה, שעת המראה, שעת נחיתה, תאריך הטיסה. *תאריך הטיסה הוא לפי שעת ההמראה."
    },
    {
     "schema": "Passenger([u]PassportNumber[/u], FirstName, LastName)",
     "meaning": "נוסע: מספר דרכון, שם פרטי, שם משפחה."
    },
    {
     "schema": "Booking([u]BookingID[/u], ScheduleID, PassportNumber, SeatNumber)",
     "meaning": "הזמנה: מזהה הזמנה, מזהה לוח זמנים, מספר דרכון נוסע, מספר מושב."
    }
   ]
  },
  "24B-A-ra": {
   "kind": "schema",
   "title": "חלק ג׳ — סכמת בסיס הנתונים (ספרייה)",
   "intro": "השאלות הבאות מתייחסות לאלגברת היחסים ולבסיס הנתונים הנתון. פעולות שנעשו לפני כל שאלה (קיצורים לשמות הטבלאות): `ρA Author`, `ρB Book`, `ρM Member`, `ρBR Borrow`, `ρG Genre`.",
   "relations": [
    {
     "schema": "Author([u]a_name[/u], birth_year, country)",
     "meaning": "מחברים: שמם, שנת לידה, מדינת מוצא."
    },
    {
     "schema": "Book([u]ISBN[/u], title, a_name, genre, published_year)",
     "meaning": "ספרים: מספר ISBN, שם הספר, שם המחבר, ז'אנר ושנת הפרסום."
    },
    {
     "schema": "Member([u]m_id[/u], m_name, age, gender, membership_date)",
     "meaning": "חברי ספרייה: מזהה החבר, שם החבר, גיל, מגדר ותאריך החברות."
    },
    {
     "schema": "Borrow([u]m_id[/u], [u]ISBN[/u], [u]borrow_date[/u], return_date)",
     "meaning": "רשומות השאלה: מספר חבר שהשאיל את הספר, ISBN של הספר, תאריך ההשאלה ותאריך ההחזרה."
    },
    {
     "schema": "Genre([u]genre[/u], description)",
     "meaning": "ז'אנרים: שמם ותיאור קצר."
    }
   ]
  },
  "25B-A-erd": {
   "kind": "image",
   "title": "חלק א׳ — תרשים ER (מערכת רישום של מכללה)",
   "image": "images/exams/25B-A-erd.png",
   "caption": "התרשים מתאר את מערכת הרישום של מכללה. התייחסו אליו וענו על השאלות. (התרשים חולץ מהמבחן ועבר היפוך צבעים לשיפור הקריאוּת; במבחן מופיעים שלושה עותקים זהים — כאן מוצג עותק אחד.)"
  },
  "25B-A-sql": {
   "kind": "schema",
   "title": "חלק ב׳ — סכמות היחסים",
   "intro": "נתונות תבניות/סכמות היחסים הבאות מתוך בסיס נתונים. הסעיפים מתייחסים לאוסף זה:",
   "relations": [
    {
     "schema": "Students([u]student_id[/u], first_name, last_name, birth_year, major)",
     "meaning": "`student_id` — מזהה ייחודי של סטודנט (מפתח ראשי);\n`first_name` — שם פרטי; `last_name` — שם משפחה;\n`birth_year` — שנת הלידה; `major` — תחום הלימוד הראשי (חוג ראשי)."
    },
    {
     "schema": "Courses([u]course_id[/u], course_name, credits, department)",
     "meaning": "`course_id` — מזהה ייחודי של הקורס (מפתח ראשי);\n`course_name` — שם הקורס; `credits` — מספר נקודות הזכות שמוענקות על הקורס;\n`department` — שם המחלקה האחראית על הקורס."
    },
    {
     "schema": "Enrollments([u]enrollment_id[/u], student_id, course_id, grade, semester, enrollment_date, status)",
     "meaning": "`enrollment_id` — מזהה ייחודי של שורת הרשמה (מפתח ראשי);\n`student_id` — מזהה הסטודנט (מפתח זר אל Students); `course_id` — מזהה הקורס (מפתח זר אל Courses);\n`grade` — הציון שהסטודנט קיבל בקורס; `semester` — הסמסטר שבו התקיים הקורס (למשל 'Spring 2024');\n`enrollment_date` — תאריך ההרשמה; `status` — מצב ההרשמה (למשל 'active', 'withdrawn', 'completed')."
    },
    {
     "schema": "Instructors([u]instructor_id[/u], name, department, email, hire_date, office_location)",
     "meaning": "`instructor_id` — מזהה ייחודי של המרצה (מפתח ראשי);\n`name` — שם מלא; `department` — המחלקה האקדמית בה המרצה מלמד;\n`email` — כתובת הדוא\"ל; `hire_date` — תאריך תחילת העבודה במוסד;\n`office_location` — מיקום המשרד בקמפוס (למשל 'בניין B, חדר 204')."
    }
   ]
  },
  "25B-A-ra": {
   "kind": "schema",
   "title": "חלק ג׳ — סכמות היחסים (תלמידים, קורסים ומורים פרטיים)",
   "intro": "נתונות תבניות/סכמות יחסים מתוך בסיס נתונים של תלמידים, קורסים ומורים פרטיים. ניתן להניח שבטבלאות אין ערכי Null / ערכים ריקים.",
   "relations": [
    {
     "schema": "student([u]id[/u], name, age, city)",
     "meaning": "היחס מתאר פרטים של תלמיד (מספר מזהה, שם, גיל ועיר מגורים)."
    },
    {
     "schema": "teacher([u]id[/u], teach_grade, city, can_zoom)",
     "meaning": "היחס מתאר פרטים של מורה (מספר מזהה, ציון יכולת הוראה, עיר מגורים, והאם הוא יכול ללמד בזום — `can_zoom`)."
    },
    {
     "schema": "group_lesson(lesson_id, lesson_name, teacher_id, details, is_zoom)",
     "meaning": "יחס זה מתאר שיעור קבוצתי (מזהה שיעור, שם השיעור, מזהה של המורה המלמד, פרטים על השיעור, והאם ניתן ללמוד בזום — `is_zoom`)."
    },
    {
     "schema": "studies([u]student_id[/u], [u]lesson_id[/u])",
     "meaning": "יחס זה מתאר למידה של תלמיד בשיעור (מזהה תלמיד, מזהה שיעור)."
    },
    {
     "schema": "private_lesson(session_id, lesson_id, student_id, teacher_id, is_zoom)",
     "meaning": "יחס זה מתאר שיעור פרטי (מזהה למפגש, מזהה לשיעור שהוא נושא המפגש הפרטי, מזהה תלמיד, מזהה מורה, והאם מתקיים בזום)."
    }
   ],
   "note": "**הערות:** תלמיד יכול גם להיות מורה. תלמיד יכול ללמוד בשיעור קבוצתי או בשיעור פרטי או בשניהם."
  },
  "25B-A-q16": {
   "kind": "relations",
   "title": "שני יחסים R, S בעלי סכמה זהה",
   "tables": [
    {
     "name": "R",
     "columns": [
      "A",
      "B",
      "C"
     ],
     "rows": [
      [
       2,
       2,
       3
      ],
      [
       1,
       2,
       5
      ],
      [
       3,
       2,
       7
      ],
      [
       2,
       5,
       3
      ],
      [
       2,
       2,
       5
      ]
     ]
    },
    {
     "name": "S",
     "columns": [
      "A",
      "B",
      "C"
     ],
     "rows": [
      [
       1,
       5,
       7
      ],
      [
       1,
       2,
       5
      ],
      [
       3,
       6,
       5
      ],
      [
       3,
       2,
       3
      ],
      [
       2,
       2,
       2
      ]
     ]
    }
   ]
  },
  "25B-A-fd": {
   "kind": "fd",
   "title": "חלק ד׳ — יחס ותלויות",
   "algebra": [
    "R = (A, B, C, D, E)",
    "F1 = {A → B, C → BD, E → B, AB → E}"
   ]
  },
  "25C-A-erd": {
   "kind": "image",
   "title": "חלק א׳ — תרשים ER",
   "image": "images/exams/25C-A-erd.png",
   "caption": "התייחסו לתרשים ה-ERD למעלה וענו על השאלות. (התרשים חולץ מהמבחן ועבר היפוך צבעים לשיפור הקריאוּת.)"
  },
  "25C-A-sql": {
   "kind": "schema",
   "title": "חלק ב׳ — סכמות היחסים",
   "intro": "נתונות תבניות/סכמות היחסים הבאות. הסעיפים מתייחסים לאוסף זה:",
   "relations": [
    {
     "schema": "Users([u]user_id[/u], first_name, last_name, email, registration_year, country)",
     "meaning": "המשתמשים הרשומים במערכת.\n`registration_year` — שנת ההרשמה; `country` — מדינת המשתמש."
    },
    {
     "schema": "Courses([u]course_id[/u], course_title, category, level, hours)",
     "meaning": "הקורסים הזמינים.\n`category` (למשל 'Data Science', 'AI', 'Programming');\n`level` (Beginner / Intermediate / Advanced); `hours` — שעות לימוד."
    },
    {
     "schema": "Enrollments([u]enrollment_id[/u], user_id, course_id, enroll_date, progress, status)",
     "meaning": "הרשמות של משתמשים לקורסים.\n`progress` — אחוז התקדמות (0–100); `status` ∈ (Active, Completed, Withdrawn)."
    },
    {
     "schema": "Instructors([u]instructor_id[/u], full_name, expertise, email, hire_date)",
     "meaning": "המדריכים.\n`expertise` — תחום התמחות (למשל 'AI', 'Programming'); `hire_date` — תאריך קליטה."
    }
   ]
  },
  "25C-A-ra": {
   "kind": "schema",
   "title": "חלק ג׳ — סכמות היחסים (תלמידים, קורסים ומורים פרטיים)",
   "intro": "ניתן להניח שבטבלאות אין ערכי Null / ערכים ריקים.",
   "relations": [
    {
     "schema": "student([u]id[/u], name, age, city)",
     "meaning": "פרטי תלמיד: מזהה, שם, גיל ועיר מגורים."
    },
    {
     "schema": "teacher([u]id[/u], teach_grade, city, can_zoom)",
     "meaning": "פרטי מורה: מזהה, ציון יכולת הוראה, עיר מגורים, והאם יכול ללמד בזום (`can_zoom`)."
    },
    {
     "schema": "group_lesson([u]lesson_id[/u], lesson_name, teacher_id, details, is_zoom)",
     "meaning": "שיעור קבוצתי: מזהה שיעור, שם, מזהה המורה המלמד, פרטים, והאם ניתן ללמוד בזום (`is_zoom`)."
    },
    {
     "schema": "studies([u]student_id[/u], [u]lesson_id[/u])",
     "meaning": "לימוד של תלמיד בשיעור (מזהה תלמיד, מזהה שיעור)."
    },
    {
     "schema": "private_lesson([u]session_id[/u], lesson_id, student_id, teacher_id, is_zoom)",
     "meaning": "שיעור פרטי: מזהה מפגש, מזהה השיעור הנלמד, מזהה תלמיד, מזהה מורה, והאם מתקיים בזום."
    }
   ],
   "note": "**הערות:** תלמיד יכול גם להיות מורה. תלמיד יכול ללמוד בשיעור קבוצתי או בשיעור פרטי או בשניהם."
  },
  "25C-A-fd": {
   "kind": "fd",
   "title": "חלק ד׳ — יחס ותלויות",
   "algebra": [
    "R = (A, B, C, D, E)",
    "F1 = {A → B, C → BD, E → B, AB → E}"
   ]
  },
  "25C-A-q16": {
   "kind": "relations",
   "title": "שני יחסים R, S בעלי סכמה זהה",
   "tables": [
    {
     "name": "R",
     "columns": [
      "A",
      "B",
      "C"
     ],
     "rows": [
      [
       2,
       2,
       3
      ],
      [
       1,
       2,
       5
      ],
      [
       3,
       2,
       7
      ],
      [
       2,
       5,
       3
      ],
      [
       2,
       2,
       5
      ]
     ]
    },
    {
     "name": "S",
     "columns": [
      "A",
      "B",
      "C"
     ],
     "rows": [
      [
       1,
       5,
       7
      ],
      [
       1,
       2,
       5
      ],
      [
       3,
       6,
       5
      ],
      [
       3,
       2,
       3
      ],
      [
       2,
       2,
       2
      ]
     ]
    }
   ]
  },
  "25S-B-erd": {
   "kind": "image",
   "title": "חלק א׳ — תרשים ER",
   "image": "images/exams/25S-B-erd.png",
   "caption": "התייחסו לתרשים ה-ERD למעלה וענו על השאלות. (התרשים חולץ מהמבחן לצורך הצגה.)"
  },
  "25S-B-sql": {
   "kind": "schema",
   "title": "חלק ב׳ — סכמות היחסים (בסיס הנתונים MarketPlace)",
   "intro": "נתונות תבניות/סכמות היחסים הבאות מתוך בסיס הנתונים MarketPlace:",
   "relations": [
    {
     "schema": "Sellers([u]seller_id[/u], name, rating, country, opened_at)",
     "meaning": "פרטי המוכר/החנות.\n`name` — שם המוכר/החנות; `rating` — דירוג המוכר (למשל 4.7); `country` — מדינת המוכר; `opened_at` — תאריך פתיחת החנות."
    },
    {
     "schema": "Customers([u]customer_id[/u], first_name, last_name, email, country, joined_at)",
     "meaning": "טבלת הלקוחות במערכת.\n`email` — כתובת דוא\"ל של הלקוח; `country` — מדינת הלקוח; `joined_at` — תאריך הצטרפות למערכת."
    },
    {
     "schema": "Products([u]product_id[/u], seller_id, name, category, price, active)",
     "meaning": "טבלת המוצרים.\n`seller_id` — מפתח זר אל Sellers(`seller_id`); `category` — קטגוריית המוצר; `price` — מחיר המוצר; `active` — האם המוצר פעיל למכירה."
    },
    {
     "schema": "Orders([u]order_id[/u], customer_id, order_date, status)",
     "meaning": "טבלת ההזמנות.\n`customer_id` — מפתח זר אל Customers(`customer_id`); `order_date` — תאריך ההזמנה; `status` — מצב ההזמנה."
    },
    {
     "schema": "OrderItems([u]order_id[/u], [u]product_id[/u], quantity, unit_price)",
     "meaning": "פריטי הזמנה (שורות בהזמנה).\n`order_id` — מפתח זר אל Orders(`order_id`); `product_id` — מפתח זר אל Products(`product_id`); `quantity` — כמות מהפריט בהזמנה; `unit_price` — מחיר ליחידה בעת ההזמנה."
    },
    {
     "schema": "Reviews([u]review_id[/u], product_id, customer_id, stars, comment, review_date)",
     "meaning": "ביקורות על מוצרים.\n`product_id` — מפתח זר אל Products(`product_id`); `customer_id` — מפתח זר אל Customers(`customer_id`); `stars` — דירוג; `comment` — טקסט חופשי; `review_date` — תאריך הביקורת."
    }
   ]
  },
  "25S-B-ra": {
   "kind": "schema",
   "title": "חלק ג׳ — סכמות היחסים (מערכת לניהול משלוחים)",
   "intro": "נתונות תבניות/סכמות יחסים מתוך בסיס נתונים של מערכת לניהול משלוחים. ניתן להניח שבטבלאות אין ערכי NULL או ערכים ריקים.",
   "relations": [
    {
     "schema": "customer([u]cust_id[/u], name, city)",
     "meaning": "פרטי לקוח: מזהה ייחודי, שם הלקוח, עיר מגורים."
    },
    {
     "schema": "courier([u]courier_id[/u], name, region, vehicle_type)",
     "meaning": "פרטי שליח: מזהה ייחודי, שם השליח, אזור פעילות (`region`), סוג כלי רכב."
    },
    {
     "schema": "package([u]pkg_id[/u], sender_id, recipient_id, weight, priority)",
     "meaning": "פרטי חבילה: מזהה חבילה, מזהה הלקוח השולח, מזהה הלקוח המקבל, משקל החבילה, ורמת העדיפות (גבוהה/רגילה)."
    },
    {
     "schema": "delivery([u]delivery_id[/u], pkg_id, courier_id, delivered_date, is_express)",
     "meaning": "משלוחים: מזהה משלוח, מזהה חבילה, מזהה שליח, תאריך ביצוע המשלוח, והאם המשלוח בוצע באקספרס (`is_express`)."
    },
    {
     "schema": "complaint([u]comp_id[/u], cust_id, pkg_id, reason)",
     "meaning": "תלונות לקוחות: מזהה תלונה, מזהה לקוח, מזהה חבילה, וסיבת התלונה."
    }
   ],
   "note": "**הערות:** לקוח יכול להיות גם שולח וגם מקבל. חבילה אחת יכולה להישלח ביותר ממשלוח אחד (רגיל/אקספרס). שליח יכול לעבוד בכמה אזורים, ולהעביר חבילות עבור לקוחות שונים."
  },
  "25S-B-fd": {
   "kind": "fd",
   "title": "חלק ד׳ — יחס ותלויות",
   "algebra": [
    "R = (A, B, C, D, E)",
    "F1 = {A → B, CD → E, B → D, E → A}"
   ]
  }
 },
 "questions": [
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21B-A-erd",
   "question": "איזו המרה של ראש-צוות היא הנכונה?",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "ראש-צוות([u]מס עובד[/u], שכר, שם פרטי, שם משפחה)   משימה([u]מס עובד[/u], משימה)"
    },
    {
     "id": "b",
     "type": "schema",
     "value": "ראש-צוות([u]מס עובד[/u], שכר, משימה, שם)"
    },
    {
     "id": "c",
     "type": "schema",
     "value": "ראש-צוות([u]מס עובד[/u], מניות, שכר, שם פרטי, שם משפחה)"
    },
    {
     "id": "d",
     "type": "schema",
     "value": "ראש-צוות([u]מס עובד[/u], מניות, ותק, שכר, שם)"
    }
   ],
   "correctId": "a",
   "confidence": "high",
   "explanation": "\"משימה\" היא תכונה מרובת-ערכים ולכן דורשת טבלה משלה עם המזהה של הישות ראש-צוות; \"שם\" מורכב ומתפצל לשם פרטי/שם משפחה. מניות (מנכ\"ל) ו-ותק (מתכנת) אינם שייכים לראש-צוות.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q1",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21B-A-erd",
   "question": "איזה מההיגדים הבאים נכון?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לחברת סטארט-אפ יתכנו כמה מנהלים."
    },
    {
     "id": "b",
     "type": "text",
     "value": "כל עובד חייב לעבוד בחברת סטארט-אפ אחת לפחות."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מנכ\"ל הוא מנהל של לפחות חברת סטארט-אפ אחת."
    },
    {
     "id": "d",
     "type": "text",
     "value": "כל עובד יכול לעבוד בכמה חברות סטארט-אפ."
    }
   ],
   "correctId": "c",
   "confidence": "high",
   "explanation": "לפי קשר \"מנהל\" והקרדינליות, מנכ\"ל הוא מנהל של לפחות חברת סטארט-אפ אחת.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q2",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21B-A-erd",
   "question": "האם יש בתרשים תכונה מרובת ערכים, אם כן, מהי?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לא, אין."
    },
    {
     "id": "b",
     "type": "text",
     "value": "כן, התכונה \"מס עובד\"."
    },
    {
     "id": "c",
     "type": "text",
     "value": "כן, התכונה \"שם\"."
    },
    {
     "id": "d",
     "type": "text",
     "value": "כן, התכונה \"משימה\"."
    }
   ],
   "correctId": "d",
   "confidence": "high",
   "explanation": "\"משימה\" מצוירת כאליפסה כפולה — תכונה מרובת-ערכים. (\"שם\" מורכבת, לא מרובת-ערכים.)",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q3",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21B-A-q4erd",
   "question": "שינו את התרשים באופן הבא (ראו למעלה — הקשר \"עובד ב\" מחובר כעת בקו כפול לשתי הישויות). מה מהבאים נכון בעקבות השינוי?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "עובד יכול לעבוד בחברה אחת לכל היותר."
    },
    {
     "id": "b",
     "type": "text",
     "value": "עובד חייב לעבוד בחברת סטארט-אפ אחת לכל הפחות."
    },
    {
     "id": "c",
     "type": "text",
     "value": "חברת סטארט-אפ יכולה להכיל 0 עובדים."
    },
    {
     "id": "d",
     "type": "text",
     "value": "חברת סטארט-אפ יכולה להכיל מקסימום עובד אחד."
    }
   ],
   "correctId": "b",
   "confidence": "high",
   "explanation": "הקו הכפול מציין השתתפות מלאה (טוטאלית) — כל עובד חייב להשתתף בקשר \"עובד ב\", כלומר לעבוד בחברת סטארט-אפ אחת לכל הפחות.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q4",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21B-C-erd",
   "question": "איזו המרה של הקשר \"מנהל\" היא הנכונה? שים לב למפתחות.",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "מנהל([u]מנהל[/u], חברת סטארט אפ, מנכ\"ל)"
    },
    {
     "id": "b",
     "type": "schema",
     "value": "מנהל([u]שם חברה[/u], מניות)"
    },
    {
     "id": "c",
     "type": "schema",
     "value": "מנהל([u]שם חברה[/u], מס' עובד)"
    },
    {
     "id": "d",
     "type": "text",
     "value": "אף אחת מהאפשרויות לא נכונה"
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "הקשר \"מנהל\" הוא בין מנכ\"ל (זוהה במס' עובד) לבין חברת סטארט-אפ (זוהתה בשם חברה); ההמרה כוללת את שני המפתחות: מנהל(שם חברה, מס' עובד). (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q1",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21B-C-erd",
   "question": "איזה מההיגדים הבאים נכון?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לכל עובד בחברה יש שכר ומניות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "לכל עובד נשמר הותק שלו בחברה."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מנכ\"ל יכול לנהל חברת סטארט-אפ אחת בלבד."
    },
    {
     "id": "d",
     "type": "text",
     "value": "לכל חברת סטארט-אפ יש מנכ\"ל אחד לפחות."
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "\"מניות\" ו\"ותק\" הן תכונות של תת-ישויות מסוימות בלבד (מנכ\"ל / מתכנת), ולכן A ו-B שגויים. עקב השתתפות מלאה של החברה בקשר \"מנהל\", לכל חברת סטארט-אפ יש מנכ\"ל אחד לפחות → D. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q2",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21B-C-erd",
   "question": "כמה קשרים חזקים יש בתרשים?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "3"
    },
    {
     "id": "b",
     "type": "text",
     "value": "2"
    },
    {
     "id": "c",
     "type": "text",
     "value": "1"
    },
    {
     "id": "d",
     "type": "text",
     "value": "0"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "בתרשים שני קשרים (\"עובד ב\" ו\"מנהל\"); היררכיית ה-Is A אינה קשר. אין ישויות חלשות, ולכן 2 קשרים חזקים. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q3",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21B-C-erd",
   "question": "רוצים להוסיף לבסיס הנתונים את האפשרות של מנכ\"ל שמנהל חברה מסוימת לקבל חונך שהוא מנכ\"ל מנוסה, שיעזור לו בניהול. מי מהדיאגרמות הבאות היא הנכונה ביותר?",
   "options": [
    {
     "id": "a",
     "type": "image",
     "value": "images/exams/21B-C-q4a.png"
    },
    {
     "id": "b",
     "type": "image",
     "value": "images/exams/21B-C-q4b.png"
    },
    {
     "id": "c",
     "type": "image",
     "value": "images/exams/21B-C-q4c.png"
    },
    {
     "id": "d",
     "type": "image",
     "value": "images/exams/21B-C-q4d.png"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "הקשר \"חונך\" הוא בין שני מנכ\"לים (מנכ\"ל חונך מנכ\"ל מנוסה אחר) ולכן זהו קשר רקורסיבי על ישות אחת (מנכ\"ל) — דיאגרמה A. B מציגה קשר לא-רקורסיבי בין מנכ\"ל לחברה (החונך אינו מנכ\"ל), D מציגה את \"חונך\" כתכונה. חלופה אפשרית: C (רקורסיבי + חברת הסטארט-אפ) אם רוצים לקשור את החונכות לחברה מסוימת. הסטודנט סימן B ו-C. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q4",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21S-B-erd",
   "question": "מי מהטענות הבאות נכונה ביותר?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "תכונה מחושבת לא תקבל ביטוי כאשר נמיר את ה-erd לטבלאות ולכן התכונה \"עלות כולל מס רכישה\" לא תופיע בטבלאות לאחר שנמיר את ה-erd לטבלאות"
    },
    {
     "id": "b",
     "type": "text",
     "value": "תכונה מרובת ערכים לא תקבל ביטוי כאשר נמיר את ה-erd לטבלאות ולכן התכונה \"חניות\" לא תופיע בטבלאות לאחר שנמיר את ה-erd לטבלאות"
    },
    {
     "id": "c",
     "type": "text",
     "value": "תכונה מורכבת לא תקבל ביטוי כאשר נמיר את ה-erd לטבלאות ולכן התכונה \"שם\" לא תופיע בטבלאות לאחר שנמיר את ה-erd לטבלאות"
    },
    {
     "id": "d",
     "type": "text",
     "value": "תכונה מחושבת לא תקבל ביטוי כאשר נמיר את ה-erd לטבלאות ולכן התכונה \"גודל גינה\" לא תופיע בטבלאות לאחר שנמיר את ה-erd לטבלאות."
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "תכונה מחושבת (נגזרת) אינה מיוצגת בטבלאות בהמרה. \"עלות כולל מס רכישה\" מצוירת כאליפסה מקווקוות (תכונה מחושבת) ולכן לא תופיע.",
   "id": "21S-B-Q1",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21S-B-erd",
   "question": "ביחס ה-isa ב-erd מתקיים:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "כל בית יכול להיות רק בית פרטי או דירת גן או דירה בבניין קומות כי מדובר ביחס הכללה"
    },
    {
     "id": "b",
     "type": "text",
     "value": "כל בית יכול להיות בית פרטי או דירת גן או דירה בבניין קומות או כל סוג נוסף של בית שנרצה להוסיף כי מדובר ביחס הפרדה"
    },
    {
     "id": "c",
     "type": "text",
     "value": "כל בית יכול להיות רק בית פרטי או דירת גן או דירה בבניין קומות כי מדובר ביחס הפרדה."
    },
    {
     "id": "d",
     "type": "text",
     "value": "כל בית יכול להיות בית פרטי או דירת גן או דירה בבניין קומות או כל סוג נוסף של בית שנרצה להוסיף כי מדובר ביחס הכללה."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "יחס ה-IsA כאן הוא יחס הפרדה (specialization) — בית יכול להיות אחד מהתת-סוגים, וניתן להוסיף סוגי בית נוספים.",
   "id": "21S-B-Q2",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21S-B-erd",
   "question": "מי מהטענות נכונה ביותר?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לא כל לקוח חייב לרכוש בית."
    },
    {
     "id": "b",
     "type": "text",
     "value": "לקוח חייב לרכוש רק בית אחד"
    },
    {
     "id": "c",
     "type": "text",
     "value": "כל לקוח חייב לרכוש לפחות בית אחד כי יש קו עבה בין רוכש ללקוח בנוסף הוא יכול במקסימום לרכוש כמה בתים שירצה."
    },
    {
     "id": "d",
     "type": "text",
     "value": "כל בית חייב להירכש."
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "הקו העבה בין \"רוכש\" ל\"לקוח\" מציין השתתפות מלאה (כל לקוח רוכש לפחות בית אחד) ללא הגבלה עליונה על מספר הבתים.",
   "id": "21S-B-Q3",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21S-B-erd",
   "question": "מי מהטענות הבאות הנכונה ביותר?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "בית יכול להיות מושכר על ידי 2 לקוחות"
    },
    {
     "id": "b",
     "type": "text",
     "value": "כל בית יכול להיות מושכר על ידי כמה לקוחות"
    },
    {
     "id": "c",
     "type": "text",
     "value": "כל בית חייב להיות מושכר כי יש קו עבה בין לקוח לשוכר"
    },
    {
     "id": "d",
     "type": "text",
     "value": "יכולים להיות בתים שלא הושכרו."
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "השתתפות הבית בקשר \"שוכר\" היא חלקית (אין קו עבה בצד הבית), ולכן ייתכנו בתים שלא הושכרו.",
   "id": "21S-B-Q4",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21S-B-erd",
   "question": "מהי ההמרה לטבלאות הנכונה ביותר?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "5 טבלאות (בית, קבלן, לקוח, מקומות עבודה, חניות)."
    },
    {
     "id": "b",
     "type": "text",
     "value": "6 טבלאות (בית, קבלן, לקוח, מקומות עבודה, שוכר, בונה)."
    },
    {
     "id": "c",
     "type": "text",
     "value": "7 טבלאות (בית, קבלן, לקוח, שוכר, בונה, עלות כולל מס רכישה, מקומות עבודה)."
    },
    {
     "id": "d",
     "type": "text",
     "value": "8 טבלאות (בית, קבלן, לקוח, שוכר, בונה, עלות כולל מס רכישה, מקומות עבודה, רוכש)."
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "3 ישויות (בית/קבלן/לקוח) + 2 טבלאות לתכונות מרובות-הערכים (מקומות עבודה, חניות). הקשרים הפונקציונליים \"שוכר\"/\"בונה\" מתמזגים לתוך הישויות, והתכונה המחושבת אינה נשמרת → 5 טבלאות.",
   "id": "21S-B-Q5",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "21S-B-erd",
   "question": "אם היינו רוצים לבצע שינוי ב-erd כך שכל בית ייבנה בהכרח על ידי זוג קבלנים בדיוק, מה השינוי היינו צריכים לבצע?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "להשאיר את הקו העבה בין \"קבלן\" ל\"בונה\" ובנוסף להוריד את החץ שפונה ל\"קבלן\" כמו כן היה צריך להוסיף בצד ה\"קבלן\" סוגרים המציינים (1,2)"
    },
    {
     "id": "b",
     "type": "text",
     "value": "להשאיר את הקו העבה בין \"קבלן\" ל\"בונה\" ובנוסף להוריד את החץ שפונה ל\"קבלן\" כמו כן היה צריך להוסיף בצד ה\"קבלן\" סוגרים המציינים (2,2)"
    },
    {
     "id": "c",
     "type": "text",
     "value": "להשאיר את הקו העבה בין \"קבלן\" ל\"בונה\" כמו כן היה צריך להוסיף בצד ה\"קבלן\" סוגרים המציינים (2,2)"
    },
    {
     "id": "d",
     "type": "text",
     "value": "אין צורך בשינוי כבר בצורה הנוכחית ה-erd מבטא זאת."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "כדי לחייב בדיוק שני קבלנים לכל בית יש להסיר את החץ (הפונקציונליות אל \"קבלן\") ולציין קרדינליות (2,2) בצד הקבלן.",
   "id": "21S-B-Q6",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "22B-A-erd",
   "question": "איזו המרה של סטודנט לתואר ראשון היא הנכונה?",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "סטודנט לתואר ראשון([u]תז[/u], תאריך_תחילת_לימודים, ממוצע, משך_תואר, פרויקט, תזה)"
    },
    {
     "id": "b",
     "type": "schema",
     "value": "סטודנט לתואר ראשון([u]תז[/u], יום, חודש, שנה, ממוצע, משך_תואר, פרויקט)"
    },
    {
     "id": "c",
     "type": "schema",
     "value": "סטודנט לתואר ראשון([u]תז[/u], יום, חודש, שנה, ממוצע, משך_תואר)  פרויקטים([u]תז[/u], פרויקט)"
    },
    {
     "id": "d",
     "type": "schema",
     "value": "סטודנט לתואר ראשון([u]תז[/u], תאריך תחילת_לימודים, ממוצע, משך_תואר)  פרויקטים([u]תז[/u], פרויקט)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "\"תאריך תחילת לימודים\" הוא תכונה מורכבת ולכן מתפצל ל-יום/חודש/שנה, ו\"פרויקט\" הוא תכונה מרובת-ערכים ולכן עובר ליחס נפרד פרויקטים(תז, פרויקט).",
   "id": "22B-A-Q1",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "22B-A-erd",
   "question": "איזה מההיגדים הבאים נכון?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מכללה מעסיקה מרצה אחד לפחות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "כל מרצה מלמד בכיתה אחת לכל היותר."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מכללה חייבת להכיל סטודנט אחד לפחות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "סטודנט חייב ללמוד במכללה אחת לכל היותר."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה."
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "השתתפות הסטודנט בקשר \"לומד ב\" היא חלקית והקרדינליות מגבילה אותו למכללה אחת לכל היותר.",
   "id": "22B-A-Q2",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "22B-A-erd",
   "question": "האם יש בתרשים תכונה / תכונות מרובת ערכים?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "כן, \"פרויקט\" ו\"מקצוע לימוד\"."
    },
    {
     "id": "b",
     "type": "text",
     "value": "כן, \"תאריך תחילת לימודים\"."
    },
    {
     "id": "c",
     "type": "text",
     "value": "כן, סטודנט."
    },
    {
     "id": "d",
     "type": "text",
     "value": "אף תשובה אינה נכונה."
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "\"פרויקט\" ו\"מקצוע לימוד\" מצוירים כאליפסה כפולה — תכונות מרובות-ערכים. (\"תאריך תחילת לימודים\" היא מורכבת, לא מרובת-ערכים.)",
   "id": "22B-A-Q3",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "23B-A-erd",
   "question": "איזו המרה של מדריכת גלישה היא הנכונה ומכילה את כל התכונות שלה?",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "מדריכת_גלישה ([u]סגנון גלישה[/u])."
    },
    {
     "id": "b",
     "type": "schema",
     "value": "סגנון מדריכה (סגנון גלישה, [u]מספר זהות[/u])."
    },
    {
     "id": "c",
     "type": "schema",
     "value": "מדריכת_גלישה ([u]מספר זהות[/u], עובד מתאריך, שכר, שם מלא)."
    },
    {
     "id": "d",
     "type": "text",
     "value": "B + C"
    },
    {
     "id": "e",
     "type": "text",
     "value": "A + C"
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "‏'סגנון גלישה' היא תכונה מרובת-ערכים של תת-הישות מדריכת גלישה. C מכיל את כל התכונות הנובעות דרך ה-ISA (`מספר זהות`, `עובד מתאריך`, `שכר`, `שם מלא`), ו-B מייצג את התכונה מרובת-הערכים כטבלה נפרדת. לכן נדרשים גם B וגם C.",
   "confidence": "high",
   "id": "23B-A-Q1",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "23B-A-erd",
   "question": "איזה מההיגדים הבאים נכון?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מפעיל רכבל מפעיל מספר מסלולים בו זמנית."
    },
    {
     "id": "b",
     "type": "text",
     "value": "בחנות ניתן למכור מוצר אחד בלבד."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מוצר יכול להימכר בחנות, אבל לא חייב."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מוכר עובד בחנות אחת בלבד."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "בתרשים, הקשר 'מוכר ב' מכיל חץ המכוון אל 'חנות' — כלומר לכל מוכר משויכת חנות אחת ויחידה. שאר ההיגדים אינם נובעים מהתרשים.",
   "confidence": "high",
   "id": "23B-A-Q2",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "23B-A-erd",
   "question": "האם יש בתרשים שגיאת סינטקס?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "כן, יש שני עיגולים כפולים (רמת קושי, סגנון גלישה), ורק אחד תקין."
    },
    {
     "id": "b",
     "type": "text",
     "value": "כן, יש שני מיקומים של קווים עבים (מיקום מסלול גלישה, מוצר נמכר ב), ורק אחד תקין."
    },
    {
     "id": "c",
     "type": "text",
     "value": "כן, יש תכונות שמחוברות לתכונה (מיקום מפעיל רכבל), וזה לא תקין."
    },
    {
     "id": "d",
     "type": "text",
     "value": "כן, למשולש IS A מחוברים שלושה ריבועים למטה, ומותר רק שניים."
    },
    {
     "id": "e",
     "type": "text",
     "value": "הדיאגרמה תקינה לחלוטין."
    }
   ],
   "correctId": "b",
   "answerSource": "solution-pdf",
   "explanation": "על-פי המחוון התשובה היא B: בתרשים שני מקומות עם קווים עבים (ב'מיקום מסלול גלישה' וב'מוצר נמכר ב'), ורק אחד מהם שימוש תקין — ולכן קיימת שגיאת סינטקס.",
   "confidence": "high",
   "id": "23B-A-Q3",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "id": "23B-A2-Q1",
   "examCode": "23B-A2",
   "part": "א",
   "topic": "erd",
   "topicLabel": "מודל ERD",
   "question": "איזה מההיגדים הבאים נכון?",
   "contextId": "23B-A2-erd",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "במדינה מסוימת יכולים להיוולד מספר שחקנים."
    },
    {
     "id": "b",
     "type": "text",
     "value": "שחקן יכול לשחק בכמה הצגות שהוא רואה לנכון."
    },
    {
     "id": "c",
     "type": "text",
     "value": "חברת הפקות יכולה להפיק מופע אחד בלבד."
    },
    {
     "id": "d",
     "type": "text",
     "value": "פרס חייב להינתן (זוכה בו) למופע אחד לפחות."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "בקשר `נולד/ה ב` יש חץ מ-`שחקן/ית` אל `מדינה`, כלומר כל שחקן נולד במדינה אחת — ולכן במדינה מסוימת יכולים להיוולד מספר שחקנים. שאר ההיגדים אינם נובעים מהתרשים.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q2",
   "examCode": "23B-A2",
   "part": "א",
   "topic": "erd",
   "topicLabel": "מודל ERD",
   "question": "איזה מההיגדים הבאים נכון?",
   "contextId": "23B-A2-erd",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "שחקן יכול לזכות בהמון פרסים."
    },
    {
     "id": "b",
     "type": "text",
     "value": "בפרס מסוים חייב שיהיה לפחות זוכה אחד."
    },
    {
     "id": "c",
     "type": "text",
     "value": "במופע מסוים יכול לשחק שחקן יחיד בלבד."
    },
    {
     "id": "d",
     "type": "text",
     "value": "שחקן חייב לזכות בפרס אחד לפחות."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "לישות `פרס` יש השתתפות מלאה (קו כפול) בקשר `זוכה ב`, ולכן כל פרס חייב שיהיה לו לפחות זוכה אחד. אין חובת השתתפות מלאה על השחקן.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q3",
   "examCode": "23B-A2",
   "part": "א",
   "topic": "erd",
   "topicLabel": "מודל ERD",
   "question": "איזה מההיגדים הבאים נכון?",
   "contextId": "23B-A2-erd",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "בדיאגרמה יש תכונה מרובת ערכים."
    },
    {
     "id": "b",
     "type": "text",
     "value": "בכל המרה לטבלאות חייבת להיות טבלה עבור הישות פרס."
    },
    {
     "id": "c",
     "type": "text",
     "value": "בדיאגרמה יש טעות סינטקס."
    },
    {
     "id": "d",
     "type": "text",
     "value": "בדיאגרמה יש מקום בו ניתן להחליף תכונה(ות) בתכונה מורכבת."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה."
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "אפשר לאחד תכונות פשוטות לתכונה מורכבת — למשל `שם פרטי` ו-`שם משפחה` של שחקן/ית לתכונה מורכבת `שם`. אין בתרשים תכונה מרובת-ערכים ואין טעות תחביר.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "24B-A-erd",
   "question": "מתוך דיאגרמת ER \"ניהול שאלות\" אשר מופיעה כנספח לבחינה: איזה מבין הקשרים הבאים יהפוך בהכרח לסכמה (טבלה)?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מקור השאלה"
    },
    {
     "id": "b",
     "type": "text",
     "value": "נושא אב"
    },
    {
     "id": "c",
     "type": "text",
     "value": "מקור אב"
    },
    {
     "id": "d",
     "type": "text",
     "value": "מחבר"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "קשר מסוג רבים-לרבים (\"מקור השאלה\") חייב להפוך ליחס/טבלה נפרד.",
   "id": "24B-A-Q1",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "24B-A-erd",
   "question": "מתוך דיאגרמת ER \"ניהול שאלות\": מאלו שדות המפתח של טיפוס ישויות \"כניסות\" יורכב?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מזהה כניסה, מזהה משתמש"
    },
    {
     "id": "b",
     "type": "text",
     "value": "מזהה כניסה"
    },
    {
     "id": "c",
     "type": "text",
     "value": "מזהה משתמש"
    },
    {
     "id": "d",
     "type": "text",
     "value": "מזהה כניסה, כתובת IP, זמן התחברות"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "b"
   ],
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "\"כניסות\" הוא טיפוס ישויות חלש התלוי ב\"משתמש\", ולכן מפתחו כולל את המפתח החלקי שלו יחד עם מפתח הישות השולטת. התקבלו א וגם ב.",
   "id": "24B-A-Q2",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "24B-A-erd",
   "question": "מתוך דיאגרמת ER \"ניהול שאלות\": מה יהיה מספר השדות של סכמת \"נושא\"?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "2"
    },
    {
     "id": "b",
     "type": "text",
     "value": "1"
    },
    {
     "id": "c",
     "type": "text",
     "value": "3"
    },
    {
     "id": "d",
     "type": "text",
     "value": "4"
    },
    {
     "id": "e",
     "type": "text",
     "value": "5"
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "b"
   ],
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "לפי הקשר הרקורסיבי \"נושא אב\", סכמת \"נושא\" כוללת את שם הנושא ואת ה-FK לנושא האב. התקבלו א וגם ב.",
   "id": "24B-A-Q3",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "24B-A-erd",
   "question": "מתוך דיאגרמת ER \"ניהול שאלות\": מה יהיה מספר השדות בסכמת \"מקור השאלה\"?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "4"
    },
    {
     "id": "b",
     "type": "text",
     "value": "3"
    },
    {
     "id": "c",
     "type": "text",
     "value": "2"
    },
    {
     "id": "d",
     "type": "text",
     "value": "1"
    },
    {
     "id": "e",
     "type": "text",
     "value": "\"מקור השאלה\" לא יהיה סכמה"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "קשר \"מקור השאלה\" (רבים-לרבים) הופך לטבלה עם שני מפתחות זרים ושתי תכונות הקשר (מספר שאלה במקור, נקודות במקור).",
   "id": "24B-A-Q4",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "24B-A-erd",
   "question": "שאלה בנושא אפיון ERD: איזו טענה מבין הבאות היא נכונה?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "כל טיפוס ישויות חלש הוא נשלט"
    },
    {
     "id": "b",
     "type": "text",
     "value": "כל טיפוס ישויות נשלט הוא חלש"
    },
    {
     "id": "c",
     "type": "text",
     "value": "טיפוס ישויות יכול להיות גם חזק וגם חלש בו זמנית"
    },
    {
     "id": "d",
     "type": "text",
     "value": "טיפוס ישויות לא יכול להיות חלש ונשלט בו זמנית"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "b"
   ],
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "ישות חלשה תלויה לזיהוי בישות אחרת ולכן היא נשלטת. התקבלו א וגם ב.",
   "id": "24B-A-Q5",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "מודל ERD"
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "25B-A-erd",
   "question": "בהתבסס על הדיאגרמה, היכן יש למקם את התכונה \"ציון\"?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "בישות סטודנט, מכיוון שהציון שייך לסטודנט."
    },
    {
     "id": "b",
     "type": "text",
     "value": "בישות קורס, מכיוון שהציון ניתן בקורס ספציפי."
    },
    {
     "id": "c",
     "type": "text",
     "value": "על הקשר \"רישום\", מכיוון שהציון מתאר את הקשר הספציפי בין סטודנט לקורס."
    },
    {
     "id": "d",
     "type": "text",
     "value": "בישות מרצה, מכיוון שהמרצה הוא זה שנותן את הציון."
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "התכונה 'ציון' מתארת את היחס בין סטודנט מסוים לקורס מסוים (הציון שקיבל הסטודנט באותו קורס), ולכן מקומה על הקשר 'רישום' (קשר רבים-לרבים) ולא על אחת הישויות.",
   "confidence": "high",
   "id": "25B-A-Q1",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "25B-A-erd",
   "question": "סטודנט רוצה לדעת מי המרצה בקורס שהוא נרשם אליו. האם ניתן לדעת זאת באופן חד משמעי?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לא ניתן לדעת, כי אין קשר ישיר בין מרצה לסטודנט."
    },
    {
     "id": "b",
     "type": "text",
     "value": "כן ניתן לדעת, כי סטודנט, קורס ומרצה מחוברים בקשר טרינארי."
    },
    {
     "id": "c",
     "type": "text",
     "value": "כן ניתן לדעת, כי לכל קורס מרצה אחד בלבד."
    },
    {
     "id": "d",
     "type": "text",
     "value": "לא ניתן לדעת, כי סטודנט יכול להירשם רק לקורס אחד אצל אותו המרצה."
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "לפי הדיאגרמה לכל קורס מרצה אחד המלמד אותו, ולכן דרך הקשר 'רישום' של הסטודנט לקורס ניתן לדעת באופן חד-משמעי מיהו המרצה של אותו קורס.",
   "confidence": "high",
   "id": "25B-A-Q2",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "25B-A-erd",
   "question": "בהתבסס על הדיאגרמה, האם ייתכן מצב בו מרצה מלמד קורס שאינו ניתן במחלקה בה המרצה עובד? (בהנחה שלמרצה יש שיוך למחלקה, שאינו מופיע בדיאגרמה)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "כן, הדיאגרמה אינה מגדירה מגבלה כזו. הקשרים מלמד ו-לתת אינם תלויים זה בזה."
    },
    {
     "id": "b",
     "type": "text",
     "value": "לא, מכיוון שקורס ניתן במחלקה, המרצה חייב להיות מאותה המחלקה."
    },
    {
     "id": "c",
     "type": "text",
     "value": "לא, הקשר מלמד הוא תת-סוג של הקשר לתת."
    },
    {
     "id": "d",
     "type": "text",
     "value": "הדיאגרמה שגויה מכיוון שהיא אינה מגדירה את הקשר בין מרצה למחלקה."
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "הדיאגרמה אינה כופה שהמחלקה שנותנת את הקורס (הקשר 'לתת') תהיה זהה למחלקה שאליה משויך המרצה שמלמד אותו (הקשר 'מלמד'); שני הקשרים בלתי-תלויים, ולכן ייתכן מרצה שמלמד קורס ממחלקה אחרת.",
   "confidence": "high",
   "id": "25B-A-Q3",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "25B-A-erd",
   "question": "על פי המודל, מה נכון לגבי הקשר בין קורס ל-מחלקה?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "אותו הקורס ניתן במספר מחלקות במקביל."
    },
    {
     "id": "b",
     "type": "text",
     "value": "למחלקה יכול להיות רק קורס אחד שהיא נותנת."
    },
    {
     "id": "c",
     "type": "text",
     "value": "כל קורס חייב להינתן בלא יותר ממחלקה אחת."
    },
    {
     "id": "d",
     "type": "text",
     "value": "הקשר בין קורס למחלקה הוא קשר מסוג רבים-לרבים."
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "החץ בקשר 'לתת' שבין קורס למחלקה מציין שכל קורס משויך למחלקה אחת לכל היותר (רבים-לאחד), ולכן קורס חייב להינתן בלא יותר ממחלקה אחת.",
   "confidence": "high",
   "id": "25B-A-Q4",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "question": "לפי דיאגרמת ה-ERD הנתונה, מתקיים כי:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "בטבלה של C2 יש 2 שדות המהווים מפתח."
    },
    {
     "id": "b",
     "type": "text",
     "value": "בטבלה של E יש 3 שדות המהווים מפתח."
    },
    {
     "id": "c",
     "type": "text",
     "value": "אין שתי רשומות שונות בטבלה של R2 עם אותו ערך שדה `KeyA`."
    },
    {
     "id": "d",
     "type": "text",
     "value": "לטבלה של R2 יש 3 שדות המהווים מפתח."
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "R2 מקשר את `C` עם קבוצת-העל (ההקבצה) `A-R1-B`. מפתח הטבלה שלו מורכב מהמפתח של C ומהמפתח של ההקבצה (`KeyA`, `KeyB`) — יחד 3 שדות מפתח.",
   "confidence": "high",
   "contextId": "25C-A-erd",
   "id": "25C-A-Q1",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "question": "מה נדרש לשנות בדיאגרמה, על מנת שבטבלה המתארת את הקשר R2 לא תהיינה שתי רשומות שונות בעלות אותם ערכים עבור השדות `KeyA` ו-`KeyB` בהתאמה?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "יש להוסיף חץ המכוון מ-R2 ל-`C` וחץ נוסף המכוון מ-R2 לקבוצת ישויות-על (הקבצה) `A-R1-B`."
    },
    {
     "id": "b",
     "type": "text",
     "value": "יש להוסיף חץ המכוון מ-R2 ל-`C`."
    },
    {
     "id": "c",
     "type": "text",
     "value": "יש להוסיף חץ המכוון מ-R2 לקבוצת ישויות-על (הקבצה) `A-R1-B`."
    },
    {
     "id": "d",
     "type": "text",
     "value": "יש להוסיף חץ המכוון מ-R1 ל-`B` וחץ נוסף המכוון מ-R1 ל-`A`."
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "b",
   "answerSource": "solution-pdf",
   "explanation": "כדי שצירוף (`KeyA`, `KeyB`) לא יחזור בשתי רשומות שונות, צריך שכל מופע של קבוצת-העל `A-R1-B` יתחבר ל-C יחיד — כלומר חץ מכוון מ-R2 אל `C`.",
   "confidence": "high",
   "contextId": "25C-A-erd",
   "id": "25C-A-Q2",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "question": "מה הסכמה של ההמרה הנכונה ביותר של קבוצת/טיפוס קשרים R3?",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "([u]KeyC[/u], [u]KeyD[/u], PropC1_1, PropD_1)"
    },
    {
     "id": "b",
     "type": "schema",
     "value": "([u]KeyC[/u], [u]KeyD[/u])"
    },
    {
     "id": "c",
     "type": "schema",
     "value": "([u]KeyC[/u], PropC1_1, [u]KeyD[/u])"
    },
    {
     "id": "d",
     "type": "schema",
     "value": "([u]KeyD[/u], PropC1_1, PropD_1)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "המרת טיפוס הקשרים R3 יוצרת טבלה שמפתחהּ מורכב מהמפתחות של הישויות המשתתפות (`KeyC`, `KeyD`), בתוספת תכונת הקשר `PropC1_1`.",
   "confidence": "high",
   "contextId": "25C-A-erd",
   "id": "25C-A-Q3",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "question": "המר את קבוצת/טיפוס ישויות E לטבלה — מה יתקבל?",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "E ([d]DiscE_1[/d], PropE_1, [u]KeyC[/u])"
    },
    {
     "id": "b",
     "type": "schema",
     "value": "E ([d]DiscE_1[/d], PropE_1, PropC2_1)"
    },
    {
     "id": "c",
     "type": "schema",
     "value": "E ([d]DiscE_1[/d], PropE_1, [u]KeyC[/u], PropC_1, PropC2_1)"
    },
    {
     "id": "d",
     "type": "schema",
     "value": "E ([d]DiscE_1[/d], PropE_1)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "E היא ישות חלשה: המפתח המלא מורכב מהמבחין (`DiscE_1`, קו מקווקו) יחד עם מפתח הבעלים המזהה (`KeyC`). בנוסף נשמרת תכונת E עצמה `PropE_1`.",
   "confidence": "high",
   "contextId": "25C-A-erd",
   "id": "25C-A-Q4",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "25S-B-erd",
   "question": "לפי דיאגרמת ה-ERD הנתונה, מתקיים כי:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "בטבלה של מרצה יש 2 שדות המהווים מפתח."
    },
    {
     "id": "b",
     "type": "text",
     "value": "בטבלה של סטודנט לתואר ראשון יש מפתח הכולל ת\"ז ותואר."
    },
    {
     "id": "c",
     "type": "text",
     "value": "בטבלה של מרצה ייתכנו שתי רשומות עם אותו מזהה מרצה אם הן קשורות למכללות שונות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "בטבלה של כיתה יש מפתח הכולל את קוד הכיתה וקוד המכללה."
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "e",
   "explanation": "מפתח המרצה הוא `שם` בלבד (שדה יחיד); המפתח של סטודנט לתואר ראשון הוא `ת\"ז` שיורש מהאב בלבד; `כיתה` היא ישות חזקה שמפתחה `מס' כיתה` בלבד. לכן אף אחת מ-A–D אינה נכונה — התשובה E.",
   "confidence": "high",
   "id": "25S-B-Q1",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "25S-B-erd",
   "question": "לפי דיאגרמת ה-ERD הנתונה, מתקיים כי:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "בטבלה של **מלמד ב** יש שני שדות המהווים מפתח."
    },
    {
     "id": "b",
     "type": "text",
     "value": "בטבלה של **מרצה** יש שלושה שדות המהווים מפתח."
    },
    {
     "id": "c",
     "type": "text",
     "value": "אין שתי רשומות שונות בטבלה של **מלמד ב** עם אותם ערכים של שדות תז_מרצה ו-קוד_כיתה."
    },
    {
     "id": "d",
     "type": "text",
     "value": "לטבלה של **סטודנט** יש שלושה שדות המהווים מפתח."
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "e"
   ],
   "explanation": "לפי טבלת התשובות הרשמית התקבלו כאן **שתי תשובות** — A וגם E. (A מתייחסת למספר שדות המפתח בטבלת הקשר `מלמד ב`.)",
   "confidence": "high",
   "id": "25S-B-Q2",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "25S-B-erd",
   "question": "איזו המרה של סטודנט לתואר ראשון היא אפשרית?",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "סטודנט_לתואר_ראשון([u]תז[/u], תאריך_תחילת_לימודים, ממוצע, משך_תואר, פרויקט, תזה)"
    },
    {
     "id": "b",
     "type": "schema",
     "value": "סטודנט_לתואר_ראשון([u]תז[/u], יום, חודש, שנה, ממוצע, משך_תואר, פרויקט)"
    },
    {
     "id": "c",
     "type": "schema",
     "value": "סטודנט_לתואר_ראשון([u]תז[/u], יום, חודש, שנה, ממוצע, משך_תואר)   פרויקטים([u]תז[/u], פרויקט)"
    },
    {
     "id": "d",
     "type": "schema",
     "value": "סטודנט_לתואר_ראשון([u]תז[/u], תאריך_תחילת_לימודים, משך_תואר)   פרויקטים([u]תז[/u], פרויקט)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "c",
   "acceptedIds": [
    "c",
    "e"
   ],
   "explanation": "התכונה הרב-ערכית `פרויקט` נדרשת לטבלה נפרדת `פרויקטים(תז, פרויקט)`, והתאריך המורכב מתפרק ל-יום/חודש/שנה. לפי הטבלה הרשמית התקבלו C וגם E.",
   "confidence": "high",
   "id": "25S-B-Q3",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "25S-B-erd",
   "question": "בהמרת טיפוס הישות סטודנט לתואר שני (עם תזה) (תת-סוג ב-ISA) לטבלה, יתקבל:",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "([u]תז[/u], תזה, שנה, חודש, יום)"
    },
    {
     "id": "b",
     "type": "schema",
     "value": "([u]תז[/u], תאריך_תחילת_לימודים, תזה)"
    },
    {
     "id": "c",
     "type": "schema",
     "value": "([u]תז[/u], סטודנט_לתואר_שני, תזה)"
    },
    {
     "id": "d",
     "type": "schema",
     "value": "([u]תז[/u], תזה)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "d",
   "explanation": "המרת תת-הסוג ב-ISA יוצרת טבלה עם המפתח היורש `תז` ותכונת התת-סוג עצמו `תזה` בלבד — כלומר (תז, תזה).",
   "confidence": "high",
   "id": "25S-B-Q4",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21B-A-fd",
   "question": "מי מהבאים הוא מפתח קביל ב-R ביחס ל-F הנתון?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "{A}"
    },
    {
     "id": "b",
     "type": "text",
     "value": "{B}"
    },
    {
     "id": "c",
     "type": "text",
     "value": "{AB}"
    },
    {
     "id": "d",
     "type": "text",
     "value": "{AE}"
    }
   ],
   "correctId": "a",
   "confidence": "high",
   "explanation": "A⁺ = {A,B,E} (מ-A→BE), ואז AE→C נותן C, ו-C→D נותן D → A⁺ = R. לכן {A} מפתח-על מינימלי (קביל). {AB} ו-{AE} מכילים את {A} ולכן אינם מינימליים.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q18",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21B-A-fd",
   "question": "האם ביחס הנתון יש תכונות עודפות בתלות השייכת ל-F?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לא, אין תכונות עודפות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "עודפת B ב-A→BE"
    },
    {
     "id": "c",
     "type": "text",
     "value": "עודפת E ב-A→BE"
    },
    {
     "id": "d",
     "type": "text",
     "value": "עודפת A ב-AE→C"
    },
    {
     "id": "e",
     "type": "text",
     "value": "עודפת E ב-AE→C"
    }
   ],
   "correctId": "e",
   "confidence": "high",
   "explanation": "בתלות AE→C התכונה E עודפת: A⁺ (ביחס ל-F) כבר מכיל את C (A→BE ואז AE→C ואז C→D), כלומר A→C מתקיים, ולכן E מיותרת בצד שמאל.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q19",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21B-A-fd",
   "question": "האם התלות EC→D נמצאת בסגור של F? אם כן, מדוע.",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לא, התלות איננה בסגור של F"
    },
    {
     "id": "b",
     "type": "text",
     "value": "כן, בהיסק נשתמש ברפלקסיביות."
    },
    {
     "id": "c",
     "type": "text",
     "value": "כן, בהיסק נשתמש בפירוק"
    },
    {
     "id": "d",
     "type": "text",
     "value": "כן, בהיסק נשתמש בהכלה."
    },
    {
     "id": "e",
     "type": "text",
     "value": "לא ניתן לענות על השאלה עם הנתונים הקיימים."
    }
   ],
   "correctId": "b",
   "acceptedIds": [
    "b",
    "c",
    "d"
   ],
   "confidence": "high",
   "explanation": "EC→D נמצאת בסגור (נובעת מ-C→D). ניתן להראות זאת במגוון דרכים — התקבלו למלוא הניקוד התשובות B (רפלקסיביות), C (פירוק) ו-D (הכלה), או שילובים שלהן.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q20",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתון ש-E עודפת בתבנית היחסים $$R = (A, B, C, D, E)$$ עם אוסף התלויות $$F = { A → BC, AE → D }$$ מה מהבאים נכון?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "היחס נמצא בצורה נורמלית 3NF."
    },
    {
     "id": "b",
     "type": "text",
     "value": "היחס נמצא בצורה נורמלית BCNF."
    },
    {
     "id": "c",
     "type": "text",
     "value": "היחס מנורמל גם לפי 3NF וגם לפי BCNF."
    },
    {
     "id": "d",
     "type": "text",
     "value": "היחס אינו מנורמל לפי BCNF או 3NF."
    }
   ],
   "correctId": "d",
   "confidence": "high",
   "explanation": "המפתח הקביל הוא AE. התלות A→BC מפרה BCNF (A אינו מפתח-על) וגם מפרה 3NF (BC אינן חלק ממפתח קביל), ולכן היחס אינו מנורמל לא ל-3NF ולא ל-BCNF.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q21",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21B-C-fd",
   "question": "מי מהבאים הוא מפתח-על ביחס R בהינתן F הנתונה?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "{AB}"
    },
    {
     "id": "b",
     "type": "text",
     "value": "{BFE}"
    },
    {
     "id": "c",
     "type": "text",
     "value": "{CF}"
    },
    {
     "id": "d",
     "type": "text",
     "value": "{CFD}"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחד מהאפשרויות"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "‎{BFE}⁺: מ-F→AE מקבלים A,E; מ-BE→C מקבלים C; מ-C→AD מקבלים D. סה\"כ {A,B,C,D,E,F}=R, ולכן {BFE} מפתח-על. שאר האפשרויות אינן מכסות את כל R (למשל אינן כוללות את B) → B. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q20",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21B-C-fd",
   "question": "מי מהתלויות הבאות נמצאות בסגור של F?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "F→A וגם B→C"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "B→C וגם C→D"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "F→A וגם E→C"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "E→C וגם B→C"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "F→A וגם F→E"
    }
   ],
   "correctId": "e",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "מ-`F→AE` נובעות גם `F→A` וגם `F→E`, ולכן שתי התלויות שב-E נמצאות בסגור. בשאר האפשרויות מופיעה תלות שאינה נובעת מ-F (כגון B→C או E→C, הדורשות תכונה נוספת) → E. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q21",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "בהינתן יחס אחר $R = (A, B, C, D)$ והתלויות $F = \\{AB → CD,\\; C → B\\}$, מה מהבאים נכון?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "היחס נמצא בצורה נורמלית 3NF."
    },
    {
     "id": "b",
     "type": "text",
     "value": "היחס נמצא בצורה נורמלית BCNF."
    },
    {
     "id": "c",
     "type": "text",
     "value": "היחס מנורמל גם לפי 3NF וגם לפי BCNF."
    },
    {
     "id": "d",
     "type": "text",
     "value": "היחס אינו מנורמל לפי BCNF או 3NF."
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "המפתחות הקבילים הם AB ו-AC (ולכן A, B, C תכונות מפתח, D תכונה שאינה מפתח). `AB→CD` — AB מפתח-על (תקין). `C→B` מפר BCNF (C אינו מפתח-על), אך B היא תכונת מפתח ולכן התלות מקיימת את תנאי 3NF. מסקנה: היחס ב-3NF אך לא ב-BCNF → A. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q22",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21S-B-fd",
   "question": "מי מהבאים הוא מפתח קביל? סמנו את כל התשובות הנכונות (ייתכן יותר מתשובה אחת).",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "אף אחד"
    },
    {
     "id": "b",
     "type": "text",
     "value": "EI"
    },
    {
     "id": "c",
     "type": "text",
     "value": "EH"
    },
    {
     "id": "d",
     "type": "text",
     "value": "EG"
    },
    {
     "id": "e",
     "type": "text",
     "value": "GH"
    }
   ],
   "correctId": "b",
   "acceptedIds": [
    "b",
    "d"
   ],
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "E חייבת בכל מפתח (אינה בצד ימין). EI⁺ = כל R וגם EG⁺ = כל R, ושניהם מינימליים ← שני מפתחות קבילים: EI ו-EG (שניהם מסומנים בבחינה).",
   "id": "21S-B-Q20",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21S-B-fd",
   "question": "מה הנרמול הנכון לפי BCNF? (ניתן להניח ש-Fu שווה ל-F⁺)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "היחס כבר מנורמל לפי BCNF."
    },
    {
     "id": "b",
     "type": "text",
     "value": "R1(F,E,H), R2(F,G ,I), R3(E,I)."
    },
    {
     "id": "c",
     "type": "text",
     "value": "R4(E,F), R1(G,H), R2(F,G,H,I), R3(E,F,I) ."
    },
    {
     "id": "d",
     "type": "text",
     "value": "R2(F,I,H), R1(F,G,H,I), R3(E,G), R4(E,F)."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "פירוק BCNF תקין המבוסס על התלויות המפרות: R1(F,E,H), R2(F,G,I), R3(E,I).",
   "id": "21S-B-Q21",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21S-B-fd",
   "question": "האם בתלות $EG → HI$ יש תכונה עודפת?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "E עודפת."
    },
    {
     "id": "b",
     "type": "text",
     "value": "G עודפת."
    },
    {
     "id": "c",
     "type": "text",
     "value": "H עודפת."
    },
    {
     "id": "d",
     "type": "text",
     "value": "I עודפת."
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "מכיוון ש-E → FH גורר E → H, נובע ש-EG → H כבר נגזרת, ולכן H עודפת בצד ימין של EG → HI.",
   "id": "21S-B-Q22",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21S-B-fd",
   "question": "האם היחס המנורמל לפי 3NF משמר מידע ותלויות?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "תמיד משמר מידע לא תמיד משמר תלויות"
    },
    {
     "id": "b",
     "type": "text",
     "value": "תמיד משמר מידע ותלויות."
    },
    {
     "id": "c",
     "type": "text",
     "value": "תמיד משמר תלויות לא תמיד משמר מידע"
    },
    {
     "id": "d",
     "type": "text",
     "value": "לא ניתן לדעת."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "אלגוריתם הפירוק ל-3NF (סינתזה) מבטיח גם שמירת מידע (חיבור ללא אובדן) וגם שמירת תלויות.",
   "id": "21S-B-Q23",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21S-B-fd",
   "question": "מה הנרמול הנכון לפי 3NF? (ניתן להניח ש-Fu שווה ל-Fc)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "R1(F,G,H,I), R2(E,G), R3(E,F)."
    },
    {
     "id": "b",
     "type": "text",
     "value": "R1(F,G,H,I), R2(E,G), R3(E,F), R4(F,H,I)."
    },
    {
     "id": "c",
     "type": "text",
     "value": "R1(E,G,H,I), R2(I,F,G), R3(E,F,H)."
    },
    {
     "id": "d",
     "type": "text",
     "value": "היחס כבר מנורמל לפי 3nf."
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "פירוק 3NF תקין מתוך הכיסוי המינימלי: R1(E,G,H,I), R2(I,F,G), R3(E,F,H).",
   "id": "21S-B-Q24",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "21S-B-fd",
   "question": "האם התלות $FI → G$ נמצאת בסגור של F?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לא"
    },
    {
     "id": "b",
     "type": "text",
     "value": "כן-ניתן להוכיח בעזרת רפלקסיביות+טרנזטיביות+פירוק"
    },
    {
     "id": "c",
     "type": "text",
     "value": "כן-ניתן להוכיח בעזרת הכללה+טרנזטיביות"
    },
    {
     "id": "d",
     "type": "text",
     "value": "לא ניתן לדעת."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "מ-I → FG נובע I → G (פירוק); ומרפלקסיביות FI → I, ובטרנזיטיביות FI → G. לכן FI → G נמצאת בסגור.",
   "id": "21S-B-Q25",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "22B-A-fd",
   "question": "מה הסגור של התכונה A?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "{DE}"
    },
    {
     "id": "b",
     "type": "text",
     "value": "{C}"
    },
    {
     "id": "c",
     "type": "text",
     "value": "{CDE}"
    },
    {
     "id": "d",
     "type": "text",
     "value": "R"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות"
    }
   ],
   "correctId": "e",
   "acceptedIds": [
    "c",
    "e"
   ],
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "הסגור של תכונה חייב להכיל את התכונה עצמה: A⁺ = {A,C,D,E}. אף אפשרות אינה מדויקת (ב-{CDE} חסר A), ולכן התשובה E — אך התקבלה גם C.",
   "id": "22B-A-Q15",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "22B-A-fd",
   "question": "מי מבין ה-F הנתונים מקיים  $F^{+}=F1^{+}$ ?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "F = {A→C, B→A}"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "F = {A→DE, B→C}"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "F = {A→DE, B→C, A→B}"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "F = {A→D, A→CE, B→A}"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות"
    }
   ],
   "correctId": "e",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "בכל אחת מהאפשרויות יש תלות שאינה נובעת מ-F1 או שחסרה תלות של F1, ולכן אף אחת אינה שקולה ל-F1.",
   "id": "22B-A-Q16",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "22B-A-fd",
   "question": "האם ב-F1 יש תכונה עודפת? אם כן מהי?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לא, אין תכונה עודפת"
    },
    {
     "id": "b",
     "type": "text",
     "value": "כן, E"
    },
    {
     "id": "c",
     "type": "text",
     "value": "כן, D"
    },
    {
     "id": "d",
     "type": "text",
     "value": "כן, A"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כן, C"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "E עודפת בתלות A→CE, כי A→C ו-C→DE גוררים A→E, וניתן להראות זאת לפי הכללים.",
   "id": "22B-A-Q17",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "22B-A-fd",
   "question": "מי מהבאים אינו מפתח **על** של R בהינתן F1?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "{A}"
    },
    {
     "id": "b",
     "type": "text",
     "value": "{B}"
    },
    {
     "id": "c",
     "type": "text",
     "value": "{AB}"
    },
    {
     "id": "d",
     "type": "text",
     "value": "{ABD}"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "B אינה מופיעה בצד ימין ולכן חלק מכל מפתח, וסגורה הוא כל R. כל מפתח-על חייב להכיל את B, ולכן {A} אינו מפתח-על, וכל השאר כן (הם מכילים את B).",
   "id": "22B-A-Q18",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "23B-A-q17",
   "question": "נתון מסד נתונים חוקי מעל סכמה $R = (P1, P2, P3)$ (ראו המופע למעלה), ותהי F קבוצת התלויות הפונקציונליות מעל R. קבעו האם יתכן ש:\n(1) התלות $P1\\;P3 → P2$ היא תלות ב-F.\n(2) התלות $P2 → P3$ אינה תלות ב-F.",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "(1) יתכן, (2) יתכן"
    },
    {
     "id": "b",
     "type": "text",
     "value": "(1) לא יתכן, (2) לא יתכן"
    },
    {
     "id": "c",
     "type": "text",
     "value": "(1) יתכן, (2) לא יתכן"
    },
    {
     "id": "d",
     "type": "text",
     "value": "(1) לא יתכן, (2) יתכן"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "d",
   "acceptedIds": [
    "d",
    "b"
   ],
   "answerSource": "solution-pdf",
   "explanation": "מופע חוקי חייב לקיים כל תלות ב-F. (1) התלות $P1\\;P3 → P2$ מופרת ע\"י שורות 3 ו-5: `(b,80,T)` ו-`(b,50,T)` — זהות ב-P1,P3 אך שונות ב-P2 — ולכן אינה יכולה להיות ב-F ⇒ 'לא יתכן'. (2) המופע מקיים את $P2 → P3$, כך שנדמה שהיא חייבת להיות ב-F, אך F אינו חייב לכלול כל תלות שהמופע מקיים (ומופעים עתידיים עשויים להפר אותה) ⇒ 'יתכן' שאינה ב-F. לכן D. הערה: על-פי המחוון קיבלו גם את מסיח B.",
   "confidence": "high",
   "id": "23B-A-Q17",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתון יחס $R(A, B, C, D, E, F)$ ותלויות פונקציונליות $F(AB → EF, C → AEF, D → B, E → D)$. קבעו מי מהבאים מפתח קביל:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "{ABC}"
    },
    {
     "id": "b",
     "type": "text",
     "value": "{BC}"
    },
    {
     "id": "c",
     "type": "text",
     "value": "{CD}"
    },
    {
     "id": "d",
     "type": "text",
     "value": "{AB}"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהם"
    }
   ],
   "correctId": "e",
   "answerSource": "solution-pdf",
   "explanation": "‏C מופיע רק בצד שמאל, ולכן חייב להיות בכל מפתח. סגור C: `C → AEF`, `E → D`, `D → B` ⇒ C⁺ = {A,B,C,D,E,F}, כלומר {C} לבדו הוא המפתח היחיד (המינימלי). כל האפשרויות הן על-מפתחות ולא מפתחות קבילים (מינימליים). לכן E.",
   "confidence": "high",
   "id": "23B-A-Q18",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתון יחס $R(A, B, C)$ והפירוק (decomposition) $R1(A, B)$ ו-$R2(B, C)$, ואוסף התלויות הפונקציונליות $F(A → BC, C → B, AB → B)$. קבעו האם הפירוק משמר מידע, משמר תלויות, וכן הלאה.",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הפירוק משמר מידע בלבד"
    },
    {
     "id": "b",
     "type": "text",
     "value": "הפירוק משמר תלויות בלבד"
    },
    {
     "id": "c",
     "type": "text",
     "value": "הפירוק משמר מידע ומשמר תלויות"
    },
    {
     "id": "d",
     "type": "text",
     "value": "הפירוק אינו משמר מידע ואינו משמר תלויות"
    },
    {
     "id": "e",
     "type": "text",
     "value": "ההצעה לפירוק אינה פירוק תקין של היחס R"
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "החיתוך R1∩R2 = {B}, ו-B אינו מפתח של R1 ולא של R2 (B⁺ = {B}) — ולכן אין שימור מידע (הצירוף אינו lossless). ההיטלים על R1, R2 נותנים רק `A → B` ו-`C → B`, שמהם לא ניתן להסיק את `A → C` — ולכן גם אין שימור תלויות. לכן D.",
   "confidence": "high",
   "id": "23B-A-Q19",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "id": "23B-A2-Q17",
   "examCode": "23B-A2",
   "part": "ד",
   "topic": "fd_norm",
   "topicLabel": "תלויות ונרמול",
   "question": "נתונה קבוצת תלויות פונקציונליות $F = {Q → U, U → V, PQ → WST, SU → TR, VT → RW, R → W}$. קבעו האם אחת מהתלויות הבאות נובעת מ-F:",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "QU → R"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "SQ → W"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "PQ → R"
    },
    {
     "id": "d",
     "type": "text",
     "value": "יותר מתשובה אחת נכונה."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה."
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "‏(SQ)⁺: מ-Q→U, U→V מקבלים U,V; מ-SU→TR מקבלים T,R; ולכן R→W → יש W, אז SQ→W נובעת. ‏(PQ)⁺: PQ→WST נותן W,S,T; ואז SU→TR נותן R, ולכן PQ→R נובעת. לעומת זאת (QU)⁺={Q,U,V} בלבד, כך ש-QU→R אינה נובעת. שתי תלויות נובעות → תשובה D.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q18",
   "examCode": "23B-A2",
   "part": "ד",
   "topic": "fd_norm",
   "topicLabel": "תלויות ונרמול",
   "question": "נתון יחס $R(A, B, C, D, E, F)$ ותלויות פונקציונליות $F(AB → EF, C → AEF, D → B, E → D)$. קבעו מי מהבאים מפתח-על:",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "{ABC}"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "{BC}"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "{C}"
    },
    {
     "id": "d",
     "type": "text",
     "value": "יותר מאחד המפתחות הפוטנציאליים הוא מפתח-על"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל ההמפתחות הם מפתחות על."
    }
   ],
   "correctId": "e",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "‏(C)⁺: מ-C→AEF מקבלים A,E,F; מ-E→D מקבלים D; מ-D→B מקבלים B — כלומר C לבדו קובע את כל התכונות ולכן {C} הוא מפתח-על (וגם מפתח מועמד). מכאן ש-{BC} ו-{ABC} (המכילים את C) הם אף הם מפתחות-על — כל המפתחות המנויים הם מפתחות-על.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q19",
   "examCode": "23B-A2",
   "part": "ד",
   "topic": "fd_norm",
   "topicLabel": "תלויות ונרמול",
   "question": "נתון יחס $R = (A, B, C, D, E)$ והפירוק $R1(A, B, C)$ ו-$R2(C, D, E)$, ואוסף התלויות הפונקציונליות $F(AB → C, C → B, DE → C)$. קבעו האם הפירוק משמר מידע, משמר תלויות וכן הלאה.",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הפירוק משמר מידע בלבד"
    },
    {
     "id": "b",
     "type": "text",
     "value": "הפירוק משמר תלויות בלבד"
    },
    {
     "id": "c",
     "type": "text",
     "value": "הפירוק משמר מידע ומשמר תלויות"
    },
    {
     "id": "d",
     "type": "text",
     "value": "הפירוק אינו משמר מידע ואינו משמר תלויות"
    },
    {
     "id": "e",
     "type": "text",
     "value": "ההצעה לפירוק אינה פירוק תקין של היחס R"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "‏R1 ∩ R2 = {C}, ו-C⁺={C,B} אינו מפתח של R1 ולא של R2 — לכן הפירוק אינו משמר מידע (חיבור מפסיד). לעומת זאת כל התלויות נשמרות: `AB→C` ו-`C→B` בתוך R1, ו-`DE→C` בתוך R2. לכן הפירוק משמר תלויות בלבד.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתונה סכמת R=(A,B,C) כלשהי, כמו כן נתונות 4 הטענות הבאות. כמה מהטענות הנתונות הן טענות נכונות?  **טענה 1:** ייתכן מצב שבו יהיה בדיוק מפתח קביל אחד וגודלו יהיה 1 (תכונה בודדת).  **טענה 2:** ייתכן מצב שבו יהיו בדיוק 2 מפתחות קבילים בגדלים שונים (מספר תכונות שונה).  **טענה 3:** ייתכן מצב שבו יהיו בדיוק 3 מפתחות קבילים בגדלים שונים (מספר תכונות שונה).  **טענה 4:** ייתכן מצב שבו יהיו בדיוק 2 מפתחות קבילים בגדלים שונים (מספר תכונות שונה).",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "2"
    },
    {
     "id": "b",
     "type": "text",
     "value": "1"
    },
    {
     "id": "c",
     "type": "text",
     "value": "3"
    },
    {
     "id": "d",
     "type": "text",
     "value": "4"
    },
    {
     "id": "e",
     "type": "text",
     "value": "0"
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "c"
   ],
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "medium",
   "explanation": "התשובה שהתבקשה היא א' (2 טענות נכונות); אך מאחר וטענה 4 נוסחה בדיוק כמו טענה 2, גם תשובה ג' (3) התקבלה.",
   "id": "24B-A-Q18",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתונות קבוצות של תלויות פונקציונליות F1 ו-F2 המכילות תלויות פונקציונליות המתייחסות לטבלה R. על מנת להוכיח כי F2 הוא כיסוי מינימלי של F1 יש לבצע:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "נחשב את הסגור של F1 ואת הסגור של F2 ונוודא כי הם שווים. בנוסף לכך נוודא שב-F2 אין תלויות/תכונות עודפות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "נחשב את הסגור של F1 ואת הסגור של F2 ונוודא כי הם שווים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "נחשב את הסגור של F1 ואת הסגור של F2 ונוודא כי הם שווים. בנוסף לכך נוודא שב-F1 אין תלויות/תכונות עודפות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "נחשב את הסגור של F1 ואת הסגור של F2 ונוודא כי הם שווים. בנוסף לכך נוודא שב-F1 וב-F2 אין תלויות/תכונות עודפות."
    },
    {
     "id": "e",
     "type": "text",
     "value": "נוודא שכל תלות ב-F1 נמצאת ב-F2 והסגור של שתיהן שווים"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "כיסוי מינימלי דורש שקילות של הסגורים ובנוסף שב-F2 (הכיסוי) אין תלויות או תכונות עודפות.",
   "id": "24B-A-Q19",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתונה התבנית R עם התלויות הפונקציות F הבאות. איזה מבין הבאים הינו מפתח קביל ב-R?  $$R = (A, B, C, D, E, G, I)$$  $$F = {AB→C, GAEID→C, CD→E, EI→G, IG→E, DE→C, BC→A, AIDE→I, CGI→E, ICBEG→A}$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "BDGI"
    },
    {
     "id": "b",
     "type": "text",
     "value": "BDG"
    },
    {
     "id": "c",
     "type": "text",
     "value": "BDI"
    },
    {
     "id": "d",
     "type": "text",
     "value": "BDGIA"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "הסגור של BDGI מכסה את כל תכונות R, והוא מינימלי (אף תת-קבוצה שלו אינה מפתח), ולכן BDGI הוא מפתח קביל.",
   "id": "24B-A-Q20",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "תלויות ונרמול"
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "25B-A-fd",
   "question": "מה הסגור (closure) של התכונה `A`?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "{A}"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "{AB}"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "{ABD}"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "{ABE}"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "R"
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "‏A⁺: מ-A→B מוסיפים B; מ-AB→E מוסיפים E. C→BD דורש C (שאינו בסגור). לכן A⁺ = {A, B, E} = {ABE}.",
   "confidence": "high",
   "id": "25B-A-Q17",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "25B-A-fd",
   "question": "מי מהבאים הוא מפתח **קביל** (candidate key) של `R` בהינתן `F1`?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "{AB}"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "{AC}"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "{AD}"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "{ABD}"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "{ACD}"
    }
   ],
   "correctId": "b",
   "answerSource": "solution-pdf",
   "explanation": "‏AC⁺ = {A,B,C,D,E} = R, ואף אחת מ-A או C לבדה אינה מפתח (A⁺={ABE}, C⁺={CBD}). לכן {AC} הוא מפתח מועמד מינימלי. {ABD},{ACD} אינם מינימליים או אינם על-מפתח.",
   "confidence": "high",
   "id": "25B-A-Q18",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתונה הסכמה `R=(A,B,C,D,E)` וקבוצת תלויות פונקציונליות שהיא מקיימת:\n$$F = {B → E, DE → CD, C → AB}$$\nכמו כן, נתון הפירוק הבא: `R1(A,B,C,D)`, `R2(C,E)`, `R3(D,E)`.\nיש לבחור את הטענה הנכונה מבין הבאות:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הפירוק משמר מידע, אך לא תלויות"
    },
    {
     "id": "b",
     "type": "text",
     "value": "הפירוק משמר תלויות, אך לא מידע"
    },
    {
     "id": "c",
     "type": "text",
     "value": "הפירוק לא משמר תלויות, ולא משמר מידע"
    },
    {
     "id": "d",
     "type": "text",
     "value": "הפירוק משמר מידע ותלויות"
    },
    {
     "id": "e",
     "type": "text",
     "value": "‏זהו אינו פירוק של R על פי הגדרה"
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "הפירוק מחסר-אובדן (chase: בעזרת C→AB מתאחדים A,B ואז B→E מתאים את E, ומתקבלת שורה מלאה ב-R1). אך אינו משמר תלויות — `B → E` אינה נשמרת באף רכיב (E מופרד מ-B) ואינה נגזרת מאיחוד ההיטלים. לכן משמר מידע אך לא תלויות.",
   "confidence": "high",
   "id": "25B-A-Q19",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתונה הסכמה `R=(A,B,C,D,E)` וקבוצת תלויות פונקציונליות שהיא מקיימת:\n$$F = {A → B, C → D, BC → E}$$\nכמו כן, נתון הפירוק הבא: `R1(A,B)`, `R2(C,D)`, `R3(B,C,E)`, `R4(A,C)`.\nיש לבחור את הטענה הנכונה מבין הבאות:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "‏R לא נמצאת ב-BCNF, והפירוק לא משמר מידע"
    },
    {
     "id": "b",
     "type": "text",
     "value": "‏R נמצאת ב-BCNF, והפירוק משמר תלויות"
    },
    {
     "id": "c",
     "type": "text",
     "value": "‏R נמצאת ב-3NF, והפירוק נמצא ב-3NF"
    },
    {
     "id": "d",
     "type": "text",
     "value": "‏R לא נמצאת ב-BCNF, והפירוק נמצא ב-3NF"
    },
    {
     "id": "e",
     "type": "text",
     "value": "‏זהו אינו פירוק של R על פי הגדרה"
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "המפתח היחיד של R הוא AC. התלות `A → B` מפרה BCNF (וגם 3NF, כי B לא-ראשוני), לכן R אינה ב-BCNF. כל רכיבי הפירוק R1..R4 הם ב-BCNF (ולכן גם ב-3NF). לכן: R לא ב-BCNF והפירוק ב-3NF.",
   "confidence": "high",
   "id": "25B-A-Q20",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "מי מבין התלויות הבאות **אינה** נמצאת ב-$F1^{+}$?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "C → D"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "A → E"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "CE → B"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "B → E"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "‏B⁺ = {B} (‏B אינו צד-שמאל של אף תלות ב-F1), ולכן B → E אינה נובעת. לעומת זאת C → D נובעת מ-C → BD; A → E מ-A → B ואז AB → E; ו-CE → B מ-E → B.",
   "confidence": "high",
   "contextId": "25C-A-fd",
   "id": "25C-A-Q17",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "האם ב-F1 יש תכונה עודפת (extraneous)? אם כן — מהי?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לא, אין תכונה עודפת."
    },
    {
     "id": "b",
     "type": "text",
     "value": "כן, `A`"
    },
    {
     "id": "c",
     "type": "text",
     "value": "כן, `B`"
    },
    {
     "id": "d",
     "type": "text",
     "value": "כן, `C`"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כן, `D`"
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "בתלות AB → E התכונה `B` עודפת: כבר A⁺ = {A, B, E} (כי A → B ואז AB → E), ולכן A → E מתקיימת בלי B בצד שמאל.",
   "confidence": "high",
   "contextId": "25C-A-fd",
   "id": "25C-A-Q18",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתון היחס $R = (A, B, C)$ — מהו המספר המקסימלי האפשרי של מפתחות מועמדים (candidate keys)?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "3"
    },
    {
     "id": "b",
     "type": "text",
     "value": "2"
    },
    {
     "id": "c",
     "type": "text",
     "value": "1"
    },
    {
     "id": "d",
     "type": "text",
     "value": "4"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות."
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "עבור 3 תכונות, המספר המקסימלי של מפתחות מועמדים הוא C(3,1) = 3 (למשל עם A → B, B → C, C → A כל תכונה בודדת היא מפתח).",
   "confidence": "high",
   "id": "25C-A-Q19",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתונה הסכמה $R = (A, B, C, D)$ וקבוצת התלויות $F = {AB → C, AB → D, C → A}$. יש לבחור את הטענה הנכונה מבין הבאות:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "‏R לא נמצאת ב-BCNF אבל נמצאת ב-3NF."
    },
    {
     "id": "b",
     "type": "text",
     "value": "‏R לא נמצאת ב-BCNF ולא נמצאת ב-3NF."
    },
    {
     "id": "c",
     "type": "text",
     "value": "‏R נמצאת ב-BCNF ונמצאת ב-3NF."
    },
    {
     "id": "d",
     "type": "text",
     "value": "‏R נמצאת ב-BCNF אבל לא נמצאת ב-3NF."
    },
    {
     "id": "e",
     "type": "text",
     "value": "לא ניתן לדעת כי אין מספיק נתונים."
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "המפתחות המועמדים הם AB ו-BC, ולכן A,B,C ראשוניים ו-D לא-ראשוני. התלות C → A מפרה BCNF (C אינו על-מפתח), אך מקיימת 3NF כי A ראשוני. לכן R ב-3NF אך לא ב-BCNF.",
   "confidence": "high",
   "id": "25C-A-Q20",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "25S-B-fd",
   "question": "מי מבין התלויות הבאות **אינה** נמצאת ב-$F1^{+}$?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "CE → B"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "AE → D"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "CD → A"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "A → E"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות"
    }
   ],
   "correctId": "d",
   "explanation": "‏A⁺ = {A, B, D} (‏A → B ואז B → D), ו-E אינו נובע מ-A, לכן `A → E` אינה ב-F1⁺. לעומת זאת CE → B, AE → D ו-CD → A כן נובעות (למשל CD⁺ ⊇ {E, A}).",
   "confidence": "high",
   "id": "25S-B-Q17",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "25S-B-fd",
   "question": "האם ב-`F1` יש תכונה עודפת (extraneous)? אם כן — מהי?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "לא, אין תכונות עודפות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "כן, התכונה `D` עודפת בתלות $CD → E$."
    },
    {
     "id": "c",
     "type": "text",
     "value": "כן, התכונה `E` עודפת בתלות $E → A$."
    },
    {
     "id": "d",
     "type": "text",
     "value": "כן, התכונה `B` עודפת בתלות $A → B$."
    },
    {
     "id": "e",
     "type": "text",
     "value": "כן, התכונה `A` עודפת בתלות $E → A$."
    }
   ],
   "correctId": "a",
   "explanation": "כל התלויות פרט ל-`CD → E` הן עם צד-שמאל בעל תכונה אחת (אין בהן תכונה עודפת). ב-`CD → E` אף אחת מ-`C`,`D` אינה עודפת: `C⁺={C}` ו-`D⁺={D}` — אף אחת לבדה אינה גוררת `E`. לכן אין תכונה עודפת.",
   "confidence": "high",
   "id": "25S-B-Q18",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "עבור היחס $R(A, B, C)$ עם $F = \\{C → B, B → A\\}$ — כמה מפתחות קבילים (candidate keys) יכולים להיות ל-R?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "1"
    },
    {
     "id": "b",
     "type": "text",
     "value": "2"
    },
    {
     "id": "c",
     "type": "text",
     "value": "3"
    },
    {
     "id": "d",
     "type": "text",
     "value": "אין בכלל"
    },
    {
     "id": "e",
     "type": "text",
     "value": "לא ניתן לקבוע"
    }
   ],
   "correctId": "a",
   "explanation": "‏`C` אינו נובע מאף תכונה אחרת, לכן כל מפתח חייב להכיל את `C`. ו-`C⁺ = {C, B, A}` = כל היחס, כך ש-`C` לבדו הוא מפתח. זהו המפתח הקביל היחיד — סה\"כ מפתח אחד.",
   "confidence": "high",
   "id": "25S-B-Q19",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתונה הסכמה $R(A, B, C, D, E)$ המקיימת $F = \\{D → E, B → BC, CD → A\\}$. שקול את הפירוק הבא:\n$$R_1(A, B, C),\\ R_2(B, D),\\ R_3(C, D, E)$$\nאיזו מהטענות הבאות נכונה?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הפירוק משמר תלויות והוא גם חסר-אובדן מידע."
    },
    {
     "id": "b",
     "type": "text",
     "value": "הפירוק משמר תלויות אך גורם לאובדן מידע."
    },
    {
     "id": "c",
     "type": "text",
     "value": "הפירוק חסר-אובדן מידע אך אינו משמר תלויות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "הפירוק אינו חסר-אובדן מידע ואינו משמר תלויות."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אין מספיק מידע כדי לקבוע."
    }
   ],
   "correctId": "c",
   "acceptedIds": [
    "c",
    "d"
   ],
   "explanation": "לפי טבלת התשובות הרשמית התקבלו כאן **שתי תשובות** — C וגם D (שתיהן קובעות שהפירוק אינו משמר תלויות; הן נחלקות בשאלת חוסר-אובדן המידע).",
   "confidence": "high",
   "id": "25S-B-Q20",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ה",
   "topic": "nosql",
   "question": "מי מהבאים יוצא דופן?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "AZURE"
    },
    {
     "id": "b",
     "type": "text",
     "value": "AWS"
    },
    {
     "id": "c",
     "type": "text",
     "value": "NoSQL"
    },
    {
     "id": "d",
     "type": "text",
     "value": "GCP"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות"
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "AZURE, AWS ו-GCP הם פלטפורמות ענן (שירותי אחסון/מחשוב), ואילו NoSQL הוא שם כולל לאוסף בסיסי נתונים לא-רלציוניים.",
   "id": "22B-A-Q20",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "NoSQL"
  },
  {
   "part": "ה",
   "topic": "nosql",
   "question": "מי מהמערכות הבאות הכי מתאימה לכלול NoSQL?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מערכת ששומרת הימורים לכל לקוח, כמה כסף הוציא, כמה כסף זכה."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מערכת ששומרת כתובות וטלפונים של חברים, מה המספר שם וטלפון של החברים של כל אחד, וכל פעם שהם מדברים כמה זמן."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מערכת ששומרת קניות של אנשים בכל התחומים, מה אהבו בכל קניה מה הם ממליצים, ומה אמרו אנשים שלהם המליצו על הקנייה."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מערכת ששומרת לכל אדם את ההוצאות וההכנסות שלו לחודש ולפי אילו סעיפים הוא מסווג אותם."
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "C היא מערכת עם המלצות ותוכן חופשי (הכי פחות מספרים וסעיפים קבועים) — מתאימה למודל לא-רלציוני. התקבלו גם תשובות אחרות אם כללו הסבר רלוונטי.",
   "id": "22B-A-Q21",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "NoSQL"
  },
  {
   "id": "23B-A2-Q20",
   "examCode": "23B-A2",
   "part": "ה",
   "topic": "nosql",
   "topicLabel": "NoSQL",
   "question": "מי מהמערכות הבאות **הכי** מתאימה ל-SQL?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מערכת ששומרת הימורים לכל לקוח, במשחקים שונים, כמה כסף הוציא, ומה היו ההימורים שעשה בכל יום."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מערכת ששומרת כתובות וטלפונים של חברים ואת תוכני השיחות, ואת החברים של החברים שדיברו איתם, ומאפשרת לבדוק האם תוכני השיחות דומים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מערכת ששומרת קניות של אנשים בכל מיני התחומים, מה אהבו בכל קנייה, מה הם ממליצים, ומה אמרו אנשים שלהם המליצו על הקנייה."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מערכת ששומרת לכל אדם את ההוצאות וההכנסות שלו לחודש, ולפי אילו סעיפים הוא מסווג אותם, וההערות שיש לו על כל אחד מסעיפי ההוצאות ואם סעיף קשור לסעיף אחר."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהמערכות"
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "d"
   ],
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "בפתרון סומנו כנכונות גם A וגם D — שתיהן נתונים מובְנים, טבלאיים ובעלי יחסים ברורים (רשומות מובנות; מערכת הוצאות עם סעיפים והפניה עצמית), ולכן מתאימות ל-SQL. B ו-C הם נתונים גרפיים/לא-מובנים (רשת חברתית, המלצות) המתאימים יותר ל-NoSQL.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q21",
   "examCode": "23B-A2",
   "part": "ה",
   "topic": "nosql",
   "topicLabel": "NoSQL",
   "question": "מי מהבאים יוצא דופן?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "AZURE"
    },
    {
     "id": "b",
     "type": "text",
     "value": "AWS"
    },
    {
     "id": "c",
     "type": "text",
     "value": "NoSQL"
    },
    {
     "id": "d",
     "type": "text",
     "value": "GCP"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות"
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "‏AZURE, AWS ו-GCP הם ספקי ענן; `NoSQL` הוא קטגוריה של בסיסי נתונים ולא ספק ענן — ולכן היוצא דופן.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q22",
   "examCode": "23B-A2",
   "part": "ה",
   "topic": "nosql",
   "topicLabel": "NoSQL",
   "question": "באיזו מהפקודות הבאות ב-MongoDB תשתמשו כדי למצוא את כל המסמכים באוסף `Users` בהם השדה גיל `age` גדול מ-30?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "db.users.find({ \"age\": $gt: 30 })",
     "lang": "js"
    },
    {
     "id": "b",
     "type": "code",
     "value": "db.users.find( \"age\": { $gt: 30 } )",
     "lang": "js"
    },
    {
     "id": "c",
     "type": "code",
     "value": "db.users.find({ age > 30 })",
     "lang": "js"
    },
    {
     "id": "d",
     "type": "code",
     "value": "db.users.find({ \"age\": { $gt: 30 } })",
     "lang": "js"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "התחביר התקין ב-MongoDB הוא `db.users.find({ \"age\": { $gt: 30 } })` — מסמך שאילתה שבו הערך של השדה הוא אובייקט אופרטור `{ $gt: 30 }`. שאר האפשרויות בעלות סוגריים/מבנה שגויים או משתמשות ב-`>` שאינו נתמך.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q23",
   "examCode": "23B-A2",
   "part": "ה",
   "topic": "nosql",
   "topicLabel": "NoSQL",
   "question": "במונגו (MongoDB) נתון אוסף (collection) של מכירות עם השדות: פריט, מחיר, כמות, תאריך (item, price, quantity, date). מהו ה-pipeline שיחשב נכון את סך ההכנסות (total revenue) עבור כל פריט (item)? (ההכנסה היא סך כל הכמות שנמכרה כפול המחיר שבו נמכר הפריט.)",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "{$group: {_id: \"$item\", totalRevenue: $multiply {$sum: \"$price\"}}}",
     "lang": "js"
    },
    {
     "id": "b",
     "type": "code",
     "value": "{$group: {_id: \"$item\", totalRevenue: {$sum: { $multiply: [\"$price\", \"$quantity\"]}}}}",
     "lang": "js"
    },
    {
     "id": "c",
     "type": "code",
     "value": "{$group: {_id: \"$item\", totalRevenue: {$sum: \"$price\"}}}",
     "lang": "js"
    },
    {
     "id": "d",
     "type": "code",
     "value": "{$group: {_id: \"$item\", totalRevenue: $add {$sum: \"$price\"}}}",
     "lang": "js"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "ההכנסה לפריט = סכום (מחיר × כמות) לכל מכירה: `$sum` על `$multiply: [\"$price\", \"$quantity\"]`, בקיבוץ לפי `$item`. C סוכם רק את המחיר, ו-A, D בעלי תחביר אופרטורים שגוי (`$multiply`/`$add` ללא מערך ארגומנטים).",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q24",
   "examCode": "23B-A2",
   "part": "ה",
   "topic": "nosql",
   "topicLabel": "NoSQL",
   "question": "מה מהבאים מדבר על היכולת לדרוש זמינות נתונים (availability) על פני תכונות אחרות של מערכת בסיס נתונים?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "ACID"
    },
    {
     "id": "b",
     "type": "text",
     "value": "BASE"
    },
    {
     "id": "c",
     "type": "text",
     "value": "CAP"
    },
    {
     "id": "d",
     "type": "text",
     "value": "AZURE"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה קשורה לגישה לנתונים."
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "משפט `CAP` (Consistency, Availability, Partition tolerance) עוסק בפשרה שבין עקביות, זמינות ועמידות לפיצול — כלומר בבחירה לתעדף זמינות (availability) על פני תכונות אחרות.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21B-A-ra",
   "question": "מה עושה השאילתה הבאה?  $$Π_{E1.AnonymousId} σ_{E1.AnonymousId = E2.AnonymousId ∧ E1.partyElected != E2.partyElected} (ρ_{E1} Elect X ρ_{E2} Elect)$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מוצאת מזהים אנונימיים שהצביעו בבחירות"
    },
    {
     "id": "b",
     "type": "text",
     "value": "מוצאת מזהים אנונימיים שלא הצביעו בבחירות"
    },
    {
     "id": "c",
     "type": "text",
     "value": "מוצאת מזהים אנונימיים שהצביעו בבחירות פעמיים או יותר"
    },
    {
     "id": "d",
     "type": "text",
     "value": "מוצאת למי הצביע כל מזהה אנונימי"
    }
   ],
   "correctId": "c",
   "confidence": "high",
   "explanation": "התנאי מוצא אותו מזהה אנונימי המופיע עם מפלגות שונות — כלומר הצביע לפחות פעמיים (עם בחירה שונה).",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q14",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21B-A-ra",
   "question": "מי מהשאילתות הבאות תחזיר את המזהה של המצביע עם הגיל המינימלי? (הערה: במבחן הודפס Elect במקום Citizen; ל-Elect אין Age, ולכן תוקן ל-Citizen.)",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{E1.AnonymousId} σ_{E1.age>E2.age} (ρ_{E1} Citizen X ρ_{E2} Citizen)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{E2.AnonymousId} σ_{E1.age>E2.age} (ρ_{E1} Citizen X ρ_{E2} Citizen)"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{AnonymousId} σ_{Min(Age)} (Citizen X Citizen)"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{AnonymousId} (Citizen) − Π_{E2.AnonymousId} σ_{E1.age>E2.age} (ρ_{E1} Citizen X ρ_{E2} Citizen)"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "Π_{AnonymousId} (Citizen) − Π_{E1.AnonymousId} σ_{E1.age>E2.age} (ρ_{E1} Citizen X ρ_{E2} Citizen)"
    }
   ],
   "correctId": "e",
   "confidence": "medium",
   "explanation": "מכל המזהים מחסירים את אלו שגדולים ממישהו (E1.age>E2.age → E1 אינו הצעיר), ומקבלים את בעל הגיל המינימלי. (בהתאם לתיקון Elect→Citizen; ראו askAdir.)",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q15",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21B-A-ra",
   "question": "בהנחה שאפשר להצביע כמה פעמים שרוצים, מי מהשאילתות הבאות מחזירה את האנשים שהצביעו לכל המפלגות?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{AnonymousId} (Elect X Citizen)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{AnonymousId} (Elect ⊗ Citizen)"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{AnonymousId} (Citizen) ÷ Π_{partyElected} (Elect)"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{AnonymousId,partyElected} (Elect ⊗ Citizen) ÷ Π_{partyElected} (Elect)"
    }
   ],
   "correctId": "d",
   "confidence": "high",
   "explanation": "\"הצביעו לכל המפלגות\" הוא חילוק (÷): המחולק (AnonymousId, partyElected) חלקי כל המפלגות (partyElected). ב-C יש אי-התאמת סכמות. (הערה: הבחינה מסמנת חילוק בתו ':'.)",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q16",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21B-A-ra",
   "question": "מי מהאמירות הבאות נכונה?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "באלגברת היחסים לא ניתן לכתוב שאילתה המחזירה מה גיל המצביע המקסימלי."
    },
    {
     "id": "b",
     "type": "text",
     "value": "באלגברת היחסים לא ניתן לכתוב שאילתה המחזירה מה מספר המצביעים בכלל המפלגות."
    },
    {
     "id": "c",
     "type": "text",
     "value": "באלגברת היחסים לא ניתן לכתוב שאילתה המחזירה מיהו האיזור עם המצביע הצעיר ביותר."
    },
    {
     "id": "d",
     "type": "text",
     "value": "באלגברת היחסים לא ניתן לחשב מיהם האיזורים בהם הצביע יותר ממצביע אחד."
    }
   ],
   "correctId": "b",
   "confidence": "high",
   "explanation": "באלגברת היחסים אין ספירה (count), ולכן לא ניתן להחזיר את מספר המצביעים. את D (איזורים עם יותר ממצביע אחד) כן ניתן לחשב על ידי חיסור/צירוף עצמי.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q17",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21B-C-db",
   "question": "מה ישלים את הקטע החסר __(9)__ כדי שהשאילתה תחזיר את מזהה הפרה עם הגיל המינימלי?\n$$Π_{cow_id}(cow) − Π_{C2.cow_id} \\_\\_(9)\\_\\_ (ρ_{c1} cow \\; X \\; ρ_{c2} cow)$$",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "σ_{c2.age>c1.age}"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "σ_{c1.age>c2.age}"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{c1.age>c2.age}"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{c2.age>c1.age}"
    },
    {
     "id": "e",
     "type": "text",
     "value": "לא ניתן להשלים את השאילתה באלגברת היחסים"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "`Π_{C2.cow_id} σ_{c2.age>c1.age} (ρc1 cow X ρc2 cow)` מחזיר את כל הפרות שקיימת פרה צעירה מהן — כלומר כל הפרות פרט לצעירה ביותר. חיסור מכל הפרות משאיר את הפרה עם הגיל המינימלי → A. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q16",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21B-C-db",
   "question": "מה תחזיר השאילתה הבאה?\n$$Π_{nickname} \\; σ_{age > block_id} \\; (cow ⊗ place_of)$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "את כל שמות החיבה של הפרות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "את כל שמות החיבה של הפרות שיש להן מקום מגורים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "את שמות החיבה של הפרות שגרות כולן באותו בלוק."
    },
    {
     "id": "d",
     "type": "text",
     "value": "את שמות החיבה של הפרות שגילם גדול ממספר בלוק המגורים שלהם."
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "צירוף טבעי `cow ⊗ place_of`, בחירת השורות בהן `age > block_id`, והיטל על `nickname` → שמות החיבה של הפרות שגילן גדול ממספר בלוק המגורים שלהן → D. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q17",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21B-C-db",
   "question": "תלמידים כתבו שאילתה להצגת כינויי הפרות שיש להן בת. מי מהשאילתות הבאות נכונה?\n**שאילתה 1:**\n$$Π_{nickname} (cow ⊗ mother_of)$$\n**שאילתה 2:**\n$$Π_{nickname} \\; σ_{cow.cow_id = cow.mother_id} \\; (cow \\; X \\; mother_of)$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "רק שאילתה 1 נכונה."
    },
    {
     "id": "b",
     "type": "text",
     "value": "רק שאילתה 2 נכונה."
    },
    {
     "id": "c",
     "type": "text",
     "value": "שתי השאילתות נכונות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "אין שאילתה נכונה."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "שאילתה 1 (`cow ⊗ mother_of`) מבצעת צירוף טבעי ללא עמודה משותפת ולכן שגויה; שאילתה 2 (מכפלה קרטזית + בחירה על התאמת הפרה לרשומת האם) נכונה לפי הכוונה — התנאי המודפס `cow.mother_id` הוא שגיאת דפוס בבחינה. לכן B. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q18",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21B-C-db",
   "question": "מי מהפעולות הבאות היא הפעולה העיקרית שהכי קרובה לענות על השאלה: מיהי הפרה שהיא אם (אמא של) כל הפרות הגרות בביתן 8?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מכפלה קרטזית וחיסור"
    },
    {
     "id": "b",
     "type": "text",
     "value": "חילוק ובחירה"
    },
    {
     "id": "c",
     "type": "text",
     "value": "צירוף טבעי"
    },
    {
     "id": "d",
     "type": "text",
     "value": "חיסור וצירוף טבעי"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "\"אם של כל הפרות בביתן 8\" הוא כימות אוניברסלי → אופרטור החילוק (÷), יחד עם בחירה (σ) לסינון פרות ביתן 8 → B. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q19",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21S-B-schema",
   "question": "איזו שאילתה תמצא שמות לקוחות שגרים גם בראשון לציון וגם בירושלים (בהנחה שלקוח יכול לגור בשתי ערים שונות)?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{name} (σ_{city=\"rishon lezion\" ∧ city=\"jerusalem\"} (customer))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{name} (σ_{city=\"rishon lezion\"} (customer)) − Π_{name} (σ_{city=\"jerusalem\"} (customer))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{name} (σ_{city=\"rishon lezion\"} (customer)) ∪ Π_{name} (σ_{city=\"jerusalem\"} (customer))"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{name} (σ_{city=\"rishon lezion\"} (customer)) ∩ Π_{name} (σ_{city=\"jerusalem\"} (customer))"
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "\"גם וגם\" בשתי שורות נפרדות של אותו לקוח מחייב חיתוך (∩) של שמות הלקוחות מכל עיר. תנאי σ יחיד עם city=A ∧ city=B (תשובה א) לעולם ריק.",
   "id": "21S-B-Q14",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21S-B-schema",
   "question": "מה עושה השאילתה הבאה?\n$$Π_{Apartments_id}(Apartments) − Π_{A2.Apartments_id} (σ_{A2.construction_cost < A1.Construction_cost} (ρ_{A1}(Apartments) X ρ_{A2}(Apartments)))$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מוצאת את ה-id של כל הדירות שמופיעות בטבלת Apartments פעמיים"
    },
    {
     "id": "b",
     "type": "text",
     "value": "מוצאת את ה-id של הדירה\\ות היקרה ביותר."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מוצאת את ה-id של הדירה\\ות הזולה ביותר."
    },
    {
     "id": "d",
     "type": "text",
     "value": "תשובות א ו-ג נכונות."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "מחסירים מכל הדירות את אלו שקיימת דירה יקרה מהן — כלומר נותרות רק הדירה/ות היקרה ביותר (בעלת עלות הבנייה המקסימלית).",
   "id": "21S-B-Q15",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21S-B-schema",
   "question": "מה עושה השאילתה הבאה:\n$$Π_{Purchases.contractorid, customerid} (Purchases ⊗ Apartments) ÷ Π_{customerid} (σ_{city=\"holon\"} (customer))$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מחזירה id של לקוחות שקנו דירה בחולון."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מחזירה id של קבלנים שמכרו דירות ללקוחות בחולון."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מחזירה id של קבלנים שמכרו דירות לכל הלקוחות בחולון"
    },
    {
     "id": "d",
     "type": "text",
     "value": "מחזירה id של לקוחות שקנו את כל הדירות בחולון."
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "אופרטור החילוק (÷) על קבוצת ה-customerid של לקוחות חולון מחזיר את הקבלנים שמכרו דירה לכל אחד מלקוחות חולון.",
   "id": "21S-B-Q16",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "question": "מה יהיה הצירוף הטבעי (join) בין שני יחסים שאין להם אף תכונה משותפת?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "תוצאה זהה לפקודת הפרש בין הטבלאות ."
    },
    {
     "id": "b",
     "type": "text",
     "value": "טבלה ריקה."
    },
    {
     "id": "c",
     "type": "text",
     "value": "תוצאה זהה לפקודת איחוד בין הטבלאות ."
    },
    {
     "id": "d",
     "type": "text",
     "value": "תוצאה זהה למכפלה קרטזית בין הטבלאות ."
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "צירוף טבעי ללא תכונות משותפות מתנוון למכפלה קרטזית בין שתי הטבלאות.",
   "id": "21S-B-Q17",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21S-B-schema",
   "question": "מה עושה השאילתה הבאה:\n$$Π_{Purchases.Apartments_id} (σ_{cost = Construction_cost ∧ city=\"holon\"} (Purchases ⊗ Apartments))$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מחזירה מספרי דירות בעיר חולון שנמכרו במחיר שהן היו שוות ."
    },
    {
     "id": "b",
     "type": "text",
     "value": "תרוץ בלולאה אינסופית"
    },
    {
     "id": "c",
     "type": "text",
     "value": "מחזירה מספרי דירות בעיר חולון שנמכרו."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מחזירה מספרי דירות בעיר חולון שנמכרו במחיר שהן היו שוות וגם את כלל הדירות בחולון שנמכרו ושלא נמכרו"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "התנאי cost = Construction_cost בעיר חולון בוחר דירות שנמכרו (Purchases) בדיוק במחיר עלות הבנייה שלהן, ומחזיר את מספריהן.",
   "id": "21S-B-Q18",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "21S-B-schema",
   "question": "איזו שאילתה באלגברת היחסים תמצא את שמות הקבלנים שלא בנו דירה?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{name} (Building_contractor) − Π_{name} (Building_contractor ⊗ Apartments)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{name} (Building_contractor ⊗ Apartments) − Π_{name} (Building_contractor)"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{name} (Building_contractor) ∪ Π_{name} (Building_contractor ⊗ Apartments)"
    },
    {
     "id": "d",
     "type": "text",
     "value": "כל התשובות נכונות."
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "שמות כל הקבלנים פחות שמות הקבלנים שכן בנו דירה → תשובה א. תשובה ב מחזירה קבוצה ריקה, תשובה ג מחזירה את כל הקבלנים, ולכן ד (\"כל התשובות נכונות\") אינה יכולה להיות נכונה. בעותק הבחינה סומנו גם א וגם ד — ככל הנראה טעות סימון; לוגית א היא התשובה היחידה.",
   "id": "21S-B-Q19",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "22B-A-schema",
   "question": "מי מהתשובות הבאות מתאימה לשאילתה: \"באילו כלים מנגנים מוזיקאים שהם להקה של איש אחד\"?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π instrument (one_man_band X musician X band_musician)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π instrument (one_man_band ⊗ musician ⊗ band_musician)"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π instrument σ_{one_man_band.b_code=band_musician.b_code} (one_man_band X musician X band_musician)"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π instrument σ_{band_musician.m_id=band_musician.m_id} (one_man_band X musician ⊗ band_musician)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "צירוף טבעי (⊗) בין שלושת היחסים מבצע את ההתאמות הנדרשות לפי המפתחות המשותפים, ואז היטל (Π) על instrument.",
   "id": "22B-A-Q11",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "22B-A-schema",
   "question": "מה דורשת השאילתה \"מה שמות המוזיקאים שמנגנים בכל כלי הפריטה\"?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "צירוף טבעי"
    },
    {
     "id": "b",
     "type": "text",
     "value": "חילוק"
    },
    {
     "id": "c",
     "type": "text",
     "value": "חיסור"
    },
    {
     "id": "d",
     "type": "text",
     "value": "צירוף טבעי וחילוק"
    },
    {
     "id": "e",
     "type": "text",
     "value": "צירוף טבעי וחיסור"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "\"מנגנים בכל כלי הפריטה\" הוא כימות אוניברסלי ← אופרטור החילוק (÷). (על D ניתנו חצי מהנקודות.)",
   "id": "22B-A-Q12",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "22B-A-schema",
   "question": "מה עושה השאילתה הבאה:  $$Π m_id σ_{m_gender=\"אשה\"} (musician) − Π B2.m_id σ_{B1.num_of_instruments > B2.num_of_instruments} (ρ B1 one_man_band X ρ B2 one_man_band)$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מחזירה את תעודת זהות האומנים שמנגנים לבד על הכי הרבה כלים."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מחזירה את תעודת זהות האומנים שמנגנים לבד על הכי מעט כלים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מחזירה את תעודת זהות האומנים שהם נשים שמנגנים על הכי הרבה כלים."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מחזירה את תעודת זהות האומנים שהם נשים שמנגנות על הכי מעט כלים."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה."
    }
   ],
   "correctId": "e",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "ב-B2 אין m_id, ולכן השאילתה אינה נכונה; אם היינו רוצים שהיא תעבוד היה צריך צירוף טבעי עם musician שחסר. (על C ניתנו חצי מהנקודות.)",
   "id": "22B-A-Q13",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "23B-A-sql",
   "question": "מה עונה על השאילתה \"מה שמות המוזיקאים שמנגנים בכל כלי הפריטה (string)\"?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{p_name} σ_{category='string'} (Band X Instrument)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{p_name} σ_{category='string'} (Band ⊗ Instrument)"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{p_name, serial_number}(Band) ÷ Π_{serial_number} σ_{category='string'} (Instrument)"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{p_name} (Band) ∩ Π_{p_name} σ_{category='string'} (Band X Instrument)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "\"בכל כלי הפריטה\" דורש חילוק (division): מוזיקאי המשויך (דרך Band) לכל הכלים מקטגוריית 'string'. תשובה C מבצעת חילוק בין הזוגות (p_name, serial_number) של Band לבין ה-serial_number של כלי הפריטה.",
   "confidence": "high",
   "id": "23B-A-Q14",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "23B-A-sql",
   "question": "מי מהתשובות הבאות מתאימה לשאלה: \"שמות המבצעים שמעולם לא ייצגו את המדינה בה הם גרים\"?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{p_name} (Represent) − Π_{p_name} (Performer ⊗ Represent)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{P.p_name} (σ_{(P.p_name = R.p_name) ∧ (P.country_name <> R.country_name)} (ρ_{P} Performer X ρ_{R} Represent))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{P.p_name} (σ_{(P.country_name <> R.country_name)} (ρ_{P} Performer ⊗ ρ_{R} Represent))"
    },
    {
     "id": "d",
     "type": "text",
     "value": "יותר מתשובה אחת עונה על השאלה"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה לא עונה על השאלה"
    }
   ],
   "correctId": "e",
   "answerSource": "solution-pdf",
   "explanation": "השאלה דורשת חיסור (הפרש), אך החיסור המוצע במסיח A שגוי כי ל-Represent אין `p_name` (לא ניתן להקרין `p_name` מ-Represent); גם B ו-C מניחים חיבור/עמודה שגויים. לכן אף תשובה אינה עונה על השאלה.",
   "confidence": "high",
   "id": "23B-A-Q15",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "23B-A-sql",
   "question": "מה מחזירה השאילתה הבאה?\n**הערה:** לא כל מדינה חייבת לתת נקודות או לקבל נקודות ממדינה אחרת.\n$$Π_{S1.from_country} (σ_{(S1.from_country = S2.to_country) ∧ (S1.to_country <> S2.from_country)} (ρ_{S1} Score X ρ_{S2} Score))$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "שמות המדינות הבאות: מדינה שהצביעה אך ורק למדינות שלא הצביעו לה."
    },
    {
     "id": "b",
     "type": "text",
     "value": "שמות המדינות הבאות: מדינה שהצביעה ללפחות מדינה אחת שהצביעה לה."
    },
    {
     "id": "c",
     "type": "text",
     "value": "שמות המדינות הבאות: מדינה שהצביעה לכל אחת מהמדינות שהצביעו לה."
    },
    {
     "id": "d",
     "type": "text",
     "value": "שמות המדינות הבאות: מדינה שהצביעה ליותר משתי מדינות שהצביעו לה."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "e",
   "answerSource": "solution-pdf",
   "explanation": "הביטוי מחזיר מדינה שהצביעה למדינה אחת לפחות, ומדינה שלישית כלשהי הצביעה לה. כיוון שאין חיסור, אין מניעה שיתקיימו גם מקרים נוספים (למשל שהצביעה גם למדינות שלא הצביעו לה) — ולכן אף אחד מהניסוחים אינו מדויק. מסיח A קרוב (וקיבל ניקוד חלקי), אך אינו שקול. לכן E.",
   "confidence": "med",
   "id": "23B-A-Q16",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "id": "23B-A2-Q13",
   "examCode": "23B-A2",
   "part": "ג",
   "topic": "relalg",
   "topicLabel": "אלגברה רלציונית",
   "question": "מי מהתשובות הבאות מתאימה לשאלה: \"שמות המבצעים שניגנו גם בגיטרה וגם בתופים\"?",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{B.p_name} (σ_{I.type=\"guitar\" ∧ I.type=\"drums\"} (ρ_{B} Band ⊗ ρ_{I} Instrument))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{p_name} (Π_{serial_number} (σ_{type=\"guitar\"} (Instrument)) ⊗ Band) ∩ Π_{p_name} (Π_{serial_number} (σ_{type=\"drums\"} (Instrument)) ⊗ Band)"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{p_name}(Band) − Π_{p_name} (σ_{I.type<>\"guitar\" ∧ I.type<>\"drums\"} (ρ_{B} Band ⊗ ρ_{I} Instrument))"
    },
    {
     "id": "d",
     "type": "text",
     "value": "יותר מתשובה אחת עונה על השאלה"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "\"גם וגם\" = חיתוך: המבצעים שניגנו בגיטרה ∩ המבצעים שניגנו בתופים. A שגוי כי `type=\"guitar\" ∧ type=\"drums\"` על אותה שורה אף פעם אינו מתקיים, ו-C נותן את מי שניגן בגיטרה או בתופים (משלים ה\"אף אחד מהם\"), ולא \"גם וגם\".",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q14",
   "examCode": "23B-A2",
   "part": "ג",
   "topic": "relalg",
   "topicLabel": "אלגברה רלציונית",
   "question": "מה עונה על השאילתה \"מה שמות המדינות שבמהלך כל שנות התחרות קיבלו 12 נקודות מכל המדינות\"?",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{from_country} (Score) − Π_{S1.to_country} σ_{S1.from_country=S2.from_country ∧ (S1.to_country<>S2.to_country) S2.num_points=12} (ρ_{S1} Score X ρ_{S2} Score)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{to_country, from_country} σ_{num_points=12} (Score) ÷ Π_{from_country} (Score)"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{to_country} σ_{num_points=12} (Score) ÷ Π_{from_country} (Score)"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{from_country} σ_{num_points=12} (Score) ∩ Π_{to_country} σ_{num_points=12} (Score)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "זוהי חלוקה: מחלקים את הזוגות (`to_country`, `from_country`) שבהם ניתנו 12 נקודות בקבוצת כל המדינות הנותנות (`Π_{from_country} Score`). התוצאה = המדינות שקיבלו 12 מכל מדינה. ב-C המחולק בעל תכונה יחידה ואינו מכיל את סכמת המחלק, ולכן החלוקה אינה תקינה.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q15",
   "examCode": "23B-A2",
   "part": "ג",
   "topic": "relalg",
   "topicLabel": "אלגברה רלציונית",
   "question": "מי מהתשובות הבאות מתאימה לשאלה: \"שמות המבצעים שייצגו רק את המדינה בה הם גרים\"? הנחה: טבלת המבצעים `performers` מכילה רק פרטי האנשים המופיעים, שהופיעו לפחות פעם אחת.",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{p_name} (Performer) − Π_{P.p_name} (σ_{(P.country_name <> R.country_name) ∧ (B.b_name = R.b_name)} ((ρ_{P} Performer ⊗ ρ_{B} Band) X ρ_{R} Represent))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{P.p_name} (σ_{P.country_name = R.country_name} (ρ_{P} Performer ⊗ ρ_{B} Band X ρ_{R} Represent))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{P.p_name} (ρ_{P} Performer ⊗ ρ_{B} Band ⊗ ρ_{R} Represent) − Π_{P.p_name} (σ_{(P.country_name <> R.country_name) ∧ (B.b_name = R.b_name)} ((ρ_{P} Performer ⊗ ρ_{B} Band) X ρ_{R} Represent))"
    },
    {
     "id": "d",
     "type": "text",
     "value": "יותר מתשובה אחת עונה על השאלה"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה לא עונה על השאלה"
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "\"ייצגו רק את מדינת מגוריהם\" = כל המבצעים, פחות מי שייצג ולו פעם אחת מדינה השונה ממדינת מגוריו. גם A וגם C מבטאים נכון את ההפרש (\"כל המבצעים פחות מי שייצג מדינה זרה\"), ולכן יותר מתשובה אחת עונה על השאלה.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q16",
   "examCode": "23B-A2",
   "part": "ג",
   "topic": "relalg",
   "topicLabel": "אלגברה רלציונית",
   "question": "מה מחזירה השאילתה הבאה?\n$$Π_{R1.b_name} (σ_{(R1.b_name = R2.b_name) ∧ (R1.year <> R2.year)} (ρ_{R1} Represent X ρ_{R2} Represent))$$",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "שמות כל הלהקות שהשתתפו בתחרות לפחות פעם אחת."
    },
    {
     "id": "b",
     "type": "text",
     "value": "שמות כל הלהקות שהשתתפו בתחרות יותר מפעם אחת."
    },
    {
     "id": "c",
     "type": "text",
     "value": "שמות כל הלהקות שהשתתפו אי-פעם בתחרות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "יותר מתשובה אחת נכונה."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "השאילתה מזווגת את `Represent` עם עצמו ומחפשת אותה להקה (`R1.b_name = R2.b_name`) בשתי שנים שונות (`R1.year <> R2.year`) — כלומר להקות שהשתתפו ביותר משנה/תחרות אחת.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "24B-A-ra",
   "question": "מי מהתשובות הבאות מתאימה לשאלה: \"שמות חברי הספרייה, אשר השאילו לפחות ספר אחד מאת מחבר 'Rowling' וגם לפחות ספר אחד מאת מחבר 'Martin'\"?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "∩ Π_{m_name} ((σ_{a_name='Rowling'} (B⊗BR⊗M))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{m_name} (σ_{a_name='Martin'} (B⊗BR⊗M))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{m_name} (σ_{a_name='Rowling' ∧ a_name='Martin'} (B⊗BR⊗M))"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{m_name}(M) − Π_{m_name} (σ_{a_name<>'Rowling' ∧ a_name<>'Martin'} (B⊗BR⊗M))"
    },
    {
     "id": "e",
     "type": "text",
     "value": "יותר מתשובה אחת עונה על השאלה."
    },
    {
     "id": "f",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "f",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "בעותק הבחינה המודפס אפשרות א׳ הודפסה חלקית ושגויה (סימן ∩ תלוי ללא אגף שמאלי, וחסר החלק של Martin); ב׳ מתייחסת רק ל-Martin; ג׳ דורשת שלאותו ספר יהיו שני מחברים (בלתי אפשרי בסכמה); ד׳ מחשבת \"או\" במקום \"וגם\". לכן אף אפשרות מודפסת אינה נכונה — התשובה הרשמית היא ו׳.",
   "id": "24B-A-Q14",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "24B-A-ra",
   "question": "מי מהתשובות הבאות מתאימה לשאלה: \"מה שמות הסופרים שמוצאם באיטליה, שכתבו ספרים בכל הז'אנרים\"?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{genre} (G) ÷ Π_{a_name, genre} (σ_{country=\"Italy\"} (A⊗B))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{genre} (G) ÷ (σ_{country=\"Italy\"} (A) ⊗ Π_{a_name, genre} (B))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{genre} (A⊗B) ∩ Π_{a_name} (Π_{a_name, genre} (σ_{country=\"Italy\"} (A⊗B)))"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{a_name} (σ_{country=\"Italy\"} (A⊗B)) − Π_{a_name} (σ_{AB.genre <> G.genre} (ρ_{AB} (σ_{country=\"Italy\"} (A⊗B)) X G))"
    },
    {
     "id": "e",
     "type": "text",
     "value": "יותר מתשובה אחת עונה על השאלה"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "חילוק: זוגות (מחבר, ז׳אנר) של ספרי מחברים איטלקים ÷ כל הז׳אנרים. בהדפסת הבחינה נפלה טעות בסדר אופרנדי החילוק שתוקנה במהלך הבחינה; לאחר התיקון התשובה הנכונה היא א׳.",
   "id": "24B-A-Q15",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "24B-A-ra",
   "question": "מה מחזירה השאילתה הבאה:  $$Π_{BR.m_id} BR − Π_{BR1.m_id} (σ_{(BR1.m_id = BR2.m_id) ∧ (BR1.ISBN = BR2.ISBN) ∧ (BR1.borrow_date <> BR2.borrow_date)} (ρ_{BR1} BR X ρ_{BR2} BR))$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מזהי חברי הספרייה, שלא השאילו את אותו הספר יותר מפעם אחת, כולל שלא השאילו ספרים כלל."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מזהי חברי הספרייה, שלא השאילו ספרים כלל."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מזהי חברי הספרייה, שהשאילו יותר מספר אחד, כולל את אותו הספר יותר מפעם אחת."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מזהי חברי הספרייה, שהשאילו את אותו הספר לפחות פעמיים."
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "e",
   "acceptedIds": [
    "e",
    "a"
   ],
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "התקבלו ה' וגם א'.",
   "id": "24B-A-Q16",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "24B-A-ra",
   "question": "מה נקבל ב-RES? **הערה:** ההנחה היא, כי אין שני תאריכים זהים בטבלת Borrow.",
   "code": "MBD ← Π borrow_date BR1 − Π BR1.borrow_date (σ (BR1.borrow_date > BR2.borrow_date) (ρ BR1 BR X ρ BR2 BR))\nRES ← Π title (σ borrow_date=MBD.borrow_date ((B ⊗ BR) X MBD))",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "שם הספר שהושאל ראשון."
    },
    {
     "id": "b",
     "type": "text",
     "value": "שם הספר שהושאל אחרון."
    },
    {
     "id": "c",
     "type": "text",
     "value": "שם הספר שהשאילו אותו יותר מפעם אחד."
    },
    {
     "id": "d",
     "type": "text",
     "value": "שם הספר שהשאילו אותו יותר מכל ספר אחר."
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "MBD מחזירה את תאריך ההשאלה המינימלי (המוקדם ביותר), ו-RES מחזירה את שם הספר שהושאל בתאריך זה — כלומר הספר שהושאל ראשון.",
   "id": "24B-A-Q17",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית"
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "25B-A-ra",
   "question": "מי מהתשובות הבאות מתאימה לשאילתה: \"מה מזהה המורה שקיבל את ציון יכולת ההוראה הנמוך ביותר\"?\nהשלימו את החלקים החסרים (1) ו-(2) בשאילתה:\n$$(1)  Π_{T1.id}(σ_{T1.teach_grade  (2)  T2.teach_grade}(ρ_{T1}(teacher) X ρ_{T2}(teacher)))$$",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "‏(1):  Π_{id}(teacher) −      (2):  >"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "‏(1):  Π_{id}(teacher) X      (2):  <"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "‏(1):  Π_{id}(teacher) −      (2):  <"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "‏(1):  Π_{id}(teacher) X      (2):  >"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות"
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "כדי לקבל את המורה בעל הציון הנמוך ביותר: כל מזהי המורים פחות אלו שקיים מורה עם ציון נמוך מהם. לכן חלק (1) = `Π_id(teacher) −` (הפרש) וחלק (2) = `>` (T1 גבוה מ-T2). לכן תשובה A.",
   "confidence": "high",
   "id": "25B-A-Q13",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "25B-A-ra",
   "question": "נתונות ההגדרות הבאות:\n$$TRes <- σ_{T1.teach_grade > T2.teach_grade}(ρ_{T1}(teacher) X ρ_{T2}(teacher))$$\n$$TR1 <- Π_{T1.teach_grade}(TRes) ∩ Π_{T2.teach_grade}(TRes)$$\n$$TR2 <- Π_{teach_grade}(teacher) − TR1$$\nמה נקבל ב-`TR2`?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "ציון יכולת ההוראה הנמוך ביותר"
    },
    {
     "id": "b",
     "type": "text",
     "value": "ציון יכולת ההוראה הגבוה ביותר"
    },
    {
     "id": "c",
     "type": "text",
     "value": "ציון יכולת ההוראה הנמוך ביותר וגם ציון יכולת ההוראה הגבוה ביותר"
    },
    {
     "id": "d",
     "type": "text",
     "value": "כל ציוני יכולת ההוראה למעט הציון הנמוך ביותר והציון הגבוה ביותר"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מאפשרויות"
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "‏TRes מכיל זוגות שבהם `T1.teach_grade > T2.teach_grade`. Π על T1 נותן את כל הציונים פרט למינימלי; Π על T2 נותן את כל הציונים פרט למקסימלי; החיתוך TR1 = הציונים האמצעיים. לכן TR2 = כל הציונים − האמצעיים = הציון הנמוך ביותר וגם הגבוה ביותר.",
   "confidence": "high",
   "id": "25B-A-Q14",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "25B-A-ra",
   "question": "השאלה היא: \"מהו המספר המזהה של המורה שמלמד בשיעורים פרטיים את כל התלמידים שגילם מעל 35?\"\nלרשותכם פעולות באלגברת היחסים: הפרש, חיתוך, איחוד, חילוק, שינוי שם.\nבכמה מפעולות הנ\"ל תצטרכו להשתמש בכדי לענות על השאלה? (כל שאר הפעולות באלגברת היחסים, אשר לא נזכרות כאן, ניתנות לשימוש חופשי ואינן משתתפות בספירה). שימוש באותה הפעולה יותר מפעם אחת – נספרת רק פעם אחת.",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "0"
    },
    {
     "id": "b",
     "type": "text",
     "value": "1"
    },
    {
     "id": "c",
     "type": "text",
     "value": "2"
    },
    {
     "id": "d",
     "type": "text",
     "value": "3"
    },
    {
     "id": "e",
     "type": "text",
     "value": "4"
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "\"מורה שלימד בשיעורים פרטיים את כל התלמידים מעל גיל 35\" דורש חילוק (÷), ובנוסף שינוי-שם (ρ) כדי להתאים את `id` ל-`student_id`. סה\"כ 2 פעולות מתוך הרשימה — לכן C.",
   "confidence": "high",
   "id": "25B-A-Q15",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "25B-A-q16",
   "question": "נתונים שני יחסים R, S בעלי סכמה זהה (ראו טבלאות). נתונה השאילתה:\n$$σ_{R.A ≤ 2}(Π_{A,B}(R) ⊗ Π_{B,C}(S))$$\nכמה שורות וכמה עמודות תכיל תוצאת השאילתה? (`⊗` — צירוף טבעי)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "עשר שורות וארבע עמודות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "עשר שורות ושלוש עמודות."
    },
    {
     "id": "c",
     "type": "text",
     "value": "שבע שורות וארבע עמודות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "שבע שורות ושלוש עמודות."
    },
    {
     "id": "e",
     "type": "text",
     "value": "שלוש עשרה שורות ושלוש עמודות."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "‏Π(A,B)(R) = {(2,2),(1,2),(3,2),(2,5)}; Π(B,C)(S) = {(5,7),(2,5),(6,5),(2,3),(2,2)}. החיבור הטבעי על B נותן 10 שורות (9 עבור B=2 ועוד 1 עבור B=5) ו-3 עמודות (A,B,C). לאחר σ_{R.A ≤ 2} נותרות 7 שורות ו-3 עמודות.",
   "confidence": "high",
   "id": "25B-A-Q16",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "question": "מה עושה השאילתה הבאה? בחרו את התשובה הנכונה ביותר:\n$$Π_{student_id}(group_lesson ⊗ private_lesson)$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מחזירה את מזהי התלמידים שלומדים גם שיעור קבוצתי וגם שיעור פרטי."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מחזירה את מזהי התלמידים שלומדים שיעור קבוצתי בנושא מסוים ושיעור פרטי אצל אותו מורה, לא בהכרח באותו נושא."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מחזירה את מזהי התלמידים שלומדים שיעור קבוצתי אצל מורה מסוים ולוקחים אצל אותו מורה שיעור פרטי באותו נושא, לא בהכרח באותו הערוץ (בזום או לא בזום)."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מחזירה את מזהי התלמידים שלומדים שיעור קבוצתי אצל מורה מסוים ולוקחים אצל אותו מורה שיעור פרטי באותו נושא, וגם באותו הערוץ (בזום או לא בזום)."
    },
    {
     "id": "e",
     "type": "text",
     "value": "השאילתה אינה תקינה."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "החיבור הטבעי (⊗) בין `group_lesson` ל-`private_lesson` מתבצע על התכונות המשותפות: `lesson_id` (אותו נושא), `teacher_id` (אותו מורה) ו-`is_zoom` (אותו ערוץ). לכן מתקבלים תלמידים שלשיעור הפרטי שלהם אותם נושא, מורה וערוץ כמו שיעור קבוצתי קיים.",
   "confidence": "high",
   "contextId": "25C-A-ra",
   "id": "25C-A-Q13",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "question": "מי מבין השאילתות הבאות תחזיר תשובה לשאלה: \"מה שם התלמיד שגר בחולון ולומד שיעור פרטי בזום ממורה שמתגורר בחולון\"?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{name} σ_{student.city = \"חולון\" ∧ teacher.city = student.city ∧ is_zoom = True}(private_lesson X student X teacher)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{name} σ_{student.city = \"חולון\" ∧ teacher.city = student.city ∧ is_zoom = True}(private_lesson X student ⊗ teacher)"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{name} σ_{student.city = \"חולון\" ∧ teacher.city = \"חולון\" ∧ is_zoom = True}(private_lesson X student X teacher)"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{name} σ_{student.city = \"חולון\" ∧ teacher.city = student.city ∧ is_zoom = True ∧ student.id = student_id ∧ teacher.id = teacher_id}(private_lesson X student X teacher)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהאפשרויות."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "כשמשתמשים במכפלה קרטזית (X) חייבים להוסיף בתנאי הבחירה את תנאֵי החיבור: `student.id = student_id` ו-`teacher.id = teacher_id` — אחרת מתקבלים צירופים שגויים. רק D כולל אותם.",
   "confidence": "high",
   "contextId": "25C-A-ra",
   "id": "25C-A-Q14",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "question": "\"החזירו את כל המורים שמעולם לא לימדו את הסטודנטים מעיר מגוריהם\". השאלה דורשת:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הפרש"
    },
    {
     "id": "b",
     "type": "text",
     "value": "חיתוך"
    },
    {
     "id": "c",
     "type": "text",
     "value": "איחוד"
    },
    {
     "id": "d",
     "type": "text",
     "value": "חילוק"
    },
    {
     "id": "e",
     "type": "text",
     "value": "שינוי שם"
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "\"כל המורים\" פחות \"מורים שכן לימדו תלמיד מעירם\" = פעולת הפרש (מינוס) בין שתי הקבוצות.",
   "confidence": "high",
   "id": "25C-A-Q15",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "question": "נתונים שני יחסים R, S בעלי סכמה זהה (ראו טבלאות). נתונה השאילתה:\n$$Π_{A,B}(R) ÷ Π_{A}(S)$$\nכמה שורות וכמה עמודות תכיל תוצאת השאילתה?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "שורה 1 ועמודה 1."
    },
    {
     "id": "b",
     "type": "text",
     "value": "2 שורות ועמודה 1."
    },
    {
     "id": "c",
     "type": "text",
     "value": "שורה 1 ו-2 עמודות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "2 שורות ו-2 עמודות."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות."
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "‏Π(A,B)(R) = {(2,2),(1,2),(3,2),(2,5)} ו-Π(A)(S) = {1,2,3}. בחלוקה נשארות עמודות B בלבד; רק B=2 מופיע יחד עם כל ערכי A מהמחלק — לכן התוצאה היא {(2)}: שורה אחת ועמודה אחת.",
   "confidence": "high",
   "contextId": "25C-A-q16",
   "id": "25C-A-Q16",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "25S-B-ra",
   "question": "מה עושה השאילתה הבאה? (`⋈` — מסמן צירוף טבעי)\n$$Π_{courier_id}(delivery ⋈ package)$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מחזירה את מזהי השליחים שביצעו משלוח אחד לפחות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מחזירה את מזהי השליחים שביצעו משלוחים רק של חבילות ברמת עדיפות גבוהה."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מחזירה את כל השליחים שלא ביצעו משלוחים כלל."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מחזירה את כל החבילות ששויכו לשליח."
    },
    {
     "id": "e",
     "type": "text",
     "value": "השאילתה אינה תקינה."
    }
   ],
   "correctId": "a",
   "explanation": "החיבור הטבעי בין `delivery` ל-`package` מתבצע על `pkg_id`, וההיטל על `courier_id` מחזיר את מזהי השליחים המופיעים במשלוחים — כלומר שליחים שביצעו לפחות משלוח אחד.",
   "confidence": "high",
   "id": "25S-B-Q13",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": false
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "25S-B-ra",
   "question": "מי מבין השאילתות הבאות מחזירה את שמות הלקוחות מתל אביב שקיבלו משלוח אקספרס שנשלח ע\"י שליח מאותו אזור?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{name} σ_{customer.city = 'תל אביב' ∧ courier.region = customer.city ∧ is_express = True}(delivery × package × customer × courier)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{name} σ_{customer.city = 'תל אביב' ∧ is_express = True ∧ courier.region = customer.city ∧ customer.cust_id = package.recipient_id ∧ delivery.pkg_id = package.pkg_id ∧ courier.courier_id = delivery.courier_id}(delivery × package × customer × courier)"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{name} σ_{customer.city = 'תל אביב' ∧ courier.region = 'תל אביב' ∧ is_express = True}(delivery × package × customer × courier)"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{name} σ_{customer.city = 'תל אביב' ∧ courier.region = customer.city ∧ is_express = True ∧ courier.courier_id = delivery.courier_id}(delivery × package × customer × courier)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהאפשרויות."
    }
   ],
   "correctId": "b",
   "explanation": "כשמשתמשים במכפלה קרטזית (×) חובה לכלול בתנאי הבחירה את **כל** תנאֵי החיבור: `customer.cust_id = package.recipient_id`, `delivery.pkg_id = package.pkg_id` ו-`courier.courier_id = delivery.courier_id`, לצד `city='תל אביב'`, `courier.region = customer.city` ו-`is_express = True`. רק B כוללת את כולם.",
   "confidence": "high",
   "id": "25S-B-Q14",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": false
  },
  {
   "part": "ג",
   "topic": "relalg",
   "question": "בהינתן היחסים `works(courier_id, region)` (שליחים והאזורים שבהם הם עובדים) ו-`regions(region)` (כל האזורים הקיימים במערכת), מה מחזירה השאילתה $$works ÷ regions$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "תחזיר את כל המזהים של כל השליחים שעובדים לפחות באזור אחד."
    },
    {
     "id": "b",
     "type": "text",
     "value": "תחזיר את המזהים של כל השליחים שעובדים בכל האזורים הקיימים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "תחזיר את כל האזורים שבהם עובד לפחות שליח אחד."
    },
    {
     "id": "d",
     "type": "text",
     "value": "תחזיר את כל השליחים שלא עובדים באף אזור."
    },
    {
     "id": "e",
     "type": "text",
     "value": "השאילתה אינה תקינה."
    }
   ],
   "correctId": "b",
   "explanation": "פעולת החילוק `works ÷ regions` מחזירה את מזהי השליחים המשויכים ל-**כל** האזורים המופיעים ב-`regions` — כלומר שליחים שעובדים בכל האזורים הקיימים.",
   "confidence": "high",
   "id": "25S-B-Q15",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": false
  },
  {
   "part": "ג",
   "topic": "relalg",
   "question": "מה מחזירה השאילתה:\n$$Π_{pkg_id}(σ_{is_express=True}(delivery)) ∩ Π_{pkg_id}(σ_{is_express=False}(delivery))$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "חבילות שנשלחו גם באקספרס וגם לא באקספרס."
    },
    {
     "id": "b",
     "type": "text",
     "value": "חבילות שנשלחו רק באקספרס."
    },
    {
     "id": "c",
     "type": "text",
     "value": "חבילות שלא נשלחו כלל."
    },
    {
     "id": "d",
     "type": "text",
     "value": "חבילות שהוחזרו למשלוח חוזר."
    },
    {
     "id": "e",
     "type": "text",
     "value": "השאילתה אינה תקינה."
    }
   ],
   "correctId": "a",
   "explanation": "החיתוך בין מזהי החבילות שנשלחו באקספרס לבין אלו שנשלחו שלא באקספרס מחזיר חבילות שנשלחו בשני האופנים — גם באקספרס וגם לא באקספרס (חבילה יכולה להישלח ביותר ממשלוח אחד).",
   "confidence": "high",
   "id": "25S-B-Q16",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-A-sql",
   "question": "נתונה השאילתה הבאה. סמן את השאלה (מנוסחת בשפה טבעית) המתאימה ביותר לשאילתה. (הערה: במהלך המבחן תוקנה טעות כתיב — `a_name`/`a_city` → `p_name`/`p_city`.)",
   "code": "Select P1.p_name, P1.p_gender, P1.p_city\nFrom person as P1\nWhere not Exists (Select P2. p_age\n                  From person as P2\n                  Where P2.p_age < P1. P_age)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הצג שמות אנשים וערים בבסיס הנתונים, בהן יש אדם בעל גיל מינימלי ביחס לכל האנשים בבסיס הנתונים."
    },
    {
     "id": "b",
     "type": "text",
     "value": "הצג שמות אנשים בעלי הגיל המינימלי ביחס לכל המועמדים בבסיס הנתונים. ולכל אדם כזה, הצג את המגדר אליו שייך ואת שם העיר בה הוא גר."
    },
    {
     "id": "c",
     "type": "text",
     "value": "חשב את הערך הגדול ביותר של גילו של אדם, והצג את שמו, המגדר שלו ושם עיר מגוריו."
    },
    {
     "id": "d",
     "type": "text",
     "value": "השאילתה כתובה באופן שגוי, ולכן אי אפשר לנסח בשפה טבעית שאלה מתאימה."
    }
   ],
   "correctId": "b",
   "confidence": "medium",
   "explanation": "NOT EXISTS על מישהו צעיר יותר → מחזירה את בעלי הגיל המינימלי, ולכל אחד את המגדר ועיר המגורים. (בעותק המקורי הופיעו a_name/a_city שתוקנו ל-p_name/p_city במהלך המבחן.)",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q10",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-A-sql",
   "question": "נתונה השאילתה הבאה. סמן את השאלה (מנוסחת בשפה טבעית) המתאימה ביותר לשאילתה:",
   "code": "Select H1.h_name\nFrom hobby as H1\nWhere NOT Exists (Select P1.p_id\n                  From person where P1.p_id NOT IN\n                      (Select C1. p_id From capable as C1 Where C1.h_code = H1. h_code) )",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הציגו שם תחביב אתגרי, עבורו אין אדם (person) בבסיס הנתונים שמסוגל לעסוק בתחביב זה."
    },
    {
     "id": "b",
     "type": "text",
     "value": "הציגו שם תחביב לא פופולרי, עבורו אין אדם (person) בבסיס הנתונים שמעוניין לעסוק בתחביב זה."
    },
    {
     "id": "c",
     "type": "text",
     "value": "הציגו שם תחביב פופולרי במיוחד, עבורו אין אדם (person) בבסיס הנתונים שאינו מעוניין לעסוק בתחביב זה."
    },
    {
     "id": "d",
     "type": "text",
     "value": "השאילתה כתובה באופן שגוי, ולכן אי אפשר לנסח בשפה טבעית שאלה מתאימה."
    }
   ],
   "correctId": "d",
   "confidence": "high",
   "explanation": "ב-P1 לא מוגדר יחס ב-FROM (השאילתה כתובה שגוי), וגם אף ניסוח אחר אינו מתאים. (הכוונה היתה לחילוק: תחביב שכל האנשים מסוגלים לעסוק בו.)",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q11",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-A-sql",
   "question": "נתונות 3 הצעות פתרון עבור השאלה: \"הציגו את גילו המקסימלי של אדם מבסיס הנתונים, את שמו ואת המגדר אליו משתייך\". סמנו את הטענה הנכונה:",
   "code": "-- פתרון 1:\nSelect p_age, p_name, p_gender\nFrom person\nWhere p_age >= all (Select p_age  From person)\n\n-- פתרון 2:\nSelect max(p_age), p_name, p_gender\nFrom person\n\n-- פתרון 3:\nSelect p_age, p_name, p_gender\nFrom person\nWhere p_age = any (Select max(p_age) From person)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "פתרון 1 ופתרון 3 נכונים."
    },
    {
     "id": "b",
     "type": "text",
     "value": "פתרון 1 ופתרון 2 נכונים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "כל שלושת הפתרונות נכונים."
    },
    {
     "id": "d",
     "type": "text",
     "value": "רק פתרון 2 נכון."
    },
    {
     "id": "e",
     "type": "text",
     "value": "רק פתרון 3 נכון."
    }
   ],
   "correctId": "a",
   "confidence": "high",
   "explanation": "פתרונות 1 (>= all) ו-3 (= any (max)) נכונים. פתרון 2 שגוי — max ללא GROUP BY יחד עם עמודות נוספות (p_name, p_gender).",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q12",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-A-sql",
   "question": "נתונה הצעת פתרון לשאלה: \"עבור כל זוג של עיר ותחביב, הצג את מספר האנשים מהעיר המסוגלים לעסוק בתחביב\". בפתרון חסר הקטע המסומן __ (V) __. החלק החסר __ (V) __ הוא:",
   "code": "Select  p_city, h_code, count(p_id)\n____(V)___",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "אף תשובה אינה נכונה."
    },
    {
     "id": "b",
     "type": "code",
     "value": "From person JOIN capable USING(p-id) Group by p_city, h_code"
    },
    {
     "id": "c",
     "type": "code",
     "value": "From person JOIN capable USING(p-id)  Group by p_city"
    },
    {
     "id": "d",
     "type": "code",
     "value": "From person JOIN capable USING(p-id) Order by p_city, h_code"
    }
   ],
   "correctId": "b",
   "confidence": "high",
   "explanation": "לכל זוג (עיר, תחביב) יש לקבץ לפי שתי התכונות ולספור, ולכן Group by p_city, h_code.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q13",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-A-sql",
   "question": "בפתרון המוצע עבור השאלה: \"הצג את שמות התחביבים בבסיס הנתונים שמספר הרוצים לעסוק בהם זהה למספר המסוגלים לעסוק בהם\", חסר הקטע המסומן __ (I) __. הפתרון מורכב משלוש שאילתות (`into inter2` / `into cap2` נותנים שם ליחס תוצאה, בדומה ל-`Create View`). מהו הקטע החסר __ (I) __?",
   "code": "-- שאילתה 1:\nSelect hobby.h_code, hobby.h_name, count(p_id) as interest_num into inter2\nFrom interested JOIN hobby Using(h_code)\nGroup by hobby.h_code, hobby.h_name\n\n-- שאילתה 2:\nSelect hobby.h_code, hobby.h_name, count(p_id) as capable_num into cap2\nFrom capable JOIN hobby Using(h_code)\nGroup by hobby.h_code, hobby.h_name\n\n-- שאילתה 3:\nSelect inter2.h_name\nFrom inter2, cap2\nWhere __ (I) __",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "inter2. interest _num = cap2. capable_num"
    },
    {
     "id": "b",
     "type": "code",
     "value": "inter2.h_code=cap2.h_code and inter2.interest_num = cap2.capable_num"
    },
    {
     "id": "c",
     "type": "code",
     "value": "inter2.h_code=cap2. h_code and inter2.interest_num != cap2. capable_num"
    },
    {
     "id": "d",
     "type": "code",
     "value": "not exists (inter2. h_code = cap2. h_code and inter2. interest_num = cap2. capable_num)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה לא נכונה."
    }
   ],
   "correctId": "b",
   "confidence": "high",
   "explanation": "כיוון שאין שימוש ב-JOIN, יש לצרף את שתי הטבלאות על h_code (השוויון הראשון), וכן לבדוק שמספר הרוצים לעסוק שווה למספר המסוגלים (השוויון השני).",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q5",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-A-sql",
   "question": "האם השאילתה הבאה עונה על הדרישה: \"הצג לכל קוד תחביב בבסיס הנתונים את מספר המתעניינים בתחביב, אך אינם ממוסגלים לעסוק בו\". מהי הטענה הנכונה:",
   "code": "Select interested.h_code, count(intersted.p_id)\nFrom interested, capable\nWhere interested.p_id=capable.p_id and interested.h_code != capable.h_code\nGroup by interested.h_code",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "השאילתה נכונה ומדוייקת."
    },
    {
     "id": "b",
     "type": "text",
     "value": "השאילתה נכונה, אך ניתן היה לכתוב אותה עם JOIN בצורה אחרת."
    },
    {
     "id": "c",
     "type": "text",
     "value": "השאילתה נכונה, אבל מחזירה רק את מספר המתעניינים במידה והיה לפחות מתעניין אחד."
    },
    {
     "id": "d",
     "type": "text",
     "value": "השאילתה שגוייה"
    }
   ],
   "correctId": "d",
   "confidence": "high",
   "explanation": "השאילתה שגויה — התנאי בודק p_id שווה ו-h_code שונה, ולכן סופרת התאמות ל-h_code אחר, ולא בודקת שהאדם אינו מסוגל לעסוק בתחביב הנבדק.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q6",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-A-sql",
   "question": "רוצים למצוא: \"מגדר עבורו ממוצע הגילאים של הנרשמים למועדון (person) הוא הגדול ביותר\". נתונה הצעת פתרון בה חסר החלק המסומן __ (II) __ (`INTO` פועל בדומה ל-`Create View`). מהו הקטע החסר __ (II) __?",
   "code": "Select person.p_gender as gender, avg(person.p_age) as avg_age into average_age_per_gender\nFrom person\nGroup by person.p_gender\n\nSelect AG1.gender\nFrom average_age_per_gender as AG1, ___(II)___",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "Where AG1.avg_age> = max(avg(person.p_age))"
    },
    {
     "id": "b",
     "type": "code",
     "value": "average_age_per_gender as AG2  Where AG1.avg_age > AG2.avg_age"
    },
    {
     "id": "c",
     "type": "code",
     "value": "Where not exists(Select avg_age From average_age_per_gender as AG2 Where AG2. avg_age< AG1.avg_age)"
    },
    {
     "id": "d",
     "type": "text",
     "value": "אף תשובה לא נכונה."
    }
   ],
   "correctId": "b",
   "acceptedIds": [
    "b",
    "d"
   ],
   "confidence": "high",
   "explanation": "פתרון B מצרף את הטבלה לעצמה ומחזיר את המגדר בעל הממוצע הגדול. אם יש רק שני מגדרים B יעבוד, אך התשובה אינה חד-משמעית ולכן ניתן ניקוד מלא גם על D. (פתרון C שגוי: בגלל NOT EXISTS הוא מחזיר את המינימלי ולא את המקסימלי.)",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q7",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-A-sql",
   "question": "נתון פתרון מוצע עבור השאלה: \"הצג לכל קוד תחביב את שמות האנשים (person) המתעניינים בתחביב וגם מסוגלים לעסוק בו. קודי התחביבים יוצגו בסדר עולה, ושמות האנשים העונים על הדרישה יוצגו בסדר יורד\". בפתרון חסר הקטע המסומן __ (III) __. הקטע החסר __ (III) __ הוא:",
   "code": "Select hobby.hobby_code, person.p_name\nFrom person, interested, capable\nWhere interested.p_id = person.p_id and interested.p_id = capable.p_id\n      and capable.h_code = interested.h_code\n____ (III) ____",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הקטע ___ (III) ___ מיותר. אין צורך לרשום דבר."
    },
    {
     "id": "b",
     "type": "code",
     "value": "Group by interested.h_code, person.p_name"
    },
    {
     "id": "c",
     "type": "code",
     "value": "Order by interested.h_code desc, person.p_name"
    },
    {
     "id": "d",
     "type": "code",
     "value": "Order by interested.h_code, person.p_name desc"
    },
    {
     "id": "e",
     "type": "code",
     "value": "Order by person.p_name desc, interested.h_code"
    }
   ],
   "correctId": "d",
   "acceptedIds": [
    "d",
    "e"
   ],
   "confidence": "high",
   "explanation": "קודי התחביב בסדר עולה ושמות האנשים בסדר יורד → Order by interested.h_code, person.p_name desc. התקבלה גם E, כיוון שלא צוין במפורש מה למיין קודם.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q8",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-A-sql",
   "question": "עבור השאלה: \"הצג שמות תחביבים מבסיס הנתונים אשר אף אדם (person) אינו מעוניין לעסוק בהם\", מוצעים הפתרונות הבאים. סמן את הטענה המתאימה:",
   "code": "-- פתרון 1:\nSelect hobby.h_name From hobby\nWhere hobby.h_code NOT IN (select interested.h_code from interested)\n\n-- פתרון 2:\nSelect hobby.h_name From hobby, interested\nWhere hobby.h_code= interested.h_code and interested.h_code_id NOT IN\n      (Select hobby.h_code From hobby)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "רק פתרון 1 נכון."
    },
    {
     "id": "b",
     "type": "text",
     "value": "רק פתרון 2 נכון."
    },
    {
     "id": "c",
     "type": "text",
     "value": "שני הפתרונות נכונים."
    },
    {
     "id": "d",
     "type": "text",
     "value": "שני הפתרונות שגויים."
    }
   ],
   "correctId": "a",
   "confidence": "high",
   "explanation": "בפתרון 2 בדיקת ה-NOT IN היא מול כלל התחביבים (hobby) ולא מול אלו שמעוניינים בהם, ולכן הוא שגוי. רק פתרון 1 נכון.",
   "official": true,
   "answerSource": "solution-pdf",
   "id": "21B-A-Q9",
   "examCode": "21B-A",
   "examLabel": "2021 סמסטר ב׳ מועד א׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "שאלה משותפת ל-10 ו-11: \"מצא קודי הפרות אשר כמות החלב שלהן ייחודית\" (כלומר, אין שום פרה אחרת שהניבה אותה כמות חלב). נתונות שתי הצעות פתרון, שתיהן נכונות, ובכל אחת חסר קטע. מהו הקטע החסר __(5)__ בשאילתה 1?",
   "code": "-- שאילתה 1:\nSelect mp.cow_id\nFrom milk_product as mp\nWhere __(5)__ (select *\n     From milk_product as mp2\n     Where mp.amount=mp2.amount\n     and mp.cow_id =! mp2.cow_id)\n\n-- שאילתה 2:\nSelect mp1.cow_id\nFrom milk_product as mp1\nWhere (select count(mp2.cow_id) from milk_product as mp2\n       Where mp1.amount=mp2.amount) __(6)__",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "mp.amount !="
    },
    {
     "id": "b",
     "type": "code",
     "value": "IN"
    },
    {
     "id": "c",
     "type": "code",
     "value": "NOT IN"
    },
    {
     "id": "d",
     "type": "code",
     "value": "Exists"
    },
    {
     "id": "e",
     "type": "code",
     "value": "NOT Exists"
    }
   ],
   "correctId": "e",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "התנאי \"כמות ייחודית\" פירושו שלא קיימת פרה אחרת עם אותה כמות → `Where NOT Exists (...)` → E (אומת לוגית). הסטודנט סימן במקביל גם D בטעות. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q10",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "שאלה משותפת ל-10 ו-11: \"מצא קודי הפרות אשר כמות החלב שלהן ייחודית\" (כלומר, אין שום פרה אחרת שהניבה אותה כמות חלב). נתונות שתי הצעות פתרון, שתיהן נכונות, ובכל אחת חסר קטע. מהו הקטע החסר __(6)__ בשאילתה 2?",
   "code": "-- שאילתה 1:\nSelect mp.cow_id\nFrom milk_product as mp\nWhere __(5)__ (select *\n     From milk_product as mp2\n     Where mp.amount=mp2.amount\n     and mp.cow_id =! mp2.cow_id)\n\n-- שאילתה 2:\nSelect mp1.cow_id\nFrom milk_product as mp1\nWhere (select count(mp2.cow_id) from milk_product as mp2\n       Where mp1.amount=mp2.amount) __(6)__",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "Group by mp1.cow_id"
    },
    {
     "id": "b",
     "type": "code",
     "value": "=1"
    },
    {
     "id": "c",
     "type": "text",
     "value": "לא חסר כלום."
    },
    {
     "id": "d",
     "type": "code",
     "value": ";"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "תת-השאילתה סופרת כמה פרות בעלות אותה כמות חלב; לייחודיות הספירה חייבת להיות בדיוק 1 (רק הפרה עצמה) → `=1` → B. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q11",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "נתונה השאילתה הבאה. סמנו את השאלה (מנוסחת בשפה טבעית) המתאימה ביותר לשאילתה הנתונה:",
   "code": "Select c.cow_id\nFrom cow as c\nWhere not exists (select mother_of.mom_id\n     From mother_of\n     Where c.cow_id=mother_of.mom_id)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הציגו קודי פרות שאין להן בנות בבסיס הנתונים."
    },
    {
     "id": "b",
     "type": "text",
     "value": "הציגו קודי פרות שאין להן אימהות בבסיס הנתונים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "הציגו קודי פרות שיש להן בת אחת בבסיס הנתונים."
    },
    {
     "id": "d",
     "type": "text",
     "value": "השאילתה כתובה באופן שגוי, ולכן אי אפשר לנסח בשפה טבעית שאלה מתאימה."
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "`mother_of.mom_id = c.cow_id` מתקיים כאשר הפרה היא אם; `NOT EXISTS` בוחר פרות שאינן אם של אף פרה — כלומר פרות שאין להן בנות → A. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q12",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "מי מהשאילתות הבאות שקולות לשאילתה הנתונה בשאלה 12?",
   "code": "-- שאילתה 1:\nSelect cow_id\nFrom cow\nWhere cow_id not in (select mom_id From mother_of)\n\n-- שאילתה 2:\nSelect c.cow_id\nFrom cow as c\nWhere c.cow_id not in (select mother_of.mom_id\n     From mother_of\n     Where c.cow_id=mother_of.mom_id)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "רק שאילתה 1 שקולה לשאילתה הנתונה."
    },
    {
     "id": "b",
     "type": "text",
     "value": "רק שאילתה 2 שקולה לשאילתה הנתונה."
    },
    {
     "id": "c",
     "type": "text",
     "value": "שתי השאילתות (כל אחת בנפרד) שקולות לשאילתה הנתונה."
    },
    {
     "id": "d",
     "type": "text",
     "value": "אין שאילתה השקולה לשאילתה הנתונה."
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "שאילתה 12 מוצאת פרות שאינן אמהות. שאילתה 1 (`cow_id not in (select mom_id...)`) שקולה. שאילתה 2 עם `NOT IN` מתואם: תת-השאילתה מחזירה {c.cow_id} כשהפרה אמא (→ מסוננת) או קבוצה ריקה כשאינה אמא (→ נכללת), ולכן גם היא שקולה. שתי השאילתות שקולות → C. (הסטודנט סימן A מתוך חשש שנדרש NOT EXISTS, אך ה-NOT IN המתואם תקין כאן.) (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q13",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "שאלה משותפת ל-14 ו-15: לבסיס הנתונים נוספה תבנית היחס `food_of(cow_id, food_code)` (קשר בין פרה למזון שהיא אוכלת). השאילתה מציגה מספר זהות של פרה אשר אוכלת את כל המזונות שאוכלת הפרה \"נחמה\". בשאילתה חסרים קטעי תיעוד (הסבר) המסומנים __(7)__ ו-__(8)__. מהו קטע התיעוד החסר __(7)__?",
   "code": "SELECT distinct food1.cow_id\nFROM food_of as food1        -- שורה תורנית המתייחסת לפרה הנבדקת\nWhere not Exists ( Select food2.food_code\n     From cow, food_of as food2\n     Where cow.nickname = \"נחמה\" and cow.cow_id= food2.cow_id     -- __(7)__\n     and food2.food_code not IN\n          (SELECT distinct food3.food_code\n           FROM food_of as food3\n           WHERE food1.cow_id = food3.cow_id) )     -- __(8)__",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "בחירת קוד מזון של הפרה \"נחמה\"."
    },
    {
     "id": "b",
     "type": "text",
     "value": "בחירת קוד מזון של הפרה הנבדקת."
    },
    {
     "id": "c",
     "type": "text",
     "value": "בחירת קוד מזון של פרה כלשהי בבסיס הנתונים."
    },
    {
     "id": "d",
     "type": "text",
     "value": "לא ניתן לנסח תיאור מתאים לקטע החסר כיוון שיש שגיאה בקוד."
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "השורה `cow.nickname = \"נחמה\" and cow.cow_id = food2.cow_id` בוחרת את קודי המזון של הפרה \"נחמה\" → A. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q14",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "שאלה משותפת ל-14 ו-15: לבסיס הנתונים נוספה תבנית היחס `food_of(cow_id, food_code)` (קשר בין פרה למזון שהיא אוכלת). השאילתה מציגה מספר זהות של פרה אשר אוכלת את כל המזונות שאוכלת הפרה \"נחמה\". בשאילתה חסרים קטעי תיעוד (הסבר) המסומנים __(7)__ ו-__(8)__. מהו קטע התיעוד החסר __(8)__?",
   "code": "SELECT distinct food1.cow_id\nFROM food_of as food1        -- שורה תורנית המתייחסת לפרה הנבדקת\nWhere not Exists ( Select food2.food_code\n     From cow, food_of as food2\n     Where cow.nickname = \"נחמה\" and cow.cow_id= food2.cow_id     -- __(7)__\n     and food2.food_code not IN\n          (SELECT distinct food3.food_code\n           FROM food_of as food3\n           WHERE food1.cow_id = food3.cow_id) )     -- __(8)__",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מציאת קבוצת כל קודי המזון של הפרה \"נחמה\"."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מציאת קבוצת כל קודי המזון של הפרה הנבדקת."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מציאת קבוצת כל קודי המזון של פרה כלשהי בבסיס הנתונים."
    },
    {
     "id": "d",
     "type": "text",
     "value": "לא ניתן לנסח תיאור מתאים לקטע החסר כיוון שיש שגיאה בקוד."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "תת-השאילתה `WHERE food1.cow_id = food3.cow_id` אוספת את כל קודי המזון של הפרה הנבדקת (food1) → B. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q15",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "הצג את כמות החלב המירבית שהניבה פרה ברפת, ואת קודי הפרות שהניבו כמות מירבית זו. בקוד הנתון חסר החלק המסומן __(1)__. **הערה:** `INTO` פועל בדומה ל-`Create View ViewName As`. להלן 4 פתרונות המוצעים להוות את הקטע החסר __(1)__ — סמן את הטענה המתאימה.",
   "code": "-- קוד נתון (חסר בו הקטע __(1)__):\nSelect max(amount) as max_amount INTO max_milk_product\nFrom milk-product;\n__(1)__\n\n-- פתרון 1:\nSelect cow_id, max_milk_product.max_amount\nFrom milk_product, max_milk_product\nWhere milk_product.amount=max_milk_product.max_amount\n\n-- פתרון 2:\nSelect cow_id, amount\nFrom milk_product\nWhere amount >= all (select amount from milk_product)\n\n-- פתרון 3:\nSelect cow_id, amount\nFrom milk_product\nWhere amount = any (select max_amount from max_milk_product)\n\n-- פתרון 4:\nSelect cow_id, max(amount)\nFrom milk_product",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "רק פתרון 1 נכון."
    },
    {
     "id": "b",
     "type": "text",
     "value": "רק פתרון 2 ופתרון 3 נכונים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "רק פתרון 1 ופתרון 4 נכונים."
    },
    {
     "id": "d",
     "type": "text",
     "value": "פתרון 1, 2 ו-3 נכונים."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אין אף פתרון נכון."
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "פתרונות 1, 2 ו-3 מחזירים את הפרות בעלות כמות החלב המקסימלית (בדרכים שונות); פתרון 4 שגוי — `max(amount)` יחד עם `cow_id` ללא `GROUP BY`. לכן D. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q5",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "הצג לכל קוד ביתן את כמות החלב המירבית שהניבה פרה המתגוררת בו. בקוד הנתון חסר החלק המסומן __(2)__. מהו הקטע החסר __(2)__?",
   "code": "Select block_id, max(amount)\nFrom milk_product, place_of\n__(2)__",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "Group by block_id  Where milk_product.cow_id=place_of.cow_id"
    },
    {
     "id": "b",
     "type": "code",
     "value": "Where milk_product.cow_id=place_of.cow_id"
    },
    {
     "id": "c",
     "type": "code",
     "value": "Where milk_product.cow_id=place_of.cow_id  Group by block_id"
    },
    {
     "id": "d",
     "type": "code",
     "value": "Group by block_id  Having milk_product.cow_id=place_of.cow_id"
    },
    {
     "id": "e",
     "type": "code",
     "value": "Where NOT Exists(milk_product.amount != max(amount))"
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "נדרש קודם צירוף היחסים בתנאי `milk_product.cow_id=place_of.cow_id` ואז `Group by block_id` — הסדר התקין הוא WHERE ואז GROUP BY, כלומר C. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q6",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "מי מהשאילתות הבאות עונה על הדרישה: \"הצג את קודי הביתנים בהם הגיל הממוצע של הפרות עולה על 10 חודשים\"? סמן את הטענה המתאימה.",
   "code": "-- שאילתה 1:\nSelect block_id\nFrom cow Join place_of Using(cow_id)\nWHERE (avg(age) > 10)\nGroup by block_id\n\n-- שאילתה 2:\nSelect block_id\nFrom cow, place_of\nWhere cow.cow_id=place_of.cow_id\nGroup by block_id\nHaving (avg(age) > 10)\n\n-- שאילתה 3:\nSelect block_id, avg(age)\nFrom cow Join place_of Using(cow_id)\nGroup by block_id\nWhere (avg(age) > 10)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "כל השאילתות נכונות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "כל השאילתות שגויות."
    },
    {
     "id": "c",
     "type": "text",
     "value": "רק שאילתה 1 נכונה."
    },
    {
     "id": "d",
     "type": "text",
     "value": "רק שאילתה 2 נכונה."
    },
    {
     "id": "e",
     "type": "text",
     "value": "רק שאילתה 3 נכונה."
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "שאילתות 1 ו-3 משתמשות ב-`avg(age)` בתוך `WHERE` (שגוי). רק שאילתה 2 מסננת קבוצות נכון עם `HAVING (avg(age) > 10)` → D. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q7",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "שאלה משותפת ל-8 ו-9: הצג שלשות שמות פרות היוצרות שרשרת דורות באורך 3 (סבתא, אם, נכדה), כאשר בתוך כל שרשרת תנובת החלב עולה מדור לדור. בקוד הנתון חסרים שני חלקים המסומנים __(3)__ ו-__(4)__. מהו הקטע החסר __(3)__?",
   "code": "Select c1.nickname, c2.nickname, c3.nickname\nFrom cow as c1, cow as c2, cow as c3, __(3)__,\n     milk_product as mp2, milk_product as mp3\nWhere m1.mom_id=c1.cow_id and m1.daughter_id=c2.cow_id\n__(4)__\nand m3.amount > m2.amount and m2.amount > m1.amount",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "milk_product as m1, milk_product as m2, milk_product as mp1"
    },
    {
     "id": "b",
     "type": "code",
     "value": "milk_product as mp1"
    },
    {
     "id": "c",
     "type": "code",
     "value": "mother_of as m1, mother_of as m2, milk_product as mp1"
    },
    {
     "id": "d",
     "type": "code",
     "value": "mother_of as m1, m2 JOIN milk_product as mp1"
    },
    {
     "id": "e",
     "type": "text",
     "value": "שום דבר לא חסר"
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "ה-WHERE משתמש ב-`m1.mom_id`/`m1.daughter_id` (מ-mother_of) ובחסר את `mp1`, ולכן הקטע (3) הוא `mother_of as m1, mother_of as m2, milk_product as mp1` → C. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q8",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21B-C-db",
   "question": "שאלה משותפת ל-8 ו-9: הצג שלשות שמות פרות היוצרות שרשרת דורות באורך 3 (סבתא, אם, נכדה), כאשר בתוך כל שרשרת תנובת החלב עולה מדור לדור. בקוד הנתון חסרים שני חלקים המסומנים __(3)__ ו-__(4)__. מהו הקטע החסר __(4)__?",
   "code": "Select c1.nickname, c2.nickname, c3.nickname\nFrom cow as c1, cow as c2, cow as c3, __(3)__,\n     milk_product as mp2, milk_product as mp3\nWhere m1.mom_id=c1.cow_id and m1.daughter_id=c2.cow_id\n__(4)__\nand m3.amount > m2.amount and m2.amount > m1.amount",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "and m2.mom_id=c2.cow_id"
    },
    {
     "id": "b",
     "type": "code",
     "value": "and m1.mom_id=c2.cow_id and m1.daughter_id=c3.cow_id"
    },
    {
     "id": "c",
     "type": "code",
     "value": "and m2.daughter_id=c3.cow_id"
    },
    {
     "id": "d",
     "type": "code",
     "value": "and m2.mom_id=c2.cow_id and m2.daughter_id=c3.cow_id"
    },
    {
     "id": "e",
     "type": "text",
     "value": "שום דבר לא חסר"
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "יש לקשר את הדור השני (c2, אם) לדור השלישי (c3, נכדה) דרך `m2`: `m2.mom_id=c2.cow_id and m2.daughter_id=c3.cow_id` → D. (התשובה מפתרון סטודנט — לא רשמית.)",
   "id": "21B-C-Q9",
   "examCode": "21B-C",
   "examLabel": "2021 סמסטר ב׳ מועד ג׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21S-B-schema",
   "question": "איזו מבין השאילתות הבאות תחזיר שמות לקוחות שרכשו דירה בעיר בה הם גרים כרגע ובנוסף הקבלן גר באותה עיר?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "Select  name from customer c join Purchases p using(customerid)join\nApartments a on c.city=a.city join Building_contractor ;"
    },
    {
     "id": "b",
     "type": "code",
     "value": "Select  name from customer c join Purchases p using(customerid)join\nApartments a on c.city=a.city join Building_contractor b on b.city=a.city"
    },
    {
     "id": "c",
     "type": "text",
     "value": "תשובות א' וב' עושות אותו דבר"
    },
    {
     "id": "d",
     "type": "code",
     "value": "Select  name from customer c join Apartments a on c.city=a.city join\nBuilding_contractor b on b.city=a.city"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "רק תשובה ב מצרפת נכון: לקוח→רכישה→דירה (c.city=a.city) וגם קבלן (b.city=a.city). בתשובה א חסר תנאי ה-join עם הקבלן.",
   "id": "21S-B-Q10",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21S-B-schema",
   "question": "מה הטענה הנכונה ביותר?",
   "code": "Select name, Apartments id from Building_contractor left join Apartments\nusing(contractor_id) where age<40",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "שאילתה מחזירה רק את שמות הקבלנים מתחת לגיל 40 שבנו דירה ואת מספרי הדירות שלהם."
    },
    {
     "id": "b",
     "type": "text",
     "value": "השאילתה מחזירה שמות כל הקבלנים כולם שהם מתחת לגיל 40 ולצידם את מספרי הדירות שם בנו במידה ויש קבלנים שלא בנו דירה יופיע null במספר הדירה."
    },
    {
     "id": "c",
     "type": "text",
     "value": "שאילתה מחזירה שמות קבלנים מתחת לגיל 40 שאין להם דירות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "שאילתה מחזירה שמות קבלנים מתחת לגיל 40 שבנו דירות שנרכשו ."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "LEFT JOIN שומר את כל הקבלנים מתחת לגיל 40, וקבלן שלא בנה דירה יקבל null בשדה מספר הדירה.",
   "id": "21S-B-Q11",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21S-B-schema",
   "question": "איזו שאילתה תמצא את כתובות הדירות שנרכשו כאשר שמות הלקוחות שרכשו אותם מכיל את האות a ובנוסף הלקוח שרכש אותם מעל גיל 39?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "Select address from Purchases p join Apartment a on a. Apartments id=p.\nApartments id join customer c on c.customerid=p.customerid where name like\n\"%a%\" or age >39"
    },
    {
     "id": "b",
     "type": "code",
     "value": "Select address from Purchases p join Apartment a on a. Apartments id=p.\nApartments id join customer c on c.customerid=p.customerid where name like\n\"%a%\" and age >39"
    },
    {
     "id": "c",
     "type": "code",
     "value": "Select address from Purchases p  join customer c on\nc.customerid=p.customerid where name like \"%a%\" and age >39"
    },
    {
     "id": "d",
     "type": "code",
     "value": "Select address from Purchases ,Apartment , customer  where name like \"%a%\"\nand age >39"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "יש לצרף Purchases→Apartment→customer ולסנן name like \"%a%\" AND age>39. תשובה א משתמשת ב-OR, תשובה ג חסרה את הצירוף ל-Apartment, ותשובה ד מבצעת מכפלה קרטזית ללא תנאי צירוף.",
   "id": "21S-B-Q12",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21S-B-schema",
   "question": "איזו שאילתה תחזיר שמות הקבלנים שמכרו את כל הדירות שלהם (דהיינו כל הדירות שהם בנו נקנו)?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT name FROM Building_contractor as B1 WHERE (SELECT Apartments_id\nFROM Apartments A WHERE A. contractor_id =B1. contractor_id) CONTAINS\n(SELECT Apartments_id FROM Purchases))"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT name FROM Building_contractor as B1 WHERE (SELECT Apartments_id\nFROM Purchases) CONTAINS (SELECT contractor_id FROM Apartments A\nWHERE A. contractor_id =B1. contractor_id)"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT name FROM Building_contractor as B1 WHERE (SELECT Apartments_id\nFROM Apartments) CONTAINS (SELECT Apartments_id FROM Purchases A\nWHERE A. contractor_id =B1. contractor_id)"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT name FROM Building_contractor as B1 WHERE (SELECT Apartments_id\nFROM Purchases) CONTAINS (SELECT Apartments_id FROM Apartments A\nWHERE A. contractor_id =B1. contractor_id)"
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "כדי שקבלן מכר את כל דירותיו, קבוצת הדירות שנקנו (Purchases) חייבת להכיל (CONTAINS) את קבוצת הדירות שהוא בנה (Apartments של אותו קבלן) — כפי שבתשובה ד.",
   "id": "21S-B-Q13",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21S-B-schema",
   "question": "איזו מהשאילתות הבאות מוצאת שמות לקוחות שהשכר שלהם נמוך ביותר ורכשו דירה?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "Select name,min(salary) from customer join Purchases using(customer_id) ."
    },
    {
     "id": "b",
     "type": "code",
     "value": "Select max(salary) from customer join Purchases using(customer _id)."
    },
    {
     "id": "c",
     "type": "code",
     "value": "Select name from customer join Purchases using(customer_id) where salary=(select min(salary)from customer)"
    },
    {
     "id": "d",
     "type": "code",
     "value": "Select name from customer join Purchases using(customer_id) where salary<= any(select salary from customer)."
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "יש להשוות את המשכורת ל-min(salary) של כל הלקוחות ולצרף ל-Purchases כדי לוודא שרכשו דירה. תשובות א/ב מחזירות עמודות שגויות ותשובה ד אינה מסננת למינימום.",
   "id": "21S-B-Q7",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21S-B-schema",
   "question": "מה עושה השאילתה הבאה?",
   "code": "Select count(c.contractor_id) as num_of_contractor from Building_contractor c join\nApartments a  on a.contractor_id =c. contractor_id join Purchases p on p. contractor_id =c. contractor_id.",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מחזירה שמות קבלנים שבנו דירה שנמכרה."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מחזירה כמה קבלנים בנו כל דירה"
    },
    {
     "id": "c",
     "type": "text",
     "value": "מוצאת את כמות הקבלנים שבנו דירות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "סופרת את כמות הקבלנים שבנו דירות שגם נמכרו."
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "הצירוף ל-Apartments (בנו) וגם ל-Purchases (נמכרו) מגביל לקבלנים שבנו דירות שגם נמכרו, ו-count סופר אותם (עם כפילויות).",
   "id": "21S-B-Q8",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "21S-B-schema",
   "question": "אם בשאילתה הקודמת נמחק את פקודת ה-count מה יקרה?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "השאילתה תחזיר תמיד ערך בודד."
    },
    {
     "id": "b",
     "type": "text",
     "value": "נקבל רשימה של id של קבלנים שבנו דירות שנמכרו."
    },
    {
     "id": "c",
     "type": "text",
     "value": "נצטרך להוסיף גם פקודת gruop by כדי שהשאילתה תעבוד."
    },
    {
     "id": "d",
     "type": "text",
     "value": "תשובות ב' וג' נכונות."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "ללא count השאילתה מחזירה את רשימת ה-contractor_id של הקבלנים שבנו דירות שנמכרו (ללא צורך ב-GROUP BY).",
   "id": "21S-B-Q9",
   "examCode": "21S-B",
   "examLabel": "2021 סמסטר קיץ מועד ב׳",
   "year": 2021,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "22B-A-schema",
   "question": "סמנו את השאלה (מנוסחת בשפה טבעית) המתאימה ביותר לשאילתה הנתונה:",
   "code": "Select inst.instrument\nFrom instrument_belongs_to AS inst\nWhere NOT EXISTS\n    ( Select band.b_code\n      From band_musician  AS  bm, band\n      Where  bm.b_code = band.b_code  AND bm.m_id NOT IN\n          (Select musician.m_id\n           From musician Where musician.instrument ! = inst.istrument) )",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הציגו שם כלי נגינה המופיע בכל הלהקות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "הציגו שם כלי נגינה המופיע רק בכל הלהקות בנות מוסיקאי אחד."
    },
    {
     "id": "c",
     "type": "text",
     "value": "הציגו שם כלי נגינה המופיע בכל הלהקות (בנות מספר מוסיקאים) שבהן יש לפחות מוסיקאי אחד שאינו מנגן על הכלי הנבדק."
    },
    {
     "id": "d",
     "type": "text",
     "value": "הציגו שם כלי נגינה, עבורו לא קיימת להקה בת מספר מוסיקאים, אשר מוסיקאי השייך לה, אינו שייך לקבוצת מוסיקאים, המנגנים על כלי נגינה השונה מכלי הנגינה הנבדק."
    },
    {
     "id": "e",
     "type": "text",
     "value": "השאילתה כתובה באופן שגוי, ולכן אי אפשר לנסח בשפה טבעית שאלה מתאימה."
    }
   ],
   "correctId": "d",
   "acceptedIds": [
    "d",
    "e"
   ],
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "שאלה מורכבת — התקבלו שתי התשובות D ו-E (יש חוסר התאמה בשורות אך הוא אפשרי כיוון שמדובר ב-NOT EXISTS).",
   "id": "22B-A-Q10",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "22B-A-schema",
   "question": "נתונה השאלה: \"הצג שמות קבוצות בהיררכיית כלי הנגינה בבסיס הנתונים, שמספר הכלים השייכים אליהן הוא מקסימלי, וגם את ערכו של מספר מקסימלי זה\". הפתרון המוצע מורכב משלוש שאילתות, וחסר בו הקטע המסומן __ (I) __. **שים לב:** `INTO inst_n` נותן שם ליחס תוצאה של השאילתה הראשונה (בדומה ל-`Create View inst_n As (Select…)`), וכן `INTO max_set` לשנייה. מהו הקטע החסר __ (I) __?",
   "code": "-- שאילתה 1:\nSelect set, count (instrument) AS inst_num INTO inst_n\nFrom instrument_belongs_to\nGroup by set\n\n-- שאילתה 2:\nSelect max (inst_num) as max_num INTO max_set\nFrom inst_n\n\n-- שאילתה 3:\nSelect set, max_num\n__ (I) __",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "From instrument_belongs_to ,max_set, having  inst_n.inst_num=max_set.max_num"
    },
    {
     "id": "b",
     "type": "code",
     "value": "From inst_n,max_set where inst_n.inst_num = max_set.max_num"
    },
    {
     "id": "c",
     "type": "code",
     "value": "From max_set, inst_n  group by max_set.max_num\nhaving  inst_n. inst_num = max_set.max_num"
    },
    {
     "id": "d",
     "type": "text",
     "value": "אף תשובה לא נכונה."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "מצרפים את שני היחסים המבוקשים (inst_n ו-max_set) בתנאי inst_n.inst_num = max_set.max_num כדי לבחור את הקבוצות בעלות מספר הכלים המקסימלי.",
   "id": "22B-A-Q5",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "22B-A-schema",
   "question": "נתונה השאילתה הבאה. סמן את השאלה (מנוסחת בשפה טבעית) המתאימה ביותר לשאילתה הנתונה:",
   "code": "( SELECT    bm.b_code, COUNT(*) AS num_of_Instruments\n  FROM      band_musician AS bm, musician AS m\n  WHERE     bm.m_id = m.m_id  AND  m.Instrument != \"none\"  AND\n            NOT EXISTS ( SELECT  *\n                FROM   one_man_band AS omb\n                WHERE bm.b_code = omb.b_code )\n  GROUP BY  bm.b_code )\nUNION\n( SELECT band.b_code, omb.num_of_instruments\n  FROM  one_man_band AS omb,  band\n  WHERE band.b_code = omb.b_code  AND\n        omb.num_of_instruments > 0 )",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הצג לכל להקה בבסיס הנתונים את מספר כלי הנגינה שלה."
    },
    {
     "id": "b",
     "type": "text",
     "value": "הצג לכל להקה בבסיס הנתונים את מספר כלי הנגינה שלה. התשובה צריכה לכלול להקות בנות מספר מוסיקאים, וכן להקות בנות מוסיקאי יחיד."
    },
    {
     "id": "c",
     "type": "text",
     "value": "הצג לכל להקה בבסיס הנתונים את מספר כלי הנגינה שלה. התשובה צריכה לכלול להקות בנות מספר מוסיקאים, שלא משתתף בהן מוסיקאי השייך גם ללהקה בת מוסיקאי יחיד, וכן להקות בנות מוסיקאי יחיד שמספר הכלים בהן הוא לפחות אחד."
    },
    {
     "id": "d",
     "type": "text",
     "value": "הצג לכל להקה בבסיס הנתונים את מספר כלי הנגינה שלה. התשובה צריכה לכלול להקות בנות מספר מוסיקאים (שלמעשה, שמן שונה משם של להקה בת מוסיקאי יחיד); וכן להקות בנות מוסיקאי יחיד, שמספר הכלים בהן הוא לפחות אחד."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות."
    }
   ],
   "correctId": "c",
   "acceptedIds": [
    "c",
    "d",
    "e"
   ],
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "לפי הפתרון הרשמי התקבלו התשובות C, D ו-E למלוא הנקודות (השאלה לא הובהרה דיה, ובתשובה D נכתב \"שם שונה\" ולא \"קוד שונה\").",
   "id": "22B-A-Q6",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "22B-A-schema",
   "question": "האם השאילתה הבאה עונה על הדרישה: \"הצג לכל שם כלי נגינה בבסיס הנתונים את מספר הלהקות, בנות יותר ממוסיקאי אחד, בהן משתמשים בכלי זה\". מהי הטענה הנכונה:",
   "code": "Select ibt.instrument  AS  ins_name, count (band.b_name)  AS  bands_number\nFrom instrument_belongs_to AS ibt, musician, band, band_musician\nWhere musician.m_id  =  band_musician.m_id  AND\n      musician. instrument  =  ibt.instrument\nGroup by ibt.instrument",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "השאילתה נכונה אך מסורבלת."
    },
    {
     "id": "b",
     "type": "text",
     "value": "השאילתה נכונה, אך ניתן היה לכתוב אותה עם JOIN בצורה אחרת."
    },
    {
     "id": "c",
     "type": "text",
     "value": "השאילתה נכונה, כיוון שיש התייחסות לכל הטבלאות המופיעות ב-FROM."
    },
    {
     "id": "d",
     "type": "text",
     "value": "השאילתה שגויה כיוון שאינה מתייחסת כנדרש לסוג הלהקה (האם בת מספר מוסיקאים, או בת מוסיקאי יחיד)."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות."
    }
   ],
   "correctId": "e",
   "acceptedIds": [
    "d",
    "e"
   ],
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "השאילתה אינה נכונה — חסר בה חלק של JOIN (הקשר band.b_code = band_musician.b_code), ואינה מתייחסת לסוג הלהקה. התקבלו התשובות D ו-E.",
   "id": "22B-A-Q7",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "22B-A-schema",
   "question": "נתונות 3 הצעות פתרון עבור השאלה: \"הציגו את גילו המינימלי של מוסיקאי מבסיס הנתונים, את שמו ואת המגדר אליו משתייך\". סמנו את הטענה הנכונה:",
   "code": "-- הצעת פתרון 1:\nSelect musician.m_age, musician.m_name, musician.m_gender\nFrom musician\nWhere musician.m_age <= all (Select musician.m_age  From musician)\n\n-- הצעת פתרון 2:\nSelect min (musician.m_age), musician. m_name, musician.m_gender\nFrom musician\n\n-- הצעת פתרון 3:\nSelect musician.m_age, musician. m_name, musician.m_gender\nFrom musician\nWhere musician.m_age  =  any (Select min (musician.m_age ) From musician)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "פתרון 1 ופתרון 2 נכונים."
    },
    {
     "id": "b",
     "type": "text",
     "value": "פתרון 1 ופתרון 3 נכונים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "כל שלושת הפתרונות נכונים."
    },
    {
     "id": "d",
     "type": "text",
     "value": "רק פתרון 2 נכון."
    },
    {
     "id": "e",
     "type": "text",
     "value": "רק פתרון 3 נכון."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "פתרון 2 שגוי (min ללא GROUP BY עם עמודות נוספות). פתרונות 1 ו-3 מחזירים את המוסיקאי בעל הגיל המינימלי. (על A, C, E ניתנו חצי מהנקודות.)",
   "id": "22B-A-Q8",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "22B-A-schema",
   "question": "נתון פתרון מוצע עבור השאלה: \"הצג לכל כלי נגינה את הקבוצה בהיררכיה אליה הוא שייך, שמות המוסיקאים המנגנים בכלי, ושם הלהקה אליה המוסיקאי שייך. שמות כלי הנגינה יוצגו בסדר עולה, ושמות המוסיקאים המנגנים על כלי יוצגו בסדר יורד\". בפתרון המוצע חסר הקטע המסומן __ (III) __. הקטע החסר __ (III) __ הוא:",
   "code": "Select inst. instrument, inst. set, m.m_name, b.b_name\nFrom instrument_belongs_to AS  inst, band_musician  AS  bm, musician  AS  m, band  AS  b\nWhere  bm.m_id = m.m_id  AND  b.b_code = bm.b_code  AND\n       m. instrument  =  inst. instrument\n__ (III) __",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הקטע __ (III) __ מיותר. אין צורך לרשום דבר."
    },
    {
     "id": "b",
     "type": "code",
     "value": "Group by inst. instrument, m.m_name"
    },
    {
     "id": "c",
     "type": "code",
     "value": "Order by inst.instrument, m.m_name"
    },
    {
     "id": "d",
     "type": "code",
     "value": "Order by inst.instrument , m.m_name desc"
    }
   ],
   "correctId": "d",
   "official": true,
   "answerSource": "solution-pdf",
   "confidence": "high",
   "explanation": "המיון: כלי נגינה בסדר עולה ושמות המוסיקאים בסדר יורד → Order by inst.instrument, m.m_name desc. אין צורך ב-GROUP BY כי מוצגות שורות עם חזרות.",
   "id": "22B-A-Q9",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "23B-A-sql",
   "question": "כתוב שאילתה שמחזירה לכל מדינה כמה פעמים היא קיבלה 12 נקודות ממדינות אחרות. בחרו את התשובה הנכונה ביותר.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT to_country, COUNT(*) as times_received_12_points\nFROM Score\nWHERE num_points = 12\nGROUP BY to_country"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT from_country, COUNT(*) as times_received_12_points\nFROM Score\nWHERE num_points = 12\nGROUP BY from_country"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT to_country, COUNT(*) as times_received_12_points\nFROM (SELECT to_county, num_points FROM Score WHERE num_points = 12) As temp\nGROUP BY to_country"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT COUNT(*) as times_received_12_points\nFROM (SELECT to_county, num_points FROM Score WHERE num_points = 12 GROUP BY to_country) As temp"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "המדינה המקבלת היא `to_country`; מסננים `num_points = 12` ומקבצים לפי `to_country` עם COUNT(*). A היא התשובה הנכונה והתמציתית ביותר. C מגיע לתוצאה דומה דרך תת-שאילתה מיותרת (וקיבל ניקוד חלקי בלבד), ואילו B מקבץ לפי `from_country` ו-D מחזיר מספר יחיד ללא פירוט למדינה.",
   "confidence": "high",
   "id": "23B-A-Q10",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "23B-A-sql",
   "question": "מצאו מדינות שקיבלו מעל 4 נקודות מכל המדינות שהשתתפו בין השנים 2012 עד 2022.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT s1.to_country\nFROM Score AS s1\nWHERE s1.year BETWEEN 2012 AND 2022 AND NOT EXISTS (SELECT r.country_name FROM Represent r WHERE r.year BETWEEN 2012 AND 2022 AND r.country_name NOT IN (SELECT s2.from_country FROM SCORE AS s2 WHERE s2.to_country = s1.to_country AND s2.num_points > 4))"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT s1.to_country\nFROM Score AS s1\nWHERE NOT EXISTS (SELECT s2.from_country FROM Score As S2 WHERE s2.year BETWEEN 2012 AND 2022 AND s2.score > 4 AND s2.country_name NOT IN (SELECT s3.from_country FROM Score As S3 WHERE S2.to_country = s3.to_country AND s3.year BETWEEN 2012 AND 2022))"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT s1.to_country\nFROM Score AS s1\nWHERE s1.score > 4 AND NOT EXISTS (SELECT r.country_name FROM Represent r WHERE r.year BETWEEN 2012 AND 2022 SCORE AS s2 WHERE AND r.country_name NOT IN (SELECT s2.from_country FROM s2.year BETWEEN 2012 AND 2022))"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT s1.to_country\nFROM Score AS s1\nWHERE NOT EXISTS (SELECT s2.from_country FROM Score As S2 WHERE s2.year BETWEEN 2012 AND 2022 AND s2.country_name NOT IN (SELECT s3.from_country FROM Score As S3 WHERE S2.to_country = s3.to_country AND s3.score > 4))"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "שאלת חילוק ברמת קושי גבוהה, שנפתרת בשלילה כפולה: מדינה `to_country` שאין מדינה משתתפת (בין 2012–2022) שלא נתנה לה מעל 4 נקודות. רק A מנוסח נכון; במסיחים B, C, D יש שגיאות (למשל שימוש בעמודות `score`/`country_name` שאינן קיימות ב-Score, וסדר סעיפים משובש ב-C). לכן A.",
   "confidence": "med",
   "id": "23B-A-Q11",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "23B-A-sql",
   "question": "החזירו את כל המדינות שכל פעם לא חילקו נקודות למדינת ישראל. השאלה דורשת:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "השאלה דורשת חיתוך"
    },
    {
     "id": "b",
     "type": "text",
     "value": "השאלה דורשת איחוד"
    },
    {
     "id": "c",
     "type": "text",
     "value": "השאלה דורשת הפרש"
    },
    {
     "id": "d",
     "type": "text",
     "value": "השאלה דורשת חילוק"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "המילה 'כל' מבלבלת ונראית כמו חילוק, אך אין כאן קבוצת-מחלק. 'שכל פעם לא חילקו' שקול ל'שאף פעם לא חילקו' — כלומר כל המדינות פחות אלה שחילקו נקודות לישראל, שזו פעולת הפרש.",
   "confidence": "high",
   "id": "23B-A-Q12",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "23B-A-sql",
   "question": "מיהם המבצעים שהופיעו באירוויזיון יותר מפעם אחת (הכוונה ביותר משנה אחת)?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT p_name\nFROM Represent JOIN Band USING(b_name)\nGROUP BY p_name\nHAVING count(year) > 1"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p_name, COUNT(year)\nFROM Represent JOIN Band USING(b_name)\nWHERE COUNT(year) > 1"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT p_name\nFROM Represent JOIN Band USING (b_name)\nGROUP BY p_name\nHAVING count(distinct year) > 1"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p_name\nFROM Represent\nHAVING year > 1"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "צריך לספור שנים *שונות*: `count(distinct year) > 1`. מסיח A סופר `count(year)` ועלול לספור אותה שנה פעמיים (לכן ירדו עליו נקודות); B משתמש ב-COUNT בתוך WHERE (לא חוקי); D מפעיל HAVING ללא GROUP BY. לכן C.",
   "confidence": "high",
   "id": "23B-A-Q5",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "23B-A-sql",
   "question": "מה ממוצע הגילאים של המתופפים באירוזיון?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(age)\nFROM Performer, Instrument\nWHERE type = 'Drum'"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "p_name = (SELECT AVG(age)\nFROM Performer JOIN Instrument USING Instrument.p_name\nWHERE Instrument.type = 'Drum'"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(Performer.age)\nFROM Performer JOIN Instrument ON Performer.p_name = Instrument.p_name\nWHERE Instrument.type LIKE '%Drum%'"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p_name, AVG(age)\nFROM Band\nWHERE b_name IN (SELECT b_name FROM Instrument WHERE type = 'Drum')"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "e",
   "answerSource": "solution-pdf",
   "explanation": "ב-A יש מכפלה קרטזית (Performer, Instrument ללא תנאי חיבור) שהופכת את התוצאה ללא נכונה; B מכיל שגיאת תחביר גסה; C מחבר על `Instrument.p_name` שאינו קיים ומשתמש ב-LIKE שלא לצורך; D מחזיר גם שם וגם ממוצע שלא נדרש. לכן אף תשובה אינה נכונה.",
   "confidence": "high",
   "id": "23B-A-Q6",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "23B-A-sql",
   "question": "מה ממוצע הפרש הגילאים של המופיעים כל שנה (כלומר בכל שנה יש הפרש בין הגיל המקסימלי באותה שנה לגיל המינימלי באותה שנה — מה הממוצע של ההפרשים הללו), למופיעים בין השנים 2023 לבין 2003?\n**אפשר להשתמש ב-view הבא, אך לא חובה:**\n`CREATE VIEW temp_view AS (SELECT * FROM Performer JOIN Band USING(p_name) JOIN Represent USING(b_name)`",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(age)\nFROM temp_view\nWHERE year BETWEEN 2003 AND 2023"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT (MAX(age) - MIN(age)) / COUNT(*)\nFROM Performer JOIN Band ON Performer.p_name = Band.p_name JOIN Represent USING(b_name)\nWHERE year BETWEEN 2003 AND 2023"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(p)\nFROM (SELECT Represent.year, (MAX(Performer.age) - MIN(Performer.age)) As p\n      FROM temp_view\n      WHERE Represent.year BETWEEN 2003 AND 2023\n      GROUP BY Represent.year) As funnyQ"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(p)\nFROM (SELECT Represent.year, (MAX(Performer.age) - MIN(Performer.age)) As p\n      FROM temp_view\n      GROUP BY year) As funnyQ\nHAVING Represent.year BETWEEN 2003 AND 2023"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "יש לחשב לכל שנה את `MAX(age) - MIN(age)` (עם GROUP BY year בתת-שאילתה, שחייבת לקבל שם — funnyQ), ומעליה AVG. A מחשב ממוצע גילאים ולא הפרשים; B מחלק ב-COUNT(*) במקום ממוצע לפי שנה; ל-D יש תנאי לא-קבוצתי ב-HAVING. לכן C.",
   "confidence": "high",
   "id": "23B-A-Q7",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "23B-A-sql",
   "question": "מיהן המדינות שאנשים המתגוררים בהן הופיעו באירוויזיון, אך לא כחלק מלהקה (כלומר רק כלהקה של אדם אחד)?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT country_name\nFROM Performer\nWHERE p_name NOT IN (SELECT p_name FROM Band GROUP BY country_name HAVING COUNT(p_name) = 1)"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT country_name\nFROM Performer\nWHERE p_name NOT IN (SELECT p_name FROM Band GROUP BY p_name HAVING COUNT(p_name) > 1)"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT country_name\nFROM Performer LEFT JOIN Band ON Performer.p_name = Band.p_name\nWHERE Band.b_name IS NULL"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT country_name\nFROM Performer\nWHERE p_name NOT IN (SELECT p_name FROM Band WHERE COUNT(p_name) > 1 GROUP BY p_name)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה."
    }
   ],
   "correctId": "e",
   "acceptedIds": [
    "e",
    "b"
   ],
   "answerSource": "solution-pdf",
   "explanation": "בשאלה מספר שגיאות מכוונות: A מקבץ ב-GROUP BY country_name (עמודה שאינה בטבלת Band); B מקבץ לפי p_name במקום b_name; C (LEFT JOIN ... IS NULL) מחזיר מי שאינו בלהקה כלל ולא 'להקה של אדם אחד'; D משתמש ב-COUNT בתוך WHERE (לא חוקי). לכן התשובה E. הערה: על-פי המחוון קיבלו גם את מסיח B.",
   "confidence": "high",
   "id": "23B-A-Q8",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "23B-A-sql",
   "question": "באיזו שנה הופיעה הלהקה הגדולה ביותר (הכי הרבה מופיעים)?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT year\nFROM Represent\nWHERE b_name IN (SELECT b_name FROM Band GROUP BY b_name HAVING COUNT(p_name) = (SELECT MAX(COUNT(p_name)) FROM Band GROUP BY b_name))"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT year\nFROM Represent\nWHERE b_name IN (SELECT b_name FROM Band GROUP BY b_name HAVING COUNT(p_name) = MAX(p_name))"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT MAX(year)\nFROM Represent r JOIN Band b ON r.b_name = b.b_name\nGROUP BY b.b_name\nHAVING COUNT() = ANY (SELECT MAX(COUNT()) FROM Band GROUP BY b_name)"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT r.year\nFROM Represent r, Band b\nWHERE r.b_name = b.b_name\nGROUP BY b.b_name, r.year\nHAVING COUNT(b.p_name) >= ALL (SELECT COUNT(p_name) FROM Band GROUP BY b_name)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "שאלת MAX ברמת קושי גבוהה. A משרשר `MAX(COUNT(...))` באופן לא חוקי; B שגוי תחבירית (`COUNT = MAX(p_name)`); C מחזיר שנה מקסימלית ולא את השנה של הלהקה הגדולה. D מוצא את הלהקה עם מספר המבצעים הגדול ביותר (`COUNT(b.p_name) >= ALL ...`). לכן D.",
   "confidence": "high",
   "id": "23B-A-Q9",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "id": "23B-A2-Q10",
   "examCode": "23B-A2",
   "part": "ב",
   "topic": "sql",
   "topicLabel": "SQL",
   "question": "מיהם המדינות שמעולם לא נתנו 12 נקודות למדינה אחרת.",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT DISTINCT from_country FROM Score WHERE num_points != 12",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT DISTINCT to_country FROM Score WHERE num_points != 12",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT DISTINCT from_country FROM Score WHERE from_country NOT IN (SELECT from_country FROM Score WHERE num_points = 12)",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT DISTINCT to_country FROM Score WHERE to_country NOT IN (SELECT from_country FROM Score WHERE num_points = 12)",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "המדינה הנותנת היא `from_country`. \"מעולם לא נתנה 12\" = `from_country` שאינו מופיע באף שורה עם `num_points = 12` (`NOT IN`). A מחזיר מדינות שנתנו ניקוד השונה מ-12 ולו פעם אחת (גם אם נתנו 12 בפעם אחרת); B, D משתמשים ב-`to_country` (המדינה המקבלת).",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q11",
   "examCode": "23B-A2",
   "part": "ב",
   "topic": "sql",
   "topicLabel": "SQL",
   "question": "מה שמות הלהקות בהם יש יצוג לכל אחת מקטגוריות כלי הנגינה?",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT b_name FROM Band JOIN Instrument GROUP BY b_name HAVING COUNT(DISTINCT category) = (SELECT COUNT(DISTINCT category) FROM Instrument)",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT B1.b_name FROM Band As B1 WHERE NOT EXISTS (SELECT category FROM Instrument WHERE category NOT IN (SELECT category FROM Instrument JOIN Band USING (serial_number) WHERE B1.b_name = Band.b_name))",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT B1.b_name FROM Band As B1 WHERE NOT EXISTS (SELECT category FROM Instrument WHERE B1.serial_number = Instrument.serial_number AND category NOT IN (SELECT category FROM Instrument INNER JOIN Band USING (serial_number)))",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT b_name FROM Band INNER JOIN Instrument ON Band.serial_number = Instrument.serial_number GROUP BY b_name",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "זוהי שאלת חלוקה: להקה שאין קטגוריה שאין לה יצוג בה. התבנית `NOT EXISTS`-כפול של B בודקת שאין קטגוריה שאינה מיוצגת בכלים של אותה להקה. A משתמש ב-`JOIN` ללא תנאי חיבור (`serial_number`), ולכן הספירה שגויה.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q12",
   "examCode": "23B-A2",
   "part": "ב",
   "topic": "sql",
   "topicLabel": "SQL",
   "question": "מה מהבאים נכון?",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "בשאלות של חילוק, יש קבוצת ערכים שחייבת לקבל את אותו ערך בתכונה מסוימת."
    },
    {
     "id": "b",
     "type": "text",
     "value": "שאלות של חילוק לא ניתן להמיר לשאלות של ספירת שורות, הן תמיד דורשות `NOT IN`."
    },
    {
     "id": "c",
     "type": "text",
     "value": "שאלות של חילוק אפשר לפתור על ידי הכלה, תוך שימוש ב-`CONTAINS`, אם כי לא בכל השפות שממשות `SQL`."
    },
    {
     "id": "d",
     "type": "text",
     "value": "שאלות של חילוק הן הפוכות לשאלות של מכפלה קרטזית, אבל תיתכן שארית."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "חלוקה ניתנת לביטוי כהכלת קבוצות, ובחלק מהדיאלקטים אף באמצעות `CONTAINS`, אך לא כל מימוש של `SQL` תומך בכך. חילוק ניתן גם להמיר לספירת שורות (ולכן B שגוי), ואינו הפעולה ההופכית למכפלה קרטזית באופן שמוזכר ב-D.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q5",
   "examCode": "23B-A2",
   "part": "ב",
   "topic": "sql",
   "topicLabel": "SQL",
   "question": "מהם המספרים הסידוריים של כלי הנגינה שמספרם מסתיים ב-584?",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT serial_number FROM Band WHERE serial_number = \"%584\"",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT serial_number FROM Band WHERE serial_number LIKE \"%584\"",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT serial_number FROM Band WHERE serial_number = \"%584%\"",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT serial_number FROM Band WHERE serial_number LIKE \"%584%\"",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "כדי לתפוס מספר שמסתיים ב-584 יש להשתמש ב-`LIKE \"%584\"` (התו `%` בתחילת התבנית). `=` דורש התאמה מדויקת (ולא תבנית), ו-`\"%584%\"` תופס גם מספרים שה-584 מופיע בהם באמצע.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q6",
   "examCode": "23B-A2",
   "part": "ב",
   "topic": "sql",
   "topicLabel": "SQL",
   "question": "מיהם המדינות שהמבצעים ששלחו לייצג אותם הם כולם בגובה 1.80 ומעלה?",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT country_name FROM Represent JOIN Performer ON p_name=b_name\nWHERE height >= 1.80",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT country_name FROM Represent JOIN Band USING(b_name)\nJOIN Performer USING(p_name) WHERE height >= 1.80",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT country_name FROM Represent WHERE b_name NOT IN (SELECT b_name FROM Band JOIN Performer USING(p_name) WHERE height < 1.80)",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT country_name FROM Represent As R1 WHERE NOT EXISTS (SELECT p_name FROM Band As B1 WHERE b_name NOT IN (SELECT b_name FROM Performer JOIN Band As B2 USING(p_name) WHERE height < 1.80 and B1.b_name = R1.p_name))",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "\"כולם בגובה ≥ 1.80\" = אין אף חבר נמוך מ-1.80. C בוחר מדינות שהלהקה המייצגת אותן אינה נמצאת בין הלהקות שיש בהן מבצע בגובה קטן מ-1.80 (`NOT IN`). A ו-B מחזירים מדינות שיש בהן ולו מבצע אחד גבוה, ו-D שגוי לוגית ותחבירית.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q7",
   "examCode": "23B-A2",
   "part": "ב",
   "topic": "sql",
   "topicLabel": "SQL",
   "question": "סטודנטים ענו על השאלה: מה שמות הלהקות שקיבלו 12 נקודות בשנים בהם השתתפו, ובאילו שנים קיבלו 12 נקודות? מי מהתשובות הבאות נכונה:",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT B.b_name, B.year FROM Represent As B , Score As S\nWHERE B.country_name = S.to_country AND S.num_points = 12",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT b_name, year FROM Represent, Score\nWHERE Represent.country_name = Score.to_country AND num_points = 12",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT b_name, year FROM Represent JOIN Score USING(year)\nWHERE Represent.country_name = Score.to_country and num_points = 12",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT b_name, year FROM Represent JOIN Score USING(year, country)\nWHERE num_points = 12",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "code",
     "value": "SELECT b_name FROM Score WHERE num_points = 12",
     "lang": "sql"
    }
   ],
   "correctId": "c",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "צריך לחבר את `Represent` ל-`Score` לפי אותה שנה (`USING(year)`) ולסנן `country_name = to_country AND num_points = 12`. A ו-B מבצעים מכפלה ללא חיבור על השנה (`Score` מכיל `year` נפרד → צימוד שנים שגוי), D מחבר לפי עמודה לא קיימת `country`, ו-E אינו מחזיר את שם הלהקה כלל.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q8",
   "examCode": "23B-A2",
   "part": "ב",
   "topic": "sql",
   "topicLabel": "SQL",
   "question": "מיהם המדינות שקיבלו את סך כל הנקודות הגבוה ביותר ובאיזו שנה? (כלומר, בשנה מסוימת נסכום את כל הניקוד שקיבלה כל מדינה, ונבדוק מהו הניקוד הגבוה ביותר שהגיעו אליו בשנה כלשהי, מיהי המדינה ומהי השנה. ייתכן שיש יותר ממדינה אחת שהגיעה לניקוד זה.)",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT to_country, year FROM Score GROUP BY to_country, year\nHAVING sum(num_points) >= ALL (SELECT sum(num_points) FROM Score\nGROUP BY to_country, year)",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT to_country, year FROM Score GROUP BY to_country, year\nHAVING sum(num_points) IN (SELECT max(num_points)FROM Score\nGROUP BY to_country, year)",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT to_country, max(sum(num_points)), year FROM Score Group BY to_country",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT to_country, year FROM Score Group BY to_country\nHAVING max(sum(num_points)) = num_points",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "מקבצים לפי (`to_country`, `year`), וב-`HAVING` דורשים שסכום הנקודות של הקבוצה יהיה גדול-או-שווה לכל הסכומים של כל קבוצה אחרת (`>= ALL`). B משווה סכום ל-`max` של ניקוד בודד, ו-C, D בעלי קיבוץ/צירוף אגרגציה שגויים.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "id": "23B-A2-Q9",
   "examCode": "23B-A2",
   "part": "ב",
   "topic": "sql",
   "topicLabel": "SQL",
   "question": "לכל תזמורת מעוניינים להשכיר מכולה שבה הכלים יהיו בקופסאות בגודל המתאים להם, אך יעמדו אך ורק קופסא על גבי קופסא. מה גובה ה-`height` של המכולה לכל תזמורת? השלם את `(1)`:\n`SELECT ____(1)____ FROM Band JOIN Instrument USING(serial_number) GROUP BY b_name`",
   "contextId": "23B-A2-sql",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "b_name, sum(height)",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "b_name, count(height)",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "b_name, count(*)",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "b_name, sum(height)*count(*)",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה."
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "solution-pdf",
   "explanation": "אם הקופסאות מונחות זו על גבי זו, גובה המכולה הוא סכום גובהי הכלים של הלהקה — `sum(height)` בקיבוץ לפי `b_name`. `count` סופר פריטים, ולא מחשב גובה מצטבר.",
   "confidence": "high",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "24B-A-sql",
   "question": "בחרו מה נכון לגבי שאילתה שמציגה את דרכוני הנוסעים שטסו ביותר מטיסה אחת:",
   "code": "-- נתון פתרון 1:\nSELECT PassportNumber\n  FROM Passenger\n  WHERE PassportNumber IN (\n    SELECT PassportNumber\n    FROM Booking\n    GROUP BY PassengerID\n    WHERE COUNT(DISTINCT ScheduleID) > 1\n  );\n\n-- נתון פתרון 2:\nSELECT b1.PassportNumber\n  FROM Booking As b1, Booking As b2\n  WHERE b1.PassportNumber = b2. PassportNumber  and\n        b1.BookingID != b2.BookingID",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "פתרון 1 שגוי ופתרון 2 נכון"
    },
    {
     "id": "b",
     "type": "text",
     "value": "פתרון 1 שגוי ופתרון 2 שגוי"
    },
    {
     "id": "c",
     "type": "text",
     "value": "פתרון 1 נכון ופתרון 2 נכון"
    },
    {
     "id": "d",
     "type": "text",
     "value": "פתרון 1 נכון ופתרון 2 שגוי"
    },
    {
     "id": "e",
     "type": "text",
     "value": "לא ניתן לדעת"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "בפתרון 1 מופיע GroupBy passengerId במקום GroupBy passportNumber, וגם חישוב ה-count בפסוקית WHERE במקום HAVING — ולכן הוא שגוי. פתרון 2 נכון (גם ללא DISTINCT).",
   "id": "24B-A-Q10",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "24B-A-sql",
   "question": "כתבו שאילתה שמחזירה את מספרי הדרכונים של הנוסעים ששם המשפחה שלהם מתחיל ב-\"בן\", למשל \"בן אל\", \"בן שי\" וכו'.",
   "options": [
    {
     "id": "a",
     "type": "image",
     "value": "images/exams/24B-A-q11a.png"
    },
    {
     "id": "b",
     "type": "image",
     "value": "images/exams/24B-A-q11b.png"
    },
    {
     "id": "c",
     "type": "image",
     "value": "images/exams/24B-A-q11c.png"
    },
    {
     "id": "d",
     "type": "image",
     "value": "images/exams/24B-A-q11d.png"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "יש להשתמש ב-`LIKE \"בן%\"` (הסימן % מייצג כל רצף תווים). (אפשרויות התשובה מוצגות כתמונות כדי לשמר את מחרוזות ה-LIKE במדויק.)",
   "id": "24B-A-Q11",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "24B-A-sql",
   "question": "כתבו שאילתה שמציגה את שמות חברות התעופה שטסות למעל 20 יעדים שונים.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT Name FROM Airline JOIN Flight USING(AirlineID)\nGROUP BY Name\nHAVING count(DISTINCT Destination) > 20"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT Name FROM Airline JOIN Flight USING(AirlineID)\nGROUP BY Name\nWHERE count(DISTINCT Destination) > 20"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT Name FROM Airline JOIN Flight ON(AirlineID)\nGROUP BY Name\nWHERE count(DISTINCT Destination) > 20"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT Name FROM Airline JOIN Flight ON(AirlineID)\nHAVING count(DISTINCT Destination) > 20"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "צריך JOIN עם USING(AirlineID), קיבוץ לפי Name וסינון קבוצות ב-HAVING (לא WHERE).",
   "id": "24B-A-Q12",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "24B-A-sql",
   "question": "כתבו שאילתה שמחזירה את השם הפרטי ושם משפחה של הלקוחות שהזמינו הכי הרבה טיסות. היעזרו בשאילתא הנתונה:",
   "code": "CREATE VIEW numBookingPerCustomer AS (SELECT PassportNumber, count(DISTINCT BookingID) As numBooking FROM Booking Group By PassportNumber",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT LastName, FirstName FROM Passenger JOIN numBookingPerCustomer USING (PassportNumber)\nWHERE numBooking >= ALL (SELECT numBooking FROM numBookingPerCustomer)"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT LastName, FirstName , max (numBooking ) FROM Passenger JOIN numBookingPerCustomer USING (PassportNumber)"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT LastName, FirstName FROM Passenger JOIN numBookingPerCustomer USING (PassportNumber) WHERE max(numBooking)"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT LastName, FirstName FROM Passenger JOIN numBookingPerCustomer USING (PassportNumber) HAVING numBooking not in min(numBooking)"
    },
    {
     "id": "e",
     "type": "code",
     "value": "SELECT LastName, FirstName FROM Passenger JOIN numBookingPerCustomer USING (PassportNumber)\nHAVING numBooking = (SELECT numBooking FROM numBookingPerCustomer WHERE max(numBooking)"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "השימוש ב-`numBooking >= ALL (…)` בוחר את הלקוחות עם מספר ההזמנות המקסימלי.",
   "id": "24B-A-Q13",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "24B-A-sql",
   "question": "כתבו שאילתה שמציגה את שם המשפחה והשם הפרטי של נוסעות ונוסעים שטסו עם חברת אל-על והמריאו מתל אביב. בחרו את החלק החסר המסומן בסימן שאלה בשאילתא:",
   "code": "SELECT .......\n  FROM ______?______\n  WHERE .......",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "Passenger As p\n  JOIN Booking AS b ON b.PassportNumber= p.PassportNumber\n  JOIN Schedule using(ScheduleID)\n  JOIN Flight AS f ON s.FlightID = f.FlightID\n  JOIN Airline AS a ON f.AirlineID = a.AirlineID"
    },
    {
     "id": "b",
     "type": "code",
     "value": "Passenger p\n  JOIN Booking b ON p.PassportNumber = b.PassportNumber\n  JOIN Schedule s ON b.ScheduleID = s.ScheduleID\n  JOIN Flight f ON s.FlightID = f.FlightID"
    },
    {
     "id": "c",
     "type": "code",
     "value": "Passenger JOIN Flight"
    },
    {
     "id": "d",
     "type": "code",
     "value": "Passenger AS p\n  JOIN Booking AS b USING(PassportNumber)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "e"
   ],
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "יש לצרף Passenger→Booking→Schedule→Flight→Airline. בתשובה ב חלה שגיאה (Schedule לא הוגדר AS s), ולכן התקבלו א או ה.",
   "id": "24B-A-Q6",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "24B-A-sql",
   "question": "כתבו שאילתה שמציגה את מספר הטיסות הכולל לכל חברת תעופה ואת שם חברת התעופה.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT a.Name, COUNT(*) AS TotalFlights\n  FROM Airline AS a\n  JOIN Flight f ON a.AirlineID = f.AirlineID\n  GROUP BY a.Name;"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT AirlineID, COUNT(*) AS TotalFlights\n  FROM Flight\n  GROUP BY AirlineID;"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT a.Name, COUNT(*) AS TotalFlights\n  FROM Flight AS f\n  JOIN Airline a ON f.AirlineID = a.AirlineID;"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT Name, COUNT(*) AS TotalFlights\n  FROM Flight\n  GROUP BY Name;"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "e"
   ],
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "יש לצרף Airline ל-Flight, לקבץ לפי שם החברה ולספור. התקבלו א וגם ה.",
   "id": "24B-A-Q7",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "24B-A-sql",
   "question": "כתבו שאילתה שמציגה את ממוצע הנוסעים לכל יעד (destination) — כמה נוסעים הזמינו טיסות ליעד, לא משנה באיזו טיסה או חברת תעופה. מה מספר ה-GROUP BY, מה מספר ה-JOINS הנמוכה ביותר **ללא שימוש בשורת WHERE** (כלומר, לא לבצע JOIN ע\"י WHERE) הנדרשים לפתרון?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "השאילתא דורשת GROUP BY 2 (כלומר שאילתא מכוננת) וגם JOIN של 3 טבלאות"
    },
    {
     "id": "b",
     "type": "text",
     "value": "השאילתא דורשת GROUP BY 1 וגם JOIN של 2 טבלאות"
    },
    {
     "id": "c",
     "type": "text",
     "value": "השאילתא דורשת GROUP BY 1 וגם JOIN של 4 טבלאות"
    },
    {
     "id": "d",
     "type": "text",
     "value": "השאילתא דורשת GROUP BY 2 (כלומר שאילתא מכוננת) וגם JOIN של 2 טבלאות"
    },
    {
     "id": "e",
     "type": "text",
     "value": "השאילתא דורשת GROUP BY 2 (כלומר שאילתא מכוננת) וגם JOIN של 4 טבלאות"
    }
   ],
   "correctId": "a",
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "high",
   "explanation": "נדרשת שאילתא מכוננת (GROUP BY בשתי רמות) וצירוף של 3 טבלאות (Booking, Schedule, Flight) כדי להגיע ליעד.",
   "id": "24B-A-Q8",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "24B-A-sql",
   "question": "כתבו שאילתה שמציגה את שמות הנוסעים שהזמינו מושבים לכל היעדים של חברת אל על. השלימו את החלקים החסרים __1__ ו-__2__ בשאילתה הנתונה.",
   "code": "SELECT p.FirstName, p.LastName\n  FROM Passenger p\n  WHERE NOT EXISTS (\n    SELECT DISTINCT ___1___\n    WHERE a.Name = 'El Al' AND f1.destination NOT IN (\n      SELECT f2.destination\n      FROM Booking b\n      JOIN Schedule s USING(ScheduleID)\n      JOIN Flight as f2 USING(FlightID)\n      WHERE ___2___\n    )\n  );",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "1:  f.destination\n    FROM Flight f1\n    JOIN Airline a ON f1.AirlineID = a.AirlineID\n2:  b.PassportNumber = p.PassportNumber"
    },
    {
     "id": "b",
     "type": "code",
     "value": "1:  f1.FlightID\n    FROM Flight f1\n    JOIN Airline a ON f1.AirlineID = a.AirlineID\n2:  f1.destination = f2.destination AND b.PassportNumber = p.PassportNumber"
    },
    {
     "id": "c",
     "type": "code",
     "value": "1:  f1.FlightID\n    FROM Flight f1\n    JOIN Airline a ON f1.AirlineID = a.AirlineID\n2:  b.PassportNumber = p.PassportNumber"
    },
    {
     "id": "d",
     "type": "code",
     "value": "1:  f1.destination\n    FROM Flight f1\n    JOIN Airline a ON f.AirlineID = a.AirlineID\n2:  b.LastName = p.LastName"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "e"
   ],
   "official": true,
   "answerSource": "accepted-answers-docx",
   "confidence": "medium",
   "explanation": "התקבלו א או ה. בתשובה א מופיע `f` במקום `f1` (אי-דיוק קל), ולכן התקבלה גם ה.",
   "id": "24B-A-Q9",
   "examCode": "24B-A",
   "examLabel": "2024 סמסטר ב׳ מועד א׳",
   "year": 2024,
   "source": "exam",
   "topicLabel": "SQL"
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25B-A-sql",
   "question": "איזו מהשאילתות הבאות תחזיר את שמות הסטודנטים שנרשמו לכל הקורסים שמציעה המחלקה `'Mathematics'`?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT first_name\nFROM Students S\nWHERE EXISTS (\n  SELECT *\n  FROM Courses C\n  WHERE C.department = 'Mathematics'\n    AND EXISTS (\n      SELECT *\n      FROM Enrollments E\n      WHERE E.student_id = S.student_id\n        AND E.course_id = C.course_id\n    )\n);",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT first_name\nFROM Students S\nWHERE NOT EXISTS (\n  SELECT *\n  FROM Enrollments E\n  WHERE S.student_id = E.student_id\n    AND E.course_id IN (\n      SELECT course_id\n      FROM Courses\n      WHERE department = 'Mathematics'\n    )\n);",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT first_name\nFROM Students S\nWHERE NOT EXISTS (\n  SELECT *\n  FROM Courses C\n  WHERE C.department = 'Mathematics'\n    AND NOT EXISTS (\n      SELECT *\n      FROM Enrollments E\n      WHERE E.student_id = S.student_id\n        AND E.course_id = C.course_id\n    )\n);",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT first_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.department = 'Mathematics';",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "\"נרשמו לכל הקורסים של Mathematics\" = חלוקה: אין קורס Mathematics שאליו הסטודנט לא נרשם — תבנית NOT EXISTS כפולה (C). B בודק היעדר הרשמה; ל-A מספיק קורס אחד; D הוא חיבור פנימי רגיל.",
   "confidence": "high",
   "id": "25B-A-Q10",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25B-A-sql",
   "question": "איזו מהשאילתות הבאות מחזירה את שמות הסטודנטים שנרשמו לכל הקורסים של מחלקת `'Mathematics'`?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id)\n  CONTAINS\n  (SELECT course_id\n   FROM Courses C\n   WHERE C.department = 'Mathematics');",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Courses C\n   WHERE C.department = 'Mathematics')\n  CONTAINS\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id);",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id)\n  CONTAINS\n  (SELECT course_id\n   FROM Courses);",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT first_name\nFROM Students S\nWHERE\n  (SELECT course_id\n   FROM Enrollments E\n   WHERE E.student_id = S.student_id)\n  CONTAINS\n  (SELECT DISTINCT department\n   FROM Courses\n   WHERE department = 'Mathematics');",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "עם אופרטור CONTAINS: קבוצת הקורסים שאליהם נרשם הסטודנט חייבת להכיל את קבוצת קורסי Mathematics — כלומר (הרשמות הסטודנט) CONTAINS (קורסי Mathematics), כפי ש-A מנסח. B הופך את כיוון ההכלה; C משווה לכל הקורסים; D משווה `course_id` מול `department`.",
   "confidence": "high",
   "id": "25B-A-Q11",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25B-A-sql",
   "question": "איזו מהשאילתות הבאות יוצרת VIEW המציג את שמות הסטודנטים (שם פרטי) והקורסים (שם הקורס) שרשומים אליהם, אך רק עבור קורסים עם לפחות 4 נקודות זכות?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "CREATE VIEW student_courses_view AS\nSELECT S.first_name, C.course_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.credits >= 4;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "CREATE VIEW student_courses_view AS\nSELECT first_name, course_name\nFROM Courses\nJOIN Enrollments USING(course_id)\nJOIN Students USING(student_id)\nWHERE credits > 4;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "CREATE VIEW student_courses_view AS\nSELECT S.first_name, C.course_name\nFROM Enrollments E\nJOIN Students S ON S.student_id = E.student_id\nJOIN Courses C ON C.course_id = E.course_id\nWHERE C.credits = 4;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "CREATE VIEW student_courses_view AS\nSELECT course_name, first_name\nFROM Students, Enrollments, Courses\nWHERE Students.student_id = Enrollments.student_id\n  AND Courses.course_id = Enrollments.course_id\n  AND credits >= 4;",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "‏A מחבר Students↔Enrollments↔Courses ומסנן `credits >= 4` עם סדר העמודות הנכון (first_name, course_name). B בודק `credits > 4`; C בודק `credits = 4`. ל-D ניתן ניקוד חלקי בלבד (4 נק') — סדר העמודות הפוך (course_name, first_name) והשאילתה פחות יעילה.",
   "confidence": "high",
   "id": "25B-A-Q12",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25B-A-sql",
   "question": "איזו מהשאילתות הבאות מציגה את שמות הסטודנטים שקיבלו את הציון הנמוך ביותר מכלל הציונים שניתנו בכל הקורסים?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT first_name\nFROM Students\nJOIN Enrollments USING(student_id)\nWHERE grade = (SELECT MIN(grade) FROM Enrollments);",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT first_name\nFROM Students\nJOIN Enrollments USING(student_id)\nWHERE grade > (SELECT MIN(grade) FROM Enrollments);",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT first_name\nFROM Students\nJOIN Enrollments USING(student_id)\nWHERE grade <= ALL (SELECT MAX(grade) FROM Enrollments);",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT first_name\nFROM Students\nJOIN Enrollments USING(student_id)\nWHERE grade = ANY (SELECT MIN(grade) FROM Enrollments);",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "code",
     "value": "SELECT first_name\nFROM Students\nWHERE student_id = (\n  SELECT student_id\n  FROM Enrollments\n  WHERE grade = (SELECT MIN(grade) FROM Enrollments)\n);",
     "lang": "sql"
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "d"
   ],
   "answerSource": "solution-pdf",
   "explanation": "צריך לחבר Students↔Enrollments ולסנן `grade = (SELECT MIN(grade) FROM Enrollments)`. A עושה זאת ישירות; ל-D עם `= ANY (SELECT MIN(grade)…)` תוצאה זהה (ANY מול ערך יחיד ≡ שוויון) ולכן התקבל גם הוא (4 נק'). B בודק `> MIN`, ו-C בודק `<= MAX` (כלומר את כל הציונים).",
   "confidence": "high",
   "id": "25B-A-Q5",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25B-A-sql",
   "question": "מה עושה השאילתה הבאה?",
   "code": "SELECT COUNT(DISTINCT S.student_id) AS num_of_students\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.credits >= 3;",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "סופרת את מספר הסטודנטים שנרשמו לפחות לקורס אחד שמעניק בדיוק 3 נקודות זכות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "סופרת את כמות הקורסים שבהם רשומים סטודנטים עם 3 נקודות זכות."
    },
    {
     "id": "c",
     "type": "text",
     "value": "סופרת את כל ההרשמות לקורסים עם 3 נקודות זכות ומעלה."
    },
    {
     "id": "d",
     "type": "text",
     "value": "סופרת את מספר הסטודנטים שנרשמו לקורסים שמעניקים 3 נקודות זכות או יותר."
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "‏COUNT(DISTINCT student_id) עם סינון `C.credits >= 3` סופר את מספר הסטודנטים השונים שנרשמו לקורס כלשהו המעניק 3 נקודות זכות או יותר. A מגביל ל'בדיוק 3'; B סופר קורסים; C סופר הרשמות.",
   "confidence": "high",
   "id": "25B-A-Q6",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25B-A-sql",
   "question": "איזו מהשאילתות הבאות מחזירה את שמות הסטודנטים (`first_name`) שנרשמו ליותר מ-3 קורסים במהלך הסמסטר `'Spring 2024'`?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT S.first_name\nFROM Students S\nJOIN Enrollments E\n  ON S.student_id = E.student_id\nWHERE E.semester = 'Spring 2024'\nGROUP BY S.first_name\nHAVING COUNT(E.course_id) > 3;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT S.first_name\nFROM Students S\nJOIN Enrollments E\n  ON S.student_id = E.student_id\nGROUP BY S.first_name\nHAVING COUNT(E.course_id) > 3\n  AND E.semester = 'Spring 2024';",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT S.first_name\nFROM Students S\nJOIN Enrollments E\n  ON S.student_id = E.student_id\n  AND E.semester = 'Spring 2024'\nWHERE COUNT(*) > 3\nGROUP BY S.first_name;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT S.first_name\nFROM Students S\nJOIN Enrollments E\n  ON S.student_id = E.student_id\nJOIN Courses C\n  ON E.course_id = C.course_id\nWHERE E.semester = 'Spring 2024'\nGROUP BY S.first_name\nHAVING SUM(C.credits) > 3;",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "e"
   ],
   "answerSource": "solution-pdf",
   "explanation": "צריך לסנן `semester = 'Spring 2024'` ב-WHERE ואז `HAVING COUNT(course_id) > 3`. B שם את תנאי הסמסטר ב-HAVING (שגוי); C משתמש ב-`WHERE COUNT(*)` (שגוי); D סוכם נקודות זכות. הערת ערעור: מאחר ש-GROUP BY לפי `first_name` אינו ייחודי (ייתכן שסופרים קורסים של סטודנטים שונים בעלי אותו שם), התקבלה כנכונה גם תשובה E.",
   "confidence": "high",
   "id": "25B-A-Q7",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25B-A-sql",
   "question": "מה מהבאים מתאר בצורה הנכונה ביותר את תוצאת השאילתה הבאה?",
   "code": "SELECT S.first_name, E.grade\nFROM Students S\nLEFT JOIN Enrollments E USING(student_id)\nWHERE grade < 60;",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "השאילתה מציגה את שמות הסטודנטים שקיבלו ציון מתחת ל-60."
    },
    {
     "id": "b",
     "type": "text",
     "value": "השאילתה מציגה את כל הסטודנטים, גם אם לא נרשמו לקורסים, וציון מתחת ל-60 בלבד."
    },
    {
     "id": "c",
     "type": "text",
     "value": "השאילתה מציגה את כל הסטודנטים, ובמקרים שאין להם ציונים – תופיע עמודת `grade` עם NULL."
    },
    {
     "id": "d",
     "type": "text",
     "value": "השאילתה מציגה את כל הסטודנטים שנכשלו, גם אם לא נרשמו לאף קורס."
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "e"
   ],
   "answerSource": "solution-pdf",
   "explanation": "‏LEFT JOIN עם `WHERE grade < 60` מסנן החוצה את ערכי ה-NULL, כך שבפועל מוצגים רק הסטודנטים שקיבלו ציון מתחת ל-60. הכוונה הייתה ל-A, אך מכיוון שהיא אינה מציינת שגם הציון עצמו מוצג לצד השם — התקבלה כלגיטימית גם תשובה E.",
   "confidence": "high",
   "id": "25B-A-Q8",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25B-A-sql",
   "question": "איזו שאילתה תמצא את שמות הקורסים שאליהם נרשמו סטודנטים ששמם כולל את האות `'e'` ושגילם מעל 24? (הניחו כי `birth_year < 2001` משמעו גיל מעל 24)",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT course_name\nFROM Courses C\nJOIN Enrollments E ON C.course_id = E.course_id\nJOIN Students S ON S.student_id = E.student_id\nWHERE first_name LIKE '%e%' OR birth_year < 2001;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT course_name\nFROM Students S\nJOIN Enrollments E ON S.student_id = E.student_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE S.first_name LIKE '%e%' AND S.birth_year < 2001;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT C.course_name\nFROM Students S, Enrollments E, Courses C\nWHERE S.student_id = E.student_id\n  AND E.course_id = C.course_id\n  AND S.first_name LIKE '%e%' OR S.birth_year < 2001;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT course_name\nFROM Courses\nJOIN Enrollments USING(course_id)\nJOIN Students USING(student_id)\nWHERE birth_year > 2001 AND first_name LIKE '%e%';",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "b",
   "answerSource": "solution-pdf",
   "explanation": "צריך AND בין `first_name LIKE '%e%'` לבין `birth_year < 2001` (גיל מעל 24). A ו-C משתמשים ב-OR (וב-C גם קדימות שגויה של OR מול AND); D בודק `birth_year > 2001` (כיוון הפוך). רק B נכון.",
   "confidence": "high",
   "id": "25B-A-Q9",
   "examCode": "25B-A",
   "examLabel": "2025 סמסטר ב׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "question": "איזו שאילתה מציגה את מספר המשתמשים שנרשמו לכל קורס, רק אם הקורס שייך לקטגוריה `'Programming'`?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses\nJOIN Enrollments USING(course_id)\nGROUP BY course_title\nWHERE category = 'Programming';",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT C.course_title, COUNT(*) AS num_users\nFROM Courses C\nJOIN Enrollments E ON C.course_id = E.course_id\nWHERE C.category = 'Programming'\nGROUP BY C.course_title;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT course_title, COUNT(*)\nFROM Enrollments\nWHERE category = 'Programming'\nGROUP BY course_title;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT category, COUNT(user_id)\nFROM Courses\nWHERE category = 'Programming'\nGROUP BY course_title;",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "b",
   "answerSource": "solution-pdf",
   "explanation": "מסננים category = 'Programming' ב-WHERE (לפני הקיבוץ), מקבצים לפי הקורס וסופרים COUNT(*). A שם WHERE אחרי GROUP BY (שגוי תחבירית); C מסנן category בטבלת Enrollments; D מחזיר category במקום ספירה נכונה לכל קורס.",
   "confidence": "high",
   "contextId": "25C-A-sql",
   "id": "25C-A-Q10",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "question": "איזו שאילתה מחזירה את שמות הקורסים שכל המשתמשים (מהטבלה `Users`) נרשמו אליהם?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses\nJOIN Enrollments USING(course_id)\nWHERE user_id = ALL (SELECT user_id FROM Users);",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses\nWHERE course_id IN (\n  SELECT course_id FROM Enrollments GROUP BY course_id HAVING COUNT(*) = 1\n);",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses C\nWHERE EXISTS (\n  SELECT * FROM Enrollments E\n  WHERE C.course_id = E.course_id\n);",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses C\nWHERE NOT EXISTS (\n  SELECT * FROM Users U\n  WHERE NOT EXISTS (\n    SELECT * FROM Enrollments E\n    WHERE E.user_id = U.user_id AND E.course_id = C.course_id\n  )\n);",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "זוהי חלוקה (division): קורס שאין אף משתמש שלא נרשם אליו. התבנית הנכונה היא NOT EXISTS כפול — אין משתמש שעבורו לא קיימת הרשמה לקורס הזה.",
   "confidence": "high",
   "contextId": "25C-A-sql",
   "id": "25C-A-Q11",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "question": "איזו שאילתה מחזירה את שמות הקורסים שאין עליהם אף רישום של משתמשים?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses C\nJOIN Enrollments E ON C.course_id = E.course_id\nWHERE E.user_id IS NULL;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses\nWHERE course_id IN (SELECT course_id FROM Enrollments WHERE user_id IS NULL);",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses\nWHERE EXISTS (SELECT * FROM Enrollments WHERE course_id IS NULL);",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses\nWHERE course_id NOT IN (SELECT course_id FROM Enrollments);",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "קורס ללא הרשמות = course_id שאינו מופיע כלל בטבלת Enrollments, כלומר `course_id NOT IN (SELECT course_id FROM Enrollments)`. חיבור פנימי (A) לא יחזיר קורסים ללא הרשמות כלל.",
   "confidence": "high",
   "contextId": "25C-A-sql",
   "id": "25C-A-Q12",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "question": "איזו מהשאילתות הבאות מציגה את שמות המשתמשים שנרשמו לקורסים מקטגוריית `'Data Science'` והתקדמותם בקורס פחותה מ-50%?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT first_name\nFROM Users U\nJOIN Enrollments E ON U.user_id = E.user_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE C.category = 'Data Science' AND E.progress < 50;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT U.first_name\nFROM Courses C\nJOIN Enrollments E ON C.course_id = E.course_id\nJOIN Users U ON E.user_id = U.user_id\nWHERE C.category = 'Data Science' AND E.progress > 50;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT first_name\nFROM Users\nWHERE user_id IN (\n  SELECT user_id\n  FROM Enrollments\n  WHERE progress < 50\n    AND course_id IN (\n      SELECT course_id FROM Courses WHERE category = 'Data Science'\n    )\n);",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT first_name\nFROM Users U\nJOIN Enrollments E ON U.user_id = E.user_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE E.progress <= 50 OR C.category = 'Data Science';",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "שתי התשובות נכונות, כל אחת בדרכה. לא הייתה כאן דרישה מפורשת להופעת שם רק פעם אחת — שהרי בלי DISTINCT ייתכנו כאן כפילויות. (A מבצע JOIN עם progress < 50; C משיג זאת עם תת-שאילתות. B משתמש ב-> 50, ו-D ב-<= 50 עם OR — שגויים.)",
   "confidence": "high",
   "contextId": "25C-A-sql",
   "acceptedIds": [
    "a",
    "c"
   ],
   "id": "25C-A-Q5",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "question": "איזו שאילתה מציגה את מספר המשתמשים מכל מדינה שנרשמו בשנת 2023 ומקורם לא מישראל?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT country, COUNT(user_id)\nFROM Users\nWHERE country = 'Israel' AND registration_year = 2023\nGROUP BY country;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT country, COUNT(user_id)\nFROM Users\nWHERE registration_year = 2023 OR country != 'Israel'\nGROUP BY country;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT country, COUNT(*)\nFROM Users\nWHERE registration_year = 2023 AND country <> 'Israel'\nGROUP BY country;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT country\nFROM Users\nGROUP BY registration_year = 2023 AND country != 'Israel';",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "c",
   "answerSource": "solution-pdf",
   "explanation": "צריך סינון registration_year = 2023 וגם country <> 'Israel' (תנאי AND), וספירה לכל מדינה עם GROUP BY country. A מסנן דווקא Israel, B משתמש ב-OR, ו-D בעל GROUP BY שגוי.",
   "confidence": "high",
   "contextId": "25C-A-sql",
   "id": "25C-A-Q6",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "question": "איזו מהשאילתות מחזירה את שמות הקורסים שאליהם נרשמו משתמשים שלא התקדמו כלל (`progress = 0`)?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses\nWHERE course_id IN (\n  SELECT course_id FROM Enrollments WHERE progress = 100\n);",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses C\nJOIN Enrollments E ON C.course_id = E.course_id\nWHERE E.progress = 0;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT course_title\nFROM Enrollments\nWHERE progress = 0;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses\nJOIN Enrollments ON course_id = enrollment_id\nWHERE progress = 0;",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "b",
   "answerSource": "solution-pdf",
   "explanation": "מחברים Courses ל-Enrollments לפי course_id ומסננים progress = 0. A בודק progress = 100; C שולף course_title מ-Enrollments (עמודה שאינה קיימת שם); D מחבר לפי course_id = enrollment_id — שגוי.",
   "confidence": "high",
   "contextId": "25C-A-sql",
   "id": "25C-A-Q7",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "question": "איזו שאילתה מחזירה את שם המשתמש והקורס שבו ההרשמה בוטלה (`status = 'withdrawn'`)?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT course_title\nFROM Courses\nWHERE course_id IN (\n  SELECT enrollment_id FROM Enrollments WHERE status = 'withdrawn'\n);",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT first_name, course_title\nFROM Enrollments\nWHERE status = 'withdrawn';",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT U.first_name, C.course_title\nFROM Enrollments E\nJOIN Users U ON E.enrollment_id = U.user_id\nJOIN Courses C ON E.enrollment_id = C.course_id\nWHERE status = 'withdrawn';",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT U.first_name, C.course_title\nFROM Users U\nJOIN Enrollments E ON U.user_id = E.user_id\nJOIN Courses C ON E.course_id = C.course_id\nWHERE E.status = 'withdrawn';",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "צריך לחבר Users↔Enrollments לפי user_id ו-Enrollments↔Courses לפי course_id, ולסנן status = 'withdrawn'. C מחבר לפי enrollment_id (שגוי); A ו-B אינם מחזירים גם שם וגם קורס נכונים.",
   "confidence": "high",
   "contextId": "25C-A-sql",
   "id": "25C-A-Q8",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "question": "איזו שאילתה יוצרת VIEW עם שם הקורס, שם המדריך והתאריך שבו המדריך התחיל ללמד? (**הערה:** הניחו כי קיימת קורלציה בין הערכים ב-`Courses.category` לבין הערכים ב-`Instructors.expertise`.)",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "CREATE VIEW course_instructor_view AS\nSELECT C.course_title, I.full_name, I.hire_date\nFROM Courses C\nJOIN Instructors I ON C.category = I.expertise;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "CREATE VIEW course_instructor_view AS\nSELECT full_name, course_title, hire_date\nFROM Courses, Instructors\nWHERE Courses.level = Instructors.level;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "CREATE VIEW course_instructor_view AS\nSELECT course_title, full_name, hire_date\nFROM Courses C\nJOIN Enrollments E ON C.course_id = E.course_id\nJOIN Instructors I ON C.category = I.email;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "CREATE VIEW course_instructor_view AS\nSELECT course_title, full_name, hire_date\nFROM Courses JOIN Instructors USING(course_id);",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "החיבור הנכון הוא לפי `Courses.category = Instructors.expertise` (כפי שרומז ההערה). B מחבר לפי level (שאינו קיים ב-Instructors); C לפי category = email; D לפי course_id ב-USING (שאינו קיים ב-Instructors).",
   "confidence": "high",
   "contextId": "25C-A-sql",
   "id": "25C-A-Q9",
   "examCode": "25C-A",
   "examLabel": "2025 סמסטר ג׳ מועד א׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25S-B-sql",
   "question": "איזו שאילתה מחזירה את מספר ההזמנות לכל מוכר עבור מוצרים בקטגוריית `'Home'` מתוך הזמנות במצב `'Paid'`?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT S.name, COUNT(O.order_id)\nFROM Sellers S\nJOIN Products P    ON P.seller_id = S.seller_id\nJOIN OrderItems OI ON OI.product_id = P.product_id\nJOIN Orders O      ON O.order_id = OI.order_id\nWHERE P.category = 'Home' AND O.status = 'Paid'\nGROUP BY S.name;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT S.name, COUNT(*) AS num_orders\nFROM Sellers S\nJOIN Products P    ON P.seller_id = S.seller_id\nJOIN OrderItems OI ON OI.product_id = P.product_id\nJOIN Orders O      ON O.order_id = OI.order_id\nWHERE P.category = 'Home' AND O.status = 'Paid'\nGROUP BY S.name;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT S.name, SUM(OI.quantity) AS total_items\nFROM Sellers S\nJOIN Products P    ON P.seller_id = S.seller_id\nJOIN OrderItems OI ON OI.product_id = P.product_id\nJOIN Orders O      ON O.order_id = OI.order_id\nWHERE P.category = 'Home' AND O.status = 'Paid'\nGROUP BY S.name;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT S.name, COUNT(O.order_id)\nFROM Sellers S\nLEFT JOIN Orders O ON TRUE\nWHERE O.status = 'Paid'\nGROUP BY S.name;",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "a",
   "acceptedIds": [
    "a",
    "b",
    "e"
   ],
   "explanation": "החיבור הנכון הוא Sellers→Products→OrderItems→Orders עם סינון `category='Home'` ו-`status='Paid'` וקיבוץ לפי המוכר. A סופרת `COUNT(O.order_id)` ו-B סופרת `COUNT(*)`. לפי הטבלה הרשמית התקבלו A, B וגם E.",
   "confidence": "high",
   "id": "25S-B-Q10",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25S-B-sql",
   "question": "איזו שאילתה מחזירה את שמות המוצרים שהוזמנו על-ידי לפחות 3 לקוחות שונים?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT P.name\nFROM Products P\nJOIN OrderItems OI ON OI.product_id = P.product_id\nJOIN Orders O ON O.order_id = OI.order_id\nGROUP BY P.name\nHAVING COUNT(O.customer_id) > 3;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT DISTINCT P.name\nFROM Products P\nJOIN OrderItems OI ON OI.product_id = P.product_id\nJOIN Orders O ON O.order_id = OI.order_id\nWHERE O.customer_id >= 3;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT P.name\nFROM Products P\nJOIN OrderItems OI ON OI.product_id = P.product_id\nJOIN Orders O ON O.order_id = OI.order_id\nGROUP BY P.name\nHAVING COUNT(DISTINCT O.customer_id) >= 3;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT P.name\nFROM Products P\nWHERE (SELECT COUNT(O.customer_id)\n       FROM Orders O\n       JOIN OrderItems OI ON OI.order_id = O.order_id\n       WHERE OI.product_id = P.product_id) >= 3;",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "c",
   "explanation": "\"לפחות 3 לקוחות שונים\" דורש `COUNT(DISTINCT O.customer_id) >= 3` לאחר קיבוץ לפי המוצר — כפי שב-C. A סופרת ללא DISTINCT ועם > 3; B בודקת `customer_id >= 3` (השוואת ערך המזהה); D סופרת הופעות ולא לקוחות שונים.",
   "confidence": "high",
   "id": "25S-B-Q11",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25S-B-sql",
   "question": "איזו שאילתה מחזירה את שמות המוצרים שאין להם אף ביקורת ב-`Reviews`?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT name\nFROM Products\nGROUP BY name\nHAVING COUNT(*) = 0;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT DISTINCT P.name\nFROM Products P\nJOIN Reviews R ON R.product_id = P.product_id\nWHERE R.stars < 3;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT P.name\nFROM Products P\nLEFT JOIN Reviews R ON R.product_id = P.product_id\nWHERE R.product_id IS NULL;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT DISTINCT P.name\nFROM Products P\nJOIN Reviews R ON R.product_id = P.product_id\nWHERE R.stars = 0;",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "c",
   "explanation": "מוצר ללא ביקורת = אין לו התאמה ב-Reviews. LEFT JOIN עם `R.product_id IS NULL` מחזיר בדיוק אותם. A תמיד ריקה; B ו-D מחייבות קיום ביקורת (חיבור פנימי).",
   "confidence": "high",
   "id": "25S-B-Q12",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25S-B-sql",
   "question": "אילו שאילתות מציגות שם לקוח ו-שם מוצר עבור פריטים שהוזמנו בקטגוריית `'Electronics'`, בכמות ≤ 2, מתוך הזמנות במצב `'Paid'`?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT C.first_name, P.name\nFROM Customers C, Orders O, OrderItems OI, Products P\nWHERE P.category = 'Electronics' OR OI.quantity >= 2\n  AND C.customer_id = O.customer_id\n  AND O.order_id    = OI.order_id\n  AND OI.product_id = P.product_id;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT DISTINCT C.first_name, C.last_name, P.name\nFROM Customers C\nJOIN Orders O      ON O.customer_id = C.customer_id\nJOIN OrderItems OI ON OI.order_id   = O.order_id\nJOIN Products P    ON P.product_id  = OI.product_id\nWHERE P.category = 'Electronics'\n  AND O.status <> 'Paid';",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT first_name, last_name, name\nFROM Customers NATURAL JOIN Products\nWHERE category = 'Electronics'\n  AND quantity >= 2\n  AND status = 'Paid';",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT first_name, last_name, name\nFROM Customers NATURAL JOIN Products\nWHERE category = 'Electronics' AND quantity >= 2 AND status = 'Paid';",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "e",
   "explanation": "אף שאילתה אינה נכונה: A משתמשת ב-OR (במקום AND) ואינה מסננת `status='Paid'`; B מסננת `status <> 'Paid'` (הפוך) וללא תנאי כמות; C ו-D משתמשות ב-NATURAL JOIN בין Customers ל-Products (חיבור שגוי, ללא Orders/OrderItems, והעמודות quantity/status אינן קיימות שם). לכן E.",
   "confidence": "high",
   "id": "25S-B-Q5",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25S-B-sql",
   "question": "איזו שאילתה מציגה את מספר הלקוחות מכל מדינה שהצטרפו בשנת 2024 ואינם מישראל?\n\n**שימו לב:** נשתמש ב-`EXTRACT(YEAR FROM joined_at)` כדי לבדוק אם **שנת ההצטרפות** היא 2024.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT country, COUNT(*)\nFROM Customers\nWHERE joined_at >= '2024-01-01' OR country != 'Israel'\nGROUP BY 1;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT country, COUNT(country)\nFROM Customers\nGROUP BY EXTRACT(YEAR FROM joined_at) = 2024, country <> 'Israel';",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT DISTINCT country, COUNT(_customer_id_)\nFROM Customers\nWHERE country NOT IN ('Israel') AND EXTRACT(YEAR FROM joined_at) = 2023\nGROUP BY country;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT country, COUNT(*) AS num_customers\nFROM Customers\nWHERE EXTRACT(YEAR FROM joined_at) = 2024 AND country <> 'Israel'\nGROUP BY country;",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "d",
   "explanation": "צריך לסנן ב-WHERE את `EXTRACT(YEAR FROM joined_at) = 2024` וגם `country <> 'Israel'` (תנאי AND) ולספור לכל מדינה עם GROUP BY country. A משתמשת ב-OR; B ממקמת את התנאים ב-GROUP BY; C מסננת שנת 2023. רק D נכונה.",
   "confidence": "high",
   "id": "25S-B-Q6",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25S-B-sql",
   "question": "איזו שאילתה מחזירה את שמות המוצרים שמעולם לא הוזמנו?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT name\nFROM Products\nWHERE product_id IN (SELECT product_id FROM OrderItems);",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT P.name\nFROM Products P\nLEFT JOIN OrderItems OI ON OI.product_id = P.product_id\nWHERE OI.product_id IS NULL;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT P.name\nFROM Products P\nJOIN OrderItems OI ON OI.product_id = P.product_id\nGROUP BY P.name\nHAVING COUNT(*) = 0;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT P.name\nFROM Products P\nWHERE EXISTS (\n  SELECT 1\n  FROM OrderItems OI\n  WHERE OI.product_id = P._product_id_\n);",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "b",
   "explanation": "מוצר שלא הוזמן = מוצר שאין לו התאמה ב-OrderItems. LEFT JOIN עם `OI.product_id IS NULL` מחזיר בדיוק את המוצרים ללא הזמנה. A מחזירה את ההפך; C תמיד ריקה (חיבור פנימי + COUNT=0); D מכילה שגיאה `P._product_id_`.",
   "confidence": "high",
   "id": "25S-B-Q7",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25S-B-sql",
   "question": "איזו שאילתה מחזירה את שם הלקוח ומספר ההזמנה להזמנות שבוטלו (`status='Cancelled'`) הכוללות לפחות פריט אחד שנמכר ע\"י מוכר בדירוג > 3.5?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT C.first_name, C.last_name, O.order_id\nFROM Customers C\nJOIN Orders O ON O.customer_id = C.customer_id\nWHERE O.status = 'Cancelled';",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT C.first_name, C.last_name, O.order_id\nFROM Customers C\nJOIN Orders O ON O.customer_id = C.customer_id\nWHERE O.status = 'Cancelled' AND S.rating < 3.5;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT C.first_name, C.last_name, O.order_id\nFROM Customers C, Orders O, Sellers S\nWHERE O.status = 'Cancelled' AND S.rating < 3.5;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT DISTINCT C.first_name, C.last_name, O.order_id\nFROM Orders O\nJOIN Customers C   ON C.customer_id = O.customer_id\nJOIN OrderItems OI ON OI.order_id   = O.order_id\nJOIN Products P    ON P.product_id  = OI.product_id\nJOIN Sellers S     ON S.seller_id   = P.seller_id\nWHERE O.status = 'Cancelled' AND S.rating < 3.5;",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "d",
   "explanation": "רק D מבצעת את שרשרת החיבורים הנכונה עד ל-Sellers (Orders→OrderItems→Products→Sellers) ולכן מסוגלת לסנן לפי דירוג המוכר. A אינה מגיעה כלל ל-Sellers; B ו-C מפנות ל-S ללא חיבור תקין. (התשובה הרשמית: D.)",
   "confidence": "high",
   "id": "25S-B-Q8",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "25S-B-sql",
   "question": "איזו שאילתה יוצרת VIEW בשם `ProductSellerInfo` הכולל שם מוצר, שם מוכר ו-תאריך פתיחת החנות, עבור מוצרים **פעילים** שמחירם > 100?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "CREATE VIEW ProductSellerInfo AS\nSELECT P.name AS product_name,\n       S.name AS seller_name,\n       S.opened_at\nFROM Products P\nJOIN Sellers  S ON S.seller_id = P.seller_id\nWHERE P.active = TRUE\n  AND P.price  > 100;",
     "lang": "sql"
    },
    {
     "id": "b",
     "type": "code",
     "value": "CREATE VIEW ProductSellerInfo AS\nSELECT P.name AS product_name,\n       S.name AS seller_name,\n       S.opened_at\nFROM Products P, Sellers S\nWHERE P.active = TRUE\n  AND P.price  > 100;",
     "lang": "sql"
    },
    {
     "id": "c",
     "type": "code",
     "value": "CREATE VIEW ProductSellerInfo AS\nSELECT P.name AS product_name,\n       S.name AS seller_name,\n       S.opened_at\nFROM Products P\nJOIN Sellers S ON P.product_id = S.seller_id\nWHERE P.active = TRUE\n  AND P.price  > 100;",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "CREATE VIEW ProductSellerInfo AS\nSELECT S.name AS seller_name,\n       S.opened_at\nFROM Sellers S;",
     "lang": "sql"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות."
    }
   ],
   "correctId": "a",
   "explanation": "החיבור הנכון הוא `S.seller_id = P.seller_id`, עם סינון `P.active = TRUE AND P.price > 100` והצגת שם מוצר, שם מוכר ותאריך פתיחה. B מבצעת מכפלה קרטזית ללא תנאי חיבור; C מחברת לפי `P.product_id = S.seller_id` (שגוי); D מחזירה רק פרטי מוכר.",
   "confidence": "high",
   "id": "25S-B-Q9",
   "examCode": "25S-B",
   "examLabel": "2025 סמסטר קיץ מועד ב׳",
   "year": 2025,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  }
 ]
};
