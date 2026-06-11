# Dalga 4 — Kapanış 2 Raporu (arama · sezon · sss + footer link denetimi)

Tarih: 2026-06-11 · Sayfalar: `mockups/arama-v1.html` · `mockups/sezon-v1.html` ·
`mockups/sss-v1.html` · Denetim: 53 dosyada footer href bağlama

---

## 1. L1 — Eski şablon kıyası

### sss.html (eski)
- Blok envanteri: page-header bandı (koyu bg + breadcrumb) → "Kategori Başlığı" h3
  + `<hr>` ayraç → `.sss-accordion` buton + `.sss-panel` içerik listesi (JS `openPanel`).
- İçerik **tamamen lorem** — gerçek soru havuzu yok ("Section 1/2/3"). Kategori adları
  da placeholder ("Kategori Başlığı", "Kategori Başlığı 2").
- Modern karar: akordeon kurgusu korundu (ilk soru açık, smooth aç/kapa); kategoriler
  brief'teki 5 modern kategoriye oturtuldu (Üyelik & Hesap / Tarifler & İçerik /
  Dada Shop & Sipariş / Diyetisyen / Diğer, `?kat=`). Sorular sıfırdan yazıldı
  (18 soru) — eski lorem'den taşınacak içerik yoktu; shop + diyetisyen soruları eklendi.
- Eskide olmayan eklemeler: SSS içi canlı arama (tüm kategorilerde filtreler, boş durum
  kartlı), "Cevap bulamadın mı?" CTA bandı → `iletisim-v1.html` + Görüş Bildir modal
  tetikleyici.

### iftara-dogru.html + sahura-dogru.html (eski)
- Blok envanteri (iftara-dogru): kategoriler sidebar · **canlı countdown**
  (`.dada-countdown-display` "16:10:25") · "İftar Menüleri" (1./2./3. Gün İftar Menüsü
  kartları) · "İftara Özel Tarifler" listesi · "Ramazana Özel Tarifler" listesi ·
  "Malzemeye Göre Tarif Ara" · yan bloklar: Günün Ayeti / İftara Özel Mekanlar /
  Bugünün Şefi · app bandı + bülten popup.
- sahura-dogru aynı iskelet; ray başlıkları "Sahura Özel" / "Ramazana Özel",
  yan blok "Sahurda Açık Mekanlar".
- ramazan-menu-detay.html: tek menü detayı ("Menü 1") — modernde bu iş
  `gunun-menusu-v1.html`'e devredildi (köprü: dayband CTA + coldex "30 Günlük İftar
  Menüsü" kartı).
- Modern karar: iki eski sayfa **tek sezon landing şablonunda** birleşti — İftara
  Doğru / Sahura Doğru artık koleksiyon rayları. Countdown mirası hero içi glass
  şeride taşındı (Bugün / İftara Kalan canlı sayaç / İftar / İmsak). KAPSAM DIŞI
  bırakılanlar: Günün Ayeti (dini içerik editöryel karar ister — açık soru),
  mekan blokları (Keşfet modülünün işi), Bugünün Şefi (anasayfa şef rayının işi),
  bülten popup (site genelinde yok).

### Arama (F13)
- **Eski karşılık yok** — eski sitede arama sonuç sayfası bulunmuyor; header'daki
  "Ne Aramıştınız ?" modalı (`search-style-2`) `tarifler.html` liste diline akıyor.
  tarifler.html'in liste/arama dili zaten modern `tarif-liste-v1`'e taşınmıştı;
  arama sonucu sayfası tamamen yeni kurgu (sekmeli karma sonuç — modern pattern).

---

## 2. Sayfa kararları + bileşen kaynakları

### arama-v1.html (F13 — global arama sonucu)
- Üst bölge: beyaz zemin, `rd-crumb` + v3a `searchcard` `.search-row/.search-input`
  VERBATIM (tab'sız geniş hâl) + sonuç özeti.
- Sekme barı: mutfak-defteri `.pf-tabbar` VERBATIM, sticky; sayaçlı 6 sekme
  (Tümü 47 / Tarifler 24 / Videolar 6 / Şefler 3 / Ürünler 8 / Yazılar 6), `?tab=`.
- Tümü sekmesi: tip başına ray ("Tarifler (24) → Tamamını Gör" — `coldex-head`
  kompakt başlık dili) · r-card / vid-card / chef-card (+`chef-cta` davet) /
  p-card / disc-card hepsi v3a VERBATIM.
- Tip sekmeleri: kartlar Tümü rayından JS ile klonlanır (tek kaynak; kaydet butonları
  yeniden bağlanır); Tarifler sekmesinde `pagi` VERBATIM.
- Boş durum `?empty=1`: `lst-empty` VERBATIM + "Şunu mu demek istedin: menemen"
  + popüler chip bulutu. Sorgusuz hâl: "Bugün ne arıyorsun?" + yalnız arama kutusu
  + Popüler/Son Aramalar bölümü. Sorgulu hâlde popüler bölümü gizlenir (brief gereği).
- Durum makinesi: `?q=` okunur → input + h1 + title; `?tab=` aktive eder;
  sekme tıklaması `history.replaceState` ile URL'i günceller.
- Header büyüteci 3 sayfamda da `arama-v1.html`'e bağlandı (`onclick`).
- Zemin ritmi: beyaz (arama kutusu) → gri (sonuçlar) → beyaz (popüler aramalar).

### sezon-v1.html (sezon landing ŞABLONU, `?sezon=ramazan` varsayılan)
- Hero: `lst-top/.lst-hero` VERBATIM varyant (iftar sofrası görseli, koyu overlay
  .93/.70) + `lh-chips` bölüm-içi hızlı geçiş + `lst-stats`.
- Countdown/tarih şeridi: hero içi glass band `.szn-strip` (lh-chips glass zemini +
  lst-stats rakam dili türevi) — Bugün / **İftara Kalan canlı sayaç** (20:31 hedefli,
  saniye tikli) / İftar / İmsak. Mobilde 2×2 katlanır.
- Koleksiyon dizini: koleksiyon-v1 `.coldex` VERBATIM şerit (6 kart; "30 Günlük İftar
  Menüsü" kartı `gunun-menusu-v1.html`'e köprü).
- 3 koleksiyon rayı: İftara Doğru (gri) / Sahura Doğru (beyaz) / Ramazan Tatlıları
  (gri) — `sec-head` + `row-nav` + `row-track` + r-card VERBATIM, "Tamamını Gör" →
  `koleksiyon-v1.html`.
- "Bugünün İftar Menüsü" bandı: v3a `.dayband` VERBATIM (fixed-bg, ≤1024 scroll
  fallback v3a 1033) + gunun-menusu `.arc-courses` chip dilinin koyu varyantı
  (`.db-courses`) + CTA → `gunun-menusu-v1.html`.
- **Şablon esnekliği:** Yapı sezon-bağımsız: (1) hero görsel + eyebrow/h1/stat seti,
  (2) `.szn-strip` hücre içerikleri (yılbaşında "Yılbaşına Kalan" tek sayaç, diğer
  hücreler tarih/etkinlik), (3) coldex koleksiyon seti, (4) 2-3 tematik r-card rayı,
  (5) dayband günlük menü köprüsü — beşi de veri seviyesinde değişir, CSS/iskelet
  aynen kalır. `?sezon=` paramı `body[data-sezon]`'a yazılır; yılbaşı/bayram
  varyantı için yalnız içerik bloğu (başlıklar, görseller, koleksiyon adları)
  değiştirilir, yeni bileşen gerekmez. Ramazan'a özgü tek şey 4 hücreli vakit
  şeridi — diğer sezonlarda hücre sayısı düşürülerek aynı şerit kullanılır.

### sss-v1.html
- Üst bölge: gri zemin, olcu-birimleri `.ob-head` dili + SSS içi canlı arama
  (v3a `.search-input` VERBATIM; 2. karakterden itibaren tüm kategorilerde filtre,
  temizle butonu, boş durumda `pf-empty` dilinde kart + "Soru Sor" → Görüş Bildir).
- Kategori şeridi: `.pf-tabbar` VERBATIM (sayaçlı 5 sekme, `?kat=`); arama
  modundayken sekmeler soluklaşır (`.searching`).
- Akordeon `.qa`: tarif-liste `.fct` aç/kapa deseninin kart varyantı (yeni türev —
  kılavuzda hazır soru-cevap akordeonu yok; en yakın akraba fct + conv-card kabuğu).
  max-height transition ile smooth; ilk soru açık; aynı anda tek soru açık;
  ikon kutusu domates-tint (boş durum ikon dili).
- CTA: koleksiyon `.coll-cta` VERBATIM → `iletisim-v1.html` + Görüş Bildir.
- Cevap içi köprüler: giris / hesabim / tarif-ekle / mutfak-defteri /
  diyetisyen-dizin / reklam-ver / yasal-v1(?metin=iade·mesafeli·kullanim).
- Zemin ritmi: gri (başlık) → beyaz (liste) → gri (CTA).

### Ortak
- 3 sayfada da çerez banner + Görüş Bildir modal yasal linkleri `yasal-v1.html?metin=
  cerez|aydinlatma|kvkk`'ya bağlandı (kendi dosyalarım — şablon gereği serbest).
- Nav aktifliği: sezon → "Tarifler" aktif (tarif landing ailesi); arama + sss →
  ana navda eş yok, aktiflik kaldırıldı.
- Header-altı nefes: 3 sayfada da ilk section `.below-header` + breadcrumb 18px üst
  iç nefes (Dalga 1 standardı) — inline override yok.

---

## 3. Footer link denetimi (④)

Kapsam: `anasayfa-portal-v3a.html` + tüm `*-v1.html` (footer'ı olan 53 dosya).
Yöntem: Python script (`mockups/.ss-scratch/build4/` içinden çalıştırıldı; detay
döküm `footer-audit.json`) — yalnız `<footer>` içi `href="#"` linklerde tek
attribute değişikliği; class/metin/yapıya dokunulmadı. Sonrası yapı doğrulaması:
her dosyada tam 1 `<footer>` korunmuş, örnek sayfalar headless'ta hatasız.

### Uygulanan bağlama haritası (53 dosyada ortak 14 link)

| Footer linki | Yeni hedef |
|---|---|
| S.S.S. | sss-v1.html |
| Hakkımızda | hakkimizda-v1.html |
| Künye | hakkimizda-v1.html |
| Bize Ulaşın | iletisim-v1.html |
| Reklam Vermek İçin | reklam-ver-v1.html |
| Sponsorlar ve Partnerler | reklam-ver-v1.html |
| İptal, İade ve Değişim | yasal-v1.html?metin=iade |
| Ödeme ve Teslimat | yasal-v1.html?metin=teslimat * |
| Mesafeli Satış | yasal-v1.html?metin=mesafeli |
| Gizlilik ve Çerez | yasal-v1.html?metin=cerez |
| Üyelik Sözleşmesi | yasal-v1.html?metin=uyelik |
| Kullanım Koşulları | yasal-v1.html?metin=kullanim |
| Aydınlatma Metni | yasal-v1.html?metin=aydinlatma |
| KVKK | yasal-v1.html?metin=kvkk |

\* Brief'in metin listesinde yoktu; `yasal-v1.html` diskte `?metin=teslimat`'ı
destekliyor (sayfada panel mevcut) → belirsizlik yok, bağlandı.

İstisna dosyalar (+1'er link, shell konvansiyonuyla):
- `olcu-birimleri-v1.html`: "Ölçü Birimleri" → olcu-birimleri-v1.html (diğer tüm
  sayfalarda zaten bu hedefe bağlıydı, bu dosyada `#` kalmıştı)
- `mutfak-defteri-v1.html`: "Şefler" → mutfak-defteri-v1.html (aynı durum)

Dosya listesi (14 link): akademi, alisveris-listesi, arama, bazal-metabolizma,
beden-kutle-endeksi, besin-kutuphanesi, bildirimler, bugun-ne-pisirsem, dada-shop,
diyet-listeleri, diyet-program-detay, diyetisyen-dizin, diyetisyen-ol,
diyetisyen-profil, giris, gunluk-kalori, gunluk-su, gunun-menusu, haftalik-menu,
hakkimizda, hata, hesabim, ideal-kilo, iletisim, kategori, kesfet, koleksiyon,
mutfaga-giris, mutfak-sirlari, odeme, onboarding, puf-noktalari, reklam-ver,
saglik-hub, saglik-testler, seo-landing, sepet, sezon, siparislerim, sozluk, sss,
tarif-bulucu, tarif-detay, tarif-ekle, tarif-liste, urun-detay, urun-liste,
video-mutfagi, vucut-tipi, yasal (hepsi -v1.html) + anasayfa-portal-v3a.html.

### Dokunulmayanlar (hedef belirsiz — bilinçli)
- **Şef Ol** (Kurumsal kolonu) — hedef sayfa yok (şef başvuru akışı tanımsız)
- **Öneri ve Şikayet** (İletişim kolonu) — doğal hedef Görüş Bildir modalı; href ile
  modal açılamaz, onclick eklemek attribute sözleşmesini aşar
- **İhlal Bildir** (yasal bar) — aynı durum (modalın "İhlal bildirimi" konusu)
- Sosyal ikonlar (`#`) — dış mock linkler, kapsam dışı

---

## 4. Açık sorular (iş durmadı, karar rapora)

1. **"Şef Ol" footer linki** — hedef sayfa hiç üretilmedi (kapanis1 kapsamında da
   yok). Öneri: tarif-ekle-v1'e mi bağlanır, ayrı başvuru sayfası mı açılır?
2. **"Öneri ve Şikayet" + "İhlal Bildir"** — Görüş Bildir modalına bağlanmalı;
   bunun için footer linklerine `onclick` (veya `href="#fb"` + shell JS'inde yakalama)
   gerekir → shell chrome'a dokunma yetkisi isteyen iş, lead kararı.
3. **hesaplayici-v1.html'de site footer'ı hiç yok** (0 adet `<footer>`) — Dalga 2'den
   gelen sapma, bu denetimde dokunulmadı (sahibi farklı sayfa ailesi).
4. **Sezon: "Günün Ayeti" bloğu** — eski Ramazan sayfalarının dini içerik bloğu
   modern şablona alınmadı (editöryel/marka kararı gerektirir).
5. **Arama "Son Aramaların"** — mock statik; gerçekte localStorage/hesap geçmişi
   ister (stack kararı sonrası).

---

## 5. Kabul kriterleri durumu

- **Konsol 0 hata:** error-probe (capture-phase error + unhandledrejection) enjekte
  edilip `--dump-dom` ile okundu — 7 durum (arama×4, sezon, sss×2) hepsi `ERRS:0`.
- **390 taşmazlık:** `_host390.html` iframe probu — 6 durum hepsi `sw:390 / iw:390`.
- **Header-altı nefes:** 3 sayfada `.below-header` + ≥16px iç nefes, inline override yok.
- **Footer yapı koruması:** 53 dosyada `<footer>` sayısı denetim sonrası aynı (1).

## 6. SS yolları (mockups/.ss-scratch/)

| Durum | Dosya |
|---|---|
| Arama ?q=menemen 1440/500 | arama-v1-1440.png · arama-v1-500.png |
| Arama ?tab=tarifler | arama-v1-tab-tarifler-1440.png |
| Arama ?empty=1 1440/500 | arama-v1-empty-1440.png · arama-v1-empty-500.png |
| Arama sorgusuz | arama-v1-sorgusuz-1440.png |
| Arama tam akış | arama-v1-full-1440.png |
| Sezon 1440/500 | sezon-v1-1440.png · sezon-v1-500.png |
| Sezon tam akış | sezon-v1-full-1440.png |
| SSS 1440/500 | sss-v1-1440.png · sss-v1-500.png |
| SSS ?kat=shop | sss-v1-kat-shop-1440.png |
| SSS tam akış | sss-v1-full-1440.png |

Üretim parçaları + splice + footer script/dökümü: `mockups/.ss-scratch/build4/`
(arama|sezon|sss × css/body/js, splice.py, footer-audit.json).
