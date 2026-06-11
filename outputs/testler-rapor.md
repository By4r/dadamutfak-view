# Testler — test-detay-v1.html Raporu (FİNAL CİLA)

> Üretilen: `mockups/test-detay-v1.html` (tek şablon, `?test=slug` ile 4 test).
> Ara yön değişikliği uygulandı: ilk kurgu (radio satırlı bilgi sınavı) REDDEDİLDİ →
> **Onedio tarzı** kurguya çevrildi (görselli seçim kartları, otomatik geçiş, kişilik sonuç kartı).
> İkinci ek: 4. slug `?test=hangi-yemek` (saf eğlence/kişilik testi).

---

## 1. L1 — Eski Template Envanteri + Kıyas

### Eski `testler.html` (liste sayfası, 1316 satır, Bootstrap)
| Blok | İçerik |
|---|---|
| Video arka planlı archive-header | h1 "Testler" + breadcrumb + lorem hashtag rayı (#Pratik, #Hamurişi ×5 tekrar) |
| Test kart grid'i (`vendor-wrap style-2`, 2 kolon) | **8 kart** (brief 24 dedi, dosyada 8 sayıldı) — hepsi lorem: başlık "Test 1", lorem açıklama, "123 B" görüntülenme rozeti, "İncele" linki |
| 1 reklam bloğu (`ad-container`) | — |
| Footer + modallar (arama, feedback) | standart eski chrome |

### Eski `test-detay.html` (1598 satır)
| Blok | İçerik |
|---|---|
| Video arka planlı header | yine "Testler" h1 (sayfa başlığı değil) + lorem hashtag'ler |
| Sol sticky reklam (160×600) + 3 reklam daha | toplam 4 `ad-container` |
| `single-header` | **tek gerçek başlık: "Temel Pişirme Teknikleri"** + tarih (30 Ocak 2023) + 204 görüntülenme |
| Büyük kapak görseli + lorem excerpt | `<img>` tag (eski yöntem) |
| 4 soru bloğu (`test-box`) | numaralı soru + **görselli radio seçim kutuları** (`selection-box`: kare foto + radio + etiket; örn. "İlk olarak bize bir çorba tercihi yap!" İşkembe/Ezogelin/…) — TÜM sorular tek sayfada alt alta, ilerleme yok |
| `test-result-box` | cevaplanmamış soru linkleri ("Test sonucunuzu görmek için…"); hepsi cevaplanınca JS lorem "Test Sonucunuz" kutusu (görsel + lorem metin) |
| Paylaşım | FB/X "Test Sonucu Paylaş" butonları + hashtag rayı + 6 sosyal ikon |
| "Benzer Testler" | 1-kolon carousel, lorem kartlar |

### Kıyas — eski → bizim çözüm
| Eski | Bizim (test-detay-v1) |
|---|---|
| Tek sabit sayfa, tüm sorular alt alta | `?test=slug` tek şablon + **ekranda tek soru**, canlı ilerleme çubuğu (`.qz-bar` mirası) |
| Görselli radio kutuları (`selection-box`) | aynı DNA modernleştirildi: **`.pick` seçim kartları** (bnp mirası) 2×2 grid, foto/ikon varyantı, **seçimde otomatik geçiş** |
| Lorem "Test Sonucunuz" kutusu | **kişilik sonuç kartı** (`.qz-res-card.persona`): görselli bant + eğlenceli başlık + skor/dağılım çubukları |
| FB/X paylaş butonları | paylaş **popover**: WhatsApp/X/kopyala (tarif-detay `.share-btn` mirası) |
| "Benzer Testler" carousel | "Diğer Testler" `hub-card` köprüleri (çapraz `?test=` + saglik-testler-v1) |
| 4-5 reklam bloğu | mockup kapsamı dışı (bilinçli atlandı) |
| Video header + alakasız hashtag'ler | `tst-top` krem üst bölge (saglik-testler verbatim): breadcrumb + başlık + meta |

---

## 2. Test / Soru Kurguları (4 slug, tek JS veri objesi `TESTS`)

| Slug | Tip | Soru | Sonuç kişilikleri (kicker + başlık) |
|---|---|---|---|
| `metabolizma` | habit (şık sırası iyi→kötü, skor 0-100) | 10 (tam yazıldı) | "Senin metabolizman:" → **Yıldırım Hızında** (≥70, fa-bolt) / **İsviçre Saati Gibi** (40-69, fa-stopwatch) / **Pazar Sabahı Modunda** (<40, fa-couch) |
| `su-hidrasyon` | habit | 6 | "Senin hidrasyon tipin:" → **Tam Bir Su Samuru** (fa-otter) / **Yarısı Dolu Bardak** (fa-glass-water-droplet) / **Kaktüs Modu** (fa-plant-wilt) |
| `temel-pisirme` | bilgi (doğru cevap `c` index; eski template'in tek gerçek başlığı) | 8 | "Mutfak karnen:" → **Tencerenin Hakimi** (≥75, fa-medal) / **Sosu Yolda Koyulaşır** (fa-utensils) / **Sevimli Mutfak Çaylağı** (fa-seedling) |
| `hangi-yemek` | kisilik (şık index'i = karakter; **en çok seçilen kazanır**, dağılım çubukları) | 6 | "Sen bir yemek olsan:" → **Karnıyarık** / **Menemen** / **Mantı** / **İçli Köfte** (her birine esprili tarif + kendi Unsplash sonuç görseli + uyumlu ray başlığı) |

- Foto şıklı sorular: metabolizma S2 (atıştırmalık tabağı ×4 foto), hangi-yemek S2 (kahvaltı masası ×4 foto); temel-pisirme S1/S4 soru kapak görseli (`.qz-qimg`). Tüm görseller v3a Unsplash havuzundan + filtre suffix (`exp=7&gam=6&sat=-9&high=8&vib=5`), div+bg-image.
- Akış: KAPAK (`.tcv-card`: görsel bant + açıklama + 3 madde + "Teste Başla") → tek soru kartı (seçim → 420ms sonra otomatik sonraki; `.qz-stage` fade animasyonu; geri ok seçimleri hatırlar) → SONUÇ kişilik kartı → sonuç kategorisiyle eşleşen **r-card ×4 rayı** → "Diğer Testler" köprüleri (2 çapraz `?test=` + saglik-testler-v1; "Tüm Testler" → saglik-hub).
- URL sözleşmesi: `?test=slug` kapak · `&sonuc=1` sonuç hâli (test bitince `history.replaceState` ile de yazılır) · `&paylas=1` popover açık. Geçersiz/boş slug → **metabolizma** (sessiz varsayılan, alias yok). `document.title` slug'a göre.

## 3. Miras Bileşen Listesi (yeniden icat YOK)

| Bileşen | Kaynak | Not |
|---|---|---|
| `.tst-top .rd-crumb .tst-head .tst-meta` | saglik-testler-v1 | verbatim |
| `.qz-card .qz-prog-row .qz-step .qz-pct .qz-bar .qz-q .qz-nav .qz-back` | saglik-testler-v1 (.qz-* ailesi) | verbatim; `.qz-opt` radio satırı Onedio pivotuyla kullanım dışı (yerine .pick) |
| `.qz-result .qz-res-card .qz-res-ico .qz-res-eyebrow .qz-score .qz-bars .qz-brow .qz-btrack .qz-res-actions .btn-green` | saglik-testler-v1 | verbatim + `.persona` varyantı (görselli bant `.qz-res-media`, overlay 0.12→0.4) |
| `.pick-grid .pick .pk-ico .pk-txt .pk-check` | bugun-ne-pisirsem-v1 (bnp wizard seçim kartı) | verbatim + türetme: `.pick-photo/.pk-img` foto varyantı, yeşil sağlık bağlam override'ı |
| `.r-card` ailesi + `.grid-4` | v3a 289-312/770-807/335 | verbatim (saglik-testler kopyasından) |
| `.hub-card` ailesi | saglik-testler-v1 / saglik-hub | verbatim |
| `.share-btn` (.wa/.xx/.cp/.ok) + kopyala JS deseni | tarif-detay-v1 (1381-1389, shareCopy JS) | verbatim + `.shr-pop` popover kabuğu (token dili) |
| quiz motoru (render/answers/showResult iskeleti) | saglik-testler-v1 sayfa JS | otomatik geçiş + 3 puanlama tipi (habit/bilgi/kisilik) eklendi |
| Shell chrome | _shell.html | dokunulmadı; tek ek: Sağlık nav linkine `class="active"` |

Yeni doğan (token diliyle, pill yok, radius token): `.tcv-*` (test kapağı kartı), `.qz-stage/.qz-qimg/.qz-hint`, `.qz-res-card.persona/.qz-res-media/.qz-res-kicker`, `.shr-pop`.

## 4. SS Yolları (mockups/.ss-scratch/)

- `test-detay-metabolizma-kapak-1440.png` · `test-detay-metabolizma-kapak-500.png`
- `test-detay-su-hidrasyon-kapak-1440.png` · `test-detay-su-hidrasyon-kapak-500.png`
- `test-detay-temel-pisirme-kapak-1440.png` · `test-detay-temel-pisirme-kapak-500.png`
- `test-detay-sonuc-1440.png` · `test-detay-sonuc-500.png` (metabolizma `?sonuc=1`)
- `test-detay-soru-foto-1440.png` (S2 foto-kartlı 2×2 grid, canlı ilerleme %10/Soru 2-10)
- `test-detay-hangi-yemek-sonuc-1440.png` (Mantı kişilik kartı + dağılım çubukları)

Mobil SS 500px'te alındı (kılavuz §4: headless min genişlik 500; 390 kanıtı JS probe ile).

## 5. Probe Çıktıları (Playwright, gerçek tarayıcı)

**Konsol:** tüm oturum (4 slug × kapak/sonuç gezinmeleri + 3 tam tıklama akışı) → `console_messages(level=error, all=true)` = **0 hata, 0 uyarı** (Playwright pageerror'ları da bu kanala düşer).

**Canlı akış probe'u (metabolizma):** Başla→"Soru 1/10" bar %10 → ilk şık tıkla → **otomatik** "Soru 2/10", pct %10, bar %20, S2'de 4 `.pick-photo` → geri ok→"Soru 1/10" + önceki seçim `sel` hatırlı → 10 soru → sonuç: "İsviçre Saati Gibi", skor 67, ray 4 r-card, URL `?test=metabolizma&sonuc=1`, paylaş popover açıldı + wa href dolu.

**Bilgi puanlama probe'u (temel-pisirme):** 8 doğru şık tıklandı → "Tencerenin Hakimi", "8 soruda 8 doğru yakaladın", 4 kırılım çubuğu, S1/S4 soru kapak görseli görünür.

**Kişilik probe'u (hangi-yemek):** Mantı ağırlıklı seçim [2,2,2,1,2,0] → "Sen bir yemek olsan: **Mantı**", dağılım çubukları (Karnıyarık %17 … Mantı %50), karakter görselli media bant, ray "Emeğine değer tarifler" ×4, köprü kartları [?test=metabolizma, ?test=su-hidrasyon, saglik-testler-v1.html].

**390 taşmazlık (iframe probe, _host390 deseni):** 5 durum (3 kapak + metabolizma sonuç + temel-pisirme sonuç&paylas=1) → `documentElement.scrollWidth = body.scrollWidth = 375` ≤ 390 ✓ (hangi-yemek 1440'ta docSW 1425 ✓; aynı şablon/grid'ler).

**Geçersiz slug:** `?test=olmayan-slug` → sessizce metabolizma yüklendi (title değişti, hata yok).

## 6. Lead'in Bağlayacağı Önerilen href'ler

(saglik-hub-v1 / saglik-testler-v1 dosyalarına bilinçli DOKUNULMADI)

1. **saglik-hub-v1.html** test kartları (satır ~1144/1155/1166, üçü de şu an `saglik-testler-v1.html`):
   - Kart ② "Metabolizman hızlı mı yavaş mı?" (satır 1155) → `test-detay-v1.html?test=metabolizma`
   - Kart ③ "Yeterince su içiyor musun?" (satır 1166) → `test-detay-v1.html?test=su-hidrasyon`
   - Kart ① beslenme testi → `saglik-testler-v1.html` (doğru, kalsın)
2. **saglik-testler-v1.html** "Benzer Testler" hub kartları (satır ~1186/1194/1202):
   - "Metabolizman hızlı mı yavaş mı?" → `test-detay-v1.html?test=metabolizma`
   - "Yeterince su içiyor musun?" → `test-detay-v1.html?test=su-hidrasyon`
   - "Gizli şeker tüketimin ne kadar?" → karşılığı yok; öneri: kart içeriğini `hangi-yemek` ("Sen bir yemek olsan hangisi olurdun?" / Eğlence rozeti) ya da `temel-pisirme` ile değiştir → `test-detay-v1.html?test=hangi-yemek`
3. **mutfaga-giris-v1.html / mutfak-sirlari-v1.html**: "bilgini sına" köprüsü → `test-detay-v1.html?test=temel-pisirme` (eski sitenin tek gerçek test başlığı bu aileden)
4. Hub'larda eğlence vitrini istenirse: `test-detay-v1.html?test=hangi-yemek&sonuc=1` SS-dostu sonuç hâli mevcut.

## 7. Notlar / Sapma Kaydı

- Brief eski listede "24 kart" dedi; dosyada 8 `vendor-wrap` kartı sayıldı (hepsi "Test 1" lorem) — envanter dosya gerçeğine göre yazıldı.
- "Diğer Testler" köprü grid'i 3 kartta tutuldu: 2 çapraz slug + 1 saglik-testler köprüsü (4. test eklenince taşma yerine rotasyon; "Tüm Testler" → saglik-hub her durumda var).
- dmCart izleri eklenmedi (shop ailesi değil); emoji yok (FA 6.5.2), pill yok, radius yalnız token, `<img>` yalnız chrome'daki logo/bayrak mirası.
