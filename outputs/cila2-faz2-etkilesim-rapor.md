# CİLA-2 FAZ 2 · ETKİLEŞİM teammate — Üretim Raporu

> Sahip: **etkilesim** · Takım: cila2-faz2 · Statü: **sweep hariç tamam, lead kanıt denetimi bekliyor**
> Tarih: 2026-06-12 · İA: `tasks/uyelik-ia.md` (KİLİTLİ) · Kapsam: §6 ETKİLEŞİM dosya seti (6 dosya)

---

## 0 · Özet

İA §6 ETKİLEŞİM dosya seti tamamlandı: **1 yeni sayfa** (`puf-noktasi-ekle-v1`),
**5 mevcut dosyada** köprü/gate/chrome eklemeleri. Tüm yeni bileşenler miras alındı;
yeni hero/modal icat edilmedi. `_shell.html` login-state chrome'u + `lg-gate` + `dm_auth`
sözleşmesi (§2.3 birebir) kuruldu. **68-sayfa sweep HENÜZ KOŞULMADI** — lead onayı + profil
dosyaları kapandıktan sonra ayrı adım.

**Statik kanıt (tamamı geçti):**
- 6/6 dosya HTTP 200 (lokal `http://localhost:8765/mockups/`)
- CSS yorum `*/` tuzağı (lessons): **0** (negatif grep temiz)
- Inline `<script>` syntax doğrulaması (node vm): **6/6 dosya OK**

**Tereddüt (lead'e):** Persona uyuşmazlığı — İA §2.3 header personasını **Elif Şahin**
kilitliyor; profil teammate'in `mutfak-defteri-v1` own-profili **Ayşe Demir / @aysemutfakta**
gösteriyor. İA bağlayıcı olduğu için header/drawer'da Elif Şahin uyguladım. Avatar dropdown
"Mutfak Defterim" tıklanınca açılan defterde farklı isim görünmesi tutarsızlık yaratır →
koordinasyon kararı lead'de (aşağıda §7-T1).

---

## 1 · `_shell.html` — login-state chrome + lg-gate + dm_auth (İA §2.2, §2.3, §2.1)

**Ne değişti (yalnız header/drawer/bottom-nav + ortak JS/markup):**

| Parça | İçerik | İA ref |
|---|---|---|
| CSS (header) | `.head-add/.head-bell/.acct-wrap` varsayılan gizli; `body.is-auth` ile açılır, `.btn-login` gizlenir. `.acct-item/.acct-btn/.acct-ava/.acct-menu/.hb-badge/.acct-id` dropdown dili (nav dropdown diliyle aynı, sağa hizalı ok) | §2.2 |
| CSS (drawer) | `.drawer-acct` logged-in kimlik satırı (avatar + ad + Defterim/Bildirimler/Ayarlar/Çıkış mini-link); `body.is-auth .drawer-login{display:none}` | §2.2 |
| CSS (lg-gate) | `.lg-overlay/.lg-gate/.lg-panel/.lg-ico/.lg-acts` — `fb-modal` z-index/grid pattern'ından hafif miras (ağır modal değil) | §2.1 |
| CSS (mobil ≤640) | `body.is-auth .head-add/.head-bell/.acct-wrap{display:none}` — logged-in header öğeleri mobilde drawer+bottom-nav'a devreder (kaynak sıra ile is-auth'u yener) | §2.2 |
| Markup (head-actions) | `Ekle ▾` dropdown (Tarif Ekle / Püf Noktası Ekle) + `bildirim zili` (badge "3") + `avatar ▾` dropdown (sıra İA §2.2 birebir: Mutfak Defterim · Tariflerim · Kaydedilenler · Menülerim · Bildirimler · Ayarlar/Hesabım · ─ · Çıkış). Persona **Elif Şahin · @elifsahin** | §2.2 |
| Markup (drawer-foot) | logged-out `Giriş Yap` (`.drawer-login`) ↔ logged-in `.drawer-acct` satırı; `Tarif Ekle` + **`Püf Noktası Ekle`** eklendi | §2.2 |
| Markup (bottom-nav) | "Hesap" öğesine `id="bnAccount"`, default `href=giris-v1.html`; JS logged-in'de `mutfak-defteri-v1.html`'e çevirir | M6 |
| Markup (lg-gate) | `</main>` **SONRASINA** (lessons: fixed overlay page-main stacking context'ine girmez) | §2.1 + lessons |
| JS (dm_auth) | İA §2.3 sözleşmesi **birebir**: `?auth=1`→localStorage `dm_auth='1'`+`body.is-auth`; `?auth=0`→temizle; param yoksa localStorage'a bak. + M6 bnAccount hedefi | §2.3, M6 |
| JS (acct toggle) | `.acct-item` tıkla-aç dropdown + dışarı tık kapan (nav-item desenine paralel) | §2.2 |
| JS (lg-gate) | `window.__lgGate(title,desc)` — `body.is-auth` iken **hiç açılmaz**; `[data-lg-gate]` capture listener; `?lg=1` SS paramı; ESC/overlay kapat | §2.1 |
| Çıkış davranışı | `anasayfa-portal-v3a.html?auth=0` (param + anasayfa, ara ekran yok) | M7 |

**İnceleme URL'leri:**
- Logged-in: `http://localhost:8765/mockups/_shell.html?auth=1`
- Logged-out: `http://localhost:8765/mockups/_shell.html?auth=0`
- lg-gate SS: `http://localhost:8765/mockups/_shell.html?lg=1` (logged-out'ta açılır)
- Mega+dil SS: `?dd=1` · drawer SS: `?drawer=1` (mobil)

---

## 2 · `puf-noktasi-ekle-v1.html` — 🔴 YENİ (İA §3, tek adım)

**Miras kaynağı:** Güncel `_shell.html` (login-state chrome dahil) + `tarif-ekle-v1`
form-kit CSS'i **verbatim** (617–928 satır splice: `fk-*`, `up-*`, `sbanner`, `tips-card`,
`send-panel`, `remind-box`, `st-*`, `ie-actions/add-row`). Yeni hero İCAT EDİLMEDİ — hero =
tarif-ekle'nin `below-header + fp-top + rd-crumb + fp-head` dili.

**Yapı (TEK ADIM — wizard/stepper YOK, eski puf-ekle gibi):**
- Üst bant: breadcrumb (Püf Noktaları › Püf Noktası Ekle) + `fp-head` (eyebrow "Şeflerden
  Küçük Sırlar" + h1 + lead) + 3 `sbanner` (`draft`/`review`/`rejected`)
- Künye kartı: Başlık (req, 80 sayaç) + Konu (select) + Etiket (opt) + Kapak galeri (`up-*`)
- İçerik kartı: **st-card uyarlaması** içerik blokları (Paragraf / Görsel / Video) +
  `ie-actions` üç ekleme butonu. Yeni minimal adaptör: `.cb-kind` tip rozeti + `.cb-cap`
  görsel açıklaması (token dili, st-card iskeleti korunur)
- `send-panel` (Taslak Kaydet / Onaya Gönder) + `tips-card` + `remind-box` sidebar

**Davranış (SS paramları):**
- `?state=draft|review|rejected` — sbanner; **review → `.is-locked` form kilidi** (kılavuz §2b)
- `?mode=edit` — düzenleme bağlamı (= eski `puf-noktasi-duzenle`): breadcrumb/başlık/lead/eyebrow
  + "Değişiklikleri Gönder"
- `?err=1` — boş başlık hatası · Onaya Gönder → review state'e geçer (mock)
- Kapak galerisi (cover ★/sil/ekle), içerik blokları ekle/sil/renumber — çalışır mock

**İnceleme URL'leri:**
- Logged-in: `…/puf-noktasi-ekle-v1.html?auth=1`
- Logged-out: `…/puf-noktasi-ekle-v1.html?auth=0`
- Düzenleme: `?auth=1&mode=edit` · Onayda (kilit): `?auth=1&state=review` · Reddedildi: `?auth=1&state=rejected`

---

## 3 · `tarif-ekle-v1.html` — `?mode=edit` + tariflerim köprüsü

**Ne değişti:**
- Breadcrumb `Hesabım` → **`Tariflerim`** (→ `mutfak-defteri-v1.html?tab=tarifler`)
- see-all `Taslaklarım (3)` → **`Tariflerim`** (→ `?tab=tarifler`) — M3 (ayrı Taslaklarım yok,
  defter durum chip filtresine köprü)
- `?mode=edit` JS bloğu (= eski `tarif-duzenle`): breadcrumb/başlık/lead/eyebrow + "Değişiklikleri
  Gönder" (mevcut `?state=` modları **korundu**, pre-fill zaten vardı)

**Not:** chrome'u (login-state) bu dosyaya **henüz** eklenmedi — faz-sonu sweep ile gelecek.

**İnceleme URL'leri:** `…/tarif-ekle-v1.html?mode=edit` · `?state=review` · `?state=rejected`

---

## 4 · `bugun-ne-pisirsem-v1.html` — "Deftere Kaydet" köprüsü (İA §4)

**Ne değişti (menü aksiyonları Değiştir/Çıkar/Kap Ekle/Adını Değiştir DURDU, sadece köprü):**
- Inline `dm_auth` (§2.3) eklendi (body.is-auth için, sweep öncesi probe edilebilirlik)
- `mdSave` handler: **logged-in → toast "… defterine kaydedildi" + "Menülerime git" linki**
  (`mutfak-defteri-v1.html?tab=menuler`); **logged-out → `__lgGate` (fallback giriş yönlendirme)**
- Mevcut `.md-toast` altyapısı genişletildi: opsiyonel `(href,linkLabel)` ile köprü linki +
  link varken süre 4.2s. `.md-toast a` stil eklendi.

**İnceleme URL'leri:**
- Logged-in (köprü): `…/bugun-ne-pisirsem-v1.html?auth=1` → menü aç → "Deftere Kaydet" → toast+link
- Logged-out (gate): `…/bugun-ne-pisirsem-v1.html?auth=0` → "Deftere Kaydet" → lg-gate/yönlendirme

---

## 5 · `puf-noktasi-detay-v1.html` — `.rev-form` login-gate (İA §5)

**Ne değişti:**
- Inline `dm_auth` (§2.3)
- CSS: `.rev-login` giriş daveti (lg dili) + `body:not(.is-auth) #revForm{display:none}` +
  `body:not(.is-auth) .rev-login{display:flex}`
- Markup: `#revForm`'dan sonra `.rev-login` (kilit + "Yorum yapmak için giriş yap" + Giriş
  Yap/Üye Ol). **`rev-list` + `rev-summary` herkese AÇIK** (okuma serbest — eski site davranışı)

**İnceleme URL'leri:**
- Logged-in (form): `…/puf-noktasi-detay-v1.html?auth=1` (yıldız + textarea + gönder normal)
- Logged-out (davet): `…/puf-noktasi-detay-v1.html?auth=0` (form yerine giriş daveti; liste+özet açık)

---

## 6 · `tarif-detay-v1.html` — yorum gate + `.r-save` kaydet gate (İA §5)

**Ne değişti:**
- Inline `dm_auth` (§2.3)
- Yorum gate: `.rev-login` + `body:not(.is-auth) #revForm{display:none}` (puf-detay ile aynı pattern)
- **Kaydet/favori kapısı (capture listener):** `.r-save`, `.p-fav`, actbar `[data-act="save"]`,
  `[data-act="made"]` — logged-out'ta `e.stopPropagation()` ile shell toggle'ı VE actbar
  handler'ını **capture fazında keser**, `__lgGate` (varsa) ya da giriş yönlendirme. Logged-in'de
  erken return → normal toggle çalışır.

**İnceleme URL'leri:**
- Logged-in: `…/tarif-detay-v1.html?auth=1` (yorum formu + kaydet toggle çalışır)
- Logged-out: `…/tarif-detay-v1.html?auth=0` (yorum daveti + kaydet → lg-gate/yönlendirme)

---

## 7 · Tereddütler / Lead Kararı / Mimari Notlar

**T1 — Persona uyuşmazlığı (KOORDİNASYON):** İA §2.3 = **Elif Şahin** (uyguladım); profil
`mutfak-defteri-v1` = **Ayşe Demir / @aysemutfakta**. Avatar dropdown "Mutfak Defterim" →
farklı isim. Çözüm lead'de: (a) profil dosyasını Elif Şahin'e hizala, ya da (b) İA personasını
Ayşe Demir'e güncelle + benim 2 dosyamı (shell header+drawer) düzelt. **Beyar incelemesi bekleyen.**

**T2 — Sweep öncesi chrome kuplajı (MİMARİ):** Gate'ler `body.is-auth`'a bağlı; bu sınıfı
`dm_auth` JS set ediyor ama chrome sweep faz-sonu. Probe edilebilirlik için **3 içerik dosyasına**
(puf-detay, tarif-detay, bnp) §2.3 dm_auth'u **kompakt inline** ekledim. Sweep chrome dm_auth'u
eklediğinde **2 kopya** olur — idempotent (setItem aynı değer, add aynı class → zararsız).
**Sweep guard'ı:** chrome JS enjeksiyonu öncesi `grep dm_auth` ile çift enjeksiyon engellenecek
(aşağıda §8).

**T3 — lg-gate fallback:** Sweep öncesi içerik dosyalarında chrome `__lgGate` yok → kaydet/BNP
kapıları `if(window.__lgGate) … else location.href='giris-v1.html?return=…'` fallback'i kullanır.
Sweep sonrası `__lgGate` modalı devreye girer. Her iki durumda da logged-out aksiyon engellenir.

**T4 — Card-level `.r-save`:** İA §1.1 "kartlarda yok sadece detayda" diyor ama yeni mockup ilgili
tarif kartlarında da `.r-save` taşıyor. İA §5 "tüm `.r-save/.p-fav`" dediği için hepsini gate'ledim
(detay hero + ilgili kartlar). Tutarlı; itiraz olursa daraltılır.

---

## 8 · FAZ-SONU SWEEP — PLAN (lead "sweep başla" deyince koşulacak)

> ⛔ HENÜZ KOŞULMADI. Profil dosyaları kapandı (task #2 completed) — lead onayı bekleniyor.

**Kapsam:** `_shell.html` login-state bloğu (CSS + header/drawer/bottom-nav markup + dm_auth/
acct-toggle/lg-gate JS + lg-gate markup) → **68 sayfaya** idempotent script ile.

**Sweep tasarım kuralları (lessons + İA §6):**
1. **Idempotent:** her parça için ayrı varlık kontrolü — `acct-wrap` markup yoksa header bloğu;
   `dm_auth` JS yoksa JS bloğu (T2 çift-enjeksiyon guard'ı); `lg-gate` markup yoksa overlay.
   Benim 6 dosyam zaten parçalı içeriyor → atlanır/tamamlanır.
2. **Negatif grep:** `btn-login VAR ama .acct-wrap YOK` (kaçak sayfa yakalama, sozluk-v1 anchor dersi).
3. **Shop sızıntı grep'i:** shop ailesi (dada-shop/urun-*/sepet/odeme/siparislerim — kendi `lm-*`
   login'i) `is-auth` header SIZMAMALI → hedef 0.
4. **Scope kilidi:** değişiklik YALNIZ header/drawer/bottom-nav + login CSS/JS bloğu.
5. **Render probe:** 4+ aileden örnek sayfada `?auth=1`/`?auth=0`; konsol 0, 390 taşma 0.

---

## 9 · KANIT DURUMU

| Kontrol | Durum |
|---|---|
| 6/6 HTTP 200 | ✅ |
| CSS `*/` tuzağı negatif grep | ✅ 0 |
| Inline script syntax (node vm) | ✅ 6/6 + sweep sonrası 54/54 |
| Lead render/tıklama probe (6 dosya, iki auth) | ✅ KABUL (lead koştu) |
| Headless Chrome sweep sanity (anasayfa/tarif-detay, iki auth) | ✅ (aşağıda §10) |

---

## 10 · SWEEP YÜRÜTÜLDÜ ✅ (lead "sweep başla" onayı + BNP guard fix sonrası)

**Yöntem:** `_sweep-loginstate.js` — **bölge-swap (region-swap)** + 3 doğrudan insert
(R5 bottom-nav regex · R6 lg-gate insert · R7 dm_auth insert). Her parça idempotent guard'lı.
Whitespace-dayanıklı: shell ile target arasındaki `[startAnchor,endAnchor)` bölgesi swap edilir.

**Kapsam:** 78 html → **55 İŞLENDİ**, 23 atlandı. *(SWEEP REVİZE TUR 1: lead bağımsız doğrulamada
`alisveris-listesi-v1`'i kaçak yakaladı — adı yanıltıcı ama ANA SİTE ailesi [haftalik-menu reyon-grup
mirası, lm-modal YOK, standart chrome + cartWrap sepete-aktar köprüsü]. Hatalı olarak "shop" saymıştım;
shop tespiti `cartWrap`'ten **`lm-modal`-only**'e daraltıldı, alisveris işlendi → 54→55.)*

**Atlananlar (23) — hepsi kasıtlı:**
- `_shell.html` (kaynak) + `tarif-detay-v1-headA.html` (varyant) — hard-exclude
- **6 shop** (dada-shop, odeme, sepet, siparislerim, urun-liste, urun-detay) —
  lm-modal kabuk-sapması (siparislerim lm-modal=0 ama Shop II ailesi, SHOP set'te), **is-auth SIZMAZ**
- **15 chrome'suz** (panel-shell + 6 dyt-* + hesaplayici-v1 = kılavuz §3b muaf; 7 ref-* klon)

**Tekil divergent sayfa — `tarif-detay-v1`:** erken F1 chrome yorumları `— v3a'dan BİREBİR`
varyantı taşıyor; R1/R2/R8 anchor'ları region-swap'a uymadı → kendi anchor'larıyla **elle
patch** edildi (lessons "kaçak anchor varyantı" dersi — sozluk-v1 vakasının ikizi). Sonuç tam.

**İki guard çakışması yakalandı & düzeltildi (sweep iterasyonu):**
1. R8 guard `__lgGate` → BNP/tarif-detay gate handler'ları `window.__lgGate` **referansı**
   taşıyor; guard definition sanıp atlıyordu → guard `window.__lgGate=open` (definition) yapıldı.
2. R1 guard `LOGIN-STATE (cila-2 faz 2)` → tarif-detay'ın gate yorumuna çakıştı →
   `LOGIN-STATE (cila-2 faz 2) — header logged-in chrome` (CSS'e özgü) yapıldı.

**dm_auth çift-enjeksiyon guard'ı (lead şartı):** 3 inline sayfada (puf-detay/tarif-detay/bnp)
R7 `-R7(inline)` ile atlandı — chrome dm_auth eklenmedi, inline kullanılıyor (bnAccount satırı
inline'a eklendi). Diğer 51'de chrome dm_auth tek kopya.

**DOĞRULAMA GREP'LERİ (lead şartları — `_sweep-verify.js`):**
```
[1] NEGATİF GREP (btn-login VAR, acct-wrap YOK): KAÇAK = 0 ✅
    (revize sonrası 7 eşleşme: 6 shop + 1 headA — hepsi beklenen exclude)
[2] SHOP SIZINTI (6 shop sayfası, is-auth SIZMAZ): sızıntı = 0 ✅
[3] İŞLENEN BÜTÜNLÜK (55 sayfa, 8 parça): eksik = 0 ✅
[4] JS SYNTAX (55 sayfa): hata = 0 ✅
[+] alisveris-listesi ?auth=1 headless: is-auth ✅ + acct-wrap ✅ + cartWrap korundu ✅ (yanyana, çakışma yok)
```

**HEADLESS CHROME RENDER SANITY (lead: "headless CLI kullan"):**
- `anasayfa-portal-v3a?auth=1` → `<body class="is-auth">` ✅ + acct-wrap DOM'da ✅ +
  bnAccount→`mutfak-defteri-v1.html` ✅ **(Beyar'ın gördüğü "anasayfa?auth=1 çalışmıyor" FIXED)**
- `anasayfa-portal-v3a?auth=0` → `<body>` (is-auth yok) ✅ + bnAccount→`giris-v1.html` ✅ (M6)
- `tarif-detay?auth=1` → `<body class="is-auth">` ✅ + **actbar+lightbox KORUNDU** ✅
  (R6 insert overlay'leri silmedi) + lgGate markup ✅ + `window.__lgGate=open` def ✅

**Sweep tooling (audit, mockups/):** `_sweep-loginstate.js` (idempotent, re-runnable) +
`_sweep-verify.js`. Geçici dry-test/patch helper'ları temizlendi.

**Kozmetik (opsiyonel, lead notu — revize sayılmaz):** puf-noktasi-ekle'de kullanılmayan
stepper CSS'i (tarif-ekle'den verbatim splice mirası) duruyor — **zararsız ölü CSS** (eşleşen
element yok), risk almamak için bırakıldı. İstenirse ayrı temizlik turunda kaldırılır.

### SWEEP REVİZE TUR 2 — anasayfa CSS-yutma fix ✅ (lead örneklem probe'u + Beyar canlı SS yakaladı)

**Bug:** `anasayfa-portal-v3a`'da **R1 region-swap, ~308 satır page CSS'i (hero/searchcard/
search-tabs/chips/hero-stats/cat-track) YUTTU**. Kök neden: v3a kanonik baz; CSS sıralaması shell'den
divergent — `.btn-login:hover` (203) ile `/* ---- NAV DROPDOWNS ---- */` (512) ARASINA page CSS girmiş.
Region `[start,end)` o 308 satırı kapsayıp shell'in küçük bölgesiyle değiştirdi → silme. Login-state
EKLEME tarafı çalışıyordu (avatar/zil/is-auth doğru); sorun yalnız silmede. (tarif-detay elle-patch
vakasının İKİZİ; orada anchor hiç eşleşmemişti, burada GENİŞ eşleşip yuttu.)

**Dersin kaynağı:** dry-test'im *additions* doğruladı ama **CSS-survival (deletions) doğrulamadı** —
overlay survival eklemiştim ama page-CSS survival eklememiştim. → LESSON adayı (aşağıda).

**Fix (lead planı):** anasayfa `git show HEAD:`'ten temiz alındı; login-state v3a'nın KENDİ anchor'larıyla
**elle patch** (`_patch-anasayfa.js`) — **R1/R2 CSS = INSERT** (region-swap DEĞİL), R3/R4/R8 region-swap
**span-guard'lı** (>3000 char ise ABORT), R5 regex, R6/R7 insert. Script v3a'ya yeniden SALINMADI.

**DOĞRULAMA (5/5 zorunlu kriter, kanıtlı):**
```
(a) git diff --numstat anasayfa: +192 -2 = NET +190 POZİTİF ✅
    2 silinen satır = ikisi de MARKUP (drawer Giriş Yap btn + bottom-nav Hesap) — login-state ile değişti
(b) cat-track: 5 → 5 KORUNDU ✅ (HEAD ile eşit)
(c) 390 iframe probe: scrollWidth=375 clientWidth=375 overflow=0 ✅ (HEAD'in 375'ine döndü; 1920 bug FIX)
(d) headless SS (1280): hero "Bugün ne pişirsem?" + searchcard (tab+input+buton) + chips + hero-stats
    TAM STİLLİ render ✅ + login-state header (ara/+/zil/avatar) görünür
(e) ?auth=1 → is-auth + bnAccount→defter ✅ · ?auth=0 → temiz + bnAccount→giris ✅
```

**Diğer 54'te gizli CSS-yutma taraması (lead NOT'u):** `git diff -U0 | '^-.*{'` + net-negatif kontrolü.
- **Net-negatif dosya: 0** (anasayfa fix sonrası) ✅ — başka swallow YOK.
- `^-.*{` flag'lenen 2 dosya **FALSE POSITIVE** (gerçek kayıp değil):
  - `bugun-ne-pisirsem`: 3× = benim BNP içerik edit'lerim (mdSave handler + toast fonksiyon imzası — JS, `{` içerir)
  - `hesabim`: 1× = profil teammate'in `.dz-row .btn` refine'ı (padding→height:38px, **değişti silinmedi**;
    HEAD'de 2 / şimdi 2). R2 bölgesi hesabim'da bitişikti, yutma yok.

> **Açık iş:** Lead'in 8-sayfa örneklem render probe'u. Sweep + anasayfa fix tarafımda kanıtlı tamam.

---

## 11 · BİLİNEN SINIRLAMALAR (ZORUNLU — peşinen işaretleme)

> Kural (lessons): çalışmayan/yarım/yanıltıcı görünebilecek HER ŞEY peşinen işaretlenir.

### KAPSAM DIŞI sayfalar — login-state header YOK (bilinçli)
Bu sayfalarda `?auth=1` denenirse **is-auth göstermez, avatar/dropdown çıkmaz** — hata DEĞİL, kapsam dışı:
- **6 shop sayfası** (dada-shop, urun-liste, urun-detay, sepet, odeme, siparislerim):
  bilinçli kabuk-sapması; kendi `lm-*` login modalı var (siparislerim hariç — o Shop II ailesinin sipariş
  hesabı), ana site auth akışına bağlı değil. is-auth SIZMAZ (tasarım).
  **NOT (revize tur 1):** `alisveris-listesi-v1` adına rağmen shop DEĞİL → ana-site, sweep'lendi.
- **panel ailesi** (panel-shell + 6 `dyt-*`) ve **hesaplayici-v1**: public chrome taşımaz (kılavuz §3b muaf) →
  header/drawer/bottom-nav login-state hiç yok.
- **7 `ref-*` klon** (food52/graza/mob/nyt/ourplace/refika/sakara): DadaMutfak chrome'u yok, dış site replikası.
- **tarif-detay-v1-headA.html**: header varyant deneyi, sweep dışı.

### Mockup davranış sınırları (gerçek backend YOK — Laravel fazı)
- **dm_auth = localStorage simülasyonu**; gerçek oturum/cookie yok. Durum yalnız `?auth=1/0` ile elle değişir,
  sekmeler arası localStorage ile taşınır. Gerçek login/logout yok.
- **lg-gate + yorum/kaydet gate'leri = mockup**; `?return=` paramı **dekoratif** (geri-dönüş Laravel fazında).
- **puf-noktasi-ekle + tarif-ekle**: form **mock** — gerçek upload/submit/taslak kaydı yok; "Onaya Gönder"
  yalnız `?state=review` bandına geçirir. Görseller örnek Unsplash, dosya seçici tetiklenmez.
- **reCAPTCHA/captcha YOK** (M5 — Laravel fazı, mockup'ta yer tutucu bile yok, bilinçli).
- **Adresler / Kuponlar / Fatura kapsam dışı** (M4 — shop/Laravel tarafı).

### Davranışsal incelikler (çalışır ama dikkat)
- **Kaydet gate (tarif-detay/BNP):** logged-out'ta lg-gate **modalı** sweep sonrası aktif. Sweep ÖNCESİ
  fallback giriş-yönlendirme idi; artık modal (`window.__lgGate`) gelir. İkisi de aksiyonu engeller.
- **Card-level `.r-save`:** İA §1.1 "sadece detayda" der ama yeni mockup ilgili tarif kartlarında da `.r-save`
  taşıyor → İA §5 "tüm .r-save/.p-fav" gereği **hepsi** gate'li (detay hero + ilgili kartlar). İtiraz olursa daraltılır.
- **3 inline sayfa (puf-detay/tarif-detay/bnp):** chrome `dm_auth` yerine **inline dm_auth** kullanır
  (çift-enjeksiyon guard'ı). Davranış aynı; sadece kod yerleşimi farklı.
- **puf-ekle kullanılmayan stepper CSS:** zararsız ölü kod (eşleşen element yok), bırakıldı.

### Doğrulama sınırı
- **Konsol-hata sayımı:** headless Chrome `--dump-dom` ile DOM/state doğrulandı; **konsol error sayımı CLI'da
  yapılmadı**. Net "konsol 0" kanıtı lead'in 8-sayfa MCP probe'unda gelecek (MCP browser bende yok — lead kararı).
- **390px taşma:** statik + tek-katman §3b miras üzerinden güvenli; sayısal 390 taşma ölçümü lead probe'unda.

### Persona
- Header/drawer persona **Elif Şahin / @elifsahin** (İA §2.3). Profil `mutfak-defteri` dün İA kanonuna döndü
  (lead teyit: Ayşe→Elif) → **tutarlı, açık tereddüt YOK**.

### Çözülen (artık sınırlama DEĞİL)
- **anasayfa-portal-v3a CSS-yutma** (revize tur 2): R1 region-swap 308 satır page CSS yutmuştu →
  HEAD'den restore + elle insert-patch ile **çözüldü**, 5/5 kriter kanıtlı (§10). Hero/searchcard stilli,
  390=375 taşma 0. **Diğer 54'te benzer swallow YOK** (net-negatif 0, tarama temiz).

### LESSON ADAYI (lead task #4 — handoff/lessons)
- **Region-swap sweep'te CSS-survival doğrulaması ZORUNLU:** anchor'lar arası mesafe sayfadan sayfaya
  değişir (v3a interleaved CSS); `[start,end)` region geniş eşleşip page CSS/markup YUTABİLİR. Sweep
  dry-test'i yalnız *additions* değil, **deletions/survival** de ölçmeli (satır-sayısı net-pozitif +
  bilinen page-CSS marker korundu mu, ör. cat-track count). CSS bloğu eklemeleri **region-swap değil
  INSERT** olmalı; region-swap'lara **span-guard** (>N char ABORT) konmalı. (R6 overlay-silme + R1
  CSS-yutma = aynı dersin iki yüzü.)
