# Faz 3 — Hesap & Abonelik & İşletme & Marka Mimarisi · ENVANTER + DENETİM

> **Bu bir ENVANTER raporudur — plan/çözüm DEĞİL.** Mevcut durum + tespit + ham gözlem.
> Kod/implement yok. Sıradaki adım: bu rapor girdisiyle birlikte mimari + implement planı.
>
> Kaynak: 3 paralel read-only Explore taraması (madde 5+12, 6+15, 13). Tüm yollar
> `mockups/` altında. Satır no'ları taramadan; teyit isterse grep ile bakılır.

---

## Madde 5 — Giriş & E-ticaret Kimliği

**MEVCUT DURUM**
- **Üye auth = tek dosya `giris-v1.html`** (`?tab=giris|kayit|sifre`). İki tab (Giriş / Kayıt) + gizli
  "Şifremi Unuttum" pane. Giriş: Google/Facebook + e-posta↔telefon segment + "Beni hatırla". Kayıt:
  Ad/Soyad/E-posta/Telefon/Şifre + 3 onay satırı → başarı `onboarding-v1.html`'e bağlanıyor.
  **Rol/hesap-tipi seçici YOK.** Tek istisna: Kayıt pane altında "Diyetisyen misin? → `diyetisyen-ol-v1.html`"
  callout'u (şef/antrenör/işletme için muadili yok).
- **`onboarding-v1.html`** post-kayıt tercih sihirbazı (`?step=1..4`) — auth değil.
- **Başvuru formları (auth değil, account oluşturmaz):** `sef-ol-v1.html`, `diyetisyen-ol-v1.html`,
  `antrenor-ol-v1.html`, `isletme-ekle-v1.html` — hepsi public shell + logged-out `btn-login → giris-v1`,
  hepsi `.ol-success` "Başvurun alındı" ile biten **inceleme-kapılı** formlar.
- **DadaStore'un AYRI girişi var:** store-shell sayfalarında (`dada-shop-v1`, `urun-liste`, `urun-detay`,
  `sepet`, `odeme`) gömülü `#loginModal` (`.lm-modal`). Store `btn-login` `data-login-open` ile **modalı
  açar — `giris-v1.html`'e GİTMEZ** (`?login=1` ile de otomatik açılır). Modal kendi DadaStore markalı,
  panes `giris/kayit/sifre`, sosyal = **Google + Apple** (giris-v1'de Google + Facebook).
- **E-ticaret bilgisi:** `hesabim-v1.html` tabları = Profil · Şifre · Gizlilik · Bildirimler · Üyeliklerim.
  **Adres defteri / kayıtlı kart / teslimat tab'i YOK** (tek e-ticaret kırıntısı: "DadaStore sipariş
  durumu" bildirim toggle'ı). Adres yalnız `odeme-v1.html` checkout'unda (Teslimat + Fatura adresi, "kayıtlı
  adreslerinden seç" + yeni adres). `siparislerim-v1.html` salt-okunur sipariş geçmişi.

**TESPİT**
- **İki ayrışık auth yüzeyi.** Store, `giris-v1.html`'i yeniden kullanmıyor; paralel bir login UI'ı
  kopyalıyor. Aynı kullanıcı, iki farklı kayıt sözleşmesi (farklı alanlar, Apple vs Facebook, store'da
  telefon/segment/çoklu onay yok).
- **Kayıt akışında rol/hesap-tipi seçimi yok;** yalnız diyetisyen için tek-yönlü işaret var.
- **"Kayıtlı adres" vaadi karşılıksız:** checkout "kayıtlı adreslerinden seç" diyor ama bu adresleri
  checkout DIŞINDA oluşturup yöneten ekran yok; `hesabim`'de adres/kart yeri yok.
- **E-ticaret kimliği parçalı:** sipariş geçmişi `siparislerim`'de, sipariş bildirimi `hesabim`'de, adres
  yalnız `odeme`'de — birleşik "hesap → e-ticaret" merkezi yok.

**HAM GÖZLEM** — Tek bir "hesap" yok; üç koparılmış kimlik var (ana site üye / store müşterisi / başvuran
uzman). Store'un ayrı modalı bilinçli bir "kabuk içinde kal" tercihi ama veri/sözleşme hizalaması yapılmamış.

---

## Madde 12 — İşletme Girişi

**MEVCUT DURUM**
- **İşletme paneli dosyaları** (yeşil "panel-shell kardeşi" sidebar): `mekan-panel-v1.html` (dashboard,
  içinde `data-pro-gate → pro-v1`), `mekan-ayarlar-v1.html` (müsaitlik + profil + bildirim),
  `mekan-rezervasyonlar-v1.html` (rezervasyon listesi), `mekan-menu-v1.html` (menü yönetimi). Sidebar nav
  bunlar arasında bağlı.
- **`panel-shell.html`** aslında **diyetisyen** panel template'i (başlık "Diyetisyen Paneli"); mekan-* onun
  yeşil türevi. (Ad genel duruyor ama içerik diyetisyene scope'lu.)
- **`isletme-ekle-v1.html`** = public **başvuru/listeleme formu** (public consumer shell üstünde). Account
  ya da şifre oluşturmaz; `Başvuruyu Gönder` → `.ol-success` "Başvurun alındı 🎉" → CTA `kesfet-v1?tab=mekan`'a
  döner. Metin "Onay sonrası mekân profilini **panelinden** kuracaksın" diyor.

**TESPİT**
- **İşletme login/register YOK; panelde auth gate YOK.** Panel yalnız `dizin.html` (dev sitemap) ve kardeş
  panel sidebar'larından erişiliyor — **public siteden hiçbir giriş yok**. `mekan-detay-v1.html`'de
  "burası sizin mi? / işletme sahibi / panel" claim girişi yok. Paneldeki tek kapı **PRO-GATE** (Pro paywall),
  kimlik doğrulama değil.
- **Kopuk halka:** `isletme-ekle` "panelinden kuracaksın" vaat ediyor ama başvuru → onay → panel arasında
  **giriş köprüsü yok**; panel pratikte erişilemez (sitemap dışında).
- **Üye/işletme ayrımı yok** çünkü ayrılacak bir işletme girişi zaten yok. `giris-v1` üye-only, rol tab yok,
  işletme/mekan callout'u yok.

**HAM GÖZLEM** — İşletme tarafı görsel olarak "tamam" (panel ekranları mevcut) ama kimlik/erişim katmanı
tamamen boş — paneller havada duruyor.

---

## Madde 6 — Admin Abonelik Yönetimi

**MEVCUT DURUM**
- **Kurulu tek admin ekranı = `admin-rozet-v1.html`** ("Rozet Yönetimi — DadaMutfak Admin"). Gamification
  rozet yönetimi, CRUD **stub** (butonlar disabled, "Laravel fazına not"). Sidebar'da Panel / Tarifler /
  Kullanıcılar / Şefler / Rozetler / Kademeler — **Rozetler hariç hepsi ölü `#` stub**.
- **`panel-shell.html`** = yeniden kullanılan panel iskeleti (sidebar + topbar + `.pnl-card` + `.ptable`);
  admin-rozet bunu tüketir (yeşili tomato'ya çevirir). Aslen **diyetisyen** template'i.
- Diyetisyen operatör panelleri (`dyt-*`) ve işletme panelleri (`mekan-*`) kendi alanlarını yönetir —
  abonelik gözetimi yok.

**TESPİT**
- **Platform-admin abonelik gözetimi TAMAMEN YOK** (kesin boşluk). Hiçbir ekran bir üyenin aboneliğini
  (ne platform Pro ne creator membership) görüntüleme/askıya alma/iade/değiştirme imkanı vermiyor.
  `admin-rozet` sidebar'ında Abonelik/Üyelik/Ödeme/Plan düğümü yok; `Kullanıcılar` ölü stub. "plan yönet"
  grep'i 0.
- Var olan "abonelik" yüzeyleri **yalnızca üye-tarafı self-service** ya da **business sell-side**
  (`reklam-ver-v1` = reklam/sponsorluk lead formu "Teklif iste") — admin oversight değil.

**HAM GÖZLEM** — Admin katmanı kavramsal olarak tek bir dikey (rozet) için açılmış, geri kalan tüm yönetim
düğümleri (kullanıcı, abonelik, ödeme) placeholder. Abonelik gözetimi için iskelet bile yok.

---

## Madde 13 — Marka-Bazlı Arama

**MEVCUT DURUM**
- **Tek global arama = `arama-v1.html`**, multi-entity: Tümü / Tarifler / Videolar / Şefler / Ürünler /
  Yazılar. State `?q=`, `?empty=1`, `?tab=` okur.
- **Header icon arama (tüm shell'ler):** Mutfak (`anasayfa-portal-v3a`, `tarif-detay`, `kesfet`, `tarif-liste`),
  Store (`dada-shop`, `urun-liste` — aria "Ürün ara"), Akademi (`akademi-v1`), Fit (`dadafit-hub`), Sağlık
  (`saglik-hub`) — **HEPSİ** `onclick="location.href='arama-v1.html'"`, **context'siz** (q/tab/brand yok).
- **Büyük gövde/hero arama kutuları** (`shopSearchInput`, `crsSearchInput`, `dfSearchInput`, `shSearchInput`,
  `searchInput`) = **client-side canlı filtre**, sayfadaki kartları süzer; **global'e submit YOK** (Enter→arama
  yok, sadece Escape→temizle).

**TESPİT**
- **Tek farksız arama, marka scope'u yok.** 5 shell de aynı tarif-merkezli `arama-v1`'e dökülüyor; Store
  kullanıcısı tarif sonucu görüyor, Akademi/Fit kullanıcısının arama index'inde **eğitim/hareket/program
  entity'si hiç yok**.
- **Marka-context primitifi YOK:** body class yok, `data-brand`/`data-module` yok, URL param yok, JS var yok.
  Marka kimliği yalnız **ayrı el-yazımı shell dosyaları** (Store/Akademi/Fit kendi `<header>`, kendi marka
  SVG/wordmark, kendi nav, kendi in-page arama JS'i). arama-v1 `brand/context/scope` paramı okumaz (grep 0).
- **İki kopuk arama UI'ı yan yana:** büyük kutu çıkmaz sokak (yazılan metin global'e taşınmıyor); küçük header
  ikonu global'e gider ama **yazılanı atar** ve context taşımaz. İkisi hiç bağlanmıyor.
- **Global index platformdan dar:** mekan, diyetisyen, akademi eğitim, DadaFit hareket/program, sağlık aracı
  arama kapsamında yok — oysa hepsinin özel sayfaları var.

**HAM GÖZLEM** — "Marka-bazlı arama" için gereken iki temel taş yok: (a) sayfanın hangi markada olduğunu bilen
bir context işareti, (b) arama hedefinin bunu okuyup scope'laması. Şu an mimari nötr tek-index.

---

## Madde 15 — Abonelik / Pro Kurgu Denetimi

**MEVCUT DURUM**
- **`pro-v1.html`** "tek site-geneli üyelik" beyanı; 3 tier: Ücretsiz **₺0** / Pro+ **₺99** / Pro Max **₺199**.
  Karşılaştırma tablosu cross-brand: DadaAkademi kursları, **DadaFit programları** (yalnız Pro Max), diyetisyen
  pro içerik, mekan Pro avantajları → **Pro = Mutfak+Akademi+Fit+Diyetisyen+Mekan'ı kapsayan tek hesap**.
- **`pro-odeme-v1.html`** Pro checkout (`?plan=t2|t3`). JS fiyatları **₺49 / ₺99 / ₺199**.
- **Boilerplate Pro yüzeyleri:** `acct-pro` "Pro'ya Yükselt" upsell **~89 dosyada**; `pro-gate` modal ~12
  dosyada (`_shell`, `pro-v1`, `panel-shell`, `dadafit-hub/kopru`, `diyetisyen-profil`, `egzersiz-detay`,
  `program-detay`, `video-mutfagi`, `mekan-panel/menu/ayarlar`); `href="pro-v1.html"` ~130 sayfada.
- **İkinci, ayrı ödeme sistemi:** `uye-abonelik-odeme-v1.html` = **creator membership** (madde 30 / Patreon
  tarzı, "Elif'in Mutfağı Üyeliği ₺49"), yalnız `mutfak-defteri-v1`'den (JS redirect) + `dizin`'den erişilir.

**TESPİT**
- **İki paralel ücretli abonelik sistemi, iki ayrı checkout:** platform Pro (`pro-odeme-v1`) ve creator
  membership (`uye-abonelik-odeme-v1`). Görsel dil + isim ("Üyelik" vs "Pro Aboneliği") + **₺49** her ikisinde
  → karışma riski. `pro-v1` free-follow vs Pro'yu ayrıştırıyor ama Pro vs creator-membership'i ayrıştırmıyor.
- **Fiyat tutarsızlığı:** `pro-v1` ₺0/99/199 ilan ederken `pro-odeme` JS ₺49/99/199 taşıyor; ₺49 giriş
  tier'ının plan sayfasında karşılığı yok, creator ₺49 ile çakışıyor.
- **Üye-tarafı Pro yönetim ekranı YOK.** `hesabim`'in "Üyeliklerim" tab'i **creator membership**'leri
  listeliyor ("ücretli üye olduğun üreticiler") — **platform Pro'yu göstermiyor/yönetmiyor** (aktif tier,
  iptal/değiştir, fatura yok). Post-purchase Pro dashboard yok; iptal/değiştir yalnız marketing + funnel'a
  geri dönüş.
- **Marka-abonelik asimetrisi:** DadaFit ve DadaAkademi kendi kimlik/badge/gate UI'ına sahip ama **kendi
  monetizasyonu yok** — sessizce Pro+/Pro Max'e gömülü. Akademi "Yakında" olduğu halde Pro faydası olarak
  görünüyor. DadaStore'da abonelik kavramı hiç yok.
- **Asimetrik keşfedilebilirlik:** Pro site-geneli damgalı (~130 sayfa); creator membership yalnız 2 yerden
  erişilir.

**HAM GÖZLEM** — "Pro tek hesap" söylemi ile gerçeklik (iki ödeme sistemi + sıfır yönetim ekranı + çakışan
fiyat) örtüşmüyor. Abonelik hem üye hem admin tarafında "satış var, yönetim yok" durumunda.

---

## Kurgu Bütünlüğü Değerlendirmesi (üst düzey teşhis — plan değil)

5 madde tek bir kök kırığın belirtileri: **kimlik (identity) ve hak (entitlement) tek bir hesap omurgasında
birleşmiyor.** Platform "tek hesap / tek Pro / tek arama" gibi konuşuyor ama altyapı marka-başına ayrı,
köprüsüz adacıklardan oluşuyor. Kırığın beş yüzü:

1. **Auth parçalı (madde 5, 12).** Üye girişi (`giris-v1`), Store girişi (ayrı modal), işletme girişi (yok),
   uzman rolleri (ayrı başvuru formları) — **tek hesap omurgası yok**. Aynı kişi Store'da farklı sözleşmeyle
   kaydoluyor; işletme/uzman rolleri hesaba bağlanmıyor.

2. **Hesap merkezi e-ticaret kimliğini taşımıyor (madde 5).** Adres defteri / kayıtlı kart / sipariş tek
   "hesabım" altında değil; "kayıtlı adres" vaadinin yönetim evi yok.

3. **İşletme dünyası havada (madde 12).** Başvuru → onay → panel köprüsü ve business auth yok; public→panel
   girişi yok. Paneller var ama erişilemez.

4. **Abonelik çok-başlı ve yönetimsiz (madde 6, 15).** İki ayrı ödeme sistemi (platform Pro + creator
   membership), çakışan fiyat/dil; **ne üye tarafında "aboneliğim" yönetimi, ne admin tarafında gözetim**
   var. Marka hakları (hangi tier neyi açar) yalnız statik tabloda; Fit/Akademi kendi monetizasyonu olmadan
   Pro'ya gömülü.

5. **Arama markaya bağlanamıyor (madde 13).** Brand-context primitifi olmadığı için arama scope'lanamıyor;
   4 marka tek tarif-merkezli index'e dökülüyor; in-page filtre kutuları global aramaya köprüsüz.

**Birleştirilmesi/eklenmesi gereken (teşhis düzeyinde, çözüm değil):**
- **Tek hesap/kimlik omurgası:** üye + store müşterisi + Pro aynı kimlik; işletme & uzman = aynı hesaba bağlı
  rol/claim. (Store modalı korunabilir ama aynı hesaba yazmalı.)
- **Hesap hub'ını e-ticaret kimliğiyle genişletmek:** adres defteri + kayıtlı kart + sipariş, tek yerde.
- **İşletme erişim katmanı:** rol-bazlı giriş + başvuru→onay→panel köprüsü + `mekan-detay`'da sahip-claim.
- **Tek abonelik omurgası:** platform Pro ↔ creator membership ilişkisini netleştirmek; üye-tarafı "aboneliğim"
  yönetim ekranı **ve** admin-tarafı abonelik gözetim ekranı; fiyatları tekilleştirmek.
- **Brand-context primitifi:** sayfa→marka işareti (örn. `body[data-brand]` / URL) + arama'yı markaya
  scope'lamak + entity index'ini genişletmek + in-page kutuları global'e köprülemek.

> Sıradaki adım: bu beş yüzü tek mimariye oturtan **implement planı** — hangi maddenin hangi sırayla, neyin
> paylaşılan omurga (hesap/abonelik/brand-context) olarak bir kez yazılıp tüm shell'lere yayılacağı. Bu rapor
> o planın girdisidir.
