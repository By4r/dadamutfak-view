# CİLA-2 Faz 5 — defter-menu raporu (task #6)

> Sahip: defter-menu teammate · Tarih: 2026-06-13
> Kapsam: mutfak-defteri menü düzenleme + alışveriş listesi akışı (tarif-detay köprüsü + çıktı/paylaş) + _shell dropdown linki.

## Özet

Beğenilen mevcut defter + alisveris dili **korunarak** iki eksik akış tamamlandı:
1. **Menü düzenleme** — defter `?tab=menuler`'de kullanıcı kendi menüsünün içine girip düzenleyebiliyor (BNP koleksiyon mantığı mirası).
2. **Alışveriş listesi akışı** — tarif-detay'dan **gerçek malzeme transferi** + çıktı (Yazdır/PDF) + paylaşım + dropdown erişimi.

Doğrulama: izole Playwright (sistem Chrome) probe **37/37 ✅, 0 ❌**, konsol/page hatası yok, 390 taşma 3 sayfada 0.

---

## 1) MENÜ DÜZENLEME (mutfak-defteri-v1.html ?tab=menuler)

Mevcut defter kurgusu BOZULMADAN "içine gir + düzenle" katmanı eklendi. Kaynak: `bugun-ne-pisirsem-v1` koleksiyon mantığı (COURSEDEF/POOL/picker **birebir miras**); defter bağlamına oturtuldu.

- **Kart → detay:** her menü kartına (`data-menu="mac|bayram|haftaici"`) tıkla/Enter → menü düzenleme görünümü (`menu-grid` gizlenir, `menu-detail` açılır). Kartlara hover'da "Aç & Düzenle →" ipucu (`.menu-go`).
- **Düzenleme aksiyonları (BNP mirası):**
  - **Değiştir** → o kabın türüne scope'lu tarif havuzu (`rp-*` modal) açılır, seçilen tarifle slot değişir.
  - **Çıkar** → kabı menüden çıkarır (min 1 kap guard'ı).
  - **Kap Ekle** → dashed tile + kap-tipi chip'leri → havuzdan tarif seç (çoklu ekleme; havuz açık kalır).
  - **Adını Değiştir** → `contenteditable` başlık (dashed alt çizgi).
  - **Görseli Değiştir** → kapak görseli üstünde preset thumb picker popover (6 görsel).
- **Özet barı** (`menu-bar`): kap sayısı + toplam süre + malzeme sayısı; canlı güncellenir.
- **Derin link:** `?menu=mac|bayram|haftaici` (direkt detay açar) · `?havuz=1` (picker açık).
- **Salt-okunur (public):** `?view=public` → düzenleme aksiyonları (Adını Değiştir / Kap Ekle / Değiştir-Çıkar / Görseli Değiştir) gizli; menü yalnız görüntülenir. uyelik-sosyal'ın takip-gizlilik geçidiyle (`.pf-fgate`) uyumlu — detay `.pf-full` içinde, public+takip yok = görünmez (doğru).
- **Çakışma yönetimi:** menüler sekmesi aynı anda uyelik-sosyal teammate'i tarafından (takip geçidi) düzenleniyordu → lead'e bildirildi, sıralandı, detay katmanı geçidin altına entegre edildi (çakışma 0).

CSS scope notu: BNP kurs kartı `.menu-card` ile defter'in koleksiyon kartı `.menu-card` çakışmasın diye kurs kartı CSS'i `.menu-set .menu-card` altında scope'landı (padding/cursor override + specificity). Class adları BNP ile birebir korundu.

## 2) ALIŞVERİŞ LİSTESİ AKIŞI

### (a) _shell profil dropdown "Alışveriş Listem" linki
Header STABİL (task #1 completed) sonrası eklendi. **`_shell.html` (kaynak) + 3 sahip sayfam** (mutfak-defteri, alisveris-listesi, tarif-detay) acct-menu'sünde "Menülerim"in altına `fa-basket-shopping` linki. ⚠️ Site-geneli ~66 sayfaya yayılım faz-sonu sweep'e bırakıldı (aşağıda).

### (b) defter/profilde alışveriş listesine erişim
- Menüler sekmesi pane başlığına (`menu-pane-head`) "Alışveriş Listem" `see-all` linki.
- Menü detayında "Alışveriş Listesi" birincil aksiyon butonu.

### (c) tarif-detay → GERÇEK malzeme transferi (mock JS)
tarif-detay'daki R12 "listeye ekle" katmanı artık **gerçekten** malzeme taşıyor:
- `.ing-add` / "Tümünü Listeye Ekle" işaretlenince malzeme **adı + miktarı + tarif adı** `localStorage.dm_shoplist`'e yazılır (`.in` ilk metin düğümü = baz ad, `<small>` not hariç).
- **alisveris-listesi** açılışta bu kuyruğu okur → **reyon-grup sezgisi** ile doğru gruba işler (manav/kasap/süt/bakkal), tekrarı önler, kuyruğu temizler (transfer modeli), `al-toast` ile "N malzeme '<tarif>' tarifinden listene eklendi" + yeni kalem `is-fresh` vurgusu.
- Reyon eşleme: baharat/kiler ÖNCE taranır ("karabiber"/"pul biber" yanlışlıkla manav'a düşmesin), eşleşmezse Bakkaliye default.
- **Uçtan uca kanıt (SS):** tarif-detay addAll → alisveris 14→20 kalem + toast "6 malzeme 'Fırında Tereyağlı Mantı' tarifinden listene eklendi".

### (d) alisveris çıktı + paylaşım (mevcut `.shop-*` dili korunarak)
- **Yazdır / PDF:** `window.print()` + `@media print` CSS — chrome (topbar/header/footer/bottom-nav/çerez/add-bar/özet/paylaş) gizlenir, yalnız reyon-grup liste basılır (print-only başlık + temiz checkbox/qty).
- **Paylaş:** popover → Bağlantıyı Kopyala (clipboard + onay) · WhatsApp'ta Paylaş (`wa.me` href) · PDF olarak kaydet (print) + paylaşım linki gösterimi.
- Manuel kalem ekleme + Sepete Aktar köprüsü (dmCart) zaten vardı, korundu.

## 3) Dil/miras uyumu (lessons "veri/akış = dil korunur")
- Yeni tasarım dili **icat edilmedi**: menü düzenleme = BNP `menu-detail/md-*/menu-bar/menu-set/mc-*/rp-*` mirası; alisveris = mevcut `shop-*` reyon-grup + `al-toast` (md-toast dili) + `fk-*` ekleme barı.
- Token/radius/ikon kanonu korundu (pill yok, FA 6.5.2, flagcdn yok-gerek).
- §3b sabit-alt-katman: alisveris kendi sabit şeridi YOK → bottom-nav korunur (çakışma yok). Menü düzenleme overlay'leri (`rp-modal`) `</main>` sonrasına kondu (lessons: page-main stacking).

## 4) Denetim / Kanıt
- **Playwright probe (izole sistem-Chrome):** 37 ✅ / 0 ❌. tarif-detay yazımı, alisveris consume (4 reyon eşleme + tekrar önleme + kuyruk temizleme + toast), paylaş popover/kopyala/WA, yazdır + print CSSOM, defter menü aç/çıkar/değiştir/havuz/derin-link/kapak, public salt-okunur (4 aksiyon gizli).
- **390 taşma (element-rect + docScroll, scroller-içi çocuklar hariç):** defter menü detay 0 · defter havuz 0 · alisveris 0.
- **Konsol/page hatası:** 0. **node --check** tüm inline script'ler geçer.
- **git diff --numstat:** mutfak-defteri +547/-19 · alisveris +142/-0 · tarif-detay +26/-1 · _shell +1 satır (benim; 50/25 toplam header teammate'iyle ortak).
- **SS:** `outputs/ss-faz5-defter/` (defter-menu-detay, defter-havuz, defter-menuler-liste, alisveris-paylas, tarif-ing-panel, defter-menu-390, alisveris-390).

## 5) Bilinen Sınırlamalar (ZORUNLU)
1. **Dropdown linki site-geneli DEĞİL:** "Alışveriş Listem" şu an yalnız `_shell.html` + 3 sahip sayfamda aktif. Diğer ~66 sayfada dropdown'da GÖRÜNMEZ. **Faz-sonu idempotent sweep gerekiyor** (lessons: ortak chrome tek seferde, lead koordine). Tüm teammate'ler kapandı (#1–5 completed) → sweep artık güvenli; lead onayı bekliyor. Anchor: `?tab=menuler ... Menülerim</span></a>` satırının ALTINA insert.
2. **Menü → Alışveriş Listesi köprüsü = düz navigasyon:** menü detayındaki "Alışveriş Listesi" butonu alisveris-listesi'ne gider ama menünün tariflerinin malzemelerini **aktarmaz** (alisveris mevcut demo reyon listesini gösterir). Tarif-bazlı malzeme aggregation backend işi; mock'ta tarif-detay→liste transferi (2c) gerçek, menü→liste değil.
3. **Sadece `.ing-add` satırları transfer olur:** tarif-detay'da sponsorlu/ikame (`.has-swap`) satırlarında `.ing-add` butonu yok (mevcut yapı) → "Tümünü Ekle" onları atlar. Önceden de böyleydi; değiştirilmedi.
4. **Porsiyon değişimi geç:** tarif-detay'da malzeme listeye eklendikten SONRA porsiyon değiştirilirse `dm_shoplist`'teki miktar güncellenmez (ekleme anındaki değer yazılır).
5. **Reyon eşleme sezgiseldir:** anahtar-kelime tabanlı; nadir/birleşik adlar Bakkaliye'ye düşebilir. 4 örnekte doğrulandı, kapsamlı sözlük backend işi.
6. **Menü düzenleme persist etmez (mock):** Adını/görseli/kapları değiştirme oturum içinde çalışır, kalıcı kayıt yok (BNP ile aynı mock seviyesi). Liste kartları statik kalır.
7. **Doğrulama paylaşılan MCP tarayıcısıyla yapılmadı:** takım MCP Chrome'u kilitliydi; izole sistem-Chrome (Playwright `channel:chrome`) ile koşuldu (disk ENOSPC nedeniyle indirme değil sistem binary). Sonuçlar geçerli; istenirse MCP serbest kalınca tekrar koşulabilir.

## 6) Lead'e öneri
Faz-sonu **dropdown sweep**: "Alışveriş Listem" linkini kalan sayfalara idempotent insert (negatif grep: "Menülerim VAR + Alışveriş Listem YOK"). Shop ailesine (dada-shop/sepet/odeme...) sızıntı grep'i. İstersen ben koşabilirim — onay verir misin?
