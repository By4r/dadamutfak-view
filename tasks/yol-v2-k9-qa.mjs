import { chromium } from 'playwright';
const BASE='http://localhost:8765/v6';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const R=[]; const ok=(n,c)=>R.push([c?'PASS':'FAIL',n]);
const pick=async(p,i,name)=>{const inp=p.locator('.yg-stop-input[data-i="'+i+'"]');await inp.click();await inp.fill(name);const o=p.locator('.yg-stop .yg-ac button',{hasText:name}).first();await o.waitFor({state:'visible',timeout:6000});await o.click();};
const num=t=>parseInt((t||'').replace(/[^0-9]/g,''))||0;

async function run(w,h,tag){
  const ctx=await b.newContext({viewport:{width:w,height:h}});
  const p=await ctx.newPage(); const errs=[];
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
  p.on('pageerror',e=>errs.push('PE '+e.message));
  await p.goto(BASE+'/yol-guzergahim-v2.html',{waitUntil:'networkidle'});
  await pick(p,0,'İstanbul'); await pick(p,1,'Gaziantep');
  await p.waitForSelector('#ygDash:not([hidden])',{timeout:30000});
  await p.waitForTimeout(700);

  const total=num(await p.locator('#ygDashCount').textContent());
  const showcase=await p.locator('#ygDashScroll .yg-dcard').count();
  const ghost=await p.locator('#ygDashScroll .yg-dmore').count();
  if(tag==='1440'){
    ok('alt kadran = HIZLI VİTRİN (≤12 kart gösteriyor, toplam='+total+', kart='+showcase+')', showcase<=12 && showcase>0 && total>showcase);
    ok('vitrin başlık "Tümünü Gör" butonu var', await p.locator('#ygDashAll').isVisible());
    ok('scroll sonu "+N daha" hayalet kartı var', ghost===1);
  }

  // Tümünü Gör → push view
  await p.locator('#ygDashAll').click();
  await p.waitForTimeout(350);
  const allVis=await p.locator('#viewAll').isVisible();
  const routeHidden=!(await p.locator('#viewRoute').isVisible());
  const tabsHidden=!(await p.locator('.yg-tabs').isVisible());
  const bc=await p.locator('.yg-bc-back').isVisible();
  if(tag==='1440'){
    ok('Tümünü Gör → tam liste push view (tabs gizli + breadcrumb)', allVis && routeHidden && tabsHidden && bc);
  }
  const allCount=num(await p.locator('#ygAllCount').textContent());
  const cards=await p.locator('#ygAllList .yg-fl-card').count();
  if(tag==='1440') ok('tam liste TÜM mekanları gösteriyor (count='+allCount+'=='+total+' · kart='+cards+')', allCount===total && cards===total);

  // arama Türkçe-güvenli
  await p.locator('#ygAllSearch').fill('antep');
  await p.waitForTimeout(250);
  const cAntep=num(await p.locator('#ygAllCount').textContent());
  await p.locator('#ygAllSearch').fill('İZMİT');   // büyük harf → toLocaleLowerCase('tr') eşleşmeli
  await p.waitForTimeout(250);
  const cIzmit=num(await p.locator('#ygAllCount').textContent());
  if(tag==='1440') ok('arama Türkçe-güvenli filtreliyor (antep='+cAntep+', İZMİT='+cIzmit+', <toplam '+total+')', cAntep>0 && cAntep<total && cIzmit>0 && cIzmit<total);
  // boş sonuç
  await p.locator('#ygAllSearch').fill('zzqxw');
  await p.waitForTimeout(250);
  const emptyVis=await p.locator('#ygAllEmpty').isVisible();
  const cEmpty=num(await p.locator('#ygAllCount').textContent());
  if(tag==='1440') ok('eşleşme yok → kibar boş durum (count=0)', emptyVis && cEmpty===0);
  await p.locator('#ygAllSearch').fill('');
  await p.waitForTimeout(200);

  // filtre çipleri
  await p.locator('.yg-fl-chip[data-f="on"]').click(); await p.waitForTimeout(200);
  const cOn=num(await p.locator('#ygAllCount').textContent());
  await p.locator('.yg-fl-chip[data-f="near"]').click(); await p.waitForTimeout(200);
  const cNear=num(await p.locator('#ygAllCount').textContent());
  await p.locator('.yg-fl-chip[data-f="dada"]').click(); await p.waitForTimeout(200);
  const cDada=num(await p.locator('#ygAllCount').textContent());
  const dadaBadges=await p.locator('#ygAllList .yg-fl-badge').count();
  await p.locator('.yg-fl-chip[data-f="all"]').click(); await p.waitForTimeout(200);
  if(tag==='1440'){
    ok('filtre çipleri çalışıyor (yol üstü='+cOn+' + yola yakın='+cNear+' == toplam '+total+')', cOn+cNear===total && cOn>0 && cNear>0);
    ok('Dada filtresi (count='+cDada+' == rozetli kart '+dadaBadges+', <toplam)', cDada>0 && cDada<total && cDada===dadaBadges);
  }

  // ---- DERİN SENKRON akışı yalnız 1440 (mobilde detay bottom-sheet dash'i örter — kullanıcı ✕ ile kapatır) ----
  if(tag==='1440'){
    // tam listeden Güzergaha Ekle → senkron
    await p.locator('#ygAllList .yg-fl-add').first().click();
    await p.waitForTimeout(250);
    const firstAdded=await p.locator('#ygAllList .yg-fl-add').first().evaluate(el=>el.classList.contains('is-added'));
    const firstTxt=(await p.locator('#ygAllList .yg-fl-add').first().textContent()||'').trim();
    ok('tam listeden Ekle → buton "Eklendi"+is-added ("'+firstTxt+'")', firstAdded && /Eklendi/.test(firstTxt));

    // geri → Rota Kur, selectedVenues senkron (mine)
    await p.locator('.yg-bc-back').click(); await p.waitForTimeout(300);
    const backRoute=await p.locator('#viewRoute').isVisible();
    const tabsBack=await p.locator('.yg-tabs').isVisible();
    const mineCnt=num(await p.locator('#ygMineCnt').textContent());
    const mineCards=await p.locator('#ygMineList .yg-mine-card').count();
    ok('geri → Rota Kur + tabs geri + mine senkron (mineCnt='+mineCnt+', kart='+mineCards+')', backRoute && tabsBack && mineCnt===1 && mineCards===1);

    // çift yön senkron: dash showcase'ten EKLE → tam listede de "Eklendi"
    const dcards=p.locator('#ygDashScroll .yg-dcard');
    let added2=false; const dn=await dcards.count();
    for(let i=0;i<dn;i++){
      const sel=await dcards.nth(i).evaluate(el=>el.classList.contains('sel'));
      if(!sel){ await dcards.nth(i).click(); await p.waitForTimeout(500);
        await p.locator('#ygDetailAdd').click(); await p.waitForTimeout(250); added2=true; break; }
    }
    await p.locator('#ygDetailClose').click({force:true}); await p.waitForTimeout(180);
    await p.locator('#ygDashAll').click(); await p.waitForTimeout(300);
    const addedCount=await p.locator('#ygAllList .yg-fl-add.is-added').count();
    ok('çift-yön senkron: dash+tamliste ekleri tam listede is-added (='+addedCount+', ≥2 bekleniyor)', added2 && addedCount>=2);

    // tam listeden kart tıkla → K1 detay kartı
    await p.locator('#ygAllList .yg-fl-main').nth(2).click(); await p.waitForTimeout(600);
    ok('tam listeden mekana tıkla → K1 detay kartı açıldı', await p.locator('#ygDetail').isVisible());
    await p.locator('#ygDetailClose').click({force:true}); await p.waitForTimeout(180);

    // Dalga 1+2+3A intact
    await p.locator('.yg-bc-back').click(); await p.waitForTimeout(250);
    const routePaths=await p.locator('.leaflet-overlay-pane path').count();
    const stopPins=await p.locator('.yg-pin.stop').count();
    ok('Dalga1+2+3A bozulmadı (rota çizgisi='+routePaths+', durak pini='+stopPins+', mine='+mineCnt+')', routePaths>=2 && stopPins>=2 && mineCnt===1);
    ok('console 0 hata'+(errs.length?' :: '+errs.slice(0,3).join(' | '):''), errs.length===0);
    await p.locator('#ygDashAll').click(); await p.waitForTimeout(300);   // liste SS için yeniden aç
    await p.screenshot({path:OUT+'/yol-v2-k9-list-1440.png',fullPage:false});
  } else {
    // 390: lean — list açık, arama+çip doğrulandı; geri dön + SS
    ok('390: tam liste açıldı + arama/çip çalıştı (count akışı)', allCount===total && cAntep>0 && cOn+cNear===total);
    await p.screenshot({path:OUT+'/yol-v2-k9-list-390.png',fullPage:false});
    await p.locator('.yg-bc-back').click(); await p.waitForTimeout(250);
    ok('390: geri → Rota Kur', await p.locator('#viewRoute').isVisible());
    ok('390: console 0 hata'+(errs.length?' :: '+errs.slice(0,2).join(' | '):''), errs.length===0);
  }

  await p.screenshot({path:OUT+'/yol-v2-k9-'+tag+'.png',fullPage:false});
  await ctx.close();
}

await run(1440,900,'1440');
await run(390,780,'390');
await b.close();
console.log('\n=== K9 QA ===');
R.forEach(([s,n])=>console.log(s+'  '+n));
const f=R.filter(r=>r[0]==='FAIL').length;
console.log('\n'+(f?('❌ '+f+' FAIL'):'✅ ALL PASS')+' ('+R.length+' kontrol)');
process.exit(f?1:0);
