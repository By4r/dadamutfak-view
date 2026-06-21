import { chromium } from 'playwright';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const LIST='http://localhost:8765/v5/sa-store-siparisler.html';
const DETAY='http://localhost:8765/v5/sa-store-siparisler-detay.html';
const b=await chromium.launch();
const errors=[];
function wire(p){p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});}
// mint kaçağı: rgb(59,183,126)=#3BB77E ve rgb(108,202,152)=#6cca98 (her ikisi yasak/diyetisyen nanesi)
const mint=p=>p.evaluate(()=>{const M=['rgb(59, 183, 126)','rgb(108, 202, 152)'];let n=0;document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderRightColor','borderBottomColor','borderLeftColor'].forEach(k=>{if(M.includes(s[k]))n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
const shellLoaded=p=>p.evaluate(()=>!!document.querySelector('#saMenu .sa-menu-item, #saMenu a, #saMenu .sm-item, #saMenu *'));
const accDom=p=>p.evaluate(()=>{const v=getComputedStyle(document.documentElement).getPropertyValue('--acc').trim();return v;});
async function newPageW(vw){const pg=await b.newPage({viewport:{width:vw,height:1000}});wire(pg);return pg;}

console.log('=== STORE S1 SİPARİŞLER QA ===');

/* ---------- LİSTE @1440 ---------- */
let p=await newPageW(1440);
await p.goto(LIST,{waitUntil:'networkidle'});await p.waitForTimeout(450);
const acc=await accDom(p);
const menuLoaded=await shellLoaded(p);
const rowsCount=q=>p.evaluate(()=>Array.from(document.querySelectorAll('#ordTable tbody tr')).filter(r=>r.style.display!=='none').length);
const allRows=await rowsCount();
// chip filtre
await p.locator('.chip[data-filter="hazirlaniyor"]').click();await p.waitForTimeout(180);
const hazRows=await rowsCount();
await p.locator('.chip[data-filter="kargoda"]').click();await p.waitForTimeout(180);
const kargoRows=await rowsCount();
await p.locator('.chip[data-filter="teslim"]').click();await p.waitForTimeout(180);
const teslimRows=await rowsCount();
await p.locator('.chip[data-filter="iptal"]').click();await p.waitForTimeout(180);
const iptalRows=await rowsCount();
await p.locator('.chip[data-filter="tumu"]').click();await p.waitForTimeout(150);
// arama
await p.fill('#ordSearch','selin');await p.waitForTimeout(220);
const searchRows=await rowsCount();
const footVisibleSearch=await p.evaluate(()=>getComputedStyle(document.getElementById('ordFoot')).display!=='none');
// boş durum
await p.fill('#ordSearch','zzzzz');await p.waitForTimeout(220);
const emptyShown=await p.evaluate(()=>getComputedStyle(document.getElementById('ordEmpty')).display!=='none');
const footHiddenEmpty=await p.evaluate(()=>getComputedStyle(document.getElementById('ordFoot')).display==='none');
await p.fill('#ordSearch','');await p.waitForTimeout(150);
// gözetim disiplini: "Yeni" yok
const hasYeni=await p.evaluate(()=>!!Array.from(document.querySelectorAll('.ph-actions a,.ph-actions button')).find(b=>/Yeni/.test(b.textContent)));
// satır aksiyonu yalnız Detay (eye), kalem/trash yok
const rowActBtns=await p.evaluate(()=>document.querySelectorAll('#ordTable tbody tr:first-child .row-actions a, #ordTable tbody tr:first-child .row-actions button').length);
const hasTrash=await p.evaluate(()=>!!document.querySelector('#ordTable .fa-trash, #ordTable .fa-pen'));
const ov1440=await ov(p);const mint1440=await mint(p);
await p.screenshot({path:`${OUT}/sa-store-siparisler-1440.png`,fullPage:true});
await p.close();

/* ---------- LİSTE @390 ---------- */
p=await newPageW(390);
await p.goto(LIST,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ovList390=await ov(p);const mintList390=await mint(p);
await p.screenshot({path:`${OUT}/sa-store-siparisler-390.png`,fullPage:true});
await p.close();

/* ---------- DETAY @1440 ---------- */
p=await newPageW(1440);
await p.goto(DETAY,{waitUntil:'networkidle'});await p.waitForTimeout(450);
const menuLoadedD=await shellLoaded(p);
// gözetim: "Düzenle" yok
const hasDuzenle=await p.evaluate(()=>!!Array.from(document.querySelectorAll('.pnl-page-head a,.pnl-page-head button')).find(b=>/Düzenle/.test(b.textContent)));
// back-link → liste
const backHref=await p.evaluate(()=>{const a=document.querySelector('.back-link');return a?a.getAttribute('href'):null;});
// denetim aksiyonları var
const auditBtns=await p.evaluate(()=>document.querySelectorAll('.audit-btn').length);
// Not Kaydet → saToast (boş → uyarı)
await p.locator('.btn-ghost.btn-sm').filter({hasText:'Not Kaydet'}).click();await p.waitForTimeout(250);
const toastAfterEmptyNote=await p.evaluate(()=>!!document.querySelector('.sa-toast'));
await p.waitForTimeout(2800);
// Durum Güncelle → toast
await p.locator('.audit-btn',{hasText:'Durum Güncelle'}).click();await p.waitForTimeout(250);
const toastUpdate=await p.evaluate(()=>!!document.querySelector('.sa-toast'));
await p.waitForTimeout(2800);
// Siparişi İptal Et → sa-ui delege saConfirm açar
await p.locator('.audit-btn',{hasText:'Siparişi İptal Et'}).click();await p.waitForTimeout(350);
const cancelModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
const cancelTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:'';});
const cancelDanger=await p.evaluate(()=>!!document.querySelector('.sa-modal.danger'));
await p.locator('.sa-modal .sa-m-ok').click();await p.waitForTimeout(300);
const cancelToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));
await p.waitForTimeout(1600);
const ovDetay=await ov(p);const mintDetay=await mint(p);
await p.screenshot({path:`${OUT}/sa-store-siparisler-detay-1440.png`,fullPage:true});
await p.close();

/* ---------- DETAY @390 ---------- */
p=await newPageW(390);
await p.goto(DETAY,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ovDetay390=await ov(p);const mintDetay390=await mint(p);
await p.screenshot({path:`${OUT}/sa-store-siparisler-detay-390.png`,fullPage:true});
await p.close();

await b.close();

console.log('acc token (DOM)        :',JSON.stringify(acc),'(expect domates #e14827 / rgb)');
console.log('menu loaded list/detay :',menuLoaded,'/',menuLoadedD);
console.log('rows all               :',allRows,'(expect 8)');
console.log('chip haz/kargo/teslim/iptal :',hazRows,'/',kargoRows,'/',teslimRows,'/',iptalRows,'(expect 2/2/3/1)');
console.log('search "selin"         :',searchRows,'(expect 1) foot visible:',footVisibleSearch);
console.log('empty state shown      :',emptyShown,'foot hidden:',footHiddenEmpty);
console.log('LİSTE "Yeni" yok       :',!hasYeni,'(expect true)');
console.log('satır akt btn sayısı   :',rowActBtns,'(expect 1=Detay) trash/pen yok:',!hasTrash);
console.log('DETAY "Düzenle" yok    :',!hasDuzenle,'(expect true)');
console.log('back-link href         :',JSON.stringify(backHref),'(expect sa-store-siparisler.html)');
console.log('denetim aksiyon sayısı :',auditBtns,'(expect 3)');
console.log('Not Kaydet(boş) toast  :',toastAfterEmptyNote);
console.log('Durum Güncelle toast   :',toastUpdate);
console.log('İptal saConfirm modal  :',cancelModal,'danger:',cancelDanger,'title:',JSON.stringify(cancelTitle));
console.log('İptal onay sonrası toast:',cancelToast);
console.log('overflow list 1440/390 :',ov1440,'/',ovList390);
console.log('overflow detay 1440/390:',ovDetay,'/',ovDetay390);
console.log('MINT LEAK list 1440/390:',mint1440,'/',mintList390);
console.log('MINT LEAK detay 1440/390:',mintDetay,'/',mintDetay390);
console.log('JS errors              :',errors.length,errors.length?JSON.stringify(errors):'NONE');
