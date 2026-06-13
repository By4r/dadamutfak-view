# CİLA-2 FAZ 5-SONRASI REVİZE TURU — Sentez & İnceleme

> Tarih: 2026-06-13 · Takım: `faz5-revize` (lead = ana session + 4 teammate) ·
> Saf-frontend mockup · **COMMIT ATILMADI** (öneri §8, Beyar onayı bekliyor).
> Teammate raporları: `outputs/faz5-revize-{header-fix,kabuk-renk,form-akis,bnp-defter-pdf}-rapor.md`

## 0. Kurumsal kimlik kılavuzu projeye alındı

Beyar'ın kurumsal kılavuzu projeye kopyalandı (`tasks/corporate-identity-guideline.pdf`,
56 sayfa) ve resmi renk paleti çıkarıldı (`tasks/kurumsal-renk.md`, PyMuPDF s.17-18):

- **Ana renkler:** domates 7597 C `#e14827` · koyu Process Black `#211E16` · krem P 15-1 C `#efe5d3`
- **Alternatif renkler:** mor 2582 C `#b14fc5` · açık yeşil 346 C `#6cca98` · koyu yeşil 7482 C `#009d4f` · **petrol 3155 C `#006072`**
- **Font:** Gilroy (projede zaten kullanımda).

**🔑 Kritik teyit:** Faz 5'te DadaAkademi'ye uygulanan **petrol `#006072`, kurumsal kılavuzun
resmi Alternatif Renk'i (Pantone 3155 C) ile BİREBİR.** Petrol kararı kurumsal kimlikten
sapma DEĞİL — doğrulandı. Bu turda akademi rengi değişmedi (Beyar kararı + kurumsal teyit hizalı).

## 1. Yapılan işler — 7/7 madde kanıtlı kabul

| # | İş | Sahip | Kanıt | Durum |
|---|----|-------|-------|-------|
| 1 | Duplicate menü temizliği (Store/Akademi ana menüden kalkar, topbar kapısı kalır) | header-fix | _shell + 56 sweep + 2 divergent patch = 58 sayfa; global negatif grep=0; iki md5 idempotent; 6-aile render probe | ✅ |
| 2 | DadaAkademi kurumsal renk teyidi | kabuk-renk | petrol `#006072`=80 token kullanım, domates sızıntı=0, render rgb(0,96,114)×6 | ✅ |
| 2b | akademi çift "Ana Site" kaldır | kabuk-renk | sağ-üst `ak-back` HTML+ölü CSS silindi, sol-üst `tb-back` dönüş tek kaldı | ✅ |
| 3 | dada-shop section keskinleştir | kabuk-renk | muddy warm-bej `#F7F1E6`→nötr v3a `#f9f9f9`; computed-style v3a ile birebir; hero/bambu/bej-kart kimlik korundu | ✅ |
| 4 | Form 2-kolon sticky (diyetisyen-ol + sef-ol) | form-akis | sticky-broken kök-neden çözüldü; yükseklik −427/−404; sticky top=130; 390 taşma=0; iki sayfa birebir grid | ✅ |
| 5 | BNP sticky tray + her-yemek-process + Menülerime Git | bnp-defter-pdf | sağ sticky `sc-layout` top:128; cookmode `.st-list` miras her yemek kendi adımı; cookdone "Menülerime Git"→defter | ✅ |
| 6 | haftalik "Ekle" hücre fix | bnp-defter-pdf | kök-neden `.mc-add` width tanımsız→22px sliver; width:100%+nowrap→134px ortalı kutu | ✅ |
| 7 | Markalı client-side PDF | bnp-defter-pdf | jsPDF + Gilroy-Medium.ttf gömülü (TR glyph); domates bant+logo, reyon grup, krem pill; gerçek 88KB PDF üretildi | ✅ |

## 2. Kanıtlı kabul protokolü (lead bağımsız doğrulama)

Söze GÜVENİLMEDİ. Her madde lead tarafından bağımsız doğrulandı:
- **grep:** global negatif grep (Akademi nav-item=0, Store kanonik=0, Store chevron-divergent=0).
- **tasarım-gözü SS:** lead kendi channel:chrome (bash, MCP paint-timeout nedeniyle) ile
  10 yüksek-çöz kare çekti: shop section geçişleri, akademi petrol+tek-dönüş, form sticky
  mid-scroll, bnp cook/cookdone/sticky-tray, haftalik ekle, markalı PDF (PNG'ye render), patched
  sayfa desktop+drawer. Tümü onaylandı.
- **md5 idempotency:** header-fix ana sweep BEFORE==AFTER `b6134ca1…`, Bulgu#1-sonrası tüm-set
  BEFORE==AFTER `ba7ba0ce…` (dış md5, script sayacı değil).

## 3. 🔴 KONSOLİDE DENETİM BULGUSU (yakalanıp kapatıldı)

**Bulgu #1 — 2 divergent sayfa sweep'e hiç girmedi (lead global grep yakaladı):**
`mutfaga-giris-v1` + `olcu-birimleri-v1` Akademi nav-item + Store chevron-divergent taşıyordu.
Kök neden: bu 2 sayfada Store nav-item DIVERGENT (`Dada Store <i chevron>` + 4-kategorili
dropdown, hem desktop hem drawer) — header-fix'in kanonik D1/D2 anchor'ına uymadı → sayfa hedef
listesine HİÇ girmedi. **header-fix'in negatif grep'i SET-RÖLATİF olduğu için (sadece işlenen 55
dosya) bu 2 atlanan sayfayı görmedi = false-clean.** Lead'in BAĞIMSIZ GLOBAL grep'i yakaladı.
→ header-fix script'i divergent-aware yaptı (D1_DIV/D2_DIV), 2 sayfa patch'lendi, global grep=0,
drawer-world=58, render teyitli. **KAPANDI.**

## 4. Bilinen Sınırlamalar (PEŞİNEN — Beyar incelemesi için)

1. **mutfaga-giris-v1 + olcu-birimleri-v1 eski kategori drift'i (T1 DIŞI, yeni flag):** Bu 2
   sayfanın drawer "Tarifler" alt-menüsü ESKİ kategori etiketleri taşıyor (Çorbalar/Ana
   Yemekler/Et Yemekleri… vs kanonik Çorba/Kırmızı Et/Beyaz Et…). **Faz-4 kategori entegrasyonu
   bu 2 sayfaya da değmemiş** (aynı kronik divergence). Bu tur yalnız Store/Akademi çiftini çözdü;
   kategori drift'i AYRI iş → **Beyar kararı** (Faz 6 tutarlılık taraması adayı).
2. **PDF jsPDF CDN bağımlı** — offline'da print fallback'e düşer (mockup düzeyi kabul).
3. **BNP cook adımları mock şablon** — gerçek yemek-bazlı adımlar backend/veri işi (Laravel fazı).
4. **Tablet 641–1024px:** topbar kapı + drawer-foot kapı ikisi de erişilebilir (görsel çift
   DEĞİL, ayrı bağlam); istenirse tablet drawer-foot kapı gizleme ayrı mini-iş.
5. **shop nötr alternasyon v3a kadar subtle** — referansa sadık; daha keskin istenirse
   site-geneli token kararı (Beyar).
6. **Site-geneli sticky-broken (form-akis kök-neden bulgusu, §5):** ayrı iş, aşağıda.

## 5. 🟡 SİTE-GENELİ LATENT BULGU — sticky-broken (Beyar kararı)

form-akis kök-neden buldu: shell'deki `html,body{overflow-x:hidden}` body'yi scroll-container
yapıp **`position:sticky`'yi site genelinde öldürüyor**. diyetisyen-ol/sef-ol page-local
`overflow-x:clip` override ile çözüldü (yatay keser, dikey sticky'yi diriltir). **Aynı bug
diğer sticky sayfaları da etkiliyor** (`.lst-side` facet paneli vb. de yapışmıyor olabilir).
→ Bu turda YAYILMADI (kapsam + ayrı doğrulama ister). **Beyar kararı:** `overflow-x:clip`
fix'ini shell'e mi (site-geneli) yoksa sticky-talep eden sayfalara tek tek mi yaymalı?
Faz 6 adayı.

## 6. Lokal inceleme link listesi (server: `http://localhost:8765/mockups/`)

> ⚠️ Tüm sayfalarda duplicate menü temizliği AKTİF (58 sayfa). akademi-v1 + dada-shop ayrı kabuk.

- **Duplicate temizliği (örnek):** `tarif-liste-v1.html` · `saglik-hub-v1.html` ·
  `mutfaga-giris-v1.html` (patched) · `olcu-birimleri-v1.html` (patched) — üst menü 4 içerik bölümü, topbar markalı kapı
- **Akademi:** `akademi-v1.html` — petrol kimlik, tek dönüş (sol-üst topbar)
- **Shop:** `dada-shop-v1.html` — nötr-keskin section + warm hero/bambu korundu
- **Form 2-kolon:** `diyetisyen-ol-v1.html` · `sef-ol-v1.html` — sağ sticky süreç paneli
- **BNP sticky menü:** `bugun-ne-pisirsem-v1.html?tab=modlar` → mod içi sağ "Menü Tepsisi" sticky
- **BNP cook:** `bugun-ne-pisirsem-v1.html?cook=1` — her yemek kendi adımı + bitişte "Menülerime Git"
- **Haftalik ekle:** `haftalik-menu-v1.html` — boş hücre "+ Ekle" düzgün kutu
- **Markalı PDF:** `alisveris-listesi-v1.html` → "Listeyi İndir" → DadaMutfak PDF iner
  (çıktı: `outputs/ss-faz5-revize-bnp/test-list.pdf`)

## 7. Çıktı dosyaları
- `tasks/corporate-identity-guideline.pdf` + `tasks/kurumsal-renk.md` (YENİ)
- `outputs/faz5-revize-{header-fix,kabuk-renk,form-akis,bnp-defter-pdf}-rapor.md`
- `outputs/ss-faz5-revize-bnp/` (cook/haftalik/PDF SS + gerçek PDF)
- `mockups/.ss-scratch/{hf,fa-*}` (render probe SS'leri)

## 8. COMMIT ÖNERİSİ (Beyar onayı — atılMADI)

58 dosya değişti (56 sweep 22/6 + 2 divergent patch 22/20 + _shell 22/6 + içerik teammate'leri:
bnp 272/97, diyetisyen-ol/sef-ol layout, haftalik, alisveris PDF + akademi/dada-shop).

```
feat(mockup): faz5-revize — duplicate menü temizliği + kurumsal renk teyit + shop section + form 2-kolon + BNP akış + markalı PDF

- header: DadaStore/DadaAkademi ana menüden kalktı (topbar kapı kanon), 58 sayfa
  (56 sweep + 2 divergent patch mutfaga-giris/olcu); global negatif grep=0, md5 idempotent
- kurumsal kimlik kılavuzu projeye alındı (tasks/kurumsal-renk.md); petrol #006072
  kurumsal Pantone 3155 C ile birebir teyit (DadaAkademi rengi sapma değil)
- akademi: çift "Ana Site" kaldırıldı (tek dönüş); shop: muddy bej→nötr v3a section ritmi
- form: diyetisyen-ol + sef-ol 2-kolon sticky (overflow-x:clip ile sticky-broken kök-neden fix)
- BNP: sağ sticky menü tepsisi + cookmode her-yemek-process + "Menülerime Git"; haftalik "Ekle" fix
- alisveris: markalı client-side PDF (jsPDF + Gilroy gömülü, TR glyph)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

> Beyar onayıyla `deploy`/push ayrıca. Faz 6 girdileri: §4.1 kategori drift (2 sayfa) +
> §5 site-geneli sticky-broken + bekleyen patron kararları (handoff).
