import { chromium } from 'playwright';
import fs from 'fs';

const files = fs.readdirSync('v5').filter(f => /^sa-.*\.html$/.test(f));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{ width:390, height:780 }, deviceScaleFactor:1 });

const rows = [];
for (const f of files) {
  await page.goto('http://localhost:8765/v5/'+f, { waitUntil:'networkidle' });
  await page.waitForTimeout(60);
  const d = await page.evaluate(() => {
    const de = document.documentElement;
    const over = de.scrollWidth - de.clientWidth;
    let top = null;
    if (over > 1) {
      let max = 0;
      document.querySelectorAll('*').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width > window.innerWidth + 1 && r.width > max && el.children.length <= 12) {
          max = r.width;
          top = { tag: el.tagName.toLowerCase(), cls: (el.className||'').toString().slice(0,30), w: Math.round(r.width) };
        }
      });
    }
    return { over, top };
  });
  if (d.over > 1) rows.push(`OVERFLOW ${d.over}px  ${f}  → ${d.top? d.top.tag+'.'+d.top.cls+' ('+d.top.w+'px)':''}`);
}
console.log(rows.length ? rows.join('\n') : 'No 390px overflow on any sa-* page');
console.log(`\n${rows.length} / ${files.length} sa-* pages overflow at 390px`);
await browser.close();
