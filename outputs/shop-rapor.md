# Dada Shop (F8) — Üretim Raporu · Dalga 2 / teammate `shop`

> 3 sayfa: `dada-shop-v1.html` (vitrin) · `urun-liste-v1.html` (ürün liste) ·
> `urun-detay-v1.html` (ürün detay). Saf frontend mockup, `_shell.html` kopyası.
> Sepet/ödeme KAPSAM DIŞI (Dalga 3) — sepet butonları görünür, hedefsiz/mock.

---

## 1. L1 — Eski template blok envanteri + kıyas

### 1a. `urunler.html` → `urun-liste-v1.html`

Eski sayfanın blokları: header/nav (kanonik) · product-slider (üst kampanya
banner) · shop-product-fillter (2 sort dropdown) · product-cart-wrap grid
(img + action + category + rating + price) · pagination-area · primary-sidebar
(widget-category-2 ×N, sağda) · footer.

| Eski blok | Yeni karşılık | Karar |
|---|---|---|
| product-slider (kampanya banner) | shop vitrine taşındı / liste dark hero bandı | BİRLEŞTİ |
| shop-product-fillter (sort ×2) | `.sort-dd` tek sıralama menüsü | SADELEŞTİ |
| product-cart-wrap grid | `.p-card` grid (3 kolon) | YENİDEN TASARLANDI |
| pagination-area | `.pagi` token dili (pill yok) | KORUNDU |
| primary-sidebar widget (sağ) | `.lst-side` facet paneli (sol, sticky) | YER+ROL DEĞİŞTİ, ZENGİNLEŞTİ |
| — | Fiyat/Puan/Marka/Özellik/Durum facet'leri | YENİ |
| — | boş durum + mobil filtre sheet + aktif chip | YENİ |

### 1b. `urun-detay.html` → `urun-detay-v1.html`

Eski bloklar: header/nav · detail-gallery (product-image-slider + thumbnails) ·
detail-info (stock-status "İndirimde", rating, current/old price, qty stepper,
add-to-cart + wishlist, meta ul) · tab-style3 (Açıklama / Kampanya / Yorumlar) ·
reviews (form + nested yorum listesi: beğen/yanıtla/bildir) · footer.
**Eskide YOK:** varyant seçici, "bu ürünle yapılan tarifler", benzer ürünler.

| Eski blok | Yeni karşılık | Karar |
|---|---|---|
| detail-gallery (slider+thumbs) | `.pd-main` + `.pd-thumbs` + lightbox | YENİDEN TASARLANDI |
| stock-status "İndirimde" | `.tbadge` rozet grubu (indirim/organik/kargo/garanti) | GENİŞLEDİ |
| product-detail-rating | `.pd-rate` (yıldız+puan+yorum linki+satış adedi) | KORUNDU+ZENGİNLEŞTİ |
| product-price (current/old) | `.pd-price-box` (now/was/save/KDV) | KORUNDU+ZENGİNLEŞTİ |
| detail-qty stepper | `.qty-stepper` (min/max sınırlı) | KORUNDU |
| add-to-cart + wishlist | `.btn-cart` + `.pd-fav` + `.pd-share` + `.pd-buynow` | KORUNDU+GENİŞLEDİ |
| meta ul (kod/ölçü/stok) | `.pd-meta` 2-kolon künye grid | KORUNDU |
| tab-style3 (Açıklama/Kampanya/Yorum) | `.pd-tabs` (Açıklama/Özellikler/Kargo&İade) | YENİDEN KURGULANDI |
| reviews (form+nested list) | `.rev-summary/.rev-form/.rev-list/.c-item` (TD mirası) | YÜKSELTİLDİ |
| — | "Bu ürünle yapılan tarifler" r-card rayı (m19) | YENİ |
| — | varyant seçici (boyut `.pv-opt` + renk `.pv-sw`) | YENİ |
| — | benzer ürünler p-card rayı | YENİ |
| — | `.pd-assure` teslimat güvencesi satırları | YENİ |

### 1c. Vitrin (`dada-shop-v1.html`) — doğrudan eski karşılık YOK

En yakın akraba: `index.html` shop bölümleri + `urunler.html` üst product-slider
banner. Eski sitede ayrı bir "shop vitrini" sayfası yok; ana sayfanın içine gömülü
ürün şeritleri vardı. Yeni vitrin yapısı:

| Blok | Kaynak | Karar |
|---|---|---|
| Kampanya şeridi (kargo/iade/ödeme) | — | YENİ |
| Dark kampanya hero | liste hero dili (görselli koyu overlay) | MİRAS-VARYANT |
| Kategori girişleri | cat-card/cat-track (v3a 268–287) | MİRAS |
| Çok satanlar / İndirim / Yeni rayları | p-card (v3a 449–465) | MİRAS |
| İkili editöryal promo | (tarif→sepet köprüsü m19 teaser + yöresel) | YENİ |
| Güven bandı (kargo/iade/ödeme/destek) | — | YENİ |

---

## 2. Tasarım kararları

- **p-card** (v3a verbatim) 3 sayfada da ürün kartı; kıyasla eklenenler:
  `.p-rate` puan satırı, `.p-flag.new` yeni rozeti, `.p-oos` "stokta yok" overlay.
- **facet paneli** `tarif-liste-v1`den BİREBİR miras (CSS class adları değişmedi);
  ürün facet'leriyle yeniden dolduruldu: Kategori (18 mirası, "daha fazla"),
  Fiyat Aralığı (min-max input + 4 aralık), Puan (4.5+/4.0+/3.0+ yıldız satırı),
  Marka, Özellik (Organik/El Yapımı/Vegan/Glutensiz/İndüksiyon), Kampanya&Stok.
  JS mantığı F2'den uyarlandı (grup-içi OR, gruplar-arası AND-min, boş durum,
  sheet, sort, aktif chip senkronu). Boş kombinasyon demo: Organik + Bıçak&Kesim.
- **liste hero bandı** (görselli koyu overlay 0.3–0.4, LANDING ATASI) hem vitrin
  hem liste için; krem zemin REDDEDİLDİ kuralına uyuldu.
- **r-card** (v3a) urun-detay m19 rayında, göreli link `tarif-detay-v1.html`.
- **rev-*** (TD) ürün yorumlarına uyarlandı; "Tarif Sahibi" → "Doğrulanmış Alıcı"
  + "Satıcı" yanıtı rozetleri. Yıldız ZORUNLU form mantığı korundu.
- Dil kuralları: yalnız radius token, pill yok, `<img>` değil div+bg-image
  (Unsplash filtre suffix'i ile), FA 6.5.2, emoji bayrak yok. Renk: domates
  baskın, yeşil yalnız indirim/organik(sağlık), sarı yalnız puan, koyu slate.
- Section ritmi gri↔beyaz alternasyonu; boş durum domates-tint ikon kutusu.
- Chrome'a dokunulmadı; yalnız nav `active` Tarifler→Dada Store taşındı, Dada
  Store dropdown linkleri urun-liste'ye bağlandı. Mega menü KİLİTLİ.
- Mobil: ≤640 ürün rayları yatay snap; liste grid 2-kolon kaldı (e-ticaret deseni,
  r-card'daki tek-kolon-yatay-mini deseni yerine — ürün için 2'li grid daha doğru).

## 3. Doğrulama

- **SS** (`mockups/.ss-scratch/`):
  - `dada-shop-1440.png`, `dada-shop-500.png`
  - `urun-liste-1440.png`, `urun-liste-500.png`
  - `urun-detay-1440.png`, `urun-detay-500.png`
  - Mobil SS 500px'te alındı (headless Chrome min-pencere kuralı, kılavuz §4).
- **Konsol hatası: 0** — CDP Runtime probe, 3 sayfa.
- **390px taşma: YOK** — `scrollWidth == clientWidth == 390` (CDP probe).
  Tek "off-screen" eleman parked `.drawer` (kapalı off-canvas menü, beklenen).
- Lokal sunucu: `python3 -m http.server 8765` (zaten ayaktaydı).

## 4. Açık sorular (Beyar/team-lead kararı)

1. **Vitrin kampanya hero'su** — tek statik banner mı, dönen carousel mı?
   (şimdilik tek statik, "Mutfak Şenliği" kampanyası).
2. **Ürün rayları desktop davranışı** — şu an v3a deseniyle 4'lü statik grid
   (oklar mobilde slider). Gerçek desktop slider istenirse row-track flex'e döner.
3. **Stokta yok ürün** — "stoğa gelince haber ver" mi, sepet-dışı mı?
   (şimdilik bell ikonu + disabled buton + overlay).
4. **Varyant stok matrisi** — 32cm/disabled mock. Gerçek varyant×stok mantığı
   stack işi.
5. **Marka & Özellik facet değerleri** — mock (DadaSelect/Karaca/Emsan…). Gerçek
   marka seti onay bekler.
6. **"Bu ürünle yapılan tarifler" (m19) eşleştirme kaynağı** — editör seçkisi mi
   otomatik mi? (köprünün karşı ucu, tarif-detay shoprail ile simetrik).

## 5. Shell'den BİLİNÇLİ SAPMA — Sepet izleri (Beyar ara talimatı)

> KRİTİK: Aşağıdaki eklemeler YALNIZCA 3 shop sayfasının (`dada-shop-v1`,
> `urun-liste-v1`, `urun-detay-v1`) KENDİ header kopyalarına yapıldı.
> `_shell.html` ve diğer tüm sayfaların header'ı READ-ONLY — DOKUNULMADI.
> Bu, kanonik chrome'dan tek bilinçli sapmadır; başka sayfa bu sepet ikonunu almaz.

Beyar talimatı (① p-card sepete ekle · ② detay adet+CTA+geri bildirim · ③ header
badge'li sepet ikonu) 3 maddesi de uygulandı:

- **① p-card "Sepete Ekle":** vitrin + liste kartlarındaki `.p-add` (+) butonu artık
  mock sepete ekliyor — kart linkini tetiklemeden (`stopPropagation`), buton yeşil
  ✓ geri bildirimi + badge artışı + toast.
- **② urun-detay:** adet stepper (1–10) + büyük `.btn-cart` "Sepete Ekle" CTA;
  tıklanınca buton "Sepete Eklendi (n)" state'ine geçer, badge adet kadar artar,
  toast çıkar. (Ayrıca `.pd-buynow` "Hemen Al" + `.pd-fav`/`.pd-share`.)
- **③ Header sepet ikonu:** `.head-actions` içinde, arama ikonunun YANINA
  `<button class="icon-btn cart-btn hdr-cart" id="cartBtn">` + `<span class="cart-badge">`
  (fa-cart-shopping). Badge başta gizli, eklemede pop animasyonlu artar. Tıklayınca
  mini dropdown önizleme (`.cart-dd`: boş durum / ürün satırları + ara toplam +
  "Sepete Git" href="#"). Gerçek sepet sayfası Dalga 3'te bu linke bağlanacak.
  Sınıf adları team-lead doğrulama kriterine göre AYNEN: `hdr-cart`, `cart-badge`,
  `cart-toast`. Desktop + mobil header'da görünür (mobilde de badge çalışır).
- **Mock sepet motoru (`window.dmCart`):** sayfa içi JS — badge sayacı + dropdown
  satırları + ara toplam + toast. Kart/CTA verisini DOM'dan okur (ad/fiyat/görsel).
  Sepet state'i sayfalar arası KALICI DEĞİL (mock, localStorage yok — Dalga 3 işi).
- Yeni CSS/markup token diliyle (radius token, domates badge, yeşil toast ✓ ikonu).
  Mobil: dropdown fixed tam-genişlik, toast bottom-nav üstünde.

**Doğrulama (CDP):** 3 sayfada 2× ekleme → badge=2, toast.show=true, dropdown 2
satır, ara toplam (2.480₺) hesaplandı; **konsol hatası 0** (3 sayfa). Grep kriterleri
geçer: `hdr-cart`(1), `cart-badge`(4), `cart-toast`(9), `stopPropagation`(5–7),
`window.dmCart` her sayfada. SS yenilendi (1440+500):
`{sayfa}-1440.png`, `{sayfa}-500.png`; ek demolar `dada-shop-cart-open.png`
(dropdown+badge+toplam), `mobile-header-cart.png` (mobil header badge=1).

## 6. Kapsam dışı (bilinçli bırakıldı)

- Sepet sayfası, ödeme/checkout, sipariş alındı → Dalga 3 (F9). Sepet ikonu/CTA'lar
  hazır, "Sepete Git" / "Sepeti Gör" linkleri Dalga 3'te bağlanacak.
- Sepet kalıcılığı (localStorage / sayfalar arası senkron) → Dalga 3.
