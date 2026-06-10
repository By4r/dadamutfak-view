# Revize Araştırması — Eski Site + v2 Analizi

> Tarih: 2026-06-10 · Amaç: anasayfa v3 alternatifleri (v3a/v3b/v3c) öncesi
> eski Dada Mutfak sistemi + araştırma dokümanları + v2 mockup envanteri.

---

## 1. FONT SETİ (eski siteden — KRİTİK BULGU)

Eski site **tek custom font** kullanıyor: **Gilroy**.

- `assets/css/main.css:11-14` → `@font-face { font-family: myBrandFont; src: url('./fonts/Gilroy-Medium.ttf') }`
- Global reset (`main.css:33`) tüm elementlere `font-family: myBrandFont` basıyor → sitenin tamamı Gilroy.
- Font klasörü (`assets/css/fonts/`): **Gilroy-Light.otf · Gilroy-Medium.ttf · Gilroy-ExtraBold.otf** (3 ağırlık mevcut, CSS'te yalnız Medium bağlı; başlıklar `font-weight:700` ile faux-bold render ediliyordu).
- Başlık/gövde ayrımı: başlıklar `#253D4E`, weight 700, h1 48px → h6 16px; gövde 14px/24px, `p` rengi `#7E7E7E`.
- İstisnalar (template artığı, marka fontu DEĞİL): `Lato` yalnız hotline telefon alt yazısında (main.css:6679), `Arial`/`Segoe UI` own.css'te birer kez, `uicons-*` ikon fontu.

**Sonuç:** Marka fontu = **Gilroy (Light 300 / Medium 500 / ExtraBold 800)**.
**v2 mockup zaten birebir bu seti yüklüyor** (`assets/fonts/Gilroy-*.otf/ttf`, @font-face 300/500/800) → v3'lerde font değişikliği GEREKMEZ, aynen taşınacak.

---

## 2. ESKİ SİTENİN İÇERİK KURGUSU

### 2.1 Anasayfa section sıralaması (eski index.html)
1. Hero slider (video başlık alanı)
2. Kategoriler (grid/tab)
3. Malzemeye göre tarif ara (malzeme kartları)
4. Tariflerimiz (tab'lı kategori bazlı liste)
5. Mutfağa Giriş (eğitim kartları)
6. Şefler (tab + slider)
7. Keşfet (grid)
8. Mobil app CTA banner
9. Püf Noktaları (kart slider)

### 2.2 Tarif içerik modeli (panel + public birleşik)
Backend'in en zengin modülü. Alanlar:
- **Meta:** porsiyon · süre (dk) · zorluk (Kolay/Orta/Zor) · kalori
- **Medya:** kapak görseli · galeri (max 10) · **video URL** · **seslendirme dosyası (.mp3)** ← tarif kartında medya tipi ikonları buradan geliyor
- **İçerik:** dinamik malzeme listesi (miktar + ölçü birimi + malzeme + grup) · adımlar (adım başına görsel max 3 + süre + açıklama)
- **Flag'ler:** vegan · vejetaryen · glutensiz · diyet · acılı · baharatlı
- **Sosyal:** 5 yıldız puan · yorum · görüntülenme · "Ben de Yaptım" · "Eline Sağlık" · deftere/menüye ekle
- **Taksonomiler:** kategori (flat) · tarif grubu · dünya mutfağı · yemek modu

### 2.3 Eski tarif kartı anatomisi (`product-cart-wrap`)
- Görsel üst-sağ: **medya tipi ikonları** (▶ video / 🔊 ses / 🖼 galeri)
- Görsel üst-sol: ⭐ puan + 👁 görüntülenme
- Görsel alt-sol: rozet ("Şefin Tercihi")
- Gövde: kategori linkleri (1 satır) + başlık (2 satır clamp)
→ **Medya tipi ikonları v3 kartlarının ana ilham kaynağı** (görev gereksinimi).

### 2.4 Modül envanteri
| Modül | Tip | Not |
|---|---|---|
| Tarifler | core, UGC | video+ses+galeri medya |
| Keşfet | editöryal | mekan/etkinlik, galeri 3 |
| Mutfağa Giriş | eğitim | kategori + TinyMCE |
| Püf Noktaları | UGC kısa içerik | kullanıcı da ekleyebiliyor (puf-noktasi-ekle) |
| Sözlük | referans | A-Z + kategori tab |
| Testler | eğlence | soru/cevap, görselli seçenek |
| Hesaplamalar | araç ×5 | kalori · BMI · bazal metabolizma · vücut tipi · ölçü birimleri |
| Bugün Ne Pişirsem | akıllı öneri | kategori carousel + activated state |
| Tarif Bulucu | filtre aracı | malzeme multi-select + kalori range |
| Diyetisyenler | uzman | profil + belge |
| Şefler | profil | tab + slider |
| Menülerim | planlama | kullanıcı menüsü |
| Ürünler (Dada Shop) | e-ticaret | varyasyon + indirim + sepet akışı |
| Ramazan | sezonluk | iftara/sahura doğru + menüler |

### 2.5 Araştırma dokümanı özü (dada-araştırma.docx + dada-inceleme)
20 global rakip analizi. Dada'ya seçilen fikirler (dada-inceleme):
"Dada Denedi" güven rozeti · "60 Saniyede Dada Tarif" video formatı · Dada Premium ·
Dada Akademi · malzemeleri sepete ekle · Haftalık Dada Menü · Dada Tarif Defteri ·
Dada Sofra (tarif-uyumlu ürün önerisi) · Dada Besin Rehberi (kalori/makro/alerjen).
Öne çıkan stratejik temalar: topluluk + güven (Cookpad/Allrecipes), video format (Tasty),
"ne pişirsem" kişiselleştirme (Samsung Food/SuperCook), tarif→e-ticaret köprüsü (SideChef).

---

## 3. V2 SECTION HARİTASI (mockups/anasayfa-portal-v2.html, 1713 satır)

| # | Section | Class | Satır (yaklaşık) | v3'te durum |
|---|---|---|---|---|
| 0 | Üst bant | `.topbar` | 857-882 | **SABİT** |
| 0b | Header + dropdown nav | `.header` | 885-949 | **SABİT** |
| 0c | Mobil drawer + bottom-nav + çerez | `.drawer/.bottom-nav/.cookie-banner` | 952-1034 | **SABİT** |
| 1 | Hero (video bg + 3 tab'lı arama kartı + chips + stats) | `.hero-v` | 1037-1084 | **SABİT** |
| 2 | Kategori şeridi (yatay track + ok) | `.catstrip` | 1087-1111 | v3a/b korunur |
| 3 | Öne çıkan tarifler (feat-big + 3 yan kart + grid-4) | `.feat-sec` | 1114-1247 | kart redesign alanı |
| 4 | Mutfağa Giriş + Püf (koyu, video bg, 2 kolon) | `.guide` | 1250-1316 | **tab'lı birleşim** olacak |
| 5 | Videolar (vid-grid 4'lü) | `.vids-sec` | 1319-1356 | kartlara entegre düşünülecek |
| 6 | Sağlık & Diyetisyen (calc-grid 2×2 + koyu panel) | `.health` | 1359-1408 | korunur, calc **6'lı grid** |
| 7 | Ramazan (countdown panel) | `.ramazan-sec` | 1411-1434 | **KALDIRILACAK** |
| 8 | Dada Shop (grid-4 ürün) | `.shop` | 1437-1490 | **slider'a** dönecek |
| 9 | Topluluk + mobil CTA | `.community` | 1493-1513 | korunur |
| 10 | Footer (turuncu minimal) | `.footer.orange` | 1516-1546 | **SABİT** |

JS bloğu (1548-1710): ss/fp/dd/drawer/cc query param'ları, header şeffaf↔katı,
arama tab'ları, kaydet toggle, kategori ok kaydırma, drag-scroll, dil dropdown,
drawer, çerez. → v3'lerde aynen taşınır; slider'lar mevcut `enableDrag` + ok pattern'ını kullanır.

Token sistemi: `--tomato #E14827 · --slate #211E16 (kurumsal koyu) · --green #3BB77E ·
--yellow #FAC045 · krem/beyaz zemin ritmi (--bg-cream/--bg-white)` — brand-tokens.md bağlayıcı.

---

## 4. V3 GEREKSİNİM ÖZETİ (görevden)

Ortak: hero+menü+footer aynen · Gilroy (zaten var) · hero altı "tarif bul" kısa yolu ·
Mutfağa Giriş + Püf tek tab'lı section · Sağlık calc 6'lı grid (5 eski araç + ölçü
birimleri = tam 6 ✓) · Ramazan KALKAR · Shop + "tümünü gör" alanları slider ·
kartlarda medya tipi (video/ses/görsel — eski sitedeki gibi).

- **v3a:** v2 yerleşimi + yeni tarif kartı anatomisi (medya alanı, süre/zorluk/porsiyon, kategori etiketi)
- **v3b:** farklı kart yaklaşımı (yatay / overlay görsel-ağırlıklı) + section ritmi kart bazlı
- **v3c:** orta section kurgusu eski sitenin mimarisinden beslenerek yeniden (hero/footer sabit), kart = a/b'den güçlü olan
