# Madde 26 — Yol Güzergahım (Şehirlerarası Yol Üstü Mekan) · Uygulama Planı

> ## ✅ DURUM: TAMAMLANDI (madde 26 KAPANDI — paket 30/30)
> Tüm fazlar uygulandı + doğrulandı + commit'li:
> - ✅ **Faz 1–5** (sayfa iskeleti, Uber giriş, ROAD_POOL koridor, repeater + çift yönlü senkron, polish)
> - ✅ **A Revize** (Sürüş Kabini: örtme/çakışma/akış/mobil)
> - ✅ **Faz A** (Kaydet → localStorage + "Kayıtlı Güzergahlarım" slider + "Haritada Aç" replay + Sil)
> - ✅ **3 giriş noktası** (kesfet-v1 bandı · anasayfa-portal-v3a beyaz kart şerit · mekan-detay-v1 CTA)
> - ✅ **Faz B** (checkpoint route-scoped + rozetler-v1 "Yol Üstü Gurme" + mutfak-defteri Ziyaret sayacı)
> - ✅ **Bug-fix** (BUG1 route-scoped visited izolasyonu + migrasyon · BUG2 unique-count cross-page senk ·
>   BUG3 teşhis: gerçek bug değil, sayım tutarlı 4)
> - ✅ **Uç-marker görsel ayrıştırması** (terminal vs numaralı istasyon — liste + harita; frontend-design,
>   palet-içi; sayım/koridor mantığı dokunulmadı)
>
> Durum (orijinal): PLAN (implement YOK). **Vizyon revize edildi (v2).**
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
| `v6/yol-guzergahim-v1.html` | **CREATE** | Madde 26'nın yeni evi. Inline shell (header/footer/nav/cookie + ortak CSS/JS) `kesfet-v1.html`'den birebir türetilir; içerik = yol planlayıcı. |
| `v6/kesfet-v1.html` | **DOKUNMA** | Artık alakasız (v1 entegrasyonu iptal). |
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

---

# B Revizyon Planı — Varyasyon A → Split Cockpit (❌ İPTAL — uygulandı, geri alındı)

> ❌ **İPTAL (Beyar kararı):** B (Split Cockpit) implement edilip doğrulandı ama **jenerik** bulundu.
> Hedef baştan beri "A'yı KOMPLE değiştir" değil "A'yı REVİZE et"ti. B working-tree'den
> `git checkout` ile atıldı; sayfa son commit'teki **A (Sürüş Kabini)** haline döndü.
> Geçerli plan: aşağıdaki **"A Revize Planı"**. B aşağıda yalnız tarihsel/teknik referans için duruyor
> (B-6'daki salt-okuma akış CTA mantığı A'ya uyarlanacak).

> Durum: işlev (Faz 1–4) çalışıyor; sorun UI Varyasyon A (Sürüş Kabini). Cam paneller
> haritayı/güzergahı örtüyor, rail toggle zayıf, **akış dead-end** (kapanış/CTA yok).
> Yön (İPTAL): A → B (Split Cockpit). Örtme yapısal biter, akış CTA'ya yer açılır.

## B-0. Anahtar teknik tespit (motora dokunmadan B'ye geçişin sırrı)

İki "akıllı guard" sayesinde **işlev JS'ine hiç dokunmadan** layout B'ye geçilebilir:

1. **`fitRoute()` kendiliğinden sönüyor.** Şu an (satır 2309–2317) örtmeyi telafi için
   `if(planEl && getComputedStyle(planEl).position==='absolute')` ile sağ panel genişliği +
   alt rail yüksekliği kadar padding ekliyor. B'de panel artık `absolute` DEĞİL (grid item) →
   bu dal **false** → otomatik simetrik `paddingTopLeft/BottomRight=[20,20]`'ye düşer. Tam da
   örtmesiz layout'un istediği. **fitRoute'a dokunma.**
2. **`#ygRailToggle` kalkıyor.** Son bloktaki (2457–2462) `if(railToggle&&suggestWrap)` guard'ı,
   element silindiğinde `railToggle=null` olduğu için sessizce atlar. Markup'tan rail-toggle'ı
   kaldırmak JS kırmaz.
3. `planEl`/`railToggle` var atamaları (2209–2210) `null` döner — zararsız, **kalır**.

**Sonuç:** motor fonksiyonlarının (`buildRoute`, `routeWaypoints`, `spawnBalloons`, `distToRoute`,
`toggleStop`, `drawStopLine`, `syncStates`, `flyTo`, `highlightCard`, `renderStops`, `cardEl`,
`popupHtml`, `bindAc`, `setEndpoint`) **tek satırı bile değişmez.** Değişen: CSS bloğu + `<section>`
HTML + son JS bloğunda **tek additive ekleme** (akış CTA + isteğe bağlı "Güzergah Oluştur" tetik).

## B-1. Korunan selektörler (hepsi B markup'ında birebir kalır)

`#routeMap` · `#ygFrom` · `#ygTo` · `#ygFromAc` · `#ygToAc` · `#ygHint` · `#ygStopsWrap` ·
`#ygStops` · `#ygSuggestWrap` · `#ygGrid` · `#ygCount` · `#ygPanelEmpty` · `.yg-card` · `.yg-add` ·
`.yg-pin`. **Kaldırılan:** `#ygRailToggle` (+ `.yg-rail*`, `.yg-glass`). **Yeniden adlandırılan:**
`.yg-plan`→`.yg-side` (planEl=null olur, B-0/1 guard yutar).

## B-2. Layout iskeleti (3 zon: komut çubuğu / sol harita / sağ panel)

```
<main>
  <section class="yg-hero"> … </section>            ← AYNEN KALIR (slim intro)
  <section class="yg-stage-sec"><div class="wrap-wide">
    ┌─ KOMUT ÇUBUĞU (.yg-cmd) — sayfa akışında, overlay DEĞİL ───────────────┐
    │  Nereden [input]   →   Nereye [input]   [ Güzergah Oluştur ]            │
    │  .yg-hint (ipucu satırı)                                               │
    └────────────────────────────────────────────────────────────────────────┘
    ┌─ SPLIT (.yg-split: grid 1fr / 360px) ────────────────────────────────────┐
    │  SOL .yg-map-wrap (sticky)        │  SAĞ .yg-side (akış kolonu)           │
    │  ┌────────────────────────────┐   │  • #ygPanelEmpty (boş durum)          │
    │  │  #routeMap  78vh dominant  │   │  • #ygStopsWrap → Güzergahım + [Kaydet]│
    │  │  (panel ÜSTÜNE BİNMEZ)     │   │  • #ygSuggestWrap → dikey öneri listesi│
    │  └────────────────────────────┘   │  • #ygResult (özet kartı, hidden)     │
    └───────────────────────────────────┴───────────────────────────────────────┘
  </div></section>
</main>
```

## B-3. Değişecek bloklar (kesin satır aralıkları)

| Blok | Satır | İşlem |
|------|-------|-------|
| CSS — Varyasyon A bloğu | **1244–1344** | **REPLACE** (B-4'teki CSS ile) |
| HTML — `.yg-stage-sec` section | **1730–1781** | **REPLACE** (B-5'teki markup ile) |
| HTML — `.yg-hero` | 1722–1728 | DOKUNMA |
| JS — railToggle handler | **2457–2462** | **REPLACE** → akış CTA + ygGo tetik bloğu (B-6) |
| JS — motor (her şey) | 2172–2456 | **DOKUNMA** |

## B-4. CSS (1244–1344 yerine — palet-içi, yeni renk yok)

Silinen: `.yg-glass`, `.yg-plan` (absolute), `.yg-rail*`, `.yg-rail-toggle/chev/scroll/::after`,
`.yg-grid{flex;width:max-content}`. Eklenen/değişen iskelet:

```css
.yg-hero{padding-bottom:14px}                       /* aynen */
.yg-stage-sec{padding:4px 0 64px}
.wrap-wide{max-width:1380px;margin:0 auto;padding:0 20px}
/* — KOMUT ÇUBUĞU (akışta, cam değil) — */
.yg-cmd{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius-lg);
  box-shadow:var(--sh-sm);padding:16px 18px}
.yg-trip{display:flex;gap:14px;align-items:flex-end}        /* yatay; dot/line dekoru DÜŞTÜ */
.rt-field{position:relative;flex:1;display:flex;flex-direction:column;gap:5px}
.rt-field label{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.04em}
.rt-field input{padding:11px 13px;border:1px solid var(--line);border-radius:var(--radius-md);font:inherit;background:var(--cream-2);color:var(--ink)}
.rt-field input:focus{outline:0;border-color:var(--tomato);background:#fff}
.yg-arrow{flex:0 0 auto;color:var(--muted);padding-bottom:12px}   /* dekoratif → ok ikonu */
.yg-go{flex:0 0 auto;align-self:flex-end;white-space:nowrap}      /* .btn .btn-primary reuse */
.yg-ac{position:absolute;top:100%;left:0;right:0;z-index:40;margin-top:6px;background:var(--paper);
  border:1px solid var(--line);border-radius:var(--radius-md);box-shadow:var(--sh-md);overflow:hidden}
.yg-ac button{display:flex;align-items:center;gap:9px;width:100%;padding:10px 13px;border:0;background:transparent;font:inherit;text-align:left;cursor:pointer;color:var(--ink)}
.yg-ac button:hover{background:var(--cream-2);color:var(--tomato)}
.yg-hint{margin:12px 0 0;color:var(--slate-2);font-size:12.5px;line-height:1.4;display:flex;gap:7px;align-items:flex-start}
.yg-hint i{margin-top:2px}
/* — SPLIT: sol dominant harita + sağ panel (örtüşme YOK) — */
.yg-split{display:grid;grid-template-columns:1fr 360px;gap:22px;margin-top:18px;align-items:start}
.yg-map-wrap{position:sticky;top:90px;border:1px solid var(--line);border-radius:var(--radius-xl);
  overflow:hidden;box-shadow:var(--sh-md)}
#routeMap{height:78vh;min-height:560px;width:100%;background:var(--cream-2)}  /* radius/shadow → wrap'e taşındı */
.yg-side{display:flex;flex-direction:column;gap:16px;min-width:0}
/* boş durum (rota öncesi) */
.yg-empty{text-align:center;padding:28px 14px;border:1px dashed var(--line);border-radius:var(--radius-lg);background:var(--cream-2)}
.yg-empty .re-ico{width:46px;height:46px;margin:0 auto 12px;display:grid;place-items:center;border-radius:var(--radius-circle);background:var(--paper);color:var(--tomato);font-size:17px}
.yg-empty h3{font-size:15px;margin-bottom:5px} .yg-empty p{color:var(--muted);font-size:12.5px;max-width:240px;margin:0 auto}
/* GÜZERGAHIM durak listesi (panel-içi kart) */
.yg-stops-wrap{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--sh-sm);padding:15px 16px}
.yg-stops-wrap h3{font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--slate);display:flex;align-items:center;gap:7px;margin-bottom:12px}
.rt-stops{list-style:none;display:flex;flex-direction:column;gap:6px}
.rt-stops li{list-style:none}
.rt-stop{display:flex;align-items:center;gap:9px;padding:8px 10px;background:var(--cream-2);border:1px solid var(--line);border-radius:var(--radius-md);transition:background .3s var(--ease)}
.rt-stop.flash{background:var(--tomato-tint)}
.rt-stop.end{background:transparent;border-style:dashed}
.rs-n{flex:0 0 22px;width:22px;height:22px;display:grid;place-items:center;background:var(--tomato);color:#fff;border-radius:var(--radius-circle);font-size:11px;font-weight:700}
.rt-stop.end .rs-n{background:var(--slate)} .rt-stop.end.d .rs-n{background:var(--tomato-deep)}
.rs-txt{flex:1;display:flex;flex-direction:column;min-width:0}
.rs-txt b{font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.rs-txt small{color:var(--muted);font-size:11.5px}
.rs-x{flex:0 0 auto;border:0;background:transparent;color:var(--muted);cursor:pointer;font-size:14px;padding:4px}
.rs-x:hover{color:var(--tomato)}
/* AKIŞ CTA — durak listesi altında */
.yg-save{width:100%;justify-content:center;margin-top:13px;gap:7px}      /* .btn .btn-primary reuse */
/* ÖNERİ LİSTESİ — artık DİKEY (rail değil) */
.yg-suggest{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--sh-sm);padding:15px 16px}
.yg-sug-head h2{font-size:14.5px;display:flex;align-items:center;gap:8px;margin-bottom:12px}
.yg-sug-head .q{color:var(--tomato);font-weight:800}
.yg-grid{display:flex;flex-direction:column;gap:10px}                    /* DİKEY stack */
/* KOMPAKT YATAY SATIR KART (cardEl markup'ı AYNEN; sadece CSS yatay) */
.yg-card{display:flex;gap:11px;background:var(--cream-2);border:1px solid var(--line);border-radius:var(--radius-md);overflow:hidden;transition:.18s var(--ease)}
.yg-card:hover{box-shadow:var(--sh-sm)}
.yg-card.flash{outline:2px solid var(--tomato);outline-offset:1px}
.yc-fig{position:relative;flex:0 0 84px;width:84px;align-self:stretch;cursor:pointer}  /* dik thumb → sol */
.yc-fig .bg{position:absolute;inset:0;background-size:cover;background-position:center}
.yc-km{position:absolute;left:5px;bottom:5px;display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:#fff;background:rgba(33,30,22,.74);padding:3px 6px;border-radius:var(--radius-pill)}
.yc-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:6px;padding:9px 11px 9px 0}
.yc-body h4{font-size:13px;line-height:1.25;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}  /* tek satır */
.yc-meta{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--muted);min-width:0}
.yc-rate{display:inline-flex;align-items:center;gap:4px;color:var(--slate);font-weight:700;flex:0 0 auto}
.yc-rate i{color:var(--yellow)} .yc-cat{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.yg-card .yg-add{margin-top:auto;align-self:flex-start;gap:6px;padding:7px 11px;font-size:11.5px;border-radius:var(--radius-sm)}
.yg-card .yg-add.on{background:var(--green-deep)} .yg-card .yg-add.on:hover{background:var(--green)}
/* popup mini-kart + pin (AYNEN korunur) */
.yg-pop{display:flex;flex-direction:column;gap:2px;min-width:168px}
.yg-pop b{font-size:14px} .yg-pop small{color:var(--muted);font-size:12px;margin-bottom:8px}
.yg-pop-add{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:8px 12px;border:0;border-radius:var(--radius-md);background:var(--tomato);color:#fff;font:inherit;font-weight:600;cursor:pointer}
.yg-pop-add:hover{background:var(--tomato-dark)} .yg-pop-add.on{background:var(--green-deep)}
.leaflet-popup-content{margin:12px 14px}
.leaflet-bar a{color:var(--slate);border-color:var(--line)} .leaflet-bar a:hover{background:var(--cream-2);color:var(--tomato)}
.yg-pin-b{display:grid;place-items:center;width:34px;height:34px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:var(--tomato);color:#fff;box-shadow:var(--sh-md);border:2px solid #fff}
.yg-pin-b i{transform:rotate(45deg);font-size:13px}
.yg-pin.origin .yg-pin-b{background:var(--slate)} .yg-pin.dest .yg-pin-b{background:var(--tomato-deep)} .yg-pin.added .yg-pin-b{background:var(--green-deep)}
/* AKIŞ ÖZET KARTI (#ygResult) — in-flow, overlay DEĞİL */
.yg-result{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius-lg);box-shadow:var(--sh-md);padding:22px 18px;text-align:center}
.yr-ico{width:54px;height:54px;margin:0 auto 12px;display:grid;place-items:center;border-radius:var(--radius-circle);background:var(--green-tint,rgba(0,157,79,.12));color:var(--green-deep);font-size:24px}
.yr-route{font-weight:700;color:var(--ink);margin:2px 0 12px}
.yr-stat{font-size:13px;color:var(--muted);margin-bottom:10px}
.yr-stat .yr-num{color:var(--tomato);font-weight:800;font-size:16px}
.yr-list{list-style:none;text-align:left;display:flex;flex-direction:column;gap:6px;margin:0 0 14px}
.yr-list li{display:flex;align-items:center;gap:8px;font-size:13px;padding:8px 11px;background:var(--cream-2);border:1px solid var(--line);border-radius:var(--radius-md)}
.yr-list li i{color:var(--tomato)} .yr-list li.muted{color:var(--muted);font-size:12px}
.yr-note{font-size:11.5px;color:var(--muted);margin-bottom:14px}
/* MOBİL ≤900: harita üstte ~50vh + panel zonu dikey stack (örtme zaten yok) */
@media(max-width:900px){
  .wrap-wide{padding:0 16px}
  .yg-split{grid-template-columns:1fr;gap:16px}
  .yg-map-wrap{position:static}                       /* sticky kapat */
  #routeMap{height:50vh;min-height:340px}
}
@media(max-width:560px){
  .yg-trip{flex-wrap:wrap} .rt-field{flex:1 1 100%}
  .yg-arrow{display:none} .yg-go{width:100%}
}
```

> **Sticky harita:** `.yg-map-wrap{position:sticky;top:90px}` + `align-items:start` → öneri listesi
> uzasa bile sol harita sabit kalır, sağ panel altından kayar. Mobilde sticky kapatılır.
> **`--green-tint`** değişkeni yoksa CSS fallback `rgba(0,157,79,.12)` devrede (yeni renk değil,
> kurumsal yeşil `#009d4f`'in düşük-alfa'sı).

## B-5. HTML (1730–1781 yerine)

```html
<section class="yg-stage-sec"><div class="wrap-wide">
  <!-- KOMUT ÇUBUĞU (akışta) -->
  <div class="yg-cmd">
    <div class="yg-trip">
      <div class="rt-field">
        <label>Nereden</label>
        <input type="text" id="ygFrom" autocomplete="off" placeholder="Şehir / yer yaz…">
        <div class="yg-ac" id="ygFromAc" hidden></div>
      </div>
      <span class="yg-arrow"><i class="fa-solid fa-arrow-right-long"></i></span>
      <div class="rt-field">
        <label>Nereye</label>
        <input type="text" id="ygTo" autocomplete="off" placeholder="Şehir / yer yaz…">
        <div class="yg-ac" id="ygToAc" hidden></div>
      </div>
      <button class="btn btn-primary yg-go" id="ygGo" type="button"><i class="fa-solid fa-route"></i> Güzergah Oluştur</button>
    </div>
    <p class="yg-hint" id="ygHint"><i class="fa-solid fa-circle-info"></i> İki ucu da yaz — güzergahı çizip yol üstü mekanları gösterelim.</p>
  </div>

  <div class="yg-split">
    <!-- SOL: dominant harita -->
    <div class="yg-map-wrap"><div id="routeMap"></div></div>

    <!-- SAĞ: ayrı panel zonu (overlay değil) -->
    <aside class="yg-side">
      <div class="yg-empty" id="ygPanelEmpty">
        <div class="re-ico"><i class="fa-solid fa-map-location-dot"></i></div>
        <h3>Güzergah bekleniyor</h3>
        <p>Uçları seç — yol üstü mekanlar haritada baloncuk olarak belirsin.</p>
      </div>
      <!-- Güzergahım (üstte) -->
      <div class="yg-stops-wrap" id="ygStopsWrap" hidden>
        <h3><i class="fa-solid fa-list-check"></i> Güzergahım</h3>
        <ol class="rt-stops" id="ygStops"></ol>
        <button class="btn btn-primary yg-save" id="ygSave" type="button"><i class="fa-solid fa-flag-checkered"></i> Güzergahımı Kaydet</button>
      </div>
      <!-- Öneriler (altta, dikey) -->
      <div class="yg-suggest" id="ygSuggestWrap" hidden>
        <div class="yg-sug-head"><h2><span class="q" id="ygCount">0</span> mekan yol üstünde</h2></div>
        <div class="yg-grid" id="ygGrid"></div>
      </div>
      <!-- AKIŞ KAPANIŞI: özet kartı (kayıt sonrası) -->
      <div class="yg-result" id="ygResult" hidden>
        <div class="yr-ico"><i class="fa-solid fa-circle-check"></i></div>
        <h3>Güzergahın hazır!</h3>
        <p class="yr-route" data-yg-route>—</p>
        <div class="yr-stat"><span class="yr-num" data-yg-count>0</span> durak yol üstünde</div>
        <ul class="yr-list" data-yg-stops></ul>
        <p class="yr-note">Bu bir demo özetidir — gerçek kayıt yapılmadı.</p>
        <button class="btn btn-line" data-yg-back type="button"><i class="fa-solid fa-arrow-left"></i> Güzergahı düzenle</button>
      </div>
    </aside>
  </div>
</div></section>
```

> Not: `cardEl` ürettiği `.yg-card` markup'ı (`.yc-fig`/`.yc-km`/`.yc-body`/`.yc-rate`/`.yc-cat`/
> `.yg-add`) **AYNEN** kalır; yatay-satır görünümü tamamen CSS ile (B-4). JS'e kart için dokunma yok.

## B-6. Akış CTA + tetik (JS — 2457–2462 yerine, TEK additive blok)

Motor fonksiyonları değişmez; yalnız **okuma** yapan yeni listener'lar. `trip`, `route`,
`stopsWrap`, `suggestWrap`, `panelEmpty`, `buildRoute` zaten IIFE scope'unda (2198–2306).

```js
// ---- "Güzergah Oluştur" açık tetik (auto-build setEndpoint'te zaten var; bu idempotent ek) ----
var goBtn=document.getElementById('ygGo');
if(goBtn)goBtn.addEventListener('click',function(){buildRoute();});  // buildRoute kendi guard'lı

// ---- AKIŞ KAPANIŞI: Kaydet → özet kartı (salt okuma; motoru ellemez) ----
var saveBtn=document.getElementById('ygSave'),
    resultEl=document.getElementById('ygResult');
if(saveBtn&&resultEl){
  saveBtn.addEventListener('click',function(){
    if(!trip.from||!trip.to)return;
    resultEl.querySelector('[data-yg-route]').textContent=trip.from.ad+' → '+trip.to.ad;
    resultEl.querySelector('[data-yg-count]').textContent=route.stops.length;
    var ul=resultEl.querySelector('[data-yg-stops]');
    ul.innerHTML=route.stops.length
      ? route.stops.map(function(m){return '<li><i class="fa-solid fa-location-dot"></i> '+m.ad+'</li>';}).join('')
      : '<li class="muted">Ara durak eklemeden doğrudan yol — dilersen haritadan ekleyebilirsin.</li>';
    if(panelEmpty)panelEmpty.hidden=true; stopsWrap.hidden=true; suggestWrap.hidden=true;
    resultEl.hidden=false;
  });
  resultEl.querySelector('[data-yg-back]').addEventListener('click',function(){
    resultEl.hidden=true; stopsWrap.hidden=false; suggestWrap.hidden=false;
  });
}
```

> **Akış halkası:** yaz→seç→(auto/Güzergah Oluştur)→rota+baloncuk→ekle/çıkar→**Güzergahımı Kaydet**
> →özet kartı (kalkış→varış + N durak listesi + demo notu)→**Güzergahı düzenle** geri döner.
> Dead-end kapandı. Özet **in-flow** (sağ panelde) → haritayı örtmez.

## B-7. Mobil (≤900px)

`.yg-split` tek sütun → DOM sırası: **komut çubuğu → harita (~50vh) → sağ panel zonu (boş durum /
Güzergahım+Kaydet / öneriler / özet) dikey stack.** Harita sticky kapatılır (`position:static`).
≤560px: komut çubuğu inputları tam-genişlik dikey, ok ikonu gizli, "Güzergah Oluştur" tam-genişlik.
`resize`→`invalidateSize` zaten bağlı (2180).

## B-8. Doğrulama (implement sonrası — şimdi DEĞİL)

- **3-viewport TAM SAYFA SS** (1440 / 768 / 390), CROP yok. Self-verify yazılı rapor.
- **Örtme bitti mi:** rota/baloncuk/zoom kontrolü hiçbir panelce örtülmüyor (B'nin tüm amacı).
- **Akış uçtan uca (Playwright):** İstanbul→Eskişehir yaz/seç → rota+10 baloncuk → 2-3 ekle →
  Kaydet → özet doğru (kalkış→varış, durak sayısı/isimleri) → Düzenle geri.
- **Bağlantı Denetimi:** header menü, footer, bottom-nav hedefleri 200; kart `.yc-fig`→
  `mekan-detay-v1.html` (var); `yg-add`/`yg-save`/`yg-back` boş onclick değil; `href="#"` yok.
- **Konsol temiz** + motor regresyonu (toggleStop/sync/flyTo/highlightCard) hâlâ çalışıyor.
- **Dizine ekleme AYRI adım:** `yol-guzergahim-v1.html` `dizin.html`'e henüz bağlı değil — raporda
  açıkça yaz (Faz 5/sonraki paket).

---

# A Revize Planı — Varyasyon A (Sürüş Kabini) İÇİNDE 3 sorunu çöz (PLAN, implement YOK)

> ✅ **GEÇERLİ PLAN.** A'nın karakteri = full-bleed harita tuval + üstünde yüzen **cam kokpit
> panelleri** (immersive/cesur). Bu karakter KORUNUR. B'deki gibi paneli haritanın yanına taşıyıp
> grid'e dökme YOK. Üç sorun (akış / örtme / toggle) **A'nın cam-overlay dili içinde** çözülür.

## A-0. Mevcut A — ölçülü durum (1440, İstanbul→Eskişehir + 2 durak)

| Panel | Konum | Ölçü | Harita örtme |
|-------|-------|------|--------------|
| `.yg-plan` | sağ-üst (abs top/right:16) | 344×561 | %21 — kabul edilebilir (üst-sağ köşe; rota diagonali burayı az kullanır) |
| `.yg-rail` | alt **tam genişlik** (abs left/right:16, bottom:16) | **1308×283** | **%39 — ASIL SUÇLU**; haritanın alt 1/3'ünü + güney rota kolunu örter, üstelik **açık başlar** |
| toggle | rail-head sağında "↔ kaydır" + küçük chevron | — | collapse edilebildiği **belli değil** |

**Teşhis:** Örtmenin büyük kısmı rail'in (a) tam-genişlik ve (b) açık-başlaması. Bunu çözmek
hem (b) örtmeyi hem (c) toggle'ı aynı anda iyileştirir. Plan paneli ikincil sorun (köşede, tolere edilir).

## A-1. Sınırlar (B ile aynı)

- Motor JS **2172–2456 DOKUNULMAZ** (rota/waypoint/koridor/spawn/toggleStop/sync/fitRoute/buildRoute).
- Korunan selektörler birebir: `#routeMap` `#ygFrom` `#ygTo` `#ygFromAc` `#ygToAc` `#ygHint`
  `#ygStopsWrap` `#ygStops` `#ygSuggestWrap` `#ygGrid` `#ygCount` `.yg-card` `.yg-add` `.yg-pin`
  `#ygRailToggle` (A'da kalıyor!) `.yg-plan` `.yg-rail`.
- Palet tomato `#E14827`, yeni renk yok. Header inline shell + `kesfet-v1.html` dokunulmaz.
- **fitRoute'a kod dokunmadan** kazanım: rail collapsed başlayınca `suggestWrap.offsetHeight` küçülür
  (sadece header ~50px) → fitRoute'un alt padding'i (satır 2314 `rh+28`) otomatik küçülür → rota daha
  geniş açık alana sığar. **Bedava örtme kazanımı, JS değişmeden.**

---

## A-2 · (a) AKIŞ — "Güzergahımı Kaydet" → in-flow özet (A'nın cam diline uyarlı)

**Fikir:** B-6'daki salt-okuma listener'ı A'ya taşı. Özet, A'nın karakterine uygun olarak **ayrı bir
cam panel** (`#ygResult`, `.yg-plan`'ın TAM footprint'inde top-right) — yeni overlap eklemez, plan
panelinin yerini alır. Kaydet'te `planEl` + `suggestWrap` gizlenir, result açılır; Düzenle'de geri.

**HTML — `#ygStopsWrap` içine CTA (mevcut `<ol id="ygStops">` SONRASINA, ~satır 1765):**
```html
  <ol class="rt-stops" id="ygStops"></ol>
  <button class="btn btn-primary yg-save" id="ygSave" type="button"><i class="fa-solid fa-flag-checkered"></i> Güzergahımı Kaydet</button>
```
(stopsWrap rota çizilince `renderStops`'ta un-hidden → CTA otomatik görünür; 0 durakta da geçerli.)

**HTML — yeni cam özet paneli, `.yg-rail` markup'ından SONRA, `.yg-stage` içinde (~satır 1779):**
```html
<div class="yg-glass yg-result" id="ygResult" hidden>
  <div class="yr-ico"><i class="fa-solid fa-circle-check"></i></div>
  <h3>Güzergahın hazır!</h3>
  <p class="yr-route" data-yg-route>—</p>
  <div class="yr-stat"><span class="yr-num" data-yg-count>0</span> durak yol üstünde</div>
  <ul class="yr-list" data-yg-stops></ul>
  <p class="yr-note">Bu bir demo özetidir — gerçek kayıt yapılmadı.</p>
  <button class="btn btn-line" data-yg-back type="button"><i class="fa-solid fa-arrow-left"></i> Güzergahı düzenle</button>
</div>
```

**CSS (A CSS bloğuna ekle, 1244–1344 içi) — özet paneli plan footprint'inde:**
```css
.yg-result{position:absolute;top:16px;right:16px;width:324px;max-width:calc(100% - 32px);
  max-height:calc(78vh - 32px);overflow-y:auto;z-index:6;border-radius:var(--radius-lg);padding:18px;text-align:center}
.yr-ico{width:54px;height:54px;margin:0 auto 12px;display:grid;place-items:center;border-radius:var(--radius-circle);background:rgba(0,157,79,.14);color:var(--green-deep);font-size:24px}
.yr-route{font-weight:700;color:var(--ink);margin:2px 0 12px}
.yr-stat{font-size:13px;color:var(--slate-2);margin-bottom:10px}
.yr-stat .yr-num{color:var(--tomato);font-weight:800;font-size:16px}
.yr-list{list-style:none;text-align:left;display:flex;flex-direction:column;gap:6px;margin:0 0 14px}
.yr-list li{display:flex;align-items:center;gap:8px;font-size:13px;padding:8px 11px;background:rgba(255,255,255,.62);border:1px solid var(--line);border-radius:var(--radius-md)}
.yr-list li i{color:var(--tomato)} .yr-list li.muted{color:var(--muted);font-size:12px}
.yr-note{font-size:11.5px;color:var(--muted);margin-bottom:14px}
.yg-save{width:100%;justify-content:center;margin-top:14px;gap:7px}   /* .btn .btn-primary reuse */
```
> `.yr-list li` arka planı `.rt-stop`'la aynı yarı-saydam beyaz → cam panel içinde tutarlı (A dili).
> `rgba(0,157,79,.14)` = kurumsal yeşil `#009d4f` düşük-alfa (yeni renk DEĞİL); tik onay aksanı.

**JS — additive listener (2457–2462 railToggle bloğuyla AYNI yere, motor DIŞI):** `planEl`, `suggestWrap`,
`trip`, `route` zaten scope'ta (2198–2209).
```js
var saveBtn=document.getElementById('ygSave'), resultEl=document.getElementById('ygResult');
if(saveBtn&&resultEl){
  saveBtn.addEventListener('click',function(){
    if(!trip.from||!trip.to)return;
    resultEl.querySelector('[data-yg-route]').textContent=trip.from.ad+' → '+trip.to.ad;
    resultEl.querySelector('[data-yg-count]').textContent=route.stops.length;
    var ul=resultEl.querySelector('[data-yg-stops]');
    ul.innerHTML=route.stops.length
      ? route.stops.map(function(m){return '<li><i class="fa-solid fa-location-dot"></i> '+m.ad+'</li>';}).join('')
      : '<li class="muted">Ara durak eklemeden doğrudan yol — dilersen haritadan ekleyebilirsin.</li>';
    if(planEl)planEl.hidden=true; if(suggestWrap)suggestWrap.hidden=true; resultEl.hidden=false;
  });
  resultEl.querySelector('[data-yg-back]').addEventListener('click',function(){
    resultEl.hidden=true; if(planEl)planEl.hidden=false; if(suggestWrap)suggestWrap.hidden=false;
  });
}
```
> Salt okuma; `buildRoute/toggleStop/syncStates` çağrılmaz, değiştirilmez. Dead-end kapanır;
> özet A'nın cam panelinde, haritayı plan paneliyle aynı footprint'te örter (yeni örtme yok).

---

## A-3 · (b) ÖRTME minimize — rail'i ehlileştir + planı incelt

**Asıl hamle: rail collapsed-DEFAULT + collapsed'da kompakt pill** (tam genişlikten çık).

1. **Markup:** `#ygSuggestWrap`'a başlangıç `collapsed` sınıfı + `aria-expanded="false"` (~satır 1770/1773):
   ```html
   <div class="yg-glass yg-rail collapsed" id="ygSuggestWrap" hidden>
     ...
     <button class="yg-rail-toggle" id="ygRailToggle" type="button" aria-expanded="false" ...>
   ```
2. **CSS:** collapsed iken rail tam-genişlikten **sola yanaşık kompakt çubuğa** insin (örtme min):
   ```css
   .yg-rail.collapsed{right:auto;width:auto;max-width:calc(100% - 32px)}  /* full-width → pill */
   ```
   (Mevcut `.yg-rail.collapsed .yg-rail-scroll{display:none}` zaten kartları gizliyor → collapsed
   yükseklik ~50px, sadece başlık+toggle. Harita alt 1/3'ü açılır.)
3. **Plan paneli incelt:** `.yg-plan{width:344px}` → **`320px`** (satır 1256); üst-sağ örtme %21→~%19.
   **Şeffaflık (Beyar ONAYLADI):** `.yg-glass` `rgba(255,255,255,.84)`→**`.80`** + blur `15px`→**`16px`**
   (okunabilirlik korunur, harita biraz daha sızar). SS'te beğenilmezse `.84`'e geri dönülür.
4. **fitRoute (DOKUNMA):** collapsed rail offsetHeight küçük → alt padding otomatik düşer → rota/baloncuk
   daha geniş açık alanda. Kullanıcı rail'i açarsa alt geçici örtülür (kullanıcının bilinçli "kartlara
   bak" eylemi) — A'nın cam doğası gereği bu kabul edilebilir denge.

> Net etki: **dinlenme (rest) halinde** harita neredeyse tam açık (sadece sağ-üst 320px plan + sol-altta
> küçük "mekan listesi" pill'i). Cesur/immersive karakter korunur, örtme ciddi azalır.

---

## A-4 · (c) TOGGLE'ı netleştir — belirgin aç/gizle butonu

Mevcut zayıf "↔ kaydır + chevron" yerine **net etiketli pill toggle** (CSS-only dual label; JS toggle
mantığı 2457 bloğunda AYNEN — sadece label'lar CSS ile durum-bazlı görünür):

**HTML — toggle butonu içi (mevcut 1773–1776 yerine):**
```html
<button class="yg-rail-toggle" id="ygRailToggle" type="button" aria-expanded="false" aria-label="Öneri listesini aç ya da gizle">
  <i class="fa-solid fa-chevron-up yg-rail-chev"></i>
  <span class="rt-lbl rt-lbl-open">Listeyi gizle</span>
  <span class="rt-lbl rt-lbl-closed">Listeyi aç</span>
</button>
```
**CSS — pill görünüm + dual label + chevron yön:**
```css
.yg-rail-toggle{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--line);
  background:var(--paper);cursor:pointer;font:inherit;font-weight:700;font-size:12px;color:var(--slate);
  padding:7px 13px;border-radius:var(--radius-pill);transition:.18s var(--ease)}
.yg-rail-toggle:hover{border-color:var(--tomato);color:var(--tomato)}
.yg-rail-chev{font-size:11px;transition:transform .2s var(--ease)}
.yg-rail.collapsed .yg-rail-chev{transform:rotate(180deg)}      /* açık=yukarı ok, kapalı=aşağı */
.rt-lbl-closed{display:none}
.yg-rail.collapsed .rt-lbl-open{display:none}
.yg-rail.collapsed .rt-lbl-closed{display:inline}
```
> Eski `.yg-rail-hint` ("↔ kaydır") ve eski chevron-only kalkar. JS handler (2457–2462) `collapsed`
> sınıfını + `aria-expanded`'ı toggle etmeye DEVAM eder — sadece görünen etiket CSS ile değişir,
> **JS'e mantık eklemeye gerek yok.** ("kaydır" ipucu istenirse expanded başlıkta küçük tutulabilir.)

---

## A-5 · Değişecek bloklar (kesin)

| Blok | Satır | İşlem |
|------|-------|-------|
| CSS — `.yg-plan` genişlik | 1256 | `344px`→`320px` |
| CSS — `.yg-glass` şeffaflık | 1254 | **opsiyonel** `.84`→`.80`, blur `15`→`16` (Beyar SS kararı) |
| CSS — `.yg-rail-toggle` + chevron + dual label | 1298–1304 civarı | pill stil + `.rt-lbl-*` + `.collapsed` chevron 180° |
| CSS — `.yg-rail.collapsed` kompakt pill | (yeni) | `right:auto;width:auto` ekle |
| CSS — `.yg-result`/`.yr-*`/`.yg-save` | (yeni, blok sonu) | A-2/A-3 stilleri |
| CSS — mobil static kuralı | 1342 | `.yg-plan,.yg-rail`→ **`.yg-plan,.yg-rail,.yg-result`** (result da static insin) |
| HTML — Kaydet CTA | ~1765 | `#ygStops` sonrası `#ygSave` |
| HTML — rail collapsed-default + toggle label | 1770–1776 | `collapsed` sınıf + `aria-expanded="false"` + dual-label buton |
| HTML — `#ygResult` cam paneli | ~1779 | `.yg-rail` sonrası ekle |
| JS — save/back listener | 2457–2462 bloğu | railToggle handler KORUNUR; yanına additive save/back (motor DIŞI) |
| JS — motor | 2172–2456 | **DOKUNMA** |

## A-6 · Mobil (≤900px)

`.yg-plan,.yg-rail,.yg-result` → static stack (mevcut kural + result eklenir). Sıra: harita (~50vh) →
plan (giriş+Güzergahım+Kaydet) → rail (collapsed pill, dokun-aç) → kaydet sonrası result. Rail
collapsed-default mobilde de geçerli (dikey yer kazandırır). `.yg-rail.collapsed{right:auto;width:auto}`
static'te zararsız. Kaydet'te plan+rail gizlenir, result görünür.

## A-7 · Doğrulama (implement sonrası — şimdi DEĞİL; B-8 ile aynı disiplin)

- 3-viewport TAM SAYFA + viewport SS (1440/768/390), crop yok, self-verify yazılı rapor.
- **ÖRTME:** rest-halinde rail collapsed pill + plan 320px → harita alt 1/3 açık; rota/baloncuk görünür.
  Önce/sonra örtme % ölç (A-0 metrik scriptiyle).
- **AKIŞ:** yaz→seç→rota+baloncuk→2-3 ekle→**Güzergahımı Kaydet**→özet (kalkış→varış + N durak/isim +
  demo notu)→**Düzenle** geri. Dead-end kapandı mı.
- **TOGGLE:** rail aç/gizle net mi (pill + etiket + chevron yön), aria-expanded doğru mu.
- **MOTOR REGRESYON:** toggleStop/çift-yön senkron/pin-added/highlightCard/flyTo çalışıyor; konsol temiz.
- **BAĞLANTI:** kart→`mekan-detay-v1.html`, `yg-add/yg-save/yg-back` boş değil, `href="#"` yeni yok.
- Dizine ekleme hâlâ AYRI adım — raporda yaz.

---

# Kurgu Tamamlama Planı (Faz A + Faz B) — sonu sonuca bağlanan döngü (PLAN, implement YOK)

> ✅ A revize onaylandı (çakışma/örtme/akış/mobil). Şimdi kurgunun sonu sonuca bağlanıyor.
> Beyar kararları: (1) kayıtlı güzergah **göz önünde** (derin menü yok), (2) checkpoint
> ("ziyaret ettim" → rozet) **bu pakete dahil**, (3) navigation **hem** mekan-liste CTA **hem**
> portal kartı. Motor JS (2172–2456) DOKUNMA; tüm yeni kurgu **additive** (ayrı state/listener).

## K-0. Hedef döngü + state mekanizması

```
Giriş(portal kartı / mekan CTA) → yol-guzergahim → planla(MOTOR) → Kaydet(additive)
   → "Kayıtlı Güzergahlarım" (SAYFADA göz önünde) → kart aç → Haritada Aç (replay) │ Checkpoint detay
   → durakları "ziyaret ettim" işaretle (additive) → ziyaret sayısı rozet sistemine yansır
   → rozetler-v1 "Yol Üstü Gurme" ilerleme + defter "Ziyaret" sayacı
```

**Cross-page dummy state = `localStorage`** (backend yok ama döngü gerçekten kapanır):
```js
// anahtar: 'dada_yg'  (tek JSON)
{
  routes: [ {id, from:{ad,lat,lng}, to:{ad,lat,lng}, stops:[{ad,lat,lng,konum,cat,puan,img,...}], dateStr} ],
  visited: { "Sapanca Göl Kahvaltı": true, ... }     // ziyaret edilen mekan adları (set)
}
// türev: visitedCount = Object.keys(visited).length
```
Yazan: yol-guzergahim (Kaydet, checkpoint). Okuyan: yol-guzergahim (Kayıtlı liste), rozetler-v1,
mutfak-defteri. `new Date().toLocaleDateString('tr-TR')` (gerçek tarayıcı; sandbox değil) → kart tarihi.

> **Motor garanti (her iki faz):** `setEndpoint/buildRoute/toggleStop/renderStops/spawnBalloons/
> syncStates/fitRoute` fonksiyonları **çağrılır ama DEĞİŞTİRİLMEZ**. Yeni kod yalnız `trip`/`route`
> okur, localStorage yazar/okur, bu fonksiyonları çağırır. "Haritada Aç" = mevcut `setEndpoint`'i
> replay etmek (yeni mantık değil, var olanı tetiklemek).

## K-1. "Kayıtlı Güzergahlarım" yansıma yeri — KARAR + gerekçe

| Yer | Rol | Gerekçe |
|-----|-----|---------|
| **yol-guzergahim-v1 (sayfa-içi)** | Kayıtlı Güzergahlarım listesi — **göz önünde** | Beyar "derin menü yok, sayfada görünür" dedi. `<main>`'de `yg-stage-sec` SONRASI (satır 1809–1810 arası) yeni `section`. Faz A ana teslimi. |
| **rozetler-v1 (PRIMARY rozet yansıması)** | "Yol Üstü Gurme" rozeti + ilerleme | Kanonik rozet evi ("rozet sistemine yansısın" = literal). Kilitli-kart `.b-prog`+`.b-left "X/Y mekan · N kaldı"` deseni sayım-eşiğine birebir; `.bgal-stat` pill sayacı. Göz önünde galeri. |
| **mutfak-defteri-v1 (SECONDARY, light)** | hero `.pf-stats`'a "Ziyaret" sayacı + teaser bandında rozet | Defter = profil merkezi, sayaç şeridi + rozet teaser zaten var → düşük maliyetli göz-önünde yansıma. |
| ~~hesabim-v1~~ | — | Ayar merkezi (profil/şifre/gizlilik/üyelik); başarı/keşif için daha az göz-önünde → ATLA. |

---

## FAZ A — Kaydet → göz önünde Kayıtlı Güzergahlarım + kart→tekrar aç + navigation

### A-i. Dokunulacak dosyalar
| Dosya | İşlem |
|-------|-------|
| `v6/yol-guzergahim-v1.html` | Kayıtlı Güzergahlarım sayfa-içi bölüm (HTML+CSS) + Kaydet handler'ı localStorage'a genişlet + renderSavedRoutes + "Haritada Aç" replay (hepsi additive, IIFE içi) |
| `v6/anasayfa-portal-v3a.html` | "Keşfet" discover section'ına (satır 2273) "Yol Güzergahım" tanıtım kartı (additive HTML) |
| `v6/mekan-detay-v1.html` | (mekan-liste yerine — bkz. ⚠️) yol üstü CTA şeridi (additive HTML) |

### A-ii. Eklenecek UI/state (yol-guzergahim)
- **HTML:** `<main>` içinde `yg-stage-sec` sonrası yeni `<section class="yg-saved-sec" id="ygSavedSec" hidden>`:
  başlık "Kayıtlı Güzergahlarım" + `<div id="ygSavedGrid" class="yg-saved-grid">` (kart grid). Boş durumda gizli.
- **Kart deseni** (`div+bg cover` yok; metin kart — tomato aksan): `İstanbul → Bolu` · `N durak` · `tarih`
  + iki aksiyon: `Haritada Aç` (.btn-line) · `Detay / Checkpoint` (.btn-line; Faz B'de aktifleşir).
- **CSS (palet-içi):** `.yg-saved-sec{padding:0 0 64px}`, `.yg-saved-grid{display:grid;
  grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}`, `.yg-saved-card{...border/
  radius/sh-sm; sol kenarda tomato şerit}`, mobilde tek sütun.
- **JS (additive, mevcut save/back bloğunun İÇİNE/yanına — motor değil):**
  ```js
  var LS='dada_yg';
  function lsGet(){try{return JSON.parse(localStorage.getItem(LS))||{routes:[],visited:{}};}catch(e){return {routes:[],visited:{}};}}
  function lsSet(o){localStorage.setItem(LS,JSON.stringify(o));}
  // Kaydet handler'ına EK (mevcut salt-okuma özet kodundan SONRA):
  //   var st=lsGet(); st.routes.unshift({id:'r'+st.routes.length+'_'+(''+Math.random()).slice(2,7),
  //     from:trip.from,to:trip.to,stops:route.stops.slice(),dateStr:new Date().toLocaleDateString('tr-TR')});
  //   lsSet(st); renderSavedRoutes();
  function renderSavedRoutes(){ /* lsGet().routes → ygSavedGrid kartları; boşsa ygSavedSec.hidden=true */ }
  function openSavedRoute(r){ // "Haritada Aç" = MOTOR'u replay (çağrı, değişiklik değil)
    document.getElementById('ygFrom').value=r.from.ad; setEndpoint('from',r.from);
    document.getElementById('ygTo').value=r.to.ad;     setEndpoint('to',r.to);   // both set → buildRoute() motorda
    r.stops.forEach(function(m){ if(!isStop(m)) toggleStop(m); });               // kayıtlı durakları geri ekle
    document.querySelector('.yg-stage').scrollIntoView({behavior:'smooth',block:'start'});
  }
  renderSavedRoutes(); // sayfa açılışında localStorage'dan doldur (kalıcı liste)
  ```
- **State:** localStorage `routes`. Kaydet'te unshift + render. Sayfa açılışında render (kalıcı).

### A-iii. Navigation (additive, shell DOKUNMA)
- **Portal kartı** — `anasayfa-portal-v3a.html` "Keşfet" discover section (2273): `paneMekan` grid'ine ya da
  section başına bir **tanıtım kartı/şerit** (`.disc-card` dilinde ya da ince banner) → `yol-guzergahim-v1.html`.
  Eyebrow "Yeni · Yol Üstü", başlık "Yola çık, yol üstünü keşfet", CTA "Güzergah Planla". Additive, tek `<article>`.
- ⚠️ **mekan-liste CTA — ENGEL (açık rapor, sessiz 404 yok):** `mekan-liste-v1.html` artık **redirect stub**
  (`<meta refresh>` + `location.replace` → `kesfet-v1.html?tab=mekan`). Oraya CTA koymak işe yaramaz (anında
  redirect). Gerçek mekan dizini `kesfet-v1.html` içinde — **kısıtlı (dokunma)**. → **Öneri:** "mekan
  ekosistemi CTA"sını dokunulabilir + semantik tek aday **`mekan-detay-v1.html`** gövdesine koy ("Bu mekan yol
  üstünde mi? Güzergahını planla → Yol Güzergahım"). **Beyar onayı gerek:** mekan-detay ikamesi OK mi, yoksa
  portal kartıyla mı yetinelim? (kesfet-v1 kilitli olduğu için Keşfet Mekanlar sekmesine konamaz.)

### A-iv. Doğrulama (B-8 disiplini)
3-viewport SS; Kaydet→kart eklendi (İstanbul→Bolu·N durak·tarih); reload→liste kalıcı (localStorage);
"Haritada Aç"→rota+baloncuk+duraklar geri yüklendi (motor replay); portal kartı/mekan-detay CTA→
yol-guzergahim (200); motor regresyon; konsol temiz.

---

## FAZ B — Checkpoint ("ziyaret ettim" + ilerleme) + profile/rozet yansıma

### B-i. Dokunulacak dosyalar
| Dosya | İşlem |
|-------|-------|
| `v6/yol-guzergahim-v1.html` | Kayıtlı güzergah **detay/checkpoint** görünümü (additive markup+JS): durak listesi + "ziyaret ettim" toggle + ilerleme (3/5); localStorage `visited` yaz |
| `v6/rozetler-v1.html` | Yeni rozet kategorisi "Keşif & Mekan" + "Yol Üstü Gurme" kilitli kart; küçük JS localStorage `visited` okuyup `.b-prog`/`.b-left` + `.bgal-pill` sayacını doldurur |
| `v6/mutfak-defteri-v1.html` | hero `.pf-stats`'a "Ziyaret" `.pfs` sayacı (localStorage okur); teaser bandına yeni rozet |

### B-ii. Checkpoint (yol-guzergahim, additive — canlı #ygStops'a DOKUNMAZ)
> `#ygStops` satırlarını `renderStops` (MOTOR) üretir → oraya buton ekleyemem. Checkpoint, **kayıtlı-güzergah
> detayında** (benim markup'ım) yaşar. "Detay / Checkpoint" aksiyonu → detay paneli/görünümü açar.
- **UI:** seçilen kayıtlı güzergahın durakları listelenir; her durakta `☐ Ziyaret ettim` toggle (işaretli=
  yeşil-koyu tik `var(--green-deep)`, palet-içi) + üstte ilerleme `3 / 5 durak ziyaret edildi` + `.b-prog`
  benzeri ince bar. Görünüm **sayfa-içi açılır blok** (in-flow, cam/overlay DEĞİL — Beyar onayı; örtme yok).
- **State JS (additive):** toggle → `var st=lsGet(); st.visited[ad]=!st.visited[ad]||delete; lsSet(st);`
  → ilerleme + bar güncelle. Sayım = `Object.keys(st.visited).length`.
- **Motor garanti:** hiçbir motor fonksiyonu değişmez; checkpoint kendi durak kopyasını (kayıtlı `stops`)
  render eder, `route.stops`'a dokunmaz.

### B-iii. Rozet yansıma (rozetler-v1, PRIMARY)
- **HTML (additive):** `.badge-cat` desenine yeni kategori `data-cat="kesif"` ("Keşif & Mekan", `.bh-cnt`) →
  `.badge-grid` → "Yol Üstü Gurme" **kilitli kart** (`.badge-card.locked` + `.b-note.locked` içinde `.b-left`
  "X / 10 mekan · N kaldı" + `.b-prog` bar) + `.badge-tip` (tip-how "10 yol üstü mekan ziyaret et", tip-rank).
  Eşikler (dummy): 3 / 10 / 25. İkon `fa-route` ya da `fa-utensils`.
- **JS (additive, küçük blok):** `var st=JSON.parse(localStorage.getItem('dada_yg')||'{}'); var n=st.visited?
  Object.keys(st.visited).length:0;` → kartın `.b-prog span` width'i + `.b-left` metni + galeri `.bgal-stat`
  pill'i n'e göre. Eşik dolduysa `.locked` kalkar, `.b-note.earned` "Kazanıldı" olur (dummy). rozetler-v1'in
  kendi filtre JS'ine dokunmadan, ayrı `DOMContentLoaded` bloğu.
- **Kademe (`.rank-now`) DOKUNMA** — sadece yeni kategori + kart eklenir.

### B-iv. Defter yansıma (mutfak-defteri, SECONDARY light)
- hero `.pf-stats` şeridine bir `.pfs`: `<i fa-route> Ziyaret <b id="dfZiyaret">0</b>` → küçük JS localStorage
  okur. Teaser bandı (`.badge-band`) zaten rozet kartı dilinde → "Yol Üstü Gurme" kartı eklenir (static ya da
  JS ile ilerleme). Additive; defterin sekme/JS motoruna dokunmaz.

### B-v. Doğrulama (B-8)
Checkpoint: durak işaretle→tik+ilerleme 3/5, reload kalıcı; rozetler-v1 aç→"Yol Üstü Gurme" ilerleme
localStorage sayısını yansıtıyor (eşik dolunca Kazanıldı); defter "Ziyaret" sayacı doğru; 3-viewport SS;
rozetler/defter kendi akışları (filtre/sekme) bozulmadı; konsol temiz; tüm CTA/link 200.

## K-2. Kararlar (Beyar ONAYLADI)
1. **mekan CTA ikamesi:** ✅ `mekan-detay-v1.html` gövdesine CTA + portal kartı ("hem-hem"). mekan-liste-v1
   stub'a / kilitli kesfet-v1'e DOKUNULMAZ.
2. **Checkpoint açılışı:** ✅ **sayfa-içi açılır blok** (in-flow, cam/overlay DEĞİL — örtme yok, A diliyle uyumlu).
