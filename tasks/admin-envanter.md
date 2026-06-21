# DadaMutfak — Birleşik Süper Admin: ENVANTER TURU

> **Mod:** Keşif/envanter. Kod yok, sadece tarama + rapor.
> **Tarih:** 2026-06-20
> **Kaynaklar:** v5 frontend (118 HTML) + legacy CMS (`drive-download-20260608T070112Z-3-001/dada-mutfak-panel/`, ~200 view, Metronic dark-sidebar).
> **Hedef:** "Baştan tam admin spec" için mevcut shell + bölüm haritası + yönetilmeyen içerik (gap) envanteri.

---

## 0. TL;DR — En kritik 6 bulgu

1. **v5'te birleşik gerçek admin YOK.** Tek somut admin ekranı `admin-rozet-v1.html`; nav linklerinin çoğu `href="#"` placeholder. Geri kalan tüm CMS hâlâ legacy panelde.
2. **Kanonik panel iskeleti = `v6/panel-shell.html`** (dosyada açıkça "DİYETİSYEN PANELİ KANONİK İSKELETİ" ilan edilmiş; `mekan-panel` ve `admin-rozet` "panel-shell tüketildi" diyor). **Tek sidebar + üst bar; çift sidebar / ikon-bar HENÜZ YOK** — karar setindeki çift-sidebar bu iskelet üzerine kurulacak.
3. **v5'te 2 tam rol-paneli hazır:** Diyetisyen (`panel-shell` + 6 `dyt-*`) ve Mekân (`mekan-*` 4 ekran). Bunlar self-servis rol panelleri — süper-admin'in **denetim/onay katmanı** ayrı.
4. **En büyük boşluk = DadaFit:** challenge, program, egzersiz kütüphanesi, antrenör dizini+fiyat — ne v5 admin'de ne legacy'de var. Sıfırdan.
5. **Para/fiyat hiçbir yerde merkezi yönetilmiyor:** Pro abonelik kademeleri (kodda "Fiyat onay bekliyor — Yasin Bey" flag'i), antrenör/diyetisyen seans-paket, mekan menü, reklam paketi fiyatları hep hardcoded.
6. **Rol/login:** Ne v5 ne legacy login'de çoklu/demo rol seçici var. v5 rolü `localStorage`/URL bayrağıyla (`dm_business`, `?pro=1`) taklit ediyor; legacy tek admin login + arka planda kullanıcı-grubu yetkisi. Karar setindeki "login'de demo rol seçimi" **henüz yok, üretilecek**.

---

# A. MEVCUT ADMIN SHELL ENVANTERİ

İki iskelet ailesi: **`.pnl-side` panel iskeleti** (sol koyu sidebar + üst ince bar = gerçek "uygulama" düzeni) ve **`.topbar` site chrome** (public başlık + mega menü, panel DEĞİL).

## A.1 — v5 Panel/Admin ekranları

### Diyetisyen / Sağlık paneli (`.pnl-side`, aksan yeşil `#3BB77E`)

| Dosya | Bölüm | Ekran tipi | Ne yönetiyor | Shell |
|---|---|---|---|---|
| `panel-shell.html` | Sağlık | dashboard | **KANONİK iskelet** + örnek dashboard (KPI, bugünkü randevular, bekleyen mesajlar, danışan özeti, Pro bandı) | sol sidebar + üst bar |
| `dyt-randevular-v1.html` | Sağlık | liste/takvim | Diyetisyen randevuları | `.pnl-side` |
| `dyt-danisanlar-v1.html` | Sağlık | liste | Danışanlar | `.pnl-side` |
| `dyt-receteler-v1.html` | Sağlık | liste | Reçete/diyet listesi arşivi | `.pnl-side` |
| `dyt-recete-builder-v1.html` | Sağlık | form/builder | Reçete (diyet listesi) oluşturucu | `.pnl-side` |
| `dyt-mesajlar-v1.html` | Sağlık | inbox (liste/detay) | Danışan mesajlaşma | `.pnl-side` |
| `dyt-profil-ayar-v1.html` | Sağlık | sekmeli form | Profil / ayar / takvim / bildirim | `.pnl-side` |

### İşletme / Mekân paneli (`.pnl-side`, aynı iskelet)

| Dosya | Bölüm | Ekran tipi | Ne yönetiyor | Shell |
|---|---|---|---|---|
| `mekan-panel-v1.html` | İşletme | dashboard | İşletme ana ekran (rezervasyon/menü özeti) | `.pnl-side` |
| `mekan-rezervasyonlar-v1.html` | İşletme | liste | Rezervasyonlar | `.pnl-side` |
| `mekan-ayarlar-v1.html` | İşletme | sekmeli form | Profil / bildirim / müsaitlik | `.pnl-side` |
| `mekan-menu-v1.html` | İşletme | liste/form | İşletme menüsü | `.pnl-side` |

### Admin (`.pnl-side`, aksan domates `#E14827`)

| Dosya | Bölüm | Ekran tipi | Ne yönetiyor | Shell |
|---|---|---|---|---|
| `admin-rozet-v1.html` | Admin | tek-sayfa sekme (İşletmeler/Abonelikler/Rozetler) | Rozet yönetimi (+ admin nav iskeletinin tek örneği) | `.pnl-side`, `pl-tag=Admin`, çoğu nav `href="#"` |

### Public chrome formları (panel DEĞİL — `.topbar` + mega menü)

Başvuru/ekleme formları, public site iskeletiyle render — admin ekranı değil: `diyetisyen-ol`, `antrenor-ol`, `isletme-ekle`, `sef-ol`, `puf-noktasi-ekle`, `tarif-ekle`, `giris-v1` (Giriş/Kayıt/Şifre sekmeleri). `_shell.html` = public site kanonik chrome (panel değil).

## A.2 — Legacy CMS (referans, gerçek admin)

Metronic/KeenThemes **dark-sidebar** teması; tüm modüller tek iskeleti paylaşır (sol sabit sidebar + app-header + navbar dropdown + mobil drawer). Modül başına liste + add_/edit_ form çiftleri.

| Klasör | Bölüm | Ne yönetiyor |
|---|---|---|
| `tarifler/` (~30) | Akademi | Tarif, malzeme, ölçü tipi, dünya mutfağı, yemek modu, kategori, grup, sponsorluk |
| `e-commerce/` (~50) | Store | Ürün, marka, kategori, varyasyon, sipariş, müşteri, kargo, ödeme/POS, promosyon, iade, satış raporları |
| `uyeler/` | Admin/Sağlık | Üye, diyetisyen, unvan, e-bülten, engellenen üye, yorum |
| `yazarlar/` | Akademi/Admin | Yazar yönetimi |
| `user/` | Admin | Yönetici kullanıcı + kullanıcı grubu (yetki) |
| `kesfet/` | Akademi | Keşfet içeriği + kategori |
| `mutfaga-giris/` | Akademi | Mutfağa giriş içeriği |
| `puf-noktalar/` | Akademi | Püf noktaları + kategori |
| `sozluk/` | Akademi | Sözlük + kategori |
| `olcu_birimleri/` | Akademi | Ölçü birimi + ölçeklendirme |
| `testler/` | Sağlık | Sağlık testleri |
| `ramazan/` | Akademi | İftar/sahur menüleri |
| `menu_management/` | Admin | Site menü başlıkları (navigasyon) |
| `page_definitions/`, `pages/` | Admin | Hakkımızda, SSS, künye, destekçiler, calculations, statik sayfa |
| `slider/`, `popup/` | Admin | Slider, popup |
| `ad_management/` | Admin/Store | Reklam yönetimi |
| `form_management/` | Admin | Form istekleri, görüş bildirimleri, mail yönlendirme |
| `general_settings/` | Admin | Site/SMTP/sosyal medya/iletişim/kod ayarları |
| `raporlar/`, `site_statistics/`, `log/` | Admin | Trafik, demografi, içerik performansı, arama trendleri, log |
| `supports/` | Admin | SSS |
| kök | Admin | `index` (dashboard), `profile`, `sign_in`, `reset_password`, `yapay-zeka` (AI aracı) |

## A.3 — Kanonik shell adayı

**`v6/panel-shell.html`** — 3 gerekçe:
1. Dosya başı: *"PANEL-SHELL.HTML — DİYETİSYEN PANELİ KANONİK İSKELETİ (DALGA 4)… Yeni panel sayfası = bu dosyanın kopyası."* Diğerleri ("panel-shell tüketildi") türevi.
2. Token/font/radius `_shell.html` ile birebir hizalı ama uygulama düzeni; tek `--pnl-side-w:248px` sidebar + `--pnl-top-h:64px` topbar.
3. En kapsamlı bileşen seti: KPI grid, `.pnl-card`, `.ptable`, durum rozeti `.pstat`, randevu/mesaj/danışan satırları, boş durum, pro-gate + pro bandı, responsive off-canvas (≤980 burger, ≤640 yoğunluk).

**Yapısal not:** üç v5 paneli (diyetisyen/mekân/admin) **tek sidebar** kullanıyor; aralarındaki fark içerik + aksan rengi. **Karar setindeki çift-sidebar (ikon-rail + bölüm menüsü) bu iskelette HENÜZ YOK → üretilecek.** Legacy tema referans olarak zengin ama 3. parti; v5 kendi `.pnl-*` dilini kuruyor, taklit etmiyor.

## A.4 — Rol / Login / Yetki durumu

- **v5 `giris-v1.html`:** tek public login/kayıt; sekmeler Giriş/Kayıt/Şifremi Unuttum + e-posta↔telefon segmenti. **Demo rol seçimi / çoklu rol picker YOK.**
- **Rol ayrımı login'de değil, onboarding sayfaları + bayrak ile:** `body.has-business` (`localStorage dm_business`, `?business=1/0`), `body.is-auth`, `?pro=1`. Gerçek auth yok → demo URL/localStorage bayrakları.
- **Persona hardcoded:** "Dyt. Elif Şahin · Onaylı", "Admin · Yönetici".
- **Legacy `sign_in.html`:** tek admin girişi (Kullanıcı Adı + Şifre + Beni hatırla), rol seçimi yok; yetki `user/` kullanıcı-gruplarıyla sunucu-tarafı.

**Sonuç:** Karar setindeki "login'de demo rol seçimi" + "süper-admin / bölüm-admin ayrımı" ikisi de **sıfırdan üretilecek.**

---

# B. BÖLÜM HARİTASI (6 bölüm)

`ref-*`, `dizin.html`, `_shell.html`, `_overflow_probe.html`, `panel-shell` çekirdeği = tasarım referans/iskelet, modül beslemesi değil.

## 1. ADMIN (Genel / Süper-Admin çekirdeği)
- **v5 admin:** sadece `admin-rozet-v1.html` (+ `panel-shell` iskelet).
- **Legacy:** user, uyeler, yazarlar, slider, popup, general_settings, page_definitions, pages, menu_management, form_management, raporlar, site_statistics, log, ad_management, supports + kök (index/profile/sign_in/yapay-zeka).
- **Veri:** admin kullanıcı+yetki grupları, üyeler/profil/engelli, yazarlar, yorum moderasyonu, e-bülten, slider/popup/reklam, site ayarları (SMTP/sosyal/iletişim), statik sayfa+SEO, navigasyon, form talepleri, rapor/istatistik/log, **rozetler** (v5 yeni), SSS.
- **Besleyen frontend:** anasayfa-portal, kesfet, kategori, arama, giris, onboarding, hesabim, bildirimler, rozetler, mutfak-defteri, iletisim, hakkimizda, sss, yasal, hata, seo-landing, reklam-ver, üyelik/abonelik akışı.

## 2. SAĞLIK / DİYETİSYEN
- **v5 admin:** TAM rol-paneli (`panel-shell` + 6 `dyt-*`).
- **Legacy:** kısmi — `uyeler/diyetisyen_*` (kayıt/onay/unvan), `testler/`, `page_definitions/calculations`. Danışan/randevu/reçete/mesaj = **yeni**, legacy yok.
- **Veri:** diyetisyen profil+onay+ünvan, danışan, randevu, reçete/diyet listesi, mesaj, sağlık testleri, hesaplayıcı içerikleri+besin değerleri.
- **Besleyen frontend:** saglik-hub, saglik-testler, test-detay, vucut-tipi, diyetisyen-dizin/profil/ol, diyet-listeleri, diyet-program-detay, hesaplayici, bazal-metabolizma, beden-kutle-endeksi, ideal-kilo, gunluk-kalori, gunluk-su, besin-degerleri, besin-kalori-cetveli, karbonhidrat/protein/yag-rehberi.

## 3. STORE (E-Ticaret)
- **v5 admin:** **YOK** (sadece frontend mağaza).
- **Legacy:** **en geniş modül** `e-commerce/` (ürün/varyasyon/filtre/marka/kategori, promosyon, sipariş, müşteri+grup, yorum, para birimi/vergi, kargo/ödeme/sanal POS/kapıda/EFT, iade, satış/iade/kargo raporları).
- **Besleyen frontend:** dada-shop, urun-liste/detay, sepet, odeme, siparislerim, alisveris-listesi, pro, pro-odeme.

## 4. DADAFIT
- **v5 admin:** **YOK.** **Legacy:** **YOK** — tamamen yeni, sıfırdan admin.
- **Veri (gereken):** antrenörler (profil/onay), egzersiz kütüphanesi, antrenman programları, challenge'lar, antrenör-kullanıcı bağı, ilerleme/takip.
- **Besleyen frontend:** dadafit-hub, dadafit-kopru, antrenorler, antrenor-detay/ol, egzersiz-kutuphane/detay, program-liste/detay, challenge.

## 5. İŞLETME / MEKÂN
- **v5 admin:** TAM rol-paneli (`mekan-*` 4 ekran). **Legacy:** **YOK** — yeni, süper-admin onay katmanı gerekli.
- **Veri:** işletme/mekân profil+onay, mekân menü, rezervasyon, müsaitlik/çalışma saatleri, ayarlar.
- **Besleyen frontend:** mekan-liste (→ keşfete taşındı), mekan-detay, isletme-ekle, rezervasyonlarim, yol-guzergahim.

## 6. AKADEMİ (İçerik / Bilgi bankası)
- **v5 admin:** ayrı ekran yok; iki katkı formu (`tarif-ekle`, `puf-noktasi-ekle`).
- **Legacy:** geniş — tarifler (+taksonomi/malzeme/ölçü/sponsorluk), kesfet, mutfaga-giris, puf-noktalar, sozluk, olcu_birimleri, ramazan.
- **Veri:** tarif+taksonomi, malzeme+ölçü/ölçeklendirme, sponsorluk, keşfet, mutfağa giriş, püf noktaları, sözlük/ansiklopedi, mutfak sırları, ramazan iftar/sahur, sezonsal menü.
- **Besleyen frontend:** akademi, ansiklopedi(+detay), mutfaga-giris(+detay), mutfak-sirlari, puf-noktalari(+detay/ekle), sozluk, olcu-birimleri, besin-kutuphanesi, video-mutfagi; tarif çekirdeği (tarif-detay/liste/ekle/bulucu, bugun-ne-pisirsem, koleksiyon); menü/sezon (gunun-menusu, haftalik-menu, sezon, sofra-* serisi); şef katkı (sefler, sef-ol).

## Bölüm kapsama özeti

| Bölüm | v5 admin ekranı | Legacy karşılığı |
|---|---|---|
| Admin | Sadece rozet (+shell) | Geniş (user/uyeler/yazarlar/slider/settings/raporlar/ad...) |
| Sağlık | TAM rol-paneli (6 `dyt-*`) | Kısmi (kayıt+testler); danışan/randevu/reçete YENİ |
| Store | **YOK** | En geniş legacy (`e-commerce/`) |
| DadaFit | **YOK** | **YOK** — sıfırdan |
| İşletme | TAM rol-paneli (4 `mekan-*`) | **YOK** — onay katmanı yeni |
| Akademi | Sadece katkı formları | Geniş (tarif/kesfet/puf/sozluk/ramazan) |

**Boşluk uyarısı:** En çok yeni ekran = **Store** (legacy var, v5 yok), **DadaFit** (her şey sıfırdan), İşletme+Sağlık'ın süper-admin denetim/onay katmanı (rol-panel ≠ süper-admin). Akademi+Admin çekirdeği büyük ölçüde legacy'den port edilebilir.

---

# C. ADMIN-GAP ANALİZİ (statik içerik → yönetilebilirlik)

"Yönetiliyor mu" sütunu legacy karşılığa göre. Legacy temel referans = yeni admin spec'in tabanı.

## 🔴 KRİTİK — "YOK" (legacy'de karşılığı yok, sıfırdan modül)

| # | İçerik tipi | Nerede (v5) | Bölüm |
|---|---|---|---|
| 1 | **Pro/abonelik fiyatları & kademeleri** (Ücretsiz ₺0 · Pro+ ₺99/ay · Pro Max ₺199/ay; karşılaştırma tablosu) — kodda `"Fiyat onay bekliyor — Yasin Bey"` | pro, pro-odeme, uye-abonelik-odeme, hesabim, mutfak-defteri | İşletme/Admin |
| 2 | **DadaFit Challenge'lar** (Haziran Challenge, 30 gün rozet ızgarası, katılımcı/gün, başlangıç) | challenge, dadafit-hub, dadafit-kopru, anasayfa bandı | DadaFit |
| 3 | **DadaFit Programlar** (gün/hafta/seviye kartları) | program-liste/detay, dadafit-hub | DadaFit |
| 4 | **DadaFit Egzersiz kütüphanesi** (kart/filtre/detay) | egzersiz-kutuphane/detay, dadafit-hub | DadaFit |
| 5 | **Antrenör dizini + seans fiyatları** (₺360–550 seans; ₺2.400/3.200/4.800 paket; ₺1.600/ay) | antrenorler, antrenor-detay/ol | DadaFit |
| 6 | **Akademi eğitim setleri / kurs kartları** (kurs/eğitmen/içerik) | akademi | Akademi |
| 7 | **Video Mutfağı listesi** (Pro video, eğitmen, süre; anasayfa "İzle & Pişir" slider statik) | video-mutfagi, anasayfa | Akademi |
| 8 | **Mekan dizini + menü fiyatları** (menü ₺90–520, kart, rezervasyon) | mekan-liste/detay/menu, isletme-ekle | İşletme |
| 9 | **Diyetisyen seans/paket fiyatları** (₺520–800 görüşme; ₺750/₺2.200 ay/₺900) — kayıt var, ücret yok = **Kısmi** | diyetisyen-dizin/profil | Sağlık |
| 10 | **Reklam paketleri / medya kiti** (50k/150k/500k TL self-serve) — ad_management farklı = **Kısmi** | reklam-ver | İşletme |

## 🟡 ORTA — "KISMİ" (legacy benzer var ama v5 yeni blokları kapsamıyor)

| # | İçerik tipi | Nerede | Not |
|---|---|---|---|
| 11 | **Anasayfa hero** (video hero başlık/poster + arama tab/chip + stat sayaçları) | anasayfa-portal | `slider/` var ama video-hero+stat+chip yeni · Admin |
| 12 | **Anasayfa modül kartları & dünya kapıları** (DadaStore/Akademi/Fit geçişleri, mega-menü) | anasayfa-portal | `menu_management` header'ı yönetir, portal kartları ayrı · Admin |
| 13 | **"Günün/Haftanın Tarifi" bandı** (öne çıkarılan tek tarif) | anasayfa-portal | tarif DB'de var, öne-çıkarma alanı muhtemelen yok · Admin |
| 14 | **Şef/Yazar vitrini** (anasayfa 6 kişi statik) | anasayfa-portal | `yazarlar/` var, "öne çıkan" seçimi belirsiz · Admin |
| 15 | **Keşfet editoryal + kategori/filtre çipleri** | kesfet, kategori, sezon | `kesfet/` var, facet yapısı genişlemiş · Admin |
| 16 | **DadaShop kampanya/promosyon bantları** | dada-shop, urun-liste/detay | e-commerce `promotions` var, bant metni ayrı · Store |
| 17 | **Künye/Hakkımızda ekip & adres blokları** | hakkimizda | `about_us`+`kunye` var, düzen farklı · Admin |

## 🟢 DÜŞÜK — "VAR" (legacy karşılığı net, taşınacak; gap değil)

| # | İçerik tipi | Legacy karşılığı | Bölüm |
|---|---|---|---|
| 18 | Footer linkleri (tüm 118 sayfa) | menu_management + page_definitions | Admin |
| 19 | **Sosyal medya URL'leri — tümü `href="#"` BOŞ!** (Instagram/YouTube/X/FB/LinkedIn/Pinterest) | `social_media_settings` | Admin |
| 20 | İletişim bilgileri (adres, destek@/kurumsal@/reklam@, saatler) | `contact_informations` | Admin |
| 21 | Sponsor/Partner bandı | `supporter_and_partners` | İşletme |
| 22 | Yasal metinler (9: iade/teslimat/mesafeli/KVKK/çerez/üyelik/kullanım) | page_definitions | Admin |
| 23 | SSS | `faq` | Admin |
| 24 | Hesaplayıcı metinleri (BMI/bazal/ideal kilo) | `calculations` | Sağlık |
| 25 | Sağlık testleri | `testler/` | Sağlık |
| 26 | Sözlük/Ansiklopedi | `sozluk/` | Akademi |
| 27 | Mutfak Sırları / Püf / Mutfağa Giriş | `puf-noktalar/`, `mutfaga-giris/` | Akademi |
| 28 | Ramazan iftar/sahur | `ramazan/` | Admin/Akademi |
| 29 | Ürün/kategori/sipariş/sepet | `e-commerce/` | Store |

## Gap özeti (en kritik)

- **DadaFit = en büyük boşluk:** challenge/program/egzersiz/antrenör — legacy'de hiçbiri yok (#2–5).
- **Para/fiyat boşluğu:** Pro kademeleri (#1, "Yasin Bey onayı bekliyor"), antrenör/diyetisyen/mekan/reklam fiyatları (#5,8,9,10) — merkezi fiyat/abonelik yönetimi yok.
- **Akademi:** kurs setleri (#6) + Video Mutfağı (#7) yeni; sözlük/püf/sırlar mevcut.
- **İşletme:** mekan dizini + menü fiyatları (#8) tamamen yeni.
- **En sinsi "var ama bağlanmamış":** sosyal medya linkleri tüm sitede `href="#"` boş (#19) — panelde alan var, ön yüze hiç bağlanmamış.

> **Kapsam notu:** `*-ekle`, `dyt-*`, `mekan-*panel/ayarlar` = son-kullanıcı/rol panelleri (creator/diyetisyen/işletme self-servis) → ayrı "rol paneli" spec'i. C tablosu **merkezi süper-admin içerik yönetimine** odaklı.

---

# Spec'e giriş — öneriler (envanterden çıkan)

1. **İskelet:** `panel-shell.html`'i kanonik al, üzerine **çift-sidebar** (ikon-rail + bölüm menüsü) ekle; aksan rengini bölüme göre değiştir (Admin domates · Sağlık nane · Store domates · DadaFit yeşil `#009d4f` · İşletme petrol · Akademi petrol).
2. **Önce port, sonra yeni:** Akademi + Admin çekirdeği legacy'den port; **Store** (v5 admin sıfır), **DadaFit** (her şey sıfır) yeni üretim.
3. **Merkezi "Fiyatlandırma/Abonelik" modülü** (Admin altında): Pro kademeleri + antrenör/diyetisyen/mekan/reklam paket fiyatları tek yerden — #1,5,8,9,10 buradan beslensin ("Yasin Bey onayı" blokajı burada çözülür).
4. **Rol/yetki:** login'de demo rol seçimi + süper-admin/bölüm-admin ayrımı sıfırdan; kullanıcı/yetki merkezi Admin'de (legacy `user/` kullanıcı-grubu mantığı taban).
5. **"Var ama bağlanmamış" temizliği:** sosyal medya `href="#"` (#19) gibi panel-alanı-var-frontend-boş bağlantıları spec'te açıkça bağla.
