# Kategori Haritası — KategoriEkle.xlsx → Mockup Eşlemesi

> Kaynak: `tasks/KategoriEkle.xlsx` (11 sheet, gerçek üretim kategorileri,
> 2025-08-23 damgalı seed verisi). Bu fazda UYGULAMA YOK (tek istisna:
> ansiklopedi — aşağıda). **Entegrasyon FAZ 4 işi.** Hazırlayan: team-lead,
> CİLA-2 Faz 3 (2026-06-13).

## Sheet → Sayfa/Modül Eşlemesi

| # | Sheet | Satır | Sitedeki hedef (mock verisi değişecek yer) | Not |
|---|---|---|---|---|
| 1 | **Tarif Kategori** (27) | Anadolu Mutfağı'ndan → Zeytinyağlı | `tarif-liste-v1` facet "Kategori" + `kategori-v1` hero/landing + anasayfa cat-track + mega menü Tarifler kolonu | Her satırda SEO başlık/açıklama/URL hazır — Laravel'de route+meta direkt buradan |
| 2 | **TarifTipleri** (14) | Vegan, Vejetaryen, Glutensiz/Glutenli, Laktozsuz, Süt/Yumurta İçermez, Şeker İlavesiz, Yüksek Lifli, Tam Tahıllı, Protein Ağırlıklı, Az Yağlı, Acılı, Baharatlı | `tarif-liste-v1` facet "Beslenme/Tip" çipleri + tarif-detay `.tbadge` rozetleri + tarif-ekle form tip seçimi | Rozet seti şu an mock 5-6 tip; gerçekte 14 |
| 3 | **Malzeme Kategorisi** (6) | Baklagiller, Sebzeler, Meyveler, Kırmızı Et, Beyaz Et, Balık Çeşitleri | `tarif-bulucu-v1` dolap rafları (`.raf-rack` akordeon grupları) | `TarifBulucudaGoster=1` bayrağı birebir bu sayfa için |
| 4 | **Ölçü Birimi Kategori** (75: 10 üst + 65 alt) | Üst: Bakliyatlar, Baharatlar, Hamur/Pastacılık, Kahvaltılık, Kuruyemiş/Tohum, Sıvı/Yağ/Salça, Sos/Hazır, Süt Ürünleri, Şeker/Tatlandırıcı, Un/Toz; altlarında malzemeler (Nohut, Karabiber, Kabartma Tozu...) | `olcu-birimleri-v1` malzeme seçici + tarif-detay `.conv-pop` çevirici + tarif-ekle `.ie-sugg` autocomplete havuzu | İki seviyeli (UstOlcuBirimiKategoriId) — mevcut tek seviyeli mock'tan farklı |
| 5 | **Ölçeklendirmeler** (6) | Su Bardağı (240ml), Çay Bardağı, Kahve Fincanı, Yemek/Tatlı/Çay Kaşığı | `olcu-birimleri-v1` çevrim tablosu + tarif-detay porsiyon ölçekleme | Markalı SVG ölçü seti (Faz 1) bu 6 birimle birebir örtüşüyor ✓ |
| 6 | **Mutfağa Giriş Kategori** (43: 7 ana + 36 alt) | Ana: Mutfak Temel Bilgileri, Kesme/Bıçak, Pişirme Teknikleri, Hazırlık/Ön İşlem, Baharat/Tatlandırma, Sunum/Tabaklama, Sık Yapılan Hatalar | `mutfaga-giris-v1` İA (konu kartları + one-page gnav) + `mutfaga-giris-detay-v1` içerikleri | Mevcut mock İA ana başlıkları yakın ama birebir değil — Faz 4'te bu 7+36 ile değiştirilecek |
| 7 | **Püf Noktaları Kategori** (8) | Nasıl Saklanır?, Ne İyi Gider?, Kaç Kalori?, Faydaları, Nasıl Kullanılır?, Nedir?, Mevsimi Ne Zaman?, Püf Noktaları, Mutfak Bilgileri | `puf-noktalari-v1` liste filtre çipleri + `puf-noktasi-detay-v1` kategori rozeti + `puf-noktasi-ekle-v1` kategori seçimi | Soru-formatlı kategori adları (SEO odaklı) — mock'taki konu-bazlı çiplerden farklı kurgu |
| 8 | **Sözlük Kategori** (19) | Baharatlar, Bakliyatlar, Balıklar, Çaylar, Çikolatalar, Domatesler, Etler, Kahveler, Kuruyemişler, Mantarlar, Meyveler, Otlar, Peynirler, Pirinçler, Sebzeler, Sirkeler, Tuzlar, Yağlar, Yumurtalar | `ansiklopedi-v1` Katman-1 kategori kartları (+ `sozluk-v1` korunan eski sayfa) | 🔴 TEK FAZ-3 İSTİSNASI: iki-katman İA bu fazda yapıldı — gerçek liste kanon'a iletildi (task #26), mock kategoriler değişecek |
| 9 | **Keşfet Kategori** (7) | Manzaralı, Tarihi, Butik, Aile Dostu, Romantik, Yerel Lezzet Noktaları, Vegan&Vejetaryen Mekânları | `mekan-liste-v1` facet "Konsept" + `kesfet-v1` mekan rayı çipleri | Mekan nitelik filtresi |
| 10 | **Keşfet Mekan Kategori** (6) | Mekanlar, Yerel Lezzetler, Sokak Lezzetleri, Gizli Keşifler, Konsept Mekanlar, Lezzet Rotaları | `kesfet-v1` ana sekme/bölüm yapısı (Mekânlar · Gurme Lezzetler · Etkinlikler konseptiyle eşlenecek) + `mekan-detay-v1` kategori rozeti | Keşfet İA'sı revize-2'de daraltılmıştı — Faz 4'te bu 6'lıyla yeniden hizalanacak (İA kararı gerekir) |
| 11 | **Mutfak Modları Kategori** (14) | Kadınlar Matinesi, Davet Sofraları, Aile Büyükleri, Sağlıklı Yaşam, Dizi/Film Akşamı, Maç Keyfi, Romantik Akşam, Aile Sofrası, Hızlı&Pratik, Misafir Geldi, Gece Atıştırmalığı, Kahve Yanı, Tek Başına Parti, Piknik Keyfi | `bugun-ne-pisirsem-v1` mod kartı rayı (mode-chip) | Mock'ta 8 genel mod var (Tüm/Günlük/Misafir/Hızlı/Sağlıklı/Çocuklu/Vejetaryen...); gerçek set 14 ve daha yaşam-anı odaklı. Hashtag'ler sosyal paylaşım için hazır |

## Faz 4 Entegrasyon Notları

1. **Veri zenginliği:** Tarif Kategori / TarifTipleri / Mutfağa Giriş / Püf /
   Sözlük sheet'lerinde SEO başlık+açıklama+anahtar kelime+URL alanları DOLU —
   Laravel seed'i bu Excel'den üretilebilir; mockup'taki "SEO meta bilinçli yok"
   borcunun (handoff Laravel listesi #8) veri kaynağı bu dosya.
2. **Yapısal farklar (İA kararı gerektirir):** BNP mod seti 8→14 (ray UX'i
   kalabalığı kaldırır mı?) · Püf kategorileri konu→soru formatına dönüyor ·
   Keşfet 6'lı kategori ↔ revize-2'nin 3'lü konsepti · Ölçü birimi iki seviye.
3. **Boş alanlar:** ResimUrl/IconUrl kolonları tümünde NULL/https:// stub —
   görseller ayrıca gelecek.

## Bilinen Sınırlamalar

- Eşleme masa-başı analizdir; Faz 4'te her sheet uygulanırken sayfa-bazlı İA
  teyidi gerekir (özellikle Keşfet ve BNP yapısal farkları).
- Excel'deki satır sayıları başlık satırı dahil okundu; yukarıdaki adetler
  başlık hariç net kayıt sayısıdır.
- Ölçü Birimi alt-malzeme listesi 65 satır — rapora ilk grupları örnekledim,
  tam liste Excel'de.
