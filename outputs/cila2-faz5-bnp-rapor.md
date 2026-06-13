# CİLA-2 FAZ 5 — BNP Akış Raporu (task #5: bnp-akis)

**Dosya:** `mockups/bugun-ne-pisirsem-v1.html` (TEK dosya; _shell.html'e DOKUNULMADI)
**Diff:** `+711 / -26` satır (git numstat) — kabuk/header/mega menü değişmedi.
**Sahiplik:** yalnız bu dosya; teammate'lerin dosyalarına (giris, tarif-liste, diyetisyen-profil, _shell) dokunulmadı.

## Yapılan İşler (4 madde)

### 1) BNP girişine 2 TAB (saglik-testler tab dili)
- `.pf-tabs/.dt` MİRAS (saglik-testler), domates temalı (`--green`→`--tomato`).
- **Tab A "Tarif Ara"** = adım adım sihirbaz; **Tab B "Yemek Modları & Menüler"** = mevcut mod rayı + hazır menüler.
- `.bnp-pane[data-pane]` ile geçiş; `?tab=ara|modlar` derin link + `history.replaceState`.
- Varsayılan tab = **ara** (hero metni bu sırayı anlatıyor); `?mod= / ?menu= / ?havuz=1 / ?cook=1` gelirse otomatik **modlar**'a düşer.

### 2) Tab A — Tarif Ara sihirbazı (iptal edilen wizard geri getirildi)
- `tarif-ekle .stepper/.stp/.stp-line/.wstep/.wiz-foot` iskeleti MİRAS (kılavuz §2c — yeni stepper icadı YOK).
- 4 adım: **Öğün → Süre → Zorluk → Damak** (damak çoklu + opsiyonel). Seçim tile'ları = sayfada zaten duran `.pick/.pick-grid` (eski iptal wizard'ın kalıntı CSS'i değerlendirildi).
- Sonunda POOL'dan **eşleşen tarifler** puanlanıp sıralanır (`%N uygun` rozeti = `.r-match`), `.res-grid/.r-card` MİRAS. Boş durum (`.res-empty`) + "Baştan dene".
- Seçim özeti chip'leri (`.res-summary`) + "Düzenle" ile sıfırla.

### 3) Tab B — Sıfırdan menü kurma (eski site "Ekle/Eklendi" akışı)
- Bir yemek MODU seçilince altında **o moda uygun tarifler** sıralanır (`.rp-card` havuz dili, sayfada). Hangi tarifler: o modu taşıyan menülerin kullandığı kap türlerinin POOL havuzu.
- "Menüye Ekle/Eklendi" toggle → **yapışkan tepsi** (`.sc-tray`: sayaç + avatar küçük resimleri + Temizle + **Menüyü Kur**).
- "Menüyü Kur" → seçilen tarifler `working` menüsü olur, mevcut **menü detayına** (kap ekle/çıkar/değiştir) düşer.
- **Hazır menüler KALDI** (mevcut `menuList` + mod filtresi aynen duruyor), sıfırdan kurma EKLENDİ.

### 4) Menüyü Pişir akışı (tarif-detay `.cookmode/.cm-*` MİRAS)
- Menü detayında belirgin **"Menüyü Pişir"** CTA (`.btn-cook`, slate zemin).
- Tıklayınca tam ekran pişirme modu; menüdeki yemekler **KOLAYDAN ZORA** sıralanır (zorluk rank + süre): örn. salata/çorba (çok kolay) → ana yemek.
- Her yemek bir adım: sıra rozeti ("1. Yemek · En kolay — buradan başla"), öneri metni (neden bu sıra), görsel, kap-tipine göre ipucu (`.cm-tip`), **adım sayacı** (başlat/durdur + alarm bip). İlerleme barı + nokta göstergeleri.
- Önceki/Sonraki ile gezinme (ok tuşları + Esc). Sonda **"Menü tamamlandı, afiyet olsun"** ekranı (pişen kapların listesi + Alışveriş Listesi / Menüye Dön). `?cook=1` ile SS için otomatik açılır.

### 5) Mod kartları büyütüldü + gölge kırpma fix
- Boyut: 194×122 → **236×152** (mobil 160×102 → 190×126), etiket 15px → 16.5px.
- **Gölge kesik fix:** `overflow-x:auto` dikeyde de kırpıyordu → `.mode-bar` padding `4px 2px 10px` → **16px 6px 32px** (hover lift −4px + `sh-md`/aktif glow alt-üst-yana sığar). Fade (`::before/::after`) ve oklar yeni boyuta hizalandı.
- **Kaydırılabilir ray KORUNDU:** `.mode-bar` native overflow + `enableDrag` selector listesinde + ok/fade göstergeleri çalışıyor.

## Denetim / Kanıt (Chrome 149 headless + üst-doküman probe; MCP kilitliydi)
- **JS sözdizimi:** 3/3 script bloğu temiz (node `new Function`).
- **Etkileşim akışları (üst-doküman probe, tıkla-ilerle):**
  - Wizard: pick→Devam aktifleşiyor, 4 adım→sonuç (eşleşen tarifler, kart sayısı doğru). ✓
  - Scratch: mod seç→22 tarif, 2 ekle→tepsi açıldı, Menüyü Kur→detay 2 kap. ✓
  - Cook: açıldı (class-state `open=true`), Yemek 1/2→2/2 ilerledi, done ekranı bar %100. ✓
- **390 element-rect taşma = 0** — gerçek 390px (görünür iframe, lessons throttle uyarısına uygun; off-canvas drawer + yatay-scroll konteyner çocukları hariç tutuldu). modlar+scratch ve ara wizard ikisi de 0.
- **Gölge kırpma:** hover simülasyonlu SS'te aktif/hover kart gölgeleri tam görünüyor, kırpılmıyor (`ss-t3/faz5/probe-hover-crop2.png`).
- **Görsel SS'ler:** `ss-t3/faz5/01-tabA-wizard.png`, `02-tabB-modlar.png`, `03-scratch.png`, `04-cook.png`.

## Bilinen Sınırlamalar (ZORUNLU)
1. **Gerçek 390 ölçümü iframe ile alındı** — MCP Playwright tarayıcısı tüm faz boyunca başka teammate'te kilitliydi (`browser already in use`). Headless `--window-size`'ı macOS'ta min ~500px'e clamp ediyor; bu yüzden gerçek 390 için aynı-origin görünür iframe (innerVW=390) kullanıldı. Lessons'taki iframe tuzakları (offscreen throttle) için iframe görünür tutuldu. Yine de patron isterse MCP serbest kaldığında native 390 doğrulaması tekrarlanabilir.
2. **Headless `cook` rect ölçümü `top=18` döndü** — bu kapalı-hal `transform:translateY(18px)` geçişinin virtual-time altında settle etmemesidir (lessons: Chrome 149 geçişleri headless'ta oturmaz → geometri değil class-state ile ölç). Class-state `open=true` doğru; CSS `inset:0` gerçek tarayıcıda tam ekran kaplar (tarif-detay onaylı `.cookmode` pattern'ı birebir). Gerçek tarayıcıda doğrulanması önerilir.
3. **Pişirme modu adım granülaritesi = YEMEK seviyesi** (her kap bir adım + öneri/ipucu), tarif-içi alt-adımlar (malzeme→ateş→servis) DEĞİL. İstenen "kolaydan zora, adım adım, her adım bitince sonraki, sonda tamamlandı" akışı karşılanıyor; daha derin tarif-içi adımlar istenirse her yemek bir alt-sekans olarak genişletilebilir (mock veri gerekir).
4. **Sihirbaz eşleşme skoru heuristik** (puan + süre + damak anahtar-kelime bonusu); gerçek öneri motoru değil — mock. Bazı dar seçimlerde sonuç sayısı düşük olabilir (ör. 15 dk + çok kolay + ana yemek). Boş durumda "filtreyi gevşet" yönlendirmesi var.
5. **`sc-tray` yapışkan şerit** mobilde alt-nav'ı ezmemesi için `bottom: ~82px` verildi; `window.__bottomStrips`'e KAYITLI DEĞİL (sticky, fixed değil) — alt-nav yöneticisi onu gizlemez. Çok kısa ekranlarda görsel yakınlık olabilir; gerçek cihazda kontrol önerilir.
6. **Veri = mock POOL/MENUS/MODES** (14 mod §11 gerçek veri; tarif havuzu temsilî). Stack kararı sonrası gerçek API'ye bağlanır.
7. **`scratchPicks` modlar arası kalıcı** — kullanıcı mod değiştirince seçimler tepside durur (çapraz-mod menü kurmaya izin). İstenirse mod değişiminde sıfırlama eklenebilir.

## Notlar
- Hero/üst yapı (`.bnp-top/.bnp-head`, §2f kanonu) İCAT EDİLMEDİ; yalnız eyebrow/h1/lead metni tab-nötr hale getirildi.
- Git commit/push YAPILMADI (kural). SS kanıtları `ss-t3/faz5/` altında.
