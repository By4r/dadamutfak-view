import { chromium } from 'playwright';
const BASE='http://localhost:8765/v5/antrenor-programlar-v1.html';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const errors=[];
function wire(p){p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});}
const mint=p=>p.evaluate(()=>{const M='rgb(59, 183, 126)';let n=0;document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor'].forEach(k=>{if(s[k]===M)n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
const visRows=p=>p.evaluate(()=>Array.from(document.querySelectorAll('#prgTable tbody tr')).filter(r=>r.style.display!=='none').length);

let p=await newPageW(1440);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const greenTok=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--green').trim());
const navProgActive=await p.evaluate(()=>{const a=document.querySelector('.pnl-nav [data-nav="programlar"]');return a&&a.tagName==='A'&&a.classList.contains('is-active');});
const ctaSoon=await p.evaluate(()=>{const btn=document.querySelector('.ph-actions .btn-green');return !!btn&&btn.disabled;});
const ov1440=await ov(p);
const allRows=await visRows(p);

await p.locator('#prgChips .chip[data-f="aktif"]').click();await p.waitForTimeout(200);
const aktifRows=await visRows(p);
await p.locator('#prgChips .chip[data-f="taslak"]').click();await p.waitForTimeout(200);
const taslakRows=await visRows(p);
await p.locator('#prgChips .chip[data-f="arsiv"]').click();await p.waitForTimeout(200);
const arsivRows=await visRows(p);
await p.locator('#prgChips .chip[data-f="all"]').click();await p.waitForTimeout(150);
await p.fill('#prgSearch','hiit');await p.waitForTimeout(250);
const searchRows=await visRows(p);
await p.fill('#prgSearch','zzzzz');await p.waitForTimeout(250);
const emptyShown=await p.evaluate(()=>document.getElementById('prgEmpty').hidden===false);
await p.fill('#prgSearch','');await p.waitForTimeout(200);
await p.screenshot({path:`${OUT}/antrenor-programlar-1440.png`,fullPage:true});

// kopyala toast
await p.locator('#prgTable tbody tr button[data-act="copy"]').first().click();await p.waitForTimeout(250);
const copyToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));

// sil saConfirm: trash → modal → confirm → row removed
const rowsBefore=await visRows(p);
await p.locator('#prgTable tbody tr .pdel').first().click();await p.waitForTimeout(300);
const modalShown=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
const modalTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:''});
await p.locator('.sa-modal .sa-m-ok').click();await p.waitForTimeout(300);
const rowsAfter=await visRows(p);
const countTxt=await p.evaluate(()=>document.getElementById('prgCount').textContent);
const mint1=await mint(p);
await p.close();

// 390
p=await newPageW(390);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ov390=await ov(p);const mint390=await mint(p);
await p.screenshot({path:`${OUT}/antrenor-programlar-390.png`,fullPage:true});
await p.close();

await b.close();
console.log('=== ANTRENOR PROGRAMLAR QA ===');
console.log('--green token         :',JSON.stringify(greenTok),'(expect #009d4f)');
console.log('nav Programlar active :',navProgActive);
console.log('Yeni Program disabled :',ctaSoon);
console.log('rows all/aktif/taslak/arsiv/search-hiit :',allRows,'/',aktifRows,'/',taslakRows,'/',arsivRows,'/',searchRows,'(expect 7/4/2/1/1)');
console.log('empty state no-match  :',emptyShown);
console.log('kopyala toast         :',copyToast);
console.log('sil modal shown       :',modalShown,'title:',JSON.stringify(modalTitle));
console.log('rows before/after sil :',rowsBefore,'/',rowsAfter,'(expect 7/6) count:',JSON.stringify(countTxt));
console.log('overflow 1440 / 390   :',ov1440,'/',ov390);
console.log('MINT LEAK 1440 / 390  :',mint1,'/',mint390);
console.log('JS errors             :',errors.length,errors.length?JSON.stringify(errors):'NONE');

async function newPageW(vw){const pg=await b.newPage({viewport:{width:vw,height:900}});wire(pg);return pg;}
