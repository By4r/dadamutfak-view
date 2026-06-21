import { chromium } from 'playwright';
import fs from 'fs';

const EXPECT = {
  "Gözetim — Admin":21, "Gözetim — Store":15, "Gözetim — Sağlık":11,
  "Gözetim — İşletme":11, "Gözetim — DadaFit":12, "Operatör — Antrenör":8, "Giriş / Sistem":2,
};
const browser = await chromium.launch();
const page = await browser.newPage({ viewport:{width:1440,height:1000} });
const errs = [];
page.on('pageerror', e => errs.push(e.message));
page.on('console', m => { if(m.type()==='error') errs.push(m.text()); });
await page.goto('http://localhost:8765/v6/dizin.html', { waitUntil:'networkidle' });
await page.waitForTimeout(120);

let allOk = true;
const out = [];

// --- GENEL (default) ---
const genel = await page.evaluate(()=>({
  activeTab: document.querySelector('.tab.on')?.dataset.tab,
  cards: document.querySelectorAll('.card').length,
  groups: document.querySelectorAll('.group').length,
  total: document.getElementById('total').textContent,
  gtotal: document.getElementById('gtotal').textContent,
}));
out.push(`GENEL (default): tab=${genel.activeTab} cards=${genel.cards} groups=${genel.groups} total=${genel.total} gtotal=${genel.gtotal}`);
const genelCards = genel.cards;

// --- ADMIN tab ---
await page.click('.tab[data-tab="admin"]');
await page.waitForTimeout(120);
const admin = await page.evaluate(()=>{
  const groups = [...document.querySelectorAll('.group')].map(g=>({
    name: g.dataset.group,
    n: g.querySelectorAll('.card').length
  }));
  const cards = [...document.querySelectorAll('.card')].map(c=>({
    href: c.getAttribute('href'),
    target: c.getAttribute('target'),
    name: c.querySelector('.c-name')?.textContent
  }));
  return {
    activeTab: document.querySelector('.tab.on')?.dataset.tab,
    totalCards: cards.length,
    groups, cards,
    total: document.getElementById('total').textContent,
    gtotal: document.getElementById('gtotal').textContent,
  };
});
out.push(`\nADMIN: tab=${admin.activeTab} cards=${admin.totalCards} groups=${admin.groups.length} total=${admin.total} gtotal=${admin.gtotal}`);

// per-category check
let catOk = admin.groups.length === 7;
for (const g of admin.groups) {
  const exp = EXPECT[g.name];
  const ok = exp === g.n;
  if(!ok) catOk = false;
  out.push(`   ${ok?'OK':'XX'} ${g.name}: ${g.n}${exp!==undefined?` (beklenen ${exp})`:' (BEKLENMEYEN KATEGORİ)'}`);
}
const sum = admin.groups.reduce((a,g)=>a+g.n,0);
out.push(`   Σ = ${sum} (beklenen 80)`);
if(sum!==80) catOk=false;

// link integrity: relative, no /v5/, resolves on disk
let linkOk = true, badLinks = [];
for (const c of admin.cards) {
  const h = c.href || '';
  const rel = !/^https?:|^\//.test(h) && !h.includes('/v5/');
  const file = h.split('#')[0].split('?')[0];
  const exists = file && fs.existsSync('v6/'+file);
  if(!rel || !exists || c.target!=='_blank'){ linkOk=false; badLinks.push(`${c.name}→${h} rel=${rel} exists=${exists} tgt=${c.target}`); }
}
out.push(`   link bütünlük: ${linkOk?'OK':'XX'} (relative + v6'da var + _blank) ${badLinks.length?'\n     BAD: '+badLinks.slice(0,8).join(' | '):''}`);

// search on admin tab
await page.fill('#q','kullanici');
await page.waitForTimeout(120);
const adminSearch = await page.evaluate(()=>[...document.querySelectorAll('.card')].filter(c=>!c.classList.contains('hide')).length);
await page.fill('#q','');
await page.waitForTimeout(80);
const adminAfterClear = await page.evaluate(()=>[...document.querySelectorAll('.card')].filter(c=>!c.classList.contains('hide')).length);
out.push(`   arama "kullanici" → ${adminSearch} görünür · temizle → ${adminAfterClear} (80 olmalı)`);
const searchOk = adminSearch>0 && adminSearch<80 && adminAfterClear===80;

// --- back to GENEL ---
await page.click('.tab[data-tab="genel"]');
await page.waitForTimeout(120);
const back = await page.evaluate(()=>({
  cards: document.querySelectorAll('.card').length,
  groups: document.querySelectorAll('.group').length,
}));
const backOk = back.cards === genelCards;
out.push(`\nGERİ GENEL: cards=${back.cards} (ilk ${genelCards}) groups=${back.groups} → public bozulmadı: ${backOk?'OK':'XX'}`);

if(!catOk || !linkOk || !searchOk || !backOk || admin.totalCards!==80 || errs.length) allOk=false;
out.push(`\njsErr=${errs.length}${errs.length?' :: '+errs.slice(0,3).join(' | '):''}`);

console.log(out.join('\n'));
console.log(allOk ? '\n==== PASS ====' : '\n==== FAIL ====');
await browser.close();
process.exit(allOk?0:1);
