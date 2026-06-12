const fs = require('fs'), vm = require('vm');
const all = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const SHOP = new Set(['dada-shop-v1.html','odeme-v1.html','sepet-v1.html','siparislerim-v1.html','urun-liste-v1.html','urun-detay-v1.html']);
const HARD = new Set(['_shell.html','tarif-detay-v1-headA.html']);

let processed = 0, problems = [], leakProblems = [], jsFails = [], negGrep = [], shopList = [];
for (const f of all) {
  const t = fs.readFileSync(f, 'utf8');
  const isShop = SHOP.has(f) || t.includes('class="lm-modal"');
  const hasBtnLogin = t.includes('class="btn-login"');
  const hasAcct = t.includes('class="acct-item head-add"');

  // negatif grep: btn-login VAR ama acct-wrap(head-add) YOK
  if (hasBtnLogin && !hasAcct) negGrep.push(f + (isShop ? ' [shop-beklenen]' : HARD.has(f) ? ' [hard-exclude-beklenen]' : ' [⚠️ KAÇAK!]'));

  // shop sızıntı: shop sayfasında is-auth header OLMAMALI
  if (isShop) { shopList.push(f); if (t.includes('class="acct-item head-add"') || t.includes('body.classList.add(\'is-auth\')') || t.includes('id="lgGate"')) leakProblems.push(f); continue; }
  if (HARD.has(f) || !hasBtnLogin) continue;

  // işlenen sayfa: tüm parçalar var mı
  processed++;
  const need = {
    css: t.includes('LOGIN-STATE (cila-2 faz 2) — header logged-in chrome'),
    mob: t.includes('body.is-auth .head-add,body.is-auth .head-bell,body.is-auth .acct-wrap{display:none}'),
    hdr: t.includes('class="acct-item head-add"'),
    drw: t.includes('class="drawer-acct"'),
    bn: t.includes('id="bnAccount"'),
    lgmk: t.includes('id="lgGate"'),
    lgdef: t.includes('window.__lgGate=open'),
    dm: t.includes('dm_auth'),
    btnL: t.includes('class="btn-login"'),
  };
  const miss = Object.entries(need).filter(([k, v]) => !v).map(([k]) => k);
  if (miss.length) problems.push(f + ' eksik: ' + miss.join(','));

  // JS syntax
  let jsOK = true; const re = /<script>([\s\S]*?)<\/script>/g; let m;
  while ((m = re.exec(t))) { try { new vm.Script(m[1]); } catch (e) { jsOK = false; } }
  if (!jsOK) jsFails.push(f);
}

console.log('İŞLENEN SAYFA: ' + processed);
console.log('\n[1] NEGATİF GREP (btn-login VAR, acct-wrap YOK):');
negGrep.forEach(x => console.log('   ' + x));
const kacak = negGrep.filter(x => x.includes('KAÇAK'));
console.log('   → KAÇAK sayısı: ' + kacak.length + (kacak.length ? ' ❌' : ' ✅'));
console.log('\n[2] SHOP SIZINTI GREP (' + shopList.length + ' shop sayfası, is-auth SIZMAMALI):');
console.log('   sızıntı: ' + (leakProblems.length ? leakProblems.join(', ') + ' ❌' : '0 ✅'));
console.log('\n[3] İŞLENEN BÜTÜNLÜK (eksik parça):');
console.log('   ' + (problems.length ? problems.join('\n   ') + ' ❌' : 'eksik YOK ✅'));
console.log('\n[4] JS SYNTAX (işlenen sayfalar):');
console.log('   ' + (jsFails.length ? jsFails.join(', ') + ' ❌' : 'tümü OK ✅'));
