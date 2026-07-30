# Mutfağa Giriş — Statik Önizleme

Bu klasör, DadaGastro'nun "Mutfağa Giriş" modülünün **statik bir önizleme
görüntüsüdür** — çalışan bir uygulama değildir. Sunucu (Laravel/DB) yoktur;
sayfalar tek seferlik anonim (misafir) tarama ile üretildi ve dondurulmuş
HTML/CSS/JS/görsel olarak burada duruyor.

- **Kaynak dal / commit:** `feature/mutfaga-giris` @ `a7176ba`
- **Yakalama tarihi:** 2026-07-30
- **Yayın URL'i:** `https://by4r.github.io/dadamutfak-view/gastro-mutfaga-giris/`

## Kapsam

44 sayfa: 4 üst düzey (hub, dersler, rota, sorun-çözme), 8 konu listesi,
17 yayınlanmış ders detayı, 15 uygulama modu sayfası.

**Kapsam dışı (bilinçli):**
- `becerilerim` — yalnız giriş yapmış kullanıcıya açık, misafir zaten göremiyor.
- İki Pro-katman dersin uygulama modu (`firin-ayarlari-ve-kek-karisimi`,
  `temel-soslar-ve-sos-kivamlandirma`) — misafir gerçek sitede de 302 ile
  engelleniyor, aynı sınır burada da geçerli.
- Taslak (draft) dersler — gerçek içerikleri yok, misafire zaten 404 dönüyor.
- `/admin`, tüm POST uçları, sitenin geri kalanı (tarifler, püf noktaları,
  giriş/hesap, vb.) — bu dump'ın parçası değil.

## Devre dışı bırakılanlar (sunucu gerektirdiği için)

Aşağıdakiler görünür ama işlevsiz — her biri "Bu statik önizlemede etkin
değil" ipucuyla işaretli, sayfa başında da tek bir bilgi şeridi var:

- Arama kutusu (üst çubuk + `sorun-cozme` yardım merkezi araması)
- `dersler` filtre formu
- Kaydet (kalp) düğmeleri, geri bildirim formu
- Uygulama modundaki ilerleme/tamamlama kaydı (not: misafir oturumunda bu
  istekler zaten uygulamanın kendi mantığı gereği hiç ateşlenmiyor — statik
  dump bunu ekstra bir katmanla güvence altına alıyor)
- Dil değiştirici (EN) ve site geneli diğer iç bağlantılar (tarifler,
  giriş/hesabım, pro, vb.) — statik karşılıkları yok, tıklanamaz durumda

**Çalışmaya devam edenler:** uygulama modu adım sayacı ve zamanlayıcı
tamamen istemci taraflı, çevrimdışı da çalışır; sekme geçişleri, akordeon,
lightbox gibi salt-JS davranışlar aynı şekilde çalışır.

## Dış kaynaklar

Görsellerin bir kısmı üçüncü taraf CDN'lerden gelir ve olduğu gibi
bırakıldı: `images.unsplash.com` (stok fotoğraf), `flagcdn.com` (dil bayrak
ikonları), `gaviaworks.com` (footer kredi bağlantısı).

## Yapı

Site yapısı birebir ayna: her sayfa kendi `index.html`'i, varlıklar
(`build/`, `fontawesome/`, `fonts/`, `img/`, `media/`, `reference/`,
`video/`) kaynak yoldaki gibi. `assets/preview-chrome.{css,js}` bu dump için
yazılmış tek yeni dosya çifti — mevcut token sistemini (tokens.css) kullanır.
