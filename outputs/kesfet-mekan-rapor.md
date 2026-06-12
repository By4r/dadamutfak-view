# Keşfet Mekan Modülü — mekan-liste-v1 + mekan-detay-v1

> Tarih: 2026-06-12 (mekan-detay **yeniden tasarım turu** dahil — aynı gün) ·
> Kaynaklar: eski `kesfet.html`/`kesfet-detay.html` L1 envanteri,
> `outputs/revize2-kesfet.md`, kılavuz §0–§4, `tarif-detay-v1.html` anatomisi ·
> Commit: **YOK — Beyar onayı bekliyor**

## ① L1 Araştırma — eski template mekan ailesi

Eski sitede mekan ailesi 2 sayfa: `kesfet.html` (2750 satır, Mekanlar+Gurme sekmeli
liste) + `kesfet-detay.html` (2611 satır, mekan künyesi). Ayrıca index/iftara-doğru/
sahura-doğru'da "İftara Özel Mekanlar / Sahurda Açık Mekanlar" rayları.

**Eski listede:** mutfak filtresi (Türk/Çin/Avrupa), açık günler, online rezervasyon,
rütbe, fiyat ₺–₺₺₺₺₺, "5 km içinde en iyiler" mesafe slider'ı; kartta görsel + puan
badge + izlenme + medya rozetleri + konum (Beykoz/İSTANBUL) + ₺ skalası + aç/kapa
durumu ("30 dk sonra kapanacak").

**Eski detayda:** başlık (ad + mutfak türü + tarih + izlenme + yorum + konum + ₺),
2 slide'lık galeri slider'ı, **sekmeler pane-toggle idi** (Genel Bakış · Fotoğraflar ·
Menüler · Açık Saatler · Yorumlar — `discoverTabMenu` içerik yerinde değiştirir),
ses oynatıcı, editör notu, puan kırılım grafiği, fotoğraflı yorum + cevap + bildir,
sağ sticky kutu (görsel + puan + adres + durum + kaydet + telefon/email/web/yol
tarifi + rezervasyon CTA). Gerçek veri: Nalia Karadeniz Mutfağı, İçerenköy Mah.
Prof. Dr. Ali Nihat Tarlan Cad. No:103 Ataşehir, 0216 469 96 10 — yeni mockup'ta
bu künye aynen kullanıldı.

## ②a mekan-liste-v1.html — facetli mekan dizini ✅ KABUL (Tur 1)

- **Hero:** `lst-hero` ailesi (koyu overlay, tarif-liste atası) — Lezzet Rehberi
  eyebrow + popüler chip'ler (facet'e bağlı) + 3 istatistik.
- **Facetler (sol, `lst-side`/`fct-*` tarif-liste VERBATIM):** Şehir (9+gizli),
  Semt, Mutfak Türü (9), Fiyat ₺/₺₺/₺₺₺, Puan (4.5+/4.0+/3.5+, sarı yıldız),
  Özellikler (kahvaltı/manzara/rezervasyon/bahçe/aile + gizli 2). Eski sitenin
  filtre vaadi modern facet diliyle; **mesafe slider'ı + harita bilinçli YOK**
  (revize2-kesfet kararıyla tutarlı).
- **Kartlar:** v3a ana sayfadaki mekan disc-card anatomisi VERBATIM (`disc-status`
  st-open/st-closing/st-closed + `disc-price-pill` + `m-types` + `disc-loc` +
  r-rate/r-views). 9 mekan, hepsi → mekan-detay. `st-open` (yeşil "Açık") tek yeni
  varyant — st-closing/st-closed ailesinin tamamlayıcısı.
- **Motor:** tarif-liste F2 JS mirası — grup içi OR / gruplar arası AND mock sayacı,
  fchip'ler, sort dropdown, mobil sheet (`?sheet=1`), boş durum (`?empty=1`,
  ₺+₺₺₺ çakışması), sayfalama.

## ②b mekan-detay-v1.html — YENİDEN TASARIM (Tur 2, aynı gün)

### Reddedilen denemeler (tarihçe)
1. **Tur 1 — künye + sağda kompakt slider:** Beyar REDDETTİ ("yerleşim kullanışsız,
   sağa sıkışmış görsel slider kötü").
2. **Tur 2 ilk deneme — Airbnb/Zomato kolajı** (başlık + künye şeridi üstte, altında
   1 büyük + 4 kare mozaik, scrollspy sekme, 2 kolon): Beyar canlı izlerken REDDETTİ
   ("çok görsel; tab basınca one-page gibi kaymasın; **diğer detay sayfalarından
   kopuk, parça parça kart gibi — tutarsız**").

### Nihai tasarım kararı (Beyar konsolide revizesi)
**Site-içi tutarlılık dış referansı yener: bu sitenin "detay sayfası dili"
tarif-detay'dır — mekan-detay onun anatomisini miras alır.**

- **Galeri = TD `rd-gallery` düzeni VERBATIM:** TEK büyük sahne (`rd-stage`, 440px,
  başlık/rozet/puan overlay'i sahne üstünde) + altta yatay thumb şeridi (3 thumb +
  "+8" `tmore` karesi) + sağda `kunye-col` (260px `kc-card`: Mutfak · Fiyat ₺₺ ·
  Semt · Şu An Açık `rdf` satırları + Özellikler chip'leri). Görsel yükü: ilk
  ekranda 4 kare (sahne + 3 thumb) — kolajın 5'i ve eski kurgunun dağınıklığı yok.
- **Galeri davranışı TD VERBATIM:** thumb tıkla → sahne değişir; sahne tıkla →
  lightbox (aktif thumb'dan, 12 fotoğraf); "+8" → doğrudan lightbox. Kaydet/Paylaş
  sahne sağ-üst ikili buton (`md-stage-acts`, r-save dili).
- **Sekmeler = GERÇEK TAB PANELİ** (scrollspy İPTAL — eski sitenin pane-toggle
  kurgusuna dönüş, pf-tabbar görünümüyle): Genel Bakış · Öne Çıkan Lezzetler ·
  Yorumlar(312) · Adres&Saatler · Tarifler. Pane yerinde değişir (fadeUp), sayfa
  kaymaz; **`?tab=` derin link** (lezzetler|yorumlar|adres|tarifler, replaceState).
  Sahnedeki "312 değerlendirme" linki yorumlar sekmesini açar.
- **Gövde = TD iki kolon ritmi:** sol seçili pane (`rd-sec-head` eyebrow+h2
  tipografisi, kart-kutu YOK — düz akış) + sağ sticky künye kolonu (harita mock +
  adres + telefon + Yol Tarifi/Ara + çalışma saatleri tablosu) her sekmede sabit.
- **Pane içerikleri:** Genel Bakış = 3 paragraf tanıtım; Lezzetler = görselli yemek
  kartı 2'li grid (foto + ad + ₺ + mini açıklama + İmza/Mevsimlik rozeti) + fiyat
  uyarı notu; Yorumlar = rev-summary + rs-bars + yıldız-zorunlu rev-form + filtre +
  3 c-item (mekân cevabı nested, domates "Mekân" rozeti) — TD rev kiti VERBATIM;
  Adres&Saatler = harita+iletişim | saat tablosu (`ap-grid` 2 kolon); Tarifler =
  r-card rayı (5 kart, row-nav oklu) → tarif-detay.
- **Benzer mekânlar:** sayfa altı TAM GENİŞLİK (TD "benzer" ritmi), 3 disc-card
  (4'ten düşürüldü — görsel verimlilik) → mekan-detay.
- Harita CSS-çizim mock (embed YOK — Laravel fazı); eski sitenin Rezervasyon CTA'sı
  hâlâ bilinçli dışarıda (açık soru 1).

### Düzeltilen gerçek bug (probe yakaladı)
Lightbox markup'ı `page-main` İÇİNE konmuştu; `.page-main{position:relative;
z-index:2}` stacking context'i lightbox'ın `z-index:100`'ünü header'ın (z 60-70)
altında bırakıyor, kapat butonu tıklanamıyordu. TD'deki gibi `</main>` DIŞINA
taşındı — probe ile doğrulandı.

## ③ Köprüler (tamamı korundu)

| Nereden | Ne | Nereye |
|---|---|---|
| anasayfa-portal-v3a `#paneMekan` 3 kart | onclick | mekan-detay-v1 |
| anasayfa-portal-v3a keşfet "Tamamını Gör" | aktif sekmeyi izler (`#discSeeAll`) | Mekanlar→mekan-liste · Gurme→kesfet-v1 |
| kesfet-v1 Mekân rozetli 3 disc-card | data-open→onclick | mekan-detay-v1 |
| kesfet-v1 "Mekânlar" kategori chip'i | anchor | mekan-liste-v1 |
| mekan-liste 9 kart | onclick | mekan-detay-v1 |
| mekan-detay breadcrumb | Keşfet / Mekânlar | kesfet-v1 / mekan-liste-v1 |
| mekan-detay Tarifler pane'i (5 r-card + Tamamını Gör) | onclick/href | tarif-detay-v1 / tarif-liste-v1 |
| mekan-detay "Benzer mekânlar" + Tüm Mekânlar | onclick/href | mekan-detay-v1 / mekan-liste-v1 |

**Gurme Lezzetler bloğuna dokunulmadı.**

## ④ Kanıt (yeniden tasarım sonrası, Playwright gerçek tıklama)

| Kontrol | Sonuç |
|---|---|
| Tab paneli: Lezzetler/Adres/Tarifler tıkla → pane yerinde değişir, `window.scrollY` SABİT | ✅ |
| `?tab=lezzetler` derin link → doğru pane açık; tıklamada URL replaceState | ✅ |
| Thumb tıkla → sahne görseli değişir + active çerçeve | ✅ |
| Sahne tıkla → lightbox 2/12 (aktif thumb'dan); ok → 3/12; kapat ✅; "+8" → 4/12; ESC ✅ | ✅ |
| Lightbox kapat butonu header'a yenilmiyor (stacking context fix) | ✅ |
| "312 değerlendirme" → Yorumlar pane'i | ✅ |
| Tarifler rayı ok butonu track'i kaydırıyor | ✅ |
| Köprüler: r-card→tarif-detay · benzer→mekan-detay · breadcrumb→mekan-liste · liste kartı→detay | ✅ 4/4 |
| Konsol (tüm oturum: 1440 + 390 + tüm tıklamalar) | ✅ 0 error / 0 warning |
| 390 yatay taşma | ✅ `scrollWidth=375` |
| §3b tek sabit alt katman (çerez ?cc=1 → nav `bn-hidden`; kabul → nav geri; probe ≥1.4s) | ✅ |
| Mobil tab geçişi (390) | ✅ |

**SS** (`mockups/.ss-scratch/mekan/`): `v3-detay-1440-hero.png` ·
`v3-detay-1440-full.png` · `v3-detay-390.png` · `v3-detay-390-full.png`
(liste SS'leri Tur 1'den: `mekan-liste-1440.png` · `mekan-liste-390.png`)

**L1 chrome kıyası:** sayfa `_shell.html` kopyası — header/mega/footer/drawer/
bottom-nav/çerez/görüş-modal bloklarına dokunulmadı; sayfa CSS'i "SAYFA CSS",
sayfa JS'i "SAYFA JS" işaretlerinin altında. Galeri/künye/yorum/sekme dilleri
tarif-detay + v3a kaynaklarından VERBATIM.

## Açık sorular (Beyar / Yasin Bey)

1. **Rezervasyon CTA:** eski sitede "Rezervasyon Oluştur" butonu vardı; koymadım
   (Yol Tarifi + Ara var). İstenirse Laravel fazı — buton mock'u şimdiden eklensin mi?
2. **kesfet-v1 "Mekânlar" chip'i artık sayfaya gidiyor** (filtre değil) — kabul mü?
3. **Mekan verisi alan seti** (Laravel şeması): ad, mutfak türü, semt/şehir, adres,
   tel, web, ₺ seviyesi (1–3), puan+kırılım, saatler (gün bazlı), özellik tag'leri,
   imza lezzetler (ad+açıklama+fiyat+görsel), galeri, durum hesaplaması.
4. **"Şu an açık" hesaplama** mock'ta statik — gerçek saat hesabı Laravel fazı.

## Lessons adayları

- **CSS yorumunda `*/` içeren ifade yazma** (`lst-` `fct-` benzeri glob'ları yorumda
  yan yana eğik çizgiyle yazmak bloğu erken kapatır — Tur 1'de iki sayfada yaşandı).
- **YENİ: Detay sayfası ailesinde site-içi tutarlılık dış referansı yener** —
  Zomato/Airbnb anatomileri (kolaj, scrollspy) iki kez reddedildi; kabul edilen çözüm
  tarif-detay anatomisinin mirasıydı. Yeni detay sayfası (ürün, diyetisyen, mekan...)
  ÖNCE tarif-detay düzeninden türetilir, dış referans ancak detayda ilham verir.
- **YENİ: Overlay/modal markup'ı `page-main` İÇİNE koyma** — `.page-main{z-index:2}`
  stacking context'i fixed overlay'i header'ın altında bırakır; lightbox/modal hep
  `</main>` SONRASINA (tarif-detay pattern'ı).
