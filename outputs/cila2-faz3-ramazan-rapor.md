# CİLA-2 FAZ 3 — RAMAZAN MODU (Patron Konsepti) — Rapor

> Sahip: ramazan teammate · Task #24 · Lead: team-lead
> Durum: **Aşama 1 (Araştırma) + Aşama 2 (Senaryo) TAMAM — Aşama 3 (Uygulama) LEAD GATE bekliyor**
> Tek doğruluk: bu dosya. Kanıt yolları en altta.

---

## AŞAMA 1 — ESKİ TEMPLATE + SİTE AKRABALARI ENVANTERİ (L1 kuralı)

Kaynak: `drive-download-20260608T070112Z-3-001/dada-mutfak-icerik/`.
Ramazan izi taşıyan dosyalar (grep `ramazan|iftar|sahur`, eşleşme sayısıyla):
`iftara-dogru.html` (66) · `sahura-dogru.html` (30) · `assets/css/own.css` (16) ·
`index.html` (8) · `ramazan-menu-detay.html` (3) · `hesabim.html` (2).

### A. `iftara-dogru.html` (3902 satır) — blok envanteri
1. **Nav "Ramazan" dropdown** → İftara Doğru / Sahura Doğru (header + mobil menü, satır 327–334 / 666–673). Site geneli giriş noktası.
2. **Hero (satır 712–798)** — full-width `home-slider`, arka plan `cami.png` (cami silüeti) + `Dada-Ramadan.png` doku; **dark overlay rgba(0,0,0,.3)** (kılavuz overlay kuralıyla uyumlu). İçinde:
   - 2a. Arama input + mikrofon ikonu (hero içi mini arama).
   - 2b. **`dada-iftar-title` "İftar Vaktine"** üst etiket.
   - 2c. **`dada-countdown-display #countdown` "16:10:25"** — büyük canlı geri sayım.
   - 2d. **Şehir seçici buton** "İstanbul, TR ▾" → `#iftarLocationSelectModal` (Konum Seçiniz modalı, satır 3778).
   - 2e. **Hicri + miladi tarih satırı** "20 Cemaziyelevvel 1440 / 20 Aralık Çarşamba".
   - 2f. Sağ kolon: 2 dikey banner (cami-2/cami-3) → mutfaga-giris + sahura-dogru köprüsü.
3. **Kategoriler** rayı (dünya mutfakları bayraklı kart şeridi, 801–947).
4. **İftar Menüleri** rayı (949–1047) — "1./2./3. Gün İftar Menüsü" kartları → menü detayına (ramazan-menu-detay muadili).
5. **İftara Özel Tarifler** grid (1048–1724).
6. **Ramazana Özel Tarifler** grid (1725–2412).
7. **Malzemeye Göre Tarif Ara** bloğu (2413–2542) — tarif-bulucu muadili.
8. **🌙 Günün Ayeti** (2543–2553) — `dada-ramazan-ayet-image-overlay`, cami.png zemin + overlay üstünde ayet metni + italik kaynak. **Editöryel sezon bloğu** (handoff satır 142'de "patron-bekleyen" olarak işaretli).
9. **İftara Özel Mekanlar** rayı (2555+) — keşfet/mekan modülü köprüsü, `bg-ramadan` zemin.
10. **Bugünün Şefi** bloğu (2894+) — şef vitrini.
11. **Konum Seçiniz modalı** (3778+) — şehir bazlı vakit.
12. **Sayaç JS (3854–3879)** — `updateCountdown()`: hedef **19:30** (iftar), geçtiyse +1 gün; saat:dk:sn `setInterval 1000`. **Otomatik sahur'a dönüş YOK.**

### B. `sahura-dogru.html` (3804 satır) — iftara-dogru'nun sahur ikizi
13. Aynı hero iskeleti, etiket **"Sahur Vaktine"** (satır 732).
14. Bölümler: Kategoriler · **Ramazana Özel Tarifler** · Malzemeye Göre Ara · **Sahura Özel Tarifler** (1770) · **Günün Ayeti** (2446) · **Sahurda Açık Mekanlar** (2462) · Bugünün Şefi.
15. **🔴 KRİTİK BULGU — sayaç bug'ı:** sahura-dogru JS'i de hâlâ **`iftarTime.setHours(19,30)`** kullanıyor (satır 3760) — yani sahur sayfasında bile iftar saatine sayıyor (kopyala-yapıştır hatası). **İki sayfa tamamen ayrı; aralarında otomatik geçiş YOK** — kullanıcı nav dropdown'dan elle geçiyor. → Yeni senaryonun ana katma değeri tam burada: **tek mod + otomatik iftar↔sahur döngüsü.**

### C. `ramazan-menu-detay.html` (1148 satır)
16. **Video header hero** (video.mp4 zemin) + hashtag breadcrumb (#Pratik #Hamurişi) + `<h1>` "Menü 1" + ev-ikonu breadcrumb.
17. **`single-header` makale gövdesi** — başlık "Menü 1", meta (yorum 134 · son güncelleme · görüntülenme 204) + **`dada-ramazan-save` bookmark** butonu. Kurgu = küratörlü iftar menüsü (çorba→ana→tatlı tarif zinciri), blog/makale anatomisi.

### D. Site geneli izler
18. **`index.html`** (anasayfa) — sadece nav "Ramazan" dropdown'u taşıyor (327–330 / 666–669); anasayfada ramazan section'ı YOK.
19. **`hesabim.html`** (1017, 1066) — **"Ramazana Özel"** başlıklı kişisel widget (kullanıcı paneline sezon kısayolu).
20. **`assets/css/own.css`** (16 eşleşme) — `dada-iftar-*`, `dada-countdown-display`, `bg-ramadan`, `dada-ramazan-ayet-image-overlay`, `dada-ramazan-save` stilleri.

### E. YENİ SİTE AKRABALARI (mevcut mockup seti)
21. **`sezon-v1.html` (2074 satır) — EN YAKIN AKRABA** (`<title>Ramazan Mutfağı | Sezon`). Eski iftara/sahura bloklarının modern dile taşınmış hâli (dosya içi L1 notu 692–697 bunu açıkça yazıyor):
   - 21a. **`lst-hero` Ramazan varyantı** (koyu overlay .93/.70, ay ikonu eyebrow "Sezon Mutfağı · Ramazan 2026", H1 "Ramazan sofrası, hazır", chip rayı: İftara Doğru / Sahura Doğru / Ramazan Tatlıları, `lst-stats` 1.240 tarif / 30 menü / 86 koleksiyon).
   - 21b. **`szn-strip` vakit/sayaç bandı (hero içi glass)** — 4 hücre: **Bugün** (16 Ramazan 1447) · **İftara Kalan** `#sznCount` canlı sayaç · **İftar** 20:31 · **İmsak** 03:42. JS (2028–2041): hedef **20:31**, geçtiyse +1 gün — yine **tek yönlü, sahur'a dönmüyor.**
   - 21c. **`coldex` koleksiyon dizini** (İftara Doğru 86 · Sahura Doğru 54 · Ramazan Tatlıları 40 · İftar Çorbaları 32...).
   - 21d. Tarif rayları: "İftara Doğru" + "Sahura Doğru" grid'leri (r-card).
   - 21e. **`bg-ramadan` koyu iftar-sofrası separatör bandı** (gunun-menusu/dayband dili).
   - 21f. "Günün Ayeti" + "İftara/Sahurda Açık Mekanlar" eski bloklar → modern dilde gunun-menusu/mekan köprüleriyle çözülmüş (L1 notu).
22. **`gunun-menusu-v1.html`** — ramazan-menu-detay'ın menü-kurgusu köprüsü (L1 notunda işaretli; arşiv rayı `arc-*`).
23. **Nav "Ramazan" / Sezon** — yeni shell'de "Sezon" mega-menü öğesi sezon-v1'e gidiyor (eski "Ramazan" dropdown'ın modern karşılığı).
24. **Handoff bekleyen patron notu** (satır 142): *"Sezon 'Günün Ayeti' bloğu (editöryel) · 'Şef Ol' hedefi"* — Günün Ayeti hâlâ patron kararı bekliyor; bu konseptte **opsiyonel** olarak mode-bar dışında bırakıyorum (kapsam dışı, not olarak taşıyorum).

### F. Mevcut simülasyon altyapısı (miras alınacak — Faz 2 auth pattern)
25. **`_shell.html` auth sözleşmesi (1153–1166):** `?auth=1`→`localStorage.dm_auth='1'`+`body.is-auth`; `?auth=0`→temizle; param yoksa localStorage'a bakar. CSS gating `body.is-auth .x{display:...}` (221–258). **Ramazan modu bunun birebir ikizidir.**
26. **`__bottomStrips` / `__bnUpdate` mobil sabit-alt-katman yöneticisi (1459–1479):** ekranda max 1 sabit alt şerit (§3b). Çerez > sayfa şeridi > bottom-nav. **Ramazan sayaç yerleşimi bu kuralı bozmamalı** → sticky-TOP seçildi (§3b sticky-top'u muaf tutar).

---

## AŞAMA 2 — SENARYO KURGUSU (frontend-design dili kararları)

### S1. Mod önerisi — **BANNER (dismissible üst şerit), modal DEĞİL**
**Karar:** Header altına, in-flow, kapatılabilir ince **davet bandı**.
**Gerekçe:**
- Marka değeri "**sade**" — modal içeriği bloklar, mevsimsel bir öneri için fazla agresif. Faz 2 auth da modal yerine inline pre-fill tercih etti (site dili modalı zorunlu gate'lere saklıyor: lg-gate, görüş bildir).
- §3b: mobilde sabit ALT şerit kotası dolu (çerez/nav). Öneri bandı **üstte ve in-flow** → çakışma yok.
- Davet bandı + aktif mod-bar'ı **aynı görsel dilden** türetiyorum (ay motifi, koyu-warm Ramazan tonu) → tutarlılık.
**Davranış:** "🌙 Ramazan geldi — sofranı DadaMutfak'la kur. **Ramazan Modu**'nu açmak ister misin? [Aç] [Belki sonra]".
- **Aç** → `dm_ramazan='1'` + `body.is-ramazan` → mod-bar belirir, banner kapanır.
- **Belki sonra / ✕** → `dm_ramazan='dismissed'` → **bir daha sorulmaz** (banner bir daha gelmez); mod kapalı kalır.
- (Modal alternatifi değerlendirildi → reddedildi: araya girme + mobil overlay yükü.)

### S2. Sayacın yeri — **STICKY-TOP "Ramazan mod-bar'ı"** (header'ın hemen altı)
**Karar:** `position:sticky; top:<header-offset>` ince, full-width, koyu-warm şerit; sayfanın İLK içerik elemanı; mod aktifken her sayfada görünür.
**Gerekçe:**
- Eski template sayacı dev hero içindeydi ama o **ayrı sayfaydı**; site-geneli kalıcı mod için hero'ya gömmek her sayfa tipinde mümkün değil (form/liste/detay hero'ları farklı).
- **Fixed-bottom yüzen widget → §3b ihlali** (bottom-nav + çerez ile çakışır). **Fixed-top bar → 112/62 header offset matematiğini bozar** (kilitli chrome).
- **Sticky-top** çözümü: in-flow olduğu için offset'i bozmaz (header'ı ittirmez, kendi yüksekliğini akışa ekler), §3b sticky-top'u açıkça muaf tutar (`.dl-filter/.pf-tabbar` gibi), scroll'da header'ın altında kalıcı görünür. **Tek temiz kesişim bu.**
- İçerik: `🌙 Ramazan Modu` rozeti · **otomatik geçişli canlı sayaç** ("İftara 02:41:18" ↔ "Sahura 06:12:40") · küçük hicri tarih · **"Çık"** (mod kapat) + "Sezon →" (sezon-v1 köprüsü).
- Zengin landing (sezon-v1) kendi `szn-strip`'ini korur — mod-bar onu tekrarlamaz, tamamlar.

### S3. Otomatik iftar↔sahur döngüsü (çalışır JS)
**Mock vakitler** (sezon-v1 ile hizalı): İftar **20:31**, İmsak/Sahur **03:42**.
**Faz mantığı (her saniye yeniden değerlendirilir):**
- İmsak(03:42) → İftar(20:31) arası: **"İftara"** sayar (hedef bugünün iftarı).
- İftar(20:31) → ertesi İmsak(03:42) arası: **"Sahura"** sayar (hedef ertesi imsak).
- İftar anı geçince **otomatik "Sahura"ya döner**; imsak geçince **tekrar "İftara"** — etiket + ikon (☀️ güneş ↔ 🌙 ay) + hedef değişir.
**Demo paramı `?demo=1`:** gerçek saat yerine **hızlandırılmış sanal saat** — iftara ~6sn kala başlatır, 0'a iner → "Sahura"ya flip → ~6sn sahura → tekrar iftar. Patron geçişi saniyeler içinde canlı görür. (Demo yokken gerçek saatle çalışır.)

### S4. Simülasyon sözleşmesi (Faz 2 auth mirası)
- `?ramazan=1` → `localStorage.dm_ramazan='1'` + `body.is-ramazan`.
- `?ramazan=0` → `dm_ramazan='0'` (mod kapalı; banner da bastırılır — "kapattım" demek).
- Banner "Belki sonra" → `dm_ramazan='dismissed'`.
- Param yoksa localStorage'a bakılır. **`?ramazan=0` ve localStorage boşken site TAMAMEN normal** (hiçbir mod-bar/banner DOM'da görünmez; `body.is-ramazan` yok).
- Tüm Ramazan UI'si `body.is-ramazan` ile gate'li (auth'taki `display:none` deseni).
- **Öneri bannerı tetiği:** localStorage boş (ne '1' ne '0' ne 'dismissed') VE mod kapalıyken gösterilir. (Mock'ta "ramazan ayındayız" varsayımı; prod'da tarih kontrolü eklenir — not.)

### S5. Kapsam yerleşimi (kontrollü)
Mod-bar + banner + JS **yalnız hedef sayfalara elle gömülür** (sweep YOK — 4-5 dosya, lessons sweep-riskinden kaçınılır):
- `anasayfa-portal-v3a.html` (DIVERGENT — elle patch) · `tarif-liste-v1.html` · `tarif-detay-v1.html` (DIVERGENT — elle patch) · `bugun-ne-pisirsem-v1.html` · **köprü:** `sezon-v1.html` (mod-bar + "Sezon" link hedefi; szn-strip korunur).
- **Prod notu:** gerçek yayılım = `_shell.html` sweep (auth gibi faz-sonu) — bu konsept turunda KAPSAM DIŞI, hedef sayfalarda gömülü demo yeterli.

---

## AŞAMA 3 — UYGULAMA (✅ TAMAM — lead gate onaylı, 5 dosya elle gömüldü)

Uygulanan (her birine 3 INSERT: CSS `</style>` öncesi · markup `<main>` öncesi · JS `</body>` öncesi — silme YOK):
1. `mockups/anasayfa-portal-v3a.html` — DIVERGENT, elle (immersive hero; bump inert, bar hero üstüne yüzer)
2. `mockups/tarif-liste-v1.html` — H1 lst-top; `.below-header` bump
3. `mockups/tarif-detay-v1.html` — DIVERGENT, elle; H2b `.rd-top` bump (özel kural)
4. `mockups/bugun-ne-pisirsem-v1.html` — H3 bnp-top; `.below-header` bump
5. `mockups/sezon-v1.html` — köprü (mod-bar + "Ramazan Mutfağı" link; szn-strip KORUNDU)

**Uygulama notları:**
- Mod-bar `position:fixed; top:112px` (mobil 62px), z-index:55 (header 60'ın altında — spatial olarak header'ın altında oturur). Davet bannerı + canlı sayaç aynı `.rmz-bar` slotunun iki durumu (`.rmz-live` / `.rmz-invite`).
- Gated offset bump: `body.is-ramazan/.rmz-ask .below-header,...rd-top{padding-top:160px}` (mobil 108) — yalnız mod/banner açıkken; v3a immersive hero'da inert (bar yüzer).
- Mobil ≤640: bar kompaktlaşır (tarih/etiketler gizli, ikon+sayaç kalır); §3b ihlali YOK (bar üstte, sabit-alt-katman değil).
- SWEEP YOK — 5 dosya elle (lessons region-swap/CSS-yutma riskinden tamamen kaçınıldı). CSS-INSERT, `*/` yorum guard temiz (0).

**Denetim:** numstat (5 dosya, net pozitif; ramazan-ilişkili SİLME = 0); korunan bileşenler intact (szn-strip 5 · lst-bridge/mega-find 20 · BNP mode-chip 20 · rd-top 6 · hero-v 40); idempotency markeri 3×5 sabit.

---

## KANIT YOLLARI (`outputs/ss-ramazan/`)
- `sezon-baseline-1440.png` — en yakın akraba referans (uygulama öncesi).
- **Öneri banner:** `tl-banner-1440.png` (no param → davet bandı görünür).
- **Aktif mod:** `tl-active-1440.png` · `sezon-active-1440.png` · `sezon-bartop-1440.png` (bar detay) · `v3a-active-1440.png` (immersive hero üstü) · `td-active-1440.png` (rd-top bump → crumb bar altında nefesli).
- **Pasif/normal (`?ramazan=0`):** `tl-normal-1440.png` — bar/banner YOK, site tamamen normal.
- **Mobil (500px):** `tl-active-mob.png` — kompakt bar.
- **İftar↔Sahur otomatik geçiş probe'u (deterministik):** `flip-probe.txt` — 9 mock vakit; flipler: **20:31 İftara→Sahura**, **03:42 Sahura→İftara** (tick() faz mantığı birebir). `?demo=1` ile saniyelerde canlı flip (SS'lerde sayaç akıyor).

## BİLİNEN SINIRLAMALAR
- **Yayılım hedef 5 sayfa** ile sınırlı (kontrollü kapsam) — diğer 65 sayfada mod-bar YOK. Prod yayılımı = `_shell.html` sweep (auth gibi faz-sonu), bu konsept turunda kapsam dışı.
- Mock'ta "ramazan ayındayız" sabit varsayım — öneri bannerı her temiz ziyarette çıkar (prod'da hicri tarih kontrolü gerekir).
- Vakitler tek şehir (İstanbul) sabit mock — şehir seçici (eski env #2d) bu turda kapsam dışı.
- "Günün Ayeti" editöryel bloğu (env #8/#24) patron kararı bekliyor — mode-bar dışında, bilinçli kapsam dışı.
- `?ramazan=0` ve "Çık" → `location.search` ile reload eder (param yazar); mockup demo davranışı, prod'da SPA/no-reload tercih edilebilir.
- Bar `position:fixed` (sticky değil) — senaryoda "sticky-top" denmişti; fixed+gated bump kanon offset'i bozmadan aynı kalıcılığı verir (sticky containing-block sorununu eler). §3b uyumu korunur (üst bar, alt-şerit değil). Görsel sonuç hedeflenenle aynı.
