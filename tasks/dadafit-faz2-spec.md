# DadaFit FAZ 2 — Sayfa Spec'leri (shared task list)

> **READ-ONLY shared reference.** Hub (`mockups/dadafit-hub-v1.html`) FAZ 2'nin görsel
> referansı: **replicate not reinvent**. Header bloğu: `tasks/dadafit-header-blok.md`.
> Her teammate YALNIZ kendi dosyasına yazar. Hub / header bloğu / gunluk-kalori / recete-builder = READ-ONLY.

## Ortak miras (4 sayfada da zorunlu)

- **DadaFit header'ı** (`tasks/dadafit-header-blok.md`): topbar (`DadaMutfak'a dön` + promo + dil),
  `.fit-brand` SVG mark + wordmark, `.nav` (aktif sekme sayfaya göre), drawer, bottom-nav.
  `:root` recolor: `--tomato:#009d4f; --tomato-dark:#007a3d; --tomato-deep:#006a35; --tomato-tint:#e8f6ee;`.
  Yemek kırmızısı `--food:#E14827` DOKUNMA (iki-renk tezi).
- **Offset:** sabit chrome 112px (mobil 62px). İlk section `margin-top:112px`; `html{scroll-padding-top:112px}`.
- **İmza görsel dili:** full-görsel kartlar (ikon-tile DEĞİL), kadın-ağırlıklı **metinsiz** desatüre
  gerçek görsel, cam/blur panel, koyu `#211E16` + `#009d4f` yeşil gradient vurgu, **gövde beyaz-baskın**.
  Kare/oranlı görsel = `div + background-image` + `cover` + `center` (img tag YOK).
  Unsplash desatüre query kuyruğu hub'la aynı: `?w=700&q=80&auto=format&fit=crop&exp=7&gam=6&sat=-12`.
- **Kısıtlar:** aksan SADECE `#009d4f` (+ koyu/krem nötrleri). Krem/petrol/nane/`#3BB77E`/sage/zeytin
  yeşili **YOK**. Chip radius = radius-sm standardı. Görsel CSS render esas — 2x retina çarpma YOK.
- **Ton (K7):** kapsayıcı, no-pain-no-gain YOK, objektifleştirme yok, beden-pozitif.
- **Self-eval:** her teammate 1440 + 768 + 390 full-sayfa SS (`outputs/` altına), CROP YOK,
  kısa YAZILI rapor (ne yaptı + kabul kriteri karşılandı mı).

---

## 1 · Egzersiz Kütüphane — `mockups/egzersiz-kutuphane-v1.html`  (teammate: egzersiz-kutuphane)

Hub'daki **Egzersiz Kütüphanesi teaser'ını** (`#kutuphane`, `df-filterbar`+`df-fcards`) tam sayfaya açar.
Aktif nav: **Egzersizler**.

**İçerik:**
- Hero/üst panel: kısa başlık + breadcrumb (`DadaMutfak › DadaFit › Egzersizler`) + arama input.
  Hafif görsel/gradient zemin olabilir ama liste sayfası → gövde beyaz-baskın kalsın.
- **Filtre rayı:** Kas grubu (Bacak/Sırt/Göğüs/Omuz/Kol/Karın) · Ekipman (Vücut ağırlığı/Dambıl/Bant/Kettlebell) ·
  Seviye (Başlangıç/Orta/İleri). `df-fchip` çip dili; aktif çip yeşil. Sticky filtre bar tercih.
- **Egzersiz kart grid'i:** full-görsel kartlar (kadın-ağırlıklı, metinsiz), her kart: görsel + hareket adı +
  kas grubu etiketi + seviye rozeti + ekipman ikonu. Hover/focus durumu. ~9-12 örnek hareket.
- Sonuç sayısı + sıralama (Popüler/Yeni/A-Z) + "daha fazla yükle" veya sayfalama.
- **Miras:** `df-filterbar`/`df-fchip` (hub `#kutuphane`), `df-goal`/`df-combo` full-görsel kart dili.
- **Kabul:** header doğru + aktif sekme Egzersizler · filtre çipleri çalışır görünür (en az JS toggle) ·
  kartlar full-görsel (ikon-tile değil) · 3 viewport temiz · sadece `#009d4f` aksan.

---

## 2 · Egzersiz Detay — `mockups/egzersiz-detay-v1.html`  (teammate: egzersiz-detay)  ⚠️ EN AĞIR

Tek hareket detay sayfası. **R3 ağır iş:** set × tekrar × ağırlık **inline-input set-takip katmanı**.
Aktif nav: **Egzersizler**.

**Referans çeviri:** `dyt-recete-builder-v1.html` iskeletini al → semantik ÇEVİR (kopyalama, uyarla):
`öğün → egzersiz/set`, `kcal/makro → set/tekrar/ağırlık/hacim`, satır-ekle dili → set-ekle.

**İçerik:**
- Üst: breadcrumb + hareket adı + kas grubu etiketi + seviye + ekipman.
- **Görsel/GIF placeholder:** hareketin demo görseli (büyük, full-görsel; GIF gelince yer hazır).
- **Nasıl yapılır:** adım adım numaralı liste + ipuçları/uyarılar (form güvenliği, kapsayıcı ton).
- Hedef kaslar (birincil/ikincil) görsel etiket.
- **Set takip tablosu (çekirdek):** satır = set; kolonlar = Set # · Tekrar · Ağırlık (kg) · ✓ tamam.
  Inline number input'lar, "set ekle" butonu, otomatik **toplam hacim** (Σ tekrar×ağırlık) özeti.
  Hafif JS: satır ekle/sil + hacim toplamı (recete-builder'ın canlı toplam dilinin karşılığı).
- Alternatif/benzer hareketler şeridi (full-görsel kartlar) + "programa ekle" CTA.
- **Miras:** recete-builder içerik alanı + canlı toplam; hub full-görsel kart şeridi.
- **Kabul:** set tablosu inline-input + set-ekle + canlı hacim toplamı çalışır · header/sekme doğru ·
  GIF placeholder düzgün oran · 3 viewport temiz · aksan `#009d4f`.

---

## 3 · Program Detay — `mockups/program-detay-v1.html`  (teammate: program-detay)

Hub program kartına tıklayınca açılan program sayfası. Aktif nav: **Programlar**.

**İçerik:**
- **Full-görsel hero:** program kapağı (kadın-ağırlıklı) + cam panel: program adı, süre (ör. 4 hafta),
  hafta/gün sayısı, seviye, ekipman, hedef. Yeşil gradient vurgu. "Programa başla" CTA.
- **Genel bakış:** kısa açıklama + kazanımlar (kapsayıcı dil) + kime uygun.
- **Haftalık plan:** hafta sekmeleri/akordeon (Hafta 1-4); her hafta gün gün
  (Gün 1 Bacak · Gün 2 Dinlenme · …). Gün kartında o günün hareket listesi (set×tekrar özeti).
- **Gün detay → hareketler:** her hareket satırı egzersiz-detay sayfasına link (`egzersiz-detay-v1.html`).
- **İlerleme:** tamamlanan gün/hafta progress (hub `df-day` daygrid/`df-chal` dilinden uyarla),
  yüzde bar. Beden-pozitif ilerleme tonu.
- **Miras:** hub `df-top` glass-hero + `df-chal`/`df-days` daygrid + `df-prog` program kart dili.
- **Kabul:** full-görsel hero cam panel · haftalık plan gezilebilir (sekme/akordeon JS) ·
  hareketler egzersiz-detay'a link · header/sekme doğru · 3 viewport · aksan `#009d4f`.

---

## 4 · TDEE / Beslenme↔Hareket Köprü — `mockups/dadafit-kopru-v1.html`  (teammate: tdee-kopru)

Köprü deneyimi tam sayfa: **antrenman ekle → yakım hesapla → günlük bütçe büyür → protein-ağırlıklı
tarif önerisi (DadaMutfak'a bağlanır).** Aktif nav: **Hareket Merkezi** (veya promo `Köprü`).

**Referans:** `gunluk-kalori-v1.html` TDEE motorunu (BMH Mifflin-St Jeor × aktivite, `calc()` band dili)
REFERANS al — **onu BOZMA**, ayrı DadaFit köprü sayfası kur. Hub'daki **Enerji Defteri** (`df-ledger`)
+ **Enerji Köprüsü** (`df-bridge-card` 1-2-3 adım) + `df-tdee`/`df-burnadd` dilini genişlet.

**İçerik (köprü akışı, soldan sağa anlatı):**
1. **Enerji Defteri panel:** bugün aldığın (kırmızı `--food`) vs harcadığın (yeşil `#009d4f`) —
   iki-renk tezi. `df-ledger` cam panel genişletilmiş.
2. **Antrenman ekle:** hareket türü (yürüyüş/koşu/kuvvet/yoga…) + süre → **MET tabanlı yakım hesabı**
   (`MET × kg × saat`), `df-burnadd` dilinin canlı hali. Eklenen antrenmanlar listesi + toplam yakım.
3. **Bütçe büyür:** TDEE + egzersiz yakımı = güncel günlük enerji bütçesi; band (koru/ver/al) canlı güncellenir.
   gunluk-kalori `calc()` mantığının köprü türevi (ayrı JS, orijinali çağırma/değiştirme).
4. **Tarif önerisi:** açılan bütçeye + protein hedefine göre **protein-ağırlıklı tarif kartları**
   (full-görsel), `tarif-liste-v1.html?filtre=protein`'e link. Hub `df-combo` paket dili.
- **Miras:** `df-ledger` + `df-bridge-card` + `df-tdee`/`df-burnadd` + `df-combo`; gunluk-kalori calc/band.
- **Kabul:** antrenman ekle→yakım→bütçe canlı zincir çalışır (hafif JS, MET tabanlı) · iki-renk tezi
  (kırmızı alım / yeşil yakım) korunur · tarif kartları DadaMutfak'a link · header/sekme doğru · 3 viewport.

---

## Domain separation
| teammate | yazar (TEK) | read-only referans |
|---|---|---|
| egzersiz-kutuphane | `mockups/egzersiz-kutuphane-v1.html` | hub, header-blok |
| egzersiz-detay | `mockups/egzersiz-detay-v1.html` | hub, header-blok, dyt-recete-builder |
| program-detay | `mockups/program-detay-v1.html` | hub, header-blok |
| tdee-kopru | `mockups/dadafit-kopru-v1.html` | hub, header-blok, gunluk-kalori |
</content>
</invoke>
