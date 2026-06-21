import { chromium } from 'playwright';

const KEY = [
  'sa-isletme-isletmeler','sa-saglik-diyetisyenler','sa-admin-kullanicilar','sa-admin',
  'sa-store-siparisler','sa-store-urunler','sa-isletme-rezervasyonlar','sa-saglik-randevular',
  'sa-admin-tarifler','sa-dadafit-egzersizler',
];
const browser = await chromium.launch();
const report = [];
let allOk = true;

// --- 390px ---
const m = await browser.newPage({ viewport:{ width:390, height:780 }, deviceScaleFactor:1 });
report.push('=== 390px ===');
for (const f of KEY) {
  const errs = [];
  m.on('pageerror', e => errs.push(e.message));
  await m.goto('http://localhost:8765/v5/'+f+'.html', { waitUntil:'networkidle' });
  await m.waitForTimeout(60);
  const d = await m.evaluate(() => {
    const doc = document.documentElement.scrollWidth;
    const b = document.querySelector('.pc-body');
    const ox = b ? getComputedStyle(b).overflowX : null;
    const canScroll = b ? b.scrollWidth > b.clientWidth : false;
    const cols = document.querySelectorAll('.ptable thead th').length;
    const visCols = Array.from(document.querySelectorAll('.ptable thead th')).filter(th=>th.offsetParent!==null).length;
    return { doc, ox, canScroll, cols, visCols, tableW: b?b.scrollWidth:0, bodyW: b?b.clientWidth:0 };
  });
  const ok = d.doc <= 391 && d.ox === 'auto';
  if (!ok || errs.length) allOk = false;
  report.push(`  ${ok&&!errs.length?'OK':'XX'} ${f}  doc=${d.doc}px  pc-body.overflowX=${d.ox}  scroll=${d.canScroll}(${d.tableW}>${d.bodyW})  kolon=${d.visCols}/${d.cols}  jsErr=${errs.length}`);
  m.removeAllListeners('pageerror');
}
await m.close();

// --- 1440px desktop no-regression ---
const dk = await browser.newPage({ viewport:{ width:1440, height:900 } });
report.push('\n=== 1440px (regresyon yok) ===');
for (const f of ['sa-isletme-isletmeler','sa-admin-kullanicilar','sa-store-urunler']) {
  await dk.goto('http://localhost:8765/v5/'+f+'.html', { waitUntil:'networkidle' });
  const d = await dk.evaluate(() => {
    const doc = document.documentElement.scrollWidth;
    const b = document.querySelector('.pc-body');
    return { doc, hScroll: b ? b.scrollWidth > b.clientWidth : false };
  });
  const ok = d.doc <= 1441 && !d.hScroll;
  if (!ok) allOk = false;
  report.push(`  ${ok?'OK':'XX'} ${f}  doc=${d.doc}px  tabloKayar=${d.hScroll} (masaüstünde scrollbar olmamalı)`);
}
await dk.close();

console.log(report.join('\n'));
console.log(allOk ? '\n==== PASS ====' : '\n==== FAIL ====');
await browser.close();
process.exit(allOk?0:1);
