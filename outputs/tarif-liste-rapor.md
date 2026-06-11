# F2 — Tarif Liste / Arama Raporu (`mockups/tarif-liste-v1.html`)

> TIER 1 dalga · "liste" teammate · 2026-06-11 · Durum: **TAMAM**

## Durum Özeti

`_shell.html` kopyasından üretildi; chrome katmanına (token/topbar/header/mega/footer/
drawer/bottom-nav/çerez/görüş modal) dokunulmadı. Sayfa CSS'i "SAYFA CSS",
sayfa JS'i "SAYFA JS" işaretlerinin altında. İlk section `.below-header` aldı.
Bitiş kriterleri: 1440 + 390 SS (fold + full + durum SS'leri) ✅ · konsol 0 hata
(1440 ve 390'da ayrı ayrı doğrulandı) ✅ · 390'da yatay scroll SIFIR
(gerçek 390 viewport'ta `scrollWidth=390` ölçüldü) ✅.

Sayfa kurgusu (yukarıdan aşağı):
1. **Üst bölge** (beyaz): `.rd-crumb` breadcrumb (TD verbatim) + H1 "Tarifler" + kısa açıklama
2. **Liste bölümü** (gri `--bg-cream`): 272px sticky **facet paneli** + sonuç kolonu
3. Sonuç kolonu: **özet satırı** ("248 tarif bulundu — 'mantı' araması için") +
   **sıralama dropdown'ı** (Önerilen / En Yeni / En Çok Puanlanan / En Hızlı) +
   **aktif filtre chip'leri** (x ile kaldırılabilir + Tümünü Temizle) +
   **3 kolon r-card grid** (9 kart, tamamı mantı temalı — arama bağlamı gerçekçi) +
   **boş durum** + **pagination** (1 2 3 4 … 28 + ok + "248 tarif · sayfa 1/28" notu)
4. Mobil/tablet (≤1024): facet paneli **alttan açılan sheet**'e dönüşür
   ("Filtrele" butonu + aktif filtre rozeti + "N Tarifi Göster" apply butonu)

Demo içerik bağı: arama terimi "mantı" seçildi çünkü onaylı `tarif-detay-v1.html`'in
tarifi "Fırında Tereyağlı Mantı" — 1. kart birebir o tarif, tüm kart linkleri
gerçek dosyaya (`tarif-detay-v1.html`) gidiyor.

## L1 Kıyas Tablosu (eski `tarifler.html` + `tarif-kategori.html`)

| Eski blok | Yeni karşılığı / karar |
|---|---|
| `page-header video-bg` (video arka planlı başlık + hashtag rayı) | Sade beyaz üst bölge: `rd-crumb` + H1 + lead. **Bilinçli elendi:** T1 dalgasında hero'lu sayfa yok (kılavuz §0); hashtag rayının işlevini aktif filtre chip'leri üstlendi |
| Breadcrumb (`fa-house` + Tarifler) | `.rd-crumb` (tarif-detay dili, verbatim) ✅ |
| Sidebar `widget-category-2` "Kategoriler" (görselli liste + count) | Facet panelinin **Kategori** grubu: checkbox + sayaç. Kategori thumb görselleri **bilinçli elendi** (facet yoğunluğunda görsel gürültü; kategori görsel vitrini F-kategori sayfasının işi) |
| `dada-filter-container` hızlı filtreler: Zorluk Seviyesi | Facet **Zorluk** grubu (Çok Kolay/Kolay/Orta/Zor) ✅ — çok seçimli checkbox'a yükseltildi |
| `dada-filter-container`: Mutfak (Çin/Avrupa/Türk) | Facet **Dünya Mutfağı** grubu — flagcdn bayraklı satırlar (TD `.chip-flag` verbatim), mantı bağlamına uygun 6 mutfak (TR/CN/IT/GE/KZ/RU) |
| `dada-filter-container`: H. Süresi (10–120 DK+) | Facet **Süre** grubu (15 dk altı / 30 dk altı / 45 dk altı / 1 saatten uzun) ✅ |
| `dada-filter-container`: Anlatım Türü (Videolu/Sesli) | Facet **İçerik Türü** grubu (Videolu / Sesli / Fotoğraflı Adımlar) ✅ — miras korundu |
| Grid boyutu seçici (10/20/30/40/50 kart) | **Bilinçli elendi** — modern dizinlerde sabit sayfa boyu yeterli; istenirse sıralamanın yanına dönebilir (açık soru #4) |
| Sıralama (En Popüler / En Son Eklenen / En Çok Yorum Alan) | `.sort-dd` dropdown: Önerilen / En Yeni / En Çok Puanlanan / En Hızlı (görev spec'i seti) ✅ |
| `product-cart-wrap` tarif kartı (`recipe-info-tag`: play/volume/image rozetleri, star, eye, award "Şefin Tercihi") | **r-card v3a anatomisi birebir**: `.m-types` (play/volume/images), `.r-rate`, `.r-views`, `.r-tried` ("Dada Denedi"/"Editör Onaylı") ✅ |
| Kart çoklu kategori linki satırı ("Hodo Foods, Hodo Foods, ...") | `.r-chip` tek kategori rozeti + `.r-foot` yazar satırı. Çoklu link **bilinçli elendi** (r-card anatomisinde yok; gürültü) |
| `pagination-area` ("200 Sonuç Bulundu" + page-link + dot) | Sonuç sayısı **toolbar özet satırına** taşındı; `.pagi` token dili (radius-md kare butonlar, pill yok) + `.pagi-note` ✅ |
| Reklam kutusu (`ad-container` 728x90, sidebar altı) | **Bilinçli elendi** (T1 mockup kapsamı; açık soru #3) |
| Bildirim/sepet/hesap header öğeleri | Shell chrome'unun işi — sayfa kapsamı dışı |
| `bugun-ne-pisirsem-liste.html` tab'lı liste + "Ekle" butonlu kartlar | F-BNP sayfasının işi; bu sayfada karşılığı sıralama + facet. İncelendi, blok taşınmadı |

**Eskide olmayan yeni bloklar:** aktif filtre chip'leri (+Tümünü Temizle), Beslenme
facet'i (vegan/vejetaryen/glutensiz/düşük kalorili/yüksek proteinli/diyabet dostu/
çocuk/sporcu — PDF m15), Bütçe facet'i (₺/₺₺/₺₺₺ — m16), Yemek Modu facet'i,
sonuç-boş durumu, arama özeti satırı, mobil filtre sheet'i.

## Kullanılan / Yeni Bileşenler

**Verbatim kopyalanan:** `.r-card` sistemi + anatomi (v3a 289–312 + 775–776 +
783–796: r-facts/r-foot/r-stats/m-types/r-tried/r-save) · `.rd-crumb` (TD 533–537)
· `.chip-flag` (TD 1224) · shell'den `.btn`, `.see-all` dili, token'lar.

**Token diliyle kurulan yeniler** (kılavuzda karşılığı yoktu):
- `.fct` facet grubu (aç/kapa başlık + aktif sayaç noktası + "daha fazla göster")
- `.cbx` özel checkbox (radius-sm, domates check)
- `.fchip` aktif filtre çipi (domates-tint zemin, x ile kaldır; bayrak destekli)
- `.sort-dd` sıralama dropdown'ı (see-all buton kabuğu + tb-lang menü dili)
- `.btn-filter` + sheet dönüşümü (≤1024: facet paneli alttan sheet; kendi overlay'i)
- `.pagi` pagination (radius-md kare butonlar, aktif domates; pill YOK)
- `.lst-empty` boş durum (kılavuz dili: domates-tint ikon kutusu + başlık + açıklama + CTA)

## Etkileşim / JS (mock)

- Checkbox → chip üretimi, grup sayaçları, sonuç sayısı güncelleme (grup içi OR
  toplamı, gruplar arası AND=min — mock yaklaşımı)
- Çakışan kombinasyon demosu: **Vegan + Et Yemekleri → 0 sonuç → boş durum**
- SS paramları: **`?empty=1`** (boş durum) · **`?sheet=1`** (mobil filtre sheet açık)
- Chip x / Tümünü Temizle / boş durum CTA'sı → filtre temizleme; arama çipi
  ("mantı") kaldırılınca özet "14.975 tarif listeleniyor"a döner
- Sıralama seçimi, pagination aktif-sayfa görseli, fct aç/kapa, "daha fazla göster"

## Bilinçli Kararlar

1. **≤640 sonuç grid'i dikey, yatay snap DEĞİL.** Görev "≤640 davranışı v3a
   pattern'ı" diyor; ancak v3a'nın yatay snap'i keşif raylarına özgü —
   pagination'lı arama dizininde sonuçlar yatay kaydırmalı olursa taranamaz.
   Orta yol: tek kolon dikey + **v3a feat-side dili** (yatay mini kart: görsel
   %38 solda, gövde sağda) → yine v3a pattern'ı, ama liste akışına uygun. (Açık soru #2)
2. Facet sayaçları "mantı" arama bağlamıyla tutarlı (hepsi ≤248); 9 kartın 9'u
   mantı varyantı (Kayseri, çıtır fırın, yalancı, çorba, Hingel, vegan mercimekli,
   Tatar böreği...) — arama sonucu hissi gerçek.
3. ≤640 mini kartta `.r-tried` rozeti gizlendi — 148px görselde `.m-types` ile
   çakışıyordu; rozet bilgisi detay sayfasında mevcut.
4. Görseller proje genelinde doğrulanmış Unsplash ID havuzundan + kılavuz filtre
   suffix'i; 1 yeni portre eklendi (HTTP 200 doğrulandı). Tümü div+background-image.
5. Boş durumda grid + pagination gizlenir, chip'ler kalır (kullanıcı hangi
   filtrelerin elediğini görür); sheet apply butonu "Sonuç yok — filtreleri azalt" der.

## Bilinen SS Notu (kılavuz §4 + yeni bulgu)

390 SS'leri **iframe-host tekniğiyle** alındı (`mockups/.ss-scratch/_host390.html`):
headless Chrome `--window-size` genişliğini min ~500px'e kısıtlıyor — sayfa 500px
layout'la render edilip 390'a kırpılıyor. Kılavuz §4'teki "390'da header ikonları
paint olmuyor" artifact'inin kök nedeni büyük olasılıkla bu (ikonlar 500px
layout'un sağında, 390 kırpımının dışında kalıyor). Iframe tekniğiyle gerçek 390
viewport elde edildi → ikonlar da göründü, `scrollWidth=390` ölçülerek yatay
taşma SIFIR doğrulandı.

## Açık Sorular (Beyar'a)

1. **"Yemek Modu" facet'inin kapsamı?** Research §2.2'de geçiyor ama tanımsız.
   Yorumum: Günlük Pratik / Misafir Sofrası / Tek Tencere / Fırın İşleri / Airfryer.
   Öğün (kahvaltı/öğle/akşam) kastedildiyse değiştiririm.
2. **≤640 sonuç listesi:** dikey mini kart (feat-side dili) kararı onaylanıyor mu,
   yoksa v3a yatay snap mı istenir?
3. **Reklam alanı:** eski sayfadaki 728x90 kutusu yeni tasarımda isteniyor mu?
   (Facet paneli altına eklenebilir; şimdilik elendi.)
4. Eski **grid boyutu seçici** (10–50 kart) geri istenirse sıralamanın yanına
   `icon-btn` ailesiyle eklenebilir — gerekli mi?
5. Sayfa başına kart sayısı mock'ta 9 (3×3); gerçek sayfa boyu (12/24) stack
   kararıyla netleşecek.

## SS Dosyaları (`mockups/.ss-scratch/`)

| Dosya | İçerik |
|---|---|
| `liste-1440.png` | Desktop fold (facet panel + toolbar + chip + grid ilk satır) |
| `liste-1440-full.png` | Desktop tam sayfa (grid + pagination + footer) |
| `liste-1440-empty.png` | Boş durum (`?empty=1` — Vegan + Et Yemekleri çakışması) |
| `liste-390.png` | Mobil fold (gerçek 390 viewport, header ikonları görünür) |
| `liste-390-full.png` | Mobil tam sayfa (mini kartlar + pagination + footer) |
| `liste-390-sheet.png` | Mobil filtre sheet'i açık (`?sheet=1`) |

Konsol: 1440 ve 390 yüklemelerinde `--enable-logging=stderr` ile 0 CONSOLE satırı.

## EK — Beyar SS Turu Kararları (2026-06-11)

- ✅ BEĞENİLDİ. **Revize işlendi:** sade başlık → v3a dili liste hero'su (krem band + accent H1 + 3'lü istatistik + 6 popüler chip → tıklanınca facet'e düşer + sonuçlara scroll). Bu hero dili Dalga 2 kategori/koleksiyon/SEO landing'lerine ÖRNEK.
- "Yemek Modu" yorumu ONAYLI (Günlük Pratik/Misafir/Tek Tencere/Fırın/Airfryer).
- ≤640 dikey mini kart ONAYLI.
- Grid boyu seçici GELMEYECEK.
- Sayfa başına kart sayısı → stack fazına.
- Reklam kutusu → PATRON KARARI BEKLİYOR (handoff listesinde).
- **Revize 2 (canlı tur):** krem zemin Beyar tarafından REDDEDİLDİ → hero
  görsel + koyu overlay'e çevrildi (v3a dayband dili: 90deg .93/.72 gradient +
  Unsplash spread; beyaz H1 + #ff7a5c accent, glass chip'ler, beyaz istatistik
  kolonu). Dalga 2 landing hero örneği BU dil.
