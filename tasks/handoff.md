# DadaMutfak — Handoff

## Madde 26 — Yol Güzergahım (DURUM: ✅ KAPANDI — DadaMutfak mockup paketi 30/30 TAMAM)

### TAM KURGU (plan → keşfet → kaydet → replay → checkpoint → rozet) — hepsi çalışır/commit'li
- **A Revize** (Sürüş Kabini): örtme %60→%19, çakışma 0px, akış CTA, toggle pill, mobil.
- **Faz A** (kurgu erişim): Kaydet→localStorage `dada_yg` + sayfa-içi "Kayıtlı Güzergahlarım" (slider, tek
  satır) + "Haritada Aç" replay (setEndpoint/toggleStop) + Sil.
- **3 giriş noktası** (cream/tomato): kesfet-v1 Mekan Bul bandı + anasayfa-portal-v3a beyaz kart şerit (gölge,
  görünür) + mekan-detay-v1 CTA (dikey ortalı, radius tutarlı). dizin.html güncel.
- **Faz B** (checkpoint + rozet yansıma):
  - CHECKPOINT: kayıtlı kart "Detay/Checkpoint" → sayfa-içi açılır blok (örtmesiz), durak "ziyaret ettim"
    toggle + ilerleme N/M bar. localStorage'a **route-scoped** yazar.
  - ROZET: rozetler-v1 "Keşif & Mekan" kategorisi + "Yol Üstü Gurme" ilerlemeli kilitli kart (eşik 10);
    mutfak-defteri "Ziyaret" sayacı + teaser. **unique mekan seti**nden beslenir, cross-page senk (load +
    storage event).
- **3 bug-fix** (commit öncesi Beyar testi):
  - BUG1: visited GLOBAL mekan-adı anahtarı → aynı mekan farklı güzergahta otomatik ziyaret görünüyordu →
    **route-scoped** `visited{routeId:{ad:true}}` + eski-flat migrasyon (reset+write-back). İzolasyon tam.
  - BUG2: rozet/defter route-scoped'tan **unique** türetir + storage event senk.
  - BUG3: GERÇEK BUG DEĞİLDİ (sayım her yerde tutarlı 4); "5-6" algısı = 4 mekan + 2 uç marker. Görsel
    ayrıştırma yapıldı (aşağı).
- **Uç-marker görsel ayrıştırması** (frontend-design, palet-içi): liste = transit hattı — Kalkış/Varış
  *terminal* (uppercase kicker + hollow dot, numarasız) vs *istasyon* (1-N numaralı tomato rozet) + "N mekan"
  başlık çipi; harita = uçlar küçük yuvarlak terminal, mekanlar büyük teardrop. Sayım/koridor dokunulmadı.

### NOTLAR
- vanilla HTML/CSS/JS, header inline shell her sayfada kopya. Motor JS (render dışı veri/koridor/sayım)
  korundu. localStorage gerçek tarayıcıda çalışır (artifact değil).
- Dizin: yol-guzergahim-v1 "Restoran & İşletme" grubunda (mekan ekosistemi).
- `dada_yg` şeması: `{routes:[{id,from,to,stops[],dateStr}], visited:{routeId:{mekanAdı:true}}}`. Unique
  ziyaret = tüm route visited setlerinin birleşimi (FARKLI mekan sayısı).

## Sonraki paket (madde 26 sonrası)
- Dalga 3 — birleşik hesap & abonelik merkezi: tek hesap/SSO (DadaMutfak+Store+Fit+Akademi, Store'a ayrı
  giriş yok), üretici kazanç & faturalama paneli (5+ video eşiği), doğum günü tier hediye.

## Stack & disiplin hatırlatma
- Mockup = saf vanilla HTML/CSS/JS (Tailwind/Alpine DEĞİL). Header her sayfada inline kopya.
- Görsel div+bg-image cover/center. Full-file write yok → targeted edit. Yeni renk yok.
- Denetim: 3-viewport (1440/768/390) render + Playwright davranış + Bağlantı Denetimi + Beyar gözle onay.
