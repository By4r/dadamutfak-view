# Admin Panel Review — Yasin Bey (patron) maddeleri → uygulanabilir plan

> Tarih: 2026-06-22. **KEŞİF + PLAN (read-only, kod yok).** Kanonik kabuk (sa-shell.css/js · sa-ui.css/js · sa-*.css) DOKUNULMAYACAK; yeni iş sayfa-içi (inline `<style>`/`<script>`) veya yeni izole dosyada. Sunucu: `localhost:8765/v6/`.

## 🔑 KEŞFİN ANA BULGUSU (A maddeleri için belirleyici)
**Public `tarif-ekle-v1.html` (kullanıcı tarif gönderme sihirbazı) ZATEN A1–A4'ün hepsine sahip.** Admin editöryel formu (`sa-admin-tarifler-form.html`) bu zengin formun gerisinde kalmış — basit repeater. Yani A işi = admin formunu **mevcut public form paritesine** çıkarmak; desen/birim listesi/taksonomi değerleri için projenin İÇİNDE kanonik referans var, dışarıdan icat yok.

| Alan | Public `tarif-ekle-v1` (VAR) | Admin `sa-admin-tarifler-form` (YOK) |
|---|---|---|
| A1 adım süresi | `.st-time` → `<input type=number>` + "dk" sonek | yok (sadece textarea) |
| A2 malzeme birimi | `.ie-unit` `<select>` (15 birim: Su Bardağı…Demet) | yok (sadece "Miktar" text) |
| A3 adım görseli | `.st-figs`/`.st-shot`/`.st-up` (max 3 slot, Beyar kararı) | yok |
| A4 mutfak + özellik | Mutfak multi-select (`msCuisine`) + `#fTypes` 14 etiket chip | yok |

---

## A) Admin tarif formu — `sa-admin-tarifler-form.html`
> Hepsi sayfa-içi `<style>` + HTML + `<script>` düzenlemesi. Kanonik shell'e dokunulmaz. Public `tarif-ekle-v1`'in desenleri/değerleri birebir taşınır (tutarlılık + DB hazırlığı).

### A1 — Hazırlanış adımına süre (dk) alanı
- **Ne:** `#stepList` içindeki her `.rep-row.step`'e, kaldır butonundan önce dar süre alanı ekle: `<div class="rep-time"><input type="number" min="0" placeholder="Süre"><span>dk</span></div>`. JS'teki `stepAdd` template'ine de aynı alan.
- **Nasıl:** public `.st-time`/`.fk-suffix` deseninin sade hâli; admin form zaten `.frow`/sonek dili taşıyor. Yeni mini CSS inline `<style>`'a (`.rep-time{width:120px;...}`).
- **Dosya:** `sa-admin-tarifler-form.html` (inline). **Efor:** S. **Öncelik:** Yüksek (patron net istedi).

### A2 — Malzeme satırına birim seçici
- **Ne:** `#ingrList` her `.rep-row`'da "Miktar" text input'unun YANINA `<select class="finput rep-unit">` ekle; 15 birimlik kanonik liste public formdan: Su Bardağı · Çay Bardağı · Yemek Kaşığı · Tatlı Kaşığı · Çay Kaşığı · Gram · Kilogram · Mililitre · Litre · Adet · Paket · Dilim · Tutam · Diş · Demet. `ingrAdd` JS template'ine de eklenir.
- **Nasıl:** `.rep-amt` daralt (140→90px), yanına `.rep-unit{max-width:130px}`. Satır flex zaten var.
- **Dosya:** `sa-admin-tarifler-form.html` (inline). **Efor:** S. **Öncelik:** Yüksek.

### A3 — Her adıma görsel ekleme (upload)
- **Ne:** Her `.rep-row.step`'e public formdaki "Görsel ekle <small>N/3</small>" desenini taşı — max 3 slot, div+background-image cover (img DEĞİL, Kerem Bey kuralı). Mockup: tıkla→placeholder görsel/sayaç artışı (gerçek upload backend işi, görsel akış).
- **Nasıl:** public `.st-figs`/`.st-shot`/`.st-up` markup + CSS sade port; adım satırı `.rep-row.step` zaten `align-items:flex-start` dikey.
- **Dosya:** `sa-admin-tarifler-form.html` (inline). **Efor:** M (3-slot ekle/sil JS). **Öncelik:** Orta-Yüksek.

### A4 — "Dünya/mutfak" + "özellikler" (vegan vb.) bölümü
- **Ne:** Forma 2 yeni `.form-sec` (veya yan karta blok):
  1. **Mutfak** — çoklu seçim. Sade yol: `.chips` buton grubu (Anadolu Mutfağı'ndan · Dünya Mutfağı · Akdeniz · Uzak Doğu · Diyet … public `tarif-liste` filtre değerlerinden). İstenirse public'teki searchable multi-select (`msCuisine`) port edilir — ama admin için chip-toggle yeterli + daha ucuz.
  2. **Beslenme & Tip Etiketleri** — public `#fTypes`'tan 14 chip: Vegan · Vejetaryen · Glutensiz · Glutenli · Laktozsuz · Süt İçermez · Yumurta İçermez · Şeker İlavesiz · Yüksek Lifli · Tam Tahıllı · Protein Ağırlıklı · Az Yağlı · Acılı · Baharatlı. Chip toggle (aktif = `.chip.is-on`).
- **Not:** Mevcut sağ "Etiketler" serbest-metin kutusu KORUNUR (SEO/arama); bu yeni bölüm yapısal taksonomi.
- **Dosya:** `sa-admin-tarifler-form.html` (inline). **Efor:** M. **Öncelik:** Yüksek (patron net).

### A5 — "Eski panelde içeriklere bakılabilir" → AÇIK SORU (aşağıda)
- Keşif kısmi cevap veriyor: admin editöryel form, public gönderme formunun gerisinde (A1–A4 eksik). Ama Yasin'in "bakılabilir/daha detaylı"sının TAM kapsamı belirsiz → açık soru #1.

---

## B) Blog / içerik yazımı
### Keşif sonucu: **Admin'de blog/makale yazım ekranı YOK.**
- `sa-admin-sayfalar.html` = **statik sayfa + SEO** yöneticisi (Ana Sayfa, Hakkımızda, İletişim, Gizlilik, SSS…) — blog/makale DEĞİL.
- Admin menüsünde (`sa-shell.js` SECTIONS.admin) blog kalemi yok.
- Blog/bilgi-bankası kavramı **kilitli DadaAkademi** bölümünde duruyor: `sa-shell.js:223` → *"İçerik & bilgi bankası yönetimi (tarif, sözlük, püf noktaları, mutfağa giriş, ramazan menüleri) bu sürümde kilitli."*
- Public tarafta içerik MEVCUT ve canlı: `mutfaga-giris-v1.html`, püf noktaları, keşfet blog kartları — ama **bunları yazacak/düzenleyecek admin ekranı yok** (şu an statik HTML).

### Öneri (kanonik desene uygun, izole)
- **Yeni 2 dosya:** `sa-admin-blog.html` (liste) + `sa-admin-blog-form.html` (editör) — `sa-admin-sayfalar.html` + `sa-admin-sayfalar-form.html` deseninin birebir kardeşi (filter-bar + chip sayaç + ptable + sa-list.css + saConfirm sil). Editör = başlık · slug · kategori (Mutfağa Giriş / Püf Noktaları / Blog) · kapak görseli (div+bg cover) · zengin metin alanı (mockup textarea) · SEO meta · yayın durumu toggle. Tarif formundaki `.form-sec` dili miras.
- **Nav kaydı (TEK kanonik dokunuş — FLAG):** modülün menüde görünmesi için `sa-shell.js` SECTIONS.admin'e 1 satır (`{ic:'fa-feather', lbl:'Blog & İçerik', href:'sa-admin-blog.html', screen:'blog'}`). Bu config eklemesi geçmiş dalgalarda yapıldı (handoff "SECTIONS wiring"), shell mekaniğine dokunmaz — ama "sa-shell'e dokunma" kuralıyla geriliyor → açık soru #2 / Beyar onayı. Alternatif: nav'sız, doğrudan link + dizin Admin sekmesi.
- **Efor:** L (2 yeni sayfa + opsiyonel nav). **Öncelik:** Orta — önce "blog gerçekten ayrı modül mü, yoksa Sayfalar'a 'makale' tipi mi" kararı (açık soru #2).

---

## C) Rapor sayfası — "çok daha detaylı olmalı"
### Keşif: `sa-admin-raporlar.html` = tek dashboard
Mevcut: 4 KPI kartı (kullanıcı · Pro abonelik · tarif · aylık gelir) + 1 büyüme sütun grafiği (saf CSS) + kazanım kanalları (yatay bar) + en çok görüntülenen tarifler tablosu + son aktiviteler. Tarih aralığı chip'leri **veriyi değiştirmiyor** (salt görsel). Harici grafik lib yok (saf CSS — korunmalı).

### Eksik / eklenebilir (hepsi sayfa-içi, kanonik shell'e dokunmadan, saf CSS)
- **Modül kırılımı yok:** Store satışları, Sağlık/diyetisyen (randevu/reçete), DadaFit, İşletme rezervasyon — modül bazlı rapor sekmesi/bölümü yok. (Store'un ayrı `sa-store-raporlar` var; admin üst-rapor onları özetlemiyor.)
- **Gelir derinliği yok:** abonelik vs e-ticaret kırılımı, churn/iptal, ARPU, plan dağılımı.
- **Kıyas yok:** önceki döneme göre fark, hedef vs gerçekleşen.
- **Tarih aralığı işlevsiz:** chip'ler grafiği değiştirmiyor → mockup'ta 3 veri seti ile gerçek toggle yapılabilir.
- **İçerik/moderasyon metriği yok:** bekleyen onay, şikayet, red oranı trendi.
- **Demografi/coğrafya yok:** şehir/cihaz/segment dağılımı.
- **Export gerçek değil:** placeholder toast (backend işi — mockup'ta kalır).

### Öneri
- `sa-admin-raporlar.html`'i sayfa-içi genişlet: (1) KPI satırını 4→6-8'e çıkar (Store cirosu · bekleyen moderasyon · aktif diyetisyen vb.), (2) yeni `.rep-2col`/`.rep-tables` blokları: **Gelir kırılımı** (donut/yatay bar) · **Modül performansı** (Store/Sağlık/Fit/İşletme mini-kart grid) · **Moderasyon & içerik** tablosu · **dönem kıyas** rozetleri, (3) tarih chip'lerini gerçek 3-set veriyle çalışır yap. Hepsi saf CSS, mevcut `.bars`/`.dist`/`.ptable` dili miras.
- **Dosya:** `sa-admin-raporlar.html` (inline). **Efor:** M-L. **Öncelik:** Orta — ama kapsam Yasin'in tam istediğine bağlı → açık soru #3.

---

## ❓ AÇIK SORULAR (Beyar → Yasin Bey'e sorulacak; tahmin etme)
1. **(A5) Eski panel kapsamı:** "Eski panelde içeriklere bakılabiliyordu / daha detaylıydı" — TAM olarak ne yapılabiliyordu? (a) tarif formunda hangi ek alanlar vardı [biz A1–A4'ü zaten paritriye taşıyoruz — başka alan var mı: video, besin değeri, kaynak/şef atama, çoklu kategori sırası?], (b) yoksa "gönderilen içerikleri liste/önizleme ile gözden geçirme" akışı mı kastediliyor (≈ moderasyon)? Bu, A turunun kapsamını netleştirir.
2. **(B) Blog modülü mü, sayfa tipi mi:** Blog/Mutfağa Giriş/Püf Noktaları ayrı bir **"Blog & İçerik" modülü** (yeni 2 sayfa + nav satırı) mı olsun, yoksa mevcut **"Sayfalar & SEO"ya 'makale' tipi** eklemek mi yeterli? (Nav satırı kanonik `sa-shell.js`'e 1 config dokunuşu gerektiriyor — onay?)
3. **(C) Rapor detay kapsamı:** Yasin "daha detaylı"dan tam olarak neyi kastediyor? (a) modül-bazlı kırılım (Store/Sağlık/Fit/İşletme), (b) gelir/abonelik finansal derinlik, (c) içerik/moderasyon metrikleri, (d) coğrafya/demografi, (e) çalışan tarih-aralığı + dönem kıyası — hangileri öncelik? "Hepsi" derse fazlı yaparız.

---

## SIRA & EFOR ÖZET
| # | İş | Dosya | Tip | Efor | Öncelik |
|---|---|---|---|---|---|
| A1 | Adım süresi | tarifler-form | inline | S | Yüksek |
| A2 | Malzeme birimi | tarifler-form | inline | S | Yüksek |
| A4 | Mutfak + özellik | tarifler-form | inline | M | Yüksek |
| A3 | Adım görseli | tarifler-form | inline | M | Orta-Yüksek |
| C | Rapor genişletme | raporlar | inline | M-L | Orta (soru #3) |
| B | Blog modülü | YENİ 2 dosya (+nav?) | izole | L | Orta (soru #2) |

> **Önerilen yürütme:** Açık sorular Yasin'den dönünce → A1/A2/A4/A3 tek turda (en net, kanonik referanslı, düşük risk) → sonra C → sonra B. A turu sorulara bağlı değil (parite işi), istenirse hemen başlanabilir; B ve C kapsam kararını bekler.
