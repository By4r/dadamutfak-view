# T3 — list/grid BULGULARI

Kapsam: 14/14 sayfa, 42 SS (3 breakpoint × 14). Tüm ölçümler taşmasız (docSW = viewport, unclipped = 0, errs = []).

| Sayfa | Breakpoint | Bulgu | Severity | Ölçüm | SS |
|---|---|---|---|---|---|
| tarif-liste-v1 | 390 | Subcat chip şeridi (Tencere, Fırın…) overflow-x scroll çalışıyor — script clip-aware atladığı için sayısal taşma yok, gözle kaydırılabilir görünüyor ✅ | ℹ️ | docSW=390 | tarif-liste-v1__390.png |
| tarif-liste-v1 | 390 | Filtre sidebar tam genişlik accordion olarak aşağıya düşüyor, üst üste binme yok ✅ | ℹ️ | — | tarif-liste-v1__390.png |
| tarif-liste-v1 | 390 | Kart listesi tek kolon, başlık 2-satır clamp düzgün, meta (yazar/puan/süre) hizası temiz ✅ | ℹ️ | — | tarif-liste-v1__390.png |
| tarif-liste-v1 | 768 | 2-kolon grid tablet'te mantıklı; filtre sidebar sol sütun olarak açılıyor. Sol filtre + sağ kart grid dengeli ✅ | ℹ️ | — | tarif-liste-v1__768.png |
| tarif-liste-v1 | drawer | Nav drawer açık — filtre sheet ayrı aşağıda, drawer ile çakışmıyor ✅ | ℹ️ | — | tarif-liste-v1__drawer.png |
| kategori-v1 | 390 | Hero + subcat pill şeridi (Tencere Yemekleri, Fırın…) yatay scroll çalışıyor, sayfayı bozmuyor ✅ | ℹ️ | docSW=390 | kategori-v1__390.png |
| kategori-v1 | 390 | Kart listesi tek kolon; başlık, puan, süre meta satırı temiz hizalanmış ✅ | ℹ️ | — | kategori-v1__390.png |
| kategori-v1 | 768 | Tablet'te 2-kolon grid; sol filtre sidebar geniş tutulmuş, kartlar sağda 2 kolon — oran biraz dar ama taşma yok | 🟡 | docSW=768 | kategori-v1__768.png |
| kategori-v1 | drawer | Drawer açıkken filtre bottom-sheet ayrı katman, çakışma yok ✅ | ℹ️ | — | kategori-v1__drawer.png |
| urun-liste-v1 | 390 | Ürün kartları 2-kolon grid — 390'da 2 kolon sıkışık: kart görseli küçük kalıyor (~165px), ürün adı 1-satıra clamp edilemiyor, bazı uzun isimler 3 satıra taşıyor ve fiyat satırı sıkışıyor | 🟠 | docSW=390 | urun-liste-v1__390.png |
| urun-liste-v1 | 390 | Filtre chip şeridi (Kategori, Fiyat Aralığı…) yatay scroll — taşma yok ✅ | ℹ️ | — | urun-liste-v1__390.png |
| urun-liste-v1 | 768 | Tablet'te 3-kolon grid — oran iyi, kart görseli yeterli boyutta, fiyat/puan satırı hizalı ✅ | ℹ️ | — | urun-liste-v1__768.png |
| urun-liste-v1 | drawer | Filtre sheet + drawer ayrı katman, çakışma yok ✅ | ℹ️ | — | urun-liste-v1__drawer.png |
| dada-shop-v1 | 390 | Ana sayfa: yatay ürün kartı şeritleri (Öne Çıkanlar, İndirimli vb.) overflow-x scroll çalışıyor. Kart görseli + isim + fiyat okunabilir ✅ | ℹ️ | docSW=390 | dada-shop-v1__390.png |
| dada-shop-v1 | 390 | "Çok Satanlar" grid bölümü 2-kolon — urun-liste ile aynı sıkışma problemi: 390'da kart eni ~175px, uzun ürün adları sarıp kart yüksekliğini dengesiz büyütüyor | 🟠 | docSW=390 | dada-shop-v1__390.png |
| dada-shop-v1 | 768 | Tablet'te grid 3-4 kolon arası, tutarlı ve okunabilir ✅ | ℹ️ | — | dada-shop-v1__768.png |
| dada-shop-v1 | drawer | Drawer açık, sayfa içeriği doğru öteleniyor, çakışma yok ✅ | ℹ️ | — | dada-shop-v1__drawer.png |
| alisveris-listesi-v1 | 390 | Liste görünümü (malzeme kategorileri + öğeler) tek kolon, hizalama temiz. Malzeme durumu badge'leri (market/evde) doğru görünüyor ✅ | ℹ️ | docSW=390 | alisveris-listesi-v1__390.png |
| alisveris-listesi-v1 | 768 | Tablet'te 2-sütun layout (liste sol, özet sağ) düzgün ✅ | ℹ️ | — | alisveris-listesi-v1__768.png |
| alisveris-listesi-v1 | drawer | Drawer açık, içerik öteleniyor ✅ | ℹ️ | — | alisveris-listesi-v1__drawer.png |
| ansiklopedi-v1 | 390 | Alfabetik harf rayı (A-Z) yatay scroll — taşma yok, scroll edilebilir görünüyor ✅ | ℹ️ | docSW=390 | ansiklopedi-v1__390.png |
| ansiklopedi-v1 | 390 | Malzeme kategorisi grid: 3-kolon kare kartlar — 390'da 3 kolon çok sıkışık, kart eni ~118px, kategori adı (örn. "Baharat & Çeşni") 2 satıra kırılıyor ve görsel ile metin çakışıyor | 🔴 | docSW=390 | ansiklopedi-v1__390.png |
| ansiklopedi-v1 | 768 | Tablet'te 4-kolon grid, kart genişliği yeterli, okunabilir ✅ | ℹ️ | — | ansiklopedi-v1__768.png |
| ansiklopedi-v1 | drawer | Drawer açık, grid scroll arkasında kalıyor, çakışma yok ✅ | ℹ️ | — | ansiklopedi-v1__drawer.png |
| bugun-ne-pisirsem-v1 | 390 | Malzeme kategori seçici (Çorba, Ana Yemek…) 3-kolon ikon grid — 390'da yeterli eni var, ikon + etiket okunaklı ✅ | ℹ️ | docSW=390 | bugun-ne-pisirsem-v1__390.png |
| bugun-ne-pisirsem-v1 | 390 | Adım stepper (1-2-3) yatay, 390'da tam oturuyor ✅ | ℹ️ | — | bugun-ne-pisirsem-v1__390.png |
| bugun-ne-pisirsem-v1 | 768 | Tablet'te içerik ortalanmış tek sütun — geniş boşluklar var, ama tasarım gereği kabul edilebilir ✅ | ℹ️ | — | bugun-ne-pisirsem-v1__768.png |
| diyetisyen-dizin-v1 | 390 | Diyetisyen kartları tek kolon liste — avatar, isim, uzmanlık, puan, fiyat satırı temiz hizalı ✅ | ℹ️ | docSW=390 | diyetisyen-dizin-v1__390.png |
| diyetisyen-dizin-v1 | 390 | Filtre chip şeridi (Uzmanlık, Şehir…) accordion'a düşmüş, scroll yok — çalışıyor ✅ | ℹ️ | — | diyetisyen-dizin-v1__390.png |
| diyetisyen-dizin-v1 | 768 | Tablet'te 2-kolon kart grid, sol filtre sidebar — oran iyi ✅ | ℹ️ | — | diyetisyen-dizin-v1__768.png |
| diyetisyen-dizin-v1 | drawer | Nav drawer + filtre sheet ayrı, çakışma yok ✅ | ℹ️ | — | diyetisyen-dizin-v1__drawer.png |
| haftalik-menu-v1 | 390 | Gün sekmesi şeridi (Pzt-Sal-Çar…) yatay scroll çalışıyor ✅ | ℹ️ | docSW=390 | haftalik-menu-v1__390.png |
| haftalik-menu-v1 | 390 | Öğün satırları (Kahvaltı/Öğle/Akşam) tek kolon kart, tarif görseli + isim + kalori hizalı ✅ | ℹ️ | — | haftalik-menu-v1__390.png |
| haftalik-menu-v1 | 768 | Tablet'te gün sekmesi + öğün grid yan yana — düzgün ✅ | ℹ️ | — | haftalik-menu-v1__768.png |
| haftalik-menu-v1 | drawer | Drawer açık, alışveriş özet paneli arkada kalıyor, çakışma yok ✅ | ℹ️ | — | haftalik-menu-v1__drawer.png |
| puf-noktalari-v1 | 390 | Sekme şeridi (Yeni, Neden Öyle, En İyi…) yatay scroll, taşma yok ✅ | ℹ️ | docSW=390 | puf-noktalari-v1__390.png |
| puf-noktalari-v1 | 390 | Makale listesi tek kolon — görsel sol, başlık + meta sağ layout; 390'da sağ metin kolonu dar (<200px) ve uzun başlıklar 3+ satır kırılıyor | 🟡 | docSW=390 | puf-noktalari-v1__390.png |
| puf-noktalari-v1 | 768 | Tablet'te aynı layout daha rahat, 3 satır kırılma yok ✅ | ℹ️ | — | puf-noktalari-v1__768.png |
| sepet-v1 | 390 | Ürün satır listesi tek kolon, görsel+isim+fiyat+adet kontrol temiz ✅ | ℹ️ | docSW=390 | sepet-v1__390.png |
| sepet-v1 | 768 | Tablet'te sepet + sipariş özeti yan yana 2-kolon — iyi ✅ | ℹ️ | — | sepet-v1__768.png |
| siparislerim-v1 | 390 | Sipariş kartları tek kolon, durum badge + ürün görselleri + fiyat hizalı ✅ | ℹ️ | docSW=390 | siparislerim-v1__390.png |
| siparislerim-v1 | 768 | Tablet'te sipariş kartları hâlâ tek kolon (geniş ekranda 2 kolon beklenebilir, ama mevcut hali işlevsel) | 🟡 | docSW=768 | siparislerim-v1__768.png |
| sozluk-v1 | 390 | Alfabetik harf rayı yatay scroll çalışıyor; terim listesi tek kolon, avatar harf + isim + açıklama clamp temiz ✅ | ℹ️ | docSW=390 | sozluk-v1__390.png |
| sozluk-v1 | 768 | Tablet'te 2-kolon grid — oran mantıklı ✅ | ℹ️ | — | sozluk-v1__768.png |
| tarif-bulucu-v1 | 390 | Malzeme tag chip'leri (Domates, Soğan…) wrap ederek birden fazla satıra düşüyor — scroll değil wrap, bu kasıtlı görünüyor; taşma yok ✅ | ℹ️ | docSW=390 | tarif-bulucu-v1__390.png |
| tarif-bulucu-v1 | 390 | Sonuç kartları tek kolon, kart görsel+başlık+tag+puan hizalı ✅ | ℹ️ | — | tarif-bulucu-v1__390.png |
| tarif-bulucu-v1 | 768 | Tablet'te 2-kolon sonuç grid, malzeme seçici üstte tam genişlik — iyi ✅ | ℹ️ | — | tarif-bulucu-v1__768.png |

---

## Özet Bulgu Tablosu

| Severity | Adet | Sayfalar |
|---|---|---|
| 🔴 Kritik | 1 | ansiklopedi-v1 (390 — 3-kolon kare grid çok sıkışık) |
| 🟠 Önemli | 2 | urun-liste-v1 (390 — 2-kolon sıkışık), dada-shop-v1 (390 — grid kolon sıkışma) |
| 🟡 Minör | 3 | kategori-v1 (768 — filtre sidebar dar), puf-noktalari-v1 (390 — yatay kart metni dar), siparislerim-v1 (768 — tek kolon kalmış) |
| ℹ️ Bilgi | — | geri kalan tüm kontroller temiz |

---

## En Kritik 3 Bulgu (Fix Önceliği)

### 1. 🔴 ansiklopedi-v1 — 390'da 3-kolon kare grid sıkışması
Malzeme kategorisi grid 3 kolon, kart eni ~118px. Uzun kategori etiketleri ("Baharat & Çeşni", "Sos & Salça") 2+ satıra kırılıyor ve görsel ile text çakışıyor.
**Fix:** 390'da 2-kolona düşür (`grid-cols-2`), 768'de 4 kolon kalsın.

### 2. 🟠 urun-liste-v1 + dada-shop-v1 — 390'da ürün grid 2-kolon sıkışması
390'da ~175px kart eni. Uzun ürün adları 3 satır sarıyor, kart yükseklikleri aynı satırda dengesiz büyüyor (masonry-olmayan grid).
**Fix:** Kart başlığına `-webkit-line-clamp: 2` zorla; ya da 390'da tek kolon liste görünümüne geç.

### 3. 🟡 puf-noktalari-v1 — 390'da yatay kart düzeni dar
Görsel sol + metin sağ layout'ta sağ metin sütunu <200px, uzun başlıklar 3-4 satır kırılıyor, kart orantısız uzuyor.
**Fix:** 390'da görsel üst / metin alt dikey kart düzenine geç; yatay layout 480px+'da devreye girsin.
