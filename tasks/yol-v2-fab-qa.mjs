import { chromium } from 'playwright';
const base='http://localhost:8765/v6/';
const pages=[{name:'portal',url:base+'anasayfa-portal-v3a.html'},{name:'kesfet',url:base+'kesfet-v1.html'}];
const out='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const rects=(a,c)=>(a&&c)?!(a.x+a.width<=c.x||c.x+c.width<=a.x||a.y+a.height<=c.y||c.y+c.height<=a.y):'?';
const R={};

for(const pg of pages){
  const o=R[pg.name]={};
  // ---- 1440 desktop ----
  const errs=[];
  const ctx=await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
  const p=await ctx.newPage();
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
  p.on('pageerror',e=>errs.push('[pageerror] '+e.message));
  await p.goto(pg.url,{waitUntil:'domcontentloaded'});
  await p.waitForTimeout(500);
  // çerez banner'ı kapat (transient consent — kalıcı floating değil)
  await p.evaluate(()=>{document.querySelectorAll('.cookie-banner').forEach(el=>el.classList.remove('show'));});
  await p.waitForTimeout(200);

  o.fabVisible=await p.locator('.yg-fab').isVisible();
  o.href=await p.locator('.yg-fab').getAttribute('href');
  o.labelVisible=await p.locator('.yg-fab .yg-fab-tx').isVisible(); // desktop'ta etiket görünür
  const fb=await p.locator('.yg-fab').boundingBox();
  o.fabH=fb?Math.round(fb.height):0;
  o.fabInView=fb?(fb.x+fb.width<=1440 && fb.y+fb.height<=900):false;
  const ft=await p.locator('.feedback-tab').boundingBox();
  o.vsFeedback_overlap=rects(fb,ft);

  // hover animasyonu — transform değişiyor mu
  const t0=await p.locator('.yg-fab').evaluate(el=>getComputedStyle(el).transform);
  await p.locator('.yg-fab').hover(); await p.waitForTimeout(300);
  const t1=await p.locator('.yg-fab').evaluate(el=>getComputedStyle(el).transform);
  o.hoverAnimates=(t0!==t1);

  await p.screenshot({path:`${out}/fab_${pg.name}_1440.png`,fullPage:false});

  // tıkla → yol-guzergahim-v2.html
  await p.locator('.yg-fab').click();
  await p.waitForTimeout(900);
  o.navTo=p.url().split('/').pop();
  o.errs1440=errs.slice(0,8);
  await ctx.close();

  // ---- 390 mobil ----
  const errsM=[];
  const ctxM=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
  const pm=await ctxM.newPage();
  pm.on('console',m=>{if(m.type()==='error')errsM.push(m.text());});
  pm.on('pageerror',e=>errsM.push('[pageerror] '+e.message));
  await pm.goto(pg.url,{waitUntil:'domcontentloaded'});
  await pm.waitForTimeout(500);
  await pm.evaluate(()=>{document.querySelectorAll('.cookie-banner').forEach(el=>el.classList.remove('show'));});
  await pm.waitForTimeout(200);
  o.m_fabVisible=await pm.locator('.yg-fab').isVisible();
  const mfb=await pm.locator('.yg-fab').boundingBox();
  o.m_fabInView=mfb?(mfb.x+mfb.width<=390+1 && mfb.x>=0 && mfb.y>=0 && mfb.y+mfb.height<=844):false;
  o.m_fabSize=mfb?`${Math.round(mfb.width)}x${Math.round(mfb.height)}`:'none';
  o.m_labelHidden=!(await pm.locator('.yg-fab .yg-fab-tx').isVisible()); // mobilde icon-only
  const bn=await pm.locator('.bottom-nav').boundingBox();
  o.m_vsBottomNav_overlap=rects(mfb,bn);
  o.m_fabAboveNav=(mfb&&bn)?(mfb.y+mfb.height<=bn.y+1):'?';
  await pm.screenshot({path:`${out}/fab_${pg.name}_390.png`,fullPage:false});
  o.errs390=errsM.slice(0,8);
  await ctxM.close();

  // ---- mojibake ----
  const ctxT=await b.newContext(); const pt=await ctxT.newPage();
  await pt.goto(pg.url,{waitUntil:'domcontentloaded'});
  o.mojibake=await pt.evaluate(()=>{const t=document.querySelector('.yg-fab')?document.querySelector('.yg-fab').textContent:'';return (t.match(/Ã|Å|Ä±|Ä°|Ã§|Ã¶|Ã¼|â€/g)||[]).length;});
  await ctxT.close();
}

await b.close();
console.log(JSON.stringify(R,null,2));
