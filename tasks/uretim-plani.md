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

## TIER 3 — DALGA 3 — TAMAMLANDI ✔ (Beyar onaylı, 2026-06-11, commit 68b4e81)

| Teammate | Sayfalar | Faz |
|---|---|---|
| `shop2` | sepet, odeme, siparislerim, alisveris-listesi + dada-shop crumb fix + sepet ikonu bağlama | F9 |
| `rehber` | mutfak-sirlari (hub), puf-noktalari, mutfaga-giris, sozluk (4 eski→1), olcu-birimleri, akademi | F11 |
| `auth` | giris (?tab= üçlü), onboarding (bnp wizard mirası), hesabim (AYAR), bildirimler | F6 |
| `saglik2` | hesaplayıcı ×6 TAM SAYFA (gerçek formüller) + hesaplayici alias + diyet-program-detay + tarif-bulucu alerjen rafı | F10 ara işler |

+ **Site-içi navigasyon** (lead, 47 dosya): Mutfak Sırları ailesi/Akademi/giriş/hesap/
  calc kartları/prog kartları bağlı. Kılavuz **§2c** eklendi (Dalga 2 mirası).
+ Sentez: `outputs/dalga3-sentez.md` — **18 açık soru §3'te Beyar cevabı bekliyor.**
+ NOT: Pişirme modu derinleşmesi + yazdır görünümü Dalga 3'e girmedi → Dalga 4 cila turuna taşındı.

## TIER 4+5 — DALGA 4 (sıradaki — scope)

### A) TIER 4 — BABYSIT SOLO (ajana verilmez, Beyar ile adım adım)
- Diyetisyen panel shell (F12b) — diyetisyen tarafı login sonrası iskelet
- Reçete builder + danışan paneli (F12c)

### B) TIER 5 — OTOMATİK KAPANIŞ (teammate'lara verilebilir)
- Sezon sayfaları (Ramazan: iftara/sahura doğru mirası) + Günün Menüsü bağları
- Kurumsal: hakkımızda, künye, iletişim, reklam/sponsorluk
- Yasal paket (şablon onayıyla): KVKK, aydınlatma, üyelik, mesafeli satış, çerez,
  iptal-iade, kullanım koşulları — footer `#`'leri gerçeğe bağlanır
- Hata sayfaları (404/500) + global arama sonuç sayfası (F13)

### C) FİNAL CİLA TURU (lead + Beyar)
- Sentez §3'teki 18 açık sorunun cevaplarına göre mini revizeler
- Kılavuz §2d (Dalga 3 bileşen mirası) yazılır
- Pişirme modu derinleşmesi + yazdır görünümü (Dalga 1'den taşan ara iş)
- Kozmetik: sepet boş-alan, haftalık menü→alışveriş listesi köprüsü (yeni UI, onaylı)

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
