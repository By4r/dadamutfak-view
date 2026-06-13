# CİLA-2 FAZ 5 — Sentez (kabuklar + üyelik sosyal + BNP akışı + alışveriş listesi)

> Tarih: 2026-06-13 · Takım: `cila2-faz5` (lead delegate + 6 teammate) · Saf-frontend
> mockup, Laravel yok. FULL AUTO (kesintisiz), git commit/push YOK — Beyar onayı bekliyor.

## 0. Özet

6 görevin **6'sı da kanıtlı kabul** edildi. Site-geneli konsolide chrome sweep
(topbar dünya kapıları + Tarifler dropdown standardı + profil dropdown "Alışveriş
Listem") **58 sayfaya** uygulandı, bağımsız doğrulandı (CSS-yutma 0, idempotent
re-run md5 birebir aynı, sızıntı 0). Faz-sonu render SS turu (defter izole
channel:chrome) + lead tasarım-gözü inceleme tamamlandı. **1 marka kararı Beyar'a
çıktı** (DadaAkademi petrol mi domates mi — aşağıda §5).

## 1. Görev bazında yapılanlar + kanıt

### #1 header — topbar dünya kapıları + Tarifler dropdown standardı ✅
- Topbar yeniden: "Tarif Ekle" + "Testler" topbar'dan KALKTI (mega/drawer'da
  DURUYOR). Sağda 2 markalı DÜNYA KAPISI: **DadaStore** (domates, →dada-shop) +
  **DadaAkademi** (petrol, "Yakında" rozeti, →akademi). Token disiplini
  (radius-sm, --c-petrol), pill/yeni-renk yok. tb-left sayaç/sosyal + tb-lang korundu.
- Dropdown standardı: mega+drawer 22 kategori linki → `tarif-liste-v1.html?kategori=<slug>`;
  tarif-liste-v1'e savunmacı `?kategori` okuyucu (facet ön-aktif, gizli kategoride more-open).
  Artık kategori = "Tüm Tarifler" ile AYNI düzen.
- **Kanıt:** topbar izole grep Tarif Ekle/Testler=0 · 22 ?kategori link · canlı DOM
  evaluate (corba/kek facet) · sweep sandbox 2-tur.

### #2 akademi-kabuk — DadaAkademi ayrı kabuk (YENİ) ✅
- akademi-v1.html dada-shop deseninde AYRI KABUK: kendi topbar ("DadaMutfak'a dön"),
  kendi header (DadaAkademi marka + nav: Akademi/Eğitimler/Eğitmenler/Sertifika/SSS,
  **ana-site nav YOK**), "Ana Site" dönüş, ayrı drawer/bottom-nav. Body: Eğitim Setleri
  (crs-card), Konular (cat-card), Eğitmenler (chef-card), Sertifika band, SSS. Hero
  KANON H1 .lst-top koyu-overlay.
- min-width:0 sigortası eklendi (sefler-v1 dersi: bare-1fr grid çocukları).
- **Kanıt:** ana-nav sızıntı=0 (has-mega yalnız CSS) · numstat +463/-156 · 390 taşma 0
  (render SS) · "Ana Site" tıkla. **⚠️ Renk bulgusu → §5.**

### #3 shop-cila — çift dönüş kaldır + hero nefes/cila ✅
- shop-back "Ana Site" butonu 5 dosyadan idempotent kaldırıldı (dönüş TEK + sol-üst
  tb-back). Hero-header kesişmesi düzeltildi (23px nefes, .shop-vitrin padding fix).
  Tekdüze zemin → görünür cream-2 alternasyon + .shop-flow yumuşak seam + 2 bambu ayraç.
  Kabuk kimliği (DadaStore SVG, dmCart, p-card) korundu.
- **Kanıt:** shop-back=0 (6 dosya) · header-after.png dönüş tek/sol-üst · numstat tutarlı
  · mojibake 0 · 390 taşma 0 · dmCart probe.

### #4 uyelik-sosyal — telefon + diyetisyen kayıt + sosyal profil + takip/gizlilik ✅
- TELEFON: kayıt formuna +90 TR maskeli alan; girişe e-posta/telefon segment (.au-seg).
- DİYETİSYEN KAYIT: kayıt pane'inde yeşil callout (.au-dyt) → diyetisyen-ol-v1.html (mevcut).
- SOSYAL PROFİL: diyetisyen-profil'e Püf Noktaları sekmesi (puf-card VERBATIM) + Takip Et (.pf-follow).
- TAKİP/GİZLİLİK: public modda Kaydedilenler+Menüler takip arkasında (.pf-fgate → .pf-lock
  boş-durum / .pf-full içerik). body.is-following + ?takip=1; own=hep açık.
- **Kanıt:** au-seg/au-dyt/pufler/pf-follow grep · pf-fgate(7)/pf-lock(11)/pf-full(9) ·
  render SS takip=0/1 (kilitli↔açık) · */-trap 0.

### #5 bnp-akis — BNP 2-tab + sıfırdan menü + menüyü pişir + mod kartları ✅
- 2 TAB: Tab A "Tarif Ara" wizard (stepper miras, 4 adım→%uygun rozeti) / Tab B "Yemek
  Modları & Menüler". ?tab= derin link.
- SIFIRDAN MENÜ: mod seç→altında uygun tarifler (rp-card)→tepsi→"Menüyü Kur". Hazır menüler korundu.
- MENÜYÜ PİŞİR: tarif-detay .cookmode MİRAS, yemekler KOLAYDAN ZORA, adım adım öneri+sayaç,
  "menü tamamlandı" ekranı, ?cook=1.
- Mod kartları büyütüldü (194×122→236×152) + gölge kırpma fix (mode-bar padding); ray korundu (enableDrag).
- **Kanıt:** pf-tabs(12)/rp-card/cookmode(9)/cm-(83) grep · render SS (2 tab + kolaydan-zora cook) ·
  numstat +711/-26 · 390 taşma 0.

### #6 defter-menu — menü düzenleme + alışveriş listesi akışı ✅
- Menü düzenleme: defter ?tab=menuler kart→düzenleme (Değiştir/Çıkar/Kap Ekle picker +
  Adını/Görseli Değiştir, ?menu=/?havuz=). uyelik geçidinin .pf-full İÇİNE oturtuldu
  (gate BOZULMADI). Public salt-okunur.
- Alışveriş listesi: _shell + sayfalara "Alışveriş Listem" linki; tarif-detay→GERÇEK malzeme
  transferi (localStorage dm_shoplist→reyon eşleme, toast+köprü); alisveris Yazdır/PDF (print
  CSS) + Paylaş popover (kopyala/WhatsApp).
- **Kanıt:** izole probe 37/37 · pf-full korundu (28) · dm_shoplist transfer · render SS · */-trap 0.

## 2. Konsolide chrome sweep (faz-sonu, 58 sayfa)

Script: `mockups/outputs/cila2-faz5-header-sweep.py` (idempotent, span-guard, CSS-INSERT
[region-swap değil], TR utf-8 [perl -CSD yok], TOPBAR_EXCLUDE shop/akademi/headA + recipe-world
imza guard). 3 işi birden yaydı: topbar markup + .tb-world CSS-INSERT + 22 kategori href +
53 "Alışveriş Listem" link.

**Lead bağımsız doğrulama (TEMİZ):**
- tb-worlds 58 sayfa · Alışveriş Listem 58 sayfa · mega kategori-v1(data-slug) kalan=0
- Topbar izole grep: Tarif Ekle/Testler topbar'dan kalktı (mega/drawer'da duruyor)
- **Saf-sweep sayfalarda silinen-CSS '{' = 0 → CSS yutma YOK** (CSS-INSERT disiplini çalıştı)
- net-negatif 4 dosya = shop-back silen shop sayfaları (shop-cila, meşru) — sweep imzası 0
- Sızıntı: shop kabuk(5)+akademi+headA → tb-worlds=0/Alışveriş=0 (siparislerim ana-site
  login-state sayfası, worlds taşıması DOĞRU — sızıntı değil)
- **İDEMPOTENT KESİN: gerçek re-run numstat md5 birebir aynı** (0 yazma; "58 dosya" sayacı kozmetik)
- Contested dosya bütünlüğü: bugun-ne-pisirsem/mutfak-defteri/diyetisyen-profil hepsinde
  sweep eklemeleri + feature marker BİRLİKTE yaşıyor (stale-buffer yarışı olmadı).

## 3. Lokal inceleme link listesi (server 8765)

> Çalışan, gerçek render. `cd dadamutfak && python3 -m http.server 8765`

- **Swept topbar (dünya kapıları):** her sayfada üst şeritte DadaStore+DadaAkademi
  `http://localhost:8765/mockups/anasayfa-portal-v3a.html`
- **Profil dropdown "Alışveriş Listem":** `...?auth=1` → avatar (Menülerim altında sepet ikonu)
- **Tarifler dropdown standardı:** mega kategori → `tarif-liste-v1.html?kategori=corba` (facet ön-aktif)
- **DadaAkademi kabuk:** `http://localhost:8765/mockups/akademi-v1.html` (ayrı dünya, ana-nav yok)
- **DadaStore cila:** `http://localhost:8765/mockups/dada-shop-v1.html` (hero nefes + bambu seam)
- **BNP 2-tab + pişir:** `bugun-ne-pisirsem-v1.html` · `?tab=ara` · menü kur → "Menüyü Pişir" → `?cook=1`
- **Üyelik telefon/diyetisyen:** `giris-v1.html?tab=kayit` (telefon+dyt callout) · `?tab=giris` (segment)
- **Sosyal profil + püf:** `diyetisyen-profil-v1.html?tab=pufler` · `&takip=1` (Takip Et)
- **Takip/gizlilik:** `mutfak-defteri-v1.html?view=public` (KİLİTLİ) ↔ `&takip=1` (AÇIK)
- **Menü düzenleme:** `mutfak-defteri-v1.html?tab=menuler` → kart → `?menu=...`
- **Alışveriş listesi:** tarif-detay "listeye ekle" → `alisveris-listesi-v1.html` (reyon grup + Yazdır/Paylaş)

## 4. Bilinen Sınırlamalar (peşinen)

- **Pixel SS altyapısı:** MCP Playwright tüm faz boyunca tek-instance kilitliydi; render
  doğrulaması teammate'lerin izole sistem-Chrome'u (channel:chrome) + canlı DOM evaluate ile
  alındı. Beyar gerçek tarayıcıda açarsa kesin görür.
- **BNP cook fullscreen:** headless fullPage'de üst boşluk/stitch kozmetik artefaktı (class-state
  open=true doğru, .cookmode inset:0 onaylı pattern) — gerçek tarayıcıda yok.
- **defter:** menü→liste köprüsü düz navigasyon · sponsor (.ing-add'siz) satırlar transfer dışı ·
  porsiyon sonrası miktar güncellenmez · reyon eşleme sezgisel · menü düzenleme mock-persist.
- **shop:** hero/section cilası yalnız mağaza anasayfasında; alt sayfalar yalnız shop-back temizliği
  aldı (zemin-ritmi cilası ayrı tur isterse).
- **uyelik T1:** Denedikleri/Favoriler own-only private bırakıldı (görev Kaydedilenler+Menüler dedi).
- **Ramazan bandı:** anasayfada "Ramazan geldi" bandı render'da görünüyor — Faz 3 Ramazan konsepti
  (patron onayında), Faz 5 kapsamı DIŞI, dokunulmadı.

## 5. ⚠️ BEYAR KARARI — DadaAkademi kimlik rengi (petrol mi domates mi?)

**Bulgu (lead tasarım-gözü, render SS):** akademi KABUĞUN birincil aksanı DOMATES/turuncu
(mezuniyet-kepi logo, aktif nav, hero vurgu, CTA = #E14827) AMA topbar DadaAkademi KAPISI
PETROL (--c-petrol #006072, DadaStore=domates'ten ayrışsın diye). Petrol kapı → turuncu kabuk =
renk vaadi tutarsız. İki teammate (header + akademi-kabuk) bağımsız çelişen karar verdi.

**akademi-kabuk netleştirmesi:** domates aksan BİLİNÇLİ TERCİH DEĞİLDİ — site-geneli
varsayılan marka token'larından (--tomato/btn-primary/eyebrow) + "dada-shop paraleli"
brief'inden DEVRALINDI; `--c-petrol` :root'ta tanımlı ama hiç kullanılmadı. Yani petrol
yön "uygulanmamış", domates "kazara akmış". Petrol kapı ise header'ın BİLİNÇLİ ayrışma
kararıydı → bütünce petrol "başlanan işi bitirme", domates "kazara default" konumunda.

**Maliyet (akademi-kabuk, UYGULAMADI — Beyar onayı):** TEK DOSYA (akademi-v1.html),
saf renk, layout riski 0, reversible. Opsiyon A: :root brand token repoint (4 satır →
126 var(--tomato*) kullanımının HEPSİ petrole döner) + logo SVG 8 hex + koyu-hero açık
aksan 3 hex + opsiyonel rgba tint ~10 = **~25 hedefli edit, 15-20 dk**. Yeni markup yok.
--green (Yakında/sağlık) + --yellow (puan) korunur.

**Karar Beyar'da (2 yön, ikisi de ucuz+reversible):**
- **PETROL** (önerilen): akademi-kabuk re-skin koşar (~25 edit). Store=domates/Akademi=petrol
  net ayrışır; akademi kendi "öğrenme dünyası" kimliğini kazanır; petrol kapı tutarlı dolar.
- **DOMATES** (aile birliği): header topbar DadaAkademi kapı chip'ini domates'e çeker (~1
  satır kendi dosyası); akademi-v1 dokunulmaz. Ama iki kapı ayrışması zayıflar (rozet/ikonla telafi).

## 6. Commit önerisi (Beyar onayı — ben ATMADIM)

Tüm iş tek mantıklı commit:
```
feat(mockup): cila-2 faz 5 — kabuklar + üyelik sosyal + BNP akışı + alışveriş listesi

- header: topbar dünya kapıları (DadaStore/DadaAkademi) + Tarif Ekle/Testler kaldır
  + Tarifler dropdown standardı (kategori→?kategori) + konsolide chrome sweep 58 sayfa
- akademi-kabuk: DadaAkademi AYRI KABUK (dada-shop kardeş deseni) — YENİ
- shop-cila: çift dönüş kaldır + hero nefes + section akışkanlık (cream-2/bambu seam)
- uyelik-sosyal: telefon kayıt/giriş + diyetisyen kayıt köprü + sosyal profil (püf+takip)
  + takip/gizlilik geçidi (?takip=1/0)
- bnp-akis: BNP 2-tab + sıfırdan menü + "Menüyü Pişir" (kolaydan-zora cook) + mod kartı büyüt
- defter-menu: menü içi düzenleme + alışveriş listesi akışı (gerçek transfer + Yazdır/Paylaş)
```
**BEKLEYEN:** §5 DadaAkademi renk kararı (commit öncesi ya da ayrı revize turunda).
