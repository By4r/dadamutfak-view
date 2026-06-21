import { chromium } from 'playwright';
const B='http://localhost:8765/v6/';
const PAGES=[
  ['panel','antrenor-panel-v1.html'],
  ['uyeler','antrenor-uyeler-v1.html'],
  ['programlar','antrenor-programlar-v1.html'],
  ['builder','antrenor-program-builder-v1.html'],
  ['challenge','antrenor-challenge-v1.html'],
  ['egzersiz','antrenor-egzersizler-v1.html'],
  ['mesajlar','antrenor-mesajlar-v1.html'],
  ['profil','antrenor-profil-ayar-v1.html'],
];
const NAVS=['panel','uyeler','programlar','egzersiz','challenge','mesajlar','profil'];
// 2. dalga TAM: tüm antrenör nav linkleri aktif — bilinçli "yakında" KALMADI.
const EXPECTED_SOON=[];
const br=await chromium.launch();
const rows=[];
for(const [key,file] of PAGES){
  const p=await br.newPage({viewport:{width:1440,height:900}});
  await p.goto(B+file,{waitUntil:'networkidle'});await p.waitForTimeout(200);
  const nav=await p.evaluate(()=>{
    const out={};
    document.querySelectorAll('.pnl-nav [data-nav]').forEach(el=>{
      const k=el.getAttribute('data-nav');
      const soon=/yakında/i.test(el.textContent)||el.classList.contains('is-soon')||!!el.querySelector('.pl-soon');
      out[k]={tag:el.tagName,active:el.classList.contains('is-active'),soon:soon,href:el.getAttribute('href')||''};
    });
    return out;
  });
  rows.push([key,nav]);
  await p.close();
}
await br.close();
function cell(n){ if(!n) return 'YOK'; if(n.soon) return 'PASİF-YAKINDA'; if(n.active) return 'KENDİ-AKTİF'; return (n.tag==='A'&&n.href)?'aktif':'?'; }
console.log('=== ANTRENÖR NAV RENDER MATRİSİ (1440) ===');
console.log(['SAYFA'.padEnd(11),...NAVS.map(c=>c.padEnd(14))].join('| '));
for(const [key,nav] of rows){
  console.log([key.padEnd(11),...NAVS.map(c=>cell(nav[c]).padEnd(14))].join('| '));
}
// pasif tespiti — beklenen (egzersiz) vs beklenmeyen ayrımı
const expectedSoon=[], unexpected=[];
for(const [key,nav] of rows) for(const c of NAVS) if(nav[c]&&nav[c].soon){
  (EXPECTED_SOON.includes(c)?expectedSoon:unexpected).push(key+'/'+c);
}
console.log('\nBEKLENEN pasif:',expectedSoon.length?expectedSoon.join(', '):'YOK (2. dalga TAM) ✓');
console.log('BEKLENMEYEN pasif-yakında:',unexpected.length?unexpected.join(', '):'YOK ✓');
// challenge + egzersiz her sayfada aktif link mi?
for(const k of ['challenge','egzersiz']){
  const miss=[];
  for(const [key,nav] of rows){ const c=nav[k]; if(!c) miss.push(key+':YOK'); else if(c.soon) miss.push(key+':PASİF'); }
  console.log(k+' tüm sayfalarda aktif link:',miss.length?('EKSİK → '+miss.join(', ')):'EVET ✓');
}
