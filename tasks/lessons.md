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
