// anasayfa-portal-v3a login-state ELLE patch (sweep R1 region-swap'i page CSS yuttu → bu dosya
// HEAD'den temiz alındı, v3a'nın KENDİ anchor'larıyla, CSS parçaları INSERT ile uygulanıyor).
const fs = require('fs'), vm = require('vm');
const shell = fs.readFileSync('_shell.html', 'utf8');
let t = fs.readFileSync('anasayfa-portal-v3a.html', 'utf8');
const linesBefore = t.split('\n').length, catBefore = t.split('cat-track').length - 1;
const did = [];

function insertAfter(anchor, block, tag, guard) {
  if (t.includes(guard)) { did.push('-' + tag + '(guard)'); return; }
  if (!t.includes(anchor)) { did.push('-' + tag + '(no-anchor)'); return; }
  t = t.replace(anchor, anchor + block); did.push('+' + tag);
}
// span-guard'lı region-swap: bölge çok büyükse (>3000 char) ABORT → CSS-yutma engeli
function swapRegion(startStr, endStr, tag, guard) {
  if (t.includes(guard)) { did.push('-' + tag + '(guard)'); return; }
  const ts = t.indexOf(startStr); if (ts < 0) { did.push('-' + tag + '(no-start)'); return; }
  const te = t.indexOf(endStr, ts); if (te < 0) { did.push('-' + tag + '(no-end)'); return; }
  if (te - ts > 3000) { did.push('!!' + tag + '-ABORT(span=' + (te - ts) + ' YUTMA RİSKİ)'); return; }
  const ss = shell.indexOf(startStr), se = shell.indexOf(endStr, ss);
  t = t.slice(0, ts) + shell.slice(ss, se) + t.slice(te); did.push('+' + tag);
}

// R1 — CSS INSERT (region-swap DEĞİL: v3a'da btn-login:hover ile NAV DROPDOWNS arası 308 satır page CSS var)
const CSS_BLOCK = shell.slice(shell.indexOf('/* ===== LOGIN-STATE (cila-2 faz 2) — header logged-in chrome'), shell.indexOf('/* ---- NAV DROPDOWNS ---- */'));
insertAfter('.btn-login:hover{background:var(--tomato-dark);border-color:var(--tomato-dark)}\n\n', CSS_BLOCK, 'R1', 'LOGIN-STATE (cila-2 faz 2) — header logged-in chrome');

// R2 — mobil is-auth gizleme INSERT
const tag2 = '/* giriş → drawer + bottom-nav */';
let MOB = shell.slice(shell.indexOf(tag2) + tag2.length, shell.indexOf('  .icon-btn{width:40px;height:40px;font-size:15px}'));
insertAfter('  .btn-login{display:none}                                   /* giriş → drawer + bottom-nav */', MOB.replace(/\n$/, '') + '\n  ', 'R2', 'body.is-auth .head-add,body.is-auth .head-bell,body.is-auth .acct-wrap{display:none}');

// R3 — head-actions markup (region-swap, span-guard'lı)
swapRegion("<button class=\"btn-login\"", '<button class="icon-btn hamburger" id="hamburger"', 'R3', 'class="acct-item head-add"');
// R4 — drawer-foot (region-swap, span-guard'lı)
swapRegion('<div class="drawer-foot">', '<div class="drawer-lang" id="drawerLang">', 'R4', 'class="drawer-acct"');
// R8 — acct-toggle + lg-gate JS (region-swap, span-guard'lı)
swapRegion("  if(!e.target.closest('.nav-item'))document.querySelectorAll('.nav-item.open').forEach(function(o){o.classList.remove('open')});", '// ---- DİL SEÇİCİ (üst bant dropdown) ----', 'R8', 'window.__lgGate=open');

// R5 — bottom-nav regex
const R5RE = /<a href="[^"]*" class="bn-item"><i class="fa-solid fa-user"><\/i><span>Hesap<\/span><\/a>/;
const R5N = '<a href="giris-v1.html" id="bnAccount" class="bn-item"><i class="fa-solid fa-user"></i><span>Hesap</span></a>';
if (!t.includes('id="bnAccount"') && R5RE.test(t)) { t = t.replace(R5RE, R5N); did.push('+R5'); } else did.push('-R5');

// R6 — lg-gate INSERT (</main> sonrası)
const LGA = '</main><!-- /.page-main -->';
const LG_BLOCK = shell.slice(shell.indexOf(LGA) + LGA.length, shell.indexOf('<!-- ===== FOOTER ===== -->'));
if (!t.includes('id="lgGate"') && t.includes(LGA)) { t = t.replace(LGA, LGA + LG_BLOCK); did.push('+R6'); } else did.push('-R6');

// R7 — dm_auth INSERT (dd=1 satırından önce)
const DM_ANCHOR = "if(location.search.indexOf('dd=1')>-1){document.querySelector('.nav-item').classList.add('open');";
const DM_BLOCK = shell.slice(shell.indexOf('// ===== Login-state simülasyonu'), shell.indexOf('// SS paramları'));
if (!t.includes('dm_auth') && t.includes(DM_ANCHOR)) { t = t.replace(DM_ANCHOR, DM_BLOCK + DM_ANCHOR); did.push('+R7'); } else did.push('-R7');

fs.writeFileSync('anasayfa-portal-v3a.html', t, 'utf8');
const linesAfter = t.split('\n').length, catAfter = t.split('cat-track').length - 1;
console.log('UYGULANAN:', did.join(' '));
console.log('SATIR: ' + linesBefore + ' → ' + linesAfter + ' (net ' + (linesAfter - linesBefore >= 0 ? '+' : '') + (linesAfter - linesBefore) + ')');
console.log('cat-track: ' + catBefore + ' → ' + catAfter + (catAfter === catBefore ? ' ✅ KORUNDU' : ' ❌ DEĞİŞTİ'));
// hero/searchcard CSS survival
const surv = { hero: t.includes('/* ============ HERO ============ */'), searchcard: t.includes('.searchcard'), heroStats: t.includes('hero-stats'), overflowx: t.includes('overflow-x:auto') };
console.log('CSS survival:', JSON.stringify(surv));
// login-state bütünlük
const need = { css: t.includes('LOGIN-STATE (cila-2 faz 2) — header logged-in chrome'), hdr: t.includes('class="acct-item head-add"'), drw: t.includes('class="drawer-acct"'), bn: t.includes('id="bnAccount"'), lg: t.includes('id="lgGate"'), lgdef: t.includes('window.__lgGate=open'), dm: t.includes('dm_auth'), mob: t.includes('body.is-auth .head-add,body.is-auth .head-bell,body.is-auth .acct-wrap{display:none}') };
console.log('login-state:', JSON.stringify(need));
let jsOK = true, n = 0; const re = /<script>([\s\S]*?)<\/script>/g; let m;
while ((m = re.exec(t))) { n++; try { new vm.Script(m[1]); } catch (e) { jsOK = false; console.log('JS HATA:', e.message.split('\n')[0]); } }
console.log('JS syntax:', jsOK ? 'OK' : 'HATA', '(' + n + ' blok)');
