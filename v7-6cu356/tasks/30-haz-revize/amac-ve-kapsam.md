# 30 Haziran Revize — Amaç & Kapsam

> Bu dosya gidişat netleştikçe güncellenir. Kaynak docx'ler: `dada-revize.md` (ana spec),
> `diet-ek.md`, `fit-ek.md` (modül detayları). Bu klasörde.

## 1 · ANA SPEC (dada-revize.docx — çekirdek 9 madde)

1. **Ortak menü yapısı:** DadaGastro'daki menü yapısı → Fit, Gourmet, Campus, Diet'te de
   AYNI şekilde olacak (Gastro = şablon).
2. **İkon-set nav:** Menüde ikon set olacak; Gastro/Fit/Gourmet/Campus/Diet kısımlarında
   fare gelince başlık gözükecek; her birinin rengi kendi marka rengi olacak.
3. **Gastro menü temizliği:** "Keşfet" ve "Sağlıklı Yaşam" alanları Gastro menüsünden
   KALKACAK; yerine "Dada Store" ikonlu eklenecek. "Püf Noktaları" → "Mutfak Sırları"
   içinden ÇIKARILACAK (bağımsız kalem).
4. **Gastro vurgu:** "Dada Route" ve "Dolapta Ne Var" daha belirgin hale gelecek.
5. **Marka-özel footer:** Her marka (Gastro/Fit/Gourmet/Campus/Diet) kendi alanına uygun
   footer alacak (şu an hepsi AYNI generic footer).
6. **Scroll-to-top:** Her bölümde "yukarı kaydır" içeriği eklenecek.
7. **DadaFit ek menü:** Egzersizler · Programlar · Enerji Defteri · Hareket Rehberi ·
   Challenge · Antrenörler.
8. **DadaDiet ek menü:** Hesaplayıcılar · Besin Değerleri · Beslenme Rehberi · Programlar ·
   Testler · Diyetisyenler.
9. **DadaGourmet ek menü:** Mekanlar · Gurme Lezzetler · Dada Route · Dada Seçkisi · Etkinlikler.

### Diet ek içerik (diet-ek.md) — modül derinliği
- **Hesaplayıcılar** (10 alt: BKİ, Günlük Kalori, Bazal Metabolizma, İdeal Kilo, Su, Protein,
  Karbonhidrat/Yağ, Porsiyon, Kalori Açığı) → her sonuç Gastro tarif + Fit hareket CTA'sına bağlanır.
- **Besin Değerleri** (10 kategori: sebze/meyve/et/balık/süt/bakliyat/tahıl/kuruyemiş/yağ/tatlı)
  → her besin sayfası "bu malzemeyle Gastro tarifi" + "Fit'te dengele" köprüsü.
- **Beslenme Rehberi** (blog/içerik: Dengeli Tabak, Öğün Planlama, Porsiyon, Etiket Okuma, Mutfak Alışkanlıkları).
- **Diyet Programları** (8 şablon program) → Gastro menü oluşturma + Fit hareket köprüsü.

### Fit ek içerik (fit-ek.md) — modül derinliği
- **Günlük Enerji Defteri** (DadaFit'in kalbi; 7 alt: Bugünkü Denge, Yediklerim, Hareketlerim,
  Yediğini Hareketle Dengele, Su Takibi, Gastro Günlük Öneri, Haftalık Denge Özeti)
  → en güçlü Gastro köprüsü burada. Dil destekleyici/dengeleyici, asla suçlayıcı değil.
- **Hareket Rehberi** (SEO/içerik; 8 kategori: Yeni Başlayanlar, Doğru Form, Süreye Göre,
  Hedefe Göre, Bölgeye Göre, Masa Başı, Isınma/Soğuma, Hareket Sözlüğü).

## 2 · MEVCUT DURUM (keşif)

**Kabuk mekanizması:** Sayfalar standalone HTML, harici CSS/JS yok — her sayfa inline kendi
paletini/header'ını taşır. `<body data-brand="…">` kimlik işaretçisi. Kanonik 5 dünya rengi
(`--c-purple #b14fc5` vb.) her sayfada inline tanımlı. → "Kabuk ayırma" = sayfa kümesine inline
ayrı kimlik basmak (merkezi tek dosya değil; her sayfa tek tek).

**Kabuk durumu (`data-brand` dağılımı):**
| Shell | Marka | Durum | ~Sayfa |
|---|---|---|---|
| `mutfak` | Gastro + Gourmet/Keşfet KARIŞIK | **AYRILMAMIŞ** | 160 |
| `saglik` | DadaDiet (nane) | ✅ ayrı | 19 |
| `fit` | DadaFit (yeşil) | ✅ ayrı | 10 |
| `store` | DadaStore (domates) | ✅ ayrı | 5 |
| `akademi`/`mentor` | Campus (petrol) / hub | kısmi | 1 + hub |

**Gastro mevcut menü** (anasayfa-portal-v3a): Tarifler (mega) · Ne Pişirsem? · Dolapta Ne Var? ·
Keşfet · Mutfak Sırları (▾ Mutfağa Giriş/Püf Noktaları/Ansiklopedi/Sözlük/Ölçü/Sofra Düzeni) ·
Sağlıklı Yaşam (▾ Diyetisyen Ara/Hesaplayıcılar/Testler/Besin Değerleri).

**Footer:** TÜM marka sayfalarında BİREBİR AYNI (tek md5) — generic DadaMutfak footer
(Kurumsal/Hızlı Erişim/İletişim/İş Birliği + yasal + © DadaMutfak + #GaviaWorks).

**Assistant:** YALNIZ hub'da (`dadamentor-v3`). Video-mentor FAB ("DadaMentor · çevrimiçi") +
5 marka switcher çipi + preview kart. Marka sayfalarında assistant YOK, "Hub'a dön" nav YOK.

**Yeni modül sayfa durumu:** `besin-degerleri-v1` VAR; Enerji Defteri / Hareket Rehberi /
Beslenme Rehberi / Dada Seçkisi / Etkinlikler sayfaları YOK (yeni üretilecek).

**Hub→marka CTA:** Gastro→anasayfa-portal-v3a · Diet→saglik-hub-v1 · Fit→dadafit-hub-v1 ·
Gourmet→kesfet-v1 · Campus→akademi-v1 · Store→dada-shop-v1.

## 3 · KARARLAR (Beyar — 2026-06-30)

- [x] **Strateji = PİLOT.** Önce DadaGastro'yu uçtan uca bitir (ikon-set switcher + marka footer +
  Store girişi + Dada Route/Dolapta vurgu + scroll-top + Gastro'ya ait yeni modüller). Beyar onaylar →
  şablon Fit/Gourmet/Campus/Diet'e tek tek yayılır.
- [x] **Kapsam = İSKELET + YENİ MODÜL SAYFALARI BİRLİKTE.** Menü/footer/kabuk yanında docx'teki yeni
  modül sayfaları da üretilecek (Enerji Defteri, Hareket Rehberi, Beslenme Rehberi, Dada Seçkisi,
  Etkinlikler, Besin Değerleri detay vb.). Büyük kapsam — pilot Gastro'nun kendi yeni modülleri azdır
  (Püf Noktaları/Dada Route/Dolapta/Store hepsi MEVCUT), asıl yeni modül yükü Fit/Diet/Gourmet'te → doğal
  olarak pilot sonrası sıraya düşer.
- [x] **DadaStore KARARI (KESİN).** DadaStore mevcut haliyle korunur, switcher sistemine HİÇ dahil
  edilmez. Siyah bant ikon-switcher'da Store ikonu/butonu YER ALMAZ (switcher = sadece 5 marka +
  DadaMentor pusula → hub). Store diğer 5 dünyadan farklı; Gastro'nun alt sitesi. Store'a giriş
  YALNIZCA DadaGastro iç menüsündeki ikonlu "Dada Store" bağlantısıyla. Store içindeki TEK değişiklik:
  mevcut "DadaMutfak'a dön" → "DadaGastro'ya dön". Store kabuğuna switcher enjekte EDİLMEZ; Store kabuğu
  (dada-shop-v1 + 5 sayfa, domates) başka hiçbir şekilde elden geçmez.
- [x] **Cross-brand nav = "SİYAH BANT" KALICI İKON-SWITCHER.** Her marka header'ında kalıcı ikon satırı:
  Gastro/Fit/Gourmet/Campus/Diet (hover'da başlık + kendi marka rengi — spec madde 2 birebir) +
  DadaMentor pusula ikonu → hub. Tek bileşen hem cross-brand geçişi hem hub dönüşü çözer. Store bu bantta YOK.

**Türetilen netlik:**
- "İkon-set + hover başlık + kendi renk" = SİYAH BANT switcher'a ait (5 marka). Markanın iç modül menüsü
  (Tarifler/Ne Pişirsem… vb.) ayrı katman — büyük olasılıkla metin tabanlı kalır (pilot'ta netleşir).
- Yeni modül sayfa yükü pilot Gastro'da minimal → büyük üretim Fit/Diet/Gourmet turlarında.

## 4 · ASSISTANT KARARLARI (Beyar — 2026-06-30)

- [x] **Model = KOMPAKT FAB, marka-renkli + bağlamlı.** Her markada kompakt asistan FAB'ı; açılan panel
  o markanın renginde ve bağlamında. Hub'ın ağır video-mentor paneli markaya taşınmaz.
- [x] **Zamanlama = GASTRO PİLOTUNA DAHİL.** Assistant FAB Gastro pilotunda kurulur → şablon gerçekten
  "tam" olur, diğer markalara assistant'lı kopyalanır.
- [x] **3 context-aware işlev (onaylı):**
  (a) **Top-modül yönlendirme** — markanın öne çıkan modülleri seçenek olarak sunulur.
  (b) **Cross-brand köprü** — örn. Diet→Gastro "diyetine uygun tarifler", Fit→Gastro "yediğini dengele".
  (c) **Bağlam-duyarlı bilgilendirme** — bulunulan sayfaya göre ipucu/açıklama.

## 5 · PİLOT (DadaGastro) — KİLİTLİ KAPSAM

Şablon olacak Gastro pilotu şunları içerir (Beyar onayından sonra plan yazılacak):
1. **Siyah bant cross-brand switcher** — Gastro/Fit/Gourmet/Campus/Diet ikonları (hover başlık + kendi
   marka rengi) + DadaMentor pusula ikonu → hub. **Store bu bantta YOK.**
2. **Gastro iç menü temizliği** — "Keşfet" + "Sağlıklı Yaşam" ÇIKAR; "Dada Store" ikonlu EKLE
   (yer CC önerecek); "Püf Noktaları" → Mutfak Sırları'ndan bağımsız ÇIKAR.
3. **Vurgu** — "Dada Route" + "Dolapta Ne Var" belirginleştir.
4. **Marka-özel Gastro footer** — hub footer REFERANS DEĞİL; mevcut DadaMutfak (generic) footer temel
   alınır, Gastro'ya özgün içerikle doldurulur. Ortak "hub şablonu" YOK; her marka kendi özgün footer'ı
   (§7'de footer = marka-özel kategorisi, reusable değil).
5. **Scroll-to-top** her bölümde.
6. **DadaStore köprüsü** — Gastro iç menüden ikonlu giriş; store'a girince header "Gastro'ya dön".
7. **Kompakt marka-renkli assistant FAB** + 3 işlev (Gastro bağlamında).

→ Onaylanınca şablon Fit/Gourmet/Campus/Diet'e yayılır; yeni modül sayfaları (Enerji Defteri,
Hareket Rehberi, Beslenme Rehberi, Dada Seçkisi, Etkinlikler vb.) o turlarda üretilir.

**SONRAKİ ADIM:** Beyar "plan yaz" deyince → `tasks/30-haz-revize/gastro-pilot-plan.md`.

## 6 · K-KARARLARI (Beyar — 2026-06-30, plan açık noktaları)

- **K0** ✅ data-brand `mutfak→gastro` kapsam → **pilotta YALNIZ anasayfa** (toplu dönüşüm ayrı faz).
- **K1** ✅ Switcher: **pusula YOK**, bantta **hub dönüşü YOK**, **aktif marka başlığı KALICI**
  (diğerleri ikon-only + hover). Hub'a footer'dan ulaşılır.
- **K2** ✅ Gastro iç modül menüsü → **ikon + metin** (her zaman görünür; ikon-only değil).
- **K3** ✅ "Dada Store" girişi → **iç nav sonunda belirgin öğe** (çanta ikon + isim + dış-link oku).
- **K4** ✅ "Dada Route" = **mevcut "Yol Güzergahım" componenti** (Gastro anasayfasında zaten var:
  FAB + tanıtım şeridi → yol-guzergahim-v2; Diet'te de benzer kısım var). Yeni modül DEĞİL; pilotta
  spec md.4 gereği **belirginleştirilir**. **K4b ⏳:** "Yol Güzergahım" → "Dada Route" yeniden
  adlandırma (öneri: evet, marka tutarlılığı).
- **K5** ✅ Footer app bloğu → **EKLENECEK** (App Store + Google Play, href=# placeholder).
- **K6** ✅ Footer perde-reveal → **TÜM FOOTERLARDA PERDE OLACAK** (Beyar). Perde mekaniği reusable
  (içerik marka-özgün, perde ortak).
- **K7** ✅ Assistant FAB **SOL-alt**, scroll-top **SAĞ-alt** (ayrı köşeler, çakışma yok).
