# HERO ZENGİNLEŞTİRME ŞABLONU — tek-tip reçete (devir)

> Kaynak kanon: `mutfaga-giris-v1` `.lst-top/.lst-hero`. Kanıtlı çalışan örnek:
> `olcu-birimleri-v1` (hero-zengin yaptı, 14/2 cerrahi). HER sayfada SIFIRDAN
> tasarlama YOK — bu reçete + bağlama uygun görsel URL'i değiştir.

## REÇETE (CSS-ağırlıklı, markup çoğu zaman DEĞİŞMEZ)

Her sade sayfanın kendi `*-top` class'ı KORUNUR (rename yok). O class'ın
`background:var(--bg-white|--bg-cream)...` kuralını AŞAĞIDAKİ blokla DEĞİŞTİR
(`.X-top` = o sayfanın üst-blok class'ı; `.X-head`/`.X-tab` = o sayfanın
başlık/tab alt-class'ları — sayfaya göre adapte et):

```css
/* ÖNCE: .X-top{background:var(--bg-cream);border-bottom:1px solid var(--line)} */
.X-top{position:relative;padding-top:128px;background-image:linear-gradient(90deg,OVERLAY),url('UNSPLASH_URL');background-size:cover;background-position:center}
.X-top .wrap{position:relative}
.X-top .rd-crumb{color:#c9c3b8}
.X-top .rd-crumb a{color:#c9c3b8}
.X-top .rd-crumb a:hover{color:#ff8763}
.X-top .rd-crumb i{color:rgba(255,255,255,.4)}
.X-top .rd-crumb b{color:#fff}
.X-top .eyebrow{color:#ffd9cf}          /* sh ailesinde #d6f0e0 */
.X-top h1{color:#fff;text-shadow:0 2px 24px rgba(0,0,0,.25)}
.X-top .lead{color:#e7edf1;text-shadow:0 1px 14px rgba(0,0,0,.3)}
/* sayfanın kendi tab/segment/buton alt-class'ı varsa cam efektine çek: */
.X-top .X-tab{background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.22);color:#fff;backdrop-filter:blur(4px)}
.X-top .X-tab.active{background:var(--tomato);border-color:var(--tomato);color:#fff}
```
+ mobil: `@media (max-width:640px){.X-top{padding-top:74px}}`

### OVERLAY değeri
- **lst (domates/genel):** `rgba(28,25,18,.93),rgba(33,30,22,.72)`
- **sh (sağlık yeşil-tint):** `rgba(18,28,22,.94),rgba(20,32,25,.74)` + eyebrow `#d6f0e0`

### UNSPLASH_URL formatı (v3a suffix ZORUNLU)
`https://images.unsplash.com/photo-<ID>?w=1600&q=80&auto=format&fit=crop&exp=7&gam=6&sat=-9&high=8&vib=5`

## MARKUP NOTU
Çoğu sayfada markup'a DOKUNMAYA GEREK YOK — mevcut crumb+başlık+lead CSS ile
beyazlaşır. İstisna: bir sayfada hero metni `.wrap` dışındaysa ya da crumb yoksa,
`<section class="below-header X-top"><div class="wrap"><nav class="rd-crumb">...`
yapısına çek (mutfaga-giris markup'ı referans). Sayfa GÖVDESİNE (hero altı)
DOKUNMA. _shell'e DOKUNMA.

## VERİFİYE GÖRSEL PALETİ (projede kullanılan = 404 yok; reuse OK)
- Genel mutfak/pişirme: `1556909212-d5b604d0c90d`
- Tartı/ölçü: `1556910103-1c02745aae4d` (olcu kullandı)
- Tencere: `1547592166-23ac45744acd` · Fırın: `1565299624946-b28f40a0ae38`
- Köfte/Et: `1432139555190-58524dae6a55` · Sebze/sağlıklı: `1551183053-bf91a1d81141`
- Pilav/makarna: `1476718406336-bb5a9690ee2a` · Tavuk: `1604909052743-94e838986d24`
- Balık: `1559737558-2f5a35f4523b` · Güveç: `1473093295043-cdd812d0e601`
> Daha iyi/uygun bir Unsplash ID bulursan kullan; bulamazsan paletten en yakını
> al (mockup'ta hero görseli reuse kabul). Takılma — palet fallback var.

## DEVİR SAYFA DAĞILIMI

### tarif-liste-kategori → SAĞLIK 9 (sh yeşil-tint)
bazal-metabolizma · beden-kutle-endeksi · besin-kutuphanesi · gunluk-kalori ·
gunluk-su · ideal-kilo · test-detay · vucut-tipi · diyetisyen-ol
> Görsel teması: sağlıklı tabak/sebze/su-hidrasyon/danışmanlık. Çoğu `.calc-top`.

### tarif-liste-fix → LST 13 (domates) — olcu-birimleri HARİÇ (zaten yapıldı)
alisveris-listesi · arama · bildirimler · giris · haftalik-menu · hesabim ·
iletisim · onboarding · puf-noktasi-ekle · sef-ol · siparislerim · tarif-ekle · yasal
> Görsel teması: market/baharat/sıcak mutfak/şef/tezgah/belge.

## ÇALIŞMA DÜZENİ (stall önleme)
- SS ALMA, tarayıcı AÇMA. Sadece Read (sayfanın `*-top` bul) + Edit (reçete uygula).
- 3-4 sayfalık partiler; her parti sonrası git diff ile lead'e bildir.
- SS/probe = lead faz-sonu tek MCP turu.
- Loop sigortası: sayfa başı tek Edit turu yeterli (reçete mekanik).
