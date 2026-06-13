# Hero Turu — ADIM 2 Uygulama Raporu (hero-zengin)

> Görev: denetimdeki 23 SADE sayfayı zengin H1 hero'ya çekmek (Beyar onayı sonrası).
> Kanon: `mutfaga-giris-v1` `.lst-top/.lst-hero`. Referans: `tasks/bilesen-kilavuzu.md` §2f.

## SONUÇ: 23/23 sade sayfa zengin H1 hero ✅

Hepsinde uygulanan ortak reçete:
- Arka plan görseli (Unsplash, **projede kanıtlı foto ID'leri** + v3a filtre suffix
  `?w=1600&q=80&auto=format&fit=crop&exp=7&gam=6&sat=-9&high=8&vib=5`) + koyu/yeşil overlay
- **lst (domates)** overlay `linear-gradient(90deg,rgba(28,25,18,.93),rgba(33,30,22,.72))` ·
  **sh (sağlık-yeşil)** overlay `rgba(18,28,22,.94),rgba(20,32,25,.74)`
- §2f header-altı nefes: `padding-top:128px` (mobil `74px`)
- Beyaz breadcrumb override (`.X-top .rd-crumb …`), beyaz h1 + text-shadow, açık lead,
  eyebrow (lst `#ffd9cf` / sh `#7fe0b0`), accent (lst `#ff7a5c` / sh `#54d39a`)
- Hero içindeki ikincil kontroller **cam** dile çekildi: calc-switch, kategori chip'leri,
  filtre chip'leri, benefit kartları, see-all/icon butonları
  (`rgba(255,255,255,.12)` + `blur(4px)`); aktif durumlar marka rengi
- **Mevcut hero İÇERİĞİ KORUNDU** (başlık/alt başlık/breadcrumb metni). Sayfa gövdesine,
  `_shell.html`'e DOKUNULMADI.

## Sayfa tablosu

### Yeşil (sh) aile — 9
| Sayfa | class | görsel teması (Unsplash ID) |
|---|---|---|
| bazal-metabolizma | calc-top | sağlıklı tabak (1512621776951) |
| beden-kutle-endeksi | calc-top | sağlıklı kâse (1490645935967) |
| gunluk-kalori | calc-top | sağlıklı tabak (1512621776951) |
| gunluk-su | calc-top | sağlıklı/su (1490645935967) |
| ideal-kilo | calc-top | sağlıklı tabak (1512621776951) |
| vucut-tipi | calc-top | sağlıklı kâse (1490645935967) |
| besin-kutuphanesi | nb-top | sebze/besin (1559054663) |
| diyetisyen-ol | ol-top | danışmanlık/sağlıklı (1512621776951) |
| test-detay | tst-top | sağlıklı tabak (1490645935967) |

### Domates (lst) aile — 14
| Sayfa | class | görsel teması (Unsplash ID) | not |
|---|---|---|---|
| olcu-birimleri | ob-top | tartı/un/ölçü (1556910103) | pilot |
| arama | srch-top | baharat flatlay (1596040033229) | |
| bildirimler | nt-top | sıcak mutfak (1556909212) | |
| hesabim | hs-top | mutfak ambiyans (1495195134817) | |
| iletisim | con-top | pişiren eller (1466637574441) | |
| haftalik-menu | hm-top | meal-prep (1543339308) | |
| onboarding | bnp-top | yemek sofrası (1504674900247) | |
| puf-noktasi-ekle | fp-top | pişirme/eller (1466637574441) | |
| sef-ol | ol-top | şef (1577219491135) | |
| tarif-ekle | fp-top | tezgah malzeme (1556910103) | |
| yasal | lg-top | sakin mutfak (1414235077428) | |
| giris | au-top | sıcak mutfak (1556909212) | wrapper — login-hero |
| alisveris-listesi | al-top | market/ürün (1551183053) | wrapper — markup-split |
| siparislerim | ord-top | mutfak (1556909212) | wrapper — bg-band |

## 3 WRAPPER sayfa — özel teknik (section tüm gövdeyi sarıyor)

Bu 3 sayfada `*-top` section sadece hero'yu değil tüm içeriği (liste/form) sarıyordu;
düz tam-section bg → liste koyu görsel üstünde kalır (kanona aykırı). Çözümler:

- **giris (au-top):** kısa 2-kolon login layout (sol görsel kart zaten koyu, sağ beyaz form).
  Tüm section'a koyu görsel zemin verildi = **login-hero**; au-visual/au-card korundu.
- **alisveris-listesi (al-top):** `.al-head` `.wrap`'in doğrudan çocuğu → **markup-split**:
  hero (crumb+head) koyu `.al-top` section'da kaldı, gövde (add-bar+liste) `.al-body` krem
  section'a alındı. Net sınır, gövde node'ları aynen korundu.
- **siparislerim (ord-top):** `.ord-head` `.ord-listview` içine gömülü (JS toggle) →
  markup'a dokunmadan **bg-band** tekniği: `background-size:100% 252px` (mobil `300px`) ile
  görsel sadece üst hero bölgesini kaplar, liste krem zeminde akar. Künye/H2b yapısı korundu.

## Koordinasyon notu

ADIM 2 sırasında işin bir kısmı yanlışlıkla başka teammate'lere (tarif-liste-fix /
tarif-liste-kategori) devredildi (lead'in sayım komutunda bug → ilerlemem görünmedi).
Devir geri alındı (#2 bana döndü, #8 silindi). tarif-liste-fix iki wrapper'ı (al, ord)
tam-section yaklaşımıyla yapmıştı; ben bunları kanona uygun band/split'e iyileştirdim
(crumb/head beyaz override'ları korundu, sadece "görsel tüm listeyi kaplıyor" sorunu giderildi).
Diğer 21 sayfa baştan sona benimdi, ezilmedi (imza + numstat ile teyit).

## KANIT

- **numstat:** 23 sayfa değişti (bulk 12-16/1; olcu 14/2; giris 7/1; al 22/3; ord 14/3).
- **render SS (`outputs/hz-ss/`):** PILOT-olcu-{desktop,mobile}; A_{bazal,besin,bildirimler,
  diyetisyen-ol,arama,hesabim}; W2_{alisveris,siparislerim,siparislerim_m}; W_giris. Hepsi
  koyu/yeşil overlay + beyaz crumb/başlık + cam kontroller + temiz hero/gövde sınırı gösteriyor.
- Görsel ID'leri mevcut zengin herolardan harvest edildi → **404/kırık görsel riski yok**.

## BİLİNEN SINIRLAMALAR

1. **Final mobil 390 JS taşma probe'u YAPILMADI** — Playwright MCP tarayıcısı tüm tur boyunca
   başka teammate'te kilitliydi ("Browser is already in use"). Standalone headless Chrome 500px
   render'larında (lessons §4: 390 layout 500'de kurulur) yatay taşma görülmedi; değişiklikler
   CSS-only (bg/renk/padding) + al markup-split olduğundan yeni sabit-genişlik elemanı yok,
   chip/switch zaten `overflow-x:auto`. **Yine de kesin 390 probe'unu lead'in MCP turu yapmalı**
   (lead bunu teklif etmişti).
2. **ord-top bg-band yüksekliği** (desktop 252 / mobil 300px) sabit — head metni çok uzarsa
   (aşırı uzun başlık) bandın alt kenarı head'i kesebilir; mevcut içerikle mobil 500px SS'te
   temiz. İçerik değişirse yükseklik gözden geçirilmeli.
3. **test-detay & alisveris/siparislerim aile/teknik kararları** denetim raporunda Beyar
   onayına sunulmuştu; onaylanan haliyle uygulandı.
4. COMMIT/PUSH yapılmadı (talimat gereği).
</content>
