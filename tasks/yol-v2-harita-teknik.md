# Yol Güzergahım v2 — Harita & Rota Teknik Önerileri

Tam ekran Leaflet + OSRM rota planlayıcı (yol-guzergahim-v2.html) için teknik karar
dokümanı. Marka token disiplini: aktif = domates `#E14827`, yol-üstü/onay = yeşil
`#009d4f`, pasif/alternatif = nötr gri.

> Mevcut v1 (`v6/yol-guzergahim-v1.html`) durumu — referans:
> - `L.map('routeMap',{zoomControl:true, scrollWheelZoom:false})` → **scroll zoom KAPALI**
> - `setTimeout(invalidateSize, 60)` + resize listener → mevcut, doğru
> - OSRM: `overview=full&geometries=geojson&alternatives=false&steps=false` → **tek rota**
> - `distToSeg` / `distToRoute` → zaten gerçek nokta-segment (perpendicular), DÜZGÜN
> - `CORRIDOR_KM=20`, `ON_ROAD_KM=5` → **sabit eşik, slider YOK**
>
> Yani v2'nin asıl açıkları: (1) scroll zoom + tam-aktif config, (2) alternatif rotalar,
> (3) eşik slider'ı. Geometri ve perpendicular mesafe v1'de zaten doğru — v2'de korunur.

---

## (a) Tam Aktif Drag / Zoom / Pan — Leaflet Config

### Önerilen config

```js
var map = L.map('routeMap', {
  center: [40.10, 31.00],
  zoom: 7,
  // Etkileşim — hepsi açık (varsayılan true olanları yine de açıkça yaz, niyet belli olsun)
  dragging: true,
  scrollWheelZoom: true,      // v1'de false → v2'de AÇ (tam ekran haritada beklenen davranış)
  touchZoom: true,            // mobil pinch-zoom
  doubleClickZoom: true,
  boxZoom: true,
  keyboard: true,
  inertia: true,              // sürükleme momentumu
  zoomControl: true,
  tap: true                   // mobil dokunma; Leaflet 1.9'da büyük ölçüde otomatik
});
```

Tile katmanı (key'siz OSM, v1'le aynı):
```js
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, attribution: '&copy; OpenStreetMap'
}).addTo(map);
```

### Sürüklemeyi BOZAN yaygın tuzaklar (gotchas)

1. **`scrollWheelZoom:false`** — v1'in mevcut durumu. Tam ekran haritada kullanıcı
   tekerlekle zoom bekler; v2'de `true`. (Sayfa içine gömülü küçük haritalarda
   "sayfa scroll'unu çalma" diye kapatılır — ama burada harita TAM EKRAN, o gerekçe yok.)

2. **Üstte `pointer-events` yakalayan overlay** — EN SIK SEBEP. Sol panel veya bir
   gradient/legend katmanı haritanın üzerine `position:absolute; inset:0` ile binerse
   tüm fare olaylarını yutar, harita ölü görünür. Çözüm: dekoratif overlay'lere
   `pointer-events:none`, yalnız tıklanabilir alt-öğelere (`button`, `.legend a`)
   `pointer-events:auto`. Sol panel haritanın YANINDA (flex/grid kolon) olmalı,
   ÜSTÜNDE değil; üstünde duracaksa panel haritanın dışında bir kolonda kalmalı.

3. **Harita 0 boyutta render** — konteyner `display:none`, `height:0`, sekme/akordeon
   içinde gizliyken, ya da CSS yüklenmeden init edilirse. Belirtisi: gri kareler,
   tek tile, kayık merkez, sürüklenince zıplama. Çözüm `map.invalidateSize()`:
   ```js
   // konteyner görünür olduktan SONRA
   setTimeout(function(){ map.invalidateSize(); }, 60);   // ilk yerleşim (v1'de var)
   window.addEventListener('resize', function(){ map.invalidateSize(); }, {passive:true});
   // panel aç/kapa, sekme geçişi gibi layout değiştiren her olayda da çağır
   ```
   Tam ekran haritanın `#routeMap` konteyneri **eksplisit yükseklik** almalı
   (`height:100%` zinciri html/body'ye kadar gitmeli ya da `100dvh` / `100vh`).
   `%` yükseklik ata-zinciri kopuksa konteyner 0 olur → klasik "harita görünmüyor".

4. **`dragging:false` veya runtime'da `map.dragging.disable()`** — bir yerde kapatılıp
   geri açılmamış olabilir. v2'de hiçbir yerde disable çağrısı olmamalı (sürüklenebilir
   marker eklerken bile harita dragging'i kapatılmaz; marker kendi olayını
   `L.DomEvent.stopPropagation` ile durdurur).

5. **CSS yüklenmemesi** — `leaflet.css` gelmezse tile'lar kırık konumlanır, etkileşim
   "bozuk" görünür. v1 zaten `unpkg` üzerinden integrity ile yüklüyor — koru.

6. **Mobil `tap`/`touch-action`** — Leaflet 1.9 dokunmayı büyük ölçüde otomatik
   yönetir. Konteynere `touch-action:none` veya agresif `user-select:none`
   ELLE VERME (eski rehberlerin tavsiyesi) — Leaflet'in kendi handler'ıyla çakışıp
   pan/pinch'i bozabilir. Bırak Leaflet yönetsin.

**Trade-off / sahibine sorulacak:** Tam ekran haritada `scrollWheelZoom:true`
varsayılan öneri. Tek itiraz: sayfa hiç dikey scroll'lanmıyorsa sorun yok; ama
harita bir sayfa AKIŞININ parçasıysa (altında içerik varsa) tekerlek zoom'u
scroll'u çalar. v2 tam-ekran/uygulama-modu olduğundan `true` öneriyorum. **Karar
sahibine:** harita gerçekten 100dvh tam-ekran mı, yoksa shell header/footer akışı
içinde mi? Tam-ekransa scroll-zoom aç; akış içindeyse `scrollWheelZoom:'center'`
veya kapalı + zoom butonları.

---

## (b) OSRM Alternatif Rotalar

### İstek

```
https://router.project-osrm.org/route/v1/driving/
  {lon,lat};{lon,lat};...?alternatives=3&overview=full&geometries=geojson&steps=false
```
- Koordinat sırası **lon,lat** (OSRM zorunlu — v1 zaten doğru yapıyor).
- `alternatives=3` → en fazla 3 alternatif iste (sayı verilebilir; `true` ≈ tek
  alternatif). **Garanti yok** — OSRM uygun çeşitlilik bulamazsa tek rota döner;
  `routes.length` her zaman kontrol edilmeli.
- `overview=full` → tam geometri (gerçek yol şekli, bkz. (c)).

### Yanıt ayrıştırma

```js
// j.code === 'Ok' && j.routes.length
var routes = j.routes.map(function(rt){
  return {
    coords:    rt.geometry.coordinates.map(function(c){ return [c[1], c[0]]; }), // [lat,lng]
    km:        rt.distance / 1000,
    dakika:    Math.round(rt.duration / 60)
  };
});
// routes[0] = OSRM'in önerdiği (en iyi) rota; gerisi alternatif, öneri sırasında
```

### Render: aktif (renkli) vs alternatif (gri) polyline

```js
var routeLayers = [];
function drawRoutes(routes, activeIdx){
  routeLayers.forEach(function(l){ map.removeLayer(l.line); });
  routeLayers = [];
  // önce alternatifleri (altta, gri), sonra aktifi (üstte, domates) çiz → z-order
  routes.forEach(function(r, i){
    if(i === activeIdx) return;
    var grey = L.polyline(r.coords, {color:'#B7B2A8', weight:5, opacity:.7})
                .addTo(map);
    grey.on('click', function(){ selectRoute(i); });   // tıkla → bu rotayı aktif yap
    routeLayers.push({line:grey, idx:i});
  });
  var r = routes[activeIdx];
  var active = L.polyline(r.coords, {color:'#E14827', weight:6, opacity:.95})
                .addTo(map);
  active.bringToFront();
  routeLayers.push({line:active, idx:activeIdx});
  fitToRoute(active);
}
function selectRoute(i){ activeIdx = i; drawRoutes(currentRoutes, i); refreshStats(i); spawnBalloons(); }
```

- **Renk disiplini:** aktif = domates `#E14827` (kalın, opak); alternatif = nötr gri
  `#B7B2A8` (ince, yarı saydam). Yeşil `#009d4f` rota çizgisi için KULLANMA — yeşil
  v2'de "yol üstü mekan" anlamına ayrılmış (bkz. (d)); rota renginde kullanılırsa
  anlam çakışır.
- **Süre/mesafe etiketi:** her rotanın orta noktasına `L.tooltip` (kalıcı) ile
  "47 dk · 38 km", ya da sol panelde rota seçim listesi (önerilen — harita üstü
  daha temiz). Aktif satır domates, diğerleri nötr; tıklanınca `selectRoute`.
- **Mesafe baloncuklarını (mekan) güncelle:** rota değişince `spawnBalloons()` yeni
  aktif `coords`'a göre yeniden hesaplanmalı — alternatif rotada farklı mekanlar
  yol üstüne düşer.

### Demo server limitleri ve fallback

`router.project-osrm.org`: **~1 istek/sn**, yalnız makul/ticari-olmayan kullanım,
uptime/latency garantisi YOK, haber vermeden kapatılabilir, satışı yasak. Çok-noktalı
+ alternatifli sorgular yavaş; 429/timeout olabilir. v1'in deseni korunmalı:
1 retry (~900ms bekle), sonra **mock/tahmini rotaya graceful düşüş** — sayfa asla
boş/kırık kalmaz. Mock'la anında çiz, gerçek gelince üzerine yaz.

**Trade-off / sahibine sorulacak:** Demo server üretimde **uygun değil** (ticari
ürün + güvenilirlik yok). Üretim için: (1) kendi OSRM instance'ı (en ucuz, tam
kontrol, DevOps yükü), (2) ücretli API — OpenRouteService (key'li, ücretsiz kademe
var; v1 zaten "şehir yolu" modunda kullanıyor) veya Mapbox Directions. **Karar
sahibine:** v2 hâlâ tasarım/prototip fazıysa demo server + fallback yeterli; canlıya
çıkışta routing sağlayıcısı seçilmeli (kendi OSRM mi, ORS/Mapbox key mi).

---

## (c) Gerçek Yol Geometrisi (düz çizgi DEĞİL)

### Veri akışı

1. OSRM'e `overview=full&geometries=geojson` ile sor → `rt.geometry` bir GeoJSON
   LineString döner, gerçek yol şeklini (kavisler, kavşaklar) izleyen yüzlerce nokta.
2. GeoJSON koordinatları **[lon,lat]** sıralı → Leaflet **[lat,lng]** ister, ters çevir:
   ```js
   var coords = rt.geometry.coordinates.map(function(c){ return [c[1], c[0]]; });
   L.polyline(coords, {...}).addTo(map);   // gerçek yolu izler
   ```
   (v1 zaten böyle yapıyor — düz çizgi yalnızca mock fallback'te.)
3. **`geojson` vs `polyline6`:** `geojson` parse gerektirmez (hazır dizi), kod sade —
   v1 bunu kullanıyor, **koru**. `polyline6` daha küçük payload ama decode kütüphanesi
   gerektirir (`@mapbox/polyline`); bu projede ekstra bağımlılığa değmez.
4. **Mekan markerlarını rotaya "snap"lama:** mekanların kendi gerçek koordinatları
   harita üzerinde sabit kalır (taşıma). "Snap" burada görsel değil mantıksal:
   her mekanın rotaya perpendicular mesafesi (bkz. (d)) hesaplanır; eşik içindeyse
   "yol üstü/yakın" rozetlenir. Marker konumu kaymaz — yanlış yön verir. (Gerçekten
   çizgi üstüne projeksiyon istenirse turf `nearestPointOnLine` ayrı bir öğe için
   kullanılabilir, ama mekan pin'i kendi yerinde kalmalı.)

**Trade-off:** `geojson` + ters-çevir, bağımlılıksız ve okunur — net kazanan.
`polyline6`'ya geçmenin tek gerekçesi çok büyük rota payload'ı olur ki bu ölçekte yok.

---

## (d) Noktadan-Rota-ÇİZGİSİNE Perpendicular Mesafe ("Kocaeli uzak ucu" problemi)

Problem: mesafe şehir merkezine değil, **rota çizgisinin en yakın noktasına** ölçülmeli.
v1 bunu zaten doğru yapıyor (`distToSeg`/`distToRoute`) — şehir merkezine değil her
segmente bakıyor. v2'de bu mantık **korunur**, üstüne ayarlanabilir eşik eklenir.

### İki seçenek

**Seçenek 1 — turf.js `pointToLineDistance` (bağımlılık ekle):**
```js
import pointToLineDistance from '@turf/point-to-line-distance';   // ya da turf.pointToLineDistance
var line = turf.lineString(rt.geometry.coordinates);              // [lon,lat] — GeoJSON, çevirme yok
var km = turf.pointToLineDistance([m.lng, m.lat], line, {units:'kilometers'});
```
- Cross-track (perpendicular) mesafeyi rotanın HERHANGİ segmentine verir; geodesic
  (varsayılan) veya `method:'planar'`. GeoJSON'u doğrudan yer (çevirme yok).
- Tek fonksiyon import edilebilir (`@turf/point-to-line-distance`) → bundle şişmez.
  Ama bu proje CDN/inline script; ekstra `<script>` etiketi demek.

**Seçenek 2 — elde-yazılmış haversine + nokta-segment (v1'deki, sıfır bağımlılık):**
v1'in `distToSeg`'i lokal eşdüzlemsel projeksiyon (`kx=111.32*cos(lat)`, `ky=110.57`)
ile noktayı segmente klempler — Türkiye ölçeğinde (birkaç yüz km) hatası ihmal
edilebilir, hızlı, bağımlılıksız. **Önerim bu** — v1'de zaten çalışıyor, doğru ve
turf'a göre daha hafif.

**Öneri:** Seçenek 2'yi koru. turf yalnız ileride büyük coğrafi alan / yüksek hassasiyet
gerekirse. Sahibine ekstra `<script>` bağımlılığı yüklemeye değmez.

### Ayarlanabilir eşik slider'ı → tier'lar

Sabit `ON_ROAD_KM=5` / `CORRIDOR_KM=20` yerine kullanıcı kaydıracı:

```html
<input type="range" id="corridor" min="1" max="30" step="1" value="10">
<span id="corridorVal">10 km</span>
```
```js
corridor.addEventListener('input', function(){
  corridorVal.textContent = this.value + ' km';
  spawnBalloons();    // her oynatmada yeniden filtrele/çiz (debounce ~80ms önerilir)
});
// tier eşiği: slider = dış koridor; yol-üstü ON_ROAD_KM içte sabit oranda kalabilir
// veya yarısı: var corr = +corridor.value; var onRoad = Math.max(2, corr*0.4);
function proxTier(off){ return off <= onRoad ? 'on' : 'near'; }
```

- **Tier görselleri (token disiplini):**
  - "Yol Üstü" → yeşil `#009d4f` etiket/pin (yol üstünde, onaylı yakınlık).
  - "Yola Yakın" → nötr gri etiket/pin (`--muted` `#7E7E7E`), koridor içi ama uzakça.
  - Rota çizgisi domates; mekan tier'ı yeşil/gri — üç anlam üç renk, çakışmaz.
- Slider oynatınca: liste yeniden sıralanır (yol-üstü grup önce, sonra mesafeye göre),
  baloncuklar yeniden doğar, sayaç ("N yol üstü · M yola yakın") güncellenir.
- Performans: rota poligonu yüzlerce noktalı; her mekan × her segment O(n·m). Mekan
  sayısı az (onlarca) olduğu için sorun değil; yine de slider'a ~80ms debounce koy.

**Trade-off / sahibine sorulacak:** Yol-üstü eşiği (`ON_ROAD_KM`) slider'dan BAĞIMSIZ
sabit mi kalsın, yoksa koridorun bir oranı (örn. %40) olarak mı türesin? Sabit daha
öngörülebilir; oransal daha tutarlı his verir. **Önerim:** koridor slider'ı dış sınırı
sürer, yol-üstü = `max(2km, koridor*0.4)` türevi — kullanıcı koridoru daralttıkça
yol-üstü tanımı da mantıklı daralır.

---

## Sahibinin Kararı Gereken Noktalar (özet)

1. **(a)** Harita tam-ekran (100dvh) mı, shell akışı içinde mi? → `scrollWheelZoom`
   `true` mı `'center'`/kapalı mı.
2. **(b)** Üretim routing sağlayıcısı: kendi OSRM / ORS key / Mapbox? (demo server
   canlıya uygun değil; prototip fazı için fallback'le yeterli.)
3. **(b)** Alternatif rota seçimi harita üstü tooltip ile mi, sol panel listesiyle mi?
   (panel listesi öneriliyor.)
4. **(d)** Yol-üstü eşiği slider'dan sabit-bağımsız mı, oransal türev mi? (oransal
   `koridor*0.4` öneriliyor.)
