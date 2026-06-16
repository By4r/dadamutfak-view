# DadaMutfak — REVİZE TURU + PILL CİLA DONE ✅ (HEAD `d931115`) · SIRADAKİ: Wave 3 nav-sweep · Ne Pişirsem revizesi · madde 3 Dolapta Ne Var

> **✅ REVİZE TURU + PILL CİLA DONE (push'lu, HEAD `d931115`):** Tüm revize işleri + Beyar canlı-SS cila turu
> tamam. Son cila (`d931115`): rozet kademe pill ("BURADASIN"/"SEÇİLİ") metni gri/soluk görünüyordu →
> specificity fix (`.rank-step span` 0,1,1 eziyordu → `.rank-step .rs-now`/`.rs-pick` 0,2,0) → metin **#fff +
> font-weight 800**, computed (`rgb(255,255,255)`/800) + render SS 1440 doğrulandı.
> **SIRADAKİ:** (1) **Wave 3 nav-sweep** — besin submenu + "Pro'ya Yükselt" avatar dropdown + "Tüm Rozetler"
> link + video Pro etiketi (NOT: "Rezervasyonlarım" dropdown öğesi `5f23244`'te zaten eklendi, tekrar etme).
> (2) **Ne Pişirsem revizesi.** (3) **madde 3 — Dolapta Ne Var?** (Beyar detay verecek).
>

> **🔁 REVİZE SONRASI EK COMMIT'LER (Beyar canlı-SS turu, hepsi push'lu):**
> - `c9f9b16` — `rozetler-v1` cila: (1) rozet tooltip BAŞLIK+kademe görünmüyordu → CSS specificity bug
>   (`.badge-card b/span`, `.badge-tip`'i eziyordu) `.badge-card .badge-tip ...` ile çözüldü; (2) kademe
>   "BURADASIN"/"SEÇİLİ" pill'leri kart DIŞINA taşıyordu → sticky header kırpıyordu → kart İÇİNE alındı
>   (uniform padding, ikonlar hizalı, artık asla kırpılmaz).
> - `5f23244` — **NAV (avatar dropdown):** "Rezervasyonlarım" profil dropdown'ına eklendi (Alışveriş Listem↔
>   Bildirimler arası, `fa-calendar-check`). İdempotent sweep **73 dosya** (`.acct-menu` olan tümü), her biri
>   +1/−0; idempotent re-run=0; render-doğrulamalı. ⚠️ **Wave 3 bu öğeyi TEKRAR EKLEMESİN** (zaten yapıldı);
>   Wave 3'ün avatar-dropdown işi yalnız "Pro'ya Yükselt" kaldı.
>


> Tek doğruluk kaynağı. Güncelleme: 2026-06-16 (**REVİZE TURU DONE ✅ — commit `51c7445` origin/main'e
> push'lu**. Agent team: lead delegate + 4 paralel teammate (restoran · rozet · video · sofra-hero),
> çakışmasız/disjoint dosya setleri, her biri lead bağımsız KANITLI kabul (render SS 1440/768/390 + numstat +
> tık-test + 0 JS hatası). Sonrasında Beyar canlı-SS turunda yakaladığı UI/UX bulguları lead tarafından
> doğrudan düzeltildi (frontend-design skill + render-doğrulamalı). NAV'a DOKUNULMADI (Wave 3). SS:
> `mockups/outputs/revize-{restoran,rozet,video,sofra,uifix,hero2}-ss/` (commit'e GİRMEDİ — bilinçli hariç).
>
> **🔧 REVİZE TURU YAPILDI (4 teammate + lead UI fix turu — commit `51c7445`):**
> - **R-restoran** (`mekan-detay` +109/−37 · `mekan-ayarlar` +27/−7 · `mekan-rezervasyonlar` +137 · YENİ
>   `rezervasyonlarim-v1.html`): (a) "Rezervasyon Yap" buton kayması fix (≤1024 `flex-basis` yok→`flex:1 1 100%`);
>   (b) rez modalı kompakt kişi seçici (stepper+pill) + masa tercihi/özel istek/özel gün; (c) "İşletme Profili"
>   tab TIKLANAMIYOR bug fix (`?tab=profil` senkron) + 8 yeni özellik (vejetaryen/vegan/canlı müzik/teras/manzara/
>   paket servis/evcil/grup rez); (d) YENİ kullanıcı `rezervasyonlarim` (yaklaşan/geçmiş + değiştir/iptal);
>   (e) mekan hero görselleri.
> - **R-rozet** (`rozetler-v1` +218/−51 · `rozet-veri.md` +86/−58): kademe kartları TIKLANABİLİR→o kademenin
>   rozetlerine filtre (eşleşen tomato-outline, diğerleri soluk); rozet HOVER→açıklama tooltip; her rozette
>   "almak için gereken"/ilerleme notu; 24→30 rozet; 8 kademe↔rozet eşlemesi; hero görseli.
> - **R-video** (`video-mutfagi` +21/−10): "Dada Akış" şeridine 2 premium kart `.pro-gate` kilitli (gold/crown
>   "Pro" rozeti → canonical `#proGate`→`pro-v1`). Abone (ücretsiz) ≠ Pro (kilit) ayrımı korundu
>   (`gateOpenedBySub=false` teyitli). hero görseli.
> - **R-sofra-hero** (15 dosya): `sofra-duzeni` hub +10/−271 sadeleştirme (one-page sekme + sol-sağ `.sof-row`
>   KALDIRILDI → yalnız 8 kart→detay); 14 sayfa hero idarelik Unsplash görseli (8 sofra detay + 4 besin rehberi +
>   pro-v1 + pro-odeme; `data-img-pending` korundu, highfield gelince swap). `besin-kutuphanesi` DOKUNULMADI.
> - **LEAD UI/UX FIX TURU (Beyar canlı-SS bulguları, doğrudan lead):**
>   - `rozetler-v1`: "BURADASIN"/"SEÇİLİ" kademe etiketleri kırpık/metne biniyordu → simetrik kenar-pill
>     (üst/alt, `line-height:1`, çakışmasız).
>   - `rezervasyonlarim-v1`: HERO ne-pisirsem diline uyduruldu — sabit-bant tek bölüm → cover hero + ayrı
>     `.rez-body`; `.rez-head` 2-kolon grid (solda başlık+lead+"Mekân Keşfet", **sağda `.rez-stats` özet blok**:
>     2 Yaklaşan/3 Geçmiş/4 Mekân) = sağ-boş/lone-buton gitti; "Mekân Keşfet" cam-buton hover'ı (alisveris
>     kanonu); tam-genişlik simetrik wrap. `.rez-count` JS stat sayısına bağlandı.
>   - `mekan-detay-v1`: "Rezervasyon Yap" butonu kart kenarına yapışıktı (gap 1px) → `align-self:stretch` +
>     `margin:16px 16px 0` (gap 17/17).
>   - `mekan-rezervasyonlar-v1`: takvim "+ Boş" hücreleri + üst "+ Manuel Rezervasyon" + gün-görünümü
>     "Manuel Ekle" → YENİ manuel rezervasyon modalı (gün+saat hücre konumundan türetilip ÖN-SEÇİLİ; form→
>     başarı state; Esc/overlay/X kapat). Mockup — gerçek kayıt yok.
>   - `kesfet-v1`: zaten ne-pisirsem cover+sağ-stats dili + simetrik wrap → DEĞİŞİKLİK GEREKMEDİ (teyitli).
>
> **⏭️ KALAN İŞ (sırasıyla):**
> 1. **Wave 3 — nav chrome-sweep (TEK sahip, EN SON, paralel DEĞİL):** `tasks/nav-degisiklik-listesi.md` →
>    tek idempotent Python regex sweep ~61 dosya, **href-agnostik**. Kapsam: 5b besin submenu (4 öğe) +
>    F1 "Pro'ya Yükselt" avatar dropdown + F2 "Tüm Rozetler" link + 13 video Pro etiketi. Negatif grep +
>    2× idempotent re-run + dropdown-açık SS ile doğrula. Tarifler/Mutfak Sırları DOKUNULMAZ.
>    `rezervasyonlarim` yeni public sayfa → nav aktif-state'i de bu sweep'te tutarlılaşır.
> 2. **BEKLEYEN — madde 3 (Dolapta Ne Var? yeniden revize):** Beyar detay verecek, henüz başlama.
>
> ---
>
> Önceki: 2026-06-16 (**WAVE 2 MODÜLLERİ DONE ✅ — commit `65b0047`
> origin/main'e push'lu, Beyar SS turu onayladı**. Agent team: lead delegate + 3 teammate (diyetisyen-restoran ardışık 8→10 · video · rozet-
> dagitim ardışık 9→9b), çakışmasız/disjoint dosya setleri. 5 task (shared task list) hepsi lead bağımsız
> KANITLI kabul: numstat + grep + render SS 1440/768/390 + tık-testi + 0 JS hatası. Foundation primitive'leri
> (`.pro-gate` / `.creator-sub` / `.badge-band` / 8-kademe merdiven) TÜKETİLDİ — yeniden icat YOK (byte-match
> teyitli). NAV'a DOKUNULMADI (Wave 3 sweep). SS: `mockups/outputs/wave2-m{8,9,9b,10,13}-ss/`.
>
> **🌊 WAVE 2 MODÜLLERİ YAPILDI (madde 8/13/9/10 — kanıtlı):**
> - **M8 — Diyetisyen Pro** (`diyetisyen-profil-v1.html` +95/−1 · `panel-shell.html` +124/−0): profil↔panel
>   nav linki (`<a class="pf-panel">`) KALDIRILDI (CSS def `.pf-panel{` korundu) → public profil sahibin
>   yönetim arayüzüne atlamıyor. `panel-shell` dashboard'a canonical `[data-pro-gate]`'li `.pro-band` (Pro+
>   tier · 3 pro-only kart: pro içerik/danışan indirimi/öne çıkan profil · CTA→`pro-v1.html`) + profil
>   tarifler pane'inde `.pf-pro-band` ("Elif'in Pro koleksiyonu", `[data-pro-gate]`). Gate primitive `_shell`
>   ile byte-identical, her dosyada tek `#proGate`. Tık-test: gate aç→X/backdrop/Esc kapa, 0 JS hatası.
> - **M13 — Video Pro/Abone** (`video-mutfagi-v1.html` +241/−1): İKİ KAVRAM NET AYRI — (1) ücretsiz
>   `.creator-sub`/`[data-abone-takip]` "Abone Ol" (3 creator kartı: Ayşe Tülin/Şef Kaan/Zeynep Usta +
>   rütbe rozeti + sosyal link); (2) ücretli premium "Restoran Sırları" serisi `[data-pro-gate]` kilit →
>   `pro-v1.html`. Tık-test: abone toggle çalışıyor VE `gateOpenedBySub=false` (abone içeriği AÇMIYOR);
>   pro-gate ayrı çalışıyor. İki primitive canonical, 0 JS hatası.
> - **M9 — Rozet dağıtımı** (`hesabim` +86 · `sefler` +19 · `sef-ol` +46 · `mutfak-defteri` +1/−1 ·
>   YENİ `admin-rozet-v1.html` ~330L): hesabim'e `rank-now` kademe paneli (Usta Aşçı·15 rozet·8.450 puan·
>   Şef'e %75) + `.badge-band` teaser; sefler 13 karta `.sef-rank` kademe rozeti; sef-ol'a 8-kademe `.ladder`
>   teaser; mutfak-defteri "Tüm Rozetler →" `href="#"`→`rozetler-v1.html`; admin stub (`panel-shell` tüketildi,
>   23 disabled buton + "CRUD pasif/Laravel fazına not"). Foundation `.badge-band`/`.ladder` VERBATIM,
>   persona `rozet-veri.md` ile birebir.
> - **M9b — diyetisyen-profil rozet bloğu** (M8 SONRASI ardışık): `.pf-head`↔`.pf-stats` arasına `.badge-band`
>   teaser (`.pf-badges`: Usta Aşçı + 15/20 + 5 vitrin rozet + "Tüm Rozetler →"`rozetler-v1`). M8'in sabit
>   marker'ına konumlandı; FORBIDDEN bölgelere (`.pf-actions`/`.pf-pro-band`/`.pro-gate`) 0 dokunuş (teyitli);
>   pro-gate hâlâ çalışıyor.
> - **M10 — Restoran→Randevu** (`mekan-detay-v1.html` +303/−0 · YENİ `mekan-panel`584L/`mekan-rezervasyonlar`
>   761L/`mekan-ayarlar`562L/`isletme-ekle`2032L): mekan-detay'a **masa rezervasyonu** modalı (diyetisyen
>   apt-modal 3-adım İSKELETİ miras, semantik masa rez.: **Adım1 kişi sayısı → Adım2 tarih/saat → Adım3
>   onay/başarı**; ücret/depozito YOK, "ön ödeme alınmaz"); mekan paneli = panel-shell **yeşil** kardeşi
>   (Rezervasyonlar=dyt-randevular takvim/drawer mirror · Müsaitlik&Ayarlar · İşletme Profili) + Pro+ `.pro-band`
>   canonical gate; "İşletmeni Ekle" = diyetisyen-ol kardeşi form. Tık-test: 3-adım akış (4 kişi·Cum 14·20:00·
>   Doğum günü recap) uçtan uca + Geri/İleri sağlaması, 0 JS hatası. Nav-sweep YOK (§8.2 Keşfet-içi).
> - **✅ COMMIT'Lİ** (`65b0047`, origin/main): 8 değişen + 5 yeni mockup tek commit'te. `isletme-ekle`'deki
>   5 "diyetisyen" geçişi = miras chrome (topbar/drawer nav + paylaşılan form option + 1 CSS yorum) → Wave 3
>   sweep kapsamı, içerik hatası DEĞİL. **SS commit'e girmedi** (`mockups/outputs/wave2-*-ss/` — bilinçli hariç).
>
> **🔧 REVİZE TURU PENDING (paralel agent — Wave 3 nav-sweep'ten ÖNCE):** Beyar SS turu bulguları. Domain'ler
> büyük ölçüde disjoint → paralel teammate'ler (restoran / rozet / video / sofra ayrı dosya setleri; R-hero
> çok-dosya ama yalnız hero görsel swap).
> - **R-restoran** (`mekan-detay` + `mekan-panel` + yeni `rezervasyonlarim-v1.html`): (a) mekan-detay
>   "Rezervasyon Yap" butonu KAYIYOR → konum/katman fix. (b) rezervasyon modalı **kişi seçici UI küçült**
>   (büyük 1–6 blokları → kompakt selector). (c) **YENİ `rezervasyonlarim-v1.html`** — kullanıcının kendi
>   rezervasyonları sayfası (mekan paneli işletme tarafı; bu kullanıcı tarafı). (d) mekan paneli **"İşletme
>   Profili" tab TIKLANAMIYOR — BUG fix**. (e) özellik seçenekleri artır: vejetaryen/vegan · canlı müzik ·
>   teras · manzara · paket servis · evcil dostu · grup rezervasyonu. (f) **rezervasyon ek özellik (öneri):**
>   özel istek/not · masa tercihi · iptal-değiştir · özel gün notu.
> - **R-rozet** (`rozetler-v1.html` derinleştir): kademe kartları **tıklanabilir** (o kademenin rozetlerini
>   göster) · rozet **hover→açıklama** · her rozette "almak için gereken" küçük not · kademe çeşit/sayı artır.
> - **R-video** (`video-mutfagi`): "Dada Akış" şeridine premium içerik (`.pro-gate`).
> - **R-sofra** (`sofra-duzeni-v1.html` hub): one-page sekme + sol-sağ bilgi KALDIR → yalnız kart→detay akışı.
> - **R-hero** (çok-dosya, yalnız hero görsel): yeni sayfalara idarelik/temsilî hero görseli (highfield gelince
>   swap) — `pro-v1` · `pro-odeme-v1` · `rozetler-v1` · 8 sofra detay · 4 besin rehberi · mekan sayfaları · video.
> - **BEKLEYEN — madde 3 (Dolapta Ne Var? yeniden revize):** Beyar detay verecek, henüz başlama.
>
> **🧹 WAVE 3 PENDING — nav chrome-sweep (TEK sahip, EN SON, paralel DEĞİL):** `tasks/nav-degisiklik-
> listesi.md` → tek idempotent Python regex sweep ~61 dosya, **href-agnostik**. Kapsam: 5b besin submenu
> (4 öğe) + F1 "Pro'ya Yükselt" avatar dropdown + F2 "Tüm Rozetler" link + 13 video Pro etiketi + (M10
> mekan paneli erişimi zaten panel-shell footer/CTA üzerinden, nav-sweep gerektirmez). `isletme-ekle` miras
> chrome'u da bu sweep'te tutarlılaşır. Negatif grep + 2× idempotent re-run + dropdown-açık SS ile doğrula.
> Tarifler/Mutfak Sırları DOKUNULMAZ.
>
> **🧱 ÖNCEKİ ADIM — WAVE 2 FOUNDATION (F1/F2/F3 — patron onaylı 2026-06-16, commit `b31e4d4` push'lu):**
> - **F1 — Pro abonelik + tier (site-geneli TEK üyelik):**
>   - `pro-v1.html` (yeni, 1903 L): §2f hero + 3-tier `.pro-grid` (**Pro / Pro+ / Pro Max** — nötr/ticari
>     isim, şef-kademeden AYRI; `reklam-ver .pk-card` dili miras: t1/t2/t3, t2 `.featured`+`.pro-flag`
>     "En popüler"; ikon `fa-bolt/fa-star/fa-gem`) + özellik karşılaştırma tablosu (§6.2: reklamsız/pro
>     tarif/creator 1·3·∞/diyetisyen/mekan/öncelikli; ₺49·99·199 temsilî) + SSS akordeon + CTA. **DEMO
>     bloğu = iki katman NET ayrı:** ücretsiz "Abone Ol" (`.creator-sub`) ↔ ücretli "Pro Gate".
>   - `pro-odeme-v1.html` (yeni, 1799 L): public-shell + sade checkout (`odeme-v1` `fk-`/`card-visual`
>     deseni; shop-shell DEĞİL). `?plan=t1/t2/t3` → plan özeti dolar; canlı kart önizleme (numara/isim/
>     SKT formatlama); agree-gate (onaysız ilerlemez); başarı state (`?ok=1` / "Aboneliği Başlat").
>   - `_shell.html` (+86): **canonical `.pro-gate`** (ÜCRETLİ premium kilit; `[data-pro-gate]`,
>     `data-pro-title/desc`; `lg-gate` kardeşi; `?pro=1` SS param) + **canonical `.creator-sub`**
>     (ÜCRETSİZ takip toggle; `[data-abone-takip]`; "Abone Olundu ✓"; PARA/KİLİT YOK). İkisi NET ayrı —
>     abone olmak içeriği AÇMAZ, yalnız Pro açar. Wave 2/3 buradan kopyalar (site-geneli dağıtım Wave 3).
>   - DOĞRULAMA: Abone toggle gate AÇMIYOR (`gateOpenedBySub=0`); pro-gate kilit→modal→X kapanış; ödeme
>     `plan=t3`→"Pro Max/₺199" + agree-gate + başarı; `_shell ?pro=1`→gate OK. Hepsi 0 JS hatası.
> - **F2 — Rozet / şef-kademe oyunlaştırma:**
>   - `rozetler-v1.html` (yeni, 1770 L): §2f hero + **8-kademe şef merdiveni** (`.chef`/`.ladder`/
>     `.rank-step`: Çömez→Komi→Çırak→Aşçı **done** → Usta Aşçı **current** "Buradasın" altın insignia →
>     Şef/Usta Şef/Dada Üstadı **locked** dashed; koyu `.rank-now` panel + progress bar 15/20 + 8.450
>     puan) + **24 rozet galerisi** (`.badge-grid`/`.badge-card(.locked)` mutfak-defteri dili: 17
>     kazanılan + 7 kilitli, 6 kategori, nadir `.b-rare` işareti). FA6.5.2 free ikon (Pro `fa-hat-chef`
>     YOK → Şef=`fa-award`). `mutfak-defteri` "Tüm Rozetler →" hedefi.
>   - `tasks/rozet-veri.md` (yeni, 116 L): 6 kategori rozet seti + tetik + 8-kademe eşik + demo persona.
>   - **Profil/hesabım dağıtımı Foundation DIŞI** → Wave 2 madde 9 (T-E). Foundation = galeri+veri+kademe.
> - **F3 — Nav/IA (sadece SPEC, nav'a DOKUNULMADI):** `tasks/nav-degisiklik-listesi.md` (yeni, 133 L) —
>   Wave 3 tek idempotent sweep listesi: 5b besin submenu 4 öğe (~61 dosya, `diyetisyen-dizin` anchor) +
>   F1 "Pro'ya Yükselt" avatar dropdown (~80) + F2 "Tüm Rozetler" link + 13 video Pro (içerik-içi). **⚠️
>   VARYANS:** 4 besin rehber sayfası sade shell (`.dropdown`/`.d-sub`, Testler eksik) → sweep
>   **href-agnostik** olmalı. Tarifler/Mutfak Sırları dropdownları DOKUNULMAZ.
> - **SS/script:** `mockups/outputs/wave2-foundation-ss/` (pro/odeme/rozetler ×3 vp + pro-gate-open +
>   odeme-success + shot.cjs/interact-*.cjs). **COMMIT'E GİRMEDİ** (outputs ignore).
>
> **🌊 WAVE 2 PENDING (Foundation primitive'leri HAZIR — teammate'li paralel):**
> - **8 (diyetisyen pro) ∥ 13 (video abone) ∥ 9 (rozet dağıtımı):** paralel. F1/F2 tüketir.
>   - **8:** `diyetisyen-profil` sat.~1457 `.pf-panel` linki kaldır + profil↔panel kuplajı kopar + panele
>     Pro özellik bandı + pro içerik `.pro-gate` (F1'den). Panel zaten ayrı kabuk (panel-shell + 7 dyt).
>   - **13:** `video-mutfagi` — ücretsiz `.creator-sub` "Abone Ol" + premium seride `.pro-gate` (ikisi NET
>     AYRI, F1 demo'sunu mirror) + creator profil/sosyal link. F1 tüketir, 8/10'dan bağımsız.
>   - **9:** F2 `.badge-band` teaser + kademe rozeti dağıtımı (mutfak-defteri "Tüm Rozetler"→`rozetler-v1`
>     link + diyetisyen-profil/sefler/sef-ol/hesabim) + admin stub (`admin-rozet-v1`). `diyetisyen-profil`
>     rozet bloğunu **T-C (madde 8) ile KOORDİNE** (8 profili sabitleyince 9 üstüne ekler — R3 çakışması).
> - **SONRA 10 (restoran) — 8'den SONRA ARDIŞIK (tercihen aynı teammate):** `mekan-detay`'a "Rezervasyon
>   Yap" modal (diyetisyen `.apt-modal` 3-ADIM İSKELETİ + **MASA REZERVASYONU semantiği**: Adım1 kişi
>   sayısı → Adım2 tarih/saat → Adım3 onay/başarı) + mekan paneli (panel-shell yeşil kardeşi:
>   Rezervasyonlar/Müsaitlik/İşletme Profili) + "İşletmeni Ekle" formu (diyetisyen-ol kardeşi). Pro tier
>   (Pro+/Max) mekan avantajları F1'den. Ücret/depozito yok.
>
> **🧹 WAVE 3 PENDING — nav chrome-sweep (TEK sahip, paralel DEĞİL, EN SON):** `tasks/nav-degisiklik-
> listesi.md` listesi → tek idempotent Python regex sweep ~61 dosya, **href-agnostik** (besin sayfaları
> sade-shell varyantı dahil). Negatif grep + 2× idempotent re-run + 5 aileden dropdown-açık SS + nav
> taşma yok (1025/1280 overflow=false) ile doğrula. Tarifler/Mutfak Sırları DOKUNULMAZ.
>
> **🔍 DENETİM PROTOKOLÜ (Wave 2/3'te uygula):** teammate "bitti" deyince KANITLA doğrula — render SS
> 1440/768/390 + diff özeti (numstat) + acceptance kriteri; her ~10 dk durum yokla; KANITSIZ done sayma.
>
> **📋 PLAN:** `tasks/revize-turu-plan.md` (madde→dosya, domain matrisi, F1/F2/F3 spec). SS: `mockups/outputs/`.
>
> ---
>
> Önceki: 2026-06-16 (**WAVE 1 DONE ✅ — revize turu mockup'ları**
> commit `80f64cf` origin/main'e push'lu. 3 değişen dosya + 12 yeni sayfa. Agent team (lead delegate
> + 2 teammate T-A/T-B paralel, çakışmasız dosya setleri, NAV SWEEP YOK → Wave 3'e ertelendi).
>
> **WAVE 1 YAPILDI (madde 3 / 12 / 11 / 5a):**
> - **Madde 3 — `tarif-bulucu-v1.html`** (+123/−19): (a) malzeme içeriği tamamlandı (Sebzeler 7→22,
>   Meyveler 6→18, Baklagiller 5→9, Kırmızı Et 3→8, Beyaz Et 2→5, Balık 5→9, Süt&Temel +8; FA 6.5.2
>   dışı ikon yok). (b) kategori-bazlı renk token `--cat` (sebze yeşil / meyve turuncu / et kırmızı /
>   balık mavi / süt açık mavi; FA korundu sadece renklendirme). (c) oval `.sh-tab` `border-radius`
>   999px→**12px** rounded-rect (aktif filled-tomato+border korundu). (d) İstemediklerim `#alerjenBlock`
>   → belirgin koyu slate uyarı bandı + "X malzeme hariç tutuluyor" canlı tomato sayaç + alerjen 8→14.
> - **Madde 12 — `reklam-ver-v1.html`** (+216/−9): 9 `.yer-card`'a `data-placement`+role/aria → tık ile
>   **placement-preview modal** (sol browser-chrome'lu sayfa şeması + vurgulu tomato-dashed pulse yuva,
>   sağ konum/format/metrik; veri-driven `P{}` map; mobil placement için dar şema). Kapatma ×+backdrop+
>   Esc, hover "Önizle" rozeti, Enter/Space erişimi.
> - **Madde 11 — Sofra 8 detay sayfası** (`sofra-{gunluk,misafir,kahvalti,resmi,ramazan,bayram,cocuklu,
>   acik-bufe}-v1.html`): `_shell` + §2f koyu-overlay hero (breadcrumb Mutfak Sırları › Sofra Düzeni ›
>   kategori) + 3p giriş + 4 adımlı kart grid + ipucu bandı + "diğer düzenler" köprüsü. Görsel = gri
>   placeholder + **`data-img-pending`** (highfield görselleri sonra). Hub `sofra-duzeni-v1.html` (+8/−8):
>   8 `.disc-card` href `#anchor`→`sofra-<slug>-v1.html` (kalan `#anchor`=0, yeni link=8 — lead teyitli).
> - **Madde 5a — 4 besin rehberi** (`besin-kalori-cetveli`, `protein-rehberi`, `karbonhidrat-rehberi`,
>   `yag-rehberi-v1.html`): `besin-kutuphanesi` tablo dili + §2f hero (yeşil aksan) + editöryal giriş +
>   3 bilgi kartı + makro-vurgulu referans tablosu + temsilî-veri uyarısı (veri mock ama gerçekçi).
> DOĞRULAMA: her teammate Playwright (1280+390) — **0 JS hatası** (T-A 4 ctx, T-B 12 sayfa); placement
> modal 9/9 aç/kapa, alerjen sayaç + 12px radius + kategori renkleri teyitli, sofra hub tık-navigasyon OK.
> Lead numstat+grep teyidi yapıldı. SS/progress: `mockups/outputs/wave1-{ta,tb}-*`.
>
> **🧱 FOUNDATION KARARLARI (Wave 2'den ÖNCE implement edilecek — patron onaylı 2026-06-16):**
> - **F1 — Pro üyelik:** tek SİTE-GENELİ tier'lı üyelik (Pro 1/2/3, reklam-ver `.pk-card` tier dili
>   mirası: bronz/gümüş/altın → t1/t2/t3, featured+flag). Tam UX: `pro-v1.html` (landing+karşılaştırma)
>   → `pro-odeme-v1.html` (odeme-v1 deseni) → `.pro-gate` (lg-gate kardeşi, `[data-pro-gate]`). Madde
>   8/10/13 hepsi bu TEK üyeliğin tier faydaları; per-creator ayrı ödeme YOK. **NET AYRI 2. katman:**
>   ücretsiz **"Abone Ol"** takip (`.creator-sub`, YouTube subscribe modeli: bildirim+feed, PARA YOK) —
>   içeriği AÇMAZ; premium kilidi yalnız ücretli **Pro** açar. (YouTube: subscribe ücretsiz, membership ücretli.)
> - **F2 — Rozet/şef-kademe:** 8 kademe CS:GO şef merdiveni (Çömez→Komi→Çırak→Aşçı→Usta Aşçı→Şef→Usta
>   Şef→Dada Üstadı), rozet birikimi→kademe atlama + progress bar. Referans: `mutfak-defteri` `.badge-band`
>   (kazanılan+kilitli kart dili). Yeni `rozetler-v1.html` galeri + `tasks/rozet-veri.md` + admin STUB.
> - **F3 — Nav:** YENİ top-level menü öğesi YOK; tüm nav eklemeleri tek idempotent sweep'te (Wave 3).
>
> **🌊 WAVE 2 PENDING (Foundation F1/F2/F3 implement SONRASI):** önce Foundation → sonra **8∥13∥9 paralel**:
> - **8 (diyetisyen pro):** `diyetisyen-profil` sat.~1457 `.pf-panel` linki kaldır + profil↔panel kuplajı
>   kopar + panele Pro özellik bandı + pro içerik `.pro-gate`. Panel zaten ayrı kabuk (panel-shell + 7 dyt).
> - **13 (video pro):** `video-mutfagi` — ücretsiz `.creator-sub` "Abone Ol" + premium seride `.pro-gate`
>   (ikisi NET AYRI) + creator profil/sosyal link. F1 tüketir, 8/10'dan bağımsız.
> - **9 (rozet):** F2 galeri+kademe dağıtımı; **`diyetisyen-profil` rozet bloğunu T-C ile KOORDİNE**
>   (8 profili sabitleyince 9 rozet bloğunu üstüne ekler — R3 çakışması).
> - **SONRA 10 (restoran):** 8'i mirror — `mekan-detay`'a "Rezervasyon Yap" modal (diyetisyen `.apt-modal`
>   3-ADIM İSKELETİ + **MASA REZERVASYONU semantiği**: Adım1 kişi sayısı → Adım2 tarih/saat → Adım3 onay/
>   başarı) + mekan paneli (panel-shell yeşil kardeşi: Rezervasyonlar/Müsaitlik/İşletme Profili) + "İşletmeni
>   Ekle" formu (diyetisyen-ol kardeşi). Ücret/depozito yok.
>
> **🧹 WAVE 3 PENDING — nav chrome-sweep (TEK idempotent sweep, ~57 dosya):** besin rehberleri + sofra
> detayları + Sağlıklı Yaşam besin submenu + restoran IA girişi (Keşfet-içi) + video pro etiketi + header
> "Pro'ya Yükselt". **ŞU AN besin/sofra sayfaları nav'a BAĞLI DEĞİL** (bilinçli) — breadcrumb + hub
> köprüleri üzerinden erişiliyor. Diğer dropdownlar (Tarifler/Mutfak Sırları) DOKUNULMAZ. Negatif grep +
> 2× idempotent re-run + dropdown-açık SS ile doğrula.
>
> **🔍 LEAD DENETİM PROTOKOLÜ (Wave 2'de de uygula):** teammate "bitti" deyince KANITLA doğrula — render
> SS 1440/768/390 + diff özeti (numstat) + acceptance kriteri kontrolü; her ~10 dk durum yokla; KANITSIZ
> done sayma. (İş bitince `tasks/bilesen-kilavuzu.md` Bölüm 5 "Agent Teams"e kalıcı kural eklenecek.)
>
> **📁 KÜÇÜK NOT:** Wave 1 SS/progress `mockups/outputs/` altında (kök `outputs/` yerine) — Wave 2'de
> tutarlılık için aynı yeri kullan.
> **📋 PLAN DOKÜMANI:** `tasks/revize-turu-plan.md` (madde→dosya eşlemesi, domain matrisi, wave planı,
> foundation spec F1/F2/F3, işaretli varsayımlar, teammate brief taslakları).
>
> Önceki: 2026-06-15 (**KEŞFET HERO SİTE STANDARDINA UYDURULDU ✅**
> commit `861657c` origin/main'e push'lu. 1 dosya (`mockups/kesfet-v1.html`) +51/−16. Beyar canlı SS turu.
> Keşfet hub hero'su, hub yeniden tasarımında bilinçli "düz beyaz hero" yapılmıştı → site geneli koyu
> görselli banner kullandığı için tutarsızdı. İKİ ADIMDA standarda çekildi:
> 1. **Koyu görselli banner hero (site kanonu = `lst-top`/kategori/mekan-detay):** `.ke-top` →
>    `linear-gradient(90deg,rgba(28,25,18,.93),rgba(33,30,22,.72))` + Unsplash v3a banner, `cover/center`,
>    `padding-top:128/74`. breadcrumb/eyebrow/H1/lead beyaza çekildi (crumb `#c9c3b8`, eyebrow `#ffd9cf`+
>    tomato dash, H1 `#fff`+text-shadow, accent `#ff7a5c`, lead `#e7edf1`). Sadece CSS — markup/gövde sabit.
> 2. **İstatistikler hero banner İÇİNE taşındı, TAB-ÖZEL:** beyaz gövdedeki `mkl-intro` stat'ı kaldırılıp
>    hero'ya `.ke-hero` 2-kolon grid + sağ `.ke-stats` kolonu eklendi (`lst-stats` birebir: dikey sol-ayraçlı,
>    ≤1024 yatay üst-ayraçlı). İki set markup'ta: `#keStatsMekan` (124 mekân/9 şehir/8.4B değerlendirme) +
>    `#keStatsGurme` (92 lezzet yazısı/18 lezzet rotası/9 şehir). `setTab` aktif tab'a göre toggle →
>    banner+başlık+lead ORTAK, yalnız sağ istatistik kolonu tab'a göre değişiyor. `mkl-intro`'da popüler
>    hızlı-filtre chip'leri kaldı. (Gurme sayıları temsilî mockup, 124/9/8.4B gibi.)
> DOĞRULAMA (Playwright 1440+390, Mekanlar direct + Gurme click): hero iki tab'da koyu banner + beyaz H1;
> `statsInsideHeroBanner=true` ikisinde; tab swap doğru (keStatsMekan↔keStatsGurme). Önceki hero tutarlılık
> fix'leriyle (scroll-reframe + alt-kategori kaldırma) birlikte **Keşfet hub artık site geneliyle tam tutarlı.**
> ALTYAPI: bu yeni mac'e **Node v24.16.0 (arm64 resmi tarball, ~/.local)** + **Playwright 1.61.0** (yalnız
> chromium headless-shell) kuruldu (brew/sudo'suz). Proje script'i: `NODE_PATH=~/.local/lib/playwright-env/
> node_modules node <script>.cjs`. + statusline.sh ctx penceresi düzeltildi (opus → 1M).
>
> **🔜 SONRAKİ:** Kalan **DadaMutfak revize maddeleri** (biriken liste) + mobil QA MAJOR/MINOR fix turu
> (`outputs/mobil-qa/MASTER-findings.md`) + Keşfet nav tıklama davranışı (Beyar referans pattern verecekti).
>
> Önceki: 2026-06-15 (**KEŞFET HUB CİLA — HERO TUTARLILIK + ALT-KATEGORİ KALDIRMA ✅**
> commit `3252c3e` origin/main'e push'lu. 1 dosya (`mockups/kesfet-v1.html`) +2/−38. Beyar canlı SS bulgusu.
> İKİ SORUN:
> 1. **Hero tab'lar arası tutarsız (KÖK NEDEN = scroll, markup değil):** Doğrudan yüklemede hero (`ke-top`:
>    crumb + LEZZET REHBERİ eyebrow + H1 + lead) her iki tab'da TAM + birebir aynıydı (zaten tek/ortak
>    kardeş eleman). Kırpılma yalnız **tab geçiş anında** çıkıyordu: `setTab()` scroll sıfırlamıyordu →
>    Mekanlar uzun (facet+18 kart) / Gurme kısa, kaydırılmış/clamp'lenmiş `scrollY` ortak hero'yu 112px
>    sabit header altında bırakıp crumb+eyebrow gizliyor, H1 kırpıyordu. **FIX:** `setTab()` içine
>    `window.scrollTo(0,0)` → her tab değişiminde (click + deep-link/popstate/back) hero hep tepeden
>    aynı çerçevelenir.
> 2. **Gurme ikinci-seviye alt-kategori şeridi KALDIRILDI (patron sevmedi):** `#keSub` div + `SUBMAP`/
>    `renderSub` mantığı + öksüz `.ke-subfilter/.ke-subchip/.sf-lbl` CSS (desktop+@640) silindi. Üst ana
>    chip rayı (Hepsi / Gurme Lezzetler / Etkinlikler / Lezzet Rotaları / Söyleşi) KORUNDU; chip handler
>    artık yalnız aktif-state toggle. `data-concept` attribut'ları inert kaldı (grid'i filtrelemiyordu).
> DOĞRULAMA (headless Chrome 149 — bu yeni mac'te Node/Playwright YOK, sistem Chrome ile): `?tab=mekan` +
> `?tab=gurme` desktop 1280 + mobil 390 → hero ikisinde TAM+aynı, Gurme'de alt-kategori şeridi ∅. Residual
> grep temiz (keSub/renderSub/SUBMAP/ke-subfilter = 0).
> ALTYAPI: git committer kimliği global ayarlandı (`By4r` / `beyarguness@gmail.com`); geçmiş commit'lere
> dokunulmadı (amend/force-push yok).
>
> **🔜 SONRAKİ:** Kalan **DadaMutfak revize maddeleri** (biriken liste) sıradaki iş. Ayrıca: Keşfet nav
> tıklama davranışı (Beyar referans pattern detayını verecekti) + mobil QA MAJOR/MINOR fix turu + diğer IA
> bulguları — `outputs/mobil-qa/MASTER-findings.md`.
>
> Önceki: 2026-06-15 (**KEŞFET HUB MILESTONE TAMAM ✅**
> commit `8d8710b` origin/main'e push'lu. 4 dosya +747/−2307. Plan: `tasks/kesfet-hub-plan.md` (Yaklaşım A).
> YAPILDI — nav "Keşfet" artık **tek tab'lı kanonik hub** (Mekanlar | Gurme Lezzetler), ana sayfa
> discover'ın `paneMekan/paneGurme` tab mantığı tam sayfaya taşındı:
> 1. **`kesfet-v1` = Keşfet hub.** Tek beyaz hub hero → `.ke-tabbar` (Mekanlar varsayılan aktif | Gurme) →
>    `#keBrowse`{`#paneMekan` + `#paneGurme`} + `#keDetail` (uzun-form makale) kardeş.
> 2. **Mekanlar pane** = `mekan-liste` facet kiti göçü (sticky facet sidebar semt/şehir/mutfak/bütçe/puan +
>    sort dd + `mkl-grid` 18 kart + mobil bottom-sheet). CSS lst-/fct-/sort-/mkl-/sheet- + @1024/@640
>    taşındı (dup kanon hariç); facet/sort/sheet JS göçü (shell JS taşınmadı).
> 3. **KARAR 2 — Popüler chip + stats (124/9/8.4B) KORUNDU** ama hub hero'yu tekrarlamadan paneMekan
>    içinde tek-satır kompakt `.mkl-intro` şerit (facet/grid üstünde). Tek hub hero kuralı bozulmadı.
> 4. **Gurme pane** = mevcut editöryal feed; konsept chip rayından **"Mekânlar" çıkarıldı** (tab oldu);
>    grid↔makale toggle korundu (keDetail artık `#keGrid` yerine `#keBrowse` gizler).
> 5. **Derin link** `?tab=mekan|gurme` (varsayılan mekan) + `?detay=1` kombinasyonu + pushState/popstate.
> 6. **KARAR 1 — `mekan-liste-v1` → redirect stub** (canonical + meta-refresh + JS replace + görünür
>    fallback, noindex/follow; sweep-uyumlu minimal shell) → `kesfet-v1.html?tab=mekan`.
> 7. **Linkler:** anasayfa discSeeAll + JS tab-swap + 3 gurme kart → `?tab=gurme`/`?tab=mekan`;
>    mekan-detay breadcrumb + "Tüm Mekânlar" → `?tab=mekan`. Üretimde mekan-liste linki (stub hariç) 0.
> DOĞRULAMA (headless Chrome render): desktop Mekanlar/Gurme tab + makale aç/kapa · mobil 390/768 intro
> stack + facet bottom-sheet (`?sheet=1`) · derin link `?tab=mekan|gurme|gurme&detay=1` · stub uçtan uca
> Mekanlar'a düştü · nav "Keşfet" `.active`. Çakışma yok (mekan-namespace CSS/ID kesfet'te ∅, enableDrag
> `.mkl-grid`'i kapmıyor).
>
> **🔜 SONRAKİ:** Kalan **DadaMutfak revize maddeleri** (bu hub işinden sonra biriken liste) sıradaki iş.
> Önceki turdan devam: mobil QA MAJOR/MINOR fix turu + (artık çözülen kategori-v1/tarif-liste değil ama)
> diğer IA bulguları — `outputs/mobil-qa/MASTER-findings.md`.
>
> Önceki: 2026-06-15 (**MOCKUP REVİZE TURU — 5 MADDE SHIP'LENDİ ✅**
> commit `01a18e5` origin/main'e push'lu, GH Pages canlı teyitli (`by4r.github.io/dadamutfak-view`).
> 66 dosya +907/−515. Tek idempotent Python sweep (regex, active-class koruyan) + 2 dosya elle (AI).
> YAPILDI:
> 1. **Ana menüye 2 yeni öğe** — "Keşfet" (`kesfet-v1.html`) + "Dolapta Ne Var?" ("Tarif Bulucu"dan
>    rename, `tarif-bulucu-v1.html`) — nav + drawer, **60 public-nav sayfası**. Bottom-nav dolu →
>    EKLENMEDİ (mobilde drawer'dan erişim — Beyar kararı). Aktif-state: kesfet→Keşfet, tarif-bulucu→
>    Dolap (yanlış Bugün-active temizlendi). +6 shop/akademi sayfası yalnız "Arama / Tarif Bulucu"
>    option rename aldı (toplam 66 dosya).
> 2. **AI desteği** — `tarif-ekle` Hazırlanış Adımları (3 statik kart + `addStep` template) +
>    `puf-noktasi-ekle` İçerik/Paragraf bloğu (CSS+JS PORT, sayfada yoktu). fDesc "Açıklama/Hikâye"
>    pattern'ı BİREBİR (`.ai-btn` "AI ile İyileştir" + `.ai-result` band Geri Al/Kabul Et;
>    spinner→900ms→enriched→"Yeniden Dene"). **Delegasyonlu** → dinamik eklenen bloklarda da çalışır.
>    Headless tık-testi: changed=true, band göründü, Keep/Undo mevcut (153→287 / 167→296 kr).
> 3. **"Sağlık" → "Sağlıklı Yaşam"** site geneli (nav/drawer/bottom-nav/breadcrumb/title/eyebrow).
>    **DOKUNULMADI (Beyar kararı):** "Sağlık & Beslenme" tab, "Sağlık Editörü" ünvanı, recipe
>    "Sağlıklı", href/slug/`.dropdown-health`/`.d-sub-health`, "Eline Sağlık" deyimi, prose.
> 4. **"Bugün Ne Pişirsem?" → "Ne Pişirsem?"** (nav/drawer/bottom-nav/title/breadcrumb/eyebrow +
>    **v3a hero H1** "Ne pişirsem?"). Prose "Bugün ne pişireceğine birlikte karar verelim" DOKUNULMADI.
> 5. **Nav sırası:** Tarifler ▾ · Ne Pişirsem? · Dolapta Ne Var? · Keşfet · Mutfak Sırları ▾ · Sağlıklı Yaşam ▾.
> DOĞRULAMA: idempotent (2. çalıştırma 0 değişiklik) + global negatif grep ∅ (eski isimler 0; kalan
> tek "Tarif Bulucu" = dokunulmayan CSS yorumu) + pozitif 60/60 + **nav taşma YOK** (Chrome headless
> ölçüm: 1025px & 1280px `overflow=false`; ~1040px logo↔Tarifler boşluğu sıkışık ama sarma/scroll yok).
> ALTYAPI (yeni mac): **gh CLI 2.94.0** `~/.local/bin`'e kuruldu (brew/sudo'suz, arm64 zip), SSH auth
> (By4r), remote HTTPS→SSH (`git@github.com:By4r/dadamutfak-view.git`), `~/.local/bin` PATH `.zshrc`'de.
>
> **🔜 SONRAKİ AÇIK KONU (gelecek oturum):**
> 1. **"Keşfet" nav tıklama davranışı** gözden geçirilecek — şu an Keşfet'e tıklayınca DOĞRUDAN
>    gurme/liste sayfası (`kesfet-v1.html`) açılıyor; beklenen davranış netleştirilecek. Beyar referans
>    olarak ana sayfadaki **"2 tab + Tümünü Gör aktif tab'a gider"** pattern'ından bahsetti → DETAYINI
>    BEYAR VERECEK.
> 2. **Diğer DadaMutfak revize maddeleri** (bu kolay batch sonrası kalanlar) bekliyor.
> 3. Önceki turdan devam: mobil QA MAJOR/MINOR bulgu fix turu + navigasyon IA kararı (kategori-v1 vs
>    tarif-liste) — `outputs/mobil-qa/MASTER-findings.md`.
>
> Önceki: 2026-06-14 (**MOBİL QA TAM TUR + 3 CİLA FIX SHIP'LENDİ ✅ —
> unattended, 5 tester paralel (T1-T5). `qa/cila-fixes` → main FF-merge + PUSH origin/main
> TAMAM, HEAD `9173124`, GH Pages canlı. 3 fix: (1) tarif-liste hero seam · (2) tarif-detay
> chip tekrarı · (3) Ramazan invite bandı mobil (5 sayfa, uzun metin gizle/sarı "Ramazan
> geldi" kalsın, desktop AYNEN). Hepsi desktop+390 before/after render-doğrulamalı.**
> FAZ A — MOBİL QA (read-only, tamam): 74 üretim sayfası × 390/768/drawer = 219 full-page SS,
> clip-aware ölçüm (`outputs/mobil-qa/measure.cjs`) + tasarımcı-gözü SS incelemesi. Lead
> self-partition doğrulama (tam-partition, çakışma 0) + adversarial doğrulama. **Sonuç: gerçek
> ölçülü taşma YALNIZ 1** (dyt-danisanlar @768, `.ptable` overflow-x:auto yalnız ≤640'ta → 768'de
> docSW=870). 🟠×5 (ansiklopedi 3-kol grid · urun-liste/dada-shop 2-kol · tarif-detay chip ·
> dyt-randevular + dyt-recete-builder scroll-affordance) · 🟡×7. **3 YANLIŞ-POZİTİF elendi**
> (T1 "drawer'a içerik sızması" hakkimizda/akademi/reklam-ver = fullPage SS artefaktı; lead DOM+
> viewport-SS ile kanıtladı drawer z96 fixed temiz, sayfa içeriği overlay ARKASINDA).
> Tam rapor: `outputs/mobil-qa/MASTER-findings.md` (severity-sıralı + "KARAR GEREKEN IA/UX" ayrı).
> FAZ B — 2 CİLA FIX (branch, tamam): (1) **tarif-liste hero seam** sert kesim → krem gövde yuvarlak
> köşe(22px)+yumuşak üst-gölge+-22px overlap = "yükselen panel" bitişi. (2) **tarif-detay chip tekrarı**
> → hero `.rd-badges`'ten özellik chip'leri (Protein/Baharatlı) kaldırıldı, yalnız editöryal rozet
> kaldı (özellik chip'leri kc-chips panelinde; headA deseni). İkisi de desktop+390 before/after render-
> doğrulamalı. Commit `d11db92`. **DOKUNULMADI (Beyar kararı):** navigasyon tutarsızlığı (kategori-v1 vs
> tarif-liste) · Sofra Ramazan/Bayram/Açık Büfe görsel tonu.
> **🔜 SONRAKİ:** Beyar MASTER-findings'i inceleyip (a) qa/cila-fixes merge/push kararı, (b) MAJOR/MINOR
> bulgu fix turu (özellikle C1 dyt-danisanlar 768 taşma + ansiklopedi/urun grid + sağlık nav-aktif renk),
> (c) navigasyon IA kararı. RUN-STATUS: `outputs/mobil-qa/RUN-STATUS.md`.
>
> Önceki: 2026-06-13 (**FAZ 7 — SOFRA DÜZENİ MODÜLÜ —
> agent team `faz7-sofra` (lead delegate + 2 teammate: sofra-sayfa A + dropdown-sweep B).
> COMMIT+PUSH onaylı, HEAD `3c1a2a5` (60 dosya +2253).**
> TAMAM:
> 1. **Yeni hub sayfa `sofra-duzeni-v1.html`** (2135 satır, A — frontend-design skill;
>    mutfaga-giris mirası): §2f H1 koyu-overlay hero (h1 "Sofra Düzeni" accent "Düzeni",
>    lead AYNEN, breadcrumb Ana Sayfa › Mutfak Sırları › Sofra Düzeni, metrik 8 Kategori/
>    32 İpucu/A–Z) + gnav scroll-spy (8 çapa, overflow-x:auto BAŞTAN, 390 taşma=0
>    scrollWidth=375) + seo-intro + 8 disc-card vitrin (#anchor) + 8 `.sof-row` detay
>    bölüm (media + AYNEN açıklama + 32 `.sof-tip` İpucu). 8 kategori isim+açıklama AYNEN.
>    ⛔ **SHOP/DadaStore köprüsü YOK** (grep+göz teyit; sadece miras topbar dünya-kapısı).
>    Kapanış = yalnız Mutfak Sırları köprüsü.
> 2. **Dropdown sweep — 60 sayfada "Sofra Düzeni" item** (Mutfak Sırları, Ölçü Birimleri'nden
>    SONRA, fa-utensils, TURUNCU kanon). B: 59 mevcut sayfa (_shell dahil, href-agnostik
>    anchor → olcu/headA href="#" varyantları da yakalandı = lead'in href-grep false-clean'i
>    düzeltildi) + A'nın sayfası kendi aktif-item'ı (class="active", alt-metin kanona hizalı).
>    Kanıt: 59×(+2/-0) saf insert, GLOBAL negatif grep ∅ (desktop+drawer), .dropdown-health
>    (Sağlık yeşili) + Tarifler mega DOKUNULMADI, idempotent, 5 aileden dropdown-açık SS.
> 3. **Görseller table-setting'e çekildi** (v1 eski tarif/tabak ID'leriydi = konu yanlış,
>    patron yakaladı): lead web araması + curl-200 + thumbnail göz-teyit ile 9 ID küratörlüğü,
>    A replace-all (her id 2 instance + hero 1, v3a suffix korundu). Çocuklu v3 = kurulmuş
>    renkli parti masası (`1642267877584`; mavi-kavanoz reddedildi). **Ramazan
>    (`1773314863076`) + Bayram (`1780586383003`) MEVCUT KALDI — patron kararı (R-A hurma /
>    B-A tatlı tepsisi adayları sunuldu, "kalsın" denildi).** Rapor: `outputs/sofra-duzeni-gorsel-ID.md`,
>    SS: `outputs/sofra-duzeni-ss/`.
>
> **OPSİYONEL CİLA (Sofra Düzeni):** Ramazan+Bayram görselleri "kurulmuş masa" tutarlılığı
> %100 değil (mevcut tutuldu, tema-tanınması yeterli görüldü); Açık Büfe görseli biraz karanlık.
> İstenirse tek-satır swap (adaylar gorsel-ID.md yedek havuzunda + R-A `1723134638440` /
> B-A `1766773443039` hazır).
>
> **🔜 SONRAKİ FAZ:** kapsamlı MOBİL QA (3 agent 390/768/drawer — Yasin Bey bulguları:
> Ramazan bandı taşma, hero okunabilirlik) + **cila bugları SİSTEMATİK tarama**: (1) kategori-v1
> vs tarif-liste nav tutarsızlığı (iki farklı liste sayfası), (2) tarif-liste hero alt-gölge
> kesik, (3) tarif-detay hero özellik-chip tekrarı (sağ panelle). Detaylar aşağıda "CİLA/MOBİL QA".
>
> Önceki: 2026-06-13 (**SAĞLIK DROPDOWN CHROME MİNİ-TUR —
> agent team (lead delegate + 1 teammate saglik-dropdown). 57 sayfa, COMMIT+PUSH onaylı.**
> Sağlık nav dropdown'u kanona çekildi (chrome-fork'suz, scoped):
> 1. **Yeşil chrome (57 sayfa):** `.dropdown-health` scoped class + `[href=saglik-hub]`
>    attribute-selector → Sağlık dropdown ikon/hover + nav-item hover YEŞİL #3BB77E.
>    Global `.dropdown a`/`.nav a:hover` EZİLMEDİ → diğer dropdownlar (Tarifler/Mutfak
>    Sırları/BNP) TURUNCU kaldı (lead Playwright: non-health ikon rgb(225,72,39) ✅).
> 2. **Item tutarlılığı:** desktop kanon 3 item (Hesaplayıcılar→hesaplayici-v1.html [11
>    href sapması fix] + Testler [3 eksik eklendi] + Diyetisyen Ara); drawer Testler 57
>    sayfada eksikti → eklendi.
> 3. **Aktif-state (12 sağlık sayfası):** dropdown current item .active yeşil (mapping:
>    Hesaplayıcılar×7+hub, Testler×2, Diyetisyen×2, besin=yok); aktif item turuncu
>    underline `::after{display:none}` (Beyar: diğer dropdownlarda yok, tutarlı).
>    **test-detay çift-active düzeldi** (Tarifler .active kaldırıldı → nav active=1 sadece
>    Sağlık, probe teyitli). **REGRESYON yakalandı+fix:** saglik-testler + saglik-hub
>    nav-active green override eksikti (saglik-renk 10'una dahil değildi) → turuncuydu,
>    eklendi (lead Playwright: ikisi de yeşil ✅).
> 4. **DRAWER (mobil) kapanış fix** (commit eaf26f7): dropdown turu desktop'u yeşilledi
>    ama mobil drawer Sağlık alt-menü ikonları (.d-sub a i) TURUNCU kalmıştı (Beyar
>    mobilden yakaladı) → scoped `.d-sub-health` class (57 sayfa) + yeşil CSS; diğer
>    drawer submenu'lar (Tarifler/Mutfak Sırları) turuncu kaldı (Playwright teyitli).
>    _shell + tarif-detay-v1-headA scope dışı (revert).
>
> **BU OTURUM COMMIT'LERİ (hepsi push'lu):** dropdown chrome `b38c7ff` · alisveris hero
> hover `a433e49` · drawer ikon yeşil `eaf26f7` · **dropdown aktif-item tüm menülerde
> `3262be8`** (Mutfak Sırları 9 sayfa + Tarifler mega "Tüm Tarifler"; aktif item TURUNCU
> kanonu, Sağlık yeşil korundu; generic .dropdown:not(.dropdown-health) a.active +
> .mega-cats a.active bg-tint, underline gizli; BNP dropdown'suz) · **tarif-liste chip ×
> ↔ subcat çift-yönlü senkron `16d2916`** (chip ×/Tümünü Temizle artık change dispatch
> → subcat kart deaktif; kök neden: programatik .checked change fire etmiyordu) (+ docs).
> Kanıt: lead Playwright computed-style + interaction probe + SS. idempotent.
> Rapor: outputs/saglik-dropdown-rapor.md. Teammate + artefaktlar temizlendi.
>
> ✅ **alisveris hero buton HOVER ÇÖZÜLDÜ** (commit a433e49): kök neden = base cam stili
> (.al-top .al-head .see-all/.al-act, spec 0,3,0) `.see-all:hover/.al-act:hover` (0,2,0)
> tomato kuralını EZİYORDU → 3 buton hover'da hiç değişmiyordu (Playwright CHANGED:false
> kanıtladı — kapanış turu "repro edemedik" hatası buydu). Fix: yüksek-spec görünür cam
> hover (bg .12→.26 + border .22→.6 + translateY(-1px) + shadow); 3 buton CHANGED:true.
>
> Önceki: 2026-06-13 (**KAPANIŞ DOĞRULAMA + 2+2 İŞ TURU —
> agent team `kapanis-turu` (lead delegate + 3 teammate). COMMIT YOK (Beyar onayı
> bekliyor). Baz `48773db`. 15 dosya +466/-93, hepsi numstat+render kabul.**
> YAPILANLAR:
> 1. **MCP doğrulama** (read-only): hero turu 48773db **6/6 ✅, 🔴=0** — subcat+facet
>    (248→22)+mouse-drag · tarif-detay tek-anchor · BNP grace/backfill · puf chip
>    nowrap+fade · anchor-offset 8 sayfa scroll-padding-top:128 · 3 wrapper bleed=0.
>    (🟡 container gerçek class `.subcat-strip`.) Rapor `outputs/dogrulama-rapor.md`.
> 2. **arama-v1 autocomplete dropdown**: `.sr-ac` panel, debounce 150ms, klavye
>    ↑↓/Enter/Esc/Home/End, ARIA combobox tam, veri kaynağı `#srPop`, `<mark>` vurgu,
>    ikon div+bg-image. (300/1.)
> 3. **Sağlık ailesi renk tutarlılığı** (10 sh sayfası): turuncu sağlık-aksanı →
>    **#3BB77E** CERRAHİ. Marka chrome (logo/topbar/Diyetisyen-Ol-CTA/FAB/footer/
>    §2f hero overlay/r-card/gauge-risk/besin-yağ-makro) DOKUNULMADI. diyetisyen-dizin
>    handoff-işaretli tutarsızlık çözüldü (hero accent + facet + CTA yeşil + nav
>    aktif-link cerrahi). Petrol #006072=DadaAkademi karıştırılmadı.
> 4. **tarif-liste subcat aktif-state modernize**: kaba çift-çerçeve (inset ring +
>    ikon 2px ring) KALDIRILDI → ince tomato border(.32)+yumuşak elevation+ikon-altı
>    minimal indicator. facet/drag/§2f dokunulmadı. (11/4.)
> 5. **alisveris hero buton katman fix**: 3 buton (Haftalık Menü→haftalik-menu /
>    Yazdır-PDF / Paylaş-popover) z-index sertleştirme (.wrap z:5, .al-actions z:6
>    pe:auto, popover z:40) + siparislerim/giris guard. **LEAD Playwright tıklama
>    teyitli** (navigasyon çalıştı). ⚠️ Agent+lead orijinal "çalışmıyor" semptomunu
>    ÜRETEMEDI — şu an 3 buton fonksiyonel; Beyar belirli state'te görürse repro lazım.
> 6. **EK — topbar DadaStore pill iç hizalama** (lead, 58 sayfa sweep): görünmez hover
>    oku `.tw-arr` (opacity:0 ama flow'da) sağda yer rezerve edip içeriği 15px sola
>    kaydırıyordu → `.tw-arr` rest ayak izi sıfırlandı (max-width:0+margin-left:-8px+
>    overflow:hidden), hover reveal korundu (max-width:16px+margin-left:0). LEAD
>    Playwright: asimetri 15px→-1px, hover ok 0→8px çalışıyor. Sadece DadaStore içeriği;
>    pill konumu/DadaAkademi/§2f dokunulmadı. **TOPLAM TUR: 58 dosya +582/-209.**
>
> **🔑 saglik-renk LEAD KARARLARI:** (1) zorunlu-yıldız `.req` turuncu KALDI (form-
> semantik). (2) Sağlık dropdown İÇİ hover ikonları DOKUNULMADI (chrome-fork riski →
> Beyar'a defer) → bu kararla **arama-v1 Sağlık-dropdown seri-patch'i İPTAL** (arama
> saglik sayfası değil). (3) diyetisyen-ol captcha yasal link yeşil (geri alınabilir).
> (4) test-detay ikili-active (Tarifler+Sağlık) ayrı tutarsızlık, kapsam dışı.
>
> **🔜 SONRAKİ MİNİ-TUR — SAĞLIK DROPDOWN CHROME DÜZELTMESİ** (commit e1a26cd sonrası,
> AYRI tur; bu turda YAPILMADI — saglik-renk chrome-fork riski diye bırakmıştı). 3 madde
> AYNI KÖK = Sağlık nav dropdown chrome, tek mini-turda birlikte:
> 1. **Dropdown İÇİ aktif item yeşil:** "Sağlık" mega-menü dropdown'ında aktif item
>    ("Testler" vb) hâlâ TURUNCU/krem → sağlık ailesinde YEŞİL `#3BB77E` olmalı.
> 2. **Item listesi tutarlılığı:** dropdown item listesi sayfalar arası tutarsız (bazı
>    sayfada "Testler" girişi eksik/yanlış aktif) → TÜM sağlık sayfalarında item listesi
>    AYNI+TAM (Hesaplayıcılar + Testler + Diyetisyen Ara), aktif-state TEK doğru.
> 3. **test-detay ikili-active:** markup'ta hem Tarifler hem Sağlık `.active` → SADECE Sağlık.
> KÖK NEDEN İLK: Sağlık dropdown ortak `_shell` mi sayfa-inline mi tespit (topbar gibi
> inline+birebir olabilir) → tek-tip fix. `.nav-item.health` hook gerekebilir (chrome-fork
> dikkat — saglik-renk bu yüzden bırakmıştı). Kanıt: dropdown açık render SS + aktif item rengi.
>
> **🔜 SONRA:** Faz 7 Sofra Düzeni modülü (Mutfak Sırları altı, 8 kategori, DadaStore
> köprülü) → **SONRA kapsamlı TEK mobil QA** (3 agent 390/768/drawer; Yasin Bey mobil
> bulguları dahil — Ramazan bandı, hero okunabilirlik). Bekleyen patron kararları +
> diyetisyen-ol captcha-link + #6 alisveris repro durur. Sentez: `outputs/kapanis-turu-sentez.md`.
>
> **🧹 CİLA/MOBİL QA TURU BULGULARI (fix sonraki turda, mobil QA ile birlikte):**
> 1. **Kategori navigasyon tutarsızlığı:** Anasayfa "Kategoriler & Dünya Mutfakları"
>    kartı → `kategori-v1.html` (Anadolu Mutfağı + "Alt kategoriler" şeridi); Tarifler
>    menüsü → `tarif-liste-v1.html` ("Tema & pişirme tipi" şeridi). İKİ farklı liste
>    sayfası = kafa karıştırıcı. KARAR GEREK: hangi giriş hangisini açmalı (öneri:
>    kategori-v1 = belirli kategori detayı, tarif-liste = genel dizin — ama kullanıcıya
>    net olmalı). Mobil QA turunda navigasyon haritası çıkarılıp tutarlı bağlanacak.
> 2. **tarif-liste hero alt-gölge/sınır kesik:** tarif-liste-v1 hero'sunun alt
>    gölgesi/sınırı düzgün değil (kesikli) → cila turunda düzeltilecek.
> 3. **tarif-detay-v1 hero özellik-chip tekrarı:** hero görselinin ÜSTÜNDEKİ özellik
>    chip'leri (Protein Ağırlıklı / Baharatlı / Acılı vb) sağdaki "Mutfak & Özellikler"
>    panelinde ZATEN var = tekrar, kalabalık. Cila turunda NET KARAR: ya görsel
>    üstündeki ÖZELLİK chip'lerini kaldır (Editör Onaylı/Diyetisyen Yorumlu FARKLI,
>    kalsın), ya sağ panelle tekrarı temizle.
>
> Önceki: 2026-06-13 (**HERO TURU + tarif-liste düzeltmeleri
> — agent team `hero-turu` (lead + 4 teammate: hero-zengin, tarif-liste-fix,
> tarif-liste-kategori, anchor-offset). COMMIT (48773db) + push. Baz `66a33d5`.**
> YAPILANLAR:
> 1. **23/23 sade hero → görselli H1** (hero-zengin): denetim raporu (`outputs/hero-denetim.md`)
>    → Beyar onayı → uygulama. §2f H1 OVERRIDE (patron kararı, araç sayfaları dahil). Reçete
>    kanonu = mutfaga-giris .lst-top (`outputs/hero-sablon.md`): koyu/yeşil overlay + Unsplash
>    v3a + padding-top:128/74 + beyaz crumb. sh-yeşil 9 (sağlık ailesi) + lst-domates 14. 3 wrapper
>    (alisveris-listesi=markup-split .al-body krem · siparislerim=bg-band 252px · giris=login-hero
>    split) CERRAHİ — bleed yok, lead render+göz teyitli.
> 2. **tarif-liste subcat görselli şeridi** (tarif-liste-kategori, #4): düz pill REDDEDİLDİ →
>    kategori-v1 `.subcat-sec` deseni port (14 görselli kart sc-ico + ad + sayaç, .lst-bar üstü,
>    tıkla→facet Çorba 248→22). **EK-5 (#11) DEVAM EDİYOR:** mouse drag-scroll fix + aktif state
>    rafine + isabetli görseller + list-view görselsiz kart (Zeytinyağlı Enginar) doldurma.
> 3. **#3 kart başlık taşması + meta hizalama** (clamp `.r-body h4 a` doğru elemana) ·
>    **#5 mutfaga-giris scroll-spy son sekme** (sayfa-sonu override) · **#6 tarif-detay satır
>    tam-tıklanabilir** (tek anchor) · **#7 BNP wizard çoklu sonuç** (computeMatches grace/backfill) ·
>    **#9 puf-noktalari chip tek-satır şerit** (.ke-filter nowrap+overflow+fade) — hepsi tarif-liste-fix.
> 4. **#10 anchor-offset scroll-offset fix** (anchor-offset): 8 sayfa (reklam-ver, akademi, hakkimizda,
>    sozluk, mutfak-defteri, urun-detay, video-mutfagi, mutfaga-giris-detay) sticky-nav→section jump
>    başlık sticky altında kalıyordu → scroll-padding-top (header + sticky-sub-nav yüksekliği, per-page).
>
> **⚠️ MCP DOĞRULAMA YENİ SESSION'A:** ctx limiti nedeniyle lead faz-sonu MCP etkileşim turu
> YAPILMADI. Yeni session'da KISA tut: #4 subcat scroll+facet · #6 satır-nav · #7 wizard akış ·
> #9 chip scroll · #11 subcat mouse-drag + liste görselsiz-kart=0 · anchor-offset 8 sayfa başlık-
> görünürlük · 23 hero + 3 wrapper mobil 390 taşma örneklemi. Her birinde 1 probe yeter. (3 wrapper
> hero + render-riskli olanlar lead'çe zaten render-göz teyitli; kalan etkileşim + mobil 390.)
>
> **🔜 SONRAKİ TUR (mini, mobil QA sonrası):** arama-v1 **autocomplete dropdown** — input'a yazdıkça
> öneren dropdown (debounce ~150ms, klavye ok+Enter, son aramalar + popüler öneriler, ARIA combobox).
> AYRI mini-tur. + **Final mobil QA** (3 agent paralel 390/768/drawer) + **Faz 7 Sofra Düzeni modülü**
> (Mutfak Sırları altı, 8 kategori, DadaStore köprülü).
> + **Sağlık ailesi RENK TUTARLILIĞI** — diyetisyen-dizin-v1 + Sağlık dropdown menü/butonu + diğer
>   sağlık sayfaları TURUNCU (domates) vurgu yerine SAĞLIK YEŞİLİ (#3BB77E) kullanmalı. diyetisyen-dizin
>   sağlık ailesinde ama hero/vurgu/popüler-chip TURUNCU kalmış (tutarsız). **NOT: kurumsal petrol
>   #006072 = DadaAkademi'ye ait, KARIŞTIRMA.** Beyar hangi yeşil tonu net seçecek (sağlık-tint #3BB77E
>   mi başka mı). Tüm sh grubunda (bazal-metabolizma, BMI, gunluk-kalori, gunluk-su, ideal-kilo,
>   vucut-tipi, besin-kutuphanesi, test-detay, diyetisyen-dizin/diyetisyen-ol) vurgu rengi denetimi.
>
> Lessons +2 (zsh word-split → kör lead sayacı → yanlış stall/devir; numstat+name-only birincil ·
> render-zorunlu-kabul: grep "done" der ama lead göz/SS teyidi şart, 2 wrapper bleed bunu kanıtladı).
> Raporlar: `outputs/hero-turu-*-rapor.md` + `outputs/hero-denetim.md` + `outputs/hero-sablon.md`.
>
> Önceki: 2026-06-13 (**FAZ 6 KAPANDI + COMMIT + PUSH —
> son cila + tarif modülü; agent team `faz6` (lead + 5 teammate), 5 ana görev +
> 2 EK REVİZE + Flag 2 hepsi LEAD BAĞIMSIZ KANITLI KABUL (git diff + grep +
> DOM/element-rect probe + faz-sonu MCP/izole-chrome render SS tasarım-gözü).
> feat `12044a4` + docs kapanış + PUSH origin/main (Beyar onayı 2026-06-13).
> Baz `0ad9576` → 72 dosya +1540/-443 (Flag 2 dahil).**
> 1. **Hero tutarlılık** — sistem zaten ~%97 §2f uyumlu; tek gerçek kırık
>    mutfak-sirlari → H1 koyu-overlay (+54/-20). bugun-ne-pisirsem/tarif-bulucu/
>    kesfet bu commit'te H3 kaldı — Beyar HERO TURUNDA hepsini görselli yapacak (aşağı).
> 2. **Tarif modülü** (tarif-ekle-v1 zenginleştirildi, sıfırdan değil): çoklu
>    kategori(27)+mutfak (ms-* token-chip) · AI ile İyileştir (mockup sim) ·
>    gerçek drag-drop (SortableJS 1.15.2 CDN, sitede İLK — malzeme+adım renumber).
> 3. **Tarif liste**: 9→15 kart (grid dengeli) · Öğün facet (ayrı eksen) ·
>    `.r-diet` görsel rozet · h4 2-satır clamp · page-local sticky clip. +EK REVİZE:
>    Beslenme/Tip facet 14 satıra FA6 ikon (kart↔filtre 4 tip birebir).
> 4. **SEO içerik**: ansiklopedi-v1 15 kategori × 30 gerçek madde (Nedir/Faydaları);
>    "yakında" placeholder=0 (kapı rozeti korundu); öksüz CSS silindi. sozluk +
>    ansiklopedi-detay zaten doluydu (dokunulmadı).
> 5. **Tutarlılık temizlik**: DadaStore birliği (14 dosya, "Dada Store"=0) +
>    kronik drift kapandı (mutfaga-giris/olcu Tarifler dropdown kanonik,
>    "Ana Yemekler"=0, data-slug=22) + sticky clip 20 sayfa (19/19 stick-ok).
> 6. **EK REVİZE BNP havuz**: yuvarlak pill `.rp-tab` → alt-çizgi segment (§2e
>    .vw-seg akrabası); aktif radius=0, filtre 31→6→5, CSS-only.
> + anasayfa shop eyebrow "Dada Shop"→"DadaStore" (lead kapattı).
>
> + anasayfa shop eyebrow + Flag 2: tüm "DadaShop"/"Dada Shop" → **DadaStore**
>   (65 dosya + _shell, global grep=0). Marka artık her yerde DadaStore.
>
> Sentez+inceleme: `outputs/faz6-sentez.md`. Lessons +2 (global-grep drift ayrımı ·
> probe disk-cache ?cb=). SS: `outputs/faz6-tour/` + `faz6-ss/`. Takım kapatıldı.
>
> **FLAG KARARLARI (Beyar 2026-06-13):** Flag 2 (DadaShop→DadaStore) ✅ YAPILDI.
> Flag 3 (r-chip "Çorbalar/Tatlılar" tekilleştirme — hata-v1/mekan-detay-v1) ⏸️
> ERTELENDİ (kozmetik). Flag 4 (ansiklopedi "480 madde" sayacı temsilî → Laravel
> fazı) ⏸️ ERTELENDİ. Flag 1 (3 hero) → aşağıdaki HERO TURUNA dahil edildi.
>
> 🔜 **SIRADA — ÖNCELİK SIRASIYLA:**
> 1. **HERO ZENGİNLEŞTİRME TURU** (Beyar net istedi, AYRI TEMİZ SESSION — bu
>    session ctx %70'te kapatıldı, başlatılmadı): TÜM üretim sayfalarında (71) hero'su
>    SADE/GÖRSELSİZ (düz beyaz, kompakt, arka plan resmi yok — BNP, tarif-bulucu,
>    olcu-birimleri, kesfet ve benzeri HEPSİ — **İSTİSNA YOK, araç sayfaları dahil**)
>    olan her sayfa → zengin görselli H1 hero. Referans kanon = mutfaga-giris-v1
>    (arka plan görseli + koyu overlay + başlık + breadcrumb + uygunsa metrik şeridi).
>    **§2f H1 OVERRIDE edilecek** (önceki "H3 görev sayfası görselsiz" kuralı patron
>    kararıyla geçersiz). Akış: ÖNCE 71 sayfa hero denetim raporu
>    (`outputs/faz6-hero-denetim.md` — sade hero listesi + sayfa-başı görsel teması
>    önerisi: BNP=yemek/menü, tarif-bulucu=malzeme/dolap, olcu=tartı/ölçek/alet,
>    sağlık=sağlıklı tabak vb) → BEYAR ONAYI → uygula. Mevcut hero içeriği
>    (başlık/altbaşlık/breadcrumb) korunur, sadece görselli zemin+overlay eklenir;
>    SAYFA GÖVDESİNE DOKUNMA. Kanıt: değişen her sayfa render SS + tasarım gözü.
> 2. **FİNAL MOBİL QA** — 3 agent paralel viewport bölüşümü (390/768/drawer+etkileşim),
>    read-only. **Yasin Bey mobil bulguları DAHİL** (Ramazan bandı taşması, hero
>    okunabilirlik vb).
> 3. **FAZ 7 — Sofra Düzeni modülü** (Mutfak Sırları altı, 8 kategori, DadaShop[Store]
>    köprülü — patron talebi).
> Ertelenen flag'ler (3, 4 yukarıda) + bekleyen patron kararları (Su Bardağı ölçü,
> Ramazan modu, M2 sosyal login, reklam paket fiyatları, Şef Ol hedefi) dursun.
>
> Önceki: 2026-06-13 (**FAZ 5 REVİZE TURU KAPANDI —
> agent team `faz5-revize` (lead + 4 teammate), 8/8 madde kanıtlı kabul + COMMIT +
> PUSH**). İlk 7 madde + mini-revize (A/B/C) hepsi lead bağımsız kanıtlı kabul
> (grep + tıklama/DOM probe + kendi channel:chrome SS tasarım-gözü):
> 1. **Duplicate menü temizliği** — DadaStore/DadaAkademi ana menüden kalktı (topbar
>    markalı kapı kanon), 58 sayfa (56 sweep + 2 divergent patch mutfaga-giris/olcu),
>    mobil drawer-foot kapı; global negatif grep=0, iki md5 idempotent.
> 2. **Kurumsal kimlik kılavuzu projeye alındı** (`tasks/corporate-identity-guideline.pdf`
>    + `tasks/kurumsal-renk.md`): petrol `#006072` = Pantone 3155 C BİREBİR →
>    DadaAkademi petrol kararı kurumsal teyitli. akademi çift "Ana Site" kaldırıldı.
> 3. **Shop section ritmi** — krem ÇIKARILDI (Beyar) → beyaz/gri(v3a)/KOYU band;
>    hero/bambu/bej-kart kimlik korundu. (Görselli-band opsiyonu eklenmedi, koyu band onaylı.)
> 4. **Form 2-kolon + Hibrit panel** (diyetisyen-ol+sef-ol): sticky-broken kök-neden
>    (`overflow-x:hidden`→`clip`) çözüldü; Hibrit = örtüşen bölüm-nav + pasif başvuru
>    süreci timeline.
> 5. **BNP** — floating menü tepsisi (grid itmez overlay) + mod→2 alt-tab (Sıfırdan
>    Kur/Hazır Menüler) + düzenlenebilir menü adı (dirty-flag, defter `#mdRename` bağı)
>    + cookmode her-yemek-process + "Menülerime Git"; haftalik "Ekle" fix.
> 6. **Markalı PDF** — alisveris-listesi jsPDF + Gilroy gömülü (TR glyph), "TAMAMLANDI" kalktı.
> 7. **tarif-bulucu** kategori şeridi enableDrag fix + fade (Faz-4 enableDrag dersi).
>
> **COMMIT: feat `0ad9576` + docs kapanış commit + PUSH origin/main (Beyar onayı
> 2026-06-13) — GitHub Pages güncel.** Sentez: `outputs/faz5-revize-sentez.md` +
> 4 teammate raporu. Lessons +3 (global negatif grep · sticky-overflow · iCloud cp-tuzağı).
> Takım KAPATILDI.
>
> 🔜 **SIRADA — FAZ 6** (detayı Beyar Faz 6 başlarken verecek). FAZ 6'YA TAŞINAN NOTLAR:
> - **Hero tutarlılık denetimi** (çıplak herolar → zengin standart, §2f kanonu).
> - **mutfaga-giris + olcu kronik kategori drift'i** (drawer Tarifler alt-menüsü eski
>   etiketler — Çorbalar/Ana Yemekler vs kanonik Çorba/Kırmızı Et; Faz-4 entegrasyonuna girmemiş).
> - **Site-geneli sticky bug** (`overflow-x:hidden`→`clip` shell'e mi sayfa-bazlı mı yayılsın).
> - **Final mobil QA** → 3 agent paralel, viewport bölüşümü (390 / 768 / drawer+etkileşim), read-only test.
> - **Faz 7 adayı: Sofra Düzeni modülü** (Mutfak Sırları altı, 8 kategori, DadaShop köprülü — patron talebi).
> - Bekleyen patron kararları: Su Bardağı ölçü (200↔240ml) · Ramazan modu · M2 sosyal
>   login seti · reklam paket fiyatları · "Şef Ol" hedefi (m12).
>
> Önceki: 2026-06-13 (**CİLA-2 FAZ 5 TAMAM — agent team
> cila2-faz5 (lead delegate + 6 teammate), 6/6 görev kanıtlı kabul**: KABUKLAR +
> ÜYELİK SOSYAL + BNP AKIŞI + ALIŞVERİŞ LİSTESİ. (1) **header**: siyah topbar
> yeniden — Tarif Ekle/Testler KALKTI, sağda 2 markalı DÜNYA KAPISI DadaStore
> (domates) + DadaAkademi (petrol, Yakında) + Tarifler dropdown standardı (22
> kategori→`tarif-liste?kategori=<slug>`, "Tüm Tarifler" düzeniyle aynı). (2)
> **akademi-kabuk**: DadaAkademi AYRI KABUK (dada-shop kardeş deseni — kendi nav
> Akademi/Eğitimler/Eğitmenler/Sertifika/SSS, ana-site nav YOK, Ana Site dönüş;
> Eğitim Setleri/Konular/Eğitmenler/Sertifika/SSS body; H1 koyu hero). (3)
> **shop-cila**: çift "Ana Site" kaldır (dönüş tek+sol-üst) + hero-header nefes
> (23px) + tekdüze zemin→cream-2 alternasyon + .shop-flow seam + bambu ayraç. (4)
> **uyelik-sosyal**: telefon kayıt/giriş (au-seg) + diyetisyen kayıt köprü
> (→diyetisyen-ol) + sosyal profil (diyetisyen-profil püf sekmesi + Takip Et) +
> TAKİP/GİZLİLİK geçidi (?takip=1/0; public'te Kaydedilenler+Menüler .pf-fgate→
> pf-lock/pf-full). (5) **bnp-akis**: BNP 2-TAB (Tarif Ara wizard / Yemek Modları)
> + SIFIRDAN MENÜ (mod→tarif→tepsi→kur) + "MENÜYÜ PİŞİR" (cookmode miras,
> KOLAYDAN ZORA adım adım, ?cook=1) + mod kartı büyüt (236×152) + gölge fix. (6)
> **defter-menu**: menü içi düzenleme (?menu=/?havuz=, .pf-full içine, gizlilik
> geçidi korundu) + ALIŞVERİŞ LİSTESİ akışı (tarif-detay→gerçek dm_shoplist
> transfer + reyon eşleme + Yazdır/PDF + Paylaş popover). KONSOLİDE CHROME SWEEP
> 58 sayfa (topbar+dropdown+Alışveriş Listem link): CSS-yutma 0, idempotent re-run
> md5 birebir, sızıntı 0, net-neg 4=shop-back (meşru). Render SS turu (izole
> channel:chrome) + lead tasarım-gözü. **⚠️ BEYAR KARARI: DadaAkademi kimlik
> rengi — kabuk DOMATES ama topbar kapısı PETROL, tutarsız; petrol (önerilen) ya
> da domates seçimi → tek-tur fix. akademi-kabuk petrol-varyant HAZIR (uygulamadı).**
> Sentez+inceleme: `outputs/cila2-faz5-sentez.md`. **DEPLOY: feat commit `3b6bf82` +
> docs commit (kapanış) + PUSH origin/main (Beyar onayı 2026-06-13) — GitHub Pages güncel.
> DadaAkademi=PETROL Beyar kararı uygulandı (akademi-v1 token repoint). Takım kapatıldı.**
>
> 🔜 **SIRADA — FAZ 5-SONRASI REVİZE TURU (Yasin Bey/Beyar geri bildirimi):** (1) duplicate
> menü temizliği · (2) DadaAkademi kurumsal renk (petrol uygulandı; kurumsal ince ayar) ·
> (3) shop section keskinleştirme · (4) form 2-kolon düzeni · (5) BNP her-yemek-process +
> "menüye git" butonu + sticky menü · (6) haftalik-menu "ekle" fix · (7) markalı PDF. SONRA
> **FAZ 6**: tarif modülü + SEO + tutarlılık + final mobil QA. Bekleyen patron kararları
> dursun: Su Bardağı ölçü (200ml↔240ml), Ramazan modu, M2 sosyal login seti, reklam paket
> fiyatları, "Şef Ol" hedefi (m12).)
> Önceki: 2026-06-13 (**CİLA-2 FAZ 4 TAMAM — agent
> team cila2-faz4 (lead + kategori-tarif + kategori-sirlar + kategori-kesfet-bnp
> + ux-revize)**: Excel `KategoriEkle.xlsx` (11 sheet) GERÇEK üretim kategorileri
> mockup'a işlendi (temiz veri `tasks/kategori-veri.md`): tarif 27 kat + 14 tip ·
> ölçü 2-seviye 10/65 · mutfağa-giriş 7/36 · püf 9 soru-format · keşfet alt-filtre ·
> BNP 14 mod + **tarif havuzu modalı** (eksik kurgu kapatıldı). UX: tarif-bulucu
> YENİDEN (dar panel→geniş ferah ızgara) · iletisim OSM harita · DadaStore dropdown
> site-geneli kaldırıldı (64 sayfa düz link) · **Şef Ol→sef-ol başvuru sayfası YENİ**
> (envanter 70→**71**) + 65 sayfa sweep · sef-ol DERİN (4 bölüm, pre-fill dolu,
> sosyal medya, gerçek kategori uzmanlık). REGRESYON: mutfaga-giris + olcu kategori
> işinde tasarım dili bozulmuştu → a463329 dili korunarak düzeltildi (kural+lessons:
> kategori işi=SADECE veri; `tasks/kategori-regresyon-raporu.md`). 4 CANLI BULGU FIX:
> BNP ray kaydırma + kategori-v1 ray (enableDrag selector dersi) + kesfet tek-katman
> bağlamsal + "Tümünü Gör"→liste. Kanıtlı kabul (git diff CSS-kural 0 / yan-yana SS /
> tıklama+scrollLeft probe). Sentez: `outputs/cila2-faz4-sentez.md`. Lessons +2.
> HERO/PANEL REVİZE TURU (Beyar canlı): tarif-liste sol panel dengelendi (cap
> kaldırıldı, oran 1.14) · BNP mod chip büyütüldü (194×122, ray korundu) + hero H3
> kesfet'le hizalandı · kategori-v1 ray kaydırılır (enableDrag) · sozluk hero §2f H1
> koyu'ya çekildi (ansiklopedi kardeşi) · olcu hero zaten canon H3 (no-op).
> **DEPLOY: commit + push origin/main (Beyar onayı 2026-06-13) — GitHub Pages güncel.
> Takım kapatıldı.**
>
> 🔜 **SIRADAKİ TUR KARARLARI (Yasin Bey / patron):** (1) **Su Bardağı 200ml vs Excel
> 240ml** — olcu gram değerleri 200ml-bazlı (TR standart); Excel 240ml (US cup). 240
> seçilirse dönüştürücü + 65 satır gram güncellenir. (2) **olcu tab konumu** — 10 uzun
> kategori başlığı sağa sığmadı, tam-genişlik wrap satırına taşındı (pill stili a463329
> birebir); veri-zorunlu minimum kabul edildi, patron veto ederse alternatif. (3)
> **Ramazan modu** (Faz 3'ten) — `?ramazan=1` demo, site-geneli yayılım + gerçek vakit
> API'si patron onayında.
> Önceki: 2026-06-13 (**CİLA-2 FAZ 3 TAMAM — agent
> team cila2-faz3 (lead+kanon+uygula-b+qa+ramazan), 26 görev kanıtlı kabul**:
> hero/breadcrumb KANONU kılavuz §2f (rd-crumb tek form + H1/H2a-b/H3 +
> hak-ediş; saglik-testler patron-fix krem→yeşil koyu hero; nefes 128/74
> 17 H1'de; crumb simetri 15 sayfa) · kurumsal: hakkımızda yasal 3'lü grid +
> 🆕 sefler-v1 (envanter 69→**70**) + Şef Ol→tarif-ekle (m12 ara çözüm) +
> Günün Tarifi Keşfet sonrasına (Patron #1 ÇÖZÜLDÜ) + v3a Store dropdown fix ·
> Beyar canlı feedback 6 iş (reklam-ver nefes, BNP mod rayı native-outline
> kök neden, ansiklopedi 2-katman İA → Excel'in 19 GERÇEK kategorisiyle,
> tarif-bulucu mega CTA 57 sayfa + köprü, dz-card sade link) · 🌙 RAMAZAN MODU
> konsepti (5 sayfa; ?ramazan=1/0+localStorage+body.is-ramazan; otomatik
> iftar↔sahur flip; ?demo=1; PATRON ONAYINA) · lg-gate 3 detay sayfası ·
> footer/şef sweep 45 dosya · reklam-ver "Yerleşimler" (9 yerleşim, mock
> metrik) · ölü CSS −102 · FİNAL QA: 70 sayfa × auth × 390 = 0 taşma/0
> çift-katman/0 konsol. Kategori Excel'i alındı → `tasks/kategori-haritasi.md`
> (entegrasyon Faz 4). Sentez+inceleme listesi: `outputs/cila2-faz3-sentez.md`.
> Lessons +5 ders. **COMMIT ATILMADI — öneri sentez §9'da, Beyar onayı.**
> Takım kapatıldı.)
> Önceki: 2026-06-12 gece (**CİLA-2 FAZ 2 TAMAM —
> ÜYELİK/PROFİL MODÜLÜ, agent team cila2-faz2**: İA `tasks/uyelik-ia.md`
> (kilitli, M1–M8 lead kararlı) · login simülasyonu `?auth=1/0` + localStorage
> `dm_auth` + `body.is-auth` · header login-state 55 sayfaya sweep (avatar
> dropdown + ➕Ekle + 🔔 zil; shop/panel/hesaplayıcı bilinçli muaf) · defter
> own↔public mod (`?view=public`) + durum chip filtresi · hesabim yalnız-ayar +
> 38px borç kapandı · giris demo pre-fill (tek tık → login) · 🆕
> `puf-noktasi-ekle-v1` · BNP "Deftere Kaydet"→defter köprüsü · puf/tarif-detay
> yorum+kaydet gate'leri (lg-gate) · persona Elif Şahin hizalı. Envanter
> 68→**69**. Denetim: 36-ölçüm örneklem probe + 4 bulgu kapandı (en kritiği:
> sweep'in anasayfa CSS'ini yutması — restore+elle patch, lessons'a işlendi).
> Sentez + inceleme listesi: `outputs/cila2-faz2-sentez.md`. Beyar incelemesi
> TAMAM; commit `c10c43b` + PUSH onaylı (Pages patron turu için güncel).
> CİLA-2 Faz 2 takımı (cila2-faz2) kapatıldı. **SIRADA: FAZ 3** — hero/
> breadcrumb kanonu (saglik-testler dahil) + kurumsal düzeltmeler + QA.
> Bekleyen patron kararları: DadaStore marka dili · M2 sosyal login seti
> (ana site FB ↔ shop Apple) · mekan-detay 5px göz teyidi. İsteğe bağlı mini:
> lg-gate Faz 3 genişletmesi · ölü CSS temizliği (puf-ekle stepper + BNP
> wizard).)
> Önceki: 2026-06-12 akşam (**CİLA-2 FAZ 1 REVİZE
> TURU TAMAM — Beyar incelemesinden çıkan 17 iş kanıtlı kabul**: Premium rozet ·
> TD galeri/video sadeleşme · görselli facet (tarif-liste+kategori) · rota
> yatay step rail v2 · mutfağa-giriş one-page gnav · püf+kesfet hero overlay
> crumb · ansiklopedi IA (kategori + tıkla-aç) · dz-card v2 simetrik · BNP
> sihirbazsız (mod→menü→koleksiyon) · shop login modalı · kampanya bandı hero ·
> Boyut/Ölçü SVG facet · tarif-bulucu üst-geniş düzen (R14) · legacy anasayfa
> varyantları mockups/arsiv/ altında (15 dosya, envanter dışı). + R15: BNP
> görselli mod kartı rayı. Commit'ler: checkpoint `c5e8826` + fix `d3e1c2b`
> (**PUSH YOK — Beyar push kararını ayrıca verecek**). Revize sentezi:
> `outputs/cila2-faz1-sentez.md`. CİLA-2 Faz 1 takımı (cila2-faz1) kapatıldı.
> Beklemede: DadaStore marka dili · mekan-detay 5px · BNP ölü wizard CSS
> (handoff "Faz 2 Girdileri" bölümü).)
> Önceki: 2026-06-12 (**CİLA-2 FAZ 1 TAMAM — patron
> revize turu, 4 modül paralel, agent team**: 25 iş kalemi kanıtlı kabul.
> TARİF (₺ rozet, grid⇄liste, ikonlu facet, TD video modal) · SIRLAR (Mutfağa
> Giriş IA + detay, püf liste/blog-detay + rev-* yorum, YENİ Mutfak
> Ansiklopedisi modülü, ölçü one-page + markalı SVG) · SAĞLIK (2 sekmeli test
> listesi, sade dz-card, profil Tarifleri sekmesi, BNP yeniden: menü çıktısı +
> hazır menüler) · SHOP (ayrı mağaza kabuğu + DadaStore SVG logo, özgün hero,
> kompakt p-card + fav fix, bambu serpiştirme, görsel kategori paneli, fatura
> adresi JS) + site-geneli dropdown sweep 52 dosya + "Dada Denedi"→"Şefin
> Tercihi" SIFIRLANDI + 390 mobil probe üretim seti 3×0. Envanter 64→68.
> Sentez: `outputs/cila2-faz1-sentez.md`. **COMMIT ATILMADI — Beyar onayı
> bekliyor.** Sıradaki: Beyar/patron incelemesi → cila-2 faz 2/3 (hero kanonu).)
> Önceki: 2026-06-12 gece (KEŞFET MEKAN MODÜLÜ TAMAM — Beyar onaylı,
> commit+push'lu: mekan-detay TD anatomisi mirası. Kanıt:
> `outputs/kesfet-mekan-rapor.md`)
> Önceki: 2026-06-12 akşam (mekan-liste-v1 **KABUL** · mekan-detay-v1 Tur 1
> reddedildi. Envanter 62→64 sayfa.)
> Önceki: 2026-06-12 (**REVİZE-2 TAMAM** — site geneli
> mobil sabit-katman disiplini: 🔴1+🟡53 çözüldü, kanonik pattern 55 dosyada,
> kılavuz §3b; keşfet konsepte geri çekildi (Mekânlar · Gurme Lezzetler ·
> Etkinlikler). Commit: `a8d45b7 fix(mockup): revize-2`. Detay:
> `outputs/revize2-sentez.md` + `revize2-{mobil1,mobil2,kesfet}.md`)
> Önceki: 2026-06-11 final cila (`outputs/cila-raporu.md` ·
> `outputs/testler-rapor.md` · `outputs/gorsel-rapor.md`)

---

## 📦 SAYFA ENVANTERİ — 71 üretim sayfası

- CİLA-2 Faz 4'te doğan (2026-06-13): `sef-ol-v1.html` (şef başvuru sayfası —
  diyetisyen-ol kardeşinden türev: 4 bölüm Kişisel/Uzmanlık/Deneyim/Sosyal Medya,
  pre-fill dolu, gerçek Tarif Kategori uzmanlık çoklu seçim; "Şef Ol" 65 sayfa →
  buraya). Faz 4 kategori verisi `tasks/kategori-veri.md` + regresyon denetimi
  `tasks/kategori-regresyon-raporu.md`.


- **68 × `*-v1.html`** + `anasayfa-portal-v3a.html` (kanonik baz) +
  `panel-shell.html` (diyetisyen paneli iskeleti)
- CİLA-2 Faz 3'te doğan (2026-06-13): `sefler-v1.html` (şef dizini — _shell +
  diyetisyen-dizin H1 hero + chef-card dilinde sef-card grid; "Şefler" hedefi).
  Hero/breadcrumb kanonu: kılavuz **§2f**. Ramazan modu 5 sayfada
  (`?ramazan=1/0`, patron onayı bekliyor)
- CİLA-2 Faz 2'de doğan (2026-06-12): `puf-noktasi-ekle-v1` (tarif-ekle form
  kiti mirası, tek adım). Üyelik akışı: `tasks/uyelik-ia.md` (İA) + login-state
  55 sayfada (`?auth=1/0`)
- CİLA-2 Faz 1'de doğan (2026-06-12): `mutfaga-giris-detay-v1` (TD anatomisi)
  + `puf-noktasi-detay-v1` (blog detay + rev-* yorum) + `ansiklopedi-v1` +
  `ansiklopedi-detay-v1` (YENİ SEO modülü "Mutfak Ansiklopedisi"; sozluk-v1
  AYNEN korundu — patron şartı). Shop ailesi (5 dosya) artık AYRI MAĞAZA
  KABUĞU taşır (ana site nav'ı yok; "Ana Siteye Dön" + DadaStore SVG logo)
- Mekan modülü (2026-06-12): `mekan-liste-v1` **→ STUB (2026-06-15)** — içeriği Keşfet hub'ının
  "Mekanlar" sekmesine (`kesfet-v1.html?tab=mekan`) taşındı; dosya artık redirect stub (yer-imi/eski
  link emniyet ağı). + `mekan-detay-v1` (kabul, mekan kartları buraya gider)
- İskeletler: `_shell.html` (public) + `panel-shell.html` (panel)
- Final cilada doğan: **`test-detay-v1.html`** (?test=metabolizma|su-hidrasyon|
  temel-pisirme|hangi-yemek — Onedio tarzı görselli test akışı, kişilik kartı
  sonuç + paylaş + tarif rayı)
- Aileler: ana sayfa · tarif (detay/liste/ekle/bulucu/kesfet/bugün-ne-pişirsem) ·
  video · shop (5) · sağlık (hub + 6 hesaplayıcı + testler + test-detay + diyet
  listeleri/program/besin) · diyetisyen public (3) · diyetisyen paneli (7) ·
  rehber (6) · auth/hesap (4) · landing (4+sezon) · kurumsal/yasal/hata/arama/sss
- Bileşen dili: `tasks/bilesen-kilavuzu.md` §0–§4 TAM (§2d Dalga 3 mirası +
  §2e panel dili + .vw-seg final cilada eklendi)

## ✅ FİNAL CİLA TURUNDA YAPILANLAR (özet — detay `outputs/cila-raporu.md`)

- 40 açık soru sınıflandırıldı: 8 iş yapıldı + 3 karar notu; persona tüm sitede
  **Elif Şahin**; builder→kalori köprüsü; su 4L cap; Müsaitlik→?tab=takvim;
  İhlal Bildir→yasal#b4 (hash-scroll'lu); Öneri-Şikayet→Görüş Bildir modalı
- **tarif-detay YAZDIR görünümü** (print CSS: künye+malzeme+adımlar temiz tek
  kolon, PDF kanıtlı) + pişirme modu pürüzsüz doğrulandı
- **61 sayfa tutarlılık taraması:** 1 kırmızı (urun-liste 390 taşması) + 8 sarı
  düzeltildi (modal/çerez yasal linkleri 54 sayfa, title formatı 21 sayfa,
  boş src, tablet grid-4); footer/bottom-nav/hero-üst/konsol/kart dili 61'de tutarlı
- **Test ailesi tamamlandı:** test-detay-v1 (4 test, Onedio kurgusu) + erişim:
  Sağlık dropdown "Testler" (52 sayfa) + drawer (51) + saglik-hub 4 test kartı +
  saglik-testler Benzer Testler rayı slug'lara bağlı
- **Görsel/buton onarımı:** 2 ölü Unsplash ID (CDN 404) → 4 sayfada 5 eleman
  onarıldı; urun-detay "Hemen Al" (dmCart+odeme akışı) ve Paylaş popover'ı canlı

## 🟠 LARAVEL FAZI LİSTESİ (mockup'ta mock kalan — stack kararı sonrası)

1. Sipariş durum taksonomisi + fatura/PDF üretimi + kupon motoru
2. "Şimdi Dinle" TTS (Web Speech API)
3. Püf detayı yorumları (.rev-* dili hazır, veri backend)
4. Onboarding kullanıcı adı otomatik üretimi · bildirim hedef linkleri
5. Haftalık menü "Menüme Aktar" karşı ucu
6. Panel: aylık takvim v2 (ERTELENDİ) · randevu drawer durum-bazlı butonlar ·
   sidebar canlı sayaçlar · reçete PDF şablonu · toplu işlem/Excel ·
   panel-shell trim (Blade partial'a dönüşürken)
7. Arama "Son Aramalar" (localStorage/hesap)
8. SEO meta description'ları (61 sayfada bilinçli yok — gerçek copy ile)
9. Test sonuç paylaşımının gerçek OG/link altyapısı

## 🔜 FAZ 2 GİRDİLERİ (CİLA-2 kapanışında not edildi — 2026-06-12)

1. **BNP → üyelik modülü köprüsü:** bugun-ne-pisirsem'deki menü ekleme/çıkarma/
   düzenleme aksiyonları (Değiştir · Çıkar · Kap Ekle · Adını Değiştir ·
   Deftere Kaydet) Faz 2 üyelik modülüne bağlanacak — menü = kullanıcının
   kaydedip düzenleyebildiği koleksiyon.
2. **Püf yorumları → üye akışı:** puf-noktasi-detay'daki .rev-* yorum bölümünün
   üye akışına bağlanması Faz 2 İA'sında ele alınacak.
3. **Bekleyen 3 madde:** DadaStore marka dili kararı · mekan-detay 5px göz
   teyidi · BNP ölü wizard CSS temizliği (isteğe bağlı mini iş).

## 🗂️ FAZ 4 GİRDİSİ — Kategori entegrasyonu (2026-06-13)

Gerçek üretim kategorileri alındı: `tasks/KategoriEkle.xlsx` (11 sheet).
**Kategori entegrasyonu Faz 4'te, harita `tasks/kategori-haritasi.md`'de**
(sheet → sayfa/modül eşlemesi + yapısal fark notları: BNP mod 8→14, püf
soru-format, keşfet 6'lı, ölçü iki seviye). Faz 3'te tek istisna uygulandı:
ansiklopedi Katman-1 gerçek Sözlük kategorileriyle kuruldu.

## ⏳ PATRON BEKLEYENLER (Yasin Bey / iş kararı — dokunulmadı)

1. ~~Günün Tarifi bandının ana sayfa yeri~~ → **ÇÖZÜLDÜ Faz 3** (Keşfet
   sonrasına taşındı, ritim düzeldi)
1b. 🌙 **RAMAZAN MODU konsepti onayı (YENİ — Faz 3)**: 5 sayfada canlı demo
   (`?ramazan=1&demo=1`); onaylanırsa site-geneli yayılım + gerçek vakit API'si
2. Mutfak Sırları arka plan videosu (statik foto ile çözüldü)
3. Mobil app tanıtım landing'i (m3) — app bandı + footer rozetleri buna bağlı
4. ~~Reklam alan yerleşimi (m29)~~ → **Faz 3'te "Yerleşimler" bölümü kuruldu**
   (9 yerleşim + mock metrik); paket fiyatları kararı hâlâ patronda
5. EN dil stratejisi (dil menüsü mock)
6. Malzeme başı dış market "Sipariş Et" dropdown'ı
7. Video ray modeli (m13) — "Seriyi Aç" hedefi buna bağlı
8. Kupon iş kuralları (tek kupon? eşik tabanı?)
9. Sözlük Q/W/X politikası · sosyal login seti (FB?) · siparişlerim hesaba
   5. sekme mi · BMH pediatrik kapsamı · vücut tipi eşikleri (diyetisyen onayı)
10. Header bildirim zili (yeni chrome UI) · haftalık menü→alışveriş köprüsü
11. Yasal metinler hukukçu onayı + künye tüzel bilgileri + ekip isimleri
12. Sezon "Günün Ayeti" bloğu (editöryel) · "Şef Ol" hedefi (**Faz 3 ara
    çözümü: →tarif-ekle**; patron farklı isterse tek href sweep'i)

## ➡️ SONRAKİ ADIM (Beyar kararı — 2026-06-12)

0. **CİLA-2 FAZ 2 TAMAM ✅ (2026-06-12 gece)** — üyelik/profil modülü; detay
   ve commit önerisi `outputs/cila2-faz2-sentez.md`. Sıradaki adaylar: commit
   onayı → hero kanonu (Faz 3) + lg-gate genişletmesi + M2 patron kararı.
1. **CİLA-2 FAZ 1 TAMAM ✅ (2026-06-12, agent team: lead + 4 teammate)** —
   patron (Yasin Bey) revize turu 25 iş kalemi kanıtlı kabul; envanter 64→68;
   site-geneli dropdown sweep (Mutfağa Giriş + Mutfak Ansiklopedisi, 52 dosya);
   "Dada Denedi" site genelinde SIFIR; 390 mobil probe üretim setinde
   taşma/konsol/çift-katman 3×0. Sentez + Beyar inceleme listesi:
   `outputs/cila2-faz1-sentez.md`. **COMMIT BEYAR ONAYI BEKLİYOR** (öneri
   sentez raporunun sonunda).
2. **Beyar/patron incelemesi:** sentezdeki "Beyar incelemesi bekleyenler"
   (rozet adı, Ansiklopedi modül adı, DadaStore marka dili, legacy varyant
   arşiv kararı + mekan-detay 5px artefakt göz teyidi).
3. **CİLA-2 devam fazları:** hero kanonu (Faz 3 — saglik-testler hero'su
   dahil) + revize-2 tereddütleri (hesabim 38px buton, gerçek cihaz teyidi).
4. Sonrası: stack kararı (Laravel mi statik mi) + EN dil stratejisi.

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/anasayfa-portal-v3a.html"   # site
open "http://localhost:8765/mockups/panel-shell.html"           # panel
```

Canlı (Pages): https://by4r.github.io/dadamutfak-view/mockups/<sayfa>.html

- **Ortak:** `?dd=1` mega+dil · `?drawer=1` · `?cc=1` · `?fb=1` · panel `?nav=1`
- **Üyelik (Faz 2):** `?auth=1` login / `?auth=0` çıkış (localStorage kalıcı;
  shop+panel+hesaplayıcı MUAF) · defter `?view=public` · `?tab=` · giris
  ön-dolu (tek tık) · tarif-ekle `?mode=edit` · puf-ekle `?state=`
- **Test ailesi:** `test-detay-v1.html?test=metabolizma|su-hidrasyon|
  temel-pisirme|hangi-yemek` (+`&sonuc=1` sonuç kartı)
- **Tarif detay:** `?cook=1` pişirme modu · yazıcı ikonu = print görünümü
- Dalga paramları: `outputs/dalga{2,3,4}-sentez.md` · Scratch SS:
  `mockups/.ss-scratch/` (gitignored) · Mobil SS: 500px + 390 iframe probe
  (kılavuz §4) · Probe altyapısı: `.ss-scratch/cila/sweep.py`
