# CİLA-2 Faz 1 — TARİF modülü raporu

> Teammate: tarif · Takım: cila2-faz1 · Görev #1
> Sahiplik: `mockups/kategori-v1.html`, `mockups/tarif-liste-v1.html`,
> `mockups/tarif-detay-v1.html` (headA senkron gerekmedi — değişiklikler
> ortak hero/galeri yapısına dokunmadı)

## Yapılanlar (madde madde)

### 1. Hero "popüler" yan başlığı bold
- `kategori-v1`: `.lh-chips .lbl{...;font-weight:700}` → "Bu kategoride popüler:" kalın.
- `tarif-liste-v1`: aynı kural → "Popüler:" kalın.
- Hero/breadcrumb YAPISINA dokunulmadı (yalnız label font-weight, scope kilidi korundu).

### 2. Kategori filtre paneli ikonlu (modernize)
- Eski sitedeki cartoon `assets/imgs/categories/*.webp` ikonları İNCELENDİ → **kullanılmadı**.
  Yerine düz/modern **FontAwesome mini ikon** + domates-tint yuvarlak kare (`--radius-sm`).
- Yeni bileşen: `.fct-ico` (28px, `--tomato-tint` zemin, domates ikon; hover/checked → dolu domates).
  Mega menü kategori→ikon eşlemesi MİRAS alındı (icat yok).
- `kategori-v1` "Alt Kategori" facet'i (8 satır): bowl-food / fire-burner / bacon / carrot /
  bowl-rice / drumstick-bite / fish / utensils.
- `tarif-liste-v1` "Kategori" facet'i (10 satır): mega menü eşlemesinin birebiri
  (bread-slice, drumstick-bite, bowl-food, bacon, seedling, egg, bottle-droplet, leaf, ice-cream, mug-hot).
- "Dünya Mutfağı" facet'i bayraklı (flagcdn) kaldı — dokunulmadı.

### 3. Tarif kartlarına maliyet seviye rozeti (₺ / ₺₺ / ₺₺₺)
- TL fiyat DEĞİL → 3 kademeli ₺ ölçek. Yeni bileşen `.r-cost` (dolu ₺ domates `.rc-on`,
  boş ₺ soluk `.rc-off`), `.r-facts` şeridinin son öğesi (otomatik ayraç).
- **TD'de mevcut maliyet bilgisi** olarak `tarif-liste-v1`'in **"Bütçe" facet'i** bulundu
  (Ekonomik ₺ · Orta ₺₺ · Yüksek ₺₺₺). Rozet dili buna birebir oturtuldu → site-içi tutarlılık.
- 9 kart (kategori) + 9 kart (liste) seviyeye göre işaretlendi.
- Tutarlılık eki: `tarif-detay-v1` künyesine `kc-chips` içine **"Orta Bütçe (₺₺)"** chip'i eklendi
  (mevcut chip ailesi; künye 4-hücre grid'i bozulmadan).

### 4. tarif-liste sağ üst: grid ⇄ liste görünüm geçişi
- Kanonik `.vw-seg .vs-btn` dili (kılavuz §2e) kullanıldı — `.sort-btn`'in soluna eklendi.
- Liste görünümü tasarlandı: `.lst-grid.is-list` → kart yatay satır (media 300px sol + gövde sağ,
  büyük başlık, tüm facts + cost). `@media(min-width:641px)` ile sınırlı; mobilde grid zaten
  satır olduğu için segment gizli (`.vw-seg{display:none}` ≤640).
- ÇALIŞIR JS: `#vwSeg` click → `setView()` (is-list toggle + buton durumu + aria-pressed),
  `?view=list` derin link. Eski template (tarifler.html) toggle kurgusu referans alındı.

### 5. tarif-detay: thumb şeridi kaldırıldı + video butonu interaktif
- `.rd-thumbs` markup'ı KALDIRILDI; galeri tek satıra düştü (`.rd-gallery` 2-satır→1-satır,
  `.kunye-col` grid-row 1/3→1, sahne 440px künyeyle hizalı).
- Ana görselin **sağ üstüne** `.rd-vbtn` ("▶ Tarif Videosu" glass buton, mobilde icon-only).
- Tıklayınca mevcut `.video-modal .vm-frame` (kılavuz §2) açılıyor — markup zaten `</main>`
  SONRASINDA (lessons uyumlu); kapatma + ESC + backdrop çalışıyor.
- Temizlik: ölü `.rd-stage-play` markup'ı + thumb→sahne JS kaldırıldı; sahne tıkla→lightbox
  artık tek görsel; lightbox stage handler `.rd-vbtn`'i yok sayıyor.

### Dil kuralı
- Kendi setimdeki **"Dada Denedi" → "Şefin Tercihi"** (kategori + liste r-tried rozeti). Grep = 0.

## Kanıt (SS + probe yolları)
SS dizini: `mockups/.ss-scratch/cila2/tarif/`
- Desktop: `kategori-v1-desktop.png`, `tarif-liste-v1-desktop.png`, `tarif-detay-v1-desktop.png`
- Liste görünümü: `liste-listview.png` (+ `liste-listview-crop.png`)
- Mobil (500px): `kategori-mobile.png`, `liste-mobile.png` (+ `liste-mobile-cards.png`),
  `detay-mobile.png`, `kategori-mobile-sheet.png`
- Detay crop: `kat-facetcol.png` (ikonlar), `kat-poplbl2.png` (bold label),
  `kat-cardfacts2.png` (₺ pips), `det-hero.png` (video butonu)

### Probe sonuçları (deterministik, iframe same-origin)
- **Görünüm toggle** (`probe.html`): `init_islist=false → afterList_islist=true`
  `listBtn_on=true gridBtn_on=false → afterGrid_islist=false`; `rcost=9 fctico=10`. ✓
- **Video modal** (`probe2.html`): `vbtn=true thumbs=false stageplay=false`
  `vm_init_open=false → vm_after_open=true → vm_after_close=false`; `budgetchip=true`. ✓
- **390px taşma** (`probe3.html`): kategori OK · liste OK · detay OK (yatay scroll yok). ✓
- CSS yorumunda `*/` trap grep: CLEAN. "Dada Denedi" grep: 0/0/0.

## Beyar incelemesi bekleyenler
1. **Maliyet etiket adı**: rozet, mevcut "Bütçe" facet'iyle hizalı → "Yüksek" (₺₺₺).
   Görev metni "Premium" diyordu; site-içi tutarlılık için **"Yüksek bütçe"** seçildi
   (lessons: site-içi tutarlılık dış referansı yener). Premium tercih edilirse facet +
   rozet title'ları birlikte değişmeli.
2. **TD künye maliyet**: 5. künye hücresi 2×2 grid'i bozacağı için maliyet bilgisi
   künye `kc-chips`'ine chip olarak eklendi (rdf satırı yerine). Onayına sunulur.
3. **Ölü CSS**: `.rd-thumbs/.rd-thumb/.rd-stage-play/.video-mode` taban kuralları dosyada
   kaldı (markup yok → zararsız). İstenirse temizlik turunda silinebilir.
4. Kart maliyet seviyeleri mockup verisi — gerçek tarif maliyetiyle eşlenmedi (tasarım amaçlı dağıtım).
