# DadaMutfak — HANDOFF · Tarif Detay & Liste Fazı

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-11

---

## 🟢 MEVCUT DURUM

- **Ana sayfa tamamlandı.** Lead dosya: `mockups/anasayfa-portal-v3a.html`
  Canlı: https://by4r.github.io/dadamutfak-view/mockups/anasayfa-portal-v3a.html
- **Son turda yapılanlar:**
  - Section header'lar ortak grid pattern'ında — "Tamamını Gör" + prev/next okları
    h2 hizasında, description altta tek başına
  - Günün Tarifi bandı: fixed görsel arka plan (`background-attachment:fixed`) + koyu
    overlay, içerik overlay üstünde
  - Footer yasal linkler yatayda ortalı
  - Copyright satırı: solda "© 2026 DadaMutfak…", en sağda `#GaviaWorks`
  - Püf Noktaları kartlarından (puf-card) beyaz border kaldırıldı
- **Mega menü patron onaylı, KİLİTLİ — dokunulmaz.**
- **Kurumsal kimlik:** koyu `#211E16` · domates `#E14827` · krem `#EFE5D3` ·
  **Gilroy-Medium** (kaynak: eski site CSS'i, tek yüz + sentetik bold) ·
  **FontAwesome 6.5.2** (emoji yok)

---

## ⏳ PATRON KARARI BEKLEYENLER

1. **Günün Tarifi bandının sayfadaki yeri** — şu an Mutfak Sırları koyu section'ı ile
   ard arda iki koyu band geliyor; patron sayfaya bakıp uygun yeri söyleyecek,
   o zaman taşınacak.
2. **Mutfak Sırları arka plan videosu** — sabit fotoğrafa mı çevrilsin
   (sayfada 2 autoplay video var; öneri: video sadece hero'da kalsın),
   yoksa lazy-load mu (`poster` + `preload="none"` + viewport'ta başlat)?

---

## ➡️ SIRADAKİ FAZ

- **Tarif Detay sayfası + Tarif Liste/Arama sayfası tasarımı.**
- **Ana sayfa v3a baz alınacak:** header, footer, mega menü, renk/font tokenları ve
  section pattern'ları `mockups/anasayfa-portal-v3a.html`'den türetilecek.
- Beyar dokümanlarla besleyecek, **faz faz gidilecek** — her sayfa/komponent
  onaylanmadan bir sonrakine geçilmez.

---

## 🔒 ÇALIŞMA KURALLARI (devam eden)

- **frontend-design skill ZORUNLU**, plan onaylanmadan implement YOK.
- **Commit/push yalnız Beyar açık izniyle.**
- Kare/oranlı görsel = `div + background-image` (`<img>` değil; logo istisna),
  2x retina çarpma YOK.
- Radius: kart/panel `--radius-lg` · buton/kontrol `--radius-md` · etiket `--radius-sm`;
  pill yok, hardcoded radius yok.
- Unsplash sıcak grade: `&exp=7&gam=6&sat=-9&high=8&vib=5`.
- Referanslar: kimlik `tasks/brand-tokens.md` · modüller `research.md` ·
  eski site analizi `tasks/revize-arastirma.md` · resmi kılavuz `brand/*.pdf`.

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/anasayfa-portal-v3a.html"

# headless SS parametreleri: ?ss=1 (video→poster) · ?fp=1 (hero cap, full-page SS) ·
# ?hdr=solid (katı header) · ?dd=1 (mega menü + dil dropdown açık) ·
# ?drawer=1 (mobil drawer) · ?cc=1 (çerez banner zorla) · ?fb=1 (görüş bildir modal)
```
