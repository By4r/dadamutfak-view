# CİLA-2 FAZ 3 — SENTEZ (site geneli tutarlılık + kurumsal + final QA)

> Takım: cila2-faz3 (lead + kanon + uygula-b + qa + ramazan) · 2026-06-12/13
> 26 görev, tamamı kanıtlı kabul. Değişim: 65 dosya, +2569/−507 + 1 yeni sayfa.
> Envanter **70 üretim sayfası** (69 + sefler-v1).

---

## 1. HERO/BREADCRUMB KANONU (fazın ana işi)

- **Kılavuz §2f doğdu:** `.rd-crumb` TEK breadcrumb kanonu (house-ikon + chevron
  ayraç + aria) · hero 3 varyant — H1 landing/hub koyu-overlay (`.lst-top/.lst-hero`
  + sağlık `.sh-top` + hub `.vhub-hero`) / H2a editoryal `.art-hero` + H2b yapısal
  `.rd-top`+künye / H3 kompakt fonksiyonel — + "hak-ediş" kuralı (keşif→H1,
  kayıt→H2, görev→H3). Krem-zemin ORTALI head YASAK ilan edildi.
- **Tek ağır patch: saglik-testler** (patron şikayeti) — krem ortalı head →
  saglik-hub'ın yeşil-tint koyu hero diline. test-detay H3'e normalize edildi.
- **Nefes kanonu (Beyar feedback'i):** koyu hero'larda header-altı +16px
  (mobil +12px) → 17 H1 sayfasında uniform 128/74px.
- **Crumb simetrisi:** 15 sayfa (9 Set B + 6 Set A) metin-formdan house-ikon
  kanonuna çekildi. Site genelinde breadcrumb artık tek form.
- Shop ailesi + panel bilinçli kapsam dışı (ayrık kabuk korundu).

## 2. KURUMSAL DÜZELTMELER

- **Hakkımızda "Yasal Metinler"** (patron: "çok kötü"): kök neden eski class'ların
  CSS'inin hiç olmamasıydı → 9 belge site kart dilinde 3'lü grid (İhlal Bildir →
  yasal#b4 korundu). Önce/sonra SS'li.
- **Şefler / Şef Ol:** 🆕 `sefler-v1.html` doğdu (şef dizini — envanter 69→70);
  "Şef Ol"→tarif-ekle (sitenin "tarifini paylaş" dili; patron m12 kararına kadar
  ara çözüm). Site-geneli footer sweep'iyle 40+ dosya kanonik hedeflere bağlandı.
- **Anasayfa:** "Günün Tarifi" Keşfet sonrasına taşındı (Patron Bekleyenler #1
  çözümü; ritim beyaz→koyu→krem→koyu→beyaz) · Dada Store dropdown'ı _shell
  kanonuna eşitlendi (Beyar yakaladı).
- **lg-gate yayılımı:** mekan-detay + ansiklopedi-detay + mutfaga-giris-detay
  kaydet/yorum kapıları (?auth=0/1 probe'lu).

## 3. BEYAR CANLI FEEDBACK TURU (6 iş, hepsi kapandı)

1. reklam-ver hero bitişikliği → nefes kanonu (#16) ✅
2. Dada Store dropdown tutarsızlığı (#19) ✅
3. BNP mod rayı "siyah border" (#20) — kök neden: tanımsız focus → tarayıcının
   native siyah outline'ı; domates ring + foto-öncelikli kartlar ✅
4. Ansiklopedi iki katmanlı İA (#21): A-Z → görselli kategori kartları →
   mevcut madde akordeonları; sonra #26 ile Excel'deki 19 GERÇEK Sözlük
   kategorisine geçirildi ✅
5. Tarif-bulucu giriş navigasyonu (#22): yetimdi → mega menü CTA (57 sayfa) +
   tarif-liste köprüsü, 5 giriş noktası ✅
6. dz-card "Profili Gör" sadeleştirme (#23): buton → ince metin-link ✅

## 4. 🌙 RAMAZAN MODU — PATRON ONAYINA SUNULAN KONSEPT

Eski sitede iftar/sahur iki kopuk sayfaydı (sahur sayacı bile iftara sayan
kopya bug'lı); yeni konsept TEK mod + OTOMATİK döngü:
- Öneri: dismissible üst banner ("Belki sonra" → bir daha sormaz).
- Mod aktif: header altı koyu-warm bar, ay motifi + canlı sayaç; iftar
  20:31 → Sahura, imsak 03:42 → İftara otomatik flip (mock vakitler, çalışır JS).
- Sözleşme: `?ramazan=1/0` + localStorage `dm_ramazan` + `body.is-ramazan`
  (auth pattern ikizi). `?ramazan=0` → site TAMAMEN normal (SS kanıtlı).
- Kapsam: 5 sayfa (anasayfa, tarif-liste, tarif-detay, BNP, sezon) — site-geneli
  yayılım PATRON ONAYI sonrası (_shell sweep).
- **Canlı demo:** `tarif-liste-v1.html?ramazan=1&demo=1` (sayaç saniyelerle
  akar, flip izlenir). Rapor: `outputs/cila2-faz3-ramazan-rapor.md`.

## 5. KATEGORİ EXCEL'İ (Faz 4 girdisi)

`tasks/KategoriEkle.xlsx` (11 sheet, gerçek üretim kategorileri) alındı;
sheet→modül haritası `tasks/kategori-haritasi.md`. Faz 3'te tek istisna:
ansiklopedi 19 gerçek kategoriyle kuruldu. Yapısal farklar Faz 4 İA kararı
ister: BNP mod 8→14 · püf kategorileri soru-format · keşfet 6'lı · ölçü 2 seviye.
SEO meta alanları dolu → Laravel seed + meta borcunun kaynağı.

## 6. FİNAL QA SONUCU

- **Link probe:** iç 404 = 0; ölü CTA'lar kablolandı; footer kablolama sweep'i
  45 dosya (12 yasal link + şef linkleri; shop salt-href, panel hariç).
- **Reklam Yerleşimleri:** reklam-ver'e 9 yerleşimli "Yerleşimler" bölümü
  (3 aşamalı yolculuk + wireframe + MOCK metrikler).
- **Ölü CSS:** BNP −68 + puf-ekle −34 satır wizard kalıntısı (bit-aynı render).
- **FİNAL RESPONSIVE SÜPÜRME:** 70 sayfa × ?auth=1/0 × 390px + tüm revizyon
  re-probe'ları (ramazan ×2 durum dahil) = **0 yatay taşma · 0 çift sabit
  katman · 0 konsol hatası**. Süreçte 1 bulgu (sefler taşması) bulundu →
  düzeltildi → re-probe temiz.
- **Lead bağımsız denetimi (#14):** 12+ sayfa görsel + iki set numstat/selector
  taraması + sweep mühürleri — CSS-yutma/mojibake **sıfır**
  (`outputs/cila2-faz3-lead-denetim.md`).

## 7. LOKAL İNCELEME LİSTESİ (server: `python3 -m http.server 8765`)

| Ne | Link |
|---|---|
| Saglik-testler yeni hero (patron şikayeti çözümü) | localhost:8765/mockups/saglik-testler-v1.html |
| Reklam-ver nefes + Yerleşimler | localhost:8765/mockups/reklam-ver-v1.html#yerlesimler |
| Hakkımızda yasal grid | localhost:8765/mockups/hakkimizda-v1.html |
| Anasayfa (Günün Tarifi taşındı + Store dropdown) | localhost:8765/mockups/anasayfa-portal-v3a.html?dd=1 |
| 🆕 Şefler dizini | localhost:8765/mockups/sefler-v1.html |
| BNP mod rayı (yeni seçili durum) | localhost:8765/mockups/bugun-ne-pisirsem-v1.html |
| Ansiklopedi iki katman + gerçek kategoriler | localhost:8765/mockups/ansiklopedi-v1.html (?harf=B dene) |
| Tarif-bulucu mega CTA | herhangi bir sayfada Tarifler menüsü ?dd=1 |
| dz-card sade link | localhost:8765/mockups/diyetisyen-dizin-v1.html |
| 🌙 Ramazan modu CANLI DEMO | localhost:8765/mockups/tarif-liste-v1.html?ramazan=1&demo=1 |
| lg-gate örneği | localhost:8765/mockups/mekan-detay-v1.html?auth=0 |

Teammate raporları: `outputs/cila2-faz3-{kanon,uygula-b,qa,ramazan}-rapor.md`
+ lead denetimi `cila2-faz3-lead-denetim.md`.

## 8. BİLİNEN SINIRLAMALAR (zorunlu bölüm)

1. **Ramazan modu yalnız 5 sayfada** — diğer sayfalarda `?ramazan=1` etkisiz;
   site-geneli yayılım patron onayı sonrası (_shell sweep, Faz 4).
2. **Açık-dropdown SS'leri headless'ta alınamıyor** (hover simülasyonu yok) —
   anasayfa Dada Store dropdown'ını canlıda hover'la teyit et (markup verbatim
   + yapısal probe temiz).
3. **Ansiklopedi'de 15/19 kategori "yakında"** boş durumunda — gerçek madde
   verisi yalnız 4 kategoride mock'lu; Faz 4 veri işi.
4. **"Şef Ol"→tarif-ekle ara çözümdür** — patron m12 kararı farklı çıkarsa tek
   href sweep'iyle değişir. Şef profili tıklamaları mutfak-defteri'ne gider
   (ayrı şef-profil sayfası yok — bilinçli).
5. **onclick-only kart deseni** (dz-card, p-card): klavyeyle kart navigasyonu
   yok — site-geneli mevcut desen, Laravel fazı a11y backlog'u.
6. **Reklam Yerleşimleri metrikleri MOCK** — satış argümanı için temsilî.
7. **Canlı reklam slotu mock'u eklenmedi** (anasayfa/tarif-detay) — wireframe
   kartlar yerleşimi gösteriyor; istenirse mini iş.
8. **BNP'de görev-dışı ~40 satır ölü CSS** (.pick*/.res-*) bilinçli bırakıldı
   (canlı selektörlerle iç içe; Blade dönüşümünde trim).
9. **tarif-detay-v1-headA.html** arşiv varyantı güncellenmedi (envanter dışı,
   footer'ında eski linkler olabilir).
10. **Sahiplik ihlali kaydı:** kanon, nefes batch'inde Set B'deki mekan-liste'ye
    dokundu — içerik doğruydu, çakışma olmadı, lessons'a işlendi.

## 9. COMMIT ÖNERİSİ (atılmadı — Beyar onayı bekliyor)

```
git add -A
git commit -m "feat(mockup): cila-2 faz 3 — hero/breadcrumb kanonu (§2f, saglik-testler patron fix + nefes 17 H1 + crumb simetri) + kurumsal (yasal grid, sefler-v1 YENİ, Günün Tarifi taşıma, Store dropdown) + Beyar feedback turu 6 iş + ansiklopedi 2-katman İA gerçek kategorilerle + tarif-bulucu girişleri (mega CTA 57 sayfa) + RAMAZAN MODU konsepti (5 sayfa, patron onayına) + footer/şef sweep 45 dosya + final QA 70 sayfa 3×0 (envanter 69→70)"
```

Push kararı ayrıca (Pages patron turu için gerekirse).
