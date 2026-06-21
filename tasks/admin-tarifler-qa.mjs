import { chromium } from 'playwright';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const LIST='http://localhost:8765/v6/sa-admin-tarifler.html';
const DET ='http://localhost:8765/v6/sa-admin-tarifler-detay.html';
const FORM='http://localhost:8765/v6/sa-admin-tarifler-form.html';
const b=await chromium.launch();
const errors=[];
function wire(p){p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});}
// mint kaçağı: #3BB77E=rgb(59,183,126) ve #6cca98=rgb(108,202,152)
const mint=p=>p.evaluate(()=>{const M=['rgb(59, 183, 126)','rgb(108, 202, 152)'];let n=0;document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor','borderRightColor'].forEach(k=>{if(M.indexOf(s[k])>-1)n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
const visRows=p=>p.evaluate(()=>[...document.querySelectorAll('#rcpTable tbody tr')].filter(r=>r.style.display!=='none').length);
async function newPageW(vw){const pg=await b.newPage({viewport:{width:vw,height:1000}});wire(pg);return pg;}

/* ===== LİSTE @1440 ===== */
let p=await newPageW(1440);
await p.goto(LIST,{waitUntil:'networkidle'});await p.waitForTimeout(450);
const accTok=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--acc').trim());
const menuRendered=await p.evaluate(()=>document.querySelectorAll('#saMenu a,#saMenu .sa-menu-item,#saMenu .sa-m-item').length>0);
// HİBRİT: "Yeni Tarif" butonu OLMALI ve forma gitmeli
const yeniBtn=await p.evaluate(()=>{const a=[...document.querySelectorAll('.ph-actions a')].find(x=>/Yeni Tarif/.test(x.textContent));return a?a.getAttribute('href'):null;});
// kaynak rozeti: kaç user / kaç admin
const srcUser=await p.evaluate(()=>document.querySelectorAll('#rcpTable tbody tr[data-src="user"]').length);
const srcAdmin=await p.evaluate(()=>document.querySelectorAll('#rcpTable tbody tr[data-src="admin"]').length);
// kaynak-aware aksiyon: admin satırında Düzenle(pen→form), user satırında moderasyon
const adminHasEdit=await p.evaluate(()=>{const r=document.querySelector('#rcpTable tbody tr[data-src="admin"]');return !!(r&&r.querySelector('.ia-btn[title="Düzenle"][href*="form"]'));});
const adminNoModerate=await p.evaluate(()=>{const r=document.querySelector('#rcpTable tbody tr[data-src="admin"]');return !r.querySelector('.ia-btn.danger');});
const userHasModerate=await p.evaluate(()=>{const r=document.querySelector('#rcpTable tbody tr[data-src="user"][data-status="bekliyor"]');return !!(r&&r.querySelector('.ia-btn.ok[title="Onayla"]')&&r.querySelector('.ia-btn.danger[title="Reddet"]'));});
const userNoEdit=await p.evaluate(()=>{const r=document.querySelector('#rcpTable tbody tr[data-src="user"][data-status="bekliyor"]');return !r.querySelector('.ia-btn[title="Düzenle"]');});
const ovL1440=await ov(p);
const allRows=await visRows(p);
// chip filtre
await p.locator('#rcpChips .chip[data-status="bekliyor"]').click();await p.waitForTimeout(180);
const bekliyorRows=await visRows(p);
await p.locator('#rcpChips .chip[data-status="sikayetli"]').click();await p.waitForTimeout(180);
const sikayetRows=await visRows(p);
await p.locator('#rcpChips .chip[data-status="all"]').click();await p.waitForTimeout(150);
// arama (mercimek artık ADMIN editöryel satır)
await p.fill('#rcpSearch','mercimek');await p.waitForTimeout(220);
const searchRows=await visRows(p);
await p.fill('#rcpSearch','zzzzzz');await p.waitForTimeout(220);
const emptyShown=await p.evaluate(()=>getComputedStyle(document.getElementById('rcpEmpty')).display!=='none');
await p.fill('#rcpSearch','');await p.waitForTimeout(150);
// Gizle → saConfirm (user satırı)
await p.locator('#rcpTable .ia-btn.danger[title="Gizle"]').first().click();await p.waitForTimeout(280);
const gizleModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
const gizleTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:''});
await p.locator('.sa-modal .sa-m-ok').click();await p.waitForTimeout(300);
const gizleToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));
await p.waitForTimeout(1700);
// Reddet → açık saConfirm (ikon buton, metinsiz → delege yakalamaz, sayfa JS bağladı)
await p.locator('#rcpChips .chip[data-status="bekliyor"]').click();await p.waitForTimeout(150);
await p.locator('#rcpTable .ia-btn.danger[title="Reddet"]').first().click();await p.waitForTimeout(280);
const reddetModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
const reddetTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:''});
await p.locator('.sa-modal .sa-m-cancel').click();await p.waitForTimeout(220);
await p.locator('#rcpChips .chip[data-status="all"]').click();await p.waitForTimeout(150);
const mintL=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-tarifler-1440.png`,fullPage:true});
await p.close();

/* ===== LİSTE @390 ===== */
p=await newPageW(390);
await p.goto(LIST,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ovL390=await ov(p);const mintL390=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-tarifler-390.png`,fullPage:true});
await p.close();

/* ===== DETAY @1440 ===== */
p=await newPageW(1440);
await p.goto(DET,{waitUntil:'networkidle'});await p.waitForTimeout(450);
const detMenu=await p.evaluate(()=>document.querySelectorAll('#saMenu a,#saMenu .sa-m-item').length>0);
// kaynak rozeti header'da görünür
const detSrc=await p.evaluate(()=>{const s=document.querySelector('.pnl-page-head .src-pill');return s?s.textContent.trim():null;});
// kullanıcı-gönderimi senaryosu → header'da "Düzenle" butonu YOK (moderasyon)
const noHeadEdit=await p.evaluate(()=>![...document.querySelectorAll('.pnl-page-head a,.pnl-page-head button')].some(b=>/Düzenle/.test(b.textContent)));
// admin-kaynak Düzenle yolu notu var (→form linki)
const editNote=await p.evaluate(()=>!![...document.querySelectorAll('.action-stack ~ div a, .meta-section a')].find(a=>/form\.html$/.test(a.getAttribute('href')||'')));
const backLink=await p.evaluate(()=>{const a=document.querySelector('.back-link');return a&&/tarifler\.html$/.test(a.getAttribute('href'))});
const ovD1440=await ov(p);
// Onayla → toast
await p.locator('#actApprove').click();await p.waitForTimeout(250);
const approveToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));
await p.waitForTimeout(1600);
// Gizle → saConfirm
await p.locator('#actHide').click();await p.waitForTimeout(280);
const hideModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
await p.locator('.sa-modal .sa-m-ok').click();await p.waitForTimeout(300);
await p.waitForTimeout(1600);
// İçeriği Kaldır → manuel saConfirm (data-no-confirm)
await p.locator('#actRemove').click();await p.waitForTimeout(280);
const removeModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
const removeTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:''});
await p.locator('.sa-modal .sa-m-cancel').click();await p.waitForTimeout(200);
const mintD=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-tarifler-detay-1440.png`,fullPage:true});
await p.close();

/* ===== DETAY @390 ===== */
p=await newPageW(390);
await p.goto(DET,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ovD390=await ov(p);const mintD390=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-tarifler-detay-390.png`,fullPage:true});
await p.close();

/* ===== FORM @1440 ===== */
p=await newPageW(1440);
await p.goto(FORM,{waitUntil:'networkidle'});await p.waitForTimeout(450);
const formMenu=await p.evaluate(()=>document.querySelectorAll('#saMenu a,#saMenu .sa-m-item').length>0);
const formBack=await p.evaluate(()=>{const a=document.querySelector('.back-link');return a&&/tarifler\.html$/.test(a.getAttribute('href'))});
const ovF1440=await ov(p);
// malzeme repeater ekle
const ingrBefore=await p.evaluate(()=>document.querySelectorAll('#ingrList .rep-row').length);
await p.locator('#ingrAdd').click();await p.waitForTimeout(150);
const ingrAfter=await p.evaluate(()=>document.querySelectorAll('#ingrList .rep-row').length);
// malzeme kaldır
await p.locator('#ingrList .rep-row .rep-remove').first().click();await p.waitForTimeout(150);
const ingrAfterDel=await p.evaluate(()=>document.querySelectorAll('#ingrList .rep-row').length);
// adım repeater ekle + numara
await p.locator('#stepAdd').click();await p.waitForTimeout(150);
const stepCount=await p.evaluate(()=>document.querySelectorAll('#stepList .rep-row.step').length);
const lastStepNum=await p.evaluate(()=>{const n=[...document.querySelectorAll('#stepList .rep-num')].pop();return n?n.textContent:null;});
// Yayınla → toast
await p.locator('#publish').click();await p.waitForTimeout(250);
const publishToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));
await p.waitForTimeout(2900);  // toast sönsün (shared .sa-toast i = --green/mint ikon; ölçüm öncesi temizlensin)
const mintF=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-tarifler-form-1440.png`,fullPage:true});
await p.close();

/* ===== FORM @390 ===== */
p=await newPageW(390);
await p.goto(FORM,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ovF390=await ov(p);const mintF390=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-tarifler-form-390.png`,fullPage:true});
await p.close();

await b.close();
console.log('=== ADMIN A1 TARIFLER QA (HİBRİT: CRUD + moderasyon) ===');
console.log('--acc token (admin)      :',JSON.stringify(accTok),'(expect #E14827 domates)');
console.log('--- LİSTE ---');
console.log('menü render              :',menuRendered);
console.log('"Yeni Tarif" → form      :',JSON.stringify(yeniBtn),'(expect sa-admin-tarifler-form.html)');
console.log('kaynak rozeti user/admin :',srcUser,'/',srcAdmin,'(expect 6/2)');
console.log('admin satır Düzenle var   :',adminHasEdit,'| admin satır moderasyon YOK:',adminNoModerate);
console.log('user satır moderasyon var :',userHasModerate,'| user satır Düzenle YOK:',userNoEdit);
console.log('rows all/bekliyor/sikayet/search-mercimek :',allRows,'/',bekliyorRows,'/',sikayetRows,'/',searchRows,'(expect 8/2/2/1)');
console.log('boş durum no-match       :',emptyShown);
console.log('Gizle saConfirm          :',gizleModal,JSON.stringify(gizleTitle),'→ toast:',gizleToast);
console.log('Reddet saConfirm         :',reddetModal,JSON.stringify(reddetTitle),'(expect "Gönderim reddedilsin mi?")');
console.log('overflow 1440/390        :',ovL1440,'/',ovL390);
console.log('mint leak 1440/390       :',mintL,'/',mintL390);
console.log('--- DETAY ---');
console.log('menü render              :',detMenu);
console.log('kaynak rozeti header     :',JSON.stringify(detSrc));
console.log('header Düzenle YOK (user) :',noHeadEdit,'| admin-Düzenle yol notu(→form):',editNote);
console.log('back-link→liste          :',backLink);
console.log('Onayla toast             :',approveToast);
console.log('Gizle saConfirm          :',hideModal);
console.log('İçeriği Kaldır saConfirm  :',removeModal,JSON.stringify(removeTitle),'(expect "İçerik kaldırılsın mı?")');
console.log('overflow 1440/390        :',ovD1440,'/',ovD390);
console.log('mint leak 1440/390       :',mintD,'/',mintD390);
console.log('--- FORM ---');
console.log('menü render              :',formMenu,'| back-link→liste:',formBack);
console.log('malzeme repeater +/−     :',ingrBefore,'→',ingrAfter,'→',ingrAfterDel,'(expect 2→3→2)');
console.log('adım ekle / son numara    :',stepCount,'/',JSON.stringify(lastStepNum),'(expect 3/"3")');
console.log('Yayınla toast            :',publishToast);
console.log('overflow 1440/390        :',ovF1440,'/',ovF390);
console.log('mint leak 1440/390       :',mintF,'/',mintF390);
console.log('JS errors                :',errors.length,errors.length?JSON.stringify(errors):'NONE');
