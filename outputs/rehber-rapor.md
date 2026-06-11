# Rehber Raporu — Dalga 3 · Mutfak Sırları Ailesi (F11) + Dada Akademi

> Teammate: rehber · 6 sayfa · COMMIT YOK
> Üretim: `_shell.html` kopyası + kılavuz §2b/§2c mirası; frontend-design skill ile.
> Lokal: `python3 -m http.server 8772` (proje kökü) · SS: `mockups/.ss-scratch/rehber-*.png`

---

## 0. Özet durum

| Sayfa | Durum | SS (1440 / 500) | Ek SS |
|---|---|---|---|
| `mockups/mutfak-sirlari-v1.html` (HUB) | ✅ | `rehber-sirlari-1440.png` / `rehber-sirlari-500.png` | — |
| `mockups/puf-noktalari-v1.html` | ✅ | `rehber-puf-1440.png` / `rehber-puf-500.png` | `rehber-puf-detay-1440.png`, `rehber-puf-detay-500.png` (?detay=1) |
| `mockups/mutfaga-giris-v1.html` | ✅ | `rehber-giris-1440.png` / `rehber-giris-500.png` | — |
| `mockups/sozluk-v1.html` | ✅ | `rehber-sozluk-1440.png` / `rehber-sozluk-500.png` | derin link: `?harf=B`, `?terim=julyen` |
| `mockups/olcu-birimleri-v1.html` | ✅ | `rehber-olcu-1440.png` / `rehber-olcu-500.png` | — |
| `mockups/akademi-v1.html` | ✅ | `rehber-akademi-1440.png` / `rehber-akademi-500.png` | `rehber-akademi-sent-1440.png`, `rehber-akademi-sent-500.png` (?sent=1) |

- **Konsol:** 8 görünüm (6 sayfa + puf ?detay=1 + akademi ?sent=1) headless dump — **0 sayfa JS hatası** (yalnız Chrome iç process gürültüsü).
- **390 taşmazlık:** `_host390.html` iframe probe ile 7 görünümde `scrollWidth=390` → **taşma SIFIR**.
- Nav aktif durumu: 5 sayfada "Mutfak Sırları", akademi'de "Dada Akademi" aktif (chrome'a tek dokunuş bu state; mega menü ve link seti VERBATIM korunur).

---

## 1. L1 KIYAS — eski template envanteri → modern karşılık

### 1a. `puf-noktalari.html` + `puf-noktalari-detay.html` → `puf-noktalari-v1.html`

**Eski LİSTE blok envanteri** (5.454 satır):
1. `page-header video-bg` — video arka planlı sayfa başlığı + h1 "Püf Noktalar" + breadcrumb + tags-list
2. `dada-filter` barı — sayfa başına adet (20/30/40/50) + sıralama (En Son Eklenen / En Çok Yorum Alan)
3. Kategori tabları (`tab-link` ×7): Tümü / Ne İyi Gider / Nasıl Saklanır / … / Giriş
4. **99 kart** grid (`product-cart-wrap`): görsel + `recipe-info-tag` kategori + h2 başlık (lorem)
5. **8 yatay reklam bandı** (`ad-container horizontal`) grid aralarına serpilmiş
6. Sayfalama (`page-item` ×7)

**Eski DETAY blok envanteri** (2.263 satır):
1. Başlık + breadcrumb + kapak görseli + kategori tag
2. **"Şimdi Dinle"** text-to-speech çubuğu (hız kontrolü)
3. Sosyal paylaşım ikonları (twitter/whatsapp/telegram/pinterest/email)
4. Lorem makale gövdesi + **"Okuyucunun Dikkatine"** uyarı kutusu
5. **Yorum sistemi** (form + cevapla/bildir/düzenle/sil aksiyonlu liste)
6. "İlginizi Çekebilir" ilgili kartlar + `sub-blog-item` yan öneriler
7. Reklam alanları

**Ne taşındı:** liste+detay ikilisi (tek dosyada `?detay=1` toggle, kesfet deseni VERBATIM) · kategori tabları → `ke-filter` chip'leri (8 gerçek kategori; **CANLI filtre** — eski tablar statikti) · sıralama → `disc-tabs` (En Yeni / En Çok Okunan; eski "En Çok Yorum Alan"ın karşılığı kart altı `puf-reads` okunma sayacıyla desteklendi) · sayfalama → `.pagi` · breadcrumb → `rd-crumb` · "Okuyucunun Dikkatine" → `art-tip` kutusu (başlık birebir korundu, eski site DNA'sı) · sosyal paylaşım → `art-share` rayı · "İlginizi Çekebilir" → **iki ray**: r-card'lı "Bu püfün geçtiği tarifler" (m. tarif köprüsü, brief isteği) + `pufl-grid` "Bunlar da işine yarar".

**Ne atıldı:** 8 reklam bandı (m29 patron kararı bekliyor — Dalga 2 kararıyla tutarlı) · sayfa-başına-adet seçici (mock'ta anlamsız; sayfalama notu karşılıyor) · video arka planlı sayfa başlığı (lst-hero koyu-overlay landing atası bunu modernize eder) · **"Şimdi Dinle" TTS** (aşağıda açık soru) · **yorum sistemi** (aşağıda karar).

**Ne modernize edildi:** 99 lorem kart → 12 GERÇEK içerikli püf kartı (mutfak-defteri `.puf-card` açık zemin VERBATIM; maskeli görsel + ikon + kategori tag + okunma) · lorem makale → ~600 kelimelik gerçek uzun-form içerik ("Pirinç pilavı nasıl tane tane olur?"): `art-lead` + 3 numaralı bölüm + `art-fig` görsel + `art-quote` şef alıntısı + sık yapılan hatalar + etiketler. Hero'da istatistik şeridi (215 püf / 8 kategori / 1,2M okunma) eklendi. Boş durum (§3 deseni) + filtre temizleme eklendi (eskide yoktu).

### 1b. `mutfaga-giris.html` + `mutfaga-giris-detay.html` → `mutfaga-giris-v1.html`

**Eski LİSTE envanteri** (2.098 satır):
1. `page-header video-bg` + h1 + breadcrumb
2. Yatay kategori menüsü (`category_menu`, "Tümü" + scroll)
3. "Temel Pişirme Teknikleri" başlıklı **2 section** (`section-title title-icon`)
4. **20 video kartı** (`play-btn pulse` — hepsi videolu içerik) + 4'lü carousel
5. Sort tabları + reklamlar

**Eski DETAY envanteri** (2.041 satır): puf-detay ile AYNI şablon (Şimdi Dinle + yorumlar + İlginizi Çekebilir'de play-btn'li video kartları).

**Ne taşındı:** "Temel Pişirme Teknikleri" section kurgusu → iki katman: koyu `guide` bandında **"6 adımda mutfağın temeli" rotası** (v3a steps-grid VERBATIM; haşlama/sote/fırın/hamur brief'teki teknikleri kapsar) + krem zeminde **konu kartları** (disc-card; eski play-btn video vurgusu `m-types` "N video" rozetiyle yaşıyor) · kategori menüsü → hero `lh-chips` (Temel Teknikler / Araç-Gereç / Güvenlik) · video sayısı/süre meta'ları kart altında.

**Ne atıldı:** reklamlar · carousel (grid + mobil snap aynı işi görür) · ayrı detay sayfası (aşağıda karar).

**Ne modernize edildi / YENİ:** ① **seviye rozetleri** (brief isteği; eskide yok): `.lvl` ailesi — disc-badge türevi; Başlangıç=soft beyaz, Orta=domates, İleri=koyu slate (renk kuralı korunur, yeşil kullanılmadı) + Tümü/Başlangıç/Orta/İleri CANLI chip filtresi. ② **seo-intro uzun-form giriş** ("Mutfağa nereden başlamalı?" — seo-landing `.seo-prose` VERBATIM, gerçek içerik; eski lorem'in yerine içerik sayfası dili) + `seo-aside` "İlk gün çantası" hızlı kutusu. ③ Sayfa sonunda rehber ailesi köprü şeridi (`.next-card` ×3 — token dili).

### 1c. `sozluk.html` + `sozluk-harf-secili.html` + `sozluk-kategori.html` + `sozluk-detay.html` → TEK sayfa `sozluk-v1.html`

**Eski 4 sayfa envanteri:**
1. **sozluk** (1.844 satır): video-bg başlık · **32 harflik** `letter` barı (A–Z + Ç/Ğ/İ/Ö/Ş/Ü + Q/W/X) · 30 görselli terim kartı (`dictionary-top-text`) · sayfalama · reklam
2. **sozluk-harf-secili** (1.183): aynı bar, seçili harf + 6 kart
3. **sozluk-kategori** (2.220): kategori açıklama paragrafı (`single-excerpt`) + 45 kart
4. **sozluk-detay** (1.243): makale + Şimdi Dinle + sosyal paylaşım + sticky yan sütun + İlginizi Çekebilir slider

**KARAR — 4 eski sayfa → 1 modern sayfa.** Gerekçe: dört sayfa da aynı listenin farklı kesitleri; modern UX'te bunlar URL parametreli tek görünümdür.
- harf seçimi → `.az-bar` filtresi (YENİ bileşen, token dili; **TR alfabesi 29 harf** + içeriği olmayan harf `disabled` — eski 32 harflik setteki Q/W/X düşürüldü çünkü TR mutfak teriminde karşılığı yok, disabled mantığı zaten genel çözüm; derin link `?harf=B`)
- kategori sayfası → `ke-filter` chip'leri (5 kategori; kategori açıklama paragrafı atıldı — chip + lead yeterli)
- detay sayfası → **satır-içi açılım** (accordion; tek seferde bir terim açık, `?terim=julyen` derin link). Ayrı sayfa yerine satır-içi seçtim: terim tanımı 1-2 paragraf — tam sayfa makale ağırlığını taşımıyor; sözlükte "bak-kapat-devam et" akışı hâkim. Uzun anlatım gereken terimler için açılımda püf/tarif köprüsü var.
- arama → canlı arama kutusu (eskide hiç yoktu)

**Ne taşındı:** harf navigasyonu (32→29+disabled) · terim+kategori+detay üçlüsü · "İlginizi Çekebilir" → açılım içi "İlgili tarif" + "Püf Noktaları'nda ara" köprüleri.
**Ne atıldı:** terim görselleri (kart→satır tipi; görsel sözlükte gürültüydü — besin-kutuphanesi `food-row` satır akrabalığı izlendi) · sayfalama (filtre+arama varken gereksiz; "toplam 480 terim" sayacı bağlamı koruyor) · reklam · Şimdi Dinle.
**Modern/YENİ:** 19 GERÇEK terim (benmari→zeste; tanım + örnek kullanım cümlesi + ilgili tarif) · canlı sayaç · boş durum (§3) · **"Terim Öner"** bandı (görüş bildir modalına bağlı — topluluk katkısı marka DNA'sı).

### 1d. `olcu-birimleri.html` → `olcu-birimleri-v1.html`

**Eski envanter** (1.280 satır):
1. `page-header video-bg` + h1 + breadcrumb
2. **Kategori akordeonları** (`accordionn` + `panel-header`: Bakliyatlar, Baharatlar…)
3. Statik tablo: malzeme × (1 Su Bardağı / 1 Yemek Kaşığı / 1 Tatlı Kaşığı / 1 Çay Kaşığı) gram — satırlar tekrar eden mock veriydi (Bulgur/Pirinç ×3)
4. `open-img-btn` — ölçü kabı görseli açma butonları

**Ne taşındı:** kategori → tablo kurgusu birebir korundu, akordeon yerine `disc-tabs` sekmeleri (5 kategori ×6-8 GERÇEK satır; eski 4 ölçü kolonu aynen) · ölçü kabı görselleri yerine `seo-aside` "Standart kaplar" bilgi kutusu (1 su bardağı=200 ml…).
**Ne atıldı:** akordeon (sekme tek bakışta kategori setini gösterir) · open-img-btn görsel popup'ı.
**YENİ (eskide hiç yok):** ① **Pratik Dönüştürücü** — fk-* kiti (tarif-ekle VERBATIM) malzeme+birim+miktar → CANLI gram sonucu (`.ob-res` sonuç kutusu, hesaplayıcı res-box iskeletinin domates uyarlaması) + diğer birim eşdeğerleri TD `.conv-pop .cp-row` dilinde (popover içeriği sayfa bileşenine açıldı — conv-pop ailesi akrabalığı). ② **Fırın sıcaklık tablosu** (statik/fanlı/gaz kademesi + tipik kullanım + ısı renk noktaları) + fırın ipuçları yan kutusu. ③ Tablolarda `tbl-scroll` (mobilde iç scroll, sayfa taşması sıfır).

### 1e. `akademi-v1.html` — eski karşılığı YOK

Brief gereği sıfırdan, miras dille: `lst-hero` koyu-overlay landing varyantı + `.soon-big` YAKINDA rozeti (shell `.soon` yeşilinin hero boyu türevi — yeşil burada "yakında" semantiği, shell mirası) · 4 vaat kartı (`.ak-card`, token dili) + her kartta `.soon` · 3 adımlı "nasıl işleyecek" şeridi · **fk-* kayıt-ilgi formu** (ad+e-posta+ilgi alanı select+KVKK `fb-kvkk`+gönder) → `?sent=1` teşekkür (shell `fb-success` dili, pushState'li) · `seo-quick` "erken kayıt avantajları" yan kutusu.

---

## 2. Bileşen kararları (yeniden icat edilenler + gerekçeler)

| Bileşen | Sayfa | Neden yeni |
|---|---|---|
| `.az-bar / .az` | sözlük | Sitede harf navigasyonu hiç çözülmemişti; `.pg` sayfalama butonu anatomisi (44px kutu, radius-sm/md, domates aktif) baz alındı |
| `.term-row / .term-detail` | sözlük | besin-kutuphanesi `food-row` satır kitinin domates uyarlaması + accordion açılımı; kütüphane akrabalığı raporda istendiği gibi izlendi |
| `.duo-grid / .teaser-card` | hub | Günün Terimi + Hızlı Ölçüler cep rehberi — gövdesi tamamen mevcut parçalardan (seo-quick VERBATIM, ikon kutusu dili) |
| `.lvl` (lvl-1/2/3) | mutfağa giriş | Seviye rozeti brief isteği; `disc-badge` türevi, renk kuralına uygun (yeşilsiz) |
| `.next-card` | mutfağa giriş | Aile içi köprü şeridi; chef-cta/teaser dilinden kompakt satır |
| `.ak-card / .ak-how-step / .soon-big` | akademi | Eski karşılığı olmayan landing; ikon kutusu + step num anatomisi v3a'dan |
| `.ob-res / .cp-rows` | ölçü | hesaplayıcı `res-box` iskeleti (yeşil→domates: sağlık bağlamı yok) + TD `cp-row` VERBATIM dili |
| `.puf-reads` | püf | Kart altı okunma sayacı — "En Çok Okunan" sıralamasına veri; `r-views` anatomisi |

Verbatim taşınanlar (class adı değişmedi): `rd-crumb`, `lst-top/lst-hero/lst-stats/lh-chips`, `puf-card` (açık VE koyu varyant kendi bağlamlarında), `pufl-grid`, `disc-*` ailesi (+feature/badge), `guide` bandı tam seti (overlay/grain/tabs/steps-grid), `art-*` tam seti, `r-card` tam anatomi, `ke-filter`, `disc-tabs/.dt`, `pagi`, `nut-table`, `fk-*` kiti, `fc-head`, `seo-intro/seo-prose/seo-aside/seo-quick`, `dayband/db-*`, `fb-kvkk`/`fb-success` (shell).

## 3. Diğer kararlar

- **Guide bandı videosuz:** hub + mutfağa giriş koyu bandı statik `guide-poster.jpg` ile (patron kararı #2 "arka plan videosu" beklemede — video elementi bilinçli eklenmedi).
- **Hub kurgusu:** 1 feature + 4 kart (5 bölüm) → disc-feature 2 kolon span; Akademi kartı "Yakında" rozetli ama tıklanabilir (landing'e gider).
- **Hub'daki dayband:** v3a Günün Tarifi bandı dili Akademi köprüsüne uyarlandı (sabit bg separatör işlevi aynı).
- **Site-içi navigasyon:** 6 sayfa arası tüm köprüler bağlı (hub→4 alt sayfa+akademi, breadcrumb'lar→hub, çapraz köprüler: giriş→ölçü/sözlük/püf, sözlük→tarif-detay/püf, püf→tarif-liste/tarif-detay/sözlük). Header/drawer'daki Mutfak Sırları `#` linklerine DOKUNULMADI (LEAD navbind bağlayacak).
- **Mutfağa giriş konu kartları `href="#"`:** konu detay sayfası bu dalganın kapsamında değil; uzun-form şablonu püf `?detay=1` ile ortak — stack fazında aynı şablon konulara da uygulanır (bilinçli `#`).

## 4. Açık sorular (3)

1. **"Şimdi Dinle" (TTS) taşınsın mı?** Eski detay sayfalarının (püf/sözlük/giriş) ayırt edici özelliğiydi; erişilebilirlik değeri var ama mock'ta sahte player gürültü olurdu. Stack fazında Web Speech API ile gerçek çözüm önerilir — Beyar kararı.
2. **Püf detayında yorum bölümü:** eski detayda tam yorum sistemi vardı. TD `.rev-*` kanonik dili hazır; sayfayı şişirmemek için bu turda eklemedim. "Püf detayına rev-* yorum bloğu eklensin mi?" — eklenecekse 30 dk'lık iş, dili hazır.
3. **Sözlükte Q/W/X harfleri:** eski sitede vardı (boş sayfaya götürüyordu). TR alfabe + disabled mantığıyla düşürdüm; yabancı terim politikası (örn. "Wok") netleşirse `.az-bar`'a eklemek tek satır.

## 5. İstisna dışı dokunma istekleri

- YOK — chrome'a yalnız sayfa-state dokunuşu yapıldı (nav `active` taşıma; her dalganın standart pratiği). Mega menü, footer, drawer linkleri VERBATIM.
- LEAD'e not: `navbind.py` koşulduğunda bu 6 dosyanın header `#` linkleri (Temel Teknikler→mutfaga-giris, Püf Noktaları→puf-noktalari, Sözlük→sozluk, Ölçü Birimleri→olcu-birimleri, Dada Akademi→akademi, footer "Ölçü Birimleri") otomatik bağlanabilir.
