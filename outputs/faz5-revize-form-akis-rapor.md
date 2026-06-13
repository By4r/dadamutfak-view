# FAZ 5-REVİZE — Form Akış (T3) Raporu

> Teammate: **form-akis** · Takım: faz5-revize · Sahiplik: `diyetisyen-ol-v1.html` + `sef-ol-v1.html` SADECE
> Tarih: 2026-06-13 · Çıktı kanıtı: izole channel:chrome SS + element-rect/scroll probe

## Görev
İki başvuru formu da dikeyde çok uzun; sağdaki "Başvuru Süreci" paneli korunsun, düzen iki-kolon
+ STICKY olsun, sağ alan aktif kullanılsın. Mevcut alan/içerik/copy KORUNUR — sadece yerleşim.

## Kök neden bulgusu (en kritik)
İki sayfa ZATEN iki-kolon grid (`.ol-layout: minmax(0,1fr) 320px`) + `.ol-side{position:sticky;top:130px}`
taşıyordu — **ama sticky ÇALIŞMIYORDU**. Probe: scrollY=1400'de `.ol-side` viewport-top = **−508/−522px**
(yapışsa 130 olmalı). Yani panel scroll'da yukarı kayıp gidiyor, sayfanın alt %60'ında sağ kolon
TAMAMEN BOŞTU → "sağ alanı aktif kullan" sorununun gerçek kaynağı buydu.

- **Neden:** Shell chrome'undaki `html,body{overflow-x:hidden}` kuralı, CSS used-value adjustment ile
  `overflow-y`'yi **auto**'ya çeviriyor → body bir **scroll-container** oluyor → içindeki
  `position:sticky` etkisiz kalıyor. (Site-geneli durum: `.lst-side` facet paneli de aynı sebeple
  yapışmıyor — teyit edildi, top −688.)
- **Çözüm (chrome'a DOKUNMADAN, page-local):** SAYFA CSS bloğuna `html,body{overflow-x:clip}` override.
  `clip` yatay taşmayı `hidden` gibi keser AMA `overflow-y`'yi `visible` bırakır → body scroll-container
  olmaz → sticky GERÇEKTEN çalışır. Empirik teyit: override sonrası `.ol-side` top = **130** ✓,
  390 yatay taşma yine **0** ✓.

## Yapılan değişiklikler (iki sayfada BİREBİR aynı dil)
**A. Sticky fix** — `html,body{overflow-x:clip}` (yorumlu, page-local override).

**B. Dikey ritim sıkılaştırma (yalnız CSS):**
- `.ol-sec` padding `40/74` → `36/70`
- `.ol-layout` gap `30→28`, sağ kolon `320→330px` (panel biraz daha mevcudiyet kazandı)
- `.ol-main` + `.ol-formcards` gap `20→16`
- `.form-card` padding `28` → `24px 26px`
- `.fc-head` margin/padding `24/18` → `18/14`
- `.fk-field` margin-bottom `22→18`
- `.fk-grid` gap `16/18` → `14/18` + `align-items:start` (c2 upload satırları üst-hizalı, stretch yok)
- `.fk-grid` ardışık margin `18/22` → `14/18`
- `.up-zone` padding `30/20` → `22/18`

**C. Grid yapısı (içerik korunur — "sadece layout CSS + grid yapısı" kapsamında):**
- diyetisyen-ol Kart 3 (Belgeler): Diploma TAM genişlik kalır; **Sertifikalar + Profil Fotoğrafı → `.fk-grid c2`** yan yana.
- sef-ol Kart 3 (Deneyim & Belgeler): **Sertifikalar + Örnek Tarif Görseli → `.fk-grid c2`** yan yana (ikisi de up-done'lu, simetrik).
- En büyük dikey israf (üst üste 3/2 dikey upload zone) kırıldı.

## KANIT (söze güven yok)
| Ölçüm | diyetisyen-ol | sef-ol |
|---|---|---|
| `.ol-sec` yükseklik (önce→sonra) | 2942 → **2515px** (−427, %14.5) | 3012 → **2608px** (−404, %13.4) |
| Sticky `.ol-side` top @scrollY1400 (önce→sonra) | −508 → **130** ✓ | −522 → **130** ✓ |
| 390 element-rect yatay taşma | **0** | **0** |
| 390 grid kolonu | tek kolon (stack) | tek kolon (stack) |

- **SS (izole channel:chrome, user-data-dir=/tmp/fa-chrome, server :8853, device_scale 1):**
  `mockups/.ss-scratch/fa-{diyetisyen-ol,sef-ol}-rev1-{1440,390,mid}.png`
  - Masaüstü full: form belirgin kompakt, Kart 3 c2 upload temiz.
  - **mid-scroll (1700px):** sticky "Başvuru Süreci"+"Neden DadaMutfak" paneli artık Kart 3-4'ün
    YANINDA takip ediyor — önceden boş olan sağ alan dolu. (Lead tasarım-gözü için kilit kare.)
  - 390: c2'ler tek kolona iniyor (mevcut `≤640 .fk-grid.c2{1fr}` kuralı yeni upload c2'lerini de
    yakaladı), taşma yok, panel statik altta.
- **Onaylı commit diff (`git diff 3c63926`):** numstat diyetisyen +27/−18, sef +29/−20. Silinen/eklenen
  non-CSS satırların TAMAMI c2 sarmalamadan kaynaklı **re-indent** (label/up-done aynen hem − hem +
  tarafında). Copy string'leri (`Sertifikalarını ekle`, `Profil fotoğrafı yükle`,
  `İmza tarifinin fotoğrafını ekle`, `gastronomi-sertifika.pdf` …) her dosyada 1 kez korunmuş.
  **Form alanı / içerik / copy değişimi: 0.**
- **Tutarlılık:** iki dosyanın layout dili (ol-layout/ol-formcards/form-card/fk-field/sticky-fix) grep ile birebir AYNI.

## §2f / sınır uyumu
- Hero/breadcrumb H3 kanonu (`.ol-top` kompakt + `.rd-crumb` + sol-hizalı başlık) DOKUNULMADI.
- `_shell.html`'e DOKUNULMADI. Chrome katmanı (mega/header/footer) DEĞİŞMEDİ — `overflow-x:clip`
  yalnız SAYFA CSS'inde page-local override, shell kuralı yerinde duruyor.

## Bilinen Sınırlamalar
1. **Sticky fix kapsamı:** `overflow-x:clip` override YALNIZ bu iki sayfaya uygulandı. Sticky'nin
   site-geneli kırık olduğu tespit edildi (`.lst-side` vb. de yapışmıyor) — ama bu T3 sahipliği
   dışında; başka sayfalara yaymak ayrı bir karar/iş. Bu raporda **bilgi olarak** işaretlenir.
2. **`overflow:clip` tarayıcı desteği:** modern Chrome/Firefox/Safari'de tam destekli; çok eski
   tarayıcıda `clip` tanınmazsa kural düşer ve davranış mevcut (kırık-sticky) hâline geri döner —
   yani regresyon DEĞİL, yalnız iyileştirme uygulanmaz. Mockup hedef kitlesi için sorun değil.
3. **Headless SS notu (kılavuz §4):** SS'ler headless channel:chrome ile alındı; min pencere 500px
   etkisi 1440'ta yok, 390 taşmazlığı element-rect JS probe ile ayrıca doğrulandı (SS'e değil probe'a güven).
4. **`align-items:start` etkisi:** mevcut eşit-yükseklikli c2 satırlarında (Ad/Soyad vb.) görsel
   fark YOK; yalnız farklı-yükseklikli yeni upload c2'lerinde üst-hizalama sağlar (istenen davranış).
5. **Form JS/submit akışı** (uzmanlık sayacı, bio sayacı, başarı durumu) mock; bu işte dokunulmadı,
   davranış commit 3c63926 ile aynı.

## Sonuç (Tur 1 — yerleşim)
İki form da: sticky panel artık gerçekten takip ediyor (sağ alan aktif), ~%14 daha kompakt,
390'da taşma 0 + tek kolon stack, iki sayfa tutarlı grid dili, içerik/copy değişmedi. Loop: 1 tur/sayfa.

---

# MİNİ-DÜZELTME TURU — İnteraktif "Başvuru Süreci" paneli (madde 4)

## İstenen
Sağdaki statik "Başvuru Süreci" listesini, adıma tıklayınca soldaki form ilgili bölüme
smooth-scroll olan + o adım panelde aktif işaretlenen interaktif step-nav'a çevir (one-page anchor +
scroll-spy). İki sayfa tutarlı. İçerik/copy korunur, sadece interaktiflik + anchor + JS + aktif-state.

## Yapılan (iki sayfada BİREBİR aynı)
- **Anchor:** 4 form-card'a `id="adim-1..4"` + `scroll-margin-top:128px` (mobil 78px) — başlık header
  altına tam oturur (tıklama sonrası adim-3 top = **128px**, kanıt).
- **Panel adımları → tıklanır anchor:** `.tip-step` `<div>` → `<a href="#adim-N">` (4 adım). Copy AYNEN korundu.
- **Aktif-state CSS:** `a.tip-step.is-active .tn` domates daire + `box-shadow:0 0 0 4px tomato-tint` ring +
  etiket domates; hover affordance (daire domatesleşir). Bağlayıcı çizgi (`::before`) bozulmadı.
- **JS:** tıkla → `scrollIntoView({behavior:'smooth'})` + anlık `is-active` + `history.replaceState(#adim-N)`.
  **Scroll-spy:** scroll/resize'da header-altı 170px çizgisini en son geçmiş bölüm aktif (IIFE içine, mevcut
  page-spesifik script'e eklendi). Başarı durumunda (form gizli) spy pas geçer.

## KANIT (tıklama + scroll-spy probe, izole channel:chrome)
| Test | diyetisyen-ol | sef-ol |
|---|---|---|
| Yüklemede aktif adım | **0** (Adım 1) | **0** |
| Adım 3'e tıkla → scroll oldu mu | **evet** (scrollY 1527) | **evet** (1496) |
| → adim-3 viewport top | **128px** (header altı tam) | **128px** |
| → tıklanan adım aktif | **index 2** ✓ | **index 2** ✓ |
| → sticky panel hâlâ pinned | top **130** ✓ | top **130** ✓ |
| Scroll-spy: card4'e in → aktif | **index 3** ✓ | **index 3** ✓ |
| Scroll-spy: tepeye dön → aktif | **index 0** ✓ | **index 0** ✓ |
| 390 yatay taşma | **0** | **0** |
| 390 adımlar anchor(href) mı | **evet** | **evet** |
- SS: `fa-{diyetisyen-ol,sef-ol}-int-click3.png` (adım 3 aktif vurgu) + `-int-390.png`.
- Step copy taraması: "Diploma doğrulama / Ön görüşme / Profilin yayında / Değerlendirme / Formu doldur"
  hepsi yerinde — **panel copy değişmedi.** `git diff 3c63926` büyümesi yalnız JS+anchor+CSS+id (içerik 0).

## ✅ TUR 2 — HİBRİT (C) UYGULANDI (Beyar kararı)
Beyar kararı: panel İKİ işlevi de taşısın → süreç bilgisi GÖRÜNÜR kalsın + GERÇEK örtüşen bölüm-nav.
**frontend-design skill ile** tek kart / iki net-ayrı zone tasarlandı (rafine wayfinding, generic step-list değil):

- **ZONE 1 — interaktif "BÖLÜMLER" nav (üst, primary):** `.sn-nav`/`.sn-item` — 4 madde, etiketler
  **fc-head başlıklarıyla BİREBİR** (Kişisel Bilgiler / Mesleki·Uzmanlık / Belgeler·Deneyim / Profil·Sosyal).
  Numara rozeti (26px) + **ilerleme rayı** (geçilen bölümler domates dolar = `is-done`) + aktif satır
  (tint zemin + ring + domates etiket + ok) + hover. Tıkla→smooth scroll + scroll-spy BU nav'a bağlı.
  → "tıkladığım = gittiğim başlık" artık **tam örtüşür**.
- **ayraç** (`.tips-div` hairline).
- **ZONE 2 — PASİF "BAŞVURU SÜRECİ" süreç (alt):** `.proc-*` — mevcut copy AYNEN (Formu doldur →
  Değerlendirme/Diploma doğrulama → Ön görüşme → Profilin yayında). Görsel olarak HAFİF/muted: küçük
  20px noktalı timeline, ince çizgi, küçük puntolu muted metin → **tıklanmaz**, "başvuru sonrası ne olur"
  bilgisi. Nav'dan net ayrışır (boyut/renk/etiket farkı).
- Eski `.tip-step`/`.tips-head` dili kaldırıldı (0 orphan); panel ferah, iki sayfa tutarlı.

### Hibrit KANIT (izole channel:chrome)
| Test | diyetisyen-ol | sef-ol |
|---|---|---|
| Bölüm-nav etiketi ↔ hedef fc-head başlığı (4/4) | **bire bir** ✓ | **bire bir** ✓ |
| "Belgeler/Deneyim"e tıkla → ilgili karta in | adim-3 top **128** ✓ | **128** ✓ |
| → aktif idx | **2** ✓ | **2** ✓ |
| → ilerleme (is-done) | **[0,1]** ✓ | **[0,1]** ✓ |
| Sticky panel pinned | top **130** ✓ | **130** ✓ |
| Süreç adımları tıklanmaz (pasif) | DIV ✓ | DIV ✓ |
| Scroll-spy card4→/tepe→ | **3 / 0** ✓ | **3 / 0** ✓ |
| 390 yatay taşma | **0** | **0** |
- SS: `fa-{diyetisyen-ol,sef-ol}-hyb-panel.png` (iki-zone hiyerarşi net) + `-hyb-click3.png` + `-hyb-390.png`.
- `git diff 3c63926`: süreç copy değişmedi; eklenen = bölüm-nav + JS + CSS (numstat 133/44, 135/46).

---

## ⚠️ (TUR 1 notu — TUR 2'de ÇÖZÜLDÜ) TASARIM-GÖZÜ TESPİTİ
Panel adım ETİKETLERİ **süreç** odaklı (Formu doldur → Diploma doğrulama/Değerlendirme → Ön görüşme →
Profilin yayında); form bölümleri ise **içerik** odaklı (Kişisel / Mesleki·Uzmanlık / Belgeler·Deneyim /
Profil·Sosyal). Pozisyonel 1:1 eşleme (adım N → kart N) lead spec'iydi ve mekanik çalışıyor, AMA görselde
adım etiketi ile inilen kart başlığı ÖRTÜŞMÜYOR (örn. "Ön görüşme"e tıkla → "Belgeler & Görseller"e iner).
Beyar'ın canlıda yakalayabileceği türden. İki temiz seçenek (lead seçer):
- **(A) Mevcut (shipped):** süreç copy'si korunur, pozisyonel eşleme. Copy kuralına %100 uyumlu.
- **(B) Relabel:** 4 adım form bölüm adlarıyla yeniden adlandırılır (Kişisel / Mesleki / Belgeler / Profil
  …) → tam semantik örtüşme, gerçek bölüm-nav. Tek-edit, hazır; ama panel copy DEĞİŞİR (kural gereği
  lead/Beyar onayı ister). **Öneri: B** (lead spec'te bölüm adlarını saymıştı; one-page nav niyetine daha yakın).

## Bilinen Sınırlamalar (mini-fix eki — TUR 2 hibrit sonrası)
6. ~~Adım-etiketi ↔ bölüm-başlığı örtüşmemesi~~ → **ÇÖZÜLDÜ (hibrit C):** bölüm-nav etiketleri artık
   fc-head başlıklarıyla bire bir; süreç bilgisi ayrı pasif zone'da görünür kaldı.
7. **Mobilde panel formun ALTINDA** (`.ol-side` ≤1024 statik) — bölüm-nav mobilde yukarı-scroll yapar
   (mevcut layout davranışı; bu işte değişmedi). İşlevsel; mobilde nav daha çok "özet" değeri taşır.
8. **scroll-spy 170px çizgi** referansı masaüstü/mobil ortak; 4 bölüm de yeterince uzun, sapma yok.
   Başarı (form gizli) durumunda spy pas geçer (kasıtlı). İlerleme rayı (`is-done`) aktif bölüme kadar dolar.
9. **`overflow:clip` (Tur 1 sticky fix)** modern tarayıcı; çok eski tarayıcıda kural düşer → davranış
   mevcut hâle (kırık-sticky) döner, regresyon değil.
