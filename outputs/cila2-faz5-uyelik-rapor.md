# CİLA-2 Faz 5 · Üyelik-Sosyal Raporu

> Teammate: **uyelik-sosyal** (cila2-faz5) · Statü: tamamlandı (SS kanıtı browser
> uygunluğuna bağlı, aşağıda Bilinen Sınırlamalar) · Tarih: 2026-06-13
> Mod: FULL AUTO (Beyar'a soru sorulmadı; tereddütler aşağıda işaretli)

## Kapsam ve Sahiplik

Dokunulan dosyalar (yalnız sahiplik setim):
- `giris-v1.html` — telefon alanı + e-posta/telefon giriş geçişi + diyetisyen kayıt köprüsü
- `diyetisyen-profil-v1.html` — Püf Noktaları sekmesi + Takip Et butonu (sosyal profil)
- `mutfak-defteri-v1.html` — takip/gizlilik geçidi (Kaydedilenler + Menüler)

`_shell.html` HEADER login-state'e **dokunulmadı** (header teammate sahası; çakışma yok).

`git diff --numstat`:
```
94  2   diyetisyen-profil-v1.html
102 2   giris-v1.html
62  12  mutfak-defteri-v1.html
```

---

## 1 · TELEFON (giris-v1.html)

### Kayıt formu (?tab=kayit)
- E-posta'dan sonra, şifreden önce **Telefon alanı** eklendi (`fk-*` kiti).
- `+90` sabit önek kutusu (`.fk-tel-cc`) + TR maske (`5xx xxx xx xx`).
- `fk-help` notu: "Sipariş ve randevu bildirimleri için kullanılır; profilinde gizli kalır."
- `required` + maske doğrulaması (10 hane).

### Giriş formu (?tab=giris) — e-posta/telefon geçişi
- Form üstüne **segment** (`.au-seg`, token dili — pf-tabs akrabası, pill YASAK):
  `E-posta` / `Telefon`.
- Telefon seçilince e-posta alanı gizlenir, `+90` önekli telefon alanı görünür;
  `required` segmentle taşınır (gizli alan doğrulamadan atlanır).
- **Demo pre-fill korundu:** e-posta `elif.sahin@eposta.com`; telefon demo `532 184 70 26`.

### TR maske
- `[data-tel-mask]` ile çalışır: baştaki `0`/`+90`/`90` temizlenir, `5xx xxx xx xx`
  formatına döner, 10 haneye kırpılır. Hem giriş hem kayıt telefonuna bağlı.

---

## 2 · DİYETİSYEN KAYIT AYRIMI (giris-v1.html)

- Kayıt pane'inde (au-alt altında) **belirgin callout** (`.au-dyt`, yeşil sağlık
  aksanı — diyetisyen-dizin dili): stetoskop ikonu + "Diyetisyen misin?" +
  **Diyetisyen Ol** butonu → `diyetisyen-ol-v1.html`.
- `diyetisyen-ol-v1.html` zaten VAR ve telefon alanına (satır 1259) zaten sahip —
  yeni akış üretilmedi, mevcut sayfaya köprülendi.

---

## 3 · DİYETİSYEN PROFİLİ = SOSYAL PROFİL (diyetisyen-profil-v1.html)

- **Püf Noktaları sekmesi** eklendi (tab bar: Tarifleri'nden sonra, Yorumlar'dan önce;
  `<span class="cnt">8</span>`). `?tab=pufler` derin link çalışır.
- **Püf pane** eklendi: `mutfak-defteri .pufl-grid / .puf-card` dili VERBATIM miras
  (CSS kopyalandı, class adı değişmedi). 4 örnek püf kartı (Beslenme/Saklama/
  Kahvaltı/Pişirme), her biri `puf-noktasi-detay-v1.html`'e gider.
- **Takip Et butonu** eklendi (`.pf-follow`, mutfak-defteri VERBATIM) — Randevu/Mesaj
  satırının altında. `?takip=1` ile "Takip Ediliyor" başlar; tıkla → toggle.
  Gerekçe: diyetisyen = ekstra içerikli normal kullanıcı, sosyal takip akışına dahil.

---

## 4 · TAKİP / GİZLİLİK SİSTEMİ (mutfak-defteri-v1.html) — EN KARMAŞIK

### Kural
Public modda (`?view=public`) bir kullanıcının **Kaydedilenleri** ve **Menüleri**
takip arkasında: takip YOKsa kilitli, takip VARsa açık.

### Mekanizma (?auth pattern'ı gibi)
- `body.is-following` class + JS toggle. `?takip=1` → takipte (geçit açık) başlar;
  param yoksa public modda takip YOK (geçit kilitli).
- Tek toggle kaynağı: hero **Takip Et** butonu (`#pfFollow`) **ve** kilit
  boş-durumundaki **"Takip Et, Görmeye Başla"** CTA'ları (`[data-follow-cta]`) →
  ikisi de `body.is-following`'i çevirir, hero butonu senkron güncellenir.

### Sekme + pane geçidi
- Kaydedilenler ve Menüler tab+pane'lerine `pf-fgate` class'ı eklendi.
- Kaydedilenler eskiden `pf-priv` (public'te tam gizli) idi → artık `pf-fgate`
  (public'te görünür ama içerik takip arkasında).
- Her gated pane'e `.pf-lock` boş-durumu eklendi: kilit ikonu + "… takipçilere özel"
  başlık + açıklama + **Takip Et, Görmeye Başla** CTA + ipucu satırı
  ("86 kayıtlı tarif · takip ettiğinde anında açılır").
- Gated tab'larda public+takip-yok iken küçük **kilit ikonu** (`.pf-tlock`) belirir.
- CSS geçidi: `body.pf-public:not(.is-following) .pf-pane.pf-fgate > .pf-full{display:none}`
  + `> .pf-lock{display:block}`. own modda geçit hiç uygulanmaz (her şey açık).

### Demo edilebilir durumlar
| URL | Sonuç |
|---|---|
| `mutfak-defteri-v1.html` (own) | Tüm sekmeler açık, geçit yok |
| `?view=public` | Kaydedilenler/Menüler tab'ı **kilitli** (lock boş-durum + CTA) |
| `?view=public&takip=1` | Kaydedilenler/Menüler **açık** (gerçek içerik) |
| `?view=public&tab=kaydedilenler` | Doğrudan kilitli Kaydedilenler |
| Kilit CTA'ya / hero Takip Et'e tıkla | Geçit canlı açılır/kapanır |

### Denedikleri / Favorileri
Görev "Kaydedilenler ve Menüler" dediği için bu ikisi **own-only private** kaldı
(`pf-priv`, public'te tam gizli) — İA §3.2 ile tutarlı. Bkz. tereddüt T1.

---

## Tasarım Disiplini
- frontend-design skill yüklendi; mevcut `au-*` / `pf-*` / `puf-*` dili KORUNDU,
  yeni hero/profil dili İCAT EDİLMEDİ. Yeni mikro bileşenler (`.au-seg`, `.au-dyt`,
  `.fk-tel`, `.pf-lock`, `.pf-tlock`) token diliyle (radius token, pill yok) kuruldu.
- Mobil: yeni bloklarda 390 stack kuralları eklendi (au-dyt, pufl-grid, puf-card).
- lessons `*/` yorum tuzağı taraması: temiz (0 eşleşme).

---

## Bilinen Sınırlamalar (ZORUNLU)

1. **SS kanıtı — browser paylaşımı:** Playwright MCP tarayıcısı bu fazda diğer
   teammate'lerle TEK paylaşımlı instance ("Browser is already in use"). Yan-yana
   takip=0/takip=1 SS'i ve telefon-toggle tıkla-probe'u browser boşaldığında
   alınacak / lead'in örneklem turuna bırakıldı. Mantık + DOM/CSS statik doğrulandı
   (grep: fgate=7, pf-lock=2, data-follow-cta=2 buton, pufler tab+pane mevcut).
   **Demo URL'leri yukarıda tabloda** — Beyar/lead doğrudan açıp görebilir.
2. **T1 — Denedikleri/Favorileri kapsamı:** Görev yalnız Kaydedilenler+Menüler için
   takip geçidi istedi; Denedikleri/Favorileri own-only private bırakıldı (İA §3.2).
   İstenirse bunlar da `pf-fgate`'e alınabilir — **Beyar tercihi**.
3. **menuler pane çakışma riski (#6 defter-menu):** Menüler pane'i hem benim gizlilik
   geçidim hem task #6 (menü düzenleme) tarafından kapsanıyor. Benim dokunuşum
   tamamen additive (pane'e `pf-fgate` class + baş tarafa `.pf-lock` bloğu); menü
   içeriği/düzenleme markup'ına dokunulmadı. #6 ile faz-sonu merge'de `.pf-full`
   wrapper'ının korunduğu teyit edilmeli.
4. **Telefon doğrulama:** Mockup seviyesi — 10 hane format kontrolü var, gerçek
   operatör/numara doğrulaması yok (Laravel fazı). reCAPTCHA notu mevcut.
5. **Header login-state:** `_shell.html` header'a dokunulmadı; `?auth=1` ile
   gelen logged-in header header teammate / faz-sonu sweep sahası. Profil sayfaları
   `?auth` ile uyumlu (body class'ları çakışmaz).
