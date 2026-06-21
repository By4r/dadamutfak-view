# DadaMutfak — Handoff (Faz 3 "Panelini Aç" KÖPRÜSÜ TAMAMLANDI · CANLI)

> Tarih: 2026-06-22. **Faz 3 gözetim→operatör paneli köprüsü (impersonation) BİTTİ ve `origin/main`'e PUSH EDİLDİ (GitHub Pages canlı).** Önceki: Faz 2 tüm dalgaları + antrenör paneli + chip sayaçları + 390px fix + v5→v6 taşıma + dizin Admin sekmesi + 3 revize (hepsi canlı). **Klasör `v6/`.**

## ✅ FAZ 3 — "Panelini Aç" köprüsü (TAMAMLANDI · CANLI)
- **Ana iş:** `feat d33ded7` · **QA:** `chore 226ac57`. Mockup (gerçek auth yok, salt görsel akış).
- **2 yeni izole asset:** `v6/assets/css/sa-gozetim.css` (panel-aç CTA + üst impersonation şeridi) + `v6/assets/js/sa-gozetim.js` (sessionStorage tabanlı banner, panel-içi gezinmede kalıcı, "Gözetime Dön" → geldiği gözetim ekranı). **Kanonik kabuğa (sa-shell/sa-ui) DOKUNULMADI.**
- **6/6 detay hero buton** (`.pol-head` — dolgulu yatay-uzun, modül aksanı `var(--acc)`, başlık sağ ucu, mobil full-width): antrenörler · diyetisyenler · işletmeler · rezervasyonlar · onaylar · menüler detay. Bağlamsal etiket/href korundu (rezervasyon→`mekan-rezervasyonlar`, menü→`mekan-menu`, onay+işletme→`mekan-panel`, diyetisyen→`dyt-danisanlar`, antrenör→`antrenor-panel`).
- **6/6 liste kompakt buton** (`.act-btn.gz-act` — accent-outline "Panel", satır ritmine uygun): antrenörler · diyetisyenler · işletmeler · rezervasyonlar · onaylar (İncele satırı dahil) · menüler. `?gozetim=1&from=<liste>` taşır (tüm satırlar aynı mock panele — kasıtlı).
- **18/18 operatör paneline** banner link+script (Antrenör 8 + Diyetisyen 6 + Mekan 4). `body.has-gozetim` ile fixed kabuk aşağı itilir (izole override).
- **Aksanlar doğru:** antrenör yeşil `#009d4f` · diyetisyen nane `#3BB77E` · işletme petrol `#006072` (sa-shell `body[data-sec]` çözer). **QA `tasks/gozetim-kopru-qa.mjs` → ALL PASS** (6 detay köprüsü + bağlamsal hedef + rol + Gözetime Dön + kalıcılık + temiz-ziyaret; 404/JSERR 0). 1440+390 render + bağlamsal hedef teyitli.

## DURUM — ne bitti (hepsi push'lı)
- **1. dalga gözetim** (Sağlık 4 + İşletme 4 + DadaFit 3 = 11 modül / 24 ekran) + wiring → `cc0b2a5`.
- **2. dalga gözetim** (Admin 9 + Store 6 = 15 modül / 28 ekran) + SECTIONS wiring → `1207fd0`.
- **Chip standardizasyonu** (wave-1 filtre chip radius+padding+weight → flagship 8px) → `7e2afbc`.
- **Docs** (Tarifler tipi CRUD+moderasyon hibrit) → `5ad8b1f`. · **Chore** (outputs SS untrack) → `df92a68`.
- **Antrenör operatör paneli** (8 ekran + builder + giriş kilidi) → `ed410c3`/`f0a7493` (+ qa `6d557c4`/`2208456`, docs `ba79698`).
- **Filtre chip sayaçları + kompakt format** (feat) — **24/24 liste sayfası sayaçlı + tutarlı 8px**. 10 sayaçsız sayfaya `.ch-cnt` (DOM-doğrulanmış gerçek sayılar) eklendi; 14 mevcut korundu. **Big-number-ready:** tek formatlayıcı `v6/assets/js/sa-chcnt.js` (24 sayfaya `<script>`; sa-shell/sa-ui'ye DOKUNULMADI) — `<1000` tam, `≥1000` tr-TR compact (`1,2 B` · `12 B` · `500 B` · `1,2 Mn`; 1.250.000→`1,3 Mn` kanonik Intl), tam değer `title`'da, `.ch-cnt` taşma-dayanıklı (`white-space:nowrap` + esnek min-width). tarifler "Tümü" sayfanın kendi toplamına (1.248→`1,2 B`) set. QA: `chcnt-format-qa.mjs` ALL PASS (24 + stres testi).
- **390px liste-tablosu responsive fix** (feat) — **YENİ `v6/assets/css/sa-list.css`** (kabuğa DOKUNULMADI): `.pc-body{overflow-x:auto;-webkit-overflow-scrolling:touch}` → geniş tablo kart İÇİNDE yatay kayar, sayfayı taşırmaz, kolonlar/veri korunur. **30 liste-tablosu sayfasına** `<link>` (glob; detay/form hariç). 5 anlamlı @390 taşma çözüldü (isletme 789→390 · saglik-diyetisyenler 847→390 · kullanicilar 562→390 · admin 438→390 · store tabloları). 1440 regresyon yok. QA: `sa-list-qa.mjs` PASS. **Kalan opsiyonel minör (acele yok):** `sa-saglik` 3px sub-pixel (tablo değil) + `sa-store-urunler-detay` 12px (detay sayfası — fix kapsamı dışı).
- **v5→v6 taşıma** (refactor `78028f3`) — `git mv v5 v6` (314 rename, tarih korundu). Path fix: `.gitignore` (v6/), 26 `tasks/*.mjs`, 25 `tasks/*.md`, kök `index.html` (giriş yönlendirmesi v6). Site relative-path olduğu için kod içi değişiklik yok. **v5 erişimi KAPALI** (404). QA: dizin/sa-admin-kullanicilar/antrenor-panel render OK. (Tarihsel `outputs/` raporlarındaki v5/ URL'leri kasıtlı dokunulmadı.)
- **Dizin Admin Panel sekmesi** (feat) — `v6/dizin.html`'e 2'li tab toggle (`Genel` + `Admin Panel`). Public GROUPS'a dokunulmadı; renderer `buildTab(groups)`'a çıkarıldı, iki veri seti (GROUPS + ADMIN_GROUPS). **Admin sekmesi: 90 sayfa / 9 kategori** — sıra: **Giriş/Sistem 2 (en başta; Yönetim Girişi solda, Gözetim Kabuğu sağda)** · Gözetim-Admin 21 · Store 15 · Sağlık 11 · İşletme 11 · DadaFit 12 · Operatör-Antrenör 8 · Operatör-Diyetisyen 6 · Operatör-Mekan 4. (dyt-*/mekan- public Genel'de de var, dup kasıtlı; antrenor-detay+ol public, hariç.) Tüm linkler relative + v6'da mevcut + `target=_blank`. QA: `dizin-tab-qa.mjs` PASS.
- **3 revize** (fix) — (1) dizin Admin "Giriş/Sistem": **Yönetim Girişi** kartı **solda/ilk** (sa-shell sağa). (2) `sa-dadafit-egzersizler`: Barbell Squat görseli ölü Unsplash 404'tü → çalışan squat görseliyle değiştirildi (diğer satırlarla tutarlı). (3) `sa-isletme-onaylar`: **Onayla** butonuna özel saConfirm handler (isletme adı + saToast); **Reddet** zaten sa-ui.js yerleşik destructive-delege ile yakalanıyor (dokunulmadı, çift pop-up önlendi). QA: `revize3-qa.mjs` PASS (tek pop-up, doğru toast, 404/JS/mojibake 0).

## ⏭️ SIRADAKİ İŞ — adaylar
- **(a) Sağlık alt-ekranları köprüsü = AYRI TUR, SEMANTİK KARAR GEREKİR.** `sa-saglik-randevular` (5 satır) · `sa-saglik-receteler` (5) · `sa-saglik-testler` (5) **hiç köprülü değil (detay dahil)**. Eklemek = yeni yüzey: hem detay hero hem liste butonu + "randevu/reçete/test diyetisyen paneline mi açılır, hangi sekmeye" eşleştirmesi. **Yasin Bey'e sorulabilir.** (Operatör-modülü diğer tüm çok-satırlı listeler köprülü; bunlar bilinçli kapsam-dışı bırakıldı.)
- **(b) Opsiyonel minör (acele yok):** `sa-saglik` @390 3px sub-pixel · `sa-store-urunler-detay` @390 12px (detay, fix kapsamı dışıydı).
- **(c) DadaFit/public faz işleri:** `tasks/public-faz-bekleyen.md` (DadaFit nav temizliği) · `tasks/spec-impact-public-revize.md` (koordinat/güzergah/şehir-öneri).

## DEĞİŞMEZ KURALLAR (gözetim paneli)
- **Kanonik kabuk tek kaynak:** `assets/css/sa-shell.css` + `assets/js/sa-shell.js` (SECTIONS config) + `assets/css/sa-ui.css` + `assets/js/sa-ui.js` (saConfirm/saToast/dropdown). **DOKUNMA** — sadece `<link>`/`<script>` ile yükle; sa-ui shell.js tarafından auto-inject.
- **Aksan otomatik:** `body[data-sec]` → `var(--acc)` çözer (admin/store domates `#E14827` · saglik nane `#3BB77E` · dadafit yeşil `#009d4f` · isletme petrol `#006072`). **Renk literali yazma**, token kullan. **Mint kaçağı** = ham `rgba(59,183,126)`/`#3BB77E`/`#6cca98`; `var(--green-deep/tint)` KANONİK (`.pstat.ok` da kullanır, kaçak değil).
- **Gözetim deseni:** liste "Yeni" yok, detay "Düzenle" yok (oku+denetim) — config/CRUD modüllerinde flagship form VAR (kullanicilar/urunler pattern). Yıkıcı aksiyon → saConfirm. Her listede boş durum + filtre + arama.
- **Chip standardı:** filtre `.chip` = `var(--radius-sm)` 8px · padding 7px 14px · base font-weight 500 / aktif 700. İçerik etiketleri (`.spec-tag/.cat-tag/.type-tag/...`) 6px AYRI tip (dokunma). `.lvl` 999px pill (kasıtlı).
- **Görsel:** kare/oranlı görsel `<img>` DEĞİL → `div + background-image + cover + center` (Kerem Bey). Full-file overwrite YASAK, targeted edit. **UTF-8:** perl ile düzenlerken `-CSD` KULLANMA (mojibake yapar) → byte-mode + her dosyada `grep`/`git diff` flush teyidi (idle'a güvenme).

## REFERANS
- Envanter/plan: `tasks/faz2-envanter.md` · `tasks/sa-entegrasyon-plan.md` · `tasks/sa-envanter-tarama.md` · `tasks/spec-impact-public-revize.md`
- Flagship referans (OKU, DOKUNMA): `v6/sa-admin-kullanicilar.html` (Admin CRUD) · `v6/sa-store-urunler.html` (Store CRUD) · `v6/sa-saglik-randevular*` (gözetim disiplini).
- Local server: `python3 -m http.server 8765` proje kökünden → `http://localhost:8765/v6/...`. QA: `node tasks/*-qa.mjs` (Playwright, kökte `node_modules/playwright`).

## DİĞER BEKLEYENLER (public/Laravel fazı — mockup'a girmez)
- `tasks/public-faz-bekleyen.md`: DadaFit nav temizliği. · `tasks/spec-impact-public-revize.md`: koordinat/güzergah/şehir-öneri.
- Paralel (Claude.ai): TG Germany admin login ↔ sa-giris hizalaması · ₺49 tier-1 fiyat (Yasin Bey).
