# DadaMutfak — Arayüz Yeniden Tasarımı

> Proje-spesifik kurallar. Global kurallar için `~/.claude/CLAUDE.md`.

## Proje

DadaMutfak'ın mevcut public web arayüzünün **sıfırdan yeniden tasarlanması**.
Marka: kullanıcı katkılı yemek tarifi topluluğu + diyetisyen modülü + mutfak
e-ticareti. Mevcut site fonksiyon olarak zengin ama görsel olarak eskimiş;
hedef sade, fonksiyonel, modern bir arayüze taşımak.

## Hedef

- **Sade** — gereksiz süs yok, içerik öne çıkar
- **Fonksiyonel** — tarif keşfi, "ne pişirsem", arama, planlama akıcı
- **Modern** — güncel tipografi, boşluk kullanımı, kart/grid dili

## Çalışma Döngüsü (SS Feedback Loop)

1. **CLAUDE.md + research.md** referans alınır (bu faz tamamlandı)
2. **frontend-design skill** ile arayüz üretilir — bu skill tasarım üretiminde
   aktif kullanılacak, generic AI estetiğinden kaçınmak için
3. Ekran görüntüsü alınır (Playwright MCP veya tarayıcı)
4. İncelenir → eksik/zayıf noktalar tespit edilir
5. İyileştirilir → tekrar SS → onaylanana kadar döngü
6. Her sayfa/komponent onaylanmadan bir sonrakine geçilmez

## Tasarım Üretim Kuralı

- **frontend-design skill ZORUNLU** — her yeni sayfa/komponent bu skill ile
- Plan onaylanmadan implement YOK
- Önce tasarım dili (renk, tipografi, spacing, komponent kütüphanesi)
  oturtulur; sonra sayfalar üretilir

## Görsel Kuralları

- **Boyut:** CSS render genişliği esas — 2x retina ÇARPMA YOK
- **Kare/oranlı görsel:** `<img>` tag DEĞİL → `div + background-image`
  + `background-size: cover` + `center` (Kerem Bey pattern'ı)
- Slider/banner overlay opacity: 0.3–0.4
- Bullet list reset override gerekebilir

## Görsel QA Kuralı (self-verify)

- Bir değişiklik sonrası kendi kontrolün için **TAM SAYFA** render screenshot al
  (1440, gerekiyorsa 390) ve **KENDİN** değerlendir — self-verify evet.
- **CROP YAPMA.** Tek bir öğeyi (badge, pill, buton, ikon) doğrulamak için
  crop/zoom render döngüsüne GİRME. Öğe full SS'te zaten görünür; emin olamıyorsan
  grep/kod ile teyit et.
- SS'ler `outputs/` altında diskte kalsın (ignore'lı). Beyar'a "şu SS'e bak" diye
  sunma; isterse kendisi açar.
- Çıktı: kısa **YAZILI** rapor (ne değişti + kontrol sonucu). Tek öğe için
  dakikalarca crop'la uğraşma.

## Bağlantı & Akış Bütünlüğü Denetimi (her değişiklikte zorunlu)

"Kendi eklediğim çalışıyor mu"nun ötesinde, her iş sonunda:
1. Dokunulan sayfanın TÜM giden bağlantı/CTA hedeflerini Playwright ile tıkla-doğrula: dead link
   (404), yanlış hedef, boş onclick / href="#" var mı?
2. Yeni bir CTA henüz var olmayan bir sayfaya/adıma gidiyorsa (faz bölme vb.), raporda AÇIKÇA yaz:
   "X CTA → Y, Y henüz yok, faz Z'de bağlanacak". Sessizce 404 bırakma.
3. Değişiklik mevcut bir akışı etkiliyorsa (ör. Üye Ol→checkout→dönüş), akışı uçtan uca Playwright ile
   yürüt; kopuk halka var mı raporla.
Etki alanı: dokunulan sayfa + ona bağlı bilinen akışlar (tüm siteyi taramaya gerek yok).

## Dersler (cross-page state & rota görseli)

- **localStorage `visited` ROUTE-SCOPED olmalı.** Ziyaret/checkpoint durumunu global mekan-adı anahtarıyla
  tutma (`visited{ad:true}`) — aynı mekan farklı güzergahta otomatik "ziyaret edildi" görünür (yanlış sızma).
  Doğru şema: `visited{routeId:{ad:true}}`; her güzergah kendi setini tutar, yeni güzergah 0 ziyaretle başlar.
  Rozet/defter gibi türev sayaçlar **unique** birleşimden beslensin (tüm route setlerinin birleşimi = FARKLI
  mekan sayısı). Cross-page güncellik: sayfa açılışında oku + `storage` event dinle. Format değişirse eski
  veriyi migrasyonla normalize et (reset+write-back).
- **Rota görselinde uç-marker (Kalkış/Varış) ara duraklardan GÖRSEL ayrılmalı.** Aynı pin/satır stilini
  kullanırsan kullanıcı uçları "durak" sanır (ör. 4 mekan + 2 uç → "6 durak" algısı). Çözüm: uçlar = sessiz
  *terminal* (uppercase rol etiketi + hollow nokta, numarasız; haritada küçük yuvarlak), ara duraklar =
  numaralı *istasyon* (1-N tomato rozet; haritada büyük teardrop) + "N mekan" sayaç. Palet-içi, sayım/veri
  mantığına dokunmadan, salt görsel hiyerarşi.

## Soru Sorma Kuralı

- Bana açık soru sorduğunda (ask_user_input widget ya da plan içi açık soru),
  her seçeneğe kendi gerekçeli önerini belirt — hangisini neden önerdiğini tek
  cümleyle yaz. Araştırma temelli hızlı karar vermemi sağlar.

## Marka Renkleri — KANONİK KAYNAK (yeniden tarama YOK)

> 🎯 **Resmi kurumsal palet bulundu ve dokümante edildi — bir daha dosya araması YAPMA.**
> - **Bağlayıcı:** `tasks/brand-tokens.md` (resmi kılavuz s.14/16'dan; UYUMSUZ renk listesi dahil)
> - **Renk çıkarımı:** `tasks/kurumsal-renk.md` (PDF s.17–18 ham ekstraksiyon)
> - **Birincil kaynak (PDF):** `brand/corporate-identity-guideline.pdf` (56 s.) · logo: `brand/logo.pdf`
> - Kural: **"Bu renklerin dışına kesinlikle çıkılmamalıdır."**
>
> **Kilitli set:** PRIMARY domates `#E14827` (7597 C) · DARK `#211E16` (Process Black,
> slate `#253D4E` DEĞİL) · CREAM `#EFE5D3` (P 15-1 C). **Alternatif** (ölçülü vurfu):
> mor `#b14fc5` · nane `#6cca98` · yeşil `#009d4f` · petrol `#006072`. Font: **Gilroy**.
> Sağlık aksanı `#3BB77E` (uyumlu). 🚫 Yasak (s.16): parlak pembe/magenta, parlak mor,
> saf/turuncu sarı (`#fac045` dahil — eski başlangıç paletinden DÜŞTÜ), fıstık/parlak yeşil, açık mavi/cyan.
>
> **Modül aksan haritası:** DadaStore=domates `#e14827` · DadaAkademi=petrol `#006072` ·
> Diyetisyen/sağlık=nane `#6cca98`+`#3BB77E` · **DadaFit=kurumsal yeşil `#009d4f`** (önerilen;
> palet-içi, diyetisyen nanesinden daha koyu/doygun → ayrışır). Detay/gerekçe: bu CLAUDE.md geçmişi.

## Teknik Stack

- **Bu faz saf frontend tasarım.** Teknik stack (Laravel mi, statik HTML mi,
  başka mı) kararı HENÜZ VERİLMEDİ. Önce arayüz dili ve sayfa tasarımları
  netleşecek, stack sonra konuşulacak.

## Deploy / Canlı (keşfe gerek YOK — kanonik)

- **Repo:** `By4r/dadamutfak-view` · branch **`main`** · **GitHub Pages AKTİF**
  (kaynak: **main / kök**, build: legacy Jekyll, HTTPS zorunlu, özel domain yok).
- **Site kökü:** https://by4r.github.io/dadamutfak-view/
- **Sayfa URL yapısı:** `https://by4r.github.io/dadamutfak-view/v7-6cu356/<dosya>.html`
  (tüm public sayfalar `v7-6cu356/` altında; iç linkler relative).
- **Örnekler:** portal → `.../v7-6cu356/anasayfa-portal-v3a.html` ·
  DadaMentor v3 → `.../v7-6cu356/dadamentor-v3.html` ·
  giriş → `.../v7-6cu356/sa-giris-v1.html`
- **Deploy = `git push origin main`** → Pages otomatik rebuild (~1-2 dk). Ayrı deploy script YOK.
- ⚠️ **`assets/video/*.mp4` gitignore'lı** → canlıda yüklenmez, yerine gradient fallback
  görünür (videolar Beyar'ın local/yedek asset'i, repoya girmez).

## Referans Materyaller

- `drive-download-.../dada-mutfak-icerik/` — mevcut public site (70+ HTML)
- `drive-download-.../dada-mutfak-panel/` — mevcut admin panel viewları
- `dada-araştırma.docx` — 20 global rakip analizi + Türkiye fırsat analizi
- `dada-inceleme` — marka konumlandırma özeti
- `dada-mutfak-diyetisyen.docx` — diyetisyen modülü gereksinimleri
- `research.md` — bu dosyalardan çıkarılan yapı/modül envanteri + ilham siteleri

## DadaFit Revizyon Kuralları — HER TURDA YÜRÜRLÜKTE

> Kaynak belge: `tasks/kaynak/fit-revizyon-dokumani.md` (672 satır, 20 bölüm) — bağlayıcı.
> Ölçüm verisi: `tasks/ENVANTER-fit.md` · Devir belgesi: `tasks/DURUM-fit.md`.
> **Bu bölüm her DadaFit turunda yürürlüktedir; tur başında okunur.**

### Değişmeyecek olan
- DadaFit taslak arayüzü **mevcut haliyle revize edilir**; sıfırdan ya da farklı bir
  tasarım diliyle yeniden oluşturulmaz. Logo, kurumsal yeşil sistemi, tipografi, kart
  yapısı, köşe/boşluk sistemi, üst Dada dünyaları navigasyonu, header/footer düzeni ve
  görsel karakter korunur. Revizyonun odağı: **menü gruplaması, merkez sayfalar,
  sayfalar arası bağlantı netliği, ziyaretçi/üye durum doğruluğu.**
- **Kurumsal yeşil `#009d4f` repoda `--tomato` adlı değişkende tutulur.** Ad yanıltıcıdır
  (sitenin diğer 97 dosyasında aynı ad kırmızıyı gösterir) ama **yeni değişken üretilmez**;
  mevcut 63 değerlik ortak çekirdek kullanılır.
- Ekosistem üst barı `bs-` önekli sınıf ailesiyle kurulur; DadaFit sayfasında
  `bs-fit is-active` ile işaretlenir. **Bu yapı korunur.**
- **Yeni bileşen / sınıf ailesi / değişken üretilmez.** Gereken tablo, liste, sekme, form,
  rozet, grafik ve boş durum yapısı önce mevcut sayfalarda aranır; hiçbirinde karşılığı
  yoksa ilkel parçalardan kurulur ve raporda ayrıca yazılır.
- Aynı işlev için farklı sayfada farklı terim kullanılmaz — **belgenin §16 terim standardı
  esastır** (Hareket · Egzersiz Kütüphanesi · Hareket Rehberi · Programlar · Fit Planım ·
  Enerji Defteri · Enerji Köprüsü · Bana Uygun Başlangıcı Bul).
- Navigasyon sadeleşirken mevcut sayfalara erişim kaybolmaz: **her eski ana menü öğesine
  en fazla iki tıklamayla ulaşılır.**
- Ton: **baskı değil denge.** Kaçırılan günde suçluluk dili yok.

### Her faz sonunda zorunlu denetim
- Sayfalar **1440 / 1024 / 768 / 390** genişlikte açılır. Yatay taşma, konsol hatası,
  boş hedefli bağlantı, kırık hedef **bırakılmaz**.
- **Banner yüksekliği ekran yüksekliğinin yarısını geçmez.**
  ⚠ **İSTİSNA — ana sayfa (`dadafit-hub-v1.html`):** hero'su bilerek TAM EKRAN'dır (oran 1,00).
  Kapsam `body[data-fit-hero="1"]`; kurulum `assets/css/fit-shell.css` → "ANA SAYFA HERO'SU
  TAM EKRAN" bloğu. Gerekçe ve teknik detay: `tasks/HANDOFF-fit.md` §5.5.1.
  **Ölçümde 1,00 görünce ihlal sanıp geri alma.** Diğer 33 sayfada kural aynen yürürlükte.
- Mobilde **sabit arkaplan (background-attachment:fixed) kullanılmaz**; hareket azaltma
  tercihinde de kapatılır.
- Dar kolonda **iki yana yaslama (text-align:justify) yok.**
- Kart ızgarasında **yarım satır bırakılmaz.**
- Banner üst boşluğu **sabit header yüksekliğini karşılar.**
- Ayrı konu ayrı commit; dosyalar **tek tek isimle** stage edilir (`git add -A` YOK),
  her commit öncesi staged liste doğrulanır.

### Yayın disiplini
- **Yalnız site dosyaları commit edilir.** Plan/rapor/ölçüm/devir belgeleri diskte kalır,
  git'e girmez — deponun uzak kaynağı herkese açıktır ve envanter turunda 205 iç belgenin
  canlıda erişilebilir olduğu ölçülmüştür (ayrı turda kapatılacak borç, büyütülmez).
- `tasks/DURUM-fit.md` her faz sonunda güncellenir: ne yapıldı, hangi karar neden verildi,
  hangi borç açıldı, zorunlu üretilen sınıf adları, bakılacak adresler. Konuşmaya referans
  verilmez; tarih ve sayılar mutlak yazılır.
