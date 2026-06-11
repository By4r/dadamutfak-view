# DadaMutfak — Dalga 3 "saglik2" Raporu

> Kapsam: hesaplayıcı ×6 tam sayfa + hesaplayici-v1 alias + diyet-program-detay +
> tarif-bulucu alerjen ara işi. Tarih: 2026-06-11. Port: 8774.

## 1. Biten dosyalar

| # | Dosya | Durum |
|---|-------|-------|
| 1 | `mockups/beden-kutle-endeksi-v1.html` | YENİ — eski hesaplayici-v1 içeriğinin tam sayfa hâli; switch barı 6 gerçek linke bağlandı + tıbbi uyarı notu eklendi |
| 2 | `mockups/bazal-metabolizma-v1.html` | YENİ — Mifflin-St Jeor, canlı hesap; sayısal res-num varyantı (gauge yok), Günlük Kalori'ye çapraz köprü |
| 3 | `mockups/gunluk-kalori-v1.html` | YENİ — BMH × aktivite (qz-opt radyo listesi, saglik-testler mirası); koru/ver/al bandları (`.kcal-bands .kb`) |
| 4 | `mockups/vucut-tipi-v1.html` | YENİ — boy/bilek oranı; cinsiyete göre eşik + gauge skalası JS ile yeniden kurulur; tip kartı + beslenme önerisi |
| 5 | `mockups/gunluk-su-v1.html` | YENİ — kg×33 ml + egzersiz saati × (350/500 ml); litre + bardak ikon dizisi (`.cup-row`) |
| 6 | `mockups/ideal-kilo-v1.html` | YENİ — Devine + BKİ 18.5–24.9 kg aralığı (alt/ideal/üst kartları, kb dili); BKİ'ye çapraz köprü |
| 7 | `mockups/hesaplayici-v1.html` | DÜZENLEME (istisna) — içerik tamamen ALIAS oldu: meta refresh (2s) + JS redirect (1.2s) → beden-kutle-endeksi-v1 + 6 hesaplayıcı fallback köprüsü. Eski içerik kalmadı |
| 8 | `mockups/diyet-program-detay-v1.html` | YENİ — dl-hero koyu band (rozetler+stats+aksiyonlar) · 7g×3 öğün wk-board (statik döküm) · r-card grid · note-duo diyetisyen uyarısı |
| 9 | `mockups/tarif-bulucu-v1.html` | ARA İŞ (istisna) — "İstemediklerim / Alerjen" rafı panel içine eklendi (detay §4) |

Tümü hesaplayici-v1 şablonundan (shell tabanlı) türetildi; chrome/mega menü birebir,
`.below-header` + ilk satır nefesi korunmuş (şablonun kendisinden miras).

## 2. L1 — Eski template kıyası

Kaynak: `drive-download-20260608T070112Z-3-001/dada-mutfak-icerik/`

| Eski dosya | Yeni karşılık | Not |
|---|---|---|
| `beden-kutle-endeksi-hesapla.html` | beden-kutle-endeksi-v1 | Eski: boy/kilo/yaş slider + bay/bayan radio, sonuç tek sayı. Yeni: aynı alan seti (yaş/cinsiyet opsiyonel) + kategori + gauge + tarif köprüsü |
| `bazal-metabolizma-hizi-hesapla.html` | bazal-metabolizma-v1 | Eski: Erkek/Kadın/**Bebek** sekmeleri (male-/female-/baby- yaş/boy/kilo alanları). Yeni: tek form + cinsiyet segmenti. **Bebek sekmesi taşınmadı** (Mifflin bebekte geçersiz; pediatrik hesap diyetisyen işi — açık soru №1) |
| `vucut-tipi-hesapla.html` | vucut-tipi-v1 | Eski sayfa fiilen LOREM IPSUM placeholder (Erkek/Kadın sekmeli boş kabuk) — üretimde gerçek formül yoktu. Yeni: boy/bilek oranı + 3 tip kartı |
| `besin-kalori-hesapla.html` | (kapsam dışı) | Bu "besin ara + miktar + birim → kalori" aracı; karşılığı Dalga 2 `besin-kutuphanesi-v1`. Günlük-kalori hesaplayıcısı farklı bir araç |
| `hesaplamalar.html` | saglik-hub-v1 (Dalga 2) | Eski dizin sayfası; hub zaten karşılıyor |
| — (yok) | gunluk-kalori-v1 | Eski sitede doğrudan karşılığı YOK (yeni araç) |
| — (yok) | gunluk-su-v1 | Eski karşılık YOK |
| — (yok) | ideal-kilo-v1 | Eski karşılık YOK |

## 3. Formül doğrulama (Playwright probe, canlı sayfada)

| Sayfa | Girdi | Beklenen | Ölçülen | ✓ |
|---|---|---|---|---|
| BKİ | 70 kg / 1.75 m | 22.9 — Normal | 22.9 / "Normal kilo" | ✓ |
| BKİ | 95 kg / 1.75 m | 31.0 — Obez | 31.0 / "Obez" | ✓ |
| BMH | kadın 170/68/29 | 10×68+6.25×170−5×29−161 = 1436.5 → 1437 | "1.437" | ✓ |
| BMH | erkek 180/80/30 | 800+1125−150+5 = 1780 | "1.780" | ✓ |
| Günlük kalori | kadın 170/68/29 ×1.55 | 1436.5×1.55 = 2226.6 → 2227; bandlar 1727/2727 | "2.227" / 1.727–2.727 | ✓ |
| Günlük kalori | erkek 180/80/30 ×1.9 | 1780×1.9 = 3382 | "3.382" (bandlar 2.882/3.882) | ✓ |
| Vücut tipi | kadın 170/16 | r=10.63 → mezomorf (10.1–11) | 10.6 / Mezomorf | ✓ |
| Vücut tipi | kadın 175/15 | r=11.67 → ektomorf (>11) | 11.7 / Ektomorf | ✓ |
| Vücut tipi | erkek 170/18 | r=9.44 → endomorf (<9.6); skala 8.5/9.6/10.4/12 | 9.4 / Endomorf, skala doğru | ✓ |
| Günlük su | 68 kg, egzersiz yok | 2244 ml → 2,2 L ≈ 11 bardak | "2,2 L / ≈11 bardak", 11 ikon | ✓ |
| Günlük su | 68 kg + 1 sa yoğun | 2244+500=2744 → 2,7 L ≈ 14 bardak | "2,7 L / ≈14 bardak" | ✓ |
| İdeal kilo | kadın 170 cm | Devine 45.5+2.3×(66.93−60)=61.4; aralık 53.5–72.0 | 61,4 / 53,5–72,0 | ✓ |
| İdeal kilo | erkek 180 cm | 50+2.3×10.87=75.0; aralık 59.9–80.7 | 75,0 / 59,9–80,7 | ✓ |
| Alias | hesaplayici-v1 aç | →beden-kutle-endeksi-v1 | redirect OK (~1.2s) | ✓ |

**Konsol: 9 sayfanın tümünde 0 hata, 0 uyarı** (Playwright console dump, sayfa başına).
**390 taşmazlık: 8 sayfada scrollWidth=390** (iframe JS probe, 390×844).

## 4. tarif-bulucu ara işi — yapılan dokunuş

- Panel içine (raf akordeonlarının sonuna) `fct raf alerjen` bloğu: "İstemediklerim /
  Alerjen" — 8 çip (Soğan, Sarımsak, Gluten, Laktoz, Fıstık, Yumurta, Deniz ürünleri,
  Acı biber), raf-item dilinde; sel durumu **koyu slate** (dolabın domates sel'inden
  ayrışır), ck rozeti `fa-ban`.
- JS minimal dokunuş: ① dolap kart seçicisi `:not([data-no])` ile alerjenleri dışlar
  (1 satır) ② `refresh()` sonuna düşürme bloğu: seçili alerjen, EXMAP terimleriyle
  grid kartlarının `.r-ing` metnini tarar → eşleşen kart `ex-hidden` ③ sayaç:
  rc − seçim×9 − gizlenen kart; tb-bar'a "· N malzeme hariç" notu (`#exNote`)
  ④ "temizle" alerjenleri de sıfırlar. Dolap kurgusu/raf JS'i bozulmadı (probe:
  4 malzeme + Soğan → 122→110, 3 kart düştü; +Laktoz → 98; temizle → hepsi sıfır).
- Bilinen mock sınırı: agresif seçimde sayfadaki 6 örnek kartın tamamı elenebilir →
  grid boş ama sayaç >0 (gerçek üründe sayfalama yeni kart getirir). Not edildi,
  davranış mock için kabul edilebilir sayıldı.
- Yan not: sayfanın açılış sayacı 128 (statik HTML) → 122 (refresh hesaplar 18+4×26).
  Bu **önceden var olan** davranış; bu işin regresyonu değil.

## 5. Kararlar / bileşen mirası

- **calc-* / res-box / gauge / fk-* / bridge** — hesaplayici-v1'den VERBATIM, tüm 6 sayfada.
- **Gauge yalnız BKİ + Vücut Tipi'nde** (skalası anlamlı); diğer 4'ü sayısal res-num varyantı (brief gereği).
- **qz-opt** (saglik-testler) → günlük kalori aktivite seçimi; üstüne 2 mikro ek:
  `.qo-body/.qo-f` (açıklama + katsayı rozeti).
- **YENİ mikro bileşen `.kcal-bands .kb`** (3'lü hedef/aralık kartı) — kılavuzda
  karşılığı yoktu; res-box dilinde (beyaz + #d9efe3 çerçeve) kuruldu, günlük-kalori
  ve ideal-kilo'da AYNI CSS verbatim paylaşılıyor. Kılavuz §2c'ye aday.
- **YENİ mikro bileşen `.cup-row`** (bardak ikon dizisi, su) — tek kullanım, 4 satır CSS.
- Çapraz köprüler: BMH→Günlük Kalori, Günlük Kalori→Haftalık Menü, İdeal Kilo→BKİ;
  her sayfada "uygun tarifler" bridge'i → tarif-liste-v1 + r-card grid'i.
- Her sayfada **"tıbbi tavsiye değildir" + diyetisyen-dizin köprüsü** (fk-help dilinde, res-box altı).
- **Program detay:** dl-hero/dl-stats/prog-tag (diyet-listeleri VERBATIM) + wk-board
  ailesi (haftalik-menu VERBATIM; mc-x/mc-add çıkarıldı — statik program, gün başlıkları
  "1. Gün…7. Gün") + note-duo/remind-box/editor-box (TD VERBATIM). **Bilinçli sapma:**
  editör kutusunun sol şeridi/ikonu sağlık bağlamında tomato yerine YEŞİL (kılavuz
  "yeşil yalnız sağlık" kuralıyla tutarlı); `btn-ghost-light` koyu hero üstü hayalet
  buton (video `btn-glass` akrabası, dl-hero'ya uyarlandı).
- **Alias sayfası** chrome'suz tek kart (köprü sayfası — header/footer yüklemek redirect
  amacına aykırı); token + Gilroy korunur, 6 hesaplayıcı + hub fallback linki.

## 6. Açık sorular (cevap beklemeden makul varsayımla devam edildi)

1. **BMH bebek sekmesi** (eski sitede vardı): taşımadım — Mifflin yetişkin formülü;
   pediatrik hesap diyetisyen modülünün işi olmalı. Patron/lead kararı gerekirse ayrı
   "bebek-çocuk" aracı açılır.
2. **Vücut tipi eşikleri**: brief'teki oranlar birebir uygulandı; eski sitede formül
   yoktu (lorem). Diyetisyen onayına sunulabilir.
3. **Su hesabı üst sınırı**: kg×33 obez girdilerde 5L+ üretir; uyarı notu genel tutuldu,
   klinik üst sınır (ör. 4L cap) eklemedim.

## 7. İstisna dışı dokunma istekleri (YAPILMADI — lead'e)

- `diyet-listeleri-v1.html` prog-card'ları hâlâ `href="#"` → `diyet-program-detay-v1.html`'e
  bağlanmalı (diyet-listeleri'ne dokunma yetkim yoktu).
- `saglik-hub-v1.html` calc kartları → 6 yeni sayfa bağlama işi LEAD'de (brief gereği dokunmadım).
- Site-geneli chrome'da Sağlık dropdown'ındaki "Hesaplayıcılar" linki saglik-hub'a gidiyor —
  istenirse `navbind.py` ile 6 sayfaya açılan alt menüye genişletilebilir (chrome kilitli, dokunmadım).
- `haftalik-menu-v1.html`'e "programdan aktarıldı" durumu (program detaydaki "Menüme Aktar"
  CTA'sının karşı ucu) Dalga 3 keşif/menü teammate'inin alanı.

## 8. SS kanıtları (`mockups/.ss-scratch/`)

- `beden-kutle-endeksi-v1-1440.png` / `-500.png` / `-sonuc-1440.png` (175/70 → 22.9 durumu)
- `bazal-metabolizma-v1-1440.png` / `-500.png`
- `gunluk-kalori-v1-1440.png` / `-500.png`
- `vucut-tipi-v1-1440.png` / `-500.png`
- `gunluk-su-v1-1440.png` / `-500.png`
- `ideal-kilo-v1-1440.png` / `-500.png`
- `diyet-program-detay-v1-1440.png` / `-500.png`
- `tarif-bulucu-v1-alerjen-1440.png` / `-500.png` / `-alerjen-sec-1440.png` (Soğan+Fıstık seçili: 122→101, "2 malzeme hariç" notu)
- `hesaplayici-redirect-1440.png` (alias köprü sayfası)

Not: 1440 tam sayfa SS'lerde varsayılan canlı-hesap sonucu zaten dolu (örnek değerler
170/68/29 ile). Mobil SS 500px (headless min — kılavuz §4); 390 taşmazlığı JS probe ile ayrıca doğrulandı.
Playwright MCP tarayıcısı başka teammate'le paylaşıldığından iki SS yarış kirliliğine uğradı,
tespit edilip izole headless Chrome ile yeniden alındı (dosyalar temiz doğrulandı).
