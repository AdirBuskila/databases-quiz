"use strict";
/* Databases quiz — vanilla JS. Loads window.DB_QUIZ = {contexts, questions} from questions.js.
   Extends the data-science-quiz engine with:
   - shared context blocks (ERD image / schema tables / R,S data tables / FD sets) referenced by many questions
   - option objects with types text | code (SQL, highlighted) | math (KaTeX) | image
   - answers stored by stable option id (correctId) so shuffling works for code/image options
   - a per-question part tag (א/ב/ג/ד) alongside the topic tag                                */

const DATA = (window.DB_QUIZ && typeof window.DB_QUIZ === "object") ? window.DB_QUIZ : { contexts:{}, questions:[] };
const QS  = Array.isArray(DATA.questions) ? DATA.questions : [];
const CTX = (DATA.contexts && typeof DATA.contexts === "object") ? DATA.contexts : {};
const HE_KEYS = ["א","ב","ג","ד","ה","ו","ז","ח"];
const STORE = "dbq_progress_v1";

const TOPICS = [
  ["all","כל הנושאים"],
  ["erd","מודל ERD"],
  ["sql","SQL"],
  ["relalg","אלגברה רלציונית"],
  ["fd_norm","תלויות ונרמול"],
  ["rel_model","המודל הרלציוני"],
  ["nosql","NoSQL"],
];
const TOPIC_LABEL = Object.fromEntries(TOPICS.map(([k,l])=>[k,l]));

const PARTS = [
  ["all","כל החלקים"],
  ["א","א · ERD"],
  ["ב","ב · SQL"],
  ["ג","ג · אלגברה"],
  ["ד","ד · תלויות ונרמול"],
  ["ה","ה · NoSQL"],
];

const SRC_NOTE = {
  "solution-pdf":"מקור התשובה: פתרון רשמי של המבחן",
  "accepted-answers-docx":"מקור התשובה: תשובות שהתקבלו כנכונות (לאחר ערעורים)",
  "combined-pdf":"מקור התשובה: פתרון המצורף לגוף המבחן",
  "answers-pdf":"מקור התשובה: מפתח תשובות רשמי",
  "derived":"תשובה נגזרה מחומר הקורס — לא רשמית",
};

/* ---------- storage ---------- */
function loadProgress(){
  try{ return JSON.parse(localStorage.getItem(STORE)) || {stats:{answered:0,correct:0},perQ:{}}; }
  catch(e){ return {stats:{answered:0,correct:0},perQ:{}}; }
}
function saveProgress(){ try{ localStorage.setItem(STORE, JSON.stringify(P)); }catch(e){} }
let P = loadProgress();

/* ---------- helpers ---------- */
const $ = s => document.querySelector(s);
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function show(id){ document.querySelectorAll(".screen").forEach(s=>s.classList.add("hidden")); $("#"+id).classList.remove("hidden"); window.scrollTo({top:0,behavior:"smooth"}); }
function escapeHtml(s){ return String(s).replace(/[&<>]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[m])); }
function optById(q,id){ return (q.options||[]).find(o=>o.id===id); }
function hasHebrew(s){ return /[֐-׿]/.test(String(s)); }
/* accepted answers: usually just [correctId], but some questions accept more than one
   (e.g. an appeal accepted a second option). Grade "chosen ∈ accepted". */
function acceptedIdsOf(q){ return (Array.isArray(q.acceptedIds) && q.acceptedIds.length) ? q.acceptedIds : [q.correctId]; }
function isAccepted(q,id){ return id!=null && acceptedIdsOf(q).includes(id); }

function countFor(topic, part, opts){ return QS.filter(q => filterMatch(q, topic, part, opts)).length; }
function filterMatch(q, topic, part, opts){
  if(topic!=="all" && q.topic!==topic) return false;
  if(part!=="all" && q.part!==part) return false;
  if(opts.officialOnly && !q.official) return false;
  if(opts.mistakesOnly){ const r=P.perQ[q.id]; if(!r || r.correct) return false; }
  return true;
}

/* ---------- math (KaTeX, vendored offline) ---------- */
function katexRender(tex, display){
  if(window.katex){
    try{ return window.katex.renderToString(String(tex), {throwOnError:false, displayMode:!!display}); }
    catch(e){ /* fall through to plain fallback */ }
  }
  return `<code class="math-fallback" dir="ltr">${escapeHtml(tex)}</code>`;
}
const katexInline = t => katexRender(t, false);
const katexBlock  = t => katexRender(t, true);

/* rich text for question stems, explanations & text contexts. Escapes, keeps line
   breaks (CSS pre-wrap), and renders inline markup:
     $$...$$  display RA/FD expression      $...$  inline RA/FD expression
     `...`    inline code token (LTR)        **...**  bold                          */
const algBlock  = s => window.renderAlgebra ? window.renderAlgebra(s, true)  : `<code class="math-fallback" dir="ltr">${escapeHtml(s)}</code>`;
const algInline = s => window.renderAlgebra ? window.renderAlgebra(s, false) : `<code class="math-fallback" dir="ltr">${escapeHtml(s)}</code>`;
function richText(s){
  return String(s).split(/(\$\$[^$]*\$\$|\$[^$]+\$|`[^`]+`|\*\*[^*]+\*\*)/g).map(part=>{
    if(part.length>4 && part.startsWith("$$") && part.endsWith("$$")) return algBlock(part.slice(2,-2));
    if(part.length>2 && part[0]==="$" && part[part.length-1]==="$") return algInline(part.slice(1,-1));
    if(part.length>2 && part[0]==="`" && part[part.length-1]==="`") return `<code class="tok" dir="ltr">${escapeHtml(part.slice(1,-1))}</code>`;
    if(part.length>4 && part.startsWith("**") && part.endsWith("**")) return `<strong>${escapeHtml(part.slice(2,-2))}</strong>`;
    return escapeHtml(part);
  }).join("");
}

/* ---------- shared context block ---------- */
function tableHtml(t){
  const cols = t.columns || [];
  const pk = new Set(t.pk || []);
  let h = `<figure class="dbtable"><table dir="ltr">`;
  if(t.name) h += `<caption>${escapeHtml(t.name)}</caption>`;
  if(cols.length) h += `<thead><tr>` +
    cols.map(c=>`<th${pk.has(c)?' class="pk"':''}>${escapeHtml(c)}</th>`).join("") + `</tr></thead>`;
  if(Array.isArray(t.rows) && t.rows.length) h += `<tbody>` +
    t.rows.map(r=>`<tr>`+r.map(c=>`<td>${escapeHtml(c)}</td>`).join("")+`</tr>`).join("") + `</tbody>`;
  h += `</table>` + (t.caption?`<figcaption>${escapeHtml(t.caption)}</figcaption>`:"") + `</figure>`;
  return h;
}
/* relation templates: each = a card with the schema (LTR, keys underlined, scrolls if long)
   on top and the Hebrew meaning below. Stacked (not a 2-col table) so long schemas never
   squish the meaning column, and it stays readable on mobile. */
function relationsHtml(rels){
  const items = rels.map(r=>{
    const schema = window.renderSchema ? window.renderSchema(r.schema) : `<span class="schema" dir="ltr">${escapeHtml(r.schema)}</span>`;
    const mean = r.meaning ? `<div class="mean">${richText(r.meaning)}</div>` : "";
    return `<div class="rel-item"><div class="rel">${schema}</div>${mean}</div>`;
  }).join("");
  return `<div class="ctx-schemas">${items}</div>`;
}
function contextHtml(ctx){
  if(!ctx) return "";
  let h = `<div class="ctx ctx-${ctx.kind||"text"}">`;
  if(ctx.title) h += `<div class="ctx-title">${escapeHtml(ctx.title)}</div>`;
  if(ctx.intro) h += `<div class="ctx-text">${richText(ctx.intro)}</div>`;
  if(ctx.image) h += `<figure class="ctx-fig"><img class="q-img ctx-img" src="${ctx.image}" alt="${escapeHtml(ctx.caption||"")}" loading="lazy">`+
                     (ctx.caption?`<figcaption>${escapeHtml(ctx.caption)}</figcaption>`:"")+`</figure>`;
  if(Array.isArray(ctx.relations)) h += relationsHtml(ctx.relations);
  if(Array.isArray(ctx.tables)) h += `<div class="ctx-tables">`+ctx.tables.map(tableHtml).join("")+`</div>`;
  if(ctx.algebra) h += `<div class="ctx-algebra">`+(Array.isArray(ctx.algebra)?ctx.algebra:[ctx.algebra]).map(a=>algBlock(a)).join("")+`</div>`;
  if(ctx.math) h += `<div class="ctx-math" dir="ltr">${katexBlock(ctx.math)}</div>`;
  if(ctx.text) h += `<div class="ctx-text">${richText(ctx.text)}</div>`;
  if(ctx.note) h += `<div class="ctx-note">${richText(ctx.note)}</div>`;
  if(ctx.html) h += `<div class="ctx-html">${ctx.html}</div>`; // trusted (produced by our pipeline)
  h += `</div>`;
  return h;
}

/* ---------- question-level extras (own code/figure; contexts handle shared blocks) ---------- */
function extrasHtml(q){
  let h="";
  if(q.code){
    const body = window.highlightSQL ? window.highlightSQL(q.code) : escapeHtml(q.code);
    h += `<pre class="q-code" dir="ltr"><code>${body}</code></pre>`;
  }
  if(q.image) h += `<figure class="q-fig"><img class="q-img" src="${q.image}" alt="" loading="lazy"></figure>`;
  return h;
}

/* ---------- an option renders by type ---------- */
function optionHtml(o){
  if(!o) return "";
  const type = o.type || "text";
  if(type==="image") return `<img class="opt-img" src="${o.value}" alt="" loading="lazy">`;
  if(type==="code"){
    const body = (window.highlightSQL && (o.lang||"sql")==="sql") ? window.highlightSQL(o.value) : escapeHtml(o.value);
    return `<pre class="opt-code" dir="ltr"><code>${body}</code></pre>`;
  }
  if(type==="math") return `<span class="opt-math" dir="ltr">${katexInline(o.value)}</span>`;
  if(type==="algebra") return `<span class="opt-algebra">${algInline(o.value)}</span>`;
  if(type==="schema") return `<span class="opt-schema">${window.renderSchema?window.renderSchema(o.value):escapeHtml(o.value)}</span>`;
  const s = String(o.value);   // text: allow inline markup (`code`, $math$, **bold**) for embedded LTR tokens
  if(!hasHebrew(s)) return `<span class="opt-ltr" dir="ltr">${richText(s)}</span>`;
  return richText(s);
}

/* ---------- session state ---------- */
const S = { mode:"practice", topic:"all", part:"all", pool:[], pos:0, current:null,
  exam:{count:20, minutes:60, answers:{}, endAt:0, timer:null} };

/* ---------- start screen ---------- */
function renderTopStats(){
  const a=P.stats.answered, c=P.stats.correct;
  const pct=a?Math.round(c/a*100):0;
  $("#topStats").innerHTML =
    `<div class="stat">נענו <b>${a}</b></div>`+
    `<div class="stat">דיוק <b>${pct}%</b></div>`+
    `<div class="stat">במאגר <b>${QS.length}</b></div>`;
}
function selectedOpts(){ return { officialOnly: $("#officialOnly").checked, mistakesOnly: $("#mistakesOnly").checked }; }
function renderTopicGrid(){
  const opts=selectedOpts();
  $("#topicGrid").innerHTML = TOPICS.map(([k,label])=>{
    const n=countFor(k, S.part, opts);
    const active = k===S.topic ? "active":"";
    const dis = n===0 && k!=="all" ? "disabled":"";
    return `<button class="topic-btn ${active}" data-topic="${k}" ${dis}>
      <span>${label}</span><span class="cnt">${n}</span></button>`;
  }).join("");
  document.querySelectorAll(".topic-btn").forEach(b=>{
    b.onclick=()=>{ S.topic=b.dataset.topic; renderTopicGrid(); updatePoolInfo(); };
  });
}
function renderPartFilter(){
  const opts=selectedOpts();
  $("#partFilter").innerHTML = PARTS.map(([k,label])=>{
    const n = k==="all" ? countFor(S.topic,"all",opts) : countFor(S.topic,k,opts);
    const active = k===S.part ? "active":"";
    const dis = n===0 && k!=="all" ? "disabled":"";
    return `<button class="part-btn ${active}" data-part="${k}" ${dis}><span>${label}</span><span class="cnt">${n}</span></button>`;
  }).join("");
  document.querySelectorAll(".part-btn").forEach(b=>{
    b.onclick=()=>{ S.part=b.dataset.part; renderPartFilter(); renderTopicGrid(); updatePoolInfo(); };
  });
}
function selectedExam(){ const el=$("#examPick"); return (S.mode==="exam" && el) ? el.value : ""; }
function examQuestions(code){ return QS.filter(q=>q.examCode===code); }
function qNum(q){ const m=String(q.id).match(/-Q(\d+)$/); return m?parseInt(m[1],10):0; }
function examLabelOf(q){ return q.examLabel || q.sourceLabel || q.examCode || ""; }
function populateExamPick(){
  const sel=$("#examPick"); if(!sel) return;
  const seen=new Map();
  QS.forEach(q=>{ if(q.examCode && !seen.has(q.examCode)) seen.set(q.examCode, examLabelOf(q)); });
  sel.innerHTML = `<option value="">אקראי (כל המאגר)</option>` +
    [...seen.entries()].sort((a,b)=>String(a[0]).localeCompare(String(b[0])))
      .map(([code,label])=>`<option value="${code}">${escapeHtml(label)} (${examQuestions(code).length})</option>`).join("");
  sel.onchange=()=>{ syncExamOpts(); updatePoolInfo(); };
}
function syncExamOpts(){ const wrap=$("#examCountWrap"); if(wrap) wrap.style.display = selectedExam() ? "none" : ""; }
function updatePoolInfo(){
  const code=selectedExam();
  if(code){
    const n=examQuestions(code).length;
    const label=examLabelOf(QS.find(q=>q.examCode===code)||{});
    $("#poolInfo").textContent = `מבחן ${label} — ${n} שאלות (מבחן מלא).`;
    $("#startBtn").disabled = n===0;
    return;
  }
  const opts=selectedOpts();
  const n=countFor(S.topic,S.part,opts);
  const off=QS.filter(q=>filterMatch(q,S.topic,S.part,opts)&&q.official).length;
  $("#poolInfo").textContent = `נבחרו ${n} שאלות (${off} מפתרון רשמי, ${n-off} נגזרו).`;
  $("#startBtn").disabled = n===0;
}
function initStart(){
  renderTopStats();
  populateExamPick();
  renderPartFilter();
  renderTopicGrid();
  syncExamOpts();
  updatePoolInfo();
  document.querySelectorAll('input[name=mode]').forEach(r=>{
    r.onchange=()=>{ S.mode=document.querySelector('input[name=mode]:checked').value;
      $("#examOpts").classList.toggle("hidden", S.mode!=="exam");
      $("#mistakesOnly").parentElement.style.display = S.mode==="exam"?"none":"";
      syncExamOpts(); updatePoolInfo();
    };
  });
  $("#officialOnly").onchange = ()=>{ renderPartFilter(); renderTopicGrid(); updatePoolInfo(); };
  $("#mistakesOnly").onchange = ()=>{ renderPartFilter(); renderTopicGrid(); updatePoolInfo(); };
  $("#startBtn").onclick = startSession;
  $("#datasetInfo").textContent = `${QS.length} שאלות · מבחני 2019–2025`;
}

/* ---------- session ---------- */
function startSession(){
  S._views=null;
  const opts=selectedOpts();
  const pickedExam = selectedExam();
  let pool;
  if(pickedExam){
    pool = examQuestions(pickedExam).slice().sort((a,b)=>qNum(a)-qNum(b));
  } else {
    pool = shuffle(QS.filter(q=>filterMatch(q,S.topic,S.part,opts)));
  }
  if(S.mode==="exam"){
    if(pickedExam){ S.exam.count = pool.length; }
    else { S.exam.count = Math.min(parseInt($("#examCount").value,10), pool.length); pool = pool.slice(0, S.exam.count); }
    S.exam.minutes = parseInt($("#examMinutes").value,10);
    S.exam.answers = {};
    S.exam.endAt = Date.now() + S.exam.minutes*60000;
    startTimer();
  }
  S.pool = pool; S.pos = 0;
  $("#prevBtn").classList.toggle("hidden", S.mode!=="exam");
  show("screen-quiz");
  renderQuestion();
}

function makeView(q){
  const order = shuffle((q.options||[]).map(o=>o.id));  // shuffle by stable option id
  const correctSet = new Set(order.map((id,i)=>isAccepted(q,id)?i:-1).filter(i=>i>=0));
  return { q, order, correctDisplay: order.indexOf(q.correctId), correctSet, answered:false, chosen:null };
}

function renderQuestion(){
  const q = S.pool[S.pos];
  if(S.mode==="exam"){
    S.current = S._views?.[q.id] || makeView(q);
    (S._views ||= {})[q.id] = S.current;
  } else {
    S.current = makeView(q);
  }
  const v=S.current;

  $("#qTopic").textContent = q.topicLabel || TOPIC_LABEL[q.topic] || q.topic;
  const partChip=$("#qPart");
  if(q.part){ partChip.textContent = "חלק "+q.part; partChip.classList.remove("hidden"); }
  else partChip.classList.add("hidden");
  $("#qSource").textContent = examLabelOf(q) || (q.source==="exam"?"מבחן":"תרגול");
  const badge=$("#qBadge");
  badge.textContent = q.official ? "מפתרון רשמי" : "תשובה לא רשמית";
  badge.className = "chip " + (q.official?"official":"unofficial");

  $("#qContext").innerHTML = q.contextId ? contextHtml(CTX[q.contextId]) : "";
  $("#questionText").innerHTML = richText(q.question);
  $("#qExtras").innerHTML = extrasHtml(q);

  $("#optionsList").innerHTML = v.order.map((oid,disp)=>
    `<button class="opt" data-disp="${disp}">
       <span class="key">${HE_KEYS[disp]||disp+1}</span>
       <span class="txt">${optionHtml(optById(q,oid))}</span>
     </button>`).join("");
  document.querySelectorAll(".opt").forEach(b=> b.onclick=()=>choose(parseInt(b.dataset.disp,10)));

  const fb=$("#feedback"); fb.classList.add("hidden"); fb.className="feedback hidden";

  if(S.mode==="exam" && q.id in S.exam.answers){
    const chosenDisp = v.order.indexOf(S.exam.answers[q.id]);
    markExamChoice(chosenDisp);
  }

  $("#progressFill").style.width = ((S.pos)/(S.pool.length))*100 + "%";
  if(S.mode==="exam"){
    $("#quizMeta").innerHTML = `שאלה ${S.pos+1}/${S.pool.length} <span id="tmr" class="timer"></span>`;
    renderTimer();
    $("#nextBtn").classList.toggle("hidden", S.pos>=S.pool.length-1);
    $("#submitExamBtn").classList.toggle("hidden", S.pos<S.pool.length-1);
    $("#prevBtn").disabled = S.pos===0;
    $("#streakBox").textContent = `נענו ${Object.keys(S.exam.answers).length}/${S.pool.length}`;
  } else {
    $("#quizMeta").textContent = `שאלה ${S.pos+1}`;
    $("#nextBtn").classList.add("hidden");
    $("#submitExamBtn").classList.add("hidden");
    const a=P.stats.answered,c=P.stats.correct;
    $("#streakBox").textContent = `רצף נכון: ${S.streak||0} · דיוק כולל ${a?Math.round(c/a*100):0}%`;
  }
}

/* ---------- answering ---------- */
function choose(disp){
  const v=S.current, q=v.q;
  if(S.mode==="exam"){
    S.exam.answers[q.id] = v.order[disp];   // store chosen option id
    markExamChoice(disp);
    $("#streakBox").textContent = `נענו ${Object.keys(S.exam.answers).length}/${S.pool.length}`;
    return;
  }
  if(v.answered) return;
  v.answered=true; v.chosen=disp;
  const correct = v.correctSet.has(disp);
  document.querySelectorAll(".opt").forEach((b,i)=>{
    b.disabled=true;
    if(v.correctSet.has(i)) b.classList.add("correct");
    else if(i===disp) b.classList.add("wrong");
  });
  recordAnswer(q, correct);
  S.streak = correct ? (S.streak||0)+1 : 0;
  const fb=$("#feedback");
  fb.className = "feedback " + (correct?"good":"bad");
  const srcNote = SRC_NOTE[q.answerSource] || (q.official?"":SRC_NOTE.derived);
  fb.innerHTML = `<div class="verdict">${correct?"✓ נכון":"✗ לא נכון"}</div>`+
    `<div class="expl">${richText(q.explanation||"")}</div>`+
    (q.official?"":`<span class="note">⚠ תשובה לא רשמית — נגזרה מחומר הקורס.</span>`)+
    (srcNote?`<span class="note">${escapeHtml(srcNote)}</span>`:"")+
    `<span class="note">מקור: ${escapeHtml(examLabelOf(q))}</span>`;
  $("#nextBtn").classList.remove("hidden");
  $("#nextBtn").focus();
  renderTopStats();
  const a=P.stats.answered,c=P.stats.correct;
  $("#streakBox").textContent = `רצף נכון: ${S.streak} · דיוק כולל ${a?Math.round(c/a*100):0}%`;
}
function markExamChoice(disp){ document.querySelectorAll(".opt").forEach((b,i)=> b.classList.toggle("chosen-exam", i===disp)); }
function recordAnswer(q, correct){ P.stats.answered++; if(correct) P.stats.correct++; P.perQ[q.id]={correct, t:Date.now()}; saveProgress(); }

/* ---------- navigation ---------- */
function next(){
  if(S.mode==="practice"){
    if(!S.current.answered) return;
    if(S.pos>=S.pool.length-1){ S.pool = shuffle(S.pool); S.pos=0; } else S.pos++;
    renderQuestion();
  } else {
    if(S.pos<S.pool.length-1){ S.pos++; renderQuestion(); }
  }
}
function prev(){ if(S.mode==="exam" && S.pos>0){ S.pos--; renderQuestion(); } }

/* ---------- timer (exam) ---------- */
function startTimer(){ clearInterval(S.exam.timer); S.exam.timer=setInterval(renderTimer,1000); }
function renderTimer(){
  const el=$("#tmr"); if(!el) return;
  let ms=S.exam.endAt-Date.now();
  if(ms<=0){ ms=0; clearInterval(S.exam.timer); submitExam(true); return; }
  const m=Math.floor(ms/60000), s=Math.floor(ms%60000/1000);
  el.textContent = `⏱ ${m}:${String(s).padStart(2,"0")}`;
  el.classList.toggle("danger", ms<60000);
}

/* ---------- exam grading ---------- */
function submitExam(auto){
  clearInterval(S.exam.timer);
  if(!auto){
    const unans=S.pool.length-Object.keys(S.exam.answers).length;
    if(unans>0 && !confirm(`נותרו ${unans} שאלות ללא מענה. להגיש בכל זאת?`)){ startTimer(); return; }
  }
  let correct=0; const byTopic={}; const byPart={}; const review=[];
  S.pool.forEach(q=>{
    const chosen = q.id in S.exam.answers ? S.exam.answers[q.id] : null;  // option id or null
    const ok = isAccepted(q, chosen);
    if(ok) correct++;
    recordAnswer(q, ok);
    (byTopic[q.topic] ||= {n:0,c:0}); byTopic[q.topic].n++; if(ok) byTopic[q.topic].c++;
    const pk=q.part||"—"; (byPart[pk] ||= {n:0,c:0}); byPart[pk].n++; if(ok) byPart[pk].c++;
    review.push({q, chosen, ok});
  });
  renderResults(correct, byTopic, byPart, review);
  renderTopStats();
  show("screen-results");
}
function renderResults(correct, byTopic, byPart, review){
  const total=S.pool.length, pct=Math.round(correct/total*100);
  $("#resultsSummary").innerHTML =
    `<div class="scorering" style="--p:${pct}"><span>${pct}%</span></div>`+
    `<div class="txt"><b>${correct} / ${total}</b> תשובות נכונות<br>`+
    `<span style="color:var(--muted)">${pct>=60?"עברת! 🎉":"עוד קצת תרגול 💪"}</span></div>`;
  $("#resultsByTopic").innerHTML = Object.entries(byTopic).map(([t,o])=>{
    const lbl=TOPIC_LABEL[t]||t; const p=Math.round(o.c/o.n*100);
    return `<div class="tline"><span>${lbl}</span><span class="tbar"><i style="width:${p}%"></i></span><span>${o.c}/${o.n}</span></div>`;
  }).join("");
  const partLabel=Object.fromEntries(PARTS.map(([k,l])=>[k,l]));
  $("#resultsByPart").innerHTML = Object.entries(byPart).map(([t,o])=>{
    const lbl=partLabel[t]||("חלק "+t); const p=Math.round(o.c/o.n*100);
    return `<div class="tline"><span>${lbl}</span><span class="tbar"><i style="width:${p}%"></i></span><span>${o.c}/${o.n}</span></div>`;
  }).join("");
  $("#resultsReview").innerHTML = review.map(r=>{
    const v=r.q;
    const chosenTxt = r.chosen!=null ? optionHtml(optById(v,r.chosen)) : "— לא נענתה —";
    const acc = acceptedIdsOf(v);
    const correctTxt = acc.map(id=>optionHtml(optById(v,id))).join(`<span class="or">או</span>`);
    return `<div class="rev ${r.ok?"ok":"bad"}">
      <div class="rq">${richText(v.question)}</div>
      ${v.contextId?contextHtml(CTX[v.contextId]):""}
      ${extrasHtml(v)}
      <div class="ra"><span class="${r.ok?"good":"miss"}">תשובתך: ${chosenTxt}</span>`+
      (r.ok?"":` · <span class="good">${acc.length>1?"נכונות":"הנכונה"}: ${correctTxt}</span>`)+
      `<br>${richText(v.explanation||"")}${v.official?"":" (לא רשמי)"}</div></div>`;
  }).join("");
}

/* ---------- controls ---------- */
function quit(){ clearInterval(S.exam.timer); S._views=null; S.streak=0; initStart(); show("screen-start"); }
function bindGlobal(){
  $("#nextBtn").onclick=next;
  $("#prevBtn").onclick=prev;
  $("#submitExamBtn").onclick=()=>submitExam(false);
  $("#quitBtn").onclick=()=>{ if(S.mode!=="exam"||confirm("לצאת מהמבחן? ההתקדמות לא תישמר.")) quit(); };
  $("#backHomeBtn").onclick=quit;
  function goHome(){
    const inExamQuiz = S.mode==="exam" && !$("#screen-quiz").classList.contains("hidden");
    if(inExamQuiz && !confirm("לצאת מהמבחן? ההתקדמות לא תישמר.")) return;
    quit();
  }
  const brand=$("#brandHome");
  if(brand){
    brand.style.cursor="pointer";
    brand.onclick=goHome;
    brand.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); goHome(); } };
  }
  $("#resetProgress").onclick=()=>{ if(confirm("לאפס את כל ההתקדמות וההיסטוריה?")){ P={stats:{answered:0,correct:0},perQ:{}}; saveProgress(); renderTopStats(); renderPartFilter(); renderTopicGrid(); updatePoolInfo(); } };
  // click any figure (question / context) to zoom
  document.addEventListener("click", e=>{
    const img=e.target.closest(".q-img"); if(!img) return;
    const lb=$("#lightbox"), lbImg=$("#lightboxImg");
    if(!lb||!lbImg) return;
    lbImg.src=img.src; lbImg.alt=img.alt||""; lb.classList.remove("hidden");
  });
  const lb=$("#lightbox"), lbImg=$("#lightboxImg"), lbClose=$("#lightboxClose");
  function closeLb(){ lb.classList.add("hidden"); lbImg.src=""; }
  if(lb){ lb.addEventListener("click", e=>{ if(e.target===lb) closeLb(); }); }
  if(lbClose) lbClose.onclick=closeLb;
  document.addEventListener("keydown",e=>{
    if(lb && !lb.classList.contains("hidden")){ if(e.key==="Escape") closeLb(); return; }
    if($("#screen-quiz").classList.contains("hidden")) return;
    if(/^[1-8]$/.test(e.key)){ const b=document.querySelector(`.opt[data-disp="${+e.key-1}"]`); if(b && !b.disabled) b.click(); }
    else if(e.key==="Enter"){ if(!$("#nextBtn").classList.contains("hidden")) next(); else if(!$("#submitExamBtn").classList.contains("hidden")) submitExam(false); }
    else if(e.key==="ArrowLeft" && !$("#nextBtn").classList.contains("hidden")) next();
    else if(e.key==="ArrowRight" && S.mode==="exam") prev();
  });
}

/* ---------- theme toggle ---------- */
(function initTheme(){
  const THEME_KEY = "dbq_theme";
  const btn = document.getElementById("themeToggle");
  if(!btn) return;
  const root = document.documentElement;
  const systemDark = () => !window.matchMedia || !window.matchMedia("(prefers-color-scheme: light)").matches;
  const effective = () => root.dataset.theme || (systemDark() ? "dark" : "light");
  const paint = () => { btn.textContent = effective()==="dark" ? "🌙" : "☀️"; };
  paint();
  btn.addEventListener("click", () => {
    const next = effective()==="dark" ? "light" : "dark";
    root.dataset.theme = next;
    try{ localStorage.setItem(THEME_KEY, next); }catch(e){}
    paint();
  });
  if(window.matchMedia){
    window.matchMedia("(prefers-color-scheme: light)").addEventListener?.("change", () => { if(!root.dataset.theme) paint(); });
  }
})();

/* ---------- learning section ---------- */
(function initLearn(){
  const data = Array.isArray(window.LEARN) ? window.LEARN : [];
  const entry = document.getElementById("learnEntry");
  const screen = document.getElementById("screen-learn");
  if(!entry || !screen) return;
  if(!data.length){ entry.style.display = "none"; return; }

  const toc=$("#learnToc"), content=$("#learnContent"), fill=$("#learnProgressFill"), pos=$("#learnPos");
  const prevB=$("#learnPrev"), nextB=$("#learnNext"), toggle=$("#learnTocToggle"), backdrop=$("#learnBackdrop");
  const backB=$("#learnBackBtn"), lb=$("#lightbox"), lbImg=$("#lightboxImg"), lbClose=$("#lightboxClose");
  let idx=0, built=false;

  function buildToc(){
    toc.innerHTML = data.map((s,i)=>`<button data-i="${i}">${escapeHtml(s.title)}</button>`).join("");
    toc.querySelectorAll("button").forEach(b=> b.onclick=()=>{ go(+b.dataset.i); closeDrawer(); });
    built=true;
  }
  function go(i){
    idx=Math.max(0,Math.min(data.length-1,i));
    const s=data[idx];
    content.innerHTML = `<h2 class="learn-h">${escapeHtml(s.title)}</h2>` + s.html;
    toc.querySelectorAll("button").forEach((b,j)=> b.classList.toggle("active", j===idx));
    const active=toc.querySelector("button.active"); if(active) active.scrollIntoView({block:"nearest"});
    fill.style.width = ((idx+1)/data.length*100)+"%";
    pos.textContent = `${idx+1} / ${data.length}`;
    prevB.disabled=idx===0; nextB.disabled=idx===data.length-1;
    window.scrollTo({top:0,behavior:"smooth"}); content.focus({preventScroll:true});
  }
  function openLearn(){ if(!built) buildToc(); show("screen-learn"); go(idx); }
  function setDrawer(open){ toc.classList.toggle("open",open); backdrop.classList.toggle("hidden",!open); toggle.setAttribute("aria-expanded", open?"true":"false"); }
  function closeDrawer(){ setDrawer(false); }

  entry.onclick=openLearn;
  backB.onclick=()=>{ closeDrawer(); show("screen-start"); };
  prevB.onclick=()=>go(idx-1);
  nextB.onclick=()=>go(idx+1);
  toggle.onclick=()=>setDrawer(!toc.classList.contains("open"));
  backdrop.onclick=closeDrawer;

  content.addEventListener("click", e=>{
    const img=e.target.closest(".learn-fig img"); if(!img) return;
    lbImg.src=img.src; lbImg.alt=img.alt||""; lb.classList.remove("hidden");
  });
  function closeLb(){ lb.classList.add("hidden"); lbImg.src=""; }
  lb.addEventListener("click", e=>{ if(e.target===lb) closeLb(); });
  lbClose.onclick=closeLb;
  document.addEventListener("keydown", e=>{
    if(!lb.classList.contains("hidden")){ if(e.key==="Escape") closeLb(); return; }
    if(screen.classList.contains("hidden")) return;
    if(e.key==="ArrowLeft") go(idx+1);
    else if(e.key==="ArrowRight") go(idx-1);
    else if(e.key==="Escape"){ closeDrawer(); show("screen-start"); }
  });
})();

/* ---------- deep link (index.html?practice=<topicKey>) ---------- */
function autoStartFromURL(){
  let t;
  try{ t = new URLSearchParams(location.search).get("practice"); }catch(e){ return; }
  if(!t || !TOPICS.some(([k])=>k===t)) return;
  if(countFor(t,"all",{officialOnly:false,mistakesOnly:false})===0) return;
  S.mode="practice"; S.topic=t;
  const r=document.querySelector('input[name=mode][value="practice"]'); if(r) r.checked=true;
  startSession();
}

/* ---------- boot ---------- */
if(!QS.length){
  document.getElementById("app").innerHTML="<div class='card'><h2>לא נטענו שאלות</h2><p>ודאו ש-<code>questions.js</code> נמצא לצד הדף.</p></div>";
}else{
  initStart(); bindGlobal(); autoStartFromURL();
}
