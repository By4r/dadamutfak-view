# DALGA 3 SENTEZ — Shop II + Mutfak Rehberi + Auth + Hesaplayıcılar (2026-06-11)

> Lead raporu. 4 teammate (shop2 / rehber / auth / saglik2) kesintisiz modda çalıştı,
> hepsi **kanıtlı kabulden geçti** (grep + headless tıklama probe + SS üçlüsü).
> **COMMIT ATILMADI** — Beyar SS turu + onayı bekleniyor.

---

## 1. SAYFA DURUMLARI (21 dosya: 18 yeni + 3 düzenleme)

### shop2 — Shop II (F9) ✔ kabul
| Dosya | Durum | Not |
|---|---|---|
| `sepet-v1.html` | ✔ YENİ | dmCart üstüne tam sayfa; adet ± canlı (probe: 1→2, 352₺→577₺), 400₺ kargo eşiği çubuğu, kupon DADA10, `?empty=1` |
| `odeme-v1.html` | ✔ YENİ | 4 adımlı checkout `?step=1..4`, tarif-ekle stepper mirası, maskeli kart önizleme, sözleşme kilidi |
| `siparislerim-v1.html` | ✔ YENİ | `?yeni=1` başarı bandı + `?detay=1` dikey takip timeline |
| `alisveris-listesi-v1.html` | ✔ YENİ | haftalik-menu reyon-grup verbatim + manuel ekleme + "Sepete Aktar" (probe: badge=3 + toast PASS) |
| `dada-shop/urun-liste/urun-detay` | ✔ ara iş | crumb fix (rd-crumb + 16px nefes) + `.cdd-go`/`#ctGo` → sepet-v1 |

### rehber — Mutfak Sırları ailesi (F11) ✔ kabul
| Dosya | Durum | Not |
|---|---|---|
| `mutfak-sirlari-v1.html` | ✔ YENİ | hub: disc-feature + 5 bölüm kartı + guide koyu band + dayband Akademi köprüsü |
| `puf-noktalari-v1.html` | ✔ YENİ | canlı chip filtre + 12 gerçek püf + `?detay=1` uzun-form (eski 99 lorem kart + 8 reklam L1'de elendi) |
| `mutfaga-giris-v1.html` | ✔ YENİ | 6 adımlı rota + seviye rozetli (.lvl) konu kartları + canlı seviye filtresi |
| `sozluk-v1.html` | ✔ YENİ | **eski 4 sayfa → 1 sayfa kararı**; A-Z bar (29 TR harf, probe: P → 58→3 satır PASS), `?harf=` `?terim=` derin link |
| `olcu-birimleri-v1.html` | ✔ YENİ | canlı dönüştürücü + 5 sekmeli tablolar + fırın sıcaklık tablosu (son ikisi YENİ) |
| `akademi-v1.html` | ✔ YENİ | YAKINDA landing + fk-* ilgi formu `?sent=1` |

### auth — F6 ✔ kabul
| Dosya | Durum | Not |
|---|---|---|
| `giris-v1.html` | ✔ YENİ | `?tab=giris\|kayit\|sifre` (probe: tıklama + param PASS), sosyal mock Google+Apple, `?err/?ok/?sent` |
| `onboarding-v1.html` | ✔ YENİ | bnp wizard mirası birebir; 4 adım + `?sonuc=1`; flagcdn mutfak chip'leri |
| `hesabim-v1.html` | ✔ YENİ | AYAR sayfası (içerik profili mutfak-defteri'nde kaldı); `?tab=profil\|sifre\|gizlilik\|bildirim`; tehlikeli bölge |
| `bildirimler-v1.html` | ✔ YENİ | tip filtre + gün grupları + okundu yönetimi + `?empty=1` |

### saglik2 — hesaplayıcı ×6 + program detay ✔ kabul
| Dosya | Durum | Not |
|---|---|---|
| `beden-kutle-endeksi-v1.html` | ✔ YENİ | gauge'lı; lead probe: 70/175 → **22.9** PASS |
| `bazal-metabolizma-v1.html` | ✔ YENİ | Mifflin-St Jeor (rapor tablosunda 4 örnekle doğrulanmış) |
| `gunluk-kalori-v1.html` | ✔ YENİ | BMH × aktivite + koru/ver/al bandları |
| `vucut-tipi-v1.html` | ✔ YENİ | boy/bilek oranı, cinsiyete göre gauge skalası |
| `gunluk-su-v1.html` | ✔ YENİ | kg×33ml + egzersiz; bardak ikon dizisi |
| `ideal-kilo-v1.html` | ✔ YENİ | Devine + BKİ aralığı kartları |
| `hesaplayici-v1.html` | ✔ alias | meta refresh + JS redirect → BKİ + fallback köprüler |
| `diyet-program-detay-v1.html` | ✔ YENİ | dl-hero + 7g×3 wk-board + r-card grid + note-duo uyarısı |
| `tarif-bulucu-v1.html` | ✔ ara iş | "İstemediklerim/Alerjen" rafı (lead probe: Gluten → kart 6→3, sayaç 122→110 PASS) |

13 formül senaryosu saglik2 raporunda tablo hâlinde doğrulandı (§3); lead bağımsız BKİ probe'uyla teyit etti.

---

## 2. LEAD İŞLERİ (bitiş zinciri)

- **Kılavuz §2c eklendi** (dalga öncesi): dmCart izleri, dolap/raf, calc+gauge şablonu,
  wizard mirası kuralı, lst-hero varyantları, dz-kart, reyon-grup listesi.
- **Navigasyon bağlandı** (`navbind.py` Dalga 3 haritası + hedefli geçiş, 47 dosya):
  - Mutfak Sırları ailesi + Dada Akademi → gerçek sayfalar (header dropdown + mega + footer, dosya başına ~12 bağ)
  - v3a Mutfak Sırları see-all → hub
  - `btn-login` + drawer "Giriş Yap" → giris-v1 (46 dosya, onclick)
  - bottom-nav "Hesap" → hesabim-v1 (45 dosya; mutfak-defteri'nden devralındı)
  - saglik-hub calc kartları ×6 → 6 gerçek hesaplayıcı + 2 chip (BKİ / Kalori Hesapla)
  - diyet-listeleri prog-card ×6 → diyet-program-detay-v1
  - Sepete Git zinciri shop2'den hazır geldi (3 shop sayfası + 4 yeni sayfa)
- **Yolculuk doğrulaması** (grep + headless): ① v3a→Sırları→hub→püf ② shop→sepet→ödeme→siparişlerim
  ③ hub→su→ideal kilo (sekme) ④ liste→giriş→onboarding — 4/4 PASS; düzenlenen 5 çekirdek sayfada konsol 0 hata.
- **Nabız müdahalesi:** 1 kez (shop2+saglik2 sessizliği) — mesajla çözüldü, kill gerekmedi.

---

## 3. AÇIK SORULAR — TEK LİSTE (Beyar)

**Shop II**
1. Sipariş durum taksonomisi: eski 3 durum vs mock 5 durum — backend/stack kararı.
2. Fatura görünümü: ayrı yazdırılabilir sayfa mı, PDF üretimi mi? (mock: toast izi)
3. Kupon iş kuralları: tek kupon mu; kargo eşiği indirimli tutardan mı? (mock: indirimli)

**Rehber**
4. "Şimdi Dinle" TTS taşınsın mı? (öneri: stack fazında Web Speech API)
5. Püf detayına `.rev-*` yorum bloğu eklensin mi? (dil hazır, ~kısa iş)
6. Sözlükte Q/W/X politikası (TR 29 harfe düşürüldü; "Wok" gibi terimler için tek satırla geri gelir)

**Auth**
7. Sosyal login: Google+Apple yapıldı (eski: Facebook+Google) — Facebook istenirse 1 satır.
8. Siparişlerim/Adreslerim/Kuponlarım hesap ayarlarına 5. sekme mi, Shop ailesinde mi kalsın? (şimdilik Shop'ta; hesabim'dan köprü YOK — lead yeni UI eklemedi)
9. Kayıtta şifre tekrarı yok (modern desen; değiştirmede var) — eski davranış istenirse eklenir.
10. Onboarding'de kullanıcı adı adımı yok (ad/soyaddan otomatik varsayımı).
11. Bildirim satırları hedef sayfaya gitmiyor (yalnız okundu) — hedef şablonu netleşince bağlanır.

**Sağlık**
12. BMH bebek sekmesi taşınmadı (Mifflin yetişkin; pediatrik = diyetisyen modülü işi?).
13. Vücut tipi eşikleri diyetisyen onayına aday (eski sayfa lorem'di, formül yoktu).
14. Su hesabı klinik üst sınırı (4L cap) eklensin mi?

**Lead'in eklediği**
15. Header'a bildirim zili (badge'li) eklensin mi? — dmCart badge deseni zile uyarlanabilir; yeni UI olduğu için lead eklemedi.
16. Haftalık menü canlı listesinden alisveris-listesi-v1'e görünür köprü yok — "sadece href" kuralında uygun anchor bulunamadı; "Listeyi İndir (PDF)" yanına link = yeni UI, Beyar onayına.
17. Sepet 1440'ta içerik-footer arası boşluk uzun (3 ürünlü mock'ta min-height etkisi) — kozmetik, revize turu harcanmadı.
18. Program detay "Menüme Aktar" CTA'sının haftalik-menu'deki karşı ucu ileride.

**Kılavuz §2d adayları** (Dalga 4 öncesi lead işi): `.tgl` toggle, `.fk-pass/.fk-eye`,
`.pick-card`, `.sum-card`, `.tml` timeline, `.ost` rozet, `.az-bar`, `.term-row`,
`.lvl`, `.kcal-bands .kb`, `.au-*` split-auth, `.nt-*/.ntr` bildirim satırı.

---

## 4. SS YOLLARI (`mockups/.ss-scratch/`)

- **shop2:** `sepet-1440/500/empty-1440` · `odeme-1440/500/step3/step4-1440` · `siparislerim-1440/500/detay-1440` · `alisveris-1440/500` · `dada-shop-crumbfix-1440`
- **rehber:** `rehber-{sirlari,puf,giris,sozluk,olcu,akademi}-{1440,500}` + `rehber-puf-detay-*` + `rehber-akademi-sent-*` (16 SS)
- **auth:** `giris-1440/500/kayit-1440` · `onboarding-1440/500/step2-1440` · `hesabim-1440/500/bildirim-1440` · `bildirimler-1440/500/empty-1440` (12 SS)
- **saglik2:** 6 hesaplayıcı ×(1440+500) + `beden-kutle-endeksi-v1-sonuc-1440` · `diyet-program-detay-*` · `tarif-bulucu-v1-alerjen-*` ×3 · `hesaplayici-redirect-1440`

Teammate raporları: `outputs/{shop2,rehber,auth,saglik2}-rapor.md` (L1 kıyasları orada — rehber'inki özellikle zengin).

---

## 5. "BEYAR İNCELEMESİ BEKLİYOR" LİSTESİ

Loop sigortası (3. revize turu) hiçbir sayfada tetiklenmedi — özel bekleyen sayfa YOK.
**Tüm dalga standart ritüeli bekliyor:** Beyar SS turu → seri revize → patron onayı →
toplu commit → handoff güncelle → clear → Dalga 4 (TIER 4 babysit: diyetisyen panel).
