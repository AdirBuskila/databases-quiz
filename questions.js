window.DB_QUIZ = {
 "meta": {
  "generated": "build_questions.py",
  "exams": 13,
  "counts": {
   "total": 272,
   "contexts": 48
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
   "caption": "התרשים מתאר בסיס נתונים של חברות הפקה, מופעים, שחקנים/ות, פרסים ומדינות. (התרשים חולץ מהמבחן.)"
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
   "caption": "התייחסו לתרשים ה-ERD \"ניהול שאלות\" המתאר בסיס נתונים, וענו על השאלות. הערה לגבי התרשים: בבחינה המקורית התכונה \"מזהה כניסה\" מסומנת בקו תחתון מקווקו, כלומר מפתח חלקי (partial key) של ישות חלשה. בסריקה שברשותנו הקו המקווקו נמרח לקו מלא ולכן הוא נראה כמו מפתח רגיל — יש להתייחס אל \"מזהה כניסה\" כאל מפתח חלקי."
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
   "caption": "התרשים מתאר את מערכת הרישום של מכללה. התייחסו אליו וענו על השאלות. (התרשים חולץ מהמבחן.)"
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
   "caption": "התייחסו לתרשים ה-ERD למעלה וענו על השאלות. (התרשים חולץ מהמבחן.)"
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
  },
  "26B-A-erd": {
   "kind": "image",
   "title": "חלק א׳ — ERD",
   "image": "images/exams/26B-A-erd.png",
   "caption": "התייחסו לתרשים ה-ERD הנתון וענו על השאלות. (התרשים חולץ מהמבחן.)"
  },
  "26B-A-sql": {
   "kind": "schema",
   "title": "חלק ב׳ — SQL: רשת מועדוני כושר",
   "intro": "נתונות תבניות היחסים הבאות, המתארות אפליקציה של רשת מועדוני כושר. קו תחתון מסמן מפתח קביל.",
   "relations": [
    {
     "schema": "Member([u]member_id[/u], name, city, age)",
     "meaning": "מנוי — מזהה מנוי, שם, עיר מגורים, גיל."
    },
    {
     "schema": "Class([u]class_id[/u], title, type, price, studio)",
     "meaning": "שיעור — מזהה שיעור, כותרת, סוג (Pilates / Spin / Yoga), מחיר, סטודיו."
    },
    {
     "schema": "Trainer([u]trainer_id[/u], name, country)",
     "meaning": "מאמן/ת — מזהה מאמן, שם, מדינה."
    },
    {
     "schema": "Teaches([u]trainer_id[/u], [u]class_id[/u])",
     "meaning": "הוראה — איזה מאמן מעביר איזה שיעור (יחס רבים-לרבים)."
    },
    {
     "schema": "Attendance([u]member_id[/u], [u]class_id[/u], [u]attend_date[/u], fee_paid)",
     "meaning": "השתתפות — מנוי השתתף בשיעור בתאריך מסוים, והמחיר ששילם בפועל (`fee_paid`)."
    }
   ]
  },
  "26B-A-ra": {
   "kind": "schema",
   "title": "חלק ג׳ — אלגברת היחסים: פלטפורמת פרילנסרים",
   "intro": "נתונות תבניות/סכמות יחסים מתוך בסיס נתונים של פלטפורמה המקשרת בין פרילנסרים ללקוחות. ניתן להניח שבטבלאות אין ערכים ריקים (Null).",
   "relations": [
    {
     "schema": "freelancer([u]id[/u], name, age, country)",
     "meaning": "פרטי פרילנסר: מספר מזהה, שם, גיל ומדינת מגורים."
    },
    {
     "schema": "client([u]id[/u], industry, country, is_verified)",
     "meaning": "פרטי לקוח: מספר מזהה, תחום/ענף, מדינה, והאם הלקוח מאומת."
    },
    {
     "schema": "project([u]project_id[/u], title, client_id, description, is_remote)",
     "meaning": "פרויקט: מזהה פרויקט, כותרת, מזהה הלקוח שפרסם, פרטים, והאם מתבצע מרחוק."
    },
    {
     "schema": "bid([u]freelancer_id[/u], [u]project_id[/u])",
     "meaning": "הגשת הצעה של פרילנסר לפרויקט (מזהה פרילנסר, מזהה פרויקט)."
    },
    {
     "schema": "contract([u]contract_id[/u], project_id, freelancer_id, client_id, is_remote)",
     "meaning": "חוזה חתום: מזהה חוזה, מזהה הפרויקט שהוא נושא החוזה, מזהה פרילנסר, מזהה לקוח, והאם מתבצע מרחוק."
    }
   ],
   "note": "**הערות:** פרילנסר יכול גם להיות לקוח (לפרסם פרויקטים משלו). פרילנסר יכול להגיש הצעה לפרויקט, לחתום על חוזה, או שניהם."
  },
  "26B-A-fd": {
   "kind": "fd",
   "title": "חלק ד׳ — תלויות פונקציונליות",
   "algebra": [
    "R = (A, B, C, D, E)",
    "F = {A → B, B → C, A → D, AC → E}"
   ]
  },
  "26S-A-erd": {
   "kind": "image",
   "title": "חלק א׳ — ERD: חברת תעופה (עם ISA)",
   "image": "images/exams/26S-A-erd.png",
   "caption": "התייחסו לתרשים ה-ERD הנתון. קו תחתון מסמן מפתח ראשי בתבניות היחסים. (התרשים חולץ מהמבחן.)"
  },
  "26S-A-sql": {
   "kind": "schema",
   "title": "חלקים ב׳–ג׳ — SQL ואלגברת היחסים: טיסות",
   "intro": "נתונות תבניות היחסים הבאות (סכמה חדשה, שאינה קשורה לתרשים ה-ERD שבחלק א׳). קו תחתון מסמן מפתח ראשי. ב-Booking, התכונה `passenger_id` היא מפתח זר ל-Passenger, והתכונה `flight_number` היא מפתח זר ל-Flight. השאילתות כתובות בתחביר MySQL. בחלק ג׳ הסימן ÷ מציין חילוק (division).",
   "relations": [
    {
     "schema": "Passenger([u]passenger_id[/u], full_name, city, birth_year)",
     "meaning": "נוסע — מזהה, שם מלא, עיר מגורים, שנת לידה."
    },
    {
     "schema": "Flight([u]flight_number[/u], origin, destination, dep_date, price)",
     "meaning": "טיסה — מספר טיסה, מוצא, יעד, תאריך המראה, מחיר."
    },
    {
     "schema": "Booking([u]passenger_id[/u], [u]flight_number[/u], seat_no, booking_date)",
     "meaning": "הזמנה — נוסע הזמין טיסה, עם מספר מושב ותאריך הזמנה."
    },
    {
     "schema": "Aircraft([u]tail_number[/u], model, capacity)",
     "meaning": "מטוס — מספר זנב, דגם, קיבולת."
    }
   ]
  },
  "26S-A-fd": {
   "kind": "fd",
   "title": "חלק ד׳ — תלויות פונקציונליות",
   "algebra": [
    "R = (A, B, C, D, E)",
    "F = {E → A, A → B, B → C, AC → D, E → C}"
   ]
  },
  "26Z-CL-erd": {
   "kind": "erd",
   "title": "חלק א׳ — ERD",
   "intro": "התייחסו לתרשים ה-ERD הנתון וענו על השאלות. הניחו שבתרגום משתמשים בשיטה הסטנדרטית של הקורס (טבלה לכל תת-סוג עם המפתח היורש), ושאר הקשרים מתורגמים בתרגום היעיל ביותר.",
   "erd": {
    "w": 960,
    "h": 560,
    "alt": "תרשים מופשט: הקבצה A-R1-B, הקשר R2 אל C1, היררכיית C, קשר טרינארי R3, ישות חלשה W",
    "nodes": [
     {
      "id": "G",
      "t": "agg",
      "x": 300,
      "y": 120,
      "w": 540,
      "h": 200,
      "label": "A - R1 - B"
     },
     {
      "id": "A",
      "t": "entity",
      "x": 130,
      "y": 130,
      "label": "A"
     },
     {
      "id": "kA",
      "t": "attr",
      "x": 120,
      "y": 62,
      "label": "KeyA",
      "key": true,
      "of": "A"
     },
     {
      "id": "pA",
      "t": "attr",
      "x": 150,
      "y": 190,
      "label": "PropA_2",
      "multi": true,
      "of": "A"
     },
     {
      "id": "R1",
      "t": "rel",
      "x": 300,
      "y": 130,
      "label": "R1"
     },
     {
      "id": "pR1",
      "t": "attr",
      "x": 300,
      "y": 55,
      "label": "PropR1_1",
      "of": "R1"
     },
     {
      "id": "B",
      "t": "entity",
      "x": 470,
      "y": 130,
      "label": "B"
     },
     {
      "id": "kB",
      "t": "attr",
      "x": 480,
      "y": 55,
      "label": "KeyB",
      "key": true,
      "of": "B"
     },
     {
      "id": "R2",
      "t": "rel",
      "x": 300,
      "y": 300,
      "label": "R2"
     },
     {
      "id": "C",
      "t": "entity",
      "x": 720,
      "y": 110,
      "label": "C"
     },
     {
      "id": "kC",
      "t": "attr",
      "x": 720,
      "y": 40,
      "label": "KeyC",
      "key": true,
      "of": "C"
     },
     {
      "id": "pC",
      "t": "attr",
      "x": 840,
      "y": 110,
      "label": "PropC_1",
      "of": "C"
     },
     {
      "id": "isa",
      "t": "isa",
      "x": 720,
      "y": 190
     },
     {
      "id": "C1",
      "t": "entity",
      "x": 600,
      "y": 300,
      "label": "C1"
     },
     {
      "id": "pC1",
      "t": "attr",
      "x": 600,
      "y": 375,
      "label": "PropC1_1",
      "of": "C1"
     },
     {
      "id": "C2",
      "t": "entity",
      "x": 820,
      "y": 300,
      "label": "C2"
     },
     {
      "id": "pC2",
      "t": "attr",
      "x": 900,
      "y": 230,
      "label": "PropC2_1",
      "of": "C2"
     },
     {
      "id": "R3",
      "t": "rel",
      "x": 760,
      "y": 420,
      "label": "R3"
     },
     {
      "id": "D",
      "t": "entity",
      "x": 900,
      "y": 440,
      "label": "D"
     },
     {
      "id": "kD",
      "t": "attr",
      "x": 900,
      "y": 370,
      "label": "KeyD",
      "key": true,
      "of": "D"
     },
     {
      "id": "pD",
      "t": "attr",
      "x": 900,
      "y": 515,
      "label": "PropD_1",
      "derived": true,
      "of": "D"
     },
     {
      "id": "W",
      "t": "entity",
      "x": 620,
      "y": 440,
      "label": "W",
      "weak": true
     },
     {
      "id": "dW",
      "t": "attr",
      "x": 560,
      "y": 515,
      "label": "DiscW_1",
      "partial": true,
      "of": "W"
     },
     {
      "id": "pW",
      "t": "attr",
      "x": 680,
      "y": 515,
      "label": "PropW_1",
      "of": "W"
     },
     {
      "id": "R4",
      "t": "rel",
      "x": 450,
      "y": 440,
      "label": "R4",
      "ident": true
     },
     {
      "id": "E",
      "t": "entity",
      "x": 280,
      "y": 440,
      "label": "E"
     },
     {
      "id": "kE",
      "t": "attr",
      "x": 280,
      "y": 370,
      "label": "KeyE",
      "key": true,
      "of": "E"
     },
     {
      "id": "pE",
      "t": "attr",
      "x": 280,
      "y": 515,
      "label": "PropE_1",
      "of": "E"
     }
    ],
    "edges": [
     {
      "a": "R1",
      "b": "A"
     },
     {
      "a": "R1",
      "b": "B"
     },
     {
      "a": "R2",
      "b": "G",
      "total": true
     },
     {
      "a": "R2",
      "b": "C1",
      "arrow": true
     },
     {
      "a": "isa",
      "b": "C"
     },
     {
      "a": "isa",
      "b": "C1"
     },
     {
      "a": "isa",
      "b": "C2"
     },
     {
      "a": "R3",
      "b": "C2"
     },
     {
      "a": "R3",
      "b": "D",
      "arrow": true
     },
     {
      "a": "R3",
      "b": "W"
     },
     {
      "a": "R4",
      "b": "E",
      "arrow": true
     },
     {
      "a": "R4",
      "b": "W",
      "total": true
     }
    ]
   }
  },
  "26Z-CL-sql": {
   "kind": "schema",
   "title": "חלק ב׳ — SQL: חברת תעופה",
   "intro": "נתונות תבניות היחסים הבאות של חברת תעופה. קו תחתון מסמן מפתח ראשי.",
   "relations": [
    {
     "schema": "Passengers([u]passenger_id[/u], name, country, birth_year)",
     "meaning": "נוסע — מזהה, שם, מדינה ושנת לידה."
    },
    {
     "schema": "Flights([u]flight_id[/u], origin, destination, flight_date, price)",
     "meaning": "טיסה — מזהה, שדה מוצא (למשל `'TLV'`), יעד (למשל `'Rome'`), תאריך ומחיר בסיס."
    },
    {
     "schema": "Bookings([u]passenger_id[/u], [u]flight_id[/u], seat_class, paid)",
     "meaning": "הזמנה — נוסע הזמין מקום בטיסה. מחלקה (`'Economy'` / `'Business'`) והסכום ששולם בפועל (`paid`). נוסע מזמין טיסה מסוימת פעם אחת לכל היותר."
    },
    {
     "schema": "Pilots([u]pilot_id[/u], name, hire_year)",
     "meaning": "טייס — מזהה, שם ושנת קליטה."
    },
    {
     "schema": "Assignments([u]pilot_id[/u], [u]flight_id[/u])",
     "meaning": "שיבוץ — טייס שובץ לטיסה (בטיסה יכולים להיות כמה טייסים)."
    }
   ]
  },
  "26Z-CL-ra": {
   "kind": "schema",
   "title": "חלק ג׳ — אלגברת היחסים: שירות סטרימינג למוזיקה",
   "intro": "נתונות סכמות היחסים הבאות. ניתן להניח שאין ערכים ריקים (Null).",
   "relations": [
    {
     "schema": "listener([u]listener_id[/u], name, country, age)",
     "meaning": "מאזין: מזהה, שם, מדינה וגיל."
    },
    {
     "schema": "artist([u]artist_id[/u], name, country)",
     "meaning": "אמן: מזהה, שם ומדינת מוצא."
    },
    {
     "schema": "album([u]album_id[/u], title, artist_id, genre)",
     "meaning": "אלבום: מזהה, שם, מזהה האמן וז׳אנר (למשל `\"Jazz\"`)."
    },
    {
     "schema": "plays([u]listener_id[/u], [u]album_id[/u])",
     "meaning": "האזנה: המאזין האזין לאלבום (לפחות פעם אחת)."
    }
   ]
  },
  "26Z-CL-q16": {
   "kind": "relations",
   "title": "שני יחסים R, S",
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
       "1",
       "x",
       "10"
      ],
      [
       "2",
       "y",
       "20"
      ],
      [
       "3",
       "x",
       "10"
      ],
      [
       "4",
       "z",
       "30"
      ]
     ]
    },
    {
     "name": "S",
     "columns": [
      "B",
      "C",
      "D"
     ],
     "rows": [
      [
       "x",
       "10",
       "5"
      ],
      [
       "x",
       "12",
       "5"
      ],
      [
       "x",
       "10",
       "6"
      ],
      [
       "y",
       "20",
       "7"
      ],
      [
       "y",
       "25",
       "8"
      ],
      [
       "w",
       "30",
       "9"
      ]
     ]
    }
   ]
  },
  "26Z-CL-fd": {
   "kind": "fd",
   "title": "חלק ד׳ — יחס ותלויות",
   "algebra": [
    "R = (A, B, C, D, E)",
    "F1 = {AB → C, C → D, D → A, BD → E}"
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
   "explanation": "\"מניות\" ו\"ותק\" הן תכונות של תת-ישויות מסוימות בלבד (מנכ\"ל / מתכנת), ולכן ההיגדים \"לכל עובד יש שכר ומניות\" ו\"לכל עובד נשמר הותק\" שגויים. עקב השתתפות מלאה של החברה בקשר \"מנהל\", לכל חברת סטארט-אפ יש מנכ\"ל אחד לפחות. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "correctId": "c",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "הקשר \"חונך\" הוא קשר רקורסיבי על ישות אחת (מנכ\"ל חונך מנכ\"ל מנוסה אחר), ולכן שתי הדיאגרמות שבהן מנכ\"ל מחובר פעמיים לקשר \"חונך\" מציגות אותו נכון כקשר רקורסיבי. ההבדל ביניהן: השאלה מדברת על \"מנכ\"ל שמנהל חברה מסוימת\", כלומר החונכות נקשרת גם לחברה שבה מכהן המנכ\"ל — ורק אחת מהן מחברת גם את חברת הסטארט-אפ אל קשר החונכות. הדיאגרמה שבה \"חונך\" מקשר רק בין מנכ\"ל לחברה מציגה קשר לא-רקורסיבי (כלומר החונך אינו מנכ\"ל), והדיאגרמה שבה \"חונך\" מצויר כאליפסה מציגה אותו כתכונה במקום כקשר. לכן הדיאגרמה הרקורסיבית שגם חברת הסטארט-אפ מחוברת בה לקשר היא השלמה והנכונה ביותר. (התשובה מפתרון סטודנט — לא רשמית. בדף המקור החלופה הרקורסיבית ללא החברה מסומנת ב-✗ והחלופה הנכונה מסומנת בהדגשה, וזהו הסימון שעליו מסתמכות שאר שאלות הבחינה.)",
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
     "value": "{opt:b} + {opt:c}"
    },
    {
     "id": "e",
     "type": "text",
     "value": "{opt:a} + {opt:c}"
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "‏'סגנון גלישה' היא תכונה מרובת-ערכים של תת-הישות מדריכת גלישה. חלופה {opt:c} מכילה את כל התכונות הנובעות דרך ה-ISA ('מספר זהות', 'עובד מתאריך', 'שכר', 'שם מלא'), וחלופה {opt:b} מייצגת את התכונה מרובת-הערכים כטבלה נפרדת. לכן נדרשות גם {opt:b} וגם {opt:c}.",
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
   "explanation": "על-פי המחוון זו התשובה הנכונה: בתרשים שני מקומות עם קווים עבים (ב'מיקום מסלול גלישה' וב'מוצר נמכר ב'), ורק אחד מהם שימוש תקין — ולכן קיימת שגיאת סינטקס.",
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
   "explanation": "בקשר \"נולד/ה ב\" יש חץ מ\"שחקן/ית\" אל \"מדינה\", כלומר כל שחקן נולד במדינה אחת — ולכן במדינה מסוימת יכולים להיוולד מספר שחקנים. שאר ההיגדים אינם נובעים מהתרשים.",
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
   "explanation": "לישות \"פרס\" יש השתתפות מלאה (קו כפול) בקשר \"זוכה ב\", ולכן כל פרס חייב שיהיה לו לפחות זוכה אחד. אין חובת השתתפות מלאה על השחקן.",
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
   "explanation": "אפשר לאחד תכונות פשוטות לתכונה מורכבת — למשל \"שם פרטי\" ו\"שם משפחה\" של שחקן/ית לתכונה מורכבת \"שם\". אין בתרשים תכונה מרובת-ערכים ואין טעות תחביר.",
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
   "explanation": "\"כניסות\" הוא טיפוס ישויות חלש התלוי ב\"משתמש\", ולכן מפתחו כולל את המפתח החלקי שלו יחד עם מפתח הישות השולטת. התקבלו שתי תשובות: \"מזהה כניסה, מזהה משתמש\" וגם \"מזהה כניסה\".",
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
   "explanation": "לפי הקשר הרקורסיבי \"נושא אב\", סכמת \"נושא\" כוללת את שם הנושא ואת ה-FK לנושא האב. התקבלו שתי תשובות: 2 וגם 1.",
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
   "explanation": "ישות חלשה תלויה לזיהוי בישות אחרת ולכן היא נשלטת. התקבלו שתי תשובות: \"כל טיפוס ישויות חלש הוא נשלט\" וגם \"כל טיפוס ישויות נשלט הוא חלש\".",
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
   "explanation": "מפתח המרצה הוא \"שם\" בלבד (שדה יחיד); המפתח של סטודנט לתואר ראשון הוא \"ת\"ז\" שיורש מהאב בלבד; \"כיתה\" היא ישות חזקה שמפתחה \"מס' כיתה\" בלבד. לכן אף אחד מארבעת ההיגדים האחרים אינו נכון.",
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
   "explanation": "לפי טבלת התשובות הרשמית התקבלו כאן **שתי תשובות**: \"בטבלה של מלמד ב יש שני שדות המהווים מפתח\" (מספר שדות המפתח בטבלת הקשר \"מלמד ב\") וגם \"כל התשובות האחרות אינן נכונות\".",
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
   "explanation": "התכונה הרב-ערכית \"פרויקט\" נדרשת לטבלה נפרדת פרויקטים(תז, פרויקט), והתאריך המורכב מתפרק ל-יום/חודש/שנה. לפי הטבלה הרשמית התקבלו שתי תשובות: ההמרה עם יום/חודש/שנה וטבלת פרויקטים נפרדת, וגם \"כל התשובות האחרות אינן נכונות\".",
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
   "explanation": "המרת תת-הסוג ב-ISA יוצרת טבלה עם המפתח היורש \"תז\" ותכונת התת-סוג עצמו \"תזה\" בלבד — כלומר (תז, תזה).",
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
   "part": "א",
   "topic": "erd",
   "contextId": "26B-A-erd",
   "question": "בתרגום היעיל ביותר, כמה טבלאות נדרשות עבור `M` ו-`A` והקשר `R3` שביניהן (בלי לספור את `M1`, `M2`)?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "2 — (M, A). R3 ממוזג לתוך M"
    },
    {
     "id": "b",
     "type": "text",
     "value": "3 — (M, A, R3)."
    },
    {
     "id": "c",
     "type": "text",
     "value": "1 — הכול ממוזג לטבלה אחת"
    },
    {
     "id": "d",
     "type": "text",
     "value": "2 — (A, R3). M ממוזגת לתוך A"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "‏R3 הוא קשר אחד-לרבים: החץ פונה אל A, כלומר כל M קשור ל-A אחד לכל היותר. קשר כזה ממזגים לצד ה'רבים' — מוסיפים את `KeyA` כמפתח זר לטבלת M. נשארות שתי טבלאות: M ו-A.",
   "confidence": "high",
   "id": "26B-A-Q1",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26B-A-erd",
   "question": "אם נוסיף חץ המכוון מ-`R2` לישות `A`, מה יהיה המפתח הראשי של טבלת `R2`?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "{KeyG, KeyB}"
    },
    {
     "id": "b",
     "type": "text",
     "value": "{KeyA}"
    },
    {
     "id": "c",
     "type": "text",
     "value": "{KeyG, KeyB, KeyA}"
    },
    {
     "id": "d",
     "type": "text",
     "value": "{KeyG, KeyA}"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "‏R2 מקשר את A עם הצבירה B-R1-G, שהמפתח שלה הוא המפתח של R1: ‏{KeyG, KeyB}. חץ אל A אומר שכל מופע של הצבירה קשור ל-A אחד לכל היותר, ולכן המפתח של R2 הוא המפתח של הצד ה'רבים' — {KeyG, KeyB}.",
   "confidence": "high",
   "id": "26B-A-Q2",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26B-A-erd",
   "question": "לישות `M` יש השתתפות מלאה ב-`R3` (קו כפול). כיצד אילוץ זה נשמר בתרגום לסכמה רלציונית?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "נשמר באמצעות הגדרת KeyA כשדה NOT NULL בטבלת M (מכיוון ש-R3 הוא אחד-לרבים וממוזג לתוך M)"
    },
    {
     "id": "b",
     "type": "text",
     "value": "אינו ניתן לאכיפה ישירה ודורש אילוץ נוסף (trigger / assertion)"
    },
    {
     "id": "c",
     "type": "text",
     "value": "נשמר אוטומטית על-ידי כך ש-KeyM הוא מפתח ראשי"
    },
    {
     "id": "d",
     "type": "text",
     "value": "נשמר על-ידי הוספת PropA_1 לטבלת M"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "כש-R3 ממוזג לתוך M, כל שורה ב-M מחזיקה את `KeyA` כמפתח זר. השתתפות מלאה = כל M חייב להיות קשור ל-A, ולכן מגדירים את `KeyA` כ-NOT NULL — וזה אוכף את האילוץ ישירות.",
   "confidence": "high",
   "id": "26B-A-Q3",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26B-A-erd",
   "question": "‏`R4` הוא קשר מזהה (בין ישות חזקה לחלשה) ו-`R3` הוא קשר אחד-לרבים רגיל — שניהם ממוזגים. מה ההבדל המהותי בתרגומם?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "ב-R4 מפתח הבעלים (KeyM) הופך לחלק מהמפתח הראשי של W, ואילו ב-R3 המפתח הזר (KeyA) נשאר שדה רגיל מחוץ למפתח הראשי של M"
    },
    {
     "id": "b",
     "type": "text",
     "value": "בשני המקרים המפתח הזר הופך לחלק מהמפתח הראשי"
    },
    {
     "id": "c",
     "type": "text",
     "value": "R4 דורש טבלה נפרדת ו-R3 ממוזג"
    },
    {
     "id": "d",
     "type": "text",
     "value": "R3 דורש טבלה נפרדת ו-R4 ממוזג"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "‏W היא ישות חלשה: המפתח שלה הוא המפתח של הבעלים (‏KeyM, דרך M1) יחד עם המפריד `DiscW_1`. לכן ב-R4 המפתח הזר נכנס למפתח הראשי. ב-R3 ‏`KeyA` הוא סתם מפתח זר בטבלת M, והמפתח של M נשאר `KeyM`.",
   "confidence": "high",
   "id": "26B-A-Q4",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": true
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26S-A-erd",
   "question": "איזה מההיגדים הבאים **אינו נובע** מן התרשים?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הגיל של Passenger אינו נשמר פיזית אלא מחושב."
    },
    {
     "id": "b",
     "type": "text",
     "value": "‏Booking הוא קשר רבים-לרבים בין Passenger ל-Flight."
    },
    {
     "id": "c",
     "type": "text",
     "value": "כל Employee חייב להיות Pilot או Attendant."
    },
    {
     "id": "d",
     "type": "text",
     "value": "ל-Attendant יכולות להיות כמה שפות."
    },
    {
     "id": "e",
     "type": "text",
     "value": "‏Pilot יורש את התכונה full_name מן הישות Employee."
    }
   ],
   "correctId": "c",
   "answerSource": "self-solved",
   "explanation": "ההיררכיה (ISA) מחוברת בקווים **בודדים**, כלומר ההשתתפות חלקית: יכול להיות Employee שאינו Pilot ואינו Attendant (למשל עובד קרקע). כדי ש'כל Employee חייב להיות אחד מהם' היה נדרש קו כפול (כיסוי מלא). השאר נובעים: `age` באליפסה מקווקוות = תכונה נגזרת; ‏N:M על Booking; ‏`languages` באליפסה כפולה = רב-ערכית; ותת-סוג תמיד יורש את תכונות האב.",
   "confidence": "high",
   "id": "26S-A-Q1",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26S-A-erd",
   "question": "בשיטת המרה שבה טבלת תת-הסוג כוללת גם את התכונות הנורשות מ-Employee, איזו אפשרות מייצגת נכון את Attendant ואת התכונה מרובת-הערכים `languages`?",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "Attendant([u]employee_id[/u], full_name, salary)   AttendantLanguages([u]employee_id[/u], [u]language[/u])"
    },
    {
     "id": "b",
     "type": "schema",
     "value": "Attendant([u]employee_id[/u], full_name, salary, languages)"
    },
    {
     "id": "c",
     "type": "schema",
     "value": "Employee([u]employee_id[/u], full_name, salary, languages)"
    },
    {
     "id": "d",
     "type": "schema",
     "value": "Attendant([u]employee_id[/u], full_name, salary, license_number)"
    },
    {
     "id": "e",
     "type": "schema",
     "value": "AttendantLanguages([u]employee_id[/u], [u]language[/u])"
    }
   ],
   "correctId": "a",
   "answerSource": "self-solved",
   "explanation": "תכונה רב-ערכית לא נכנסת לטבלה עצמה (זה שובר 1NF), אלא מקבלת טבלה נפרדת שהמפתח שלה הוא מפתח הישות + הערך: ‏`AttendantLanguages(employee_id, language)`. בנוסף צריך את טבלת Attendant עם התכונות הנורשות. {opt:e} מציגה רק את טבלת השפות, ו-{opt:d} מכניסה את `license_number`, שהיא תכונה של Pilot.",
   "confidence": "high",
   "id": "26S-A-Q2",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26S-A-erd",
   "question": "איזו מהטענות הבאות מתארת נכון את התכונה `languages` ביחס לישות Pilot?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "התכונה languages מוגדרת עבור Attendant בלבד, והיא אינה נורשת ל-Pilot דרך Employee."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מהתרשים נובע ש-languages היא תכונה של Passenger."
    },
    {
     "id": "c",
     "type": "text",
     "value": "‏languages היא תכונה מחושבת של Pilot."
    },
    {
     "id": "d",
     "type": "text",
     "value": "לכל Pilot יש languages, משום שתכונות של תת-סוג אחד נורשות לכל תתי-הסוגים האחרים."
    },
    {
     "id": "e",
     "type": "text",
     "value": "לכל Employee יש languages, ולכן גם לכל Pilot."
    }
   ],
   "correctId": "a",
   "answerSource": "self-solved",
   "explanation": "ירושה זורמת רק **מהאב לבן**: Pilot ו-Attendant יורשים מ-Employee. ‏`languages` מחוברת ל-Attendant בלבד, ולכן היא לא עוברת לאב ולא 'לאחים'. Pilot מקבל רק את `employee_id`, `full_name`, `salary` ואת `license_number` שלו.",
   "confidence": "high",
   "id": "26S-A-Q3",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26S-A-erd",
   "question": "איזה מההיגדים הבאים נכון לפי התרשים?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "כל Flight חייבת להיות מפוקדת על-ידי Pilot אחד בדיוק."
    },
    {
     "id": "b",
     "type": "text",
     "value": "לכל Passenger יכול להיות מספר טלפון אחד בלבד."
    },
    {
     "id": "c",
     "type": "text",
     "value": "‏Pilot יכול לפקד על Flight אחת בלבד."
    },
    {
     "id": "d",
     "type": "text",
     "value": "כל Flight יכולה להיות מוזמנת על-ידי Passenger אחד לכל היותר."
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל Employee חייב להשתייך בו-זמנית גם ל-Pilot וגם ל-Attendant."
    }
   ],
   "correctId": "a",
   "answerSource": "self-solved",
   "explanation": "בקשר Commands יש קו **כפול** בצד Flight (השתתפות מלאה: כל טיסה חייבת מפקד) וחץ אל Pilot (‏1: לכל היותר מפקד אחד). יחד: בדיוק Pilot אחד. ‏`phone` היא רב-ערכית (ולא טלפון אחד), Pilot מפקד על N טיסות, Booking הוא M:N, ו-ISA לא מחייב שייכות לשני תתי-הסוגים.",
   "confidence": "high",
   "id": "26S-A-Q4",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26S-A-erd",
   "question": "הקשר Booking בין Passenger ל-Flight הוא מסוג רבים-לרבים, ויש לו את התכונות `seat_no` ו-`booking_date`. איזו תבנית יחס מייצגת נכון את המרת הקשר?",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "Passenger([u]passenger_id[/u], full_name, flight_number)"
    },
    {
     "id": "b",
     "type": "schema",
     "value": "Booking([u]flight_number[/u], seat_no, booking_date)"
    },
    {
     "id": "c",
     "type": "schema",
     "value": "Booking([u]passenger_id[/u], [u]flight_number[/u], seat_no, booking_date)"
    },
    {
     "id": "d",
     "type": "schema",
     "value": "Flight([u]flight_number[/u], destination, price, passenger_id)"
    },
    {
     "id": "e",
     "type": "schema",
     "value": "Booking([u]passenger_id[/u], seat_no, booking_date)"
    }
   ],
   "correctId": "c",
   "answerSource": "self-solved",
   "explanation": "קשר M:N תמיד הופך לטבלה נפרדת, שהמפתח שלה הוא **צירוף** המפתחות של שני הצדדים, יחד עם תכונות הקשר. {opt:b} ו-{opt:e} לוקחות רק מפתח אחד, כך שנוסע לא יוכל להזמין שתי טיסות (או טיסה לא תוכל להכיל שני נוסעים). {opt:a} ו-{opt:d} ממזגות לצד אחד, וזה מתאים רק לקשר 1:N.",
   "confidence": "high",
   "id": "26S-A-Q5",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26Z-CL-erd",
   "question": "בתרגום היעיל ביותר, כמה טבלאות נדרשות לכל התרשים?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "9"
    },
    {
     "id": "b",
     "type": "text",
     "value": "10"
    },
    {
     "id": "c",
     "type": "text",
     "value": "11"
    },
    {
     "id": "d",
     "type": "text",
     "value": "12"
    },
    {
     "id": "e",
     "type": "text",
     "value": "13"
    }
   ],
   "correctId": "c",
   "answerSource": "claude-practice",
   "explanation": "**ישויות:** A, B, C, C1, C2, D, E, W, כלומר 8 (תת-סוגים וישות חלשה מקבלים טבלה). **מרובות-ערכים:** PropA_2, כלומר 1. **R1:** קשר N:M, כלומר 1. **R3:** קשר טרינארי, שתמיד מקבל טבלה (גם עם חץ), כלומר 1. סה״כ **11**.\nלא סופרים: R2 (חץ אל C1, ולכן הוא מתמזג לטבלת R1, שהיא הטבלה של ההקבצה), R4 (קשר מזהה), PropD_1 (מחושבת) ואת משולש ה-ISA. מי שסופר את R2 מגיע ל-12, ומי ששוכח את PropA_2 מגיע ל-10.",
   "confidence": "high",
   "id": "26Z-CL-Q1",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26Z-CL-erd",
   "question": "מה יהיה המפתח הראשי של הטבלה של `R3`?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "{KeyC, KeyD, KeyE, DiscW_1}"
    },
    {
     "id": "b",
     "type": "text",
     "value": "{KeyC, DiscW_1}"
    },
    {
     "id": "c",
     "type": "text",
     "value": "{KeyC, KeyE, DiscW_1}"
    },
    {
     "id": "d",
     "type": "text",
     "value": "{KeyC2, KeyE, DiscW_1}"
    },
    {
     "id": "e",
     "type": "text",
     "value": "ל-R3 אין טבלה: בגלל החץ הוא מתמזג לטבלה של D"
    }
   ],
   "correctId": "c",
   "answerSource": "claude-practice",
   "explanation": "בקשר טרינארי, חץ אל D אומר שלכל צירוף (C2, W) יש D אחד לכל היותר, ולכן KeyD יוצא מהמפתח ונשאר עמודה רגילה. המפתח = מפתח C2 + מפתח W. ל-C2 אין מפתח משלו, והוא **יורש את KeyC**. ‏W היא ישות חלשה, והמפתח שלה הוא **DiscW_1 + KeyE** (מפתח הבעלים דרך R4). לכן {KeyC, KeyE, DiscW_1}. מי שלוקח רק את DiscW_1 שוכח שמפתח של ישות חלשה כולל את מפתח הבעלים. קשר טרינארי לא מתמזג לישות גם כשיש בו חץ.",
   "confidence": "high",
   "id": "26Z-CL-Q2",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26Z-CL-erd",
   "question": "לפי התרשים, איזו מהטענות הבאות נכונה לגבי הקשר `R2`?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "כל מופע של C1 חייב להיות קשור דרך R2 לזוג (A, B) אחד לפחות"
    },
    {
     "id": "b",
     "type": "text",
     "value": "כל זוג (A, B) שמופיע ב-R1 קשור דרך R2 ל-C1 אחד בדיוק, ו-C1 יכול להיות קשור לכמה זוגות או לאף זוג"
    },
    {
     "id": "c",
     "type": "text",
     "value": "זוג (A, B) שמופיע ב-R1 יכול להיות קשור דרך R2 לכמה מופעים שונים של C1"
    },
    {
     "id": "d",
     "type": "text",
     "value": "כל מופע של C1 קשור לזוג (A, B) אחד לכל היותר"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "b",
   "answerSource": "claude-practice",
   "explanation": "קוראים כל קו בנפרד. **קו כפול בצד ההקבצה:** כל מופע של R1, כלומר כל זוג (A, B), חייב להשתתף ב-R2 (לפחות אחד). **חץ אל C1:** כל זוג קשור ל-C1 אחד לכל היותר. יחד: **בדיוק אחד**. בצד של C1 הקו רגיל ואין חץ שמכוון אל ההקבצה, ולכן C1 יכול להיות קשור לכמה זוגות או לאף זוג. בתרגום זה בדיוק מה שאוכפים: KeyC נכנס לטבלת R1 כמפתח זר מוגדר NOT NULL.",
   "confidence": "high",
   "id": "26Z-CL-Q3",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "מודל ERD",
   "official": false
  },
  {
   "part": "א",
   "topic": "erd",
   "contextId": "26Z-CL-erd",
   "question": "בתרגום היעיל ביותר, איזו סכמה תתקבל עבור הטבלה של `R1`?",
   "options": [
    {
     "id": "a",
     "type": "schema",
     "value": "R1 ([u]KeyA[/u], [u]KeyB[/u], PropR1_1)"
    },
    {
     "id": "b",
     "type": "schema",
     "value": "R1 ([u]KeyA[/u], [u]KeyB[/u], [u]KeyC[/u], PropR1_1)"
    },
    {
     "id": "c",
     "type": "schema",
     "value": "R1 ([u]KeyA[/u], [u]KeyB[/u], PropR1_1, KeyC)"
    },
    {
     "id": "d",
     "type": "schema",
     "value": "R1 ([u]KeyA[/u], [u]KeyB[/u], PropR1_1, PropA_2, KeyC)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "c",
   "answerSource": "claude-practice",
   "explanation": "‏R1 הוא N:M, ולכן המפתח שלו הוא {KeyA, KeyB}, ותכונת הקשר PropR1_1 נכנסת לטבלה. ‏R2 יוצא מההקבצה עם חץ אל C1, כלומר כל זוג קשור ל-C1 אחד לכל היותר. לכן R2 **מתמזג לטבלת R1** (הטבלה של ההקבצה) ו-KeyC נכנס כמפתח זר, **מחוץ למפתח** (עם NOT NULL, בגלל הקו הכפול). אם KeyC נכנס למפתח, החץ הולך לאיבוד. סכמה בלי KeyC מחייבת טבלה נפרדת ל-R2, וזה לא התרגום היעיל ביותר. ‏PropA_2 מרובת-ערכים, ולכן יוצאת לטבלה משלה ולא נכנסת ל-R1.",
   "confidence": "high",
   "id": "26Z-CL-Q4",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
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
   "explanation": "EC→D נמצאת בסגור (נובעת מ-C→D). ניתן להראות זאת במגוון דרכים — התקבלו למלוא הניקוד התשובות {opt:b} (רפלקסיביות), {opt:c} (פירוק) ו-{opt:d} (הכלה), או שילובים שלהן.",
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
   "question": "נתון ש-E עודפת בתבנית היחסים$$R = (A, B, C, D, E)$$עם אוסף התלויות$$F = { A → BC, AE → D }$$מה מהבאים נכון?",
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
   "explanation": "${BFE}^{+}$: מ-F→AE מקבלים A,E; מ-BE→C מקבלים C; מ-C→AD מקבלים D. סה\"כ {A,B,C,D,E,F}=R, ולכן {BFE} מפתח-על. שאר האפשרויות אינן מכסות את כל R (למשל אינן כוללות את B) → {opt:b}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
     "type": "text",
     "value": "$F→A$ וגם $B→C$"
    },
    {
     "id": "b",
     "type": "text",
     "value": "$B→C$ וגם $C→D$"
    },
    {
     "id": "c",
     "type": "text",
     "value": "$F→A$ וגם $E→C$"
    },
    {
     "id": "d",
     "type": "text",
     "value": "$E→C$ וגם $B→C$"
    },
    {
     "id": "e",
     "type": "text",
     "value": "$F→A$ וגם $F→E$"
    }
   ],
   "correctId": "e",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "low",
   "explanation": "מ-`F→AE` נובעות גם `F→A` וגם `F→E`, ולכן שתי התלויות שב-{opt:e} נמצאות בסגור. בשאר האפשרויות מופיעה תלות שאינה נובעת מ-F (כגון B→C או E→C, הדורשות תכונה נוספת) → {opt:e}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "question": "בהינתן יחס אחר $R = (A, B, C, D)$ והתלויות $F = {AB → CD, C → B}$, מה מהבאים נכון?",
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
   "explanation": "המפתחות הקבילים הם AB ו-AC (ולכן A, B, C תכונות מפתח, D תכונה שאינה מפתח). `AB→CD` — AB מפתח-על (תקין). `C→B` מפר BCNF (C אינו מפתח-על), אך B היא תכונת מפתח ולכן התלות מקיימת את תנאי 3NF. מסקנה: היחס ב-3NF אך לא ב-BCNF → {opt:a}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "E חייבת בכל מפתח (אינה בצד ימין). $EI^{+}$ = כל R וגם $EG^{+}$ = כל R, ושניהם מינימליים ← שני מפתחות קבילים: EI ו-EG (שניהם מסומנים בבחינה).",
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
   "question": "מה הנרמול הנכון לפי BCNF? (ניתן להניח ש-Fu שווה ל-$F^{+}$)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "היחס כבר מנורמל לפי BCNF."
    },
    {
     "id": "b",
     "type": "text",
     "value": "R1(F,E,H), R2(F,G,I), R3(E,I)."
    },
    {
     "id": "c",
     "type": "text",
     "value": "R4(E,F), R1(G,H), R2(F,G,H,I), R3(E,F,I)."
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
   "explanation": "הסגור של תכונה חייב להכיל את התכונה עצמה: A⁺ = {A,C,D,E}. אף אפשרות אינה מדויקת (ב-{CDE} חסר A), ולכן התשובה {opt:e} — אך התקבלה גם {opt:c}.",
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
   "question": "מי מבין ה-F הנתונים מקיים $F^{+} = F1^{+}$?",
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
   "question": "נתון מסד נתונים חוקי מעל סכמה $R = (P1, P2, P3)$ (ראו המופע למעלה), ותהי F קבוצת התלויות הפונקציונליות מעל R. קבעו האם יתכן ש:\n(1) התלות $P1 P3 → P2$ היא תלות ב-F.\n(2) התלות $P2 → P3$ אינה תלות ב-F.",
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
   "explanation": "מופע חוקי חייב לקיים כל תלות ב-F. (1) התלות $P1 P3 → P2$ מופרת ע\"י שורות 3 ו-5: `(b,80,T)` ו-`(b,50,T)` — זהות ב-P1,P3 אך שונות ב-P2 — ולכן אינה יכולה להיות ב-F ⇒ 'לא יתכן'. (2) המופע מקיים את $P2 → P3$, כך שנדמה שהיא חייבת להיות ב-F, אך F אינו חייב לכלול כל תלות שהמופע מקיים (ומופעים עתידיים עשויים להפר אותה) ⇒ 'יתכן' שאינה ב-F. לכן {opt:d}. הערה: על-פי המחוון קיבלו גם את מסיח {opt:b}.",
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
   "explanation": "‏C מופיע רק בצד שמאל, ולכן חייב להיות בכל מפתח. סגור C: `C → AEF`, `E → D`, `D → B` ⇒ C⁺ = {A,B,C,D,E,F}, כלומר {C} לבדו הוא המפתח היחיד (המינימלי). כל האפשרויות הן על-מפתחות ולא מפתחות קבילים (מינימליים). לכן {opt:e}.",
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
   "explanation": "החיתוך R1∩R2 = {B}, ו-B אינו מפתח של R1 ולא של R2 ($B^{+} = {B}$) — ולכן אין שימור מידע (הצירוף אינו lossless). ההיטלים על R1, R2 נותנים רק `A → B` ו-`C → B`, שמהם לא ניתן להסיק את `A → C` — ולכן גם אין שימור תלויות. לכן {opt:d}.",
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
   "question": "נתונה קבוצת תלויות פונקציונליות $$F = {Q → U, U → V, PQ → WST, SU → TR, VT → RW, R → W}$$קבעו האם אחת מהתלויות הבאות נובעת מ-F:",
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
   "explanation": "‏$(SQ)^{+}$: מ-Q→U, U→V מקבלים U,V; מ-SU→TR מקבלים T,R; ולכן R→W → יש W, אז SQ→W נובעת. ‏$(PQ)^{+}$: PQ→WST נותן W,S,T; ואז SU→TR נותן R, ולכן PQ→R נובעת. לעומת זאת $(QU)^{+}={Q,U,V}$ בלבד, כך ש-QU→R אינה נובעת. שתי תלויות נובעות → תשובה {opt:d}.",
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
   "explanation": "‏$(C)^{+}$: מ-C→AEF מקבלים A,E,F; מ-E→D מקבלים D; מ-D→B מקבלים B — כלומר C לבדו קובע את כל התכונות ולכן {C} הוא מפתח-על (וגם מפתח מועמד). מכאן ש-{BC} ו-{ABC} (המכילים את C) הם אף הם מפתחות-על — כל המפתחות המנויים הם מפתחות-על.",
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
   "question": "נתונה סכמת R=(A,B,C) כלשהי, כמו כן נתונות 4 הטענות הבאות. כמה מהטענות הנתונות הן טענות נכונות?\n**טענה 1:** ייתכן מצב שבו יהיה בדיוק מפתח קביל אחד וגודלו יהיה 1 (תכונה בודדת).\n**טענה 2:** ייתכן מצב שבו יהיו בדיוק 2 מפתחות קבילים בגדלים שונים (מספר תכונות שונה).\n**טענה 3:** ייתכן מצב שבו יהיו בדיוק 3 מפתחות קבילים בגדלים שונים (מספר תכונות שונה).\n**טענה 4:** ייתכן מצב שבו יהיו בדיוק 2 מפתחות קבילים בגדלים שונים (מספר תכונות שונה).",
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
   "explanation": "התשובה שהתבקשה היא {opt:a} (2 טענות נכונות); אך מאחר וטענה 4 נוסחה בדיוק כמו טענה 2, גם תשובה {opt:c} (3) התקבלה.",
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
   "question": "נתונה התבנית R עם התלויות הפונקציות F הבאות. איזה מבין הבאים הינו מפתח קביל ב-R?$$R = (A, B, C, D, E, G, I)$$$$F = {AB→C, GAEID→C, CD→E, EI→G, IG→E, DE→C, BC→A, AIDE→I, CGI→E, ICBEG→A}$$",
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
   "explanation": "$A^{+}$: מ-A→B מוסיפים B; מ-AB→E מוסיפים E. C→BD דורש C (שאינו בסגור). לכן A⁺ = {A, B, E} = {ABE}.",
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
   "question": "נתונה הסכמה `R=(A,B,C,D,E)` וקבוצת תלויות פונקציונליות שהיא מקיימת:\n$$F = {B → E, DE → CD, C → AB}$$כמו כן, נתון הפירוק הבא: `R1(A,B,C,D)`, `R2(C,E)`, `R3(D,E)`.\nיש לבחור את הטענה הנכונה מבין הבאות:",
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
   "question": "נתונה הסכמה `R=(A,B,C,D,E)` וקבוצת תלויות פונקציונליות שהיא מקיימת:\n$$F = {A → B, C → D, BC → E}$$כמו כן, נתון הפירוק הבא: `R1(A,B)`, `R2(C,D)`, `R3(B,C,E)`, `R4(A,C)`.\nיש לבחור את הטענה הנכונה מבין הבאות:",
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
   "explanation": "‏B⁺ = {B} (‏B אינו צד-שמאל של אף תלות ב-F1), ולכן B → E אינה נובעת. לעומת זאת C → D נובעת מ-$C → BD$; $A → E$ מ-A → B ואז $AB → E$; ו-CE → B מ-E → B.",
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
   "explanation": "‏A⁺ = {A, B, D} (‏A → B ואז B → D), ו-E אינו נובע מ-A, לכן `A → E` אינה ב-$F1^{+}$. לעומת זאת $CE → B$, $AE → D$ ו-$CD → A$ כן נובעות (למשל $CD^{+} ⊇ {E, A}$).",
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
   "question": "עבור היחס $R(A, B, C)$ עם $F = {C → B, B → A}$ — כמה מפתחות קבילים (candidate keys) יכולים להיות ל-R?",
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
   "question": "נתונה הסכמה $R(A, B, C, D, E)$ המקיימת $F = {D → E, B → BC, CD → A}$. שקול את הפירוק הבא:\n$$R_{1}(A, B, C), R_{2}(B, D), R_{3}(C, D, E)$$איזו מהטענות הבאות נכונה?",
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
   "explanation": "לפי טבלת התשובות הרשמית התקבלו כאן **שתי תשובות** — {opt:c} וגם {opt:d} (שתיהן קובעות שהפירוק אינו משמר תלויות; הן נחלקות בשאלת חוסר-אובדן המידע).",
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
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "26B-A-fd",
   "question": "איזו מהתלויות הבאות **אינה נובעת** מ-F (כלומר אינה נמצאת בסגור $F^{+}$)?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "C → D"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "A → C"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "A → E"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "AB → E"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "A → BCDE"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "‏C⁺ = {C}, כי C לבדו אינו צד שמאל של אף תלות, ולכן C → D אינה נובעת. לעומת זאת A⁺ = {A, B, C, D, E}, ולכן $A → C$, $A → E$, $AB → E$ ו-$A → BCDE$ כולן נובעות.",
   "confidence": "high",
   "id": "26B-A-Q17",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "26B-A-fd",
   "question": "מהו הסגור של קבוצת התכונות {B}, כלומר ${B}^{+}$, ביחס ל-F?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "{B, C}"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "{B}"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "{B, C, D}"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "{A, B, C}"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "{A, B, C, D, E}"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "מתחילים מ-{B}. ‏B → C מוסיפה את C. אין תלות נוספת שהצד השמאלי שלה מוכל ב-{B, C}, ולכן ${B}^{+} = {B, C}$.",
   "confidence": "high",
   "id": "26B-A-Q18",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "26B-A-fd",
   "question": "מהו מפתח קביל של R (ביחס ל-F)?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "{A}"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "{A, B}"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "{A, C}"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "{B, C}"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחד מהם"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "$A^{+}$: A → B, ‏A → D, ואז B → C ו-AC → E, כך ש-A⁺ = {A, B, C, D, E}. ‏A מינימלי (תכונה יחידה), ולכן הוא מפתח קביל. ‏{A, B} ו-{A, C} הם על-מפתחות לא מינימליים, ו-${B, C}^{+} = {B, C}$.",
   "confidence": "high",
   "id": "26B-A-Q19",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "26B-A-fd",
   "question": "בחישוב הכיסוי הקנוני של F, איזו תכונה היא תכונה **עודפת** (תכונה שאפשר למחוק מבלי לשנות את הסגור)?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "בתלות `AC -> E` התכונה C"
    },
    {
     "id": "b",
     "type": "text",
     "value": "בתלות `AC -> E` התכונה A"
    },
    {
     "id": "c",
     "type": "text",
     "value": "בתלות `A -> D` התכונה D"
    },
    {
     "id": "d",
     "type": "text",
     "value": "בתלות `B -> C` התכונה B"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אין תכונה עודפת באף תלות"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "$A^{+}$ (בלי C) = {A, B, C, D, E}, כי A → B → C, ולכן כבר A → E, ו-C עודפת ב-AC → E. ‏A לא עודפת, כי C⁺ = {C} לא מכיל את E. ‏D ו-B הן הצד היחיד של התלות שלהן, ומחיקתן משנה את הסגור.",
   "confidence": "high",
   "id": "26B-A-Q20",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": true
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "26S-A-fd",
   "question": "איזו מהתלויות הבאות **אינה נובעת** מ-F?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "C → A"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "A → D"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "E → D"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "A → C"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "E → BC"
    }
   ],
   "correctId": "a",
   "answerSource": "self-solved",
   "explanation": "‏C⁺ = {C}: אף תלות לא מתחילה ב-C לבד, ולכן C → A לא נובעת. לעומת זאת A⁺: A → B → C, ואז AC → D, כך ש-A⁺ = {A, B, C, D}, ולכן A → D ו-A → C נובעות. ‏E⁺ = {A, B, C, D, E}, ולכן E → D ו-E → BC נובעות.",
   "confidence": "high",
   "id": "26S-A-Q17",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "26S-A-fd",
   "question": "נתון פירוק של R לשני היחסים R₁ = (A, B, D) ו-R₂ = (A, C, E). איזו מהטענות הבאות נכונה לגבי הפירוק ביחס ל-F?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הפירוק משמר תלויות, אך אינו משמר מידע."
    },
    {
     "id": "b",
     "type": "text",
     "value": "הפירוק אינו משמר מידע ואינו משמר תלויות."
    },
    {
     "id": "c",
     "type": "text",
     "value": "הפירוק משמר מידע ומשמר תלויות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "הפירוק משמר מידע, אך אינו משמר תלויות."
    },
    {
     "id": "e",
     "type": "text",
     "value": "הפירוק משמר תלויות, משום שכל תכונה של R מופיעה לפחות באחד מהיחסים."
    }
   ],
   "correctId": "d",
   "answerSource": "self-solved",
   "explanation": "**שימור מידע:** ‏R₁ ∩ R₂ = {A}, ו-A⁺ = {A, B, C, D} ⊇ R₁, כלומר A מפתח של R₁, ולכן הפירוק משמר מידע. **שימור תלויות:** בהטלה, ב-R₁ נשאר A → BD, וב-R₂ נשארים E → AC ו-A → C. התלות B → C אבדה: B ו-C לא נמצאים יחד באף יחס, ו-B⁺ לפי ההטלות = {B}. לכן הפירוק אינו משמר תלויות. ({opt:e} מבלבלת בין 'כל התכונות מופיעות' לבין שימור תלויות.)",
   "confidence": "high",
   "id": "26S-A-Q18",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "26S-A-fd",
   "question": "מהו מפתח קביל של R ביחס ל-F?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "{C, D}"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "{A, E}"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "{A}"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "{E}"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "{B, E}"
    }
   ],
   "correctId": "d",
   "answerSource": "self-solved",
   "explanation": "‏E לא מופיעה באף צד ימני, ולכן היא חייבת להיות בכל מפתח. ‏E⁺ = {E, A, C, B, D} = R, ולכן {E} לבדו הוא מפתח, והוא היחיד. ‏{A, E} ו-{B, E} הם על-מפתחות לא מינימליים, ו-A⁺ = {A, B, C, D} חסר את E.",
   "confidence": "high",
   "id": "26S-A-Q19",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "26S-A-fd",
   "question": "מהו כיסוי קנוני של F?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "{E → A, A → BCD}"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "{E → AC, A → BD, B → C}"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "{E → A, A → BD, B → C}"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "{E → ABCD}"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "{E → A, A → B, B → C, AC → D}"
    }
   ],
   "correctId": "c",
   "answerSource": "self-solved",
   "explanation": "‏E → C מיותרת (E → A → B → C). ב-AC → D התכונה C עודפת, כי A⁺ כבר מכיל את C, ולכן נשאר A → D. מאחדים צדדים שמאליים זהים: ‏{E → A, A → BD, B → C}. {opt:a} מאבדת את B → C (ו-C ב-A → BCD עודפת). {opt:b} משאירה את C העודפת ב-E → AC. {opt:d} לא שקולה ל-F. ב-{opt:e} נשארת התכונה העודפת C.",
   "confidence": "high",
   "id": "26S-A-Q20",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "26Z-CL-fd",
   "question": "מהם **כל** המפתחות הקבילים (candidate keys) של R בהינתן F1?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "{A, B} בלבד"
    },
    {
     "id": "b",
     "type": "text",
     "value": "{A, B} ו-{B, D} בלבד"
    },
    {
     "id": "c",
     "type": "text",
     "value": "{A, B}, ‏{B, C} ו-{B, D}"
    },
    {
     "id": "d",
     "type": "text",
     "value": "{A, B}, ‏{B, C} ו-{C, D}"
    },
    {
     "id": "e",
     "type": "text",
     "value": "{A, B}, ‏{B, C}, ‏{B, D} ו-{B, E}"
    }
   ],
   "correctId": "c",
   "answerSource": "claude-practice",
   "explanation": "‏B לא מופיע באף צד ימין, ולכן הוא חייב להיות בכל מפתח, אבל B⁺ = {B} לבדו. בודקים את B עם כל תכונה: ‏{A,B}⁺: ‏AB → C, ‏C → D, ‏BD → E, כלומר הכול. ‏{B,C}⁺: ‏C → D, ‏D → A, ואז AB → C ו-BD → E, כלומר הכול. ‏{B,D}⁺: ‏D → A, ‏AB → C, ‏BD → E, כלומר הכול. ‏{B,E}⁺ = {B, E}. שלושתם מינימליים, כי אף תכונה לבדה אינה מפתח. ‏{C,D} אינו מפתח, כי אין בו B.",
   "confidence": "high",
   "id": "26Z-CL-Q17",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "contextId": "26Z-CL-fd",
   "question": "איזו מהטענות הבאות נכונה לגבי R עם F1?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "‏R נמצאת ב-BCNF"
    },
    {
     "id": "b",
     "type": "text",
     "value": "‏R לא נמצאת ב-3NF, בגלל התלות C → D"
    },
    {
     "id": "c",
     "type": "text",
     "value": "‏R לא נמצאת ב-2NF, בגלל התלות D → A (‏D הוא חלק מהמפתח BD)"
    },
    {
     "id": "d",
     "type": "text",
     "value": "‏R לא נמצאת ב-BCNF, אבל נמצאת ב-3NF"
    },
    {
     "id": "e",
     "type": "text",
     "value": "כל התשובות האחרות אינן נכונות"
    }
   ],
   "correctId": "d",
   "answerSource": "claude-practice",
   "explanation": "המפתחות הם AB, ‏BC ו-BD, ולכן התכונות הראשיות הן **A, B, C, D**. ‏E היא היחידה שאינה ראשית. **BCNF:** ‏C → D ו-D → A הן תלויות שהצד השמאלי שלהן אינו על-מפתח, ולכן R אינה ב-BCNF. **3NF:** בשתיהן צד ימין (‏D, ‏A) הוא תכונה **ראשית**, ולכן הן מותרות. ‏AB → C ו-BD → E הן על מפתח. לכן R ב-3NF. גם 2NF מתקיימת: תלות חלקית פוסלת 2NF רק כשהיא קובעת תכונה **לא ראשית**, ו-A ראשית.",
   "confidence": "high",
   "id": "26Z-CL-Q18",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתונה הסכמה $R = (A, B, C, D, E)$ וקבוצת התלויות $F = \\{A → B, B → C, C → A, D → E\\}$. כמו כן נתון הפירוק `R1(A, B)`, `R2(B, C)`, `R3(C, D, E)`. יש לבחור את הטענה הנכונה מבין הבאות:",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "הפירוק משמר מידע, אך אינו משמר תלויות, כי התלות C → A אובדת"
    },
    {
     "id": "b",
     "type": "text",
     "value": "הפירוק משמר מידע ומשמר תלויות, אך לא כל היחסים בפירוק נמצאים ב-3NF"
    },
    {
     "id": "c",
     "type": "text",
     "value": "הפירוק משמר מידע ומשמר תלויות, וכל היחסים בפירוק נמצאים ב-BCNF"
    },
    {
     "id": "d",
     "type": "text",
     "value": "הפירוק אינו משמר מידע"
    },
    {
     "id": "e",
     "type": "text",
     "value": "הפירוק אינו משמר מידע ואינו משמר תלויות"
    }
   ],
   "correctId": "b",
   "answerSource": "claude-practice",
   "explanation": "**משמר מידע:** ‏R1 ⋈ R2 על B, ו-B → C, ולכן B מפתח של R2 והצירוף בלי אובדן, ומתקבל (A,B,C). את זה מצרפים עם R3 על C, ו-C → A → B, ולכן C מפתח של (A,B,C). **משמר תלויות:** ‏A → B ב-R1, ‏B → C ב-R2, ‏D → E ב-R3. ‏C → A לא נמצאת באף יחס, אבל **נגזרת**: בודקים את C⁺ על פני הרכיבים. ב-R2 נקבל C → B, וב-R1 נקבל B → A. לכן היא נשמרת. **צורה נורמלית:** ב-R3(C,D,E) המפתח הוא CD, והתלות D → E היא תלות חלקית של תכונה לא ראשית. לכן R3 אינו אפילו ב-2NF, והטענה שכל היחסים ב-BCNF נופלת.",
   "confidence": "high",
   "id": "26Z-CL-Q19",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "תלויות ונרמול",
   "official": false
  },
  {
   "part": "ד",
   "topic": "fd_norm",
   "question": "נתונה קבוצת התלויות $F = \\{A → BC, B → C, AB → D, CD → E\\}$. מהו הכיסוי הקנוני (canonical cover) של F?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "{A → BCD, B → C, CD → E}"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "{A → B, B → C, CD → E}"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "{A → BD, B → C, D → E}"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "{A → D, B → C, CD → E}"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "{A → BD, B → C, CD → E}"
    }
   ],
   "correctId": "e",
   "answerSource": "claude-practice",
   "explanation": "מחפשים תכונות עודפות. ב-**AB → D** התכונה **B עודפת**, כי A⁺ מכיל את B ‏(A → B), ולכן A → D. ב-**A → BC** התכונה **C עודפת בצד ימין**, כי A → B ו-B → C כבר נותנות A → C. מאחדים את A → B ו-A → D ל-**A → BD**. ב-CD → E אין עודפות, כי C⁺ = {C} ו-D⁺ = {D}. התוצאה היא {A → BD, B → C, CD → E}. ‏A → BCD שקולה ל-F, אבל עדיין יש בה את C העודפת, ולכן אינה קנונית. בשלוש האפשרויות האחרות חסרה תלות או שהשתנתה, ולכן אינן שקולות ל-F.",
   "confidence": "high",
   "id": "26Z-CL-Q20",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
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
   "explanation": "{opt:c} היא מערכת עם המלצות ותוכן חופשי (הכי פחות מספרים וסעיפים קבועים) — מתאימה למודל לא-רלציוני. התקבלו גם תשובות אחרות אם כללו הסבר רלוונטי.",
   "id": "22B-A-Q21",
   "examCode": "22B-A",
   "examLabel": "2022 סמסטר ב׳ מועד א׳",
   "year": 2022,
   "source": "exam",
   "topicLabel": "NoSQL"
  },
  {
   "part": "ה",
   "topic": "nosql",
   "question": "איזה מהמשפטים הבאים הוא נכון ביותר בהקשר למסדי נתונים לא רלציוניים?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "NOSQL מתייחס למסדי נתונים שלא משתמשים בשפת SQL בכלל."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מסדי נתונים NoSQL תמיד משתמשים במבנה טבלאי מסודר לאחסון הנתונים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מסדי נתונים NoSQL מתאימים לטיפול בנתונים מבניים גדולים, מהירים ומשתנים."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מסדי נתונים NoSQL הם בעצם גרסה מודרנית של מסדי נתונים SQL והם מחליפים אותם בכל המקרים."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "c",
   "acceptedIds": [
    "c",
    "e"
   ],
   "answerSource": "solution-pdf",
   "explanation": "‏בפתרון נכתב: \"תשובה: {opt:c}, נכונה כי מדובר על נתונים מבניים גדולים (כלומר שכל נתון הוא נתון גדול מאוד) מהירים ומשתנים, מכוון ל-NO SQL\".‏ {opt:a} שגויה — קיימים מסדי NoSQL עם שפות שאילתה דמויות-SQL;‏ {opt:b} שגויה — NoSQL אינו מחייב מבנה טבלאי; {opt:d} שגויה — NoSQL אינו מחליף SQL בכל המקרים. בפתרון גם צוין שמכיוון שהניסוח \"מבניים\" בלבל, התקבלה גם תשובה {opt:e}.",
   "confidence": "high",
   "id": "23B-A-Q20",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "NoSQL",
   "official": true
  },
  {
   "part": "ה",
   "topic": "nosql",
   "question": "מה מהבאים לא נכון לגבי Neo4j?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "Neo4j היא מערכת לניהול מסד נתונים גרפים."
    },
    {
     "id": "b",
     "type": "text",
     "value": "Neo4j משמש בעיקר לאחסון נתונים יחסיים."
    },
    {
     "id": "c",
     "type": "text",
     "value": "Neo4j משתמש בשפת שאילתה בשם Cypher."
    },
    {
     "id": "d",
     "type": "text",
     "value": "Neo4j יכול לבצע שאילתות מעבר מורכבות ועמוקות ביעילות."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "b",
   "answerSource": "solution-pdf",
   "explanation": "‏בפתרון נכתב: \"תשובה: {opt:b}, נתונים יחסיים, רלציונים, לא נכון לשמור ב-Neo4J\". ‏Neo4j הוא מסד נתונים גרפי, ולכן דווקא המשפט הזה אינו נכון לגביו. {opt:a}, {opt:c} ו-{opt:d} נכונים: ניהול מסד נתונים גרפי, שפת השאילתות Cypher, ומעבר (traversal) יעיל על קשרים מורכבים ועמוקים.",
   "confidence": "high",
   "id": "23B-A-Q21",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "NoSQL",
   "official": true
  },
  {
   "part": "ה",
   "topic": "nosql",
   "question": "מה עושה השאילתה הבאה של MongoDB:\n`db.inventory.find({`\n`$or: [   { quantity: { $lt: 20 } },`\n`{ price: { $gt: 100 } }   ]})`",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "אחזר את כל פריטי המלאי שיש להם כמות קטנה מ-20 ומחיר גדול מ-100."
    },
    {
     "id": "b",
     "type": "text",
     "value": "אחזר את כל פריטי המלאי שיש להם כמות קטנה מ-20 או מחיר גדול מ-100."
    },
    {
     "id": "c",
     "type": "text",
     "value": "עדכן את כל פריטי המלאי כך שיהיו כמות קטנה מ-20 או מחיר גדול מ-100."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מחק את כל פריטי המלאי שיש להם כמות קטנה מ-20 או מחיר גדול מ-100."
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "b",
   "answerSource": "solution-pdf",
   "explanation": "‏בפתרון נכתב: \"תשובה: {opt:b}, חיבור התנאים אם או\". ‏`find` היא פעולת אחזור בלבד — ולכן {opt:c} (עדכון) ו-{opt:d} (מחיקה) נפסלות. האופרטור `$or` מחזיר כל מסמך שמקיים לפחות אחד מהתנאים, כלומר כמות קטנה מ-20 **או** מחיר גדול מ-100; {opt:a} מתארת חיבור ב-`$and` ולכן שגויה.",
   "confidence": "high",
   "id": "23B-A-Q22",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "NoSQL",
   "official": true
  },
  {
   "part": "ה",
   "topic": "nosql",
   "question": "איזה מהתרחישים הבאים אינו מתאים בדרך כלל למסד נתונים NoSQL?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "אחסון נתונים מובנים עם מערכות יחסים ועסקאות מורכבות"
    },
    {
     "id": "b",
     "type": "text",
     "value": "אחסון כמויות גדולות של נתונים שאולי אינם מובנים"
    },
    {
     "id": "c",
     "type": "text",
     "value": "צורך באחסון מגוון סוגי נתונים ללא סכימה מוגדרת מראש"
    },
    {
     "id": "d",
     "type": "text",
     "value": "ניתוח כמויות אדירות של נתונים לא מובנים ומובנים למחצה בזמן אמת"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "solution-pdf",
   "explanation": "‏בפתרון נכתב: \"תשובה: {opt:a}, נתונים מובנים ועסקאות transactions מורכבות מתאימות ל-SQL.‏ {opt:c} ו-{opt:b} מדברות על ללא סכמה ונתונים לא מובנים, {opt:d} non structured מדבר גם כן על נתונים לא מובנים\". כלומר {opt:b}, {opt:c} ו-{opt:d} הם תרחישים מובהקים ל-NoSQL, ורק {opt:a} שייך לעולם הרלציוני.",
   "confidence": "high",
   "id": "23B-A-Q23",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "NoSQL",
   "official": true
  },
  {
   "part": "ה",
   "topic": "nosql",
   "question": "מי מהבאים אינו גורם לשכפול של נתונים",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "Replication רפליקציה"
    },
    {
     "id": "b",
     "type": "text",
     "value": "Sharding פירוק"
    },
    {
     "id": "c",
     "type": "text",
     "value": "גיבוי נתונים"
    },
    {
     "id": "d",
     "type": "text",
     "value": "יצוא נתונים"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהתשובות אינה נכונה, כולן גורמות לשכפול."
    }
   ],
   "correctId": "b",
   "answerSource": "solution-pdf",
   "explanation": "‏בפתרון נכתב: \"תשובה: {opt:b}, בפירוק אין בעקרון שכפול, אלה הפרדה של הנתונים על פני מספר שרתים, בכל השאר יש שכפול לקובץ, או בין שרתים\". ‏Sharding מחלק את הנתונים בין שרתים כך שכל רסיס יושב במקום אחד, ואילו רפליקציה, גיבוי וייצוא כולם יוצרים עותק נוסף של הנתונים.",
   "confidence": "high",
   "id": "23B-A-Q24",
   "examCode": "23B-A",
   "examLabel": "2023 סמסטר ב׳ מועד א׳",
   "year": 2023,
   "source": "exam",
   "topicLabel": "NoSQL",
   "official": true
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
   "explanation": "בפתרון סומנו כנכונות גם {opt:a} וגם {opt:d} —שתיהן נתונים מובְנים, טבלאיים ובעלי יחסים ברורים (רשומות מובנות; מערכת הוצאות עם סעיפים והפניה עצמית), ולכן מתאימות ל-SQL.‏ {opt:b} ו-{opt:c} הם נתונים גרפיים/לא-מובנים (רשת חברתית, המלצות) המתאימים יותר ל-NoSQL.",
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
   "explanation": "ההכנסה לפריט = סכום (מחיר × כמות) לכל מכירה: `$sum` על `$multiply: [\"$price\", \"$quantity\"]`, בקיבוץ לפי `$item`. {opt:c} סוכם רק את המחיר, ו-{opt:a}, {opt:d} בעלי תחביר אופרטורים שגוי (`$multiply`/`$add` ללא מערך ארגומנטים).",
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
   "explanation": "\"הצביעו לכל המפלגות\" הוא חילוק (÷): המחולק (AnonymousId, partyElected) חלקי כל המפלגות (partyElected). ב-{opt:c} יש אי-התאמת סכמות. (הערה: הבחינה מסמנת חילוק בתו ':'.)",
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
   "explanation": "באלגברת היחסים אין ספירה (count), ולכן לא ניתן להחזיר את מספר המצביעים. את {opt:d} (איזורים עם יותר ממצביע אחד) כן ניתן לחשב על ידי חיסור/צירוף עצמי.",
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
   "question": "מה ישלים את הקטע החסר __(9)__ כדי שהשאילתה תחזיר את מזהה הפרה עם הגיל המינימלי?\n$$Π_{cow_id}(cow) − Π_{C2.cow_id} __(9)__ (ρ_{c1} cow X ρ_{c2} cow)$$",
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
   "explanation": "$Π_{C2.cow_id} σ_{c2.age>c1.age} (ρ_{c1} cow X ρ_{c2} cow)$ מחזיר את כל הפרות שקיימת פרה צעירה מהן — כלומר כל הפרות פרט לצעירה ביותר. חיסור מכל הפרות משאיר את הפרה עם הגיל המינימלי → {opt:a}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "question": "מה תחזיר השאילתה הבאה?\n$$Π_{nickname} σ_{age > block_id} (cow ⊗ place_of)$$",
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
   "explanation": "צירוף טבעי `cow ⊗ place_of`, בחירת השורות בהן `age > block_id`, והיטל על `nickname` → שמות החיבה של הפרות שגילן גדול ממספר בלוק המגורים שלהן → {opt:d}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "question": "תלמידים כתבו שאילתה להצגת כינויי הפרות שיש להן בת. מי מהשאילתות הבאות נכונה?\n**שאילתה 1:**\n$$Π_{nickname} (cow ⊗ mother_of)$$\n**שאילתה 2:**\n$$Π_{nickname} σ_{cow.cow_id = cow.mother_id} (cow X mother_of)$$",
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
   "explanation": "שאילתה 1 (`cow ⊗ mother_of`) מבצעת צירוף טבעי ללא עמודה משותפת ולכן שגויה; שאילתה 2 (מכפלה קרטזית + בחירה על התאמת הפרה לרשומת האם) נכונה לפי הכוונה — התנאי המודפס `cow.mother_id` הוא שגיאת דפוס בבחינה. לכן {opt:b}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "\"אם של כל הפרות בביתן 8\" הוא כימות אוניברסלי → אופרטור החילוק (÷), יחד עם בחירה (σ) לסינון פרות ביתן 8 → {opt:b}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "\"גם וגם\" בשתי שורות נפרדות של אותו לקוח מחייב חיתוך (∩) של שמות הלקוחות מכל עיר. תנאי σ יחיד עם $city=A ∧ city=B$ (תשובה {opt:a}) לעולם ריק.",
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
     "value": "מוצאת את ה-id של הדירה/ות היקרה ביותר."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מוצאת את ה-id של הדירה/ות הזולה ביותר."
    },
    {
     "id": "d",
     "type": "text",
     "value": "תשובות {opt:a} ו-{opt:c} נכונות."
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
     "value": "תוצאה זהה לפקודת הפרש בין הטבלאות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "טבלה ריקה."
    },
    {
     "id": "c",
     "type": "text",
     "value": "תוצאה זהה לפקודת איחוד בין הטבלאות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "תוצאה זהה למכפלה קרטזית בין הטבלאות."
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
     "value": "מחזירה מספרי דירות בעיר חולון שנמכרו במחיר שהן היו שוות."
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
   "explanation": "שמות כל הקבלנים פחות שמות הקבלנים שכן בנו דירה → תשובה {opt:a}. תשובה {opt:b} מחזירה קבוצה ריקה, תשובה {opt:c} מחזירה את כל הקבלנים, ולכן {opt:d} (\"כל התשובות נכונות\") אינה יכולה להיות נכונה. בעותק הבחינה סומנו גם {opt:a} וגם {opt:d} — ככל הנראה טעות סימון; לוגית {opt:a} היא התשובה היחידה.",
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
     "value": "Π_{instrument} (one_man_band X musician X band_musician)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{instrument} (one_man_band ⊗ musician ⊗ band_musician)"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{instrument} σ_{one_man_band.b_code=band_musician.b_code} (one_man_band X musician X band_musician)"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{instrument} σ_{band_musician.m_id=band_musician.m_id} (one_man_band X musician ⊗ band_musician)"
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
   "explanation": "\"מנגנים בכל כלי הפריטה\" הוא כימות אוניברסלי ← אופרטור החילוק (÷). (על {opt:d} ניתנו חצי מהנקודות.)",
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
   "question": "מה עושה השאילתה הבאה:  $$Π_{m_id} σ_{m_gender=\"אשה\"} (musician) − Π_{B2.m_id} σ_{B1.num_of_instruments > B2.num_of_instruments} (ρ_{B1} one_man_band X ρ_{B2} one_man_band)$$",
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
   "explanation": "ב-B2 אין m_id, ולכן השאילתה אינה נכונה; אם היינו רוצים שהיא תעבוד היה צריך צירוף טבעי עם musician שחסר. (על {opt:c} ניתנו חצי מהנקודות.)",
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
   "question": "מי מהתשובות הבאות **לא** מתאימה לשאלה: \"שמות המבצעים שמנגנים גם בגיטרה וגם בתופים\"?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{I1.p_name} (σ_{I1.p_name=I2.p_name ∧ (I1.type=\"guitar\" ∧ I2.type=\"drums\")} (ρ_{I1} Instrument X ρ_{I2} Instrument))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{p_name} (σ_{type=\"drums\"} (Instrument)) ∩ Π_{p_name} (σ_{type=\"guitar\"} (Instrument))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{I1.p_name} (σ_{(I1.type=\"guitar\" ∧ I1.type=\"drums\")} (ρ_{I1} Instrument))"
    },
    {
     "id": "d",
     "type": "text",
     "value": "כל התשובות עונות על השאלה (לא מתאימות)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה (כולן מתאימות)"
    }
   ],
   "correctId": "d",
   "answerSource": "solution-pdf",
   "explanation": "‏בפתרון נכתב במפורש: \"התשובה הנכונה היא {opt:d}\" — כלומר אף אחת מ-{opt:a}, {opt:b}, {opt:c} אינה עונה על השאלה. הסיבה שניתנה שם: נפלה טעות בניסוח, שכן `p_name` אינו קיים בטבלת `Instrument`, ולכן כל שלוש השאילתות אינן חוקיות (ובנוסף {opt:c} סותרת את עצמה — `type=\"guitar\" ∧ type=\"drums\"` על אותה שורה אינו יכול להתקיים). בשל התקלה נכתב בפתרון שהוחלט להוריד את השאלה מהמבחן, וסך הניקוד ירד מ-108 ל-103 — היא מובאת כאן לתרגול בלבד.",
   "confidence": "high",
   "id": "23B-A-Q13",
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
   "explanation": "\"בכל כלי הפריטה\" דורש חילוק (division): מוזיקאי המשויך (דרך Band) לכל הכלים מקטגוריית 'string'. תשובה {opt:c} מבצעת חילוק בין הזוגות (p_name, serial_number) של Band לבין ה-serial_number של כלי הפריטה.",
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
   "explanation": "השאלה דורשת חיסור (הפרש), אך החיסור המוצע במסיח {opt:a} שגוי כי ל-Represent אין `p_name` (לא ניתן להקרין `p_name` מ-Represent); גם {opt:b} ו-{opt:c} מניחים חיבור/עמודה שגויים. לכן אף תשובה אינה עונה על השאלה.",
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
   "explanation": "הביטוי מחזיר מדינה שהצביעה למדינה אחת לפחות, ומדינה שלישית כלשהי הצביעה לה. כיוון שאין חיסור, אין מניעה שיתקיימו גם מקרים נוספים (למשל שהצביעה גם למדינות שלא הצביעו לה) — ולכן אף אחד מהניסוחים אינו מדויק. מסיח {opt:a} קרוב (וקיבל ניקוד חלקי), אך אינו שקול. לכן {opt:e}.",
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
   "explanation": "\"גם וגם\" = חיתוך: המבצעים שניגנו בגיטרה ∩ המבצעים שניגנו בתופים. {opt:a} שגוי כי `type=\"guitar\" ∧ type=\"drums\"` על אותה שורה אף פעם אינו מתקיים, ו-{opt:c} נותן את מי שניגן בגיטרה או בתופים (משלים ה\"אף אחד מהם\"), ולא \"גם וגם\".",
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
   "explanation": "זוהי חלוקה: מחלקים את הזוגות (`to_country`, `from_country`) שבהם ניתנו 12 נקודות בקבוצת כל המדינות הנותנות ($Π_{from_country} Score$). התוצאה = המדינות שקיבלו 12 מכל מדינה. ב-{opt:c} המחולק בעל תכונה יחידה ואינו מכיל את סכמת המחלק, ולכן החלוקה אינה תקינה.",
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
   "explanation": "\"ייצגו רק את מדינת מגוריהם\" = כל המבצעים, פחות מי שייצג ולו פעם אחת מדינה השונה ממדינת מגוריו. גם {opt:a} וגם {opt:c} מבטאים נכון את ההפרש (\"כל המבצעים פחות מי שייצג מדינה זרה\"), ולכן יותר מתשובה אחת עונה על השאלה.",
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
   "explanation": "בעותק הבחינה המודפס אפשרות {opt:a} הודפסה חלקית ושגויה (סימן ∩ תלוי ללא אגף שמאלי, וחסר החלק של Martin); {opt:b} מתייחסת רק ל-Martin; {opt:c} דורשת שלאותו ספר יהיו שני מחברים (בלתי אפשרי בסכמה); {opt:d} מחשבת \"או\" במקום \"וגם\". לכן אף אפשרות מודפסת אינה נכונה — התשובה הרשמית היא {opt:f}.",
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
   "explanation": "חילוק: זוגות (מחבר, ז׳אנר) של ספרי מחברים איטלקים ÷ כל הז׳אנרים. בהדפסת הבחינה נפלה טעות בסדר אופרנדי החילוק שתוקנה במהלך הבחינה; לאחר התיקון התשובה הנכונה היא {opt:a}.",
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
   "explanation": "התקבלו שתי תשובות: \"כל התשובות האחרות אינן נכונות\" ({opt:e}) וגם \"מזהי חברי הספרייה, שלא השאילו את אותו הספר יותר מפעם אחת, כולל שלא השאילו ספרים כלל\" ({opt:a}).",
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
   "question": "מה נקבל ב-RES? **הערה:** ההנחה היא, כי אין שני תאריכים זהים בטבלת Borrow.\n$$MBD ← Π_{borrow_date} BR1 − Π_{BR1.borrow_date} (σ_{(BR1.borrow_date > BR2.borrow_date)} (ρ_{BR1} BR X ρ_{BR2} BR))$$\n$$RES ← Π_{title} (σ_{borrow_date=MBD.borrow_date} ((B ⊗ BR) X MBD))$$",
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
   "explanation": "כדי לקבל את המורה בעל הציון הנמוך ביותר: כל מזהי המורים פחות אלו שקיים מורה עם ציון נמוך מהם. לכן חלק (1) = $Π_{id}(teacher) −$ (הפרש) וחלק (2) = `>` (T1 גבוה מ-T2). לכן תשובה {opt:a}.",
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
   "explanation": "\"מורה שלימד בשיעורים פרטיים את כל התלמידים מעל גיל 35\" דורש חילוק (÷), ובנוסף שינוי-שם (ρ) כדי להתאים את `id` ל-`student_id`. סה\"כ 2 פעולות מתוך הרשימה — לכן {opt:c}.",
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
   "explanation": "‏Π(A,B)(R) = {(2,2),(1,2),(3,2),(2,5)}; Π(B,C)(S) = {(5,7),(2,5),(6,5),(2,3),(2,2)}. החיבור הטבעי על B נותן 10 שורות (9 עבור B=2 ועוד 1 עבור B=5) ו-3 עמודות (A,B,C). לאחר $σ_{R.A ≤ 2}$ נותרות 7 שורות ו-3 עמודות.",
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
   "explanation": "כשמשתמשים במכפלה קרטזית (X) חייבים להוסיף בתנאי הבחירה את תנאֵי החיבור: `student.id = student_id` ו-`teacher.id = teacher_id` — אחרת מתקבלים צירופים שגויים. רק {opt:d} כולל אותם.",
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
   "explanation": "כשמשתמשים במכפלה קרטזית (×) חובה לכלול בתנאי הבחירה את **כל** תנאֵי החיבור: `customer.cust_id = package.recipient_id`, `delivery.pkg_id = package.pkg_id` ו-`courier.courier_id = delivery.courier_id`, לצד `city='תל אביב'`, `courier.region = customer.city` ו-`is_express = True`. רק {opt:b} כוללת את כולם.",
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
   "part": "ג",
   "topic": "relalg",
   "contextId": "26B-A-ra",
   "question": "איזו שאילתה מחזירה את כותרות הפרויקטים שפורסמו על-ידי לקוח מאומת (`is_verified = True`)?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{title}(σ_{is_verified=True ∧ project.client_id = client.id}(project × client))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{title}(σ_{is_verified=True}(project ⊗ client))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{title}(σ_{is_verified=True}(project))"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{title}(project ⊗ σ_{is_verified=True}(client))"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהאפשרויות."
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "ל-project ול-client אין תכונה בשם משותף (`client_id` מול `id`), ולכן צירוף טבעי ביניהם הוא בעצם מכפלה קרטזית — {opt:b} ו-{opt:d} מחזירות את כל הכותרות. צריך מכפלה עם תנאי `project.client_id = client.id`. ב-{opt:c} אין `is_verified` ב-project.",
   "confidence": "high",
   "id": "26B-A-Q13",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "26B-A-ra",
   "question": "מה עושה השאילתה הבאה? בחרו את התשובה הנכונה ביותר.\n$$Π_{freelancer_id}(contract ⊗ bid ⊗ project)$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "מחזירה את המזהים של פרילנסרים שהגישו הצעה לפרויקט וחתמו על חוזה לאותו פרויקט, אצל אותו לקוח, וגם באותו אופן עבודה (מרחוק או לא)."
    },
    {
     "id": "b",
     "type": "text",
     "value": "מחזירה את המזהים של פרילנסרים שגם הגישו הצעה לפרויקט וגם חתמו על חוזה כלשהו."
    },
    {
     "id": "c",
     "type": "text",
     "value": "מחזירה את המזהים של פרילנסרים שחתמו על חוזה לפרויקט מסוים וגם הגישו הצעה לפרויקט כלשהו, לא בהכרח אותו פרויקט."
    },
    {
     "id": "d",
     "type": "text",
     "value": "מחזירה את המזהים של פרילנסרים שהגישו הצעה לפרויקט וחתמו על חוזה לאותו פרויקט, אצל אותו לקוח, לא בהכרח באותו אופן עבודה (מרחוק או לא)."
    },
    {
     "id": "e",
     "type": "text",
     "value": "השאילתה אינה תקינה."
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "הצירוף הטבעי משווה את כל התכונות בעלות שם משותף: contract ו-bid לפי `freelancer_id` ו-`project_id`; ‏contract ו-project לפי `project_id`, `client_id` **וגם** `is_remote`. לכן ההצעה, החוזה והפרויקט הם על אותו פרויקט, אצל אותו לקוח ובאותו אופן עבודה.",
   "confidence": "high",
   "id": "26B-A-Q14",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "26B-A-ra",
   "question": "נתונים שני יחסים: יחס $R(A, B)$ ויחס $S(B)$. נתבונן ברצף הפעולות הבא באלגברת היחסים:\n$$T_{1} = Π_{A}(R) × S$$\n$$T_{2} = T_{1} − R$$\n$$T_{3} = Π_{A}(T_{2})$$\n$$Result = Π_{A}(R) − T_{3}$$\nאיזו פעולה מורכבת באלגברת היחסים שקולה מתמטית לתוצאה המתקבלת ב-`Result`?",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "פעולת החילוק — Division: $R ÷ S$"
    },
    {
     "id": "b",
     "type": "text",
     "value": "פעולת החיתוך — Intersection: $R ∩ S$"
    },
    {
     "id": "c",
     "type": "text",
     "value": "צירוף טבעי — Natural Join: $R ⊗ S$"
    },
    {
     "id": "d",
     "type": "text",
     "value": "צירוף חיצוני שמאלי — Left Outer Join"
    },
    {
     "id": "e",
     "type": "text",
     "value": "הפרש סימטרי — Symmetric Difference: $(R − S) ∪ (S − R)$"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "זו ההגדרה של חילוק: ‏T1 = כל הזוגות האפשריים (A, B); ‏T2 = הזוגות החסרים ב-R; ‏T3 = ערכי A שחסר להם B כלשהו מ-S; ‏Result = ערכי A שמופיעים עם **כל** ערכי B ב-S, כלומר $R ÷ S$.",
   "confidence": "high",
   "id": "26B-A-Q15",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "26B-A-ra",
   "question": "איזו שאילתה מחזירה את הגיל של הפרילנסר המבוגר ביותר (הגיל המקסימלי בטבלת `freelancer`)?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{age}(freelancer) − Π_{f1.age}(σ_{f1.age < f2.age}(ρ_{f1}(freelancer) × ρ_{f2}(freelancer)))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{age}(freelancer) − Π_{f1.age}(σ_{f1.age > f2.age}(ρ_{f1}(freelancer) × ρ_{f2}(freelancer)))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{f1.age}(σ_{f1.age > f2.age}(ρ_{f1}(freelancer) × ρ_{f2}(freelancer)))"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{age}(freelancer) − Π_{age}(σ_{freelancer.age < freelancer.age}(freelancer × freelancer))"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהאפשרויות."
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "‏`f1.age < f2.age` מוצא את כל הגילים שיש גיל גדול מהם (כלומר לא מקסימליים). מחסירים אותם מכל הגילים ונשאר המקסימום. ‏{opt:b} מחזירה את המינימום. ‏{opt:c} מחזירה כל גיל שאינו המינימלי. ב-{opt:d} אין שינוי שם, ולכן אי אפשר להבחין בין שני העותקים.",
   "confidence": "high",
   "id": "26B-A-Q16",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": true
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "26S-A-sql",
   "question": "איזה ביטוי מחזיר את מזהי הנוסעים שהזמינו את **כל** הטיסות שממריאות מ-`'TLV'`?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{passenger_id, flight_number}(Booking) ÷ Π_{flight_number}(σ_{origin='TLV'}(Flight))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{passenger_id}(Booking) − Π_{passenger_id}(Booking ⋈ σ_{origin≠'TLV'}(Flight))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{passenger_id}(Booking ⋈ σ_{origin='TLV'}(Flight))"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{flight_number}(σ_{origin='TLV'}(Flight)) ÷ Π_{passenger_id, flight_number}(Booking)"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "Booking ÷ Π_{flight_number}(σ_{origin='TLV'}(Flight))"
    }
   ],
   "correctId": "a",
   "answerSource": "self-solved",
   "explanation": "'את כל' = חילוק. המחולק הוא הזוגות (נוסע, טיסה), והמחלק הוא קבוצת הטיסות מ-TLV. נשאר `passenger_id` שמופיע עם **כל** טיסה במחלק. {opt:c} מחזירה מי שהזמין **לפחות** טיסה אחת מ-TLV. {opt:b} מחזירה מי שהזמין **רק** טיסות מ-TLV. {opt:d} הפוכה. ב-{opt:e} המחולק כולל גם `seat_no` ו-`booking_date`, אז החילוק מקבץ לפי (נוסע, מושב, תאריך) לכל טיסה בנפרד.",
   "confidence": "high",
   "id": "26S-A-Q14",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": false
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "26S-A-sql",
   "question": "איזה ביטוי מחזיר את יעדי הטיסות שהזמין הנוסע ששמו `'Dana Levi'`?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{destination}(σ_{full_name='Dana Levi'}(Passenger) × Flight)"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{full_name}(σ_{destination='Dana Levi'}(Flight))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{destination}(Booking ⋈ Flight)"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "σ_{full_name='Dana Levi'}(Passenger ⋈ Booking ⋈ Flight)"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "Π_{destination}(σ_{full_name='Dana Levi'}(Passenger ⋈ Booking ⋈ Flight))"
    }
   ],
   "correctId": "e",
   "answerSource": "self-solved",
   "explanation": "מצרפים Passenger ⋈ Booking ⋈ Flight (צירוף טבעי לפי `passenger_id` ואז `flight_number`), בוחרים את Dana Levi ומטילים על `destination`. {opt:a} היא מכפלה בלי Booking, כלומר **כל** היעדים. {opt:c} לא מסננת לפי שם. {opt:d} מחזירה שורות שלמות ולא רק יעדים. {opt:b} לא הגיונית: אין `full_name` ב-Flight.",
   "confidence": "high",
   "id": "26S-A-Q15",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": false
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "26S-A-sql",
   "question": "איזה ביטוי מחזיר את שמות הנוסעים המתגוררים בעיר `'Holon'`?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "σ_{city='Holon'}(Π_{full_name}(Passenger))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{full_name}(σ_{city='Holon'}(Passenger))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{full_name}(σ_{destination='Holon'}(Passenger))"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{city}(σ_{full_name='Holon'}(Passenger))"
    },
    {
     "id": "e",
     "type": "algebra",
     "value": "σ_{full_name='Holon'}(Π_{city}(Passenger))"
    }
   ],
   "correctId": "b",
   "answerSource": "self-solved",
   "explanation": "קודם σ (בחירת השורות של חולון) ורק אז Π (הטלה על השם). ב-{opt:a} ההטלה מוחקת את `city` לפני הבחירה, ולכן התנאי לא תקין. ל-Passenger אין `destination` ({opt:c}). {opt:d} ו-{opt:e} מחליפות בין השם לעיר.",
   "confidence": "high",
   "id": "26S-A-Q16",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": false
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "26Z-CL-ra",
   "question": "מה מחזירה השאילתה הבאה? בחרו את התשובה הנכונה ביותר.\n$$Π_{name}(listener ⊗ artist)$$",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "את שמות המאזינים שגרים במדינה שיש בה לפחות אמן אחד"
    },
    {
     "id": "b",
     "type": "text",
     "value": "את השמות של מאזינים שיש אמן **עם אותו שם ומאותה מדינה** כמוהם"
    },
    {
     "id": "c",
     "type": "text",
     "value": "את שמות כל המאזינים ואת שמות כל האמנים (איחוד)"
    },
    {
     "id": "d",
     "type": "text",
     "value": "את שמות כל המאזינים, כי ליחסים אין מפתח משותף והצירוף הוא מכפלה קרטזית"
    },
    {
     "id": "e",
     "type": "text",
     "value": "השאילתה אינה תקינה, כי לשני היחסים יש תכונה בשם `name`"
    }
   ],
   "correctId": "b",
   "answerSource": "claude-practice",
   "explanation": "צירוף טבעי משווה את **כל** התכונות בעלות שם משותף. ל-listener ול-artist יש שתיים כאלה: `name` **וגם** `country`. לכן נשארים רק זוגות (מאזין, אמן) עם אותו שם ואותה מדינה, ומהם מוקרן השם. מי שמשווה רק לפי country מקבל את האפשרות של \"גרים באותה מדינה\". המפתחות (`listener_id`, `artist_id`) שונים בשמם ולא משתתפים בצירוף. תכונה משותפת היא בדיוק מה שהצירוף הטבעי משתמש בו, ולא שגיאה.",
   "confidence": "high",
   "id": "26Z-CL-Q13",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": false
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "26Z-CL-ra",
   "question": "איזו שאילתה מחזירה את המזהים של **המאזין המבוגר ביותר בכל מדינה** (מאזין שאין מאזין מבוגר ממנו באותה מדינה)?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "Π_{listener_id}(listener) − Π_{L1.listener_id}(σ_{L1.age < L2.age}(ρ_{L1}(listener) × ρ_{L2}(listener)))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{L1.listener_id}(σ_{L1.country = L2.country ∧ L1.age > L2.age}(ρ_{L1}(listener) × ρ_{L2}(listener)))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{listener_id}(listener) − Π_{L1.listener_id}(σ_{L1.country = L2.country ∧ L1.age > L2.age}(ρ_{L1}(listener) × ρ_{L2}(listener)))"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{listener_id}(listener) − Π_{L1.listener_id}(σ_{L1.country = L2.country ∧ L1.age < L2.age}(ρ_{L1}(listener) × ρ_{L2}(listener)))"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף אחת מהאפשרויות."
    }
   ],
   "correctId": "d",
   "answerSource": "claude-practice",
   "explanation": "התבנית של מקסימום: **כולם פחות מי שיש מישהו גדול ממנו**. ‏`L1.age < L2.age` עם `L1.country = L2.country` מוצא כל מאזין שיש מאזין מבוגר ממנו **באותה מדינה**. מחסירים אותם מכולם ונשאר המבוגר ביותר בכל מדינה. מאזין יחיד במדינתו נשאר, כי אין לו עם מי להשוות. בלי תנאי המדינה מתקבל רק המבוגר ביותר בכלל. עם `>` בהפרש מתקבל הצעיר ביותר בכל מדינה. בלי הפרש בכלל, `>` מחזיר כל מי שמבוגר ממישהו במדינתו, כלומר כל מי שאינו הצעיר ביותר.",
   "confidence": "high",
   "id": "26Z-CL-Q14",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": false
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "26Z-CL-ra",
   "question": "איזו שאילתה מחזירה את המזהים של המאזינים שהאזינו ל**כל** האלבומים מז׳אנר `\"Jazz\"`?",
   "options": [
    {
     "id": "a",
     "type": "algebra",
     "value": "plays ÷ Π_{album_id}(σ_{genre = \"Jazz\"}(album))"
    },
    {
     "id": "b",
     "type": "algebra",
     "value": "Π_{listener_id}(plays ⊗ σ_{genre = \"Jazz\"}(album))"
    },
    {
     "id": "c",
     "type": "algebra",
     "value": "Π_{listener_id}(plays) − Π_{listener_id}((Π_{listener_id}(plays) × Π_{album_id}(σ_{genre = \"Jazz\"}(album))) − plays)"
    },
    {
     "id": "d",
     "type": "algebra",
     "value": "Π_{listener_id}(plays) − Π_{listener_id}(σ_{genre ≠ \"Jazz\"}(plays ⊗ album))"
    },
    {
     "id": "e",
     "type": "text",
     "value": "תשובות {opt:a} ו-{opt:c} נכונות."
    }
   ],
   "correctId": "e",
   "answerSource": "claude-practice",
   "explanation": "\"כל\" = **חילוק**. ‏plays(listener_id, album_id) ÷ (מזהי אלבומי הג׳אז) מחזיר מאזינים שמופיעים עם **כל** אלבומי הג׳אז. השאילתה הארוכה היא **הגדרת החילוק** בפעולות בסיסיות: (כל מאזין × כל אלבום ג׳אז) פחות מה שקרה באמת נותן את הזוגות החסרים. מאזין שחסר לו אלבום ג׳אז כלשהו מוחסר מכל המאזינים. לכן שתיהן נכונות. הצירוף עם אלבומי ג׳אז מחזיר מי שהאזין לאלבום ג׳אז **אחד לפחות**. ההפרש עם `genre ≠ \"Jazz\"` מחזיר מי שהאזין **רק** לג׳אז, ולא בהכרח לכל אלבומי הג׳אז.",
   "confidence": "high",
   "id": "26Z-CL-Q15",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "אלגברה רלציונית",
   "official": false
  },
  {
   "part": "ג",
   "topic": "relalg",
   "contextId": "26Z-CL-q16",
   "question": "נתונים היחסים R ו-S (ראו טבלאות) ונתונה השאילתה:\n$$σ_{D < 7}(Π_{A,B}(R) ⊗ Π_{B,D}(S))$$\nכמה שורות וכמה עמודות תכיל תוצאת השאילתה? (`⊗` — צירוף טבעי)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "שש שורות ושלוש עמודות."
    },
    {
     "id": "b",
     "type": "text",
     "value": "ארבע שורות וארבע עמודות."
    },
    {
     "id": "c",
     "type": "text",
     "value": "ארבע שורות ושלוש עמודות."
    },
    {
     "id": "d",
     "type": "text",
     "value": "שתי שורות ושלוש עמודות."
    },
    {
     "id": "e",
     "type": "text",
     "value": "חמש שורות ושלוש עמודות."
    }
   ],
   "correctId": "c",
   "answerSource": "claude-practice",
   "explanation": "‏$Π_{B,D}(S)$ הוא **קבוצה**: השורות (x, 10, 5) ו-(x, 12, 5) הופכות לזוג אחד (x, 5). נשארים (x,5), (x,6), (y,7), (y,8), (w,9). ‏$Π_{A,B}(R)$ = (1,x), (2,y), (3,x), (4,z). אחרי ההטלות התכונה המשותפת היחידה היא **B** (‏C כבר לא קיימת). הצירוף: A=1 ו-A=3 עם (x,5), (x,6) ‏←‏ 4 שורות, ו-A=2 עם (y,7), (y,8) ‏←‏ 2 שורות. ‏$σ_{D<7}$ משאיר את 4 השורות של x. התוצאה היא **4 שורות ו-3 עמודות (A, B, D)**. מי שלא מוחק כפילויות מקבל 6 שורות. מי שמצרף גם לפי C מקבל 2.",
   "confidence": "high",
   "id": "26Z-CL-Q16",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
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
   "explanation": "פתרונות 1 (`>= all`) ו-3 (`= any (max)`) נכונים. פתרון 2 שגוי — `max` ללא `GROUP BY` יחד עם עמודות נוספות (`p_name, p_gender`).",
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
   "explanation": "לכל זוג (עיר, תחביב) יש לקבץ לפי שתי התכונות ולספור, ולכן `Group by p_city, h_code`.",
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
   "explanation": "פתרון {opt:b} מצרף את הטבלה לעצמה ומחזיר את המגדר בעל הממוצע הגדול. אם יש רק שני מגדרים {opt:b} יעבוד, אך התשובה אינה חד-משמעית ולכן ניתן ניקוד מלא גם על {opt:d}. (פתרון {opt:c} שגוי: בגלל NOT EXISTS הוא מחזיר את המינימלי ולא את המקסימלי.)",
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
   "explanation": "קודי התחביב בסדר עולה ושמות האנשים בסדר יורד → `Order by interested.h_code, person.p_name desc`. התקבלה גם {opt:e}, כיוון שלא צוין במפורש מה למיין קודם.",
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
   "explanation": "התנאי \"כמות ייחודית\" פירושו שלא קיימת פרה אחרת עם אותה כמות → `Where NOT Exists (...)` → {opt:e} (אומת לוגית). הסטודנט סימן במקביל גם {opt:d} בטעות. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "תת-השאילתה סופרת כמה פרות בעלות אותה כמות חלב; לייחודיות הספירה חייבת להיות בדיוק 1 (רק הפרה עצמה) → `=1` → {opt:b}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "`mother_of.mom_id = c.cow_id` מתקיים כאשר הפרה היא אם; `NOT EXISTS` בוחר פרות שאינן אם של אף פרה — כלומר פרות שאין להן בנות → {opt:a}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "שאילתה 12 מוצאת פרות שאינן אמהות. שאילתה 1 (`cow_id not in (select mom_id...)`) שקולה. שאילתה 2 עם `NOT IN` מתואם: תת-השאילתה מחזירה {c.cow_id} כשהפרה אמא (→ מסוננת) או קבוצה ריקה כשאינה אמא (→ נכללת), ולכן גם היא שקולה. שתי השאילתות שקולות → {opt:c}. (הסטודנט סימן {opt:a} מתוך חשש שנדרש NOT EXISTS, אך ה-NOT IN המתואם תקין כאן.) (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "השורה `cow.nickname = \"נחמה\" and cow.cow_id = food2.cow_id` בוחרת את קודי המזון של הפרה \"נחמה\" → {opt:a}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "תת-השאילתה `WHERE food1.cow_id = food3.cow_id` אוספת את כל קודי המזון של הפרה הנבדקת (food1) → {opt:b}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "פתרונות 1, 2 ו-3 מחזירים את הפרות בעלות כמות החלב המקסימלית (בדרכים שונות); פתרון 4 שגוי — `max(amount)` יחד עם `cow_id` ללא `GROUP BY`. לכן {opt:d}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "נדרש קודם צירוף היחסים בתנאי `milk_product.cow_id=place_of.cow_id` ואז `Group by block_id` — הסדר התקין הוא WHERE ואז GROUP BY, כלומר {opt:c}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "שאילתות 1 ו-3 משתמשות ב-`avg(age)` בתוך `WHERE` (שגוי). רק שאילתה 2 מסננת קבוצות נכון עם `HAVING (avg(age) > 10)` → {opt:d}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "ה-WHERE משתמש ב-`m1.mom_id`/`m1.daughter_id` (מ-mother_of) ובחסר את `mp1`, ולכן הקטע (3) הוא `mother_of as m1, mother_of as m2, milk_product as mp1` → {opt:c}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
   "explanation": "יש לקשר את הדור השני (c2, אם) לדור השלישי (c3, נכדה) דרך `m2`: `m2.mom_id=c2.cow_id and m2.daughter_id=c3.cow_id` → {opt:d}. (התשובה מפתרון סטודנט — לא רשמית.)",
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
     "value": "תשובות {opt:a} ו{opt:b} עושות אותו דבר"
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
   "explanation": "רק תשובה {opt:b} מצרפת נכון: לקוח→רכישה→דירה (c.city=a.city) וגם קבלן (b.city=a.city). בתשובה {opt:a} חסר תנאי ה-join עם הקבלן.",
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
   "explanation": "יש לצרף Purchases→Apartment→customer ולסנן `name like \"%a%\" AND age>39`. תשובה {opt:a} משתמשת ב-`OR`, תשובה {opt:c} חסרה את הצירוף ל-Apartment, ותשובה {opt:d} מבצעת מכפלה קרטזית ללא תנאי צירוף.",
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
   "explanation": "כדי שקבלן מכר את כל דירותיו, קבוצת הדירות שנקנו (Purchases) חייבת להכיל (CONTAINS) את קבוצת הדירות שהוא בנה (Apartments של אותו קבלן) — כפי שבתשובה {opt:d}.",
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
   "explanation": "יש להשוות את המשכורת ל-min(salary) של כל הלקוחות ולצרף ל-Purchases כדי לוודא שרכשו דירה. תשובות {opt:a}/{opt:b} מחזירות עמודות שגויות ותשובה {opt:d} אינה מסננת למינימום.",
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
     "value": "תשובות {opt:b} ו{opt:c} נכונות."
    }
   ],
   "correctId": "b",
   "official": true,
   "answerSource": "combined-pdf",
   "confidence": "high",
   "explanation": "ללא count השאילתה מחזירה את רשימת ה-contractor_id של הקבלנים שבנו דירות שנמכרו (ללא צורך ב-`GROUP BY`).",
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
   "explanation": "שאלה מורכבת — התקבלו שתי התשובות {opt:d} ו-{opt:e} (יש חוסר התאמה בשורות אך הוא אפשרי כיוון שמדובר ב-`NOT EXISTS`).",
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
   "explanation": "מצרפים את שני היחסים המבוקשים (`inst_n` ו-`max_set`) בתנאי `inst_n.inst_num = max_set.max_num` כדי לבחור את הקבוצות בעלות מספר הכלים המקסימלי.",
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
   "explanation": "לפי הפתרון הרשמי התקבלו התשובות {opt:c}, {opt:d} ו-{opt:e} למלוא הנקודות (השאלה לא הובהרה דיה, ובתשובה {opt:d} נכתב \"שם שונה\" ולא \"קוד שונה\").",
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
   "explanation": "השאילתה אינה נכונה — חסר בה חלק של JOIN (הקשר `band.b_code = band_musician.b_code`), ואינה מתייחסת לסוג הלהקה. התקבלו התשובות {opt:d} ו-{opt:e}.",
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
   "explanation": "פתרון 2 שגוי (min ללא GROUP BY עם עמודות נוספות). פתרונות 1 ו-3 מחזירים את המוסיקאי בעל הגיל המינימלי. (על {opt:a}, {opt:c}, {opt:e} ניתנו חצי מהנקודות.)",
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
   "explanation": "המיון: כלי נגינה בסדר עולה ושמות המוסיקאים בסדר יורד → `Order by inst.instrument, m.m_name desc`. אין צורך ב-`GROUP BY` כי מוצגות שורות עם חזרות.",
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
   "explanation": "המדינה המקבלת היא `to_country`; מסננים `num_points = 12` ומקבצים לפי `to_country` עם `COUNT(*)`. {opt:a} היא התשובה הנכונה והתמציתית ביותר. {opt:c} מגיע לתוצאה דומה דרך תת-שאילתה מיותרת (וקיבל ניקוד חלקי בלבד), ואילו {opt:b} מקבץ לפי `from_country` ו-{opt:d} מחזיר מספר יחיד ללא פירוט למדינה.",
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
   "explanation": "שאלת חילוק ברמת קושי גבוהה, שנפתרת בשלילה כפולה: מדינה `to_country` שאין מדינה משתתפת (בין 2012–2022) שלא נתנה לה מעל 4 נקודות. רק {opt:a} מנוסח נכון; במסיחים {opt:b}, {opt:c}, {opt:d} יש שגיאות (למשל שימוש בעמודות `score`/`country_name` שאינן קיימות ב-Score, וסדר סעיפים משובש ב-{opt:c}). לכן {opt:a}.",
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
   "explanation": "צריך לספור שנים **שונות**:`count(distinct year) > 1`. מסיח {opt:a} סופר `count(year)` ועלול לספור אותה שנה פעמיים (לכן ירדו עליו נקודות); {opt:b} משתמש ב-COUNT בתוך WHERE (לא חוקי); {opt:d} מפעיל HAVING ללא GROUP BY. לכן {opt:c}.",
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
   "explanation": "ב-{opt:a} יש מכפלה קרטזית (Performer, Instrument ללא תנאי חיבור) שהופכת את התוצאה ללא נכונה; {opt:b} מכיל שגיאת תחביר גסה; {opt:c} מחבר על `Instrument.p_name` שאינו קיים ומשתמש ב-LIKE שלא לצורך; {opt:d} מחזיר גם שם וגם ממוצע שלא נדרש. לכן אף תשובה אינה נכונה.",
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
   "question": "מה ממוצע הפרש הגילאים של המופיעים כל שנה (כלומר בכל שנה יש הפרש בין הגיל המקסימלי באותה שנה לגיל המינימלי באותה שנה — מה הממוצע של ההפרשים הללו), למופיעים בין השנים 2023 לבין 2003?\n**אפשר להשתמש ב-view הבא, אך לא חובה:**",
   "code": "CREATE VIEW temp_view AS (SELECT * FROM Performer JOIN Band USING(p_name) JOIN Represent USING(b_name)",
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
   "explanation": "יש לחשב לכל שנה את `MAX(age) - MIN(age)` (עם `GROUP BY year` בתת-שאילתה, שחייבת לקבל שם — `funnyQ`), ומעליה `AVG`. {opt:a} מחשב ממוצע גילאים ולא הפרשים; {opt:b} מחלק ב-`COUNT(*)` במקום ממוצע לפי שנה; ל-{opt:d} יש תנאי לא-קבוצתי ב-HAVING. לכן {opt:c}.",
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
   "explanation": "בשאלה מספר שגיאות מכוונות: {opt:a} מקבץ ב-`GROUP BY country_name` (עמודה שאינה בטבלת Band); {opt:b} מקבץ לפי `p_name` במקום `b_name`; {opt:c} (`LEFT JOIN ... IS NULL`) מחזיר מי שאינו בלהקה כלל ולא 'להקה של אדם אחד'; {opt:d} משתמש ב-COUNT בתוך WHERE (לא חוקי). לכן התשובה {opt:e}. הערה: על-פי המחוון קיבלו גם את מסיח {opt:b}.",
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
   "explanation": "שאלת MAX ברמת קושי גבוהה. {opt:a} משרשר `MAX(COUNT(...))` באופן לא חוקי; {opt:b} שגוי תחבירית (`COUNT = MAX(p_name)`); {opt:c} מחזיר שנה מקסימלית ולא את השנה של הלהקה הגדולה. {opt:d} מוצא את הלהקה עם מספר המבצעים הגדול ביותר (`COUNT(b.p_name) >= ALL ...`). לכן {opt:d}.",
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
   "explanation": "המדינה הנותנת היא `from_country`. \"מעולם לא נתנה 12\" = `from_country` שאינו מופיע באף שורה עם `num_points = 12` (`NOT IN`). {opt:a} מחזיר מדינות שנתנו ניקוד השונה מ-12 ולו פעם אחת (גם אם נתנו 12 בפעם אחרת); {opt:b}, {opt:d} משתמשים ב-`to_country` (המדינה המקבלת).",
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
   "explanation": "זוהי שאלת חלוקה: להקה שאין קטגוריה שאין לה יצוג בה. התבנית `NOT EXISTS`-כפול של {opt:b} בודקת שאין קטגוריה שאינה מיוצגת בכלים של אותה להקה. {opt:a} משתמש ב-`JOIN` ללא תנאי חיבור (`serial_number`), ולכן הספירה שגויה.",
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
   "explanation": "חלוקה ניתנת לביטוי כהכלת קבוצות, ובחלק מהדיאלקטים אף באמצעות `CONTAINS`, אך לא כל מימוש של `SQL` תומך בכך. חילוק ניתן גם להמיר לספירת שורות (ולכן {opt:b} שגוי), ואינו הפעולה ההופכית למכפלה קרטזית באופן שמוזכר ב-{opt:d}.",
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
     "value": "SELECT country_name FROM Represent WHERE b_name NOT IN\n  (SELECT b_name FROM Band JOIN Performer USING(p_name)\n   WHERE height < 1.80)",
     "lang": "sql"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT country_name FROM Represent As R1 WHERE NOT EXISTS\n  (SELECT p_name FROM Band As B1 WHERE b_name NOT IN\n    (SELECT b_name FROM Performer JOIN Band As B2 USING(p_name)\n     WHERE height < 1.80 and B1.b_name = R1.p_name))",
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
   "explanation": "\"כולם בגובה ≥ 1.80\" = אין אף חבר נמוך מ-1.80. {opt:c} בוחר מדינות שהלהקה המייצגת אותן אינה נמצאת בין הלהקות שיש בהן מבצע בגובה קטן מ-1.80 (`NOT IN`). {opt:a} ו-{opt:b} מחזירים מדינות שיש בהן ולו מבצע אחד גבוה, ו-{opt:d} שגוי לוגית ותחבירית.",
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
   "explanation": "צריך לחבר את `Represent` ל-`Score` לפי אותה שנה (`USING(year)`) ולסנן `country_name = to_country AND num_points = 12`. {opt:a} ו-{opt:b} מבצעים מכפלה ללא חיבור על השנה (`Score` מכיל `year` נפרד → צימוד שנים שגוי), {opt:d} מחבר לפי עמודה לא קיימת `country`, ו-{opt:e} אינו מחזיר את שם הלהקה כלל.",
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
   "explanation": "מקבצים לפי (`to_country`, `year`), וב-`HAVING` דורשים שסכום הנקודות של הקבוצה יהיה גדול-או-שווה לכל הסכומים של כל קבוצה אחרת (`>= ALL`). {opt:b} משווה סכום ל-`max` של ניקוד בודד, ו-{opt:c}, {opt:d} בעלי קיבוץ/צירוף אגרגציה שגויים.",
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
   "question": "לכל תזמורת מעוניינים להשכיר מכולה שבה הכלים יהיו בקופסאות בגודל המתאים להם, אך יעמדו אך ורק קופסא על גבי קופסא. מה גובה ה-`height` של המכולה לכל תזמורת? השלם את `(1)`:",
   "code": "SELECT ____(1)____ FROM Band JOIN Instrument USING(serial_number) GROUP BY b_name",
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
   "code": "CREATE VIEW numBookingPerCustomer AS\n(SELECT PassportNumber, count(DISTINCT BookingID) As numBooking\nFROM Booking Group By PassportNumber",
   "options": [
    {
     "id": "a",
     "type": "code",
     "value": "SELECT LastName, FirstName\nFROM Passenger JOIN numBookingPerCustomer USING (PassportNumber)\nWHERE numBooking >= ALL (SELECT numBooking FROM numBookingPerCustomer)"
    },
    {
     "id": "b",
     "type": "code",
     "value": "SELECT LastName, FirstName , max (numBooking )\nFROM Passenger JOIN numBookingPerCustomer USING (PassportNumber)"
    },
    {
     "id": "c",
     "type": "code",
     "value": "SELECT LastName, FirstName\nFROM Passenger JOIN numBookingPerCustomer USING (PassportNumber)\nWHERE max(numBooking)"
    },
    {
     "id": "d",
     "type": "code",
     "value": "SELECT LastName, FirstName\nFROM Passenger JOIN numBookingPerCustomer USING (PassportNumber)\nHAVING numBooking not in min(numBooking)"
    },
    {
     "id": "e",
     "type": "code",
     "value": "SELECT LastName, FirstName\nFROM Passenger JOIN numBookingPerCustomer USING (PassportNumber)\nHAVING numBooking =\n  (SELECT numBooking FROM numBookingPerCustomer WHERE max(numBooking)"
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
   "explanation": "יש לצרף Passenger→Booking→Schedule→Flight→Airline. בתשובה {opt:b} חלה שגיאה (`Schedule` לא הוגדר `AS s`), ולכן התקבלו {opt:a} או {opt:e}.",
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
   "explanation": "יש לצרף Airline ל-Flight, לקבץ לפי שם החברה ולספור. התקבלו {opt:a} וגם {opt:e}.",
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
   "explanation": "התקבלו {opt:a} או {opt:e}. בתשובה {opt:a} מופיע `f` במקום `f1` (אי-דיוק קל), ולכן התקבלה גם {opt:e}.",
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
   "explanation": "\"נרשמו לכל הקורסים של Mathematics\" = חלוקה: אין קורס Mathematics שאליו הסטודנט לא נרשם — תבנית `NOT EXISTS` כפולה ({opt:c}). {opt:b} בודק היעדר הרשמה; ל-{opt:a} מספיק קורס אחד; {opt:d} הוא חיבור פנימי רגיל.",
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
   "explanation": "עם אופרטור `CONTAINS`: קבוצת הקורסים שאליהם נרשם הסטודנט חייבת להכיל את קבוצת קורסי Mathematics — כלומר (הרשמות הסטודנט) `CONTAINS` (קורסי Mathematics), כפי ש-{opt:a} מנסח. {opt:b} הופך את כיוון ההכלה; {opt:c} משווה לכל הקורסים; {opt:d} משווה `course_id` מול `department`.",
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
   "explanation": "‏{opt:a} מחבר Students↔Enrollments↔Courses ומסנן `credits >= 4` עם סדר העמודות הנכון `(first_name, course_name)`. {opt:b} בודק `credits > 4`; {opt:c} בודק `credits = 4`. ל-{opt:d} ניתן ניקוד חלקי בלבד (4 נק') — סדר העמודות הפוך `(course_name, first_name)` והשאילתה פחות יעילה.",
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
   "explanation": "צריך לחבר Students↔Enrollments ולסנן `grade = (SELECT MIN(grade) FROM Enrollments)`. {opt:a} עושה זאת ישירות; ל-{opt:d} עם `= ANY (SELECT MIN(grade)…)` תוצאה זהה (ANY מול ערך יחיד ≡ שוויון) ולכן התקבל גם הוא (4 נק'). {opt:b} בודק `> MIN`, ו-{opt:c} בודק `<= MAX` (כלומר את כל הציונים).",
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
   "explanation": "‏`COUNT(DISTINCT student_id)` עם סינון `C.credits >= 3` סופר את מספר הסטודנטים השונים שנרשמו לקורס כלשהו המעניק 3 נקודות זכות או יותר. {opt:a} מגביל ל'בדיוק 3'; {opt:b} סופר קורסים; {opt:c} סופר הרשמות.",
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
   "explanation": "צריך לסנן `semester = 'Spring 2024'` ב-WHERE ואז `HAVING COUNT(course_id) > 3`. {opt:b} שם את תנאי הסמסטר ב-HAVING (שגוי); {opt:c} משתמש ב-`WHERE COUNT(*)` (שגוי); {opt:d} סוכם נקודות זכות. הערת ערעור: מאחר ש-GROUP BY לפי `first_name` אינו ייחודי (ייתכן שסופרים קורסים של סטודנטים שונים בעלי אותו שם), התקבלה כנכונה גם תשובה {opt:e}.",
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
   "explanation": "‏LEFT JOIN עם `WHERE grade < 60` מסנן החוצה את ערכי ה-NULL, כך שבפועל מוצגים רק הסטודנטים שקיבלו ציון מתחת ל-60. הכוונה הייתה ל-{opt:a}, אך מכיוון שהיא אינה מציינת שגם הציון עצמו מוצג לצד השם — התקבלה כלגיטימית גם תשובה {opt:e}.",
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
   "explanation": "צריך AND בין `first_name LIKE '%e%'` לבין `birth_year < 2001` (גיל מעל 24). {opt:a} ו-{opt:c} משתמשים ב-OR (וב-{opt:c} גם קדימות שגויה של OR מול AND); {opt:d} בודק `birth_year > 2001` (כיוון הפוך). רק {opt:b} נכון.",
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
   "explanation": "מסננים `category = 'Programming'` ב-`WHERE` (לפני הקיבוץ), מקבצים לפי הקורס וסופרים `COUNT(*)`. {opt:a} שם `WHERE` אחרי `GROUP BY` (שגוי תחבירית); {opt:c} מסנן `category` בטבלת Enrollments; {opt:d} מחזיר `category` במקום ספירה נכונה לכל קורס.",
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
   "explanation": "זוהי חלוקה (division): קורס שאין אף משתמש שלא נרשם אליו. התבנית הנכונה היא `NOT EXISTS` כפול — אין משתמש שעבורו לא קיימת הרשמה לקורס הזה.",
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
   "explanation": "קורס ללא הרשמות = course_id שאינו מופיע כלל בטבלת Enrollments, כלומר `course_id NOT IN (SELECT course_id FROM Enrollments)`. חיבור פנימי ({opt:a}) לא יחזיר קורסים ללא הרשמות כלל.",
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
   "explanation": "שתי התשובות נכונות, כל אחת בדרכה. לא הייתה כאן דרישה מפורשת להופעת שם רק פעם אחת — שהרי בלי DISTINCT ייתכנו כאן כפילויות. ({opt:a} מבצע `JOIN` עם `progress < 50`; {opt:c} משיג זאת עם תת-שאילתות. {opt:b} משתמש ב-`> 50`, ו-{opt:d} ב-`<= 50` עם `OR` — שגויים.)",
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
   "explanation": "צריך סינון `registration_year = 2023` וגם `country <> 'Israel'` (תנאי `AND`), וספירה לכל מדינה עם `GROUP BY country`. {opt:a} מסנן דווקא Israel, {opt:b} משתמש ב-OR, ו-{opt:d} בעל GROUP BY שגוי.",
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
   "explanation": "מחברים Courses ל-Enrollments לפי `course_id` ומסננים `progress = 0`. {opt:a} בודק `progress = 100`; {opt:c} שולף `course_title` מ-Enrollments (עמודה שאינה קיימת שם); {opt:d} מחבר לפי `course_id = enrollment_id` — שגוי.",
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
   "explanation": "צריך לחבר Users↔Enrollments לפי `user_id` ו-Enrollments↔Courses לפי `course_id`, ולסנן `status = 'withdrawn'`. {opt:c} מחבר לפי `enrollment_id` (שגוי); {opt:a} ו-{opt:b} אינם מחזירים גם שם וגם קורס נכונים.",
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
   "explanation": "החיבור הנכון הוא לפי `Courses.category = Instructors.expertise` (כפי שרומז ההערה). {opt:b} מחבר לפי `level` (שאינו קיים ב-Instructors); {opt:c} לפי `category = email`; {opt:d} לפי `course_id` ב-`USING` (שאינו קיים ב-Instructors).",
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
   "explanation": "החיבור הנכון הוא Sellers→Products→OrderItems→Orders עם סינון `category='Home'` ו-`status='Paid'` וקיבוץ לפי המוכר. {opt:a} סופרת `COUNT(O.order_id)` ו-{opt:b} סופרת `COUNT(*)`. לפי הטבלה הרשמית התקבלו {opt:a}, {opt:b} וגם {opt:e}.",
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
   "explanation": "\"לפחות 3 לקוחות שונים\" דורש `COUNT(DISTINCT O.customer_id) >= 3` לאחר קיבוץ לפי המוצר — כפי שב-{opt:c}. {opt:a} סופרת ללא DISTINCT ועם > 3; {opt:b} בודקת `customer_id >= 3` (השוואת ערך המזהה); {opt:d} סופרת הופעות ולא לקוחות שונים.",
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
   "explanation": "מוצר ללא ביקורת = אין לו התאמה ב-Reviews. LEFT JOIN עם `R.product_id IS NULL` מחזיר בדיוק אותם. {opt:a} תמיד ריקה; {opt:b} ו-{opt:d} מחייבות קיום ביקורת (חיבור פנימי).",
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
   "explanation": "אף שאילתה אינה נכונה: {opt:a} משתמשת ב-OR (במקום AND) ואינה מסננת `status='Paid'`; {opt:b} מסננת `status <> 'Paid'` (הפוך) וללא תנאי כמות; {opt:c} ו-{opt:d} משתמשות ב-NATURAL JOIN בין Customers ל-Products (חיבור שגוי, ללא Orders/OrderItems, והעמודות quantity/status אינן קיימות שם). לכן {opt:e}.",
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
   "explanation": "צריך לסנן ב-WHERE את `EXTRACT(YEAR FROM joined_at) = 2024` וגם `country <> 'Israel'` (תנאי AND) ולספור לכל מדינה עם GROUP BY country. {opt:a} משתמשת ב-OR; {opt:b} ממקמת את התנאים ב-GROUP BY; {opt:c} מסננת שנת 2023. רק {opt:d} נכונה.",
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
   "explanation": "מוצר שלא הוזמן = מוצר שאין לו התאמה ב-OrderItems. LEFT JOIN עם `OI.product_id IS NULL` מחזיר בדיוק את המוצרים ללא הזמנה. {opt:a} מחזירה את ההפך; {opt:c} תמיד ריקה (חיבור פנימי + COUNT=0); {opt:d} מכילה שגיאה `P._product_id_`.",
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
   "explanation": "רק {opt:d} מבצעת את שרשרת החיבורים הנכונה עד ל-Sellers (Orders→OrderItems→Products→Sellers) ולכן מסוגלת לסנן לפי דירוג המוכר. {opt:a} אינה מגיעה כלל ל-Sellers; {opt:b} ו-{opt:c} מפנות ל-S ללא חיבור תקין. (התשובה הרשמית: {opt:d}.)",
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
   "explanation": "החיבור הנכון הוא `S.seller_id = P.seller_id`, עם סינון `P.active = TRUE AND P.price > 100` והצגת שם מוצר, שם מוכר ותאריך פתיחה. {opt:b} מבצעת מכפלה קרטזית ללא תנאי חיבור; {opt:c} מחברת לפי `P.product_id = S.seller_id` (שגוי); {opt:d} מחזירה רק פרטי מוכר.",
   "confidence": "high",
   "id": "25S-B-Q9",
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
   "contextId": "26B-A-sql",
   "question": "מיהם המנויים שהשתתפו בכל השיעורים מסוג `'Yoga'`? בחרו את השאילתא הנכונה.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT name FROM Member m WHERE NOT EXISTS\n(SELECT class_id FROM Class c WHERE c.type='Yoga' AND\n   c.class_id NOT IN (SELECT a.class_id FROM Attendance a\n   WHERE a.member_id = m.member_id))"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT name FROM Member JOIN Attendance USING(member_id)\n  JOIN Class USING(class_id) WHERE type='Yoga'"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT name FROM Member m WHERE NOT EXISTS\n  (SELECT class_id FROM Class c WHERE c.class_id NOT IN\n   (SELECT a.class_id FROM Attendance a\n    WHERE a.member_id = m.member_id))"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT name FROM Member WHERE member_id IN\n  (SELECT member_id FROM Attendance JOIN Class USING(class_id)\n   WHERE type='Yoga')"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "חילוק ב-SQL: \"לא קיים שיעור Yoga שהמנוי לא השתתף בו\". ‏{opt:c} בודקת את **כל** השיעורים (בלי סינון ל-Yoga). ‏{opt:b} ו-{opt:d} מחזירות מי שהשתתף בשיעור Yoga **אחד לפחות**.",
   "confidence": "high",
   "id": "26B-A-Q10",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26B-A-sql",
   "question": "מהו השיעור **היקר** ביותר (בעל המחיר הגבוה ביותר)? בחרו את התשובה הנכונה ביותר.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT title FROM Class WHERE price >= ALL (SELECT price FROM Class)"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT title FROM Class WHERE price = MAX(price)"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT title FROM Class WHERE price > ALL (SELECT price FROM Class)"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT MAX(title) FROM Class"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "‏`>= ALL` מחזיר את השיעור שמחירו גדול או שווה לכל המחירים, כלומר המקסימום. ‏`> ALL` לא מחזיר כלום, כי מחיר לא גדול ממש מעצמו. ב-{opt:b} פונקציית צבירה ב-`WHERE` אסורה. ‏{opt:d} מחזירה את הכותרת המקסימלית לפי סדר אלפביתי.",
   "confidence": "high",
   "id": "26B-A-Q11",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26B-A-sql",
   "question": "לכל סוג שיעור מחושב המחיר המקסימלי של שיעור מאותו סוג. החזירו את הממוצע של ערכים מקסימליים אלו (כלומר ממוצע המקסימומים על פני כל הסוגים).",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(maxp) FROM\n  (SELECT type, MAX(price) AS maxp FROM Class GROUP BY type) AS T"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(MAX(price)) FROM Class GROUP BY type"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(maxp) FROM\n  (SELECT type, MAX(price) AS maxp FROM Class GROUP BY type)"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT type, AVG(MAX(price)) FROM Class GROUP BY type"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "מחשבים קודם את המקסימום לכל סוג בתת-שאילתא ב-`FROM`, ואז ממוצע עליה. טבלה נגזרת ב-`FROM` חייבת כינוי (`AS T`), ולכן {opt:c} שגויה. ב-{opt:b} וב-{opt:d} יש צבירה מקוננת `AVG(MAX(...))`, שאסורה.",
   "confidence": "high",
   "id": "26B-A-Q12",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26B-A-sql",
   "question": "כתבו שאילתא המחזירה לכל מנוי את שמו (`name`) ואת כותרות השיעורים (`title`) שבהם השתתף ושילם **מעל 100 ₪**. עיינו בהצעות וקבעו מה מהבאים נכון.",
   "code": "(A) SELECT member_id, class_id FROM Attendance WHERE fee_paid > 100\n(B) SELECT name, title FROM Attendance JOIN Member USING(member_id)\n    JOIN Class USING(class_id) WHERE fee_paid > 100\n(C) SELECT name, title FROM Attendance JOIN Member USING(member_id)\n    WHERE fee_paid > 100",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "רק השאילתא B נכונה"
    },
    {
     "id": "b",
     "type": "text",
     "value": "רק השאילתא A נכונה"
    },
    {
     "id": "c",
     "type": "text",
     "value": "רק השאילתא C נכונה"
    },
    {
     "id": "d",
     "type": "text",
     "value": "השאילתות A ו-B נכונות"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "‏A מחזירה מזהים (`member_id`, `class_id`) ולא שם וכותרת. ‏C לא מצרפת את `Class`, ולכן `title` לא קיים בה. רק B מצרפת את שלוש הטבלאות ומחזירה `name` ו-`title`.",
   "confidence": "high",
   "id": "26B-A-Q5",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26B-A-sql",
   "question": "מיהם השיעורים שכותרתם מכילה את המילה `Power` ומחירם גבוה מ-50 ₪? השלימו את החסר במקום `X`.",
   "code": "SELECT title FROM Class WHERE title ____X____ AND price > 50",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "LIKE '%Power%'"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "= '%Power%'"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "LIKE 'Power'"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "LIKE '_Power_'"
    },
    {
     "id": "e",
     "type": "code",
     "lang": "sql",
     "value": "= 'Power%'"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "‏\"מכילה\" = כל רצף תווים לפני ואחרי, כלומר `LIKE '%Power%'`. עם `=` התווים `%` הם תווים רגילים ולא תווים כלליים; `LIKE 'Power'` תופס רק את המילה בדיוק; ו-`_` מחליף תו אחד בדיוק.",
   "confidence": "high",
   "id": "26B-A-Q6",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26B-A-sql",
   "question": "מיהם המנויים **שמעולם לא** השתתפו בשיעור מסוג `'Spin'`? בחרו את השאילתא הנכונה.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT name FROM Member WHERE member_id NOT IN\n  (SELECT member_id FROM Attendance JOIN Class USING(class_id)\n   WHERE type='Spin')"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT name FROM Member JOIN Attendance USING (member_id)\n JOIN Class USING (class_id) WHERE type <> 'Spin'"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT name FROM Member WHERE member_id NOT IN\n(SELECT member_id FROM Class WHERE type='Spin')"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT name FROM Member WHERE type <> 'Spin'"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "\"מעולם לא\" = כל המנויים פחות אלה שכן השתתפו ב-Spin, ולכן `NOT IN` על תת-שאילתא שמוצאת את משתתפי ה-Spin. ‏{opt:b} מחזירה מי שהשתתף בשיעור כלשהו שאינו Spin (גם אם השתתף ב-Spin). ב-{opt:c} וב-{opt:d} אין עמודה `member_id`/`type` בטבלה שבה משתמשים.",
   "confidence": "high",
   "id": "26B-A-Q7",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26B-A-sql",
   "question": "מיהם המנויים שהשתתפו בשיעורים מיותר מסוג אחד (כלומר ממספר סוגים שונים)?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT member_id FROM Attendance JOIN Class USING (class_id)\n GROUP BY member_id HAVING COUNT (DISTINCT type) > 1"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT member_id FROM Attendance JOIN Class USING (class_id)\n GROUP BY member_id HAVING COUNT(type) > 1"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT member_id FROM Attendance JOIN Class USING(class_id)\n WHERE COUNT(DISTINCT type) > 1"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT member_id, COUNT(type) FROM Class\n GROUP BY member_id HAVING COUNT(type) > 1"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "צריך לספור סוגים **שונים** לכל מנוי, ולכן `COUNT(DISTINCT type)` ב-`HAVING`. ‏{opt:b} סופרת השתתפויות (שני שיעורי Yoga ייספרו כ-2). ב-{opt:c} פונקציית צבירה ב-`WHERE` אסורה. ב-{opt:d} אין `member_id` בטבלת `Class`.",
   "confidence": "high",
   "id": "26B-A-Q8",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26B-A-sql",
   "question": "מהו ממוצע המחיר ששולם (`fee_paid`) עבור ההשתתפויות בשיעורים מסוג `'Yoga'`?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG (fee_paid) FROM Attendance JOIN Class USING (class_id)\nWHERE type='Yoga'"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG (fee_paid) FROM Attendance, Class WHERE type='Yoga'"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG (fee_paid) FROM Attendance WHERE type='Yoga'"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(fee_paid) FROM Class WHERE type='Yoga'"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "form-0",
   "explanation": "‏`fee_paid` נמצא ב-Attendance ו-`type` נמצא ב-Class, לכן צריך לצרף לפי `class_id`. ‏{opt:b} היא מכפלה קרטזית בלי תנאי צירוף. ב-{opt:c} אין `type`, וב-{opt:d} אין `fee_paid`.",
   "confidence": "high",
   "id": "26B-A-Q9",
   "examCode": "26B-A",
   "examLabel": "2026 סמסטר ב׳ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": true
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26S-A-sql",
   "question": "מהם מספרי הטיסות שמחירן הוא המחיר המקסימלי בטבלת Flight? אם קיימות כמה טיסות במחיר המקסימלי, יש להחזיר את כולן.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT flight_number\nFROM Flight\nWHERE price = (SELECT MAX(price) FROM Flight);"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT flight_number\nFROM Flight\nWHERE price = (SELECT MIN(price) FROM Flight);"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT flight_number\nFROM Flight\nWHERE price = MAX(price);"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT flight_number\nFROM Flight\nWHERE price > ALL (SELECT price FROM Flight);"
    },
    {
     "id": "e",
     "type": "code",
     "lang": "sql",
     "value": "SELECT MAX(flight_number)\nFROM Flight;"
    }
   ],
   "correctId": "a",
   "answerSource": "self-solved",
   "explanation": "תת-שאילתא סקלרית מחזירה את המחיר המקסימלי, ו-`=` מחזיר את **כל** הטיסות במחיר הזה (כולל שוויון). {opt:c}: צבירה ב-`WHERE` אסורה. {opt:d}: `> ALL` לא מחזיר כלום, כי מחיר לא גדול ממש מעצמו (היה צריך `>= ALL`). {opt:e} מחזירה את מספר הטיסה הגבוה ביותר, לא את היקרה.",
   "confidence": "high",
   "id": "26S-A-Q10",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26S-A-sql",
   "question": "לכל נוסע, החזירו את מזהה הנוסע ואת מספר ההזמנות שביצע. נוסע שלא ביצע אף הזמנה צריך להופיע בתוצאה עם הערך 0.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.passenger_id, COUNT(b.flight_number)\nFROM Passenger p\nJOIN Booking b ON p.passenger_id = b.passenger_id\nGROUP BY p.passenger_id;"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.passenger_id, COUNT(b.flight_number)\nFROM Passenger p\nLEFT JOIN Booking b ON p.passenger_id = b.passenger_id\nWHERE b.flight_number IS NULL\nGROUP BY p.passenger_id;"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT b.passenger_id, COUNT(b.flight_number)\nFROM Passenger p\nLEFT JOIN Booking b ON p.passenger_id = b.passenger_id\nGROUP BY b.passenger_id;"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.passenger_id, COUNT(b.flight_number)\nFROM Passenger p\nLEFT JOIN Booking b ON p.passenger_id = b.passenger_id\nGROUP BY p.passenger_id;"
    },
    {
     "id": "e",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.passenger_id, COUNT(*)\nFROM Passenger p\nLEFT JOIN Booking b ON p.passenger_id = b.passenger_id\nGROUP BY p.passenger_id;"
    }
   ],
   "correctId": "d",
   "answerSource": "self-solved",
   "explanation": "‏`LEFT JOIN` שומר נוסעים בלי הזמנות (עם NULL בעמודות של Booking), ו-`COUNT(b.flight_number)` לא סופר NULL, כך שהם מקבלים 0. {opt:a} (‏JOIN רגיל) מעיפה אותם. {opt:b} משאירה **רק** אותם. {opt:c} מקבצת לפי `b.passenger_id`, שהוא NULL אצלם, ומחזירה NULL במקום המזהה. {opt:e}: ‏`COUNT(*)` סופר את שורת ה-NULL ונותן 1 במקום 0.",
   "confidence": "high",
   "id": "26S-A-Q11",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26S-A-sql",
   "question": "מיהם הנוסעים, לפי מזהה, שהזמינו את **כל** הטיסות ליעד `'London'`?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.passenger_id\nFROM Passenger p\nWHERE NOT EXISTS (\n  SELECT f.flight_number FROM Flight f\n  WHERE f.destination = 'London'\n    AND f.flight_number NOT IN (\n      SELECT b.flight_number FROM Booking b\n      WHERE b.passenger_id = p.passenger_id));"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT passenger_id\nFROM Passenger\nWHERE EXISTS (SELECT 1 FROM Flight\n              WHERE destination = 'London');"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT passenger_id\nFROM Booking JOIN Flight USING(flight_number)\nWHERE destination = 'London'\nGROUP BY passenger_id HAVING COUNT(*) > 1;"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.passenger_id\nFROM Passenger p\nWHERE NOT EXISTS (\n  SELECT f.flight_number FROM Flight f\n  WHERE f.flight_number NOT IN (\n    SELECT b.flight_number FROM Booking b\n    WHERE b.passenger_id = p.passenger_id));"
    },
    {
     "id": "e",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT passenger_id\nFROM Booking JOIN Flight USING(flight_number)\nWHERE destination = 'London';"
    }
   ],
   "correctId": "a",
   "answerSource": "self-solved",
   "explanation": "חילוק ב-SQL: 'לא קיימת טיסה ללונדון שהנוסע **לא** הזמין'. {opt:d} שוכחת את הסינון ללונדון, ולכן דורשת את **כל** הטיסות. {opt:b} לא תלויה בנוסע. {opt:c} סופרת 'יותר מטיסה אחת ללונדון' ולא 'את כולן'. {opt:e} מחזירה מי שהזמין לפחות טיסה אחת ללונדון.",
   "confidence": "high",
   "id": "26S-A-Q12",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26S-A-sql",
   "question": "מיהם הנוסעים, לפי מזהה, שהזמינו טיסות ליותר מיעד אחד, כלומר למספר יעדים שונים?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT passenger_id\nFROM Flight\nGROUP BY passenger_id\nHAVING COUNT(destination) > 1;"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT passenger_id\nFROM Booking JOIN Flight USING(flight_number)\nGROUP BY passenger_id\nHAVING COUNT(DISTINCT destination) > 1;"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT passenger_id\nFROM Booking JOIN Flight USING(flight_number)\nWHERE COUNT(DISTINCT destination) > 1;"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT passenger_id\nFROM Booking JOIN Flight USING(flight_number)\nGROUP BY passenger_id\nHAVING COUNT(destination) > 1;"
    },
    {
     "id": "e",
     "type": "code",
     "lang": "sql",
     "value": "SELECT passenger_id\nFROM Booking JOIN Flight USING(flight_number)\nGROUP BY passenger_id\nHAVING COUNT(DISTINCT flight_number) > 1;"
    }
   ],
   "correctId": "b",
   "answerSource": "self-solved",
   "explanation": "סופרים יעדים **שונים** לכל נוסע: `COUNT(DISTINCT destination)` ב-`HAVING`. {opt:d} ו-{opt:e} סופרות טיסות, כך ששתי טיסות לרומא ייספרו כ-2. ב-{opt:c} צבירה ב-`WHERE` אסורה. ב-{opt:a} אין `passenger_id` בטבלת Flight.",
   "confidence": "high",
   "id": "26S-A-Q13",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26S-A-sql",
   "question": "אילו יעדים שונים ששמם מכיל את המילה `'York'` מופיעים בטיסות שמחירן גבוה מ-500?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT destination\nFROM Flight\nWHERE destination = '%York%' AND price > 500;"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT destination\nFROM Flight\nWHERE destination LIKE '%York%' OR price > 500;"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT destination\nFROM Flight\nWHERE destination LIKE '%York%' AND price > 500;"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT destination\nFROM Flight\nWHERE destination LIKE 'York' AND price > 500;"
    },
    {
     "id": "e",
     "type": "code",
     "lang": "sql",
     "value": "SELECT destination\nFROM Flight\nWHERE destination LIKE '%York%' AND price > 500;"
    }
   ],
   "correctId": "c",
   "answerSource": "self-solved",
   "explanation": "'מכיל' = `LIKE '%York%'`; 'שונים' = `DISTINCT`; ושני התנאים יחד = `AND`. עם `=` התו `%` הוא תו רגיל; `LIKE 'York'` תופס רק 'York' בדיוק (לא 'New York'); `OR` מחזיר כל טיסה יקרה; ובלי `DISTINCT` ({opt:e}) יעד יחזור פעם לכל טיסה.",
   "confidence": "high",
   "id": "26S-A-Q6",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26S-A-sql",
   "question": "לכל הזמנה שבה מחיר הטיסה גבוה מ-1000, החזירו את שם הנוסע ואת יעד הטיסה.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.full_name, f.destination\nFROM Passenger p\nJOIN Flight f ON p.passenger_id = f.flight_number\nWHERE f.price > 1000;"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.full_name, f.destination\nFROM Booking b\nJOIN Passenger p ON b.passenger_id = p.passenger_id\nJOIN Flight f ON b.flight_number = f.flight_number\nWHERE f.price > 1000;"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.full_name, f.destination\nFROM Booking b\nJOIN Passenger p ON b.passenger_id = p.passenger_id\nWHERE b.price > 1000;"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT b.passenger_id, f.destination\nFROM Booking b\nJOIN Flight f ON b.flight_number = f.flight_number\nWHERE f.price > 1000;"
    },
    {
     "id": "e",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.full_name, f.destination\nFROM Passenger p, Flight f\nWHERE f.price > 1000;"
    }
   ],
   "correctId": "b",
   "answerSource": "self-solved",
   "explanation": "השם נמצא ב-Passenger, היעד והמחיר ב-Flight, והחיבור ביניהם עובר דרך Booking. לכן צריך לצרף את שלוש הטבלאות. {opt:a} משווה מזהה נוסע למספר טיסה (אין לזה משמעות); ב-{opt:c} אין `f` ואין `price` ב-Booking; {opt:d} מחזירה מזהה במקום שם; ו-{opt:e} היא מכפלה קרטזית: כל נוסע עם כל טיסה יקרה.",
   "confidence": "high",
   "id": "26S-A-Q7",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26S-A-sql",
   "question": "מיהם הנוסעים **שמעולם לא** הזמינו טיסה ליעד `'Paris'`?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.full_name\nFROM Passenger p\nJOIN Booking b ON p.passenger_id = b.passenger_id\nJOIN Flight f ON b.flight_number = f.flight_number\nWHERE f.destination <> 'Paris';"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.full_name\nFROM Passenger p\nWHERE NOT EXISTS (\n  SELECT 1\n  FROM Booking b JOIN Flight f\n    ON b.flight_number = f.flight_number\n  WHERE b.passenger_id = p.passenger_id\n    AND f.destination = 'Paris');"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.full_name\nFROM Passenger p\nWHERE p.passenger_id NOT IN (\n  SELECT passenger_id FROM Flight\n  WHERE destination = 'Paris');"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.full_name\nFROM Passenger p\nWHERE NOT EXISTS (\n  SELECT 1 FROM Flight f\n  WHERE f.destination = 'Paris');"
    },
    {
     "id": "e",
     "type": "code",
     "lang": "sql",
     "value": "SELECT p.full_name\nFROM Passenger p\nJOIN Booking b ON p.passenger_id = b.passenger_id\nWHERE b.flight_number NOT IN (\n  SELECT flight_number FROM Flight\n  WHERE destination <> 'Paris');"
    }
   ],
   "correctId": "b",
   "answerSource": "self-solved",
   "explanation": "'מעולם לא' = לא קיימת הזמנה **של הנוסע הזה** לפריז, כלומר `NOT EXISTS` מתואם (`b.passenger_id = p.passenger_id`). {opt:a} מחזירה מי שהזמין טיסה כלשהי שאינה לפריז (גם אם הזמין גם לפריז). ב-{opt:c} אין `passenger_id` בטבלת Flight. {opt:d} לא מתואמת: אם קיימת טיסה לפריז היא לא מחזירה אף אחד. {opt:e} הפוכה: `flight_number NOT IN (טיסות שאינן לפריז)` = הזמנות **לפריז**, והיא גם מפספסת נוסעים בלי הזמנות.",
   "confidence": "high",
   "id": "26S-A-Q8",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26S-A-sql",
   "question": "לכל יעד מחשבים תחילה את המחיר המקסימלי של טיסה אליו. החזירו את הממוצע של ערכים מקסימליים אלה על פני כל היעדים.",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(mx)\nFROM (\n  SELECT destination, MIN(price) AS mx\n  FROM Flight\n  GROUP BY destination\n) AS T;"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT destination, MAX(price)\nFROM Flight\nGROUP BY destination;"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(price)\nFROM Flight;"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(MAX(price))\nFROM Flight\nGROUP BY destination;"
    },
    {
     "id": "e",
     "type": "code",
     "lang": "sql",
     "value": "SELECT AVG(mx)\nFROM (\n  SELECT destination, MAX(price) AS mx\n  FROM Flight\n  GROUP BY destination\n) AS T;"
    }
   ],
   "correctId": "e",
   "answerSource": "self-solved",
   "explanation": "קודם תת-שאילתא ב-`FROM` שמחשבת `MAX` לכל יעד, ואז `AVG` עליה. {opt:a} משתמשת ב-`MIN`; {opt:b} עוצרת אחרי שלב המקסימום; {opt:c} מחשבת ממוצע של כל הטיסות; ו-{opt:d} היא צבירה מקוננת `AVG(MAX(...))`, שאסורה ב-MySQL.",
   "confidence": "high",
   "id": "26S-A-Q9",
   "examCode": "26S-A",
   "examLabel": "2026 סמסטר קיץ מועד א׳",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26Z-CL-sql",
   "question": "מי הטייסים ששובצו ל**כל** הטיסות שיוצאות מ-`'TLV'`? עיינו בשלוש ההצעות וקבעו מה נכון.",
   "code": "(A) SELECT name FROM Pilots P WHERE NOT EXISTS\n      (SELECT * FROM Flights F WHERE F.origin = 'TLV' AND NOT EXISTS\n         (SELECT * FROM Assignments A\n          WHERE A.flight_id = F.flight_id AND A.pilot_id = P.pilot_id))\n\n(B) SELECT name FROM Pilots P WHERE NOT EXISTS\n      (SELECT * FROM Flights F WHERE F.origin = 'TLV' AND NOT EXISTS\n         (SELECT * FROM Assignments A WHERE A.flight_id = F.flight_id))\n\n(C) SELECT name FROM Pilots P WHERE NOT EXISTS\n      (SELECT flight_id FROM Flights WHERE origin = 'TLV'\n       EXCEPT\n       SELECT flight_id FROM Assignments A WHERE A.pilot_id = P.pilot_id)",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "רק השאילתה A נכונה"
    },
    {
     "id": "b",
     "type": "text",
     "value": "רק השאילתה C נכונה"
    },
    {
     "id": "c",
     "type": "text",
     "value": "השאילתות A ו-C נכונות, ו-B שגויה"
    },
    {
     "id": "d",
     "type": "text",
     "value": "כל שלוש השאילתות נכונות"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "c",
   "answerSource": "claude-practice",
   "explanation": "‏A היא החילוק הקלאסי: \"לא קיימת טיסה מ-TLV שאין שיבוץ **של הטייס הזה** אליה\". ‏C עושה את אותו הדבר בעזרת הפרש: (כל הטיסות מ-TLV) EXCEPT (הטיסות של הטייס). אם לא נשאר כלום, הטייס שובץ לכולן. ב-B תת-השאילתה הפנימית **לא מקושרת לטייס** (אין `A.pilot_id = P.pilot_id`). היא בודקת רק שלכל טיסה יש טייס כלשהו, ולכן מחזירה את כל הטייסים או אף אחד.",
   "confidence": "high",
   "id": "26Z-CL-Q10",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26Z-CL-sql",
   "question": "איזו שאילתה מחזירה את המזהים של הנוסעים שטסו (הזמינו טיסות) עם לפחות **3 טייסים שונים**?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT B.passenger_id\nFROM Bookings B JOIN Assignments A ON B.flight_id = A.flight_id\nGROUP BY B.passenger_id\nHAVING COUNT(*) >= 3"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT B.passenger_id\nFROM Bookings B JOIN Assignments A ON B.flight_id = A.flight_id\nGROUP BY B.passenger_id\nHAVING COUNT(DISTINCT B.flight_id) >= 3"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT B.passenger_id\nFROM Bookings B JOIN Assignments A ON B.flight_id = A.flight_id\nGROUP BY B.passenger_id\nHAVING COUNT(DISTINCT A.pilot_id) >= 3"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT B.passenger_id\nFROM Bookings B JOIN Assignments A ON B.flight_id = A.flight_id\nWHERE COUNT(DISTINCT A.pilot_id) >= 3\nGROUP BY B.passenger_id"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "c",
   "answerSource": "claude-practice",
   "explanation": "אחרי הצירוף יש שורה לכל (הזמנה, טייס בטיסה). סופרים **טייסים שונים**, ולכן `COUNT(DISTINCT A.pilot_id)`. ‏`COUNT(*)` סופר שורות: אותו טייס בשתי טיסות ייספר פעמיים, וגם נוסע עם 2 טיסות של 2 טייסים כל אחת יגיע ל-4. ספירת טיסות שונות בודקת שלוש טיסות, אבל כולן יכולות להיות עם אותו טייס. צבירה ב-WHERE אסורה.",
   "confidence": "high",
   "id": "26Z-CL-Q11",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26Z-CL-sql",
   "question": "איזו שאילתה מחזירה את **המחיר השני בגובהו** בטבלה `Flights`, כלומר את המחיר הגבוה ביותר שקטן מהמחיר המקסימלי?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT MAX(price) FROM Flights\nWHERE price <> MAX(price)"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT MAX(price) FROM Flights\nWHERE price < ALL (SELECT price FROM Flights)"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT MAX(price) FROM Flights\nWHERE price NOT IN (SELECT MAX(price) FROM Flights\n                    GROUP BY destination)"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT MAX(price) FROM Flights\nWHERE price < (SELECT MAX(price) FROM Flights)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "d",
   "answerSource": "claude-practice",
   "explanation": "מסירים את המקסימום בעזרת תת-שאילתה סקלרית (`price < (SELECT MAX…)`), ואז לוקחים את המקסימום של מה שנשאר. ‏`MAX` ב-WHERE אסור. ‏`< ALL` דורש מחיר שקטן מכל המחירים, כולל מעצמו, ולכן אין כזה ומתקבל NULL. ‏`NOT IN` של המקסימום **לכל יעד** מוריד מחירים רבים מדי (כל מקסימום של כל יעד), ולכן מתקבל מחיר נמוך מהנדרש.",
   "confidence": "high",
   "id": "26Z-CL-Q12",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26Z-CL-sql",
   "question": "איזו שאילתה מחזירה את שמות הנוסעים שהזמינו לפחות טיסה אחת ליעד `'Rome'`, ו**מעולם לא** הזמינו מקום במחלקת `'Business'` (באף טיסה)?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT P.name\nFROM Passengers P JOIN Bookings B ON P.passenger_id = B.passenger_id\n  JOIN Flights F ON B.flight_id = F.flight_id\nWHERE F.destination = 'Rome' AND B.seat_class <> 'Business'"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT P.name\nFROM Passengers P JOIN Bookings B ON P.passenger_id = B.passenger_id\n  JOIN Flights F ON B.flight_id = F.flight_id\nWHERE F.destination = 'Rome'\n  AND P.passenger_id NOT IN (SELECT passenger_id FROM Bookings\n                             WHERE seat_class = 'Business')"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT P.name\nFROM Passengers P JOIN Bookings B ON P.passenger_id = B.passenger_id\n  JOIN Flights F ON B.flight_id = F.flight_id\nWHERE F.destination = 'Rome'\n  AND P.passenger_id NOT IN (SELECT B2.passenger_id\n      FROM Bookings B2 JOIN Flights F2 ON B2.flight_id = F2.flight_id\n      WHERE F2.destination = 'Rome' AND B2.seat_class = 'Business')"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT DISTINCT P.name\nFROM Passengers P JOIN Bookings B ON P.passenger_id = B.passenger_id\n  JOIN Flights F ON B.flight_id = F.flight_id\nWHERE F.destination = 'Rome'\n  AND B.passenger_id NOT IN (SELECT flight_id FROM Bookings\n                             WHERE seat_class = 'Business')"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "b",
   "answerSource": "claude-practice",
   "explanation": "\"מעולם לא\" זו שלילה על **כל** ההזמנות של הנוסע, ולכן `NOT IN` על תת-שאילתה שמוצאת את כל מי שהזמין Business אי-פעם. התנאי `seat_class <> 'Business'` בודק רק את השורה הנוכחית: נוסע שטס לרומא באקונומי ובמקום אחר בביזנס עדיין נכנס. תת-שאילתה שמסוננת ל-Rome פוסלת רק ביזנס **לרומא**, ולא ביזנס בטיסה אחרת. ההשוואה של `passenger_id` מול `flight_id` משווה עמודות שאינן מאותו תחום.",
   "confidence": "high",
   "id": "26Z-CL-Q5",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26Z-CL-sql",
   "question": "מה מחזירה השאילתה הבאה? בחרו את התשובה הנכונה ביותר.",
   "code": "SELECT P.name\nFROM Passengers P JOIN Bookings B ON P.passenger_id = B.passenger_id\n  JOIN Flights F ON B.flight_id = F.flight_id\nWHERE F.destination = 'Rome'\nGROUP BY P.passenger_id, P.name\nHAVING COUNT(*) = (SELECT COUNT(*) FROM Flights\n                   WHERE destination = 'Rome')",
   "options": [
    {
     "id": "a",
     "type": "text",
     "value": "את שמות הנוסעים שהזמינו לפחות טיסה אחת לרומא"
    },
    {
     "id": "b",
     "type": "text",
     "value": "את שמות הנוסעים שכל ההזמנות שלהם הן לרומא"
    },
    {
     "id": "c",
     "type": "text",
     "value": "את שמות הנוסעים שהזמינו את **כל** הטיסות שהיעד שלהן רומא"
    },
    {
     "id": "d",
     "type": "text",
     "value": "את שמות הנוסעים שמספר ההזמנות הכולל שלהם שווה למספר הטיסות לרומא"
    },
    {
     "id": "e",
     "type": "text",
     "value": "השאילתה אינה תקינה, כי `P.name` מופיע ב-SELECT"
    }
   ],
   "correctId": "c",
   "answerSource": "claude-practice",
   "explanation": "זה **חילוק בעזרת ספירה**. ה-WHERE משאיר רק הזמנות לרומא, ה-GROUP BY סופר לכל נוסע כמה טיסות לרומא הזמין, וה-HAVING דורש שהמספר יהיה שווה למספר כל הטיסות לרומא. מכיוון שנוסע מזמין טיסה פעם אחת לכל היותר (המפתח של Bookings), ספירה שווה = הזמין את כולן. הספירה נעשית **אחרי** הסינון לרומא, ולכן היא לא סופרת את סך ההזמנות. נוסע שכל הזמנותיו לרומא אבל לא הזמין את כל הטיסות לרומא לא יוחזר. ‏`P.name` מופיע ב-GROUP BY, ולכן מותר לבחור אותו.",
   "confidence": "high",
   "id": "26Z-CL-Q6",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26Z-CL-sql",
   "question": "איזו שאילתה מחזירה, **לכל יעד**, את הטיסה (או הטיסות) היקרה ביותר לאותו יעד?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT flight_id, destination, price FROM Flights\nWHERE price IN (SELECT MAX(price) FROM Flights GROUP BY destination)"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT flight_id, destination, price FROM Flights F1\nWHERE price = (SELECT MAX(price) FROM Flights F2\n               WHERE F2.destination = F1.destination)"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT flight_id, destination, MAX(price) FROM Flights\nGROUP BY destination"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT flight_id, destination, price FROM Flights\nWHERE price >= ALL (SELECT price FROM Flights)"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "b",
   "answerSource": "claude-practice",
   "explanation": "צריך להשוות כל טיסה **למקסימום של היעד שלה**, ולכן תת-שאילתה **מתואמת** (`F2.destination = F1.destination`). ‏`IN` על רשימת המקסימומים של כל היעדים מחזיר גם טיסה שמחירה שווה למקסימום של יעד **אחר**. דוגמה: טיסה לרומא ב-450, כשהמקסימום לרומא 520 אבל המקסימום ל-TLV הוא 450. ‏GROUP BY destination עם `flight_id` ב-SELECT אינה תקינה, כי `flight_id` אינו בקבוצה ואינו בצבירה. ‏`>= ALL` מול כל הטבלה מחזיר רק את הטיסה היקרה ביותר בכלל, ולא אחת לכל יעד.",
   "confidence": "high",
   "id": "26Z-CL-Q7",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26Z-CL-sql",
   "question": "איזו שאילתה מחזירה **לכל טייס**, כולל טייסים שלא שובצו לאף טיסה, את שמו ואת מספר הטיסות שאליהן שובץ?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "SELECT P.name, COUNT(*)\nFROM Pilots P LEFT JOIN Assignments A ON P.pilot_id = A.pilot_id\nGROUP BY P.pilot_id, P.name"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "SELECT P.name, COUNT(A.flight_id)\nFROM Pilots P JOIN Assignments A ON P.pilot_id = A.pilot_id\nGROUP BY P.pilot_id, P.name"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "SELECT P.name, COUNT(A.flight_id)\nFROM Assignments A LEFT JOIN Pilots P ON P.pilot_id = A.pilot_id\nGROUP BY P.pilot_id, P.name"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "SELECT P.name, COUNT(A.flight_id)\nFROM Pilots P LEFT JOIN Assignments A ON P.pilot_id = A.pilot_id\nGROUP BY P.pilot_id, P.name"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "d",
   "answerSource": "claude-practice",
   "explanation": "כדי שטייס בלי שיבוצים יופיע צריך `LEFT JOIN` **מ-Pilots**. אז הוא מקבל שורה אחת שבה עמודות Assignments הן NULL. ‏`COUNT(A.flight_id)` לא סופר NULL, ולכן הוא נותן 0. ‏`COUNT(*)` סופר את השורה עצמה ונותן 1, וזו טעות. ‏JOIN רגיל מעלים את הטייסים בלי שיבוצים. ‏LEFT JOIN בכיוון ההפוך (מ-Assignments) שומר את כל השיבוצים ולא את כל הטייסים, ולכן גם הוא מעלים אותם.",
   "confidence": "high",
   "id": "26Z-CL-Q8",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  },
  {
   "part": "ב",
   "topic": "sql",
   "contextId": "26Z-CL-sql",
   "question": "איזו פקודה יוצרת VIEW שמציג לכל נוסע את המזהה שלו ואת הסכום הכולל ששילם, **רק** עבור נוסעים שהסכום הכולל שלהם גבוה מ-2000?",
   "options": [
    {
     "id": "a",
     "type": "code",
     "lang": "sql",
     "value": "CREATE VIEW BigSpenders AS\nSELECT passenger_id, SUM(paid) AS total\nFROM Bookings\nGROUP BY passenger_id\nHAVING SUM(paid) > 2000"
    },
    {
     "id": "b",
     "type": "code",
     "lang": "sql",
     "value": "CREATE VIEW BigSpenders AS\nSELECT passenger_id, SUM(paid) AS total\nFROM Bookings\nWHERE paid > 2000\nGROUP BY passenger_id"
    },
    {
     "id": "c",
     "type": "code",
     "lang": "sql",
     "value": "CREATE VIEW BigSpenders AS\nSELECT passenger_id, SUM(paid) AS total\nFROM Bookings\nWHERE SUM(paid) > 2000\nGROUP BY passenger_id"
    },
    {
     "id": "d",
     "type": "code",
     "lang": "sql",
     "value": "CREATE VIEW BigSpenders AS\nSELECT passenger_id, SUM(paid) AS total\nFROM Bookings\nHAVING SUM(paid) > 2000\nGROUP BY passenger_id"
    },
    {
     "id": "e",
     "type": "text",
     "value": "אף תשובה אינה נכונה"
    }
   ],
   "correctId": "a",
   "answerSource": "claude-practice",
   "explanation": "תנאי על **סכום הקבוצה** שייך ל-`HAVING`, שבא **אחרי** `GROUP BY`. ‏`WHERE paid > 2000` מסנן הזמנות בודדות לפני הקיבוץ: נוסע ששילם 1800 + 450 לא ייכנס, ונוסע שיישאר יקבל סכום חלקי. פונקציית צבירה ב-WHERE אסורה. ‏HAVING לפני GROUP BY היא שגיאת תחביר (הסדר הוא WHERE ← GROUP BY ← HAVING).",
   "confidence": "high",
   "id": "26Z-CL-Q9",
   "examCode": "26Z-CL",
   "examLabel": "המבחן הקשה של קלוד 2026",
   "year": 2026,
   "source": "exam",
   "topicLabel": "SQL",
   "official": false
  }
 ]
};
