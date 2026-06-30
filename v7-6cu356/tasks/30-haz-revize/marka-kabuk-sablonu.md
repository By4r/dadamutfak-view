# Marka Kabuk Şablonu — Gastro Pilotundan Çıkan Yayılım Kılavuzu

> **Bu dokümanın amacı:** Gastro pilotu (`anasayfa-portal-v3a.html`) üzerinde oturtulan marka-kabuk
> bileşenlerini, 4 markaya (Fit / Gourmet / Campus / Diet) ve Gastro alt sayfalarına yaymak için
> **yeniden-kullanılabilir (sabit)** vs **marka-özel (değişken)** ayrımını netleştirmek + matris + kontrol listesi.
> Kaynak pilot: `v7-6cu356/anasayfa-portal-v3a.html` (session 6, 30-haz-revize turu).

---

## 1. Reusable (sabit) bileşenler — markadan markaya YAPISI değişmez

| Bileşen | Konum | Yapı (sabit) | Not |
|---|---|---|---|
| **Marka switcher** (siyah üst bant) | header üstü | 5 marka: aktif başlık-açık + bold, diğer 4 ikon-only+hover; pusula YOK, store YOK | `.brand-switch` / `.bs-item` |
| **Marka lockup tipografisi** | her yerde | "Dada" = **GilroyXB ExtraBold** (`.bd`) · suffix = **GilroyLt Light** (`.sf`) | gerçek font dosyaları (sentetik değil) |
| **Header lockup** | header sol | tomato yuvarlak rozet (modül ikonu) + `.bd`Dada`.sf`Suffix; at-top beyaz / scroll koyu | `.brand` / `.brand-mark` / `.brand-word` |
| **Marka footer iskeleti** | sayfa sonu | lockup + tagline + sosyal · 3 link kolonu · app bloğu (App Store/Google Play, href=#) · legal bar · imza `© 2026 DadaX · Bir Dadaİstanbul ürünüdür` + `</> GaviaWorks` | `.footer.orange` perde-reveal (fixed bottom, page-main üstten kayar) |
| **Perde-reveal (curtain)** | footer | footer `position:fixed;z-index:1`, `#pageMain` `margin-bottom = footer.offsetHeight` (JS dinamik ölçer) | snap-tuzağına dikkat: footer'da `scroll-snap-align` YOK |
| **Asistan paneli (DadaMentor port)** | sol-alt floating | koyu panel + video figür + "MENTOR" başlık + DadaMentor kimliği + FAB↔panel morph (mini pill ↔ floating) + collapse/expand + footer-hide | `.mentor-panel.floating/.mini` · hub `dadamentor-v3.html`'den birebir kabuk |
| **Reveal sistemi** | section intro'ları | `.reveal` (opacity/translateY) + IntersectionObserver + `html.reveal-ready` FOUC-guard; reduced-motion'da kapalı | yalnız `.sec-head` (restraint — her öğe DEĞİL) |
| **Scroll-top FAB** | sağ-alt | beyaz/ikincil daire, yg-fab üstüne istiflenir; scrollY>620 göster, dipte gizle | `.to-top` · K7: assistant sol-alt + scroll-top sağ-alt |

### Asistan panelinin 3 context-aware işlevi (sabit konsept, içerik marka-özel)
1. **(a) Top-modül yönlendirme** — markanın kendi en güçlü modüllerine kısayol çipleri ("Hızlı başla" grubu).
2. **(b) Cross-brand köprü** — diğer 3 dünyaya bağlam köprüsü ("Başka dünyalara köprü" grubu; çip renkleri = hedef markanın kanonik rengi `.w-*`). **Köprü pilot kararıyla KORUNDU** → her markada bu grup olacak.
3. **(c) Bağlam-duyarlı bilgilendirme** — sayfaya özel tek-satır ipucu (`.mp-hint`, ör. "Yeni misin? X ile başla").

> **Figür çerçeveleme kuralı:** Panel hub-boyutunda (`min(72vh,540px)`), çip UI'ı dokunulmaz. Yüz açık kalsın
> diye figür video'su `transform:translateY(-18%)` ile yukarı kaydırılır (object-position vertical ETKİSİZ —
> video kutuya göre yatay taşıyor). Mini'de `.mp-media` gizli → transform etkisiz.

---

## 2. Marka-özel (değişken) — her markada DEĞİŞEN

| Eksen | Gastro (pilot) | Diet | Fit | Gourmet | Campus |
|---|---|---|---|---|---|
| **Kanonik renk** | domates `#E14827` | nane `#3BB77E` | yeşil `#009d4f` | mor `#b14fc5` | petrol `#006072` |
| **Modül ikonu** | `fa-utensils` | `fa-leaf` | `fa-dumbbell` | `fa-map-location-dot` | `fa-graduation-cap` |
| **Switcher aktif** | bs-gastro | bs-diet | bs-fit | bs-gourmet | bs-campus |
| **Header/footer lockup** | DadaGastro | DadaDiet | DadaFit | DadaGourmet | DadaCampus |
| **Footer kolonları** | Keşfet&Pişir / Topluluk / Kurumsal | (Diet modülleri) | (Fit modülleri) | (Gourmet) | (Campus) |
| **Asistan (a) modülleri** | Ne pişirsem / Dolapta ne var / Haftalık menü / Tarif ekle | (Enerji defteri / Hesaplayıcılar / Beslenme rehberi …) | (Antrenör bul / Hareket rehberi / Challenge …) | (Lezzet rotası / Mekan öner …) | (Kurslar / Sertifika …) |
| **Asistan (c) ipucu** | "Yeni misin? Ne Pişirsem ile başla." | marka-özel | marka-özel | marka-özel | marka-özel |
| **Footer app başlık** | "DadaGastro'yu indir" | "DadaDiet'i indir" | … | … | … |

### Asistan cross-brand köprü matrisi (b) — kaynak markadan diğer 3'e
Her marka, KENDİSİ HARİÇ en alakalı 3 dünyaya köprü verir (çip rengi = hedef markanın `.w-*` rengi):

| Kaynak | Köprü 1 | Köprü 2 | Köprü 3 |
|---|---|---|---|
| **Gastro** | DadaFit'te dengele (`dadafit-hub`) | DadaDiet ile hedefe uygun (`saglik-hub`) | DadaGourmet'te mekân (`kesfet`) |
| **Diet** | DadaGastro'da tarif | DadaFit ile hareket | DadaGourmet (öneri) |
| **Fit** | DadaGastro'da besle | DadaDiet ile planla | DadaCampus (öğren) |
| **Gourmet** | DadaGastro'da pişir | DadaDiet | DadaFit | 
| **Campus** | DadaGastro | DadaFit | DadaDiet |

> Hedef sayfalar hub canlı domainlere geçince revize edilecek (şu an local `.html`).

---

## 3. Token / asset bağımlılıkları (yeni sayfaya taşırken eklenmesi gerekenler)

- **Fontlar:** `Gilroy-ExtraBold.otf` (→ `GilroyXB`), `Gilroy-Light.otf` (→ `GilroyLt`), `Gilroy-Medium.ttf` (→ `Gilroy`). `.bd`/`.sf` yardımcı sınıfları.
- **Mentor token'ları** (koyu panel): `--d-deep #161310`, `--d-3 #322D26`, `--dline`, `--ease-spring`, `--tomato-rgb`, `--sh-3`, `--panel-fl`, `--r-md/lg/xl/circle`, 5 dünya `--b-*`/`--b-*-l` + `.w-*` renk sınıfları.
- **Video:** `assets/video/mentor-panel.mp4` (git-tracked, negatif gitignore pattern; diğer mp4'ler ignore'lı).
- **Gaviaworks imza:** `</>` dev-glyph (`.gw-code`, monospace) + "GaviaWorks" (hashtag DEĞİL).

---

## 4. Yayılım kontrol listesi (her yeni marka kabuğu için)

- [ ] Switcher eklendi, **aktif marka** doğru (`is-active` + `aria-current`), kendi rengi.
- [ ] Header lockup: doğru marka adı + `.bd`/`.sf` tipografi + at-top beyaz/scroll koyu + marka rozet ikonu.
- [ ] Tüm görünür "Dada<suffix>" yazıları `.bd`+`.sf` ile sarıldı (header, footer, switcher, asistan adı+çipler, drawer worlds, imza).
- [ ] Footer: marka lockup + 3 kolon (marka modülleri) + app bloğu + legal + imza `© 2026 DadaX · Bir Dadaİstanbul ürünüdür` + `</> GaviaWorks`.
- [ ] Footer perde-reveal çalışıyor (`marginBottom == footer.offsetHeight`, snap-tuzağı yok).
- [ ] Asistan paneli: video figür (yüz açık — `translateY` ayarı), MENTOR kimlik, (a) marka modülleri + (b) cross-brand köprü (3 çip, hedef rengi) + (c) sayfa ipucu; çip UI hub diliyle birebir.
- [ ] FAB konumları: asistan **sol-alt**, scroll-top **sağ-alt** (+ varsa modül-FAB sağ-altta istif). Çakışma yok.
- [ ] Reveal: `.sec-head`'lere `.reveal`, FOUC-guard, reduced-motion'da içerik görünür.
- [ ] Denetim: console 0 · yatay taşma 0 (@1440 + @390) · **cream `#EFE5D3` 0** · giden link/CTA dead-link 0.

---

## 5. Pilotta alınan kilit kararlar (şablona bağlayıcı)

- **K0:** data-brand mutfak→gastro yalnız anasayfada; toplu metin dönüşümü ayrı "Gastro yayılım" fazı.
- **K6:** tüm footerlarda perde-reveal.
- **K7:** assistant sol-alt · scroll-top sağ-alt.
- **Asistan = hub DadaMentor paneli birebir kabuk** (video/figür dahil), içerik marka bağlamı. Sıfırdan özgün panel DEĞİL.
- **Cross-brand köprü KORUNDU** (3 işlevden biri) → şablonda zorunlu.
- **Marka tipografisi:** "Dada" ExtraBold + suffix Light, gerçek Gilroy dosyalarıyla.
- **Gaviaworks imzası:** `</> GaviaWorks` (dev-glyph).

---

## 6. Açık / devam eden notlar

- **Stray "DadaMutfak" metinleri:** Ramazan bandı ("Sofranı DadaMutfak'la kur") + app bandı ("DadaMutfak cebinde")
  hâlâ DadaMutfak diyor — Gastro yayılım fazında DadaGastro'ya çevrilecek (K0: toplu metin dönüşümü ayrı faz).
- **Drawer worlds "DadaAkademi"** vs switcher "DadaCampus" — isim tutarsızlığı (rename mirası); yayılımda tek isme oturt.
- **Mentor video figürü** şu an kadın (hub asset'i); Beyar erkek figür üretince `mentor-panel.mp4` değişecek.
- **CTA/köprü hedefleri** local `.html`; hub canlı domainlere geçince revize.
