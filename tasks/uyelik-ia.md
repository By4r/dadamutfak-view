# DadaMutfak — CİLA-2 FAZ 2 · Üyelik / Profil Modülü Bilgi Mimarisi (İA)

> Sahip: **akis-mimar** · Takım: cila2-faz2 · Statü: Lead onayı bekliyor
> Tarih: 2026-06-12. Kaynaklar: eski site `dada-mutfak-icerik/` (4 Explore
> envanteri) + yeni mockup ailesi (giris/onboarding/hesabim/bildirimler/
> mutfak-defteri/tarif-ekle/BNP/puf-detay/shop) + `_shell.html` chrome +
> `bilesen-kilavuzu.md` + `lessons.md` (L1 envanter kuralı).

**Ana tez:** Yeni mockup'ta üyelik ailesinin **büyük kısmı zaten doğdu** (Dalga
3 auth + profil dili). Faz 2 esas işi yeni sayfa üretmek DEĞİL; mevcut sayfaları
**tek tutarlı kullanıcı akışına bağlamak** (login simülasyonu + header
login-state), **tek gerçek boşluğu** doldurmak (püf noktası ekleme sayfası) ve
**giriş kapılarını** (yorum/kaydet/takip) kurmaktır. Yeni hero/icat son çare —
neredeyse hiç gerekmiyor.

---

## 1 · ESKİ SİTE ÜYELİK ENVANTERİ (L1) + DİFF TABLOSU

### 1.1 Eski üyelik sayfaları — blok özeti

**AUTH (ayrı sayfalar, sekme DEĞİL):**
- **giris.html** — 1.video hero, 2.form (email, şifre+göz, **görsel doğrulama
  kodu** 4 hane, Beni Hatırla), 3.sosyal: **Facebook + Google**, 4.hata bantları,
  5.alt link "Hesap oluştur" + "Şifremi unuttum".
- **kayit.html** — ad, soyad, email, **telefon**, şifre+tekrar (güç göstergesi),
  görsel doğrulama kodu, **KVKK & Aydınlatma** zorunlu checkbox. Sosyal login
  YOK. Alt link "Giriş Yap".
- **sifremi-unuttum.html** — email + doğrulama kodu + "Bağlantı gönder".
- **uyelik-sozlesmesi.html** — yasal metin (içerik yer tutucu).

**HESAP & PROFİL:**
- **hesabim.html** (306KB — **14 bölüm**): (1) Hesap Bilgilerim (+ hesap dondur/
  sil), (2) Şifre & Mail değişikliği, (3) İletişim/bildirim tercihleri, (4)
  Takipçilerim, (5) Takip Ettiklerim, (6) İçeriklerim (Tariflerim + Püf
  Noktalarım), (7) Taslaklarım (+9 rozet), (8) Menülerim (accordion), (9) Tarif
  Defterim (kaydedilenler), (10) Keşfettiklerim (geçmiş), (11) Siparişlerim, (12)
  Adreslerim (teslimat+fatura), (13) Kuponlarım, (14) Favorilerim. Üstte avatar/
  banner yükleme + istatistik şeridi (takipçi/tarif/püf). Sidebar 2 grup:
  "DadaMutfak" + "Dada Store". → **eski site profil + ayar + ticaret hesabını TEK
  dev sayfada topluyor.**
- **kullanici-profili.html** (133KB — **public profil**): avatar + @handle +
  derece rozeti + istatistik + **Takip Et** butonu; 3 sekme (Takipçileri / Takip
  Ettikleri / İçerikleri [Tarifleri+Püf]). İçerik **read-only** (edit/sil yok).
- **menulerim.html** (74KB): menü koleksiyonu accordion; menü oluştur/düzenle/sil,
  menüye tarif ekle/çıkar. Breadcrumb "Bugün Ne Pişirsem > Menülerim".

**KATKI (içerik üretimi):**
- **tarif-ekle.html** — 4 adımlı wizard (Bilgi → Görseller → Künye/Malzeme →
  Adımlar) → "Onaya Gönder" → tarif-onay.html.
- **tarif-duzenle.html** — aynı, pre-filled.
- **tarif-onay.html** — başarı: "Tarifiniz onaya gönderildi · Taslaklarım".
- **puf-noktasi-ekle.html** — **tek adım** + TinyMCE + dinamik içerik blokları
  (Başlık / Paragraf / Resim / Video ekle) → puf-nokta-onay.html.
- **puf-noktasi-duzenle.html** / **puf-nokta-onay.html** — düzenle + başarı.
- **fatura.html** — sipariş faturası (PDF/yazdır).

**ÜYELİK DOKUNMA NOKTALARI (tüm sayfalara dağılmış):**
- Header: logged-out → "Giriş Yap" + "Kayıt Ol"; logged-in (template kodda yorum
  satırı) → **bildirim zili** + "Tarif/Yazı Ekle ▾" (Tarif/Püf) + "Hesabım ▾"
  (Hesabım, Takipçilerim, Takip Ettiklerim, Tariflerim, Püf Noktalarım,
  Kaydedilenler, Çıkış).
- **Kaydet** (bookmark) — tarif-detay (`saveRecipe()`); kartlarda yok, sadece
  detayda.
- **Yorum** — tarif-detay, puf-noktalari-detay, mutfaga-giris-detay, kesfet-detay,
  urun-detay, diyetisyen-profili: hepsi **login-gate** ("Yorum yapabilmeniz için
  üye girişi yapmanız gerekmektedir") + giriş yapınca form (yaz / beğen / cevapla
  / bildir).
- **Takip Et / Takibi Bırak** — sefler, diyetisyenler, kullanici-profili,
  diyetisyen-profili (`.follow-btn`/`.unfollow-btn`).
- **Menü aksiyonları** — bugun-ne-pisirsem(-liste): Tarif Ekle/Çıkar, Sil, Düzenle,
  Deftere Kaydet.
- **Ticaret** — sepete ekle (anonim olabilir), ödemeye git (gate), siparişler.

### 1.2 Diff tablosu — eski → yeni mockup

| Eski yapı | Karşılık (yeni mockup) | Durum |
|---|---|---|
| giris.html | **giris-v1.html** `?tab=giris` (au-*, sosyal Google+FB) | ✅ Karşılandı (evrim) |
| kayit.html | **giris-v1.html** `?tab=kayit` (ayrı sayfa → **sekme**) | ✅ Karşılandı (birleşti) |
| sifremi-unuttum.html | **giris-v1.html** `?tab=sifre` | ✅ Karşılandı (birleşti) |
| uyelik-sozlesmesi.html | **yasal-v1.html** (mevcut yasal ailesi) | ✅ Karşılandı |
| Görsel doğrulama kodu (captcha 4 hane) | — | ⚠️ Bilinçli atıldı (reCAPTCHA v3 invisible — Laravel fazı) |
| hesabim → Hesap/Şifre/Gizlilik/Bildirim | **hesabim-v1.html** (SADECE ayarlar) | ✅ Karşılandı (sadeleşti) |
| hesabim → İçeriklerim/Menülerim/Defter/Favoriler/Takipçi | **mutfak-defteri-v1.html** (profil + 6 sekme + flw-modal) | ✅ Karşılandı (profile taşındı) |
| kullanici-profili.html (public) | **mutfak-defteri-v1.html** `?view=public` (aynı sayfa, mod) | ⭐ Karar: ayrı sayfa değil, **mod** |
| menulerim.html | **mutfak-defteri-v1.html** `?tab=menuler` + BNP köprüsü | ✅ Karşılandı (tab oldu) |
| hesabim → Taslaklarım (+9) | mutfak-defteri Tariflerim/Püf sekmesinde **durum filtresi** (Yayında/Taslak/Onayda) | ⭐ Karar gereken (aşağıda M3) |
| hesabim → Keşfettiklerim (geçmiş) | — | ⚠️ Bilinçli atıldı (düşük değer, modern site göstermiyor) |
| hesabim → Siparişlerim | **siparislerim-v1.html** (Shop II ailesi, mevcut) | ✅ Karşılandı (shop tarafı) |
| hesabim → Adreslerim / Kuponlarım | shop hesap tarafı | ⚠️ Karar gereken (M4 — kapsam) |
| hesabim → Favorilerim (ürün) | shop favorileri (urun kart `.p-fav`) | ✅ Karşılandı (shop tarafı) |
| tarif-ekle.html (4 adım) | **tarif-ekle-v1.html** (4 adım wizard, sbanner) | ✅ Karşılandı |
| tarif-duzenle.html | tarif-ekle-v1 `?mode=edit` (pre-filled) | ⭐ Karar: ayrı sayfa değil, mod |
| tarif-onay.html (başarı) | tarif-ekle-v1 `?state=review` sbanner | ✅ Karşılandı (banda döndü) |
| **puf-noktasi-ekle.html** | — | 🔴 **BOŞLUK → tek gerçek yeni sayfa (aşağıda §3)** |
| puf-noktasi-duzenle / puf-nokta-onay | puf ekle `?mode=edit` / `?state=review` | ⭐ Mod ile |
| Header logged-in (zil + ekle + hesabım ▾) | **YOK** (yeni shell hep logged-out) | 🔴 **BOŞLUK → login-state (aşağıda §2)** |
| Yorum login-gate (5 detay sayfası) | puf-detay `.rev-form` **gate'siz açık** | 🔴 **BOŞLUK → giriş kapısı (aşağıda §5)** |
| Kaydet/bookmark (giriş kapısı) | `.r-save` toggle var, **gate yok** | 🔴 Boşluk → giriş kapısı |
| Takip Et / Takibi Bırak | mutfak-defteri `.pf-follow`, diyetisyen-profil takip | 🟡 Kısmen — gate + state |
| fatura.html | Laravel fazı (handoff "Laravel listesi" md.1) | ⚠️ Ertelendi |

**Özet:** eski 14-bölümlü dev `hesabim` → yeni mimaride **3 net role bölündü**:
**Defter** (kimlik+içerik), **Hesabım** (ayar), **Shop hesabı** (ticaret).

---

## 2 · YENİ KULLANICI AKIŞI KURGUSU

### 2.1 Giriş / kayıt noktaları — SAYFA mı MODAL mı? (gerekçeli karar)

**Karar: Ana site = tam SAYFA (`giris-v1.html`); Shop = MODAL (mevcut `lm-*`);
mikro-aksiyon kapıları = hafif yönlendirme.**

Gerekçe:
- `giris-v1.html` zaten zengin split-auth sayfası (au-* iskelet, 3 sekme, sosyal
  login, fayda paneli). SEO + paylaşılabilir URL + `?tab=` derin link için
  **sayfa** doğru tercih. İkinci bir tam modal inşa etmek dil tekrarı olur.
- Shop ayrı kabuk (bilinçli sapma); kendi `lm-modal` login'i var, sepet akışını
  bölmemek için modal mantıklı — **dokunma, olduğu gibi kalsın.**
- Logged-out kullanıcı giriş-gerektiren mikro-aksiyona (yorum/kaydet/takip)
  basınca → tam sayfaya gitmek akışı kesmesin diye **hafif "giriş kapısı"
  bileşeni** (login-gate) gösterilir; CTA → `giris-v1.html?return=<sayfa>`.
  (Mockup'ta `return` dekoratif; Laravel fazında geri-dönüş.)

**Login-gate bileşeni (yeni, hafif — etkilesim üretir):** `_shell.html`'e
eklenecek küçük popover/mini-modal `lg-gate` (görüş-bildir modalı `fb-modal`
z-index/grid pattern'ından miras; YENİ ağır modal değil). İçerik: kilit ikonu +
"Bu işlem için giriş yap" + iki buton (Giriş Yap → giris-v1, Üye Ol →
giris-v1?tab=kayit). `body.is-auth` iken hiç açılmaz.

### 2.2 Login sonrası HEADER durumu (login-state) — 🔴 ana boşluk

Şu an `_shell.html` her sayfada **logged-out**: `.head-actions` = `[Ara]
[Giriş Yap] [☰]`. Yeni logged-in durumu eklenir.

**Header sağ bölge (`.head-actions`) iki durum:**

- **Logged-out (varsayılan):** `[🔍 Ara] [Giriş Yap btn-login] [☰]` — mevcut.
- **Logged-in (`body.is-auth`):**
  `[🔍 Ara] [➕ Ekle ▾] [🔔 zil (badge)] [avatar ▾] [☰]`
  - **➕ Ekle ▾** dropdown: "Tarif Ekle" (tarif-ekle-v1) · "Püf Noktası Ekle"
    (puf-noktasi-ekle-v1 — YENİ).
  - **🔔 zil** → bildirimler-v1.html (okunmamış nokta `.pb-dot` benzeri sayaç).
  - **avatar ▾** dropdown (Elif Şahin — site personası):
    Mutfak Defterim (mutfak-defteri-v1) · Tariflerim (defter `?tab=tarifler`) ·
    Kaydedilenler (defter `?tab=kaydedilenler`) · Menülerim (defter
    `?tab=menuler`) · Bildirimler · Ayarlar/Hesabım (hesabim-v1) · ─ · Çıkış.

**Drawer (mobil):** `drawer-foot`'taki "Giriş Yap" butonu → logged-in'de
avatar satırı (avatar + ad + "Defterim/Ayarlar/Çıkış" mini-liste). "Tarif Ekle"
zaten var; "Püf Ekle" eklenir.

**Bottom-nav (mobil):** "Hesap" öğesi zaten `hesabim-v1.html`'e gidiyor →
logged-in'de hedef `mutfak-defteri-v1.html` olur (profil), `hesabim` ayarlara
dropdown'dan ulaşılır. (Veya "Hesap" → defter sabit kalsın, gate JS hedefi
değiştirir — etkilesim kararı, küçük.)

**Mekanizma:** `_shell.html`'e **her iki blok** gömülür; CSS ile gizlenir:
```
.acct-wrap,.head-add,.head-bell{display:none}
body.is-auth .btn-login{display:none}
body.is-auth .acct-wrap,body.is-auth .head-add,body.is-auth .head-bell{display:flex}
```
JS body class'ı set eder (§2.4). Böylece **markup tek**, durum tek class ile
döner — sweep idempotent olur.

### 2.3 Login simülasyon mekanizması — somut spesifikasyon

`?dd=1 / ?drawer=1 / ?cc=1` pattern'ıyla uyumlu, üstüne **localStorage
kalıcılığı** (sayfalar arası gezerken durum kaybolmasın diye):

**Sözleşme:**
- `?auth=1` → localStorage `dm_auth='1'` yaz, `body.is-auth` ekle (logged-in).
- `?auth=0` → localStorage'dan sil, `body.is-auth` kaldır (logout simülasyonu).
- Param yoksa → localStorage `dm_auth`'a bak; '1' ise logged-in, değilse out.
- **Çıkış** linki → `?auth=0`'a yönlendirir (veya JS ile localStorage temizle +
  anasayfaya git).

**`_shell.html` JS (mevcut `?dd=1` bloğunun hemen yanına, satır ~1010):**
```js
// ===== Login-state simülasyonu (mockup) =====
(function(){
  var qs = location.search;
  if(qs.indexOf('auth=1')>-1){ try{localStorage.setItem('dm_auth','1');}catch(e){} }
  else if(qs.indexOf('auth=0')>-1){ try{localStorage.removeItem('dm_auth');}catch(e){} }
  var authed = false;
  try{ authed = localStorage.getItem('dm_auth')==='1'; }catch(e){}
  if(authed){ document.body.classList.add('is-auth'); }
})();
```
- **Hangi DOM bloğu değişir:** yalnız `.head-actions` (desktop) + `drawer-foot`
  (mobil) + bottom-nav "Hesap" hedefi. Gövde sayfaları DOM değişmez; sayfa-içi
  gate'ler (yorum/kaydet) `body.is-auth` kontrolüne bakar.
- **SS/inceleme:** `?auth=1` ile logged-in, `?auth=0` ile logged-out hâli tek
  URL'den gösterilebilir (Beyar iki durumu da görebilir).
- **Persona:** tek mock kullanıcı **Elif Şahin** (handoff site-geneli persona).
  Avatar + ad shell'e statik gömülür.

### 2.4 Akış diyagramı (metin)

```
[Logged-out gezinme]
  Anasayfa / liste / detay
    │  Giriş Yap (header)──────────► giris-v1.html?tab=giris
    │  Kayıt (header/CTA)──────────► giris-v1.html?tab=kayit ──► onboarding-v1
    │  Yorum yaz / Kaydet / Takip ─► [lg-gate popover] ─► giris-v1?return=…
    ▼
[giris-v1] ──başarı──► (yeni üye) onboarding-v1 (4 adım tercih) ──► anasayfa(is-auth)
            └─────────► (mevcut üye) geldiği sayfa (is-auth)

[Logged-in gezinme] body.is-auth
  Header: [Ara][➕Ekle▾][🔔][avatar▾]
    ├─ ➕Ekle ▸ Tarif Ekle ─► tarif-ekle-v1 (wizard ─► ?state=review onaya)
    │         ▸ Püf Ekle  ─► puf-noktasi-ekle-v1 (YENİ; ─► ?state=review)
    ├─ 🔔 ──────────────────► bildirimler-v1
    └─ avatar ▾
         ├─ Mutfak Defterim ─► mutfak-defteri-v1 (own; banner/avatar düzenle)
         │     tabs: Tarifleri·Püf·Menüleri·Kaydedilenler·Favorileri·Denedikleri
         │     Tarifleri/Püf ▸ durum filtresi (Yayında/Taslak/Onayda) [M3]
         ├─ Ayarlar/Hesabım ─► hesabim-v1 (profil·şifre·gizlilik·bildirim·danger)
         └─ Çıkış ───────────► ?auth=0 (logged-out)

[Başka kullanıcı profili]
  mutfak-defteri-v1?view=public ─► [Takip Et] + sadece public tab'lar (read-only)

[BNP köprüsü]
  bugun-ne-pisirsem-v1 ─ menü kur (Değiştir/Çıkar/Kap Ekle/Adını Değiştir)
    └─ "Deftere Kaydet" ─► toast + mutfak-defteri-v1?tab=menuler (menu-card)
```

---

## 3 · PROFİL SAYFA HARİTASI (yeni doğan / evrim + miras referansı)

> Kural: yeni hero icat edilmez; en yakın akraba sayfanın anatomisi miras alınır.

| Sayfa | Durum | Miras anatomisi (kılavuz §) | Notlar |
|---|---|---|---|
| **giris-v1.html** | Mevcut — bağla/cilala | §2d auth ailesi `au-*` + `fk-pass/fk-eye` | `?tab=giris\|kayit\|sifre`; sosyal Google+FB; kayıt sonrası onboarding'e köprü netleşsin |
| **onboarding-v1.html** | Mevcut — bağla | §2c stepper + §2d `tgl` + `fk-*` | 4 adım tercih; bitince anasayfa(is-auth) |
| **hesabim-v1.html** | Mevcut — SADECE ayar | §2b `pf-tabbar/pf-tabs` + `fk-*` + `tgl` | profil·şifre·gizlilik·bildirim·danger; **içerik/koleksiyon YOK** |
| **mutfak-defteri-v1.html** | Mevcut — own+public **mod** | §2b profil dili `pf-*` (banner/ava/stats/tabbar) + `badge-band` + `flw-modal` | own: banner/ava düzenle + "Profili Düzenle"; `?view=public`: "Takip Et" + read-only |
| **bildirimler-v1.html** | Mevcut — bağla | §2d `nt-*/ntr-*` | zil → buraya; `?filter=` + `?empty=1` |
| **puf-noktasi-ekle-v1.html** | 🔴 **YENİ** | §2b form kiti `fk-*` + `up-*` + `sbanner` + `tips-card` (kaynak `tarif-ekle-v1`) | **Tek adım** (eski puf-ekle gibi), 4-adım wizard DEĞİL. Başlık + kapak/galeri + içerik blokları (paragraf/görsel/video — `st-*` adım kartı dilinden uyarlanır) + `?state=draft\|review\|rejected`. Hero = tarif-ekle'nin below-header + page-head'i (yeni hero YOK) |
| tarif-ekle-v1.html | Mevcut — durum modları | §2b/§2c | `?mode=edit` pre-filled (= eski tarif-duzenle); `?state=` (= eski tarif-onay) |
| kullanici-profili (eski) | **Ayrı sayfa AÇILMAZ** | — | mutfak-defteri-v1 `?view=public` modu olur |
| menulerim (eski) | **Ayrı sayfa AÇILMAZ** | — | mutfak-defteri-v1 `?tab=menuler` olur |

### 3.1 hesabim-v1 ↔ mutfak-defteri-v1 kavramsal sınır (KİLİT)

- **Mutfak Defteri = KİMLİK + İÇERİK** (profil hero, sayaçlar, takipçi modalı,
  rozetler; sekmeler: ürettiği/kaydettiği/denediği içerik + menüler). Hem **own**
  (düzenlenebilir) hem **public** (takip edilebilir, read-only) modda render olur
  — Instagram/Refika tek-profil pattern'ı. Eski `kullanici-profili.html` bunun
  public modudur, ayrı dosya değil.
- **Hesabım = AYAR** (hesap yönetimi: profil alanları, şifre, gizlilik, bildirim
  tercihleri, tehlikeli bölge). İçerik/koleksiyon GÖSTERMEZ. Yalnız own.
- **Köprü:** Defter own-mode "Profili Düzenle" butonu → `hesabim-v1?tab=profil`.
  Hesabım üst kimlik şeridinde "Defterime Git" → `mutfak-defteri-v1`.

### 3.2 own ↔ public mod spesifikasyonu (mutfak-defteri-v1)

`?view=public` paramı (yoksa own). own modunda `body`'ye sınıf yok; public'te
`pf-public`:
- own: `.pf-actions` = "Profili Düzenle" + "Paylaş"; banner/avatar düzenle ikonu
  görünür; tab seti **tam** (Kaydedilenler/Favorileri/Denedikleri dahil — private).
- public: `.pf-actions` = "Takip Et"/"Takibi Bırak" (`.pf-follow`) + "Paylaş";
  düzenle ikonları gizli; tab seti **kısıtlı** (Tarifleri · Püf Noktaları ·
  Menüleri — yalnız public). Kaydedilenler/Favorileri/Denedikleri GİZLİ.
- Mekanizma: `?view=public` → `document.body.classList.add('pf-public')`; CSS
  private tab/butonları gizler. (Profil teammate'in işi; tek dosya.)

---

## 4 · BNP KÖPRÜSÜ (menü = kullanıcı koleksiyonu)

Handoff bağlayıcı: BNP menüleri = kullanıcının kaydedip düzenleyebildiği
koleksiyon. İA'da yeri:

- **bugun-ne-pisirsem-v1** menü kurar (mod → menü → kap aksiyonları: Değiştir ·
  Çıkar · Kap Ekle · Adını Değiştir). Bunlar **oturum-içi düzenleme**.
- **"Deftere Kaydet"** → menü, **mutfak-defteri-v1 `?tab=menuler`** koleksiyonuna
  yazılır (menu-card). Mockup davranışı: logged-in ise toast "Defterine
  kaydedildi" + (opsiyonel) defter menüler sekmesine git linki; logged-out ise
  **lg-gate** ("kaydetmek için giriş yap").
- **Defter tab ayrımı (netleştirme):**
  - **Tarifleri** = kullanıcının ÜRETTİĞİ tarifler (yazar; durum filtreli).
  - **Menüleri** = kaydettiği/kurduğu **menü koleksiyonları** (BNP + manuel).
  - **Kaydedilenler** = tekil bookmark'lı tarifler.
  - **Favorileri** = beğeni (kalp) tarifler.
  - **Denedikleri** = "denedim" notu bırakılan tarifler (`try-note`).
  Dördü ayrı kavram; Faz 1'de doğan 6 sekme bunu zaten karşılıyor.
- **Sahiplik:** BNP dosyasının köprü ucunu **etkilesim** yazar; defter Menüleri
  sekmesinin alıcı ucu **profil**'in dosyasında zaten var → çakışma yok.

---

## 5 · PÜF YORUMLARI → ÜYE AKIŞI BAĞLANTISI

Handoff bağlayıcı: `puf-noktasi-detay-v1` `.rev-*` yorum bölümü üye akışına
bağlanır. Şu an **gate yok** (form direkt açık).

**Karar — login-gate'li yorum:**
- **Logged-out:** `.rev-form` collapse'ı (`rf-text` 46px) **giriş daveti**ne
  döner: "Yorum yapmak için giriş yap" (kilit ikonu + Giriş Yap/Üye Ol linkleri,
  lg-gate dilinde). Form açılmaz. Yorum **listesi** (`rev-list`) ve özet
  (`rev-summary`) herkese açık kalır (okuma serbest — eski site davranışı).
- **Logged-in (`body.is-auth`):** form normal açılır (yıldız + textarea + gönder);
  `c-acts` Beğen/Yanıt/Bildir aktif.
- **Aynı pattern** `tarif-detay-v1` yorum bölümüne ve `.r-save`/`.p-fav` kaydet
  aksiyonlarına uygulanır (logged-out → lg-gate; logged-in → toggle çalışır).
- Eski sitedeki 5 detay sayfası gate'i tek mekanizmaya (`body.is-auth` +
  `lg-gate`) indirgenir. Mockup'ta diğer detaylar (mutfaga-giris, kesfet, urun)
  da aynı dile bağlanabilir — Faz 2 çekirdeği puf + tarif-detay; gerisi
  site-sweep sırasında opsiyonel (lead kararı).

---

## 6 · İKİ TEAMMATE — DOSYA SETİ BÖLÜŞÜMÜ (çakışma SIFIR)

> Kural (lessons): ortak chrome (`_shell.html`) site-geneli sweep'i **faz
> sonuna** ertelenir; aktif çalışmada her dosya tek sahipte.

### 👤 PROFİL teammate — auth + profil + ayar
**Sahip olduğu DOSYALAR (yalnız bunları düzenler):**
- `giris-v1.html` — `?tab=` akışı + kayıt→onboarding köprü netliği + sosyal login cila
- `onboarding-v1.html` — 4 adım + bitiş→anasayfa(is-auth) köprüsü
- `hesabim-v1.html` — ayar sayfası; "Defterime Git" köprüsü + danger zone
- `mutfak-defteri-v1.html` — own↔public **mod** (`?view=public`, `pf-public`);
  Menüleri sekmesi BNP'den gelen menüyü gösterir; "Profili Düzenle"→hesabim köprüsü
- `bildirimler-v1.html` — zil hedefi olarak hizalama + `?filter=`/`?empty=`

### 🔗 ETKİLEŞİM teammate — katkı + aksiyon + chrome login-state
**Sahip olduğu DOSYALAR (yalnız bunları düzenler):**
- `tarif-ekle-v1.html` — `?mode=edit` + `?state=` modları; tariflerim durum köprüsü
- `puf-noktasi-ekle-v1.html` — 🔴 **YENİ** (tarif-ekle fk-*/sbanner/tips mirası, tek adım)
- `bugun-ne-pisirsem-v1.html` — "Deftere Kaydet" köprüsü (→ defter `?tab=menuler`) + lg-gate
- `puf-noktasi-detay-v1.html` — `.rev-form` login-gate (logged-out→davet)
- `tarif-detay-v1.html` — yorum gate + `.r-save` kaydet gate
- `_shell.html` — login-state markup (`.acct-wrap`/`head-add`/`head-bell` + drawer
  avatar satırı) + `dm_auth` JS + `lg-gate` bileşeni

### ⚙️ FAZ-SONU SWEEP (lead / koordineli — teammate'ler dosyalarını kapatınca)
- `_shell.html`'deki login-state header bloğu **68 sayfaya** idempotent script ile
  yayılır (Faz 1 dropdown sweep pattern'ı, lessons "paralel takım fazı" kuralı).
- Sweep sonrası: (1) negatif grep (`btn-login VAR ama .acct-wrap YOK`), (2) shop
  kabuğu (ayrı `lm-*` login) sızıntı grep'i — shop'a is-auth header SIZMAMALI,
  (3) 4+ aileden örnek sayfada `?auth=1`/`?auth=0` render probe.

**Çakışma analizi:** Kaydedilenler/Favoriler **defter sekmesi** (profil dosyası)
≠ kaydet **aksiyonu** (`.r-save` toggle, etkilesim — liste/detay dosyaları).
Aynı dosyaya iki teammate dokunmaz. BNP köprüsü: BNP dosyası=etkilesim, defter
dosyası=profil. `_shell.html`'i yalnız etkilesim düzenler; profil yeni sayfa
üretmediği için shell'e dokunmaz.

---

## 7 · TEREDDÜTLER / LEAD KARARI GEREKEN

- **M1 — lg-gate kapsamı:** Login-gate yalnız puf-detay + tarif-detay'a mı, yoksa
  tüm yorum/kaydet taşıyan detaylara (mutfaga-giris, kesfet, urun, diyetisyen) da
  mı uygulansın? Öneri: Faz 2 çekirdeği = puf + tarif-detay; gerisi opsiyonel
  sweep. **Onay?**
- **M2 — Sosyal login seti:** giris-v1 Google+FB; shop modalı Google+**Apple**.
  Tutarlı olsun mu (ana site de Apple eklesin / shop FB'ye dönsün)? Handoff
  "patron bekleyenler md.9: sosyal login seti (FB?)" zaten açık. **Patron kararı.**
- **M3 — Taslak/Onay görünürlüğü:** Eski "Taslaklarım (+9)" ayrı sekme. Öneri:
  defter Tariflerim/Püf sekmesinde **durum chip filtresi** (Yayında/Taslak/Onayda)
  — ayrı sekme açma. Kabul mü, yoksa ayrı "Taslaklarım" sekmesi mi? **Onay?**
- **M4 — Ticaret hesabı kapsamı:** Adreslerim / Kuponlarım Faz 2'de mi (hesabim
  ayar sekmesi veya shop hesabı) yoksa shop/Laravel fazına mı? siparislerim-v1
  zaten var. Öneri: Faz 2 dışı (shop tarafı), flag. **Onay?**
- **M5 — Captcha:** Eski giris/kayıt görsel doğrulama kodu vardı; yeni mockup'ta
  yok. reCAPTCHA v3 invisible Laravel fazına bırakıldı (global kural). Mockup'ta
  hiç göstermeyelim mi (öneri: evet, yer tutucu bile koymayalım)? **Onay.**
- **M6 — Bottom-nav "Hesap" hedefi:** logged-in'de Defter mi, Hesabım mı olsun?
  Öneri: Defter (profil ana giriş). Küçük, etkilesim halleder. **Tercih?**
- **M7 — Çıkış davranışı:** `?auth=0` + anasayfaya yönlendirme yeterli mi, yoksa
  "Çıkış yapıldı" ara ekranı mı? Öneri: param + anasayfa, ara ekran yok. **Onay.**
- **M8 — onboarding tetikleyici:** Her kayıttan sonra zorunlu mu, "Atla"
  linkiyle geçilebilir mi (mevcut `wf-skip` var)? Öneri: atlanabilir. **Onay.**

---

---

## 8 · LEAD KARARLARI — İA KİLİTLENDİ ✅ (team-lead, 2026-06-12)

> FULL AUTO modu: kararlar lead tarafından verildi, tereddüt kalanlar faz sonu
> sentez raporunda "Beyar incelemesi bekleyenler" altına taşınır.

- **M1 — lg-gate kapsamı:** ÖNERİ KABUL. Faz 2 çekirdeği = puf-noktasi-detay +
  tarif-detay. Diğer detaylar (mutfaga-giris, kesfet, urun, diyetisyen) Faz 2'de
  DOKUNULMAZ — sentez raporuna "Faz 3 adayı" olarak not edilir.
- **M2 — Sosyal login seti:** DOKUNMA. giris-v1 Google+FB kalır, shop modalı
  Google+Apple kalır — patron kararı (handoff md.9) gelmeden hizalama yapılmaz.
  Sentez raporunda "patron bekleyen" olarak kalır.
- **M3 — Taslak/Onay:** ÖNERİ KABUL. Defter Tariflerim/Püf sekmesinde durum chip
  filtresi (Yayında/Taslak/Onayda); ayrı Taslaklarım sekmesi AÇILMAZ.
- **M4 — Adresler/Kuponlar:** ÖNERİ KABUL. Faz 2 DIŞI (shop/Laravel tarafı);
  sentez raporuna flag.
- **M5 — Captcha:** ÖNERİ KABUL. Mockup'ta hiç gösterilmez, yer tutucu da yok
  (reCAPTCHA v3 invisible Laravel fazı — global kural).
- **M6 — Bottom-nav "Hesap":** ÖNERİ KABUL. Logged-in'de hedef mutfak-defteri-v1
  (Defter); logged-out'ta giris-v1. Mekanizma: JS hedef değiştirme (etkilesim,
  shell login-state bloğunun parçası).
- **M7 — Çıkış:** ÖNERİ KABUL. `?auth=0` + anasayfaya yönlendirme; ara ekran YOK.
- **M8 — Onboarding:** ÖNERİ KABUL. Atlanabilir (`wf-skip` mevcut); kayıt sonrası
  varsayılan rota onboarding, "Atla" → anasayfa(is-auth).

**Sweep sahipliği (netleştirme):** `_shell.html` login-state bloğunu ETKİLEŞİM
yazar (kendi dosya setinde); 68-sayfa yayılım sweep'i FAZ SONUNDA, profil
dosyalarını kapattıktan ve lead onay verdikten sonra ETKİLEŞİM koşar (idempotent
script + negatif grep + shop sızıntı grep'i + lead'in 8-sayfa örneklem probe'u).

> İA KİLİTLİ — profil & etkilesim §6 dosya setleriyle paralel üretime geçer.
> Bu dosyada bundan sonra değişiklik yalnız lead onayıyla.
