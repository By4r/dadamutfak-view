import { chromium } from 'playwright';
const BASE='http://localhost:8765/v5/';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b=await chromium.launch();

const MINT=['rgb(59, 183, 126)','rgb(108, 202, 152)']; // #3BB77E, #6cca98 — accent/border olarak YASAK
// pstat.ok/green-tint semantik durum/onay rengi (var(--green-deep)=#2c9963=rgb(44,153,99)) HARİÇ:
// yalnız "aksan rolü" yüzeylerinde mint arıyoruz.
const ACCENT_SEL='.chip,.ms,.dt,.node-ico,.node-tag,.pool-add,.tier-badge,.plan-tag,.seo-pill,.kpi-ico,.pc-title i,.tier-medal,.plan-name i,.np-logo i,.switch input:checked + .track,.score-ring';

function wire(p,errs){p.on('pageerror',e=>errs.push('PAGEERR:'+e.message));p.on('console',m=>{if(m.type()==='error')errs.push('CONSOLE:'+m.text())});}
const ov=p=>p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
const mint=(p,sel)=>p.evaluate(({s,M})=>{let n=0;document.querySelectorAll(s).forEach(el=>{const st=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor'].forEach(k=>{if(M.indexOf(st[k])>-1)n++})});return n;},{s:sel,M:MINT});
const menuLoaded=p=>p.evaluate(()=>document.querySelectorAll('#saMenu a, #saMenu .sa-mlink, #saMenu .sa-mlink-soon').length>0);
const acc=p=>p.evaluate(()=>getComputedStyle(document.body).getPropertyValue('--acc').trim());
// chip/badge köşeli mi (radius-sm=8px, pill=999px DEĞİL)
const chipRadius=p=>p.evaluate(()=>{const c=document.querySelector('.chip,.tier-badge,.plan-tag,.seo-pill,.node-tag');if(!c)return'n/a';return getComputedStyle(c).borderTopLeftRadius;});

const PAGES=['sa-admin-raporlar.html','sa-admin-sayfalar.html','sa-admin-sayfalar-form.html','sa-admin-kademeler.html','sa-admin-kademeler-form.html','sa-admin-fiyatlandirma.html','sa-admin-fiyatlandirma-form.html','sa-admin-ayarlar.html','sa-admin-menu.html'];
const results=[];

for(const page of PAGES){
  const errs=[];
  let p=await b.newPage({viewport:{width:1440,height:1000}});wire(p,errs);
  await p.goto(BASE+page,{waitUntil:'networkidle'});await p.waitForTimeout(350);
  const r={page,menu:await menuLoaded(p),acc:await acc(p),ov1440:await ov(p),mint1440:await mint(p,ACCENT_SEL),radius:await chipRadius(p)};
  await p.screenshot({path:`${OUT}/${page.replace('.html','')}-1440.png`,fullPage:true});
  await p.close();

  p=await b.newPage({viewport:{width:390,height:1000}});wire(p,errs);
  await p.goto(BASE+page,{waitUntil:'networkidle'});await p.waitForTimeout(350);
  r.ov390=await ov(p);r.mint390=await mint(p,ACCENT_SEL);
  await p.screenshot({path:`${OUT}/${page.replace('.html','')}-390.png`,fullPage:true});
  await p.close();
  r.errs=errs.length;r.errList=errs.slice(0,4);
  results.push(r);
}

// ---- ETKİLEŞİM SMOKE ----
const inter={};
// B2 liste: chip filtre + boş durum
let p=await b.newPage({viewport:{width:1440,height:1000}});const e1=[];wire(p,e1);
await p.goto(BASE+'sa-admin-sayfalar.html',{waitUntil:'networkidle'});await p.waitForTimeout(300);
await p.locator('#stChips .chip[data-st="draft"]').click();await p.waitForTimeout(150);
inter.b2_draftRows=await p.evaluate(()=>[...document.querySelectorAll('#pgTable tbody tr')].filter(r=>r.style.display!=='none').length);
await p.fill('#pgSearch','zzzz');await p.waitForTimeout(200);
inter.b2_empty=await p.evaluate(()=>document.getElementById('emptyState').style.display==='block');
await p.close();

// B2 form: SERP canlı + skor değişir
p=await b.newPage({viewport:{width:1440,height:1000}});wire(p,e1);
await p.goto(BASE+'sa-admin-sayfalar-form.html',{waitUntil:'networkidle'});await p.waitForTimeout(300);
const score0=await p.evaluate(()=>document.getElementById('scoreNum').textContent);
await p.fill('#f-metatitle','Kısa');await p.waitForTimeout(150);
const score1=await p.evaluate(()=>document.getElementById('scoreNum').textContent);
const serpTitle=await p.evaluate(()=>document.getElementById('serpTitle').textContent);
inter.b2form_scoreChanged=(score0!==score1);
inter.b2form_serpSync=(serpTitle==='Kısa');
await p.close();

// B4 ayarlar: tab switch + ?tab= deep link
p=await b.newPage({viewport:{width:1440,height:1000}});wire(p,e1);
await p.goto(BASE+'sa-admin-ayarlar.html',{waitUntil:'networkidle'});await p.waitForTimeout(300);
await p.locator('.pf-tabs .dt[data-tab="entegrasyon"]').click();await p.waitForTimeout(150);
inter.b4_paneSwitch=await p.evaluate(()=>document.querySelector('.tabpane[data-pane="entegrasyon"]').classList.contains('active'));
inter.b4_oneActive=await p.evaluate(()=>document.querySelectorAll('.tabpane.active').length===1);
await p.close();
p=await b.newPage({viewport:{width:1440,height:1000}});wire(p,e1);
await p.goto(BASE+'sa-admin-ayarlar.html?tab=bildirim',{waitUntil:'networkidle'});await p.waitForTimeout(300);
inter.b4_deepLink=await p.evaluate(()=>document.querySelector('.tabpane[data-pane="bildirim"]').classList.contains('active'));
await p.close();

// B3 menü builder: ekle / aşağı / indent / gizle / önizleme
p=await b.newPage({viewport:{width:1440,height:1000}});wire(p,e1);
await p.goto(BASE+'sa-admin-menu.html',{waitUntil:'networkidle'});await p.waitForTimeout(300);
const n0=await p.evaluate(()=>document.getElementById('nodeCount').textContent);
await p.locator('#poolList .pool-item').first().click();await p.waitForTimeout(200);
const n1=await p.evaluate(()=>document.getElementById('nodeCount').textContent);
inter.b3_add=(parseInt(n1)>parseInt(n0));
const prevLinks0=await p.evaluate(()=>document.querySelectorAll('#navPrev .np-link').length);
// son node gizle
await p.locator('#treeList .node').last().locator('.nc-btn.vis').click();await p.waitForTimeout(150);
const prevLinks1=await p.evaluate(()=>document.querySelectorAll('#navPrev .np-link').length);
inter.b3_visToggle=(prevLinks1<=prevLinks0);
// menü konumu değiştir (footer)
await p.locator('.mb-switch .ms[data-menu="footer"]').click();await p.waitForTimeout(150);
inter.b3_switchMenu=await p.evaluate(()=>document.getElementById('treeTitle').textContent.indexOf('Alt')>-1);
// indent dene (footer 2. öğe)
const childBefore=await p.evaluate(()=>document.querySelectorAll('#treeList .node.is-child').length);
const indentBtn=p.locator('#treeList .node').nth(1).locator('.nc-btn[data-act="indent"]');
if(await indentBtn.isEnabled())await indentBtn.click();await p.waitForTimeout(150);
const childAfter=await p.evaluate(()=>document.querySelectorAll('#treeList .node.is-child').length);
inter.b3_indent=(childAfter>=childBefore);
inter.b3_errs=e1.length;
await p.close();

// B6 form: feature toggle önizleme
p=await b.newPage({viewport:{width:1440,height:1000}});wire(p,e1);
await p.goto(BASE+'sa-admin-fiyatlandirma-form.html',{waitUntil:'networkidle'});await p.waitForTimeout(300);
const feats0=await p.evaluate(()=>document.querySelectorAll('#ppFeats .pp-feat').length);
await p.fill('#f-ad','Pro X');await p.waitForTimeout(150);
inter.b6_nameSync=await p.evaluate(()=>document.getElementById('ppName').textContent==='Pro X');
inter.b6_featsRendered=(feats0>0);
await p.close();

await b.close();

const pass=x=>x?'PASS':'FAIL';
console.log('================ B2-B6 RENDER QA ================');
let allOk=true;
results.forEach(r=>{
  const okAcc=r.acc.toLowerCase()==='#e14827';
  const okMint=r.mint1440===0&&r.mint390===0;
  const okOv=r.ov1440<=0&&r.ov390<=0;
  const okRadius=r.radius==='8px'||r.radius==='n/a';
  const ok=r.menu&&okAcc&&okMint&&okOv&&r.errs===0&&okRadius;
  if(!ok)allOk=false;
  console.log(`\n${r.page}  ${ok?'✅':'❌'}`);
  console.log(`  menü:${pass(r.menu)} acc:${r.acc}${okAcc?'✓':'✗'} radius:${r.radius}${okRadius?'✓':'✗'}`);
  console.log(`  taşma 1440/390: ${r.ov1440}/${r.ov390} ${pass(okOv)} · mint 1440/390: ${r.mint1440}/${r.mint390} ${pass(okMint)} · jsErr:${r.errs} ${pass(r.errs===0)}`);
  if(r.errList.length)r.errList.forEach(e=>console.log('    !',e));
});
console.log('\n================ ETKİLEŞİM SMOKE ================');
Object.keys(inter).forEach(k=>{
  const v=inter[k];
  const isErrCount=k.indexOf('errs')>-1;
  console.log(`  ${k}: ${isErrCount?v+' '+pass(v===0):pass(v)}`);
  if(!isErrCount&&!v)allOk=false;
  if(isErrCount&&v!==0)allOk=false;
});
console.log('\n================ SONUÇ:',allOk?'TÜM PASS ✅':'FAIL VAR ❌','================');
