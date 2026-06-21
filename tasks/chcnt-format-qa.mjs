import { chromium } from 'playwright';

const PAGES = [
  'sa-admin-kullanicilar','sa-admin-sayfalar','sa-store-urunler','sa-store-siparisler',
  'sa-store-musteriler','sa-store-kategoriler','sa-store-promosyonlar',
  'sa-dadafit-challenge','sa-dadafit-egzersizler','sa-dadafit-programlar',
  'sa-admin-sefler','sa-admin-slider','sa-admin-tarifler','sa-dadafit-antrenorler',
  'sa-saglik-diyetisyenler','sa-saglik-hesaplayicilar','sa-saglik-randevular',
  'sa-saglik-receteler','sa-saglik-testler','sa-isletme-isletmeler','sa-isletme-menuler',
  'sa-isletme-onaylar','sa-isletme-reklam','sa-isletme-rezervasyonlar',
];

const compact = new Intl.NumberFormat('tr-TR', { notation:'compact', maximumFractionDigits:1 });
const grouped = new Intl.NumberFormat('tr-TR');
const expFmt = n => n < 1000 ? String(n) : compact.format(n);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{ width:1440, height:1000 } });
const report = [];
let allOk = true;

for (const f of PAGES) {
  const errors = [];
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERR '+e.message));
  await page.goto('http://localhost:8765/v6/'+f+'.html', { waitUntil:'networkidle' });
  await page.waitForTimeout(80);

  const data = await page.evaluate(() => {
    const spans = Array.from(document.querySelectorAll('.ch-cnt')).map(s => ({
      raw: s.dataset.cntRaw, shown: s.textContent, title: s.title
    }));
    const overflows = Array.from(document.querySelectorAll('.chips')).map(c => c.scrollWidth - c.clientWidth);
    return { spans, overflows, hasHelper: !!window.saChCnt };
  });

  let ok = data.hasHelper && errors.length===0;
  const maxOverflow = Math.max(0, ...data.overflows);
  if (maxOverflow > 1) ok = false;
  const bad = [];
  for (const s of data.spans) {
    const n = parseInt(s.raw,10);
    if (isNaN(n)) { bad.push('NaN raw'); continue; }
    if (s.shown !== expFmt(n)) bad.push(`shown "${s.shown}"!=exp "${expFmt(n)}"`);
    if (s.title !== grouped.format(n)) bad.push(`title "${s.title}"!=exp "${grouped.format(n)}"`);
  }
  if (bad.length) ok = false;
  if (!ok) allOk = false;

  const big = data.spans.filter(s => parseInt(s.raw,10) >= 1000).map(s => `${s.raw}→"${s.shown}"`);
  report.push(`${ok?'OK ':'XX '} ${f}  helper:${data.hasHelper?'y':'N'} chips:${data.spans.length} ovf:${maxOverflow}px jsErr:${errors.length}${big.length?'  BIG['+big.join(', ')+']':''}${bad.length?'  BAD['+bad.join('; ')+']':''}`);

  page.removeAllListeners('console'); page.removeAllListeners('pageerror');
}

// ---- STRES TESTİ ----
report.push('\n=== STRES TESTİ (sa-admin-kullanicilar, ilk chip) ===');
await page.goto('http://localhost:8765/v6/sa-admin-kullanicilar.html', { waitUntil:'networkidle' });
async function inject(val){
  return await page.evaluate(v => {
    const span = document.querySelector('.ch-cnt');
    if (v !== null) window.saChCnt.set(span, v);
    const chips = document.querySelector('.chips');
    return { shown: span.textContent, title: span.title, raw: span.dataset.cntRaw,
             chipBroke: span.getBoundingClientRect().height > 40,
             overflow: chips.scrollWidth - chips.clientWidth };
  }, val);
}
const orig = await inject(null);
report.push(`  başlangıç:   shown="${orig.shown}" title="${orig.title}" ovf=${orig.overflow}px`);
const s500 = await inject(500000);
report.push(`  500000  →   shown="${s500.shown}" title="${s500.title}" ovf=${s500.overflow}px chipBozuk=${s500.chipBroke}`);
const s125 = await inject(1250000);
report.push(`  1250000 →   shown="${s125.shown}" title="${s125.title}" ovf=${s125.overflow}px chipBozuk=${s125.chipBroke}`);
const back = await inject(parseInt(orig.raw,10));
report.push(`  geri al →   shown="${back.shown}" title="${back.title}" ovf=${back.overflow}px`);

const stressOk = s500.shown==='500 B'.replace(' ',' ') === false ? true : true; // computed below
const ok500 = s500.shown === compact.format(500000) && s500.overflow<=1 && !s500.chipBroke;
const ok125 = s125.shown === compact.format(1250000) && s125.overflow<=1 && !s125.chipBroke;
const okBack = back.shown === orig.shown;
report.push(`  → 500B:${ok500?'OK':'XX'} (exp "${compact.format(500000)}")  1,?Mn:${ok125?'OK':'XX'} (exp "${compact.format(1250000)}")  restore:${okBack?'OK':'XX'}`);
if (!(ok500 && ok125 && okBack)) allOk = false;

console.log(report.join('\n'));
console.log(allOk ? '\n==== ALL PASS (24 sayfa + stres) ====' : '\n==== FAIL ====');
await browser.close();
process.exit(allOk?0:1);
