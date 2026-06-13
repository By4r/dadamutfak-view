# Task #5 — tarif-liste subcat aktif-state modernize (RAPOR)

**Dosya (tek):** `mockups/tarif-liste-v1.html` · `git diff --numstat` = `11 4`. COMMIT YOK.
**Kapsam:** SADECE `.subcat.active` grubu (satır ~862–868) + `sc-ico` active. Normal/:hover, facet (248→22), mouse-drag, §2f hero, kart/meta DOKUNULMADI.

## Kök neden (önce)
```
.subcat.active{border-color:var(--tomato);background:var(--tomato-tint);box-shadow:inset 0 0 0 1px var(--tomato)}
.subcat.active .sc-ico{box-shadow:0 0 0 2px var(--tomato)}
```
`border-color` (1px tam-tomato) **+** `inset 0 0 0 1px` ring → **çift çerçeve** (kaba/kalın görünüm). Ayrıca ikonun kendi 2px ring'i ikinci bir halka ekliyordu. SS `01-before-active.png`: Tümü kartı kalın turuncu kutu + ikon halkası.

## Çözüm (sonra) — frontend-design: refined-minimal, "elevated selected"
inset ring KALDIRILDI, ikon 2px ring KALDIRILDI. Outline yerine **derinlik**:
```
.subcat.active{
  border-color:rgba(225,72,39,.32);                 /* ince, düşük-opaklık — kaba çerçeve yok */
  background:var(--tomato-tint);
  box-shadow:0 6px 18px -8px rgba(225,72,39,.45),0 1px 3px rgba(225,72,39,.12);  /* yumuşak tomato elevation */
}
.subcat .sc-ico{position:relative; …}
.subcat.active .sc-ico::after{…left:50%;bottom:-7px;width:18px;height:2px;border-radius:var(--radius-pill);background:var(--tomato)}  /* ikon altı minimal accent */
```
- Kalın çerçeve + çift-ring → **yok**.
- Aktif sinyal artık: hafif tomato-tint zemin + yumuşak tomato-gölgeli yükselti + ikon altında 2px indicator çubuğu + tomato metin/ikon.
- Token disiplini: tint/border/gölge tomato türevi, `--radius-pill` accent, FontAwesome yok (gerek yok), 2x çarpma yok.

## Kanıt (standalone headless Chrome — Playwright YASAK'a uyuldu)
- `outputs/subcat-active-ss/01-before-active.png` — git HEAD kopyası: Tümü kartı kaba çift-çerçeve + ikon ring.
- `outputs/subcat-active-ss/02-after-active.png` — fix sonrası: yumuşak elevation + minimal accent, çerçeve zarif.
- Aktif kart = "Tümü" (markup satır ~1721, `.subcat.active` default). Göz-teyitli: çift çerçeve gitti, zarif vurgu kaldı.
