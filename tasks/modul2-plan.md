# Modül 2 Planı — Üyeden Üyeye Ücretli Abonelik (madde 30)

> Dalga 2 / Modül 2. **Research tamamlandı** (`tasks/modul2-research.md` + 3 paralel Explore).
> Bu dosya implement öncesi plan; onay bekliyor. Kod yok, dosya değişikliği yok.
> Kurallar: targeted edit, full-file write YOK, header'a dokunma, mevcut anatomiyi türet,
> yeni renk YOK (tomato `#E14827` + mevcut tokenlar), tüm görseller `div+bg-image`.

---

## 0. Beyar Kararları (2026-06-18, kilitli)

| # | Karar |
|---|-------|
| Model | **İçerik üyeliği (Patreon)** — sürekli premium içerik erişimi, aylık tekrarlı; randevu/seans'tan ayrı |
| Kim sunar | **Her üye** (normal üye `mutfak-defteri` profili dahil) |
| Yerleşim | Ayrı **"Üyelik"** sekmesi + hero CTA |
| Terim | Bölüm "Üyelik", CTA **"Üye Ol"** (ücretsiz takip "Abone Ol"dan ayrı) |
| §5.1 Üretici yönetimi | **A** — mutfak-defteri own-mode + hesabim'de **hafif** (koyu panel YOK) |
| §5.2 Kademe | **A** — tek aylık "Üyelik" planı (`.svc-card`); markup çoklu-kademeye hazır |
| §5.3 Kilit | Üreticinin "üyelere özel" işaretlediği tarif/püf/menü → member-gate + "Üyelere Özel" bandı |
| §5.4 Uzmanlar | **Faz-1 = mutfak-defteri** (normal üye + şef); diyetisyen/antrenör opsiyonel sonraki adım |
| §5.5 Checkout | Yeni **`uye-abonelik-odeme-v1.html`** (pro-odeme kopyası, `?creator=&plan=`); pro-odeme'ye dokunma |

---

## 1. Research Özeti — Kavranan Anatomi (doğrulanmış satır referansları)

### A. `mutfak-defteri-v1.html` (own↔public profil) — ana hedef dosya
- **Tab sistemi generic:** `.pf-tabs .dt[data-tab]` + `.pf-pane[data-pane]` (HTML 1706-1713; JS `activate()` 2834-2848). **Yeni sekme = bir `.dt` + eşleşen `.pf-pane` + `valid[]` dizisine ekle** (JS 2827-2829, own/public iki set).
- **Own↔public mod:** `?view=public` → `body.pf-public` (JS 2818). Aksiyon setleri `.pf-act-own` / `.pf-act-public` (CSS 785-787; HTML `.pf-actions` 1681-1687). Sayaç şeridi `.pf-stats` (1691-1698).
- **★ Hazır gate deseni `.pf-fgate`** (CSS 833-845; JS `renderFollow`/`?takip=1` 2853-2870; markup `.pf-lock`+`.pf-full` 1937-1946): public+takip yoksa pane kilitli. **Member-gate bunun birebir kardeşi** olacak (aşağıda §3).
- **`.pf-lock` boş-durum bileşeni** (CSS 835-842): `.pl-ico` + h3 + p + `.pl-cta` (tomato buton) + `.pl-hint`. Üye-gate kilidinde "Üye Ol" CTA'sıyla reuse.
- Tokenlar: `--tomato`, `--tomato-tint`, `--tomato-dark`, `--muted`, `--line`, `--paper`, `--radius-*`, `--sh-*`, `--ease`. Hepsi mevcut.

### B. Checkout zemini — `pro-odeme-v1.html` (KOPYALANACAK, dokunulmayacak)
- `.wiz-grid` (form + aside) · sticky **`.plan-sum`** özet (`.ps-head`/`.ps-tier`/`.ps-feats`/`.ps-total`/`#startSub`) HTML 1304-1326.
- **`PLANS` JS objesi `?plan=` ile seçilir** (1761-1767); canlı kart önizleme; `body.pay-done` başarı state (`?ok=1` veya `#startSub` + agree checkbox kontrolü) 1798-1812; başarı section 1332-1344.

### C. Üretici editör/yönetim desenleri (port kaynağı)
- **Plan/ücret editörü:** `dyt-profil-ayar-v1.html` `.svcr-row` repeater (ad·tür·süre·ücret `.fk-suffix ₺`·aktif `.tgl`·`.irow-del`) 790-807.
- **Tek-paket aylık kart:** `diyetisyen-profil-v1.html` `.svc-card` ("₺2.200 / ay") 1636-1672; "Üyelere Özel" bandı için `.pf-pro-band` 1712.
- **Abone listesi:** `dyt-danisanlar-v1.html` `.ptable` + `.pstat` durum rozeti. KPI: `panel-shell` `.kpi-grid`.

### D. `hesabim-v1.html` (subscriber'ın ödediği üyelikler)
- Aynı tab sistemi `#hsTabs` `.dt[data-tab]` + `.pf-pane[data-pane]` (1434-1438); JS `show()` + `?tab=` (2081-2131). **Yeni sekme = bir `.dt` + `.pf-pane`** (JS generic, ek kod gerekmez).

---

## 2. Veri Modeli (paylaşılan kontrat — public görüm + checkout + own kurulum + gate AYNI alanları okur)

```
ÜyelikPlanı {
  baslik:        string    // "Elif'in Mutfağı Üyeliği"
  fiyat:         number     // 49  → public/checkout "₺49"
  periyot:       "ay"       // aylık (faz-1 sabit)
  avantajlar:    [string]   // tick listesi: ne sunuluyor (özel tarifler, erken erişim, soru-cevap...)
  kilitliIcerik: [Kart]     // üyelere özel tarif/püf/menü kartları (r-card/puf-card türevi)
}
Durum:  is-member            // üye mi? — ?uye=1 deep-link ile açılır (renderFollow kardeşi renderMember)
Creator: { handle, ad, avatar }  // checkout ?creator= ile özet doldurur
```
- **Drift yok:** Public görüm plan kartı alanları (başlık/fiyat/avantaj) = checkout `.plan-sum` alanları (`#psName`/`#psPrice`/`#psFeats`) = own editör input alanları. Modul1'deki "tek kontrat" deseninin aynısı.

---

## 3. Dosya Bazında Targeted Edit Planı (full-file write YOK)

### Dosya 1 — `mutfak-defteri-v1.html` (AĞIR, tek-owner) — Üyelik sekmesi + member-gate + hero CTA

**3.1 CSS (mevcut `.pf-fgate` bloğunun 845 sonrasına, mirror):**
```
/* ÜYE GEÇİDİ (member-gate) — pf-fgate kardeşi, is-member ile */
body.pf-public:not(.is-member) .pf-mgate > .pf-full{display:none}
body.pf-public:not(.is-member) .pf-mgate > .pf-lock{display:block}
/* Üyelik sekmesi own↔public alt-görüm (pf-act-own/public deseni) */
.pf-mpublic{display:none}            /* public modda görünür */
body.pf-public .pf-mpublic{display:block}
body.pf-public .pf-mown{display:none}
```
+ "Üyelere Özel" bandı (`.pf-pro-band` token dili) + plan kartı (`.svc-card` reuse) + own yönetim hafif stilleri (KPI şeridi `.kpi-*` mini, abone satırı `.ptable`/`.pstat` mini). **Yeni renk YOK.**

**3.2 HTML — hero aksiyon (`.pf-actions` 1681-1687):** `.pf-act-public` grubuna "Takip Et"ten sonra:
`<button class="pf-member pf-act-public" id="pfMember" type="button"><i class="fa-solid fa-star"></i> Üye Ol</button>` (tomato primary). `is-member` iken "Üyelisin ✓" state.

**3.3 HTML — yeni sekme (`.pf-tabs` 1706-1713 sonu):**
`<button class="dt" type="button" data-tab="uyelik"><i class="fa-solid fa-star"></i> Üyelik</button>` (sıra: Tarifleri → Püf → **Üyelik** → Kaydedilenler...). Öneri: Üyelik'i Püf'ten sonra, içerik sekmelerinin yanına.

**3.4 HTML — yeni pane (`.pf-pane[data-pane="uyelik"]`, son pane'den sonra):** iki alt-görüm:
- **`.pf-mpublic`** (ziyaretçi → katılma teklifi):
  - `.svc-card` türevi plan kartı: başlık + `₺49 / ay` + avantaj tick listesi + **"Üye Ol"** CTA → checkout.
  - Member-gated "Üyelere Özel" blok: `<div class="pf-mgate">` içinde `.pf-lock` (üye değilse: `.pl-ico` + "Üyelere Özel İçerik" + "Üye Ol" `.pl-cta`) + `.pf-full` (üyeyse: 3-4 `r-card`/`puf-card` "Üyelere Özel" rozetli).
- **`.pf-mown`** (kendi defterin → hafif yönetim):
  - KPI mini şeridi (aktif abone · aylık gelir · bu ay yeni).
  - Tek-plan editörü: `.svcr-row` türevi (plan başlığı · fiyat `.fk-suffix ₺` · aktif `.tgl`) + "Avantaj Ekle" repeater (sade) — **markup çoklu-kademeye hazır, faz-1 tek satır**.
  - Abone listesi: `.ptable` mini (avatar+ad · başlangıç · durum `.pstat`).
  - Not: "ağır yönetim = sonraki adım" yorum satırı.

**3.5 JS:**
- `valid` dizilerine (2827-2829) **own ve public ikisine** `'uyelik'` ekle.
- `renderFollow` (2853-2866) **kardeşi `renderMember(on)`**: `body.classList.toggle('is-member',on)` + `#pfMember` label/icon toggle ("Üye Ol" ↔ "Üyelisin ✓"); `?uye=1` ile başlat; member-gate `.pl-cta`'lar (`[data-member-cta]`) ve `#pfMember` tıklayınca **checkout'a git** (`uye-abonelik-odeme-v1.html?creator=elifsahin&plan=uyelik`) — mock akış. `?uye=1` deep-link QA için doğrudan açar.
- `activate()` generic → değişiklik YOK.

### Dosya 2 — YENİ `uye-abonelik-odeme-v1.html` (checkout)
`pro-odeme-v1.html` **kopyası** (kanonik "yeni sayfa = en yakın akraba kopyası"). Değişiklikler:
- `PLANS` → **`CREATORS` map** (handle → {ad, avatar, planBaslik, fiyat, avantajlar}); `?creator=` + `?plan=` okur (default elifsahin).
- `.plan-sum` özeti creator'a göre dolar: `.ps-tier` "Elif'in Mutfağı Üyeliği", `.ps-tag` "Elif Şahin'e aylık üyelik · istediğin an iptal", `#psPrice`, `#psFeats`.
- `#startSub` metni "Üyeliği Başlat"; başarı section "**Elif'in üyeliği başladı 🎉**"; başarı CTA → `mutfak-defteri-v1.html?view=public&uye=1` (gate açık döner) + "Üyeliklerim" → `hesabim-v1.html?tab=uyelikler`.
- Kart formu + agree + `body.pay-done` + canlı önizleme **verbatim**. Header'a dokunma.

### Dosya 3 — `hesabim-v1.html` (subscriber'ın ödediği üyelikler)
- Yeni sekme (`#hsTabs` 1438 sonu): `<button class="dt" data-tab="uyelikler" role="tab" aria-selected="false"><i class="fa-solid fa-star"></i> Üyeliklerim</button>`.
- Yeni `.pf-pane.hs-col[data-pane="uyelikler"]`: ödenen üyelikler listesi (creator avatar+ad · plan · `₺/ay` · sonraki yenileme · "İptal Et" ghost). Boş-durum (`.pf-empty` deseni).
- JS generic (`show()` + `?tab=`) → **ek JS gerekmez**.

**Dokunulan dosyalar:** `mutfak-defteri-v1.html` (Üyelik sekmesi + member-gate + hero CTA + CSS/JS) · YENİ `uye-abonelik-odeme-v1.html` · `hesabim-v1.html` (1 sekme + 1 pane). **`_shell.html` ve header'a DOKUNULMAZ** (sayfa-yerel gate).

---

## 4. Domain Analizi — TEK CC (research'te kararlaştı)

`mutfak-defteri-v1` hem consumer (public görüm) hem üretici (own yönetim) tarafından dokunuluyor → **tek-owner zorunlu** (modul1'deki mekan-detay durumu). Paylaşılan veri-modeli + `is-member` gate kontratı bölünmeyi pahalı kılar. Tüm pattern'lar hazır (pf-fgate, svc-card, pro-odeme, svcr-row, ptable) → port işi. **TEK CC, sıralı alt-adımlar:** (1) checkout sayfası, (2) mutfak-defteri Üyelik sekmesi + gate, (3) hesabim Üyeliklerim, (4) doğrula.

---

## 5. DONE Kriteri + Doğrulama Planı

**DONE:**
- [ ] mutfak-defteri "Üyelik" sekmesi: tıklanınca pane açılıyor, `?tab=uyelik` deep-link çalışıyor; public modda plan kartı + "Üye Ol" + member-gated "Üyelere Özel" blok render; own modda hafif yönetim (KPI + plan editörü + abone listesi).
- [ ] Hero "Üye Ol" CTA (public) → checkout'a gidiyor; `is-member` iken "Üyelisin ✓".
- [ ] Member-gate: `?view=public` (üye değil) → "Üyelere Özel" blok kilitli (`.pf-lock`); `?view=public&uye=1` → blok açık (`.pf-full`). Follow-gate'ten bağımsız çalışıyor (Kaydedilenler/Menüler bozulmadı).
- [ ] `uye-abonelik-odeme-v1.html`: `?creator=&plan=` özeti dolduruyor; "Üyeliği Başlat" + agree → `body.pay-done` başarı; başarı CTA profile `?uye=1` ile dönüyor.
- [ ] hesabim "Üyeliklerim" sekmesi: `?tab=uyelikler` açıyor, ödenen üyelik listesi render.
- [ ] Diğer sekmeler/akışlar bozulmadı; header değişmedi; yeni renk yok; tüm görseller div+bg-image.

**Doğrulama (her çıktı için — "bitti" auto-accept yok):**
1. **Render SS** 3 viewport (1440/768/390) → `outputs/`. Self-verify: Üyelik plan kartı hizası, member-gate kilit vs açık state, own yönetim grid mobil reflow, checkout `.plan-sum` sticky→static reflow.
2. **Playwright davranış testi:**
   - mutfak-defteri: "Üyelik" tab click → `#pane uyelik.active` + URL `?tab=uyelik`; `?view=public` kilit görünür, `?view=public&uye=1` blok açık; "Üye Ol" → checkout URL. console/pageerror temiz.
   - checkout: `?creator=elifsahin&plan=uyelik` → özet dolu; agree işaretsiz "Üyeliği Başlat" → uyarı; işaretli → `body.pay-done`.
   - hesabim: `?tab=uyelikler` → pane görünür.
3. **Yazılı rapor** (ne değişti + kontrol sonucu), crop yok.

---

## 6. Kalan Küçük Kararlar (seçenekli — Beyar onayı/öneri)

1. **"Üyelere Özel" içeriğin yeri.** (A) **[ÖNERİLEN]** Faz-1'de toplu blok = Üyelik sekmesi içinde (demo + temiz, gate aç/kapa net görünür). (B) Tarifleri/Püf sekmelerine serpiştirilmiş kilitli kartlar (daha gerçekçi ama dağınık, sonraki adım). Öneri A.
2. **"Üye Ol" CTA davranışı.** (A) **[ÖNERİLEN]** Checkout sayfasına git (gerçek akış — modülün amacı bu); QA `?uye=1` ile direkt açar. (B) Mockta CTA direkt `is-member` toggle (checkout'u atlar — önermiyorum, yeni checkout'u görünmez kılar). Öneri A.
3. **Sekme sırası.** Öneri: Tarifleri → Püf Noktaları → **Üyelik** → Kaydedilenler → ... (içerik sekmelerinin hemen yanı). Alternatif: en sona. Öneri: Püf'ten sonra.
4. **Persona plan içeriği.** Elif Şahin için örnek üyelik: "Elif'in Mutfağı Üyeliği · ₺49/ay" + avantajlar (haftalık özel tarif, erken erişim, üyelere özel menüler, soru-cevap). Mock değer; onay/ince ayar Beyar'da.
