import { chromium } from 'playwright';
const URL='http://localhost:8765/v6/yol-guzergahim-v2.html';
const out='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const R={};
const rects=(a,c)=>!(a.x+a.width<=c.x||c.x+c.width<=a.x||a.y+a.height<=c.y||c.y+c.height<=a.y); // kesişiyor mu

// ===================== 1440 — KONUM İZNİ VERİLDİ =====================
const errs=[];
const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,
  permissions:['geolocation'], geolocation:{latitude:40.95,longitude:29.10}}); // İstanbul'a yakın (Kartal civarı)
const p=await ctx.newPage();
p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
p.on('pageerror',e=>errs.push('[pageerror] '+e.message));
await p.goto(URL,{waitUntil:'networkidle'});
await p.waitForTimeout(700);

// --- FAB görünür + ikon + boyut ---
R.fabVisible=await p.locator('#ygLocate').isVisible();
R.fabIcon=await p.locator('#ygLocate i').getAttribute('class');
const fb=await p.locator('#ygLocate').boundingBox();
R.fabSize=fb?`${Math.round(fb.width)}x${Math.round(fb.height)}`:'none';

// --- çakışma: zoom kontrolü ile ---
const zb=await p.locator('.leaflet-control-zoom').boundingBox();
R.fabVsZoom_overlap=(fb&&zb)?rects(fb,zb):'?';

// --- harita drag bozulmadı: merkez sürükle ile değişiyor mu ---
const c0=await p.evaluate(()=>{const m=document.querySelector('#routeMap')._leaflet_map;return null;}).catch(()=>null);
const mapBox=await p.locator('#routeMap').boundingBox();
const center0=await p.locator('#routeMap').evaluate(()=>({})); // leaflet map private; merkez yerine drag-etkisini ölç
// fareyle harita ortasından sürükle, tile transform değişimini ölç
const beforeT=await p.locator('.leaflet-map-pane').evaluate(el=>el.style.transform||getComputedStyle(el).transform);
await p.mouse.move(mapBox.x+mapBox.width*0.6, mapBox.y+mapBox.height*0.5);
await p.mouse.down(); await p.mouse.move(mapBox.x+mapBox.width*0.6-160, mapBox.y+mapBox.height*0.5-90,{steps:8}); await p.mouse.up();
await p.waitForTimeout(400);
const afterT=await p.locator('.leaflet-map-pane').evaluate(el=>el.style.transform||getComputedStyle(el).transform);
R.mapDragWorks=(beforeT!==afterT);

// --- konumumu bul tıkla ---
await p.locator('#ygLocate').click();
await p.waitForTimeout(1500);
R.geoDot=await p.locator('.yg-geo-dot').count();              // mavi nokta marker
R.geoPromptVisible=await p.locator('#ygGeoPrompt').isVisible();
R.geoCity=(await p.locator('#ygGeoCity').textContent()).trim(); // en yakın şehir + km
R.startBtnVisible=await p.locator('#ygGeoStart').isVisible();

// --- "Buradan başla" → 1. durağa en yakın şehir ---
await p.locator('#ygGeoStart').click();
await p.waitForTimeout(600);
R.stop1AfterStart=await p.locator('#ygStopList .yg-stop-input').nth(0).inputValue();
R.promptClosedAfterStart=!(await p.locator('#ygGeoPrompt').isVisible());
R.stopCountStill2=(await p.locator('#ygStopList .yg-stop-input').count()); // mekan≠durak, hâlâ 2

await p.screenshot({path:`${out}/konumbul_1440_prompt.png`,fullPage:false});

// --- Dalga 1+2+3A+K9 intact: 2. durak ekle → rota + dash + pin + Tümünü Gör ---
await p.locator('#ygStopList .yg-stop-input').nth(1).fill('Anka'); await p.waitForTimeout(240);
await p.locator('#ygStopList .yg-stop').nth(1).locator('.yg-ac button').first().click();
await p.waitForTimeout(5000);
R.kmShown=(await p.locator('#ygKm').textContent()).trim();
R.dashVisible=await p.locator('#ygDash').isVisible();
R.dashCards=await p.locator('#ygDashScroll .yg-dcard').count();
R.venuePins=await p.locator('.yg-vpin').count();

// --- FAB dash ile çakışmıyor (dash açıkken FAB yukarı kaydı mı) ---
const fb2=await p.locator('#ygLocate').boundingBox();
const db=await p.locator('#ygDash').boundingBox();
R.fabVsDash_overlap=(fb2&&db)?rects(fb2,db):'?';
R.fabMovedUpForDash=(fb2&&fb)?(fb2.y<fb.y):'?';

// --- Tümünü Gör + mekan ekle (K9 senkron) intact ---
const moreBtn=p.locator('#ygDashScroll .yg-dmore');
if(await moreBtn.count()){ await moreBtn.click(); await p.waitForTimeout(400);
  R.allViewOpen=await p.locator('#viewAll').isVisible();
  R.allCards=await p.locator('#ygAllList .yg-fl-card').count();
  await p.locator('#ygAllBack').click(); await p.waitForTimeout(300);
} else { R.allViewOpen='no-more-btn'; }

await p.screenshot({path:`${out}/konumbul_1440_route.png`,fullPage:false});
R.errs1440=errs.slice(0,8);
await ctx.close();

// ===================== 1440 — KONUM REDDİ (graceful) =====================
const errs2=[];
const ctxD=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1}); // permission YOK → denied
const pd=await ctxD.newPage();
pd.on('console',m=>{if(m.type()==='error')errs2.push(m.text());});
pd.on('pageerror',e=>errs2.push('[pageerror] '+e.message));
await pd.goto(URL,{waitUntil:'networkidle'});
await pd.waitForTimeout(600);
await pd.locator('#ygLocate').click();
await pd.waitForTimeout(1800);
R.deniedToast=await pd.locator('.yg-toast').count();
R.deniedToastTxt=(await pd.locator('.yg-toast span').first().textContent().catch(()=>'')).trim();
R.deniedNoDot=(await pd.locator('.yg-geo-dot').count())===0;       // sahte konum YOK
R.deniedNoPrompt=!(await pd.locator('#ygGeoPrompt').isVisible());
await pd.screenshot({path:`${out}/konumbul_1440_denied.png`,fullPage:false});
R.errsDenied=errs2.slice(0,8);
await ctxD.close();

// ===================== 390 — mobil görünüm + izinli =====================
const errs3=[];
const ctxM=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true,
  permissions:['geolocation'], geolocation:{latitude:38.42,longitude:27.14}}); // İzmir
const pm=await ctxM.newPage();
pm.on('console',m=>{if(m.type()==='error')errs3.push(m.text());});
pm.on('pageerror',e=>errs3.push('[pageerror] '+e.message));
await pm.goto(URL,{waitUntil:'networkidle'});
await pm.waitForTimeout(700);
R.m_fabVisible=await pm.locator('#ygLocate').isVisible();
await pm.locator('#ygLocate').click();
await pm.waitForTimeout(1500);
R.m_geoDot=await pm.locator('.yg-geo-dot').count();
R.m_promptVisible=await pm.locator('#ygGeoPrompt').isVisible();
R.m_city=(await pm.locator('#ygGeoCity').textContent()).trim();
const mfb=await pm.locator('#ygLocate').boundingBox();
R.m_fabInView=mfb?(mfb.x+mfb.width<=390+1 && mfb.x>=0):'?';
await pm.screenshot({path:`${out}/konumbul_390.png`,fullPage:false});
R.errs390=errs3.slice(0,8);
await ctxM.close();

// ===================== mojibake taraması =====================
const ctxT=await b.newContext();
const pt=await ctxT.newPage();
await pt.goto(URL,{waitUntil:'domcontentloaded'});
R.mojibake=await pt.evaluate(()=>{const t=document.body.innerText;return (t.match(/Ã|Å|Ä±|Ä°|Ã§|Ã¶|Ã¼|â€/g)||[]).length;});
await ctxT.close();

await b.close();
console.log(JSON.stringify(R,null,2));
