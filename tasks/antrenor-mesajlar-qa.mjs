import { chromium } from 'playwright';
const BASE='http://localhost:8765/v5/antrenor-mesajlar-v1.html';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const errors=[];
function wire(p){p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});}
const mint=p=>p.evaluate(()=>{const M='rgb(59, 183, 126)';let n=0;document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor'].forEach(k=>{if(s[k]===M)n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
const bubs=p=>p.evaluate(()=>document.querySelectorAll('#chBody .bub').length);

let p=await newPageW(1440);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const greenTok=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--green').trim());
const navMsgActive=await p.evaluate(()=>{const a=document.querySelector('.pnl-nav [data-nav="mesajlar"]');return a&&a.tagName==='A'&&a.classList.contains('is-active');});
const ov1440=await ov(p);
const bubBefore=await bubs(p);

// konuşma seç (2.) → ch-head adı senkron
await p.locator('.mm-open').nth(1).click();await p.waitForTimeout(200);
const headName=await p.evaluate(()=>document.querySelector('.ch-name').textContent);
const unreadCleared=await p.evaluate(()=>document.querySelectorAll('.mm-row.is-unread').length);

// MESAJ GÖNDER → balon ekle
await p.fill('#chInput','Bugün squat ağırlığını 5 kg artıralım.');
await p.locator('#chSend').click();await p.waitForTimeout(200);
const bubAfter=await bubs(p);
const inputCleared=await p.evaluate(()=>document.getElementById('chInput').value==='');
// Enter ile gönder
await p.fill('#chInput','Form videonu bekliyorum.');
await p.locator('#chInput').press('Enter');await p.waitForTimeout(200);
const bubAfter2=await bubs(p);
await p.screenshot({path:`${OUT}/antrenor-mesajlar-1440.png`,fullPage:true});

// SOHBETİ SİL → saConfirm
const rowsBefore=await p.evaluate(()=>document.querySelectorAll('.mm-row').length);
await p.locator('#chDel').click();await p.waitForTimeout(300);
const modalShown=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
const modalTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:''});
await p.locator('.sa-modal .sa-m-ok').click();await p.waitForTimeout(300);
const rowsAfter=await p.evaluate(()=>document.querySelectorAll('.mm-row').length);
const emptyShown=await p.evaluate(()=>document.getElementById('chNone').hidden===false);
const mint1=await mint(p);
await p.close();

// 390
p=await newPageW(390);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ov390=await ov(p);const mint390=await mint(p);
await p.screenshot({path:`${OUT}/antrenor-mesajlar-390.png`,fullPage:true});
// mobil: konuşma aç → sağ panel görünür
await p.locator('.mm-open').first().click();await p.waitForTimeout(250);
const chatOpen390=await p.evaluate(()=>document.body.classList.contains('chat-open'));
await p.close();

await b.close();
console.log('=== ANTRENOR MESAJLAR QA ===');
console.log('--green token         :',JSON.stringify(greenTok),'(expect #009d4f)');
console.log('nav Mesajlar active   :',navMsgActive);
console.log('konuşma seç → ch-head :',JSON.stringify(headName),'(expect Burak Şen)','unread kalan:',unreadCleared,'(expect 1)');
console.log('GÖNDER: balon',bubBefore,'→',bubAfter,'→',bubAfter2,'(expect +1 +1) input temizlendi:',inputCleared);
console.log('SİL: modal',modalShown,'title:',JSON.stringify(modalTitle),'rows',rowsBefore,'→',rowsAfter,'(expect -1) boş durum:',emptyShown);
console.log('mobil konuşma aç (chat-open):',chatOpen390);
console.log('overflow 1440 / 390   :',ov1440,'/',ov390,'(expect 0/0)');
console.log('MINT LEAK 1440 / 390  :',mint1,'/',mint390);
console.log('JS errors             :',errors.length,errors.length?JSON.stringify(errors):'NONE');

async function newPageW(vw){const pg=await b.newPage({viewport:{width:vw,height:900}});wire(pg);return pg;}
