import { chromium } from 'playwright';
import fs from 'fs';

const OUT = 'docs/screenshots/public';
fs.mkdirSync(OUT, { recursive: true });

// argv: list of "name|url|action" — action optional (a JS snippet run in page)
const pages = [
  ['kesfet', 'http://localhost:8765/v6/kesfet-v1.html', ''],
  ['ansiklopedi', 'http://localhost:8765/v6/ansiklopedi-v1.html', ''],
  ['olcu-birimleri', 'http://localhost:8765/v6/olcu-birimleri-v1.html', ''],
  ['tarif-bulucu', 'http://localhost:8765/v6/tarif-bulucu-v1.html', ''],
  ['bugun-modlar', 'http://localhost:8765/v6/bugun-ne-pisirsem-v1.html?tab=modlar', ''],
  ['mutfaga-giris', 'http://localhost:8765/v6/mutfaga-giris-v1.html', ''],
  ['mutfaga-giris-liste', 'http://localhost:8765/v6/mutfaga-giris-liste-v1.html', ''],
  ['besin-degerleri', 'http://localhost:8765/v6/besin-degerleri-v1.html', ''],
  ['besin-kalori-cetveli', 'http://localhost:8765/v6/besin-kalori-cetveli-v1.html', ''],
  ['protein-rehberi', 'http://localhost:8765/v6/protein-rehberi-v1.html', ''],
  ['karbonhidrat-rehberi', 'http://localhost:8765/v6/karbonhidrat-rehberi-v1.html', ''],
  ['yag-rehberi', 'http://localhost:8765/v6/yag-rehberi-v1.html', ''],
  ['sezon', 'http://localhost:8765/v6/sezon-v1.html', ''],
];

const only = process.argv.slice(2);
const browser = await chromium.launch();

for (const [name, url] of pages) {
  if (only.length && !only.includes(name)) continue;
  for (const w of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width: w, height: 1000 } });
    const errs = [];
    page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push('CONSOLE: ' + m.text()); });
    const resp = await page.goto(url, { waitUntil: 'networkidle' }).catch(e => ({ status: () => 'NAV-FAIL ' + e.message }));
    await page.waitForTimeout(250);
    const status = typeof resp.status === 'function' ? resp.status() : resp.status;
    await page.screenshot({ path: `${OUT}/${name}-${w}.png`, fullPage: true });
    console.log(`${name} @${w}: status=${status} errs=${errs.length}${errs.length ? ' :: ' + errs.join(' | ') : ''}`);
    await page.close();
  }
}
await browser.close();
