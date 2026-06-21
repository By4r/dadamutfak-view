#!/usr/bin/env node
/* ============================================================================
   FAZ 3 — ADIM 0 · PAYLAŞILAN OMURGA SWEEP (brand-context + has-business)
   İki shell primitifini TÜM ürün sayfalarına idempotent yayar:
   (1) <body data-brand="mutfak|store|akademi|fit">  — brand-context primitifi.
       data-brand = sayfanın GÖRÜNEN shell markası (chrome hangi markaysa o).
       Adım 1 arama scope + header arama brand-taşıma bunu okuyacak.
   (2) body.has-business  — işletme-sahibi rol state'i (is-auth kardeşi).
       Standalone IIFE (</body> öncesi): ?business=1/0 toggle + localStorage
       dm_business + body.has-business. Adım 1 işletme linkleri buna dayanır.
   Yöntem: regex/anchor replace. Idempotent (guard'lı), full-file write YOK.
   Hariç: dev/referans dosyaları (_overflow_probe, dizin, ref-*).
   ============================================================================ */
const fs = require('fs');
const path = require('path');
const DIR = __dirname;

// ---- marka haritası: GÖRÜNEN shell markası (header chrome) ----
const STORE   = new Set(['dada-shop-v1.html','urun-liste-v1.html','urun-detay-v1.html','sepet-v1.html','odeme-v1.html']);
const FIT     = new Set(['dadafit-hub-v1.html','dadafit-kopru-v1.html','egzersiz-kutuphane-v1.html','egzersiz-detay-v1.html','program-liste-v1.html','program-detay-v1.html','antrenorler-v1.html','antrenor-detay-v1.html','antrenor-ol-v1.html','challenge-v1.html']);
const AKADEMI = new Set(['akademi-v1.html']);
// geri kalan tümü → mutfak (ana/anne marka). siparislerim & tarif-detay-headA
// mutfak shell render ediyor → mutfak. panel/admin/diyetisyen/saglik/auth/hesap = mutfak.

// ---- hariç tutulan dev/referans dosyaları ----
const EXCLUDE = new Set(['_overflow_probe.html','dizin.html','ref-food52.html','ref-graza.html','ref-mob.html','ref-nyt.html','ref-ourplace.html','ref-refika.html','ref-sakara.html']);

function brandOf(f){
  if (STORE.has(f))   return 'store';
  if (FIT.has(f))     return 'fit';
  if (AKADEMI.has(f)) return 'akademi';
  return 'mutfak';
}

// has-business primitifi — standalone IIFE, </body> öncesi. is-auth simülasyonu (dm_auth) ile
// aynı sözleşme; ayrı blok çünkü panel/store sayfalarında dm_auth IIFE'si yok ama bu her yerde lazım.
const HASBIZ_BLOCK =
`<script>
/* ===== Faz3 — işletme-sahibi rolü (has-business): is-auth kardeşi =====
   ?business=1 → localStorage dm_business='1' + body.has-business ; ?business=0 → temizle.
   param yoksa localStorage'a bakılır. Adım 1 işletme linkleri (İşletmem→Panele Git,
   panel topbar account chip) body.has-business ile rol-koşullu gösterilir. */
(function(){
  var qs=location.search, biz=false;
  if(qs.indexOf('business=1')>-1){ try{localStorage.setItem('dm_business','1');}catch(e){} }
  else if(qs.indexOf('business=0')>-1){ try{localStorage.removeItem('dm_business');}catch(e){} }
  try{ biz=localStorage.getItem('dm_business')==='1'; }catch(e){}
  if(biz){ document.body.classList.add('has-business'); }
})();
</script>
</body>`;

const BODY_RE = /<body\b([^>]*)>/i;

const all = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
const done = [], skip = [];

for (const f of all) {
  if (EXCLUDE.has(f)) { skip.push([f, 'hariç (dev/ref)']); continue; }
  const p = path.join(DIR, f);
  let txt = fs.readFileSync(p, 'utf8');
  const log = [];

  // (1) data-brand — body tag'ine ekle (guard: zaten varsa atla)
  const brand = brandOf(f);
  const m = txt.match(BODY_RE);
  if (!m) { log.push('!body-yok'); }
  else if (/data-brand=/.test(m[0])) { log.push('-brand(var)'); }
  else { txt = txt.replace(BODY_RE, '<body data-brand="' + brand + '"$1>'); log.push('+brand:' + brand); }

  // (2) has-business IIFE — </body> öncesine (guard: dm_business yoksa)
  if (txt.includes('dm_business')) { log.push('-hasbiz(var)'); }
  else if (txt.includes('</body>')) { txt = txt.replace('</body>', HASBIZ_BLOCK); log.push('+hasbiz'); }
  else { log.push('!/body-yok'); }

  fs.writeFileSync(p, txt, 'utf8');
  done.push([f, log.join(' ')]);
}

console.log('=== İŞLENEN (' + done.length + ') ===');
done.forEach(r => console.log('  ' + r[0].padEnd(34) + r[1]));
console.log('\n=== ATLANAN (' + skip.length + ') ===');
skip.forEach(r => console.log('  ' + r[0].padEnd(34) + r[1]));
