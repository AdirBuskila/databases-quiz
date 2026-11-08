// Video course UI check ("🎬 קורס וידאו": videos.js from tools/video/build_manifest.py + video-ui.js), in the real app
// (file://, headless Chrome). usage: node tools/video_ui_check.js [mobile]
// header entry -> list of every video -> player (local MP4 or "not uploaded yet" note) -> next -> watched mark ->
// practice opens the video's own guided lesson -> lesson button -> back -> home promo count -> ?video=<ID> deep link.
const puppeteer = require("puppeteer-core");
const path = require("path"), url = require("url");
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const ROOT = path.join(__dirname, "..");
const mobile = process.argv.includes("mobile");
let bad = 0;
const ok = (c, m) => { console.log((c ? "ok   " : "FAIL ") + m); if (!c) bad++; };
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--no-sandbox", "--hide-scrollbars"] });
  const page = await browser.newPage();
  await page.setViewport(mobile ? { width: 390, height: 844, deviceScaleFactor: 1 } : { width: 1280, height: 900 });
  const errs = [];
  page.on("pageerror", e => errs.push(e.message));
  page.on("console", m => { if (m.type() === "error" && !/goatcounter|ERR_|net::/i.test(m.text())) errs.push(m.text()); });
  const home = url.pathToFileURL(path.join(ROOT, "index.html")).href;
  await page.goto(home, { waitUntil: "load" });
  await page.evaluate(() => localStorage.clear());
  await page.goto(home, { waitUntil: "load" });
  const vis = sel => page.evaluate(s => { const e = document.querySelector(s); return !!e && !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length); }, sel);
  const all = await page.evaluate(() => (window.VIDEO_UI && window.VIDEO_UI.all || []).map(v => ({ id: v.id, level: v.level, course: v.course.id, youtube: v.youtube })));
  ok(all.length > 0, `videos.js lists ${all.length} videos`);
  const map = await page.evaluate(() => (window.VIDEO_COURSE.courses || []).every(c => c.videos.every(v => ((window.COURSES[c.id] || {}).levels || []).some(L => L.id === v.level))));
  ok(map, "every video maps to a guided level of its course");
  ok(await vis("#vidEntry") && await vis(".vid-promo"), "header entry and home promo are shown");
  if (mobile) {
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    ok(over <= 0, `mobile: no horizontal overflow on home (${over}px)`);
  }
  await page.click("#vidEntry");
  ok(await vis("#screen-video") && await vis("#vidListView"), "header entry opens the list");
  ok(await page.$$eval("#vidCourses .vid-row", r => r.length) === all.length, "list shows every video");
  if (mobile) {
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    ok(over <= 0, `mobile: no horizontal overflow on the list (${over}px)`);
  }
  const first = all[0];
  await page.click(`.vid-row[data-vid="${first.id}"]`);
  ok(await vis("#vidPlayView"), `${first.id}: player opens`);
  if (!first.youtube) {
    const src = await page.$eval("#vidFrame video", v => v.getAttribute("src")).catch(() => null);
    ok(src === `videos/out/${first.id}/${first.id}.mp4`, `${first.id}: no youtube id -> local <video> (${src})`);
    await page.$eval("#vidFrame video", v => v.dispatchEvent(new Event("error")));
    ok(!!await page.$("#vidFrame .vid-missing"), "load error -> 'not uploaded yet' note");
  }
  await page.evaluate(id => { const v = window.VIDEO_UI.all.find(x => x.id === id); v.youtube = "AbCdEfGhIjK"; window.VIDEO_UI.openVideo(id); }, first.id);
  // file:// plays the local MP4 first, then falls back to the embed (the fake id must still be set when the error fires)
  await page.$eval("#vidFrame video", v => v.dispatchEvent(new Event("error"))).catch(() => {});
  await page.evaluate(id => { delete window.VIDEO_UI.all.find(x => x.id === id).youtube; }, first.id);
  const ifr = await page.$eval("#vidFrame iframe", f => f.getAttribute("src")).catch(() => "");
  ok(ifr.startsWith("https://www.youtube-nocookie.com/embed/AbCdEfGhIjK"), "youtube id -> youtube-nocookie embed");
  ok(await page.$eval("#vidPrev", b => b.disabled) && !await page.$eval("#vidNext", b => b.disabled), "first video: prev disabled, next enabled");
  // the jump must land in the video's own course: take the 2nd course's first video
  const i2 = all.findIndex(v => v.course !== first.course), v2 = all[i2];
  await page.evaluate(id => window.VIDEO_UI.openVideo(id), all[i2 - 1].id);
  await page.click("#vidNext");
  ok((await page.$eval("#vidHead", e => e.textContent)).includes(v2.id), `next -> ${v2.id}`);
  await page.click("#vidWatchBtn");
  const st = await page.evaluate(() => JSON.parse(localStorage.getItem("dbq_video_v1") || "{}"));
  ok(!!(st.watched && st.watched[v2.id]), "watched mark saved in dbq_video_v1");
  await page.click("#vidLevel");
  const lessonOk = await page.evaluate((cid, lid) => {
    const L = window.COURSES[cid].levels.find(x => x.id === lid);
    const s = document.querySelector("#crsLessonView");
    return !!s && !s.classList.contains("hidden") && document.querySelector("#crsLesson").textContent.includes(L.title);
  }, v2.course, v2.level);
  ok(lessonOk, `${v2.id}: practice opens its guided lesson (${v2.course}/${v2.level})`);
  const lb = await page.$$eval("#crsLesson .vid-open", b => b.map(x => x.dataset.vid));
  ok(lb.length === 1 && lb[0] === v2.id, `lesson shows its own video button (${lb.join()})`);
  await page.click(`#crsLesson .vid-open[data-vid="${v2.id}"]`);
  ok(await vis("#vidPlayView") && (await page.$eval("#vidBack", b => b.textContent)).includes("לשיעור"), "lesson button opens the player");
  await page.click("#vidBack");
  ok(await vis("#crsLessonView"), "back from the player returns to the lesson");
  await page.evaluate(id => window.VIDEO_UI.openVideo(id), first.id);
  await page.click("#brandHome");
  await new Promise(r => setTimeout(r, 300));
  ok(!await vis("#screen-video") && await vis("#screen-start"), "brand click from the player goes home");
  ok(/צפית ב-1 /.test(await page.$eval("#vidPromoSub", e => e.textContent)), "home promo shows the watched count");
  const last = all[all.length - 1];
  await page.goto(home + `?video=${last.id}`, { waitUntil: "load" });
  ok(await vis("#vidPlayView") && (await page.$eval("#vidHead", e => e.textContent)).includes(last.id), `?video=${last.id} deep link opens the player`);
  ok(await page.$eval("#vidLevel", b => b.style.display !== "none"), "deep link finds the guided level (practice button shown)");
  ok(errs.length === 0, "no JS errors" + (errs.length ? ": " + errs.join(" | ") : ""));
  await browser.close();
  console.log(bad ? `${bad} FAILED` : "video UI: all checks passed");
  process.exit(bad ? 1 : 0);
})();
