# DadaMutfak Üretim Planı — Tier Yapısı (Beyar onaylı)

> Güncelleme: 2026-06-11 (Dalga 2 kapandı, kapanış paketi uygulandı). Tek doğruluk
> kaynağı: dalga durumu burada, günlük ilerleme `tasks/handoff.md`'de.

## TIER 0 — TAMAMLANDI ✔

- Ana sayfa (`mockups/anasayfa-portal-v3a.html`, kanonik baz)
- Tarif Detay F1 (`mockups/tarif-detay-v1.html`, Tur 1 + 1.5 + 2)

## TIER 1 — DALGA 1 — TAMAMLANDI ✔ (2026-06-11)

| Teammate | Sayfa | Faz |
|---|---|---|
| `liste` | `tarif-liste-v1.html` | F2 |
| `video` | `video-mutfagi-v1.html` | F3 |
| `form` | `tarif-ekle-v1.html` (form kiti doğdu) | F5 |
| `profil` | `mutfak-defteri-v1.html` | F7 |

Ön koşullar: `mockups/_shell.html` + `tasks/bilesen-kilavuzu.md`.

## TIER 2 — DALGA 2 — TAMAMLANDI ✔ (Beyar onaylı, 2026-06-11)

| Teammate | Sayfalar | Faz |
|---|---|---|
| `kesif` | bugun-ne-pisirsem, tarif-bulucu (DOLAP), haftalik-menu (canlı liste), kesfet | F4 + ara iş ③ |
| `shop` | dada-shop, urun-liste, urun-detay + sepet izleri | F8 |
| `saglik` | saglik-hub, hesaplayici (şablon), saglik-testler, diyet-listeleri, besin-kutuphanesi | F10 + ara iş ② |
| `diyetisyen` | diyetisyen-dizin, diyetisyen-profil, diyetisyen-ol | F12a |
| `landing` | kategori, koleksiyon, seo-landing, gunun-menusu | ara iş ① |

+ **Site-içi navigasyon bağlandı** (lead; `mockups/.ss-scratch/navbind.py`).
+ **Kapanış paketi:** hero-üst nefes standardı · tarif-liste taşma fix portu ·
  `.rev-*` kanonik · v3a stopPropagation. Sentez: `outputs/dalga2-sentez.md`.

## TIER 3 — PARALEL DALGA 3 (sıradaki — scope NETLEŞTİ)

- **Shop II (F9):** sepet + ödeme + sipariş takip + alışveriş listesi sayfası
  (header sepet ikonu/dmCart buna bağlanır)
- **Mutfak Rehberi ailesi (F11):** mutfağa giriş + temel teknikler + püf noktaları +
  sözlük + ölçü birimleri (nav'da `#` bekleyen linkler bağlanır)
- **Auth + onboarding + hesabım + bildirimler (F6):** bottom-nav "Hesap" gerçek
  hedefine kavuşur; kaydet/deftere-ekle login kapısı
- **Hesaplayıcı ×6 TAM SAYFA** (Beyar kararı — şablondan türetilir: BKİ, BMH,
  kalori, vücut tipi, su, ideal kilo)
- **tarif-bulucu alerjen/"İstemediklerim" filtresi** (Beyar kararı — geri gelecek)
- **Diyet program-detay sayfası** (günlük menü dökümü)
- Pişirme modu derinleşmesi + yazdır görünümü (Dalga 1 ara işi)

## TIER 4 — BABYSIT SOLO (ajana verilmez)

- Diyetisyen panel shell (F12b)
- Reçete builder + danışan paneli (F12c)

## TIER 5 — OTOMATİK KAPANIŞ

- Sezon + kurumsal + yasal + hata sayfaları + global arama (F13 + kalanlar)

## KURALLAR

- Her teammate SADECE kendi `mockups/<sayfa>-v1.html` dosyasına yazar;
  `handoff.md` / `lessons.md` / kanonik baz + önceki dalga dosyaları **READ-ONLY**
  (lead, Beyar onaylı href/fix geçişleri yapabilir).
- **L1 kuralı her sayfada zorunlu:** eski template blok envanteri üretimden
  ÖNCE çıkarılır + kıyas sunulur.
- Tutarlılık `tasks/bilesen-kilavuzu.md`'ye birebir (§2b miras + §3 header-altı
  nefes kuralı dahil).
- Teammate çıktısı: sayfa + 1440/500 SS + konsol 0 hata + 390 taşma probu +
  `outputs/<sayfa>-rapor.md`.
- Yeni sayfalar doğduğunda navigasyon: `navbind.py` güncellenip yeniden koşulur.
- **COMMIT dalga sonunda Beyar onayıyla toplu.**
- Dalga sonu ritüeli: Beyar SS turu → seri revize → patron onayı → toplu commit →
  handoff güncelle → clear → sonraki dalga.
