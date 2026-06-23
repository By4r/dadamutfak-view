# Taksonomi Şema Analizi — Gerçek Kategori Anatomisi

> READ-ONLY (kod yok, commit yok). Tarih: 2026-06-23. Kapsam: public tarif/kategori + admin
> tarifler/sozluk/icerik/kullanicilar + mevcut store kategori CRUD. İki paralel Explore + lead synthesis.
> Amaç: mevcut `sa-admin-taksonomi.html` modal şemasının (Ad+Slug+İkon) gerçeğe uygunluğunu doğrulamak.

---

## 1. Tarif Kategorisi — Gerçek Alan Listesi (public kanıtlı)

Tarif kategorisi public'te **"ad-only" DEĞİL** — fotoğraf/ikon/açıklama/hiyerarşi/SEO taşıyan zengin varlık.
Mevcut tek kategori CRUD'u olan `sa-store-kategoriler-form.html` (ürün kategorisi) en yakın şema referansı.

| Alan | Zorunlu? | Public/kaynak kanıtı |
|---|---|---|
| **Ad** | Zorunlu | mega `tarif-liste-v1.html:1229` · kart `anasayfa-portal-v3a.html:1918` · hero h1 `kategori-v1.html:1442` |
| **Slug** | Zorunlu | `data-slug="/corba-tarifleri"` `tarif-liste-v1.html:1229` · store form `sa-store-kategoriler-form.html:145-147` |
| **Görsel / Kapak** | Opsiyonel (public'te yaygın) | kart bg-image `anasayfa-portal-v3a.html:1918` (`.cat-thumb` cover) · hero banner `kategori-v1.html:748-749` · facet thumb `tarif-liste-v1.html:1642` · alt-kat görsel `kategori-v1.html:1469`. ⚠️ **store formunda görsel alanı YOK** (sadece ikon) → şema boşluğu |
| **İkon** | Opsiyonel | mega FA ikon `tarif-liste-v1.html:1229` · admin `.cat-tag` ikon `sa-admin-tarifler.html:213` · store ikon-picker `sa-store-kategoriler-form.html:167-180` |
| **Renk** | ❌ YOK | Hiçbir kaynakta kategoriye özel renk-token yok; vurgu global `--tomato`. Renk eklemek **yeni karar** + marka kuralına (ham renk yasak) takılır → ÖNERİLMEZ |
| **Açıklama** | Opsiyonel | hero `.lead` `kategori-v1.html:1443` · store "vitrinde görünebilir" `sa-store-kategoriler-form.html:159-162` |
| **Üst-kategori (hiyerarşi)** | Opsiyonel | breadcrumb `kategori-v1.html:1432-1438` · alt-kat rayı `:1469-1477` · store Üst Kategori select `sa-store-kategoriler-form.html:149-157` · liste ağacı `sa-store-kategoriler.html:180-200` |
| **SEO (meta başlık/açıklama)** | Opsiyonel | link `title=` `tarif-liste-v1.html:1229` · sayfa title `kategori-v1.html:6` · store Meta alanları `sa-store-kategoriler-form.html:186-193` |
| **Sıra** | Opsiyonel | store Sıralama number `sa-store-kategoriler-form.html:239-243` (public'te örtük DOM sırası) |
| **Durum (Aktif/Pasif)** | Zorunlu (admin) | store Durum select `sa-store-kategoriler-form.html:216-222` |
| **Görünürlük (menüde/vitrinde)** | Opsiyonel | store toggle'lar `sa-store-kategoriler-form.html:223-238` |
| **Tarif sayacı** | Türetilmiş | `<small>1.240 tarif</small>` her gösterimde (mega/kart/facet/hero stat) |

**Store form tam alan referansı (11 alan):** Ad · Slug · Üst Kategori · Açıklama · İkon(picker) · Meta Başlık · Meta Açıklama · Durum · Menüde Göster(toggle) · Vitrinde Öne Çıkar(toggle) · Sıralama. **Görsel/kapak alanı YOK** — store ikon'la, public tarif kategorisi fotoğrafla temsil ediliyor.

---

## 2. Grup-Bazlı Şema Tablosu (5 grup)

Mevcut modal (`sa-admin-taksonomi.html:217-231`) = **Ad + Slug + İkon**. 3 grup buna sığıyor; **2 grup davranış/yetki taşıdığı için SIĞMIYOR.**

| Grup | Ad/Slug/İkon | Grup-özel ek alan | Mevcut modal yeter mi? | Kanıt |
|---|---|---|---|---|
| **Tarif Kategorileri** | ✔ | (zengin: +görsel +açıklama +üst-kat +SEO +sıra +durum) | Kısmen — bkz. §3 karar | `kategori-v1` + `sa-store-kategoriler-form` |
| **Sözlük Kategorileri** | ✔ | — (görsel/açıklama YOK) | **Evet** | `sozluk-v1.html:1325-1330` salt filtre chip |
| **Ansiklopedi Kategorileri** | ✔ | — | **Evet** | `sa-admin-icerik-form.html:420-439` salt select |
| **İçerik Tipleri** | ✔ | **URL ön-eki + tip→künye-grubu + gövde-tipi** | **HAYIR** | `icerik-form.html:785-791` (TIP_PRE) · `:217` `:608` `:868-885` (data-tip-group/body) |
| **Kullanıcı Rolleri** | ✔ | **Erişim bölümleri (panel listesi)** | **HAYIR** | `kullanicilar-detay.html:204-216` "Erişim Bölümleri" · `kullanicilar-form.html:167` |

**Kavramsal not:** "İçerik Tipi" ve "Rol" aslında *kategori* değil — biri form-davranışı (hangi künye grubu açılır), diğeri erişim-yetkisi taşıyan kavramlar. Salt ad/slug/ikon ile temsil edilemezler.

**KARAR — tek modal + grup-koşullu blok (schema-driven), ayrı dosya AÇMA:**
3 grup zaten çalışıyor; sadece 2 grup için modalda koşullu ek blok gerekir. `openModal()` (`sa-admin-taksonomi.html:432-446`) zaten grup-bilinçli (`DATA[sel]`) → grup id'ye göre ek blok render etmek minimal genişleme. Ayrı `-form` dosyaları taksonomi ekranının "tek yüz/küçük şema" felsefesine (`:22-23`) aykırı.
- İçerik Tipleri ek: **URL ön-eki**(text) + **Künye grubu**(none/ders/madde+besin/sofra select) + **Gövde tipi**(serbest-blok/yapısal).
- Kullanıcı Rolleri ek: **Erişim bölümleri** çoklu-seçim (Admin/Sağlık/Store/DadaFit/İşletme/Akademi — `kullanicilar-detay.html:210-215` rozet kümesiyle aynı).

---

## 3. Mevcut `sa-admin-taksonomi.html` — Nerede Eksik/Yanlış (fark listesi)

| # | Sorun | Kanıt | Önem |
|---|---|---|---|
| 1 | **Tarif kategori değerleri PLACEHOLDER** — 8 uydurma (Ana Yemek/Çorba/Kahvaltı/Tatlı/Hamur İşi/Makarna/Pasta&Kek/İçecek) | Public mega = **15** (Çorba/Kırmızı Et/Beyaz Et/Tatlı/Hamur İşi/Kek/Salata/Kahvaltılık/Zeytinyağlı/İçecek/Vegan/Makarna/Pilav/Meze&Aperatif) · facet = **27** (`tarif-liste-v1.html:1612,1642-1668`). "Ana Yemek" public'te yok (parçalanmış); "Kahvaltı"→"Kahvaltılık"; "Pasta&Kek"→sadece "Kek" | 🔴 Yüksek |
| 2 | **İçerik Tipi modalı davranış alanlarını sunmuyor** — DATA notu "tip künye gruplarını belirler" (`:272-273`) diyor ama modal sadece ad/slug/ikon | `icerik-form.html` tip→künye eşlemesi gerçek | 🟠 Orta |
| 3 | **Rol modalı erişim alanlarını sunmuyor** — DATA notu "hangi panele erişilir" (`:303-304`) diyor ama modal erişim çoklu-seçimi içermiyor | `kullanicilar-detay.html:204-216` | 🟠 Orta |
| 4 | **Tarif kategorisi zengin alanları yok** (görsel/açıklama/üst-kat/SEO) — public'te bunlar var, modal sadece ad/slug/ikon | §1 | 🟡 Karar gerek (§5-A) |
| 5 | Ansiklopedi DATA listesi (`:283-302`) form select'iyle (`icerik-form.html:420-439`) tam örtüşmüyor | — | 🟢 Düşük (veri hizalama) |

> Doğru olan: grup mimarisi (5 grup, iki-pane), sözlük & ansiklopedi şeması, slug TR-auto, CRUD/saConfirm akışı. Sorun **veri doğruluğu + 2 grubun davranış şeması + tarif zenginliği kararı**.

---

## 4. Liste → Taksonomi Köprüsü ("Kategorileri Yönet")

Kanonik desen: `ph-actions` içindeki `btn btn-ghost btn-sm` ikincil-aksiyon (her listede "Dışa Aktar" bu desende).

| Sayfa | Konum (dosya:satır) | Desen | Label |
|---|---|---|---|
| `sa-admin-tarifler.html` | `ph-actions` ~`:162` (Dışa Aktar yanı) | `btn btn-ghost btn-sm` + `fa-tags` | "Kategorileri Yönet" |
| `sa-admin-icerik.html` | `ph-actions` ~`:142` (Dışa Aktar yanı) | `btn btn-ghost btn-sm` + `fa-tags` | "Tipleri Yönet" (filtre=tip) |
| `sa-admin-sozluk.html` | tercih `.fb-cats` sonu `:169` (chip yanı) · alt: `ph-actions` `:146` | `.chip`+`fa-gear` veya `btn-ghost btn-sm` | "Kategorileri Yönet" |

⚠️ **Sözlük tek dikkat noktası:** kategori toggle JS'i `#catChips .chip` selektörüyle çalışıyor (`sa-admin-sozluk.html:403`) → "Yönet" linki **`#catChips` dışına** (`.fb-cats` içinde, `.chips` container'ı dışına) konmalı, yoksa filtre döngüsüne girer.
**Homojenlik istenirse:** 3 sayfada da `ph-actions` + `btn-ghost btn-sm` + `fa-tags` (JS çakışması sıfır). Köprü hedefi `sa-admin-taksonomi.html` mevcut → dead-link riski yok.

---

## ✅ UYGULANDI (Beyar onayı 2026-06-23: A3 + Tip/Rol schema-driven + 3 köprü)
- **Tarif kategori değerleri gerçek public 14 ile düzeltildi** (Çorba…Meze & Aperatif; gerçek slug + ikon + tarif sayacı, `tarif-liste-v1.html:1229-1242` kaynağından). 8 placeholder kaldırıldı.
- **İçerik Tipi modalı schema-driven genişledi:** URL ön-eki + Künye grubu (yok/ders/madde+besin/sofra) + Gövde tipi (serbest/yapısal). Satırda davranış özeti gösteriliyor.
- **Rol modalı schema-driven genişledi:** Erişim bölümleri çoklu-seçim (Admin/Sağlık/Store/DadaFit/İşletme/Akademi). Satırda erişim özeti.
- **Tek modal + grup-koşullu blok** (renderExtra/gatherExtra); grup-bilinçli başlık/etiket/sil mesajı (Kategori/İçerik Tipi/Rol).
- **3 liste köprüsü:** tarifler "Kategorileri Yönet" · icerik "Tipleri Yönet" · sozluk "Kategorileri Yönet" → ph-actions `btn-ghost btn-sm + fa-tags`. Sözlük linki `#catChips` dışında (filtre döngüsü güvenli).
- **QA `tasks/taksonomi-qa.mjs` ALL PASS:** 14 tarif/gerçek slug · icerik davranış satırı · rol erişim satırı · modal grup-özel alanlar (6 erişim checkbox, prefix/künye/gövde) · edit→satır yansıması · tarif 0 extra · köprü 200×3 + sözlük selektör güvenli · 1440/390 render · console/mojibake 0.
- **Ek tur (Beyar):** **Tarif grubuna kapak görseli alanı eklendi** (schema-driven, grup-koşullu — yalnız tarif). Modal: div+bg cover önizleme + boş placeholder (ortalı) + "Görsel Yükle" (FileReader mock, persist etmez) + "Kaldır"; ikon seçici korundu (foto+ikon birlikte). Satır chip'i görselli kategorilerde kapak thumbnail, görselsizlerde ikon. 10 kategori public foto ile seed (anasayfa `cat-thumb` ile aynı), 4'ü boş (placeholder demosu). QA: tarif-only alan + 4 grupta yok + placeholder ortalı + 390 + console/mojibake 0.
- **Hâlâ ertelendi:** tarif kategorisi diğer zengin alanları (açıklama/üst-kat/SEO — A1/A2 tam entity) · ansiklopedi DATA↔form select hizalama.

## 5. Düzeltme Planı + Efor (referans — uygulandı)

### KARAR GEREKEN (§5-A) — Tarif kategorisi mimarisi
Tarif kategorisi zengin (görsel/hiyerarşi/SEO) → 3 seçenek:
- **(A1) Modal-zengin:** tarif grubu seçiliyken modala görsel+açıklama+üst-kat+SEO+sıra blokları. Tek ekran korunur ama modal büyür. **Orta-yüksek efor.**
- **(A2) Ayrı CRUD sayfası:** `sa-admin-tarif-kategoriler.html` (store kategoriler kardeşi, +görsel alanı) — tarif kategorisi store gibi tam entity; taksonomi ekranı sadece hafif grupları (sözlük/ansiklopedi/tip/rol) tutar. Tarif kategorisi taksonomiden çıkar. **Yüksek efor, en doğru mimari.**
- **(A3) Hafif bırak (ÖNERİLEN ilk tur):** taksonomi'de tarif kategorisi ad/slug/ikon düzeyinde kalsın (hızlı yönetim/sıralama görünümü); zengin alanlar (görsel/SEO) bir sonraki tura ertelensin — sadece **placeholder değerleri gerçek public kategorilerle düzelt**. **Düşük efor**, sistemik mesaj korunur.

### Sıra (A3 + zorunlu düzeltmeler varsayımıyla)
| # | İş | Efor |
|---|---|---|
| 1 | **Tarif kategori değerlerini gerçek public taksonomiyle düzelt** (15 mega / opsiyonel 27 facet) + ikon/slug eşle | düşük |
| 2 | **İçerik Tipi modalına davranış alanları** (URL ön-eki + künye grubu + gövde tipi), grup-koşullu blok | orta |
| 3 | **Rol modalına erişim bölümleri** çoklu-seçim, grup-koşullu blok | orta |
| 4 | **3 liste köprüsü** (tarifler/icerik/sozluk ph-actions + sözlük selektör dikkatiyle) | düşük |
| 5 | Ansiklopedi DATA↔form select hizalama | düşük |
| 6 | (A1 seçilirse) tarif grubu zengin alanlar · (A2 seçilirse) ayrı CRUD sayfası | orta-yüksek |
| 7 | QA: schema-driven modal her grupta + köprü 200 + 1440/390 render + console/mojibake | düşük |

**Toplam (A3 yolu):** orta — modal'ı schema-driven yapıp 2 grup-özel blok + veri düzeltme + 3 köprü. Kanonik kabuk dokunuşu sadece 3 liste sayfasına +1 link (izole, mevcut desen).
