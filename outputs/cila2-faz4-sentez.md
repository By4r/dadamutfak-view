# CİLA-2 FAZ 4 — Sentez & İnceleme (Kategori Entegrasyonu + UX Revize)

> Takım: `cila2-faz4` (lead + kategori-tarif + kategori-sirlar + kategori-kesfet-bnp + ux-revize).
> Tarih: 2026-06-13. Saf-frontend mockup, Laravel YOK. Excel gerçek verisi → mock değişimi.
> **COMMIT ATILMADI — öneri §8, Beyar onayı. PUSH ayrı onay.**

## 1. Kapsam

Excel `tasks/KategoriEkle.xlsx` (11 sheet) gerçek üretim kategorileri mockup'a işlendi
(mock veri → gerçek veri). Temiz veri referansı: `tasks/kategori-veri.md` (lead çıkardı,
iki-seviyeli sheet'lerin NULL-parent bug'ı düzeltilerek). Ek olarak bekleyen UX revizeleri
+ Beyar canlı bulguları kapatıldı.

## 2. İş Kalemleri — Kanıtlı Kabul

### Kategori verisi (sadece veri, kurgu sağlam)
| Sayfa | İş | Kanıt |
|---|---|---|
| tarif-liste-v1 | Facet 27 gerçek kategori + 14 beslenme tipi | data-slug 27, CSS diff 0 |
| kategori-v1 | Landing gerçek SEO ("Anadolu Mutfağı'ndan") | CSS diff 0 (7 hit=facet etiketi) |
| puf-noktalari-v1 | 9 soru-formatlı kategori çipi | CSS diff 0, canlı filtre probe |
| mekan-liste-v1 | Konsept facet (Excel §9 7) | CSS diff 0 |
| tarif-detay/tarif-ekle | tbadge + 14-çip tip alanı | grep |
| ansiklopedi-v1 | Sözlük 19 kategori (Faz3'te girdi) | doğrulandı, yeni iş yok |

### Yetkili kurgu (Beyar'ın kendi talepleri)
| Sayfa | İş | Kanıt |
|---|---|---|
| bugun-ne-pisirsem-v1 | 14 mod yatay kaydırılabilir ray + **tarif havuzu modalı** (eksik kurgu kapatıldı) | havuz tıklama probe 4→5, 14/14 mod menü |
| kesfet-v1 | Excel kategorileri alt-filtre (3'lü üst korundu) → **tek katmanlı bağlamsal** (revize) | data-concept probe, köprü korundu |

### Veri-zorunlu yapı (tasarım dili korundu)
| Sayfa | İş | Kanıt |
|---|---|---|
| olcu-birimleri-v1 | İki-seviye (10 üst→65 alt), a463329 görsel dili + minimum yapı | CSS sapması tek kural (.ut-tabs flex-wrap), yan-yana SS |
| mutfaga-giris-v1 | Gerçek 7 ana + 36 alt, a463329 kabuk aynen (**regresyon geri alındı**) | CSS diff 0, yan-yana SS, layout markerları birebir |

### UX revize
| Sayfa | İş | Kanıt |
|---|---|---|
| tarif-bulucu-v1 | Dar Tezgah Paneli → **geniş ferah üst-ızgara** (yeniden tasarım) | element-rect taşma 0, 1440+390 SS |
| iletisim-v1 | Saçma foto → gerçek OSM harita + adres kartı | render SS |
| **sef-ol-v1** (YENİ) | Şef başvuru sayfası — 4 bölüm, pre-fill dolu, sosyal medya, gerçek kategori uzmanlık | 1440+390+sosyal SS, taşma 0 |
| Site-geneli | **DadaStore dropdown kaldırıldı** → düz dada-shop link (64 sayfa) | negatif grep 0, tıklama probe |
| Site-geneli | **"Şef Ol"** → tarif-ekle (yanlış) yerine **sef-ol başvuru** (65 sayfa) | eski hedef 0, h3 başlık korundu |

### Beyar canlı bulgu fix'leri
| Bulgu | Fix | Kanıt |
|---|---|---|
| BNP mod rayı kaydırılamıyor | enableDrag selector'a .mode-bar eklendi + scroll-behavior fix | son chip erişilebilir SS 1440+390 |
| kategori-v1 ray kaydırılamıyor | enableDrag'e .subcat-track + scroll-snap mandatory→proximity | kod-seviyesi (SS final QA) |
| kesfet çift kategori çubuğu | tek katmanlı bağlamsal alt-filtre | tıklama probe, SS |
| mutfaga "Tümünü Gör"→detay | salt href → liste görünümü (a463329 miras bug) | tıklama probe, CSS diff 0 |

## 3. Envanter

70 → **71** (sef-ol-v1.html eklendi).

## 4. Yeni Lesson (işlendi)

`tasks/lessons.md`: "Kategori/veri entegrasyonu = SADECE veri; tasarım dili korunur; veri-zorunlu
minimum yapı istisnası; her kategori sayfası a463329 ile diff'lenir (CSS-kural 0 beklenir)."
+ enableDrag selector dersi (yeni yatay ray eklerken kanonik motor selector listesine sınıfı ekle).

## 5. Regresyon Denetimi

`tasks/kategori-regresyon-raporu.md` — 8 kategori sayfası a463329 ile diff'lendi, CSS-kural/
yapısal/veri sınıflandırması. İki sapma yakalandı (mutfaga regresyon + olcu tasarım dili) →
ikisi de a463329 dili korunarak düzeltildi. olcu'daki 52-CSS sapmasını sayaç-tabanlı denetim
Beyar'dan önce yakaladı.

## 6. Bilinen Sınırlamalar

- **kategori-v1 ray SS** — kod kabul, görsel SS browser kilidi yüzünden final QA'ya ertelendi.
- **?konu= / ?ramazan= vb. parametreler client-side okunmuyor** (tek paylaşımlı sayfa) — Laravel fazı.
- **Malzeme/sayılar mock** (tarif-bulucu, BNP havuz) — eşleşme motoru Laravel.
- **Kalıntı mock çipler** — mekan-detay + mutfak-sirlari'nda eski kategori çipleri (kategori-tarif
  clobber riskiyle dokunmadı) → QA mikro-turu / Laravel seed.
- **DadaStore MARKA dili** kararı hâlâ patronda (sweep yalnız dropdown'ı kaldırdı).

## 7. Patron Bekleyenler (Yasin Bey)

1. **Su Bardağı 200ml vs Excel 240ml** — olcu gram değerleri 200ml-bazlı (TR standart); 240'a
   çevirmek dönüştürücü + 65 satır kaydırır. Hangisi standart?
2. **olcu tab konumu** — 10 uzun kategori başlığın sağına sığmadı, tam-genişlik wrap satırına
   taşındı (pill stili a463329 ile birebir). Veri-zorunlu minimum kabul edildi; veto?
3. **Ramazan modu** (Faz 3) — hâlâ onayda.

## 8. Commit Önerisi (Beyar onayı bekliyor)

```
feat(mockup): cila-2 faz 4 — kategori entegrasyonu (Excel gerçek veri: 27 tarif kat + 14 tip
+ ölçü 2-seviye 10/65 + mutfağa-giriş 7/36 + püf 9 soru-format + keşfet alt-filtre + BNP 14 mod)
+ BNP tarif havuzu modalı (eksik kurgu) + tarif-bulucu yeniden (geniş ferah ızgara)
+ sef-ol başvuru sayfası YENİ (envanter 70→71) + Şef Ol & DadaStore site-geneli sweep
+ regresyon düzeltmeleri (mutfaga-giris/olcu a463329 dili korundu) + 4 canlı bulgu fix
(ray kaydırma ×2, kesfet tek-katman, tümünü-gör hedefi) + kategori-regresyon-raporu + lessons +2
```

**Push:** ayrı onay (Faz 4'ü canlıya almak istenirse).
