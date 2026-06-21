import { chromium } from 'playwright';
const BASE='http://localhost:8765/v6/antrenor-profil-ayar-v1.html';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const b = await chromium.launch();
const errors=[];

async function newPage(vw){
  const p=await b.newPage({viewport:{width:vw,height:900}});
  p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));
  p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});
  return p;
}
function mintLeak(p){return p.evaluate(()=>{const M='rgb(59, 183, 126)';let n=0;document.querySelectorAll('*').forEach(el=>{const s=getComputedStyle(el);['color','backgroundColor','borderTopColor','borderLeftColor','borderBottomColor'].forEach(k=>{if(s[k]===M)n++})});return n;});}
function overflow(p){return p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);}

// 1440 default (profil tab)
let p=await newPage(1440);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ov1440=await overflow(p);
const greenTok=await p.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--green').trim());
const navProfilActive=await p.evaluate(()=>{const a=document.querySelector('.pnl-nav [data-nav="profil"]');return a && a.classList.contains('is-active');});
const tabActiveDefault=await p.evaluate(()=>document.querySelector('.pf-tabs .dt.active').textContent.trim());
const paneVisible=await p.evaluate(()=>document.querySelector('.pf-pane[data-pane="profil"]').hidden===false);
const mint1=await mintLeak(p);

// activeNav green bg sample
const activeBg=await p.evaluate(()=>{const a=document.querySelector('.pnl-link.is-active');return a?getComputedStyle(a).backgroundColor:null;});

// click through tabs, verify pane switch + URL
const tabResults={};
for(const key of ['hizmet','takvim','ayarlar','profil']){
  await p.locator(`.pf-tabs .dt[data-tab="${key}"]`).click();
  await p.waitForTimeout(250);
  const vis=await p.evaluate(k=>document.querySelector(`.pf-pane[data-pane="${k}"]`).hidden===false,key);
  const url=p.url();
  tabResults[key]={paneVisible:vis, url: url.includes('tab='+key)|| (key==='profil'&&!url.includes('tab='))};
}
await p.screenshot({path:`${OUT}/antrenor-profil-1440.png`,fullPage:true});

// deep-link ?tab=takvim
await p.goto(BASE+'?tab=takvim',{waitUntil:'networkidle'});await p.waitForTimeout(300);
const deepLink=await p.evaluate(()=>document.querySelector('.pf-pane[data-pane="takvim"]').hidden===false && document.querySelector('.pf-tabs .dt[data-tab="takvim"]').classList.contains('active'));
await p.close();

// 390 mobile
p=await newPage(390);
await p.goto(BASE,{waitUntil:'networkidle'});await p.waitForTimeout(400);
const ov390=await overflow(p);
const mint390=await mintLeak(p);
await p.screenshot({path:`${OUT}/antrenor-profil-390.png`,fullPage:true});
await p.close();

await b.close();
console.log('=== ANTRENOR PROFIL-AYAR QA ===');
console.log('--green token        :',JSON.stringify(greenTok));
console.log('active nav bg        :',activeBg,'(expect rgba 0,157,79)');
console.log('nav Profil active    :',navProfilActive);
console.log('default tab active   :',JSON.stringify(tabActiveDefault),'pane vis:',paneVisible);
console.log('tab switches         :',JSON.stringify(tabResults));
console.log('deep-link ?tab=takvim:',deepLink);
console.log('overflow 1440 / 390  :',ov1440,'/',ov390);
console.log('MINT LEAK 1440 / 390 :',mint1,'/',mint390);
console.log('JS errors            :',errors.length,errors.length?JSON.stringify(errors):'NONE');
