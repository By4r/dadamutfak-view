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
| **İç menü (nav) standardı — Faz B** | header nav + mobil drawer | Tarifler · Ne Pişirsem · Dolapta Ne Var · **Püf Noktaları** (üst-seviye) · Mutfak Sırları (dropdown: Mutfağa Giriş/Ansiklopedi/Sözlük/Ölçü Birimleri/Sofra Düzeni — **puf YOK**) · **Dada Store** (nav-store, sonda). **Keşfet + Sağlıklı Yaşam KALDIRILIR** (Gourmet/Diet'e taşındı). Mobil drawer aynı + `.d-lbl`+ikon sarmalayıcı. **bottom-nav DOKUNULMAZ** (baseline; Sağlıklı Yaşam orada kalır). | `.nav-store`/`.nav-ico` + `.d-item.d-store .d-lbl` CSS (eski şablonda yok → enjekte et) |

### KURAL A — Panel KİMLİĞİ SABİT (tüm Gastro sayfalarında pilotla BİREBİR)
Aşağıdaki kimlik öğeleri **hiçbir sayfada DEĞİŞMEZ** (pilot `anasayfa-portal-v3a` referans):
- **Üst etiket:** "MENTOR" (`.mp-tag`, 💬 `fa-comment-dots` ikonlu) — değişmez.
- **İsim:** "DadaMentor" (`.bd`Dada bold + `.sf`Mentor ince lockup) — değişmez.
- **Durum metni:** "çevrimiçi" (yeşil nokta) — değişmez. ("Gastro asistanın" gibi varyasyon **YASAK**.)
- **Avatar/logo:** pusula `fa-compass` (`.mp-av`) — değişmez. (`fa-utensils`/`fa-layer-group` vb. **YASAK**.)
- **Panel iskeleti/boyut/renk/video figür:** sabit.

**SADECE değişen:** `mp-bubble` metni (sayfa bağlamı) + çipler (sayfa modülü, yapı pilot deseninde).

### KURAL B — Panel YÜKSEKLİĞİ: 3 context-aware işlev, SADE sunum (pilot deseni)
3 işlev korunur ama **etiketli grup / ayrı ipucu satırı YOK** — hepsi pilotun düz iskeletine sığar:
1. **(a) Top-modül yönlendirme** — markanın en güçlü modüllerine kısayol çipleri.
2. **(b) Cross-brand köprü** — diğer dünyalara bağlam köprüsü; çip rengi = hedef markanın `.w-*` rengi.
   **Köprü KORUNDU ama max 2 çip** (pilot: Diet + Fit). 3. köprü gerekiyorsa düşer (çip bütçesi 6).
3. **(c) Bağlam-duyarlı ipucu** — **`mp-bubble` metnine gömülür** (ör. "Yeni misin? Ne Pişirsem ile başla?").
   **Ayrı `.mp-hint` satırı YOK** (yüzü kapatıyordu — pilotta kaldırıldı).

**mp-chat KANONİK İSKELET (zorunlu, sayfaya göre DEĞİŞMEZ):** tam **3 çocuk** →
`mp-id` + `mp-bubble` (sayfa-özel metin, ipucu gömülü) + **tek** `mp-row` (**≤6 çip**: 4 modül + max 2 köprü,
köprü son sırada `.w-*` renkli). `.mp-grp` etiketleri ("HIZLI BAŞLA"/"BAŞKA DÜNYALARA KÖPRÜ") ve `.mp-hint`
KULLANILMAZ. Sayfaya göre **değişen** = bubble metni + çip seti/etiketleri; **sabit** = 3 satır yapısı + ≤6 çip.

**KURAL C — çip metni KISA:** Her çip etiketi **1-2 kelime, ideal ≤16 karakter**. Cümle/uzun ifade çipe
KONMAZ (soru/bağlam zaten `mp-bubble`'da). **Köprü çipi = yalnız marka adı** (ör. "DadaFit'te dengele" → "DadaFit",
"DadaDiet ile hedefe uygun" → "DadaDiet"). Çip = kısa aksiyon veya marka adı.

> **≤270px bir TAVAN, hedef DEĞİL.** İçeriği azsa (az çip/kısa bubble) panel pilotun ALTINDA kalabilir — sorun
> yok, daha kısa dursun. **"270'e tamamla" diye dolgu çip/içerik EKLEME.** Az içerik = kısa panel; çok içerik =
> en fazla 270, asla aşma. Tek koşul: pilotu aşmamak + yüz açık kalmak.

> **Figür çerçeveleme kuralı (ölçülebilir eşik):** Panel hub-boyutunda (`min(72vh,540px)`). Yüz açık kalsın
> diye figür `transform:translateY(-18%)` ile yukarı kaydırılır (object-position vertical ETKİSİZ — video kutuya
> göre yatay taşıyor). `.mp-chat` alta yaslı (`justify-content:flex-end`) → içerik büyürse üst kenar yükselir ve
> yüzü kapatır. **EŞİK (TAVAN): `.mp-chat` yüksekliği ≤ 270px / üst kenar panel tepesinden ≥ %49 (chatTop ≥
> ~267px) @1440 — PİLOT REFERANS.** İçerik azsa altında kalması serbest. Teknik kilit (her sayfada):
> `.mentor-panel.floating .mp-chat{max-height:272px}`.
> Mini'de `.mp-media` gizli → transform etkisiz.

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
| **Asistan (c) ipucu (bubble'a gömülü)** | "Yeni misin? Ne Pişirsem ile başla?" | marka-özel | marka-özel | marka-özel | marka-özel |
| **Footer app başlık** | "DadaGastro'yu indir" | "DadaDiet'i indir" | … | … | … |

### Asistan cross-brand köprü matrisi (b) — kaynak markadan **max 2** dünyaya
Çip bütçesi 6 = 4 modül + **max 2 köprü** (çip rengi = hedef markanın `.w-*` rengi). Köprü 1+2 KULLANILIR;
**Köprü 3 = yedek** (yalnız modül sayısı 4'ten azsa veya bütçe izin verirse; aksi halde DÜŞER).
> Tablodaki ifadeler **niyet/hedef**; görünür **çip etiketi = sadece marka adı** (Kural C, ör. "DadaFit").

| Kaynak | Köprü 1 (zorunlu) | Köprü 2 (zorunlu) | Köprü 3 (yedek/düşer) |
|---|---|---|---|
| **Gastro** | DadaFit'te dengele (`dadafit-hub`) | DadaDiet ile hedefe uygun (`saglik-hub`) | ~~DadaGourmet (`kesfet`)~~ düşer |
| **Diet** | DadaGastro'da tarif | DadaFit ile hareket | ~~DadaGourmet~~ |
| **Fit** | DadaGastro'da besle | DadaDiet ile planla | ~~DadaCampus~~ |
| **Gourmet** | DadaGastro'da pişir | DadaDiet | ~~DadaFit~~ |
| **Campus** | DadaGastro | DadaFit | ~~DadaDiet~~ |

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
- [ ] **Asistan KİMLİĞİ (Kural A) pilotla birebir:** MENTOR etiketi (`fa-comment-dots`) + DadaMentor lockup (`.bd`/`.sf`) + durum "çevrimiçi" + avatar pusula `fa-compass`. Sapma YOK ("Gastro asistanın"/`fa-utensils`/`fa-layer-group` vb. yasak).
- [ ] **Asistan YÜKSEKLİĞİ (Kural B):** video figür yüz açık (`translateY`). **mp-chat = 3 çocuk** (id + bubble + tek mp-row ≤6 çip); (a) modül + (b) köprü **max 2 çip** (son sırada `.w-*`) tek satırda; (c) ipucu **bubble'a gömülü** (`.mp-hint` YOK); `.mp-grp` YOK. **≤270px TAVAN** (azsa kısa serbest, dolgu ekleme). CSS kilit `max-height:272px`. **(Kural C) çip etiketi 1-2 kelime ≤16 char; köprü çipi = sadece marka adı; cümle YOK.**
- [ ] FAB konumları: asistan **sol-alt**, scroll-top **sağ-alt** (+ varsa modül-FAB sağ-altta istif). Çakışma yok.
- [ ] Reveal: `.sec-head`'lere `.reveal`, FOUC-guard, reduced-motion'da içerik görünür. (Not: bazı sayfalarda `.sec-head` markup yok → reveal no-op kalır, zararsız.)
- [ ] **İç menü (Faz B) hizalandı:** header+drawer'da Keşfet & Sağlıklı Yaşam KALDIRILDI; Püf Noktaları üst-seviye; Mutfak Sırları dropdown/d-sub'ında puf YOK; Dada Store eklendi (header `.nav-store`, drawer `.d-store`); drawer öğeleri `.d-lbl`+ikon; **bottom-nav baseline (dokunulmaz)**; `.nav-store`/`.nav-ico`/`.d-store` CSS taşındı. Arama butonu `brand=` değeri pilotla aynı bırakılır (toplu metin fazına).
- [ ] **Mentor panel ölçümü:** panel aç (`floating`, `mini` kaldır) → `.mp-chat` yüksekliği **≤ 270px tavan** (@1440; azsa altında serbest) + figür yüzü açık + kimlik öğeleri pilotla aynı (MENTOR/DadaMentor/çevrimiçi/pusula). Pilot referans 270px.
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
