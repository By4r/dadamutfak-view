# DadaMutfak — PROJE TAMAMLANDI 🏁 MOCKUP SETİ TESLİME HAZIR

> Tek doğruluk kaynağı. Güncelleme: 2026-06-13 (**CİLA-2 FAZ 5 TAMAM — agent team
> cila2-faz5 (lead delegate + 6 teammate), 6/6 görev kanıtlı kabul**: KABUKLAR +
> ÜYELİK SOSYAL + BNP AKIŞI + ALIŞVERİŞ LİSTESİ. (1) **header**: siyah topbar
> yeniden — Tarif Ekle/Testler KALKTI, sağda 2 markalı DÜNYA KAPISI DadaStore
> (domates) + DadaAkademi (petrol, Yakında) + Tarifler dropdown standardı (22
> kategori→`tarif-liste?kategori=<slug>`, "Tüm Tarifler" düzeniyle aynı). (2)
> **akademi-kabuk**: DadaAkademi AYRI KABUK (dada-shop kardeş deseni — kendi nav
> Akademi/Eğitimler/Eğitmenler/Sertifika/SSS, ana-site nav YOK, Ana Site dönüş;
> Eğitim Setleri/Konular/Eğitmenler/Sertifika/SSS body; H1 koyu hero). (3)
> **shop-cila**: çift "Ana Site" kaldır (dönüş tek+sol-üst) + hero-header nefes
> (23px) + tekdüze zemin→cream-2 alternasyon + .shop-flow seam + bambu ayraç. (4)
> **uyelik-sosyal**: telefon kayıt/giriş (au-seg) + diyetisyen kayıt köprü
> (→diyetisyen-ol) + sosyal profil (diyetisyen-profil püf sekmesi + Takip Et) +
> TAKİP/GİZLİLİK geçidi (?takip=1/0; public'te Kaydedilenler+Menüler .pf-fgate→
> pf-lock/pf-full). (5) **bnp-akis**: BNP 2-TAB (Tarif Ara wizard / Yemek Modları)
> + SIFIRDAN MENÜ (mod→tarif→tepsi→kur) + "MENÜYÜ PİŞİR" (cookmode miras,
> KOLAYDAN ZORA adım adım, ?cook=1) + mod kartı büyüt (236×152) + gölge fix. (6)
> **defter-menu**: menü içi düzenleme (?menu=/?havuz=, .pf-full içine, gizlilik
> geçidi korundu) + ALIŞVERİŞ LİSTESİ akışı (tarif-detay→gerçek dm_shoplist
> transfer + reyon eşleme + Yazdır/PDF + Paylaş popover). KONSOLİDE CHROME SWEEP
> 58 sayfa (topbar+dropdown+Alışveriş Listem link): CSS-yutma 0, idempotent re-run
> md5 birebir, sızıntı 0, net-neg 4=shop-back (meşru). Render SS turu (izole
> channel:chrome) + lead tasarım-gözü. **⚠️ BEYAR KARARI: DadaAkademi kimlik
> rengi — kabuk DOMATES ama topbar kapısı PETROL, tutarsız; petrol (önerilen) ya
> da domates seçimi → tek-tur fix. akademi-kabuk petrol-varyant HAZIR (uygulamadı).**
> Sentez+inceleme: `outputs/cila2-faz5-sentez.md`. **DEPLOY: feat commit `3b6bf82` +
> docs commit (kapanış) + PUSH origin/main (Beyar onayı 2026-06-13) — GitHub Pages güncel.
> DadaAkademi=PETROL Beyar kararı uygulandı (akademi-v1 token repoint). Takım kapatıldı.**
>
> 🔜 **SIRADA — FAZ 5-SONRASI REVİZE TURU (Yasin Bey/Beyar geri bildirimi):** (1) duplicate
> menü temizliği · (2) DadaAkademi kurumsal renk (petrol uygulandı; kurumsal ince ayar) ·
> (3) shop section keskinleştirme · (4) form 2-kolon düzeni · (5) BNP her-yemek-process +
> "menüye git" butonu + sticky menü · (6) haftalik-menu "ekle" fix · (7) markalı PDF. SONRA
> **FAZ 6**: tarif modülü + SEO + tutarlılık + final mobil QA. Bekleyen patron kararları
> dursun: Su Bardağı ölçü (200ml↔240ml), Ramazan modu, M2 sosyal login seti, reklam paket
> fiyatları, "Şef Ol" hedefi (m12).)
> Önceki: 2026-06-13 (**CİLA-2 FAZ 4 TAMAM — agent
> team cila2-faz4 (lead + kategori-tarif + kategori-sirlar + kategori-kesfet-bnp
> + ux-revize)**: Excel `KategoriEkle.xlsx` (11 sheet) GERÇEK üretim kategorileri
> mockup'a işlendi (temiz veri `tasks/kategori-veri.md`): tarif 27 kat + 14 tip ·
> ölçü 2-seviye 10/65 · mutfağa-giriş 7/36 · püf 9 soru-format · keşfet alt-filtre ·
> BNP 14 mod + **tarif havuzu modalı** (eksik kurgu kapatıldı). UX: tarif-bulucu
> YENİDEN (dar panel→geniş ferah ızgara) · iletisim OSM harita · DadaStore dropdown
> site-geneli kaldırıldı (64 sayfa düz link) · **Şef Ol→sef-ol başvuru sayfası YENİ**
> (envanter 70→**71**) + 65 sayfa sweep · sef-ol DERİN (4 bölüm, pre-fill dolu,
> sosyal medya, gerçek kategori uzmanlık). REGRESYON: mutfaga-giris + olcu kategori
> işinde tasarım dili bozulmuştu → a463329 dili korunarak düzeltildi (kural+lessons:
> kategori işi=SADECE veri; `tasks/kategori-regresyon-raporu.md`). 4 CANLI BULGU FIX:
> BNP ray kaydırma + kategori-v1 ray (enableDrag selector dersi) + kesfet tek-katman
> bağlamsal + "Tümünü Gör"→liste. Kanıtlı kabul (git diff CSS-kural 0 / yan-yana SS /
> tıklama+scrollLeft probe). Sentez: `outputs/cila2-faz4-sentez.md`. Lessons +2.
> HERO/PANEL REVİZE TURU (Beyar canlı): tarif-liste sol panel dengelendi (cap
> kaldırıldı, oran 1.14) · BNP mod chip büyütüldü (194×122, ray korundu) + hero H3
> kesfet'le hizalandı · kategori-v1 ray kaydırılır (enableDrag) · sozluk hero §2f H1
> koyu'ya çekildi (ansiklopedi kardeşi) · olcu hero zaten canon H3 (no-op).
> **DEPLOY: commit + push origin/main (Beyar onayı 2026-06-13) — GitHub Pages güncel.
> Takım kapatıldı.**
>
> 🔜 **SIRADAKİ TUR KARARLARI (Yasin Bey / patron):** (1) **Su Bardağı 200ml vs Excel
> 240ml** — olcu gram değerleri 200ml-bazlı (TR standart); Excel 240ml (US cup). 240
> seçilirse dönüştürücü + 65 satır gram güncellenir. (2) **olcu tab konumu** — 10 uzun
> kategori başlığı sağa sığmadı, tam-genişlik wrap satırına taşındı (pill stili a463329
> birebir); veri-zorunlu minimum kabul edildi, patron veto ederse alternatif. (3)
> **Ramazan modu** (Faz 3'ten) — `?ramazan=1` demo, site-geneli yayılım + gerçek vakit
> API'si patron onayında.
> Önceki: 2026-06-13 (**CİLA-2 FAZ 3 TAMAM — agent
> team cila2-faz3 (lead+kanon+uygula-b+qa+ramazan), 26 görev kanıtlı kabul**:
> hero/breadcrumb KANONU kılavuz §2f (rd-crumb tek form + H1/H2a-b/H3 +
> hak-ediş; saglik-testler patron-fix krem→yeşil koyu hero; nefes 128/74
> 17 H1'de; crumb simetri 15 sayfa) · kurumsal: hakkımızda yasal 3'lü grid +
> 🆕 sefler-v1 (envanter 69→**70**) + Şef Ol→tarif-ekle (m12 ara çözüm) +
> Günün Tarifi Keşfet sonrasına (Patron #1 ÇÖZÜLDÜ) + v3a Store dropdown fix ·
> Beyar canlı feedback 6 iş (reklam-ver nefes, BNP mod rayı native-outline
> kök neden, ansiklopedi 2-katman İA → Excel'in 19 GERÇEK kategorisiyle,
> tarif-bulucu mega CTA 57 sayfa + köprü, dz-card sade link) · 🌙 RAMAZAN MODU
> konsepti (5 sayfa; ?ramazan=1/0+localStorage+body.is-ramazan; otomatik
> iftar↔sahur flip; ?demo=1; PATRON ONAYINA) · lg-gate 3 detay sayfası ·
> footer/şef sweep 45 dosya · reklam-ver "Yerleşimler" (9 yerleşim, mock
> metrik) · ölü CSS −102 · FİNAL QA: 70 sayfa × auth × 390 = 0 taşma/0
> çift-katman/0 konsol. Kategori Excel'i alındı → `tasks/kategori-haritasi.md`
> (entegrasyon Faz 4). Sentez+inceleme listesi: `outputs/cila2-faz3-sentez.md`.
> Lessons +5 ders. **COMMIT ATILMADI — öneri sentez §9'da, Beyar onayı.**
> Takım kapatıldı.)
> Önceki: 2026-06-12 gece (**CİLA-2 FAZ 2 TAMAM —
> ÜYELİK/PROFİL MODÜLÜ, agent team cila2-faz2**: İA `tasks/uyelik-ia.md`
> (kilitli, M1–M8 lead kararlı) · login simülasyonu `?auth=1/0` + localStorage
> `dm_auth` + `body.is-auth` · header login-state 55 sayfaya sweep (avatar
> dropdown + ➕Ekle + 🔔 zil; shop/panel/hesaplayıcı bilinçli muaf) · defter
> own↔public mod (`?view=public`) + durum chip filtresi · hesabim yalnız-ayar +
> 38px borç kapandı · giris demo pre-fill (tek tık → login) · 🆕
> `puf-noktasi-ekle-v1` · BNP "Deftere Kaydet"→defter köprüsü · puf/tarif-detay
> yorum+kaydet gate'leri (lg-gate) · persona Elif Şahin hizalı. Envanter
> 68→**69**. Denetim: 36-ölçüm örneklem probe + 4 bulgu kapandı (en kritiği:
> sweep'in anasayfa CSS'ini yutması — restore+elle patch, lessons'a işlendi).
> Sentez + inceleme listesi: `outputs/cila2-faz2-sentez.md`. Beyar incelemesi
> TAMAM; commit `c10c43b` + PUSH onaylı (Pages patron turu için güncel).
> CİLA-2 Faz 2 takımı (cila2-faz2) kapatıldı. **SIRADA: FAZ 3** — hero/
> breadcrumb kanonu (saglik-testler dahil) + kurumsal düzeltmeler + QA.
> Bekleyen patron kararları: DadaStore marka dili · M2 sosyal login seti
> (ana site FB ↔ shop Apple) · mekan-detay 5px göz teyidi. İsteğe bağlı mini:
> lg-gate Faz 3 genişletmesi · ölü CSS temizliği (puf-ekle stepper + BNP
> wizard).)
> Önceki: 2026-06-12 akşam (**CİLA-2 FAZ 1 REVİZE
> TURU TAMAM — Beyar incelemesinden çıkan 17 iş kanıtlı kabul**: Premium rozet ·
> TD galeri/video sadeleşme · görselli facet (tarif-liste+kategori) · rota
> yatay step rail v2 · mutfağa-giriş one-page gnav · püf+kesfet hero overlay
> crumb · ansiklopedi IA (kategori + tıkla-aç) · dz-card v2 simetrik · BNP
> sihirbazsız (mod→menü→koleksiyon) · shop login modalı · kampanya bandı hero ·
> Boyut/Ölçü SVG facet · tarif-bulucu üst-geniş düzen (R14) · legacy anasayfa
> varyantları mockups/arsiv/ altında (15 dosya, envanter dışı). + R15: BNP
> görselli mod kartı rayı. Commit'ler: checkpoint `c5e8826` + fix `d3e1c2b`
> (**PUSH YOK — Beyar push kararını ayrıca verecek**). Revize sentezi:
> `outputs/cila2-faz1-sentez.md`. CİLA-2 Faz 1 takımı (cila2-faz1) kapatıldı.
> Beklemede: DadaStore marka dili · mekan-detay 5px · BNP ölü wizard CSS
> (handoff "Faz 2 Girdileri" bölümü).)
> Önceki: 2026-06-12 (**CİLA-2 FAZ 1 TAMAM — patron
> revize turu, 4 modül paralel, agent team**: 25 iş kalemi kanıtlı kabul.
> TARİF (₺ rozet, grid⇄liste, ikonlu facet, TD video modal) · SIRLAR (Mutfağa
> Giriş IA + detay, püf liste/blog-detay + rev-* yorum, YENİ Mutfak
> Ansiklopedisi modülü, ölçü one-page + markalı SVG) · SAĞLIK (2 sekmeli test
> listesi, sade dz-card, profil Tarifleri sekmesi, BNP yeniden: menü çıktısı +
> hazır menüler) · SHOP (ayrı mağaza kabuğu + DadaStore SVG logo, özgün hero,
> kompakt p-card + fav fix, bambu serpiştirme, görsel kategori paneli, fatura
> adresi JS) + site-geneli dropdown sweep 52 dosya + "Dada Denedi"→"Şefin
> Tercihi" SIFIRLANDI + 390 mobil probe üretim seti 3×0. Envanter 64→68.
> Sentez: `outputs/cila2-faz1-sentez.md`. **COMMIT ATILMADI — Beyar onayı
> bekliyor.** Sıradaki: Beyar/patron incelemesi → cila-2 faz 2/3 (hero kanonu).)
> Önceki: 2026-06-12 gece (KEŞFET MEKAN MODÜLÜ TAMAM — Beyar onaylı,
> commit+push'lu: mekan-detay TD anatomisi mirası. Kanıt:
> `outputs/kesfet-mekan-rapor.md`)
> Önceki: 2026-06-12 akşam (mekan-liste-v1 **KABUL** · mekan-detay-v1 Tur 1
> reddedildi. Envanter 62→64 sayfa.)
> Önceki: 2026-06-12 (**REVİZE-2 TAMAM** — site geneli
> mobil sabit-katman disiplini: 🔴1+🟡53 çözüldü, kanonik pattern 55 dosyada,
> kılavuz §3b; keşfet konsepte geri çekildi (Mekânlar · Gurme Lezzetler ·
> Etkinlikler). Commit: `a8d45b7 fix(mockup): revize-2`. Detay:
> `outputs/revize2-sentez.md` + `revize2-{mobil1,mobil2,kesfet}.md`)
> Önceki: 2026-06-11 final cila (`outputs/cila-raporu.md` ·
> `outputs/testler-rapor.md` · `outputs/gorsel-rapor.md`)

---

## 📦 SAYFA ENVANTERİ — 71 üretim sayfası

- CİLA-2 Faz 4'te doğan (2026-06-13): `sef-ol-v1.html` (şef başvuru sayfası —
  diyetisyen-ol kardeşinden türev: 4 bölüm Kişisel/Uzmanlık/Deneyim/Sosyal Medya,
  pre-fill dolu, gerçek Tarif Kategori uzmanlık çoklu seçim; "Şef Ol" 65 sayfa →
  buraya). Faz 4 kategori verisi `tasks/kategori-veri.md` + regresyon denetimi
  `tasks/kategori-regresyon-raporu.md`.


- **68 × `*-v1.html`** + `anasayfa-portal-v3a.html` (kanonik baz) +
  `panel-shell.html` (diyetisyen paneli iskeleti)
- CİLA-2 Faz 3'te doğan (2026-06-13): `sefler-v1.html` (şef dizini — _shell +
  diyetisyen-dizin H1 hero + chef-card dilinde sef-card grid; "Şefler" hedefi).
  Hero/breadcrumb kanonu: kılavuz **§2f**. Ramazan modu 5 sayfada
  (`?ramazan=1/0`, patron onayı bekliyor)
- CİLA-2 Faz 2'de doğan (2026-06-12): `puf-noktasi-ekle-v1` (tarif-ekle form
  kiti mirası, tek adım). Üyelik akışı: `tasks/uyelik-ia.md` (İA) + login-state
  55 sayfada (`?auth=1/0`)
- CİLA-2 Faz 1'de doğan (2026-06-12): `mutfaga-giris-detay-v1` (TD anatomisi)
  + `puf-noktasi-detay-v1` (blog detay + rev-* yorum) + `ansiklopedi-v1` +
  `ansiklopedi-detay-v1` (YENİ SEO modülü "Mutfak Ansiklopedisi"; sozluk-v1
  AYNEN korundu — patron şartı). Shop ailesi (5 dosya) artık AYRI MAĞAZA
  KABUĞU taşır (ana site nav'ı yok; "Ana Siteye Dön" + DadaStore SVG logo)
- Mekan modülü (2026-06-12): `mekan-liste-v1` (kabul) + `mekan-detay-v1`
  (tasarım reddedildi — yeniden yapılacak, sayfa envanterde)
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

## 🔜 FAZ 2 GİRDİLERİ (CİLA-2 kapanışında not edildi — 2026-06-12)

1. **BNP → üyelik modülü köprüsü:** bugun-ne-pisirsem'deki menü ekleme/çıkarma/
   düzenleme aksiyonları (Değiştir · Çıkar · Kap Ekle · Adını Değiştir ·
   Deftere Kaydet) Faz 2 üyelik modülüne bağlanacak — menü = kullanıcının
   kaydedip düzenleyebildiği koleksiyon.
2. **Püf yorumları → üye akışı:** puf-noktasi-detay'daki .rev-* yorum bölümünün
   üye akışına bağlanması Faz 2 İA'sında ele alınacak.
3. **Bekleyen 3 madde:** DadaStore marka dili kararı · mekan-detay 5px göz
   teyidi · BNP ölü wizard CSS temizliği (isteğe bağlı mini iş).

## 🗂️ FAZ 4 GİRDİSİ — Kategori entegrasyonu (2026-06-13)

Gerçek üretim kategorileri alındı: `tasks/KategoriEkle.xlsx` (11 sheet).
**Kategori entegrasyonu Faz 4'te, harita `tasks/kategori-haritasi.md`'de**
(sheet → sayfa/modül eşlemesi + yapısal fark notları: BNP mod 8→14, püf
soru-format, keşfet 6'lı, ölçü iki seviye). Faz 3'te tek istisna uygulandı:
ansiklopedi Katman-1 gerçek Sözlük kategorileriyle kuruldu.

## ⏳ PATRON BEKLEYENLER (Yasin Bey / iş kararı — dokunulmadı)

1. ~~Günün Tarifi bandının ana sayfa yeri~~ → **ÇÖZÜLDÜ Faz 3** (Keşfet
   sonrasına taşındı, ritim düzeldi)
1b. 🌙 **RAMAZAN MODU konsepti onayı (YENİ — Faz 3)**: 5 sayfada canlı demo
   (`?ramazan=1&demo=1`); onaylanırsa site-geneli yayılım + gerçek vakit API'si
2. Mutfak Sırları arka plan videosu (statik foto ile çözüldü)
3. Mobil app tanıtım landing'i (m3) — app bandı + footer rozetleri buna bağlı
4. ~~Reklam alan yerleşimi (m29)~~ → **Faz 3'te "Yerleşimler" bölümü kuruldu**
   (9 yerleşim + mock metrik); paket fiyatları kararı hâlâ patronda
5. EN dil stratejisi (dil menüsü mock)
6. Malzeme başı dış market "Sipariş Et" dropdown'ı
7. Video ray modeli (m13) — "Seriyi Aç" hedefi buna bağlı
8. Kupon iş kuralları (tek kupon? eşik tabanı?)
9. Sözlük Q/W/X politikası · sosyal login seti (FB?) · siparişlerim hesaba
   5. sekme mi · BMH pediatrik kapsamı · vücut tipi eşikleri (diyetisyen onayı)
10. Header bildirim zili (yeni chrome UI) · haftalık menü→alışveriş köprüsü
11. Yasal metinler hukukçu onayı + künye tüzel bilgileri + ekip isimleri
12. Sezon "Günün Ayeti" bloğu (editöryel) · "Şef Ol" hedefi (**Faz 3 ara
    çözümü: →tarif-ekle**; patron farklı isterse tek href sweep'i)

## ➡️ SONRAKİ ADIM (Beyar kararı — 2026-06-12)

0. **CİLA-2 FAZ 2 TAMAM ✅ (2026-06-12 gece)** — üyelik/profil modülü; detay
   ve commit önerisi `outputs/cila2-faz2-sentez.md`. Sıradaki adaylar: commit
   onayı → hero kanonu (Faz 3) + lg-gate genişletmesi + M2 patron kararı.
1. **CİLA-2 FAZ 1 TAMAM ✅ (2026-06-12, agent team: lead + 4 teammate)** —
   patron (Yasin Bey) revize turu 25 iş kalemi kanıtlı kabul; envanter 64→68;
   site-geneli dropdown sweep (Mutfağa Giriş + Mutfak Ansiklopedisi, 52 dosya);
   "Dada Denedi" site genelinde SIFIR; 390 mobil probe üretim setinde
   taşma/konsol/çift-katman 3×0. Sentez + Beyar inceleme listesi:
   `outputs/cila2-faz1-sentez.md`. **COMMIT BEYAR ONAYI BEKLİYOR** (öneri
   sentez raporunun sonunda).
2. **Beyar/patron incelemesi:** sentezdeki "Beyar incelemesi bekleyenler"
   (rozet adı, Ansiklopedi modül adı, DadaStore marka dili, legacy varyant
   arşiv kararı + mekan-detay 5px artefakt göz teyidi).
3. **CİLA-2 devam fazları:** hero kanonu (Faz 3 — saglik-testler hero'su
   dahil) + revize-2 tereddütleri (hesabim 38px buton, gerçek cihaz teyidi).
4. Sonrası: stack kararı (Laravel mi statik mi) + EN dil stratejisi.

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
- **Üyelik (Faz 2):** `?auth=1` login / `?auth=0` çıkış (localStorage kalıcı;
  shop+panel+hesaplayıcı MUAF) · defter `?view=public` · `?tab=` · giris
  ön-dolu (tek tık) · tarif-ekle `?mode=edit` · puf-ekle `?state=`
- **Test ailesi:** `test-detay-v1.html?test=metabolizma|su-hidrasyon|
  temel-pisirme|hangi-yemek` (+`&sonuc=1` sonuç kartı)
- **Tarif detay:** `?cook=1` pişirme modu · yazıcı ikonu = print görünümü
- Dalga paramları: `outputs/dalga{2,3,4}-sentez.md` · Scratch SS:
  `mockups/.ss-scratch/` (gitignored) · Mobil SS: 500px + 390 iframe probe
  (kılavuz §4) · Probe altyapısı: `.ss-scratch/cila/sweep.py`
