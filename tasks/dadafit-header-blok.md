# DadaFit Header Bloğu — Yeniden Kullanım Kılavuzu

> DadaFit alt-marka header'ı `v6/dadafit-hub-v1.html`'de kuruldu (Store/Akademi
> pattern'i). Bu doküman, ileride **diğer DadaFit sayfalarına** (Egzersizler, Program-detay,
> Challenge…) aynı header'ı **kopyalamak** için referanstır. Bileşen sistemi yok → her
> sayfa chrome'u inline taşır (Store/Akademi de böyle).

## Parçalar (dadafit-hub-v1.html'den al)

1. **Topbar** (`.topbar`): sol `← DadaMutfak'a dön` (`.tb-back`) + `.tb-div` + promo
   (`.tb-promo`, "Yediğini hareketle dengele"), sağ dil seçici (`.tb-lang`). Worlds kuşağı YOK.
2. **Header** (`<header class="header">` → `.h-top`):
   - Marka: `<a class="brand fit-brand">` = `.fit-mark` SVG (yeşil rounded-badge + beyaz şimşek)
     + `.fit-word` (`<b>Dada</b><span class="ft">Fit</span>`).
   - Nav (`.nav`): Hareket Merkezi (`.active`) · Egzersizler `▾` (`.dropdown`: Vücut Bölgesi +
     Ekipman, `.dd-group` ayraçlı) · Programlar · Challenge · Antrenörler.
   - `.head-actions`: arama + giriş + (login-state: ekle/zil/avatar) + hamburger — DEĞİŞTİRME
     (global auth makinesi, `body.is-auth` sweep'i ile çalışır).
3. **Drawer** (`.drawer`): head'de `.drawer-brand` (fit-mark + fit-word), nav'da DadaFit
   `.d-item`'lar, foot'ta **`DadaMutfak'a dön`** köprüsü (`.drawer-add`) + dil.
4. **Bottom-nav** (`.bottom-nav`): Hareket (bolt) · Egzersiz · Programlar (`.bn-center` fab) ·
   Challenge · Hesap.

## SVG mark (kopyala)
```html
<svg class="fit-mark" viewBox="0 0 44 44" aria-hidden="true"><rect x="2" y="2" width="40" height="40" rx="11.5" fill="#009d4f"/><path d="M25 8 L13.6 26 H19.8 L18.2 36 L30.4 17.6 H23.8 Z" fill="#fff"/></svg>
```

## CSS (kopyala — header CSS bloğunda)
- **Recolor (Store/Akademi mekanizması):** `:root` içinde tomato ailesini yeşile çevir:
  `--tomato:#009d4f; --tomato-dark:#007a3d; --tomato-deep:#006a35; --tomato-tint:#e8f6ee;`
  → tüm chrome aksanı (nav aktif, giriş butonu, ikon hover, Pro) yeşil olur.
  ⚠️ "Yemek/aldığın" kırmızısı `--food:#E14827` ve hardcoded `rgba(225,72,39…)` ile durur →
  Enerji Defteri'nin iki-renk tezi (kırmızı↔yeşil) korunur. **Global flip güvenli.**
- **Marka kimliği** (`.tb-back`, `.tb-promo`, `.fit-brand/.fit-mark/.fit-word`, `.drawer-brand`):
  dadafit-hub'daki `.header.at-top .brand .logo-white` satırından hemen sonraki blok.

## Offset (ÖNEMLİ)
- Sabit chrome = topbar 40 + header 72 = **112px** (mobil 62px). Eski hibritte +54px subnav vardı
  (166) → KALDIRILDI.
- Sayfanın **ilk section'ı** 112px aşağıdan başlamalı. Hub'da hero `.df-top`'a `margin-top:112px`
  (mobil 62px) verildi. Yeni sayfalarda ya aynı margin, ya da ilk section'a `class="below-header"`
  (`padding-top:112px`) — ama hero'nun kendi padding'i varsa margin tercih et (çakışma olmaz).
- `html{scroll-padding-top:112px}` (mobil 62) — header altı anchor jump offseti.

## Nav anchor'ları
Hub tek sayfa → nav in-page anchor: `#kutuphane` (egzersiz), `#programlar`, `#challenge`,
`#antrenor`, promo `#kopru`. Ayrı sayfalar gelince (FAZ 2) bunlar gerçek sayfa URL'lerine bağlanır.

## Store/Akademi tutarlılığı
Store (`--tomato:#E14827`) ve Akademi (`--tomato:#006072`) zaten aynı pattern'i ve `--tomato`
recolor'ını kullanıyor; DadaFit (`#009d4f`) üçüncü üye. Üçü de kendi `.brand` SVG mark + wordmark
+ "DadaMutfak'a dön" köprüsü taşır. Tek fark: DadaFit'in `.fit-*` sınıf adları (Store `.shop-*`,
Akademi `.ak-*`).
