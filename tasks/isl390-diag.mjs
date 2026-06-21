import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{ width:390, height:780 }, deviceScaleFactor:1 });
await page.goto('http://localhost:8765/v5/sa-isletme-isletmeler.html', { waitUntil:'networkidle' });
await page.waitForTimeout(150);

const diag = await page.evaluate(() => {
  const de = document.documentElement;
  const out = { docScrollW: de.scrollWidth, docClientW: de.clientWidth, vw: window.innerWidth };
  // find elements wider than viewport
  const offenders = [];
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > window.innerWidth + 1) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className && el.className.toString) ? el.className.toString().slice(0,40) : '',
        id: el.id || '',
        w: Math.round(r.width),
        right: Math.round(r.right),
        scrollW: el.scrollWidth
      });
    }
  });
  // table specifics
  const t = document.querySelector('#islTable');
  const ths = Array.from(document.querySelectorAll('#islTable thead th')).map(th => ({
    label: th.textContent.trim(), w: Math.round(th.getBoundingClientRect().width)
  }));
  const card = document.querySelector('.pnl-card');
  const body = document.querySelector('.pc-body');
  out.table = t ? { w: Math.round(t.getBoundingClientRect().width), scrollW: t.scrollWidth } : null;
  out.cardW = card ? Math.round(card.getBoundingClientRect().width) : null;
  out.bodyW = body ? Math.round(body.getBoundingClientRect().width) : null;
  out.bodyOverflowX = body ? getComputedStyle(body).overflowX : null;
  out.cols = ths;
  out.offenders = offenders.slice(0, 25);
  return out;
});

console.log(JSON.stringify(diag, null, 2));
await browser.close();
