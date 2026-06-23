import { chromium } from 'playwright';
const BASE='http://localhost:8765/v6';
const b=await chromium.launch();
const errs=[]; const log=(...a)=>console.log(...a);
const pg=await b.newPage({viewport:{width:1440,height:900}});
pg.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE: '+m.text());});
pg.on('pageerror',e=>errs.push('PAGEERR: '+e.message));

const r=await pg.goto(BASE+'/sa-admin-taksonomi.html',{waitUntil:'networkidle'});
log('status', r.status());
log('groups', await pg.locator('.tx-group').count());
log('ph-sub', (await pg.locator('.ph-sub').innerText()).replace(/\s+/g,' '));

// tarif group = 14 real, slug corba-tarifleri
log('tarif rows (expect 14)', await pg.locator('.tx-row').count());
log('tarif slugs sample', (await pg.locator('.tx-slug').allInnerTexts()).slice(0,3).join(','));

// icerik group: extra line (künye · gövde)
await pg.locator('.tx-group').nth(2).click(); await pg.waitForTimeout(120);
log('icerik extra[0]', await pg.locator('.tx-row .tx-extra').first().innerText());
// rol group: access line
await pg.locator('.tx-group').nth(4).click(); await pg.waitForTimeout(120);
const rolExtras=await pg.locator('.tx-row .tx-extra').allInnerTexts();
log('rol extras', rolExtras.join(' | '));

// modal extra for rol (access checkboxes)
await pg.locator('.tx-row [data-edit]').first().click(); await pg.waitForTimeout(150);
log('rol modal title', await pg.locator('#modalTitle').innerText());
log('rol access checkboxes', await pg.locator('#fAccess input').count(), 'checked', await pg.locator('#fAccess input:checked').count());
await pg.locator('#modalCancel').click(); await pg.waitForTimeout(80);

// modal extra for icerik (prefix/künye/body)
await pg.locator('.tx-group').nth(2).click(); await pg.waitForTimeout(100);
await pg.locator('.tx-row [data-edit]').nth(2).click(); await pg.waitForTimeout(150); // ansiklopedi
log('icerik modal title', await pg.locator('#modalTitle').innerText());
log('icerik fKunye value', await pg.locator('#fKunye').inputValue(), '/ fBody', await pg.locator('#fBody').inputValue(), '/ prefix', await pg.locator('#fPrefix').inputValue());
// edit künye -> save -> row reflects
await pg.locator('#fKunye').selectOption('sofra');
await pg.locator('#modalSave').click(); await pg.waitForTimeout(150);
log('after edit ansiklopedi extra', await pg.locator('.tx-row').nth(2).locator('.tx-extra').innerText());

// tarif group has NO extra line (sade)
await pg.locator('.tx-group').nth(0).click(); await pg.waitForTimeout(100);
log('tarif extra count (expect 0)', await pg.locator('.tx-row .tx-extra').count());

// mojibake
log('mojibake', await pg.evaluate(()=>/[ÃÂ�]/.test(document.body.innerText)));

// bridges on 3 list pages
for(const [f,lbl] of [['sa-admin-tarifler','Kategorileri Yönet'],['sa-admin-icerik','Tipleri Yönet'],['sa-admin-sozluk','Kategorileri Yönet']]){
  const rr=await pg.goto(BASE+'/'+f+'.html',{waitUntil:'networkidle'});
  const link=await pg.evaluate(()=>{const a=[...document.querySelectorAll('.ph-actions a')].find(x=>/taksonomi/.test(x.getAttribute('href')||''));return a?{href:a.getAttribute('href'),txt:a.textContent.trim()}:null;});
  log('bridge '+f, rr.status(), JSON.stringify(link), link&&link.txt.includes(lbl)?'OK':'CHECK');
  // sozluk: ensure link NOT inside #catChips (selector safety)
  if(f==='sa-admin-sozluk'){
    log('  sozluk catChips count (filter chips only, no Yönet)', await pg.locator('#catChips .chip').count(), 'has-yonet-in-chips', await pg.locator('#catChips a[href*=taksonomi]').count());
  }
}

// 390
const pg2=await b.newPage({viewport:{width:390,height:780}});
const r2=await pg2.goto(BASE+'/sa-admin-taksonomi.html',{waitUntil:'networkidle'});
log('390 status', r2.status(), 'overflow', await pg2.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth));

log('\n=== ERRORS ===', errs.length? errs.join('\n') : 'NONE');
await b.close();
