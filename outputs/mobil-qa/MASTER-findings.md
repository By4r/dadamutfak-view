# DadaMutfak — MOBİL QA MASTER BULGULAR
> Üretim: 2026-06-14 · 5 tester paralel (T1–T5) + lead adversarial doğrulama.
> Kapsam: **74 üretim sayfası** (`mockups/*.html` − 7 `ref-*` − `_overflow_probe`),
> her biri **390 / 768 / drawer** = 219 full-page SS (`outputs/mobil-qa/ss/`).
> Ölçüm = `measure.cjs` (clip-aware: kasıtlı scroll-container taşması hariç tutulur);
> taşma = `docSW > viewport+1` **veya** `unclipped > 0` (göz değil, ölçüm).
> Tema bulguları SS'lerin tasarımcı-gözü incelemesiyle.

## 📊 Genel tablo
- **Ölçülen gerçek yatay taşma: yalnız 1 sayfa** (dyt-danisanlar @768). Kalan 73 sayfa
  390/768'de `docSW=viewport`, console error = 0.
- Geri kalan bulgular = **görsel sıkışma / scroll-affordance / renk tutarlılığı** (layout kırılması değil).
- Lead doğrulaması **3 yanlış-pozitifi eledi** (T1 drawer "içerik sızması" = fullPage SS artefaktı).

| Severity | Adet | Özet |
|---|---|---|
| 🔴 Critical | 1 | dyt-danisanlar @768 gerçek tablo taşması (docSW=870) |
| 🟠 Major | 5 | ansiklopedi grid · urun-liste/dada-shop grid · tarif-detay chip tekrarı · dyt-randevular + dyt-recete-builder scroll-affordance |
| 🟡 Minor | 7 | puf-noktalari kart · kategori 768 filtre · siparislerim 768 · olcu-birimleri tab wrap · sağlık nav-aktif renk · drawer body scroll-lock · sofra görsel ton |
| ℹ️ Note / Yanlış-poz | 5 | T1 drawer ×3 (fullPage artefaktı) · hesaplayici redirect · tarif-ekle bodySW quirk |

---

## 🔴 CRITICAL (1)

### C1 · dyt-danisanlar-v1 @ 768 — gerçek tablo taşması
- **Ölçüm:** `docSW=870` (viewport 768), 42 unclipped element. SS: `ss/dyt-danisanlar-v1__768.png`
- **Kök neden:** danışan tablosu `.ptable` için `overflow-x:auto` sarmalayıcı yalnız `@media(max-width:640px)` içinde tanımlı; 768px o kuralın dışında kalıyor → tablo 870px'e uzayıp sayfayı yatay taşırıyor.
- **Fix:** scroll wrapper'ı breakpoint'ten bağımsız yap veya `@media(max-width:980px)` bloğuna taşı. (Tester: T5)

---

## 🟠 MAJOR (5)

### M1 · tarif-detay-v1 @ 390+768 — hero özellik-chip TEKRARI  ⟵ **FAZ B fix hedefi**
- Hero overlay `tbadge`'lerinde "Protein Ağırlıklı" + "Baharatlı"; aynı ikisi künyenin `kc-chips` panelinde de var (+"Acılı"). Mobilde tek kolona düşünce kullanıcı aynı chip'i hero'da bir, scroll'da bir görüyor = tekrar/kalabalık.
- **Referans çözüm zaten projede:** `tarif-detay-v1-headA` bu sorunu çözmüş → hero yalnız editöryal rozet (Editör Onaylı, Diyetisyen Yorumlu), içerik chip'leri ayrı panelde. (T4)
- **Fix:** hero tbadge'lerden ÖZELLİK chip'lerini kaldır, yalnız Editör Onaylı + Diyetisyen Yorumlu bırak. (Editöryal rozet ≠ özellik chip, karıştırma.)

### M2 · ansiklopedi-v1 @ 390 — 3-kolon kare grid çok sıkışık  *(T3: 🔴)*
- Malzeme kategori grid 3 kolon, kart eni ~118px; uzun etiket ("Baharat & Çeşni") 2 satıra kırılıp görselle çakışıyor. Ölçüm temiz (grid taşmıyor) ama görsel olarak kırık → severity 🟠/🔴 sınırında.
- **Fix:** 390'da `grid-template-columns` 2 kolona düş, 768'de 4 kolon kalsın. (T3)

### M3 · urun-liste-v1 + dada-shop-v1 @ 390 — ürün grid 2-kolon sıkışması
- ~165–175px kart eni; uzun ürün adları 3 satır sarıyor, aynı satır kartları dengesiz yükseklik.
- **Fix:** başlığa `-webkit-line-clamp:2` zorla, ya da 390'da tek kolon. (T3)

### M4 · dyt-randevular-v1 — haftalık takvim scroll affordance zayıf
- Takvim `cal-scroll` içinde (390'da yalnız Pzt/Sal/Çar görünür, kalan günler scroll arkasında); ince scrollbar "devam ediyor" sinyalini vermiyor → kullanıcı günleri kaçırır. (Taşma değil, UX.) (T5)
- **Fix:** kaydırma oku veya "Pzt–Paz" gün-aralığı hint.

### M5 · dyt-recete-builder-v1 @ 390 — 7-günlük plan scroll affordance zayıf
- `.bld-scroll` 7 gün içeriyor, 390'da 2 gün görünüyor, scroll şeridi belirsiz. (T5)
- **Fix:** "← → kaydır" chip veya ilk yüklemede ileri-gün partial peek.

---

## 🟡 MINOR (7)

| # | Sayfa | bp | Bulgu | Fix önerisi | T |
|---|---|---|---|---|---|
| m1 | puf-noktalari-v1 | 390 | yatay kart sağ metin sütunu <200px, başlık 3-4 satır | 390'da dikey kart (görsel üst/metin alt), yatay 480px+'da | T3 |
| m2 | kategori-v1 | 768 | sol filtre sidebar oranı dar | filtre/grid oranını dengeleyebilir | T3 |
| m3 | siparislerim-v1 | 768 | sipariş kartı tek kolon kalmış (2 kolon beklenebilir) | tablet 2-kolon (işlevsel, opsiyonel) | T3 |
| m4 | olcu-birimleri-v1 | 390 | kategori tab şeridi 2 satıra wrap (4 uzun etiket) | tab şeridini overflow-x scroll'a al | T5 |
| m5 | sağlık alt sayfaları | 390/768 | nav-aktif öğe TURUNCU kalıyor (yeşil override yalnız saglik-hub href'inde) | hesaplayıcı alt sayfa href'lerine de yeşil aktif-override | T5 |
| m6 | site-geneli drawer | drawer | drawer açıkken `body overflow-y:auto` (scroll-lock yok) — overlay görsel olarak kapatıyor ama arka plan teknik kaydırılabilir | drawer open'da `body{overflow:hidden}` | lead |
| m7 | sofra-duzeni-v1 | 390 | Ramazan/Bayram/Açık Büfe görsel TON (localhost'ta gri; gerçek ortamda kontrol) — **Beyar gözü, fix YOK** | aday swap gorsel-ID.md'de | T2 |

---

## ℹ️ NOTE / YANLIŞ-POZİTİF (lead doğrulamalı)

- **T1 drawer ×3 = YANLIŞ-POZİTİF** (lead DOM + viewport-only SS ile doğruladı):
  - `hakkimizda-v1` (T1: 🔴 "drawer'a içerik sızması"), `akademi-v1` (T1: 🟠 "overlay kapatmıyor"), `reklam-ver-v1` (T1: 🟠 "scroll-lock").
  - **Gerçek:** `#drawer` z96 fixed, h=780 (tam viewport), tam 3 düzgün child (head/nav/foot); `#drawerOverlay` z95 opacity:1 tüm viewport'u kaplıyor. Sayfa içeriği drawer'ın ARKASINDA + overlay altında — **fullPage SS** bunu fixed-drawer'ın dikine altına ekliyor = sanrı. Kanıt SS: `ss/_VERIFY-hakkimizda-v1-drawer-viewport.png` (viewport-only, drawer temiz). Tek gerçek kalıntı = m6 (body scroll-lock, minör).
- **hesaplayici-v1** = redirect stub (`<meta refresh 2s>` → beden-kutle-endeksi); QA edilecek içeriği yok, hedef sayfa zaten kapsandı. 2sn bekleme UX zayıf (karar). (T5)
- **tarif-ekle-v1 @768 `bodySW=827`** = `overflow-x:auto` adım-foto strip'inin scroll-width yansıması, gerçek taşma DEĞİL (unclipped=0). (T4)
- **diyetisyen-profil-v1** menu-thumbs 4-kolon @390 ~82px — küçük ama taşma yok. (T4)
- **olcu-birimleri SVG turuncu stroke** = kasıtlı marka ikonu, sağlık-yeşil sızıntısı DEĞİL. (T5)

---

## ⚖️ KARAR GEREKEN (IA/UX) — fix YOK, Beyar/patron kararı

1. **Navigasyon tutarsızlığı — `kategori-v1` vs `tarif-liste-v1`** (handoff cila #1): Anasayfa "Kategoriler & Dünya Mutfakları" → `kategori-v1` ("Alt kategoriler" şeridi); Tarifler menüsü → `tarif-liste-v1` ("Tema & pişirme tipi" şeridi). İki ayrı liste sayfası = kafa karıştırıcı. **Karar:** hangi giriş hangisini açacak (öneri: kategori-v1 = belirli kategori detayı, tarif-liste = genel dizin; ama kullanıcıya net olmalı). **Bu turda DOKUNULMADI.**
2. **Sofra Düzeni görsel ton** (m7): Ramazan/Bayram/Açık Büfe "kurulmuş masa" tutarlılığı + Açık Büfe karanlık. Beyar gözü; aday swap'lar `outputs/sofra-duzeni-gorsel-ID.md` yedek havuzunda. **Fix YOK, aday not.**
3. **hesaplayici-v1 redirect 2sn**: anında yönlendirme mi, yoksa "yönlendiriliyorsunuz" ekranı mı — minör UX kararı.
4. **siparislerim/kategori tablet oranları** (m2, m3): işlevsel, opsiyonel — patron isterse.

---

## 🧰 Ortam notu (gelecek QA için)
- Ölçüm scripti: `outputs/mobil-qa/measure.cjs` (CommonJS). Çalıştırma:
  `NODE_PATH=/Users/dadaistanbul/.npm/_npx/9833c18b2d85bc59/node_modules node outputs/mobil-qa/measure.cjs <page.html> --ss`
- `chromium.launch({channel:'chrome'})` sistem Chrome'u kullanıyor; MCP playwright SS'i bu oturumda timeout verdi → viewport-only doğrulama node ile alındı (`/tmp/vpshot.cjs` deseni).
- Partition: `outputs/mobil-qa/PARTITION.md`. Tester ham raporları: `T1..T5-findings.md`.
