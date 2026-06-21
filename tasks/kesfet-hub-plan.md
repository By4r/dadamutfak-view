# Keşfet Hub — Uygulama Planı (Yaklaşım A)

> **Karar:** Nav "Keşfet" → `kesfet-v1.html`, **Mekanlar | Gurme Lezzetler** iki tab'lı
> tek kanonik hub. Ana sayfa `discover` bölümünün `paneMekan/paneGurme` tab mantığı
> referans. Varsayılan aktif tab = **Mekanlar**. Bu dosya plandır — implement onay sonrası.
> Tarih: 2026-06-15

---

## 0. Mevcut durum (ölçüldü)

**`kesfet-v1.html` (2094 sat):**
- `#keGrid` (ke-grid-view): hub hero (crumb `Ana Sayfa › Keşfet`, eyebrow "Lezzet Rehberi",
  H1 "Keşfet — gidilecek mekânlar, denenecek lezzetler", lead) + `.ke-filter` chip rayı
  (Hepsi / **Mekânlar** / Gurme Lezzetler / Etkinlikler / Lezzet Rotaları / Söyleşi) +
  `#keSub` bağlamsal alt-kategori + `.disc-grid` (17 kart: `data-open` editöryal + bazı
  `onclick=mekan-detay-v1.html`).
- `#keDetail` (ke-detail-view art-wrap, hidden): uzun-form makale; `#artBack` "Keşfet'e dön",
  `#crumbKesfet`.
- JS: grid↔detail toggle (`openDetail/closeDetail`, `history.pushState ?detay=1`,
  `popstate`, `?detay=1` derin link); `data-open` → makale; `.ke-filter .chip` → `renderSub`
  (SUBMAP içinde "Tüm Mekânlar" → `mekan-liste-v1.html` sf-go linki, satır 2029).

**`mekan-liste-v1.html` (2268 sat):**
- `<main id="pageMain">` → `.lst-top` hero (crumb `Ana Sayfa › Keşfet › Mekânlar`,
  eyebrow, H1 "Şehrin sofrası: mekân rehberi", `.lh-chips` Popüler chip'ler,
  `.lst-stats` 124/9/8.4B) → `.lst-sec` → `.lst-layout` (grid `272px minmax(0,1fr)`):
  - `aside.lst-side#lstSide` facet sidebar (Konsept/semt/mutfak/bütçe/puan; mobilde
    `.sheet-head/.sheet-body/.sheet-foot` bottom-sheet),
  - `.lst-main` → `.lst-bar` (`#lstSum` "124 mekân", `#btnFilter`, `.sort-dd#sortDd`) +
    `#fchips` aktif filtre + `.mkl-grid#mklGrid` (18 mekan kartı → `mekan-detay-v1`).
- CSS: `.lst-layout` 2-kolon; `@1024` → block + `.lst-side` bottom-sheet (`translateY`);
  `.mkl-grid` 2-kolon. 2 script bloğu (1772, 2241): facet aç/kapa + sort dd + sheet
  open/close + fchips + sayaç.

**Namespace çakışma analizi (kritik):**
- ORTAK kanon (ikisinde de AYNI tanım, güvenli): `.disc-card`, `.disc-grid`, `.disc-fig`,
  `.eyebrow`, `.rd-crumb`, `.see-all`, `.chip` (taban).
- mekan-liste'ye ÖZGÜ (kesfet'te YOK → temiz taşınır): `.lst-*`, `.fct-*`, `.sort-*`,
  `.mkl-grid`, `.sheet-*`, `.btn-filter`, `.fchips`, `.fil-*`.
- kesfet'e ÖZGÜ: `.ke-*`, `.art-*`, `.disc-feature`.
  → **Disjoint namespace; CSS yan yana yaşar.** Sadece taşımadan önce kesfet `<style>`
  içinde `.lst-`/`.fct-`/`.sort-` zaten tanımlı mı diye negatif grep (beklenen: ∅).

**Üretim linkleri (mekan-liste-v1'e — .ss-scratch/outputs hariç sadece 3):**
1. `anasayfa-portal-v3a.html:2259` — `#discSeeAll` href + JS satır 2841 (tab'a göre swap).
2. `mekan-detay-v1.html:1512` — breadcrumb "Mekânlar".
3. `mekan-detay-v1.html:1981` — see-all "Tüm Mekânlar".
+ `kesfet-v1.html:2029` — SUBMAP "Tüm Mekânlar" sf-go (hub içine taşınınca tab-switch olur).

---

## 1. Tab yapısı + JS

**Referans:** ana sayfa `discover` (`.dt` butonları → `.disc-pane[hidden]` toggle, ~8 satır).
Tam sayfada birebir kullanılabilir; sadece içerik ağır olduğu için pane'lerin İÇİ farklı.

**Markup iskeleti (hub gövdesi yeniden düzenlenir):**
```
<div id="keBrowse">                         ← tab bar + iki pane sarmalı (makale açılınca gizlenir)
  <section .ke-top> HUB HERO </section>     ← TEK hero (kesfet'inki korunur)
  <div class="disc-tools ke-tabs">          ← tab barı (hero altı, panel üstü)
    <div class="disc-tabs">
      <button class="dt active" data-pane="paneMekan"><i fa-location-dot></i> Mekanlar</button>
      <button class="dt" data-pane="paneGurme"><i fa-pen-nib></i> Gurme Lezzetler</button>
    </div>
  </div>
  <div class="disc-pane" id="paneMekan"> … MEKAN FACET LAYOUT … </div>
  <div class="disc-pane" id="paneGurme" hidden> … EDİTÖRYAL FEED … </div>
</div>
<div class="ke-detail-view art-wrap" id="keDetail" hidden> … MAKALE … </div>
```

**JS (yeni tab toggle — ana sayfa pattern'ı):**
```
document.querySelectorAll('.ke-tabs .dt').forEach(function(t){
  t.addEventListener('click',function(){
    setTab(t.getAttribute('data-pane'));               // ortak fonksiyon
    history.pushState({tab:...},'','?tab='+key);       // derin link
  });
});
function setTab(paneId){
  .dt aktif class swap; .disc-pane hidden = (id!==paneId);
}
```
- Varsayılan: `paneMekan` aktif, `paneGurme` hidden.
- `?tab` yoksa Mekanlar.

## 2. Mekanlar pane göçü

`mekan-liste-v1`'in `.lst-sec` bloğu (facet sidebar + sonuç kolonu) **olduğu gibi**
`#paneMekan` içine taşınır:
- **Markup:** `.lst-layout` (→ `aside.lst-side#lstSide` facet + `.lst-main` lst-bar + mkl-grid).
  `.lst-top` HERO bloğu (lst-hero stats + popüler) **TAŞINMAZ** — hub hero zaten var (§3).
  - *Opsiyon:* `.lh-chips` "Popüler" hızlı-seçim şeridini paneMekan'ın en üstüne (lst-bar
    üstü) kompakt olarak almak istersek alınır; `.lst-stats` (124/9/8.4B) düşürülür.
    **Öneri:** ikisini de düşür (çift-hero/dekoratif), facet zaten filtrelemeyi karşılıyor.
- **CSS:** `.lst-sec/.lst-layout/.lst-side/.fct-*/.sort-*/.lst-bar/.mkl-grid/.fchips/
  .sheet-*/.btn-filter/.fil-*` kuralları + `@1024` ve `@640` mekan blokları kesfet `<style>`'a
  kopyalanır.
- **JS:** mekan-liste'nin facet aç/kapa + sort dd + bottom-sheet open/close + fchips + sayaç
  bloğu kesfet JS'ine eklenir. ID'ler (`lstSide,btnFilter,sortDd,sortBtn,mklGrid,fchips,
  lstSum,sheetClose,sortCur,filCount`) kesfet ID'leriyle çakışmaz → güvenli.

## 3. İki layout iskeleti tek sayfada (CSS scope)

- Çakışma yok çünkü namespace disjoint (§0). Yine de **savunmacı scope**:
  `#paneMekan .lst-layout{…}` gibi pane-altı seçici ŞART DEĞİL ama tercih edilir →
  ileride kazara sızıntı olmaz.
- **TEK hero:** hub hero `.ke-top` (kesfet) korunur; `.lst-top` (mekan) hero'su taşınmaz.
- **`.ke-filter` chip rayı** artık SADECE Gurme pane'ine ait olur (§4); **"Mekânlar" concept
  chip'i KALDIRILIR** (tab oldu, tekrar olmasın). Kalan: Hepsi/Gurme/Etkinlik/Rota/Söyleşi.
- Sticky: `.lst-side{top:130px}` korunur; tab barı **sticky DEĞİL** (basit) → facet sticky
  hesabı bozulmaz. (Tab sticky istenirse scroll-padding eklenir, ilk turda yapma.)

## 4. Gurme pane

- Mevcut editöryal feed (`.ke-filter` chip rayı [Mekânlar hariç] + `#keSub` + `.disc-grid`
  + `data-open` kartlar) `#paneGurme` içine alınır — **yapı korunur**.
- `#keDetail` (makale view) ve grid↔detail toggle **KORUNUR**; tek fark: toggle artık
  `#keGrid` yerine `#keBrowse`'u gizler:
  - `openDetail`: `keBrowse.hidden=true; keDetail.hidden=false`.
  - `closeDetail`: tersi; kapanınca **aktif tab Gurme'ye** set edilir (makale Gurme'den açıldı).
- `data-open` kartlar yalnız Gurme pane'inde; Mekan kartları `onclick=mekan-detay-v1` kalır.
- SUBMAP "Tüm Mekânlar" sf-go → artık dış link değil; **Mekanlar tab'ına geçiş**
  (`setTab('paneMekan')`) olur.

## 5. Derin link

- `?tab=mekan` → paneMekan aktif; `?tab=gurme` → paneGurme aktif; param yok → Mekanlar.
- `?detay=1` (mevcut) → makale view; `?tab=gurme&detay=1` kombinasyonu desteklenir
  (önce tab set, sonra openDetail).
- Yükleme sırası: `URLSearchParams` → tab set → detay varsa openDetail(false).
- `popstate`: hem `tab` hem `detay` paramına bakıp durumu kurar.
- pushState: tab değişiminde `?tab=…`, makale açılışında `?tab=…&detay=1`.

## 6. `mekan-liste-v1` akıbeti — **ÖNERİ: redirect stub**

İçerik tamamen hub'a taşındığı için sayfa boşalır. İki yol:
- **(A) Redirect stub (ÖNERİLEN):** dosya korunur ama gövdesi `<meta http-equiv="refresh"
  content="0;url=kesfet-v1.html?tab=mekan">` + JS `location.replace(...)` + `<link rel=
  canonical>` ile hub'a yönlendirir. **Neden:** dışarıdan/yer-imi/eski link 404 olmaz;
  GH Pages statik, redirect ucuz; envanter "stub" notuyla 71'de kalır.
- (B) Sil + tüm linkleri güncelle: daha temiz envanter ama 404 riski (kontrolümüz dışı linkler).
- **Karar önerisi: A.** Ayrıca §0'daki 3 üretim linki yine de doğrudan hub'a güncellenir
  (stub sadece emniyet ağı).

**Link güncelleme planı (3 üretim + 1 SUBMAP):**
| Dosya:satır | Şu an | Yeni |
|---|---|---|
| anasayfa 2259 `#discSeeAll` | `mekan-liste-v1.html` | `kesfet-v1.html?tab=mekan` |
| anasayfa 2841 JS swap | mekan→`mekan-liste-v1`, gurme→`kesfet-v1` | mekan→`kesfet-v1.html?tab=mekan`, gurme→`kesfet-v1.html?tab=gurme` |
| mekan-detay 1512 crumb | `mekan-liste-v1.html` | `kesfet-v1.html?tab=mekan` |
| mekan-detay 1981 see-all | `mekan-liste-v1.html` | `kesfet-v1.html?tab=mekan` |
| kesfet 2029 SUBMAP sf-go | `mekan-liste-v1.html` | tab-switch (`setTab('paneMekan')`) |

## 7. Ana sayfa `discover` güncellemesi

- `#discSeeAll` default href → `kesfet-v1.html?tab=mekan` (§6 tablo).
- JS satır 2841: aktif tab'a göre `sa.href` → Mekanlar `?tab=mekan`, Gurme `?tab=gurme`.
- paneGurme kart `onclick='location.href=kesfet-v1.html'` → `kesfet-v1.html?tab=gurme`
  (3 kart). paneMekan kartları `mekan-detay-v1.html` kalır (değişmez).
- Ana sayfanın 2-tab `discover` bölümü **AYNEN kalır** (özet/landing rolü); sadece "Tümünü
  Gör" ve gurme kartları artık hub'ın doğru tab'ına gider.

## 8. Nav/drawer "Keşfet" href

- Nav (1485) + drawer (1575) `kesfet-v1.html` → **DEĞİŞMEZ**.
- Davranış: hub `?tab` olmadan açılır → **Mekanlar varsayılan aktif**.
- Aktif-state: kesfet sayfasında nav "Keşfet" zaten `.active` (teyit edilecek; gerekiyorsa
  60-sayfa sweep DIŞI, tek sayfa).

## 9. Mobil / responsive

- **Tab barı:** 2 öğe, mobilde inline sığar (gerekirse `overflow-x:auto` — ana sayfa
  disc-tabs deseni). Sticky değil.
- **Mekanlar pane:** mekan-liste'nin `@1024` davranışı taşınır → facet sidebar **bottom-sheet**
  (`#btnFilter` açar, `#sheetClose`/overlay kapatır); `.mkl-grid` 2-kolon. `@640` mekan
  blokları da taşınır.
- **Gurme pane:** `.ke-filter` zaten `@max-width:640` `overflow-x:auto` (kesfet 898).
- **TEK alt-şerit kuralı:** her iki dosyada kanonik `window.__bottomStrips` + bottom-nav
  yöneticisi var → kesfet'inki KORUNUR, mekan'dan İKİNCİ kopya taşınmaz (çift-init önle).
- Facet bottom-sheet açıkken bottom-nav/çerez şeridi çakışmamalı (mevcut kanon zaten yönetir;
  QA'da 390 teyit).

---

## Değişecek / eklenecek / silinecek dosyalar

| Dosya | İşlem |
|---|---|
| `v6/kesfet-v1.html` | **MAJOR**: hub hero koru + tab barı ekle + paneMekan göçü (facet/sort/sheet markup+CSS+JS) + paneGurme sarma + keDetail toggle'ı `#keBrowse`'a çevir + `?tab` derin link + SUBMAP sf-go→tab-switch |
| `v6/anasayfa-portal-v3a.html` | discSeeAll href + JS href swap + paneGurme 3 kart onclick |
| `v6/mekan-detay-v1.html` | 2 link (crumb + see-all) → `?tab=mekan` |
| `v6/mekan-liste-v1.html` | **redirect stub**'a dönüştür (öneri A) |
| Yeni dosya | **YOK** (hub = kesfet-v1 yeniden amaçlandı) |
| Silinen | **YOK** (mekan-liste stub kalır) |

## İş sırası

1. **Negatif grep** (kesfet'te `.lst-`/`.fct-`/`.sort-` var mı → ∅ beklenir) + ID çakışma teyidi.
2. **CSS göçü**: mekan `lst-*/fct-*/sort-*/mkl-*/sheet-*/btn-filter/fil-*/fchips` + `@1024`/`@640`
   blokları → kesfet `<style>` (pane-altı scope tercih).
3. **Markup**: kesfet gövdesini `#keBrowse` (hero + tab barı + paneMekan + paneGurme) + `#keDetail`
   olarak yeniden düzenle; `.lst-sec` içeriğini paneMekan'a taşı; editöryal feed'i paneGurme'ye;
   `.ke-filter`'dan "Mekânlar" chip'i çıkar.
4. **JS**: tab toggle + `?tab` derin link/pushState/popstate; mekan facet/sort/sheet JS göçü;
   keDetail toggle → `#keBrowse` gizle; SUBMAP sf-go → setTab.
5. **Link güncelle**: anasayfa (2) + mekan-detay (2).
6. **mekan-liste-v1 → redirect stub**.
7. **QA / render** (headless Chrome): desktop iki tab + makale aç/kapa; mobil 390/768 facet
   bottom-sheet + tab barı; derin link `?tab=mekan`, `?tab=gurme`, `?tab=gurme&detay=1`;
   nav Keşfet → Mekanlar varsayılan; ana sayfa Tümünü Gör → doğru tab.

## Risk noktaları

- **Çift hero**: `.lst-top` hero'su taşınırsa iki hero olur → SADECE hub hero kalmalı (§3).
- **"Mekânlar" concept chip tekrarı**: tab varken Gurme chip rayında kalırsa kafa karıştırır → kaldır.
- **JS çift-init**: header/drawer/cookie/bottom-strip ikisinde de var → mekan'dan SADECE
  facet/sort/sheet JS taşı, shell JS'i taşıma.
- **keDetail kapsamı**: artık `#keGrid` değil `#keBrowse` gizlenmeli (yoksa tab barı makalede
  görünür kalır).
- **Sticky offset**: facet `top:130px` + tab barı sticky değilse sorun yok; sticky yapılırsa
  hesap güncellenir.
- **Dosya şişmesi** (~2800+ sat): gelecekteki global sweep'lerde idempotency'e dikkat.
- **enableDrag selector**: kesfet `enableDrag` `.disc-grid`'i hedefler; `.mkl-grid` farklı class
  → yanlışlıkla kapılmaz (teyit).
- **Redirect stub** SS/probe altyapısında (footer-sweep LEGAL_PAGES vb) referans → stub'ın
  shell'i minimal olmalı, sweep'leri kırmamalı (veya sweep listesinden düş).
