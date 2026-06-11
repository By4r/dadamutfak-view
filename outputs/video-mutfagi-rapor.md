# F3 — Video Mutfağı (m13 ⭐) Raporu

**Dosya:** `mockups/video-mutfagi-v1.html` · **Durum: TAMAM**
Üç görünüm tek dosyada: A) Video hub · B) Seri detayı (JS toggle, `?seri=1`) ·
C) Dikey 9:16 kısa görünüm "Dada Akış" (`?short=1`).

---

## 1. L1 — Eski template taraması

Eski sitede (drive-download-.../dada-mutfak-icerik/, 70+ HTML) **doğrudan bir
video hub sayfası YOK.** `ls` + `grep -i video` taraması yapıldı; en yakın
akrabalar ve taşınan işlevler:

| Eski karşılık | Ne vardı | Yeni sayfada nereye taşındı |
|---|---|---|
| `index.html` §"En Lezzetli Videolar" (satır ~6310, `best-video-card` carousel) | 4'lü video kart slider'ı, başlık overlay | Hub'daki vid-card grid'i + seri rayları (row-track) — v3a "İzle & Pişir" section'ının hub'a büyütülmüş hâli |
| `tarif-detay.html` / `mutfaga-giris-detay.html` video header (`#header-video-bg`, autoplay loop mp4) | Sayfa başında ambient video arkaplan | Hub hero'nun koyu sinema bandı dili (guide poster + grain); ambient `<video>` bilinçli kullanılmadı (headless SS güvenliği + performans), video oynatma TD `.video-modal`'a taşındı |
| Eski sitede seri / dikey kısa video kavramı | YOK | Sıfırdan: seri rayları + seri detay şablonu + Dada Akış 9:16 overlay (research-sistem.md §2.4, m13+m28) |

## 2. Kullanılan bileşenler (kaynak)

- **Verbatim v3a:** `vid-card/.vid-thumb/.play/.vcat/.vmeta` (401–416), `.m-types/.mt` (775–776), `.r-author/.av`, `.r-views` (309–312, 795–796), mobil vid-grid snap (1141–1147), `#vidTrack>*{width:276px}` genişlik kuralı (`.vray .row-track>*` olarak)
- **Verbatim TD:** `.video-modal/.vm-frame/.vm-title` (961–971)
- **Shell'den hazır:** `.sec-head/.sec-tools/.see-all/.row-nav/.row-track/.chip(s)/.btn` + drag-scroll, çerez, footer reveal
- **Guide koyu dili (v3a 337–399) uyarlandı:** hub hero (`.vhub-hero` — slate zemin + guide-poster + grain + `#ff8763` eyebrow) ve Dada Akış bandı (`.dakis-sec` — appband'in `background-attachment:fixed` tekniği, ≤640 scroll fallback)
- **Yeni bileşenler (token diliyle):** `.vh-feat` (feat-big'in video varyantı), `.vq-item` sıradaki kuyruğu, `.vray-head` seri ray başlığı, `.short-card` 9:16 kart, `.sd-hero/.ep-row` seri detayı, `.dakis/.dk-*` dikey overlay. Radius yalnız token, pill yok, görseller div+bg-image+filtre suffix'i, FA 6.5.2.

## 3. Sayfa kurgusu

1. **Hub hero (koyu sinema bandı):** başlık + 412 video / 12 seri / 28,4M istatistik şeridi; solda Haftanın Videosu (büyük 16:9, play, süre rozeti, şef+izlenme meta, "Şimdi İzle" → video modal, "Tarife Git" → `tarif-detay-v1.html`); sağda numaralı "Sıradaki" kuyruğu (3 satır, tıklayınca modal).
2. **Seri rayları (3 ray):** "10 Dakikada Yemekler" (5 bölüm), "Şef Teknikleri" (4), "Yöresel Lezzetler" (4) — her ray: mini kapak + seri adı + abone/bölüm metası + "Seriyi Aç" + row-nav okları; kartlar verbatim vid-card (vcat = "N. Bölüm").
3. **Dada Akış bandı (koyu):** 6 adet 9:16 `.short-card` (hover'da glass play), tümü C görünümünü ilgili index'te açar; "Tümünü İzle" de açar.
4. **Tüm Videolar:** filtre çipleri (Tümü/Tarif/Teknik/Seri/Kısa) + 8'li vid-card grid + "Daha Fazla Video". Çipler `data-vf` ile grid'i filtreler, sayaç günceller.
5. **Seri detayı (B):** koyu panel (kapak + fragman play / başlık + açıklama + 8 bölüm·1sa18dk·abone metası + 3/8 ilerleme barı + "İzlemeye Devam Et · 4. Bölüm" + abone toggle) → bölüm listesi (numara + thumb + süre rozeti + başlık/özet/meta; 1–3 İzlendi ✓ yeşil, 4 "Devam Et" domates vurgulu satır, 5–8 nötr) → "Diğer Seriler" 3'lü kart.
6. **Dikey görünüm (C):** tam ekran `.dakis` — IG tarzı segment bar, kategori chip'i, merkez play/pause (b-roll `assets/video/dada-food-broll.mp4`, preload yok, poster hâli SS-güvenli), alt bölgede başlık + şef satırı (takip toggle + izlenme), sağda dikey aksiyon kolonu (beğen sayaçlı / kaydet / paylaş / **Tarife Git** → tarif-detay-v1.html), ↑/↓ ok butonları + klavye ↑/↓, ESC/X kapanış, alt ortada "n / 6" sayacı. İçerik 6 kayıtlık JS dizisinden render edilir.

## 4. Bilinçli kararlar

- **Seri rayları = bölüm kartları:** "Seri rayı" yorumunda Netflix modeli seçildi — her ray BİR serinin bölümlerini akıtır (seri-kapağı kartlarından oluşan tek ray yerine). Seri keşfi `.vray-head` + "Diğer Seriler" grid'iyle karşılanıyor.
- **Hub↔Seri geçişi JS toggle** (scroll-section değil): `#hubView` gizlenir, `#seriesView` açılır, scroll-top + footer reveal `resize` tetiklenir. Tüm "Seriyi Aç" linkleri tek örnek şablona gider (mockup).
- **"Kısa" filtre çipi grid'i filtrelemez, doğrudan Dada Akış overlay'ini açar** (kısa içerik 9:16, grid diline girmiyor).
- **Cookmode kopyalanmadı:** overlay yalnız *dil* olarak referans alındı (tam ekran fixed + visibility/opacity geçişi + progress kurgusu), tüm class'lar `dk-` önekiyle sıfırdan.
- **Ambient hero videosu yok:** mock videolar yalnız kullanıcı jestiyle oynar (modal + dakış play). `preload="none"`, poster hâli varsayılan → headless SS timeout riski yok. (`assets/video/guide-cooking.mp4` ve `dada-food-broll.mp4` varlığı `ls` ile doğrulandı.)
- **Mobil ≤640:** hero merkez play gizlendi (bottom-anchored başlıkla çakışıyordu; süre rozeti + "Şimdi İzle" CTA'sı oynatmayı taşıyor); dakış sahnesi full-bleed, aksiyon kolonu/oklar sahne içine `absolute` alındı (koyu yarı saydam zemine geçirildi); ep-row kompakt (numara+özet gizli, "İzlendi/Devam Et" icon-only).
- Görseller onaylı mockup'lardaki Unsplash ID havuzundan; içerik-görsel uyumsuzluğu tespit edilen tek kısa video (patates başlığı/soğan görseli) içerik tarafında düzeltildi.

## 5. SS doğrulaması

Hepsi `mockups/.ss-scratch/` altında:

| SS | İçerik |
|---|---|
| `video-1440.png` | 1440 fold (hero + kuyruk) |
| `video-1440-full.png` | 1440 tam sayfa (raylar, akış bandı, grid, footer) |
| `video-1440-seri.png` | Seri detayı (`?seri=1`) |
| `video-1440-short.png` | Dikey görünüm (`?short=1`, poster hâli) |
| `video-390.png` / `video-390-full.png` | 390 fold + tam sayfa |
| `video-390-seri.png` / `video-390-short.png` | 390 seri + dikey |
| `video-mobile500-short.png` | Dikey görünüm mobil doğrulaması (aksiyon kolonu görünür — aşağıdaki artifact notuna bakınız) |

- **Konsol: 0 hata** (1440 + 390, `--enable-logging=stderr`).
- **390 yatay scroll yok** (`scrollWidth == innerWidth` debug ölçümüyle doğrulandı; global `overflow-x:hidden` + snap pattern).
- **Bilinen artifact'in kök nedeni tespit edildi (kılavuz §4'ü açıklıyor):** macOS headless Chrome'da pencere genişliği min. **500px**'e zorlanıyor; layout 500px'te kurulup SS 390'a kırpılıyor → sağa yaslı öğeler (header ikonları, dakış aksiyon kolonu, X) kadraj dışında kalıyor. Gerçek 390 viewport'ta hepsi içeride — `video-mobile500-short.png` aynı breakpoint'in kırpılmamış kanıtı. Bu bulgu lessons.md'ye aday (dosya read-only olduğundan yazılmadı).

## 6. Açık sorular (3)

1. **Ray modeli onayı:** Raylar "bir serinin bölümleri" olarak kurgulandı (Netflix modeli). Alternatif: tek "Seriler" rayında seri-kapağı kartları. Yasin Bey hangisini görmek ister?
2. **Dada Akış gezinme:** Mockup'ta ok butonları + klavye var; gerçek üründe mobilde dikey swipe/scroll-snap akışı (m28) isteniyor mu? (Prototipe swipe eklenebilir.)
3. **Seri detayı ayrı sayfa mı?** Şu an aynı dosyada JS toggle. Üretimde `video-seri/{slug}` ayrı route olacaksa şablon zaten bağımsız section — kopyalanabilir.

## EK — Beyar SS Turu Kararları (2026-06-11)

- ✅ BEĞENİLDİ. **Eklendi:** Dada Akış dikey görünümüne mobil swipe (m28) — yukarı kaydır → sonraki, aşağı → önceki (60px dikey eşik, 700ms süre eşiği; buton dokunuşları etkilenmez).
- Seri detayı ayrı route → stack fazı işi; JS toggle KALIR.
- Ray modeli (Netflix bölüm rayı vs seri kapağı kartları) → PATRON KARARI BEKLİYOR.
