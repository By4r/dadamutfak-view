# DadaMutfak — Portal Ana Sayfa · HANDOFF

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-09

---

## 🟢 DURUM (EN ÜSTTE OKU)

**Aktif lead tasarım var ve "yaklaştı" — geliştirme sürüyor.**

- **LEAD DOSYA:** `mockups/anasayfa-portal-v2.html` (beğenildi, "yaklaştı").
  Bunun üzerinden ilerleniyor.
- **DOKUNMA:** `mockups/anasayfa-portal.html` (v1, beğenilen taban) ve diğer tüm
  eski mockup'lar. Yalnız `anasayfa-portal-v2.html` düzenleniyor.
- **Yön:** işlevsel-yoğun **Türk yemek portalı** (yemek.com / GZT yemektarifleri /
  Lokma kurgusu) + **gaviaworks** modernliği (disiplinli boşluk, ince kart kenar/
  gölge, yumuşak hover) + **resmi kurumsal kimlik** (aşağıda).
- Eski "tasarım durduruldu / patron yön bekliyor" durumu **AŞILDI**. Önceki 5 aday
  (masa/modern/myrecipes/uzman/premium) reddedilmişti; portal yönü kabul gördü.

---

## 🎨 RESMİ KURUMSAL KİMLİK (yeni — BAĞLAYICI)

Kaynak: `brand/corporate-identity-guideline.pdf` (56 sf) + `brand/logo.pdf`.
Detay tablo: **`tasks/brand-tokens.md`** (resmi değerlerle güncellendi).

**Kritik kurallar:**
- **Kurumsal koyu = `#211E16`** (Pantone Process Black C) — **slate `#253D4E` DEĞİL.**
  Başlık · koyu metin · koyu panel (diyetisyen/ramazan) · üst bant · hero overlay tonu.
- **Primary domates `#E14827`** (P 7597 C) · **krem `#EFE5D3`** (P 15-1 C).
- **Alternatif renkler:** `#b14fc5` mor · `#6cca98` açık yeşil · `#009d4f` yeşil ·
  `#006072` petrol.
- **Font:** **Gilroy** (tüm ağırlıklar resmen açık; başlık ExtraBold / gövde Medium /
  meta Light). Alternatif evrak fontu **Chivo**. Logo wordmark = Steelfish + Neo Sans
  (logoya gömülü, ayrıca yüklenmez).
- **Logo:** asla deforme/esnetme/gölge/degrade/kontür YOK; min 60px; **koyu/şeffaf
  zeminde beyaz-mono, açık zeminde renkli.** Footer + şeffaf header'da **resmi beyaz
  logo** (`logo.pdf`'ten üretilen `mockups/assets/img/logo-official-white.png`) —
  brightness/invert hilesi DEĞİL.
- 🚫 Kurumsala **uyumsuz** renkler (kılavuz): parlak pembe/mor/sarı/cyan/fıstık yeşili.

**Üretilen logo asset'leri:** `mockups/assets/img/logo-official.png` (yatay renkli,
2975×694), `…-white.png` (mono-beyaz), `brand/logo-official-stacked.png` (dikey).

---

## ✅ SON UYGULANAN REVİZYON (anasayfa-portal-v2.html)

Merged prompt + canlı geri bildirimlerle uygulandı:

- **Header üstte şeffaf → scroll'da katı:** scrollY 0'da şeffaf + beyaz nav/logo/ikon;
  >60px'te beyaz zemin + `#ECECEC` border + gölge, **renkli logo**, `#211E16` nav,
  hover/aktif domates. Geçiş 0.3s. (JS: `.header.at-top` toggle.)
- **Üst bant** → koyu `#211E16`, açık yazı.
- **Logo:** resmi PDF logosu, oran korunmuş (esnetme yok), header 40px; şeffaf-header
  + footer **resmi beyaz logo**.
- **Menü tek satır** (nowrap, 6 öğe: Tarifler · Bugün Ne Pişirsem · Mutfak Rehberi ·
  Sağlık · Dada Store · Dada Akademi[Yakında]); 2 satıra düşmüyor; dropdown'lar
  çalışıyor (hover + click). **Ramazan menüden çıktı** (bölüm sayfada DURUYOR).
- **Footer minimal** (gaviaworks): Keşfet / Rehber&Sağlık / Kurumsal sütunları
  **kaldırıldı**. Kalan: solda beyaz logo + marka cümlesi + 5 sosyal; sağda Bülten
  (input+gönder); alt bar (© + KVKK·Çerez·Gizlilik). Zemin `#E14827`, her şey beyaz.
- **Hero:** tam ekran (`100vh`), arkada otomatik oynayan yemek b-roll videosu
  (`mockups/assets/video/dada-food-broll.mp4` = orijinal sitenin kendi asset'i),
  `#211E16` tonlu sol-ağır gradient overlay + grain; içerik beyaz; 3 sekmeli arama;
  **istatistikler (48.200+/1.2M/320+) ortalandı**.
- **Radius token sistemi:** `--radius-sm 8 / md 12 / lg 16 / xl 24 / pill 999 /
  circle 50%`. Kart+görsel **lg**, büyük panel **xl**, buton+kontrol **md**, tag/rozet
  **sm**; **buton/tag'de pill YOK** (rounded-rect); yalnız yuvarlak ikon-buton circle.
  Hardcoded radius sıfır.
- **Koyu ton hizalandı:** tüm slate (`#253D4E` + slate rgba'ları/overlay/gölge) →
  **`#211E16`** ailesi.
- **İkonlar:** hepsi **FontAwesome 6.5.2**; sağlık hesaplayıcılardaki custom SVG'ler
  FA'ya çevrildi (fire-flame-curved / weight-scale / heart-pulse / person).
- **Düzeltilen bug:** dropdown metinleri şeffaf header'da okunmuyordu
  (`.header.at-top .nav a` dropdown linklerini de beyazlatıyordu) → scope
  `.nav>.nav-item>a`'ya daraltıldı, çözüldü.
- **Hero–Kategoriler boşluğu** açıldı (`.catstrip` üst padding 8px → 70px).

**Sayfa sırası:** üst bant → header(şeffaf/katı) → hero(video, 100vh) → kategori
şeridi → öne çıkan tarifler (feature + grid) → mutfağa giriş + püf noktaları →
videolar → sağlık & diyetisyen (yeşil aksan) → **Ramazan** (koyu panel) → Dada Store
→ topluluk + mobil CTA → footer(minimal, turuncu).

---

## ❓ AÇIK KARARLAR (Beyar onayı bekliyor)

1. **Puan yıldızı sarısı `#FAC045`** resmi palette'te YOK → domatese mi çevrilsin,
   niş istisna mı kalsın?
2. **Sağlık yeşili `#3BB77E`** → resmi `#009d4f` / `#6cca98` yapılsın mı?

---

## 🔒 KİLİTLİ KURALLAR

- Kare/oranlı görsel = `div + background-image` + `cover` + `center` (`<img>` değil;
  logo istisna). CSS render genişliği esas, **2x retina çarpma YOK**.
- **FontAwesome 6.5.2** (emoji yok). Fotoğraf: Unsplash sıcak grade
  `&exp=7&gam=6&sat=-9&high=8&vib=5` (gerçek asset olan yerde orijinal kullanılır).
- **Desktop-first** (responsive sonra). **frontend-design skill ZORUNLU**.
- **Commit/push yalnız Beyar açık izniyle.**
- Referans dosyalar: `tasks/brand-tokens.md` (kimlik) · `tasks/anasayfa-plan.md`
  (yapı) · `research.md` (modüller) · `brand/*.pdf` (resmi kılavuz+logo).

---

## ➡️ SONRAKİ ADIMLAR

1. **⏭️ İLK AKSİYON — GitHub public repo:** `gh` CLI ile public repo oluşturulacak;
   ileride **GitHub Pages** ile yayınlanacak (statik mockup'lar için uygun).
2. **Responsive** (mobil/tablet: header nav, hero, carousel, grid'ler).
3. **Diğer sayfalar** lead'den türetilecek: tarif detay · tarifler liste/arama
   (filtre paneli) · ürün detay.
4. **Patron sunumu.**

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/anasayfa-portal-v2.html"

# headless full SS (Playwright <video> karesini boyamaz + Unsplash 5sn limiti → Chrome headless):
# ?ss=1  → hero video yerine gerçek poster karesi (headless'ta görünür)
# ?fp=1  → full-page SS için hero'yu 760px cap'ler (100vh proporsiyon bozmasın)
# ?hdr=solid → katı (scroll'lu) beyaz header'ı zorla
# ?dd=1  → ilk dropdown'ı açık göster
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=1440,9600 --virtual-time-budget=22000 \
  --screenshot="screenshots/v2c-full.png" \
  "http://localhost:8765/mockups/anasayfa-portal-v2.html?ss=1&fp=1"
```

Canlı sayfada video gerçekten oynar (headless artefakt'ı, dosyada sorun yok).
SS'ler: `screenshots/v2*-*.png`.
