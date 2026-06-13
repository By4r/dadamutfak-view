# DadaMutfak — Lessons

> Hata birikim döngüsü: her ders bir kural olur, bir daha tekrarlanmaz.

## L1 — Eski template envanteri üretimden ÖNCE çıkarılır (2026-06-11, F1)

**Kural:** Her sayfa fazında üretimden ÖNCE eski template'in blok envanteri
çıkarılır, kıyas plan onayıyla birlikte sunulur. F2'den itibaren otomatik
uygulanır.

**Why:** F1 Tarif Detay'da üretim research dokümanlarına güvenilerek yapıldı;
eski `tarif-detay.html` (64 blok) ancak Beyar isteyince incelendi. Özellikler/
Mutfak satırı, sponsor entegrasyonu, Hatırlatma kutusu, kalori hesaplama
köprüsü gibi maddeler sonradan tek tek eklendi — Beyar her birini ayrı ayrı
istemek zorunda kaldı.

**How to apply:** Faz açılışında plan mode'dayken
`drive-download-.../dada-mutfak-icerik/` altındaki ilgili eski sayfaya Explore
agent gönder → numaralı blok envanteri → yeni tasarım kapsamıyla diff tablosu
(karşılanan / bilinçli atılan / karar gereken) → plan dosyasına koy, onayla
birlikte sun.

## CSS yorumunda `*/` içeren ifade yazılmaz (2026-06-12, mekan modülü)

**Kural:** CSS yorum bloklarının içine `lst-*/fct-*`, `rev-*/c-item` gibi
`*/` dizisi içeren glob/ifade YAZILMAZ — `*/` yorumu erken kapatır, kalan
metin bir sonraki `{...}` bloğunu (ilk kuralı) sessizce yutar. Ayraç olarak
`ve`, `+` veya boşluklu `* /` kullan.

**Why:** mekan-liste-v1 + mekan-detay-v1'de açıklama yorumundaki
"tarif-liste-v1 lst-*/fct-* facet kiti" ifadesi `.lst-top` kuralını yuttu —
hero koyu overlay'siz, beyaz üstüne beyaz başlıkla render oldu. Konsol hatası
YOK; sadece probe/SS'te yakalandı (CSSOM'da kuralın hiç olmadığı görüldü).

**How to apply:** Yeni sayfa CSS bloğu yazarken yorum içinde `*/` grep'i
(`grep -n '\*/[^ ]' <dosya>`); şüpheli render'da kuralın CSSOM'da varlığını
`document.styleSheets` üzerinden doğrula.

## Detay sayfasında site-içi tutarlılık dış referansı yener (2026-06-12, mekan-detay)

**Kural:** Yeni bir detay sayfası (mekan, ürün, diyetisyen, seri...) ÖNCE
tarif-detay'ın anatomisinden türetilir: `rd-gallery` (tek sahne + thumb şeridi
+ kc-card künye kolonu), `rd-sec-head` tipografisi, iki kolon ritmi, lightbox.
Zomato/Airbnb gibi dış referanslar ancak detay seviyesinde ilham verir;
sayfanın iskeletini BELİRLEMEZ.

**Why:** mekan-detay iki kez reddedildi — Tur 1 (künye + sağda sıkışık slider)
ve Tur 2 ilk deneme (Airbnb foto kolajı + scrollspy + kart-blok gövde). Beyar'ın
nihai teşhisi yerleşim detayı değil TUTARLILIKTI: "diğer detay sayfalarından
kopuk, parça parça kart gibi". Kabul edilen çözüm TD anatomisinin birebir
mirasıydı; iki tam üretim turu dış referans kovalamakla harcandı.

**How to apply:** Detay sayfası planlarken ilk soru "tarif-detay bunu nasıl
çözüyor?" — TD'de karşılığı olan her blok (galeri, künye, yorum, sekme, benzer
rayı) oradan VERBATIM alınır; dış referans yalnız TD'de karşılığı olmayan
boşluklar için tartışılır ve plan onayında ayrıca işaretlenir.

## Overlay/modal markup'ı page-main İÇİNE konmaz (2026-06-12, mekan-detay)

**Kural:** Lightbox, video modal gibi `position:fixed` tam ekran katmanların
markup'ı HER ZAMAN `</main>` SONRASINA konur (tarif-detay pattern'ı) —
`.page-main` içine konmaz.

**Why:** Shell'de footer-reveal için `.page-main{position:relative;z-index:2}`
var; bu bir stacking context açar. İçine konan lightbox `z-index:100` olsa bile
header'ın (z 60–70) ALTINDA kalır — mekan-detay'da kapat butonu tıklanamadı.
Konsol hatası yok; ancak Playwright click probe'u yakaladı ("header subtree
intercepts pointer events").

**How to apply:** Yeni overlay eklerken markup'ı `</main>` sonrasına yerleştir;
probe setine overlay'in üst köşe butonuna (kapat) gerçek tıklama dahil et —
görsel SS bu hatayı göstermez, yalnız tıklama yakalar.

## TR karakterli toplu replace'te `perl -CSD` kullanılmaz (2026-06-12, cila-2 faz 1)

**Kural:** UTF-8 Türkçe karakter içeren toplu metin değişiminde `perl -CSD -i -pe`
KULLANILMAZ — zaten-UTF-8 dosyayı ikinci kez encode edip sessiz mojibake üretir
("Şefin" → "Åefin"; Ş=C5 9E → C3 85 C2 9E). Saf byte mod kullan
(`perl -i -pe`, `-CSD`siz) ve sonucu `grep + hexdump -C` ile teyit et.

**Why:** "Dada Denedi"→"Şefin Tercihi" site-geneli temizliğinde ilk tur
`-CSD` ile koştu; konsol/HTML hatası YOK, sayfa çalışıyor — bozulma yalnız
hexdump/SS ile yakalandı. git checkout ile geri alınıp byte modla tekrarlandı.

**How to apply:** Toplu replace komutunda TR karakter varsa: (1) `-CSD` yok,
(2) değişim sonrası `grep -rl '<mojibake-imza>'` (örn. "Å") taraması,
(3) tek dosyada `grep -o '<yeni metin>' | hexdump -C` ile bayt teyidi.

## Paralel takım fazında ortak chrome değişikliği faz SONUNA ertelenir (2026-06-12, cila-2 faz 1)

**Kural:** Birden çok ajan aynı anda farklı dosya setlerinde çalışırken,
55+ sayfaya yayılan ortak chrome (header dropdown, footer, drawer) değişikliği
ÖNCE yalnız `_shell.html` + değişikliğin sahibinin dosyalarında yapılır;
site-geneli yayılım (idempotent script ile) TÜM ajanlar dosyalarını
kapattıktan sonra TEK seferde koşulur. Sweep sonrası shop gibi bilinçli
kabuk-sapması olan ailelere sızıntı grep'i zorunlu (hedef 0).

**Why:** CİLA-2 Faz 1'de dropdown rename + yeni modül öğesi 4 ajanın 70
dosyasına çakışacaktı; erteleme + faz sonu sweep (52 dosya) sıfır çakışmayla
kapandı. Sweep'te tek kaçak aktif sayfanın `href="#"` anchor varyantıydı
(sozluk-v1) — script'in insert anchor'ı href'e bağlıydı; "X olan ama Y
olmayan sayfa" negatif grep'i kaçağı yakaladı.

**How to apply:** Takım fazı planlarken ortak chrome işini "faz sonu sweep"
görevi olarak ayır; sweep script'i idempotent yaz; bitince (1) negatif grep
(`eski-öğe VAR ama yeni-öğe YOK`), (2) kabuk-sapması ailelere sızıntı grep'i,
(3) 4+ farklı aileden örnek sayfada render probe'u koş.

## İnceleme noktası sunarken "bilinen sınırlamalar" PEŞİNEN bildirilir (2026-06-12, cila-2 faz 2)

**Kural:** Beyar'a herhangi bir inceleme noktası sunulurken (link listesi, SS,
durum raporu, teslim mesajı) o anda ÇALIŞMAYAN, YARIM veya YANILTICI
görünebilecek her şey açıkça "henüz çalışmaz / kısmen çalışır / X'ten sonra
aktif olur" diye işaretlenir. Teşhisi sonradan açıklamak YETMEZ — Beyar'ın bir
şeyi deneyip boş bulması denetim hatasıdır. Tüm rapor ve teslimlerde
"Bilinen Sınırlamalar" bölümü ZORUNLUDUR.

**Why:** CİLA-2 Faz 2'de login-state önce _shell + 6 içerik dosyasına yazıldı,
68-sayfa yayılımı plan gereği faz-sonu sweep'e ertelendi. Lead bunu biliyordu
ama Beyar'a sunulan ara çıktılarında "anasayfa dahil diğer sayfalarda ?auth=1
henüz çalışmaz" notu düşülmedi; Beyar anasayfa-portal-v3a?auth=1'i deneyip
header'ı boş buldu, teşhis ancak sonradan açıklandı.

**How to apply:** (1) Her teslim/rapor şablonuna "Bilinen Sınırlamalar"
bölümü ekle — boşsa "yok" yaz, atlama. (2) Link/SS paylaşmadan önce kendine
sor: "Beyar bunun yanındaki/devamındaki neyi tıklar ve ne boş çıkar?" —
cevabı nota dönüştür. (3) Aşamalı yayılan değişikliklerde (sweep, faz-sonu
işler) kapsam listesi PEŞİNEN verilir: "şu N dosyada aktif, kalanı X sonrası".

## Region-swap'li sweep'te CSS hayatta-kalma denetimi zorunlu (2026-06-12, cila-2 faz 2)

**Kural:** Çok-dosyalı sweep script'i region-swap (anchor'dan anchor'a değiştir)
kullanıyorsa: (1) CSS eklemeleri INSERT olur, region-swap OLMAZ; (2) her swap
SPAN-GUARD taşır (beklenenden büyük eşleşme, örn. >3000 karakter → ABORT);
(3) sweep sonrası `git diff --numstat` denetimi zorunlu — NET NEGATİF dosya =
yutma şüphesi; (4) görsel render probe'u (SS + temel blok stilli mi) teslimin
ÖN ŞARTIDIR, lead denetimine veya Beyar'a bırakılmaz. DOM/state doğrulaması
(class var mı) CSS yutmasını YAKALAMAZ.

**Why:** Faz 2 login-state sweep'inde anasayfa-portal-v3a'nın CSS sıralaması
shell'den divergent çıktı; R1 region-swap'i iki anchor arasındaki ~308 satır
sayfa CSS'ini (hero, searchcard, chips, stats) sessizce yuttu. DOM probe'ları
geçti (is-auth/acct-wrap doğruydu), bozulmayı Beyar canlı incelemede ve lead'in
görsel/genişlik probe'u aynı anda yakaladı. Aynı turda R6 lg-gate region-swap'i
de detay sayfalarındaki overlay'leri silecekti (teslim öncesi yakalandı) — iki
vaka aynı dersin iki yüzü. Ayrıca kaçak tespiti dosya ADINA güvenince şaştı:
alisveris-listesi "shop" sanılıp atlandı; aile üyeliği marker grep'iyle
(lm-modal var mı?) belirlenir, adla değil.

**How to apply:** Sweep script şablonuna span-guard + CSS-INSERT kuralını koy;
sweep teslim checklist'i = idempotent re-run + negatif grep + sızıntı grep +
numstat (net-negatif 0) + silinen-CSS-selector grep'i (`git diff -U0 | grep
'^-.*{'` → bilinçli bölge dışı 0) + 2+ aileden görsel SS. Divergent bilinen
sayfalar (v3a, tarif-detay) script'e SOKULMAZ — kendi anchor'larıyla elle patch.

## Probe çıktısı inject klasörünün İÇİNE yazılmaz (2026-06-12, cila-2 faz 1)

**Kural:** iframe-tabanlı toplu probe'da probe HTML'i inject kopyaların
(`inj/`) klasörüne KONMAZ — relative `src='inj/'+sayfa` çift `inj/inj/` olur,
tüm iframe'ler 404 boş yüklenir ve her sayfa sahte-TEMİZ ölçülür. Probe
runner'ı inj'in BİR ÜSTÜNE koy ve detektörü bilinen-kirli bir sayfayla
sanity-check et (kasıtlı taşmalı dosya → probe onu yakalıyor mu?).

**Why:** Faz sonu 73 sayfalık 390px taramasının ilk turu bu yüzden tamamen
yanlış "hepsi temiz" verdi; ikinci turda yakalandı, sonuçlar yeniden üretildi.

**How to apply:** Toplu probe yazarken ilk iş sanity-check: 1 bilinen-kirli +
1 bilinen-temiz sayfayı koş, beklenen sonucu vermiyorsa probe'un kendisini
debug et; "0 bulgu" raporu ancak sanity-check'ten sonra güvenilirdir.

## 390 taşma probe'unda scrollWidth'e güvenilmez — element-rect ölç (2026-06-13, cila-2 faz 3)

**Kural:** Mobil yatay taşma denetiminde `document.scrollWidth` TEK BAŞINA
kullanılmaz — clipped taşma (overflow-x:hidden altında içerik taşar ama scroll
alanı uzamaz) scrollWidth'te GÖRÜNMEZ ve FALSE-PASS üretir. Doğru ölçüm:
tüm elementlerde `rect.right > viewport` taraması (+ rect.left < 0).

**Why:** sefler-v1 hero'su 390'da ~42px taşıyordu; uygula-b'nin scrollWidth
probe'u sayfayı "temiz" geçirdi, qa'nın element-rect probe'u yakaladı.

**How to apply:** Probe şablonlarında taşma dedektörü element-rect tabanlı
yazılır; scrollWidth yalnız hızlı ön-eleme. Sanity-check fixture'ına clipped
taşma örneği de eklenir (9999px değil, hidden-altı taşma).

## Public grid kolonları da HEP minmax(0,1fr) + türetmede referans-diff (2026-06-13, cila-2 faz 3)

**Kural:** Kılavuz §2e'deki GRID KURALI (kolonlar `minmax(0,1fr)`, `1fr`'nin
min-width:auto şişmesi) yalnız panel değil PUBLIC sayfalar için de geçerli —
özellikle `.lst-hero` ailesi. Yeni sayfa mevcut bir sayfadan türetilirken
`min-width:0` içeren satırlar atlanmaya çok müsait: türetme sonrası kaynak
sayfayla CSS diff'i zorunlu.

**Why:** sefler-v1, diyetisyen-dizin'den türetilirken `.lh-chips`'teki
`min-width:0` atlandı + `.lst-hero{1fr}` kaldı → uzun stat etiketleri 390'da
42px taşırdı. Kardeş sayfalar aynı 1fr'ye sahipti ama min-width:0'ları olduğu
için taşmıyordu — fark tek satırdı.

**How to apply:** (1) Yeni `.lst-hero`/grid sayfası türetilince
`grep -n 'min-width:0\|minmax(0' kaynak.html turev.html` diff'i; (2) kılavuz
§2e kuralını public'e de uygula; (3) 390 element-rect probe'u teslim şartı.

## Headless/iframe probe altyapı tuzakları — Chrome 149 sonrası (2026-06-13, cila-2 faz 3)

**Kural:** (1) Chrome 149 headless `--dump-dom`'u kaldırdı — dump-dom'a dayalı
eski probe script'leri 0 byte döndürür, Playwright'a geç. (2) Offscreen iframe
timer-throttle yer — iframe'i viewport içinde görünür tut, yoksa setTimeout'lu
öğeler (çerez 700ms) hiç tetiklenmez. (3) Uzun iframe'in alt bölgesinde
transition'lar settle olmaz — §3b çift-katman denetimi GEOMETRİ ile değil
CLASS-STATE ile ölçülür (çerez `.show` ⇒ nav `.bn-hidden` var mı).

**Why:** Faz 3 final süpürmesinde eski sweep.py CLI ölü çıktı; iframe-batch'e
geçişte iki tuzak sanity-check fixture'larıyla yakalandı (kirli fixture
çift-katmanı ancak class-state ölçümüyle stabil verdi).

**How to apply:** Probe runner şablonu: Playwright + görünür iframe + class-state
denetimi + (önceki ders) element-rect taşma + sanity-check (kirli+temiz) ön şart.

## Paralel takımda batch işi öncesi SAHİPLİK çapraz-grep'i (2026-06-13, cila-2 faz 3)

**Kural:** Bir teammate çok-dosyalı batch (örn. "tüm H1 sayfalarına nefes
patch'i") koşmadan önce hedef listesini ENVANTER tip-listesinden değil
SAHİPLİK matrisinden süzer — "tip listesi ≠ sahiplik listesi". Batch script'e
girmeden önce her hedef dosya kendi setiyle çapraz-grep'lenir.

**Why:** Kanon, H1 nefes batch'inde envanterindeki tüm H1 sayfalarını taradı;
mekan-liste SET B'deydi (uygula-b'nin) ama tip olarak H1 olduğu için batch'e
girdi → sahiplik ihlali (içerik doğruydu, fiili çakışma şans eseri olmadı).

**How to apply:** Batch öncesi: hedef listesi ∩ kendi-set listesi = hedef
listesi olmalı; fark çıkarsa lead'e sor. Lead nabız taramasında "değişen dosya
× sahip" çaprazını her turda koşar (bu fazda yakalanma yolu buydu).

## Agent team kurulumunda tasarım-kalite disiplini prompt'a gömülür (2026-06-12, cila-2 faz 3)

**Kural:** (1) Tasarım üretimi yapacak her teammate'in spawn prompt'una
"tasarım üretimi/redesign'da frontend-design skill ZORUNLU" satırı yazılır
(proje CLAUDE.md kuralı — prompt'a girmezse uygulanmıyor). (2) Lead kabulü
yapısal kanıtla (grep/numstat/konsol) yetinmez: SS'e TASARIM GÖZÜYLE bakılır
(bitişiklik, nefes, ritim, hizalama) ve değerlendirme yazılır.

**Why:** Faz 3'te lead, reklam-ver Yerleşimler bölümünü yapısal kanıtla kabul
etti; Beyar aynı sayfada hero başlığının menüye bitişik olduğunu (tasarım
sorunu) canlıda yakaladı: "kabul diyorsun, tasarımdan uzaksın olmaz." Skill
zorunluluğu da teammate prompt'larında eksikti, sonradan yayıldı.

**How to apply:** Takım kurulum şablonuna iki satır: teammate prompt'una skill
zorunluluğu + lead kabul checklist'ine "tasarım gözü değerlendirmesi yazıldı mı".

## Kategori/veri entegrasyonu = SADECE veri; tasarım dili korunur (2026-06-13, cila-2 faz 4)

**Kural:** Bir "kategori/mock veriyi gerçek veriyle değiştir" işi yapılırken
sayfanın LAYOUT/KURGU/TASARIM DİLİ'ne (kart stili, renk, tipografi, grid,
one-page/rail kurgusu) DOKUNULMAZ — yalnız metin/li/href/data-slug/chip etiketi
değişir. Tek istisna: veri **yapısal olarak zorunlu** kılıyorsa (örn. tek-seviye
mock → iki-seviyeli gerçek veri) yalnız o veriyi göstermek için gereken
**MİNİMUM** yapı eklenir; mevcut görsel dil yine korunur (sıfırdan yeni tasarım
DEĞİL). Onaylı sayfa = onaylı kabuk + gerçek veri. Her kategori sayfası iş
sonrası onaylı commit (`a463329`) ile diff'lenir: `git diff <onaylı> -- <sayfa>`
→ CSS-kural değişimi 0 (veri-zorunlu minimum hariç).

**Why:** Faz 4'te kategori entegrasyonunda iki sayfada sınır aşıldı: mutfaga-giris
onaylı yatay step-rail + gnav + konu kütüphanesi kurgusunu BOZDU (net -145 satır,
regresyon); olcu-birimleri iki-seviye veriyi (meşru) gösterirken 52 CSS kuralıyla
tasarım dilini de sıfırdan-akordeon'a çevirdi. İkisi de "veri işi" sanıldığı için
ilk turda görsel denetimden geçti; Beyar canlıda yakaladı. Lead'in
`git diff a463329` + CSS-kural/yapısal/veri sınıflandırması olcu'daki 52-CSS
sapmasını Beyar'dan önce yakaladı (sayaç tabanlı denetim işe yaradı).

**How to apply:** (1) Kategori/veri işi spawn prompt'una "SADECE veri, kurgu/
tasarım dili DOKUNULMAZ; veri-zorunlu minimum yapı istisnası" satırı gömülür.
(2) Lead her kategori sayfasını onaylı commit ile diff'ler ve CSS-kural sayısına
bakar (0 beklenir; >0 ise veri-zorunlu mu sapma mı incele). (3) Kabul SS'i
onaylı sürümle YAN YANA çekilir: "görsel dil tanınabilir aynı, sadece veri
zengin/derin" teyidi. (4) Sapma bulunursa onaylı commit'ten kabuk geri getirilir,
veri korunur.

## Cross-teammate marka-token (renk) koordinasyonu grep'le yakalanmaz (2026-06-13, cila-2 faz 5)

**Kural:** İki teammate AYNI marka varlığının (DadaAkademi gibi) farklı yüzlerini
bağımsız üretirse (biri topbar "kapı"sını, diğeri kabuğun iç aksanını), renk/token
SEÇİMLERİ grep'le tutarlı GÖRÜNÜP görselde ÇELİŞEBİLİR. Token TANIMI varlığı (her
ikisinde `--c-petrol` tanımlı) tutarlılık KANITI DEĞİLDİR — hangi tokenin BASKIN
kullanıldığı yalnız render SS'te görülür. Lead faz-sonu tasarım-gözü pass'inde
"aynı varlığın iki yüzü aynı kimliği mi taşıyor" diye bakar; çelişki marka kararı
olarak Beyar'a çıkar, sessizce kabul edilmez.

**Why:** Faz 5'te header DadaAkademi topbar kapısını PETROL yaptı (DadaStore=
domates'ten ayrışsın diye); akademi-kabuk ise kabuğu DOMATES aksanla kurdu
(mezuniyet-kepi + nav + hero + CTA = #E14827). Grep ikisinde de `--c-petrol:#006072`
gördü → "tutarlı" sandı. Render SS petrol-kapı→turuncu-kabuk tutarsızlığını
yakaladı. İki teammate çakışmadan farklı renk kararı vermişti; kimse yanlış
değildi, koordinasyon boşluğuydu.

**How to apply:** (1) Paralel takımda bir marka varlığının birden çok yüzü
farklı teammate'lere düşüyorsa (kapı↔kabuk, ikon↔başlık), spawn'da "X'in kimlik
rengi = <token>, sapma yok" diye SABİTLE. (2) Lead tasarım-gözü SS pass'inde
token-TANIMI değil BASKIN-KULLANIM kıyaslanır (logo/nav-active/hero/CTA rengi).
(3) Çelişki çıkarsa marka kararı Beyar'a; her iki teammate kendi yönünde tek-tur
fix opsiyonunu HAZIRLAR (uygulamaz), Beyar seçer.

## İdempotency script'in kendi sayacıyla DEĞİL, dış md5/numstat ile doğrulanır (2026-06-13, cila-2 faz 5)

**Kural:** Bir sweep script'inin idempotent olduğu, script'in kendi "toplam
dokunulan: N dosya" çıktısıyla DOĞRULANMAZ — sayaç çoğu zaman "zaten-var/skip"
NOT'larını da sayar (yazma olmasa bile). Kesin kanıt: gerçek re-run ÖNCESİ ve
SONRASI `git diff --numstat | md5` AYNI olmalı (0 fiili yazma). --dry modu da
yetmez (yazmadığı için re-run davranışını göstermez).

**Why:** Faz 5 konsolide chrome sweep'i 2. koşuda "toplam dokunulan: 58 dosya"
yazdı — alarm gibi göründü. İnceleme: counter `process()` not listesi boş
olmayınca artıyordu; "topbar-zaten/css-zaten/alisveris-zaten" skip-notları da
sayılıyordu, fiili yazma 0'dı. Gerçek re-run numstat md5'i birebir aynı çıktı →
idempotency sağlam, sayaç kozmetik. Sayaca güvenilseydi yanlış-pozitif "bozuk
idempotency" paniği olurdu.

**How to apply:** Sweep kabul checklist'ine "md5(numstat) before==after re-run"
maddesi koy; script'in self-counter'ına tanı amaçlı bak ama KABUL kanıtı olarak
kullanma. Counter'ı "değişen dosya" değil "dokunulan/incelenenmiş" diye yorumla.

## Paralel takımda SS altyapısı: MCP tek-instance kilidi → channel:chrome izolasyonu (2026-06-13, cila-2 faz 5)

**Kural:** Paylaşılan Playwright-MCP Chrome TEK instance'tır; bir teammate
kullanırken diğerleri "Browser is already in use" alır — faz boyunca SS kuyruğu
oluşur ve lead'in faz-sonu MCP SS turu da kilide takılır. Çözüm: teammate'ler
kendi SS'lerini İZOLE sistem-Chrome ile alır (`playwright channel:chrome` +
ayrı user-data-dir + kendi local server portu), MCP'yi serbest bırakır. Lead
faz-sonu render turunu, MCP kilitliyse, izole-Chrome'u olan bir teammate'e
KAPTIRIR (SS yakalar) ve görselleri KENDİ tasarım-gözüyle inceler — protokol
(lead design-eye) korunur, sadece capture devredilir.

**Why:** Faz 5'te 6 teammate + lead aynı MCP Chrome'a yarıştı; herkes "already
in use" aldı, pixel SS alınamadı (ek olarak headless fixed/blur paint sorunu).
defter `channel:chrome` izole instance + server 8848 ile gerçek-paint SS aldı
(11 dosya); lead faz-sonu render turunu (MCP yine kilitli) ona aldırdı, kendisi
inceledi — akademi renk bulgusu bu turda yakalandı.

**How to apply:** (1) Takım kurulumunda SS politikası: teammate self-check =
izole channel:chrome; MCP-SS lead faz-sonu için rezerve. (2) Lead MCP kilitliyse
capture'ı izole-altyapısı olan teammate'e devreder, görselleri kendi inceler
(design-eye lead'de kalır). (3) headless fixed/blur paint + fullPage stitch
artefaktları için channel:chrome (gerçek paint) tercih; bunlar canlıda yok,
"bulgu değil" diye işaretlenir.

## Sweep KABUL'ünde negatif grep SET-RÖLATİF değil GLOBAL koşulur (2026-06-13, faz5-revize)

**Kural:** Bir çok-dosyalı sweep'in "artık kalmadı" kabulü, script'in İŞLEDİĞİ
SET üzerinde değil, TÜM ENVANTER (`grep -rl ... mockups/*.html`) üzerinde
koşulur. Set-rölatif negatif grep (yalnız dokunulan N dosyada artık ara)
yapısal olarak FALSE-CLEAN üretir: bir sayfa anchor uyuşmazlığı yüzünden hedef
listesine HİÇ girmediyse, aynı pattern'le koşan negatif grep onu da hiç görmez.
Divergent KEŞFİ de hardcode-tahminle ({v3a, tarif-detay} gibi) değil GLOBAL
NEGATİF GREP ile yapılır: "eski-marker VAR ∧ yeni-marker (done sentinel) YOK"
= divergent/kaçak kümesi. Lead bu global grep'i teammate'ten BAĞIMSIZ koşar.

**Why:** faz5-revize duplicate-menü sweep'inde header-fix 56 sayfayı temiz
işledi, md5 idempotent, ve "negatif grep D2-kalan=[]" raporladı — KABUL gibi
göründü. Ama mutfaga-giris-v1 + olcu-birimleri-v1 "Dada Store" nav-item'ı
DIVERGENT'ti (`Dada Store <i chevron>` + 4-kategorili dropdown, hem desktop hem
drawer; Faz-4 'Store düz link' sweep'inde de kaçmışlardı — kronik divergence).
Kanonik D1 anchor uymadı → sayfa hedef listesine girmedi → set-rölatif negatif
grep de onları görmedi. Lead'in BAĞIMSIZ global grep'i (`grep -rl 'Dada
Akademi' ... ∧ drawer-world YOK`) tam bu 2'yi yakaladı. Set-içi temiz ≠ global
temiz. (Aynı 2 sayfa Faz-4 kategori entegrasyonunda da kaçmıştı = iki kez
aynı divergence.)

**How to apply:** (1) Sweep kabul checklist'ine GLOBAL negatif grep zorunlu:
"eski-marker taşıyan dosya = ∅ (bilinen meşru istisnalar hariç)" — script
sayacı/set-rölatif grep KABUL kanıtı değil. (2) Divergent küme GLOBAL grep'le
KEŞFEDİLİR (eski-VAR ∧ done-YOK), hardcode liste değil. (3) Lead bu grep'i
teammate'ten bağımsız koşar (false-clean'i kıran bağımsızlıktır). (4) Bir sayfa
kronik divergent çıkarsa (önceki fazlarda da kaçmış) flag'le — başka drift'ler
de taşıyor olabilir.

## position:sticky'yi öldüren overflow-x:hidden (site-geneli latent) — clip ile diril (2026-06-13, faz5-revize)

**Kural:** Shell/kök seviyede `html,body{overflow-x:hidden}` varsa, tarayıcı
`overflow-y`'yi `auto`'ya hesaplar ve BODY'yi scroll-container yapar →
`position:sticky` taşıyan tüm yan paneller (form süreç paneli, `.lst-side`
facet vb.) SESSİZCE yapışmaz (scroll'da viewport'tan kaçar). Konsol hatası YOK.
Çözüm: yatay taşma kesimi gerekiyorsa `overflow-x:hidden` yerine
`overflow-x:clip` kullan — clip yatayı keser ama scroll-container davranışı
üretmez, `overflow-y`'yi `visible` bırakır → sticky GERÇEKTEN çalışır.

**Why:** faz5-revize'de diyetisyen-ol + sef-ol "sağ panel sticky AMA çalışmıyor,
sayfanın alt %60'ında sağ kolon boş" sorununun gerçek kök nedeni buydu (panel
zaten `position:sticky`'ydi). Probe: panel scrollY=1400'de top=−508 (yapışsa
130). Page-local `overflow-x:clip` override ile top=130'a döndü, 390 taşma 0
korundu. Site-geneli latent: aynı bug shell'i kullanan başka sticky sayfaları
da etkiliyor.

**How to apply:** (1) "sticky çalışmıyor" şikayetinde ÖNCE kök/shell'de
`overflow-x:hidden` ara — `position:sticky`'nin görünür ata zincirinde
`overflow:hidden/auto/scroll` varsa sticky o ata içinde yapışır (viewport'a
değil). (2) Yatay taşma kesimi için `clip` tercih et (`hidden` scroll-container
yan etkisi yapar). (3) Sticky doğrulaması GÖRSEL değil PROBE ile: mid-scroll'da
`getBoundingClientRect().top` beklenen sticky-offset'e eşit mi. (4) Bir sayfada
bulunan shell-kaynaklı sticky bug'ı site-geneli FLAG'lenir (kapsam dışıysa
Beyar kararına çıkar, sessiz geçilmez).

## macOS iCloud/offload placeholder → cp 0-byte (kaynak dosya tuzağı) (2026-06-13, faz5-revize)

**Kural:** Masaüstü/Belgeler iCloud-offload'lu bir kaynaktan (PDF, asset) dosya
alırken: `ls -la` ve `wc -c` DOLU boyut gösterse bile (ikisi de stat-tabanlı
optimize edebilir, içeriği okumaz) dosya yerel olarak materyalize OLMAYABİLİR;
`cp` 0-byte üretir ya da indirmeye çalışırken ASILIR. `until [ -s dosya ]`
gibi bekleme döngüsüne GİRME — sonsuza kadar takılırsın.

**Why:** Bu turun açılışında `corporate-identity-guideline.pdf` masaüstünden
kopyalanırken her cp 0-byte verdi + arka planda asıldı; bir bekleme döngüsü
takıldı (Beyar kesti). Kaynak `~/Desktop/.../...pdf` iCloud placeholder'dı.
Çözüm: materyalize bir kopya (`~/Downloads/...`) verilince tek seferde tuttu
(8.8MB byte-birebir). Sonra PyMuPDF ile palet çıkarıldı.

**How to apply:** (1) Kopya sonrası DAİMA `wc -c` ile DEĞİL, gerçek içerik
teyidi yap — ama wc-c stat'tan okuyabileceği için en kesin kanıt: kopyayı bir
araçla AÇ (PyMuPDF `fitz.open`, `file`, render). (2) cp 0-byte/asılırsa kaynak
iCloud placeholder şüphesi: `brctl download` ya da Finder'da indir; materyalize
kopya iste. (3) ASLA `until [ -s ]` bekleme döngüsüne girme — max 1 deneme,
tutmazsa fallback'e geç (bu projede: bilinen kurumsal renklerle devam). (4)
Render aracı yoksa (`pdftoppm` yok) macOS'ta `qlmanage -t` kapak verir,
PyMuPDF (`fitz`) varsa keyfi sayfa + metin ekstraksiyonu yapar.

## Global grep'te eski-etiket ≠ drift; NAV-bağlamına daralt + beyaz-liste (2026-06-13, faz6)

**Kural:** Bir "kronik drift etiketi" (örn. "Çorbalar/Ana Yemekler/Tatlılar")
site-geneli grep'le aranırken, eşleşen her dosya drift DEĞİLDİR — aynı kelime
meşru içerikte geçebilir: prose tanımı (ansiklopedi/sözlük), `r-chip`/`puf-tag`
kategori rozeti, koleksiyon adı ("Ramazan Tatlıları"), reklam hedef metni. Drift
kabulü NAV-BAĞLAMINA daraltılır (dropdown/drawer Tarifler menüsü) ve kalan
global-grep eşleşmeleri bir BEYAZ-LİSTE ile teyit edilir ("bu N dosya meşru
içerik"). En ayırt edici drift imzası seçilir (burada "Ana Yemekler" = sadece
eski nav'da vardı, içerikte yok) → onun global=0 olması temiz kabul kanıtı.

**Why:** faz6 drift kabulünde `grep -rl 'Çorbalar|Tatlılar'` 10 dosya verdi;
2'si gerçek nav drift (mutfaga-giris, olcu), 8'i meşru içerikti (çikolata tanımı,
r-chip, Ramazan koleksiyonu, sözlük). Teammate'e "8 dosya beyaz-liste + Ana
Yemekler=0" kriteri verilmeseydi ya meşru içerik bozulurdu ya temiz iş drift
sanılırdı. "Ana Yemekler" tek-imza seçimi kabulü kesinleştirdi.

**How to apply:** (1) Drift sweep'inde grep terimini en ayırt edici/nav-özgü
etikete daralt. (2) Genel terim çok eşleşiyorsa kalanları beyaz-liste yap,
teammate'e "bu listeye dokunma" + "imza-etiket global=0" ver. (3) Kabul =
imza-etiket global 0 + beyaz-liste birebir + nav-bağlam grep'i 0.

## Probe disk-cache tuzağı: persistent channel:chrome → ?cb= cache-buster (2026-06-13, faz6)

**Kural:** İzole `channel:chrome` (persistent user-data-dir) ile koşulan sticky/
render probe'unda tarayıcı, dosya değişse bile DİSK CACHE'ten eski sürümü servis
edip false-BROKEN/false-CLEAN verebilir. Probe URL'ine `?cb=<artan>` cache-buster
ekle; aksi halde fix uygulanmış sayfa "hâlâ bozuk" görünür.

**Why:** faz6 sticky-clip probe'unda fix'li sayfa disk-cache yüzünden BROKEN
raporlandı; `?cb=` ile gerçek sürüm yüklenince 19/19 STICK-OK çıktı. (Lead MCP
turunda da aynı sebeple `?cb=1/2` kullanıldı.)

**How to apply:** Tekrar-koşulan tüm izole-Chrome probe'larına `?cb=` ekle;
"fix sonrası hâlâ bozuk" şüphesinde İLK kontrol cache-buster'dır.

## Lead doğrulama komutunun KENDİSİ buglıysa tüm karar zinciri çöker — zsh word-split (2026-06-13, hero-turu)

**Kural:** Agent-team lead'i teammate ilerlemesini nabızla doğrularken `for f in
$LIST; do ...; done` gibi **unquoted değişken iterasyonu KULLANMA** — Bash tool
zsh çalıştırır, **zsh unquoted parametre expansion'ı word-split ETMEZ** (bash eder).
Tüm liste tek `$f` olur, var olmayan dosya adı → her sayfa "değişmemiş" yanlış
okunur. Çok-dosya doğrulamada DAİMA birincil kanıt = `git diff --name-only` +
`git diff --numstat` (liste döndürür, iterasyona gerek yok). İterasyon şartsa
zsh-safe: `echo $LIST | tr ' ' '\n' | while read f; do ...; done` ya da `${(s: :)LIST}`.

**Why:** hero-turu'nda lead'in sade-sayfa sayacı (`for f in $SADE`) zsh'de tek
iterasyona düştü → her nabızda "0/23 yapıldı" yanlış verdi. hero-zengin aslında
20/23 üretmişti; lead kör sayaca güvenip "stall" sandı, agent'a shutdown gönderdi,
22 sayfalık işi 2 teammate'e DEVRETTİ → neredeyse çift-yazım/çakışma. `git diff
--numstat` (ayrı komut) 20 değişmiş sayfayı doğru gösteriyordu; erken esas alınsaydı
kriz olmazdı. Halt mesajları zamanında yetişti, hasar=0.

**How to apply:** (1) Sert karardan (agent kapatma, iş devri, geri-alma) ÖNCE DAİMA
`git diff --name-only` + `numstat` ile teyit; tek-satır sayaç loop'una GÜVENME.
(2) numstat ile teammate iddiası çelişirse numstat KAZANIR (git yalan söylemez,
shell-loop söyler). (3) Geri-alınması zor kararda "üç kez ölç bir kez kes":
name-only + numstat + bir dosyada içerik grep'i üçü uyuşmalı.

## Kanıtlı kabul = grep DEĞİL, lead GÖZÜ + render SS (2026-06-13, hero-turu)

**Kural:** Bir teammate "X sayfa bitti" dediğinde ve grep/numstat "imza var" dediğinde
bile, GÖRSEL bir iş (hero, layout, görsel yerleşim) ise lead MUTLAKA render alıp
GÖZÜYLE bakmalı. standalone chrome `--headless --screenshot` + Read ile PNG aç,
tasarımcı gözüyle denetle.

**Why:** hero-turu'nda tarif-liste-fix 2 wrapper sayfasına (alisveris-listesi/
siparislerim) hero reçetesini bastı; grep "bg-image VAR, h1 beyaz VAR" dedi (imza
geçti). AMA o sayfalarda `.X-top` section TÜM gövdeyi sarıyordu → render aldığımda
koyu hero görseli TÜM içeriğin arkasına bleed etmişti (kartlar koyu görsel üstünde
= bozuk). grep'e güvenip kabul etseydim 2 bozuk sayfa teslim edilirdi. Çözüm: wrapper
sayfa = hero band ayrı section (markup-split) ya da gövde-wrapper'ına açık zemin
(bg-band); reçete sadece hero-band-only sayfalarda güvenli.

**How to apply:** (1) Görsel iş kabulünde imza-grep YETMEZ; lead render+göz ZORUNLU.
(2) Section tüm gövdeyi mi sarıyor şüphesinde başlangıç-bitiş satır aralığına bak
(`grep -n 'class=.X-top|</section>'`) — 100+ satırlık section'a `background-size:cover`
= bleed riski. (3) Şablon/reçete uygularken "hero-band-only mu wrapper mı" ayrımını
ÖNCE yap; wrapper ise cerrahi gerekir, naive reçete bozar.

## fullPage SS taşma/bug bulgusu YANLIŞ-POZİTİF verebilir — viewport-only + DOM ile teyit (2026-06-14, mobil-qa)

**Kural:** `fullPage:true` screenshot ile "drawer'a içerik sızmış / overlay kapatmıyor /
band taşıyor" gibi bulgular YANLIŞ-POZİTİF olabilir. Bir bulguyu rapora kritik yazmadan
ÖNCE (1) viewport-only SS (`fullPage:false`) + (2) DOM/computed-style ölçümü ile teyit et.

**Why:** Mobil QA turunda bir tester `fullPage` SS'lerine bakıp 3 sayfada (hakkimizda/
akademi/reklam-ver) drawer'a "sayfa içeriği sızıyor 🔴/overlay kapatmıyor" dedi. Lead DOM
probe'u: `#drawer` z96 fixed, h=viewport, tam 3 düzgün child (head/nav/foot); `#drawerOverlay`
z95 opacity:1 tüm viewport'u kaplıyor. Gerçek: `position:fixed` drawer viewport yüksekliğinde,
ama `fullPage` SS tüm doküman boyunu dikine STITCH'liyor → fixed drawer'ın ALTINA sayfanın
geri kalanı ekleniyor = "içerik sızmış" sanrısı. 3 sahte 🔴 elendi. Aynı şekilde Ramazan
bandı: `.wrap{overflow:hidden}` yüzünden `docSW=390` (taşma YOK) ama içerik dikine sarıp
bandı şişiriyordu — ölçüm "temiz" derken görsel bozuktu (tersi yön: ölçüm temiz ama göz bozuk).

**How to apply:** (1) Sabit/overlay eleman (drawer, sticky, modal, fixed band) içeren
bulguda `fullPage` SS'e GÜVENME → viewport-only SS al. (2) "Taşıyor mu" sorusunda iki ölçü
birden bak: `documentElement.scrollWidth` (gerçek yatay taşma) VE elemanın görsel sarması
(`overflow:hidden` klipliyorsa docSW temiz çıkar ama görsel bozuk olabilir). (3) Şüpheli
bulguyu DOM computed-style (`position/zIndex/transform/children`) ile kanıtla, sonra raporla.
