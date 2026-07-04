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

## ADIM 4 — QA + RAPOR

1. Localhost'ta `?cb=<timestamp>` cache-bust ile Playwright kontrolü:
   - Console error taraması
   - Değişen bölgenin görsel doğrulaması (1440px, TAM SAYFA — crop yok)
   - Screenshot'lar gitignore'lu klasöre (`outputs/`)
2. Dokunulan sayfanın giden bağlantı/CTA hedeflerini tıkla-doğrula
   (CLAUDE.md "Bağlantı & Akış Bütünlüğü" kuralı).
3. Kısa **YAZILI** rapor: madde madde ne yapıldı + QA sonucu.
4. **COMMIT/PUSH YOK** — kapanışı Beyar `handoff` ile yapar. Raporu ver, DUR.

## Kurallar

- **Sahte içerik üretme.** Mockup verisi gerekiyorsa mevcut sayfanın dilinde/tonunda
  kurgusal içerik yaz; gerçekmiş gibi marka/kişi/ürün uydurma.
- **Marka token disiplini.** Her marka kendi `--{marka}-*` token'larını kullanır;
  cross-contamination yok (örn. DadaFit sayfasına Gourmet moru sızmaz).
- **Pattern disiplini.** Mevcut kart/radius/tipografi pattern'ından sapma yok;
  yeni görsel dil icat etme, sayfadaki dili sürdür.
