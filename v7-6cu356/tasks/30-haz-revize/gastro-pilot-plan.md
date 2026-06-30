# DadaGastro Pilot — Uçtan Uca Plan (30-haz-revize)

> Kaynak: `amac-ve-kapsam.md` (kilitli kararlar) + `dada-revize.md` / `diet-ek.md` / `fit-ek.md`.
> Disiplin: **frontend-design skill ZORUNLU**. Mevcut tasarım sistemi korunur — Gilroy-only ·
> domates `#E14827` · 5 kanonik dünya rengi · token (ham-hex yok) · FA · KREM YASAK.
> **DOKUNULMAZ:** kanonik kabuk (`sa-shell`/`sa-ui`/`panel-shell`) · `dadamentor-v2-a` yedek ·
> Store kabuğu (yalnız back-link METNİ hariç).
> **HENÜZ İMPLEMENT YOK** — bu dosya plan. Beyar annotate + onay → implement.

---

## 0 · PİLOT KAPSAMININ SINIRI (önce bunu netleştir)

**Pilot dosyası = `anasayfa-portal-v3a.html`** (DadaGastro'nun marka giriş/anasayfası). Bu sayfa
şu an `data-brand="mutfak"` ve 160 "mutfak" sayfasıyla aynı generic header/footer'ı paylaşıyor
(footer md5 tüm markalarda aynı).

- Pilot, **şablonu tek sayfada** (anasayfa) oturtur ve doğrular.
- Şablon onaylanınca **iki yönde yayılır:** (1) diğer Gastro alt sayfalarına (tarif-liste, tarif-detay,
  bugun-ne-pisirsem… ~150 "mutfak" sayfası), (2) diğer 4 markaya (Fit/Gourmet/Campus/Diet).
- ⚠️ **BEYAR ONAYI GEREK (K0):** `data-brand="mutfak"` → `"gastro"` dönüşümü pilotta sadece anasayfada
  mı yapılsın, yoksa tüm Gastro sayfalarına aynı turda mı? Öneri: **pilotta yalnız anasayfa**; toplu
  data-brand dönüşümü ayrı "Gastro yayılım" fazında (regresyon riski düşük tutulur).

---

## 1 · SİYAH BANT İKON-SWITCHER (reusable component) — `[BS]`

**Amaç:** 5 marka ikonu (hover'da başlık + kendi marka rengi). **Store BU BANTTA YOK.**
**✅ K1 (KARAR):** Bantta **DadaMentor pusula ikonu YOK** + **hub'a dönüş öğesi YOK** (hub'a footer'dan
ulaşılır). **Aktif marka (Gastro) başlığı KALICI** (ikon+isim görünür), diğer 4 marka ikon-only +
hover'da isim. Tablodaki **DadaMentor/pusula satırı İPTAL**.

**Mevcut pattern referansı:** `anasayfa-portal-v3a.html` satır **1456–1485** — zaten bir
`.topbar > .tb-right > .tb-worlds` var (şu an `tb-world-store` / `tb-world-akademi` / `tb-world-fit`
linkleri). Bu bandın **switcher'ın atası**. Switcher bunun yerine geçer.

**Hub renk/ikon kaynağı** (kanonik, `dadamentor-v3.html` sahne eyebrow'larından doğrulandı):
| Marka | İkon (FA) | Renk token | Hedef |
|---|---|---|---|
| DadaGastro | `fa-utensils` | domates `#E14827` | `anasayfa-portal-v3a.html` |
| DadaDiet | `fa-leaf` | nane `#3BB77E` | `saglik-hub-v1.html` |
| DadaFit | `fa-dumbbell` | yeşil `#009d4f` | `dadafit-hub-v1.html` |
| DadaGourmet | `fa-map-location-dot` | mor `#b14fc5` | `kesfet-v1.html` |
| DadaCampus | `fa-graduation-cap` | petrol `#006072` | `akademi-v1.html` |
| ~~DadaMentor (pusula)~~ | — | — | **İPTAL (K1: pusula yok, hub dönüşü yok)** |

**Kod yaklaşımı:**
- Yeni, net sınırlı blok: `<nav class="brand-switch" aria-label="Dünyalar">` — topbar içindeki
  `.tb-worlds`'ün yerine. Her öğe: `<a class="bs-item bs-gastro" ...><i class="fa-solid fa-utensils"></i><span class="bs-name">DadaGastro</span></a>`.
- **Hover'da başlık:** `.bs-name` default gizli (ikon-only), hover/focus'ta genişler (width/opacity
  transition). Aktif markada (`.bs-item.is-active`) başlık kalıcı görünür + alt-çizgi marka renginde.
- **Kendi rengi:** her öğeye marka renk değişkeni (`--bs-c`); hover'da ikon/başlık/çizgi `var(--bs-c)`.
  Renkler **mevcut kanonik token'lardan** (`--c-purple` vb.) çekilecek; yeni token gerekiyorsa
  `--bs-gastro` vb. eklenir (ham-hex değil).
- **Pusula/hub-dönüş YOK** (K1) — bant yalnız 5 marka öğesi.
- **Reusable kontrat:** blok kopyalandığında diğer markada **tek fark** = `is-active` hangi öğede.
  CSS namespace `bs-*` çakışmasız; JS gerekmez (saf CSS hover). Mobilde drawer'a düşer (bkz. §2 drawer).
- **a11y:** `aria-current="page"` aktif markada; ikon-only öğelerde `aria-label`/`title`.

**Dosya:** `anasayfa-portal-v3a.html` (topbar bölgesi yeniden yazılır).
**Bağımlılık:** yok (ilk yapılır; §7 şablonun çekirdeği).
**✅ K1 (KARAR):** Pusula yok · hub dönüşü yok · aktif marka başlığı kalıcı, diğerleri ikon-only+hover.

---

## 2 · GASTRO İÇ MENÜ STANDARDI — `[IM]`

**Mevcut menü** (`anasayfa-portal-v3a.html` 1496–1565): Tarifler(mega) · Ne Pişirsem? ·
Dolapta Ne Var? · **Keşfet** · Mutfak Sırları(▾ …Püf Noktaları…) · **Sağlıklı Yaşam**(▾).

**Yapılacaklar (spec madde 3+4):**
1. **ÇIKAR "Keşfet"** (satır 1536) — Gourmet'e taşınan dünya, Gastro menüsünden kalkar.
2. **ÇIKAR "Sağlıklı Yaşam" dropdown** (1553–1564) — Diet'e taşınan dünya.
3. **PÜF NOKTALARI'nı çıkar** Mutfak Sırları dropdown'undan (1542) → **üst-seviye nav öğesi** yap
   (daha belirgin). Kalan Mutfak Sırları: Mutfağa Giriş / Ansiklopedi / Sözlük / Ölçü / Sofra Düzeni.
4. **EKLE "Dada Store"** ikonlu üst-seviye nav öğesi (`fa-bag-shopping`) → store kabuğuna köprü (§3).
5. **BELİRGİNLEŞTİR "Dolapta Ne Var?"** (1535, → `tarif-bulucu-v1`) + **"Dada Route"**.

**İkon-set menü:** spec madde 2'deki "ikon-set + hover başlık" birincil olarak **siyah bant
switcher'a** ait (§1). Gastro **iç** modül menüsü mevcut metin+chevron dilini korur; tutarlılık için
her üst öğeye küçük FA ikon eklenir (Tarifler `fa-book-open`, Ne Pişirsem `fa-utensils`, Dolapta Ne Var
`fa-basket-shopping`, Püf Noktaları `fa-lightbulb`, Mutfak Sırları `fa-mortar-pestle`, Dada Store
`fa-bag-shopping`). **İç menü ikon-only DEĞİL** (okunabilirlik) — ⚠️ **K2 (Beyar onayı):** iç menü
de ikon-only+hover-başlık mı olsun, yoksa ikon+metin mi? Öneri: **ikon+metin** (iç menüde keşif önemli).

**Dada Store ikonunun yeri (öneri):** nav'ın **sonunda**, ayraçla ayrılmış belirgin öğe
(`.nav-item nav-store` — bag ikon + "Dada Store" + küçük dış-link oku), Tarifler→Ne Pişirsem→Dolapta
Ne Var→Püf Noktaları→Mutfak Sırları→**Dada Store** sırası. Alternatif: head-actions'ta ikon buton.
⚠️ **K3 (Beyar onayı):** Store nav sonunda mı, head-actions'ta ikon mu?

**✅ K4 (KARAR):** "Dada Route" = **mevcut "Yol Güzergahım" componenti** (yeni modül DEĞİL, çakışma YOK).
Gastro anasayfasında ZATEN var:
- **FAB** (satır 1711–1713): `.yg-fab` → `yol-guzergahim-v2.html` (`fa-route` + "Yol Güzergahım").
- **Tanıtım şeridi** (satır 2427+): route ikon + "Nereden nereye… yol üstü mekanları haritada gör".
Bu component cross-brand (Gourmet'in çekirdeği; Gastro + Diet anasayfasında da şerit/FAB olarak yüzer —
Beyar: "diette de bunun gibi bir kısım zaten var").
**Pilot aksiyonu (spec md.4):** mevcut Yol Güzergahım componentini **belirginleştir** (şeridi/FAB'ı
daha görünür konuma/ağırlığa taşı). **Yeni öğe eklenmez.**
**⚠️ K4b (Beyar onayı, küçük):** Component etiketi "Yol Güzergahım" → "Dada Route" olarak yeniden
adlandırılsın mı? (spec tutarlı "Dada Route" diyor). Öneri: marka tutarlılığı için **"Dada Route"**
adına geç (alt-açıklama "yol üstü lezzet rotası" kalır).

**Mobil drawer** (1610+): aynı menü değişiklikleri drawer-nav'a da yansır (Keşfet/Sağlıklı Yaşam çıkar,
Püf + Store eklenir) + switcher drawer başına düşer.

**Dosya:** `anasayfa-portal-v3a.html` (nav + drawer-nav).
**Bağımlılık:** §3 (Store köprüsü hedefi) ile birlikte.

---

## 3 · STORE KÖPRÜSÜ — `[SK]`

**Karar (KESİN):** Store kabuğu elden geçmez; switcher enjekte edilmez. **TEK değişiklik:**
back-link metni.

- **Gastro→Store:** §2'deki "Dada Store" nav öğesi `href="dada-shop-v1.html"`.
- **Store→Gastro:** 5 store sayfasında `.tb-back` linki ZATEN `href="anasayfa-portal-v3a.html"`
  (doğrulandı). **Sadece METİN** "DadaMutfak'a dön" → **"DadaGastro'ya dön"**.
  - Dosyalar (her birinde 1 occurrence): `dada-shop-v1.html` · `urun-liste-v1.html` ·
    `urun-detay-v1.html` · `sepet-v1.html` · `odeme-v1.html`.
  - href DEĞİŞMEZ, sınıf DEĞİŞMEZ, başka hiçbir şey DEĞİŞMEZ.
- ⚠️ Not: `lm-back` (mobil) öğesinin metni ayrı; grep'te tek "DadaMutfak'a dön" çıktı → lm-back farklı
  metinli olabilir. İmplementte lm-back metni de kontrol edilip Gastro'ya uyarlanacak (varsa).

**Dosya:** 5 store sayfası (yalnız metin).
**Bağımlılık:** §2 (Gastro nav'daki Store öğesi) ile eşzamanlı.

---

## 4 · GASTRO MARKA FOOTER — `[FT]`  (KARAR GÜNCELLENDİ 2026-06-30)

**KARAR (KESİN):** Footer için **DadaMentor (hub) footer'ı REFERANS ALINMAYACAK** — ne yapı ne içerik
hub'dan kopyalanmaz. Bunun yerine **mevcut DadaMutfak (generic) footer'ı** temel alınır, **Gastro'ya
ÖZGÜN içerikle** doldurulur. Her marka kendine ait footer alır; **ortak "hub şablonu" YOK.** §7'de
footer "reusable" değil, **marka-özel** kategorisinde.

**Mevcut:** tüm markalarda BİREBİR generic footer — `anasayfa-portal-v3a.html` **2768–2821**
(`<footer class="footer orange">`: `.foot-brand` + 4×`.foot-col` + `.foot-legal` + `.foot-bottom`,
**perde-reveal YOK**). Kolonlar: Kurumsal / Hızlı Erişim / İletişim / İş Birliği + yasal + © DadaMutfak.

**Yaklaşım:** Bu mevcut footer **yapısını temel al**, frontend-design ile Gastro dünyasına uygun ÖZGÜN
hale getir (hub'dan kopya değil):
- **Brand lockup:** **DadaGastro** kimliği (logo-official + domates aksanı). Tagline tarif/topluluk
  odaklı (örn. "Binlerce denenmiş tarif, tek mutfak topluluğu").
- **Kolonlar (Gastro'ya özgün):** Tarifler/Keşif (Ne Pişirsem, Dolapta Ne Var, Kategoriler) ·
  Topluluk (Şef Ol, Şefler, Mutfak Defteri) · Kurumsal (Hakkımızda, İletişim, S.S.S.) · yasal şeridi.
- **İmza:** "© 2026 DadaGastro · Bir Dadaİstanbul ürünüdür" + Gaviaworks imzası (gavia-mark.png) korunur.
- - **Perde-reveal: KARAR = TÜM FOOTERLARDA PERDE OLACAK (Beyar, 2026-06-30).** `.site-foot.revealed`
  curtain mekaniği footer'a uygulanır — içerik DadaMutfak-temelli/Gastro-özgün olsa da **perde mekaniği
  ortak/reusable** (her markada aynı). Uzun sayfada snap tuzağına dikkat (hub'da `.finale` snap
  kaldırılmıştı, ders alındı).
- **App bloğu:** mevcut DadaMutfak footer'ında yok. ⚠️ K5 kararına göre eklenir/eklenmez.

**Dosya:** `anasayfa-portal-v3a.html` (mevcut footer 2768–2821 bloğu Gastro'ya özgün içerik + perde
CSS/JS ile düzenlenir).
**Bağımlılık:** bağımsız; §1 sonrası herhangi sırada.
**✅ K6 (KARAR):** Perde-reveal **TÜM footerlarda OLACAK** (Beyar). Perde mekaniği reusable.
**✅ K5 (KARAR):** App indirme bloğu **EKLENECEK** (App Store + Google Play; href=# placeholder,
app ileride). DadaMutfak footer temel yapısına app bloğu eklenir.

---

## 5 · ASSISTANT FAB (Gastro'ya enjekte) — `[AS]`

**Karar:** kompakt **marka-renkli (domates)** FAB + 3 context-aware işlev (Gastro pilotuna dahil).
**Pattern referansı:** `dadamentor-v3.html` `.mentor-panel` (196–331, 818+) — FAB↔panel morph,
`.floating`/`.mini`/`.foot-hide` durumları. **Hub video-mentor AĞIR**; Gastro'da **hafif** sürüm:
video YOK, kompakt sohbet/öneri paneli.

**Kompakt FAB yapısı:**
- **SOL-alt** sabit FAB (domates), `fa-wand-magic-sparkles`/`fa-utensils` ikon + "Mutfak Asistanı".
  (K7: assistant sol-alt, scroll-top sağ-alt → çakışma yok, ayrı köşeler.)
- Tık → kompakt panel açılır (domates aksan, Gilroy, token). 3 işlev sekmesi/bloğu:

**3 context-aware işlev — Gastro'daki SOMUT örnekler:**
- **(a) Top-modül yönlendirme:** Gastro'nun öne çıkan modülleri kısayol çipleri:
  "Bugün ne pişirsem?" → `bugun-ne-pisirsem-v1` · "Dolapta ne var?" → `tarif-bulucu-v1` ·
  "Haftalık menü" → `haftalik-menu-v1` · "Tarif ekle" → `tarif-ekle-v1`.
- **(b) Cross-brand köprü:** Gastro'dan diğer dünyalara bağlam köprüsü:
  "Bu tarifi **DadaFit**'te dengele" (yediğini hareketle dengele — fit-ek.md modülü) ·
  "**DadaDiet** ile hedefime uygun tarifler" (diet-ek hesaplayıcı→tarif CTA mantığı) ·
  "**DadaGourmet**'te bu lezzetin mekânı".
- **(c) Bağlam-duyarlı bilgilendirme:** bulunulan sayfaya göre ipucu. Anasayfada: "Yeni misin?
  Ne Pişirsem ile başla." Tarif sayfasında (yayılınca): "Bu tarifin püf noktası…". Pilotta
  anasayfa bağlamı kurulur, sayfa-bazlı içerik yayılımda genişler.

**Kod yaklaşımı:** saf HTML+CSS+küçük JS (aç/kapa + mini morph). Reusable: panel içeriği marka-veri
objesiyle parametrize (`bs-*` gibi `as-*` namespace); diğer markada renk + modül listesi + köprü
hedefleri değişir, iskelet aynı.
**Dosya:** `anasayfa-portal-v3a.html`.
**Bağımlılık:** §1/§2 sonrası (modül + cross-brand hedefleri netleşince).
**✅ K7 (KARAR):** Assistant FAB **SOL-alt**, scroll-top (§6) **SAĞ-alt** → ayrı köşeler, çakışma yok.
Mobilde alt-nav ile sol-alt FAB çakışmasına dikkat (z-index + alt-nav yüksekliği kadar offset).

---

## 6 · REVEAL + SCROLL-TOP — `[RV]`

**Spec madde 6:** her bölümde "yukarı kaydır" + içerik reveal.
**Pattern referansı:** `dadamentor-v3.html` — `.reveal{opacity:0;translateY(24px)}` + `.is-in`
(494–501), `data-r="1..4"` stagger, IntersectionObserver tetik, `prefers-reduced-motion` tam kapalı.
Scroll-top: `.to-top #toTop` (1088) + buton.

**Kod yaklaşımı:**
- **Reveal:** anasayfa bölüm başlık/kartlarına `.reveal data-r` ekle + ortak IntersectionObserver.
  ⚠️ ÖLÇÜLÜ (AI-hissi riski; handoff dersi "restraint şart"). `prefers-reduced-motion`'da kapalı.
- **Scroll-top:** `.to-top` butonu + scroll listener (eşik ~600px). §5 FAB ile dikey stack (K7).
**Dosya:** `anasayfa-portal-v3a.html`.
**Bağımlılık:** §5 (konum çakışması) ile koordineli.

---

## 7 · ŞABLON ÇIKARIMI (pilotun ASIL çıktısı) — `[TPL]`

Gastro bittiğinde → `tasks/30-haz-revize/marka-kabuk-sablonu.md` üretilir. İçerik:
- **Reusable (birebir kopya, tek fark `is-active`/renk):** §1 siyah bant switcher ·
  §5 assistant FAB iskeleti · §6 reveal+scroll-top sistemi · **footer PERDE MEKANİĞİ
  (`.site-foot.revealed` curtain — tüm markalarda aynı)**.
- **Marka-özel (her markada SIFIRDAN/özgün):** switcher aktif öğe + ana renk · iç menü kalemleri
  (Fit/Diet/Gourmet docx menüleri) · **footer İÇERİĞİ (ortak şablon YOK — her marka kendi özgün
  footer içeriği, mevcut DadaMutfak footer'ı temel; perde mekaniği ortak ama içerik özgün)** ·
  assistant modül listesi + cross-brand köprü hedefleri + bağlam metinleri · yeni modül sayfaları.
- **Renk/ikon/hedef matrisi** (§1 tablosu + her markanın menü kalemleri docx'ten).
- **Yayılım kontrol listesi:** console 0 · taşma 0 (1440+390) · cream 0 · dead-link denetimi · SS.

**Dosya:** yeni `marka-kabuk-sablonu.md`.
**Bağımlılık:** §1–§6 bitince.

---

## BAĞIMLILIK SIRASI

```
K0 (data-brand kapsam onayı)  ─┐
                               ├─► §1 [BS] siyah bant switcher  (çekirdek)
                               │       │
§2 [IM] iç menü ◄──────────────┘       │  (§1 ile aynı header turunda)
   │  └─► §3 [SK] store köprüsü (eşzamanlı, 5 store: yalnız metin)
   │
§4 [FT] footer  (bağımsız)
§5 [AS] assistant FAB ──► §6 [RV] reveal+scroll-top (konum koordinasyonu)
                                   │
                                   └─► §7 [TPL] şablon çıkarımı (en son)
```

---

## İŞ BÜYÜKLÜĞÜ — DÜRÜST DEĞERLENDİRME

**Tek tura SIĞMAZ.** 7 bileşen, biri (switcher) yeni reusable sistem, biri (assistant) yeni
etkileşim, üçü (menü/footer/reveal) anasayfanın büyük bölgelerini yeniden yazıyor. Her biri kendi
SS + QA + bağlantı denetimi gerektiriyor (CLAUDE.md kuralı). **Alt-fazlara bölünmeli:**

| Faz | Kapsam | Çıktı/Gate |
|---|---|---|
| **A** | §1 switcher + §3 store köprüsü (+ K0/K1 onayı) | cross-brand nav çalışır + SS |
| **B** | §2 Gastro iç menü standardı (+ K2/K3/K4 onayı) | temiz menü + SS |
| **C** | §4 Gastro marka footer (+ K5/K6) | footer + SS |
| **D** | §5 assistant FAB + 3 işlev (+ K7) | FAB + 3 işlev demo + SS |
| **E** | §6 reveal + scroll-top | hareket + SS |
| **F** | §7 şablon dokümanı | `marka-kabuk-sablonu.md` |

Her faz sonunda Beyar gözle gate. Faz A+B aynı header turunda birleştirilebilir (ikisi de header).

---

## KARAR ÖZETİ (durum)
- **K0** ✅ data-brand kapsam → **pilotta yalnız anasayfa** (Beyar)
- **K1** ✅ switcher: **pusula YOK + bantta hub dönüşü YOK + aktif marka başlığı KALICI** (diğerleri
  ikon-only+hover). Hub'a footer'dan ulaşılır.
- **K2** ✅ iç menü → **ikon + metin** (Beyar)
- **K3** ✅ Store nav konumu → **nav sonunda belirgin öğe** (Beyar)
- **K4** ✅ "Dada Route" = **mevcut "Yol Güzergahım" componenti** (FAB 1711 + şerit 2427 →
  yol-guzergahim-v2). Yeni modül değil; pilotta **belirginleştirilir**. **K4b ⏳:** etiket "Yol
  Güzergahım" → "Dada Route" yeniden adlandırma onayı (öneri: evet).
- **K5** ✅ footer app bloğu → **EKLENECEK** (App Store + Google Play, placeholder)
- **K6** ✅ footer perde-reveal → **TÜM footerlarda PERDE OLACAK** (Beyar); perde mekaniği reusable
- **K7** ✅ assistant FAB **SOL-alt**, scroll-top **SAĞ-alt** (ayrı köşeler)
