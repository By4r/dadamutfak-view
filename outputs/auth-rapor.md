# Dalga 3 — AUTH Teammate Raporu (F6)

> Sayfalar: `giris-v1.html` · `onboarding-v1.html` · `hesabim-v1.html` ·
> `bildirimler-v1.html`. Hepsi `_shell.html` kopyası; chrome (topbar/header/
> mega/footer/drawer/bottom-nav + ortak JS) birebir korundu, mega menüye
> dokunulmadı. Tek chrome dokunuşu: diğer sayfalardaki teamül gereği
> "Tarifler" nav linkindeki `class="active"` kaldırıldı (auth sayfaları
> hiçbir ana nav başlığına ait değil — sağlık/shop sayfalarıyla aynı kural).

---

## 1. L1 — Eski template kıyası

### giris.html (eski)
| Eski blok | Yeni karşılık |
|---|---|
| E-posta + şifre + göster/gizle (`#op-cl-btn`) | fk-input + yeni `.fk-pass/.fk-eye` toggle ✔ |
| "Beni hatırla" checkbox | `.fb-kvkk` (shell mirası) checkbox ✔ |
| "Şifrenizi mi unuttunuz?" linki | `?tab=sifre` pane köprüsü ✔ |
| "Hesabın yok mu? Hesap oluştur" | pane altı `.au-alt` köprüsü ✔ |
| Facebook + Google sosyal login | Google + Apple `.soc-btn` (FA brands) — **Facebook atıldı, Apple eklendi** (güncel mobil zorunluluğu/teamülü; stack fazında karara açık) |
| "Doğrulama Kodu" input'u (manuel captcha) | **Atıldı** → `.captcha-note` "reCAPTCHA ile korunur" görsel izi (form güvenlik stack kuralı: invisible v3) |

### kayit.html (eski)
| Eski blok | Yeni karşılık |
|---|---|
| Ad, soyad, e-posta, şifre ×2 | Ad+soyad (c2 grid), e-posta, tek şifre alanı + kural help metni (şifre tekrarı kayıtta atıldı — modern desen, göster/gizle var; hesap ayarlarındaki şifre DEĞİŞTİRMEDE tekrar alanı korundu) |
| Telefon (zorunlu) | Kayıttan çıkarıldı → hesabim-v1 profil formuna opsiyonel taşındı |
| Doğrulama kodu | reCAPTCHA izi (üstteki karar) |
| Üyelik Sözleşmesi + Aydınlatma + KVKK tek checkbox | **İki ayrı zorunlu checkbox** (sözleşme ↔ KVKK ayrıştı) + opsiyonel e-posta izni checkbox'ı (`.ol-consents` + `.fb-kvkk`) |
| Kayıt sonrası akış yok | Başarı paneli (`.fb-success`) → **onboarding-v1.html köprüsü** |

### sifremi-unuttum.html (eski)
E-posta + doğrulama kodu + "Bağlantı Gönder" → tek e-posta alanı + reCAPTCHA
izi + gönderim sonrası `.fb-success` "bağlantı yola çıktı" durumu (`?sent=1`).
Ayrı sayfa yerine giris-v1 içinde `?tab=sifre` pane'i (brief gereği tek dosya).

### hesabim.html (eski — 5.833 satırlık mega dashboard)
Eski sidebar sekmeleri ve yeni evleri:
- **Hesap Bilgilerim** (ad/soyad/telefon/e-posta/cinsiyet/doğum tarihi + şifre
  ve e-posta değiştir + dondur/sil) → hesabim-v1 `?tab=profil` + `?tab=sifre`
  + tehlikeli bölge kutusu olarak TAŞINDI ✔ (cinsiyet + doğum tarihi opsiyonel
  alanlar olarak korundu)
- Takipçilerim / Takip Ettiklerim / İçeriklerim / Taslaklarım / Menülerim /
  Tarif Defterim / Keşfettiklerim / Favorilerim → **TAŞINMADI** — bunlar İÇERİK
  profili; Dalga 1'de `mutfak-defteri-v1` çözdü (brief'in "karıştırma" kuralı).
  Üst bantta "Mutfak Defterimi görüntüle" köprüsü var.
- Dada Store (Siparişlerim/Adreslerim/Kuponlarım) → **Dalga 3 Shop II**
  (sepet/ödeme/sipariş) kapsamı; hesap ayarlarına alınmadı. Açık soru #2.
- Eski sayfada OLMAYAN gizlilik + bildirim tercihleri → modern standart olarak
  eklendi (`?tab=gizlilik`, `?tab=bildirim`).

### onboarding + bildirimler — eski karşılık YOK
- **onboarding:** eski sitede üyelik sonrası tercih akışı hiç yok. Modern
  gerekçe: m4/m5 kişiselleştirme vaadi (Bugün Ne Pişirsem + öneriler) soğuk
  başlangıçta veri ister; rakip analizindeki (Cookpad/Whisk deseni) ilk-oturum
  sihirbazı. bnp wizard mirası birebir uygulandı (kılavuz §2c kuralı).
- **bildirimler:** eski sitede yalnız header'da bildirim DROPDOWN'ı +
  "Bildirimleri Temizle" butonu vardı; tam sayfa yoktu. Tam sayfa akış
  (gün grupları + tip filtresi + okundu yönetimi) modern desen; header
  dropdown'ının bağlanması LEAD navigasyon işi.

---

## 2. Bileşen kararları (miras envanteri)

**Verbatim miras (class adları korunarak):**
- `.rd-crumb` (TD) — 4 sayfada
- `.fk-*` form kiti + `.form-card/.fc-head/.fc-step` (tarif-ekle) — giris/onboarding/hesabim
- `.stepper/.stp/.stp-num/.stp-lbl/.stp-line` + `.wstep/.wiz-foot/.wiz-solo` +
  `.bnp-top/.bnp-head/.bnp-body` (bnp) — onboarding; yeni stepper İCAT EDİLMEDİ
- `.pick-grid/.pick` (bnp) — onboarding diyet kartları
- `.uz-pick/.uz-grid` (diyetisyen-ol) — onboarding mutfak + alerjen chip'leri
- `.chip-flag` (TD) + flagcdn `<img>` — bayraklı mutfak chip'leri (emoji yok)
- `.ol-consents` + `.captcha-note` + `.ol-success` (diyetisyen-ol) — kayıt onayları + onboarding bitişi
- `.pf-tabbar/.pf-tabs/.dt/.pf-pane` (mutfak-defteri) — hesabim sticky sekme;
  giris'te aynı `.pf-tabs` statik (sticky'siz) kullanıldı
- `.pf-empty` (mutfak-defteri / kılavuz §3 boş durum) — bildirimler `?empty=1`
- `.fb-kvkk` + `.fb-success` (shell) — checkbox'lar + başarı durumları
- `.sbanner.rejected` (tarif-ekle) — giriş hata bandı (`?err=1`)
- `.lst-hero` koyu-overlay dili (tarif-liste) — giriş görsel yarısı bu ailenin
  KART varyantı (`.au-visual`): aynı koyu gradient + beyaz h2/aksan + alt
  istatistik şeridi (`.lst-stats` yatay hali)

**Yeni bileşenler (çözülmemişti — gerekçeli son çare):**
1. `.au-*` (giris) — iki-kolon auth yerleşimi; hiçbir sayfada split-auth düzeni
   yoktu. Görsel yarı lst-hero dilinden türedi, form yarı form-card dili.
2. `.soc-btn` — sosyal login butonu; eski sitenin Facebook/Google butonlarının
   token diline çevirisi (beyaz zemin + hairline + FA brands ikonu).
3. `.fk-pass/.fk-eye` — şifre göster/gizle. `.fk-suffix` statik metin içindi
   (pointer-events:none); tıklanır göz butonu gerekti. giris + hesabim AYNI
   class'ları paylaşır.
4. `.tgl` anahtar (toggle switch) — sitede hiç yoktu. Radius kuralı: track
   `--radius-md` (26px boyda görsel yuvarlak, PILL TOKEN'I KULLANILMADI),
   topuz `--radius-circle`. onboarding + hesabim aynı bileşeni paylaşır.
5. `.ntg` (onboarding bildirim satırı) + `.set-row` (hesabim tercih satırı) +
   `.ntf-matrix` (e-posta/push kanal matrisi) — toggle'lı satır düzenleri.
6. `.danger-card` — tehlikeli bölge ayrık kutusu (turuncu hairline çerçeve +
   `.btn-danger` tomato-deep). Eski sitedeki dondur/sil butonlarının evi.
7. `.nt-*` + `.ntr` (bildirimler) — akış satırı: avatar/ikon + metin + zaman +
   okunmamış nokta + opsiyonel tarif thumb'ı. Avatar ölçüsü `.flw-av`
   akrabası (46px daire). Okunmamış zemini açık domates tonu (#FDF4F0).

**Kurallara uyum:** görseller tamamı div+background-image cover/center
(yalnız flagcdn bayrakları `<img>` — kılavuz istisnası); tüm Unsplash URL'leri
filtre suffix'li; FA 6.5.2; emoji yok; inline `padding-top:0` yok — her
sayfanın ilk section'ı `.below-header`, ilk içerik satırı `.rd-crumb`
(18px üst nefes, Dalga 1 standardı).

---

## 3. Durum / param matrisi

| Sayfa | Paramlar |
|---|---|
| giris-v1 | `?tab=giris\|kayit\|sifre` · `?err=1` (giriş hatası bandı) · `?ok=1` (kayıt başarı paneli) · `?sent=1` (sıfırlama gönderildi) |
| onboarding-v1 | `?step=1..4` (önceki adımlar örnek seçimle "done") · `?sonuc=1` (hazırsın ekranı + seçim özeti chip'leri) |
| hesabim-v1 | `?tab=profil\|sifre\|gizlilik\|bildirim` |
| bildirimler-v1 | `?empty=1` (boş durum) + canlı tip filtreleri / okundu yönetimi |

Köprüler (sayfa içi, chrome'a dokunmadan): kayıt başarısı → onboarding-v1 ·
onboarding bitişi → anasayfa + hesabim-v1 · hesabim üst bandı → mutfak-defteri-v1
+ bildirimler-v1 · hesabim bildirim pane'i ↔ bildirimler-v1 (`?tab=bildirim`
gear ikonu ve alt not karşılıklı bağlı) · giriş hedefi → anasayfa.

Sekme geçişlerinde `giris-v1` `document.title`'ı da güncelliyor (Giriş/Kayıt/
Şifremi Unuttum).

---

## 4. Bitiş kanıtı

- Konsol: **4 sayfada 0 hata** (probe enjeksiyonu + `--dump-dom` title okuma;
  `window.addEventListener('error', …, true)` resource hatalarını da yakaladı).
- 390 taşmazlık: iframe probe — 4 sayfada `scrollWidth = 390` (taşma SIFIR).
- SS'ler (`mockups/.ss-scratch/`):
  - `giris-1440.png` · `giris-500.png` · `giris-kayit-1440.png` (?tab=kayit)
  - `onboarding-1440.png` · `onboarding-500.png` · `onboarding-step2-1440.png` (?step=2)
  - `hesabim-1440.png` · `hesabim-500.png` · `hesabim-bildirim-1440.png` (?tab=bildirim)
  - `bildirimler-1440.png` · `bildirimler-500.png` · `bildirimler-empty-1440.png` (?empty=1)
- Montaj aracı: `mockups/.ss-scratch/build/assemble.py` (shell + fragment;
  yeniden üretilebilir). Probe kopyaları: `mockups/.ss-scratch/probe/`.

---

## 5. Açık sorular

1. **Apple vs Facebook login** — eski site Facebook+Google'dı; Google+Apple'a
   çevirdim (Facebook login kullanımı düşüşte, Apple iOS app için fiilen
   zorunlu). Patron onayı gerekli; Facebook eklemek 1 satır.
2. **Siparişlerim / Adreslerim / Kuponlarım** hesap ayarlarına mı, Shop II
   (sepet/ödeme/sipariş) ailesine mi? Ayarlara koymadım — Shop II teammate'inin
   sipariş sayfasıyla çakışmasın. Lead karar verirse hesabim'a 5. sekme eklenir.
3. **Kayıtta şifre tekrarı** — modern desen gereği tek alan + göster/gizle
   yaptım (şifre DEĞİŞTİRMEDE tekrar var). Eski davranış istenirse eklenir.
4. **Onboarding'de kullanıcı adı seçimi** yok — kayıtta ad/soyaddan otomatik
   üretilip hesap ayarlarından değiştirilebilir varsaydım. İstenirse onboarding
   öncesine "kullanıcı adını seç" mikro-adımı eklenebilir.
5. **Bildirim "şimdilik #"** — `.ntr` satırları tıklanınca yalnız okundu olur,
   hedef sayfaya (tarif/yorum/sipariş) gitmez; hedef bağlama LEAD navigasyon
   turunun işi (sipariş detayı Dalga 3 Shop II'de doğacak).

## 6. İstisna dışı dokunma istekleri (LEAD'e)

- Shell `btn-login` / drawer "Giriş Yap" / bottom-nav "Hesap" hedeflerinin
  `giris-v1.html` / `hesabim-v1.html`'e bağlanması (chrome'a ben dokunmadım).
- Header'a bildirim zili (badge'li) eklenecekse `bildirimler-v1.html` hazır;
  dmCart badge deseninin zile uyarlanması önerilir.
- `navbind.py` yeniden koşulacaksa 4 yeni sayfa kapsama girer.
- `.tgl` + `.fk-pass/.fk-eye` + `.pf-empty`'nin bildirimlerde kullanımı
  kılavuza (§2d Dalga 3 bileşenleri) işlenebilir.
