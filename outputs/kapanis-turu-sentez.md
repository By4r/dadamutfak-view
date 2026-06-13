# DadaMutfak — "Kapanış Doğrulama + 2+2 İş" Turu Sentezi

> Tarih: 2026-06-13 · Agent team `kapanis-turu` (lead delegate + 3 teammate).
> Baz: `48773db` (hero turu). **COMMIT YOK — Beyar onayı bekliyor.**
> Kabul protokolü: git numstat birincil + render/göz (lead Playwright MCP) +
> standalone-chrome SS teammate. Kör sayaç + render-zorunlu-kabul dersleri uygulandı.

## Kapsam — 15 dosya, +466/-93 (hepsi hesapta, başıboş 0)

| # | İş | Dosya(lar) | numstat | Kabul |
|---|----|-----------|---------|-------|
| 1 | MCP doğrulama (read-only) | — (rapor) | — | ✅ 6/6, 0🔴 |
| 3 | arama autocomplete dropdown | arama-v1 | 300/1 | ✅ render |
| 2 | sağlık renk tutarlılığı | 10 sh sayfası | bkz↓ | ✅ render |
| 5 | subcat aktif-state modern | tarif-liste-v1 | 11/4 | ✅ render |
| 6 | alisveris hero buton fix | alisveris+siparislerim+giris | 8/1·3/1·3/1 | ✅ Playwright tıklama |

**Sağlık 10 sayfa (saglik-renk):** bazal-metabolizma 8/3 · beden-kutle-endeksi 8/3 ·
gunluk-kalori 8/3 · gunluk-su 8/3 · ideal-kilo 8/3 · vucut-tipi 8/3 ·
besin-kutuphanesi 7/2 · test-detay 12/7 · diyetisyen-dizin 45/37 · diyetisyen-ol 29/21.

## 1 — MCP Doğrulama (mcp-dogrulama, read-only)

Geçen tur (48773db) **6/6 madde teyitli, 🔴 kritik = 0**. subcat şerit + facet
(248→22) + mouse-drag · tarif-detay tek-anchor · BNP computeMatches grace/backfill ·
puf chip nowrap+fade+drag · anchor-offset 8 sayfa scroll-padding-top:128px · 3 wrapper
bleed=0 (6 SS desktop+mobil). 🟡 not: container gerçek class `.subcat-strip`
(checklist `.subcat-sec` demişti — eski ad). Rapor: `outputs/dogrulama-rapor.md`.

## 3 — arama-v1 Autocomplete Dropdown (arama-autocomplete)

`.search-input` dilinden `.sr-ac` panel: debounce 150ms · TR-duyarlı normalize +
başlangıç-eşleşme önceliği + `<mark>` vurgu · klavye ↑↓(sarmalı)/Enter/Esc/Home/End ·
ARIA combobox tam (role/aria-expanded/activedescendant/controls + listbox/option +
aria-live status) · veri kaynağı sayfadaki `#srPop` (Son+Popüler tutarlı) · ikon
div+bg-image (§3, img yok) · token+FA6.5.2. Render: filtreli öneri + rozet + thumbnail +
aktif satır highlight (lead göz-teyitli). Rapor: `outputs/arama-autocomplete-rapor.md`.

## 2 — Sağlık Ailesi Renk Tutarlılığı (saglik-renk)

10 sh sayfasında turuncu sağlık-aksanı → **#3BB77E**, CERRAHİ (kör replace yok).
6 hesaplayıcı focus-glow/help-ikon/crumb-hover · besin boş-durum · test-detay quiz
.pick + share-copy · diyetisyen-dizin tam gövde (facet/sort/card/ribbon/empty/pagi +
hero accent #ff7a5c→#54d39a + eyebrow + CTA) · diyetisyen-ol form sweep + Sağlık nav
aktif-link `.nav a.active[href=saglik-hub]` cerrahi yeşil. **Marka chrome DOKUNULMADI**
(logo/topbar/Diyetisyen-Ol-CTA/FAB/footer turuncu · §2f hero overlay · r-card v3a ·
gauge risk skalası · besin yağ-makro semantik turuncu). Render: diyetisyen-dizin after
göz-teyitli (sağlık yeşil, chrome turuncu, layout sağlam). Rapor: `outputs/saglik-renk-rapor.md`.

### saglik-renk → lead'e bırakılan 4 karar (lead kararı verildi)
1. `.fk-label .req` zorunlu-yıldız turuncu → **KALDI** (form-semantik, 7 formda tutarlı).
2. Sağlık dropdown İÇİ hover ikonları (paylaşımlı chrome, `.nav-item.health` hook =
   chrome-fork riski) → **DOKUNULMADI** (Beyar'a defer; chrome tutarlılığı güvenli).
   **Bu kararla arama-v1 Sağlık-dropdown seri-patch'i İPTAL** (arama saglik sayfası değil).
3. diyetisyen-ol captcha yasal linkleri yeşil (sınırda) → şimdilik kaldı, geri alınabilir.
4. test-detay ikili-active (Tarifler+Sağlık ikisi `.active`) → ayrı tutarsızlık, kapsam dışı.

## 5 — tarif-liste subcat Aktif-State Modernize (arama-autocomplete, resume)

Kök neden: `.subcat.active{border-color:tomato + box-shadow:inset 0 0 0 1px}` +
`.sc-ico{box-shadow:0 0 0 2px}` = çift çerçeve (kaba). Fix (refined elevated-selected):
inset ring + ikon ring KALDIRILDI → ince düşük-opaklık tomato border (rgba .32) + yumuşak
tomato-tint elevation gölgesi + ikon altı minimal 2px indicator. Normal/:hover/facet/drag/
§2f DOKUNULMADI. Render after: zarif, kalın-çerçeve yok (lead göz-teyitli).
Rapor: `outputs/subcat-active-rapor.md`.

## 6 — alisveris-listesi Hero Buton Etkileşim (arama-autocomplete, resume)

**Teşhis:** 3 buton (Haftalık Menü [A→haftalik-menu], Yazdır/PDF [button], Paylaş
[button+popover]) default state'te zaten tıklanabiliyordu; **latent kök** = hero
butonlarının stacking z-index'i yok → header overlay'leri (mega/dropdown z:80, lg/fb z:97)
visible olursa pointer kaçabilir. **Fix (görünüm değişmeden katman sertleştirme):**
`.al-top .wrap{z:5}` + `.al-actions`+butonlar `z:6;pe:auto` + popover `z:40`;
siparislerim (`see-all`) + giris (`.au-card`) hero'larına aynı guard.

**LEAD BAĞIMSIZ DOĞRULAMA (Playwright MCP):** hit-test 3 buton `hitIsSelf:true z:6
pe:auto blockedBy:null` · Paylaş popover `display:none`→tıkla→toggle · **gerçek tıklama
Haftalık Menü → haftalik-menu-v1.html navigasyon ÇALIŞTI** · cursor:pointer.
⚠️ **Beyar'a not:** agent (ve lead) orijinal "hover+tıklama çalışmıyor" semptomunu
**üretemedi** — şu an 3 buton da fonksiyonel. Fix defansif (z-index sertleştirme).
Beyar belirli bir state/viewport'ta hâlâ görüyorsa o repro gerekli. Rapor: `outputs/alisveris-hero-rapor.md`.

## EK — Topbar DadaStore Pill İç Hizalama (lead, site-geneli sweep)

**Şikayet:** DadaStore pill İÇİNDEKİ ikon+yazı pill çeperine göre ortalı değil, sola kaymış.
**Kök neden (lead Playwright ölçümü):** `.tb-world-store` markup'ında görünmez hover oku
`<i class="tw-arr">` var; `.tw-arr{opacity:0}` ama **flow'da** → genişlik(8px)+`gap:8px`
sağda yer rezerve ediyor → görünür içerik **soldan 13px/sağdan 28px = 15px asimetri**.
(DadaAkademi'de yerine görünür "Yakında" rozeti olduğu için o dengeli.)
**Fix (hover reveal KORUNDU):** `.tb-world .tw-arr` rest → `max-width:0;margin-left:-8px;
overflow:hidden` (ayak izi 0, gap iptal) + hover → `max-width:16px;margin-left:0` (ok kayarak
girer). 58 sayfada birebir aynı inline CSS (md5 tek varyant) → tek-yazar lead literal sweep.
**Lead Playwright doğrulama:** asimetri **15px→-1px** · rest ok genişlik **8→0** · pill
**120→104px** · hover'da ok **0→8px, opacity 0→0.92, pill→120** (reveal çalışıyor). SS:
`outputs/topbar-store-ss/after-topbar.png` (içerik ortalı, göz-teyitli). Sızıntı: eski
rest-kural kalan=0. Sadece DadaStore içeriği; pill konumu/boyutu/diğer topbar öğeleri + §2f
+ gövde DOKUNULMADI (DadaAkademi tw-soon etkilenmez).

## Çakışma Yönetimi (0 çift-yazım)

- Domain ayrımı: mcp-dogrulama read-only · saglik-renk=10 sh · autocomplete=arama-v1.
- EK 2 iş (#5 tarif-liste, #6 alisveris) #1'e (mcp-dogrulama mutasyon-öncesi teyit)
  blocked → bitince idle autocomplete agent'ı resume edilip seri aldı (2 ayrık dosya).
- arama-v1 Sağlık-dropdown kesişimi: saglik-renk arama-v1'i HARİÇ tuttu; sonra karar 2
  ile patch iptal → çakışma hiç doğmadı.
- Her teammate diff'inde "benim değil" satırları (başka teammate working-tree) doğru
  ayırt etti; saglik-renk imzası arama-v1/tarif-liste'ye SIZMADI (grep teyitli).

## Açık / Bekleyen
- COMMIT YOK — Beyar onayı.
- saglik-renk kararları 2/3/4 (dropdown-içi hover, captcha link, test-detay ikili-active).
- #6 orijinal semptom repro'su (Beyar görürse).
- **Mobil QA bu turda YOK** — Faz 7 Sofra Düzeni bittikten sonra kapsamlı tek mobil QA.
