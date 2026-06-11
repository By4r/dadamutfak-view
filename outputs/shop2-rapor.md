# SHOP2 RAPORU — Dalga 3 · Sepet / Ödeme / Siparişlerim / Alışveriş Listesi (F9)

> Teammate: shop2 · Tarih: 2026-06-11 · Port: 8771
> 4 YENİ sayfa + 2 ara iş tamamlandı. Commit ATILMADI (kural gereği).

---

## 1. TESLİM EDİLEN DOSYALAR

| Dosya | İçerik |
|---|---|
| `mockups/sepet-v1.html` | Tam sayfa sepet: satır düzenleme (sil / sonraya bırak / geri al), adet ±, satır ara toplamları, 400₺ ücretsiz kargo eşiği ilerleme çubuğu ("eşiğe X₺ kaldı" → aşınca YEŞİL başarı durumu), kupon (DADA10 %10 mock), boş durum `?empty=1`, "Ödemeye Geç" → odeme-v1 |
| `mockups/odeme-v1.html` | 4 adımlı checkout (`?step=1..4`): Adres (kayıtlı adres radio kartları + fk-* yeni adres formu + fatura-aynı checkbox) → Kargo (3 radio kartı, tutar canlı güncellenir) → Ödeme (maskeli canlı kart önizleme + taksit çipleri) → Özet (recap satırları + Mesafeli Satış + Ön Bilgilendirme checkbox'ları; ikisi onaylanmadan "Siparişi Tamamla" disabled) → `siparislerim-v1.html?yeni=1` |
| `mockups/siparislerim-v1.html` | Sipariş listesi (no/tarih/tutar/durum rozeti/thumb şeridi) + `?yeni=1` başarı bandı + `?detay=1` detay: dikey takip timeline (alındı→hazırlanıyor→kargoda→teslim), kargo takip no + kopyala, adres+ödeme özeti, fatura indir (mock toast) |
| `mockups/alisveris-listesi-v1.html` | Reyon-grup liste (haftalik-menu `.shop-*` VERBATIM) + manuel kalem ekleme (fk-input + reyon select + Enter desteği), işaretle→üstü çizili, işaretlileri temizle, **"Sepete Aktar" köprüsü**: `data-shop`'lu kalemler `dmCart.add` ile sepete, toast "N kalem sepete aktarıldı" |

### Ara işler (izinli istisnalar)
- **dada-shop-v1.html breadcrumb fix:** crumb'ın hiç CSS'i yoktu (yalnız inline renkler) — hero içinde ham/akmış görünüyordu. TD `.rd-crumb` VERBATIM + koyu varyant (`urun-liste .lst-top` renkleri) + `.shop-top .rd-crumb{margin-top:16px}` (kılavuz §3 nefes, saglik-hub deseni) eklendi; inline style'lar temizlendi. Hero tasarımına dokunulmadı.
- **Sepete Git bağlama (3 dosya):** dada-shop / urun-liste / urun-detay'da `.cdd-go href` → `sepet-v1.html`; toast `#ctGo` artık `location.href='sepet-v1.html'` (dropdown toggle davranışı korundu). Playwright ile doğrulandı.

---

## 2. L1 KIYAS — eski template envanteri (drive-download .../dada-mutfak-icerik/)

| Eski dosya | Eski blok | Yeni karşılık | Karar |
|---|---|---|---|
| `sepet.html` | Tablo (Ürün Görseli/Ürün/Fiyat/Adet/Toplam) | `.crt-row` kart-satır grid'i (thumb + bilgi + ± + ara toplam) | TAŞINDI + modernize (tablo→satır kartı, mobil 2 kolon kırılım) |
| `sepet.html` | "Kupon Uygula / Kupon Kodunuzu Giriniz" + Kupon İndirimi satırı | `.cpn` alanı + yeşil indirim satırı (DADA10 mock) | TAŞINDI |
| `sepet.html` | Sipariş Özetiniz (Toplam/KDV/Kargo) | `.sum-card` (Ara Toplam/Kargo/Toplam + "KDV dahildir") | TAŞINDI; ayrı KDV satırı sadeleştirildi → "KDV dahildir" notu |
| `sepet.html` | "Ödeme İşlemine Geç", "Alışverişe Dön" | "Ödemeye Geç" + "Alışverişe Dön" see-all | TAŞINDI |
| — | (yoktu) | 400₺ ücretsiz kargo eşiği ilerleme çubuğu, sonraya bırak, sepeti boşalt, boş durum | YENİ (brief gereği) |
| `odeme.html` | Teslimat/Fatura Adresi Ekle, Adreslerim | Adım 1: kayıtlı adres radio kartları + fk-* form + fatura-aynı | TAŞINDI + modernize (tek sayfa → wizard adımı) |
| `odeme.html` + `odemeyi-tamamla.html` | İki AYRI sayfa (adres → kart) | TEK çok adımlı sayfa, tarif-ekle stepper mirası | MODERNİZE — eski 3 sayfalık akış 4 adımlı tek sayfaya katlandı |
| `odemeyi-tamamla.html` | Kart Bilgileriniz + CVV canlı önizleme scripti | `.card-visual` maskeli canlı kart önizleme (no/isim/SKT) | TAŞINDI (eski sitenin canlı kart önizleme fikri korundu, maskeli yapıldı) |
| `odeme.html` | Mesafeli Satış Sözleşmesi onayı | Adım 4: Mesafeli Satış + Ön Bilgilendirme 2 ayrı checkbox, onaysız buton kilitli | TAŞINDI + genişletildi |
| `odeme.html` | Taksit | Taksit çip satırı (Tek Çekim/3/6) | TAŞINDI |
| — | (kargo seçeneği yoktu, sabit ücret) | Adım 2 kargo radio kartları (standart/hızlı/mağazadan) | YENİ (brief gereği) |
| `siparisiniz-alindi.html` | Ayrı teşekkür sayfası ("Sipariş Numarası", "Siparişleri Görüntüle") | `siparislerim-v1.html?yeni=1` yeşil başarı bandı | MODERNİZE — ayrı sayfa atıldı, başarı izi liste sayfasına katlandı |
| `hesabim.html` | Siparişlerim sekmesi (Sipariş No, Devam Ediyor/Tamamlandı/İptal Edildi) | Durum rozetleri: Sipariş Alındı / Kargoda / Teslim Edildi / İptal Edildi + Hazırlanıyor | TAŞINDI + genişletildi (timeline yoktu → dikey takip timeline YENİ) |
| `fatura.html` | Yazdırılabilir fatura (adresler, ödeme türü, ürün tablosu) | "Faturayı İndir (PDF)" mock butonu + toast | ATILDI/ERTELENDİ — ayrı fatura görünümü stack işi; mockta indirme izi yeterli görüldü |
| eski tüm sayfalar | "Görüş Bildirin" slide-out, eski header/footer | Kanonik shell chrome'u | Şablon gereği zaten karşılanıyor |

---

## 3. MİRAS ALINAN BİLEŞENLER (verbatim, class adları korunarak)

- **dmCart ailesi** (dada-shop): `.cart-wrap/.cart-btn/.cart-badge/.cart-dd/.cdd-*/.cart-toast/.ct-*` CSS+HTML+JS 4 sayfaya bire bir taşındı. **Motor yeniden yazılmadı** — sepet sayfası header dropdown'ını dmCart'ın kendi DOM id'leri (`cartItems/cartBadge/cartSub...`) üzerinden besler; alışveriş listesi aktarımı `window.dmCart.add` çağırır.
- **Stepper + wizard iskeleti** (tarif-ekle): `.stepper .stp .stp-num .stp-lbl .stp-line` + `.fp-top .fp-head .fp-body .wstep .wiz-grid .wiz-main .wiz-foot .wf-note` + `.form-card .fc-head .fc-step` — yeni stepper icat edilmedi.
- **fk-* form kiti** (tarif-ekle): input/select/textarea/label/help/grid — odeme tam set; sepet (kupon) ve alışveriş (ekleme barı) yalnız taban alan.
- **Reyon-grup listesi** (haftalik-menu): `.shop-layout .shop-list .shop-group .shop-ghead .shop-headrow .shop-items .shop-item .shop-summary .ss-*` + `.cbx` — alışveriş listesinde verbatim.
- **`.ss-prog/.ss-progtxt`** (haftalik-menu) — sepet kargo eşiği çubuğu olarak yeniden kullanıldı.
- **`.rd-crumb`** (TD) — 4 sayfada + dada-shop fix'inde.
- **`.lst-empty/.le-ico`** (tarif-liste) — sepet boş durumu (kılavuz §3 deseni).
- **`.cbx`** (facet) — odeme sözleşme checkbox'ları (`.agree` sarmalayıcısıyla).

### Sıfırdan kurulan bileşenler (gerekçeli)
1. **`.pick-card` radio seçim kartı** (odeme — adres + kargo): radio-kart deseni hiçbir sayfada çözülmemişti; `.fct` checkbox satırı + `.fb-topic` buton dilinden türetildi, iki bağlamda ortak kullanıldı. Token radius, domates seçili durum.
2. **`.crt-row` sepet satırı** (sepet): tam sayfa sepet satırı (±, ara toplam, satır aksiyonları) `.cdd-item`'ın büyütülmüş akrabası — dropdown satırı bu yoğunluğu taşımıyor.
3. **`.tml` dikey takip timeline'ı** (siparişlerim): sitede dikey durum timeline yoktu; `.stp-num` daire dili + yeşil-done/domates-aktif kodu.
4. **`.ost` durum rozeti** (siparişlerim): sbanner renk ailesinden (draft/review/rejected) türetilen 5 varyant.
5. **`.card-visual`** (odeme): maskeli kart önizleme — eski sitenin canlı önizleme mirasının yeni dile çevirisi (slate gradient + nokta doku).
6. **`.sum-card/.sum-row/.sum-total`** (sepet→odeme→siparişlerim ortak): tutar özeti dili — üç sayfada aynı class'larla tekrar kullanıldı (set-içi tutarlılık).

---

## 4. VERİLEN KARARLAR

1. **Yeşil kullanımı:** kargo eşiği aşılınca `.ship-goal.done` + "Ücretsiz" değeri + "Teslim Edildi" rozeti + başarı bandı YEŞİL — brief'teki "yeşil yalnız sağlık/indirim/ücretsiz-kargo başarı durumu" iznine ve toast `.ct-ico`/`.fb-success` emsaline dayanıyor.
2. **Sepet ↔ header senkronu:** sayfa satırları değiştikçe (adet/sil/kaydet) header badge + dropdown yeniden kurulur; toast tetiklenmez (yüklemede toast patlamasın diye `dmCart.add` ile değil doğrudan DOM ile seed edildi).
3. **Tutar kurgusu:** sepet 3 ürün = 352₺ → "48₺ kaldı" dili görünür; adet artırınca eşik CANLI aşılır (yeşil duruma geçiş demo edilebilir). Odeme aynı ürünlerle tutarlı (352 + kargo seçimi).
4. **Eski 3 sayfalık checkout** tek wizard'a katlandı (sektör standardı + stepper mirası hazır).
5. **`?detay=1`** tek mock siparişi (#DM-23984, Kargoda) açar — en zengin timeline durumu (2 done + 1 aktif + 1 bekleyen + takip no).
6. **Fatura** = mock indirme toast'ı; ayrı fatura/yazdırma görünümü kapsam dışı bırakıldı (bkz. açık soru 2).
7. Sepette çapraz satış rayı (p-card) bilinçli eklenmedi — brief'te yok, sayfa odağı ödeme hunisi.

## 5. AÇIK SORULAR (3)

1. **Sipariş durum taksonomisi:** Eski site "Devam Ediyor/Tamamlandı/İptal" kullanıyordu; mockta 5 durum var (Alındı/Hazırlanıyor/Kargoda/Teslim/İptal). Backend durum seti stack kararıyla netleşmeli.
2. **Fatura görünümü:** `fatura.html` (yazdırılabilir) ayrı sayfa olarak taşınacak mı, yoksa PDF üretimi mi (stack işi)? Mock şimdilik toast izi.
3. **Kupon kuralları:** tek kupon mu, kargo eşiği indirimli tutardan mı hesaplanır (mockta indirimli tutardan) — iş kuralı onayı gerekli.

## 6. KANIT

- **Konsol:** 4 sayfa × tüm durumlar headless dump + Playwright oturumu → **0 sayfa hatası** (yalnız Chrome-içi GCM/process gürültüsü ve odeme'de 1 INFO seviyesinde "password field not in a form" tarayıcı tavsiyesi — hata değil).
- **390 taşmazlık:** iframe probe (`.ss-scratch/shop2-390.html`) → 8 durumda `documentElement.scrollWidth=390` PASS (offender listesi yalnız ekran dışı drawer chrome'u).
- **Etkileşim smoke (Playwright):** sepet (adet→eşik yeşili→kupon→sonraya bırak→geri al→boşalt→boş durum→badge senkron) ✔ · odeme (adım nav, kargo→tutar, maskeli kart önizleme "5312 •••• •••• 3456", sözleşme kilidi, tamamla→`?yeni=1` yönlendirme) ✔ · siparişlerim (banner, detay toggle, fatura toast, kopyala) ✔ · alışveriş (işaretle %7, Tahin ekle, temizle, sepete aktar→badge 3 + toast + dropdown 3 ürün) ✔ · shop ailesi ct-go/cdd-go → sepet-v1 ✔
- **SS'ler** (`mockups/.ss-scratch/`): `sepet-1440.png` `sepet-500.png` `sepet-empty-1440.png` · `odeme-1440.png` `odeme-step3-1440.png` `odeme-step4-1440.png` `odeme-500.png` · `siparislerim-1440.png` (?yeni=1) `siparislerim-detay-1440.png` `siparislerim-500.png` · `alisveris-1440.png` `alisveris-500.png` · `dada-shop-crumbfix-1440.png` + zoom kanıtları (`zoom-kupon2.png`, `zoom-shopcrumb.png`)
- Bulunan ve düzeltilen tek görsel bug: `.sum-card .btn{width:100%}` kupon "Uygula" butonunu ezip input'u daraltıyordu → `.sum-card .cpn .btn` override.

## 7. İSTİSNA DIŞI DOKUNMA İSTEĞİ

Yok. Yalnız izin verilen dosyalara yazıldı (4 yeni sayfa + dada-shop/urun-liste/urun-detay izinli dokunuşları + .ss-scratch/outputs).

## 8. NAVİGASYON NOTU (lead için)

Set-içi akış bağlı: sepet→odeme→siparislerim(?yeni=1) + sepet boş durumu↔alışveriş listesi + alışveriş listesi→haftalik-menu + crumb'lar (Dada Store / Hesabım). Site geneli nav'a (header/mega/footer'dan bu sayfalara giriş, ör. hesap menüsünden "Siparişlerim") dokunulmadı — lead bağlayacak; `navbind.py` yeniden koşulabilir.
