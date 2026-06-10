# DadaMutfak — Portal Ana Sayfa · HANDOFF

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-10

---

## 🟢 DURUM (EN ÜSTTE OKU)

**✅ MOBİL REVİZE TURU TAMAMLANDI (2026-06-10, Yasin Bey'den 2 madde — SS turu Beyar onaylı, commit/push bu session'da).**
Yalnız `≤640px` medya bloğu değişti (`mockups/anasayfa-portal-v3a.html`) — desktop/tablet'e dokunulmadı, 1440 kontrol SS'leriyle sızıntı olmadığı doğrulandı.
- **Madde 1 — Section başlık araçları:** DOM aynı; mobilde `.sec-head`/`.cat-head`/`.guide-head`
  + `.sec-tools` `display:contents` ile grid'e açılır. Düzen: eyebrow → **h2 + oklar aynı
  satırda (sağda, 38px)** → lead → **kompakt "Tamamını Gör →" metin-linki** (buton kabuğu
  mobilde kalkar; domates renk, koyu guide zemininde `#ff8763`). 7 section'da tutarlı:
  Kategoriler · Tariflerimiz · Mutfak Sırları · Keşfet · Şefler · Videolar · Shop.
  Tab'lı section'larda tab yerleşimi korundu (guide: tabs tam genişlik kendi satırında;
  keşfet: tabs satırı aynen).
- **Madde 2 — Püf kartları tek hizada:** mobilde `.puf-fig` 166→112px, açıklama `<p>` +
  başlık `<h4>` 2 satır `-webkit-line-clamp` (metin DOM'da tam — yalnız görsel kırpma),
  `.puf-body` min-height 140px → 6 kart da 142px (önce 152–236 boy boydu). Mutfağa Giriş
  adım kartlarına aynı clamp — hepsi 112px'te eşit. Desktop'taki 1-2-3 satır karışık yapı
  bilinçli, korundu.
- **Bonus düzeltme:** Keşfet mobilde `disc-tools` (tabs + see-all) baseline'da sağdan
  taşıyordu → flex-wrap'lı kendi satırına alındı, yatay taşma 0px.
- **Ek tur — Keşfet kartları meta hizası (aynı gün, Yasin Bey turu devamı):** Gurme
  Lezzetler kartlarında meta satırı (tarih · okuma · görüntülenme) kart kart farklı
  yükseklikte kalıyordu. Mobilde `.disc-card` flex column + `.disc-meta{margin-top:auto}`
  → meta alta sabit; slider'ın `align-items:stretch` doğası kartları eşitler (gurme 3×357px,
  mekan 3×333px — meta üst hizaları birebir aynı). `h3`/`p` 2 satır clamp zaten globaldi
  (metin DOM'da tam). Mekan kartları aynı class'ı paylaştığından aynı fix'i aldı.
  Desktop'ta kart `display:block` + meta `margin-top:13px` korunuyor (sızıntı yok).
  SS: `screenshots/m-rev/kesfet-{mekan,gurme}-{390,1440}.png`.
- SS'ler: `screenshots/m-rev/` (390 + 1440 kontrol) · baseline: `screenshots/m-rev-baseline/`.

**REVİZE TURU 3 TAMAMLANDI (2026-06-10, SS turu Beyar onaylı — commit/push bu session'da yapıldı).**
17 madde + 4 canlı ek revizyon (slider auto-slide, login butonu eski tomato rengi,
mega menü "Tüm Tarifler" son kategori slotuna, kart tutarlılık turu) uygulandı.
Hepsi `mockups/anasayfa-portal-v3a.html` içinde; Playwright SS'leriyle doğrulandı,
SS'ler `ss-t3/` klasöründe. Plan + uygulama sonuçları + sapmalar:
`tasks/revize-turu-3-plan.md` (UYGULAMA SONUCU bölümü dahil — oku).

**Yasin Bey onayı bekleyen 3 nokta:**
1. Footer yasal link kısaltmaları ("İptal, İade ve Değişim", "Gizlilik ve Çerez" vb.
   tek satır için) — SS: `ss-t3/16-footer.jpeg`
2. Görüş Bildir'e eklenen 5. tip "Puan ver" (emoji skalası, ekstra öneri) —
   SS: `ss-t3/17-modal-puan.jpeg`
3. Keşfet mekan kartlarındaki kapanış rozetleri (aşağıda — Beyar onayladı,
   patron henüz görmedi) — SS: `screenshots/kesfet-kapanis-1440.png`

**🎨 RENK NOTU (gelecek session bunu bilsin):** Krem TAMAMEN kalktı — "Topluluğa katıl"
dahil tüm section akışı `#f9f9f9` (eski site grisi) / beyaz ekseninde. `--bg-cream` ve
`--bg` artık #f9f9f9, `--bg-white` #fff. Krem geri getirilmeyecek.

**✅ KEŞFET KAPANIŞ BİLGİSİ TAMAMLANDI (2026-06-10, Beyar onaylı — bu commit'te):**
Keşfet mekan kartlarına kapanış rozetleri eklendi (`mockups/anasayfa-portal-v3a.html`).
- Eski site pattern'ı: kapanış yakın → `fa-clock` + "30 dk sonra kapanacak" kehribar
  (`rgb(219,142,0)`, kesfet.html/index.html); kapalı → `fa-circle-minus` + "Kapalı"
  kırmızı (kesfet-detay.html). "Açık" durumu eski sitede yorum satırında — kullanılmadı.
- Yeni dil: rozet **görsel üst-sol** (`.disc-status`, sol-alt fiyat pill + sağ-alt
  medya rozetleriyle çakışmaz), mevcut `.mt` koyu rgba+blur pill tabanı.
  - `st-closing` — koyu pill + **sarı saat ikonu** (`--yellow`) + "30 dk sonra
    kapanıyor" (1. kart, Sini). 45/15 dk durumları aynı pill'de metin değişimi.
    Mantık: kapanışa **60 dk kala** görünür.
  - `st-closed` — **kırmızımsı pill** (`rgba(116,28,18,.74)`, soluk somon metin,
    `fa-circle-minus`) + karta `is-closed` class'ı → görsel `grayscale(.45)
    brightness(.94)` ile soluklaşır (2. kart, Tandır Ocakbaşı).
  - 3. kart default temiz bırakıldı (uyarısız durum örneği). Gurme pane dokunulmadı.
- SS'ler: `screenshots/kesfet-kapanis-1440.png` (desktop section) ·
  `kesfet-kart1-closing.png` / `kesfet-kart2-closed.png` (yakın çekim) ·
  `kesfet-kapanis-390.png` (mobil slider).

---

**REVİZE TURU 2 CANLIDA (2026-06-10, commit `a544321` — push edildi, Pages'te yayında).**
Çalışma dosyası artık SADECE `mockups/anasayfa-portal-v3a.html` (ana base seçildi);
v2/v3b/v3c dondu, dokunulmuyor. Mega menü patron onaylı — yapısı değişmez.
Tur 2 detayı aşağıda "REVİZE TURU 2" bölümünde.

**FONT DOĞRULAMASI TAMAM (2026-06-10, bağımsız ölçüm — canlı link üzerinden):**
Canlı v3a = eski site. İki taraf da aynı `Gilroy-Medium.ttf` dosyasını yüklüyor —
**MD5 birebir aynı** (`d8ee4539e9ba9211a8b532e325075577`), canlıda istek 200 OK.
Eleman bazında (body/h1/h2/menü/buton/kart başlığı) computed style aynı dosyaya
çözümleniyor; 700'ler iki tarafta da sentetik bold. Tek nominal fark: body/buton
declared weight eski sitede 400, v3a'da 500 — ikisi de tek Medium yüze düştüğü
için render piksel-bazında aynı. **Beyar kararı: OLDUĞU GİBİ BIRAKILDI, düzeltme yok.**

Önceki durum: revize taban + 3 alternatif canlıda (Yasin Bey değerlendirmesi sürüyor).

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

### Font analizi (Aşama 0-c sonucu) — ⚠️ TUR 2'DE REVİZE EDİLDİ
~~Mockup fontları kurumsal PDF'le uyumlu: Gilroy 300/500/800~~ → Beyar düzeltti:
**doğruluk kaynağı PDF değil, eski sitenin FİİLEN render ettiği font.** Kanıtlı bulgu
(Playwright `document.fonts` + computed style): eski site TEK YÜZ yükler —
`myBrandFont` = `Gilroy-Medium.ttf` (universal reset ile her elemana); başlık/menü/
buton bold'ları (600/700) **tarayıcı sentetik bold'u**. Light/ExtraBold dosyaları
klasörde var ama CSS hiç yüklemez. Lato yalnız 1 span'da declared, yüklenmez bile.
**v3a buna eşitlendi:** tek @font-face (Gilroy-Medium 500), 300→500 (42 yer),
800→700 (43 yer), nav linkleri 700. Dosya md5'leri eski siteyle birebir aynı.

### REVİZE TURU 2 (2026-06-10 — v3a, commit `a544321`, canlıda)
1. **Font** — yukarıda (tek yüz Gilroy-Medium + sentetik bold = eski site DNA'sı)
2. **Menü ortalandı** — `.h-nav>.wrap` justify-content:center (çift kat korunur)
3. **"Tamamını Gör"** — tüm listeli section'larda tek etiket/pattern (`.see-all`):
   Kategoriler + Tariflerimiz + Mutfak Sırları (koyu glass varyant) + Keşfet +
   Şefler + Videolar + Shop. Konum: başlık sağı (sec-tools)
4. **App bandı büyüdü** — padding 30→52px, ikon 46→64px, başlık 17→22px,
   badge'ler büyüdü; separator karakteri korundu
5. **Çerez banner'a "KVKK Aydınlatma Metni" linki** eklendi (Çerez Politikası yanı)
6. **Görüş Bildir** — eski site mirası: sağ kenarda 90° döner sabit turuncu etiket
   (`.feedback-tab`, ≤640 gizli) → tıklayınca **modal** (konu chips: öneri/soru/
   teknik/ihlal + ad-opsiyonel/e-posta/mesaj/KVKK onay + teşekkür state). `?fb=1` SS modu
7. **Keşfet mobilde yatay slider** (dikey yığma kaldırıldı, diğer slider'larla aynı dil)
8. **Drawer dil seçici** ikili butondan **aç/kapa listeye** çevrildi (N dile ölçeklenir,
   `#drawerLang`, seçimde etiket "TR — Türkçe" formatında güncellenir)
9. **Footer reveal (gaviaworks perdesi)** — ≥641px: footer fixed bottom z-1 arkada,
   içerik `<main class="page-main">` z-2 opak; JS footer yüksekliğini ölçüp
   main'e margin-bottom verir (resize/load/fonts.ready'de güncellenir).
   Mobil: statik footer'a düşer. Perde gölgesi YOK (Beyar böyle istedi)
10. **Ok tutarlılığı** — tüm yön okları 13px (see-all, cat-nav, row-nav, mega-all, st-arrow)

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

1. **Yasin Bey değerlendirmesi** → seçilen varyant lead olacak (Beyar favorisi v3a,
   Tur 2 + font doğrulaması canlıda hazır).
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
# ?drawer=1 (mobil drawer) · ?cc=1 (çerez banner zorla) · ?fb=1 (görüş bildir modal)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --disable-gpu --hide-scrollbars --window-size=1440,9600 --virtual-time-budget=9000 \
  --screenshot="screenshots/v3a-full.png" \
  "http://localhost:8765/mockups/anasayfa-portal-v3a.html?ss=1&fp=1"
```
