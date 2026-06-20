# SA Modül Dalgası — SHELL SÖZLEŞMESİ (bağlayıcı)

> Bu dosya Tur-1 modül dalgasının **tek bağlayıcı shell kaynağıdır.** Her teammate her ekranda
> bu sözleşmeye BİREBİR uyar. Kanonik kaynak: `v5/sa-shell.html` (FREEZE, commit 5e7ab0d).
> Amaç: 5 bölüm dosyasında shell bloğu **byte-identical** kalsın (drift yok).

## 0. Her ekranın iskeleti (sıra)
```
<!DOCTYPE html><html lang="tr"><head>
  <meta charset> <meta viewport> <title>…</title>
  <link favicon> <link FontAwesome 6.5.2>   ← sa-shell.html ile BİREBİR (integrity dahil)
  <style> … </style>                          ← §1
</head>
<body data-brand="mutfak" data-sec="BÖLÜM">   ← §2 (genel DEĞİL; admin|saglik|store|dadafit|isletme)
  <div class="sa-app">
    <aside class="sa-rail">…</aside>           ← §3 RAIL — BİREBİR
    <nav class="sa-menu">…</nav>               ← §4 MENÜ — bölüme özel (gerçek linkler)
    <div class="pnl-overlay" id="pnlOverlay"></div>
    <header class="pnl-top">…</header>         ← §5 TOPBAR — BİREBİR
    <main class="pnl-main">…</main>            ← §6 İÇERİK — ekrana özel
  </div>
  <script> … </script>                         ← §7 JS — BİREBİR
</body></html>
```

## 1. `<style>` — VERBATIM kopya
- `v5/sa-shell.html` satır **13–315** arası (`<style>`'dan `</style>`'a, dahil) **AYNEN** kopyalanır. Tek karakter değişmez.
- Ardından, `</style>`'dan HEMEN ÖNCE şu işaret + ekrana özel CSS eklenir:
```
/* ===================================================================
   SAYFA CSS — bu işaretin ALTI ekrana özel (tablo/form/detay/empty).
   Üstteki shell CSS'i (13–315) DEĞİŞTİRİLMEZ. =================== */
```
- Tablo/form/detay için `--acc` token + mevcut palet kullan; YENİ renk yok. `.pstat` semantik (ok/wait/warm/off) hazır; tekrar tanımlama.
- Drift kontrolü (lead): 13–315 bloğu tüm dosyalarda diff-temiz olmalı.

## 2. `<body>`
`<body data-brand="mutfak" data-sec="X">` — X = dosyanın bölümü: `admin|saglik|store|dadafit|isletme`. Bu, `--acc` aksanını ve rail aktif ikonunu sürer. (Liste/form/detay hepsi aynı bölümün `data-sec`'ini taşır.)

## 3. RAIL — BİREBİR (her dosyada aynı; hrefler bölüm dosyalarına işaret eder)
```html
<aside class="sa-rail" id="saRail">
  <a class="sa-rail-logo" href="anasayfa-portal-v3a.html" title="DadaMutfak"><img src="assets/img/logo-official-white.png" alt="DadaMutfak" /></a>
  <a class="sa-rail-ico" data-sec="genel" href="sa-shell.html?sec=genel" title="Genel Bakış"><i class="fa-solid fa-gauge-high"></i></a>
  <span class="sa-rail-div"></span>
  <a class="sa-rail-ico" data-sec="admin"   href="sa-admin.html"   title="Admin"><i class="fa-solid fa-shield-halved"></i></a>
  <a class="sa-rail-ico" data-sec="saglik"  href="sa-saglik.html"  title="Sağlık &amp; Diyet"><i class="fa-solid fa-heart-pulse"></i></a>
  <a class="sa-rail-ico" data-sec="store"   href="sa-store.html"   title="DadaStore"><i class="fa-solid fa-bag-shopping"></i></a>
  <a class="sa-rail-ico" data-sec="dadafit" href="sa-dadafit.html" title="DadaFit"><i class="fa-solid fa-dumbbell"></i></a>
  <a class="sa-rail-ico" data-sec="isletme" href="sa-isletme.html" title="İşletmeler"><i class="fa-solid fa-store"></i></a>
  <a class="sa-rail-ico is-locked" data-sec="akademi" href="#" title="DadaAkademi — Yakında"><i class="fa-solid fa-graduation-cap"></i><i class="fa-solid fa-lock sr-lock"></i></a>
  <div class="sa-rail-foot"><a class="sa-rail-ico" href="anasayfa-portal-v3a.html" title="Siteye Dön"><i class="fa-solid fa-arrow-left"></i></a></div>
</aside>
```
(Rail'de `is-active` HARDCODE EDİLMEZ — §7 JS body[data-sec]'e göre işaretler.)

## 4. MENÜ — bölüme özel (gerçek modül linkleri)
İskelet (her dosyada aynı kabuk; içerik bölüme göre):
```html
<nav class="sa-menu" id="saMenu">
  <div class="sa-menu-head"><span class="smh-eyebrow">EYEBROW</span><span class="smh-title">TITLE</span></div>
  <div class="sa-mnav">
    … sa-mlink linkleri (aşağıdaki haritadan) …
  </div>
  <div class="sa-menu-foot">
    <a class="sa-mlink" href="anasayfa-portal-v3a.html"><i class="fa-solid fa-arrow-left"></i> Siteye Dön</a>
    <a class="sa-mlink" href="sa-giris-v1.html"><i class="fa-solid fa-right-from-bracket"></i> Çıkış / Rol Değiştir</a>
  </div>
</nav>
```
Link kuralı:
- Aktif ekranın linki `class="sa-mlink is-active"`.
- AMİRAL modül linki → gerçek dosya (`href="sa-…html"`).
- Diğer modüller → `href="#"` + `class="sa-mlink is-locked"` + sonuna `<span class="ml-soon">Yakında</span>`. (Tıklanınca gitmez.)
- Sayaçlı modüllerde `<span class="pl-cnt">N</span>`.
- `is-locked` linkler için ekrana küçük JS GEREKMEZ (href="#"); ama emniyet için §7'deki menü-guard zaten preventDefault yapar.

### Bölüm menü haritaları (EYEBROW · TITLE · linkler)
**Admin** — `Yönetim` · `Admin`:
Genel Bakış→`sa-admin.html` · **Kullanıcılar & Yetki→`sa-admin-kullanicilar.html` (AMİRAL)** · Üyeler# · Fiyatlandırma & Abonelik# · Slider / Banner# · Sayfalar & SEO# · Menü / Navigasyon# · Ayarlar# · Raporlar# · Rozetler#
(ikonlar: fa-gauge-high, fa-users-gear, fa-id-card, fa-tags, fa-images, fa-file-lines, fa-bars-staggered, fa-sliders, fa-chart-line, fa-award)

**Sağlık** — `Sağlık` · `Sağlık & Diyet`:
Genel Bakış→`sa-saglik.html` · **Diyetisyenler→`sa-saglik-diyetisyenler.html` (AMİRAL)** [cnt 4] · Randevular# · Reçeteler# · Testler# · Hesaplayıcılar#
(fa-gauge-high, fa-user-doctor, fa-calendar-check, fa-clipboard-list, fa-vial, fa-calculator)

**Store** — `E-Ticaret` · `DadaStore`:
Genel Bakış→`sa-store.html` · **Ürünler→`sa-store-urunler.html` (AMİRAL)** · Kategoriler# · Siparişler# [cnt 7] · Müşteriler# · Promosyonlar# · Kargo & Ödeme# · Raporlar#
(fa-gauge-high, fa-box, fa-layer-group, fa-receipt, fa-user-group, fa-percent, fa-truck, fa-chart-line)

**DadaFit** — `Fitness` · `DadaFit`:
Genel Bakış→`sa-dadafit.html` · Antrenörler# [cnt 3] · Egzersizler# · Programlar# · **Challenge'lar→`sa-dadafit-challenge.html` (AMİRAL)**
(fa-gauge-high, fa-user-ninja, fa-dumbbell, fa-list-check, fa-trophy)

**İşletme** — `İşletme` · `İşletmeler`:
Genel Bakış→`sa-isletme.html` · **İşletmeler→`sa-isletme-isletmeler.html` (AMİRAL)** [cnt 5] · Rezervasyonlar# · Menüler# · Onaylar# · Reklam Paketleri#
(fa-gauge-high, fa-store, fa-calendar-day, fa-utensils, fa-circle-check, fa-rectangle-ad)

## 5. TOPBAR — BİREBİR
```html
<header class="pnl-top">
  <button class="pnl-burger" id="pnlBurger" aria-label="Menü"><i class="fa-solid fa-bars"></i></button>
  <div class="pnl-search">
    <i class="fa-solid fa-magnifying-glass"></i>
    <input type="text" placeholder="Ara — kullanıcı, içerik, sipariş…" />
  </div>
  <div class="pnl-top-tools">
    <button class="pnl-bell" aria-label="Bildirimler"><i class="fa-regular fa-bell"></i><span class="pb-dot"></span></button>
    <div class="pnl-me">
      <div class="pm-ava" style="background-image:url('https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=240&q=80&auto=format&fit=crop&exp=7&gam=6&sat=-9&high=8&vib=5')"></div>
      <div class="pm-id"><div class="pm-name" id="pmName">Süper Admin</div><div class="pm-role" id="pmRole">Tüm yetki</div></div>
      <i class="fa-solid fa-chevron-down"></i>
    </div>
  </div>
</header>
```
(Arama placeholder'ı bölüme göre uyarlamak SERBEST ama yapısal markup değişmez. pmName/pmRole JS tarafından role'e göre doldurulur.)

## 6. İÇERİK `<main class="pnl-main">` — ekrana özel
- **Dashboard:** `.pnl-page-head` (h1 + ph-sub + ph-actions) → `.kpi-grid` (4 KPI, ekrana göre `.warm`/`.sun` varyant) → 1–2 `.pnl-card` (son aktivite/son kayıt; `.ptable` veya `.act-list`).
- **Liste:** `.pnl-page-head` (+ "Yeni …" btn `.btn-acc.btn-sm`) → filtre çubuğu (`.chips`/arama) → `.pnl-card.flush` içinde `.ptable` (th/td) → satır aksiyonları (`.pstat` durum + ikon-buton/aksiyon link). Boş durum `.pnl-empty`.
- **Form:** `.pnl-page-head` (geri linki) → `.pnl-card` içinde alanlar (label + input/select/textarea) bölümlenmiş; sağda özet/yan kart opsiyonel. Kaydet/İptal aksiyonları altta.
- **Detay:** `.pnl-page-head` (başlık + durum `.pstat` + aksiyonlar) → 2-kolon (`minmax(0,1.6fr) minmax(0,1fr)`): sol içerik kartları, sağ meta/aksiyon. Denetim ekranlarında onay/askıya butonları sağ kartta.
- Kare/oranlı görsel: **`img` tag DEĞİL** → `div + background-image: cover + center`.
- Form input stilleri shell'de YOK → SAYFA CSS'te tanımla (label 12.5px muted, input 40px h, `--line` border, focus `--acc`). Tutarlı olsun (lead liste sonrası form desenini de kıyaslar).

## 6.5 ORTAK FORM/DETAY ALAN STİLLERİ (FAZ-2 — drift önleme)
Form alanı olan tüm ekranlar (admin/store/dadafit form + detay) SAYFA CSS'e ŞU bloğu **BİREBİR** ekler (tek kaynak):
```css
/* ORTAK FORM ALANLARI — tüm sa-* form/detay ekranlarında AYNEN */
.form-grid{display:grid;gap:18px}
.frow{display:flex;flex-direction:column;gap:7px}
.frow label{font-size:12.5px;font-weight:700;color:var(--slate-2)}
.frow .fhint{font-size:11.5px;color:var(--muted);font-weight:500}
.finput,.fselect,.ftext{width:100%;font-family:inherit;font-size:13.5px;font-weight:500;color:var(--ink);background:var(--paper);border:1px solid var(--line);border-radius:var(--radius-md);padding:0 14px;height:44px;outline:none;transition:.2s var(--ease)}
.ftext{height:auto;padding:12px 14px;line-height:1.5;resize:vertical;min-height:96px}
.finput:focus,.fselect:focus,.ftext:focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(var(--acc-rgb),.12)}
.frow.two{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-sec{padding:18px 22px;border-bottom:1px solid var(--line)}
.form-sec:last-child{border-bottom:none}
.form-sec-tt{font-size:13px;font-weight:700;color:var(--slate);margin-bottom:14px;display:flex;align-items:center;gap:8px}
.form-sec-tt i{color:var(--acc)}
.form-actions{display:flex;gap:10px;justify-content:flex-end;padding:16px 22px}
```
Kullanım: form = `.pnl-card` içinde `.form-sec` blokları (her biri `.form-sec-tt` + `.form-grid`), altta `.form-actions` (`.btn.btn-acc` Kaydet + `.btn.btn-ghost` İptal). Detayda alan-gösterimi için aynı tipografi.
**Denetim detay aksiyonları** (saglik/isletme detay): liste ekranındaki Onayla(yeşil)/Askıya Al(kırmızı)/Yeniden Onayla buton stilini AYNEN taşı (sağ meta kartında).

## 7. JS — BİREBİR (sa-shell config-render JS'i DEĞİL; modül-shell JS'i)
> Modül ekranları config-driven DEĞİL: menü/main statik. JS yalnız role görünürlük + rail aktif + drawer yapar.
```html
<script>
/* SA MODÜL-SHELL JS — TÜM bölüm/ekran dosyalarında BİREBİR. role görünürlük + rail aktif + drawer + menü-guard. */
(function(){
  var ROLES={
    'super':{name:'Süper Admin',role:'Tüm yetki',secs:['genel','admin','saglik','store','dadafit','isletme','akademi']},
    'saglik-admin':{name:'Sağlık Yöneticisi',role:'Sağlık & Diyet',secs:['saglik']},
    'store-admin':{name:'Store Yöneticisi',role:'E-Ticaret',secs:['store']},
    'dadafit-admin':{name:'DadaFit Yöneticisi',role:'Fitness',secs:['dadafit']},
    'isletme-admin':{name:'İşletme Yöneticisi',role:'İşletmeler',secs:['isletme']}
  };
  var q=new URLSearchParams(location.search);
  var role=q.get('role');
  if(role){try{localStorage.setItem('dm_sa_role',role);}catch(e){}}
  else{try{role=localStorage.getItem('dm_sa_role');}catch(e){}}
  if(!ROLES[role])role='super';
  var R=ROLES[role];
  var nm=document.getElementById('pmName'),rl=document.getElementById('pmRole');
  if(nm)nm.textContent=R.name; if(rl)rl.textContent=R.role;
  var cur=document.body.dataset.sec;
  document.querySelectorAll('.sa-rail-ico[data-sec]').forEach(function(el){
    el.hidden=R.secs.indexOf(el.getAttribute('data-sec'))===-1;
    el.classList.toggle('is-active',el.getAttribute('data-sec')===cur);
  });
  document.querySelectorAll('.sa-rail-ico.is-locked').forEach(function(el){
    el.addEventListener('click',function(e){e.preventDefault();});
  });
  var menu=document.getElementById('saMenu');
  if(menu)menu.addEventListener('click',function(e){
    var a=e.target.closest('.sa-mlink'); if(!a)return;
    if(a.classList.contains('is-locked')||a.getAttribute('href')==='#'){e.preventDefault();}
  });
})();
(function(){
  var burger=document.getElementById('pnlBurger'),overlay=document.getElementById('pnlOverlay');
  if(burger)burger.addEventListener('click',function(){document.body.classList.toggle('nav-open')});
  if(overlay)overlay.addEventListener('click',function(){document.body.classList.remove('nav-open')});
  var q=new URLSearchParams(location.search);
  if(q.get('nav')==='1')document.body.classList.add('nav-open');
})();
</script>
```

## 8. Dosya isim deseni
`sa-BÖLÜM.html` (dashboard) · `sa-BÖLÜM-MODÜL.html` (liste) · `sa-BÖLÜM-MODÜL-form.html` (form) · `sa-BÖLÜM-MODÜL-detay.html` (detay).
Denetim deseni (Sağlık/İşletme): form YOK → liste + detay (detayda onay/askıya/onay aksiyonları).

## 9. Yasaklar
- `v5/sa-shell.html`'e dokunma (lead dalga sonunda yalnız rail href güncellemesi yapar).
- Başka teammate'in dosyasına yazma (bölüm prefix = domain).
- `panel-shell/dyt-*/mekan-*/giris-v1`'e dokunma.
- Yeni renk yok. Kare görsel = div+bg-image (img değil). Commit yok.
- "Panelini Aç" aksiyonu (Sağlık/İşletme detay) BU TURDA YOK — yerini ayır, bağlama.
