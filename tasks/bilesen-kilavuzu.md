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
- **Form/etkileşim kiti:** `.rev-form` (yorum formu: `.rf-stars .rf-text .rf-photo .rf-chips`) — form sayfası için referans dil; `.rev-filter` filtre çipleri; `.rev-summary .rs-bars` puan dağılımı
- **Liste satırı kiti:** `.ing-panel .ing-list .ing-row .ing-head/.ing-group` (checkbox'lı satır + grup başlığı) · `.ing-pop/.conv-pop` popover ailesi · `.shop-pop` çoklu satıcı popover
- **`.note-duo`** (hatırlatma `.remind-box` + editör notu `.editor-box` yan yana grid)
- **`.mw-grid .mw-item`** masonry foto duvarı + `.mw-up` yükleme tile'ı
- **`.lightbox`** (grup içi ok/klavye gezinme) · `.video-modal .vm-frame` · `.actbar` sticky aksiyon barı · `.tagshare` hashtag+paylaşım rayı
- **`.author-card .rd-follow`** şef mini kartı + takip butonu (profil sayfası başlangıç dili)
- **`.cookmode .cm-*`** pişirme modu (BU DALGADA KULLANILMAZ — form sayfası HARİÇ tutuldu)

## 3. Dil kuralları (kısa)

- Radius: SADECE token (`--radius-sm/md/lg/xl/circle`); `--radius-pill` yalnız bottom-nav mirası — YENİ pill yok
- Görsel: `<img>` değil `div + background-image cover/center`; 2x retina çarpma yok; Unsplash URL'lerine v3a'daki filtre suffix'i (`exp=7&gam=6&sat=-9&high=8&vib=5`)
- İkon: FontAwesome 6.5.2 (kilitli set); bayrak: flagcdn `<img>`, emoji YASAK
- Renk: domates baskın; yeşil yalnız sağlık/indirim; sarı yalnız puan; koyu `--slate`
- Boş durum: ikon + başlık + açıklama + CTA (domates-tint zemin ikon kutusu)
- Mobil: ≤640 grid'ler yatay snap slider'a döner (v3a pattern'ı); 390'da yatay scroll SIFIR

## 4. Bilinen SS notu (kök neden bulundu — profil teammate)

Headless Chrome'un MIN pencere genişliği 500px: `--window-size=390` verilse de
layout 500px'te kurulur, PNG 390'a kırpılır → sağ kenardaki öğeler (header
ikonları vb.) SS'te "kayıp" görünür. Sayfa hatası DEĞİL. Mobil SS çözümü:
500px'te al (aynı ≤640 kırılımı) + 390 taşmazlığını JS probe/iframe ile doğrula.
