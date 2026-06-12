# DadaMutfak — Bileşen Kılavuzu (TIER 1)

> Kaynak: `mockups/_shell.html` (chrome, hazır gelir) + `anasayfa-portal-v3a.html`
> (v3a — satır no'lu) + `tarif-detay-v1.html` (TD — sadece class referansı).
> Kural: ÖNCE buraya bak, yoksa v3a/TD'de ara, O DA yoksa yeni bileşeni token
> diliyle kur (radius token'ları, pill YASAK; emoji bayrak YASAK → flagcdn img).

## 0. Shell'de hazır gelenler (kopyalama, dokunma)

- Token + Gilroy @font-face + reset/tipografi + `.wrap` `.muted` `.eyebrow`
- `.sec` `.sec-head` (eyebrow/h2/lead/sec-tools grid) · `.see-all` · `.btn .btn-primary .btn-ghost` · `.chip/.chips` · `.icon-btn`
- Topbar, header + mega menü (KİLİTLİ), dropdown'lar, footer (orange + reveal), drawer, bottom-nav, çerez banner, görüş bildir modal — JS'leriyle
- `.row-nav` + `.row-track` (ok + snap slider altyapısı; ok butonuna `data-track="<id>" data-dir="prev|next"`), drag-scroll JS (`.row-track .grid-4 .vid-grid .chips` otomatik)
- `.below-header` — sayfanın İLK section'ına ver (header offseti 112px / mobil 62px)
- SS paramları: `?dd=1` mega+dil · `?drawer=1` · `?cc=1` çerez · `?fb=1` modal
- Header hep KATI; sayfa JS'inde `heroMode` bayrağı var, açma (hero'lu sayfa yok bu dalgada)

## 1. v3a'dan kopyalanacak bileşenler (CSS verbatim al, satır no ≈)

- **r-card** (tarif kartı) — v3a 289–312 + anatomi override 770–807 (`.r-facts` 3'lü şerit, `.r-foot` yazar+istatistik, `.r-stats .r-views`, h4 2-satır clamp). Grid: `.grid-4` (335; mobilde otomatik yatay snap 1132–1138)
- **m-types** rozet grubu (sağ-alt medya tipi: süre/foto sayısı) — 775–776; `.r-chip` (sol-üst kategori) 295; `.r-save/.p-fav` yuvarlak kaydet 297–299; `.r-tried` 300
- **feat-big + feat-side** (büyük öne çıkan + yan mini kartlar) — 314–333
- **vid-card** (`.vid-thumb .play .vcat .vmeta`) — 401–416; vid-grid mobil snap 1141–1147
- **p-card** (ürün kartı: `.p-media .p-disc .p-body .p-cat .p-desc .p-foot .p-price .p-add`) — 449–465 (TD `.shoprail` aynısını kullandı)
- **cat-card/cat-track** (kare kategori kartı + tek satır scroll) — 268–287
- **chef-card** (avatar + takip butonu `.chef-follow`, `.chef-cta` dashed davet) — 714–738
- **disc-card** (editoryal görsel kart 16:10) — 672–712
- **guide/koyu band dili** (koyu zemin + grain + glass tab `.guide-tabs .gt`) — 337–399; appband/dayband (sabit bg separatör) 652–670 + 740–755
- **searchcard** (tab'lı arama kartı) — 216–230; hero-stats 239–241
- **calc-card / diet-panel** (yeşil sağlık dili) — 418–447
- Section zemin ritmi: gri `var(--bg-cream)` ↔ beyaz `var(--bg-white)` alternasyonu; section başına class ile ver (v3a 88–92 örneği)

## 2. tarif-detay-v1'den (TD) — class referansı, CSS'i TD'den kopyala

- **Sayfa üst yapısı:** `.rd-top` (below-header muadili, 112px) · `.rd-crumb` breadcrumb · `.rd-head` hero + `.kunye-col` dikey künye (260px) · `.tbadge` rozet · `.chip-flag` bayraklı mutfak chip'i (flagcdn)
- **Form/etkileşim kiti:** `.rev-form` (yorum formu: `.rf-stars .rf-text .rf-photo .rf-chips`) — form sayfası için referans dil; `.rev-filter` filtre çipleri; `.rev-summary .rs-bars` puan dağılımı. **`.rev-*` yorum dilinin KANONİK prefix'idir (Beyar onayı, Dalga 2 kapanışı)** — yeni yorum bileşenleri `rev-` ailesinden türetilir (`rv-` deneyimi `rev-`e dönüştürüldü, diyetisyen-profil)
- **Liste satırı kiti:** `.ing-panel .ing-list .ing-row .ing-head/.ing-group` (checkbox'lı satır + grup başlığı) · `.ing-pop/.conv-pop` popover ailesi · `.shop-pop` çoklu satıcı popover
- **`.note-duo`** (hatırlatma `.remind-box` + editör notu `.editor-box` yan yana grid)
- **`.mw-grid .mw-item`** masonry foto duvarı + `.mw-up` yükleme tile'ı
- **`.lightbox`** (grup içi ok/klavye gezinme) · `.video-modal .vm-frame` · `.actbar` sticky aksiyon barı · `.tagshare` hashtag+paylaşım rayı
- **`.author-card .rd-follow`** şef mini kartı + takip butonu (profil sayfası başlangıç dili)
- **`.cookmode .cm-*`** pişirme modu (BU DALGADA KULLANILMAZ — form sayfası HARİÇ tutuldu)

## 2b. Dalga 1'de doğan bileşenler (Dalga 2+ MİRAS alır — yeniden icat YASAK)

> CSS'i ilgili kaynak dosyadan verbatim kopyala; class adlarını DEĞİŞTİRME.

### Form kiti — kaynak `tarif-ekle-v1.html` (her yeni form buradan miras)
- `.fk-field .fk-label .fk-input .fk-select .fk-textarea .fk-help .fk-error .fk-count .fk-suffix .fk-grid` — temel alan ailesi; label + input + yardım/hata/sayaç satırı tek desen
- `.up-zone .up-grid .up-item .up-add` (+ `.is-cover`) — görsel yükleme: drop zone + thumb grid + kapak işareti
- `.ie-list .ie-row .ie-name .ie-amt .ie-unit .ie-actions .ie-del .ie-drag .ie-group .ie-gdel .ie-sugg .sg-new` — malzeme editör satırı + grup başlığı + autocomplete (havuz+serbest karma)
- `.st-list .st-card .st-num .st-body .st-side .st-up .st-figs .st-shot .st-time` — numaralı adım kartı (görsel max 3 slot)
- `.stepper .stp .stp-num .stp-lbl .stp-line` + `.wiz-grid .wiz-main .wiz-foot .wiz-solo` + `.form-card .fc-head .fc-step` — çok adımlı wizard iskeleti
- `.sbanner` (`.draft/.review/.rejected`) — durum bantları (`?state=`); ONAYDA formu kilitler
- `.tips-card .tips-head .tips-list` + `.send-panel` — yan ipucu kartı + gönderim paneli

### Facet filtre paneli — kaynak `tarif-liste-v1.html`
- `.lst-layout .lst-side .lst-grid .lst-top .lst-bar .lst-sum .lst-tools` — sol facet sütunu + sağ grid iskeleti
- `.fct .fct-head .fct-body .fct-row .fct-dot .fct-car .fct-more .cbx .fcnt` — facet grubu: aç/kapa başlık + checkbox satırı + adet sayacı
- `.fchips .fchip .fchips-clear .fil-clear .fil-top` — aktif filtre chip'leri + tümünü temizle
- `.sort-btn .sort-dd .sort-menu` — sıralama dropdown'ı
- `.sheet-overlay .sheet-head .sheet-body .sheet-foot .sheet-close` — ≤640 mobil filtre sheet'i (`?sheet=1`)
- `.lst-empty` boş durum (§3 deseni) · `.pagi .pg .pg-dots .pagi-note` sayfalama

### Liste hero bandı — kaynak `tarif-liste-v1.html` — LANDING AİLESİNİN ATASI
- `.lst-hero .lst-stats .lh-chips` — görselli **koyu-overlay** hero (overlay 0.3–0.4) + istatistik + hızlı chip rayı; kategori/koleksiyon/SEO landing/Günün Menüsü hero'ları bu dilin varyantıdır. Krem zemin denendi → **REDDEDİLDİ**, kullanma.

### Video bileşenleri — kaynak `video-mutfagi-v1.html`
- `.vhub-hero .vh-overlay .vh-grain .vh-cont .vh-feat .vh-play .vh-stats .vh-queue .vq-item .vq-th .vq-num` — koyu hub hero + yan oynatma kuyruğu
- `.vray .vray-cover .vray-head .vray-info .vray-tools .vseries-sec` — seri rayı (kapak + bölüm şeridi)
- `.ep-panel .ep-row .ep-num .ep-th .ep-body .ep-meta .ep-state .ep-hoverplay` — bölüm satırı; seri detayı `?seri=1` toggle (`.sd-* .sds-*`)
- `.dakis .dk-stage .dk-media .dk-segs .dk-info .dk-actions .dk-nav .dk-follow` + `.short-card .short-track` — dikey 9:16 Dada Akış player (`?short=1`; ok + klavye + mobil swipe)
- `.vfilter .vf-count` video filtre barı · `.btn-glass` koyu zemin buton

### Profil dili — kaynak `mutfak-defteri-v1.html`
- `.pf-top .pf-banner .pf-head .pf-ava .pf-id .pf-handle .pf-bio .pf-meta .pf-stats .pfs .pf-actions .pf-follow` — profil hero (banner + avatar + sayaç şeridi); diyetisyen profili bu dilden varyantlar
- `.pf-tabbar .pf-tabs .pf-pane .pf-empty` — sekme barı (`?tab=`, `&empty=1`)
- `.badge-band .bh-cnt .badge-grid .badge-card .badge-ico .badge-lock .locked` — kompakt rozet teaser bandı (sekmelerin ALTINDA, büyük vitrin değil)
- `.flw-modal .flw-panel .flw-tabs .flw-row .flw-av .flw-info .flw-fol` — takipçi/takip modalı (`?flw=1`)
- `.menu-card .menu-thumbs .menu-cnt .menu-meta` menü koleksiyon kartı · `.puf-card .puf-fig .puf-tag .pufl-grid` püf kartı
- `.try-note .tn-ph .tn-stars` — "denedim" yazar/not satırı (kaydedilen/favori kartlarında)

## 2c. Dalga 2'de doğan bileşenler (Dalga 3+ MİRAS alır — yeniden icat YASAK)

> CSS'i ilgili kaynak dosyanın diskteki SON hâlinden verbatim kopyala;
> class adlarını DEĞİŞTİRME.

### dmCart sepet izleri — kaynak `dada-shop-v1.html` (urun-liste/detay aynısını taşır)
- `.cart-wrap .cart-btn .cart-badge` — header sepet ikonu + pop animasyonlu sayaç
  (id'ler: `cartWrap cartBtn cartBadge`). YALNIZ shop ailesi sayfalarında (bilinçli
  shell sapması); Dalga 3'te sepet/ödeme/sipariş sayfaları da bu aileye katılır
- `.cart-dd .cdd-head .cdd-body .cdd-item .cdd-th .cdd-info .cdd-price .cdd-empty
  .cdd-foot .cdd-sub .cdd-go` — header dropdown sepet önizleme
- `.cart-toast .ct-ico .ct-text .ct-go` — "sepete eklendi" toast'ı
- `window.dmCart` mock motoru: `add(name, price, qty, img)`; `.p-add` butonları
  otomatik bağlanır (`dmPriceNum`/`dmImgOf` yardımcıları). Sepet TAM SAYFASI bu
  motorun ÜSTÜNE kurulur, motoru yeniden yazmaz; `.cdd-go`/"Sepete Git" →
  `sepet-v1.html`

### Dolap/raf ailesi — kaynak `tarif-bulucu-v1.html`
- `.tb-layout .tb-left .tb-right .tb-head .tb-head-row .tb-bar .tb-sum .tb-sort
  .tb-grid .tb-empty .tb-div .tb-sec` — sol sticky dolap paneli + sağ CANLI sonuç grid'i
- `.raf-rack .raf-item` (+ `.raf-head`) — akordeon raf grubu (malzeme seçimi)
- `.dlp-bar .dlp-count .dlp-live .dlp-strip` — dolap durum çubuğu / canlı sayaç;
  mobil sheet: `.dlp-sheet-head .dlp-sheet-foot .dlp-sheet-close`

### Hesaplayıcı form + gauge şablonu — kaynak `hesaplayici-v1.html` (×6 tam sayfa bundan türetilir)
- `.calc-top .calc-layout .calc-head .calc-card-box .calc-switch .calc-actions` —
  sayfa iskeleti + hesaplayıcı geçiş (sekme) barı. Dalga 3'te sekme barı GERÇEK
  sayfa linklerine döner (6 ayrı dosya)
- `.res-box .res-num .res-num-row .res-cat .res-desc` — sonuç kartı
- `.gauge .gauge-track .gauge-bar .gauge-needle .gauge-scale .gauge-labels` —
  ibreli sonuç göstergesi (BKİ deseninden uyarlama; her hesaplayıcı kendi
  skala/kategori etiketlerini verir)
- Form alanları `fk-*` kitinden (§2b); cinsiyet/aktivite seçimleri chip/segment dili

### Wizard mirası notu (KURAL)
- `bugun-ne-pisirsem-v1` tarif-ekle stepper'ını (`.stepper .stp .stp-num .stp-lbl
  .stp-line` + `.wiz-foot`) miras aldı, üstüne `.bnp-top .bnp-head .bnp-body
  .bnp-restart` ekledi. YENİ çok adımlı akışlar (checkout, onboarding vb.) AYNI
  stepper ailesinden türetilir — yeni stepper icadı YASAK

### Landing hero varyantları — `lst-hero` ailesi (atası tarif-liste, §2b)
- kategori / koleksiyon / seo-landing / gunun-menusu hero'ları hep `.lst-hero`
  koyu-overlay dilinin varyantı; ekler: `.lh-main .lh-chips .lh-note .clh-note`
- seo-landing: `.seo-intro .seo-intro-grid .seo-prose .seo-aside .seo-quick` —
  uzun-form SEO metin bloğu (rehber/uzun içerik sayfalarına referans dil)
- koleksiyon: `.coll-* .coldex-*` (dizin rayı) · günün menüsü: `.arc-*` (arşiv rayı)

### Diyetisyen kart dili — kaynak `diyetisyen-dizin-v1.html`
- `.dz-grid .dz-card .dz-top .dz-ava .dz-id .dz-verify .dz-rate .dz-tags .dz-tag
  .dz-meta .dz-price .dz-foot .dz-go .dz-save .dz-ribbon` — doğrulanmış uzman kartı

### Reyon-grup alışveriş listesi — kaynak `haftalik-menu-v1.html`
- `.shop-layout .shop-list .shop-sec .shop-group .shop-ghead .shop-headrow
  .shop-items .shop-item .shop-summary` — reyon başlıklı, işaretlenebilir liste;
  `alisveris-listesi-v1` bu dili miras alır (üstüne manuel kalem ekleme +
  "sepete aktar" köprüsü gelir)

## 2d. Dalga 3'te doğan bileşenler (sonraki işler MİRAS alır — yeniden icat YASAK)

> CSS'i ilgili kaynak dosyanın diskteki SON hâlinden verbatim kopyala;
> class adlarını DEĞİŞTİRME. (Final cila turunda yazıldı.)

### Auth ailesi — kaynak `giris-v1.html` / `onboarding-v1.html` / `hesabim-v1.html`
- `.au-layout .au-card .au-head .au-pane .au-row .au-div .au-alt .au-perks
  .au-forgot .au-back` — split-auth iskeleti: sol form kartı + sağ fayda paneli;
  `?tab=giris|kayit|sifre` sekme sözleşmesi
- `.fk-pass .fk-eye` — şifre alanı + göz toggle'ı (fk-* kitinin auth eklentisi)
- `.tgl .tk` — anahtar (switch) bileşeni (onboarding'de doğdu; hesabim +
  dyt-profil-ayar miras aldı). Token radius; pill DEĞİL
- `.nt-top .nt-filter .nt-list .nt-day .ntr .nt-body .nt-foot .nt-unread-badge` —
  bildirim satırı ailesi (kaynak `bildirimler-v1.html`); tip ikonu + gün grubu +
  okundu yönetimi

### Shop II ailesi — kaynak `sepet-v1.html` / `odeme-v1.html` / `siparislerim-v1.html`
- `.sum-card` — sipariş/sepet özet kartı (ara toplam + kargo eşiği + CTA);
  sepet ve ödeme aynı dili paylaşır
- `.pick-card` — seçim kartı (adres / kargo / ödeme yöntemi radio kartı, odeme)
- `.tml` — dikey sipariş takip timeline'ı (siparislerim `?detay=1`)
- `.ost` — sipariş durum rozeti (radius-sm; pstat'ın public karşılığı)

### Rehber ailesi — kaynak `sozluk-v1.html` / `mutfaga-giris-v1.html`
- `.az-bar` — A-Z harf çubuğu (29 TR harfi; `?harf=` derin link; canlı filtre)
- `.term-row` — sözlük terim satırı (`?terim=` derin link; mutfak-sirlari hub'ı
  teaser olarak miras aldı)
- `.lvl` — seviye rozeti (Başlangıç/Orta/İleri; mutfaga-giris konu kartları)

### Hesaplayıcı ekleri — kaynak `gunluk-kalori-v1.html` / `ideal-kilo-v1.html`
- `.kcal-bands .kb` — koru/ver/al kalori bandı üçlüsü (ideal-kilo BKİ aralık
  kartlarında varyantı)
- Hesaplayıcı iskeleti §2c'deki calc+gauge şablonudur; 6 tam sayfa bu dilden

## 2e. PANEL DİLİ — Dalga 4, kaynak `panel-shell.html` (diyetisyen paneli ailesi)

> Diyetisyen paneli SİTE CHROME'U KULLANMAZ — uygulama düzeni: sol dikey
> sidebar + üst ince bar + içerik. Yeni panel sayfası = `panel-shell.html`
> kopyası (İÇERİK ALANI doldurulur, sayfa CSS'i "SAYFA CSS" işaretinin altına).
> Token/radius/font _shell ile BİREBİR; aksan YEŞİL (`--green/--green-deep/
> --green-tint`), domates yalnız ikincil vurgu (iptal/uyarı/kırmızı nokta).
> Section zemin ritmi YOK — gri `--bg` zemin üzerinde BEYAZ KART ritmi VAR.

### Düzen iskeleti (shell'de hazır, dokunma)
- `.pnl-app` kök · `.pnl-side` koyu slate sidebar (248px, `--pnl-side-w`) ·
  `.pnl-top` ince üst bar (64px, `--pnl-top-h`) · `.pnl-main` içerik
  (margin-left + padding-top shell'den; `.below-header` PANELDE KULLANILMAZ)
- Sidebar: `.pnl-logo` (beyaz logo + `.pl-tag` PRO rozeti) · `.pnl-nav` ·
  `.pnl-link` (+ `.is-active` yeşil sol çubuk; `i` ikon; `.pl-cnt` sayaç) ·
  `.pnl-sec-lbl` grup etiketi · `.pnl-side-foot` (Public Profilim + Siteye Dön)
- Üst bar: `.pnl-burger` (≤980 görünür) · `.pnl-search` (yeşil focus ring) ·
  `.pnl-top-tools` · `.pnl-bell` (+ `.pb-dot` domates nokta) · `.pnl-me`
  (avatar `.pm-ava` yeşil ring + `.pm-name/.pm-role`)
- Mobil ≤980: sidebar off-canvas (`body.nav-open` + `.pnl-overlay`); SS paramı `?nav=1`
- Sayfa başı: `.pnl-page-head` (h1 24px + `.ph-sub` + `.ph-actions`)

### Panel bileşenleri (her panel sayfası BUNLARDAN kurar)
- **`.pnl-card`** panel kartı: `.pc-head` (`.pc-title` ikonu yeşil + `.pc-link`) ·
  `.pc-body` (`.flush` = padding'siz, tablo/liste için) · `.pc-foot`
- **`.kpi-grid .kpi-card`** KPI kartı: `.kpi-ico` (yeşil-tint kutu; `.warm`
  domates / `.sun` sarı varyant) + `.kpi-num .kpi-lbl .kpi-delta(.up/.down)`
- **`.pstat`** durum rozeti (radius-sm, pill YASAK): `.ok` onaylı/dolu ·
  `.wait` onay bekliyor · `.off` boş/pasif · `.warm` iptal/gecikmiş
- **`.ptable`** panel tablosu (uppercase gri th + hover satır; `.pc-body.flush` içine)
- **`.appt-list .appt-row`** randevu satırı: `.appt-time` (yeşil saat bloğu;
  `.is-online` krem varyant) + `.appt-ava .appt-info .appt-name .appt-meta .appt-act`
- **`.mm-list .mm-row`** mini mesaj satırı: `.mm-av` (+`.is-unread` yeşil nokta)
  `.mm-info .mm-name .mm-prev .mm-time`
- **`.cl-grid .cl-card`** danışan özet kartı: `.cl-top .cl-ava .cl-id .cl-name
  .cl-goal` + `.cl-prog .cl-prog-row .cl-bar` (yeşil gradient ilerleme çubuğu)
- **`.pnl-empty`** panel boş durumu (`.pe-ico` yeşil-tint kutu + h4 + p + CTA)
- **`.btn-green`** panel birincil aksiyonu · `.btn-sm` kompakt boy ·
  `.chip.is-on` yeşil aktif chip
- Form alanları yine `fk-*` kitinden (§2b); çok adımlı akış yine `.stepper`
  ailesinden (§2c kuralı) — panel yeni form/stepper İCAT ETMEZ
- GRID KURALI: panel grid kolonları HEP `minmax(0,1fr)` (1fr'nin min-width:auto
  taşması 390'da yakalandı — panel-shell vakası)
- **`.vw-seg .vs-btn`** görünüm segmenti (Hafta/Gün, Kart/Tablo geçişi) — iki
  sayfada bağımsız doğdu, final cilada KANONİK ilan edildi (kaynak
  `dyt-randevular-v1.html`); yeni panel görünüm geçişleri bu dilden

## 2f. HERO + BREADCRUMB KANONU (CİLA-2 Faz 3 — site geneli, yeniden icat YASAK)

> Kaynak: mevcut en iyi örneklerden TÜRETİLDİ (icat yok). Liste/landing hero
> atası `tarif-liste-v1` `.lst-top/.lst-hero`; detay editoryal hero atası
> `puf-noktasi-detay-v1` `.art-hero` (Faz 1 overlay-crumb düzeltmesi); detay
> yapısal hero atası `tarif-detay-v1` `.rd-top/.rd-head`. Krem-zemin hero
> REDDEDİLDİ (§2b) — saglik-testler vakası bunun son tortusuydu, temizlendi.

### Breadcrumb — `.rd-crumb` TEK KANON
- Markup: `<nav class="rd-crumb" aria-label="Sayfa yolu">` → `<a><i fa-house></a>`
  → ayraç `<i fa-chevron-right>` → ara seviye `<a>` → son seviye `<b>`
  (ellipsis + `max-width`). 55 sayfada birebir bu yapı.
- Renk bağlamı 2 mod: **açık zemin** = default (muted link / slate `<b>`);
  **koyu hero üstü** = beyaz override (`.lst-top .rd-crumb{color:#c9c3b8...}`
  ya da görselli detayda `.rd-crumb.art-hero-crumb` beyaz + `text-shadow`).
- Header-altı nefes: crumb ilk içerik satırıdır, header çizgisinden **≥16px**
  (§3 kuralı). Yeni breadcrumb İCAT EDİLMEZ — `.rd-crumb` kopyalanır.
- **🔴 H1 KOYU HERO HEADER-ALTI NEFESİ (Beyar canlı inceleme, reklam-ver vakası):**
  Koyu hero ile header arasında kart-ayrımı YOK; standart 112/62 offset + crumb
  18px = 18px nefes SIKIŞIK görünür. KANON: H1 koyu hero konteyneri
  (`.lst-top` / `.sh-top` / `.tst-top`-sağlık) **`padding-top:128px` (mobil 74px)**
  = standart 112/62 header offset **+ 16px (mobil +12px) ek nefes**. Crumb global
  18/14 korunur → toplam header-altı nefes ~34px (mobil ~24px). Crumb→hero
  içeriği ritmi (crumb alt 14 + `.lst-hero` üst 10) DEĞİŞMEZ. Açık zemin H3/light
  crumb'da standart 112/62 YETERLİ (kart-ayrımı var, bump YAPILMAZ). vhub-hero
  (crumb'sız immersive) bu kuraldan muaf.
- Crumb taşımayan kasıtlı sayfalar: anasayfa, hata-404, video-mutfagi (koyu
  hub), panel ailesi (chrome'suz). Bunlara crumb EKLENMEZ.

### Hero — 3 KANON VARYANTI + "hak-ediş" kuralı
Sayfa tipi → varyant eşlemesi TEK kurala bağlı:

**H1 · Landing/Hub hero (koyu-overlay görselli)** — `.lst-top` + `.lst-hero`
(+ `.lh-main .lh-chips`, opsiyonel `.lst-stats`). Overlay = `linear-gradient(
90deg, rgba(28,25,18,.93), rgba(33,30,22,.72))` + Unsplash cover/center (v3a
filtre suffix'i). Beyaz crumb + eyebrow + h1 + lead + cam-chip rayı.
- **Sağlık yeşil-tint varyantı** `.sh-top` (overlay `rgba(18,28,22,.94),
  rgba(20,32,25,.74)`) — sağlık ailesi hub'ları (saglik-hub, saglik-testler).
- **Koyu hub varyantı** `.vhub-hero` (video-mutfagi) — aynı aileden, kendi
  oynatma kuyruğu ekli; H1 sayılır.
- KİMLER: içerik dizini/kategori/koleksiyon/sezon/landing/SEO/hub/keşif vitrin
  sayfaları (tarif-liste, kategori, koleksiyon, sezon, gunun-menusu, seo-landing,
  ansiklopedi, sss, mekan-liste, akademi, diyetisyen-dizin, puf-noktalari,
  reklam-ver, hakkimizda, mutfaga-giris, saglik-hub, saglik-testler).

**H2 · Detay hero** — iki KABUL EDİLMİŞ alt-desen (sayfanın doğasına göre):
- **H2a editoryal/makale** `.art-hero` (+ `.art-hero-top/.art-hero-crumb/
  .art-back/.art-hero-main/.art-cat/.art-hmeta`): görselli koyu, alt-hizalı,
  overlay-içi beyaz crumb + "Geri" butonu + başlık + yazar/okunma meta. Overlay
  bottom-gradient (.12→.34→.82). KİMLER: puf-noktasi-detay, mutfaga-giris-detay,
  ansiklopedi-detay.
- **H2b yapısal/künyeli** `.rd-top` + `.rd-crumb` + `.rd-head` + `.kunye-col`:
  açık zemin crumb + 2-kolon hero + dikey künye. KİMLER: tarif-detay, mekan-detay,
  (shop: urun-detay — DOKUNMA), siparislerim (ord-top künye).

**H3 · Kompakt fonksiyonel üst (hero görseli YOK)** — `*-top{bg-white|bg-cream;
border-bottom:1px solid var(--line)}` + `.rd-crumb` + kompakt başlık. KİMLER:
kullanıcı GÖREVİ sayfaları — form/wizard (tarif-ekle, puf-ekle, diyetisyen-ol,
onboarding), arama, bildirimler, hesabim, profil-ayar,
tarif-bulucu, haftalik-menu, alisveris-listesi, kesfet, besin-kutuphanesi,
diyet-listeleri/program-detay, giris(au-top), hesaplayıcılar (calc-top muaf dil).
(NOT: checkout sepet/odeme H3 DEĞİL — shop kabuğu, KAPSAM DIŞI; siparislerim H2b verify-only.)

**HAK-EDİŞ KURALI (hangi sayfa hangi varyant):**
1. İçerik KEŞFİ / pazarlama / SEO / kategori-koleksiyon vitrin → **H1** koyu hero.
2. Tek bir kayıt/varlık DETAYI → **H2** (editoryal=H2a, yapısal-künyeli=H2b).
3. Kullanıcı GÖREVİ (form, checkout, arama, ayar, hesaplayıcı, app-list) → **H3** kompakt.
> Şüphede: "bu sayfa içerik mi sergiliyor (H1), bir şeyi mi anlatıyor (H2),
> yoksa kullanıcıya iş mi yaptırıyor (H3)?" Krem-zemin ORTALI head ARTIK YASAK —
> bir hub/landing'e denk geliyorsa H1'e, göreve denk geliyorsa H3 (sol-hizalı
> kompakt crumb+başlık) düzenine çekilir.

### Profil & muaf
- Profil hero `.pf-top` (banner+avatar+sayaç, §2b) kendi dilidir — H1/H2/H3 dışı.
- Hesaplayıcı `.calc-top` fonksiyonel muaf dil (H3 akrabası).
- Shop ailesi + panel ailesi KAPSAM DIŞI (dokunma).

### 🔴 Faz 3 ZORUNLU düzeltme
- **saglik-testler-v1** `.tst-top{background:var(--bg-cream)}` ortalı head →
  H1 sağlık yeşil-tint (`.sh-top` dili, saglik-hub ile birebir): koyu-overlay
  görselli, sol-hizalı, beyaz crumb. İçerik (eyebrow/h1/lead/`.tst-meta`) korunur.
- **test-detay-v1** `.tst-top` krem: lead kararına bağlı — fonksiyonel test-çözme
  ise H3 kalır, sağlık aile tutarlılığı isteniyorsa H1 yeşil hero'ya çekilir.

## 3. Dil kuralları (kısa)

- Radius: SADECE token (`--radius-sm/md/lg/xl/circle`); `--radius-pill` yalnız bottom-nav mirası — YENİ pill yok
- Görsel: `<img>` değil `div + background-image cover/center`; 2x retina çarpma yok; Unsplash URL'lerine v3a'daki filtre suffix'i (`exp=7&gam=6&sat=-9&high=8&vib=5`)
- İkon: FontAwesome 6.5.2 (kilitli set); bayrak: flagcdn `<img>`, emoji YASAK
- Renk: domates baskın; yeşil yalnız sağlık/indirim; sarı yalnız puan; koyu `--slate`
- Boş durum: ikon + başlık + açıklama + CTA (domates-tint zemin ikon kutusu)
- Mobil: ≤640 grid'ler yatay snap slider'a döner (v3a pattern'ı); 390'da yatay scroll SIFIR
- **Header-altı nefes (Dalga 2 kapanış kuralı):** sayfanın İLK section'ı HER ZAMAN
  `.below-header` alır (112px / mobil 62px) — **inline `style="padding-top:0"` override
  YASAK** (fixed header içeriği yutar; dada-shop vakası). Section'ın ilk içerik satırı
  (breadcrumb / chip / eyebrow) header çizgisinden **≥16px iç nefes** alır (Dalga 1
  standardı ~17px; saglik-hub vakası `.rd-crumb{margin-top:16px}` ile çözüldü)

## 3b. MOBİL SABİT-ALT-KATMAN KURALI (Revize-2 — yeniden icat YASAK)

> Kaynak vaka: tarif-detay mobilde actbar+çerez+nav 3 katman yığılması (Beyar
> gerçek cihazda yakaladı). Detay: `outputs/revize2-mobil1.md` §1–§3.

- **Kural:** Bir mobil ekranda en fazla **1 sabit alt şerit** görünür.
- **Öncelik sırası:** çerez onayı (geçici gate, en üst) > sayfanın kendi aksiyon
  şeridi > global bottom-nav.
- **Mekanizma (55 sayfada aynı, kaynak `_shell.html`):** `.bottom-nav.bn-hidden`
  (translateY gizleme, .26s) + `window.__bnUpdate` yöneticisi. Sayfanın kendi
  sabit şeridi varsa `window.__bottomStrips=['#selector']` ile kaydedilir; şerit
  `.show` iken nav gizlenir. Şeritli sayfada nav ayrıca scroll-down'da gizlenir
  (threshold 12px; tepe <80px'te görünür). Çerez açıkken nav VE şerit bastırılır.
- **Birleştirme YAPILMAZ:** aksiyon şeridi tam genişlik kalır, nav ona feda olur
  (bottom-nav'a buton gömmek dili bozar — Revize-2 kararı).
- **Yeni sayfa:** `_shell.html`'den türet → kural otomatik gelir. Kendi sabit
  şeridi olan yeni sayfa SADECE `__bottomStrips`'e selector ekler.
- **Muaf:** panel ailesi (panel-shell + dyt-*) ve hesaplayici-v1 — public chrome
  (çerez+bottom-nav) taşımazlar.
- **Probe tuzağı:** alt katman taramasında filtre bandını dar tutma — çerez kartı
  mobilde `bottom:calc(80px+safe-area)` ile nav'ın ÜSTÜNDE durur; `bottom>vh-20`
  filtresi onu kaçırır (Revize-2'de yakalanan kör nokta). Doğru tanım: **bottom-pinned**
  (fixed + CSS `bottom` set + alta sabit + kısa/geniş); sticky-top şeritleri
  (`.dl-filter`/`.pf-tabbar`) ve ekran-altı `bn-hidden` nav'ı hariç tut. Ayrıca çerez
  `setTimeout(700ms)` ile belirir — erken snapshot onu görmez, probe'u ≥1s beklet.

## 4. Bilinen SS notu (kök neden bulundu — profil teammate)

Headless Chrome'un MIN pencere genişliği 500px: `--window-size=390` verilse de
layout 500px'te kurulur, PNG 390'a kırpılır → sağ kenardaki öğeler (header
ikonları vb.) SS'te "kayıp" görünür. Sayfa hatası DEĞİL. Mobil SS çözümü:
500px'te al (aynı ≤640 kırılımı) + 390 taşmazlığını JS probe/iframe ile doğrula.
