import { chromium } from 'playwright';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
const PAGES=['sa-isletme-isletmeler','sa-admin-tarifler'];
const b=await chromium.launch();
const pass=x=>x?'PASS':'FAIL';
for(const n of PAGES){
  const errors=[];
  const p=await b.newPage({viewport:{width:1440,height:1000}});
  p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));
  p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});
  await p.goto(`http://localhost:8765/v5/${n}.html`,{waitUntil:'networkidle'});
  await p.waitForTimeout(350);
  const r=await p.evaluate(()=>{
    const chip=document.querySelector('.chip');
    const cnt=document.querySelector('.chip .ch-cnt');
    return {
      chipR: chip?getComputedStyle(chip).borderRadius:'none',
      cntR: cnt?getComputedStyle(cnt).borderRadius:'absent'
    };
  });
  const ov=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  await p.screenshot({path:`${OUT}/chcnt-radius-${n}-1440.png`,fullPage:true});
  await p.close();
  console.log(`=== ${n} ===`);
  console.log(`  chip radius=${r.chipR}  ch-cnt radius=${r.cntR}`,pass(r.chipR==='8px'&&r.cntR==='8px'&&r.chipR===r.cntR));
  console.log(`  taşma=${ov}`,pass(ov<=0),` JS err=${errors.length}`,pass(errors.length===0));
  if(errors.length)errors.forEach(e=>console.log('   ',e));
}
await b.close();
