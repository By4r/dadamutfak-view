# FAZ 5-SONRASI REVİZE — bnp-defter-pdf (T4) Raporu

> Takım: faz5-revize · Sahip: bnp-defter-pdf · Tarih: 2026-06-13
> Sahiplik (SADECE): `bugun-ne-pisirsem-v1.html` · `haftalik-menu-v1.html` ·
> `alisveris-listesi-v1.html`. _shell.html'e DOKUNULMADI. §2f hero kanonuna
> DOKUNULMADI. frontend-design skill tasarım dokunuşlarında çağrıldı (mevcut
> Gilroy/domates/krem/slate diline sadık, yeni estetik icadı YOK).
> Onaylı baz: commit `3c63926`. Kanıt SS + PDF: `outputs/ss-faz5-revize-bnp/`.
> SS altyapısı: izole `channel:chrome` + ayrı user-data-dir + server :8854
> (MCP Playwright KULLANILMADI). Tüm maddelerde tıklama/DOM probe + 0 konsol hatası.

---

## 1) BNP "Menüyü Kur" → SAĞDA YAPIŞKAN menü tepsisi ✅

**Sorun:** Sıfırdan menü kurarken (mod seçili) tarif ızgarası uzundu; menü
tepsisi (eski `.sc-tray` alt şerit) çok aşağıda kalıyor, "Ekle" deyince
görünmüyordu.

**Çözüm:** `.scratch-block` iki kolona çevrildi → `.sc-layout`
(`minmax(0,1fr) 322px`): SOL tarif ızgarası (`#scGrid`), SAĞ **yapışkan panel**
(`.sc-side{position:sticky;top:128px}`). Panel = slate başlık (Menü Tepsisi +
sayaç) + seçilen tariflerin canlı listesi (thumb + ad + kap·dk + tek tek çıkar
`×`) + boş durum + footer (kap/dk meta + "Menüyü Kur" domates CTA + "Tepsiyi
temizle"). "Menüye Ekle" tıklandıkça kalem **anında sağ panele düşer**, kullanıcı
menüsünü hep görür. Eski alt-şerit dili (`.sc-tray/.sct-*/.btn-ontop`) tamamen
kaldırıldı.

**Mobil:** ≤960px tek kolona iner; panel tarif varken **alt yapışkan şerit**e
döner (`.sc-side.show`), `__bottomStrips`'e `#scSide` kaydedildi (çerez/nav
katman önceliği §3b korunur). 0 tarifte gizli.

**Kanıt (probe):** `position:sticky · top:128px · #scList 3 kalem ·
"3 tarif tepside" · meta "3 kap ~75 dk" · sil → 3→2`. Mobil: tarif yok→`display:none`,
tarif var→`display:block + .show`. SS: `bnp-scratch.png`.

## 2) BNP pişirme akışı (?cook=1) — her yemek KENDİ adımlarıyla ✅

**(a) Her yemek çok adımlı:** Eskiden her yemek TEK satır açıklamaydı. Şimdi
tarif-detay `.cookmode`/`.st-list` adım mantığı MİRAS alındı: kap türüne göre
`STEPTPL` (başlangıç/ana/yan/tatlı/kahvaltı/içecek) — her yemek
hazırlık→pişirme→servis adımlarıyla gelir, yemek adı adım metnine işlenir, süre
adımlara oranlanır. Akış tüm yemeklerin adımları boyunca **tek sekans** (`flat[]`),
yemekler KOLAYDAN ZORA sıralı (`RANK`).

**(b) Üst gösterge + açıklama yerleşimi yeniden kurgulandı (frontend-design):**
- ÜST: menü adı + **yemek rayı** (`.cm-rail` chip'leri — aktif yemek domates,
  biten yemek yeşil-tikli) + kapat. Altında **genel ilerleme** şeridi (`.cm-progwrap`).
- GÖVDE iki-seviye hiyerarşi: yemek başlığı bandı (`.cm-dishhead`: "n. Yemek/N" +
  yemek adı + kap·zorluk·dk) + rank notu → **adım göstergesi** (`.cm-stepbar`:
  "Adım k/m" + segment bar dots) → adım no + adım başlığı (h2) + adım metni +
  görsel + ipucu. "Hangi yemek (ray+başlık) / hangi adım (step bar)" net ayrıştı.

**(c) "Menülerime Git":** Bitiş ekranına eklendi → `mutfak-defteri-v1.html?tab=menuler`
(yanında Alışveriş Listesi + Menüye Dön).

**Kanıt (probe):** `?cook=1` → cookmode open · rail 4 yemek · "Çoban Salata —
Sumaklı" · "Adım 1/3" · h2 "Malzemeleri hazırla" · "Yemek 1/4". Son adımda next
"Sıradaki Yemek". Bitiş: doneScreen + "Menülerime Git". Menü detayından "Menüyü
Pişir" de açıyor (rail 2 — handpicked menü). SS: `bnp-cook1.png`, `bnp-cookmid.png`,
`bnp-cookdone.png`.

## 3) haftalik-menu "Ekle" hücreleri — BOZUK düzeltildi ✅

**Kök neden:** `.mc-add` bir `<button>` (UA shrink-to-fit) + `width` tanımsızdı
→ hücrede **22px slivere** büzülüyor, "Ekle" metni dikey harf-harf sarıyordu.
(`.mc-card` `<div>` olduğu için full-width render oluyordu — fark buydu.) JS
olarak ekleme zaten çalışıyordu; bozukluk GÖRSELdi.

**Çözüm:** `.mc-add{width:100%;min-height:104px;white-space:nowrap;text-align:center}`
→ "+ Ekle" ortalı, hücreyi dolduran dashed kutu. Ayrıca eklenen tarif **öğüne
uygun + dönüşümlü** yapıldı (POOL meal-bazlı; Kahvaltı'ya makarna düşmesin):
Kahvaltı/Öğle/Akşam için ayrı 3'er tarif, her tıkta rotasyon.

**Kanıt (probe):** Buton boyu 22×107 → **134×107**. Kahvaltı boş hücreye tıkla →
"Sucuklu Yumurta" eklendi. Tüm boşlar doldu (boş 3→0, dolu 18→21), kaldır→tekrar-ekle
OK, 0 hata. SS: `haftalik-fixed.png` (önce/sonra net).

## 4) alisveris-listesi "Yazdır/PDF" → MARKALI client-side PDF ✅

**Sorun:** `window.print()` (tarayıcı print preview).

**Çözüm:** **jsPDF** (CDN — yalnız kütüphane dosyası; PDF üretimi %100 client-side,
harici servis YOK) ile `window.genListPdf()`. Hem "Yazdır/PDF" hem Paylaş
popover'daki "PDF olarak kaydet" buna bağlandı (jsPDF yoksa `print()` fallback).
- **Türkçe:** `assets/fonts/Gilroy-Medium.ttf` fetch→base64→`addFileToVFS/addFont`
  ile gömülür → ş/ğ/ı/İ/ç/ö/ü doğru render (font yüklenmezse ASCII transliterasyon
  fallback).
- **Marka:** domates `#e14827` üst bant + beyaz logo (addImage) + "Alışveriş
  Listesi"/dadamutfak.com; krem `#efe5d3` meta şerit (tarih·kalem·reyon·tamamlandı);
  koyu `#211E16` metin. Reyon grupları (domates kare bullet + ad + sayaç), kalem
  satırları (onay kutusu — işaretli yeşil-tik + üstü çizili), miktar krem pill'de.
  Footer (marka + sayfa no). Çok sayfa için `ensure()/addPage` (header/footer
  her sayfada). DOM'dan CANLI okunur (görünür reyonlar, işaret durumu).

**Kanıt:** PDF gerçekten üretildi-indirildi (`dadamutfak-alisveris-listesi.pdf`,
88 KB, 1 sayfa, 0 hata), PNG'ye çevrilip incelendi → marka/Türkçe/reyon/işaret
hepsi doğru. SS: `list-pg.png` · ham PDF: `test-list.pdf`.

---

## Tasarım gözü (lead protokolü)

- Sticky panel: slate başlık + krem-nötr gövde + domates CTA — sayfa diliyle
  tutarlı; nefes/hizalama temiz, panel uzun listede kendi içinde scroll'lar.
- Cook flow: iki-seviye gösterge (ray+başlık / step bar) okunaklı, segment
  dots modern; domates aktif / yeşil biten kodlaması net.
- PDF: "süslü değil, kurumsal" brief'i — tek tipografi (Gilroy), 3 kurumsal
  renk, ızgarasız temiz satır ritmi.

## Bilinen Sınırlamalar

1. **PDF jsPDF CDN'e bağlı:** Çevrimdışı/CDN engelli ortamda jsPDF yüklenmezse
   `window.genListPdf` → `window.print()` fallback'e düşer (markalı PDF yerine
   tarayıcı print). Pages/online'da sorun yok.
2. **PDF logo/font gömme ağ + same-origin gerektirir:** logo `addImage` ya da font
   fetch başarısız olursa → logo yerine "DadaMutfak" metin wordmark + font yerine
   transliterasyon (ş→s vb.) devreye girer; PDF yine üretilir, sadece tipografi
   sadeleşir. (Lokal/Pages'te tam markalı çıkıyor.)
3. **Cook flow adım içerikleri ŞABLON (mock):** Tarifler havuzda yalnız ad/süre/
   zorluk taşıyor; gerçek adım metni yok. Adımlar kap türüne göre makul Türkçe
   şablonlardan üretiliyor (yemek adı işlenir). Laravel fazında gerçek tarif
   adımlarına bağlanır.
4. **Bitiş ekranı yemek rayı çip rengi:** done anında son çip `.on`(domates)→
   `.done`(nane) 0.2s transition'ı sürerken ara-renk (tan) görülebilir; ≤200ms'de
   nane'ye oturur (probe ile teyit: settle sonrası 4 çip de `rgb(234,247,240)`).
   Görsel artefakt, bug değil.
5. **haftalik "Ekle" eklenen tarif mock:** Öğüne uygun sabit havuzdan dönüşümlü
   seçilir; gerçek tarif seçici (BNP `rp-modal` benzeri) Laravel/sonraki kapsamda
   düşünülebilir — bu turun kapsamı görsel bozukluğun düzeltilmesiydi (tamam).
6. **Mobil scratch alt-şerit + çerez:** Çerez banner açıkken (öncelikli gate)
   alt şerit onun arkasında kalır (§3b kuralı) — çerez kapanınca görünür.

---

## MİNİ-DÜZELTME TURU (lead isteği — 2 madde) ✅

### M1) PDF "TAMAMLANDI" kaldırıldı
Liste statik mockup olduğundan tamamlanma durumu yanıltıcıydı. PDF'ten:
- Meta şeridinden "X tamamlandı" ibaresi çıkarıldı → artık "X kalem · Y reyon".
- Onay kutuları **TAZE liste** olarak hepsi BOŞ basılır (markette işaretlemek için);
  ekrandaki checked/üstü-çizili durum PDF'e taşınmaz (yeşil-tik + strikethrough
  render'ı kaldırıldı). **Kanıt:** ekranda 2 kalem işaretliyken PDF yeniden üretildi
  → meta'da "tamamlandı" yok, tüm kutular boş. SS: `pdf-tamamlandi-kalkti.png` ·
  PDF: `test-list-v2.pdf`.

### M2) BNP "Menü Tepsisi" → gerçek FLOATING panel
Sticky (yalnız scratch-block görünürken sabit) → **`position:fixed` viewport-pinned**
(sepetim mantığı): scroll boyunca sağ-üstte sabit kalır, kaybolmaz.
- Küçültülebilir: başlıkta `‹` → panel **yüzen rozet**e (FAB: 🍴 Menüm + sayaç)
  iner; rozete tıkla → panel geri açılır.
- İçerikle çakışmasın diye ızgaraya sağ pay açılır (`tray-on` 348px / `tray-mini` 150px).
- Bağlam duyarlı: yalnız modlar sekmesi + mod seçili + tarif var(>0) iken görünür;
  "Tarif Ara" sekmesine geçince ya da menü detayı/pişirme açılınca **gizlenir**.
- Ramazan barı açıkken (`rmz-ask`/`is-ramazan`) panel header+bar altına iner
  (top:176, below-header offset'iyle hizalı) — collision fix.
- Mobil (≤1100): §3b kuralı — fixed yerine **tek alt yapışkan şerit**, FAB/küçült
  devre dışı, gutter payı iptal (`__bottomStrips` kayıtlı).

**Kanıt (probe):** top'ta `fixed top:128 right:24 inView` · scroll 1400px'te **hâlâ
`fixed top:128 inView`** (4 kalem) · minimize → FAB `135×48 inline-flex` badge "4",
kart gizli · expand → kart geri · "ara" sekmesi → `display:none` · detay → `display:none`
· ramazan kapalı top:128. 0 konsol hatası. SS: `floating-panel.png`,
`floating-scrolled.png`, `floating-mini-fab.png`.

**Bilinen Sınırlama (mini-tur):** Headless SS'lerde fixed öğeler scroll'da
geometrik bbox'ından kaymış/klipli boyanabilir (lessons'taki headless fixed-paint
artefaktı) — DOM rect probe'u (top:128/inView=true, FAB 135×48) otoriterdir, canlıda
sorun yok. FAB'ın dikey-sliver görünümü bu artefakt, gerçek değil (ölçüldü).

---

## BNP DÜZELTME TURU (lead — A floating itme + B 2 alt-tab) ✅

### A) Floating "Menü Tepsisi" artık grid'i İTMİYOR (gerçek overlay)
Önceki turda ızgaraya verdiğim `tray-on` sağ-pay (padding-right 348/150) grid'i
daraltıyordu (kart genişliği + sütun sayısı panel-açıkta küçülüyordu). KALDIRILDI:
panel `position:fixed` ile içeriğin ÜSTÜNDE yüzer, layout'u itmez.
**Kanıt (probe, 1340px):** panel-kapalı vs panel-açık → `gridW 1176===1176 ·
cardW 381===381 · cols 3===3` → **gridIdentical:true** (kart genişliği + sütun
sayısı birebir aynı). SS: `fixA-grid-overlay.png`.

### B) Mod seçilince 2 ALT-SEKME (Sıfırdan Kur / Hazır Menüler)
Eskiden mod seçilince "sıfırdan kur" grid + hazır menüler ALT ALTA diziliyor,
hazır menüler dibe gömülüyordu. Artık (üst-tab `.pf-tabs/.dt` dili MİRAS, yeni
tab icadı YOK):
- **Tab 1 "Sıfırdan Kur"** (varsayılan): moda uygun tarif grid + menü tepsisi.
- **Tab 2 "Hazır Menüler N"** (badge = o modun menü sayısı): hazır menü kartları
  ÜSTTE, tek tıkla erişilir — dibe gömülmez.
- "Tüm Menüler" modunda alt-sekme gizli, doğrudan menü listesi (eski davranış).
- Detay/pişirme açılınca alt-tab+pane'ler gizlenir, dönünce restore.

**Kanıt (probe):** mod seç → subtabs görünür, badge "2", Tab1 default (22 tarif
kartı) · "Hazır Menüler" tıkla → Tab2 görünür (2 menü kartı üstte), tray gizli ·
geri → Tab1 (grid+tray). Mobil 500px: alt-tab çalışır, panel sticky alt-şerit
(§3b), FAB kapalı, hazir→2 kart. 0 konsol hatası. SS: `fixB-subtabs.png`,
`fixB-hazir-menuler.png`.

### C) Düzenlenebilir MENÜ ADI alanı (floating tepside)
Slate başlık ("Menü Tepsisi") ALTINA krem bantlı, inline-edit menü adı alanı
(kalem ikonu + input) eklendi (frontend-design — başlık görünümlü, süslü değil):
- **Default = seçili MODUN adı** (Kadınlar Matinesi seçiliyse ad "Kadınlar Matinesi").
- Mod değişince ad güncellenir; **kullanıcı elle değiştirdiyse EZİLMEZ** (dirty-flag:
  input'a yazınca dirty=true; boşaltınca dirty=false → tekrar moda döner).
- Bu ad "Menüyü Kur" ile kurulan menünün başlığı olur (`working.title`) → menü
  detayı `mdTitle` + "Deftere Kaydet" toast'ı bu adı taşır.

**Defter bağı teyidi:** `mutfak-defteri-v1.html?tab=menuler` → menü kartına girince
DÜZENLENEBİLİYOR (Faz 5: `?menu=mac|bayram|haftaici` + `?havuz=1` picker +
`#mdRename` "Adını Değiştir" contenteditable başlık). BNP menü adı bu akışla
tutarlı: aynı "düzenlenebilir menü başlığı" dili (`working.title` → kaydet → defter).
Gerçek cross-page veri kalıcılığı mock (Laravel fazı), mockup düzeyinde dil/alan birebir.

**Kanıt (probe):** mod seç → ad="Kadınlar Matinesi" (=mod adı) · mod değiştir →
ad="Aile Büyükleri Bir Arada" (otomatik güncellendi, dirty değil) · elle "Cumartesi
Sofram" yaz → mod değiştir → ad KORUNDU · "Menüyü Kur" → menü başlığı="Cumartesi
Sofram". 0 konsol hatası. SS: `fixC-menu-name.png`.

**Bilinen Sınırlama (A):** Standart genişlikte (≈1340px) yüzen panel açıkken
ızgaranın en sağ sütununun bir kısmını ÖRTER — bu, lead'in "grid'i İTME, üstte
yüz" tercihinin kabul edilen sonucudur (push yok → overlap var). Kullanıcı paneli
‹ ile rozet (FAB) haline küçültüp örtülen kartları görebilir. ≤1100px'te panel
zaten alt-şerite döndüğü için örtme olmaz.

---

## Değişen dosyalar (vs 3c63926)
- `bugun-ne-pisirsem-v1.html` (+341/-? : sticky panel + cook flow yeniden)
- `haftalik-menu-v1.html` (Ekle width fix + meal-aware POOL)
- `alisveris-listesi-v1.html` (jsPDF markalı PDF + buton bağlama)
- _shell.html ve diğer sayfalara DOKUNULMADI.
