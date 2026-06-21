import { chromium } from 'playwright';
const BASE='http://localhost:8765/v5/antrenor-uyeler-v1.html';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const errors=[];
function wire(p){p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});}
const mint=p=>p.evaluate(()=>{const M='rgb(59, 183, 126)';let n=0;document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor'].forEach(k=>{if(s[k]===M)n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
const visRows=p=>p.evaluate(()=>Array.from(document.querySelectorAll('#uyeRows tr')).filter(r=>r.style.display!=='none').length);

let p=await newPageW(1440);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const greenTok=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--green').trim());
const navUyelerActive=await p.evaluate(()=>{const a=document.querySelector('.pnl-nav [data-nav="uyeler"]');return a&&a.tagName==='A'&&a.classList.contains('is-active');});
const ov1440=await ov(p);
const allRows=await visRows(p);

// filter: Aktif
await p.locator('#uyeChips .chip[data-filter="aktif"]').click();await p.waitForTimeout(200);
const aktifRows=await visRows(p);
// filter: bekleyen
await p.locator('#uyeChips .chip[data-filter="bekleyen"]').click();await p.waitForTimeout(200);
const bekleyenRows=await visRows(p);
// reset tumu, search "elif"
await p.locator('#uyeChips .chip[data-filter="tumu"]').click();await p.waitForTimeout(150);
await p.fill('#uyeSearch','elif');await p.waitForTimeout(250);
const searchRows=await visRows(p);
// search no-match → empty state
await p.fill('#uyeSearch','zzzzz');await p.waitForTimeout(250);
const emptyShown=await p.evaluate(()=>document.getElementById('viewBos').hidden===false);
await p.fill('#uyeSearch','');await p.waitForTimeout(200);

// view toggle → kart
await p.locator('.vs-btn[data-view="kart"]').click();await p.waitForTimeout(200);
const kartShown=await p.evaluate(()=>document.getElementById('viewKart').hidden===false && document.getElementById('viewTablo').hidden===true);
await p.locator('.vs-btn[data-view="tablo"]').click();await p.waitForTimeout(200);
await p.screenshot({path:`${OUT}/antrenor-uyeler-1440.png`,fullPage:true});

// çıkar saConfirm: click remove → modal appears, confirm → row removed
const rowsBefore=await visRows(p);
await p.locator('#uyeRows tr .tc-remove').first().click();
await p.waitForTimeout(300);
const modalShown=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
const modalTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:''});
await p.locator('.sa-modal .sa-m-ok').click();
await p.waitForTimeout(300);
const rowsAfter=await visRows(p);
const mint1=await mint(p);
await p.close();

// 390
p=await newPageW(390);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ov390=await ov(p);const mint390=await mint(p);
await p.screenshot({path:`${OUT}/antrenor-uyeler-390.png`,fullPage:true});
await p.close();

await b.close();
console.log('=== ANTRENOR UYELER QA ===');
console.log('--green token        :',JSON.stringify(greenTok));
console.log('nav Üyelerim active  :',navUyelerActive);
console.log('rows: all/aktif/bekleyen/search-elif :',allRows,'/',aktifRows,'/',bekleyenRows,'/',searchRows,'(expect 7/5/1/1)');
console.log('empty state on no-match :',emptyShown);
console.log('kart view toggle     :',kartShown);
console.log('çıkar modal shown    :',modalShown,'title:',JSON.stringify(modalTitle));
console.log('rows before/after çıkar :',rowsBefore,'/',rowsAfter,'(expect 7/6)');
console.log('overflow 1440 / 390  :',ov1440,'/',ov390);
console.log('MINT LEAK 1440 / 390 :',mint1,'/',mint390);
console.log('JS errors            :',errors.length,errors.length?JSON.stringify(errors):'NONE');

async function newPageW(vw){const pg=await b.newPage({viewport:{width:vw,height:900}});wire(pg);return pg;}
