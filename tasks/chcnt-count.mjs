import { chromium } from 'playwright';

const PAGES = [
  { f:'sa-admin-kullanicilar', chip:'#roleChips .chip' },
  { f:'sa-admin-sayfalar',     chip:'#stChips .chip' },
  { f:'sa-store-urunler',      chip:'.chips .chip' },
  { f:'sa-store-siparisler',   chip:'.chips .chip' },
  { f:'sa-store-musteriler',   chip:'.chips .chip' },
  { f:'sa-store-kategoriler',  chip:'.chips .chip' },
  { f:'sa-store-promosyonlar', chip:'.chips .chip' },
  { f:'sa-dadafit-challenge',  chip:'#filterChips .chip' },
  { f:'sa-dadafit-egzersizler',chip:'#filterChips .chip' },
  { f:'sa-dadafit-programlar', chip:'#filterChips .chip' },
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const P of PAGES) {
  await page.goto('http://localhost:8765/v5/' + P.f + '.html', { waitUntil:'networkidle' });
  const chips = await page.$$(P.chip);
  const out = [];
  for (let i=0;i<chips.length;i++){
    // re-query each loop (DOM may re-render)
    const cs = await page.$$(P.chip);
    const label = (await cs[i].innerText()).replace(/\s+/g,' ').trim();
    await cs[i].click();
    await page.waitForTimeout(120);
    const visible = await page.evaluate(()=>{
      const trs = Array.from(document.querySelectorAll('tbody tr'));
      return trs.filter(tr=>tr.offsetParent!==null && tr.querySelector('td')).length;
    });
    out.push(label + ' = ' + visible);
  }
  console.log('### ' + P.f);
  console.log(out.join('\n'));
  console.log('');
}

await browser.close();
