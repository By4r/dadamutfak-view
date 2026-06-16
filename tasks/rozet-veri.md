# DadaMutfak — Rozet & Şef-Kademe Veri Modeli (Foundation F2)

> Tek doğruluk kaynağı: rozet seti + şef merdiveni. `rozetler-v1.html` galeri sayfası ve
> Wave 2 madde 9 dağıtımı (mutfak-defteri / diyetisyen-profil / sefler / sef-ol / hesabim)
> bu dosyaya referans verir; markup'ı şişirmemek için veri burada toplanır.
> Oluşturma: 2026-06-16. Kaynak desen: `mutfak-defteri-v1.html` `.badge-band` envanteri.
>
> **İkon kuralı:** yalnız FontAwesome 6.5.2 FREE (Pro ikon yok → `fa-hat-chef`/`fa-user-chef`
> KULLANILMAZ; Şef kademesi için `fa-award` kullanıldı).
> **Veri temsilî** (mockup) — gerçek eşik/sayılar Laravel fazında bağlanır.

---

## 1. Şef-Kademe Merdiveni (CS:GO rütbe mantığı → şef kariyeri)

8 kademe. Rozet biriktikçe kademe atlar; her kademede bir sonraki kilidi gösteren teaser +
ilerleme çubuğu (CS:GO insignia + progress). H1'deki `.tbadge t-dada` mevcut kademeyi gösterir.

| # | Kademe | Rozet eşiği (temsilî) | Ek koşul | İnsignia (FA6.5.2 free) |
|---|--------|----------------------:|----------|-------------------------|
| 1 | **Çömez** | 0 | — | `fa-egg` |
| 2 | **Komi** | 2 | — | `fa-utensils` |
| 3 | **Çırak** | 5 | — | `fa-spoon` |
| 4 | **Aşçı** | 9 | — | `fa-bowl-food` |
| 5 | **Usta Aşçı** | 14 | — | `fa-medal` |
| 6 | **Şef** | 20 | ≥1 nadir rozet | `fa-award` |
| 7 | **Usta Şef** | 28 | ≥2 nadir rozet | `fa-trophy` |
| 8 | **Dada Üstadı** | 35 | editöryal onay | `fa-crown` |

> **Pro tier'larıyla KARIŞTIRMA:** Bu kademeler topluluk oyunlaştırmasıdır (ücretsiz, rozet
> kazanımıyla). Ücretli **Pro / Pro+ / Pro Max** üyeliği ([[pro-v1]]) tamamen ayrı sistemdir.

### Demo persona — Elif Şahin
- **Mevcut kademe:** Usta Aşçı (rank 5) — H1 `.tbadge t-dada` ile tutarlı.
- **Kazanılan rozet:** 15 · **Sonraki kademe:** Şef (20 rozet + ≥1 nadir) → **"Şef'e 5 rozet kaldı"**.
- **Topluluk Puanı:** 8.450 (mutfak-defteri ile tutarlı).
- İlerleme çubuğu: 15 / 20.

---

## 2. Rozet Seti (6 kategori)

Durum: `earned` = kazanılmış · `locked` = yolda (kalan eşik gösterilir).
Demo persona Elif için 15 earned + 7 locked.

### 2.1 Başlangıç — tek-sefer aksiyon
| Rozet | İkon | Tetik | Durum |
|-------|------|-------|-------|
| İlk Tarif | `fa-seedling` | İlk tarif paylaşımı | earned (Mar 2021) |
| İlk Fotoğraf | `fa-image` | Tarife ilk fotoğraf | earned (Mar 2021) |
| İlk Yorum | `fa-comment` | İlk yorum | earned (Nis 2021) |
| İlk Menü | `fa-layer-group` | İlk menü oluşturma | locked (1 menü kaldı) |

### 2.2 Üretim — N adet kategori tarifi
| Rozet | İkon | Tetik | Durum |
|-------|------|-------|-------|
| Çorba Ustası | `fa-bowl-food` | 25 çorba tarifi | locked (8 çorba kaldı) |
| Tatlı Şefi | `fa-ice-cream` | 25 tatlı tarifi | locked (4 tatlı kaldı) |
| Hamur İşi Uzmanı | `fa-bread-slice` | 20 hamur işi | earned (Eki 2023) |
| Izgara Kralı | `fa-fire-burner` | 20 ızgara tarifi | earned (Tem 2024) |
| Kahvaltı Şefi | `fa-egg` | 15 kahvaltılık | earned (Şub 2023) |

### 2.3 Topluluk — etkileşim eşikleri
| Rozet | İkon | Tetik | Durum |
|-------|------|-------|-------|
| Yorum Sever | `fa-comments` | 100 yorum | earned (Kas 2023) |
| 1.000 Beğeni | `fa-heart` | 1.000 beğeni topla | earned (Nis 2025) |
| Takip Mıknatısı | `fa-user-plus` | 500 takipçi | earned (Oca 2025) |
| Koleksiyoncu | `fa-bookmark` | 50 tarif kaydet | earned (Haz 2024) |

### 2.4 Ustalık — kalite / editör onayı
| Rozet | İkon | Tetik | Durum |
|-------|------|-------|-------|
| Püf Bilgini | `fa-lightbulb` | 10 püf noktası onaylandı | earned (Şub 2025) |
| Fotoğraf Ustası | `fa-camera` | 50 fotoğraf beğenildi | earned (Haz 2024) |
| Editör Onaylı | `fa-circle-check` | Editör tarifi öne çıkardı | earned (Eyl 2024) |
| Tarif Maratonu | `fa-list-check` | 100 tarif paylaşımı | locked (12 tarif kaldı) |

### 2.5 Sadakat / seri — süreklilik
| Rozet | İkon | Tetik | Durum |
|-------|------|-------|-------|
| Haftanın Aşçısı | `fa-trophy` | Haftanın aşçısı seçildi | earned (3 kez) |
| 3 Yıl Dada'lı | `fa-cake-candles` | 3 yıl üyelik | earned (Mar 2024) |
| Maraton Aşçı | `fa-fire` | 30 gün üst üste aktif | locked (30 gün seri) |
| Sadık Dadalı | `fa-calendar-check` | 5 yıl üyelik | locked (2 yıl kaldı) |

### 2.6 Nadir / özel — editöryal & yarışma (kademe atlama için ≥1 nadir şart)
| Rozet | İkon | Tetik | Nadir | Durum |
|-------|------|-------|:-----:|-------|
| Dada Şefi | `fa-medal` | Editöryal seçki | ✓ | earned (Oca 2026) |
| Şefin Tercihi | `fa-star` | Şef ayın tarifi seçti | ✓ | earned (Eyl 2025) |
| Sezon Şampiyonu | `fa-ranking-star` | Sezon yarışması 1.'si | ✓ | locked (yarışmada) |

---

## 3. Earned / Locked Özeti (demo persona Elif)

- **Kazanılan (15):** İlk Tarif · İlk Fotoğraf · İlk Yorum · Hamur İşi Uzmanı · Izgara Kralı ·
  Kahvaltı Şefi · Yorum Sever · 1.000 Beğeni · Takip Mıknatısı · Koleksiyoncu · Püf Bilgini ·
  Fotoğraf Ustası · Editör Onaylı · Haftanın Aşçısı · 3 Yıl Dada'lı · Dada Şefi · Şefin Tercihi.
  *(2 nadir kazanılmış → Şef kademesinin "≥1 nadir" koşulu zaten sağlanıyor; eksik olan rozet sayısı.)*
- **Kilitli (7):** İlk Menü · Çorba Ustası · Tatlı Şefi · Tarif Maratonu · Maraton Aşçı ·
  Sadık Dadalı · Sezon Şampiyonu.

> Not: liste 17 earned satırı içeriyor; demo "15 rozet" gösterimi için galeride 15 vitrin kartı
> öne çıkar (kalan earned'lar "+ daha fazlası" ile özetlenebilir). Sayı temsilîdir.

---

## 4. Wave 2 (madde 9) Dağıtım Notu

`rozetler-v1.html` = tam galeri (bu veri). Aşağıdaki sayfalara `.badge-band` teaser + kademe
rozeti dağıtımı **Wave 2 madde 9 (T-E)** işidir, Foundation kapsamı DIŞI:
`mutfak-defteri` (zaten var → "Tüm Rozetler →" linki `rozetler-v1.html`'e bağlanacak) ·
`diyetisyen-profil` (T-C ile koordine) · `sefler` · `sef-ol` · `hesabim`.
Admin stub (`admin-rozet-v1.html`) da Wave 2 madde 9 kapsamında (Laravel fazına not).
