# Faz 2 — Eksik Modül Envanteri (READ-ONLY)

> Salt tespit + öneri. **Kod/değişiklik/commit YOK.** Kaynak: `v5/assets/js/sa-shell.js`
> (`SECTIONS` config) + wave-1 dolu `sa-*` ekranları + operatör panelleri (`dyt-*`/`mekan-*`).
> Tarih: 2026-06-20. Referans plan: `tasks/sa-entegrasyon-plan.md` §3, §6.

---

## 0. ÖZET

- **"Yakında" pasif gözetim modülü: 26** (Admin 9 · Sağlık 4 · Store 6 · DadaFit 3 · İşletme 4).
- **+ Akademi** = tüm bölüm kilitli (içerik bankası — Faz 2 **dışı**, sonraki sürüm).
- **+ Antrenör operatör paneli** = SIFIRDAN (henüz 0 ekran; `sa-giris` operatör sekmesinde kilitli "Yakında").
- Her dolu gözetim modülü 2 veya 3 dosya: **liste (+ form) + detay**. Kabuk tek kaynak (`sa-shell.css/js`);
  yeni modül = içerik dosyası + `SECTIONS` config satırı (`soon:true` → `href`+`screen`).

---

## 1. "YAKINDA" PASİF MODÜLLER — bölüm bölüm

Kaynak: `sa-shell.js` `SECTIONS` (`soon:true` taşıyan item'ler). Aktif/dolu olanlar referans için.

### Admin · `sa-admin.html` (aksan: domates `#e14827`)
DOLU: Genel Bakış · Kullanıcılar & Yetki · Rozetler · Abonelikler · İşletme Başvuruları (`admin-rozet` hash).
**Eksik (9 — "Faz 2 · Yakında" seclbl altında):**
| # | Modül | İkon |
|---|---|---|
| 1 | Tarifler | `fa-book-open` |
| 2 | Şefler | `fa-user-tie` |
| 3 | Kademeler | `fa-ranking-star` |
| 4 | Fiyatlandırma | `fa-tags` |
| 5 | Slider / Banner | `fa-images` |
| 6 | Sayfalar & SEO | `fa-file-lines` |
| 7 | Menü / Navigasyon | `fa-bars-staggered` |
| 8 | Ayarlar | `fa-sliders` |
| 9 | Raporlar | `fa-chart-line` |

### Sağlık · `sa-saglik.html` (aksan: nane `#6cca98`/`#3BB77E`)
DOLU: Genel Bakış · Diyetisyenler (liste+detay).
**Eksik (4 — inline `soon:true`, gözetim açısı):**
| # | Modül | İkon |
|---|---|---|
| 1 | Randevular | `fa-calendar-check` |
| 2 | Reçeteler | `fa-clipboard-list` |
| 3 | Testler | `fa-vial` |
| 4 | Hesaplayıcılar | `fa-calculator` |

> Not: bunlar **gözetim** (tüm operatörler genelinde) — operatörün kendi `dyt-receteler`/`dyt-randevular`
> paneliyle KARIŞTIRILMAZ. Faz 3 "Panelini Aç" köprüsü ayrı.

### DadaStore · `sa-store.html` (aksan: domates `#e14827`)
DOLU: Genel Bakış · Ürünler (liste+form+detay — **flagship referans**).
**Eksik (6):**
| # | Modül | İkon |
|---|---|---|
| 1 | Kategoriler | `fa-layer-group` |
| 2 | Siparişler | `fa-receipt` |
| 3 | Müşteriler | `fa-user-group` |
| 4 | Promosyonlar | `fa-percent` |
| 5 | Kargo & Ödeme | `fa-truck` |
| 6 | Raporlar | `fa-chart-line` |

### DadaFit · `sa-dadafit.html` (aksan: kurumsal yeşil `#009d4f`)
DOLU: Genel Bakış · Challenge'lar (liste+form+detay).
**Eksik (3):**
| # | Modül | İkon |
|---|---|---|
| 1 | Antrenörler | `fa-user-ninja` |
| 2 | Egzersizler | `fa-dumbbell` |
| 3 | Programlar | `fa-list-check` |

### İşletmeler · `sa-isletme.html` (aksan: petrol `#006072`)
DOLU: Genel Bakış · İşletmeler (liste+detay).
**Eksik (4):**
| # | Modül | İkon |
|---|---|---|
| 1 | Rezervasyonlar | `fa-calendar-day` |
| 2 | Menüler | `fa-utensils` |
| 3 | Onaylar | `fa-circle-check` |
| 4 | Reklam Paketleri | `fa-rectangle-ad` |

### Akademi — **Faz 2 dışı**
`SECTIONS.akademi = { locked:true, menu:[] }`. Rail ikonu `is-locked`, içerik bankası (tarif/sözlük/
püf noktaları/ramazan menüleri) → **sonraki sürüm**. Faz 2'de DOKUNMA.

---

## 2. REFERANS PATTERN (mevcut dolu modüller)

### 2.1 Tam modül = 3 dosya (liste + form + detay)
**Referans flagship'ler:** `sa-store-urunler` · `sa-admin-kullanicilar` · `sa-dadafit-challenge`
(her biri `.html` + `-form.html` + `-detay.html`).
**2 dosyalı (form yok, salt gözetim):** `sa-saglik-diyetisyenler` · `sa-isletme-isletmeler` (`.html` + `-detay.html`).

### 2.2 Kabuk = tek kaynak (her dosyada birebir iskelet)
- `assets/css/sa-shell.css` — kabuk + ortak panel sözlüğü.
- `assets/js/sa-shell.js` — config-driven chrome (`SECTIONS`/`ROLES`, rail + 2. sidebar render,
  `body[data-sec][data-screen]`'e göre aktif state, divider/burger/hesap çipi). İçeriği RENDER ETMEZ.
- `assets/js/sa-ui.js` + `sa-ui.css` — `saConfirm`/`saToast`/dropdown/yıkıcı-aksiyon capture-handler. Inline kopya YASAK.
- Her ekran dosyası iskeleti:
  ```
  <body data-sec=… data-screen=…>
    <aside class="sa-rail" id="saRail"> …rail markup (birebir)… </aside>
    <nav class="sa-menu" id="saMenu"></nav>      ← JS doldurur
    <div class="sa-divider" id="saDivider">…</div>
    <header class="pnl-top"> …search + bell + pnl-me… </header>
    <main class="pnl-main" id="saMain"> …STATİK İÇERİK… </main>
    <style> /* yalnız bu ekranın içerik CSS'i */ </style>
    <script src="assets/js/sa-shell.js"></script>
    <script> /* sayfa-özel filtre/arama */ </script>
  ```
- **Yeni modül bağlama:** `SECTIONS.<bölüm>.menu` içinde ilgili item'in `soon:true`'su silinir →
  `href:'sa-<bölüm>-<modül>.html'` + `screen:'<modül>'` eklenir (gerekirse `cnt`). "Faz 2 · Yakında"
  seclbl'ından çıkarılır.

### 2.3 LİSTE pattern (`sa-store-urunler.html` kanonu)
1. `pnl-page-head` → `<h1>` + `.ph-sub` (sayaç/özet) + `.ph-actions` (`btn-ghost` Dışa Aktar + `btn-acc` Yeni X).
2. `.filter-bar` → `.filter-search` (ikonlu input) + `.chips` (`.chip.is-on` filtre).
3. `.pnl-card > .pc-body.flush > table.ptable`:
   - satır hücresi: `.prod-cell` (thumb `div+background-image` + ad + alt-id) — **Kerem Bey pattern'ı**.
   - durum: `.pstat` (`.ok`/`.warm`/`.off`).
   - `.row-actions` → `.act-btn` Düzenle (pen→form) · Görüntüle (eye→detay) · **`.danger` Sil** (saConfirm onaylı).
4. `.table-foot` → sayaç + `.tpager` (sayfalama).
5. Sayfa-özel JS: chip filtre + arama (`row.style.display`).

### 2.4 FORM pattern (`sa-store-urunler-form.html` kanonu)
- `.form-layout` = 2 kolon.
- **Sol:** `.form-sec` blokları (`.form-sec-tt` ikon+başlık + `.form-grid` > `.fld`). Ör: Temel Bilgiler · Fiyat&Stok · Varyasyonlar · Görseller.
- **Sol alt:** `.form-actions` → İptal (`btn-ghost`→liste) · Taslak Kaydet · Yayınla (`btn-acc`).
- **Sağ:** `.pnl-card` sidebar (Yayın Durumu · Kargo&Vergi · Etiketler).

### 2.5 DETAY pattern (`sa-store-urunler-detay.html` kanonu)
- `pnl-page-head` → `<h1>` + `.pstat` durum + `.ph-actions` (Düzenle→form · `--tomato` Sil).
- **Sol:** içerik `.pnl-card`'ları (Açıklama · alt-tablo · Son Hareketler/Satışlar).
- **Sağ:** meta `.pnl-card`'ları (Bilgiler `.meta-row` `mr-lbl`/`mr-val` · İstatistik · Hızlı Aksiyonlar `btn` listesi).

---

## 3. HER EKSİK MODÜL İÇİN TAHMİNİ EKRAN

Mantık: **yönetilen-varlık (CRUD)** = liste+form+detay · **gözetim (oku+onay/askı)** = liste+detay (form yok) ·
**config/ayar** = tek form (veya liste+form) · **rapor** = tek dashboard.

### Admin (9)
| Modül | Ekran | Gerekçe |
|---|---|---|
| Tarifler | **liste + detay** (+ ops. form) | Kullanıcı-katkılı içerik moderasyonu → onay/gizle/öne çıkar; `sa-store-urunler` benzeri tablo + içerik detayı |
| Şefler | **liste + detay + form** | Şef dizini CRUD (profil/rozet/doğrulama) |
| Kademeler | **liste + form** | Seviye/rank tanımı (eşik+ödül) — config CRUD |
| Fiyatlandırma | **liste + form** | Abonelik/plan tanımları (Pro 1/Pro 2) — config CRUD |
| Slider / Banner | **liste + form** | Görsel slot CRUD (`div+background-image`); liste sıralı, form yükleme |
| Sayfalar & SEO | **liste + form** | Statik sayfa + meta editör |
| Menü / Navigasyon | **tek builder ekranı** | Nav ağacı tek düzenleyici (liste/detay ayrımı yok) |
| Ayarlar | **tek form (sekmeli)** | Genel/marka/entegrasyon ayarları — `dyt-profil-ayar` sekme deseni |
| Raporlar | **tek dashboard** | KPI + grafik + tablo; `kpi-grid` + `pnl-card` (liste DEĞİL) |

### Sağlık (4 — gözetim açısı)
| Modül | Ekran | Gerekçe |
|---|---|---|
| Randevular | **liste (+takvim) + detay** | Tüm randevu gözetimi; `dyt-randevular` takvimini gözetim açısıyla yansıt |
| Reçeteler | **liste + detay** | Reçete gözetimi (oku); operatör `dyt-recete-builder` AYRI (Faz 3 köprü) |
| Testler | **liste + detay** | Test/tahlil kayıt gözetimi |
| Hesaplayıcılar | **liste + form** | Hangi hesaplayıcılar aktif/parametre — config |

### Store (6)
| Modül | Ekran | Gerekçe |
|---|---|---|
| Kategoriler | **liste + form** | Kategori ağacı CRUD |
| Siparişler | **liste + detay** | Sipariş gözetimi + durum güncelle; ürün gibi form yok |
| Müşteriler | **liste + detay** | Müşteri kayıt + sipariş geçmişi (read) |
| Promosyonlar | **liste + form** (+ ops. detay) | Kampanya/kupon CRUD |
| Kargo & Ödeme | **liste + form** | Kargo bölgesi/ödeme yöntemi config |
| Raporlar | **tek dashboard** | Satış/gelir KPI |

### DadaFit (3)
| Modül | Ekran | Gerekçe |
|---|---|---|
| Antrenörler | **liste + detay** | `sa-saglik-diyetisyenler` ikizi — operatör onay/askı gözetimi (form yok) |
| Egzersizler | **liste + form + detay** | Egzersiz bankası CRUD; `egzersiz-kutuphane`/`egzersiz-detay` public eşi |
| Programlar | **liste + form + detay** | Antrenman programı CRUD; `program-liste`/`program-detay` public eşi |

### İşletme (4)
| Modül | Ekran | Gerekçe |
|---|---|---|
| Rezervasyonlar | **liste + detay** | Tüm rezervasyon gözetimi (operatör `mekan-rezervasyonlar` AYRI) |
| Menüler | **liste + detay** | Mekân menü gözetimi/onayı |
| Onaylar | **liste + detay** | Belge/başvuru onay kuyruğu — `admin-rozet` İşletme Başvuruları ile örtüşme NOTU (§ planda birleştirme değerlendirilecek) |
| Reklam Paketleri | **liste + form** | Reklam paketi/slot CRUD |

**Kaba ekran toplamı (Akademi + antrenör operatör hariç):** ~26 modül × ort. 2.3 ekran ≈ **55–60 statik dosya**.

---

## 4. ANTRENÖR OPERATÖR PANELİ (SIFIRDAN)

### Mevcut durum
- **Hiç yok.** `sa-giris-v1.html` operatör sekmesinde Antrenör kartı `.role.is-locked` →
  "DadaFit operatör paneli hazırlanıyor · 🔒 Yakında" (`mekan-*`/`dyt-*` aktif, antrenör kilitli).
- Operatör paneli ailesi: **diyetisyen `dyt-*` (6)** + **mekân `mekan-*` (4)** DOLU; **antrenör = 0**.

### Pattern (operatör ≠ gözetim — ayrı dil)
Operatör paneli **TEK koyu sidebar** (`pnl-side` + `pnl-nav` > `pnl-link`), `sa-shell` çift-sidebar kabuğu
GELMEZ. Kanonik iskelet: `panel-shell.html`. Üst bar globe + bell, sol-alt `sa-sig` (Gavia g), `saConfirm`/`saToast`
paylaşılan primitifleri (operatörler de yükler). Aksan = **DadaFit kurumsal yeşil `#009d4f`** (operatör yeşil
token override; diyetisyen nanesinden koyu/doygun → ayrışır).

### Antrenöre uyarlama (dyt 6 + mekan 4 deseninden)
Önerilen `pnl-nav` (public `antrenor-*`/`program-*`/`egzersiz-*` domeninden beslenir):
| Nav item | İkon | Dosya (öneri) | Eşlendiği operatör deseni |
|---|---|---|---|
| Panel | `fa-gauge-high` | `antrenor-panel-v1.html` | `mekan-panel` / panel-shell |
| Üyelerim / Danışanlar | `fa-user-group` | `antrenor-uyeler-v1.html` | `dyt-danisanlar` |
| Programlar | `fa-list-check` | `antrenor-programlar-v1.html` (+ builder) | `dyt-receteler` + `dyt-recete-builder` |
| Egzersiz Kütüphanesi | `fa-dumbbell` | `antrenor-egzersizler-v1.html` | `mekan-menu` (kütüphane/katalog) |
| Challenge'larım | `fa-trophy` | `antrenor-challenge-v1.html` | (DadaFit operatör eşi) |
| Mesajlar | `fa-comment-dots` | `antrenor-mesajlar-v1.html` | `dyt-mesajlar` |
| Profil & Ayarlar | `fa-id-badge` | `antrenor-profil-ayar-v1.html` | `dyt-profil-ayar` (sekmeli) |

**Faz 2 minimum (dyt paritesi):** panel + programlar(+builder) + üyeler + mesajlar + profil-ayar ≈ **5–6 ekran**
(challenge/egzersiz ikinci dalga). `sa-giris` operatör kartının kilidi açılır + `antrenor-panel`'e bağlanır.

> **Tek kaynak garantisi:** Antrenör operatör paneli, Faz 3'te süper-admin "Panelini Aç → Antrenör" köprüsünün
> de besleyeceği AYNI dosyalar olacak — ikinci kez yazılmaz.

---

## 5. ÖNERİLEN PARALEL DALGA BÖLÜMÜ (domain = dosya ayrımı)

Paylaşılan `sa-shell.*`/`sa-ui.*`'ye paralelde DOKUNULMAZ (tek author, foundation). `SECTIONS` config
değişikliği tek dosyada → sıralı/lead tarafından (çakışma riski). Her dalga bağımsız dosya kümesi:

| Dalga | Kapsam | Dosya öneki |
|---|---|---|
| **A** | Admin içerik 9 modül | `sa-admin-*` |
| **B** | Store 6 modül | `sa-store-*` |
| **C** | Sağlık 4 + İşletme 4 gözetim | `sa-saglik-*` / `sa-isletme-*` |
| **D** | DadaFit gözetim 3 modül | `sa-dadafit-*` |
| **E** | Antrenör operatör paneli (ayrı rol/dil, yeşil) | `antrenor-*` |

Her modül için ekran tipleri §3/§4'te. `SECTIONS` `soon:true→href` güncellemeleri lead'de toplanır.

---

## 6. AÇIK NOTLAR / KARARA TAŞINACAK

1. **Onaylar ↔ İşletme Başvuruları örtüşmesi:** `admin-rozet#isletmeler` (başvuru/onay) ile İşletme→Onaylar
   aynı veriyi farklı girişten gösteriyor. Faz 2'de tek modülde birleştirme mi, iki giriş mi? (plan §3 dipnotu açık bıraktı).
2. **Raporlar 3 yerde** (Admin/Store + global dash): ortak rapor bileşeni mi, bölüm-özel mi?
3. **Tarifler form'u:** kullanıcı-katkılı içerik → admin "düzenle"si tam CRUD mu yoksa salt moderasyon (onay/gizle) mu? Form gereksinimini belirler.
4. **Akademi** Faz 2 dışı — teyit.

---

*Bu rapor karar vermez; envanter + pattern + ekran tahmini + dalga önerisi sunar. İmplement/commit YOK.*
