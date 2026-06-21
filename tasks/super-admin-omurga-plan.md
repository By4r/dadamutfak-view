# Birleşik Süper Admin — OMURGA Planı (çift-sidebar iskelet)

> **Mod:** PLAN. Implement YOK. Bu faz yalnız **çalışan iskelet** (shell + rol + boş bölüm dashboard'ları).
> Bölüm MODÜL ekranları (tarif yönetimi, ürün, antrenör vb.) BU FAZDA DEĞİL → sonraki paralel dalga.
> **Tarih:** 2026-06-20

## 0. Girdi durumu (önemli)

- **`tasks/super-admin-spec.md` YOK** (okunamadı). Plan, **`tasks/admin-envanter.md`** + bu görevdeki **KARAR SETİ** + `v6/panel-shell.html` derin okumasına dayandırıldı. Spec dosyası ileride yazılırsa bu planla çelişen yer çıkarsa plan revize edilir. → açık soru #3.
- **Kanonik iskelet okundu:** `v6/panel-shell.html` (`.pnl-*` dili, token, tek dikey sidebar + üst bar, KPI/card/table/empty/pro-band/pro-gate, responsive ≤980 off-canvas / ≤640 yoğunluk).
- **Kritik mimari bulgu:** `panel-shell` ve türevi `mekan-panel` aksanı **token'la değiştirmiyor** — her ikisi de her yerde **hardcoded `var(--green)`** kullanıyor (mekân paneli bile yeşil, petrol değil). Yani mevcut panel dilinde "bölüme göre aksan" diye bir mekanizma YOK. 6 bölümü farklı aksanla göstermek için omurga **yeni `--acc` aksan-token katmanı** kurmak zorunda (panel-shell'i GENİŞLETME; mevcut dosya `--green`'le kalır, dokunulmaz).

---

## 1. Üretilecek yeni dosyalar (mevcut dosyalara dokunulmaz)

| Dosya | Amaç |
|---|---|
| `v6/sa-shell.html` | **Omurga / kanonik çift-sidebar iskelet.** İkon-rail + bölüm menüsü + topbar + global dashboard (super) + her bölüm için placeholder dashboard. Tek dosya, `?role=` ve `?sec=` paramlarıyla config-driven render. "Yeni süper-admin sayfası = bu dosyanın kopyası" (panel-shell'in muadili). |
| `v6/sa-giris-v1.html` | **Demo rol seçici giriş.** 5 rol kartı; seçilince `sa-shell.html?role=…`'e yönlendirir. `giris-v1.html`'e DOKUNMADAN ayrı dosya (gerekçe §5). |

Toplam **2 yeni dosya**. (Bölüm başına ayrı dosya açılmıyor — §4 gerekçe: tek config-driven shell, çift-sidebar geçişini gerçekten test edilebilir kılar ve DRY kalır.)

**Mevcut dosyalara dokunma gereği:** YOK. `sa-shell` kendi `--acc` katmanını sıfırdan kurar; `panel-shell/dyt-*/mekan-*/giris-v1` hiç değişmez.

---

## 2. Çift-sidebar HTML/CSS yapısı

### 2.1 Düzen iskeleti (3 kolon + üst bar)

```
┌─rail─┬──menu──┬─────── topbar ───────┐
│ 56px │ 210px  │  (left:266px)        │
│ ikon │ bölüm  ├──────────────────────┤
│ bar  │ menüsü │   pnl-main           │
│      │        │   (margin-left:266px)│
└──────┴────────┴──────────────────────┘
```

Yeni ölçü token'ları (`:root`):
```
--sa-rail-w:56px;
--sa-menu-w:210px;
--sa-side-w:calc(var(--sa-rail-w) + var(--sa-menu-w));   /* 266px */
--pnl-top-h:64px;   /* panel-shell ile aynı */
```
`.pnl-top{left:var(--sa-side-w)}` ve `.pnl-main{margin-left:var(--sa-side-w)}` (panel-shell'deki `--pnl-side-w` yerine).

### 2.2 İkon-rail `.sa-rail` (Slack tarzı, SADECE ikon)

- `position:fixed;left:0;width:56px;top:0;bottom:0;` koyu `--slate` zemin (panel-shell sidebar kimliği korunur), `flex-direction:column`.
- Üst: mini logo işareti (`logo-official-white` favicon/işaret, 28px).
- Orta: 6 bölüm ikonu `.sa-rail-ico` (44×44, ortalı FA ikon). Sıra: **Admin · Sağlık · Store · DadaFit · İşletme · Akademi(kilitli)**.
  - default: `color:rgba(233,226,214,.55)`; hover: beyaz + hafif `rgba(255,255,255,.06)` bg.
  - **aktif:** `background:rgba(var(--acc-rgb),.16); color:var(--acc);` + sol 3px accent şerit (`::before`, panel-shell `.pnl-link.is-active` deseninin rail muadili).
  - tooltip: `title` attr (saf CSS tooltip'e gerek yok; iskelet için `title` yeterli).
- **Akademi kilitli:** `.is-locked` → gri (`opacity:.4`), ikon üstünde küçük `fa-lock`, `cursor:not-allowed`; tıklanınca `preventDefault` (geçiş yok). Hover'da mini "Yakında" `title`.
- Alt (`margin-top:auto`): "Siteye Dön" ikonu (`fa-arrow-left` → `anasayfa-portal-v3a.html`).

### 2.3 Bölüm menüsü `.sa-menu` (orta kolon)

- `position:fixed;left:56px;width:210px;top:0;bottom:0;` — **yüzey kararı → açık `--paper`** (rail koyu → menü açık → içerik açık; modern admin katmanlama, okunabilirlik). *Açık soru #1: koyu-kohezyon alternatifi.*
- Üst başlık `.sa-menu-head`: bölüm adı (ör. "Sağlık Yönetimi") + altında küçük accent çizgi/etiket; başlık rengi `var(--acc)` aksanlı. `--pnl-top-h` yüksekliğiyle hizalı (topbar'la aynı hatta başlar).
- Menü linkleri `.sa-mlink`: panel-shell `.pnl-link` dilinin **açık-zemin türevi** (ikon + etiket + opsiyonel `.pl-cnt` sayaç). aktif: `background:rgba(var(--acc-rgb),.10); color:var(--acc-deep);` + sol accent şerit. Bölümlendirme için `.pnl-sec-lbl` muadili `.sa-sec-lbl`.
- İçerik config'den render edilir (her bölümün modül başlıkları görünür ama hedefler placeholder/`href="#"` — modül ekranları sonraki dalga).

### 2.4 Topbar + içerik

- `.pnl-top` panel-shell'den **birebir** (arama + bell + persona chip). Tek fark `left:var(--sa-side-w)`. Burger ≤980'de görünür.
- Persona chip role'e göre config'den (super → "Süper Admin · Tüm yetki"; saglik-admin → "Sağlık Yöneticisi" vb.). `pm-ava` halkası `var(--acc)`.
- `.pnl-main`, `.pnl-card`, `.kpi-grid`, `.pstat`, `.pnl-empty` panel-shell'den miras; aksanlı yerlerde `var(--green)` → `var(--acc)` ile genelleştirilir (yeni dosyada baştan böyle yazılır).

### 2.5 `--acc` aksan-token katmanı (omurganın kalbi)

`:root` default (Admin):
```
--acc:var(--tomato); --acc-deep:var(--tomato-dark); --acc-rgb:225,72,39;
```
Bölüm geçişi `body[data-sec="…"]` ile (JS `body.dataset.sec` set eder):
| sec | --acc | --acc-deep | --acc-rgb | kaynak |
|---|---|---|---|---|
| admin | `#E14827` | `#C43D20` | 225,72,39 | tomato (mevcut token) |
| saglik | `#3BB77E` | `#2c9963` | 59,183,126 | green (mevcut token) |
| store | `#E14827` | `#C43D20` | 225,72,39 | tomato (mevcut token) |
| dadafit | `#009d4f` | `#007a3d` | 0,157,79 | kurumsal yeşil (CLAUDE modül haritası) |
| isletme | `#006072` | `#004b59` | 0,96,114 | petrol (CLAUDE modül haritası) |
| akademi | `#006072` | `#004b59` | 0,96,114 | petrol (kilitli, render olmaz) |

- **Yeni renk yok:** aksan HUE'ları kanonik palet (tomato/green/dadafit-yeşil/petrol). `--acc-deep` aynı hue'nun koyu el-ayarı (yeni marka rengi değil, gölge varyantı). **Tüm tint zeminler `rgba(var(--acc-rgb),.10–.16)`** ile üretilir → yeni hex tint GEREKMEZ. → açık soru #4 (deep türevleri onayı).

---

## 3. Rol `?role=` param JS mantığı (mevcut ?business/?pro deseni gibi inline)

```
roller: super | saglik-admin | store-admin | dadafit-admin | isletme-admin
```
- Inline IIFE (panel-shell'deki `?business=1` bloğunun kardeşi):
  1. `?role=` oku → yoksa `localStorage dm_sa_role` → yoksa default `super`.
  2. `?role=` varsa `localStorage`'a yaz (SS/tekrar ziyaret kalıcılığı).
  3. `ROLES` config'inden o rolün **görünür bölüm seti** + **persona** + **landing sec**'i belirle.
- **Görünürlük:**
  - `super` → 6 ikon görünür (Akademi kilitli-görünür). Landing: `sec=genel` (global dashboard).
  - `saglik-admin` → yalnız Sağlık ikonu. Landing: `sec=saglik`. Diğer rail ikonları DOM'da `hidden`.
  - `store-admin` → yalnız Store. `dadafit-admin` → yalnız DadaFit. `isletme-admin` → yalnız İşletme.
  - (Admin bölümü = kullanıcı/yetki/ayarlar merkezi → yalnız `super`. Akademi yakında → kimse içine giremez.)
- **Bölüm geçişi `?sec=`:** rail ikonu `sa-shell.html?sec=admin` (vb.) link. JS açılışta `?sec=` okur, `body.dataset.sec` set eder (aksan), o bölümün menüsünü + dashboard'unu render eder. `sec` yoksa role landing'i kullanılır. Bölüm-admin başka `?sec=`'e elle giderse JS yetki dışıysa kendi bölümüne/`403 boş durum`a düşürür (basit guard).
- **Akademi guard:** ikon `is-locked`, click `preventDefault`; `?sec=akademi` elle gelse de "Yakında" boş durumu gösterir, menü render etmez.

---

## 4. Global + bölüm placeholder dashboard yapısı (config-driven)

Tek `SECTIONS` config nesnesi (JS), her bölüm: `{label, icon, accent-sec, menu:[{ico,label,cnt?}], dash:'placeholder'}`.

### 4.1 Global dashboard (`sec=genel`, yalnız super)
- `.pnl-page-head`: "Genel Bakış" + tarih/selam.
- **KPI şeridi (4 placeholder kart):** Bekleyen Onaylar · Aktif Kullanıcı · Günlük Aktivite · Abonelik (gelir/adet). panel-shell `.kpi-grid` birebir; sayılar statik placeholder.
- **Son Aktivite listesi:** `.pnl-card` + `.mm-list`/satır deseni (yeni içerik onayı, yeni üye, sipariş, randevu) — bölümler-arası karışık, her satırda küçük accent etiketi (hangi bölüm).
- Bölüm menüsünde (super'in genel menüsü) "Genel Bakış" aktif + 6 bölüme kısayol.

### 4.2 Bölüm placeholder dashboard (`sec=admin|saglik|store|dadafit|isletme`)
- Doğru `--acc` uygulanır (rail aktif ikon + menü başlığı + kartlar aksanlı).
- **Bölüm menüsü:** o bölümün modül başlıkları GÖRÜNÜR (envanterden türetilmiş, ör. Sağlık → Diyetisyenler · Randevular · Reçeteler · Testler · Hesaplayıcılar). Linkler `href="#"` (modül ekranı yok) → tıklanınca aynı "yapım aşamında" boş durumu.
- **İçerik:** `.pnl-empty` panel-shell boş-durum deseni → `pe-ico` (accent tint), başlık "‹Bölüm› modülleri yapım aşamında", alt metin "Bu bölümün yönetim ekranları sonraki dalgada eklenecek." Amaç: çift-sidebar geçişinin gerçekten çalıştığını göstermek.
- **Modül başlıkları envanter eşlemesi** (yalnız menü etiketi, ekran değil):
  - **Admin:** Genel Bakış · Kullanıcılar & Yetki · Üyeler · **Fiyatlandırma & Abonelik** (MERKEZİ — tüm fiyatlar: Pro abonelik + diyetisyen/antrenör/mekan/reklam) · Slider/Banner · Sayfalar & SEO · Menü/Navigasyon · Ayarlar · Raporlar · Rozetler
  - **Sağlık:** Genel Bakış · Diyetisyenler · Randevular · Reçeteler · Testler · Hesaplayıcılar
  - **Store:** Genel Bakış · Ürünler · Kategoriler · Siparişler · Müşteriler · Promosyonlar · Kargo & Ödeme · Raporlar
  - **DadaFit:** Genel Bakış · Antrenörler · Egzersizler · Programlar · Challenge'lar  *(fiyatlar merkezi Admin → Fiyatlandırma & Abonelik modülünden beslenir)*
  - **İşletme:** Genel Bakış · İşletmeler · Rezervasyonlar · Menüler · Onaylar · Reklam Paketleri

---

## 5. Login demo rol yaklaşımı → **ayrı dosya `sa-giris-v1.html`** (öneri)

**Gerekçe (neden giris-v1'e dokunmuyorum):**
1. KISIT: "giris-v1'e dokunma." Ayrı dosya bu kısıtı net karşılar.
2. `giris-v1.html` **public son-kullanıcı** girişi (Giriş/Kayıt/Şifre sekmeleri, e-posta↔telefon). Admin demo rol seçici farklı bir bağlam — public login'e "süper admin olarak gir" kartları sokmak public akışı kirletir, prod'a sızma riski taşır.
3. Admin paneli ayrı bir kabuk (`sa-shell`); girişinin de ayrı olması mimari olarak tutarlı (legacy'de de panel `sign_in.html` ayrıydı).

**`sa-giris-v1.html` içeriği:** `_shell` token'larıyla sade ortalı kart; 5 rol kartı (ikon + ad + "neyi yönetir" tek satır):
- Süper Admin → `sa-shell.html?role=super`
- Sağlık Yöneticisi → `?role=saglik-admin`
- Store Yöneticisi → `?role=store-admin`
- DadaFit Yöneticisi → `?role=dadafit-admin`
- İşletme Yöneticisi → `?role=isletme-admin`

Her kart o bölümün aksanıyla vurgulu. (Akademi yakında → giriş kartı yok.) Saf statik; gerçek auth yok (demo).

---

## 6. Mobil / responsive davranış

- **≤980 (off-canvas, birleşik drawer):** rail+menü TEK birim olarak (`266px`) sola gizlenir (`transform:translateX(-100%)`); burger + `.pnl-overlay` + `body.nav-open` ile açılır (panel-shell deseni birebir). `.pnl-top{left:0}`, `.pnl-main{margin-left:0}`. Rail ve menü drawer içinde yan yana kalır (ikon-bar + menü). *Açık soru #2: alternatif "rail sabit + menü gizlenir".*
- **≤640 (yoğunluk):** panel-shell kuralları miras — arama full-width, persona `pm-id` gizli, `.kpi-grid` 2 kolon, kart padding 16px. Drawer 266px (360px ekranda overlay'le kabul edilebilir); gerekirse menü 200px'e iner.
- KPI ve içerik grid'leri panel-shell breakpoint'leriyle aynı.

---

## 7. Bağlantı & akış bütünlüğü (iskelet kapsamı)

- `sa-giris-v1` rol kartları → `sa-shell.html?role=…` (var olan dosya, çalışır).
- Rail ikonları → `sa-shell.html?sec=…` (aynı dosya, çalışır). Akademi → geçiş YOK (tasarım gereği, raporda "kilitli" diye işaretli).
- Modül menüsü linkleri → `href="#"` + "yapım aşamında" boş durumu. **AÇIKÇA:** bu hedefler henüz yok, modül ekranları sonraki dalgada bağlanacak (sessiz 404 değil; boş-durum gösterir).
- "Siteye Dön" → `anasayfa-portal-v3a.html` (var).
- Implement sonrası: 1440 + 390 full-SS self-verify (rail aksan geçişi, 5 rol görünürlüğü, Akademi kilidi, ≤980 drawer) → yazılı rapor.

---

## 8. Kararlar (kilitli) + kalan varsayımlar

1. **Bölüm menüsü yüzeyi → AÇIK `--paper`.** ✅ Onaylandı. Rail koyu → menü açık → içerik açık katmanlaması (modern admin dili, okunabilirlik + aksan kontrastı).
2. **≤980 collapse → BİRLEŞİK DRAWER.** ✅ Onaylandı. Rail+menü tek birim (266px), panel-shell `nav-open`/overlay deseni birebir.
3. **Spec dosyası (`super-admin-spec.md`) yok → `admin-envanter.md` + karar setiyle devam.** (Varsayım; spec sonra yazılırsa modül dalgasında hizalanır.)
4. **dadafit `#009d4f` / petrol `#006072` `--acc-deep` + rgba tint'leri kabul.** (Varsayım; yeni HUE değil, kanonik hue'nun gölge/tint türevi, tint'ler `rgba(acc,.1)`.)

---

## 8b. Sonraki dalga için park edilmiş (omurgada DEĞİL)

- **"Panelini Aç" aksiyonu:** süper-admin denetim listelerinde (diyetisyen/antrenör/işletme satırı) ilgili self-servis panele (`panel-shell` / `mekan-panel` vb.) geçiş aksiyonu **modül dalgasında** gelecek. Omurgada implement edilmez; burada işaretli kalır ki unutulmasın.

## 9. Uygulama sırası (onay sonrası, bu faz)

1. `sa-shell.html` iskelet CSS (`--acc` katmanı + `.sa-rail`/`.sa-menu` + panel-shell miras).
2. `SECTIONS` + `ROLES` config + render JS (`?role=`/`?sec=`, body.dataset.sec, görünürlük guard).
3. Global dashboard + 5 bölüm placeholder (boş durum) + Akademi kilit.
4. `sa-giris-v1.html` rol seçici.
5. Responsive (≤980 drawer / ≤640 yoğunluk) + self-verify SS (1440/390) → yazılı rapor.
