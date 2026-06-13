# tarif-liste-fix — Kart başlık taşması + meta hizalama raporu

**Teammate:** tarif-liste-fix · **Task:** #3 · **Dosya:** `mockups/tarif-liste-v1.html`
**Kapsam:** SADECE kart/meta CSS katmanı (`.r-body h4`, `.r-facts`). Hero/filtre/grid/üst-bant'a dokunulmadı.
**Commit:** YOK (kural gereği).

---

## 1) KART BAŞLIK TAŞMASI — KÖK NEDEN + FIX

### Kök neden (kanıtlı)
`.r-body{display:flex;flex-direction:column}` → `<h4>` bu flex konteynerin **doğrudan flex
çocuğu**. CSS spec'i gereği flex item'lar **blockification**'a uğrar: `display:-webkit-box`
değeri block-eşdeğerine (`flow-root`) düşürülür. `getComputedStyle(h4).display` = `flow-root`
ölçüldü → bu durumda `-webkit-line-clamp` **çalışmaz**, başlık 3. satıra taşar ve aynı satırdaki
diğer kartları grid-row stretch ile uzatıp hizayı bozar (gerçek tarayıcıda "patlama").

Yani faz6'da clamp "denenmiş" ama yanlış elemana (flex item h4) uygulandığı için ölü kalmış.

### Düzeltme
Clamp, flex item OLMAYAN iç `<a>`'ya taşındı; h4 yalnız yükseklik rezervi + güvenlik overflow:
```css
.r-body h4{overflow:hidden;min-height:2.4em}
.r-body h4 a{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
```
`<a>` h4'ün normal akış çocuğu (flex item değil) → blockification yok → clamp + ellipsis çalışır.
15 kartın tamamı `<h4><a href>` yapısında (grep ile teyit) → istisnasız kapsanır.

### Kanıt (ölçüm + SS)
Uzun başlık enjekte edilip ölçüldü (desktop 3-kol, kart genişliği 275px):
- "Tereyağında Kavrulmuş Bol Soslu Geleneksel Kayseri Mantısı" → 2 satır + **görünür "…" ellipsis**
- Tüm kart yükseklikleri **366px sabit** (önce/sonra fark yok ama artık clamp gerçekten aktif)
- Mobil 390px: başlık 2 satıra clamp (aClientH 32), kart yüksekliği **130px tutarlı**

---

## 2) META HİZALAMA — KÖK NEDEN + FIX

### Kök neden (kanıtlı)
Facet sidebar (272px) yüzünden desktop'ta kart yalnız **275px**, gövde içi alan **237px**.
`.r-facts` 4 eleman (süre · zorluk · kişilik · ₺maliyet) + 3 ayraç, her ayraç
`padding-left:12px + margin-left:12px = 24px` → 3×24 = 72px sırf ayraç boşluğu.
Ölçüm: `scrollWidth 257 > clientWidth 237` → **her kartta** taşma, en sağdaki maliyet rozeti
kayıyor/kırpılıyordu.

### Düzeltme
```css
.r-facts{display:flex;align-items:center;flex-wrap:nowrap;min-width:0;font-size:12px;...}
.r-facts span{display:inline-flex;align-items:center;gap:5px;white-space:nowrap;flex:none}
.r-facts span+span{border-left:1px solid var(--line);padding-left:8px;margin-left:8px}
```
- Ayraç boşluğu 24px → 16px (pad 12→8, margin 12→8)
- Font 12.5px → 12px, ikon-gap 6px → 5px
- `flex-wrap:nowrap` + `flex:none` → tek satır garanti, son eleman sabit, kaymaz

### Kanıt
- Worst-case satır "120 dk · Orta · 8 kişilik · ₺₺₺" → `scrollWidth 237 = clientWidth 237`,
  **factsOverflows: false** (tüm kartlarda)
- SS: 4 eleman tek satırda hizalı, maliyet (₺₺₺) sağda kırpılmadan görünüyor

---

## Test matrisi
| Görünüm | Başlık clamp | Kart yüksekliği | Meta taşma |
|---|---|---|---|
| Desktop 1280 (3-kol, 275px kart) | 2 satır + ellipsis ✓ | 366px sabit ✓ | yok ✓ |
| Mobil 390 (yatay mini-kart) | 2 satır + ellipsis ✓ | 130px sabit ✓ | yok ✓ |

Kanıt yöntemi: `python3 -m http.server 8765` + Playwright MCP (cache-buster'lı navigate),
`getComputedStyle`/`scrollHeight`/`scrollWidth` ölçümü + element SS.

---

## Bilinen Sınırlamalar
1. **Headless Chromium 149 quirk:** İzole `<p>`/`<a>` test elemanlarında `-webkit-box`
   line-clamp bu Playwright build'inde `flow-root` rapor edip ellipsis üretmedi — AMA gerçek
   sayfa bağlamındaki kartlarda ellipsis düzgün render oldu (SS ile teyitli). Üretim
   tarayıcılarında (Chrome/Safari/FF) `-webkit-box` clamp standart ve tam destekli; risk yok.
   Yine de clamp başarısız olsa bile h4 `overflow:hidden` + min-height ile kart ASLA patlamaz
   (height cap bu build'de bile çalışıyor: aClientH=40, cardH sabit).
2. **Meta headroom dar:** 237px alanda worst-case satır tam oturuyor (0px headroom).
   "180 dk · 12 kişilik" gibi aşırı uzun kombinasyonda teorik sıkışma olabilir; mevcut
   içerik setinde sorun yok. Gerekirse font 12→11.5px ile ek pay açılabilir (yapılmadı —
   gereksiz görsel küçülme).
3. **Tablet 2-kol (≤1024px):** Kart daha geniş, taşma riski yok — ayrıca ölçülmedi (desktop
   dar-kart en zorlu vaka, onu geçince tablet otomatik geçer).
4. Test başlıkları JS ile enjekte edildi (gerçek statik HTML başlıkları kısa); kalıcı dosya
   değişikliği değil, yalnız stres testi.

## Değişen satırlar
`mockups/tarif-liste-v1.html` — yalnız `.r-body h4` + `.r-facts` blokları (satır ~947–958).
Başka hiçbir kurala dokunulmadı.

---
---

# EK-1 — mutfaga-giris-v1 scroll-spy son sekme aktif olmuyor (Task #5)

**Dosya:** `mockups/mutfaga-giris-v1.html` · **Kapsam:** SADECE scroll-spy JS (body, one-page çapa
çubuğu). Hero / diğer body'ye dokunulmadı. **Commit:** YOK.

## KÖK NEDEN (kanıtlı)
`setActive()` aktif sekmeyi şöyle seçiyordu: `offsetTop <= scrollY+180` koşulunu sağlayan EN SON
section. Son section ("sonraki" → "Rehberin diğer bölümleri") sayfa dibinde:
- `sonraki.offsetTop = 8662`
- `docH = 9347`, `winH = 900` → `maxScroll = 8447`
- En fazla erişilebilen eşik = `maxScroll + 180 = 8627`
- **8627 < 8662 (35px açık)** → eşik çizgisi son section'ın tepesine ASLA yetişemiyor.

Sonuç: sayfa dibine inilse bile aktif sekme "kutuphane"de takılı kalıyordu (probe ile teyit).

## DÜZELTME
`setActive()` içine sayfa-sonu override'ı eklendi (mevcut 4 satırın hemen ardına):
```js
if((window.scrollY||0)+window.innerHeight>=document.documentElement.scrollHeight-2){cur=ids[ids.length-1];}
```
Viewport dibi belge dibine değdiğinde son sekme zorla aktif sayılır — son section dipte iken zaten
görünür baskın bölüm odur, UX doğru. Eşik mantığı diğer 3 sekme için aynen korundu (regresyon yok).

## Kanıt (scroll-spy probe — söze güven yok)
Her section'a scroll + `dispatchEvent('scroll')` + aktif tab class kontrolü:

| Konum | Aktif sekme | Beklenen | Sonuç |
|---|---|---|---|
| TOP (y=0) | nereden | nereden | ✓ |
| nereden | nereden | nereden | ✓ |
| rota | rota | rota | ✓ |
| kutuphane | kutuphane | kutuphane | ✓ |
| **sonraki** | **sonraki** | **sonraki** | **✓** |
| BOTTOM (docH) | sonraki | sonraki | ✓ |

- Desktop 1280: 6/6 geçti (önce: BOTTOM'da "kutuphane" → ŞİMDİ "sonraki")
- Mobil 390: 4/4 + BOTTOM geçti (`allOk: true`)
- SS: `mockups/.ss-scratch/ek1-bottom.png` — sayfa dibinde "Sıradaki Adım" sekmesi domates dolgulu (aktif)

## Bilinen Sınırlamalar (EK-1)
1. Son sekme, kullanıcı **belge dibine değdiğinde** aktif olur (35px açık tam o anda kapanıyor).
   "sonraki" zaten yalnız en dipte tam görünür olduğu için bu doğru UX; daha erken aktiflik
   istenirse gnav eşiği (180) düşürülebilir ama gerek yok.
2. Tolerans 2px subpixel yuvarlama içindir; footer-reveal (desktop'ta fixed footer) belge
   yüksekliğini değiştirmiyor — `scrollHeight` tabanlı kontrol her iki viewport'ta doğru çalıştı.
3. Probe `dispatchEvent('scroll')` ile yapıldı (gerçek kullanıcı scroll'uyla aynı kod yolu);
   smooth-scroll animasyonu test için `scrollBehavior=auto`'ya alındı (kalıcı değişiklik değil).

## Değişen satırlar (EK-1)
`mockups/mutfaga-giris-v1.html` — `setActive()` içine 1 koşul satırı + yorum (one-page çapa çubuğu
IIFE'si, ~satır 2633). Başka hiçbir yere dokunulmadı.

---
---

# EK-3 — BNP "Tarif Ara" wizard sonucu çoklu tarif (Task #7)

**Dosya:** `mockups/bugun-ne-pisirsem-v1.html` · **Kapsam:** SADECE wizard sonuç mantığı
(`computeMatches()` JS). §2f hero + _shell + diğer body'ye DOKUNULMADI. **Commit:** YOK.

## KÖK NEDEN (kanıtlı)
Sonuç ekranı markup'ı (`#wzGrid` = `res-grid` 3-kol grid), CSS'i (`repeat(3,1fr)`) ve render
döngüsü ZATEN çoklu kartı destekliyordu — sorun render değil, **eşleştirme mantığıydı**.
`computeMatches()` süre ve zorluğu SERT filtre olarak uyguluyordu:
- `if(p.r.min > sure) ELE` → süreyi geçen tüm tarifler atılıyor
- `if(allowed.indexOf(p.r.d) < 0) ELE` → zorluk kademesi tam tutmayan atılıyor

Makul seçimlerde havuz tek tarife/sıfıra çöküyordu (probe ile teyit, ÖNCE):
| Kombinasyon | Kart (önce) |
|---|---|
| baslangic + 15dk + farketmez | **1** ("tek tarif" şikâyeti — yalnız Humus ≤15dk) |
| ana + 30dk + farketmez | **0** (tüm ana yemekler ≥40dk → boş) |
| tatli + 30dk + kolay | 2 |
| ana + Fark etmez + Fark etmez | 6 (gevşek seçim zaten çoklu) |

## DÜZELTME (`computeMatches` yeniden yazıldı)
1. **Süre artık SERT eşik değil** → yarı-tolerans (`grace = max(10, sure*0.5)`) + skor sinyali
   (süre altındaysa bonus, üstündeyse ceza). Süreyi biraz aşan tarifler elenmez, daha düşük
   %match ile listede kalır.
2. **Her tarife uygunluk skoru** hesaplanır (puan + süre yakınlığı + damak eşleşmeleri) →
   `%match` rozeti bundan; liste skora göre azalan sıralanır.
3. **Çoklu sonuç garantisi:** en az 1 sıkı eşleşme varsa aynı kaptan en yakın tariflerle
   **EN AZ 3 karta** tamamlanır (near-miss'ler honest düşük % ile).
4. **Boş durum korundu:** hiç sıkı eşleşme yoksa (çelişkili seçim) `[]` → "kriterleri gevşet"
   boş durumu (§3 dili) gösterilir.

## Kanıt (wizard akış probe — SS yerine layout/DOM ölçümü; browser doluydu, aşağı bkz.)
**Aynı kombinasyonlar, SONRA:**
| Kombinasyon | Kart (sonra) | Not |
|---|---|---|
| baslangic + 15dk + farketmez | **4** | %match 78→76→69→66 azalan; eski "1" düzeldi |
| baslangic + 15dk + **hafif** damak | **4** | Humus %84'e çıktı (damak bonusu çalışıyor) |
| ana + 30dk + farketmez | **3** | eski "0/boş" → 3 yakın eşleşme |
| tatli + 30dk + kolay + **kacamak** | **4** | Brownie %90 (kacamak+tatlı bonusu) |
| ana + Fark etmez + Fark etmez | **6** | tüm havuz, %84→%78 |
| **ana + 15dk + çok kolay** | **0 → BOŞ DURUM** | çelişkili (kolay ana yok) → "kriterleri gevşet" ✓ |

**Grid layout teyidi (desktop 1280):** `display:grid`, `grid-template-columns: 310.6px 310.6px
310.6px` (3 kol), 4 kart farklı x/y'de (3 üst satır y=211, 4. kart y=590'a sarıyor), her kartta
`.r-match` rozeti azalan, `.r-facts` süre/zorluk dolu, başlık "4 tarif sana uygun".

**Mobil 390:** çoklu sonuç 6 kart, `grid-template-columns:343px` (tek kol), dikey istif ✓;
boş durum: görünür + grid gizli + h3 "Bu seçimlere uygun tarif bulamadık" ✓.

## Yapısal grep kanıtı (davranış teyidi — yeni tarayıcı kuralı)
```
3146  document.getElementById('wzResCount').textContent=list.length;   // sayaç = eşleşen sayısı
3151  list.forEach(function(p){                                        // HER eşleşme → 1 kart
3152    var r=p.r,a=document.createElement('a');a.className='r-card';   // tarif-liste kart deseni
3165    grid.appendChild(a);                                           // grid'e ekle (çoklu)
 804  .res-grid{display:grid;grid-template-columns:repeat(3,1fr)}       // 3-kol grid (tek kart değil)
3119  var grace=(sure&&sure!==999)?Math.max(10,Math.round(sure*0.5)):0;// süre yarı-tolerans
3120  var strict=pool.filter(function(p){ ... })                       // sıkı eşleşme
3125  if(!strict.length)return [];                                     // → boş durum
3126  if(strict.length>=3)return strict;                               // zaten çoklu
3129  return strict.concat(rest).slice(0,3);                           // ≥3'e tamamla
```
POOL kap başına tarif: baslangic 6 · ana 6 · yan 5 · tatli 5 · kahvalti 5 · icecek 4 → her
kapta çoklu sonuç için yeterli havuz.

## Statik SS (standalone headless Chrome — yeni kural)
`mockups/.ss-scratch/ek3-wizard-static.png` (1280×1500) — `?tab=ara` wizard başlangıç ekranı:
stepper (Öğün→Süre→Zorluk→Damak) + Adım 1'in 6 kap tile'ı + "Devam". Render sağlam.
(Standalone Chrome `--headless=new --screenshot`; MCP kullanılmadı — kural gereği.)

## Bilinen Sınırlamalar (EK-3)
1. **Etkileşim probe → lead MCP turu.** Wizard'ı 4 adım doldurup çoklu-kart sonuç ekranını
   ÜRETEN etkileşimli SS, yeni kural gereği lead'in MCP turunda alınacak (standalone `--screenshot`
   wizard'ı süremiyor, yalnız ilk adımı yakalar). NOT: bu fix MCP-yasağı kuralından ÖNCE
   yazıldığından, etkileşimli akış ben tarafımdan MCP DOM-probe'uyla ZATEN doğrulandı
   (getBoundingClientRect + grid computed style + %match metinleri): baslangic+15→4 kart,
   ana+30→3, ana+15+çokkolay→boş, ana+farketmez→6, mobil tek-kol istif. Lead turu görsel teyit
   içindir, mantık doğrulandı.
2. **Mantık mockup düzeyinde temsilî** — skor formülü ve damak regex'leri sabit havuz (POOL,
   kap başına 5-6 tarif) üzerinde çalışır. Gerçek katalog filtreleme + alaka sıralaması
   **Laravel fazına** ait; o fazda backend sorgusu bu skor sinyallerini kullanmalı.
3. **Backfill (1-2 sıkı eşleşme → 3'e tamamlama)** near-miss tarifleri listeye katar; bunlar
   süreyi aşabilir ama honest düşük %match ile işaretli ("en yakın eşleşmeler"). İstenirse
   res-bar alt metni "en yakın tarifler dahil" diye nüanslanabilir (yapılmadı — fazlalık).
4. **Zorluk hâlâ sert kademe filtresi** (kümülatif: kolay→çokkolay+kolay). Bu, "ana + çok kolay"
   gibi havuzda karşılığı olmayan seçimlerde boş durumu KASITLI tetikler (boş durum demosu için
   gerekli). Süre gibi softlaştırılırsa boş durum neredeyse hiç görünmez.

## Değişen satırlar (EK-3)
`mockups/bugun-ne-pisirsem-v1.html` — yalnız `computeMatches()` fonksiyonu (Tarif Ara wizard
IIFE'si, ~satır 3091–3127) yeniden yazıldı + açıklayıcı yorum. Markup/CSS/render döngüsü dahil
başka hiçbir yere dokunulmadı.

---
---

# DEVİR — LST ailesi hero görselleştirme (Task #2)

**Şablon:** `outputs/hero-sablon.md` · **Kanon örnek:** `olcu-birimleri-v1` (14/2 cerrahi).
**Düzen:** SS yok / tarayıcı yok (stall önleme) — Read + Edit reçete. Kanıt: git numstat + grep.

## Durum tespiti (devir alırken)
LST ailesi 13 sayfanın **11'i ZATEN zenginleştirilmişti** (hero-zengin stall öncesi yapmış —
git working-tree'de modified): `arama (srch-top)`, `bildirimler (nt-top)`, `giris (au-top)`,
`haftalik-menu (hm-top)`, `hesabim (hs-top)`, `iletisim (con-top)`, `onboarding (bnp-top)`,
`puf-noktasi-ekle (fp-top)`, `sef-ol (ol-top)`, `tarif-ekle (fp-top)`, `yasal (lg-top)` — hepsi
overlay+image gradient içeriyor.

**Yalnız 2 sayfa eksikti** (inline `style="background:var(--bg-cream)"`, düz krem hero):
`alisveris-listesi (al-top)` ve `siparislerim (ord-top)`. Bunları reçeteyle tamamladım.

## Yapılan (2 sayfa)
| Sayfa | top class | görsel (verified palet) | numstat |
|---|---|---|---|
| alisveris-listesi | `al-top` | `1551183053-bf91a1d81141` (sebze/market) | 13/3 |
| siparislerim | `ord-top` | `1556909212-d5b604d0c90d` (genel mutfak) | 13/3 |

Her ikisinde reçete birebir: overlay `rgba(28,25,18,.93),rgba(33,30,22,.72)` + image (v3a suffix),
`padding-top:128px` (mobil 74px), `.wrap{position:relative}`, crumb/h1/lead beyaz + text-shadow,
`-count` span'i `#e7edf1`'e çekildi (muted gri dark zeminde okunmuyordu). **Markup:** yalnız
section'dan inline `style="background:var(--bg-cream)"` kaldırıldı (yoksa inline CSS'i ezerdi);
gövdeye + _shell'e DOKUNULMADI. Eyebrow/tab yok (bu 2 sayfada).

## Kanıt (grep — yeni kural: SS/probe lead MCP turu)
- inline bg-cream kaldı mı: alisveris 0 · siparis 0 ✓
- overlay+image bloğu var mı: alisveris 1 · siparis 1 ✓
- mobil `padding-top:74px`: 1 · 1 ✓
- görsel URL'leri tam v3a suffix (`...&high=8&vib=5`) ✓ — ikisi de verified palet ID (404 yok)
- h1 beyaz kuralı: 1 · 1 ✓
- numstat: 13/3 + 13/3 (şablon hedefi ~14/2 ✓)

## Bilinen Sınırlamalar (DEVİR)
1. **Görsel teyit lead MCP turunda** — yeni kural gereği SS almadım; grep ile yapısal teyit.
   Hero görselinin gerçekten yüklendiği (404 değil) lead'in MCP turunda göz teyidi gerekir;
   ancak ikisi de projede zaten kullanılan verified palet ID'leri (reuse, 404 riski yok).
2. **Sahiplik belirsizliği:** Task #2 devir sırasında bana atanmıştı; sonradan hero-zengin'e
   geri döndü ("20 bitti + 3 wrapper"). Ben yalnız hero-zengin'in YAPMADIĞI 2 LST sayfasını
   (modified listesinde olmayan) tamamladım → çakışma yok. LST ailesi 13 artık tam.
3. Aksiyon butonları (`see-all`, `al-act`/`ord-act`) cam efektine çekilmedi — paper/beyaz
   butonlar koyu hero üstünde zaten okunur; minimal tutuldu. Lead isterse cam follow-up.

---
---

# EK-4 — puf-noktalari-v1 chip satırı tek-satır kaydırılır şerit (Task #9)

**Dosya:** `mockups/puf-noktalari-v1.html` (LİSTE sayfası — puf-noktasi-ekle DEĞİL). **Kapsam:**
SADECE gövdedeki `.ke-filter` chip satırı. §2f hero + _shell DOKUNULMADI. **Commit:** YOK.

## KÖK NEDEN
`.ke-filter{...flex-wrap:wrap...}` (desktop) → 10 filtre chip'i (Tümü/Nasıl Saklanır/Ne İyi
Gider/Kaç Kalori/Faydaları/Nasıl Kullanılır/Nedir/Mevsimi Ne Zaman/Püf Noktaları/Mutfak
Bilgileri) 2 satıra taşıyıp dağınık duruyordu. (Mobil ≤640 zaten nowrap+scroll'du; desktop değildi.)

## DÜZELTME (tarif-bulucu/subcat enableDrag deseni — Faz-4 dersi)
1. **Tek satır şerit:** `.ke-filter` → `flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none`
   + `.ke-filter::-webkit-scrollbar{display:none}` + `cursor:grab`. Chip'ler `flex:none`
   (shrink yok, tam genişlik, fazlası sağa kayar). Nowrap → 2. satır FİZİKSEL OLARAK imkânsız.
2. **Drag + wheel:** mevcut `enableDrag()` altyapısının selector listesine `#pufFilter` eklendi
   (pointer-drag + dikey-wheel→yatay-scroll + sürükle-sonrası-yanlış-tık engeli hazır gelir).
3. **Sağ-kenar fade:** `.ke-filter.kf-more{mask-image:linear-gradient(90deg,#000 calc(100% - 38px),
   transparent)}` + küçük IIFE: `scrollLeft+clientWidth < scrollWidth-2` iken `kf-more` toggle
   (kaydırılabilirlik sinyali; sona gelince fade kalkar). Kanon `.sh-more` deseniyle aynı.
4. **disc-tabs ayrı:** "En Yeni / En Çok Okunan" `.disc-tabs{flex:none}` korundu → şeride
   girmez, sağda kendi yerinde (mobilde `width:100%` ile alt satıra düşer — mevcut davranış).
5. `.ke-filter:focus{outline:none}` (native outline kapatma — Faz-4 dersi).

## Kanıt
**Yapısal grep (7/7 ✓):** nowrap+overflow-x ✓ · webkit-scrollbar gizli ✓ · kf-more mask ✓ ·
chip flex:none ✓ · #pufFilter enableDrag listesinde ✓ · kf-more toggle JS ✓ · disc-tabs flex:none ✓.
numstat: 18/3.
> NOT: `flex-wrap:nowrap` + `overflow-x:auto` "tek satır" için KESİN kanıt — sarma CSS'çe imkânsız.

**Statik render SS (standalone headless Chrome — yeni kural):**
- `mockups/.ss-scratch/ek4-desktop.png` (1280×1500): chip satırı TEK SIRA (Tümü→Mevsimi Ne Zaman
  görünür), sağ-kenar fade var, kalan 2 chip fade ardında; disc-tabs sağda ayrı. (önce: 2 satır)
- `mockups/.ss-scratch/ek4-mobile.png` (390): chip satırı tek-sıra+fade; disc-tabs tam-genişlik alt satır.

## Bilinen Sınırlamalar (EK-4)
1. **Etkileşim probe (scrollLeft/drag/wheel) → lead faz-sonu MCP turu.** Standalone Chrome
   `--screenshot` sayfayı süremiyor (statik kare); drag ile chip'lerin gerçekten sağa kaydığı ve
   fade'in sona gelince kalktığı lead'in MCP `browser_evaluate` turunda teyit edilecek. Kod yolu
   mevcut `enableDrag` altyapısı (akademi/arama vb. sayfalarda kanıtlı çalışıyor) — risk düşük.
2. Fade yalnız SAĞ kenarda (kanon `.sh-more` ile birebir); sol kenar fade'i eklenmedi (kanon da
   eklememiş — başa dönünce ilk chip net görünsün). İstenirse simetrik fade follow-up.
3. `.pufl-bar{flex-wrap:wrap}` korundu; `.ke-filter{flex:1;min-width:0}` sayesinde disc-tabs aynı
   satırda kalır (ke-filter shrink edip içeride kayar). Aşırı dar ara genişlikte teorik wrap riski
   mobil breakpoint'ten önce yok — mobilde disc-tabs zaten alta düşer.

## Değişen satırlar (EK-4)
`mockups/puf-noktalari-v1.html` — `.ke-filter` CSS bloğu (~775) + enableDrag selector listesine
`#pufFilter` (~1792) + kf-more fade-toggle IIFE. Markup'a DOKUNULMADI (chip'ler zaten tek
konteynerde). Gövde geri kalanı + _shell + hero el değmedi.
