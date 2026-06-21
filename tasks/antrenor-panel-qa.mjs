import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const fileUrl = 'file://' + path.join(root, 'v6', 'antrenor-panel-v1.html');
const outDir = path.join(root, 'outputs');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });

await page.goto(fileUrl, { waitUntil: 'networkidle' });
await page.waitForTimeout(600);

// --- structural checks ---
const checks = {};
checks.globeVisible = await page.locator('.pnl-site .fa-globe').isVisible().catch(()=>false);
checks.gavSigVisible = await page.locator('.pnl-side-foot .sa-sig img').isVisible().catch(()=>false);
checks.activeNav = await page.locator('.pnl-link.is-active').innerText().catch(()=>'');
checks.challengeCard = await page.locator('.chl-card').isVisible().catch(()=>false);

// --- accent color audit: scan all rendered colors for the diyetisyen mint #3BB77E (rgb 59,183,126) ---
const mintLeak = await page.evaluate(() => {
  const MINT = 'rgb(59, 183, 126)';
  const hits = [];
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    ['color','backgroundColor','borderTopColor','borderLeftColor'].forEach(p => {
      if (s[p] === MINT) hits.push(el.className + ' :: ' + p);
    });
  });
  return hits;
});

// --- confirm kurumsal green (#009d4f = rgb 0,157,79) is actually applied on active nav left-border ---
const activeNavBg = await page.evaluate(() => {
  const el = document.querySelector('.pnl-link.is-active');
  return el ? getComputedStyle(el).backgroundColor : null;
});
const greenToken = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--green').trim());

// --- dropdown open/close ---
await page.locator('.pnl-me').click();
await page.waitForTimeout(300);
checks.dropdownOpens = await page.locator('.pnl-menu.open, .pnl-menu').first().isVisible().catch(()=>false);
await page.keyboard.press('Escape');
await page.waitForTimeout(200);

// --- full page screenshot (no crop) ---
await page.screenshot({ path: path.join(outDir, 'antrenor-panel-1440.png'), fullPage: true });

// --- mobile 390 ---
await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(outDir, 'antrenor-panel-390.png'), fullPage: true });

await browser.close();

console.log('=== ANTRENOR PANEL QA ===');
console.log('globe visible      :', checks.globeVisible);
console.log('gavia sig visible  :', checks.gavSigVisible);
console.log('active nav         :', JSON.stringify(checks.activeNav));
console.log('challenge card     :', checks.challengeCard);
console.log('dropdown opens     :', checks.dropdownOpens);
console.log('--green token      :', JSON.stringify(greenToken));
console.log('active nav bg      :', activeNavBg, '(expect rgba of 0,157,79)');
console.log('MINT LEAK (#3BB77E):', mintLeak.length, mintLeak.length ? JSON.stringify(mintLeak) : 'NONE');
console.log('JS errors          :', errors.length, errors.length ? JSON.stringify(errors) : 'NONE');
