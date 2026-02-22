import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('https://teodorlutoiu.com/wip3/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(3000);

const screens = ['hero','about','university','play-for-democracy','brussels','ubisoft','leadership-school','ea','whats-next','projects','tech-stack','contact'];
const dir = '/tmp/wip3-screens';
fs.mkdirSync(dir, { recursive: true });

for (const id of screens) {
  const el = await page.$('#' + id);
  if (!el) { console.log(id + ': NOT FOUND'); continue; }
  
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  
  const dims = await el.evaluate(e => ({
    scrollH: e.scrollHeight,
    clientH: e.clientHeight,
    style_height: getComputedStyle(e).height,
    style_overflow: getComputedStyle(e).overflow,
    style_minHeight: getComputedStyle(e).minHeight,
  }));
  
  const overflows = dims.scrollH > dims.clientH + 10;
  console.log(`${id}: scrollH=${dims.scrollH} clientH=${dims.clientH} overflow=${overflows} h=${dims.style_height} oh=${dims.style_overflow} minH=${dims.style_minHeight}`);
  
  await page.screenshot({ path: path.join(dir, id + '.png') });
}

const snap = await page.evaluate(() => {
  const c = document.querySelector('.scroll-snap-container');
  const s = getComputedStyle(c);
  return { snapType: s.scrollSnapType, height: s.height, overflow: s.overflowY };
});
console.log('\nSnap container:', JSON.stringify(snap));

await browser.close();
