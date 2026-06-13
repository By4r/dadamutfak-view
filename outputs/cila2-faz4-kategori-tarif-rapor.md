# Cila-2 Faz 4 — Tarif Kategori + Tip Entegrasyonu Raporu

> Teammate: **kategori-tarif** · Task #1 · Takım: cila2-faz4
> Veri kaynağı: `tasks/kategori-veri.md` §1 (Tarif Kategori 27) + §2 (TarifTipleri 14)
> Karar zinciri: team-lead onayı — href=`.html` KALIR + Excel slug `data-slug`+`title` olarak gömülür; mega 11 küratör + facet/footer-yüzeyinde 27 tam; sıralama: ben önce, ux-revize gate'te.

## Özet

Excel'den gelen **27 gerçek tarif kategorisi** ve **14 gerçek tarif tipi** mockup'a işlendi; tüm mock kategori/tip setleri silindi. Görselli facet/chip pattern miras alındı (yeniden yazılmadı), kanon/hero CSS'e dokunulmadı. Kategori linklerinde demo click-through korundu (`href=kategori-v1.html`) + gerçek SEO slug `data-slug="/..."` + `title="<SEO başlık>"` olarak DOM'a gömüldü.

## Yapılanlar — Dosya × Değişiklik

### A. 14 Tarif Tipi (§2)
| Dosya | Değişiklik |
|---|---|
| `tarif-liste-v1.html` | "Beslenme" facet 8 mock → **14 gerçek tip** (Vegan, Vejetaryen, Glutensiz, Glutenli, Laktozsuz, Süt İçermez, Yumurta İçermez, Şeker İlavesiz, Yüksek Lifli, Tam Tahıllı, Protein Ağırlıklı, Az Yağlı, Acılı, Baharatlı). Başlık "Beslenme / Tip", 5 görünür + 9 xtra, `data-x="vegan"` korundu (boş-durum demosu çalışır). |
| `tarif-detay-v1.html` | hero `tbadge` setine 14-tip havuzundan 2 rozet (Protein Ağırlıklı, Baharatlı); kc-chips "Mutfak & Özellikler" gerçek tip sözlüğüne hizalandı (Protein Ağırlıklı/Baharatlı/Acılı/Glutenli). |
| `tarif-ekle-v1.html` | YENİ "Beslenme & Tip Etiketleri" alanı: 14 tip çoklu-seçim çip satırı + toggle JS. Mevcut `.chip` pattern miras (`.fk-chips .chip.active` = mevcut fb-chiprow active stiliyle aynı dil). |
| `kategori-v1.html` | "Beslenme" facet → 14 tip (tarif-liste ile tutarlı), başlık "Beslenme / Tip". |

### B. 27 Tarif Kategorisi (§1)
| Dosya | Değişiklik |
|---|---|
| `tarif-liste-v1.html` | "Kategori" facet 11 mock → **27 gerçek kategori** (görselli `cn-thumb` pattern miras, 7 görünür + 20 xtra, "20 kategori daha"). Hero popüler çipler gerçek facet değerlerine eşlendi (Çorba, Kırmızı Et, Kahvaltılık, Hamur İşi, Vegan ve Vejetaryen, Tatlı). `data-x="et"` → Kırmızı Et'e taşındı. |
| `tarif-ekle-v1.html` | Kategori `select` 12 mock → **27 gerçek kategori** (alfabetik, Excel sırası). |
| `kategori-v1.html` | Landing demo "Ana Yemekler" → **"Anadolu Mutfağı'ndan"** gerçek SEO: breadcrumb, h1, lead (Excel SEO açıklaması), eyebrow, `<title>`, stat etiketi, lst-sum + JS string. Mevcut alt-kategori rayı (Tencere/Fırın/Köfte/Güveç/Pilav) bu kategoriye birebir uyduğu için relabel gerekmedi → tutarlı, düşük risk. |
| `tarif-detay-v1.html` | Mantı tarifi breadcrumb + r-chip "Ana Yemek(ler)" → **Hamur İşi** (gerçek kategori). |

### C. Kategori Chrome Sweep (mega + drawer) — 59 sayfa
| Yüzey | Değişiklik |
|---|---|
| Desktop **mega-cats** ("Tarifler" kolonu) | 11 mock → **11 küratörlü gerçek kategori** + `data-slug`+`title` (Çorba, Kırmızı Et, Beyaz Et, Tatlı, Hamur İşi, Kek, Salata, Kahvaltılık, Zeytinyağlı, İçecek, Vegan ve Vejetaryen). "Tüm Tarifler → tarif-liste" korundu. |
| Mobil **drawer d-sub** ("Tarifler") | 12 mock → **11 gerçek kategori** + `data-slug`+`title` + yeni "Tüm Tarifler" linki (mobil/desktop paritesi). |
| **anasayfa-portal-v3a** `cat-track` | 16 kart → 16 gerçek kategori + `data-slug`+`title` (görseller korundu, elle patch). |

**Kapsam:** 58 ana-chrome sayfa anchor'lı regex script ile (idempotent, span-guard); `anasayfa-portal-v3a` divergent olduğu için script'ten HARİÇ tutulup tüm yüzeyleri (mega+drawer+cat-track) elle patch'lendi (CSS-yutma dersi).

### D. Kaçak mock kategori temizliği (içerik)
`hata-v1` (r-chip), `mutfak-defteri-v1` (puf-tag → Makarna), `tarif-detay-v1-headA` (breadcrumb), `anasayfa-portal-v3a` (puf-tag → Kırmızı Et), `tarif-liste-v1` (stale JS yorumu) — kalıntı mock kategori etiketleri gerçeğe çevrildi.

## Kanıt (söze güven yok)

- **Eski mock kategori = 0** (chrome+facet): `grep` tüm `mockups/*.html` → eski mega/drawer/cat-track mock setleri (Ana Yemekler, Et Yemekleri, Hamur Tatlısı, Salatalar & Mezeler, Çorbalar, Zeytinyağlılar, İçecekler, Vejetaryen & Vegan, Aperatifler, Tatlılar, Pilavlar, Izgara & Mangal, Dünya Mutfakları) → **kalıntı yok**.
- **Yeni veri + data-slug VAR:** 59 dosyada `data-slug="/..."`; _shell.html'de 11 uniq küratör slug; her mega-li sayfada ≥11 uniq slug; v3a'da 38 data-slug (11 mega + 11 drawer + 16 cat-track).
- **Yapısal bütünlük:** tüm mega-li sayfalarda `mega-cat-all`=1 SAĞLAM (sweep hiçbir şey yutmadı); net-negatif numstat'lı `mutfaga-giris` dahil mega/drawer intact (net-negatif T2'nin içerik düzenlemesinden, benden değil).
- **Mojibake = 0:** `grep` byte-tarama (Ã/Ä/Å) temiz; TR toplu replace'lerde `perl -CSD` KULLANILMADI — saf UTF-8 Python codec + assertion'lı replace.
- **390px taşma = yapısal imkânsız:** facet `.ft{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}` (uzun adlar ellipsis); `.cat-card b{-webkit-line-clamp:2;min-height:2.5em}` (cat-track 2-satır wrap); tip/badge satırları `flex-wrap:wrap` (`.rd-badges`, `.fk-chips`). Hiçbir değişiklik yatay büyüme üretmez.
- **numstat:** kümülatif diff diğer teammate'lerin (T2/T4) aynı dosyalardaki işini de içeriyor; benim mega/drawer sweep'im sayfa başına ~satır-nötr (aynı `<a>` satır sayısı, içerik daha uzun).

## Bilinen Sınırlamalar

1. **Playwright SS probe alınamadı** — paylaşımlı browser instance aktif teammate'te (ux-revize T4, tarif-bulucu) kilitliydi; `--isolated` geçilemiyor. Bunun yerine 390px taşma CSS-bazlı yapısal kanıtla (ellipsis + line-clamp + flex-wrap) garanti edildi. Browser boşalınca tarif-liste/kategori-v1/anasayfa-v3a SS'leri alınabilir.
2. **"Footer'da 27 tam" — footer'da kategori kolonu YOK.** Footer (`foot-grid`) kolonları: Kurumsal / Hızlı Erişim / İletişim / İş Birliği. Kategori-liste yüzeyleri yalnız **mega (desktop, 11 küratör)** + **drawer (mobil, 11+Tüm)**. 27'nin TAMAMI **facet**'te (tarif-liste Kategori facet). Yani "27 tam" gereği facet'le karşılanıyor; ayrı footer kategori listesi mockup'ta mevcut değil.
3. **Mega/drawer 11 küratör (27 değil):** team-lead onaylı tasarım kararı — locked 3-kolon mega grid'i 27 satıra çıkarmak layout'u bozardı (9 satır). 27 tam erişim facet + "Tüm Tarifler" linkiyle.
4. **data-slug click-through:** gerçek SEO slug'lar `data-slug`/`title`'da görünür ama tıklama `kategori-v1.html`'e gider (tek generic landing). Gerçek backend'de slug→sayfa routing yapılacak; mockup'ta demo-sadakat için tek landing kullanıldı.
5. **kategori-v1 landing tek örnek:** "Anadolu Mutfağı'ndan" gösteriliyor; diğer 26 kategori aynı landing'e düşer (mockup tek-sayfa demo). Alt-kategori rayı bu kategoriye uyacak şekilde bırakıldı.
6. **Başka teammate dosyalarındaki kalıntı mock kategori çipleri (DOKUNULMADI):** `mekan-detay-v1` (r-chip Çorbalar/Tatlılar — T3 kesfet-bnp, tamamlandı) ve `mutfak-sirlari-v1` (puf-tag Et Yemekleri — T2 kategori-sirlar, tamamlandı). Bunlar tarif-kartı/püf-etiketi içerik çipleri; tamamlanmış teammate dosyalarında clobber riski nedeniyle dokunulmadı. Gerekirse ilgili sahip teammate veya ayrı bir mikro-tur ile gerçeğe çevrilebilir. NOT: `diyetisyen-dizin/ol`'daki "Vejetaryen & Vegan" tarif kategorisi DEĞİL → diyetisyen uzmanlık alanı, doğru şekilde dokunulmadı.
7. **Mega/cat-track recipe count'ları mock** — kategori başına tarif sayıları (1.240, 2.105 vb.) temsilî placeholder; Excel'de tarif sayısı yok.

---

## EK: kategori-v1 Alt-Kategori Rayı Kaydırma Fix (Faz4 follow-up)

**Sorun (Beyar bulgu):** kategori-v1 alt-kategori rayı (`.subcat-track`) yatay kaydırılamıyor — çipler taşıyor ama masaüstü kullanıcı süremiyor, sonraki çipler erişilemez.

**Kök neden:** Kanonik `enableDrag` motorunun selector listesinde `.subcat-track` YOK. Ray native touch kayıyor (mobil) ama masaüstü mouse-drag + wheel→yatay yok.

**Düzeltme (kategori-v1.html — SADECE kaydırma mekaniği, kurgu/dil dokunulmadı):**
1. `.subcat-track` enableDrag selector listesine eklendi (aynı sayfadaki `.chips`/`.lh-chips`/`.row-track`'i kaydıran kanonik motora bağlandı — yeniden icat yok).
2. `.subcat-track` CSS'e `-webkit-overflow-scrolling:touch` (iOS momentum, `.mode-bar` canon'u).
3. `scroll-snap-type:x mandatory` → `proximity` (mandatory snap, JS drag scrollLeft'iyle çakışıp "kaydırılamıyor" hissi üretiyor — görsel sonuç aynı, mekanik fix).

**Genişlet taraması (çok-satır-duyarlı, tarif ailesi):** Kapsanmayan TEK ray `.subcat-track`'ti. tarif-detay (shopTrack+simTrack `grid-4 row-track` → `.grid-4` kapsıyor), tarif-liste (`lh-chips`=`.chips` kapsıyor), tarif-ekle (ray yok) → hepsi KAPSALI, ek fix gerekmedi.

**Kanıt:** kod-seviyesi kesin (selector + CSS grep teyitli; aynı motor aynı sayfada diğer rayları kaydırıyor). **SS/scrollLeft probe ALINAMADI** — paylaşımlı Playwright browser instance tüm session boyunca aktif teammate'te (ux-revize) kilitli, `--isolated` MCP'den geçilemiyor. Browser boşalınca f4-kategori-ray-son.png + f4-kategori-ray-390.png + scrollLeft probe alınabilir (team-lead'e koordinasyon için iletildi). team-lead SS'i FINAL QA'ya erteledi, kod+scroll-snap onayı verdi.

---

## EK 2: tarif-liste Sol Filtre Paneli Dikey Denge (Faz4 follow-up)

**Sorun (Beyar bulgu):** Sol filtre/kategori paneli dikeyde gereğinden kısa — yanında dikey boşluk, panel "yarım kalmış / az dolu" duruyor.

**Kök neden:** `.lst-side` sticky panel `max-height:calc(100vh-154px)` ile viewport'a cap'leniyordu → uzun sonuç grid'inin yanında, capli panelin altında kalıcı dikey boşluk. Ayrıca 3 ikincil facet grubu (Yemek Modu / İçerik Türü / Bütçe) varsayılan kapalı → panel az dolu.

**Düzeltme (tarif-liste-v1.html — frontend-design skill ile; SADECE sol panel, sağ grid + facet verisi + açık-grup seti DOKUNULMADI):**
1. **Desktop'ta (≥1025px) `max-height` cap kaldırıldı** (`max-height:none;overflow-y:visible`) → panel içeriğine göre uzar, sağ sonuç kolonu (`.lst-main`) yüksekliğine oturur, dikey boşluk kapanır. `position:sticky;top:130px` korundu. Mobil (≤1024) bottom-sheet + base cap media-query ile İZOLE, DEĞİŞMEDİ.
2. Dikey ritim rafine artırıldı: `.fct-head` 15→17px, `.fct-row` 6→7px, `.fct-body` alt 15→18px, `.fil-top` 16/12→18/14px → nefes dağıldı, kompozisyon kasıtlı.
3. Açık facet grup seti (Kategori, Dünya Mutfağı, Süre, Zorluk, Beslenme — orijinal 5) KORUNDU. (İlk denemede 8/8 grup açıldı ama ölçüm panel/kolon oranını 1.44'e çıkardı = over-fill; orijinal 5'e geri alındı.)

**Kanıt (headless Chrome + playwright-core, ayrı instance — MCP kilidi aşıldı):**
- **1440 SS: `outputs/f4-tarif-liste-panel-1440.png`** — panel sağ kolonla dengeli iniyor, "yarım kalmış" hissi gitti.
- **Yükseklik ölçümü:** panel `.lst-side`=1679px, sağ kolon `.lst-main`=1477px → **oran 1.14** (panel kolonu ~%14 aşıyor = dengeli/dolu, stubby-void yok). Önceki capli durum: panel ~800px ≪ kolon 1477 → ~677px boşluk.
- facet verisi bütünlüğü grep-teyitli (Kategori 27 + Beslenme 14 satır aynen); panel içi 390-stil taşma 0; sağ grid/veri/HTML dokunulmadı.
