# CİLA-2 FAZ 3 — QA + Reklam Senaryosu Raporu

> Teammate: **qa** (team cila2-faz3). Lead: team-lead.
> Server: http://localhost:8765 · SS'ler: `mockups/.ss-scratch/qa/`
> Güncelleme: 2026-06-12

---

## Görev #9 — Reklam Yerleşim Senaryosu + reklam-ver "Yerleşimler" bölümü ✅

`reklam-ver-v1.html` sayfasına yeni **"Yerleşimler"** bölümü (`#yerlesimler`)
eklendi — "Reklam Alanları" ile "Sponsorluk Paketleri" arasına. Bölüm,
her reklam formatının sitede **hangi sayfada / nerede** yaşadığını ve
**neden işe yaradığını** (satış argümanı + mock metrik) gösterir. Kullanıcı
yolculuğu 3 aşamaya bölündü: **Keşif → Niyet → Dönüşüm & Erişim**.

Hero chip rayına `Yerleşimler` linki eklendi (#yerlesimler anchor'ı çalışıyor).

### Yerleşim Matrisi (format → konum → satış argümanı)

| # | Format | Yerleştiği Sayfa / Konum | Aşama | Satış Argümanı | Mock Metrikler |
|---|--------|--------------------------|-------|----------------|----------------|
| 1 | **Masthead** 970×250 | Anasayfa · header altı (ilk blok) | Keşif | Günün en yüksek tekil erişimli alanı; marka bilinirliği & lansman | 1.9M gösterim · %0,68 CTR · %84 viewability |
| 2 | **Leaderboard** 728×90 | Kategori & tarif liste · içerik üstü şerit | Keşif | Kategori-bazlı hedefleme (Tatlılar→fırın markası) | 1.4M gösterim · %0,52 CTR · 6 hedef kategori |
| 3 | **Native / Liste Arası Kart** | Tarif liste grid'i · 6. kart | Keşif | Banner körlüğüne takılmaz; organik kart diliyle yüksek etkileşim | 720K gösterim · %1,9 etkileşim · +38sn kalış |
| 4 | **MPU / Kare** 300×250 | Tarif detay · malzeme listesi yanı (sticky) | Niyet | Pişirme niyeti zirvede; malzeme markası için bağlamsal | 980K gösterim · %0,9 CTR · 4:10 sayfa süresi |
| 5 | **Niyet-Bazlı Native** | Tarif Bulucu / Bugün Ne Pişirsem sonucu | Niyet | "Elimde X var"→ürün eşleştirme; alt-huni performans | 240K gösterim · %2,4 tıklama · %31 shop'a geçiş |
| 6 | **Video Pre-roll** 6sn | Video Mutfağı · oynatma öncesi | Niyet | Tam ekran sesli bölünmemiş dikkat; marka hikâyesi | 310K gösterim · %71 tamamlanma · %96 sesli |
| 7 | **Mobil Sticky** 320×100 | Tüm sayfalar · mobil alt kenar | Dönüşüm | En geniş erişim, sürekli görünür, kapatılabilir (UX dostu) | 5.1M gösterim · %0,8 CTR · %68 mobil pay |
| 8 | **Shop Native** | DadaStore liste + alışveriş listesi "önerilen" | Dönüşüm | Satın alma anına en yakın; CPA/performans uyumlu | 180K gösterim · %3,1 sepete ekleme · %1,4 satış |
| 9 | **Half Page** 300×600 | Ansiklopedi / sözlük / rehber · sticky yan sütun | Dönüşüm | Uzun okuma = yüksek marka kalıcılığı (retention) | 420K gösterim · 2:50 ekranda kalma · %79 viewability |

> **Tüm rakamlar MOCK** — gerçekçi ölçekte temsilî örnekler. Sayfadaki
> `.yer-note` satırı bunu açıkça belirtir; gerçek envanter/fiyat medya kitine
> bırakıldı (zaten "Teklif İste" akışı korunuyor, patron kararı m29/m4).

### Tasarım dili uyumu
- Her kartta mini **wireframe** (nokta-ızgara zemin + soluk içerik blokları +
  dashed-tomato vurgulu reklam yuvası) — slotun sayfadaki gerçek konumunu
  gösterir (üst/yan/alt/inline/video). `<img>` YOK, saf CSS kutu dili.
- Token radius; **pill yok**; FontAwesome kilitli set (`fa-map-location-dot`,
  `fa-location-dot`, `fa-play`, `fa-circle-info`). Zemin ritmi: `--bg-cream`
  (Display beyaz ↔ Yerleşim krem ↔ Paketler krem... alternasyon korundu).
- Metrik üçlüsü mevcut `.statband .st` diliyle hizalı; `.yer-fmt` etiketleri
  `.ad-tag` ile aynı radius-sm tag dili.

### Doğrulama (kanıt)
- **1440px:** 3 aşama, 9 kart düzgün render · konsol **0 hata/uyarı**.
  SS: `reklam-yerlesim-1440-top.png`, `reklam-yerlesim-1440-mid.png`
- **500px (≤640 kırılımı):** tek kolon, taşma yok (scrollW=clientW=500).
  SS: `reklam-yerlesim-500-mobile.png`
- **390px (iframe probe, §4):** scrollW=clientW=390, **overflow yok**,
  viewport'tan geniş eleman **0**.

### Karar / kapsam notu
- Görev "gerekirse 1-2 sayfada örnek reklam slotu mockla" diyordu. **Canlı slot
  mockup'ı eklenMEDİ** — hedef sayfaların tamamı (anasayfa, tarif-detay,
  tarif-liste) kanon uygulama setlerinde (SET A/B, başkasının sahipliği) ve
  wireframe kartları yerleşimi zaten net gösteriyor. Lead onayı + kanon
  uygulaması bittikten sonra istenirse ayrı mini-iş olarak eklenebilir
  (bkz. Bilinen Sınırlamalar).

---

## Görev #10 — BNP + puf-ekle ölü wizard CSS temizliği ✅

İki sayfada ölü sihirbaz (stepper/wiz-*) CSS'i, **kanıtlı sıfır-kullanım**
sonrası temizlendi. Yöntem: (1) statik grep + (2) JS-emitted class taraması +
(3) **canlı querySelectorAll probe — yalnız ilk yük değil, etkileşimli durumda
da** (BNP menü detayı açıkken, puf-ekle form yüklü). Sadece her durumda 0
eşleşen selektörler silindi; silme öncesi/sonrası SS karşılaştırıldı.

### bugun-ne-pisirsem-v1.html — **68 satır silindi, 0 eklendi**
Faz 1'de sihirbazsız (mod→menü→koleksiyon) yapıya geçti; canlı yapı
`.mode-bar/.menu-grid/.hm-card/.menu-detail/.menu-set/mc-*`. Silinen ölü
wizard aileleri (load + menü-detay durumunda hepsi 0):
`.stepper .stp .stp-num .stp-lbl .stp-line` (+`.active/.done` türevleri) ·
`.bnp-top .stepper` · `.wstep .wstep.active` · `.wiz-solo` ·
`.form-card .fc-head .fc-step` · `.wiz-summary .ws-lbl .ws-chip .ws-cat` ·
`.wf-restart` · `.wiz-foot .wf-note .wf-actions` + bunların ≤640 responsive
karşılıkları.
**KORUNAN (canlı, silinmedi):** `.r-chip` (mega menü), `.r-save`×4,
`.m-types`/`.mt`×4 (menü-kartı medya rozeti), `.re-ico` (ml-empty).
> Kapsam dışı bırakılan: `.pick*`, `.res-*`, `.r-card` alt-aile de ölü ama
> görevin parantez kapsamı (".stepper/.wiz-* türevleri") DIŞINDA + canlı
> `.r-chip/.r-save/.m-types` ile **iç içe geçmiş** → riski lead'e bırakmak
> üzere DOKUNULMADI (bkz. Bilinen Sınırlamalar).

### puf-noktasi-ekle-v1.html — **34 satır silindi, 0 eklendi**
Bu sayfa hâlâ tek-adım **form** (form-card/fc-head/wiz-foot CANLI); yalnız
**stepper göstergesi** öldü. Silinen (load'da 0):
`.stepper .stp .stp-num .stp-lbl .stp-line` (+türevleri) · `.wstep
.wstep.active` · `.wiz-solo` · `.wiz-foot .wf-actions` (compound, wf-actions=0)
+ ≤640 responsive stepper/wf-actions kuralları.
**KORUNAN (canlı):** `.wiz-grid/.wiz-main/.form-card/.fc-head/.fc-step/
.wiz-foot/.wf-note`.

### Kanıt (önce/sonra)
| Sayfa | numstat | eklenen satır | 1440 SS | 500 SS | konsol | etkileşim |
|-------|---------|---------------|---------|--------|--------|-----------|
| BNP | 0/68 | 0 | **bit-aynı** (cmp) | **bit-aynı** (cmp) | 0 hata | menü detayı açılıyor, m-types/r-save canlı |
| puf-ekle | 0/34 | 0 | **bit-aynı** (cmp) | 51px AA gürültüsü* | 0 hata | form canlı |

> *puf-ekle 500px: 1.987.500 pikselin 51'i (%0,003) farklı, max kanal farkı
> 38/765 — dağınık 27 satırda 1-2px anti-aliasing titremesi (ayrı capture
> oturumları arası glyph hinting), **layout kayması DEĞİL** (kayma olsa
> değişiklik altındaki HER satır farklı çıkardı). İki ardışık AFTER capture'ı
> birbiriyle bit-aynı (deterministik).
> SS'ler: `bnp-{BEFORE,AFTER}-{1440,500}.png`, `puf-{BEFORE,AFTER}-{1440,500}.png`

---

## Görev #11 — Site geneli link probe (tıklama yolculuğu) ✅

**Yöntem:** 69 üretim sayfasında (a) tüm `href`/`location.href` `.html`
hedeflerinin dosya-sistemi 404 çözümü, (b) tüm `href="#"` anchor'larının
imza-bazlı sınıflandırması (1055 anchor → 167 imza), (c) "bir sayfada `#`
ama kanonik (61) sayfada gerçek hedef" diff'i, (d) `.btn/.see-all/.pc-link`
ölü-CTA taraması (onclick/handler'sız), (e) canlı dropdown açılış spot-check
(Playwright `?dd=1`).

### Bulgu A — 404 iç hedef: **YOK** ✓
Tüm iç `.html` link hedefleri mevcut dosyalara çözülüyor (0 kırık).

### Bulgu B — Footer link kablolama boşluğu (8 sayfa + `_shell.html`)
61 sayfada footer **tam kablolu** (Hakkımızda→hakkimizda-v1, Künye→
hakkimizda-v1#kunye, S.S.S.→sss-v1, Bize Ulaşın→iletisim-v1, Reklam/Sponsorlar
→reklam-ver-v1, İptal/Ödeme/Mesafeli/Gizlilik/Üyelik/Kullanım→yasal-v1?metin=X).
Ama **8 sayfa + `_shell.html`** bu **12 footer linkini `href="#"`** tutuyor —
kablolama rollout'u bu sayfaları atlamış (footer-only, diğer her şey aynı).

| Sayfa | Durum | Kim |
|-------|-------|-----|
| **puf-noktasi-ekle-v1** | ✅ 12 link kanonik hedeflere bağlandı | **qa (ben — free zone)** |
| ansiklopedi-v1 | ⏳ devredildi | lead/sweep |
| ansiklopedi-detay-v1 | ⏳ devredildi | lead/sweep |
| mekan-detay-v1 | ⏳ devredildi | lead/sweep |
| mekan-liste-v1 | ⏳ devredildi | lead/sweep |
| mutfaga-giris-detay-v1 | ⏳ devredildi | lead/sweep |
| puf-noktasi-detay-v1 | ⏳ devredildi | lead/sweep |
| test-detay-v1 | ⏳ devredildi | lead/sweep |
| **`_shell.html`** | ⏳ devredildi (KANON kaynağı — güncellenmezse yeni sayfa stale doğar) | lead |

> Her sayfada **aynı 12 link** (idempotent sweep'e uygun). Kanonik eşleme:
> Hakkımızda→`hakkimizda-v1.html` · Künye→`hakkimizda-v1.html#kunye` ·
> S.S.S.→`sss-v1.html` · Bize Ulaşın→`iletisim-v1.html` · Reklam Vermek İçin
> & Sponsorlar ve Partnerler→`reklam-ver-v1.html` · İptal→`yasal-v1.html?metin=iade`
> · Ödeme→`...=teslimat` · Mesafeli→`...=mesafeli` · Gizlilik→`...=cerez` ·
> Üyelik→`...=uyelik` · Kullanım→`...=kullanim`. (Öneri ve Şikayet `href="#"`
> + onclick fbTab → KALIR, kanonik; Şef Ol `#` → Bulgu D.)

### Bulgu C — Ölü CTA'lar (hedef sayfa VAR, handler yok) → tümü devredildi
| Sayfa | Eleman | Mevcut | Olması gereken | Devir |
|-------|--------|--------|----------------|-------|
| saglik-hub-v1 | `Diyetisyen Bul` (btn-green) | `#` | diyetisyen-dizin-v1.html | lead/owner |
| mutfak-defteri-v1 | `Püf Noktası Ekle` (boş durum) | `#` | puf-noktasi-ekle-v1.html | lead/owner |
| mutfak-defteri-v1 | `İlk Menünü Oluştur` (boş durum) | `#` | bugun-ne-pisirsem-v1.html | lead/owner |
| tarif-detay-v1 | `Mutfak Defteri` (btn-ghost) | `#` | mutfak-defteri-v1.html | lead/owner |
| tarif-detay-v1 | `Store'a Git` (see-all) | `#` | dada-shop-v1.html | lead/owner |
| tarif-detay-v1 | `Listeyi Gör` (ls-link) | `#` | alisveris-listesi-v1.html | lead/owner |
| tarif-detay-v1 | `Tamamını Gör` (see-all, benzer tarifler) | `#` | tarif-liste-v1.html? (owner karar) | lead/owner |

> Hiçbiri benim free zone'umda değil → DOKUNULMADI, raporlandı.

### Bulgu D — Şefler / Şef Ol (uygula-b görev #6) → devredildi
- `Şef Ol` (header + footer, site-geneli) `href="#"` → patron/uygula-b kararı
- mutfak-defteri-v1 `Şefler` `href="#"` → uygula-b #6
- anasayfa `Sen de Şef Ol` (chef-cta) `href="#"` → uygula-b/patron

### Intentional placeholder (BUG DEĞİL — belgelenmiş patron-bekleyen / mock)
- `İndir App Store / Google Play` (store-badge/app-store) → patron m3 (mobil app
  landing) bekliyor
- video-mutfagi `Seriyi Aç`×3 / `Tüm Seriler` / `Tümünü İzle` → patron m13
  (video ray modeli) bekliyor
- Load-more (`Daha Fazla Tarif Yükle`, `Diğer Koleksiyonlar`, `Tüm Rozetler`),
  `Testi Tekrarla` (resRetry id, JS reset), mock veri öğeleri (kategori
  sayıları, coldex koleksiyon, diyetisyen kartları, paylaş butonları, hashtag
  çipleri, puf-card demo) → bilinçli mock, hedef sayfa yok

### Dropdown / mega menü
Spot-check (`puf-noktasi-ekle-v1?dd=1`): 4 dropdown + mega menü mevcut, açılış
mekanizması (CSS hover/.open) çalışıyor, konsol 0. Ortak chrome → 61 sayfada
aynı (faz 1/2 sweep'lerinde doğrulanmıştı).

### qa düzeltmesi (kanıt)
- **puf-noktasi-ekle-v1**: 12 footer link kanonik hedeflere bağlandı
  (git diff: 12+/12- footer + önceki wizard temizliği). Canlı doğrulama: 6
  örnek link gerçek sayfaya çözülüyor, konsol 0 hata.

---

## Görev #17 — Footer kablolama sweep'i ⏳ (HAZIR — #18 bekliyor)

#11 bulgusu + uygula-b #6 handoff'u — **İKİ İŞ TEK İDEMPOTENT SWEEP** (lead
genişletti). Analiz (read-only) tamam:
- **(A) 12 legal/hızlı link** — yalnız 8 dosyada footer `href="#"`:
  ansiklopedi-v1, ansiklopedi-detay-v1, mekan-detay-v1, mekan-liste-v1,
  mutfaga-giris-detay-v1, puf-noktasi-detay-v1, test-detay-v1, `_shell.html`.
  Kanonik eşleme (Hakkımızda→hakkimizda-v1 … Kullanım→yasal-v1?metin=kullanim).
- **(B) Şef linkleri** — uygula-b #6 22 dosyayı kabloladı, **40 dosya** kaldı:
  `<a href="#">Şef Ol</a>` → `tarif-ekle-v1.html` (40 dosya) +
  `<a href="mutfak-defteri-v1.html">Şefler</a>` → `sefler-v1.html` (40 dosya;
  eski hedef mutfak-defteri → yeni kanon sefler-v1). Shop ailesi DAHİL (dada-shop,
  urun-*, sepet, odeme, siparislerim — salt href). **Panel ailesi (8 footersız:
  dyt-* + hesaplayici + panel-shell) doğal olarak HARİÇ.**
- `sefler-v1.html` mevcut (uygula-b #6, 105KB).
- **Script hazır** (`.ss-scratch/qa/footer-sweep.py`): footer-scoped + span-guard
  <8000 + footer-DIŞI byte-aynı + idempotent (zaten-kablolu atlanır) + byte-mode
  (Python utf-8, perl -CSD YASAK — lessons L74).
### ✅ KOŞULDU — sonuç (#18→#20→#17 zinciri açıldıktan sonra)
**45 dosya değişti** (8 legal × 12 link; 40 dosya × Şef Ol+Şefler; örtüşenler 14).
- **Şef Ol** `#`→`tarif-ekle-v1.html`: 40 dosya
- **Şefler** `mutfak-defteri-v1.html`→`sefler-v1.html`: 40 dosya
- **12 legal/hızlı link** (8 dosya): kanonik hedefe bağlandı

**Doğrulama battery (hepsi GEÇTİ):**
| Kontrol | Sonuç |
|---------|-------|
| Negatif grep: footer Şef Ol→`#` | **0** ✓ |
| Negatif grep: footer Şefler→mutfak-defteri | **0** ✓ |
| Negatif grep: 8 dosyada legal→`#` | **0** ✓ |
| Öneri ve Şikayet onclick korundu | 63 dosya ✓ (kanonik, dokunulmadı) |
| Mojibake grep (`Å` double-encode imzası) | **0** dosya ✓ (byte-mode Python utf-8) |
| href-only kanıtı (pure-sweep dosya diff) | sozluk/arama/dada-shop = **yalnız 2 Şef href satırı** ✓ |
| Shop ailesi salt-href (dada-shop diff) | yalnız href, hero/görsel dile DOKUNULMADI ✓ |

**Render SS (3 aile):**
- **Shop (dada-shop-v1):** footer 1440 SS — tüm linkler render, görsel sağlam
  (`footer-shop-dada-bottom-1440.png`).
- **Set A (ansiklopedi-v1):** DOM-verified — 8 örnek footer link doğru hedefe
  çözülüyor (Şef Ol→tarif-ekle, Şefler→sefler-v1, legal→gerçek sayfa), konsol 0.
- **Yeni sefler-v1:** yükleniyor (200, başlık "Şefler", footer mevcut), konsol 0
  — "Şefler" linklerinin hedefi geçerli.

> numstat not: `git diff mockups/*.html` net +785/-454 gösteriyor ama bu **tüm
> takımın commit'siz işini** kapsıyor (benim #9 Yerleşimler +300, kanon hero/crumb/
> redesign vb.) — sweep'imin katkısı pure-sweep dosya diff'iyle **href-only**
> kanıtlandı + script footer-DIŞI byte-aynı assertion'ı geçti.

## Görev #12 — Final responsive süpürme ⏳ (HAZIR — #3/#4 bekliyor)

69 sayfa × `?auth=1/0` × 390px. **BLOKLU** (#3, #4 — eski hero ölçmemek için
kanon uygulaması beklenir). Hazırlık tamam:
- **Altyapı kararı:** Chrome 149 headless `--dump-dom`'u KALDIRMIŞ (eski
  `.ss-scratch/cila/sweep.py` CLI 0 byte döndürüyor — ölü). #12 **Playwright
  iframe-batch probe** ile koşulacak (reklam-ver 390 probe'unda kanıtlandı).
- **Probe mantığı hazır** (`.ss-scratch/qa/sweep-resp.py` referans): 390 iframe +
  **auth=1/0 izolasyonu** (auth `dm_auth` localStorage'tan okunur → her ölçüm
  izole) + **§3b bottom-pinned dedektörü** (fixed + alt-140px bandı + genişlik
  ≥%50vw + yükseklik ≤260 [çok-satır çerez serbest] + ekran-altı `bn-hidden`
  hariç) + çerez 700ms → ≥1600ms bekleme.
### ✅ KOŞULDU — sonuç (70 sayfa × auth=1/0 × 390px = 140 ölçüm)

**Probe altyapısı (Chrome 149 CLI ölü → Playwright iframe-batch) + İKİ PROBE-DEBUG:**
1. **Offscreen iframe timer-throttle:** `left:-9999px` iframe'de çerez 700ms
   timer'ı throttle olup tutarsız sonuç verdi → iframe'i GÖRÜNÜR yaptım (`fixed
   left:0 top:0`), throttle bitti.
2. **Tall-iframe transition-throttle:** 2600px iframe'in alt bölgesi host
   viewport'unun altında kalınca CSS transition'lar settle olmadı → geometrik
   katman tespiti yanıltıcı. Çözüm: §3b'yi **class-based** ölç (çerez `.show` ⇒
   nav `.bn-hidden` olmalı), transform/geometriye GÜVENME. Overflow geometrik
   (scrollWidth) güvenilir kaldı.

**Sonuç:**
| Kontrol | Sonuç |
|---------|-------|
| 390 yatay taşma | **1 sayfa: sefler-v1 (sw=432, ~42px taşma)** — diğer 69 temiz |
| §3b çift sabit-alt-katman | **0 ihlal** (çerez zorlandı `cc=1`; tüm sayfalar nav'ı `bn-hidden` yapıyor; panel/hesaplayıcı muaf) |
| ?auth=1/0 | auth doğru toggle (shop/panel/hesaplayıcı muaf — tek durum) |
| Konsol hatası | **0 gerçek hata** (host favicon 404 + Chrome verbose a11y advisory'leri hariç) |
| BNP mod rayı focus-ring (#20) | **DOĞRU** — klavye Tab → `:focus-visible` aktif, `outline:none` (siyah native outline YOK), `box-shadow rgba(225,72,39,.45) 0 0 0 3px` (domates ring) |

**🔴 BULGU — sefler-v1.html 390 yatay taşma (Set B → uygula-b):**
HERO bloğu (`.sef-hero-chips`, `.lst-stats`, h1, lead) 390'da **w=416 (left:16→
right:432)** render oluyor — ≤640 tek-kolon/daralma kuralı uygulanmıyor; içerik
358 olması gerekirken 416. Off-canvas drawer (710) overflow-x:hidden ile
kırpılıyor, gerçek sürücü hero. **DEVREDİLDİ → uygula-b** (sefler-v1 onun yeni
sayfası). Düzeltme + yeniden ölçüm gerekli.

**Re-verify bekleyen (lead kapsam güncellemesi — sweep'te ATLANDI/bayat):**
- **ansiklopedi-v1** → #21 sonrası RE-PROBE EDİLDİ ✅: 390 ov=false (her iki
  auth), §3b viol=false, **click-through ÇALIŞIYOR** (harf "B" → 3 kategori kartı
  [Bakliyat/Baharat/Balık] → "Bakliyat & Tahıl 3 madde" → 3 madde detay-link →
  `ansiklopedi-detay-v1.html`), konsol 0. İki katmanlı A-Z + görselli kategori
  yapısı temiz.
- **diyetisyen-dizin-v1** → #23 sonrası RE-PROBE EDİLDİ ✅: 390 ov=false (her iki
  auth), §3b ok, konsol 0. dz-card: "Profili Gör" butonu KALDIRILDI (seçenek a),
  `.dz-price` korundu ("Seans başı ₺750"), **çift tab-stop YOK** (focusable=1),
  kart `onclick="location.href='diyetisyen-profil-v1.html'"` ile tıklanabilir.
  _Minör gözlem (site-geneli, #23'e özel değil): kart onclick-only (ARTICLE,
  tabindex/role yok) → profil nav mouse-only; klavye Tab yalnız "Kaydet" butonuna
  ulaşır. AMA p-card (shop) de aynı onclick-only deseni kullanıyor (r-card'da iç
  başlık-linki var) → bu site-geneli onclick-kart a11y deseni, Laravel fazı
  backlog'u; #23 regresyonu DEĞİL._
- **sefler-v1** → #25 fix sonrası RE-PROBE EDİLDİ ✅: sw 432→**375**, ov=false
  (her iki auth), §3b ok. Taşma giderildi. Kök neden (lead): lh-chips'te eksik
  `min-width:0` + lst-hero `1fr→minmax(0,1fr)`. **NOT (lessons adayı): benim
  element-rect probe'um taşmayı yakaladı; salt-scrollWidth probe false-pass
  vermişti** — element-rect (her elemanın `right`i) daha hassas.
- **ramazan 5 dosyası (#24)** → RE-PROBE EDİLDİ ✅: anasayfa-portal-v3a, tarif-
  liste, tarif-detay, bugun-ne-pisirsem, sezon — her biri `?ramazan=0` VE
  `?ramazan=1` durumunda 390'da ov=false + §3b viol=false. Toggle çalışıyor:
  `ramazan=0`→body class YOK (regresyon: site normal), `ramazan=1`→ramazan body
  class VAR (mod aktif). Ramazan modu 390 layout/§3b BOZMUYOR.
- **ansiklopedi-v1 — #26 sonrası SON RE-PROBE EDİLDİ ✅:** 390 ov=false (her iki
  auth), §3b ok, konsol 0. mega menüde "Tarif Bulucu" var (mega-find epiloğu).
  Click-through 19 GERÇEK Sözlük kategorisiyle çalışıyor: harf B → Baharatlar /
  Bakliyatlar / Balıklar(yakında) → "Bakliyatlar 3 madde" → 3 madde detay-link →
  `ansiklopedi-detay-v1.html`. Final hâl temiz.

### ✅ #12 KAPANDI — TÜM RE-PROBE'LAR TEMİZ
70 sayfa × auth=1/0 × 390 ana sweep + 5 revizyon re-probe (tarif-bulucu #22,
ansiklopedi #21→#26, sefler #25, diyetisyen-dizin #23, ramazan ×5 #24):
**0 yatay taşma** (sefler fix sonrası), **0 §3b ihlali**, **0 gerçek konsol
hatası**, auth=1/0 doğru toggle, BNP focus-ring domates (siyah outline yok).
Tek bulgu (sefler-v1 taşma) bulundu→devredildi→düzeltildi→re-probe temiz.
- **tarif-bulucu-v1 (#22 nav redesign):** #22 completed sonrası RE-PROBE EDİLDİ
  → temiz (390 ov=false, §3b viol=false, her iki auth). Site-geneli dropdown
  sweep (#22) kapalı dropdown → 390/konsol etkilemez, diğer 69 ölçüm geçerli.

### sanity-check detayları
- **İLK İŞ sanity-check ✅ ÖNCEDEN KOŞULDU + GEÇTİ** (Playwright iframe-batch):
  - Temiz (sozluk-v1): overflow=hayır, bottomCount=**1** (bottom-nav), auth=1→
    `is-auth` TRUE / auth=0→FALSE (auth tespiti çalışıyor) ✓
  - Kirli fixture (`.ss-scratch/qa/zz-dirty.html` = sozluk + 9999px taşma + 2
    yığılı alt şerit): overflow=**evet** (sw=9999), bottomCount=**3** (nav+2
    şerit, >1 yakalandı) ✓
  - Sonuç: probe taşma + §3b çok-katman + auth durumunu doğru ayırıyor →
    "0 bulgu" raporu güvenilir.
  - **Gerçek run rafine:** her ölçüme `&cc=1` eklenecek (çerez banner'ı zorla
    göster → §3b stres testi; doğru sayfa çerez açıkken nav'ı `bn-hidden` yapıp
    yine 1 katman verir, bozuk sayfa >1).

---

## 🚧 Bilinen Sınırlamalar

- **#9 canlı slot mockup'ı yok:** Yerleşim bölümü formatların *nerede*
  yaşadığını wireframe + metrikle anlatır; gerçek sayfalara (anasayfa/tarif-detay)
  henüz canlı reklam kutusu yerleştirilmedi (kanon set sahipliği + lead onayı
  gerekçesiyle). İstenirse ayrı iş.
- **Metrikler mock:** Tüm gösterim/CTR/dönüşüm rakamları temsilîdir; sayfada
  açıkça işaretli.
- **#10 kapsam dışı ölü CSS:** BNP'de `.pick*`, `.res-summary/.res-chip/
  .res-edit/.res-bar/.res-grid/.res-empty`, ve `.r-card` alt-aile (`.r-media
  .r-body .r-facts .r-foot .r-author .r-stats .r-rate .r-views .r-match
  .r-media-wrap`) de ÖLÜ (canlı DOM'da 0). Görevin parantez kapsamı
  (".stepper/.wiz-* türevleri") dışında + canlı `.r-chip/.r-save/.m-types/.mt`
  ile iç içe geçmiş olduğundan DOKUNULMADI. İstenirse ayrı mini-temizlik turu
  (lead onayı ile) — ~40 satır daha kazandırır.
