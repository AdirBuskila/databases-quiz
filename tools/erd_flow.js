// End-to-end check of the ERD course UI in the real app (file://, no server needed).
// usage: node tools/erd_flow.js [levelId=L01] [light|dark] [mobile]
// map → lesson → answer every question (alternating right/wrong) → summary → zoom → exit paths.
const puppeteer = require("puppeteer-core");
const path = require("path"), fs = require("fs"), url = require("url");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = path.join(__dirname, "raw", "erdflow"); fs.mkdirSync(OUT, { recursive: true });
const [lvl = "L01", theme = "light", mob] = process.argv.slice(2);
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });
  const page = await browser.newPage();
  const errs = [];
  page.on("pageerror", e => errs.push("PAGEERROR " + e.message));
  page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
  await page.setViewport(mob ? { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true } : { width: 1100, height: 900, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(t => { try { localStorage.setItem("dbq_theme", t); localStorage.removeItem("dbq_erd_v1"); } catch (e) {} }, theme);
  const base = url.pathToFileURL(path.join(__dirname, "..", "index.html")).href;
  await page.goto(base, { waitUntil: "load" });
  const tag = `${lvl}-${theme}${mob ? "-m" : ""}`;
  const shot = async n => { await sleep(250); await page.screenshot({ path: path.join(OUT, `${tag}-${n}.png`), fullPage: true }); };
  await shot("0-start");
  await page.click("#erdPromo"); await shot("1-map");
  await page.click(`.erd-lvl[data-id="${lvl}"]`); await shot("2-lesson");
  await page.click("#erdLessonGo");
  const n = await page.evaluate(id => ERD_COURSE.find(l => l.id === id).questions.length, lvl);
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
  const sum = await page.evaluate(() => document.querySelector("#erdSum .big").textContent);
  // zoom: start the level again, click the diagram, the lightbox shows the svg clone
  await page.evaluate(() => document.querySelector('#erdSum [data-act="retry"]').click());
  await sleep(150);
  const hasSvg = await page.evaluate(() => !!document.querySelector("#qContext .erd-svg"));
  if (hasSvg) { await page.evaluate(() => document.querySelector("#qContext .erd-svg").dispatchEvent(new MouseEvent("click", { bubbles: true }))); await shot("6-zoom");
    const zoomOk = await page.evaluate(() => !document.querySelector("#lightbox").classList.contains("hidden") && !!document.querySelector("#lightboxSvg svg"));
    if (!zoomOk) errs.push("zoom did not open");
    await page.click("#lightboxClose"); }
  await page.click("#quitBtn"); await sleep(150);
  const backAt = await page.evaluate(() => [...document.querySelectorAll(".screen")].find(s => !s.classList.contains("hidden")).id + "/" + ["erdMapView","erdLessonView","erdSumView"].find(v => !document.getElementById(v).classList.contains("hidden")));
  const mode = await page.evaluate(() => S.mode);
  // main bank stats untouched by the course
  const mainStats = await page.evaluate(() => JSON.parse(localStorage.getItem("dbq_progress_v1") || "null"));
  const store = await page.evaluate(() => localStorage.getItem("dbq_erd_v1"));
  // hand-off to the real exam ERD questions
  await page.evaluate(() => ERDC.openMap());
  await page.evaluate(() => { ERDC.startLevel(ERD_COURSE[ERD_COURSE.length-1]); });
  await page.evaluate(() => { document.querySelector("#quitBtn").click(); });
  console.log(JSON.stringify({ level: lvl, questions: n, summary: sum, quitTo: backAt, modeAfterQuit: mode,
    mainStatsTouched: !!(mainStats && mainStats.stats && mainStats.stats.answered), store, overflowAtQ: overflow, errors: errs }, null, 1));
  await browser.close();
})();
