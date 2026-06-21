import { chromium } from 'playwright';
const B = 'http://localhost:8765/v6/';
const browser = await chromium.launch();
const out = []; let allOk = true;
const fail = {};
function trackable(page,key){
  fail[key]=[];
  page.on('requestfailed', r=>fail[key].push(r.url()));
  page.on('response', r=>{ if(r.status()>=400) fail[key].push(r.status()+' '+r.url()); });
  page.on('pageerror', e=>fail[key].push('JSERR '+e.message));
}

// ---- R1: dizin ----
const p1 = await browser.newPage({viewport:{width:1440,height:1000}});
trackable(p1,'dizin');
await p1.goto(B+'dizin.html',{waitUntil:'networkidle'});
await p1.click('.tab[data-tab="admin"]'); await p1.waitForTimeout(150);
const r1 = await p1.evaluate(()=>{
  const g=[...document.querySelectorAll('.group')].find(x=>x.dataset.group==='Giriş / Sistem');
  const cards=[...g.querySelectorAll('.card')].map(c=>({name:c.querySelector('.c-name').textContent,href:c.getAttribute('href')}));
  return {first:cards[0],second:cards[1],firstGroup:document.querySelector('.group').dataset.group};
});
const r1ok = r1.first.name==='Yönetim Girişi' && r1.first.href==='sa-giris-v1.html' && r1.second.name==='Gözetim Kabuğu';
out.push(`R1 dizin: ilk="${r1.first.name}" (${r1.first.href}) · 2.="${r1.second.name}" → ${r1ok?'OK':'XX'} | 404/err=${fail.dizin.length}`);
if(!r1ok||fail.dizin.length) allOk=false;

// ---- R2: egzersizler ----
const p2 = await browser.newPage({viewport:{width:1440,height:1000}});
trackable(p2,'egz');
await p2.goto(B+'sa-dadafit-egzersizler.html',{waitUntil:'networkidle'});
await p2.waitForTimeout(300);
const r2 = await p2.evaluate(()=>{
  const thumbs=[...document.querySelectorAll('.ex-thumb')];
  const first=thumbs[0];
  const bg=first?getComputedStyle(first).backgroundImage:'';
  return {thumbCount:thumbs.length, firstBg:bg, allHaveBg:thumbs.every(t=>getComputedStyle(t).backgroundImage!=='none')};
});
const imgFails = fail.egz.filter(u=>u.includes('images.unsplash.com'));
const r2ok = r2.thumbCount===9 && r2.allHaveBg && r2.firstBg.includes('1574680096145') && imgFails.length===0;
out.push(`R2 egzersizler: thumb=${r2.thumbCount} hepsiDolu=${r2.allHaveBg} BarbellSquat-url=${r2.firstBg.includes('1574680096145')?'yeni✓':'?'} imgFail=${imgFails.length} | 404/err=${fail.egz.length}`);
if(imgFails.length) out.push('   IMG FAIL: '+imgFails.join(' | '));
if(!r2ok) allOk=false;

// ---- R3: onaylar saConfirm ----
const p3 = await browser.newPage({viewport:{width:1440,height:1000}});
trackable(p3,'onay');
await p3.goto(B+'sa-isletme-onaylar.html',{waitUntil:'networkidle'});
await p3.waitForTimeout(200);
const btnCount = await p3.evaluate(()=>({
  onayla:document.querySelectorAll('[data-confirm="onayla"]').length,
  reddet:[...document.querySelectorAll('.act-btn.warn')].filter(b=>/Reddet/.test(b.textContent)).length
}));
// Onayla flow (özel handler)
await p3.click('[data-confirm="onayla"]');
await p3.waitForSelector('.sa-modal-ov.open', {timeout:3000});
const onayModal = await p3.evaluate(()=>{
  const all=document.querySelectorAll('.sa-modal-ov.open');
  const m=document.querySelector('.sa-modal-ov.open .sa-modal');
  return {open:!!m, count:all.length, title:m?m.querySelector('h3').textContent:''};
});
await p3.click('.sa-modal-ov.open .sa-m-ok');
await p3.waitForSelector('.sa-modal-ov.open', {state:'detached',timeout:3000}).catch(()=>{});
await p3.waitForTimeout(150);
const onayToast = await p3.evaluate(()=>{const ts=[...document.querySelectorAll('.sa-toast')];const t=ts[ts.length-1];return{shown:!!t,txt:t?t.textContent:''}});
// Reddet flow (sa-ui yerleşik DESTR — tek pop-up olmalı)
await p3.locator('.act-btn.warn', {hasText:'Reddet'}).first().click();
await p3.waitForSelector('.sa-modal-ov.open', {timeout:3000});
const redModal = await p3.evaluate(()=>{
  const all=document.querySelectorAll('.sa-modal-ov.open');
  const m=document.querySelector('.sa-modal-ov.open .sa-modal');
  return {open:!!m, count:all.length, title:m?m.querySelector('h3').textContent:''};
});
await p3.click('.sa-modal-ov.open .sa-m-ok');
await p3.waitForTimeout(300);
const redToast = await p3.evaluate(()=>{const ts=[...document.querySelectorAll('.sa-toast')];const t=ts[ts.length-1];return t?t.textContent:''});
const r3ok = btnCount.onayla===3 && btnCount.reddet===3
  && onayModal.open && onayModal.count===1 && onayToast.shown && onayToast.txt.includes('onaylandı')
  && redModal.open && redModal.count===1 && redToast.includes('reddedildi')
  && fail.onay.length===0;
out.push(`R3 onaylar: btn(onayla=${btnCount.onayla},reddet=${btnCount.reddet})`);
out.push(`   ONAYLA → modal(${onayModal.count}) "${onayModal.title}" → toast "${onayToast.txt}"`);
out.push(`   REDDET → modal(${redModal.count}) "${redModal.title}" → toast "${redToast}"  [tek pop-up: ${redModal.count===1?'OK':'ÇİFT!'}]`);
out.push(`   → ${r3ok?'OK':'XX'} | 404/err=${fail.onay.length}`);
if(fail.onay.length) out.push('   FAIL: '+fail.onay.join(' | '));
if(!r3ok) allOk=false;

console.log(out.join('\n'));
console.log(allOk?'\n==== PASS ====':'\n==== FAIL ====');
await browser.close();
process.exit(allOk?0:1);
