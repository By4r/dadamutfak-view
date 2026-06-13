import pkg from '/Users/dadaistanbul/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.js';
const { chromium } = pkg;

const FILES = process.argv.slice(2);
const BASE = 'http://localhost:8765/mockups/';

const ctx = await chromium.launchPersistentContext('/tmp/t5-chrome-prof', {
  channel: 'chrome', headless: true, viewport: { width: 1280, height: 900 },
});
const page = await ctx.newPage();
await page.route('**/*', r => r.continue());
let cb = 1000;

async function scrollY() { return page.evaluate(() => window.scrollY); }
async function scrollToY(target) {
  await page.mouse.move(640, 450);
  let last = -1, y = await scrollY();
  let guard = 0;
  while (y < target - 5 && y !== last && guard++ < 60) {
    last = y;
    await page.mouse.wheel(0, Math.min(700, target - y));
    await page.waitForTimeout(30);
    y = await scrollY();
  }
  return y;
}

for (const f of FILES) {
  await page.goto(BASE + f + '.html?cb=' + (cb++), { waitUntil: 'load' });
  await page.waitForTimeout(150);
  // reset scroll
  await page.mouse.move(640, 450); await page.mouse.wheel(0, -5000); await page.waitForTimeout(50);

  const plan = await page.evaluate(() => {
    const classOf = el => '.' + (el.className || '').toString().split(/\s+/).filter(Boolean).slice(0, 2).join('.');
    const els = [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'sticky');
    const items = [];
    for (const el of els) {
      const cs = getComputedStyle(el);
      if (cs.top === 'auto') continue;
      const offset = parseFloat(cs.top) || 0;
      const r = el.getBoundingClientRect();
      const naturalTop = r.top + window.scrollY;
      const elH = r.height;
      const pr = el.parentElement.getBoundingClientRect();
      const parentBottom = pr.bottom + window.scrollY;
      const engage = naturalTop - offset;
      const maxStick = parentBottom - elH - offset;
      el.setAttribute('data-probe', items.length);
      items.push({ idx: items.length, sel: classOf(el), offset, naturalTop: Math.round(naturalTop), engage: Math.round(engage), maxStick: Math.round(maxStick), travel: Math.round(maxStick - engage) });
    }
    return items;
  });

  const results = [];
  for (const it of plan) {
    if (it.engage < 0 || it.travel < 100) { results.push({ ...it, verdict: 'skip(no-travel)' }); continue; }
    const target = Math.min(it.engage + 250, it.maxStick - 30);
    const actualY = await scrollToY(target);
    const topNow = await page.evaluate(i => document.querySelector(`[data-probe="${i}"]`).getBoundingClientRect().top, it.idx);
    const ok = Math.abs(topNow - it.offset) <= 30;
    results.push({ sel: it.sel, offset: it.offset, target, actualY, topNow: Math.round(topNow), verdict: ok ? 'STICK-OK' : 'BROKEN' });
    await page.mouse.wheel(0, -99999); await page.waitForTimeout(40);
  }
  console.log('### ' + f);
  for (const r of results) console.log('   ', JSON.stringify(r));
}
await ctx.close();
