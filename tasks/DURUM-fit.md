# DURUM — DadaFit revizyon hattı

> **Bu belge nedir:** DadaFit revizyon işini hiç bilmeyen bir oturumun devralabilmesi için
> yazılmış devir belgesi. Son güncelleme: **2026-08-11**.
> **Aşama:** Ölçüm turu tamamlandı. Uygulama turu **başlamadı**. Kod değişikliği **yok**.
>
> **Kapsam dışı borç kaydı için doğrudan §9'a bakın** — DadaFit süper admin ve antrenör
> operatör paneli dosyaları (20 dosya) bu revizyonun kapsamında değildir, ama repoda ve
> canlıda dururlar ve üçünde yatay taşma ölçülmüştür.

---

## 1 · İşin tanımı ve kaynakları

| Ne | Yol |
|---|---|
| **Bağlayıcı revizyon belgesi** | `tasks/kaynak/fit-revizyon-dokumani.md` — 672 satır, 20 bölüm. "Dada Fit — Site Haritası, Menü ve Modül Revizyon Dokümanı". Uygulanacak hedef budur. |
| **Ölçüm raporu (bu turun çıktısı)** | `tasks/ENVANTER-fit.md` — 622 satır, 10 bölüm. Mevcut durumun sayılarla envanteri. |
| Proje kuralları | `CLAUDE.md` (depo kökü) |
| Ders/hata birikimi | `tasks/lessons.md` — 616 satır |
| Marka renk kanonu | `tasks/brand-tokens.md` (bağlayıcı), `tasks/kurumsal-renk.md` (ham çıkarım) |
| Ölçülen dosyaların bulunduğu dizin | `v7-6cu356/` (274 kök seviye HTML) |

**Belgenin özü:** DadaFit'in bugünkü 6 eş düzey ana menü başlığı (Egzersizler · Programlar ·
Enerji Defteri · Hareket Rehberi · Challenge · Antrenörler) **4 başlığa** indirilecek
(**Hareket · Programlar · Fit Planım · Antrenörler**); içerik silinmeden anlamlı merkezler
altında gruplanacak. Enerji Defteri bağımsız menü kalemi olmaktan çıkıp "Fit Planım" kişisel
alanının ana ekranı olacak. Kurumsal görsel dil (renk, tipografi, kart, boşluk, ekosistem üst
barı) korunacak.

---

## 2 · Bu turda ne ölçüldü

Yedi ölçüm işi tamamlandı. Tam sonuçlar `tasks/ENVANTER-fit.md` içinde; aşağısı özet.

### 2.1 Aile ayrımı (rapor §1)
`v7-6cu356/` kök seviyesindeki **274 HTML** ve **5 JS**, `assets/` altındaki **4 CSS + 4 JS**
markalara atandı. Atama kanıtı: ekosistem barındaki `class="bs-<marka> is-active"`,
header `class="brand <X>-brand"`, ana menü içeriği, yüklenen `assets/*` dosyaları.

| Küme | Adet |
|---|---:|
| DadaFit (21 public + 8 antrenör paneli + 12 `sa-dadafit-*`) | 41 |
| DadaDiet (37 public + 6 panel + 1 redirect stub) | 44 |
| DadaGastro | 38 |
| DadaGourmet (19 public + 4 panel) | 23 |
| DadaStore | 5 |
| DadaCampus | 2 |
| DadaMentor (1 canlı `dadamentor-v3` + 14 varyant) | 15 |
| ORTAK / paylaşımlı | 98 |
| Wireframe ve atık | 18 |
| **BELİRSİZ** (bkz. §4) | 2 |

**"antrenor" öneki koddan doğrulandı, dosya adından varsayılmadı.** İki katmana dağılmış,
ikisi de DadaFit ailesi:
- `antrenorler-v1`, `antrenor-detay-v1`, `antrenor-ol-v1` → public, `bs-fit is-active` taşıyor.
- `antrenor-panel-v1` + 7 kardeşi → operatör paneli. Kanıt: `v7-6cu356/antrenor-panel-v1.html`
  satır 18–22 kod yorumu (*"mekan-panel / panel-shell YEŞİL DİLİNİN KARDEŞİ — DadaFit antrenör
  muadili … AKSAN: DadaFit KURUMSAL YEŞİL #009d4f"*) ve `--green:#009d4f` token'ı.

### 2.2 DadaFit envanteri (rapor §2)
- 21 public sayfa, **45.726 satır**, ortalama 2.177 satır/sayfa.
- **Boş veya şablon kalmış dosya yok** — en küçüğü 1.811 satır, hepsinde gerçek içerik var.
- 8 `hareket-*` kategori sayfası birbirinin türevi: satır bazında ortaklık **%96–98**.
- Tüm public CSS ve JS **satır içi**; harici tek bağ FontAwesome 6.5.2 CDN'i.
- Rol parametreli kabuk `v7-6cu356/sa-shell.html` (74 satır) + `v7-6cu356/assets/js/sa-shell.js`
  (343 satır). Desteklediği `?role=` değerleri (satır 77–92): `super` · `saglik-admin` ·
  `store-admin` · **`dadafit-admin`** · `isletme-admin`. Rol çözümü: URL parametresi →
  `localStorage['dm_sa_role']` → varsayılan `super`. Tanımsız değer `super`'a düşer.
  Bölümler: `genel` · `admin` · `saglik` · `store` · `dadafit` · `isletme` · `akademi` (locked).

### 2.3 Belge haritasıyla karşılaştırma (rapor §3)
34 satırlık hedef listesi tarandı: **VAR 6 · YARIM 17 · YOK 11**.

Mevcut ana menü koddan okundu ve belgenin §2 tablosundaki "mevcut menü" listesiyle
**birebir uyuştu — fark yok** (6/6 kalem). Belgenin saymadığı iki gerçek eklendi:
1. `v7-6cu356/egzersiz-detay-v1.html` menüsü divergent: 5 kalem, ilk kalem
   **"Hareket Merkezi"** (→ `dadafit-hub-v1.html`); "Enerji Defteri" ve "Hareket Rehberi"
   bu sayfanın menüsünde yok. Yani belgenin istediği terim tek sayfada zaten uygulanmış,
   menü 21 sayfada tekdüze değil.
2. Ana menünün yanında 3 navigasyon katmanı daha var: drawer-nav (11 kalem),
   bottom-nav (5 kalem), footer "DadaFit" kolonu (6 kalem).

### 2.4 Kabuk ölçümü (rapor §4)
Kabuk **tek kaynakta değil**. Site geneli tekrar maliyeti:
topbar 4.506 + header 13.204 + drawer 9.012 + footer 7.282 + kabuk CSS 34.565 =
**68.569 satır**. DadaFit'in 21 sayfasında kabuk payı **9.021 satır / %19,7**.

**Ana menüye tek kalem eklemek bugün = 21 dosya, en az 63 ekleme noktası**
(header nav 21 + drawer nav 21 + footer kolonu 21). Alt bara da girecekse +21,
dropdown'a girecekse +21.
Karşılaştırma: süper admin menüsüne kalem eklemek **1 dosya, 1 satır**
(`v7-6cu356/assets/js/sa-shell.js` içindeki `SECTIONS.<bölüm>.menu` dizisi).

Rol parametreli kabuk ile 77 statik `sa-*` ekran dosyası **aynı CSS/JS kaynağını** yüklüyor
(2. seviye menü tek yerden üretiliyor), ama ikon-rail (12 satır) ve üst bar (18 satır) markup'ı
77 dosyada kopya. DadaFit public tarafı bu altyapının **tamamen dışında** — hiçbir şey paylaşmıyor.
Üç ayrı kabuk rejimi var: public (tam kopya) · süper admin (kısmen tek kaynak) · operatör paneli (kısmen).

### 2.5 Sınıf ve token envanteri (rapor §5)
- DadaFit public'te **1.086 benzersiz sınıf adı, 250 önek**. 50 önek 18+ dosyada
  (ortak kabuk), **144 önek tek dosyada** (sayfa-yerel).
- **Aynı işi yapan ayrı sınıf aileleri:** egzersiz kartı → `.ex-card` / `.hub-card` /
  `.fs-card` / `.ed-altcard`; program kartı → `.pr-card` / `.prog-card` / `.df-combo-card`;
  challenge kartı → `.cc-card` ve `.chl-card` **aynı dosyada** (`challenge-v1.html`).
- **İsim çakışması:** `.hub-card` `dadafit-hub-v1.html`'de *egzersiz kartı*,
  `hareket-rehberi-v1.html`'de *rehber kategori kartı*. Ortak CSS'e taşınırsa biri bozulur.
- Token'lar paylaşılan bir dosyada değil; **178 HTML'in satır içi `:root{}` bloğunda** tanımlı.
  Tek istisna `v7-6cu356/assets/css/sa-shell.css:24` (yalnız yönetim paneli).
- **`--tomato:#009d4f`** — DadaFit sayfalarında "domates" adlı token kurumsal yeşile bağlanmış;
  sitenin diğer 97 dosyasında aynı ad `#E14827`. Aynı isim, iki farklı renk.
- 14 renk/ölçü değeri iki veya daha fazla isimle tanımlı; `--r-lg` iki farklı değer taşıyor
  (`var(--radius-xl)`=24px ve 16px).
- 4 public marka **63 tokenlik ortak çekirdeği** paylaşıyor ama **kopyalayarak** —
  bir token değişirse 112 dosya düzenlenir. `dadamentor-v3` bu çekirdeğin dışında.
  Antrenör paneli ayrı 30 tokenlik küme kullanıyor.

### 2.6 Bağlantı ve sağlık ölçümü (rapor §6)
Kapsam 41 sayfa (21 Fit public + 8 antrenör paneli + 12 `sa-dadafit-*`).

| Bulgu | Sonuç |
|---|---|
| Kırık iç hedef / kırık dosya / kırık varlık | **0 / 0 / 0** |
| Kök dizinden mutlak yol (`/…`) | **0** — tüm iç bağlantılar relative |
| Büyük-küçük harf uyuşmazlığı | **0** |
| `href="#"` | **276** — bunların **172'si gerçekten ölü**: 168 sosyal medya ikonu (21 sayfa × 8), `challenge-v1.html`'de 2 challenge kartı, `antrenor-ol-v1.html`'de 2 yasal link |
| Sayfa-düzeyi yatay taşma | **4 vaka, 3 dosya, hepsi panel tarafında** (aşağıda) |
| Konsol hatası (41 sayfa × 4 genişlik = 164 yükleme) | **0** |
| Ağ hatası (8 sayfa probu) | requestfailed 0, HTTP≥400 0 |

Yatay taşma (ölçüt: `documentElement.scrollWidth > viewport`):
- `antrenor-uyeler-v1.html` @768 → 919 (+151px) ve @1024 → 1179 (+155px) — `<table class="ptable">`
- `antrenor-programlar-v1.html` @1024 → 1372 (+348px) — `<table class="ptable">`
- `sa-dadafit.html` @1024 → 1124 (+100px) — `.df-mod-card.is-locked`
- **21 Fit public sayfasının hiçbirinde sayfa-düzeyi taşma yok** (1440/1024/768/390).

Banner yüksekliği / ekran yüksekliği > %50 (viewport yüksekliği 900px sabit):
`enerji-defteri-v1` 1,13 · `challenge-v1` 1,02 · `dadafit-hub-v1` 0,97 · `antrenor-detay-v1` 0,97 ·
`dadafit-kopru-v1` 0,89 · `antrenor-ol-v1` 0,83 · `program-detay-v1` 0,77 · `arama-fit-v1` 0,52.

Aynı işleve farklı terim: "Egzersizler" (147 geçiş) ↔ "Hareketler" (10) ↔ "Hareket Merkezi" (6);
"Antrenör" (170) ↔ "Eğitmen" (8) ↔ "Koç" (1); antrenör paneli **"Üyelerim"** ↔ diyetisyen paneli
**"Danışanlar"** (antrenör panelinde "Danışan" kelimesi 0 geçiş).

### 2.7 Yayın ve gizlilik durumu (rapor §7)
Uzak kaynak `git@github.com:By4r/dadamutfak-view.git`, dal `main`, GitHub Pages aktif (main/kök).
Takip edilen **727 dosyanın 205'i iç belge veya betik** ve tamamı canlıda **HTTP 200** dönüyor
(curl ile doğrulandı):

| Kategori | Adet |
|---|---:|
| Ajan/QA raporu (`outputs/*.md`) | 76 |
| QA/sweep betiği (`.mjs` + `.py`) | 48 |
| Spec / kanon belgesi | 33 |
| Plan / envanter notu | 31 |
| Diğer iç belge (`.md`) | 11 |
| Kurumsal/ham kaynak (PDF, XLSX) | 4 — kurumsal kılavuz PDF'i `brand/` ve `tasks/` altında **iki kopya** |
| Ders notu (`tasks/lessons.md`, 616 satır) | 1 |
| Proje dışı görsel | 1 |

- **Anahtar/token deseni: 0 eşleşme.** `.env` uzantılı dosya: **0**.
- Kişi adı geçen kod yorumu: **33 satır / 24 dosya** ("Beyar", "Kerem", "Yasin").
  **DadaFit dosyalarında 0.**
- `tasks/handoff.md` gitignore'lu, canlıda **404** — doğru durumda.
- `.gitignore`'da `outputs/` ve `v7-6cu356/outputs/` satırları var **ama `outputs/` altında
  88 dosya hâlâ takip ediliyor** (sonradan yazılan ignore kuralı önceden eklenen dosyaları
  geri almaz).
- Bu işin kaynak belgesinin kardeşleri `v7-6cu356/tasks/30-haz-revize/` altında 7 dosya
  (`fit-ek.md`, `diet-ek.md`, `dada-revize.md`, `marka-kabuk-sablonu.md`,
  `marka-klon-sablonu.md`, `gastro-pilot-plan.md`, `amac-ve-kapsam.md`) — takip ediliyor, canlı.

---

## 3 · Bekleyen kararlar

Aşağıdaki maddelerin hiçbiri ölçümle çözülemez; hepsi Beyar'ın kararını bekliyor.
Karar alınmadan ilgili iş **başlatılmamalı**.

| # | Karar | Neden şimdi gerekiyor | Ölçülen dayanak |
|---:|---|---|---|
| **K1** | **Kabuk tek kaynağa alınacak mı, yoksa menü revizyonu 21 dosyada elle mi yapılacak?** | Belge §17 Faz 1 ana menüyü 6→4'e indiriyor. Bugünkü yapıda bu, 21 dosyada 4 ayrı navigasyon katmanına dokunmak demek. | Menüye 1 kalem = 21 dosya / 63 ekleme noktası. Kabuk tekrarı Fit'te 9.021 satır (%19,7), site genelinde 68.569 satır. `tasks/lessons.md` bu koşullarda iki ayrı korupsiyon vakası kaydediyor (region-swap'in 308 satır CSS yutması; greedy regex'in 18 dosyadan −174 satır silmesi). |
| **K2** | **Antrenör profili hangi dosyada yaşayacak: `antrenor-detay-v1.html` mi, `profil-v1.html?role=antrenor&view=public` mü?** | Belge §10.2'nin eksik alanları (fiyat, iptal koşulları, uygunluk takvimi, benzersiz slug) hangi dosyaya yazılacağı belirsiz. Randevu yaşam döngüsü (§11) de bu karara bağlı. | `antrenor-detay-v1.html` 2.185 satır ve **0 gelen link taşıyor (yetim)**. `antrenorler-v1.html`'deki 5 antrenör kartının hepsi `profil-v1.html?role=antrenor&view=public` adresine gidiyor. `profil-v1.html` 4.951 satır ve 4 rolü (Gastro üye, diyetisyen, antrenör, işletme) tek dosyada gate'liyor. |
| **K3** | **Fit rozetleri/challenge ilerlemesi nereye yazılacak?** | Belge §9.1 "Challenge ve Rozetler"i Fit Planım alt menüsüne koyuyor. Repodaki `rozetler-v1.html` ise Gastro şef kademesi. | `rozetler-v1.html` 2.058 satır, **132 dosyadan linkli**, içinde DadaFit yalnız ekosistem geçiş linki olarak 2 kez geçiyor. Fit'e ait rozet/seri verisi yok. |
| **K4** | **Gastro hesap aksiyonları Fit hesap menüsünden çıkarılacak mı?** | Belge §3.3 bunu açıkça istiyor: *"Dada Fit sayfalarında 'Mutfak Defterim / Tarif Ekle' gibi Dada Gastro hesap aksiyonları doğrudan ana hesap menüsüne taşınmamalı."* | `tarif-ekle-v1.html`, `puf-noktasi-ekle-v1.html`, `mutfak-defteri-v1.html` **21/21 Fit sayfasının** hesap dropdown'ında ve drawer'ında duruyor. Aynı blok 140 dosyada tekrar ettiği için "sadece Fit'ten kaldır" ayrımı elle yapılmalı; global sweep Gastro'yu bozar. |
| **K5** | **Footer yasal kalemleri (Kullanım Koşulları, Gizlilik, Sağlık Bilgilendirmesi) geri gelecek mi?** | Belge §3.3 üçünü de footer'da istiyor. Bugün footer'da hiçbiri yok. | `yasal-v1.html` **21/21 Fit sayfasından linkli** ama yalnız çerez banner'ı ve form onay satırından (`?metin=cerez`, `?metin=kvkk`, `?metin=aydinlatma`) — footer kolonlarından değil. "Sağlık Bilgilendirmesi" için ayrı sayfa yok; genel bilgi/tıbbi tavsiye ayrımı metni 21 Fit sayfasının yalnız **4'ünde** var (`hareket-rehberi-v1`, `hareket-yeni-baslayanlar-v1`, `hareket-sureye-gore-v1`, `hareket-masa-basi-v1`). |
| **K6** | **Yayın hijyeni turu ne zaman koşulacak?** | Her yeni commit canlı yüzeyi büyütüyor. Fit uygulama turu 21+ dosyaya dokunacak ve yeni rapor/QA betiği üretecek. | 205 iç belge canlıda 200 dönüyor; içinde `tasks/lessons.md` (616 satır kriz anlatımı), `tasks/master-plan-2026-07-02.md`, `tasks/brand-tokens.md`, kurumsal PDF ve `v7-6cu356/tasks/30-haz-revize/fit-ek.md` var. |

---

## 4 · İki belirsiz dosya — cevap bekleyen soru

Aile ataması ölçümle yapıldı; bu iki dosyanın **ailesi belli, durumu belli değil**.
Bir dosyanın "bilinçli mi bırakılmış yoksa atık mı" olduğu kod ölçümüyle belirlenemez.

### S1 · `v7-6cu356/yol-guzergahim-v1.html` (3.230 satır)
**Aile:** DadaGourmet. **Ölçüm:** Bu dosyaya **3** dosyadan link var
(`dizin.html`, `mekan-detay-v1.html`, `rozetler-v1.html`). Halefi `yol-guzergahim-v2.html`
(2.736 satır) ise **50** dosyadan linkli.
**Soru:** v1 bilinçli olarak mı duruyor, yoksa v2 geçişinden kalan atık mı?
Atıksa "wireframe ve atık" kümesine geçer ve kalan 3 gelen link temizlenmeli.

### S2 · `v7-6cu356/tarif-detay-v1-headA.html` (2.674 satır)
**Aile:** DadaGastro. **Ölçüm:** Yalnız `dizin.html`'den linkli. Ana menüsü **eski sürüm** —
"DadaStore" ve "Dada Akademi" düz nav öğesi olarak duruyor; bu drift kardeş sayfalardan
daha önce temizlenmişti.
**Soru:** Aktif bir A/B başlık varyantı mı, yoksa atık mı?

**Bilgi notu (soru değil, itiraz gelirse diye kayıtta):** Şu dosyalar sıfır veya çok düşük
gelen linkle "wireframe ve atık" kümesine atandı — `dadamentor-alt1..6`, `dadamentor-v1`,
`dadamentor-v1-A..E`, `dadamentor-v2-a`, `dadamentor-v2-b` (14 dosya; 12'sinde 0 gelen link,
`alt6`=2, `v1`=4) · `wireframe-1..10` (10 dosya, 0 gelen link) · `ref-food52`, `ref-graza`,
`ref-mob`, `ref-nyt`, `ref-ourplace`, `ref-refika`, `ref-sakara` (7 dosya, 0 gelen link) ·
`_overflow_probe.html` (38 satır probe fixture). `dadamentor-v3.html` canlı sayfadır,
atık değildir.

---

## 5 · Hiç başlanmamış modül aileleri

Rapor §8'in özeti. Bunlar "eksik alan" değil, **sıfırdan kurulacak** aileler:

| Aile | Belge bölümü | Repodaki iz |
|---|---|---|
| **Fit Planım** kabuğu + 10 alt sayfa | §4, §9, §18/5, §19 | "Fit Planım" ifadesi depoda **0 eşleşme**. 10 kalemden yalnız `Enerji Defteri` var, o da bağımsız ana menü kalemi olarak. |
| **Bana Uygun Başlangıcı Bul** sihirbazı | §5.2, §6, §8.1, §18/7 | **0 eşleşme.** |
| **Challenge Merkezi** | §4, §8.4 | Sayfa yok. `challenge-v1.html` tek bir challenge detayı; içindeki "Diğer Challenge'lar" 3 karttan biri kendine, biri `href="#"`, birinin linki yok. |
| **Hareket Merkezi** toparlayıcı sayfası | §4, §7.1 | Sayfa yok; terim yalnız `egzersiz-detay-v1.html` menüsünde. |
| **Benzersiz kimlik / slug altyapısı** | §12, §13, §18/8, §19 | **Yok.** Her modülde tek sabit detay sayfası var; her kart aynı sayfayı açıyor. |
| **Veri ve izin yönetimi** | §14.2 (6 madde) | **0 eşleşme.** |
| **Randevu yaşam döngüsü** (9 adım) | §10.1, §11 | `antrenorler-v1.html`'de "Randevu" 0 eşleşme; 8 antrenör paneli sayfasında "Takvim"/"Randevu" 0 eşleşme. |
| **Antrenör ticari katmanı** (ödeme, komisyon, kazanç, raporlar) | §10.3, §12.4 | 8 panel sayfasında 0 eşleşme. |
| **Sağlık Bilgilendirmesi** sayfası | §3.3, §14.1 | Ayrı sayfa yok. |

---

## 6 · Devralan oturum için çalışma notları

### 6.1 Depo durumu — dokunulmaması gerekenler
- **2026-08-11 itibarıyla çalışma ağacı kirli:** `tasks/lessons.md` ve
  `v7-6cu356/sezon-v1.html` değiştirilmiş, ayrıca çok sayıda takip edilmeyen dosya var.
  **Bu bilinen bir durumdur, temizlenmesi teklif edilmez.**
- **`v7-6cu356/sezon-v1.html` toplu yayılımlardan BAŞTAN hariç tutulur.** Beyar'ın üzerinde
  commit'lenmemiş işi var. Atlanan kalem "yayılım borcu" olarak rapora yazılır.
- `v7-6cu356/anasayfa-portal-v3a.html` ve `v7-6cu356/tarif-detay-v1.html` divergent olarak
  işaretli sayfalardır; toplu sweep script'ine sokulmaz, kendi anchor'larıyla elle patch'lenir
  (`tasks/lessons.md`).

### 6.2 İzin kuralları
- Plan onaylanmadan implement yok (`CLAUDE.md`).
- Commit yalnız açık izinle atılır. "Hazırlanacak / QA bekle" izin sayılmaz.
- `git add -A` kullanılmaz; dosyalar tek tek isimle stage edilir, commit öncesi staged liste
  doğrulanır.
- Push ayrı ve açık izin ister. Push sonrası `git status --short --branch` ile ahead/behind
  doğrulaması zorunlu (`tasks/lessons.md`).

### 6.3 Ölçümlerin tekrarlanabilirliği
Bu turun ölçüm betikleri **depoya yazılmadı** (oturum scratchpad'inde kaldı, artık yok).
Tekrar üretmek gerekirse yöntem:
- Yerel sunucu: `v7-6cu356/` kökünde `python3 -m http.server <port>`. Playwright 1.61
  depo kökündeki `node_modules` altında. Betikler depo dışına yazılmalı; import mutlak yolla
  yapılır (`/Users/.../node_modules/playwright/index.mjs`).
- **Playwright'ta `networkidle` kullanılmaz** — portal ve hero videolu sayfalarda asla inmiyor.
  `domcontentloaded` + sabit bekleme kullanılır.
- **Taşma dedektörü element-rect tabanlı olmalı**, `document.scrollWidth` tek başına yetmez
  (clipped taşma görünmez). Ayrıca `position:fixed` veya `translateX>20px` atası olan katmanlar
  (drawer, modal, banner) elenmeli — yoksa off-canvas drawer çocukları her sayfada sahte
  taşma üretir. Bu turda düzeltilmeden önce her sayfa uniform 58 sahte bulgu vermişti.
- Sayfa-düzeyi taşma ile iç yatay-scroll konteynerini ayırma ölçütü:
  `documentElement.scrollWidth > viewport` ise gerçek taşma, eşitse konteyner içi kayma.
- Dedektör her koşuda **bilinçli kirli + bilinçli temiz fixture** ile sanity-check edilmeli.
- **zsh tuzağı:** `for f in $LIST` unquoted iterasyon zsh'de word-split ETMEZ, tüm liste tek
  değişkene düşer ve sessizce yanlış sonuç verir. Dosya listesi bir dosyaya yazılıp
  `$(cat liste.txt)` ile geçilmeli.

### 6.4 Ölçüm sınırları (raporda da yazılı)
- Banner oranları **900px sabit viewport yüksekliğine** göre; gerçek cihazlarda oran değişir.
- Konsol/ağ ölçümü **yerel sunucuda** yapıldı. `v7-6cu356/assets/video/dadafit-hero.mp4`
  gitignore'lu olduğu için lokalde yüklendi ama **canlıda yüklenmez** —
  `dadafit-hub-v1.html` ve `enerji-defteri-v1.html`'de canlıda video 404'ü beklenir.
  Bu lokal ölçümle gösterilemedi.
- "Menüden erişilebilir" sütunu statik `href` taramasına dayanır. `onclick` ile gidilen
  hedefler ayrıca işaretlendi (`arama-fit-v1.html` — 20 sayfada arama ikonundan
  `onclick="location.href=..."` ile açılıyor, hiç `href`'i yok).
- `v7-6cu356/program-liste-v1.html`'de topbar işaret yorumu farklı olduğu için topbar satır
  sayısı 20/21 dosyada ölçüldü; barın kendisi 21/21'de mevcut (`brand-switch` doğrulandı).

---

## 7 · Bu turun git kaydı

| Ne | Değer |
|---|---|
| Tur öncesi HEAD | `12289a1` (origin/main ile birebir, ahead 0) |
| Bu turda atılan commit | `d086dfe` — *docs(fit): DadaFit envanter + ölçüm raporu (7 iş, ölçüm turu)* |
| Değişen dosya | 1 dosya, +622 satır: `tasks/ENVANTER-fit.md` (yeni) |
| Kod değişikliği | **Yok** |
| Push | **Yapılmadı** — `d086dfe` lokalde bekliyor |

---

## 8 · Bilinen sınırlamalar

- Bu belge ve `tasks/ENVANTER-fit.md` **ölçüm ve devir belgesidir; uygulama planı değildir.**
  Belgenin §17 faz tablosu ile raporun §10 sıra önerisi birbirinden farklıdır; hangisinin
  esas alınacağı karar K1'e bağlıdır.
- `tasks/ENVANTER-fit.md` §10 ("Gözlemim") ölçüm değil yorumdur; sayılara dayanır ama
  bağlayıcı değildir.
- Ölçüm 2026-08-11 tarihli çalışma ağacına aittir. Depoda o tarihten sonra değişiklik
  yapıldıysa sayılar yeniden doğrulanmalıdır.
- Yayın/gizlilik ölçümünde **hiçbir dosya silinmedi, taşınmadı, `.gitignore`'a eklenmedi ve
  geçmişe dokunulmadı.** Temizlik işi karar K6'ya bağlı olarak ayrı bir turda yapılacaktır.

---

## 9 · KAPSAM DIŞI BORÇ — DadaFit yönetim ve operatör panelleri

> **Neden ayrı bölüm:** `tasks/kaynak/fit-revizyon-dokumani.md` public DadaFit arayüzünü
> kapsıyor. Aşağıdaki 20 dosya **o belgenin kapsamında değil** — belge yalnız §10.3'te
> antrenör panelinin ne içermesi gerektiğini tarif ediyor, süper admin tarafından hiç
> bahsetmiyor. Buna karşın bu dosyalar repoda duruyor, canlıda yayında ve envanter turunda
> **üç dosyada yatay taşma ölçüldü**. Fit revizyon planı bunlara dokunmayacak; bu borç
> kaydı unutulmasın diye tek yerde tutuluyor.

### 9.1 Kapsam dışı dosyalar

**DadaFit süper admin bölümü — 12 dosya** (`data-sec="dadafit"`, `v7-6cu356/` altında):
`sa-dadafit.html` · `sa-dadafit-egzersizler.html` · `sa-dadafit-egzersizler-form.html` ·
`sa-dadafit-egzersizler-detay.html` · `sa-dadafit-programlar.html` ·
`sa-dadafit-programlar-form.html` · `sa-dadafit-programlar-detay.html` ·
`sa-dadafit-challenge.html` · `sa-dadafit-challenge-form.html` ·
`sa-dadafit-challenge-detay.html` · `sa-dadafit-antrenorler.html` ·
`sa-dadafit-antrenorler-detay.html`

**DadaFit antrenör operatör paneli — 8 dosya** (`v7-6cu356/` altında):
`antrenor-panel-v1.html` · `antrenor-uyeler-v1.html` · `antrenor-programlar-v1.html` ·
`antrenor-program-builder-v1.html` · `antrenor-egzersizler-v1.html` ·
`antrenor-challenge-v1.html` · `antrenor-mesajlar-v1.html` · `antrenor-profil-ayar-v1.html`

### 9.2 Ölçülen yatay taşma — 3 dosya, 4 vaka

Ölçüm tarihi **2026-08-11**. Playwright 1.61 chromium headless, yerel sunucu,
viewport 1440 / 1024 / 768 / 390 × 900px.
Ölçüt: `document.documentElement.scrollWidth > viewport genişliği` → sayfa-düzeyi yatay taşma.
(Eşitse iç yatay-scroll konteyneri sayılır ve taşma kabul edilmez.)

| Dosya | Genişlik | `scrollWidth` | Fazla | Taşan öğe | Taşan eleman sayısı |
|---|---:|---:|---:|---|---:|
| `v7-6cu356/antrenor-uyeler-v1.html` | 768 | 919 | **+151 px** | `<table class="ptable">` (sol 17 → sağ 919) | 64 |
| `v7-6cu356/antrenor-uyeler-v1.html` | 1024 | 1179 | **+155 px** | `<table class="ptable">` (sol 277 → sağ 1179) | 64 |
| `v7-6cu356/antrenor-programlar-v1.html` | 1024 | 1372 | **+348 px** | `<table class="ptable">` (sol 277 → sağ 1372) | 91 |
| `v7-6cu356/sa-dadafit.html` | 1024 | 1124 | **+100 px** | `.df-mod-card.is-locked` (kilitli modül kartı, sol 955 → sağ 1124) | 10 |

**Aynı ölçümde temiz çıkanlar (kayıt için):**
- Bu 4 vaka dışındaki tüm genişlikler: `antrenor-uyeler-v1` @1440 ve @390, `antrenor-programlar-v1`
  @1440/@768/@390, `sa-dadafit` @1440/@768/@390 → `scrollWidth == viewport`, taşma yok.
- Kalan 6 antrenör paneli sayfası (`antrenor-panel-v1`, `antrenor-program-builder-v1`,
  `antrenor-egzersizler-v1`, `antrenor-challenge-v1`, `antrenor-mesajlar-v1`,
  `antrenor-profil-ayar-v1`) ve kalan 11 `sa-dadafit-*` sayfası → 4 genişlikte de taşma yok.
- **Konsol hatası: 20 panel sayfasının hiçbirinde yok** (4 genişlikte, toplam 80 yükleme).

**Not — taşma sayılmayan, ama kayda geçen davranış:** `sa-dadafit-egzersizler.html` (390'da 133
eleman), `sa-dadafit-programlar.html` (390'da 136), `sa-dadafit-challenge.html` (390'da 23),
`sa-dadafit-antrenorler.html` (390'da 69) ve `antrenor-program-builder-v1.html`
(`.bld-grid`, 390'da 234) dar ekranda içeriklerini konteyner içinde yatay kaydırıyor.
`scrollWidth == viewport` olduğu için sayfa-düzeyi taşma değildir; ancak `ptable` ailesinin dar
ekran davranışı yukarıdaki 3 gerçek taşmayla aynı kökten geliyor olabilir — birlikte bakılmalı.

### 9.3 Bu borcun diğer markalara bağı

Yukarıdaki 20 dosya **kendine ait bir kabuk taşımıyor**; paylaşılan yönetim altyapısını
kullanıyor. Dolayısıyla `ptable` kaynaklı taşma büyük olasılıkla DadaFit'e özgü değil —
düzeltme yapılacaksa aynı altyapıyı kullanan diğer bölümler de test edilmelidir.

| Paylaşılan kaynak | Satır | Toplam tüketici sayfa | Bunlardan DadaFit |
|---|---:|---:|---:|
| `v7-6cu356/assets/css/sa-shell.css` | 459 | 78 | 12 |
| `v7-6cu356/assets/js/sa-shell.js` | 343 | 77 | 12 |
| `v7-6cu356/assets/css/sa-ui.css` | 97 | 32 | 8 |
| `v7-6cu356/assets/js/sa-ui.js` | 135 | 33 | 8 |
| `v7-6cu356/assets/css/sa-list.css` | 6 | 32 | 5 |
| `v7-6cu356/assets/css/sa-gozetim.css` | 88 | 30 | 10 |
| `v7-6cu356/assets/js/sa-gozetim.js` | 57 | 18 | 8 |
| `v7-6cu356/assets/js/sa-chcnt.js` | 49 | 26 | 4 |

Aynı altyapıyı kullanan diğer aileler: Admin (28 sayfa) · DadaStore (15) · Sağlık & Diyet (11) ·
İşletmeler (11) · diyetisyen operatör paneli (6) · mekân operatör paneli (4).

### 9.4 Bu borç hakkında karar verilmemiş olanlar

1. **Bu 20 dosya Fit revizyon hattına dahil edilecek mi, ayrı bir "panel turu"na mı bırakılacak?**
   Şu anki varsayım: **kapsam dışı**, dokunulmayacak.
2. **Ölçülen 4 taşma vakası ne zaman düzeltilecek?** Fit turu bunlara dokunmayacağı için
   düzeltilmezse canlıda kalmaya devam edecek.
3. **Düzeltme yapılırsa kapsamı ne olacak?** `ptable` paylaşılan altyapıda olduğu için
   düzeltme yalnız DadaFit'te değil, 30–78 sayfada etkili olur; bu bir sweep işidir ve
   `tasks/lessons.md`'deki sweep kabul protokolüne (global negatif grep, idempotency md5,
   satır-delta backstop, çok aileden render doğrulaması) tabidir.
4. **Belge §10.3'ün antrenör panelinden istediği ama repoda olmayan alanlar** — takvim/randevu
   yönetimi, ödeme-komisyon-kazanç, raporlar, ön değerlendirme, görüşme notu/dosya paylaşımı —
   bu borcun içinde mi sayılacak, yoksa Fit revizyonunun Faz 4'üne mi girecek?
   Ölçüm: 8 panel sayfasında "Takvim", "Randevu", "Ödeme", "komisyon", "kazanç", "Rapor"
   kelimeleri **0 eşleşme**.
