import { chromium } from 'playwright';
const URL='http://localhost:8765/v6/sa-admin-raporlar.html';
const b=await chromium.launch();const p=await b.newPage();
const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PE '+e));
await p.goto(URL,{waitUntil:'networkidle'});
const R={};
try{
// 1. chip toggle + sub
await p.click('#rangeChips .chip[data-range="90g"]');await p.waitForTimeout(80);
R.chip90_on=await p.locator('#rangeChips .chip[data-range="90g"]').evaluate(e=>e.classList.contains('is-on'));
R.chip30_off=await p.locator('#rangeChips .chip[data-range="30g"]').evaluate(e=>!e.classList.contains('is-on'));
R.sub90=await p.locator('#repSub').innerText();
// 2. Özel popover opens
await p.click('#rangeChips .chip[data-range="ozel"]');await p.waitForTimeout(120);
R.pop_open=await p.locator('#datePop').isVisible();
R.date_inputs=await p.locator('#datePop input[type=date]').count();
R.start_prefilled=await p.locator('#dpStart').inputValue();
R.end_prefilled=await p.locator('#dpEnd').inputValue();
R.ozel_aria=await p.locator('#rangeChips .chip[data-range="ozel"]').getAttribute('aria-expanded');
// 3. custom dates + apply
await p.fill('#dpStart','2026-05-01');await p.fill('#dpEnd','2026-05-31');
await p.click('#dpApply');await p.waitForTimeout(120);
R.pop_closed_after_apply=await p.locator('#datePop').isHidden();
R.sub_custom=await p.locator('#repSub').innerText();
R.ozel_on=await p.locator('#rangeChips .chip[data-range="ozel"]').evaluate(e=>e.classList.contains('is-on'));
// 3b. invalid range error
await p.click('#rangeChips .chip[data-range="ozel"]');await p.waitForTimeout(100);
await p.fill('#dpStart','2026-05-31');await p.fill('#dpEnd','2026-05-01');
await p.click('#dpApply');await p.waitForTimeout(80);
R.err_shown=await p.locator('#dpErr').evaluate(e=>e.classList.contains('show'));
R.pop_still_open=await p.locator('#datePop').isVisible();
await p.fill('#dpEnd','2026-06-15');await p.click('#dpApply');await p.waitForTimeout(80);
R.sub_custom2=await p.locator('#repSub').innerText();
// 4. Kıyas pill
await p.click('#cmpToggle');await p.waitForTimeout(100);
R.cmp_btn_on=await p.locator('#cmpToggle').evaluate(e=>e.classList.contains('is-on'));
R.kpi_cmp_display=await p.locator('#panel-genel .kpi-cmp').first().evaluate(e=>getComputedStyle(e).display);
R.kpi_cmp_bg=await p.locator('#panel-genel .kpi-cmp').first().evaluate(e=>getComputedStyle(e).backgroundColor);
R.sub_with_cmp=await p.locator('#repSub').innerText();
// 5. outside click closes
await p.click('#rangeChips .chip[data-range="ozel"]');await p.waitForTimeout(80);
R.reopened=await p.locator('#datePop').isVisible();
await p.click('h1');await p.waitForTimeout(80);
R.closed_outside=await p.locator('#datePop').isHidden();
await p.screenshot({path:'outputs/ctrl_1440.png'});
await p.click('#rangeChips .chip[data-range="ozel"]');await p.waitForTimeout(100);
await p.locator('.pnl-page-head').screenshot({path:'outputs/ctrl_pop.png'});
await p.click('h1');await p.waitForTimeout(60);
}catch(e){R.desktop_error=String(e).split('\n')[0];}

// 390 — resilient
try{
await p.setViewportSize({width:390,height:850});
await p.reload({waitUntil:'networkidle'});
const oz=p.locator('#rangeChips .chip[data-range="ozel"]');
await oz.scrollIntoViewIfNeeded();await p.waitForTimeout(80);
R.ozel_vis_390=await oz.isVisible();
const bb=await oz.boundingBox();
R.ozel_box_390=bb?{w:Math.round(bb.width),h:Math.round(bb.height)}:null;
await oz.click({force:true});await p.waitForTimeout(120);
R.pop_390=await p.locator('#datePop').isVisible();
await p.screenshot({path:'outputs/ctrl_390.png'});
}catch(e){R.m390_error=String(e).split('\n')[0];}

R.console_errors=errs;
console.log(JSON.stringify(R,null,2));
await b.close();
