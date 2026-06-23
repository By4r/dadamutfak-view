import { chromium } from 'playwright';
const URL='http://localhost:8765/v6/sa-admin-raporlar.html';
const b=await chromium.launch();
const p=await b.newPage();
const errs=[];
p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.goto(URL,{waitUntil:'networkidle'});
const R={};
async function tab(name){await p.click(`#tab-${name}`);await p.waitForTimeout(180);}

// L1/L2 intact
R.L1_signature = await p.locator('.sig-hero .sig-num').first().isVisible();
R.L2_brandseg = await p.locator('#brandSeg .bseg-btn').count();

// KIYAS
await tab('kiyas');
R.kiyas_visible = await p.locator('#panel-kiyas').isVisible();
R.cmp_rows = await p.locator('#panel-kiyas .cmp-table tbody tr').count();
R.xs_cells = await p.locator('#panel-kiyas .xs-cell').count();
R.xs_self = await p.locator('#panel-kiyas .xs-cell.self').count();
R.xs_dark = await p.locator('#panel-kiyas .xs-cell.dark').count();
R.kbar_rows = await p.locator('#panel-kiyas .kbar-row').count();
// brand scope resolves on a matrix row (Sağlık row should be nane green)
R.saglik_cell_bg = await p.locator('#panel-kiyas .xs-row.brand-saglik .xs-cell.dark').first().evaluate(el=>getComputedStyle(el).backgroundColor);
await p.screenshot({path:'outputs/r2_kiyas_1440.png',fullPage:true});

// FINANSAL
await tab('finansal');
R.fin_markakirilim = await p.locator('#panel-finansal table.cmp-table tbody tr').count();
R.fin_kademe = await p.locator('#panel-finansal .dist-list').first().innerText();
await p.screenshot({path:'outputs/r2_finansal_1440.png',fullPage:true});

// DEMOGRAFI (Kitle & Kohort)
await tab('demografi');
R.coh_cells = await p.locator('#panel-demografi .coh-cell').count();
R.coh_dark = await p.locator('#panel-demografi .coh-cell.dark').count();
await p.screenshot({path:'outputs/r2_kohort_1440.png',fullPage:true});

// OPERASYON (moderasyon)
await tab('moderasyon');
R.queue_rows = await p.locator('#panel-moderasyon .q-type').count();
R.queue_pstat = await p.locator('#panel-moderasyon .ptable .pstat').count();
R.queue_warm = await p.locator('#panel-moderasyon .pstat.warm').count();
R.isletme_ico_bg = await p.locator('#panel-moderasyon .q-type.brand-isletme .q-ico').first().evaluate(el=>getComputedStyle(el).color);
await p.screenshot({path:'outputs/r2_operasyon_1440.png',fullPage:true});

// back to L2 to confirm not broken
await tab('markalar');
R.L2_panel_visible = await p.locator('#panel-markalar .brand-seg').isVisible();

// 390 mobile — kiyas matrix scroll
await p.setViewportSize({width:390,height:850});
await tab('kiyas');
await p.screenshot({path:'outputs/r2_kiyas_390.png',fullPage:true});

R.console_errors = errs;
console.log(JSON.stringify(R,null,2));
await b.close();
