# Görsel + Ölü Buton Taraması — Final Cila Ara Görev 2

> Kapsam: 61 üretim sayfası (59 × `*-v1.html` + `anasayfa-portal-v3a.html` +
> `panel-shell.html`). `test-detay-v1.html` mevcut değil (başka teammate üretiyor,
> kapsam dışı). Probe: headless Chrome + same-origin iframe harness
> (`mockups/.ss-scratch/gorsel-harness.html` + `gorsel-runner.py`).

## 1. Probe yöntemi

Her sayfada 1440 viewport'ta üç kontrol:
- **bg-none:** class'ında media/thumb/fig/av/cover/stage/th geçen görünür div'lerde
  computed `background-image === 'none'` (görünmez/`display:none` elemanlar,
  ikon `<i>` tag'leri, harf-avatar `.av-init` bilinçli boşları elendi)
- **img-broken:** tüm `<img>`'lerde `naturalWidth === 0` (tüm img'ler `complete`
  olana dek beklendi, maks 20 sn)
- **bg-url-broken:** tüm computed background-image URL'leri toplandı, her benzersiz
  URL `new Image()` ile gerçekten yüklendi — 404 dönen Unsplash ID'leri yakalandı
  (bembeyaz kart vakalarının asıl kök nedeni bu sınıf: URL var ama görsel 404)

## 2. Gerçek vaka listesi (sayfa:eleman → ne ile dolduruldu)

Kök neden: 2 adet ölü Unsplash ID (CDN'de 404). 4 sayfada 5 eleman etkilenmişti.

| # | Sayfa : eleman | Kırık ID | Dolgu |
|---|---|---|---|
| 1 | `urun-detay-v1.html` : galeri thumb şeridi 2. kare (`#pdThumbs .pd-thumb` + `data-img`) | `photo-1584990347449-a2d4c2c9ace2` | `photo-1590794056226-79ef3a8147e1` — turuncu emaye döküm tencere (ürünle birebir bağlam: Döküm Tencere 24 cm, farklı açı). Aynı boyut düzeni korundu: thumb `w=300`, data-img `w=900` + filtre suffix'i |
| 2 | `urun-detay-v1.html` : "Benzer ürünler" rayı Granit Tava kartı (`#simTrack .p-card .p-media`) | `photo-1584990347449-a2d4c2c9ace2` | `photo-1605522561233-768ad7a8fabf` — ocakta tava görseli; komşu kartlarla aynı `w=600&q=80` + `exp=7&gam=6&sat=-9&high=8&vib=5` |
| 3 | `dada-shop-v1.html` : "Yeni gelenler" Granit Tava 28 cm kartı (`#newTrack .p-card .p-media`) | `photo-1584990347449-a2d4c2c9ace2` | aynı tava görseli (`photo-1605522561233-768ad7a8fabf`, `w=600` + suffix) — üç sayfada aynı ürün aynı görsel |
| 4 | `urun-liste-v1.html` : grid Granit Tava 28 cm kartı (`#lstGrid .p-card .p-media`) | `photo-1584990347449-a2d4c2c9ace2` | aynı tava görseli (`photo-1605522561233-768ad7a8fabf`) |
| 5 | `urun-liste-v1.html` : grid "Keten Masa Örtüsü 160×220" kartı (`#lstGrid .p-card .p-media`) | `photo-1571805618149-bcd9c8200e23` | `photo-1519225421980-715cb0215aed` — keten örtülü kurulu sofra (Tekstil bağlamı); `w=600` + suffix |

Tüm dolgu görselleri yayın öncesi indirilip gözle doğrulandı (bağlam uygunluğu) +
`curl` ile 200 teyidi alındı. `<img>` eklenmedi — hepsi mevcut
`div + background-image cover/center` düzeninin içinde yalnız URL onarımı.

### Elenen false-positive'ler (bilinçli, dokunulmadı)
- `besin-kutuphanesi` `.th-name/.th-m/.th-kcal` — tablo başlığı span'leri ("th" token)
- `hesabim` `.ava-btns/.ava-del/.ava-note` — avatar yanı buton/not satırı
- `mutfak-sirlari` `.th-ico` (ikon kutusu) + `.db-thumb` (domates zeminli ikon tile, görsel değil)
- `tarif-detay` `.rd-stage-info` — galeri üstü bilgi overlay'i
- `anasayfa-portal-v3a` `section.discover` — "disCOVER" substring yakalaması
- Harf-avatar `.av-init`'ler ve JS-doldurmalı lightbox/template boşları (gizli başlar)

## 3. Ölü buton düzeltmeleri — `urun-detay-v1.html`

### "Hemen Al" (`.pd-buynow`)
- Tıklanınca SEÇİLİ ADETLE `window.dmCart.add(name, price, qty, img)` çağrılır
  (mevcut dmCart motoruna bağlanıldı, motor DEĞİŞTİRİLMEDİ; fiyat/görsel mevcut
  `dmPriceNum`/`dmImgOf` yardımcılarıyla okunur) → 500 ms "Ödemeye Gidiliyor"
  geri bildirimi → `odeme-v1.html`'e yönlenir.

### Paylaş (`.pd-share` → `#sharePop` popover)
- TD mirası, yeni dil yok: kap `tarif-detay-v1` `.ing-pop` popover kabından
  (beyaz + `--line` + `radius-md` + `sh-lg` + opacity/visibility geçişi),
  butonlar `.tagshare` rayının `.share-btn` daireleri (`.cp` kopyala / `.wa`
  WhatsApp / `.xx` X, `.ok` yeşil onay durumu, `.lbl` etiketi) — class adları
  birebir TD'den.
- Kopyala: `navigator.clipboard` + buton 1.8 sn yeşil ✓ + **"Bağlantı kopyalandı"
  toast'ı** (mevcut `.cart-toast` dili miras — ikinci toast elemanı `#shareToast`,
  yeni CSS yok). WhatsApp/X gerçek `wa.me` / `twitter.com/intent` linkleri
  (ürün adı + URL encode'lu), `target=_blank rel=noopener`.
- Dışarı tıkla / Esc kapatır; `aria-expanded` senkron.

## 4. Probe kanıtları

**Hemen Al** (`buton-harness.html?m=buy`, headless tıklama):
```
qty-set: 3 → badge-before: hidden=true txt=0 → badge-after: hidden=false txt=3
→ buy-label: "Ödemeye Gidiliyor" → navigated-to: /mockups/odeme-v1.html   errors=[]
```
dmCart badge 0→3 (seçili adet) + odeme-v1.html'e yönlendi. ✔

**Paylaş** (`buton-harness.html?m=share`):
```
pop-before: vis=hidden op=0 → pop-after: open=true vis=visible op=1 rect=197x58
wa-href: https://wa.me/?text=D%C3%B6k%C3%BCm%20Tencere... x-href: https://twitter.com/intent/tweet?...
copy-btn-ok: true → toast: show=true vis=visible op=1 txt="Bağlantı kopyalandı"   errors=[]
```
Popover DOM'da görünür + kopyala onayı + toast. ✔

**Konsol:** Playwright canlı oturum, sayfa yükleme + paylaş/kopyala/sepete ekle
etkileşimleri sonrası: `Errors: 0, Warnings: 0`. ✔

**390 taşmazlık** (iframe probe): urun-detay (normal + popover açık), dada-shop,
urun-liste → hepsinde `scrollWidth ≤ 390`. ✔

## 5. Düzeltme sonrası tekrar probe — SIFIR boş görsel

- İlk tur: 61/61 sayfa tarandı (2 sayfa timeout sonrası tekrar koşuldu, temiz).
- Düzeltme sonrası ikinci tur (`gorsel-runner.py` aynı probe):
  `urun-detay-v1`, `dada-shop-v1`, `urun-liste-v1`, `arama-v1`,
  `bazal-metabolizma-v1` → **hepsi hits=0, errs=[]**.
- Dokunulmayan 56 sayfa ilk turda zaten gerçek-vaka-sıfırdı (yalnız §2'deki
  FP'ler). Sonuç: **61 sayfada 0 boş/kırık görsel.**

## 6. SS kanıtları (1440, `mockups/.ss-scratch/`)

- `gorsel-urun-detay-galeri.png` — galeri: 4 thumb da dolu (2. kare turuncu döküm tencere)
- `gorsel-urun-detay-simrail.png` — Benzer ürünler: Granit Tava kartı görselli
- `gorsel-urun-detay-paylas.png` — paylaş popover'ı açık (kopyala/WA/X)
- `gorsel-dada-shop-granit.png` — Yeni gelenler rayında Granit Tava görselli
- `gorsel-urun-liste-keten.png` — liste grid'i dolu

Ham tarama çıktısı: `mockups/.ss-scratch/gorsel-scan.json` + `gorsel-scan.log`.
