// Print docs/formula-sheet/index.html to a 2-page A4 PDF with the repo's puppeteer-core + local Chrome,
// and report how much vertical room each column has left (negative = overflow, clipped in print).
//   node docs/formula-sheet/render.js
const path = require("path");
const fs = require("fs");
const { pathToFileURL } = require("url");
const puppeteer = require(path.join(__dirname, "..", "..", "tools", "node_modules", "puppeteer-core"));
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const HTML = path.join(__dirname, "index.html");
const OUT = path.join(__dirname, "formula-sheet.pdf");

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.emulateMediaType("print");
  await page.goto(pathToFileURL(HTML).href, { waitUntil: "networkidle0" });
  const report = await page.evaluate(() =>
    [...document.querySelectorAll(".col")].map((c) => {
      const top = c.getBoundingClientRect().top;
      const used = Math.round(Math.max(...[...c.children].map(k => k.getBoundingClientRect().bottom)) - top);
      return { col: c.dataset.name || "?", fit: c.clientHeight, used, free: c.clientHeight - used };
    }));
  for (const r of report) console.log(`${r.col.padEnd(10)} fit=${r.fit}px used=${r.used}px free=${r.free}px${r.free < 0 ? "   <-- OVERFLOW" : ""}`);
  await page.pdf({ path: OUT, format: "A4", printBackground: true, preferCSSPageSize: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 } });
  await browser.close();
  console.log("wrote", OUT, fs.statSync(OUT).size, "bytes");
  if (report.some(r => r.free < 0)) process.exitCode = 2;
})().catch(e => { console.error(e); process.exit(1); });
