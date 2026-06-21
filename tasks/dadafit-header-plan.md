# DadaFit — Kendi Header'ı (Alt-Marka Kimliği) · PLAN

> Durum: **PLAN — onay bekliyor, implement YOK.** frontend-design skill aktif.
> Hedef: DadaFit'i DadaStore/DadaAkademi seviyesinde tam alt-marka dünyasına
> çıkarmak — kendi header kimliği, kendi mark'ı, kendi nav'ı. _shell ekosistemi
> İÇİNDE kalır; DadaMutfak köprüsü + global erişim korunur (K2 uyumlu).

---

## 1. Araştırma bulguları (kilit gerçekler)

### DadaStore & DadaAkademi pattern'i (ZATEN KURULU — replicate edilecek)
- Her ikisi de **kendi tam `<header>`'ına** sahip — DadaMutfak global mega-nav'ını
  KULLANMIYOR. Pattern birebir paralel:
  - **topbar** (40px, fixed): solda `← DadaMutfak'a dön` + modül promo, sağda dil seçici.
    ⚠️ **worlds kuşağı (Store·Akademi·Fit) YOK** — köprü sadece "dön" linki.
    (akademi-v1.html satır 973 yorumu: *"AKADEMİ KABUĞU — ana site topbar'ından sapar; dada-shop paraleli"*)
  - **header** (72px, fixed): solda `.brand` = **özel SVG mark + wordmark** ("Dada**Store**"
    domates / "Dada**Akademi**" petrol), ortada 5 modül nav öğesi (+ dropdown), sağda aksiyonlar.
  - **Token recolor:** tek `--tomato` değişkeni modül aksanına çevriliyor (Store domates
    `#e14827`, Akademi petrol `#006072`); tüm hover/buton/aksan o değişkenden miras alıyor.
  - Drawer + bottom-nav header'ın kardeşi (içinde değil).
- **Bileşen sistemi YOK** — her sayfa header'ı tam inline kopyalıyor (`_shell.html` şablon
  referans ama partial değil). Yani DadaFit de inline kuracak; ileride kopyalanacak.

### DadaFit hub'ın MEVCUT hibrit durumu (dadafit-hub-v1.html)
- **topbar** = ana-site topbar'ı: **worlds kuşağı VAR** (DadaStore·DadaAkademi·DadaFit,
  satır 1206-1209, DadaFit = `.tb-world-fit` ⚡`fa-bolt` yeşil) + sosyal + dil (satır 1212).
- **header** = **DadaMutfak global mega-header'ı** (satır 1226+): `logo-official.png`
  ("DadaMutfak" logosu) + tam tarif mega-nav'ı (Tarifler/Ne Pişirsem/Dolapta Ne Var/
  Keşfet/Sağlıklı Yaşam).
- **+ ayrıca** header altı **yapışkan DadaFit alt-nav bandı** (satır 1576-1587, `top:112px`,
  `.df-subnav`): `⚡ DadaFit` + Hareket Merkezi · Egzersizler · Programlar · Challenge · Antrenörler.
- **Sonuç = REDUNDANS:** DadaFit kimliği İKİ yerde (worlds kuşağı + subnav brand); ayrıca
  DadaMutfak mega-nav'ı + DadaFit bandı üst üste = 40+72+54 = **166px chrome**.

### Token'lar (zaten tanımlı, dadafit-hub içinde)
```
--fit:#009d4f;      /* aksan (Pantone 7482 C) */
--fit-deep:#007a3d; /* hover / gradient ucu */
--fit-bright:#34c47e/#3fd089; /* koyu zeminde okunur metin */
```

---

## 2. Hedef yapı (NE değişiyor)

DadaFit hub'ın chrome'u Store/Akademi pattern'ine taşınır:

```
ESKİ (166px):  topbar[worlds+sosyal+dil]
               header[DadaMutfak logo + tarif mega-nav]
               df-subnav[⚡DadaFit + 5 bölüm]   ← ayrı yapışkan bant

YENİ (112px):  topbar[← DadaMutfak'a dön + worlds(opsiyon) + dil]
               header[⚡DadaFit mark + 5 bölüm nav + aksiyonlar]   ← bant header'a YÜKSELDİ
```

**Kazanç:** redundans gider (DadaFit tek yerde), DadaMutfak tarif mega-nav'ı kalkar
(Store/Akademi gibi → sub-brand tanımı bu), 54px chrome tasarrufu, DadaFit gerçek alt-marka.

### 2a. DadaFit header iskeleti (planlanan)
```
<header class="header df-header">           <!-- --tomato override = #009d4f -->
  <div class="h-top"><div class="wrap">
    <a class="brand fit-brand" href="dadafit-hub-v1.html">
       <svg class="fit-mark">⚡ rounded badge</svg>
       <span class="fit-word"><b>Dada</b><span class="ft">Fit</span></span>
    </a>
    <nav class="nav">
       Hareket Merkezi(active) · Egzersizler[▾dropdown: vücut bölgesi/ekipman] ·
       Programlar · Challenge · Antrenörler
    </nav>
    <div class="head-actions">  arama · [Pro'ya Yükselt pill] · giriş/avatar · hamburger  </div>
  </div></div>
</header>
+ drawer (mobil) + bottom-nav (mobil) — Store/Akademi paraleli, DadaFit nav'ıyla
```

### 2b. Köprü & global erişim (K2 — ZORUNLU korunur)
- topbar = **Store/Akademi birebir** (KARAR): solda **`← DadaMutfak'a dön`** + DadaFit promo
  (örn. "Kişiye özel hareket programları" / challenge teaser, K7 denge tonu), sağda dil seçici.
  **worlds kuşağı KALDIRILIR** (Store/Akademi'de de yok → tutarlı).
- `.fit-brand` logo → `dadafit-hub-v1.html` (DadaFit ana), DadaMutfak logosu DEĞİL.
- Köprü = "DadaMutfak'a dön" linki (topbar + drawer footer). DadaFit içinden Store/Akademi'ye
  geçiş, Store/Akademi'deki gibi DadaMutfak üzerinden (sub-brand pattern'i birebir).

---

## 3. Dosya etkisi
- **Değişen:** yalnız `v6/dadafit-hub-v1.html` (tek DadaFit sayfası).
  - header bloğu (satır ~1226+) → DadaFit header'ıyla değiştirilir.
  - `.df-subnav` bandı (HTML 1576-1587 + CSS 1026-1036) **kaldırılır** (header'a eridi).
  - `--tomato` (veya scoped `.df-header`) `#009d4f`'e set; drawer/bottom-nav DadaFit'e.
  - `scroll-padding-top` 166→112px güncellenir.
- **Yeni (doküman):** bu plan onaylanınca `tasks/`'a **"DadaFit header bloğu"** snippet'i
  + yerleştirme notu (ileride Egzersizler/Programlar sayfaları kopyalasın diye).
- **Yayılım YOK:** diğer ~93 dosya bu turda dokunulmaz (ayrı iş).

---

## 4. frontend-design uygulaması
- Mark: Store SVG-bag / Akademi SVG-mortarboard ailesine uyumlu **SVG rounded-badge** treatment
  (FA glyph yerine), `#009d4f` dolgu — atletik ama K7 "denge tonu" (agresif gym dumbbell DEĞİL).
- Wordmark: "Dada" ink/slate + "Fit" yeşil; Gilroy, Store/Akademi ağırlıklarıyla aynı.
- Aktif öğe alt-çizgi `#009d4f` 3px (mevcut subnav dilinden devralınır).
- Render QA: 1440 + 390 TAM SAYFA SS, 0 yatay taşma, self-verify yazılı rapor (CLAUDE.md kuralı).

---

## 5. Kilitli kararlar (Beyar 2026-06-16 ✅)
- **Q1 Topbar:** Store/Akademi **birebir sade "dön" topbar** — worlds kuşağı KALDIRILDI.
- **Q2 Mark:** şimşek ⚡ korunur, **SVG rounded-badge**'e yükseltilir (Store-bag/Akademi-mortarboard ailesi).
- **Q3 Mega-nav:** DadaMutfak tarif mega-nav'ı **tamamen kalkar** (saf sub-brand tanımı).
- **Q4 Kapsam:** **yalnız hub** (`dadafit-hub-v1.html`) + `tasks/`'a yeniden-kullanım dokümanı; paylaşılan dosya YOK.

> Onay sonrası: implement → render SS (1440/390) → self-verify yazılı rapor → handoff.
