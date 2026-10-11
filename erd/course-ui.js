"use strict";
/* "צריך עזרה ב-ERD?" — the ERD course: level map → lesson card → level quiz → summary.
   Levels come from erd/levels/*.js (window.ERD_COURSE). The quiz itself runs on the main
   engine in app.js (S, renderQuestion, choose, next) with S.mode = "course"; app.js calls
   back into window.ERDC.record / finishLevel / exit. Progress lives in its own key so the
   question-bank stats stay untouched.

   level = {id, order, icon, title, goal, boss?, lesson:{html, figs:[{erd, caption}]}, questions:[…]}
   lesson html may hold {fig:N} placeholders → figure N of lesson.figs.                    */
(function(){
  const LV = Array.isArray(window.ERD_COURSE) ? window.ERD_COURSE : [];
  const KEY = "dbq_erd_v1", PASS = 80;
  const screen = document.getElementById("screen-erd");
  if (!screen) return;
  if (!LV.length){ ["erdEntry","erdPromo"].forEach(id => { const el = document.getElementById(id); if (el) el.style.display = "none"; }); return; }

  let CP = load();
  function load(){ try { return JSON.parse(localStorage.getItem(KEY)) || { levels:{} }; } catch(e){ return { levels:{} }; } }
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(CP)); } catch(e){} }

  let cur = null, run = null;   // the level being played, and its answers {qid: ok}
  const views = ["erdMapView", "erdLessonView", "erdSumView"];
  function view(id){ show("screen-erd"); views.forEach(v => document.getElementById(v).classList.toggle("hidden", v !== id)); }
  const best = L => (CP.levels[L.id] || {}).best;
  const passed = L => (best(L) || 0) >= PASS;
  const recommended = () => LV.find(L => !passed(L));
  const levelName = L => `שלב ${L.order} · ${L.title}`;

  /* ---------- map ---------- */
  function renderMap(){
    const rec = recommended();
    const nPass = LV.filter(passed).length;
    $("#erdOverall").innerHTML =
      `עברת <b>${nPass}</b> מתוך <b>${LV.length}</b> שלבים` +
      `<div class="progress" style="margin-top:.5rem"><div class="progress-fill" style="width:${nPass / LV.length * 100}%"></div></div>` +
      (nPass === LV.length ? `<p style="margin:.6rem 0 0">🏆 סיימת את כל הקורס. עכשיו אתה מאסטר ERD. הצעד הבא: שאלות ה-ERD מהמבחנים.</p>` : "");
    $("#erdMap").innerHTML = LV.map(L => {
      const st = CP.levels[L.id];
      const cls = ["erd-lvl", passed(L) ? "passed" : "", L === rec ? "next" : "", L.boss ? "boss" : ""].join(" ");
      const status = !st ? `עוד לא התחלת · ${L.questions.length} שאלות`
        : passed(L) ? `✓ עברת · שיא ${st.best}%` : `ניסיון אחרון ${st.last}% · שיא ${st.best}% (צריך 80%)`;
      return `<button class="${cls}" data-id="${L.id}" type="button">
        <span class="num">שלב ${L.order}${L.boss ? " · מבחן גמר" : ""}</span>
        <span class="ttl">${L.icon || ""} ${escapeHtml(L.title)}</span>
        <span class="gl">${escapeHtml(L.goal || "")}</span>
        <span class="st">${status}</span></button>`;
    }).join("");
    $("#erdMap").querySelectorAll(".erd-lvl").forEach(b => b.onclick = () => openLesson(LV.find(L => L.id === b.dataset.id)));
  }
  function openMap(){ cur = null; renderMap(); view("erdMapView"); }

  /* ---------- lesson ---------- */
  function figHtml(f){
    if (!f) return "";
    return `<figure class="lesson-fig"><div class="erd-wrap">${renderERD(f.erd)}</div>` +
      (f.caption ? `<figcaption>${richText(f.caption)}</figcaption>` : "") + `</figure>`;
  }
  function openLesson(L){
    cur = L;
    const ls = L.lesson || {};
    const figs = ls.figs || [];
    const used = new Set();
    let html = String(ls.html || "").replace(/\{fig:(\d+)\}/g, (m, i) => { used.add(+i); return figHtml(figs[+i]); });
    html += figs.filter((f, i) => !used.has(i)).map(figHtml).join("");
    $("#erdLesson").innerHTML =
      `<div class="q-head"><span class="chip part">שלב ${L.order} מתוך ${LV.length}</span><span class="chip">${L.questions.length} שאלות</span></div>` +
      `<h2>${L.icon || ""} ${escapeHtml(L.title)}</h2><p class="sub">${escapeHtml(L.goal || "")}</p>` +
      `<div class="lesson-body">${html}</div>`;
    ERD.finish($("#erdLesson"));
    view("erdLessonView");
  }

  /* ---------- level quiz (runs on the main engine) ---------- */
  function startLevel(L){
    cur = L; run = {};
    const levelTitle = levelName(L);
    S.mode = "course"; S._views = null;
    S.pool = L.questions.map(q => Object.assign(q, { topic:"erd", topicLabel:"מודל ERD", course:{ levelId:L.id, levelTitle } }));
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
    const prev = CP.levels[L.id] || {};
    CP.levels[L.id] = { best: Math.max(prev.best || 0, pct), last: pct, at: Date.now() };
    save();
    const ok = pct >= PASS;
    const nextL = LV[LV.indexOf(L) + 1];
    const wrong = L.questions.filter(q => !(run && run[q.id]));
    S.mode = (document.querySelector('input[name=mode]:checked') || {}).value || "practice";
    $("#erdSum").innerHTML =
      `<div class="q-head" style="justify-content:center"><span class="chip part">${escapeHtml(levelName(L))}</span></div>` +
      `<div class="big">${pct}%</div><div><b>${correct} / ${total}</b> תשובות נכונות</div>` +
      `<p class="msg">${ok ? (L.boss ? "🏆 עברת את מבחן הגמר. אתה מאסטר ERD!" : "✓ עברת את השלב! אפשר להתקדם.") :
        "עוד לא 80%. כדאי לקרוא שוב את השיעור ולנסות שוב, זה בדיוק השלב שבו זה נבנה."}</p>` +
      (wrong.length ? `<div class="ctx" style="text-align:right"><div class="ctx-title">כדאי לחזור על:</div>${
        wrong.map(q => `<div class="ctx-note">• ${richText(q.recap || q.question)}</div>`).join("")}</div>` : "") +
      `<div class="erd-actions">` +
        (nextL ? `<button class="btn ${ok ? "primary" : "ghost"}" data-act="next">לשלב הבא: ${escapeHtml(nextL.title)} ⟵</button>` : "") +
        (L.boss || !nextL ? `<button class="btn primary" data-act="real">לשאלות ה-ERD מהמבחנים האמיתיים ⟵</button>` : "") +
        `<button class="btn ${ok ? "ghost" : "primary"}" data-act="retry">🔁 לנסות שוב</button>` +
        `<button class="btn ghost" data-act="lesson">📘 לשיעור</button>` +
        `<button class="btn ghost" data-act="map">🗺️ למפת השלבים</button>` +
      `</div>`;
    $("#erdSum").querySelectorAll("[data-act]").forEach(b => b.onclick = () => {
      const a = b.dataset.act;
      if (a === "next") openLesson(nextL);
      else if (a === "retry") startLevel(L);
      else if (a === "lesson") openLesson(L);
      else if (a === "real") realExamERD();
      else openMap();
    });
    view("erdSumView");
  }
  function exit(){ S.mode = (document.querySelector('input[name=mode]:checked') || {}).value || "practice"; S.hist = []; S.hpos = 0; cur ? openLesson(cur) : openMap(); }

  // hand off to the real exam ERD questions (free practice, topic = erd)
  function realExamERD(){
    const r = document.querySelector('input[name=mode][value="practice"]'); if (r) r.checked = true;
    $("#examOpts").classList.add("hidden");
    ["#officialOnly", "#mistakesOnly"].forEach(s => { const el = $(s); if (el) el.checked = false; });
    S.mode = "practice"; S.topic = "erd"; S.part = "all";
    startSession();
  }

  /* ---------- wiring ---------- */
  $("#erdLessonGo").onclick = () => cur && startLevel(cur);
  $("#erdLessonBack").onclick = openMap;
  $("#erdHomeBtn").onclick = () => quit();
  $("#erdResetBtn").onclick = () => { if (confirm("לאפס את ההתקדמות בקורס ה-ERD?")){ CP = { levels:{} }; save(); renderMap(); } };
  const entry = $("#erdEntry"); if (entry) entry.onclick = openMap;
  const promo = $("#erdPromo");
  if (promo){
    promo.onclick = openMap;
    promo.onkeydown = e => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openMap(); } };
    const n = LV.filter(passed).length;
    if (n) $("#erdPromoSub").textContent = `עברת ${n} מתוך ${LV.length} שלבים${recommended() ? ". הבא בתור: " + recommended().title : ". סיימת, כל הכבוד!"}`;
  }

  window.ERDC = { record, finishLevel, exit, openMap, openLesson, startLevel };

  // deep link: index.html?erd=1 (map) · ?erd=L03 (that level's lesson) · ?erd=L03&play=1
  try {
    const p = new URLSearchParams(location.search), v = p.get("erd");
    if (v){ const L = LV.find(l => l.id === v); if (!L) openMap(); else if (p.get("play")) startLevel(L); else openLesson(L); }
  } catch(e){}
})();
