# DadaMutfak — HANDOFF · F1 Tarif Detay

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-11

---

## 🟢 MEVCUT DURUM

- **Research fazı tamamlandı ve denetlendi:**
  - `tasks/research-sistem.md` — senaryo/sistem anlayışı, ~60-65 ekranlık
    **denetlenmiş** sayfa envanteri (4 kaynağa karşı teyitli), bileşen envanteri
    (v3a'da var / yeni), kaynaklı modül listesi, bağlayıcı tutarlılık kuralları
  - `tasks/workflow-fazlar.md` — 13 fazlık tasarım sırası (≈15-16 oturum,
    faz sonu SS + handoff + commit + onay kapısı)
- **Ana sayfa onaylı:** `mockups/anasayfa-portal-v3a.html` — **KANONİK BAZ.**
  Her yeni sayfa token bloğunu, header'ı, footer'ı, mega menüyü buradan
  **BİREBİR** alır; lokal değişiklik yasak. **Mega menü kilitli.**
  Canlı: https://by4r.github.io/dadamutfak-view/mockups/anasayfa-portal-v3a.html
- Rakip analizi PDF'i projeye kopyalandı:
  `drive-download-20260608T070112Z-3-001/dadamutfak_rakip_analizi_gelisim_raporu.pdf`

---

## ➡️ SIRADAKİ İŞ — F1 TARİF DETAY (Beyar onaylı başlangıç)

- **Kapsam:** `tasks/workflow-fazlar.md` F1 + `tasks/research-sistem.md`
  §2.2 "Tarif detay" maddesi.
- **Tek dosya:** `mockups/tarif-detay-v1.html`
- **İki turlu üretim stratejisi:**
  - **TUR 1 — çekirdek:** hero/galeri, etiketler (Dada Denedi/Editör Onaylı...),
    künye, porsiyon ayarlı malzeme listesi + **ikame popover** (patron m18),
    adım kartları, besin tablosu, yazar kutusu, breadcrumb, sticky aksiyon barı,
    benzer tarifler → **Beyar SS onayı**
  - **TUR 2 — sosyal katman:** **"Ben de Yaptım" foto duvarı** (patron m2),
    fotoğraflı yorum + yıldız dağılımı, editör notu kutusu, tarif→Shop rayı
- **Çalışma kuralları:**
  - Plan mode ile başla; **plan onayı olmadan implement yok**
  - **frontend-design skill** kullan
  - Headless SS ile kendi kendini doğrula (v3a ile header/footer/token piksel
    uyumu dahil)
  - **Commit/push sadece Beyar onayıyla**; iş bitince DUR

---

## ⏳ PATRON KARARI BEKLEYENLER

1. **Günün Tarifi bandının ana sayfadaki yeri** — iki koyu band ard arda geliyor.
2. **Mutfak Sırları arka plan videosu** — sabit foto mu, lazy-load mu.
3. **Mobil app tanıtım landing'i** gerekli mi (PDF m3).
4. **Reklam alanları olacak mı** (m29 premium "reklamsız kullanım" ile ilişkili).
5. **EN dil stratejisi** — topbar'da dil seçici var; stack fazından önce karar.

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/anasayfa-portal-v3a.html"

# headless SS parametreleri (v3a): ?ss=1 (video→poster) · ?fp=1 (hero cap, full-page SS) ·
# ?hdr=solid (katı header) · ?dd=1 (mega menü + dil dropdown açık) ·
# ?drawer=1 (mobil drawer) · ?cc=1 (çerez banner zorla) · ?fb=1 (görüş bildir modal)
```
