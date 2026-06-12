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
