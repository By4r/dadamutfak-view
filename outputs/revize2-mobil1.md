# Revize2 — Mobil Denetim 1 (mobil1) Raporu

> **EK — Task #5 (kanonik pattern yayılımı) §9'da.** Toplam **55 sayfa** kanonik `bn-hidden`/`__bnUpdate` taşıyor (21 task#1 + 33 task#5 + _shell).

**Kapsam:** 21 sayfa (ana sayfa portal, tarif ailesi, shop/sepet/ödeme, profil/bildirim/sipariş, menü/liste).
**Viewport:** 390×844 (mobil), 1440×900 (masaüstü regresyon).
**Yöntem:** Bağımsız headless Chrome (playwright-core → sistem Chrome) ile her sayfada 4 scroll-state'te (top / mid / bottom / afterUp) sabit-eleman envanteri (rect + z-index + örtüşme), yatay taşma (`scrollingElement.scrollWidth`), dokunma alanı (<40px), console hatası taraması. MCP browser başka teammate'lerce kilitliydi; viewport çakışmasını önlemek için kendi izole tarayıcımı kullandım.

> **Neden MCP yerine kendi tarayıcı:** `mcp-chrome` profili "already in use" hatası verdi (3 teammate paylaşımlı). `browser_resize/navigate` çağrıları birbirini ezeceğinden `playwright-core@1.48` kurup sistem Chrome'una bağlandım. Tüm SS/envanter bu izole context'ten.

---

## 1. KANIT VAKA — tarif-detay-v1 (🔴 → çözüldü)

**Bulgu (önce):** Scroll'da ekranın altında **3 sabit katman üst üste** yığılıyordu:
- `bottom-nav` (z90) @766–830
- `cookie-banner` (z95) @576–764
- `actbar` (z88) @ mid:726–812 / bottom:680–766

Örtüşme: actbar↔bottom-nav **46px**, actbar↔cookie **38–84px**. Beyar'ın "ekranın yarısını yiyor, içerik arkada eziliyor" dediği tam bu. (`tarif-detay-v1-390-once.png`)

**Düzeltme (kanonik pattern):**
- `.bottom-nav` → `transition:transform .26s` + yeni `.bottom-nav.bn-hidden{transform:translateY(calc(100% + 30px));pointer-events:none}`.
- JS **alt katman yöneticisi** (`window.__bnUpdate`): çerez onayı VEYA sayfanın kendi aksiyon şeridi (`window.__bottomStrips`, burada `#actbar`) açıkken bottom-nav gizlenir; şerit olan sayfada nav ayrıca aşağı kaydırınca gizlenir, yukarı/tepe(<80px)'de geri gelir (delta threshold 12px).
- `actbar` onScroll'una `!cookieOpen` koşulu eklendi (çerez açıkken şerit bastırılır).
- Çerez `setTimeout(show)` ve `dismiss()` → `__bnUpdate()` tetikler (setTimeout ile beliren banner'da nav anında gizlensin).

**Kanıt (sonra):**
| state | görünen tek katman |
|---|---|
| top (post-consent) | bottom-nav @766–830 |
| mid | actbar @724–810 (nav `bn-hidden`, off-screen @860) |
| bottom | actbar @680–766 |
| first-visit top | cookie-banner @576–764 (nav gizli) |

Örtüşme yok, console temiz, desktop regresyon yok.
SS: `tarif-detay-v1-390-once.png` (3 katman) · `-390-sonra.png` · `-390-firstvisit-cookie.png` (cookie tek, nav yok) · `-390-midscroll-actbar.png` · `-1440-sonra.png`.

---

## 2. KANONİK PATTERN — 20 sayfaya yayıldı (🟡 first-visit cookie+nav)

**Bulgu:** 20 sayfanın tamamında ilk ziyarette (consent verilmemiş) çerez banner'ı (z95, @576–764) + bottom-nav (@766–830) **2 ayrı sabit alt katman** birlikte görünüyor (bitişik, alt ~254px). Kural: "ekranda en fazla 1 sabit alt katman". Post-consent durumda zaten tek katman (sadece bottom-nav) — temiz.

**Düzeltme:** Aynı `.bn-hidden` CSS + alt-katman-yöneticisi + çerez show/dismiss hook'ları **codemod ile 20 sayfaya birebir** uygulandı (`__bottomStrips=[]` → bu sayfalarda sadece çerez-bağımlı gizleme, scroll-hide yok; davranış değişmiyor, sadece consent anında nav gizlenir). Her replace tek-eşleşme assert'i ile (anomalide abort). Sonuç: **ALL 20 PATCHED**.

**Kanıt:** 20/20 sayfada first-visit top → tek katman `cookie-banner`; post-consent → tek katman `bottom-nav`; console temiz; yatay taşma yok.

---

## 3. SABİT-ALT-KATMAN KARAR NOTU (kılavuza)

- **Kural:** Bir mobil ekranda en fazla **1 sabit alt şerit** görünür.
- **Öncelik:** Çerez onayı (geçici, en üst) > sayfanın kendi aksiyon şeridi > global bottom-nav.
- **Mekanizma (tüm sitede aynı class/JS):** `.bottom-nav.bn-hidden` (translateY ile gizle, .26s) + `window.__bnUpdate` yöneticisi. Sayfanın şeridi varsa `window.__bottomStrips=['#selector']` ile kaydedilir; o şerit `.show` iken nav gizlenir. Şerit olan sayfada nav ayrıca scroll-down'da gizlenir (threshold 12px, tepe<80px'de görünür).
- **Şerit vs nav çakışması:** Aksiyon şeridi kalır (öncelikli), global nav ona feda olur — birleştirme yapılmadı (şeritler 3 butonlu, tam genişlik; birleştirme tasarım dilini bozardı).
- **Çerez:** Açıkken hem nav hem şerit bastırılır; sadece onay görünür (consent gate). Dismiss sonrası normal davranış.

---

## 4. SAYFA × SEVERITY × BULGU × DÜZELTME

| Sayfa | Severity | Bulgu | Düzeltme |
|---|---|---|---|
| tarif-detay-v1 | 🔴 | 3 sabit alt katman yığılması (actbar+cookie+nav), 38–84px örtüşme | nav scroll/şerit/cookie-bağımlı gizleme + actbar cookie-suppress |
| (20 sayfa) | 🟡 | first-visit cookie+nav 2 katman | codemod: nav çerez açıkken gizlenir |
| haftalik-menu-v1 | 🟢 (FP) | `wk-mealcol`/`wk-corner` sticky tablo hücreleri nav bölgesiyle z-kesişiyor | gerçek sorun değil: z2 < nav z90, içerik akışı; düzeltme yok |
| hesabim-v1 | 🟡 (kabul) | `btn-danger` "Hesabı Sil" = 38px (<40) | DEĞİŞTİRİLMEDİ — tasarımın `.btn` tabanı ~38px; tek butonu büyütmek dil tutarsızlığı (kapsam dışı) |
| tüm shop sayfaları | 🟢 | `add-bar`/`pd-buy`/`menu-bar`/`dlp-bar` inline (fixed değil); `.dolap` geçici modal bottom-sheet | sorun yok |

**Yatay taşma:** Hiçbir sayfada `scrollWidth > viewport` YOK. overflowX listesinde çıkanlar yalnız (a) off-canvas drawer/mega/cart-dd panelleri, (b) yatay scroll-rail carousel kartları — kasıtlı, sayfa yatay scroll üretmiyor.

---

## 5. FIXED ELEMAN ENVANTERİ (özet)

Tüm sayfalarda ortak sabit katmanlar: `topbar`(z70), `header`(z60), `drawer/overlay`(z95/96 — kapalıyken off-canvas), `feedback-tab`(z55, mobilde gizli), `cookie-banner`(z95), `bottom-nav`(z90). tarif-detay ek: `actbar`(z88), lightbox/video-modal/cookmode (overlay, z99–101). Mobilde dip bölgede (rect.bottom>700) eşzamanlı görünür **fixed** şerit sayısı: düzeltme sonrası **≤1** (her state, her sayfa).

---

## 6. DEĞİŞEN DOSYALAR (21)

`tarif-detay-v1.html` (elle: CSS + actbar + manager + cookie hook) ·
codemod (CSS `.bn-hidden` + manager + cookie show/dismiss hook):
`anasayfa-portal-v3a, tarif-liste-v1, tarif-ekle-v1, tarif-bulucu-v1, bugun-ne-pisirsem-v1, kategori-v1, koleksiyon-v1, gunun-menusu-v1, haftalik-menu-v1, alisveris-listesi-v1, video-mutfagi-v1, mutfak-defteri-v1, hesabim-v1, bildirimler-v1, siparislerim-v1, dada-shop-v1, urun-liste-v1, urun-detay-v1, sepet-v1, odeme-v1`.

Araç dosyaları (commit dışı): `.ss-scratch/revize2/mobil1/tool/{audit,analyze,codemod,moneyshot}.js` + `node_modules` (playwright-core).

---

## 7. ÇÖZÜLEMEYEN / TEREDDÜT

- **Headless backdrop-filter:** `actbar` (`backdrop-filter:blur`) headless Chrome'da kompozit edilmiyor → SS'de görünmüyor (gerçek cihazda sorun yok; cookie banner solid bg, SS'de görünüyor). Bu yüzden actbar tek-katman kanıtı **sayısal** (rect/z/örtüşme), SS değil.
- **Transient network:** anasayfa/tarif-ekle/odeme tek seferlik `ERR_INTERNET_DISCONNECTED` (harici CDN font/FA) — sandbox ağ blip'i; tekrar koşuda temiz. Enjekte ettiğim JS'in harici bağımlılığı yok.
- **hesabim btn-danger 38px:** bilinçli bırakıldı (yukarıda).

## 8. DESKTOP REGRESYON

1440×900 örneklem (anasayfa-portal-v3a, tarif-liste, urun-detay, sepet, hesabim, alisveris-listesi): hepsinde tek sabit alt katman = `footer.footer.orange` (z1) — masaüstüne özgü, **mevcut tasarım** (dokunulmadı). `scrollWidth ≤ vw`, örtüşme yok, console temiz. `bottom-nav` masaüstünde `display:none` olduğundan eklediğim `.bn-hidden`/manager **inert** → regresyon yok. SS: `*-1440-sonra.png`.

> Not: masaüstünde `actbar` (centered pill) ile fixed `footer.orange` pre-existing olarak örtüşebiliyor (benim değişikliğim değil, mobil scope dışı) — lead'e bilgi.

---

# 9. TASK #5 — Kanonik bn-hidden pattern'ının yayılımı (34 sayfa)

**Görev:** First-visit'te çerez bandı + bottom-nav = 2 görünür sabit alt katman (Beyar kuralı "en fazla 1" ihlali + task#1'in 21 sayfasıyla tutarsızlık). Çözüm: task#1'deki codemod'u kalan çerez+bottom-nav çifti taşıyan sayfalara uygula.

## Hedef seti
- Çerez+bottom-nav çifti olan **38** sayfa bulundu. Deprecated/arşiv **5** çıkarıldı: `_shell` (sonra tekrar eklendi, aşağıya bak), `anasayfa-portal-v2`, `anasayfa-portal-v3b`, `anasayfa-portal-v3c`, `tarif-detay-v1-headA` → **33** (32 mobil2 sayfası + `kesfet-v1`).
- **+ `_shell.html`** (lead ek talimatı: public sayfa iskeleti / gelecek Blade layout kaynağı — şablon kuralı miras alsın) → **toplam 34**.
- **Muaf (cookie+nav çifti yok):** 6× `dyt-*`, `panel-shell`, `hesaplayici-v1` — dokunulmadı.
- **Hariç (deprecated varyant/arşiv):** `anasayfa-portal-v2/v3b/v3c`, `tarif-detay-v1-headA`. (Promote edilirlerse aynı codemod uygulanır — anchor'lar uyumlu.)

## Uygulama
- Codemod (`tool/codemod.js`) 33 sayfaya çalıştırıldı → **ALL 33 PATCHED** (her sayfada 4 edit, her biri tek-eşleşme assert'li). `_shell.html` ayrı tek-seferlik aynı 4 edit ile → **OK**.
- Tüm hedeflerde `__bottomStrips=[]` (sayfa-özel sabit alt şerit yok) → davranış: yalnız çerez açıkken bottom-nav gizlenir; post-consent normal. Scroll-hide yok (gerek yok).

## Kanıt
- **grep:** 34/34 hedefte `bn-hidden` + `__bnUpdate` mevcut. Disk toplamı **55** sayfa (21+33+_shell).
- **probe (390×844):** 33/33 + _shell → **first-visit top = tek katman `cookie-banner`** (nav gizli); **post-consent = tek katman `bottom-nav`**. 33'ün tamamında post-consent katman taramasında **0 ⚠/🔴/overlap/scrollW** (hiçbir sayfada sayfa-özel sabit alt şerit veya yatay taşma yok — strip register gerekmedi).
- **console:** 34/34 temiz (JS hatası yok).
- **first-visit SS örnekleri:** `giris-v1-390-firstvisit.png` (cookie altta, nav YOK), `kesfet-v1-390-firstvisit.png`, `saglik-hub-v1-390-firstvisit.png`, `sezon-v1-390-firstvisit.png`. Post-consent fullPage: 33× `*-390-sonra.png`.
- **1440 regresyon:** `kesfet-v1`, `saglik-hub-v1` → tek katman `footer.orange` (z1, mevcut tasarım), console temiz, taşma yok → regresyon yok. SS: `*-1440-sonra.png`.

## Not
- `kesfet-v1`: lead düzenleme yetkisi verdi (Task #3 tamam, kesfet ajanına haber verildi). SADECE codemod dokunuşu (bn-hidden/cookie hook/manager); kurgu/içerik değişmedi.
- Bağımsız doğrulama Task #6 mobil2'ye düşüyor.
