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
