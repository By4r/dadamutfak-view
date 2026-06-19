# Faz 3 — Hesap & Abonelik & İşletme & Marka Mimarisi · PLAN

> Karar dökümanı. Envanter/teşhis: `tasks/faz3-envanter.md`. UI yerleşim gerekçeleri için
> bkz. Faz 3 yerleşim önerisi (oturum geçmişi). **Kod yok** — bu belge implement girdisidir.

## Kök Teşhis

**Kimlik (kim) ile hak (entitlement) tek hesap omurgasında birleşmiyor; markalar köprüsüz
adacıklar.** Platform "tek hesap / tek Pro / tek arama" diyor ama auth, e-ticaret kimliği,
işletme erişimi, abonelik ve arama marka-başına ayrı ve köprüsüz. (Detay: `tasks/faz3-envanter.md`.)

## Kararlar (best practice — onaylandı)

- **Store girişi:** Ayrı modal **KALIR** ama **tek DadaMutfak hesabına** bağlanır — tek kayıt
  sözleşmesi, `giris-v1` ile aynı kimlik. İki ayrı kayıt formu kalkar.
- **İşletme girişi:** Ayrı işletme hesabı **YOK**; tek hesap + **"işletme sahibi" rolü**. Ekleme iki
  yoldan:
  - (a) Kullanıcı başvurusu: hesabım **"İşletmem"** tab → "İşletmeni Ekle" → `isletme-ekle` formu.
  - (b) Admin panelden ekleme/onay.
  - **SAHİPLEN (claim) YOK** (mekan-detay claim şeridi bu turda yapılmıyor).
- **Context switch:**
  - Kişisel → İşletme: hesabım **"İşletmem"** tab içindeki **"Panele Git"**. *(Account dropdown'a
    EKLEME YOK — 86 sayfa shell senkron maliyeti alınmadı.)*
  - İşletme → Kişisel: panel topbar'ın **boş `.pnl-top-tools`** alanına **account chip** (tek dosya).
  - Her iki link **rol-koşullu**: `body.has-business` state (`is-auth` kardeşi).
- **Fiyat:** Tek kaynak (single source of truth) — plan sayfası ve checkout aynı fiyatı göstersin.
  **RAKAM Yasin Bey'e teyit ettirilecek** (`pro-v1` ₺0/99/199 vs `pro-odeme` ₺49/99/199 çelişkisi var).
  Implementte rakam yerine **"Yasin Bey onayı bekliyor"** notu düşülecek.
- **Pro vs creator membership:** **AYRI kalır**; isim/dil net ayrışır. "Üyeliklerim" ikisini **ayrı
  bölüm** gösterir.
- **Arama:** Bu tur **sadece brand-context + scope** — `body[data-brand]` + `arama-v1` scope + header
  arama brand taşıma. **Index genişletme** (mekan/akademi/fit entity) AYRI iş, bu turda **yok**.

## Implement Sırası

### Adım 0 — Paylaşılan omurga (TEK-AUTHOR, önce yap, sonra FREEZE)
- `body[data-brand="mutfak|store|akademi|fit"]` her shell'e → **brand-context primitifi**.
- `body.has-business` rol state'i (`is-auth` kardeşi) → işletme linkleri için.
- Shell-level senkron pass (madde-4 gibi tek-author). **Bittiğinde freeze; sonra paralel başlar.**

### Adım 1 — Bağımsız parçalar (PARALEL agent team, domain ayrık)
- **hesap:** `hesabım-v1` → **Adreslerim + Kartlarım + İşletmem + Aboneliğim** tab'leri + checkout
  adres bağlama.
- **admin:** admin panel → **İşletmeler** ekranı (başvuru onay + ekle) + **Abonelikler** gözetimi +
  ölü sidebar düğümlerini canlandır.
- **store+arama:** Store login modalını **tek-hesaba** bağla + `arama-v1` **brand-scope** + header
  arama **brand taşıma**.
- **abonelik:** `pro-v1`/`pro-odeme` **fiyat tek-kaynak** + Pro/membership **dil ayrışması**.

> Domain çakışması yok — her parça ayrı dosya seti.

### E-ticaret hub notu
Hesabım'a **Adreslerim + Kayıtlı Kartlar** eklenince checkout'un "kayıtlı adresinden seç" vaadi
gerçek olur.

## Bağımlılık & Disiplin

- Adım 0 → Adım 1 sıralaması **zorunlu**: brand-context ve `has-business` primitifleri shell'de
  oturmadan paralel parçalar onlara dayanamaz. Adım 0 freeze edilmeden Adım 1 başlamaz.
- Stack: saf vanilla HTML/CSS/JS, header her sayfada inline kopya. Full-file write yok → targeted edit.
  Yeni renk yok; görsel div+bg cover/center. Mevcut bileşen dili (`acct-menu`, `pf-tabs`, panel shell)
  korunur.
- Her iş: 3-viewport (1440/768/390) render + bağlantı/akış denetimi + Beyar gözle onay.

## Adım 2 — GLOBAL SHELL SENKRON TARAMASI (EN SON — tüm revizeler bittikten sonra)

**Sorun:** Marka shell'leri (header, en üst bant, ana nav, account dropdown, footer) her sayfada **AYRI
INLINE kopya**, senkron değil. Yapılan shell değişiklikleri tüm sayfalara yayılmamış → **divergence**.
Bilinen örnekler:
- Ana sayfa üst bandından "Diyetisyen Ara" kaldırıldı ama diğer sayfalarda/tab'lerde hâlâ görünüyor.
- Madde 14 Store "Mağaza" butonu sadece `dada-shop-v1`'de kaldırıldı; diğer Store sayfalarında
  (`urun-liste`, `urun-detay`, `sepet`, `odeme`) duruyor.
- Madde 4 account dropdown bildirim 86 sayfada yapıldı ama **shell tipleri arası tutarlılık doğrulanmadı**.

**İş:** Tüm mockup sayfalarındaki shell parçalarını tara; her shell tipi için **KANONİK** (en güncel/doğru)
versiyonu belirle; divergence taşıyan tüm sayfaları kanonik hale **senkronla**. Marka bazında ayrı kanonik
olabilir (**Mutfak / Store / Akademi / Fit** kendi shell'i). Targeted senkron, **full-file write YOK**.

**Adım 2 kapsamına eklenen revizeler (Adım 1 sonrası):**
- **Sağlıklı Yaşam header dropdown:** "Diyetisyen Ara" en ÜST sıraya alınsın (tüm sayfalarda tutarlı).
- **Menü dropdown'ları & tab'leri arası divider:** ince, modern, soft bir ayraç eklensin (tüm shell'lerde
  tutarlı; palet-içi, mevcut bileşen dili).
- **Header arama brand-taşıma:** her shell'in header arama ikonu `data-brand`'i `arama-v1`'e taşısın
  (`arama-v1.html?brand=<marka>` + yazılan q). Adım 1'de `arama-v1` `?brand=` okumayı destekliyor; taşıma
  ucu burada bağlanacak.
- **`#srBrandLabel`:** arama-v1 (ve gerekirse pro/checkout) başlığında aktif marka etiketi gösterimi.

**Neden EN SON:** Revizeler devam ederken shell değişiyor; tarama en sonda yapılmalı ki güncel kanonik
yakalansın.
