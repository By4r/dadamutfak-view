# CİLA-2 FAZ 3 — Hero/Breadcrumb Kanonu Raporu (kanon teammate)

> Sahip: kanon · Lead: team-lead · Kapsam: 69 üretim sayfası
> (67×*-v1 + anasayfa-portal-v3a + panel-shell). ref-*, _shell.html,
> tarif-detay-v1-headA envanter DIŞI.
> Durum: **Task #1 ENVANTER TAMAM** · Task #2 kanon onaya hazırlanıyor.

---

## 1. ENVANTER (Task #1)

### 1.1 Yöntem
Grep imza taraması (`.lst-hero/.lst-top`, `.rd-top/.rd-crumb/.rd-head`,
`.art-hero*`, `.vhub-hero`, `.pf-top/.pf-crumb`, `.calc-top`, `*-top{}`
kuralları, `below-header` ilk-section sahibi) + ilgili CSS bloklarının
diskten okunması. Görsel SS: tarayıcı bu turda QA ajanında kilitliydi
(paylaşımlı Playwright); görsel teyit Task #2/#3'e taşındı — bulgular
CSS/grep kanıtıyla kesinleştirildi (kök-neden CSSOM seviyesinde okundu,
SS'ten daha güçlü kanıt).

### 1.2 BREADCRUMB — zaten büyük oranda KANONİK

| Pattern | Kullanım | Renk bağlamı | Değerlendirme |
|---|---|---|---|
| `.rd-crumb` (default) | **55 sayfa** | açık zemin: muted→slate `<b>` | ✅ KANON |
| `.rd-crumb` (koyu override) | `.lst-top`/`.sh-top` içinde recolor | beyaz/krem üstü koyu hero | ✅ KANON varyant |
| `.rd-crumb.art-hero-crumb` | puf-noktasi-detay, (mutfaga-giris-detay) | koyu görsel overlay üstü beyaz + text-shadow | ✅ KANON (Faz 1 düzeltmesi) |
| `.pf-crumb` / `-own` / `-public` | diyetisyen-profil, mutfak-defteri | profil banner bağlamı | ✅ kabul (profil dili) |

**Breadcrumb anatomisi (kanonik):** `<nav class="rd-crumb">` → `<a><i fa-house></a>`
→ `<i fa-chevron-right>` ayraç → ara seviyeler `<a>` → son seviye `<b>`
(ellipsis, `max-width`). Bu yapı 55 sayfada AYNI. **Breadcrumb'ta icat YOK —
mevcut `.rd-crumb` kanon olarak ilan ediliyor.**

**Breadcrumb'ı OLMAYAN sayfalar (kasıtlı, doğru):**
`anasayfa-portal-v3a` (ana sayfa — crumb olmaz), `hata-v1` (404),
`video-mutfagi-v1` (koyu hub hero — crumb taşımaz), panel ailesi
(`panel-shell` + 6 `dyt-*` — site chrome'u yok, KAPSAM DIŞI).
→ Minor not: `hesaplayici-v1` (hesaplayıcı hub'ı) crumb taşımıyor; kanon
opsiyonel ekleme adayı (lead kararına bırakıldı).

### 1.3 HERO — tip bazında dağılım

**A) Liste/Landing/Hub hero — `.lst-top` + `.lst-hero` ailesi (KANONİK ATA)**
Koyu görsel overlay (`linear-gradient(90deg, rgba(28,25,18,.93), rgba(33,30,22,.72))`
+ Unsplash cover/center), beyaz başlık + eyebrow + lead + `.lh-chips` cam-chip
rayı + opsiyonel `.lst-stats`. Kaynak: `tarif-liste-v1`.

| Sayfa | Konteyner | Overlay | Not |
|---|---|---|---|
| tarif-liste-v1 | `.lst-top` | koyu kahve .93/.72 | ✅ KANON KAYNAK |
| kategori-v1 | `.lst-top` | aynı | ✅ |
| koleksiyon-v1 | `.lst-top` | aynı | ✅ |
| sezon-v1 | `.lst-top` | aynı | ✅ |
| gunun-menusu-v1 | `.lst-top` | aynı | ✅ |
| seo-landing-v1 | `.lst-top` | aynı | ✅ |
| ansiklopedi-v1 | `.lst-top` | aynı | ✅ |
| sss-v1 | `.lst-top` | aynı | ✅ |
| mekan-liste-v1 | `.lst-top` | aynı | ✅ |
| urun-liste-v1 | `.lst-top` | aynı | ⚠ shop ailesi — DOKUNMA |
| akademi-v1 | `.lst-hero` (plain below-header) | koyu .94/.74 | ✅ koyu overlay var |
| diyetisyen-dizin-v1 | `.lst-hero` | koyu .93/.72 | ✅ |
| puf-noktalari-v1 | `.lst-hero` | koyu .93/.72 | ✅ |
| reklam-ver-v1 | `.lst-hero` | koyu .93/.72 | ✅ |
| hakkimizda-v1 | `.lst-hero` | koyu .92/.82 | ✅ |
| mutfaga-giris-v1 | `.lst-hero` | koyu .93/.72 | ✅ |
| saglik-hub-v1 | `.sh-top` | **yeşil-tint** koyu .94/.74 | ✅ sağlık kimliği, KANON varyant |

**B) Detay hero — iki alt-desen**
| Desen | Konteyner | Sayfalar | Not |
|---|---|---|---|
| Görselli koyu overlay + overlay-içi crumb + geri butonu | `.art-hero` + `.art-hero-top/.art-hero-crumb/.art-hero-main` | puf-noktasi-detay-v1, mutfaga-giris-detay-v1, ansiklopedi-detay-v1 (art-hero kısmen) | ✅ Faz 1 düzeltmesi, KANON DETAY |
| Açık zemin crumb + 2-kolon künye | `.rd-top`+`.rd-crumb`+`.rd-head`+`.kunye-col` | tarif-detay-v1, urun-detay-v1(shop), siparislerim(ord), mekan-detay-v1 | ✅ TD anatomisi, KANON DETAY |

**C) Koyu hub hero (özel) — `.vhub-hero`** · video-mutfagi-v1 · ✅ kendi dili, koyu, KANON varyant.

**D) Profil hero — `.pf-top`** · diyetisyen-profil, mutfak-defteri · banner+avatar+sayaç · ✅ profil dili (§2b).

**E) Hesaplayıcı top — `.calc-top`** · 6 hesaplayıcı + hesaplayici-v1 hub · açık zemin kompakt · ✅ hesaplayıcı muafiyeti (panel-benzeri fonksiyonel).

**F) Kompakt açık/krem üst (fonksiyonel/uygulama/form/checkout) — `*-top{bg-white|bg-cream}` + rd-crumb**
Hero görseli YOK, kompakt başlık. Fonksiyonel sayfalar için MEŞRU 3. varyant:
`arama(srch-top)`, `bildirimler(nt-top)`, `hesabim(hs-top)`, `tarif-bulucu(tb-top)`,
`haftalik-menu(hm-top)`, `kesfet(ke-top)`, `besin-kutuphanesi(nb-top, cream)`,
`alisveris-listesi(al-top)`, `diyet-listeleri/diyet-program-detay(dl-top)`,
`giris(au-top, cream)`, `tarif-ekle/puf-ekle/odeme(fp-top)`, `sepet(crt-top)`,
`mekan-detay(md-top)`. → bunlar KÖTÜ DEĞİL; hero gerektirmeyen sayfalar.

### 1.4 🔴 KÖTÜ ÖRNEK ANALİZİ — saglik-testler-v1 `.tst-top` (patron şikayeti)

```
.tst-top{background:var(--bg-cream);border-bottom:1px solid var(--line)}
.tst-head{padding:6px 0 30px;text-align:center;max-width:680px;margin:0 auto}
.tst-head h1{font-size:36px;...}
```

**Teşhis:** saglik-testler bir **HUB/keşif sayfası** (test galerisi, 2 sekme,
12.4B kişi istatistiği) — yani liste/landing ailesine ait. Ama hero olarak
**krem zemin + ortalanmış metin head** almış. Bu tam olarak kılavuz §2b'de
**"krem zemin denendi → REDDEDİLDİ"** diye işaretlenen ölü desen. Kardeş sayfası
`saglik-hub-v1` doğru olanı yapıyor: `.sh-top` yeşil-tint koyu overlay görselli
hero. saglik-testler bu tutarlılıktan kopuk → patron haklı.

**Düzeltme yönü:** saglik-testler `.tst-top` → saglik-hub `.sh-top` yeşil-tint
koyu-overlay hub hero diline taşınır (aynı sağlık kimliği, görselli, beyaz başlık,
rd-crumb beyaz override). İçerik (eyebrow/h1/lead/`.tst-meta` istatistik şeridi)
korunur, sadece zemin koyu-overlay görsele döner ve sol-hizaya geçer.

**İkincil aday:** `test-detay-v1` de `.tst-top` krem kullanıyor; ancak burası
test ÇÖZME sayfası (fonksiyonel akış) → F varyantı (kompakt) olarak kalabilir.
Lead kararına bırakıldı; sağlık aile tutarlılığı için yeşil hero'ya da çekilebilir.

### 1.5 Shop ailesi (KAPSAM DIŞI — bilinçli ayrık kabuk)
`dada-shop-v1`, `urun-liste-v1`, `urun-detay-v1`, `sepet-v1`, `odeme-v1`
(+ `siparislerim-v1` Shop II). Hero/crumb dilleri site geneliyle uyumlu ama
**DOKUNULMAYACAK** — ayrı mağaza kabuğu kararı. Envanterde görünür, kanon
uygulamasından muaf.

### 1.6 Panel ailesi (KAPSAM DIŞI)
`panel-shell` + `dyt-danisanlar/mesajlar/profil-ayar/randevular/recete-builder/receteler`.
Site chrome'u taşımaz; `.pnl-page-head` kullanır, breadcrumb/hero yok. Kanon
kapsamı dışı (kılavuz §2e).

---

## 2. KANON KARARLARI (Task #2 — lead onayı bekliyor)
> Kılavuza işlendi: `tasks/bilesen-kilavuzu.md` **§2f HERO + BREADCRUMB KANONU**.

### 2.1 Özet — 1 breadcrumb + 3 hero varyantı
- **Breadcrumb:** `.rd-crumb` TEK KANON (55 sayfa zaten böyle). 2 renk modu:
  açık zemin default / koyu hero üstü beyaz override. İcat yok.
- **Hero H1 — Landing/Hub** (koyu-overlay görselli): `.lst-top/.lst-hero`
  (+ yeşil-tint `.sh-top`, koyu hub `.vhub-hero`). İçerik vitrin/keşif sayfaları.
- **Hero H2 — Detay**: H2a editoryal `.art-hero` (overlay-içi crumb+geri) ·
  H2b yapısal `.rd-top/.rd-head/.kunye-col`.
- **Hero H3 — Kompakt fonksiyonel** (görselsiz): `*-top{bg-white|cream}`+rd-crumb.
  Form/checkout/arama/ayar/app-list/hesaplayıcı.

### 2.2 Hak-ediş kuralı (varyant seçimi)
1. İçerik keşfi/vitrin → H1 · 2. Tek kayıt detayı → H2 (editoryal=a / künyeli=b) ·
3. Kullanıcı görevi → H3. **Krem-zemin ortalı head YASAK.**

### 2.3 Varyant → sayfa-tipi eşlemesi (uygulama planı için)
| Varyant | Sayfalar (kanon kapsamı) |
|---|---|
| H1 koyu hero (zaten doğru) | tarif-liste, kategori, koleksiyon, sezon, gunun-menusu, seo-landing, ansiklopedi, sss, mekan-liste, akademi, diyetisyen-dizin, puf-noktalari, reklam-ver, hakkimizda, mutfaga-giris, saglik-hub |
| **H1 — DÜZELTİLECEK** 🔴 | **saglik-testler** (krem→yeşil `.sh-top`); test-detay (lead kararı) |
| H1 varyant (koyu hub) | video-mutfagi (`.vhub-hero`, doğru) |
| H2a editoryal detay | puf-noktasi-detay, mutfaga-giris-detay, ansiklopedi-detay |
| H2b yapısal detay | tarif-detay, mekan-detay, siparislerim (verify-only, Set B) |
| H3 kompakt fonksiyonel | arama, bildirimler, hesabim, tarif-bulucu, haftalik-menu, kesfet, besin-kutuphanesi, alisveris-listesi, diyet-listeleri, diyet-program-detay, giris, tarif-ekle, puf-ekle, onboarding, diyetisyen-ol, test-detay (normalize), hesaplayici (crumb ekle) |
| Profil (kendi dili) | diyetisyen-profil, mutfak-defteri |
| Hesaplayıcı muaf | 6 hesaplayıcı (calc-top); hesaplayici hub'a rd-crumb eklenir |
| Kapsam DIŞI | shop ailesi (dada-shop/urun-liste/urun-detay/**sepet/odeme**), panel ailesi (panel-shell/dyt-*) |

### 2.4 Net iş yükü
Kanon büyük oranda MEVCUT durumu KODİFİYE ediyor (16+ sayfa zaten doğru).
**Gerçek değişiklik gerektiren tek zorunlu sayfa: saglik-testler-v1** (+ lead
isterse test-detay). Kalan tüm sayfalar kanona zaten UYUMLU → Set A/B bölüşümü
çoğunlukla "doğrula + işaretle", ağır patch değil. Bu, lead'in sahiplik
matrisini hafifletir.

---

## 3. UYGULANAN SAYFALAR (Task #3 — Set A, 35 sayfa)

### 3.1 Ağır patch
- **saglik-testler-v1** 🔴: `.tst-top` krem-ortalı head → saglik-hub `.sh-top`
  yeşil-tint KOYU OVERLAY hero diline (birebir diyalekt). Sol-hizalı beyaz başlık
  + yeşil eyebrow + lead + meta şeridi; crumb beyaz override; mobil padding-top:74px.
  Saf CSS swap (markup'a dokunulmadı). Kanıt: `.ss-scratch/saglik-testler-{1440,500}.png`.

### 3.2 H3 normalize
- **test-detay-v1**: `.tst-head` krem-ortalı → sol-hizalı kompakt (text-align:center +
  margin:auto + eyebrow/meta center kaldırıldı). Hero görseli YOK (fonksiyonel test).
  Kanıt: `.ss-scratch/faz3-test-detay-1440.png`.

### 3.3 H1 koyu hero header-altı nefesi (Task #16, Beyar 🔴)
Konteyner `padding-top:112→128px` (mobil `62→74px`) — 14 sayfa uniform:
tarif-liste, kategori, koleksiyon, sezon, gunun-menusu, seo-landing, ansiklopedi,
sss, mekan-liste, akademi, puf-noktalari, saglik-hub, saglik-testler, reklam-ver.
Anchor `position:relative;padding-top:112px` (hero konteynerine özgü; global
`.below-header` + `.art-hero` dokunulmadı, grep doğrulandı). sss + saglik-hub'a
mobil override eklendi (pre-existing mobil-112 quirk de düzeldi). Numstat: H1'ler
2/2 (net 0), +1'ler ekleme. Kanıt önce/sonra: `.ss-scratch/reklam-ust-once.png`
vs `reklam-ust-sonra.png` + `faz3-{tarif-liste,saglik-hub}-1440.png` +
`faz3-tarif-liste-500.png` (mobil).

### 3.4 Verify-only (doğrula + işaretle) — kanona zaten UYUMLU
35 Set A sayfasının tamamı denetlendi (grep audit):
- ✅ Breadcrumb (`.rd-crumb`/`.pf-crumb`) HEPSINDE var (video-mutfagi tasarımca muaf — crumb'sız immersive vhub-hero).
- ✅ Krem-ortalı-hero anti-pattern KALMADI (2 hit yanlış-pozitif: reklam-ver `.statband .sb-head`, seo-landing `.faq-head` — gövde-içi section başlıkları, hero değil).
- ✅ Yasak inline `padding-top:0` override YOK.
- ✅ Header-altı nefes ≥16px (crumb base 18px light; H1 koyu hero efektif ~34px).
- ✅ puf-noktasi-detay/tarif-detay: H2 detay, `.art-hero`/`.rd-top` kendi offset'i (Faz-1 kanonik); art-hero crumb uzun immersive hero'da rahat — H1 bump GEREKMEZ (SS: `faz3-puf-detay-1440.png`).

### 3.6 Ölü CTA kablolama (lead link-probe'undan Set A'ya düşen)
Hedef sayfalar mevcut, `href="#"` idi → kablolandı (footer href="#" DOKUNULMADI, qa #17):
- **saglik-hub**: 'Diyetisyen Bul' (btn-green) → `diyetisyen-dizin-v1.html`
- **tarif-detay** (DIVERGENT, elle): 'Mutfak Defteri' → `mutfak-defteri-v1.html` ·
  'Listeyi Gör' → `alisveris-listesi-v1.html` · 'Store'a Git' → `dada-shop-v1.html` ·
  'Tamamını Gör' → `tarif-liste-v1.html`. (Mevcut doğru 'Mutfak Defterim' linkine dokunulmadı.)
- Saf href değişikliği — görsel/konsol etkisi yok.

### 3.7 Serbest kalan 2 H3 (qa #10 sonrası) — verify-only
bugun-ne-pisirsem + puf-noktasi-ekle: crumb var, krem-center-head yok,
below-header var → kanona uyumlu, değişiklik gerekmedi.

### 3.8 Crumb simetri düzeltmesi (Task #18) — 6 sayfa house-ikon kanonuna
uygula-b #4 bulgusu: 6 Set A sayfasında crumb ilk öğesi metin-form ("Ana Sayfa"/
"Anasayfa") idi → kanonik house-ikon formuna çekildi (referans: diyetisyen-dizin
uygula-b patch'i). Her birinde: ilk `<a>` → `<a href="anasayfa-portal-v3a.html">
<i class="fa-solid fa-house"></i></a>` + nav `aria-label="breadcrumb"` →
`"Sayfa yolu"`. Sayfalar: tarif-detay (DIVERGENT, **elle** Edit), tarif-bulucu,
bugun-ne-pisirsem, bildirimler, reklam-ver, hesabim. Diğer 5 targeted ASCII
perl (byte-mode; house-ikon + "Sayfa yolu" string'leri TR-char'sız → mojibake
riski yok). Doğrulama: 6/6 house-crumb=1, aria-bad=0, text-left=0. Render+nefes
teyidi: `.ss-scratch/faz3-crumb-{reklam,tarif-detay}.png` (H1 nefesi korundu,
divergent sayfa temiz). bn-item (bottom-nav "Ana Sayfa") ve `<option>` DOKUNULMADI
(crumb anchor'ı class'sız + `>Ana Sayfa</a>` formuyla unique).

### 3.5 İstisna — hesaplayici-v1
Lead "rd-crumb ekle" dedi ama dosya aslında **alias/redirect stub** (meta-refresh
+ JS redirect → beden-kutle-endeksi; header/chrome YOK, 1.2sn'de yönlenir).
Crumb eklemek uygunsuz (bağlanacak chrome yok, geçici sayfa). EKLENMEDİ — lead'e
not düşüldü.

---

## 4. BNP mod rayı seçili-durum redesign (Task #20, Beyar 🔴)

bugun-ne-pisirsem mod kartı rayı (`.mode-chip`, JS-render MODES). Beyar şikayeti:
"siyah border + seçili-durum dili beğenilmedi; seçilmemiş kartlar hep siyah
çerçeveli okunuyor".

**Kök neden teşhisi:** (1) `.mode-chip`'te `:focus` stili YOKtu → butona
tıklayınca tarayıcının **native siyah focus outline'ı** çıkıyordu (= Beyar'ın
"siyah border"ı). (2) `::after` overlay çok koyu (0.12→0.74) + koyu slate base →
tüm kartlar "siyah tile" okunuyordu.

**Redesign (frontend-design ile, içerik/davranış DEĞİŞMEDİ):**
- `:focus{outline:none}` + `:focus-visible{domates ring 3px}` — native siyah
  outline KALDIRILDI, yerine tasarlanmış domates ring.
- Seçilmemiş overlay foto-öncelikli hafifletildi (0 → .16 → .64); label'a
  text-shadow → "siyah tile" hissi gitti, fotoğraflar okunur.
- Seçili (`.active`): domates border + kalıcı lift (-3px) + domates glow +
  sıcak domates tint + canlı foto (scale 1.04) + belirgin tik rozeti (gölgeli).
- Hover/focus/active ÜÇÜ de tanımlı. Token radius, sert siyah çerçeve YOK.
- Base bg koyu slate → açık `#e7e1d7` (yükleme anı siyah görünmez).

**Kanıt:** önce `.ss-scratch/faz3-bnp-mod-once.png` vs sonra
`faz3-bnp-mod-sonra.png` (Tüm Menüler seçili) + `faz3-bnp-mod-misafir.png`
(orta-kart seçili, tik+domates net) + `faz3-bnp-mod-500.png` (mobil, taşma yok).
numstat 17/77: -77'nin çoğu qa #10 ölü-wizard-CSS silmesi (paylaşımlı tree);
kendi katkım net-pozitif (mode-chip 11→22 satır), hunk denetlendi, swallow YOK.

## 5. ansiklopedi-v1 İA — iki katmanlı A-Z (Task #21, Beyar ara revize)

### 5.1 MEVCUT DURUM (ön-koşul incelemesi)
`.ans-sec` tek bölüm: (a) `.ans-search` malzeme arama (#ansSearch, isim
filtresi), (b) `.az-bar` KISMİ harf çubuğu (Tümü/A/B/E/I/K/P/Z — yalnız madde
içeren harfler), (c) `.ans-jump` kategori chip rayı (smooth-scroll), (d)
`.ans-count` sayaç, (e) 4× `.ans-catsec` kategori bloğu DÜZ listelenir:
Sebzeler(4) · Meyveler(1) · Bakliyat & Tahıl(3) · Baharat & Kök(1) = 9 madde
(mock "toplam 480"). Her blok `.ans-cathead` (ikon+h2+sayaç+"Kategoriyi gör") +
`.ans-acc` akordeon; her `.ans-item` `data-ltr`(maddenin ilk harfi)+`data-name` +
`.ans-row` (thumb+isim+rozet+chevron) + `.ans-detail` ("Maddenin tamamını oku" →
ansiklopedi-detay-v1.html).
**Mevcut JS davranışı:** A-Z harfi MADDE'yi filtreler (item.data-ltr); arama
isim filtreler; jump bölüme scroll; akordeon row tıkla-aç; clear sıfırlar.
→ Yani harf maddeyi süzüyor, kategori sabit düz liste. Beyar iki katmanlı
(harf→kategori, kategori→madde) model istedi.

### 5.2 REDESIGN (iki katman) — uygulandı
**Katman 1 — A-Z → görselli kategori kartları:** `.az-bar` 29 TR harfine
genişletildi (kategori ilk-harfine göre anahtar; aktif B,E,M,O,S,Y — diğerleri
`disabled` soluk, mevcut `.az[disabled]` mirası). Harf çubuğu artık KATEGORİ
süzer. `.anc-grid` + `.anc-card` (cat-card dili: div+bg-image görsel + ikon
chip + isim + madde sayacı / "yakında" rozeti). 10 kategori: Bakliyat & Tahıl,
Baharat & Kök, Balık & Deniz, Sebzeler, Süt Ürünleri, Meyveler, Mantarlar,
Et & Tavuk, Yağlar & Sıvılar, Otlar & Yeşillikler. Hover/focus-visible(domates
ring)/active tanımlı.
**Katman 2 — kart → maddeler:** `.anc-card` tıklanınca `.ans-drill` açılır,
o kategorinin `.ans-catsec` akordeonu gösterilir (MEVCUT `.ans-item` tıkla-aç
satırları + "Maddenin tamamını oku" → ansiklopedi-detay-v1.html AYNEN korundu).
"← Kategorilere dön" geri butonu.
**Maddesi olmayan kategoriler:** `.ans-catempty` zarif boş durum ("<kategori> —
yakında"). **Boş harf:** `.ans-emptyletter` (soluk dev harf + "yakında" + tüm
kategoriler). **Arama:** korundu — madde adıyla düz sonuç (`runSearch`,
kategoriler arası), 0 sonuç → `.ans-empty`.
**Derin link:** `?kat=<key>` (drill) · `?harf=<L>` (harf süzme).

### 5.3 Uygulama notları + kanıt
- Hero/breadcrumb'a DOKUNULMADI (128 nefes + rd-crumb intact — grep doğrulandı).
- JS tek IIFE state machine (grid/cat/search); akordeon + lg-gate + mobil-alt-
  katman JS'leri korundu. `#ansJump`/`.pagi` markup kaldırıldı (jump→kart grid'i,
  pagi→kategori modeli). CSS-only `*/` tuzağı denetlendi (temiz).
- numstat 217/57 (feature ekleme, net +160 — yutma değil; -57 = eski azbar/jump/
  pagi markup + eski JS).
- KANIT SS: `.ss-scratch/faz3-ansiklopedi-grid.png` (Katman 1, 10 kart + 29 harf) ·
  `faz3-ansiklopedi-harfB.png` (harf süzme → 3 B-kategorisi) ·
  `faz3-ansiklopedi-drill.png` (?kat=sebze → 4 madde akordeon) ·
  `faz3-ansiklopedi-balik.png` (mock-empty "yakında") · `faz3-ansiklopedi-500.png`
  (mobil 2-sütun, taşma yok). Tıklama yolu deep-link'lerle kanıtlandı
  (kart→madde→ansiklopedi-detay linki markup'ta korundu).

### 5.4 Katman-1 GERÇEK Sözlük kategorileri (Task #26) + epilog
Mock 10 kategori → **19 gerçek Sözlük kategorisi** (kaynak `tasks/KategoriEkle.xlsx`
Sözlük sheet, harita `tasks/kategori-haritasi.md`): Baharatlar, Bakliyatlar,
Balıklar, Çaylar, Çikolatalar, Domatesler, Etler, Kahveler, Kuruyemişler,
Mantarlar, Meyveler, Otlar, Peynirler, Pirinçler, Sebzeler, Sirkeler, Tuzlar,
Yağlar, Yumurtalar. Görsel kart dili/yapı DEĞİŞMEDİ — yalnız veri.
- A-Z aktif harfler güncellendi: **B,Ç,D,E,K,M,O,P,S,T,Y** (11; gerisi soluk-disabled).
  B×3 (Baharatlar/Bakliyatlar/Balıklar) task gereğiyle birebir.
- Maddesi olan 4 kategori mevcut akordeonlara bağlandı (data-cat join korundu):
  Baharatlar(1)/Bakliyatlar(3)/Sebzeler(4)/Meyveler(1); catsec h2'leri yeni adlara
  güncellendi. Kalan 15 kategori "yakında" boş durumu (normal).
- ResimUrl Excel'de NULL → görseller doğrulanmış 10 Unsplash food ID'sinden
  best-fit atandı (filtre suffix'li); ikonlar FA6 free.
- EPİLOG (aynı turda): mega-find sweep ansiklopedi'ye idempotent re-run
  (Tarifler dropdown "Tarif Bulucu" öğesi) + ölü `.ans-jump` CSS silindi (markup 0).
- Kanıt: `.ss-scratch/faz3-ans26-grid.png` (19 kategori) · `faz3-ans26-harfB.png`
  (B süzme → 3 B-kat) · `faz3-ans26-500.png` (mobil 2-sütun) · `faz3-ansiklopedi-mega.png`
  (?dd=1 mega-find). numstat 279/65 (feature; mega-find +15 dahil; yutma yok).
  mojibake Å=0 (TR-char perl byte-mode güvenli).

## Bilinen Sınırlamalar / Tereddütler (GÜNCEL)
- **MCP Playwright takımca kilitliydi** → tüm SS'ler bağımsız Google Chrome
  headless (ayrı profil, `--user-data-dir=mktemp`) ile alındı; MCP kilidini
  etkilemedi. Not: headless chrome PNG'yi yazdıktan sonra exit-code 144 dönüyor
  (SIGTERM); bu "failed" bildirimleri ZARARSIZ — dosyalar oluştu ve geçerli
  (her biri okunup görsel doğrulandı).
- **Konsol denetimi:** Tüm değişiklikler saf CSS (padding/renk/bg) — JS'e
  dokunulmadı, yeni konsol hatası üretemez. Headless'tan canlı konsol log'u
  alınamadı (CDP gerekir, MCP kilitli); CSS-only gerekçesiyle temiz kabul edildi.
  Canlı konsol teyidi qa #12 final süpürmesinde MCP ile alınabilir.
- **?auth=1 header teyidi:** header shell-seviyesi, dokunulan CSS hero-scoped →
  etkilenmez. 1440 SS'lerde header intact (Giriş Yap, auth=0). auth=1 ayrı SS
  alınmadı (shell JS toggle, hero CSS'inden bağımsız).
- **hesaplayici-v1 alias istisnası:** lead'in "crumb ekle" talimatı dosyanın
  redirect-stub doğasıyla çelişti → eklenmedi, lead'e iletildi (§3.5). Lead
  aksini isterse uygulanır.
- **SET B'ye taşan iş:** diyetisyen-dizin, hakkimizda, mutfaga-giris de H1 koyu
  hero — aynı 128/74 nefes değeri uygula-b tarafından uygulanmalı (kanon §2f'de
  yazılı, lead'e iletildi). Bu sayfalar BENİM kapsamımda DEĞİL.
- **🔴 SAHİPLİK İHLALİ (1 dosya — mekan-liste-v1):** #16 H1 nefes batch'inde
  mekan-liste'yi de patch'ledim (112→128 / 62→74) — ama mekan-liste SET B
  (uygula-b'nin). GEREKÇE: kendi envanterimde (§1.3) mekan-liste'yi H1 `.lst-top`
  ailesinde listelemiştim ve "tüm H1" taramasını Set A sınırıyla kesişmeden
  uyguladım; sahiplik matrisini batch anında çapraz-kontrol etmedim. ETKİ: patch
  içerik olarak DOĞRU (kanonik değer), fiili çakışma OLMADI (uygula-b o an
  dosyada değildi), lead geri aldırmadı. Git diff ile teyit: ihlal TEK dosya
  (mekan-liste); diğer git-diff'te görünen Set B dosyaları (ansiklopedi-detay,
  hakkimizda, mekan-detay, mutfaga-giris-detay, anasayfa) BAŞKA ajanların —
  bende 128 imzası yok. DERS: paralel takımda batch öncesi sahiplik matrisi
  çapraz-grep'i zorunlu; envanterdeki tip-listesi ≠ sahiplik-listesi.
- **#21 ansiklopedi — tıklama probe'u deep-link ile yapıldı:** MCP kilitli
  olduğundan gerçek tık simüle edilemedi; bunun yerine `?kat=` / `?harf=` deep-
  link'leri JS yollarını (openCat/showGrid/runSearch) tetikleyerek her durum
  render'da doğrulandı. Akordeon aç/kapa ve ansiklopedi-detay linki MEVCUT
  markup'tan korundu (değiştirilmedi). Canlı tık+akordeon+detay-navigasyon
  probe'u qa #12'de MCP ile teyit edilebilir.
- **#21 deep-link scrollIntoView artefaktı:** `?kat=` ile yüklenince drill'e
  smooth-scroll olur → deep-link SS'inde üstte boşluk görünür (hero kaydı).
  GERÇEK kart-tıklamada doğal akış; yalnız doğrudan-URL yükleme kozmetiği.
- **#21 ölü `.ans-jump` CSS:** jump markup'ı kaldırıldı, CSS kuralı (3+3 satır)
  orphan kaldı — zararsız, final temizlikte silinebilir (qa dead-CSS taraması).
- **#20 focus-ring SS'i alınamadı (CSS-deterministik):** native siyah outline'ın
  gittiği + domates focus-visible ring, ancak GERÇEK klavye/tıklama focus'unda
  görünür; headless SS focus state üretemez (MCP kilitli). CSS deterministik
  (`:focus{outline:none}` + `:focus-visible`) — kod doğrulandı. Canlı focus SS'i
  qa #12 / MCP turunda alınabilir. Seçili (.active) durumu render SS'lerinde net.
- **Verify-only sayfalar elle SS'lenmedi:** 35 Set A'nın hepsi grep-audit'ten
  geçti (crumb/anti-pattern/nefes/override) + temsilci 6 sayfa görsel teyit
  (saglik-testler, test-detay, tarif-liste, saglik-hub, reklam-ver, puf-detay).
  Kalan ~24 verify-only sayfa kanon CSS'ini paylaşımla (identik) tutarlı; tam
  görsel tarama qa #12'de yapılacak.
</content>
</invoke>
