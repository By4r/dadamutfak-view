# MEGA REVİZE — Konsolide Master Plan (agent-team dalga brief'i)

> Tarih: 2026-06-22. **KEŞİF + PLAN (read-only, KOD YOK, commit YOK).** Bu dosya bir sonraki agent-team dalgasının brief'idir. Tüm iş `v6/` altında, statik HTML. Sunucu `localhost:8765/v6/`.
> **DEĞİŞMEZ:** Kanonik kabuk (`sa-shell.css/js`, `sa-ui.css/js`, `sa-*.css`) DOKUNULMAZ — yalnız `<link>`/`<script>` ile yüklenir. Tek istisna: Admin-B nav satırı (`sa-shell.js` SECTIONS, 1 config satırı) → **yalnız LEAD, sıralı**. **Targeted edit ZORUNLU, full-file write YASAK** (lost-update riski).
> Kaynak planlar (yeniden keşfetme): `tasks/admin-review-yasin-plan.md` (Admin-A + Admin-C) · `tasks/handoff.md` (İşletme B1/K1/W1/B2/B3/C2).

---

## 0. BEŞ BATCH — ÖZET

| Batch | Kapsam | Dosya tipi | Şerit |
|---|---|---|---|
| **1. PUBLIC** | dada-revize public içerik turu (8 madde + 9 TBD) | mevcut public sayfalar (inline) + 1 yeni liste sayfa | `public` |
| **2. İŞLETME** | B1/K1/W1/B2/C2 (B3 hariç) | mevcut public+panel sayfalar (inline) | `isletme` |
| **3. ADMIN-A** | Tarif formu paritesi (A1-A4) | tek dosya (inline) | `admin-form` |
| **4. ADMIN-B** | İçerik yazım modülü | YENİ izole admin sayfalar (+1 nav satırı) | `admin-content` + LEAD |
| **5. ADMIN-C** | Rapor genişletme | tek dosya (inline) | `admin-report` |
| **— LEAD** | Koordinasyon + nav satırı + **B3 header sweep (EN SON)** | sa-shell.js (1 satır) + ~93 public header | LEAD (kod yazmaz, yalnız sweep+nav) |

---

## BATCH 1 — PUBLIC (dada-revize 8 madde)
> Şerit: `public`. Hepsi sayfa-içi inline (1 istisna: madde-4 yeni liste sayfası). 8 sayfanın **hepsi v6'da DOĞRULANDI mevcut.**

**Dosya listesi (bu şerit, başka kimse dokunmayacak):**
`bugun-ne-pisirsem-v1.html` · `tarif-bulucu-v1.html` · `kesfet-v1.html` · `mutfaga-giris-v1.html` · `ansiklopedi-v1.html` · `olcu-birimleri-v1.html` · `besin-degerleri-v1.html` + **item-7 ailesi** (`besin-kalori-cetveli-v1.html`, `protein-rehberi-v1.html`, `karbonhidrat-rehberi-v1.html`, `yag-rehberi-v1.html`) · `sezon-v1.html` · **YENİ** `mutfaga-giris-liste-v1.html` (madde 4).

| # | Sayfa | Ne yapılacak | Dokunulacak (dosya:bölüm) | Tip | Efor |
|---|---|---|---|---|---|
| 1 | bugun-ne-pisirsem | "Menü Adını Değiştir" tasarımı yenilenecek | `#menuDetail` markup (~2060-2076) + rename JS (2914-2922, ham contenteditable); `.scp-name` dili (1242-1249) ile tutarlılık | inline | M |
| 2 | tarif-bulucu | kalori/protein/zaman filtreleri belirgin + **protein filtresi YOK → ekle** | `#dolapFilters`/`.dolap-filters` (1603); `.df-krange` range + `.df-sure` chips belirginleştir, yeni `.df-block` protein | inline | M |
| 3 | kesfet | "Mekan Öner" CTA ekle | `.ke-hero`/`.ke-stats` (1652-1671) veya `#paneMekan` grid sonu → **CTA href=`isletme-ekle-v1.html`** (sayfa mevcut, yeni gerekmez) | inline | S |
| 4 | mutfaga-giris | alt başlık slider + "Tümünü Gör" ayrı sayfa | slider: `.disc-grid` (869) → `.row-track` slider (inline). "Tümünü Gör": `.lb-go` (1567 vb.) şu an aynı-sayfa `?konu=#kutuphane` → **YENİ liste sayfası** gerekiyor (⚠️ bağımlılık) | hibrit (inline + YENİ sayfa) | L |
| 5 | ansiklopedi | sekme açılınca başlık belirgin + "tamamını oku" sağa | `.ans-cathead h2` (1476) belirginleştir; `.ans-dgo` (1493, mevcut → `ansiklopedi-detay`) sağa hizala | inline | S |
| 6 | olcu-birimleri | "Malzemeye göre" alt başlık slider | `#tblTabs`/`.ut-tabs.disc-tabs` (1442-1453, 10 buton) saran-flex → yatay slider; `.row-track` referans | inline | M |
| 7 | besin-degerleri **(CROSS-PAGE)** | tab menüleri tutarlı hale getir | `.bd-tab` YALNIZ besin-degerleri'nde (1227-1232). 4 standalone rehber (`besin-kalori-cetveli`, `protein-rehberi`, `karbonhidrat-rehberi`, `yag-rehberi`) `.bd-tab` YOK, hepsi `besin-degerleri?tab=*`'a link-out. **Karar gerek (açık soru):** 4 sayfaya `.bd-tab` çubuğu mu eklensin yoksa konsolidasyon mu? **TEK YAZAR süpürmeli** (5 dosya tutarlı) | inline ×5 | L |
| 8 | sezon-v1 | Ramazan iftar/sahur ayrı ana sayfa + daha çok motif | sezon-v1 ZATEN Ramazan landing ("Ramazan Mutfağı"): `.rmz-bar`(1358), `#iftar`(1474)/`#sahur`(1589)/`#tatli`(1679) slider'lar, `body.is-ramazan` modu. **Sıfırdan değil → sezon-v1'den türet/genişlet.** `sofra-ramazan-v1` AYRI kalır (sofra düzeni içeriği, menü değil). Motif: `.rmz-bar`/`.szn-strip`/`.coldex` + hero güçlendir | inline (+belki türetme) | M-L |
| 9 | **TBD** | Beyar dolduracak | — | — | — |

**Item-7 açık soru:** 4 rehber sayfaya tab çubuğu eklemek mi, link-out konsolidasyonu korumak mı? → Beyar/Yasin kararı.
**Item-4 bağımlılık:** "Tümünü Gör" hedefi yeni `mutfaga-giris-liste-v1.html` sayfası ister (tarif-liste/puf-noktalari deseninden türet) — yoksa CTA 404 olur. Faz olarak işaretle.

---

## BATCH 2 — İŞLETME (B1/K1/W1/B2/C2 — **B3 HARİÇ**)
> Şerit: `isletme`. Tüm dosyalar v6'da DOĞRULANDI mevcut. B3 bu şeritte DEĞİL → LEAD en sonda yapar (↓ çakışma).

**Dosya listesi (bu şerit):**
`giris-v1.html` (B1) · `hesabim-v1.html` (K1) · `isletme-ekle-v1.html` (W1) · `mekan-panel-v1.html` · `mekan-rezervasyonlar-v1.html` · `mekan-ayarlar-v1.html` · `mekan-menu-v1.html` (B2) · `mekan-detay-v1.html` (C2).

| # | İş | Dosya | Ne (handoff'tan) | Efor |
|---|---|---|---|---|
| B1 | İşletme kayıt/giriş routing + mock-dolu akış | giris-v1 | kayıt submit→`isletme-ekle-v1`; giriş→`mekan-panel?business=1`; formlar mock-dolu tıkla-yürü | M |
| K1 | "İşletmem" sekmesi+pane + `biz-*` CSS söküm | hesabim-v1 | Beyar kararı: KALDIR (eski 1976-2022) | M |
| W1 | Wizard sonu → `mekan-panel?business=1` + mock alanlar | isletme-ekle-v1 | adımlar örnek değerle dolu, ileri butonları mock ilerlesin | M |
| B2 | 4 panel sayfasına inline `SA_ACCOUNT_ITEMS` | mekan-panel/-rezervasyonlar/-ayarlar/-menu | sa-ui.js'ten ÖNCE; consumer logout (uniform inline) | M |
| C2 | `?owner=1` ince önizleme bandı | mekan-detay-v1 | sa-gozetim banner deseni; inline editing AÇILMAZ | S |

**Walkable (şerit-içi self-test):** kayıt→wizard→panel(business=1)→Public Sayfam→header dropdown→ayarlar; dead-link 0.
**Açık soru (taşınan):** A5 eski-panel kapsamı Admin-A'yı etkiler; İşletme tarafı net.

---

## BATCH 3 — ADMIN-A (tarif formu paritesi)
> Şerit: `admin-form`. **Tek dosya:** `sa-admin-tarifler-form.html` (hepsi sayfa-içi inline `<style>`+HTML+`<script>`). Kanonik referans projenin İÇİNDE: `tarif-ekle-v1.html` (public form A1-A4'ün hepsine sahip).

| # | İş | Desen kaynağı (tarif-ekle-v1) | Efor |
|---|---|---|---|
| A1 | Adımlara süre (dk) alanı | `.st-time` (number + "dk" sonek) → her `.rep-row.step` + `stepAdd` JS template | S |
| A2 | Malzeme satırına birim seçici | `.ie-unit` select (15 birim: Su Bardağı…Demet) → her `.rep-row` + `ingrAdd` JS | S |
| A3 | Her adıma görsel (max-3, div+bg cover) | `.st-figs`/`.st-shot`/`.st-up` "N/3" deseni | M |
| A4 | Mutfak + 14 beslenme/tip etiketi | `#fTypes` chip grubu + Mutfak (chip-toggle yeterli, multi-select opsiyonel) | M |

**Açık soru (A5):** Yasin "eski panelde içeriklere bakılabilir" — ek alan mı (video/besin değeri/şef atama?) yoksa moderasyon-tipi gözden geçirme mi? Kapsamı netleştir.

---

## BATCH 4 — ADMIN-B (içerik yazım modülü)
> Şerit: `admin-content` (yeni izole sayfalar) + LEAD (nav satırı). **Admin'de blog/içerik yazım ekranı YOK** (kavram kilitli DadaAkademi'de). **Kanonik referans: `puf-noktasi-ekle-v1.html` ZATEN tam blok-editör** (başlık+kategori+etiket+çoklu kapak+sürüklenebilir Paragraf/Görsel/Video blokları+AI iyileştir+taslak/onaya-gönder). Admin modülü bunu temel alır.

**İçerik 3 editör grubuna ayrılıyor:**

| Grup | İçerik tipleri | Editör | Alanlar |
|---|---|---|---|
| **A — Blok editör** | Püf Noktaları, Mutfak Ansiklopedisi, Mutfağa Giriş, Keşfet/Gurme | `puf-noktasi-ekle` deseni (blok gövde) | başlık+kapak+etiket+Paragraf/Görsel/Video blok. Ansiklopedi+Giriş'e ek yan-form (Latince ad/künye/Seviye-Süre-Eğitmen). Püf↔Ansiklopedi aynı akışın kategori dilimleri |
| **B — Alan-form (repeater)** | Sözlük, Sofra Düzeni | alan-tabanlı | Sözlük: terim+alt ad+kategori+tanım+örnek+ilişki link. Sofra: başlık+giriş+adım repeater+ipucu repeater (8 alt sayfa = 8 kayıt, tek şablon) |
| **C — Tablo editör** | Ölçü Birimleri | satır/sütun grid | dönüşüm tablosu (malzeme→bardak/kaşık/gram); en statik, nadir düzenlenir |

**Önerilen yeni dosyalar (izole):**
- `sa-admin-icerik.html` (liste — tip filtreli chip: Püf/Ansiklopedi/Giriş/Gurme/Sözlük/Sofra/Ölçü; `sa-admin-sayfalar` liste deseni)
- `sa-admin-icerik-form.html` (Grup A blok editör — puf-noktasi-ekle portu, admin kabuğuna)
- `sa-admin-sozluk-form.html` + `sa-admin-sofra-form.html` (Grup B alan-form) — veya tek form'da tip-switch
- `sa-admin-olcu-form.html` (Grup C tablo) — opsiyonel/düşük öncelik
- **NAV (kanonik, LEAD):** `sa-shell.js` SECTIONS.admin'e 1 satır (`{ic:'fa-feather', lbl:'İçerik / Blog', href:'sa-admin-icerik.html', screen:'icerik'}`).

**Açık soru (B-nav):** İçerik ayrı modül mü (yeni sayfalar + nav satırı), yoksa "Sayfalar & SEO"ya makale tipi mi? Nav satırı kanonik dokunuş → Beyar onayı.

---

## BATCH 5 — ADMIN-C (rapor genişletme)
> Şerit: `admin-report`. **Tek dosya:** `sa-admin-raporlar.html` (sayfa-içi inline, saf CSS — harici lib YOK). Mevcut: 4 KPI + 1 büyüme grafiği + kazanım kanalları + en-çok-görüntülenen tablo + son aktivite. Tarih chip'leri veriyi değiştirmiyor.

| # | İş | Efor |
|---|---|---|
| C-1 | KPI satırı 4→6-8 (Store cirosu, bekleyen moderasyon, aktif diyetisyen…) | S |
| C-2 | Gelir kırılımı bloğu (abonelik vs e-ticaret; donut/yatay bar) | M |
| C-3 | Modül performansı grid (Store/Sağlık/Fit/İşletme mini-kart) | M |
| C-4 | Moderasyon & içerik tablosu (bekleyen onay/şikayet/red oranı) | S |
| C-5 | Tarih chip'leri 3-set veriyle gerçek çalışır + dönem kıyas rozetleri | M |

**Açık soru (C-scope):** "Daha detaylı"dan kasıt — modül kırılımı / finansal derinlik / moderasyon / coğrafya / çalışan tarih-aralığı — hangileri öncelik? Yasin netleştirsin.

---

## DOMAIN ŞERİT HARİTASI (çakışmasız)

```
LEAD ───────── koordinasyon · sa-shell.js nav (1 satır) · B3 header sweep (EN SON)  [kod yazmaz]
 ├─ public ──── dada-revize 8 + item-7 ailesi (5 dosya) + YENİ mutfaga-giris-liste
 ├─ isletme ─── giris/hesabim/isletme-ekle/mekan-panel·rez·ayar·menu/mekan-detay  (B3 HARİÇ)
 ├─ admin-form ─ sa-admin-tarifler-form.html  (tek dosya)
 ├─ admin-content ─ YENİ sa-admin-icerik* sayfalar
 └─ admin-report ─ sa-admin-raporlar.html  (tek dosya)
```

**Şeritler arası dosya kesişimi YOK** (doğrulandı):
- public ↔ isletme: kesfet item-3 yalnız `isletme-ekle`'ye LİNK verir (dosyayı düzenlemez; W1 düzenler). Çakışma yok.
- admin şeritleri farklı dosyalar (tarifler-form ≠ icerik* ≠ raporlar). Çakışma yok.

---

## ⚠️ ÇAKIŞMA & SIRA BAYRAKLARI (KRİTİK)

1. **B3 header bulk-inject ↔ TÜM public/isletme hand-edit** — B3 `.acct-logout` anchor'lı **~93 gerçek public sayfaya** dokunuyor (DOĞRULANDI). Bu küme dada-revize'nin 8 sayfasının HEPSİNİ + `giris-v1` (B1) + `mekan-detay` (C2) + item-7 ailesini KAPSIYOR. → **B3 MUTLAK EN SON.** LEAD, public + isletme şeritleri el-düzenlemesini BİTİRDİKTEN sonra B3 sweep'i çalıştırır (byte-identical, idempotent header enjeksiyonu — biz-only blok zaten `has-business` JS'iyle uyumlu). Erken çalışırsa el-edit'leri ezme/lost-update riski.
2. **Admin-B nav görünürlüğü → `sa-shell.js` SECTIONS 1 satır** — kanonik dosya. **YALNIZ LEAD, sıralı**, admin-content sayfaları var olduktan SONRA. Teammate dokunmaz.
3. **dada-revize item-7 tab tutarlılığı (cross-page, 5 dosya)** — `besin-degerleri` + 4 rehber sayfa tutarlı süpürülmeli. **public şeridinde TEK yazar** yapar (5 dosyayı bölme; tek elden tutarlılık). Karar (tab ekle vs konsolide) önce netleşmeli.
4. **Item-4 yeni sayfa bağımlılığı** — "Tümünü Gör" CTA'sı `mutfaga-giris-liste-v1.html`'i ister; sayfa yaratılmadan CTA 404. Aynı şeritte (public) sırayla: önce yeni sayfa, sonra CTA.
5. **giris-v1 çifte temas** — B1 (isletme) düzenler + B3 (LEAD) header sweep'e dahil. Sıra: B1 → … → B3. (Auth sayfası B3 self-selection'da atlanabilir; LEAD sweep sırasında teyit etsin.)
6. **mekan-detay çifte temas** — C2 (isletme) bandı ekler + B3 set'inde. Sıra: C2 → B3.

---

## EFOR / ÖNCELİK TABLOSU

| Batch | Toplam efor | Öncelik | Sorulara bağlı? |
|---|---|---|---|
| Admin-A (form) | M (4 alt-iş, tek dosya, kanonik referanslı) | **Yüksek** | A5 hariç başlanabilir |
| İşletme (B1-C2) | M-L (8 dosya, planlı) | **Yüksek** | Hayır (plan hazır) |
| Public (dada-revize) | L (8+ sayfa, item-7 cross-page) | Orta-Yüksek | item-7 & item-4 karar bekler; 9 TBD |
| Admin-C (rapor) | M-L (tek dosya) | Orta | C-scope karar bekler |
| Admin-B (içerik) | L (yeni 3-5 sayfa + nav) | Orta | B-nav karar bekler |
| **B3 sweep (LEAD)** | M (mekanik, ~93 sayfa idempotent) | **EN SON** | Hayır |

---

## ÖNERİLEN TEAM YAPISI

**LEAD (koordinasyon, KOD YAZMAZ):**
- Şerit ataması + sıra denetimi + şerit-içi self-test toplama.
- Kanonik tek dokunuş: `sa-shell.js` SECTIONS nav satırı (Admin-B sayfaları hazır olunca).
- **EN SON: B3 header sweep** — public + isletme el-edit'leri bitince ~93 sayfaya uniform header enjeksiyonu (handoff B3 spec'i; idempotent, biz-only).
- Açık soruları Beyar→Yasin'e taşı (A5, item-7 tab, item-4 sayfa, B-nav, C-scope, 9-TBD).

**TEAMMATE ŞERİTLERİ (her biri 5-6 task, targeted edit, full-file write YASAK):**

| Teammate | Şerit | Task'lar (5-6) | Dosyalar |
|---|---|---|---|
| T1 | `public` | dada-revize 1,2,3,5,6 + (item-7 cross-page ayrı dikkat) | bugun-ne-pisirsem, tarif-bulucu, kesfet, ansiklopedi, olcu-birimleri |
| T1b/T1 | `public` (devam) | item-4 (slider + YENİ liste sayfa), item-7 (5 dosya sweep), item-8 (sezon ramazan) | mutfaga-giris(+liste), besin ailesi ×5, sezon-v1 |
| T2 | `isletme` | B1, K1, W1, B2(4 dosya tek inline desen), C2 | giris, hesabim, isletme-ekle, mekan-panel·rez·ayar·menu, mekan-detay |
| T3 | `admin-form` | A1, A2, A3, A4 | sa-admin-tarifler-form |
| T4 | `admin-content` | liste sayfa, Grup-A blok editör, Grup-B alan-form (sözlük+sofra), Grup-C tablo (ops.) | YENİ sa-admin-icerik* |
| T5 | `admin-report` | C-1…C-5 | sa-admin-raporlar |

> **Not:** `public` şerit en ağır (8+ madde + 1 yeni sayfa + 5-dosya cross-page). İstenirse 2 teammate'e bölünebilir AMA item-7 ailesi (5 dosya) TEK kişide kalmalı (tutarlılık) ve ikisi de aynı dosyaya yazmamalı — örn. T1=madde 1/2/3/5/6, T1b=madde 4/7/8. Dosya kümeleri ayrık.

---

## YÜRÜTME SIRASI (önerilen)

1. **Paralel başlat (sorulara bağlı olmayan):** Admin-A (T3) · İşletme B1/K1/W1/B2/C2 (T2) · Public sorulara-bağsız maddeler 1/3/5/6/8 (T1).
2. **Karar dönünce:** item-7 (T1b, tab kararı) · item-4 yeni sayfa · Admin-B (T4, nav onayı) · Admin-C (T5, scope) · 9-TBD.
3. **LEAD nav satırı** — Admin-B sayfaları hazır olunca.
4. **EN SON — LEAD B3 sweep** — public(T1/T1b) + isletme(T2) el-edit'leri %100 bitince. Bu adımdan önce hiçbir public header'a dokunulmaz.

## AÇIK SORULAR (Beyar → Yasin; tahmin etme)
1. **A5** — eski panelde tarif/içerik için tam olarak ne yapılabiliyordu (ek alan mı, moderasyon-görünüm mü)?
2. **item-7** — 4 rehber sayfaya `.bd-tab` çubuğu mu eklensin, link-out konsolidasyon mu korunsun?
3. **item-4** — "Tümünü Gör" için yeni konu-liste sayfası onayı (mutfaga-giris-liste).
4. **B-nav** — İçerik ayrı modül + `sa-shell.js` nav satırı onayı, yoksa Sayfalar'a makale tipi.
5. **C-scope** — rapor "daha detaylı"da öncelik (modül/finans/moderasyon/coğrafya/tarih-aralığı).
6. **9-TBD** — dada-revize 9. madde içeriği.
