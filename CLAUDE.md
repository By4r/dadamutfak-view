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

## Marka Renkleri (mevcut siteden — başlangıç paleti, revize edilebilir)

- Primary (sıcak domates): `#e14827`
- Koyu metin (slate): `#253D4E`
- Yeşil aksан (sağlıklı): `#3BB77E`
- Sarı (vurgu): `#fac045`

> Yeniden tasarımda palet sadeleştirilebilir/güncellenebilir — Beyar onayı ile.

## Teknik Stack

- **Bu faz saf frontend tasarım.** Teknik stack (Laravel mi, statik HTML mi,
  başka mı) kararı HENÜZ VERİLMEDİ. Önce arayüz dili ve sayfa tasarımları
  netleşecek, stack sonra konuşulacak.

## Referans Materyaller

- `drive-download-.../dada-mutfak-icerik/` — mevcut public site (70+ HTML)
- `drive-download-.../dada-mutfak-panel/` — mevcut admin panel viewları
- `dada-araştırma.docx` — 20 global rakip analizi + Türkiye fırsat analizi
- `dada-inceleme` — marka konumlandırma özeti
- `dada-mutfak-diyetisyen.docx` — diyetisyen modülü gereksinimleri
- `research.md` — bu dosyalardan çıkarılan yapı/modül envanteri + ilham siteleri
