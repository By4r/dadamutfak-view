# DadaFit Modülü — Tam Spec & Gezinme Haritası

> DadaFit (DadaMutfak'ın hareket/fitness alt-markası) modülünün TÜM sayfaları, aralarındaki
> gezinme haritası, her sayfanın özü + durumu. Kaynak: bu oturumun FAZ2 + ek-sayfa + rebind turları.
> Görsel referans: hub'ın imza dili. Header pattern: `tasks/dadafit-header-blok.md`.
> **Durum: 10 sayfa tamamlandı, nav/CTA tam bağlı, commit edilmedi (handoff bekliyor).**

## İmza dili (10 sayfada ortak)
- DadaFit header chrome inline (topbar "DadaMutfak'a dön" + promo + dil · `.fit-brand` SVG mark · snappy
  aria'lı dropdown nav · drawer · bottom-nav · yeşil footer). `:root` recolor `--tomato:#009d4f`; `--food:#E14827` korunur.
- Koyu `#211E16` + `#009d4f` yeşil gradient · cam/blur panel · **desatüre METİNSİZ kadın-ağırlıklı görsel hero**
  (df-hero-media deseni: layered image + 90deg koyu gradient) · full-görsel kartlar (div+bg cover, img YOK) · gövde beyaz-baskın.
- Aksan SADECE `#009d4f` (+ köprü/defter'de `--food` kırmızısı = iki-renk tezi). Yasak: krem/petrol/nane/`#3BB77E`/sage.
- Offset: sabit chrome 112px (mobil 62). Snappy dropdown: `.open{transition:opacity .01s,visibility .01s,transform .12s}`.
- Ton K7: kapsayıcı, no-pain-no-gain YOK, objektifleştirme yok.

## Sayfalar (10)
| # | Dosya | Öz | Durum |
|---|---|---|---|
| 1 | `dadafit-hub-v1.html` | **Hareket Merkezi** — tek-sayfa hub: hero+Enerji Defteri, köprü, hedef seçici, egzersiz/program/challenge/antrenör teaser'ları | ✅ |
| 2 | `egzersiz-kutuphane-v1.html` | Egzersiz liste + kas/ekipman/seviye filtre, full-görsel kartlar | ✅ |
| 3 | `egzersiz-detay-v1.html` | Tek hareket + **set×tekrar×ağırlık inline set-takip** + canlı hacim, GIF placeholder, nasıl-yapılır | ✅ |
| 4 | `program-detay-v1.html` | "4 Hafta Ev Antrenmanı" — full-görsel hero + haftalık akordeon + gün gün hareket + ilerleme | ✅ |
| 5 | `program-liste-v1.html` | Program listesi + hedef/süre/seviye/ekipman filtre, "süre omurgası" kartları | ✅ |
| 6 | `dadafit-kopru-v1.html` | Beslenme↔hareket köprü: antrenman ekle→MET yakım→bütçe→protein tarif (Mifflin TDEE türevi) | ✅ |
| 7 | `challenge-v1.html` | "Haziran Challenge" — 30-gün takvim + ilerleme + kazanımlar + topluluk | ✅ |
| 8 | `antrenorler-v1.html` | Antrenör dizini — uzmanlık slider filtre + full-görsel Onaylı kartlar + "Antrenör Ol" CTA | ✅ |
| 9 | `antrenor-ol-v1.html` | Antrenör başvuru/onboarding (sertifika yükle→onay→rozet), mock form | ✅ |
| 10 | `antrenor-detay-v1.html` | Antrenör profil (Selin Aksoy) — bio/sertifika + programlar + yorumlar + benzer antrenörler | ✅ |

## Gezinme haritası

**Header nav (10 sayfada tutarlı):** Hareket Merkezi→hub · Egzersizler ▾→kütüphane (dropdown alt-link: kütüphane+filtre param) · Programlar→**program-liste** · Challenge→challenge · Antrenörler→antrenorler. Topbar promo "Yediğini hareketle dengele"→kopru · "DadaMutfak'a dön"→anasayfa-portal.

**Gövde içi çapraz linkler:**
- kütüphane kart → egzersiz-detay · "Tüm Egzersizler"/filtre kartları → kütüphane
- program-liste kart → program-detay · program-detay hareketleri → egzersiz-detay
- antrenorler coach kart ("Profili Gör") → **antrenor-detay** · "Antrenör Ol" → **antrenor-ol** · "Nasıl çalışır?" → antrenor-ol
- antrenor-detay: programlar → program-detay · benzer antrenörler → antrenor-detay
- hub teaser'ları: egzersiz örnek → detay · program örnek → program-detay · hedef seçici → program-liste · "Tümünü Gör" (antrenör) → antrenorler · "Challenge'a Katıl" → challenge · "Yaklaşımı Keşfet" → kopru
- challenge → kopru ("Enerji köprünü kur") · kopru protein tarif kartları → tarif-liste-v1.html?filtre=protein

**Giriş-gate'li aksiyonlar (`data-lg-gate` → sayfa-içi giriş modalı, hard redirect DEĞİL):**
Programa Ekle (detay) · Programa Başla (program-detay) · Challenge'a Katıl + Bugünün hareketini yap (challenge) · Danışan Ol + Mesaj Gönder (antrenor-detay). ⚠️ challenge başta hard-giris kullanıyordu → düzeltildi.

**Fonksiyonel/placeholder `#` (dead değil):** dil menüsü, Görüş Bildir, footer sosyal ikonları, "Öneri ve Şikayet", reCAPTCHA Google Gizlilik/Şartlar.

**P1'e ertelenen:** challenge geçmiş/yaklaşan challenge kartları (arşiv/çoklu-challenge gelince).

## Domain / READ-ONLY
Yazılan: 10 DadaFit sayfası. Dokunulmayan (git-clean): `gunluk-kalori-v1.html`, `dyt-recete-builder-v1.html`, `sef-ol-v1.html`, `diyetisyen-profil-v1.html`, `diyetisyen-dizin-v1.html`. Commit/push YOK.

## Açık işler (handoff sonrası)
- Final davranışsal regresyon (Playwright tıklama) + mobile QA (390/360/768) — bu oturumda yapılıyor.
- Antrenör-profil veri varyantları, çoklu-challenge arşivi = ileri faz.
</content>
