# DALGA 2 — SENTEZ RAPORU (team-lead)

> Tarih: 2026-06-11 · Takım: dalga2 (5 teammate) · 19 sayfa + navigasyon bağlama
> Detaylar: `outputs/{kesif,shop,saglik,diyetisyen,landing}-rapor.md` (L1 kıyas tabloları orada)
> COMMIT ATILMADI — Beyar SS turu + onay sonrası toplu commit (ritüel).

## 1. Sayfa durumları — 19/19 KABUL

| Teammate | Sayfa | Durum |
|---|---|---|
| kesif | bugun-ne-pisirsem-v1 | ✅ **+R2 (Beyar reddi):** wizard tarif-ekle .stepper/.form-card ailesine taşındı, kompakt seçim kartları (ikonlu, sel state), 5/4 sayaç senkron bug'ı düzeltildi, özet chip birikimi + sonuçta canlı r-card. Tıklama probe ile doğrulandı |
| kesif | tarif-bulucu-v1 | ✅ **3 revize turu:** dolap konsepti → class kriterleri → iki-kolon mimari (sol sticky akordeon panel + sağ canlı grid, ilk ekranda sonuç) + Beyar'ın 3 düzeltmesi. Yapısal probe + SS ile doğrulandı |
| kesif | haftalik-menu-v1 | ✅ (YILDIZ m5: 7g×3 öğün board + kişi ölçekleme + reyon-grup alışveriş listesi; mobil board scroll fix) **+Beyar ek işi:** Ekle/Kaldır → "Menündeki N tarifin" sayacı + reyon kalemleri CANLI (tarif→malzeme haritası, ×N paylaşım rozeti). Probe: 18→17→18, Tereyağı satırı reyona düştü ✔ |
| kesif | kesfet-v1 | ✅ (disc-card grid + `?detay=1` uzun-form) |
| shop | dada-shop-v1 | ✅ (vitrin + kampanya + raylar) |
| shop | urun-liste-v1 | ✅ (facet mirası + p-card grid) |
| shop | urun-detay-v1 | ✅ (galeri + varyant + m19 tarif rayı) |
| shop | — sepet izleri | ✅ **1 revize turu:** header badge'li sepet (yalnız 3 shop sayfası — shell sapması rapor §5), p-card sepete ekle + toast, dmCart mock. Grep + CDP doğrulandı |
| saglik | saglik-hub-v1 | ✅ (calc-card + diet-panel + besin girişi) |
| saglik | hesaplayici-v1 | ✅ (×5'in ŞABLONU, BKİ örneği + gauge + tarife köprü) |
| saglik | saglik-testler-v1 | ✅ (quiz motoru + `?sonuc=1`) |
| saglik | diyet-listeleri-v1 | ✅ (m6 — web'de tanıtım dili + app bandı) |
| saglik | besin-kutuphanesi-v1 | ✅ (arama + satır liste + `?besin=1` detay) |
| diyetisyen | diyetisyen-dizin-v1 | ✅ (facet + 9 uzman kartı) |
| diyetisyen | diyetisyen-profil-v1 | ✅ (pf-mirası + 4 sekme + `?randevu=1` slot modalı + `?msg=1`) |
| diyetisyen | diyetisyen-ol-v1 | ✅ **1 revize turu (R1):** yerleşim — gerçek grid bug'ı (3. child sağ kolonu işgal ediyordu) → sol form + sağ sticky ray, tarif-ekle aile dili |
| landing | kategori-v1 | ✅ (lst-hero kategori varyantı + alt kategori rayı) |
| landing | koleksiyon-v1 | ✅ (hero + küratör + numaralı kartlar + dizin mini ray) |
| landing | seo-landing-v1 | ✅ (Airfryer örneği + prose + SSS akordeon) |
| landing | gunun-menusu-v1 | ✅ (m11: tarih hero + 4'lü menü + arşiv şeridi) |

Tümünde: _shell kopyası, mega menü kilitli, kılavuz §2b mirası, konsol 0 hata,
390 taşma 0 (JS probe), L1 eski-template kıyası raporlarda. READ-ONLY ihlali yok
(git ile teyit: Dalga 0/1 dosyaları + handoff/lessons el değmemiş).

## 2. Navigasyon bağlama (lead, SADECE href/onclick hedefi)

- 26 dosyada ~47'şer chrome linki bağlandı (header nav, mega menü 12 kategori →
  kategori-v1, topbar Tarif Ekle → tarif-ekle-v1 / Diyetisyen Ara → diyetisyen-dizin-v1,
  drawer, bottom-nav, footer, logo → anasayfa). Araç: `mockups/.ss-scratch/navbind.py`.
- v3a: 6 see-all + 57 kart bağlandı (r/feat→tarif-detay, vid→video-mutfagi,
  p→urun-detay, chef→mutfak-defteri, disc→kesfet, calc→hesaplayici, cat→kategori-v1).
- 6 tıklama yolculuğu doğrulandı (ana→liste→detay · ana→video · ana→diyetisyen
  dizin→profil · mega→kategori→detay · ana→shop→ürün→m19 rayı→detay · shell-mirası nav).
  Kırık hedef 0.
- **Bilinçli `#` kalanlar:** Mutfak Sırları ailesi (Temel Teknikler/Püf/Sözlük/Ölçü —
  F11 Dalga 3), Dada Akademi (yakında), Şef Ol, yasal/kurumsal (Tier 5), sosyal
  ikonlar, app badge'leri, Sepete Git (Dalga 3), v3a Mutfak Sırları see-all'u.
- **En yakın akrabaya bağlananlar:** bottom-nav "Hesap" → mutfak-defteri-v1 (F6 Dalga 3),
  footer "Şefler" → mutfak-defteri-v1 (şef dizini yok).
- **Not:** v3a kartlarına onclick eklendi; kart içi aksiyon butonlarında (r-save,
  chef-follow, p-add) stopPropagation YOK (Dalga 1/2 sayfalarında var) — v3a'da buton
  tıklaması da navigasyona gider. JS eklemek "yapıya dokunma" sayılacağından bilinçli
  bırakıldı; istenirse tek satırlık delege fix Beyar onayıyla eklenir.

## 3. Teknik maddeler — ÜÇÜ DE ONAYLANDI ve UYGULANDI (kapanış paketi)

1. ✅ **tarif-liste-v1 latent hero taşması** — `.lst-hero .lh-main{min-width:0}` +
   `.lh-chips{min-width:0}` ana dosyaya port edildi (probe: taşma yok, hero sağlam).
2. ✅ **Yorum dili: TD `.rev-*` KANONİK** — diyetisyen-profil `.rv-*` → `.rev-*`
   dönüştürüldü (73 değişim, çakışmasız); kılavuz §2'ye kanon notu yazıldı.
3. ✅ **v3a stopPropagation** — tek satır capture-listener eklendi (`.r-save/.p-fav/
   .p-add/.chef-follow/.r-tried`); buton tıklaması artık karta navigasyon tetiklemiyor.

**+ Sistemik hero-üst düzeltmesi (kapanış paketi №1):** 23 sayfa probe ile tarandı —
standart 17px (Dalga 1). İki sapma düzeltildi: dada-shop (inline `padding-top:0`
`.below-header`'ı eziyordu → kampanya şeridi header arkasında kayboluyordu; kaldırıldı)
ve saglik-hub (`.sh-top .rd-crumb{margin-top:16px}`). Kural kılavuz §3'e yazıldı.

## 4. Açık sorular — BEYAR KARARLARI İŞLENDİ (kapanış paketi, 2026-06-11)

**Keşif:** wizard adım sırası ✅ ONAYLI · %uyum rozeti MOCK kalır (backend işi) ·
kalori verisi = DB notu (stack) · reyon eşlemesi MOCK ✅ · keşfet TOGGLE kalır
(route Laravel'de) · "Otomatik Oluştur" MOCK ✅ · erişim: TÜM araçlar misafire açık,
kaydet/deftere-ekle login ister · **alerjen/"İstemediklerim" GERİ GELECEK → DALGA 3** ·
raf taksonomisi (6 raf) ✅ · ikonlar FontAwesome kalır
**Shop:** vitrin hero STATİK ✅ · raylar v3a 4'lü grid ✅ · stokta-yok = "haber ver" ✅ ·
varyant×stok mock yeterli (stack) · facet değerleri mock ✅ · m19 = EDİTÖR SEÇKİSİ,
ileride otomatik
**Sağlık:** **hesaplayıcılar ×6 TAM SAYFA olacak → DALGA 3** (şablon şimdilik kalır) ·
**diyet program-detay → DALGA 3** · besin TOGGLE kalır · app bandı patron m3 kararını
bekler, ekleme yok
**Diyetisyen:** facet seti mock ✅ · 728×90 reklamın atılması DOĞRU ✅ · randevu/ödeme =
stack notu (mockup'ta slot seçici yeterli) · diploma doğrulama süreç notu raporda kalır
**Landing:** üç karar da ✅ ONAYLI — SSS grid altında, Günün Menüsü nav aktifi
"Bugün Ne Pişirsem", koleksiyon dizini hero altı

## 5. SS yolları (`mockups/.ss-scratch/`)

- kesif: `bnp-1440-step1/step3/sonuc` (R2 sonrası), `bnp-500-step1/step2`,
  `bulucu-1440-dolap`, `bulucu-500-dolap`, `bulucu-500-sheet`,
  `haftalik-1440/500`, `haftalik-1440-shop` (canlı liste + ×N rozet), `kesfet-*`
- shop: `{dada-shop,urun-liste,urun-detay}-{1440,500}`, `dada-shop-cart-open`,
  `mobile-header-cart`
- saglik: `{hub,calc,test,diyet,besin}-{1440,500}`, `test-sonuc-1440`, `besin-detay-1440`
- diyetisyen: `dyt-*` (dizin/profil sekmeleri/ol/sent — 8 adet)
- landing: `{kategori,koleksiyon,seo,gunun}-{1440,500}`, `probe-final`

Önizleme: `python3 -m http.server 8765` →
`http://localhost:8765/mockups/anasayfa-portal-v3a.html` (artık gerçek gibi gezilebilir).

## 6. Sonraki adım (ritüel)

Beyar SS turu → seri revize → patron onayı → toplu commit → handoff güncelle →
clear → Dalga 3 (Shop II F9 · Mutfak Rehberi F11 · Auth/onboarding/hesabım F6 +
pişirme modu derinleşmesi/yazdır ara işi).
