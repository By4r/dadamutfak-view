# CİLA-2 FAZ 4 — UX Revize Raporu (ux-revize)

> Takım: cila2-faz4 · Lead: team-lead · Görev: TASK #4
> Kapsam: (A) site-geneli DadaStore dropdown sweep · (B) iletisim gerçek harita ·
> (C) tarif-bulucu YENİDEN TASARIM. Tarih: 2026-06-13.
> frontend-design skill kullanıldı (tarif-bulucu yeniden + iletisim harita).

---

## İŞ C — TARİF-BULUCU YENİDEN TASARIM (en riskli iş)

### 1) Rakip Araştırması

`nefisyemektarifleri.com/ara` WebFetch'i 403 (bot koruması) verdi; web arama +
erişilebilir 2 rakip incelendi:

| Rakip | Malzeme seçici | Sonuç düzeni | Zaaf |
|---|---|---|---|
| **nepisirsem.com** (MalzemeyeGoreYemekArama) | Kategorik gruplu liste (protein/tahıl/süt/sebze…) + hepsi/tuzlu/tatlı/sıcak/soğuk filtre | Tek sayfa **dikey**: seç (üstte) → sonuç (altta) | Seçim ile sonuç arasında **mesafe**; kaydırma gerekiyor |
| **tarifara.com** | Düz metin kutusu | Eşleşen tarif listesi | Görsel/kategori yok, ham |
| **nefisyemektarifleri.com** | Ana arama yanı "malzeme ile ara" sekmesi (içeren/içermeyen) + AI asistan | Ayrı sonuç sayfası | Seçim→sonuç ayrı ekran |
| **lezzet.com.tr** | Malzeme → kategori listeleme sayfaları | Liste sayfası | Etkileşimli değil |

**"Biz nasıl daha kullanışlı yaparız" çıkarımı:**
1. Rakiplerin ortak zaafı = **seçim ile sonuç arasında mesafe** (seç → kaydır →
   sonuç, ya da ayrı sayfa). Bizim kazanma hamlemiz: **canlı yan-yana** — malzeme
   işaretlenirken sonuç anında yanında değişir, mesafe = 0.
2. "Raf taşması" derdimizin sebebi bizdeydi: 6 akordeon rafı **aynı anda açık**
   tutuyorduk. Rakiplerin hepsi tek-liste/tek-kutu ile bunu zaten önlemiş.

### ⟳ REVİZE (Beyar 2. tur): "Tezgah Paneli" (dar sol panel) REDDEDİLDİ → GENİŞ FERAH IZGARA

**Red gerekçesi:** Dar sol sticky panel (380px) SIKIŞIK — 6+ kategori + çok malzeme o
dar kolona sığmıyor. **Yeni yön:** malzeme seçimi GENİŞ, nefes alan bir alanda olmalı
(nefisyemektarifleri/ara prensibi) — sol dar panel değil.

**2 GENİŞ yerleşim önerisi (ikisi de "ferah malzeme alanı"):**

**ÖNERİ A2 — "GENİŞ MALZEME IZGARASI" ✅ SEÇİLEN-UYGULANDI**
```
[ breadcrumb · H1 (KANON) ]
┌─ TEZGAH (tam genişlik kart) ───────────────────────────────────┐
│ Dolabında N malzeme · Boşalt                                    │
│ [  🔍 geniş arama  ]                                            │
│ Dolabımda: [Yumurta×][Domates×][Soğan×][Peynir×]                │
│ ( Sık Kullanılan )( Sebzeler )( Meyveler )( Baklagiller )…  ← tam-genişlik sekme │
│ ┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐   ← auto-fill ızgara │
│ │Yumr││Süt ││Un  ││Terey││Soğan││Domat││Peyn│     (her malzeme nefes alır) │
│ └────┘└────┘└────┘└────┘└────┘└────┘└────┘                      │
│ ▾ Filtreler                                                     │
└─────────────────────────────────────────────────────────────────┘
122 tarif · En çok eşleşen
[tarif][tarif][tarif]   ← tam genişlik 3 kolon
```
Tam genişlik tezgah: kategori sekmeleri (net geçiş) + `repeat(auto-fill,minmax(168px,1fr))`
ferah ızgara — aynı anda tek kategori, malzemeler tüm genişliğe yayılır (1440'ta ~7
kolon, 390'da 2 kolon). Sıkışıklık SIFIR. Canlı sayaç hemen altta.

**ÖNERİ B2 — "MALZEME PANOSU" (çok-kolon, hepsi görünür)**
6 §3 kategorisi aynı anda yan yana kolon-kart olarak (sekme yok, hepsi görünür) +
sonuç altta. Ferah ama dikeyde uzun → malzeme↔sonuç mesafesi büyür (eski R14 derdi).

**SEÇİM → A2:** (1) tam genişlik = ferah, sıkışıklık sıfır; (2) sekme = "kategoriler arası
net geçiş" (Beyar şartı) + tek kategori görünür → dikey kısa → sonuç yakın; (3) auto-fill
ızgara her ekran genişliğine uyum (1440→7 kol, tablet→4-5, 390→2). B2 hepsini gösterir
ama dikey uzar (mesafe). A2 ferahlık + kısa mesafeyi birlikte tutar.

**Kanıt (A2 — geniş ızgara):** 1440 render ✓ (`f4-tarif-bulucu.png` — tam genişlik ferah
ızgara) · 390 render ✓ (`f4-tarif-bulucu-390.png` — 2 kolon ızgara, sheet yok, inline
tezgah) · **390 element-rect taşma: scrollWidth=390, gerçek taşan=0** (fixed + scroll-soy
hariç; sekme şeridi `overflow-x:auto` = kasıtlı yatay kaydırma, sayfa taşması değil) ·
JS sözleşmesi (sekme/dup-sync/autocomplete/alerjen/filtre/sayaç) DEĞİŞMEDİ, korundu.

---

<details><summary>İlk tur (REDDEDİLEN) — Tezgah Paneli önerileri (arşiv)</summary>

**ÖNERİ A — "TEZGAH PANELİ" (dar sol panel — REDDEDİLDİ)**
```
┌─ breadcrumb · H1 "Evindeki malzemeyle pişir" (KANON — dokunulmadı) ─────────┐
│ ┌──────────────┐  ┌────────────────────────────────────────────┐          │
│ │ DOLAP (sticky)│  │ CANLI SONUÇ (hep görünür)                   │          │
│ │ • arama       │  │ 122 · "4 malzeme ile pişirebileceğin tarif" │          │
│ │ • seçilen şer.│  │ [tarif] [tarif]                              │          │
│ │ • SEKME barı  │  │ [tarif] [tarif]   ← mesafe = 0               │          │
│ │   (tek raf)   │  │ [tarif] [tarif]                              │          │
│ │ • katlanır flt│  │                                              │          │
│ └──────────────┘  └────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
```
380px sticky sol panel + canlı sağ sonuç. Raflar **segmented sekme** (aynı anda
TEK kategori görünür). Filtreler katlanır.

**ÖNERİ B — "ÜST TEZGAH ŞERİDİ"**
```
┌─ Kompakt yatay picker (arama + kategori popover + chip şerit, ~2 sıra) ──┐
├─ Filtre satırı (kalori · süre) ─────────────────────────────────────────┤
├─ TAM-GENİŞLİK SONUÇ GRID (3 kolon) ─────────────────────────────────────┤
└──────────────────────────────────────────────────────────────────────────┘
```
Dikeyde kısa picker + altta geniş sonuç. Sonuç fold altına itilir, site
pattern'ından (tarif-liste sticky-yan-panel) sapar.

### 3) Seçim Gerekçesi → ÖNERİ A

Mevcut tasarım iki UÇta da reddedilmişti:
- **316px sticky yan panel** (ilk hali) → sıkışık, raf taşması.
- **R14 üst-band** (tam-genişlik dolap, sonuç altta) → dolap↔sonuç mesafesi uzun.

ÖNERİ A bu ikisini **sentezler**:
- **Mesafe = 0:** dolap ve sonuç YAN YANA, ikisi de ilk ekranda görünür (canlı).
- **Raf taşması YAPISAL çözüldü:** 6 akordeon → **segmented sekme barı**; aynı anda
  yalnız 1 kategorinin malzeme kartları render olur, panel genişliğinde rahatça
  sarar. Panel ~380px (eski 316'dan geniş) + iç scroll.
- **Site içi tutarlılık:** tarif-liste `.lst-layout` sticky-panel + `.r-card` grid
  diliyle aynı eksen (lessons: site içi tutarlılık > dış referans).
- **Giriş deneyimi:** ilk sekme **"Sık Kullanılan"** (kiler temelleri) — düşük
  sürtünmeli başlangıç; varsayılan 4 malzeme dolu gelir → ilk anda 122 sonuç
  görünür (anında ödül). Arama "Dolabında ne var? (örn. yumurta, peynir…)"
  prompt'u + canlı ipucu.

</details>

### Komponent & Veri
- **Malzeme kategorileri (sekmeler):** §3'ün 6 GERÇEK kategorisi sekme olarak —
  Sebzeler · Meyveler · Baklagiller · Kırmızı Et · Beyaz Et · Balık. + 2 pratik
  sekme: **Sık Kullanılan** (giriş) ve **Süt & Temel** (kiler/baharat). Son sekme
  **İstemediklerim** (alerjen hariç-tutma, koyu slate state).
- **Mühendislik notu:** Aynı malzeme birden çok rafta olabiliyor (örn. Domates =
  Sık Kullanılan + Sebzeler). JS `setVal()` ile val'in TÜM raf kopyaları birlikte
  aç/kapanır; `haveList()` tekilleştirir → sayaç tutarlı.
- Korunan JS sözleşmesi: `refresh`/canlı sayaçlar, `.ie-sugg` autocomplete, alerjen
  `EXMAP` hariç-tutma, kalori dual-range, mobil alttan-sheet — hepsi BİREBİR korundu;
  akordeon→sekme + dup-sync + katlanır filtre eklendi.

### Kanıt (tarif-bulucu)
- **Render SS (1280px):** Tezgah Paneli — panel + canlı sonuç yan yana, sekmeler,
  Filtreler katlı. ✓
- **390 element-rect taşma probe** (fixed-soy hariç, lessons gereği scrollWidth'e
  güvenilmedi): **0 taşan eleman**, akan içerik scrollWidth=390. ✓
  (İlk turda 100 "taşan" çıktı → hepsi off-canvas mobil drawer çocuklarıydı
  [position:fixed atası, translateX(100%)]; probe fixed-ata hariç tutacak şekilde
  düzeltildi, sanity geçti.)
- **Fonksiyon flow probe (same-origin iframe, gerçek handler'lar): 14/14 PASS** —
  init sayaç (4 malzeme / 122 tarif), sekme geçişi (tek pane görünür), dup-val sync
  (çift yön), malzeme ekle/çıkar + chip, alerjen hariç-tutma (exNote + kart düşüşü),
  filtre katlanır, JS init crash yok.
- **Sweep sonrası birleşik render:** header (Dada Store düz link) + finder ikisi de
  sağlam. ✓

---

## İŞ B — iletisim-v1 GERÇEK HARİTA

**Önce:** alt kısımda manzara fotoğrafı (Unsplash kıvrımlı yol/doğa) üstüne pin —
"saçma görsel" (harita değil).
**Sonra:** GERÇEK **OpenStreetMap embed** (`openstreetmap.org/export/embed.html`,
keyless), Maslak marker'lı; üstte beyaz **adres kartı** (Maslak Mah. Büyükdere Cad.)
+ **"Yol tarifi al"** linki (OSM yön tarifi). Harita etkileşimli, kart yalnız köşede.

**Kanıt:** WebGL'li tarayıcıda render kanıtlandı (swiftshader SS → gerçek OSM haritası
+ yeşil marker). Adres kartı overlay doğru konumda.

---

## İŞ A — DADASTORE DROPDOWN SWEEP (site-geneli chrome)

Header'daki "Dada Store ▾" dropdown'ı kaldırıldı → tıklayınca **direkt
`dada-shop-v1.html`** açan düz link. Markup byte-tekdüze olduğu için literal/regex
küçük-blok replace kullanıldı (CSS'e DOKUNMADAN, region-swap DEĞİL → v3a CSS-yutma
riski yok).

- **Kapsam:** 56 dosya idempotent script + **3 divergent dosya elle** (anasayfa-portal-v3a,
  tarif-detay-v1, tarif-detay-v1-headA — headA `href="#"` varyantı). Toplam header
  düz-link: **63 dosya**, drawer düz-link: **59 dosya**.
- **Span-guard:** her eşleşme < 600 (header) / 800 (drawer) byte; tüm eşleşmeler
  491–575 byte → **0 abort**.
- **MUAF:** shop ailesi (dada-shop/urun-liste/urun-detay/sepet/odeme — ayrı kabuk,
  "Dada Store" yalnız logo, 0 dropdown) + panel-shell (nav yok). Dokunulmadı, teyitli.

**Kanıt (söze güven yok):**
- Negatif grep: `"Dada Store" + chevron birlikte` = **0** · eski `d-has-sub` Dada Store
  wrapper = **0** · idempotent re-run eşleşme = **0**.
- CSS integrity: `.dropdown{` kuralı tüm swept dosyalarda DURUYOR (kardeş nav
  dropdown'ları Sağlık/Tarifler hâlâ çalışıyor — _shell'de 2 dropdown kaldı); `<style>`
  dengesi 1/1.
- Shop ailesi sızıntı: 5 dosyada dropdown=0, "Dada Store" logo olarak korundu.
- Render SS (kesfet header): "Dada Store" caret'siz düz link; chevron yalnız
  Tarifler/Mutfak Sırları/Sağlık'ta (dropdown'u olanlar). ✓
- numstat: working-tree diff'i tüm takımın (mega menü + login + benim) birleşik
  değişimi; benim DadaStore değişimim ~−12 satır/dosya, tutarlı.

---

## İŞ D — ŞEF OL BAŞVURU SAYFASI + LİNK SWEEP (Beyar ara bulgu, sonradan eklendi)

**Sorun:** "Şef Ol" linki yanlış hedefe (tarif-ekle-v1 — Faz3 m12 ara çözümü) gidiyordu;
şef KAYIT/BAŞVURU akışına gitmeli.

**YENİ SAYFA — `sef-ol-v1.html`** (envanter +1): diyetisyen-ol-v1 "başvuru" kardeşinden
türetildi (frontend-design skill). 3 adımlı şef başvuru formu:
- **1 Kişisel:** ad/soyad/e-posta/telefon/şehir/kullanıcı adı
- **2 Mutfak Deneyimi:** deneyim (yıl) + seviye + **uzmanlık mutfakları** (12 çoklu-seçim
  chip: Anadolu, Hamur İşi, Tatlı, Et&Mangal, Deniz, Dünya, Vegan, Çorba, Kahvaltılık,
  Diyet, Pratik, Çocuk — max 5) + sosyal/portfolyo
- **3 Tanıtım & Onay:** profil fotoğrafı + örnek tarif görseli + motivasyon (600 char) +
  içerik türü (Tarif/Video) + 2 KVKK/sözleşme onayı + reCAPTCHA notu
- Yan ray: 4 adımlı başvuru süreci + "Neden DadaMutfak?" kartı. Başarı durumu (mock submit).
- Marka: diyetisyen-ol'un yeşil aksanları **tomato'ya** çevrildi (şef = tarif/marka rengi).
- JS sözleşmesi korundu (uzGrid/uzCount/bioText/bioCount/olForm/olSubmit/olSuccess).

**LİNK SWEEP:** tüm "Şef Ol" linkleri (`tarif-ekle-v1.html` + headA `#`) → `sef-ol-v1.html`.
62 scripted (sef-ol'un kendi footer'ı dahil) + 3 divergent elle (v3a/tarif-detay-v1/headA)
= **65 link**.

**Kanıt:** eski tarif-ekle Şef Ol kalan **0** · href=# kalan **0** · yeni sef-ol link **65
dosya** · hakkımızda `<h3>Şef Ol</h3>` başlığı DOKUNULMADI (sadece `<a>`) · header "Tarif
Ekle" (Ekle dropdown) → tarif-ekle **58 dosyada sağlam** (sweep kırmadı) · idempotent re-run
**0** · 4 aileden href probe → hepsi sef-ol-v1.html · sef-ol HTTP 200 · render SS ✓.

### İŞ D-2 — ŞEF OL DERİNLEŞTİRME (Beyar 2. tur — kurgu + pre-fill)
sef-ol formu kapsamlı kurguya çıkarıldı + **mockup standardı pre-fill DOLU** (persona:
Selin Yıldız, chef). 4 bölüm:
- **Kişisel:** profil fotoğrafı (avatar önizleme + değiştir) + ad/soyad/e-posta/telefon/
  şehir/kullanıcı adı + kısa tanıtım — hepsi örnek değerlerle dolu.
- **Uzmanlık & Mutfak:** seviye (Profesyonel şef) + uzmanlık mutfakları çoklu seçim =
  **Tarif Kategori §1 GERÇEK kategoriler** (Anadolu Mutfağı'ndan, Aperatif, Bakliyat … 24
  kategori + "Tüm kategoriler" aç/kapa; 4 pre-seçili: Anadolu/Hamur İşi/Tatlı/Zeytinyağlı).
- **Deneyim & Belgeler:** deneyim yıl + haftalık hedef + çalıştığı/eğitim yerleri +
  sertifika (up-done) + örnek tarif görseli (up-done).
- **Sosyal Medya & Tanıtım:** ayrı **Sosyal Medya** bölümü — markalı ikon+input satırları
  (Instagram gradient / YouTube kırmızı / TikTok siyah / Web tomato), pre-filled +
  motivasyon (600/sayaç, JS init ile 233 gösterir) + içerik türü (Tarif+Video) + 2 KVKK
  onaylı + gönder.
- Miras: diyetisyen-ol başvuru kalitesi + tarif-ekle `.fk-*` form-kit; yeni `.soc-row`/
  `.ava-row`/`.uz-more` CSS. JS: uzCount/bioCount init + "Tüm kategoriler" toggle eklendi.

**Kanıt:** `f4-sef-ol.png` (1440 tam sayfa, 4 bölüm dolu) · `f4-sef-ol-390.png` (mobil,
tek kolon, chip wrap) · `f4-sef-ol-sosyal.png` (sosyal medya bölümü yakın plan, 4 markalı
satır) · **390 element-rect taşma=0, scrollWidth=390**.

---

## 📸 KABUL EKRAN GÖRÜNTÜLERİ (mockups/.ss-scratch/cila/)
- `f4-tarif-bulucu.png` (1440 — Tezgah Paneli: dolap + canlı sonuç yan yana)
- `f4-tarif-bulucu-390.png` (mobil — raf taşması yok, mobil özet bar)
- `f4-iletisim.png` (gerçek OSM harita + adres kartı, swiftshader WebGL)
- `f4-sef-ol.png` (şef başvuru formu, 1440)

---

## ⚠️ BİLİNEN SINIRLAMALAR

1. **iletisim harita — WebGL + ağ bağımlılığı:** OSM embed gerçek tarayıcıda (GPU/WebGL'li)
   render olur; GPU-kapalı headless SS'te "WebGL gerekli" uyarısı verir (gerçek-tarayıcı
   sorunu DEĞİL, swiftshader ile teyit edildi). Embed canlı ağ ister; çevrimdışı/Pages'te
   tile yüklenmezse boş kalabilir. Pin koordinatı (Maslak) **örnek/yaklaşık** — gerçek
   ofis adresi netleşince güncellenecek (Laravel/içerik fazı).
2. **Malzeme verisi mock + §3 kapsamı:** §3 yalnız 6 "ana malzeme" kategorisi veriyor
   (dairy/kiler/baharat YOK). Kullanılabilir bir bulucu için **"Sık Kullanılan" ve
   "Süt & Temel"** sekmeleri pratik olarak EKLENDİ (§3 dışı). Malzeme öğeleri ve tarif
   eşleşme sayıları (122, 18+n×26 formülü) **mock**; gerçek eşleşme motoru Laravel fazı.
3. **Sekme rozet sayıları (.st-dot):** seçili malzeme birden çok sekmede sayılır (Domates
   hem Sık Kullanılan hem Sebzeler rozetinde +1) — bu KASITLI (malzeme gerçekten her iki
   kategoriye ait); toplam "Dolabında N" tekilleştirilmiş, doğru.
4. **DadaStore marka dili patron kararı bekliyor:** sweep yalnız dropdown'ı kaldırıp linki
   dada-shop'a bağladı; "Dada Store" adı/marka dili kararı (handoff patron-bekleyen #2)
   ayrı, dokunulmadı.
5. **Doğrulama altyapısı:** MCP paylaşımlı tarayıcı takımca kilitliydi; doğrulama izole
   headless Chrome (system Chrome 149) + same-origin iframe probe ile yapıldı. Bu sırada
   ardışık Chrome profilleri boot diskini doldurdu (ENOSPC) → temizlendi; **lessons'a ders
   önerisi** aşağıda.
6. **sef-ol-v1.html mock:** form submit gerçek kayıt yapmaz (showSuccess mock); dosya
   yükleme, kullanıcı adı uygunluk kontrolü, KVKK kayıt = Laravel fazı. Envanter **+1**
   (lead güncel sayıyı tutsun). "Şef Ol" artık tüm sitede sef-ol-v1'e gidiyor (eski
   tarif-ekle hedefi sıfırlandı); "Şef Ol" MARKA/akış kararı netleşirse tek href sweep'i.
7. **Commit/push YAPILMADI** (kural). Çalışma diskte kayıtlı.

---

## 📌 LESSONS'A DERS ÖNERİSİ (Beyar onayına)

**Headless-Chrome doğrulamasında profil/cache disk birikimi (ENOSPC riski).**
MCP paylaşımlı tarayıcı kilitliyken izole headless Chrome screenshot/probe kullanışlı,
AMA her `--user-data-dir=/tmp/ppN` profili onlarca-yüz MB tutar; ardışık koşumlarda
boot diski dolarsa Bash/Write araçları çalışmaz hale gelir (harness komut output
dosyasını açamaz → komut HİÇ koşmaz, pkill/rm dahil). **Kural:** (1) izole headless
probe'da TEK profil dizini kullan + her koşumdan sonra `rm -rf` ile temizle; (2) probe
serisi öncesi `df -h /` kontrolü; (3) takılırsa background bash shell'leri **TaskStop**
ile durdur (chrome process'ini serbest bırakır → bir sonraki rm scratch açıp diski
boşaltabilir). MCP browser müsaitse onu tercih et (profil bırakmaz).
