# Süper-Admin Entegrasyon — Envanter Taraması

> Salt tespit. Kod/değişiklik YOK. Kaynak: `v6/*.html` (138 dosya, top-level).
> Tarih: 2026-06-20. Yöntem: chrome imza taraması (`pnl-side` = orijinal operatör
> paneli · `sa-rail` = wave-1 süper-admin ekranı) + içerik derinliği (ptable/kpi/
> özel markup) + başlık. `arsiv/`, `outputs/`, `.ss-*` hariç.

## 1. Sınıflandırma özeti (138 dosya)

| Sınıf | Adet | Not |
|---|---|---|
| **DOLU YÖNETİM EKRANI** | **29** | gerçek tablo/form/liste/menü/takvim — bir şeyi yönetir |
| PUBLIC / ÖN-YÜZ | 94 | ziyaretçi + üye ön-yüzü (tarif, dizin, hesabım, sepet, hesaplayıcı vb.) |
| SHELL / DENEME / REFERANS | 13 | kabuk, şablon, ref-* ilham, dizin, scratch |
| STUB / REDIRECT | 2 | `mekan-liste` (Keşfet'e taşındı), `hesaplayici` (hub yönlendirme) |

DOLU yönetim ekranları **İKİ KATMAN** halinde:
- **A — Orijinal operatör panelleri** (`pnl-side`, koyu tek-sidebar): operatörün KENDİ paneli.
- **B — Wave-1 süper-admin ekranları** (`sa-rail`, eski çift-sidebar): admin GÖZETİM ekranları.

---

## 2. DOLU yönetim ekranları — bölüme göre

### KATMAN A — Orijinal operatör panelleri (11 ekran, `pnl-side`)

| Bölüm | Dosya | İçerik | Durum |
|---|---|---|---|
| **Admin** | `admin-rozet-v1.html` | Rozet Yönetimi (+ iç sekmeler: İşletmeler, Abonelikler) · 4 tablo | DOLU |
| **Sağlık** | `dyt-randevular-v1.html` | Haftalık/günlük randevu takvimi + detay drawer | DOLU |
| Sağlık | `dyt-danisanlar-v1.html` | Danışan listesi (2 tablo) + profil | DOLU |
| Sağlık | `dyt-receteler-v1.html` | Reçete listesi/kartları | DOLU |
| Sağlık | `dyt-recete-builder-v1.html` | Reçete oluşturucu (sürükle/öğün) | DOLU |
| Sağlık | `dyt-mesajlar-v1.html` | Mesajlaşma arayüzü (`msg-wrap`) | DOLU |
| Sağlık | `dyt-profil-ayar-v1.html` | Profil + Ayarlar + Takvim sekmeleri | DOLU |
| **İşletme** | `mekan-panel-v1.html` | Mekân paneli genel bakış | DOLU |
| İşletme | `mekan-rezervasyonlar-v1.html` | Rezervasyon yönetimi | DOLU |
| İşletme | `mekan-menu-v1.html` | Menü yönetimi | DOLU |
| İşletme | `mekan-ayarlar-v1.html` | Müsaitlik & işletme profili (set-grid/cap-card/galeri) | DOLU |

### KATMAN B — Wave-1 süper-admin gözetim ekranları (18 ekran, `sa-rail`)

> Eski (reddedilen) çift-sidebar kabuğunu kullanıyorlar. UI dolu; CRUD genelde
> pasif-stub (admin-rozet ile aynı mantık). Komut: `a2e8f2e`.

| Bölüm | Dashboard | Flagship modül (+form/detay) |
|---|---|---|
| **Admin** | `sa-admin.html` | `sa-admin-kullanicilar.html` + `-form` + `-detay` (Kullanıcılar & Yetki) |
| **Sağlık** | `sa-saglik.html` | `sa-saglik-diyetisyenler.html` + `-detay` (Diyetisyen gözetimi) |
| **DadaStore** | `sa-store.html` | `sa-store-urunler.html` + `-form` + `-detay` (Ürünler) |
| **DadaFit** | `sa-dadafit.html` | `sa-dadafit-challenge.html` + `-form` + `-detay` (Challenge'lar) |
| **İşletme** | `sa-isletme.html` | `sa-isletme-isletmeler.html` + `-detay` (İşletme gözetimi) |

---

## 3. SHELL / DENEME / STUB

- **Shell/şablon:** `sa-shell.html` (yeni onaylı çift-sidebar kabuk) · `sa-giris-v1.html`
  (rol seçici giriş) · `panel-shell.html` (operatör-paneli KANONİK şablon iskeleti) ·
  `_shell.html` (eski monolit scratch) · `dizin.html` (mockup dizini).
- **Referans (ilham, bizim ekran değil):** `ref-food52 / ref-graza / ref-mob / ref-nyt /
  ref-ourplace / ref-refika / ref-sakara` (7).
- **Scratch:** `_overflow_probe.html`.
- **Stub/redirect:** `mekan-liste-v1.html` (→ Keşfet) · `hesaplayici-v1.html` (hub yönlendirme).

---

## 4. "Bilinen liste" ile karşılaştırma

| Bilinen liste (brief) | Projede gerçek durum |
|---|---|
| Admin → `admin-rozet` (1) | ✅ var, ama Admin'in TEK modülü (sadece Rozet + iç İşletme/Abonelik sekmeleri). Wave-1 ayrıca `sa-admin-kullanicilar` (Users) ekledi. |
| Sağlık → `dyt-*` (6) | ✅ 6'sı da DOLU. ANCAK wave-1 ayrı bir Sağlık katmanı kurmuş: `sa-saglik-diyetisyenler` (gözetim). |
| İşletme → `mekan-*` (4) | ✅ 4'ü de DOLU. ANCAK wave-1 ayrı: `sa-isletme-isletmeler` (gözetim). |
| Store → (listede YOK) | ⚠️ Orijinal admin paneli YOK; tek yönetim ekranı wave-1 `sa-store-urunler`. Public taraf: `urun-liste/urun-detay/dada-shop/sepet/odeme`. |
| DadaFit → (listede YOK) | ⚠️ Orijinal admin paneli YOK; tek yönetim ekranı wave-1 `sa-dadafit-challenge`. Public taraf: `dadafit-hub/antrenor*/egzersiz*/program*`. |

---

## 5. EKSİK / FAZLA — net bulgular

### FAZLA (listede var ama aslında stub) → **YOK**
Bilinen listedeki 11 ekranın (admin-rozet + dyt×6 + mekan×4) hepsi gerçekten DOLU.
Hiçbiri boş/stub değil.

### EKSİK (projede dolu ama bilinen listede yok)
1. **Tüm wave-1 süper-admin seti (18 ekran)** listede hiç yok: `sa-admin*`, `sa-saglik*`,
   `sa-store*`, `sa-dadafit*`, `sa-isletme*`. Bunlar DOLU yönetim ekranı.
2. **Store ve DadaFit bölümleri listede tamamen yok** — oysa tek yönetim ekranları
   bu bölümlerde wave-1'de mevcut (`sa-store-urunler`, `sa-dadafit-challenge`). Bu iki
   bölümün orijinal operatör paneli HİÇ yok; entegrasyon kaynağı sadece wave-1.
3. **Admin eksik** — bilinen liste yalnız `admin-rozet`'i sayıyor; Admin'in menüsünde
   ~10 modül var (Tarifler/Şefler/Kademeler/Fiyatlandırma/Slider/Sayfalar-SEO/Menü/
   Ayarlar/Raporlar) bunların DOLU ekranı YOK (yalnız Rozet + Users yapılmış).

### ⚠️ KRİTİK ÇELİŞKİ — iki panel katmanı, aynı bölüm adı
Sağlık ve İşletme'de **iki ayrı ekran ailesi** var, farklı rol/amaç:
- **Operatör paneli** (kişinin KENDİ paneli): `dyt-*` = bir diyetisyenin kendi
  randevu/danışan/reçetesi · `mekan-*` = bir mekân sahibinin kendi rezervasyon/menüsü.
- **Süper-admin gözetimi** (tüm operatörleri yöneten): `sa-saglik-diyetisyenler`
  (tüm diyetisyenler listesi/onayı) · `sa-isletme-isletmeler` (tüm işletmeler).

Brief "Sağlık → dyt-*" ve "İşletme → mekan-*" diyor (operatör paneli). Ama wave-1
gözetim ekranları da var. **Entegrasyon planı netleştirmeli:** süper-admin "Sağlık"a
girince OPERATÖR panelini mi (dyt-*) yoksa GÖZETİM ekranını mı (sa-saglik-*) görmeli —
yoksa ikisi ayrı rol mü (süper-admin=gözetim, diyetisyen=kendi dyt paneli)?

---

## 6. Entegrasyon için öneri (özet — onay bekler)
- **Operatör panelleri (dyt-*, mekan-*)** kendi rolünün (diyetisyen/mekân sahibi)
  girişine ait → bunlar zaten kendi tek-sidebar diliyle bütün; süper-admin kabuğuna
  giydirmek opsiyonel.
- **Süper-admin bölümleri** asıl wave-1 gözetim ekranlarından (`sa-*`) beslenmeli —
  bunlar zaten süper-admin mantığında; tek iş ESKİ çift-sidebar'dan YENİ onaylı
  `sa-shell` kabuğuna taşımak.
- Store/DadaFit'te operatör paneli olmadığından bu bölümler salt wave-1 `sa-*`
  ekranlarıyla yürür.

> Bu rapor karar vermez; sadece envanteri ve çelişkiyi ortaya koyar. Bir sonraki adım:
> entegrasyon planında "operatör vs gözetim" sorusunun yanıtı + bölüm-ekran kesin eşleşmesi.
