# DadaMutfak — HANDOFF · F1 Tarif Detay (Tur 1 + 1.5 + 2 TAMAM — patron sunumu sıradaki)

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-11 (F1 Tur 2 — sosyal katman tamamlandı)

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

### F1 TUR 2 — SOSYAL KATMAN (TAMAMLANDI ✔)

Eski template yorum bölgesi blok envanteri çıkarıldı (L1), tüm işlevler
karşılandı. Hepsi `tarif-detay-v1.html`'de:

- **Yorum bölümü** (stub kaldırıldı): puan özeti (4.9 + %96 tavsiye) + yıldız
  dağılım grafiği (5→1 bar) tek kartta; **fotoğraflı yorum formu** (yıldız
  ZORUNLU — puansız submit engellenir + shake; foto önizleme max 3, objectURL);
  form **kapalı başlar, tıkla → genişler** (dikey tasarruf, Beyar isteği);
  filtre çipleri (Tümü/Fotoğraflı/5/4/3 ve altı — ilk sayfada canlı çalışır);
  nested yorum listesi: beğen (sayaçlı toggle) / yanıtla (inline form, gönderince
  "denetimde" cevabı eklenir) / bildir ("Bildirildi ✓") / kendi yorumunda
  düzenle+sil (sil → Geri Al satırı); rozetler: Usta Aşçı, **Tarif Sahibi**
  (dolu domates), "sen"; "Daha Fazla Yorum Göster". Yorum fotoğrafları MEVCUT
  lightbox'a bağlı (yorum başına grup).
  Bilinçli kararlar: eski sitenin "Beğenme" (dislike) butonu ELENDİ; disclaimer
  metni korundu; login gate mock'ta giriş yapmış görünüm (stack fazında).
- **"Ben de Yaptım" foto duvarı (m2):** masonry 4 kolon (kompakt), ad+tarih
  overlay, "Fotoğrafını Yükle" CTA (başlıkta buton + duvarda dashed tile;
  dosya seç → duvara "denetimde" etiketiyle eklenir). Fotoğraflar MEVCUT
  lightbox grubuna bağlı — yeni lightbox YOK.
- **Editör notu (m30):** hatırlatma kutusu ailesi, ayrışan ses (beyaz kart +
  domates sol şerit + kalem ikonu + "En Sık Yapılan Hata" etiketi + editör
  imza satırı). **Hatırlatma + editör notu yan yana `.note-duo` grid'inde**
  (Beyar dikey optimizasyon isteği; ≤1024 tek kolon).
- **Tarif→Shop rayı (m19):** "Bu tarifte kullanılan ürünler" — p-card v3a'dan
  BİREBİR (CSS verbatim kopya), 4 ürün adım referanslı açıklamalarla, beyaz
  zemin (gri↔beyaz ritmi), row-nav + drag-scroll otomatik çalışır.
- **Hashtag + paylaşım rayı:** 4 hashtag chip + 5 platform (FB/X/WA/TG/Pin) +
  bağlantı kopyala (e-posta yerine; "Kopyalandı ✓" durumu). Tek satır, ince.
  Sticky bar "Paylaş" → navigator.share, yoksa bu raya scroll (EK handler,
  onaylı bar koduna dokunulmadı).
- **Sayfalar arası bağlantı:** v3a'da 11 göreli href (feat-big + 9 r-card
  başlığı anchor + "Tarife Git") → tarif-detay-v1.html; v3a'da SADECE href
  eklendi (başlık metni anchor'a sarıldı, CSS/yapı değişmedi). Karşı yön:
  breadcrumb "Ana Sayfa" + header logo → v3a (Tur 1'den vardı, doğrulandı);
  benzer tarifler 4 kartı kendine (mock) linkli.
- **Bugfix (Beyar):** hero "1.204 değerlendirme" tıklayınca lightbox da
  açılıyordu — sahne click handler'ına `a` exclude eklendi.
- **Dikey optimizasyon (Beyar "uzadı" notu):** note-duo yan yana, duvar 3→4
  kolon + alçak tile, form collapsed, liste/margin sıkılaştırma, shoprail
  52px padding → sayfa 7750 → **6543px** (1440).
- Doğrulama: 1440+390 konsol 0 hata; lightbox 4 kaynak (galeri/adım/duvar/yorum)
  regresyon geçti; porsiyon/ikame/pişirme modu regresyon geçti; link gezinmesi
  iki yönlü gerçek tıklamayla test edildi; 390'da yatay scroll yok.

## ➡️ AÇIK İŞ — SIRADAKİ

**F1 TAMAMLANDI ✔** (Tur 1 + 1.5 + 2, Beyar onaylı, commit'lendi).

Üretim planı: **`tasks/uretim-plani.md`** (Tier 0-5, Beyar onaylı).

**SIRADAKİ ADIM: TIER 1 agent team kurulumu** — 4 teammate (liste / video /
form / profil). Ön koşul: lead önce `mockups/_shell.html` + 
`tasks/bilesen-kilavuzu.md` üretir. Kurallar uretim-plani.md'de.

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
