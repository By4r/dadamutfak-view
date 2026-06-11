# DadaMutfak — HANDOFF · F1 Tarif Detay (Tur 1 üretildi, revize bekliyor)

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-11 (F1 Tur 1 sonu)

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

### Kapanan kararlar
- Besin alan seti → modern 8'li ✔
- Lessons kuralı → `tasks/lessons.md` L1 yazıldı: eski template blok envanteri
  üretimden ÖNCE çıkarılır, kıyas plan onayıyla sunulur (F2'den itibaren otomatik) ✔

---

## ➡️ AÇIK İŞ — SIRADAKİ

1. **Başlık bölgesi yığılma revizesi** — Beyar mevcut hâli beğenmedi; yeni
   session'da 2 varyant SS denenecek (detay prompt'la gelecek).
2. Sonra **Tur 1 Beyar SS onayı** → **Tur 2 sosyal katman**: yorum (yıldız
   zorunlu + foto upload + nested + beğen/bildir/düzenle/sil) + "Ben de Yaptım"
   foto duvarı (m2) + yıldız dağılım grafiği + tarif→Shop rayı (m19) +
   hashtag/paylaşım + editör notu/sık yapılan hata kutusu (m30).

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
  `?cook=1` (pişirme modu açık). Header bu sayfada hep katı (`hdr=solid` no-op).
- Video modal açıkken headless SS timeout verebiliyor — state'i
  `browser_evaluate` ile doğrula, SS'i poster/kapalı hâlde al.
