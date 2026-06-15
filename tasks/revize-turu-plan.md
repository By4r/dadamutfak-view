# DadaMutfak — Revize Turu Planı (8 aktif madde)

> Tek doğruluk kaynağı bu turu için. Plan modu çıktısı — implement YOK.
> Oluşturma: 2026-06-15. Referans: `tasks/handoff.md`, `tasks/bilesen-kilavuzu.md`.
> Aktif maddeler: **3, 5, 8, 9, 10, 11, 12, 13**. Yapılmış: 1,2,4,6,7. Ertelendi: 14.

---

## 0. Temel Mimari Gerçekler (her kararın dayandığı zemin)

- **Public nav inline, ~57–60 dosyada tekrar** (`.dropdown-health` 57 · "Sağlıklı Yaşam" 59 · bottom-nav 65). Her yeni menü öğesi = ~60 dosyalık sweep → projenin #1 çakışma kaynağı.
- **6 shop-shell sayfası ayrı kabuk** (akademi, dada-shop, odeme, sepet, urun-detay, urun-liste) — public nav taşımaz, bu turdan etkilenmez.
- **Diyetisyen paneli zaten ayrı kabuk** (`panel-shell.html` + 7 `dyt-*`), yeşil aksanlı, sidebar'ında zaten `<span class="pl-tag">Pro</span>`.
- **Tek mevcut gate = `.lg-gate`** (giriş kapısı). Premium/ücretli/abone paywall **hiç yok** → F1 sıfırdan.
- **Rozet altyapısı = `mutfak-defteri` `.badge-band`** (kazanılan + kilitli rozet kartları). Şef rütbeleri **informel** mevcut: `tbadge t-dada` "Usta Aşçı" + takipçi modalında Komi/Çırak/Aşçı/Usta Aşçı/Editör. Formel kademe sistemi yok → F2 bunu oyunlaştırır.
- **Admin paneli mockup'ı yok** (sadece diyetisyen paneli). Madde 9 admin yüzeyi = basit stub (patron kararı).

---

## 1. Madde → Dosya Eşlemesi

| # | Madde | Dokunulan mevcut dosya | Yeni dosya | Tip | Nav sweep |
|---|-------|------------------------|------------|-----|-----------|
| **3** | Dolapta Ne Var? | `tarif-bulucu-v1.html` (2485 L) | — | İZOLE tek dosya | Hayır |
| **5** | Besin Değerleri | `.dropdown-health` (~57 sweep), `besin-kutuphanesi-v1.html` (şablon) | **4 rehber sayfası** | İçerik + sweep | **EVET (57)** |
| **8** | Diyetisyen Pro | `diyetisyen-profil-v1.html` (sat.1457 `.pf-panel`), `panel-shell.html`, 7×`dyt-*`, `diyet-listeleri/program` | Pro akış sayfaları (F1) | BÜYÜK | Olası |
| **9** | Rozet/şef-kademe | `mutfak-defteri` (.badge-band), `diyetisyen-profil` (.rev-badge/.tbadge), `sef-ol`, `sefler`, `hesabim` | **Rozet galeri + kademe sayfası + admin stub** | BÜYÜK-orta | Hayır (çok-dosya gösterim) |
| **10** | Restoran → Randevu | `mekan-detay-v1.html` (2641 L), `kesfet-v1.html` Mekanlar tab | **Randevu modal + mekan paneli (2-3 sayfa) + İşletme Ekle formu** | BÜYÜK | Olası (IA) |
| **11** | Sofra düzeni | `sofra-duzeni-v1.html` (2139 L) — kart href `#anchor`→sayfa | **8 detay sayfası** | Şablonik | Hayır |
| **12** | Reklam placement | `reklam-ver-v1.html` (2374 L) — 9 statik `.yer-card` | — (modal aynı dosyada) | İZOLE tek dosya | Hayır |
| **13** | Video Pro/abone | `video-mutfagi-v1.html` (2729 L) | Pro akış (F1) + olası creator sayfası | BÜYÜK | Olası |

**Hazır yeniden-kullanım:**
- **10 ← 8:** `diyetisyen-profil` 3-adımlı `.apt-modal` (hizmet→gün→saat→onay→başarı) + `dyt-randevular` takvim/drawer → mekan randevusu birebir mirror.
- **11:** 8 bölüm zaten self-contained (`#gunluk…#acik-bufe`, her biri `.sof-row`) → düşük riskli çıkarma.
- **F1 ← reklam-ver:** `.pk-grid`/`.pk-card`/`.pk-feats`/`.pk-price` 3-tier sistemi hazır.
- **F2 ← mutfak-defteri:** `.badge-band`/`.badge-grid`/`.badge-card.locked` hazır.

---

## 2. Domain Separation Matrisi (paralel çakışma riski)

| Paylaşılan kaynak | Dokunan madde | Risk | Çözüm |
|-------------------|---------------|------|-------|
| **R1 — Public nav (~60 dosya inline)** | 5, 8?, 10?, 13? | YÜKSEK | Tek "chrome sweep" sahibi, EN SONA, idempotent script |
| **R2 — `panel-shell.html` + panel kit** | 8 (düzenler), 10 (klonlar), 9 (admin stub) | YÜKSEK | 8 önce canon → 10 mirror |
| **R3 — `diyetisyen-profil-v1.html`** | 8 (panel sil+pro), 9 (rozet/kademe ekle), 10 (apt-modal READ-ONLY ref) | ORTA | Profil edit'i tek sahibe (8); 9 ardışık/koordine |
| **R4 — Pro/paywall primitive (YENİ)** | 8, 13, 10-pro | TASARIM ÇAKIŞMASI | F1'de TEK kez tanımla |
| **R5 — Rozet bileşeni (YENİ, çok-yer gösterim)** | 9 sahip + 8/sefler/hesabim/sef-ol | ORTA | F2 bileşen → sonra dağıt |

**İZOLE (güvenle paralel):** 3, 11, 12, 5a (rehber sayfaları).

---

## 3. Bağımlılık Eksenleri

- **Eksen A — Pro/abone/paywall:** 8 + 13 (+10 pro tier). **ORTAKLAŞTIRILIYOR → F1.**
- **Eksen B — Panel + Randevu:** 8 → 10 sert bağımlılık. 10, 8'den SONRA; tercihen aynı teammate.
- **Eksen C — Yönetim paneli:** 9 admin stub; 8/10 panelleri kullanıcı paneli (farklı aktör).

---

## 4. Wave Planı + Teammate Ataması

**Lead = delegate-only.** 2000+ satır dosya gövdesini context'e ALMAZ; canon doc + diff özeti + render SS toplar.

### Wave 0 — Foundation (ZORUNLU ön-koşul, küçük; kod değil spec doc)
- **F1** Pro abonelik + tier primitive spec (bu doc §6).
- **F2** Rozet + şef-kademe oyunlaştırma spec (bu doc §7).
- **F3** Nav/IA planı (bu doc §8).
> Tek teammate ya da lead üretir. F1/F2/F3 onaylanmadan Wave 2 başlamaz.

### Wave 1 — İzole işler (tam paralel)
- **T-A:** Madde **3** (tarif-bulucu) + Madde **12** (reklam placement-preview).
- **T-B:** Madde **11** (sofra 8 detay) + Madde **5a** (4 besin rehber sayfası).

### Wave 2 — Büyük modüller (Foundation sonrası)
- **T-C:** Madde **8** (diyetisyen pro + panel ayır) → bitince **10** (mekan randevu + panel). *Ardışık, tek teammate = context devamlılığı.*
- **T-D:** Madde **13** (video pro/abone). F1 tüketir, 8/10'dan bağımsız → C ile paralel.
- **T-E:** Madde **9** (rozet dağıtım + galeri + kademe + admin stub). F2 tüketir; `diyetisyen-profil` rozet bloğunu T-C ile koordine.

### Wave 3 — Chrome sweep (TEK sahip, EN SON)
- **T-F:** Tüm nav eklemeleri (5b sağlık submenu + restoran IA + video pro etiketi) TEK idempotent sweep ile ~60 dosya. Negatif grep + idempotent re-run doğrular.

**Saf paralellik kararı:** 8∥13 paralel · 10 ardışık (8'den sonra) · 9 koordineli paralel · nav-sweep tekelleştirilmiş son adım.

---

## 5. Ctx / Handoff Stratejisi

1. Lead hiçbir 2000+ satır dosyayı yüklemez; teammate yalnız numstat + kısa diff + render SS döner.
2. Canon kısa doc'larda (bu dosya §6-8); teammate referans verir, context'e kopyalamaz.
3. Nav-sweep idempotent Python regex script (proje pattern'ı) — 60 dosya context'e girmez.
4. Aynı anda en fazla 1-2 "sıcak" büyük dosya; 8 ve 10 aynı teammate'te ardışık.
5. Her wave sonunda commit + handoff güncelle + teammate kapat → context boşalt.
6. 9'un "tüm rozetler" veri listesi ayrı kısa veri doc'una çıkar (§7'de iskelet).

---

## 6. FOUNDATION F1 — Pro Abonelik + Tier Primitive

**Kaynak pattern:** `reklam-ver-v1.html` §`#paketler` (`.pk-grid`/`.pk-card`/`.pk-feats`/`.pk-price`).
**Hedef:** Tam abonelik UX (fiyat + plan seçimi + ödeme ekranı) — sahte lock DEĞİL, mockup düzeyinde uçtan uca akış.

### 6.1 Tier modeli (reklam-ver bronz/gümüş/altın → Pro 1/2/3)
3 kademe, `.pk-card` varyant dilini birebir miras alır:
| Tier | reklam-ver karşılığı | İkon | Renk token | Konum |
|------|----------------------|------|------------|-------|
| **Pro 1** (`.pro-card.t1`) | bronz | `fa-seedling`/`fa-medal` | #9C6B3F | sol |
| **Pro 2** (`.pro-card.t2 .featured`) | gümüş `featured` + `.pk-flag` "En popüler" | `fa-medal` | #6B7B8C | orta (vurgulu) |
| **Pro 3** (`.pro-card.t3`) | altın | `fa-crown` | #B8860B | sağ |

- Markup iskeleti = `.pk-card` kopyası: `.pro-tier` (ikon+ad) · `.pro-desc` · `.pro-feats` (`<li>` check / `<li class="no">` xmark) · `.pro-price` (b fiyat + span periyot) · CTA.
- **Her tier'da erişilen özellik listesi açıkça yazılır** (aşağı VARSAYIM tablosu).

### 6.2 Pro özellik dağılımı (ONAYLANDI — patron 2026-06-16)
| Özellik | Pro 1 | Pro 2 | Pro 3 |
|---------|:---:|:---:|:---:|
| Reklamsız deneyim | ✓ | ✓ | ✓ |
| Pro tarif/koleksiyonlar | ✓ | ✓ | ✓ |
| Premium creator içeriği (madde 13) | 1 creator | 3 creator | Sınırsız |
| Diyetisyen pro içerik/indirim (madde 8) | — | ✓ | ✓ |
| Mekan pro avantajları (madde 10) | — | ✓ | ✓ |
| Öncelikli randevu / özel webinar | — | — | ✓ |
| Aylık fiyat (temsilî) | ₺49 | ₺99 | ₺199 |

> **ONAYLANDI:** Pro = site geneli TEK tier'lı üyelik. Madde 8 (diyetisyen), 10 (mekan), 13 (video premium içerik) hepsi bu tek üyeliğin tier-bazlı faydaları. Per-creator ayrı ödeme YOK. Fiyatlar temsilî.

### 6.2b "Abone Ol" (ücretsiz takip) vs "Pro" (ücretli kilit) — NET AYRIM (ONAYLANDI)
**Referans: YouTube** (subscribe ücretsiz · membership ücretli tier'lı). İki kavram KESİN ayrı, karıştırılmaz:
- **`.creator-sub` "Abone Ol"** — ÜCRETSİZ takip (YouTube subscribe / Instagram follow): bildirim + feed'e ekleme, PARA YOK. Madde 13 creator kartı/profilinde. Toggle: "Abone Ol" ↔ "Abone Olundu". Mevcut `.flw-fol` (mutfak-defteri takip) dilinin kardeşi.
- **`.pro-gate` "Pro"** — ÜCRETLİ kilit: premium creator içeriği/bölümü kilitli → "Pro'ya Yükselt" → F1 akışı. `[data-pro-gate]` attribute, `.lg-gate` paterni birebir.
- **Madde 13'te ikisi birlikte:** creator kartında ücretsiz "Abone Ol" butonu HER ZAMAN aktif; premium serilerde ayrıca `.pro-gate` kilidi. Abone olmak içeriği AÇMAZ — yalnız Pro açar. (T-D bunu net ayırmalı.)

### 6.3 Akış sayfaları (yeni)
1. **`pro-v1.html`** — Pro landing + 3-tier karşılaştırma (`.pro-grid`) + SSS + "Pro'ya Yükselt" CTA. Hero §2f kanonu.
2. **Ödeme ekranı** — `VARSAYIM:` mevcut `odeme-v1.html` (shop checkout) deseni mirror → `pro-odeme-v1.html` (plan özeti + kart formu + "Aboneliği Başlat" + başarı state). Shop-shell DEĞİL, public-shell + sade checkout.
3. **`.pro-gate` bileşeni** — `.lg-gate` kardeşi: kilitli Pro içerikte lock + "Pro'ya Yükselt → pro-v1.html" CTA. `[data-pro-gate]` attribute tetikli (lg-gate paterni birebir).

### 6.4 Erişim noktaları
- Video (13): Pro seri/bölümde `.pro-gate` + tier rozeti.
- Diyetisyen (8): panel/profilde pro özellik bandı + "Pro" `.pl-tag` (zaten var) anlamlandırılır.
- Header/hesabım: "Pro'ya Yükselt" girişi (`VARSAYIM:` avatar dropdown'a 1 satır).

---

## 7. FOUNDATION F2 — Rozet + Şef-Kademe Oyunlaştırma

**Kaynak pattern:** `mutfak-defteri-v1.html` `.badge-band`/`.badge-grid`/`.badge-card`(`.locked`+`.badge-lock`).
**Hedef:** CS:GO rütbe mantığı — rozet topladıkça şef kademesi atlar. Derin, oyunlaştırılmış.

### 7.1 Mevcut rozetler (mutfak-defteri'den envanter)
Kazanılan: Dada Şefi · Haftanın Aşçısı · Şefin Tercihi · İlk Tarif · Fotoğraf Ustası · Püf Bilgini · Yorum Sever · 1.000 Beğeni · 3 Yıl Dada'lı.
Kilitli (yolda): Çorba Ustası (8 çorba kaldı) · Tatlı Şefi (4 tatlı kaldı) · Maraton Aşçı (30 gün seri).

### 7.2 Rozet kategorileri — `VARSAYIM:` (genişletilmiş set)
| Kategori | Örnek rozetler | Tetik |
|----------|----------------|-------|
| **Başlangıç** | İlk Tarif, İlk Fotoğraf, İlk Yorum | tek-sefer aksiyon |
| **Üretim** | Çorba Ustası, Tatlı Şefi, Hamur İşi Uzmanı, Izgara Kralı | N adet kategori tarifi |
| **Topluluk** | Yorum Sever, 1.000 Beğeni, Takip Mıknatısı | etkileşim eşikleri |
| **Ustalık** | Püf Bilgini, Fotoğraf Ustası, Editör Onaylı | kalite/onay |
| **Sadakat/seri** | Maraton Aşçı (30 gün), 3 Yıl Dada'lı, Haftanın Aşçısı | süreklilik |
| **Nadir/özel** | Şefin Tercihi, Dada Şefi, Sezon Şampiyonu | editöryal/yarışma |

### 7.3 Şef kademe merdiveni (CS:GO rütbe → şef) — `VARSAYIM:`
İnformel mevcut (Komi/Çırak/Aşçı/Usta Aşçı) formelleştirilir, 8 kademe:
| # | Kademe | Rozet eşiği (temsilî) | İnsignia |
|---|--------|----------------------|----------|
| 1 | Çömez | 0 | `fa-egg` |
| 2 | Komi | 2 rozet | `fa-utensils` |
| 3 | Çırak | 5 rozet | `fa-spoon` |
| 4 | Aşçı | 9 rozet | `fa-bowl-food` |
| 5 | Usta Aşçı | 14 rozet | `fa-medal` |
| 6 | Şef | 20 rozet + ≥1 nadir | `fa-hat-chef` |
| 7 | Usta Şef | 28 rozet + ≥2 nadir | `fa-trophy` |
| 8 | Dada Üstadı | 35+ rozet + editöryal | `fa-crown` |

- **İlerleme göstergesi:** "Topluluk Puanı 8.450" (zaten var) + sonraki kademeye progress bar ("Usta Aşçı'ya 3 rozet kaldı"). CS:GO mantığı: rütbe insignia + progress + bir sonraki kilidi gösteren teaser.
- **`.tbadge t-dada`** zaten H1'de kademe gösteriyor ("Usta Aşçı") → kademe rozeti buraya bağlanır.

### 7.4 Sayfalar
1. **`rozetler-v1.html`** (YENİ) — tam rozet galerisi: kazanılan + kilitli + kademe merdiveni + ilerleme. `.badge-grid` büyütülmüş vitrin. (mutfak-defteri "Tüm Rozetler →" linki buraya.)
2. **Profil/hesabım dağıtımı** — `.badge-band` teaser + kademe rozeti: `mutfak-defteri`, `diyetisyen-profil`, `sefler`, `sef-ol`, `hesabim`.
3. **Admin stub** — `VARSAYIM:` basit `admin-rozet-v1.html` placeholder (rozet listesi tablosu + "Düzenle" pasif butonlar; gerçek CRUD yok, Laravel fazına not).
4. **Veri doc:** `tasks/rozet-veri.md` (YENİ, kısa) — tüm rozetler + kategori + tetik + kademe eşiği; sayfa markup'ı şişmesin.

---

## 8. FOUNDATION F3 — Nav / IA Planı

Tüm nav eklemeleri TEK sweep'te (Wave 3), idempotent.

### 8.1 Madde 5 — Sağlıklı Yaşam dropdown
Mevcut 3 öğe: Hesaplayıcılar · Testler · Diyetisyen Ara.
**Eklenecek (`VARSAYIM:` alt-grup):** "Besin Değerleri" başlığı altında 4 öğe:
- Besin Kalori Cetveli → `besin-kalori-cetveli-v1.html`
- Protein Kaynakları Rehberi → `protein-rehberi-v1.html`
- Karbonhidrat Kaynakları Rehberi → `karbonhidrat-rehberi-v1.html`
- Yağ Kaynakları Rehberi → `yag-rehberi-v1.html`
> **VARSAYIM:** Dropdown zaten 3 öğe; 4 daha = 7 öğe. Dropdown 2-kolon ya da "Besin Değerleri" alt-başlıklı gruplama (taşma riski düşük, dropdown dikey). Düz 7 öğe de kabul.

### 8.2 Madde 10 — Restoran/Randevu IA
> **VARSAYIM:** Restoran zaten Keşfet "Mekanlar" sekmesinde yaşıyor. Yeni top-level nav öğesi EKLENMEZ (nav ~1040px'te sıkışık — handoff notu). Randevu girişi `mekan-detay` içinde "Randevu Al" CTA olarak kalır; mekan paneli ayrı kabuk (panel-shell kardeşi), nav'dan değil panel-shell footer'dan erişilir. → **Madde 10 nav-sweep gerektirmez.**

### 8.3 Madde 13 — Video Pro
> **VARSAYIM:** Video zaten nav'da. Yalnız "Pro" rozeti/etiketi eklenir (pro içerik işareti), yeni nav öğesi yok. Header'a tek "Pro'ya Yükselt" girişi (F1 §6.4) — bu da sweep'e dahil.

### 8.4 Sweep kapsamı (Wave 3 tek pass)
- 5b: 4 sağlık dropdown öğesi → ~57 dosya (.dropdown-health + drawer .d-sub-health).
- F1: header "Pro'ya Yükselt" girişi → ~59 dosya.
- Negatif grep + 2× idempotent re-run + 5 aileden dropdown-açık SS doğrulama.

---

## 9. KAPSAM VARSAYIMLARI (patron netleştirebilir — hepsi `VARSAYIM:`)

1. **ONAYLANDI (Pro birliği):** Pro = tek site-geneli tier'lı üyelik; video premium + diyetisyen pro + mekan pro bu üyeliğin faydaları. Per-creator ayrı ödeme yok. **Ücretsiz "Abone Ol" (takip) ≠ ücretli "Pro" (kilit) — NET AYRI** (§6.2b, YouTube referansı).
2. **VARSAYIM (Pro fiyat/ödeme):** Fiyatlar temsilî (₺49/99/199); ödeme ekranı `odeme-v1` deseninden türev `pro-odeme-v1.html`. (§6.3)
3. **ONAYLANDI (Restoran semantiği):** Diyetisyen `.apt-modal` 3-adımlı UX İSKELETİNİ miras al, SEMANTİĞİ MASA REZERVASYONU yap: **Adım 1 = kişi sayısı** ("hizmet seç" değil) · **Adım 2 = tarih/saat** · **Adım 3 = onay/başarı**. Yapı diyetisyenden (kod tutarlılığı), içerik restorandan (gerçekçilik). Ücret/depozito YOK. Mekan sahibi `diyetisyen-ol` kardeşi "İşletmeni Ekle" formuyla girer; mekan paneli `panel-shell` yeşil dilinin kardeşi.
4. **VARSAYIM (Mekan paneli):** `panel-shell` yeşil dilinin kardeşi (ayrı renk/marka değil); bölümler: Randevular · Müsaitlik/Ayarlar · İşletme Profili. dyt-randevular takvim/drawer mirror.
5. **VARSAYIM (Besin rehber derinliği):** 4 sayfa = `besin-kutuphanesi` şablonundan referans tablosu (besin → kcal/protein/karb/yağ) + kısa editöryal giriş. Tablo verisi temsilî/mock. Her sayfa kendi makro odağında filtrelenmiş tablo.
6. **VARSAYIM (Madde 3 ikon):** "Renkli ikon set" = FontAwesome korunur, kategori-bazlı renk token'ı eklenir (sebze=yeşil, et=kırmızı, meyve=turuncu vb). Yeni ikon kütüphanesi GETİRİLMEZ (kilitli FA 6.5.2 kuralı).
7. **VARSAYIM (Madde 3 oval kategori):** `.sh-tab` `border-radius:999px` → `12px` rounded-rect; aktif-state ince tomato border korunur.
8. **VARSAYIM (Madde 3 İstemediklerim):** `#alerjenBlock` genişletilir — daha fazla alerjen/malzeme + görsel hiyerarşi (koyu slate uyarı bandı + "X malzeme hariç" sayaç + belirgin başlık). Sayfada ayrı belirgin bölüm.
9. **VARSAYIM (Sofra detay içeriği):** 8 detay sayfası = mevcut bölüm içeriği (açıklama + ipuçları) çıkarılır + zengin iskelet (giriş + adım/ipucu listesi). Görsel = gri placeholder kutu (highfield API yarın gelecek; `data-img-pending` işaretli). Kart href `#anchor` → `sofra-{slug}-v1.html`.
10. **VARSAYIM (Nav taşma):** Yeni top-level nav öğesi eklenmez (5 dropdown-içi, 10 Keşfet-içi, 13 etiket). Sıkışık nav korunur; yalnız dropdown + header "Pro" girişi büyür.
11. **VARSAYIM (Admin):** Rozet admin = pasif stub sayfa; gerçek yönetim Laravel fazı.
12. **VARSAYIM (Commit kadansı):** Wave başına ayrı commit + Beyar onayı (proje pattern'ı).

---

## 10. Teammate Brief Taslakları

### T-A (Wave 1 — izole)
**Madde 3 (tarif-bulucu-v1.html):** (a) malzeme içeriklerini tamamla (`.raf-rack` her rafta eksik malzemeler) · (b) kategori-bazlı renkli ikon (token) · (c) `.sh-tab` 999px→12px · (d) `#alerjenBlock` İstemediklerim genişlet+belirginleştir. Tek dosya, gövdeye minimal dokun. Kanıt: before/after SS desktop+390.
**Madde 12 (reklam-ver-v1.html):** 9 `.yer-card`'a `data-placement` + tık → placement-preview modal (hangi sayfada NEREDE göründüğünü gösteren highlight'lı önizleme). Statik wireframe → interaktif. Kanıt: tık-test + SS.

### T-B (Wave 1 — izole)
**Madde 11 (sofra):** `sofra-duzeni-v1.html` 8 bölümü → 8 detay sayfası (`sofra-{slug}-v1.html`), `_shell` + §2f hero + içerik çıkarma + gri placeholder görsel. Hub kartı href `#anchor`→sayfa. Kanıt: 8 sayfa render + hub link tık-test.
**Madde 5a (besin rehberleri):** 4 yeni sayfa `besin-kutuphanesi` şablonundan (kalori/protein/karb/yağ referans tablosu + editöryal giriş). Nav sweep YAPMA (Wave 3'te). Kanıt: 4 sayfa render.

### T-C (Wave 2 — büyük, ardışık)
**Madde 8 ÖNCE:** `diyetisyen-profil` sat.1457 `.pf-panel` linkini kaldır; profil→panel kuplajını kopar; panele Pro özellik bandı (F1 §6.4); pro içerik `.pro-gate`. Panel sayfaları (7 dyt) gözden geçir.
**Madde 10 SONRA:** `mekan-detay`'a "Rezervasyon Yap" `.apt-modal` (diyetisyen 3-adım İSKELETİ mirror, semantik MASA REZERVASYONU: Adım1 kişi sayısı → Adım2 tarih/saat → Adım3 onay/başarı) + mekan paneli (panel-shell yeşil kardeşi: Rezervasyonlar/Müsaitlik/İşletme Profili) + "İşletmeni Ekle" formu (diyetisyen-ol kardeşi). F3 §8.2: nav-sweep YOK, Keşfet-içi. Kanıt: rezervasyon akış tık-test + panel render.

### T-D (Wave 2 — büyük, paralel)
**Madde 13 (video-mutfagi-v1.html):** İKİ KAVRAM NET AYRI (§6.2b): (1) ücretsiz `.creator-sub` "Abone Ol" takip butonu (her creator'da, içeriği AÇMAZ) + (2) premium seride ücretli `.pro-gate` kilit → "Pro'ya Yükselt" → F1 akışı. Creator profil/sosyal link. F1 primitive tüket. Kanıt: abone-toggle + pro-gate tık-test ayrı ayrı + SS.

### T-E (Wave 2 — koordineli)
**Madde 9 (rozet/kademe):** `rozetler-v1.html` galeri + kademe merdiveni (F2 §7.4) · `.badge-band` dağıtımı (mutfak-defteri/diyetisyen-profil/sefler/sef-ol/hesabim) · admin stub · `tasks/rozet-veri.md`. `diyetisyen-profil` edit'ini T-C ile koordine (8 önce profili sabitler). Kanıt: galeri render + kademe progress + dağıtım SS.

### T-F (Wave 3 — chrome sweep, tek sahip)
İdempotent Python regex sweep: 5b (4 sağlık dropdown öğesi) + F1 header "Pro'ya Yükselt" → ~57-59 dosya. Negatif grep + 2× idempotent + dropdown-açık SS. Diğer dropdownlar (Tarifler/Mutfak Sırları) DOKUNULMAZ.
