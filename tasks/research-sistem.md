# DadaMutfak — Sistem Anlayışı & Tam Envanter

> Research fazı çıktısı · 2026-06-11
> Kaynaklar: eski site template'i (68 sayfa) · panel taslağı (191 HTML, ~24 modül) ·
> diyetisyen dokümanı · rakip analizi PDF'i (30 madde + kritik 10, patron geri bildirimli) ·
> canlı dadamutfak.com · nefisyemektarifleri.com + yemektarifleri.gzt.com ·
> v3a onaylı ana sayfa mockup'ı.
> Kardeş dosya: `tasks/workflow-fazlar.md` (faz faz tasarım sırası önerisi).

---

## 1. SENARYO & SİSTEM ANLAYIŞI

### Konumlandırma

**"Türkiye'nin yeni nesil mutfak, tarif ve sağlıklı beslenme platformu."**
Rakiplerin her biri tek alanda güçlü (Nefis → topluluk, Yemek.com → editöryal,
Diyetkolik → sağlık takibi, Kısık Ateş → akademi); DadaMutfak'ın ana fırsatı
**tarif + topluluk + sağlıklı yaşam + uzman desteği + video + alışveriş + akademi**'yi
tek çatıda birleştirmek (rakip analizi raporu sonuç bölümü).

Güven dili platformun omurgası: **Dada Denedi · Editör Onaylı · Diyetisyen Onaylı ·
Şef Tarifi · Kullanıcı Tarifi** etiket seti (PDF m10) + "kaç kişi denedi / başarı
oranı / en sık yapılan hata / editör notu / kullanıcı fotoğrafları" (PDF m30).

### Aktörler ve akışları

**1. Ziyaretçi (üye olmayan)**
- Giriş noktaları: SEO landing'leri (kolay yemek, airfryer, 100 TL altı menü...),
  arama motoru → tarif detay, ana sayfa.
- Akış: keşif (ana sayfa / kategori / koleksiyon) → arama ("ne pişirsem",
  malzemeye göre) → tarif okuma → video izleme.
- Kayıt tetikleyicileri: deftere ekleme, "Ben de Yaptım" fotoğrafı yükleme, yorum,
  takip, menü planlama, alışveriş listesi — hepsi üyelik ister; tetikleyici anında
  nazik kayıt modali.

**2. Üye (ev aşçısı — ana persona)**
- Tüketim: tarif okur, porsiyonu ayarlar, pişirme moduna geçer, malzeme
  alternatifine bakar, videoyu izler.
- Katkı: puanlar, fotoğraflı yorum yazar, **"Ben de Yaptım"** fotoğrafı yükler
  (patron m2 — güven mekanizmasının kalbi), püf noktası ekler.
- Biriktirme: **Mutfak Defteri** (kaydedilen / denenen / favori tarifler),
  haftalık menü planı, alışveriş listesi (tariften tek tık).
- Sosyal: şefleri/kullanıcıları/diyetisyenleri takip eder, bildirim alır,
  puan toplar, rozet kazanır (Dada Şefi, Haftanın Aşçısı...), liderlik
  tablosunda görünür (patron m8 + PDF m9/m25).

**3. Tarif sahibi / şef (içerik üreten üye)**
- 4 adımlı stepper ile tarif ekler (bilgi → görseller → künye+malzemeler →
  adımlar) → **editör onayına** düşer → yayınlanır veya ret nedeni ile döner.
- Profili büyür: tarif/püf sayaçları, takipçi, derece (Usta Şef vb.), rozetler.
- İhlal bildirimi mekanizması içeriklere karşı çalışır (telif/spam).

**4. Diyetisyen (uzman — ayrı doküman gereksinimleri)**
- Kayıt: ad/soyad, unvan, **diploma no**, iletişim, uzmanlık → doğrulama →
  **SEO-açık public profil** (foto, açıklama, uzmanlıklar, randevu linki,
  örnek menüler, blog yazıları).
- Panel: **danışan yönetimi** (yaş/kilo/boy/hedef/sağlık geçmişi + ilerleme) ·
  **randevu takvimi** (haftalık/aylık, otomatik hatırlatma) · **reçete/beslenme
  planı builder** (öğünler + kalori/makro otomatik hesap + diyet notları + PDF) ·
  kalori hesaplama aracı · danışanla **mesajlaşma** · anket + beslenme analizi.

**5. Danışan (diyetisyen müşterisi — üyenin alt rolü)**
- Kendi hesabından: reçetesini görüntüler/PDF indirir, diyetisyeniyle mesajlaşır,
  **kilo-ölçü takibini** girer (grafik), randevularını (mevcut+geçmiş) görür,
  yeni diyetisyenle danışmanlık talebi oluşturur.

**6. Admin / editör (bu fazın kapsamı DIŞINDA — panel sonra sıfırdan yazılacak)**
- Public tasarımı etkileyen yüzü: **onay kuyrukları** (tarif, püf, fotoğraflı
  yorum, ihlal bildirimi), etiket atama (Editör Onaylı, Dada Denedi), Günün
  Menüsü/koleksiyon kürasyonu. Public sayfalarda bu mekaniklerin durum
  göstergeleri (onay bekliyor banner'ı, ret nedeni) tasarlanmalı.

### Çekirdek değer döngüsü

```
keşif (SEO/video/arama) → tarif detay (güven sinyalleri) → dener
  → "Ben de Yaptım" foto + puan + yorum (içerik zenginleşir, güven artar)
  → deftere/menüye ekler → alışveriş listesi → Dada Shop (gelir)
  → takip + rozet + puan (geri gelme sebebi) → kendi tarifini ekler (UGC büyür)
```
Sağlık hattı bu döngüye paralel: hesaplayıcılar/testler → diyet listeleri →
diyetisyen profili → randevu → danışan paneli (kalıcı abonelik ilişkisi).

---

## 2. TAM SAYFA ENVANTERİ

> Format: **Sayfa** — amaç. *Bileşenler.*
> ✓ = v3a'da tasarlandı/onaylı. Ⓜ = eski siteden miras, Ⓟ = PDF/patron kaynaklı,
> Ⓡ = rakip karşılığı olan yeni öneri, Ⓓ = diyetisyen dokümanı.

### 2.1 Ana sayfa
- **Ana sayfa** ✓ — ONAYLI (`mockups/anasayfa-portal-v3a.html`). Tüm token,
  header/footer, mega menü (KİLİTLİ), section pattern'ları buradan türetilir.

### 2.2 Tarif çekirdeği
- **Tarif liste / arama sonuçları** Ⓜ — tüm tarif havuzunun filtrelenebilir dizini;
  arama ve kategorilerin indiği ortak ekran. *Facet filtre paneli (kategori, dünya
  mutfağı, yemek modu, süre, zorluk, beslenme: glutensiz/şekersiz/düşük kalorili/
  yüksek proteinli/diyabet dostu/çocuk/sporcu [PDF m15], bütçe [m16]), aktif filtre
  chip'leri, sıralama, r-card grid, pagination, sonuç-boş durumu.*
- **Tarif detay** Ⓜ+Ⓟ — platformun en kritik sayfası; okuma + güven + aksiyon.
  *Galeri/hero, etiketler (Dada Denedi/Editör Onaylı/Şef Tarifi...), künye
  (porsiyon/süre/zorluk/pişirme derecesi), **porsiyon ayarlı malzeme listesi**
  (2/4/6 kişilik otomatik miktar [m24]) + **malzeme ikame önerisi** (mascarpone→
  labne; m18 patron) + "alternatif tarif" bloğu (sütsüz/yumurtasız/fırınsız
  varyant linki), "malzemeleri alışveriş listesine ekle" (m4), **"bu tarifte
  kullanılan ürünler" → Dada Shop** (m19), adım kartları (süre+görsel+checkbox),
  "Pişirme Moduna Geç" CTA (m23), besin değeri tablosu (porsiyon başı kalori/
  protein/karb/yağ [m7] — 8 hücreli miras tablo), audio player (miras: hız+atlama),
  video embed, yazar kutusu (derece+takip), **"Ben de Yaptım" fotoğraf duvarı**
  (m2 patron) + yükleme CTA'sı, yıldız dağılım grafiği, fotoğraflı yorum formu +
  nested yorum listesi (beğeni/bildir), "en sık yapılan hata / editör notu" kutusu
  (m30), hashtag'ler, sosyal paylaşım, benzer tarifler rayı, breadcrumb, sticky
  aksiyon barı (kaydet/yaptım/eline sağlık/paylaş).*
- **Kategori sayfası** Ⓜ — tek kategorinin vitrini (çorbalar, tatlılar...).
  *Renk-blok kategori hero'su (Omsom dili), açıklama, alt-kategoriler, filtreli grid.*
- **Dünya mutfağı / yöresel sayfası** Ⓜ — mutfak başına billboard kimlik
  (Karadeniz, İtalyan...). *Kategori sayfası varyantı + yöresel hikâye bloğu (GZT dersi).*
- **Koleksiyon / derleme sayfası** Ⓟ+Ⓡ — küratörlü tarif paketleri ("5 Malzemeli
  Tarifler", "15 Dakikalık", "Misafir Menüsü" [m27]; Nefis'in "En Popüler 40..."
  modeli). *Koleksiyon hero, editör notu, sıralı tarif kartları, paylaşım.*
- **Koleksiyonlar dizini** Ⓡ — tüm derlemelerin listesi. *Koleksiyon kartı grid'i.*
- **SEO landing şablonu** Ⓟ — kalıcı arama-trafiği sayfaları: Ekonomik Tarifler,
  100 TL Altı Menü, Öğrenci Mutfağı, Az Malzemeli, Airfryer, Pratik Akşam
  Yemekleri, Diyet Tatlılar, Çocuk Menüleri (m16/m22). *Açıklamalı başlık + SSS
  bloğu + filtreli grid; tek şablon × N içerik.*
- **Mevsim / özel gün sayfaları** Ⓟ — Bayram Sofraları, Okul Beslenmesi, Yaz
  Yemekleri, Kış Çorbaları (m12). *SEO landing varyantı, sezon görselli.*
- **Günün Menüsü** Ⓟ — her gün yenilenen çorba+ana+yardımcı+tatlı/salata önerisi
  (m11, kritik-10 #7); Ramazan dışında yıl boyu işleyen günlük menü.
  *Tarih başlığı, 4'lü menü kartı seti, "menüyü deftere ekle / alışveriş listesi",
  geçmiş günler arşivi.*
- **Haftalık Menü Planlayıcı** Ⓟ — kullanıcının 7 gün × öğün planı (m5,
  kritik-10 #3; Samsung Food modeli). *Gün×öğün grid'i, tarif arama/sürükleme,
  kişi sayısı, otomatik alışveriş listesi çıktısı, yazdır. Eski "menülerim"in
  modern hâli.*
- **Tarif ekle / düzenle** Ⓜ — 4 adımlı stepper: ①bilgi (başlık+açıklama+ipuçları
  sidebar'ı) ②görseller (kapak+galeri) ③künye+malzemeler (porsiyon/zorluk/pişirme
  derecesi + dinamik malzeme satırları: miktar+birim+malzeme) ④adımlar (görsel
  max 3 + süre + açıklama) → onaya gönder. *Form kiti, upload dropzone, taslak/
  onay-bekliyor/ret durum banner'ları.*
- **Tarif onay durumu** Ⓜ — kullanıcıya kendi içeriğinin moderasyon durumu;
  ret nedeni gösterimi.
- **Adım Adım Pişirme Modu** Ⓟ — mobilde ekran kapanmadan, tam ekran adım akışı
  (m23, kritik-10 #6). *Büyük adım kartı, süre sayacı, malzeme işaretleme,
  ilerleme noktaları, önceki/sonraki.*
- **Yazdır görünümü** Ⓜ — sade print şablonu (tarif + menü + alışveriş listesi).

### 2.3 Keşif araçları
- **Global arama sonuç sayfası** Ⓡ — header aramasının indiği, içerik tipleri
  karışık sonuç ekranı (tarif + püf + video + ürün + sözlük terimi sekmeleri/
  blokları; BBC Good Food / NYT site search modeli). *Tip sekmeli sonuç düzeni,
  r-card/vid-card/p-card karışık kullanım, sonuç-boş durumu, arama autocomplete
  dropdown'ı. → F2.*
- **Bugün Ne Pişirsem** Ⓜ — seçim akışıyla öneri (kategori/tempo/diyet seçimi →
  sonuç listesi). *Wizard pattern, seçim kartları, activated-state, sonuç grid'i.*
- **Tarif Bulucu (malzemeye göre)** Ⓜ — "evde ne varsa" araması. *Malzeme
  multi-select (chip+autocomplete), kalori aralığı, beslenme filtreleri, sonuç
  grid'i; israf-azaltan "artık malzemeyle tarif" vurgusu (m17).*
- **Keşfet + Keşfet detay** Ⓜ — editöryal akış (mekanlar, gurme lezzet,
  etkinlik). *v3a disc-card grid'i + uzun-form detay şablonu.*

### 2.4 Video Mutfağı ⭐ (PDF m13 — PATRONA GÖRE EN ÖNEMLİ)
- **Video hub ("İzle & Pişir")** — tüm video içeriğin vitrini. *Öne çıkan video,
  seri rayları, vid-card grid'i, kategori filtreleri.*
- **Video serisi sayfası** — seri başına landing: "10 Dakikada Yemekler",
  "Öğrenci Mutfağı", "Airfryer Tarifleri", "Diyetisyenle Sağlıklı Tabak"
  (tek şablon × N seri). *Seri kapağı, bölüm listesi, ilerleme, seri aboneliği.*
- **Video izleme / tarif-video detayı** — player + bağlı tarif kartı + sıradaki
  bölüm. *Yatay player şablonu, "tarife git" köprüsü, yorumlar.*
- **Dikey kısa video görünümü (Dada Akış)** Ⓟ — 15-30 sn 9:16 Reels/Shorts
  deneyimi (m28). *Tam ekran dikey player, sağda beğen/kaydet/paylaş/tarife-git
  overlay'i, yukarı kaydırma akışı, paylaşılabilir tarif kartı.*

### 2.5 Mutfak Rehberi & Akademi
- **Püf Noktaları liste + detay** Ⓜ — UGC kısa içerik. *Puf-card grid, detayda
  yorum+paylaşım; kullanıcı ekleme/düzenleme formu + onay durumu.*
- **Mutfağa Giriş liste + detay** Ⓜ — yeni başlayan eğitim içeriği. *Kategori
  grid'i, uzun-form makale şablonu (Kinfolk dergi dili).*
- **Sözlük (A-Z / kategori / harf / terim detay)** Ⓜ — mutfak terimleri referansı.
  *A-Z harf bar'ı, kategori tab'ları, terim kartı, detayda görsel+ilgili videolar.
  Tek şablon ailesi, 4 görünüm.*
- **Ölçü Birimleri** Ⓜ — dönüştürücü araç. *Dönüşüm tablosu + mini hesaplayıcı
  (1 su bardağı = ? gr).*
- **Dada Akademi landing** Ⓟ — "yakında" rozetli eğitim modülü vitrini: temel
  mutfak, bıçak teknikleri, soslar, hamur işleri, şeflik başlangıç (m14); canlı
  atölye/workshop duyuruları (m26, ileri faz). *Ders/kurs kartları, seviye
  rozetleri, kayıt CTA.*
- **Teknik blog / rehber yazıları** Ⓡ — "10 et pişirme yöntemi" tarzı derinlik
  içeriği (Nefis 50+ makale dersi). *Mutfağa Giriş makale şablonunu paylaşır.*

### 2.6 Sağlık & Hesaplamalar
- **Hesaplamalar hub** Ⓜ — 6 aracın vitrini. *v3a calc-card grid'i.*
- **Hesaplayıcı şablonu ×5** Ⓜ — besin kalori, BMI, bazal metabolizma, vücut
  tipi (+ ölçü birimleri rehberle paylaşımlı). *Form + sonuç kartı (gösterge/
  gauge), sonuçtan ilgili tariflere/diyet listelerine köprü.*
- **Testler + test detay** Ⓜ — eğlence/kişiselleştirme quiz'leri. *Quiz akışı
  (soru kartı, görselli seçenek, ilerleme), sonuç ekranı + ilgili tarifler.*
- **Diyet listeleri / programlar** Ⓟ — hedefe göre beslenme planları, su takibi
  ve aralıklı oruç sayacı tanıtımı (m6; takip araçları mobil app'in işi, web'de
  tanıtım+plan içerikleri). *Program kartları, hedef seçimi, örnek plan şablonu.*
- **Besin kütüphanesi** Ⓡ — besin başına kalori/makro/alerjen referans sayfası
  ("Kaşar peyniri: kalori, kullanım, alternatifleri"; Nefis 100+ kalori sayfası
  dersi; "Dada Besin Rehberi" araştırma fikri). *Besin arama, besin satırı/tablo,
  besin detay şablonu, ilgili tarifler.*

### 2.7 Diyetisyen Modülü Ⓓ
**Public taraf:**
- **Diyetisyen Ol — başvuru/kayıt sayfası** — uzmanın platforma katılım formu
  (doküman başlık 1): ad/soyad, unvan, **diploma no (doğrulamalı)**, iletişim,
  uzmanlık alanları; başvuru-alındı/inceleme durumu ekranı. *Form kiti +
  durum banner'ı. → F12a.*
- **Diyetisyenler dizini** — uzman bulma. *Uzman kartı (foto+unvan+uzmanlık+puan),
  filtre (uzmanlık, şehir, online/yüz yüze), arama.*
- **Diyetisyen public profili** — SEO-açık tanıtım sayfası. *Profil hero
  (doğrulama rozeti), uzmanlıklar, hizmetler/ücret, örnek menüler, blog yazıları,
  danışan yorumları, "Randevu Al" + "Mesaj Gönder" CTA.*
- **Randevu alma akışı** — takvim/slot seçici + talep formu + onay ekranı.

**Diyetisyen paneli (app-shell — public siteden ayrı dil):**
- **Dashboard** — günün randevuları, danışan özetleri, mesajlar.
- **Danışan listesi + danışan dosyası** — kayıt formu (yaş/kilo/boy/hedef/sağlık
  geçmişi), ilerleme grafiği, geçmiş reçeteler, notlar, anket sonuçları,
  beslenme analizi.
- **Randevu takvimi** — haftalık/aylık görünüm, slot yönetimi, hatırlatmalar.
- **Reçete / beslenme planı builder** — öğün blokları (kahvaltı/ara/öğle/akşam),
  tarif/besin ekleme, otomatik kalori+makro toplamı, diyet notları, PDF çıktı.
- **Mesajlaşma** — danışan bazlı sohbet.

**Danışan paneli (üye hesabının sekmesi/alt alanı):**
- **Reçetem** — aktif plan görüntüleme + PDF indirme.
- **Ölçüm takibim** — kilo/ölçü girişi + ilerleme grafiği.
- **Randevularım** — mevcut + geçmiş.
- **Mesajlarım** — diyetisyenle yazışma.
- **Anket doldurma ekranı** — diyetisyenin gönderdiği beslenme anketi (doküman
  ek notu); sonuçları diyetisyen panelindeki danışan dosyasına düşer.

### 2.8 Dada Shop ⭐ (patron onaylı: "aşırı iyi")
- **Shop vitrini** — kampanya bandı + kategori girişleri + öne çıkan/indirimli
  ürün rayları. *v3a p-card + shop section dili.*
- **Ürün liste** — kategori/fiyat/puan filtreli grid (18 kategori mirası).
- **Ürün detay** — galeri, varyant/adet seçici, rozetler (indirim/organik/yeni),
  besin bilgisi, yorumlar, **"bu ürünle yapılan tarifler" rayı** (tarif→ürün
  köprüsünün karşı ucu, m19).
- **Sepet** — satırlar (adet/sil), özet kutusu, kupon alanı.
- **Ödeme (checkout)** — adres + ödeme yöntemi + kart adımları (stepper), KVKK/
  mesafeli satış onayları.
- **Sipariş alındı** — başarı ekranı + durum timeline'ı; fatura/yazdır görünümü.
- **Alışveriş listem** Ⓟ — tariften/planlayıcıdan otomatik derlenen liste
  (m4, kritik-10 #2): *malzeme işaretleme, ürün eşleşmesi varsa "Dada Shop'tan
  ekle", yazdır/paylaş. "Tarif → liste → sepet" zincirinin kapanışı.*
- **Hesabım — Siparişlerim** — geçmiş siparişler + durum.

### 2.9 Topluluk & Hesap
- **Giriş / Kayıt / Şifremi unuttum** Ⓜ — auth ailesi. *Auth kart layout'u,
  sosyal login, KVKK onayları.*
- **Auth ara ekranları** Ⓡ — e-posta doğrulama ("mail gönderildi" + doğrulandı/
  link geçersiz), yeni şifre belirleme; auth kart şablonunun varyantları. *→ F6.*
- **Onboarding / hoş geldin akışı** Ⓡ — ilk kayıt sonrası 2-3 adımlık tercih
  seçimi: beslenme tercihi (vegan/glutensiz...), alerjiler, ilgi kategorileri,
  takip önerileri (Samsung Food / Mealime modeli; panel taslağındaki
  kişiselleştirme/yapay-zeka tohumunun veri girişi). *Wizard pattern (F4) +
  seçim chip'leri, atlanabilir. → F6.*
- **Hesabım (ayarlar)** Ⓜ — profil bilgileri, bildirim tercihleri, gizlilik,
  hesap silme. *Section'lı ayar sayfası, toggle'lar.*
- **Public kullanıcı profili — "Mutfak Defteri"** Ⓟ⭐ (m8 patron: detaylandır) —
  kullanıcının vitrini ve kişisel arşivi. *Profil hero (banner+avatar+derece+
  takipçi/tarif/püf sayaçları+puan), sekmeler: Tarifleri / Püf Noktaları /
  Kaydettikleri / Denedikleri ("Ben de Yaptım" arşivi) / Favoriler / Menüleri,
  rozet vitrini (Dada Şefi, Haftanın Aşçısı, Dada Denedi...), takip et butonu,
  takipçi/takip edilen listeleri. Kendi profilinde ek: onay bekleyen içerikler,
  puan geçmişi.*
- **Rozetler & Liderlik** Ⓟ — oyunlaştırma vitrini (m9): rozet kataloğu + nasıl
  kazanılır, haftalık/aylık liderlik tablosu (En Çok Denenen Tarif, Haftanın
  Aşçısı). *Liderlik tablosu, rozet kartları.*
- **Şefler dizini + şef profili** Ⓜ — öne çıkan içerik üreticileri; şef profili =
  kullanıcı profili şablonunun rozetli varyantı. *"Şef Ol" CTA'sı kayda köprü.*
- **Bildirimler** Ⓜ — takip edilenlerin aktiviteleri, onay sonuçları, randevu
  hatırlatmaları. *Bildirim satırı listesi + temizle; header dropdown'ı.*
- **Premium üyelik tanıtım sayfası** Ⓟ — **[İLERİ FAZ]** reklamsız kullanım,
  kişisel menü planı, diyetisyen içerikleri, özel koleksiyonlar (PDF m29);
  plan karşılaştırma tablosu. Tasarım sırası premium kararı netleşince.

### 2.10 Ramazan & sezonluk
- **İftara Doğru / Sahura Doğru** Ⓜ — Ramazan landing'leri (geri sayım, günün
  iftar menüsü, koleksiyon rayları). *Koleksiyon şablonu + renk-blok tema.*
- **Ramazan menü detay** Ⓜ — günlük iftar/sahur menüsü (Günün Menüsü şablonunun
  temalı varyantı).

### 2.11 Kurumsal & yasal (~15 sayfa, 2-3 şablon)
- **Hakkımızda · İletişim · Künye · SSS (accordion) · Reklam Vermek ·
  Sponsorluk · Öneri ve Şikayet** Ⓜ — kurumsal aile; iletişim/öneri formları
  form kitini kullanır.
- **Yasal metin şablonu × ~10** Ⓜ — KVKK, aydınlatma, bilgilendirme, gizlilik+
  çerez, üyelik, kullanım koşulları, mesafeli satış, iptal-iade, ödeme-teslimat.
  *Tek şablon: içindekiler nav'ı + metin gövdesi.*
- **İhlal bildirimi** Ⓜ — içerik şikâyet formu (telif/spam/uygunsuz).
- **Topluluk / içerik yayın kuralları** Ⓡ — UGC platform standardı (Cookpad/
  Allrecipes community guidelines): tarif/foto/yorum yayın kuralları, onay
  kriterleri; tarif ekleme stepper'ından ve ihlal formundan linklenir.
  *Yasal metin şablonunu paylaşır. → F13.*
- **Mobil app tanıtım landing'i** Ⓟ — **[PATRON KARARINA BAĞLI]** uygulama içi
  özelliklerin tanıtımı: favoriler, alışveriş listesi, tarif defteri, haftalık
  menü, bildirim, çevrimdışı tarif (PDF m3 — "uygulama özellikleri
  detaylandırılmıyor" eleştirisinin cevabı). *App bandı (v3a) görselleri +
  özellik vitrini + store rozetleri. → F13 (karar onaylanırsa).*

### 2.12 Yardımcı ekranlar
- **Hata ailesi: 404 / 500 / bakım modu** Ⓡ — tek şablon ailesi, Oatly-sesli
  esprili marka kişiliği ("tarif bulunamadı, ama şuna ne dersin" + öneri rayı;
  500/bakım: sade varyant, öneri rayı yok). *→ F13.*
- **Arama sonucu boş / filtre boş durumları** — her liste sayfasının kendi boş
  durumu (kendi fazında tasarlanır, sona bırakılmaz).
- **Çerez/izin, geri bildirim modali** ✓ — v3a'da mevcut.

**Özet sayım:** ~60-65 ayrı ekran; şablon paylaşımıyla (~hesaplayıcı ×5, yasal
×10+, sözlük ×4, seri ×N, auth ara ekranları, hata ailesi) **~40 özgün tasarım**.

> **Açık soru (Beyar/patron):** topbar'da dil seçici (EN) var — EN içerik/sayfa
> stratejisi tanımsız. Mockup fazında sayfa üretilmiyor; karar stack fazından
> önce netleşmeli (tam çeviri mi, yalnız arayüz mü, EN yok mu).

---

## 3. BİLEŞEN ENVANTERİ

### 3.1 v3a'da VAR (yeniden kullanılacak — yeniden tasarlanmaz)

| Grup | Bileşenler |
|---|---|
| İskelet | topbar · tek-kat header · **mega menü (KİLİTLİ)** · koyu footer · mobil drawer + bottom-nav · çerez banner'ı · geri bildirim modali |
| Section pattern | section header (eyebrow + h2 + lead + "Tamamını Gör" + prev/next okları) · slider track (scroll-snap + drag + ok) · fixed-bg parallax band (Günün Tarifi/app bandı) · koyu tab'lı section (Mutfak Sırları) · findbar |
| Kartlar | r-card (tarif: görsel+rozet+denendi+başlık+süre/zorluk/porsiyon+yazar+puan) · p-card (ürün) · vid-card · disc-card (keşfet 16:10) · cat-card · chef-card · calc-card · puf-card (glass) · feat-big |
| Mikro | m-types medya rozetleri (video/ses/galeri) · r-chip etiket · see-all · r-save/p-fav kaydet butonu · r-meta satırı · r-author · r-rate · eyebrow · stats |
| Davranış | query param'lar (ss/fp/hdr/dd/drawer/cc/fb) · header şeffaf↔katı · arama tab'ları · drag-scroll |

### 3.2 YENİ tasarlanacak bileşenler (hangi fazda doğduğu → workflow-fazlar.md)

| Grup | Bileşen | İlk kullanım |
|---|---|---|
| Navigasyon | breadcrumb · pagination · A-Z harf bar'ı · içindekiler nav'ı (yasal/makale) | tarif detay / liste / sözlük |
| Liste & filtre | facet filtre paneli · aktif filtre chip'leri · sıralama dropdown'ı · sonuç-boş durumu | tarif liste |
| Tarif detayı | porsiyon stepper'ı · malzeme satırı + **ikame popover'ı** · adım kartı (süre+checkbox) · besin değeri tablosu · yıldız dağılım grafiği · sticky aksiyon barı · "editör notu / sık yapılan hata" kutusu · audio player | tarif detay |
| Sosyal kanıt | fotoğraflı yorum kartı · nested yorum dizisi · **"Ben de Yaptım" foto duvarı (masonry) + yükleme akışı** · etiket seti (Dada Denedi/Editör Onaylı/Şef Tarifi/Diyetisyen Onaylı/Kullanıcı Tarifi) | tarif detay |
| Form | form kiti (input/select/textarea/upload dropzone/dinamik satır) · yatay form stepper'ı · durum banner'ları (taslak/onayda/ret) · auth kart layout'u | tarif ekle / auth |
| Video | yatay player çerçevesi · seri rayı + seri kartı · **dikey 9:16 player overlay'i** (beğen/kaydet/tarife git) · bölüm listesi | video mutfağı |
| Keşif & plan | wizard/adım seçim akışı · malzeme multi-select (chip+autocomplete) · haftalık plan grid'i (gün×öğün) · günün menüsü kart seti | ne pişirsem / planlayıcı |
| Profil & oyunlaştırma | profil hero (banner+sayaçlar) · sekmeli içerik alanı · rozet vitrini/kartı · liderlik tablosu · takipçi listesi · bildirim satırı · puan göstergesi | mutfak defteri |
| Sağlık | hesaplayıcı form + sonuç kartı (gauge) · quiz akışı (soru kartı+ilerleme) · besin satırı/tablosu · program kartı · ölçüm grafiği | sağlık / diyetisyen |
| Diyetisyen panel | app shell (sidebar'lı) · stat kartı · veri tablosu · takvim görünümü + slot seçici · öğün-blok builder · makro progress bar'ı · chat balonu | diyetisyen modülü |
| Shop | ürün galerisi · varyant/adet seçici · sepet satırı · sipariş özeti kutusu · checkout stepper'ı · timeline (sipariş durumu) · işaretlenebilir alışveriş listesi | shop |
| Genel | accordion (SSS) · toast/bildirim · modal aileleri (kayıt tetikleyici, randevu) · empty state seti (Oatly-sesli) · pişirme modu tam ekran şablonu · print şablonu · hata sayfası şablonu (404/500/bakım) | ilgili fazlar |
| Panel taslağı public yüzü | kampanya popup'ı (popup yönetiminin önyüzü) · bülten kayıt formu (footer — üyeler/E-Bülten modülünün önyüzü) · reklam alanı şablonları (728×90, kare — reklam yönetiminin önyüzü; **patron kararına bağlı**, m29 "reklamsız premium" reklam varlığını ima ediyor) | footer / tarif detay / liste |

---

## 4. MODÜL LİSTESİ

### 4.1 Mirastan devralınanlar (eski site — hepsi yeniden tasarlanarak)

| Modül | Not |
|---|---|
| Tarifler (UGC çekirdek) | medya: video+ses+galeri; taksonomiler: kategori, grup, dünya mutfağı, yemek modu; flag'ler: vegan/vejetaryen/glutensiz/diyet/acılı |
| Tarif ekleme + editör onayı | 4 adımlı stepper + ret nedeni + ihlal bildirimi |
| Bugün Ne Pişirsem + Tarif Bulucu | akıllı öneri ikilisi |
| Püf Noktaları (UGC) | kullanıcı ekleyebilir, onaylı |
| Mutfağa Giriş · Sözlük · Ölçü Birimleri | rehber/referans üçlüsü |
| Keşfet | editöryal (mekan/gurme) |
| Testler · Hesaplamalar (5 araç) | eğlence + sağlık araçları |
| Şefler · Kullanıcı profili · Takip · Bildirim | topluluk temeli |
| Menülerim | → Haftalık Menü Planlayıcı'ya evrilir |
| Ramazan (iftara/sahura doğru + menüler) | sezonluk |
| Dada Shop (ürün→sepet→ödeme→sipariş) | uçtan uca akış mirasta tam |
| Kurumsal + ~10 yasal sayfa | şablonlaşır |

### 4.2 Panel taslağından çıkan modüller (taslak = fikir kaynağı, kesin referans DEĞİL)

Tarif yönetimi (malzeme + malzeme kategorileri + ölçü birim tipleri + tarif
grupları + dünya mutfakları + yemek modları + tarif tipleri + sponsorlu tarif +
hatırlatma metni) · E-commerce (ürün/stok/sipariş/kupon/kargo) · Üyeler (rol/
seviye/yasaklama) · Yazarlar · Keşfet koleksiyonları · Püf · Mutfağa Giriş ·
Ramazan · Sözlük · Testler · Slider · Popup · Reklam yönetimi · Menü yönetimi ·
Sayfa tanımları · Form yönetimi · Raporlar + site istatistikleri · Log · Genel
ayarlar · **yapay-zeka** (tarif öneri motoru, içerik sınıflandırma, spam tespiti
— taslakta tohum olarak var, ileride değerlendirilebilir).

### 4.3 Panel taslağında OLMAYAN — bizim eklememiz gerekenler (admin panel sıfırdan yazılırken)

- **Diyetisyen modülü tam paneli**: diyetisyen doğrulama (diploma), danışan,
  randevu, reçete, mesajlaşma, anket, beslenme analizi yönetimi
- **Yorum & puanlama moderasyonu** (fotoğraflı yorum onayı dahil — m2'nin arka yüzü)
- **"Ben de Yaptım" fotoğraf akışı moderasyonu**
- **Rozet / puan / liderlik yönetimi** (kural tanımları, manuel rozet atama)
- **Video & seri yönetimi** (seri tanımı, bölüm sırası, dikey video)
- **Koleksiyon / derleme + SEO landing yönetimi**
- **Günün Menüsü kürasyonu** (günlük 4'lü menü planlama takvimi)
- **Malzeme ikame (alternatif) yönetimi** — malzeme bazında ikame eşleştirmeleri
  + tarif bazında alternatif tarif bağlama
- **Besin kütüphanesi yönetimi** (besin + makro değerleri — tarif besin
  hesabının veri kaynağı)
- **Alışveriş listesi / ürün-malzeme eşleştirme** (tarif→Shop köprüsünün verisi)
- **Bildirim yönetimi** · **Akademi içerik/etkinlik yönetimi** ·
  **Premium üyelik** (ileri faz, m29)

### 4.4 PDF + patron geri bildirimi kaynaklı modüller/özellikler

| Özellik | Kaynak | Öncelik |
|---|---|---|
| "Ben de Yaptım" kullanıcı fotoğraf akışı | m2 + patron | Çok yüksek ⭐ |
| Video tarif serileri + dikey kısa video | m13 + m28 + patron **EN ÖNEMLİ** | Çok yüksek ⭐ |
| Kullanıcı profili "Mutfak Defteri" + puan + rozet + liderlik | m8 + m9 + m25 + patron | Yüksek ⭐ |
| Malzeme ikamesi + alternatif tarif önerisi | m18 + patron örnekleri | Yüksek ⭐ |
| Dada Shop + tarif→ürün köprüsü + alışveriş listesi | patron "aşırı iyi" + m4 + m19 | Çok yüksek ⭐ |
| Haftalık menü planlayıcı | m5 (kritik-10 #3) | Çok yüksek |
| Tarif bazlı besin değeri (porsiyon başı makro) | m7 (kritik-10 #4) | Çok yüksek |
| Porsiyon dönüştürme (2/4/6) | m24 (kritik-10 #5) | Yüksek |
| Adım adım pişirme modu | m23 (kritik-10 #6) | Yüksek |
| Günün Menüsü | m11 (kritik-10 #7) | Yüksek |
| Güven/etiket sistemi (Dada Denedi, Editör Onaylı...) | m1 + m10 + m30 | Çok yüksek |
| Beslenme + bütçe filtreleri | m15 + m16 | Yüksek |
| SEO landing mimarisi | m22 (kritik-10 #10) | Çok yüksek |
| Mevsimsel/özel gün sayfaları | m12 | Yüksek |
| İsraf azaltan öneriler (artık malzeme) | m17 | Yüksek |
| Diyet listeleri + sağlık takip tanıtımı | m6 (kritik-10 #8) | Çok yüksek |
| Dada Akademi + canlı workshop | m14 + m26 | Yüksek / orta |
| Premium üyelik | m29 | Orta (ileri faz) |

### 4.5 Önerilen yeni modüller (rakip karşılığı olan — fantezi yok)

| Öneri | Rakip karşılığı / dayanak |
|---|---|
| Besin kütüphanesi ("Dada Besin Rehberi") | Nefis'in 100+ kalori sayfası; araştırma dokümanındaki Dada Besin Rehberi fikri |
| Teknik rehber yazıları (et/balık pişirme yöntemleri...) | Nefis 50+ makale; GZT editöryal blog — Mutfağa Giriş şablonunu paylaşır |
| Koleksiyon/derleme sistemi | Nefis "En Popüler 40...", Yemek.com "Listeler" |
| Yöresel mutfak hikâyeleştirme | GZT'nin yöresel vurgusu (260 yöresel tarif) — dünya mutfakları sayfasının yerli yüzü |
| Tarif defteri web+app senkron vurgusu | GZT Lokma + Nefis Defterim — Mutfak Defteri'nin pazarlama yüzü |

---

## 5. RENK / TİPOGRAFİ / TUTARLILIK NOTU (bağlayıcı)

- **Kanonik baz: `mockups/anasayfa-portal-v3a.html`.** Her yeni sayfa token
  bloğunu, header'ı, footer'ı ve mega menüyü oradan **birebir** alır; lokal
  değişiklik yasak. **Mega menü kilitli, ana sayfa onaylı — veridir.**
- Token'lar: `--tomato #E14827` (+dark/deep/tint) · `--slate #211E16` ·
  `--green #3BB77E` (sağlık/diyetisyen aksanı) · `--yellow #FAC045` (puan) ·
  `--cream #EFE5D3` · `--bg #f9f9f9` · radius sm8/md12/lg16/xl24 · 3 seviye
  gölge · wrap 1240px. Referans: `tasks/brand-tokens.md`.
- **Gilroy-Medium** tek yüz (sentetik bold) · **FontAwesome 6.5.2**, emoji yok.
- Radius disiplini: kart/panel `--radius-lg` · buton/kontrol `--radius-md` ·
  etiket `--radius-sm` · pill yok, hardcoded radius yok.
- Görsel: kare/oranlı = `div + background-image cover` (logo istisna), 2x retina
  çarpma yok, Unsplash sıcak grade `&exp=7&gam=6&sat=-9&high=8&vib=5`,
  overlay 0.3–0.4.
- Yeni bileşenler mevcut kart anatomisinden türetilir (ürün kartı ↔ tarif kartı
  aynı aile); section'lar ortak section-header pattern'ını kullanır.
- **frontend-design skill zorunlu**, plan onaylanmadan implement yok; her
  sayfa SS döngüsüyle onaylanmadan sonrakine geçilmez.
- Diyetisyen paneli app-shell'i ayrı bir layout dili kurar ama aynı token
  setinden beslenir (yeşil aksan ağırlıklı).
