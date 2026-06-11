# Dalga 2 — Landing Ailesi Raporu (teammate: landing)

> 4 sayfa: kategori, koleksiyon, SEO landing, Günün Menüsü.
> Hepsi `tarif-liste-v1.html` `.lst-hero` **görselli koyu-overlay** hero bandının
> dilini MİRAS aldı (kılavuz §2b "LANDING AİLESİNİN ATASI"). Krem zemin kullanılmadı.
> Her sayfa `_shell.html` kopyasıyla başladı; chrome/mega menü KİLİTLİ, dokunulmadı.

## Durum özeti

| Sayfa | Dosya | 1440 SS | mobil SS | Konsol | 390 taşma |
|---|---|---|---|---|---|
| Kategori (Ana Yemekler) | `mockups/kategori-v1.html` | ✅ | ✅ | 0 hata | PASS (sw=390) |
| Koleksiyon (15 Dk Akşam) | `mockups/koleksiyon-v1.html` | ✅ | ✅ | 0 hata | PASS (sw=390) |
| SEO landing (Airfryer) | `mockups/seo-landing-v1.html` | ✅ | ✅ | 0 hata | PASS (sw=390) |
| Günün Menüsü (m11) | `mockups/gunun-menusu-v1.html` | ✅ | ✅ | 0 hata | PASS (sw=390) |

SS yolları (`mockups/.ss-scratch/`):
`kategori-1440.png` · `kategori-500.png` · `koleksiyon-1440.png` · `koleksiyon-500.png` ·
`seo-1440.png` · `seo-500.png` · `gunun-1440.png` · `gunun-500.png` · `probe-final.png` (390 taşma probu, 4/4 PASS).

---

## L1 kıyas tabloları (eski template → yeni tasarım)

Eski template dizini: `drive-download-20260608T070112Z-3-001/dada-mutfak-icerik/`.
Eski site Bootstrap + video-bg hero + blog/single-page kurgusu.

### 1) Kategori — eski `tarif-kategori.html` (2179 satır, Bootstrap)

| Eski blok | Karar | Yeni karşılık |
|---|---|---|
| `archive-header video-bg` (video hero + H1 + #hashtag breadcrumb) | **DÖNÜŞTÜ** | `.lst-top` görselli koyu band hero (KATEGORİ varyantı), derin breadcrumb (Ana > Tarifler > Ana Yemekler) + istatistik sütunu |
| "Tarif Ara" arama bölümü | **BİRLEŞTİ** | Hero'daki popüler chip rayı + facet paneli + chrome'daki global arama ikonu |
| recipe card grid (`col-lg-4/3`, ~19 kart) | **KORUNDU+MODERNLEŞTİ** | `.lst-grid` 3-kolon `r-card` (v3a anatomisi: yazar satırı, m-types, puan/görüntülenme) |
| `pagination-area` | **KORUNDU** | `.pagi` (token dili, pill yok) |
| (yok) alt kategori navigasyonu | **YENİ** | `.subcat-track` — thumbnail'lı alt kategori rayı (beyaz şerit) |
| (yok) facet/filtre paneli | **YENİ** | `.lst-side` facet paneli (alt kategori/mutfak/süre/zorluk/beslenme) — mobilde alttan sheet |
| modal'lar (görüş/iletişim) | **KORUNDU** | Shell'de hazır (`fb-modal`, `feedback-tab`) |

### 2) Koleksiyon — DOĞRUDAN karşılık YOK → en yakın akraba `tarif-kategori.html` + `ramazan-menu-detay.html`

Eski sitede koleksiyon şablonu yoktu. En yakın akraba: kategori grid'i (kart listesi) +
ramazan-menu-detay'ın editoryal/single-page kurgusu (excerpt + sıralı "1. Tarif / 2. Tarif" + paylaşım).

| Kaynak blok | Karar | Yeni karşılık |
|---|---|---|
| ramazan single-header (başlık + meta: yorum/tarih/görüntülenme + bookmark) | **DÖNÜŞTÜ** | `.lst-top` koleksiyon hero + küratör künyesi (`.coll-by`) + glass aksiyonlar (deftere/paylaş) + istatistik |
| ramazan `single-excerpt` (giriş metni) | **DÖNÜŞTÜ** | `.coll-note` editör notu (TD `editor-box` dili, sol turuncu border) |
| ramazan sıralı "1. Tarif / 2. Tarif" + "Detaylı Tarif İçin" linkleri | **MODERNLEŞTİ** | `.coll-grid` numaralı (`.r-rank` 01–06) sıralı `r-card` dizisi (Nefis "En Popüler N" modeli) |
| kategori kart grid'i | **KORUNDU** | r-card anatomisi |
| (yok) koleksiyonlar dizini | **YENİ** | `.coldex-track` mini dizini (sayfanın üstünde, hero altı) |
| paylaşım rayı | **BİRLEŞTİ** | Hero glass aksiyon + alt CTA (`.coll-cta`) |

### 3) SEO landing — DOĞRUDAN karşılık YOK → en yakın akraba `tarif-kategori.html`

Eski sitede SEO landing şablonu yoktu; kategori arşivi en yakını.

| Kaynak/ihtiyaç | Karar | Yeni karşılık |
|---|---|---|
| kategori video hero | **DÖNÜŞTÜ** | `.lst-top` SEO hero + hızlı-geç chip rayı + istatistik (248 / %80 az yağ / 4.7) |
| (yok) açıklamalı SEO metni | **YENİ** | `.seo-prose` prose bloğu (H2/H3 + paragraf) + `.seo-aside` "kısa bilgiler" yan kutusu |
| (yok) SSS | **YENİ** | `.faq-list` akordeon (5 soru, tek-açık) |
| kategori grid + (yok) filtre | **KORUNDU+YENİ** | `.lst-side` facet + `.lst-grid` r-card grid + pagination |

### 4) Günün Menüsü (m11) — en yakın akraba `ramazan-menu-detay.html` + `iftara-dogru.html`/`sahura-dogru.html`

`ramazan-menu-detay.html` zaten "Günün Menüsü şablonunun temalı varyantı" (research §2.10).

| Eski blok | Karar | Yeni karşılık |
|---|---|---|
| ramazan video hero + "Menü 1" başlık | **DÖNÜŞTÜ** | `.lst-top` tarih hero ("11 Haziran Perşembe") + tarih navigasyonu (`.menu-datenav`) |
| ramazan meta (yorum/tarih/görüntülenme + bookmark) | **DÖNÜŞTÜ** | `.menu-bar` aksiyon barı: 4 öğün / ~120 dk / 23 malzeme + "Deftere Ekle" / "Alışveriş Listesi Çıkar" |
| ramazan sıralı tarif metinleri (1./2. Tarif) | **MODERNLEŞTİ** | `.menu-set` 4'lü kart seti (Çorba/Ana/Yan Lezzet/Tatlı) — kurs şeritli `.menu-card` |
| ramazan audio player / font-size butonları | **ATILDI** | Menü kürasyonu bağlamına uygun değil (eski blog kalıntısı) |
| iftara-dogru koleksiyon rayları | **DÖNÜŞTÜ** | `.arc-track` geçmiş günler arşiv şeridi (tarih + 4'lü collage + kurs etiketleri) |
| (yok) "öğünü değiştir" | **YENİ** | `.menu-swap` satırı (shuffle / kendin seç) |

---

## Tasarım kararları

- **Hero = ATA dili**: 4 sayfada da `.lst-top` görselli koyu band (overlay 0.30–0.40, `linear-gradient`
  + Unsplash bg, v3a filtre suffix'i). Her sayfa farklı bg görseli + eyebrow + accent renkli H1.
- **Bileşen reuse (sıfırdan icat YOK)**: facet paneli + grid + r-card CSS/JS `tarif-liste-v1.html`'den;
  editör notu TD `editor-box` dilinden; section ritmi (gri↔beyaz) ve `.sec-head` shell'den;
  drag-scroll + row-nav altyapısı shell'den. Yeni doğan bileşenler yalnızca: `.subcat`, `.coldex`,
  `.r-rank`, `.seo-prose/.seo-aside`, `.faq-*`, `.menu-card/.mc-*`, `.arc-day` — hepsi token diliyle.
- **Renk disiplini**: domates baskın; sarı yalnız puan (`.r-rate`, `.mc-rate`); yeşil KULLANILMADI
  (sağlık/indirim bağlamı yok). Bayraklar flagcdn `<img>` (emoji yok). Radius yalnız token; pill yok.
- **Linkleme**: tüm `r-card` başlıkları `tarif-detay-v1.html`'e; breadcrumb'lar + alt-CTA'lar
  `tarif-liste-v1.html` ve birbirine göreli linkli; bottom-nav/brand `anasayfa-portal-v3a.html`.
- **Boş durum**: kategori + SEO'da `.lst-empty` (ikon+başlık+açıklama+CTA, domates-tint) — `?empty=1`
  ile vegan+et çakışması demosu korundu.
- **Nav aktif state**: kategori/koleksiyon/SEO → "Tarifler"; Günün Menüsü → "Bugün Ne Pişirsem".
- **Mobil**: ≤640 grid'ler tek-kolon mini kart / yatay snap slider'a döner (v3a pattern'ı).
  Menü seti ve arşiv şeridi ≤640'ta yatay snap. 390px taşma probu 4/4 PASS.

## Bulunan + giderilen hata
- **390px hero taşması (kategori)**: `.lst-hero` ≤1024'te `grid-template-columns:1fr` olunca
  grid item `.lh-main`'in min-content'i, uzun hero chip'leri (`overflow-x:auto`'ya rağmen)
  nedeniyle 499px'e şişip sayfayı 515px'e taşırıyordu. **Fix**: `.lst-hero .lh-main{min-width:0}`
  (kategori + seo-landing'e eklendi; kısa chip'li seo zaten geçiyordu ama defansif eklendi).
  Re-probe: 4/4 PASS, sw=390. Not: bu latent bug ATA `tarif-liste`'de de var (kısa chip'lerle
  gizli kalmış) — team-lead'e iletilecek, master'a port edilebilir.

## Otonom kararlar (Beyar talimatı: soru sorma, kılavuz + en yakın akraba → uygula + raporla)
1. **SEO SSS sırası → grid'in ALTINA** (KARAR). Gerekçe: FAQ schema/SEO konvansiyonu içeriği
   sonda ister, UX daha akıcı; kılavuzda aksi kural yok, en yakın akraba (eski sitede SSS yok)
   yön vermiyor. Revize istenirse blok taşınabilir (tek `<section>` yer değişimi).
2. **Günün Menüsü nav aktif → "Bugün Ne Pişirsem"** (KARAR). Gerekçe: Günün Menüsü bu nav
   item'ının feature'ı (breadcrumb da oradan iniyor). Diğer 3 sayfada "Tarifler" aktif.
3. **Koleksiyonlar dizini → hero'nun hemen altında beyaz mini ray** (KARAR). Task "sayfanın
   üstünde" dedi; hero altı = sayfa üstü bandı, bu kriteri karşılıyor.
4. **Latent hero taşma fix'i** (`.lh-main{min-width:0}`): ATA `tarif-liste-v1.html`'de de var
   ama READ-ONLY → dokunmadım, team-lead'e SendMessage ile bildirdim (master'a port kararı
   team-lead'de). Kendi 4 dosyamda fix uygulandı, 390 PASS.
5. Görseller Unsplash placeholder — gerçek tarif/kategori görselleriyle değişecek (tüm dalgada ortak).
