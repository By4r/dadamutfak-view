# CİLA-2 FAZ 2 · PROFİL teammate — Teslim Raporu

> Sahip: **profil** · Takım: cila2-faz2 · Task #2 · Tarih: 2026-06-12
> İA sözleşmesi: `tasks/uyelik-ia.md` (KİLİTLİ, §8 LEAD KARARLARI M1–M8).
> Tüm değişiklikler mevcut anatomiden miras; yeni hero/bileşen icat YOK.

## Özet

5 dosya cilalandı, **tek gerçek yapısal iş** mutfak-defteri own↔public mod
(İA §3.2) idi — birebir uygulandı. Geri kalan dosyalar büyük ölçüde
Dalga 3'te doğmuştu; köprü netleştirme + akış (`?auth=1`) + bekleyen borç
(38px) + M2/M3/M8 kararları işlendi. Hiçbir hero/breadcrumb kanonuna
dokunulmadı, radius token korundu, `*/` yorum tuzağı (lessons) tarandı (temiz).

---

## Dosya bazında değişiklikler

### 1. `mutfak-defteri-v1.html` — own ↔ public MOD (en kapsamlı iş)
**Miras:** mevcut `pf-*` profil dili (banner/ava/stats/tabbar) + `r-card`/`puf-card`
sistemleri VERBATIM korundu; yeni CSS yalnız mod-toggle kuralları.

- **own↔public mekanizması (İA §3.2):** `?view=public` → `body.pf-public`
  (JS). Param yoksa **own** (varsayılan). Title de moda göre değişir
  ("Mutfak Defterim" ↔ "Ayşe'nin Mutfak Defteri").
- **Aksiyon seti:** own = **Profili Düzenle** (`pf-edit-btn` → `hesabim-v1.html?tab=profil`
  köprüsü) + Paylaş; public = **Takip Et/Bırak** (`pf-follow`) + Paylaş.
  İki set markup'ta, CSS ile döner (`pf-act-own`/`pf-act-public`).
- **Düzenle ikonları (own-only, `pf-edit-aff`):** banner "Kapağı Değiştir"
  + avatar kamera rozeti. public'te gizli.
- **Kısıtlı sekme seti:** Kaydedilenler/Denedikleri/Favorileri sekmeleri+pane'leri
  `pf-priv` ile işaretli → `body.pf-public .pf-priv{display:none}`. public'te
  yalnız Tarifleri·Püf·Menüleri görünür (İA §3.2 birebir). JS'te public modda
  valid sekme seti de kısıtlı (özel sekme `?tab=` ile zorlanamaz → tarifler'e düşer).
- **M3 durum filtresi:** Tarifleri + Püf sekmelerine **Yayında/Taslak/Onayda**
  chip filtresi (ayrı "Taslaklarım" sekmesi AÇILMADI — İA M3). `data-status`'a
  göre kart süzme; taslak/onayda kartlarda `r-status`/`puf-st` rozeti.
  Yalnız own (taslak/onayda özel içerik → public'te filtre+rozet gizli).
- **Breadcrumb mod varyantı:** own "Mutfak Defterim" / public "Şefler > Ayşe Demir".
- Handle tutarlılığı: `@aysemutfakta` → `@aysedemir` (hesabim canonical ile eşitlendi).

**İnceleme URL'leri:**
- own: `/mockups/mutfak-defteri-v1.html` (Profili Düzenle + 6 sekme + durum filtresi + düzenle ikonları)
- public: `/mockups/mutfak-defteri-v1.html?view=public` (Takip Et + 3 sekme, read-only)
- `?tab=puf` (püf durum filtresi) · `?tab=menuler` · `?flw=1` (takipçi modalı) · `&empty=1`

### 2. `hesabim-v1.html` — ayar rolü + bekleyen borç
**Miras:** `pf-tabbar/pf-tabs` + `fk-*` + `tgl` + `danger-card` (mevcut).
- **BORÇ KAPATILDI:** `.dz-row .btn` → `height:38px;padding:0 18px` — "Hesabı Sil"
  (ve hizalı "Hesabı Dondur") 38px yükseklik standardına çekildi (revize-2 tereddütü).
- **"Defterime Git" köprüsü** netleştirildi (kitap ikonu + ok) → `mutfak-defteri-v1.html`.
- Sosyal giriş yöntemi **Apple → Facebook** (giris Google+FB ile içsel tutarlılık).
- İçerik/koleksiyon YOK (yalnız profil·şifre·gizlilik·bildirim·danger) — İA §3.1 sınırı korundu.
- İnceleme: `/mockups/hesabim-v1.html?tab=profil|sifre|gizlilik|bildirim`

### 3. `giris-v1.html` — akış + sosyal cila
**Miras:** `au-*` split-auth + `fk-pass/fk-eye` (mevcut).
- **Sosyal login Apple → Facebook** (giriş+kayıt pane, M2: Google+FB kalır, Apple eklenmedi).
- **Login başarı → `?auth=1`** (login-state simülasyonu): `?return=<sayfa>` varsa
  (whitelist `.html`) oraya, yoksa anasayfaya — her durumda `?auth=1` ekli.
- **Sosyal butonlar fonksiyonel:** giriş pane → `anasayfa?auth=1`; kayıt pane → `onboarding-v1.html`.
- Kayıt → onboarding köprüsü (mevcut `kayitOk`) korundu.
- İnceleme: `?tab=giris|kayit|sifre` · `?err=1` · `?return=tarif-detay-v1.html`

### 4. `onboarding-v1.html` — atlanabilir + bitiş köprüsü
- **M8 global atla:** bnp-head'e "Şimdilik geç, sonra ayarlarım →" → `anasayfa?auth=1`
  (per-adım `wf-skip` zaten vardı).
- **Bitiş → `?auth=1`:** "Keşfetmeye Başla" → `anasayfa?auth=1`; "Hesap Ayarlarım" → `hesabim?auth=1`.
- İnceleme: `?step=1..4` · `?sonuc=1`

### 5. `bildirimler-v1.html` — zil hedefi + derin link
- **`?filter=<takip|yorum|begeni|siparis|sistem>`** derin link desteği eklendi
  (zil/menü hedefinden gelir; ilgili chip aktive + uygula). `?empty=1` zaten vardı.
- **Revize tur 1 (lead):** beğeni bildirimi aktörü "Elif Şahin" → "Ayşe Demir"
  (kullanıcı artık Elif olduğundan kendine-bildirim okunuyordu). Aktör değişti,
  "sana/seni" bağlamı korundu. hexdump teyidi `c5 9f` ✓, mojibake temiz.
- İnceleme: `?filter=yorum` · `?empty=1`

---

## Kanıt (headless Chrome probe + SS)
- own/public toggle: `body.pf-public` + title doğru döndü (DOM dump).
- SS doğrulandı: defter own (Profili Düzenle/6 sekme/durum filtresi/düzenle ikonu),
  defter public (Takip Et/3 sekme/filtre+rozet gizli), giris kayıt (Google+Facebook),
  onboarding (global atla görünür), hesabim (Defterime Git + 38px danger), bildirimler
  (`?filter=yorum` yalnız yorum satırları).
- `*/` yorum tuzağı (lessons) taraması: 5 dosya temiz.
- JS hatasız (mod toggle / deep-link davranışları çalıştı = fatal hata yok).

---

## TEREDDÜTLER (lead / Beyar incelemesi)

1. **Persona tutarlılığı (ÇÖZÜLDÜ — lead kararı 2026-06-12):** Lead, İA §2.3 kanonu
   uyarınca site personasını **Elif Şahin** olarak sabitledi. Own-küme TAMAMI
   (defter own + hesabim + onboarding) **Ayşe Demir → Elif Şahin / @elifsahin**,
   e-posta `elif.sahin@eposta.com` olarak hizalandı (defter: title/banner/h1/handle/
   crumb-public/flw-modal/boş durumlar + JS public title; hesabim: kimlik şeridi/
   Ad/Soyad/kullanıcı adı/defter URL/e-posta ×2; onboarding: hoş geldin + hazırsın).
   Byte-safe Edit ile yapıldı (perl -CSD KULLANILMADI); "Şahin" hexdump teyidi
   `c5 9e` ✓, mojibake (Å) taraması temiz, kalan "Ayşe/ayse" izi YOK. "Selin Demir"
   (denedikleri yazarı) ve bildirimler'deki "Elif Şahin" (bildirim aktörü) ayrı
   kişiler — dokunulmadı. SS: own+public modu Elif Şahin ile doğru render.
2. **defter tek kimlik:** §3.2 yalnız aksiyon/affordance/sekme farkı tarifliyor;
   kimlik takası istemiyor → tek kimlik (**Elif Şahin**, lead kararı) korundu
   (own=Elif kendi defterini, public=ziyaretçi Elif'i görür). Public modun farklı
   bir kullanıcı göstermesi istenirse JS ile kimlik-swap eklenebilir.
3. **M2 sosyal set (patron bekliyor):** giris + hesabim Apple→Facebook yapıldı
   (Google+FB içsel tutarlılık). Shop modalı (Google+Apple) DOKUNULMADI (etkilesim/diğer).
   Nihai set patron kararına bağlı.
4. **is-auth / lg-gate:** shell login-state + lg-gate etkilesim domaini. Defter own
   modu `?view` ile sürülüyor (İA §3.2), `dm_auth`'a değil. own modu da auth-gate
   istenirse küçük ekleme yeterli.

---

## BİLİNEN SINIRLAMALAR (Beyar zorunlu kuralı — çalışmayan/yarım/yanıltıcı her madde)

> Bu sayfalar **saf frontend mockup**; backend/oturum yok. "Çalışıyor" = mockup
> davranışı (param/JS toggle/yönlendirme). Aşağıdakiler peşinen işaretlidir.

- **Header login-state (is-auth) — SWEEP SONRASI aktif:** `?auth=1` şu an yalnız
  `localStorage dm_auth` yazıp `body.is-auth` ekleyen **shell** bloğuna bağlı; bu
  blok henüz 68 sayfaya yayılmadı (faz-sonu sweep, etkilesim). **Bugün
  `anasayfa?auth=1` açılınca header görünür şekilde değişmez** — login-state header
  markup'ı sweep'le gelecek. Benim 5 sayfam shell'i bekler; sayfa-içi davranışlar
  (defter own/public, durum filtresi) is-auth'tan bağımsız çalışır.
- **Login / kayıt / şifre formları DEKORATİF:** gerçek kimlik doğrulama yok.
  "Giriş Yap" yalnız alanlar dolu+geçerliyse `?auth=1` ile yönlendirir (mock).
  Ön-dolu demo şifresi (`giPass`) gerçek değil — patron tek-tık demosu için.
- **Sosyal login (Google/Facebook) butonları:** giriş pane'inde `anasayfa?auth=1`'e,
  kayıt pane'inde `onboarding`'e yönlendirir — gerçek OAuth YOK (mock). Nihai
  sosyal set patron kararı bekliyor (M2).
- **`?return=<sayfa>` DEKORATİF-kısmi:** whitelist'li `.html` ise login sonrası
  oraya `?auth=1` ile döner; aksi halde anasayfa. İA §2.1: tam geri-dönüş Laravel fazı.
- **"Profili Düzenle"/"Defterime Git"/"Kapağı Değiştir"/avatar düzenle:** köprü/ikon
  yerinde; gerçek upload/kaydetme YOK (mock). hesabim "Kaydet" butonları yalnız
  "Kaydedildi" rozeti gösterir.
- **Durum filtresi (M3) — gösterimsel:** sayfada görünen 8 tarif/4 püf kartı üzerinde
  süzme yapar (etiketsiz=yayinda); çip sayaçları (128/120/5/3) gerçek veriyle
  eşleşmez (mockup rakamı). "Daha Fazla Yükle" statik.
- **public mod tek profil:** `?view=public` aynı kişiyi (Elif Şahin) ziyaretçi
  gözüyle gösterir; ayrı kullanıcı veritabanı yok (tek dosya mockup).
- **lg-gate (yorum/kaydet/takip giriş kapısı):** profil dosyalarımda YOK — etkilesim
  domaini (puf-detay/tarif-detay + shell). Defter kartlarındaki `r-save` kalp
  toggle'ı gate'siz görsel toggle.
- **Bottom-nav "Hesap" hedefi (logged-in→defter, M6):** JS hedef değişimi shell/
  etkilesim login-state bloğunun parçası — sweep sonrası aktif.
- **Diğer:** dil seçici/çerez/görüş-bildir = shell mock davranışı; flw-modal takip
  butonları yalnız metin toggle'lar (kalıcılık yok).
