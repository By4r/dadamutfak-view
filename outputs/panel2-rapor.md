# Panel2 Raporu — Dalga 4: Diyetisyen Paneli Ailesi (Reçeteler · Builder · Profil & Ayarlar)

Sahip olunan dosyalar: `mockups/dyt-receteler-v1.html` · `mockups/dyt-recete-builder-v1.html`
· `mockups/dyt-profil-ayar-v1.html`. Baz: `panel-shell.html` kopyası (İÇERİK ALANI dolduruldu,
sayfa CSS'i "SAYFA CSS" işaretinin altına; sidebar/topbar/token'lara dokunulmadı).

---

## 1. L1 — Eski karşılık envanteri + kıyas

Kaynaklar: `drive-download-.../dada-mutfak-panel/` (eski admin viewları) +
`dada-mutfak-diyetisyen.docx` (gereksinimler, `unzip -p ... word/document.xml` ile çıkarıldı).

**Genel bulgu:** Eski panel bir *site yönetim admini* (Metronic tabanlı); diyetisyen paneli
eski sistemde HİÇ YOK. `menu_management/` yemek menüsü değil, site nav menüsü yönetimi
(TH: Menu Adı / Menu URL / Sıra / Durum / İşlem). Üç sayfanın da işlevsel temeli docx'ten geliyor;
eski panel yalnız *tablo/form dili* için kıyas verdi.

### ① dyt-receteler-v1 — eski karşılık: `tarifler/tarif_list.html` (kısmi)
- Eski blok envanteri: tablo (Resim · Yazar · Tarif Adı · Açıklama · Durum · İşlem),
  kategori filtre dropdown'ı, toplu işlem (Toplu Sil / Pasif Yap / Aktif Yap), Excel aktar,
  silme onay modalı ("Evet, eminim").
- Kıyas: tablo + durum rozeti + işlem sütunu dili korundu (`.ptable` + `.pstat` + `.pact`);
  dropdown filtre → canlı arama + chip filtresine modernize edildi. Toplu işlem ve Excel
  taşınmadı (aşağıda açık soru №4). "Reçete/şablon" kavramının eski karşılığı yok —
  gereksinim docx §4'ten.
- ŞABLONLAR bölümünün eski karşılığı yok — docx'te de yok; rakip analizi mantığıyla
  (hazır plan kütüphanesi) brief gereği eklendi.

### ② dyt-recete-builder-v1 — eski karşılık yok — gereksinim docx §4 + §5'ten
- docx §4 birebir karşılandı: günlük öğünler (kahvaltı, ara öğün, öğle, akşam → brief gereği
  5 satır: Ara Öğün ×2), kalori + makro hesaplaması (otomatik — canlı JS toplam),
  diyet notları alanı ("laktozsuz süt tercih edin" örneği fk-textarea placeholder/değerinde),
  PDF çıktısı (mock buton).
- Eski sistemden tek destekleyici iz: `tarifler/add_tarif.html` tarif başına
  Protein (gr) / Yağ (gr) / Karbonhidrat (gr) / Kalori (kcal) alanları tutuyor →
  builder'daki tarif başına mock kcal/makro verisinin gerçek sistemde karşılığı VAR;
  entegrasyon varsayımı güvenli.
- docx §5 (kalori hesaplama aracı reçeteye otomatik aktarılsın) → kısmi: hedef kalori
  manuel alan; hesaplayıcı köprüsü açık soru №2.

### ③ dyt-profil-ayar-v1 — eski karşılık: `profile.html` (çok zayıf, kısmi)
- Eski blok envanteri: Kapak Görseli, İsim Soyisim, Şirket, Telefon, Şirket Site, Ülke,
  Dil, Saat Dilimi, İletişim (e-posta/telefon), KAYDET.
- Kıyas: eski profil generic admin profili — diyetisyen public alanları yok. Alan seti
  docx §1 (foto, açıklama, uzmanlık alanları, randevu/örnek menü) + diyetisyen-profil-v1
  ALAN EŞLEŞMESİ ile kuruldu (aşağıda tablo). Kapak görseli + foto + diller eski profilden
  de doğrulanan alanlar.
- Hizmet/ücret, müsaitlik grid'i, bildirim matrisi: eski karşılık yok — hizmet/ücret
  diyetisyen-profil-v1 "Hizmetler" sekmesinden, müsaitlik docx §3 randevu gereksiniminden,
  ayarlar hesabim-v1 dilinden.

### Profil tab ↔ public profil (diyetisyen-profil-v1) alan eşleşmesi
| Public profilde görünen | Formdaki karşılık |
|---|---|
| pf-ava foto + pf-banner kapak | ava-row foto + cover-prev kapak görseli |
| Unvan (Uzm. Dyt.) + ad | Unvan select + Ad Soyad |
| @handle + başlık satırı | Kullanıcı adı + Profil başlığı |
| pf-bio | Bio textarea (280 sayaçlı) |
| ab-spec uzmanlık chip'leri | spec-chips (max 6, tıkla-seç) |
| pf-meta: konum / deneyim yılı / diller | Konum + Deneyim (yıl) + Diller |
| info-card Eğitim & Belgeler | edu-list satırları (ekle/sil) + Sertifikalar |
| Diploma No · Doğrulandı | dip-row kilitli satır (.pstat ok, değiştirilemez) |
| Dernek üyeliği | Dernek üyeliği input |
| svc-card'lar (ad/süre/ücret/tür) | ?tab=hizmet satırları (3 hizmet birebir aynı değerlerle) |
| "Genelde 2 saat içinde yanıtlar" | YOK — otomatik metrik varsayıldı (formda alan açılmadı) |

---

## 2. Kararlar (miras + bilinçli sapmalar)

1. **Board dili:** builder grid'i `haftalik-menu .wk-board` ailesinden türetildi
   (`bd-*` prefix): 104px etiket kolonu → 96px, tomato ikon aksanı → green,
   tek-kart hücre → çoklu `bc-item` satırı + `bc-sum` öğün toplamı + `bc-add`.
   ≤640 sticky ilk kolon + içeride yatay scroll deseni wk-board'dan verbatim taşındı.
2. **Gün toplam satırı (yeni):** `bd-tot` — kcal + ilerleme çubuğu + P/K/Y + sapma yüzdesi.
   Eşikler: |sapma| ≤%5 yeşil (ok) · ≤%15 sarı (mid) · üstü kırmızı (bad) · boş gün idle.
   Lejant pc-head'de.
3. **Arama popover:** `ie-sugg` fixed popover dili (tarif-ekle/tarif-bulucu) + sonuç satırı
   mc-card mini anatomisi (`tsr-*`). Viewport'a clamp'li konumlama; Esc/dış-tık kapatma.
4. **fk-* kiti VERBATIM** (tarif-ekle) + `.pnl-main` scope'lu yeşil focus override
   (pnl-search focus ringiyle aynı dil) — kit satırları değiştirilmedi, override ayrı satır.
5. **hesabim mirası:** `.tgl` + `.set-row` + `.ntf-matrix` + `.pf-tabs/.dt` verbatim;
   checked/active rengi tomato → green (panel aksan ekseni, §2e) — bilinçli, dokümante sapma.
6. **pstat eşlemesi (receteler):** aktif=ok · taslak=wait · arşiv=off; builder durumu
   default Aktif, `?sablon=` ile Taslak.
7. **Boş durum:** receteler'de arama/filtre 0 sonuç → `.pnl-empty` canlı gösterilir
   (tablo gizlenir); statik örnek yerine çalışan örnek.
8. **Sidebar href sözleşmesi** üç sayfada uygulandı; profil-ayar'da `?tab=ayarlar` →
   sidebar aktifliği JS ile Ayarlar'a geçer (diğer tablar Profil'de kalır).
9. **Mock geri bildirim:** `.copy-note` slate toast (kopyala/PDF/kaydet) — üç sayfada
   aynı desen, panel ailesi ortak dili olarak doğdu.
10. **Mobil builder:** ≤1240 sağ rail `order:-1` ile board'un ÜSTÜNE alınır
    (önce ad/hedef, sonra plan).
11. Tüm görseller div+background-image cover/center; Unsplash filtre suffix'i her URL'de;
    pill yok, emoji yok; tüm panel grid kolonları `minmax(0,1fr)`.

---

## 3. Kabul kriterleri kanıtları

1. **SS'ler** (`mockups/.ss-scratch/`):
   - `dyt-receteler-v1-1440.png` · `dyt-receteler-v1-500.png`
   - `dyt-recete-builder-v1-1440.png` · `dyt-recete-builder-v1-500.png`
   - `dyt-recete-builder-v1-arama-1440.png` (popover açık, "tavuk" sorgusu — arama-ekleme kanıtı)
   - `dyt-profil-ayar-v1-1440.png` · `dyt-profil-ayar-v1-500.png`
   - `dyt-profil-ayar-v1-hizmet-1440.png` · `dyt-profil-ayar-v1-takvim-1440.png`
   - `dyt-profil-ayar-v1-ayarlar-1440.png`
2. **Konsol 0 hata:** window error probe enjekte + `--dump-dom` → title `CLEAN ...`
   3 sayfa + `?tab=hizmet/takvim/ayarlar` + `?sablon=1` hepsinde temiz.
3. **390 taşmazlık:** iframe probe (3 sayfa + 3 tab varyantı) →
   `W390 0:390 1:390 2:390 3:390 4:390 5:390` — hepsi ≤391.
4. **Builder canlı akış probe'u** (gerçek DOM event'leriyle): Paz-akşam hücresine
   `.bc-add` click → popover → input "levrek" → ilk sonuç click →
   `before=480 after=840 hit=Buğulama Levrek cell=true dom=840kcal removed=480`
   (gün toplamı DOM'da canlı güncellendi; `.bc-x` ile silme toplamı geri 480'e düşürdü).
   Probe API'si sayfada kalıcı: `window.dmBuilder = {pool, state, dayTotal, render}`.

---

## 4. Açık sorular (iş durmadı — en yakın akraba/kılavuzla çözüldü, karar Beyar'a)

1. **Persona tutarsızlığı:** panel-shell topbar "Dyt. Elif Yıldırım", public profil sayfası
   (diyetisyen-profil-v1) "Uzm. Dyt. Elif Şahin". Profil formunu shell personasıyla
   (Elif Yıldırım / @elifyildirimdyt) doldurdum; "Public Profili Gör" linki Şahin'in
   sayfasına gider. Mock'ta tek personaya toplanmalı mı?
2. **docx §5 köprüsü:** "kalori ihtiyacı hesaplansın, reçetede otomatik kullanılsın" —
   builder'da hedef kalori manuel. `gunluk-kalori-v1` hesaplayıcısına "danışan verisinden
   hesapla" köprüsü sonraki tura mı?
3. **Reçete PDF'i:** docx "danışan PDF indirebilir" diyor — şimdilik mock toast.
   Danışan görünümlü print şablonu (ayrı sayfa / print CSS) gerekli mi?
4. **Toplu işlem + Excel:** eski tarif_list'te var (toplu sil/aktif/pasif, Excel aktar);
   diyetisyen reçete listesine taşımadım (tekil kullanım varsayımı). İstenirse `.ptable`
   checkbox kolonu + `.lst-bar` benzeri toplu aksiyon barı eklenir.
5. **Müsaitlik giriş noktası:** panel-shell dashboard'daki "Müsaitlik Ekle" butonu ve
   panel1'in randevular sayfası, müsaitliğe link verecekse hedef
   `dyt-profil-ayar-v1.html?tab=takvim` olmalı (sözleşmeye ek öneri).

## 5. Durum

Üç sayfa da BİTTİ; context sıkışması yok, kaldığım yer yok. Temp probe HTML'leri
`.ss-scratch`'ten silindi, SS'ler duruyor. Commit atılmadı (kural gereği).
