# DadaMentor v2 — Keşif + Plan

> Kök: `dadamentor-alt6.html`. Üstüne inşa. Referans mekanikler: offmenu closetnow
> (collapse/expand + sticky assistant), apple.com (section snap), `dadamentor-alt3.html`
> (#scene snap yapısı), `anasayfa-portal-v3a.html` (header dili).
> Kimlik sabit: açık/portal zemin · domates `#E14827` · 5 dünya kanonik renk · Gilroy-only ·
> FA · KREM YASAK · token disiplini (ham hex yok).

---

## 0. Keşif özeti (ne bulundu)

**alt6 (kök) bugün ne yapıyor:**
- Tek ekran (no-scroll), `body` flex column, `.hero` flex:1.
- `.hero-stage` = 2 kolon grid: **SOL** `392px` mentor paneli (koyu video kart) + **SAĞ** `1fr` preview sahnesi.
- Mentor paneli: video bg + atmos gradient + chat (avatar, bubble, çip adımları `home`/`worlds`).
- Çip mantığı: `data-go` (adım değiştir) ve `data-idx` (sağ preview sahnesini değiştir). World çiplerine **hover → sağ sahne** o dünyaya döner (`switchTo`), tıkla → yine switchTo.
- Sağ `.split-scene`: `srBg` (tek bg div, JS `backgroundImage` set), overlay+grain+content (eyebrow, world adı, tagline, metric, 3 kart, enter CTA). 7 sahne verisi `W[]` dizisinde (5 dünya + pano + store).
- Panel kapat/yeniden-aç (`.closed` + `.mp-reopen` sekmesi) — basit collapse var ama "tam kapat", closetnow-vari pürüzsüz mini hâl YOK.
- Header: **açık beyaz blur sticky** (portal değil — kendi basit hâli), Dünyalar mega + Giriş/Üye Ol. Dil seçici YOK.

**alt3 (snap referansı):**
- `body` üstünde `scroll-snap-type:y mandatory`, her `.scene` `height:100vh` + `scroll-snap-align:start`.
- Sağ sabit `.dot-ray` nokta navigasyonu, IntersectionObserver ile aktif sahne takibi.
- Header şeffaf→`.frosted` (intro IO ile). SS modu snap'i kapatıp dikey akıtıyor.
- Sahne içerikleri = 5 dünya + store, her biri full-bleed bg + sinematik başlık + tek CTA. **Bu içerikler v2 heroda hover ile gösterileceği için section'da TEKRARLANMAYACAK.**

**portal-v3a header dili:**
- İki katman: koyu `.topbar` (40px, dil seçici + üst dünya kısayolları) + `.header` (fixed, `top:40px`, 72px).
- Scroll durumu **ters**: default = frosted beyaz; `.at-top` = şeffaf + beyaz logo/yazı. JS eşiği `scrollY<60`.
- Dil seçici: `.tb-lang` globe + EN/TR dropdown (salt client label swap).
- Logo: `logo-official.png` / `-white.png` (renk/beyaz swap). Arama = ikon-buton → arama sayfasına gider (inline açılma yok).

**Asset gerçeği (ÖNEMLİ):**
- 5 dünya için **yerel hero görseli YOK.** alt6/alt3 dünya bg'leri Unsplash URL (alt6 `W[]` içinde sabit).
- Mevcut yerel videolar: `mentor-hero.mp4`, `mentor-panel.mp4`, `diet-hero.mp4`, `dadafit-hero.mp4`,
  `guide-cooking.mp4`, `dada-food-broll.mp4` — **5 dünya tam seti DEĞİL** (gastro/gourmet/akademi/store yok).
- Sonuç: hover→hero bg geçişi **görsel (Unsplash) seti** ile tutarlı kurulacak; video ile değil.
  İleride yerel görsel/video gelirse aynı slota düşer.

---

## 1. alt6'dan NE korunuyor / NE değişiyor

**KORUNUR (birebir veya minimal dokunuş):**
- Token sistemi (`:root` renk/geometri/gölge), Gilroy @font-face, dünya renk yardımcıları (`.w-*`).
- Mentor paneli iç anatomisi: video media + atmos + fade, `.mp-top` (tag + close), `.mp-id` (avatar/online),
  `.mp-bubble`, çip adım sistemi (`data-step` + `.mp-step[data-s]`), `.mp-opt`/`.mp-back`.
- `W[]` dünya veri dizisi (5 dünya + pano + store) — hover/section beslemesi için yeniden kullanılır.
- Footer (ince üst bant), mobil drawer iskeleti.
- Çip "active" + dünya-renk (`--bc`) boyama mantığı.

**DEĞİŞİR:**
- **Layout devrimi:** 2-kolon (sol panel + sağ sahne) → **full-bleed hero canvas + MERKEZ mentor paneli**.
  Sağ `.split-scene` static kart olarak KALKAR; onun yerine dünya = **tüm hero arka planı**.
- Mentor paneli konumu: sol-sabit → **hero-merkez** (yeni durum) + scroll'da **sol-sticky** (yeni durum).
- Collapse: alt6'nın "tam kapat" sekmesi → **closetnow-vari mini-panel** (pürüzsüz küçülme, kaybolma değil).
- Header: alt6 basit header → **portal-v3a uyumlu** (şeffaf→frosted) + **dil seçici eklenir** + arama + giriş.
- Sayfa tek-ekrandan → **scroll'lu**: hero altına section'lar gelir (snap).
- Çip davranışı ayrışır: 5 dünya çipi → hover=hero bg + click=dünya sayfası; diğer çipler → **same-page section'a snap**.

---

## 2. Section haritası (hero + altı)

```
┌─ HEADER (fixed, transparent→frosted) ─────────────────────┐
│ logo · arama · giriş · dil                                  │
├─ #hero  (100vh, full-bleed world canvas) ─────────────────┤
│         [ MENTOR PANELİ — MERKEZ ]                          │
│  hover dünya çipi → tüm bg o dünyaya döner                  │
├─ #pano   "Bugünün Panosu"  (hero'da YOK) ─────────────────┤  ← çip: "Bugünün panosu"
│   sticky-sol panel + sağda günün öneri kartları            │
├─ #niyet  "Bir şeye mi ihtiyacın var?" ────────────────────┤  ← çip: "Bir şeye mi ihtiyacın var?"
│   niyet/intent çipleri → araç/store sayfalarına köprü      │
├─ #manifesto  kapanış (alt3 manifesto + bülten) ───────────┤
└─ FOOTER ──────────────────────────────────────────────────┘
```

✅ **Section listesi KARAR NET (kullanıcı onayı):** Bugünün Panosu · Niyet ("Bir şeye mi ihtiyacın var?") ·
Manifesto+bülten. **DadaStore ayrı şerit YOK** — store'a niyet section'ından köprü kurulur.
- **5 dünya = SADECE hero hover** (section tekrarı yok — brief kuralı).
- Her "diğer" çip → ilgili section'a smooth snap.
- Sağ `.dot-ray` (alt3) opsiyonel: section navigasyonu için geri gelebilir.

---

## 3. Mentor paneli — 3 durum state machine  ✅ (referans: offmenu.design/work/tenacity)

| Durum | Tetik | Görünüm | Konum / boyut |
|---|---|---|---|
| **A · hero-büyük** | açılış, scrollY≈0 | tam panel: figür/video + bubble + çipler + input, **ferah/geniş** (offmenu landing) | hero — büyük (kompozisyon onaya tabi: merkez mi, sol-büyük mü) |
| **B · sol-kenar-kompakt-sticky** | hero'dan scroll çıkışı | **hâlâ TAM panel** (avatar+bubble+çip+input) ama **dar/kompakt** kolon | **sol kenara yapışık**, scroll boyunca gelir (tenacity sticky), kaybolmaz |
| **C · collapse** | toggle (A veya B'den) | mini (avatar + toggle) | bulunduğu yerde küçülür; **sticky(B) halde de collapse edilebilir** |

- **A→B:** scroll progress ile panel **hero-büyük → sol-kenar-kompakt** geçişi: genişlik daralır + sol kenara
  oturur, içerik korunur (sadece kompaktlaşır). **"Merkez→sol kayma" DEĞİL** — boyut/kompaktlık geçişi (tenacity).
  Geri scroll → A.
- **A/B→C:** toggle; collapse her iki halde de geçerli. C → önceki durum (A veya B) hatırlanır.
- **Teknik:** `position:fixed` mentor paneli + scroll-progress transform (**büyük→kompakt + sol-kenara otur**),
  closetnow/tenacity pürüzsüzlüğü; section'lar sticky(B) modda sol-padding ile paneli temizler.
  Reduced-motion: anlık durum geçişi, animasyonsuz.

---

## 4. Hover → hero geçişi  ✅ KARAR NET (kullanıcı onayı)

**Kart İÇERİĞİ alt6'dan AYNEN KORUNUR — layout/tipografi/CTA'ya DOKUNMA:**
eyebrow (örn "DADAGOURMET · KEŞFET") + büyük dünya adı + tagline + metric pill
(örn "850+ mekân & etkinlik") + 3 mini-kart + "Dünyaya gir" CTA. (alt6 `W[]` + `.sr-*` yapısı birebir.)

**DEĞİŞEN tek şey:** o dünyanın görseli + koyu overlay + dünya gradienti artık **sağ kutuyla sınırlı
DEĞİL → TÜM HERO arka planını full-bleed kaplar.** Görsel "duplicate" edilir: hem kartın hem tüm hero'nun
arka planı aynı dünya görseli olur. Merkez mentor paneli her hâlde sabit kalır.

- 2 katmanlı bg (`.hero-bg-a`/`.hero-bg-b`) → world görseli **cross-fade** (flash yok), ani değil.
- Sabit koyu overlay (0.30–0.42, portal-tutarlı) + **dünya renk gradienti** (`--bc` radial); world değişince
  `--bc` güncellenir → gradient ton döner. Merkez panel okunur kalsın diye overlay panel arkasında daha koyu.
- Per-world (alt6 W[] Unsplash görselleri, video değil):
  Gastro→domates `#E14827` · Gourmet→mor `#b14fc5` · Diet→nane · Fit→yeşil `#009d4f` · Akademi→petrol `#006072`.
- **Default (hover yok):** açık/portal-tutarlı zemin. `mouseleave` → açık zemine **yumuşak** geri dön.
- JS: world çipi `mouseenter` → aktif index → bg layer swap + `--bc` set + kart içeriği güncelle (alt6
  `switchTo`/`applyContent` korunur). `click` → o dünya sayfasına git (CTA `href`).
- Reduced-motion: cross-fade yerine anlık swap; scroll-snap kapalı.

> NOT (hero kompozisyonu — KULLANICIYA SORULUYOR): hero'da büyük panel **merkez mi** yoksa **sol-büyük** mü
> duracak (tenacity landing'de büyük; scroll'da sol-kompakt). Bu, korunan alt6 kartının (eyebrow+ad+tagline+
> metric+kart+CTA) nereye oturacağını belirler. Kart İÇERİĞİNE dokunulmaz; yalnızca yerleşim netleşecek.

---

## 5. Collapse / expand (closetnow taklidi)

- Tek panel elemanı; durum `data-state="full|mini"`.
- **full → mini:** içerik (bubble+çipler) opacity→0 + panel `width`/`height` ölçülü küçülür (avatar+toggle kalır).
  Yükseklik animasyonu için `grid-template-rows 0fr→1fr` ya da ölçülü `max-height` + transform; layout
  zıplaması olmasın diye `transform`/`opacity` ağırlıklı.
- **mini:** sadece avatar (DadaMentor pusula) + toggle ikon; tıkla → expand.
- Geçiş tek `cubic-bezier(.22,.61,.36,1)`, ~.4s; reduced-motion'da anlık.
- alt6'nın `.closed`+`.mp-reopen` "tam kaybol" mantığı → "küçül ama kal" ile değiştirilir.

---

## 6. Snap scroll yaklaşımı

- **CSS scroll-snap (proximity)** — mandatory DEĞİL: sticky panelle çakışmasın, kullanıcı serbest scroll
  yapabilsin, section'lara yumuşak otursun (apple hissi ama hapsetmeden).
- Her section `scroll-snap-align:start` + uygun `scroll-margin-top` (fixed header yüksekliği kadar).
- Çip → `scrollIntoView({behavior:'smooth'})` ilgili `#section`'a.
- Aktif section takibi IntersectionObserver (alt3 deseni) — dot-ray gelirse besler.
- SS modu (`?ss=1`): snap kapalı, panel fixed→static, tüm sayfa dikey akar (alt3/alt6 SS deseni).

---

## 7. Header (portal-v3a uyumu, mentor adaptasyonu)

- **Tek şeffaf header** (mentor landing için topbar'ı sadeleştir): `.at-top` şeffaf → scroll'da frosted beyaz,
  eşik `scrollY<60` (portal JS birebir).
- İçerik: Dada **şapka/pusula logo** (şimdilik `.brand .mark`, official logo değil) · arama (ikon-buton) ·
  Giriş · **dil seçici** (portal `.tb-lang` globe+EN/TR, header sağına taşınır).
- Şeffafken yazı/ikon beyaz; frosted'da koyu (portal `.at-top` override deseni).
- Mobilde: nav/login drawer'a, dil drawer-lang'a (portal deseni).

---

## 8. Mobil davranış (öneri — onaya tabi, soru 4)

- Sticky-sol panel YOK: panel hero üstünde **merkez/üst**, section'lar normal stack.
- Hover yok → **tap** ile dünya seç (bg değişir) + ikinci tap / "gir" ile gider; ya da çip = doğrudan git.
- Collapse → ekran altına **dock'lu mini pill** (baş parmak erişimi).
- Snap proximity mobilde de açık ama hafif.

---

## 9. Risk / belirsizlik notları

1. **fixed-panel + scroll transform** ile **scroll-snap** birlikte ince ayar ister (jank riski) — rAF + CSS var
   ile sürülecek; mandatory snap'ten kaçınmak bu riski düşürür.
2. **Yerel dünya görseli yok** → Unsplash bağımlılığı (offline/SS'te yavaş). İleride yerelleştirme önerilir.
3. **Hover→bg** masaüstü etkileşimi; mobil/touch + klavye için eşdeğer (tap/focus) gerekiyor — a11y.
4. Hero merkez panel + full-bleed koyu bg ⇒ **kontrast**: panel her dünya renginde AA kalmalı (overlay yükü).
5. Collapse yükseklik animasyonu layout shift riski — transform/opacity ağırlıklı çözülecek.
6. Section içerikleri henüz taslak — hero'daki 5 dünya ile **tekrar** olmadığından emin olunacak.

---

## 10. Kararlar (kullanıcı onayı alındı) ✅

1. **Hover içerik:** alt6 kart İÇERİĞİ aynen korunur (eyebrow+ad+tagline+metric+3 kart+CTA); değişen tek şey
   görselin sağ-kutudan **full-bleed hero**'ya taşınması + cross-fade. Kart layout/tipo/CTA'ya dokunma. (§4)
2. **Hero altı section'lar:** Bugünün Panosu · Niyet · Manifesto+bülten. Store ayrı şerit YOK (niyet→store köprü). (§2)
3. **A→B geçiş:** `position:fixed` + scroll-driven transform (merkez→sol interpolasyon, closetnow pürüzsüzlüğü). (§3)
4. **Mobil:** tap-seç + ekran altı dock'lu mini-pill (collapse). Sticky-sol yok. (§8)

> Açık bırakılan tek implement-detayı: merkez panel + korunan kart içeriğinin kompozisyonu (kart sağda mı kalır)
> — kart içeriğine dokunmadan implement aşamasında oturtulacak (§4 notu).
