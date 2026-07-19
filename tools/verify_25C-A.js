// Deterministic render verification for the flagship exam (approval gate).
// Loads the real app (all scripts + CSS), then rebuilds every question with the
// app's own render functions (window.contextHtml/optionHtml/richText/…) in natural
// a–e order with the accepted option(s) highlighted, and screenshots the exemplars
// of each render path in both themes + a mobile no-overflow check.
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = process.env.APP_URL || "http://127.0.0.1:8137/index.html";
const OUT = path.join(__dirname, "raw", "shots");
fs.mkdirSync(OUT, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));

// build the verify view inside the live page using the app's global render fns
function buildView() {
  const D = window.DB_QUIZ;
  const LET = ["A", "B", "C", "D", "E", "F"];
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  const host = document.createElement("div");
  host.id = "verify"; host.style.maxWidth = "820px"; host.style.margin = "0 auto"; host.style.padding = "1rem";
  const qs = D.questions.slice().sort((a, b) => {
    const n = x => parseInt(String(x.id).match(/-Q(\d+)$/)[1], 10); return n(a) - n(b);
  });
  host.innerHTML = qs.map(q => {
    const num = String(q.id).match(/-Q(\d+)$/)[1];
    const acc = (q.acceptedIds && q.acceptedIds.length) ? q.acceptedIds : [q.correctId];
    const ctx = q.contextId ? window.contextHtml(D.contexts[q.contextId]) : "";
    const opts = q.options.map((o, i) =>
      `<div class="opt ${acc.includes(o.id) ? "correct" : ""}" style="cursor:default">
         <span class="key">${LET[i]}</span><span class="txt">${window.optionHtml(o)}</span></div>`).join("");
    return `<div class="card" id="vq-${q.examCode}-${num}" style="margin-bottom:1.1rem">
      <div class="chips"><span class="chip part">חלק ${q.part}</span>
        <span class="chip">${q.topicLabel}</span>
        <span class="chip official">שאלה ${num} · תשובה: ${acc.join("+").toUpperCase()}</span></div>
      <div class="q-context">${ctx}</div>
      <div class="q-text">${window.richText(q.question)}</div>
      ${window.extrasHtml(q)}
      <div class="options-list">${opts}</div>
      <div class="feedback good" style="display:block">${window.richText(q.explanation || "")}</div>
    </div>`;
  }).join("");
  document.getElementById("app").appendChild(host);
  return { count: qs.length, scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth };
}

async function shotEl(page, id, name) {
  const el = await page.$("#" + id);
  if (!el) { console.log("MISSING", id); return; }
  await el.screenshot({ path: path.join(OUT, name + ".png") });
  console.log("shot:", name);
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: "new",
    args: ["--no-sandbox", "--force-color-profile=srgb", "--hide-scrollbars"]
  });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", e => errors.push("PAGEERROR: " + e.message));
  page.on("console", m => { if (m.type() === "error") errors.push("CONSOLE: " + m.text()); });

  // ---------- desktop dark ----------
  await page.setViewport({ width: 900, height: 1000, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle0" });
  const info = await page.evaluate(buildView);
  console.log("built", info.count, "questions | scrollW", info.scrollW, "clientW", info.clientW);
  await sleep(400);
  const exemplars = (process.env.SHOTS ? process.env.SHOTS.split(",") : [
    "vq-25B-A-1:chk-25B-A-q1-erd", "vq-25B-A-5:chk-25B-A-q5-dual", "vq-25B-A-14:chk-25B-A-q14-alg",
    "vq-23B-A-5:chk-23B-A-q5-sql", "vq-23B-A-14:chk-23B-A-q14-alg", "vq-23B-A-17:chk-23B-A-q17-fd"
  ]).map(s => s.split(":"));
  for (const [id, name] of exemplars) await shotEl(page, id, name);

  // ---------- mobile (overflow check) ----------
  const m = await browser.newPage();
  m.on("pageerror", e => errors.push("PAGEERROR(m): " + e.message));
  await m.setViewport({ width: 390, height: 780, deviceScaleFactor: 2, isMobile: true });
  await m.goto(URL, { waitUntil: "networkidle0" });
  const minfo = await m.evaluate(buildView);
  await sleep(400);
  const overflow = minfo.scrollW > minfo.clientW + 1;
  console.log(`mobile scrollW=${minfo.scrollW} clientW=${minfo.clientW} -> ${overflow ? "HORIZONTAL OVERFLOW!" : "no page overflow"}`);
  for (const [id, name] of exemplars) await shotEl(m, id, name.replace("chk-", "chk-m-"));

  console.log("\nerrors:", errors.length ? errors : "none");
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
