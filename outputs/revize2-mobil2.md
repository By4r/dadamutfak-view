# Revize 2 — Mobil Denetim 2 (mobil2) Raporu

**Kapsam:** 40 sayfa (sağlık & hesaplayıcılar · diyetisyen · panel · rehber/akademi · auth · kurumsal/yasal/arama/sezon)
**Viewport:** 390×844 birincil; 360×800 ve 320×700 stres-testi
**Yöntem:** Playwright MCP + enjekte edilen diagnostik (fixed/sticky envanteri, alt-katman çakışma, yatay taşma, off-canvas-farkında taşma, scroll-pozisyonlu tekrar, hesaplayıcı form-doldur+hesapla, test/onboarding akış adımlama)
**Tarih:** 2026-06-12

---

## TL;DR

**40/40 sayfa TEMİZ (🟢). 0 🔴, 0 düzeltilmesi-gereken 🟡. Hiçbir dosya değiştirilmedi.**

Bu sayfa kümesi disiplinli, tutarlı bir mobil template üzerine kurulu ve gerçekten sağlam:
- Tüm public sayfalarda **tek sabit alt katman** (`nav.bottom-nav` z90, floating, responsive genişlik) — çift bottom-bar / çakışan şerit **hiç yok**.
- Üst sabit katman tek: `header.header` (h63, z60).
- Drawer (`#drawer`), randevu drawer (`#aptDrawer`), panel sidebar hep **off-canvas** (transform ile ekran dışı), açılınca scrim ile düzgün biniyor.
- Geniş içerik (ölçü-birimleri tabloları 640px, recete-builder 7×5 haftalık grid) **overflow-x:auto scroll container** içinde → sayfa kendisi yatay kaymıyor.
- Panel sayfalarında bottom-nav yok; sidebar drawer paterni kullanılıyor (yine tek katman).
- 320→390 px aralığında yatay taşma yok (scrollW her zaman viewport-altı: 390→375, 360→345, 320→305). Floating bottom-nav genişliği responsive, dar ekranda taşmıyor.

**Beyar'ın "çoğu yerde kayma" gözlemi bu 40 sayfada gerçeklenmedi.** Sorun büyük olasılıkla mobil1 kapsamındaki görsel-ağır sayfalarda (anasayfa/tarif/shop/hesap ailesi — hero/carousel/sticky-filtre yoğun) yoğunlaşıyor. Bu kümedeki sayfalar çoğunlukla form/içerik/utility olduğu için template disiplini kaymayı baştan engellemiş.

---

## Sayfa → Severity → Bulgu Tablosu

| # | Sayfa | Severity | Bulgu | Düzeltme |
|---|-------|----------|-------|----------|
| 1 | saglik-hub-v1 | 🟢 | 1 üst (header h63) + 1 alt (bottom-nav) katman; chip stripi kendi yatay-scroll'unda; scrollW 375 | — |
| 2 | hesaplayici-v1 | 🟢 | "Taşındı" yönlendirme bildirimi; temiz | — |
| 3 | bazal-metabolizma-v1 | 🟢 | Form dolduruldu + Hesapla → sonuç bloğu taşmadı (bl 1) | — |
| 4 | beden-kutle-endeksi-v1 | 🟢 | Hesapla sonrası temiz | — |
| 5 | gunluk-kalori-v1 | 🟢 | Hesapla sonrası temiz | — |
| 6 | gunluk-su-v1 | 🟢 | Hesapla sonrası temiz | — |
| 7 | ideal-kilo-v1 | 🟢 | Hesapla sonrası temiz | — |
| 8 | vucut-tipi-v1 | 🟢 | Hesapla sonrası temiz; alt scroll'da footer bottom-nav'ı ezmiyor | — |
| 9 | saglik-testler-v1 | 🟢 | Temiz | — |
| 10 | test-detay-v1 ?test=metabolizma | 🟢 | 8 adım akış boyunca bl 1, çakışma yok | — |
| 11 | test-detay-v1 ?test=hangi-yemek&sonuc=1 | 🟢 | Sonuç varyantı temiz | — |
| 12 | diyet-listeleri-v1 | 🟢 | Temiz | — |
| 13 | diyet-program-detay-v1 | 🟢 | Temiz | — |
| 14 | besin-kutuphanesi-v1 | 🟢 | Temiz | — |
| 15 | diyetisyen-dizin-v1 | 🟢 | 27 "küçük" hedef aslında 13–19px metin link + 36px kart/kaydet butonları (tasarım sistemi); overlap/overflow yok | — |
| 16 | diyetisyen-profil-v1 | 🟢 | Top/orta/alt scroll'da bl hep 1; scroll-tetikli sticky CTA yok | — |
| 17 | diyetisyen-ol-v1 | 🟢 | Başvuru formu temiz | — |
| 18 | panel-shell.html | 🟢 | Sidebar fixed left:-248 (off-canvas); bottom-nav yok; overflow yok | — |
| 19 | panel-shell.html?nav=1 | 🟢 | Mobil drawer açık: scrim + sol panel düzgün biniyor; overflow yok | — |
| 20 | dyt-danisanlar-v1 | 🟢 | Temiz | — |
| 21 | dyt-mesajlar-v1 | 🟢 | Composer position:relative (fixed değil) → çakışma yok | — |
| 22 | dyt-randevular-v1 | 🟢 | `#aptDrawer` fixed + translateX off-canvas (kapalı); scrollW 375 → gerçek taşma değil | — |
| 23 | dyt-receteler-v1 | 🟢 | Temiz | — |
| 24 | dyt-recete-builder-v1 | 🟢 | 7×5 haftalık grid yatay-scroll; sticky meal-label sütunu (bd-mealcol) + sticky toplam satırı (bd-totcol) — doğru mobil patern, çakışma yok | — |
| 25 | dyt-profil-ayar-v1 | 🟢 | Temiz; 0 console error | — |
| 26 | akademi-v1 | 🟢 | "Yakında" sayfası temiz | — |
| 27 | mutfaga-giris-v1 | 🟢 | Temiz | — |
| 28 | mutfak-sirlari-v1 | 🟢 | Temiz | — |
| 29 | puf-noktalari-v1 | 🟢 | Temiz | — |
| 30 | olcu-birimleri-v1 | 🟢 | Çevrim tabloları 640px ama overflow-x:auto container'da; sayfa scrollW 375 | — |
| 31 | sozluk-v1 | 🟢 | Temiz | — |
| 32 | giris-v1 | 🟢 | Temiz | — |
| 33 | onboarding-v1 | 🟢 | 6 adım akış boyunca bl 1, çakışma yok | — |
| 34 | hakkimizda-v1 | 🟢 | Temiz | — |
| 35 | iletisim-v1 | 🟢 | Temiz | — |
| 36 | sss-v1 | 🟢 | Temiz | — |
| 37 | yasal-v1 | 🟢 | Temiz | — |
| 38 | hata-v1 | 🟢 | 404 temiz | — |
| 39 | arama-v1 | 🟢 | Temiz | — |
| 40 | seo-landing-v1 | 🟢 | Temiz | — |
| 41 | reklam-ver-v1 | 🟢 | Medya kiti temiz | — |
| 42 | sezon-v1 | 🟢 | Ramazan sezon sayfası temiz | — |

> Not: 40 benzersiz sayfa + 2 ek varyant probu (test-detay 2. varyant, panel-shell ?nav=1) = 42 satır.

---

## Fixed Eleman Envanteri Özeti

İki tutarlı template ailesi:

**Public template (saglik, diyetisyen-public, rehber, auth, kurumsal, sezon vb.):**
- `header.header` — position:fixed, top:0, h63, z60 (tek üst katman)
- `nav.bottom-nav` — position:fixed, floating (left:16, responsive genişlik), z90 (tek alt katman)
- `#drawer.drawer` — position:fixed, off-canvas (kapalıyken left≈vw), z96; açılınca tam ekran scrim ile biner

**Panel template (panel-shell, dyt-*):**
- `.sidebar` — position:fixed, left:-248 (off-canvas), z yüksek; mobilde drawer olarak açılır
- Bottom-nav YOK → alt katman sayısı 0; tek katman kuralı doğal sağlanıyor
- Yardımcı drawer'lar (`#aptDrawer` vb.) fixed + translateX off-canvas

**Çakışma analizi:** Hiçbir sayfada aynı anda 2 görünür sabit alt katman yok → `bottomOverlap` her sayfada boş. Her ekranda en fazla 1 sabit alt katman kuralı **zaten karşılanıyor**.

---

## Sabit-Alt-Katman Karar Notu (lead kılavuzuna)

Brief'teki özel kural (sayfanın kendi sabit aksiyon şeridi VARSA global bottom-nav'a scroll-hide davranışı uygula) **bu kümede hiç tetiklenmedi**, çünkü:
- Hesaplayıcılarda "Hesapla" butonu **inline** (sabit şerit değil) — sonuç bloğu da normal akışta, taşmıyor.
- Test/onboarding akış butonları inline.
- Diyetisyen profilde scroll-tetikli sticky "Randevu Al" barı **yok** (top/mid/bottom scroll'da bl hep 1).
- Panel sayfalarında bottom-nav yok; sohbet composer'ı bile relative.

**Sonuç:** Scroll-hide JS davranışı bu 40 sayfada gerekmedi; tek-katman zaten yapısal olarak sağlanıyor. Eğer ileride bir sayfaya kendi sabit alt aksiyon şeridi eklenirse, o zaman brief'teki kanonik scroll-hide patern'i (`.is-hidden` + `translateY(100%)`, ~0.25s, scrollY delta threshold ~12px, body padding-bottom ayarı) uygulanmalı. Şu an uygulanacak yer yok.

---

## Değişen Dosya Listesi

**Hiçbiri.** Düzeltme gerektiren bulgu çıkmadı. (Sadece denetim altyapısı yazıldı: `mockups/.ss-scratch/revize2/mobil2/diag.js`, `diagc.js`, `diags.js` — bunlar mockup dosyası değil, scratch'te kalıyor.)

---

## Çözülemeyen / Tereddüt Listesi

- **Çözülemeyen 🔴/🟡 yok** (loop sigortası tetiklenmedi).
- **Tereddüt — gerçek-cihaz farkı:** Beyar'ın gerçek telefonda gördüğü "kayma" bu headless sweep'te (390 + 360 + 320 stres dahil) gerçeklenemedi. Olası gerçek-cihaz nedenleri ve makul varsayımım:
  - iOS Safari dinamik viewport (URL bar açılıp kapanırken 100vh / bottom:0 fixed eleman titremesi) — headless'te simüle edilemez; ancak floating bottom-nav `bottom` + güvenli margin kullandığı için risk düşük.
  - Görsel yükleme kaynaklı layout shift (CLS) — img boyut attribute'ları eksikse içerik yüklenirken zıplayabilir; bu "üst üste binen fixed eleman" değil, ayrı bir sınıf. Brief'in tarif ettiği kayma türü (çakışan sabit katman/grid kırılması) bu kümede yok.
  - **Varsayım:** Beyar'ın gördüğü kaymanın ağırlığı mobil1 kapsamındaki görsel-ağır sayfalarda. Bu kümede yapısal kayma kanıtı bulunamadı; sayfalar olduğu gibi bırakıldı.
- **Tasarım sistemi notu (düzeltilmedi, kapsam dışı):** Filtre chip'leri ~30px, kart/kaydet ikon butonları ~36px yükseklikte (44px altı). Tutarlı bir tasarım-sistemi tercihi; "kayma" değil. Dokunmak tasarım dilini değiştirir → kapsam kilidi gereği dokunulmadı. Lead isterse global token olarak ayrı ele alınabilir.

---

## Ekran Görüntüsü Yolları

Tümü `mockups/.ss-scratch/revize2/mobil2/` altında:
- `saglik-hub-390-clean.jpeg` — public template temsilci (tam sayfa, 390)
- `_calib-panel-shell.jpeg` — panel + ?nav=1 drawer (tam sayfa, 390)
- `_calib-recete-builder.jpeg` — en karmaşık sayfa, haftalık grid (tam sayfa, 390)
- `_calib-vucut-bottom.jpeg` — alt scroll'da floating bottom-nav + footer ilişkisi (viewport, 390)

Kalan 36 sayfa için kanıt: per-sayfa diagnostik JSON çıktıları (bu rapordaki tablo) + tekrar üretilebilir probe (`diag.js`/`diags.js` fetch+eval). Hiçbiri düzeltme gerektirmediği için before/after SS üretilmedi (baseline-temiz).

---

## Lead İçin Tekrar-Üretim Notu

Herhangi bir sayfayı doğrulamak için (sunucu ayakta, http://localhost:8765):
```js
// browser_resize 390×844, sayfayı aç, sonra:
async () => { eval(await (await fetch('/mockups/.ss-scratch/revize2/mobil2/diag.js')).text());
              eval(await (await fetch('/mockups/.ss-scratch/revize2/mobil2/diags.js')).text());
              return await window.__diags(); }
```
Beklenen: `maxBl ≤ 1`, `bottomOverlap: []`, `hOverflow: false`, `maxScrollW ≤ vw`.

---
---

# EK — Task #6: First-Visit/Post-Consent Katman Doğrulaması (düzeltilmiş filtre)

**Tarih:** 2026-06-12 (Task #2 sonrası)
**Tetik:** Lead, Task #2 diag filtresinde kör nokta tespit etti — `bottom>vh-20` (824) bandı çerez kartını kaçırıyordu.

## Kör nokta — DOĞRULANDI (canlı, codemod öncesi)

Task #2'deki `__diag` filtresi iki katlı kör noktaya sahipti:
1. **Bant hatası:** Çerez kartı mobilde `position:fixed; bottom:80px` → rect.bottom ≈ vh−80 = **764**, benim `bottom>824` bandımın **altında** → sayılmıyordu.
2. **Zamanlama:** Banner `setTimeout(700ms)` ile beliriyor; Task #2 probe'larım ~220ms scroll bekleme ile snapshot aldığı için banner henüz görünmemişti.

Sonuç: first-visit'te **çerez kartı + bottom-nav = 2 yığılı sabit alt katman** kaçırılmıştı. Düzeltilmiş detektörle codemod-öncesi saglik-hub'da canlı doğrulandı:
`first-visit (pre-codemod) → 2 katman: nav.bottom-nav (z90, bottom:14px, 766–830) + #cookieBanner (z95, bottom:80px, 576–764)`. → Beyar kuralı "en fazla 1" ihlali. (Bu, Beyar'ın gerçek-cihazda gördüğü "kayma" hissinin bu kümedeki ana kaynağıydı; Task #2'de kaçmıştı.)

## Düzeltilmiş detektör (`diag2.js` / `tool/probe-all.js`)

Bottom-PINNED katman tanımı kesinleştirildi:
- `position:fixed` **ve** computed `bottom !== 'auto'` **ve** `bottom < vh*0.5` (üste değil alta sabitli) **ve** `rect.bottom > vh*0.5` **ve** `rect.height < vh*0.55` (kısa şerit/kart) **ve** `rect.width > vw*0.4`.
- **Hariç:** off-canvas L/R (kapalı drawer), ekran-altına itilen `bn-hidden` nav (`rect.top >= vh`), ve **sticky-top filtre/kategori şeritleri** (`position:sticky; top:62px` — örn. `.dl-filter`, `.pf-tabbar`; bunlar y=0'da viewport ortasında durup eski gevşek heuristik'i yanıltıyordu).

## Yöntem

Bağımsız Node Playwright harness (`tool/probe-all.js`, playwright-core + sistem Chrome, **gerçek zaman** — sezon countdown'unun virtual-time hang'i bu yüzden yok):
- **34 sayfa** (codemod.js `pages[]` = 32 mobil2 + kesfet-v1, **+ `_shell.html`** kanonik template; muaf: 6 dyt-* + panel-shell + hesaplayici-v1)
- **2 durum × 3 scroll** (top/mid/bottom):
  - **first-visit:** taze browser context (consent yok) + `?cc=1` (banner zorla) + 1150ms bekleme
  - **post-consent:** `addInitScript` ile `localStorage['dm-cookie-consent']='accepted'` tohumlanmış ayrı context + düz URL
- **Kabul:** her sayfa+durum için max bottom-layer ≤ 1, çakışma yok, yatay taşma yok.
- **Çapraz doğrulama:** ayrıca MCP browser ile (ayrı araç) saglik-hub her iki durum + diyet-listeleri first-visit bağımsız tekrar — birebir örtüştü.

## Sonuç: 34/34 PASS ✅ (33 sayfa + `_shell.html`)

| Durum | Beklenen | Gözlenen (34/34) |
|-------|----------|------------------|
| first-visit | sadece çerez ≤1 katman | **1 katman** (cookieBanner; nav `bn-hidden` ile ekran-altı) |
| post-consent | nav veya sayfa şeridi ≤1 katman | **1 katman** (bottom-nav) |

Hiçbir sayfada çakışma (overlap) veya yatay taşma yok. `__bnUpdate` manager doğru çalışıyor: çerez `.show` olunca nav `bn-hidden` (translateY(calc(100%+30px)) → rect.top 860 > vh 844, görünmez); dismiss/scroll-up'ta geri geliyor.

## Süreçte bulunan ve giderilen 3 yanlış-alarm (ilk turda)

İlk turda 3 FAIL çıktı, hepsi **gerçek bug değil**:
- `diyet-listeleri-v1`, `sss-v1`: detektör yanlış-pozitifi — `.dl-filter` / `.pf-tabbar` sticky-**top** şeritleri (top:62px) y=0'da viewport ortasında durunca gevşek heuristik onları "alt katman" sandı. Kriter bottom-pinned'e daraltılınca → 1 katman → PASS. (Bu şeritler nav/çerez ile alt-yığılma YAPMIYOR; overlap her zaman boştu.)
- `saglik-hub-v1` post-consent: tek seferlik `goto` timeout (transient). `waitUntil:'domcontentloaded'` + 30s timeout ile giderildi; tekrar koşumda PASS (MCP ile de ayrıca PASS doğrulandı).

## Değişen dosya listesi

**Mockup dosyası: HİÇBİRİ** (bu task salt doğrulama). Codemod'u (#5) başka ajan/lead uyguladı; ben yalnız bağımsız doğruladım.
Üretilen denetim altyapısı (scratch, mockup değil): `.ss-scratch/revize2/mobil2/diag2.js`, `probe2.js`, `tool/probe-all.js`, `tool/out/probe-results.json`.

## Kanıt / SS yolları

- `tool/out/probe-results.json` — 34 sayfa (33 + `_shell`) × 2 durum × 3 scroll ham sonuç + PASS/FAIL
- `_firstvisit-diyet-listeleri-390.jpeg` — money-shot: first-visit'te SADECE çerez kartı altta, bottom-nav gizli (sticky "Hedef" filtre orta-sayfada, alt katman değil)
- Tekrar-üretim: `cd tool && NODE_PATH=../../mobil1/tool/node_modules node probe-all.js` (sunucu :8765 ayakta olmalı)

## Task #2 düzeltmesi (kayıt için)

Task #2 raporundaki "40/40 temiz" sonucu **bottom-nav çakışması/overflow açısından doğru** kaldı; ancak **first-visit çerez+nav yığılması** o turda kaçmıştı (post-consent state'te + dar bantlı filtre + 700ms timing). Bu EK o boşluğu kapatır: kanonik `bn-hidden` codemod'u sonrası 34/34 sayfa (`_shell` template dahil) first-visit dahil tek-katman kuralına uyuyor.
