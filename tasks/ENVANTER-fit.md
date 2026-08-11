# DadaFit — Envanter ve Ölçüm Raporu

> **Tur tipi:** ÖLÇÜM. Hiçbir mevcut dosya değiştirilmedi; yalnız bu dosya oluşturuldu.
> **Tarih:** 2026-08-11 · **Kaynak belge:** `tasks/kaynak/fit-revizyon-dokumani.md` (672 satır, 20 bölüm)
> **Ölçüm alanı:** depo kökü / `v7-6cu356/` · **HEAD:** `12289a1` (origin/main ile birebir, ahead 0)
> **Depo durumu:** 2 değiştirilmiş + çok sayıda takip edilmeyen dosya var — bilinen durum, dokunulmadı.

## Ölçüm yöntemi ve araçları

| Ölçüm | Yöntem |
|---|---|
| Dosya sayımı, satır, başlık, CSS/JS bağı | Python statik tarama (274 HTML) |
| Aile ataması | `bs-<marka> is-active` ekosistem barı + `class="brand X-brand"` + ana menü içeriği + yüklenen `assets/*` |
| Kabuk tekrarı | HTML işaret yorumları arası satır aralığı (`TOP UTILITY BAR` → `HEADER` → `MOBİL DRAWER` → `MOBİL BOTTOM NAV`) + `<footer class="footer">…</footer>` |
| Bağlantı sağlığı | Statik `href`/`src` çıkarımı + diskteki dosya kümesiyle karşılaştırma (büyük/küçük harf dahil) |
| Taşma / banner / konsol | Playwright 1.61 chromium headless, `http://127.0.0.1:8099` (yerel `python3 -m http.server`, depoya yazma yok), 1440/1024/768/390 × 900px |
| Taşma dedektörü | Element-rect (`rect.right > vw+1 ‖ rect.left < -1`); `position:fixed` ve `translateX>20px` atalı katmanlar (drawer/modal/banner) elenir. **Sanity-check yapıldı**: bilinçli kirli fixture (clipped taşma, `docSW=390`) → 1 bulgu; temiz fixture → 0 bulgu |
| Sayfa-düzeyi taşma ayrımı | `documentElement.scrollWidth > viewport` → gerçek taşma; eşitse iç yatay-scroll konteyneri (chip rayı, tablo) → taşma değil |
| Yayın durumu | `git ls-files`, `git ls-tree origin/main`, canlı `curl` HTTP kodu |

**Ölçemediklerim** (aşağıda ilgili yerde tekrar belirtildi):
- Banner oranı sabit 900px viewport yüksekliğine göre ölçüldü; gerçek cihaz yükseklikleri farklıdır.
- `assets/video/dadafit-hero.mp4` gitignore'lı olduğu için lokalde yüklendi, **canlıda yüklenmez** — canlı davranış lokal ölçümle gösterilemez.
- Bir dosyanın "bilinçli mi bırakılmış yoksa atık mı" olduğu kod ölçümüyle belirlenemez; bu sorular BELİRSİZ kümesinde.

---

# 1 · AİLE AYRIMI

## 1.1 Sayım özeti

`v7-6cu356/` kök seviye: **274 HTML · 5 JS · 0 CSS**. Alt dizinler: `assets/` (4 CSS + 4 JS + 65 malzeme PNG + 11 img + 7 video), `arsiv/` (15 HTML, tracked), `tasks/` (v7-içi ikinci tasks — 3 mjs + 7 md), `outputs/`, `.ss-scratch/` (639 dosya, gitignore'lı).

| Küme | HTML | Atama dayanağı |
|---|---:|---|
| **DadaFit — public** | 21 | `bs-fit is-active` + `class="brand fit-brand"` + `--tomato:#009d4f` |
| **DadaFit — antrenör operatör paneli** | 8 | `assets/{css,js}/sa-ui` + `sa-gozetim`; kod yorumu satır 18–22 `antrenor-panel-v1`: *"mekan-panel / panel-shell YEŞİL DİLİNİN KARDEŞİ — DadaFit antrenör muadili … AKSAN: DadaFit KURUMSAL YEŞİL #009d4f"* |
| **DadaFit — süper admin bölümü** | 12 | `data-sec="dadafit"` + `sa-shell.js` `SECTIONS.dadafit` |
| **DadaDiet — public** | 37 | `bs-diet is-active` + `class="brand dd-brand"` |
| **DadaDiet — operatör paneli** | 6 | `dyt-*` + `sa-ui`+`sa-gozetim`, başlık "Diyetisyen Paneli" |
| **DadaDiet — atık/redirect** | 1 | `hesaplayici-v1.html` 126 satır, `meta refresh` → `beden-kutle-endeksi-v1.html` |
| **DadaGastro** | 38 | `bs-gastro is-active` (36) + `arama-v1` (Gastro ana menüsü, kardeşleri `arama-fit/diet/gourmet/campus`) + `sezon-v1` (Ramazan Mutfağı) |
| **DadaGourmet — public** | 19 | `bs-gourmet is-active` (16) + `yol-guzergahim-v2`, `isletme-ekle-v1`, `rezervasyonlarim-v1` |
| **DadaGourmet — operatör paneli** | 4 | `mekan-*` + `sa-ui`+`sa-gozetim`, başlık "Mekân Paneli" |
| **DadaCampus** | 2 | `bs-campus is-active` + `class="brand ak-brand"` (`akademi-v1`, `arama-campus-v1`) |
| **DadaStore** | 5 | `class="brand shop-brand"` + Store ana menüsü (Kategoriler/Kampanyalar/Çok Satanlar/Yöresel) |
| **DadaMentor — canlı** | 1 | `dadamentor-v3.html`; CLAUDE.md'de kanonik canlı URL |
| **DadaMentor — varyant/atık** | 14 | `dadamentor-alt1..6`, `v1`, `v1-A..E`, `v2-a`, `v2-b`; gelen link: 12'sinde 0, alt6=2, v1=4 |
| **ORTAK — süper admin kabuğu** | 78 | `assets/css/sa-shell.css` + `assets/js/sa-shell.js`; `data-sec` ∈ {genel, admin, saglik, store, dadafit, isletme} |
| **ORTAK — üye hesap · yasal · yardımcı** | 17 | Gastro ana menü kabuğunu taşır ama **5 markanın hepsinden linklidir** (aşağıda 1.3) |
| **ORTAK — kabuk şablonu** | 3 | `_shell.html` (public türetme şablonu), `panel-shell.html` (operatör şablonu), `sa-giris-v1.html` (yönetim girişi) |
| **WIREFRAME / ATIK** | 18 | `wireframe-1..10` (10), `ref-food52/graza/mob/nyt/ourplace/refika/sakara` (7), `_overflow_probe.html` (38 satır probe). Hepsinin gelen link sayısı: 0 |
| **BELİRSİZ** | 2 | aşağıda 1.4 |
| **TOPLAM** | **274** | |

### CSS ve JS dosyaları (kök + assets)

| Dosya | Satır | Küme | Tüketici sayfa | Bunlardan DadaFit |
|---|---:|---|---:|---:|
| `assets/css/sa-shell.css` | 459 | ORTAK (5 marka) | 78 | 12 |
| `assets/css/sa-ui.css` | 97 | ORTAK (4 marka) | 32 | 8 |
| `assets/css/sa-list.css` | 6 | ORTAK | 32 | 5 |
| `assets/css/sa-gozetim.css` | 88 | ORTAK (3 marka) | 30 | 10 |
| `assets/js/sa-shell.js` | 343 | ORTAK (5 marka) | 77 | 12 |
| `assets/js/sa-ui.js` | 135 | ORTAK (4 marka) | 33 | 8 |
| `assets/js/sa-gozetim.js` | 57 | ORTAK (3 marka) | 18 | 8 |
| `assets/js/sa-chcnt.js` | 49 | ORTAK | 26 | 4 |
| `v7-6cu356/_patch-anasayfa.js` | — | ATIK (tek seferlik patch) | 0 | 0 |
| `v7-6cu356/_sweep-dm-user.js` | — | ATIK (C1 migrasyon sweep) | 0 | 0 |
| `v7-6cu356/_sweep-faz3-brand.js` | — | ATIK (Faz 3 sweep) | 0 | 0 |
| `v7-6cu356/_sweep-loginstate.js` | — | ATIK (Cila-2 Faz 2 sweep) | 0 | 0 |
| `v7-6cu356/_sweep-verify.js` | — | ATIK (doğrulama betiği) | 0 | 0 |

**Public sayfalarda hiç harici CSS dosyası yok** — 262 HTML'in tek `<link rel=stylesheet>`'i FontAwesome CDN'i. Tüm public CSS satır içi (`<style>`).

## 1.2 DadaFit kümesinin tam dosya listesi

**Public (21):** `dadafit-hub-v1` · `dadafit-kopru-v1` · `egzersiz-kutuphane-v1` · `egzersiz-detay-v1` · `program-liste-v1` · `program-detay-v1` · `challenge-v1` · `enerji-defteri-v1` · `hareket-rehberi-v1` · `hareket-yeni-baslayanlar-v1` · `hareket-dogru-form-v1` · `hareket-sureye-gore-v1` · `hareket-hedefe-gore-v1` · `hareket-bolgeye-gore-v1` · `hareket-masa-basi-v1` · `hareket-isinma-soguma-v1` · `hareket-sozluk-v1` · `antrenorler-v1` · `antrenor-detay-v1` · `antrenor-ol-v1` · `arama-fit-v1`

**Antrenör operatör paneli (8):** `antrenor-panel-v1` · `antrenor-uyeler-v1` · `antrenor-programlar-v1` · `antrenor-program-builder-v1` · `antrenor-egzersizler-v1` · `antrenor-challenge-v1` · `antrenor-mesajlar-v1` · `antrenor-profil-ayar-v1`

**Süper admin DadaFit bölümü (12):** `sa-dadafit` · `sa-dadafit-egzersizler{,-form,-detay}` · `sa-dadafit-programlar{,-form,-detay}` · `sa-dadafit-challenge{,-form,-detay}` · `sa-dadafit-antrenorler{,-detay}`

> **"antrenor" öneki koddan doğrulandı, isimden varsayılmadı.** Bu önek **iki ayrı katmana** dağılmış ama ikisi de DadaFit ailesi:
> - `antrenorler-v1`, `antrenor-detay-v1`, `antrenor-ol-v1` → **public**, `bs-fit is-active` taşıyor.
> - `antrenor-panel-v1` ve 7 kardeşi → **operatör paneli**, ekosistem barı yok; aile kanıtı kod yorumu + `--green:#009d4f` (DadaFit kurumsal yeşili) + menü içeriği (Üyelerim / Programlar / Egzersiz Kütüphanesi / Challenge'larım).

## 1.3 Birden fazla markaya hizmet eden dosyalar (dokunmak diğer markaları etkiler)

| Dosya | Fit'e hizmeti | Diğer tüketiciler | Risk |
|---|---|---|---|
| `assets/js/sa-shell.js` (343 sat.) | 12 `sa-dadafit-*` sayfası + rol `dadafit-admin` | 5 bölümün 77 sayfası | **En yüksek.** `SECTIONS`/`ROLES` config'i tek dosyada; bir satır hata tüm yönetim panelini düşürür |
| `assets/css/sa-shell.css` (459 sat.) | 12 | 78 sayfa | Yüksek |
| `assets/js/sa-ui.js` (135 sat.) | 8 antrenör paneli sayfası | 33 sayfa (dyt, mekan, admin) | Yüksek — toast/confirm/sil primitifleri |
| `assets/css/sa-ui.css` · `sa-gozetim.{css,js}` · `sa-list.css` · `sa-chcnt.js` | 4–10 | 18–32 | Orta |
| `profil-v1.html` (4951 sat.) | **antrenör public profili** (`?role=antrenor&view=public`) — `antrenorler-v1` kartlarının gerçek hedefi | Gastro üye profili, diyetisyen, işletme; `data-tab` = hakkinda/hizmetler/dytmenuler/yorumlar/**athakkinda/atprogramlar/atyorumlar**/tarifler/puf/uyelik/kaydedilenler/denedikleri/favoriler/menuler | **Yüksek** — 4 rolün tek dosyada gate'li birlikteliği |
| `giris-v1.html` · `hesabim-v1.html` · `bildirimler-v1.html` · `rozetler-v1.html` · `onboarding-v1.html` · `pro-v1.html` · `pro-odeme-v1.html` · `uye-abonelik-odeme-v1.html` · `siparislerim-v1.html` | 21/21 Fit sayfasından linkli (header zil, hesap dropdown, bottom-nav "Hesap", pro-gate) | Tüm markalar | Orta |
| `hakkimizda-v1.html` · `sss-v1.html` · `iletisim-v1.html` · `reklam-ver-v1.html` · `yasal-v1.html` | 21/21 Fit sayfası footer + çerez/onay şeridi | Tüm markalar | Orta |
| `anasayfa-portal-v3a.html` | Fit drawer "DadaMutfak'a dön" + ekosistem barı `bs-gastro` | Portal | Orta |
| `tarif-ekle-v1.html` · `puf-noktasi-ekle-v1.html` · `mutfak-defteri-v1.html` | **21/21 Fit sayfasının** hesap menüsü/drawer'ında Gastro aksiyonu olarak duruyor | Gastro | Orta — belge §3.3 bunu açıkça istemiyor (bkz. §3 tablosu) |
| `_shell.html` (1679 sat.) | Yeni Fit sayfası türetme şablonu | Tüm markalar | Düşük (canlı değil) |
| `dizin.html` | Fit sayfalarını listeler | Tüm markalar | Düşük |

## 1.4 BELİRSİZ — sana sorularım

| Dosya | Ölçüm | Soru |
|---|---|---|
| `yol-guzergahim-v1.html` (3230 sat.) | v1'e **3** dosyadan link var (`dizin`, `mekan-detay-v1`, `rozetler-v1`); v2'ye **50** dosyadan | v1 bilinçli mi duruyor, yoksa v2 geçişinden kalan atık mı? Aile ataması (Gourmet) net, durumu değil. |
| `tarif-detay-v1-headA.html` (2674 sat.) | Yalnız `dizin.html`'den linkli; ana menüsü **eski sürüm** (`DadaStore` ve `Dada Akademi` düz öğe olarak duruyor — kardeş sayfalarda bu drift temizlenmişti) | Aktif bir A/B varyantı mı, atık mı? |

Ek olarak bilgine: `dadamentor-alt1..6` + `v1-A..E` + `v2-a/b` (14 dosya) sıfır veya 2–4 gelen linkle duruyor; `wireframe-1..10` ve `ref-*` (17 dosya) sıfır gelen linkle duruyor. Bunları "wireframe ve atık" kümesine koydum — itirazın varsa söyle.

---

# 2 · DADAFİT ENVANTERİ

## 2.1 Public sayfalar (21)

Hepsi: satır içi `<style>` + satır içi `<script>`, tek harici CSS = FontAwesome 6.5.2 CDN, harici JS = **yok**.
"Menüden erişim" = Fit ana menü / dropdown / drawer / bottom-nav / footer kümesinde `href` olarak geçiyor mu.

| Dosya | Satır | Sayfa başlığı | Modül ailesi | Menüden erişilebilir | Gelen link (toplam / Fit-içi) |
|---|---:|---|---|---|---|
| `dadafit-hub-v1.html` | 2874 | DadaFit — Hareket Merkezi · Beslenme & Hareket Köprüsü | Ana Sayfa | ✅ marka logosu + bottom-nav "Hareket" | 148 / 20 |
| `dadafit-kopru-v1.html` | 2949 | DadaFit — Enerji Köprüsü · Antrenmanını ekle, bütçeni aç | Enerji Köprüsü | ⚠️ **yalnız 1 sayfanın** bottom-nav'ında ("Köprü"); ana menüde/footer'da YOK | 3 / 3 |
| `egzersiz-kutuphane-v1.html` | 2001 | Egzersiz Kütüphanesi — DadaFit | Hareket | ✅ nav + dropdown + drawer + bottom-nav + footer | 23 / 20 |
| `egzersiz-detay-v1.html` | 2276 | Goblet Squat — Egzersiz Detayı · Set Takibi | Hareket | ❌ (kart tıklamasıyla) | 3 / 3 |
| `program-liste-v1.html` | 1956 | Programlar — DadaFit | Programlar | ✅ nav + drawer + bottom-nav + footer | 21 / 20 |
| `program-detay-v1.html` | 2756 | 4 Hafta Ev Antrenmanı · Program | Programlar | ❌ (kart tıklamasıyla) | 4 / 3 |
| `challenge-v1.html` | 2394 | Haziran Challenge — DadaFit | Challenge | ✅ nav + drawer + bottom-nav + footer | 20 / 20 |
| `enerji-defteri-v1.html` | 2660 | DadaFit — Günlük Enerji Defteri | Enerji Defteri | ✅ nav + drawer + footer | 21 / 20 |
| `hareket-rehberi-v1.html` | 1811 | Hareket Rehberi — DadaFit | Hareket Rehberi | ✅ nav + drawer + footer | 20 / 20 |
| `hareket-yeni-baslayanlar-v1.html` | 1893 | Yeni Başlayanlar İçin Hareket | Hareket Rehberi kat. | ❌ yalnız rehber hub'ından | 1 / 1 |
| `hareket-dogru-form-v1.html` | 1894 | Doğru Form Rehberi | Hareket Rehberi kat. | ❌ | 1 / 1 |
| `hareket-sureye-gore-v1.html` | 1893 | Süreye Göre Hareketler | Hareket Rehberi kat. | ❌ | 1 / 1 |
| `hareket-hedefe-gore-v1.html` | 1884 | Hedefe Göre Hareket | Hareket Rehberi kat. | ❌ | 1 / 1 |
| `hareket-bolgeye-gore-v1.html` | 1858 | Bölgeye Göre Egzersizler | Hareket Rehberi kat. | ❌ | 1 / 1 |
| `hareket-masa-basi-v1.html` | 1884 | Masa Başı Hareketleri | Hareket Rehberi kat. | ❌ | 1 / 1 |
| `hareket-isinma-soguma-v1.html` | 1884 | Isınma, Soğuma ve Esneme | Hareket Rehberi kat. | ❌ | 1 / 1 |
| `hareket-sozluk-v1.html` | 1908 | Hareket Sözlüğü | Hareket Rehberi kat. | ❌ | 1 / 1 |
| `antrenorler-v1.html` | 1964 | Antrenörler — DadaMutfak Onaylı Antrenörler | Antrenörler | ✅ nav + dropdown + drawer + footer | 25 / 20 |
| `antrenor-detay-v1.html` | 2185 | Selin Aksoy — DadaMutfak Onaylı Antrenör | Antrenörler | ❌ **YETİM** | **0 / 0** |
| `antrenor-ol-v1.html` | 2010 | Antrenör Ol — Başvuru | Antrenörler | ❌ yalnız gövde CTA'sı | 5 / 2 |
| `arama-fit-v1.html` | 2792 | DadaFit — Arama | Ortak | ⚠️ `href` yok; 20 sayfada `onclick="location.href='arama-fit-v1.html'"` ile arama ikonundan | 0 href / 20 onclick |

**Toplam:** 45.726 satır · ortalama 2177 satır/sayfa.

**Boş veya şablon kalmış dosya: YOK.** 21 sayfanın hepsinde `<h1>` ve gerçek içerik var; en küçüğü 1811 satır.

**⚠️ Yetim:** `antrenor-detay-v1.html` (2185 satır) hiçbir sayfadan linkli değil. `antrenorler-v1` dizinindeki 5 antrenör kartının hepsi `profil-v1.html?role=antrenor&view=public` adresine gidiyor. Yani **iki ayrı antrenör profil sayfası var**, kullanılanı `profil-v1`; `antrenor-detay-v1` yalnız `profil-v1`'in CSS yorumunda kaynak olarak anılıyor (satır 1668: *"Kaynak: antrenor-detay-v1.html (cp- dark DadaFit hero → pf- LIGHT slot RE-SKIN)"*).

**Şablon tekrarı:** 8 `hareket-*` kategori sayfası birbirinin türevi — `hareket-yeni-baslayanlar-v1` ile satır bazında ortaklık **%96–98** (ör. `hareket-dogru-form-v1`: 1826/1893 satır aynı).

## 2.2 Antrenör operatör paneli (8)

Ortak kabuk: `assets/css/sa-ui.css` + `assets/css/sa-gozetim.css` + `assets/js/sa-ui.js` + `assets/js/sa-gozetim.js`. Sayfa CSS'i yine satır içi (`antrenor-panel-v1`'de 243 satırlık `<style>`).

| Dosya | Satır | Başlık | H1 (render) | Render tbody satırı | Boş/şablon |
|---|---:|---|---|---:|---|
| `antrenor-panel-v1.html` | 501 | Antrenör Paneli | Merhaba, Kerem Antrenör | 0 (kart tabanlı) | Hayır |
| `antrenor-uyeler-v1.html` | 578 | Üyelerim | Üyelerim | 7 | Hayır |
| `antrenor-programlar-v1.html` | 480 | Programlar | Programlar | 7 | Hayır |
| `antrenor-program-builder-v1.html` | 704 | Program Builder | Program Builder | 0 (grid) | Hayır |
| `antrenor-egzersizler-v1.html` | 583 | Egzersiz Kütüphanesi | Egzersiz Kütüphanesi | 0 (kart) | Hayır |
| `antrenor-challenge-v1.html` | 726 | Challenge'larım | Challenge'larım | 0 (kart) | Hayır |
| `antrenor-mesajlar-v1.html` | 568 | Mesajlar | Mesajlar | 0 (liste) | Hayır |
| `antrenor-profil-ayar-v1.html` | 871 | Profil & Ayarlar | Profil & Ayarlar | 0 (form) | Hayır |

Panel menüsü (koddan): Panel · Üyelerim (28) · Programlar · Egzersiz Kütüphanesi · Challenge'larım · Mesajlar (3) · Profil & Ayarlar · Public Profilim (`profil-v1.html?role=antrenor&view=public`).
**Panele public taraftan giriş yok:** 21 Fit public sayfasının hiçbiri `antrenor-panel-v1`'e link vermiyor (gelen 11 linkin tamamı panel-içi + `dizin` + `giris-v1`).

## 2.3 Süper admin DadaFit bölümü (12)

| Dosya | Satır | Başlık | Render tbody satırı |
|---|---:|---|---:|
| `sa-dadafit.html` | 298 | DadaFit — Süper Admin | 4 |
| `sa-dadafit-egzersizler.html` | 304 | Egzersizler | 9 |
| `sa-dadafit-egzersizler-form.html` | 410 | Yeni Egzersiz | – (form) |
| `sa-dadafit-egzersizler-detay.html` | 287 | Egzersiz Detay (Barbell Squat) | – |
| `sa-dadafit-programlar.html` | 288 | Programlar | 8 |
| `sa-dadafit-programlar-form.html` | 475 | Yeni Program | – |
| `sa-dadafit-programlar-detay.html` | 354 | Program Detay | – |
| `sa-dadafit-challenge.html` | 411 | Challenge'lar | 9 |
| `sa-dadafit-challenge-form.html` | 688 | Yeni Challenge | – |
| `sa-dadafit-challenge-detay.html` | 512 | Challenge Detay | – |
| `sa-dadafit-antrenorler.html` | 361 | Antrenörler | 5 |
| `sa-dadafit-antrenorler-detay.html` | 337 | Antrenör Detay | – |

12'sinin de gerçek içeriği var; boş/şablon kalan yok.

## 2.4 Rol parametreli kabuğun desteklediği rol değerleri (koddan)

`assets/js/sa-shell.js` satır 77–92 · rol çözümü: `?role=` → `localStorage['dm_sa_role']` → varsayılan `super`. Tanımsız değer `super`'a düşer.

| `?role=` | Ad | Rol etiketi | Erişebildiği bölümler | İniş bölümü |
|---|---|---|---|---|
| `super` | Süper Admin | Tüm yetki | genel, admin, saglik, store, **dadafit**, isletme, akademi | genel |
| `saglik-admin` | Sağlık Yöneticisi | Sağlık & Diyet | saglik | saglik |
| `store-admin` | Store Yöneticisi | E-Ticaret | store | store |
| **`dadafit-admin`** | **DadaFit Yöneticisi** | **Fitness** | **dadafit** | **dadafit** |
| `isletme-admin` | İşletme Yöneticisi | İşletmeler | isletme | isletme |

Bölümler: `genel` · `admin` · `saglik` · `store` · `dadafit` · `isletme` · `akademi` (`locked:true`, menüsü boş, "Yakında").
`?sec=` ile bölüm geçişi var; yetki dışı `sec` sessizce rolün iniş bölümüne düşürülür (satır 106).
`sa-dadafit` menüsü: Genel Bakış · Challenge'lar · Antrenörler · Egzersizler · Programlar (5 kalem).

---

# 3 · BELGENİN İSTEDİĞİ HARİTA İLE KARŞILAŞTIRMA

## 3.0 Mevcut ana menü — koddan okundu

`<nav class="nav">` içeriği, 21 Fit sayfasının 20'sinde birebir aynı **6 kalem**:

**Egzersizler** ▾ (dropdown: Antrenör Bul · Tüm Egzersizler · Vücut Bölgesi: Üst/Alt/Karın-Core · Ekipman: Ev-Ekipmansız/Ağırlık) · **Programlar** · **Enerji Defteri** · **Hareket Rehberi** · **Challenge** · **Antrenörler**

> **Belgedeki "mevcut menü" listesi (§2 tablosu) kodla birebir uyuşuyor** — 6/6 kalem aynı, fark yok.

**Ancak koddan çıkan, belgede olmayan iki gerçek:**
1. **`egzersiz-detay-v1.html` menüsü DIVERGENT:** 5 kalem — **Hareket Merkezi** (→`dadafit-hub-v1`) · Egzersizler · Programlar · Challenge · Antrenörler. "Enerji Defteri" ve "Hareket Rehberi" bu sayfada menüde YOK; buna karşılık belgenin istediği **"Hareket Merkezi"** terimi tek sayfada zaten uygulanmış. Menü 21 sayfada tekdüze değil.
2. Ana menünün yanında **3 ayrı navigasyon katmanı** daha var ve belge bunları saymıyor: drawer-nav (11 kalem), bottom-nav (5 kalem: Hareket · Egzersiz · Programlar · Challenge · Hesap), footer "DadaFit" kolonu (6 kalem).

## 3.1 Hedef ↔ Mevcut tablosu

| # | Sayfa | Belge bölümü | Repodaki dosya | Durum | Eksik olan |
|---:|---|---|---|:---:|---|
| 1 | Ana Sayfa | §4, §5 | `dadafit-hub-v1.html` | **YARIM** | "Bana Uygun Başlangıcı Bul" hero CTA'sı yok (§5.2/1). Giriş yapan için "Bugün kartı" yok (§5.2/2). §5.2 bölüm sırası tutmuyor. §5.3 azaltma yapılmamış. |
| 2 | Hareket Merkezi | §4, §7.1 | ayrı dosya YOK — `dadafit-hub-v1` bu rolü üstleniyor (yalnız `egzersiz-detay-v1` menüsünde "Hareket Merkezi" adıyla anılıyor) | **YARIM** | Toparlayıcı sayfa yok. §7.1'in 8 alanından repoda karşılığı olan: hedefe göre, bölgeye göre, ekipmana göre (dropdown'da), rehber bağlantısı. **Yok:** "Bugün kaç dakikan var? 5/10/15/20/30", hareket+rutin araması, yeni başlayan güvenli başlangıcı, "Son baktıklarım ve kaydettiklerim". |
| 3 | Egzersiz Kütüphanesi | §7.2 | `egzersiz-kutuphane-v1.html` (2001 sat.) | **YARIM** | §7.2 filtre listesinden **hareket türü**, **alan ihtiyacı**, **düşük etkili** yok. **Kişisel bağ satırının tamamı yok**: "Programa ekle", "Bugüne ekle", "Favoriye kaydet". |
| 4 | Egzersiz Detayı | §4, §7.3 | `egzersiz-detay-v1.html` (2276 sat.) | **YARIM** | 13 alanın 6'sı yok: **Sık yapılan hatalar** · **Kolay/zor varyasyonlar** · **Nefes/tempo ipuçları** · **Geçmiş performansla karşılaştırma** · **"Bugünkü antrenmana / aktif programa ekle"** · **Hazırlayan/kontrol eden uzman + son güncelleme tarihi**. Var olanlar: Nasıl yapılır (adımlar), Hedef kaslar, Benzer hareketler, video/GIF, ağrı uyarısı, `ed-set-*` set×tekrar×ağırlık takibi. Ayrıca menüden erişilmiyor. |
| 5 | Hareket Rehberi | §7.4 | `hareket-rehberi-v1.html` | **VAR** | — |
| 5b | …8 kategorisi | §7.4 tablosu | 8/8 dosya var: `hareket-yeni-baslayanlar` · `-dogru-form` · `-sureye-gore` · `-hedefe-gore` · `-bolgeye-gore` · `-masa-basi` · `-isinma-soguma` · `-sozluk` | **YARIM** | Sayfalar tam; **8'i de ana menüden erişilmiyor** (yalnız rehber hub'ından, her birine 1 gelen link). Sayfalar birbirinin %96–98 kopyası. |
| 6 | Hareket Sözlüğü | §7.4 | `hareket-sozluk-v1.html` | **VAR** | (Menü erişimi 5b'deki gibi hub üzerinden) |
| 7 | Programlar Merkezi | §4, §8.1 | `program-liste-v1.html` (1956 sat.) | **YARIM** | 8 maddeden 4'ü yok: **"Programımı Bul" sihirbazı** (site genelinde 0 eşleşme) · **Challenge'lar bölümü** (yalnız 4 metin geçişi, liste yok) · **"Devam ettiğim program"** · **süreye göre 1 günlük / 7-21-30 günlük ayrımı**. Var: hedef/süre/seviye/ekipman filtreleri (`df-fchip`), ücretsiz-Pro ayrımı. |
| 8 | Program Detayı | §4, §8.3 | `program-detay-v1.html` (2756 sat.) | **YARIM** | 13 maddeden yok olanlar: **kimler için uygun DEĞİL + güvenlik notları** · **duraklat / bırak / yeniden başlat durumları** (yalnız "Programa Başla" ve "Tamamla" var) · **kaçırılan gün için yeniden planlama** · **Enerji Defteri'ne otomatik kayıt** (5 metin geçişi var, otomatik akış yok) · **antrenmana uygun Dada Gastro tarif önerisi**. Var: hafta→gün→antrenman hiyerarşisi (4 hafta, dinlenme günleri dahil), hazırlayan uzman, tamamlanma. |
| 9 | Challenge Merkezi | §4, §8.4 | **YOK** | **YOK** | Bağımsız merkez sayfası yok. `challenge-v1` bir challenge **detayı** (Haziran Challenge, 30 gün); içindeki "Diğer Challenge'lar" bölümü 3 karttan ibaret ve bunların **1'i kendine (`challenge-v1.html`), 1'i `href="#"`, 1'inin hiç linki yok**. Aktif/yaklaşan/tamamlanan filtre + kategori yok. |
| 10 | Challenge Detayı | §8.4 | `challenge-v1.html` (2394 sat.) | **YARIM** | Sayfa var ama **tek, sabit challenge**; benzersiz kimlik/slug yok, ikinci bir challenge detayı açılamıyor (§13: "her challenge benzersiz kimliğe sahip olmalı"). Katılım akışı, günlük görev akışı ve rozet anlatımı sayfada var. |
| 11 | Fit Planım kabuğu | §4, §9 | **YOK** | **YOK** | Depoda "Fit Planım" ifadesi **0 eşleşme**. Kişisel kabuk hiç kurulmamış. |
| 12 | Bugün ekranı | §9.2 | **YOK** (parçalı: `enerji-defteri-v1` içinde "Bugün deftere eklediklerin", "Bugün hareketle açtığın alan", "Bugün ne kadar su içtin?") | **YARIM** | Ayrı ekran yok. §9.2'nin 8 maddesinden yok olanlar: **sıradaki antrenman**, **aktif challenge görevi**, **antrenör mesajı / yaklaşan randevu**, **"Bugünü tamamla / planı düzenle"**. |
| 13 | Enerji Defteri | §4, §9.3 | `enerji-defteri-v1.html` (2660 sat.) | **YARIM** | 9 maddeden yok: **kalori rakamlarını gizleme / yalnız denge göstergesi tercihi** · **kayıt düzeltme/silme ve veri geçmişi**. Var: alınan/harcanan/denge, öğün ekleme, su takibi, haftalık görünüm, öneriler, demo→"örnek" etiketi + giriş kapısı (3 "örnek", 14 "giriş yap" geçişi). **Menüde bağımsız ana kalem olarak duruyor — belge bunu Fit Planım'a taşımak istiyor.** |
| 14 | Enerji Köprüsü tanıtım | §9.4 | `dadafit-kopru-v1.html` (2949 sat.) | **YARIM** | Sayfa içerik olarak dolu (hesapla → antrenman ekle → denge → tarif) ve "yaklaşık değer" uyarısı var. Ama **ana menüde, drawer'da ve footer'da hiç yok**; yalnız 3 sayfadan (1'i bottom-nav) erişiliyor. Ürünün kalbi ama navigasyonda yeri yok. |
| 15 | Programım | §9.1 | **YOK** | **YOK** | Üyeye ait aktif program ekranı yok. |
| 16 | Antrenman Geçmişim | §9.1 | **YOK** | **YOK** | Depoda 0 eşleşme. |
| 17 | İlerlemem | §9.1, §9.5 | **YOK** | **YOK** | Depoda 0 eşleşme. §9.5'in 8 maddesinin hiçbiri karşılanmıyor. |
| 18 | Challenge ve Rozetler | §9.1 | `rozetler-v1.html` (2058 sat.) — **DadaFit değil, ORTAK/Gastro** | **YARIM** | Sayfa "Rozetlerin & Şef Kademen" = Gastro şef merdiveni. İçinde DadaFit yalnız ekosistem geçiş linki olarak geçiyor (2 kez). **Fit'e ait rozet/seri/challenge ilerlemesi yok.** |
| 19 | Kaydettiklerim | §9.1 | **YOK** | **YOK** | Depoda 0 eşleşme. `profil-v1`'de `kaydedilenler`/`favoriler` sekmeleri var ama **tarif** kapsamlı (Gastro). Egzersiz/program kaydetme ekranı yok. |
| 20 | Randevularım ve Mesajlar | §9.1 | **YOK** (üye tarafı) | **YOK** | "Randevularım" depoda 0 eşleşme. `rezervasyonlarim-v1` mekân rezervasyonu (Gourmet). Antrenör tarafında `antrenor-mesajlar-v1` var, **üye tarafında karşılığı yok**. |
| 21 | Sağlık ve Hareket Profilim | §9.1, §14.2 | **YOK** | **YOK** | 0 eşleşme. |
| 22 | Veri ve İzinlerim | §9.1, §14.2 | **YOK** | **YOK** | 0 eşleşme. §14.2'nin 6 maddesinin hiçbiri yok. |
| 23 | Antrenör Bul dizini | §4, §10.1 | `antrenorler-v1.html` (1964 sat.) | **YARIM** | 10 maddeden yok: **"Sana uygun antrenörü bul" eşleştirme** (0 eşleşme) · **Randevu al akışı** ("Randevu" kelimesi sayfada 0). Var: tüm antrenörler, uzmanlık, online/yüz yüze/hibrit, yeni danışan kabul durumu, filtreler (14), Antrenör Ol. |
| 24 | Antrenör Profili | §10.2 | **İKİ dosya**: `antrenor-detay-v1.html` (2185 sat., **yetim**) ve fiilen kullanılan `profil-v1.html?role=antrenor&view=public` | **YARIM** | Aynı işlev için iki sayfa; dizin kartları `profil-v1`'e gidiyor, `antrenor-detay-v1`'e hiç link yok. `antrenor-detay-v1`'de §10.2'den yok olanlar: **fiyat** (0 eşleşme, yalnız `₺` var) · **paket iptal koşulları** · **uygunluk takvimi** ("takvim" 0 eşleşme) · **okunabilir/benzersiz profil URL'i** (tek sabit sayfa, slug yok). Var: doğrulama rozeti, sertifika, hizmetler, Randevu Al CTA'sı, programlar, yorumlar, şikâyet/bildir. |
| 25 | Antrenör Paneli | §4, §10.3 | `antrenor-panel-v1` + 7 kardeş | **YARIM** | 11 maddeden yok: **Takvim / randevu / iptal-yeniden planlama** (8 dosyada "Takvim" 0, "Randevu" 0) · **Ödeme, komisyon, kazanç** (0 eşleşme) · **Raporlar** (0 eşleşme) · **Ön değerlendirme ve hareket geçmişi** (0) · **görüşme notu / dosya paylaşımı** (0). Var: genel bakış+ajanda, üye listesi, program oluşturucu+şablon, ilerleme, mesajlaşma, profil/hizmet/belge. Panele public taraftan giriş linki yok. |
| 26 | Antrenör Ol başvurusu | §10.1 | `antrenor-ol-v1.html` (2010 sat.) | **VAR** | (Ana menüde değil; `antrenorler-v1` gövde CTA'sından erişiliyor — belge de menüde istemiyor) |
| 27 | Bana Uygun Başlangıcı Bul | §5.2, §6, §18/7 | **YOK** | **YOK** | Depoda 0 eşleşme. §6'nın 6 sorusu ve 5 maddelik sonuç ekranı hiç yok. Belge bunu ana sayfa + Hareket Merkezi + Programlar Merkezi'nde istiyor. |
| 28 | Footer → Hakkımızda | §3.3 | `hakkimizda-v1.html` | **VAR** | 21/21 Fit footer'ında |
| 29 | Footer → SSS | §3.3 | `sss-v1.html` | **VAR** | 21/21 |
| 30 | Footer → İletişim | §3.3 | `iletisim-v1.html` | **VAR** | 21/21 |
| 31 | Footer → İş Birliği | §3.3 | `reklam-ver-v1.html` | **VAR** | 21/21 ("Reklam Vermek İçin" + "Sponsorlar ve Partnerler", ikisi de aynı hedefe) |
| 32 | Footer → Kullanım Koşulları | §3.3 | `yasal-v1.html` var ama **footer'da linki yok** | **YARIM** | Sayfa 21/21 Fit sayfasından linkli — ama **çerez banner'ı ve form onay satırından** (`yasal-v1.html?metin=cerez` / `?metin=kvkk` / `?metin=aydinlatma`), footer kolonlarından değil. Footer'da "Kullanım Koşulları" kalemi yok. |
| 33 | Footer → Gizlilik | §3.3 | `yasal-v1.html` (KVKK) | **YARIM** | 32 ile aynı: sayfa var, footer linki yok. |
| 34 | Footer → Sağlık Bilgilendirmesi | §3.3, §14.1 | **YOK** (ayrı sayfa) | **YOK** | Ayrı sayfa yok. Genel bilgi/tıbbi tavsiye ayrımı metni **21 Fit sayfasının yalnız 4'ünde** var (`hareket-rehberi`, `hareket-yeni-baslayanlar`, `hareket-sureye-gore`, `hareket-masa-basi`). Footer'da hiç kalem yok. |

**Sayım:** VAR **6** · YARIM **17** · YOK **11** (toplam 34 satır).

---

# 4 · KABUK ÖLÇÜMÜ

## 4.1 Public kabuk (satır içi, kopya)

| Blok | Taşıyan dosya | Toplam satır | Ort. | Min–Max |
|---|---:|---:|---:|---|
| Ekosistem üst barı (topbar) | 135 | 4.506 | 33,4 | 29–35 |
| Header (marka + ana menü + dropdown + hesap) | 140 | 13.204 | 94,3 | 55–292 |
| Mobil drawer | 140 | 9.012 | 64,4 | 42–87 |
| Footer | 161 | 7.282 | 45,2 | 8–59 |
| Kabuk CSS satırı (`.topbar/.header/.nav/.drawer/.footer/.acct-/.bs-/.tb-…` ile başlayan kurallar) | 176 | 34.565 | 196,4 | 1–304 |
| **Toplam tekrar maliyeti** | | **68.569 satır** | | |

Ek: `brand-switch` ekosistem barı **112** dosyada · `bottom-nav` **144** dosyada (**720** kalem) · `<nav class="nav">` **140** dosyada · `drawer-nav` **143** dosyada.

### Yalnız DadaFit public (21 dosya)

| Blok | Satır (toplam) | Sayfa başına |
|---|---:|---:|
| topbar | 660 | ~33 (20/21 dosyada; `program-liste-v1`'de işaret yorumu farklı, bar mevcut) |
| header | 1.535 | 73 |
| drawer | 1.172 | 56 |
| footer | 966 | 46 |
| **Kabuk markup toplamı** | **4.333** | ~208 |
| Kabuk CSS | 4.688 | ~223 |
| **Kabuk toplamı** | **9.021** | ~430 |
| Fit sayfalarının toplam satırı | 45.726 | 2.177 |
| **Kabuğun payı** | **%19,7** | |

## 4.2 Kabuk tek kaynakta mı, kopya mı?

| Katman | Kaynak | Değerlendirme |
|---|---|---|
| Public sayfalar (177 dosya, Fit'in 21'i dahil) | **Yok** — her sayfa kendi kopyasını taşır (HTML + CSS + JS satır içi) | **Tamamen kopya.** Harici tek dosya FontAwesome CDN'i. |
| Süper admin (78 dosya) | `assets/css/sa-shell.css` + `assets/js/sa-shell.js` | **Kısmen tek kaynak.** 2. seviye menü (`#saMenu`) `sa-shell.js` içindeki `SECTIONS` config'inden **tek yerden** üretiliyor. Ama ikon-rail markup'ı (**12 satır**) ve üst ince bar (**18 satır**) 77 dosyada **kopya** → 77 × 30 = **2.310 satır** tekrar. |
| Operatör panelleri (19 dosya: 8 antrenör + 6 dyt + 4 mekan + `panel-shell`) | `assets/{css,js}/sa-ui` + `sa-gozetim` | **Kısmen.** Yardımcı primitifler paylaşılıyor; `pnl-side` sol menü markup'ı (**~20 satır**) her dosyada kopya + sayfa CSS'i satır içi (ör. `antrenor-panel-v1`: 243 satır `<style>`). |

**Cevap:** Kabuk tek kaynakta **değil**. Rol parametreli kabuk (`sa-shell.html` + `assets/js/sa-shell.js`) ile statik `sa-*` ekran dosyaları **aynı CSS/JS kaynağını** yüklüyor — ama Fit'in public tarafı bu altyapının **tamamen dışında**, hiçbir şey paylaşmıyor. Üç ayrı kabuk rejimi var.

## 4.3 Ana menüye tek kalem eklemek bugün kaç dosya demek?

**DadaFit ana menüsüne 1 kalem eklemek = 21 dosya · en az 63 ekleme noktası:**

| Yer | Dosya | Not |
|---|---:|---|
| `<nav class="nav">` header menüsü | 21 | `egzersiz-detay-v1` divergent (5 kalem, farklı ilk öğe) → elle |
| `<nav class="drawer-nav">` mobil drawer | 21 | |
| Footer "DadaFit" kolonu | 21 | |
| **Alt toplam** | **63 ekleme** | |
| (kalem alt bara da girecekse) `bottom-nav` | +21 | 5 kalem sınırlı |
| (kalem dropdown'a girecekse) `.dropdown` | +21 | |

Karşılaştırma: **süper admin menüsüne 1 kalem eklemek = 1 dosya, 1 satır** (`assets/js/sa-shell.js` içindeki `SECTIONS.<bölüm>.menu` dizisi).

Belgenin §3.1 hedefi (6 kalem → 4 kalem + mega menü) bugünkü yapıda **21 dosyada 4 ayrı navigasyon katmanının elden geçirilmesi** demek. Site geneline (140 `<nav class="nav">` taşıyan dosya) yayılacaksa maliyet 140 dosyaya çıkar.

---

# 5 · SINIF VE TOKEN ENVANTERİ

## 5.1 Sınıf aileleri (DadaFit public, 21 dosya)

**1.086 benzersiz sınıf adı · 250 benzersiz önek** (FontAwesome'un 163 `fa-*` sınıfı dahil).

Önek × dosya matrisi:
- **50 önek 18+ dosyada** → ortak kabuk ailesi (`topbar` `header` `nav` `dropdown` `dd-` `drawer` `bottom` `bn-` `footer` `foot-` `acct-` `head-` `brand` `bs-` `tb-` `fb-` `feedback` `cookie` `lg-` `mp-` `mentor` `wrap` `btn` `chip` `is-` `fit-` `fl-` `gw-` …)
- **144 önek tek dosyada** → sayfa-yerel ada

En büyük sayfa-yerel aileler:

| Önek | Sınıf | Dosya | İşi |
|---|---:|---|---|
| `df-` | 51 | dadafit-hub (+6) | hub bölümleri, köprü kartı, filtre çipleri |
| `kp-` | 49 | dadafit-kopru | Enerji Köprüsü hesaplayıcı |
| `ed-` | 42 | egzersiz-detay (+enerji-defteri) | detay + set takip tablosu |
| `pd-` | 41 | program-detay | hafta/gün hiyerarşisi |
| `chl-` | 30 | challenge | challenge gövdesi |
| `fs-` | 28 | arama-fit | arama sonuç kartları |
| `cp-` `apt-` `rev-` `sim-` `ab-` `prog-` | 18+17+17+7+5+9 | antrenor-detay | tek sayfada **6 ayrı** aile |
| `bal-` `meal-` `water-` `dl-` | 8+6+6+13 | enerji-defteri | tek sayfada 4 ayrı aile |

## 5.2 Aynı işi yapan iki ayrı sınıf ailesi

| İş | Aile A | Aile B | Kanıt |
|---|---|---|---|
| **Egzersiz kartı** (hedefi `egzersiz-detay-v1.html`) | `.ex-card` (`egzersiz-kutuphane-v1`) | `.hub-card` (`dadafit-hub-v1`) | ikisi de `<a href="egzersiz-detay-v1.html">` |
| **Egzersiz kartı — 3. ve 4. varyant** | `.fs-card` (`arama-fit-v1`, JS ile üretiliyor) | `.ed-altcard` (`egzersiz-detay-v1`, alternatif hareket) | aynı veri, dört farklı kart dili |
| **Program kartı** (hedefi `program-detay-v1.html`) | `.pr-card` (`program-liste-v1`) | `.prog-card` (`antrenor-detay-v1`) | ikisi de `<a href="program-detay-v1.html">` |
| **Program kartı — 3. varyant** | `.df-combo-card` (`dadafit-hub-v1`) | `.pd-fit-card` (`program-detay-v1`) | |
| **Challenge kartı** | `.cc-card` | `.chl-card` | **aynı dosyada** (`challenge-v1`) iki ayrı challenge kart ailesi |
| **Rehber/kategori kartı** | `.hub-card` (`hareket-rehberi-v1`) | `.brg-card` + `.art-*` + `.reh-*` (`hareket-dogru-form-v1`) | |
| **⚠️ İsim çakışması** | `.hub-card` = *egzersiz kartı* (`dadafit-hub-v1`) | `.hub-card` = *rehber kategori kartı* (`hareket-rehberi-v1`) | **Aynı sınıf adı, iki farklı iş.** Ortak CSS'e taşınırsa iki sayfadan biri bozulur. |
| **Antrenör kartı** | `.coach-card` | — | `dadafit-hub` + `antrenorler-v1`'de **tutarlı**, tek aile (olumlu örnek) |

## 5.3 Token envanteri

**Tanım yeri:** her HTML dosyasının satır içi `<style>` bloğundaki `:root{}`. **178 dosyada `:root{` var**, **173 dosyada `--tomato:` tanımlı**. Paylaşılan token dosyası **yok** — tek istisna `assets/css/sa-shell.css:24` (`:root`, yalnız yönetim paneli için).

DadaFit public: **70 token**, 21 dosyanın hepsinde tekrar. DadaFit her sayfada **iki ayrı `:root` bloğu** taşıyor (kök palet + `--fit-*` alt-marka bloğu).

### Aynı değeri iki farklı isimle tanımlayan tokenlar (DadaFit public)

| Değer | Tanımlayan token adları | Not |
|---|---|---|
| `#009d4f` | `--tomato` · `--fit` · `--c-green` · `--b-fit` | **`--tomato` = YEŞİL.** Fit sayfalarında "domates" adlı token kurumsal yeşile bağlanmış (kod yorumu: *"DadaFit alt-marka recolor … chrome aksanı kurumsal yeşil"*). Site genelinde 97 dosyada `--tomato:#E14827` (gerçek domates). Aynı isim, iki farklı renk. |
| `#211e16` | `--ink` · `--slate` · `--fit-dark` | 3 isim (panel tarafında da `--ink`/`--slate` ikilisi var) |
| `#3bb77e` | `--green` · `--b-diet` · `--c-mint-deep` | |
| `#e14827` | `--food` · `--b-gastro` · `--bs-c` | Fit'te "yediğin" kırmızısı `--food` olarak ayrılmış |
| `#007a3d` | `--tomato-dark` · `--fit-deep` | |
| `#b14fc5` | `--c-purple` · `--b-gourmet` | |
| `#006072` | `--c-petrol` · `--b-akademi` | |
| `#ffffff` | `--paper` · `--bg-white` | |
| `#f9f9f9` | `--bg` · `--bg-cream` | isim "cream" ama değer gri |
| `12px` | `--r-md` · `--radius-md` | legacy alias çifti |
| `16px` | `--r-lg` · `--radius-lg` | **çakışmalı** — aşağı bak |
| `24px` | `--r-xl` · `--radius-xl` | |
| `50%` | `--r-circle` · `--radius-circle` | |
| `0 18px 50px rgba(33,30,22,.16)` | `--sh-3` · `--sh-lg` | |

### Aynı token adı, farklı değer

| Token | Değerler |
|---|---|
| `--r-lg` | `var(--radius-xl)` (=24px) **ve** `16px` — ikisi de 21 Fit dosyasında geçiyor. `--radius-lg` ise 16px. Yarıçap ölçeğinde çakışan alias. |
| `--bc` · `--bl` · `--bs-c` · `--bs-bg` · `--bs-bd` · `--bs-ic` | 5'er değer — bunlar ekosistem barındaki 5 marka çipinin scoped token'ları, **tasarım gereği** (hata değil) |

## 5.4 Markalar aynı token kümesini mi paylaşıyor?

Tanım kopyalanarak paylaşılıyor; tek kaynak yok.

| Marka | Token sayısı | DadaFit ile ortak | Yalnız o markada | Yalnız Fit'te |
|---|---:|---:|---:|---:|
| DadaFit (public) | 70 | — | — | — |
| DadaDiet | 63 | 63 | 0 | 7 |
| DadaGastro | 71 | 63 | 8 | 7 |
| DadaGourmet | 63 | 62 | 1 | 8 |
| DadaCampus | 63 | 63 | 0 | 7 |
| DadaMentor (`dadamentor-v3`) | 47 | 36 | 11 | 34 |
| DadaFit antrenör paneli | 30 | (ayrı küme) | — | — |

**Sonuç:** 4 public marka **63 tokenlik ortak bir çekirdeği** paylaşıyor; Fit'in 7 fazlası `--fit-*` alt-marka bloğu. Ama bu ortaklık **kopyalama yoluyla** — 63 token 112 dosyada ayrı ayrı yazılı. Bir token değeri değişirse 112 dosya düzenlenir. `dadamentor-v3` bu çekirdeğin dışında (34 token ortak değil). Antrenör paneli tamamen ayrı 30 tokenlik küme kullanıyor.

---

# 6 · BAĞLANTI VE SAĞLIK ÖLÇÜMÜ

Kapsam: 21 Fit public + 8 antrenör paneli + 12 sa-dadafit = **41 sayfa**.

## 6.1 Statik bağlantı taraması

| Bulgu | Toplam | Not |
|---|---:|---|
| **Boş diyez bağlantı** (`href="#"`) | **276** | dağılım aşağıda |
| Kırık iç hedef (`#id` diskteki dosyada yok) | **0** | sayfa-içi ve çapraz-dosya (`hakkimizda-v1.html#kunye` → `id="kunye"` mevcut) |
| Kırık dosya bağlantısı (`*.html` diskte yok) | **0** | |
| Kırık varlık (`assets/…` diskte yok) | **0** | |
| Kök dizinden başlayan mutlak yol (`/…`) | **0** | tüm iç bağlantılar relative |
| Büyük/küçük harf uyuşmazlığı | **0** | |
| Boş `href=""` | **0** | |
| Boş `onclick=""` | **0** | |

### `href="#"` dosya bazında

| Dosya grubu | Sayfa başına | Kırılım |
|---|---:|---|
| 18 Fit public sayfası | **12** | 8 sosyal medya ikonu (topbar 3 + footer 5, **hepsi ölü**) · 2 dil seçici (JS ile yönetiliyor) · 1 `#fbTab` görüş bildir sekmesi (JS) · 1 footer "Öneri ve Şikayet" (`onclick` ile çalışıyor) |
| `challenge-v1` | **14** | +2 **gerçek ölü içerik CTA'sı**: `.cc-card href="#"` → "Sabah Esneme Ritüeli" (yaklaşan) ve "Adım Adım Yürüyüş" (geçmiş). Üçüncü kart `challenge-v1.html`'e, yani **kendine** gidiyor. |
| `enerji-defteri-v1` | **14** | +2 `data-lg-gate` giriş kapısı butonu (JS ile çalışıyor, ölü değil) |
| `antrenor-ol-v1` | **14** | +2 reCAPTCHA yasal metin linki ("Gizlilik" / "Kullanım Şartları") — **ölü** |
| 8 antrenör paneli sayfası | **0** | |
| 12 `sa-dadafit-*` sayfası | 1–2 | panel içi placeholder aksiyon |

**Gerçekten ölü (işlevsiz) bağlantı özeti:** 21 Fit public sayfasında **8 sosyal ikon × 21 = 168** + `challenge-v1`'de **2 challenge kartı** + `antrenor-ol-v1`'de **2 yasal link** = **172 ölü hedef**.

## 6.2 Aynı işleve farklı terim

| İşlev | Kullanılan terimler | Ölçüm |
|---|---|---|
| Ana menü üst başlığı | **"Egzersizler"** (147 geçiş / 21 dosya) ↔ "Hareketler" (10 / 7) ↔ "Hareket Merkezi" (6 / 4) | Belge §16 "Hareket" istiyor; kod "Egzersizler" kullanıyor. `egzersiz-detay-v1` tek başına "Hareket Merkezi" diyor. |
| Uzman | **"Antrenör"** (170 / 21) ↔ **"Eğitmen"** (8 / 6) ↔ "Koç" (1 / 1) | "Eğitmen eşliğinde video serileri" satırı 6 Fit sayfasının Pro-gate listesinde; `antrenor-detay-v1`'de "Birebir Online Koçluk" hizmet adı |
| Antrenörün müşterisi | Antrenör paneli: **"Üyelerim"** (8/8 dosya) ↔ Diyetisyen paneli: **"Danışanlar"** ↔ Belge §10.3: **"Danışan listesi"** | Panelde "Danışan" kelimesi **0** geçiş; iki operatör paneli aynı işleve iki isim veriyor |
| Antrenör profili | `antrenor-detay-v1.html` ↔ `profil-v1.html?role=antrenor&view=public` | Aynı işlev, iki sayfa, ikisi de canlı |

**Tutarlı olanlar (fark yok):** "Programlar" (141/21) · "Challenge" (103/21, "Meydan Okuma" 0) · "Enerji Defteri" (93/21, "Kalori Defteri" 0) · "Hareket Rehberi" (90/21).

## 6.3 Yatay taşma — 1440 / 1024 / 768 / 390

Ayrım kuralı: `documentElement.scrollWidth > viewport` → **sayfa-düzeyi taşma**; eşitse iç yatay-scroll konteyneri (chip rayı / tablo sarmalayıcı) → taşma değil.

### Gerçek sayfa-düzeyi taşma (4 vaka, 3 dosya — hepsi panel tarafında)

| Dosya | Genişlik | `scrollWidth` | Fazla | Taşan öğe |
|---|---:|---:|---:|---|
| `antrenor-uyeler-v1.html` | 768 | 919 | **+151 px** | `<table class="ptable">` (sol=17, sağ=919) |
| `antrenor-uyeler-v1.html` | 1024 | 1179 | **+155 px** | aynı tablo |
| `antrenor-programlar-v1.html` | 1024 | 1372 | **+348 px** | `<table class="ptable">` |
| `sa-dadafit.html` | 1024 | 1124 | **+100 px** | `.df-mod-card.is-locked` (kilitli modül kartı) |

**21 Fit public sayfasının hiçbirinde sayfa-düzeyi yatay taşma yok** (4 genişlikte de `scrollWidth == viewport`).

### İç scroll konteynerinde taşan öğeler (taşma değil, kayıt için)

`df-fchip` filtre çipi rayı — `egzersiz-kutuphane-v1` (390: 12 öğe), `program-liste-v1` (390: 12), `enerji-defteri-v1` (390: 7), `antrenorler-v1` (**1440'ta bile 1 öğe**, 1024: 3, 768: 7, 390: 17); `cp-tab` sekme rayı — `antrenor-detay-v1` (390: 2); `dt` butonu — `antrenor-profil-ayar-v1` (390: 3); `ptable` — `sa-dadafit-egzersizler/programlar/challenge/antrenorler` (390'da 23–136 öğe), `antrenor-program-builder-v1` `bld-grid`. Bunlar sarmalayıcıları içinde kayıyor, sayfayı taşırmıyor.

## 6.4 Banner yüksekliği / ekran yüksekliği > %50

Ölçüm viewport yüksekliği **900 px** sabit. Seçici sırası: `.hero` → `.lst-hero` → `.df-hero` → `.page-hero` → `main > section:first-of-type`.

| Dosya | 1440 | 1024 | 768 | 390 |
|---|---:|---:|---:|---:|
| `enerji-defteri-v1` (`.df-hero`) | 0,60 | **1,03** | **1,09** | **1,13** |
| `challenge-v1` | 0,60 | **1,00** | **1,00** | **1,02** |
| `dadafit-hub-v1` (`.df-hero`) | 0,54 | 0,90 | 0,90 | **0,97** |
| `antrenor-detay-v1` | 0,45 | 0,66 | 0,73 | **0,97** |
| `dadafit-kopru-v1` | 0,61 | 0,88 | 0,88 | 0,89 |
| `antrenor-ol-v1` | 0,69 | 0,66 | 0,66 | 0,83 |
| `program-detay-v1` | 0,62 | 0,62 | 0,62 | 0,77 |
| `arama-fit-v1` | 0,52 | 0,52 | 0,52 | 0,49 |

**%50 sınırının altında kalanlar:** `egzersiz-kutuphane-v1` (0,42–0,44) · `program-liste-v1` (0,42–0,48) · `hareket-rehberi-v1` (0,36–0,39) · `antrenorler-v1` (0,42–0,49) · `egzersiz-detay-v1` (0,23–0,27) · 8 `hareket-*` kategori sayfası (0,28–0,33).

**Panel sayfalarında banner yok** — 20 panel/admin sayfasında yukarıdaki seçicilerin hiçbiri eşleşmedi (bu bir eksiklik değil, panel tasarımı böyle).

## 6.5 Konsol hataları

**41 sayfa × 4 genişlik = 164 yükleme. Konsol hatası veren sayfa: 0.**
Ek ağ probu (8 sayfa, 1440, 3 sn bekleme): `requestfailed = 0`, `HTTP ≥ 400 = 0`.

> ⚠️ **Ölçüm sınırı:** `assets/video/dadafit-hero.mp4` gitignore'lı. Lokalde dosya var ve yükleniyor; **canlıda (GitHub Pages) yüklenmez.** Bu videoyu `dadafit-hub-v1.html` ve `enerji-defteri-v1.html` kullanıyor. Yani ölçtüğüm "0 konsol hatası" **lokal** için geçerli; canlıda bu 2 sayfada video 404'ü beklenir. Ölçemedim çünkü ölçüm yerel sunucu üzerinde koştu.

---

# 7 · YAYIN VE GİZLİLİK DURUMU

**Uzak kaynak:** `git@github.com:By4r/dadamutfak-view.git` · dal `main` · GitHub Pages aktif (main/kök).
**Senkron:** `HEAD = origin/main = 12289a1`, ahead 0 → **takip edilen her şey uzaktaki dalda ve canlıda.**
**Takip edilen toplam dosya: 727.**

## 7.1 Kategori tablosu

| Kategori | Adet | Nerede | Canlı |
|---|---:|---|:---:|
| **Ajan / QA raporu** (`outputs/*.md`) | **76** | `outputs/` (8'i `outputs/mobil-qa/`) | ✅ 200 |
| **QA / sweep betiği** (`.mjs` + `.py`) | **48** | `tasks/` (44), `v7-6cu356/outputs/` (3), `outputs/` (1) | ✅ 200 |
| **Spec / kanon belgesi** (`.md`) | **33** | `tasks/` (18), `outputs/` (7), `v7-6cu356/tasks/30-haz-revize/` (7), kök (1) | ✅ 200 |
| **Plan / envanter notu** (`.md`) | **31** | `tasks/` (29), `outputs/` (1), `v7-6cu356/tasks/30-haz-revize/` (1) | ✅ 200 |
| **Diğer iç belge** (`.md`) | **11** | `CLAUDE.md`, `.claude/skills/{revize,handoff}/SKILL.md`, `tasks/` (5), `v7-6cu356/outputs/` (2), `gastro-mutfaga-giris/OKUBENI.md` | ✅ 200 |
| **Kurumsal / ham kaynak** | **4** | `brand/corporate-identity-guideline.pdf` (8,8 MB), `brand/logo.pdf`, `tasks/corporate-identity-guideline.pdf` (**kopya**), `tasks/KategoriEkle.xlsx` | ✅ 200 |
| **Ders notu** | **1** | `tasks/lessons.md` (616 satır — hata/kriz anlatımları içerir) | ✅ 200 |
| **Ekran görüntüsü / proje dışı görsel** | **1** | `v7-6cu356/logo-colored.png` | ✅ 200 |
| **TOPLAM iç belge + betik** | **205** | (727 tracked dosyanın %28'i) | |
| **Anahtar / token** | **0** | `AKIA…`, `sk-…`, `ghp_…`, `xox…`, `PRIVATE KEY`, `api_key="…"` desenleri: **0 eşleşme** (vendor dosyaları hariç) | — |
| **`.env` uzantılı dosya** | **0** | — | — |
| **Kişi adı geçen kod yorumu** | **33 satır / 24 dosya** | "Beyar", "Kerem", "Yasin" geçen `/* */`, `//`, `<!-- -->` yorumları — ör. `anasayfa-portal-v3a.html:3229` *"(Revize T3 M18, Yasin Bey talebi)"*, `sa-admin-tarifler-form.html:137` *"(div+bg cover, img DEĞİL — Kerem Bey)"*. **DadaFit dosyalarında 0** | ✅ 200 |

## 7.2 Canlı erişilebilirlik — doğrulandı

`curl` ile HTTP kodu ölçüldü:

| URL | Kod |
|---|---:|
| `…/tasks/lessons.md` | **200** |
| `…/tasks/brand-tokens.md` | **200** |
| `…/tasks/master-plan-2026-07-02.md` | **200** |
| `…/v7-6cu356/tasks/30-haz-revize/fit-ek.md` | **200** |
| `…/outputs/cila-raporu.md` | **200** |
| `…/tasks/antrenor-panel-qa.mjs` | **200** |
| `…/tasks/corporate-identity-guideline.pdf` | **200** |
| `…/tasks/KategoriEkle.xlsx` | **200** |
| `…/v7-6cu356/sa-shell.html` | **200** |
| `…/tasks/handoff.md` | **404** ✅ (gitignore'lu — doğru) |

## 7.3 Ek ölçüm notu

`.gitignore`'da `outputs/` ve `v7-6cu356/outputs/` satırları **var**, ama `outputs/` altında **88 dosya hâlâ tracked** (gitignore zaten takip edilen dosyayı geri almaz). Yani ignore kuralı yazıldıktan sonra eklenen dosyalar girmiyor, ama önceden girenler canlıda duruyor.

`v7-6cu356/tasks/30-haz-revize/` altındaki 7 belge — bu turun kaynak dokümanının kardeşleri olan `fit-ek.md`, `diet-ek.md`, `dada-revize.md`, `marka-kabuk-sablonu.md`, `marka-klon-sablonu.md`, `gastro-pilot-plan.md`, `amac-ve-kapsam.md` — tracked ve canlı.

*(Ölçüm sadece; hiçbir dosya silinmedi, taşınmadı, gitignore'a eklenmedi, geçmişe dokunulmadı.)*

---

# 8 · HİÇ BAŞLANMAMIŞ MODÜL AİLELERİ

| Aile | Belge bölümü | Repodaki iz |
|---|---|---|
| **Fit Planım (kişisel kullanıcı merkezi)** — kabuk + 10 alt sayfa | §4, §9 (tamamı), §18/5, §19 | **Sıfır.** "Fit Planım" ifadesi depoda 0 eşleşme. Alt menünün 10 kaleminden repoda karşılığı olan yalnız 1 tanesi (`Enerji Defteri`) ve o da bağımsız ana menü kalemi olarak duruyor. Eksik 9: Bugün · Programım · Antrenman Geçmişim · İlerlemem · Challenge ve Rozetler · Kaydettiklerim · Randevularım ve Mesajlar · Sağlık ve Hareket Profilim · Veri ve İzinlerim |
| **Bana Uygun Başlangıcı Bul (ortak yönlendirme sihirbazı)** | §5.2, §6, §8.1, §18/7, §19 | **Sıfır.** 6 sorunun ve 5 maddelik sonuç ekranının hiçbir izi yok. |
| **Challenge Merkezi** | §4, §8.4 | **Sıfır sayfa.** Tek challenge detayı var, çoklu challenge yaşam döngüsü yok. |
| **Hareket Merkezi (toparlayıcı sayfa)** | §4, §7.1 | Sayfa yok; terim tek dosyada (`egzersiz-detay-v1` menüsü) mevcut. |
| **Programlar Merkezi'nin merkez işlevi** | §8.1 | Liste sayfası var; "Programımı Bul", "Devam ettiğim program", "Challenge'lar bölümü" yok. |
| **Veri ve izin yönetimi** | §14.2 (6 madde) | **Sıfır.** Sağlık/hareket profili izni, veri indirme/silme, antrenörün gördüğü veri, rol bazlı erişim, saklama süresi — hiçbiri yok. |
| **Randevu yaşam döngüsü** (9 adım) | §11, §10.1 | **Sıfır.** `antrenorler-v1`'de "Randevu" 0 eşleşme; antrenör panelinde takvim/randevu 0. `antrenor-detay-v1`'de yalnız statik "Randevu Al" butonu (3 geçiş), takvim yok. |
| **Antrenör ticari katmanı** (ödeme, komisyon, kazanç, raporlar) | §10.3, §12.4 | **Sıfır.** 8 panel sayfasında "Ödeme/komisyon/kazanç/Rapor" 0 eşleşme. |
| **Benzersiz kimlik / slug altyapısı** | §12, §13, §18/8, §19 | **Sıfır.** Her modülde tek sabit detay sayfası var (`egzersiz-detay-v1`, `program-detay-v1`, `challenge-v1`, `antrenor-detay-v1`); slug/id yok, her kart aynı sayfayı açıyor. |
| **Sağlık Bilgilendirmesi sayfası** | §3.3, §14.1 | **Sıfır ayrı sayfa.** Genel bilgi/tıbbi tavsiye ayrımı yalnız 4/21 Fit sayfasında satır içi metin olarak var. |

---

# 9 · ORTAK DOSYALARA DOKUNMANIN DİĞER MARKALARA RİSKİ

| Dosya | Fit için ne gerekir | Kim daha etkilenir | Risk |
|---|---|---|---|
| `assets/js/sa-shell.js` (343 sat., **77 sayfa**) | `SECTIONS.dadafit` menüsüne kalem, `dadafit-admin` rolüne yetki | admin · saglik · store · isletme · akademi bölümlerinin 65 sayfası | **Kritik.** Tek dosyada 7 bölümün menüsü + 5 rolün yetkisi. Söz dizimi hatası tüm yönetim panelini boş bırakır (`#saMenu` ve `#saMain` JS ile doluyor). |
| `assets/css/sa-shell.css` (459 sat., **78 sayfa**) | Fit ekranlarına stil | aynı 5 bölüm | **Kritik.** Tek `:root` bloğu; token değişimi 78 sayfaya anında yayılır. |
| `assets/js/sa-ui.js` (135 sat., **33 sayfa**) | Antrenör panelinde toast/confirm/sil | diyetisyen (6) · mekân (4) · admin (15) panelleri | **Yüksek.** Silme delegasyonu ve hesap dropdown'ı burada; `window.SA_ACCOUNT_ITEMS` config'i çağıran sayfaya göre değişiyor. |
| `assets/{css,js}/sa-gozetim.*` (**30/18 sayfa**) | Antrenör panelinin gözetim köprüsü | dyt · mekan panelleri | Yüksek |
| `profil-v1.html` (4951 sat.) | Antrenör public profili (`?role=antrenor&view=public`) — dizinin **gerçek** hedefi | Gastro üye profili · diyetisyen · işletme rolleri, 14 `data-tab` | **Yüksek.** `lessons.md`'deki C2-1a/1b dersleri tam bu dosyada yaşandı: rol sızması (`?auth=1`'de diyetisyen rolü kalması) ve OWN↔PUBLIC CTA gate'i. Fit için sekme eklenirse 3 rolün gate'i yeniden test edilmeli. |
| `giris-v1` · `hesabim-v1` · `bildirimler-v1` · `rozetler-v1` · `onboarding-v1` · `pro-v1` · `pro-odeme-v1` · `uye-abonelik-odeme-v1` | "Fit Planım" kurulursa hesap menüsü ve rozet/challenge bağı buradan geçer | 5 markanın tamamı (`rozetler-v1`'e 132 dosyadan link) | **Orta-Yüksek.** `rozetler-v1` Gastro şef kademesi; Fit rozetleri eklenirse Gastro'nun kurgusuna dokunulur. |
| `hakkimizda-v1` · `sss-v1` · `iletisim-v1` · `reklam-ver-v1` · `yasal-v1` | Belge §3.3 footer kalemleri (Kullanım Koşulları, Gizlilik, Sağlık Bilgilendirmesi) | tüm markalar | **Orta.** `yasal-v1` tek dosyada `?metin=` ile 3+ metin taşıyor; yeni "Sağlık Bilgilendirmesi" metni eklemek 5 markanın yasal sayfasını değiştirir. |
| `tarif-ekle-v1` · `puf-noktasi-ekle-v1` · `mutfak-defteri-v1` | Belge §3.3: bu Gastro aksiyonları Fit hesap menüsünden **çıkarılmalı** | Gastro | **Orta.** Şu an **21/21 Fit sayfasının** hesap dropdown'ı ve drawer'ında duruyorlar. Kaldırmak Fit'in 21 dosyasında yerel; ama aynı blok 140 dosyada tekrar ettiği için "sadece Fit'ten kaldır" ayrımı elle yapılmalı — global sweep Gastro'yu da bozar. |
| `_shell.html` (1679 sat.) | Yeni Fit sayfaları buradan türetilecek | tüm markalar | **Düşük** (canlı değil) ama **gizli borç**: 15. oturumda footer yasal şeridi 137 sayfadan söküldü, `_shell.html` kapsam dışı bırakıldı → şablonda şerit hâlâ duruyor. Yeni sayfa türetilirse eski şerit geri gelir. |
| `anasayfa-portal-v3a.html` (243 KB) | Fit'e giriş kapısı | portal | Orta — `lessons.md` bu dosyayı "divergent, sweep'e sokulmaz" diye işaretliyor. |

**Ayrıca:** `sezon-v1.html` şu an Beyar'ın unstaged işi (memory kuralı: toplu yayılımlarda otomatik exclude). Fit turu bu dosyaya dokunmuyor ama ortak kabuk sweep'i planlanırsa exclude listesine yazılmalı.

---

# 10 · GÖZLEMİM — hangi iş hangisinden önce

> Bu bölüm ölçüm değil, yorumdur. Yukarıdaki sayılara dayanır ama karar senindir.

## Sıra önerim

**0 — Yayın hijyeni (kod işinden ÖNCE, ayrı ve kısa tur).**
Neden önce: 205 iç belge canlıda 200 dönüyor; içlerinde `lessons.md`'nin kriz anlatımları, `master-plan`, `brand-tokens`, kurumsal PDF ve bu turun kaynak belgesinin kardeşi `fit-ek.md` var. Bu, yapılacak her commit'le büyüyen bir yüzey — Fit turu 21+ dosyaya dokunacak ve yeni rapor/QA betiği üretecek. Temizlik ne kadar geç yapılırsa geçmişten silinmesi gereken hacim o kadar büyür. Kod işine girmeden, tek turda kapatılmalı. (Sen zaten "bir sonraki turun konusu" dedin — sıralamada başa koymamın sebebi bu.)

**1 — Kabuk tek kaynağa alınmalı (Faz 1'in ÖN ŞARTI).**
Belge §17 Faz 1'i "ana menü 4 başlık + merkez sayfalar" diye tanımlıyor. Ama bugün ana menüye tek kalem eklemek **21 dosya, 63 ekleme noktası**; menüyü 6→4'e indirip mega menü kurmak dört ayrı navigasyon katmanını (nav, drawer, footer kolonu, bottom-nav) 21 dosyada elden geçirmek demek. Bunu satır içi kopya kabukla yapmak, `lessons.md`'de kayıtlı iki ayrı krizin (region-swap'in 308 satır CSS yutması; greedy regex'in 18 dosyadan −174 satır silmesi) tam koşullarını yeniden kurar. Süper admin tarafında doğru cevap zaten var: `sa-shell.js`'te menü **tek dizide**, bir kalem = bir satır. Fit public kabuğu aynı modele alınmadan menü revizyonuna girilmemeli. Ölçülen kazanç: Fit'te 9.021 satır kabuk (%19,7), site genelinde 68.569 satır.

**2 — Fit Planım kabuğu (Faz 2).**
Belgenin en büyük boşluğu ve en yüksek getirili işi: 10 alt sayfanın 9'u sıfırdan. Ama **1'den sonra** yapılmalı, çünkü Fit Planım tanımı gereği yeni bir alt-menü kabuğu — bugünkü kopya rejimine bir kabuk daha eklemek borcu ikiye katlar. Ayrıca Enerji Defteri'ni buraya taşımak ana menüyü 6→5'e indirir, yani 1'deki menü işiyle aynı dosyalara dokunur; ikisini ayrı turlara bölmek aynı 21 dosyayı iki kez açmak demek.

**3 — Kimlik/slug altyapısı (§13, §18/8) — 4 ve 5'ten ÖNCE.**
Bugün her egzersiz kartı aynı `egzersiz-detay-v1`'i, her program kartı aynı `program-detay-v1`'i, üç challenge kartından ikisi ölü hedefi açıyor. Challenge Merkezi (§8.4) ve Programlar Merkezi (§8.1) kurulsa bile arkasında tekil detay olmadığı için boş vitrin olur. Kabul kriteri "Her kart doğru ve benzersiz detay sayfasını açar" (§19) bu iş yapılmadan hiçbir merkez sayfasında sağlanamaz.

**4 — Merkez sayfalar + sihirbaz (Hareket Merkezi, Programlar Merkezi, Challenge Merkezi, Bana Uygun Başlangıcı Bul).**
Belge §17'de Faz 1 diyor; ben 3'ten sonraya alıyorum çünkü dördü de "kart → detay" mantığına dayanıyor.

**5 — Antrenör dublikasyonunun çözümü.**
`antrenor-detay-v1.html` (2185 satır) yetim; dizin `profil-v1`'e gidiyor. Hangisinin kalacağı bir **karar**, iş değil — ve bu karar verilmeden §10.2'nin eksik alanları (fiyat, iptal koşulları, uygunluk takvimi, slug) hangi dosyaya yazılacağı belirsiz. Randevu yaşam döngüsü (§11) de bu kararı bekliyor. Karar 1'den önce alınabilir ama uygulaması 3'ten sonra.

**6 — Sağlık/güvenlik/erişilebilirlik katmanı (§14) ve terim standardı (§16).**
Ölçülen: sağlık uyarısı 21 Fit sayfasının 4'ünde; "Sağlık Bilgilendirmesi" sayfası yok; footer'da Kullanım Koşulları/Gizlilik kalemi yok. Bunlar dağınık küçük işler ve kabuk tek kaynağa alındıktan sonra **tek yerden** halledilir — şimdi yapılırsa 21 dosyaya tek tek yazılır.

## Sırayı belirleyen tek cümle

Belge içerik eksiğini anlatıyor; ölçüm ise **eksiğin nereye yazılacağı yerin** hazır olmadığını gösteriyor. Menü 4 başlığa inecekse önce menünün tek bir yerde durması; kartlar doğru detayı açacaksa önce detayın çoğullaşabilmesi gerekiyor. Kabuk ve kimlik altyapısı yapılmadan atılan her adım 21 dosyada tekrarlanır ve bir sonraki turda geri sökülür.

## Bilinen sınırlamalar (bu rapor için)

- Banner oranları **900 px sabit viewport** yüksekliğine göre; gerçek cihazlarda oran değişir.
- Konsol/ağ ölçümü **yerel sunucuda** yapıldı; `assets/video/dadafit-hero.mp4` gitignore'lı olduğu için canlıda `dadafit-hub-v1` ve `enerji-defteri-v1`'de video 404'ü beklenir — bunu ölçemedim.
- "Menüden erişilebilir" sütunu **statik `href`** taramasına dayanır; `onclick` ile gidilen hedefler ayrıca işaretlendi (`arama-fit-v1`).
- `program-liste-v1.html`'de topbar işaret yorumu farklı olduğu için topbar satır sayısı 20/21 dosyada ölçüldü; barın kendisi 21/21'de mevcut (`brand-switch` doğrulandı).
- Aile ataması **kanıt tabanlı**; bir dosyanın "bilinçli mi atık mı" olduğu ölçülemez — bu yüzden 2 dosya BELİRSİZ kümesinde (§1.4) ve senin kararını bekliyor.
