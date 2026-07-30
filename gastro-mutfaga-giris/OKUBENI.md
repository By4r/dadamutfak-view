# Mutfağa Giriş — Statik Önizleme

Bu klasör, DadaGastro'nun "Mutfağa Giriş" modülünün **statik bir önizleme
görüntüsüdür** — çalışan bir uygulama değildir. Sunucu (Laravel/DB) yoktur;
sayfalar tek seferlik anonim (misafir) tarama ile üretildi ve dondurulmuş
HTML/CSS/JS/görsel olarak burada duruyor.

- **Kaynak dal / commit:** `feature/mutfaga-giris` @ `25dd20f`
- **Yakalama tarihi:** 2026-07-30 (24 maddelik revizyon turu sonrası yenilendi;
  önceki döküm `a7176ba`'daydı)
- **Yayın URL'i:** `https://by4r.github.io/dadamutfak-view/gastro-mutfaga-giris/`

## Kapsam

44 sayfa: 4 üst düzey (hub, dersler, rota, sorun-çözme), 8 konu listesi,
17 yayınlanmış ders detayı, 15 uygulama modu sayfası.

**Kapsam dışı (bilinçli):**
- `becerilerim` — yalnız giriş yapmış kullanıcıya açık, misafir zaten göremiyor.
- İki Pro-katman dersin uygulama modu (`firin-ayarlari-ve-kek-karisimi`,
  `temel-soslar-ve-sos-kivamlandirma`) — misafir gerçek sitede de 302 ile
  engelleniyor, aynı sınır burada da geçerli. Ders DETAYI kapsam İÇİNDE —
  `temel-soslar-ve-sos-kivamlandirma` artık maskeli müfredat iskeleti
  gösteriyor: bölüm başlığı + adım sayısı + süre görünür, adım başlıkları
  "Adım N · Kilitli" ile maskeli (gerçek adım başlığı/gövdesi hiç basılmaz).
- Taslak (draft) dersler — gerçek içerikleri yok, misafire zaten 404 dönüyor.
- `/admin`, tüm POST uçları, sitenin geri kalanı (tarifler, püf noktaları,
  giriş/hesap, vb.) — bu dump'ın parçası değil.

## Bu turda değişenler (revizyon turu)

- Ana sayfa section arkaplanları dönüşümlü (flow-white/flow-cream), konu
  kartları satranç dizilimi (breakpoint başına farklı `:nth-child` formülü).
- Ders detayında "Adım Adım Teknik" artık müfredat akordeonu — bölüm/adım
  aç-kapa tamamen istemci taraflı, sunucuya gitmez, çalışır durumda.
- Etiket + paylaş tek satırda (`.ptr`); paylaş popover'ındaki Twitter/
  WhatsApp/e-posta bağlantıları ve "bağlantıyı kopyala" düğmesi bu dökümün
  gerçek yayın adresine işaret edecek şekilde yeniden yazıldı (bunlar salt
  istemci taraflı olduğu için devre dışı bırakılmadı, düzeltildi).
- Yorum (yorumlar) bölümü eklendi. **Yorum formu yalnız giriş yapmış üyeye
  görünür** (`@auth`/`@guest` dalı) — döküm misafir taramasıyla üretildiği
  için form burada hiç yok; bu bir eksiklik değil, gerçek sitenin de misafire
  gösterdiği şey. Var olan yorumlarda "Beğen" düğmesi misafire de görünür
  olabilir — böyle bir durumda düğme devre dışı bırakılır.

## Devre dışı bırakılanlar (sunucu gerektirdiği için)

Aşağıdakiler görünür ama işlevsiz — her biri "Bu statik önizlemede etkin
değil" ipucuyla işaretli, sayfa başında da tek bir bilgi şeridi var:

- Arama kutusu (üst çubuk + `sorun-cozme` yardım merkezi araması)
- `dersler` filtre formu
- Kaydet (kalp) düğmeleri, geri bildirim formu, yorum "Beğen" düğmesi (varsa)
- Uygulama modundaki ilerleme/tamamlama kaydı (not: misafir oturumunda bu
  istekler zaten uygulamanın kendi mantığı gereği hiç ateşlenmiyor — statik
  dump bunu ekstra bir katmanla güvence altına alıyor)
- Dil değiştirici (EN) ve site geneli diğer iç bağlantılar (tarifler,
  giriş/hesabım, pro, vb.) — statik karşılıkları yok, tıklanamaz durumda

**Çalışmaya devam edenler:** uygulama modu adım sayacı ve zamanlayıcı,
müfredat akordeonu (bölüm/adım aç-kapa + "tümünü genişlet"), etiket rayı
kaydırma, paylaş popover'ı ve bağlantı kopyalama — tamamı istemci taraflı,
çevrimdışı da çalışır.

## Dış kaynaklar

Görsellerin bir kısmı üçüncü taraf CDN'lerden gelir ve olduğu gibi
bırakıldı: `images.unsplash.com` (stok fotoğraf), `flagcdn.com` (dil bayrak
ikonları), `gaviaworks.com` (footer kredi bağlantısı).

## Yapı

Site yapısı birebir ayna: her sayfa kendi `index.html`'i, varlıklar
(`build/`, `fontawesome/`, `fonts/`, `img/`, `media/`, `reference/`,
`video/`) kaynak yoldaki gibi. `assets/preview-chrome.{css,js}` bu dump için
yazılmış tek yeni dosya çifti — mevcut token sistemini kullanır.
