# DadaMutfak — HANDOFF · DALGA 4 TAMAMLANDI — ÜRETİM BİTTİ 🏁

> Bu dosya **tek doğruluk kaynağı**dır. Beyar context temizledikten (clear) sonra
> yeni session bu dosyayı okuyup kaldığı yerden devam eder.
> Güncelleme: 2026-06-11 (Dalga 4 kapanışı — diyetisyen paneli + kapanış
> sayfaları, commit 2aac219 push'landı. TÜM ÜRETİM DALGALARI BİTTİ.)

---

## 🟢 MEVCUT DURUM — ÜRETİM TAMAMLANDI

- **Envanter: 61 üretim sayfası** = 59 ×`*-v1.html` + `anasayfa-portal-v3a.html`
  (kanonik baz) + `panel-shell.html` (diyetisyen paneli kanonik iskeleti).
  İskeletler: `_shell.html` (public) + `panel-shell.html` (panel).
- **Bileşen kılavuzu:** `tasks/bilesen-kilavuzu.md` — §2b/§2c miras + **§2e PANEL
  DİLİ** (Dalga 4'te doğdu). §2d (Dalga 3 adayları) HÂLÂ yazılmadı → cila turu.
- **TIER 0 ✔** v3a + Tarif Detay · **DALGA 1 ✔** liste/video/form/profil ·
  **DALGA 2 ✔** 19 sayfa · **DALGA 3 ✔** 18 sayfa + nav (commit 68b4e81) ·
  **DALGA 4 ✔ Beyar onaylı (commit 2aac219):**
  - **Panel ailesi (F12b+c):** `panel-shell` (koyu sidebar + topbar + yeşil aksan
    kart dili) · `dyt-randevular` (haftalık takvim, `?gorunum=gun` `?detay=1`) ·
    `dyt-danisanlar` (`?danisan=1` detay + SVG kilo eğrisi, `?kart=1` `?bos=1`) ·
    `dyt-mesajlar` (iki kolon sohbet, `?bos=1` `?sohbet=1`) · `dyt-receteler` ·
    `dyt-recete-builder` (7g×5 öğün board, CANLI kcal/makro, `?sablon=1..3`) ·
    `dyt-profil-ayar` (`?tab=profil|hizmet|takvim|ayarlar`)
  - **Kapanış (Tier 5 / F13):** `hakkimizda` (#kunye entegre) · `iletisim` (`?ok=1`) ·
    `reklam-ver` (`?ok=1`) · `yasal` (`?metin=kvkk|aydinlatma|kullanim|cerez|uyelik|
    mesafeli|iade|teslimat|bilgilendirme`) · `hata` (`?kod=404/500` CSS illüstrasyon) ·
    `arama` (`?q=` `?tab=` `?empty=1`) · `sezon` (Ramazan şablonu) · `sss` (`?kat=`,
    lst-top koyu hero — Beyar revizesiyle hizalandı)
  - **Navigasyon:** diyetisyen-profil → "Diyetisyen Paneli" girişi (`.pf-panel`) ·
    header büyüteç → arama-v1 (51 dosya) · footer 14 kırık link → gerçek (53 dosya,
    kapanis2 denetimi) · Künye → `hakkimizda-v1.html#kunye` · 3 tıklama yolculuğu
    headless click probe ile PASS
- Raporlar: `outputs/{panel1,panel2,kapanis1,kapanis2}-rapor.md` +
  **`outputs/dalga4-sentez.md`** (sayfa durumları + 22 açık soru + SS yolları)

## ➡️ KALAN TEK İŞ — FİNAL CİLA TURU (lead + Beyar, yeni üretim dalgası YOK)

1. **Açık soru cevapları → mini revizeler:**
   - Dalga 3: **18 soru** (`outputs/dalga3-sentez.md` §3 — sosyal login seti,
     fatura görünümü, TTS, püf yorumları, header zili, bebek BMH vb.)
   - Dalga 4: **22 soru** (`outputs/dalga4-sentez.md` §3 — persona Yıldırım/Şahin,
     aylık takvim v2, yasal metin hukukçu onayı, "Şef Ol" hedefi, builder↔kalori
     hesaplayıcı köprüsü, grid-4 tablet kuralının master'a portu vb.)
2. **Beyar SS turu notları** → seri revize
3. **Kılavuz §2d** (Dalga 3 bileşen adayları: tgl, fk-pass, pick-card, sum-card,
   tml, ost, az-bar, term-row, lvl, kcal-bands, au-*, ntr) yazılır
4. **Kozmetik/taşan işler:** pişirme modu derinleşmesi + yazdır görünümü (Dalga 1
   taşanı) · sepet boş-alan kozmetiği · haftalık menü→alışveriş listesi köprüsü
   (yeni UI, Beyar onayı şart) · hesaplayici-v1 footer eksiği (Dalga 4 soru #20)
5. Cila sonrası: **stack kararı** (Laravel mi, statik mi — CLAUDE.md gereği ayrı
   konuşma) + EN dil stratejisi

---

## ⏳ PATRON KARARI BEKLEYENLER (değişmedi)

1. Günün Tarifi bandının ana sayfadaki yeri (iki koyu band ard arda)
2. Mutfak Sırları arka plan videosu (statik foto ile çözüldü, video beklemede)
3. Mobil app tanıtım landing'i (m3) — sağlık app bandı buna bağlı
4. Reklam alanları (m29) — Dalga 4'te reklam-ver sayfası doğdu, alan yerleşimi bekliyor
5. EN dil stratejisi — stack öncesi karar
6. Malzeme başı dış market "Sipariş Et" dropdown'ı
7. Video ray modeli (m13)

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/anasayfa-portal-v3a.html"   # site gezilebilir
open "http://localhost:8765/mockups/panel-shell.html"           # diyetisyen paneli
```

Canlı (Pages): https://by4r.github.io/dadamutfak-view/mockups/<sayfa>.html

- **Ortak (public shell):** `?dd=1` mega+dil · `?drawer=1` · `?cc=1` · `?fb=1`
- **Panel shell:** `?nav=1` mobil sidebar açık
- **Dalga 1-3 paramları:** önceki handoff sürümlerine değil sentezlere bak
  (`outputs/dalga2-sentez.md` / `dalga3-sentez.md`)
- **Dalga 4:** randevular `?gorunum=gun` `?detay=1` · danisanlar `?danisan=1`
  `?kart=1` `?bos=1` · mesajlar `?bos=1` `?sohbet=1` · builder `?sablon=1..3` ·
  profil-ayar `?tab=` · yasal `?metin=` · hata `?kod=404/500` · arama `?q=` `?tab=`
  `?empty=1` · sss `?kat=` · iletisim/reklam-ver `?ok=1`
- Scratch SS: `mockups/.ss-scratch/` (gitignored). **Mobil SS:** headless Chrome
  min 500px — 500'de çek, 390 taşmazlığı iframe probe ile (kılavuz §4).
- Lead doğrulama tekniği: error probe enjekte + `--dump-dom` + iframe click-journey
  probu (`.ss-scratch/.journey.html` deseni). Kabul SS'leri sohbette Read ile açılır
  (Beyar mobilden izliyor).
