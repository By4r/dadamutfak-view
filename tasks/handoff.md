# DadaMutfak — Handoff (MEGA-REVİZE D1 + round2 + ek + ufak fix · ✅ CANLI — PUSH EDİLDİ)

> Tarih: 2026-06-22. **Mega-revize Dalga-1 + round-2 + ek revize + ufak fix TAMAM, Beyar görsel onayladı, `origin/main`'e PUSH edildi (son commit `435d3fa`; öncesinde `7fce1c6`). GitHub Pages canlı.** Kanonik kabuk (sa-shell/sa-ui/sa-*.css/js) hiç dokunulmadı. **Klasör `v6/`.** (Alttaki tarihsel bölümler önceki oturum referansı.)

## ✅ BU OTURUM — TAMAMLANDI (push edildi · son commit `435d3fa`)
- **Mega-revize Dalga-1 + round-2 + ek revize + ufak fix** (commit `7fce1c6` + `435d3fa`). 3 şerit (public/isletme/admin-form) agent-team, lead Playwright/render ile bağımsız doğrulandı; kanonik kabuk 0 dokunuş.
- **Public içerik (dada-revize 8 madde):** bugun-ne-pisirsem (rename UI), tarif-bulucu (filtre+protein), kesfet (Mekan Öner modal), mutfaga-giris + **YENİ mutfaga-giris-liste** (slider + Tümünü-gör fix), ansiklopedi, olcu-birimleri, sezon. (item-9 TBD.)
- **İşletme akışı:** giris (rol→panel), hesabim (İşletmem söküldü), isletme-ekle (**faz-bölme**: temel kayıt → mock geçiş → ekstra alanlar), 4 mekan panel (consumer `SA_ACCOUNT_ITEMS`), mekan-detay (**?owner=1 önizleme bandı**), mekan-panel "Public Sayfam" tek-link→owner=1 (fazla CTA'lar söküldü).
- **Admin tarif formu wizard paritesi:** `sa-admin-tarifler-form` — malzeme grup/drag(Sortable)/autocomplete/birim, adım AI-iyileştir/görsel/süre/drag, searchable mutfak multi-select + 14 etiket chip.
- **tarif-bulucu ingredient slider:** 2-sütun cat-cols + çift-açma (sol→sağ eş, sik-dahil parite fix — latent çapraz bug çözüldü) + tek-satır slider (~5 görünür, 98px) + **15+ malzemeli kategori 2-row** (Sebzeler 20→2 satır). Filtre+protein korundu.
- **sezon:** belirgin hilal/yıldız hero motifi + sayfa-geneli soluk watermark (opacity 0.08-0.09).

## ⏭️ KALAN İŞLER (öncelik sırası)
1. **Besin 4-rehber kararı** — `besin-kalori-cetveli`/`protein-rehberi`/`karbonhidrat-rehberi`/`yag-rehberi` şu an **wave-öncesi temiz halde** (round-2 intro + round-1 bd-tab geri alındı, commit dışı). Karar: bd-tab geri al MI yoksa besin-degerleri konu-tab'a yönlendir Mİ. **Ayrı turda ele alınacak.**
2. **sezon watermark daha belirgin** (ufak iterasyon — şu an 0.08-0.09).
3. **İşletme login avatar/yönlendirme:** işletme girişinde header dropdown işletme avatarı + otomatik işletme paneli (B3 ile birlikte).
4. **Sticky-sağ tutarlılık:** operatör edit-formlarında sağ sütun sticky var/yok keşfet, eksiklere (admin tarif form dahil) uygula.
5. **B3 consumer-header sweep** (~93 public+isletme sayfa, header dropdown "Halka Açık Profilim") — EN SON.
6. **Dalga 2:** Admin-B içerik modülü (ayrı modül + nav), Admin-C rapor (Yasin C-scope bekliyor), yol-guzergahim Leaflet (ayrı session), dada-revize 9. madde (Beyar dolduracak).
7. **Yasin'e 2 soru:** A5 (admin eski-panel kapsamı) · C-scope (rapor detay önceliği).

> Plan referansları: `tasks/mega-revize-plan.md` (5 batch şerit haritası + çakışma bayrakları) · `tasks/admin-review-yasin-plan.md` (Admin-A/B/C).

## ✅ PUBLIC REVİZE TURU (round 1→4) — TAMAMLANDI · CANLI
> Saf frontend, targeted edit, kanonik kabuğa (sa-shell/sa-ui/sa-*.css) DOKUNULMADI. 3 teammate (layout-css/icerik/premium-shop) round 1-2; round 3-4 lead linear (teammate'ler güvenilmez idle olunca devralındı). Görsel QA Beyar tarayıcıda onayladı.
- **tarif-bulucu-v1** — Malzeme kategorileri TUM uniform: `.mz-grid` column-flow (grid-auto-flow:column + grid-template-rows:repeat(3)) KALDIRILDI → `display:flex;flex-wrap:nowrap;overflow-x:auto` + `.mz-grid>.mz{flex:0 0 106px}` (mobil 88px). Tüm kategoriler "Sebzeler" gibi soldan-sağa tek-satır yatay slider (zigzag/erken-satır-atlama yok). mz-more gizli.
- **kesfet-v1** — Mekan listesi çok-satır: grid'e 9 yeni disc-card eklendi → 18 kart = 6 satır × 3 kolon (uzatılmış filtre sütununa denk). CSS cap yoktu (9 kart = 1 sayfaydı). Kolon/kart boyutu + filtre uzatması (round-1) + Semt/Özellikler default-açık korundu.
- **giris-v1** — (a) İki kolon EŞİT yükseklik: `.au-layout align-items:stretch` + `.au-visual height:624px→min-height:624px` (floor) → hero+form giriş ve kayıtta eşit boy (uzun kayıtta birlikte uzar). (b) Kayıt'a 4 ROL SEKMESİ (Kullanıcı/Antrenör/Diyetisyen/İşletme) + role özel `[data-role-req]` alan blokları + giriş'te `#giAsSeg` rol mini-seçici (MOCK role→panel: antrenor-panel/dyt-danisanlar/mekan-panel). `.au-dyt` kutusu kaldırıldı. (c) Rol sekmeleri PER-MODÜL AKSAN: aktif zemin Kullanıcı=`--tomato` · Antrenör=`--c-green` #009d4f · Diyetisyen=`--green` #3BB77E · İşletme=`--c-petrol` #006072 (`.au-rseg` scope, `#giSeg` e-posta/tel hariç). (d) round-4 KONTRAST fix: pasif hover `:not(.active)`'e sınırlandı + `.au-rseg .au-seg-btn.active{color:#fff}` → aktif sekmede yazı+ikon daima beyaz (hover'da aksan-renkli-yazı-görünmez bug'ı çözüldü).
- **haftalik-menu-v1** — Komşu hücre bağımsızlığı: `.mcell min-height:126px→height:172px` (SABİT) + `.mc-stack max-height:268px→max-height:100%;height:100%` (sabit hücre içinde scroll). Satır yüksekliği içerikten bağımsız → bir hücreye ekleme/çıkarma komşu Ekle butonu+hizasını ASLA etkilemez. Ayrıca round-1 aranabilir `.tsr` öneri popover + çoklu ekleme (dyt-recete-builder modeli).
- **diyetisyen-profil-v1** — Alttaki "Rozet Koleksiyonu" section + sadece `.pfr-*` CSS silindi; üst `.pf-badges` özeti + shared `.badge-*` korundu.
- **besin-degerleri-v1** — Tablolar zaten kanonik `.ref-table` (dokunulmadı); makro sekme çubuğu segment-pill diline + 4 tekrarlı "Değerleri karşılaştır" başlığı sekmeye göre anlamlandırıldı.
- **dada-shop-v1** — Giriş Yap×2 → `giris-v1.html` reroute (in-page modal ölü-zararsız); üst "Yöresel" nav silindi (drawer "Yöresel Lezzetler" kaldı); promo kart köşe taşması `background-clip:padding-box`+`isolation:isolate`; "Tariften Sepete" overlay katmanlı scrim.
- **video-mutfagi-v1** — Restoran Sırları + Dada Akış locked kartlar ortak premium dil (blur 7px + altın crown watermark, `pointer-events:none`); fullscreen reels viewer'a kilitli premium reel (shorts[2], `#dkLock data-pro-gate` → `#proGate`, z-index 130/131 reels üstünde).
- **QA notu:** round-3/4 sırasında Bash classifier servisi kesintideydi → lead render-QA (`outputs/_qa_r3_all.mjs`, hazır) çalıştırılamadı; tüm edit'ler Read-seviyesi yapısal teyit + Beyar tarayıcı onayı ile kapatıldı.

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

## ⏭️ SIRADAKİ İŞ — İŞLETME ÜRETİM TURU (audit planı HAZIR, ayrı temiz session'da)
> İşletme (mekan) hesabı public akış audit'i tamamlandı (read-only). Public profil EKSİK DEĞİL (`mekan-detay-v1.html` zaten zengin) — yeni sayfa GEREKMEZ. Net iş 6 madde:
- **B1** — `giris-v1.html` İşletme kayıt submit → `isletme-ekle-v1.html`; giriş submit → `mekan-panel-v1.html?business=1` (organik `has-business` kurar; şu an paramsız → `dm_business` hiç set olmuyordu).
- **K1** — `hesabim-v1.html` "İşletmem" sekmesi+pane (eski 1976-2022) + ona özel `biz-*` CSS söküm. (Beyar kararı: KALDIR — audit "kasıtlı huni" dese de Beyar normal kullanıcıda işletme bölümü istemiyor.)
- **W1** — `isletme-ekle-v1.html` wizard sonu → `mekan-panel-v1.html?business=1` (şu an hesabim'e dönüyor).
- **B2** — 4 mekan panel sayfasına (`mekan-panel/-rezervasyonlar/-ayarlar/-menu`) inline `window.SA_ACCOUNT_ITEMS` (sa-ui.js'ten ÖNCE; İşletme Profilim/Public Sayfam/Müsaitlik&Ayarlar/Çıkış→consumer logout). sa-ui.js DEFAULT_ITEMS süper-admin'e + `sa-giris`'e düşüyor (KOPUK).
- **B3** — Consumer header `.acct-menu`'ye `body.has-business` ile `.biz-only` blok (İşletme Panelim→mekan-panel · Halka Açık Profilim→mekan-detay). **Toplu enjeksiyon UNIFORM**: header byte-identical (`_shell.html` kopyası), `has-business` JS zaten Faz3'ten her sayfada. Anchor = `Ayarlar / Hesabım` + `.acct-div` + `.acct-logout` (sadece mutfak-brand sayfalarda var → store-brand `dada-shop` ailesi + auth sayfaları otomatik atlanır, self-selection). CSS kuralı her sayfanın inline `<style>`'ına (`.biz-only{display:none} body.has-business .biz-only{display:flex}`). Idempotent (zaten `biz-only` varsa atla). Spot-check: anasayfa-portal + kesfet + mekan-detay + besin-degerleri + dada-shop(negatif).
- **C2** — `mekan-detay-v1.html`'e `?owner=1` ince önizleme bandı (sa-gozetim banner deseni; "ziyaretçi görünümü · Panelden Düzenle"). Inline editing AÇILMAZ.
- **Walkable** — uçtan uca: kayıt→wizard→panel(business=1)→Public Sayfam→header dropdown→ayarlar; dead-link 0.
- **Ek (mock akış) — kayıt/giriş formları MOCK-DOLU + TIKLA-YÜRÜ.** Beyar spec akışını gerçek auth olmadan gezebilsin: `giris-v1` İşletme kayıt + `isletme-ekle-v1` wizard alanları örnek değerlerle dolu/önizlemeli gelsin; submit/ileri butonları görsel olarak bir sonraki adıma götürsün (mock), kullanıcı tüm akışı tıklayarak yürüyebilsin. Gerçek backend yok — saf görsel yürüyüş.
- **DOKUNMA:** `assets/js/sa-ui.js`, `assets/css/sa-*.css`, sa-shell. Audit kararları: hesabim İşletmem KALDIRILACAK · kayıt "İşletme olarak kaydol"dan başlar · owner ince önizleme bandı.

## ⏭️ DİĞER ADAYLAR (public revize turu öncesinden)
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
