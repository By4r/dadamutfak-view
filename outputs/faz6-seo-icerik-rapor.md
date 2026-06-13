# FAZ 6 — T4: SEO İçerik Dolumu Raporu

**Teammate:** seo-icerik · **Tarih:** 2026-06-13 · **Sahip dosyalar:** ansiklopedi-v1.html, ansiklopedi-detay-v1.html, sozluk-v1.html

---

## Özet

Görev iki parçaydı: (1) gerçek "yakında" içerik placeholder'larını kaldırmak, (2) gerçek
Türkçe mutfak SEO metni doldurmak. İnceleme sonucu **gerçek iş tek dosyada** çıktı:
`ansiklopedi-v1.html`. Diğer iki dosya zaten tam/gerçek içerikliydi.

## Yapılan İş

### 1. ansiklopedi-v1.html — 15 boş kategoriye gerçek içerik

**Önceki durum:** 19 sözlük kategorisinden yalnız 4'ünde (Baharatlar, Bakliyatlar, Sebzeler,
Meyveler) gerçek madde vardı. Kalan 15 kategori kartında `.anc-cc.soon` → "yakında" etiketi,
kart tıklanınca da "Bu kategori yakında / maddeler hazırlanıyor" boş durumu görünüyordu.

**Yapılan:**
- **15 kart sayacı** `<span class="anc-cc soon">yakında</span>` → `<span class="anc-cc">2 madde</span>`
  (gerçek madde sayısı; soon sınıfı kaldırıldı → kart artık aktif/dolu görünüyor).
- **15 yeni `.ans-catsec` drill bloğu** eklendi (KATMAN 2, baharat bölümünden sonra,
  catEmpty boş-durumundan önce). Her biri mevcut `ans-item` / `ans-row` / `ans-detail`
  akordeon anatomisini **birebir miras aldı** (kılavuz §2d term-row/ansiklopedi dili):
  - Her madde: görsel thumb + ad + Latince ad + rozet + **"Nedir?"** ve **"Faydaları"**
    başlıklı gerçek ansiklopedik metin + "Maddenin tamamını oku" linki.
  - **30 yeni madde** (kategori başı 2):
    Balıklar (Hamsi, Levrek) · Çaylar (Yeşil Çay, Ihlamur) · Çikolatalar (Bitter, Kakao) ·
    Domatesler (Çeri, Kurutulmuş) · Etler (Dana, Kuzu) · Kahveler (Türk Kahvesi, Espresso) ·
    Kuruyemişler (Ceviz, Badem) · Mantarlar (Kültür, İstiridye) · Otlar (Maydanoz, Fesleğen) ·
    Peynirler (Beyaz, Kaşar) · Pirinçler (Baldo, Basmati) · Sirkeler (Elma, Üzüm) ·
    Tuzlar (Deniz, Kaya) · Yağlar (Zeytinyağı, Tereyağı) · Yumurtalar (Tavuk, Bıldırcın).
  - Metinler gerçek Türkçe mutfak bağlamı: ne olduğu, mutfakta nerede/nasıl kullanıldığı,
    besin faydaları. Lorem YOK.
- **Boş-durum metinleri** "yakında"dan arındırıldı (artık 19/19 kategori dolu olduğu için
  bu durumlar erişilemez/ölü kod ama metin temizliği yapıldı):
  - Boş-harf durumu: "...kategori **yakında eklenecek**" → "...bir kategori **bulunmuyor**".
  - catEmpty başlık: "Bu kategori **yakında**" → "Bu kategoride **madde bulunamadı**".
  - catEmpty gövde: "maddeleri **hazırlanıyor — çok yakında**..." → "Aramanı temizleyip
    kategorilere dönebilirsin...".
  - JS fallback (openCat): `lbl+' — yakında'` → `lbl+' — madde bulunamadı'`;
    "maddeler hazırlanıyor" → "bu kategoride madde yok".

- **Ölü CSS temizlendi:** markup'ta `.soon` kalmadığı için öksüz düşen
  `.anc-card .anc-cc.soon` kuralı (eski satır 822) silindi. Genel `.soon` kuralları (gate
  badge / d-link kullanıyor) ve kapı rozeti `tw-soon`/`dw-soon` korundu.

### 2. ansiklopedi-detay-v1.html — DOKUNULMADI (zaten tam)

İnceleme: Barbunya maddesi **tam bir SEO makalesi** olarak hazır — "Barbunya nedir?",
"Ne işe yarar, nerede kullanılır?", "Faydaları", "Nasıl seçilir ve saklanır?" başlıkları,
besin değeri tablosu, kısa bilgi kutusu, ilgili tarifler ve maddeler. Placeholder yok.
Tek "placeholder" geçişi form input'larının `placeholder=` attribute'leri (meşru). Değişiklik gerekmedi.

### 3. sozluk-v1.html — DOKUNULMADI (zaten tam)

İnceleme: 26 terimin **tamamı** gerçek, zengin tanımlı (Benmari, Beşamel, Blanşe etmek...).
Her terim: tanım paragrafı + örnek cümle + ilgili tarif/püf linkleri. Placeholder yok. Değişiklik gerekmedi.

---

## Kanıt

| Kontrol | Komut | Sonuç |
|---|---|---|
| İçerik "yakında" placeholder = 0 | `grep -n "yakında\|hazırlanıyor\|eklenecek" ansiklopedi-v1.html \| grep -v 'tw-soon\|dw-soon'` | **0 eşleşme** (exit 1) ✅ |
| Kapı rozeti korundu | `grep -c "tw-soon\|dw-soon"` | **6** (topbar+drawer, dokunulmadı) ✅ |
| `.anc-cc soon` kaldı mı | `grep -c "anc-cc soon"` | **0** ✅ |
| Kart ↔ drill parite | `id="cat-"` vs card `data-cat` | **19 = 19**, anahtarlar birebir eşleşiyor ✅ |
| Toplam madde | `grep -c 'class="ans-item"'` | **39** (9 mevcut + 30 yeni) ✅ |
| Mojibake (TR karakter) | `grep -c 'Ã\|Ä\|Å\|â€'` | **0** (Edit aracı saf UTF-8, perl kullanılmadı) ✅ |

> Render SS: MCP playwright lead'e rezerve — faz-sonu turunda lead alacak. DOM probe ile
> içerik dolu doğrulandı (yukarıdaki tablo).

---

## Çakışma Koordinasyonu

- T1'in sahası olan **hero/crumb (dosya başı .lst-top/.art-hero)** bölgesine **dokunulmadı**.
  Tüm değişiklikler gövde bölgesinde: KATMAN 1 grid sayaçları (~1308-1402), KATMAN 2 drill
  (~1413-2000), JS openCat fallback (~2070). Lead'e başlamadan önce bildirildi; mtime temizdi
  (16:13, başka yazan yoktu).
- Kapı rozeti `tw-soon`/`dw-soon`'a dokunulmadı.

---

## Tasarım Gözü

- Yeni 15 kategori artık grid'de **"2 madde"** aktif sayaçla görünüyor; gri "yakında"
  etiketinin yarattığı "yarım site" hissi kalktı. A–Z harf çubuğundaki harfler zaten aktifti,
  içerik gelince fonksiyonel oldular.
- Madde detayları mevcut "Nedir? / Faydaları" iki-başlık ritmini koruyor — tüm 19 kategori
  tek bir tutarlı ansiklopedi dilinde. Rozetler (Omega-3, Antioksidan, Demir kaynağı...)
  içeriğe gerçek bir SEO/besin imzası katıyor.
- Metin uzunluğu kasıtlı kısa-temsili tutuldu (madde başı 2 cümle): grid akordeonu hafif
  kalsın, "tamamını oku" detay sayfasına (zaten tam olan Barbunya makalesi) yönlensin.

---

## Bilinen Sınırlamalar

1. **`toplam 480 madde` sayacı temsilî.** `ans-count` satırı hâlâ "toplam 480 madde" diyor;
   mockup'ta görünen gerçek madde sayısı 39. Bu kasıtlı bir "havuz toplamı" çerçevesi
   (gerçek sitede her kategori sayfası daha fazla madde içerecek). Kart sayaçları (1-4 madde)
   ile bu 480 arasındaki fark mockup-temsilî; istenirse gerçek toplama (39) çekilebilir —
   ama o zaman hero istatistikleriyle (T1) eşgüdüm gerekir, dokunmadım.
2. **Görsel thumb URL'leri Unsplash photo-id'leri.** Yeni 30 maddenin bir kısmı için tahminî
   Unsplash id'leri kullanıldı; çoğu yemek/malzeme temalı ama birkaçı tam o malzemeyi
   göstermeyebilir (örn. bıldırcın yumurtası, kaya tuzu). Gerçek üretimde malzeme-spesifik
   görsellerle değiştirilmeli. CSS render genişliği esas alındı, 2x retina çarpımı YOK.
3. **catEmpty / boş-harf durumları artık ölü kod.** 19/19 kategori dolu olduğu için bu boş
   durumlara normal akışta erişilemez. Yine de "yakında" metinleri temizlendi; ileride yeni
   boş kategori eklenirse zarif (placeholder'sız) düşer.
4. **Madde detay linkleri tek hedefe gidiyor.** Tüm "Maddenin tamamını oku" linkleri
   `ansiklopedi-detay-v1.html`'e (Barbunya örneği) gidiyor — mockup'ta tek detay şablonu var.
   Gerçek sitede madde-spesifik detay sayfaları olacak.
5. **Render SS alınmadı** (MCP playwright lead'e rezerve). Doğrulama DOM probe ile yapıldı.
