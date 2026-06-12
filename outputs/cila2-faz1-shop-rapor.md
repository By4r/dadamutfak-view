# CİLA-2 Faz 1 — SHOP modülü raporu (teammate: shop)

> Sahiplik: `dada-shop-v1.html`, `urun-liste-v1.html`, `urun-detay-v1.html`,
> `sepet-v1.html`, `odeme-v1.html` + `anasayfa-portal-v3a.html` (yalnız DadaShop
> nav öğesi). Tüm 8 iş tamamlandı, probe + SS ile kanıtlandı.

## Yapılan işler (8/8)

### 1) DadaShop AYRI MAĞAZA KABUĞU (5 dosya tutarlı)
Ana site nav'ı (Tarifler/Mutfak Sırları/Sağlık/Bugün Ne Pişirsem) shop ailesinden
KALDIRILDI. Yeni mağaza chrome'u (token/font/footer/cookie/feedback/bottom-nav
**mekaniği** _shell ile birebir; sadece chrome İÇERİĞİ farklılaştı):
- **Topbar:** "← DadaMutfak'a dön" + ücretsiz kargo + sosyal + Sipariş Takibi + Yardım + dil
- **Header nav:** Mağaza · Kategoriler (2-kolon dropdown) · Kampanyalar (İndirim rozeti) · Çok Satanlar · Yöresel + "Ana Site" dönüş butonu
- **Drawer (mobil):** mağaza menüsü + "← DadaMutfak'a Dön"
- **Bottom-nav (mobil):** Mağaza · Kategoriler · Sepet(FAB) · Favoriler · Hesabım
- **dmCart sepet izleri KORUNDU:** `cartWrap/cartBadge/cartDd/cartToast` + `window.dmCart` motoru intact (probe PASS).
- Script: `.ss-scratch/cila2/shop/apply_shell.py` (regex bölge-değişimi, 5 dosya). CSS enjeksiyonu ayrı düzeltildi (guard bug'ı, aşağıda).

### 2) Anasayfa DadaShop öğesi — direkt link
`anasayfa-portal-v3a.html` header'daki "Dada Store" öğesinden dropdown + chevron
kaldırıldı → `<a href="dada-shop-v1.html">Dada Store</a>`. Nav JS yalnız
`.dropdown,.mega` içeren öğeye toggle bağlar; artık tıklama doğrudan mağazaya gider.
**Anasayfada başka HİÇBİR ŞEYE dokunulmadı.**

### 3) Shop hero yeniden tasarımı — e-ticaret vitrini
Eski kayık koyu `shop-top` (lst-hero kopyası) → yeni **`.shop-vitrin`**: aydınlık
krem billboard (sol kopya+CTA+trust şeridi) + sağda **öne çıkan ürün showcase kartı**
(badge, favori, görsel, puan, fiyat, İncele). Diğer sayfaların koyu landing
dilinden bilinçli ayrışma; token/radius/tipografi ORTAK. Redundant `promo-strip`
kaldırıldı (kargo bilgisi artık topbar+trust şeridinde).

### 4) Ürün kartı (.p-card) — BOZUK favori düzeltildi + kompakt
**Kök neden:** `.p-fav` CSS'i yalnız `urun-detay-v1.html`'de tanımlıydı;
`dada-shop` ve `urun-liste`'de HİÇ yoktu → kalp butonu stilsiz default `<button>`
olarak indirim rozetinin üstüne biniyordu. **Çözüm:** urun-detay'daki `.p-fav`
kuralı verbatim miras alınıp 3 dosyada kanonik kompakt karta gömüldü (yuvarlak,
beyaz, sağ-üst, `.saved` → dolu domates). `.p-desc` açıklama metni 3 dosyadan
tamamen kaldırıldı (CSS+markup, 24 kart). Kart kompaktlaştırıldı (media 230→200,
body padding 18→13/15, h4 17→15, p-add 46→42). Script: `apply_pcard.py`.

### 5) Bambu/ahşap ürün içeriği (bambumstore tarzı serpiştirme)
Mevcut katalog ARASINA eklendi (hepsi değiştirilmedi): dada-shop'a 4 ürün
(Bambu Kesme Tahtası 3'lü, Ahşap Servis Tepsisi, Bambu Saklama Kavanozu Seti,
Ahşap Spatula & Kaşık Seti) + "Bambu & Ahşap" kategori kartı; urun-liste'ye 3 ürün
+ "Bambu & Ahşap" facet kategorisi. **Görseller in-file known-good ID'lerden** —
rastgele Unsplash ID'leri içerik riski taşıyor (test: 3 aday kulaklık/armut/kolye
çıktı, doğrulandı). Script: `apply_bambu.py`.

### 6) Sol kategori paneli — görselleştirildi (cat-card dili)
`urun-liste` Kategori facet'i `.cat-fct` ile her kategoriye küçük thumbnail
(38px, cat-card görsel dili) + ad + sayı; seçili → domates outline + bold.
**Filtre mekaniği (checkbox/fcnt/chips) korundu** (checkbox gizlendi, state intact).
Diğer facet'ler (Fiyat/Puan/Marka/Özellik) sade kaldı — kontrast. Script: `apply_catpanel.py`.

### 7) DadaShop logosu (inline SVG)
Ana toque markasından türetilmiş ama ayrışan: **domates alışveriş çantası +
içinde beyaz çatal/kaşık** (ebeveyn toque'un çatal/kaşık motifi DNA'sı) + "Dada"
(slate) + "Store" (domates) wordmark. Header + drawer'da kullanıldı.

### 8) odeme-v1 — fatura adresi kör senaryosu dolduruldu
"Fatura adresim teslimat adresimle aynı" checkbox'ı İŞARETLİ DEĞİLKEN fatura
adresi formu AÇILIYOR (ÇALIŞIR JS, `fk-*` kiti mirası + `.adr-form.show` reveal).
Ekstra: **Bireysel/Kurumsal** segment → TC Kimlik ↔ Vergi No/Dairesi alan seti
değişimi. SS paramı: `?fatura=1`.

## Kanıt — probe sonuçları (`.ss-scratch/cila2/shop/06-probe.png`)
Paylaşımlı Playwright kilitliydi → aynı-origin iframe probe (headless Chrome):
- `[PASS]` dada-shop `.p-fav` toggle (saved false→true, solid ikon) — **BOZUK FAV DÜZELDİ**
- `[PASS]` dada-shop dmCart `.p-add` (badge=1, dropdown foot açıldı)
- `[PASS]` dada-shop `.vb-fav` hero favori toggle
- `[PASS]` shop kabuğu: ana site nav YOK + Mağaza/Kategoriler VAR + Ana Site dön VAR
- `[PASS]` dmCart izleri korundu (window.dmCart + #cartWrap)
- `[PASS]` odeme fatura formu (işaretli→gizli, işaretsiz→açık)
- `[PASS]` odeme fatura tipi Kurumsal (vergi alanları açıldı)
- `[PASS]` 390 taşma YOK — 5 sayfa (scrollW==clientW; "OVER" notları off-canvas drawer + SVG className quirk, gerçek taşma değil)

## Kanıt — SS yolları (`mockups/.ss-scratch/cila2/shop/`)
- `01-header-top.png`, `02-logo-zoom.png` — shop kabuğu + DadaStore logo
- `03-hero.png`, `03-cards.png` — vitrin hero + kompakt kartlar (fav düzeldi)
- `04-odeme-crop.png` — fatura formu açık (Bireysel/Kurumsal)
- `05-catpanel.png` — görsel kategori paneli
- `07-urun-detay-hdr.png`, `08-sepet-hdr.png` — kabuk tutarlılığı (5 sayfa)
- `09-mob-bottom.png`, `10-drawer-mobile.png` — mobil shop chrome
- `11-dd-crop.png` — Kategoriler 2-kolon dropdown
- `06-probe.png` — tüm probe sonuçları

## Disiplin kontrolleri
- "Dada Denedi" grep = **0** (set zaten bu ifadeyi içermiyordu; "Şefin Tercihi" de 0)
- CSS yorumunda `*/` tuzağı = 0 (lessons L kuralı)
- Görsel: `<img>` değil div+bg-image; pill yok (radius token); FontAwesome 6.5.2
  - `fa-knife-kitchen` (Pro) tespit edilip `fa-scissors` (free) ile değiştirildi
- Mobil tek-sabit-katman: çerez açıkken bottom-nav bastırıldı (doğru davranış SS'te)

## Beyar incelemesi bekleyenler (tereddütler)
1. **Mağaza chrome'u — kapsam onayı:** topbar/header/drawer/bottom-nav içeriği shop'a
   göre kurgulandı (menü adları, "Sipariş Takibi/Yardım" → placeholder `#`/hesabim/sss).
   Gerçek sipariş-takip/yardım sayfaları yok; link hedefleri Beyar onayına açık.
2. **Bambu ürün görselleri** in-file kitchen ID'leri (rastgele Unsplash riskli).
   Gerçek bambu/ahşap fotoğrafı istenirse manuel ID küratörlüğü gerekir.
3. **anasayfa drawer'daki "Dada Store" akordeon'u** dokunulmadı (iş #2 yalnız header
   öğesini kapsıyordu, "anasayfada başka şeye dokunma" kuralı). İstenirse mobil
   drawer öğesi de direkt-link yapılabilir.
4. **Bottom-nav "Favoriler"** `href="#"` (favori sayfası bu dalga kapsamında yok).
