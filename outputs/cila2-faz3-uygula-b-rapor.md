# CİLA-2 FAZ 3 — uygula-b Raporu (Set B kanon + kurumsal düzeltmeler)

> Teammate: uygula-b · Lead: team-lead · Tarih: 2026-06-12
> Kapsam: Görevler #7, #5, #8, #6, #4. Her iş kanıtlı (grep/numstat/SS/probe).
> SS'ler: `mockups/.ss-scratch/`. Probe HTML'leri aynı klasörde.

---

## #7 — Anasayfa "Günün Tarifi" → Keşfet sonrasına (v3a DIVERGENT, elle patch)

`.dayband` (Günün Tarifi) bloğu guide↔discover arasından ALINIP discover (Keşfet)
SONRASINA, chefs ÖNCESİNE taşındı. Script YOK, elle Edit.

- **Ritim düzeldi:** önceden guide(KOYU)→dayband(KOYU) iki ardışık koyu vardı; şimdi
  feat-sec(white)→guide(KOYU)→discover(cream)→dayband(KOYU)→chefs(white) — ardışık
  aynı-zemin YOK. Zemin class'larına dokunmaya gerek kalmadı.
- **Kanıt:** numstat 19/19 (net sıfır = salt taşıma); section sırası grep teyit;
  SS `.ss-scratch/dayband-region2.png` (Keşfet kartları → koyu "Fırında Tereyağlı
  Mantı/Günün Tarifi" bandı → "Tarifin ustaları"); 390 OVERFLOW=false; konsol temiz
  (taşınan blok JS'e bağlı değil).
- Handoff "Patron Bekleyenler #1" maddesinin çözümü.

## #5 — Hakkımızda "Yasal Metinler" redesign

**Kök sorun:** eski `.tips-card/.tips-steps/.tip-step/.tn` class'larının HİÇBİR CSS
kuralı yoktu → stilsiz düz dikey metin ("KVKK PolitikasıKişisel verilerin korunması."
bitişik). Patron haklıydı. (before: `.ss-scratch/kunye-before.png`)

**Çözüm (site dili + kanon):** Künye 2-kolon grid'in cramped 320px aside'ı kaldırıldı
→ künye-card tam genişlik; altına site kart diliyle (kunye-row ikon-chip + bridge-card
hover) yatay `.legal-card` grid. 9 belge: KVKK, Kullanım Koşulları, Gizlilik&Çerez,
Üyelik Sözleşmesi, Mesafeli Satış, Ödeme&Teslimat, İptal/İade, Aydınlatma,
**İhlal Bildir → yasal-v1.html?metin=bilgilendirme#b4 (#b4 hash KORUNDU)**.
Desktop 3-col / tablet 2-col / mobil 1-col.

- **Kanıt:** after SS `.ss-scratch/kunye-after.png` + mobil `.ss-scratch/legal-m500.png`;
  #b4 grep=2 (legal-card + footer); legal-card=9; eski tips-* markup=0; CSS yorum */
  tuzağı=0; 390 OVERFLOW=false; numstat 43/14; git diff -U0 silinen tek selektör
  `.kunye-grid` (aynı satır 1fr ile değişti, yutma yok).
- **Kanon:** hakkimizda hero = lst-top+lst-hero H1 koyu + beyaz rd-crumb → dokunulmadı, uyumlu.

## #8 — lg-gate yayılımı (mekan-detay, ansiklopedi-detay, mutfaga-giris-detay)

Üçünde de lg-gate MODAL altyapısı (shell mirası) vardı ama gerçek BAĞLAMA yoktu.

| sayfa | comment-gate | save-gate |
|---|---|---|
| mekan-detay | ✅ #revForm hide + rev-login | ✅ `#mdSave` ana + `.r-save` kartlar |
| ansiklopedi-detay | — (yorum formu yok) | ✅ `.r-save` kartlar |
| mutfaga-giris-detay | ✅ #revForm hide + rev-login | ✅ actbar `[data-act=save/done]` + `.r-save` |

> NOT: mutfaga-giris-detay'daki önceki `closest('.r-save')` lightbox EXCLUDE'uydu,
> gerçek save-gate değildi — eklendi.

**Pattern:** comment-gate = puf-detay'dan verbatim CSS (`.rev-login` + `body:not(.is-auth)
#revForm{display:none}` + rl-*) + rev-login markup #revForm sonrası; save-gate =
tarif-detay capture-phase intercept (logged-out→`window.__lgGate`, logged-in→normal).

- **Kanıt (gateprobe ?auth=0/1, computed-style + simüle tıklama):**
  - mekan auth0: revForm=none/revLogin=flex, #mdSave→gate.show=TRUE, .r-save→TRUE;
    auth1: revForm=flex/revLogin=none, #mdSave→FALSE
  - ansiklopedi auth0 .r-save→TRUE; auth1→FALSE
  - mutfaga auth0: revForm=none/revLogin=flex, actbar save→TRUE; auth1: tersi
  - lg-gate `</main>` SONRASI (mekan 1970>1964, ansik 1314>1308, mutfaga 1705>1699) — lessons stacking
  - 390 OVERFLOW=false ×3; CSS */ tuzağı=0; numstat additive +33/+10/+33 (silme 0)
  - GÖRSEL: `.ss-scratch/mekan-gate-crop.png` (açık modal) + `.ss-scratch/mutfaga-revlogin.png`
    (yorum giriş kapısı, yorum listesi altta açık — İA §5)

## #6 — "Şefler" + "Şef Ol" link hedefleri (+ YENİ sayfa sefler-v1)

Mevcut durum: footer "Şef Ol"→`#` (63 yer bozuk), "Şefler"→`mutfak-defteri-v1` (62 yer,
tek profil=liste değil). Header/drawer'da YOK (yalnız footer chrome). Lead onayı: yeni sayfa.

**KANONİK HEDEFLER:**
- "Şef Ol" → **tarif-ekle-v1.html** (sitenin kendi cevabı: hakkimizda bridge-card +
  anasayfa chef-cta "tarifini paylaş")
- "Şefler" → **sefler-v1.html** (YENİ — şef dizini)

**YENİ SAYFA sefler-v1.html:** _shell'den türetildi + diyetisyen-dizin H1 hero
(lst-top/lst-hero koyu-overlay) + rd-crumb (🏠 › Şefler) + chef-card dilinden `.sef-card`
dizin grid (12 şef, Onaylı Şef verify tick, uzmanlık/tarif/takipçi meta, takip toggle,
kart→mutfak-defteri) + uzmanlık filtre chip'leri (hero↔dizin senkron) + "Sen de Şef Ol"
→tarif-ekle CTA. **ENVANTER 69→70.**

- **Kanıt:** 1440 SS `.ss-scratch/sefler-top.png`; 390 OVERFLOW=false; auth=0→btn-login
  görünür/acct-wrap gizli, auth=1→tersi; filtre çalışıyor (12 kart→"et" 2 görünür);
  console_err=0; kanon: H1 koyu hero + beyaz rd-crumb + 18px nefes.

**Düzeltilen dosyalar (23):** `_shell.html` (kanonik footer) + anasayfa-portal-v3a
(chef-cta + "Tamamını Gör"→sefler + footer) + sefler-v1 + 20 Set B dosyam (footer pair).
Byte-mode perl (—CSD YOK, lessons); mojibake Å=0; bayt teyidi temiz. BONUS:
mutfak-defteri public breadcrumb "Şefler › Elif Şahin" (href=# idi) → sefler-v1.

**🔴 SWEEP HANDOFF (#17 qa):** site-geneli kalan **41 dosya** "Şef Ol"→#, **40 dosya**
"Şefler"→mutfak-defteri (shop ailesi dahil — footer taşıyor; panel hariç). #17 footer
sweep'i bu 2 linki yukarıdaki kanonik hedeflere çekmeli. Benim 23 dosyam zaten doğru
(idempotent, tekrar koşulması zararsız).

## #4 — Set B kanon doğrulama (22 sayfa)

Dört kanon kriteri (kılavuz §2f + §3): `.rd-crumb` TEK KANON · ≥16px header-altı nefes ·
overlay kuralı · krem-ortalı head YASAK.

| Sonuç | Sayfa(lar) |
|---|---|
| ✅ Tam uyumlu (doğrula+işaretle) | ansiklopedi-detay, diyet-listeleri, diyet-program-detay, mekan-detay, mekan-liste, mutfaga-giris, mutfaga-giris-detay, siparislerim |
| ✅ Crumb kanona ÇEKİLDİ (house-ikon + aria) | diyetisyen-dizin, diyetisyen-ol, giris, haftalik-menu, hakkimizda, iletisim, kesfet, onboarding, yasal |
| ✅ Muaf dil (pf-top profil — §2f) | diyetisyen-profil, mutfak-defteri |
| ✅ Crumb-muaf (landing/404) | anasayfa-portal-v3a, hata |

**Bulgular:**
- **Nefes:** TÜM Set B'de 18px (mekan-liste 34px) → hepsi ≥16 ✓. (İlk ölçümdeki "0"
  artefakttı — crumb iç padding'i element border-box'a dahil; doğru ölçüm ilk içerik
  satırının rect.top'ı.)
- **krem-ortalı head:** YOK — hepsi sol-hizalı (head_textAlign=start). giris/siparislerim
  krem zeminli ama SOL-hizalı (H3 kompakt, kanon-uyumlu; YASAK olan krem+ORTALI).
- **Crumb kanona çekme:** 9 sayfa metin "Anasayfa/Ana Sayfa" + `aria-label="breadcrumb"`
  kullanıyordu → kanonik `<a><i fa-house></a>` + `aria-label="Sayfa yolu"` (§2f markup).
  Render teyidi: `.ss-scratch/dzdizin-crumb-c.png` (koyu hero'da açık house-ikon temiz).
  numstat 4/4 ×9; 390 OVERFLOW=false ×9; nefes 18px korundu.

**🔴 KANON-TAKIMI'na FLAG (SET A — benim değil):** crumb ilk öğesi site-geneli KARIŞIK
(41 house-ikon vs 15 metin-form). 15'in 9'u Set B (yukarıda çekildi), **6'sı SET A**:
`tarif-detay, tarif-bulucu, bugun-ne-pisirsem, bildirimler, reklam-ver, hesabim`. §2f
literal house-ikon diyor; kanon-takımı bunları kanona çekmeli (Set A↔Set B simetrisi için).

## #4/#6 FOLLOW-UP (lead gecikmeli gereksinimleri)

- **H1 nefes patch (128/74):** hakkimizda, mutfaga-giris, diyetisyen-dizin, **sefler-v1**
  → `.lst-top` padding-top 112→128, mobil 62→74. mekan-liste DOKUNULMADI (zaten 128/74).
  Kanıt: 4'ünde de nefes 18→**34px** (mekan-liste ile birebir); 390 OVERFLOW=false.
- **2 ölü CTA (mutfak-defteri boş-durum):** 'Püf Noktası Ekle'→puf-noktasi-ekle-v1.html ·
  'İlk Menünü Oluştur'→bugun-ne-pisirsem-v1.html. Kalan empty-state href=# = 0.
- **frontend-design skill** çağrıldı (zorunluymuş): sefler-v1 + legal-card değerlendirildi.
  Sonuç — ikisi de 70-sayfa kilitli sistemle uyumlu, generic DEĞİL. Skill'in "bold
  reinvention"ı burada tutarlılığı bozardı (lessons: site-içi > dış referans). Somut rafine:
  sefler-v1 sef-card'a **avatar hover ring** (chef-card imza etkileşimi) eklendi.
  SS: `.ss-scratch/sefler-final-top.png` + `.ss-scratch/sefler-m500-top.png` (mobil 2-col).

## #19 — Anasayfa "Dada Store" dropdown tutarsızlığı (v3a DIVERGENT, elle patch)

Düz `<a>Dada Store</a>` → _shell'den VERBATIM chevron+dropdown (Pişirme Gereçleri / Sofra
& Sunum / Baharat & Gıda / Küçük Ev Aletleri, 4× urun-liste). diff: _shell ile BİREBİR EŞİT.
Drawer d-sub DOKUNULMADI.

- **Kanıt:** header SS `.ss-scratch/anasayfa-nav-final-c.png` ("Dada Store ⌄" chevron'lu,
  Sağlık⌄ ile tutarlı); yapısal probe chevron=true + 4 link + default opacity=0 + console=0;
  numstat saf +8; 390 OVERFLOW=false.

## #22 — tarif-bulucu giriş navigasyonu (envanter → strateji → uygula)

**ADIM 1 ENVANTER:** tarif-bulucu-v1 NEREDEYSE YETİM — sadece 3 gömülü giriş:
anasayfa catstrip `btn-primary` (iyi), haftalik-menu ghost btn, kesfet hamsi-makalesi
inline metin linki ("israfı azaltma" — navigasyon değil). **Primary nav/chrome'da
HİÇBİR yerde yok** → 55+ sayfadan ulaşılamaz.

**ADIM 2 STRATEJİ (kararım):** (a) Tarifler mega'sına "Tarif Bulucu" CTA = site-geneli
chrome (her sayfadan erişim) + (c) tarif-liste giriş köprüsü (bağlamsal). (b) atlandı —
anasayfa zaten belirgin butona sahip + (a) onu da kapsıyor.

**ADIM 3 UYGULA:**
- **(a) Mega CTA — site-geneli sweep:** `.mega-find` CTA mega-feat kolonuna (Haftanın
  Tarifi görselinin altına; tomato-tint kart, beyaz sepet ikonu, "Dolabındakilerle ne
  pişersin?"). _shell (kanonik elle) + **55 sweep** (idempotent python: span-guard anchor==1
  + delta-guard 1100<Δ<1500 → CSS-yutma imkansız) + **anasayfa-v3a elle** (DIVERGENT) =
  **57 sayfa**. ATLANAN: ansiklopedi-v1 (#21 aktif), tarif-detay-v1-headA (artefakt),
  shop 5 + panel 7 (mega yok). Script: `outputs/sweep_megafind.py`.
- **(c) tarif-liste köprüsü** (LEAD GRANT — yalnız `.lst-bridge` bloğu, hero/facet'e
  dokunulmadı): fchips↔grid arası gradient banner ("Ne pişireceğine karar veremedin mi?").
- **frontend-design:** mega CTA + bridge tomato-tint→tomato hover, beyaz ikon kare,
  gradient banner — düz değil, sistemle uyumlu distinctive.

**KANIT:** idempotent re-run 55→55 skip · CSS+markup eşleşme 56/56 (orphan 0) ·
CSSOM probe 3 aile (kategori/giris/saglik-hub) `.mega-find` bg=tomato-tint (YUTULMADI) ·
sızıntı shop/panel=0 · REACH: 5 giriş noktası → tarif-bulucu-v1.html (mega ×57 +
tarif-liste bridge + anasayfa catstrip) · console_err=0 ×4 · 390 OVERFLOW=false ×3 ·
numstat net-negatifleri BAŞKA ajan işleri (bugun-ne-pisirsem/puf-ekle=#10 ölü-CSS;
ansiklopedi=#21; reklam-ver=#16) — benim sweep'im delta-guard'lı saf-ekleme.
SS: `.ss-scratch/mega-find-c.png` + `.ss-scratch/tarifliste-bridge-c.png`.

---

## #25 — sefler-v1 390 yatay taşma (qa bulgusu) DÜZELTİLDİ

**Kök neden (2 katmanlı):** (1) sefler-v1 oluştururken diyetisyen-dizin'in ≤640
`.lh-chips{...min-width:0}` kuralındaki **`min-width:0` atlanmış** → flex child min-width:auto
ile içerik genişliğine şişti. (2) ≤1024 `.lst-hero{grid-template-columns:1fr}` —
**`1fr`=`minmax(auto,1fr)` min-width:auto track'i geniş içeriğe şişiriyor** (kılavuz §2e
GRID KURALI'nın public sayfa karşılığı). Geniş içerik (uzun stat etiketleri "48.200+
Paylaşılan tarif") + min-width:auto → lst-hero div'i 432px, h1/lead/lst-stats hepsi 42px taştı.

**Düzeltme:** `.lh-chips{...min-width:0}` + `.lst-stats{min-width:0} .st{flex:1;min-width:0}
span{overflow-wrap:anywhere}` + `.lst-hero{grid-template-columns:minmax(0,1fr)}` (≤1024).
**Kanıt:** öncesi lst-top scrollW=432 → sonrası 375; tüm konteynerler right≤359 (390 içinde);
OVERFLOW=false auth=0 VE auth=1; chip'ler iç-scroll (lh-chips scrollW=416 ama container 359).
SS: `.ss-scratch/sefler-m-fixed-c.png`. Kardeş sayfalar (diyetisyen-dizin, mekan-liste) AYNI
`1fr`'ye sahip ama lh-chips'lerinde min-width:0 OLDUĞU için taşmıyor (probe: right=359, temiz) —
fix gerekmedi.

**🔴 ÖNERİLEN DERS (lessons.md):** (1) lst-hero/grid kolonları public sayfalarda da HEP
`minmax(0,1fr)` (kılavuz §2e kuralı yalnız panele değil, lst-hero'ya da uygulanır).
(2) **390 taşma probe'u document.scrollWidth'e GÜVENİLMEZ** — clipped taşma (içerik taşar ama
scroll alanını uzatmaz) scrollWidth'te GÖRÜNMEZ; benim scrollWidth-tabanlı probe390'ım FALSE-PASS
verdi, qa'nın element-rect probe'u yakaladı. Probe element rect.right>viewport ölçmeli.

## #23 — dz-card "Profili Gör" butonu sadeleştirme

**KARAR (b — minimal metin-link), gerekçe:** Kart zaten tamamen tıklanabilir
(`<article onclick>`), kocaman tam-genişlik bordered buton REDUNDANT + price ile görsel
yarışıyordu. (a) tam kaldırma foot'u yalnız price'la bırakıp affordance kaybettiriyordu;
**(b)** "kocaman buton"u kaldırır AMA ince ortalı "Profili Gör →" metin-link bırakır →
keşfedilebilirlik + dz-card v2 ORTALI SİMETRİ korunur. frontend-design: az gürültü, net hiyerarşi.

**Değişim (yalnız CSS, markup/9 span aynı):** `.dz-go` border+bg+full-width buton →
`inline-flex` ortalı tomato metin-link; `.dz-foot` `align-items:stretch`→`center`, gap 12→9.
**Kanıt:** SS `.ss-scratch/dzcard-after-c.png` (buton→link, ₺750 price duruyor, ortalı simetri);
9 kart onclick→diyetisyen-profil KORUNDU; dz-price 9 KORUNDU; dz-go 9 SPAN (border-buton CSS=0
→ ÇİFT TAB-STOP YOK; span hiç focusable değildi, klavye yapısı değişmedi); console=0; 390 false.
NOT: kart `onclick`-tabanlı (article, link değil) — klavye-focus PRE-EXISTING desen, #23 onu
ne kötüleştirdi ne değiştirdi (yalnız dz-go görünümü). dz-go ayrıca kesfet + dyt-profil-ayar'da
da var (kendi CSS kopyaları) — task diyetisyen-dizin'e scope'lu, onlara DOKUNULMADI.

## Bilinen Sınırlamalar

1. **Şefler/Şef Ol site-geneli yayılım YARIM:** Yalnız benim 23 dosyam + _shell doğru
   hedefe bağlı. **41 dosya (shop ailesi + sahibim-olmayan Set A) hâlâ footer'da
   "Şef Ol"→# ve "Şefler"→mutfak-defteri** — bunlar #17 qa footer sweep'inde
   düzeltilecek. Beyar şu an o sayfaların footer'ından "Şef Ol"a tıklarsa hiçbir yere
   gitmez, "Şefler"e tıklarsa tek profile gider. Sweep sonrası düzelir.
2. **SET A 6 metin-form crumb** (yukarıda flag) henüz house-ikona çekilmedi — kanon-takımı
   kararına bağlı. Şu an Set B (house-ikon) ile Set A (6 metin) crumb ilk-öğesi asimetrik.
3. **sefler-v1 envantere YENİ eklendi (69→70)** — handoff/sentez envanter sayısı
   güncellenmeli; faz-sonu responsive süpürmesine (#12) dahil edilmeli.
4. **siparislerim VERIFY-ONLY:** dokunulmadı (footer dahil); footer fix'i #17 sweep'e
   bırakıldı.
5. SS'ler headless Chrome (min 500px) ile alındı; 390 doğrulaması iframe/JS probe ile
   (kılavuz §4). Playwright qa ajanında kilitliydi.
6. **#19 açık-dropdown SS'i headless'ta yakalanamadı:** headless `:hover` simüle edemiyor;
   force-open denemelerinde panel render quirk'i. Çalışan Sağlık dropdown'ı da AYNI yöntemle
   görünmedi → ikisi headless force altında birebir → Dada Store yapısal olarak Sağlık'a denk,
   gerçek tarayıcı hover'ında açılır. Beyar canlı hover ile teyit edebilir.
7. **#4 SET A crumb simetri:** flag'lediğim 6 SET A metin-form sayfası kanon-takımına devredildi
   (#18 — kapandı). Set B tarafım %100 house-ikon.
8. **#22 ansiklopedi-v1 mega-find HÂLÂ ATLANDI** — #21 kapandı AMA #26 (kanon, "Ansiklopedi
   Katman-1 gerçek Sözlük kategorileri") aynı dosyada PENDING. Eşzamanlı-edit riski nedeniyle
   #26 de kapanana kadar ertelendi. #26 bitince `outputs/sweep_megafind.py`'de EXCLUDE'dan
   `ansiklopedi-v1.html`'i çıkarıp re-run et (idempotent, yalnız header mega'ya ekler — #26'nın
   içerik işiyle çakışmaz). Şu an ansiklopedi-v1 header'ından tarif-bulucu erişimi YOK.
9. **#22 sweep ↔ qa #12 eşzamanlılık:** mega-find sweep'i qa #12 (final responsive süpürme)
   in_progress iken koştu. Sweep saf-ekleme + idempotent → çakışma beklenmiyor; #12'nin
   düzelttiği dosyalar varsa re-run zararsız. (Lead'e bildirildi.)
