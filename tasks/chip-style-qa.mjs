import { chromium } from 'playwright';
const OUT='/Users/gaviaworks/Developer/Projects/dadamutfak/outputs';
// name -> [activeSelector to apply, ch-cnt expected?]
const PAGES=[
  {n:'sa-isletme-isletmeler', act:'is-active', cnt:true},
  {n:'sa-dadafit-egzersizler', act:'active', cnt:false},
  {n:'sa-admin-tarifler', act:'is-on', cnt:true},
  {n:'sa-saglik-randevular', act:'is-active', cnt:true},
];
const b=await chromium.launch();
const pass=x=>x?'PASS':'FAIL';
for(const {n,act,cnt} of PAGES){
  for(const vw of [1440,390]){
    const errors=[];
    const p=await b.newPage({viewport:{width:vw,height:1000}});
    p.on('pageerror',e=>errors.push('PAGEERR:'+e.message));
    p.on('console',m=>{if(m.type()==='error')errors.push('CONSOLE:'+m.text())});
    await p.goto(`http://localhost:8765/v5/${n}.html`,{waitUntil:'networkidle'});
    await p.waitForTimeout(350);
    const base=await p.evaluate(()=>{const c=document.querySelector('.chip:not(.is-active):not(.is-on):not(.active)')||document.querySelector('.chip');return c?{pad:getComputedStyle(c).padding,fw:getComputedStyle(c).fontWeight,r:getComputedStyle(c).borderRadius}:null;});
    // aktif chip: DOM'da GERÇEKTEN render edilmiş aktif chip'i oku (sentetik toggle paint olmadan computed güncellemiyor)
    const actFw=await p.evaluate((cls)=>{const el=document.querySelector('.chip.'+cls);return el?getComputedStyle(el).fontWeight:'no-active-in-dom';},act);
    const cntR=cnt?await p.evaluate(()=>{const c=document.querySelector('.chip .ch-cnt');return c?getComputedStyle(c).borderRadius:'absent';}):'n/a';
    const ov=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    await p.screenshot({path:`${OUT}/chip-style-${n}-${vw}.png`,fullPage:true});
    await p.close();
    console.log(`=== ${n} @${vw} ===`);
    if(base)console.log(`  base padding=${base.pad} fw=${base.fw} radius=${base.r}`,pass(base.pad==='7px 14px'&&base.fw==='500'));
    console.log(`  aktif(.${act}) fw=${actFw}`,pass(actFw==='700'));
    if(cnt)console.log(`  ch-cnt radius=${cntR} (sayaç korundu)`,pass(cntR==='5px'));
    console.log(`  taşma=${ov}`,pass(ov<=0),` JS err=${errors.length}`,pass(errors.length===0));
    if(errors.length)errors.forEach(e=>console.log('   ',e));
  }
}
await b.close();
