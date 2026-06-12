# Keşfet Mekan Modülü — mekan-liste-v1 + mekan-detay-v1

> Tarih: 2026-06-12 · Kaynaklar: eski `kesfet.html`/`kesfet-detay.html` L1 envanteri,
> `outputs/revize2-kesfet.md`, kılavuz §0–§4 · Commit: **YOK — Beyar onayı bekliyor**

## ① L1 Araştırma — eski template mekan ailesi

Eski sitede mekan ailesi 2 sayfa: `kesfet.html` (2750 satır, Mekanlar+Gurme sekmeli
liste) + `kesfet-detay.html` (2611 satır, mekan künyesi). Ayrıca index/iftara-doğru/
sahura-doğru'da "İftara Özel Mekanlar / Sahurda Açık Mekanlar" rayları.

**Eski listede:** mutfak filtresi (Türk/Çin/Avrupa), açık günler, online rezervasyon,
rütbe, fiyat ₺–₺₺₺₺₺, "5 km içinde en iyiler" mesafe slider'ı; kartta görsel + puan
badge + izlenme + medya rozetleri + konum (Beykoz/İSTANBUL) + ₺ skalası + aç/kapa
durumu ("30 dk sonra kapanacak").

**Eski detayda:** başlık (ad + mutfak türü + tarih + izlenme + yorum + konum + ₺),
2 slide'lık galeri slider'ı, sekmeler (Genel Bakış · Fotoğraflar · Menüler · Açık
Saatler · Yorumlar), ses oynatıcı, editör notu, puan kırılım grafiği, fotoğraflı
yorum + cevap + bildir, sağ sticky kutu (görsel + puan + adres + durum + kaydet +
telefon/email/web/yol tarifi + rezervasyon CTA). Gerçek veri: Nalia Karadeniz
Mutfağı, İçerenköy Mah. Prof. Dr. Ali Nihat Tarlan Cad. No:103 Ataşehir,
0216 469 96 10 — yeni mockup'ta bu künye aynen kullanıldı.

## ② Üretilen sayfalar (64 üretim sayfası oldu)

### mekan-liste-v1.html — facetli mekan dizini
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

### mekan-detay-v1.html — mekan profili (Beyar revizeli final kurgu)
- **Künye + kompakt slider yan yana** (md-hero 1fr/460px): ad + puan(312 değ.) +
  ₺₺ + konum + "Açık · 23.00'e kadar" + Kaydet/Paylaş solda; 4 kareli snap slider
  (ok + 1/4 sayaç, mobilde native swipe) sağda. İlk kolaj denemesi (1 büyük + 4
  küçük) Beyar tarafından "çok görsel" bulundu → ELENDİ; eski sitenin slider
  kurgusuna dönüldü.
- **Sticky sekme barı:** `pf-tabbar` mirası (mutfak-defteri VERBATIM) — Genel
  Bakış · Öne Çıkan Lezzetler · Yorumlar(312) · Adres&Saatler · Tarifler;
  pane değil **scrollspy** (bölüme kaydırır; eski site sekme kurgusunun modern
  best-practice karşılığı, Beyar onaylı "künye + sticky sekme" alternatifi).
- **Ana kolon:** Hakkında (özellik tag'leriyle) → Öne Çıkan Lezzetler (dish-row:
  küçük görsel + ad + İmza Lezzet/Mevsimlik rozeti + ₺ fiyat + fiyat uyarı notu)
  → Yorumlar (rev-summary + rs-bars + rev-form yıldız-zorunlu + 3 c-item; mekân
  cevabı nested reply olarak — `c-deg` domates "Mekân" rozeti).
- **Bilgi kolonu (sticky; mobilde order:-1 ile EN ÜSTE):** CSS-çizim harita
  mock'u (cadde gradient'leri + domates pin — **gerçek embed YOK**, Laravel fazı)
  + adres/telefon/web + Yol Tarifi/Ara CTA; çalışma saatleri tablosu (bugün
  rozeti + "şu an açık" + Pazar kapalı).
- **Alt raylar:** "Bu mekânın mutfağından tarifler" r-card rayı (5 kart,
  row-track + oklar) → tarif-detay-v1; "Benzer mekânlar" 3 mekan disc-card →
  mekan-detay.

## ③ Köprüler

| Nereden | Ne | Nereye |
|---|---|---|
| anasayfa-portal-v3a `#paneMekan` 3 kart | onclick | mekan-detay-v1 |
| anasayfa-portal-v3a keşfet "Tamamını Gör" | **aktif sekmeyi izler** (yeni `#discSeeAll` + 2 satır JS) | Mekanlar→mekan-liste · Gurme→kesfet-v1 |
| kesfet-v1 Mekân rozetli 3 disc-card (grid 2 + ilgili 1) | data-open→onclick | mekan-detay-v1 |
| kesfet-v1 "Mekânlar" kategori chip'i | button→anchor (görünüm aynı) | mekan-liste-v1 |
| mekan-liste 9 kart | onclick | mekan-detay-v1 |
| mekan-detay breadcrumb | Keşfet / Mekânlar | kesfet-v1 / mekan-liste-v1 |
| mekan-detay tarif rayı + Tamamını Gör | onclick/href | tarif-detay-v1 / tarif-liste-v1 |
| mekan-detay "Benzer mekânlar" + Tüm Mekânlar | onclick/href | mekan-detay-v1 / mekan-liste-v1 |

**Gurme Lezzetler bloğuna dokunulmadı** (v3a paneGurme 3 kart + kesfet-v1 gurme/
etkinlik/rota kartları aynen kesfet-v1 uzun-form akışında).

## ④ Kanıt

| Kontrol | Sonuç |
|---|---|
| Tıklama yolculuğu (Playwright, gerçek click) | ✅ anasayfa → kesfet (chip) → mekan-liste (kart) → mekan-detay (r-card) → tarif-detay |
| Konsol (anasayfa, kesfet, liste, detay) | ✅ 0 error / 0 warning |
| 390 yatay taşma | ✅ her iki sayfa `scrollWidth=375` |
| §3b tek sabit alt katman | ✅ çerez açıkken nav `bn-hidden`; çerez kapanınca tek katman bottom-nav (probe ≥1.3s bekletildi) |
| bottom-nav hedefleri | ✅ 5 link kanonik set |
| Facet motoru | ✅ chip/sayaç/temizle; `?empty=1` → boş durum + grid gizli; `?sheet=1` → mobil sheet |
| kesfet-v1 regresyon | ✅ data-open kart → uzun-form açıldı → geri döndü |
| CSS yorum tuzağı | 🔧 bulundu+düzeltildi: yorum içindeki `lst-*/fct-*` ifadesindeki `*/` bloğu erken kapatıp `.lst-top`'u yutuyordu (her iki yeni sayfada) |

**SS** (`mockups/.ss-scratch/mekan/`): `mekan-liste-1440.png` · `mekan-detay-1440.png`
· `mekan-liste-390.png` · `mekan-liste-390-sheet.png` · `mekan-detay-390.png`

**L1 chrome kıyası:** her iki sayfa `_shell.html` kopyası — header/mega/footer/
drawer/bottom-nav/çerez/görüş-modal bloklarına dokunulmadı; sayfa CSS'i "SAYFA CSS",
sayfa JS'i "SAYFA JS" işaretlerinin altında. Kart/facet/yorum dilleri kaynak
dosyalardan VERBATIM (üstte belirtilen kaynaklarla).

## Açık sorular (Beyar / Yasin Bey)

1. **Rezervasyon CTA:** eski sitede "Rezervasyon Oluştur" butonu vardı; Zomato-hafif
   karar gereği koymadım (Yol Tarifi + Ara var). Mekan başına rezervasyon akışı
   istenirse Laravel fazı işi — buton mock'u şimdiden eklensin mi?
2. **Mekan fotoğrafları sekmesi:** eski detayda ayrı "Fotoğraflar" sekmesi vardı;
   yeni kurguda galeri 4 kare slider'a indirildi (Beyar revizesi yönünde). "+N tüm
   fotoğraflar" lightbox'ı istenirse TD `.lightbox` mirası hazır.
3. **kesfet-v1 "Mekânlar" chip'i artık sayfaya gidiyor** (filtre değil) — kabul mü,
   yoksa kesfet içinde filtre kalsın + ayrı "Tüm Mekânlar" linki mi?
4. **Mekan verisi alan seti** (Laravel şeması): ad, mutfak türü, semt/şehir, adres,
   tel, web, ₺ seviyesi (1–3), puan+kırılım, saatler (gün bazlı), özellik tag'leri,
   imza lezzetler (ad+açıklama+fiyat+görsel), galeri, durum (açık/kapanıyor/kapalı
   hesaplaması). Eski sitedeki izlenme/medya rozetleri korunuyor.
5. **"Şu an açık" hesaplama** mock'ta statik — gerçek saat hesabı Laravel fazı.

## Lessons adayı

- **CSS yorumunda `*/` içeren ifade yazma** (`lst-*/fct-*` gibi glob'lar yorum
  bloğunu erken kapatır, ilk kuralı sessizce yutar — iki sayfada yaşandı,
  `bilesen-kilavuzu`ya kural eklenebilir).
