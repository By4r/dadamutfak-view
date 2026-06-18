# DadaMutfak — Handoff

## Durum (18 Haziran sonu)
- 17 Haziran paketi: 29/30. Dalga 0 ✅ · Dalga 1 ✅ · Dalga 2: 23,24,27a,21,30 ✅ — kalan SADECE madde 26.
- Son commit'ler: Modül 2 (madde 30) a3481e4, dizin a2abaa9 — ikisi de canlıda.
- Madde 30 (üyeden-üyeye ücretli abonelik) TAM kapandı: mutfak-defteri Üyelik sekmesi + member-gate,
  uye-abonelik-odeme-v1.html checkout, hesabim Üyeliklerim sekmesi, dizin kaydı.

## Bekleyen (sıralı)
1. Madde 26 — yol-üzeri harita rota mekan önerisi. 17 Haziran'ın SON maddesi, en ağır. Scope henüz
   netleşmedi: bu mockup saf vanilla HTML/CSS/JS → harita yaklaşımı kararı verilecek (statik mockup
   harita VS Leaflet hafif interaktif, key gerektirmeyen). Plan-first: önce orijinal tanım + mekan-bul
   bağlamı okunacak → scope mutabakatı → plan → implement. Bitince 30/30; CLAUDE.md kuralı commit'i
   bununla gider.
2. Dalga 3 — birleşik hesap & abonelik merkezi (yeni paket): tek hesap/SSO (DadaMutfak+Store+Fit+
   Akademi, Store'a ayrı giriş yok), üretici kazanç & faturalama paneli (5+ video eşiği), doğum günü
   tier hediye. Madde 26'dan sonra.

## Working-tree'de bekleyen
- CLAUDE.md — "Bağlantı & Akış Bütünlüğü Denetimi" kuralı eklendi (her session otomatik uygulanıyor),
  madde 26 commit'iyle gidecek. Clear context'i temizler ama bu dosya diskte/git'te durur, kaybolmaz.

## Stack & disiplin hatırlatma
- Mockup = saf vanilla HTML/CSS/JS (Tailwind/Alpine DEĞİL). Header her sayfada inline kopya.
- Görsel div+bg-image cover/center. Full-file write yok → targeted edit. Yeni renk yok.
- Denetim: 3-viewport (1440/768/390) render + Playwright davranış + Bağlantı Denetimi + Beyar gözle onay.
