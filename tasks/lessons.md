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
