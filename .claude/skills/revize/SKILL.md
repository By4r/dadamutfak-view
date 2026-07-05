---
name: revize
description: "Sayfa revizesi: keşif + plan + onaylı uygulama + localhost QA"
allowed-tools: Read, Write, Edit, Bash, Grep, Glob
---

# Sayfa Revizesi (revize)

Kullanım: `revize <dosya-adı>` + altında numaralı madde listesi.
Akış beş adımdır; sırayla uygula, adım atlama. **Onay gelmeden kod değişmez.**

## ADIM 0 — GİRDİ KONTROLÜ

1. İlk argüman hedef dosyadır (örn. `tarif-detay-v1.html`) — `v7-6cu356/` altında ara.
2. Dosya yoksa veya birden fazla aday varsa **SOR, tahmin etme.**
3. Maddeler eksik/anlaşılmazsa uygulamaya geçmeden netleştirme sorusu sor
   (soru sorarken her seçeneğe gerekçeli öneri ekle — CLAUDE.md kuralı).

## ADIM 1 — KEŞİF (implement ETME)

1. Hedef dosyayı derinlemesine oku; her maddenin mevcut markup/CSS/JS durumunu çıkar
   (hangi blok, hangi satırlar, hangi stiller etkileniyor).
2. Madde başka sayfadaki bir pattern'a atıf yapıyorsa (örn. "tarif detaydaki gibi")
   **o sayfayı da oku** — pattern'ı koddan teyit et, hafızadan uydurma.
3. Local server kapalıysa ayağa kaldır: `v7-6cu356/` içinden
   `python3 -m http.server 8080` (arka planda).

## ADIM 2 — PLAN + DUR

1. Madde madde kısa plan sun: **ne değişecek, hangi satırlar/bloklar**, riskli
   nokta varsa açıkça belirt.
2. Birden fazla makul çözüm varsa **2 alternatif + net öneri** (tek cümle gerekçeyle).
3. **DUR. Beyar'ın onayını bekle.** Onay gelmeden tek satır kod değiştirme.

## ADIM 3 — UYGULAMA (onaydan sonra)

1. **Sadece hedef dosyayı** değiştir; zorunluysa ilgili ortak CSS/JS'e dokunabilirsin.
   Başka sayfaya dokunma.
2. Nav/header değişikliği çıkarsa **UYAR:** bu bloklar hardcoded'dır ve tüm marka
   sayfalarına yayılması gerekir — kapsamı Beyar'a onaylat, **kendiliğinden yayma.**

## ADIM 4 — QA + RAPOR (minimal protokol)

### NONE+console (varsayılan — her iş)

1. Uygulama bitince sayfayı headless'ta **BİR KEZ** aç (`?cb=<timestamp>`
   cache-bust), console error sayısını kontrol et (0 mu?), kapat.
   Playwright'ta `networkidle` KULLANMA (video/uzak görselli sayfalarda
   asla inmiyor) — `domcontentloaded` + sabit bekleme.
2. **SS yok, görsel self-verify yok, link crawl yok, assert scripti yok.**
3. Rapor: tek satır **"Console: temiz"** (veya hata dökümü) + ne değiştiğinin
   kısa özeti + **localhost linki**. Görsel kontrol tamamen Beyar'da.

### FULL (yalnız öneriyle — otomatik DEĞİL)

Şu işlerde raporda FULL QA **öner ve Beyar'ın onayını bekle**; onaysız
çalıştırma:

- Çok dosyalı yayılım / sweep
- Kabuk/shell transplantı (header/footer)
- href/nav toplu değişikliği

Onay gelirse `tasks/_qa-lib.mjs` ile link crawl + SS yapılır
(SS'ler gitignore'lu `outputs/` altına).

### Ortak

- Rapora zorunlu satır: **"QA modu: NONE+console"** (veya FULL önerisi
  + tek cümle gerekçe).
- Kısa **YAZILI** rapor: madde madde ne yapıldı + console sonucu.
- **COMMIT/PUSH YOK** — kapanışı Beyar `handoff` ile yapar. Raporu ver, DUR.

## Kurallar

- **Sahte içerik üretme.** Mockup verisi gerekiyorsa mevcut sayfanın dilinde/tonunda
  kurgusal içerik yaz; gerçekmiş gibi marka/kişi/ürün uydurma.
- **Marka token disiplini.** Her marka kendi `--{marka}-*` token'larını kullanır;
  cross-contamination yok (örn. DadaFit sayfasına Gourmet moru sızmaz).
- **Pattern disiplini.** Mevcut kart/radius/tipografi pattern'ından sapma yok;
  yeni görsel dil icat etme, sayfadaki dili sürdür.
