import { chromium } from 'playwright';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const PAGES=['sa-saglik-randevular','sa-isletme-menuler','sa-dadafit-egzersizler'];
const b=await chromium.launch();
const pass=x=>x?'PASS':'FAIL';
for(const name of PAGES){
  const errors=[];
  const p=await b.newPage({viewport:{width:1440,height:1000}});
  p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));
  p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});
  await p.goto(`http://localhost:8765/v6/${name}.html`,{waitUntil:'networkidle'});
  await p.waitForTimeout(350);
  // chip köşeli mi? ilk .chip'in computed border-radius'u ~8px olmalı (999px değil)
  const chipR=await p.evaluate(()=>{const c=document.querySelector('.chip');return c?getComputedStyle(c).borderRadius:'none';});
  // egzersizler: .lvl hâlâ pill (yuvarlak ~ büyük) olmalı
  const lvlR=await p.evaluate(()=>{const c=document.querySelector('.lvl');return c?getComputedStyle(c).borderRadius:null;});
  const ov=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  await p.screenshot({path:`${OUT}/chip-sweep-${name}-1440.png`,fullPage:true});
  await p.close();
  const r=parseFloat(chipR);
  console.log(`=== ${name} ===`);
  console.log('chip border-radius:',chipR,pass(r>=6&&r<=10));
  if(lvlR!==null)console.log('.lvl border-radius (pill korundu ~>=999/yarım):',lvlR,pass(parseFloat(lvlR)>=15));
  console.log('yatay taşma (<=0):',ov,pass(ov<=0));
  console.log('JS error=0:',errors.length,pass(errors.length===0));
  if(errors.length)errors.forEach(e=>console.log('  ',e));
}
await b.close();
