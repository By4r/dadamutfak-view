# DadaMutfak — Dalga 2 · Sağlık (F10) Raporu

> Teammate: `saglik` · 5 sayfa + ara işler (diyet listeleri, besin kütüphanesi)
> Tarih: 2026-06-11 · Tüm sayfalar `mockups/_shell.html` kopyasından türetildi
> (chrome + mega menü KİLİTLİ; token seti AYNI; yeşil = sağlık aksanı,
> domates CTA'larda, sarı yalnız puan).

## Üretilen sayfalar
1. `mockups/saglik-hub-v1.html` — Sağlık hub'ı
2. `mockups/hesaplayici-v1.html` — Tek hesaplayıcı **ŞABLONU** (BKİ örneği)
3. `mockups/saglik-testler-v1.html` — Quiz akışı (`?sonuc=1` sonuç hâli)
4. `mockups/diyet-listeleri-v1.html` — Program kartlı diyet listeleri (research m6)
5. `mockups/besin-kutuphanesi-v1.html` — Arama + besin satırı + detay (`?besin=1`)

## Doğrulama özeti
- **390px yatay taşma: 5/5 SIFIR** (JS probe — kılavuz §4; hub'da bulunan
  `.sh-main` grid-item shrink bug'ı `min-width:0` + `minmax(0,1fr)` ile çözüldü).
- **Konsol: 5/5 temiz** (headless `--enable-logging` taraması).
- SS'ler `mockups/.ss-scratch/` altında (aşağıda yollar).

---

## L1 — Eski şablon → yeni tasarım blok kıyası

### 1. saglik-hub  ← `hesaplamalar.html`
| Eski blok | Karar | Yeni karşılık |
|---|---|---|
| Beyaz "Hesaplamalar" video-top banner | **Dönüştü** | Koyu yeşil-aksanlı hero (liste hero dili) + breadcrumb + istatistik |
| 3 koyu hesaplayıcı kartı (BMH/BKİ/Vücut Tipi) | **Genişledi** | 6'lı `calc-card` grid (v3a): +Günlük Kalori, +Su, +İdeal Kilo |
| (yok) | **Yeni** | Beslenme testleri vitrini (hub-card) |
| (yok) | **Yeni** | Diyet listeleri vitrini (hub-card) |
| (yok) | **Yeni** | Besin kütüphanesi yeşil giriş bandı (arama + popüler besinler) |
| (yok) | **Yeni** | Diyetisyen paneli (v3a `diet-panel` VERBATIM dili) |
| Bülten + görüş modal + footer | **Korundu** | Shell ortak chrome |

### 2. hesaplayici (ŞABLON)  ← `beden-kutle-endeksi-hesapla.html` + (bmh/kalori/vucut-tipi kardeşleri)
| Eski blok | Karar | Yeni karşılık |
|---|---|---|
| "Beden Kütle Endeksi" banner | **Dönüştü** | Krem kompakt başlık + breadcrumb + hesaplayıcı geçiş rayı (5'li şablon) |
| Form: Boy / Kilo / Yaş / Cinsiyet(radio) / Hesapla | **Korundu+modernize** | `.fk-` form kiti (tarif-ekle mirası): suffix'li input, `.fk-seg` cinsiyet, aktivite select |
| `calculateBMI()` metin sonucu | **Dönüştü** | Sonuç kartı: büyük değer + kategori rozeti + **segmentli yatay gauge/ibre** + açıklama |
| (yok) | **Yeni** | Sonuçtan tarife köprü (kategoriye göre değişen başlık) + r-card ilgili tarifler |
| Bülten/modal | **Korundu** | Shell |
> **ŞABLON NOTU:** Bu dosya 5 hesaplayıcının (BMH, BKİ, Günlük Kalori, Vücut Tipi,
> Su) ortak şablonudur; BKİ örneğiyle kuruldu. Diğer 4'ü aynı iskeleti (form kartı +
> gauge sonuç kartı + köprü + geçiş rayı) farklı alan/eşik setiyle dolduracak.

### 3. saglik-testler  ← `testler.html` + `test-detay.html`
| Eski blok | Karar | Yeni karşılık |
|---|---|---|
| "Testler" banner + test-img kart grid → test-detay | **Birleşti** | Tek sayfada quiz akışı; benzer testler `hub-card` grid'i altta |
| test-detay: soru/cevap (question/answer) | **Dönüştü** | `qz-card`: soru + ilerleme çubuğu + tek-seçim opsiyonlar + geri/devam (JS adım geçişi) |
| "Test Sonucunuz" (h4) | **Dönüştü** | `?sonuc=1` sonuç ekranı: skor + kategori + kırılım barları + ilgili tarifler |
| "Benzer Testler" (h4) | **Korundu** | Alt section `hub-card` grid |

### 4. diyet-listeleri  ← **doğrudan karşılık YOK**
En yakın akrabalar: `hesaplamalar.html` (sağlık landing iskeleti) + Dalga 1
`tarif-liste-v1.html` (görselli koyu-overlay hero — landing ailesinin atası).
| Kaynak desen | Karar | Yeni karşılık |
|---|---|---|
| liste hero (koyu band) | **Türetildi** | `dl-top` yeşil-aksanlı landing hero + istatistik |
| facet/chip dili (liste) | **Sadeleşti** | Sticky `dl-fchip` hedef filtre rayı (tek seçim) |
| (yok) | **Yeni** | 6 `prog-card` (gün/kcal/zorluk etiketli program kartı) |
| (yok) | **Yeni** | "Takip uygulamada" app tanıtım bandı (slate panel + App Store/Google Play) |
> research m6 gereği: takip araçları **app işi** → web'de **TANITIM dili** kullanıldı.

### 5. besin-kutuphanesi  ← `besin-kalori-hesapla.html`
| Eski blok | Karar | Yeni karşılık |
|---|---|---|
| "Kalori Hesaplama" banner + arama | **Dönüştü** | Krem arama bandı + kategori çipleri + canlı arama |
| Besin seçimi (search) | **Dönüştü** | `food-row` satır listesi (ikon + ad + Protein/Karb + kcal) + boş durum |
| "Besin Değerleri" tablosu (1 Kase / 100 Gram; Karbonhidrat, Kolesterol, Lif, Potasyum, Protein, Sodyum, Yağ) | **Korundu+modernize** | `?besin=1` detay: `nut-table` (1 Adet/100 g sütun, tüm satırlar + Enerji vurgu) + makro dağılım barı |
| (yok) | **Yeni** | "Bu besinle" ilgili tarifler r-card grid'i |
> Aynı dosyada **liste ↔ detay toggle** (satıra tıkla / `?besin=1`). Detay değer
> tablosu Yumurta örneğiyle sabit (şablon); ad dinamik güncellenir.

---

## Tasarım kararları
- **Renk disiplini:** Yeşil (`--green`) sağlık ana aksanı (hero eyebrow/accent,
  calc-ico, gauge "normal" segmenti, başarı). Domates CTA'larda + gauge "fazla
  kilolu" segmentinde (uyarı semantiği), `--tomato-deep` "obez". Sarı yalnız
  puan (`.r-rate`). Gauge "zayıf" için nötr mavi (`#6aa9d8`) — veri rengi, marka
  semantiğiyle çakışmaz.
- **Miras bileşenler (yeniden icat YOK):** `.fk-` form kiti (tarif-ekle),
  r-card sistemi (v3a), `calc-card`/`diet-panel` (v3a 418–447), liste hero dili
  (tarif-liste). CSS verbatim kopyalandı, class adları korundu.
- **Gauge/ibre:** Yeni bileşen, tamamen token dilinde (radius token, pill yok).
  BKİ 15–40 ölçeğine eşlenmiş segmentli yatay bar + üçgen ibre; JS ile canlı.
- **Section ritmi:** Tüm sayfalarda gri (`--bg-cream`) ↔ beyaz (`--bg-white`)
  alternasyonu korundu.
- **Boş durum:** besin aramada ikon + başlık + açıklama + CTA deseni (domates-tint
  ikon kutusu).
- **Görsel kuralları:** Tüm görseller `div + background-image cover/center`
  (img yok); Unsplash filtre suffix'i (`exp=7&gam=6&sat=-9&high=8&vib=5`) uygulandı.
  FontAwesome 6.5.2 kilitli set (`fa-broccoli` Pro idi → `fa-carrot` ile değiştirildi).
- **Nav active:** Sağlık nav item'ı + dropdown 5 sayfada da `active`; hub/alt sayfa
  linkleri göreli.

## Açık sorular (Beyar/Yasin Bey kararı)
1. **Hesaplayıcı şablonu route'u:** 5 hesaplayıcı TEK şablon-sayfa mı kalsın
   (şu an hepsi `hesaplayici-v1.html`'e işaret ediyor), yoksa stack'te her biri
   ayrı route + içerik mi? (Geçiş rayı her iki modeli de destekler.)
2. **Diyet "İncele" hedefi:** Program-detay (günlük menü dökümü) ayrı sayfa mı
   olacak? Dalga 3 işi gibi duruyor; şu an `#`.
3. **Besin detayı:** Aynı dosyada toggle mı kalsın, ayrı route mu? (Şablon değer
   tablosu şu an Yumurta sabit — gerçekte besin başına veri.)
4. **App tanıtım bandı:** Mobil app landing'i kararıyla (handoff açık iş #3)
   bağlı; band kalsın mı, yoksa "Yakında" mı?
5. **Diyetisyen paneli linkleri:** Hub'daki diyetisyen kartları F12a (diyetisyen
   public) sayfasına bağlanacak — o sayfa hazır olunca link güncellenir.

## Ekran görüntüleri (`mockups/.ss-scratch/`)
| Sayfa | 1440px | Mobil 500px | Varyant |
|---|---|---|---|
| Hub | `hub-1440.png` | `hub-500.png` | — |
| Hesaplayıcı | `calc-1440.png` | `calc-500.png` | — |
| Testler | `test-1440.png` | `test-500.png` | `test-sonuc-1440.png` (`?sonuc=1`) |
| Diyet listeleri | `diyet-1440.png` | `diyet-500.png` | — |
| Besin kütüphanesi | `besin-1440.png` | `besin-500.png` | `besin-detay-1440.png` (`?besin=1`) |
| 390 taşma probe | `probe390-result.png` (5/5 OK) | | |

## SS / önizleme komutları
```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak && python3 -m http.server 8765 &
open "http://localhost:8765/mockups/saglik-hub-v1.html"
# paramlar: testler ?sonuc=1 · besin ?besin=1 · shell ?dd=1/?drawer=1/?cc=1/?fb=1
# headless SS: "Google Chrome" --headless=new --window-size=1440,3200 --screenshot=...
```
