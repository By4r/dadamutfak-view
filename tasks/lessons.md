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
