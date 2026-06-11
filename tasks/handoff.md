# DadaMutfak — HANDOFF · F1 Tarif Detay (Tur 1 + Tur 1.5 revize TAMAM, Tur 2 sıradaki)

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-11 (F1 Tur 1.5 — patron revize turu sonu)

---

## 🟢 MEVCUT DURUM

- **Kanonik baz:** `mockups/anasayfa-portal-v3a.html` — token/header/footer/mega
  menü her sayfaya BİREBİR, lokal değişiklik yasak. **Mega menü kilitli.**
- **F1 Tur 1 üretildi:** `mockups/tarif-detay-v1.html` (Fırında Tereyağlı Mantı
  örnek içeriği, chrome v3a'dan birebir, konsol 0 hata).

### F1 Tur 1 — YAPILANLAR
- İki kolon + sticky malzeme paneli yerleşimi (Beyar onaylı yerleşim kararı)
- Künye revizesi: 4 ayrı kutu → tek hairline-bölmeli şerit kart; Mutfak +
  Özellikler sessiz satırı
- Rozet düzeltmesi: "Dada Denedi" KALDIRILDI — birincil rozet **Editör Onaylı**
  (+ Diyetisyen Yorumlu)
- **İnteraktif pişirme modu** (`?cook=1`): tam ekran overlay, adım başına çoklu
  görsel yan yana + görselden lightbox + üst barda "Videolu Anlatım" butonu;
  derinleşme (zamanlayıcı vb.) F5'te
- **Hatırlatma kutusu** (sarı, çan ikonlu) — metin sistemden tarif özelliklerine
  göre otomatik gelir, UI'da "otomatik" etiketi YOK (Beyar)
- **Sponsorlu malzeme satırları**: Söke un kartıyla aynı dil, satır içi kompakt
  boy (Yörem tereyağı, Çiftlik yoğurt + panel altı Söke bloğu)
- **Lightbox**: galeri + adım görselleri (adımda max 3), grup içinde ok/klavye
  gezinme, sayaç + başlık
- **Video modal**: galeri video thumb → sahne video modu → 16:9 player
  (mock: `assets/video/guide-cooking.mp4`)
- Sesli tarif player'ı (hız + 15sn atlama, radius-md — pill yasak)
- Kalori hesaplama köprüsü: besin kartı altı yeşil CTA (F10 önyüzü)
- Porsiyon stepper 2/4/6 (miktarlar otomatik, mutfak kesirleri: 1/2, 1 1/2)
- İkame popover'ı (m18): kıyma/tereyağı/yoğurt satırlarında, `?swap=1`
- Sticky aksiyon barı (`?bar=1`): kaydet/yaptım/eline sağlık+sayaç/paylaş
- Besin seti **modern 8'li** (Kalori/Protein/Karb/Yağ/Lif/Şeker/Sodyum/Doymuş)
  — **kapandı, bilinçli karar** (eski sitenin Su/Kolesterol/Demir seti ELENDİ)

### F1 Tur 1.5 — PATRON REVİZE TURU (TAMAMLANDI ✔)

Patron 3 başlık varyantından **A'yı (hero overlay)** seçti; üzerine 14 maddelik
revize + Beyar ara maddeleri işlendi (hepsi `tarif-detay-v1.html`'de):

- **Hero başlık dili (A):** etiketler + H1 + puan satırı hero alt bölgesinde
  koyu gradient üzerinde; sahne 440px; thumb şeridi hero ALTINDA yatay
- **Künye dikey kolon (260px):** hero yanında — porsiyon/süre/zorluk/derece +
  altında "Mutfak & Özellikler" chip bölmesi (panelden taşındı)
- **Çoklu mutfak + gerçek bayrak:** N mutfak chip'i desteklenir (örnek: Türk
  Kayseri + İtalyan), bayraklar flagcdn img — EMOJİ YASAK
- **Pişirme modu SAYACI:** adımın "N dk"sı sayaca otomatik; Başlat/Durdur,
  bitişte 3'lü bip (WebAudio) + yanıp sönme; **"Bitince otomatik geç"** toggle'ı
  (büyük, kutu görünümlü — eli yağlı senaryo); adım değişince reset
- **Ölçü birimi popover'ı (F11 önyüzü):** miktara tıkla → "1 su bardağı ≈ 200 ml
  / un ≈ 130 g"; ikame popover ailesiyle aynı dil, birbirini kapatırlar
- **A−/A+ yazı boyutu:** adımlar başlığında; tarif metni + malzemeler 0.9–1.2x
- **Adım tamamlama:** NUMARAYA tıkla → done; kart 74px'e KATLANIR (başlık+tik),
  tekrar tıkla → açılır. Akordeon bilinçli REDDEDİLDİ (pişirirken taranabilirlik)
- **Çoklu satıcı "Sipariş Et"** (eski site shops-dropdown kalıbı): Dada Shop
  birincil (fiyat+stok) + Getir/Trendyol/Hepsiburada dış market seçenekleri;
  logolar `mockups/assets/img/vendors/` (eski siteden kopyalandı)
- **Satır bazlı sepet+ & liste durumu:** sponsorsuz satırlarda hover'da (mobilde
  hep görünür, 34px) sepet+ ikonu; panel altında canlı "Listende N malzeme ·
  Listeyi Gör" şeridi; toplu buton "Tümünü Listeye Ekle ↔ Tümü Listede"
- **Sponsor varyantları:** Sipariş Et'li (Yörem, Söke) + Sipariş Et'siz salt
  marka önerisi (Çiftlik yoğurt, "Sponsorlu Öneri" etiketi)
- **Malzeme grupları (OPSİYONEL yapı):** "Hamur / İç Harç / Sos & Servis İçin"
  hairline başlıkları; `.ing-group` satırı yoksa düz liste aynen çalışır;
  porsiyon çarpanı + checkbox grup içinde aynen çalışır
- **Kaldırılanlar:** "Kendi Kalori İhtiyacını Hesapla" CTA'sı; üst bölgedeki şef
  satırı (şef yalnız alttaki minimal kartta — 54px avatar)
- **Yorum erişimi:** smooth scroll + `#yorumlar` çapası (Tur 2 hedef bölgesi
  stub'ı yazar kartı altında) + sticky aksiyon barında "Yorumlar" kısayolu
- **Dikey optimizasyon:** besin bölümünün ayrı başlığı kalktı (kart kendi
  başlığını taşır), sayfa 4371→3970px; "Nasıl yapılır?" y≈868 (eski 1233)
- Doğrulama: 1440+390 konsol 0 hata; porsiyon/lightbox/pişirme modu/popover
  regresyonları geçti. Referans varyant dosyası `tarif-detay-v1-headA.html`
  duruyor (headB/C silindi).

### Kapanan kararlar
- Besin alan seti → modern 8'li ✔
- Başlık bölgesi → Varyant A hero overlay (patron seçimi) ✔
- Adım akordeon fikri → reddedildi; tamamlanan adım katlanır (orta yol) ✔
- Lessons kuralı → `tasks/lessons.md` L1 yazıldı: eski template blok envanteri
  üretimden ÖNCE çıkarılır, kıyas plan onayıyla sunulur (F2'den itibaren otomatik) ✔

---

## ➡️ AÇIK İŞ — SIRADAKİ

**F1 TUR 2 — sosyal katman** (tarif-detay-v1.html üzerine):
1. Yorum akışı (yıldız zorunlu + foto upload + nested + beğen/bildir/düzenle/sil)
   — `#yorumlar` stub'ının yerine gelir
2. Fotoğraflı yorum formu
3. Yıldız dağılım grafiği
4. "Ben de Yaptım" foto duvarı (m2)
5. Tarif→Shop rayı (m19)
6. Hashtag/paylaşım
7. Ana sayfa ↔ tarif detay link bağlantısı
8. Editör notu / sık yapılan hata kutusu (m30) — yeri adımların altı

---

## 🏭 ÜRETİM STRATEJİSİ (Beyar kararı)

- **ODAKLI (babysit) sayfalar:** tarif detay, tarif liste/arama, video hub +
  dikey görünüm, tarif ekle stepper, Mutfak Defteri profili, diyetisyen panel
  shell, reçete builder.
- **ŞABLON ONAYI (1 örnek odaklı, kalanı otomatik):** hesaplayıcı,
  koleksiyon/SEO landing, Shop ürün detay, yasal metin.
- **TAM OTOMATİK (%90 reuse; F2 sonrası `_shell.html` dondurulup paralel
  terminallerde):** auth, onboarding, sözlük, püf, mutfağa giriş, ölçü
  birimleri, keşfet, testler, Ramazan, bildirimler, hata sayfaları, global arama.

---

## ⏳ PATRON KARARI BEKLEYENLER

1. **Günün Tarifi bandının ana sayfadaki yeri** — iki koyu band ard arda geliyor.
2. **Mutfak Sırları arka plan videosu** — sabit foto mu, lazy-load mu.
3. **Mobil app tanıtım landing'i** gerekli mi (PDF m3).
4. **Reklam alanları olacak mı** (m29 premium "reklamsız kullanım" ile ilişkili).
5. **EN dil stratejisi** — topbar'da dil seçici var; stack fazından önce karar.
6. **Malzeme başı dış market "Sipariş Et" dropdown'ı** (Getir/Trendyol) —
   eski site kalıbı; şimdilik sponsor kartlarındaki tekil "Sipariş Et" var.

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/tarif-detay-v1.html"
```

- **v3a paramları:** `?ss=1` · `?fp=1` · `?hdr=solid` · `?dd=1` · `?drawer=1`
  · `?cc=1` · `?fb=1`
- **tarif-detay-v1 paramları:** `?dd=1` (mega menü) · `?drawer=1` · `?cc=1` ·
  `?fb=1` · `?swap=1` (ikame popover açık) · `?bar=1` (aksiyon barı açık) ·
  `?cook=1` (pişirme modu açık) · `?shop=1` (sipariş popover'ı açık).
  Header bu sayfada hep katı (`hdr=solid` no-op).
- Scratch SS klasörü: `mockups/.ss-scratch/` (gitignored). Headless SS'i
  Playwright MCP timeout verirse Chrome `--headless=new --screenshot` ile al.
- Video modal açıkken headless SS timeout verebiliyor — state'i
  `browser_evaluate` ile doğrula, SS'i poster/kapalı hâlde al.
