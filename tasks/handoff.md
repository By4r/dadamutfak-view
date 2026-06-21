# DadaMutfak — Handoff (Faz 2 Gözetim TAMAMEN BİTTİ · PUSH BEKLİYOR)

> Tarih: 2026-06-21. Süper-admin gözetim paneli (`v5/sa-*`) Faz 2 tüm dalgaları + antrenör paneli + wiring **bitti ve commit'li**. **origin'e PUSH EDİLMEDİ** (push = Beyar kararı, GitHub Pages canlı).

## DURUM — ne bitti
- **1. dalga gözetim** (Sağlık 4 + İşletme 4 + DadaFit 3 = 11 modül / 24 ekran) + wiring → `cc0b2a5`.
- **2. dalga gözetim** (Admin 9 + Store 6 = 15 modül / 28 ekran) + SECTIONS wiring → `1207fd0`.
- **Chip standardizasyonu** (wave-1 filtre chip radius+padding+weight → flagship 8px) → `7e2afbc`.
- **Docs** (Tarifler tipi CRUD+moderasyon hibrit) → `5ad8b1f`.
- **Chore** (birikmiş outputs screenshot'ları untrack, ~744MB) → `df92a68`.
- **Antrenör operatör paneli** (8 ekran + builder + giriş kilidi) → `ed410c3`/`f0a7493` (+ qa `6d557c4`/`2208456`, docs `ba79698`).

**Birikmiş commit'ler (push bekliyor):** `cc0b2a5 · 1207fd0 · 7e2afbc · 5ad8b1f · df92a68` (+ antrenör dalgası commit'leri). `git log --oneline` ile tam liste.

**UNTRACKED (commit bekliyor):** 10 adet `tasks/*-qa.mjs` (render-QA scriptleri: admin-tarifler, admin-sefler-slider, sa-admin-b2b6, sa-admin-raporlar, store-siparisler, store-wave2, chip-sweep, chip-style, chcnt-radius, wiring-regression). `handoff.md` (bu dosya) commit'siz.

## ⏭️ SIRADAKİ İŞ (clear sonrası İLK) — Liste filtre chip sayaçları

**KARAR (kesin): Liste filtre chip'leri SAYAÇLI KALIR.** Sayaç (`.ch-cnt`, ör. "Bekliyor 2") gözetim paneli için faydalı triage bilgisi — kaldırma denendi, geri alındı. Hedef: **24/24 liste sayfasında tutarlı sayaç.**

- **Zaten sayaçlı 14 sayfaya DOKUNMA:** admin (sefler/slider/tarifler) · dadafit-antrenorler · isletme (5: isletmeler/menuler/onaylar/reklam/rezervasyonlar) · saglik (5: diyetisyenler/hesaplayicilar/randevular/receteler/testler).
- **Sayaç EKLENECEK 10 sayfa:** admin-kullanicilar · admin-sayfalar · store (urunler/siparisler/musteriler/kategoriler/promosyonlar) · dadafit (challenge/egzersizler/programlar).
- Kural: her filtre chip'ine `<span class="ch-cnt">N</span>` + `.chip .ch-cnt{...}` CSS (saglik/isletme pattern'i BİREBİR: font 10.5px, `border-radius:var(--radius-sm)` = 8px, min-width:18px, height:17px, acc-rgb tint). `.chip.is-active/.is-on .ch-cnt` koyu varyant.
- **Sayılar DOM-DOĞRULANMIŞ GERÇEK olacak — UYDURMA YOK.** Her sayfanın tablosunu render edip her durum/kategori filtresine düşen satır sayısını say (Playwright `tbody tr` filtrele), "Tümü" = toplam. Yanlış sayı = Beyar takılır.
- Sonra: render-QA (24/24 sayaçlı + 8px + akış) → **commit** (sade-chip değil! "feat/style: add filter chip counters to remaining list pages" + qa scriptleri `chore`) → handoff güncelle → **`git push origin main`**.

## SONRAKİ FAZLAR
- **(a) 390px ref fix:** `sa-isletme-isletmeler` @390 yatay tablo taşması (~789px ptable). Ayrıca eski bekleyen: saglik-diyetisyenler @390. store-urunler responsif kanonu ile targeted yama. (1. dalga'dan kalan; chip işiyle alakasız, pre-existing.)
- **(b) Faz 3 "Panelini Aç" köprüsü:** gözetim → operatör impersonation. İlk iş = **operatör panel envanteri**: antrenör paneli VAR (`antrenor-*-v1`); **diyetisyen (`dyt-*`) + mekan (`mekan-*`) panelleri mevcut mu teyit et** (envantere göre dyt 6 + mekan 4 dolu olmalı). Gözetim "Panelini Aç → X" aynı operatör dosyalarını besler, ikinci kez yazılmaz.

## DEĞİŞMEZ KURALLAR (gözetim paneli)
- **Kanonik kabuk tek kaynak:** `assets/css/sa-shell.css` + `assets/js/sa-shell.js` (SECTIONS config) + `assets/css/sa-ui.css` + `assets/js/sa-ui.js` (saConfirm/saToast/dropdown). **DOKUNMA** — sadece `<link>`/`<script>` ile yükle; sa-ui shell.js tarafından auto-inject.
- **Aksan otomatik:** `body[data-sec]` → `var(--acc)` çözer (admin/store domates `#E14827` · saglik nane `#3BB77E` · dadafit yeşil `#009d4f` · isletme petrol `#006072`). **Renk literali yazma**, token kullan. **Mint kaçağı** = ham `rgba(59,183,126)`/`#3BB77E`/`#6cca98`; `var(--green-deep/tint)` KANONİK (`.pstat.ok` da kullanır, kaçak değil).
- **Gözetim deseni:** liste "Yeni" yok, detay "Düzenle" yok (oku+denetim) — config/CRUD modüllerinde flagship form VAR (kullanicilar/urunler pattern). Yıkıcı aksiyon → saConfirm. Her listede boş durum + filtre + arama.
- **Chip standardı:** filtre `.chip` = `var(--radius-sm)` 8px · padding 7px 14px · base font-weight 500 / aktif 700. İçerik etiketleri (`.spec-tag/.cat-tag/.type-tag/...`) 6px AYRI tip (dokunma). `.lvl` 999px pill (kasıtlı).
- **Görsel:** kare/oranlı görsel `<img>` DEĞİL → `div + background-image + cover + center` (Kerem Bey). Full-file overwrite YASAK, targeted edit. **UTF-8:** perl ile düzenlerken `-CSD` KULLANMA (mojibake yapar) → byte-mode + her dosyada `grep`/`git diff` flush teyidi (idle'a güvenme).

## REFERANS
- Envanter/plan: `tasks/faz2-envanter.md` · `tasks/sa-entegrasyon-plan.md` · `tasks/sa-envanter-tarama.md` · `tasks/spec-impact-public-revize.md`
- Flagship referans (OKU, DOKUNMA): `v5/sa-admin-kullanicilar.html` (Admin CRUD) · `v5/sa-store-urunler.html` (Store CRUD) · `v5/sa-saglik-randevular*` (gözetim disiplini).
- Local server: `python3 -m http.server 8765` proje kökünden → `http://localhost:8765/v5/...`. QA: `node tasks/*-qa.mjs` (Playwright, kökte `node_modules/playwright`).

## DİĞER BEKLEYENLER (public/Laravel fazı — mockup'a girmez)
- `tasks/public-faz-bekleyen.md`: DadaFit nav temizliği. · `tasks/spec-impact-public-revize.md`: koordinat/güzergah/şehir-öneri.
- Paralel (Claude.ai): TG Germany admin login ↔ sa-giris hizalaması · ₺49 tier-1 fiyat (Yasin Bey).
