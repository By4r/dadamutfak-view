import { chromium } from 'playwright';
const BASE='http://localhost:8765/v6/sa-admin-raporlar.html';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const errors=[];
function wire(p){p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});}
// mint kaçağı: #3BB77E=rgb(59,183,126) ve #6cca98=rgb(108,202,152) accent/border olarak kullanılmamalı.
// (pstat.ok / green-tint semantik durum rengi ayrı — bunları HARİÇ tutmak için yalnız ACCENT yüzeyleri tararız)
const mint=p=>p.evaluate(()=>{const M=['rgb(59, 183, 126)','rgb(108, 202, 152)'];let n=0;
  document.querySelectorAll('.bar,.dist-fill,.range-chips .chip,.cl-dot,.kpi-ico,.pc-title i,.rank-no,.dh-ico').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor'].forEach(k=>{if(M.indexOf(s[k])>-1)n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
async function newPageW(vw){const pg=await b.newPage({viewport:{width:vw,height:1000}});wire(pg);return pg;}

let p=await newPageW(1440);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);

// kanonik shell yüklü mü (menü render)
const menuLinks=await p.evaluate(()=>document.querySelectorAll('#saMenu .sa-mlink, #saMenu a, #saMenu .sa-mlink-soon').length);
const acc=await p.evaluate(()=>getComputedStyle(document.body).getPropertyValue('--acc').trim());
const kpiCount=await p.evaluate(()=>document.querySelectorAll('.kpi-grid .kpi-card').length);
const barCount=await p.evaluate(()=>document.querySelectorAll('#growthBars .bar.recipe').length);
const tableCount=await p.evaluate(()=>document.querySelectorAll('.rep-tables .pnl-card').length);
const ptableCount=await p.evaluate(()=>document.querySelectorAll('.rep-tables .ptable').length);
const ov1440=await ov(p);

// tarih chip toggle: başlangıç 30g aktif → 7g tıkla → is-on taşındı mı, sub değişti mi
const initOn=await p.evaluate(()=>document.querySelector('#rangeChips .chip.is-on').dataset.range);
const subBefore=await p.evaluate(()=>document.getElementById('repSub').textContent);
await p.locator('#rangeChips .chip[data-range="7g"]').click();await p.waitForTimeout(150);
const afterOn=await p.evaluate(()=>document.querySelector('#rangeChips .chip.is-on').dataset.range);
const onCount=await p.evaluate(()=>document.querySelectorAll('#rangeChips .chip.is-on').length);
const subAfter=await p.evaluate(()=>document.getElementById('repSub').textContent);
await p.locator('#rangeChips .chip[data-range="bugun"]').click();await p.waitForTimeout(120);
await p.locator('#rangeChips .chip[data-range="30g"]').click();await p.waitForTimeout(120);

// export toast
await p.locator('#exportBtn').click();await p.waitForTimeout(250);
const toastShown=await p.evaluate(()=>!!document.querySelector('.sa-toast'));

const mint1440=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-raporlar-1440.png`,fullPage:true});
await p.close();

// 390
p=await newPageW(390);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ov390=await ov(p);const mint390=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-raporlar-390.png`,fullPage:true});
await p.close();

await b.close();
const pass=(x)=>x?'PASS':'FAIL';
console.log('=== SA-ADMIN-RAPORLAR QA ===');
console.log('menü render (link sayısı>0):',pass(menuLinks>0),'('+menuLinks+')');
console.log('--acc (domates beklenir):',acc,pass(acc.toLowerCase()==='#e14827'));
console.log('KPI kart=4:',pass(kpiCount===4),'('+kpiCount+')');
console.log('grafik bar (8 ay):',pass(barCount===8),'('+barCount+')');
console.log('özet kart (>=2):',pass(tableCount>=2),'('+tableCount+' kart, '+ptableCount+' ptable)');
console.log('chip init=30g:',pass(initOn==='30g'));
console.log('chip toggle→7g & tek is-on:',pass(afterOn==='7g'&&onCount===1));
console.log('sub metni değişti:',pass(subBefore!==subAfter));
console.log('export toast çıktı:',pass(toastShown));
console.log('mint kaçağı @1440:',pass(mint1440===0),'('+mint1440+')');
console.log('mint kaçağı @390:',pass(mint390===0),'('+mint390+')');
console.log('yatay taşma @1440 (<=0):',pass(ov1440<=0),'('+ov1440+')');
console.log('yatay taşma @390 (<=0):',pass(ov390<=0),'('+ov390+')');
console.log('JS console/page error=0:',pass(errors.length===0),'('+errors.length+')');
if(errors.length)errors.forEach(e=>console.log('  ',e));
