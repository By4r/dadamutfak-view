import { chromium } from 'playwright';
const BASE='http://localhost:8765/v6/antrenor-challenge-v1.html';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const errors=[];
function wire(p){p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});}
const mint=p=>p.evaluate(()=>{const M='rgb(59, 183, 126)';let n=0;document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor'].forEach(k=>{if(s[k]===M)n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
const cards=p=>p.evaluate(()=>document.querySelectorAll('#chlGrid .chl-c').length);
async function newPageW(vw){const pg=await b.newPage({viewport:{width:vw,height:900}});wire(pg);return pg;}

let p=await newPageW(1440);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const greenTok=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--green').trim());
const navChlActive=await p.evaluate(()=>{const a=document.querySelector('.pnl-nav [data-nav="challenge"]');return a&&a.tagName==='A'&&a.classList.contains('is-active');});
const ov1440=await ov(p);
const allCards=await cards(p);

// filtre
await p.locator('#chlChips .chip[data-f="aktif"]').click();await p.waitForTimeout(180);
const aktifCards=await cards(p);
await p.locator('#chlChips .chip[data-f="bitti"]').click();await p.waitForTimeout(180);
const bittiCards=await cards(p);
await p.locator('#chlChips .chip[data-f="all"]').click();await p.waitForTimeout(150);
await p.fill('#chlSearch','şınav');await p.waitForTimeout(220);
const searchCards=await cards(p);
await p.fill('#chlSearch','zzzzz');await p.waitForTimeout(220);
const emptyShown=await p.evaluate(()=>document.getElementById('chlEmpty').hidden===false);
await p.fill('#chlSearch','');await p.waitForTimeout(150);
await p.screenshot({path:`${OUT}/antrenor-challenge-1440.png`,fullPage:true});

// detay modal (kart gövdesine tıkla)
await p.locator('#chlGrid .chl-c').first().locator('.chl-btn-detay').click();await p.waitForTimeout(280);
const detayOpen=await p.evaluate(()=>document.getElementById('detayOv').classList.contains('open'));
const detayParts=await p.evaluate(()=>document.querySelectorAll('#detayParts .part-row').length);
const detayTitle=await p.evaluate(()=>document.getElementById('detayTitle').textContent);
await p.screenshot({path:`${OUT}/antrenor-challenge-detay-1440.png`,fullPage:false});
await p.keyboard.press('Escape');await p.waitForTimeout(200);
const detayClosed=await p.evaluate(()=>!document.getElementById('detayOv').classList.contains('open'));

// oluştur modal
await p.locator('#chlNew').click();await p.waitForTimeout(250);
const yeniOpen=await p.evaluate(()=>document.getElementById('yeniOv').classList.contains('open'));
await p.fill('#yfAd','QA Test Challenge');
await p.locator('#yfMembers .cm-mrow input').nth(0).check();
await p.locator('#yfMembers .cm-mrow input').nth(1).check();
const selCount=await p.evaluate(()=>document.getElementById('yfCount').textContent);
await p.screenshot({path:`${OUT}/antrenor-challenge-yeni-1440.png`,fullPage:false});
const beforeCreate=await cards(p);
await p.locator('#yeniKaydet').click();await p.waitForTimeout(300);
const afterCreate=await cards(p);
const createToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));
const yeniClosed=await p.evaluate(()=>!document.getElementById('yeniOv').classList.contains('open'));
await p.waitForTimeout(1600);

// sil saConfirm (trash → modal → confirm → kart kaldır)
const beforeDel=await cards(p);
await p.locator('#chlGrid .chl-c .cdel').first().click();await p.waitForTimeout(300);
const delModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
const delTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:''});
await p.locator('.sa-modal .sa-m-ok').click();await p.waitForTimeout(300);
const afterDel=await cards(p);

// bitir saConfirm (aktif kartta)
await p.locator('#chlChips .chip[data-f="aktif"]').click();await p.waitForTimeout(150);
const aktifBeforeBitir=await cards(p);
await p.locator('#chlGrid .chl-c .chl-btn-bitir').first().click();await p.waitForTimeout(300);
const bitirModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
const bitirTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:''});
await p.locator('.sa-modal .sa-m-ok').click();await p.waitForTimeout(300);
const aktifAfterBitir=await cards(p);
const mint1=await mint(p);
await p.close();

// 390
p=await newPageW(390);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ov390=await ov(p);const mint390=await mint(p);
await p.screenshot({path:`${OUT}/antrenor-challenge-390.png`,fullPage:true});
await p.close();

await b.close();
console.log('=== ANTRENOR CHALLENGE QA ===');
console.log('--green token          :',JSON.stringify(greenTok),'(expect #009d4f)');
console.log("nav Challenge'larım act :",navChlActive);
console.log('cards all/aktif/bitti/search-şınav :',allCards,'/',aktifCards,'/',bittiCards,'/',searchCards,'(expect 6/4/2/1)');
console.log('empty state no-match   :',emptyShown);
console.log('detay open/parts/title :',detayOpen,'/',detayParts,'/',JSON.stringify(detayTitle));
console.log('detay closes (Esc)     :',detayClosed);
console.log('yeni open / selCount   :',yeniOpen,'/',selCount,'(expect 2)');
console.log('create cards before/after :',beforeCreate,'/',afterCreate,'(expect +1) toast:',createToast,'closed:',yeniClosed);
console.log('sil modal/title        :',delModal,JSON.stringify(delTitle));
console.log('sil cards before/after :',beforeDel,'/',afterDel,'(expect -1)');
console.log('bitir modal/title      :',bitirModal,JSON.stringify(bitirTitle));
console.log('bitir aktif before/after :',aktifBeforeBitir,'/',aktifAfterBitir,'(expect -1, bitti olur)');
console.log('overflow 1440 / 390    :',ov1440,'/',ov390);
console.log('MINT LEAK 1440 / 390   :',mint1,'/',mint390);
console.log('JS errors              :',errors.length,errors.length?JSON.stringify(errors):'NONE');
