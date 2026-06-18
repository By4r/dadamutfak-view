# DadaMutfak — Handoff

## Madde 26 — Yol Güzergahım (DURUM: A Revize + Faz A + Navigation BİTTİ/commit'li, Faz B kalan)

### TAMAMLANAN (bu commit)
- A Revize (Sürüş Kabini korundu): örtme %60→%19, çakışma 0px, akış CTA (Kaydet→özet→Düzenle), toggle pill,
  mobil. Motor JS (2172-2456) 0 dokunuş.
- Faz A (kurgu erişim): Kaydet→localStorage dada_yg + sayfa-içi "Kayıtlı Güzergahlarım" (göz önünde) +
  "Haritada Aç" replay (setEndpoint/toggleStop çağrısı) + Sil.
- Navigation (3 giriş, cream/tomato): kesfet-v1 Mekan Bul sekmesine giriş bandı (tab motoru korundu) +
  anasayfa-portal-v3a ayrı cream blok (Günün Tarifi çakışma 0) + mekan-detay-v1 CTA. dizin.html'e eklendi.

### KALAN — FAZ B (checkpoint + rozet yansıma)
Plan: tasks/madde26-plan.md "Kurgu Tamamlama Planı (Faz B)".
- CHECKPOINT: aktif güzergahta durakları "ziyaret ettim" işaretle → görsel tik + ilerleme (N/M). Sayfa-içi
  açılır blok (örtmesiz) — kayıtlı kart "Detay/Checkpoint" açar.
- ROZET YANSIMA: PRIMARY rozetler-v1 ("Keşif & Mekan" + "Yol Üstü Gurme" ilerlemeli kart), SECONDARY
  mutfak-defteri "Ziyaret" sayacı. localStorage dada_yg.visited'tan beslenir.

### KISITLAR (Faz B'de de geçerli)
- Motor JS (2172-2456) DOKUNMA. Additive. Header inline shell DOKUNMA. kesfet-v1 tab motoru/facet/sihirbaz
  DOKUNMA (sadece additive eklendi). Palet tomato #E14827 + mevcut, yeni renk yok. div+bg cover.

### SONRAKİ ADIM
Faz B implement → B-8 doğrulama → onay → commit → madde 26 KAPANIR = paket 30/30.

### NOTLAR
- vanilla HTML/CSS/JS, header inline shell her sayfada kopya. A "Sürüş Kabini" immersive cam kokpit (Beyar
  seçti, B jenerik geri alındı). localStorage gerçek tarayıcıda çalışır (artifact değil). Üç giriş cream/tomato.
- Dizin: yol-guzergahim-v1 "Restoran & İşletme" grubunda (mekan/venue ekosistemi — kardeşi mekan-detay &
  rezervasyonlarim orada; dizindeki "Keşfet" grubu insan/içerik keşfi olduğundan oraya konmadı).

## Sonraki paket (madde 26 sonrası)
- Dalga 3 — birleşik hesap & abonelik merkezi: tek hesap/SSO (DadaMutfak+Store+Fit+Akademi, Store'a ayrı
  giriş yok), üretici kazanç & faturalama paneli (5+ video eşiği), doğum günü tier hediye.

## Stack & disiplin hatırlatma
- Mockup = saf vanilla HTML/CSS/JS (Tailwind/Alpine DEĞİL). Header her sayfada inline kopya.
- Görsel div+bg-image cover/center. Full-file write yok → targeted edit. Yeni renk yok.
- Denetim: 3-viewport (1440/768/390) render + Playwright davranış + Bağlantı Denetimi + Beyar gözle onay.
