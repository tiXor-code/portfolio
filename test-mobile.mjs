import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('https://teodorlutoiu.com/wip3/', { waitUntil: 'networkidle', timeout: 15000 });
await page.waitForTimeout(2000);

const screens = ['hero','about','university','play-for-democracy','brussels','ubisoft','leadership-school','ea','whats-next','projects','tech-stack','contact'];
let allPass = true;

for (const id of screens) {
  const el = await page.$('#' + id);
  if (!el) { console.log(`FAIL: ${id} NOT FOUND`); allPass = false; continue; }
  
  const dims = await el.evaluate(e => ({
    scrollH: e.scrollHeight,
    clientH: e.clientHeight,
  }));
  
  const ratio = dims.scrollH / 844;
  const status = ratio <= 1.15 ? 'OK' : ratio <= 1.5 ? 'WARN' : 'FAIL';
  if (status === 'FAIL') allPass = false;
  console.log(`${status}: ${id} - ${dims.scrollH}px (${ratio.toFixed(2)}x viewport)`);
}

console.log(allPass ? '\nALL PASS' : '\nSOME SECTIONS TOO TALL');
await browser.close();
