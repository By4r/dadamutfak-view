# DadaMutfak — HANDOFF · DALGA 2 TAMAMLANDI (Tier 2 + ara işler, Beyar onaylı)

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-11 (Dalga 2 kapanışı — 19 sayfa + site-içi navigasyon +
> kapanış paketi commit'lendi)

---

## 🟢 MEVCUT DURUM

- **Kanonik baz:** `mockups/anasayfa-portal-v3a.html` — token/header/footer/mega
  menü her sayfaya BİREBİR. **Mega menü kilitli** (linkleri bağlandı, tasarımı kilitli).
- **Kanonik iskelet:** `mockups/_shell.html` — chrome + ortak JS; yeni sayfa =
  shell kopyası. `.below-header` = ilk section offseti (112/62px) — **inline
  padding override YASAK + ilk içerik satırı ≥16px nefes (kılavuz §3, Dalga 2 kuralı)**.
- **Bileşen kılavuzu:** `tasks/bilesen-kilavuzu.md` — v3a + TD + **§2b Dalga 1
  bileşen mirası** + dil kuralları. `.rev-*` yorum dilinin kanonik prefix'i.
- **TIER 0:** Ana sayfa (v3a) + Tarif Detay F1 ✔
- **TIER 1 / DALGA 1 ✔:** tarif-liste (F2) · video-mutfagi (F3) · tarif-ekle (F5,
  form kiti) · mutfak-defteri (F7) — detay önceki handoff sürümünde / raporlarda.
- **TIER 2 / DALGA 2 (5 teammate, paralel) ✔ Beyar onaylı — 19 sayfa:**
  - **Keşif (F4):** `bugun-ne-pisirsem-v1` (wizard, tarif-ekle dili, R2 revize) ·
    `tarif-bulucu-v1` (**DOLAP deneyimi**: sol sticky akordeon raf paneli + sağ
    CANLI sonuç grid'i — 3 revize turuyla oturdu) · `haftalik-menu-v1` (YILDIZ m5:
    7g×3 board + kişi ölçekleme + **menüden türetilen canlı alışveriş listesi**) ·
    `kesfet-v1` (`?detay=1` toggle)
  - **Shop (F8):** `dada-shop-v1` · `urun-liste-v1` · `urun-detay-v1` (m19 tarif
    rayı) + **sepet izleri**: badge'li header sepet ikonu YALNIZ shop sayfalarında
    (bilinçli shell sapması), p-card sepete ekle + toast, `dmCart` mock
  - **Sağlık (F10):** `saglik-hub-v1` · `hesaplayici-v1` (×6'nın şablonu, BKİ) ·
    `saglik-testler-v1` (quiz) · `diyet-listeleri-v1` (m6 tanıtım) ·
    `besin-kutuphanesi-v1` (`?besin=1`)
  - **Diyetisyen public (F12a):** `diyetisyen-dizin-v1` · `diyetisyen-profil-v1`
    (`?randevu=1` slot modalı) · `diyetisyen-ol-v1` (diploma no, form kiti mirası)
  - **Landing (ara iş ①):** `kategori-v1` · `koleksiyon-v1` · `seo-landing-v1`
    (Airfryer + SSS) · `gunun-menusu-v1` (m11) — hepsi lst-hero koyu-overlay mirası
- **SİTE-İÇİ NAVİGASYON BAĞLI:** 26 dosyada chrome linkleri + v3a see-all/kartlar
  → site lokalden gerçek gibi gezilebilir. Bilinçli `#`: Mutfak Sırları ailesi (F11),
  Dada Akademi, Şef Ol, yasal/kurumsal (Tier 5), Sepete Git (Dalga 3).
  Araç: `mockups/.ss-scratch/navbind.py` (yeni sayfa eklenince yeniden koşulabilir).
- **Kapanış paketi ✔:** hero-üst nefes standardı (dada-shop + saglik-hub fix,
  kural kılavuz §3) · tarif-liste latent taşma fix portu · `.rv-*`→`.rev-*` ·
  v3a kart stopPropagation.
- Raporlar: `outputs/<teammate>-rapor.md` ×5 + **`outputs/dalga2-sentez.md`**
  (durumlar + karar kayıtları + SS yolları).

### Dalga 2'de kapanan kararlar (özet — tamamı sentez §4)
- Shop: vitrin hero statik ✔ · raylar 4'lü grid ✔ · stokta-yok "haber ver" ✔ ·
  m19 = editör seçkisi ✔
- Keşif: erişim = araçlar misafire açık, kaydet login ister ✔ · keşfet toggle ✔ ·
  raf taksonomisi ✔ · mock'lar (uyum skoru/reyon/otomatik oluştur) onaylı ✔
- Sağlık: besin toggle ✔ · app bandı patron kararı bekliyor (ekleme yok)
- Diyetisyen: facet ✔ · reklam atıldı ✔ · randevu/ödeme + diploma doğrulama = stack
- Landing: SSS grid altında ✔ · Günün Menüsü nav = Bugün Ne Pişirsem ✔ ·
  koleksiyon dizini hero altı ✔
- Yorum dili kanonik: TD `.rev-*` ✔

## ➡️ AÇIK İŞ — SIRADAKİ

**DALGA 3** (uretim-plani.md TIER 3 — scope kapanış paketiyle netleşti):
Shop II (sepet/ödeme/sipariş/alışveriş listesi, F9) · Mutfak Rehberi ailesi (F11) ·
Auth + onboarding + hesabım + bildirimler (F6) · **hesaplayıcı ×6 TAM SAYFA** ·
**tarif-bulucu alerjen/"İstemediklerim" filtresi** · **diyet program-detay** ·
pişirme modu derinleşmesi + yazdır (Dalga 1 ara işi). Dalga ritüeli aynı.

---

## 🏭 ÜRETİM STRATEJİSİ (Beyar kararı)

- **ODAKLI (babysit):** diyetisyen panel shell, reçete builder (TIER 4).
- **ŞABLON ONAYI:** hesaplayıcı ×6, yasal sayfalar.
- **TAM OTOMATİK (%90 reuse):** auth, onboarding, sözlük, püf, mutfağa giriş,
  ölçü birimleri, testler, Ramazan, bildirimler, hata, global arama.

---

## ⏳ PATRON KARARI BEKLEYENLER (değişmedi)

1. **Günün Tarifi bandının ana sayfadaki yeri** — iki koyu band ard arda.
2. **Mutfak Sırları arka plan videosu** — sabit foto mu, lazy-load mu.
3. **Mobil app tanıtım landing'i** gerekli mi (PDF m3) — sağlık app bandı buna bağlı.
4. **Reklam alanları olacak mı** (m29) — liste + diyetisyen dizini 728x90 mirası.
5. **EN dil stratejisi** — topbar'da dil seçici var; stack öncesi karar.
6. **Malzeme başı dış market "Sipariş Et" dropdown'ı** (eski site kalıbı).
7. **Video ray modeli** — Netflix bölüm rayı mı, seri-kapağı kartları mı (m13).

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/anasayfa-portal-v3a.html"   # site gezilebilir
```

- **Ortak paramlar (shell):** `?dd=1` mega+dil · `?drawer=1` · `?cc=1` · `?fb=1`
- **liste:** `?empty=1` · `?sheet=1` — **video:** `?seri=1` · `?short=1`
- **form:** `?step=1..4` · `?state=` · `?err=1` — **profil:** `?tab=` · `&empty=1` · `?flw=1`
- **tarif-detay:** `?swap=1` · `?bar=1` · `?cook=1` · `?shop=1`
- **bnp:** `?step=1..4` · `?sonuc=1` — **bulucu:** `?sheet=1` — **kesfet:** `?detay=1`
- **testler:** `?sonuc=1` — **besin:** `?besin=1` — **dizin:** `?sheet=1` `?empty=1`
- **profil (dyt):** `?tab=` · `?randevu=1` · `?msg=1` — **ol:** `?sent=1`
- Scratch SS: `mockups/.ss-scratch/` (gitignored). **Mobil SS:** headless Chrome
  min 500px — 500'de çek, 390 taşmazlığı JS probe ile (kılavuz §4).
- Video modal/dakış açıkken headless SS timeout verebilir — poster hâlde SS'le.
- Lead doğrulama tekniği: sayfa kopyasına probe `<script>` enjekte + `--dump-dom`
  + `document.title` okuma (browser MCP meşgulken işe yarar).
