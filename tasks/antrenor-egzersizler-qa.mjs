import { chromium } from 'playwright';
const BASE='http://localhost:8765/v6/antrenor-egzersizler-v1.html';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();
const errors=[];
function wire(p){p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});}
const mint=p=>p.evaluate(()=>{const M='rgb(59, 183, 126)';let n=0;document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor'].forEach(k=>{if(s[k]===M)n++})});return n;});
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
const cards=p=>p.evaluate(()=>document.querySelectorAll('#libGrid .ex-c').length);
const chip=(dim,v)=>`.lib-fgroup[data-dim="${dim}"] .lib-chip[data-v="${v}"]`;
async function newPageW(vw){const pg=await b.newPage({viewport:{width:vw,height:900}});wire(pg);return pg;}

let p=await newPageW(1440);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const greenTok=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--green').trim());
const navEgzActive=await p.evaluate(()=>{const a=document.querySelector('.pnl-nav [data-nav="egzersiz"]');return a&&a.tagName==='A'&&a.classList.contains('is-active');});
const ov1440=await ov(p);
const allCards=await cards(p);

// İKON TILE doğrula: grid içinde yabancı foto (<img> veya http background-image) var mı?
const foreignImg=await p.evaluate(()=>{
  let n=0;
  document.querySelectorAll('#libGrid img').forEach(()=>n++);
  document.querySelectorAll('#libGrid *').forEach(el=>{
    const bg=getComputedStyle(el).backgroundImage||'';
    if(/url\(.*https?:/.test(bg)) n++;
  });
  return n;
});
const tileCount=await p.evaluate(()=>document.querySelectorAll('#libGrid .ex-tile i').length);

// tek-eksen filtreler
await p.locator(chip('kas','gogus')).click();await p.waitForTimeout(160);
const kasGogus=await cards(p);
await p.locator(chip('kas','all')).click();await p.waitForTimeout(120);
await p.locator(chip('ekipman','dumbbell')).click();await p.waitForTimeout(160);
const eqDumbbell=await cards(p);
await p.locator(chip('ekipman','all')).click();await p.waitForTimeout(120);
await p.locator(chip('zorluk','baslangic')).click();await p.waitForTimeout(160);
const zorBaslangic=await cards(p);
// çoklu eksen kombinasyonu: kas=gogus & zorluk=baslangic
await p.locator(chip('kas','gogus')).click();await p.waitForTimeout(160);
const comboGogusBaslangic=await cards(p);
// temizle (lc-clear)
await p.locator('#libClear').click();await p.waitForTimeout(160);
const afterClear=await cards(p);
// arama
await p.fill('#libSearch','plank');await p.waitForTimeout(220);
const searchPlank=await cards(p);
await p.fill('#libSearch','zzzzz');await p.waitForTimeout(220);
const emptyShown=await p.evaluate(()=>document.getElementById('libEmpty').hidden===false);
await p.locator('#libReset').click();await p.waitForTimeout(160);
const afterReset=await cards(p);
await p.screenshot({path:`${OUT}/antrenor-egzersizler-1440.png`,fullPage:true});

// detay modal
await p.locator('#libGrid .ex-c').first().locator('.ex-btn-detay').click();await p.waitForTimeout(280);
const detayOpen=await p.evaluate(()=>document.getElementById('detayOv').classList.contains('open'));
const detayTitle=await p.evaluate(()=>document.getElementById('detayTitle').textContent);
const detayTips=await p.evaluate(()=>document.querySelectorAll('#detayTips li').length);
const detayAddHref=await p.evaluate(()=>document.getElementById('detayAdd').getAttribute('href'));
await p.screenshot({path:`${OUT}/antrenor-egzersizler-detay-1440.png`,fullPage:false});
await p.keyboard.press('Escape');await p.waitForTimeout(200);
const detayClosed=await p.evaluate(()=>!document.getElementById('detayOv').classList.contains('open'));

// Programa Ekle köprüsü: kart CTA href builder'a mı + tıkla→navigasyon
const addHref=await p.evaluate(()=>{const a=document.querySelector('#libGrid .ex-btn-add');return a?a.getAttribute('href'):''});
await p.locator('#libGrid .ex-btn-add').first().click();await p.waitForTimeout(500);
const navigatedTo=p.url();
const mint1=await mint(p);
await p.close();

// 390
p=await newPageW(390);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ov390=await ov(p);const mint390=await mint(p);
await p.screenshot({path:`${OUT}/antrenor-egzersizler-390.png`,fullPage:true});
await p.close();

await b.close();
console.log('=== ANTRENOR EGZERSİZLER QA ===');
console.log('--green token            :',JSON.stringify(greenTok),'(expect #009d4f)');
console.log('nav Egzersiz active      :',navEgzActive);
console.log('cards all                :',allCards,'(expect 18)');
console.log('İKON TILE — yabancı foto :',foreignImg,'(expect 0) · tile-ikon sayısı:',tileCount);
console.log('filter kas=gogus         :',kasGogus,'(expect 3)');
console.log('filter ekipman=dumbbell  :',eqDumbbell,'(expect 5)');
console.log('filter zorluk=baslangic  :',zorBaslangic,'(expect 8)');
console.log('combo gogus+baslangic    :',comboGogusBaslangic,'(expect 1)');
console.log('after lc-clear           :',afterClear,'(expect 18)');
console.log('search "plank"           :',searchPlank,'(expect 1)');
console.log('empty no-match           :',emptyShown);
console.log('after reset              :',afterReset,'(expect 18)');
console.log('detay open/title/tips    :',detayOpen,'/',JSON.stringify(detayTitle),'/',detayTips);
console.log('detay Programa Ekle href :',JSON.stringify(detayAddHref));
console.log('detay closes (Esc)       :',detayClosed);
console.log('kart Programa Ekle href  :',JSON.stringify(addHref));
console.log('kart CTA navigated to    :',navigatedTo.includes('antrenor-program-builder')?'builder ✓':navigatedTo);
console.log('overflow 1440 / 390      :',ov1440,'/',ov390);
console.log('MINT LEAK 1440 / 390     :',mint1,'/',mint390);
console.log('JS errors                :',errors.length,errors.length?JSON.stringify(errors):'NONE');
