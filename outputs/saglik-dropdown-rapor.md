# Sağlık Dropdown Chrome — Rapor (teammate: saglik-dropdown, task #1)

> Kök neden: Sağlık nav dropdown INLINE (her sayfa kopyası). `[href="saglik-hub-v1.html"]`
> attribute selector genişletildi; `.dropdown-health` scoped hook eklendi. Global
> `.dropdown a / .dropdown a i / .dropdown a:hover / .nav a:hover / .nav a.active`
> kuralları EZİLMEDİ — yalnız scoped override + yeni hook eklendi.

## Kanon tablosu (A–D)

| Parça | Yapılan | Kapsam |
|-------|---------|--------|
| **A1 dd-class** | `<div class="dropdown">` → `<div class="dropdown dropdown-health">` (yalnız Sağlık nav dropdown'ı) | 57 sayfa |
| **A2 href-fix** | dropdown Hesaplayıcılar item `saglik-hub-v1.html` → `hesaplayici-v1.html` | **11 sayfa** |
| **A3 desktop Testler** | Hesaplayıcılar ↔ Diyetisyen arasına Testler item eklendi (eksik olanlara) | **3 sayfa** (saglik-hub, saglik-testler, test-detay) |
| **B drawer Testler** | `.d-sub` Hesaplayıcılar ↔ Diyetisyen arasına Testler eklendi | **57 sayfa** (tümü eksikti) |
| **C scoped CSS** | 6 satırlık `.dropdown-health` + `[href=saglik-hub]:hover` bloğu `</style>` öncesine (sentinel guard) | 57 sayfa |
| **D aktif-mark** | dropdown current item `class="active"` | **12 sağlık sayfası** |
| **D test-detay** | `<a href="tarif-liste-v1.html" class="active">Tarifler` → active KALDIRILDI | 1 sayfa |

### A2 href-fix — 11 sayfa
bazal-metabolizma, beden-kutle-endeksi, besin-kutuphanesi, diyet-listeleri,
diyet-program-detay, gunluk-kalori, gunluk-su, ideal-kilo, saglik-hub,
saglik-testler, vucut-tipi.

### D aktif-marking mapping (uygulandı, doğrulandı)
- **Hesaplayıcılar.active** (7): bazal-metabolizma, beden-kutle-endeksi, gunluk-kalori,
  gunluk-su, ideal-kilo, vucut-tipi, saglik-hub
- **Testler.active** (2): saglik-testler, test-detay
- **Diyetisyen Ara.active** (2): diyetisyen-dizin, diyetisyen-ol
- **besin-kutuphanesi**: dropdown item active YOK (yalnız Sağlık nav active) — doğrulandı
- 44 non-sağlık sayfa: dropdown-health + CSS + 3 item ALDI, aktif-marking YOK — doğrulandı

## Kapsam kararları (brief'ten sapma + gerekçe)

- **Universe 57 sayfa** (brief "56"). 58 sayfada standart Sağlık nav vardı;
  diyetisyen-dizin manuel düzeltme dahil 57 dosya değişti (saglik-hub pilot turunda
  zaten yazılmıştı, 2. sweep'te skip → net 57 değişen dosya).
- **diyetisyen-dizin drawer**: Diyetisyen Ara linki `href="#"` (current-page anchor)
  olduğu için script anchor'ı kaçırdı → manuel Edit ile Testler eklendi. Sonuç canon.
- **hesaplayici-v1 (calc shell, §3b muaf)**: nav Sağlık dropdown'ı YOK (yalnız footer
  "Sağlık Merkezi" linki). İlk sweep CSS bloğunu yanlışlıkla ekledi → REVERT edildi
  + script'e "nav dropdown şart" guard'ı kondu. Şu an temiz (diff'te yok).
- **tarif-detay-v1-headA.html** (git-tracked head-deney varyantı): Sağlık nav `href="#"`
  placeholder, `saglik-hub-v1.html` ref'i 0 → kanonik 57-sayfa nav setinin parçası
  DEĞİL. DOKUNULMADI (canon dosya `tarif-detay-v1.html`).
- **shop kabuğu** (dada-shop, sepet, odeme, urun-liste, urun-detay): standart Sağlık
  nav taşımıyor → muaf, dokunulmadı. (alisveris-listesi + siparislerim ana shell
  nav'ı taşıyor → 57'ye dahil, non-health.)

## Kanıt (render-zorunlu)

İzole `channel:chrome` (sistem Chrome, MCP'siz) + localhost:8765 + `?cb=` cache-buster.
SS yolu: `outputs/saglik-dropdown-ss/`

1. **Dropdown AÇIK render** (3 item tam + ikon yeşil + doğru aktif item yeşil):
   - `dd-saglik-hub-v1.png` — Hesaplayıcılar.active yeşil
   - `dd-diyetisyen-dizin-v1.png` — Diyetisyen Ara.active yeşil
   - `dd-saglik-testler-v1.png` + `dd-test-detay-v1.png` — Testler.active yeşil
   - `dd-gunluk-kalori-v1.png`
2. **Hover karşılaştırma**:
   - `hover-saglik.png` — Sağlık nav hover = `rgb(59,183,126)` YEŞİL, bg `rgba(59,183,126,0.1)`
   - `hover-tarifler.png` — Tarifler nav hover = `rgb(225,72,39)` TURUNCU, bg tomato-tint → **bozulmadı**
   - `dd-tarif-liste-v1.png` — non-health: dropdown 3 yeşil item AMA nav active item YOK (Tarifler turuncu)
3. **test-detay tek-active probe**: `nav>a.active` = **1** (yalnız `saglik-hub-v1.html`); Tarifler active kaldırıldı.

## Sızıntı / idempotency teyidi

- **Idempotency**: re-run `git diff --numstat | md5` before==after (`0c3f94...`) → 0 fiili yazma.
- **Global kural değişmedi**: `git diff -U0 | grep '^-...\.dropdown a{|\.nav a:hover{|\.nav a.active{'` = boş.
- **Net-negatif dosya YOK** (CSS yutma yok): added=644 deleted=71 net=+573, hiçbir dosya del>add değil.
- **Silinen 71 satır tamamı meşru**: 57× `<div class="dropdown">` (→ dropdown-health),
  11× eski Hesaplayıcılar href, 2× Diyetisyen anchor (Testler insert), 1× test-detay Tarifler active.
- **dropdown-health yalnız Sağlık nav'ında**: 57 sayfada tam 1 adet, hepsi Sağlık anchor'ından
  hemen sonra. Tarifler/Mutfak Sırları/Bugün Ne Pişirsem dropdownlarına yeşil SIZMADI (turuncu).
- **CSS sentinel duplicate YOK** (57 sayfa × 1).

## Bilinen sınırlamalar

- `tarif-detay-v1-headA.html` bilinçli kapsam dışı (yukarıda gerekçe). Eğer bu dosya
  da canon nav istiyorsa ayrı karar gerekir (lead'e bırakıldı).
- COMMIT YAPILMADI (brief gereği).
- Sweep + SS script'leri `tasks/_saglik_dropdown_sweep.py` ve `tasks/_saglik_ss.mjs`
  altında bırakıldı (idempotent, re-run güvenli).
