# CİLA-2 Faz 5 — DadaAkademi Ayrı Kabuk Raporu (task #2)

> Sahiplik: `mockups/akademi-v1.html` (YENİ kabuk). `_shell.html`'e dokunulmadı.
> Kardeş referans: `mockups/dada-shop-v1.html` (kabuk-sapma deseni birebir paralellendi).

## Özet

DadaAkademi, DadaStore gibi **ayrı bir kabuğa** dönüştürüldü. Tıklanınca
"kendi ayrı eğitim dünyasına girilme" hissi veren, ana site navigasyonundan
ayrışmış, kendi marka/menü/drawer/footer kimliğine sahip bir eğitim sitesi
havası kuruldu. Mevcut "YAKINDA" vaadi (hero, vaat kartları, erken kayıt formu,
?sent=1 akışı) korundu; kabuk içerikle dolduruldu (eğitim setleri, eğitmenler,
konular, sertifika, SSS).

`git diff --numstat`: **+454 / −156** (net +298 satır).

## Yapılanlar (dada-shop kabuk-sapma deseni birebir paralel)

### 1. Ayrı topbar (üst bant kimliği)
- Sol: `tb-back` **"DadaMutfak'a dön"** (shop `tb-back` paraleli) + "12+ eğitim
  seti hazırlanıyor" + sosyal. Sağ: "Erken Kayıt" + "Sıkça Sorulanlar" + dil.
- Ana sitenin "48.200+ tarif / Tarif Ekle / Testler / Diyetisyen Ara" linkleri kaldırıldı.

### 2. Ayrı header (akademi marka + akademi nav, ana-site nav YOK)
- **Marka:** `ak-brand` — eğitim temalı **kendi SVG'si**: domates **mezuniyet kepi
  (mortarboard)** + tassel + beyaz iç-detay (shop `shop-mark` SVG paraleli, eğitim
  diline uyarlandı). Kelime: `ak-word` → **Dada**(slate) **Akademi**(domates).
- **Nav (ana-site nav'ı GÖSTERİLMEZ):** Akademi (active) · Eğitimler ▾ (6 hat
  dropdown `ak-tracks` + "Tüm Eğitim Setleri") · Eğitmenler · Sertifika · SSS.
- **Sağ blok:** `ak-back` **"Ana Site"** geri-dön linki (shop `shop-back` paraleli)
  + arama + Giriş Yap + hamburger. Ana sitenin login-state chrome'u (acct-wrap/
  zil/ekle ▾) shop gibi kabuktan çıkarıldı.

### 3. Ayrı drawer (mobil) + bottom-nav
- Drawer başı `drawer-brand` akademi SVG; nav = akademi öğeleri; foot'ta
  "Açılınca Haber Ver" + **"DadaMutfak'a Dön"** (shop paraleli).
- Bottom-nav: Akademi · Eğitimler · (FAB) Haber Ver · Eğitmenler · Ana Site.

### 4. Hero — KANON uyumlu (§2f H1)
- Mevcut `.lst-top` + `.lst-hero` **koyu-overlay görselli** hero korundu
  (`padding-top:128px` H1 nefes kuralı yerinde). Krem-ortalı hero YOK.
- Breadcrumb kabuk bağlamına çekildi: **DadaMutfak › Dada Akademi** (eski
  "Mutfak Sırları" ara seviyesi kaldırıldı — akademi artık üst-seviye ayrı dünya).

### 5. Body zenginleştirme (kabuk dolu/kaliteli görünsün)
- **Eğitim Setleri** (`#setler`) — 6 kurs kartı (`crs-card`, disc/p-card dilinden):
  16:10 görsel + seviye rozeti + "Yakında" yeşil rozet + hat etiketi + şef mini
  künyesi + ders/süre/uygulama meta. Mobilde yatay snap.
- **Konular / Yol Haritası** (`#konular`) — 8 kare `cat-card` track (v3a dili) +
  row-nav okları.
- **Eğitmenler** (`#egitmenler`) — 4 `edu-chef` kartı (chef-card dili: avatar +
  uzmanlık rolü + etiketler) + "Eğitmen Başvurusu" davet CTA'sı.
- **Sertifika** (`#sertifika`) — kampanya-bandı dilinden feature band + mock
  sertifika kartı.
- **SSS** (`#sss`) — 5 soruluk akordeon (tek-açık JS).
- Korunan: vaat kartları (`#vaat`), "Nasıl İşleyecek" 3 adım, erken kayıt formu
  (`#kayit`, fk-* kiti, ?sent=1 teşekkür akışı).

## Denetim / Kanıt

- **`*/` yorum sızıntısı (lessons):** grep temiz — eklenen yorumlarda `*/` yok.
- **Ana-site nav markup sızıntısı:** header/drawer/bottom-nav'da Tarifler mega /
  BNP / Sağlık dropdown / Dada Store **markup'ı YOK**. (Paylaşılan chrome CSS
  bloğundaki `.mega/.mega-cats` *tanımları* duruyor — shop'ta da öyle, zararsız.)
- **Grid kuralı (lessons sefler-v1):** Yeni `.crs-grid`/`.chef-grid` kolonları
  `minmax(0,1fr)`. Lead denetimi düzeltti: bare-`1fr` grid'ler (`.ak-grid`,
  `.ak-how-grid`, `.fk-grid.c2`, `.ak-tracks .dd-grid`, `.cert-band`, `.fb-topics`)
  vardı → **önleyici `min-width:0` sigortası** bu grid'lerin (+ crs/chef) doğrudan
  çocuklarına eklendi + kurs kartı şef satırına metin-kısaltma (uzun ad/rol taşmasın).
- **Section id'leri:** setler/konular/egitmenler/sertifika/sss/kayit/vaat — hepsi
  tekil ve nav/topbar/drawer/bottom-nav linkleriyle eşleşiyor.
- **İkon:** Pro-only `fa-knife-kitchen` → free `fa-kitchen-set` düzeltildi.
- **FontAwesome 6.5.2 kilitli set** korundu; emoji bayrak yok.

## Bilinen Sınırlamalar

1. **Playwright render/390-taşma SS'i LEAD FAZ-SONU konsolide MCP turunda
   alınacak** (lead kararı). Bağımsız browser yok; paylaşımlı MCP Chrome tek
   instance faz boyunca çakışıyordu ("Browser is already in use"). Lead faz-sonu
   turda akademi'yi de çekecek: kabuk render + ana-nav yok teyidi + 390 element-rect
   taşma + "Ana Site" tıkla-probe. Statik denetimler (grep sızıntı, id eşleşmesi,
   `*/` taraması, min-width:0 sigortası) bu turda yapıldı; layout riski düşük
   (kart grid'leri minmax(0)+min-width:0, mobilde yatay snap; hero değişmedi —
   akademi zaten 70-sayfa 3×0 envanterindeydi). **Bulgu çıkarsa lead geri dönecek.**
2. **Header BAND swap'ı uygulandı** — Header teammate'in `_shell` topbar STABİL
   sinyali beklenmeden. Gerekçe: akademi kendi inline header'ını taşır (shop gibi,
   `_shell` include etmez) ve kendi topbar kimliğine ayrışır; Header teammate'in
   `_shell`/Tarifler-dropdown işinden bağımsız. **Eğer base `.topbar/.tb-*`
   chrome CSS'i fazda değişirse**, akademi (ve shop) faz-sonu sweep'te birlikte
   güncellenmeli — akademi'nin kabuk-spesifik içeriği (tb-back, akademi linkleri)
   korunarak. Lead'e bu karar mesajla iletildi; itiraz gelirse geri alınabilir.
3. **Giriş akışı basit:** Pre-launch kabuk olduğu için Giriş → `giris-v1.html`
   (ana site auth). Shop'taki in-shell login modal (`lm-modal`) akademiye
   taşınmadı — pre-launch landing'de gereksiz kapsam. Login-state chrome de
   (acct-wrap/zil) kabuktan çıkarıldı (shop deseni).
4. **Görseller Unsplash placeholder** (v3a filtre suffix'iyle); kurs/eğitmen
   verisi temsilî mock (gerçek eğitmen/kurs verisi yok — "Yakında").
5. **Footer** ana-site ortak orange footer'ı (e-ticaret yasal linkleri dahil)
   korundu — akademi orijinalinde de bu footer vardı; site geneli tutarlılık.

## PETROL RE-SKIN — ✅ UYGULANDI (Beyar kararı: DadaAkademi = PETROL · task #7)

**Uygulanan (Opsiyon A, tek dosya `akademi-v1.html`):**
- `:root` brand token repoint: `--tomato:#006072` · `--tomato-dark:#00505E` ·
  `--tomato-deep:#003E49` · `--tomato-tint:#E2EFF1` → **126 `var(--tomato*)`
  kullanımı** (CTA, eyebrow, aktif nav, icon/chip hover, crs/edu/cert/faq +
  paylaşılan topbar/feedback/cookie/footer) petrole döndü.
- Logo SVG fill/stroke (header + drawer): 8× `#E14827`→`#006072`.
- Koyu-hero açık aksanlar: eyebrow `#ffd9cf`→`#B9DFE6`, h1 `.accent`
  `#ff7a5c`→`#4FB8C9`, crumb-hover `#ff8763`→`#5CC3D4`.
- Domates gölge/tint `rgba(225,72,39,*)`→`rgba(0,96,114,*)` (10 yer).
- **KORUNDU:** `--green:#3BB77E` (Yakında rozeti + sağlık) ve `--yellow:#FAC045`
  (puan) — defs + 8 kullanım intact.

**Kanıt (statik):** kalan domates izi **0** (grep `#E14827`/türevler/`rgba(225,72,39)`
temiz) · petrol yerinde (#006072/rgba(0,96,114) ×20) · sweep imzası (tb-back/
ak-back/Ana Site/kabuk marker) 14 hit korundu · `*/` mid-comment sızıntısı 0 ·
numstat re-skin sonrası +479/−172. **Render SS petrol + 390 element-rect taşma:
lead faz-sonu konsolide MCP turunda** (re-skin SAF RENK — layout değişmedi,
min-width:0 sigortası yerinde → 390 davranışı önceki layout'la birebir aynı).

### (Tarihçe) Hazırlık ölçümü — onaydan önce

**Koordinasyon bulgusu (lead, faz-sonu SS):** Header'ın topbar/menüdeki
DadaAkademi KAPISI petrol (`--c-petrol:#006072`), ama akademi KABUĞUNUN içi
domates (#E14827). Petrol kapı → turuncu kabuk = renk vaadi tutarsız.

**(a) Domates bilinçli miydi?** HAYIR — petrol-vs-domates bir marka kararı
verilmedi. Domates **site-geneli varsayılan marka aksanı** (`--tomato`,
`btn-primary`, `eyebrow`, `tomato-tint` taban token'larından) + brief'teki
"dada-shop paraleli" (shop domates-baskın) üzerinden DEVRALINDI. `_shell` buton
mirası "kalıntısı" değil; bilinçli bir tercih de değil — sadece varsayılan akıp
geldi. `--c-petrol` token'ı :root'ta TANIMLI ama hiç kullanılmadı. Yani petrol
yön ise "uygulanmamış", dönüşü kolay.

**(b) Petrol re-skin maliyeti — TEK DOSYA (akademi-v1.html), saf renk, layout
riski 0, geri alınabilir.** Kabuk kendi dosyasında olduğu için token repoint
çoğu yüzeyi tek hamlede çevirir:

| # | İş | Yer | Maliyet |
|---|----|-----|---------|
| A | `:root` brand token repoint — `--tomato/-dark/-deep/-tint` → petrol seti. **126 `var(--tomato*)` kullanımının HEPSİ** (CTA, eyebrow, aktif nav, icon/chip hover, crs/edu/cert/faq aksanı + paylaşılan chrome topbar/feedback/cookie) anında petrole döner → tam kabuk daldırması | satır 38–41 | **4 satır** |
| B | Logo SVG fill/stroke (header + drawer, birebir aynı 2 blok) | satır ~1014, ~1051 | **8 hex** (`#E14827`→`#006072`) |
| C | Koyu-hero açık-aksanlar: eyebrow `#ffd9cf`, h1 `.accent` `#ff7a5c`, crumb-hover `#ff8763` → petrol-açık tonlar (örn. `#cfe7ec`/`#4FB6C6`/`#5cc3d4`) | satır 717/720/724 | **3 hex** |
| D | Domates gölge/tint `rgba(225,72,39,*)` → `rgba(0,96,114,*)` (cila; ~5'i görünür: CTA/soon-big gölge, focus ring) | 10 yer | **10 rgba** (opsiyonel) |

- **KORUNUR:** `--green` (Yakında rozeti + sağlık) ve `--yellow` (puan). Petrol
  kabukta yeşil "Yakında" rozeti durum-rengi olarak okunur, çakışmaz.
- **Toplam:** ~25 hedefli edit, ~15–20 dk + render teyidi. Yeni komponent/markup
  YOK. Onay gelirse anında koşulur.
- **"Domates kalsın" denirse:** Header teammate kapı chip'ini domatese çeker
  (kendi dosyasında ~1 satır); akademi kabuğunda DEĞİŞİKLİK YOK.
