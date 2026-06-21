import { chromium } from 'playwright';
const BASE='http://localhost:8765/v6/antrenor-program-builder-v1.html';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const errors=[];
function wire(p){p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});}
const mint=p=>p.evaluate(()=>{const M='rgb(59, 183, 126)';let n=0;document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor'].forEach(k=>{if(s[k]===M)n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);

let p=await newPageW(1440);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const greenTok=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--green').trim());
const navProgActive=await p.evaluate(()=>{const a=document.querySelector('.pnl-nav [data-nav="programlar"]');return a&&a.tagName==='A'&&a.classList.contains('is-active');});
const gridKids=await p.evaluate(()=>document.getElementById('bldGrid').children.length);
const sum0=await p.evaluate(()=>({days:document.getElementById('sumDays').textContent,set:document.getElementById('sumSet').textContent,dur:document.getElementById('sumDur').textContent,stat:document.getElementById('sumStat').textContent}));
const ov1440=await ov(p);
await p.screenshot({path:`${OUT}/antrenor-program-builder-1440.png`,fullPage:true});

// EKLE: ilk Ana Hareketler hücresinin add'ine bas → popover → ilk sonuç ekle
const setBeforeAdd=await p.evaluate(()=>window.dmBuilder.state.reduce((t,r)=>t+r.reduce((s,c)=>s+c.length,0),0));
await p.locator('.bc-add').first().click();await p.waitForTimeout(250);
const tsrShown=await p.evaluate(()=>document.getElementById('tsr').classList.contains('show'));
await p.locator('#tsrList .tsr-row').first().click();await p.waitForTimeout(250);
const setAfterAdd=await p.evaluate(()=>window.dmBuilder.state.reduce((t,r)=>t+r.reduce((s,c)=>s+c.length,0),0));

// SİL: ilk egzersizin bc-x'ine bas → saConfirm → onayla → kaldır
await p.locator('.bc-item').first().hover();await p.waitForTimeout(150);
await p.locator('.bc-item .bc-x').first().click({force:true});await p.waitForTimeout(300);
const modalShown=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
const modalTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:''});
await p.locator('.sa-modal .sa-m-ok').click();await p.waitForTimeout(300);
const setAfterDel=await p.evaluate(()=>window.dmBuilder.state.reduce((t,r)=>t+r.reduce((s,c)=>s+c.length,0),0));

// KAYDET toast
await p.locator('#btnSave').click();await p.waitForTimeout(250);
const saveToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));
const mint1=await mint(p);
await p.close();

// 1240 sınırı — rail üste geçmeli, taşma 0
p=await newPageW(1240);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(300);
const ov1240=await ov(p);
const railTop=await p.evaluate(()=>{const s=document.querySelector('.bld-side');return getComputedStyle(s).order;});
await p.close();

// 390
p=await newPageW(390);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ov390=await ov(p);const mint390=await mint(p);
await p.screenshot({path:`${OUT}/antrenor-program-builder-390.png`,fullPage:true});
await p.close();

await b.close();
console.log('=== ANTRENOR PROGRAM BUILDER QA ===');
console.log('--green token         :',JSON.stringify(greenTok),'(expect #009d4f)');
console.log('nav Programlar active :',navProgActive);
console.log('board grid children   :',gridKids,'(expect 56)');
console.log('weekly summary init    :',JSON.stringify(sum0));
console.log('EKLE: popover shown    :',tsrShown,'set',setBeforeAdd,'→',setAfterAdd,'(expect +1)');
console.log('SİL: modal shown       :',modalShown,'title:',JSON.stringify(modalTitle),'set',setAfterAdd,'→',setAfterDel,'(expect -1)');
console.log('KAYDET toast           :',saveToast);
console.log('rail order @1240 (expect -1):',railTop);
console.log('overflow 1440/1240/390 :',ov1440,'/',ov1240,'/',ov390,'(expect 0/0/0)');
console.log('MINT LEAK 1440 / 390   :',mint1,'/',mint390);
console.log('JS errors              :',errors.length,errors.length?JSON.stringify(errors):'NONE');

async function newPageW(vw){const pg=await b.newPage({viewport:{width:vw,height:900}});wire(pg);return pg;}
