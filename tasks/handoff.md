# DadaMutfak — Portal Ana Sayfa · HANDOFF

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-10

---

## 🟢 DURUM (EN ÜSTTE OKU)

**Revize taban + 3 anasayfa alternatifi TAMAMLANDI ve CANLI.** Beyar onayıyla
commit/push/deploy yapıldı. Sırada: Yasin Bey değerlendirmesi → lead varyant seçimi.

- **🌐 CANLI (4 link):**
  - Taban: https://by4r.github.io/dadamutfak-view/mockups/anasayfa-portal-v2.html
  - ALT-1: https://by4r.github.io/dadamutfak-view/mockups/anasayfa-portal-v3a.html
  - ALT-2: https://by4r.github.io/dadamutfak-view/mockups/anasayfa-portal-v3b.html
  - ALT-3: https://by4r.github.io/dadamutfak-view/mockups/anasayfa-portal-v3c.html
- **REPO:** `github.com/By4r/dadamutfak-view` (public, `main`; Pages main/root).
- **TABAN:** `mockups/anasayfa-portal-v2.html` — 16 maddelik revize seti uygulandı
  (aşağıda). Üç varyant bu tabandan türedi; **hero + header + footer üçünde birebir aynı**.
- **Beyar favorisi: v3a** (kart redesign). Kart medya rozetleri (video/ses/galeri)
  Beyar için kritik — korunmalı.
- Araştırma raporu: `tasks/revize-arastirma.md` (eski site font/içerik mimarisi + v2 haritası).

---

## ✅ BUGÜN YAPILANLAR (2026-06-10)

### Revize seti (tabana, 16 madde)
1. Topbar sol: konum ibaresi → "Günün Tarifi: …" linki
2. "Mutfak Rehberi" → **"Mutfak Sırları"**
3. Tarifler → **tam genişlik MEGA MENÜ**: 12 kategori (3 kolon, tarif sayılı) +
   "Haftanın Tarifi" kartı; **Dünya Mutfağı dropdown'da YOK**
4. "Diyetisyen Bul" → **"Diyetisyen Ara"** (her yerde; alternatif not: "Diyetisyenini Bul")
5. Dil seçici varsayılan **EN**
6. **Çift katlı header**: üst kat 72px (logo + ara/kayıtlı/sepet/Giriş Yap),
   alt kat 52px (ana menü). Gerekçe: 6 menü + 4 aksiyon tek satıra sığmıyordu,
   Giriş Yap taşıyordu; mega menü alt kata doğal demirlendi. Şeffaf↔katı scroll
   davranışı iki katta da çalışıyor. Hero padding-top 128→190px.
7. Store badge'leri topluluktan çıktı → **app separator bandı** (videolar↔sağlık arası, koyu ince)
8. "Dada Denedi" → **"Şefin Tercihi"** (ikon fa-award)
9. **Keşfet section'ı** eklendi — 2 sekme (eski site kurgusu): **Mekanlar**
   (konum+puan+görüntülenme metalı mekan kartları) ↔ **Gurme Lezzetler** (blog kartları)
10. Ramazan widget'ı tamamen kaldırıldı (ayrı Ramazan-modu sitesi olacak)
11. Tarif kartlarında **görüntülenme (fa-eye) zorunlu** + medya tipi rozetleri
    (video+süre / ses / galeri+adet — eski site DNA'sı)
12. **Şefler & Yazarlar** section'ı eklendi (6 şef + "Sen de Şef Ol" CTA kartı);
    **Tarif Bul köprüsü** (malzemeye göre ara mirası) hero altında
13. **Footer eski site içeriğiyle**: 4 kolon (Kurumsal: Şef Ol·Şefler·Ölçü Birimleri /
    Hızlı Erişim: Hakkımızda·Künye·S.S.S. / İletişim: Bize Ulaşın·Öneri ve Şikayet /
    İş Birliği: Reklam·Sponsorlar) + **9 linkli legal bar** (İptal-İade · Ödeme-Teslimat ·
    Mesafeli Satış · Gizlilik-Çerez · Üyelik · Kullanım · Aydınlatma · KVKK · İhlal).
    Açıklama paragrafı ve e-bülten YOK. Kolon ritmi 1.5fr+4 eşit (hiza düzeltildi).
14. Önceki tur ortakları tabanda: sekmeli Mutfağa Giriş+Püf (koyu video bg),
    sağlık hesaplama **6'lı grid** (+Besin Kalori Cetveli, +Ölçü Birimleri),
    Tariflerimiz/Videolar/Shop **ok-kontrollü slider** (recTrack/vidTrack/shopTrack)
15. **Çıkık FAB** (mobil bottom-nav): bar'dan 14px taşar, düz domates, `--radius-lg`,
    halka YOK (Beyar yuvarlak+halkayı beğenmedi)
16. **Radius tutarlılık turu**: radius-xl(24) kullanan paneller → `--radius-lg`(16)
    (diyetisyen paneli, feat-big, telefon çerçevesi, bottom-nav bar)

### 3 varyant (hero/header/footer sabit)
- **v3a — Kart Redesign (Beyar favorisi):** yerleşim taban; tarif kartı yeni anatomi —
  medya rozetleri sağ-alt, h4 clamp-2, r-facts (süre·zorluk·porsiyon), r-foot
  (yazar | ⭐puan + 👁görüntülenme)
- **v3b — Overlay Kart:** tam-görsel `.o-card` (metin görsel üstünde, 3-duraklı gradient);
  öne çıkanlar mozaik (1 büyük 2×2 + 4 normal); videolar+keşfet de overlay dilinde
- **v3c — Yeni Kurgu:** orta section'lar eski site akışından — **Malzemeye Göre Tarif Bul**
  (12 seçilebilir chip + sayaç) → kategoriler → **tab'lı Tariflerimiz** (12 kart, data-cat
  filtre) → guide → şefler → keşfet → "60 saniyede pişir" videolar → appband → sağlık →
  shop → topluluk(+avatar satırı). Kart = v3a anatomisi.

### Font analizi (Aşama 0-c sonucu)
Mockup fontları **gerçek kurumsal fontlarla birebir uyumlu**: Gilroy 300/500/800.
Kaynak: `brand/corporate-identity-guideline.pdf` (56 sf) — marka fontu Gilroy (tüm
ağırlıklar), Steelfish+Neo Sans yalnız logo wordmark'ı (logoya gömülü). Eski site de
Gilroy-Medium kullanıyordu (`myBrandFont`). Değişiklik gerekmedi.

---

## 📄 SAYFA SIRASI (taban / v3a / v3b)

üst bant → çift katlı header (mega menü) → hero (video) → Tarif Bul köprüsü →
kategoriler(krem) → öne çıkan tarifler(beyaz) → Mutfak Sırları sekmeli(koyu video) →
Keşfet 2 sekme(krem) → Şefler & Yazarlar(beyaz) → videolar(krem) → app bandı(koyu ince) →
sağlık & diyetisyen(yeşil) → Dada Shop(beyaz) → topluluk(cream) → footer(turuncu).
v3c'de orta sıra farklı (yukarıda).

---

## ❓ AÇIK KARARLAR

1. **Lead varyant** — Yasin Bey değerlendirmesi bekleniyor (Beyar favorisi v3a).
2. "Diyetisyen Ara" vs **"Diyetisyenini Bul"** — alternatif not düşüldü, istenirse değişir.
3. Puan sarısı `#FAC045` ve sağlık yeşili `#3BB77E` resmi palette yok — önceki
   session'dan beri açık (niş istisna olarak duruyor).

## ➡️ SIRADAKİ İŞ

1. **Yasin Bey değerlendirmesi** → seçilen varyant lead olacak.
2. Lead seçilince: ana sayfa gerçek içerikleri + **diğer sayfalar** (tarif detay ·
   tarifler liste/filtre · ürün detay) lead'in dilinden türetilecek.

---

## 🔒 KİLİTLİ KURALLAR

- **Hero + header + footer üç varyantta birebir aynı** — tek kaynaktan (taban v2) değişir.
- Kart **medya tipi rozetleri (video/ses/galeri) ve görüntülenme** tarif kartlarından çıkmaz.
- Kare/oranlı görsel = `div + background-image` (`<img>` değil; logo istisna). 2x retina çarpma YOK.
- **FontAwesome 6.5.2** (emoji yok). Unsplash sıcak grade `&exp=7&gam=6&sat=-9&high=8&vib=5`.
- Radius: kart/panel `--radius-lg` · buton/kontrol `--radius-md` · etiket `--radius-sm`;
  pill yok, hardcoded radius yok.
- **frontend-design skill ZORUNLU.** Desktop-first. **Commit/push yalnız Beyar açık izniyle.**
- Kimlik: `tasks/brand-tokens.md` · modüller: `research.md` · eski site analizi:
  `tasks/revize-arastirma.md` · resmi kılavuz: `brand/*.pdf`.

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/anasayfa-portal-v3a.html"

# headless SS: ?ss=1 (video→poster) · ?fp=1 (hero cap, full-page SS) ·
# ?hdr=solid (katı header) · ?dd=1 (mega menü + dil dropdown açık) ·
# ?drawer=1 (mobil drawer) · ?cc=1 (çerez banner zorla)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --disable-gpu --hide-scrollbars --window-size=1440,9600 --virtual-time-budget=9000 \
  --screenshot="screenshots/v3a-full.png" \
  "http://localhost:8765/mockups/anasayfa-portal-v3a.html?ss=1&fp=1"
```
