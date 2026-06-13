# FAZ 6 — Tarif Modülü Zenginleştirme Raporu (tarif-ekle-v1)

> Sahip: **tarif-modulu** · Görev #2 · Dosya: `mockups/tarif-ekle-v1.html`
> Yaklaşım: mevcut 164KB form SIFIRDAN ÜRETİLMEDİ — fk-*/ie-*/st-*/chip
> kiti MİRAS ALINARAK zenginleştirildi. frontend-design skill ile yeni 3
> etkileşim, DadaMutfak dilinden (domates aksan, radius token, pill yok)
> türetildi.

## Yapılan İşler

### 1. ÇOKLU SEÇİM — Kategori + Mutfak (tek select → çoklu chip)
- Kategori (`#fCat` tek `<select>`) ve Mutfak (`#fCuisine` tek `<select>`)
  **token-input + chip** desenine çevrildi (`.ms-field/.ms-box/.ms-chip/
  .ms-menu/.ms-opt`). Bir tarif birden çok kategoriye/mutfağa girer.
- **Chip dili miras:** seçili öğeler beslenme-etiketlerinin aktif
  diliyle birebir (tomato-tint zemin + domates border + ikon), her chip'te
  `✕` kaldırma butonu. Yeni "pill" üretilmedi — radius token (`--radius-sm`).
- **Kategori verisi:** `kategori-veri.md §1`'in GERÇEK **27 tarif kategorisi**
  (Anadolu Mutfağı'ndan … Zeytinyağlı). Probe ile menüde 27 seçenek doğrulandı.
- **Mutfak verisi:** makul 13'lü liste (Türk/Anadolu/Ege/Akdeniz/Karadeniz/
  Dünya/İtalyan/Fransız/Asya/Uzak Doğu/Orta Doğu/Meksika/Hint Mutfağı).
- **Etkileşim:** kutuya tıkla→havuz açılır; yazınca canlı filtre (TR-duyarlı
  küçük harf); tıkla→chip eklenir, tekrar tıkla→çıkar; seçili öğe menüde
  ✓ işaretli; klavye desteği (↑/↓ gezinme, Enter seç, Backspace son chip'i
  sil, Esc kapat); dışarı tıkla kapanır. Kategori için canlı sayaç
  ("3 kategori"). İlk seçilen ana kategori sayılır (yardım metni).
- Hata durumu `.fk-field.has-error .ms-box` ile fk kitine bağlandı.

### 2. "AI İLE İYİLEŞTİR" butonu (mockup simülasyonu)
- Açıklama/Hikâye textarea'sının (`#fDesc`) **label satırında sağ-hizalı**
  `.ai-btn` (`fa-wand-magic-sparkles` + domates aksan).
- Akış: tıkla → buton "İyileştiriliyor…" (dönen spinner) + textarea glow
  → 900ms mock gecikme → metin önceden-hazır **zengin versiyonla** değişir
  (479 karakter), textarea `.ai-applied` glow, altında `.ai-result` bandı
  belirir: **"AI önerisi" rozeti + Geri Al + Kabul Et**.
- **Geri Al** orijinal metni geri yükler; **Kabul Et** öneriyi sabitler;
  buton "Yeniden Dene"ye döner. Önce/sonra net gösteriliyor.

### 3. GERÇEK SÜRÜKLE-BIRAK sıralama (SortableJS)
- **SortableJS 1.15.2 CDN eklendi** (sitede ilk kez; `<head>` `defer`).
- **Malzeme listesi** (`#ieList`): `.ie-row` satırları VE `.ie-group` grup
  başlıkları mevcut `.ie-drag` tutamacından sürüklenebilir (handle: `.ie-drag`).
- **Adım listesi** (`#stList`): `.st-card` kartları `.ie-drag` tutamacından
  sürüklenir; bırakınca `.st-num` **otomatik yeniden numaralanır** (1,2,3…).
- **Görsel geri bildirim:** sürüklenen yerde kesik-domates hayalet
  (`.sortable-ghost` = tomato-tint + dashed border), kavranan kart kalkık+gölge
  (`.sortable-chosen`), taşınan klon büyük gölge (`.sortable-drag`),
  170ms animasyon, `body.is-dragging` ile grabbing imleci.
- Sortable init `DOMContentLoaded`'da (defer CDN'i bekler); `typeof Sortable`
  guard'lı — yüklenemezse konsola uyarı, sayfa çalışmaya devam eder.

## Kanıt (yapısal grep + izole DOM probe)

**Yapısal grep:** SortableJS CDN bağlı · `.ms-*` markup (20 eşleşme) ·
`aiEnhance/aiResult/aiKeep/aiUndo` mevcut · `initMS()/initSortable()/MS_DATA/
ENRICHED` JS mevcut · CSS yorumlarında `*/` glob tuzağı YOK (lessons) ·
kaldırılan `fCat/fCuisine` id'lerine kalan referans YOK.

**DOM probe** (izole `channel:chrome`, MCP DEĞİL — lead rezerve; lessons gereği
teammate self-check). `outputs/faz6-ss/*.png` (4 SS) + 23/23 assertion geçti:

| Test | Sonuç |
|---|---|
| Kategori başlangıç 2 chip + doğru metin | ✅ Hamur İşi, Anadolu Mutfağı'ndan |
| Mutfak başlangıç 2 chip | ✅ |
| Kategori menüsü açıldı / 27 seçenek | ✅ / ✅ 27 |
| Arama "Çorba" → 1 sonuç | ✅ |
| Kategori ekle → 3 chip + sayaç "3 kategori" | ✅ |
| Kategori sil (✕) → 2 chip | ✅ |
| AI: metin değişti (önce≠sonra) / 479 karakter | ✅ / ✅ |
| AI: sonuç bandı (Kabul Et/Geri Al) göründü | ✅ |
| AI: Geri Al orijinali geri yükledi + bant kapandı | ✅ |
| SortableJS yüklendi (CDN) | ✅ |
| Malzeme + Adım listesi Sortable bağlı (handle=.ie-drag) | ✅ / ✅ |
| Gerçek drag: adım sırası değişti | ✅ |
| Drag sonrası numaralar 1,2,3 yeniden sıralandı | ✅ |
| Konsol/sayfa hatası | ✅ YOK (0) |

## Tasarım Gözü (lead kabul gereği)
- Multi-select chip'leri sayfadaki beslenme-etiketleriyle **aynı görsel dili**
  taşıyor (tomato-tint + domates kenar); kutu `fk-input` çerçevesiyle hizalı,
  açılır havuz `.ie-sugg` popover DNA'sıyla tutarlı → sayfaya yabancı durmuyor.
- AI bandı domates-tint zemin + beyaz rozet; buton label içinde sağ-hizalı,
  `fk-count` ritmiyle aynı hatta → düzeni bozmuyor, dikkat çekiyor.
- Drag hayaleti kesik-domates: aksiyon net okunuyor, kart kalkışı yumuşak.
- SS'lerde nefes/hizalama/ritim mevcut form-kart düzeniyle birebir.

## 🔴 Bilinen Sınırlamalar (ZORUNLU — peşinen)
1. **AI iyileştirme MOCKUP simülasyonudur.** Zengin metin önceden-yazılı tek
   bir örnektir (sabit). Gerçek metin → AI çağrısı **Laravel fazında** bağlanacak.
   "Yeniden Dene" aynı sabit çıktıyı verir; girilen metne göre üretmez.
2. **Çoklu seçim verisi mock'tur** — chip'ler bir DB'ye yazılmaz, form submit
   gerçek POST yapmaz (tüm sayfa gibi saf frontend mockup). İlk-seçilen=ana
   kategori kuralı görsel/yardım metni düzeyinde; sıralama backend'de uygulanacak.
3. **SortableJS CDN'e bağımlı** (jsdelivr). Offline/CDN erişimsiz ortamda
   tutamaçlar görünür ama sürükleme pasif kalır (guard'lı, konsol uyarısı verir,
   sayfa kırılmaz). Laravel fazında self-host edilebilir.
4. **Grup-içi satır taşıma serbest** — bir satırı başka grubun altına
   sürükleyince görsel olarak o gruba geçmiş sayılır; gruplama mantığı
   (hangi satır hangi grupta) backend modeli kurulurken netleşecek (mockup'ta
   serbest sıralama).
5. **Adım görsel ekleme hâlâ mock** (önceki davranış korundu — örnek Unsplash
   slot'ları); bu görev kapsamı dışı.
6. **Render SS'leri izole channel:chrome ile alındı** (deviceScaleFactor:2,
   self-check amaçlı); faz-sonu kanonik MCP SS turu lead'de.

## Dokunulan yerler (özet)
- `<head>`: SortableJS CDN (+1 satır).
- CSS: `.ms-*`, `.ai-*`, `.sortable-*` blokları (mevcut token/chip dilinden).
- Markup: Kategori alanı (select→ms-field), Mutfak alanı (select→ms-field),
  Açıklama label'ına `.ai-btn` + `.ai-result` bandı.
- JS (wizard IIFE içine): `MS_DATA/initMS()` çoklu seçim, AI IIFE,
  `initSortable()` (DOMContentLoaded). Mevcut wizard/validate/autocomplete
  JS'ine dokunulmadı.

---

## EK REVİZE-2 — BNP Havuz Modal kategori kontrolü (yuvarlak pill → segment şeridi)

> Beyar revizesi · `bugun-ne-pisirsem-v1.html` · SADECE "Tarif Havuzu" modal'ı
> (`?havuz=1` ile açılır). frontend-design ile en uygun kontrol seçildi.

### Sorun
Modal üstündeki kategori seçimi YUVARLAK PILL butonlardı (`.rp-tab`,
`border-radius:var(--radius-circle)`, aktif = dolu tomato pill). Dağınık/eski
duruyordu (patron beğenmedi).

### Çözüm — modern alt-çizgi SEGMENT şeridi
- **Tasarım kararı (a):** kılavuz §2e `.vw-seg` segment dili akrabası —
  bitişik sekme şeridi, **alt-çizgi aktif gösterge**. (b) ikon-üstte ve
  (c) sol-dikey-liste yerine bunu seçtim: 7 kategori + yatay scroll'u en
  zarif taşıyan, modal düzenini hiç bozmayan, en kurumsal kontrol bu.
- **SADECE CSS** değişti (`.rp-tabs` + `.rp-tab` blok). JS mantığı
  (`buildTabs()`/`renderPool()`), ikonlar, class adları, markup **DOKUNULMADI**
  (lead talimatı: "mantık+ikonlar korunur, görsel kontrolü değiştir").
- **Yeni dil:** şeffaf zemin + alt-çizgi track (`.rp-tabs` bottom-border);
  aktif = domates metin + 2.5px domates alt-çizgi + bold + dolu ikon;
  inaktif = muted, hover'da koyulaşır; ikonlar inline KALDI; `overflow-x:auto`
  yatay scroll korundu. **radius-circle pill kaldırıldı** (yeni radius yok).

### Kapsam & FLAG
- SADECE havuz modal `.rp-tab` değişti. BNP ana sekme `.bnp-tabwrap .dt`,
  tarif-bulucu `.pan-chip`/`.sh-tab`, `_shell` — DOKUNULMADI.
- **FLAG taraması:** sayfadaki tüm `radius-circle` kullanımları tarandı →
  hepsi meşru (ikon kutusu/avatar/rozet/check-dot/adım-no/nav-ok). Başka
  "dağınık yuvarlak-pill kategori-seçici" YOK; ek dokunma gerekmedi.

### Kanıt (izole channel:chrome, MCP DEĞİL)
SS: `outputs/faz6-ss/05-bnp-havuz-segment.png` (açık modal, Tümü aktif) +
`06-bnp-segment-aktif.png` (Ana Yemek aktif). Probe sonuçları:

| Test | Sonuç |
|---|---|
| Havuz modalı açıldı (?havuz=1) | ✅ |
| 7 kategori sekmesi + doğru etiketler | ✅ Tümü/Başlangıç/Ana Yemek/Yan Lezzet/Tatlı/Kahvaltılık/İçecek |
| Aktif sekme radius 0px (pill DEĞİL) | ✅ |
| Aktif alt-çizgi + metin domates (#E14827) | ✅ rgb(225,72,39) |
| Aktif zemin şeffaf (dolu pill değil) | ✅ |
| Sekme ikonları korundu (7) | ✅ |
| Kategori tıkla → tek aktif, net belli | ✅ |
| Ana Yemek seç → rp-grid filtrelendi (31→6, hepsi "ANA YEMEK") | ✅ |
| Tatlı seç → grid yeniden filtrelendi (hepsi "TATLI") | ✅ |
| Konsol/sayfa hatası | ✅ YOK (0) |

> Not: probe'un ilk turunda "filtre doğru" 2 assertion FALSE göründü — neden
> cat-tag'lerin CSS `text-transform:uppercase` ile "ANA YEMEK" render olması
> (benim eşitlik kontrolüm "Ana Yemek" bekliyordu). Ham metin doğrulandı:
> filtre %100 doğru, false-negative assertion artefaktıydı.

### Tasarım Gözü
Aktif kategori domates metin+ikon+alt-çizgi ile çarpıcı net; inaktifler muted
gri + hafif ikon. Track çizgisi tüm şeridi kucaklıyor → bitişik/kurumsal
okunuyor, eski pill dağınıklığı tamamen gitti. Arama + rp-grid altta korundu,
modal ritmi bozulmadı.

### Bilinen Sınırlamalar (revize-2)
- Tüm BNP sayfası gibi saf frontend mockup; kategori filtresi mock POOL
  üzerinde çalışır, backend yok.
- Yatay scroll ≤ dar ekranda gizli scrollbar ile (tasarım gereği); ok-butonu
  eklenmedi (7 kategori çoğu ekrana sığar, sığmazsa kaydırılır).
