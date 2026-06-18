# Madde 26 — Yol Güzergahım (Şehirlerarası Yol Üstü Mekan) · Uygulama Planı

> Durum: PLAN (implement YOK). **Vizyon revize edildi (v2).**
> Madde 26 artık Mekan Bul'a entegre DEĞİL → **ayrı yeni mockup sayfası: `yol-guzergahim-v1.html`**.
> Uber/Yandex modeli: "Nereden / Nereye" yaz → güzergah haritada çizilir → yol üstü mekanlar
> **harita üstünde baloncuk (pin)** olarak belirir → tıkla-ekle → Güzergahım durak listesi ↔ harita
> çift yönlü senkron. **Global/şehirlerarası ölçek** (örn. İstanbul→Eskişehir), şehir-içi değil.

## 0. Tasarım özeti

**Harita-merkezli** tek sayfa. Üstte Uber tarzı "Nereden / Nereye" yazı kutuları (yazınca dummy
şehir önerisi açılır — **harita-tıkla YOK**). İki uç seçilince sistem dummy rotayı çizer; rota
koridoruna düşen **tüm yol üstü mekanlar haritada baloncuk** olur. Kullanıcı baloncuğa tıklar →
mini kart + "Güzergahıma Ekle" → **Güzergahım** durak listesine katılır (Kalkış sabit baş, Varış
sabit son). Liste ↔ harita pin **çift yönlü senkron** (`toggleStop` tek kapı).

> **v1'den FARK:** Mekan Bul entegrasyonu / `.mb-modes` mod seçici / `.wiz-solo` sarma / sihirbaz-yanı
> yaklaşım / İstanbul semt dropdown → **TAMAMEN ATILDI**. Yeni sayfa, şehirlerarası coğrafya,
> yazı-kutusu şehir autocomplete.

---

## 1. Dokunulacak / oluşturulacak dosya(lar)

| Dosya | İşlem | Neden |
|-------|-------|-------|
| `mockups/yol-guzergahim-v1.html` | **CREATE** | Madde 26'nın yeni evi. Inline shell (header/footer/nav/cookie + ortak CSS/JS) `kesfet-v1.html`'den birebir türetilir; içerik = yol planlayıcı. |
| `mockups/kesfet-v1.html` | **DOKUNMA** | Artık alakasız (v1 entegrasyonu iptal). |
| Dizin/index sayfası | sonra | Yeni sayfa dizine ekleme **ayrı adım** (vizyonda "dizine ekleme sonra"). |

**Inline shell kaynağı (`kesfet-v1.html` satır referansları — KOPYALA, page-spesifik kısmı ALMA):**
- `<head>`: favicon + FontAwesome (10–13) + **Leaflet CSS (yeni, §2)** + tüm shell `<style>` (14–1245).
  Keşfet'e özel sayfa CSS'i (facet/disc-pane/wizard/dist-bar) **alınmaz**; yerine yeni sayfa CSS'i.
- `<header class="header">` (1278–1391) — birebir.
- `<nav class="bottom-nav">` (1479–1601) — birebir.
- Çerez banner (1602–1615) — birebir.
- `<footer class="footer orange">` (2393–2446) — birebir.
- Ortak JS (kuyruk): header dropdown/account toggle, çerez yöneticisi, **bottom-nav yöneticisi
  (3227+ kanonik)** — birebir. **ALMA:** keşfet tab motoru (`setTab`/keBrowse), facet engine,
  sihirbaz IIFE, gurme detay JS (hepsi keşfete özel).
- `<main class="page-main" id="pageMain">` içeriği = **yeni** yol planlayıcı (aşağıda §4–§9).

> Header/footer "gimmick icat etme" → birebir kopya. Sayfa başlığı `<title>` ve aktif nav-state
> (varsa) yeni sayfaya göre güncellenir.

---

## 2. Leaflet entegrasyonu (v1'den taşındı)

Key'siz, OSM tile, CDN (unpkg). **CDN kalıyor — local indirme YOK** (GitHub Pages canlıda
internetten açılıyor; karar v1'de netleşti).

**Head (FontAwesome link sonrası):**
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
```
**Body kuyruğu (sayfa IIFE'sinden ÖNCE):**
```html
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
```

**Init — global/Türkiye merkez.** Bu sefer harita gizli tab'de değil, **görünür sayfada** →
`DOMContentLoaded`'da kurulur. Yine de layout oturduktan sonra `invalidateSize()` (gotcha güvenliği):
```js
var map=L.map('routeMap',{zoomControl:true,scrollWheelZoom:false})
         .setView([40.10,31.00],7);     // Marmara–İç Anadolu birlikte görünür (İstanbul→Ankara/Eskişehir ekseni)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  maxZoom:18, attribution:'© OpenStreetMap'
}).addTo(map);
setTimeout(function(){map.invalidateSize();},60);
```
> **Gizli-konteyner gotcha (taşındı):** Eğer harita bir akordeon/sekme/`hidden` blok içinde
> açılırsa init'i görünür olunca yap + `invalidateSize()`. Bu sayfada harita açılışta görünür,
> ama responsive yığılma sonrası yine `invalidateSize` çağrılır (resize listener).
> **scrollWheelZoom kapalı** → sayfa kaydırma harita üstünde takılmaz (gerekirse `map.on('focus')` aç).

---

## 3. Şehir veri seti (Uber autocomplete) + yol üstü mekan seti

### 3a. CITY — uç seçimi için sabit koordinatlı şehir/yer listesi
```js
var CITY=[
  {ad:'İstanbul',           lat:41.0082, lng:28.9784},
  {ad:'Gebze',              lat:40.8028, lng:29.4307},
  {ad:'Kocaeli (İzmit)',    lat:40.7654, lng:29.9408},
  {ad:'Sakarya (Adapazarı)',lat:40.7569, lng:30.3783},
  {ad:'Düzce',              lat:40.8438, lng:31.1565},
  {ad:'Bolu',               lat:40.7392, lng:31.6089},
  {ad:'Bilecik',            lat:40.1426, lng:29.9793},
  {ad:'Bozüyük',            lat:39.9070, lng:30.0360},
  {ad:'Eskişehir',          lat:39.7767, lng:30.5206},
  {ad:'Bursa',              lat:40.1885, lng:29.0610},
  {ad:'Ankara',             lat:39.9334, lng:32.8597},
  {ad:'İzmir',              lat:38.4237, lng:27.1428}     // koridor-dışı negatif (İstanbul→Eskişehir'de çıkmaz)
];
```

### 3b. ROAD_POOL — şehirlerarası yol üstü mekanlar (POOL'dan BAĞIMSIZ yeni set)
`.disc-card` anatomisini besleyecek alanlar: `ad, lat, lng, cat, puan, konum, img, desc, durum, fiyat, medya`.
İstanbul→Eskişehir koridoru ağırlıklı + Ankara/Bursa kollarında birkaç ek.
```js
var ROAD_POOL=[
  {ad:'Gebze Köfte Durağı',      lat:40.7990,lng:29.4350,cat:'Köfte & Izgara',  puan:4.5,konum:'Gebze / Kocaeli',  fiyat:'Ekonomik',durum:'open',   medya:9, img:'photo-1565958011703-44f9829ba187',desc:'Otoyol çıkışında ızgara köfte ve piyaz; hızlı mola.'},
  {ad:'İzmit Pişmaniye Evi',     lat:40.7700,lng:29.9200,cat:'Tatlı & Kafe',    puan:4.6,konum:'İzmit / Kocaeli',  fiyat:'Ekonomik',durum:'open',   medya:12,img:'photo-1525351484163-7529414344d8',desc:'Asırlık pişmaniye ve sıcak salep; yol üstü ikram.'},
  {ad:'Sapanca Göl Kahvaltı',    lat:40.6920,lng:30.2640,cat:'Kahvaltı & Serpme',puan:4.8,konum:'Sapanca / Sakarya',fiyat:'Orta',    durum:'open',   medya:18,img:'photo-1509440159596-0249088772ff',desc:'Göl kıyısında serpme kahvaltı; sınırsız çay, temiz hava.'},
  {ad:'Adapazarı Islama Köfte',  lat:40.7800,lng:30.4000,cat:'Köfte & Izgara',  puan:4.7,konum:'Adapazarı / Sakarya',fiyat:'Orta',   durum:'open',   medya:11,img:'photo-1529692236671-f1f6cf9683ba',desc:'Yöreye özgü ıslama köfte; közde ekmek, soğan salata.'},
  {ad:'Bolu Dağı Et Mangal',     lat:40.7300,lng:31.5500,cat:'Kebap & Ocakbaşı',puan:4.6,konum:'Bolu Dağı / Bolu',  fiyat:'Orta',    durum:'closing',medya:14,img:'photo-1504674900247-0877df9cc836',desc:'Dağ yolunda mangal başı; orman manzaralı geniş teras.'},
  {ad:'Bilecik Köy Sofrası',     lat:40.0600,lng:30.0100,cat:'Esnaf Lokantası', puan:4.4,konum:'Bilecik',           fiyat:'Ekonomik',durum:'open',   medya:8, img:'photo-1517248135467-4c7edcad34c4',desc:'Ev usulü tencere yemekleri; gözleme ve ayran.'},
  {ad:'Bozüyük Dinlenme Lokantası',lat:39.9070,lng:30.0360,cat:'Esnaf Lokantası',puan:4.3,konum:'Bozüyük / Bilecik',fiyat:'Ekonomik',durum:'open',   medya:7, img:'photo-1466978913421-dad2ebd01d17',desc:'Otoyol dinlenme tesisi; sıcak yemek 7/24.'},
  {ad:'Eskişehir Çibörek Evi',   lat:39.7800,lng:30.5100,cat:'Dünya Mutfağı',   puan:4.7,konum:'Odunpazarı / Eskişehir',fiyat:'Ekonomik',durum:'open', medya:16,img:'photo-1596040033229-a9821ebd058d',desc:'Tatar çiböreği ve kaşıklı; tarihi Odunpazarı dokusunda.'},
  {ad:'Sarıyer Börekçisi (Bursa yolu)',lat:40.2300,lng:29.1600,cat:'Kahvaltı & Serpme',puan:4.5,konum:'Gemlik / Bursa',fiyat:'Ekonomik',durum:'open',medya:10,img:'photo-1565299507177-b0ac66763828',desc:'Su böreği ve menemen; Bursa kolu sapağında.'},
  {ad:'Ankara Yolu Kebapçısı',   lat:40.4500,lng:31.9000,cat:'Kebap & Ocakbaşı',puan:4.5,konum:'Gerede / Bolu',     fiyat:'Orta',    durum:'open',   medya:13,img:'photo-1565958011703-44f9829ba187',desc:'Ankara istikametinde Adana-Urfa; közde acılı ezme.'}
];
```
İzmir gibi koridor-dışı şehir doğal negatif. `dist` skaler YOK — her şey `lat/lng` üzerinden.

---

## 4. Sayfa düzeni (harita-merkezli)

`<main>` içinde: ince hero/intro → planlayıcı bloğu. Planlayıcı 2 sütun:
**sol = panel** (Nereden/Nereye + Güzergahım + öneri kartları), **sağ = büyük harita**.
≤900px tek sütun: **inputlar → harita (~55vh) → Güzergahım → öneriler**.

```html
<main class="page-main" id="pageMain">
  <section class="yg-hero">
    <div class="wrap">
      <span class="eyebrow">Yol Güzergahım</span>
      <h1>Yola çık, yol üstünü keşfet</h1>
      <p>Nereden nereye gittiğini yaz — güzergahın boyunca uğrayabileceğin mekanları haritada görelim, beğendiklerini durak listene ekle.</p>
    </div>
  </section>

  <section class="yg-sec"><div class="wrap">
    <!-- UBER GİRİŞ: Nereden / Nereye (yazınca şehir önerisi) -->
    <div class="yg-trip">
      <span class="rt-dot o"></span><span class="rt-line"></span><span class="rt-dot d"></span>
      <div class="rt-fields">
        <div class="rt-field">
          <label>Nereden</label>
          <input type="text" id="ygFrom" autocomplete="off" placeholder="Şehir / yer yaz…">
          <div class="yg-ac" id="ygFromAc" hidden></div>
        </div>
        <div class="rt-field">
          <label>Nereye</label>
          <input type="text" id="ygTo" autocomplete="off" placeholder="Şehir / yer yaz…">
          <div class="yg-ac" id="ygToAc" hidden></div>
        </div>
      </div>
    </div>
    <p class="yg-hint" id="ygHint"><i class="fa-solid fa-circle-info"></i> İki ucu da yaz — güzergahı çizip yol üstü mekanları gösterelim.</p>

    <div class="yg-layout">
      <!-- SOL PANEL -->
      <div class="yg-panel">
        <div class="yg-stops-wrap" hidden id="ygStopsWrap">
          <h3><i class="fa-solid fa-list-check"></i> Güzergahım</h3>
          <ol class="rt-stops" id="ygStops"></ol>
        </div>
        <div class="yg-suggest" hidden id="ygSuggestWrap">
          <div class="res-bar"><h2><span class="q" id="ygCount">0</span> mekan yol üstünde</h2>
            <p>Haritadaki baloncuklara tıklayıp da ekleyebilirsin.</p></div>
          <div class="mkl-grid yg-grid" id="ygGrid"></div>
        </div>
      </div>
      <!-- SAĞ: BÜYÜK HARİTA -->
      <div class="yg-map-wrap"><div id="routeMap"></div></div>
    </div>
  </div></section>
</main>
```

**CSS (palet-içi, yeni renk yok):**
```css
.yg-hero{padding:34px 0 8px}
.yg-trip{display:flex;gap:14px;align-items:flex-start;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius-lg);padding:18px;box-shadow:var(--sh-sm);position:relative}
.rt-dot{width:11px;height:11px;border-radius:var(--radius-circle);margin-top:34px}
.rt-dot.o{background:var(--slate)} .rt-dot.d{background:var(--tomato)}
.rt-line{flex:0 0 2px;align-self:stretch;background:var(--line);margin:44px 0}
.rt-fields{flex:1;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.rt-field{position:relative;display:flex;flex-direction:column;gap:6px}
.rt-field label{font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
.rt-field input{padding:12px 14px;border:1px solid var(--line);border-radius:var(--radius-md);font:inherit;background:var(--cream-2)}
.rt-field input:focus{outline:0;border-color:var(--tomato);background:var(--paper)}
.yg-ac{position:absolute;top:100%;left:0;right:0;z-index:20;margin-top:6px;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius-md);box-shadow:var(--sh-md);overflow:hidden}
.yg-ac button{display:flex;align-items:center;gap:9px;width:100%;padding:11px 14px;border:0;background:transparent;font:inherit;text-align:left;cursor:pointer}
.yg-ac button:hover{background:var(--cream-2);color:var(--tomato)}
.yg-layout{display:grid;grid-template-columns:380px 1fr;gap:22px;margin-top:22px;align-items:start}
.yg-map-wrap{border:1px solid var(--line);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--sh-sm);position:sticky;top:90px}
#routeMap{height:620px;width:100%;background:var(--cream-2)}
.rt-stops{list-style:none;display:flex;flex-direction:column;gap:8px}
.rt-stop{display:flex;align-items:center;gap:10px;padding:11px 13px;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius-md)}
.rt-stop.flash{background:var(--tomato-tint)}
.rs-n{width:24px;height:24px;display:grid;place-items:center;background:var(--tomato);color:#fff;border-radius:var(--radius-circle);font-size:12px;font-weight:700}
.rs-txt{flex:1;display:flex;flex-direction:column} .rs-txt small{color:var(--muted);font-size:12px}
.rs-x{border:0;background:transparent;color:var(--muted);cursor:pointer;font-size:15px}
.rs-x:hover{color:var(--tomato)}
.rt-stop.end .rs-n{background:var(--slate)} .rt-stop.end.d .rs-n{background:var(--tomato)}
/* Leaflet kontrol + baloncuk palet */
.leaflet-bar a{color:var(--slate);border-color:var(--line)}
.leaflet-bar a:hover{background:var(--cream-2);color:var(--tomato)}
.yg-pin-b{display:grid;place-items:center;width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--tomato);color:#fff;box-shadow:var(--sh-md);border:2px solid #fff}
.yg-pin-b i{transform:rotate(45deg);font-size:13px}
.yg-pin.added .yg-pin-b{background:var(--green-deep)}        /* eklenmiş = onaylı yeşil-koyu (palet) */
.yg-pin.origin .yg-pin-b{background:var(--slate)} .yg-pin.dest .yg-pin-b{background:var(--tomato-deep)}
@media(max-width:900px){
  .yg-layout{grid-template-columns:1fr}
  .yg-map-wrap{position:static;order:-1}          /* DOM: panel sonra; ama harita inputtan hemen sonra gelsin */
  #routeMap{height:55vh}
  .rt-fields{grid-template-columns:1fr}
}
```
> Mobil sıra notu: vizyon "inputlar → harita → Güzergahım → öneriler". `.yg-map-wrap`'a
> `order:-1` ile haritayı panelin üstüne al; inputlar (`.yg-trip`) zaten `.yg-layout` dışında
> ve üstte. Faz 5 mobil doğrulamasında sıra gözle teyit edilir.

---

## 5. Uber yazı-kutusu girişi (şehir autocomplete)

Harita-tıkla YOK. İki input, yazınca `CITY` substring filtresi → öneri dropdown.
```js
var trip={from:null,to:null};
function bindAc(input,acBox,which){
  input.addEventListener('input',function(){
    var q=input.value.trim().toLocaleLowerCase('tr');
    if(!q){acBox.hidden=true;return;}
    var hits=CITY.filter(function(c){return c.ad.toLocaleLowerCase('tr').indexOf(q)>=0;}).slice(0,6);
    acBox.innerHTML=hits.map(function(c){
      return '<button type="button" data-ad="'+c.ad+'"><i class="fa-solid fa-location-dot"></i> '+c.ad+'</button>';
    }).join('');
    acBox.hidden=!hits.length;
  });
  acBox.addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b)return;
    var c=CITY.find(function(x){return x.ad===b.getAttribute('data-ad');});
    input.value=c.ad; acBox.hidden=true;
    setEndpoint(which,c);
  });
  document.addEventListener('click',function(e){if(!input.parentNode.contains(e.target))acBox.hidden=true;});
}
function setEndpoint(which,c){
  trip[which]=c;
  placeEndMarker(which,c);                       // origin=slate, dest=tomato divIcon
  if(trip.from&&trip.to) buildRoute();           // §6
}
```

---

## 6. Dummy rota polyline (şehirlerarası ölçek · v1'den taşındı)

Gerçek routing API YOK. Deterministik interpolasyon + dik kıvrım; **şehirlerarası mesafe
derece ölçeğinde** olduğu için kıvrım genliği `amp` küçültülür (uzun rotada abartı riski).
```js
function dummyRoute(o,d){
  var pts=[[o.lat,o.lng]], N=8;                  // şehirlerarası → biraz daha çok ara nokta
  var dLat=d.lat-o.lat, dLng=d.lng-o.lng;
  for(var i=1;i<N;i++){
    var t=i/N, lat=o.lat+dLat*t, lng=o.lng+dLng*t;
    var amp=Math.sin(t*Math.PI)*0.04*(i%2?1:-1); // v1=0.10 (şehir-içi); şehirlerarası=0.04 başlangıç
    lat+=-dLng*amp; lng+= dLat*amp;
    pts.push([lat,lng]);
  }
  pts.push([d.lat,d.lng]);
  return pts;
}
var routeLine=null;
function buildRoute(){
  if(!trip.from||!trip.to)return;
  route.poly=dummyRoute(trip.from,trip.to);
  if(routeLine)map.removeLayer(routeLine);
  routeLine=L.polyline(route.poly,{color:'#211E16',weight:4,opacity:.55,dashArray:'2 8'}).addTo(map);
  map.fitBounds(routeLine.getBounds().pad(0.18));
  spawnBalloons();                               // §7 — yol üstü mekanlar baloncuk olur
  ygStopsWrap.hidden=false; renderStops();       // §8 (Kalkış/Varış uçlu repeater)
}
```

---

## 7. Koridor filtresi + yol üstü baloncuklar (harita-merkezli UX)

Mekanın polyline'a en yakın **segment** mesafesi ≤ eşik ise "yol üstünde". Şehirlerarası →
**`CORRIDOR_KM` büyür** (otoyol/kasaba dağınık): başlangıç **20 km** (Faz 3'te ayar).
```js
function hav(aLat,aLng,bLat,bLng){
  var R=6371,dLat=(bLat-aLat)*Math.PI/180,dLng=(bLng-aLng)*Math.PI/180,
      la=aLat*Math.PI/180,lb=bLat*Math.PI/180;
  var h=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(la)*Math.cos(lb)*Math.sin(dLng/2)*Math.sin(dLng/2);
  return 2*R*Math.asin(Math.min(1,Math.sqrt(h)));
}
function distToSeg(p,a,b){
  var kx=111.32*Math.cos(p.lat*Math.PI/180), ky=110.57;
  var ax=a[1]*kx,ay=a[0]*ky,bx=b[1]*kx,by=b[0]*ky,px=p.lng*kx,py=p.lat*ky;
  var dx=bx-ax,dy=by-ay,L2=dx*dx+dy*dy;
  var t=L2?Math.max(0,Math.min(1,((px-ax)*dx+(py-ay)*dy)/L2)):0;
  return Math.hypot(px-(ax+t*dx),py-(ay+t*dy));
}
function distToRoute(m){var min=Infinity,r=route.poly;for(var i=0;i<r.length-1;i++)min=Math.min(min,distToSeg({lat:m.lat,lng:m.lng},r[i],r[i+1]));return min;}
var CORRIDOR_KM=20;
var balloons={};   // ad → {marker, off, data}
function spawnBalloons(){
  Object.keys(balloons).forEach(function(k){map.removeLayer(balloons[k].marker);});
  balloons={};
  var hits=ROAD_POOL.map(function(m){return {m:m,off:distToRoute(m)};})
                    .filter(function(x){return x.off<=CORRIDOR_KM;})
                    .sort(function(a,b){return a.off-b.off;});
  ygCount.textContent=hits.length; ygSuggestWrap.hidden=false; ygGrid.innerHTML='';
  hits.forEach(function(x){
    var mk=L.marker([x.m.lat,x.m.lng],{icon:venueIcon('')}).addTo(map);
    mk.bindPopup(popupHtml(x.m,x.off));
    mk.on('popupopen',function(){bindPopupAdd(x.m);});  // popup içi "Ekle"
    mk.on('click',function(){highlightCard(x.m);});      // harita→öneri kartı
    balloons[x.m.ad]={marker:mk,off:x.off,data:x.m};
    ygGrid.appendChild(cardEl(x.m,x.off));               // .disc-card reuse'lu öneri kartı
  });
  syncStates();
}
```
İzmir/koridor-dışı doğal elenir. **Baloncuk = harita-merkezli ana yüzey**; öneri kartı gridi
ikincil/yedek liste.

---

## 8. Baloncuk/kart → "Ekle" → Güzergahım repeater (v1 .disc-card reuse)

**Öneri kartı** `.disc-card` anatomisinden türetilir (sıfırdan kart yok; `kesfet-v1.html` `cardEl`
deseni uyarlanır — `dist` yerine "X km yol üstü", `mekan-detay-v1.html` linki korunur):
```js
var IMG='?w=700&q=80&auto=format&fit=crop&exp=7&gam=6&sat=-9&high=8&vib=5';
function pill(f){return f==='Ekonomik'?'<b>₺</b><span>₺₺</span>':f==='Orta'?'<b>₺₺</b><span>₺</span>':'<b>₺₺₺</b>';}
function statusEl(d){return d==='closing'
  ?'<div class="disc-status tr"><span class="mt st-closing"><i class="fa-solid fa-clock"></i> Az sonra kapanıyor</span></div>'
  :'<div class="disc-status tr"><span class="mt st-open"><i class="fa-solid fa-circle-check"></i> Açık</span></div>';}
function cardEl(m,offKm){
  var a=document.createElement('article'); a.className='disc-card yg-card'; a.setAttribute('data-id',m.ad);
  a.innerHTML=
    '<div class="disc-fig"><div class="bg" style="background-image:url(\'https://images.unsplash.com/'+m.img+IMG+'\')"></div>'+
      '<span class="disc-match"><i class="fa-solid fa-route"></i> '+offKm.toFixed(1).replace('.',',')+' km yol üstü</span>'+
      statusEl(m.durum)+'<div class="disc-badges"><span class="mt disc-price-pill">'+pill(m.fiyat)+'</span></div></div>'+
    '<span class="disc-cat">'+m.cat+'</span><h3>'+m.ad+'</h3><p>'+m.desc+'</p>'+
    '<div class="disc-meta"><span class="disc-loc"><i class="fa-solid fa-location-dot"></i> '+m.konum+'</span>'+
      '<span class="disc-stats"><span class="r-rate"><i class="fa-solid fa-star"></i> '+m.puan+'</span></span></div>'+
    '<div class="rt-act"><button class="btn btn-primary yg-add" type="button"><i class="fa-solid fa-plus"></i> Güzergahıma Ekle</button></div>';
  a.querySelector('.disc-fig').addEventListener('click',function(){location.href='mekan-detay-v1.html';});
  a.querySelector('.yg-add').addEventListener('click',function(e){e.stopPropagation();toggleStop(m);});
  return a;
}
function popupHtml(m,off){
  return '<div class="yg-pop"><b>'+m.ad+'</b><small>'+m.konum+' · '+off.toFixed(0)+' km yol üstü</small>'+
         '<button class="btn btn-primary yg-pop-add" type="button"><i class="fa-solid fa-plus"></i> Ekle</button></div>';
}
function bindPopupAdd(m){
  var btn=document.querySelector('.leaflet-popup .yg-pop-add'); if(!btn)return;
  btn.textContent=isStop(m)?'Çıkar':'Ekle';
  btn.onclick=function(){toggleStop(m);};
}
```

**Güzergahım repeater** — Kalkış sabit baş, eklenenler sıra, Varış sabit son:
```js
function endRow(kind,c,lbl){
  var li=document.createElement('li'); li.className='rt-stop end '+kind;
  li.innerHTML='<span class="rs-n"><i class="fa-solid fa-flag'+(kind==='d'?'-checkered':'')+'"></i></span>'+
    '<span class="rs-txt"><b>'+lbl+'</b><small>'+(c?c.ad:'—')+'</small></span>';
  return li;
}
function renderStops(){
  ygStops.innerHTML='';
  ygStops.appendChild(endRow('o',trip.from,'Kalkış'));
  route.stops.forEach(function(m,i){
    var li=document.createElement('li'); li.className='rt-stop'; li.setAttribute('data-id',m.ad);
    li.innerHTML='<span class="rs-n">'+(i+1)+'</span><span class="rs-txt"><b>'+m.ad+'</b><small>'+m.konum+'</small></span>'+
      '<button class="rs-x" type="button" aria-label="Çıkar"><i class="fa-solid fa-xmark"></i></button>';
    li.querySelector('.rs-x').addEventListener('click',function(){toggleStop(m);});
    li.addEventListener('mouseenter',function(){flyTo(m);});
    ygStops.appendChild(li);
  });
  ygStops.appendChild(endRow('d',trip.to,'Varış'));
}
```

---

## 9. Liste ↔ harita çift yönlü senkron (toggleStop tek kapı · v1'den taşındı)

Tek `route` state, üç görünüm (baloncuk pin + öneri kartı + durak listesi):
```js
var route={poly:null,stops:[]};
function isStop(m){return route.stops.some(function(s){return s.ad===m.ad;});}
function toggleStop(m){
  var i=route.stops.findIndex(function(s){return s.ad===m.ad;});
  if(i>=0) route.stops.splice(i,1); else route.stops.push(m);
  renderStops(); drawStopLine(); syncStates();
  if(map.getPopup&&balloons[m.ad]) balloons[m.ad].marker.closePopup();
}
var stopLine=null;
function drawStopLine(){
  if(stopLine)map.removeLayer(stopLine);
  if(!trip.from||!trip.to)return;
  var pts=[[trip.from.lat,trip.from.lng]]
    .concat(route.stops.map(function(m){return [m.lat,m.lng];}))
    .concat([[trip.to.lat,trip.to.lng]]);
  stopLine=L.polyline(pts,{color:'#E14827',weight:3,opacity:.9}).addTo(map);
}
function syncStates(){              // baloncuk + kart + popup buton durumlarını state'e eşle
  Object.keys(balloons).forEach(function(ad){
    var on=route.stops.some(function(s){return s.ad===ad;});
    var el=balloons[ad].marker.getElement(); if(el)el.classList.toggle('added',on);
  });
  document.querySelectorAll('.yg-card').forEach(function(c){
    var on=route.stops.some(function(s){return s.ad===c.getAttribute('data-id');});
    var b=c.querySelector('.yg-add');
    b.classList.toggle('on',on);
    b.innerHTML=on?'<i class="fa-solid fa-check"></i> Güzergahında':'<i class="fa-solid fa-plus"></i> Güzergahıma Ekle';
  });
}
function flyTo(m){if(balloons[m.ad]){map.panTo([m.lat,m.lng]);balloons[m.ad].marker.openPopup();}}
function highlightCard(m){          // harita baloncuk → öneri kartı vurgula + scroll
  var c=document.querySelector('.yg-card[data-id="'+m.ad+'"]'); if(!c)return;
  c.classList.add('flash'); c.scrollIntoView({behavior:'smooth',block:'center'});
  setTimeout(function(){c.classList.remove('flash');},1200);
}
function venueIcon(extra){return L.divIcon({className:'yg-pin '+extra,
  html:'<span class="yg-pin-b"><i class="fa-solid fa-utensils"></i></span>',
  iconSize:[34,34],iconAnchor:[17,34],popupAnchor:[0,-30]});}
function placeEndMarker(which,c){ /* origin=slate / dest=tomato-deep divIcon; varsa eskisini kaldır */ }
```
Senkron çiftleri:
- **Baloncuk → liste/kart:** pin tıkla → `highlightCard` (kart flash+scroll); popup "Ekle" → durak.
- **Liste → harita:** durak satırı hover → `flyTo` (pan + popup). Kart "Ekle" → durak + pin "added".
- **Çıkar (her yer):** satır × / kart "Çıkar" / popup "Çıkar" → `toggleStop` → listeden kalkar,
  pin "added" düşer, `stopLine` yeniden çizilir, kart butonu "Ekle"ye döner.

---

## 10. Faz faz implement sırası + doğrulama

> Her faz sonu: 1440 (gerekiyorsa 390) TAM SAYFA render SS + YAZILI rapor (CROP YOK). Konsol temiz teyidi.

**Faz 1 — Sayfa iskeleti + boş harita.**
`yol-guzergahim-v1.html` CREATE: inline shell (header/footer/nav/cookie + ortak CSS/JS) `kesfet-v1.html`'den
birebir; `<title>` güncelle; keşfete özel içerik/JS ALMA. `<main>`'e hero/intro + boş `#routeMap`
(Leaflet init, Türkiye merkez `[40.10,31.00]` z7, OSM tile) + Leaflet CDN.
✅ Doğrulama: sayfa açılır, header/footer diğer mockup'larla **birebir aynı** (logo/menü/footer linkleri),
harita Marmara–İç Anadolu'yu kapsar, tile yüklü, zoom kontrol palet renginde (`#211E16`). Konsol hatasız.
Header menü/footer linkleri 200 (dead-link yok).

**Faz 2 — Uber giriş + dummy rota.**
`CITY` seti, `ygFrom/ygTo` autocomplete (`bindAc`), `setEndpoint`, uç marker'ları, `dummyRoute`/`buildRoute`.
✅ Doğrulama: "İst" yaz → İstanbul önerisi; "Esk" → Eskişehir. İkisini seç → kesik slate rota çizilir,
iki uç marker doğru, `fitBounds` rotayı çerçeveler. **amp kıvrımını gözle kontrol et** (İstanbul→Eskişehir
gibi uzun rota): yay abartılıysa `amp` 0.04 → 0.02. Konsol temiz.

**Faz 3 — ROAD_POOL + koridor + baloncuklar.**
`ROAD_POOL`, `hav`/`distToSeg`/`distToRoute`, `CORRIDOR_KM`, `spawnBalloons`, `venueIcon`, `cardEl`
(.disc-card reuse), `popupHtml`.
✅ Doğrulama: İstanbul→Eskişehir'de Gebze/İzmit/Sapanca/Bilecik/Bozüyük/Eskişehir baloncukları rota
boyunca belirir; İzmir/Ankara-kolu uzakları çıkmaz. Baloncuk tıkla → popup + mini kart; öneri gridi
`.disc-card` görseliyle birebir (`div+bg cover`). `CORRIDOR_KM`=20 dar/geniş mi → ayarla.

**Faz 4 — Güzergahım repeater + çift yönlü senkron.**
`route` state, `toggleStop` (tek kapı), `renderStops` (Kalkış/Varış uçlu), `drawStopLine` (tomato düz),
`syncStates`, `flyTo`, `highlightCard`, popup "Ekle/Çıkar".
✅ Doğrulama: baloncuk/popup/kart "Ekle" → durak listesine girer, pin "added" (yeşil-koyu), bağlantı
çizgisi Kalkış→duraklar→Varış. Satır × / kart "Çıkar" / popup "Çıkar" → her üç yüzeyden senkron kalkar.
Baloncuk tıkla → kart flash. Satır hover → harita pan+popup. Çoklu ekle → sıra korunur.

**Faz 5 — polish + Bağlantı/Akış Denetimi (CLAUDE.md).**
Boş durumlar (rota yokken öneri/Güzergahım gizli; koridorda 0 mekan mesajı), ≤900px sıra
**input → harita(~55vh) → Güzergahım → öneri** + resize `invalidateSize`, hero mobil, bottom-nav/çerez
çakışması yok. Mod yok artık → intro tek.
✅ Doğrulama (Bağlantı & Akış Bütünlüğü):
- Sayfanın TÜM giden CTA/linklerini tıkla-doğrula: header menü, footer linkleri, kart figür →
  `mekan-detay-v1.html` (var, 200), "Ekle/Çıkar" boş onclick değil, bottom-nav hedefleri.
- Uçtan uca akış: yaz→seç→rota→baloncuk→ekle→çıkar Playwright ile yürüt; kopuk halka yok raporla.
- Dead-link/`href="#"`/yanlış-hedef taraması: yok raporla.
- **Dizine ekleme AYRI adım** (henüz bağlı değil): raporda açıkça "yol-guzergahim-v1.html dizine
  Z adımında eklenecek" yaz, sessiz bırakma.

---

## Riskler / açık notlar

- **CDN — KARAR NETLEŞTİ: CDN kalıyor** (unpkg Leaflet 1.9.4 SRI'lı). GitHub Pages canlıda internetten
  açılıyor; local indirme yok.
- **amp şehirlerarası:** 0.04 başlangıç; uzun rotada yay abartısı Faz 2'de gözle kontrol → gerekirse 0.02.
- **CORRIDOR_KM:** 20 km başlangıç (şehirlerarası); dummy rotanın kıvrım genliğiyle birlikte Faz 3 ayarı.
- **Gizli-konteyner gotcha:** harita bu sayfada açılışta görünür → kritik değil, ama resize'da
  `invalidateSize` çağrılır.
- **Inline shell senkronu:** header/footer `kesfet-v1.html`'den birebir kopyalandığı için, shell ileride
  global değişirse bu sayfa da elle güncellenir (mockup'larda zaten böyle — tek-dosya inline shell deseni).
- **Harita-merkezli yük:** ROAD_POOL baloncukları az (≈10) → performans sorunu yok; gerçek veride
  kümeleme (marker cluster) gerekebilir, mock'ta gerekmez.
- `cardEl/pill/statusEl` `kesfet-v1.html`'den **kopya-uyarlama** (yeni sayfa, paylaşım yok) — kabul.
```
