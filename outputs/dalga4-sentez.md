# DALGA 4 SENTEZ — Diyetisyen Paneli + Kapanış Sayfaları (SON üretim dalgası)

> Tarih: 2026-06-11 · Mod: kesintisiz, lead-ön-görevli agent team (Beyar kararı)
> 4 teammate (panel1, panel2, kapanis1, kapanis2) + lead ön görev. COMMIT ATILMADI —
> Beyar onayı bekleniyor.

---

## 1. SAYFA DURUMLARI (13 yeni dosya — hepsi KABUL, kanıtlı)

Kabul kanıtı her sayfada: lead'in BAĞIMSIZ konsol probu (ERRS:0) + 390 iframe
taşma probu (SW:390) + 1440/500 SS + grep (kritik class/sözleşme).

### Lead ön görevi — panel dili
| Dosya | Durum | Not |
|---|---|---|
| `panel-shell.html` | ✔ KABUL | Diyetisyen paneli kanonik iskeleti: koyu slate sidebar + 64px topbar + gri zeminde beyaz kart ritmi, yeşil aksan. Dashboard örneği (KPI/randevu/mesaj/danışan kartları). Kılavuza **§2e PANEL DİLİ** yazıldı. 1fr→minmax(0,1fr) taşma vakası burada yakalandı, kural §2e'ye işlendi. |

### panel1 (rapor: `outputs/panel1-rapor.md`)
| Dosya | Durum | Param durumları |
|---|---|---|
| `dyt-randevular-v1.html` | ✔ KABUL | `?gorunum=gun` · `?detay=1` drawer |
| `dyt-danisanlar-v1.html` | ✔ KABUL | `?danisan=1` detay (SVG kilo eğrisi) · `?kart=1` · `?bos=1` |
| `dyt-mesajlar-v1.html` | ✔ KABUL | `?bos=1` · `?sohbet=1` (mobil akış) |

### panel2 (rapor: `outputs/panel2-rapor.md`)
| Dosya | Durum | Param durumları |
|---|---|---|
| `dyt-receteler-v1.html` | ✔ KABUL | canlı arama/filtre, şablon kartları → builder |
| `dyt-recete-builder-v1.html` | ✔ KABUL (yıldız) | `?sablon=1/2/3`; 7g×5 öğün board, CANLI kcal/makro toplam (DOM probe: 480→840 kanıtlı), tarif arama popover'ı |
| `dyt-profil-ayar-v1.html` | ✔ KABUL | `?tab=profil|hizmet|takvim|ayarlar`; diyetisyen-profil alan eşleşmesi |

### kapanis1 (rapor: `outputs/kapanis1-rapor.md`)
| Dosya | Durum | Param durumları |
|---|---|---|
| `hakkimizda-v1.html` | ✔ KABUL | künye `#kunye` bölüm olarak entegre |
| `iletisim-v1.html` | ✔ KABUL | `?ok=1`; öneri-şikâyet konu seçimine katıldı |
| `reklam-ver-v1.html` | ✔ KABUL | `?ok=1`; eski reklam+sponsorluk tek sayfa |
| `yasal-v1.html` | ✔ KABUL | `?metin=kvkk(vars.)|aydinlatma|kullanim|cerez|uyelik|mesafeli|iade|teslimat|bilgilendirme` |
| `hata-v1.html` | ✔ KABUL | `?kod=404` boş tabak / `?kod=500` devrilmiş tencere (CSS/SVG illüstrasyon) |

### kapanis2 (rapor: `outputs/kapanis2-rapor.md`)
| Dosya | Durum | Param durumları |
|---|---|---|
| `arama-v1.html` | ✔ KABUL | `?q=` · `?tab=` 6 sekme · `?empty=1` |
| `sezon-v1.html` | ✔ KABUL | Ramazan şablonu (canlı iftar sayacı); başka sezona uyarlanabilir (rapor §) |
| `sss-v1.html` | ✔ KABUL | `?kat=` 5 kategori, akordeon + canlı arama |

**Revize istatistiği:** Loop sigortası hiç tetiklenmedi — 13 sayfanın 13'ü ilk
turda kabul (0 revize). "Beyar incelemesi bekliyor" listesi BOŞ.

---

## 2. SİTE-İÇİ NAVİGASYON (lead, bitiş zinciri ①)

- **Panel girişi:** diyetisyen-profil-v1 aksiyon kolonuna `.pf-panel` "Diyetisyen
  Paneli" linki (mock giriş varsayımı) → panel-shell.html
- **panel-shell sidebar + dashboard linkleri** gerçek dyt-* dosyalarına bağlandı
  (teammate sayfalarında sözleşme zaten uygulanmıştı)
- **Header büyüteç → arama-v1.html:** 51 dosyada (`onclick` deseni, kapanis2
  çözümüyle aynı); _shell.html de bağlandı — gelecek sayfalar mirasla alır
- **Footer denetimi (kapanis2):** 53 dosyada 14 ortak kırık link gerçeğe bağlandı
  (SSS/kurumsal/7 yasal+teslimat); lead inceltmesi: "Künye" → `hakkimizda-v1.html#kunye` (53 dosya)
- **Hata sayfası iç linkleri:** eve dön + arama + popüler tarifler bağlı (kapanis1)
- **Tıklama yolculuğu probu (gerçek click, iframe):** 3/3 PASS
  - A: diyetisyen-profil → Panel → panel-shell → Randevular ✔
  - B: anasayfa → footer SSS → sss-v1 → büyüteç → arama-v1 ✔
  - C: hata-v1 → footer KVKK → yasal-v1?metin=kvkk ✔

---

## 3. AÇIK SORULAR — TEK LİSTE (22) — Beyar cevabı bekleniyor

### Panel ailesi (panel1 §4 + panel2 §4)
1. Aylık takvim görünümü v2'ye mi? (docx "haftalık/aylık" diyor, brief Hafta/Gün istedi)
2. `.vw-seg/.vs-btn` panel segment dili kılavuz §2e'ye işlensin mi? (iki sayfada doğdu)
3. Panel shell kopya politikası: tam kopya mı, kullanılmayan bileşen CSS'i trim mi? (panel1 trim yorumu yaptı)
4. Danışan kilo grafiği hedef çizgisi rengi: sarı kesikli mi (seçilen), domates mi?
5. Randevu drawer butonları durum-bazlı olmalı mı? (onaylıda "Yeniden Planla/İptal", bekleyende "Onayla/Reddet")
6. Sidebar Randevular sayacı (5) mock kurgularla tam tutarlı değil — shell ortak değeri korundu.
7. **Persona tutarsızlığı:** panel "Dyt. Elif Yıldırım" vs public profil "Uzm. Dyt. Elif Şahin" — tek personaya toplansın mı?
8. Builder hedef kalori ↔ `gunluk-kalori-v1` hesaplayıcı köprüsü ("danışan verisinden hesapla") sonraki tura mı?
9. Reçete PDF'i: danışan görünümlü print şablonu (print CSS / ayrı sayfa) gerekli mi? (şimdilik mock toast)
10. Reçete listesine toplu işlem + Excel aktar gelsin mi? (eski tarif_list'te vardı, tekil kullanım varsayımıyla atlandı)
11. "Müsaitlik Ekle" hedef sözleşmesi: `dyt-profil-ayar-v1.html?tab=takvim` onaylansın mı? (öneri)

### Kapanış ailesi (kapanis1 §5 + kapanis2 §4)
12. Footer "İhlal Bildir" hedefi: Görüş Bildir modalı mı, `yasal-v1?metin=bilgilendirme#b4` mü?
13. Yasal metinler mock hukuk dili — gerçek yayında hukukçu onayı şart (ortak mock tarih: 12 Mayıs 2026).
14. Künye gerçek tüzel bilgileri (ünvan/UETS/yer sağlayıcı) Yasin Bey'den gelmeli.
15. Reklam paketlerinde fiyat: "Teklif İste" tercih edildi — rakam istenirse `pk-price` hazır.
16. Hakkımızda ekip bandı isimleri mock (Yasin Yavuz hariç) — gerçek set onayda revize.
17. `grid-4` tablet (641–1024) 2 kolon kuralı hata sayfasında eklendi — v3a master'a port edilmeli mi?
18. "Şef Ol" footer linki hedefsiz: tarif-ekle-v1'e mi bağlansın, ayrı başvuru sayfası mı?
19. "Öneri ve Şikayet"/"İhlal Bildir" → Görüş Bildir modal bağlantısı shell chrome yetkisi ister — lead/Beyar kararı.
20. `hesaplayici-v1.html`'de site footer'ı hiç yok (Dalga 2 sapması, alias sayfa) — düzeltilsin mi?
21. Sezon: eski Ramazan sayfalarındaki "Günün Ayeti" dini içerik bloğu alınmadı — editöryel/marka kararı.
22. Arama "Son Aramalar" statik mock — gerçeği localStorage/hesap ister (stack kararı sonrası).

> Dalga 3 sentezindeki 18 açık soru AYRICA bekliyor (`outputs/dalga3-sentez.md` §3).

---

## 4. SS YOLLARI (mockups/.ss-scratch/)

- **panel-shell:** `panel-shell-{1440,500,500-nav}.png`
- **panel1:** `dyt-randevular-v1-{1440,500,gun-1440,gun-500,detay-1440}.png` ·
  `dyt-danisanlar-v1-{1440,500,detay-1440,detay-500,kart-1440,bos-1440}.png` ·
  `dyt-mesajlar-v1-{1440,500,bos-1440,sohbet-500}.png`
- **panel2:** `dyt-receteler-v1-{1440,500}.png` · `dyt-recete-builder-v1-{1440,500,arama-1440}.png` ·
  `dyt-profil-ayar-v1-{1440,500,hizmet-1440,takvim-1440,ayarlar-1440}.png`
- **kapanis1:** sayfa başına `-{1440,500}.png` + `iletisim-v1-ok-*`, `reklam-ver-v1-ok-*`,
  `yasal-v1-{mesafeli,cerez}-*`, `hata-v1-500-*` (20 SS)
- **kapanis2:** `arama-v1-{1440,500,tab-tarifler-1440,empty-1440,empty-500,sorgusuz-1440,full-1440}.png` ·
  `sezon-v1-{1440,500,full-1440}.png` · `sss-v1-{1440,500,kat-shop-1440,full-1440}.png`
- **lead nav:** `diyetisyen-profil-panelbtn-1440.png`
- Footer denetim dökümü: `mockups/.ss-scratch/build4/footer-audit.json`

---

## 5. SONRAKİ ADIM (Beyar)

1. SS turu (temsilciler sohbette açıldı; tamamı `.ss-scratch`'te)
2. §3 açık soru cevapları → mini revize turu
3. Onay → **toplu commit** (lead bekliyor, COMMIT ATILMADI)
4. handoff.md + uretim-plani.md dalga kapanışı güncellemesi (commit'le birlikte)
5. Final cila turu scope'u: kılavuz §2d (Dalga 3 adayları hâlâ bekliyor) + pişirme
   modu derinleşmesi + yazdır görünümü + sepet boş-alan kozmetiği + haftalık
   menü→alışveriş köprüsü
