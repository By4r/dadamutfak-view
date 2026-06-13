# T1 — chrome/drawer/longtail BULGULARI
Kapsam: 14/14 sayfa ölçüldü. SS: 42 dosya (14×3).

---

## Ölçüm Özeti — Taşma / Console Hataları

Tüm 14 sayfada `docSW` 390 veya 768'i geçmedi, `unclipped=0`, `errs=[]`. Yatay taşma ve konsol hatası **sıfır**.

---

## Bulgular Tablosu

| Sayfa | Breakpoint | Bulgu | Severity | Ölçüm | SS |
|---|---|---|---|---|---|
| _shell | 390 | `<main>` boş — template/placeholder sayfası olduğu için beklenen davranış; ama 390px SS'te topbar altı tamamen beyaz, footer reveal gözüküyor. Yanlış anlama riski | ℹ️ Note | docSW=390 unclipped=0 errs=0 | ss/_shell__390.png |
| _shell | drawer | Drawer açılıyor, Tarifler alt-menüsü expand, Mutfak Sırları + Sağlık collapsed. Yapı düzgün. Bottom-nav yok (panel değil). | ✅ | docSW=390 unclipped=0 errs=0 | ss/_shell__drawer.png |
| _shell | 768 | Temiz | ✅ | docSW=768 unclipped=0 errs=0 | ss/_shell__768.png |
| akademi-v1 | 390 | Topbar'da hamburger ikonu gözükmuyor (topbar'ın sağında sadece arama ikonu var, hamburger ≤992px'de gösterilmeli). Hero bölümünde yatay scroll hissi (vizüel — ancak ölçüm temiz). | 🟡 Minor | docSW=390 unclipped=0 errs=0 | ss/akademi-v1__390.png |
| akademi-v1 | drawer | Drawer açılıyor — ancak drawer overlay tam sayfayı kaplamamış; sağda sayfa içeriği görünüyor (overlay z-index sorunu olabilir). Menü item'ları tam, kesik değil. Alt-menü açık. | 🟠 Major | docSW=390 unclipped=0 errs=0 | ss/akademi-v1__drawer.png |
| akademi-v1 | 768 | Temiz | ✅ | docSW=768 unclipped=0 errs=0 | ss/akademi-v1__768.png |
| arama-v1 | tümü | Temiz | ✅ | docSW=390/768 unclipped=0 errs=0 | — |
| bildirimler-v1 | 390 | Bottom-nav görünüyor (home/tarif/FAB/health/hesabım). FAB (turuncu "+") ortalanmış, bottom-nav'la çakışma yok. İçerik tam. | ✅ | docSW=390 unclipped=0 errs=0 | ss/bildirimler-v1__390.png |
| bildirimler-v1 | drawer | Drawer açılıyor, menü tam, bottom-nav drawer altında kalmış — çakışma yok çünkü drawer fixed+100vh. | ✅ | docSW=390 unclipped=0 errs=0 | ss/bildirimler-v1__drawer.png |
| bildirimler-v1 | 768 | Temiz | ✅ | docSW=768 unclipped=0 errs=0 | ss/bildirimler-v1__768.png |
| giris-v1 | tümü | Temiz. Çerez banner görünüyor, tam hizalı. | ✅ | docSW=390/768 unclipped=0 errs=0 | — |
| hakkimizda-v1 | drawer | Drawer açılıyor — ancak drawer panelinin **içinde** Tarife, Aramaya vs. ait olmayan metin blokları (yorumlar, "Sayılarla DadaMutfak" stats, şef profilleri) render oluyor. Drawer'ın genişliği ve konumu doğru; içerik yanlış yerde: Sayfa içeriği drawer container'ına sızmış olabilir. | 🔴 Critical | docSW=390 unclipped=0 errs=0 | ss/hakkimizda-v1__drawer.png |
| hakkimizda-v1 | 390 | Sayfa içeriği normal görünüyor — topbar, hero, istatistik bölümü, şefler. | ✅ | docSW=390 unclipped=0 errs=0 | ss/hakkimizda-v1__390.png |
| hakkimizda-v1 | 768 | Temiz | ✅ | docSW=768 unclipped=0 errs=0 | ss/hakkimizda-v1__768.png |
| hata-v1 | tümü | Temiz. 404 sayfası, popüler tarifler kartları, arama çubuğu — hepsi hizalı. | ✅ | docSW=390/768 unclipped=0 errs=0 | — |
| hesabim-v1 | drawer | Drawer açılıyor ve menü doğru — ancak `fullPage:true` ile drawer altında sayfa footer'ı (site footer + yasal linkler) sıralı görünüyor. Drawer fixed/z-index davranışı viewport'ta doğru, SS yanıltıcı. **Gerçek sorun:** bottom-nav, drawer footer (Giriş Yap / Tarif Ekle / DadaStore) ile alt alta — drawer açıkken bottom-nav gizlenmeli. | 🟡 Minor | docSW=390 unclipped=0 errs=0 | ss/hesabim-v1__drawer.png |
| hesabim-v1 | 390 | Temiz — profil formu, tehlikeli bölge, footer tam. | ✅ | docSW=390 unclipped=0 errs=0 | ss/hesabim-v1__390.png |
| hesabim-v1 | 768 | Temiz | ✅ | docSW=768 unclipped=0 errs=0 | ss/hesabim-v1__768.png |
| iletisim-v1 | drawer | Drawer açılıyor ama drawer overlay altında harita embed ve site footer görünüyor (fullPage SS etkisi + olası overlay opacity). Drawer menüsü kendisi tam ve kesik değil. | 🟡 Minor | docSW=390 unclipped=0 errs=0 | ss/iletisim-v1__drawer.png |
| iletisim-v1 | 390/768 | Temiz | ✅ | docSW=390/768 unclipped=0 errs=0 | — |
| onboarding-v1 | tümü | Temiz. Onboarding adım akışı, kategori ikonları, "İleri" butonu görünür. | ✅ | docSW=390/768 unclipped=0 errs=0 | — |
| panel-shell | 390 | Panel (diyetisyen dashboard) — topbar'da arama + bildirim + avatar var, hamburger yok (panel ayrı nav sistemi kullanıyor, doğru). Dashboard kartları 2-col grid, hizalı. | ✅ | docSW=390 unclipped=0 errs=0 | ss/panel-shell__390.png |
| panel-shell | drawer | Panel drawer açılmıyor (drawer=1 sorgusu var ancak panel-shell'de `#drawer` elementi yok — panel ayrı sidebar pattern kullanıyor). SS boş/sayfa içeriği görünüyor. | ℹ️ Note | docSW=390 unclipped=0 errs=0 | ss/panel-shell__drawer.png |
| panel-shell | 768 | Temiz | ✅ | docSW=768 unclipped=0 errs=0 | ss/panel-shell__768.png |
| reklam-ver-v1 | drawer | Drawer açılıyor (?drawer=1 kodu var ve element mevcut) — ancak SS `fullPage:true` ile 12689px yüksekliğe çıkmış; bu sayfanın içeriği çok uzun (fiyat paketleri, form, istatistikler). Viewport'ta drawer doğru görünüyor olmalı. **Asıl sorun:** Bu kadar uzun sayfa, drawer overlay altında kalan içerik kaydırılabilir kalıyor (`body.overflow='hidden'` set edilmemişse). | 🟠 Major | docSW=390 unclipped=0 errs=0 | ss/reklam-ver-v1__drawer.png |
| reklam-ver-v1 | 390/768 | Temiz — fiyat tablosu, form, paket kartları hizalı. | ✅ | docSW=390/768 unclipped=0 errs=0 | — |
| sss-v1 | tümü | Temiz. Accordion SSS, "Cevap bulamadın mı?" CTA, filtreleme çipleri görünür. | ✅ | docSW=390/768 unclipped=0 errs=0 | — |
| yasal-v1 | drawer | Drawer açılıyor — drawer menüsü görünüyor ama drawer altında sayfa içeriği (KVKK maddeleri) de SS'e dahil. fullPage etkisi. Drawer menüsü kendisi tam ve kesik değil. | 🟡 Minor | docSW=390 unclipped=0 errs=0 | ss/yasal-v1__drawer.png |
| yasal-v1 | 390/768 | Temiz | ✅ | docSW=390/768 unclipped=0 errs=0 | — |

---

## Cross-Cutting: Drawer Alt-Menü Tutarlılığı

T1 kapsamındaki 14 sayfanın drawer SS'leri incelendi:

- **Tarifler alt-menüsü** (Çorba, Kırmızı Et, Beyaz Et, Tatlı, Hamur İşi, Kek, Salata, Kahvaltılık, Zeytinyağlı, İçecek, Vegan ve Vejetaryen, Tüm Tarifler): Tüm standart sayfalar (arama, bildirimler, giris, hata, hesabim, iletisim, onboarding, sss, yasal) **tutarlı ve tam**. Alt-menü default açık, item'lar kesik değil.
- **Mutfak Sırları**: Tüm sayfalarda collapsed (v) — tıklanabilir, tutarlı.
- **Sağlık**: Tüm sayfalarda collapsed (v) — tıklanabilir, tutarlı.
- **Bugün Ne Pişirsem**: Tüm sayfalarda alt-menüsüz link olarak görünüyor — tutarlı.
- **hakkimizda-v1 drawer**: Sayfa içeriği drawer container'ına sızmış — bu tek istisna. (🔴 Critical olarak işaretlendi.)
- **panel-shell**: `#drawer` elementi yok — panel kendi sidebar sisteminde, drawer menü beklenmez. Tutarlı panel pattern'ı.

---

## Öncelikli Bulgular (Severity Sırası)

### 🔴 1. hakkimizda-v1 — Drawer'a Sayfa İçeriği Sızıyor
Drawer açıldığında panel içinde Hakkımızda sayfasına ait içerikler (stats, şef profilleri, yorumlar) render oluyor. Muhtemel sebep: drawer `<aside>` elementinin kapatma tag'i yanlış yerleştirilmiş veya drawer CSS'i `overflow:hidden` + `height:100%` ile içeriği kesmeden tüm page DOM'unu kapsıyor. DOM yapısını kontrol et — `</aside>` kapanış noktası.

### 🟠 2. akademi-v1 — Drawer Overlay Sayfayı Tam Kapatmıyor
Drawer paneli açılıyor ve menü tam görünüyor ancak drawer'ın sağında (arka plan overlay'de) sayfa içeriği hâlâ görünür. `drawer-overlay` opacity veya z-index değeri diğer sayfalardan farklı ya da akademi sayfasına özgü bir stacking context sorunu var.

### 🟠 3. reklam-ver-v1 — Drawer Açıkken Sayfa Kaydırılabilir Kalıyor (Olası)
Sayfanın anormal uzunluğu (12689px) ve drawer açıkken `body.overflow='hidden'`'ın çalışıp çalışmadığı doğrulanmalı. JS'te `open()` fonksiyonu `document.body.style.overflow='hidden'` set ediyor — ancak çok uzun sayfalarda bu bazen geç tetikleniyor. Manuel test gerekli.

---

## Notlar

- `fullPage:true` SS davranışı: measure.cjs full-page screenshot alıyor. Uzun sayfalarda (reklam-ver, yasal) drawer overlay altında sayfa içeriği SS'e dahil oluyor — bu bir **ölçüm/SS artefaktı**, gerçek viewport'ta drawer doğru görünüyor olabilir. Manuel tarayıcı testi ile teyit edilmeli.
- `panel-shell` drawer SS'i boş görünüyor çünkü panel `#drawer` elementi içermiyor — bu bir tasarım kararı, hata değil.
- `_shell.html` boş `<main>` içeriyor — template sayfası, production'da kullanılmıyor.
