# Yol Güzergahım v2 — TAM AKIŞ SPEC (uçtan uca + ne bağlı/ne kopuk)

> Lead envanteri + akış sözleşmesi · 2026-06-23 · Dalga 1+2 commit'li (`0e3dcda`, push yok).
> Dosya: `v6/yol-guzergahim-v2.html`. Bu doküman **KOD YAZMAZ** — Beyar onaylayınca Dalga 3 implement.
> Sabit kararlar (handoff): mekan kartı sade (tarif linki yok) · Dada öneriyor elle `dada:true` ·
> eşik oransal+slider · **mekan ≠ durak** (mekan alt kadranda, durak sol panelde) · global harita Türkiye merkezli.

---

## 0. NE BAĞLI / NE KOPUK ENVANTERİ

| # | Özellik | Nerede (kod) | Durum |
|---|---|---|---|
| 1 | Tab geçişi Rota Kur ↔ Güzergahlarım | `selectTab` 834 | ✅ **çalışıyor** (görsel) |
| 2 | Durak ekle | `ygStopAdd` 625 | ✅ çalışıyor |
| 3 | Durak input + CITY autocomplete | `stopListEl` input/click 607–623 | ✅ çalışıyor (TR-güvenli `toLocaleLowerCase('tr')`) |
| 4 | Durak sil (>2 iken) | `yg-stop-x` 598 | ✅ çalışıyor |
| 5 | Durak drag-sort | dragstart/drop 599–603 | ✅ çalışıyor |
| 6 | Yönü çevir | `reverseBtn` 626 | ✅ çalışıyor (≥2 durak) |
| 7 | OSRM gerçek yol + casing çizimi | `buildRoute`/`drawRoutes` 655–690 | ✅ çalışıyor (12s timeout + 1 retry) |
| 8 | Rota özeti (km + not) | `updateSummary` 746 | ✅ çalışıyor |
| 9 | Eşik slider + Yol üstü/Yakın sayaç | `corrSlider` 826, `refreshThreshold` 767 | ✅ çalışıyor |
| 10 | Alt yatay kadran (mekan kartları render) | `renderDash` 804 | ✅ çalışıyor |
| 11 | Mekan kartı tıkla → harita uçar + popup | `dashScrollEl` click 820 | ⚠️ **yarım** — flyTo+popup var; **detay kartı YOK** (foto/ad/ilçe/N km/"Güzergaha Ekle" paneli açılmıyor) |
| 12 | Harita pinleri (durak + mekan) | `placeStopMarkers` 570, `vpin` 786 | ✅ çalışıyor |
| 13 | Alternatif rota liste + tık-seç | `renderAltList` 752, `selectRoute` 691 | ⚠️ **yarım** — kod tam; **public OSRM demo tek rota dönüyor** → liste hiç görünmüyor (sahte alt uydurulmadı) |
| 14 | Hata/retry durumu | `showRouteError` 738 | ✅ çalışıyor |
| 15 | Boş durum (uçsuz) | `ygStart` empty 417 | ✅ çalışıyor |
| 16 | **"Güzergaha Ekle" akışı** | — | ❌ **YOK** — mekan kartında (`yd-body` 813) buton **hiç yok**; seçili-mekan state yok |
| 17 | **"Güzergahımdaki Mekanlar" listesi** (sol panel) | — | ❌ YOK |
| 18 | **Güzergahımı Kaydet** butonu + fonksiyon | — | ❌ YOK |
| 19 | **localStorage persist** (`dada_yg_v2`) | — | ❌ YOK |
| 20 | **Güzergahlarım sekme içeriği** (kayıtlı liste) | `viewSaved` 425 | ⚠️ **yarım** — yalnız boş-durum iskeleti; metin "bir sonraki adımda açılacak" diyor |
| 21 | Kaydet sonrası onay/toast | — | ❌ YOK (sayfada toast altyapısı da yok) |
| 22 | **Site girişi (FAB / CTA → v2)** | portal `:2403`, kesfet `:2275` | ❌ **KOPUK** — iki CTA da `yol-guzergahim-**v1**.html`'e gidiyor, v2'ye değil |

**Özet:** rota kurma + mekan keşfi motoru **tam çalışıyor**. Kopuk olan tüm halka **mekanı seçtikten sonrası**:
detay kartı → Güzergaha Ekle → seçili mekan listesi → Kaydet → Güzergahlarım → tekrar yükle. Bir de **giriş** kopuk (v2'ye link yok).

---

## 1. UÇTAN UCA AKIŞ (her adımda "şu an ne durumda")

### ADIM 0 — GİRİŞ (moda nereden girilir)  · durum: ❌ KOPUK (v1'e gidiyor)
- **Yüzeyler:** `anasayfa-portal-v3a.html` ("Güzergah Planla" CTA, satır 2403) + `kesfet-v1.html` ("Yol Güzergahım" CTA, satır 2275). İkisi de hâlâ **v1**'e bağlı.
- **Hedef davranış:** CTA → `yol-guzergahim-v2.html` tam-ekran kopuk mod açılır (kanonik kabuk yüklenmez; minimal header + split-layout zaten hazır). Header'daki **✕ Kapat** → `anasayfa-portal-v3a.html`'e döner (zaten bağlı, satır 350).
- **Karar (Beyar):** giriş **(a)** mevcut iki CTA'yı v2'ye repoint mi, **(b)** ayrıca sağ-alt **FAB** mı?
  - *Öneri:* **(a) mevcut CTA'ları v2'ye çevir** — portal+kesfet'te zaten belirgin, niyet-yüksek butonlar; ayrı FAB redundant olur. FAB istenirse portal+kesfet sağ-alt köşeye domates yuvarlak + harita-pin ikon + "Yol Güzergahım" tooltip olarak **ek** yapılır, ama önce repoint yeterli.
- **Not:** v1 dosyası DOKUNULMAZ kalır (geri-dönüş emniyeti); sadece giden linkler v2'ye taşınır.

### ADIM 1 — ROTA KUR (durakları gir)  · durum: ✅ ÇALIŞIYOR
- Sol panel "Rota Kur" sekmesi açık. Boş durumda `ygStart` ("Rotanı çiz") görünür.
- Kullanıcı durak inputuna şehir yazar → CITY autocomplete → seçer. Duraklar **seçim sırasıyla** numaralanır (1, 2, 3…); Kalkış/Varış ayrımı **yok** (tek-tip durak, auto-reorder yok — sabit karar).
- "Durak ekle" ile N durak; ≥3 durakta sil aktif; drag ile sırala; "Yönü çevir" (≥2) listeyi ters çevirir.
- ≥2 dolu durak → OSRM çağrısı, gerçek yol çizilir (beyaz casing + domates hat), harita rotaya fit olur.

### ADIM 2 — ALTERNATİF ROTA (varsa)  · durum: ⚠️ YARIM (demo tek rota)
- Kod hazır: `alternatives=3` istenir; 2+ rota dönerse sol panelde "Alternatif rotalar" listesi (km + süre + "En hızlı/Alternatif N"), tık-seç → aktif rota domates olur, sayaç + mekanlar yeniden hesaplanır.
- **Şu an:** public OSRM demo genelde tek rota döner → liste gizli kalır. Prod OSRM/ORS-key bağlanınca otomatik görünür. **Dalga 3'te yeni iş yok**, sadece SPEC'te "bağlanınca aktif" notu.

### ADIM 3 — EŞİK SLIDER (koridor ayarı)  · durum: ✅ ÇALIŞIYOR
- "Yola uzaklık" slider (2–30 km, default 12). `onRoad = max(2, koridor*0.4)` (oransal — sabit karar).
- Canlı sayaç: **Yol üstü** (≤onRoad, yeşil) / **Yola yakın** (onRoad–koridor, gri). Slider değişince mekan listesi + harita pinleri yeniden hesaplanır.

### ADIM 4 — MEKAN KEŞFET (alt yatay kadran)  · durum: ✅ render / ⚠️ tık-detay yarım
- Rota çizilince alt-orta **yatay kadran** ("Yol üstü mekanlar · N") açılır. Kartlar: foto (div+bg cover) · ad · ilçe·il · yakınlık tag ("Yol üstü/Yola yakın · N km").
- **Dada öneriyor** kartları (`dada:true`) **üstte** (sort: dada önce, sonra mesafe) + tomato-tint zemin + "Dada" rozeti.
- Karta tıkla → harita o mekana **flyTo** + pin popup açılır. ✅ Bu çalışıyor.
- **YARIM:** tıklayınca **detay kartı açılmıyor**. Hedef: tıkla → harita uçar **+ detay paneli/kartı** belirir (büyük foto · ad · ilçe·il · "N km yol üstü" · puan yalnız Dada kartında · **"Güzergaha Ekle" butonu**). Sade kalır, tarif linki YOK (sabit karar).

#### 🔧 Beyar'ın 2 ufak düzeltmesi (Dalga 3'te halledilir)
- **(a) Alt kadran TAM görünsün:** kartlar kesilmesin/sığsın. Şu an `.yg-dcard{flex:0 0 232px}` + `.yg-dash-scroll` (satır 306, 309) — kartlar dikey kesik veya son kart sağ-padding'de kırpık olabilir. Kadran yüksekliği/padding ve son-kart görünürlüğü düzeltilecek.
- **(b) Mekan kartı HOVER'da üst çizgi/border görünmesin:** `.yg-dcard:hover` (satır 310) `border-color + box-shadow + translateY(-2px)` uyguluyor → hover'da üstte beliren çizgi/border temizlenecek (lift'i koru ama üst-kenar çizgisi olmasın).

### ADIM 5 — GÜZERGAHA EKLE (mekanı seç)  · durum: ❌ YOK (ana eksik halka)
- **Karar netleştirme:** mekan **durak DEĞİL**. "Güzergaha Ekle"ye basınca mekan durak listesine **eklenmez** (rota yeniden hesaplanmaz). Ayrı bir **"seçili mekanlar"** koleksiyonuna girer.
- **Davranış:**
  1. Mekan kartında (ve/veya ADIM 4 detay kartında) **"+ Güzergaha Ekle"** butonu. Basınca mekan `selectedVenues[]` listesine eklenir (toggle: eklenmişse "✓ Eklendi" / "Çıkar").
  2. Eklenen mekan harita pininde ince işaret (dolu domates daire) ile vurgulanır; kart "✓ Eklendi" durumuna geçer.
- **Liste nerede görünür:** sol panelde rota özeti/slider'ın **altında** yeni **"Güzergahımdaki Mekanlar (N)"** bölümü — eklenen her mekan kompakt satır (küçük foto · ad · ilçe · ✕ çıkar). Boşken bölüm gizli.
  - *Öneri gerekçe:* sol panel = "benim güzergahım" özeti (durak + mekan); alt kadran = "keşfet havuzu". İkisi ayrı kalır, mekan≠durak hiyerarşisi korunur.

### ADIM 6 — KAYDET (Güzergahımı Kaydet)  · durum: ❌ YOK
- Sol panel altında (rota varken) **"Güzergahımı Kaydet"** butonu (domates dolu, tam-genişlik).
- Basınca: opsiyonel **ad sor** (mini inline input / prompt, default "Kalkış → Varış") → `selectedVenues + stops + km + activeIdx` bir kayıt objesine konur → `localStorage` `dada_yg_v2_routes[]`'e push.
- **Veri şeması:** `{ id, ad, stops:[{ad,lat,lng}], venues:[{ad,konum,lat,lng,dada}], km, ts }`.
  - **ROUTE-SCOPED ders (CLAUDE.md):** ziyaret/checkpoint eklenirse `visited{routeId:{ad:true}}` şeması — global mekan-adı anahtarı KULLANMA (Dalga 3'te checkpoint girmiyorsa sadece kayıt; girince route-scoped).
- Kaydet sonrası: **toast/onay** ("Güzergah kaydedildi") + Güzergahlarım sekme sayacı (`savedCnt`) güncellenir.

### ADIM 7 — GÜZERGAHLARIM (kayıtlı liste)  · durum: ⚠️ YARIM (boş iskelet)
- `viewSaved` (satır 425) şu an yalnız boş-durum. Hedef:
  - **Kayıt varsa:** liste — her kart: **ad** + özet satırı ("X durak · Y mekan · Z km") + tarih.
  - Kart tıkla → güzergahı **tekrar yükle** (stops + selectedVenues + aktif rota geri kurulur, Rota Kur sekmesine geçer, harita çizilir → düzenlenebilir).
  - Her kartta **sil** (saConfirm yok bu sayfada; basit inline onay / ✕ + "emin misin" mini-state).
  - **Boş durumda:** mevcut "İlk rotanı kur" CTA korunur (✅ zaten `ygGoBuild` çalışıyor, sekme değiştiriyor).
- Sekme başlığındaki `savedCnt` (satır 365, şu an `hidden`) kayıt sayısıyla dolar.

### ADIM 8 — SONRASI (kaydettikten sonra / tekrar açınca)  · durum: ❌ YOK
- Kaydetten hemen sonra: toast + (öneri) Güzergahlarım sekmesine yumuşak geçiş **YA DA** Rota Kur'da kal + "Güzergahlarım'a eklendi" toast (daha az sıçrama — öneri: **kalda kal + toast**).
- Sayfayı kapatıp tekrar açınca: localStorage'tan kayıtlar okunur → Güzergahlarım sekmesi dolu gelir, sayaç görünür. Rota Kur boş başlar (yeni rota), kullanıcı kayıttan birini tıklayıp yükleyebilir.

---

## 2. KOPUK HALKALAR — TEK BAKIŞTA (Dalga 3 iş listesi)

| Kopuk parça | Adım | Bağımlılık |
|---|---|---|
| K1 · Mekan **detay kartı** (flyTo + panel) + "Güzergaha Ekle" butonu | 4–5 | ADIM 4 render'ı üstüne |
| K2 · `selectedVenues[]` state + toggle + harita vurgu | 5 | K1 |
| K3 · Sol panel **"Güzergahımdaki Mekanlar"** bölümü | 5 | K2 |
| K4 · **Güzergahımı Kaydet** butonu + localStorage `dada_yg_v2_routes` | 6 | K2/K3 + stops |
| K5 · Toast/onay altyapısı (sayfa-içi izole) | 6/8 | — |
| K6 · **Güzergahlarım** liste render + yükle + sil + sayaç | 7 | K4 şeması |
| K7 · **Giriş** — portal+kesfet CTA repoint v1→v2 (+ ops. FAB) | 0 | bağımsız (en kolay) |
| K8 · 🔧 Alt kadran tam görünüm (a) + hover üst-çizgi temizliği (b) | 4 | bağımsız (en kolay) |

---

## 3. ÖNERİLEN IMPLEMENT SIRASI (Dalga 3)

1. **K8 + K7** (ufak, bağımsız, risksiz) — Beyar'ın 2 düzeltmesi + giriş linkleri v2'ye. Hızlı görünür kazanç.
2. **K1 → K2** — mekan detay kartı + "Güzergaha Ekle" + seçili-mekan state (akışın kalbi).
3. **K3** — sol panel "Güzergahımdaki Mekanlar" bölümü (K2'nin görünür yüzü).
4. **K5** — izole toast altyapısı (Kaydet öncesi hazır olsun).
5. **K4** — Kaydet + localStorage şeması.
6. **K6** — Güzergahlarım liste/yükle/sil/sayaç (kaydedilen veriyi tüketir → en sona).

> Mantık: önce risksiz görünür düzeltmeler (1) → sonra veri-üreten akış (2–5) → en son veriyi-tüketen ekran (6).
> Her adım: izole sayfa-içi CSS/JS · kanonik kabuk DOKUNMA · v1 DOKUNMA · token (domates `#E14827` / yeşil `#009d4f`) · `div+bg cover` görsel · tam-sayfa SS self-verify (1440/390) · dead-link denetimi · commit yalnız onayla.

---

## 4. AÇIK KARARLAR (Beyar onayı — implement öncesi)

- **D1 · Giriş:** mevcut CTA repoint mi *(öneri)* + FAB ek mi? → öneri: **önce repoint**, FAB isteğe bağlı ek.
- **D2 · Kaydet sonrası:** Güzergahlarım'a otomatik geç mi, Rota Kur'da kal + toast mı? → öneri: **kalda kal + toast**.
- **D3 · Kayıt adı:** otomatik "Kalkış → Varış" mı, kullanıcıdan iste mi? → öneri: **otomatik + düzenlenebilir** (inline).
- **D4 · Checkpoint/ziyaret:** Dalga 3'e girsin mi yoksa salt kayıt+yükle mi? → öneri: **bu turda salt kayıt** (checkpoint sonra, route-scoped şemayla).
