# DadaMutfak — HANDOFF · DALGA 3 TAMAMLANDI (Tier 3 + ara işler, Beyar onaylı)

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-11 (Dalga 3 kapanışı — 18 yeni sayfa + 3 düzenleme +
> site-içi navigasyon, commit 68b4e81 push'landı)

---

## 🟢 MEVCUT DURUM

- **Kanonik baz:** `mockups/anasayfa-portal-v3a.html` — token/header/footer/mega
  menü her sayfaya BİREBİR. **Mega menü kilitli.**
- **Kanonik iskelet:** `mockups/_shell.html` — yeni sayfa = shell kopyası.
  `.below-header` + ilk içerik satırı ≥16px nefes (kılavuz §3) — inline override YASAK.
- **Bileşen kılavuzu:** `tasks/bilesen-kilavuzu.md` — §2b Dalga 1 + **§2c Dalga 2
  mirası** (dmCart, dolap/raf, calc+gauge, wizard kuralı, lst-hero varyantları,
  dz-kart, reyon-grup). **§2d Dalga 3 adayları sentez §3 sonunda bekliyor** (tgl,
  fk-pass, pick-card, sum-card, tml, ost, az-bar, term-row, lvl, kcal-bands, au-*, ntr).
- **TIER 0 ✔** v3a + Tarif Detay F1 · **TIER 1 / DALGA 1 ✔** liste/video/form/profil ·
  **TIER 2 / DALGA 2 ✔** 19 sayfa (keşif, shop, sağlık, diyetisyen, landing)
- **TIER 3 / DALGA 3 (4 teammate, kesintisiz mod) ✔ Beyar onaylı — 18 yeni + 3 düzenleme:**
  - **Shop II (F9):** `sepet-v1` (dmCart üstüne tam sayfa, 400₺ eşik çubuğu, kupon,
    `?empty=1`) · `odeme-v1` (4 adımlı checkout `?step=1..4`, stepper mirası, sözleşme
    kilidi) · `siparislerim-v1` (`?yeni=1` + `?detay=1` takip timeline) ·
    `alisveris-listesi-v1` (reyon-grup mirası + "Sepete Aktar"→dmCart) + ara iş:
    dada-shop crumb fix, 3 shop sayfası sepet ikonu → sepet-v1
  - **Mutfak Rehberi (F11):** `mutfak-sirlari-v1` (hub) · `puf-noktalari-v1`
    (`?detay=1` uzun-form) · `mutfaga-giris-v1` (seviye rozetleri) · `sozluk-v1`
    (eski 4 sayfa→1; `?harf=` `?terim=`) · `olcu-birimleri-v1` (canlı dönüştürücü +
    fırın tablosu) · `akademi-v1` (YAKINDA landing, `?sent=1`)
  - **Auth (F6):** `giris-v1` (`?tab=giris|kayit|sifre` + `?err/?ok/?sent`) ·
    `onboarding-v1` (bnp wizard mirası, `?step=1..4` `?sonuc=1`) · `hesabim-v1`
    (AYAR sayfası `?tab=profil|sifre|gizlilik|bildirim`; içerik profili =
    mutfak-defteri, KARIŞTIRMA) · `bildirimler-v1` (`?empty=1`)
  - **Sağlık:** hesaplayıcı ×6 TAM SAYFA, GERÇEK formüllerle (13 senaryo doğrulandı):
    `beden-kutle-endeksi-v1` `bazal-metabolizma-v1` `gunluk-kalori-v1` `vucut-tipi-v1`
    `gunluk-su-v1` `ideal-kilo-v1`; `hesaplayici-v1` = alias/redirect →BKİ ·
    `diyet-program-detay-v1` (7g×3 board + r-card + note-duo uyarı) · ara iş:
    `tarif-bulucu-v1` "İstemediklerim/Alerjen" rafı geri geldi
- **SİTE-İÇİ NAVİGASYON ✔ (47 dosya):** Mutfak Sırları ailesi + Dada Akademi
  gerçeğe bağlı · btn-login/drawer Giriş Yap → giris-v1 · bottom-nav Hesap →
  hesabim-v1 · saglik-hub calc kartları ×6 + diyet-listeleri prog-card ×6 bağlı ·
  Sepete Git zinciri tam. Araç: `mockups/.ss-scratch/navbind.py` (Dalga 3 haritalı).
  Kalan bilinçli `#`: yasal/kurumsal (Tier 5), Şef Ol, bildirim satırı hedefleri,
  mutfaga-giris konu detayları (şablon = püf `?detay=1`, stack fazı).
- Raporlar: `outputs/{shop2,rehber,auth,saglik2}-rapor.md` + **`outputs/dalga3-sentez.md`**
  (durumlar + **18 AÇIK SORU TEK LİSTE §3 — Beyar cevapları bekleniyor** + SS yolları).

## ➡️ AÇIK İŞ — SIRADAKİ

1. **Sentez §3'teki 18 açık soru** Beyar cevaplayacak (sosyal login seti, fatura
   görünümü, TTS, püf yorumları, header zili, bebek BMH vb.) — cevaplar geldiğinde
   mini revize turu.
2. **DALGA 4** (uretim-plani.md TIER 4+5):
   - **TIER 4 BABYSIT SOLO:** diyetisyen panel shell (F12b) + reçete builder +
     danışan paneli (F12c) — ajana verilmez, Beyar ile adım adım.
   - **TIER 5 OTOMATİK KAPANIŞ:** sezon (Ramazan) + kurumsal + yasal + hata
     sayfaları + global arama (F13) — yasal/kurumsal `#`'ler gerçeğe bağlanır.
   - **Final cila turu:** §2d kılavuz güncellemesi · pişirme modu derinleşmesi +
     yazdır görünümü (Dalga 1'den taşan ara iş) · sepet boş-alan kozmetiği ·
     haftalık menü→alışveriş listesi köprüsü (Beyar onayı şart, yeni UI).

---

## 🏭 ÜRETİM STRATEJİSİ (Beyar kararı)

- **ODAKLI (babysit):** diyetisyen panel shell, reçete builder (TIER 4) — SIRADA.
- **ŞABLON ONAYI:** yasal sayfalar (hesaplayıcı ×6 ✔ tamamlandı).
- **TAM OTOMATİK:** Tier 5 kalanları (Ramazan, hata, global arama, kurumsal).

---

## ⏳ PATRON KARARI BEKLEYENLER (değişmedi)

1. Günün Tarifi bandının ana sayfadaki yeri (iki koyu band ard arda)
2. Mutfak Sırları arka plan videosu (statik foto ile çözüldü, video beklemede)
3. Mobil app tanıtım landing'i (m3) — sağlık app bandı buna bağlı
4. Reklam alanları (m29) — liste + diyetisyen dizini 728x90 mirası
5. EN dil stratejisi — stack öncesi karar
6. Malzeme başı dış market "Sipariş Et" dropdown'ı
7. Video ray modeli (m13)

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/anasayfa-portal-v3a.html"   # site gezilebilir
```

Canlı (Pages): https://by4r.github.io/dadamutfak-view/mockups/<sayfa>.html

- **Ortak (shell):** `?dd=1` mega+dil · `?drawer=1` · `?cc=1` · `?fb=1`
- **liste:** `?empty=1` `?sheet=1` — **video:** `?seri=1` `?short=1` — **form:**
  `?step=` `?state=` `?err=1` — **profil:** `?tab=` `&empty=1` `?flw=1`
- **tarif-detay:** `?swap=1` `?bar=1` `?cook=1` `?shop=1` — **bnp:** `?step=` `?sonuc=1`
- **kesfet/püf:** `?detay=1` — **testler:** `?sonuc=1` — **besin:** `?besin=1`
- **Dalga 3:** sepet `?empty=1` · odeme `?step=1..4` · siparislerim `?yeni=1`
  `?detay=1` · giris `?tab=` `?err/?ok/?sent` · onboarding `?step=` `?sonuc=1` ·
  hesabim `?tab=` · bildirimler `?empty=1` · sozluk `?harf=` `?terim=` ·
  akademi `?sent=1`
- Scratch SS: `mockups/.ss-scratch/` (gitignored). **Mobil SS:** headless Chrome
  min 500px — 500'de çek, 390 taşmazlığı JS probe ile (kılavuz §4).
- Lead doğrulama tekniği: sayfa kopyasına probe `<script>` enjekte + `--dump-dom`
  + `document.title` okuma. Kabul SS'lerini sohbette Read ile görünür aç (Beyar
  mobilden izliyor — tercih edilen pratik).
