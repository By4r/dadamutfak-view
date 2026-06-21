import fs from 'fs';

const DIR = 'v6/';
const PAGES = [
  // 10 yeni
  'sa-admin-kullanicilar','sa-admin-sayfalar','sa-store-urunler','sa-store-siparisler',
  'sa-store-musteriler','sa-store-kategoriler','sa-store-promosyonlar',
  'sa-dadafit-challenge','sa-dadafit-egzersizler','sa-dadafit-programlar',
  // 14 mevcut
  'sa-admin-sefler','sa-admin-slider','sa-admin-tarifler','sa-dadafit-antrenorler',
  'sa-saglik-diyetisyenler','sa-saglik-hesaplayicilar','sa-saglik-randevular',
  'sa-saglik-receteler','sa-saglik-testler','sa-isletme-isletmeler','sa-isletme-menuler',
  'sa-isletme-onaylar','sa-isletme-reklam','sa-isletme-rezervasyonlar',
];

const SCRIPT_TAG = '<script src="assets/js/sa-chcnt.js"></script>';
const log = [];

for (const p of PAGES) {
  const fp = DIR + p + '.html';
  let c = fs.readFileSync(fp, 'utf8');
  const before = c;
  let css = false, js = false;

  // 1) .ch-cnt kuralına white-space:nowrap (idempotent, sadece ch-cnt bloğuna)
  c = c.replace(/(\.chip \.ch-cnt\{)([\s\S]*?\})/, (m, open, body) => {
    if (/white-space\s*:\s*nowrap/.test(body)) return m;
    css = true;
    return open + 'white-space:nowrap;' + body;
  });

  // 2) sa-chcnt.js include (sa-shell.js'ten hemen sonra; idempotent)
  if (!c.includes('sa-chcnt.js')) {
    if (c.includes('<script src="assets/js/sa-shell.js"></script>')) {
      c = c.replace('<script src="assets/js/sa-shell.js"></script>',
        '<script src="assets/js/sa-shell.js"></script>\n' + SCRIPT_TAG);
      js = true;
    } else {
      c = c.replace('</body>', SCRIPT_TAG + '\n</body>');
      js = true;
    }
  }

  if (c !== before) fs.writeFileSync(fp, c, 'utf8');
  log.push(`${p}  css:${css?'+ws':'skip'}  js:${js?'+script':'skip'}`);
}
console.log(log.join('\n'));
