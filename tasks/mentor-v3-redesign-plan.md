# DadaMentor v3 — Büyük Yön Değişimi (Hero C+D + 5 Sinematik Sahne + Apple Reveal)

> **Onaylı plan** (Beyar onayı alındı). Implement bekliyor — bu dosya implement referansı.
> **DOSYA KARARI:** v2-a ÜZERİNE YAZMA. `dadamentor-v2-a.html` KORUNUR (commit 087427d, çalışır referans/yedek — redesign tutmazsa dönüş noktası). Yeni dosya **`dadamentor-v3.html`**: v2-a'dan **kopyala → v3 olarak kaydet → redesign'ı v3 üstünde uygula**. Açılış: `localhost:8765/dadamentor-v3.html`.

## Context (neden)

`dadamentor-v2-a.html` = 5 markalı DadaMentor hub'ının final kök adayı (çalışıyor: hero = sol mentor paneli + sağ preview kartı, scroll'da sol-alt floating FAB, altında #pano/#niyet/#manifesto portal-v3a section'ları). Bu redesign hub'ı vitrinden "5 dünyaya açılan sinematik bir kapı"ya yükseltir — ama v2-a'yı bozmadan, yeni `dadamentor-v3.html` üzerinde: (a) sol panel = saf 5-dünya haritası, (b) sağ = fiziksel kart destesi signature; gövde = her dünya için ayrı full-bleed sinematik sahne (`dadamentor-alt3.html` `.scene` dili) + Apple iPhone 17 Pro tarzı ölçülü reveal. Kimlikten (domates + 5 kanonik renk + Gilroy) ödün yok. v2-a dokunulmaz → redesign başarısızsa dönüş noktası.

İlk implement adımı: **`cp dadamentor-v2-a.html dadamentor-v3.html`** (v7-6cu356/ içinde) → bundan sonra TÜM değişiklik v3'te.

---

## Keşif özeti (kod gerçeği — 3 dosya derin okundu)

### `dadamentor-v2-a.html` (1127 satır, tek dosya)
- **Header** (593–621): `.site-head#siteHead` fixed, tepe saydam + `rgba(255,255,255,.14)` divider, scrollY>60'ta `.frosted`. EN default. Hedefler: brand→self, search→`arama-v1.html`, login→`#`, lang menü, hamburger→drawer.
- **Hero** (624–716): bg katmanları + `.hero-stage` grid → sol `.mentor-panel#mentorPanel` (636–684) + sağ `.world-card.w-gastro#worldCard` (687–713).
- **Mentor paneli**: video (`assets/video/mentor-panel.mp4`, rate 0.8) + `.mp-chat` + 2 adımlı çip sistemi `.mp-steps` (`data-step`):
  - adım `home` (668–672): `Nereden başlamalıyım?`(→worlds) · **`Bugünün panosu`(data-section=pano)** · **`Bir şeye mi ihtiyacın var?`(data-section=niyet)** ← **bu 2 çip ELENECEK**
  - adım `worlds` (673–681): geri butonu + **5 dünya çipi** `.mp-opt.w-*` `data-widx="0..4"` ← **KORUNACAK, varsayılan açık**
  - Panel `data-step="home"` açılıyor (636) → `worlds` default'a alınacak, `home` adımı kalkacak.
- **Sağ preview kartı**: `switchTo(idx)` (968–988) + `W[]` dizisi (882–913): her dünya `{cls,href,name,eyebrow,tagline,metricIcon,metricTxt,img,color,cards[3],hint}`. `switchTo` → setBg + `--bc=color` + cross-fade + `applyContent` + `srEnter.href=w.href`. Boot `switchTo(0)`. Desktop>1080 çip hover'da da switchTo.
- **Floating/FAB**: tek panel 3 hâl morph — sticky (hero) → `.floating` (`fixed; left:24; bottom:24; 360px`) → `.mini` (64px daire, sol-alt). `--ease-spring:cubic-bezier(.16,1,.3,1)`. `heroObs` IO threshold 0.18. İçeriği İTMEZ.
- **Section'lar**: `#pano`(722–776, `.sec-white`, grid-3 `.p-card`) · `#niyet`(779–801, `.sec-cream`, `.calc-grid` 10 `.calc-card`) · `#manifesto`(804–850: `.mani-band` + `.news-sec .findbar` + `.foot-compact`).
- **Tokenlar** (:root 23–54): açık zemin `--bg:#f9f9f9`, 5 dünya `--b-gastro #E14827 / --b-gourmet #b14fc5 / --b-diet #3BB77E / --b-fit #009d4f / --b-akademi #006072` (+`-l`), `--ease`, `--ease-spring`, `--hero-col-h`, `--panel-lg 430 / --panel-fl 360`, gölge `--sh-1/2/3`. KREM yasak. `.w-*` → `--bc/--bl` (68–73).
- **scroll-snap MEVCUT**: `.scroll-body{scroll-snap-type:y proximity}` + `.sec{scroll-snap-align:start}`. `html{scroll-behavior:smooth}` + reduced-motion override.
- **ss-mode** (`?ss=1`); `is-auth` hook (`localStorage dm_user`).

### `dadamentor-alt3.html` (.scene kaynağı, 742 satır) — DİL DONÖRÜ
- Scroller = `body` (`scroll-snap-type:y mandatory; height:100%; overflow-y:scroll`).
- `.scene{position:relative;height:100vh;scroll-snap-align:start;overflow:hidden;flex-center}` (172–177).
- Katman sırası: `.scene-bg` (div+bg cover; `transition:transform 8s; :hover scale(1.04)` ken-burns) → `.scene-overlay` z1 (lineer .68→.30→.72 + radial) → `.scene-grain` z2 (SVG noise .26) → `.scene-body` z3 (`.scene-eyebrow`→`.scene-tag`(em=accent)→`.scene-desc`→`.scene-cta .btn-world`).
- Marka rengi: `<section class="scene w-gastro">` → `.w-*` `--bc` → eyebrow/tag em/btn-world bg = `var(--bc,var(--tomato))`.
- **dot-ray** (139–170, fixed sağ): `.dr-item[data-scene][style="--dc:..."]`; IO threshold 0.45 → active dot scale 1.55 + `--dc`; click→`scrollIntoView smooth`.
- **REVEAL YOK** (sadece hover ken-burns + scroll-hint bob). Reduced-motion: snap+anim kapatılıyor.
- ss-mode (`?ss=1`) snap'i kapatıp tüm sahneleri dikey yığıyor.

### `anasayfa-portal-v3a.html` (kalite çıtası, 3282 satır)
- `sec-head` grid, `.eyebrow` (12px/700/.16em + FA + 26×2px bar currentColor), `.r-card` (lift -6px + `.r-media` scale 1.04 + başlık tomato), `.calc-card`, `.findbar` (`border-left:4px tomato`).
- **Reveal YOK** (tek IO=carousel pause; tek `@keyframes fadeUp` tab swap). CSS `@media reduced-motion` bloğu YOK — tek precedent JS `matchMedia` guard.
- wrap 1240/32 · `--ease:cubic-bezier(.22,.61,.36,1)` · `--sh-sm/md/lg`. #pano/#niyet/#manifesto v2-a içinde zaten portal dilinde, KORUNUYOR.

---

## Yeni sayfa mimarisi (üstten alta)

```
HEADER (saydam → frosted)                                [DOKUNMA]
│
HERO (açık portal zemin)                                 [C+D YENİDEN KURGU]
 ├─ SOL: mentor paneli = saf 5-dünya haritası (5 çip default açık)
 └─ SAĞ: KART DESTESİ (aktif kart önde + 4 renkli dikey sırt)
│
┌─ 5 SİNEMATİK SAHNE (full-bleed, .scene dili, koyu görsel + marka rengi) ─┐  [YENİ]
│  #scene-gastro (#E14827) · #scene-gourmet (#b14fc5) · #scene-diet         │
│  (#3BB77E) · #scene-fit (#009d4f) · #scene-akademi (#006072)              │
└──────────────────────────────────────────────────────────────────────────┘
│
#pano / #niyet / #manifesto (portal)                     [KORUNUR]
SAĞ dot-ray (5 sahne navigatörü, alt3 dili)              [YENİ — ✓]
FLOATING mentor FAB (sol-alt)                            [KORUNUR]
```

**Zemin ritmi (bilinçli):** açık hero → 5 koyu sinematik sahne → açık portal section'lar.

### Çip → sahne snap haritası (sol panel)
| Sol çip | Snap hedefi (in-page) | Sahne CTA (dış) |
|---|---|---|
| DadaGastro | `#scene-gastro` | `anasayfa-portal-v3a.html` |
| DadaGourmet | `#scene-gourmet` | `kesfet-v1.html` |
| DadaDiet | `#scene-diet` | `saglik-hub-v1.html` |
| DadaFit | `#scene-fit` | `dadafit-hub-v1.html` |
| DadaAkademi | `#scene-akademi` | `akademi-v1.html` |

İki-kademe akış: sol çip → in-page sahne (snap) → sahne CTA → dış sayfa. Sağ preview CTA "Dünyaya gir" → direkt dış sayfa. `W[].href` tek kaynak.

---

## Kilitli kararlar (Beyar onayı)
1. **Snap = yumuşak proximity** (mevcut korunur; mandatory'ye geçilmez — FAB/portal riski).
2. **Sağ dot-ray EKLENECEK** (5 sahne, alt3 dili, mobilde ≤960 gizli).
3. **Kart destesi mobilde (≤1080) = yatay sırt-sekmesi** (aktif kart altında 4 renkli yatay sekme, tık→öne, ≥44px).
4. **Sahne görselleri = her sahneye AYRI sinematik foto** (W[].img reuse DEĞİL → görsel sourcing alt-adımı; yabancı logo yok; Unsplash `?auto=format&fit=crop&w=1920&q=75`, Beyar sonra kendi fotosuyla değiştirebilir).

---

## Mevcut v2-a'dan ne korunuyor / değişiyor

**KORUNUR:** header + frosted · mentor video + içeriği · sağ preview kart İÇERİĞİ (`switchTo`/`W[]`/`applyContent`) · floating FAB morph (`heroObs`) · #pano/#niyet/#manifesto · drawer · ss-mode · is-auth · tüm tokenlar.

**DEĞİŞİR:**
1. **Sol panel**: `home` adımı + pano/niyet çipleri silinir; `data-step="worlds"` default açık 5 çip; geri butonu kalkar; `data-section` JS (1018–1021) sökülür.
2. **Sol çip click** → `switchTo` değil **`#scene-*`'e snap scroll**. Hover (>1080) → `switchTo` (korunur).
3. **Sağ taraf**: `.world-card` → **kart destesi** (aktif + 4 dikey renkli sırt). Spine click → `switchTo`.
4. **Gövde**: hero altına 5 yeni `.scene` (alt3 dili, v3 tokenları). #pano vd. altına iner.
5. **Reveal**: 5 sahne + portal section'lara Apple tarzı IO reveal.
6. **Snap**: `proximity` korunur; sahnelere `scroll-snap-align:start` + `scroll-margin-top`.

---

## Kart destesi — teknik yaklaşım (signature)
- Kapsayıcı `.world-deck` (`.world-card` yerini alır), `position:relative`, yükseklik `--hero-col-h`, `perspective`.
- 1 aktif `.deck-card` (mevcut preview içeriği) + 4 `.deck-spine` (dar dikey şerit, `writing-mode:vertical-rl`, bg=`--bc`).
- Sırtlar aktif kart arkasında kademeli: `right:-n*16px; scale(1-n*.03)` + azalan `z-index`.
- `renderDeck(activeIdx)` aktif hariç 4 dünyayı kanonik sırada sırt yapar + `switchTo` çağırır.
- Hover peek: `.deck-spine:hover{translateX(-10px)}`. Click → `switchTo(idx)`+`renderDeck(idx)` (spring `--ease-spring`).
- **Mobil (≤1080):** dikey sırtlar aktif kart altında **4 renkli yatay sekmeye** düşer (writing-mode normal); tık→öne; hover yok; ≥44px.
- A11y: sırtlar `role="button"`+`aria-label`+`tabindex`; Enter/Space.
- Kısıt: `switchTo`/`applyContent`/`W[]` motoru AYNEN; deste görsel kabuk. `cardBusy`/cross-fade guard korunur.

---

## Snap + dot-ray + görsel + Apple reveal

### Snap [✓ yumuşak proximity]
`.scroll-body{scroll-snap-type:y proximity}` korunur; 5 `.scene`'e `scroll-snap-align:start` + `scroll-margin-top:var(--header-h)`. alt3 mandatory'ye geçilmez.

### dot-ray [✓ eklenecek]
alt3 `.dot-ray` uyarlaması: sağ-orta fixed, 5 `.dr-item[data-scene][--dc=dünya rengi]`, IO(0.45)→aktif dot scale 1.55+`--dc`; click→`scrollIntoView smooth`. ≤960 gizli. Sol çip snap + dot-ray aynı `#scene-*` hedefleri (tek kaynak).

### Sahne görselleri [✓ her sahneye ayrı]
5 yeni full-bleed/dikey-uyumlu sinematik foto. Gastro=mutfak/ateş · Gourmet=mekan/sofra · Diet=taze/yeşil · Fit=hareket · Akademi=öğrenme. Yabancı logo yok. `.scene-bg` inline `background-image` (div+bg cover).

### Apple reveal (iphone-17-pro replike) — görsel referans eşlemesi YAPILDI
Capture: `apple.com/iphone-17-pro` (200, scrollHeight 35565) → `docs/screenshots/apple-01..14.png` + `alt3-scene-0..6.png`.

**Apple'da gözlemlenen:** koyu bant + dev sola-yaslı bold başlık tek başına (üstte bol nefes); özellik metni soluk gri girip viewport ortasında beyaza parlıyor; aksan renginde pill CTA; full-bleed editoryal foto + sekme pill'leri; ürün/bg parallax (metinden yavaş). DOM rest-state'te içerik reveal okunmadı (Apple class-toggle/scroll-linked; yakalanan tek transition nav `0.32s ease translateY(-4px)`). Sayılar handoff locked spec + gözlemden.

**Eşleme — Apple efekti → bizim `.scene`:**
| Apple | Bizde | Sayı |
|---|---|---|
| Başlık tek başına, bol nefes | `.scene-body` ortalı, ferah margin, 100vh | mevcut |
| Fade-up + yukarı kayma | `.reveal{opacity:0;translateY(24px)}`→`.is-in{opacity:1;none}` | **24px** (locked) |
| Kademeli stagger | eyebrow→tag→desc→cta `transition-delay` | **0/90/170/250ms** (est.) |
| Premium easing | `--ease-spring cubic-bezier(.16,1,.3,1)` | **600–800ms** (locked) |
| Metin soluk→net | `.scene-desc` reveal `opacity .55→1` (ölçülü) | est. |
| Bg parallax | `.scene-bg` scroll-linked `translateY` (rAF, will-change) | ~**30–40px** (est.) |
| IO tetik | tek `IntersectionObserver(0.18)` → `.is-in` + `unobserve` | **0.18** (locked) |
| reduced-motion | `@media reduced-motion`: reveal+parallax+snap KAPALI | locked |

Disiplin: tek ölçülü fade-up paterni; scale/blur/rotate YOK (AI-hissi riskine karşı restraint). Portal section'lara da (#pano/#niyet/#manifesto) `.reveal` bindir.

---

## Token & kimlik (sabit)
- domates `#E14827` + 5 kanonik (`#b14fc5`/`#3BB77E`/`#009d4f`/`#006072`) — :root'ta MEVCUT, yeni hex YOK.
- Gilroy-only + FA. **KREM `#EFE5D3` YASAK.** Token üzerinden (sahne bg görselleri inline `background-image` hariç).
- frontend-design skill ZORUNLU. Kanonik kabuk (sa-shell/sa-ui) DOKUNMA. Tek dosya: `dadamentor-v3.html`; v2-a referans/yedek — DOKUNMA.

---

## Riskler
1. **Snap çakışması:** proximity'de kal (mandatory FAB `heroObs` 0.18 + portal akışını bozar). Test: hero→sahne→portal + FAB float/dock + dot-ray senkron.
2. **Floating FAB ↔ sahneler:** ilk sahne gelince FAB erken float (istenen, sol-altta). z-index:40 > sahne z-index:3 (FAB üstte, doğru).
3. **Performans:** 5×100vh + 5 yeni görsel + parallax. `q=75` + rAF-throttle + `will-change` ölçülü.
4. **dot-ray ↔ FAB:** FAB sol, dot-ray sağ → çakışmaz; dot-ray mobilde gizli.
5. **Reduced-motion:** reveal+parallax+snap üçü kapanmalı; CSS bloğu yeni yazılacak.
6. **Cross-fade ↔ deck:** `switchTo` cross-fade (260ms) + deck reorder spring; `cardBusy` ikisini kapsamalı.
7. **5 yeni görsel ağ yükü:** öncelik/`q=75` ile yönet; reduced-motion'da parallax kapalı.

---

## Implement adım sırası
1. `cp v7-6cu356/dadamentor-v2-a.html v7-6cu356/dadamentor-v3.html`.
2. `.gitignore`'a `docs/screenshots/` ekle.
3. **Sol panel:** home adımı + pano/niyet çiplerini sök; `data-step="worlds"` default; geri buton kalk; sol çip click → `#scene-*` snap; hover → switchTo.
4. **Sağ kart destesi:** `.world-card`→`.world-deck` (aktif + 4 dikey sırt); `renderDeck`+`switchTo`; spine click/hover; mobil yatay sekme.
5. **5 sahne:** hero altına `.scene w-*` ×5 + 5 yeni görsel; sahne CTA → dış sayfa; snap-align + margin-top.
6. **dot-ray:** sağ 5-nokta + IO aktif takip.
7. **Apple reveal:** `.reveal`/`.is-in` + IO(0.18) + stagger + `.scene-bg` parallax (rAF) + `@media reduced-motion` kill.
8. #pano/#niyet/#manifesto'ya `.reveal` bindir.
9. frontend-design her tur; eval/SS + console/taşma/cream 0.

## Doğrulama
- `python3 -m http.server 8765` (v7-6cu356) → `localhost:8765/dadamentor-v3.html` → Playwright 1440+390 full-page SS (CROP YOK), self-verify. `git status`: v2-a değişmemiş, v3 yeni.
- console 0 · yatay taşma 0 · cream/`#EFE5D3` grep 0 · ham-hex sızıntı 0.
- Akış: sol 5 çip → doğru `#scene-*` · sahne CTA → doğru dış sayfa (5×200) · deste spine → switchTo doğru dünya · preview CTA → dış · FAB float/dock · reveal bir kez · reduced-motion'da reveal/parallax/snap kapalı.
- Bağlantı denetimi (CLAUDE.md): tüm CTA hedefleri tıkla-doğrula; dead-link/yanlış hedef/boş onclick yok.
- Çıktı: kısa YAZILI rapor.
