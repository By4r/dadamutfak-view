# Modül 2 Research & Scope — Üyeden Üyeye Ücretli Abonelik (madde 30)

> **Bu bir RESEARCH + SCOPE dosyasıdır, implement planı DEĞİL.** Dalga 2 / Modül 2.
> Bu turun tek çıktısı bu dokümanın `tasks/modul2-research.md` olarak yazılmasıdır
> (kod yok, mockup dosyası değişikliği yok). Onaylanırsa sıradaki tur = implement planı.
> Kurallar: targeted edit, header'a dokunma, mevcut anatomiyi türet, yeni renk yok, tomato `#E14827`.

---

## Context — Neden bu modül

Revize listesi madde 30: "Üyeden üyeye ücretli abonelik akışı". DadaMutfak bir
**kullanıcı-katkılı içerik topluluğu**; eksik olan, bir üyenin başka bir üyeye doğrudan
ödeyerek onun **premium içeriğine sürekli erişim** kazanması (Patreon/Substack modeli).
Bu, platforma ödenen genel Pro üyelikten ve ücretsiz takipten **ayrı 4. katmandır**.

**Beyar kararları (2026-06-18, widget):**
1. **Model:** İçerik üyeliği (Patreon) — sürekli premium içerik erişimi, aylık tekrarlı. Randevu/seans modelinden ayrı.
2. **Kim sunar:** **Her üye** (tam Patreon) — normal üye de (mutfak-defteri profili) abonelik açabilir, sadece doğrulanmış uzmanlar değil.
3. **Profil yerleşimi:** Ayrı "Üyelik" bölümü/sekmesi + hero CTA.
4. **Terminoloji:** Bölüm "Üyelik", CTA "Üye Ol" (ücretsiz takip "Abone Ol"dan ayrışsın).

---

## 1. Kavranan Anatomi — Mevcut Üyelik/Profil Ekosistemi

### 1a. KRİTİK: Zaten 3 katmanlı bilinçli üyelik modeli var (terim çakışması uyarısı)
`_shell.html` + `pro-v1.html`'de net ayrıştırılmış (pro-v1 SSS satır 1450 "ikisi tamamen ayrıdır" der):
- **`.creator-sub` / `[data-abone-takip]`** (`_shell.html:305`, JS 1386) = **ÜCRETSİZ takip**. Toggle "Abone Ol" ↔ "Abone Olundu ✓". Para yok, içerik açmaz. → **"Abone Ol" terimi DOLU.**
- **`.pro-gate` / `[data-pro-gate]`** = **platform geneli ücretli Pro** (DadaMutfak'a ödenir). Premium içerik kilidi. Tier'lar `pro-v1.html`, ödeme `pro-odeme-v1.html`.
- **`.lg-gate`** = login kapısı.
- **YENİ 4. katman (bu modül):** belirli bir ÜYEYE doğrudan ödenen ücretli abonelik → **"Üyelik" / "Üye Ol"** (çakışmayı önler).

### 1b. Profil aileleri — paylaşılan `.pf-` tasarım sistemi
- **Normal üye public profili = `mutfak-defteri-v1.html`** (own↔public mod, `?view=public` → `body.pf-public`). Ayar: `hesabim-v1.html`.
- **Uzman profilleri:** `diyetisyen-profil-v1.html` (`.pf-`, en olgun), `antrenor-detay-v1.html` (`.cp-`).
- Ortak header: `.pf-top > .pf-banner > .pf-head` (`.pf-ava` + `.pf-id` + **`.pf-actions`** CTA grubu) + `.pf-stats` + **`.pf-tabbar > .pf-tabs .dt` + `.pf-pane[data-pane]`** (generic tab — yeni sekme = bir `.dt` + eşleşen `.pf-pane`, modul1'deki mekan-detay ile aynı idiom).

### 1c. ★ HAZIR KİLİT MEKANİZMASI — `.pf-fgate` (mutfak-defteri)
`mutfak-defteri-v1.html:831–845`: public + **takip etmiyorsa** premium pane'i kilitler:
`body.pf-public:not(.is-following) .pf-pane.pf-fgate > .pf-full{display:none}` + `.pf-lock{display:block}`.
→ **Üye-gate bunun birebir kardeşi:** `is-member` varyantı (örn. `?uye=1`) + `.pf-lock`'a "Üye Ol" CTA. Yeni mekanizma icat YOK.

### 1d. Plan/fiyat + ödeme komponentleri (hazır, reuse)
- **Plan kartları:** `pro-v1.html` `.pro-grid` > `.pro-card.tN` (+ `.pro-flag` "En popüler", `.pro-price` `<b>₺99</b><span>/ay</span>`, `.pro-feats` tick listesi, `.pro-expand-btn`). Çoklu kademe için ideal.
- **Tek-paket aylık kart (yeşil):** `diyetisyen-profil-v1.html` `.svc-card` — zaten "₺2.200 / ay" tekrarlı paket içeriyor (satır 1648-1658). Tek-plan için daha yakın.
- **Checkout:** `pro-odeme-v1.html` — `.wiz-grid` (form + 360px aside), `.pay-grid` + canlı `.card-visual`, sticky **`.plan-sum`** özet, `#startSub` "Aboneliği Başlat", `body.pay-done` başarı state, `PLANS` JS + **`?plan=` deep-link** (satır 1761-1801). `?creator=&plan=`'a genelleştirilebilir.
- **Sözleşme/toggle:** `.agree>.cbx` onay kutusu, `.tgl .tk` anahtar (otomatik-yenileme).

### 1e. Üretici→tüketici ilişki + tier-editör (uzman tarafı — şablon)
- **Tier/ücret editörü:** `dyt-profil-ayar-v1.html` "Hizmet & Ücret" tab — **`.svcr-row` repeater** (ad · tür · süre · **ücret `.fk-suffix ₺`** · **aktif `.tgl`** · `.irow-del` sil), satır 790-807. Üyelik kademe editörünün birebir temeli.
- **Abone yönetimi:** `dyt-danisanlar-v1.html` `.ptable` + durum rozeti `.pstat` (Aktif/Onay Bekliyor/Pasif). KPI için `panel-shell` `.kpi-grid`.
- **Panel iskeleti:** `panel-shell.html` (koyu yeşil sidebar `.pnl-link`/`data-nav`). **DİKKAT: dyt-* paneli diyetisyen-spesifik** — "her üye" için normal üyenin koyu admin dashboard'u YOK; normal üye evi = mutfak-defteri + hesabim.

---

## 2. NET ÖNERİ — Abonelik Akışı (Patreon, her üye)

**Çekirdek akış:**
```
[Üretici (herhangi bir üye)]
  mutfak-defteri (own) → "Üyeliğini Aç" → kademe+fiyat+avantaj+kilitli içerik tanımla
        ↓ (yayında)
[Public profil] mutfak-defteri ?view=public
  yeni "Üyelik" sekmesi/bölümü: plan kartı + avantaj listesi + [Üye Ol] CTA
  premium pane'ler .pf-fgate (is-member) ile kilitli → "Üyelere Özel" rozeti
        ↓ [Üye Ol]
[Checkout] uye-abonelik-odeme-v1 ?creator=&plan=  (pro-odeme kopyası)
  → body.pay-done "Üyeliğin başladı" → profile dön (is-member, içerik açık)
        ↓
[Abone] "Üye Olduklarım" listesi (mutfak-defteri tab veya hesabim)
[Üretici] abone listesi + gelir KPI (dyt-danisanlar deseni, hafif)
```

**Aksan:** Domates `#E14827` (Pro ailesi tutarlılığı; pro-card/plan-sum zaten domates). Yeni renk yok. Panel-tarafı kullanılırsa kanonik yeşil.

**İçerik kilidi:** Üreticinin "üyelere özel" işaretlediği tarifler/püf/menüler → `.pf-fgate` (is-member) + "Üyelere Özel" bandı (mevcut `.pf-pro-band` deseni, `diyetisyen-profil:1712`).

---

## 3. Tahmini Sayfa/Dosya Listesi (implement turunda netleşir)

| # | Dosya | İş | Kaynak desen |
|---|-------|-----|--------------|
| 1 | **`mutfak-defteri-v1.html`** (AĞIR, tek-owner) | "Üyelik" sekmesi/bölümü (public görüm: plan kartı + [Üye Ol]) · own-mode "Üyeliğini Yönet" · `is-member` kilit (pf-fgate kardeşi) · "Üyelere Özel" rozet | `.pf-tabs/.pf-pane`, `.pf-fgate`, `.svc-card`/`.pro-card`, `.pf-actions` |
| 2 | **YENİ `uye-abonelik-odeme-v1.html`** | Üye-üye checkout, `?creator=&plan=` | `pro-odeme-v1` kopyası (`.wiz-grid`/`.plan-sum`/`pay-done`) |
| 3 | Üretici kurulum + abone yönetimi | Kademe/fiyat/avantaj editörü + abone listesi + gelir KPI | `dyt-profil-ayar` `.svcr-row` + `dyt-danisanlar` `.ptable`/`.pstat` + `.kpi-grid` — **yeri açık soru §5.1** |
| 4 | Abone "Üye Olduklarım" | Ödediğim abonelikler listesi/yönetimi | mutfak-defteri tab veya `hesabim-v1` bölümü |
| 5 | (ops.) `diyetisyen-profil` / `antrenor-detay` | Aynı "Üyelik" bölümü deseni | §5.4 |

Header'a dokunulmaz. Site-geneli member-gate gerekmez → `_shell.html`'e dokunmadan sayfa-yerel çözüm hedefi.

---

## 4. Domain Analizi — Tek CC mi, Modül-içi Team mi?

**Paylaşılan kontrat:** (a) abonelik plan veri modeli (ad/fiyat/periyot/avantaj/kilitli-içerik kademesi), (b) **üye-gate mekanizması** (`is-member`). Bu kontrat consumer-görüm + checkout + üretici-kurulum + kilit'i birbirine bağlar.

**Çakışma:** `mutfak-defteri-v1` hem consumer (public-mode görüm) hem üretici (own-mode yönetim) tarafından dokunulur → **tek-owner zorunlu** (modul1'deki mekan-detay ile aynı durum).

**KARAR: TEK CC, sıralı alt-adımlar** (modul1 ile tutarlı). Gerekçe: paylaşılan veri-modeli + gate kontratı bölünmeyi pahalı kılar; tüm pattern'lar hazır (pf-fgate, svc/pro-card, pro-odeme, svcr-row, dyt-danisanlar) → port işi, icat değil. **Not:** modul1'den meatier (~2-3 yeni yüzey + 1 ağır dosya + gate). Hız öncelikli olursa, plan kontratı (plan-modeli + is-member) sabitlendikten SONRA consumer-tarafı vs üretici-kurulum-sayfası 2 worktree'ye bölünebilir — ama mutfak-defteri tek-owner kalır. **Öneri: tek CC.**

---

## 5. Beyar'ın Karar Vermesi Gereken Açık Sorular (implement planı öncesi)

1. **Üretici yönetiminin yeri** — "her üye" seçildiği için: (A) **[ÖNERİLEN]** mutfak-defteri own-mode + hesabim içinde **hafif** yönetim (normal üyenin koyu admin dashboard'u yok; "her üye" ile tutarlı) · (B) yeni `panel-shell` tabanlı creator dashboard (uzmanlar için zengin ama normal üyeye ağır). Öneri A; çok büyürse panel-shell sayfasına terfi.
2. **Çoklu kademe mi tek plan mı** — (A) **[ÖNERİLEN]** tek aylık "Üyelik" planı ile başla (`.svc-card`), markup çoklu-kademeye hazır; (B) baştan çoklu kademe (`.pro-card` grid). Öneri A — en sade, sonra genişler.
3. **Hangi içerik kilitlenir** — Öneri: üreticinin "üyelere özel" işaretlediği tarifler/püf/menüler (pf-fgate + "Üyelere Özel" bandı). Onay/kapsam?
4. **Diyetisyen/antrenör de üyelik sunsun mu** — "her üye" → teknik olarak evet. Öneri: **faz-1 = mutfak-defteri (normal üye + şef)**; diyetisyen/antrenör'de zaten randevu/seans var → onlara üyelik bölümü opsiyonel ek (aynı desen, sonraki adım). Onay?
5. **Checkout** — Öneri: **yeni `uye-abonelik-odeme-v1.html`** (pro-odeme kopyası, `?creator=&plan=`). pro-odeme platform-Pro'ya kilitli, karıştırma. Onay?

---

## 6. Bu Turun Çıktısı (onay sonrası tek aksiyon)

Bu doküman `tasks/modul2-research.md` olarak yazılır. **Başka dosya değişikliği YOK.**
Beyar §5 sorularını yanıtladıktan sonra ayrı bir turda **implement planı** (modul1-plan.md formatında) hazırlanır.
