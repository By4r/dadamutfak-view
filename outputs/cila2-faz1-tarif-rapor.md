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

---

## REVİZE TURU (Görev #6 — R0-R3 + Arşiv)

### R0 — ₺₺₺ etiketi "Yüksek Bütçe" → "Premium"
- kategori-v1 + tarif-liste-v1: `.r-cost title="Yüksek bütçe"` → `title="Premium"` (4 kart).
- tarif-liste Bütçe facet: `value="Yüksek Bütçe"` + label "Yüksek (₺₺₺)" → `value="Premium"` + "Premium (₺₺₺)".
- CSS açıklama yorumları güncellendi. TD chip ₺₺ (Orta) olduğundan değişmedi. Grep: "Yüksek bütçe" = 0.

### R1 — tarif-detay galeri boşluğu giderildi
- Sorun: thumb şeridi kalkınca künye kolonu sahneden uzun kalıp sahne ALTINDA boşluk bırakıyordu.
- Çözüm: `.rd-gallery{align-items:stretch}` + `.rd-stage{height:100%;min-height:480px}` → sahne künye
  yüksekliğine uzar. Probe: stageH=584 = kunyeH=584, **dif=0** (boşluk yok).

### R2 — video butonu sadeleşti
- `▶ Tarif Videosu` glass pill → sade **`▶ 04:32` süre rozeti** (radius-sm, .mt dili; blur+shadow "süs"
  kaldırıldı). Tıkla → mevcut `.video-modal` açılır (probe: vm0=false→vm1=true→vm2=false).
- Sahnedeki yedek `.m-types` (▶8:40 + 🖼10) KALDIRILDI (artık galeri yok, mükerrer katmandı).
  vm-title süresi 04:32'ye eşitlendi. Mobil: rozet süre görünür (icon-only değil).

### R3 — facet kategori ikonları → görselli panel (urun-liste mirası)
- `.fct-ico` (FA mini ikon) KALDIRILDI → urun-liste-v1 `.cat-fct .cn-thumb` görselli pattern'ı VERBATIM mirası
  (38px gerçek yemek görseli, cbx gizli, seçili → tomato outline).
- kategori-v1 "Alt Kategori" (8 görsel) + tarif-liste "Kategori" (10 görsel). Tüm görsel URL'leri curl 200.
  Dünya Mutfağı bayrak pattern'ı korundu.

### ARŞİV — legacy anasayfa varyantları
- `git mv` ile mockups/arsiv/ altına taşındı (15 dosya): tüm `anasayfa-*` (v3a HARİÇ) +
  anasayfa.html + `.anasayfa-cookpad-deneme.bak.html`.
  (athleats/cookpad/kinfolk/obys-deneme, masa, modern, myrecipes, premium, uzman, portal, portal-v2/v3b/v3c)
- KANIT: `mockups/` root'ta tek anasayfa* = `anasayfa-portal-v3a.html` (266 inbound ref, canonical home intact).
  Hiçbir root sayfası arşivlenen dosyaya link vermiyor (href/src + onclick/JS + düz "anasayfa.html" tarandı → NONE).

### Revize kanıt (probe6, iframe deterministik)
`vbtn_txt=04:32 | mtypes_on_stage=false | vm0/1/2=false/true/false | stageH=584 kunyeH=584 dif=0 |
kat_cnthumb=8 | lst_cnthumb=10 | ovf k=OK l=OK d=OK` · CSS */ trap CLEAN · fct-ico=0.
SS: mockups/.ss-scratch/cila2/tarif/{detay-r1r2-crop, liste-r3-facet, detay-r1check}.png

---

## REVİZE R14 — tarif-bulucu üst bölge ferahlatma (Görev #11)

### Sorun
Dolap (malzeme seçimi) + filtreler 316px dar sol sticky panele sıkışmıştı; raf malzemeleri
2-3'erli dar sarıyor, birincil etkileşim daralıyordu.

### Araştırma
- **Eski template (tarif-bulucu.html):** ORTADA tam genişlik arama bandı ("Dolapta Ne Var? / Ne Yok?"
  sekmeleri) + seçilen malzeme chip'leri + ALTTA 3 kolon sonuç grid'i (col-lg-4).
- **nefisyemektarifleri.com (malzemeye göre arama):** direkt WebFetch 403 verdi; WebSearch + referans
  uygulamalar (SuperCook, nepisirsem.com) ile doğrulandı → belirgin/öne çıkan malzeme seçici (liste/chip) +
  sonuçlar bitişik/altta. Sol-dar-panel deseni DEĞİL.
- Ortak desen: **üst geniş kriter → altta geniş sonuç**. v1 bunu sol sidebar'a sıkıştırarak sapmış.

### Değerlendirilen 3 yerleşim
- **A (SEÇİLDİ):** Tam genişlik ÜST dolap kartı — arama hero + seçilenler şeridi tam genişlik;
  altta RAFLAR (geniş, nefes alır) | FİLTRELER (dar sağ kolon). Sonuçlar altta 3 kolon.
  Eski template + nefis pattern'ına sadık; **tüm öğeler tek `#dolap` wrapper'ında kalır → JS ve
  mobil sheet kurgusu sıfır risk** (pure CSS).
- **B (red):** Üstte yatay sekmeli (kategori tab) raf seçici. Daha kompakt ama YENİ tab JS gerektirir,
  mevcut `.fct` akordeon mirasını bozar → "işlev bozulmaz + 1 turda oturt" ilkesine aykırı, risk yüksek.
- **C (red):** Üst dar arama + sol ikincil filtre + sağ sonuç (rafları top'a almadan). Asıl sıkışıklığı
  (raflar) çözmez.

### Uygulama (A — yalnız yerleşim, pure CSS `@media (min-width:1025px)`)
- `.tb-layout` 2-kolon grid → tek kolon (dolap üstte tam genişlik, sonuç altta).
- `.dolap` desktop: sticky-dar → statik tam genişlik kart.
- `.dolap-body` `grid-template-areas` ile: `search` / `hint` / `strip` tam genişlik; `shelves`(1fr) | `filters`(304px).
- `.tb-grid` desktop 2→3 kolon. DOM ve JS'e **dokunulmadı**; ≤1024 sheet kurgusu aynen.

### Kanıt (probe7, iframe deterministik)
`desk_ovf=OK | mob_ovf=OK | dolapW=1176 = gridW=1176 (artık tam genişlik, eski 316px) |
dolap_above_results=true | raf_sel=true count 4→5 (seçim+sayaç çalışıyor) | tbgrid_cols=3 |
mob_sheet_open=true (mobil sheet açılıyor)` · CSS */ trap CLEAN.
SS: mockups/.ss-scratch/cila2/tarif/{bulucu-desk, bulucu-mob}.png (1440 + 500)
