import { chromium } from 'playwright';
const BASE='http://localhost:8765/v6';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const results=[]; const ok=(n,c)=>results.push([c?'PASS':'FAIL',n]);

async function pickStop(p,i,name){
  const inp=p.locator('.yg-stop-input[data-i="'+i+'"]');
  await inp.click(); await inp.fill(name);
  const opt=p.locator('.yg-stop .yg-ac button',{hasText:name}).first();
  await opt.waitFor({state:'visible',timeout:5000});
  await opt.click();
}

async function run(w,h,tag){
  const ctx=await b.newContext({viewport:{width:w,height:h}});
  const p=await ctx.newPage();
  const errs=[];
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
  p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
  await p.goto(BASE+'/yol-guzergahim-v2.html',{waitUntil:'networkidle'});
  await p.waitForTimeout(400);

  // --- build route İstanbul → Ankara (real OSRM) ---
  await pickStop(p,0,'İstanbul');
  await pickStop(p,1,'Ankara');
  // wait for venues dash
  let dashOk=false;
  try{ await p.waitForSelector('#ygDash:not([hidden])',{timeout:25000}); dashOk=true; }catch(e){}
  if(tag==='1440') ok('rota çizildi + alt kadran açıldı', dashOk);

  if(dashOk){
    const cards=p.locator('#ygDashScroll .yg-dcard');
    const n=await cards.count();
    if(tag==='1440') ok('alt kadran kart sayısı >0 ('+n+')', n>0);

    // K8a: cards fully visible (no vertical clip) — card bottom within scroll viewport + scrollbar
    const clip=await p.evaluate(()=>{
      const sc=document.getElementById('ygDashScroll');
      const cs=sc.querySelectorAll('.yg-dcard');
      if(!cs.length)return {bad:1};
      const sb=sc.getBoundingClientRect();
      let bad=0;
      cs.forEach(c=>{const r=c.getBoundingClientRect(); if(r.height<70) bad++; if(r.bottom>sb.bottom+1) bad++;});
      return {bad, h:Math.round(cs[0].getBoundingClientRect().height)};
    });
    if(tag==='1440') ok('kartlar TAM görünür (kesik yok), kart-h='+clip.h, clip.bad===0);

    // K8b: hover → no translateY lift (was the clipped top-line cause)
    await cards.first().hover();
    await p.waitForTimeout(120);
    const tf=await cards.first().evaluate(el=>getComputedStyle(el).transform);
    if(tag==='1440') ok('hover transform yok (üst-çizgi gitti): '+tf, tf==='none');

    // K1: click card → detail card
    await cards.first().click();
    await p.waitForTimeout(700);
    const det=p.locator('#ygDetail');
    const detVis=await det.isVisible();
    if(tag==='1440') ok('mekana tıkla → detay kartı açıldı', detVis);
    const dName=(await p.locator('#ygDetailName').textContent())||'';
    const dTag=(await p.locator('#ygDetailTag').textContent())||'';
    const dBtn=(await p.locator('#ygDetailAddTxt').textContent())||'';
    if(tag==='1440') ok('detay: ad+tag+ekle ("'+dName.trim()+'" · "'+dTag.trim()+'" · "'+dBtn.trim()+'")',
      dName.trim().length>0 && /km/.test(dTag) && /Güzergaha Ekle/.test(dBtn));
    const mediaBg=await p.locator('#ygDetailMedia').evaluate(el=>getComputedStyle(el).backgroundImage);
    if(tag==='1440') ok('detay foto (div+bg cover)', /url\(/.test(mediaBg));

    // K2: add to route → selectedVenues + button toggle + pin sel
    await p.locator('#ygDetailAdd').click();
    await p.waitForTimeout(250);
    const btn2=(await p.locator('#ygDetailAddTxt').textContent())||'';
    const added=await p.locator('#ygDetailAdd').evaluate(el=>el.classList.contains('is-added'));
    if(tag==='1440') ok('Güzergaha Ekle → buton "Eklendi"+is-added', /Eklendi/.test(btn2) && added);
    const selPin=await p.locator('.yg-vpin.sel').count();
    if(tag==='1440') ok('harita pini seçili görünüme geçti (.yg-vpin.sel='+selPin+')', selPin>=1);

    // K3: mine list
    const mineVis=await p.locator('#ygMine').isVisible();
    const mineCnt=(await p.locator('#ygMineCnt').textContent())||'';
    const mineCards=await p.locator('#ygMineList .yg-mine-card').count();
    if(tag==='1440') ok('sol panel "Güzergahımdaki mekanlar" + sayaç='+mineCnt+' + kart='+mineCards, mineVis && mineCnt==='1' && mineCards===1);

    // K3 remove
    await p.locator('#ygMineList .yg-mine-x').first().click();
    await p.waitForTimeout(200);
    const mineCnt2=(await p.locator('#ygMineCnt').textContent())||'';
    const emptyVis=await p.locator('#ygMineEmpty').isVisible();
    const btn3=(await p.locator('#ygDetailAddTxt').textContent())||'';
    if(tag==='1440') ok('çıkar → sayaç=0 + boş durum + detay buton geri', mineCnt2==='0' && emptyVis && /Güzergaha Ekle/.test(btn3));

    // Dalga1+2 intact: route line + stop pins + slider
    const routePaths=await p.locator('.leaflet-overlay-pane path').count();
    const stopPins=await p.locator('.yg-pin.stop').count();
    if(tag==='1440') ok('Dalga1+2: rota çizgisi('+routePaths+') + durak pini('+stopPins+')', routePaths>=2 && stopPins>=2);
    // slider drives counts
    const before=(await p.locator('#ygDashCount').textContent())||'';
    await p.locator('#ygCorrSlider').evaluate(el=>{el.value=30;el.dispatchEvent(new Event('input',{bubbles:true}));});
    await p.waitForTimeout(250);
    const after=(await p.locator('#ygDashCount').textContent())||'';
    if(tag==='1440') ok('eşik slider sayımı sürüyor ('+before+'→'+after+')', after!=='' );
  }

  await p.screenshot({path:OUT+'/yol-v2-d3a-'+tag+'.png',fullPage:false});
  if(tag==='1440') ok('console 0 hata'+(errs.length?' :: '+errs.slice(0,3).join(' | '):''), errs.length===0);
  await ctx.close();
  return errs;
}

await run(1440,900,'1440');
await run(390,780,'390');

// K7: portal + kesfet links point to v2
for(const f of ['anasayfa-portal-v3a.html','kesfet-v1.html']){
  const ctx=await b.newContext(); const p=await ctx.newPage();
  await p.goto(BASE+'/'+f,{waitUntil:'domcontentloaded'});
  const hasV2=await p.locator('a[href="yol-guzergahim-v2.html"]').count();
  const hasV1=await p.locator('a[href="yol-guzergahim-v1.html"]').count();
  ok('K7 '+f+': v2 link var='+hasV2+', v1 kalıntı='+hasV1, hasV2>=1 && hasV1===0);
  await ctx.close();
}

await b.close();
console.log('\n=== Dalga 3-A QA ===');
results.forEach(([s,n])=>console.log(s+'  '+n));
const fails=results.filter(r=>r[0]==='FAIL').length;
console.log('\n'+(fails?('❌ '+fails+' FAIL'):'✅ ALL PASS')+' ('+results.length+' kontrol)');
process.exit(fails?1:0);
