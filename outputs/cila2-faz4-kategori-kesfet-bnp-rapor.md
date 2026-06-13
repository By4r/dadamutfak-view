# CİLA-2 FAZ 4 — Kategori · Keşfet · BNP Raporu (kategori-kesfet-bnp)

> Takım: cila2-faz4 · Görev: TASK #3 · Sahiplik: `bugun-ne-pisirsem-v1.html`,
> `kesfet-v1.html`, `mekan-liste-v1.html` · Veri: `tasks/kategori-veri.md` §9/§10/§11
> · frontend-design skill kullanıldı (mevcut kilitli tasarım dili genişletildi,
> generic AI estetiğinden kaçınıldı). Git commit/push YOK.

## Özet

| İş | Sayfa | Durum |
|----|-------|-------|
| A — 14 mutfak modu (§11) yatay kaydırılabilir ray + açıklama/hashtag paneli | bugun-ne-pisirsem-v1 | ✅ |
| B — BNP kurgu eksiği: TARİF HAVUZU seçici (Kap Ekle/Değiştir → havuzdan seç) | bugun-ne-pisirsem-v1 | ✅ |
| C-1 — Keşfet alt-kategori rayı (§10'un 6'sı, 3'lü üst konsepte map) | kesfet-v1 | ✅ |
| C-2 — "Konsept" facet grubu (§9'un 7'si) | mekan-liste-v1 | ✅ |

numstat: `bugun-ne-pisirsem-v1` +310/−27 · `kesfet-v1` +35/−0 · `mekan-liste-v1` +14/−0

---

## İŞ A — 14 mod rayı (§11)

- Mock 8 mod → **gerçek 14** (§11: Kadınlar Matinesi, Davet Sofraları, Aile
  Büyükleri Bir Arada, Sağlıklı Yaşam, Dizi/Film Akşamı, Maç Keyfi, Romantik
  Akşam, Aile Sofrası, Hızlı & Pratik, Misafir Geldi, Gece Atıştırmalığı, Kahve
  Yanı, Tek Başına Parti, Piknik Keyfi). + "Tüm Menüler" filtre chip'i = 15 chip.
- **Görselli `mode-chip` pattern KORUNDU** (yeniden yazılmadı; veri 14'e çoğaltıldı).
- **Yatay kaydırılabilir ray:** mevcut `overflow-x:auto` korundu. Beyar kararı
  gereği kaydırma göstergesi eklendi: sağ kenar **gradient fade** (`.mode-rail::after`)
  + **kaydır oku** (`.mode-rail-next`) + ilk görünümde **"14 yemek modu — kaydırarak
  hepsini gör" hint metni**. Ray sonuna gelince (`at-end`) fade+ok söner; kaydırınca
  (`scrolled`) hint söner. **Ray viewport'u TAŞMAZ — içerik scroll eder** (390 probe:
  modeBar scrollWidth=2064 > clientWidth=343 = scrollable; `.mode-rail` rect.right=359 ≤ 390).
- **§11 açıklama + hashtag:** mod seçilince `.mode-desc` panelinde mod adı + açıklama
  + 5 hashtag chip'i gösterilir ("Tüm Menüler"de gizli). Veri §11'den birebir.
- 8 mock menü, 14 mod key'ine **remap** edildi + 12 menüye genişletildi; **14 modun
  TÜMÜ ≥1 menü görür** (boş-durum demo'da çıkmaz).

## İŞ B — BNP TARİF HAVUZU (Beyar revizesi, kurgu eksiği kapatıldı)

**Eski template kavrandı:** `drive-download-.../dada-mutfak-icerik/bugun-ne-pisirsem.html`
— gözle browse edilen tarif grid'i (sekmeler + her kartta "Ekle/Eklendi" butonu),
kullanıcı havuzdan **spesifik tarif** seçip menüsüne ekliyordu. Yeni mockup'ta bu
parça yoktu: "Kap Ekle" sadece kap tipi seçtirip POOL'dan idx=0 otomatik dolduruyor,
"Değiştir" idx++ ile döngülüyordu — gerçek seçim yok.

**Yeni tasarım diliyle eklenen parça — "Tarif Havuzu" seçici modal:**
- Markup `</main>` SONRASINA konuldu (lessons: fixed overlay page-main stacking'ine
  girmez — lg-gate ile aynı disiplin). `.rp-overlay` + `.rp-modal`.
- **Kap Ekle** → havuz modalı açılır: kap-tipi sekme filtresi (Tümü/Başlangıç/Ana/
  Yan/Tatlı/Kahvaltılık/İçecek) + **arama kutusu** + tarif kartları (foto·puan·süre·
  zorluk·kategori etiketi) + her kartta **"Menüye Ekle"**. Seçilen SPESİFİK tarif
  menüye eklenir (idx=0 otomatik DEĞİL). Havuz açık kalır → çoklu ekleme, buton "Eklendi".
- **Değiştir** → aynı modal, o kabın türüne scope'lu açılır ("X kabını değiştir"),
  seçilen tarifle slot değişir + modal kapanır.
- POOL **31 tarife** genişletildi (kap başına 4-6), tüm görsel ID'leri sayfada
  CDN-doğrulanmış ID havuzundan (ölü Unsplash ID dersi — yeni ID eklenmedi).
- Mevcut aksiyonlar (Çıkar · Adını Değiştir · Deftere Kaydet · Alışveriş Listesi)
  KORUNDU. Mobilde modal alt-sheet'e dönüşür. SS: `?havuz=1`.

**Gerçek tıklama probe (havuzdan ekle akışı):** menü aç → kap=4 → Kap Ekle → havuz
açıldı (31 kart, 7 sekme) → "Menüye Ekle" → **kap=5** (eklendi ✓), buton "Eklendi",
havuz açık kaldı (çoklu ekleme ✓) → kapat ✓ → Değiştir → "Başlangıç kabını değiştir"
başlığı ✓ → seç → modal kapandı ✓. Konsol: 0 hata.

## İŞ C — Keşfet (üst 3'lü konsept KORUNDU, DOKUNULMADI)

**mekan-liste-v1:** Facet paneline **YENİ "Konsept" grubu** eklendi (ilk grup,
açık) — §9'un 7 kategorisi: Manzaralı / Tarihi / Butik / Aile Dostu / Romantik
Mekânlar + Yerel Lezzet Noktaları + Vegan & Vejetaryen Mekânları (mock count'lar).
Facet motoru generic (`data-group` sürümlü) — JS değişikliği gerekmedi; checkbox →
fchip + fct-dot sayaç + collapse otomatik çalışıyor (probe: fchip=1, dot ✓).

**kesfet-v1:** Üst 3'lü chip rayı (Hepsi · Mekânlar · Gurme Lezzetler · Etkinlikler ·
Lezzet Rotaları · Söyleşi) **AYNEN korundu**. Altına dashed-ayraçlı **ikincil
"Kategori:" alt-filtre rayı** eklendi — §10'un 6 kategorisi (Mekanlar / Yerel
Lezzetler / Sokak Lezzetleri / Gizli Keşifler / Konsept Mekanlar / Lezzet Rotaları),
her biri `data-concept` ile 3'lü üst konsepte **map'li**: alt-chip seçilince bağlı
olduğu üst konsept de işaretlenir (mapping görünür). Probe: 6 alt-chip, tek-seçim
toggle ✓, parent konsept aktivasyonu ✓.

---

## Kanıt (probe özeti)

- **390 element-rect taşma + scrollWidth probe** (3 sayfa): `sw=375 ≤ 390` (3/3),
  eklenen elemanların (mode-rail/mode-desc/rp-modal/ke-subfilter/Konsept-fct)
  hiçbiri taşma listesinde DEĞİL.
- **Konsol:** 3 sayfada 0 hata.
- **Fonksiyonel:** BNP havuz ekle/değiştir akışı, mod seç → açıklama paneli,
  kesfet alt-chip → parent map, mekan Konsept facet → fchip — hepsi tıklama probe'da çalıştı.
- SS: `bnp-havuz.png`, `bnp-mod-desc.png`, `kesfet-sub.png`, `mekan-konsept.png`
  (`mockups/.ss-scratch/cila/`).

## Bilinen Sınırlamalar

1. **Off-canvas drawer rect taşması (false-positive, tüm sayfalarda mevcut):** 390
   probe'da mobil drawer'ın `.d-item/.d-link/.d-sub` öğeleri ve içlerindeki ikonlar
   rect.right>390 raporluyor. Bunlar **ekranda görünmeyen, translateX ile off-canvas**
   konumlanmış kanonik mobil menü öğeleri; gerçek yatay scroll üretmiyorlar
   (`scrollWidth=375`). Benim eklediğim öğelerin hiçbiri taşmıyor. Önceki FAZ QA'larıyla
   (70×390=0 taşma) tutarlı bilinen durum.
2. **Mock veri:** mekan-liste Konsept facet count'ları + kesfet/BNP'deki tüm sayılar
   uydurma (Laravel fazında gerçek veriyle dolacak). Facet seçimi sonuç grid'ini
   gerçekten filtrelemez (mock — diğer facet'lerle aynı davranış).
3. **kesfet alt-chip "Mekanlar" → üst "Mekânlar" link'i:** üst sıradaki "Mekânlar"
   bir `<a href=mekan-liste>` link; alt-chip map'i ona `.active` class'ı ekliyor
   (görsel), tıklama navigasyonu değiştirmiyor — kasıtlı (mock).
4. **Havuz "Değiştir" tür değişimi:** Değiştir modalında kullanıcı "Tümü" sekmesine
   geçip farklı kap türünden tarif seçerse, o slot'un kap etiketi de değişir (örn.
   Yan slot → Tatlı). Mock için kabul edilebilir/esnek davranış; Laravel'de kurala
   bağlanabilir.
5. **Mode rail kaydırma göstergesi** masaüstü geniş ekranda 15 chip sığarsa fade/ok
   `at-end` ile söner (doğru davranış); dar viewport'ta aktif. Beklenen.
6. **§11 hashtag'ları** kaynak Excel'deki haliyle birebir alındı (örn. "#mutfakkkeyfi"
   üç k'lı — kaynak verisinde öyle); düzeltme yapılmadı (veri sadakati). Patron isterse
   tek satır fix.

## 🔧 REVİZE TURU (2026-06-13, Beyar ara bulgu) — Mod rayı GERÇEKTEN kaydırılsın

**Sorun (Beyar):** Yemek modu rayı yatay kaydırılamıyordu — chip'ler taşıyordu ama
kullanıcı sürükleyemiyor/kaydıramıyordu → son 6 mod (Piknik Keyfi'ye kadar) erişilemez.
Gradient-fade görsel sinyali vardı ama gerçek kaydırma yoktu.

**Kök neden:** Sitenin kanonik `enableDrag` motoru (drag + wheel→yatay + tıklama-bastırma)
selector listesinde `.mode-bar` YOKTU (`.row-track`, `.cat-track`, `.chips`… vardı).
Ray yalnız trackpad/touch ile kayıyordu; fare-sürükleme ve wheel yoktu. Ayrıca eklediğim
`scroll-behavior:smooth` TÜM kaydırmaları anime ediyordu (drag'i de bozuyordu).

**Çözüm (mevcut pattern MİRAS alındı, yeniden icat YOK):**
1. `.mode-bar` → `enableDrag` selector listesine eklendi → fare-sürükleme + wheel→yatay
   + sürükleme-sonrası-yanlış-tık koruması (diğer site rayları ile birebir).
2. `scroll-behavior:smooth` CSS'ten kaldırıldı (drag/native instant); akıcı kaydırma
   yalnız ok butonlarının JS `scrollBy({behavior:'smooth'})` çağrısında.
3. **Çift yön ok** eklendi: sol `mode-rail-prev` + sağ `mode-rail-next`; `at-start`/`at-end`
   class'larıyla uçlarda ilgili ok+fade söner. Mobilde `-webkit-overflow-scrolling:touch`.
4. `padding-right:30px` → son chip fade/ok altında kalmadan tam erişilebilir.

**Kanıt (söze güven yok — 1440 + 390 probe):**
- **Ok tıklama → scrollLeft değişiyor:** next 0→823 (1440), 0→240 (390); prev geri çalışıyor.
- **Wheel→yatay:** çalışıyor (wheelWorks=true, +240).
- **Sürükle/swipe → scrollLeft değişiyor:** dragWorks=true (1440: →1163, 390: →580).
- **Son chip "Piknik Keyfi" erişilebilir + viewport İÇİNDE:** lastVisible=true, reached=true,
  at-end=true — HEM 1440 HEM 390.
- Regresyon yok: sayfa sw=375≤390, rail.right=359, 15 chip, havuz akışı 4→5, konsol 0 hata.
- SS: `f4-bnp-ray-son.png` (1440, sona kaydırılmış — Piknik Keyfi + sol ok görünür) +
  `f4-bnp-ray-390.png` (390, sona kaydırılmış — Kahve Yanı/Tek Başına Parti/Piknik Keyfi).

numstat (revize sonrası kümülatif): `bugun-ne-pisirsem-v1` daha da büyüdü (rail prev ok +
enableDrag kaydı + CSS).

## 🔧 REVİZE TURU 2 (2026-06-13, Beyar bulgu) — kesfet'te iki tekrar kategori çubuğu → tek katman

**Sorun (Beyar):** kesfet-v1'de iki ayrı kategori satırı vardı (üst ikonlu konsept çubuğu +
hemen altında statik "Kategori:" §10 çip satırı) — tekrar + kafa karıştırıcı. Faz 4'te §10'u
alt-filtre eklerken iki BAĞIMSIZ statik satır oluşmuştu (yanlış).

**Çözüm — TEK KATMANLI bağlamsal mantık:** Üst ikonlu konsept çubuğu ANA navigasyon olarak
kalır (3'lü patron yapısı bozulmaz). §10 kategorileri artık STATİK ikinci satır değil — **seçili
konseptin altında BAĞLAMSAL** olarak belirir (üst seç → ona ait alt-kategoriler çıkar; "Hepsi"
ve alt-kategorisiz konseptte tamamen gizli). §10'un her kategorisi TEK bir konsepte düşer,
primary chip'lerle sıfır tekrar:
- **Mekânlar** → Gizli Keşifler · Konsept Mekanlar · `Tüm Mekânlar →` (mekan-liste köprüsü)
- **Gurme Lezzetler** → Yerel Lezzetler · Sokak Lezzetleri
- Hepsi / Etkinlikler / Lezzet Rotaları / Söyleşi → alt satır gizli
- (§10 "Mekanlar" ≈ Mekânlar konseptinin kendisi, §10 "Lezzet Rotaları" = primary chip →
  alt-listede tekrarlanmaz; 6'sı da temsil edilir, sıfır çift gösterim)

Köprü korundu: "Mekânlar" eski direkt `<a>` link yerine konsept-filtre butonu oldu; mekan
modülüne geçiş alt-stripteki `Tüm Mekânlar →` chip'iyle korunuyor (mekan-liste'de §9 Konsept
facet zaten var). **Bu tek interaksiyon değişikliği** (Mekânlar: direkt-link → konsept-filtre +
köprü chip) tek-katmanlı temiz kurgu için gerekliydi; üst 3'lü konsept yapısı korundu.

**Kanıt (1440 + 390 tıklama probe):** Hepsi→sub gizli ✓ · Mekânlar→3 alt-chip + köprü href
`mekan-liste-v1.html` ✓ ("Mekân türü:") · Gurme→2 alt-chip ✓ ("Lezzet türü:") · Etkinlikler→
gizli ✓ · Hepsi'ye dön→gizli ✓ · sayfa sw=1440/375 (taşma yok, eklenen öğem overflow'da yok) ·
konsol 0 hata. SS: `f4-kesfet-fix.png` (1440) + `f4-kesfet-fix-390.png` (390) — tek tutarlı
yapı: primary nav + seçili konseptin bağlamsal alt-stribi.

## 🔧 REVİZE TURU 3 (2026-06-13, Beyar 2 bulgu) — BNP mod chip büyütme + hero H3 kanon

**İŞ 1 — Mod chip'leri büyütüldü (kaydırılabilir ray KORUNDU):**
Görselli mod chip'leri çok küçüktü (okunaksız). Boyut büyütüldü:
- Desktop: 150×94 → **194×122**, etiket 13.5→**15px**, ikon 13→14px, tik rozeti 23→25px.
- Mobil: 128×82 → **160×102**, etiket 12.5→**13.5px**.
- `enableDrag` + ok/fade kaydırma mekanizması DOKUNULMADI — boyuttan bağımsız çalışıyor.
Probe: rail hâlâ scrollable, ok next 823/240, drag 1163/580, son chip "Piknik Keyfi"
erişilebilir+viewport içinde (1440+390), sw taşma yok.

**İŞ 2 — Hero §2f H3 kanon hizalaması (kardeş kesfet ile birebir):**
TESPİT: BNP hero zaten H3 YAPISINDA idi (`.bnp-top{bg-white;border-bottom:1px line}` +
`.rd-crumb` + sol-hizalı eyebrow/h1/lead) — koyu overlay DEĞİL (team-lead'in andığı `.h-top`
aslında header chrome'u; sayfa hero'su `.bnp-top`). Hak-ediş: BNP bir menü-kurma TOOL'u (kullanıcı
GÖREVİ) → H3 doğru, H1 önerisi GEREKMEDİ. Tek gerçek sapma: tipografi/spacing kardeş kesfet'ten
küçüktü. kesfet `.ke-head` ile birebir hizalandı:
- h1 28/32 (ters ölçek) → **40px** (desktop) · ≤1024 33px · ≤640 27px (kesfet ile aynı skala)
- eyebrow margin 11→13px · lead 14.5→15.5px (mt 8→10) · head padding 2/18→4/22
- `.rd-crumb` TEK kanon (icat yok), header-altı nefes desktop 18px (≥16 ✓).
Probe: topBg=white, border-bottom=1px, h1=40/27px, crumb bnp-top içinde, 0 konsol hata.

SS: `f4-bnp-chip-hero-1440.png` + `f4-bnp-chip-hero-390.png` (büyük okunur chip'ler + H3 hero
tek karede; ray kaydırma korunmuş). Kardeş tutarlılığı: kesfet-v1 ile aynı H3 üst dili.

## Kanon / Miras Disiplini

- Hero/breadcrumb kanonu, header/mega/footer/drawer (KİLİTLİ) — DOKUNULMADI.
- Görselli `mode-chip` + facet `fct-*` kiti KORUNDU, çoğaltıldı.
- Görsel: tüm yeni görseller `div+background-image+cover+center`, 2x çarpma yok,
  CDN-doğrulanmış ID havuzu. Overlay/modal markup `</main>` sonrasında.
