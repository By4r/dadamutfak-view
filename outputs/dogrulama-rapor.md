# Doğrulama Raporu — Hero Turu (commit 48773db)

> mcp-dogrulama teammate · Task #1 · 2026-06-13
> Yöntem: DOM/CSS statik analiz + headless Chrome render SS kombinasyonu
> SS klasörü: `outputs/dogrulama-ss/`

---

## 1. tarif-liste-v1 — Subcat Görselli Şerit

**DURUM: ✅ teyitli** 🟢

**Bulgular:**
- `.subcat-strip` container var (CSS 848, HTML 1707). **Not:** Checklist `.subcat-sec` dedi ama gerçek class `.subcat-strip` — aynı işlev, farklı isim. İşlevsel olarak tam.
- Kartlar: `a.subcat` × **14 adet** teyitli (`grep -c` → 14; checklist 14 kart dedi ✓).  
  Her kart: `.sc-ico` (background-image 160px Unsplash) + `<b>` ad + `<span>` sayaç. ✓
- `.lst-bar` HTML'de `.subcat-strip`'ten SONRA geliyor (HTML 1707 → 1731) → subcat şerit LST-BAR ÜSTÜNDE ✓
- **Facet mantığı:** Çorba kartı `data-cat="Çorba"`, facet sidebar'ında `data-count="22"` checkbox bağlı. JS'de subcat click → `findInput(data-cat)` → checkbox toggle → `render()` → `computeCount()` → min(248, 22) = **22 tarif** daraltma kurgusa tam ✓
- **Mouse drag-scroll:** Explicit mouse handler (EK-5 #1, HTML 2748): mousedown/mousemove/mouseup + `mMoved` guard + `track.classList.add('dragging')`. `enableDrag()` paterni de ayrıca subcat-track üstünde değil; CUSTOM handler kullanılmış — tam çalışır ✓
- **Render SS (tarif-liste-desktop.png / mobil.png):** Subcat şerit görünüyor, kartlar dizilmiş, lst-bar altında ✓

**Şüpheli:** `.subcat-sec` değil `.subcat-strip` — checklist class adı yanlış ama lead bilir; not olarak ekle.

---

## 2. tarif-detay-v1 — Liste/Satır Tam-Tıklanabilir Nav

**DURUM: ✅ teyitli** 🟢

**Bulgular:**
- `.ing-row`'lar `<li>` elementleri; içinde `<label>` + checkbox + span'lar. Anchor DEĞİL → iç-içe anchor yok ✓
- "Liste durumu satırı" (EK-2) → `<a class="list-state" href="alisveris-listesi-v1.html">` tek anchor; içinde button yok, iç a yok ✓ (HTML 2771)
- Benzer tarifler (benzer tarif rayı): `<article class="r-card">` + `<h4><a href="...">...</a></h4>` şablonu. Her article'da python probe: 1 anchor — iç-içe anchor YOK ✓
- **Render SS (tarif-detay-desktop.png):** Sayfa temiz görünüyor, malzeme paneli sol tarafta, tarif içeriği sağda ✓

---

## 3. bugun-ne-pisirsem-v1 — Wizard Çoklu Sonuç

**DURUM: ✅ teyitli** 🟢

**Bulgular:**
- `computeMatches()` fonksiyonu HTML 3098'de tam mevcut.
- **Grace mantığı:** `grace=(sure*0.5)` süre yarı-toleransı → sıkı eşleşme filtresi ✓
- **Backfill mantığı:** `if(strict.length>=3) return strict;` → zaten 3+ var, doğrudan döner. 1-2 sıkı eşleşmede: `rest=pool.filter(...)` + `.concat(rest).slice(0,3)` → en az 3 karta tamamla ✓
- Boş durum için `if(!strict.length)return []` ayrıca var ✓
- **Render SS (bugun-ne-pisirsem-desktop.png):** Wizard kartı görünüyor ✓

---

## 4. puf-noktalari-v1 — Chip Filtre Tek-Satır Şerit

**DURUM: ✅ teyitli** 🟢

**Bulgular:**
- `.ke-filter` CSS: `display:flex; flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none` — tek satır korunur ✓
- `.ke-filter.kf-more`: `mask-image` sağ kenar fade — JS EK-4 ile toggle ediliyor ✓
- `enableDrag` selector listesinde `'#pufFilter'` var → drag-scroll aktif ✓
- Mobil (925): `flex-wrap:nowrap; overflow-x:auto` override — mobilde de tek satır ✓
- **Render SS (puf-noktalari-desktop.png / mobil.png):** Chip şeridi görünüyor, tek satır. Desktop'ta chip'ler yatay ✓

---

## 5. Anchor-Offset 8 Sayfa — scroll-padding-top

**DURUM: ✅ teyitli** 🟢

**Bulgular (tüm 8 sayfa):**

| Sayfa | scroll-padding-top | Sticky ek |
|---|---|---|
| reklam-ver-v1 | `128px` | `.rv-side` top:130px (sidebar, değil nav) |
| akademi-v1 | `128px` | `.seo-aside` top:128px (sidebar) |
| hakkimizda-v1 | `128px` | `.about-figs` top:130px (sidebar) |
| sozluk-v1 | `128px` | sticky sub-nav YOK |
| mutfak-defteri-v1 | `128px` | `.pf-tabbar` top:112px → 128px padding yeterli ✓ |
| urun-detay-v1 | `128px` | `.pd-gallery` top:128px (sidebar) |
| video-mutfagi-v1 | `128px` | sticky sub-nav YOK |
| mutfaga-giris-detay-v1 | `128px` | `.ld-aside` top:128px (sidebar) |

Tüm 8 sayfada `html{scroll-padding-top:128px}` satır 71'de ✓. Sticky sub-nav'lar sidebar bileşenleri (scroll-padding etkilemez). Başlık header: topbar (~28px) + header (~52px) + gap = ~80-90px; 128px > bunu kapsıyor ✓

**Render SS (reklam-ver-desktop.png):** Sticky alt-bar olmadığı, page hero + anchor nav görünüyor ✓

---

## 6. 3 Wrapper Hero Bleed Kontrolü (KRİTİK)

**DURUM: ✅ teyitli — bleed yok** 🟢

### alisveris-listesi-v1
- `.al-top`: hero bölümü, `background-image` + `background-size:cover`. `background:var(--bg-cream)` basecolor.
- `.al-body`: `background:var(--bg-cream); padding:30px 0 64px` → içerik bölümü KREMİ arkaplan, hero görselsiz ✓
- **Render SS desktop:** Hero şerit üstte, al-body altında ayrı krem zemin — BLEED YOK ✓
- **Render SS mobil (390):** Hero dar altta kesiyor, al-body krem, taşma yok ✓

### siparislerim-v1
- `.ord-top`: `background-size:100% 252px,100% 252px; background-position:top center` → görsel SADECE ilk 252px bandında ✓
- Altında `background-color:var(--bg-cream)` base — gövde kremi ✓
- **Render SS desktop:** 252px koyuluk şerit üstte, siparişler kartları beyaz/krem zeminde altında — BLEED YOK ✓
- **Render SS mobil (390):** `background-size:100% 300px,100% 300px` override, yine band — BLEED YOK ✓

### giris-v1
- `.au-top`: `background-size:cover; background-position:center` — tam kaplayan hero ✓
- `.au-layout`: grid-template-columns split, form kartı sağda overlay değil, au-top içinde ✓
- **Render SS desktop:** Koyu overlay + form kart yan yana, splash tüm sayfa genişliğinde ama altında başka section yok ✓
- **Render SS mobil (390):** Login form görünüyor, hero arka plan kontrollü ✓
- **Bleed riski sıfır:** Giriş sayfasında `.au-top` tek hero bölümü; altında sayfa footer'a bağlıyor. z-index karışımı yok ✓

---

## Ek Gözlemler

### 🟡 Orta — subcat-sec ≠ subcat-strip isim tutarsızlığı
Checklist `.subcat-sec` dedi (eski kategori-v1 class adı), ama tarif-liste-v1'de implementasyon `.subcat-strip` ile yapılmış. İşlevsel olarak özdeş. Handoff notlarında düzeltilmeli.

### 🟡 Orta — Tarif-liste subcat "liste görünümü" görselsiz kart (Zeytinyağlı Enginar) boş
handoff.md'de EK-5 #11 "DEVAM EDİYOR" olarak işaretlenmiş (isabetli görseller + list-view görselsiz kart doldurma). Bu bilerek eksik bırakılmış; doğrulama scope dışı.

---

## Özet Tablo

| # | Madde | Durum | Severity |
|---|---|---|---|
| 1 | tarif-liste subcat şerit | ✅ teyitli | 🟢 |
| 2 | tarif-detay satır tek-anchor | ✅ teyitli | 🟢 |
| 3 | BNP wizard çoklu sonuç | ✅ teyitli | 🟢 |
| 4 | puf-noktalari chip şerit | ✅ teyitli | 🟢 |
| 5 | anchor-offset 8 sayfa | ✅ teyitli | 🟢 |
| 6 | 3 wrapper bleed yok | ✅ teyitli | 🟢 |

**🔴 KRİTİK hata: 0**
**🟡 ORTA uyarı: 2** (subcat class isim farklılığı + EK-5 #11 bilinçli eksik)
**🟢 UFAK: 0**

---

## SS Dosyaları

- `outputs/dogrulama-ss/alisveris-listesi-desktop.png`
- `outputs/dogrulama-ss/alisveris-listesi-mobil.png`
- `outputs/dogrulama-ss/siparislerim-desktop.png`
- `outputs/dogrulama-ss/siparislerim-mobil.png`
- `outputs/dogrulama-ss/giris-desktop.png`
- `outputs/dogrulama-ss/giris-mobil.png`
- `outputs/dogrulama-ss/tarif-liste-desktop.png`
- `outputs/dogrulama-ss/tarif-liste-mobil.png`
- `outputs/dogrulama-ss/puf-noktalari-desktop.png`
- `outputs/dogrulama-ss/puf-noktalari-mobil.png`
- `outputs/dogrulama-ss/bugun-ne-pisirsem-desktop.png`
- `outputs/dogrulama-ss/tarif-detay-desktop.png`
- `outputs/dogrulama-ss/reklam-ver-desktop.png`
