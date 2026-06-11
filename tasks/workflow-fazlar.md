# DadaMutfak — Tasarım Workflow Faz Önerisi

> Research fazı çıktısı · 2026-06-11 · Kardeş dosya: `tasks/research-sistem.md`
> **Bu bir ÖNERİDİR — faz sırası ve kapsam kararı Beyar/patronundur.**

---

## Çalışma kuralları (her faz için ortak)

- **1 faz = 1 Claude Code oturumu** (context dostu; L fazlar gerekirse aynı
  kapsamda ikinci üretim turuna bölünür, sayfa bölünmez).
- Faz açılışı: `tasks/handoff.md` okunur → frontend-design skill ile plan →
  **plan onayı** → üretim → SS döngüsü (Playwright).
- **Faz sonu ritüeli:** ① SS doğrulama (header/footer/token v3a ile birebir mi
  dahil) → ② handoff.md güncelleme → ③ commit önerisi (Beyar izniyle) →
  ④ **Beyar/patron onayı**. Onaysız sonraki faza geçilmez.
- **Kanonik baz:** `mockups/anasayfa-portal-v3a.html` — token bloğu + header +
  footer + mega menü her mockup'a birebir kopyalanır, lokal değişiklik yasak
  (bileşen drift'i önlemi).
- Empty state'ler kendi fazında üretilir, statik faza bırakılmaz.

---

## Faz Planı (13 faz ≈ 15-16 oturum)

| # | Faz | Kapsam | Boyut |
|---|-----|--------|-------|
| F1 | Tarif Detay ⭐ | tarif detay sayfası (tam donanım) | L |
| F2 | Tarif Liste + Kategori + Koleksiyon | liste/arama, kategori, koleksiyon, günün menüsü, SEO landing şablonu | M-L |
| F3 | Video Mutfağı ⭐ | hub + seri şablonu + dikey kısa video | M |
| F4 | Keşif & Planlama | ne pişirsem + tarif bulucu (+4b: haftalık planlayıcı) | M-L |
| F5 | Tarif Katkısı | tarif ekle stepper + onay + pişirme modu + yazdır | L |
| F6 | Hesap & Auth | giriş/kayıt/şifre, hesabım, bildirimler | M |
| F7 | Mutfak Defteri & Topluluk ⭐ | kullanıcı profili, rozet/liderlik, şefler | L |
| F8 | Dada Shop I ⭐ | vitrin + ürün liste + ürün detay | M-L |
| F9 | Dada Shop II | sepet + ödeme + sipariş + alışveriş listesi | M |
| F10 | Sağlık | hesaplamalar + testler (+10b: diyet listeleri + besin kütüphanesi) | L |
| F11 | Mutfak Rehberi | püf, mutfağa giriş, sözlük, ölçü birimleri, Akademi landing | M-L |
| F12 | Diyetisyen Modülü | 12a public · 12b panel shell+danışan+takvim · 12c reçete+mesaj+danışan paneli | M+L+L |
| F13 | Sezon & Kapanış | Ramazan, kurumsal, yasal şablon, 404 | M |

---

## Faz detayları

### F1 — Tarif Detay ⭐ (L)
**Kapsam:** Tek sayfa, ama platformun en yüklü ekranı: galeri/hero, güven
etiketleri, porsiyon ayarlı malzeme listesi + **ikame popover'ı** (patron m18),
"alışveriş listesine ekle", **"bu tarifte kullanılan ürünler" Shop köprüsü**,
adım kartları, besin tablosu, audio player, yazar kutusu, **"Ben de Yaptım"
foto duvarı** (patron m2), yıldız dağılımı, fotoğraflı yorum, benzer tarifler,
sticky aksiyon barı.
**Neden ilk:** handoff'ta ilan edilmiş başlangıç; burada doğan ~10 bileşen
sonraki 8 fazda yeniden kullanılır. Patronun m2+m18 öncelikleri ilk fazda teslim.
**Çıktı bileşenleri:** porsiyon stepper, malzeme satırı+ikame, adım kartı, besin
tablosu, yorum kartı, foto duvarı, yıldız dağılım grafiği, breadcrumb, sticky bar.
**Risk:** En yoğun faz — gerekirse foto duvarı + yorum bölümü aynı kapsamın
ikinci üretim turuna sarkar.

### F2 — Tarif Liste/Arama + Kategori + Koleksiyon (M-L)
**Kapsam:** liste/arama (facet filtre: beslenme/bütçe/süre/mutfak), kategori
sayfası (renk-blok hero), koleksiyon/derleme şablonu, günün menüsü, SEO landing
şablonu (Ekonomik Tarifler, Airfryer...).
**Neden:** handoff kapsamının ikinci yarısı; filtre paneli + pagination tüm
dizin sayfalarının (shop, diyetisyen, besin) atası.
**Çıktı:** facet filtre, chip, sıralama, pagination, boş durum, koleksiyon kartı,
renk-blok bandı.

### F3 — Video Mutfağı ⭐ (M) — patron m13: EN ÖNEMLİ
**Kapsam:** video hub + seri şablonu ("10 Dakikada Yemekler", "Öğrenci Mutfağı",
"Airfryer Tarifleri", "Diyetisyenle Sağlıklı Tabak" — tek şablon 4 varyant) +
dikey 9:16 kısa video görünümü.
**Neden bu sırada:** bağımlılıkları (tarif kartı dili F1, liste dili F2) yeni
çözüldü — patronun en önemli modülü ilk üç fazda teslim edilmiş olur; daha
erken sağlıklı slot yok.
**Çıktı:** player çerçevesi, seri rayı/kartı, dikey overlay (beğen/kaydet/
tarife git), bölüm listesi.

### F4 — Keşif & Planlama (M-L)
**Kapsam:** Bugün Ne Pişirsem (seçim akışı) + Tarif Bulucu (malzeme multi-select,
israf-azaltan vurgu). **4b (gerekirse ayrı oturum):** Haftalık Menü Planlayıcı
(gün×öğün grid, alışveriş listesi çıktısı).
**Neden:** ana sayfa findbar'ının devamı; burada doğan **wizard pattern'ı**
quiz (F10) ve randevu (F12a) tarafından miras alınır.
**Çıktı:** wizard akışı, malzeme multi-select, öneri sonuç ekranı, plan grid'i.

### F5 — Tarif Katkısı (L)
**Kapsam:** tarif ekle/düzenle 4 adımlı stepper + onay/ret durum ekranları +
adım adım pişirme modu (m23) + yazdır görünümü.
**Neden:** topluluk platformunun kalbi; **form kiti + stepper burada doğar** →
auth (F6), checkout (F9), randevu (F12) bunu miras alır.
**Çıktı:** form kiti (input/select/upload/dinamik satır), yatay stepper, durum
banner'ları, tam ekran pişirme modu, print şablonu.

### F6 — Hesap & Auth (M — nefes fazı)
**Kapsam:** giriş + kayıt + şifremi unuttum + hesabım (ayarlar) + bildirimler.
**Neden:** F5 form kitiyle hızlı biter; iki L faz arasında ritim molası; F7
profil ve F12 randevu bu sayfalara referans verir.
**Çıktı:** auth kart layout'u, ayar sayfası, bildirim satırı, toggle.

### F7 — Mutfak Defteri & Topluluk ⭐ (L) — patron m8: detaylandır
**Kapsam:** public kullanıcı profili "Mutfak Defteri" (sekmeler: tarifleri/püf/
kaydettikleri/denedikleri/favoriler/menüleri; rozet vitrini; takip), puan/
liderlik tablosu, şefler dizini + şef profili.
**Neden:** patron detay istedi → kendi fazını hak ediyor; kart (v3a), tab (F1),
grid (F2), rozet dili hazırken verimli üretilir.
**Çıktı:** profil hero, sekmeli alan, rozet vitrini, liderlik tablosu, takipçi
listesi, Oatly-sesli boş durum seti.

### F8 — Dada Shop I ⭐ (M-L) — patron onaylı
**Kapsam:** shop vitrini + ürün liste + ürün detay ("bu ürünle yapılan tarifler"
rayı dahil — F1 köprüsünün karşı ucu).
**Neden:** ürün liste F2 filtresini, ürün yorumları F1 yorum kartını kullanır.
**Çıktı:** vitrin bandı, ürün galerisi, varyant/adet seçici, rozet sistemi.

### F9 — Dada Shop II (M)
**Kapsam:** sepet + ödeme (checkout stepper) + sipariş alındı + **alışveriş
listem** (tariften/planlayıcıdan otomatik — m4).
**Neden:** checkout F5 stepper'ını bekliyordu; "tarif → liste → sepet" zinciri
burada kapanır.
**Çıktı:** sepet satırı, özet kutusu, checkout stepper'ı, timeline, işaretlenebilir
liste + "tümünü sepete ekle".

### F10 — Sağlık (L)
**Kapsam:** hesaplamalar hub + hesaplayıcı şablonu (×5) + testler/quiz.
**10b (gerekirse ayrı):** diyet listeleri + besin kütüphanesi.
**Neden:** quiz F4 wizard'ını kullanır; besin/makro görsel dili F12'nin
(diyetisyen) zeminini hazırlar — bilinçli olarak F12'den hemen önceki bölgede.
**Çıktı:** hesaplayıcı form+sonuç kartı (gauge), quiz akışı, diyet listesi kartı,
besin tablosu+arama.

### F11 — Mutfak Rehberi (M-L — reuse fazı)
**Kapsam:** püf noktaları liste/detay/ekle, mutfağa giriş + makale şablonu,
sözlük (A-Z ailesi), ölçü birimleri, Dada Akademi landing.
**Neden:** ~%90 yeniden kullanım (puf-card v3a'da, form F5'ten, editöryal dil
Kinfolk) → geç sırada hızlı biter; F12 öncesi ikinci nefes.
**Çıktı:** A-Z bar, terim kartı, dönüşüm tablosu, uzun-form makale şablonu.

### F12 — Diyetisyen Modülü (3 oturum: M + L + L)
- **12a — Public:** diyetisyenler dizini + public profil + randevu alma akışı
  (F2 filtre + F4 wizard reuse). (M)
- **12b — Panel temeli:** app shell (sidebar layout — **önce shell tek başına
  SS onayı alınır**) + dashboard + danışan yönetimi + randevu takvimi. (L)
- **12c — Panel derinliği:** reçete/beslenme planı builder (öğün blokları +
  makro bar + PDF görünümü) + mesajlaşma + danışan paneli (reçetem, ölçüm
  takibi, randevularım). (L)
**Neden sonda:** en büyük yeni dil (app shell, public siteden farklı) — bileşen
kütüphanesi tam olgunken girilmeli; public/panel ayrımı şart, panel tek oturuma
sığmaz.

### F13 — Sezon & Kapanış (M)
**Kapsam:** Ramazan landing'leri (iftara/sahura doğru — F2 koleksiyon şablonu +
renk-blok tema), kurumsal sayfalar (hakkımızda, iletişim, SSS accordion),
yasal metin şablonu (×~10), 404 (esprili Dada sesi).
**Neden sonda:** sıfıra yakın yeni tasarım kararı, tamamı şablon türetme.
**Not:** Ramazan takvimi sıkıştırırsa F2'den sonra öne çekilebilir (koleksiyon
şablonu çıktıktan sonra bağımlılığı yok).

---

## Sıralama mantığı (özet)

1. **Bileşen kademesi:** F1-F2 atomları doğurur (kart/yorum/filtre/tab) → F5
   form dilini doğurur (stepper/form kiti) → sonraki her faz miras oranı artarak
   hızlanır. F11 ve F13 bilinçli %90-reuse fazları.
2. **Patron öncelikleri en erken sağlıklı slota:** ikame + "Ben de Yaptım" → F1
   (ilk gün), video serileri → F3 (bağımlılık çözülür çözülmez), Mutfak Defteri →
   F7 (kendi fazı), Shop → F8-F9.
3. **L-M ritmi:** L fazları M fazlarıyla dönüşümlü — her oturum onay+commit ile
   kapandığından arka arkaya iki L faz context/yorgunluk riski üretir.

## Riskler & önlemler

| Risk | Önlem |
|---|---|
| F1 aşırı yüklü (10 yeni bileşen tek sayfada) | Gerekirse foto duvarı+yorum ikinci üretim turuna; sayfa bölünmez, tur bölünür |
| Bileşen drift'i (her mockup tek dosya HTML) | Kanonik baz kuralı: token/header/footer v3a'dan birebir; her faz SS kontrolünde "v3a ile piksel uyumu" maddesi |
| F12b panel shell'i yeni dil | Shell önce boş hâliyle SS onayına gider, modüller sonra dolar |
| Context taşması | 4b ve 10b önceden tanımlı bölünme noktaları; faz ortasında taşma olursa handoff güncellenip oturum kapatılır |
| Sezonluk aciliyet (Ramazan) | F13'ten F2-sonrasına çekilebilir esneklikte planlandı |
