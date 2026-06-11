# DadaMutfak — Dalga 2 / Keşif & Planlama (teammate `kesif`) — Üretim Raporu

> 4 sayfa: `bugun-ne-pisirsem-v1` · `tarif-bulucu-v1` · `haftalik-menu-v1` · `kesfet-v1`
> Hepsi `_shell.html` kopyası; chrome + mega menü **KİLİTLİ** korundu. Kılavuz §2b
> bileşenleri (form kiti `.fk-/.ie-/.st-`, facet `.fct/.cbx`, `.ie-sugg` autocomplete,
> `.r-card`, `.disc-card`, `.stepper`, `.rd-crumb`, boş durum) **verbatim miras**;
> sıfırdan icat yok. Renk disiplini (domates baskın · yeşil YOK · sarı sadece puan),
> radius token, `div+bg-image`, FontAwesome 6.5.2, emoji bayrak yok.
> Tarih: 2026-06-11.

---

## 1) `bugun-ne-pisirsem-v1.html` — Sihirbaz Seçim Akışı

> **Beyar revize:** ilk wizard "yeniden icat / kopuk" diye **REDDEDİLDİ** → tarif-ekle'nin
> kurulu dili VERBATIM miras alındı, frontend-design uygulandı.

Adım-adım sihirbaz: **Öğün → Ana Malzeme → Süre & Zorluk → Tercihler** (4 adım) → **Sonuç**.
- **İSKELET:** tarif-ekle `.stepper` + `.form-card` + `.fc-head` + `.wiz-foot` VERBATIM; stepper
  **kompakt üst kimliğin (breadcrumb + h1 + kısa lead) altına bağlı** (tarif-ekle fp-top deseni) —
  stepper + soru kartı + ilerleme TEK BÜTÜN akış, yüzen şerit yok.
- **STEPPER 4 DÜĞÜM** (Sonuç ayrı düğüm değil) → kart "Adım N / **4**" ile **senkron** (eski 5↔4 bug giderildi).
- **SEÇİM KARTLARI** (`.pick`) yeniden: kompakt, **merkezli ikon (domates-tint daire) + başlık + tek satır
  alt metin**, hover lift, seçilince tint dolgu + ✓ (tarif-bulucu `.raf-item` akrabası) — eski "dev boş
  kutular" gitti.
- **SEÇİM ÖZETİ** (`.wiz-summary`): adım geçişlerinde seçimler stepper altında **chip olarak birikir**
  (tıkla → o adıma git).
- **"Baştan Başla"** üst kimlikten kalktı, her adımın **`.wiz-foot`**'una girdi.
- **Sonuç** = canlı `.r-card` grid (%uyum rozeti) + seçim özeti + boş durum.
Doğrulandı (JS probe): stepperNodes=4, cardLabel="Adım 1/4", stepperInHeader=true, restartInFooter=4,
pick centered+circle icon, summary chip birikiyor; 0 hata; 390 taşma yok.

### L1 — Eski template kıyas (`bugun-ne-pisirsem.html` + `bugun-ne-pisirsem-liste.html`)
| Eski blok | Karşılık | Karar |
|---|---|---|
| Zorluk/süre/sıralama filtre chip'leri (`dada-filter-option`) | Adım 3 süre tile + zorluk chip | **Korundu → adımlara taşındı** |
| Tab-pane + ürün-kart grid (sonuç) | Sonuç ekranı `.r-card` grid | **Birleşti** (filtre+sonuç tek akışta) |
| `recipe-info-tag` kart rozetleri | `.r-chip` + `.m-types` | **Korundu** (Dalga 1 anatomisi) |
| Tema product-card / cart-wrap | — | **Atıldı** |
| (gerçek sihirbaz yok — sadece düz filtre) | 4 adımlı stepper akışı | **YENİ** |
| — | %uyum rozeti + boş durum | **YENİ** |

**Tasarım kararları:** tek-seçim adımlar (öğün/malzeme/süre) "İleri"yi açar; tercih
adımı çoklu + opsiyonel; zorluk opsiyonel chip. "Elindekiyle pişir" notu → `tarif-bulucu`
çapraz linki. Sonuç kartları `tarif-detay-v1`'e gider.
**SS:** `.ss-scratch/bnp-1440-step1.png` (kompakt hero+bağlı stepper) · `bnp-1440-step3.png` (özet chip'ler) · `bnp-1440-sonuc.png` · `bnp-500-step2.png`
**Param:** `?step=1..4` · `?sonuc=1` · `?bos=1`

---

## 2) `tarif-bulucu-v1.html` — Evindeki Malzemeyle Pişir (m17) · **DOLAP DENEYİMİ**

> **Beyar ara talimatı (2026-06-11):** "Bu sayfa rakiplerde sıradan bir form, bizde
> DENEYİM olacak." Düz multi-select **REDDEDİLDİ** → hafif **DOLAP simülasyonu** olarak
> yeniden kurgulandı. FLAT (gerçekçi buzdolabı/3D raf/skeuomorfizm YASAK), token diliyle.

> **Beyar 2. revize:** ilk DOLAP kurgusu (7 raf alt alta tam açık → "malzeme duvarı",
> sonuçlara sonsuz scroll) **REDDEDİLDİ**. Konsept korundu, **mimari `.lst-layout`'a taşındı**
> (sonuç-öncelikli iki kolon). frontend-design skill uygulandı.

**İKİ KOLONLU, SONUÇ-ÖNCELİKLİ** (tarif-liste `.lst-layout`/`.lst-side` mirası):
- **SOL sticky DAR panel** (`.dolap`, sticky): tepede **`.dlp-count`** sayaç ("Dolabında N malzeme
  var", sticky) + "Boşalt" → **BİRİNCİL `.ie-sugg` arama** ("Malzeme ara veya ekle", odakta) →
  **`.dlp-strip`** seçilenler şeridi (DOLABIMDA chip'leri) → **`.fct` AKORDEON raflar** (tarif-liste
  facet deseni VERBATIM): Temel Gıda · Sebze & Meyve · Et/Tavuk/Balık · Süt Ürünleri · Bakliyat & Kuru ·
  Baharat & Sos — **yalnız İLKİ açık**, her raf `.fct-dot` seçili rozeti, ≥7 malzemeli rafta `.fct-more`
  "daha fazla" (`.raf-item.xtra`). İçinde **ikonlu `.raf-item` kartlar** (seçilince domates-tint + ✓ +
  pop). En altta filtreler **panel içi blok** (kalori `.krange` + süre) — ayrı dev bant YOK.
- **SAĞ geniş kolon** = CANLI sonuç grid'i (**ilk ekranda görünür**); `.tb-bar`'da **`.dlp-live`** büyük
  sayı ("**122** · N malzeme ile pişirebileceğin tarif") malzeme ekledikçe anlık güncellenir.
- **Mobil ≤640/≤1024:** panel `.lst-side` gibi **SHEET'e döner** (`?sheet=1`); sonuç kolonu tepesinde
  **`.dlp-bar`** özet (N malzeme · 122 tarif · "Dolabı Düzenle" `.btn-filter`) → sheet aç/kapa + dimmed overlay.
- `.ie-sugg` autocomplete raf kurgusuyla BİRLEŞİK: öneriye tıkla → `.raf-item` "rafa düşer" + şeride girer.
  İsraf şeridi korundu. FLAT, token dili. Doğrulandı (JS probe): akordeon ilk-açık=1, fct-more xtra aç,
  kart seç → panel+sonuç+mobil sayaç senkron (4→5/122→148), fct-dot, sticky panel, grid layout; 0 hata; 390 taşma yok.

> **Beyar kabul-öncesi 3 düzeltme (uygulandı):** ① panel başlığı DAR kolona göre **tek satır kompakt**
> ("Dolabında 4 malzeme", ellipsis korumalı; alt-satıra kıran uzun açıklama kaldırıldı; arama tam genişlik
> ayrı satır). ② **akordeon doğrulandı** — yalnız ilk raf açık (probe: open=1, firstOpen=true). ③ **sayfa
> başlığı kompakt geri geldi** — breadcrumb + tek satır "Evindeki malzemeyle pişir" h1 + kısa israf notu
> aynı satırda (eyebrow/uzun lead kaldırıldı). Sonuç grid ilk ekranda (resultsTop≈257px). SS: full-page
> headless'te hang verdi → viewport SS alındı (`bulucu-1440-dolap.png` üst kesit · `bulucu-500-*.png`).

### L1 — Eski template kıyas (`tarif-bulucu.html`)
| Eski blok | Karşılık | Karar |
|---|---|---|
| "Dolapta Ne Var?" 2 input (düz) | Kategori raflı dolap + ikonlu kartlar | **Korundu kavram → DENEYİME yükseltildi** |
| `price-filter` slider | Kalori aralığı dual-range (dolap altı) | **Korundu → repurpose** |
| `card-2` malzeme kartları | `.raf-item` raf kartları + `.dlp-strip` şerit chip'i | **Korundu → ikonlu+stateli** |
| Ürün/recipe grid | `.r-card` grid + var/eksik pill | **Korundu + zenginleşti** |
| "Dolapta Ne Yok?" input (hariç) | — (bu turda çıkarıldı) | **Atıldı → açık soru #8** |
| Tema product-card | — | **Atıldı** |
| — | sayaç + seçilenler şeridi + CANLI tarif sayacı | **YENİ** |
| — | kategori rafları + pop animasyon + raf sayacı | **YENİ** |
| — | israf şeridi (m17) · tam-eşleşme/eksik rozeti | **YENİ** |

**Tasarım kararları:** başlangıç dolabı 4 malzeme (Yumurta/Domates/Soğan/Peynir, ilgili
kartlar pre-sel); seçim arttıkça canlı tarif sayısı (18+n×26 mock) anlık güncellenir.
İkonlar FA 6.5.2 (bazı sebzelerde yakın eşdeğer — fa-apple-whole/fa-seedling vb.). Eşleşme
rozeti **domates** (yeşil renk disiplini), eksik rozeti koyu + sarı ünlem. "İstemediklerim"
(eski Dolapta Ne Yok) sadeleştirme için bu turda çıkarıldı → açık soru.
Doğrulandı (JS probe): kart seç → sayaç/canlı-sayı/şerit/raf-sayacı güncelleniyor; arama
"dom" → yalnız Domates kartı; 0 hata; 390 taşma yok.
**SS:** `.ss-scratch/bulucu-1440-dolap.png` · `bulucu-500-dolap.png` · `bulucu-500-sheet.png` (mobil sheet açık)
**Param:** `?bos=1` (boş dolap) · `?sheet=1` (mobil dolap sheet açık)

---

## 3) `haftalik-menu-v1.html` — Haftalık Dada Menü (m5 · kritik-10 №3, YILDIZ)

**7 gün × 3 öğün** plan board (Kahvaltı/Öğle/Akşam × Pzt–Paz, bugün vurgulu) +
mini hücre kartları + boş "+ Ekle" slotları (kaldır/ekle etkileşimli). **Kişi sayacı**
(1–12) miktarları canlı ölçekler. **Otomatik alışveriş listesi çıktısı**: reyon grupları
(Manav / Kasap & Balık / Süt & Kahvaltılık / Bakkal), `.cbx` onay kutusu (facet VERBATIM),
ölçekli miktar, ilerleme özet kartı (sticky), İndir(PDF)/Paylaş. "Otomatik Oluştur" toast.

### L1 — Doğrudan karşılık **YOK** → en yakın akraba `menulerim.html`
`menulerim.html` = kayıtlı tarif **koleksiyonu** kartları + menü-adı input + "Menüden
Kaldır" + product grid. **7-günlük öğün planı DEĞİL.**
| `menulerim.html` bloğu | Yeni sayfa | Karar |
|---|---|---|
| Menü = tarif koleksiyonu kavramı | Haftalık plan = öğün koleksiyonu | **Kavram korundu, yapı yeni** |
| "Menüden Kaldır" aksiyonu | Hücre `.mc-x` kaldır → boş slot | **Korundu** |
| `menu-name-input` | — (hafta gezgini ile değişti) | Atıldı |
| product grid | 7×3 matris board | **YENİ yapı** |
| — | kişi ölçekleme + reyon-grup alışveriş listesi | **YENİ** (yıldız özellik) |

**Tasarım kararları:** board genişliği desktop'ta wrap'e sığar; tablet/mobilde **içeride
yatay kaydırılır** (ilk öğün sütunu sticky) — sayfa yatay taşması SIFIR. Miktar yuvarlama:
adet/demet→round, paket/şişe→ceil, kg/L→0.5 adımı, g→50 adımı (≥1000g→kg).
**Mobil bug bulundu & düzeltildi:** `.wk-board{overflow:hidden}` board'u 343px'e kırpıyordu
(yalnız ~3 gün, scroll yok); responsive query'lerde `.wk-board` min-width grid'e eşitlendi
→ board kaydırılır, radius korunur, sayfa taşmaz (probe: board 760 > 343 clientWidth ✓).

> **Beyar ek iş — CANLI SENKRON (uygulandı):** alışveriş listesi artık STATİK değil, **menüden
> türetiliyor**. Her tarif (`.mc-name`) → `RING` malzeme haritası; `rebuildShop()` filled hücreleri
> tarayıp reyon reyon birleştirir (`CAT` katalog: ad→reyon/baz/birim). Hücreye tarif **eklenince/
> kaldırılınca**: ① "Menündeki **N** tarifin" sayacı (`#menuCount`) canlı güncellenir; ② ilgili reyon
> kalemi düşer/silinir, `.gcnt` reyon sayıları + `ssTotal` + ilerleme % yeniden hesaplanır; paylaşılan
> malzemede "**×N tarif**" rozeti. Kişi sayacı miktarları `fmtQty` ile ölçekler. İşaretli kalemler
> rebuild'de korunur (`checkedSet`). Doğrulandı (probe): Menemen sil → menu 18→17; Yoğurtlu Makarna
> ekle → menu→18, total 21→22, **Tereyağı satırı Süt reyonunda belirdi**; kalem işaretle → %5; 0 hata.
**SS:** `.ss-scratch/haftalik-1440.png` · `haftalik-500.png` · `haftalik-1440-shop.png` (canlı liste, ×N tarif)

---

## 4) `kesfet-v1.html` — Editoryal Keşif + Uzun-Form Detay (ara iş 3)

**Tek dosya, JS toggle** (`?detay=1`, history pushState). Grid görünümü: `.disc-card`
editoryal grid (anasayfa-v3a VERBATIM) — 1 **feature 2-kolon span** + kategori chip rayı.
Detay görünümü: uzun-form makale (`.art-*`) — hero+overlay (0.3–0.4) · `.art-lead` ·
gövde figür · pull-quote · ipucu kutusu · etiket/paylaşım rayı · yazar kartı · ilgili
keşifler grid. "Keşfet'e dön" geri navigasyonu.

### L1 — Eski template kıyas (`kesfet.html` + `kesfet-detay.html`)
| Eski blok | Karşılık | Karar |
|---|---|---|
| Gradient-overlay product-card grid | `.disc-card` editoryal grid | **Korundu (Dalga 1 disc dili)** |
| Kategori/tab filtre rayı | Kategori chip rayı | **Korundu** |
| Restoran filtreleri: ₺ skala, gün, rütbe, rezervasyon, mutfak | — | **Atıldı** (tema kalıntısı, marka dışı) |
| `slider-steps` range | — | Atıldı |
| Detay: `step-text` + ürün + yorum | Uzun-form `.art-*` makale | **Korundu → editoryal dergi diline yükseltildi** |
| `tags-list` etiket rayı | `.art-tags` | **Korundu** |
| — | feature 2-col, pull-quote, ipucu, yazar kartı, ilgili keşifler | **YENİ** |

**Tasarım kararları:** keşfet **içerik** (mutfak hikâyesi/rota/söyleşi) olarak ele alındı,
eski tema restoran-dizin kalıntıları temizlendi. Detay ayrı route yerine toggle (Dalga 1
video `?seri=1` / `?short=1` pattern'ı ile tutarlı). Makale içi `tarif-bulucu` çapraz linki.
**SS:** `.ss-scratch/kesfet-1440-grid.png` · `kesfet-1440-detay.png` · `kesfet-500-grid.png` · `kesfet-500-detay.png`
**Param:** `?detay=1`

---

## Doğrulama
- **Konsol: 0 hata** (4 sayfa, Playwright `browser_console_messages`).
- **390px yatay taşma: SIFIR** (4 sayfa, `documentElement.scrollWidth = 375 ≤ 390`).
  Mobil SS'ler 500px'te alındı (headless min-pencere kuralı, kılavuz §4).
- Haftalik board mobil scroll fix doğrulandı (`.wk-scroll` 760 > 343, sayfa taşması yok).
- Cross-link: nav active (Bugün Ne Pişirsem) · breadcrumb · `tarif-detay-v1` ·
  `tarif-liste-v1` · `bugun ↔ tarif-bulucu` · `haftalik → tarif-bulucu`.

## Açık Sorular (Beyar/Yasin Bey onayı)
1. **Wizard adım sırası** (öğün→malzeme→süre→tercih) onay? Tercih adımı opsiyonel kalsın mı?
2. **"%uyum" rozeti** (bugun sonuç) — backend kişiselleştirme skoru var mı, yoksa kaldırılsın mı?
3. **Kalori aralığı** gerçek porsiyon-kcal verisiyle mi besleniyor (DB'de var mı)?
4. **Alışveriş listesi reyon eşlemesi** (manav/kasap/bakkal) backend kategorisi mi, manuel mi?
   Kişi-ölçekleme yuvarlama kuralı onay (kg/L/adet/paket)?
5. **Keşfet** ayrı route mı (`kesfet-detay.html`) yoksa `?detay=1` toggle mu kalsın
   (şu an toggle — Dalga 1 video/seri pattern'ı ile tutarlı)?
6. **"Otomatik Oluştur"** (haftalık) gerçek öneri motoruna mı bağlanacak (bugun-ne-pisirsem ile paylaşımlı)?
7. Bu 4 akışın hepsi **giriş ister mi** (kaydet/menü oluştur) yoksa misafir de kullanabilir mi?
8. **tarif-bulucu "İstemediklerim"/alerjen filtresi** (eski "Dolapta Ne Yok") — DOLAP
   deneyimini sade tutmak için bu turda çıkarıldı. Geri eklensin mi, eklenirse nasıl
   (ayrı "çıkar" rafı mı, malzeme kartına uzun-bas "istemiyorum" mu)?
9. **tarif-bulucu raf/kategori taksonomisi** (Temel Gıda / Sebze-Meyve / Et-Tavuk-Balık /
   Süt / Bakliyat / Baharat) ve malzeme havuzu backend ile mi beslenecek? Sebze ikonları
   FA'da birebir yok — özel ikon seti mi yapılsın?
