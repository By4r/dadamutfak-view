# CİLA-2 Faz 1 — SIRLAR Raporu (teammate: sirlar)

> Görev #2. Mutfak Sırları ailesi: Mutfağa Giriş, Püf Noktaları, Ölçü Birimleri,
> yeni "Mutfak Ansiklopedisi" modülü + dropdown. Tüm üretim `mockups/` altında.

## Özet — 8 iş tamam

| # | İş | Durum |
|---|----|-------|
| 1 | Dropdown ilk öğe → "Mutfağa Giriş" (+ yeni Ansiklopedi öğesi) | ✓ (_shell + 4 kendi dosyam) |
| 2 | Mutfağa Giriş IA yeniden kurulumu (bölümler + tıklanabilir rota) | ✓ |
| 3 | mutfaga-giris-detay-v1.html (yeni — TD anatomisi) | ✓ |
| 4 | Püf detay: tag-ikon slider + sağ uçta paylaş popover | ✓ |
| 5 | Püf 2 sayfa tipi: LİSTE (puf-noktalari-v1) + DETAY (yeni) | ✓ |
| 6 | Püf detayına rev-* yorum bileşeni (verbatim miras) | ✓ |
| 7 | YENİ MODÜL "Mutfak Ansiklopedisi": LİSTE + DETAY | ✓ |
| 8 | Ölçü Birimleri one-page (smooth-scroll tab) + markalı inline-SVG preview | ✓ |

## Değişen dosyalar
- `mockups/_shell.html` — Mutfak Sırları dropdown (header + drawer) güncellendi
- `mockups/mutfaga-giris-v1.html` — dropdown + IA yeniden kurulumu (rota + kütüphane)
- `mockups/puf-noktalari-v1.html` — dropdown + **salt LİSTE'ye indirgendi** (detay görünümü + ?detay toggle JS kaldırıldı, kartlar yeni detaya bağlandı)
- `mockups/olcu-birimleri-v1.html` — dropdown + one-page tab nav + Standart Ölçüler SVG bölümü
- `mockups/mutfak-sirlari-v1.html` — dropdown (header + drawer)

## Yeni dosyalar (4)
- `mockups/mutfaga-giris-detay-v1.html` — ders detayı (TD masthead: rd-top/rd-crumb/rd-gallery tek-sahne/kunye-col + iki kolon ders gövdesi: art-prose + sticky "Ders İçeriği" + eğitmen kartı + rev-* yorumlar + ilgili tarifler + sıradaki ders; lightbox + video-modal + actbar)
- `mockups/puf-noktasi-detay-v1.html` — düz blog detay (art-hero uzun-form + **etiket-paylaş rayı** + rev-* yorumlar + ilgili tarifler + ilgili püfler; actbar + lightbox)
- `mockups/ansiklopedi-v1.html` — Ansiklopedi LİSTE (lst-top koyu hero + arama + A-Z bar + kategori chip + disc-card madde gridi + sayfalama)
- `mockups/ansiklopedi-detay-v1.html` — Ansiklopedi DETAY "Barbunya" (TD masthead + yeşil künye + seo-prose iki kolon: Nedir/Ne işe yarar/Faydaları/Saklama + besin değeri kutusu + ilgili tarifler + ilgili maddeler)

## Tasarım kararları (miras-önce)
- **Dropdown yeni sıra:** Mutfağa Giriş (graduation-cap) · Püf Noktaları · **Mutfak Ansiklopedisi (seedling)** · Sözlük · Ölçü Birimleri.
- **Mutfağa Giriş IA (iş 2):** Eski sitenin section IA'sı kuruldu — "Konu Kütüphanesi" altında başlık-başlık bloklar (Temel Pişirme Teknikleri / Hazırlık & Doğrama / Hamur & Fırın / Sos, Çeşni & Güvenlik), her blokta **alt-kategori chip filtresi** + disc-card gridi. "Önerilen Rota" karışıklığı çözüldü: rota = **sıralı öğrenme yolu (8 adım, 6'dan fazla), her adım TIKLANABİLİR → ders detayına gider**; kütüphane = aynı derslerin başlığa göre tamamının görüldüğü gezinme. Rota lead'i ilişkiyi açıkça anlatıyor + `#kutuphane`'ye köprü veriyor.
- **Mutfak Ansiklopedisi adı:** "Mutfak Ansiklopedisi" önerildi (malzeme maddesi: nedir / ne işe yarar / faydaları; SEO odaklı, yemek.com sözlük formatı). `sozluk-v1.html`'e DOKUNULMADI.
- **Detay sayfaları:** mutfaga-giris-detay + ansiklopedi-detay tarif-detay anatomisinden (rd-gallery tek-sahne + kunye-col + rd-sec-head + iki kolon ritmi + lightbox) türedi. puf-noktasi-detay "düz blog" olduğu için (iş 5 metni) mevcut kabul görmüş art-hero uzun-form dilini sürdürür + rev-* yorum.
- **Paylaş popover (iş 4):** etiketler `fa-tag` ikonlu chip slider (`.row-nav`/`.row-track` + ok), paylaş satırın **sağ ucunda** tek buton; hover/tık → kurumsal domates renk + popover (X · WhatsApp · e-posta · mesaj · kopyala), her kanal kendi marka renginde hover. actbar paylaş pattern mirası.
- **Ölçü one-page (iş 8):** hero'da 4 tab (Dönüştürücü/Tablolar/Standart Ölçüler/Fırın) → JS `scrollIntoView` smooth + scroll-spy aktiflik; `scroll-margin-top:120px` ile fixed header hizası. **Standart Ölçüler** bölümü 6 markalı **inline SVG illüstrasyon** (su/çay bardağı, kahve fincanı, 3 kaşık — üzerinde "dadamutfak" wordmark); kart hover/tık → büyük markalı ürün önizleme paneli. Harici servis YOK, SVG'ler elde üretildi.

## Kanıt SS yolları (mockups/.ss-scratch/cila2/sirlar/)
- `giris-1440.png` — Mutfağa Giriş liste (rota + kütüphane bölümleri)
- `giris-detay-1440.png` · `giris-detay-500.png` — ders detayı masaüstü + mobil
- `puf-detay-1440.png` — püf blog detay
- `puf-detay-rail-final.png` — etiket slider + paylaş popover (X/WA/mail/mesaj/kopyala görünür)
- `puf-liste-1440.png` — salt liste
- `olcu-1440.png` — one-page tab nav + tablolar + SVG kartları
- `olcu-std-preview.png` — markalı SVG ürün önizleme (Su Bardağı)
- `ansiklopedi-liste-1440.png` · `ansiklopedi-detay-1440.png`
- `probe390-result.png` — 390px taşma probe sonucu

## Probe sonuçları
- **390px yatay taşma:** 8 sayfanın HEPSİ `scrollWidth=375` (391 eşiğinin altında) → **SIFIR taşma**.
- **Paylaş popover:** force-open probe ile X/WhatsApp/mail/mesaj/kopyala kanalları + ok buton doğrulandı (`puf-detay-rail-final.png`). Etiket chip genişlik bug'ı (shell `.row-track>*{width:274px}` mirası) `width:auto` override ile düzeltildi → chip'ler içerik genişliğinde.
- **SVG önizleme:** force-open probe ile "DadaMutfak Su Bardağı · 200 ml" markalı büyük SVG paneli doğrulandı (`olcu-std-preview.png`).
- **Mobil tek-sabit-katman:** detay sayfalarında `window.__bottomStrips=['#actbar']` kaydı + shell yöneticisi; mobil SS'te çerez açıkken nav+actbar bastırılıyor (giris-detay-500).
- **CSS `*/` tuzağı:** tüm yeni dosyalarda `grep '*/[^ ]'` temiz.
- **"Dada Denedi":** kendi dosya setimde 0 (set zaten içermiyordu; yeni içerik üretmedi).

## SİTE-GENELİ DROPDOWN YAYILIM — faz sonu için hazır pattern
Dropdown değişikliği ŞİMDİ yalnız `_shell.html` + 4 kendi dosyamda + 4 yeni dosyada yapıldı. Kalan ~55 sayfaya (sozluk-v1 dahil — bu yalnız **header/drawer chrome dropdown'ı**, sozluk'un kendi BODY'si DEĞİL) lead şu **idempotent** script'i çalıştırabilir (zaten güncellenmiş dosyalar guard ile atlanır):

```python
import glob
DESK_OLD='<i class="fa-solid fa-fire-burner"></i> <span>Temel Teknikler<small>Haşlama, sote, fırınlama</small></span>'
DESK_NEW='<i class="fa-solid fa-graduation-cap"></i> <span>Mutfağa Giriş<small>Sıfırdan temel teknikler</small></span>'
DRW_OLD='<i class="fa-solid fa-fire-burner"></i> Temel Teknikler'
DRW_NEW='<i class="fa-solid fa-graduation-cap"></i> Mutfağa Giriş'
DESK_SOZ='            <a href="sozluk-v1.html"><i class="fa-solid fa-book-open"></i> <span>Sözlük<small>Mutfak terimleri</small></span></a>'
DESK_INS='            <a href="ansiklopedi-v1.html"><i class="fa-solid fa-seedling"></i> <span>Mutfak Ansiklopedisi<small>Malzemeleri tanı: faydası, kullanımı</small></span></a>\n'+DESK_SOZ
DRW_SOZ='        <a href="sozluk-v1.html"><i class="fa-solid fa-book-open"></i> Sözlük</a>'
DRW_INS='        <a href="ansiklopedi-v1.html"><i class="fa-solid fa-seedling"></i> Mutfak Ansiklopedisi</a>\n'+DRW_SOZ
for f in glob.glob('mockups/*.html'):
    s=open(f,encoding='utf-8').read(); o=s
    if DESK_OLD in s: s=s.replace(DESK_OLD,DESK_NEW)
    if DRW_OLD in s and DRW_NEW not in s: s=s.replace(DRW_OLD,DRW_NEW)
    # Ansiklopedi öğesini yalnız henüz eklenmemişse ekle
    if 'ansiklopedi-v1.html' not in s:
        if DESK_SOZ in s: s=s.replace(DESK_SOZ,DESK_INS)
        if DRW_SOZ in s: s=s.replace(DRW_SOZ,DRW_INS)
    if s!=o: open(f,'w',encoding='utf-8').write(s); print('updated',f)
```
Not: guard'lar idempotent — bu raporun 9 dosyası tekrar dokunulmaz; sadece eski "Temel Teknikler" dropdown'lı sayfalar güncellenir.

## Beyar incelemesi bekleyenler
1. **Modül adı:** "Mutfak Ansiklopedisi" önerisi. Alternatif: "Malzeme Rehberi" / "Bil Bakalım" / "Mutfak Kütüphanesi". Onay/değişim Beyar'da.
2. **mutfaga-giris-detay dil seçimi:** TD anatomisi + art-prose ders gövdesi hibriti kullanıldı (video hero + sticky içindekiler). Saf TD ürün-anatomisi (malzeme paneli) yerine editöryel ders dili tercih edildi — onay bekler.
3. **puf-noktasi-detay:** "düz blog" olduğu için art-hero uzun-form korundu (TD masthead yerine). İş 5 metniyle uyumlu; yine de Beyar isterse TD masthead'e çevrilebilir.
4. **Dropdown ikon:** "Mutfağa Giriş" için `fa-graduation-cap`, Ansiklopedi için `fa-seedling` seçildi — ikon tercihi onaya açık.
5. **Site-geneli dropdown yayılımı** faz sonunda lead tarafından yukarıdaki script ile yapılacak (şimdi yapılmadı, çakışma riski için).

---

## SİTE-GENELİ DROPDOWN SWEEP — TAMAMLANDI (faz sonu, lead onayıyla)

İdempotent script çalıştırıldı: **91 html tarandı → 52 dosyanın dropdown'u güncellendi** (51 sweep + sozluk-v1 manuel düzeltme).

**Kaçak yakalandı + düzeltildi:** `sozluk-v1.html` aktif sayfa olduğu için Sözlük dropdown öğesi `href="#"` idi → sweep'in `href="sozluk-v1.html"` insert anchor'ı kaçırmıştı; Ansiklopedi öğesi manuel eklendi (header + drawer). Aynı durum başka aktif-sayfa türevinde yok (rename zaten uygulandı, yalnız insert anchor'ı etkiliydi).

**Güncellenen 52 dosya:** akademi, alisveris-listesi, anasayfa-portal-v2/v3a/v3b/v3c, arama, bazal-metabolizma, beden-kutle-endeksi, besin-kutuphanesi, bildirimler, bugun-ne-pisirsem, diyet-listeleri, diyet-program-detay, diyetisyen-dizin/ol/profil, giris, gunluk-kalori, gunluk-su, gunun-menusu, haftalik-menu, hakkimizda, hata, hesabim, ideal-kilo, iletisim, kategori, kesfet, koleksiyon, mekan-detay, mekan-liste, mutfak-defteri, onboarding, reklam-ver, saglik-hub, saglik-testler, seo-landing, sezon, siparislerim, **sozluk-v1**, sss, tarif-bulucu, tarif-detay-v1-headA, tarif-detay, tarif-ekle, tarif-liste, test-detay, video-mutfagi, vucut-tipi, yasal (+ önceden yapılan _shell/mutfaga-giris-v1/puf-noktalari-v1/olcu-birimleri-v1/mutfak-sirlari-v1 ve 4 yeni dosya).

**Dropdown'u OLMAYAN aileler (dokunulmadı, tasarım gereği):** shop ailesi — `sepet-v1, odeme-v1, dada-shop-v1, urun-liste-v1, urun-detay-v1` dmCart kabuğu kullanır, Mutfak Sırları nav'ı taşımaz (kılavuz §2c bilinçli sapma). Legacy anasayfa deneme türevleri (anasayfa.html, anasayfa-*-deneme, anasayfa-portal, anasayfa-uzman) eski yapıda, dropdown'suz.

## SWEEP SONRASI TEYİTLER (lead talebi)
1. **'Dada Denedi' grep (site-geneli):** 9 dosya — `anasayfa-athleats/kinfolk/cookpad/obys-deneme, anasayfa-portal, anasayfa-uzman, anasayfa.html, mutfak-defteri-v1, seo-landing-v1`. **HEPSİ benim SIRLAR setim DIŞINDA**; sweep metin değiştirmediği için bu sayım sweep ÖNCESİYLE aynı (sweep 0 yeni 'Dada Denedi' üretti). Bunlar faz-sonu global temizlik (#5) kapsamı — bilgi olarak iletiliyor.
2. **4+ aile sayfası dropdown render + 390 probe** (`sweep-probe.png`, `dropdown-render2-crop.png`): tarif-detay, saglik-hub, hesabim, sozluk-v1, kategori → hepsi `scrollW=375` (SIFIR taşma) + Mutfak Sırları:var + Ansiklopedi:var. sepet-v1 → dropdown YOK (shop shell, beklenen) + taşma yok. Görsel render: tarif-detay'da 5 öğe doğru sırada (Mutfağa Giriş → Püf → **Mutfak Ansiklopedisi** → Sözlük → Ölçü) ikonlarıyla doğrulandı.
3. **Sweep dokunduğu dosya sayısı:** 52 (yukarıda listelendi).

---

## REVİZE TURU — R4-R8 (task #7) TAMAMLANDI

| R | Konu | Çözüm | Kanıt SS |
|---|------|-------|----------|
| R4 | Önerilen Rota 12+ adımda çalışan kurgu | `mutfaga-giris-v1` rotası **8 → 12 adıma** çıkarıldı (09 Baharat&Tat, 10 Izgara&Mangal, 11 Sunum&Tabaklama, 12 Artık Yönetimi). 2-kolon steps-grid 12 adımı sorunsuz taşıyor — kurgunun 6'nın çok üstünde ölçeklendiği kanıtlandı. | `r45-giris-crop.png` |
| R5 | mutfaga-giris one-page tab/çapa çubuğu | olcu-birimleri `ob-tabs` mirası `.gnav` sticky çapa çubuğu eklendi (header altına yapışır): Nereden Başlamalı · Önerilen Rota · Konu Kütüphanesi · Sıradaki Adım. JS `scrollIntoView` smooth + scrollspy aktiflik; `scroll-margin-top` ile header hizası. | `r45-giris-crop.png` |
| R6 | puf-detay breadcrumb hero görseli ÜSTÜNE overlay | Ayrı beyaz `.art-crumb-bar` KALDIRILDI; breadcrumb + "Püf Noktalarına Dön" butonu hero görselinin **üstüne overlay** olarak taşındı (beyaz metin + glass back butonu, hero flex-column üst satır). | `r68-puf-hero.png` |
| R7 | ansiklopedi-v1 IA eski sözlük modeli | Düz disc-card grid → **görünür ana kategoriler + tıkla-aç maddeler**: 4 kategori bölümü (Sebzeler/Meyveler/Bakliyat&Tahıl/Baharat&Kök), her madde akordeon satırı (thumb + ad + latince + rozet + chevron); tıkla → NEDİR? / FAYDALARI teaser + "Maddenin tamamını oku →". Arama + A-Z + kategori-jump chip korundu. | `r7-ansiklopedi-1440.png`, `r7-ans-open-crop.png` |
| R8 | püf modüler bloklar + özel paylaş kurgusu | Eski referans (`puf-noktalari-detay.html`) birebir: gövde **modül modül içerik bloklarına** bölündü, her blokta blok-başı **dikey paylaş rayı** (`.mod-share`: fb/x/wa/tg/pin/mail). Sayfa-seviye "özel paylaş bölümü" = mevcut etiket-paylaş rayı (ptr) korundu. Mobilde rayar yatay döner. | `r68-puf-mods.png`, `r68-puf-500-crop.png` |

### R6 — set-dışı bozuk pattern raporu (lead'e)
`art-crumb-bar` (ayrı beyaz crumb bar + altında full-bleed hero) pattern'i taranınca **3 dosyada** bulundu:
- `puf-noktasi-detay-v1.html` → DÜZELTİLDİ (R6, crumb hero'ya overlay).
- `puf-noktalari-v1.html` → yalnız ARTIK CSS kuralı kaldı (detay görünümü önceki turda çıkarıldığı için markup yok; zararsız ölü CSS, istenirse silinebilir).
- **`kesfet-v1.html` → SET DIŞI** (başka teammate / önceki dalga). kesfet makale detayı aynı ayrı-crumb-bar pattern'ini kullanıyor; aynı R6 düzeltmesi (crumb'ı hero'ya overlay) gerekebilir — **lead'e raporlandı**, dokunulmadı.

### Revize turu probe
- 390px taşma: `mutfaga-giris-v1`, `puf-noktasi-detay-v1`, `ansiklopedi-v1` → hepsi `scrollW=375` (SIFIR taşma) (`r48-390.png`).
- Ansiklopedi akordeon aç/kapa + jump çalışıyor; rota 12 adım render; gnav scrollspy; puf modül paylaş rayları (masaüstü dikey / mobil yatay) doğrulandı.
- CSS `*/` tuzağı üç dosyada da temiz.

---

## REVİZE TURU — DETAYLI BRİEF UYGULAMASI (2. tur, loop sigortası)

Lead'in detaylı re-brief'i sonrası R4 SIFIRDAN yeniden tasarlandı; R6 set-içi tutarlılık doğrulandı.

**R4 — Önerilen Rota YENİ TASARIM (2-kolon grid REDDEDİLDİ → yatay step rail):**
2-kolon `steps-grid` (8'i aşınca dizilim sorunu) tamamen kaldırıldı. Yerine **yatay kaydırılabilir step rail** kuruldu:
- `.rstep-track` yatay scroll-snap track + `.rstep` kart (num rozet + **FAZ etiketi** [TEMEL/PİŞİRME/HAMUR/SOS/İLERİ] = adım gruplama bonusu + başlık + açıklama + "Dersi aç →"), her kart → ders detayı.
- **İlerleme göstergesi:** "Adım X / 12" sayaç + gradient ilerleme barı (`.rp-fill`) scroll oranıyla dolar.
- **Ok navigasyonu:** prev/next butonları (uçlarda disabled), 1.5 kart kaydırır.
- 12 adımla kuruldu; **ölçeklenme KANITI** (`r4-route-rwinfo.png`): `track scrollWidth=3516 · clientWidth=1176 · overflow=true · scrollLeft=2340` (max'a kayar) → 12+ adımda gerçek yatay kaydırma çalışıyor, dizilim bozulmuyor. Sayfa-seviye 390 taşması SIFIR (rail iç-kaydırmalı).
- Kanıt SS: `r4-start2-band.png` (rail + kartlar + ilerleme + oklar), `r4-route-rwinfo.png` (metrik kanıt), `r4-390.png`.

**R6 — set-içi tutarlılık doğrulaması:**
- `mutfaga-giris-detay-v1` + `ansiklopedi-detay-v1` → `art-crumb-bar:0`, **rd-top + rd-crumb** kullanıyorlar = tarif-detay'la BİREBİR aynı TD anatomisi (crumb beyaz üst şeritte, gallery üstünde). Bozuk pattern DEĞİL, düzeltme gerekmez.
- `puf-noktasi-detay-v1` → crumb hero görseline overlay edildi (`art-hero-crumb`), kalan ölü `.art-crumb-bar` CSS temizlendi (artık 0).
- **SET DIŞI:** `kesfet-v1.html` aynı `art-crumb-bar` (ayrı crumb bar + full-bleed hero) pattern'ini kullanıyor — dokunulmadı, lead'e raporlandı.

**R5/R7/R8** önceki turda detaylı brief'le uyumlu kurulmuştu (gnav scrollspy / kategori-akordeon / modüler blok + paylaş rayı); değişiklik gerekmedi, render + 390 yeniden teyit edildi.

**Probe özeti:** 3 revize sayfa (`mutfaga-giris-v1`, `puf-noktasi-detay-v1`, `ansiklopedi-v1`) → `scrollW=375` (SIFIR taşma). R4 rail overflow=true + scrollLeft=2340 kanıtı. CSS `*/` tuzağı temiz.

---

## EK İŞ — kesfet-v1.html R6 düzeltmesi (Beyar onayıyla kapsam içi)

Set-dışı bulgu (kesfet-v1) Beyar onayıyla geçici sahipliğime atandı; puf-noktasi-detay R6 düzeltmesinin AYNISI uygulandı, hero'nun başka yapısına dokunulmadı.

- **Markup:** detay görünümündeki (`?detay=1`) ayrı `<div class="art-crumb-bar below-header">` KALDIRILDI; breadcrumb + "Keşfet'e dön" butonu `.art-hero` içine `.art-hero-top` (crumb overlay + glass back) olarak taşındı, `.art-hero-main` ile başlık/meta alta hizalandı. Hero `below-header` (112px) + flex-column.
- **CSS:** `.art-hero-crumb / .art-hero-top / .art-hero-main` + hero flex-column padding (puf-detay R6 pattern'i birebir) eklendi; mobil `padding-top:62px`.
- **Toggle korundu:** `id="artBack"` + `id="crumbKesfet"` (liste↔detay JS) aynen bırakıldı; liste görünümü etkilenmedi.

**Kanıt:** `kesfet-r6-1440.png` (detay 1440), `kesfet-r6-hero.png` (crumb+back hero üstünde overlay), `kesfet-r6-390.png` (`?detay=1` scrollW=375, taşma 0). `art-crumb-bar` markup grep = **0**. CSS `*/` tuzağı temiz.
