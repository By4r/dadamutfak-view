# Yol Güzergahım v2 — Sol Panel State Machine + Liste UX

> Yazar: teammate "panel-ux" · Tarih: 2026-06-23
> Kapsam: `yol-guzergahim-v2.html` SOL DİKEY PANEL'in tasarım spesifikasyonu (KOD YOK)
> Layout: minimal header (sol Dada logo · sağ Kapat) → altında [SOL PANEL (tam yükseklik) | HARİTA (kalan alan)]
> Referans liste ritmi: `v6/bugun-ne-pisirsem-v1.html` `.r-card` (read-only, aşağıda echo edildi)

---

## 0. Tasarım tezi (frontend-design pass)

Bu bir "harita uygulaması" değil — **bir yol hikâyesi kuran defter**. Sol panel = defterin sayfası,
harita = manzara. Jenerik route-planner refleksi (Google Maps klonu: arama kutusu + mavi rota + beyaz
kartlar) yerine panelin kendisini **dikey bir güzergah şeridi** olarak kuruyoruz: kalkış üstte, varış altta,
arası numaralı istasyonlar. Bu, CLAUDE.md'deki "terminal vs istasyon" dersini panelin omurgasına taşır —
panel zaten zincirin kendisi, ayrı bir "itinerary listesi" widget'ı yok.

Riskli ama gerekçeli seçim: **panelin sol kenarında dikey bir "yol ekseni"** (ince çizgi + üzerinde nokta/rozet
dizisi) tüm 3 view'da sabit kalır. ROTA KUR'da bu eksen waypoint zinciri; ŞEHİR MEKANLARI'nda o şehrin
düğümü büyüyüp "açılır"; GÜZERGAHLARIM'da kayıtlı her rota mini bir eksen olarak listelenir. Aynı görsel
metafor üç state'i birbirine bağlar — kullanıcı nereye geçerse geçsin "yol" hep orada.

---

## 1. STATE MACHINE

Üç view, **tek panelde**. Geçiş modeli HİBRİT (saf tab değil, saf back-stack değil):

- **GÜZERGAHLARIM ↔ ROTA KUR** = kalıcı **TAB** (panel başında, iki sekme). Kullanıcının iki ana modu.
- **ŞEHİR MEKANLARI** = ROTA KUR'un *içine açılan kontekstüel alt-view* (push). Tab DEĞİL — bir şehre
  tıklamakla tetiklenir, BACK ile ROTA KUR'a döner. (Tab şeridi bu view'da gizlenir; yerine breadcrumb.)

```
                         ┌──────────────────────────────────────────────┐
                         │  minimal header: [Dada]            [Kapat ✕]  │
                         └──────────────────────────────────────────────┘
        ┌──────────────────────── SOL PANEL ────────────────────────┐
        │  ┌────────────────────────────────────────────────────┐  │
        │  │  TAB ŞERİDİ:  [ Rota Kur ]   [ Güzergahlarım (3) ]   │  │   ← her zaman görünür (A & C'de)
        │  └────────────────────────────────────────────────────┘  │
        │                                                            │
        │     STATE A: ROTA KUR ◀──────────────┐                    │
        │        waypoint zinciri + sonuçlar    │ back (✕ / breadcrumb)
        │            │                          │                    │
        │   şehre tıkla (panel/harita) push     │                    │
        │            ▼                          │                    │
        │     STATE B: ŞEHİR MEKANLARI ─────────┘                    │
        │        (tab şeridi GİZLİ, breadcrumb: ‹ Rota Kur / Bolu)   │
        │                                                            │
        │     STATE C: GÜZERGAHLARIM  (tab ile A↔C)                  │
        │        kayıtlı rota kartları → "Aç" → A'ya yükler          │
        └────────────────────────────────────────────────────────────┘
```

### Geçiş matrisi

| Konum | Aksiyon | Hedef state | Geçiş animasyonu |
|---|---|---|---|
| A Rota Kur | "Güzergahlarım" tab | C | yatay cross-fade (tab içeriği, 180ms) |
| C Güzergahlarım | "Rota Kur" tab | A | yatay cross-fade |
| C Güzergahlarım | rota kartı "Aç" | A (yüklü) | C→A cross-fade + harita fit-bounds |
| A Rota Kur | şehir tıkla (zincir/harita pin) | B | **slide-in sağdan** (push hissi), tab şeridi yukarı kayar/gizlenir |
| B Şehir Mekanları | breadcrumb ‹ / BACK | A | slide-out (geri), tab şeridi geri iner |
| B Şehir Mekanları | "Güzergaha Ekle" | B'de kalır, toast + zincir rozeti güncellenir | inline (kart state) |
| herhangi | header ✕ Kapat | full-screen'den çık → v1 normal sayfa | — |

**Mevcut state daima okunur (CLAUDE.md kuralı):**
- A & C: aktif tab dolu domates zemin (`--tomato` + beyaz yazı), pasif tab `--paper` + `--line` border.
- B: tab şeridi yok → bunun yerine üstte **breadcrumb** `‹ Rota Kur  /  Bolu` (geri-affordance + konum etiketi
  tek satırda). Şehir adı `--slate` bold, "‹ Rota Kur" `--tomato` tıklanabilir.
- Asla iki state aynı anda görünmez; B her zaman A'nın üstüne biner (geri dönülecek yer net).

---

## 2. STATE A — ROTA KUR (wireframe)

Panel genişliği referansı: **400px** (açık soru #1 — aşağıda). İçerik iki bölgeye ayrılır:
**(üst) waypoint zinciri**  ·  **(alt) rota sonuçları + eşik slider**. Aralarında ince ayraç.

```
┌──────────────────────────────────────────────┐ 400px
│ [ Rota Kur ]   [ Güzergahlarım (3) ]          │  tab şeridi (44px target)
├──────────────────────────────────────────────┤
│  GÜZERGAH                          ⇅ Yönü çevir│  ← eyebrow + reverse aksiyonu (sağ)
│                                                │
│  ●  Kalkış                                     │  ◀ terminal: hollow nokta, "KALKIŞ" rol etiketi
│  │     İstanbul                          ✎     │     büyük şehir adı, düzenle ikonu
│  ┊                                             │     (dikey yol ekseni — ince çizgi)
│  ①  Bolu                              ⠿  ✕     │  ◀ istasyon: numaralı tomato rozet
│  │     ara durak                              │     ⠿ = drag handle · ✕ = çıkar
│  ┊                                             │
│  ②  Gerede                            ⠿  ✕     │
│  │                                             │
│  ●  Varış                                     │  ◀ terminal: hollow nokta, "VARIŞ"
│  │     Ankara                           ✎     │
│  ┊                                             │
│  ╋  + Şehir ekle                               │  ◀ aksiyon satırı (dashed, eksene hizalı)
│                                                │
├──────────────────────────────────────────────┤  ayraç (--line)
│  YOL ÜSTÜ MEKANLAR                             │  eyebrow
│                                                │
│  Yola yakınlık                                 │  eşik slider başlığı
│  Yol üstü ●━━━━━━━○━━━━━━ Yola yakın           │  ← 0..ON_ROAD_KM..CORRIDOR_KM
│  ≤ 5 km          12 mekan          ≤ 20 km     │  canlı sayaç (slider değerine göre)
│                                                │
│  Rota tipi:  [ Önerilen ]  [ Otoyol ]  [ Şehir]│  segment toggle (mock: 3 mod)
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ [foto]  Sapanca Göl Kahvaltı         🟢   │ │  ◀ VENUE CARD (bkz §5) — yatay liste ritmi
│  │ 40%     Sakarya · Sapanca   2.3 km yol üstü│ │
│  │         [ + Güzergaha Ekle ]               │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ [foto]  Abant Köşkü               ⚪      │ │  ◀ "Yola yakın" (gri tag) — eşikten sonra
│  │ 40%     Bolu · Merkez       11 km yola yakın│ │
│  │         [ + Güzergaha Ekle ]               │ │
│  └──────────────────────────────────────────┘ │
│  …                                             │
└──────────────────────────────────────────────┘
        (panel body dikey scroll · header+tab sticky)
```

### A — kompozisyon notları
- **İki sticky bölge**: tab şeridi + "GÜZERGAH" başlık bloğu üstte sabit (kısa); waypoint zinciri ve
  mekan listesi panel-body içinde birlikte scroll eder. (Zincir 2-3 şehirde kısadır; uzarsa listeyle
  birlikte kayar — ayrı iç-scroll YOK, çift scrollbar tuzağından kaçın.)
- Mekan listesi boşsa (uçlar henüz seçilmemiş): bu bölge **empty-state** gösterir, bkz §6.
- "Yönü çevir" yalnız 2+ waypoint varken aktif; tek uç varken disabled (gri).
- Rota tipi toggle = mock 3 mod (research §3: OSRM gerekmez); seçili mod dolu domates.

---

## 3. STATE B — ŞEHİR MEKANLARI (wireframe)

Tetik: A'da bir şehre tıklama (zincirdeki şehir satırı VEYA haritadaki şehir pin'i). Panel sağdan slide-in.
Bu şehrin **küratoryal "Dada öneriyor" bloğu** üstte (belirgin), altında o şehrin kalan mekanları.

```
┌──────────────────────────────────────────────┐
│  ‹ Rota Kur   /   Bolu                         │  breadcrumb (geri + konum, tab YOK)
├──────────────────────────────────────────────┤
│  [ ŞEHİR HERO — div+bg cover/center, 120px ]   │  ◀ şehir görseli (img DEĞİL)
│   Bolu  ·  4 mekan  ·  rota üstünde            │     overlay 0.35, başlık beyaz
├──────────────────────────────────────────────┤
│  ◆ DADA ÖNERİYOR                               │  ◀ ayrışan blok: tomato eyebrow + ◆ glif
│  ┌──────────────────────────────────────────┐ │     blok zemini --tomato-tint, sol kenar
│  │ [foto]  Köroğlu Mangal            🟢      │ │     3px --tomato accent şerit
│  │ 40%     Bolu · Merkez       1.2 km yol üstü│ │
│  │         ★ 4.8       [ + Güzergaha Ekle ]   │ │  ◀ Dada kartında puan görünür (güven)
│  └──────────────────────────────────────────┘ │
│                                                │
│  TÜM MEKANLAR (Bolu)                           │  eyebrow (muted)
│  ┌──────────────────────────────────────────┐ │
│  │ [foto]  Abant Göl Restoran        ⚪      │ │  ◀ standart venue card (§5)
│  │ 40%     Bolu · Abant        14 km yola yakın│
│  │         [ + Güzergaha Ekle ]               │ │
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ [foto]  Köy Sofrası               🟢      │ │
│  │ 40%     Bolu · Merkez       3 km yol üstü  │ │
│  │         [ + Güzergaha Ekle ]               │ │
│  └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

### B — "Dada öneriyor" ayrımı (en kritik görsel iş)
Bu bloğun standart listeden **görsel olarak ayrılması** şart, yoksa kullanıcı "neden bu kart üstte?"
diye sormaz, fark etmez. Ayrım sinyalleri (palet-içi, abartısız):
1. Blok zemini `--tomato-tint` (fısıltı domates) — beyaz liste içinde sıcak ada.
2. Sol kenarda 3px `--tomato` accent şerit (Dada imzası).
3. Eyebrow `◆ DADA ÖNERİYOR` — tomato, uppercase, letter-spacing .16em (shell `.eyebrow` dili).
4. Dada kartında **puan (★ 4.8)** görünür; standart kartta puan YOK (sadelik + güven hiyerarşisi).
5. Boşluk: Dada bloğu ile "TÜM MEKANLAR" arası **32px** (büyük ayrım), standart kartlar arası 14px.

**Geçiş spesifikasyonu (A→B):** panel içeriği 180ms'de `translateX(0)`'a slide + tab şeridi
`max-height` ile yukarı toplanır (breadcrumb onun yerine fade-in). Harita: tıklanan şehre `flyTo`
(zoom +1), şehrin mekan pin'leri pulse (1 kez). Geri (B→A): ters slide, tab geri iner, harita fit-bounds
tüm rotaya döner — **konum korunur** (kullanıcı bıraktığı scroll pozisyonuna döner; uiux-review dim.5).

---

## 4. WAYPOINT CHAIN — etkileşim spesifikasyonu

Zincir = panelin omurgası. Üç düğüm tipi, CLAUDE.md "terminal vs istasyon" dersine birebir uyumlu:

| Tip | Görsel | Etiket | Numara | Drag | Sil |
|---|---|---|---|---|---|
| **Terminal** (Kalkış/Varış) | hollow nokta (○, 2px tomato border, içi boş) | "KALKIŞ"/"VARIŞ" uppercase rol etiketi | YOK | hayır | hayır (✎ düzenle) |
| **İstasyon** (ara şehir) | dolu domates rozet (①②③, numaralı) | şehir adı + "ara durak" | 1..N | evet (⠿) | evet (✕) |

Sayaç: panel "N mekan" gösterimi **istasyon** sayısından beslenir, terminalleri saymaz. (4 mekan + 2 uç
→ "4 mekan" der, "6 durak" demez — v1 hatası.)

### 4a. Ekle
- "**╋ + Şehir ekle**" satırı zincirin en altında, eksene hizalı (dashed nokta).
- Tıkla → satır bir **inline arama input**'una dönüşür (substring autocomplete, v1 `CITY` dizisi).
  Yeni panel/modal AÇMA — zincirin içinde genişler (in-context).
- Seçilen şehir Varış'tan **önce** yeni istasyon olarak eklenir (numara yeniden hesaplanır).
- Alternatif giriş: haritada şehir pin'ine "rotaya ekle" → aynı sonuç (iki yol da zinciri günceller).

### 4b. Çıkar
- Her istasyon satırında sağda `✕` (44px tap target, hover'da `--tomato`).
- Tıkla → satır collapse animasyonu (height→0, 160ms) + numaralar yeniden dizilir.
- Terminal silinmez; yerine `✎` ile **değiştirilir** (autocomplete tekrar açılır).

### 4c. Sırala (drag-to-reorder)
- Drag handle `⠿` yalnız istasyonlarda (terminaller sabit — kalkış hep üstte, varış hep altta).
- Native HTML5 draggable (research §2: dış kütüphane gerekmez). Sürüklerken:
  - sürüklenen satır `opacity .5` + `--sh-md` (kalkık his),
  - bırakma hedefi arası **2px tomato çizgi** (insertion indicator),
  - terminallerin üstüne/altına bırakma engellenir (istasyonlar daima uçların arasında).
- Bırakınca numaralar + rota yeniden hesaplanır (mock geometry segment zinciri).

### 4d. Yönü çevir (reverse)
- "GÜZERGAH" başlığı sağında `⇅ Yönü çevir`. Tıkla → Kalkış↔Varış swap + istasyon sırası ters çevrilir
  (180ms'de zincir dikey "flip" — her satır y-pozisyonu yeni yerine geçer).
- Harita rotası da ters yönde yeniden çizilir. Yalnız 2+ waypoint'te aktif.

---

## 5. VENUE CARD — iç grid + scan order

Referans: `bugun-ne-pisirsem-v1.html` `.r-card`'ın **mobil yatay varyantı** (satır 877-884:
`flex-direction:row` · media `width:40%` · body padding 12/14). Panel dar (400px) olduğu için v2 venue
card **daima** bu yatay ritmi kullanır — masaüstündeki dikey 3-kolon `r-card` değil. Böylece v2 listesi
ürünün geri kalanına yabancı durmaz; aynı kart DNA'sı, dar panele uyarlanmış.

```
┌────────────────────────────────────────────────┐  --paper, --line border, radius-lg
│ ┌────────┐  Sapanca Göl Kahvaltı        🟢 yol üstü│  ← 1. foto  2. AD  3. yakınlık tag (sağ-üst)
│ │        │                                       │
│ │  foto  │  Sakarya · Sapanca                    │  ← 4. ilçe·il (muted, 12.5px)
│ │ 40% bg │  2.3 km yol üstü                       │  ← 5. mesafe metni (tag'in açılımı)
│ │  cover │                                       │
│ └────────┘  [ + Güzergaha Ekle ]                 │  ← 6. AKSİYON (tek primary buton)
└────────────────────────────────────────────────┘
```

### Scan-order gerekçesi (uiux-review dim.4)
Soldan-sağa, üstten-alta okuma için bilgi şu sırayla yerleşir:
1. **Foto** (sol blok, 40% genişlik, `div + background-image cover/center` — asla stretched `<img>`).
   Görsel ilk yakalar; mekan "nasıl bir yer" hissini verir.
2. **Ad** (sağ-üst, 15px bold `--slate`) — "neresi". Kartın focal point'i.
3. **Yakınlık tag** (ad satırının en sağı, hizalı) — "rotama uyar mı" kararının tek metriği,
   en yüksek karar-değeri olduğu için ad ile aynı görsel düzlemde, hemen yanında.
4. **ilçe · il** (muted, küçük) — bağlam, ikincil.
5. **Mesafe metni** ("2.3 km yol üstü") — tag'in sayısal açılımı, tag rengini doğrular.
6. **"+ Güzergaha Ekle"** (alt, primary ghost→fill) — karar verildikten sonra tek aksiyon.

### Yakınlık tag (research §4 — iki eşik)
- **Yol üstü** (`off ≤ ON_ROAD_KM=5`): 🟢 dolu yeşil `--green` (`#3BB77E`) pill, beyaz yazı.
  CLAUDE.md DadaFit/sağlık nanesi değil — burada yeşil = "yolundan sapmadan" olumlu sinyali.
- **Yola yakın** (`5 < off ≤ 20`): ⚪ gri `--muted` outline pill (dolu değil), muted yazı —
  görsel olarak geri çekilir, "ekstra sapma" sinyali.
- Sıralama: yol üstü kartlar önce, yola yakın sonra (slider eşiği bu grupları canlı böler).

### Kartta NE YOK (sadelik kuralı)
- **Tarif linki YOK** (görevde açık). Bu mekan kartı, tarif kartı değil.
- Standart kartta **puan YOK** (yalnız Dada öneriyor kartında ★ görünür — güven hiyerarşisi).
- Yazar/avatar YOK, görüntülenme sayısı YOK (r-card'ın `.r-foot`'u burada gereksiz — mekan ≠ tarif).
- Hover: r-card dilinde `translateY(-4px)` + border `--tomato`'ya; foto `scale(1.04)`.
- **Ekli durum**: kart zaten güzergahta ise buton "✓ Eklendi" (yeşil outline, basılı), tekrar tıkla → çıkar.

---

## 6. EMPTY / LOADING / ERROR state'leri (uiux-review dim.5)

| State | Ne zaman | Tasarım |
|---|---|---|
| **Uçsuz** (A başlangıç) | Kalkış/Varış seçilmemiş | mekan bölgesinde: `re-ico` (yol ikonu, tomato-tint daire) + "Rotanı çiz, yol üstü lezzetleri getirelim" + alt metin "Yukarıdan kalkış ve varış şehrini seç". r-card empty-state dili (`.res-empty`). |
| **Rota var, mekan yok** | Eşik çok dar / koridorda mekan yok | "Bu rotada {eşik} içinde mekan bulunamadı. Eşiği genişlet ya da ara şehir ekle." + slider'a ok. |
| **Loading** (rota hesaplanıyor) | waypoint değişti, geometry yeniden | mekan listesi 3 skeleton kart (gri shimmer, kart iskeleti); zincir sabit kalır. |
| **GÜZERGAHLARIM boş** (C) | hiç kayıtlı rota yok | "Henüz güzergah kaydetmedin" + "İlk rotanı kur" CTA → A tab'ına geçer. |

---

## 7. uiux-review — kendi önerime smell test

Skill checklist'ini kendi spec'ime uyguladım:

| Boyut | Verdict | Not |
|---|---|---|
| 1. Whitespace & ritim | ✅ | 8px ölçek; Dada bloğu↔liste 32px (anlamlı ayrım), kartlar arası 14px (grup). Tek risk: 400px panelde kart iç-padding 12/14 sıkışık olabilir → test et. |
| 2. Tipografik hiyerarşi | ✅ | shell type scale miras (eyebrow 12px/.16em, h2 yok→şehir adı 15px bold, body 13.5, caption 12.5). Tek shout: aktif tab + Dada bloğu. |
| 3. Touch target | ⚠️ | ✕/⠿/✎ ikonları 44px tap area şart (görsel 16px ama hit-box büyük). Spec'te belirtildi, implementte unutma. |
| 4. Kart & liste | ✅ | yatay r-card ritmi miras, scan-order tanımlı, foto div+bg cover. |
| 5. Etkileşim & state | ✅ | 3 state daima okunur, B'den geri konum korur, empty/loading/error tanımlı. |
| 6. Generic-AI smell | ✅ aşağıda | — |

### Neyi jenerik yapardı → nasıl kaçındım
- **Tuzak: mavi-gradient harita + beyaz arama kutusu + "Search destination" placeholder** (Google Maps
  klonu refleksi). → Panel bir *dikey yol ekseni/defter* olarak kuruldu; arama, zincirin içinde inline
  açılan satır (ayrı kutu değil). Marka domatesi rota ve istasyon rozetlerinde taşınır.
- **Tuzak: 01/02/03 numaralı dekoratif markerlar.** → Numaralar BURADA gerçek sıra taşır (istasyon
  ziyaret sırası), o yüzden meşru. Terminaller numarasız (sıra-dışı), istasyonlar numaralı — numara
  bilgi, süs değil.
- **Tuzak: 3 eşit "Dada öneriyor" feature kartı, ikon-başlık-blurb.** → Dada öneriyor TEK blok, gerçek
  hiyerarşi (zemin + accent şerit + puan görünür), eşit-kart gridi değil.
- **Tuzak: her şeye fade-in.** → Animasyon yalnız state geçişlerinde (slide A↔B, cross-fade A↔C) ve
  drag insertion'da; içerik fade-in'i yok. `prefers-reduced-motion` ile slide→instant.
- **Tuzak: jenerik copy ("Plan your perfect trip").** → Türkçe, ürün sesli: "Rotanı çiz, yol üstü
  lezzetleri getirelim" / "N km yol üstü" / "Güzergaha Ekle" — fiil-odaklı, mekana özgü.

### En yüksek etkili 3 düzeltme (öncelik sırası)
1. **"Dada öneriyor" ayrımını implementte zayıflatma.** Spec'teki 5 sinyalin (zemin+şerit+eyebrow+puan
   +boşluk) hepsi gerekli; yalnız eyebrow koyarsan blok kaybolur. Bu B view'unun tüm değeri.
2. **Tap target'ları 44px yap** (✕/⠿/✎). Görsel ikon küçük kalsın ama hit-box büyük — dar panelde yanlış
   tıklama riski yüksek.
3. **Tek scroll ekseni** (zincir + liste birlikte kayar). İç-scroll bölgesi eklersen çift scrollbar +
   "nerede kaldım" kaybı olur; sticky yalnız tab + GÜZERGAH başlığı.

---

## 8. Sahibi için açık sorular

1. **Panel genişliği**: 400px varsaydım (kart yatay ritmi + zincir okunabilirliği dengesi). Alternatif
   360px (daha çok harita) ya da 440px (kart nefes alır). — **Öneri: 400px**; 360'ta "+ Güzergaha Ekle"
   butonu + tag aynı satıra sığmaz, 440 haritayı gereksiz daraltır.
2. **Mobil davranış**: Tam-ekran sol panel mobilde ne olur? Üç seçenek: (a) panel tam-ekran, harita ayrı
   tab/FAB ile çağrılır; (b) alt-sheet (harita üstte, panel aşağıdan çekilen sheet); (c) v1'in alt-rail'ine
   düş. — **Öneri: (b) alt-sheet** — harita + panel ikisi de görünür kalır, Türkiye'de mobil-ağırlıklı
   trafik için en tanıdık desen (Google Maps mobil dili). Karar verilmeli, bu spec masaüstü-öncelikli.
3. **"Dada öneriyor" kriteri**: research §4-soru-5 ile aynı — `dada:true` flag mı, puan eşiği mi? —
   **Öneri: elle `dada:true`** (küratoryal kontrol, mock veride güvenilir).
4. **GÜZERGAHLARIM tab sayacı** kayıtlı rota sayısını gösteriyor (örn "Güzergahlarım (3)"). Kayıt 0 iken
   sayaç gizlensin mi yoksa "(0)" mı? — **Öneri: 0'da gizle**, dolduğunda göster (gürültü azalt).
5. **Rota tipi toggle (Önerilen/Otoyol/Şehir)** A view'unda kalsın mı, yoksa faz 2'ye mi? research §3 mock
   ile yapılabilir ama "gerçek otoban farkı" yanıltıcı olabilir. — **Öneri: faz 1'de göster ama yalnız
   görsel** (mock), etiketle "yaklaşık"; OSRM kararı sonra.

---

## 9. v1 → v2 taşıma notları (bağlantı bütünlüğü)
- v1'in **sağ-üst itinerary paneli + alt yatay rail** → v2'de tek sol panele birleşir (zincir = eski
  itinerary; mekan listesi = eski rail). Eski iki widget kaldırılır.
- localStorage `dada_yg` şeması korunur (`visited{routeId:{ad}}` route-scoped — CLAUDE.md dersi). C view
  bu rotaları okur; rozet/sayaç unique birleşimden beslenir.
- header ✕ Kapat → full-screen mod kapanır, normal v6 shell'e döner (hedef: `yol-guzergahim` normal sayfa
  ya da anasayfa — sahibi onaylasın; şu an v2 standalone full-screen).
- **Henüz bağlanmayan**: B view "ŞEHİR HERO" görseli — `CITY` dizisinde şehir görseli alanı yok
  (research §5). Faz 1'de placeholder bg ya da `ROAD_POOL` ilk mekan fotosu; faz 2'de şehir görseli alanı
  eklenecek. Sessiz boş bırakma — placeholder + not.
```
