# CİLA-2 FAZ 3 — Lead Bağımsız Örneklem Denetimi (#14)

> Denetçi: team-lead · Yöntem: numstat + silinen-selector grep + görsel SS +
> crumb hedef doğrulaması. Set A bacağı #3 kapanışında, Set B bacağı #4 sonrası.

## Set A bacağı (2026-06-12 ~23:00) — TEMİZ ✅

**Numstat denetimi (CSS-yutma dersi):** Set A'da net-negatif yalnız bilinçli
silmeler (bugun-ne-pisirsem 0/−68, puf-noktasi-ekle 12/−46 — qa #10 ölü CSS,
bit-aynı SS kanıtlı). Diğer tüm dosyalar dengeli/pozitif.

**Silinen-selector denetimi (12 Set A dosyası):** açıklanamayan silme 0.
Dağılım: H1 nefes modifikasyonları −1/+1 (akademi, kategori, koleksiyon, sezon,
tarif-liste, ansiklopedi −2/+2) · sss + saglik-hub −0/+1 (eksik mobil override
eklendi) · saglik-testler −8/+14 (bilinçli ağır patch) · test-detay −3/+2
(H3 normalize) · reklam-ver −1/+43 (Yerleşimler insert) · tarif-detay 0/0
(yalnız href).

**Görsel örneklem (7 sayfa):** saglik-testler (1440+500), test-detay,
reklam-ver (önce/sonra), tarif-liste, ansiklopedi, sezon, saglik-hub —
hepsi kanona uygun: koyu overlay + crumb-üstü nefes uniform, sol-hizalı
hiyerarşi, krem-ortalı head sıfır.

**Crumb hedef doğrulaması (6 sayfa):** tüm rd-crumb href'leri mevcut dosyalara
(anasayfa-portal-v3a, saglik-hub, mutfak-sirlari, tarif-liste). Hiyerarşiler
mantıklı. (Playwright kilitli olduğundan tıklama yerine href+varlık denetimi —
statik sayfada eşdeğer; gerçek tıklama #12 süpürmesinde ayrıca dolaylı test edilir.)

## Set B bacağı (2026-06-12 ~23:20) — TEMİZ ✅

**Silinen-selector denetimi (21 Set B dosyası):** açıklanamayan silme 0.
Değişen CSS yalnız: hakkimizda −1/+18 (yasal redesign) · mekan-detay +13 +
mutfaga-giris-detay +13 (lg-gate) · ansiklopedi-detay +3 (lg-gate) ·
mekan-liste −1/+1 (nefes). 9 crumb kanonlaması salt markup (CSS 0) — tutarlı.

**H1 nefes mührü (grep padding-top:128px):** hakkimizda, mutfaga-giris,
diyetisyen-dizin, mekan-liste, sefler-v1 — 5/5 ✓.

**Görsel örneklem:** hakkimizda + mutfaga-giris (1440) — koyu overlay + house-
ikonlu beyaz crumb + nefes + istatistik kolonu kanonik. sefler-v1 ayrıca #6
kabulünde incelendi (H1 hero + sef-card grid).

**Toplam örneklem: 12+ sayfa görsel, iki set tam numstat/selector taraması.**

## Kapanış mühürleri (2026-06-12 ~23:52) — TAMAM ✅

- **#18 sonrası spot-grep:** 6 Set A sayfasında fa-house crumb 6/6, numstat
  dengeli (2/2–5/5), divergent tarif-detay elle.
- **#17 sonrası:** mojibake (Å) site-geneli **0** · Şefler→sefler-v1 örneklem
  (kategori, sozluk, dada-shop) ✓ · dada-shop 2/2 salt-href (hero dokunulmamış) ·
  üretim setinde `href="#">Şef Ol` **0** (tek kalıntı envanter-dışı
  tarif-detay-v1-headA arşiv varyantı — bilinçli, sentez notu).
- **Beyar feedback kabulleri (3/3):** reklam-ver nefes (#16 önce/sonra SS) ·
  anasayfa Dada Store dropdown (#19 verbatim diff) · BNP mod rayı (#20 kök neden:
  native focus outline; önce/sonra SS).

**#14 SONUÇ: 12+ sayfa görsel + iki set tam numstat/selector + 3 sweep mührü —
CSS-yutma/mojibake/sahiplik-kaçağı SIFIR. (Tek sahiplik ihlali süreç içinde
yakalandı ve yönetildi: kanon→mekan-liste nefes patch'i, içerik doğru.)**
