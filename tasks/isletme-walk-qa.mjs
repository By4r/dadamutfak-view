// İŞLETME şeridi (B1/K1/W1/B2/C2) — walkable + dead-link + render QA
import { chromium } from 'playwright';
const B = 'http://localhost:8765/v6/';
const SHOT = 'docs/screenshots/isletme/';
const log = (...a) => console.log(...a);
let FAIL = 0;
const must = (cond, msg) => { log((cond ? 'PASS' : 'FAIL') + ' — ' + msg); if (!cond) FAIL++; };

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
const jsErr = [];
page.on('pageerror', e => jsErr.push(String(e)));
const bad = [];
page.on('response', r => { if (r.status() >= 400) bad.push(r.status() + ' ' + r.url()); });

async function go(u){ await page.goto(B + u, { waitUntil: 'networkidle' }); }
async function shot(name){ await page.screenshot({ path: SHOT + name + '.png', fullPage: true }); }

// ---------- B1: giris-v1 ----------
log('\n== B1 giris-v1 ==');
await go('giris-v1.html?tab=kayit');
// select İşletme role in register
await page.click('#kaRoleSeg .au-seg-btn[data-karole="isletme"]');
await page.waitForTimeout(150);
const isAdVal = await page.inputValue('#kaIsAd');
must(isAdVal.length > 0, 'register İşletme adı mock-dolu: "' + isAdVal + '"');
await shot('b1-kayit-isletme');
// submit register as isletme → should land on isletme-ekle
await page.click('#formKayit .au-submit');
await page.waitForLoadState('networkidle');
must(page.url().includes('isletme-ekle-v1.html'), 'kayıt(İşletme) submit → isletme-ekle (' + page.url().split('/').pop() + ')');

// login isletme → mekan-panel?business=1
await go('giris-v1.html');
await page.click('#giAsSeg .au-seg-btn[data-as="isletme"]');
await page.click('#formGiris .au-submit');
await page.waitForLoadState('networkidle');
must(page.url().includes('mekan-panel-v1.html') && page.url().includes('business=1'), 'giriş(İşletme) submit → mekan-panel?business=1 (' + page.url().split('/').pop() + ')');
const hasBiz = await page.evaluate(() => localStorage.getItem('dm_business'));
must(hasBiz === '1', 'dm_business localStorage organik kuruldu (=' + hasBiz + ')');

// ---------- K1: hesabim-v1 — İşletmem yok ----------
log('\n== K1 hesabim-v1 ==');
await go('hesabim-v1.html');
const isletmemTab = await page.locator('[data-tab="isletmem"]').count();
const isletmemPane = await page.locator('[data-pane="isletmem"]').count();
const bizEls = await page.locator('.biz-empty, .biz-active, .biz-card').count();
must(isletmemTab === 0, 'İşletmem sekmesi kaldırıldı (count=' + isletmemTab + ')');
must(isletmemPane === 0, 'İşletmem pane kaldırıldı (count=' + isletmemPane + ')');
must(bizEls === 0, 'biz-* markup kaldırıldı (count=' + bizEls + ')');
await shot('k1-hesabim-tabs');

// ---------- W1: isletme-ekle wizard ----------
log('\n== W1 isletme-ekle-v1 ==');
await go('isletme-ekle-v1.html');
const wizName = await page.inputValue('#olForm input.fk-input');
must(wizName.length > 0, 'wizard 1. alan mock-dolu: "' + wizName + '"');
const uzC = (await page.textContent('#uzCount')).trim();
must(uzC !== '0', 'hizmet sayacı önceden dolu (=' + uzC + ')');
const bioC = (await page.textContent('#bioCount')).trim();
must(parseInt(bioC) > 0, 'bio sayacı init (=' + bioC + ')');
await shot('w1-wizard');
// iki-faz: önce kayıt (faz-2 aç), sonra submit → success → CTA target
await page.click('#olRegister');
await page.waitForTimeout(300);
await page.click('#olSubmit');
await page.waitForTimeout(400);
const ctaHref = await page.getAttribute('#olSuccess a', 'href');
must(ctaHref === 'mekan-panel-v1.html?business=1', 'wizard başarı CTA → mekan-panel?business=1 (' + ctaHref + ')');
await shot('w1-success');

// ---------- B2: 4 panel pages account menu ----------
log('\n== B2 panel hesap menüsü ==');
for (const p of ['mekan-panel-v1.html','mekan-rezervasyonlar-v1.html','mekan-ayarlar-v1.html','mekan-menu-v1.html']) {
  await go(p);
  const items = await page.evaluate(() => window.SA_ACCOUNT_ITEMS || null);
  const ok = items && items.length === 5 && items[0].href === 'mekan-panel-v1.html'
    && items[1].href === 'mekan-detay-v1.html?owner=1'
    && items[2].href === 'mekan-ayarlar-v1.html'
    && items[4].href === 'giris-v1.html?business=0' && items[4].danger === true;
  must(ok, p + ' → SA_ACCOUNT_ITEMS doğru (logout=consumer)');
  // open dropdown, verify rendered menu (no sa-giris)
  const me = await page.locator('.pnl-me').count();
  if (me) {
    await page.click('.pnl-me');
    await page.waitForTimeout(120);
    const menuTxt = await page.locator('.pnl-menu').innerText().catch(()=> '');
    must(/İşletme Profilim/.test(menuTxt) && /Çıkış/.test(menuTxt), p + ' menü render: İşletme Profilim + Çıkış');
    const linksToSaGiris = await page.locator('.pnl-menu a[href*="sa-giris"]').count();
    must(linksToSaGiris === 0, p + ' menüde sa-giris (süper-admin) linki YOK');
  }
}
await go('mekan-panel-v1.html?business=1');
await page.click('.pnl-me'); await page.waitForTimeout(150);
await shot('b2-panel-menu');

// ---------- C2: mekan-detay owner band ----------
log('\n== C2 mekan-detay ?owner=1 ==');
await go('mekan-detay-v1.html?owner=1');
const barVisible = await page.locator('.sa-owner-bar').isVisible();
must(barVisible, 'owner=1 → önizleme bandı görünür');
const barTxt = await page.locator('.sa-owner-bar .so-txt').innerText();
must(/Ziyaretçi görünümü/.test(barTxt), 'bant metni "Ziyaretçi görünümü"');
const editHref = await page.getAttribute('.sa-owner-bar .so-act', 'href');
must(editHref === 'mekan-panel-v1.html', 'Panelden Düzenle → mekan-panel');
await shot('c2-owner-band');
// negatif: parametresiz gizli
await go('mekan-detay-v1.html');
const barHidden = !(await page.locator('.sa-owner-bar').isVisible());
must(barHidden, 'owner param yok → bant GİZLİ');
await shot('c2-no-owner');

// ---------- EK#4: isletme-ekle iki-faz ----------
log('\n== EK#4 iki-faz akış ==');
await go('isletme-ekle-v1.html');
let p2vis = await page.locator('#olPhase2').isVisible();
must(!p2vis, 'ilk halde FAZ-2 (ekstra detay) GİZLİ');
let submitVis = await page.locator('#olSubmit').isVisible();
must(!submitVis, 'ilk halde "Başvuruyu Gönder" gizli (önce kayıt)');
let regVis = await page.locator('#olRegister').isVisible();
must(regVis, 'FAZ-1 "Mekânı Kaydet" CTA görünür');
const snExtraPE = await page.evaluate(() => {
  const el = document.querySelector('.sn-extra'); return el ? getComputedStyle(el).pointerEvents : null;
});
must(snExtraPE === 'none', 'kayıt öncesi faz-2 nav öğeleri kilitli (pointer-events:none)');
await shot('ek4-faz1-gizli');
await page.click('#olRegister');
await page.waitForTimeout(400);
p2vis = await page.locator('#olPhase2').isVisible();
must(p2vis, 'kayıt sonrası FAZ-2 ekstra alanlar AÇILDI');
submitVis = await page.locator('#olSubmit').isVisible();
must(submitVis, 'kayıt sonrası "Başvuruyu Gönder" görünür');
regVis = await page.locator('#olRegister').isVisible();
must(!regVis, 'kayıt sonrası FAZ-1 CTA gizlendi');
await shot('ek4-faz2-acik');
await page.click('#olSubmit');
await page.waitForTimeout(400);
const ek4cta = await page.getAttribute('#olSuccess a', 'href');
must(ek4cta === 'mekan-panel-v1.html?business=1', 'iki-faz sonu başarı CTA → mekan-panel?business=1 korundu');

// ---------- DZ: Public Sayfam = TEK sidebar footer linki (gövde CTA söküldü) ----------
log('\n== DZ panel Public Sayfam (sidebar footer tek) ==');
await go('mekan-panel-v1.html?business=1');
const bodyCta = page.locator('.ph-actions a[href*="mekan-detay"]');
must(await bodyCta.count() === 0, 'gövde (ph-actions) Public Sayfam CTA SÖKÜLDÜ (fazlalık gitti)');
const sideCta = page.locator('.pnl-side-foot a[href="mekan-detay-v1.html?owner=1"]');
must(await sideCta.count() === 1, 'sol-alt sidebar footer Public Sayfam TEK link → owner=1');
must(await sideCta.isVisible(), 'sidebar footer link görünür');
await shot('dz-panel-cta');
// sidebar footer link tıkla → band tetiklenir mi
await sideCta.click();
await page.waitForLoadState('networkidle');
must(page.url().includes('mekan-detay-v1.html') && page.url().includes('owner=1'), 'sidebar link tıkla → mekan-detay?owner=1 (' + page.url().split('/').pop() + ')');
must(await page.evaluate(() => document.body.classList.contains('is-owner')), 'mekan-detay body.is-owner=true (param okundu)');
must(await page.locator('.sa-owner-bar').isVisible(), 'sahip önizleme bandı GÖRÜNÜR (band tetiklendi)');

// ---------- 390 render (ek değişen sayfalar) ----------
log('\n== 390 render ==');
const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mp = await m.newPage();
await mp.goto(B + 'isletme-ekle-v1.html', { waitUntil: 'networkidle' });
await mp.screenshot({ path: SHOT + 'ek4-390-faz1.png', fullPage: true });
await mp.goto(B + 'isletme-ekle-v1.html?reg=1', { waitUntil: 'networkidle' });
await mp.screenshot({ path: SHOT + 'ek4-390-faz2.png', fullPage: true });
await mp.goto(B + 'mekan-panel-v1.html?business=1', { waitUntil: 'networkidle' });
await mp.screenshot({ path: SHOT + 'ek5-390-panel.png', fullPage: true });
await m.close();

// ---------- dead-link sweep on touched pages ----------
log('\n== Dead-link sweep ==');
const pages = ['giris-v1.html','hesabim-v1.html','isletme-ekle-v1.html','mekan-panel-v1.html?business=1',
  'mekan-rezervasyonlar-v1.html','mekan-ayarlar-v1.html','mekan-menu-v1.html','mekan-detay-v1.html?owner=1'];
let dead = [];
for (const p of pages) {
  await go(p);
  const hrefs = await page.$$eval('a[href]', as => as.map(a => a.getAttribute('href')));
  for (const h of hrefs) {
    if (!h || h.startsWith('#') || h.startsWith('http') || h.startsWith('mailto') || h.startsWith('tel') || h.startsWith('javascript')) continue;
    const file = h.split('?')[0].split('#')[0];
    if (!file.endsWith('.html')) continue;
    const url = B + file;
    const r = await page.request.get(url).catch(()=>null);
    if (!r || r.status() >= 400) dead.push(p + ' → ' + h + ' [' + (r? r.status():'ERR') + ']');
  }
}
must(dead.length === 0, 'dokunulan sayfalarda dead-link YOK' + (dead.length? '\n  ' + dead.join('\n  ') : ''));

log('\n== Konsol/HTTP ==');
must(jsErr.length === 0, 'JS hatası yok' + (jsErr.length? '\n  ' + jsErr.join('\n  ') : ''));
const realBad = bad.filter(b => !/favicon/.test(b));
must(realBad.length === 0, 'HTTP 4xx/5xx yok' + (realBad.length? '\n  ' + realBad.join('\n  ') : ''));

log('\n' + (FAIL === 0 ? 'ALL PASS ✅' : FAIL + ' FAIL ❌'));
await browser.close();
process.exit(FAIL === 0 ? 0 : 1);
