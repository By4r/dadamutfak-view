# DadaMutfak — Araştırma & Envanter

Mevcut materyallerden (içerik sitesi, admin panel, araştırma + diyetisyen
dökümanları) çıkarılan yapı, modül envanteri ve ilk tasarım gözlemleri.

---

## 1. Marka Ne? (Konumlandırma)

DadaMutfak **kullanıcı katkılı bir yemek tarifi topluluğu** — tek bir şey değil,
4 katmanlı bir platform:

1. **Tarif topluluğu** — kullanıcılar kendi tariflerini paylaşır, puanlar,
   yorumlar, püf noktası ekler. (Cookpad / Allrecipes modeli)
2. **Mutfak rehberi & eğitim** — püf noktaları, sözlük, ölçü birimleri,
   "mutfağa giriş", şefler. (Kitchen Stories / Serious Eats modeli)
3. **Sağlık & diyetisyen** — kalori/BMI/bazal metabolizma hesaplayıcıları,
   testler, **diyetisyen modülü** (danışan yönetimi, beslenme planı, randevu).
4. **E-ticaret** — ürünler, sepet, ödeme (mutfak ürünleri / yöresel ürün).

Ek temalar: **Ramazan** (iftara/sahura doğru, ramazan menüleri), **"Bugün ne
pişirsem"** / **tarif bulucu** (malzemeye göre öneri — SuperCook modeli),
**keşfet** akışı.

**Hedef kitle:** evde yemek yapan kullanıcılar, amatör aşçılar, aileler,
pratik/videolu tarif arayan gençler, sağlıklı/bitki bazlı beslenme odaklılar.

**Özgün yön:** "denenmiş, yorumlanmış, puanlanmış" tarif → güven. Tarif sadece
okunmaz; paylaşılır, deneyim/foto eklenir, takip edilir.

---

## 2. Public Site — Sayfa / Modül Envanteri

Mevcut `dada-mutfak-icerik` klasöründe **70+ HTML sayfası** var. Mantıksal grup:

### Tarif çekirdeği
- `index.html` — ana sayfa
- `tarifler.html`, `tarif-detay.html`, `tarif-kategori.html`
- `tarif-ekle.html`, `tarif-duzenle.html`, `tarif-onay.html`, `ihlal.html`
- `tarif-bulucu.html` — malzemeye göre arama
- `bugun-ne-pisirsem.html`, `bugun-ne-pisirsem-liste.html`
- `yazdir.html` — tarif yazdırma görünümü

### Keşif & topluluk
- `kesfet.html`, `kesfet-detay.html`
- `sefler.html` — şefler
- `mutfaga-giris.html`, `mutfaga-giris-detay.html`
- `kullanici-profili.html`

### Mutfak rehberi
- `puf-noktalari.html`, `puf-noktalari-detay.html`, `puf-noktasi-ekle.html`,
  `puf-noktasi-duzenle.html`, `puf-nokta-onay.html`
- `sozluk.html`, `sozluk-detay.html`, `sozluk-kategori.html`,
  `sozluk-harf-secili.html`
- `olcu-birimleri.html`

### Sağlık & hesaplama
- `hesaplamalar.html`
- `besin-kalori-hesapla.html`, `beden-kutle-endeksi-hesapla.html`,
  `bazal-metabolizma-hizi-hesapla.html`, `vucut-tipi-hesapla.html`
- `testler.html`, `test-detay.html`
- `diyetisyenler.html`, `diyetisyen-profili.html`

### Ramazan
- `iftara-dogru.html`, `sahura-dogru.html`, `ramazan-menu-detay.html`

### E-ticaret
- `urunler.html`, `urun-detay.html`, `sepet.html`
- `odeme.html`, `odemeyi-tamamla.html`, `fatura.html`, `siparisiniz-alindi.html`
- `menulerim.html`, `men/menü` yönetimi

### Hesap & üyelik
- `giris.html`, `kayit.html`, `sifremi-unuttum.html`
- `hesabim.html`, `kullanici-profili.html`

### Kurumsal & yasal
- `hakkimizda.html`, `iletisim.html`, `sss.html`, `kunye.html`
- `reklam-vermek.html`, `sponsorluk.html`, `oneri-ve-sikayet.html`
- KVKK, gizlilik, üyelik/kullanım sözleşmeleri, mesafeli satış, iptal-iade,
  ödeme-teslimat, aydınlatma/bilgilendirme metinleri (~10 yasal sayfa)

### Ana sayfa bölümleri (mevcut index'ten)
Kategoriler · Malzemeye Göre Tarif Ara · Tariflerimiz · Mutfağa Giriş ·
Şefler · Keşfet · Mobil uygulama CTA · Püf Noktaları · En Lezzetli Videolar ·
Ürünler / İndirimdeki Ürünler · Görüş Bildir / İletişim formu.

---

## 3. Admin Panel — Modül Envanteri

`dada-mutfak-panel` (mevcut tema bazlı admin) sol menü modülleri:

- **Tarif:** Tarif Yönetimi, Malzeme Yönetimi, Dünya Mutfakları, Yemek Modları
- **Ramazan:** İftar / Sahur Yönetimi
- **Mutfak Sırları:** Mutfağa Giriş, Püf Noktalar, Keşfet, Sözlük
- **Test Yönetimi**, **Slider Yönetimi**
- **Resmi Sayfalar:** Sayfa Tanımları, Ana Sayfa, Hakkımızda, SSS, Künye,
  Hesaplamalar, Sponsorlar/Partnerler, Reklam Vermek
- **Ölçü Birimleri**, **Menü Yönetimi**, **Popup Yönetimi**, **Reklam Yönetimi**
- **Üyeler:** Üyeler, E-Bülten, **Diyetisyenler**, Yorumlar, Yazarlar
- **Raporlar:** Ziyaretçi Demografisi, Kullanıcı Davranışları, Trafik
  Kaynakları, İçerik Performansı, Arama Trendleri
- **Form Yönetimi:** Form Talepleri, Mail Yönlendirmeleri, Görüş Bildirimleri
- **Log Yönetimi**, **E-commerce**

> Not: Bu faz public arayüz tasarımına odaklı. Admin panel envanteri, hangi
> içerik tiplerinin frontend'de görüneceğini anlamak için referans.

---

## 4. İçerik Tipleri (modellenecek)

Tarif · Malzeme · Ölçü birimi · Dünya mutfağı / kategori · Yemek modu ·
Püf noktası · Sözlük terimi · Test/anket · Hesaplayıcı · Şef/yazar · Diyetisyen
· Danışan · Beslenme planı/reçete · Randevu · Ürün · Sipariş · Slider · Popup ·
Reklam · Ramazan menüsü · Yorum/puan · Kullanıcı.

### Diyetisyen modülü (ayrı döküman gereksinimleri)
Diyetisyen kaydı + public profil (SEO açık) · Danışan yönetimi · Randevu takip
(takvim) · Beslenme planı/reçete (öğünler + makro + PDF) · Kalori hesaplama
aracı · Danışan girişi (reçete görüntüleme, mesajlaşma, kilo/ölçü takibi) ·
Blog/örnek menü paylaşımı.

---

## 5. İlk Tasarım Gözlemleri

- **Mevcut palet sıcak ve kalabalık:** primary `#e14827` (domates kırmızısı),
  metin `#253D4E`, yeşil `#3BB77E`, sarı `#fac045`. Modern yeniden tasarımda
  paleti **tek primary + 1 aksan + nötr gri skala** ile sadeleştirmek daha şık
  olur. Sıcak domates kimliği korunabilir ama daha kontrollü.
- **Çok modüllü platform** → güçlü bir **bilgi mimarisi** ve **tutarlı kart/grid
  komponent dili** kritik. Tarif kartı, ürün kartı, şef kartı, püf-noktası kartı
  tek bir tasarım sisteminden türetilmeli.
- **Görsel ağırlıklı içerik** (tarif fotoğrafları, video) → kare/oranlı görseller
  `div + background-image cover` ile; bol beyaz alan, net tipografik hiyerarşi.
- **Arama & keşif birinci sınıf:** "ne pişirsem", malzemeye göre arama, kategori
  filtreleri ana sayfada öne çıkmalı (SuperCook/Samsung Food modeli).
- **Mobil öncelik:** hedef kitle genç + pratik tarif arıyor → mobil-first grid,
  dikey video desteği (Tasty modeli).
- **Güven sinyalleri:** puan, yorum sayısı, "denendi" rozetleri tarif kartında
  görünür olmalı (Allrecipes modeli).

---

## 6. İlham / Referans Siteler (4 adet)

Modern, sade, yemek/diyetisyen/tarif/sağlıklı yaşam temalı — her biri farklı bir
güçlü yön için:

### 1. NYT Cooking — https://cooking.nytimes.com
**Neden uygun:** Premium, editöryal, sakin bir tarif arşivi deneyimi; bol beyaz
alan, güçlü tipografi, dağınık olmayan grid.
**Örnek alınacak yön:** Tarif kartı + tarif detay sayfasının tipografik
hiyerarşisi ve sade kürasyon dili; "denenmiş/güvenilir" hissini görselle vermesi.

### 2. Kitchen Stories — https://www.kitchenstories.com
**Neden uygun:** Yeni başlayanlara yönelik, adım adım, şık ve görsel-öncelikli
tarif anlatımı; tam DadaMutfak'ın "mutfağa giriş" + eğitim ruhuna uyuyor.
**Örnek alınacak yön:** Adım adım tarif görünümü, büyük görsel kartlar, sade
renk paleti ve bol boşluk kullanımı.

### 3. Food52 — https://food52.com
**Neden uygun:** Tarif topluluğu + e-ticaret + yaşam tarzı içeriğini tek çatıda
modern biçimde birleştiriyor — DadaMutfak'ın çok-modüllü yapısının (tarif +
ürün + topluluk) birebir karşılığı.
**Örnek alınacak yön:** Çok farklı içerik tipini (tarif, ürün, makale) tutarlı
bir kart sistemiyle aynı ana sayfada toplama; topluluk + ticaret dengesi.

### 4. Mealime — https://www.mealime.com
**Neden uygun:** Sağlıklı beslenme + haftalık planlama + temiz, minimal,
fonksiyonel arayüz; "ne pişirsem / haftalık menü / diyetisyen" tarafının modern
karşılığı.
**Örnek alınacak yön:** Sadeleştirilmiş onboarding/seçim akışları, planlama UI'ı,
minimal renk paleti ve net CTA kullanımı.

> Bonus referanslar (gerekirse): Allrecipes (puan/yorum güven sinyalleri),
> Tasty (dikey video tarif), SuperCook ("evde ne var?" malzeme araması).

---

## 7. Genişletilmiş İlham Havuzu (Awwwards / CSS Design Awards seviyesi)

Yemekle sınırlı kalmadan, **güçlü tipografi · akıllı kart sistemi · nefes alan
layout · özgün etkileşim** kriterleriyle seçilmiş 10 site. Her birinde
DadaMutfak'a somut bir uyarlama notu var. (Bölüm 6'daki ilk 4 ile tamamlayıcı.)

### 1. Graza — https://www.graza.co
**Sektör:** Zeytinyağı / gıda e-ticaret (DTC marka)
**Özgün/kaliteli yapan:** Sıcak, oyuncu ama disiplinli bir görsel dil — sınırlı
nötr palet + tek canlı yeşil/sarı vurgu, kalın ama okunur display tipografi,
ürün kartlarında bol boşluk ve elle çizilmiş küçük illüstrasyon/animasyonlar.
Ciddi olmadan premium hissettiren marka sesi.
**DadaMutfak'a nasıl uyarlanır:** Bizim **ürün kartı** (urunler.html, urun-detay)
tam bu dilden beslenebilir: büyük ürün görseli (`div + bg-image cover`), altında
kalın ürün adı + tek satır espirili açıklama + net fiyat/CTA. Marka sıcaklığını
domates kırmızısı + tek nötr ile kurup, küçük el-çizimi mutfak ikonlarıyla
(kepçe, tencere) "Dada" kişiliğini tarif kartlarına da taşıyabiliriz.

### 2. Omsom — https://www.omsom.com
**Sektör:** Asya mutfağı yemek kiti e-ticaret
**Özgün/kaliteli yapan:** Yüksek-enerji renk blokları, esnetilmiş/oversized
tipografi, gurur dolu "loud" marka sesi. Kültürel/yöresel kimliği renk ve
tipografiyle cesurca öne çıkarması.
**DadaMutfak'a nasıl uyarlanır:** **Dünya Mutfakları / Yöresel kategori**
sayfalarında birebir model: her mutfağa (Karadeniz, Ege, Güneydoğu...) kendi
renk-bloğu + cesur başlık verip kategori girişlerini "billboard" gibi
tasarlayabiliriz. Ramazan landing (iftara/sahura doğru) için de bu enerjik
renk-bloğu dili güçlü bir tematik kimlik verir.

### 3. Fly By Jing — https://flybyjing.com
**Sektör:** Baharat/sos gıda e-ticaret
**Özgün/kaliteli yapan:** Yüksek kontrastlı görsel + tipografi eşleşmesi, ürün
fotoğraflarının kahraman olduğu sticky/scroll-driven ürün anlatımı, net bundle
(paket) kurgusu.
**DadaMutfak'a nasıl uyarlanır:** **Tarif → malzeme → "sepete ekle" köprüsü**
(araştırma dökümanındaki SideChef fikri) için ürün detayda scroll-driven anlatım;
ve **tarif bundle'ları** ("bu menünün tüm malzemeleri" / "Dada Haftalık Sepet")
için paket-kart kurgusu örnek alınır.

### 4. Alinea — https://www.alinearestaurant.com
**Sektör:** Fine-dining restoran (immersive)
**Özgün/kaliteli yapan:** Gutter'sız (boşluksuz) tam-ekran fotoğraf gridi,
fotoğrafların kahraman olduğu sinematik akış, minimum metin–maksimum görsel.
**DadaMutfak'a nasıl uyarlanır:** **Keşfet** akışı ve **"En Lezzetli Videolar"**
bölümü için: tarif/yemek fotoğraflarını boşluksuz mozaik grid'de sinematik akıt;
hover'da başlık + puan belirsin. Tarif detay sayfasının hero'su da bu tam-genişlik
görsel diliyle iştah açıcı bir giriş yapabilir.

### 5. Kinfolk — https://www.kinfolk.com
**Sektör:** Yaşam tarzı / editöryal dergi
**Özgün/kaliteli yapan:** Serif+sans eşleşmiş özel tipografi sistemi, geniş
kenar boşlukları, sakin muted palet, içeriğin nefes aldığı dergi-gridi.
**DadaMutfak'a nasıl uyarlanır:** **Tipografi sistemimizin temeli** — başlıklarda
karakterli bir serif (tarif adları, "Mutfağa Giriş", püf noktası başlıkları),
gövdede okunur bir sans. **Mutfağa Giriş / Püf Noktaları / Şef dosyaları** gibi
uzun-form içerikler bu dergi-grid mantığıyla düzenlenir → "tarif sitesi"nden
"mutfak yayını"na terfi (araştırmadaki Good Food/NYT premium konumlandırma).

### 6. Cereal — https://readcereal.com
**Sektör:** Seyahat & stil editöryal dergi
**Özgün/kaliteli yapan:** Aşırı geniş beyaz alan, kısıtlı tipografi, az ama
büyük ve kaliteli görsel. "Az ama öz" disiplininin zirvesi.
**DadaMutfak'a nasıl uyarlanır:** Mevcut sitenin en büyük sorunu kalabalıklık;
Cereal disiplini **ana sayfa bölüm aralıklarına** uygulanır — her bölüm (Kategoriler,
Tariflerimiz, Şefler...) bol boşlukla ayrışır, bir ekranda her şeyi sıkıştırmak
yerine ritimli bir kaydırma deneyimi kurulur.

### 7. Epicurious — https://www.epicurious.com
**Sektör:** Büyük ölçekli tarif arşivi (30.000+ tarif)
**Özgün/kaliteli yapan:** Devasa içerik havuzunu **filtre + facet + tutarlı tarif
kartı** ile yönetilebilir kılması; arama/filtreleme birinci sınıf vatandaş.
**DadaMutfak'a nasıl uyarlanır:** Biz de çok-içerikli bir platformuz; **tarifler.html
liste/arama sayfası** için filtre paneli (mutfak, mode, süre, malzeme, diyet) +
tek tip tarif kartı (görsel + ad + puan + süre + "denendi" rozeti) sistemini
buradan modelleriz. Bizim **tarif-bulucu / bugün ne pişirsem** akışının iskeleti.

### 8. Samsung Food — https://samsungfood.com
**Sektör:** AI destekli tarif + yemek planlama uygulaması
**Özgün/kaliteli yapan:** "Ne pişirsem?"i kişiselleştirme + planlama + alışveriş
listesiyle birleştiren akıcı, sade uygulama-arayüzü; karar akışlarının net olması.
**DadaMutfak'a nasıl uyarlanır:** **Bugün Ne Pişirsem / Haftalık Dada Menü /
Menülerim** modüllerinin etkileşim modeli — adım adım seçim (porsiyon, süre,
diyet), sonra otomatik öneri + alışveriş listesi kartı. Hesap tarafı (hesabım,
kaydedilen tarifler) için uygulama-benzeri temiz panel dili.

### 9. More Nutrition — https://www.more-nutrition.de
**Sektör:** Beslenme / takviye e-ticaret (CSS Design Awards öne çıkan)
**Özgün/kaliteli yapan:** Yaratıcı ürün-staging (ürünü sahneleyen kompozit
görseller), güçlü renk-içerik eşleşmesi, bilgi-yoğun ama ferah ürün sayfaları.
**DadaMutfak'a nasıl uyarlanır:** **Besin/kalori içerikli tarif kartı** ve
**Dada Besin Rehberi** (kalori/protein/karbonhidrat/alerjen) modülü için: besin
değerlerini sıkıcı tablo yerine görsel-staging'li bilgi kartlarına çevirmek.
Diyetisyen modülünün **beslenme planı/reçete** çıktısı da bu temiz veri-görsel
diliyle PDF'e hazır tasarlanabilir.

### 10. Oatly — https://www.oatly.com
**Sektör:** Bitki bazlı içecek (cesur editöryal-ticaret marka)
**Özgün/kaliteli yapan:** Elle çizilmiş, gazete/editöryal hisli, kuralları
bilerek kıran mizahi tipografi ve layout; güçlü, akılda kalan marka sesi.
**DadaMutfak'a nasıl uyarlanır:** **Marka kişiliği ve mikro-metinler** için ilham
— boş durumlar ("henüz tarif eklemediniz"), CTA'lar, "Dada Denedi" rozetleri,
404 sayfası gibi yerlerde samimi/esprili "Dada" sesi. Ayrıca **Anadolu bitki
bazlı / sağlıklı** kategorisinin editöryal landing'i için cesur ama sıcak bir dil.

---

### ThemeForest referansları

Amaç hazır tema satın almak **değil** — layout, ana sayfa kurgusu ve modül
yerleşimi fikri çıkarmak. ThemeForest'ın yemek/tarif/restoran/gıda kategorilerinden
en çok satan, modern, iyi kurgulanmış 6 tema (HTML öncelikli; WP olanlar tasarım
kurgusu için referans).

#### 1. Chow — Recipes & Food Blog (Vasterad)
https://themeforest.net/item/chow-recipes-food-html5-template/9711524
**Tür:** Tarif & yemek blogu (HTML)
**Güçlü yanı:** Tarif-blog odaklı temiz kart gridi, kategori-renk kodlaması,
okunabilir tarif detay (malzeme listesi + adım adım) düzeni, sade tipografi.
**DadaMutfak uyarlaması:** **tarifler.html liste** ve **tarif-detay** sayfalarının
iskeleti — malzeme/yapılış bloğu yerleşimi, ilgili tarifler grid'i.
**Çakışma:** Epicurious (arşiv/kart) ile aynı yönde; Chow daha "blog ölçeğinde"
basit, Epicurious büyük-ölçek filtre tarafını tamamlıyor.

#### 2. Good Food — Recipe Magazine & Culinary Blog (cmsmasters)
https://themeforest.net/item/good-food-recipe-magazine-food-blogging-theme/20481850
**Tür:** Tarif dergisi / kültür blogu (WP — kurgu referansı)
**Güçlü yanı:** Dergi-tipi ana sayfa kurgusu, öne çıkan içerik blokları, editöryal
manşet + kategori şeritleri, güçlü görsel-başlık eşleşmesi.
**DadaMutfak uyarlaması:** **Ana sayfa bölüm kurgusu** (manşet → kategoriler →
öne çıkan tarifler → şefler → keşfet) ve **Mutfağa Giriş / Püf Noktaları** editöryal
landing'leri.
**Çakışma:** Bölüm 7'deki Kinfolk/Cereal editöryal yönüyle örtüşür — Good Food
bunun "tarif sitesine uygulanmış somut şablonu".

#### 3. Food & Cook — Multipurpose Recipe (Dahz)
https://themeforest.net/item/food-cook-multipurpose-food-recipe-wp-theme/4915630
**Tür:** Çok amaçlı tarif + shop (WP — kurgu referansı, 2.7K+ satış)
**Güçlü yanı:** Tarif + restoran menüsü + food shop'u tek temada birleştirmesi;
çoklu içerik tipini tutarlı bir sistemle yönetmesi.
**DadaMutfak uyarlaması:** Bizim de **tarif + ürün + içerik** çok-modüllü yapımız
için referans — aynı kart sisteminden tarif/ürün türetme mantığı, header'da
modüller arası geçiş (tarif ↔ ürünler ↔ keşfet) navigasyonu.
**Çakışma:** Food52 (çok-içerik tek çatı) ile aynı fikir; bu somut bir şablon hâli.

#### 4. Feedo — Restaurant & Food Delivery (BitteThemes)
https://themeforest.net/item/feedo-restaurant-food-delivery-html-template/59252323
**Tür:** Restoran & yemek teslimat (HTML, Bootstrap 5)
**Güçlü yanı:** Yeniden kullanılabilir komponent kütüphanesi, sepet/sipariş/menü
akışı, modern UI elementleri, mobil-öncelikli sipariş kurgusu.
**DadaMutfak uyarlaması:** **E-ticaret tarafı** (urunler, sepet, ödeme,
siparişiniz-alindi) için komponent ve akış referansı; **"malzemeleri sepete ekle"**
köprüsünün sipariş akışı.
**Çakışma:** Fly By Jing / Samsung Food'un sipariş-planlama akışıyla örtüşür;
Feedo daha standart e-ticaret komponent setini verir.

#### 5. Agricoma — Organic Food & Grocery (Ninetheme)
https://themeforest.net/item/agricoma-organic-food-grocery-woocommerce-theme/54560536
**Tür:** Organik gıda / market e-ticaret (WooCommerce — kurgu referansı)
**Güçlü yanı:** Grocery ürün-grid'i, kategori filtreleri, ürün kartında rozet
(indirim/organik/yeni), "evine taşı" temalı sıcak görsel dil.
**DadaMutfak uyarlaması:** **urunler.html ürün gridi + filtre** ve **"İndirimdeki
Ürünler" / "Kaliteli Ürünleri Evinize Taşıyın"** bölümleri; sağlıklı/organik
kategori rozet sistemi.
**Çakışma:** Graza/More Nutrition e-ticaret yönüyle örtüşür; Agricoma çok-ürünlü
**market gridi** ölçeğini verir (onlar tekil DTC marka).

#### 6. Foodu — Restaurant & Food Delivery (Next.js)
https://themeforest.net/search/food%20delivery
**Tür:** Yemek teslimat / dizin (Next.js HTML)
**Güçlü yanı:** Arama-öncelikli hero, filtreli liste + harita/dizin kurgusu,
kart üstü hızlı aksiyon (favori, ekle), PWA/mobil hız vurgusu.
**DadaMutfak uyarlaması:** **Tarif-bulucu / Bugün Ne Pişirsem** arama-öncelikli
hero ve filtreli sonuç listesi; **diyetisyenler.html** dizin/listeleme kurgusu
(filtre: uzmanlık, şehir + profil kartı).
**Çakışma:** Samsung Food'un arama/keşif akışıyla örtüşür; Foodu bunun
liste-dizin tarafının somut şablonu.

> **Genel not:** ThemeForest temaları Bölüm 7'deki üst-seviye ilhamın (Awwwards/
> CSS Design Awards) **uygulanabilir şablon karşılığı** — biri "estetik tavan"ı,
> diğeri "pratik iskeleti" verir. Tasarım dilini Bölüm 6–7'den, sayfa/modül
> yerleşim iskeletini bu temalardan damıtacağız.

### Ana sayfa referansları

**Yön kararı:** yapı/iskelet **editöryal-sakin**, kimlik/ses **sıcak**, domates
kırmızısı **imza aksanı**. Aşağıdaki 5 yaşayan ana sayfa, asıl problemimizi —
**farklı içerik tiplerini (tarif + rehber + sağlık + ürün) tek ana sayfada
kalabalık olmadan toplamak** — iyi çözdüğü için seçildi.

#### 1. Food52 — https://food52.com
**Ana sayfa kurgusu:** Tek büyük editöryal hero (öne çıkan tarif/yazı) →
ardından **yatay şeritler** hâlinde sıralı bölümler: "Popüler tarifler",
"Editör seçkileri", "Shop'tan öne çıkanlar", "Topluluk/Hotline". Her şerit aynı
kart sisteminden (büyük görsel + kısa başlık + üst-etiket) türüyor; içerik tipi
değişse de kart ritmi sabit kalıyor.
**DadaMutfak'a uyarlama:** Tek imzalı hero (manşet tarif/Ramazan) → "Öne çıkan
tarifler" şeridi → "Mutfağa Giriş/Püf" editöryal şerit → "Dada Shop"
ürün şeridi → "Topluluk: son eklenen kullanıcı tarifleri" şeridi.
**Çok-modülü yönetimi:** Tarif ve ürünü **ayrı sayfalara değil, aynı şerit
dilinde** yan yana koyup üst-etiketle (TARİF / ÜRÜN / REHBER) ayırması — bizim
en doğrudan modelimiz. Ticaret, içeriğin akışını bozmadan araya giriyor.

#### 2. BBC Good Food — https://www.bbcgoodfood.com
**Ana sayfa kurgusu:** Mevsimsel/güncel hero koleksiyonu → **kategori-temelli
şeritler**: "Bu akşam ne pişirsem", "Sağlıklı", "Mevsim", "Videolar",
"Koleksiyonlar". Üstte güçlü bir **mega-menü** tüm modülleri (Recipes, Health,
Inspiration, How to, Subscriptions) tek tıkla erişilir kılıyor; ana sayfa bu
yüzden her şeyi göstermek zorunda kalmıyor.
**DadaMutfak'a uyarlama:** Mega-menü = Tarifler · Mutfak Rehberi · Sağlık &
Diyetisyen · Ürünler · Ramazan. Ana sayfada her modülden **birer temsilci şerit**
(hepsi değil); derinlik menüye/iç sayfalara bırakılıyor.
**Çok-modülü yönetimi:** Ana sayfada "her şeyi sıkıştırma" yerine **modül başına
tek vitrin şeridi + güçlü navigasyon**. Sağlık/nutrisyon ayrı bir şeritle var
ama tarifin önüne geçmiyor — bizim Hesaplamalar/Diyetisyen modülü için aynı.

#### 3. Samsung Food — https://samsungfood.com
**Ana sayfa kurgusu:** Kişiselleştirme/aksiyon-öncelikli hero — "Ne pişireceğini
söyle, gerisini biz halledelim" tonunda büyük başlık + tek net aksiyon, altında
kişiye-öre öneri akışı (feed). Sade, uygulama-benzeri, az renk.
**DadaMutfak'a uyarlama:** Bu hero **birebir "Bugün Ne Pişirsem / malzemeye göre
ara"** kutumuz olur: büyük başlık + arama/malzeme girişi + tek CTA. Altında
"sana göre öneri" yerine "günün tarifleri / mevsim" akışı.
**Çok-modülü yönetimi:** Hero'yu bir **araç** (arama) yapıp içerik tiplerini
altta tek akışta toplaması — kalabalığı "önce eylem, sonra keşif" sırasıyla
çözüyor. Bizim sıcak-editöryal yönle birleşince güçlü bir açılış olur.

#### 4. NYT Cooking — https://cooking.nytimes.com
**Ana sayfa kurgusu:** Sakin, kürasyonlu editöryal manşet → "Bugünün önerileri",
"Kolay", "Popüler", "Koleksiyonlar" şeritleri; bol boşluk, güçlü serif başlık,
sınırlı renk. Görsel kahraman ama düzen gürültüsüz.
**DadaMutfak'a uyarlama:** **İskelet yön kararımızın referansı** — editöryal-sakin
yapı + sıcak imza aksanı. Şerit başlıkları serif, kartlar nefes alıyor; domates
kırmızısı sadece etiket/CTA/rozetlerde imza olarak beliriyor.
**Çok-modülü yönetimi:** Az ama kürasyonlu şerit; "her tarifi göster" yerine
"bugün için seçtiklerimiz". Çokluğu **kürasyonla** (editör seçkisi) terbiye
ediyor — bizim devasa tarif havuzunu ana sayfada ezdirmeden sunmanın yolu.

#### 5. Yemek.com — https://yemek.com
**Ana sayfa kurgusu (yerel referans):** Manşet/öne çıkan → "Editörün seçtikleri",
**video tarif şeridi**, "Listeler" (örn. "10 pratik çorba"), kategori girişleri,
**Yemek.com Mutfağı ürün** şeridi, Ramazan döneminde iftar/sahur özel blokları.
Türk kullanıcı alışkanlıklarına oturmuş çok-modüllü bir akış.
**DadaMutfak'a uyarlama:** **Liste/derleme şeridi** ("Bu akşama 10 pratik tarif")
ve **video tarif şeridi** ("En Lezzetli Videolar") doğrudan modellenebilir;
**Ramazan özel blok** kurgusu iftara/sahura-doğru için hazır şablon.
**Çok-modülü yönetimi:** İçeriği **"derleme/liste" formatına** sokarak tarif
çokluğunu sindirilebilir paketlere bölmesi (tek tek tarif yerine küratörlü liste)
— bizim geniş arşiv için iyi bir kalabalık-azaltma tekniği. Yerel + Ramazan
bağlamı bonus.

> **Ortak ders (5 örnekten):** Çok-modüllü ana sayfa = **modül başına TEK vitrin
> şeridi + tutarlı kart sistemi + güçlü navigasyon (mega-menü) + kürasyon/liste
> ile çokluğu terbiye etmek.** Derinlik ana sayfada değil iç sayfalarda. Hero ya
> editöryal manşet (NYT/Food52) ya da aksiyon kutusu (Samsung Food) olur — biz
> ikisini birleştirebiliriz: sıcak manşet görsel + içine gömülü "Bugün Ne Pişirsem"
> arama.

### Havuzdan çıkan tasarım yönü (özet)
- **Tipografi:** karakterli serif başlık + okunur sans gövde (Kinfolk/Cereal)
- **Kart sistemi:** tek kaynaktan türeyen tarif/ürün/şef/püf kartı (Epicurious/Graza)
- **Layout:** bol boşluk, ritimli bölümler, sinematik görsel gridler (Cereal/Alinea)
- **Renk:** sadeleştirilmiş palet + kategori/Ramazan için renk-blok aksanları (Omsom)
- **Etkileşim:** adım adım seçim akışları + scroll-driven anlatım (Samsung Food/Fly By Jing)
- **Marka sesi:** sıcak, esprili "Dada" kişiliği mikro-metinlerde (Oatly/Graza)
