import { chromium } from 'playwright';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const B='http://localhost:8765/v5/';
const b=await chromium.launch();
const errors=[];
function wire(p,tag){p.on('pageerror',e=>errors.push(tag+' PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push(tag+' CONSOLE:'+m.text())});}
// mint kaçağı: rgb(59,183,126)=#3BB77E ve rgb(108,202,152)=#6cca98.
// NOT: shell'in .sa-toast başarı-check ikonu da --green(#3BB77E) kullanır (kanonik,
// brand'de "uyumlu" izinli; tüm panellerde aynı). Sayfa-CSS kaçağını ölçtüğümüz için
// shell-owned .sa-toast'u hariç tut → false-positive elenir.
const mint=p=>p.evaluate(()=>{const M=['rgb(59, 183, 126)','rgb(108, 202, 152)'];let n=0;document.querySelectorAll('*').forEach(el=>{if(el.closest('.sa-toast,.sa-toast-wrap'))return;const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderRightColor','borderBottomColor','borderLeftColor'].forEach(k=>{if(M.includes(s[k]))n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
const menu=p=>p.evaluate(()=>!!document.querySelector('#saMenu a, #saMenu *'));
// chip radius-sm köşeli mi? (pill 999px DEĞİL) — ilk .chip / .tab borderRadius
const chipRadius=p=>p.evaluate(()=>{const c=document.querySelector('.chips .chip, .filter-bar .chip, .tabbar .tab, .range-chips');if(!c)return null;return getComputedStyle(c).borderRadius;});

async function page(vw,tag){const pg=await b.newPage({viewport:{width:vw,height:1000}});wire(pg,tag);return pg;}
async function shot(p,name){await p.screenshot({path:`${OUT}/${name}.png`,fullPage:true});}

const R={}; // results

/* ============ S2 MÜŞTERİLER (liste) ============ */
let p=await page(1440,'must-list');
await p.goto(B+'sa-store-musteriler.html',{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.mustAcc=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--acc').trim());
R.mustMenu=await menu(p); R.mustChipR=await chipRadius(p);
const mRows=()=>p.evaluate(()=>Array.from(document.querySelectorAll('#custTable tbody tr')).filter(r=>r.style.display!=='none').length);
R.mustAll=await mRows();
await p.locator('.chip[data-filter="vip"]').click();await p.waitForTimeout(150);R.mustVip=await mRows();
await p.locator('.chip[data-filter="pasif"]').click();await p.waitForTimeout(150);R.mustPasif=await mRows();
await p.locator('.chip[data-filter="tumu"]').click();await p.waitForTimeout(120);
await p.fill('#custSearch','zeynep');await p.waitForTimeout(200);R.mustSearch=await mRows();
await p.fill('#custSearch','zzzzz');await p.waitForTimeout(200);R.mustEmpty=await p.evaluate(()=>getComputedStyle(document.getElementById('custEmpty')).display!=='none');
await p.fill('#custSearch','');await p.waitForTimeout(120);
R.mustYeni=await p.evaluate(()=>!!Array.from(document.querySelectorAll('.ph-actions a,.ph-actions button')).find(b=>/Yeni/.test(b.textContent)));
R.mustRowAct=await p.evaluate(()=>document.querySelectorAll('#custTable tbody tr:first-child .row-actions a,#custTable tbody tr:first-child .row-actions button').length);
R.mustTrash=await p.evaluate(()=>!!document.querySelector('#custTable .fa-trash,#custTable .fa-pen'));
R.mustOv1440=await ov(p);R.mustMint1440=await mint(p);
await shot(p,'sa-store-musteriler-1440');await p.close();
p=await page(390,'must-list-390');await p.goto(B+'sa-store-musteriler.html',{waitUntil:'networkidle'});await p.waitForTimeout(350);
R.mustOv390=await ov(p);R.mustMint390=await mint(p);await shot(p,'sa-store-musteriler-390');await p.close();

/* ============ S2 MÜŞTERİLER (detay) ============ */
p=await page(1440,'must-detay');
await p.goto(B+'sa-store-musteriler-detay.html',{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.mustDDuzenle=await p.evaluate(()=>!!Array.from(document.querySelectorAll('.pnl-page-head a,.pnl-page-head button')).find(b=>/Düzenle/.test(b.textContent)));
R.mustDBack=await p.evaluate(()=>{const a=document.querySelector('.back-link');return a?a.getAttribute('href'):null;});
R.mustDAudit=await p.evaluate(()=>document.querySelectorAll('.audit-btn').length);
// Hesabı Sil → sa-ui delege saConfirm
await p.locator('.audit-btn',{hasText:'Hesabı Sil'}).click();await p.waitForTimeout(300);
R.mustDelModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));
R.mustDelDanger=await p.evaluate(()=>!!document.querySelector('.sa-modal.danger'));
await p.locator('.sa-modal .sa-m-ok').click();await p.waitForTimeout(300);
R.mustDelToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));await p.waitForTimeout(1500);
R.mustDOv1440=await ov(p);R.mustDMint1440=await mint(p);
await shot(p,'sa-store-musteriler-detay-1440');await p.close();
p=await page(390,'must-detay-390');await p.goto(B+'sa-store-musteriler-detay.html',{waitUntil:'networkidle'});await p.waitForTimeout(350);
R.mustDOv390=await ov(p);R.mustDMint390=await mint(p);await shot(p,'sa-store-musteriler-detay-390');await p.close();

/* ============ S3 KATEGORİLER (liste) ============ */
p=await page(1440,'kat-list');
await p.goto(B+'sa-store-kategoriler.html',{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.katMenu=await menu(p);R.katChipR=await chipRadius(p);
R.katYeni=await p.evaluate(()=>!!Array.from(document.querySelectorAll('.ph-actions a')).find(b=>/Yeni/.test(b.textContent)));
// ağaç toggle: ilk node açık mı, ikinci caret tıkla → açılır
R.katNode1Open=await p.evaluate(()=>document.querySelector('#catTree .cat-node').classList.contains('is-open'));
await p.locator('#catTree .cat-node').nth(1).locator('.cat-caret').click();await p.waitForTimeout(220);
R.katNode2Open=await p.evaluate(()=>document.querySelectorAll('#catTree .cat-node')[1].classList.contains('is-open'));
const kNodes=()=>p.evaluate(()=>Array.from(document.querySelectorAll('#catTree .cat-node')).filter(n=>n.style.display!=='none').length);
await p.locator('.chip[data-filter="pasif"]').click();await p.waitForTimeout(150);R.katPasif=await kNodes();
await p.locator('.chip[data-filter="tumu"]').click();await p.waitForTimeout(120);
await p.fill('#catSearch','zzzzz');await p.waitForTimeout(200);R.katEmpty=await p.evaluate(()=>getComputedStyle(document.getElementById('catEmpty')).display!=='none');
await p.fill('#catSearch','');await p.waitForTimeout(120);
// Sil → sa-ui delege saConfirm
await p.locator('#catTree .cat-node').first().locator('.act-btn.danger').click();await p.waitForTimeout(300);
R.katDelModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));await p.keyboard.press('Escape');await p.waitForTimeout(200);
R.katOv1440=await ov(p);R.katMint1440=await mint(p);
await shot(p,'sa-store-kategoriler-1440');await p.close();
p=await page(390,'kat-list-390');await p.goto(B+'sa-store-kategoriler.html',{waitUntil:'networkidle'});await p.waitForTimeout(350);
R.katOv390=await ov(p);R.katMint390=await mint(p);await shot(p,'sa-store-kategoriler-390');await p.close();

/* ============ S3 KATEGORİLER (form) ============ */
p=await page(1440,'kat-form');
await p.goto(B+'sa-store-kategoriler-form.html',{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.katFInputs=await p.evaluate(()=>document.querySelectorAll('.finput,.fselect,.ftext').length);
R.katFToggle=await p.evaluate(()=>document.querySelectorAll('.toggle input').length);
// ikon seç
await p.locator('#iconPick .icon-opt').nth(2).click();await p.waitForTimeout(120);
R.katIconSel=await p.evaluate(()=>document.querySelectorAll('#iconPick .icon-opt.is-on').length);
// kaydet → toast
await p.locator('.btn-acc',{hasText:'Kaydet'}).click();await p.waitForTimeout(250);
R.katSaveToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));await p.waitForTimeout(1500);
R.katFOv1440=await ov(p);R.katFMint1440=await mint(p);
await shot(p,'sa-store-kategoriler-form-1440');await p.close();
p=await page(390,'kat-form-390');await p.goto(B+'sa-store-kategoriler-form.html',{waitUntil:'networkidle'});await p.waitForTimeout(350);
R.katFOv390=await ov(p);R.katFMint390=await mint(p);await shot(p,'sa-store-kategoriler-form-390');await p.close();

/* ============ S4 PROMOSYONLAR (liste) ============ */
p=await page(1440,'promo-list');
await p.goto(B+'sa-store-promosyonlar.html',{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.promoChipR=await chipRadius(p);
const prRows=()=>p.evaluate(()=>Array.from(document.querySelectorAll('#promoTable tbody tr')).filter(r=>r.style.display!=='none').length);
R.promoAll=await prRows();
await p.locator('.chip[data-filter="zamanli"]').click();await p.waitForTimeout(150);R.promoZam=await prRows();
await p.locator('.chip[data-filter="bitti"]').click();await p.waitForTimeout(150);R.promoBitti=await prRows();
await p.locator('.chip[data-filter="tumu"]').click();await p.waitForTimeout(120);
await p.fill('#promoSearch','yaz');await p.waitForTimeout(200);R.promoSearch=await prRows();
await p.fill('#promoSearch','zzzzz');await p.waitForTimeout(200);R.promoEmpty=await p.evaluate(()=>getComputedStyle(document.getElementById('promoEmpty')).display!=='none');
await p.fill('#promoSearch','');await p.waitForTimeout(120);
await p.locator('#promoTable tbody tr:first-child .act-btn.danger').click();await p.waitForTimeout(300);
R.promoDelModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));await p.keyboard.press('Escape');await p.waitForTimeout(200);
R.promoOv1440=await ov(p);R.promoMint1440=await mint(p);
await shot(p,'sa-store-promosyonlar-1440');await p.close();
p=await page(390,'promo-list-390');await p.goto(B+'sa-store-promosyonlar.html',{waitUntil:'networkidle'});await p.waitForTimeout(350);
R.promoOv390=await ov(p);R.promoMint390=await mint(p);await shot(p,'sa-store-promosyonlar-390');await p.close();

/* ============ S4 PROMOSYONLAR (form) ============ */
p=await page(1440,'promo-form');
await p.goto(B+'sa-store-promosyonlar-form.html',{waitUntil:'networkidle'});await p.waitForTimeout(400);
// tip değişince ek + önizleme sync
await p.selectOption('#typeSelect','tutar');await p.waitForTimeout(150);
R.promoSfx=await p.evaluate(()=>document.getElementById('valSfx').textContent);
R.promoPpDesc=await p.evaluate(()=>document.getElementById('ppDesc').textContent);
await p.locator('.btn-acc',{hasText:'Kaydet'}).click();await p.waitForTimeout(250);
R.promoSaveToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));await p.waitForTimeout(1500);
R.promoFOv1440=await ov(p);R.promoFMint1440=await mint(p);
await shot(p,'sa-store-promosyonlar-form-1440');await p.close();
p=await page(390,'promo-form-390');await p.goto(B+'sa-store-promosyonlar-form.html',{waitUntil:'networkidle'});await p.waitForTimeout(350);
R.promoFOv390=await ov(p);R.promoFMint390=await mint(p);await shot(p,'sa-store-promosyonlar-form-390');await p.close();

/* ============ S5 KARGO & ÖDEME (liste) ============ */
p=await page(1440,'kargo-list');
await p.goto(B+'sa-store-kargo.html',{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.kargoTabR=await chipRadius(p);
R.kargoYeni=await p.evaluate(()=>document.getElementById('newBtn').textContent.trim());
// sekme geçiş: ödeme paneli
await p.locator('.tab[data-tab="odeme"]').click();await p.waitForTimeout(200);
R.kargoOdemePanel=await p.evaluate(()=>document.querySelector('.tab-panel[data-panel="odeme"]').classList.contains('is-on'));
R.kargoNewLbl2=await p.evaluate(()=>document.getElementById('newBtn').textContent.trim());
await p.locator('.tab[data-tab="kargo"]').click();await p.waitForTimeout(150);
// Sil → saConfirm
await p.locator('.tab-panel[data-panel="kargo"] .act-btn.danger').first().click();await p.waitForTimeout(300);
R.kargoDelModal=await p.evaluate(()=>!!document.querySelector('.sa-modal-ov.open'));await p.keyboard.press('Escape');await p.waitForTimeout(200);
R.kargoOv1440=await ov(p);R.kargoMint1440=await mint(p);
await shot(p,'sa-store-kargo-1440');await p.close();
p=await page(390,'kargo-list-390');await p.goto(B+'sa-store-kargo.html',{waitUntil:'networkidle'});await p.waitForTimeout(350);
R.kargoOv390=await ov(p);R.kargoMint390=await mint(p);await shot(p,'sa-store-kargo-390');await p.close();

/* ============ S5 KARGO (form) ============ */
p=await page(1440,'kargo-form');
await p.goto(B+'sa-store-kargo-form.html',{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.kargoFInputs=await p.evaluate(()=>document.querySelectorAll('.finput,.fselect,.ftext').length);
await p.locator('#regionPick .region-opt').first().click();await p.waitForTimeout(120);
R.kargoRegionToggle=await p.evaluate(()=>document.querySelectorAll('#regionPick .region-opt.is-on').length);
await p.locator('.btn-acc',{hasText:'Kaydet'}).click();await p.waitForTimeout(250);
R.kargoSaveToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));await p.waitForTimeout(1500);
R.kargoFOv1440=await ov(p);R.kargoFMint1440=await mint(p);
await shot(p,'sa-store-kargo-form-1440');await p.close();
p=await page(390,'kargo-form-390');await p.goto(B+'sa-store-kargo-form.html',{waitUntil:'networkidle'});await p.waitForTimeout(350);
R.kargoFOv390=await ov(p);R.kargoFMint390=await mint(p);await shot(p,'sa-store-kargo-form-390');await p.close();

/* ============ S6 RAPORLAR (dashboard) ============ */
p=await page(1440,'rapor');
await p.goto(B+'sa-store-raporlar.html',{waitUntil:'networkidle'});await p.waitForTimeout(400);
R.raporKpi=await p.evaluate(()=>document.querySelectorAll('.kpi-grid .kpi-card').length);
R.raporBars=await p.evaluate(()=>document.querySelectorAll('#growthBars .bar-col').length);
R.raporDist=await p.evaluate(()=>document.querySelectorAll('.dist-list .dist-row').length);
R.raporTables=await p.evaluate(()=>document.querySelectorAll('.rep-tables .ptable').length);
R.raporActList=await p.evaluate(()=>document.querySelectorAll('.rep-tables .act-list').length);
// range chip toggle → ph-sub değişir
const subBefore=await p.evaluate(()=>document.getElementById('repSub').textContent);
await p.locator('#rangeChips .chip[data-range="7g"]').click();await p.waitForTimeout(180);
const subAfter=await p.evaluate(()=>document.getElementById('repSub').textContent);
R.raporRangeToggle=(subBefore!==subAfter);
R.raporRangeR=await p.evaluate(()=>getComputedStyle(document.querySelector('#rangeChips .chip')).borderRadius);
// export → toast
await p.locator('#exportBtn').click();await p.waitForTimeout(250);
R.raporExportToast=await p.evaluate(()=>!!document.querySelector('.sa-toast'));await p.waitForTimeout(1500);
R.raporOv1440=await ov(p);R.raporMint1440=await mint(p);
await shot(p,'sa-store-raporlar-1440');await p.close();
p=await page(390,'rapor-390');await p.goto(B+'sa-store-raporlar.html',{waitUntil:'networkidle'});await p.waitForTimeout(350);
R.raporOv390=await ov(p);R.raporMint390=await mint(p);await shot(p,'sa-store-raporlar-390');await p.close();

await b.close();

const ovAll=[R.mustOv1440,R.mustOv390,R.mustDOv1440,R.mustDOv390,R.katOv1440,R.katOv390,R.katFOv1440,R.katFOv390,R.promoOv1440,R.promoOv390,R.promoFOv1440,R.promoFOv390,R.kargoOv1440,R.kargoOv390,R.kargoFOv1440,R.kargoFOv390,R.raporOv1440,R.raporOv390];
const mintAll=[R.mustMint1440,R.mustMint390,R.mustDMint1440,R.mustDMint390,R.katMint1440,R.katMint390,R.katFMint1440,R.katFMint390,R.promoMint1440,R.promoMint390,R.promoFMint1440,R.promoFMint390,R.kargoMint1440,R.kargoMint390,R.kargoFMint1440,R.kargoFMint390,R.raporMint1440,R.raporMint390];

console.log('=== STORE WAVE-2 QA (S2-S6) ===');
console.log('acc token            :',JSON.stringify(R.mustAcc),'(expect #E14827 domates)');
console.log('chip radius (köşeli) must/kat/promo/kargo-tab/rapor-range:',R.mustChipR,'/',R.katChipR,'/',R.promoChipR,'/',R.kargoTabR,'/',R.raporRangeR,'(pill 999px DEĞİL)');
console.log('-- S2 müşteriler liste --');
console.log('  menu/rows all/vip/pasif/search :',R.mustMenu,'/',R.mustAll,'/',R.mustVip,'/',R.mustPasif,'/',R.mustSearch,'(8/2/1/1)');
console.log('  empty / Yeni-yok / rowAct=1 / trash-yok :',R.mustEmpty,'/',!R.mustYeni,'/',R.mustRowAct,'/',!R.mustTrash);
console.log('-- S2 müşteriler detay --');
console.log('  Düzenle-yok / back / audit=3 :',!R.mustDDuzenle,'/',JSON.stringify(R.mustDBack),'/',R.mustDAudit);
console.log('  Sil saConfirm modal/danger/toast :',R.mustDelModal,'/',R.mustDelDanger,'/',R.mustDelToast);
console.log('-- S3 kategoriler liste --');
console.log('  menu/Yeni/node1-open/node2-toggle/pasif/empty :',R.katMenu,'/',R.katYeni,'/',R.katNode1Open,'/',R.katNode2Open,'/',R.katPasif,'/',R.katEmpty);
console.log('  Sil saConfirm modal :',R.katDelModal);
console.log('-- S3 kategoriler form --');
console.log('  inputs/toggle/iconSel=1/saveToast :',R.katFInputs,'/',R.katFToggle,'/',R.katIconSel,'/',R.katSaveToast);
console.log('-- S4 promosyonlar liste --');
console.log('  all/zamanli/bitti/search/empty :',R.promoAll,'/',R.promoZam,'/',R.promoBitti,'/',R.promoSearch,'/',R.promoEmpty,'(6/2/1/1)');
console.log('  Sil saConfirm modal :',R.promoDelModal);
console.log('-- S4 promosyonlar form --');
console.log('  tip→sfx / ppDesc / saveToast :',JSON.stringify(R.promoSfx),'/',JSON.stringify(R.promoPpDesc),'/',R.promoSaveToast);
console.log('-- S5 kargo liste --');
console.log('  newBtn / odeme-panel / newLbl2 / Sil-modal :',JSON.stringify(R.kargoYeni),'/',R.kargoOdemePanel,'/',JSON.stringify(R.kargoNewLbl2),'/',R.kargoDelModal);
console.log('-- S5 kargo form --');
console.log('  inputs/regionToggle/saveToast :',R.kargoFInputs,'/',R.kargoRegionToggle,'/',R.kargoSaveToast);
console.log('-- S6 raporlar dashboard --');
console.log('  kpi=4/bars=8/dist=5/ptable=1+actlist=1 :',R.raporKpi,'/',R.raporBars,'/',R.raporDist,'/',R.raporTables,'+',R.raporActList,'(B1 kanonu: 1 tablo + 1 aktivite listesi)');
console.log('  rangeToggle / exportToast :',R.raporRangeToggle,'/',R.raporExportToast);
console.log('== GENEL ==');
console.log('OVERFLOW max (18 görünüm) :',Math.max(...ovAll),'(expect 0)','->',JSON.stringify(ovAll));
console.log('MINT LEAK total           :',mintAll.reduce((a,c)=>a+c,0),'(expect 0)','->',JSON.stringify(mintAll));
console.log('JS errors                 :',errors.length,errors.length?JSON.stringify(errors):'NONE');
