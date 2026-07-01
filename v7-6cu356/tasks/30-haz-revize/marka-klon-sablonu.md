# Marka-Klon Reçetesi — Diet Pilotundan Kilitlenen Kabuk Sistemi

> Bu dosya `marka-kabuk-sablonu.md`'yi (Gastro pilot çıktısı) **renk + videolu hero + tam kabuk**
> katmanıyla genişletir. Diet pilotu (`saglik-hub-v1.html`) tek sayfada kanıtlandı, burada kilitlendi.
> 4 marka yayılımında (Diet kalan sayfalar → Fit → Gourmet → Campus) bu reçete uygulanır.
> Referans kanonik kaynak: **`tarif-liste-v1.html`** (Gastro kabuğu).

---

## §HERO (Adım 1 — kilitli)

- **Full-viewport videolu hero** (100vh/svh, Gastro `.hero-v`/`.sh-top` kompozisyonu).
- **Optimize video standardı:** poster-first paint (local poster CSS bg + attr) · lazy IntersectionObserver
  (viewport'a girince yükle) · mobil statik poster (video HİÇ yüklenmez) · reduced-motion + Save-Data fallback ·
  WebM+H.264 (Store hariç). Asset git-tracked (`.gitignore` negatif-pattern), <3MB.
- **Hero içerik hizası:** hero `.wrap` header `.wrap` ile aynı sol kenarda BAŞLAMALI. ⚠️ TUZAK: hero section
  `display:flex` ise (dikey ortalama), içteki `.wrap` flex-item olarak max-width'e ulaşamaz, içeriğe büzülür →
  ~30px sağa kayar. **Fix:** `.<hero> .wrap{width:100%}` → flex-item tam genişler, max-width uygulanır,
  sol kenar = header logo x. (Kanıt: computed hero-H1.left == header-logo.left @1440.)

## §RENK (Adım 2 — kilitli)

- **Accent token swap:** marka aksanı `var(--tomato)` (isim legacy) değerini marka rengine çevir; token-akışlı
  tüm `var(--tomato*/green/c-mint)` referansları otomatik döner. Diet=nane `#3BB77E` (+ `#6cca98`).
- **KANONİK KALAN (değişmez):** koyu panel `#211E16`/`#161310` · cream `#EFE5D3` · `--ink`/`--slate`. Footer dark.
- **Stray literal denetimi:** token'dan geçmeyen hardcoded `rgba(...)` accent'leri (border/bg) marka rengine çevir.
  **Store literalleri KANONİK** (DadaStore = domates `#e14827`, `.tb-world-store`/`.dw-store` dokunma). Kanıt:
  computed stray tomato = 0 (store orphan hariç).
- **Rating `--yellow:#FAC045`** = yasak-sarı istisnası, BİLİNÇLİ bırak (evrensel rating sarısı, 4 marka sabit).

---

## §KABUK (Adım 3 — kilitli, Diet pilotunda kanıtlandı)

> **Yaklaşım (Varyant A):** re-skin — ayrı mint/marka kabuğuna Gastro kabuk bileşenlerini enjekte et.
> Her bileşen tek dosyaya (hub sayfası) enjekte edilir; QA computed-kanıt temelli.

### 1. Switcher band (5-marka)
- `tarif-liste-v1`'den **byte-kanonik** klon: `.bs-<marka>` aktif (`is-active` + `aria-current="page"`, kendi hub
  href'i), diğer 4 ikon-only + hover kendi rengi. Band DOM byte-diff kanonikten = **aktif-state+href hariç 0**.
- Eski üst-bant (`.tb-world-*` world-pill'leri, `.tb-back` "DadaMutfak'a dön" geri-link) **KALDIR** — geri dönüş
  artık banttaki DadaGastro pill'i (tüm dünyalar aynı seviye). Eski `tb-div-worlds` kalıntısı OLMAZ.
- **⚠️ KRİTİK TUZAK (Diet dersi):** Band CSS'inde `.bs-gastro{--bs-c:var(--tomato)...}` kanoniktir; ama **sayfa
  `--tomato`'yu marka aksanına (mint vb.) swap'lamışsa** var(--tomato) Gastro pill'ini yanlış renkte render eder.
  **Çözüm:** `.bs-gastro --bs-c` = LİTERAL `#E14827` (var DEĞİL). Diğer pill'ler (fit/gourmet/campus) page-bağımsız
  token (`--c-green/purple/petrol`) kullandığı için dokunma; aktif marka `--c-<marka>-deep` (Diet `--c-mint-deep:#3BB77E`).
- **CSS enjeksiyonu:** brand-switch + bs-item + bs-name + states + per-brand token bloğu + eksik `--c-<marka>-deep`.
- **Üst bant sol stat:** sosyal ikonların solunda marka istatistiği (Gastro "🍴 48.200+ tarif" paritesi) —
  marka ikonu + marka rengi (`var(--tomato)` = marka aksanı) + sayfadaki gerçek veriden metin. Mobilde topbar zaten gizli.

### 2. Marka-özel footer
- Gastro terimlerini marka diline çevir: **Şef Ol→Diyetisyen Ol** · **Şefler→Diyetisyenler** · Ölçü Birimleri→marka
  modülü (Diet: Besin Değerleri). İlk kolon = marka modülleri.
- **Perde mekaniği ORTAK** (çoğu hub'da zaten var): `.footer.orange{position:fixed;z-index:1}` + `.page-main{z-index:2}`
  + JS `main.style.marginBottom=footer.offsetHeight` (`#pageMain`+`.footer` varsa). Snap-tuzağı yok.
- İmza **© 2026 Dada\<Marka\>** + `</> GaviaWorks`. app bloğu (href=# placeholder).

### 3. Nav (docx marka menüsü)
- `dada-revize.md`'deki marka nav'ı (Diet: Hesaplayıcılar·Besin Değerleri·Beslenme Rehberi·Programlar·Testler·Diyetisyenler).
  Header + drawer **tutarlı** (aynı öğeler, drawer ikonlu).
- **Dada Store nav'da YOK** (Store yalnız Gastro'dan erişilir).
- **⚠️ Henüz üretilmemiş modül** (Diet: Beslenme Rehberi) → nav'da `href="#"` **placeholder** + raporda AÇIKÇA
  "X henüz yok, faz Y'de bağlanacak" (sessiz 404 YASAK, CLAUDE.md kuralı).

### 4. Mentor FAB
- **Sol-alt floating** (`left:24px;bottom:24px`), scroll-top ile çakışmaz (o sağ-alt). Başlangıç `mini` pill, tıkla→expand morph.
- **Gövde KOYU sabit** (`--d-deep #161310`/`--slate` kanonik) + **aksan MARKA rengi**: `--tomato`(=marka) mp-av/mp-tag i,
  `--tomato-rgb` = **marka rgb** (Diet `59,183,126`) atmos/av glow. (S5: gövde koyu, aksan markaya selam verir.)
- **Mentor token bloğu enjekte:** `--d-deep/--d-3/--dline/--r-md/--r-lg/--r-xl/--r-circle/--ease-spring/--tomato-rgb/`
  `--sh-3/--panel-fl` + `--b-<marka>`/`.w-<marka>` yardımcıları.
- **İçerik (Kural A/B/C):** kimlik SABİT (MENTOR/`fa-comment-dots` + DadaMentor lockup + çevrimiçi + `fa-compass`).
  `mp-chat` = 3 çocuk (id+bubble+tek mp-row ≤6 çip). Çipler: (a) marka modül kısayolu (b) **cross-brand köprü**
  (Diet→Gastro; köprü çipi = sadece marka adı `.w-<hedef>`, cümle YOK). **mp-chat ≤270px tavan**, **çip ≤16char**.
- Mentor video `mentor-panel.mp4` gitignore'lu → canlıda atmos gradient (marka rengi) fallback.

### 5. Scroll-top FAB
- **Sağ-alt** (`right:22px`), `var(--tomato)` = marka aksanı (Diet nane). scrollY eşiği, dipte gizle.

### 6. Reveal (Gastro dersi — kritik)
- CSS `html.reveal-ready .reveal{opacity:0}` + `.reveal.in{opacity:1}` (FOUC-guard). JS IO `classList.add('in')`
  — **`'revealed'` DEĞİL `'in'`** (yanlış class → başlık opacity:0 kalır, console/taşma VERMEZ, görsel-only defekt).
- `.reveal` class'ını `.sec-head`'lere ekle. Kanıt: scroll sonrası başlık computed `opacity>0`.

### 7. Tipografi — marka diline saygı (Diet sapması, kilitli kural)
- Gastro band pill/lockup **Gilroy `.bd`=800/`.sf`=300 split** kullanır. **Marka kendi tipografi dilindeyse
  (sistem-font, uniform-weight, renk-ayrımlı lockup — Diet `.dd-word` gibi) Gilroy split ZORUNLU DEĞİL.**
  Band pill isimlerine `.bd/.sf` CSS + Gilroy font enjekte etme; span'ler `.bs-item` ağırlığını (800 uniform) miras alır,
  markanın kendi diliyle tutarlı olur. Sadece band için 2 font yüklemek yerine marka bütünlüğünü koru.
  (Diet kararı: band pill uniform-weight, Gastro split taşınmadı — bilinçli sapma.)

### §KABUK Self-QA (computed-kanıt, GATE 3 kapısı)
- Band: DOM byte-diff=0 (aktif hariç); `.bs-<marka>` `--bs-c`=marka, `.bs-gastro` `--bs-c`=`#E14827` literal.
- Footer: marka terimleri var + Gastro sızıntı yok + perde `position:fixed` + `© 2026 Dada<Marka>`.
- Nav: docx öğe sayısı; üretilmemiş modül `#` placeholder (raporla); Dada Store yok.
- Mentor: sol-alt; gövde koyu + aksan marka; `mp-chat ≤272px`; çip ≤16char; cross-brand köprü çipi var.
- Scroll-top: sağ-alt + marka renk. Reveal: `.reveal.in` opacity>0.
- Genel: console 0 · yatay taşma 0 (@1440+390) · cream `#EFE5D3` bg-sızıntı 0 · dead-link 0 (# placeholder hariç).

### ⛔ GATE 3 çıktısı: REÇETE KİLİTLİ → kalan marka sayfalarına yayılım (ayrı dalga).
