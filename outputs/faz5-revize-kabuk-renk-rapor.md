# Faz 5-Sonrası Revize — kabuk-renk Raporu

> Teammate: **kabuk-renk** · Takım: faz5-revize · Tarih: 2026-06-13
> Sahiplik: `mockups/akademi-v1.html` + `mockups/dada-shop-v1.html` (SADECE)
> Onaylı baz commit: `3c63926` · SS altyapısı: izole channel:chrome
> (`/tmp/kr-chrome` + port 8852), MCP Playwright KULLANILMADI.

---

## Görev 1 — DadaAkademi RENGİ: PETROL TEYİT (renk DEĞİŞMEDİ) ✅

Karar kesindi: petrol `#006072` = kurumsal Alternatif Renk Pantone 3155 C ile
birebir (`tasks/kurumsal-renk.md` §3). Bu turda renk arama/değiştirme YOK,
yalnız teyit.

**Grep kanıtı (`akademi-v1.html`):**
- `#e14827` / `e14827` domates sızıntısı: **0 eşleşme**
- `--primary` kullanımı: **0** (token akademi kabuğunda yok)
- `--tomato` token'ı satır 38'de `#006072`'ye repoint edilmiş; **80 kullanım**
  hepsi petrol render eder
- Türev token'lar petrol bazlı: `--tomato-dark:#00505E`, `--tomato-deep:#003E49`,
  `--tomato-tint:#E2EFF1` — turuncu türev yok
- Hero accent renkleri petrol ailesi: eyebrow `#B9DFE6`, H1 accent `#4FB8C9`,
  crumb hover `#5CC3D4`

**Render kanıtı (SS + computed-style probe):**
- Logo (SVG `fill="#006072"`) · nav `.active` underline · `Giriş Yap` butonu ·
  hero CTA → hepsi petrol
- CTA/nav-active/hero accent probe: `rgb(0,96,114)` 6 kez; domates `rgb(225,72,39)`
  **0 kez**

**Sonuç:** Sapma 0. Renk repoint zaten Faz 5'te yapılmış, bu turda **hiçbir renk
değişikliği gerekmedi** (yalnız teyit). Token DEĞİŞMEDİ.

---

## Görev 2 — akademi-v1: çift "Ana Site" dönüşü kaldırıldı ✅

**Yapı analizi (akademi shop kardeşi):** Desktop'ta aynı anda İKİ dönüş
görünüyordu:
- `tb-back` topbar **sol-üst** "DadaMutfak'a dön" (satır 977) — shop satır 921 ile
  birebir KANONİK
- `ak-back` head-actions **sağ-üst** "Ana Site" (eski satır 1038) — ÇİFT;
  shop'un head-actions'ında dönüş YOK

Shop Faz 5 fix kanonu = tek dönüş, sol-üst, topbar'da. Akademi'ye birebir
uygulandı: **`ak-back` head-actions'tan kaldırıldı**, `tb-back` korundu.

Diğer dönüşler farklı responsive bağlamlar (çift değil), korundu:
- Mobil drawer: `drawer-add` "DadaMutfak'a Dön" (satır 1068)
- Mobil bottom-nav: house "Ana Site" (satır 1088)

Her viewport tek dönüş gösterir → shop deseniyle birebir.

**Temizlik:** `ak-back` HTML elemanı + ona ait ölü CSS (3 temel kural + @media
1024 içinde 2 + @media 640 içinde 1) silindi. `git diff 3c63926` numstat:
**0 eklendi / 7 silindi** (bilinçli ölü-kod silme, CSS yutma değil — diff
satır-satır incelendi). `grep ak-back` → **0 kalıntı**.

---

## Görev 3 — dada-shop section zemin keskinleştirme (v3a tutarlılığı) ✅

**Teşhis:** Shop, alternasyon zeminlerinde warm bej `--cream-2 #F7F1E6`
kullanıyordu → beyaza yakın + sıcak ton = "soft/silik" muddy bant. Ana site
(v3a) ise nötr `--bg-cream #f9f9f9` ↔ `--bg-white #fff` kullanır.

**frontend-design skill ile tasarım kararı:** Warm bej → site-kanonik nötr griye
çekmek alternasyonu ana site diliyle tutarlı, temiz ve net yapar. Seam (`shop-flow`)
mekanizması + bambu ayraç (Faz 5 deliberate feature) KORUNDU, yalnız tonu
nötrlendi.

**Değişiklikler (4 satır, hepsi zemin token'ı):**
1. `catstrip shop-flow` (satır 1238): `var(--cream-2)` → `var(--bg-cream)`
2. `shop-promo shop-flow` (1343): `var(--cream-2)` → `var(--bg-cream)`
3. `sec shop-sec shop-flow` (1442): `var(--cream-2)` → `var(--bg-cream)`
4. `.shop-flow-cream::before` seam gradient (793): warm cream fade
   (`var(--cream-2)`/`rgba(247,241,230,0)`) → nötr gri fade
   (`var(--bg-cream)`/`rgba(249,249,249,0)`)

**Computed-style kanıtı (v3a ↔ shop birebir):**
- V3A alternasyon: `rgb(249,249,249)` ↔ `rgb(255,255,255)`
- SHOP (fix sonrası): `rgb(249,249,249)` ↔ `rgb(255,255,255)` — **birebir aynı token**
- Shop DOM akışı: vitrin(beyaz, hero) → gri → beyaz → gri → beyaz → gri →
  trust(beyaz). Komşu aynı renk yok, temiz alternasyon.

**Korunanlar (DOKUNULMADI):** Hero/vitrin (`shop-vitrin` — watermark/isim güzel),
bambu ayraç (`bamboo-sep`), trust-band, hero gradient'indeki `--cream-2`
kullanımı (satır 681, hero bölgesi).

`git diff 3c63926` numstat: **4/4** (token swap). Tasarım dili (markup, kart
stili, grid, tipografi) korundu — sadece zemin token'ı değişti.

---

## Tasarım Gözü Değerlendirmesi (lead-gözü self-pass)

- **akademi header:** Tek temiz dönüş sol-üst, head-actions sade (arama + Giriş
  Yap). Petrol kimliği tutarlı, hero koyu-overlay §2f kanonu DOKUNULMADI.
- **shop alternasyon:** Sıcak muddy bant gitti; nötr gri↔beyaz ana site ritmiyle
  aynı. v3a token'larıyla birebir → marka tutarlılığı sağlandı. Subtle ama
  kasıtlı; referans v3a'nın da subtle olduğu doğrulandı (kalibre edildi).

## Kanıt Dosyaları (geçici, /tmp)
- `/tmp/kr-akademi-hdr.png` — header tek dönüş + petrol
- `/tmp/kr-shop-full.png` — tam sayfa nötr alternasyon
- `/tmp/kr-shop-seam1.png` — promo↔indirimli geçiş
- `/tmp/kr-v3a-seam.png` — referans v3a kalibrasyon

---

## ⚠️ Bilinen Sınırlamalar

1. **Nötr alternasyon subtle** — `#f9f9f9` vs `#fff` farkı 6 ton; ana site (v3a)
   ile birebir aynı seviyede. "Daha keskin" istenirse griyi koyulaştırmak v3a/site
   diliyle SAPMA olur → site-geneli token kararı (Beyar), bu turun kapsamı dışı.
   Referansa sadık kalındı.
2. **Seam (`.shop-flow::before`) 46px blend korundu** — Faz 5 deliberate feature;
   nötr tona çekildi ama mekanizma silinmedi. Tonlar near-identical olduğu için
   blend görsel olarak neredeyse görünmez (hard-edge etkisi). Tamamen hard-edge
   istenirse seam ::before kaldırılabilir (ayrı karar).
3. **Bambu ayraç + hero `--cream-2`** — bilinçli olarak warm bırakıldı (shop kimlik
   ögeleri, hero güzel). Sadece alternasyon zeminleri nötrlendi.
4. **SS headless channel:chrome** — gerçek-paint; canlı tarayıcıda fixed/blur
   artefaktı beklenmez ama Beyar canlı teyidi önerilir (mobil nabız).
5. **Mobil (390/500) probe bu raporda yok** — değişiklik sadece zemin rengi +
   eleman silme (layout etkilemez); taşma riski yok. Yine de istenirse mobil SS
   eklenebilir.

---

## 🔁 REVİZE TURU 2 — Görev 3 yeniden (shop BELİRGİN section ritmi)

**Lead/Beyar geri bildirimi:** İlk denemem (nötr gri #f9f9f9 ↔ beyaz) YETERSİZ —
section'lar düz/monoton, gözle ayrışmıyor. İstenen: v3a'daki gibi BELİRGİN
çeşitlilik (krem/beyaz/koyu band ritmi), section'lar renkle ayrışsın.

**v3a ritim analizi (computed-style, DOM sırası):** koyu hero(#211E16) → beyaz →
gri → beyaz → **KOYU guide(#211E16)** → gri → koyu-band(dayband) → beyaz → gri →
koyu-band(appband) → yeşil(health) → beyaz → gri. Çeşitlilik kaynağı: gri/beyaz
alternasyon + **tam koyu section'lar** (guide) + koyu görsel bantlar + yeşil aksan.

**Tasarım kararı (frontend-design):** Shop'a v3a prensibini WARM kimlikle uyarladım
— beyaz bağlayıcı + kurumsal KREM `#EFE5D3` warm vurgu (2×) + mid-page KOYU slate
`#211E16` band (editöryel promo = v3a guide muadili). Yumuşak seam KALDIRILDI
(artık "belirgin" hedef → seam softening amaca ters, sınırlar keskinleşti).

**Yeni ritim (computed-style teyitli):**
| # | Section | Zemin | rgb |
|---|---------|-------|-----|
| 1 | shop-vitrin (hero) | beyaz (KORUNDU) | 255,255,255 |
| 2 | catstrip "Ne arıyorsun?" | **KREM** | 239,229,211 |
| 3 | shop-sec "Çok satanlar" | beyaz | 255,255,255 |
| 4 | shop-promo (editöryel) | **KOYU slate** | 33,30,22 |
| 5 | shop-sec "İndirimdeki" | beyaz | 255,255,255 |
| 6 | shop-sec "Yeni gelenler" | **KREM** | 239,229,211 |
| 7 | trust-band | beyaz | 255,255,255 |

Simetrik ritim: beyaz · KREM · beyaz · **KOYU** · beyaz · KREM · beyaz. İki warm
KREM band, merkezde güçlü KOYU editöryel band — section'lar net ayrışıyor.

**Koyu band detayı:** `shop-promo`'ya `shop-dark` class + slate zemin. Tiller koyu
zeminde yüzsün diye `.shop-dark .promo-tile{border:rgba(255,255,255,.09);
box-shadow:0 22px 50px rgba(0,0,0,.42)}` + simetrik nefes (`padding:66px 0`).
Tiller zaten koyu görselli + beyaz metinli → koyu bandda premium/editöryel durur.

**Değişiklikler:** numstat **10/8** (3c63926). 3 section zemin token/class
(catstrip→cream, promo→slate+shop-dark, yeni-gelenler→cream) + seam ::before
kaldırma (3 satır) + shop-dark CSS (2 kural). Tasarım dili (markup/kart/grid/hero)
korundu. **Hero/vitrin/bambu DOKUNULMADI** (diff'te shop-vitrin/cmp/watermark yok).

**Kanıt:**
- Computed-style 7 section: ritim tabloyla birebir
- 0 konsol hatası (desktop + mobil)
- Mobil 390 element-rect probe: `docSW=390` → sayfa taşması YOK (cat-card/p-card
  r>390 yatay snap ray'ı içinde, by-design, değişiklikle ilgisiz)
- SS: `/tmp/kr-shop-full2.png` (tam ritim), `/tmp/kr-shop-dark.png` (koyu band),
  `/tmp/kr-shop-m-dark.png` + `/tmp/kr-shop-m-krem.png` (mobil krem+koyu)

**Tasarım gözü:** KREM bantlar beyazdan net ayrışıyor (warm tan, görünür);
KOYU promo mid-page güçlü kontrast (premium editöryel); genel okuma "section'lar
artık ayrışıyor" → monotonluk çözüldü. Warm shop kimliği korundu (krem kurumsal
warm + bambu + hero watermark yerinde).

**Revize Turu 2 — Bilinen Sınırlamalar:**
1. **KREM iki kez tekrar** (catstrip + yeni-gelenler) — bilinçli simetrik ritim;
   tekdüze değil çünkü aralarında beyaz + KOYU band var. İstenirse biri griye/farklı
   tona çekilebilir (tek-tur).
2. **Trust-band beyaz bırakıldı** — koyu band promo'da olduğu için trust hafif
   tutuldu (turuncu footer'a temiz geçiş). Trust de koyu istenirse alternatif hazır.
3. **Koyu promo tilleri sol kenarda slate'e hafif yaklaşır** (tile gradient
   rgba(20,18,12) ≈ slate); ince çerçeve + sağ taraftaki parlak görsel ayrımı
   sağlıyor. Canlı Beyar göz teyidi önerilir.
4. **Seam (yumuşak geçiş) KALDIRILDI** — Faz 5 feature idi; yeni "belirgin" hedefe
   ters olduğu için çıkarıldı. Bambu ayraç serpiştirme KORUNDU.

---

## 🔁 REVİZE TURU 3 — Beyar kararı: KREM ÇIKAR, gri yap (koyu band kalsın)

**Beyar kararı:** Madde 3 ritmindeki 2 KREM section'ı (`#EFE5D3`: catstrip
"Ne arıyorsun" + "Yeni gelenler") krem'den ÇIKAR → v3a nötr gri (`#f9f9f9`/
`--bg-cream`). Çeşitlilik çapası KOYU promo band (korunur); gri+beyaz+koyu üçlüsü
krem'siz yeterli ayrışma verir (eski "gri çok subtle" sorunu artık geçersiz çünkü
ritmi koyu band taşıyor).

**Değişiklik:** 2 section inline zemin `var(--cream)` → `var(--bg-cream)`. Promo
KOYU slate korundu. Hero/watermark/bambu/bej hero KARTLARI (warm kimlik) DOKUNULMADI.

**Yeni ritim (computed-style teyitli):**
| # | Section | Zemin | rgb |
|---|---------|-------|-----|
| 1 | shop-vitrin (hero) | beyaz (KORUNDU) | 255,255,255 |
| 2 | catstrip "Ne arıyorsun?" | **gri** | 249,249,249 |
| 3 | shop-sec "Çok satanlar" | beyaz | 255,255,255 |
| 4 | shop-promo (editöryel) | **KOYU slate** | 33,30,22 |
| 5 | shop-sec "İndirimdeki" | beyaz | 255,255,255 |
| 6 | shop-sec "Yeni gelenler" | **gri** | 249,249,249 |
| 7 | trust-band | beyaz | 255,255,255 |

Ritim: beyaz·**GRİ**·beyaz·**KOYU**·beyaz·**GRİ**·beyaz. KOYU promo band mid-page
ana çeşitlilik çapası; gri/beyaz alternasyon onu destekler.

**Kanıt:**
- grep section inline `var(--cream)` = **0**; `#EFE5D3/efe5d3` = **0**
- computed-style: KREM (`rgb(239,229,211)`) section zemini sayısı = **0**
- 7 section ritmi tabloyla birebir; KOYU band rgb(33,30,22) duruyor
- 0 konsol hatası
- SS: `/tmp/kr-shop-full3.png` (krem→gri ritim, koyu band yerinde)

**Tasarım gözü:** KOYU promo band sayfayı üst/alt yarıya bölen güçlü editöryel
çapa; gri/beyaz subtle ama koyu band ana ayrışmayı verdiği için monoton değil.
Warm kimlik hero/watermark/bambu/bej kartlarda korundu, geniş section zeminlerinde
krem 0.

## Protokol Uyumu
- frontend-design skill: yüklendi, tasarım kararında kullanıldı ✅
- Kanıt: grep + computed-style probe + render SS (söze güven yok) ✅
- İzole channel:chrome + port 8852, MCP KULLANILMADI ✅
- Onaylı `3c63926` ile diff: tasarım dili korundu, sadece token değişti ✅
- §2f hero kanonu + `_shell.html` DOKUNULMADI ✅
- Loop: 1 tur (max 2 içinde) ✅
