import { chromium } from 'playwright';
const B = 'http://localhost:8765/v6/';
const browser = await chromium.launch();
const out = []; let allOk = true;

// 6 köprü: detay → operatör paneli + beklenen rol
const BR = [
  { detay:'sa-dadafit-antrenorler-detay.html',    panel:'antrenor-panel-v1.html',        role:'Antrenör'   },
  { detay:'sa-saglik-diyetisyenler-detay.html',   panel:'dyt-danisanlar-v1.html',        role:'Diyetisyen' },
  { detay:'sa-isletme-isletmeler-detay.html',     panel:'mekan-panel-v1.html',           role:'İşletme'    },
  { detay:'sa-isletme-rezervasyonlar-detay.html', panel:'mekan-rezervasyonlar-v1.html',  role:'İşletme'    },
  { detay:'sa-isletme-onaylar-detay.html',        panel:'mekan-panel-v1.html',           role:'İşletme'    },
  { detay:'sa-isletme-menuler-detay.html',        panel:'mekan-menu-v1.html',            role:'İşletme'    },
];

// Sadece YEREL 404/hata + JS hatası kapıyı düşürür; harici görsel host'ları
// (images.unsplash.com vb. headless'ta bloke) gözardı edilir — gerçek hata değil.
const LOCAL = 'localhost:8765';
function track(page, bag){
  page.on('requestfailed', r=>{ if(r.url().includes(LOCAL)) bag.push('REQFAIL '+r.url()); });
  page.on('response', r=>{ if(r.status()>=400 && r.url().includes(LOCAL)) bag.push(r.status()+' '+r.url()); });
  page.on('pageerror', e=>bag.push('JSERR '+e.message));
}

for (const b of BR){
  const errs = [];
  const ctx = await browser.newContext({viewport:{width:1440,height:1000}});
  const p = await ctx.newPage(); track(p, errs);

  // 1) detay sayfası: aktif link var, placeholder div yok, href doğru
  await p.goto(B+b.detay, {waitUntil:'networkidle'});
  const link = await p.evaluate(()=>{
    const a = document.querySelector('a.panel-open-link');
    const ph = document.querySelector('.panel-open-placeholder');
    return a ? { href:a.href, txt:a.textContent.trim().replace(/\s+/g,' '), phLeft: !!ph } : null;
  });
  const linkOk = link && link.href.includes(b.panel) && link.href.includes('gozetim=1')
                 && link.href.includes('from='+b.detay) && !link.phLeft;

  // 2) tıkla → operatör paneline in (navigasyon + banner enjeksiyonu beklenir)
  await p.click('a.panel-open-link');
  await p.waitForURL('**/'+b.panel+'*', {timeout:8000});
  await p.waitForSelector('.sa-gz-bar', {timeout:5000}).catch(()=>{});
  const land = await p.evaluate(()=>{
    const bar = document.querySelector('.sa-gz-bar');
    if(!bar) return { bar:false };
    const r = bar.getBoundingClientRect();
    const side = document.querySelector('.pnl-side'); const sr = side?.getBoundingClientRect();
    const cs = getComputedStyle(bar);
    return {
      bar:true,
      hasClass: document.body.classList.contains('has-gozetim'),
      barTop: Math.round(r.top), barH: Math.round(r.height),
      sideTop: sr? Math.round(sr.top): null,
      txt: bar.querySelector('.sa-gz-txt')?.textContent.trim().replace(/\s+/g,' '),
      backHref: bar.querySelector('.sa-gz-back')?.getAttribute('href'),
      url: location.pathname.split('/').pop(),
      visible: cs.display!=='none' && cs.visibility!=='hidden',
    };
  });
  const landOk = land.bar && land.hasClass && land.visible && land.barTop===0 && land.barH>=40
                 && land.sideTop>=land.barH-1 && land.url===b.panel
                 && land.txt.includes(b.role) && land.backHref===b.detay;

  // 3) Gözetime Dön → detay sayfasına geri, banner temizlenir
  await p.click('.sa-gz-back');
  await p.waitForURL('**/'+b.detay+'*', {timeout:8000});
  const back = await p.evaluate(()=>({
    url: location.pathname.split('/').pop(),
    bar: !!document.querySelector('.sa-gz-bar'),
    ss: sessionStorage.getItem('dada_gozetim'),
  }));
  const backOk = back.url===b.detay && !back.bar && back.ss===null;

  const ok = linkOk && landOk && backOk;
  if(!ok || errs.length) allOk=false;
  out.push(`${ok?'OK':'XX'} ${b.detay} → ${b.panel} | link:${linkOk?'✓':'✗'} banner:${landOk?'✓':'✗'}(${land.role||land.txt?.slice(0,0)||''} top=${land.barTop} side=${land.sideTop}) dön:${backOk?'✓':'✗'} | rol:"${b.role}" err=${errs.length}${errs.length?' '+errs.slice(0,2).join('; '):''}`);
  await ctx.close();
}

// 7) Kalıcılık: panele in, panel-içi başka sayfaya geç → banner kalır
{
  const errs=[]; const ctx=await browser.newContext({viewport:{width:1440,height:1000}});
  const p=await ctx.newPage(); track(p,errs);
  await p.goto(B+'antrenor-panel-v1.html?gozetim=1&from=sa-dadafit-antrenorler-detay.html',{waitUntil:'networkidle'});
  await Promise.all([ p.waitForLoadState('networkidle'), p.goto(B+'antrenor-uyeler-v1.html',{waitUntil:'networkidle'}) ]);
  const persist = await p.evaluate(()=>({ bar:!!document.querySelector('.sa-gz-bar'), txt:document.querySelector('.sa-gz-txt')?.textContent.includes('Antrenör') }));
  const pOk = persist.bar && persist.txt;
  if(!pOk||errs.length) allOk=false;
  out.push(`${pOk?'OK':'XX'} KALICILIK: panel-içi gezinti (antrenor-panel→uyeler) banner kalıyor:${persist.bar?'✓':'✗'} rol-korundu:${persist.txt?'✓':'✗'} err=${errs.length}`);
  await ctx.close();
}

// 8) Temiz ziyaret: gözetim paramı YOK → banner GÖRÜNMEZ
{
  const errs=[]; const ctx=await browser.newContext({viewport:{width:1440,height:1000}});
  const p=await ctx.newPage(); track(p,errs);
  await p.goto(B+'mekan-panel-v1.html',{waitUntil:'networkidle'});
  const clean = await p.evaluate(()=>({ bar:!!document.querySelector('.sa-gz-bar'), cls:document.body.classList.contains('has-gozetim') }));
  const cOk = !clean.bar && !clean.cls;
  if(!cOk||errs.length) allOk=false;
  out.push(`${cOk?'OK':'XX'} TEMİZ ZİYARET (param yok): banner-yok:${!clean.bar?'✓':'✗'} has-gozetim-yok:${!clean.cls?'✓':'✗'} err=${errs.length}`);
  await ctx.close();
}

await browser.close();
console.log('\n=== GÖZETİM KÖPRÜSÜ QA ===');
out.forEach(l=>console.log(l));
console.log('\n'+(allOk?'✅ ALL PASS':'❌ FAIL var'));
process.exit(allOk?0:1);
