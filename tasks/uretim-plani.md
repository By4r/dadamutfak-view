# DadaMutfak Üretim Planı — Tier Yapısı (Beyar onaylı)

> Güncelleme: 2026-06-11. Tek doğruluk kaynağı: dalga durumu burada,
> günlük ilerleme `tasks/handoff.md`'de.

## TIER 0 — TAMAMLANDI ✔

- Ana sayfa (`mockups/anasayfa-portal-v3a.html`, kanonik baz)
- Tarif Detay F1 (`mockups/tarif-detay-v1.html`, Tur 1 + 1.5 + 2)

## TIER 1 — PARALEL DALGA 1 (agent team, 4 teammate)

| Teammate | Sayfa | Faz |
|---|---|---|
| `liste` | Tarif Liste/Arama | F2 |
| `video` | Video Mutfağı hub + seri + dikey 9:16 | F3 |
| `form` | Tarif Ekle stepper | F5 |
| `profil` | Mutfak Defteri public profili | F7 |

**ÖN KOŞUL (lead'in ilk görevi, dalga başlamadan):**
1. `mockups/_shell.html` — v3a'dan kanonik iskelet (token/topbar/header/mega
   menü/footer/çerez/feedback BİREBİR).
2. `tasks/bilesen-kilavuzu.md` — v3a + tarif-detay-v1 bileşen envanteri.
   Tarif-detay'dan satır numarası VERME, class referansı yeter.

## TIER 2 — PARALEL DALGA 2 (Dalga 1 onayından sonra)

- Keşif & Planlama (F4)
- Dada Shop vitrin/liste/ürün detay (F8)
- Sağlık (F10)
- Diyetisyen public (F12a)

## TIER 3 — PARALEL DALGA 3

- Shop II (F9)
- Mutfak Rehberi (F11)
- Auth + onboarding + hesabım + bildirimler (F6)

## TIER 4 — BABYSIT SOLO (ajana verilmez)

- Diyetisyen panel shell (F12b)
- Reçete builder + danışan paneli (F12c)

## TIER 5 — OTOMATİK KAPANIŞ

- Sezon + kurumsal + yasal + hata sayfaları + global arama (F13 + kalanlar)

## KURALLAR

- Her teammate SADECE kendi `mockups/<sayfa>-v1.html` dosyasına yazar;
  `handoff.md` / `lessons.md` / `anasayfa-portal-v3a.html` /
  `tarif-detay-v1.html` / `_shell.html` **READ-ONLY**.
- **L1 kuralı her sayfada zorunlu:** eski template blok envanteri üretimden
  ÖNCE çıkarılır + kıyas sunulur.
- Tutarlılık `tasks/bilesen-kilavuzu.md`'ye birebir.
- Teammate çıktısı: sayfa + 1440/390 SS + konsol 0 hata +
  `outputs/<sayfa>-rapor.md`.
- **COMMIT dalga sonunda Beyar onayıyla toplu.**
- Dalga sonu ritüeli: Beyar SS turu → seri revize → patron onayı →
  toplu commit → handoff güncelle → clear → sonraki dalga.
