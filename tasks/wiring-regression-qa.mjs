import { chromium } from 'playwright';
const B='http://localhost:8765/v6/';
const b=await chromium.launch();

// her sayfa: JS error, menü render, locked(Yakında) sayısı, aktif item screen'i
async function inspect(file, expSec, expScreen){
  const errs=[];
  const pg=await b.newPage({viewport:{width:1440,height:1000}});
  pg.on('pageerror',e=>errs.push('PAGEERR:'+e.message));
  pg.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE:'+m.text());});
  await pg.goto(B+file,{waitUntil:'networkidle'});
  await pg.waitForTimeout(300);
  const r=await pg.evaluate(()=>{
    const menu=document.querySelector('#saMenu');
    const links=menu?[...menu.querySelectorAll('a.sa-mlink')]:[];
    const active=links.filter(a=>a.classList.contains('is-active'));
    const locked=links.filter(a=>a.classList.contains('is-locked'));
    const hrefs=links.map(a=>({lbl:a.textContent.trim().replace(/\s+/g,' '),href:a.getAttribute('href'),active:a.classList.contains('is-active'),locked:a.classList.contains('is-locked')}));
    return {
      menuCount:links.length,
      activeLbl:active.map(a=>a.textContent.trim().replace(/\s+/g,' ')).join('|'),
      activeHref:active.map(a=>a.getAttribute('href')).join('|'),
      lockedCount:locked.length,
      lockedLbls:locked.map(a=>a.textContent.trim().replace(/\s+/g,' ')).join(','),
      sec:document.body.dataset.sec, screen:document.body.dataset.screen,
      hrefs
    };
  });
  await pg.close();
  return {file,expSec,expScreen,errs,...r};
}

// yeni 15 ekran (liste dosyaları) — aktif-state doğru + admin/store'da locked 0
const NEW=[
  ['sa-admin-tarifler.html','admin','tarifler'],
  ['sa-admin-sefler.html','admin','sefler'],
  ['sa-admin-kademeler.html','admin','kademeler'],
  ['sa-admin-fiyatlandirma.html','admin','fiyatlandirma'],
  ['sa-admin-slider.html','admin','slider'],
  ['sa-admin-sayfalar.html','admin','sayfalar'],
  ['sa-admin-menu.html','admin','menu'],
  ['sa-admin-ayarlar.html','admin','ayarlar'],
  ['sa-admin-raporlar.html','admin','raporlar'],
  ['sa-store-kategoriler.html','store','kategoriler'],
  ['sa-store-siparisler.html','store','siparisler'],
  ['sa-store-musteriler.html','store','musteriler'],
  ['sa-store-promosyonlar.html','store','promosyonlar'],
  ['sa-store-kargo.html','store','kargo'],
  ['sa-store-raporlar.html','store','raporlar'],
];
// regresyon: mevcut paneller bozulmadı mı
const REG=[
  ['sa-store-urunler.html','store','urunler'],
  ['sa-admin-kullanicilar.html','admin','kullanicilar'],
  ['sa-saglik-randevular.html','saglik','randevular'],
];

console.log('=== YENİ 15 EKRAN — aktif-state + locked ===');
let fail=0;
for(const [f,sec,scr] of NEW){
  const r=await inspect(f,sec,scr);
  // aktif item, current data-screen ile aynı modülün linki olmalı (href dosya adını içerir)
  const activeOK=r.activeHref.includes(f);
  const lockedOK=r.lockedCount===0;
  const jsOK=r.errs.length===0;
  const ok=activeOK&&lockedOK&&jsOK;
  if(!ok)fail++;
  console.log(`${ok?'✅':'❌'} ${f.padEnd(30)} menu:${r.menuCount} aktif:"${r.activeLbl}" locked:${r.lockedCount} JS:${r.errs.length}`);
  if(!ok)console.log('    DETAY:',{activeOK,lockedOK,activeHref:r.activeHref,locked:r.lockedLbls,errs:r.errs});
}

console.log('\n=== REGRESYON — mevcut paneller ===');
for(const [f,sec,scr] of REG){
  const r=await inspect(f,sec,scr);
  const activeOK=r.activeHref.includes(f)||r.activeLbl.length>0;
  const jsOK=r.errs.length===0;
  const ok=activeOK&&jsOK;
  if(!ok)fail++;
  console.log(`${ok?'✅':'❌'} ${f.padEnd(30)} menu:${r.menuCount} aktif:"${r.activeLbl}" locked:${r.lockedCount} JS:${r.errs.length}`);
  if(!ok)console.log('    DETAY:',{activeHref:r.activeHref,errs:r.errs});
}

// antrenör paneli (sa-shell DEĞİL ama JS bozulmadı mı + nav render)
console.log('\n=== REGRESYON — antrenör paneli (operatör, ayrı kabuk) ===');
{
  const errs=[];
  const pg=await b.newPage({viewport:{width:1440,height:1000}});
  pg.on('pageerror',e=>errs.push('PAGEERR:'+e.message));
  pg.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE:'+m.text());});
  await pg.goto(B+'antrenor-panel-v1.html',{waitUntil:'networkidle'});
  await pg.waitForTimeout(300);
  const nav=await pg.evaluate(()=>document.querySelectorAll('.pnl-nav a, .pnl-link').length);
  await pg.close();
  const ok=errs.length===0&&nav>0;
  if(!ok)fail++;
  console.log(`${ok?'✅':'❌'} antrenor-panel-v1.html        nav-link:${nav} JS:${errs.length}`);
}

// DEAD-LINK: admin + store + saglik menüsündeki tüm href'ler 200 mü
console.log('\n=== DEAD-LINK — menü href HTTP kontrolü ===');
const seen=new Set();
for(const land of ['sa-admin.html','sa-store.html','sa-saglik.html']){
  const r=await inspect(land,'','');
  for(const h of r.hrefs){
    if(!h.href||h.href==='#'||h.href.startsWith('?')){console.log(`  ⚠️ ${land}: "${h.lbl}" href="${h.href}"`);continue;}
    const url=h.href.split('#')[0];
    if(seen.has(url))continue; seen.add(url);
    const res=await fetch(B+url,{method:'HEAD'}).catch(()=>({status:0}));
    if(res.status!==200)console.log(`  ❌ ${url} → HTTP ${res.status} (kaynak: ${land} "${h.lbl}")`);
  }
}
console.log(`  Kontrol edilen benzersiz href: ${seen.size}`);

console.log(`\n=== SONUÇ: ${fail===0?'TÜM PASS ✅':fail+' FAIL ❌'} ===`);
await b.close();
