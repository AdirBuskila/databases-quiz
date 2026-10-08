// Per-question screenshots for a rendering review: one PNG per question, shown answered
// (correct option picked, so the feedback + explanation are visible too).
//   node tools/shoot_questions.js <topic|all> [outDir] [--id=<questionId>] [--width=820]
// Needs the local server: python -m http.server 8137
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = process.env.APP_URL || "http://127.0.0.1:8137/index.html";
const args = process.argv.slice(2);
const flag = k => (args.find(a => a.startsWith("--" + k + "=")) || "").split("=")[1];
const [topic = "all", outArg] = args.filter(a => !a.startsWith("--"));
const OUT = outArg || path.join(__dirname, "raw", "qshots", topic);
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: "new",
    args: ["--no-sandbox", "--force-color-profile=srgb", "--hide-scrollbars"]
  });
  const page = await browser.newPage();
  page.on("pageerror", e => console.log("PAGEERROR:", e.message));
  await page.setViewport({ width: parseInt(flag("width") || "820", 10), height: 900, deviceScaleFactor: 1.5 });
  await page.goto(URL, { waitUntil: "networkidle0" });
  await page.evaluate(() => { window.scrollTo = () => {}; });   // show() smooth-scrolls; keep shots stable

  const ids = await page.evaluate((t, one) => QS
    .filter(q => (one ? q.id === one : (t === "all" || q.topic === t)))
    .map(q => q.id), topic, flag("id"));

  for (const id of ids) {
    await page.evaluate(id => {
      const q = QS.find(x => x.id === id);
      S.mode = "practice"; S.pool = [q]; S.pos = 0; S.hist = []; S.hpos = 0;
      show("screen-quiz"); renderQuestion();
      choose(S.current.correctDisplay);
    }, id);
    await new Promise(r => setTimeout(r, 120));
    const el = await page.$("#screen-quiz");
    await el.screenshot({ path: path.join(OUT, id + ".png") });
  }
  console.log(`shot ${ids.length} questions -> ${OUT}`);
  await browser.close();
})();
