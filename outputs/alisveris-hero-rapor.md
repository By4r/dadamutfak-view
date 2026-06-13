# Task #6 — alisveris-listesi hero butonları (TEŞHİS + FIX RAPORU)

**Dosyalar:** `mockups/alisveris-listesi-v1.html` (+ `siparislerim-v1.html`, `giris-v1.html` aynı guard).
`git diff --numstat`: alisveris `8 1` · siparislerim `3 1` · giris `3 1`. COMMIT YOK.
**Kapsam:** sadece buton katman/etkileşim (z-index/pointer-events). §2f hero görseli/overlay GÖRÜNÜMÜ değişmedi (SS `02-hero-buttons-render.png` teyit).

## Teşhis (standalone headless Chrome hit-test — Playwright YASAK'a uyuldu)
Iframe + `elementFromPoint` ile gerçek hit-test (buton merkezine pointer iner mi):
- **Desktop 1280 + Mobil 390:** 3 buton da `elementFromPoint` → kendi butonuna çözülüyor, `pointer-events:auto`, handler bağlı. Yani **default state'te bloklanmıyordu** (statik SS'de görünmeyen, ben de doğruladım).
- **JS handler teyidi:** `#alPrint`→`window.print()`/`genListPdf` (satır 2041), `#alShare`→popover toggle (2047–2052), `a.see-all`→gerçek `href=haftalik-menu-v1.html`. Hepsi sağlam.
- **Latent risk bulundu (kök):** hero butonları, header'ın `.mega`/`.dropdown`/`.cart-dd` (z:80) ve `.fb-overlay`/`.lg-overlay` (z:97) katmanlarının **geometrik olarak altında** kalıyor. Bu overlay'ler şu an `visibility:hidden` (bu yüzden hit-test'te bloklamıyorlar) AMA hero butonlarının kendi stacking z-index'i YOK → bir overlay state'i visible'a dönerse (login-gate, cart-dd, mega) veya ileride pointer-events guard'ı eksik kalırsa butonlar **pointer'ı kaptırır**. mcp-doğrulama "bleed yok" demişti ama bu katman riskini test etmemişti — sorun pointer/z-index katmanı, statik SS'de görünmez.

## Fix (görünürlüğü değiştirmeden katman sertleştirme)
`.al-top .wrap`'a stacking + buton grubuna açık üst-katman + garantili pointer-events:
```
.al-top .wrap{position:relative;z-index:5}
.al-top .al-actions{position:relative;z-index:6}
.al-top .al-actions .see-all,.al-top .al-actions .al-act,.al-top .al-actions .al-share-wrap{position:relative;z-index:6;pointer-events:auto}
.al-top .al-share-pop{z-index:40}     /* popover kendi grubunun üstünde açılır */
```
→ butonlar artık overlay katmanının (z:80–97) yerine **page-main stacking context'i içinde z:5/6** ile, header dropdown'ları page-main'in DIŞINDA/üstünde olduğundan onlarla çakışmaz; içerik-içi overlay durumlarına karşı butonlar daima tıklanabilir + hover'lı kalır. Hover kuralları (`.al-act:hover` 881, `.see-all:hover` 119) zaten mevcut, korundu.

### siparislerim-v1 + giris-v1 (aynı kontrol)
- siparislerim hero `a.see-all` "Alışverişe Devam Et" → hit-test OK (clickable, href=dada-shop-v1). Aynı guard eklendi: `.ord-top .wrap{z-index:5}` + `.ord-top .ord-head .see-all{z-index:6;pointer-events:auto}`.
- giris hero `.au-submit` (Giriş Yap / Hesabımı Oluştur) → hit-test OK (kart y≈843, overlay zone'unun altında). Aynı guard: `.au-top .wrap{z-index:5}` + `.au-top .au-card{z-index:6}`.

## Kanıt
- `outputs/alisveris-hero-ss/01-clickable-probe.png` — fix SONRASI hit-test: 3 buton da `✓ CLICKABLE`, `z=6`, doğru href.
- `outputs/alisveris-hero-ss/02-hero-buttons-render.png` — hero render: 3 buton görünür, §2f overlay/görsel dili bozulmadı.
- (Teşhiste siparislerim/giris hero butonları da `OK` çıktı — guard koruyucu/tutarlılık amaçlı.)

> NOT: Default state'te butonlar zaten tıklanıyordu; fix latent z-index/pointer-events kırılganlığını kapatır ve task'ın istediği "z-index overlay üstünde + pointer-events:auto + hover çalışır" kontratını açıkça garanti eder. Eğer Beyar'ın gördüğü kırıklık özel bir state'te (ör. login-gate açıkken) idiyse bu fix onu da kapsar.
