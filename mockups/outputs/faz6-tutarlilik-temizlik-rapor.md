# FAZ 6 — T5 Tutarlılık Temizlik Raporu

> Sahip: tutarlilik-temizlik · Tarih: 2026-06-13 · COMMIT YOK (talimat gereği)
> Kanıt: GLOBAL grep + idempotency md5(numstat) + izole channel:chrome sticky probe
> (MCP playwright KULLANILMADI — lead rezerve). Sunucu: localhost:8765.

---

## İŞ 1 — DADASTORE TUTARLILIK ✅

**Kanon = DadaStore** (291 bitişik baskın). 42 adet boşluklu "Dada Store" → "DadaStore".

- **Yöntem:** `perl -i -pe 's/Dada Store/DadaStore/g'` (byte-mod, `-CSD` YOK — lessons;
  "Dada Store" zaten saf ASCII, mojibake riski yok ama yine de byte-mod + teyit).
- **Değişen 14 dosya:** akademi-v1, arama-v1, dada-shop-v1 (6×), hesabim-v1, hakkimizda-v1,
  odeme-v1 (4×), onboarding-v1, siparislerim-v1, urun-liste-v1 (6×), tarif-detay-v1-headA (2×),
  tarif-detay-v1, sepet-v1 (5×), urun-detay-v1 (6×), yasal-v1 (6×).
- **Link href'leri korundu** (dada-shop-v1.html aynen) — sadece görünen isim + aria-label + title
  + gövde metni hizalandı.
- **anasayfa DadaShop kartı:** "Tamamını Gör" → `dada-shop-v1.html` ZATEN doğru (değişiklik gerekmedi).
- **anasayfa shop section eyebrow (satır 2548):** lead onayıyla "Dada Shop" → **"DadaStore"** hizalandı
  (marka kapısıyla tutarlılık). GLOBAL grep `'Dada Shop'` (anasayfa) = 0.

**KANIT:**
- GLOBAL grep `grep -rn 'Dada Store' *.html` (excl _shell) = **0 dosya** ✅
- Idempotent: ikinci `perl` koşusu sonrası `md5(git diff --numstat)` **before==after** ✅
- Mojibake taraması (`grep -rl 'Å'`) = **temiz**; hexdump byte teyidi: `(DadaStore)` = saf ASCII ✅
- numstat: tüm değişiklikler **1:1 satır-içi** (satır ekleme/silme yok) ✅

---

## İŞ 2 — KRONİK DRIFT (Tarifler alt-menüsü) ✅

**Hedef:** mutfaga-giris-v1 + olcu-birimleri-v1 — Tarifler dropdown (`.mega-cats`) + drawer
(`.d-sub`). Bu 2 sayfa Faz-4 ve Faz-5'te kronik kaçtı (lessons'ta belgeli divergent küme).

**Bulunan drift (Tarifler menüsü):** sadece etiket değil, TÜM menü eski/divergent sürümdü —
yanlış etiketler (Çorbalar / Ana Yemekler / Et Yemekleri / Tatlılar / Hamur Tatlısı /
Salatalar & Mezeler / Zeytinyağlılar / İçecekler / Vejetaryen & Vegan / Aperatifler) **+**
eksik `?kategori=` href, `data-slug`, `title` attribute'ları.

**Kanonik kaynak:** `anasayfa-portal-v3a` Tarifler dropdown'ı (non-self sayfa → href'ler
tarif-liste'ye `?kategori=` ile çıkıyor; tarif-liste-v1'in kendi mega menüsü `href="#"` self
kullandığı için kaynak olarak anasayfa seçildi). kategori-veri.md §1 isimleriyle teyit.
Uygulanan set (11 kat + Tüm Tarifler): **Çorba, Kırmızı Et, Beyaz Et, Tatlı, Hamur İşi, Kek,
Salata, Kahvaltılık, Zeytinyağlı, İçecek, Vegan ve Vejetaryen**.

- Her iki dosyada **dropdown + drawer** (4 blok) AYNEN değiştirildi (Edit tool — UTF-8 native,
  perl -CSD tuzağı baypas).

**KANIT:**
- GLOBAL grep `grep -rln 'Ana Yemekler' *.html` = **0 dosya** ✅ (en ayırt edici drift etiketi
  yalnız bu 2 sayfanın nav'ındaydı → tamamen silindi).
- mutfaga/olcu nav'ında eski etiket (Çorbalar/Et Yemekleri/Tatlılar/Hamur Tatlısı/Zeytinyağlılar/
  İçecekler/Aperatifler) = **0** ✅
- Kanonik kanıt: her iki dosyada `data-slug=` sayısı **22** (11 dropdown + 11 drawer) ✅
- Mojibake taraması = temiz ✅

---

## İŞ 3 — STICKY CLIP YAYILIMI ✅

**Kök neden (faz5-revize lessons):** her mockup'ta page-local `html,body{overflow-x:hidden}`
→ tarayıcı `overflow-y`'yi `auto`'ya hesaplar → BODY scroll-container olur → `position:sticky`
yan paneller/bar'lar SESSİZCE yapışmaz. **Fix:** page-local `html,body{overflow-x:clip}` override
(diyetisyen-ol/sef-ol referans pattern'ı; line 439 hidden korunur, sonrasına clip eklenir →
cascade ile clip kazanır; clip yatayı keser ama overflow-y:visible bırakır → sticky diriltir).

**PROBE (izole channel:chrome, Node playwright — MCP değil):** her aday sayfada `position:sticky`
panelin engage noktasına `mouse.wheel` ile scroll + `getBoundingClientRect().top == sticky-offset`
mı? Sanity-check: diyetisyen-ol/sef-ol (zaten fix'li) → STICK-OK; kategori-v1 (fix'siz) → BROKEN.
**Probe altyapı tuzağı yakalandı:** persistent-profil disk cache eski sürümü servis edip false-BROKEN
verdi → `?cb=` cache-buster ile çözüldü (lessons: probe-infra sanity ön şart).

### Sticky Probe Tablosu (fix SONRASI, cache-busted)

| Sayfa | sticky panel | offset | mid-scroll top | sonuç |
|---|---|---|---|---|
| kategori-v1 | .lst-side | 130 | 130 | STICK-OK |
| haftalik-menu-v1 | .shop-summary | 130 | 130 | STICK-OK |
| alisveris-listesi-v1 | .shop-summary | 130 | 130 | STICK-OK |
| mutfaga-giris-v1 | .gnav | 112 | 112 | STICK-OK |
| olcu-birimleri-v1 | .seo-aside | 128 | 128 | STICK-OK |
| mekan-liste-v1 | .lst-side | 130 | 130 | STICK-OK |
| mekan-detay-v1 | .pf-tabbar | 112 | 112 | STICK-OK |
| seo-landing-v1 | .lst-side | 130 | 130 | STICK-OK |
| reklam-ver-v1 | .rv-side | 130 | 130 | STICK-OK |
| mutfaga-giris-detay-v1 | .ld-aside | 128 | 128 | STICK-OK |
| puf-noktasi-detay-v1 | .mod-share | 128 | 128 | STICK-OK |
| mutfak-defteri-v1 | .pf-tabbar | 112 | 112 | STICK-OK |
| diyetisyen-profil-v1 | .pf-tabbar | 112 | 112 | STICK-OK |
| diyetisyen-dizin-v1 | .lst-side | 130 | 130 | STICK-OK |
| hesabim-v1 | .pf-tabbar | 112 | 112 | STICK-OK |
| sss-v1 | .pf-tabbar | 112 | 112 | STICK-OK |
| diyet-listeleri-v1 | .dl-filter | 112 | 112 | STICK-OK |
| puf-noktasi-ekle-v1 | .tips-col | 132 | 132 | STICK-OK |
| ansiklopedi-detay-v1 | .seo-aside | 128 | 128 | STICK-OK |
| arama-v1 | .pf-tabbar* | 112 | (is-off default) | fix uygulandı |

\* arama-v1 pf-tabbar varsayılan `display:none` (is-off); arama sonucu durumunda görünür olup
mutfak-defteri pf-tabbar'ı VERBATIM (o BROKEN doğrulandı) → fix uygulandı.

**Toplam 20 sayfaya clip fix uygulandı.** (+2 zaten fix'li diyetisyen-ol/sef-ol; tarif-liste-v1
T3'e ait, T3 kendi clip'ini ekledi — DOKUNULMADI.)

### Bilinçli ATLANAN adaylar (gerçekten kırık sticky YOK)
- **koleksiyon-v1** — hiç `position:sticky` yok.
- **diyet-program-detay-v1** — yalnız `.wk-mealcol/.wk-corner` (yatay `left:0` sticky, tablo
  içi; dikey body-scroll-container bug'ından ETKİLENMEZ).
- **hakkimizda-v1** — `.about-figs` parent'ı elemandan yalnız 11px uzun (sticky travel ≈ 0 →
  görsel etkisi yok, fix gereksiz/gratuitous olurdu → atlandı).

**KANIT (clip yan etki kontrolü):**
- Idempotent: re-run patch (tümü skip) → `md5(numstat)` before==after ✅
- **390px element-rect taşma probe:** 20 sayfada `scrollWidth=390` (sayfa-düzeyi yatay taşma=0).
  Worst-offender'lar (`.r-card/.subcat/.rstep/.wk-grid/.nut-table`) tasarım gereği yatay scroll
  kapsayıcıları içinde (`.subcat-track:ovx=auto`, `.tbl-scroll:ovx=auto` vb. — hiçbiri body'ye
  ulaşmıyor) → clip yatay kesimi BOZMADI (clip ≡ hidden, sadece overflow-y farkı) ✅

---

## BİLİNEN SINIRLAMALAR

1. **"DadaShop" / "Dada Shop" ayrı varyantı (kapsam DIŞI, FLAG):** "Dada Store"dan ayrı bir
   isim var: (a) feedback widget chip'leri `DadaShop` (55+ sayfada GLOBAL CHROME — _shell kaynaklı,
   dokunulmadı); (b) anasayfa shop section eyebrow'u `Dada Shop`. Bunlar "Dada Store" DEĞİL →
   replace mandate'imde değil + global chrome (lessons: ortak chrome faz-sonu tek sweep'te).
   **Beyar kararı:** DadaStore markasıyla birleştirilsin mi? Ayrı bir chrome-sweep işi olur.

2. **"Çorbalar/Tatlılar" içerik (NAV DEĞİL) kalıntıları — meşru, dokunulmadı:** Global grep hâlâ
   bu kelimeleri buluyor AMA hiçbiri Tarifler menüsü değil; sınıflandırma:
   - **Prose (gramer çekimi):** ansiklopedi-v1 ("Tatlılarda"), sozluk-v1 ("Tatlılara"),
     gunluk-su-v1 ("Çorbalar, kompostolar…"), reklam-ver-v1 (örnek metin "Tatlılar reyonu") →
     cümle içi, değiştirilemez.
   - **Özel koleksiyon adları:** sezon-v1 "Ramazan Tatlıları" / "İftar Çorbaları" → farklı kelime.
   - **r-chip / puf-tag çoğul aykırıları:** hata-v1, mekan-detay-v1 (r-chip), mutfak-defteri-v1
     (puf-tag) "Çorbalar"/"Tatlılar". Başlangıçta "ikincil drift adayı" diye flag'lemiştim;
     **lead KARARI: bunlar meşru içerik, DOKUNMA** — değiştirmedim. ✅
   - **LEAD ONAYLI MEŞRU-İÇERİK BEYAZ LİSTESİ (8 dosya, drift DEĞİL):** ansiklopedi-v1, gunluk-su-v1,
     hata-v1, mekan-detay-v1, mutfak-defteri-v1, reklam-ver-v1, sezon-v1, sozluk-v1. İş sonrası
     drift GLOBAL grep'i (`Çorbalar|Tatlılar`) = TAM OLARAK bu 8 dosya (mutfaga/olcu NAV'ında 0) →
     lead kabul kriteriyle birebir eşleşti. ✅
   - **NOT:** Tarifler-MENÜSÜ drift'i (en ayırt edici `Ana Yemekler` dahil) GLOBAL grep'te **0**.

3. **puf-noktasi-detay-v1 ikinci `.mod-share`:** probe'da actualY=0 (sayfa sonuna scroll edilemedi,
   ölçüm aralık-dışı artefakt) — birincil `.mod-share` STICK-OK; sayfaya clip uygulandı.

4. **Render SS yok:** lead faz-sonu MCP turuna bırakıldı (channel:chrome ile pixel-paint kanıt
   bende mevcut değil; probe geometri/CSSOM tabanlı). Tasarım-gözü görsel inceleme lead'de.

5. **Reprodüksiyon araçları:** `outputs/_sticky_probe.mjs` (sticky engage probe) +
   `outputs/_ovf390.mjs` (390 taşma probe) bırakıldı (geçici, `_`-prefix).

---

## ÖZET KANIT TABLOSU

| İş | Global grep | Idempotency | Ek kanıt |
|---|---|---|---|
| 1 DadaStore | "Dada Store"=0 | md5 before==after ✅ | mojibake temiz, 1:1 numstat |
| 2 Drift | "Ana Yemekler"=0 | (Edit, tekil) | data-slug=22/dosya, mojibake temiz |
| 3 Sticky | clip=20 sayfa | md5 before==after ✅ | probe 19/19 STICK-OK + 390 taşma=0 |
