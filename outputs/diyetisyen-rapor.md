# DadaMutfak — Diyetisyen Public (F12a) Raporu

> Teammate: `diyetisyen` · Takım: dalga2 · Tarih: 2026-06-11
> Sayfalar: `mockups/diyetisyen-dizin-v1.html`, `mockups/diyetisyen-profil-v1.html`,
> `mockups/diyetisyen-ol-v1.html` — hepsi `_shell.html` kopyasından, kılavuz dili MİRAS.
> KAPSAM DIŞI: Diyetisyen paneli (Tier 4 babysit).

## Revizyon — R1 (2026-06-11, Beyar talimatı: ol yerleşimi)
`diyetisyen-ol-v1.html` yerleşimi düzeltildi (içerik DEĞİŞMEDİ, yalnız yapı).
**Kök neden bug:** `.ol-layout` 2-kolon grid'inde 3 grid child vardı — form
(`.ol-main`), ayrı bir başarı-durumu wrapper'ı (`.ol-main`), ve `.ol-side`.
Başarı wrapper'ı sağdaki 320px kolonu ölü işgal ediyor, yan ray (başvuru süreci +
"Neden DadaMutfak") alt satıra (formun ALTINA) düşüyordu → "form merkezsiz + sağda
ölü boşluk". **Fix:** form + başarı durumu tek sol `.ol-main` sütununa toplandı
(`.ol-formcards` flex-column eklendi) → grid artık tam 2 child: sol form sütunu,
sağ sticky yan kolon. tarif-ekle `.wiz-grid/.wiz-main` aile dili korunur.
Doğrulama: `.ol-layout` children=2, 1440 + 500 SS OK, konsol 0 hata, body=390 (taşma yok).

## Doğrulama Özeti (CDP)
| Sayfa / durum | Konsol | 390px taşma |
|---|---|---|
| dizin | 0 hata | YOK (fix sonrası body=390) |
| profil | 0 hata | YOK |
| profil `?randevu=1` | 0 hata | YOK |
| profil `?tab=yorumlar` | 0 hata | YOK |
| ol | 0 hata | YOK |
| ol `?sent=1` | 0 hata | YOK |

**Düzeltilen bug (dizin):** hero `.lh-chips` (`flex-wrap:nowrap; overflow-x:auto`)
min-content'i ≤1024 `1fr` grid track'ini ~554px'e zorluyordu; `body{overflow-x:hidden}`
kırptığı için görünmez ama 390'ı aşan içerik. Fix: `.lst-hero>div{min-width:0}` (≤1024)
+ `.lh-chips{min-width:0}` (≤640). tarif-liste'de aynı hero kısa chip'lerle latent kalmıştı.

---

## 1) diyetisyen-dizin-v1.html

### L1 — eski `diyetisyenler.html` → yeni
| Eski blok | Karar | Yeni karşılık |
|---|---|---|
| Header/nav/topbar | KORUNDU | shell chrome (kilitli) |
| Tam ekran **video header** "Diyetisyenler" | DÖNÜŞTÜ | koyu-overlay görselli hero (liste hero dili MİRAS; landing ata) |
| Breadcrumb | KORUNDU | `.rd-crumb` (hero içinde, açık metin) |
| Ortalı intro paragraf | BİRLEŞTİ | hero `.lead` içine |
| Sıralama dropdown (Popüler/Yeni) | KORUNDU+GENİŞLETİLDİ | `.sort-dd` (Önerilen/Puan/Değerlendirme/Fiyat/Deneyim) |
| 3-kolon uzman kartı (foto+ad+rol+"Uzman Hakkında") | YENİDEN TASARLANDI | `.dz-card` (avatar+ad+**yeşil doğrulama**+puan+uzmanlık etiketleri+şehir/görüşme/deneyim+fiyat+"Profili Gör") |
| **728×90 reklam bloğu** | ATILDI | (handoff açık soru #4 — reklam kararı beklemede) |
| Footer / feedback / bottom-nav | KORUNDU | shell |
| Facet/filtre **YOK** (yalnız sıralama) | YENİ | sol facet paneli: Uzmanlık Alanı / Görüşme Türü / Şehir / Cinsiyet / Dil / Doğrulama + mobil sheet + aktif chip'ler + boş durum + sayfalama |

### Tasarım kararları
- Uzman kartı r-card/chef-card anatomisinden türetildi (aynı radius/gölge/hover dili).
- **Yeşil** yalnız sağlık/doğrulama dilinde: doğrulama rozeti, "müsait" online noktası,
  facet "Doğrulanmış Uzman" satırı. Domates = CTA/"Profili Gör"; sarı = yalnız puan.
- Facet paneli tarif-liste'den BİREBİR MİRAS (fct/cbx/sheet/sort/fchips + JS deseni).
- Param: `?sheet=1` (mobil filtre), `?empty=1` (boş durum).

---

## 2) diyetisyen-profil-v1.html

### L1 — eski `diyetisyen-profili.html` → yeni
| Eski blok | Karar | Yeni karşılık |
|---|---|---|
| Görselli/videolu page header | DÖNÜŞTÜ | `.pf-banner` (div+bg, overlay) + "diploma doğrulandı" şeridi |
| Profil header (foto+ad+@+rozetler+sayaç+takip) | KORUNDU+VARYANT | `.pf-head` (avatar+ad+**yeşil Doğrulanmış Uzman**+unvan+bio+meta) + `.pf-stats` (Danışan/Deneyim/Puan/Yanıt) |
| Sidebar "Hakkında" + sosyal + **"Randevu Al"** | BÖLÜNDÜ | CTA hero'ya taşındı (Randevu Al/Mesaj/Paylaş); Hakkında sekmeye |
| Ana sekmeler (Diyetisyen Profili / Paylaşılan İçerikler) | SADELEŞTİ | tek sekme barı (`.pf-tabbar` MİRAS) |
| İç-içe alt sekmeler (özgeçmiş/eğitim/sertifika/hizmet/yorum) | DÜZLEŞTİ | 4 sekme: **Hakkında** (eğitim+sertifika+diploma doğrulama yan kartta), **Hizmetler**, **Örnek Menüler**, **Yorumlar** |
| Eğitim 3-kolon grid / sertifika liste / hizmet liste | BİRLEŞTİ | Hakkında yan `.info-card` + Hizmetler `.svc-card` paketleri (fiyatlı) |
| Yorum dizisi (yanıt/şikayet/beğeni) | YENİDEN TASARLANDI | `.rv-*` danışan yorumları + rs-bars özet + **uzman yanıtı** + doğrulanmış danışan rozeti |
| (yok) | YENİ | **Örnek Menüler** = menu-card (MİRAS) + ilgili tarifler r-card'ları (→ tarif-detay) |
| (yok) | YENİ | **Randevu slot seçici** modal (`?randevu=1`): hizmet+gün+saat+onay; ayrıca Mesaj modalı |

### Tasarım kararları
- Profil dili `mutfak-defteri-v1` `.pf-*`'ten MİRAS; diyetisyen varyantı (sayaçlar
  danışan/deneyim/puan/yanıt; rozet vitrini yerine yeşil doğrulama).
- Randevu seçici profil İÇİNDE modal (ayrı sayfa değil) — brief gereği. Hizmet
  kartındaki "Randevu" da aynı modalı preset fiyatla açar.
- Yorum bloğu (`.rv-*`): TD `.rev-*` CSS'i tam elde olmadığından tokens-tutarlı
  türetildi (rs-bars puan dağılımı + danışan rozeti + uzman yanıtı). → açık soru.
- Param: `?tab=hakkinda|hizmetler|menuler|yorumlar`, `?randevu=1`, `?msg=1`.

---

## 3) diyetisyen-ol-v1.html

### L1 — "Diyetisyen Ol" doğrudan karşılığı YOK → en yakın akrabalar
`kayit.html` (kayıt formu: çok-alanlı, KVKK, doğrulama kodu, şifre gücü) +
`reklam-vermek.html` (başvuru/iletişim niyeti). Form deseni bunlardan + form kiti
`tarif-ekle-v1` `.fk-/.up-` ailesinden türetildi.

| Akraba blok | Karar | Yeni karşılık |
|---|---|---|
| kayit: 2-kolon ad/soyad, email/telefon | KORUNDU | `.fk-grid c2` Kişisel Bilgiler kartı |
| kayit: şifre gücü / doğrulama kodu | ATILDI (auth fazına ait) | — (başvuru formu, hesap kaydı değil) |
| kayit: KVKK + gizlilik onayı | KORUNDU+GENİŞLETİLDİ | 2× `.fb-kvkk` (açık rıza + sözleşme) MİRAS |
| kayit: sidebar tanıtım metni | DÖNÜŞTÜ | yan ray: başvuru süreci adımları + "Neden DadaMutfak" yeşil kart |
| reklam: başvuru/inceleme niyeti | KORUNDU | başarı durumu + 2–3 iş günü inceleme notu |
| (yok — alana özel) | YENİ | **Diploma/Lisans No** (zorunlu, yeşil "doğrulama için, profilde gizli" notu) |
| (yok) | YENİ | Mesleki kart (üniversite/yıl/unvan/deneyim/**uzmanlık çoklu-seçim max 5**) |
| (yok) | YENİ | Belgeler (`.up-zone`): diploma + sertifika + profil foto |
| (yok) | YENİ | Profil&Hizmet (bio sayaç, görüşme türü kartları, ücret notu) + reCAPTCHA notu |

### Tasarım kararları
- Form kiti `tarif-ekle-v1`'den BİREBİR MİRAS (`.fk-field/.fk-input/.fk-select/
  .fk-textarea/.fk-help/.up-zone/.form-card/.fc-head`).
- Wizard YOK — tek sayfa 4 kart (1/4..4/4 rozetleri). Başvuru tek seferlik; stepper
  tarif-ekle'ye özgü çok-adımlı akış için.
- Yerleşim: tarif-ekle `.wiz-grid/.wiz-main` mantığı (sol form sütunu + sağ sticky
  yan kolon: başvuru süreci adımları + "Neden DadaMutfak" + ipucu kartı). R1'de düzeltildi.
- Görüşme türü + diploma doğrulama + uzmanlık seçimi yeşil dilde (sağlık/onay).
- Param: `?sent=1` (başarı), `?err=1` (örnek hata gösterimi).

---

## Açık Sorular (Beyar/Yasin Bey onayı)
1. **Facet seti** — eski dizinde facet yoktu; uzmanlık/şehir/online/doğrulama seti
   öneri olarak eklendi. Onay?
2. **Yorum dili** — `.rv-*` tokens-tutarlı türetildi (TD `.rev-*` tam elde değildi).
   Kılavuza geri-port edilsin mi, yoksa TD `.rev-*` ile birebir eşitlensin mi?
3. **Reklam bloğu** — eski dizindeki 728×90 atıldı (handoff açık soru #4 ile bağlı).
4. **Randevu/ödeme** — mock akış; gerçek takvim + ödeme entegrasyonu stack kararı.
5. **Diploma doğrulama** — başvuruda diploma no + belge alınıyor; doğrulama backend
   süreci (manuel mi, e-Devlet/DDB entegrasyonu mu) stack kararı.

## Ekran Görüntüleri (`mockups/.ss-scratch/`)
- Masaüstü 1440: `dizin-1440.png`, `profil-1440.png`, `profil-randevu.png`,
  `dyt-ol-1440.png`, `dyt-profil-hizmetler.png`, `dyt-profil-menuler.png`,
  `dyt-profil-yorumlar.png`, `dyt-ol-sent.png`
- Mobil 500 (headless min genişlik): `dyt-dizin-500.png`, `dyt-profil-500.png`,
  `dyt-ol-500.png` — 390 taşmazlığı CDP probe ile ayrıca doğrulandı (body=390).
