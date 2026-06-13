# Hero Denetim Raporu — DadaMutfak (hero-zengin teammate, ADIM 1)

> Kanon: `tasks/bilesen-kilavuzu.md` §2f (H1/H2/H3 + hak-ediş). Zengin örnek: `mutfaga-giris-v1`.
> Yöntem: `*-top`/`*-hero` class envanteri (grep) + her top-class CSS bloğunda
> `background-image`/`url()`/`unsplash` taraması (python balanced-brace parse) + örneklem render SS.
> Kapsam: 81 .html → 71 üretim sayfası (hariç: `_shell`, `_overflow_probe`, `panel-shell`,
> `ref-*` 7 dosya). Üretimin içinden **KAPSAM DIŞI**: shop ailesi 5 (`dada-shop`, `urun-liste`,
> `urun-detay`, `sepet`, `odeme`) + panel ailesi 6 (`dyt-*`). Net denetlenen: **60 sayfa**.

---

## ÖZET

- **SADE → görselli yapılacak: 23 sayfa** (düz beyaz/krem kompakt üst-blok, hero görseli YOK).
- **ZENGİN (zaten görselli) — dokunma: 34 sayfa.**
- **MUAF (kasıtlı görselsiz / chrome'suz / hero kavramı yok): 3 sayfa.**

Beyar kararı: TÜM sade heroları görselli istiyor — araç/hesaplayıcı/form sayfaları DAHİL
(§2f H1 OVERRIDE). Yalnız shop + panel kapsam dışı.

---

## A. SADE SAYFALAR (zenginleştirilecek — 23)

Görsel teması bağlama uygun seçildi. ** Aile** sütunu = önerilen overlay varyantı:
- **lst** = domates/koyu overlay `linear-gradient(90deg,rgba(28,25,18,.93),rgba(33,30,22,.72))` (genel)
- **sh** = sağlık yeşil-tint `rgba(18,28,22,.94),rgba(20,32,25,.74)` (Sağlık menüsü altı sayfalar)

| # | Dosya | Üst-blok class | Mevcut durum | Önerilen görsel teması | Aile |
|---|-------|----------------|--------------|------------------------|------|
| 1 | alisveris-listesi-v1 | `.al-top` | beyaz, kompakt | market sepeti / taze sebze-meyve flatlay | lst |
| 2 | arama-v1 | `.srch-top` | beyaz, kompakt | baharat & malzeme flatlay (üstten) | lst |
| 3 | bazal-metabolizma-v1 | `.calc-top` | krem | sağlıklı tabak / metabolizma | sh |
| 4 | beden-kutle-endeksi-v1 | `.calc-top` | krem | sağlıklı tabak + ölçü/mezura | sh |
| 5 | besin-kutuphanesi-v1 | `.nb-top` | krem | taze sebze / besin flatlay | sh |
| 6 | bildirimler-v1 | `.nt-top` | beyaz | sıcak mutfak ambiyans | lst |
| 7 | diyetisyen-ol-v1 | `.ol-top` | beyaz (form) | diyetisyen / danışmanlık / sağlıklı sofra | sh |
| 8 | giris-v1 | `.au-top` | krem (auth) | sıcak mutfak ambiyans / pişiren eller | lst |
| 9 | gunluk-kalori-v1 | `.calc-top` | krem | sağlıklı tabak / kalori | sh |
| 10 | gunluk-su-v1 | `.calc-top` | krem | su / hidrasyon bardağı | sh |
| 11 | haftalik-menu-v1 | `.hm-top` | beyaz | haftalık meal-prep / planlama masası | lst |
| 12 | hesabim-v1 | `.hs-top` | beyaz | sıcak mutfak ambiyans | lst |
| 13 | ideal-kilo-v1 | `.calc-top` | krem | sağlıklı tabak / tartı | sh |
| 14 | iletisim-v1 | `.con-top` | beyaz | sıcak mutfak / iletişim ambiyans | lst |
| 15 | olcu-birimleri-v1 | `.ob-top` | krem | mutfak tartısı / ölçü kaşığı-bardağı | lst |
| 16 | onboarding-v1 | `.bnp-top` (plain) | beyaz (wizard) | hoş geldin / sıcak mutfak | lst |
| 17 | puf-noktasi-ekle-v1 | `.fp-top` | beyaz (form) | pişirme ipuçları / not alan şef eli | lst |
| 18 | sef-ol-v1 | `.ol-top` | beyaz (form) | profesyonel mutfakta şef | lst |
| 19 | siparislerim-v1 | `.ord-top` | beyaz | mutfak gereçleri / paket-kargo + tezgah | lst |
| 20 | tarif-ekle-v1 | `.fp-top` | beyaz (form) | tezgahta malzeme / tarif yazımı | lst |
| 21 | test-detay-v1 | `.tst-top` | krem | sağlıklı tabak (sağlık aile tutarlılığı) | sh |
| 22 | vucut-tipi-v1 | `.calc-top` | krem | sağlıklı beden / tabak | sh |
| 23 | yasal-v1 | `.lg-top` | beyaz | belge / hukuki — muted sıcak mutfak | lst |

> Not: **test-detay** §2f'de "lead kararı"na bırakılmıştı; sağlık ailesi (BKE/metabolizma)
> ile aynı menü altında → `sh-top` yeşil öneriyorum. Beyar farklı isterse lst'e döner.
> **siparislerim** §2f'de "H2b verify-only" idi; gerçekten sade (görselsiz) çıktı → Beyar
> "istisna yok" kuralı gereği listede. Künye yapısı korunur, sadece üste görselli zemin gelir.

---

## B. ZENGİN SAYFALAR (zaten görselli — DOKUNULMAYACAK — 34)

Kontrol için. Hepsi arka plan görseli + koyu/yeşil overlay taşıyor.

**H1 `.lst-top`+`.lst-hero` (17):** akademi, ansiklopedi, diyetisyen-dizin, gunun-menusu,
hakkimizda, kategori, koleksiyon, mekan-liste, mutfaga-giris (KANON), puf-noktalari,
reklam-ver, sefler, seo-landing, sezon, sozluk, sss, tarif-liste.

**H1 sağlık `.sh-top` yeşil (2):** saglik-hub, saglik-testler (Faz3'te krem→yeşil çevrilmiş, IMG teyit).

**H2a editoryal `.art-hero` (2):** kesfet, puf-noktasi-detay.

**Koyu hub `.vhub-hero` (1):** video-mutfagi.

**Kendi CSS'inde görselli üst-blok (5):** bugun-ne-pisirsem (`.bnp-top` IMG),
diyet-listeleri (`.dl-top` IMG), diyet-program-detay (`.dl-top` IMG),
mutfak-sirlari (`.hub-top` IMG), tarif-bulucu (`.tb-top` IMG).

**H2b detay `.rd-head` görselli (5):** tarif-detay, tarif-detay-headA, mekan-detay,
ansiklopedi-detay, mutfaga-giris-detay — `.rd-top` crumb şeridi beyaz AMA hemen altındaki
`.rd-head` tam-genişlik tarif/mekan görseli + overlay taşıyor (SS ile teyit). H2b kanonu;
sade DEĞİL.

**Profil `.pf-top` banner görselli (2):** diyetisyen-profil, mutfak-defteri — banner görseli +
avatar + sayaç (SS ile teyit). §2f: profil kendi dili, H1/H2/H3 dışı. Sade DEĞİL.

---

## C. MUAF SAYFALAR (görselsiz ama kasıtlı / hero kavramı yok — 3)

| Dosya | Neden muaf |
|-------|-----------|
| anasayfa-portal-v3a | Anasayfa; kendi portal hero'su var, crumb taşımaz (§2f kasıtlı). |
| hata-v1 | 404; crumb taşımayan kasıtlı sayfa (§2f). |
| hesaplayici-v1 | Yönlendirme/deprecation interstitial — header/chrome YOK, ortalı kart "Hesaplayıcılar ayrı sayfalara taşındı". Hero kavramı yok (panel gibi). |

---

## D. KANIT

**Class envanteri (grep):** 60 denetlenen sayfada üst-blok class'ları çıkarıldı; site header
`.h-top` filtrelendi. Sade adayların top-class CSS bloğunda `url()`/`unsplash` = 0 (plain
`background:var(--bg-white|--bg-cream)`); zengin olanlarda IMG bulundu. (Gövdedeki inline
`background-image` sayıları yüksek ama bunlar kart/avatar görselleri — hero değil.)

**Render SS (örneklem, `outputs/hz-ss/`):**
- `olcu-birimleri-v1.png` — krem kompakt H3, görsel YOK ✅ sade teyit
- `arama-v1.png` — beyaz kompakt, görsel YOK ✅ sade teyit
- `siparislerim-v1.png` — beyaz kompakt başlık, görsel YOK ✅ sade teyit
- `mutfaga-giris-v1.png` — koyu overlay görselli H1 ✅ zengin kanon (hedef dil)
- `tarif-detay-v1.png` — `.rd-head` görselli detay hero ✅ zengin (H2b, sade değil)
- `mutfaga-giris-detay-v1.png` — `.rd-head` görselli ✅ zengin
- `diyetisyen-profil-v1.png` — `.pf-top` banner görselli ✅ zengin (profil dili)
- `hesaplayici-v1.png` — chrome'suz redirect kartı ✅ muaf teyit

---

## E. BİLİNEN SINIRLAMALAR / VARSAYIMLAR

1. **SS standalone headless Chrome ile alındı** (Playwright MCP tarayıcısı başka teammate
   tarafından kilitliydi — "Browser is already in use"). 1280px masaüstü; mobil 390 taşma
   probe'u ADIM 2'de yapılacak.
2. **`background-image` tespiti CSS-rule + inline kısmen** — tespit top-class'ın CSS bloğuna
   dayalı. Inline `style` ile hero'ya görsel basan bir sayfa olsaydı kaçabilirdi; ancak
   sade adayların hepsi örneklem/spot SS ile görsel teyit edildi (plain).
3. **test-detay & siparislerim aile/varyant kararı** Beyar onayına bırakıldı (yukarıda not).
4. **Görsel temaları öneri** — kesin Unsplash URL'leri ADIM 2'de seçilecek; v3a filtre suffix
   (`exp=7&gam=6&sat=-9&high=8&vib=5`) uygulanacak.
5. **Sayım:** 60 denetlenen = 23 sade + 34 zengin + 3 muaf. (Üretim 71 = 60 + 5 shop + 6 panel.)
</content>
</invoke>
