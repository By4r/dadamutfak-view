# Faz 5 Revize — Header Fix (T1): Duplicate Menü Temizliği

> Teammate: header-fix · Takım: faz5-revize · Tarih: 2026-06-13
> Görev: DadaStore + DadaAkademi'nin ana menü çubuğundaki ÇİFT (nav-item)
> tekrarını kaldır; markalı topbar kapısı (tb-world) tek kalsın.

## Durum: FAZ 1 + FAZ 2 TAMAM ✅ — KANITLI KABUL

---

## FAZ 2 YÜRÜTME SONUCU (lead "sweep go" sonrası — UYGULANDI)

**Adım 1 — bnp 3 dosya son anchor teyidi (büyük yazım sonrası):**
bugun-ne-pisirsem / haftalik-menu / alisveris-listesi → hepsinde D1=1 D2=1
drawerLang=1 cssAnchor=1 hasMega=1 done=0 → TÜM ANCHOR YERİNDE (bnp chrome'a
dokunmamış), sweep güvenli.

**Adım 2 — apply:** `sweep.py --apply` (53) + `--apply --include-divergent`
(+v3a +tarif-detay; headA auto-abort, shop ailesi auto-skip) = **55 sayfa yazıldı**.

**Adım 3 — KABUL kanıtı (HEPSİ GEÇTİ):**
- **Idempotency:** md5(numstat) BEFORE = `b6134ca1…` ; re-run `--apply
  --include-divergent` → "yazılan: 0/56" ; md5 AFTER = `b6134ca1…` → **before==after**,
  fiili yazma 0 (sayaç değil dış md5 ile, lessons).
- **Negatif grep:** D1-kalan=**[]** , D2-kalan=**[]** (kalan nav-item/d-link
  Dada Store/Akademi = 0 site-geneli).
- **Sızıntı grep (kapsam-dışı dokunulmamış):** odeme/sepet/urun-detay/urun-liste
  (shop ailesi) + akademi-v1 + dada-shop + tarif-detay-v1-headA → hepsinde
  `dw-store`=**0** (sızıntı 0).
- **Marker toplam:** `drawer-world dw-store` taşıyan = **56** sayfa (55 sweep + _shell).
- **Render probe (4 aile, izole channel:chrome — Chrome 149, /tmp/hf-* ayrı dir,
  :8851; MCP KULLANILMADI):**
  - `sweep-desk-tarif-liste-v1.png` (tarif): desktop 4-nav, çift yok, topbar kapı ✅
  - `sweep-desk-saglik-hub-v1.png` (sağlık): desktop 4-nav, çift yok ✅
  - `sweep-desk-haftalik-menu-v1.png` (bnp/defter): desktop 4-nav, çift yok ✅
  - `sweep-desk-siparislerim-v1.png` + `sweep-drawer-siparislerim.png`
    (auth/hesap, **TRIM drawer-foot edge-case**): desktop 4-nav çift yok +
    drawer-foot'ta Giriş/Tarif Ekle (Püf yok=trim) → DadaStore+DadaAkademi kapı
    tam render → Dil. **Universal drawer-lang anchor TRIM sayfada kusursuz.** ✅

**Kapsam muhasebesi (uygulandı):** 53 auto + 2 divergent (v3a, tarif-detay) = 55
standart-shell + `_shell` (Faz 1) = **56 fixed**. Meşru kapsam-dışı: 4 shop ailesi
(breadcrumb, ayrı kabuk) + headA (header varyant) = 5 — guard'larla reddedildi.

---

---

## KONSOLİDE DENETİM BULGU #1 — 2 DIVERGENT SAYFA PATCH (lead yakaladı, ÇÖZÜLDÜ)

**Kaçak:** `mutfaga-giris-v1.html` + `olcu-birimleri-v1.html` ana sweep'te KOMPLE
atlandı. **Kök neden:** bu 2 sayfada Store nav-item DIVERGENT eski DROPDOWN varyantı
(`Dada Store <i chevron>` + 4 shop kategorili `.dropdown` — Faz-4 'Store düz link'
sweep'i de kaçırmış). Kanonik D1 anchor'ım `>Dada Store</a>` arıyordu, eşleşmeyince
DESKTOP_MARKER de tutmadı → sayfa hedef listesine HİÇ girmedi (Akademi delete +
drawer-world insert de düşmedi). Drawer'da da Store DROPDOWN (`d-has-sub`) + Akademi
d-item vardı (drawer Store d-item formu da divergent). Lead'in GLOBAL negatif grep'i
(Akademi-nav VAR ∧ drawer-world YOK) tam bu 2'yi verdi; başka kaçak yok.

**Çözüm (script divergent-aware genişletildi — manuel Edit değil, reprodüksiyon için):**
- `DESKTOP_MARKER_DIV` (chevron'lu Store) + `D1_DIV` (Store-dropdown + Akademi desktop
  bloğu) + `D2_DIV` (drawer Store `d-has-sub` dropdown + Akademi d-item) eklendi.
- `process()` D1/D2 kanonik ÖNCE, sonra divergent dener; ikisi de literal-exact.
- 2 sayfa `DIVERGENT` set'ine eklendi (v3a/tarif-detay gibi; `--include-divergent`).
- **Lessons dersi:** divergent keşfi hardcode-tahminle değil GLOBAL NEGATİF GREP ile
  (residue-marker VAR ∧ done-marker YOK). Faz-4'te de bu 2 kaçmıştı — negatif grep
  olsaydı orada yakalanırdı.

**Patch KABUL (HEPSİ GEÇTİ):**
- 2 sayfa yazıldı (Δ+548 net = HTML+CSS insert − divergent dropdown delete).
- Bellek idempotency=True; storeChevron=0 (desktop+drawer Store dropdown gitti),
  akademiNav=0, shopDropd=0 (Pişirme Gereçleri vb. yok), drawer-world dw-store=1,
  CSS sentinel sağ.
- **Idempotency md5** (tüm-set): BEFORE=`ba7ba0ce…` → re-run "0/58" → AFTER=`ba7ba0ce…`
  → before==after.
- **Global negatif grep:** residue VAR ∧ drawer-world YOK = **sadece headA**
  (kasıtlı header-varyant istisnası, üretim envanteri dışı); 4 shop ailesi residue YOK
  (breadcrumb Store, nav-dup değil). → meşru 5 hariç **0 kaçak**.
- **Toplam drawer-world taşıyan = 58** (56 + 2).
- **Render probe:** `fix2-desk-mutfaga.png` + `fix2-desk-olcu.png` (desktop 4-nav,
  çift yok, topbar kapı) + `fix2-drawer-mutfaga.png` (drawer-nav'da Store-dropdown +
  Akademi GİTTİ, sadece 4 içerik bölümü; drawer-foot'ta DadaStore+DadaAkademi kapı tam). ✅

**Gözlem (T1 KAPSAMI DIŞI — flag):** Bu 2 sayfa genel olarak ESKİ chrome drift'i
taşıyor — drawer Tarifler alt-menüsü eski kategori etiketleri ("Çorbalar, Ana Yemekler,
Et Yemekleri…" vs kanonik "Çorba, Kırmızı Et…"). T1 yalnız Store/Akademi çiftini
çözdü; bu kategori-etiketi drift'i ayrı bir iş (Faz-4 kategori entegrasyonunun bu 2
sayfaya değmemiş olması). Beyar/lead kararına flag'lendi.

---

---

## MADDE 5 — tarif-bulucu kategori şeridi scroll fix (mini-revize eki, ÇÖZÜLDÜ)

**Sorun:** `tarif-bulucu-v1.html` yatay kategori şeridi (`.shelf-tabs` — Sık Kullanılan/
Sebzeler/…/Süt & Temel/İstemediklerim, 9 sekme) dar panelde taşıyor ama masaüstü fareyle
kaydırılamıyor → sağdaki kategorilere erişim yok.

**KÖK NEDEN (teşhis, körce yama değil):**
- `.shelf-tabs` (CSS @809) ZATEN `overflow-x:auto` + `-webkit-overflow-scrolling:touch`
  taşıyor → scroll alanı VAR (shell `html,body{overflow-x:hidden}` SUÇLU DEĞİL; container
  kendi kayar). Touch/trackpad çalışıyor.
- AMA `.shelf-tabs` kanonik drag-scroll `enableDrag` selector listesinde (@2043) **YOK**
  + scrollbar gizli (`scrollbar-width:none`) + ok yok → **masaüstü fare** kullanıcısının
  kaydırma yolu yok. = Faz-4 "enableDrag selector dersi" birebir (BNP mod rayı +
  kategori-v1 ray aynı nedenle kaymıyordu; çözüm selector'a eklemekti).
- Teyit: selector listesi sayfa-yerel özelleştiriliyor — **bnp `.mode-bar` ekliyor,
  kategori-v1 `.subcat-track`** (ikisi de Faz-4 fix'leri). Norm bu.

**Çözüm (kanonik desen, _shell'e DOKUNULMADI):**
1. `enableDrag` selector listesine `.shelf-tabs` eklendi (@2043, sayfa-yerel) → masaüstü
   fare drag-scroll + dikey-wheel→yatay scroll devrede (mevcut util). `.row-track` class'ı
   EKLENMEDİ (`.row-track>*{width:274px}`+snap pill-tab düzenini bozardı).
2. **frontend-design dokunuşu — kaydırma ipucu:** sağ-kenar fade (`.shelf-tabs.sh-more`
   `mask-image`; mask container'ın görünür kutusuna uygulanır, içerikle KAYMAZ) + JS
   toggle (sağda daha varsa fade, sona gelince kalkar). Markup değişmedi.

**KABUL (scroll probe — iframe 600px overflow zorlandı, HEPSİ ✅):**
- overflow var: scrollWidth 1224 > clientWidth 534 = true
- `enableDrag` bağlı (`.drag-scroll` class): true
- scrollLeft değişti: 0→690 (kaydırılabilir)
- son sekme "İstemediklerim" container içine girdi: true (en sağ erişilebilir)
- fade init (overflow başında `sh-more`): true · fade sona gelince kalktı: true
- Render SS: `tb-1440.png` (panel geniş, 9 sekme sığıyor, fade YOK=doğru) ·
  `tb-768.png` (tek kolon) · `tb-390.png` (şerit taşıyor, sağ-kenar fade görünür) ·
  `scroll-probe.png` (6/6 yeşil). SS dizini: `mockups/.ss-scratch/hf/`.
- Kapsam: sadece `tarif-bulucu-v1.html` (`.shelf-tabs` başka sayfada YOK → flag gereksiz).
- **Commit YOK** (lead talimatı).

**Bilinen Sınırlama (Madde 5):** Fade ipucu yalnız overflow olduğunda görünür (1440 geniş
panelde 9 sekme sığıyor → fade yok, beklenen). Drag-scroll yalnız fare/pointer; touch zaten
native kayıyordu (enableDrag touch'ı es geçer, `pointerType==='touch'` guard).

---

## Durum (özet): FAZ 1 (_shell) + FAZ 2 (55 sayfa) + BULGU#1 (2 divergent) = 58 fixed ✅ · MADDE 5 (tarif-bulucu scroll) ✅

---

## Sorun (revize girdisi)

`DadaStore` ve `DadaAkademi` iki yerde birden duruyordu:
1. **Siyah üst bant (topbar)** — markalı "dünya kapısı" `tb-world` (domates + petrol,
   `_shell.html` @732-733) → **KALACAK** (kanonik konum).
2. **Ana menü çubuğu (header nav)** — düz `nav-item` link (@811-814 desktop) +
   mobil drawer'da düz `d-link` (@901-902) → **ÇİFT, kaldırılacak.**

Ana menü artık SADECE içerik bölümleri taşımalı: Tarifler / Bugün Ne Pişirsem /
Mutfak Sırları / Sağlık.

---

## Yapılan (FAZ 1 — sadece `_shell.html`)

### (1) Desktop ana-nav temizliği
- Kaldırıldı: `<div class="nav-item"><a href="dada-shop-v1.html">Dada Store</a></div>`
  (eski @811-813) + `<div class="nav-item">…Dada Akademi…Yakında</div>` (eski @814).
- Ana nav artık: **Tarifler ▾ · Bugün Ne Pişirsem · Mutfak Sırları ▾ · Sağlık ▾** (4 öğe).
- Topbar `tb-world` kapıları (DadaStore domates + DadaAkademi petrol/Yakında) DOKUNULMADI.

### (2) Drawer (mobil) — körce SİLMEDİM, taşıdım
**Kritik doğrulama:** `_shell.html` @645-649 → `@media (max-width:640px){ .topbar{display:none} }`.
**Mobilde (≤640px) topbar tamamen gizli** → tb-world kapıları telefonda ERİŞİLEMEZ.
(Tablet ≤1024px'de topbar görünür kalıyor, sadece soc/div gizleniyor.)

Bu yüzden drawer'daki kapılar körce silinmedi:
- `drawer-nav`'dan düz `d-link` kapılar (Dada Store / Dada Akademi) KALDIRILDI →
  drawer içerik navı da artık sadece 4 içerik bölümü.
- Kapılar `drawer-foot`'a **markalı dünya kapısı** olarak TAŞINDI: yeni
  `.drawer-worlds` bloğu + `.drawer-world` (`dw-store` domates / `dw-akademi` petrol),
  topbar `tb-world` kimliğiyle bire bir (renk tokenı `--tomato` / `--c-petrol`,
  ikon + ad + ok/`Yakında` rozeti). Tek-kolon tam genişlik yığın (drawer-add
  butonlarıyla tutarlı). → Mobilde kapılara erişim KORUNDU.
- `drawer-foot a` JS handler (@1333) yeni `a.drawer-world` kapılarını otomatik
  kapsıyor (tıklamada drawer kapanır) — ek JS gerekmedi.

### Tasarım dokunuşu
`frontend-design` skill çağrıldı (zorunlu). Yeni estetik İCAT EDİLMEDİ — kilitli
chrome katmanının mevcut `tb-world` marka kimliği drawer'a aynen taşındı (kabuk
tutarlılığı). Token TANIMI değil BASKIN KULLANIM eşlendi (Faz 5 lessons L: cross-
teammate marka-token koordinasyonu): store=domates, akademi=petrol — topbar ile aynı.

---

## Kanıt

**Yapısal (grep):**
- Desktop ana nav = 4 içerik bölümü (Tarifler/Bugün Ne Pişirsem/Mutfak Sırları/Sağlık);
  Dada Store/Akademi `nav-item` = **0**.
- Topbar `tb-world` HTML anchor = **2** (korundu).
- `drawer-nav` içinde `dada-shop`/`akademi` düz `d-link` = **0**.
- `drawer-foot` markalı `drawer-world dw-*` anchor = **2** (taşındı).
- `--c-petrol` token tanımlı (@52). Faz 1 değişen dosya = **sadece `mockups/_shell.html`**
  (22+/6−); diğer git-diff dosyaları T2/T3/T4 teammate'lerinin paralel işi.

**Render (izole channel:chrome — system Chrome 149, `/tmp/hf-chrome*` ayrı
user-data-dir, kendi server portu `:8851`; MCP Playwright KULLANILMADI):**
- `desktop-nav.png` (1440): ana nav 4 öğe, çift YOK, topbar kapıları sağda korundu,
  nav ortalı/nefesli. ✅
- `drawer-full.png` (600, mobil layout): drawer-foot'ta DadaStore (domates, ok →) +
  DadaAkademi (petrol, YAKINDA rozeti) tam render; içerik navında kapı yok; X butonu
  yerinde. ✅
- SS dizini: `mockups/.ss-scratch/hf/` (gitignored).

**Tasarım gözü (lead protokolü):** Drawer-foot hiyerarşisi doğru — önce hesap/ekleme
aksiyonları (Giriş Yap / Tarif Ekle / Püf Ekle), sonra renkle ayrışan dünya kapıları,
sonra Dil. Kapılar içerik navından görsel olarak ayrışıyor (renkli kabuk vs düz liste);
"çift kapı" algısı gitti. Domates↔petrol kimlik ayrımı topbar ile birebir tutarlı.

---

## Bilinen Sınırlamalar (ZORUNLU)

1. ~~Faz 1 SADECE `_shell.html`'de aktif~~ → **ÇÖZÜLDÜ (Faz 2 sweep):** 55 standart-shell
   sayfa + `_shell` = 56 sayfada fix aktif; negatif grep 0, idempotent.
2. **Kapsam-dışı 5 sayfa (KASITLI, çift DEĞİL):** (a) shop ailesi odeme/sepet/
   urun-detay/urun-liste — bunlarda "Dada Store" bir BREADCRUMB linki (Anasayfa→Dada
   Store→Sepetim), ana-nav çifti değil; ayrı shop kabuk (Ana Siteye Dön). Dokunulmadı,
   doğru. (b) tarif-detay-v1-headA — header varyant arşiv deneyi (akademi `href="#"`),
   önceki fazlarda da hard-exclude; HÂLÂ eski markupu taşır ama üretim envanteri dışı.
3. **Tablet aralığı (641–1024px):** topbar tb-world kapıları görünür + drawer-foot
   kapıları da erişilebilir (kapalı drawer içinde) — görsel çift DEĞİL, kabul edilebilir.
   İstenirse tablet'te drawer-foot kapı gizleme opsiyonu ayrı iş (şu an gereksiz).
4. **Eski sınırlama (Faz 1 probe):** Render probe örneği bare `_shell.html` (iskelet, sayfa içeriği yok). 390px
   tam-sayfa SS'inde drawer'ın sağ kenarı + X butonu kadraj dışı kaldı — bu, içeriksiz
   iskeletin yatay-overflow SS artefaktı (fixed `right:0` drawer + `scrollWidth>390`),
   GERÇEK taşma değil. 600px SS'inde drawer tam ve temiz render oldu; kapılar 335px
   drawer içine sığıyor. Üretim içerik sayfalarında bu artefakt oluşmaz (Faz 2 probe'da
   4 gerçek aileden teyit edilecek).
3. **Tablet aralığı (641–1024px):** Bu aralıkta hem topbar (tb-world kapıları görünür)
   HEM drawer-foot kapıları erişilebilir — iki ayrı erişim noktası var ama görsel çift
   DEĞİL (biri üst bant, diğeri kapalı drawer içinde). Kabul edilebilir; istenirse Faz 2'de
   tablet'te drawer-foot kapılarını gizleme opsiyonu tartışılır (şu an gereksiz görüldü).

---

## FAZ 2 — SCRIPT HAZIR & VALIDATE EDİLDİ (lead "sweep go" bekliyor — KOŞULMADI)

Lessons gereği paralel takımda ortak-chrome sweep faz SONUNA, tüm teammate'ler
dosyalarını kapattıktan sonra TEK seferde koşulur (çakışma önlemi).

**Script:** `mockups/.ss-scratch/hf/sweep.py` (DRY-RUN default; `--apply` yazar;
`--include-divergent` v3a+tarif-detay'ı da işler).

### Operasyonlar (HEPSİ literal-exact match/replace — region-SWAP DEĞİL)
- **D1** desktop nav-item DELETE (Dada Store + Dada Akademi blok)
- **D2** drawer d-item DELETE (d-link kapılar)
- **I1** drawer-foot `.drawer-world` INSERT — anchor = `drawer-lang` (drawer-foot
  TRIM sayfalarında — siparislerim — Püf yok ama drawer-lang TÜM standart-shell'de
  tekil → universal; kapılar dil seçicinin hemen üstüne girer)
- **I2** CSS `.drawer-worlds/.drawer-world` INSERT (`.drawer-add:hover`'dan sonra)
- Kanonik HTML(520b)+CSS(1444b) blokları `_shell.html`'den RUNTIME çıkarılır →
  byte-identical, hardcode drift yok. Literal-exact olduğu için lessons'daki
  "region-swap CSS-yutma" riski YAPISAL OLARAK yok (over-match imkânsız).

### DRY-RUN + bellek-testi bulguları (yazma YOK)
- **53 standart-shell sayfa** temiz işleniyor (D1-del,D2-del,I1-ins,I2-ins; Δ+1542b).
- **Bellek idempotency:** process() 2× → 2. geçiş = 1. geçiş (idempotent=True),
  4 ailede (tarif-liste / siparislerim-TRIM / saglik-hub / sozluk). CSS sentinel
  (`.topbar{position:fixed`) hayatta, dw-store=1, css-blok=1, navDup-kalan=0.
- **Guard'lar 6 anomaliyi YAKALADI ve REDDETTİ** (körce yazmadı):
  - **Shop ailesi (4): odeme/sepet/urun-detay/urun-liste** — `Dada Store` marker'ı
    bir BREADCRUMB linki (Anasayfa→Dada Store→Sepetim), nav-item çifti DEĞİL;
    `nav-item has-mega` imzası YOK = ayrı shop kabuk. **KAPSAM DIŞI, doğru hariç.**
    (= task'taki "dada-shop sızıntı 0" hedefi.)
  - **tarif-detay-v1-headA** — header varyant deneyi (Dada Akademi `href="#"`);
    önceki fazlarda da "hard-exclude" (cila2-faz2 raporu). DIVERGENT'e eklendi.
  - **v3a + tarif-detay-v1** — divergent (lessons); `--include-divergent` ile
    AYRI doğrulanmış pass'te işlenir (bellek-testi: temiz, idempotent, sentinel sağ).

### Faz 2 yürütme (go gelince)
1. `python3 mockups/.ss-scratch/hf/sweep.py --apply` → 53 standart-shell.
2. `python3 …/sweep.py --apply --include-divergent` → +v3a +tarif-detay
   (headA otomatik abort/skip; 53 idempotent no-op).
3. Render probe (izole channel:chrome) 4+ aileden.

### KABUL checklist
- re-run `git diff --numstat | md5` before==after (idempotency — sayaç DEĞİL dış md5).
- Negatif grep: kalan ana-nav/`d-link` Dada Store/Akademi = **0** (breadcrumb hariç).
- Sızıntı grep: `akademi-v1` + `dada-shop-v1` + shop ailesi (odeme/sepet/urun-*) +
  headA DOKUNULMAMIŞ = **0**.
- Silinen-CSS-selector grep (`git diff -U0 | grep '^-.*{'` → bölge dışı 0;
  ops INSERT olduğu için silinen CSS beklenmez).
- 4 farklı aileden render probe (izole channel:chrome): masaüstü çift YOK +
  drawer-foot kapı render + mobil erişim.

### Kapsam muhasebesi (60 marker-taşıyan sayfa, _shell hariç)
53 auto + 2 divergent-patch (v3a, tarif-detay) = **55 standart-shell fix** + `_shell`
= **56 fixed**. Kapsam dışı (meşru): 4 shop ailesi + headA = 5.

---

## Çıktılar
- `mockups/_shell.html` (Faz 1 fix)
- `mockups/.ss-scratch/hf/{desktop-nav,drawer-full,mobile-drawer*}.png` (SS, gitignored)
- Bu rapor: `outputs/faz5-revize-header-fix-rapor.md`
