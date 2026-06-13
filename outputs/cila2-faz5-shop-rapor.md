# CİLA-2 Faz 5 — Shop Cila Raporu (shop-cila teammate)

> Sahiplik: `dada-shop-v1.html` + shop alt sayfaları. Ayrı mağaza kabuğu
> (kendi header/nav/SVG, dmCart). `_shell.html`'e dokunulmadı.
> Tarih: 2026-06-13. FULL AUTO.

## Özet

Patron geri bildirimi: "shop ham ve tekdüze; hero menüyle kesişiyor; sağda çift
'Ana Site' butonu gereksiz." İki görev vardı:

- **Task #1 (Ana Site butonu temizliği):** DOĞRULANDI ama HEADER edit olduğu için
  **STABİL sinyali bekleniyor** (lead verecek). Aşağıda plan + bulgu.
- **Task #2 (hero nefes + section cila):** **TAMAMLANDI** — header'a dokunmadan.

---

## Task #1 — Ana Site çift buton temizliği (TAMAMLANDI)

> Lead green-light verdi (STABİL beklemeye gerek yok; shop kabuk header'ı kendi
> dosyalarımda, header teammate yalnız `_shell.html` topbar'ında — çakışma yok).

### Yapılan
`head-actions`'taki sağ `shop-back` "Ana Site" butonu + ölü `.shop-back` CSS'i
(base 3 kural + 1024/640 media override'ları) **5 shop dosyasından** idempotent
kaldırıldı: `dada-shop-v1`, `urun-liste-v1`, `urun-detay-v1`, `sepet-v1`,
`odeme-v1`. (`siparislerim-v1`'de zaten yoktu.) Byte-mode `perl -ni` (TR-safe,
`-CSD` yok — lessons). Komşu kurallar (`.dropdown.shop-cats`, `.shop-word`,
`.shop-mark`) korundu, boş media bloğu oluşmadı.

### Sonuç: ana siteye dönüş TEK ve SOL ÜSTTE
- **Kalan tek dönüş:** topbar sol-üst `tb-back` "← DadaMutfak'a dön"
  (`anasayfa-portal-v3a.html`). Tıkla-probe: tb-back → anasayfa'ya navigasyon ✓.
- Mobilde ek olarak drawer "DadaMutfak'a Dön" duruyor.
- `head-actions` artık: ara · sepet (dmCart) · Giriş · hamburger. Çift YOK.
- **Kanıt:** her 5 dosyada `shop-back` = 0 · `tb-back` = 1 · `anasayfa` href = 3
  (tb-back + crumb-home + drawer) · header-after SS temiz.

### Doğrulama (lead'in istediği)
- **Sol-üst dönüş ZATEN VAR:** topbar'da `tb-back` = "← DadaMutfak'a dön"
  (`anasayfa-portal-v3a.html`'e gider, satır ~906). Yani ana siteye dönüş
  sol-üstte mevcut.
- **shop-brand (DadaStore logo)** → mağaza anasayfasına (`dada-shop-v1.html`)
  gider, ana siteye DEĞİL — doğru davranış.
- **Çift olan:** `head-actions` içindeki sağ `shop-back` "Ana Site" butonu
  (satır ~962). Patron'un "sağdaki çift gereksiz" dediği tam bu.
- Mobil (≤640) zaten `shop-back{display:none}` — orada drawer'ın kendi
  "DadaMutfak'a Dön" linki var. Yani çift sadece masaüstü/tablette görünüyor.

### Plan (STABİL sonrası 2 dk iş)
`head-actions`'taki `shop-back` `<a>` butonunu KALDIR → ana siteye dönüş TEK ve
SOL ÜSTTE (topbar `tb-back`) kalır. Ek dönüş linki gerekmiyor (zaten sol-üstte).
Ölü kalan `.shop-back` CSS bloğu (+ media query override'ları) temizlenir.

### Neden beklemede
Lead kuralı: "Shop kabuk HEADER'ına dokunmak için header teammate STABİL
sinyali bekle." Bu edit `head-actions` (header) içinde → sinyal bekleniyor.
Lead'e bulgu + plan mesajı gönderildi.

---

## Task #2 — Hero nefes + section cila (TAMAMLANDI)

### 2.1 Hero–header kesişmesi (KRİTİK bug düzeltildi)
**Kök neden:** `.shop-vitrin{padding:6px 0 12px}` shorthand'i `.below-header`
`padding-top:112px`'i (cascade'de sonra geldiği için) tamamen EZİYORDU → hero
sabit header'ın altına giriyordu (§3 "dada-shop nefes vakası" birebir tekrarı).
**Çözüm:** longhand'e geçildi — `padding-top:120px` (112 header + 8 nefes) +
crumb `margin-top:16px` → header-altı toplam nefes. Mobil `padding-top:72px`.
**Kanıt (element-rect):** masaüstü header.bottom=113px, crumb.top=136px →
**gap 23px** (önce ~0/çakışma).

### 2.2 "Tekdüze" — zemin ritmi cila
**Kök neden:** `--bg-cream:#f9f9f9`, beyaz `#fff`'e neredeyse eşit → section
alternasyonu GÖRÜNMEZ. Patron'un "ufak renk geçişi yetersiz" dediği tam bu.
**Çözüm:** cream section'lar görünür sıcak cream `--cream-2 (#F7F1E6)` token'ına
çekildi (hero gradyanında zaten kullanılan token; kabuk kimliğiyle uyumlu).
Temiz alternasyon (komşu iki aynı renk YOK):
```
hero(beyaz) → kategori(cream) → çoksatan(beyaz) → [bambu ayraç]
→ promo(cream) → indirim(beyaz) → [bambu ayraç] → yeni(cream) → güven(beyaz)
```

### 2.3 Akışkanlık — yumuşak seam + bambu serpiştirme
- **`.shop-flow` / `.shop-flow-cream`:** her section ÜSTÜNE 46px yumuşak
  gradyan eriyiş (cream üstü beyazdan, beyaz üstü cream'den erir) → sert renk
  bloğu yerine akışkan geçiş. `.wrap` z-index:1 ile içerik etkilenmez.
- **`.bamboo-sep`:** 2 noktada bambu serpiştirme ayracı — yumuşak hairline +
  ortada `fa-seedling` yaprak (sıcak `#b59f73` ahşap tonu; yeşil değil →
  palet disiplini korundu). Beyaz zeminli, komşu beyaz section'la seamless.

### 2.4 Hero (cmp-band) genel cila
- Gölge `sh-sm → sh-md` (daha fazla kalkış), kenarlık sıcak `#efe7d8`,
  padding 40/44 → 42/46.
- **`.cmp-leaf`:** hero kartına faint bambu yaprağı (`#b59f73`, opacity .12,
  rotate -14°, pointer-events yok) — "bambu serpiştirme" dili. Mobilde gizli.

### Korunan kabuk kimliği (DEĞİŞMEDİ)
DadaStore SVG logo · dmCart sepet izi (`.cart-*`) · ayrı mağaza nav'ı ·
`.p-card` ürün kartı dili · countdown · promo tile'lar · trust band yapısı.
Yalnız nefes/zemin/akışkanlık/gölge dokunuldu — yapı/kurgu sabit.

---

## Denetim / Kanıt

| Kontrol | Sonuç |
|---|---|
| `git diff --numstat` | **+38 / −10** (net pozitif, yutma yok) |
| Silinen CSS kuralı (`-…{`) | yalnız 2 bilinçli (shop-vitrin, trust-band) — ikisi de yeni değerle geri eklendi |
| Mojibake (`Å` imza) | **0** |
| Hero–header nefesi (desktop) | header.bottom 113 → crumb.top 136 = **23px** |
| Mobil 390 yatay taşma (element-rect, scroller/hidden hariç) | **0** · `scrollW=390` |
| dmCart tıkla-probe | `dmCart` var · `.p-add` tık → badge **0→1** · badge görünür ✓ |
| Görsel SS | desktop-top / desktop-full / mobile-top / seam-bamboo (outputs/ss-shop-cila/) |

SS klasörü: `outputs/ss-shop-cila/`

---

## Bilinen Sınırlamalar

1. **Task #1 ve #2 ikisi de TAMAMLANDI.** (Önceki sürümde #1 STABİL bekliyordu;
   lead green-light verdi, kapatıldı.)
2. **Hero/section CİLASI yalnız `dada-shop-v1.html` (mağaza anasayfası)'na
   uygulandı.** Alt sayfalar (urun-liste/detay/sepet/odeme/siparislerim) yalnız
   `shop-back` temizliği aldı — onların zemin-ritmi/akışkanlık cilası YOK.
   Tutarlılık için istenirse ayrı tur (lead kararı).
3. **SS izole Chrome ile alındı** (paylaşımlı MCP browser başka teammate'te
   meşguldü). `playwright-core` + Google Chrome binary ile sürüldü; 390 probe
   `isMobile:true` viewport=390'da koşuldu (headless min-genişlik tuzağı
   element-rect + scroller-exclude ile aşıldı, §4 + lessons).
4. **Alt sayfalara (urun-liste / urun-detay / sepet / odeme / siparislerim)
   bu turda DOKUNULMADI** — görev shop anasayfası hero/section cilasıydı. O
   sayfalar dmCart/p-card dilini paylaşıyor; aynı zemin-ritmi/akışkanlık cilası
   gerekirse ayrı tur (lead kararı). Şu an tutarlılık riski: anasayfa cream
   ritmi alt sayfalarda yok → istenirse port edilir.
5. **Bambu yaprak rengi `#b59f73` (ahşap tonu)** seçildi; yeşil bambu yerine
   palet disiplini (yeşil=sağlık/indirim) korundu. İstenirse faint yeşile
   çekilebilir (patron tercihi).
