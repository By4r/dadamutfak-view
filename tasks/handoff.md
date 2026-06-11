# DadaMutfak — HANDOFF · DALGA 1 TAMAMLANDI (Tier 1, Beyar onaylı)

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-11 (Dalga 1 kapanışı — 4 sayfa + shell + kılavuz commit'lendi)

---

## 🟢 MEVCUT DURUM

- **Kanonik baz:** `mockups/anasayfa-portal-v3a.html` — token/header/footer/mega
  menü her sayfaya BİREBİR. **Mega menü kilitli.**
- **Kanonik iskelet:** `mockups/_shell.html` — chrome + ortak JS; yeni sayfa =
  shell kopyası. Header varsayılan KATI (`heroMode` bayrağı sayfada açılabilir).
  `.below-header` = ilk section offseti (112px / mobil 62px).
- **Bileşen kılavuzu:** `tasks/bilesen-kilavuzu.md` — v3a satır no'ları + TD
  class referansları + dil kuralları. Her yeni sayfa buna birebir uyar.
- **TIER 0:** Ana sayfa (v3a) + Tarif Detay F1 (Tur 1+1.5+2) ✔
- **TIER 1 / DALGA 1 (4 teammate, paralel) ✔ Beyar onaylı:**
  - `tarif-liste-v1.html` (F2) — facet panel + r-card grid + boş durum + mobil
    sheet + **görsel+koyu-overlay hero** (krem denendi→REDDEDİLDİ; bu hero dili
    Dalga 2 landing'lerine örnek)
  - `video-mutfagi-v1.html` (F3, m13) — hub + seri detayı (JS toggle) + dikey
    9:16 Dada Akış (`?short=1`, ok+klavye+**mobil swipe** m28)
  - `tarif-ekle-v1.html` (F5) — 4 adımlı stepper + **form kiti doğdu**
    (`.fk-/.up-/.ie-/.st-` aileleri — envanter raporda; sonraki formlar miras
    alır) + durum bantları (`?state=`) + **malzeme autocomplete (havuz+serbest)**
    + adım görseli **max 3 slot**
  - `mutfak-defteri-v1.html` (F7, m8) — profil hero + 5'li sayaç + 6 sekme
    (`?tab=`, `&empty=1`) + takipçi modalı + **kompakt rozet teaser bandı**
    (büyük vitrin tonlandı, sekmelerin altında) + kaydedilen/favoride yazar
    satırı + puan→liderlik mock linki
- Raporlar: `outputs/<sayfa>-rapor.md` (L1 kıyas tabloları + karar ekleri içinde).

### Dalga 1'de kapanan kararlar
- Liste: "Yemek Modu" = Günlük Pratik/Misafir/Tek Tencere/Fırın/Airfryer ✔ ·
  ≤640 dikey mini kart ✔ · grid boyu seçici YOK ✔ · kart sayısı → stack
- Form: malzeme = havuz+serbest karma ✔ · adım görseli max 3 ✔ · kategori
  ÇOKLU (max 2; çoklu UI sonraki tur) · ONAYDA'da form KİLİTLİ (stack işi) ·
  Taslaklarım → Hesabım (stack)
- Profil: şef profili TEK ŞABLON ✔ · sahibi-görünümü aynı sayfa `?owner=1`
  (İLERİDE) · takipçi MODAL kalır ✔
- Video: seri detayı ayrı route stack işi, toggle kalır ✔
- SS altyapı bulgusu: **headless Chrome min pencere genişliği 500px** —
  390 SS'te sağ kenar kırpılması artifact'tir (kılavuz §4; lessons adayı)

## ➡️ AÇIK İŞ — SIRADAKİ

**DALGA 2** (uretim-plani.md TIER 2 + ARA İŞLER): Keşif & Planlama (F4) ·
Dada Shop (F8) · Sağlık (F10) · Diyetisyen public (F12a) · **5. teammate:**
kategori/koleksiyon/SEO landing + Günün Menüsü. Dalga 1 ritüeli uygulanır
(shell kopyası + kılavuz + L1 + SS + rapor).

---

## 🏭 ÜRETİM STRATEJİSİ (Beyar kararı)

- **ODAKLI (babysit):** diyetisyen panel shell, reçete builder (TIER 4).
- **ŞABLON ONAYI:** hesaplayıcı, koleksiyon/SEO landing, Shop ürün detay, yasal.
- **TAM OTOMATİK (%90 reuse):** auth, onboarding, sözlük, püf, mutfağa giriş,
  ölçü birimleri, keşfet, testler, Ramazan, bildirimler, hata, global arama.

---

## ⏳ PATRON KARARI BEKLEYENLER

1. **Günün Tarifi bandının ana sayfadaki yeri** — iki koyu band ard arda.
2. **Mutfak Sırları arka plan videosu** — sabit foto mu, lazy-load mu.
3. **Mobil app tanıtım landing'i** gerekli mi (PDF m3).
4. **Reklam alanları olacak mı** (m29 premium ile ilişkili) — **+ liste
   sayfasında reklam kutusu olsun mu (eski 728x90 mirası)**.
5. **EN dil stratejisi** — topbar'da dil seçici var; stack öncesi karar.
6. **Malzeme başı dış market "Sipariş Et" dropdown'ı** (eski site kalıbı).
7. **Video ray modeli** — Netflix bölüm rayı mı, seri-kapağı kartları mı (m13).

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/tarif-liste-v1.html"
```

- **Ortak paramlar (shell):** `?dd=1` mega+dil · `?drawer=1` · `?cc=1` · `?fb=1`
- **liste:** `?empty=1` boş durum · `?sheet=1` mobil filtre sheet
- **video:** `?seri=1` seri detayı · `?short=1` dikey Dada Akış
- **form:** `?step=1..4` · `?state=draft|review|rejected` · `?err=1` doğrulama
- **profil:** `?tab=tarifler|puf|kaydedilenler|denedikleri|favoriler|menuler`
  · `&empty=1` · `?flw=1` takipçi modalı
- **tarif-detay:** `?swap=1` · `?bar=1` · `?cook=1` · `?shop=1`
- Scratch SS: `mockups/.ss-scratch/` (gitignored). **390 SS uyarısı:** headless
  Chrome min 500px — mobil SS'i 500px'te al, 390 taşmazlığını JS probe ile doğrula.
- Video modal/dakis açıkken headless SS timeout verebilir — poster hâlde SS'le.
