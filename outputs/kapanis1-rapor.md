# Kapanış-1 Raporu — Kurumsal & Kapanış Sayfaları (Dalga 4)

> Sahip: kapanis1 · Tarih: 2026-06-11
> Sayfalar: hakkimizda-v1 · iletisim-v1 · reklam-ver-v1 · yasal-v1 (?metin=) · hata-v1 (?kod=)
> Baz: `_shell.html` kopyası (chrome KİLİTLİ, dokunulmadı). Nav'da "Tarifler"
> aktifliği kaldırıldı (akraba sayfalardaki desen: kurumsal sayfada ana sekme aktif değil).

## 1. L1 Kıyası — Eski Template Blok Envanteri

### hakkimizda.html (eski)
| Blok | Karar |
|---|---|
| Breadcrumb + sayfa başlığı bandı | **ALDIM** → koyu-overlay `lst-hero` varyantına taşındı (krem hero REDDEDİLMİŞTİ, kılavuz §2b) |
| "Yaşasın Yemek Yemek!" marka hikâyesi (uzun, gerçek TR metin) | **ALDIM** — eski metnin özü korunarak `.seo-prose` diline yeniden yazıldı; "domino taşı", "yeni gezegen keşfi", "tüm renkler aynı masada" cümleleri yaşatıldı |
| İstatistik bandı "36+ Happy clients / 58+ Projects..." (template lorem'i, İngilizce) | **ATTIM** → yerine GERÇEK marka metrikleriyle "Sayılarla DadaMutfak" koyu statband (üye/tarif/diyetisyen/ziyaret/video) |
| "Your Partner for e-commerce grocery solution" (template lorem'i) | **ATTIM** |
| Ne Yapıyoruz / Vizyonumuz / Misyonumuz (gerçek TR metin) | **ALDIM** → 3'lü `val-card` şeridi (Misyon/Vizyon/Değerler; "Ne Yapıyoruz" hikâye prose'una katıldı) |
| Hero video (`<video>` tarayıcı desteklemiyor notlu) | **ATTIM** → statik koyu-overlay hero (kılavuz: hero'lu sayfa yok bu dalgada, header katı) |

### kunye.html (eski)
| Blok | Karar |
|---|---|
| Künye satırları (Ticari Ünvan, Tüzel Kişi Temsilcisi, Yönetim Yeri, Tel, Kurumsal E-posta, UETS, Yer Sağlayıcı ünvan+adres, Yayın Yönetmeni) | **ALDIM + BİRLEŞTİRDİM** → ayrı sayfa AÇILMADI; hakkimizda `#kunye` bölümünde ikonlu 2 sütun `kunye-row` grid'i. Eski "Dada Murfak / dadaresmi@gamil.com / 05xxx" placeholder'ları gerçekçi mock'la değiştirildi (yer sağlayıcı ünvan+adres tek satıra indirgendi) |
| Görüş Bildirin modalı (eski feedback) | **ATTIM** (sayfadan) — shell'in Görüş Bildir modalı zaten global; künye notu oraya köprü veriyor |

### iletisim.html (eski)
| Blok | Karar |
|---|---|
| "Bize Ulaşın" tanıtım metni (gerçek TR) | **ALDIM** — intro lead'ine yeniden yazıldı ("lezzet dolu projeler" cümlesi korundu) |
| Form: Ad, Soyad, E-posta, Telefon, Mesaj | **ALDIM** → `fk-*` kitiyle; + Konu select'i eklendi (aşağıdaki birleştirme için) |
| Doğrulama kodu (4983 captcha) | **DÖNÜŞTÜRDÜM** → reCAPTCHA `captcha-note` deseni (form security stack standardı) |
| KVKK onay satırı | **ALDIM** → `fb-kvkk`, linkler yasal-v1'e (?metin=kvkk / aydinlatma) |
| "Beklenmedik sorun" hata durumu | **ATTIM** (mock'ta gereksiz); ?ok=1 başarı durumu `ol-success` mirasıyla eklendi |
| Harita yoktu eski sayfada | **EKLEDİM** — div+bg statik harita placeholder + pin + adres kartı (brief gereği) |

### oneri-ve-sikayet.html (eski)
| Blok | Karar |
|---|---|
| Öneri/şikâyet tanıtım metni + aynı form (Konu alanlı) | **BİRLEŞTİRDİM** → ayrı sayfa AÇILMADI; iletişim formunun Konu select'ine "Öneri" + "Şikâyet" seçenekleri kondu + form altına `fb-route` bandı: shell'in Görüş Bildir modalını açan hızlı yol (eski sayfanın işlevi 2 kanala katıldı) |

### reklam-vermek.html (eski)
| Blok | Karar |
|---|---|
| Tanıtım paragrafı (lorem) + "Dada Haber Reklam Seçenekleri" başlığı (yanlış marka adı!) | **DÖNÜŞTÜRDÜM** → gerçek DadaMutfak medya kiti dili; koyu hero + hedef kitle istatistiği |
| Anasayfa / Alan / Altsayfa Reklamları 3 grubu × 4 "Blok Reklam" kartı | **ALDIM + SADELEŞTİRDİM** → 6 `ad-card` (Masthead 970×250, Leaderboard 728×90, MPU 300×250, Half Page 300×600, Mobil Sticky 320×100, Native/Sponsorlu); grup bilgisi kart üzerinde `ad-tag` olarak (Anasayfa/Alan/Alt Sayfa) |
| "İnceleyin" modalı: Reklam Grubu / Platform / Kanal Etiketi / Ölçüler tablosu | **BİRLEŞTİRDİM** → modal yerine bilgiler kartın kendisinde (platform + kanal etiketi tag'leri, boyut `ad-size` satırı, mock önizleme `ad-stage` oranlı dashed kutu) |
| Örnek banner görselleri (webp) | **DÖNÜŞTÜRDÜM** → nokta-ızgara zeminli oranlı mock önizleme (dış görsel bağımlılığı yok) |

### sponsorluk.html (eski)
| Blok | Karar |
|---|---|
| Altın / Gümüş / Bronz sponsor sekmeleri + logo duvarı (Getir/Trendyol/Hepsiburada tekrarları) | **BİRLEŞTİRDİM** → ayrı sayfa AÇILMADI; reklam-ver-v1'de 3 kademeli `pk-card` paket vitrini (Bronz/Gümüş/Altın — eski tier adları korundu). Logo duvarı atıldı (mock'ta sahte logo duvarı yerine paket içeriği daha bilgilendirici) |

### ihlal.html (eski)
| Blok | Karar |
|---|---|
| İhlal kategori/section'ları (tamamı lorem) | **BİRLEŞTİRDİM** → ihlal bildirimi zaten shell Görüş Bildir modalında konu olarak var; yasal-v1 "Bilgilendirme Metni"ne "İhlal Bildirimleri" maddesi yazıldı + künye notu yönlendiriyor. Ayrı sayfa açılmadı (footer'daki "İhlal Bildir" hedefini kapanis2 bağlarken `yasal-v1.html?metin=bilgilendirme` ya da fb modal seçebilir — bkz. Açık Sorular) |

### Yasal sayfalar (kvkk, aydinlatma-metni, kullanim-kosullari, gizlilik-…-cerez, uyelik, mesafeli, iptal-iade, odeme-teslimat, bilgilendirme)
| Blok | Karar |
|---|---|
| 9 sayfanın TAMAMI başlık + lorem ipsum gövde | **DÖNÜŞTÜRDÜM** → eski sayfalarda alınacak gerçek metin YOK (hepsi lorem). Başlık seti ve slug sözleşmesi eskiden alındı; içerikler mockup için sıfırdan, kısaltılmış ama gerçekçi TR hukuk diliyle yazıldı (KVKK m.5/m.8/m.11, 6502 sayılı kanun, 14 gün cayma, 5651 künye yükümlülüğü vb. gerçek referanslarla) |
| 9 ayrı HTML sayfası | **BİRLEŞTİRDİM** → tek şablon `yasal-v1.html?metin=` — slug sözleşmesi AYNEN brief'teki gibi: `kvkk` (varsayılan) · `aydinlatma` · `kullanim` · `cerez` · `uyelik` · `mesafeli` · `iade` · `teslimat` · `bilgilendirme` |

## 2. Tasarım Kararları & Bileşen Mirası

- **hakkimizda-v1**: `below-header lst-top` koyu hero (seo-landing VERBATIM) + `.seo-prose` hikâye + yeni `val-card` (boş-durum ikon kutusu dilinden) + `statband` (v3a appband'den türetildi — sabit bg, ≤1024 scroll fallback aynı) + `chef-card` ekip rayı (v3a VERBATIM, 6 kolona uyarlandı + mobil snap) + `kunye-row` grid'i (seo-aside panel dilinden) + `bridge-card` CTA üçlüsü (Şef Ol → tarif-ekle, Diyetisyen Ol → diyetisyen-ol, Reklam Ver → reklam-ver; yeşil yalnız sağlık kartında).
- **iletisim-v1**: diyetisyen-ol başvuru ailesi — `form-card + fk-*` VERBATIM, `ol-success` ?ok=1, `tips-card` süreç rayı; yeni `ci-card` bilgi kartı + `fb-route` (Görüş Bildir köprüsü, `fbTab.click()` ile shell modalı açılıyor) + `map-box` div+bg statik harita (pin + adres kartı overlay).
- **reklam-ver-v1**: lst-top hero + yeni `ad-card/ad-stage` vitrini (nokta-ızgara zemin, oranlı dashed önizleme — pill yok, radius token) + `pk-card` paket üçlüsü (orta kart featured) + statband + diyetisyen-ol form mirası (`uz-pick` çoklu seçim ilgi alanları; burada max-5 sınırı yok, toggle). Fiyat: gerçek rakam YAZILMADI ("Aylık plan · 3 ay taahhüt" + Teklif İste) — medya kiti fiyatı satışta değişken, mock'ta rakam uydurmak yanıltıcı olurdu.
- **yasal-v1**: sol sticky `lg-side` dizini (lst-side facet panelinin sadeleşmiş akrabası; ≤1024 chip satırına döner) + `lg-main` beyaz kart içinde `.seo-prose` (+ yasal için `ul` bullet override — kılavuzdaki "bullet reset" notu gereği custom marker) + `lg-toc` içindekiler (h3 anchor'larından JS ile kurulur, `scroll-margin-top:130px`) + `lg-defs` tanım tablosu + önceki/sonraki gezinme. JS motoru: ?metin= → başlık + crumb + document.title + gövde + aktif menü.
- **hata-v1**: header/footer kalır. İllüstrasyonlar dış görselsiz inline SVG, token renkleriyle: 404 = boş tabak (krem/beyaz tabak, üzgün surat, tek kırıntı, soru işaretli buhar, çatal-bıçak); 500 = devrilmiş slate tencere (sersem X-X gözler, domates rengi dökülme, yuvarlanan kapak, sarı yıldızlar). Arama formu `action="arama-v1.html" method="get" name="q"` — kapanis2'nin sayfasına şimdiden bağlı. Popüler Tarifler: `r-card` + `grid-4` (v3a/seo-landing VERBATIM; mobil yatay snap) → tarif-detay-v1 / tarif-liste-v1.
- Section zemin ritmi her sayfada gri↔beyaz alternasyonu; koyu statband separatör olarak (v3a appband deseni).
- Unsplash görsellerinin tamamında filtre suffix'i `exp=7&gam=6&sat=-9&high=8&vib=5`.

## 3. Kabul Kriterleri Doğrulaması

| Kriter | Sonuç |
|---|---|
| Konsol 0 hata (capture-phase error+unhandledrejection probe, dump-dom) | 11 URL varyantının tamamı **0 hata** |
| 390 taşmazlık (same-origin iframe probe, scrollWidth) | 10 varyantın tamamı **390/390** (≤391) |
| Header-altı nefes | 5 sayfada `.below-header` VAR, pt:112px; ilk içerik satırı iç nefesi: 4 sayfada rd-crumb 18px, hata'da err-wrap 46px (≥16 ✓) |
| SS 1440 + 500 + param durumları | aşağıda |

## 4. SS Yolları (mockups/.ss-scratch/)

- hakkimizda-v1-1440.png · hakkimizda-v1-500.png
- iletisim-v1-1440.png · iletisim-v1-500.png · iletisim-v1-ok-1440.png · iletisim-v1-ok-500.png (?ok=1)
- reklam-ver-v1-1440.png · reklam-ver-v1-500.png · reklam-ver-v1-ok-1440.png · reklam-ver-v1-ok-500.png (?ok=1)
- yasal-v1-1440.png · yasal-v1-500.png · yasal-v1-mesafeli-{1440,500}.png · yasal-v1-cerez-{1440,500}.png
- hata-v1-1440.png · hata-v1-500.png (404) · hata-v1-500-{1440,500}.png (?kod=500)

Üretici scriptler (yeniden üretim için): `mockups/.ss-scratch/gen/` (shared.py + p1..p5).

## 5. AÇIK SORULAR (iş durmadı, karar verildi — Beyar onayına)

1. **Footer "İhlal Bildir" hedefi**: ayrı ihlal sayfası açılmadı (eski ihlal.html lorem'di). Önerilen hedef: Görüş Bildir modalı (konu=ihlal) ya da `yasal-v1.html?metin=bilgilendirme#b4`. Kapanis2 footer'ı bağlarken seçmeli.
2. **Yasal metinlerin içeriği**: eski sayfalar tamamen lorem olduğu için hukuk metinleri mock olarak sıfırdan yazıldı — gerçek yayında hukukçu onayı şart; "Son güncelleme: 12 Mayıs 2026" tarihi tüm metinlerde ortak mock.
3. **Künye gerçek verileri**: ticari ünvan/UETS/yer sağlayıcı mock (eski sayfada da placeholder'dı: "Dada Murfak", "05xxx"). Gerçek tüzel bilgiler Yasin Bey'den gelmeli.
4. **Reklam fiyatları**: paketlerde rakam yerine "Teklif İste" tercih edildi; fiyat listesi PDF/medya kiti varsayımı. Rakam istenirse pk-price satırı hazır.
5. **Ekip bandı isimleri**: gerçek ekip bilinmiyor; mock isimler (Yasin Yavuz kurucu olarak gerçek). Foto/isim seti onayda revize edilir.
6. **grid-4 tablet (641–1024) 2 kolon** kuralı v3a'da açık tanımlı değildi; hata sayfasında eklendi (4 kolon tablet'te taşardı). Master'a port edilmeli mi?

## 6. Kaldığım Yer

Beş sayfa da BİTTİ; tüm kabul kriterleri geçti. Bekleyen iş yok.
