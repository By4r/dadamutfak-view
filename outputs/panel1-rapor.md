# Panel-1 Raporu — Dalga 4, Diyetisyen Paneli Ailesi (randevular · danışanlar · mesajlar)

Tarih: 2026-06-11 · Üretilen dosyalar: `mockups/dyt-randevular-v1.html`,
`mockups/dyt-danisanlar-v1.html`, `mockups/dyt-mesajlar-v1.html`
Baz: `mockups/panel-shell.html` (token/sidebar/topbar BİREBİR; içerik alanı +
"SAYFA CSS" işareti altı dolduruldu).

---

## 1. L1 — Eski panel & gereksinim kıyası

Kaynaklar: `drive-download-20260608T070112Z-3-001/dada-mutfak-panel/`
(index.html + uyeler/ + supports/ tarandı) ve `dada-mutfak-diyetisyen.docx`
(metin `unzip -p ... word/document.xml` ile çıkarıldı).

Genel tespit: eski panel **yönetici (admin) paneli** — Metronic tarzı Bootstrap
teması. **Diyetisyenin kendi çalışma paneli diye bir şey YOK**; diyetisyen
eski sistemde yalnız admin tarafından yönetilen bir üye tipi
(`uyeler/diyetisyen_list.html`, `diyetisyen_profili.html`). Dolayısıyla bu üç
sayfanın birebir eski karşılığı yok; gereksinim docx'i esas alındı.

### ① dyt-randevular-v1 — Randevular

| Blok | Eski karşılık | Yeni tasarım |
|---|---|---|
| Takvim görünümü | **Eski karşılık yok** — eski panelde randevu modülü yok; `diyetisyen_profili.html`'de sadece "Randevu Linki" alanı var (harici link mantığı) | Haftalık saat-grid takvim (Pzt–Paz × 09.00–16.00), slot durumları `.pstat` renk diliyle |
| Hafta/Gün geçişi | Eski karşılık yok — gereksinim docx §3: "Takvim görünümü (haftalık/aylık) olmalıdır" | Hafta + Gün segmenti (`?gorunum=gun`); aylık görünüm v2'ye bırakıldı (aşağıda açık soru) |
| Randevu detayı/onayı | Eski karşılık yok — docx §3 "danışanlarıyla randevularını planlayabilir" | Sağ drawer: danışan, tür (yüz yüze/online), süre, not, Onayla / İptal Et (`?detay=1`) |
| Müsaitlik yönetimi | Eski karşılık yok | "Müsaitlik Ekle" `.btn-green` + "Çalışma Saatleri" ghost (mock) |

### ② dyt-danisanlar-v1 — Danışanlar

| Blok | Eski karşılık | Yeni tasarım |
|---|---|---|
| Danışan listesi | `uyeler/uye_list.html` (admin bakışı): th = Profil Resmi / Adı Soyadı / Telefon / E-posta / Üyelik Tipi / Kayıt Tarihi / Durum / İşlem; toplu sil-pasif-aktif, Excel aktar | `.ptable`: Danışan (avatar+ad+e-posta) / Hedef / Son Görüşme / İlerleme mini bar / Durum `.pstat` / detay oku. Telefon-kayıt tarihi gibi CRM kolonları yerine diyetisyene anlamlı kolonlar (hedef, ilerleme); "Dışa Aktar" ghost buton Excel mirası |
| Arama/filtre | uye_list üst filtre bar'ı (Kategori/İşlem select + Uygula/Sıfırla) | Arama kutusu + chip filtreleri (Tümü/Aktif/Onay bekleyen/Hedefe yakın/Pasif) + tablo↔kart segmenti (`?kart=1`) |
| Danışan profili | `uyeler/uye_profili.html`: form alanları (ad, soyad, tel, e-posta, dil, üye tipi, cinsiyet, doğum tarihi) + Beğendiği İçerikler/Yorumları/Kaydettikleri tabloları | `?danisan=1` detay: profil başlığı (avatar + yaş/boy/kilo/hedef meta) + Başlangıç/Güncel/Hedef/İlerleme istatistik şeridi — docx §2 "geçmiş veriler ve ilerleme bilgileri saklanabilir" |
| Ölçüm geçmişi | Eski karşılık yok — docx §2/§6 "kilo ve ölçü takibi" | Saf SVG kilo eğrisi (9 nokta, hedef çizgisi `--yellow` kesikli) + son ölçümler mini tablosu; JS kütüphanesi YOK |
| Reçeteler | Eski karşılık yok — docx §4 beslenme planları | "Atanmış Reçeteler" satır listesi → `dyt-recete-builder-v1.html` linkli, durum `.pstat` (Aktif/Tamamlandı) |
| Notlar | Eski karşılık yok — docx §2 "sağlık geçmişi" serbest alanı | Tarihli not listesi + `fk-textarea` + "Not Ekle" `.btn-green` (fk-* kiti, tarif-ekle mirası) |
| Boş durum | Eski panelde yok (datatable "no records" default'u) | `.pnl-empty` + "Filtreleri Temizle" CTA (`?bos=1`) |

### ③ dyt-mesajlar-v1 — Mesajlar

| Blok | Eski karşılık | Yeni tasarım |
|---|---|---|
| Mesajlaşma | **Eski karşılık yok** — `supports/sss.html` İngilizce tema artığı (ticket sistemi, gerçek modül değil); docx §6: "Diyetisyenle mesajlaşabilir" | İki kolon: sol konuşma listesi (`.mm-list` shell mirası + arama + `.mm-cnt` okunmamış rozeti), sağ sohbet (balon dili) |
| Sohbet balonları | Eski karşılık yok | Danışan solda `--bg` gri bordürlü, diyetisyen sağda `--green-tint`; tarih ayraçları, okundu çift tiki, görselli balon (`div+background-image`) |
| Yazma çubuğu | Eski karşılık yok | Ekle butonu + input + yeşil gönder (mock, gerçek gönderim yok) |
| Boş durum | — | `?bos=1`: sağ kolonda `.pnl-empty` "Bir konuşma seç" |

---

## 2. Sayfa başına verilen kararlar

### Ortak
- Üç sayfa da panel-shell kopyası; sidebar href sözleşmesi uygulandı
  (Panel→panel-shell, Randevular/Danışanlar/Mesajlar→kendi dosyaları,
  Reçeteler→`dyt-receteler-v1.html`, Profil→`dyt-profil-ayar-v1.html`,
  Ayarlar→`...?tab=ayarlar` — panel2 dosyaları henüz yok, linkler şimdiden bağlı).
  `.is-active` her sayfada doğru item'da; `.pl-cnt` sayaçları mock (5/3).
- **Shell CSS trim kararı:** her sayfa, shell bileşen bloklarından yalnız
  KULLANDIKLARINI taşıyor (ör. randevular `.kpi-grid`/`.cl-grid` taşımıyor) —
  ölü CSS bırakmamak için. Token'lar, düzen iskeleti, sidebar/topbar, mobil
  kuralları BİREBİR verbatim. Kullanılmayan bileşene referans veren media-query
  satırları da birlikte düşürüldü.
- **Hafta/Gün ve Tablo/Kart segmenti** (`.vw-seg .vs-btn`): panel dilinde
  segment yoktu; mutfak-defteri `.pf-tabs .dt` dilinden türetildi (aktif dolgu
  domates→yeşil). İki sayfada AYNI class seti — panel diline aday bileşen.
- Pill yok (tüm köşeler radius token), emoji yok, tüm görseller
  div+background-image, Unsplash filtre suffix'i her URL'de, grid kolonları
  hep `minmax(0,1fr)`.

### ① Randevular
- Takvim grid'i `haftalik-menu-v1` `.wk-grid` board dilinden türetildi
  (`.cal-grid`: 64px saat sütunu + 7×minmax(0,1fr)); `.wk-nav` hafta gezgini
  verbatim alınıp hover'ı panel aksanına (yeşil) çevrildi.
- Slot durumları `.pstat` renk eksenine bağlandı: `.slot.ok` yeşil-tint +
  3px sol yeşil bar, `.slot.wait` `#FCF3DD/#B8860B` (pstat.wait ile aynı),
  `.slot.free` çizgili (repeating-linear-gradient) + kesikli bordür "+ Boş".
  Müsait olmayan saat = boş hücre (üç durumdan ayrışsın diye).
- Saat satırları 09.00–16.00, 12.00 öğle arası satırı yok (kapalı saat);
  bugün kolonu `.today` başlık + `.today-col` hücre fısıltısı.
- Gün görünümü shell `.appt-list` dilini AYNEN kullanır + `.is-free` boş saat
  varyantı (kesikli saat bloğu + "Randevu Ekle").
- Drawer içeriği slot `data-*` attribute'larından dolar (mock); `?detay=1`
  default Zeynep Arslan kaydıyla açılır. İptal aksiyonu domates (ikincil vurgu
  kuralı): `.btn-ghost.warm`.
- Mobil: board kart içinde yatay scroll (min-width 760, saat sütunu sticky) —
  haftalik-menu ≤640 pattern'ı verbatim.
- FA düzeltmesi: `fa-regular fa-calendar-day` free sette yok (kutu glyph
  çıktı) → `fa-solid fa-calendar-day`.

### ② Danışanlar
- Liste/detay tek dosyada `?danisan=1` ile; tablo↔kart `?kart=1`; boş durum
  `?bos=1`. Kart görünümü shell `.cl-card`'ı VERBATIM kullanır (+`.pstat`).
- İlerleme mini bar = shell `.cl-bar` verbatim (tabloda 130px).
- İstatistik şeridi `.dd-stats` haftalik-menu `.ss-stats` dilinin panel türevi
  (grid'e çevrildi, 390 için 2×2 kırılım).
- SVG grafik: 600×224 viewBox, polyline + gradient dolgu + hedef çizgisi
  (sarı kesikli — sarı=puan kuralının dışında ama pstat.wait/`--yellow` "takip
  gerektiren eşik" anlamıyla tutarlı; yeşil eğriyle karışmasın diye seçildi).
- 390 taşma vakası: tablo e-posta/rozet nowrap'leri sw:618 yaptı → ≤640'ta
  tablo kart içinde yatay scroll (`min-width:540px`) + Hedef/Son Görüşme
  kolonları gizli. wk-board mobil pattern'ının tabloya uygulanması.

### ③ Mesajlar
- Düzen: `330px + minmax(0,1fr)` grid, yükseklik `calc(100vh - 244px)`
  (min 540px) — sohbet içi scroll, sayfa scroll'u yok.
- Sol liste shell `.mm-list` mirası + iki ekleme: `.mm-side` (saat+rozet
  dikey), `.mm-cnt` okunmamış sayacı (`.pl-cnt` dilinin satır boyu),
  `.mm-row.is-active` (yeşil-tint + inset sol bar — `.pnl-link.is-active`
  ile aynı grammar).
- Balonlar: gövde beyaz; danışan `--bg` gri + bordür (brief "gri"),
  diyetisyen `--green-tint`; alt köşe radius-sm kırması yön verir. Görselli
  balon `.bub-img` div+bg-image. Okundu tiki `fa-check-double` yeşil.
- `hidden` attribute'u display'li bloklarda eziliyordu →
  `.msg-right [hidden]{display:none!important}` güvencesi.
- Mobil ≤980: tek kolon; satıra tıkla → `body.chat-open` (liste gizlenir,
  sohbet + geri oku), `?sohbet=1` SS paramı; `?bos=1` hiç seçili olmayan hâl.
- JS mock: satıra tıklayınca aktif işaretleme + okunmamış rozetini düşürme +
  sohbete en alttan başlama. Gerçek gönderim YOK.

---

## 3. Kabul kriterleri durumu

- **Konsol 0 hata:** error+unhandledrejection probe'u (sayfa kopyasına enjekte,
  title'a yazıldı, --dump-dom ile grep) → 6 varyantta `ERRPROBE:0`
  (randevular, randevular?gorunum=gun&detay=1, danışanlar, danışanlar?danisan=1,
  mesajlar, mesajlar?bos=1).
- **390 taşmazlık:** `_host390.html` iframe probe → 8 varyantta `sw:390`
  (danışanlar listesi fix sonrası; fix öncesi sw:618 idi).
- **SS'ler** (`mockups/.ss-scratch/`):
  - `dyt-randevular-v1-1440.png` · `-gun-1440.png` · `-detay-1440.png` ·
    `-500.png` · `-gun-500.png`
  - `dyt-danisanlar-v1-1440.png` · `-detay-1440.png` · `-kart-1440.png` ·
    `-bos-1440.png` · `-500.png` · `-detay-500.png`
  - `dyt-mesajlar-v1-1440.png` · `-bos-1440.png` · `-500.png` · `-sohbet-500.png`

---

## 4. AÇIK SORULAR (kılavuz + akraba ile çözülemeyenler — iş durmadı)

1. **Aylık takvim görünümü:** docx §3 "haftalık/aylık" diyor; brief yalnız
   Hafta/Gün istedi. Aylık görünüm üretilmedi — `.vw-seg`'e üçüncü buton
   olarak eklenebilir (v2 kararı Beyar'a).
2. **Segment bileşeni sahipliği:** `.vw-seg/.vs-btn` iki sayfada doğdu;
   kılavuz §2e'ye "panel segment" olarak işlenmeli mi? (panel2 Reçeteler/
   Profil-Ayarlar da sekme/segment isteyecek — aynı dili kullanmalı.)
3. **Shell CSS trim politikası:** "kopya" kuralını "kullanılan bileşen
   blokları verbatim, kullanılmayanlar düşer" diye yorumladım (ölü CSS
   birikmesin). Dalga kapanışında tek politika yazılmalı: tam kopya mı,
   trim mi?
4. **Grafikte hedef çizgisi rengi:** sarı=yalnız puan kuralıyla gri alanda;
   `--yellow` kesikli çizgi seçildi (pstat.wait "eşik" anlamı). Alternatif:
   domates kesikli. Beyar görsel nabızda karar verebilir.
5. **Randevu drawer'ında "Onayla" zaten onaylı kayıtta da görünüyor** (mock
   sadeliği — durum bazlı buton seti: onaylıda "Yeniden Planla / İptal",
   bekleyende "Onayla / Reddet" daha doğru olur; v2'de durum-bazlı foot).
6. **Sidebar `.pl-cnt` Randevular=5** shell'den miras (bugünkü randevu
   sayısı); benim kurguda bugün 3 randevu + 1 bekleyen var — mock tutarsızlığı,
   shell'le ortak değer korundu.

## Kaldığım yer
Üç sayfa da bitti, kabul kriterleri tamam. Devir: panel2'nin üreteceği
`dyt-receteler-v1.html`, `dyt-profil-ayar-v1.html`, `dyt-recete-builder-v1.html`
href'leri üç sayfadan ve danışan detayından bağlı durumda.
