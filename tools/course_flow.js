// End-to-end check of a guided course (ERD / SQL) in the real app (file://, no server needed).
// usage: node tools/course_flow.js <erd|sql|norm|alg> [levelId] [light|dark] [mobile]
// map → lesson → answer every question (alternating right/wrong) → summary → zoom → exit paths.
const puppeteer = require("puppeteer-core");
const path = require("path"), fs = require("fs"), url = require("url");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = path.join(__dirname, "raw", "courseflow"); fs.mkdirSync(OUT, { recursive: true });
const [crs = "erd", lvlArg, theme = "light", mob] = process.argv.slice(2);
const META = { erd: ["L01", "ERD_COURSE", "dbq_erd_v1"], sql: ["S01", "SQL_COURSE", "dbq_sql_v1"],
  norm: ["N01", "NORM_COURSE", "dbq_norm_v1"], alg: ["A01", "ALG_COURSE", "dbq_alg_v1"] }[crs];
const lvl = lvlArg || META[0], ARR = META[1], STORE = META[2];
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });
  const page = await browser.newPage();
  const errs = [];
  page.on("pageerror", e => errs.push("PAGEERROR " + e.message));
  page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
  await page.setViewport(mob ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true } : { width: 1100, height: 900, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(t => { try { localStorage.setItem("dbq_theme", t); ["dbq_erd_v1","dbq_sql_v1","dbq_norm_v1","dbq_alg_v1"].forEach(k => localStorage.removeItem(k)); } catch (e) {} }, theme);
  const base = url.pathToFileURL(path.join(__dirname, "..", "index.html")).href;
  await page.goto(base, { waitUntil: "load" });
  const tag = `${crs}-${lvl}-${theme}${mob ? "-m" : ""}`;
  const shot = async n => { await sleep(250); await page.screenshot({ path: path.join(OUT, `${tag}-${n}.png`), fullPage: true }); };
  await shot("0-start");
  await page.click(`.crs-promo[data-course="${crs}"]`); await shot("1-map");
  await page.click(`.crs-lvl[data-id="${lvl}"]`); await shot("2-lesson");
  await page.click("#crsLessonGo");
  const n = await page.evaluate((a, id) => window[a].find(l => l.id === id).questions.length, ARR, lvl);
  const overflow = [];
  for (let i = 0; i < n; i++) {
    await sleep(120);
    // correct option = the one whose display index is in the view's correctSet; answer wrong on every 3rd
    const disp = await page.evaluate(i => { const v = S.current; const c = [...v.correctSet][0]; return i % 3 === 2 ? (c + 1) % v.order.length : c; }, i);
    if (i === 0) await shot("3-q1");
    await page.click(`.opt[data-disp="${disp}"]`);
    const ow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    if (ow) overflow.push(i + 1);
    if (i === 0 || i === n - 1) await shot(`4-q${i + 1}-answered`);
    await page.click("#nextBtn");
  }
  await shot("5-summary");
  const sum = await page.evaluate(() => document.querySelector("#crsSum .big").textContent);
  // zoom: start the level again, click the diagram, the lightbox shows the svg clone
  await page.evaluate(() => document.querySelector('#crsSum [data-act="retry"]').click());
  await sleep(150);
  const hasSvg = await page.evaluate(() => !!document.querySelector("#qContext .erd-svg"));
  if (hasSvg) { await page.evaluate(() => document.querySelector("#qContext .erd-svg").dispatchEvent(new MouseEvent("click", { bubbles: true }))); await shot("6-zoom");
    const zoomOk = await page.evaluate(() => !document.querySelector("#lightbox").classList.contains("hidden") && !!document.querySelector("#lightboxSvg svg"));
    if (!zoomOk) errs.push("zoom did not open");
    await page.click("#lightboxClose"); }
  await page.click("#quitBtn"); await sleep(150);
  const backAt = await page.evaluate(() => [...document.querySelectorAll(".screen")].find(s => !s.classList.contains("hidden")).id + "/" + ["crsMapView","crsLessonView","crsSumView"].find(v => !document.getElementById(v).classList.contains("hidden")));
  const mode = await page.evaluate(() => S.mode);
  // main bank stats untouched by the course
  const mainStats = await page.evaluate(() => JSON.parse(localStorage.getItem("dbq_progress_v1") || "null"));
  const store = await page.evaluate(s => localStorage.getItem(s), STORE);
  // hand-off to the real exam ERD questions
  console.log(JSON.stringify({ level: lvl, questions: n, summary: sum, quitTo: backAt, modeAfterQuit: mode,
    mainStatsTouched: !!(mainStats && mainStats.stats && mainStats.stats.answered), store, overflowAtQ: overflow, errors: errs }, null, 1));
  await browser.close();
})();
