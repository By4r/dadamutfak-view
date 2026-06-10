# Revize Turu 3 — anasayfa-portal-v3a.html Planı

> Onay sonrası bu plan `tasks/revize-turu-3-plan.md` dosyasına da yazılacak (Adım 0).
> Çalışma dosyası: `mockups/anasayfa-portal-v3a.html` (2.451 satır, tek dosya). v2/v3b/v3c arşiv — dokunulmayacak.
> Eski site referansı: `drive-download-20260608T070112Z-3-001/dada-mutfak-icerik/` (index.html, kesfet.html, assets/css/own.css).

## Context

Yasin Bey'den gelen 17 maddelik revize seti v3a base'ine uygulanacak. Hero ve mega menünün genel yapısı patron onaylı — DOKUNULMAZ (tek istisna: Madde 1'deki "Tüm tarifler" taşıması). Implementasyon **frontend-design skill** ile yapılacak (proje kuralı), her değişiklik sonrası Playwright SS feedback döngüsü dönecek. Commit/push yok — sadece Beyar açık onayıyla.

---

## HEADER & TOPBAR

### Madde 1 — Mega menü: "Tüm tarifler" taşıması
**Mevcut durum:** `.mega-cats` (HTML 1154–1167) 12 kategoriyle 3×4 grid'i tam dolduruyor. "Boş slot" algısının nedeni: sağ kolon (`.mega-feat`, görsel + altındaki `.mega-all` linki, HTML 1168–1174) sol grid'den ~55px daha uzun → sol grid'in altında bir satırlık ölü boşluk görünüyor.
**Değişiklik:**
- `.mega-all` linkini (HTML 1173) ve CSS'ini (547–550) kaldır.
- `.mega-cats` içine 13. hücre olarak buton-stilinde "Tüm tarifler" ekle: kategori linkleriyle aynı yükseklik/padding, ama ayırt edici (1px tomato-tint border, tomato renk, bold, sağda ok ikonu). Yeni class: `.mega-cat-all`.
- Sonuç: sağ kolon kısalır + sol grid 5. satıra "Tüm tarifler" ile uzar → ölü dikey boşluk kapanır.
- Mega menünün **başka hiçbir şeyine dokunulmaz** (kategori listesi, mf-fig, hover davranışı aynı).

### Madde 2 — Header tek kat
**Mevcut:** Çift kat — `.h-top` (72px: logo + 5 aksiyon, HTML 1130–1144) ve `.h-nav` (52px: ortalanmış nav, HTML 1146–1208). CSS 143–192, 496–499.
**Değişiklik:**
- Bookmark butonu (1138) ve sepet butonu + badge (1139) sil. (Mobil bottom-nav'a dokunulmaz; mobil CSS 965'teki `icon-btn[aria-label="Kayıtlılar"]` kuralı da temizlenir.)
- `<nav class="nav">` bloğunu `.h-top .wrap` içine, logo ile aksiyonlar arasına taşı (`flex:1; justify-content:center`). `.h-nav` sarmalayıcısı ve CSS'i (154–156) kalkar; hover sürekliliği kuralı `.h-nav .nav-item{height:52px}` (498) → `.h-top .nav-item{height:72px}` olur. Mega menü `position:absolute; top:100%` ile `.header`'a bağlı olduğu için tek katta da çalışır — davranış değişmez.
- "Giriş Yap" minimal: `btn-primary` (turuncu + glow) yerine sade metin-buton (transparan zemin, 1px `--line` border veya bordersız, slate metin + user ikonu; hover'da tomato). `at-top` durumunda beyaz metin/border.
- Hero padding dengesi: header 164px→112px küçüldüğü için `.hero-v .wrap{padding-top:190px}` (568) → ~150px'e çekilir; tablet zaten tek kat (değişmez).
- **frontend-design skill burada kullanılacak** (header kompozisyonu + minimal login butonu dili).
**Risk:** at-top (hero üstü şeffaf) durumdaki renk varyantları (175–178, 185–186) nav'ın yeni konumunda yeniden test edilmeli; nav 6 öğe + logo + aksiyonlar 1280px wrap'e sığıyor (ölçülecek, gerekirse nav gap/font ayarı).

### Madde 3 — Topbar düzeni + "Günün Tarifi" bandı
**Topbar (HTML 1100–1125):**
- "Günün Tarifi" linki (1103) topbar'dan çıkar.
- Yeni `tb-left` sırası: `🍽️ 48.200+ denenmiş tarif` → ince divider (tb-lang::before deseni: 1px × 14px, rgba(233,226,214,.22)) → `.tb-soc` (sağdan sola taşınır).
- `tb-right`: Tarif Ekle · Diyetisyen Ara · dil seçici (aynen kalır).
- Tablet kuralları (920–921) yeni yapıya göre güncellenir (soc tablet'te yine gizlenebilir).
**Günün Tarifi separator bandı (KARAR — önerim A):**
- **A (önerim):** Mutfak Sırları (koyu guide section) ile Keşfet arasına, full-bleed ince bant: solda yemek thumb'ı (60px, div+bg-image) + "🔥 Günün Tarifi" eyebrow + tarif adı, sağda "Tarife Git →" butonu. Koyu section'dan çıkışta sıcak bir vurgu oluyor; appband'dan (3 section sonra) yeterince uzak.
- B: Kategoriler ile Tariflerimiz arası — ancak feat-big kartı zaten aynı tarifi ("Fırında Tereyağlı Mantı") spotlight'ladığı için üst üste binme riski var.
- Stil dili: findbar'ın kardeşi (sol renkli border, ikon + metin + CTA) ama tomato-tint zemin ile ayrışır.

---

## SECTION DÜZENLEMELERİ

### Madde 4 — "Tarif bul" bandı padding
CSS 613: `.findbar-sec{padding:26px 0}` → `44px 0`. CSS 617: `.findbar` iç padding `18px 22px` → `22px 26px`. Mobil (1035) `20px 0` → `28px 0`.

### Madde 5 — Kategoriler: 2+ satıra hazır layout (KARAR — önerim A)
**Mevcut:** `.cat-track` tek satır yatay flex scroll (CSS 264), 9 kart, ok butonları JS `scrollBy` ile.
- **A (önerim):** `display:grid; grid-auto-flow:column; grid-template-rows:repeat(2,auto); gap:18px 16px; overflow-x:auto` — 2 satırlı yatay scroll. Ok butonları ve JS aynen çalışır (scrollBy grid'de de geçerli). Demo içerik 9 → 16 karta çıkarılır (Dünya Mutfakları: İtalyan, Uzak Doğu, Meksika… eklenir) ki 2 satır görünsün. Satır sayısı CSS değişkeniyle (`--cat-rows`) esnek.
- B: flex-wrap ile sarmalı statik grid — scroll/ok kalkar, section dikeyde uzar.

### Madde 6 — Mutfak Sırları: 2 satır → 3 satır (KARAR — önerim 2×3)
**Mevcut:** Püf pane 2 sütun × 2 satır = 4 kart (HTML 1722–1759); Mutfağa Giriş pane 2×2 = 4 adım (1697–1718).
- **Önerim: 2 sütun × 3 satır = 6 kart.** 3 sütun olmaz: puf kartı yatay anatomili (solda 166px görsel + sağda metin), 3 sütunda ~390px'e düşer ve metin alanı çöker. 2×3 mevcut kart dilini korur.
- Püf pane'e 2 yeni kart (ör. "Hamur neden cıvık oluyor?", "Balık kokusu nasıl önlenir?"), Mutfağa Giriş pane'e 2 yeni adım (05 "Tencere & Tava Seçimi", 06 "Saklama & Hijyen") — iki pane simetrik 3 satır olur. (Yalnız püf isteniyorsa Giriş pane'i 4'te bırakılabilir — annotate ile belirtin; önerim ikisi de 6.)

### Madde 7 — Püf açıklamaları farklı uzunlukta
6 kartın p metinleri karışık dağıtılır: 2 kart tek satır, 3 kart 2 satır, 1 kart 3 satır (~120–140 karakter). Grid satırları kendi içinde eşit yükseklikte esner (`min-height:118px` korunur, içerik uzunsa kart büyür) — template dayanıklılığı SS ile doğrulanır.

### Madde 8 — Püf metni görsel üstüne taşmasın
**Mevcut:** `.puf-fig` 166px genişlik + sağa doğru mask fade (CSS 374–377); `.puf-body{padding-left:152px}` (382) → metin, görselin son 14px'inin üstünde başlıyor.
**Değişiklik:** `padding-left:152px` → `180px` (görsel 166px + 14px nefes). Mask aynı kalır (yumuşak geçiş korunur). 3 satırlık metinlerle birlikte SS'te okunabilirlik kontrol edilir.

### Madde 9 — "Tamamını Gör" + ok hizası denetimi
**Tespit edilen tutarsızlıklar:**
1. Kategoriler başlığında `.lead` yok (HTML 1421–1425) → `align-items:flex-end` nedeniyle see-all/oklar h2 dibine hizalanıyor; lead'li section'larda ise açıklama satırına. **Fix:** catstrip'e bir `.lead` eklenir (ör. "Yöresel mutfaklardan dünya lezzetlerine — kategorini seç.") → tüm section'lar aynı anatomiye kavuşur.
2. Şefler section'ında see-all `.sec-tools` sarmalayıcısı olmadan duruyor (HTML 1868) → `.sec-tools` ile sarılır.
3. `h2{margin-top:14px}` inline değerleri ile `.cat-head h2{margin-top:10px}` farkı eşitlenir (hepsi 14px).
Sonuç tek desen: eyebrow → h2 → lead solda; `.sec-tools` (tabs? + see-all + oklar) lead satırıyla aynı bottom hizasında. Tüm section'lar SS ile tek tek doğrulanır.

### Madde 10 — Tarif kartları: kayıt sayısı + ikon hizası
- `feat-big` meta satırından `🔖 8.4K kayıt` span'i silinir (HTML 1479). (Diğer kartlarda kayıt sayısı yok — tek nokta bu.)
- **Hiza sorunu (feat-big):** `.f-meta` satırı içerik bloğunda (padding 40px) dururken `.m-types` (video 8:40 / galeri 10 rozetleri) görselin sağ-altına `bottom:22px` ile mutlak konumlu (CSS 711) → aynı satırda DEĞİL. **Fix:** `.m-types` bloğu `feat-cont .f-meta` içine taşınır, `position:static; margin-left:auto` → meta bilgileriyle aynı flex satırında, metin uzayıp sarsa bile (`flex-wrap:wrap`) rozetler satır sonunda hizalı kalır.
- Küçük kartlarda tutarlılık: `.r-tried` (bottom:13px) ile `.m-types` (bottom:11px) aynı hizaya (ikisi de 13px) ve pill padding'leri eşitlenir (6px 10px).

---

## KEŞFET

### Madde 11 — Keşfet kartları tarif kartlarıyla tutarlı + fiyat
**Eski site referansı (kesfet.html 851–909):** görsel üstünde sol-üst rating+views, sağ-üst medya ikonları (play/volume/image), alt bantta konum + sağda `₺₺₺₺₺` fiyat.
**Değişiklik (v3a dilinde):**
- `.disc-fig` üzerine: sol-alt köşeye rating + views rozetleri, sağ-alt köşeye medya var/yok ikonları — tarif kartlarındaki `.mt` koyu pill dili birebir kullanılır (rgba(20,18,12,.72), blur). Mevcut `.disc-meta`'dan rating/views satır içi öğeleri kalkar.
- **Mekan kartları:** `.disc-meta` satırı → solda konum, sağda fiyat seviyesi: `₺₺₺` (aktif semboller tomato bold, kalanlar soluk — eski sitedeki 5'li ₺ skalası). 3 demo karta farklı seviyeler (₺₺, ₺₺₺, ₺₺₺₺).
- **Gurme kartları:** görsel üstü rozetler (views + medya ikonları) eklenir; tarih + okuma süresi metası altta kalır.

### Madde 12 — Krem arkaplan → eski site grisi (KARAR — önerim tam nötrleme)
**Eski site grisi:** `#f9f9f9` (own.css'te section/kart zemini olarak en yaygın ton; ayraç/border tonu `#ececec` — zaten v3a `--line` ile aynı).
**Önerim (A — tam nötrleme):** sayfa akışındaki tüm sıcak/krem tonlar gri-beyaz eksene çekilir:
- `--bg-cream: #F3EAD8` → `#f9f9f9` (catstrip, vids-sec, discover)
- `--bg-white: #FCFAF6` → `#ffffff` (findbar-sec, feat-sec, chefs, shop)
- `--bg: #FBF8F3` → `#f9f9f9` (body/page-main + input zeminleri)
- `.health` gradyanının bitişi `#FBF8F3` → `#f9f9f9` (402)
- `.disc-meta` border `#e4dbc7` → `var(--line)` (640)
- **İstisna:** `.community{background:var(--cream)}` (#EFE5D3) aynen kalır — talep gereği.
Alternatif B (minimal): yalnız `--bg-cream` → `#f9f9f9`, sıcak beyazlar kalır — gri/krem karışımı tutarsız görüneceği için önermiyorum.

---

## DİĞER

### Madde 13 — App bandına arkaplan görseli (KARAR — önerim A)
**Mevcut:** `.appband{background:var(--slate)}` düz koyu (681).
- **A (önerim): `background-attachment:fixed`** — mutfak/yemek fotoğrafı (Unsplash, dosyadaki diğer görseller gibi) + üstüne koyu degrade overlay (rgba(33,30,22,.82–.88), metin kontrastı korunur) + `center/cover fixed`. Scroll'da görselin farklı kısımları doğal görünür, sıfır JS. iOS Safari `fixed`'i desteklemediği için `@media (max-width:1024px)`'te `background-attachment:scroll` fallback.
- B: JS parallax (`transform:translateY` rAF ile) — daha akıcı kontrol ama mockup için gereksiz karmaşıklık.

### Madde 14 — Hover glow/shadow temizliği (flat)
Taranan envanter — **hover'da eklenen/büyüyen tüm box-shadow'lar kaldırılır**, translate/renk geçişleri kalır:
| Öğe | Satır | Yapılacak |
|---|---|---|
| `.feedback-tab` (Görüş Bildir) | 848, 852 | **Resting glow dahil** kaldır (açık talep); hover sadece koyu zemin |
| `.p-card:hover` (DadaShop) | 435 | `sh-lg` kalkar; translateY + border kalır |
| `.calc-card:hover` (hesaplama) | 410 | yeşil glow kalkar; translateY + yeşil border kalır |
| `.r-card:hover` | 278 | `sh-lg` kalkar |
| `.cat-card:hover` | 272 | `sh-md` kalkar |
| `.findbar:hover` | 620 | `sh-md` kalkar |
| `.see-all:hover` | 101 | `sh-sm` kalkar |
| `.chef-av` hover | 662 | `sh-md` kalkar |
| `.store-badge:hover` | 459 | `sh-md` kalkar |
| `.puf-card:hover` | 372 | büyüyen shadow kalkar; koyu zemindeki **base** shadow (370) okunabilirlik için kalır |
| `.btn-primary:hover` | 114 | büyüyen glow kalkar; base glow (113) da kaldırılıp flat yapılır |
| `.btn-cookie-accept:hover` | 907 | büyüyen glow kalkar |
Statik/yapısal gölgeler (modal `sh-lg`, cookie banner, m-types pill, header alt çizgisi) hover ürünü değil — kalır.

### Madde 15 — Footer yasal linkler tek satır (KARAR — önerim A)
**Mevcut:** 9 link tam adlarıyla ~1.350px → 1.180px içerik genişliğine sığmıyor, 2 satıra kırılıyor (HTML 2187–2197, CSS 485–487).
- **A (önerim): görünen etiketleri kısalt** + font 12.5→12px, gap 9/13→8/10: "İptal, İade ve Değişim" · "Ödeme ve Teslimat" · "Mesafeli Satış" · "Gizlilik ve Çerez" · "Üyelik Sözleşmesi" · "Kullanım Koşulları" · "Aydınlatma Metni" · "KVKK" · "İhlal Bildir" → ~1.000px, tek satıra sığar (hesaplandı). Tam adlar hedef sayfaların başlığında yaşar.
- B: tam adlar korunur, bilinçli 2 satır ortalanmış düzen (satır kırılması tasarımın parçası olur).
Mobilde mevcut `justify-content:center` sarmalı davranış korunur.

### Madde 16 — Footer "Gavia Works"
`.foot-bottom` (HTML 2198–2200) sol span'ine eklenir: `© 2026 DadaMutfak. Tüm hakları saklıdır. · Gavia Works` ("Gavia Works" link, hover'da beyaz — `.footer.orange .foot-bottom a` stili zaten mevcut, 609–610).

### Madde 17 — Görüş Bildir: tipe göre input akışı (KARAR — tip listesi)
**Mevcut:** 4 konu butonu ama hepsi aynı form (ad + email + textarea; HTML 1306–1321). Tasarım dili (fb-topic, fb-field, KVKK, success) aynen korunur; yalnız konu seçimine göre alanlar değişir (JS: her tipin alan seti `data-topic` pane'i olarak gösterilir/gizlenir).

Önerilen akışlar (Onedio widget referansı):
| Tip | Input akışı |
|---|---|
| ⭐ **Puan ver** (YENİ 5. tip — öneri) | 5'li emoji skalası (😡 😕 😐 🙂 😍, fb-topic stilinde büyük butonlar) + opsiyonel kısa yorum + opsiyonel e-posta |
| 💡 Önerim var | "Hangi alanla ilgili?" chip seçimi (Tarifler · Keşfet · Shop · Uygulama · Diğer) + öneri textarea + e-posta (ops.) |
| ❓ Bir sorum var | Konu select (Üyelik · Tarif ekleme · Sipariş · Diğer) + soru textarea + **e-posta zorunlu** (cevap için) |
| 🐛 Teknik sorun | "Nerede yaşadın?" select (Anasayfa · Tarif sayfası · Arama · Üyelik · Mobil) + sorun textarea + "Ekran görüntüsü ekle" butonu (mock) + e-posta (ops.) |
| 🛡️ İhlal bildirimi | İçerik linki (URL input) + ihlal türü select (Telif · Uygunsuz içerik · Spam · Diğer) + açıklama textarea + e-posta zorunlu |
Ortak: KVKK checkbox + Gönder + success ekranı. 5. tip eklenirse topics grid'inde son öğe `grid-column:1/-1` (tam satır). "Puan ver" tipi istenmiyorsa 4 tip ile aynı kurgu uygulanır — annotate ile belirtin.

---

## Uygulama sırası
0. Onaylı planı `tasks/revize-turu-3-plan.md`'ye yaz.
1. Renk altyapısı (M12) — token değişimi her SS'i etkilediği için önce.
2. Topbar + header tek kat + mega menü (M1–M3, frontend-design skill) → SS.
3. Section düzenlemeleri (M4–M10) → her grupta SS.
4. Keşfet kartları (M11) → SS.
5. App band, hover temizliği, footer (M13–M16) → SS.
6. Görüş Bildir akışları (M17) → SS (her tip ayrı SS).

## Riskli noktalar
- **Header tek kat (M2):** at-top şeffaf durum + 1024px drawer kırılımı + mega menü hover sürekliliği üçü birden etkileniyor; her scroll durumunda SS şart.
- **Renk token değişimi (M12):** `--bg` input zeminlerinde de kullanılıyor (search-input, fb-field) — gri inputlar SS'te kontrol edilecek.
- **Footer reveal (M593–596):** footer fixed perde düzeninde; legal satır tek satıra inince footer yüksekliği değişir — reveal spacer JS'i yüksekliği dinamik ölçüyorsa sorun yok, SS ile doğrulanır.
- **Kategoriler 2 satır (M5):** catstrip yüksekliği ~190px artar; section ritmi SS'te değerlendirilir.

## Doğrulama
- Lokal dosya tarayıcıda `?ss=1` (video yerine poster) ile açılır; Playwright MCP ile 1440px desktop + 768px tablet + 390px mobil tam sayfa SS.
- Kontrol listesi: mega menü (`?dd=1` ile açık SS), header at-top/scrolled iki durum, guide her iki pane, keşfet her iki tab, feedback modalı 5 tip ayrı ayrı, footer legal tek satır, cookie banner çakışması.
- SS'ler Beyar'a sunulur → onaylanana kadar madde bazında iterasyon (proje SS feedback döngüsü).

---

## UYGULAMA SONUCU (2026-06-10 — tamamlandı, onay bekliyor)

Tüm maddeler v3a'ya uygulandı. SS'ler: `ss-t3/` klasörü. Plandan sapmalar (Beyar canlı revizyonları):

- **M1:** "Tüm Tarifler" 13. hücre değil, grid'in SON (sağ alt) kategori slotuna kondu — Aperatifler mega menüden çıktı (Beyar düzeltmesi).
- **M2:** Giriş Yap minimal boyda kaldı ama eski tomato rengine döndü (Beyar). Header alt kenarındaki soft çizgi at-top durumda korundu (Beyar — eski kat ayracının mirası).
- **M5:** YANLIŞ ANLAŞILMA DÜZELTİLDİ — kartlar TEK SATIR kaldı; "2 satır" kategori İSİMLERİ içindi (line-clamp 2 + min-height ile sayaç hizası korunuyor). Demo 16 karta çıktı.
- **M12:** "Topluluğa katıl" krem istisnası da kaldırıldı (Beyar fikir değişikliği) — tüm akış gri/beyaz.
- **M18 (YENİ):** Kategoriler + Tariflerimiz + Videolar + DadaShop track'lerine auto-slide (4.5s, hover/viewport-dışı/reduced-motion'da durur, manuel etkileşimde 8s bekler, sonda başa sarar).
- **Tutarlılık turu (Beyar):** Keşfet rating/views görselden ALT meta satırına indi (tarif kartı r-rate/r-views stiliyle birebir); fiyat ₺ pill'i görsel sol-altta. Video kartı: süre rozeti .mt diliyle gradientin önünde, alt satır solda şef (avatar+isim) sağda görüntülenme.

### Yasin Bey'e ayrıca işaretlenecekler
1. **M15:** Footer yasal link adları tek satır için kısaltıldı ("İptal, İade ve Değişim", "Gizlilik ve Çerez" vb.) — onayına sunulacak (SS: 16-footer).
2. **M17:** "Puan ver" 5. bildirim tipi emoji skalasıyla EKSTRA ÖNERİ olarak eklendi (SS: 17-modal-puan).

Commit/push YAPILMADI — Beyar onayı bekleniyor.
