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
