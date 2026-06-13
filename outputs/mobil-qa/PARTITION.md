# Mobil QA — Sayfa Partition (tam-partition, boşluk/çakışma YOK)

Envanter: `mockups/*.html` = 82 dosya. Hariç: `ref-*` (7 referans klon, bizim değil)
+ `_overflow_probe.html` (probe). **Test edilen = 74 üretim sayfası.**

Self-verify: 14 + 12 + 14 + 13 + 21 = **74** ✓ (her sayfa tam 1 tester, çakışma yok).

## T1 — chrome/drawer/longtail-kurumsal (14)
_shell.html, akademi-v1.html, arama-v1.html, bildirimler-v1.html, giris-v1.html,
hakkimizda-v1.html, hata-v1.html, hesabim-v1.html, iletisim-v1.html, onboarding-v1.html,
panel-shell.html, reklam-ver-v1.html, sss-v1.html, yasal-v1.html
+ CROSS-CUTTING: dropdown/drawer davranışı tüm ailelerden örnekle (read-only).

## T2 — hero+landing (Ramazan bandı taşma, hero okunabilirlik) (12)
anasayfa-portal-v3a.html, gunun-menusu-v1.html, kesfet-v1.html, koleksiyon-v1.html,
mekan-liste-v1.html, mutfaga-giris-v1.html, mutfak-sirlari-v1.html, sefler-v1.html,
seo-landing-v1.html, sezon-v1.html, sofra-duzeni-v1.html, video-mutfagi-v1.html

## T3 — list/grid (14)
alisveris-listesi-v1.html, ansiklopedi-v1.html, bugun-ne-pisirsem-v1.html, dada-shop-v1.html,
diyetisyen-dizin-v1.html, haftalik-menu-v1.html, kategori-v1.html, puf-noktalari-v1.html,
sepet-v1.html, siparislerim-v1.html, sozluk-v1.html, tarif-bulucu-v1.html,
tarif-liste-v1.html, urun-liste-v1.html

## T4 — detail (tarif-detay chip dahil) (13)
ansiklopedi-detay-v1.html, diyet-program-detay-v1.html, diyetisyen-profil-v1.html,
mekan-detay-v1.html, mutfaga-giris-detay-v1.html, mutfak-defteri-v1.html, odeme-v1.html,
puf-noktasi-detay-v1.html, puf-noktasi-ekle-v1.html, tarif-detay-v1-headA.html,
tarif-detay-v1.html, tarif-ekle-v1.html, urun-detay-v1.html

## T5 — sağlık + panel longtail (21)
bazal-metabolizma-v1.html, beden-kutle-endeksi-v1.html, besin-kutuphanesi-v1.html,
diyet-listeleri-v1.html, diyetisyen-ol-v1.html, dyt-danisanlar-v1.html, dyt-mesajlar-v1.html,
dyt-profil-ayar-v1.html, dyt-randevular-v1.html, dyt-recete-builder-v1.html,
dyt-receteler-v1.html, gunluk-kalori-v1.html, gunluk-su-v1.html, hesaplayici-v1.html,
ideal-kilo-v1.html, olcu-birimleri-v1.html, saglik-hub-v1.html, saglik-testler-v1.html,
sef-ol-v1.html, test-detay-v1.html, vucut-tipi-v1.html
