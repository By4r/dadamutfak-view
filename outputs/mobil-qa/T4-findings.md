# T4 — detail BULGULARI
Kapsam: 13/13 sayfa, 39 SS (13 × 3 breakpoint). Ölçüm: measure.cjs --ss.

| Sayfa | Breakpoint | Bulgu | Severity | Ölçüm | SS |
|---|---|---|---|---|---|
| **tarif-detay-v1** | 390 | **ÖZELLİK CHİP TEKRARI** — Hero overlay'de `tbadge` olarak "Protein Ağırlıklı" + "Baharatlı"; künyenin `kc-chips` panelinde aynı iki chip tekrar + "Acılı" ekleniyor. Mobilde tek kolona düştükten sonra (rd-gallery 1fr @ ≤1024) kullanıcı önce hero'da rozet görüyor, aşağı scroll'da kc-chips'te aynı içeriği tekrar görüyor. Toplam 2 chip çift. | 🟠 | docSW=390 ✅ | `tarif-detay-v1__390.png` |
| **tarif-detay-v1** | 768 | Hero'da 4 tbadge (Editör Onaylı, Diyetisyen Yorumlu, Protein Ağırlıklı, Baharatlı) görsel olarak küçük hero yüksekliğinde yığılıyor; kc-chips paneli ise sağ kolonda ayrı gösteriliyor — desktop'ta yan yana olduğu için çift algısı daha az belirgin ama içerik tekrarı devam ediyor. | 🟡 | docSW=768 ✅ | `tarif-detay-v1__768.png` |
| **tarif-detay-v1** | 390 | Sağ panel (künye/kc-card) mobilde tek kolona iniyor, sticky CTA yok, bottom-nav ile çakışma yok. ✅ temiz. | ✅ | — | — |
| **tarif-detay-v1-headA** | 390 | Chip tekrarı YOK: Hero yalnız editöryal rozetler (Editör Onaylı, Diyetisyen Yorumlu). Malzeme paneli (ing-props) farklı içerik chip'leri (Türk Mutfağı, Misafir Menüsü, Çocuk Dostu, Acılı iseğe bağlı, Vegan ikamesi var). Ayrışım net, headA bu sorunu çözmüş. ✅ | ✅ | docSW=390 ✅ | `tarif-detay-v1-headA__390.png` |
| **tarif-detay-v1-headA** | 768 | Hero chip'leri yalnız Editör/Diyetisyen. ing-props içerik chip'leri malzeme panelinde. Temiz. ✅ | ✅ | docSW=768 ✅ | `tarif-detay-v1-headA__768.png` |
| **tarif-ekle-v1** | 768 | `bodySW=827` (docSW=768). Gerçek taşma DEĞİL — body.scrollWidth, `overflow-x:auto` içindeki adım fotoğrafı strip'ini (st-shot 148px × N items, `overflow:hidden` parent) hesaba katıyor. Unclipped=0, görsel taşma yok. Browser quirk. | ℹ️ | docSW=768 ✅, unclipped=0 | `tarif-ekle-v1__768.png` |
| **tarif-ekle-v1** | 390 | wiz-grid tek kolona iniyor (≤1024 kuralı). Form alanları (tarif adı, kategori, sezon/tür checkboxlar) düzgün sıralı. up-grid fotoğraf yükleme 5 kolon → ≤520'de 3 kolona iniyor. Drag-drop alanı tam genişlik. ✅ | ✅ | docSW=390 ✅ | `tarif-ekle-v1__390.png` |
| **puf-noktasi-ekle-v1** | 390 | Form düzeni tek kolon, input/label taşması yok. Video/fotoğraf yükleme tam genişlik. ✅ | ✅ | docSW=390 ✅ | `puf-noktasi-ekle-v1__390.png` |
| **puf-noktasi-ekle-v1** | 768 | ✅ temiz. | ✅ | docSW=768 ✅ | `puf-noktasi-ekle-v1__768.png` |
| **odeme-v1** | 390 | Adres kartları tek kolon, fatura adresi checkbox tam genişlik, "Kargo Seçimine Geç" butonu tam genişlik. Sepet özeti altta. ✅ | ✅ | docSW=390 ✅ | `odeme-v1__390.png` |
| **odeme-v1** | 768 | İki adres kartı yan yana. Layout düzgün. ✅ | ✅ | docSW=768 ✅ | `odeme-v1__768.png` |
| **urun-detay-v1** | 390 | pd-head tek kolona iniyor (≤1024). pd-gallery statik konuma geçiyor. btn-cart tam genişlik wrap (≤640 kuralı). Fiyat + sepete ekle butonu erişilebilir konumda. ✅ | ✅ | docSW=390 ✅ | `urun-detay-v1__390.png` |
| **urun-detay-v1** | 768 | Galeri sticky kalkıyor (position:static ≤1024), bilgi sütunu altına geliyor. Sağ col tek kolon. ✅ | ✅ | docSW=768 ✅ | `urun-detay-v1__768.png` |
| **mekan-detay-v1** | 390 | rd-gallery tek kolona iniyor (≤1024). Harita mock (CSS-çizim, iframe yok) tam genişlik düzgün görünüyor. ap-grid adres+saat yan yana → ≤1024'te 1 kolona iniyor. ✅ | ✅ | docSW=390 ✅ | `mekan-detay-v1__390.png` |
| **mekan-detay-v1** | 768 | ✅ temiz. | ✅ | docSW=768 ✅ | `mekan-detay-v1__768.png` |
| **diyetisyen-profil-v1** | 390 | ab-grid (1fr + 320px sidebar) → ≤1024'te 1 kolona iniyor. menu-thumbs 4 kolon tüm breakpoint'lerde sabit — 390'da ~82px/thumb, küçük ama overflow yok. svc-grid/rr-grid ≤640'da 1 kolona iniyor. apt-slots 3 kolona iniyor (≤640). ✅ ölçüm geçti. | ✅ | docSW=390 ✅ | `diyetisyen-profil-v1__390.png` |
| **diyetisyen-profil-v1** | 768 | ✅ temiz. | ✅ | docSW=768 ✅ | `diyetisyen-profil-v1__768.png` |
| **ansiklopedi-detay-v1** | 390 | İçerik tek kolon, besin değerleri tablosu, ilgili maddeler, konu chip'leri düzgün. ✅ | ✅ | docSW=390 ✅ | `ansiklopedi-detay-v1__390.png` |
| **ansiklopedi-detay-v1** | 768 | ✅ temiz. | ✅ | docSW=768 ✅ | `ansiklopedi-detay-v1__768.png` |
| **diyet-program-detay-v1** | 390 | Program bilgi satırı (7 gün, 21 öğün, 4.8 puan) flexbox sarıyor. Haftalık plan tablosu overflow-x:auto içinde yatay scroll'lanıyor. Program CTA butonları tam genişlik. ✅ | ✅ | docSW=390 ✅ | `diyet-program-detay-v1__390.png` |
| **diyet-program-detay-v1** | 768 | ✅ temiz. | ✅ | docSW=768 ✅ | `diyet-program-detay-v1__768.png` |
| **mutfaga-giris-detay-v1** | 390 | İçerik tek kolon (makale formatı). Yazar kutusu, yorumlar, ilgili haberler düzgün. ✅ | ✅ | docSW=390 ✅ | `mutfaga-giris-detay-v1__390.png` |
| **mutfaga-giris-detay-v1** | 768 | ✅ temiz. | ✅ | docSW=768 ✅ | `mutfaga-giris-detay-v1__768.png` |
| **mutfak-defteri-v1** | 390 | Profil başlığı tam genişlik, avatar negatif margin ile kart üstüne geliyor. Tarif kartları yatay scroll snap'e geçiyor (≤640). menu-set (yemek planı) yatay snap. badge-grid 2 kolon. ✅ | ✅ | docSW=390 ✅ | `mutfak-defteri-v1__390.png` |
| **mutfak-defteri-v1** | 768 | ✅ temiz. | ✅ | docSW=768 ✅ | `mutfak-defteri-v1__768.png` |
| **puf-noktasi-detay-v1** | 390 | İçerik tek kolon, adım adım anlatı düzgün. Yazar kutusu tam genişlik. ✅ | ✅ | docSW=390 ✅ | `puf-noktasi-detay-v1__390.png` |
| **puf-noktasi-detay-v1** | 768 | ✅ temiz. | ✅ | docSW=768 ✅ | `puf-noktasi-detay-v1__768.png` |

---

## Özet

**Taşma bulgusu (docSW / unclipped): 0 sayfa** — 13 sayfanın hiçbirinde gerçek layout taşması yok.

**Chip tekrarı (hedef sorun):**
- `tarif-detay-v1`: **TEKRAR VAR** 🟠 — "Protein Ağırlıklı" ve "Baharatlı" hem hero `tbadge` hem `kc-chips` panelinde (2 chip çift). Kök neden: özellik badge'leri hero'ya eklenmiş ama kc-chips temizlenmemiş.
- `tarif-detay-v1-headA`: **TEKRAR YOK** ✅ — headA varyantı doğru tasarım: hero yalnız editöryal rozetler, ing-props panel farklı içerik chip'leri.

**Diğer notlar:**
- `tarif-ekle-v1` 768'de `bodySW=827`: gerçek taşma değil, overflow-x:auto container içi browser scroll-width ölçüm quirk'ü. ℹ️
- `diyetisyen-profil-v1` menu-thumbs 4 kolon 390'da (~82px/thumb): taşma yok ama küçük. Görsel denetimde kabul edilebilir.
