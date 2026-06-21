import fs from 'fs';

const log = [];
function patch(file, fn) {
  let c = fs.readFileSync(file, 'utf8');
  const before = c;
  c = fn(c);
  if (c !== before) { fs.writeFileSync(file, c, 'utf8'); log.push('FIX  ' + file); }
  else log.push('--   ' + file);
}

// 1) .gitignore — v5/ → v6/ (ss-t4, ss-scratch, outputs)
patch('.gitignore', c => c.replace(/v5\//g, 'v6/'));

// 2) tasks/*.mjs — tüm path formları (kendi patcher hariç)
for (const f of fs.readdirSync('tasks').filter(f => f.endsWith('.mjs') && f !== 'v5v6-patch.mjs')) {
  patch('tasks/' + f, c => c
    .replace(/\/v5\//g, '/v6/')   // URL: 8765/v5/  ve  `.../v5/${x}`
    .replace(/'v5\//g, "'v6/")    // DIR = 'v5/'
    .replace(/'v5'/g, "'v6'"));   // resolve('v5') / readdirSync('v5') / join(root,'v5')
}

// 3) tasks/*.md (handoff dahil) — sadece slash'lı yol v5/ → v6/ (bare prose 'v5' korunur)
for (const f of fs.readdirSync('tasks').filter(f => f.endsWith('.md'))) {
  patch('tasks/' + f, c => c.replace(/v5\//g, 'v6/'));
}

console.log(log.filter(l => l.startsWith('FIX')).join('\n'));
console.log('\nFIX: ' + log.filter(l => l.startsWith('FIX')).length + ' dosya · değişmeyen: ' + log.filter(l => l.startsWith('--')).length);
