# CİLA-2 Faz 5 — Header Teammate Raporu

**Görev #1:** Site geneli chrome — siyah üst bant (topbar) yeniden düzeni +
Tarifler dropdown standardı. frontend-design skill kullanıldı.

**Durum:** TAMAMLANDI. `_shell.html` (master) + `tarif-liste-v1.html` + site
geneli konsolide sweep KOŞULDU (lead green-light, 58 dosya) ve faz-sonu denetim
checklist'inden geçti. Konsolide sweep 3 işi birden yaydı: topbar markup +
`.tb-world` CSS-INSERT + 22 kategori href + 53 "Alışveriş Listem" link (defter #6).

### FAZ-SONU DENETİM SONUCU (sweep koşuldu)
- **İdempotent:** checksum(tüm html) önce==sonra özdeş (re-run 0 yazma); çift-ekleme 0.
- **Negatif grep:** topbar Testler=0, mega kategori-v1(data-slug)=0, "Menülerim
  VAR + Alışveriş Listem YOK" login-state=0.
- **Sızıntı:** shop(5)+akademi-v1+headA → tb-worlds=0 VE Alışveriş Listem=0.
- **Silinen-CSS:** sweep-imzalı selector silinen=0 (hepsi INSERT). git diff'teki
  diğer silinen CSS (.mode-chip/.shop-back/.trust-band) = eşzamanlı teammate
  edit'leri (bnp-akis #5, shop-cila #3), sweep dışı — doğrulandı.
- **Numstat net-negatif:** sweep'ten 0 (4 net-neg shop dosyası = shop-cila .shop-back
  kaldırması; sweep imzası 0).
- **4-aile render:** v3a + tarif-liste + saglik-hub + sozluk → worlds=2, store
  görünür, mega→?kategori, page-CSS sağ.
- **Uyarı:** bugun-ne-pisirsem-v1'de bnp-akis(#5) eşzamanlı edit'leri var; sweep
  korudu ama #5 stale buffer'dan tekrar yazarsa eklemeler silinebilir — lead'e
  bildirildi (gerekirse o dosyada idempotent re-run).

---

## 1) Topbar (siyah üst bant) yeniden düzeni — `_shell.html` ~696-734

**Yapılan:**
- **"Tarif Ekle" + "Testler" üst banttan KALDIRILDI** (yer açıldı). Bu linkler
  mega menü / drawer / Ekle▾ menüsünde DURUYOR (teyit: `tarif-ekle-v1.html` ×2,
  `saglik-testler-v1.html` ×1 hâlâ shell'de — mega Sağlık dropdown'ı + Ekle menüsü).
- **DadaStore + DadaAkademi markalı "dünya kapısı" butonları** sağ tarafa eklendi:
  - **DadaStore** → `dada-shop-v1.html` — domates dünyası: `rgba(225,72,39,.18)`
    tint zemin + domates border + sıcak ikon (`fa-bag-shopping`), hover'da dolu
    domates + sağ ok belirir.
  - **DadaAkademi** → `akademi-v1.html` — petrol dünyası: `rgba(0,96,114,.30)`
    tint + camgöbeği border + petrol ikon (`fa-graduation-cap`) + "YAKINDA" rozeti,
    hover'da dolu petrol (`--c-petrol`). İki ayrı dünya iki ayrı sıcak/serin renkle
    ayrışıyor.
  - Token disiplini: `--radius-sm` (pill YASAK), `--ease`, `--c-petrol` (kılavuz
    kurumsal renk). Yeni renk icat edilmedi.
- **tb-left** (48.200+ tarif sayısı + sosyal) ve **tb-lang** (dil menüsü) KORUNDU.
- **Diyetisyen Ara** topbar'da `.tb-util` olarak kaldı (dünya kapılarının solunda,
  ayraçla); denge: sol=sayaç/sosyal, sağ=diyetisyen · 2 dünya · dil.

**Kanıt (canlı playwright DOM evaluate, `_shell.html`):**
```
topbarText: "48.200+ denenmiş tarif Diyetisyen Ara DadaStore DadaAkademi YAKINDA EN"
topbarHasTarifEkle: false   topbarHasTestler: false
DadaStore : bg rgba(225,72,39,.18)  border .46  h=27px  visible ✓  → dada-shop-v1.html
DadaAkademi: bg rgba(0,96,114,.30)  border camgöbeği  h=27px  visible ✓  → akademi-v1.html
```

**Mobil:** topbar ≤640 zaten gizli (`.topbar{display:none}`) — bozulma yok. Yeni
butonların drawer karşılığı VAR: drawer nav'da "Dada Store" + "Dada Akademi
(Yakında)" öğeleri duruyor (satır ~876-877). Tablet ≤1024'te topbar görünür kalır,
butonlar tek satır kompakt (sığar).

---

## 2) Tarifler dropdown standardı — kategori = "Tüm Tarifler" düzeni

**Sorun:** Mega "Tarifler" dropdown'ında kategoriler `kategori-v1.html`'e
(ayrı sayfa/düzen) gidiyordu; "Tüm Tarifler" ise `tarif-liste-v1.html`'e. Farklı
düzenler.

**Çözüm:** Kategori linkleri `tarif-liste-v1.html?kategori=<slug>` düzenine
hizalandı (mega + drawer, 22 link `_shell.html`'de). Artık kategori tıklaması
"Tüm Tarifler" ile **AYNI liste düzenine** gidiyor, kategori filtreli.

- `tarif-liste-v1.html`'e **savunmacı (try/catch) `?kategori` okuyucu** eklendi
  (+29 satır, mevcut hero-chip hook'unun birebir kardeşi): slug→facet value
  eşlemesi (11 kategori), kategori facet'ini ön-aktif eder, gizli (`xtra`)
  kategoride `more-open` açar. Hata sayfayı BOZMAZ; eşleşmeyen slug sadece tüm
  listeyi gösterir.

**Kanıt (canlı playwright):**
```
?kategori=corba-tarifleri → Çorba checkbox checked, aktif chip "Çorba" ✓
?kategori=kek-tarifleri (gizli/xtra) → more-open açıldı, satır görünür, checked ✓
konsol hatası: 0
```

---

## 3) FAZ-SONU SWEEP — HAZIR, ÇALIŞTIRILMADI

**Script:** `mockups/outputs/cila2-faz5-header-sweep.py` (idempotent).
Yapar: (a) topbar tb-right yeniden düzeni, (b) `.tb-world` CSS **INSERT**
(region-swap DEĞİL), (c) kategori href `kategori-v1.html`→`tarif-liste?kategori=`.

**Çalıştırma (lead green-light sonrası, `mockups/` kökünden):**
```
python3 outputs/cila2-faz5-header-sweep.py --dry   # önizleme
python3 outputs/cila2-faz5-header-sweep.py         # uygula
```

**Disiplin (lessons.md uyumlu):** idempotent guard'lar · tb-right **span-guard**
(>800b ABORT) · **CSS-INSERT** (yutma riski yok) · TR karakter Python utf-8
(perl -CSD YOK) · divergent topbar sayfaları EXCLUDE.

**EXCLUDE (topbar'a dokunulmaz — bilinçli kabuk sapması, başka teammate sahibi):**
- Shop ailesi: `dada-shop-v1, urun-liste-v1, urun-detay-v1, sepet-v1, odeme-v1`
  (kendi topbar'ı: "Sipariş Takibi / Yardım" — shop-cila dünyası).
- `akademi-v1` (akademi-kabuk teammate kendi topbar'ını kuruyor: "Erken Kayıt / SSS").
- `tarif-detay-v1-headA` (deneysel head varyantı).
- Bu sayfalarda kategori href fix de gerekmez (recipe mega menüsü taşımıyorlar).

**SANDBOX'TA KANITLANDI** (gerçek dosyalara dokunmadan, /tmp kopyada sweep koşuldu
+ render-probe):
- 58 dosya doğru dokunuldu; mega-format `kategori-v1` kalan = **0**.
- Negatif grep: topbar'da "Testler/Tarif Ekle" kalan = 0 (exclude hariç).
- Sızıntı grep: `tb-worlds` shop/akademi/headA'ya **sızmadı** (0).
- **CSS hayatta-kalma:** v3a swept'te `.searchcard` + `.r-card` page-CSS kuralları
  CSSOM'da SAĞ — CSS-INSERT sayfa CSS'ini yutmadı (lessons R1 vakası tekrarlamadı).
- 3 ailede (v3a hero / saglik-hub yeşil-hub / sozluk rehber) topbar render-probe:
  worlds=2, doğru renkler, mega→`?kategori`, "Testler" yok. ✓

**Stale-mega istisnası:** `mutfaga-giris-v1` + `olcu-birimleri-v1` ESKİ mega menü
taşıyor (data-slug YOK, farklı etiketler "Çorbalar/Ana Yemekler"). Bunların bare
`kategori-v1.html` linkleri düz `tarif-liste-v1.html`'e çevrilir (param'sız;
slug türetilemiyor). Stale ETİKETLER düzelmez (ayrı chrome-resync işi — aşağı bak).

---

## Bilinen Sınırlamalar (ZORUNLU — peşinen)

1. **Site geneli topbar+dropdown HENÜZ SADECE `_shell.html`'de aktif.** Diğer 57
   üretim sayfasında ESKİ topbar (Tarif Ekle/Testler) + kategori→`kategori-v1.html`
   DURUYOR. Beyar `saglik-hub-v1` / `sozluk-v1` / herhangi bir sayfayı açarsa eski
   topbar'ı görür — bu BEKLENEN, sweep faz sonu koşacak. (Sandbox'ta yeni hâli
   kanıtlandı.)
2. **Pixel ekran görüntüsü alınamadı (altyapı).** Hem playwright-mcp SS (5s backend
   timeout, "fonts loaded" sonrası encode takılıyor) hem headless Chrome `--headless=new`
   bu sayfaların `position:fixed` + `backdrop-filter:blur` chrome'unu güvenilir
   PAINT etmiyor (içerik üste kayıyor; izole render'da topbar yüksekliği çöküyor).
   Bu lessons.md "Headless/iframe probe altyapı tuzakları — Chrome 149" notuyla
   uyumlu. **Doğrulama canlı DOM evaluate ile yapıldı** (computed-style + rendered
   geometry — pixel'den daha kesin). Beyar gerçek tarayıcıda `_shell.html?dd=1`
   açarsa topbar'ı canlı görür (render teyitli çalışıyor).
3. **`?kategori` + demo "mantı" araması üst üste biner.** `tarif-liste-v1` mock'u
   varsayılan "mantı" arama chip'iyle geliyor; `?kategori=corba` ile gelince aktif
   chipler "mantı" + "Çorba" olur. "Tüm Tarifler" de aynı "mantı" demo'sunu
   gösterdiği için TUTARLI; gerçek implementasyonda kategori landing temiz açılır.
4. **`tarif-liste-v1` hero başlığı statik** ("mantı araması için") — `?kategori`
   ile değişmiyor (hero markup'ına dokunulmadı, kapsam dışı). Aktif filtre chip'i +
   filtreli sonuç kategori bağlamını veriyor.
5. **İçerik linkleri (breadcrumb / "Tamamını Gör") `kategori-v1.html`'de bırakıldı**
   — örn. `anasayfa-portal-v3a` see-all, `tarif-detay-v1` breadcrumb "Hamur İşi".
   Görev DROPDOWN kapsamı; içerik linkleri ayrı tutarlılık kararı. `kategori-v1.html`
   sayfası hâlâ mevcut (orphan değil). Lead site-geneli `kategori-v1` deprecation
   isterse ayrı iş.
6. **Stale mega chrome (2 sayfa):** `mutfaga-giris-v1` + `olcu-birimleri-v1` eski
   kategori etiketli mega taşıyor (önceki bir sweep'te ıskalanmış). Sweep linklerini
   liste düzenine çeker ama ETİKETLERİ güncel mega ile eşitlemez — ayrı chrome-resync
   adayı (lead kararı).
7. **Dünya kapıları nav'da da var:** "Dada Store" + "Dada Akademi" hem yeni topbar
   butonu hem header nav öğesi. Bilinçli (topbar=kalıcı geçiş, nav=gezinme). Lead
   dedupe isterse ayrı karar.

## Faz-sonu sweep talimatı (lead'e)
1. Diğer teammate'ler (akademi-kabuk #2 dahil) dosyalarını kapatınca koş.
2. `--dry` ile önizle → 58 dosya, EXCLUDE listesi doğru mu teyit.
3. Uygula → negatif grep (topbar Testler=0) + sızıntı grep (tb-worlds shop=0) +
   numstat (net-negatif 0) + `git diff -U0 | grep '^-.*{'` (silinen CSS=0) +
   4 aileden render-probe (v3a/saglik/sozluk/bir-form).
4. **v3a + tarif-detay özel render-probe** (lessons: divergent CSS sıralaması) —
   sandbox'ta CSS-INSERT güvenli çıktı ama canlıda da teyit et.
5. akademi-kabuk + shop-cila ile **dünya-kapısı renk/marka uyumu** koordine et
   (DadaStore=domates, DadaAkademi=petrol seçimim — onların kabuk renkleriyle çelişmesin).
