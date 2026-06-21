#!/usr/bin/env node
/* ============================================================================
   CİLA-2 FAZ 2 — LOGIN-STATE SWEEP (etkilesim)
   _shell.html login-state chrome'unu standart-chrome public sayfalara yayar.
   Yöntem: bölge-swap (region-swap) — her parça için [startAnchor,endAnchor)
   bölgesi shell'inkiyle değiştirilir. Whitespace-dayanıklı + idempotent.
   Kapsam KİLİDİ: yalnız header/drawer/bottom-nav + login CSS/JS + lg-gate.
   Hariç: shop ailesi (lm-modal, is-auth SIZMAZ) · panel/dyt/hesaplayici/ref
   (btn-login yok) · _shell (kaynak) · headA varyant · zaten-chrome (acct-wrap).
   ============================================================================ */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const shell = fs.readFileSync(path.join(DIR, '_shell.html'), 'utf8');

// ---- region-swap parçaları: [startAnchor, endAnchor, guard] ----
// (anchor'lar shell'de DEĞİŞMEMİŞ orijinal string'ler; aralarına ekleme yapıldı)
const REGIONS = [
  // R1 — LOGIN-STATE + LG-GATE CSS (btn-login:hover'dan sonra)
  ['.btn-login:hover{background:var(--tomato-dark);border-color:var(--tomato-dark)}', '/* ---- NAV DROPDOWNS ---- */', 'LOGIN-STATE (cila-2 faz 2) — header logged-in chrome'],
  // R2 — mobil override (is-auth header öğeleri ≤640 gizli)
  ['  .btn-login{display:none}                                   /* giriş → drawer + bottom-nav */', '  .icon-btn{width:40px;height:40px;font-size:15px}', 'body.is-auth .head-add,body.is-auth .head-bell,body.is-auth .acct-wrap{display:none}'],
  // R3 — head-actions markup (ekle/zil/avatar). startStr PREFIX (giris-v1'de btn-login onclick'siz).
  // Guard MARKUP-spesifik (R1 CSS'teki .acct-wrap selektörüne takılmasın)
  ['<button class="btn-login"', '<button class="icon-btn hamburger" id="hamburger"', 'class="acct-item head-add"'],
  // R4 — drawer-foot (drawer-login + drawer-acct + Püf Ekle). Guard MARKUP-spesifik
  ['<div class="drawer-foot">', '<div class="drawer-lang" id="drawerLang">', 'class="drawer-acct"'],
  // R8 — acct-toggle + lg-gate JS
  ["  if(!e.target.closest('.nav-item'))document.querySelectorAll('.nav-item.open').forEach(function(o){o.classList.remove('open')});", '// ---- DİL SEÇİCİ (üst bant dropdown) ----', 'window.__lgGate=open'],
];

// R5 — bottom-nav Hesap: regex replace (href varyantı: hesabim-v1 / mutfak-defteri-v1 / # → hepsi bnAccount)
const R5_RE = /<a href="[^"]*" class="bn-item"><i class="fa-solid fa-user"><\/i><span>Hesap<\/span><\/a>/;
const R5_NEW = '<a href="giris-v1.html" id="bnAccount" class="bn-item"><i class="fa-solid fa-user"></i><span>Hesap</span></a>';

// R7 — dm_auth JS: DOĞRUDAN INSERT (region-swap değil — anasayfa-portal-v3a'da shell'in
// heroMode yorumu YOK; evrensel anchor = dd=1 SS-param satırı, her sayfada var).
// Guard: dm_auth zaten varsa ATLA (inline'lı 3 içerik sayfası — çift enjeksiyon yok).
const DM_ANCHOR = "if(location.search.indexOf('dd=1')>-1){document.querySelector('.nav-item').classList.add('open');";
const DM_BLOCK = shell.slice(shell.indexOf('// ===== Login-state simülasyonu'), shell.indexOf('// SS paramları'));

// R6 — lg-gate markup: DOĞRUDAN INSERT (</main> SONRASINA). Region-swap DEĞİL — detay
// sayfalarında </main> ile footer ARASINDA overlay (actbar/lightbox/video-modal) var; region-swap
// onları SİLERDİ. Insert güvenli: lg-gate, mevcut içeriğin önüne eklenir (lessons: </main> sonrası).
const LG_MAIN_ANCHOR = '</main><!-- /.page-main -->';
const LG_BLOCK = shell.slice(shell.indexOf(LG_MAIN_ANCHOR) + LG_MAIN_ANCHOR.length, shell.indexOf('<!-- ===== FOOTER ===== -->'));

function swapRegion(txt, startStr, endStr, guard) {
  if (txt.includes(guard)) return { txt, applied: false, reason: 'guard' };
  const ts = txt.indexOf(startStr); if (ts < 0) return { txt, applied: false, reason: 'no-start' };
  const te = txt.indexOf(endStr, ts); if (te < 0) return { txt, applied: false, reason: 'no-end' };
  const ss = shell.indexOf(startStr); const se = shell.indexOf(endStr, ss);
  if (ss < 0 || se < 0) return { txt, applied: false, reason: 'shell-anchor-missing' };
  const newRegion = shell.slice(ss, se);
  return { txt: txt.slice(0, ts) + newRegion + txt.slice(te), applied: true };
}

// ---- aday seçimi ----
const all = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
// SHOP = gerçek shop kabuğu (lm-* login modalı + sipariş hesabı). alisveris-listesi BURADA DEĞİL —
// adı yanıltıcı ama ANA SİTE ailesi (haftalik-menu reyon-grup mirası, lm-modal YOK, standart chrome).
const SHOP = new Set(['dada-shop-v1.html','odeme-v1.html','sepet-v1.html','siparislerim-v1.html','urun-liste-v1.html','urun-detay-v1.html']);
const HARD_EXCLUDE = new Set(['_shell.html','tarif-detay-v1-headA.html']);

const processed = [], skipped = [];
for (const f of all) {
  const p = path.join(DIR, f);
  let txt = fs.readFileSync(p, 'utf8');
  // exclusion kuralları
  if (HARD_EXCLUDE.has(f)) { skipped.push([f, 'hard-exclude']); continue; }
  // Shop tespiti: SHOP set + lm-modal login. cartWrap (sepet ikonu) TEK BAŞINA shop demek DEĞİL —
  // alisveris-listesi cartWrap taşır ama ana-site (sepete-aktar köprüsü). cartWrap detection'dan düşürüldü.
  if (SHOP.has(f) || txt.includes('class="lm-modal"')) { skipped.push([f, 'shop-kabuk (is-auth SIZMAZ)']); continue; }
  if (!txt.includes('class="btn-login"')) { skipped.push([f, 'chrome-yok (panel/dyt/hesaplayici/ref)']); continue; }
  const already = txt.includes('acct-wrap');
  // region-swap uygula (R1,R2,R3,R4,R8)
  const LABELS = ['R1', 'R2', 'R3', 'R4', 'R8'];
  const log = [];
  for (let i = 0; i < REGIONS.length; i++) {
    const [s, e, g] = REGIONS[i];
    const r = swapRegion(txt, s, e, g);
    txt = r.txt;
    log.push((r.applied ? '+' : '-') + LABELS[i]);
  }
  // R5 (bottom-nav, regex)
  let r5 = '-R5';
  if (!txt.includes('id="bnAccount"') && R5_RE.test(txt)) { txt = txt.replace(R5_RE, R5_NEW); r5 = '+R5'; }
  // R6 (lg-gate markup, INSERT </main> sonrasına — overlay'leri silmez; guard: lgGate yoksa)
  let r6 = '-R6';
  if (!txt.includes('id="lgGate"') && txt.includes(LG_MAIN_ANCHOR)) { txt = txt.replace(LG_MAIN_ANCHOR, LG_MAIN_ANCHOR + LG_BLOCK); r6 = '+R6'; }
  // R7 (dm_auth, INSERT dd=1 satırından önce; guard: dm_auth yoksa → inline'lı 3 sayfa atlanır)
  let r7 = '-R7';
  if (!txt.includes('dm_auth') && txt.includes(DM_ANCHOR)) { txt = txt.replace(DM_ANCHOR, DM_BLOCK + DM_ANCHOR); r7 = '+R7'; }
  else if (txt.includes('dm_auth')) r7 = '-R7(inline)';
  // sırala: R1 R2 R3 R4 R5 R6 R8 R7
  log.splice(4, 0, r5, r6);   // R5,R6 → R4 ile R8 arası
  log.push(r7);
  fs.writeFileSync(p, txt, 'utf8');
  processed.push([f, log.join(' '), already ? '(zaten-chrome)' : '']);
}

console.log('=== İŞLENEN (' + processed.length + ') ===');
processed.forEach(r => console.log('  ' + r[0].padEnd(34) + r[1] + ' ' + r[2]));
console.log('\n=== ATLANAN (' + skipped.length + ') ===');
skipped.forEach(r => console.log('  ' + r[0].padEnd(34) + r[1]));
