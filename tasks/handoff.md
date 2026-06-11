# DadaMutfak — PROJE TAMAMLANDI 🏁 MOCKUP SETİ TESLİME HAZIR

> Tek doğruluk kaynağı. Güncelleme: 2026-06-11 (FİNAL CİLA TURU kapandı —
> tutarlılık taraması + yazdır görünümü + persona birleştirme + test ailesi +
> görsel/buton onarımı. Commit: `chore(mockup): final polish pass`)
> Detay raporlar: `outputs/cila-raporu.md` · `outputs/testler-rapor.md` ·
> `outputs/gorsel-rapor.md`

---

## 📦 SAYFA ENVANTERİ — 62 üretim sayfası

- **60 × `*-v1.html`** + `anasayfa-portal-v3a.html` (kanonik baz) +
  `panel-shell.html` (diyetisyen paneli iskeleti)
- İskeletler: `_shell.html` (public) + `panel-shell.html` (panel)
- Final cilada doğan: **`test-detay-v1.html`** (?test=metabolizma|su-hidrasyon|
  temel-pisirme|hangi-yemek — Onedio tarzı görselli test akışı, kişilik kartı
  sonuç + paylaş + tarif rayı)
- Aileler: ana sayfa · tarif (detay/liste/ekle/bulucu/kesfet/bugün-ne-pişirsem) ·
  video · shop (5) · sağlık (hub + 6 hesaplayıcı + testler + test-detay + diyet
  listeleri/program/besin) · diyetisyen public (3) · diyetisyen paneli (7) ·
  rehber (6) · auth/hesap (4) · landing (4+sezon) · kurumsal/yasal/hata/arama/sss
- Bileşen dili: `tasks/bilesen-kilavuzu.md` §0–§4 TAM (§2d Dalga 3 mirası +
  §2e panel dili + .vw-seg final cilada eklendi)

## ✅ FİNAL CİLA TURUNDA YAPILANLAR (özet — detay `outputs/cila-raporu.md`)

- 40 açık soru sınıflandırıldı: 8 iş yapıldı + 3 karar notu; persona tüm sitede
  **Elif Şahin**; builder→kalori köprüsü; su 4L cap; Müsaitlik→?tab=takvim;
  İhlal Bildir→yasal#b4 (hash-scroll'lu); Öneri-Şikayet→Görüş Bildir modalı
- **tarif-detay YAZDIR görünümü** (print CSS: künye+malzeme+adımlar temiz tek
  kolon, PDF kanıtlı) + pişirme modu pürüzsüz doğrulandı
- **61 sayfa tutarlılık taraması:** 1 kırmızı (urun-liste 390 taşması) + 8 sarı
  düzeltildi (modal/çerez yasal linkleri 54 sayfa, title formatı 21 sayfa,
  boş src, tablet grid-4); footer/bottom-nav/hero-üst/konsol/kart dili 61'de tutarlı
- **Test ailesi tamamlandı:** test-detay-v1 (4 test, Onedio kurgusu) + erişim:
  Sağlık dropdown "Testler" (52 sayfa) + drawer (51) + saglik-hub 4 test kartı +
  saglik-testler Benzer Testler rayı slug'lara bağlı
- **Görsel/buton onarımı:** 2 ölü Unsplash ID (CDN 404) → 4 sayfada 5 eleman
  onarıldı; urun-detay "Hemen Al" (dmCart+odeme akışı) ve Paylaş popover'ı canlı

## 🟠 LARAVEL FAZI LİSTESİ (mockup'ta mock kalan — stack kararı sonrası)

1. Sipariş durum taksonomisi + fatura/PDF üretimi + kupon motoru
2. "Şimdi Dinle" TTS (Web Speech API)
3. Püf detayı yorumları (.rev-* dili hazır, veri backend)
4. Onboarding kullanıcı adı otomatik üretimi · bildirim hedef linkleri
5. Haftalık menü "Menüme Aktar" karşı ucu
6. Panel: aylık takvim v2 (ERTELENDİ) · randevu drawer durum-bazlı butonlar ·
   sidebar canlı sayaçlar · reçete PDF şablonu · toplu işlem/Excel ·
   panel-shell trim (Blade partial'a dönüşürken)
7. Arama "Son Aramalar" (localStorage/hesap)
8. SEO meta description'ları (61 sayfada bilinçli yok — gerçek copy ile)
9. Test sonuç paylaşımının gerçek OG/link altyapısı

## ⏳ PATRON BEKLEYENLER (Yasin Bey / iş kararı — dokunulmadı)

1. Günün Tarifi bandının ana sayfa yeri (iki koyu band ard arda)
2. Mutfak Sırları arka plan videosu (statik foto ile çözüldü)
3. Mobil app tanıtım landing'i (m3) — app bandı + footer rozetleri buna bağlı
4. Reklam alan yerleşimi (m29) + reklam paket fiyatları ("Teklif İste" kalır)
5. EN dil stratejisi (dil menüsü mock)
6. Malzeme başı dış market "Sipariş Et" dropdown'ı
7. Video ray modeli (m13) — "Seriyi Aç" hedefi buna bağlı
8. Kupon iş kuralları (tek kupon? eşik tabanı?)
9. Sözlük Q/W/X politikası · sosyal login seti (FB?) · siparişlerim hesaba
   5. sekme mi · BMH pediatrik kapsamı · vücut tipi eşikleri (diyetisyen onayı)
10. Header bildirim zili (yeni chrome UI) · haftalık menü→alışveriş köprüsü
11. Yasal metinler hukukçu onayı + künye tüzel bilgileri + ekip isimleri
12. Sezon "Günün Ayeti" bloğu (editöryel) · "Şef Ol" hedefi

## ➡️ SONRAKİ ADIM

**Stack kararı** (Laravel mi, statik mi — CLAUDE.md gereği ayrı konuşma) +
EN dil stratejisi. Mockup seti dondu; değişiklikler cila-2 olarak planlanır.

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/anasayfa-portal-v3a.html"   # site
open "http://localhost:8765/mockups/panel-shell.html"           # panel
```

Canlı (Pages): https://by4r.github.io/dadamutfak-view/mockups/<sayfa>.html

- **Ortak:** `?dd=1` mega+dil · `?drawer=1` · `?cc=1` · `?fb=1` · panel `?nav=1`
- **Test ailesi:** `test-detay-v1.html?test=metabolizma|su-hidrasyon|
  temel-pisirme|hangi-yemek` (+`&sonuc=1` sonuç kartı)
- **Tarif detay:** `?cook=1` pişirme modu · yazıcı ikonu = print görünümü
- Dalga paramları: `outputs/dalga{2,3,4}-sentez.md` · Scratch SS:
  `mockups/.ss-scratch/` (gitignored) · Mobil SS: 500px + 390 iframe probe
  (kılavuz §4) · Probe altyapısı: `.ss-scratch/cila/sweep.py`
