#!/usr/bin/env node
/* ============================================================================
   C1 — dm_user MIGRATION SWEEP (auth/rol tek-token)
   Eski iki IIFE (dm_auth + dm_business) → tek dm_user IIFE.
   Yöntem: EXACT-STRING gövde değişimi (yorumdan bağımsız, regex/paren-walk DEĞİL
   → sıfır yanlış-eşleşme). Idempotent (dm_user varsa atla). Full-file write YOK
   ödevi: yalnız bilinen blok stringleri değişir.

   Kapsam: in-scope public/operatör/panel sayfaları (108). HARİÇ: sa-* (admin,
   ayrı namespace), _-önekli (shell/sweep/probe), .ss-scratch, ref-* (referans),
   dizin.html. _shell.html ELLE migrate edildi (kaynak).

   Sayfa-başı mantık:
     - auth+biz sayfa (87): authVariant → UNIFIED ; bizBody → INERT
     - yalnız-biz sayfa (21): bizBody → UNIFIED
     - hiçbir blok yok: atla

   Çalıştırma:
     node _sweep-dm-user.js            # DRY-RUN (yazmaz, rapor)
     node _sweep-dm-user.js --apply    # uygular (Beyar onayından SONRA)
   ============================================================================ */
const fs = require('fs');
const path = require('path');

const DIR = __dirname;
// blok stringleri: scratchpad'deki paylaşılan kaynak (UNIFIED/INERT/varyantlar/fixtures)
const BLOCKS_PATH = process.env.C1_BLOCKS ||
  '/private/tmp/claude-501/-Users-gaviaworks-Developer-Projects-dadamutfak/d8a7e928-bead-4fc6-8764-42ee7366ca78/scratchpad/c1-blocks.js';
const { UNIFIED, INERT, AUTH_VARIANTS, BIZ_BODY } = require(BLOCKS_PATH);

const APPLY = process.argv.includes('--apply');

const EXCLUDE_PREFIX = ['_', '.', 'sa-', 'ref-'];
const EXCLUDE_EXACT = new Set(['dizin.html', 'sezon-v1.html']);  // sezon = ayrı iş (watermark, onaysız) — DOKUNMA
function inScope(f){
  if(!f.endsWith('.html')) return false;
  if(EXCLUDE_EXACT.has(f)) return false;
  return !EXCLUDE_PREFIX.some(p => f.startsWith(p));
}

const UNIFIED_MARK = 'KEY=\'dm_user\'';   // guard imzası (UNIFIED içinde benzersiz)

const report = { applied: [], skippedIdempotent: [], skippedNoBlock: [], errors: [], excludedTouchingFlags: [] };

const all = fs.readdirSync(DIR).filter(f => f.endsWith('.html'));
for (const f of all) {
  const fp = path.join(DIR, f);
  let t;
  try { t = fs.readFileSync(fp, 'utf8'); } catch(e){ continue; }
  const touchesFlags = t.includes('dm_auth') || t.includes('dm_business');

  if (!inScope(f)) {
    if (touchesFlags) report.excludedTouchingFlags.push(f);   // kapsam-dışı ama flag içeren (sa-/ref-/_): görünür kalsın
    continue;
  }
  if (!touchesFlags) continue;                                // ilgili blok yok

  // idempotent guard
  if (t.includes(UNIFIED_MARK)) { report.skippedIdempotent.push(f); continue; }

  const authVar = AUTH_VARIANTS.find(v => t.includes(v)) || null;
  const hasBiz = t.includes(BIZ_BODY);

  let nt = t, action = [];
  if (authVar) {
    nt = nt.split(authVar).join(UNIFIED);
    action.push('auth→UNIFIED');
    if (hasBiz) { nt = nt.split(BIZ_BODY).join(INERT); action.push('biz→INERT'); }
  } else if (hasBiz) {
    nt = nt.split(BIZ_BODY).join(UNIFIED);
    action.push('biz→UNIFIED');
  } else {
    // flag içeriyor ama bilinen blok yok → MANUEL inceleme (sapma)
    report.errors.push({ f, reason: 'flag-var-ama-bilinen-blok-yok' });
    continue;
  }

  // post-doğrulama (yazmadan önce kanıt)
  const uCount = (nt.match(/KEY='dm_user'/g) || []).length;
  // eski IIFE artık kalmamalı (auth varyantları + biz gövdesi)
  const leftoverAuth = AUTH_VARIANTS.some(v => nt.includes(v));
  const leftoverBiz = nt.includes(BIZ_BODY);
  const probs = [];
  if (uCount !== 1) probs.push(`UNIFIED sayısı=${uCount} (≠1)`);
  if (leftoverAuth) probs.push('eski auth IIFE kalıntısı');
  if (leftoverBiz) probs.push('eski biz IIFE kalıntısı');
  if (probs.length) { report.errors.push({ f, reason: probs.join('; ') }); continue; }

  report.applied.push({ f, action: action.join('+'), authVar: authVar ? authVar.length : null, hasBiz, dBytes: nt.length - t.length });
  if (APPLY) fs.writeFileSync(fp, nt);
}

// ---- RAPOR ----
const mode = APPLY ? 'APPLY (yazıldı)' : 'DRY-RUN (yazılmadı)';
console.log(`\n========== C1 dm_user SWEEP — ${mode} ==========`);
console.log(`Uygulanacak/uygulanan sayfa : ${report.applied.length}`);
const byAction = {};
report.applied.forEach(a => byAction[a.action] = (byAction[a.action]||0)+1);
console.log(`  aksiyon dağılımı:`, JSON.stringify(byAction));
console.log(`Atlandı (idempotent/dm_user var): ${report.skippedIdempotent.length}`);
console.log(`Kapsam-dışı ama flag içeren (sa-/ref-/_): ${report.excludedTouchingFlags.length}`, report.excludedTouchingFlags.length?`→ ${report.excludedTouchingFlags.join(', ')}`:'');
console.log(`HATA/MANUEL inceleme: ${report.errors.length}`);
report.errors.forEach(e => console.log(`  ❌ ${e.f}: ${e.reason}`));

// kapsam çapraz-kontrol
const authPages = report.applied.filter(a => a.action.startsWith('auth'));
const bizOnlyPages = report.applied.filter(a => a.action === 'biz→UNIFIED');
console.log(`\nÇapraz-kontrol: auth+biz=${authPages.length} · yalnız-biz=${bizOnlyPages.length} · toplam=${report.applied.length}`);
console.log(`Beklenen (keşif): auth+biz=87 · yalnız-biz=21 · toplam=108`);
const okExpected = authPages.length===87 && bizOnlyPages.length===21 && report.applied.length===108 && report.errors.length===0;
console.log(okExpected ? '✅ Beklenenle birebir, hata yok.' : '⚠️ Beklenenden sapma VAR — incele.');

// JSON dök (denetim için)
fs.writeFileSync(path.join(require('os').tmpdir?require('os').tmpdir():'.','c1-sweep-report.json'), JSON.stringify(report,null,2));
process.exit(report.errors.length ? 1 : 0);
