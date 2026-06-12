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

---

# REVİZE TURU — R11-R13 (görev #9)

## R11 — "Giriş Yap" shop kabuğu içinde kalır (login modal)
Önceden header + drawer "Giriş Yap" → `giris-v1.html` (ana site auth sayfası, ana
site chrome'u) navigasyonu yapıyordu. Artık **shop login MODALI** açılıyor (5 dosyada):
- 3 pane: **Giriş** (Google/Apple social + e-posta/şifre + beni hatırla + şifremi unuttum),
  **Kayıt** (ad/e-posta/şifre + KVKK), **Şifre sıfırla** (e-posta) — `data-goto` ile geçiş.
- Şifre göster/gizle (lm-eye), DadaStore markalı başlık, ESC/overlay/×ile kapanır.
- Auth dili korundu (giris-v1 fk-pass/eye/soc-btn deseni → lm-* eşleniği).
- Markup `</main>` SONRASINA konuldu (overlay kuralı, lessons L); `data-login-open`
  ile header btn-login + drawer butonu bağlandı; `location.href='giris-v1.html'` = 0 kaldı.
- SS paramı: `?login=1`. Script: `.ss-scratch/cila2/shop/apply_r11.py`.

## R12 — Shop hero 2. tur (kampanya bandı + canlı geri sayım + fırsat rayı)
1. turun tekil billboard-kartı yaklaşımından AYRI, ürün-odaklı yeni yaklaşım:
- **Kampanya bandı:** sol kopya/CTA + sağ **canlı geri sayım** (02:14:37:12 → her sn tik,
  slate kutular + domates ayraç) — aciliyet hissi.
- **Öne çıkan fırsat rayı:** 4 indirimli ürün tile (görsel + kategori + ad + fiyat/eski fiyat).
- Diğer sayfaların koyu landing hero'larından net ayrışır; token/radius/tipografi ORTAK.
  `cmp-band/cmp-count/cmp-rail/cmp-tile` + countdown JS. (yalnız dada-shop-v1)

## R13 — Görselli filtre önizleme yayılımı (kategori pattern'ı diğer facet'lere)
Kategori panelindeki görsel-önizleme dili diğer filtre bölümlerine yayıldı (urun-liste):
- **Özellik facet'i** → her özelliğe ikon swatch (Organik=seedling, El Yapımı=hand-sparkles,
  Vegan=leaf, Glutensiz=bowl-rice, İndüksiyon=bolt; seçili → dolu domates).
- **Marka facet'i** → her markaya monogram swatch (D/K/E/S/Y; seçili → dolu domates).
- Filtre mekaniği (checkbox/fcnt/chips) KORUNDU (checkbox gizli, state intact).
  Script: `apply_r13.py`.
  NOT (Beyar): "ölçek/ölçü filtre-bölüm" ifadesi belirsizdi; FULL AUTO gereği
  "kategori görsel-önizleme dilini kalan facet bölümlerine yay" olarak yorumlandı
  (Özellik+Marka). urun-liste'de ölçü/boyut facet'i mevcut değil.

## Revize kanıt — probe (`.ss-scratch/cila2/shop/r-probe2-top.png`) hepsi PASS
- R11 login modal açıldı (navigate yok, onclick=null) · pane geçişi (giriş→kayıt) · şifre göster toggle
- R13 görselli facet (fe-ico=5, bm-ico=5) · filtre mekaniği korundu (checkbox toggle)
- R12 hero geri sayım canlı (sn değişti) + fırsat rayı 4 tile
- Regresyon yok: .p-fav toggle, dmCart, shop kabuğu, fatura formu, 390 taşma YOK ×5 — hepsi PASS
SS: `r11-login.png` (modal), `r12-hero-crop.png` (kampanya bandı), `r13b-crop.png` (monogram/ikon facet)

## Disiplin (revize sonrası)
loginModal 5/5 dosyada · data-login-open bağlı · leftover giris-v1 onclick=0 ·
"Dada Denedi"=0 · CSS `*/` trap=0 · modal `</main>` sonrası 5/5 (lessons L).

## Beyar BEKLEMEDE (dokunulmadı, talimat gereği)
- DadaStore marka dili (modal başlığı dahil "DadaStore" korundu — Beyar inceleme listesinde)
- mekan-detay 5px (shop kapsamı dışı)

## R13 — REVİZE (lead netleştirmesi: "aynı thumbnail dili" + "ölçek/ölçü ile ilgili")
Lead'in 2. brief'i "aynı thumbnail dili" (kategori panelindeki GÖRSEL thumbnail) +
"ölçek/ölçü ile ilgili filtre" dedi. Bu yüzden urun-liste'ye **"Boyut / Ölçü" facet'i**
eklendi — kategori panelinin BİREBİR thumbnail dili (`cat-fct`/`cn-thumb`): 5 satır
(Küçük·18–20cm, Orta·22–24cm, Büyük·26–28cm, Geniş·30cm+, Hacim·1–2L), her satırda
ürün thumbnail'ı; seçili → domates outline + bold. Önceki Özellik(ikon)+Marka(monogram)
swatch'ları KORUNDU (görsel-önizleme dilini diğer facet'lere de yaydı). Filtre mekaniği
(checkbox/fcnt/chips) korundu; 390 taşma yok.
Kanıt: `r13c-crop.png` (Boyut/Ölçü thumbnail facet) + `r-probe3-top.png`/`-bot.png`
(probe: "R13 Boyut/Ölçü thumbnail facet (aynı dil + filtre)" PASS thumb=5 checked=true;
PROBE TAMAM 0 fail, 390 taşma yok ×5).

## R13 — REVİZE-2 (lead denetim netleştirmesi: ölçü facet'i EKLE, ölçüye özgü görsel)
Lead "ölçü/kapasite facet'i EKLE, olcu-birimleri ikon yaklaşımı ref" dedi.
- **Hedef netleştirme (denetim sorusuna cevap):** Sayfada gerçek bir ölçü/boyut facet'i
  YOKTU (Kategori/Fiyat/Puan/Marka/Özellik/Durum). İlk turda görsel muameleyi Özellik
  (ikon) + Marka (monogram)'a yaymıştım; talimatın LAFZI "ölçek/ölçü ile ilgili" olduğu
  için yeni bir **"Boyut / Ölçü" facet'i EKLENDİ** (tercih edilen yol).
- **Görsel dil:** ölçüye özgü, DadaMutfak-markalı **SVG boyut tile'ları** — kategori
  panelinin tile şekli/boyutu (38px tomato-tint kutu) korunur ama içerik ölçüye uygun:
  artan çaplı halkalar (Küçük→Geniş) + hacim için kupa glifi. Fotoğraf yerine SVG çünkü
  ölçü/boyut bir fotoğrafla okunmaz (olcu-birimleri'nin temiz ikon yaklaşımı ref).
- 5 satır: Küçük·18–20cm / Orta·22–24cm / Büyük·26–28cm / Geniş·30cm+ / Hacim·1–2L.
  Seçili → dolu domates tile + bold. Filtre mekaniği (checkbox/fcnt/chips) korundu.
- Kanıt: `r13d-crop.png` (SVG ölçü tile'ları) + `r-probe4-mid/bot.png`
  (probe: "R13 Boyut/Ölçü SVG ölçü tile facet" PASS sz-tile=5 checked=true; PROBE TAMAM
  0 fail; 390 taşma yok ×5 — urun-liste yeni facet'le temiz).
