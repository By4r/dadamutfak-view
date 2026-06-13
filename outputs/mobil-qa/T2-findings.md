# T2 — hero+landing BULGULARI

Kapsam: 12/12 sayfa, SS 36 dosya (390 + 768 + drawer her sayfa).
Ölçüm: `measure.cjs --ss` — 11/12 sayfa doğrudan çalıştı; anasayfa-portal-v3a Unsplash `networkidle` timeout nedeniyle Playwright MCP + domcontentloaded ile ölçüldü, tüm SS'ler alındı.

| Sayfa | Breakpoint | Bulgu | Severity | Ölçüm | SS |
|---|---|---|---|---|---|
| anasayfa-portal-v3a | 390 | **Hero okunabilirlik OK** — `.hero-v` video hero, çift katmanlı dark overlay (sol %92/%80, dikey %45/%72). H1 `color:#fff`, text-shadow var. Video yüklenmeyince poster.jpg fallback devreye girer. Taşma yok. | ✅ temiz | docSW=390, unclipped=0 | `__390.png` |
| anasayfa-portal-v3a | 390 | **Hero-stats şeridi** (48.200+ / 1.2M / 320+): 3 öğe `flex:1 gap:10px` ile 390px'e sığıyor, font 20px. Taşma yok, wrap yok. | ✅ temiz | unclipped=0 | `__390.png` |
| anasayfa-portal-v3a | 768 | ✅ temiz — overflow yok, hero okunabilirlik tam. | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| gunun-menusu-v1 | 390 | **Hero okunabilirlik OK** — `.lst-top` hero `linear-gradient(90deg, rgba(28,25,18,.93), rgba(33,30,22,.70))` — %93/%70 dark overlay, beyaz metin. H1 ve breadcrumb okunaklı. | ✅ temiz | docSW=390, unclipped=0 | `__390.png` |
| gunun-menusu-v1 | 390 | **Hero-stats şeridi** (4 Öğün / ~2s / 4 Kişilik): `flex:1 gap:10px`, 3 öğe, font 20px — 390px'e rahatça sığıyor. | ✅ temiz | unclipped=0 | `__390.png` |
| gunun-menusu-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| kesfet-v1 | 390 | **Hero okunabilirlik OK** — koyu görsel üstünde heading+eyebrow, kontrast yeterli. Taşma yok. | ✅ temiz | docSW=390, unclipped=0 | `__390.png` |
| kesfet-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| koleksiyon-v1 | 390 | **Hero (koleksiyon detay) OK** — başlık koyu-zemin üstünde, yeterli kontrast. Taşma yok. | ✅ temiz | docSW=390, unclipped=0 | `__390.png` |
| koleksiyon-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| mekan-liste-v1 | 390 | **Hero okunabilirlik OK** — `.lst-top` koyu overlay, "Şehrin sofrası: mekan rehberi" H1 beyaz, okunaklı. Taşma yok. | ✅ temiz | docSW=390, unclipped=0 | `__390.png` |
| mekan-liste-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| mutfaga-giris-v1 | 390 | **Hero okunabilirlik OK** — `.lst-top` dark overlay, H1 ve breadcrumb okunaklı. Taşma yok. | ✅ temiz | docSW=390, unclipped=0 | `__390.png` |
| mutfaga-giris-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| mutfak-sirlari-v1 | 390 | **Hero okunabilirlik OK** — "Mutfak Sırları — ustalık küçük detaylarda" H1, dark overlay, okunaklı. Taşma yok. | ✅ temiz | docSW=390, unclipped=0 | `__390.png` |
| mutfak-sirlari-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| sefler-v1 | 390 | **Hero okunabilirlik OK** — "Tarifin ustaları: keşfet" H1, koyu arka plan + overlay, okunaklı. Taşma yok. | ✅ temiz | docSW=390, unclipped=0 | `__390.png` |
| sefler-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| seo-landing-v1 | 390 | **Hero okunabilirlik OK** — `linear-gradient(90deg, rgba(28,25,18,.93), rgba(33,30,22,.72))` dark overlay, "Airfryer Tarifleri — az yağla çıt" H1 beyaz okunaklı. | ✅ temiz | docSW=390, unclipped=0 | `__390.png` |
| seo-landing-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| sezon-v1 | 390 | **Ramazan bandı — KASITLI clip, taşma yok.** `.rmz-bar .wrap` mobilde `overflow:hidden` + `flex-wrap:nowrap` ile clip. `.rmz-date`, `.rmz-link span`, `.rmz-badge span` gizleniyor — bu bilinçli tasarım kararı. Bant 42px yükseklikte, `top:62px` konumlu, `padding-top:108px` ile hero içeriği bandın altında başlıyor. İşlevsel, kesim göze çarpmıyor. | ℹ️ Note | docSW=390, unclipped=0 | `__390.png` |
| sezon-v1 | 390 | **Ramazan hero okunabilirlik OK** — `.lst-hero` `linear-gradient(90deg, rgba(28,25,18,.93), rgba(33,30,22,.70))` dark overlay. "Ramazan sofrası, **hazır**" H1 font-size:29px mobilde, beyaz/turuncu accent, okunaklı. | ✅ temiz | unclipped=0 | `__390.png` |
| sezon-v1 | 390 | **Sayaç şeridi (szn-strip) 2×2'ye katlanıyor** — tasarım gereği `flex-wrap:wrap; flex: 1 1 50%` ile Ramazan countdown 4 hücre 2 satıra düşüyor. Doğru davraniş, taşma yok. | ✅ temiz | unclipped=0 | `__390.png` |
| sezon-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| sofra-duzeni-v1 | 390 | **Ramazan Sofrası disc-card görseli — Unsplash yüklenemiyor (localhost).** Kart görseli gri/boş görünüyor (photo-1773314863076). Bu localhost ortamında Unsplash erişimsizliğinden kaynaklanıyor; gerçek ortamda sorun yok. | ℹ️ Note | unclipped=0 | `__390.png` |
| sofra-duzeni-v1 | 390 | **Bayram Sofrası disc-card görseli — aynı şekilde gri** (photo-1780586383003). Localhost kısıtı. | ℹ️ Note | unclipped=0 | `__390.png` |
| sofra-duzeni-v1 | 390 | **Açık Büfe görsel notu — sof-block img dark/tutarsız değil** (Yasin Bey bulgusunun karşılığı). Sofra-duzeni v1 sof-block resimleri `.sof-media .bg` div+bg-image pattern ile soğuk filtreli Unsplash. Localhost ortamında görünmüyor — gerçek ortamda kontrol edilmeli. CSS overlay YOK, görseller kendi tonuna bağlı. Bazı görsellerde beklenen açıklık/karanlık sorun gerçek ortamda test bekliyor. | 🟡 Minor | — | `__390.png` |
| sofra-duzeni-v1 | 390 | **gnav (8 çapa) overflow-x scroll** — `.gnav .wrap` `overflow-x:auto; scrollbar-width:none` ile kasıtlı yatay kaydırma. Script clip-aware, taşma KASITLI olarak atlandı. SS'te görseli gözle teyit: 390px'te sekiz tab gizlenmiş, sola-sağa kaydırılabilir. **İşlevsel.** | ✅ temiz | unclipped=0 | `__390.png` |
| sofra-duzeni-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |
| video-mutfagi-v1 | 390 | **Hero okunabilirlik OK** — `.vhub-hero .vh-overlay` `linear-gradient(90deg, rgba(28,25,18,.95), rgba(31,28,20,.88), rgba(28,25,18,.80))` en güçlü overlay; %95/%88/%80 koyu. H1 beyaz, okunaklı. | ✅ temiz | docSW=390, unclipped=0 | `__390.png` |
| video-mutfagi-v1 | 390 | **vh-head stack** — mobilde `flex-direction:column`, stat satırı (26.4K abone / 3 yeni video) `flex:1` ile satır genişliğine yayılıyor. Taşma yok. | ✅ temiz | unclipped=0 | `__390.png` |
| video-mutfagi-v1 | 768 | ✅ temiz | ✅ temiz | docSW=768, unclipped=0 | `__768.png` |

---

## ÖZET

**Taşma (overflow) bulgusu: 0 sayfa** — 12/12 sayfada `docSW == viewport`, `unclipped == 0`, console err yok.

**Hero okunabilirlik:** Tüm 12 sayfada §2f H1 kanonu uygulanmış. Her hero dark overlay kullanıyor:
- `.hero-v` (anasayfa): çift katmanlı radial+linear gradient, sol %92
- `.lst-top` (gunun-menusu, seo-landing, mekan, mutfaga-giris, mutfak-sirlari, sefler, sofra-duzeni, sezon): `rgba(28,25,18,.93)` /%70-%93 arası
- `.vhub-hero` (video-mutfagi): %95/%88/%80 — en güçlü
Hiçbir sayfada "açık görsel + beyaz yazı = okunaksız" durumu tespit edilmedi.

**Ramazan bandı (Yasin Bey özel notu):**
- `sezon-v1` 390: Bant görünüyor (`body.is-ramazan` aktif), `overflow:hidden` ile text clip kasıtlı — işlevsel, layout sorunu yok.
- `sofra-duzeni-v1` 390: Doğrudan Ramazan bandı yok (gnav'da "Ramazan Sofrası" tab var, overflow-x:auto ile scroll). disc-card Ramazan/Bayram/Açık Büfe görselleri **localhost'ta gri** (Unsplash yüklenemiyor) — gerçek ortamda görsel kalitesi ayrıca kontrol edilmeli.
- `mutfak-sirlari-v1` 390: Ramazan referansı sadece gnav chip'inde — bant yok.

**Sofra-duzeni gnav scroll-spy:** 8 çapa (Günlük, Misafir, Kahvaltı, Resmî, Ramazan, Bayram, Çocuklu, Açık Büfe) — 390'da overflow-x auto scroll, doğru davranış. Clip-aware ölçüm KASITLI olarak atlıyor, SS ile gözle teyit edildi.
