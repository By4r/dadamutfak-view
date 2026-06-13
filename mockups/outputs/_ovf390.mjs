import pkg from '/Users/dadaistanbul/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.js';
const { chromium } = pkg;
const FILES = process.argv.slice(2);
const ctx = await chromium.launchPersistentContext('/tmp/t5-chrome-prof2',{channel:'chrome',headless:true,viewport:{width:390,height:780}});
const page = await ctx.newPage();
let cb=5000;
for(const f of FILES){
  await page.goto('http://localhost:8765/mockups/'+f+'.html?cb='+(cb++),{waitUntil:'load'});
  await page.waitForTimeout(120);
  const r = await page.evaluate(()=>{
    const W=390, tol=2; let worst=0, n=0, sample=null;
    for(const el of document.querySelectorAll('body *')){
      const cs=getComputedStyle(el); if(cs.position==='fixed'||cs.display==='none'||cs.visibility==='hidden')continue;
      const b=el.getBoundingClientRect(); if(b.width===0||b.height===0)continue;
      const over=b.right-W;
      if(over>tol && b.left<W){ if(over>worst){worst=over; sample='.'+(el.className||'').toString().split(/\s+/)[0]+' ('+Math.round(over)+'px)';} n++; }
    }
    return {scrollW:document.documentElement.scrollWidth, n, worst:Math.round(worst), sample};
  });
  console.log(f.padEnd(26), 'scrollW='+r.scrollW, 'overEls='+r.n, 'worst='+r.worst+'px', r.sample||'');
}
await ctx.close();
