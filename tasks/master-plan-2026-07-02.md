# KOVA 1 — Master Execution Planı (A1b, A4, A5, A6, A7, A8)
Tarih: 2 Temmuz 2026 · Plan-only session (Fable 5, read-only keşif — hiçbir şey uygulanmadı)

> **GÜNCELLEME (aynı gün, Beyar onayı sonrası):** A1b ✅ (4d3c977 — gerçek durum ölü df-* CSS çıktı,
> canlı hero'lar sağlamdı; dadafit-hub full-viewport DOĞRU render ediyor, dokunulmadı) ve
> A6 ✅ (76100b2 — diyetisyen-bul-v1 wizard + saglik-hub/dizin kablolama) uygulandı, canlıda.
> Kalan: A4 (framing kararı) · A5 (keşif session'ı) · A7 (sheet) · A8 (2 karar). Detay checklist'te.

> **Amaç:** Her iş kendi TAZE session'ında uygulanacak; bu doküman o session'lara yön veren
> kalıcı plan. Keşif bulguları grep-teyitli (2 Tem 2026 working tree, HEAD `b421726`);
> satır numaraları ileride kayabilir, implement session'da yeniden grep'le.
>
> **Sabit kurallar (her implement session'ı için):** targeted edit only · frontend-design
> skill zorunlu · nav/footer her sayfada AYRI KOPYA → değişiklik tüm marka sayfalarına
> yayılmalı · no-cache QA (:8771, `?cb=$RANDOM`) · sahte data/mekan/istatistik YOK ·
> commit Beyar gate'ine bağlı, ayrı concern = ayrı commit · **DOKUNMA:** sezon-v1,
> yol-guzergahim v1/v2, Gastro referans sayfaları.

---

## A1b — Fit full-viewport hero tutarsızlığı (program-detay + egzersiz-detay) + dadafit-hub incelemesi

**Durum: HAZIR** — keşif tam, çözüm A1'de kanıtlı (enerji-defteri, commit `9cf32b1`).

**Keşif bulguları (grep-teyitli):**
- `program-detay-v1.html` — ÇİFT kilit:
  - satır 790 (base): `.df-top{...margin-top:112px;min-height:calc(100svh - 112px);...}`
  - satır 1167 (mobil @media): `.df-top{margin-top:62px;...;min-height:calc(100svh - 62px)}`
- `egzersiz-detay-v1.html` — kilit SADECE mobil @media'da göründü (satır 992:
  `min-height:calc(100svh - 62px)`). Base `.df-top{` kuralı bu grep'te çıkmadı —
  implement session'da base kuralı farklı formatta mı yoksa gerçekten min-height'sız mı
  TEYİT ET (desktop'ta sorun görünmüyorsa mobil-only fix yeter).
- `dadafit-hub-v1.html` — ⚠️ checklist "hub olduğu halde full-viewport DEĞİL" diyordu ama
  CSS'te kilit VAR (satır 814 + 1191: `min-height:100vh;min-height:100svh`). Ters-durum
  gözlemi muhtemelen render semptomu (içerik zaten viewport'tan uzun → kilit görsel fark
  yaratmıyor) ya da gözlem eskimiş. Hub'da full-viewport İSTENEN durum (Diet saglik-hub
  kanonu) → büyük olasılıkla A1b'de dadafit-hub'a dokunulmaz; render'la doğrula, raporla.

**Kapsam:** 2 dosya edit (program-detay, egzersiz-detay) + 1 dosya render-inceleme
(dadafit-hub). Pattern: A1 çözümü birebir — min-height full-viewport kilidini kaldır +
hero padding trim; iç-sayfa hero yüksekliği `hareket-rehberi-v1` iç-sayfa kanonuna hizalı.

**Workflow: TEK SESSION, sıralı.** 2 dosya + 1 inceleme; team apaçık overkill.

**Bağımlılık:** Yok — A1 pattern'ı canlıda, hemen uygulanabilir. QA: 1440+390 full render,
enerji-defteri (fixli) + hareket-rehberi (kanon) ile yan yana karşılaştır.

**Context ağırlığı: HAFİF.**

---

## A4 — DadaDiet güven katmanı UI (disclaimer + uzman profil alanları + içerik meta)

**Durum: KISMEN BLOKLU** — iskelet ("örnek" çerçeveli) yapılabilir; framing kararı Beyar'dan.

**Kapsam:**
- `diyetisyen-profil-v1.html` — mevcut `pf-verify` öğesi VAR (grep-teyitli), genişletilecek:
  diploma / uzmanlık / kayıt no / doğrulama tarihi bloğu. Alanlar "Örnek" rozetli iskelet.
- `diyetisyen-dizin-v1.html` — kart üstü doğrulama rozeti (profildeki bloğun özeti).
- Sağlık içerik sayfaları (beslenme-* 6 makale + besin-degerleri/karbonhidrat/protein vb.) —
  içerik-meta şeridi: kaynak · uzman onayı · son güncelleme. Pattern: mevcut `reh-htrust`
  (beslenme-dengeli-tabak'ta grep-teyitli) genişletilir, sıfırdan tasarım YOK.
- `saglik-hub-v1.html` + makale altları — disclaimer şeridi (beslenme pilotundaki
  disclaimer + diyetisyen CTA deseni zaten var, standardize edilir).
- "Örnek" rozet çerçevesi: etkinlikler-v1'deki `disc-badge` "Örnek" dili aynen.

**Workflow: TEK SESSION.** Dosya sayısı ~10–25 ama tek pattern'ın mekanik yayılımı.
Model: diyetisyen-profil PİLOTU → Beyar gate → kalan sayfalara yayılım. Team gereksiz
(tek domain, tek pattern; paralel worker'lar aynı şeridi farklı yorumlama riski taşır).

**Bağımlılık:** A6'dan bağımsız ama İKİSİ DE diyetisyen-dizin'e dokunabilir → A4 ve A6'yı
ayrı session'larda ARDIŞIK yap, paralel değil.

**Blok açan sorular (Beyar/Yasin):**
1. Uzman profil alanları "Örnek" rozetli iskelet olarak mı basılsın, yoksa Yasin'den
   gerçek diyetisyen datası mı beklenecek? (Handoff eğilimi: iskelet OK, data sonra.)
2. Disclaimer metnini genel/hukuki-nötr taslak olarak CC mi yazsın, hazır metin mi gelecek?
3. İçerik-meta'daki "uzman onayı" isimsiz mi ("Diyetisyen onaylı") yoksa örnek-isimli mi?

**Context ağırlığı: ORTA.**

---

## A5 — Gourmet kesfet → landing restructure

**Durum: BLOKLU (keşif yok) + BÜYÜK.** Domain haritası çıkmadan implement edilemez.

**Kapsam (checklist + yüzeysel keşif):**
- `kesfet-v1.html` 3771 satır; tab motoru `paneMekan` / `paneGurme` + `ke-tab` (grep-teyitli).
- İş parçaları: (a) modül önizleme kartları, (b) tab'lerin header nav'a AYRI MODÜL olarak
  çıkarılması (paneGurme içeriği muhtemelen yeni sayfaya taşınır), (c) konsept içerik
  görselli slider — pattern: `tarif-liste-v1` `.drag-scroll` yatay slider (grep-teyitli),
  (d) alta mekan-bul widget — pattern: `tarif-bulucu-v1` finder anatomisi (`fb-field`
  alanlar + `chip` seçimler + sonuç kartları, grep-teyitli).
- Tab→nav ekstraksiyonu NAV YAYILIMI doğurur: nav her Gourmet sayfasında ayrı kopya
  (A2 dersi) → kesfet, dada-seckisi-v1 + 6 tema + detay, etkinlikler, mekan-liste,
  mekan-detay (~13+ sayfa) nav güncellemesi.

**DERİN KEŞİF AYRI SESSION'DA (bu planın bilinçli sınırı):** kesfet full okuma + pane
içerik envanteri + "hangi içerik nereye taşınır" haritası + nav etki listesi + tab'da
hero-scroll bug kontrolü. Keşif çıktısı team/tek kararını finalize eder.

**Workflow ön-kararı: TEAM AGENT güçlü aday — AMA keşif onayına bağlı.** Muhtemel domain
ayrımı (keşif doğrularsa):
- **Teammate-1:** `kesfet-v1.html` landing gövdesi — modül kartları + slider + mekan-bul
  widget (TEK dosya, tek sahip).
- **Teammate-2:** tab ekstraksiyonu — paneGurme içeriğinden YENİ modül sayfası üretimi
  (yalnız yeni dosya üretir; kesfet İÇİNDEKİ tab sökümünü teammate-1 yapar → aynı dosyaya
  iki el değmez).
- **Teammate-3:** Gourmet nav yayılımı — kesfet HARİÇ tüm Gourmet sayfalarında yeni nav
  (kesfet'in nav'ını teammate-1 günceller; teammate-3 onu kanonik alıp klonlar → sıra
  bağımlılığı: teammate-1 nav'ı bitmeden teammate-3 başlamaz).
- Keşif domain'i böyle temiz ayıramazsa (ör. pane içerikleri iç içe geçmişse): tek session
  sıralı, muhtemelen 2 session (ekstraksiyon+landing / nav yayılımı+QA).

**Bağımlılık:** A7'den bağımsız — landing'de etkinlik önizleme kartı olacaksa "Örnek"
rozetli gider, gerçek data sonra A7'de dolar. A2 (nav paritesi) canlı olduğundan taban temiz.

**Context ağırlığı: AĞIR** — en az 2 taze session (1 keşif+mimari karar, 1+ implement).

---

## A6 — DadaDiet "Diyetisyen Ara" → wizard/sihirbaz

**Durum: HAZIR.**

**Kapsam:**
- YENİ sayfa: `diyetisyen-bul-v1.html` (isim implement session'da kesinleşir).
- Pattern: `tarif-bulucu-v1.html` finder anatomisi — `fb-field` kriter alanları + `chip`
  seçimler + sonuç kartları (grep-teyitli). Akış önerisi: hedef (kilo yönetimi / sporcu /
  hastalık-özel / gebelik...) → görüşme tipi (online / yüz yüze) → sonuç kartları
  (diyetisyen-dizin kart dili) + "Tüm diyetisyenler" köprüsü → `diyetisyen-dizin-v1`.
- ⚠️ **Mint-sızma dersi (handoff session 17):** tarif-bulucu Gastro/tomato sayfası —
  CSS'i KOPYALAMA, anatomiyi Diet token'larıyla (`--tomato`→sağlık yeşili remap düzeni)
  YENİDEN KUR; klon bazı Diet sayfası olsun, computed-color QA'da tomato sızma = 0.
- Nav wiring: Diet sayfalarındaki "Diyetisyen Ara" hedefleri (header + drawer + footer,
  ~22 sayfa) → grep ile bulunup yeni sayfaya bağlanır; mevcut dizin linki de korunur
  (wizard ≠ dizinin yerine, yanına).
- Sahte diyetisyen YOK — sonuç kartları dizindeki mevcut örnek profillerden beslenir.

**Workflow: TEK SESSION.** 1 yeni sayfa (yaratıcı iş, frontend-design + SS döngüsü) +
mekanik nav yayılımı. Team gereksiz.

**Bağımlılık:** A4 ile aynı dosyaya (diyetisyen-dizin) dokunabilir → A4/A6 ardışık,
paralel değil. Kendi içinde bloksuz, hemen yapılabilir.

**Context ağırlığı: ORTA.**

---

## A7 — Etkinlikler gerçek festival datası

**Durum: BLOKLU — data Beyar'dan (doğrulanmış sheet) gelecek.** Görsel BİZİM (kaynağın
görseli KULLANILMAZ — telif).

**Plan formatı: "data geldiğinde şu şablona basılır."**

**Şablon (HAZIR, mevcut):** `etkinlikler-v1.html` `disc-card` anatomisi — `disc-fig`
(görsel) + `disc-cat` (kategori) + `disc-badges`/`disc-badge` ("Örnek" rozeti ×12,
grep-teyitli) + `disc-meta` + `disc-where` + açıklama `<p>` (session 21'de zenginleştirildi).

**Beyar'a bildirilecek minimum sheet şeması (bu, blok-açan bilgi):**
| Alan | Örnek |
|---|---|
| Etkinlik adı | Mengen Aşçılık ve Turizm Festivali |
| Tür/kategori | festival / atölye / fuar / yarışma |
| Şehir + mekan | Mengen, Bolu |
| Tarih aralığı | ör. 8–10 Ağustos 2026 |
| 1–2 cümle açıklama | ... |
| Resmi URL (doğrulama) | ... |

Kaynak adayları (Beyar doğrulayacak): Mengen Aşçılık Festivali, festivall.com.tr, global
gastronomi festivalleri.

**Data gelince yapılacak işler (tek geçiş):**
1. Sheet → kart alan haritalama, kartları gerçek veriyle bas (sıralama: yaklaşan tarihe göre).
2. Her etkinliğe görsel üretimi BİZDEN: tema/gradient/stok görsel — kaynak sitenin görseli asla.
3. "Örnek" rozetleri + demo banner kaldır.
4. Filtre çiplerini gerçek kategori dağılımına göre revize et.
5. Bağlantı bütünlüğü: karttan resmi siteye dış link verilecekse `target=_blank` + dead-link QA.

**Workflow: TEK SESSION, hafif-orta.** Tek dosya (+ hub'larda etkinlik önizlemesi varsa
oralar). Data geldiği an sıradan bağımsız araya alınabilir.

**Context ağırlığı: HAFİF-ORTA.**

---

## A8 — Mobil ana sayfa

**Durum: BLOKLU + BÜYÜK.** İki karar bekliyor: (1) hedef sayfa hangisi, (2) DadaMentor
gerçek feature mi placeholder mı (Yasin).

**Kapsam (checklist):** kısa karşılama + 5 modül kartı (Gastro/Diet/Fit/Gourmet/Campus) +
kişiselleştirilmiş hızlı aksiyonlar + DadaMentor alanı.

**Blok açan sorular:**
1. **Hedef sayfa:** mevcut `anasayfa-portal-v3a.html` (3588 satır) mobil revizyonu mu,
   yoksa YENİ mobil-first ana sayfa mı? (Yeni sayfa = portal dokunulmaz, düşük risk;
   revizyon = tek kanonik giriş kalır. Karar Beyar'ın.)
2. **DadaMentor durumu (Yasin):** gerçek feature mi, placeholder mı?

**İki senaryo — gövde ORTAK, Mentor alanı SLOT:**
- Tasarım gövdesi (karşılama + 5 modül kartı + hızlı aksiyonlar) iki senaryoda AYNI;
  DadaMentor alanı değiştirilebilir slot olarak kurgulanır → senaryo kararı slotu doldurur,
  gövdeyi bozmaz.
- **Senaryo M (Mentor gerçek):** slot = etkileşimli giriş — prompt kutusu / örnek soru
  çipleri + `dadamentor-v3.html` (1471 satır, mevcut) deep-link.
- **Senaryo P (placeholder):** slot = "Yakında" çerçeveli tanıtım kartı (akademi "YAKINDA"
  rozet pattern'ı) + istenirse "Örnek deneyim" etiketli dadamentor-v3 demo linki.

**Derin keşif AYRI SESSION'DA:** portal anatomisi + mevcut mobil davranış (390 render) +
5 modül kartının hub hedef haritası + "kişiselleştirilmiş hızlı aksiyon"ların demo-state
kurgusu (localStorage? statik örnek?).

**Workflow: TEK SESSION (implement) — team DEĞİL.** Tek sayfa/tek domain; "BÜYÜK"lüğü
dosya sayısından değil tasarım derinliğinden geliyor (frontend-design + SS iterasyon
döngüsü). Keşif+tasarım / implement olarak 1–2 taze session.

**Context ağırlığı: AĞIR.**

---

## KOVA 4 notu (master plan DIŞI)

KVKK/GDPR/sağlık-verisi politika bloğu **CC işi değil** (hukuk/DPO + backend). Mockup
tarafında yapılabilecek TEK şey: footer politika linkleri (mevcut) + form sayfalarına
opsiyonel rıza-checkbox UI'ı. Bunlar ancak Beyar açıkça isterse, ayrı mikro-iş olarak.

---

## ÖNERİLEN GLOBAL SIRA

| # | İş | Durum | Context | Session notu |
|---|---|---|---|---|
| 1 | **A1b** Fit hero tutarsızlığı | HAZIR | HAFİF | Kısa taze session; A1 pattern'ı birebir |
| 2 | **A6** Diyetisyen Ara wizard | HAZIR | ORTA | Taze session; frontend-design + SS döngüsü |
| 3 | **A4** Diet güven katmanı | Framing kararı → HAZIR | ORTA | A6'dan SONRA (dizin çakışması); pilot→gate→yayılım |
| 4 | **A5-keşif** Gourmet landing haritası | Keşifsiz başlanamaz | ORTA | Ayrı keşif session'ı; team/tek kararını üretir |
| 5 | **A5-implement** | A5-keşfe bağlı | AĞIR | Taze session; keşif onaylarsa TEAM (3 teammate, domain ayrımı yukarıda) |
| 6 | **A7** Etkinlik datası | Sheet gelince → HAZIR | HAFİF-ORTA | Data geldiği an SIRADAN BAĞIMSIZ araya alınabilir |
| 7 | **A8** Mobil ana sayfa | 2 karar gelince | AĞIR | Keşif+tasarım / implement 1–2 taze session; Mentor alanı slot |

**Blok-açan bilgi listesi (Beyar/Yasin'e tek seferde sorulabilir):**
- A4: iskelet mi gerçek data mı · disclaimer metni kimden · uzman onayı isimli mi
- A7: sheet (yukarıdaki 6-alan şema)
- A8: hedef sayfa (portal revizyonu mu yeni sayfa mı) · DadaMentor gerçek mi placeholder mı
