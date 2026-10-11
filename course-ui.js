"use strict";
/* Guided courses — "צריך עזרה ב-ERD?" and "צריך עזרה ב-SQL?": level map → lesson card →
   level quiz → summary. Levels come from erd/levels/*.js and sql/levels/*.js via courses.js
   (window.COURSES[id].levels). The quiz runs on the main engine in app.js (S, renderQuestion,
   choose, next) with S.mode = "course"; app.js calls back into window.COURSE.record /
   finishLevel / exit. Each course keeps its progress in its own key, apart from the bank stats.

   level = {id, order, icon, title, goal, boss?, lesson:{html, figs:[{erd?|tables?, caption}]}, questions:[…]}
   lesson html may hold {fig:N} placeholders → figure N of lesson.figs.                        */
(function(){
  const META = {
    erd: { name: "ERD", icon: "🧩", store: "dbq_erd_v1", topic: "erd", topicLabel: "מודל ERD",
      intro: "מתחילים מתרשים של שתי ישויות ומסיימים בתרשים בגודל של מבחן. כל שלב פותח בשיעור קצר וממשיך בשאלות בסגנון המבחן. כל השלבים פתוחים; שלב נחשב עבור מ-80%." },
    sql: { name: "SQL", icon: "💾", store: "dbq_sql_v1", topic: "sql", topicLabel: "SQL",
      intro: "מתחילים מ-SELECT על טבלה אחת ומסיימים בשאילתות חילוק, קיצון ושלילה בגודל של מבחן. כל שלב פותח בשיעור קצר עם טבלאות לדוגמה וממשיך בשאלות בסגנון המבחן. כל השלבים פתוחים; שלב נחשב עבור מ-80%." },
  };
  const PASS = 80;
  const ALL = window.COURSES || {};
  const screen = document.getElementById("screen-course");
  if (!screen) return;
  const has = id => ALL[id] && ALL[id].levels && ALL[id].levels.length;
  Object.keys(META).forEach(id => { if (!has(id)) document.querySelectorAll(`[data-course="${id}"]`).forEach(el => el.style.display = "none"); });

  let C = null;            // the open course: {id, meta, levels, prog}
  let cur = null, run = null;   // the level being played, and its answers {qid: ok}
  const prog = {};
  function load(id){ try { return JSON.parse(localStorage.getItem(META[id].store)) || { levels:{} }; } catch(e){ return { levels:{} }; } }
  function save(){ try { localStorage.setItem(C.meta.store, JSON.stringify(C.prog)); } catch(e){} }
  function course(id){ prog[id] = prog[id] || load(id); return { id, meta: META[id], levels: ALL[id].levels, prog: prog[id] }; }

  const views = ["crsMapView", "crsLessonView", "crsSumView"];
  function view(id){ show("screen-course"); views.forEach(v => document.getElementById(v).classList.toggle("hidden", v !== id)); }
  const passedIn = (c, L) => ((c.prog.levels[L.id] || {}).best || 0) >= PASS;
  const passed = L => passedIn(C, L);
  const recommendedIn = c => c.levels.find(L => !passedIn(c, L));
  const levelName = L => `שלב ${L.order} · ${L.title}`;
  const backToMode = () => { S.mode = (document.querySelector('input[name=mode]:checked') || {}).value || "practice"; };

  /* ---------- map ---------- */
  function renderMap(){
    const LV = C.levels, rec = recommendedIn(C), nPass = LV.filter(passed).length;
    $("#crsTitle").textContent = `${C.meta.icon} צריך עזרה ב-${C.meta.name}?`;
    $("#crsIntro").textContent = C.meta.intro;
    $("#crsOverall").innerHTML =
      `עברת <b>${nPass}</b> מתוך <b>${LV.length}</b> שלבים` +
      `<div class="progress" style="margin-top:.5rem"><div class="progress-fill" style="width:${nPass / LV.length * 100}%"></div></div>` +
      (nPass === LV.length ? `<p style="margin:.6rem 0 0">🏆 סיימת את כל הקורס, עכשיו אתה מאסטר ${C.meta.name}. הצעד הבא: שאלות ה-${C.meta.name} מהמבחנים.</p>` : "");
    $("#crsMap").innerHTML = LV.map(L => {
      const st = C.prog.levels[L.id];
      const cls = ["crs-lvl", passed(L) ? "passed" : "", L === rec ? "next" : "", L.boss ? "boss" : ""].join(" ");
      const status = !st ? `עוד לא התחלת · ${L.questions.length} שאלות`
        : passed(L) ? `✓ עברת · שיא ${st.best}%` : `ניסיון אחרון ${st.last}% · שיא ${st.best}% (צריך 80%)`;
      return `<button class="${cls}" data-id="${L.id}" type="button">
        <span class="num">שלב ${L.order}${L.boss ? " · מבחן גמר" : ""}</span>
        <span class="ttl">${L.icon || ""} ${escapeHtml(L.title)}</span>
        <span class="gl">${escapeHtml(L.goal || "")}</span>
        <span class="st">${status}</span></button>`;
    }).join("");
    $("#crsMap").querySelectorAll(".crs-lvl").forEach(b => b.onclick = () => openLesson(LV.find(L => L.id === b.dataset.id)));
  }
  function openMap(id){ if (id) C = course(id); cur = null; renderMap(); view("crsMapView"); }

  /* ---------- lesson ---------- */
  function figHtml(f){
    if (!f) return "";
    let body = "";
    if (f.erd) body += `<div class="erd-wrap">${renderERD(f.erd)}</div>`;
    if (f.tables || f.relations || f.code) body += contextHtml(Object.assign({ kind: "schema" }, f, { title: f.title || "", caption: undefined }));
    if (f.sql) body += `<pre class="q-code" dir="ltr"><code>${window.highlightSQL ? highlightSQL(f.sql) : escapeHtml(f.sql)}</code></pre>`;
    if (f.result) body += `<div class="lesson-result"><div class="ctx-title">⟵ התוצאה</div><div class="ctx-tables">${tableHtml(Object.assign({}, f.result, { name: "" }))}</div></div>`;
    return `<figure class="lesson-fig">${body}` + (f.caption ? `<figcaption>${richText(f.caption)}</figcaption>` : "") + `</figure>`;
  }
  function openLesson(L){
    cur = L;
    const ls = L.lesson || {}, figs = ls.figs || [], used = new Set();
    let html = String(ls.html || "").replace(/\{fig:(\d+)\}/g, (m, i) => { used.add(+i); return figHtml(figs[+i]); });
    html += figs.filter((f, i) => !used.has(i)).map(figHtml).join("");
    $("#crsLesson").innerHTML =
      `<div class="q-head"><span class="chip part">שלב ${L.order} מתוך ${C.levels.length}</span><span class="chip">${L.questions.length} שאלות</span></div>` +
      `<h2>${L.icon || ""} ${escapeHtml(L.title)}</h2><p class="sub">${escapeHtml(L.goal || "")}</p>` +
      `<div class="lesson-body">${html}</div>`;
    if (window.ERD) ERD.finish($("#crsLesson"));
    view("crsLessonView");
  }

  /* ---------- level quiz (runs on the main engine) ---------- */
  function startLevel(L){
    cur = L; run = {};
    const levelTitle = levelName(L), badge = `${C.meta.icon} קורס ${C.meta.name}`;
    S.mode = "course"; S._views = null;
    // schema-only SQL questions: their explanations quote the level's sample rows, so the
    // feedback offers those rows (the tables a question shows itself are already on screen)
    const sampleOf = q => (q.ctx && q.ctx.tables) ? null : ((q.verify && q.verify.db) || q.db || L.db || null);
    S.pool = L.questions.map(q => Object.assign(q, { topic: C.meta.topic, topicLabel: C.meta.topicLabel,
      course: { courseId: C.id, levelId: L.id, levelTitle, badge, sample: sampleOf(q) } }));
    S.pos = 0; S.hist = []; S.hpos = 0; S.streak = 0;
    $("#prevBtn").classList.remove("hidden");
    show("screen-quiz");
    renderQuestion();
  }
  function record(q, ok){ if (run && !(q.id in run)) run[q.id] = ok; }

  function finishLevel(){
    const L = cur; if (!L) return openMap();
    const total = L.questions.length;
    const correct = L.questions.filter(q => run && run[q.id]).length;
    const pct = Math.round(correct / total * 100);
    const prev = C.prog.levels[L.id] || {};
    C.prog.levels[L.id] = { best: Math.max(prev.best || 0, pct), last: pct, at: Date.now() };
    save();
    const ok = pct >= PASS, LV = C.levels, nextL = LV[LV.indexOf(L) + 1];
    const wrong = L.questions.filter(q => !(run && run[q.id]));
    backToMode();
    $("#crsSum").innerHTML =
      `<div class="q-head" style="justify-content:center"><span class="chip part">${escapeHtml(levelName(L))}</span></div>` +
      `<div class="big">${pct}%</div><div><b>${correct} / ${total}</b> תשובות נכונות</div>` +
      `<p class="msg">${ok ? (L.boss ? `🏆 עברת את מבחן הגמר. אתה מאסטר ${C.meta.name}!` : "✓ עברת את השלב! אפשר להתקדם.") :
        "עוד לא 80%. כדאי לקרוא שוב את השיעור ולנסות שוב, זה בדיוק השלב שבו זה נבנה."}</p>` +
      (wrong.length ? `<div class="ctx" style="text-align:right"><div class="ctx-title">כדאי לחזור על:</div>${
        wrong.map(q => `<div class="ctx-note">• ${richText(q.recap || q.question)}</div>`).join("")}</div>` : "") +
      `<div class="crs-actions">` +
        (nextL ? `<button class="btn ${ok ? "primary" : "ghost"}" data-act="next">לשלב הבא: ${escapeHtml(nextL.title)} ⟵</button>` : "") +
        (L.boss || !nextL ? `<button class="btn primary" data-act="real">לשאלות ה-${C.meta.name} מהמבחנים האמיתיים ⟵</button>` : "") +
        `<button class="btn ${ok ? "ghost" : "primary"}" data-act="retry">🔁 לנסות שוב</button>` +
        `<button class="btn ghost" data-act="lesson">📘 לשיעור</button>` +
        `<button class="btn ghost" data-act="map">🗺️ למפת השלבים</button>` +
      `</div>`;
    $("#crsSum").querySelectorAll("[data-act]").forEach(b => b.onclick = () => {
      const a = b.dataset.act;
      if (a === "next") openLesson(nextL);
      else if (a === "retry") startLevel(L);
      else if (a === "lesson") openLesson(L);
      else if (a === "real") realExam();
      else openMap();
    });
    view("crsSumView");
  }
  function exit(){ backToMode(); S.hist = []; S.hpos = 0; cur ? openLesson(cur) : openMap(); }

  // hand off to the real exam questions of this topic (free practice)
  function realExam(){
    const r = document.querySelector('input[name=mode][value="practice"]'); if (r) r.checked = true;
    $("#examOpts").classList.add("hidden");
    ["#officialOnly", "#mistakesOnly"].forEach(s => { const el = $(s); if (el) el.checked = false; });
    S.mode = "practice"; S.topic = C.meta.topic; S.part = "all";
    startSession();
  }

  /* ---------- wiring ---------- */
  $("#crsLessonGo").onclick = () => cur && startLevel(cur);
  $("#crsLessonBack").onclick = () => openMap();
  $("#crsHomeBtn").onclick = () => quit();
  $("#crsResetBtn").onclick = () => { if (confirm(`לאפס את ההתקדמות בקורס ה-${C.meta.name}?`)){ C.prog.levels = {}; save(); renderMap(); } };
  document.querySelectorAll("[data-course]").forEach(el => {
    const id = el.dataset.course; if (!has(id)) return;
    el.onclick = () => openMap(id);
    if (el.classList.contains("crs-promo")){
      el.onkeydown = e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openMap(id); } };
      const c = course(id), n = c.levels.filter(L => passedIn(c, L)).length, rec = recommendedIn(c);
      if (n) el.querySelector(".crs-promo-sub").textContent = `עברת ${n} מתוך ${c.levels.length} שלבים${rec ? ". הבא בתור: " + rec.title : ". סיימת, כל הכבוד!"}`;
    }
  });

  window.COURSE = { record, finishLevel, exit, openMap, openLesson: L => openLesson(L), startLevel: L => startLevel(L) };
  window.ERDC = window.COURSE;   // older name

  // deep link: ?erd=1 / ?sql=1 (map) · ?sql=S03 (that level's lesson) · ?sql=S03&play=1
  try {
    const p = new URLSearchParams(location.search);
    Object.keys(META).forEach(id => {
      const v = p.get(id); if (!v || !has(id)) return;
      C = course(id);
      const L = C.levels.find(l => l.id === v);
      if (!L) openMap(); else if (p.get("play")) startLevel(L); else openLesson(L);
    });
  } catch(e){}
})();
