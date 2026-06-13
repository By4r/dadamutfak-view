# DadaMutfak — Kurumsal Renk Paleti (RESMİ)

> Kaynak: `tasks/corporate-identity-guideline.pdf` (Dada Mutfak Kurumsal Kimlik
> Kılavuzu, 56 sayfa). Renk sayfaları: **s.17 (Kurumsal Renk Değerleri)** +
> **s.18 (Kurumsal Alternatif Renkler)**. Çıkaran: lead (PyMuPDF metin
> ekstraksiyonu, 2026-06-13). Kılavuz şartı: **"Bu renklerin dışına kesinlikle
> çıkılmamalıdır."**

## 1. KURUMSAL ANA RENKLER (logo + birincil) — s.17

| Renk | Pantone | CMYK | RGB | Hex |
|------|---------|------|-----|-----|
| **Domates (primary)** | 7597 C | C6 M87 Y99 K1 | 225·72·39 | **`#e14827`** |
| **Koyu (Process Black)** | Process Black C | C0 M0 Y0 K100 | 33·30·22 | **`#211E16`** |
| **Krem** | P 15-1 C | C7 M9 Y19 K0 | 239·229·211 | **`#efe5d3`** |

> Logo iki renkten oluşur (domates + siyah); trigromi + ekstra renk uygulaması.
> 1 adet kurumsal **yardımcı** renk (krem) amblem dışı ögelerde kullanılabilir.

## 2. KURUMSAL ALTERNATİF RENKLER (mecra/iletişim) — s.18

> "Bu renkler mecra ve iletişim amacına göre tasarım öğelerinde, ürün
> iletişimlerinde kullanılabilir." → İKİNCİL KABUK/MODÜL AKSANI BURADAN SEÇİLİR.

| Renk | Pantone | CMYK | RGB | Hex |
|------|---------|------|-----|-----|
| Mor | 2582 C | C50 M75 Y0 K0 | 177·79·197 | `#b14fc5` |
| Açık yeşil | 346 C | C58 M0 Y52 K0 | 108·202·152 | `#6cca98` |
| Koyu yeşil | 7482 C | C92 M0 Y90 K0 | 0·157·79 | `#009d4f` |
| **🔵 Petrol** | **3155 C** | C100 M34 Y40 K57 | **0·96·114** | **`#006072`** |

## 3. DADAAKADEMİ RENK KARARI — DOĞRULANDI ✅

**Faz 5'te DadaAkademi'ye uygulanan PETROL `#006072` = kurumsal Alternatif
Renk Pantone 3155 C ile BİREBİR.** Yani petrol seçimi kurumsal kimlikten
SAPMA DEĞİL, resmi alternatif paletin parçası. Beyar 2026-06-13 kararı: petrol
kalıyor (bu turda akademi rengi değişmeyecek). Kurumsal kılavuz bu kararı
doğruluyor — ayrışma (DadaStore domates `#e14827` ↔ DadaAkademi petrol
`#006072`) iki ayrı kurumsal renk arasında, meşru.

- `--c-petrol: #006072` token'ı kurumsal değerle eşit — sapma 0. Teyit yeter,
  renk DEĞİŞMEZ.
- Domates sızıntısı kontrolü (akademi kabuğunda logo/CTA/nav/hero) yine geçerli:
  hepsi petrol, `#e14827` sızıntısı 0 olmalı.

## 4. MEVCUT TOKEN ↔ KURUMSAL EŞLEME (proje _shell)

| Proje token | Mevcut değer | Kurumsal | Durum |
|-------------|-------------|----------|-------|
| `--primary` (domates) | `#e14827` | 7597 C `#e14827` | ✅ birebir |
| `--slate` / koyu | `#253D4E` | Process Black `#211E16` | ⚠️ proje slate biraz mavi; kurumsal koyu daha nötr-sıcak. Mockup'ta dokunma (geniş etki), NOT düşüldü |
| krem zeminler | `#efe5d3` ailesi | P 15-1 C `#efe5d3` | ✅ uyumlu |
| `--green` (sağlık) | `#3BB77E` | 346 C `#6cca98` / 7482 C `#009d4f` | ⚠️ proje yeşili kurumsal yeşil ailesinden; yakın, mockup'ta dokunma |
| `--c-petrol` (akademi) | `#006072` | 3155 C `#006072` | ✅ birebir |

> ⚠️ Slate/yeşil sapmaları bu REVİZE turunun kapsamı DEĞİL (site-geneli token
> değişimi = ayrı karar, Beyar onayı). Burada sadece kurumsal teyit için
> kayıt altına alındı.

## 5. FONT
Kurumsal font: **Gilroy** (Regular/Medium) — projede zaten kullanımda (@font-face
_shell). Sapma yok.
