# Revize-2 · Keşfet konsept sapması — fark tablosu + yeniden kurgu

> Sahibi: `kesfet` teammate · Task #3 · Tek dosya: `mockups/kesfet-v1.html`
> Kanonik baz: `anasayfa-portal-v3a.html` + `_shell.html` · Kılavuz: `tasks/bilesen-kilavuzu.md`

## ① Araştırma — Keşfet NE olmalı?

Üç kaynak okundu:

1. **Eski template** — `dada-mutfak-icerik/kesfet.html` + `kesfet-detay.html`
   - Liste: **iki sekme → Mekanlar · Gurme Lezzetler.** "Mekanlar" bir *restoran/mekan
     keşfi*: mutfak filtresi, açık günler, online rezervasyon, rütbe, fiyat (₺–₺₺₺₺₺),
     **"5 km içinde en iyiler" mesafe slider'ı**, kartlarda harita konumu (Beykoz/İstanbul),
     "30 dk sonra kapanacak", puan. Foursquare/Zomato tipi yer keşfi.
   - Detay: bir **mekan profili** — sekmeler Genel · Fotoğraflar · Menüler · Açık Saatler ·
     Yorumlar; "Mekan Görselleri", çalışma saatleri. Yani gidilecek bir yerin künyesi.
   - **Vaat:** "git, gez, dene" — yere/lezzete bağlı deneyimsel keşif.

2. **Senaryo** — `tasks/research-sistem.md`
   - §2.3 Keşif araçları: **"Keşfet + Keşfet detay Ⓜ — editöryal akış (mekanlar, gurme
     lezzet, etkinlik). v3a disc-card grid'i + uzun-form detay şablonu."**
   - §çekirdek tablo (sat.370): **"Keşfet | editöryal (mekan/gurme)".**
   - Yani senaryo eski konsepti (mekan/gurme/etkinlik) KORUYOR ama sunumu modernize ediyor:
     eski foursquare filtre/harita/mesafe UI'ı DEĞİL → **editöryal disc-card + uzun-form makale.**
     Konu = yer/lezzet/etkinlik; dil = dergi/keşif kartı.

3. **Mevcut** — `mockups/kesfet-v1.html`
   - Doğru **format** (disc-card grid + uzun-form detay; v3a mirası, kılavuza uygun).
   - Yanlış **konu/taksonomi:** "Mutfak Yayını / mutfağın hikâyesi" — soyut bir yemek-kültürü
     dergisi. Kategoriler: Şehir Mutfağı · Sokak Lezzetleri · Mevsim Sofrası · Söyleşi ·
     Lezzet Rotası · Sürdürülebilir. **Mekan/gurme lezzet/etkinlik üç sütunu YOK;** hiçbir
     kart bir yere (konum), bir gurme lezzete ya da bir etkinliğe (tarih/mekan) bağlı değil.
     "Oku" var, "git/dene/katıl" yok.

## Fark tablosu

| Boyut | Eski site vaadi | Senaryo vaadi (research) | Mevcut kesfet-v1 | Sapma |
|---|---|---|---|---|
| **İçerik tipi** | Mekan keşfi (restoran/yer) + gurme lezzet | **Editöryal akış**: mekanlar · gurme lezzet · **etkinlik** | Soyut yemek-kültürü dergi makaleleri | ⚠️ Konu kaymış: 3-sütun (mekan/gurme/etkinlik) → genel "mutfak hikâyesi" |
| **Kaynak/kürasyon** | Mekan listingleri (rütbe, fiyat, saat) | Editör küratörlüğü; yer/lezzet/etkinlik temelli | Editör/yazar makaleleri | Orta: editör dili doğru, ama yer/etkinlik çapası kayıp |
| **Akış kurgusu** | Filtre + mesafe slider + harita grid | disc-card grid → uzun-form detay | disc-card grid → uzun-form detay | ✅ FORMAT doğru — bu korunacak |
| **Etkileşim** | Rezervasyon, "X km içinde", aç/kapa filtre | Kart→makale; kategori chip; ilgili keşifler | Kart→makale; kategori chip; ilgili keşifler | ✅ Etkileşim iskeleti doğru; çapa içeriği yanlış |
| **Kart kimliği** | Konum, fiyat, puan, açık saat | Pillar rozet + konum/tarih meta | Sadece yazar + okuma süresi + görüntülenme | ⚠️ Mekan konumu / etkinlik tarihi-yeri meta YOK |
| **Hedef his** | "Nereye gideyim, ne yiyeyim?" | "Keşfet: gidilecek yer, denenecek lezzet, katılınacak etkinlik" | "Okunacak güzel yemek yazıları" | ⚠️ Deneyimsel/rehber his → pasif okuma dergisi |
| **Detay sayfası** | Mekan künyesi (saat/menü/foto) | Uzun-form makale (Kinfolk dili) | Uzun-form makale (Karadeniz lezzet rotası) | ✅ Uzun-form doğru; lezzet-rotası pillar'a uyuyor |

**Özet sapma:** Format (disc-card + uzun-form) doğru ve iyi kurulmuş — KORUNUR. Sapma
**taksonomi + içerik çapası**nda: mekan/gurme lezzet/etkinlik üç sütunu kaybolmuş, kartlar
bir yere/tarihe bağlı değil, his "rehber/keşif" yerine "pasif dergi". Düzeltme = sıfırdan
yazmak değil; **eyebrow/H1/lead'i rehber diline çekmek + kategori chip'lerini 3 sütuna
hizalamak + kartları mekan(konum)/gurme/etkinlik(tarih·yer) kimliğiyle yeniden etiketlemek.**

> ⚠️ Eski foursquare filtre/harita/mesafe-slider UI'ı GERİ GETİRİLMEZ — senaryo açıkça
> "v3a disc-card + uzun-form" diyor. Eskimiş olan o UI'dı; biz konuyu koruyup dili modernize
> ediyoruz.

## ② Yeniden kurgu kararları

**Felsefe:** sıfırdan yazmadım — sapma taksonomi + içerik çapasındaydı, FORMAT (disc-card
grid + uzun-form detay) korundu. Tek dosya `kesfet-v1.html`; chrome'a (header/mega/footer/
drawer/bottom-nav) ve uzun-form detay iskeletine DOKUNULMADI.

**Ne ÇIKTI (sapma):**
- Eyebrow "Mutfak Yayını" · H1 "mutfağın hikâyesi" · lead "okumalık dergi" → pasif dergi dili
- Kategoriler: Şehir Mutfağı · Sokak Lezzetleri · Mevsim Sofrası · Söyleşi · Sürdürülebilir
  → soyut, 3-sütun (mekan/gurme/etkinlik) yok
- Kartlar: yalnız yazar + okuma süresi + görüntülenme; hiçbiri yere/tarihe bağlı değil
- `<title>` "Mutfak Hikâyeleri & Lezzet Rotaları"

**Ne GİRDİ (konsepte dönüş):**
- Eyebrow **"Lezzet Rehberi"** · H1 **"Keşfet — gidilecek mekânlar, denenecek lezzetler"** ·
  lead **"mekânlar, gurme lezzetler ve lezzet etkinlikleri — gez, dene, katıl"** → rehber dili
- Kategori chip'leri **3 sütun önde**: Hepsi · 📍Mekânlar · 🏅Gurme Lezzetler · 📅Etkinlikler ·
  Lezzet Rotaları · Söyleşi (chip ikonları tomato, kılavuz token)
- Kartlar pillar kimliğiyle yeniden etiketlendi (disc-card dili AYNEN, sadece içerik + meta):
  - **Mekân** kartı → `disc-badge 📍 Mekân` + disc-meta'da **konum** (`İstanbul · 10 semt`,
    `Eminönü`) + puan (`.disc-rate` sarı yıldız, kılavuz: sarı yalnız puan)
  - **Gurme** kartı → `disc-badge 🏅 Gurme` + yazar + görüntülenme
  - **Etkinlik** kartı → `disc-badge 📅 Etkinlik` + disc-meta'da **tarih + yer** (`21 Haz · 14.00`
    · `Kadıköy`; `28–30 Haz` · `Kayseri`) + katılımcı/festival; m-types'ta `🎟 Ücretsiz/Festival`
  - **Feature** (Karadeniz Lezzet Rotası) KORUNDU — uzun-form detayı açar; meta'ya konum
    (`Trabzon · Of · Rize`) + tarih eklendi
- Grid pillar dağılımı (7 kart): Lezzet Rotası 1 (feature) · Mekânlar 2 · Gurme 2 · Etkinlik 2
- Detay "İlgili Keşifler" 3 kartı da pillar'a hizalandı: Gurme (Ege otları) · Etkinlik (Kayseri
  Mantı Günleri) · Mekân (İstanbul lokantaları)
- Uzun-form detay (Karadeniz hamsi/mıhlama) KORUNDU — "Lezzet Rotası" pillar'ına oturuyor;
  içinde usta söyleşisi (Nadire Teyze alıntısı) zaten var → söyleşi öğesi detayda yaşıyor
- `<title>` → "Mekânlar, Gurme Lezzetler & Lezzet Etkinlikleri"

**Eklenen CSS (yalnız 5 satır, SAYFA CSS bölümü):** chip ikon boşluğu + `.disc-where`/`.disc-when`
meta vurgusu (disc-meta dilinin içinde, yeni bileşen DEĞİL). Renk: tek baskın tomato; sarı
yalnız `.disc-rate` puanında; yeni renk yok → kılavuz renk disiplini korundu.

**Bilinçli KARAR — eski foursquare UI geri getirilmedi:** Eski site keşfet'in mesafe-slider'ı,
harita grid'i, aç/kapa filtre paneli, rezervasyon butonu GERİ GELMEDİ. Senaryo açıkça
"v3a disc-card grid + uzun-form detay" diyor; eskimiş olan tam da o filtre/harita UI'ıydı.
Konsept = editöryal keşif diliyle mekan/gurme/etkinlik kürasyonu, foursquare klonu değil.

## ③ Kanıt — probe / konsol / L1 kıyas / SS

**Statik doğrulama (tamamlandı):**
- Eski taksonomi grid'de SIFIR kaldı (`grep` temiz: Şehir Mutfağı/Sokak Lezzetleri/Mevsim
  Sofrası/Sürdürülebilir/Mutfak Yayını/mutfağın hikâyesi → NONE)
- Pillar dağılımı (10 kart, grid+ilgili): Mekânlar 3 · Gurme 3 · Etkinlik 3 · Lezzet Rotası 1
- disc-badge etiketleri: Mekân 3 · Gurme 3 · Etkinlik 3 · Haftanın Keşfi 1

**L1 chrome kıyas (anasayfa-portal-v3a / _shell baz):** header / mega menü / footer (orange+
reveal) / drawer / bottom-nav / topbar / görüş-modal / çerez-banner bloklarına **HİÇ
DOKUNULMADI** → shell-verbatim, v3a ile birebir. Kart dili `disc-card`/`disc-grid`/`disc-fig`/
`m-types`/`disc-badge` v3a 672–712 VERBATIM; sadece içerik + meta span'ları değişti, yeni
class türetilmedi (`.disc-where/.disc-when` yalnız renk vurgusu). Kılavuz §0–§4 uyumlu.

**Probe + SS (TAMAMLANDI — headless Chrome, MCP kontention'ı bypass):** MCP tek-instance
mobil denetimde meşgul olduğu için lead yönlendirmesiyle `sweep.py` deseninden headless
Chrome rotası kullanıldı (`.ss-scratch/revize2/kesfet/probe.py`). Sonuçlar:

| Kontrol | Sonuç |
|---|---|
| Konsol hatası (3 SS + probe) | **0 error** (hepsi `errs:[]`) |
| Kategori chip değişimi | ✅ `chipOk` — "Mekânlar" active oldu, "Hepsi" pasifleşti |
| Kart → uzun-form detay | ✅ `detailOk` — `#keGrid` hidden, `#keDetail` görünür |
| "Keşfet'e dön" | ✅ `backOk` — grid geri geldi |
| **Tek sabit alt katman (mobil)** | ✅ `bnCount=1` — yalnız bottom-nav; kendi şeridi yok |
| bottom-nav hedefleri | 5 link: anasayfa · tarif-liste · bugun-ne-pisirsem · saglik-hub · hesabim |
| 390 yatay taşma | ✅ `sw390=375` (≤390, overflow yok) |
| Pillar dağılımı (disc-cat) | Mekânlar 3 · Gurme Lezzetler 3 · Etkinlikler 3 · Lezzet Rotası 1 |

**SS yolları** (`mockups/.ss-scratch/revize2/kesfet/`):
- `kesfet-1440-once.png` (1440, ÖNCE — `_kesfet-before.html` yedeğinden)
- `kesfet-1440-sonra.png` (1440, SONRA)
- `kesfet-390-sonra.png` (390, SONRA)

**L1 kıyas (gözle, 1440 once vs sonra):** Header (logo·nav·arama·Giriş Yap), footer (orange),
çerez banner ÖNCE/SONRA **birebir aynı** → chrome'a dokunulmadığı görsel olarak doğrulandı.
Kart dili (disc-card 16:10 görsel + disc-cat + h3 + p + disc-meta) v3a ile uyumlu; tek fark
içerik + pillar rozet/meta. SONRA'da sapma giderilmiş: eyebrow "Lezzet Rehberi", H1 "gidilecek
mekânlar, denenecek lezzetler", chip rayı 3 sütun, kartlarda Mekân/Gurme/Etkinlik kimliği +
konum/tarih meta. ÖNCE'de "Mutfak Yayını / mutfağın hikâyesi" + soyut dergi kartları.

**Mobil (390) gözle:** tek kolon kart yığını, kategori chip yatay kaydırma, alt köşede tek
yüzen bottom-nav pill — kuralla uyumlu (1 sabit alt katman).

**Temizlik:** `mockups/_kesfet-before.html` (geçici, SS için kök) SİLİNDİ → üretim envanteri
62 sayfada sabit. Yedek `.ss-scratch/revize2/kesfet/_kesfet-before.html` altında durur.

**Tereddütler:** (1) "Söyleşi" pillar olarak ayrı kart yapılmadı — usta söyleşisi öğesi feature
detayının içinde yaşıyor (Nadire Teyze alıntısı) + chip'te seçenek olarak duruyor; makul
varsayım, yer/lezzet/etkinlik üç çekirdek sütunu öne alındı. (2) Etkinlik kartlarında
katılım/ücret bilgisi mock; gerçek veride backend alanı gerekir. (3) Unsplash görselleri
headless'ta yüklendi; gerçek görsellerde de div+bg-image (cover/center) deseni kullanılmış.

**Loop sigortası:** 1 kurgu turunda oturdu (MAX 2). İkinci tura gerek kalmadı.
