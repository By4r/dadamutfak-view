# DadaMutfak Üretim Planı — Tier Yapısı (Beyar onaylı)

> Güncelleme: 2026-06-11 (Dalga 1 kapandı). Tek doğruluk kaynağı: dalga durumu
> burada, günlük ilerleme `tasks/handoff.md`'de.

## TIER 0 — TAMAMLANDI ✔

- Ana sayfa (`mockups/anasayfa-portal-v3a.html`, kanonik baz)
- Tarif Detay F1 (`mockups/tarif-detay-v1.html`, Tur 1 + 1.5 + 2)

## TIER 1 — DALGA 1 — TAMAMLANDI ✔ (Beyar onaylı, 2026-06-11)

| Teammate | Sayfa | Faz | Durum |
|---|---|---|---|
| `liste` | `tarif-liste-v1.html` | F2 | ✔ + görsel hero revize |
| `video` | `video-mutfagi-v1.html` | F3 | ✔ + mobil swipe (m28) |
| `form` | `tarif-ekle-v1.html` (form kiti doğdu) | F5 | ✔ + autocomplete + 3 görsel slot |
| `profil` | `mutfak-defteri-v1.html` | F7 | ✔ + rozet teaser + yazar satırı |

Ön koşullar üretildi: `mockups/_shell.html` (kanonik iskelet) +
`tasks/bilesen-kilavuzu.md` (bileşen envanteri + dil kuralları + SS notları).

## ARA İŞLER — ATLANMAYACAK (dalga brieflerine gömülür)

1. **Kategori + koleksiyon + SEO landing + Günün Menüsü** → Dalga 2'ye
   **5. teammate** (liste hero'sundaki görsel+koyu-overlay dili örnek alınır).
2. **Diyet listeleri + besin kütüphanesi** → Dalga 2 **Sağlık (F10)** brief'ine.
3. **Keşfet + keşfet detay** → Dalga 2 **Keşif (F4)** brief'ine.
4. **Pişirme modu derinleşmesi + yazdır görünümü** → Dalga 3 ÖNCESİ küçük iş.
5. **Şef profili ek bloğu + `?owner=1` sahibi-görünümü varyantı** → İLERİDE.

## TIER 2 — PARALEL DALGA 2 (sıradaki)

- Keşif & Planlama (F4) — + keşfet/keşfet detay (ara iş 3)
- Dada Shop vitrin/liste/ürün detay (F8)
- Sağlık (F10) — + diyet listeleri/besin kütüphanesi (ara iş 2)
- Diyetisyen public (F12a)
- **5. teammate:** kategori/koleksiyon/SEO landing + Günün Menüsü (ara iş 1)

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
