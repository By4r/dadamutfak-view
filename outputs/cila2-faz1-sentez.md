# CİLA-2 FAZ 1 — SENTEZ RAPORU (patron revize turu, 4 modül paralel)

> Tarih: 2026-06-12 · Takım: cila2-faz1 (lead + 4 teammate, FULL AUTO)
> Modül raporları: `cila2-faz1-{tarif,sirlar,saglik,shop}-rapor.md`
> Faz sonu probe: `mockups/.ss-scratch/cila2/faz-sonu-probe/OZET.md`
> Kabul SS'leri: `mockups/.ss-scratch/cila2/{tarif,sirlar,saglik,shop}/`

## SONUÇ ÖZETİ

25 iş kalemi (5+8+4+8) **tamamı kanıtlı kabul edildi**. Envanter 64 → **68
üretim sayfası** (4 yeni: `mutfaga-giris-detay-v1`, `puf-noktasi-detay-v1`,
`ansiklopedi-v1`, `ansiklopedi-detay-v1`). Faz sonu denetim üçlüsü:

| Denetim | Sonuç |
|---|---|
| Site-geneli "Dada Denedi" grep | **0** (66×v1 + v3a + legacy taslaklar dahil; hexdump UTF-8 teyitli) |
| 390px mobil teyit (73 değişen dosya) | Üretim seti **taşma 0 · konsol hatası 0 · §3b çift katman 0** |
| Hero/breadcrumb scope diff | İhlal **0** (yalnız dada-shop hero — izinli istisna; puf crumb taşınması görev gereği) |

## MODÜL MODÜL YAPILANLAR

### TARİF (kategori-v1, tarif-liste-v1, tarif-detay-v1)
1. Hero "Bu Kategoride Popüler" yan başlığı bold (kategori + liste `.lh-chips .lbl`)
2. Facet kategorileri ikonlu — yeni `.fct-ico` (domates-tint mini FA; eski cartoon webp modernize; bayraklar korundu)
3. Maliyet seviye rozeti `.r-cost` (₺/₺₺/₺₺₺ — TL fiyat değil) + TD künyesine "Orta Bütçe (₺₺)" chip'i
4. Grid⇄liste toggle — kanonik `.vw-seg`, `?view=list` derin link, tam liste görünümü, çalışır JS
5. TD thumbnail şeridi kaldırıldı; sağ üst video butonu → mevcut `.video-modal` aç/kapat (probe'lu)

### SIRLAR (mutfaga-giris, puf-noktalari, olcu-birimleri, mutfak-sirlari + 4 YENİ dosya)
1. Dropdown ilk öğe "Mutfağa Giriş" + YENİ "Mutfak Ansiklopedisi" öğesi
2. Mutfağa Giriş IA'sı eski siteye göre yeniden: konu kütüphanesi blokları + alt-kategori chip filtreleri; Önerilen Rota 8 TIKLANABİLİR adım → ders detayı
3. `mutfaga-giris-detay-v1` üretildi (TD anatomisi mirası)
4. Püf etiketleri tag-ikon + slider; paylaş sağ uçta, hover popover (X/WA/mail/mesaj/kopyala)
5. Püf 2 sayfa tipi: saf liste (`puf-noktalari-v1`) + düz blog detay (`puf-noktasi-detay-v1`)
6. Püf detayına `.rev-*` yorum bölümü (verbatim miras)
7. YENİ SEO modülü "**Mutfak Ansiklopedisi**" (liste + "Barbunya" örnek maddeli detay; Nedir/Ne işe yarar/Faydaları + besin değeri + tarif rayı). Mevcut sozluk-v1'e DOKUNULMADI (diff boş — patron şartı)
8. Ölçü birimleri one-page (smooth scroll + scrollspy) + markalı inline-SVG ürün önizlemeleri (elde üretildi)
+ **Site-geneli dropdown sweep: 52 dosya** (idempotent script; sozluk-v1 href="#" kaçağı yakalanıp manuel düzeltildi; shop kabuğuna sızıntı 0)

### SAĞLIK (saglik-hub, saglik-testler, test-detay, diyetisyen-dizin/profil, bugun-ne-pisirsem)
1. Test listesi 2 sekmeli gruplama: "Sağlık & Beslenme" (6) + "Eğlence & Kişilik" (4); `?grup=` derin link; saglik-testler GÖVDESİ dönüştürüldü (hero'ya dokunulmadı — yeni dosya açılmayarak site-geneli link değişikliği önlendi); +1 yeni test (beslenme, 8 soru)
2. Diyetisyen kartı sadeleşti (ikon-only doğrulama, etiket 2, meta 2)
3. Diyetisyen profiline "Tarifleri" sekmesi (`?tab=tarifler`, r-card verbatim, 8 kart)
4. **Bugün Ne Pişirsem yeniden kuruldu:** sihirbaz sonu MENÜ ÇIKTISI (kaplara bölünmüş; "kabı değiştir"/"menüyü yenile" çalışır mock — probe'da swap teyitli) + 6 seçilebilir hazır menü koleksiyon kartı. Stepper ailesi korundu

### SHOP (dada-shop, urun-liste, urun-detay, sepet, odeme + anasayfa header)
1. **Ayrı mağaza kabuğu** (5 dosya): mağaza nav (Mağaza/Kategoriler/Kampanyalar/Çok Satanlar/Yöresel) + "Ana Siteye Dön"; token/footer/çerez mekaniği _shell ile aynı; dmCart korundu
2. Anasayfa header Dada Store: dropdown kaldırıldı → direkt link (başka dokunuş yok, diff teyitli)
3. Hero yeniden: aydınlık e-ticaret billboard'u + öne çıkan ürün kartı
4. p-card: bozuk favori kök nedeni bulundu (`.p-fav` CSS'i yalnız urun-detay'daymış) → 3 dosyaya verbatim gömüldü; `.p-desc` kaldırıldı; kompakt kart
5. Bambu/ahşap ürünler katalog arasına serpiştirildi (+kategori/facet)
6. Sol kategori paneli görselleştirildi (thumbnail'li)
7. DadaStore SVG logosu (domates çanta + çatal/kaşık)
8. Ödeme: fatura checkbox işaretsizken fatura formu açılır (çalışır JS + Bireysel/Kurumsal; `?fatura=1` test paramı)

## ⚠️ MİNÖR İZLEME (acil değil)
- `mekan-detay-v1` 390 probe'da 5px sözde-taşma — kapalı drawer/scrollbar artefaktı
  teşhisi (gözle görünür değil); mekan modülü sahibine 1 dk göz teyidi önerilir.
- TD'de eski thumb/stage-play taban CSS'i zararsız kalıntı (markup'ta 0 kullanım).

## 📋 BEYAR İNCELEMESİ BEKLEYENLER (modül raporlarında detay)
1. **tarif:** maliyet rozet adı "Premium" yerine "Yüksek bütçe" seçildi (Bütçe facet tutarlılığı); TD maliyeti rdf hücresi değil chip
2. **sirlar:** "Mutfak Ansiklopedisi" modül adı onayı; mutfaga-giris-detay TD+art hibrit dili; puf-detay art-hero seçimi; dropdown ikonları (graduation-cap/seedling)
3. **saglik:** saglik-testler hero↔yeni gövde uyumu Faz 3'e kaldı (scope kilidi); dz-card'da yıl yerine görüşme türü tutuldu
4. **shop:** marka "DadaShop" değil mevcut "DadaStore" dili korundu; mağaza chrome menü hedefleri placeholder (Sipariş Takibi/Yardım); bambu görselleri kitchen-generic; anasayfa drawer'daki Dada Store akordeonu (iş kapsamı dışı — header'dı) dokunulmadı; bottom-nav Favoriler href=#
5. **Legacy varyant kararı:** anasayfa-portal(+v2/v3b/v3c) ve deneme taslaklarında taşma/çift-katman/konsol bulguları var (üretim envanteri dışı, patch açılmadı) — arşivlensin mi silinsin mi?

## COMMIT ÖNERİSİ (Beyar onayı bekliyor — ATILMADI)
Tek commit önerisi:
`feat(mockup): cila-2 faz 1 — patron revize turu, 4 modul paralel (tarif/sirlar/saglik/shop) + ansiklopedi modulu + shop kabugu + sitewide dropdown sweep`
Kapsam: 70 değişen + 4 yeni html, 5 rapor, handoff+lessons. İstenirse modül başına 4-5 ayrı commit de bölünebilir.

---

# REVİZE TURU SENTEZİ (Beyar incelemesi sonrası — 2026-06-12 akşam)

> 13 madde (R1-R13) + R0 Premium rename + arşiv taşıma + kesfet R6 (Beyar
> onayıyla kapsama alındı) + R14 (tarif-bulucu) = **17 iş, tamamı kanıtlı kabul**.
> Loop sigortası ihlali YOK; hiçbir madde 3. tura kalmadı.

## Kapanan kararlar
- Rozet adı **"Premium"** (₺₺₺) — uygulandı, "Yüksek Bütçe" grep=0
- **"Mutfak Ansiklopedisi"** modül adı onaylı
- Legacy anasayfa varyantları **mockups/arsiv/** altına taşındı (15 dosya,
  git mv; kanonik v3a kaldı; üretimden arşive ölü link 0) — envanter dışı
- BEKLEMEDE (dokunulmadı): DadaStore marka dili · mekan-detay 5px artefakt

## Modül modül revizeler
**TARİF:** R0 Premium · R1 TD galeri boşluğu kapandı (sahne künye yüksekliğine
uzar, stageH=kunyeH=584) · R2 video butonu sadeleşti (▶ 04:32 süre rozeti;
süs/mükerrer badge kalktı) · R3 facet kategorileri görselli (urun-liste
cat-fct/cn-thumb verbatim; kategori-v1'e de tutarlılık için uygulandı) ·
R14 tarif-bulucu: dolap tam genişlik üst banda (arama+seçilenler tam genişlik,
raflar geniş + ikincil filtreler dar sağ kolon, sonuçlar altta 3 kolon) —
salt CSS, DOM/JS/mobil sheet bire bir korundu; eski template +
nefisyemektarifleri araştırması ve 3 yerleşim önerisi raporda.

**SIRLAR:** R4 Önerilen Rota yatay step rail v2 (faz gruplama TEMEL/PİŞİRME/
HAMUR/SOS/İLERİ + "Adım X/12" ilerleme barı + ok navigasyonu; 12 adım kaydırma
kanıtlı sw=3516) · R5 one-page gnav çapa çubuğu (olcu mirası, scrollspy) ·
R6 püf detay breadcrumb hero üstüne overlay (art-hero-crumb) · R7 ansiklopedi
IA: görünür ana kategoriler + tıkla-aç madde satırları (eski sözlük modeli) ·
R8 modüler bloklar + blok-başı dikey paylaş rayı (eski referans birebir) ·
EK: kesfet-v1 R6 aynı pattern'le düzeltildi (Beyar onayı; art-crumb-bar
grep=0, toggle id'leri korundu).

**SAĞLIK:** R9 v2 dz-card simetrik merkezli kompozisyon (avatar üstte ortalı,
merkez hizalı kimlik/etiket/meta, krem foot + tam genişlik CTA) · R10 BNP
sihirbaz TAMAMEN kaldırıldı → mod chip rayı → menü listesi → koleksiyon
düzenleme (Değiştir/Çıkar/Kap Ekle/Adını Değiştir/Deftere Kaydet; ?mod= ?menu=
derin link). Not: ~43 kurallık ölü wizard CSS'i bilinçli bırakıldı (iç içe,
cerrahi silme riskli) — isteğe bağlı temizlik maddesi.

**SHOP:** R11 shop-içi login MODALI (5 dosya; giris-v1'e sızıntı 0) · R12 hero
kurgu değişimi: kampanya bandı + canlı geri sayım + 4'lü fırsat rayı ·
R13 YENİ "Boyut/Ölçü" facet'i — **SVG ölçü-tile** (artan çaplı halkalar +
hacim kupası; fotoğraf ölçüyü okutmadığı için bilinçli SVG; kategori=foto,
Özellik=ikon, Marka=monogram swatch'larıyla görsel dil 4 facet'e yayıldı).

## Denetim sonuçları (lead, bağımsız)
- Tüm kabuller grep + probe log + SS üçlüsüyle doğrulandı; SS'ler Beyar'a
  sohbette açıldı.
- R14 diff'i salt CSS teyitli; arşiv taşıması link-kırılmasız (grep 0).
- 390 taşma: değişen sayfalarda 0 (teammate probe'ları; kesfet ?detay=1 dahil).

## Beyar incelemesi bekleyenler (revize sonrası güncel liste)
1. DadaStore marka dili (beklemede, karar verilmedi)
2. mekan-detay 5px artefakt göz teyidi (beklemede)
3. BNP ölü wizard CSS temizliği (isteğe bağlı, ayrı mini iş)
4. Shop chrome placeholder linkleri (Sipariş Takibi/Yardım) — Laravel fazı

## FIX COMMIT ÖNERİSİ (Beyar onayı bekliyor — ATILMADI)
`fix(mockup): cila-2 faz 1 revize turu — 17 madde (premium rozet, TD galeri/video, gorselli facet, rota step rail, puf/kesfet hero overlay, ansiklopedi IA, dz-card v2, BNP sihirbazsiz, shop login/hero/boyut facet, tarif-bulucu ust duzen) + legacy arsiv`

## R15 (kapanış öncesi son ek — Beyar)
BNP mod chip'leri görselli mod kartı rayına dönüştürüldü: arka plan görselli
148×94 kart + gradient overlay + ikon/etiket + aktif domates ring/rozet;
mobilde yatay snap rayı. JS filtre akışı değişmedi. (saglik — BNP 2. tur,
loop sigortası sınırında kabul.)
