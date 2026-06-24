# DadaMutfak — Referans-Uyarlama HIZLI Varyant · ORTAK SPEC

Bu dosyayı her varyant ajanı okur. Tek değişen: referansın TASARIM DİLİ + dosya adı.

## Teknik temel
- Tek dosya standalone HTML + Tailwind CDN (`https://cdn.tailwindcss.com`) + Google Fonts + minimal inline JS.
- Mevcut `mockups/anasayfa-cookpad-deneme.html` ile aynı teknik kurulum (Tailwind config inline, custom renkler, `.ph` helper).
- **BAŞKA HİÇBİR DOSYAYA DOKUNMA.** Sadece kendi yeni varyant dosyanı yaz.
- Commit/push YOK.

## Kilitli kimlik (koru)
- **Logo** (`<img>` olabilir): `../drive-download-20260608T070112Z-3-001/dada-mutfak-icerik/assets/imgs/logo-colored.png` — header + footer.
- **Favicon:** `../drive-download-20260608T070112Z-3-001/dada-mutfak-icerik/assets/imgs/favicon/favicon.ico`
- **Palet** (Tailwind config'e koy): cream `#FBF7EF`, paper `#FFFFFF`, slate `#253D4E`, slate-soft `#667481`, tomato `#E14827`, tomato-deep `#C13A1E`, herb `#3BB77E`, honey `#FAC045`, line `#ECE4D6`.
  - Referansın renk/his atmosferini uygula AMA DadaMutfak imza **domates `#E14827`** aksanını (CTA/etiket/rozet) koru.
- İçerik **Türkçe**. DadaMutfak modülleri: Tarifler · Bugün Ne Pişirsem (arama-öncelik) · Topluluk tarif feed · Mutfak Rehberi · Sağlık & Diyetisyen · Ürünler (Dada Shop) · Ramazan.

## HIZLI kapsam (tam 9 bölüm GEREKMEZ — referans KARAKTERİNİ göster)
1. **Header/nav** + gerçek logo + "Tarifini Paylaş" CTA (referansın nav karakterinde).
2. **Hero** — referansın karakterinde; "Bugün ne pişiriyorsun?" arama-öncelik ruhu korunsun (referansa göre arama kutusu gömülü ya da manşet+arama).
3. **Öne çıkan tarifler şeridi** — 4 kart, yazar avatar+ad + puan + süre + kaydet ikonu (referansın kart dilinde).
4. **1 İMZA BÖLÜM** — o referansın en karakteristik bölümü (her ajana özel brief'te yazıyor).
5. **Kısa footer** — logo + 2-3 kolon + alt bar.

## Görsel kuralları
- GERÇEK Unsplash. Kare/oranlı görsel `<img>` DEĞİL → `div + background-image` + `cover` + `center` (logo hariç).
- CSS render genişliği esas; **2x retina çarpma YOK**.
- Tutarlı sıcak ton: HER Unsplash URL'sine grade ekle → `&exp=7&gam=6&sat=-9&high=8&vib=5`
- URL formatı: `https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&w=<W>&q=80&exp=7&gam=6&sat=-9&high=8&vib=5`

### Doğrulanmış görsel havuzu (bunları kullan, isimle eşle, tekrarsız)
Yemekler:
- hero/sofra `1504674900247-0877df9cc836`
- kahvaltı/yumurta `1525351484163-7529414344d8`
- çorba (domates) `1547592166-23ac45744acd`
- ana yemek/köfte `1529042410759-befb1204b468`
- tatlı (çilekli) `1488477181946-6428a0291777`
- hamur işi (kek) `1565958011703-44f9829ba187`
- taze sebze/zeytinyağlı `1512621776951-a57141f2eefd`
- mantı/yeşil makarna `1473093295043-cdd812d0e601`
- mercimek çorba (sarı) `1604152135912-04a022e23696`
- sütlaç/parfe `1563805042-7684c019e1cb`
- menemen/shakshuka `1590412200988-a436970781fa`
- yeşil sebze `1543339308-43e59d6b73a6`
- soslu köfte `1518492104633-130d0cc84637`
- kremalı kek `1621303837174-89787a7d4729`
- ezogelin (sarı çorba) `1476718406336-bb5a9690ee2a`
- rehber `1556910103-1c02745aae4d`, `1596797038530-2c107229654b`
- ürün `1474979266404-7eaacbcd87c5`, `1596040033229-a9821ebd058d`, `1551462147-37885acc36f1`, `1498837167922-ddd27525d352`
- ramazan `1542528180-1c2803fa048c`

Avatar (kişi, `w=80&q=60`+grade): `1494790108377-be9c29b29330`, `1500648767791-00dcc994a43e`, `1438761681033-6461ffad8d80`, `1507003211169-0a1dd7228f2d`, `1534528741775-53994a69daeb`, `1517841905240-472988babdf9`

## Bitince: SS al (server açık → http://localhost:8765)
```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1440,3400 --virtual-time-budget=11000 \
  --screenshot="screenshots/ref-<NAME>.png" \
  "http://localhost:8765/mockups/ref-<NAME>.html"
```
Sonra Read ile SS'e bak; açıkça bozuk/eksik bir şey varsa düzelt, tekrar SS al.

## Dönüş (kısa tut)
Sadece: dosya yolu + SS yolu + 1 cümle karakter özeti. Uzun açıklama yazma.
