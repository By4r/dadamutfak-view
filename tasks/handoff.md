# DadaMutfak — Handoff

## Madde 26 — Yol Güzergahım (DURUM: işlev tamam, UI revize edilecek, AKIŞ eksik)
- Ayrı sayfa: mockups/yol-guzergahim-v1.html. İşlev (Faz 1-4) ÇALIŞIYOR: Leaflet, Uber Nereden/Nereye
  autocomplete (CITY), şehirlerarası dummy rota (waypoint-poly), koridor filtresi (ROAD_POOL 10 mekan,
  CORRIDOR_KM=20), balon→tıkla→ekle, Güzergahım repeater, çift yönlü senkron — regresyon geçti.
- UI: Varyasyon A (Sürüş Kabini, harita full-bleed + cam paneller) uygulandı ama SORUNLU.

## AÇIK SORUNLAR (çözülecek)
1. AKIŞ EKSİĞİ (öncelik): güzergah oluşunca kapanış yok — "Güzergahımı Kaydet/Tamamla" CTA + özet/sonuç
   eklenmeli. Şu an dead-end.
2. ÖRTME: A cam panelleri + popup haritayı/güzergahı örtüyor (fitBounds padding'e rağmen) — A'nın yapısal sorunu.
3. Rail expand/toggle UX zayıf.
4. Genel: A oturmadı, Beyar memnun değil.

## LAYOUT KARARI (Beyar onayı bekliyor)
- Claude.ai önerisi: B'ye dön (Split Cockpit: üst komut çubuğu + sol dominant harita + sağ ayrı panel
  zonu). A'nın örtme+toggle dertleri B'de yapısal biter, akış CTA'ya yer açılır.
- Alternatif: A'da kalıp elden geçir (kırılgan). İki layout da Claude.ai'de mockup olarak sunuldu.

## SONRAKİ ADIMLAR
1. Layout kararı (B öneriliyor) + akış CTA implement.
2. Faz 5: boş durumlar + NAVIGATION (Keşfet'ten giriş) + Bağlantı Denetimi.
3. dizin.html'e yol-guzergahim-v1 ekle (şu an YOK).
4. COMMIT: CLAUDE.md "Bağlantı & Akış Denetimi" kuralı + yol-guzergahim + plan + dizin → madde 26 = 30/30.

## NOTLAR
- vanilla HTML/CSS/JS, header inline shell, palet tomato #E14827, div+bg cover, kesfet'e dokunma.
- plan: tasks/madde26-plan.md (v2). CLAUDE.md kuralı working-tree'de (madde 26 final commit'iyle gidecek).

## Sonraki paket (madde 26 sonrası)
- Dalga 3 — birleşik hesap & abonelik merkezi: tek hesap/SSO (DadaMutfak+Store+Fit+Akademi, Store'a ayrı
  giriş yok), üretici kazanç & faturalama paneli (5+ video eşiği), doğum günü tier hediye.

## Stack & disiplin hatırlatma
- Mockup = saf vanilla HTML/CSS/JS (Tailwind/Alpine DEĞİL). Header her sayfada inline kopya.
- Görsel div+bg-image cover/center. Full-file write yok → targeted edit. Yeni renk yok.
- Denetim: 3-viewport (1440/768/390) render + Playwright davranış + Bağlantı Denetimi + Beyar gözle onay.
