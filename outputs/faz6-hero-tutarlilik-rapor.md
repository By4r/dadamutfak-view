# FAZ 6 — T1 Hero Tutarlılık Raporu

> Sahip: `hero-tutarlilik` · Kapsam: tüm üretim sayfaları (`mockups/*-v1.html` + `anasayfa-portal-v3a`)
> Referans: `tasks/bilesen-kilavuzu.md §2f` (HERO+BREADCRUMB KANONU), §3, §3b · COMMIT YOK.

## Özet kararı

Hero sistemi beklenenden **çok daha tutarlı** çıktı. §2f kanonuna göre 71 üretim
sayfası taranınca: **H1 landing/hub** ailesinin tamamı zaten koyu-overlay görselli
(lst-top/sh-top/vhub/tst-top), **H2 detay** sayfaları zaten görselli editoryal/künyeli
hero, **H3 görev** sayfaları zaten kanon gereği kompakt-görselsiz + breadcrumb. Tek
gerçek "çıplak ama H1 olması gereken" sayfa **`mutfak-sirlari-v1`** idi (rehber HUB
ama beyaz-kompakt head) → kanonik H1'e çekildi.

**Lead'in "çıplak" örnekleri (bugun-ne-pisirsem, tarif-bulucu) BİLİNÇLİ H1'e
ZORLANMADI** — ikisi de §2f hak-ediş kuralında **H3 görev** (kullanıcıya iş yaptıran
sihirbaz/arama araçları); tarif-bulucu §2f H3 listesinde adıyla geçiyor. §2f: "H3
hero görseli YOK". İmaj eklemek kanonu BOZARDI. Bu, tam da "tasarımcı gözü +
hak-ediş disiplini" gereği yapılan red. (Detay aşağıda §"Bilinçli H1'e çekilmeyenler".)

---

## Değişen dosyalar

| Dosya | Değişiklik |
|---|---|
| `mockups/mutfak-sirlari-v1.html` | `hub-top` beyaz-kompakt head → **H1 koyu-overlay görselli hero** (lst-top dili): bağlam görseli (pişirme/baharat flatlay, v3a suffix) + beyaz crumb override + cam-chip rayı + **sağda metrik şeridi** (5 / 240+ / 60+). CSS bloğu + tablet + mobil + markup (lh-main sarmalayıcı + hub-stats). Kimlik korundu (REHBER eyebrow, hızlı-geç chip hedefleri aynı). |
| `mockups/_overflow_probe.html` | (YENİ, `_`-prefix QA aracı — üretim sayfası değil) 390px element-rect taşma probe harness'i. |

> Paylaşımlı 5 dosyaya (ansiklopedi-v1, ansiklopedi-detay-v1, sozluk-v1 [T4];
> mutfaga-giris-v1, olcu-birimleri-v1 [T5]) **DOKUNULMADI** — hepsi zaten kanon-doğru
> (aşağıda doğrulandı). Çakışma yok, koordinasyon mesajı gerekmedi.
> `tarif-liste-v1` (T3) ve `_shell.html` dokunulmadı.

---

## BEFORE envanteri — §2f varyant sınıflaması (71 sayfa)

### H1 · Landing/Hub koyu-overlay görselli (lst-top/sh-top/vhub/tst-top) — HEPSİ DOĞRU ✓
Görsel CSS'te (`.lst-top{background-image: overlay + unsplash v3a}`), padding-top:128 nefes:

| Sayfa | Konteyner | padding-top | Durum |
|---|---|---|---|
| tarif-liste-v1 (T3 atası) | lst-top | 128 | ✓ kanonik ata — dokunulmadı |
| akademi-v1 | lst-top | 128 | ✓ |
| ansiklopedi-v1 ⟨T4⟩ | lst-top | 128 | ✓ |
| gunun-menusu-v1 | lst-top | 128 | ✓ |
| kategori-v1 | lst-top | 128 | ✓ |
| koleksiyon-v1 | lst-top | 128 | ✓ |
| mekan-liste-v1 | lst-top | 128 | ✓ |
| seo-landing-v1 | lst-top | 128 | ✓ |
| sezon-v1 | lst-top | 128 | ✓ |
| sss-v1 | lst-top | 128 | ✓ |
| diyetisyen-dizin-v1 | lst-top | 128 | ✓ |
| hakkimizda-v1 | lst-top | 128 | ✓ |
| mutfaga-giris-v1 ⟨T5⟩ | lst-top | 128 | ✓ |
| puf-noktalari-v1 | lst-top | 128 | ✓ |
| reklam-ver-v1 | lst-top | 128 | ✓ (Beyar canlı vaka — düzeltilmişti) |
| sefler-v1 | lst-top | 128 | ✓ |
| sozluk-v1 ⟨T4⟩ | lst-top | 128 | ✓ |
| saglik-hub-v1 | sh-top (yeşil-tint) | ✓ | ✓ |
| saglik-testler-v1 | tst-top→sh-dili | ✓ | ✓ (Faz3 krem→yeşil düzeltmesi yapılmış) |
| video-mutfagi-v1 | vhub-hero (immersive) | — | ✓ crumb'sız muaf |
| **mutfak-sirlari-v1** | **hub-top (beyaz-kompakt)** | **112** | **🔴 ÇIPLAK → H1'e çekildi** |

### H2 · Detay hero (görselli) — HEPSİ DOĞRU ✓
| Sayfa | Konteyner | Tip |
|---|---|---|
| puf-noktasi-detay-v1 | art-hero | H2a editoryal (overlay-crumb atası) ✓ |
| mutfaga-giris-detay-v1 | rd-top + rd-gallery | H2 görselli (rd-stage bg-image) ✓ |
| ansiklopedi-detay-v1 ⟨T4⟩ | rd-top + rd-gallery | H2 görselli ✓ |
| tarif-detay-v1 | rd-top + kunye | H2b yapısal-künyeli (ata) ✓ |
| mekan-detay-v1 | md-top + rd-gallery | H2b görselli ✓ |
| urun-detay-v1, siparislerim-v1 | rd-top/ord-top | shop/künye — KAPSAM DIŞI |

### H3 · Kompakt görev üstü (hero görseli YOK = §2f gereği DOĞRU) ✓
Hepsinde `rd-crumb` + kompakt `*-head` (eyebrow/h1/lead) + below-header 112 nefes:

`bugun-ne-pisirsem-v1` (bnp-top) · `tarif-bulucu-v1` (tb-top) · `arama-v1` (srch-top) ·
`besin-kutuphanesi-v1` (nb-top) · `haftalik-menu-v1` (hm-top) · `alisveris-listesi-v1`
(al-top) · `kesfet-v1` (ke-top, §2f'de adıyla H3) · `iletisim-v1` (con-top) ·
`bildirimler-v1` (nt-top) · `hesabim-v1` (hs-top) · `diyet-listeleri/program-detay`
(dl-top) · `olcu-birimleri-v1` ⟨T5⟩ (ob-top) · `sef-ol-v1`/`diyetisyen-ol-v1` (ol-top,
başvuru-form sibling, §2f diyetisyen-ol=H3) · `tarif-ekle/puf-ekle-v1` (fp-top form) ·
`onboarding-v1` (bnp-top wizard) · `giris-v1` (au-top) · `yasal-v1` (lg-top) ·
`vucut-tipi/ideal-kilo/gunluk-kalori/gunluk-su/bazal-metabolizma/beden-kutle-endeksi`
(calc-top muaf dil) · `hesaplayici-v1` (calc-top, chrome muaf).

### Muaf / kapsam dışı
- **Profil dili** `pf-top` (banner+avatar): `diyetisyen-profil-v1`, `mutfak-defteri-v1` — H1/H2/H3 dışı, kendi dili ✓
- **Crumb'suz kasıtlı**: `anasayfa-portal-v3a` (hero-v), `hata-v1` (404), `video-mutfagi` (immersive), panel ailesi (`dyt-*`, `panel-shell`) ✓
- **Shop ailesi** (KAPSAM DIŞI): `dada-shop`, `urun-liste`, `urun-detay`, `sepet`, `odeme`, `siparislerim`

---

## AFTER — `mutfak-sirlari-v1` dönüşümü (tek hero zenginleştirmesi)

**Neden H1?** mutfak-sirlari bir **rehber HUB**'ı — çocuk sayfaları (`mutfaga-giris`,
`sozluk`, `ansiklopedi` = H1 görselli; `puf-noktalari` = H1) ve kardeşi `akademi`
(H1 görselli) hep koyu-overlay hero. Hub'ın kendisi beyaz-kompakt kalması = **ters
zenginlik** (ebeveyn çocuğundan fakir). §2f H1 KIMLER: "hub/keşif vitrin". Hak-ediş:
"içerik KEŞFİ / hub → H1". → H1'e çekildi.

**Ne yapıldı (kanonik lst-top dili VERBATIM):**
- `hub-top`: `padding-top:128px` + `linear-gradient(90deg,rgba(28,25,18,.94),rgba(33,30,22,.72))` overlay + Unsplash `photo-1495195134817-aeb325a55b65` (pişirme/malzeme flatlay — kardeşlerden farklı, kimlik benzersiz) **v3a suffix** (`exp=7&gam=6&sat=-9&high=8&vib=5`), cover/center.
- Beyaz crumb override (`.hub-top .rd-crumb{color:#c9c3b8...}` + beyaz `<b>`).
- `hub-head` → 2-kolon grid (`lh-main` + `hub-stats`); eyebrow `#B9DFE6`, h1 beyaz + `#4FB8C9` accent + text-shadow.
- Cam-chip rayı (`hub-chips .chip{rgba(255,255,255,.12)+blur}`) — hızlı-geç hedefleri korundu.
- **Metrik şeridi** (`hub-stats`): 5 Rehber bölümü / 240+ Teknik & terim / 60+ Ölçü çevirisi.
- Tablet (≤1024): stats yatay satıra döner (border-top). Mobil (≤640): padding-top:74, h1 29px, chips yatay-snap.

---

## KANIT

### 1. Yapısal grep (before→after)
```
mutfak-sirlari hero: hub-top{background:var(--bg-white)}  →  hub-top{padding-top:128px; overlay+unsplash v3a}
markup: <div hub-head> kompakt  →  <div hub-head><div lh-main>…</div><div hub-stats> 3 metrik </div>
```

### 2. 390px element-rect taşma probe (`_overflow_probe.html`, headless Chrome, lessons gereği rect.right>viewport — scrollWidth'e güvenilmedi)
Clip/scroller içi öğeler elendi (intentional snap-slider'lar). Örneklem: **zengin (mutfak-sirlari enriched) · çıplak-tip H3 (bugun-ne-pisirsem) · referans H1 (akademi)**:

| Sayfa | docScrollW | UNCLIPPED_OVERFLOW (rect.right>390) |
|---|---|---|
| mutfak-sirlari-v1 (enriched) | **390** | **0** |
| bugun-ne-pisirsem-v1 (H3) | **390** | **0** |
| akademi-v1 (H1 ref) | **390** | **0** |

→ 390px'te gerçek yatay taşma SIFIR (ilk ham taramadaki 29 öğe hepsi `overflow-x:hidden/auto` snap-slider içiydi).

### 3. Breadcrumb §2f uyum
- mutfak-sirlari: `rd-crumb` korundu, koyu-hero üstü beyaz override eklendi (§2f "koyu hero üstü = beyaz override") ✓
- Paylaşımlı 5 dosya rd-crumb sayımı: ansiklopedi=11, ansiklopedi-detay=7, sozluk=12, mutfaga-giris=13, olcu-birimleri=8 — hepsi mevcut ✓
- Crumb'suz sayfalar yalnızca §2f muaf listesi (anasayfa/404/video/panel) ✓ — eksik crumb YOK.

### 4. Render SS (kendi headless'ım — MCP DEĞİL, lead faz-sonu için rezerve)
`outputs/ss-faz6-hero/`: `mutfak-sirlari-v1-desk.png` (H1 hero render OK — akademi ile birebir tutarlı), `-mob.png` (500px, stats yatay stack OK, taşma yok), `akademi-v1-desk.png` (referans), `bugun-ne-pisirsem-v1-desk.png` (H3 kompakt, doğru).

---

## Bilinçli H1'e ÇEKİLMEYENLER (hak-ediş disiplini — denetim kanıtı)

| Sayfa | Neden H1 DEĞİL |
|---|---|
| **bugun-ne-pisirsem-v1** | Çok adımlı karar **sihirbazı** (öğün→süre→zorluk→damak). Kullanıcıya iş yaptırır → §2f H3. Hero altında adım-stepper başlıyor. İmaj = kanon ihlali. |
| **tarif-bulucu-v1** | §2f H3 listesinde **adıyla** geçiyor ("evindeki malzemeyle pişir" aracı). H3. |
| **kesfet-v1** | §2f H3 listesinde adıyla geçiyor (ke-filter tab aracı). Çocuğu mekan-liste H1 olsa da §2f açık sınıflaması korunur. |
| **sef-ol / diyetisyen-ol** | Başvuru-form sibling; §2f diyetisyen-ol=H3. İkisi de kompakt-form kaldı (tutarlı). |
| **olcu-birimleri-v1 ⟨T5⟩** | Dönüşüm-tablosu aracı (H3). Crumb+nefes doğru, dokunulmadı. |

> Not: kesfet ↔ mekan-liste (ebeveyn H3, çocuk H1) ve mutfak-sirlari (ÇÖZÜLDÜ) aynı
> "ters-zenginlik" desenindeydi. mutfak-sirlari §2f explicit listede olmadığı için
> hub→H1 takdiri uygulandı; kesfet §2f'de **adıyla H3** olduğu için kanona saygıyla
> bırakıldı. Beyar isterse kesfet de H1'e çekilebilir — §2f sınıfını değiştirmek gerekir (lead kararı).

---

## Bilinen Sınırlamalar

1. **Render SS headless min 500px** (lessons §4): mobil SS 500px'te alındı (≤640
   kırılımı aynı), 390 taşmazlığı ayrıca JS element-rect probe ile doğrulandı. 390px
   gerçek-piksel SS değil.
2. **MCP playwright kullanılmadı** (lead faz-sonu için rezerve) — render kanıtı kendi
   headless Chrome'umla; lead faz-sonu MCP turunda canlı doğrulama yapmalı.
3. **Unsplash görsel canlılığı**: `photo-1495195134817` seçimi loading-güvenilir
   bilinen ID; yine de mockup ortamında ağ-bağımlı. v3a filtre suffix uygulandı.
4. **Metrik değerleri placeholder** (5/240+/60+) — mockup; gerçek sayılar backend
   fazında bağlanacak (akademi 12+/30+/2026 gibi, tutarlı dil).
5. **kesfet ters-zenginlik** çözülmedi (bilinçli, §2f explicit H3) — Beyar kararına bırakıldı.
6. **Probe yalnız 3 örneklem** sayfada çalıştırıldı (zengin/çıplak/orta); 71 sayfanın
   tamamı element-rect taranmadı — ama hepsi `_shell.html` türevi aynı `.below-header`
   + `wrap` iskeletini paylaşıyor, bu 3 örneklem temsil edici.

---

## Tasarım gözü değerlendirmesi

- **Kazanım:** mutfak-sirlari artık rehber ailesinin görsel ağırlık merkezine yakıştı;
  akademi ile yan yana konunca aynı "öğrenme hub'ı" dili (koyu sıcak görsel + cyan
  accent + metrik şeridi). Hub artık çocuklarından (mutfaga-giris/sozluk) daha zengin
  → bilgi hiyerarşisi doğru yönde.
- **Disiplin:** Asıl değer envanterde — sistem zaten %97 tutarlıydı; tek gerçek kırık
  bulundu ve düzeltildi. "Çıplak görünen" H3 sayfalarını H1'e zorlamamak (frontend-design
  skill + §2f hak-ediş) generic "her sayfaya büyük görsel" tuzağından kaçındırdı.
- **Risk:** kesfet'in H3 kalması, çocuğu mekan-liste'nin H1 olmasıyla küçük bir
  görsel-ağırlık tersliği bırakıyor; tek başına rahatsız etmiyor ama Beyar faz-sonu
  gözüyle bakabilir.

frontend-design skill: hero zenginleştirmesi öncesi yüklendi; mevcut tasarım-sistemi
içinde kalıp (generic AI estetiğinden kaçınarak) kanonik lst-top dili uygulandı.
