import { chromium } from 'playwright';
import fs from 'fs';

const OUT = 'outputs/chcnt';
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { f:'sa-admin-kullanicilar', chip:'#roleChips .chip', mode:'tbody' },
  { f:'sa-admin-sayfalar',     chip:'#stChips .chip',   mode:'tbody' },
  { f:'sa-store-urunler',      chip:'.chips .chip',     mode:'tbody' },
  { f:'sa-store-siparisler',   chip:'.chips .chip',     mode:'tbody' },
  { f:'sa-store-musteriler',   chip:'.chips .chip',     mode:'tbody' },
  { f:'sa-store-kategoriler',  chip:'.chips .chip',     mode:'catnode' },
  { f:'sa-store-promosyonlar', chip:'.chips .chip',     mode:'tbody' },
  { f:'sa-dadafit-challenge',  chip:'#filterChips .chip', mode:'tbody' },
  { f:'sa-dadafit-egzersizler',chip:'#filterChips .chip', mode:'tbody' },
  { f:'sa-dadafit-programlar', chip:'#filterChips .chip', mode:'tbody' },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{ width:1440, height:1000 } });
let allOk = true;
const report = [];

for (const P of PAGES) {
  const errors = [];
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('PAGEERR '+e.message));
  await page.goto('http://localhost:8765/v6/'+P.f+'.html', { waitUntil:'networkidle' });

  // overflow check on chips container
  const overflow = await page.evaluate(sel => {
    const c = document.querySelector(sel)?.parentElement;
    if(!c) return null;
    return c.scrollWidth - c.clientWidth;
  }, P.chip);

  const chips = await page.$$(P.chip);
  const rows = [];
  let pageOk = true;
  for (let i=0;i<chips.length;i++){
    const cs = await page.$$(P.chip);
    const c = cs[i];
    const label = (await c.innerText()).replace(/\s+/g,' ').trim();
    const cnt = await c.evaluate(el => {
      const s = el.querySelector('.ch-cnt');
      if(!s) return { has:false };
      const r = getComputedStyle(s);
      return { has:true, n:s.textContent.trim(), radius:r.borderRadius, fs:r.fontSize, h:r.height, mw:r.minWidth, fw:r.fontWeight };
    });
    await c.click();
    await page.waitForTimeout(120);
    const visible = await page.evaluate(mode => {
      if(mode==='catnode'){
        return Array.from(document.querySelectorAll('.cat-node')).filter(n=>n.offsetParent!==null).length;
      }
      return Array.from(document.querySelectorAll('tbody tr')).filter(tr=>tr.offsetParent!==null && tr.querySelector('td')).length;
    }, P.mode);
    const match = cnt.has && String(visible)===String(cnt.n);
    if(!cnt.has || !match) pageOk = false;
    rows.push({ label, cnt, visible, match });
  }
  if(overflow>1) pageOk = false;
  if(errors.length) pageOk = false;
  if(!pageOk) allOk = false;

  await page.screenshot({ path:`${OUT}/${P.f}.png`, fullPage:true });

  report.push(`### ${P.f}  ${pageOk?'OK':'FAIL'}  (overflow:${overflow}px  jsErr:${errors.length})`);
  for(const r of rows){
    report.push(`   ${r.match?'OK':'XX'}  "${r.label}"  shown=${r.cnt.has?r.cnt.n:'—'}  dom=${r.visible}  radius=${r.cnt.radius} fs=${r.cnt.fs} h=${r.cnt.h} mw=${r.cnt.minWidth||r.cnt.mw} fw=${r.cnt.fw}`);
  }
  if(errors.length) report.push('   JSERR: '+errors.join(' | '));
  report.push('');
  page.removeAllListeners('console');
  page.removeAllListeners('pageerror');
}

console.log(report.join('\n'));
console.log(allOk ? '\n==== ALL 10 PAGES PASS ====' : '\n==== FAILURES PRESENT ====');
await browser.close();
process.exit(allOk?0:1);
