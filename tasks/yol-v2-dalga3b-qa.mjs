import { chromium } from 'playwright';
const URL='http://localhost:8765/v6/yol-guzergahim-v2.html';
const out='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const R={};
const errs=[];
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
const p=await ctx.newPage();
p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
p.on('pageerror',e=>errs.push('[pageerror] '+e.message));
await p.goto(URL,{waitUntil:'networkidle'});
await p.waitForTimeout(600);

// --- boş durum ---
await p.locator('#tabSaved').click(); await p.waitForTimeout(300);
R.emptyStateShown=await p.locator('#ygSavedEmpty').isVisible();
R.savedCntHiddenInit=await p.locator('#savedCnt').isHidden();
await p.locator('#tabRoute').click(); await p.waitForTimeout(200);

// --- rota kur: İstanbul → Ankara ---
const inputs=p.locator('#ygStopList .yg-stop-input');
await inputs.nth(0).fill('İsta'); await p.waitForTimeout(220);
await p.locator('#ygStopList .yg-stop').nth(0).locator('.yg-ac button').first().click();
await p.waitForTimeout(180);
await p.locator('#ygStopList .yg-stop-input').nth(1).fill('Anka'); await p.waitForTimeout(220);
await p.locator('#ygStopList .yg-stop').nth(1).locator('.yg-ac button').first().click();
await p.waitForTimeout(5200);
R.kmShown=(await p.locator('#ygKm').textContent()).trim();
R.dashVisible=await p.locator('#ygDash').isVisible();

// --- 2 mekan ekle (dash kart → detay → Güzergaha Ekle) ---
await p.locator('#ygDashScroll .yg-dcard').nth(0).click(); await p.waitForTimeout(700);
await p.locator('#ygDetailAdd').click(); await p.waitForTimeout(200);
await p.locator('#ygDashScroll .yg-dcard').nth(1).click(); await p.waitForTimeout(700);
await p.locator('#ygDetailAdd').click(); await p.waitForTimeout(200);
R.mineCount=await p.locator('#ygMineList .yg-mine-card').count();

// --- KAYDET bloğu görünür + otomatik ad + düzenlenebilir ---
R.saveBlockVisible=await p.locator('#ygSave').isVisible();
R.autoName=await p.locator('#ygSaveName').inputValue();
await p.locator('#ygSaveName').fill('İpek Yolu Hattı'); await p.waitForTimeout(120);
R.editedName=await p.locator('#ygSaveName').inputValue();
await p.locator('#ygSaveBtn').click();
await p.waitForTimeout(700);

// --- localStorage'a yazıldı mı + şema ---
const ls=await p.evaluate(()=>JSON.parse(localStorage.getItem('dada_yg_v2_routes')||'[]'));
R.lsCount=ls.length;
R.lsRec=ls[0]?{ad:ls[0].ad,stops:ls[0].stops.length,venues:ls[0].venues.length,km:ls[0].km,hasId:!!ls[0].id,hasTs:!!ls[0].ts}:null;

// --- toast + Güzergahlarım'a otomatik geçiş ---
R.toastAfterSave=await p.locator('.yg-toast').count();
R.toastTxt=(await p.locator('.yg-toast span').first().textContent().catch(()=>'')).trim();
R.switchedToSaved=await p.locator('#viewSaved').isVisible();
R.savedCntShown=(await p.locator('#savedCnt').textContent()).trim();

// --- Güzergahlarım kartı: ad/özet/tarih ---
R.savedCards=await p.locator('#ygSavedList .yg-sv-card').count();
R.cardName=(await p.locator('#ygSavedList .yg-sv-name span').first().textContent()).trim();
R.cardMeta=(await p.locator('#ygSavedList .yg-sv-meta').first().textContent()).trim();
R.cardDate=(await p.locator('#ygSavedList .yg-sv-date').first().textContent()).trim();
await p.screenshot({path:`${out}/dalga3b_1440_saved.png`,fullPage:false});

// --- CHECKPOINT: Ziyaretler aç → bir mekan işaretle → ilerleme güncel ---
await p.locator('#ygSavedList .yg-sv-check').first().click(); await p.waitForTimeout(250);
R.checklistShown=await p.locator('#ygSavedList .yg-sv-venues').first().isVisible();
await p.locator('#ygSavedList .yg-sv-vrow').first().click(); await p.waitForTimeout(200);
R.rowMarkedOn=await p.locator('#ygSavedList .yg-sv-vrow').first().evaluate(el=>el.classList.contains('on'));
R.progTxt=(await p.locator('#ygSavedList .yg-sv-prog-txt').first().textContent()).trim();
const vis=await p.evaluate(()=>JSON.parse(localStorage.getItem('dada_yg_v2_visited')||'{}'));
R.visitedKeys=Object.keys(vis).length; R.visitedHasEntry=Object.values(vis).some(o=>Object.keys(o).length>0);
await p.screenshot({path:`${out}/dalga3b_1440_checkpoint.png`,fullPage:false});

// --- kalıcılık: reload → ilerleme korunur ---
await p.reload({waitUntil:'networkidle'}); await p.waitForTimeout(500);
await p.locator('#tabSaved').click(); await p.waitForTimeout(300);
R.persistCards=await p.locator('#ygSavedList .yg-sv-card').count();
R.persistProg=(await p.locator('#ygSavedList .yg-sv-prog-txt').first().textContent()).trim();

// --- YÜKLE → rota geri yüklenir (Rota Kur'a döner, duraklar dolu) ---
await p.locator('#ygSavedList .yg-sv-load').first().click();
await p.waitForTimeout(5200);
R.loadedToRoute=await p.locator('#viewRoute').isVisible();
R.loadedStop1=await p.locator('#ygStopList .yg-stop-input').nth(0).inputValue();
R.loadedStop2=await p.locator('#ygStopList .yg-stop-input').nth(1).inputValue();
R.loadedKm=(await p.locator('#ygKm').textContent()).trim();
R.loadedMine=await p.locator('#ygMineList .yg-mine-card').count();
await p.screenshot({path:`${out}/dalga3b_1440_loaded.png`,fullPage:false});

// --- SİL → onaylı sil ---
await p.locator('#tabSaved').click(); await p.waitForTimeout(300);
await p.locator('#ygSavedList .yg-sv-del').first().click(); await p.waitForTimeout(200);
R.confirmShown=await p.locator('#ygSavedList .yg-sv-confirm').first().isVisible();
await p.locator('#ygSavedList .yg-sv-yes').first().click(); await p.waitForTimeout(300);
R.afterDeleteCards=await p.locator('#ygSavedList .yg-sv-card').count();
R.afterDeleteEmpty=await p.locator('#ygSavedEmpty').isVisible();
const lsAfter=await p.evaluate(()=>JSON.parse(localStorage.getItem('dada_yg_v2_routes')||'[]'));
const visAfter=await p.evaluate(()=>JSON.parse(localStorage.getItem('dada_yg_v2_visited')||'{}'));
R.lsAfterDelete=lsAfter.length; R.visAfterDelete=Object.keys(visAfter).length;  // route-scoped ziyaret de silinmeli

// --- konum-bul intact ---
R.fabIntact=await p.locator('#ygLocate').isVisible();

R.errs=errs.slice(0,10);
await ctx.close();

// ===================== 390 mobil — kaydet + kart render =====================
const errs2=[];
const ctxM=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
const pm=await ctxM.newPage();
pm.on('console',m=>{if(m.type()==='error')errs2.push(m.text());});
pm.on('pageerror',e=>errs2.push('[pageerror] '+e.message));
await pm.goto(URL,{waitUntil:'networkidle'}); await pm.waitForTimeout(600);
const mi=pm.locator('#ygStopList .yg-stop-input');
await mi.nth(0).fill('İzmir'); await pm.waitForTimeout(220);
await pm.locator('#ygStopList .yg-stop').nth(0).locator('.yg-ac button').first().click(); await pm.waitForTimeout(180);
await pm.locator('#ygStopList .yg-stop-input').nth(1).fill('Antaly'); await pm.waitForTimeout(220);
await pm.locator('#ygStopList .yg-stop').nth(1).locator('.yg-ac button').first().click();
await pm.waitForTimeout(5200);
R.m_saveVisible=await pm.locator('#ygSave').isVisible();
R.m_autoName=await pm.locator('#ygSaveName').inputValue();
await pm.locator('#ygSaveBtn').click(); await pm.waitForTimeout(600);
R.m_savedCard=await pm.locator('#ygSavedList .yg-sv-card').count();
await pm.screenshot({path:`${out}/dalga3b_390.png`,fullPage:false});
R.errs390=errs2.slice(0,10);
await ctxM.close();

// ===================== mojibake =====================
const ctxT=await b.newContext(); const pt=await ctxT.newPage();
await pt.goto(URL,{waitUntil:'domcontentloaded'});
R.mojibake=await pt.evaluate(()=>{const t=document.body.innerText;return (t.match(/Ã|Å|Ä±|Ä°|Ã§|Ã¶|Ã¼|â€/g)||[]).length;});
await ctxT.close();

await b.close();
console.log(JSON.stringify(R,null,2));
