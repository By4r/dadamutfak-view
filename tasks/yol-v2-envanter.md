# Yol Güzergahım v1 → v2 — Kod Envanteri & Yeniden-Kullanım Haritası

> Kaynak: `v6/yol-guzergahim-v1.html` (3214 satır). Tüm satır aralıkları bu dosyaya aittir.
> v2 = bu dosyanın TEMİZ kopyası; aşağıdaki motor parçaları KOPYALA-YAPIŞTIR taşınır,
> cam-panel estetiği + mod-bar + yarım-yükseklik kayıtlı-rota alt-listesi ATILIR.

---

## 1. YENİDEN-KULLANILABİLİR MOTOR PARÇALARI (kopya-hazır)

### 1.1 Shell / iskelet (1–736)
- Satır **1–736**: kanonik `_shell` (token'lar, tipografi, topbar, header, mega menü,
  footer, drawer, bottom-nav, çerez/görüş modal). **Aynen taşınır** — sayfaya özel değil.
- Satır **40–71**: marka token'ları (`--tomato`, `--slate`, `--c-petrol` vb.). v2 de aynı paleti kullanır.
- Leaflet CSS: satır **14–16** (`leaflet@1.9.4`); FontAwesome: **9–13**.

### 1.2 Leaflet init / config (2414–2422)
```
2419  var map=L.map('routeMap',{zoomControl:true,scrollWheelZoom:false}).setView([40.10,31.00],7);
2420  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
2421  setTimeout(function(){map.invalidateSize();},60);
2422  window.addEventListener('resize',function(){map.invalidateSize();},{passive:true});
```
- Key'siz OSM tile; merkez Marmara–İç Anadolu, zoom 7. `scrollWheelZoom:false` (sayfa kaydırma çakışmasın).
- Leaflet JS yükleme: **2409–2410**.
- v2 NOTU: `dragging` opsiyonu init'te VERİLMEMİŞ → Leaflet varsayılanı `dragging:true`'dur, yani
  drag motor düzeyinde AÇIK (bkz. §3.1 — sorun config değil, overlay'ler).

### 1.3 CITY verisi (2424–2438)
- Şema: `{ad:String, lat:Number, lng:Number}`. **12 şehir** (İstanbul, Gebze, Kocaeli/İzmit,
  Sakarya/Adapazarı, Düzce, Bolu, Bilecik, Bozüyük, Eskişehir, Bursa, Ankara, İzmir).
- Kullanımı: uç autocomplete (Nereden/Nereye), ara-şehir (waypoint) autocomplete, şehir baloncuk koordinatı.
- **Aynen taşınır.**

### 1.4 ROAD_POOL venue verisi (2475–2490)
- **9 mekan** (Gebze Köfte, İzmit Pişmaniye, Sapanca Kahvaltı, Adapazarı Islama Köfte,
  Bolu Dağı Mangal, Bilecik Köy Sofrası, Bozüyük Lokanta, Eskişehir Çibörek, Gemlik Su Böreği,
  Gerede Kebapçısı — sayım: aslında 10 satır var; not: Gemlik 9., Gerede 10.).
- Şema (her kayıt):
  `{ad, lat, lng, cat, puan, konum, fiyat, durum:'open'|'closing', medya:int, img:'unsplash-id', desc, sehir:CITY.ad ile elle eşli, dada:bool, tip:'otoban'|'sehir'|'her'}`
- `sehir` alanı CITY.ad ile ELLE eşlenir (şehir baloncuğu → filtre anahtarı).
- `dada` = kuratoryal "Dada öneriyor" rozeti. `tip` = otoban/şehir-yolu modunda öne çıkarma (v2'de mod-bar
  atılınca `tip` kullanımı düşebilir; veri kalsın, zararsız).
- Görsel: `https://images.unsplash.com/<img>` + IMG suffix (satır **2473**). **Aynen taşınır.**

### 1.5 OSRM routing motoru (2447–2612)
- Konfig: **2449** `OSRM_BASE='https://router.project-osrm.org/route/v1/driving/'` (key'siz demo).
- `osrmFetchOnce(mode)` **2589–2606**: chainPoints → `lng,lat` sırası (OSRM lon-first ZORUNLU, satır 2591);
  `overview=full&geometries=geojson`; `mode==='sehir'` → `&exclude=motorway`. 12sn AbortController timeout.
  Dönüş: `{poly:[[lat,lng]…], km, dakika, source:'gercek'}` — **gerçek yol geometrisi** `rt.geometry.coordinates`
  decode edilir (satır **2603**: `[lng,lat]→[lat,lng]` map). ← v2'nin kıvrımlı çizgi kaynağı budur.
- `osrmRoute()` **2608–2612**: 1 retry (900ms sonra) — demo API 429/timeout güvenilirliği.

### 1.6 ORS (OpenRouteService) şehir-yolu routing (2613–2636)
- **2452** `var ORS_API_KEY='';` ← BOŞ PLACEHOLDER. Prod'da .env/backend proxy (satır 2450 TODO).
- **2453** `ORS_URL='https://api.openrouteservice.org/v2/directions/driving-car/geojson'`.
- `orsRoute()` **2615–2636**: key boşsa anında `reject` (satır **2616**) → mock fallback.
  POST geojson, `coordinates:[[lon,lat]…]`, `options:{avoid_features:['highways']}`. Dönüş decode: **2632**.
- `realRoute(mode)` **2638**: `mode==='sehir'?orsRoute():osrmRoute()` yönlendirici.
- **v2 KARARI:** mod-bar atılınca ORS'a gerek kalmayabilir; Google-Maps-stili alternatif rotalar için
  OSRM'in `alternatives=true` parametresi kullanılabilir (v1'de `alternatives=false`, satır 2592 — DEĞİŞTİR).

### 1.7 Mock fallback motoru (2527–2587)
- `dummyRoute(o,d)` **2528–2537**: 8-noktalı tek-yön sinüs yay (testere yok).
- `routeWaypoints(o,d)` **2544–2558**: O→D bandında (≤70km), t∈0.06–0.94 ROAD_POOL noktaları, sıralı; ters-taraf
  outlier ayıklama.
- `mockChainPoly()` **2564–2575**: zincir (from→waypoints→to) her çift için segment birleştir.
- `mockStats(poly,mode,baseKm)` **2580–2587**: km haversine'den (`polyKm` 2577), süre 96km/sa (hızlı) / 64km/sa (şehir +%12).
- **v2 NOTU:** mock = ÇOK SEYREK noktalar arası DÜZ çizgi (kıvrımlı yol değil). Bkz §3.2.

### 1.8 buildRoute orkestrasyon + race-lock (2640–2701)
- `buildRoute()` **2640–2675**: önce mock anında çiz, sonra paralel OSRM+ORS dene; `buildSeq` race-koşulu kilidi
  (satır **2643, 2656**: bayat sonuç yoksay). SAYFA ASLA KIRILMAZ deseni. **Aynen taşınır.**
- `applyRoute(poly,seq)` **2677–2690**: polyline çiz (renk moda göre 2681), spawnBalloons/renderStops/
  drawStopLine/renderWaypointMarkers/updateModeBar/fitRoute zinciri (v2'de updateModeBar çıkar).
- `fitRoute()` **2693–2701**: rota+baloncukları panel footprint'i DIŞINA sığdırır (pad = `planEl.offsetWidth`).
  v2'de sol-panel sekme düzenine göre pad MANTIĞI YENİDEN YAZILIR.

### 1.9 distToRoute / yakınlık (proximity) hesabı (2703–2720)
- `hav()` **2704–2709** haversine km.
- `distToSeg(p,a,b)` **2710–2716** nokta→segment km (equirektangüler projeksiyon).
- `distToRoute(m)` **2717**: mekanın rotaya min mesafesi (poly tüm segmentleri).
- Eşikler **2718–2720**: `CORRIDOR_KM=20` (üst sınır), `ON_ROAD_KM=5`; `proxTier(off)` ≤5km='on' (Yol Üstü),
  5–20km='near' (Yola Yakın). **Aynen taşınır** — v2'nin 2-katman yakınlık mantığının çekirdeği.

### 1.10 Baloncuk + öneri kartı render (2722–2789)
- `spawnBalloons()` **2726–2752**: ROAD_POOL'u distToRoute ile filtrele (≤20km), tier+mesafe sırala, marker+kart üret.
- `cardEl/popupHtml/bindPopupAdd` **2758–2789**: kart HTML (taşınır; v2'de cam yerine düz panel kart stili).

### 1.11 Durak (itinerary) yönetimi (2791–2877)
- `isStop/toggleStop` **2792, 2836–2841**: çift-yönlü senkron tek kapı (kart↔harita↔liste). `drawStopLine` **2842–2849**.
- `renderStops` **2799–2833**, `syncStates` **2850–2871**, `flyTo/highlightCard` **2872–2877**. **Mantık taşınır.**

### 1.12 Waypoint (ara şehir) ekle/çıkar/sürükle-sırala (2879–2951)
- HTML5 native drag-reorder (dış lib YOK) **2904–2922**; `addWaypoint/removeWaypoint/moveWaypoint` **2891–2902**;
  `bindWpAc` autocomplete **2924–2951**. **Aynen taşınır.**

### 1.13 Şehir baloncuk → drawer (2987–3050)
- `spawnCityMarkers` **2990–3002** (yalnız mekanı olan şehir), `openCityDrawer` **3007–3038**,
  `venuesOfCity/cityVenueRow` **3003–3047** (Dada önce, sonra puan). v2'de drawer → sol-panel sekmesine taşınabilir.

### 1.14 localStorage save/load — `dada_yg` (3064–3170) ★ KRİTİK
- Anahtar **3091**: `var LS='dada_yg'` (cross-page kalıcı).
- `lsGet()` **3092–3100**: `{routes:[], visited:{}}`; **3097–3098** ESKI GLOBAL-FLAT `visited{ad:true}` tespit →
  temiz başla (migrasyon). `lsSet` **3101**.
- Kaydet **3066–3088**: `routes.unshift({id, from, to, stops[], dateStr})`.
- `renderSavedRoutes` **3103–3126**: kart üret (Haritada Aç + Checkpoint).
- `renderCheckpoint(r,cpEl)` **3130–3155**: ★ **ROUTE-SCOPED visited** — `st.visited[r.id][m.ad]`
  (satır **3149–3151**). CLAUDE.md dersi: visited GLOBAL OLAMAZ, `{routeId:{ad:true}}` şeması ZORUNLU
  (aynı mekan başka güzergahta otomatik "ziyaret edildi" sızmasın). **Aynen taşınır — bu doğru şema.**
- `openSavedRoute(r)` **3156–3165**: durakları temizle → uçları set → buildRoute → kayıtlı durakları geri yükle.
- Migrasyon write-back IIFE **3166–3169**: eski flat tespit → normalize edilmiş yapıyı geri yaz.

### 1.15 Ortak chrome JS + mobil alt katman (2101–3211)
- Auth/business toggle, header at-top, drawer, dil seçici, çerez/görüş modal **2101–2407** — shell, **aynen taşınır**.
- Mobil bottom-nav/strip yöneticisi **3173–3198**, business rolü **3199–3211** — shell, taşınır.

---

## 2. KORUNACAK ↔ ATILACAK (iki sütun)

| KORUNACAK (v2'ye taşı) | ATILACAK / DEĞİŞTİR |
|---|---|
| Leaflet init + OSM tile (2419–2422) | `scrollWheelZoom:false` gözden geçir (full-screen'de açılabilir) |
| OSRM motoru + geojson decode (2589–2612) | `alternatives=false` → **`alternatives=true`** (Google-Maps stili çoklu rota) |
| ORS placeholder + key/mock fallback (2613–2638) | Mod-bar atılınca ORS opsiyonel; veya alternatif rota için tut |
| ROAD_POOL (10 kayıt) + CITY (12) verisi (2424–2490) | — (veri saf; aynen) |
| distToRoute / proxTier / eşikler (2703–2720) | — (çekirdek; aynen) |
| toggleStop senkron, renderStops, drawStopLine (2791–2877) | Cam-panel HTML kabuğu → düz sol-panel kabuğu |
| Waypoint drag-reorder motoru (2879–2951) | Cam stil → düz panel |
| localStorage `dada_yg` + ROUTE-SCOPED visited (3064–3170) | **Yarım-yükseklik alt-liste UI → sol-panel SEKMESİ** (motor aynı, kabuk değişir) |
| Şehir drawer mantığı (2987–3050) | Cam absolute drawer → sol-panel içi liste |
| **CAM PANEL ESTETİĞİ** (`.yg-glass`, backdrop-filter — 1263, 1487–1492) | **TAMAMEN AT** (v2 düz/opak panel) |
| **MOD BAR** "En Hızlı / Şehir Yolu" (CSS 1442–1457; JS updateModeBar 2955–2985) | **AT** → Google-Maps stili alternatif rota seçici |
| Absolute overlay layout (`.yg-plan/.yg-rail/.yg-result` 1264–1375) | **AT** → kalıcı sol panel + tam-ekran sağ harita (overlay değil) |
| `fitRoute()` panel-footprint padding (2693–2701) | Padding mantığı sol-panel genişliğine göre **yeniden yaz** |

---

## 3. v1 BİLİNEN SORUNLARI — KÖK NEDEN TEŞHİSİ (kanıtlı)

### 3.1 Harita sürüklenmiyor/pan olmuyor → KÖK NEDEN: cam-panel overlay'leri (Leaflet config DEĞİL)
**Kanıt:**
- Init'te `dragging` HİÇ verilmemiş (satır **2419**) → Leaflet varsayılanı `dragging:true`. Yani drag motorda AÇIK;
  config kaynaklı değil.
- `#routeMap` `isolation:isolate` (satır **1261**) → Leaflet iç z-index'leri sahnede izole; bu doğru, sorun değil.
- ASIL NEDEN: harita yüzeyi cam panellerle ÖRTÜLÜ. `position:absolute` paneller haritanın ÜSTÜNDE:
  - `.yg-plan` sağ-üst, **width:320px**, z-index 6 (satır **1265**)
  - `.yg-rail` alt, `left:16px; right:360px` (açıkken neredeyse tam genişlik), z-index 5 (satır **1314**)
  - `.yg-result` z-index 7 (satır **1367**), `.yg-city-drawer` z-index 9 sol-üst 320px (satır **1487**)
- Bu paneller `pointer-events` DEVRE DIŞI bırakılmamış → footprint'leri üzerindeki mouse-down panele gider,
  haritaya değil. Geriye yalnız dar bir orta şerit grab edilebilir kalır → kullanıcı "harita sürüklenmiyor" sanır.
- **v2 ÇÖZÜMÜ:** overlay düzenini terk et. Sol panel = ayrı kolon (haritanın yanında, üstünde değil); harita
  sağda KENDİ kolonunda tam etkileşimli. Overlay zorunluysa panel-dışı boşlukta `pointer-events:none`
  wrapper + panel'de `pointer-events:auto` deseni; ama temiz çözüm: split-layout (overlay yok).

### 3.2 Noktalar arası keskin DÜZ çizgi → KÖK NEDEN: mock fallback çiziliyor (gerçek geometri decode edilmiyor)
**Kanıt:**
- Gerçek yol GEOMETRİSİ yalnız OSRM/ORS dönerse gelir: `rt.geometry.coordinates` decode (satır **2603**),
  ORS `f.geometry.coordinates` (satır **2632**). Bunlar yüzlerce noktalı kıvrımlı yol çizgisidir.
- AMA `buildRoute()` önce MOCK çizer (satır **2645, 2650**) ve gerçek gelmezse mock KALIR.
- MOCK = `mockChainPoly()` (2564) → `routeWaypoints()` (2544) SEYREK ROAD_POOL/CITY noktaları + `dummyRoute()`
  (2528) 8-noktalı kaba yay. Bunlar arası `L.polyline` ile DÜZ segment çizilir (satır **2682**) → keskin düz çizgi.
- **`ORS_API_KEY=''` (satır 2452)** olduğu için "Şehir Yolu" modu HER ZAMAN reject → HER ZAMAN mock düz çizgi.
  "En Hızlı" (OSRM) demo API yavaş/429 olduğunda da mock'a düşer → yine düz çizgi.
- **v2 ÇÖZÜMÜ:** (a) OSRM'i güvenilir çağır (gerekirse self-host/backend proxy), gerçek geojson geometriyi çiz;
  (b) mock fallback'i ya gizle ya da görsel olarak "tahmini" işaretle ki düz çizgi gerçek yol sanılmasın;
  (c) alternatif rotalar için `alternatives=true` ile gelen her route'un `geometry.coordinates`'ını ayrı çiz.

---

## 4. v2 İÇİN ÖZET YÖNERGE
- **Layout:** overlay cam-panel düzenini BIRAK → sol kalıcı panel + sağ tam-etkileşimli harita (drag sorunu kökten çözülür).
- **Routing:** OSRM gerçek geojson geometriyi çiz; mock yalnız acil fallback + "tahmini" etiketi (düz çizgi gerçek sanılmasın).
- **Alternatif rotalar:** `alternatives=true`, her route ayrı polyline (Google-Maps stili seçim).
- **Veri & yakınlık & localStorage motoru:** §1.3–1.14 AYNEN taşı (ROUTE-SCOPED visited şeması korunur).
- **Mod-bar & yarım-yükseklik kayıtlı-rota alt-listesi:** AT (sol-panel sekmesine taşı).
