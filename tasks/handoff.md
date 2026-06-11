# DadaMutfak — HANDOFF · Research Fazı Tamamlandı

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-11

---

## 🟢 MEVCUT DURUM

- **Research fazı tamamlandı.** İki rapor yazıldı:
  - `tasks/research-sistem.md` — senaryo/sistem anlayışı, ~55-60 ekranlık tam
    sayfa envanteri (~35-40 özgün tasarım), bileşen envanteri (v3a'da var / yeni),
    kaynaklı modül listesi (miras / panel taslağı / diyetisyen / PDF+patron / öneri)
  - `tasks/workflow-fazlar.md` — 13 fazlık tasarım workflow önerisi
    (≈15-16 oturum, L-M ritmi, faz sonu SS+handoff+commit+onay kapısı)
- Kaynaklar derinlemesine okundu: eski site (68 sayfa), panel taslağı (191 HTML),
  diyetisyen dokümanı, rakip analizi PDF'i (patron geri bildirimli — m2 foto
  duvarı, m8 Mutfak Defteri, m13 video serileri EN ÖNEMLİ, m18 malzeme ikamesi,
  Dada Shop onaylı), canlı site + Nefis + GZT.
- Rakip analizi PDF'i projeye kopyalandı:
  `drive-download-20260608T070112Z-3-001/dadamutfak_rakip_analizi_gelisim_raporu.pdf`
- **Ana sayfa onaylı.** Lead dosya: `mockups/anasayfa-portal-v3a.html`
  Canlı: https://by4r.github.io/dadamutfak-view/mockups/anasayfa-portal-v3a.html
- **Mega menü patron onaylı, KİLİTLİ — dokunulmaz.**
- **Kurumsal kimlik:** koyu `#211E16` · domates `#E14827` · krem `#EFE5D3` ·
  **Gilroy-Medium** (kaynak: eski site CSS'i, tek yüz + sentetik bold) ·
  **FontAwesome 6.5.2** (emoji yok)

---

## ⏳ PATRON KARARI BEKLEYENLER

1. **Faz sırası onayı** — `tasks/workflow-fazlar.md`'deki 13 fazlık öneri
   Beyar/patron onayı bekliyor.
2. **Günün Tarifi bandının sayfadaki yeri** — şu an Mutfak Sırları koyu section'ı ile
   ard arda iki koyu band geliyor; patron sayfaya bakıp uygun yeri söyleyecek,
   o zaman taşınacak.
3. **Mutfak Sırları arka plan videosu** — sabit fotoğrafa mı çevrilsin
   (sayfada 2 autoplay video var; öneri: video sadece hero'da kalsın),
   yoksa lazy-load mu (`poster` + `preload="none"` + viewport'ta başlat)?

---

## ➡️ SIRADAKİ FAZ

- **Beyar/patron faz sırasını onaylayacak → onay sonrası F1: Tarif Detay tasarımı.**
  F1 kapsamı: porsiyon ayarlı malzeme listesi + ikame popover'ı, adım kartları,
  besin tablosu, "Ben de Yaptım" foto duvarı, fotoğraflı yorum + yıldız dağılımı,
  yazar kutusu, tarif→ürün köprüsü (detay: `tasks/workflow-fazlar.md` F1).
- **🔒 Drift önlemi (tüm yeni sayfalar):** kanonik baz `anasayfa-portal-v3a.html` —
  token bloğu + header + footer + mega menü oradan **birebir kopya**, lokal
  değişiklik yasak. Her faz SS kontrolünde "v3a ile piksel uyumu" maddesi.
- **Faz faz gidilecek** — her sayfa/komponent onaylanmadan bir sonrakine geçilmez.

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
