# Yol Güzergahım v2 — Sentez Planı (KEŞİF FAZI ÇIKTISI)

> Lead sentezi · 2026-06-23 · Kaynak 4 keşif raporu:
> `yol-v2-ref-ux.md` · `yol-v2-envanter.md` · `yol-v2-harita-teknik.md` · `yol-v2-panel-ux.md`
> **Bu faz KOD YAZMADI.** Implement sonraki faz (tek-author lead). Beyar layout seçecek → sonra başlanır.

---

## 0. Tek-cümle tasarım tezi

> Harita hero'dur; sol panel sessiz, disiplinli bir **dikey yol şeridi** (defter) — kalkış üstte,
> varış altta, arası numaralı istasyonlar. Tüm cesaret **alternatif-rota tık-seç + panel↔harita
> çift-yönlü vurguya** harcanır; gerisi kısılır. Cam-panel/overlay düzeni TERK edilir → split-layout.

---

## 1. DOSYA LİSTESİ

| Dosya | Durum | Not |
|---|---|---|
| `v6/yol-guzergahim-v2.html` | **YENİ** (tek dosya) | `v1`'in TEMİZ kopyası; motor parçaları taşınır, kabuk yeniden yazılır |
| `v6/yol-guzergahim-v1.html` | **DOKUNULMAZ** | referans + geri-dönüş emniyeti |
| Kanonik kabuk (`sa-shell/sa-ui/sa-*`) | **DOKUNULMAZ** | v2 full-screen kopuk mod, shell'i minimal header'a indirir |
| FAB enjeksiyonu | sonraki faz | `anasayfa-portal` + `kesfet` sağ-alt köşe (aşağıda) |

- **Asset bağımlılığı eklenmez:** Leaflet 1.9.4 (zaten yüklü) + key'siz OSM tile. turf.js GEREKMEZ
  (v1'in elde-yazılmış `distToSeg` perpendicular mesafe doğru — harita-teknik §d onayı). Drag = native HTML5.

---

## 2. SOL PANEL STATE MACHINE (onaylı tasarım — panel-ux)

**HİBRİT model:**
- `GÜZERGAHLARIM ↔ ROTA KUR` = kalıcı **TAB** (panel başı, iki sekme, yatay cross-fade 180ms).
- `ŞEHİR MEKANLARI` = ROTA KUR'un içine **push** alt-view (şehre tıkla → sağdan slide-in; tab gizlenir,
  yerine breadcrumb `‹ Rota Kur / Bolu`; BACK ile konum korunarak döner).

```
[Dada]                                    [Kapat ✕]   ← minimal header
┌─ SOL PANEL (tam yükseklik) ─┐┌─ HARİTA (kalan viewport, tam etkileşimli) ─┐
│ [Rota Kur][Güzergahlarım(3)]││                                            │
│                             ││   alternatif rotalar (domates aktif /      │
│  A: ROTA KUR                ││   gri alternatif, tık-seç)                 │
│   ● Kalkış (terminal)       ││   şehir pin (tık → B) · mekan pin          │
│   ① istasyon ⠿ ✕  ───────┐  ││                                            │
│   ● Varış (terminal)      │  ││                                            │
│   ╋ + Şehir ekle          │  ││                                            │
│   ── eşik slider ──        │ push                                          │
│   venue card listesi       ▼  ││                                            │
│  B: ŞEHİR MEKANLARI ◀──back─┘ ││                                            │
│   ‹breadcrumb · Dada öneriyor ││                                            │
│  C: GÜZERGAHLARIM (tab)     ││                                            │
└─────────────────────────────┘└────────────────────────────────────────────┘
```

**Kurallar (CLAUDE.md dersleri uygulanmış):**
- Mevcut state daima okunur: aktif tab dolu domates; B'de breadcrumb.
- Terminal (Kalkış/Varış) = hollow nokta + rol etiketi, numarasız, drag/sil yok (✎ değiştir).
  İstasyon = numaralı domates rozet ①②③ + ⠿ drag + ✕ sil. "N mekan" sayacı **istasyondan** beslenir.
- `localStorage dada_yg` ROUTE-SCOPED `visited{routeId:{ad}}` korunur; rozet/sayaç unique birleşimden.
- Venue card = `bugun-ne-pisirsem` `.r-card` **yatay varyantı** (foto %40 div+bg cover/center · ad · ilçe·il ·
  yakınlık tag · "+ Güzergaha Ekle"). Tarif linki YOK, puan yalnız "Dada öneriyor" kartında.

---

## 3. v1'DEN TAŞINACAK / ATILACAK JS (envanter)

### TAŞINIR (kopya-hazır, satır referansları `yol-v2-envanter.md`'de)
- Leaflet init + OSM tile (2419–2422) · CITY 12 (2424–2438) · ROAD_POOL 10 (2475–2490)
- OSRM motoru + geojson decode (2589–2612) · buildRoute race-lock orkestrasyon (2640–2701)
- `distToSeg`/`distToRoute`/`proxTier` + eşikler (2703–2720) — **perpendicular mesafe çekirdeği**
- toggleStop senkron + renderStops + drawStopLine (2791–2877)
- Waypoint native drag-reorder + autocomplete (2879–2951)
- Şehir drawer **mantığı** (2987–3050) → sol-panel B view'a taşınır
- localStorage `dada_yg` + ROUTE-SCOPED visited + migrasyon (3064–3170)

### ATILIR / DEĞİŞİR
- ❌ **Cam-panel estetiği** (`.yg-glass`, backdrop-filter) — tamamen
- ❌ **Overlay layout** (`.yg-plan`/`.yg-rail`/`.yg-result` absolute) → split-layout (drag bug kökten çözülür)
- ❌ **Mod-bar** "En Hızlı/Şehir Yolu" (updateModeBar) → OSRM `alternatives=true` Google-Maps stili seçici
- ❌ **Yarım-yükseklik kayıtlı-rota alt-listesi** → sol-panel `Güzergahlarım` SEKMESİ
- ⚠️ **ORS şehir-yolu** (key boş, hep mock'a düşüyor) → mod-bar gidince opsiyonel; "Rota tipi" mock toggle kalabilir
- 🔧 `fitRoute()` padding mantığı sol-panel genişliğine göre yeniden yazılır

---

## 4. YENİ GEREKEN PARÇALAR

| Parça | Kaynak | Özet |
|---|---|---|
| **Alternatif rotalar** | harita-teknik §b | `?alternatives=3&overview=full&geometries=geojson`; `routes[]` parse; aktif=domates kalın / alternatif=gri ince + tık-seç → `selectRoute()` renk takası + özet + `spawnBalloons()` yeniden |
| **Eşik slider** | harita-teknik §d | `<input range 1-30km>`; `onRoad = max(2, koridor*0.4)` (oransal öneri); ~80ms debounce → liste+sayaç+baloncuk yeniden |
| **Drag-sort (panel)** | v1 motoru taşınır | native HTML5, insertion 2px tomato çizgi, terminal sabit |
| **Reverse (yönü çevir)** | panel-ux §4d | Kalkış↔Varış swap + istasyon ters + 180ms flip; 2+ waypoint'te aktif |
| **B view "Dada öneriyor" bloğu** | panel-ux §3 | 5 ayrım sinyali: tomato-tint zemin + 3px accent şerit + eyebrow + puan görünür + 32px boşluk |
| **Panel↔harita çift-yönlü vurgu** | ref-ux | satır hover→pin zıplar; pin tık→satır highlight+scroll |
| **Tam-aktif Leaflet config** | harita-teknik §a | `scrollWheelZoom:true` (v1 false), dekoratif overlay'e `pointer-events:none`, panel haritanın YANINDA |
| **Empty/loading/error state** | panel-ux §6 | uçsuz / mekan-yok / skeleton / güzergah-boş |

---

## 5. 🔀 2-3 LAYOUT YAKLAŞIMI — BEYAR SEÇECEK

Üç eksende karar var: **(A) panel genişliği · (B) A↔B geçiş animasyonu · (C) FAB yerleşimi.**
Aşağıda 3 bütünleşik yaklaşım — her biri tutarlı bir his verir; karışık seçilebilir ama önerilen setler:

### YAKLAŞIM 1 — "Dock" (Roadtrippers/masaüstü-öncelikli) ★ önerilen
- **Panel:** 400px sabit sol kolon, tam yükseklik; harita kalanı doldurur. Split-layout (overlay yok).
- **A↔B geçiş:** B sağdan **slide-in push** (tab yukarı toplanır, breadcrumb iner); BACK ters slide, scroll korunur.
- **FAB:** sağ-alt köşe, domates dolu yuvarlak + harita-pin ikon + "Yol Güzergahım" tooltip; `anasayfa-portal`
  + `kesfet`'e enjekte.
- **Trade-off:** En çok harita nefesi + en "ciddi planlayıcı" hissi. Mobilde alt-sheet'e düşmek gerekir (ek iş).
- **Neden öneriyorum:** ref-ux + panel-ux ikisinin de vardığı nokta; harita hero tezine en uygun, drag bug'ını
  kökten çözen temiz split.

### YAKLAŞIM 2 — "Geniş defter" (içerik-öncelikli)
- **Panel:** 440px, kart nefes alır, "Dada öneriyor" bloğu daha gösterişli; harita biraz daralır.
- **A↔B geçiş:** aynı panelde **cross-fade** (slide yerine) — daha sakin, "sayfa çevirme" hissi.
- **FAB:** sağ-alt, ama daha büyük + etiketli pill ("Yol Güzergahım planla").
- **Trade-off:** Kart/okunabilirlik kazanır, harita keşfi biraz kısılır. Geniş ekranlarda zarif, 1280px altı sıkışık.
- **Ne zaman:** mekan keşfi rota çiziminden daha önemliyse (içerik-ağırlıklı kullanım).

### YAKLAŞIM 3 — "Kompakt + harita-baskın"
- **Panel:** 360px dar; maksimum harita. Venue card'da tag+buton tek satıra zor sığar (panel-ux uyarısı) →
  buton alt satıra iner (dikey kart-içi).
- **A↔B geçiş:** B'yi **tam panel kaplayan overlay** olarak aç (slide yok, instant); harita hep tam görünür.
- **FAB:** sağ-alt, minimal ikon-only yuvarlak (etiketsiz, hover'da tooltip).
- **Trade-off:** En çok harita; ama dar panelde kart sıkışması + "+ Güzergaha Ekle" hizası riski (test şart).
- **Ne zaman:** harita keşfi mutlak öncelikse ve mobil-benzeri yoğunluk isteniyorsa.

> **Ortak (her üç yaklaşımda sabit):** split-layout (overlay yok) · alternatif-rota tık-seç · eşik slider ·
> terminal/istasyon görsel ayrımı · venue card yatay r-card DNA · ROUTE-SCOPED localStorage.

---

## 6. RİSKLER & AÇIK KARARLAR

**Riskler:**
1. **OSRM demo server** (`router.project-osrm.org`) ~1 istek/sn, garantisiz, alternatifli+çok-noktalı sorgu
   yavaş/429 olabilir → v1 retry+mock fallback deseni korunur. **Mock düz çizgi "tahmini" etiketlenmeli**
   (gerçek yol sanılmasın — v1'in sessiz düz-çizgi bug'ının asıl sebebi buydu). Canlıda kendi OSRM / ORS-key gerekir.
2. **Mobil davranış spec'lenmedi** — bu plan masaüstü-öncelikli. Öneri: alt-sheet (Google Maps mobil dili).
3. **B view "ŞEHİR HERO" görseli** — `CITY` dizisinde şehir görseli alanı YOK. Faz-1: placeholder bg ya da
   ROAD_POOL ilk mekan fotosu + not; faz-2: şehir görseli alanı eklenir. **Sessiz boş bırakma.**
4. **`alternatives=3` garanti değil** — OSRM çeşitlilik bulamazsa tek rota döner; `routes.length` her zaman kontrol.

**Beyar'ın kararı gereken (layout dışında):**
- **a)** Harita gerçekten 100dvh tam-ekran mı? → `scrollWheelZoom:true` (tam-ekransa, önerilen).
- **b)** Üretim routing sağlayıcısı (kendi OSRM / ORS-key / Mapbox)? Prototip için demo+fallback yeterli.
- **c)** Alternatif rota seçimi: harita-üstü tooltip mi, sol-panel liste mi? → **panel liste önerilir.**
- **d)** Yol-üstü eşiği slider'dan oransal mı (`koridor*0.4`) sabit mi? → **oransal önerilir.**
- **e)** "Dada öneriyor" kriteri: elle `dada:true` flag (önerilen, küratoryal) mi, puan eşiği mi?
- **f)** Header ✕ Kapat nereye döner? (v1 normal sayfa / anasayfa-portal)
- **g)** FAB hangi sayfalara? → öneri: `anasayfa-portal` + `kesfet` (yüksek-niyet keşif yüzeyleri).

---

## 7. SONRAKİ FAZ (implement — tek-author lead, ayrı tur)
1. Beyar layout yaklaşımını + yukarıdaki a-g kararlarını verir.
2. `v1` → `yol-guzergahim-v2.html` temiz kopya; §3 motor parçaları taşınır.
3. Kabuk yeniden yazılır (split-layout, minimal header, sol panel state machine).
4. §4 yeni parçalar eklenir. Marka token disiplini, ham hex yok, `div+bg cover` görsel.
5. Görsel QA (1440 + 390 full SS self-verify) + bağlantı/CTA dead-link denetimi + FAB enjeksiyon doğrulama.
6. Onay → commit.
