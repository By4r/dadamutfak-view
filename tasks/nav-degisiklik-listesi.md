# DadaMutfak — Nav / IA Değişiklik Listesi (Foundation F3 → Wave 3 sweep)

> **ŞİMDİ NAV'A DOKUNULMUYOR.** Bu doküman Wave 3'teki TEK idempotent chrome-sweep için hazır
> değişiklik listesidir. Foundation (F1/F2) bitti; nav eklemeleri buradan TEK pass'te yapılacak.
> Oluşturma: 2026-06-16. Kaynak: `tasks/revize-turu-plan.md` §8 + canlı grep sayımları.
>
> **İLKE:** Yeni top-level menü öğesi YOK (nav ~1040px'te sıkışık — handoff notu). Tüm eklemeler
> ya dropdown-içi, ya header aksiyon, ya etiket. Tek idempotent Python regex sweep (proje pattern'ı).

---

## 0. Canlı sayımlar (2026-06-16 grep)

| Hedef | Selector / anchor | Dosya sayısı |
|-------|-------------------|-------------:|
| Desktop sağlık dropdown | `.dropdown-health` (CSS+markup) | 57 |
| Drawer sağlık submenu | `.d-sub-health` | 57 |
| "Diyetisyen Ara" item (insert anchor) | `href="diyetisyen-dizin-v1.html"` | 73 |
| Header (Pro girişi yeri) | `.btn-login` / `.acct-menu` | 80 |
| Bottom-nav | `.bottom-nav` | 80 |

> ⚠️ **VARYANS (sweep'in dikkat etmesi gereken):** Wave 1'de üretilen 4 besin rehber sayfası
> (`besin-kalori-cetveli`, `protein-rehberi`, `karbonhidrat-rehberi`, `yag-rehberi`) eski/sade shell
> varyantı kullanıyor: desktop'ta `.dropdown` (health class YOK), drawer'da `.d-sub` (health YOK) ve
> drawer sağlık submenu'sünde **Testler item'ı eksik** (yalnız Hesaplayıcılar + Diyetisyen Ara).
> Sweep **href-agnostik** olmalı: "Diyetisyen Ara" satırını (`diyetisyen-dizin-v1.html`) anchor alıp
> ekleme yapmalı; class varyantına (`.dropdown` vs `.dropdown-health`) bağlanmamalı. (Prior round
> "saglik-dropdown" bu varyans dersini zaten kaydetti.)

---

## 1. DEĞİŞİKLİK 5b — Sağlıklı Yaşam dropdown'a "Besin Değerleri" (4 öğe)

**Neden:** Wave 1'de 4 besin rehber sayfası üretildi ama nav'a bağlı değil (bilinçli — breadcrumb/hub
üzerinden erişiliyor). Wave 3'te sağlık dropdown'una bağlanacak.

**Mevcut sağlık dropdown (desktop, 3 öğe):**
```
Hesaplayıcılar → hesaplayici-v1.html
Testler        → saglik-testler-v1.html
Diyetisyen Ara → diyetisyen-dizin-v1.html
```

**Eklenecek 4 öğe** (öneri: "Besin Değerleri" alt-başlığı altında grupla → 3+4 = düz 7 yerine
gruplu; düz 7 öğe de KABUL. Dropdown dikey, taşma riski düşük):
| Etiket | Hedef | İkon (FA6.5.2 free) |
|--------|-------|---------------------|
| Besin Kalori Cetveli | `besin-kalori-cetveli-v1.html` | `fa-fire-flame-curved` |
| Protein Kaynakları Rehberi | `protein-rehberi-v1.html` | `fa-drumstick-bite` |
| Karbonhidrat Kaynakları Rehberi | `karbonhidrat-rehberi-v1.html` | `fa-wheat-awn` |
| Yağ Kaynakları Rehberi | `yag-rehberi-v1.html` | `fa-bottle-droplet` |

- **Desktop:** "Diyetisyen Ara" `<a>`'dan SONRA 4 `<a>` ekle (aynı `.dropdown` içi markup deseni:
  `<a href><i fa><span>Etiket<small>alt</small></span></a>`). Gruplama istenirse `.dropdown` içine
  "Besin Değerleri" başlık `<span class="dd-group">` (yeni minik stil) + 4 öğe.
- **Drawer:** `.d-sub` / `.d-sub-health` içine "Diyetisyen Ara"'dan sonra 4 `<a>` (drawer sade deseni:
  `<a href><i fa> Etiket</a>`). Besin sayfalarında eksik olan **Testler** item'ı da bu sweep'te
  tamamlanabilir (tutarlılık) — opsiyonel, ayrı flag.
- **Kapsam:** ~57 dropdown-health + 4 besin sayfası (varyant) + drawer. Aktif-state: besin rehber
  sayfalarında dropdown current item `.active` (yeşil sağlık ailesi kanonu) eklenebilir — opsiyonel.

---

## 2. DEĞİŞİKLİK F1 — Header "Pro'ya Yükselt" girişi

**Neden:** F1 Pro üyeliği üretildi (`pro-v1.html`); kullanıcı her sayfadan erişebilmeli.

- **Avatar dropdown (logged-in `.acct-menu`):** "Ayarlar / Hesabım"'dan ÖNCE 1 satır:
  ```
  <a href="pro-v1.html"><i class="fa-solid fa-crown"></i> <span>Pro'ya Yükselt</span></a>
  ```
  (taç ikonu tomato; istenirse `.acct-pro` vurgu class'ı.)
- **Drawer-foot:** logged-in kimlik satırı yakınına aynı "Pro'ya Yükselt" linki (opsiyonel).
- **Logged-out header:** `.btn-login` yanına ikincil "Pro" linki EKLENMEZ (nav sıkışık) — Pro girişi
  avatar dropdown + drawer yeterli. (Patron isterse topbar `.tb-util`'a "Pro" eklenebilir → ayrı flag.)
- **Kapsam:** ~80 dosya (`.acct-menu` taşıyan public sayfalar). Idempotent.

---

## 3. DEĞİŞİKLİK 13 — Video Pro etiketi (Wave 2 madde 13 ile koordine)

**Neden:** Video premium içerik Pro kilidi (`.pro-gate`) alacak (Wave 2 T-D). Nav'da yeni öğe YOK;
yalnız işaret.

- Nav "Video Mutfağı" öğesine (varsa) küçük "Pro" rozeti EKLENMEZ — premium işareti içerik
  seviyesinde (`.pro-gate` + tier rozeti), nav'da değil. → **13 nav-sweep gerektirmez.** (Burada
  yalnız kayıt için; aksiyon Wave 2 madde 13'te içerik-içi.)

---

## 4. DEĞİŞİKLİK F2 — mutfak-defteri "Tüm Rozetler →" linki

**Neden:** F2 rozet galerisi üretildi (`rozetler-v1.html`); mutfak-defteri'ndeki teaser bağlanmalı.

- `mutfak-defteri-v1.html` `.badge-band` içindeki `<a class="see-all" href="#">Tüm Rozetler →</a>`
  → `href="rozetler-v1.html"`. **Tek dosya, tek satır.**
- **NOT:** Bu, Wave 2 madde 9 (T-E rozet dağıtımı) kapsamında da yapılabilir (mutfak-defteri'ye
  `.badge-band` dağıtımıyla birlikte). Wave 3 chrome-sweep'e DAHİL ETMEK ŞART DEĞİL — tek-dosya link
  düzeltmesi. Hangi wave yaparsa idempotent.

---

## 5. DOKUNULMAYACAKLAR (kritik)

- **Tarifler mega menü** + **Mutfak Sırları dropdown** → DOKUNULMAZ (kanon, kilitli).
- Sağlık dropdown YEŞİL chrome (#3BB77E) → KORUNUR (prior round kanonu); yeni besin öğeleri de
  yeşil aileye uyar.
- Yeni top-level nav öğesi YOK. Bottom-nav DOLU → yeni öğe eklenmez (mobilde Pro/besin = drawer).

---

## 6. SWEEP DOĞRULAMA PROTOKOLÜ (Wave 3)

1. **Negatif grep** (sweep öncesi): yeni öğeler hiçbir yerde yok (`besin-kalori-cetveli` nav linki = 0,
   `pro-v1.html` acct-menu linki = 0).
2. **İdempotent:** script 2× çalıştır → 2. çalıştırmada 0 değişiklik (md5 sabit).
3. **Pozitif grep:** 5b → 4 besin linki ~61 dosyada (57+4); F1 → "Pro'ya Yükselt" ~80 dosyada.
4. **Dropdown-açık SS:** 5 aileden (anasayfa, tarif-detay, saglik-hub, besin rehber, mutfak-defteri)
   sağlık dropdown + avatar dropdown açık render → besin öğeleri + Pro girişi görünür; Tarifler/Mutfak
   Sırları dropdownları DEĞİŞMEMİŞ; nav taşma YOK (1025px & 1280px overflow=false).
5. **Varyans teyidi:** 4 besin rehber sayfası (sade shell) da öğeleri aldı mı (href-agnostik anchor
   çalıştı mı) — ayrı kontrol.

---

## 7. Özet — Wave 3 sweep tek pass kapsamı

| # | Değişiklik | Selector/anchor | ~Dosya | Wave |
|---|-----------|-----------------|-------:|------|
| 5b | Besin Değerleri 4 öğe (dropdown+drawer) | `diyetisyen-dizin-v1.html` anchor | ~61 | **3** |
| F1 | "Pro'ya Yükselt" (avatar dropdown) | `.acct-menu` | ~80 | **3** |
| F2 | "Tüm Rozetler →" link fix | `mutfak-defteri .see-all` | 1 | 2 veya 3 |
| 13 | Video Pro (içerik-içi, nav DEĞİL) | — | 0 | 2 (içerik) |
