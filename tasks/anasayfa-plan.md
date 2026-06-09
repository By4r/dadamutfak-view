# DadaMutfak — Ana Sayfa Planı (yeni yön)

> Referans kimlik: `tasks/brand-tokens.md` (birebir kurumsal — kilitli).
> Modül envanteri: `research.md`. Bu dosya **yapı + gerekçe**; kod yok.
> Build aşamasında **frontend-design skill ZORUNLU**, plan onaylanmadan implement yok.

---

## 0. Tasarım Yaklaşımı (önceki redlerden ders)

Önceki 5 aday (masa/modern/myrecipes/uzman/premium) **"çok hazır/şablon/yapay"**
diye reddedildi. Bu turun farkı:

1. **Kurumsal kimliği birebir uygula** (patron talebi) — uydurma palet/font yok;
   Gilroy + domates `#E14827` + slate `#253D4E` + FontAwesome 6.5.2 + gerçek logo.
2. **Yerli içerik sitesi kurgusu** referans alınır (yemek.com / GZT yemektarifleri
   / Lokma) — "editöryal-lüks premium" denemesi değil, **işlevsel-yoğun-Türk yemek
   portalı** dili. Yoğun ama düzenli; kart/grid baskın; arama & keşif birinci sınıf.
3. **Modernlik barı:** gaviaworks.com — boşluk ritmi, kart kenar/gölge disiplini,
   mikro etkileşim kalitesi buradan (içerik yoğunluğunu kaybetmeden).

**Hedef his:** "DadaMutfak'ın kendi sitesi, ama 2026 — temiz, hızlı taranabilir,
güven veren." Aesop/Kinfolk minimalizmi DEĞİL; canlı, içerik-dolu ama derli toplu.

---

## 1. Referans Sitelerin Ana Sayfa Kurgusu (çıkarım)

| Site | Ana sayfa mantığı | DadaMutfak'a alınacak |
|---|---|---|
| **yemek.com** | Üstte güçlü arama + kategori şeritleri; "editörün seçtikleri" + popüler tarifler grid'i; video şeridi; sağlıklı/beslenme köşesi; bol kart. | Kategori şeridi, popüler/editör grid ayrımı, video bloğu, sağlık köşesi. |
| **GZT yemektarifleri** | Manşet/öne çıkan tarif + altında akış; pratik "ne pişirsem" yönlendirmesi; kategori navigasyonu güçlü. | Manşet feature + akış; kategori navigasyonu; pratik öneri girişi. |
| **Lokma (GZT)** | Daha editöryal, görsel-öncelikli kart akışı, sıcak yemek kültürü tonu. | Görsel-öncelikli kart dili, sıcak editöryal başlıklar. |
| **gaviaworks.com** | (modernlik barı) — disiplinli boşluk, net grid, ince etkileşim. | Boşluk ritmi, kart gölge/kenar disiplini, hover mikro-etkileşim. |

---

## 2. Mevcut Ana Sayfa Bölümleri (orijinal index.html — gerçek)

Kategoriler · Malzemeye Göre Tarif Ara · Tariflerimiz · Mutfağa Giriş · Şefler ·
Keşfet · Mobil Uygulama CTA · Püf Noktaları · En Lezzetli Videolar · Ürünler /
İndirimdeki Ürünler · Görüş Bildir / İletişim. → Yeni kurguda bunlar korunur,
sıralanır, modülerleştirilir; Sağlık/Diyetisyen ve Ramazan güçlendirilir.

---

## 3. Yeni Ana Sayfa — Bölüm Bölüm Plan

Sıralama, kullanıcı akışını "keşfet → pişir → öğren → sağlık → al → topluluk"
hattında kurar.

### 3.0 Header (sticky)
- **İçerik:** gerçek `logo-colored.png` (sol, ~150px) · ana nav (Tarifler ·
  Bugün Ne Pişirsem · Mutfak Rehberi · Sağlık · Ürünler · Ramazan) · arama
  ikonu · giriş/kayıt · sepet.
- **Referans:** yemek.com üst bar (arama öne çıkar) + gaviaworks sadelik.
- **Kimlik:** Gilroy nav; aktif/hover = domates `#E14827`; ayraç `#ECECEC`;
  zemin beyaz. FontAwesome ikonlar (arama, kullanıcı, sepet).
- **Gerekçe:** çok-modüllü platformda navigasyon birinci sınıf olmalı; sticky =
  uzun ana sayfada her an erişim.

### 3.1 Hero — "Bugün ne pişirsem?" odaklı arama
- **İçerik:** kısa sıcak başlık (Gilroy ExtraBold, slate) + büyük arama kutusu
  (tarif adı / malzeme) + hızlı çip'ler (popüler kategoriler / "evde ne var?").
  Sağda/arkada gerçek yemek görseli (`div + bg-image cover center`).
- **Referans:** GZT manşet + SuperCook/yemek.com arama-öncelikli giriş.
- **Kimlik:** arama CTA domates; çipler nötr + hover domates; overlay opacity
  0.3–0.4 (kural).
- **Gerekçe:** research'te "arama & keşif birinci sınıf" — hero'yu dekoratif
  değil **fonksiyonel** yapar; markanın "denenmiş tarif bul" vaadini öne alır.

### 3.2 Kategori şeridi (Dünya Mutfakları + Yemek Modları)
- **İçerik:** yatay kaydırılabilir kategori kartları (çorbalar, ana yemek,
  tatlı, dünya mutfakları, vejetaryen...). Her kart: kare görsel
  (`div+bg-image`) + etiket.
- **Referans:** yemek.com kategori şeridi.
- **Kimlik:** kare oranlı görsel kuralı; etiket Gilroy; ince `#ECECEC` kart kenarı.
- **Gerekçe:** keşfi hızlandırır; admin'deki "Dünya Mutfakları / Yemek Modları"
  taksonomisini frontend'e taşır.

### 3.3 Öne çıkan tarifler (manşet feature + grid)
- **İçerik:** 1 büyük "editörün/Dada'nın seçtiği" feature tarif (büyük görsel +
  başlık + puan + süre/zorluk) + yanında/altında 3–6'lı tarif kartı grid'i.
- **Kart anatomisi (tüm sitede tek tarif-kartı sistemi):** kare görsel ·
  başlık (Gilroy) · puan yıldız (`#FAC045` + FontAwesome) · yorum sayısı ·
  süre · "denendi/onaylı" rozeti.
- **Referans:** yemek.com popüler grid + GZT manşet; güven sinyalleri Allrecipes.
- **Kimlik:** puan sarısı niş; rozet domates; başlık slate.
- **Gerekçe:** markanın çekirdeği = topluluk tarifi + güven (puan/yorum/denendi).
  Tek kart sistemi → ürün/şef/püf kartları bundan türetilir (research §5).

### 3.4 Mutfağa Giriş + Püf Noktaları (rehber/eğitim bloğu)
- **İçerik:** iki sütun ya da ardışık iki şerit — "Mutfağa Giriş" (yeni
  başlayan rehberi kartları) + "Püf Noktaları" (kısa pratik bilgi kartları).
  Sözlük & ölçü birimlerine giriş linki.
- **Referans:** Kitchen Stories eğitim ruhu + Lokma editöryal ton.
- **Kimlik:** numaralı/editöryal liste olabilir (uzman mockup'ından öğrenilen iyi
  fikir) ama bu sefer içerik-dolu, "boş şablon" hissi vermeden.
- **Gerekçe:** DadaMutfak'ı salt tarif listesinden ayıran "rehber" katmanı;
  güven & otorite sinyali.

### 3.5 En Lezzetli Videolar
- **İçerik:** yatay video kartı şeridi (kare/dikey thumbnail + play ikonu + süre).
- **Referans:** yemek.com / Tasty video şeridi.
- **Kimlik:** play = FontAwesome; thumbnail `div+bg-image`; overlay 0.3–0.4.
- **Gerekçe:** genç hedef kitle + videolu tarif (research hedef kitle notu).

### 3.6 Sağlık & Diyetisyen
- **İçerik:** iki parça — (a) **hesaplayıcılar** girişi (kalori / BMI / bazal
  metabolizma / vücut tipi) kart/çip'ler; (b) **diyetisyen** vitrin (öne çıkan
  diyetisyen profilleri + "diyetisyen bul" CTA).
- **Referans:** Mealime sağlıklı/planlama minimalizmi.
- **Kimlik:** bu blokta **yeşil `#3BB77E`** aksanı öne çıkar (sağlık sinyali) —
  sitenin geri kalanından tematik ayrışır ama Gilroy/slate ortak.
- **Gerekçe:** diyetisyen modülü ayrı bir iş kolu (research §4) — ana sayfada
  görünür giriş hak ediyor; yeşil aksanı anlamlı yere konumlandırır.

### 3.7 Ramazan (mevsimsel — koşullu/öne çıkan)
- **İçerik:** sakin tek-odak blok — "İftara Doğru / Sahura Doğru" geri sayım +
  ramazan menüsü girişi. Gerçek ramazan görselleri (`Dada-Ramadan.png`,
  `ramazan-bg`, cami).
- **Referans:** kendi içeriğimiz; okunurluk için premium/uzman mockup'ında
  çözülen "güçlü sol koyu gradient + tek odak" yaklaşımı.
- **Kimlik:** koyu slate panel + domates CTA; metin okunurluğu garanti (eski
  myrecipes'te bu blok zayıftı — handoff bekleyeni).
- **Gerekçe:** Ramazan markanın güçlü mevsimsel trafiği; ama yıl boyu baskın
  olmamalı → koşullu/sezona bağlı vurgu.

### 3.8 Dada Shop (Ürünler)
- **İçerik:** 3–4'lü öne çıkan/indirimli ürün kartı + "tüm ürünler" CTA.
- **Kart:** büyük ürün görseli (`div+bg-image cover`) + ürün adı (Gilroy) +
  tek satır açıklama + fiyat + sepet CTA.
- **Referans:** Graza/Food52 ürün-kartı dili (research §7) — sıcak ama disiplinli.
- **Kimlik:** fiyat & CTA domates; indirim rozeti (yeşil/sarı niş).
- **Gerekçe:** e-ticaret katmanını topluluk akışına tutarlı kart sistemiyle bağlar.

### 3.9 Topluluk / Mobil Uygulama CTA
- **İçerik:** "tarifini paylaş / topluluğa katıl" çağrısı + mobil uygulama
  indirme bandı (gerçek `dada-mobil.jpg`, App Store/Play rozetleri).
- **Referans:** yemek.com app CTA bandı.
- **Kimlik:** domates CTA; sıcak krem `#EFE5D3` zemin opsiyonu (tek sıcak nötr).
- **Gerekçe:** UGC modeli (research §1) → topluluk büyümesi; uygulama dönüşümü.

### 3.10 Footer
- **İçerik:** logo + kısa marka cümlesi · modül linkleri (Tarifler/Rehber/Sağlık/
  Ürünler/Ramazan/Kurumsal) · yasal linkler (KVKK/gizlilik/sözleşmeler) ·
  sosyal · bülten kaydı.
- **Kimlik:** koyu slate zemin ailesi; logo (footer kullanımı orijinalde var);
  ayraçlar; Gilroy.
- **Gerekçe:** çok-sayfalı sitede footer = ikincil site haritası.

---

## 4. Bölüm Sıra Özeti

```
Header (sticky)
 └ Hero: "Bugün ne pişirsem" arama
 └ Kategori şeridi (dünya mutfakları / modlar)
 └ Öne çıkan tarifler (feature + grid)  ← tarif-kartı sistemi burada doğar
 └ Mutfağa Giriş + Püf Noktaları (rehber)
 └ En lezzetli videolar
 └ Sağlık & Diyetisyen (yeşil aksan bloğu)
 └ Ramazan (mevsimsel, tek-odak)
 └ Dada Shop (ürünler)
 └ Topluluk + Mobil uygulama CTA
Footer
```

## 5. Tutarlılık İlkeleri (build'de uyulacak)

- **Tek kart sistemi:** tarif/ürün/şef/püf/diyetisyen kartı aynı temel anatomiden.
- **Tüm kare/oranlı görsel = `div + background-image: cover; center`** (`<img>` değil;
  logo istisna). CSS render genişliği esas, **2× retina çarpma YOK**.
- **İkon = FontAwesome 6.5.2**, emoji yok.
- **Renk disiplini:** domates tek baskın; yeşil yalnız sağlık bloğunda öne çıkar;
  sarı yalnız puan; gri skala ayraç/muted için.
- **Tipografi:** Gilroy tek aile; hiyerarşi ağırlık+boyut ile (başlık ExtraBold
  hedefi, gövde Medium/Light).
- **Boşluk/etkileşim modernlik barı:** gaviaworks — disiplinli ritim, ince hover.
- **Responsive zorunlu** (önceki mockup'larda yoktu — bu turda baştan mobil-first).

## 6. Build Öncesi Açık Sorular (Beyar'a)

1. **Palet:** kırmızıyı tek `#E14827`'ye konsolide edelim mi, yoksa orijinaldeki
   varyantlar (E13138 vb.) birebir kalsın mı? (brand-tokens §1)
2. **Gilroy ağırlıkları:** Light/ExtraBold'u `@font-face`'e bağlayıp hiyerarşi
   kuralım mı (önerilen), yoksa mevcut tek-Medium düz dil mi?
3. **Ramazan bloğu:** her zaman görünür mü, yoksa yalnız sezonda mı?
4. **Stack hâlâ açık** (Laravel mi statik mi) — bu plan stack-bağımsız; build'i
   önce statik HTML mockup olarak mı üretelim?
