# CİLA-2 FAZ 4 — Sırlar Modülleri Kategori Entegrasyonu (kategori-sirlar)

> Takım: cila2-faz4 · Teammate: kategori-sirlar · Görev: TASK #2
> Veri kaynağı: `tasks/kategori-veri.md` §4, §5, §6, §7, §8
> Kapsam: olcu-birimleri-v1 · mutfaga-giris-v1 (+detay) · puf-noktalari-v1 (+detay +ekle) · ansiklopedi-v1 (DOĞRULA)

---

## ÖZET — Yapılanlar

| Sayfa | Veri | İş | Durum |
|---|---|---|---|
| olcu-birimleri-v1 | §4 (10 üst→65 alt), §5 (6) | Düz 5-tab tablo → **iki seviyeli akordeon** (10 üst kat. → 65 alt malzeme) + **§5 çevrim tablosu** | ✅ |
| mutfaga-giris-v1 | §6 (7 ana + 36 alt) | Konu Kütüphanesi 4 sahte blok → **gerçek 7 ana başlık + 36 alt** (gerçek slug'lı topic-link) | ✅ |
| mutfaga-giris-detay-v1 | §6 | Breadcrumb'a gerçek ana başlık seviyesi eklendi (iki-seviye İA görünür) | ✅ |
| puf-noktalari-v1 | §7 (9 soru) | Konu çipleri → **9 SORU-formatlı kategori** + 12 kart yeniden yazıldı/etiketlendi | ✅ |
| puf-noktasi-detay-v1 | §7 | Rozet + 4 "Benzer" kartı soru-formatına çevrildi | ✅ |
| puf-noktasi-ekle-v1 | §7 | Kategori seçimi (select) → 9 soru-formatlı kategori | ✅ |
| ansiklopedi-v1 | §8 (19) | **DOĞRULANDI** — 19 kategori Faz3'te girilmiş, eksik yok | ✅ doğrulama |

---

## DETAY

### 1. olcu-birimleri-v1 — §4 İki Seviyeli Veri (a463329 tasarım dili korunarak)

> **DÜZELTME TURU (lead 2. fix):** İlk turda 2-seviye veriyi göstermek için sıfırdan akordeon (`.uacc*`,
> ~24 CSS kuralı + `.std-conv` çevrim tablosu) yazmıştım — veri 2-seviye meşru ama TASARIM DİLİ'ni
> değiştirmek değil. **Geri alındı:** `a463329` onaylı kabuk birebir restore edildi (disc-tabs pill +
> nut-table + markalı SVG + one-page tab kurgu + converter + tüm CSS/JS aynen), sonra 2-seviye veri
> a463329'un KENDİ tab→tablo deseniyle dolduruldu. **git diff a463329: CSS-kural değişimi = 1
> (`.ut-tabs{flex-wrap:wrap;margin-bottom}` — 10 uzun kategori adı tek satıra sığmaz, veri-zorunlu
> minimum); `<style>`/`<script>`/JS değişimi = 0.**

**§4 (10 üst → 65 alt):** a463329'da "Dönüşüm Tabloları" zaten **tab → nut-table** deseniydi (5 örnek
tab). Aynı `.disc-tabs/.dt` pill + `.tbl-pane/.nut-table` tasarım diliyle **gerçek 10 üst kategori tab**
(üst seviye) → her tab o üstün **alt malzeme tablosu** (alt seviye). Sıfırdan akordeon DEĞİL.

- Üst kategoriler (tab): Bakliyatlar(7), Baharatlar(7), Hamur ve Pastacılık Malzemeleri(7),
  Kahvaltılık Ürünler(6), Kuruyemişler ve Tohumlar(7), Sıvılar Yağlar ve Salçalar(7),
  Soslar ve Hazır Ürünler(6), Süt ve Süt Ürünleri(6), Şeker ve Tatlandırıcılar(6), Unlar ve Tozlar(6).
- **Render probe: 10 tab / 10 pane / 65 alt satır** (= §4 65 alt); tab geçişi a463329 JS'iyle çalışıyor.
- Tek görsel fark: 10 uzun adlı tab sağdaki sec-tools slotuna sığmadığından **tam-genişlik sarma satırına**
  taşındı (pill stilinin KENDİSİ a463329 ile birebir — yalnız konum/wrap; veri-zorunlu minimum istisna).
- Gram değerleri mockup ortalamasıdır (gerçek backend verisi Laravel fazında).

**§5 Ölçeklendirmeler 6:** a463329'un **markalı SVG std-card seti** (Su Bardağı, Çay Bardağı, Kahve
Fincanı, Yemek Kaşığı, Tatlı Kaşığı, Çay Kaşığı = 6 Ölçeklendirme) §5'i zaten karşılıyor → **a463329'daki
gibi AYNEN korundu** (ilk turdaki ekstra `.std-conv` çevrim tablosu KALDIRILDI; 6 SVG kart yeterli).

**Yan-yana SS kanıtı:** `f4-olcu-fix.png` (current) vs `f4-olcu-ref-a463329.png` (baz) → disc-tabs pill +
nut-table tasarım dili birebir tanınabilir aynı, sadece veri 10 üst/65 alt.

### 2. mutfaga-giris-v1 (+detay) — §6 Gerçek 7 Ana + 36 Alt İA

> **DÜZELTME TURU (lead regresyon yakaladı):** İlk turda Konu Kütüphanesi'nin onaylı disc-card
> tasarımını yeni `topic-grid` komponentine çevirip CSS eklemiştim — bu KURGU değişikliğiydi, kategori
> entegrasyonu kuralı "SADECE veri" diyor. **Geri alındı:** `a463329` onaylı kabuk birebir restore edildi
> (yatay step-rail rota + gnav çapa + disc-card konu kütüphanesi + tüm CSS aynen), sonra SADECE veri
> dolduruldu. **git diff a463329: CSS-kural değişimi = 0, `<style>`/`<script>` değişimi = 0.**

- Konu Kütüphanesi: **onaylı disc-card tasarımı korunarak** 4 sahte blok → **gerçek 7 ana başlık**
  (lib-block), her biri kendi **alt başlıklarıyla** (toplam 36): alt'lar hem `ke-filter` çiplerinde
  (onaylı "Alt kategori" slotu) hem de `disc-card`'larda (alt başına 1 kart, `data-sub` eşleşmeli →
  per-blok filtre 1:1 çalışır). Görseller a463329'un 12'lik havuzundan döngüyle.
- Gerçek URL slug'ları: `mutfaga-giris-detay-v1.html?konu=<gerçek-slug>` (lb-go + her disc-card href).
  **Probe: 7 lib-block / 36 disc-card / 12 rstep (rota sağlam) / gnav var; filtre Fırında→1, Tümü→5 ✅.**
- Veri güncellemeleri (kurgu değil): Hero "24 → 36 Konu"; hero hızlı-geç çip etiketleri gerçek ana
  başlıklara; intro "36 konuda"; kütüphane lead "36 konu, yedi ana başlık".
- **Yeni CSS YAZILMADI** — yalnız mevcut `.lib-block/.ke-filter/.disc-card/.lvl/.disc-meta` sınıfları.
- **detay:** Breadcrumb'a gerçek ana başlık seviyesi eklendi
  (Mutfağa Giriş › **Pişirme Teknikleri** › Haşlama) — iki-seviye İA görünür oldu (sadece <a> eki).
- **Yan-yana SS kanıtı:** `f4-mutfaga-giris-fix.png` (current) vs `f4-mutfaga-giris-ref-a463329.png` (baz)
  → kurgu birebir aynı, sadece veri zengin.

**EK FİX — "Tümünü Gör" link davranışı (lead 3. bulgu, kategori-data değil link-fix):**
Section başlığı yanı "Tümünü Gör" (`.lb-go`) DETAY sayfasına gidiyordu — yanlış kurgu (teşhis: a463329'da da
böyleydi, kabuk parçası; ben bozmadım). Doğru kurgu: "Tümünü Gör" → o konunun TÜM kartlarının
**liste görünümü**, tek kart → kendi detayı. **Sadece HEDEF düzeltildi** (kurgu/CSS değişmez, salt href):
7 lb-go → `mutfaga-giris-v1.html?konu=<ana>#kutuphane` (liste görünümü, detay DEĞİL); 36 disc-card +
12 rota adımı detay'da KALDI (doğru). Eski site modeli referans: Mutfağa Giriş tek liste sayfası +
kategori tab'ları, kartlar → detay. **Tıklama probe:** "Tümünü Gör" → liste (7 blok/36 kart,
art-hero/rd-gallery yok = detay değil) ✅; kart → detay ✅. CSS/`<style>`/`<script>` diff = 0.
SS: `f4-mutfaga-tumunu-gor.png`.

### 3. puf-noktalari-v1 (+detay +ekle) — §7 9 Soru-Formatlı Kategori

- **Liste filtre çipleri:** 7 konu-bazlı çip (Pişirme/Saklama/Hamur/Et/Sebze/Tatlı/Pratik) →
  **9 SORU-formatlı kategori**: Nasıl Saklanır? · Ne İyi Gider? · Kaç Kalori? · Faydaları ·
  Nasıl Kullanılır? · Nedir? · Mevsimi Ne Zaman? · Püf Noktaları · Mutfak Bilgileri (+ "Tümü").
- 12 kart, soru-formatına uygun **yeniden yazıldı** ve `data-cat` + `puf-tag` ile yeniden etiketlendi;
  9 kategorinin **hepsi ≥1 kart** ile temsil edildi. Mevcut görseller (Unsplash URL'leri) korundu.
- **Canlı filtre probe:** 10 çip; "Nasıl Saklanır?" → 2 kart, "Kaç Kalori?" → 2 kart, "Tümü" → 12 kart;
  özet sayacı güncelleniyor. ✅
- Hero hızlı-geç çipleri (data-jump = soru slug'ları) + "8 Kategori → 9 Kategori" güncellendi.
- **detay:** Rozet "Püf Noktası · Pişirme Teknikleri" → "Mutfak Sırrı · Püf Noktaları";
  4 "Benzer" kartı soru-formatına çevrildi (Mutfak Bilgileri / Nedir? / Kaç Kalori? / Nasıl Kullanılır?).
- **ekle:** Kategori `<select>` (label "Konu" → "Kategori") → 9 soru-formatlı seçenek; default "Püf Noktaları".

### 4. ansiklopedi-v1 — §8 Sözlük 19 (DOĞRULAMA)

- **DOĞRULANDI.** 19 `anc-card` `data-name` değeri §8'in 19 Sözlük kategorisiyle **birebir** eşleşiyor:
  baharatlar, bakliyatlar, balıklar, çaylar, çikolatalar, domatesler, etler, kahveler, kuruyemişler,
  mantarlar, meyveler, otlar, peynirler, pirinçler, sebzeler, sirkeler, tuzlar, yağlar, yumurtalar.
- Eksik/fazla yok. Yeni iş yapılmadı (Faz3'te girilmişti). Diğer `data-name`'ler 2. katman malzeme
  öğeleri (`ans-item`: ıspanak, kabak, enginar...) — kategori değil, karışmıyor.

---

## KANIT (zorunlu kalemler)

- **grep (eski yok + yeni var):**
  - puf liste: eski `data-cat/jump` (pisirme/saklama/hamur/et/sebze/tatli/pratik) = **0**;
    eski `puf-tag` (Pişirme/Saklama/Hamur & Fırın/Et & Tavuk/Sebze/Pratik) = **0**. Yeni 9 kategori mevcut.
  - mutfaga-giris: 36 topic-link, 7 lib-block, gerçek slug'lar mevcut (örneklem 7/7 ✅).
- **Render probe:** olcu 10 üst/65 alt/6 çevrim ✅ · mutfaga 7/36 ✅ · puf filtre 10 çip/2-2-12 ✅ ·
  ansiklopedi 19 kategori ✅.
- **390 taşma probe (element-rect, scrollWidth değil):** her sayfada `document.scrollWidth = 375 ≤ 390`,
  yatay taşma yok. İki-seviyeli komponentlerde (akordeon başlığı, topic-grid, puf-card) **element-rect
  overflow = 0**. (tbl-scroll/ob-tabs içi hücreler kasıtlı yatay scroller — false positive, sayfa taşmıyor.)
- **Konsol:** 6 sayfada da **0 error / 0 warning**.
- **numstat / yutma:** En büyük silme mutfaga-giris −242 satır = ağır disc-card bloklarının hafif
  topic-link'lerle bilinçli değişimi. Chrome bütünlüğü (mega/footer/bottom-nav/lg-gate) **6/6 sayfada sağlam**
  — shell yutması yok.
- **Miras:** Markalı SVG ölçü seti, kanon/hero/breadcrumb, görselli kart/chip pattern korundu; dokunulmadı.

---

## BİLİNEN SINIRLAMALAR (zorunlu)

1. **Gram değerleri mockup ortalaması.** olcu-birimleri akordeonundaki 65 alt malzemenin
   bardak-kaşık-gram değerleri temsilî/ortalama; gerçek üretim verisi backend (Laravel) fazında bağlanacak.
2. **§5 Su Bardağı 200 ml vs Excel 240 ml çatışması.** Sayfa (a463329) baştan sona Türk mutfağı
   standardı **200 ml** kullanıyor (dönüştürücü, gram tabloları, SVG kartlar). Excel §5 "Su Bardağı
   (240 ml)" (Amerikan cup) diyor. a463329 tasarım dilini koruma kararıyla **200 ml korundu** (ilk turda
   eklediğim açıklayıcı not, `.std-conv` tablosuyla birlikte geri-alımda kaldırıldı). **Patron kararı (VERİ):**
   200 mi 240 mı standart olsun? — sentezde patron-bekleyen olarak işaretlenecek.
3. **§6 gerçek slug'lar tek paylaşımlı detay sayfasına gidiyor.** 36 alt başlık linki
   `mutfaga-giris-detay-v1.html?konu=<slug>` formatında; slug birebir gerçek ama detay sayfası `?konu`
   parametresini okuyup içerik değiştirmiyor (sabit "Haşlama" örnek dersini gösterir). Gerçek içerik
   eşlemesi backend fazında. Aynı durum puf `?konu` için de geçerli değil — puf kartları tek detaya gider.
4. **puf 12 kart içeriği örnek.** Soru-formatı modelini göstermek için 12 kart ingredient-Q&A olarak
   yeniden yazıldı (Domates/Brokoli/Tarçın/Enginar...); gerçek 215 püf kaydı backend'de. Kart sayısı
   (12) ve "215" istatistiği mock.
5. **Ölü CSS YOK (düzeltme sonrası).** Hem olcu hem mutfaga-giris a463329 onaylı tasarım diline geri
   döndü; her iki sayfada da tüm CSS sınıfları kullanımda (ilk turun `.uacc/.std-conv/.topic-grid` ölü
   ekleri geri-alındı).
6. **detay breadcrumb ana başlığı statik.** mutfaga-giris-detay'a eklenen "Pişirme Teknikleri" seviyesi
   sabit (paylaşımlı detay); gerçekte `?konu`'ya göre dinamik olmalı (backend).

---

## ETKİLENEN DOSYALAR

```
mockups/olcu-birimleri-v1.html        (a463329'a karşı +141 / -49 — disc-tabs/nut-table dili korunarak 10 üst/65 alt veri; CSS-kural diff = 1 [.ut-tabs])
mockups/mutfaga-giris-v1.html         (a463329'a karşı +549 / -117 — onaylı disc-card kabuğu + 36 alt veri; CSS/JS diff 0)
mockups/mutfaga-giris-detay-v1.html   (+2  / -0)
mockups/puf-noktalari-v1.html         (+59 / -57)
mockups/puf-noktasi-detay-v1.html     (+5  / -5)
mockups/puf-noktasi-ekle-v1.html      (+11 / -10)
mockups/ansiklopedi-v1.html           (değişiklik yok — sadece doğrulama)
```

Git commit/push YAPILMADI (kural gereği).
