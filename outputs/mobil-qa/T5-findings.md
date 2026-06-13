# T5 — sağlık+panel BULGULARI

Kapsam: 21/21 sayfa, 63 SS (21×3 breakpoint). Ölçüm: measure.cjs --ss, tüm sayfalar.
`hesaplayici-v1.html` → meta-refresh ile `beden-kutle-endeksi-v1.html`'a yönlendiriyor; ölçüm hatası (navigation error) — kendi başına ℹ️ bulgu.

---

| Sayfa | Breakpoint | Bulgu | Severity | Ölçüm | SS |
|---|---|---|---|---|---|
| **dyt-danisanlar-v1** | 768 | Danışan tablosu (.ptable) scroll wrapper yok: overflow-x:auto sadece `@media(max-width:640px)` içinde tanımlı; 768px kural dışında kalıyor → tablo 870px'e uzuyor, sayfa genişliyor | 🔴 | docSW:870, 42 unclipped | `dyt-danisanlar-v1__768.png` |
| **dyt-randevular-v1** | 390+768+drawer | Haftalık takvim `.cal-grid` — `cal-scroll` içinde min-width:880px (390) / 760px (768) ile yatay scroll var, görsel 390'da yalnızca Pzt/Sal/Çar sütunları ekrana sığıyor, Per-Cmt scroll ile erişilebilir. Scroll varlığı intentional ama ilk bakışta yarım takvim izlenimi. | 🟠 | docSW:390 (scroll container içinde) | `dyt-randevular-v1__390.png` |
| **dyt-randevular-v1** | 390+768+drawer | `.apt-drawer` (randevu detay drawer) CSS ile `translateX(105%)` dışarıda; kapalıyken DOM'da mevcut olduğundan measure.cjs 11 unclipped item raporluyor. Gerçek layout taşması değil — false positive. Ancak drawer açıkken sayfa overflow gizleme (`body.detay-open`) eksikse kısmen görünür olabilir. | 🟡 | unclipped:11 (false pos.) | `dyt-randevular-v1__drawer.png` |
| **dyt-recete-builder-v1** | 390 | Haftalık plan tablosu `.bld-scroll` (overflow-x:auto) içinde, kasıtlı yatay scroll. 390'da Pzt/Sal kesiği görünüyor — scroll affordance (ince scrollbar) yeterince belirgin değil, kullanıcı tablo devam ediyor fark etmeyebilir. | 🟠 | unclipped:0 (scroll container) | `dyt-recete-builder-v1__390.png` |
| **hesaplayici-v1** | 390+768+drawer | Sayfa `<meta http-equiv="refresh" content="2;url=beden-kutle-endeksi-v1.html">` + JS redirect içeriyor; ölçüm "Execution context was destroyed" hatası veriyor. SS üretilmedi. Tasarım kararı (yönlendirme sayfası) — ancak 2 saniyelik bekleme UX açısından zayıf. | ℹ️ | eval error | — |
| **olcu-birimleri-v1** | 390 | Kategori tab şeridi 2 satıra wrap ediyor (4 uzun etiket: Dönüşüm / Dönüşüm Tablosu / Standart Ölçüler / Fırın Tablosu). Ölçüm temiz (scroll-x container içinde), görsel olarak sıkışık. | 🟡 | docSW:390, unclipped:0 | `olcu-birimleri-v1__390.png` |
| **olcu-birimleri-v1** | 390+768 | İllüstrasyon SVG'leri (su bardağı, çay bardağı vb.) turuncu (#E14827) stroke ile çizilmiş. Bu **kasıtlı marka ikonu** — sağlık yeşili sızıntısı değil. İçerik sayfası genel turuncu kullanır. | ℹ️ | — | `olcu-birimleri-v1__390.png` |
| **saglik-hub-v1** | 390+768 | Nav aktif rengi: `.nav a.active` genel rule turuncu (`var(--tomato)`); sağlık sayfaları için yalnızca `[href="saglik-hub-v1.html"]` aktifken yeşil override var. Hesaplayıcı alt sayfaları (bazal, bkı, kalori, su…) aktif nav öğesini turuncu olarak gösteriyor. Tasarım tutarsızlık kararı. | 🟡 | — | `saglik-hub-v1__390.png` |
| **saglik-hub-v1** | 390 | Hero CTA yok (chip navigasyonu var), yeşil eyebrow + stats + yeşil hover chip tutarlı. Sağlık hub yeşil renk sistemi tutarlı. | ✅ | docSW:390, unclipped:0 | `saglik-hub-v1__390.png` |
| **saglik-testler-v1** | 390+768 | Test kartları tek kolon, Teste Başla CTA turuncu (btn-primary). Sağlık sayfasında CTA turuncu kalıyor — yeşil beklentisiyle çelişir. Ancak sitenin global CTA rengi turuncu, bu bilinçli karar. | 🟡 | docSW:390, unclipped:0 | `saglik-testler-v1__390.png` |
| **test-detay-v1** | 390+768 | Soru kartları ve seçenekler 390'da tam genişlik, okunabilir. Onedio tarzı test akışı mobilde düzgün. | ✅ | docSW:390, unclipped:0 | `test-detay-v1__390.png` |
| **bazal-metabolizma-v1** | 390+768 | Hesaplayıcı formu tek kolon, label kesik yok. Sonuç gauge (1.437 kcal) yeşil renk sistemiyle tutarlı. 2-kolon → 1 kolon geçiş temiz. | ✅ | docSW:390, unclipped:0 | `bazal-metabolizma-v1__390.png` |
| **beden-kutle-endeksi-v1** | 390+768 | BKİ formu, bar chart (Zayıf/Normal/Fazla) mobilde tam sığıyor. Input/slider temiz. | ✅ | docSW:390, unclipped:0 | `beden-kutle-endeksi-v1__390.png` |
| **gunluk-kalori-v1** | 390+768 | Aktivite seviyesi radio grid mobilde 1 kolon, sonuç 2.227 kcal kartı sığıyor. Temiz. | ✅ | docSW:390, unclipped:0 | `gunluk-kalori-v1__390.png` |
| **gunluk-su-v1** | 390+768 | Su damlaları görsel sayaç 390'da tam sığıyor, label kesik yok. | ✅ | docSW:390, unclipped:0 | `gunluk-su-v1__390.png` |
| **ideal-kilo-v1** | 390+768 | Sonuç 3-kolon stat bandı (Min/İdeal/Max) 390'da sıkışık ama taşmıyor. | ✅ | docSW:390, unclipped:0 | `ideal-kilo-v1__390.png` |
| **vucut-tipi-v1** | 390+768 | Vücut tipi illüstrasyon bar 390'da tam sığıyor, 5 tip ikonu readable. | ✅ | docSW:390, unclipped:0 | `vucut-tipi-v1__390.png` |
| **besin-kutuphanesi-v1** | 390+768 | Liste görünümü (kcal sağda) 390'da temiz. Tablo yok, satır-bazlı liste. | ✅ | docSW:390, unclipped:0 | `besin-kutuphanesi-v1__390.png` |
| **diyet-listeleri-v1** | 390+768 | Program kartları 1 kolon, uygulama CTA yeşil (btn-green) tutarlı. | ✅ | docSW:390, unclipped:0 | `diyet-listeleri-v1__390.png` |
| **diyetisyen-ol-v1** | 390+768 | Çok bölümlü form (Kişisel / Mesleki / Belgeler / Profil & Hizmet) akordeon. Sticky bölüm-nav yok — section atlama kolay değil ama çakışma yok. | ✅ | docSW:390, unclipped:0 | `diyetisyen-ol-v1__390.png` |
| **sef-ol-v1** | 390+768 | Benzer form yapısı, sosyal medya linkleri 390'da tam sığıyor. | ✅ | docSW:390, unclipped:0 | `sef-ol-v1__390.png` |
| **dyt-mesajlar-v1** | 390+768 | Mesaj listesi her iki bp'de temiz, yeni mesaj CTA yeşil. | ✅ | docSW:390, unclipped:0 | `dyt-mesajlar-v1__390.png` |
| **dyt-profil-ayar-v1** | 390+768 | Profil formu, uzmanlık etiketleri (pill chips) 390'da wrap ediyor, taşmıyor. | ✅ | docSW:390, unclipped:0 | `dyt-profil-ayar-v1__390.png` |
| **dyt-receteler-v1** | 390+768 | Reçete listesi `.rcp-scroll` ile korumalı (min-width:760px, overflow-x:auto). | ✅ | docSW:390, unclipped:0 | `dyt-receteler-v1__390.png` |

---

## Sağlık Yeşil Renk Tutarlılık Özeti

| Alan | Durum |
|---|---|
| Sağlık hub hero eyebrow, calc-card hover, nut-row hover | ✅ Yeşil |
| Diyet listeleri CTA (btn-green) | ✅ Yeşil |
| Panel sayfaları (dyt-*) buton/badge/progress bar | ✅ Yeşil |
| Hesaplayıcı form focus ring + segmented buton aktif | ✅ Yeşil |
| Nav aktif: yalnızca saglik-hub-v1.html href'inde yeşil override | 🟡 Alt sayfalar turuncu kalıyor |
| Hesaplayıcı CTA (Hesapla butonu) | ✅ Yeşil (btn-green) |
| Genel CTA (Giriş Yap, Gönder, arama) | ✅ Turuncu — kasıtlı global pattern |
| olcu-birimleri SVG illüstrasyon turuncu stroke | ✅ Kasıtlı marka ikonu, sızıntı yok |

---

## En Kritik 3 Bulgu

1. 🔴 **dyt-danisanlar / 768 — tablo gerçek taşma**: `overflow-x:auto` sadece `≤640px` medyasında; 768px'te kural devreye girmiyor → docSW:870, sayfa 102px taşıyor, 42 unclipped element. Fix: `@media(max-width:980px)` bloğuna scroll wrapper ekle veya `.pc-body.flush { overflow-x:auto }` kuralını breakpoint'ten bağımsız yap.

2. 🟠 **dyt-randevular / tüm bp — takvim kaydırma affordance**: Haftalık takvim scroll container içinde ama 390'da ilk 3 gün görünüyor, scroll varlığı net değil (ince scrollbar). Kullanıcı Per/Cum/Cmt sütunlarını kaçırabilir. Fix: kaydırma okları veya gün sayacı ("Pzt–Paz, 8–14 Haz") hint ekle.

3. 🟠 **dyt-recete-builder / 390 — haftalık plan scroll affordance**: `.bld-scroll` 7 gün içeriyor ama 390'da yalnızca 2 gün görünüyor. Scroll şeridi çok ince. Fix: üst köşeye "← → kaydır" chip veya ilk yüklenmede ileri bir gün partial peek.
