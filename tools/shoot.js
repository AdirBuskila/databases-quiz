// Screenshot driver for the approval gate. Loads the app from the local server,
// drives practice sessions per topic, and captures desktop + mobile + light/dark.
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = process.env.APP_URL || "http://127.0.0.1:8137/index.html";
const OUT = path.join(__dirname, "raw", "shots");
fs.mkdirSync(OUT, { recursive: true });

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function shoot(page, name, full = true) {
  await sleep(350);
  await page.screenshot({ path: path.join(OUT, name + ".png"), fullPage: full });
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

  // ---- desktop ----
  await page.setViewport({ width: 1000, height: 900, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: "networkidle0" });
  await shoot(page, "01-start-dark");

  const topics = [
    ["erd", "02-erd"],
    ["sql", "03-sql"],
    ["relalg", "04-relalg"],
    ["fd_norm", "05-fd"],
  ];
  for (const [topic, label] of topics) {
    await page.click(`button.topic-btn[data-topic="${topic}"]`);
    await page.click("#startBtn");
    await sleep(300);
    await shoot(page, label + "-a-question");
    // answer the first displayed option to reveal feedback + correct/wrong highlighting
    await page.click('.opt[data-disp="0"]');
    await sleep(200);
    await shoot(page, label + "-b-answered");
    // back home
    await page.click("#brandHome");
    await sleep(250);
  }

  // ---- light theme, start ----
  await page.click("#themeToggle");
  await sleep(200);
  await shoot(page, "06-start-light");
  // a SQL question in light theme
  await page.click(`button.topic-btn[data-topic="sql"]`);
  await page.click("#startBtn");
  await sleep(300);
  await page.click('.opt[data-disp="0"]');
  await sleep(200);
  await shoot(page, "07-sql-light-answered");
  await page.click("#themeToggle"); // back to dark for consistency (persists in localStorage though)

  // ---- mobile ----
  const page2 = await browser.newPage();
  page2.on("pageerror", e => errors.push("PAGEERROR(m): " + e.message));
  await page2.setViewport({ width: 390, height: 780, deviceScaleFactor: 2, isMobile: true });
  await page2.goto(URL, { waitUntil: "networkidle0" });
  await sleep(300);
  await page2.screenshot({ path: path.join(OUT, "08-mobile-start.png"), fullPage: true });
  console.log("shot: 08-mobile-start");
  await page2.click(`button.topic-btn[data-topic="sql"]`);
  await page2.click("#startBtn");
  await sleep(300);
  await page2.screenshot({ path: path.join(OUT, "09-mobile-sql.png"), fullPage: true });
  console.log("shot: 09-mobile-sql");
  await page2.click(`button.part-btn[data-part="all"]`).catch(()=>{});
  // relalg on mobile (tables + math)
  await page2.click("#brandHome"); await sleep(250);
  await page2.click(`button.topic-btn[data-topic="relalg"]`);
  await page2.click("#startBtn"); await sleep(300);
  await page2.screenshot({ path: path.join(OUT, "10-mobile-relalg.png"), fullPage: true });
  console.log("shot: 10-mobile-relalg");

  console.log("\nerrors:", errors.length ? errors : "none");
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
