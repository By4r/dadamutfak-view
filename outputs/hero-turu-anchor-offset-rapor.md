# Hero-Türü — Anchor-Offset Fix Raporu

**Teammate:** anchor-offset · **Team:** hero-turu · **Tarih:** 2026-06-13
**Görev:** Hero/üst sticky nav → in-page section anchor jump'larında hedef section
başlığının sticky header (topbar+header) altında kalıp kesilmesi bug'ı.

---

## Kök Neden

Mockup'larda global sticky katman:
- `.topbar` → `position:fixed; top:0; height:40px` (z:70)
- `.header` → `position:fixed; top:40px` (z:60) — toplam ≈ **112px**
  (kanıt: `.below-header{padding-top:112px}`)

Anchor jump'lar iki yolla yapılıyor:
1. Native `<a href="#section">` (browser fragment navigation) — `html{scroll-behavior:smooth}`
2. JS `element.scrollIntoView()`

Her ikisi de hedefi **viewport top'a** hizalıyor; `scroll-padding-top` / `scroll-margin-top`
tanımlı olmadığı için hedef section başlığı sticky header'ın **ALTINDA** kalıp üstten kesiliyordu.

## Çözüm (tek-tip, kök-neden)

Her sayfada tek satır:
```
html{scroll-behavior:smooth}  →  html{scroll-behavior:smooth;scroll-padding-top:128px}
```
- `scroll-padding-top` scroll-container (html) üzerinde olduğundan **hem native #anchor hem
  scrollIntoView()** otomatik telafi alır — tek satır tüm jump'ları düzeltir.
- **128px** seçimi: sticky yükseklik 112px + ~16px nefes payı. Kodtabanı konvansiyonuyla uyumlu
  (mutfaga-giris-detay `scroll-margin-top:128px`, `.seo-aside` sticky `top:128px`,
  `.pf-tabbar` sticky `top:112px`).

## Lead Nüansı — Sticky Sub-Nav Kontrolü (ÇÖZÜLDÜ)

Lead uyardı: header'ın ALTINDA kendi STICKY sub-nav'ı olan sayfada 128px yetmez
(offset = header + sticky-sub-nav yüksekliği). Her 8 sayfanın sticky elemanları sınıflandırıldı:

| Dosya | Sticky eleman | Tip | Ekstra offset? |
|-------|---------------|-----|----------------|
| reklam-ver | `.rv-side` top:130 | yan sütun (form aside) | hayır — başlığı örtmez |
| akademi | `.seo-aside` top:128 | yan sütun | hayır |
| hakkimizda | `.about-figs` top:130 | yan sütun (görsel) | hayır |
| urun-detay | `.pd-gallery` top:128 | yan sütun (galeri) | hayır |
| mutfaga-giris-detay | `.ld-aside` top:128 | yan sütun (ders içeriği) | hayır |
| sozluk / video | — | sticky yok | hayır |
| **mutfak-defteri** | **`.pf-tabbar` top:112** | **tam-genişlik sticky sub-nav (tab switcher)** | **ÖLÇÜLDÜ → hayır** |

**Yan sütunlar** (`width < %25 viewport`) section başlığını yatayda örtmez → ekstra offset gereksiz.
**mutfak-defteri `.pf-tabbar`** tek gerçek tam-genişlik sticky bar; AMA tek in-page anchor'ı `#rozetler`
sayfa sonunda (footer öncesi), tab içeriğinin ALTINDA → o noktaya kaydırınca pf-tabbar viewport
top'ta DEĞİL (ölçüm: `stickyBottom=113`, yani sadece header). Dolayısıyla 128 yeterli, kanıtlandı.
(`pf-tabs` zaten panel-switch tab'ı, scroll yapmıyor; `#liderlik` ise gelecek route'a mock link,
in-page hedefi yok — kapsam dışı.)

## Ölçüm Arbiter (probe2.mjs) — Tüm Anchor'lar

Her chip→section sonrası: hedef rect.top vs tüm tam-genişlik top-pinned fixed/sticky bar'ların
`stickyBottom`'u; ayrıca `elementFromPoint(başlık üstü)` ile gerçek örtüşme kontrolü. **?cb=** her run'da.

**28 anchor → 27 PASS, 1 N/A** (`#liderlik` = mock route link, hedef yok). Tüm gerçek anchor'larda
`gap ≈ +15px` (başlık, 113px sticky tabanının 15px ALTINDA, asla örtülmüyor). `covered=false` her yerde.
Tam veri: `outputs/anchor-ss/VERIFY_measurements.json`.

## SON DURUM — 8 SAYFA UNIFORM (lead final kararı)

mutfaga-giris-detay-v1 **DAHİL** (lead kararını düzeltti). Swap uygulandı: per-element
`.ld-main h2{scroll-margin-top:128px}` KALDIRILDI → diğer 7 ile tek-tip `html{scroll-padding-top:128px}`.
Bu, 128'i korur (256'ya çıkmaz, additive değil swap) ve `#b5`(h3) + `#yorumlar`(div) anchor'larını da
telafi eder (h2-only kuralın boşluğunu kapatır). Git diff = 1-satır swap. Doğrulama: VERIFY_*_b5/yorumlar.png.
→ **Nihai: 8 sayfa uniform.**

## Düzeltilen Sayfalar (8)

| # | Dosya | Nav mekanizması | Test anchor | Sonuç |
|---|-------|-----------------|-------------|-------|
| 1 | reklam-ver-v1.html | hero `.chips` (5 section) native href | #yerlesimler, #basvuru | ✓ başlık tam |
| 2 | akademi-v1.html | header nav + hero chips (7 section) + scrollIntoView('kayit') | #sertifika | ✓ başlık tam |
| 3 | hakkimizda-v1.html | hero `.chips` (hikaye/degerler/ekip/kunye) | #ekip | ✓ başlık tam |
| 4 | sozluk-v1.html | hero `.chips` → terim listesi | #termList | ✓ kart üstü tam |
| 5 | mutfak-defteri-v1.html | sticky `.pf-tabbar` + inline #rozetler/#liderlik | #rozetler | ✓ (footer'a dayanıyor) |
| 6 | urun-detay-v1.html | "312 değerlendirme" linki | #pdReviews | ✓ başlık tam |
| 7 | video-mutfagi-v1.html | "Tüm seçki" linki | #tumVideolar | ✓ başlık tam |
| 8 | mutfaga-giris-detay-v1.html | hero adım nav (b1–b5) + "124 değerlendirme" | #b1–b5, #yorumlar | ✓ başlık tam |

> **mutfaga-giris-detay-v1:** h2-only `scroll-margin` → tek-tip `html scroll-padding-top:128px`'e geçti
> (swap, 128 korunur). #b5 (h3) + #yorumlar (div) artık telafili. SS: VERIFY_mutfaga-giris-detay_b5/yorumlar.png.

## Önce / Sonra Kanıt (SS)

Standalone headless Chrome (CDP-driven, gerçek chip click) — `outputs/anchor-ss/`:
- BEFORE/AFTER_reklam-ver_yerlesimler.png — eyebrow "YERLEŞİM SENARYOSU" + başlık kesik → tam
- BEFORE/AFTER_akademi_sertifika.png — "...sergile" kuyruğu görünür (kesik) → eyebrow+başlık tam
- BEFORE/AFTER_hakkimizda_ekip.png — başlık header'a değiyor → eyebrow+başlık tam, nefes payı
- BEFORE/AFTER_sozluk_termList.png — ilk terim "Beşamel" kesik → kart üstü + "Benmari" tam
- BEFORE/AFTER_urun-detay_pdReviews.png — "Değerlendirmeler" yarım → eyebrow+başlık tam
- BEFORE/AFTER_video_tumVideolar.png — başlık kesik → "VİDEO ARŞİVİ" + başlık tam
- BEFORE/AFTER_mutfak-defteri_rozetler.png — pixel-identical (aşağıda not)

> Not: CLI `--screenshot` + fragment, kaydırılan bölgeyi boyamıyor (headless paint quirk);
> bu yüzden CDP üzerinden gerçek chip click + paint sonrası capture kullanıldı (`outputs/anchor-ss/probe.mjs`).

## Bilinen Sınırlamalar

1. **mutfak-defteri-v1 #rozetler/#liderlik footer'a dayanıyor (bottom-out).** Bu linkler sayfa
   sonuna yakın olduğu için scroll zaten max'ta duruyor; scroll-padding görsel fark yaratmıyor
   (BEFORE/AFTER pixel-identical). Başlık her iki durumda da tam görünür → regresyon yok,
   tutarlılık için fix yine de uygulandı.
2. **mutfak-defteri-v1 `#liderlik` kapsam dışı:** gelecek route'a mock link (`F-liderlik, stack
   fazında gerçek route`), in-page hedefi yok → arbiter'da N/A. Düzeltilecek bir şey değil.
3. **reklam-ver-v1 JS path** `window.scrollTo({top:sec.offsetTop-120})` (?ok=1 başarı redirect'i)
   `scrollTo` explicit olduğu için scroll-padding'den etkilenmez; -120 ≈ 128 ile tutarlı, dokunulmadı.
4. **SS doğrulaması desktop 1280×900.** Mobilde (`<breakpoint`) `.topbar` gizleniyor (`.header{top:0}`),
   etkin sticky ≈72px; 128px padding mobilde başlığı biraz daha aşağı bırakır (asla kesmez) → kabul
   edilebilir, mobil-spesifik bug yok. Her sayfa ayrıca mobil SS alınmadı.
5. **Scope:** Sadece gerçek in-page anchor-jump sayfaları düzeltildi. Panel-switch yapan (scroll
   etmeyen) sticky sekme barları kapsamda değildi. `ref-*.html` referans/clone dosyaları hariç tutuldu.
6. **Çakışma:** Düzeltilen 7 dosyanın hiçbiri rezerve (exclude) listesinde değil.

## Değişiklik Özeti
7 dosyada birer satır CSS (`scroll-padding-top:128px`). §2f hero + `_shell` + JS mantığı dokunulmadı.
COMMIT YAPILMADI.
