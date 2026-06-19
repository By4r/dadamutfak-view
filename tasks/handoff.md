# DadaMutfak — Handoff

## 19 Haziran revize dalgası 1 (DURUM: ✅ KAPANDI — paralel agent team, 9 madde)

Paralel agent team (lead + 3 teammate, Sonnet 4.6; domain-ayrık dosya sahipliği) ile 9 madde tamamlandı,
lead kod denetiminden geçti, commit'lendi. Header/global shell'e DOKUNULMADI. Yeni brand-rengi yok
(tek "ham": mevcut `#e8a13c` rare gold reuse + nötr `#fff`). +461/−14, 7 dosya.

### Tamamlanan maddeler
- **M9** `dada-shop-v1` — promo-tile `::after` overlay kenar taşması (`border-radius:inherit`, salt CSS).
- **M14** `dada-shop-v1` — işlevsiz "Mağaza" nav-item kaldırıldı (drawer/bottom-nav korundu).
- **M10** `urun-detay-v1` — sağ `.pd-desc` duplikasyonu kaldırıldı (tab içeriği korundu).
- **M11** `urun-detay-v1` — Ürün Kodu+Marka pane-spec'e taşındı, sağ `.pd-meta` kaldırıldı (veri kaybı yok).
- **M8** `hakkimizda-v1` — "Sofrada yerin" chef-cta href → `sef-ol-v1.html` (akış doğrulandı).
- **M7** `sepet-v1` — `.sum-pays` satırına Troy ödeme yöntemi (inline SVG, `currentColor`, palet-içi).
- **M1** `diyetisyen-profil-v1` — sayfa altına "Rozet Koleksiyonu" galerisi (kategorili, badge-card dili).
- **M2** `haftalik-menu-v1` — "Sponsorlu Tarif" bandı (board↔alışveriş listesi arası).
- **M3** `challenge-v1` — 2. tab "Su İçme Takibi" (tab switcher + su UI, JS temiz, fit yeşili palet-içi).

### Madde 4 (DURUM: ✅ KAPANDI — tek-author, 86 sayfa senkron)
Profil avatar dropdown'undan (`.acct-menu`) redundant "Bildirimler" satırı kaldırıldı — 86 sayfada
byte-identik, her biri saf tek-satır silme (0 ekleme). **Bilinçli KORUNAN** 2 erişim:
- Header zili (`head-bell`) — birincil bildirim erişimi.
- Mobil drawer linki (`.da-links` "Bildirimler") — `@media ≤640px`'da zil + avatar dropdown gizlenir,
  drawer mobilin TEK bildirim erişimi olduğu için kaldırılmadı.
Başka shell değişikliği yok; dropdown toggle JS'ine dokunulmadı (silinen `<a>`'nın JS bağı yoktu).

### Faz 3 (DURUM: 🟡 KARARLAR ALINDI, PLAN HAZIR — implement başlamadı)
19 Haziran revize: **10/15 madde commit'li** (1,2,3,4,7,8,9,10,11,14). Kalan **5,6,12,13,15 = Faz 3**,
plana bağlandı.
- **Envanter + teşhis:** `tasks/faz3-envanter.md` (3 paralel Explore taraması; kök teşhis = kimlik+hak tek
  hesap omurgasında birleşmiyor).
- **Kararlar + implement planı:** `tasks/faz3-plan.md`. Özet kararlar: tek DadaMutfak hesabı (Store modalı
  bağlanır), işletme = rol (claim YOK), context switch hesabım "İşletmem" tab + panel topbar account chip
  (dropdown'a 86-sayfa ekleme yapılmadı), fiyat tek-kaynak (**rakam Yasin Bey onayı bekliyor**), Pro vs
  creator membership ayrı kalır, arama bu tur sadece brand-context+scope (index genişletme ayrı iş).
- **Adım 0 — paylaşılan omurga (DURUM: ✅ TAMAM + FREEZE, tek-author).** `body[data-brand="mutfak|store|
  akademi|fit"]` (109 sayfa, değer = görünen shell markası) + `body.has-business` rol state'i (`is-auth`
  kardeşi; `?business=1/0` toggle + `localStorage.dm_business`, `</body>` öncesi standalone IIFE). Sweep:
  `mockups/_sweep-faz3-brand.js` — **idempotent + yeniden kullanılabilir** (yeni sayfa eklenince brand
  primitifi de ekler). Hariç: dev/ref dosyaları (`_overflow_probe`, `dizin`, `ref-*`). Görsel değişiklik YOK
  (görünmez attribute + henüz CSS'i olmayan class). Bu commit = **freeze noktası**.
- **SIRADA: Adım 1 — paralel agent team (domain ayrık), Adım 0 omurgası üstüne.** 4 parça:
  **hesap** (`hesabım-v1` → Adreslerim/Kartlarım/İşletmem/Aboneliğim tab + checkout adres bağlama) ·
  **admin** (admin panel İşletmeler + Abonelikler ekranları, ölü sidebar düğümleri) ·
  **store+arama** (Store login modalını tek-hesaba bağla + `arama-v1` brand-scope + header arama brand
  taşıma, `data-brand` okur) · **abonelik** (`pro-v1`/`pro-odeme` fiyat tek-kaynak + Pro/membership dil
  ayrışması; **rakam Yasin Bey onayı bekliyor**).
- **EN SON — Adım 2: GLOBAL SHELL SENKRON TARAMASI.** Tüm revizeler bittikten SONRA. Shell parçaları (header,
  üst bant, nav, account dropdown, footer) her sayfada ayrı inline kopya → divergence (ör. "Diyetisyen Ara"
  bazı sayfalarda hâlâ var; madde-14 Store "Mağaza" sadece `dada-shop-v1`'de kaldırıldı, diğer Store
  sayfalarında duruyor; madde-4 shell tipleri arası tutarlılık doğrulanmadı). İş: her shell tipi için kanonik
  versiyonu belirle, divergence taşıyan tüm sayfaları senkronla (marka bazında ayrı kanonik). Detay:
  `tasks/faz3-plan.md` Adım 2.

---

## Madde 26 — Yol Güzergahım (DURUM: ✅ KAPANDI — DadaMutfak mockup paketi 30/30 TAMAM)

### TAM KURGU (plan → keşfet → kaydet → replay → checkpoint → rozet) — hepsi çalışır/commit'li
- **A Revize** (Sürüş Kabini): örtme %60→%19, çakışma 0px, akış CTA, toggle pill, mobil.
- **Faz A** (kurgu erişim): Kaydet→localStorage `dada_yg` + sayfa-içi "Kayıtlı Güzergahlarım" (slider, tek
  satır) + "Haritada Aç" replay (setEndpoint/toggleStop) + Sil.
- **3 giriş noktası** (cream/tomato): kesfet-v1 Mekan Bul bandı + anasayfa-portal-v3a beyaz kart şerit (gölge,
  görünür) + mekan-detay-v1 CTA (dikey ortalı, radius tutarlı). dizin.html güncel.
- **Faz B** (checkpoint + rozet yansıma):
  - CHECKPOINT: kayıtlı kart "Detay/Checkpoint" → sayfa-içi açılır blok (örtmesiz), durak "ziyaret ettim"
    toggle + ilerleme N/M bar. localStorage'a **route-scoped** yazar.
  - ROZET: rozetler-v1 "Keşif & Mekan" kategorisi + "Yol Üstü Gurme" ilerlemeli kilitli kart (eşik 10);
    mutfak-defteri "Ziyaret" sayacı + teaser. **unique mekan seti**nden beslenir, cross-page senk (load +
    storage event).
- **3 bug-fix** (commit öncesi Beyar testi):
  - BUG1: visited GLOBAL mekan-adı anahtarı → aynı mekan farklı güzergahta otomatik ziyaret görünüyordu →
    **route-scoped** `visited{routeId:{ad:true}}` + eski-flat migrasyon (reset+write-back). İzolasyon tam.
  - BUG2: rozet/defter route-scoped'tan **unique** türetir + storage event senk.
  - BUG3: GERÇEK BUG DEĞİLDİ (sayım her yerde tutarlı 4); "5-6" algısı = 4 mekan + 2 uç marker. Görsel
    ayrıştırma yapıldı (aşağı).
- **Uç-marker görsel ayrıştırması** (frontend-design, palet-içi): liste = transit hattı — Kalkış/Varış
  *terminal* (uppercase kicker + hollow dot, numarasız) vs *istasyon* (1-N numaralı tomato rozet) + "N mekan"
  başlık çipi; harita = uçlar küçük yuvarlak terminal, mekanlar büyük teardrop. Sayım/koridor dokunulmadı.

### NOTLAR
- vanilla HTML/CSS/JS, header inline shell her sayfada kopya. Motor JS (render dışı veri/koridor/sayım)
  korundu. localStorage gerçek tarayıcıda çalışır (artifact değil).
- Dizin: yol-guzergahim-v1 "Restoran & İşletme" grubunda (mekan ekosistemi).
- `dada_yg` şeması: `{routes:[{id,from,to,stops[],dateStr}], visited:{routeId:{mekanAdı:true}}}`. Unique
  ziyaret = tüm route visited setlerinin birleşimi (FARKLI mekan sayısı).

## Sonraki paket (madde 26 sonrası)
- Dalga 3 — birleşik hesap & abonelik merkezi: tek hesap/SSO (DadaMutfak+Store+Fit+Akademi, Store'a ayrı
  giriş yok), üretici kazanç & faturalama paneli (5+ video eşiği), doğum günü tier hediye.

## Stack & disiplin hatırlatma
- Mockup = saf vanilla HTML/CSS/JS (Tailwind/Alpine DEĞİL). Header her sayfada inline kopya.
- Görsel div+bg-image cover/center. Full-file write yok → targeted edit. Yeni renk yok.
- Denetim: 3-viewport (1440/768/390) render + Playwright davranış + Bağlantı Denetimi + Beyar gözle onay.
