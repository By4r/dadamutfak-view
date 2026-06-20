# Süper-Admin Entegrasyon Planı

> Salt plan. Kod/değişiklik/commit YOK. Kaynak envanter: `tasks/sa-envanter-tarama.md`.
> Onaylı kabuk: `v5/sa-shell.html` (çift-sidebar: ikon-rail + koyu 2. menü + açık içerik).
> Tarih: 2026-06-20.

---

## 1. MİMARİ KARAR (KİLİTLİ)

- **Süper-admin ana paneli = GÖZETİM ekranları** (wave-1 `sa-*` + `admin-rozet`).
  Patronun işi filoyu yönetmek: tüm diyetisyen/işletme/ürün/challenge listeleri +
  onay/askı/düzenle.
- **Operatör panelleri (`dyt-*`, `mekan-*`) KOPYALANMAZ.** Ayrı rol, tek kaynak.
  İki kaynak zamanla birbirinden kayar → tek kaynak ilkesi.
- **Operatöre erişim = "Panelini Aç" köprüsü** (impersonation / o operatörün gözünden),
  gözetim **detay** ekranından başlatılır → **Faz 3**. Varsayılan görünüm her zaman gözetim.

---

## 2. ROL KATMANLARI ve `sa-giris` (üç katmanlı kapı)

`sa-giris-v1.html` üç giriş yolu sunar (demo; gerçek auth Laravel fazı):

| Katman | Hedef | Kapsam |
|---|---|---|
| **Süper Admin** | `sa-shell` — tüm bölümler | Admin · Sağlık · Store · DadaFit · İşletme (+ Akademi kilitli) |
| **Bölüm Yöneticisi** | `sa-shell` — bölüm-kısıtlı | Yalnız kendi bölümü (rail tek ikon, switch yok) |
| **Operatör olarak gir** (demo) | operatörün KENDİ paneli | Diyetisyen→`dyt-*` · Mekân→`mekan-*` · Antrenör→**kilitli "yakında"** |

- Operatör girişleri mevcut `dyt-*`/`mekan-*` panellerine **olduğu gibi** yönlendirir
  (dokunulmaz). Antrenör operatör paneli henüz yok → kilitli "yakında" (Faz 2).
- **Tek kaynak garantisi:** Operatör girişi + süper-admin'in "Panelini Aç" köprüsü
  **aynı** `dyt-*`/`mekan-*` dosyalarını besler. Operatör paneli hiçbir yerde
  ikinci kez yazılmaz.
- `sa-giris` mevcut koyu dili korur (krem yok); 3. katman için yeni bir "Operatör" grubu
  eklenir (diyetisyen/mekân aktif, antrenör kilitli rozet).

---

## 3. BÖLÜM–EKRAN KESİN EŞLEŞMESİ

Gözetim kaynağı = wave-1 `sa-*` + `admin-rozet`. Her bölüm 2. sidebar menüsü:

### Admin
| 2. sidebar item | Kaynak ekran | Durum |
|---|---|---|
| Genel Bakış | `sa-admin.html` | var |
| Kullanıcılar & Yetki | `sa-admin-kullanicilar.html` (+`-form`,+`-detay`) | var |
| Rozetler | `admin-rozet-v1.html` (`#rozet`) | var |
| Abonelikler | `admin-rozet-v1.html` (`#abonelikler`) | var |
| İşletme Başvuruları | `admin-rozet-v1.html` (`#isletmeler`) | var* |
| Tarifler · Şefler · Kademeler · Fiyatlandırma · Slider · Sayfalar/SEO · Menü · Ayarlar · Raporlar | — | **Faz 2** |

\* Not: `admin-rozet`'in "İşletmeler"i = işletme **başvuru/onayı** (Admin altında). İşletme
bölümünün "İşletmeler"i = işletme **gözetimi** (`sa-isletme-isletmeler`). Aynı veri,
farklı giriş — Faz 2'de tek modülde birleştirme değerlendirilir; bu fazda ikisi de durur.

### Sağlık
| Item | Kaynak | Durum |
|---|---|---|
| Genel Bakış | `sa-saglik.html` | var |
| Diyetisyenler | `sa-saglik-diyetisyenler.html` (+`-detay`) | var |
| Randevular · Reçeteler · Testler · Hesaplayıcılar | — | Faz 2 (gözetim açısı) |

### İşletme
| Item | Kaynak | Durum |
|---|---|---|
| Genel Bakış | `sa-isletme.html` | var |
| İşletmeler | `sa-isletme-isletmeler.html` (+`-detay`) | var |
| Rezervasyonlar · Menüler · Onaylar · Reklam | — | Faz 2 |

### DadaStore
| Item | Kaynak | Durum |
|---|---|---|
| Genel Bakış | `sa-store.html` | var |
| Ürünler | `sa-store-urunler.html` (+`-form`,+`-detay`) | var |
| Kategoriler · Siparişler · Müşteriler · Promosyon · Kargo · Raporlar | — | Faz 2 |

### DadaFit
| Item | Kaynak | Durum |
|---|---|---|
| Genel Bakış | `sa-dadafit.html` | var |
| Challenge'lar | `sa-dadafit-challenge.html` (+`-form`,+`-detay`) | var |
| Antrenörler · Egzersizler · Programlar | — | Faz 2 |

### Akademi
Kilitli "yakında" (içerik bankası — sonraki sürüm).

---

## 4. TAŞIMA İŞİ (içerik korunur, sadece kabuk değişir)

Her wave-1 ekranı için **tek değişiklik = kabuk**:
- **ÇIKAR:** ekranın eski/reddedilen çift-sidebar kabuğu (eski `sa-rail`+koyu menü
  markup'ı + o kabuğun CSS/JS'i).
- **KOY:** yeni onaylı `sa-shell` kabuğu (ikon-rail 76px en-koyu + 2. menü koyu-elevated
  264px + üst bar + divider-collapse + avatar sembolü).
- **DOKUNMA:** `<main>` içeriği — tablo/form/detay/kart/KPI **birebir** kalır. İçerik
  sınıfları (ptable, prod-*, set-grid vb.) ekran-özel CSS olarak korunur.
- **Aksan:** bölüm `--acc` token'ıyla gelir (Admin/Store domates · Sağlık nane ·
  DadaFit kurumsal yeşil · İşletme petrol) — içerikteki sabit renkler `--acc`'a uyarlanır
  yalnızca CHROME düzeyinde; içerik veri rengi (pstat ok/wait) semantik kalır.

**`admin-rozet` özel durumu:** Tek dosyada 3 iç sekme (`data-adm-nav`: İşletmeler/
Abonelikler/Rozetler). Gömme yöntemi: `admin-rozet` içeriği + iç-sekme JS'i **olduğu gibi**
Admin kabuğuna alınır; Admin 2. sidebar'ındaki Rozetler/Abonelikler/İşletme-Başvuruları
item'leri bu iç sekmelere **hash deep-link** ile bağlanır (`#rozet`/`#abonelikler`/
`#isletmeler`). İçerik ve sekme mantığı değişmez.

---

## 5. DOSYA / ROUTE YAPISI — öneri (vanilla, build yok)

**Değerlendirilen seçenekler:**
- (a) Her ekran ayrı html + **inline shell kopyası** → kabuk ~700 satır × 29 ekran
  tekrarlanır; Beyar'ın az önce yaptığı türden bir kabuk düzeltmesi 29 dosyada elle
  tekrar gerekir. **Reddedildi** (tutarlılık riski).
- (b) Tek `sa-shell` + **JS view-switch** (içerik fragment fetch/JS-string) →
  `file://`'de fragment fetch CORS'a takılır; içerik dev JS string'lerine girer
  (takvim ~200 satır markup) → bakımsız; deep-link/standalone kaybolur. **Reddedildi.**

**ÖNERİ → (c) Paylaşılan kabuk varlıkları + ekran-başına html (hibrit):**
- `assets/css/sa-shell.css` — kabuk + ortak panel sözlüğü (rail, 2. menü, üst bar,
  `.pnl-card/.pc-*/.pstat/.kpi/.btn`, aksan token'ları, divider, mobil). **Tek kaynak.**
- `assets/js/sa-shell.js` — config-driven chrome: `SECTIONS`/`ROLES` + rail ve 2. sidebar
  render'ı, `body[data-sec][data-screen]`'e göre aktif state, divider/burger/hesap çipi.
  İçerik **render etmez** (içerik her dosyada statik).
- Her ekran dosyası: `<link>` + `<script>` paylaşılan varlıklar; `<body data-sec=… data-screen=…>`;
  boş rail/menu kapları (JS doldurur) + statik üst bar + `<main class="pnl-main">` İÇERİK +
  ekran-özel `<style>` (yalnız o ekranın içerik CSS'i).

**Gerekçe:** Tek kaynak (kabuk tweak'i 1 dosyada → 29 ekrana yayılır — tutarlılık
şartı karşılanır), buildsiz (`<link>`/`<script>` `file://`+http çalışır), deep-link korunur,
yeni ekran = içerik dosyası + 1 config satırı. İçerik birebir, standalone.

**Kabuk tutarlılığı:** Onaylı `sa-shell.html`'in mevcut kabuğu bu iki paylaşılan dosyaya
**çıkarılır (extract)**; `sa-shell.html` da onları link'ler → kabuğun **tek** kaynağı olur,
ekranlar ondan beslenir. (Pilotla birlikte ilk extract yapılır; görünüm birebir aynı kalmalı,
SS ile doğrulanır.)

**Route:** gerçek backend yok → düz dosya adları. İsimlendirme `sa-<bölüm>-<ekran>.html`
(ör. `sa-saglik-diyetisyenler.html` zaten bu kalıpta). Rail bölüm geçişi = o bölümün
landing dosyasına navigasyon; 2. sidebar item'leri = ekran dosyalarına `href`.

---

## 6. FAZLAMA

### Faz 1 — Gözetim ekranlarını yeni kabuğa taşı + 3 katmanlı `sa-giris`
1. Kabuğu paylaşılan varlıklara çıkar (`sa-shell.css`/`sa-shell.js`), `sa-shell.html` migrasyonu (SS doğrula).
2. **1 PİLOT bölüm** taşı → Beyar görsel onayı.
3. Onay sonrası kalan bölümler **teammate ile paralel** (her bölüm bağımsız).
4. `sa-giris` 3 katman (Süper Admin / Bölüm Yöneticisi / Operatör-demo; antrenör kilitli).

### Faz 2 — Eksikleri yap (paralel, tam spec ile)
- Admin eksik modülleri (Tarifler/Şefler/Kademeler/Fiyatlandırma/Slider/Sayfalar-SEO/Menü/Ayarlar/Raporlar).
- Sağlık/İşletme/Store/DadaFit'in eksik gözetim modülleri.
- **Antrenör operatör paneli** (DadaFit operatörü — `dyt-*`/`mekan-*` muadili, sıfırdan).

### Faz 3 — "Panelini Aç" köprüsü
- Gözetim detayından operatör panelinin impersonation/görüntüleme geçişi + geri dönüş +
  (gerçek üründe) yetki/audit izi.

### PİLOT bölüm önerisi → **SAĞLIK**
Gerekçe: (1) En zengin ve çeşitli içerik (`sa-saglik` dashboard + `sa-saglik-diyetisyenler`
liste + detay) → kabuğun dashboard/tablo/detay üç deseni tek bölümde test edilir;
(2) nane/yeşil aksan domatesten ayrışır → aksan-token katmanı gerçekten doğrulanır;
(3) "Diyetisyenler" gözetimi ileride "Panelini Aç → `dyt-*`" köprüsünün de doğal başlangıcı.
(Admin daha karışık — `admin-rozet` hash-sekme özel durumu var; pilot için Sağlık daha temiz.)

---

## 7. KISITLAR
- **Krem YOK** · `sa-shell` dili korunur (rail+koyu 2.menü+açık içerik, marka token'ları).
- **Operatör panellerine (`dyt-*`/`mekan-*`) DOKUNMA** — bu faz onları kullanmaz bile
  (Faz 3 köprüsü açar).
- **İçeriğe dokunma** — wave-1 ekranlarının tablo/form/detayı birebir.
- Marka renkleri (domates/petrol/nane/kurumsal-yeşil), Gilroy.
- **Commit YOK · implement YOK** (bu tur sadece plan).

---

## Kapanış — onaya açık iki nokta
1. Dosya yapısı önerisi (5: paylaşılan varlık + ekran-başına html) onaylanıyor mu?
2. Pilot = **Sağlık** uygun mu? Onaylanırsa Faz 1 adım 1-2 başlar (önce kabuk extract,
   sonra Sağlık pilotu), DUR + görsel.
