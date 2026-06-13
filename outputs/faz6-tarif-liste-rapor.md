# FAZ 6 — T3 Tarif Liste Cila Raporu (tarif-liste-v1)

> Sahip: tarif-liste teammate · Dosya: `mockups/tarif-liste-v1.html`
> frontend-design skill aktif · r-card/facet dili miras alındı (kılavuz §1/§2b)
> COMMIT/PUSH yapılmadı · MCP playwright kullanılmadı (lead rezerve) — probe'lar
> bağımsız headless Google Chrome instance'ı ile (Python playwright, CDP viewport).

## Yapılan İş

### 1. Kısa liste → dolu grid (9 → 15 r-card)
- 6 yeni r-card eklendi (v3a anatomisi BİREBİR: `.r-media-wrap/.r-media/.r-chip/
  .r-save/.m-types/.r-body h4/.r-facts/.r-foot/.r-author/.r-stats`).
- Gerçekçi tarif adları + Unsplash görselleri (v3a filtre suffix'i
  `exp=7&gam=6&sat=-9&high=8&vib=5`) + yazar/puan/maliyet (`r-cost` ₺ ölçeği) +
  medya tipi rozetleri. Grid artık 3 kolon × 5 satır = sol facet paneliyle
  dikey DENGELİ/DOLU.

### 2. "Öğün" alt-kategori facet'i (yeni, ayrı grup)
- `data-group="Öğün"` facet grubu eklendi (Yemek Modu ile Süre arası).
- Değerler: Kahvaltı · Öğle Yemeği · Akşam Yemeği · Ara Öğün/Atıştırmalık ·
  İkindi & Çay Saati · Gece Atıştırması.
- Mevcut **Beslenme / Tip** facet'iyle ÇAKIŞMIYOR: Öğün = öğün zamanı, Beslenme =
  diyet kısıtı, Kategori = yemek türü, Yemek Modu = pişirme/durum. Dört eksen ayrı.
- `fct-*` dili birebir (fct-head/fct-body/fct-row/cbx/ft/fcnt/fct-dot). Mevcut
  generic facet JS'i (data-group bazlı sayım, dot, chip, temizle) otomatik çalışıyor —
  ek JS gerekmedi.

### 3. Beslenme tipi GÖRSEL ikon rozeti (`.r-diet` — yeni sınıf)
- r-chip/r-save cam-zemin dilinden türetilmiş yuvarlak rozet (radius-circle, pill YOK).
- Konum: medya sol-üst, r-chip ALTINDA dikey istif (top:51px) — r-save (sağ-üst) ve
  m-types (sağ-alt) ile çakışmaz; r-tried'lı kartlara eklenmedi (köşe ayrı ama temiz tuttum).
- İkonlar: vegan=`fa-seedling` (yeşil), vejetaryen=`fa-leaf` (yeşil),
  glutensiz=`fa-wheat-awn-circle-exclamation` (slate), laktozsuz=`fa-glass-water` (petrol).
  Yeşil yalnız bitkisel/sağlık beslenmede (kılavuz renk kuralı).
- Gerçekçi dağılım: 15 karttan **6'sında** rozet (hepsinde değil). title+aria-label var.
- Mobil (≤640) mini kart için ölçek küçültüldü (24px, top:36) — m-types ile çakışmıyor (probe).

### 4. Kart başlığı MAX 2 satır (clamp doğrulandı)
- v3a `-webkit-line-clamp:2; min-height:2.4em` (satır ~940) DOĞRULANDI çalışıyor.
- Bilerek 2 uzun başlıklı kart eklendi (98 ve 95 karakter) → 2 satırda ellipsis ile kesiliyor.
- min-height:2.4em sayesinde tek-satırlık başlıklar da 2-satır yer rezerve ediyor →
  meta satırı (süre/zorluk/maliyet) tüm kartlarda HİZALI.

### 5. Sticky clip fix (page-local, _shell'e DOKUNULMADI)
- Shell `html,body{overflow-x:hidden}` (≈439) body'yi scroll-container yapıp
  `.lst-side{position:sticky}`'yi öldürüyordu (lessons §374 deseni).
- Page CSS'e (şell'den sonra → kazanır) `html,body{overflow-x:clip}` eklendi.
- T5 (tutarlilik-temizlik) site-geneli sticky yayılımını yapacak — ben SADECE
  tarif-liste'yi yaptım; lead'e bildirildi ki T5 bu dosyaya dokunmasın.

## Kanıt (grep + headless DOM/sticky/clamp/overflow probe)

**Grep (yapısal):**
- `r-card` sayısı: **15** (önce 9)
- `.r-diet` rozetli kart: **6** · rozet adedi: vejetaryen×3, vegan×2, glutensiz×3, laktozsuz×1
- `data-group="Öğün"`: 1 · `data-group="Beslenme"`: 1 (ikisi ayrı, korundu)
- `html,body{overflow-x:clip}`: var (satır 776) · `.r-diet{position:absolute}`: var
- `-webkit-line-clamp:2`: var · uzun başlık (>55 char): 2 kart (98, 95)

**DOM probe (headless Chrome, viewport 1280/1440):**
- `#lstGrid .r-card` = 15 · `.r-card .r-diet` = 6 · Öğün facet = 1 · Beslenme = 1
- **Sticky:** `.lst-side` computed `position:sticky; top:130px`; ata zincirinin
  tamamı `overflow:visible`, html+body `overflow-x:clip`. Scroll probe (1440×1100):
  scrollY 0→top 504, **scrollY 450→top 130, scrollY 600→top 130** (TAM yapışma),
  scrollY 800→0, 1000→-200 (panel kendi containing-block'unun sonuna gelince bırakır).
  clip fix yapışmayı MÜMKÜN kıldı (öncesi top hiç 130'a gelmezdi).
- **Clamp:** tüm h4 `clientHeight=43px` (≈2 satır), `webkitLineClamp:2`. Uzun başlıklar
  (i=9 scrollH 60, i=13 scrollH 81) `truncated:true` = 2 satıra kesilmiş. İlk satır
  3 kartın `.r-facts` top'u AYNI (988) = meta hizalı.

**Mobil 390 probe (playwright CDP viewport, 500-floor baypas):**
- `clientWidth=390`, `scrollWidth=390`, `horizScroll=false`, taşan eleman = **0**
  (overflow-x scroller içindekiler hariç tutuldu — element-rect tarama, scrollWidth değil; lessons §171).
- Diet rozeti mobilde görünür, m-types ile çakışma YOK (diet_bottom 1247 < mtypes_top 1283).

## Bilinen Sınırlamalar

1. **Mock sayaç senkronu:** `.lst-sum` "248 tarif" ve `pagiNote` "/28" statik mock;
   grid artık 15 örnek kart gösteriyor ama bu sayılar 9-kart/sayfa varsayımından geliyor.
   JS yalnız filtre değişiminde yeniden hesaplıyor (computeCount sayfa-1 örneği). Kozmetik;
   gerçek backend'de sorun değil.
2. **r-diet dekoratif:** Beslenme tipi rozetleri görsel; filtreleme Beslenme/Tip facet'i
   üzerinden gidiyor (rozet ↔ facet aktif-eşleme bağlanmadı — mock kapsamı).
3. **Öğün facet mock:** sayaçlar uydurma; generic facet JS'i AND/min mantığına otomatik
   katılıyor ama gerçek kartlara `data-ogun` etiketi bağlanmadı (frontend mock).
4. **İkon uzlaşması:** FA 6.5.2 free'de "glutensiz" / "laktozsuz" için ÖZEL glif yok;
   glutensiz=`fa-wheat-awn-circle-exclamation` (buğday-uyarı glifi, title="Glutensiz" ile
   anlamlandırıldı), laktozsuz=`fa-glass-water`. Üretimde özel SVG ikon seti önerilir.
5. **Sticky travel kısa (desktop, kasıtlı):** Panel tüm facet'ler açıkken 1963px ≈ sonuç
   kolonu yüksekliği ("dikey denge" tasarımı, satır 776-778). Bu yüzden top=130 yapışması
   dar bir scroll penceresinde görünür; bug değil, tasarım. Yüksek viewport'ta net görülür (probe).
6. **Render SS yok:** Bu teammate SS almadı (lead faz-sonu turunda render edecek). Probe'lar
   numerik/DOM bazlı — görsel estetik onayı lead'in görsel-gözü turuna bırakıldı.

## EK REVİZE (Beyar) — Beslenme/Tip facet ikonları

İstek: sol "Beslenme / Tip" facet'inin her satırına bağlama uygun FA6 ikonu; kart
üstü `.r-diet` rozetiyle aynı tip → aynı glif. Sadece bu grup; Zorluk/İçerik/Bütçe sade kalsın.

**Yapılan:** `.fct` grubuna `dt-fct` sınıfı + her 14 satıra `<span class="fct-ico">`
(düzen [cbx]→[ikon]→[etiket]→[sayı]). İkon sade muted; bitkisel tip (vegan/vejetaryen)
yeşil tint (`fi-veg`), hover/checked'te tomato (veg yeşil kalır). Gizli `xtra` (9 tip daha)
satırlarına da eklendi.

**İkon eşlemesi (14 tip):** Vegan→seedling · Vejetaryen→leaf · Glutensiz→wheat-awn-circle-exclamation ·
Laktozsuz→glass-water (← bu 4'ü kart rozetiyle BİREBİR) · Protein→drumstick-bite · Az Yağlı→droplet ·
Glutenli→wheat-awn · Süt İçermez→mug-saucer · Yumurta İçermez→egg · Şeker İlavesiz→cube ·
Yüksek Lifli→**carrot** (lead'in wheat-awn önerisi Glutenli ile çakışıyordu; lif=sebze semantiğiyle
ayrıştırdım — lead "daha iyi semantik bulursan değiştir" demişti) · Tam Tahıllı→bowl-rice ·
Acılı→pepper-hot · Baharatlı→mortar-pestle.

**Kanıt (headless probe):** 14 satır → hepsinde ikon, **tüm glifler render** (hasGlyph=true,
kırık kare yok), düzen sırası `[cbx]<[ikon]<[etiket]<[sayı]` tüm satırlarda doğru. Kart `.r-diet`
glifleri {Vegan:seedling, Vejetaryen:leaf, Glutensiz:wheat-awn-circle-exclamation, Laktozsuz:glass-water}
= facet satırlarıyla **birebir aynı**. Diğer gruplar (Zorluk/İçerik Türü/Bütçe/Süre/Öğün) = 0 ikon (dokunulmadı).

**Bilinen sınırlama (ek):** Yüksek Lifli ikonu lead önerisinden (wheat-awn) saptırıldı (carrot) —
gerekçe yukarıda; kart rozetindeki 4 sabit tip korundu. Süt İçermez `fa-mug-saucer` (FA6 free'de
"süt/inek-çizili" glif yok); Laktozsuz `glass-water` ile karışmasın diye farklı glif seçildi.

## Tasarım Gözü Notu

- Diet rozetleri sol-üstte dikey istif, mevcut köşe-rozet dilini (r-chip/r-save/m-types/
  r-tried) bozmadan 5. köşe-katmanı ekliyor; kart yoğunluğu artmadı çünkü gerçekçi
  dağılımla yalnız ilgili kartlarda. Yeşil (vegan/vejetaryen) marka renk kuralına uygun.
- Öğün facet'i Süre/Zorluk'tan önce, açık (open) geldi — keşif eksenleri arasında
  "ne zaman yiyeceğim?" mantıksal olarak üstte; panel ritmi korundu (border-bottom hairline).
- 15 kart 3×5 grid'i doldurunca sol panel-sağ grid dikey dengesi gerçekçi e-ticaret/
  tarif-portalı hissi veriyor; eski "yarım kalmış" boşluk kapandı.
