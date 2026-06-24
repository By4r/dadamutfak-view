# DadaMutfak — Handoff (SIRADAKİ: Yol Güzergahım v2 — Dalga 1 + görsel fix + CHECKPOINT + SAVED-FLOW COMMIT'Lİ, PUSH YOK · sıradaki: revize-mock ikilisi)

> ## ⏸️ OTURUM SONU DURUMU (2026-06-24 — Yol Güzergahım v2 **CHECKPOINT (b) + GÜZERGAHLARIM→AÇ FIX (Seçenek 2) KOMPLE + COMMIT'Lİ** · sıradaki: revize-mock ikilisi)
>
> **PROJE:** DadaMutfak yol güzergahı **BAŞTAN TASARIM** (Roadtrippers referanslı tam-ekran). Dosya: **`v6/yol-guzergahim-v2.html`** (v1 DOKUNULMUYOR). Revize karar tablosu: `tasks/yol-rev-plan.md` · keşif md'leri: `yol-rev-{renk,header,mobil,spec}.md` · analizler: `yol-rev-checkpoint-analiz.md` · `yol-rev-savedflow-analiz.md`.
>
> ### ✅ BU OTURUM — CHECKPOINT + SAVED-FLOW COMMIT'Lİ `17d323f` (push YOK — `origin/main`'den **9 commit önde**)
> Tek dosya `v6/yol-guzergahim-v2.html`. Playwright ALL PASS (1440/390, console/mojibake 0). İki iş aynı feature ailesi (loadRoute/activeRouteId/route-scoped visited) → tek commit. QA: `tasks/yol-v2-{checkpoint,savedflow}-qa.mjs` (untracked).
> - **CHECKPOINT (b) — "Yükle"yince ziyaret bağlamı:** `activeRouteId` state (loadRoute'ta `rec.id`, divergence'ta `maybeBuild`/ters-çevir → null). **Çift sinyal:** harita pini ziyaret = yeşil dolgu + ✓ + sönük (Dada-ziyaret domates kimliğini korur) + sol "Güzergahımdaki mekanlar" üstü-çizik + medya köşesi ✓. Detay kartında **"Ziyaret ettim/Ziyaret edildi" toggle** (yalnız `activeRouteId && isSel` → serbest planlamada gizli = karar 1 gate). Ziyaret HER ZAMAN id'ye göre (`visited[routeId][ad]`) → bulaşma yok / yeni rota tertemiz (karar 2/3). Saved-sekme checklist + ilerleme korundu, iki giriş aynı `visited[id]`'ye yazar (senkron).
> - **GÜZERGAHLARIM→AÇ FIX (Seçenek 2):** (B-3) `buildRecord` artık **poly+dakika saklıyor** → kayıtlı rota **ağ-bağımsız** anında açılır (QA: OSRM bloklu iken bile çizdi, 0 OSRM çağrısı). (B-1) `loadRoute` async öncesi **`clearRoute()` + anında `drawRoutes+fitActive+spawnVenues`** → stale render bitti (eski İstanbul-içi zoom / yanlış koridor sızıntısı gitti); poly'siz eski kayıt → `fitStops()`+canlı-OSRM fallback. **Bağlam UI:** `activeRouteId` set iken soft şerit **"Yüklü güzergah: «ad»"** + buton **"Kaydet"→"Güncelle"** (aynı id overwrite, **duplikasyon yok**, `visited` korunur); divergence → form "Güzergahımı Kaydet"e döner.
>
> ### ✅ ÖNCEKİ COMMIT'LER (bu özellik ailesi)
> - **`8a15890`** — DALGA 1 (Dada-soft palet, `proxLabel` mesafe formatı, seçili pin/preview, ROAD_POOL 190 mekan/33 şehir + deniz-koord fix, slider, durak input-× + satır-sil).
> - **`a26e9a1`** — Alternatif rota görünürlüğü (beyaz casing + nötr gri, ince + alt z-index, hover + km·süre tooltip, liste↔harita çift-yön senkron) + **Güzergahlarım Dada pill**.
> - **`e225b89`** — Leaflet **box-zoom kapatıldı** (`boxZoom:false`); normal zoom korundu.
> - **`fcef076`** — **Focus-outline fix:** `.leaflet-interactive:focus{outline:none}` + `:focus-visible` tomato ring (klavye erişilebilirliği korundu). *Ders: "mavi dikdörtgen" box-zoom değil, focusable SVG path UA outline'ıydı.*
> - **`fef3b61`** — handoff chore.
>
> ### ⚠️ TEKNİK BORÇ — Sentetik alternatif rota (commit `e8ccebd`)
> `bulgeRoute()` ile üretilen alternatifler **GERÇEK YOL DEĞİL** — ana rotanın sinüs zarfıyla yana şişirilmiş **demo doldurucusu**. Sadece mock/demo görsel amaçlı. **Dalga 5'te (gerçek OSRM/veri)** prod rota servisi bağlanınca: ya tamamen **kaldır**, ya da **"gerçek alternatif yoksa fallback"** moduna indir. 🚫 **CANLIDA sahte rota kullanıcıya gösterilmemeli** (var olmayan yola yönlendirme riski). `topUpAlts()` zaten gerçek alternatifleri koruyor → prod-OSRM çok-rota beslerse sentetik otomatik devreden çıkar; tek kalan risk public OSRM'in tek-rota döndüğü durum.
>
> ### 🎯 KUYRUK (resume'da sıradaki iş — öncelik sırası)
> 1. **Revize-mock ikilisi** — ✅ **BİTTİ** (commit `e8ccebd`): alternatif yol 4'e çıkarıldı (gerçek korunur + `bulgeRoute` sentetik doldurucu), ROAD_POOL 190→259 mekan / 40 koridor anahtarı. QA `yol-v2-{mockcount,alt-mock}-qa.mjs` ALL PASS (1440/390, console/mojibake 0). ⚠️ borç notu ↑.
> 2. **clear × hover/tık radius tutarsızlığı (← SIRADAKİ)** (ufak CSS, projedeki radius token'ıyla hizala).
> 3. **SPONSOR KART:** Yol Üstü Mekanlar şeridine premium reklam kartı (**frontend-design skill ŞART**) — ⚠️ **canlıya çıkmadan Yasin Bey onayı** gerekir (reklam/gelir kararı).
> 4. **DALGA 2 — header:** **"ROTA PLANLAYICI" eyebrow** (K7=A) + route-line üst şerit.
> 5. **DALGA 4 — mobil** (Faz1 bottom-sheet detay → Faz4 390 breakpoint, `yol-rev-mobil.md`).
> 6. **DALGA 5 — veri** (gerçek OSRM/veri besleme). NOT: kayıtlı rotalar artık **poly sakladığı için ağ-bağımsız açılıyor** → bu yük hafifledi; alt-rota görsel/sync kodu hazır, prod-OSRM çok-rota besleyince otomatik çalışır.
>
> ### ⏳ AÇIK CONCERN'LER
> - **`sezon-v1.html` watermark** — working tree'de commit'siz (` M`, onaysız); Yol Güzergahım DIŞI, ayrı iş — **DOKUNULMADI, DOKUNMA**.
> - **PUSH bekleyen: 9 commit** (`origin/main`'den önde) — canlıya **batch halinde, Dalga 2 sonrası** önerildi. Beyar ayrıca "push" diyecek.
>
> ### KARARLAR — CHECKPOINT (5/5 KAPALI) + SAVED-FLOW
> ✅ route-scoped ziyaret · ✅ bulaşma yok · ✅ yeni rota tertemiz · ✅ harita+liste çift sinyal · ✅ **5. KARAR = (b)** "Yükle"yince otomatik ziyaret bağlamı (ayrı mod YOK). · ✅ **SAVED-FLOW = Seçenek 2** (tek-harita, "yüklü rota" bağlamı + Güncelle, yeni view yok).
>
> ### MODÜL-YERLEŞİK SABİT KARARLAR
> kaydet→toast + Güzergahlarım'a geç (yeni kayıt) · GÜNCELLE→sekmede kal · kayıt adı otomatik (kalkış→varış) düzenlenebilir · mekan≠durak · Dada öneriyor elle `dada:true` · eşik oransal+slider · global harita Türkiye merkezli · tek-tip durak seçim sırasıyla (auto-reorder YOK) · mekan kartı sade · **kayıt artık poly+dakika saklar (ağ-bağımsız görüntüleme)**.
>
> ### KURALLAR
> izole sayfa-içi CSS/JS · kanonik kabuk (sa-shell/sa-ui/sa-*) DOKUNMA · v1 DOKUNMA · domates `#E14827` / yeşil `#009d4f` token (ham hex kaçın) · frontend-design + uiux-review skill · görsel QA tam-sayfa SS self-verify (1440/390) · commit yalnız onayla · **PUSH YOK** (Beyar ayrıca söyleyecek).
>
> ### WORKING-TREE (commit dışı, DOKUNMA): `sezon-v1.html` watermark (onaysız) · untracked plan/qa dosyaları (`yol-rev-*.mjs/.md`, `yol-v2-*-qa.mjs`, `_gen_roadpool.mjs` dahil) · bu `handoff.md` (ayrı chore commit'i).
>
> ### ESKİ SIRADAKİLER (Yol v2 revize sonrası): RAPORLAR FAZ-3 (jargon hover tooltip, plan-first) · diğerleri aşağıda.
>
> ---
>
> Tarih: 2026-06-23. **Bu oturum: Admin-B FAZ-2 (2A içerik-tipi künye grupları + 2B Sofra yapısal gövde-toggle) , FAZ-3 Sözlük modülü ve merkezi Taksonomi konsolu TAMAM — Playwright ile bağımsız doğrulandı, `origin/main`'e PUSH edildi. Son commit `e0419ca` (Taksonomi konsolu); öncesinde `3534aae` (Sözlük A-Z birincil filtre), `c507e22` (Sözlük modülü), `0f92d7f` (FAZ-2A+2B), `1f00455` (faz-1).** GitHub Pages canlı. Kanonik kabuk (sa-shell/sa-ui/sa-*) — TEK izinli dokunuş SECTIONS'a nav satırları (Blog & İçerik · Sözlük · Taksonomi) + dizin linkleri + 3 liste köprüsü (tarifler/icerik/sozluk ph-actions); gerisine dokunulmadı. **Klasör `v6/`.**

## ✅ BU OTURUM — TAMAMLANDI (push edildi)

**FAZ-3 — Sözlük yapısal modülü** (commit `c507e22` + A-Z revize `3534aae`). Mutfak Sırları'nın "Sözlük" başlığı makale DEĞİL (terim+tanım, yüzlerce kayıt) → AYRI yapısal CRUD, içerik formuna girmez. Plan `tasks/admin-b-faz3-sozluk-plan.md`.
- **2 yeni izole sayfa:** `sa-admin-sozluk.html` (liste — `sa-admin-icerik` kardeşi: **A-Z bar [BİRİNCİL] + kategori chip [İKİNCİL] + arama, üçü AND** + ptable + saConfirm sil; 12 mock terim, harf-avatar + gloss alt-satır; **kategori rozeti = TEK `--acc` token-tint + kategoriye özel ikon**) + `sa-admin-sozluk-form.html` (kompakt satır-form — çerçeve `sa-admin-kullanicilar-form`: Terim/Yabancı ad/Kategori[5 vocab]/Harf/Tanım/Örnek/İlgili tarif; sağ panel Yayın Durumu + canlı önizleme, **SEO YOK**).
- **Harf auto-fill TR-güvenli:** `toLocaleUpperCase('tr')` (İ/I tuzağı); elle düzeltince override korunur.
- **A-Z birincil filtre (commit `3534aae`):** ilk karar "A-Z YOK" idi → REVİZE. Alfabetik gezinme sözlüğün imza etkileşimi → BİRİNCİL (public `sozluk-v1` azBar mantığı portu: Tümü + mevcut baş harfler aktif, olmayan disabled; harf `.tg-harf`'ten DOM-gerçek). Kategori chip İKİNCİL satıra indi. **Tek-satır yatay slider** (wrap yok, ince scrollbar). Ders → `tasks/lessons.md`.
- **Nav + dizin (N-onaylı):** `sa-shell.js` SECTIONS.admin.menu +1 satır (`fa-spell-check` Sözlük, Blog & İçerik altına) + `dizin.html` ADMIN_GROUPS +2 link. is-active domates `#E14827` doğrulandı (liste+form).
- **QA:** liste filtre/arama/boş-durum/saConfirm · form auto-fill/önizleme/override · nav is-active · dizin link 200 (404 yok) · 1440/390 render · UTF-8 0 mojibake · console 0 hata.

**Merkezi Taksonomi konsolu** (commit `e0419ca`). `sa-admin-taksonomi.html` — yeni izole sayfa, iki-pane konsol (sol grup-kartları + sağ seçili-grup satırları), **5 grup: Tarif / Sözlük / İçerik Tipi / Ansiklopedi / Rol**. Sistemik açık (kategori/etiket vocab'ları hardcoded, yönetim yüzü yok) bu ekranla kapandı. Analiz/plan: `tasks/admin-tutarlilik-analiz.md` + `tasks/taksonomi-sema-analiz.md` + `tasks/admin-taksonomi-plan.md`.
- **Tarif grubu:** gerçek **14 public kategori** (mega-menü ile eşit slug/ikon/sayaç; 8 placeholder atıldı) + **kapak görseli alanı** (div+bg cover/center, FileReader mock + boş placeholder ORTALI) + ikon seçici (foto+ikon birlikte). 10 kategori public foto ile seed, 4 boş (placeholder demosu). Satır chip'i: görselli→kapak thumbnail, görselsiz→ikon.
- **İçerik Tipi / Rol = schema-driven modal blokları** (grup-koşullu): İçerik Tipi → URL ön-eki + künye grubu + gövde tipi · Rol → erişim bölümleri çoklu-seçim. Diğer 3 grup ad/slug/ikon. Satırda davranış/erişim özeti.
- **Ekle/Düzenle = sayfa-içi modal** (TR-güvenli slug auto-fill, grup-bilinçli başlık/etiket/sil mesajı), sil = saConfirm. **Mock CRUD (persist etmez).** `--acc` token-tint, ham renk yok.
- **Kabuk dokunuşu (izinli):** SECTIONS.admin.menu +1 (`fa-sitemap` Taksonomi, Sözlük altına) + `dizin.html` +1 link. **3 liste köprüsü:** tarifler "Kategorileri Yönet" · icerik "Tipleri Yönet" · sozluk "Kategorileri Yönet" (ph-actions `btn-ghost btn-sm + fa-tags`; **sözlük linki `#catChips` selektörü DIŞINDA** — filtre döngüsü güvenli).
- **QA `tasks/taksonomi-qa.mjs` ALL PASS:** 14 tarif/gerçek slug · davranış+erişim satırları · modal grup-özel alanlar · kapak alanı tarif-only + 4 grupta YOK + placeholder ortalı · köprü 200×3 + sözlük selektör güvenli · 1440/390 render · console/mojibake 0.

**FAZ-2 — İçerik tipi gövde tutarlılığı** (commit `0f92d7f`). `sa-admin-icerik-form.html` + `sa-admin-icerik.html`, kanonik kabuk dokunuşu YOK.
- **2A:** `#f-tip` yeniden kuruldu (Mutfağa Giriş · Püf · **Ansiklopedi** aktif · **Sofra Düzeni** yeni · Gurme; **Sezon ÇIKARILDI** — Mutfak Sırları menüsünde değil, müstakil tema). Tip-toggle künye grupları: Mutfağa Giriş→Ders Künyesi · Ansiklopedi→Madde Künyesi + Besin Değeri repeater (SortableJS) · Sofra→Sofra Künyesi. Liste: +2 chip/badge/4 mock satır (Tümü 14).
- **2B:** Gövde-toggle — Sofra Düzeni seçilince blok-editör gizlenir, yapısal gövde (Giriş + Adım repeater + İpucu checklist repeater) açılır; diğer 4 tipte blok-editör. **Kanıt:** gerçek DOM sayımı 4/5 tipte p/h2 makale gövdesi gösterdi (Mutfağa Giriş 14p/5h2 — Püf'ten fazla; Ansiklopedi 7p/4h2; Gurme 8p/2h2) → "sadece Püf blog" tezi çürütüldü, tek istisna Sofra (3p/0h2 + step/tip kartları).

<details><summary>Önceki oturum — besin redirect + sticky 26 ekran (commit a2e9e44)</summary>
- **Besin 4-rehber redirect:** `besin-kalori-cetveli`/`protein-rehberi`/`karbonhidrat-rehberi`/`yag-rehberi` → erken `location.replace('besin-degerleri-v1.html?tab=<slug>')`. Lead Playwright 4/4.
- **Sticky sağ-sütun 26 ekran** (DadaFit `.summary-card` paritesi): 13 edit-form (`.side-card`) + 13 operatör/admin detay (yeni `.detail-side`). Her sayfanın kendi bp'si (900/980), `static` fallback base'den SONRA (cascade dersi → `sticky-media-cascade-order`). Lead grep 26/26 + Playwright 11 örnek PASS.
</details>

<details><summary>Önceki oturum — mega-revize (commit 435d3fa/7fce1c6)</summary>
- **Mega-revize Dalga-1 + round-2 + ek revize + ufak fix** (commit `7fce1c6` + `435d3fa`). 3 şerit (public/isletme/admin-form) agent-team, lead Playwright/render ile bağımsız doğrulandı; kanonik kabuk 0 dokunuş.
- **Public içerik (dada-revize 8 madde):** bugun-ne-pisirsem (rename UI), tarif-bulucu (filtre+protein), kesfet (Mekan Öner modal), mutfaga-giris + **YENİ mutfaga-giris-liste** (slider + Tümünü-gör fix), ansiklopedi, olcu-birimleri, sezon. (item-9 TBD.)
- **İşletme akışı:** giris (rol→panel), hesabim (İşletmem söküldü), isletme-ekle (**faz-bölme**: temel kayıt → mock geçiş → ekstra alanlar), 4 mekan panel (consumer `SA_ACCOUNT_ITEMS`), mekan-detay (**?owner=1 önizleme bandı**), mekan-panel "Public Sayfam" tek-link→owner=1 (fazla CTA'lar söküldü).
- **Admin tarif formu wizard paritesi:** `sa-admin-tarifler-form` — malzeme grup/drag(Sortable)/autocomplete/birim, adım AI-iyileştir/görsel/süre/drag, searchable mutfak multi-select + 14 etiket chip.
- **tarif-bulucu ingredient slider:** 2-sütun cat-cols + çift-açma (sol→sağ eş, sik-dahil parite fix — latent çapraz bug çözüldü) + tek-satır slider (~5 görünür, 98px) + **15+ malzemeli kategori 2-row** (Sebzeler 20→2 satır). Filtre+protein korundu.
- **sezon:** belirgin hilal/yıldız hero motifi + sayfa-geneli soluk watermark (opacity 0.08-0.09).
</details>

## ✅ TAMAMLANDI + PUSH'LI (origin/main `e0419ca..5405a9c`, GitHub Pages canlı)

> 5 commit push edildi (bu + önceki turlar). Planlar diskte (untracked): `tasks/yol-guzergahim-research.md` · `tasks/raporlar-analiz-plan.md` · `tasks/raporlar-derin-plan.md` · `tasks/haftalik-menu-plan.md`. Tümü izole sayfa-içi CSS/JS, kanonik kabuk 0 dokunuş.

**1. HAFTALIK MENÜ** (`haftalik-menu-v1.html`) — ✅ **`1e0010f`**: A.1 öğün-bazlı öneri sıralaması (`POOL.tags`+`MEAL_TAG_MAP`, `openTsr` `data-meal` okur) + B.3 öğün kalori özeti (`.mc-sum`). Bug fix: seed tek-tarifli hücreler `ensureStack`'ten geçti → 2. tarif kabul.

**2. YOL GÜZERGAHIM** (`yol-guzergahim-v1.html`) — ⚠️ **`fef6530` (PUSH'LI canlıda) ama Beyar "sevmedim" → REVİZE BEKLİYOR**: gerçek OSRM routing (12s timeout+retry, çok-noktalı) · OpenRouteService şehir-yolu (`ORS_API_KEY=''` placeholder, boşken graceful mock fallback) · şehir ekle/çıkar/sürükle waypoint · şehir baloncuğu→mekan drawer · 2-katman yakınlık (≤5km Yol Üstü yeşil / 5-20km Yola Yakın gri) · "Gerçek yol"/"Tahmini" rozeti. **Beyar neyi sevmediğini netleştirecek → düzeltme.** (Geri alınmak istenirse `git revert fef6530`; iş kaybı yok.)

**3. ADMIN RAPORLAR — DALGA 1+2** (`sa-admin-raporlar.html`) — ✅ **`5083ba8` (D1) + `bdd849c` (D2)**. Multi-brand hub analytics (plan `tasks/raporlar-derin-plan.md`):
- **D1:** 2-seviyeli nav `Hub Genel`(L1)·`Markalar`(L2) `|` `Kıyas`·`Finansal`·`Kitle & Kohort`·`Operasyon`(L3) · imza metriği "2+ dikeyde aktif üye" hero (2,4× LTV) · marka gelir katkı şeridi · anomali şeridi · 6 derin marka paneli (İçerik/Store/DadaFit kohort/Sağlık/İşletme/Akademi) · `.brand-*` scope (ham hex temizlendi, grep-doğrulandı).
- **D2 (cross-cutting L3):** Kıyas = dönem-kıyas tablosu + **markalar-arası çapraz-satış matrisi** (saf-CSS ısı-matris, satır=kaynak marka brand-scope) + normalize marka kıyas bullet · Finansal marka-kırılım tablosu + gerçek abonelik kademeleri (Ücretsiz 7.126 / Pro1 ₺79·982 / Pro2 ₺149·304) · Kitle hub kohort heatmap · Operasyon birleşik onay kuyruğu (tarif 31+işletme 18+diyetisyen 4+antrenör 2+şef 3+şikayet 14=72 + SLA pstat).
- **Donut fix:** 6 donut merkez label hizalama — `::after` occlusion (`z-index:2`) + grid→flex-column-center (place-items satır grubunu dikey ortalamıyordu). Merkez=toplam, conic↔legend renk/oran tutarlı.
- **Tarih kontrolleri fix:** aralık chip tek-seçim + alt-başlık · **Özel** native date-range popover (TR format, validation, Esc/dış-tık kapanış, "backend'de bağlanacak") · **Kıyas** toggle + kpi-cmp referans pill + alt-başlık suffix. NOT: kontrol şeridi mobilde kanonik kabuk gizliyor (`sa-shell.css:458 .ph-actions{display:none}`) — kabuğa dokunulmadı.

**4. İKON-CHIP MERKEZLEME FIX** (`5405a9c`) — 6 sayfa / ~72 chip: `.bz-ico`/`.badge-ico`/`.ic-ico` grid-center'ı, etiket için yazılmış fazla-geniş `.X-card span{display:block}` kuralı eziyordu (özgüllük 0,1,1>0,1,0 + font-size/color/margin sızıntısı). Fix: etiket kuralı `:not(.<chip-class>)` ile daraltıldı → chip grid-center'ı + intended boyut/renk geri. Sayfalar: admin-rozet-v1 · rozetler-v1 · mutfak-defteri-v1 · hesabim-v1 · diyetisyen-profil-v1 · antrenor-detay-v1. Self-verify: 204 dosya tarama → 0 kayık chip; dx=0/dy=0/grid; 1440+390; console/mojibake 0. (Önceki "boş placeholder ikon sol-üste yapışık" premise'i 3 taramada bulunamamıştı — gerçek bug buydu: dolu chip'in label-CSS çakışması, `admin-*` glob'u dışında kaldığı için kaçmıştı.)

### 🎯 SIRADAKİ İŞLER (öncelik sırasıyla — Beyar belirleyecek)
1. **RAPORLAR FAZ-3 — best-practice genişletme.** "Daha ne eklenir" araştırması + jargon terimlere **hover tooltip** (dikey / 2+ dikey / kohort / MRR / LTV açıklamaları). **PLAN-FIRST:** araştırma → öneri → onay → implement (implement kuralı: izole sayfa-içi, kabuğa dokunma, saf-CSS, token+`.brand-*`, ham hex yasak, commit onayla).
2. **YOL GÜZERGAHIM revize.** Beyar "sevmedim" dedi — neyi sevmediği netleşince düzeltme (veya `git revert fef6530`).
- **GELECEK NOTU (Laravel geçişi):** Raporlar backend-bağlama haritası — her panel hangi tablo/event'ten beslenecek. DAU/retention/kohort/imza-metrik için **kullanıcı aktivite/event loglaması** gerekiyor (şu an tümü mock).

## 📦 COMMIT DIŞI (working-tree'de bekliyor — DOKUNMA)
- **sezon-v1.html watermark** belirginleştirme (~0.13-0.15 opacity) — Beyar "en sona", **onaysız**. Onaylanınca ayrı commit.
- **tasks/admin-b-*.md** eski plan dosyaları (untracked, bu işle ilgisiz). · `tasks/handoff.md` da commit dışı (önceki gibi working-tree'de kalır).

## 🔒 DEĞİŞMEYEN (sırada değil / ileride)
- **Ölçü Birimleri** tablo editörü → **DEFER** (saf tablo, makale değil; yüksek efor). · **Sofra Düzeni indeks kartı** repeater (8'li kategori kartı — opsiyon). Detay: `tasks/admin-b-faz2-plan.md`.
- **Admin-C rapor genişletme** (büyük, plan gerek): Yasin "çok daha detaylı / hepsi best-practice". Modül kırılımı + finansal + moderasyon + demografi + tarih filtresi/kıyas. Bloke değil.
- **Gözetim köprü `gz-act` asimetrisi:** `sa-saglik-randevular`/`-receteler`/`-testler` (5'er satır, detay dahil) köprüsüz — bilinçli kapsam-dışı; eklemek = yeni yüzey + semantik eşleştirme. **Yasin Bey'e sorulabilir.**
- **Ayrı session:** `yol-guzergahim` Leaflet rota modülü (plan `tasks/yol-guzergahim-plan.md` hazır — Leaflet+OSM, statik JSON, İstanbul-Bursa / +Ankara) · **İşletme login avatar + B3 consumer-header sweep** (~93 sayfa header dropdown + işletme girişinde avatar + otomatik panel). **EN SON.**

> Kapandı bu oturum: **Merkezi Taksonomi konsolu** (`e0419ca` — 5 grup, tarif gerçek 14 kategori + kapak görseli, tip/rol schema-driven, 3 liste köprüsü) · **FAZ-3 Sözlük modülü** (liste+form+nav+dizin + A-Z birincil filtre/tek-satır slider) · Admin-B FAZ-2 (künye grupları + Sofra gövde-toggle). Önceki: faz-1 içerik modülü · besin redirect · sticky 26 ekran.

## 📚 DERSLER (bu oturum)
- **Gövde/içerik tipini KANITLA, algıya güvenme:** "şu sayfa blog/makale mi?" sorusunda gerçek DOM'u say (serbest `<p>`/`<h2>` akışı vs künye/tablo/kart). Beyar "sadece Püf blog" dedi; sayım 4/5 tipte gerçek makale gösterdi (Mutfağa Giriş Püf'ten fazla) → tek gerçek istisna Sofra. Premise yanlışsa açıkça düzelt.
- **Kategori/etiket rozetinde token kısıtı:** global palette'te 5 ayrışık hue token YOKsa (admin'de yalnız `--acc`/`--green`/nötr), 5 kategori için sahte literal renk uydurma → TEK accent token-tint + kategoriye özel **İKON** ile ayrıştır. Ham renk literali yasak (marka kuralı).
- **Türkçe büyük harf:** harf türetme/normalize her yerde `toLocaleUpperCase('tr')` / `toLocaleLowerCase('tr')` (İ/I tuzağı) — düz `toUpperCase` mojibake/yanlış harf üretir.
- **Yapısal CRUD ≠ makale formu:** terim/tanım gibi sabit-şema, gövdesiz, çok-kayıt içerik blok-editöre girmez → ayrı liste+satır-form (kullanicilar/icerik kardeşi), sıfırdan tasarlama, kardeş dili miras al.

> Plan referansları: `tasks/mega-revize-plan.md` (5 batch şerit haritası + çakışma bayrakları) · `tasks/admin-review-yasin-plan.md` (Admin-A/B/C).

## ✅ PUBLIC REVİZE TURU (round 1→4) — TAMAMLANDI · CANLI
> Saf frontend, targeted edit, kanonik kabuğa (sa-shell/sa-ui/sa-*.css) DOKUNULMADI. 3 teammate (layout-css/icerik/premium-shop) round 1-2; round 3-4 lead linear (teammate'ler güvenilmez idle olunca devralındı). Görsel QA Beyar tarayıcıda onayladı.
- **tarif-bulucu-v1** — Malzeme kategorileri TUM uniform: `.mz-grid` column-flow (grid-auto-flow:column + grid-template-rows:repeat(3)) KALDIRILDI → `display:flex;flex-wrap:nowrap;overflow-x:auto` + `.mz-grid>.mz{flex:0 0 106px}` (mobil 88px). Tüm kategoriler "Sebzeler" gibi soldan-sağa tek-satır yatay slider (zigzag/erken-satır-atlama yok). mz-more gizli.
- **kesfet-v1** — Mekan listesi çok-satır: grid'e 9 yeni disc-card eklendi → 18 kart = 6 satır × 3 kolon (uzatılmış filtre sütununa denk). CSS cap yoktu (9 kart = 1 sayfaydı). Kolon/kart boyutu + filtre uzatması (round-1) + Semt/Özellikler default-açık korundu.
- **giris-v1** — (a) İki kolon EŞİT yükseklik: `.au-layout align-items:stretch` + `.au-visual height:624px→min-height:624px` (floor) → hero+form giriş ve kayıtta eşit boy (uzun kayıtta birlikte uzar). (b) Kayıt'a 4 ROL SEKMESİ (Kullanıcı/Antrenör/Diyetisyen/İşletme) + role özel `[data-role-req]` alan blokları + giriş'te `#giAsSeg` rol mini-seçici (MOCK role→panel: antrenor-panel/dyt-danisanlar/mekan-panel). `.au-dyt` kutusu kaldırıldı. (c) Rol sekmeleri PER-MODÜL AKSAN: aktif zemin Kullanıcı=`--tomato` · Antrenör=`--c-green` #009d4f · Diyetisyen=`--green` #3BB77E · İşletme=`--c-petrol` #006072 (`.au-rseg` scope, `#giSeg` e-posta/tel hariç). (d) round-4 KONTRAST fix: pasif hover `:not(.active)`'e sınırlandı + `.au-rseg .au-seg-btn.active{color:#fff}` → aktif sekmede yazı+ikon daima beyaz (hover'da aksan-renkli-yazı-görünmez bug'ı çözüldü).
- **haftalik-menu-v1** — Komşu hücre bağımsızlığı: `.mcell min-height:126px→height:172px` (SABİT) + `.mc-stack max-height:268px→max-height:100%;height:100%` (sabit hücre içinde scroll). Satır yüksekliği içerikten bağımsız → bir hücreye ekleme/çıkarma komşu Ekle butonu+hizasını ASLA etkilemez. Ayrıca round-1 aranabilir `.tsr` öneri popover + çoklu ekleme (dyt-recete-builder modeli).
- **diyetisyen-profil-v1** — Alttaki "Rozet Koleksiyonu" section + sadece `.pfr-*` CSS silindi; üst `.pf-badges` özeti + shared `.badge-*` korundu.
- **besin-degerleri-v1** — Tablolar zaten kanonik `.ref-table` (dokunulmadı); makro sekme çubuğu segment-pill diline + 4 tekrarlı "Değerleri karşılaştır" başlığı sekmeye göre anlamlandırıldı.
- **dada-shop-v1** — Giriş Yap×2 → `giris-v1.html` reroute (in-page modal ölü-zararsız); üst "Yöresel" nav silindi (drawer "Yöresel Lezzetler" kaldı); promo kart köşe taşması `background-clip:padding-box`+`isolation:isolate`; "Tariften Sepete" overlay katmanlı scrim.
- **video-mutfagi-v1** — Restoran Sırları + Dada Akış locked kartlar ortak premium dil (blur 7px + altın crown watermark, `pointer-events:none`); fullscreen reels viewer'a kilitli premium reel (shorts[2], `#dkLock data-pro-gate` → `#proGate`, z-index 130/131 reels üstünde).
- **QA notu:** round-3/4 sırasında Bash classifier servisi kesintideydi → lead render-QA (`outputs/_qa_r3_all.mjs`, hazır) çalıştırılamadı; tüm edit'ler Read-seviyesi yapısal teyit + Beyar tarayıcı onayı ile kapatıldı.

## ✅ FAZ 3 — "Panelini Aç" köprüsü (TAMAMLANDI · CANLI)
- **Ana iş:** `feat d33ded7` · **QA:** `chore 226ac57`. Mockup (gerçek auth yok, salt görsel akış).
- **2 yeni izole asset:** `v6/assets/css/sa-gozetim.css` (panel-aç CTA + üst impersonation şeridi) + `v6/assets/js/sa-gozetim.js` (sessionStorage tabanlı banner, panel-içi gezinmede kalıcı, "Gözetime Dön" → geldiği gözetim ekranı). **Kanonik kabuğa (sa-shell/sa-ui) DOKUNULMADI.**
- **6/6 detay hero buton** (`.pol-head` — dolgulu yatay-uzun, modül aksanı `var(--acc)`, başlık sağ ucu, mobil full-width): antrenörler · diyetisyenler · işletmeler · rezervasyonlar · onaylar · menüler detay. Bağlamsal etiket/href korundu (rezervasyon→`mekan-rezervasyonlar`, menü→`mekan-menu`, onay+işletme→`mekan-panel`, diyetisyen→`dyt-danisanlar`, antrenör→`antrenor-panel`).
- **6/6 liste kompakt buton** (`.act-btn.gz-act` — accent-outline "Panel", satır ritmine uygun): antrenörler · diyetisyenler · işletmeler · rezervasyonlar · onaylar (İncele satırı dahil) · menüler. `?gozetim=1&from=<liste>` taşır (tüm satırlar aynı mock panele — kasıtlı).
- **18/18 operatör paneline** banner link+script (Antrenör 8 + Diyetisyen 6 + Mekan 4). `body.has-gozetim` ile fixed kabuk aşağı itilir (izole override).
- **Aksanlar doğru:** antrenör yeşil `#009d4f` · diyetisyen nane `#3BB77E` · işletme petrol `#006072` (sa-shell `body[data-sec]` çözer). **QA `tasks/gozetim-kopru-qa.mjs` → ALL PASS** (6 detay köprüsü + bağlamsal hedef + rol + Gözetime Dön + kalıcılık + temiz-ziyaret; 404/JSERR 0). 1440+390 render + bağlamsal hedef teyitli.

## DURUM — ne bitti (hepsi push'lı)
- **1. dalga gözetim** (Sağlık 4 + İşletme 4 + DadaFit 3 = 11 modül / 24 ekran) + wiring → `cc0b2a5`.
- **2. dalga gözetim** (Admin 9 + Store 6 = 15 modül / 28 ekran) + SECTIONS wiring → `1207fd0`.
- **Chip standardizasyonu** (wave-1 filtre chip radius+padding+weight → flagship 8px) → `7e2afbc`.
- **Docs** (Tarifler tipi CRUD+moderasyon hibrit) → `5ad8b1f`. · **Chore** (outputs SS untrack) → `df92a68`.
- **Antrenör operatör paneli** (8 ekran + builder + giriş kilidi) → `ed410c3`/`f0a7493` (+ qa `6d557c4`/`2208456`, docs `ba79698`).
- **Filtre chip sayaçları + kompakt format** (feat) — **24/24 liste sayfası sayaçlı + tutarlı 8px**. 10 sayaçsız sayfaya `.ch-cnt` (DOM-doğrulanmış gerçek sayılar) eklendi; 14 mevcut korundu. **Big-number-ready:** tek formatlayıcı `v6/assets/js/sa-chcnt.js` (24 sayfaya `<script>`; sa-shell/sa-ui'ye DOKUNULMADI) — `<1000` tam, `≥1000` tr-TR compact (`1,2 B` · `12 B` · `500 B` · `1,2 Mn`; 1.250.000→`1,3 Mn` kanonik Intl), tam değer `title`'da, `.ch-cnt` taşma-dayanıklı (`white-space:nowrap` + esnek min-width). tarifler "Tümü" sayfanın kendi toplamına (1.248→`1,2 B`) set. QA: `chcnt-format-qa.mjs` ALL PASS (24 + stres testi).
- **390px liste-tablosu responsive fix** (feat) — **YENİ `v6/assets/css/sa-list.css`** (kabuğa DOKUNULMADI): `.pc-body{overflow-x:auto;-webkit-overflow-scrolling:touch}` → geniş tablo kart İÇİNDE yatay kayar, sayfayı taşırmaz, kolonlar/veri korunur. **30 liste-tablosu sayfasına** `<link>` (glob; detay/form hariç). 5 anlamlı @390 taşma çözüldü (isletme 789→390 · saglik-diyetisyenler 847→390 · kullanicilar 562→390 · admin 438→390 · store tabloları). 1440 regresyon yok. QA: `sa-list-qa.mjs` PASS. **Kalan opsiyonel minör (acele yok):** `sa-saglik` 3px sub-pixel (tablo değil) + `sa-store-urunler-detay` 12px (detay sayfası — fix kapsamı dışı).
- **v5→v6 taşıma** (refactor `78028f3`) — `git mv v5 v6` (314 rename, tarih korundu). Path fix: `.gitignore` (v6/), 26 `tasks/*.mjs`, 25 `tasks/*.md`, kök `index.html` (giriş yönlendirmesi v6). Site relative-path olduğu için kod içi değişiklik yok. **v5 erişimi KAPALI** (404). QA: dizin/sa-admin-kullanicilar/antrenor-panel render OK. (Tarihsel `outputs/` raporlarındaki v5/ URL'leri kasıtlı dokunulmadı.)
- **Dizin Admin Panel sekmesi** (feat) — `v6/dizin.html`'e 2'li tab toggle (`Genel` + `Admin Panel`). Public GROUPS'a dokunulmadı; renderer `buildTab(groups)`'a çıkarıldı, iki veri seti (GROUPS + ADMIN_GROUPS). **Admin sekmesi: 90 sayfa / 9 kategori** — sıra: **Giriş/Sistem 2 (en başta; Yönetim Girişi solda, Gözetim Kabuğu sağda)** · Gözetim-Admin 21 · Store 15 · Sağlık 11 · İşletme 11 · DadaFit 12 · Operatör-Antrenör 8 · Operatör-Diyetisyen 6 · Operatör-Mekan 4. (dyt-*/mekan- public Genel'de de var, dup kasıtlı; antrenor-detay+ol public, hariç.) Tüm linkler relative + v6'da mevcut + `target=_blank`. QA: `dizin-tab-qa.mjs` PASS.
- **3 revize** (fix) — (1) dizin Admin "Giriş/Sistem": **Yönetim Girişi** kartı **solda/ilk** (sa-shell sağa). (2) `sa-dadafit-egzersizler`: Barbell Squat görseli ölü Unsplash 404'tü → çalışan squat görseliyle değiştirildi (diğer satırlarla tutarlı). (3) `sa-isletme-onaylar`: **Onayla** butonuna özel saConfirm handler (isletme adı + saToast); **Reddet** zaten sa-ui.js yerleşik destructive-delege ile yakalanıyor (dokunulmadı, çift pop-up önlendi). QA: `revize3-qa.mjs` PASS (tek pop-up, doğru toast, 404/JS/mojibake 0).

## ⏭️ SIRADAKİ İŞ — İŞLETME ÜRETİM TURU (audit planı HAZIR, ayrı temiz session'da)
> İşletme (mekan) hesabı public akış audit'i tamamlandı (read-only). Public profil EKSİK DEĞİL (`mekan-detay-v1.html` zaten zengin) — yeni sayfa GEREKMEZ. Net iş 6 madde:
- **B1** — `giris-v1.html` İşletme kayıt submit → `isletme-ekle-v1.html`; giriş submit → `mekan-panel-v1.html?business=1` (organik `has-business` kurar; şu an paramsız → `dm_business` hiç set olmuyordu).
- **K1** — `hesabim-v1.html` "İşletmem" sekmesi+pane (eski 1976-2022) + ona özel `biz-*` CSS söküm. (Beyar kararı: KALDIR — audit "kasıtlı huni" dese de Beyar normal kullanıcıda işletme bölümü istemiyor.)
- **W1** — `isletme-ekle-v1.html` wizard sonu → `mekan-panel-v1.html?business=1` (şu an hesabim'e dönüyor).
- **B2** — 4 mekan panel sayfasına (`mekan-panel/-rezervasyonlar/-ayarlar/-menu`) inline `window.SA_ACCOUNT_ITEMS` (sa-ui.js'ten ÖNCE; İşletme Profilim/Public Sayfam/Müsaitlik&Ayarlar/Çıkış→consumer logout). sa-ui.js DEFAULT_ITEMS süper-admin'e + `sa-giris`'e düşüyor (KOPUK).
- **B3** — Consumer header `.acct-menu`'ye `body.has-business` ile `.biz-only` blok (İşletme Panelim→mekan-panel · Halka Açık Profilim→mekan-detay). **Toplu enjeksiyon UNIFORM**: header byte-identical (`_shell.html` kopyası), `has-business` JS zaten Faz3'ten her sayfada. Anchor = `Ayarlar / Hesabım` + `.acct-div` + `.acct-logout` (sadece mutfak-brand sayfalarda var → store-brand `dada-shop` ailesi + auth sayfaları otomatik atlanır, self-selection). CSS kuralı her sayfanın inline `<style>`'ına (`.biz-only{display:none} body.has-business .biz-only{display:flex}`). Idempotent (zaten `biz-only` varsa atla). Spot-check: anasayfa-portal + kesfet + mekan-detay + besin-degerleri + dada-shop(negatif).
- **C2** — `mekan-detay-v1.html`'e `?owner=1` ince önizleme bandı (sa-gozetim banner deseni; "ziyaretçi görünümü · Panelden Düzenle"). Inline editing AÇILMAZ.
- **Walkable** — uçtan uca: kayıt→wizard→panel(business=1)→Public Sayfam→header dropdown→ayarlar; dead-link 0.
- **Ek (mock akış) — kayıt/giriş formları MOCK-DOLU + TIKLA-YÜRÜ.** Beyar spec akışını gerçek auth olmadan gezebilsin: `giris-v1` İşletme kayıt + `isletme-ekle-v1` wizard alanları örnek değerlerle dolu/önizlemeli gelsin; submit/ileri butonları görsel olarak bir sonraki adıma götürsün (mock), kullanıcı tüm akışı tıklayarak yürüyebilsin. Gerçek backend yok — saf görsel yürüyüş.
- **DOKUNMA:** `assets/js/sa-ui.js`, `assets/css/sa-*.css`, sa-shell. Audit kararları: hesabim İşletmem KALDIRILACAK · kayıt "İşletme olarak kaydol"dan başlar · owner ince önizleme bandı.

## ⏭️ DİĞER ADAYLAR (public revize turu öncesinden)
- **(a) Sağlık alt-ekranları köprüsü = AYRI TUR, SEMANTİK KARAR GEREKİR.** `sa-saglik-randevular` (5 satır) · `sa-saglik-receteler` (5) · `sa-saglik-testler` (5) **hiç köprülü değil (detay dahil)**. Eklemek = yeni yüzey: hem detay hero hem liste butonu + "randevu/reçete/test diyetisyen paneline mi açılır, hangi sekmeye" eşleştirmesi. **Yasin Bey'e sorulabilir.** (Operatör-modülü diğer tüm çok-satırlı listeler köprülü; bunlar bilinçli kapsam-dışı bırakıldı.)
- **(b) Opsiyonel minör (acele yok):** `sa-saglik` @390 3px sub-pixel · `sa-store-urunler-detay` @390 12px (detay, fix kapsamı dışıydı).
- **(c) DadaFit/public faz işleri:** `tasks/public-faz-bekleyen.md` (DadaFit nav temizliği) · `tasks/spec-impact-public-revize.md` (koordinat/güzergah/şehir-öneri).

## DEĞİŞMEZ KURALLAR (gözetim paneli)
- **Kanonik kabuk tek kaynak:** `assets/css/sa-shell.css` + `assets/js/sa-shell.js` (SECTIONS config) + `assets/css/sa-ui.css` + `assets/js/sa-ui.js` (saConfirm/saToast/dropdown). **DOKUNMA** — sadece `<link>`/`<script>` ile yükle; sa-ui shell.js tarafından auto-inject.
- **Aksan otomatik:** `body[data-sec]` → `var(--acc)` çözer (admin/store domates `#E14827` · saglik nane `#3BB77E` · dadafit yeşil `#009d4f` · isletme petrol `#006072`). **Renk literali yazma**, token kullan. **Mint kaçağı** = ham `rgba(59,183,126)`/`#3BB77E`/`#6cca98`; `var(--green-deep/tint)` KANONİK (`.pstat.ok` da kullanır, kaçak değil).
- **Gözetim deseni:** liste "Yeni" yok, detay "Düzenle" yok (oku+denetim) — config/CRUD modüllerinde flagship form VAR (kullanicilar/urunler pattern). Yıkıcı aksiyon → saConfirm. Her listede boş durum + filtre + arama.
- **Chip standardı:** filtre `.chip` = `var(--radius-sm)` 8px · padding 7px 14px · base font-weight 500 / aktif 700. İçerik etiketleri (`.spec-tag/.cat-tag/.type-tag/...`) 6px AYRI tip (dokunma). `.lvl` 999px pill (kasıtlı).
- **Görsel:** kare/oranlı görsel `<img>` DEĞİL → `div + background-image + cover + center` (Kerem Bey). Full-file overwrite YASAK, targeted edit. **UTF-8:** perl ile düzenlerken `-CSD` KULLANMA (mojibake yapar) → byte-mode + her dosyada `grep`/`git diff` flush teyidi (idle'a güvenme).

## REFERANS
- Envanter/plan: `tasks/faz2-envanter.md` · `tasks/sa-entegrasyon-plan.md` · `tasks/sa-envanter-tarama.md` · `tasks/spec-impact-public-revize.md`
- Flagship referans (OKU, DOKUNMA): `v6/sa-admin-kullanicilar.html` (Admin CRUD) · `v6/sa-store-urunler.html` (Store CRUD) · `v6/sa-saglik-randevular*` (gözetim disiplini).
- Local server: `python3 -m http.server 8765` proje kökünden → `http://localhost:8765/v6/...`. QA: `node tasks/*-qa.mjs` (Playwright, kökte `node_modules/playwright`).

## DİĞER BEKLEYENLER (public/Laravel fazı — mockup'a girmez)
- `tasks/public-faz-bekleyen.md`: DadaFit nav temizliği. · `tasks/spec-impact-public-revize.md`: koordinat/güzergah/şehir-öneri.
- Paralel (Claude.ai): TG Germany admin login ↔ sa-giris hizalaması · ₺49 tier-1 fiyat (Yasin Bey).
