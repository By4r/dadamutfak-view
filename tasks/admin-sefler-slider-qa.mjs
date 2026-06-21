import { chromium } from 'playwright';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const B='http://localhost:8765/v5/';
const SEF=B+'sa-admin-sefler.html', SEFD=B+'sa-admin-sefler-detay.html', SEFF=B+'sa-admin-sefler-form.html';
const SLD=B+'sa-admin-slider.html', SLDF=B+'sa-admin-slider-form.html';
const b=await chromium.launch();
const errors=[];
function wire(p){p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});}
const mint=p=>p.evaluate(()=>{const M=['rgb(59, 183, 126)','rgb(108, 202, 152)'];let n=0;document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor','borderRightColor'].forEach(k=>{if(M.indexOf(s[k])>-1)n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
// chip radius köşeli mi (radius-sm değeri sa-shell'de — pill 999px DEĞİL)
const chipRadius=p=>p.evaluate(()=>{const c=document.querySelector('.chip');return c?getComputedStyle(c).borderTopLeftRadius:null;});
async function newPageW(vw){const pg=await b.newPage({viewport:{width:vw,height:1100}});wire(pg);return pg;}
const R={};

/* ===== ŞEFLER LİSTE @1440 ===== */
let p=await newPageW(1440);
await p.goto(SEF,{waitUntil:'networkidle'});await p.waitForTimeout(450);
R.acc=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--acc').trim());
R.sefMenu=await p.evaluate(()=>document.querySelectorAll('#saMenu a,#saMenu .sa-m-item').length>0);
R.sefYeni=await p.evaluate(()=>{const a=[...document.querySelectorAll('.ph-actions a')].find(x=>/Yeni Şef/.test(x.textContent));return a?a.getAttribute('href'):null;});
R.sefChipRad=await chipRadius(p);
const visRows=()=>p.evaluate(()=>[...document.querySelectorAll('#sefTable tbody tr')].filter(r=>r.style.display!=='none').length);
R.sefAll=await visRows();
await p.locator('#sefChips .chip[data-status="dogrulanmis"]').click();await p.waitForTimeout(170);
R.sefDog=await visRows();
await p.locator('#sefChips .chip[data-status="bekliyor"]').click();await p.waitForTimeout(170);
R.sefBek=await visRows();
await p.locator('#sefChips .chip[data-status="all"]').click();await p.waitForTimeout(150);
await p.fill('#sefSearch','vegan');await p.waitForTimeout(200);
R.sefSearch=await visRows();
await p.fill('#sefSearch','zzzzz');await p.waitForTimeout(200);
R.sefEmpty=await p.evaluate(()=>getComputedStyle(document.getElementById('sefEmpty')).display!=='none');
await p.fill('#sefSearch','');await p.waitForTimeout(150);
// Sil → delege saConfirm (trash ikonu)
await p.locator('#sefTable .ia-btn.danger[title="Sil"]').first().click();await p.waitForTimeout(280);
R.sefSilModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
R.sefSilTitle=await p.evaluate(()=>{const h=document.querySelector('.sa-modal h3');return h?h.textContent:''});
await p.locator('.sa-modal .sa-m-cancel').click();await p.waitForTimeout(200);
R.sefOv1440=await ov(p);R.sefMint1440=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-sefler-1440.png`,fullPage:true});
await p.close();
/* @390 */
p=await newPageW(390);await p.goto(SEF,{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.sefOv390=await ov(p);R.sefMint390=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-sefler-390.png`,fullPage:true});await p.close();

/* ===== ŞEFLER DETAY @1440 ===== */
p=await newPageW(1440);await p.goto(SEFD,{waitUntil:'networkidle'});await p.waitForTimeout(450);
R.sefdMenu=await p.evaluate(()=>document.querySelectorAll('#saMenu a,#saMenu .sa-m-item').length>0);
R.sefdEdit=await p.evaluate(()=>!![...document.querySelectorAll('.ph-actions a')].find(a=>/Düzenle/.test(a.textContent)&&/form\.html$/.test(a.getAttribute('href')||'')));
R.sefdBack=await p.evaluate(()=>{const a=document.querySelector('.back-link');return a&&/sefler\.html$/.test(a.getAttribute('href'))});
// sağ kart Sil → delege saConfirm
await p.locator('.btn-danger').click();await p.waitForTimeout(280);
R.sefdSilModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
await p.locator('.sa-modal .sa-m-cancel').click();await p.waitForTimeout(200);
R.sefdOv1440=await ov(p);R.sefdMint1440=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-sefler-detay-1440.png`,fullPage:true});await p.close();
p=await newPageW(390);await p.goto(SEFD,{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.sefdOv390=await ov(p);R.sefdMint390=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-sefler-detay-390.png`,fullPage:true});await p.close();

/* ===== ŞEFLER FORM @1440 ===== */
p=await newPageW(1440);await p.goto(SEFF,{waitUntil:'networkidle'});await p.waitForTimeout(450);
R.seffMenu=await p.evaluate(()=>document.querySelectorAll('#saMenu a,#saMenu .sa-m-item').length>0);
R.seffBack=await p.evaluate(()=>{const a=document.querySelector('.back-link');return a&&/sefler\.html$/.test(a.getAttribute('href'))});
// uzmanlık chip-input ekle
R.specBefore=await p.evaluate(()=>document.querySelectorAll('#specWrap .spec-pill').length);
await p.fill('#specInput','Deniz Ürünleri');await p.locator('#specInput').press('Enter');await p.waitForTimeout(150);
R.specAfter=await p.evaluate(()=>document.querySelectorAll('#specWrap .spec-pill').length);
// chip-input pill köşeli mi
R.specRad=await p.evaluate(()=>{const s=document.querySelector('#specWrap .spec-pill');return s?getComputedStyle(s).borderTopLeftRadius:null;});
// kaldır
await p.locator('#specWrap .spec-pill button').first().click();await p.waitForTimeout(120);
R.specDel=await p.evaluate(()=>document.querySelectorAll('#specWrap .spec-pill').length);
// Yayınla toast
await p.locator('#publish').click();await p.waitForTimeout(250);
R.seffToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));
await p.waitForTimeout(2900);
R.seffOv1440=await ov(p);R.seffMint1440=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-sefler-form-1440.png`,fullPage:true});await p.close();
p=await newPageW(390);await p.goto(SEFF,{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.seffOv390=await ov(p);R.seffMint390=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-sefler-form-390.png`,fullPage:true});await p.close();

/* ===== SLIDER LİSTE @1440 ===== */
p=await newPageW(1440);await p.goto(SLD,{waitUntil:'networkidle'});await p.waitForTimeout(450);
R.sldMenu=await p.evaluate(()=>document.querySelectorAll('#saMenu a,#saMenu .sa-m-item').length>0);
R.sldYeni=await p.evaluate(()=>{const a=[...document.querySelectorAll('.ph-actions a')].find(x=>/Yeni Slot/.test(x.textContent));return a?a.getAttribute('href'):null;});
R.sldChipRad=await chipRadius(p);
// görsel = img tag YOK (div+bg)
R.sldNoImg=await p.evaluate(()=>document.querySelectorAll('.slot-card img').length===0);
R.sldBgImg=await p.evaluate(()=>[...document.querySelectorAll('.slot-img')].every(d=>/url\(/.test(getComputedStyle(d).backgroundImage)));
const visCards=()=>p.evaluate(()=>[...document.querySelectorAll('#slotGrid .slot-card')].filter(c=>c.style.display!=='none').length);
R.sldAll=await visCards();
await p.locator('#slotChips .chip[data-loc="store"]').click();await p.waitForTimeout(170);
R.sldStore=await visCards();
await p.locator('#slotChips .chip[data-loc="all"]').click();await p.waitForTimeout(150);
await p.fill('#slotSearch','indirim');await p.waitForTimeout(200);
R.sldSearch=await visCards();
await p.fill('#slotSearch','zzzzz');await p.waitForTimeout(200);
R.sldEmpty=await p.evaluate(()=>getComputedStyle(document.getElementById('slotEmpty')).display!=='none');
await p.fill('#slotSearch','');await p.waitForTimeout(150);
// Sil → delege saConfirm
await p.locator('#slotGrid .sf-btn.danger').first().click();await p.waitForTimeout(280);
R.sldSilModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
await p.locator('.sa-modal .sa-m-cancel').click();await p.waitForTimeout(200);
R.sldOv1440=await ov(p);R.sldMint1440=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-slider-1440.png`,fullPage:true});await p.close();
p=await newPageW(390);await p.goto(SLD,{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.sldOv390=await ov(p);R.sldMint390=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-slider-390.png`,fullPage:true});await p.close();

/* ===== SLIDER FORM @1440 ===== */
p=await newPageW(1440);await p.goto(SLDF,{waitUntil:'networkidle'});await p.waitForTimeout(450);
R.sldfMenu=await p.evaluate(()=>document.querySelectorAll('#saMenu a,#saMenu .sa-m-item').length>0);
R.sldfBack=await p.evaluate(()=>{const a=document.querySelector('.back-link');return a&&/slider\.html$/.test(a.getAttribute('href'))});
// canlı önizleme başlık güncellenir mi
await p.fill('#f-baslik','QA Test Banner');await p.waitForTimeout(150);
R.sldfPreview=await p.evaluate(()=>document.getElementById('previewTitle').textContent);
await p.locator('#publish').click();await p.waitForTimeout(250);
R.sldfToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));
await p.waitForTimeout(2900);
R.sldfOv1440=await ov(p);R.sldfMint1440=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-slider-form-1440.png`,fullPage:true});await p.close();
p=await newPageW(390);await p.goto(SLDF,{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.sldfOv390=await ov(p);R.sldfMint390=await mint(p);
await p.screenshot({path:`${OUT}/sa-admin-slider-form-390.png`,fullPage:true});await p.close();

await b.close();
console.log('=== A2 ŞEFLER + A3 SLIDER QA ===');
console.log('--acc (admin)            :',JSON.stringify(R.acc),'(expect #E14827)');
console.log('--- ŞEFLER LİSTE ---');
console.log('menü / Yeni Şef→form     :',R.sefMenu,'/',JSON.stringify(R.sefYeni));
console.log('chip radius (köşeli)     :',JSON.stringify(R.sefChipRad),'(radius-sm; 999px DEĞİL)');
console.log('rows all/dog/bek/search-vegan :',R.sefAll,'/',R.sefDog,'/',R.sefBek,'/',R.sefSearch,'(expect 7/4/2/1)');
console.log('boş durum / Sil saConfirm :',R.sefEmpty,'/',R.sefSilModal,JSON.stringify(R.sefSilTitle));
console.log('overflow / mint 1440/390 :',R.sefOv1440+'·'+R.sefOv390,'/',R.sefMint1440+'·'+R.sefMint390);
console.log('--- ŞEFLER DETAY ---');
console.log('menü / Düzenle→form / back :',R.sefdMenu,'/',R.sefdEdit,'/',R.sefdBack);
console.log('sağ kart Sil saConfirm   :',R.sefdSilModal);
console.log('overflow / mint 1440/390 :',R.sefdOv1440+'·'+R.sefdOv390,'/',R.sefdMint1440+'·'+R.sefdMint390);
console.log('--- ŞEFLER FORM ---');
console.log('menü / back              :',R.seffMenu,'/',R.seffBack);
console.log('uzmanlık chip +/− / radius :',R.specBefore+'→'+R.specAfter+'→'+R.specDel,'/',JSON.stringify(R.specRad),'(expect 2→3→2, köşeli)');
console.log('Yayınla toast            :',R.seffToast);
console.log('overflow / mint 1440/390 :',R.seffOv1440+'·'+R.seffOv390,'/',R.seffMint1440+'·'+R.seffMint390);
console.log('--- SLIDER LİSTE ---');
console.log('menü / Yeni Slot→form    :',R.sldMenu,'/',JSON.stringify(R.sldYeni));
console.log('chip radius / img-YOK / bg-img :',JSON.stringify(R.sldChipRad),'/',R.sldNoImg,'/',R.sldBgImg);
console.log('cards all/store/search-indirim :',R.sldAll,'/',R.sldStore,'/',R.sldSearch,'(expect 6/2/1)');
console.log('boş durum / Sil saConfirm :',R.sldEmpty,'/',R.sldSilModal);
console.log('overflow / mint 1440/390 :',R.sldOv1440+'·'+R.sldOv390,'/',R.sldMint1440+'·'+R.sldMint390);
console.log('--- SLIDER FORM ---');
console.log('menü / back              :',R.sldfMenu,'/',R.sldfBack);
console.log('canlı önizleme başlık    :',JSON.stringify(R.sldfPreview),'(expect "QA Test Banner")');
console.log('Yayınla toast            :',R.sldfToast);
console.log('overflow / mint 1440/390 :',R.sldfOv1440+'·'+R.sldfOv390,'/',R.sldfMint1440+'·'+R.sldfMint390);
console.log('=== JS errors :',errors.length,errors.length?JSON.stringify(errors):'NONE');
