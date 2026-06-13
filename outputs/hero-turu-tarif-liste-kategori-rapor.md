# hero-turu — tarif-liste-kategori raporu

Teammate: **tarif-liste-kategori** · Takım: hero-turu · Baz commit: 12044a4

Görevler:
- **#4** — tarif-liste-v1 görselli alt-kategori/pişirme-tipi rayı (REVİZE: kategori-v1 `.subcat` deseni port) — ✅ **TAMAM** (14 görselli kart + render SS + scrollLeft probe + tıkla→facet + xtra grup açma + mobil 390 taşma OK)
- **#6 (EK-2)** — tarif-detay-v1 alışveriş listesi satırı tam-satır tıklanabilir — ✅ **TAMAM** (kod + yapısal probe: tüm satır tek `<a>`, cursor:pointer, iç içe anchor=0)

> **SS yöntemi notu:** Paylaşımlı Playwright MCP sürekli kilitliydi ("Browser already
> in use", takım yarışı). Lead önerisiyle **standalone headless chrome** kullanıldı
> (`--headless --screenshot` ve same-origin iframe + `--dump-dom` JSON probe) — kilit
> yok, kanıt eksiksiz alındı. SS'ler: `outputs/ss-hero-turu-kategori/`.

---

## EK-2 — tarif-detay-v1: alışveriş listesi satırı tam-satır tıklanabilir

### Sorun
Sağ sticky malzeme panelinin altındaki liste-durum satırında (`#listState`)
"Listende N malzeme — **Listeyi Gör →**" yalnızca `Listeyi Gör` köprüsü
tıklanabiliyordu; satırın geri kalanına ("Listende N malzeme" yazısı, sepet
ikonu) tıklamak hedefe gitmiyordu.

### Çözüm (mockups/tarif-detay-v1.html)
**1. HTML — satır tek `<a>` hedefine çevrildi (satır ~2771):**
```html
<a class="list-state" id="listState" href="alisveris-listesi-v1.html" aria-label="Alışveriş listesini gör" hidden>
  <i class="fa-solid fa-basket-shopping"></i>
  <span>Listende <b id="listCount">0</b> malzeme</span>
  <span class="ls-link">Listeyi Gör <i class="fa-solid fa-arrow-right"></i></span>
</a>
```
- Dış `<div>` → `<a href="alisveris-listesi-v1.html">` (tüm satır tek tıklama hedefi).
- İç `<a class="ls-link">` → `<span class="ls-link">` — **iç içe anchor (geçersiz HTML) ve çift-tetik engellendi.**
- `id="listState"` korundu → JS (`getElementById('listState')`, `state.hidden=...`) `<a>` üzerinde sorunsuz çalışır.
- `aria-label` eklendi (ikon+yazı yerine net erişilebilir ad).

**2. CSS — tam-satır clickable görünüm (satır ~1473, R12 bloğu altı):**
- `.list-state{display:flex;...;cursor:pointer;text-decoration:none}` — flex satır, imleç el.
- `.list-state[hidden]{display:none}` — `display:flex` UA `hidden` davranışını ezdiği için **zorunlu**; JS `state.hidden` toggle'ı bozulmaz.
- `.list-state:hover{border-color:rgba(225,72,39,.4);background:var(--tomato-tint)}` + ok kayma mikro-animasyonu — satır geneli hover sinyali.
- `.ls-link` artık `<span>`, görünüm korundu (tomato renk, ok ikon).

### Statik teyit
- `awk` ile `.list-state` bloğu içinde `<a>` sayısı = **1** (yalnız dış anchor → iç içe anchor yok). ✔
- `id="listState"` + `id="listCount"` korundu, JS referansları (3839–3840) bozulmadı. ✔
- R12 JS `.ing-add` click handler `e.stopPropagation()` zaten var; satır `<a>`'sı malzeme +/- butonlarını sarmıyor (ayrı blok `.ing-foot` içinde) → çift-tetik yok. ✔

### Tarayıcı kanıtı (headless chrome iframe probe — `_ek2probe`, sonra silindi)
Bir `.ing-add` tıklandı → `#listState` göründü, sonra satır incelendi:
```json
{"exists":true,"tagName":"A","href":"alisveris-listesi-v1.html","hiddenAfterAdd":false,
 "cursor":"pointer","innerAnchors":0,"lsLinkTag":"SPAN","listCount":"1"}
```
- `tagName:"A"` + `cursor:"pointer"` → **tüm satır tek tıklanabilir anchor** ("Listende N malzeme" yazısı dahil). ✔
- `href:"alisveris-listesi-v1.html"` → satırın herhangi bir yerine tıklama bu hedefe gider. ✔
- `innerAnchors:0` → **iç içe anchor yok**, `lsLinkTag:"SPAN"` → çift-tetik yok. ✔
- `hiddenAfterAdd:false`, `listCount:"1"` → JS `state.hidden` toggle'ı `<a>` üstünde bozulmadı. ✔
- SS: `outputs/ss-hero-turu-kategori/ek2-row-clickable.png` (satır görünür: sepet ikon + "Listende 1 malzeme" + "Listeyi Gör →", cursor:pointer).

### Bilinen Sınırlamalar
- Tıklama-navigasyon **yapısal olarak** kanıtlı (tüm satır tek `<a href>`); ayrıca gerçek
  bir `browser_click→URL` adımı yapılmadı çünkü MCP kilitliydi — ancak tek-anchor yapısı
  bunu gereksiz kılıyor (tarayıcı her tıklamada anchor'ın href'ine gider).
- Mockup: `href` gerçek navigasyon yapar; gerçek liste state transferi localStorage
  `dm_shoplist` üzerinden zaten R12'de mevcut — bu iş yalnızca tıklama alanını satıra
  yaydı, transfer mantığına dokunmadı.

---

## #4 — tarif-liste-v1: görselli alt-kategori / pişirme-tipi rayı (REVİZE: kategori-v1 `.subcat` deseni)

> **REVİZE (Beyar):** İlk eklenen düz pill şeridi (`.cat-strip`) sade bulundu →
> KALDIRILDI. Beyar görselli alt-kategori deseni istedi; **kanon kaynak = `kategori-v1.html`
> `.subcat-sec`** bölümü → birebir port edildi.
> tarif-liste-fix'in kart/meta CSS'ine DOKUNULMADI; §2f hero'ya DOKUNULMADI
> (yalnız `.subcat-*` yeni sınıflar + `.lst-main` içine yeni HTML + bağımsız JS IIFE).

### Kanon kaynak
`mockups/kategori-v1.html` → `.subcat-sec` (CSS satır 774-789, markup satır 1402-1421):
`.subcat-track#subcatTrack` içinde her `<a class="subcat">` = `.sc-ico` (40×40 bg-image
görsel) + `<span><b>AD</b><span>X tarif</span></span>` + `.active` state. Körlemesine
icat YOK — bu desen birebir alındı.

### Uygulama (mockups/tarif-liste-v1.html)
**1. HTML** (`.lst-main` ↔ `.lst-bar` arası): `.subcat-strip` → `.subcat-head`
(başlık "Tema & pişirme tipi" + not) + `.subcat-wrap#subcatWrap` (fade taşıyıcı) +
`.subcat-track#subcatTrack` + **14 görselli kart** (her biri 40×40 `.sc-ico` görsel +
kalın ad + tarif sayacı):
- **Tümü** (data-all, 248 tarif) — aktif başlangıç
- Pişirme-tipi (Yemek Modu facet'i): **Fırın Yemekleri 52 · Tek Tencere 38 · Airfryer 9 · Pratik & Hızlı 121**
- Tematik kategori (Kategori facet'i, kanonik): **Sebze Yemekleri 14 · Çorbalar 22 · Köfte & Et 18 · Tavuk Yemekleri 16 · Hamur İşleri 12 · Makarnalar 10 · Pilavlar 11 · Zeytinyağlılar 13 · Tatlılar 14**
- Görseller mevcut facet `cn-thumb` / kategori-v1 subcat Unsplash ID'lerinden (v3a suffix); `data-cat` = ilgili facet input `value` ile **birebir** eşleşir.

**2. CSS** (`.lst-bar`'dan önce): `.subcat` kuralları kategori-v1'den BİREBİR
(bg-cream kart, 40×40 `.sc-ico`, hover translateY(-2px)+tomato-tint, `.active` tomato
dolgu + beyaz metin + sc-ico ring). Ek: `.subcat-track.drag-scroll/.dragging` imleç +
`.subcat-wrap.cs-more` sağ-kenar **fade maskesi** (shelf-tabs `sh-more` mirası).

**3. JS** (bağımsız IIFE, mevcut render IIFE'sine **dokunulmadı**):
- `.subcat` tıkla → `e.preventDefault()` (href="#" sıçraması yok) → `findInput(value)` → checkbox toggle + `dispatchEvent('change')` → **mevcut `render()` çalışır**.
- `.xtra` (gizli) hedefler için facet grubu `more-open` açılır (sidebar'da görünür kalır — `?kategori=` deseni).
- "Tümü" → tüm `.fct-row input:checked` temizlenir, render tazelenir.
- `side` 'change' dinleyicisi → `.subcat.active` senkron (hero popüler çip / `?kategori` / facet her değişiminde tutarlı).
- `updFade()` → ray taşıyorsa/sona gelinmediyse `cs-more` fade açık.
- Drag-scroll: `.subcat-track` enableDrag selector listesine eklendi → pointer-drag + wheel→yatay + tıklama-koruma otomatik miras.

### Statik teyit
- 13 `data-cat` değerinin her biri sidebar'da **tam 1** facet input ile eşleşiyor (grep ✔). Sessiz kırılma yok.
- `.subcat-track` enableDrag selector listesinde kayıtlı ✔. Eski `.cat-strip/.cat-chip` kalıntısı YOK ✔.
- Eklenen JS IIFE `node --check` → **SYNTAX OK** ✔.
- Mevcut facet/filtre yapısı + render IIFE'si + §2f hero + kart/meta CSS değişmedi ✔.

### Tarayıcı kanıtı (headless chrome iframe probe — `_scprobe`, sonra silindi; mobil 390 iframe)
```json
{"trackExists":true,"cardCount":14,"imgCount":14,"scrollW":2277,"clientW":343,
 "scrollable":true,"dragScrollClass":true,"scrollLeftAfterSet":138,
 "fadeWhenScrolled":true,"fadeAtEnd":false,"fadeAtStart":true,
 "cardFound":true,"sumChanged":true,"afterSum":"22 tarif bulundu — “mantı” araması için",
 "cardActive":true,"facetChecked":true,"fchipShown":true,
 "xtraChecked":true,"xtraGroupOpened":true,
 "afterAllSum":"248 tarif bulundu — “mantı” araması için","allActive":true,"facetClearedAfterAll":true,
 "docScrollW":375,"winInnerW":390,"bodyHorizOverflow":false}
```
- **Görselli desen:** `cardCount:14` + `imgCount:14` → her kartta 40×40 `.sc-ico` görseli var ✔.
- **Kaydırma:** `scrollable:true` (scrollW 2277 > clientW 343), `dragScrollClass:true`, `scrollLeftAfterSet:138` → **ray gerçekten kayıyor** ✔.
- **Fade kenar:** `fadeAtStart:true` + `fadeWhenScrolled:true` + `fadeAtEnd:false` ✔.
- **Tıkla→facet→render:** "Çorba" kartı → `sumChanged:true` (248→**22**), `cardActive:true`, `facetChecked:true`, `fchipShown:true` ✔.
- **`.xtra` hedef:** "Zeytinyağlı" (gizli) → `xtraChecked:true` + `xtraGroupOpened:true` (facet grubu açıldı) ✔.
- **Tümü:** `afterAllSum:248`, `allActive:true`, `facetClearedAfterAll:true` ✔.
- **Mobil 390 taşma:** `docScrollW:375 ≤ winInnerW:390`, `bodyHorizOverflow:false` ✔.
- SS'ler: `k4-subcat-desktop.png` (görselli kartlar + "Tümü" aktif + sağ fade), `k4-subcat-mobil390.png` (mobil), `k4-subcat-active-filtered.png` (Çorbalar aktif + filtre).

### Bilinen Sınırlamalar
- Ray **çok-seçim** modelini korur (facet'lerle tutarlı): birden fazla `.subcat` aynı anda
  `.active` olabilir — tek-seçim radyo DEĞİL; bilinçli (facet eksenine sadık). kategori-v1
  subcat görsel olarak tek-active varsayar ama burada facet-bağlı olduğu için çoklu da olabilir.
- "Köfte & Et" → `Kırmızı Et` facet'ine, "Tavuk Yemekleri" → `Beyaz Et` facet'ine map'lendi
  (kanonik facet value'ları bunlar; etiketler kategori-v1 subcat dilinden).
- Etkileşim probe same-origin iframe `.click()` ile yapıldı (MCP kilidi); DOM olay yolu
  (`dispatchEvent('change')` → render) gerçek tıklamayla birebir aynı, kanıt eşdeğer.
  Gerçek MCP `browser_click` turu lead'in faz-sonu MCP turuna bırakılabilir.

---

## EK-5 (#11) — tarif-liste subcat şeridi + liste görseli 4 düzeltme

Dosya: `mockups/tarif-liste-v1.html`. §2f hero + kart/meta + facet mantığı (Çorba 248→22) korundu.

### 1) Mouse drag-scroll ÇALIŞMIYORDU → düzeldi
**Teşhis:** `.subcat` öğeleri `<a href="#">` → mouse ile sürüklendiğinde tarayıcı
native **link-drag** başlatıp pointer'ı kaçırıyordu; subcatTrack yalnız pointer-event
(enableDrag) ile bağlıydı, explicit mouse-event yoktu. (kategori-v1 referansı: subcat'e
HEM enableDrag HEM ayrı pointer handler bağlı; yine de mouse path zayıf.)
**Fix:** subcat IIFE'ye explicit mouse handler eklendi — `mousedown`→tut+`preventDefault()`
(native drag + seçim engeli), `document mousemove`→`scrollLeft=start-dx`, `mouseup`/
`mouseleave`→bırak, `moved` capture click-guard (drag sonrası yanlış kategori seçimi yok).
CSS: `.subcat{-webkit-user-drag:none;user-select:none}` + `.drag-scroll{cursor:grab}`/`.dragging{cursor:grabbing}`.
**Kanıt (headless probe):** `scrollBefore:2 → scrollAfterDrag:182`, `mouseDragWorks:true`,
`cursorGrab:grab`, `cursorDuringDrag:grabbing`, `dragScrollClass:true`. ✔

### 2) Aktif state KABA (dolu tomato blok) → RAFİNE
**Fix (frontend-design ilkesi: dolu blok yerine restraint + tinted state):**
`.subcat.active{border-color:tomato; background:tomato-tint; box-shadow:inset 0 0 0 1px tomato}`
+ `.sc-ico` tomato ring + `b`/sayaç tomato. Beyaz-metin/dolu-tomato kaldırıldı.
**Kanıt (transition kapatılıp computed okundu — virtual-time transition-dondurma artefaktını aşmak için):**
`computedBg:rgb(251,233,227)` (tomato-tint), `computedBorder:rgb(225,72,39)` (tomato),
`computedShadow:"rgb(225,72,39) 0px 0px 0px 1px inset"`, CSSOM kuralı doğrulandı. Zarif vurgu, dolu-blok değil. ✔

### 3) Subcat görselleri ALAKASIZ → isabetli (verified 200 ID)
Curl HTTP taramasıyla tema-uyum + 404 kontrolü. 3 isabetsizlik düzeltildi (rotasyon, hepsi 200):
- Fırın Yemekleri: `1565299624946` (pizza) → `1473093295043` (güveç/fırın) — lead "fırın=güveç" ✔
- Sebze Yemekleri: `1476718406336` (pilav/makarna) → `1551183053` (sebze yemeği) ✔
- Makarnalar: `1473093295043` → `1476718406336` (makarna/pilav) ✔
Diğerleri zaten tema-uyumlu (tencere/airfryer-kızarmış/çorba kasesi/et/tavuk/hamur/pilav/zeytinyağlı/tatlı). v3a suffix korundu.

### 4) Liste view'da GÖRSELSİZ kart → 0 görselsiz
**Teşhis:** Tüm `.r-media`'da markup'ta bg-image VAR; "Zeytinyağlı Enginar Dolması" (satır 1990)
görseli `photo-1572441710534-87b73d3cf2fa` curl'de **404** → render'da boş. (22 ID tarandı, tek 404 buydu.)
**Fix:** Enginar görseli → `1505253716362-afaea1d3d1af` (verified 200, zeytinyağlı/dolma teması — kart chip'i "Zeytinyağlı" ile uyumlu).
**Kanıt:** Dosyada 404 ID kalmadı (`grep=0`), 22 görsel ID'nin hepsi HTTP 200. Headless probe (list view):
`isListView:true`, `mediaCount:15`, **`emptyMediaCount:0`**. Görsel SS list-view'da tüm kartlar sol-görselli. ✔

### Kanıt yöntemi & SS'ler
Standalone headless chrome (MCP=lead-only) + same-origin iframe probe, `?cb=` cache-buster.
- `outputs/ss-hero-turu-kategori/ek5-grid-subcat-images.png` (grid + yeni subcat görselleri)
- `ek5-listview-no-empty.png` (list view, tüm kartlar görselli)
- `ek5-active-corba.png` (Çorba aktif + 248→22 filtre)
Temp probe dosyaları silindi. node --check (subcat IIFE) OK.

### Bilinen Sınırlamalar
- Aktif-state computed okuması `--virtual-time-budget` altında transition'ı dondurduğu için ilk
  okumada base değer döndü; transition kapatılıp + CSSOM kuralı okunarak kesin doğrulandı (gerçek tarayıcıda .2s sonra tam görünür).
- Görsel reuse: Enginar r-media ile Zeytinyağlı subcat aynı ID'yi (farklı boyut param) paylaşır — mockup'ta tema-doğru reuse kabul.
- Etkileşim (drag/active/filter) iframe `.click()`/synthetic mouse event ile kanıtlandı; gerçek MCP turu lead faz-sonuna bırakılabilir.
