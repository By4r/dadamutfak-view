# Sağlık Ailesi Renk Tutarlılığı — Rapor (teammate: saglik-renk · task #2)

> TURUNCU (domates marka) sağlık-aksanı → SAĞLIK YEŞİLİ `#3BB77E` (`var(--green)`).
> Cerrahi: yalnız sağlık-aksanı seçicileri; marka chrome + semantik renk + tarif
> kartı marka dili DOKUNULMADI. arama-v1.html'e YAZILMADI (başka teammate). COMMIT YOK.

## Kapsam — 10 sayfa (git numstat ile teyit, +ekleme/-silme)

| Sayfa | numstat | Şablon | Ne değişti |
|-------|---------|--------|------------|
| bazal-metabolizma-v1 | +8/-3 | hesaplayıcı | fk-focus, fk-help, hero crumb-hover, nav-Sağlık |
| beden-kutle-endeksi-v1 | +8/-3 | hesaplayıcı | aynı şablon |
| gunluk-kalori-v1 | +8/-3 | hesaplayıcı | aynı şablon |
| gunluk-su-v1 | +8/-3 | hesaplayıcı | aynı şablon |
| ideal-kilo-v1 | +8/-3 | hesaplayıcı | aynı şablon |
| vucut-tipi-v1 | +8/-3 | hesaplayıcı | aynı şablon |
| besin-kutuphanesi-v1 | +7/-2 | besin dizini | food-empty ikon, hero crumb-hover, nav-Sağlık |
| test-detay-v1 | +12/-7 | test çözme | pick (cevap kartı) base+hover, share-cp hover, crumb-hover, nav-Sağlık |
| diyetisyen-dizin-v1 | +45/-37 | liste/dizin | facet/sort/fchip/card/ribbon/empty/pagi/sheet full sweep + hero accent+eyebrow + CTA + nav |
| diyetisyen-ol-v1 | +29/-21 | başvuru formu | fc-head/focus/help/dropzone/uz-pick/gor-opt/stepper sweep + accent + captcha link + submit CTA + nav |

Toplam: **10 sayfa değişti.** arama-v1.html: BENİM imzam (`saglik-renk:`) 0 → dokunulmadı (numstat'taki 300/1 başka iş, pre-existing).

## AUDIT TABLOSU — sınıflandırma (A=sağlık aksanı→YEŞİL, B=marka chrome→bırak, C=semantik→bırak, D=tarif-kartı marka dili→bırak)

### Hesaplayıcı şablonu (6 sayfa, birebir aynı)
Şablon ZATEN büyük ölçüde yeşildi (calc-top yeşil-tint hero, eyebrow/calc-switch/fk-seg/btn-green/res-box/bridge yeşil). Kalan sağlık-aksanı turuncu sızıntıları:
- **A → YEŞİL:** `.fk-input:focus` (border+glow turuncu → `var(--green)` + `rgba(59,183,126,.12)`) · `.fk-help i` (yardım ikonu) · `.calc-top .rd-crumb a:hover` (`#ff8763`→`#7fe0b0`, koyu hero crumb)
- **A → YEŞİL (nav):** aktif "Sağlık" nav linki — chrome `.nav a.active{color:tomato}` override: `.nav a.active[href="saglik-hub-v1.html"]` → green (+ at-top beyaz korundu). Cerrahi attribute-selector, diğer dropdown'lar etkilenmez.
- **C → BIRAKILDI (semantik):** `.g-seg.s3/.s4` gauge ölçek = risk skalası (mavi→yeşil→**turuncu→kırmızı** = düşük→normal→yüksek→çok yüksek). Marka turuncu değil, RİSK anlamı.
- **D → BIRAKILDI (marka dili):** `.r-save/.r-card:hover h4/.r-facts i` = v3a "ilgili tarifler" kartı (§3 kart/meta dili).
- **şüpheli/BIRAKILDI:** `.fk-label .req` zorunlu-alan yıldızı turuncu — form-validation semantik (kırmızı/turuncu geleneği) + 6 hesaplayıcı + diyetisyen-ol'da TUTARLI. Yeşil "onay" çağrışımı zorunlulukla çelişir gerekçesiyle dokunulmadı.

### besin-kutuphanesi-v1
Sayfa zaten neredeyse tamamen yeşildi (searchbar/kategori-chip/food-row/kcal/nd-kcal/nut-table/macro-protein yeşil).
- **A → YEŞİL:** `.food-empty .fe-ico` boş-durum ikonu (turuncu-tint→`#EAF7F0`+green) · crumb-hover · nav-Sağlık
- **C → BIRAKILDI:** `.macro-bar .mf` + `.macro-leg .sw.f` = YAĞ makro rengi (protein=yeşil/karb=mavi/yağ=turuncu standart besin kodlaması)
- **D → BIRAKILDI:** r-card marka dili

### test-detay-v1
- **A → YEŞİL:** `.pick` cevap kartı ailesi — base `.pk-ico` + `.pick:hover` border (`rgba 225,72,39`→green) + `.pick.sel/.pk-ico/.pk-check` (qz-card scope'ta zaten yeşil override vardı ama base turuncu kalıntısı temizlendi; .pick yalnız quiz'de kullanılıyor) · `.share-btn.cp:hover` sonuç-paylaş kopyala (diğer share btn'ler platform renginde: X=siyah, WA=yeşil, ok=yeşil) · crumb-hover · nav-Sağlık
- **D → BIRAKILDI:** r-card "sıradaki testler/ilgili" marka dili

### diyetisyen-dizin-v1 (handoff'ta işaretli tutarsızlık — en kapsamlı)
Sayfa-CSS bölgesinde (chrome dışı) **tam turuncu→yeşil sweep**: hero eyebrow(`#ffd9cf`→green) + accent(`#ff7a5c`→`#54d39a`) + crumb-hover + lh-chip hover + fil-top/fil-clear + fct-dot/row/cbx/more + lst-sum sayaç + sort-btn/menu + btn-filter + fchip + dz-ribbon/save/card-hover/meta/go + le-ico empty + pagination + sheet. Token map: tomato→green, tomato-tint→`#EAF7F0`, tomato-dark→green-deep, rgba(225,72,39)→rgba(59,183,126), #ff8763→#7fe0b0.
- **A → YEŞİL (CTA):** `#sheetApply` (mobil filtre uygula) + `.lst-empty .btn-primary` (boş-durum temizle) — sağlık dizin gövde CTA'ları, sayfa-local override (global btn-primary marka kalır, drawer-login/feedback turuncu).
- **B → BIRAKILDI:** topbar "Diyetisyen Ol" CTA, logo, "Görüş Bildir" FAB, drawer/giriş btn-primary = marka chrome.
- **Hero overlay zemini DOKUNULMADI** (§2f) — `.lst-top` koyu-overlay zemini turuncu değil (rgba kahve), sadece hero İÇİ aksan vurguları yeşillendi.

### diyetisyen-ol-v1 (başvuru formu)
Sayfa-CSS sweep (req hariç): accent(`var(--tomato)`→`#54d39a`) + fc-head ikon + fk-focus/help + up-zone dropzone (border + hover bg `#F7DCD2`→`#DCEFE4`) + uz-pick + gor-opt:hover + sn-stepper (adım sayacı tüm durumları). Hero `.ol-top` zaten yeşil-tint overlay + eyebrow `#7fe0b0`.
- **A → YEŞİL (CTA/link):** `#olSubmit` "Başvuruyu Gönder" (sayfa-local green override) · captcha-note inline Gizlilik/Şartlar linkleri (`var(--tomato)`→`var(--green-deep)`)
- **şüpheli:** captcha reCAPTCHA yasal linkleri marka-link kategorisine yakın; sayfa-içi tutarlılık için yeşillendi (sayfanın tek turuncu kalıntısıydı).
- **B → BIRAKILDI:** drawer-login/feedback/giriş btn-primary marka chrome.
- **şüpheli/BIRAKILDI:** `.fk-label .req` (hesaplayıcılarla tutarlı, turuncu kaldı).

## Önce/Sonra SS yolları (standalone headless chrome, 1280×1600, render-göz teyitli)
- `outputs/saglik-renk-ss/{bazal-metabolizma-v1,besin-kutuphanesi-v1,test-detay-v1,diyetisyen-dizin-v1,diyetisyen-ol-v1}-before.png`
- `outputs/saglik-renk-ss/{...aynı 5}-after.png`
- Gözle teyit: sağlık-aksanı yeşil oldu · marka chrome (logo/topbar CTA/FAB/giriş) turuncu kaldı · layout bozulmadı · tarif kartı marka dili (r-card) turuncu korundu · gauge risk skalası turuncu korundu.

## DOKUNULMAYANLAR (kanon gereği)
- §2f hero markup/overlay zeminleri · _shell header/footer/topbar/drawer/bottom-nav/cookie/feedback marka chrome · r-card v3a tarif kartı dili (§3) · gauge + macro semantik renkleri · petrol `#006072` (DadaAkademi — bu sayfalarda yok) · arama-v1.html (başka teammate)

## ŞÜPHELİ BIRAKILANLAR (lead kararına açık)
1. **`.fk-label .req`** (zorunlu yıldız) — 7 formda turuncu bırakıldı. Tutarlılık + form-semantik gerekçesi. İstenirse yeşillenebilir.
2. **gauge s3/s4** (`.g-seg`) — risk skalası turuncu/kırmızı; semantik korundu, marka değil.
3. **besin macro yağ rengi** — turuncu (standart besin kodlaması); semantik.
4. **diyetisyen-ol captcha yasal linkleri** — yeşillendi ama marka-link sınırında; geri alınabilir.
5. **Sağlık dropdown İÇİ hover ikonları** (`.dropdown a` chrome) — sağlık dropdown açıkken 3 link hover'ı turuncu (genel dropdown chrome'u, tüm nav dropdown'larıyla PAYLAŞIMLI). Sağlık'a özel yeşil için 10 sayfada markup'a `.nav-item.health` hook gerekir = chrome fork riski. Görünür kazanç olan **aktif nav linki** yeşillendi; dropdown-içi hover lead kararına bırakıldı.
6. **test-detay ikili-active nav** — markup'ta hem "Tarifler" hem "Sağlık" `.active`. Override yalnız Sağlık'ı yeşilledi (Tarifler marka turuncu kaldı). İkili-active'in kendisi ayrı bir tutarsızlık (kapsam dışı).
