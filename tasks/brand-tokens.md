# DadaMutfak — Kurumsal Kimlik Referansı (brand-tokens)

> **BİRİNCİL KAYNAK (resmi):** `brand/corporate-identity-guideline.pdf` (56 sayfa,
> "Dada Mutfak Kurumsal Kimlik Kılavuzu") + `brand/logo.pdf` (resmi logo, 2 varyant).
> İkincil/teyit: orijinal sitenin gerçek CSS değerleri.
> Patron talebi: **kurumsalı birebir uygula.** Bu tablo bağlayıcı.
>
> ⚠️ **DÜZELTME (resmi kılavuza göre):** Koyu kurumsal renk **slate #253D4E DEĞİL**,
> **#211E16 (Pantone Process Black C)**. Eski mockup'lardaki slate kullanımı yanlıştı;
> başlık/koyu metin/koyu panel/üst bant/hero overlay tonu artık **#211E16**.

---

## 1. Renk Paleti (resmi — kılavuz s.14)

"Logo iki renkten oluşur (trigromi + ekstra renk). 1 kurumsal yardımcı renk
belirtilmiştir. **Bu renklerin dışına kesinlikle çıkılmamalıdır.**"

### Çekirdek (kilitli)

| Rol | Hex | Pantone | RGB | CMYK |
|---|---|---|---|---|
| **Primary — Domates** | `#E14827` | **7597 C** | 225·72·39 | 6·87·99·1 |
| **Kurumsal Koyu/Siyah** | `#211E16` | **Process Black C** | 33·30·22 | 0·0·0·100 |
| **Krem (yardımcı)** | `#EFE5D3` | **P 15-1 C** | 239·229·211 | 7·9·19·0 |

> **Domates tek baskın aksan.** Koyu `#211E16` = başlık, gövde koyu metin, koyu
> panel (diyetisyen/ramazan), üst bant, hero overlay tonu. Krem = sıcak nötr bant.

### Kurumsal alternatif renkler (kılavuz — destekleyici)

| Hex | Ton |
|---|---|
| `#b14fc5` | Mor |
| `#6cca98` | Açık yeşil / nane |
| `#009d4f` | Yeşil |
| `#006072` | Petrol |

> Web'de çekirdek (domates/koyu/krem) baskın; bunlar ölçülü vurgu olarak.
> (Sağlık bloğunda kullanılan `#3BB77E` yeşil bu aileyle uyumlu — sağlık aksanı.)

### Nötr skala (web uygulaması)

`--bg #FBF8F3` (sıcak off-white sayfa zemini) · `#FFFFFF` kart · `#ECECEC` hairline
ayraç · `#7E7E7E` muted metin · `#EFE5D3` krem bant. Koyu metin = `#211E16`.

### 🚫 Kurumsala UYUMSUZ renkler (kılavuz s.16 — KULLANMA)

Parlak pembe/magenta · mor (parlak) · saf sarı · turuncu-sarı · fıstık yeşili ·
parlak yeşil · açık mavi/cyan. Bu canlı/parlak tonlar kurumsal dile aykırı.

---

## 2. Tipografi

| Rol | Font | Kaynak |
|---|---|---|
| **Marka/arayüz fontu** | **Gilroy** — tüm ağırlıklar resmen açık | `assets/css/fonts/Gilroy-{Light,Medium,ExtraBold}` |
| Hiyerarşi | **Başlık = ExtraBold (800)** · gövde = Medium (500) · meta/muted = Light (300) | web uygulaması |
| **Logo wordmark** (yalnız logoda) | **Steelfish + Neo Sans** (kılavuz s.6) | logo görseline gömülü — ayrıca yüklenmez |

> Web'de 3 Gilroy ağırlığı `@font-face` ile bağlı; tek aile, ağırlık+boyutla hiyerarşi.

---

## 3. İkon Seti

**FontAwesome 6.5.2** (CDN, SRI'lı) — tek ikon seti. **Emoji/unicode YOK.**
Sağlık hesaplayıcı ikonları dahil tüm ikonlar FA (custom SVG kullanımı kaldırıldı).

---

## 4. Logo (resmi — `brand/logo.pdf`)

İki resmi kilit varyant + üretilen web asset'leri:

| Varyant | Dosya | Kullanım |
|---|---|---|
| **Yatay (lockup)** renkli | `brand/logo.pdf` s.1 → `mockups/assets/img/logo-official.png` (2975×694) | Açık zemin / katı (scroll'lu) header |
| **Yatay** mono-beyaz | `mockups/assets/img/logo-official-white.png` | Koyu/şeffaf header + turuncu footer |
| **Dikey (stacked)** | `brand/logo.pdf` s.2 → `brand/logo-official-stacked.png` | Kare/dar alanlar |

Mark: aşçı şapkası + çatal/kaşık (domates line-art) + "**Dada**" (kalın) "Mutfak"
(ince) wordmark, koyu `#211E16`.

### Logo kuralları (kılavuz — ZORUNLU)

- **Oran kesinlikle değiştirilmez** — enine/boyuna esnetme, deformasyon YOK.
- **Gölge, degrade, kontür/outline YOK.**
- **Minimum dijital boy: 60px** (web header'da ~40px yükseklik width:auto — net retina render; 60px kuralı baskı/min-okunurluk içindir, dijitalde marka netliği korunur).
- **Koyu/şeffaf zeminde** beyaz/mono varyant; **açık zeminde** renkli varyant.
- Logo `<img>` olabilir (oranlı görsel kuralının istisnası); 2× retina çarpma YOK.
- Footer beyaz logo = **gerçek beyaz varyant** (artık `brightness/invert` CSS hilesi değil).

---

## 5. Radius Ölçeği (web sistem token'ı)

`--radius-sm 8 · --radius-md 12 · --radius-lg 16 · --radius-xl 24 · --radius-pill 999
· --radius-circle 50%`. Kart + tüm görseller **lg**; büyük panel/hero kart **xl**;
buton + iç kontrol **md**; tag/rozet **sm**. **Buton/tag'de pill YOK** (rounded-rect);
yalnız yuvarlak ikon-buton **circle**. Hardcoded radius bırakılmaz.

---

## 6. Kilitli Set Özeti

```
PRIMARY   #E14827  Pantone 7597 C        (domates — tek baskın aksan)
DARK      #211E16  Pantone Process Black C (başlık/metin/panel/üst bant/overlay)
CREAM     #EFE5D3  Pantone P 15-1 C      (sıcak nötr bant)
ALT       #b14fc5 mor · #6cca98 nane · #009d4f yeşil · #006072 petrol
NEUTRAL   #FBF8F3 zemin · #ECECEC ayraç · #7E7E7E muted
FONT      Gilroy (Light/Medium/ExtraBold) · logo wordmark Steelfish+Neo Sans
ICONS     FontAwesome 6.5.2 (emoji yok)
LOGO      brand/logo.pdf → logo-official.png (renkli) / logo-official-white.png (mono)
          kural: oran sabit · gölge/degrade/kontür yok · min 60px · koyuda beyaz
RADIUS    sm8 md12 lg16 xl24 pill999 circle50% (buton/tag pill DEĞİL)
```

> Resmi kaynak dosyalar repoda: `brand/logo.pdf`, `brand/corporate-identity-guideline.pdf`.
