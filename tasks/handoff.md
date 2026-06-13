# DadaMutfak — PROJE TAMAMLANDI 🏁 MOCKUP SETİ TESLİME HAZIR

> Tek doğruluk kaynağı. Güncelleme: 2026-06-13 (**KAPANIŞ DOĞRULAMA + 2+2 İŞ TURU —
> agent team `kapanis-turu` (lead delegate + 3 teammate). COMMIT YOK (Beyar onayı
> bekliyor). Baz `48773db`. 15 dosya +466/-93, hepsi numstat+render kabul.**
> YAPILANLAR:
> 1. **MCP doğrulama** (read-only): hero turu 48773db **6/6 ✅, 🔴=0** — subcat+facet
>    (248→22)+mouse-drag · tarif-detay tek-anchor · BNP grace/backfill · puf chip
>    nowrap+fade · anchor-offset 8 sayfa scroll-padding-top:128 · 3 wrapper bleed=0.
>    (🟡 container gerçek class `.subcat-strip`.) Rapor `outputs/dogrulama-rapor.md`.
> 2. **arama-v1 autocomplete dropdown**: `.sr-ac` panel, debounce 150ms, klavye
>    ↑↓/Enter/Esc/Home/End, ARIA combobox tam, veri kaynağı `#srPop`, `<mark>` vurgu,
>    ikon div+bg-image. (300/1.)
> 3. **Sağlık ailesi renk tutarlılığı** (10 sh sayfası): turuncu sağlık-aksanı →
>    **#3BB77E** CERRAHİ. Marka chrome (logo/topbar/Diyetisyen-Ol-CTA/FAB/footer/
>    §2f hero overlay/r-card/gauge-risk/besin-yağ-makro) DOKUNULMADI. diyetisyen-dizin
>    handoff-işaretli tutarsızlık çözüldü (hero accent + facet + CTA yeşil + nav
>    aktif-link cerrahi). Petrol #006072=DadaAkademi karıştırılmadı.
> 4. **tarif-liste subcat aktif-state modernize**: kaba çift-çerçeve (inset ring +
>    ikon 2px ring) KALDIRILDI → ince tomato border(.32)+yumuşak elevation+ikon-altı
>    minimal indicator. facet/drag/§2f dokunulmadı. (11/4.)
> 5. **alisveris hero buton katman fix**: 3 buton (Haftalık Menü→haftalik-menu /
>    Yazdır-PDF / Paylaş-popover) z-index sertleştirme (.wrap z:5, .al-actions z:6
>    pe:auto, popover z:40) + siparislerim/giris guard. **LEAD Playwright tıklama
>    teyitli** (navigasyon çalıştı). ⚠️ Agent+lead orijinal "çalışmıyor" semptomunu
>    ÜRETEMEDI — şu an 3 buton fonksiyonel; Beyar belirli state'te görürse repro lazım.
> 6. **EK — topbar DadaStore pill iç hizalama** (lead, 58 sayfa sweep): görünmez hover
>    oku `.tw-arr` (opacity:0 ama flow'da) sağda yer rezerve edip içeriği 15px sola
>    kaydırıyordu → `.tw-arr` rest ayak izi sıfırlandı (max-width:0+margin-left:-8px+
>    overflow:hidden), hover reveal korundu (max-width:16px+margin-left:0). LEAD
>    Playwright: asimetri 15px→-1px, hover ok 0→8px çalışıyor. Sadece DadaStore içeriği;
>    pill konumu/DadaAkademi/§2f dokunulmadı. **TOPLAM TUR: 58 dosya +582/-209.**
>
> **🔑 saglik-renk LEAD KARARLARI:** (1) zorunlu-yıldız `.req` turuncu KALDI (form-
> semantik). (2) Sağlık dropdown İÇİ hover ikonları DOKUNULMADI (chrome-fork riski →
> Beyar'a defer) → bu kararla **arama-v1 Sağlık-dropdown seri-patch'i İPTAL** (arama
> saglik sayfası değil). (3) diyetisyen-ol captcha yasal link yeşil (geri alınabilir).
> (4) test-detay ikili-active (Tarifler+Sağlık) ayrı tutarsızlık, kapsam dışı.
>
> **🔜 SONRAKİ MİNİ-TUR — SAĞLIK DROPDOWN CHROME DÜZELTMESİ** (commit e1a26cd sonrası,
> AYRI tur; bu turda YAPILMADI — saglik-renk chrome-fork riski diye bırakmıştı). 3 madde
> AYNI KÖK = Sağlık nav dropdown chrome, tek mini-turda birlikte:
> 1. **Dropdown İÇİ aktif item yeşil:** "Sağlık" mega-menü dropdown'ında aktif item
>    ("Testler" vb) hâlâ TURUNCU/krem → sağlık ailesinde YEŞİL `#3BB77E` olmalı.
> 2. **Item listesi tutarlılığı:** dropdown item listesi sayfalar arası tutarsız (bazı
>    sayfada "Testler" girişi eksik/yanlış aktif) → TÜM sağlık sayfalarında item listesi
>    AYNI+TAM (Hesaplayıcılar + Testler + Diyetisyen Ara), aktif-state TEK doğru.
> 3. **test-detay ikili-active:** markup'ta hem Tarifler hem Sağlık `.active` → SADECE Sağlık.
> KÖK NEDEN İLK: Sağlık dropdown ortak `_shell` mi sayfa-inline mi tespit (topbar gibi
> inline+birebir olabilir) → tek-tip fix. `.nav-item.health` hook gerekebilir (chrome-fork
> dikkat — saglik-renk bu yüzden bırakmıştı). Kanıt: dropdown açık render SS + aktif item rengi.
>
> **🔜 SONRA:** Faz 7 Sofra Düzeni modülü (Mutfak Sırları altı, 8 kategori, DadaStore
> köprülü) → **SONRA kapsamlı TEK mobil QA** (3 agent 390/768/drawer; Yasin Bey mobil
> bulguları dahil — Ramazan bandı, hero okunabilirlik). Bekleyen patron kararları +
> diyetisyen-ol captcha-link + #6 alisveris repro durur. Sentez: `outputs/kapanis-turu-sentez.md`.
>
> Önceki: 2026-06-13 (**HERO TURU + tarif-liste düzeltmeleri
> — agent team `hero-turu` (lead + 4 teammate: hero-zengin, tarif-liste-fix,
> tarif-liste-kategori, anchor-offset). COMMIT (48773db) + push. Baz `66a33d5`.**
> YAPILANLAR:
> 1. **23/23 sade hero → görselli H1** (hero-zengin): denetim raporu (`outputs/hero-denetim.md`)
>    → Beyar onayı → uygulama. §2f H1 OVERRIDE (patron kararı, araç sayfaları dahil). Reçete
>    kanonu = mutfaga-giris .lst-top (`outputs/hero-sablon.md`): koyu/yeşil overlay + Unsplash
>    v3a + padding-top:128/74 + beyaz crumb. sh-yeşil 9 (sağlık ailesi) + lst-domates 14. 3 wrapper
>    (alisveris-listesi=markup-split .al-body krem · siparislerim=bg-band 252px · giris=login-hero
>    split) CERRAHİ — bleed yok, lead render+göz teyitli.
> 2. **tarif-liste subcat görselli şeridi** (tarif-liste-kategori, #4): düz pill REDDEDİLDİ →
>    kategori-v1 `.subcat-sec` deseni port (14 görselli kart sc-ico + ad + sayaç, .lst-bar üstü,
>    tıkla→facet Çorba 248→22). **EK-5 (#11) DEVAM EDİYOR:** mouse drag-scroll fix + aktif state
>    rafine + isabetli görseller + list-view görselsiz kart (Zeytinyağlı Enginar) doldurma.
> 3. **#3 kart başlık taşması + meta hizalama** (clamp `.r-body h4 a` doğru elemana) ·
>    **#5 mutfaga-giris scroll-spy son sekme** (sayfa-sonu override) · **#6 tarif-detay satır
>    tam-tıklanabilir** (tek anchor) · **#7 BNP wizard çoklu sonuç** (computeMatches grace/backfill) ·
>    **#9 puf-noktalari chip tek-satır şerit** (.ke-filter nowrap+overflow+fade) — hepsi tarif-liste-fix.
> 4. **#10 anchor-offset scroll-offset fix** (anchor-offset): 8 sayfa (reklam-ver, akademi, hakkimizda,
>    sozluk, mutfak-defteri, urun-detay, video-mutfagi, mutfaga-giris-detay) sticky-nav→section jump
>    başlık sticky altında kalıyordu → scroll-padding-top (header + sticky-sub-nav yüksekliği, per-page).
>
> **⚠️ MCP DOĞRULAMA YENİ SESSION'A:** ctx limiti nedeniyle lead faz-sonu MCP etkileşim turu
> YAPILMADI. Yeni session'da KISA tut: #4 subcat scroll+facet · #6 satır-nav · #7 wizard akış ·
> #9 chip scroll · #11 subcat mouse-drag + liste görselsiz-kart=0 · anchor-offset 8 sayfa başlık-
> görünürlük · 23 hero + 3 wrapper mobil 390 taşma örneklemi. Her birinde 1 probe yeter. (3 wrapper
> hero + render-riskli olanlar lead'çe zaten render-göz teyitli; kalan etkileşim + mobil 390.)
>
> **🔜 SONRAKİ TUR (mini, mobil QA sonrası):** arama-v1 **autocomplete dropdown** — input'a yazdıkça
> öneren dropdown (debounce ~150ms, klavye ok+Enter, son aramalar + popüler öneriler, ARIA combobox).
> AYRI mini-tur. + **Final mobil QA** (3 agent paralel 390/768/drawer) + **Faz 7 Sofra Düzeni modülü**
> (Mutfak Sırları altı, 8 kategori, DadaStore köprülü).
> + **Sağlık ailesi RENK TUTARLILIĞI** — diyetisyen-dizin-v1 + Sağlık dropdown menü/butonu + diğer
>   sağlık sayfaları TURUNCU (domates) vurgu yerine SAĞLIK YEŞİLİ (#3BB77E) kullanmalı. diyetisyen-dizin
>   sağlık ailesinde ama hero/vurgu/popüler-chip TURUNCU kalmış (tutarsız). **NOT: kurumsal petrol
>   #006072 = DadaAkademi'ye ait, KARIŞTIRMA.** Beyar hangi yeşil tonu net seçecek (sağlık-tint #3BB77E
>   mi başka mı). Tüm sh grubunda (bazal-metabolizma, BMI, gunluk-kalori, gunluk-su, ideal-kilo,
>   vucut-tipi, besin-kutuphanesi, test-detay, diyetisyen-dizin/diyetisyen-ol) vurgu rengi denetimi.
>
> Lessons +2 (zsh word-split → kör lead sayacı → yanlış stall/devir; numstat+name-only birincil ·
> render-zorunlu-kabul: grep "done" der ama lead göz/SS teyidi şart, 2 wrapper bleed bunu kanıtladı).
> Raporlar: `outputs/hero-turu-*-rapor.md` + `outputs/hero-denetim.md` + `outputs/hero-sablon.md`.
>
> Önceki: 2026-06-13 (**FAZ 6 KAPANDI + COMMIT + PUSH —
> son cila + tarif modülü; agent team `faz6` (lead + 5 teammate), 5 ana görev +
> 2 EK REVİZE + Flag 2 hepsi LEAD BAĞIMSIZ KANITLI KABUL (git diff + grep +
> DOM/element-rect probe + faz-sonu MCP/izole-chrome render SS tasarım-gözü).
> feat `12044a4` + docs kapanış + PUSH origin/main (Beyar onayı 2026-06-13).
> Baz `0ad9576` → 72 dosya +1540/-443 (Flag 2 dahil).**
> 1. **Hero tutarlılık** — sistem zaten ~%97 §2f uyumlu; tek gerçek kırık
>    mutfak-sirlari → H1 koyu-overlay (+54/-20). bugun-ne-pisirsem/tarif-bulucu/
>    kesfet bu commit'te H3 kaldı — Beyar HERO TURUNDA hepsini görselli yapacak (aşağı).
> 2. **Tarif modülü** (tarif-ekle-v1 zenginleştirildi, sıfırdan değil): çoklu
>    kategori(27)+mutfak (ms-* token-chip) · AI ile İyileştir (mockup sim) ·
>    gerçek drag-drop (SortableJS 1.15.2 CDN, sitede İLK — malzeme+adım renumber).
> 3. **Tarif liste**: 9→15 kart (grid dengeli) · Öğün facet (ayrı eksen) ·
>    `.r-diet` görsel rozet · h4 2-satır clamp · page-local sticky clip. +EK REVİZE:
>    Beslenme/Tip facet 14 satıra FA6 ikon (kart↔filtre 4 tip birebir).
> 4. **SEO içerik**: ansiklopedi-v1 15 kategori × 30 gerçek madde (Nedir/Faydaları);
>    "yakında" placeholder=0 (kapı rozeti korundu); öksüz CSS silindi. sozluk +
>    ansiklopedi-detay zaten doluydu (dokunulmadı).
> 5. **Tutarlılık temizlik**: DadaStore birliği (14 dosya, "Dada Store"=0) +
>    kronik drift kapandı (mutfaga-giris/olcu Tarifler dropdown kanonik,
>    "Ana Yemekler"=0, data-slug=22) + sticky clip 20 sayfa (19/19 stick-ok).
> 6. **EK REVİZE BNP havuz**: yuvarlak pill `.rp-tab` → alt-çizgi segment (§2e
>    .vw-seg akrabası); aktif radius=0, filtre 31→6→5, CSS-only.
> + anasayfa shop eyebrow "Dada Shop"→"DadaStore" (lead kapattı).
>
> + anasayfa shop eyebrow + Flag 2: tüm "DadaShop"/"Dada Shop" → **DadaStore**
>   (65 dosya + _shell, global grep=0). Marka artık her yerde DadaStore.
>
> Sentez+inceleme: `outputs/faz6-sentez.md`. Lessons +2 (global-grep drift ayrımı ·
> probe disk-cache ?cb=). SS: `outputs/faz6-tour/` + `faz6-ss/`. Takım kapatıldı.
>
> **FLAG KARARLARI (Beyar 2026-06-13):** Flag 2 (DadaShop→DadaStore) ✅ YAPILDI.
> Flag 3 (r-chip "Çorbalar/Tatlılar" tekilleştirme — hata-v1/mekan-detay-v1) ⏸️
> ERTELENDİ (kozmetik). Flag 4 (ansiklopedi "480 madde" sayacı temsilî → Laravel
> fazı) ⏸️ ERTELENDİ. Flag 1 (3 hero) → aşağıdaki HERO TURUNA dahil edildi.
>
> 🔜 **SIRADA — ÖNCELİK SIRASIYLA:**
> 1. **HERO ZENGİNLEŞTİRME TURU** (Beyar net istedi, AYRI TEMİZ SESSION — bu
>    session ctx %70'te kapatıldı, başlatılmadı): TÜM üretim sayfalarında (71) hero'su
>    SADE/GÖRSELSİZ (düz beyaz, kompakt, arka plan resmi yok — BNP, tarif-bulucu,
>    olcu-birimleri, kesfet ve benzeri HEPSİ — **İSTİSNA YOK, araç sayfaları dahil**)
>    olan her sayfa → zengin görselli H1 hero. Referans kanon = mutfaga-giris-v1
>    (arka plan görseli + koyu overlay + başlık + breadcrumb + uygunsa metrik şeridi).
>    **§2f H1 OVERRIDE edilecek** (önceki "H3 görev sayfası görselsiz" kuralı patron
>    kararıyla geçersiz). Akış: ÖNCE 71 sayfa hero denetim raporu
>    (`outputs/faz6-hero-denetim.md` — sade hero listesi + sayfa-başı görsel teması
>    önerisi: BNP=yemek/menü, tarif-bulucu=malzeme/dolap, olcu=tartı/ölçek/alet,
>    sağlık=sağlıklı tabak vb) → BEYAR ONAYI → uygula. Mevcut hero içeriği
>    (başlık/altbaşlık/breadcrumb) korunur, sadece görselli zemin+overlay eklenir;
>    SAYFA GÖVDESİNE DOKUNMA. Kanıt: değişen her sayfa render SS + tasarım gözü.
> 2. **FİNAL MOBİL QA** — 3 agent paralel viewport bölüşümü (390/768/drawer+etkileşim),
>    read-only. **Yasin Bey mobil bulguları DAHİL** (Ramazan bandı taşması, hero
>    okunabilirlik vb).
> 3. **FAZ 7 — Sofra Düzeni modülü** (Mutfak Sırları altı, 8 kategori, DadaShop[Store]
>    köprülü — patron talebi).
> Ertelenen flag'ler (3, 4 yukarıda) + bekleyen patron kararları (Su Bardağı ölçü,
> Ramazan modu, M2 sosyal login, reklam paket fiyatları, Şef Ol hedefi) dursun.
>
> Önceki: 2026-06-13 (**FAZ 5 REVİZE TURU KAPANDI —
> agent team `faz5-revize` (lead + 4 teammate), 8/8 madde kanıtlı kabul + COMMIT +
> PUSH**). İlk 7 madde + mini-revize (A/B/C) hepsi lead bağımsız kanıtlı kabul
> (grep + tıklama/DOM probe + kendi channel:chrome SS tasarım-gözü):
> 1. **Duplicate menü temizliği** — DadaStore/DadaAkademi ana menüden kalktı (topbar
>    markalı kapı kanon), 58 sayfa (56 sweep + 2 divergent patch mutfaga-giris/olcu),
>    mobil drawer-foot kapı; global negatif grep=0, iki md5 idempotent.
> 2. **Kurumsal kimlik kılavuzu projeye alındı** (`tasks/corporate-identity-guideline.pdf`
>    + `tasks/kurumsal-renk.md`): petrol `#006072` = Pantone 3155 C BİREBİR →
>    DadaAkademi petrol kararı kurumsal teyitli. akademi çift "Ana Site" kaldırıldı.
> 3. **Shop section ritmi** — krem ÇIKARILDI (Beyar) → beyaz/gri(v3a)/KOYU band;
>    hero/bambu/bej-kart kimlik korundu. (Görselli-band opsiyonu eklenmedi, koyu band onaylı.)
> 4. **Form 2-kolon + Hibrit panel** (diyetisyen-ol+sef-ol): sticky-broken kök-neden
>    (`overflow-x:hidden`→`clip`) çözüldü; Hibrit = örtüşen bölüm-nav + pasif başvuru
>    süreci timeline.
> 5. **BNP** — floating menü tepsisi (grid itmez overlay) + mod→2 alt-tab (Sıfırdan
>    Kur/Hazır Menüler) + düzenlenebilir menü adı (dirty-flag, defter `#mdRename` bağı)
>    + cookmode her-yemek-process + "Menülerime Git"; haftalik "Ekle" fix.
> 6. **Markalı PDF** — alisveris-listesi jsPDF + Gilroy gömülü (TR glyph), "TAMAMLANDI" kalktı.
> 7. **tarif-bulucu** kategori şeridi enableDrag fix + fade (Faz-4 enableDrag dersi).
>
> **COMMIT: feat `0ad9576` + docs kapanış commit + PUSH origin/main (Beyar onayı
> 2026-06-13) — GitHub Pages güncel.** Sentez: `outputs/faz5-revize-sentez.md` +
> 4 teammate raporu. Lessons +3 (global negatif grep · sticky-overflow · iCloud cp-tuzağı).
> Takım KAPATILDI.
>
> 🔜 **SIRADA — FAZ 6** (detayı Beyar Faz 6 başlarken verecek). FAZ 6'YA TAŞINAN NOTLAR:
> - **Hero tutarlılık denetimi** (çıplak herolar → zengin standart, §2f kanonu).
> - **mutfaga-giris + olcu kronik kategori drift'i** (drawer Tarifler alt-menüsü eski
>   etiketler — Çorbalar/Ana Yemekler vs kanonik Çorba/Kırmızı Et; Faz-4 entegrasyonuna girmemiş).
> - **Site-geneli sticky bug** (`overflow-x:hidden`→`clip` shell'e mi sayfa-bazlı mı yayılsın).
> - **Final mobil QA** → 3 agent paralel, viewport bölüşümü (390 / 768 / drawer+etkileşim), read-only test.
> - **Faz 7 adayı: Sofra Düzeni modülü** (Mutfak Sırları altı, 8 kategori, DadaShop köprülü — patron talebi).
> - Bekleyen patron kararları: Su Bardağı ölçü (200↔240ml) · Ramazan modu · M2 sosyal
>   login seti · reklam paket fiyatları · "Şef Ol" hedefi (m12).
>
> Önceki: 2026-06-13 (**CİLA-2 FAZ 5 TAMAM — agent team
> cila2-faz5 (lead delegate + 6 teammate), 6/6 görev kanıtlı kabul**: KABUKLAR +
> ÜYELİK SOSYAL + BNP AKIŞI + ALIŞVERİŞ LİSTESİ. (1) **header**: siyah topbar
> yeniden — Tarif Ekle/Testler KALKTI, sağda 2 markalı DÜNYA KAPISI DadaStore
> (domates) + DadaAkademi (petrol, Yakında) + Tarifler dropdown standardı (22
> kategori→`tarif-liste?kategori=<slug>`, "Tüm Tarifler" düzeniyle aynı). (2)
> **akademi-kabuk**: DadaAkademi AYRI KABUK (dada-shop kardeş deseni — kendi nav
> Akademi/Eğitimler/Eğitmenler/Sertifika/SSS, ana-site nav YOK, Ana Site dönüş;
> Eğitim Setleri/Konular/Eğitmenler/Sertifika/SSS body; H1 koyu hero). (3)
> **shop-cila**: çift "Ana Site" kaldır (dönüş tek+sol-üst) + hero-header nefes
> (23px) + tekdüze zemin→cream-2 alternasyon + .shop-flow seam + bambu ayraç. (4)
> **uyelik-sosyal**: telefon kayıt/giriş (au-seg) + diyetisyen kayıt köprü
> (→diyetisyen-ol) + sosyal profil (diyetisyen-profil püf sekmesi + Takip Et) +
> TAKİP/GİZLİLİK geçidi (?takip=1/0; public'te Kaydedilenler+Menüler .pf-fgate→
> pf-lock/pf-full). (5) **bnp-akis**: BNP 2-TAB (Tarif Ara wizard / Yemek Modları)
> + SIFIRDAN MENÜ (mod→tarif→tepsi→kur) + "MENÜYÜ PİŞİR" (cookmode miras,
> KOLAYDAN ZORA adım adım, ?cook=1) + mod kartı büyüt (236×152) + gölge fix. (6)
> **defter-menu**: menü içi düzenleme (?menu=/?havuz=, .pf-full içine, gizlilik
> geçidi korundu) + ALIŞVERİŞ LİSTESİ akışı (tarif-detay→gerçek dm_shoplist
> transfer + reyon eşleme + Yazdır/PDF + Paylaş popover). KONSOLİDE CHROME SWEEP
> 58 sayfa (topbar+dropdown+Alışveriş Listem link): CSS-yutma 0, idempotent re-run
> md5 birebir, sızıntı 0, net-neg 4=shop-back (meşru). Render SS turu (izole
> channel:chrome) + lead tasarım-gözü. **⚠️ BEYAR KARARI: DadaAkademi kimlik
> rengi — kabuk DOMATES ama topbar kapısı PETROL, tutarsız; petrol (önerilen) ya
> da domates seçimi → tek-tur fix. akademi-kabuk petrol-varyant HAZIR (uygulamadı).**
> Sentez+inceleme: `outputs/cila2-faz5-sentez.md`. **DEPLOY: feat commit `3b6bf82` +
> docs commit (kapanış) + PUSH origin/main (Beyar onayı 2026-06-13) — GitHub Pages güncel.
> DadaAkademi=PETROL Beyar kararı uygulandı (akademi-v1 token repoint). Takım kapatıldı.**
>
> 🔜 **SIRADA — FAZ 5-SONRASI REVİZE TURU (Yasin Bey/Beyar geri bildirimi):** (1) duplicate
> menü temizliği · (2) DadaAkademi kurumsal renk (petrol uygulandı; kurumsal ince ayar) ·
> (3) shop section keskinleştirme · (4) form 2-kolon düzeni · (5) BNP her-yemek-process +
> "menüye git" butonu + sticky menü · (6) haftalik-menu "ekle" fix · (7) markalı PDF. SONRA
> **FAZ 6**: tarif modülü + SEO + tutarlılık + final mobil QA. Bekleyen patron kararları
> dursun: Su Bardağı ölçü (200ml↔240ml), Ramazan modu, M2 sosyal login seti, reklam paket
> fiyatları, "Şef Ol" hedefi (m12).)
> Önceki: 2026-06-13 (**CİLA-2 FAZ 4 TAMAM — agent
> team cila2-faz4 (lead + kategori-tarif + kategori-sirlar + kategori-kesfet-bnp
> + ux-revize)**: Excel `KategoriEkle.xlsx` (11 sheet) GERÇEK üretim kategorileri
> mockup'a işlendi (temiz veri `tasks/kategori-veri.md`): tarif 27 kat + 14 tip ·
> ölçü 2-seviye 10/65 · mutfağa-giriş 7/36 · püf 9 soru-format · keşfet alt-filtre ·
> BNP 14 mod + **tarif havuzu modalı** (eksik kurgu kapatıldı). UX: tarif-bulucu
> YENİDEN (dar panel→geniş ferah ızgara) · iletisim OSM harita · DadaStore dropdown
> site-geneli kaldırıldı (64 sayfa düz link) · **Şef Ol→sef-ol başvuru sayfası YENİ**
> (envanter 70→**71**) + 65 sayfa sweep · sef-ol DERİN (4 bölüm, pre-fill dolu,
> sosyal medya, gerçek kategori uzmanlık). REGRESYON: mutfaga-giris + olcu kategori
> işinde tasarım dili bozulmuştu → a463329 dili korunarak düzeltildi (kural+lessons:
> kategori işi=SADECE veri; `tasks/kategori-regresyon-raporu.md`). 4 CANLI BULGU FIX:
> BNP ray kaydırma + kategori-v1 ray (enableDrag selector dersi) + kesfet tek-katman
> bağlamsal + "Tümünü Gör"→liste. Kanıtlı kabul (git diff CSS-kural 0 / yan-yana SS /
> tıklama+scrollLeft probe). Sentez: `outputs/cila2-faz4-sentez.md`. Lessons +2.
> HERO/PANEL REVİZE TURU (Beyar canlı): tarif-liste sol panel dengelendi (cap
> kaldırıldı, oran 1.14) · BNP mod chip büyütüldü (194×122, ray korundu) + hero H3
> kesfet'le hizalandı · kategori-v1 ray kaydırılır (enableDrag) · sozluk hero §2f H1
> koyu'ya çekildi (ansiklopedi kardeşi) · olcu hero zaten canon H3 (no-op).
> **DEPLOY: commit + push origin/main (Beyar onayı 2026-06-13) — GitHub Pages güncel.
> Takım kapatıldı.**
>
> 🔜 **SIRADAKİ TUR KARARLARI (Yasin Bey / patron):** (1) **Su Bardağı 200ml vs Excel
> 240ml** — olcu gram değerleri 200ml-bazlı (TR standart); Excel 240ml (US cup). 240
> seçilirse dönüştürücü + 65 satır gram güncellenir. (2) **olcu tab konumu** — 10 uzun
> kategori başlığı sağa sığmadı, tam-genişlik wrap satırına taşındı (pill stili a463329
> birebir); veri-zorunlu minimum kabul edildi, patron veto ederse alternatif. (3)
> **Ramazan modu** (Faz 3'ten) — `?ramazan=1` demo, site-geneli yayılım + gerçek vakit
> API'si patron onayında.
> Önceki: 2026-06-13 (**CİLA-2 FAZ 3 TAMAM — agent
> team cila2-faz3 (lead+kanon+uygula-b+qa+ramazan), 26 görev kanıtlı kabul**:
> hero/breadcrumb KANONU kılavuz §2f (rd-crumb tek form + H1/H2a-b/H3 +
> hak-ediş; saglik-testler patron-fix krem→yeşil koyu hero; nefes 128/74
> 17 H1'de; crumb simetri 15 sayfa) · kurumsal: hakkımızda yasal 3'lü grid +
> 🆕 sefler-v1 (envanter 69→**70**) + Şef Ol→tarif-ekle (m12 ara çözüm) +
> Günün Tarifi Keşfet sonrasına (Patron #1 ÇÖZÜLDÜ) + v3a Store dropdown fix ·
> Beyar canlı feedback 6 iş (reklam-ver nefes, BNP mod rayı native-outline
> kök neden, ansiklopedi 2-katman İA → Excel'in 19 GERÇEK kategorisiyle,
> tarif-bulucu mega CTA 57 sayfa + köprü, dz-card sade link) · 🌙 RAMAZAN MODU
> konsepti (5 sayfa; ?ramazan=1/0+localStorage+body.is-ramazan; otomatik
> iftar↔sahur flip; ?demo=1; PATRON ONAYINA) · lg-gate 3 detay sayfası ·
> footer/şef sweep 45 dosya · reklam-ver "Yerleşimler" (9 yerleşim, mock
> metrik) · ölü CSS −102 · FİNAL QA: 70 sayfa × auth × 390 = 0 taşma/0
> çift-katman/0 konsol. Kategori Excel'i alındı → `tasks/kategori-haritasi.md`
> (entegrasyon Faz 4). Sentez+inceleme listesi: `outputs/cila2-faz3-sentez.md`.
> Lessons +5 ders. **COMMIT ATILMADI — öneri sentez §9'da, Beyar onayı.**
> Takım kapatıldı.)
> Önceki: 2026-06-12 gece (**CİLA-2 FAZ 2 TAMAM —
> ÜYELİK/PROFİL MODÜLÜ, agent team cila2-faz2**: İA `tasks/uyelik-ia.md`
> (kilitli, M1–M8 lead kararlı) · login simülasyonu `?auth=1/0` + localStorage
> `dm_auth` + `body.is-auth` · header login-state 55 sayfaya sweep (avatar
> dropdown + ➕Ekle + 🔔 zil; shop/panel/hesaplayıcı bilinçli muaf) · defter
> own↔public mod (`?view=public`) + durum chip filtresi · hesabim yalnız-ayar +
> 38px borç kapandı · giris demo pre-fill (tek tık → login) · 🆕
> `puf-noktasi-ekle-v1` · BNP "Deftere Kaydet"→defter köprüsü · puf/tarif-detay
> yorum+kaydet gate'leri (lg-gate) · persona Elif Şahin hizalı. Envanter
> 68→**69**. Denetim: 36-ölçüm örneklem probe + 4 bulgu kapandı (en kritiği:
> sweep'in anasayfa CSS'ini yutması — restore+elle patch, lessons'a işlendi).
> Sentez + inceleme listesi: `outputs/cila2-faz2-sentez.md`. Beyar incelemesi
> TAMAM; commit `c10c43b` + PUSH onaylı (Pages patron turu için güncel).
> CİLA-2 Faz 2 takımı (cila2-faz2) kapatıldı. **SIRADA: FAZ 3** — hero/
> breadcrumb kanonu (saglik-testler dahil) + kurumsal düzeltmeler + QA.
> Bekleyen patron kararları: DadaStore marka dili · M2 sosyal login seti
> (ana site FB ↔ shop Apple) · mekan-detay 5px göz teyidi. İsteğe bağlı mini:
> lg-gate Faz 3 genişletmesi · ölü CSS temizliği (puf-ekle stepper + BNP
> wizard).)
> Önceki: 2026-06-12 akşam (**CİLA-2 FAZ 1 REVİZE
> TURU TAMAM — Beyar incelemesinden çıkan 17 iş kanıtlı kabul**: Premium rozet ·
> TD galeri/video sadeleşme · görselli facet (tarif-liste+kategori) · rota
> yatay step rail v2 · mutfağa-giriş one-page gnav · püf+kesfet hero overlay
> crumb · ansiklopedi IA (kategori + tıkla-aç) · dz-card v2 simetrik · BNP
> sihirbazsız (mod→menü→koleksiyon) · shop login modalı · kampanya bandı hero ·
> Boyut/Ölçü SVG facet · tarif-bulucu üst-geniş düzen (R14) · legacy anasayfa
> varyantları mockups/arsiv/ altında (15 dosya, envanter dışı). + R15: BNP
> görselli mod kartı rayı. Commit'ler: checkpoint `c5e8826` + fix `d3e1c2b`
> (**PUSH YOK — Beyar push kararını ayrıca verecek**). Revize sentezi:
> `outputs/cila2-faz1-sentez.md`. CİLA-2 Faz 1 takımı (cila2-faz1) kapatıldı.
> Beklemede: DadaStore marka dili · mekan-detay 5px · BNP ölü wizard CSS
> (handoff "Faz 2 Girdileri" bölümü).)
> Önceki: 2026-06-12 (**CİLA-2 FAZ 1 TAMAM — patron
> revize turu, 4 modül paralel, agent team**: 25 iş kalemi kanıtlı kabul.
> TARİF (₺ rozet, grid⇄liste, ikonlu facet, TD video modal) · SIRLAR (Mutfağa
> Giriş IA + detay, püf liste/blog-detay + rev-* yorum, YENİ Mutfak
> Ansiklopedisi modülü, ölçü one-page + markalı SVG) · SAĞLIK (2 sekmeli test
> listesi, sade dz-card, profil Tarifleri sekmesi, BNP yeniden: menü çıktısı +
> hazır menüler) · SHOP (ayrı mağaza kabuğu + DadaStore SVG logo, özgün hero,
> kompakt p-card + fav fix, bambu serpiştirme, görsel kategori paneli, fatura
> adresi JS) + site-geneli dropdown sweep 52 dosya + "Dada Denedi"→"Şefin
> Tercihi" SIFIRLANDI + 390 mobil probe üretim seti 3×0. Envanter 64→68.
> Sentez: `outputs/cila2-faz1-sentez.md`. **COMMIT ATILMADI — Beyar onayı
> bekliyor.** Sıradaki: Beyar/patron incelemesi → cila-2 faz 2/3 (hero kanonu).)
> Önceki: 2026-06-12 gece (KEŞFET MEKAN MODÜLÜ TAMAM — Beyar onaylı,
> commit+push'lu: mekan-detay TD anatomisi mirası. Kanıt:
> `outputs/kesfet-mekan-rapor.md`)
> Önceki: 2026-06-12 akşam (mekan-liste-v1 **KABUL** · mekan-detay-v1 Tur 1
> reddedildi. Envanter 62→64 sayfa.)
> Önceki: 2026-06-12 (**REVİZE-2 TAMAM** — site geneli
> mobil sabit-katman disiplini: 🔴1+🟡53 çözüldü, kanonik pattern 55 dosyada,
> kılavuz §3b; keşfet konsepte geri çekildi (Mekânlar · Gurme Lezzetler ·
> Etkinlikler). Commit: `a8d45b7 fix(mockup): revize-2`. Detay:
> `outputs/revize2-sentez.md` + `revize2-{mobil1,mobil2,kesfet}.md`)
> Önceki: 2026-06-11 final cila (`outputs/cila-raporu.md` ·
> `outputs/testler-rapor.md` · `outputs/gorsel-rapor.md`)

---

## 📦 SAYFA ENVANTERİ — 71 üretim sayfası

- CİLA-2 Faz 4'te doğan (2026-06-13): `sef-ol-v1.html` (şef başvuru sayfası —
  diyetisyen-ol kardeşinden türev: 4 bölüm Kişisel/Uzmanlık/Deneyim/Sosyal Medya,
  pre-fill dolu, gerçek Tarif Kategori uzmanlık çoklu seçim; "Şef Ol" 65 sayfa →
  buraya). Faz 4 kategori verisi `tasks/kategori-veri.md` + regresyon denetimi
  `tasks/kategori-regresyon-raporu.md`.


- **68 × `*-v1.html`** + `anasayfa-portal-v3a.html` (kanonik baz) +
  `panel-shell.html` (diyetisyen paneli iskeleti)
- CİLA-2 Faz 3'te doğan (2026-06-13): `sefler-v1.html` (şef dizini — _shell +
  diyetisyen-dizin H1 hero + chef-card dilinde sef-card grid; "Şefler" hedefi).
  Hero/breadcrumb kanonu: kılavuz **§2f**. Ramazan modu 5 sayfada
  (`?ramazan=1/0`, patron onayı bekliyor)
- CİLA-2 Faz 2'de doğan (2026-06-12): `puf-noktasi-ekle-v1` (tarif-ekle form
  kiti mirası, tek adım). Üyelik akışı: `tasks/uyelik-ia.md` (İA) + login-state
  55 sayfada (`?auth=1/0`)
- CİLA-2 Faz 1'de doğan (2026-06-12): `mutfaga-giris-detay-v1` (TD anatomisi)
  + `puf-noktasi-detay-v1` (blog detay + rev-* yorum) + `ansiklopedi-v1` +
  `ansiklopedi-detay-v1` (YENİ SEO modülü "Mutfak Ansiklopedisi"; sozluk-v1
  AYNEN korundu — patron şartı). Shop ailesi (5 dosya) artık AYRI MAĞAZA
  KABUĞU taşır (ana site nav'ı yok; "Ana Siteye Dön" + DadaStore SVG logo)
- Mekan modülü (2026-06-12): `mekan-liste-v1` (kabul) + `mekan-detay-v1`
  (tasarım reddedildi — yeniden yapılacak, sayfa envanterde)
- İskeletler: `_shell.html` (public) + `panel-shell.html` (panel)
- Final cilada doğan: **`test-detay-v1.html`** (?test=metabolizma|su-hidrasyon|
  temel-pisirme|hangi-yemek — Onedio tarzı görselli test akışı, kişilik kartı
  sonuç + paylaş + tarif rayı)
- Aileler: ana sayfa · tarif (detay/liste/ekle/bulucu/kesfet/bugün-ne-pişirsem) ·
  video · shop (5) · sağlık (hub + 6 hesaplayıcı + testler + test-detay + diyet
  listeleri/program/besin) · diyetisyen public (3) · diyetisyen paneli (7) ·
  rehber (6) · auth/hesap (4) · landing (4+sezon) · kurumsal/yasal/hata/arama/sss
- Bileşen dili: `tasks/bilesen-kilavuzu.md` §0–§4 TAM (§2d Dalga 3 mirası +
  §2e panel dili + .vw-seg final cilada eklendi)

## ✅ FİNAL CİLA TURUNDA YAPILANLAR (özet — detay `outputs/cila-raporu.md`)

- 40 açık soru sınıflandırıldı: 8 iş yapıldı + 3 karar notu; persona tüm sitede
  **Elif Şahin**; builder→kalori köprüsü; su 4L cap; Müsaitlik→?tab=takvim;
  İhlal Bildir→yasal#b4 (hash-scroll'lu); Öneri-Şikayet→Görüş Bildir modalı
- **tarif-detay YAZDIR görünümü** (print CSS: künye+malzeme+adımlar temiz tek
  kolon, PDF kanıtlı) + pişirme modu pürüzsüz doğrulandı
- **61 sayfa tutarlılık taraması:** 1 kırmızı (urun-liste 390 taşması) + 8 sarı
  düzeltildi (modal/çerez yasal linkleri 54 sayfa, title formatı 21 sayfa,
  boş src, tablet grid-4); footer/bottom-nav/hero-üst/konsol/kart dili 61'de tutarlı
- **Test ailesi tamamlandı:** test-detay-v1 (4 test, Onedio kurgusu) + erişim:
  Sağlık dropdown "Testler" (52 sayfa) + drawer (51) + saglik-hub 4 test kartı +
  saglik-testler Benzer Testler rayı slug'lara bağlı
- **Görsel/buton onarımı:** 2 ölü Unsplash ID (CDN 404) → 4 sayfada 5 eleman
  onarıldı; urun-detay "Hemen Al" (dmCart+odeme akışı) ve Paylaş popover'ı canlı

## 🟠 LARAVEL FAZI LİSTESİ (mockup'ta mock kalan — stack kararı sonrası)

1. Sipariş durum taksonomisi + fatura/PDF üretimi + kupon motoru
2. "Şimdi Dinle" TTS (Web Speech API)
3. Püf detayı yorumları (.rev-* dili hazır, veri backend)
4. Onboarding kullanıcı adı otomatik üretimi · bildirim hedef linkleri
5. Haftalık menü "Menüme Aktar" karşı ucu
6. Panel: aylık takvim v2 (ERTELENDİ) · randevu drawer durum-bazlı butonlar ·
   sidebar canlı sayaçlar · reçete PDF şablonu · toplu işlem/Excel ·
   panel-shell trim (Blade partial'a dönüşürken)
7. Arama "Son Aramalar" (localStorage/hesap)
8. SEO meta description'ları (61 sayfada bilinçli yok — gerçek copy ile)
9. Test sonuç paylaşımının gerçek OG/link altyapısı

## 🔜 FAZ 2 GİRDİLERİ (CİLA-2 kapanışında not edildi — 2026-06-12)

1. **BNP → üyelik modülü köprüsü:** bugun-ne-pisirsem'deki menü ekleme/çıkarma/
   düzenleme aksiyonları (Değiştir · Çıkar · Kap Ekle · Adını Değiştir ·
   Deftere Kaydet) Faz 2 üyelik modülüne bağlanacak — menü = kullanıcının
   kaydedip düzenleyebildiği koleksiyon.
2. **Püf yorumları → üye akışı:** puf-noktasi-detay'daki .rev-* yorum bölümünün
   üye akışına bağlanması Faz 2 İA'sında ele alınacak.
3. **Bekleyen 3 madde:** DadaStore marka dili kararı · mekan-detay 5px göz
   teyidi · BNP ölü wizard CSS temizliği (isteğe bağlı mini iş).

## 🗂️ FAZ 4 GİRDİSİ — Kategori entegrasyonu (2026-06-13)

Gerçek üretim kategorileri alındı: `tasks/KategoriEkle.xlsx` (11 sheet).
**Kategori entegrasyonu Faz 4'te, harita `tasks/kategori-haritasi.md`'de**
(sheet → sayfa/modül eşlemesi + yapısal fark notları: BNP mod 8→14, püf
soru-format, keşfet 6'lı, ölçü iki seviye). Faz 3'te tek istisna uygulandı:
ansiklopedi Katman-1 gerçek Sözlük kategorileriyle kuruldu.

## ⏳ PATRON BEKLEYENLER (Yasin Bey / iş kararı — dokunulmadı)

1. ~~Günün Tarifi bandının ana sayfa yeri~~ → **ÇÖZÜLDÜ Faz 3** (Keşfet
   sonrasına taşındı, ritim düzeldi)
1b. 🌙 **RAMAZAN MODU konsepti onayı (YENİ — Faz 3)**: 5 sayfada canlı demo
   (`?ramazan=1&demo=1`); onaylanırsa site-geneli yayılım + gerçek vakit API'si
2. Mutfak Sırları arka plan videosu (statik foto ile çözüldü)
3. Mobil app tanıtım landing'i (m3) — app bandı + footer rozetleri buna bağlı
4. ~~Reklam alan yerleşimi (m29)~~ → **Faz 3'te "Yerleşimler" bölümü kuruldu**
   (9 yerleşim + mock metrik); paket fiyatları kararı hâlâ patronda
5. EN dil stratejisi (dil menüsü mock)
6. Malzeme başı dış market "Sipariş Et" dropdown'ı
7. Video ray modeli (m13) — "Seriyi Aç" hedefi buna bağlı
8. Kupon iş kuralları (tek kupon? eşik tabanı?)
9. Sözlük Q/W/X politikası · sosyal login seti (FB?) · siparişlerim hesaba
   5. sekme mi · BMH pediatrik kapsamı · vücut tipi eşikleri (diyetisyen onayı)
10. Header bildirim zili (yeni chrome UI) · haftalık menü→alışveriş köprüsü
11. Yasal metinler hukukçu onayı + künye tüzel bilgileri + ekip isimleri
12. Sezon "Günün Ayeti" bloğu (editöryel) · "Şef Ol" hedefi (**Faz 3 ara
    çözümü: →tarif-ekle**; patron farklı isterse tek href sweep'i)

## ➡️ SONRAKİ ADIM (Beyar kararı — 2026-06-12)

0. **CİLA-2 FAZ 2 TAMAM ✅ (2026-06-12 gece)** — üyelik/profil modülü; detay
   ve commit önerisi `outputs/cila2-faz2-sentez.md`. Sıradaki adaylar: commit
   onayı → hero kanonu (Faz 3) + lg-gate genişletmesi + M2 patron kararı.
1. **CİLA-2 FAZ 1 TAMAM ✅ (2026-06-12, agent team: lead + 4 teammate)** —
   patron (Yasin Bey) revize turu 25 iş kalemi kanıtlı kabul; envanter 64→68;
   site-geneli dropdown sweep (Mutfağa Giriş + Mutfak Ansiklopedisi, 52 dosya);
   "Dada Denedi" site genelinde SIFIR; 390 mobil probe üretim setinde
   taşma/konsol/çift-katman 3×0. Sentez + Beyar inceleme listesi:
   `outputs/cila2-faz1-sentez.md`. **COMMIT BEYAR ONAYI BEKLİYOR** (öneri
   sentez raporunun sonunda).
2. **Beyar/patron incelemesi:** sentezdeki "Beyar incelemesi bekleyenler"
   (rozet adı, Ansiklopedi modül adı, DadaStore marka dili, legacy varyant
   arşiv kararı + mekan-detay 5px artefakt göz teyidi).
3. **CİLA-2 devam fazları:** hero kanonu (Faz 3 — saglik-testler hero'su
   dahil) + revize-2 tereddütleri (hesabim 38px buton, gerçek cihaz teyidi).
4. Sonrası: stack kararı (Laravel mi statik mi) + EN dil stratejisi.

---

## 🖥️ Lokal önizleme / SS alma

```
cd /Users/dadaistanbul/Developer/Projects/dadamutfak
python3 -m http.server 8765 &
open "http://localhost:8765/mockups/anasayfa-portal-v3a.html"   # site
open "http://localhost:8765/mockups/panel-shell.html"           # panel
```

Canlı (Pages): https://by4r.github.io/dadamutfak-view/mockups/<sayfa>.html

- **Ortak:** `?dd=1` mega+dil · `?drawer=1` · `?cc=1` · `?fb=1` · panel `?nav=1`
- **Üyelik (Faz 2):** `?auth=1` login / `?auth=0` çıkış (localStorage kalıcı;
  shop+panel+hesaplayıcı MUAF) · defter `?view=public` · `?tab=` · giris
  ön-dolu (tek tık) · tarif-ekle `?mode=edit` · puf-ekle `?state=`
- **Test ailesi:** `test-detay-v1.html?test=metabolizma|su-hidrasyon|
  temel-pisirme|hangi-yemek` (+`&sonuc=1` sonuç kartı)
- **Tarif detay:** `?cook=1` pişirme modu · yazıcı ikonu = print görünümü
- Dalga paramları: `outputs/dalga{2,3,4}-sentez.md` · Scratch SS:
  `mockups/.ss-scratch/` (gitignored) · Mobil SS: 500px + 390 iframe probe
  (kılavuz §4) · Probe altyapısı: `.ss-scratch/cila/sweep.py`
