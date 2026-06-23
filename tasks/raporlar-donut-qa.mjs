import { chromium } from 'playwright';
const URL='http://localhost:8765/v6/sa-admin-raporlar.html';
const b=await chromium.launch();const p=await b.newPage();
const errs=[];
p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.goto(URL,{waitUntil:'networkidle'});

async function tab(n){await p.click(`#tab-${n}`);await p.waitForTimeout(160);}
async function brand(b){await p.click(`#brandSeg .bseg-btn[data-brand="${b}"]`);await p.waitForTimeout(160);}

// probe a donut: center text painted (sample center pixel != pure white) + z-index + center text + label
async function probe(sel,name){
  const el=p.locator(sel).first();
  const r=await el.evaluate(node=>{
    const ctr=node.querySelector('.rep-donut-ctr');
    return {
      z:getComputedStyle(ctr).zIndex,
      center:ctr.querySelector('b').textContent,
      span:ctr.querySelector('span').textContent,
      p:[node.style.getPropertyValue('--p1'),node.style.getPropertyValue('--p2'),node.style.getPropertyValue('--p3')]
    };
  });
  // sample the exact geometric center pixel via screenshot of the donut box
  const box=await el.boundingBox();
  const shot=await el.screenshot();
  r.name=name;
  return {r,box};
}

const targets=[];
await tab('genel'); targets.push(await probe('#panel-genel .rep-donut','1 Üye Dikey'));
await p.locator('#panel-genel .rep-donut').first().screenshot({path:'outputs/d1.png'});

await tab('markalar');
await brand('store'); targets.push(await probe('[data-brandpanel="store"] .rep-donut','2 Kategori'));
await p.locator('[data-brandpanel="store"] .rep-donut').first().screenshot({path:'outputs/d2.png'});
await brand('dadafit'); targets.push(await probe('[data-brandpanel="dadafit"] .rep-donut','3 Challenge'));
await p.locator('[data-brandpanel="dadafit"] .rep-donut').first().screenshot({path:'outputs/d3.png'});
await brand('isletme'); targets.push(await probe('[data-brandpanel="isletme"] .rep-donut','4 Onay'));
await p.locator('[data-brandpanel="isletme"] .rep-donut').first().screenshot({path:'outputs/d4.png'});

await tab('finansal'); targets.push(await probe('#panel-finansal .rep-donut','5 Gelir'));
await p.locator('#panel-finansal .rep-donut').first().screenshot({path:'outputs/d5.png'});

await tab('demografi'); targets.push(await probe('#panel-demografi .rep-donut','6 Cihaz'));
await p.locator('#panel-demografi .rep-donut').first().screenshot({path:'outputs/d6.png'});

console.log('DONUTS FOUND:', await p.locator('.rep-donut').count());
targets.forEach(t=>console.log(JSON.stringify(t.r)));
console.log('console_errors:',JSON.stringify(errs));
await b.close();
