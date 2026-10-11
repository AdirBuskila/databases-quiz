// Screenshot every ERD diagram in the course (tools/erd_preview.html), one PNG per diagram.
// usage: node tools/erd_shoot.js [levelId|test] [light|dark]   → tools/raw/erdshots/
const puppeteer = require("puppeteer-core");
const path = require("path"), fs = require("fs"), url = require("url");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = path.join(__dirname, "raw", "erdshots");
fs.mkdirSync(OUT, { recursive: true });
const only = process.argv[2] || "", theme = process.argv[3] || "light";
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });
  const page = await browser.newPage();
  const errs = [];
  page.on("pageerror", e => errs.push(e.message));
  page.on("console", m => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errs.push(m.text()); });
  await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 1.5 });
  const u = url.pathToFileURL(path.join(__dirname, "erd_preview.html")).href + (only && only !== "test" ? "?only=" + only : "");
  await page.evaluateOnNewDocument(t => { try { localStorage.setItem("dbq_theme", t); } catch (e) {} }, theme);
  await page.goto(u, { waitUntil: "load" });
  await page.evaluate(t => document.documentElement.dataset.theme = t, theme);
  const els = await page.$$(".pv");
  let n = 0;
  for (const el of els) {
    const k = await el.evaluate(e => e.dataset.k);
    if (only === "test" && !k.startsWith("test")) continue;
    if (only && only !== "test" && k.startsWith("test")) continue;
    await el.screenshot({ path: path.join(OUT, k.replace(/[^\w-]+/g, "_") + "-" + theme + ".png") }); n++;
  }
  console.log("shots:", n, "errors:", errs.length ? errs : "none");
  await browser.close();
})();
