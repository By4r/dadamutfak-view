import fs from 'fs';

const DIR = 'v6/';
const SHELL = '<link rel="stylesheet" href="assets/css/sa-shell.css" />';
const LINK  = '<link rel="stylesheet" href="assets/css/sa-list.css" />';

// Liste-tablosu olan sa-* sayfaları: .ptable VAR, detay/form değil.
const all = fs.readdirSync(DIR).filter(f => /^sa-.*\.html$/.test(f));
const targets = all.filter(f => {
  if (/-detay\.html$|-form\.html$/.test(f)) return false;
  const c = fs.readFileSync(DIR + f, 'utf8');
  return c.includes('class="ptable"');
});

const log = [];
for (const f of targets) {
  const fp = DIR + f;
  let c = fs.readFileSync(fp, 'utf8');
  if (c.includes('assets/css/sa-list.css')) { log.push(`skip(zaten)  ${f}`); continue; }
  if (c.includes(SHELL)) {
    c = c.replace(SHELL, SHELL + '\n' + LINK);
    fs.writeFileSync(fp, c, 'utf8');
    log.push(`+link        ${f}`);
  } else {
    log.push(`!! SHELL-LINK YOK, atlandı: ${f}`);
  }
}
console.log(log.join('\n'));
console.log(`\n${targets.length} hedef sayfa (detay/form hariç). Eklenen: ${log.filter(l=>l.startsWith('+')).length}`);
console.log('Hedefler:', targets.join(' '));
