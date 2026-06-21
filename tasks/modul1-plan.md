# Modül 1 Planı — İşletme Menü Paneli (27a) + Mekan Şubeler (21)

> Dalga 2 / Modül 1. **Research tamamlandı** (4 paralel Explore agent). Bu dosya
> implement öncesi plan; onay bekliyor. Kod yok, dosya değişikliği yok.
> Kurallar: targeted edit, header'a dokunma, mevcut anatomiyi türet, yeni renk yok,
> tomato `#E14827`.

---

## 1. Research Özeti — Kavranan Anatomi

### A. `mekan-detay-v1.html` (public, 3029 satır) — hedef dosya, İKİ modül de buraya dokunuyor
- **Tab sistemi `pf-tabs` / `#mdTabs`** (HTML 1722–1733, CSS 813–827, JS 2723–2749).
  Mevcut sekmeler: `genel` · `lezzetler` · `yorumlar` · `adres` · `tarifler`.
  **JS tamamen generic** (`querySelectorAll('#mdTabs .dt')` + `'pane-'+key`) →
  **yeni tab eklemek JS değişikliği GEREKTİRMEZ**: bir `.dt` butonu + eşleşen
  `#pane-<key>` div yeterli. Aktif state = `.active`; deep-link `?tab=<key>` otomatik.
- **Zaten name+price+image+desc kartı var:** "Öne Çıkan Lezzetler" sekmesi
  (`pane-lezzetler`, HTML 1759–1801) → `.dish-grid > article.dish-card`:
  `.dish-fig` (div+bg-image, aspect 16/9, cover/center) · `.dish-name h4` +
  `.dish-price` (tomato, 700) · `<p>` desc · opsiyonel `.dish-sign` rozet. **Bu kart
  Menü ürün kartının hazır temeli** (CSS 838–848).
- **Şube listesi için iki hazır pattern:**
  - `md-similar` full-width section (cream bg, CSS 1015) + `disc-grid` (3 kol) →
    "Benzer mekânlar" (HTML 2106–2165). Şube section'ı bunun klonu olur.
  - Mesafe rozeti `.disc-dist` (tomato, bold, `fa-route` ikon, "X,X km" — virgüllü)
    kesfet'te var (CSS 823–824); şube kartına buradan port edilir.
- **Görsel kuralı doğrulandı:** sayfada içerik `<img>` YOK; tüm oranlı görseller
  `div + background-image` + `cover`/`center` (Kerem Bey pattern). `.dish-fig` inline
  bg, `.disc-fig > .bg` nested bg (overlay rozetler üstte dursun diye).
- Tokenlar: `--tomato #E14827`, `--tomato-tint #FBE9E3`, `--muted`, `--line`,
  `--cream`, `--radius-*`, `--sh-*`, `--ease`, `--wrap 1240px`. (Şube kartının ihtiyacı
  olan tüm disc-* tokenları bu dosyada zaten mevcut.)

### B. İşletme sahibi panel ekosistemi (mevcut!) — `27a panel` tarafı
- **`panel-shell.html` kanonik iskelet** (kendi header'ı söylüyor: "yeni panel sayfası =
  bu dosyanın kopyası"). `mekan-panel-v1` / `mekan-ayarlar-v1` / `mekan-rezervasyonlar-v1`
  bunun "yeşil kardeşi" venue kopyaları. **Paylaşılan nav dosyası YOK** — her sayfa kendi
  `<aside class="pnl-side">`'ını birebir kopyalıyor.
- **Owner sidebar nav** (mekan-panel HTML 293–310): Panel · Rezervasyonlar `<span class="pl-cnt">7</span>` ·
  Müsaitlik & Ayarlar · İşletme Profili · — "Hesap" — Bildirim Ayarları · foot (Public Sayfam / Siteye Dön).
  Link markup: `<a class="pnl-link" href=".." data-nav="..">`, aktif = `.is-active`.
- **Panel kit:** `.pnl-card` (`.pc-head`>`.pc-title` + `.pc-body`(.flush) + `.pc-foot`>`.save-bar`).
  Form kit `.fk-field/.fk-label(.opt)/.fk-input/.fk-select/.fk-textarea/.fk-grid2`.
  Görsel kontrolü: `.up-zone` (dashed dropzone) + `.gal-thumb` (div+bg, `.x` sil butonu).
  Repeater idiom: full-width `<button class="btn btn-ghost btn-sm" style="width:100%">+ ... Ekle</button>`.
  **Panel ana aksanı YEŞİL** (`--green #3BB77E`); tomato sadece Pro band/gate/bell-dot.
- **mekan-ayarlar** sekmeli (`.set-tabs > .st-btn` + `.set-pane`), sidebar 3 hedefi
  `?tab=` ile buraya bağlıyor; tab-sync JS (`NAVMAP`) zaten karmaşık.

### C. Ekle-formu repeatable-row pattern — `tarif-ekle-v1` / `puf-noktasi-ekle-v1`
- **Pattern A (kategori→ürün için birebir):** `.ie-list#ieList` konteyner;
  `makeRow()` (createElement+innerHTML) ürün satırı, `addGroup` grup başlığı (`.ie-group`)
  + altına taze satır; **tek delegated click listener** ile silme (`.ie-del`/`.ie-gdel`).
  `<template>` cloning YOK. `.ie-row` bir CSS grid (`grid-template-areas`).
  → **Menü editörü tam olarak bu:** `.ie-group` = menü kategorisi (Kahvaltı/Öğle/Akşam),
  `.ie-row` = ürün satırı; grid kolonlarını `görsel · ad · fiyat · açıklama · sil` olarak
  yeniden tanımla, birim `<select>` yerine fiyat `.fk-suffix` (₺), satır görseli için
  `.st-shot` (148×92 div+bg, köşe sil) veya küçük `.up-zone`.
- Fiyat suffix input `.fk-suffix`, dashed "+ekle" butonu `.add-row`, panel primary `.btn-green`.

---

## 2. Menü Veri Modeli (paylaşılan kontrat — public görüm + panel editör aynı alanları kullanır)

```
Menü = [ Kategori ]
Kategori {
  ad:      string   // "Kahvaltı" | "Öğle" | "Akşam" | "Tatlılar" | "İçecekler" ...
  not?:    string   // opsiyonel kategori açıklaması ("09:00–12:00 arası")
  urunler: [ Ürün ]
}
Ürün {
  ad:       string   // "Bakır Tavada Mıhlama"
  fiyat:    number   // 240  → public'te "₺240"
  gorsel:   url      // div+background-image (cover/center)
  aciklama: string   // kısa, 2 satır clamp
  rozet?:   enum     // opsiyonel: "İmza" | "Yeni" | "Vejetaryen" | "Acı"  (.dish-sign)
}
```
- Public `mekan-detay` `.dish-card` alanları (ad/fiyat/görsel/desc/rozet) ile **birebir** —
  editör formundaki alanlar bu sete kilitli, drift yok.

---

## 3. Dosya Bazında Targeted Edit Planı (full-file write YOK)

### Modül 27a-public — `mekan-detay-v1.html` (Menü sekmesi)
1. **Tab butonu:** `#mdTabs` içinde, `lezzetler` butonundan sonra (≈satır 1727 sonrası)
   tek satır: `<button class="dt" type="button" data-pane="menu">Menü</button>`.
   Sıra: Genel → Öne Çıkan Lezzetler → **Menü** → Yorumlar → Adres → Tarifler.
2. **Pane:** `pane-lezzetler` kapanışından sonra (≈satır 1801 sonrası) yeni
   `<div class="md-pane" id="pane-menu">` bloğu. İçi: `rd-sec-head` başlık + her öğün
   kategorisi için `<h3>` alt-başlık + `.dish-grid` (mevcut `.dish-card` reuse). 3 kategori
   örnek (Kahvaltı / Öğle / Akşam), kategori başına 2–4 ürün. JS değişikliği YOK.
   - Opsiyonel: pane başında kategori-içi pill switcher; ama en sade fit = stack edilmiş
     `<h3>` + grid blokları (öneri: stack, gimmick yok).

### Modül 21 — `mekan-detay-v1.html` (Diğer Şubelerimiz)
3. **Section:** "Benzer mekânlar" (`md-similar`, HTML 2106–2165) klonu, ondan **önce**
   eklenir. `<h2>` → "Diğer Şubelerimiz", eyebrow → "Aynı Lezzet, Yakınında". Kartlar
   `disc-grid > disc-card` türevi; mesafe için `.disc-dist` (kesfet CSS 823–824) port edilir.
   3 şube örnek. İki ardışık cream section çakışmasın diye yeni section'a beyaz/farklı bg
   override (öneri: şubeler beyaz `--paper`, benzer-mekânlar cream kalsın → görsel ayrım).
   - **Koşullu mantık:** şube section'ı sadece "şubesi olan" işletmede görünür (mockta göster,
     yorum satırıyla not düş).
   - **CSS port:** `.disc-dist` kuralı (820–824) `mekan-detay`'a eklenir; diğer disc-* zaten var.

### Modül 27a-panel — YENİ `mekan-menu-v1.html` (önerilen — gerekçe §4)
4. **Yeni dosya:** `panel-shell.html` kopyası (kanonik kural). İçerik alanı menü editörü:
   - `.pnl-page-head`: h1 "Menü Yönetimi" + `.ph-sub` + `.ph-actions` (Önizle / Kaydet).
   - Kategori başına bir `.pnl-card`: `.pc-head` kategori adı (düzenlenebilir input) +
     sil; `.pc-body.flush` içinde `.ie-list` türevi ürün satırları (görsel `.st-shot` ·
     ad `.fk-input` · fiyat `.fk-suffix ₺` · açıklama `.fk-input` · rozet `.fk-select` · `.ie-del`).
   - Kategori sonu "+ Ürün Ekle" (`.add-row`), sayfa sonu "+ Kategori Ekle" (`.btn-ghost btn-sm` full-width).
   - Kaydetme: `.pc-foot > .save-bar > .btn-green.btn-sm` (kart başına) veya sayfa-seviye.
   - JS: tarif-ekle Pattern A idiom'u port (makeRow/addGroup + delegated delete + renumber).
5. **Sidebar nav item (3 mevcut dosyaya targeted edit):** `mekan-panel-v1`,
   `mekan-ayarlar-v1`, `mekan-rezervasyonlar-v1` sidebar'larına "İşletme Profili"den sonra,
   "Hesap" etiketinden önce:
   `<a class="pnl-link" href="mekan-menu-v1.html" data-nav="menu"><i class="fa-solid fa-utensils"></i> Menü</a>`.
   Yeni `mekan-menu-v1.html`'de bu link `.is-active`. (Header'a değil, panel sidebar'ına —
   panel sidebar header'dan ayrı.)

**Dokunulan dosyalar:** `mekan-detay-v1.html` (Menü tab + Şubeler section + `.disc-dist` CSS) ·
YENİ `mekan-menu-v1.html` · `mekan-panel-v1.html` · `mekan-ayarlar-v1.html` ·
`mekan-rezervasyonlar-v1.html` (son 3'ü sadece 1 satır nav item).

---

## 4. Domain Analizi — Tek CC mi, Modül-içi Team mi?

**Dosya/çakışma haritası:**
- `mekan-detay-v1.html` → Menü-public **VE** Şubeler birlikte → **tek-owner zorunlu** (aynı dosya).
- `mekan-menu-v1.html` (yeni) + 3 sidebar edit → ayrı dosyalar, public'le çakışmaz.

**Teorik bölünme:** (A) public mekan-detay [Menü tab + Şubeler], (B) panel mekan-menu + nav.
Disjoint dosyalar → worktree ile 2 teammate paralel mümkün.

**KARAR: TEK CC, sıralı alt-adımlar.** Gerekçe:
1. **Paylaşılan kontrat = veri modeli.** Public `.dish-card` alanları ile panel form alanları
   birebir aynı olmak zorunda (§2). Bölünürse iki agent yine bu seti üzerinde anlaşmak
   zorunda — koordinasyon maliyeti, paralellik kazancını aşar.
2. **Tüm pattern'lar mevcut, port işi — icat yok.** dish-card, disc-card, md-similar,
   ie-list/makeRow, fk-*, up-zone hepsi hazır. Risk düşük, mekanik. Derin paralel keşif
   bitti (bu research turu).
3. **Doğal sıra lineer:** veri modeli sabitle → panel editör kur → public görümü editörle
   eşleştir. Paralel değil, ardışık.
4. Yüzey orta büyüklükte: 1 dosyaya 2 additive section + 1 yeni panel sayfası (shell kopyası)
   + 3 trivial nav edit. Tek kafa rahat taşır; worktree setup overhead'i gereksiz.

> Hız öncelikli olsaydı public-taraf ve panel-taraf 2 worktree teammate olabilirdi; ama
> veri-modeli kontratı tek-owner'ı daha temiz kılıyor. **Öneri: tek CC.**

---

## 5. DONE Kriteri + Doğrulama Planı

**DONE:**
- [ ] `mekan-detay` "Menü" sekmesi: tıklanınca pane açılıyor, `?tab=menu` deep-link çalışıyor,
      kategoriler + ürün kartları (ad/fiyat/görsel/desc) render; diğer sekmeler bozulmadı.
- [ ] `mekan-detay` "Diğer Şubelerimiz" section: 3 şube kartı, mesafe rozeti, görsel cover;
      "Benzer mekânlar" ile görsel ayrım var.
- [ ] `mekan-menu-v1.html`: kategori/ürün ekle-sil çalışıyor (Pattern A), fiyat suffix,
      görsel thumb, panel yeşil aksanı, sidebar "Menü" aktif.
- [ ] 3 panel sayfasında "Menü" nav item göründü, link doğru.
- [ ] Header hiçbir dosyada değişmedi; yeni renk yok; tüm görseller div+bg-image.

**Doğrulama (her çıktı için — "bitti" auto-accept yok):**
1. **Render SS** `v6/.ss-scratch/qa-shot.js <page> [tag]` → 3 viewport (1440/768/390),
   `outputs/`'a. Kendi self-verify: kategori başlıkları, ürün kart hizası, şube grid kolon
   reflow (3→2→1), panel form satır grid'i mobilde reflow.
2. **Playwright davranış testi** (`.ss-scratch` altında kendi script):
   - mekan-detay: "Menü" tab click → `#pane-menu.active` görünür + URL `?tab=menu`;
     başka tab'a geçince Menü gizlenir. console/pageerror temiz.
   - mekan-menu: "+ Ürün Ekle" → satır DOM'a eklendi (count ölçümü); "+ Kategori Ekle" →
     yeni kategori kartı; sil butonu → satır kalktı. pageerror yakalama.
3. **Yazılı rapor** (ne değişti + kontrol sonucu), crop yok.

---

## 6. Kararlar (Beyar onayladı — 2026-06-18)

- ✅ **Lezzetler ↔ Menü:** İkisi ayrı kalsın (Lezzetler=imza yıldızlar, Menü=tam liste öğün kategorili).
- ✅ **Şube yerleşimi:** Full-width section, "Benzer mekânlar"dan önce.
- ✅ **Panel:** Yeni `mekan-menu-v1.html` sayfası (panel-shell kopyası + sidebar nav item).
- ✅ **Domain:** Tek CC, sıralı alt-adımlar (§4).

### Kalan küçük kararlar / notlar
1. **"Öne Çıkan Lezzetler" ↔ "Menü" ilişkisi.** [KARARLAŞTI: ayrı] Lezzetler zaten name+price+image+desc
   gösteriyor → iki sekme redundant görünebilir.
   - **Öneri (A): İkisi ayrı kalsın, çerçeve netleşsin.** Lezzetler = *imza/öne çıkan*
     (az, kürate, "Menünün Yıldızları" eyebrow'u zaten bunu söylüyor); Menü = *tam liste,
     öğün kategorili*. Gerekçe: gerçek restoran siteleri "popüler/şefin önerisi" ile tam
     menüyü ayırır; mevcut Lezzetler içeriğini bozmadan üzerine eklemek en az-müdahale yol.
   - Alt: (B) Lezzetler'i kaldırıp tek "Menü"de "öne çıkan" rozetiyle birleştir — daha temiz
     IA ama mevcut onaylı bölümü söker (Dalga 1 polish'i geri alır), önermiyorum.

2. **"Diğer Şubelerimiz" yerleşimi: full-width section mı, tab mı?**
   - **Öneri: full-width section** ("Benzer mekânlar"dan önce). Gerekçe: şube listesi
     keşif-amaçlı, sayfa akışında görünür olmalı; tab'a gömülürse keşfedilmez. disc-grid
     3-kol full-width'te doğru render; dar pane'de değil. Task tanımı da "section" diyor.

3. **Menü sekmesi tab sırası.** Öneri: Genel → Lezzetler → **Menü** → Yorumlar. Gerekçe:
   Menü kavramsal olarak Lezzetler'in yanında; yorumlar/adres'ten önce gelir.

4. **Panel: yeni sayfa mı, mekan-ayarlar'a tab mı?**
   - **Öneri: yeni `mekan-menu-v1.html` sayfası.** Gerekçe: menü = iç-içe/tekrarlı veri
     (kategori→çok ürün, her biri görsel+fiyat+desc) → ayarlar'ın tek-seviye pane layout'unu
     ve `NAVMAP` tab-sync JS'ini zorlar/şişirir; Rezervasyonlar da (liste-ağır domain) ayrı
     sayfaya alınmış — aynı desen. Sidebar'da yer açık. Hafif yol (ayarlar'a 4. tab) mümkün
     ama yapısal olarak kirli; önermiyorum.

5. **Şube kartı mesafe değeri.** Statik mockta sabit makul km mi, yoksa "ana şubeden X km" mi?
   Öneri: sabit makul km rozeti (kesfet ile tutarlı görsel), gerçek hesap stack kararı sonrası.

6. **Menü panel sayfasının başka owner sayfalarıyla nav tutarlılığı.** Nav item 3 mevcut
   panel dosyasına da eklenmeli (yoksa sayfalar arası nav tutarsız). Öneri: 3'üne de ekle —
   trivial 1-satır edit. (Plana dahil edildi, madde 3.5.)
