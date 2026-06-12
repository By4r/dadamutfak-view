# CİLA-2 Faz 1 — SAĞLIK modülü raporu (teammate: saglik, task #3)

Çalışma dizini: `mockups/` · Sunucu: http://localhost:8765/
SS'ler: `mockups/.ss-scratch/cila2/saglik/` · Probe: `inj/probe.py`

Tüm "Dada Denedi" grep'i = **0** (zaten yoktu; setimde bir tane bile geçmiyor).
390px yatay taşma = **0** (tüm sayfalar sw=375, iframe probe). Konsol hatası = **0**.

---

## İŞ 1 — Sağlık testleri 2 gruba ayrıldı + tab'lı LİSTE sayfası

**Karar:** `saglik-testler-v1.html`'in GÖVDESİ (hero'ya DOKUNMADAN) tek-test quiz
ekranından → **2 sekmeli test LİSTE sayfasına** dönüştürüldü. Site-geneli link
değişikliği gerekmedi (nav "Testler" ve hub "Tüm Testler" zaten buraya işaret
ediyordu).

- **Grup adlandırması (benim kararım):**
  - **Sağlık & Beslenme** (bilgi/sağlık odaklı) — 6 kart: Beslenme, Metabolizma,
    Su & Hidrasyon, Mutfak Bilgisi, Şeker Dengesi, Uyku & Enerji
  - **Eğlence & Kişilik** (eğlence testleri) — 4 kart: Sen bir yemek olsan?,
    Tatlıcı mı tuzcu mu?, Hangi dünya mutfağı?, Mutfaktaki tarzın
- **Sekme dili:** `.pf-tabbar/.pf-tabs` MİRAS alındı (diyetisyen-profil'den),
  yeni sekme İCAT EDİLMEDİ; ortalandı, yeşil aktif (sağlık aksanı). Eğlence
  kartları `.hub-card.fun` ile domates aksanına döner.
- **Derin link:** `?grup=saglik|eglence` (sekme tıklamasında URL güncellenir).
- Eski inline beslenme quiz motoru kaldırıldı; yerine sade tab JS geldi.
- **Bonus (tutarlılık):** Beslenme testi içeriği kaybolmasın diye
  `test-detay-v1.html` TESTS sözlüğüne **`beslenme`** testi eklendi (8 soru +
  3 sonuç tipi + bar + 4 tarif; `habit` tipi). Tüm "beslenme" linkleri artık
  `test-detay-v1.html?test=beslenme`'ye gidiyor (saglik-hub kartı da güncellendi).

SS: `testler-saglik.png`, `testler-eglence.png`, `testdetay-beslenme.png`, `m-testler.png`
Probe: tab geçişi OK (eglenceVisible=true, saglikHidden=true, funCards=4).

## İŞ 2 — Diyetisyen liste kartı (.dz-card) bilgi yoğunluğu azaltıldı

`diyetisyen-dizin-v1.html` — hero/breadcrumb/facet'e DOKUNULMADI; yalnız kart dili.
- **İkon-only doğrulama:** ad satırını kıran "Doğrulandı" metin pili → sade yeşil
  onay ✓ ikonu (font-size:0 ile metin gizlendi). Bu kartların 2 satıra taşıp
  **asimetrik yükseklik** üretmesini bitirdi.
- **Etiketler 2'ye indirildi** (tek satır, nowrap; `nth-child(n+3){display:none}`).
- **Künye meta 2'ye indirildi** (şehir + görüşme türü; deneyim yılı profile bırakıldı).
- Sonuç: kartlar arası yükseklik dengeli, tek satır ritmi, daha az gürültü.
- **Karar notu:** Tüm bilgiyi göstermek zorunlu değildi (talimat) — slider yerine
  kapsama (2 etiket) tercih ettim; uniform kart yüksekliği için daha temiz.

SS: `dizin.png`, `m-dizin.png` · Probe: sw=375, taşma yok.

## İŞ 3 — Diyetisyen tarifleri modülü (profilde sekme)

`diyetisyen-profil-v1.html` — diyetisyenin tarifleri ayrı bir **"Tarifleri"
sekmesine** taşındı (önce "Örnek Menüler" tab'ının dibine gömülüydü).
- `.pf-tabbar/?tab=` MİRAS — yeni sekme eklendi: Hakkında · Hizmetler ·
  Örnek Menüler · **Tarifleri (12)** · Yorumlar.
- **r-card VERBATIM** miras alındı; 4 karttan **8 karta** genişletildi (gerçek
  tarif koleksiyonu hissi) + "Tümünü Gör" köprüsü.
- Tab JS `valid` dizisine `tarifler` eklendi; `?tab=tarifler` derin link çalışıyor.

SS: `profil-tarifler.png` · Probe: tarifPaneVisible=true, recCards=8.

## İŞ 4 — Bugün Ne Pişirsem YENİDEN KURULDU (menü çıktısı + hazır menüler)

`bugun-ne-pisirsem-v1.html` — beğenilmeyen "düz tarif grid'i sonucu" kaldırıldı.
Eski sitedeki **hazır-menü = tarif koleksiyonu** modeli yeni tasarım diliyle
uygulandı.

- **Kör nokta dolduruldu:** Sihirbaz artık SONUNDA bir **MENÜ ÇIKTISI** gösteriyor —
  kaplara bölünmüş (Başlangıç → Ana → Yan → Tatlı), `gunun-menusu` `mc-course/
  menu-set/menu-bar` dili VERBATIM miras. Düz 6'lı r-card grid'i tamamen silindi.
- **Çalışan JS mock menü motoru:**
  - Her kabın tarif havuzu var → **"Bu kabı değiştir"** havuzda döner (swap).
  - **"Menüyü Yenile"** tüm kapları yeniler (regenerate).
  - **Menü özet barı:** kap sayısı · ~toplam süre · malzeme + Deftere Ekle /
    Alışveriş Listesi aksiyonları.
  - Sihirbaz seçimleri menü varyantına çevriliyor (Vejetaryen→vejetaryen,
    Misafir İçin→misafir, Çocuk Dostu→cocuklu, Düşük Kalori→saglikli,
    Kahvaltı→kahvalti, 15-30dk→hizli).
- **Hazır Menüler bölümü** (koleksiyon kartı dili `.menu-card/menu-thumbs/
  menu-cnt/menu-meta` §2b MİRAS, `.hm-*` prefix): 6 seçilebilir hazır sofra
  (Misafir, Hızlı Akşam, Sağlıklı Gün, Çocuklu Sofra, Pazar Kahvaltısı,
  Vejetaryen). Karta tıkla → o menü sonuç ekranına yüklenir + scroll.
- **Wizard/stepper KURALI korundu:** mevcut `.stepper/.stp/.wiz-foot/bnp-*`
  ailesi aynen kullanıldı, yeni stepper icat edilmedi.
- **Derin linkler:** `?sonuc=1` (sihirbaz sonucu), `?menu=<key>` (hazır menü),
  `?step=N`, `?bos=1` (boş durum).

SS: `bnp-wizard.png`, `bnp-menu.png` (sihirbaz menüsü), `bnp-hazir.png`,
`m-bnp-menu.png` (mobil — menü-set yatay snap slider'a döndü).
Probe: wizard→step5 OK, menuCards=4, swap değişti (Ezogelin→Mercimekli),
hazır menü yükleme OK (Pazar Kahvaltısı, ilk kap "Kahvaltılık 1/4").

---

## Kanıt özeti (iframe probe @390px, inj/probe.py)
```
testler-overflow   sw=375 tabs=2 health=6 errs=[]
testler-tabswitch  eglenceVisible=true saglikHidden=true funCards=4
testdetay-beslenme sw=375 h1="Beslenme alışkanlığın ne durumda?"
dizin-overflow     sw=375 (görünür etiket=2; DOM'da 3, CSS ile gizli)
profil-tarifler    tarifPaneVisible=true recCards=8
bnp-wizard-flow    step5=true menuCards=4 firstRecipe="Ezogelin Çorbası"
bnp-swap           swapChanged=true (Ezogelin→Mercimekli)
bnp-hazir-load     step5active=true menuTitle="Pazar Kahvaltısı menüsü"
```

## Değişen / yeni dosyalar
- `mockups/saglik-testler-v1.html` — gövde: tab'lı test liste (hero korundu)
- `mockups/test-detay-v1.html` — TESTS'e `beslenme` testi eklendi
- `mockups/saglik-hub-v1.html` — Beslenme kartı linki → test-detay?test=beslenme
- `mockups/diyetisyen-dizin-v1.html` — dz-card yoğunluk azaltma (CSS)
- `mockups/diyetisyen-profil-v1.html` — yeni "Tarifleri" sekmesi + pane (8 r-card)
- `mockups/bugun-ne-pisirsem-v1.html` — menü çıktısı + hazır menüler + JS motor
- Yeni test LİSTE dosyası açılmadı (öneriye uyup mevcut dosyanın gövdesi dönüştürüldü).

## Beyar incelemesi bekleyenler / tereddütler
1. **saglik-testler hero'su** SCOPE KİLİDİ gereği elimde değildi — hâlâ tek-test
   ("Beslenme Testi") başlığını taşıyor ama gövde artık LİSTE. Hero↔gövde
   uyumsuzluğu FAZ 3'e bırakıldı (talimat gereği).
2. **dz-card:** deneyim yılı (yıl) karttan çıkarıldı, görüşme türü tutuldu.
   Tersi de tercih edilebilir — yıl güçlü güven sinyali. Beyar kararı.
3. **Beslenme testi** test-detay'a taşındı (içerik kaybını önlemek için, kendi
   dosyam). 8 soru korundu, sonuç tipleri/tarifler yeniden yazıldı.
4. **Hazır menü "+N" rozetleri** ve toplam süreler mock değerler.

---

# REVİZE TURU — Task #8 (R9 + R10)

## R9 — diyetisyen-dizin kart iç düzeni SIFIRDAN
`.dz-card` iç anatomisi yeniden kuruldu — **hairline'lı 3 zon ritmi**:
- **Zon 1 (header):** avatar (58px, kimlikle dikey ortalı) + ad+✓ / ünvan / puan;
  `.dz-id` flex-column 5px iç ritim. Ad ve ünvan tek satır clamp; puan satırı nowrap.
- **hairline** → **Zon 2 (gövde):** 2 etiket satırı + meta satırı (şehir·görüşme), 12px ritim.
- **hairline** → **Zon 3 (foot):** krem zemin; "Seans başı ₺750" solda, "Profili Gör →" sağda.
- Önceki turdaki tutarsız zon padding'leri (tags `2/18/14`, meta `0/18/16`) → hepsi
  16px tabanına hizalı tek ritim. Avatar 72→58 (sağ kolonla denge). Ribbon varsa
  header'a `:has()` ile +nefes.
- Kanıt yakın plan SS: `.ss-scratch/cila2/saglik/r8/card-closeup.png` + grid: `dizin-grid.png`.
- Probe: 390 ovf=0, konsol 0.

## R10 — BNP sihirbaz TAMAMEN kaldırıldı → mod + hazır menü koleksiyon modeli
Stepper'lı 4-adım sihirbaz HTML+JS'ten **tamamen söküldü** (runtime ref = 0).
Yeni akış = eski site modeli, yeni dille:
1. **Yemek Modları** (`.mode-bar` chip rayı): Tüm Menüler · Günlük · Misafir · Hızlı ·
   Sağlıklı · Çocuklu · Vejetaryen · Kahvaltı. Mod seçilince menüler filtrelenir.
2. **Menü listesi** (`.hm-card` koleksiyon kartı + mod rozetleri): seçili moda uygun
   hazır menüler. 8 menü; her menü = kaplara bölünmüş koleksiyon.
3. **Menü detayı = koleksiyon mantığı** (`mc-course/menu-set` MİRAS): menü açılır,
   her kapta **Değiştir** (havuzda döner) + **Çıkar**; sona **+ Kap Ekle** tile'ı
   (kap tipi seçtirir); **Adını Değiştir** (contenteditable rename) + **Deftere Kaydet**
   (toast). Tümü çalışan JS mock.
- Derin link: `?mod=<key>` · `?menu=<key>`. Geri = "Menülere dön".
- Kanıt SS: `r8/bnp-list.png`, `bnp-detail.png`, `bnp-mode.png`, `m-bnp-detail.png`.
- Etkileşim probe (iframe, 0 konsol hatası): mod filtre (hizli→2 kart) · menü aç
  (4 kap + add tile) · swap (Ezogelin→Mercimekli) · çıkar (4→3) · ekle (2→3).
- Probe: 390 ovf=0 (liste + detay), konsol 0.

### Tereddüt / Beyar incelemesi bekleyen
- **İnert wizard CSS:** sihirbaz HTML+JS silindi ama ~43 wizard-only CSS kuralı
  (stepper/pick/form-card/res-grid…) `.bnp-body` ile İÇ İÇE geçtiği için cerrahi
  silme yüksek riskli; görünmez/ölü bırakıldı. İstenirse ayrı temizlik turu açarım.

## R9 v2 (2. tur — kompozisyon SIFIRDAN, simetrik merkezli)
1. tur (yan-yana 3 zon) Beyar'da "avatar altı boşluk fazla, dengesiz/asimetrik"
diye reddedildi. Kompozisyon baştan kuruldu — **tek dikey simetri ekseni**:
- Avatar (72px) ÜSTTE ortalı → ad✓ → ünvan → puan: hepsi MERKEZ hizalı (yan-yana
  float kalktı → "avatar altı boşluk" sorunu kökten bitti).
- hairline → merkezli etiketler + merkezli meta → hairline.
- Foot (krem): "Seans başı ₺750" satırı + **tam-genişlik "Profili Gör" CTA** (hover'da
  domates dolar). Footer artık simetrik, sol-sağ asimetri yok.
- Kanıt: yakın plan `r8/card-closeup2.png` + grid `r8/dizin-grid2.png`; 390 ovf=0, konsol 0.

R10 değişmedi (zaten istenen mod→liste→koleksiyon modeli); re-probe: mod "hızlı"→2 kart,
ovf=0, konsol 0.

## R15 (revize) — BNP mod chip'leri GÖRSELLİ yapıldı
Sade metin+ikon mod chip'leri → **görsel mod kartı rayı** (kategori `cat-card` görsel
dilinden ilham; eski template "Yemek Modları" image-card sunumuna uygun).
- Her mod = arka plan görselli kart (148×94) + alt gradient overlay + ikon+etiket
  (beyaz, görsel üstünde) + sağ-üst onay rozeti (`.mc-chk`); aktif modda domates
  border + ring + rozet belirir. Hover'da görsel zoom + kart kalkar.
- 8 moda temalı Unsplash görseli atandı (THQ filtre suffix'i ile, retina çarpma yok).
- `<img>` değil `div.mc-bg + background-image cover/center` (Kerem Bey pattern'ı).
- JS değişmedi (yalnız chip markup'ı görselleşti); mod seç → liste filtrele akışı aynı.
- KANIT: r8/r15-modes-1440.png + r15-modes-390.png (mobil yatay snap rayı).
  Probe: 8 kart (mc-bg+mc-chk var), aktif geçiş tumu→misafir (tek aktif), filtre→1 kart,
  390 ovf=0, konsol 0.
