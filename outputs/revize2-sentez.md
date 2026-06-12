# REVİZE-2 SENTEZ — Mobil Kayma Denetimi + Keşfet Konsept Geri Çekme

> Tarih: 2026-06-12 · Takım: lead + mobil1 + mobil2 + kesfet (FULL AUTO)
> Detay raporlar: `outputs/revize2-mobil1.md` · `outputs/revize2-mobil2.md` ·
> `outputs/revize2-kesfet.md` · Ham probe: `mockups/.ss-scratch/revize2/`
> (gitignored — SS/araçlar lokalde)

## SORUN 1 — MOBİL KAYMA (62 sayfa gerçek-mobil denetim)

### Bulgu sayıları

| Severity | Adet | Ne | Durum |
|---|---|---|---|
| 🔴 | 1 | tarif-detay: 3 sabit alt katman yığılması (actbar z88 + çerez z95 + bottom-nav z90, 38–84px örtüşme) — Beyar'ın kanıt vakası | ✅ çözüldü |
| 🟡 | 53 | first-visit'te çerez bandı + bottom-nav = 2 görünür sabit alt katman (örtüşmesiz istif; ekranın ~210px'ini yiyor) | ✅ 53 sayfada çözüldü |
| 🟡 | 1 | hesabim "Hesabı Sil" 38px dokunma alanı | bilinçli bırakıldı (.btn tabanı ~38px — tek butonu büyütmek dil tutarsızlığı) |
| 🟢 FP | 2 | haftalik-menu sticky tablo hücreleri, shop "bar"ları | gerçek sorun değil (inline/z-altı) |

- **Yatay taşma: 62 sayfanın hiçbirinde yok** (390'da scrollWidth ≤ viewport).
- Panel ailesi (panel-shell + 6 dyt-*) ve hesaplayici-v1: public chrome yok → muaf, dokunulmadı.

### Kanonik çözüm — "tek sabit alt katman" kuralı (kılavuz §3b'ye işlendi)

`.bottom-nav.bn-hidden` + `window.__bnUpdate` yöneticisi + `window.__bottomStrips`
kaydı. Öncelik: çerez > sayfa şeridi > bottom-nav. Şeritli sayfada nav scroll-down'da
da gizlenir (threshold 12px). Birleştirme YAPILMADI (şerit tam genişlik kalır).
**55 dosyada aynı class/JS** (21 mobil1 + 33 yayılım + `_shell.html` iskeleti —
yeni sayfalar kuralı şablondan miras alır).

### Düzeltilen dosyalar (55)

- **mobil1 (21):** anasayfa-portal-v3a, tarif-detay/liste/ekle/bulucu,
  bugun-ne-pisirsem, kategori, koleksiyon, gunun-menusu, haftalik-menu,
  alisveris-listesi, video-mutfagi, mutfak-defteri, hesabim, bildirimler,
  siparislerim, dada-shop, urun-liste/detay, sepet, odeme
- **yayılım turu (33):** akademi, arama, bazal-metabolizma, beden-kutle-endeksi,
  besin-kutuphanesi, diyet-listeleri, diyet-program-detay, diyetisyen-dizin/ol/profil,
  giris, gunluk-kalori, gunluk-su, hakkimizda, hata, ideal-kilo, iletisim, kesfet,
  mutfaga-giris, mutfak-sirlari, olcu-birimleri, onboarding, puf-noktalari, reklam-ver,
  saglik-hub, saglik-testler, seo-landing, sezon, sozluk, sss, test-detay, vucut-tipi,
  yasal (hepsi -v1) + **_shell.html**

### Kanıt zinciri

- mobil1: 390×844 gerçek viewport (playwright-core), 4 scroll-state × sayfa, önce/sonra
  SS (51 png), 1440 regresyon örneklemi, konsol temiz
- mobil2: **bağımsız** Node Playwright harness, 33 sayfa + _shell × 2 durum × 3 scroll →
  **34/34 PASS** (`tool/out/probe-results.json`, 0 FAIL) + MCP browser çapraz doğrulama
- lead: bağımsız grep (55/55) + kendi headless probe'u (tarif-detay 6 durum ≤1 katman;
  3 rastgele mobil2 sayfası) + SS gözle kabul

### Denetim sürecinde yakalanan kör nokta (önemli)

Task #2 ilk turda "40/40 temiz" çıkmıştı — probe filtresi (`bottom>vh-20`) çerez
kartını kaçırıyordu (çerez mobilde nav'ın ÜSTÜNDE, `bottom:80px`) + çerez 700ms
gecikmeli beliriyor. Lead kabul aşamasında yakalandı, filtre düzeltildi (bottom-pinned
tanımı), 33 sayfa yeniden doğrulandı. Kural kılavuz §3b'ye probe tuzağı olarak işlendi.

## SORUN 2 — KEŞFET KONSEPT SAPMASI

### Fark tablosu özeti (tam tablo: `outputs/revize2-kesfet.md`)

| Boyut | Eski site | Senaryo (research-sistem) | Sapmış kesfet-v1 | Yeni kesfet-v1 |
|---|---|---|---|---|
| Konu | Mekan (restoran) + Gurme Lezzetler; rezervasyon/mesafe/harita | mekan + gurme + **etkinlik**, editöryal | soyut "Mutfak Yayını / mutfağın hikâyesi" dergisi — mekan/gurme/etkinlik **0 kez** | 3 sütun geri geldi: Mekânlar · Gurme Lezzetler · Etkinlikler (+Lezzet Rotaları · Söyleşi) |
| Format | foursquare tipi filtre UI | disc-card grid + uzun-form detay | format DOĞRUYDU | format korundu (v3a verbatim) |
| Kart kimliği | fiyat/puan/mesafe | yere/tarihe bağlı | hiçbir kart yere/tarihe bağlı değil | Mekân=konum+puan · Etkinlik=tarih+yer · pillar rozetleri |

- Eski harita/mesafe/rezervasyon UI'ı **geri getirilmedi** (senaryo kararı).
- Chrome + disc-card dili v3a'dan birebir; +5 satır CSS, yeni class türetilmedi.
- 1 kurgu turunda oturdu (sigorta MAX 2 idi).

## TEREDDÜTLER / NOTLAR (Beyar'a)

1. **hesabim "Hesabı Sil" 38px** — bilinçli bırakıldı; istenirse .btn tabanıyla
   birlikte ele alınmalı (dil kararı).
2. **Keşfet "Söyleşi"** ayrı pillar kartı yapılmadı — chip'te seçenek + feature
   detayında yaşıyor (makul varsayım).
3. **Etkinlik kartlarındaki katılım/ücret** mock — Laravel fazında backend alanı.
4. **Gerçek cihaz tekrar testi önerilir** — yapısal yığılma çözüldü; iOS dinamik
   viewport/safe-area hissi için Beyar'ın telefonundan bir tur daha iyi olur.
5. Probe altyapı notu: sezon-v1 countdown'u headless `--virtual-time-budget`'ı
   yutuyor → gerçek-zaman probe kullan (kılavuz §3b + §4 ile uyumlu).

## SS YOLLARI (lokal, gitignored)

- `mockups/.ss-scratch/revize2/mobil1/` — 51 png (tarif-detay önce/sonra,
  first-visit örneklemleri, 1440 regresyon)
- `mockups/.ss-scratch/revize2/mobil2/` — kalibrasyon + money-shot
  (`_firstvisit-diyet-listeleri-390.jpeg`) + `tool/out/probe-results.json`
- `mockups/.ss-scratch/revize2/kesfet/` — kesfet 1440 önce/sonra + 390 sonra
- `mockups/.ss-scratch/revize2/lead/` — lead bağımsız probe enjeksiyonları

## DEĞİŞEN DOSYALAR (git)

- 55 × `mockups/*.html` (54 sayfa + _shell) — bn-hidden kanonik pattern
- `mockups/kesfet-v1.html` — ayrıca konsept geri çekme (yeniden kurgu)
- `tasks/bilesen-kilavuzu.md` — §3b mobil sabit-alt-katman kuralı
- `outputs/revize2-{mobil1,mobil2,kesfet,sentez}.md` — yeni raporlar
