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

## Referans Materyaller

- `drive-download-.../dada-mutfak-icerik/` — mevcut public site (70+ HTML)
- `drive-download-.../dada-mutfak-panel/` — mevcut admin panel viewları
- `dada-araştırma.docx` — 20 global rakip analizi + Türkiye fırsat analizi
- `dada-inceleme` — marka konumlandırma özeti
- `dada-mutfak-diyetisyen.docx` — diyetisyen modülü gereksinimleri
- `research.md` — bu dosyalardan çıkarılan yapı/modül envanteri + ilham siteleri
