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

| # | Kademe | Rozet eşiği (temsilî) | Ek koşul | İnsignia (FA6.5.2 free) | rank-key |
|---|--------|----------------------:|----------|-------------------------|----------|
| 1 | **Çömez** | 0 | — | `fa-egg` | `comez` |
| 2 | **Komi** | 2 | — | `fa-utensils` | `komi` |
| 3 | **Çırak** | 5 | — | `fa-spoon` | `cirak` |
| 4 | **Aşçı** | 9 | — | `fa-bowl-food` | `asci` |
| 5 | **Usta Aşçı** | 14 | — | `fa-medal` | `usta-asci` |
| 6 | **Şef** | 20 | ≥1 nadir rozet | `fa-award` | `sef` |
| 7 | **Usta Şef** | 28 | ≥2 nadir rozet | `fa-trophy` | `usta-sef` |
| 8 | **Dada Üstadı** | 35 | editöryal onay | `fa-crown` | `ustad` |

> **Pro tier'larıyla KARIŞTIRMA:** Bu kademeler topluluk oyunlaştırmasıdır (ücretsiz, rozet
> kazanımıyla). Ücretli **Pro / Pro+ / Pro Max** üyeliği ([[pro-v1]]) tamamen ayrı sistemdir.

### 1.1 Kademe ↔ Rozet eşlemesi (etkileşim modeli)

> `rozetler-v1.html` merdiven kartları **tıklanabilir**: bir kademeye tıklandığında galeri o
> kademede kilitlenen rozet setine **filtrelenir** (`data-rank` eşleşmesi); "Tümü"ne dönülebilir.
> Her rozet `data-rank` taşır = o rozetin tipik olarak hangi kademe penceresinde kazanıldığı.
> Mantık: erken kademeler tek-sefer/başlangıç rozetleri, üst kademeler üretim hacmi + nadir/editör.

| rank-key | Kademe | Bu kademede öne çıkan rozetler (kazanım penceresi) |
|----------|--------|-----------------------------------------------------|
| `comez` | Çömez | İlk Tarif, İlk Fotoğraf · *(kademe açılışı — ilk adımlar)* |
| `komi` | Komi | İlk Yorum, İlk Menü, Kahvaltı Şefi |
| `cirak` | Çırak | Hamur İşi Uzmanı, Koleksiyoncu, Yorum Sever |
| `asci` | Aşçı | Izgara Kralı, Tatlı Şefi, Takip Mıknatısı, Fotoğraf Ustası |
| `usta-asci` | Usta Aşçı | Püf Bilgini, 1.000 Beğeni, Editör Onaylı, Çorba Ustası, Hızlı Eller |
| `sef` | Şef | Tarif Maratonu, Haftanın Aşçısı, Dada Şefi (nadir), Mevsim Aşçısı |
| `usta-sef` | Usta Şef | Maraton Aşçı, 3 Yıl Dada'lı, Şefin Tercihi (nadir), Topluluk Lideri |
| `ustad` | Dada Üstadı | Sadık Dadalı, Sezon Şampiyonu (nadir), Efsane Tarif (nadir), Dada Üstadı (nadir) |

### Demo persona — Elif Şahin
- **Mevcut kademe:** Usta Aşçı (rank 5) — H1 `.tbadge t-dada` ile tutarlı.
- **Kazanılan rozet:** 15 · **Sonraki kademe:** Şef (20 rozet + ≥1 nadir) → **"Şef'e 5 rozet kaldı"**.
- **Topluluk Puanı:** 8.450 (mutfak-defteri ile tutarlı).
- İlerleme çubuğu: 15 / 20.

---

## 2. Rozet Seti (6 kategori · 30 rozet)

Durum: `earned` = kazanılmış · `locked` = yolda. Her satırda **tetik** (rozetin ne olduğu) +
**nasıl kazanılır / kalan ilerleme** (hover tooltip + kart altı not metni) + `data-rank`
(§1.1 kademe penceresi). Demo persona Elif için 18 earned + 12 locked.

### 2.1 Başlangıç — tek-sefer aksiyon
| Rozet | İkon | Nasıl kazanılır | Durum / kalan | rank |
|-------|------|-----------------|---------------|------|
| İlk Tarif | `fa-seedling` | İlk tarifini paylaş | earned (Mar 2021) | `comez` |
| İlk Fotoğraf | `fa-image` | Bir tarife ilk fotoğrafını ekle | earned (Mar 2021) | `comez` |
| İlk Yorum | `fa-comment` | İlk yorumunu yaz | earned (Nis 2021) | `komi` |
| İlk Menü | `fa-layer-group` | İlk haftalık menünü oluştur | locked · 1 menü kaldı | `komi` |
| İlk Kayıt | `fa-bookmark` | İlk tarifini kaydet | earned (Mar 2021) | `comez` |

### 2.2 Üretim — N adet kategori tarifi
| Rozet | İkon | Nasıl kazanılır | Durum / kalan | rank |
|-------|------|-----------------|---------------|------|
| Çorba Ustası | `fa-bowl-food` | 25 çorba tarifi paylaş | locked · 8 çorba kaldı | `usta-asci` |
| Tatlı Şefi | `fa-ice-cream` | 25 tatlı tarifi paylaş | locked · 4 tatlı kaldı | `asci` |
| Hamur İşi Uzmanı | `fa-bread-slice` | 20 hamur işi tarifi paylaş | earned (Eki 2023) | `cirak` |
| Izgara Kralı | `fa-fire-burner` | 20 ızgara tarifi paylaş | earned (Tem 2024) | `asci` |
| Kahvaltı Şefi | `fa-egg` | 15 kahvaltılık tarifi paylaş | earned (Şub 2023) | `komi` |
| Salata Uzmanı | `fa-leaf` | 15 salata tarifi paylaş | locked · 6 salata kaldı | `cirak` |
| Hamarat Eller | `fa-list-check` | 100 tarif paylaş (Tarif Maratonu) | locked · 12 tarif kaldı | `sef` |

### 2.3 Topluluk — etkileşim eşikleri
| Rozet | İkon | Nasıl kazanılır | Durum / kalan | rank |
|-------|------|-----------------|---------------|------|
| Yorum Sever | `fa-comments` | 100 yorum yaz | earned (Kas 2023) | `cirak` |
| 1.000 Beğeni | `fa-heart` | Tariflerinde 1.000 beğeni topla | earned (Nis 2025) | `usta-asci` |
| Takip Mıknatısı | `fa-user-plus` | 500 takipçiye ulaş | earned (Oca 2025) | `asci` |
| Koleksiyoncu | `fa-bookmark` | 50 tarif kaydet | earned (Haz 2024) | `cirak` |
| Topluluk Lideri | `fa-people-group` | 2.000 takipçiye ulaş | locked · 1.250 takipçi kaldı | `usta-sef` |

### 2.4 Ustalık — kalite / editör onayı
| Rozet | İkon | Nasıl kazanılır | Durum / kalan | rank |
|-------|------|-----------------|---------------|------|
| Püf Bilgini | `fa-lightbulb` | 10 püf noktası onaylansın | earned (Şub 2025) | `usta-asci` |
| Fotoğraf Ustası | `fa-camera` | 50 fotoğrafın beğenilsin | earned (Haz 2024) | `asci` |
| Editör Onaylı | `fa-circle-check` | Editör tarifini öne çıkarsın | earned (Eyl 2024) | `usta-asci` |
| Tarif Maratonu | `fa-trophy` | 100 tarif paylaş | locked · 12 tarif kaldı | `sef` |
| Hızlı Eller | `fa-bolt` | 30 dk altı 10 tarif paylaş | earned (May 2025) | `usta-asci` |

### 2.5 Sadakat / seri — süreklilik
| Rozet | İkon | Nasıl kazanılır | Durum / kalan | rank |
|-------|------|-----------------|---------------|------|
| Haftanın Aşçısı | `fa-trophy` | Haftanın aşçısı seçil | earned (3 kez) | `sef` |
| 3 Yıl Dada'lı | `fa-cake-candles` | 3 yıl üye kal | earned (Mar 2024) | `usta-sef` |
| Maraton Aşçı | `fa-fire` | 30 gün üst üste aktif ol | locked · 19 gün seri (11 gün kaldı) | `usta-sef` |
| Sadık Dadalı | `fa-calendar-check` | 5 yıl üye kal | locked · 2 yıl kaldı | `ustad` |
| Mevsim Aşçısı | `fa-snowflake` | 4 mevsimde de tarif paylaş | earned (Ara 2024) | `sef` |

### 2.6 Nadir / özel — editöryal & yarışma (kademe atlama için ≥1 nadir şart)
| Rozet | İkon | Nasıl kazanılır | Nadir | Durum / kalan | rank |
|-------|------|-----------------|:-----:|---------------|------|
| Dada Şefi | `fa-medal` | Editöryal seçkiye gir | ✓ | earned (Oca 2026) | `sef` |
| Şefin Tercihi | `fa-star` | Şef ayın tarifi seçsin | ✓ | earned (Eyl 2025) | `usta-sef` |
| Sezon Şampiyonu | `fa-ranking-star` | Sezon yarışmasını 1. bitir | ✓ | locked · yarışmada | `ustad` |
| Efsane Tarif | `fa-gem` | Bir tarifin 10.000 beğeni alsın | ✓ | locked · 6.400 beğeni kaldı | `ustad` |

---

## 3. Earned / Locked Özeti (demo persona Elif · 30 rozet)

- **Kazanılan (18):** İlk Tarif · İlk Fotoğraf · İlk Kayıt · İlk Yorum · Kahvaltı Şefi ·
  Hamur İşi Uzmanı · Izgara Kralı · Yorum Sever · Takip Mıknatısı · Koleksiyoncu · 1.000 Beğeni ·
  Püf Bilgini · Fotoğraf Ustası · Editör Onaylı · Hızlı Eller · Haftanın Aşçısı · Mevsim Aşçısı ·
  3 Yıl Dada'lı · Dada Şefi · Şefin Tercihi.
  *(2 nadir kazanılmış → Şef kademesinin "≥1 nadir" koşulu zaten sağlanıyor.)*
- **Kilitli (12):** İlk Menü · Çorba Ustası · Tatlı Şefi · Salata Uzmanı · Hamarat Eller ·
  Tarif Maratonu · Topluluk Lideri · Maraton Aşçı · Sadık Dadalı · Sezon Şampiyonu · Efsane Tarif.

> Galeri başlığında özet pill'ler: **18 kazanıldı · 12 yolda · 2 nadir**. Sayılar temsilî.
> Her locked kart kalan ilerlemeyi ("8 çorba kaldı", "19 gün seri"), her earned kart kazanım
> tarihini/notunu gösterir. Hover'da tooltip = nasıl kazanılır açıklaması.

---

## 4. Wave 2 (madde 9) Dağıtım Notu

`rozetler-v1.html` = tam galeri (bu veri). Aşağıdaki sayfalara `.badge-band` teaser + kademe
rozeti dağıtımı **Wave 2 madde 9 (T-E)** işidir, Foundation kapsamı DIŞI:
`mutfak-defteri` (zaten var → "Tüm Rozetler →" linki `rozetler-v1.html`'e bağlanacak) ·
`diyetisyen-profil` (T-C ile koordine) · `sefler` · `sef-ol` · `hesabim`.
Admin stub (`admin-rozet-v1.html`) da Wave 2 madde 9 kapsamında (Laravel fazına not).
