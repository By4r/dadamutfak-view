// Mobil QA ölçüm scripti — DadaMutfak (CommonJS, NODE_PATH ile playwright bulur)
// Kullanım: NODE_PATH=/Users/dadaistanbul/.npm/_npx/9833c18b2d85bc59/node_modules \
//           node outputs/mobil-qa/measure.cjs <page.html> [--ss]
// 3 breakpoint: 390 (mobil), 768 (tablet), drawer (390 + ?drawer=1)
// Çıktı: JSON (stdout) — scrollWidth + clip-AWARE unclipped overflow + console err
// --ss verilirse outputs/mobil-qa/ss/<page>__<bp>.png full-page SS yazar
const { chromium } = require('playwright');

const BASE = 'http://localhost:8765/mockups/';
const SSDIR = '/Users/dadaistanbul/Developer/Projects/dadamutfak/outputs/mobil-qa/ss/';
const page = process.argv[2];
const wantSS = process.argv.includes('--ss');
if (!page) { console.error('page arg gerekli'); process.exit(1); }

// _overflow_probe ile aynı clip-aware mantık: scroll-container (overflow auto/scroll/hidden/clip)
// içindeki taşmalar KASITLI sayılır, atlanır. Sadece gerçek layout taşması raporlanır.
const OVERFLOW_FN = (VW) => {
  const off = [];
  const all = document.querySelectorAll('body *');
  for (const el of all) {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.right > VW + 1) {
      let p = el.parentElement, clipped = false;
      while (p) {
        const ps = getComputedStyle(p);
        if (['auto','scroll','hidden','clip'].includes(ps.overflowX)) { clipped = true; break; }
        p = p.parentElement;
      }
      if (!clipped) {
        const cls = (el.className && el.className.toString) ? el.className.toString().split(' ')[0] : '';
        off.push((el.tagName + '.' + cls).slice(0,46) + '@' + Math.round(r.right));
      }
    }
  }
  return {
    docSW: document.documentElement.scrollWidth,
    bodySW: document.body ? document.body.scrollWidth : 0,
    unclipped: off.length,
    items: off.slice(0, 20)
  };
};

const BREAKPOINTS = [
  { name: '390', w: 390, h: 2600, qs: '' },
  { name: '768', w: 768, h: 2200, qs: '' },
  { name: 'drawer', w: 390, h: 2600, qs: '?drawer=1' },
];

(async () => {
  const browser = await chromium.launch({ channel: 'chrome' }).catch(() => chromium.launch());
  const out = { page, results: {} };
  for (const bp of BREAKPOINTS) {
    const ctx = await browser.newContext({ viewport: { width: bp.w, height: bp.h }, deviceScaleFactor: 1 });
    const pg = await ctx.newPage();
    const errs = [];
    pg.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0,160)); });
    pg.on('pageerror', e => errs.push('PAGEERR:' + String(e.message).slice(0,160)));
    try {
      await pg.goto(BASE + page + bp.qs, { waitUntil: 'networkidle', timeout: 20000 });
      await pg.waitForTimeout(700);
      const m = await pg.evaluate(OVERFLOW_FN, bp.w);
      m.errs = errs.slice(0, 6);
      out.results[bp.name] = m;
      if (wantSS) {
        const fn = SSDIR + page.replace('.html','') + '__' + bp.name + '.png';
        await pg.screenshot({ path: fn, fullPage: true }).catch(() => {});
      }
    } catch (e) {
      out.results[bp.name] = { error: String(e.message).slice(0,160) };
    }
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(out));
})();
