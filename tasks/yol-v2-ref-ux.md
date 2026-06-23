# Yol Guzergahim v2 — Referans UX Analizi

> Hedef: tam ekran rota planlayıcı (sol dikey panel + kalan viewport tam-ekran
> harita) için en iyi-sınıf referansların UX desenlerini çıkarıp DadaMutfak'ın
> sol-panel durum makinesine (ROUTE BUILD ↔ CITY VENUES ↔ MY ROUTES) ve mekan
> keşfine ("Dada öneriyor" + pinler) eşlemek.
>
> Kaynaklar: Roadtrippers Autopilot ve Wanderlog için web aramasıyla doğrulanmış
> güncel detay (aşağıda kaynak listesi). Google Maps directions davranışı ve
> her üç ürünün etkileşim mikro-desenleri **bellekten** (yerleşik, iyi bilinen
> desenler) — aşağıda nereler bellek / nereler fetch olduğu işaretli.

---

## 1. Roadtrippers (Autopilot) — pattern map

**Doğrulama:** panel/dock yapısı ve "add stops" akışı web aramasıyla teyit
edildi; alternatif-rota ve drag mikro-etkileşimleri bellekten.

**Panel yapısı.** Tam-ekran harita + sola sabitlenmiş dikey "itinerary dock".
Dock üç katmandan oluşur: üstte rota özeti (toplam süre/mesafe + tarih), ortada
**durak zinciri** (waypoint list), altta birincil aksiyon ("Add to Trip" /
mavi (+) butonu). Trip açıkken planlama araçlarının TAMAMI bu sol panelde —
harita salt görsel + pin etkileşimi.

**Waypoint flow — çalınacak.**
- Kalkış → varış girilince ARA aşamada dock dolmuyor; rota çiziliyor, sonra
  kullanıcı zincire ekleme yapıyor. Yani "önce iskelet, sonra zenginleştir".
- Her durak dock'ta bir satır = sıra göstergesi + ad + (kaldır). Yeni durak
  haritada o ana en yakın segmente otomatik enjekte edilir (sıralama akıllı).
- **Autopilot Remix / "try again"**: önerilen durak setini beğenmezsen yeni set
  üretir — sınırsız taze öneri. Bu, "Dada öneriyor" bloğu için doğrudan kopya
  alınacak afordans (öneriyi reddet → yenile).

**Rota-boyu mekan keşfi — çalınacak.** 7M+ POI; iki yol: (a) lokasyon ara,
(b) ilgi alanına göre Autopilot öner. Kritik nokta: keşif **rota koridoruna**
bağlı — rastgele harita değil, çizgiye yakınlık tier'ı. DadaMutfak'ta zaten
"proximity tiers" var (commit fef6530), bu eşleşiyor.

**Smell test riski.** Autopilot'un AI-öner akışı kolayca "sihirli kutu" hissi
verir (kullanıcı kontrolü kaybeder). Premium hissi: öneri her zaman **redde
edilebilir + yenilenebilir** olmalı, otomatik dayatma değil.

---

## 2. Wanderlog — pattern map

**Doğrulama:** liste/harita ikiliği, drag-drop yeniden sıralama, pin-bağlama
çizgisi web aramasıyla teyit; yoğunluk eleştirisi de teyit.

**Panel temizliği — çalınacak.**
- Sol liste = gün-gün / sıralı yer listesi; harita otomatik plot. Sırayla
  ziyaret edilen noktalar arasında harita üstünde **bağlantı çizgisi** çekilir
  → rota görsel olarak okunur.
- **Drag-drop ile yeniden sıralama** birinci sınıf etkileşim; liste = doğruluk
  kaynağı, harita ona uyar.

**Anti-pattern — kaçınılacak (doğrulanmış eleştiri).** Wanderlog'un trip
overview'ı bilgi yoğunluğundan boğuluyor: "essential tasks" checklist gibi
yardımcı bloklar, asıl plana ait alanı yiyor. **Ders:** sol panelde yardımcı/
ikincil blok (öğütler, ipuçları, kampanya) asıl durak zincirini bastırmamalı.
DadaMutfak'ta "Dada öneriyor" bloğu bu tuzağa düşebilir — zincirden sonra,
ölçülü, kapanabilir olmalı.

---

## 3. Google Maps directions — pattern map (bellekten, yerleşik desenler)

**Reverse origin/destination.** Kalkış-varış arasında **çift-ok swap** ikonu;
tek tık tüm rotayı tersine çevirir, durakları korur. Düşük maliyet, yüksek
beklenen afordans — DadaMutfak'a mutlaka.

**Drag-to-reorder.** Her durak satırının solunda **tutamak (⠿ / ≡)**; sürükle-
bırak sırayı değiştirir, rota anında yeniden hesaplanır. Tutamak görünür olmalı
(false-affordance yok — sürüklenebilir görünmeli).

**Alternatif rota render — en önemli çalınacak desen.**
- Aktif rota = **renkli, kalın, opak** (DadaMutfak'ta domates `var(--tomato)`).
- Alternatifler = **gri/soluk, ince** çizgi; üstünde küçük süre/mesafe etiketi
  baloncuğu.
- Alternatife **tıkla → seç**: o anda renklenir, eskisi grileşir; panel süre/
  mesafe özeti güncellenir. Hover'da alternatif hafif koyulaşır (tıklanabilir
  sinyali).
- Etiket baloncuğu çakışmayı önlemek için çizgi üstünde, birbirinden ofsetli.

**Panel ↔ harita çift-yönlü vurgu.** Panelde satıra hover → haritada o pin
büyür/zıplar; haritada pin'e tık → panelde satır scroll + highlight. Bu eşleşme
"premium" hissinin belkemiği.

---

## DadaMutfak adaptasyon önerileri (durum makinesine eşleme)

### ROUTE BUILD (varsayılan durum)
Sol panel dikey, tam yükseklik, üç katman (Roadtrippers dock şeması):

```
┌─────────────────────────┐
│ Kalkış  [ İstanbul   ] ⇅ │  ← swap (Google Maps), tek ikon
│ Varış   [ İzmir      ]   │
├─────────────────────────┤
│ ⠿ 1  Bursa        kebap×│  ← drag handle (≡) + tomato rozet + kaldır
│ ⠿ 2  Balıkesir        ×│
│        + durak ekle      │  ← ikincil, ghost buton
├─────────────────────────┤
│ ~5sa 40dk · 478 km       │  ← canlı özet (alt sabit)
│ [ Rotada mekan keşfet ]  │  ← BİRİNCİL CTA → CITY VENUES
└─────────────────────────┘
```

- **Swap ikonu:** Google Maps çift-ok; kalkış/varış arası, durakları koruyarak.
- **Drag handle:** her durak satırında görünür tutamak — sürükle yeniden sırala
  → rota anında yeniden hesap. Uçlar (kalkış/varış) sürüklenmez (CLAUDE.md
  dersi: uçlar = sessiz terminal, ara duraklar = numaralı istasyon; bu görsel
  ayrım drag afordansıyla da uyumlu — sadece numaralı istasyonlar tutamaklı).
- **Alternatif rota:** kalkış-varış girilince 2-3 alternatif. Aktif = domates
  kalın opak; diğerleri gri ince + süre/mesafe etiketi; tıkla-seç → renk takası
  + panel özeti güncellenir. Bu, sayfanın "gerçek planlayıcı" hissini veren tek
  en yüksek-getirili eklenti.

### CITY VENUES (rota koridoru keşfi)
- Roadtrippers koridor-keşfi + proximity tier zaten var. Panel başlığı seçili
  şehir/segment; altında **"Dada öneriyor"** bloğu (Autopilot öner deseni) →
  ama Wanderlog dersi: bu blok durak zincirini BASTIRMASIN. Zincirden sonra,
  ölçülü, üst-sınırlı (örn. 3 kart), "Daha fazla / Yenile" ile genişler.
- **"Yenile" afordansı** (Autopilot Remix kopyası): öneri beğenilmezse taze set.
- Panel satırı ↔ harita pin çift-yönlü vurgu (Google Maps deseni): hover→pin
  zıplar, pin tık→satır highlight. Pin paleti: mekan = domates teardrop,
  sağlık/diyet uygunsa nane `#6cca98` aksanı.
- Mekanı "rotaya ekle" → ROUTE BUILD zincirine numaralı istasyon olarak girer
  (Roadtrippers: en yakın segmente akıllı enjeksiyon).

### MY ROUTES (kayıtlı güzergahlar)
- Wanderlog temiz liste deseni: her kayıtlı rota = kart (ad + uç şehirler +
  durak sayısı "N mekan" + süre/mesafe). Tık → ROUTE BUILD'e o rotayı yükler.
- CLAUDE.md kritik ders: `visited` durumu **route-scoped** (`visited{routeId:{}}`)
  — her kayıtlı rota kendi ziyaret setini taşır; rozet/sayaç unique birleşimden.
- **Boş durum** tasarlanmalı (Google Maps/Wanderlog ikisi de yapar): "Henüz
  kayıtlı güzergahın yok — bir rota planla, kaydet, buradan tek tıkla geri dön."
  davet edici, aksiyon-yönlü (skill: empty = invitation).

### Durum geçişleri
- Üç durum panel İÇİNDE değişir (harita sabit kalır) — bu kritik. Roadtrippers
  modeli: harita context kaybetmez, sadece sol içerik değişir.
- Her durumda **geri yolu legible** olmalı (skill heuristic 5): CITY VENUES'ten
  ROUTE BUILD'e dönüş üst-sol "‹ Rota" linki; MY ROUTES bir sekme/segment.
- Birincil aksiyon her durumda TEK ve belirgin (ROUTE BUILD → "Mekan keşfet";
  CITY VENUES → "Rotaya ekle"; MY ROUTES → "Yeni rota").

---

## Smell test — neresi generic, neresi premium

**Generic riskleri (kaçın):**
- **Üç eşit "Dada öneriyor" kartı, ikon-başlık-blurb, hiyerarşisiz** → skill'in
  birebir generic-AI sinyali. Çözüm: kartlar eş-boy değil; bir öne-çıkan (görsel
  + ad + neden önerildi), diğerleri kompakt satır.
- **Numaralı marker'ı her şeye** basmak. Duraklar GERÇEK sıra → numara haklı.
  Ama "Dada öneriyor" kartlarına 01/02/03 BASMA — sıra değil, koleksiyon.
- **Her şeye fade-in.** Hareketi tek yere harca: alternatif-rota seçiminde çizgi
  renk geçişi + panel özeti sayaç animasyonu. Gerisi sakin.
- **Soluk-mavi/mor gradient hero.** Yasak palet zaten; harita zemininin kendisi
  hero — üstüne dekoratif gradient bindirme.
- **Generic kopya.** "Hayalindeki yolculuğu planla" değil; somut:
  "İki şehir seç, aradaki Dada lezzetlerini haritada gör."

**Premium/kasıtlı hissi veren (yap):**
- Panel ↔ harita **çift-yönlü canlı vurgu** — ürünün "gerçek" hissi buradan.
- Alternatif rotanın **gri→domates tık-seç** geçişi: tek detay, en çok "bu ciddi
  bir planlayıcı" sinyali.
- **Swap + drag handle** gibi beklenen mikro-afordanslar: yokluğu amatör, varlığı
  görünmez-doğru.
- **Canlı özet** (süre/mesafe) her değişiklikte güncellenir — sessiz ama güven
  veren geri-bildirim.
- Uç-marker (terminal) vs numaralı istasyon **görsel hiyerarşisi** (CLAUDE.md
  dersi) — palet-içi, sayıma dokunmadan; bu zaten markaya özgü detay.

**Tek cümle tasarım tezi:** Harita hero'dur; sol panel sessiz ve disiplinli bir
*dock*'tur; tüm cesareti **alternatif-rota seçimi + panel↔harita çift-yönlü
vurguya** harca, gerisini kıs.

---

## Kaynaklar

- [Roadtrippers Autopilot](https://roadtrippers.com/autopilot/)
- [Roadtrippers — Planning a Trip on Our Website](https://support.roadtrippers.com/hc/en-us/articles/200632079-Planning-a-Trip-on-Our-Website)
- [Roadtrippers — Using Autopilot to Plan a Trip](https://support.roadtrippers.com/hc/en-us/articles/24995143275412-Using-Autopilot-to-Plan-a-Trip)
- [Roadtrippers Autopilot updates (Newswire)](https://www.newswire.com/news/roadtrippers-unveils-updates-to-its-1-trip-planning-app-enhancing-the-22481162)
- [Wanderlog travel planner](https://wanderlog.com/)
- [Wanderlog App Showcase (ScreensDesign)](https://screensdesign.com/showcase/wanderlog-travel-planner)
- Google Maps directions davranışı: bellekten (yerleşik, iyi bilinen desenler) —
  swap, drag-reorder, gri/renkli alternatif-rota tık-seç, panel↔pin vurgu.
