# Tarif Ekle (F5) — Rapor

**Dosya:** `mockups/tarif-ekle-v1.html` · **Durum: TAMAM**
Konsol: 4 adımda da 0 hata · 390'da gerçek yatay taşma YOK (iframe ölçümü: DOCW 375 = viewport; tek "offender" off-canvas drawer — chrome katmanı, onaylı sayfalarda da aynı).

## 1. L1 Kıyas Tablosu (eski tarif-ekle/duzenle/onay → yeni)

| Eski blok (tarif-ekle.html) | Yeni karşılığı | Not / gerekçe |
|---|---|---|
| Hero video banner + breadcrumb (Hesabım › Tarif Ekle) | `.rd-crumb` breadcrumb + eyebrow'lu başlık bandı (`.fp-head`) + "Taslaklarım (3)" linki | Hero video elendi — T1 dalgada hero'lu sayfa yok, katı header |
| `progressbar-x` 4 adım (ikon + etiket, üçgen ok bar, tıklanamaz) | `.stepper` — numara + etiket + alt açıklama; tamamlanan ✓ (tint), aktif domates dolu; **geriye tıklanır, ileri atlanmaz**; mobilde yalnız numara + aktif etiket | Adım adları korundu: Bilgi / Görseller / Künye & Malzemeler / Adımlar |
| Adım 1: "Tarif Başlığı" input | `.fk-input` Tarif Adı + 80 karakter sayacı (`.fk-count`) + hata satırı (`.fk-error`) | Doğrulama görsel dili burada gösteriliyor (`?err=1`) |
| Adım 1: "Tarif Açıklaması" textarea | `.fk-textarea` "Açıklama / Hikâye" + öneri satırı (`.fk-help`) | |
| Adım 1: kategori alanı **YOKTU** | Kategori `.fk-select` (mega menü taksonomisi: 12 kategori) | **Bilinçli ekleme** — eski form tarifin kategorisini hiç sormuyordu |
| Sağ sidebar: "Önemli: *" kutusu + "Tarif İçeriği" uyarısı + İpuçları **carousel'i** (prev/next + sayaç) | `.tips-col` sticky: `.tips-card` 5 maddelik statik öneri listesi + `.remind-box` (TD verbatim) "Tarif sana ait olmalı / KURAL" | Carousel elendi — tek bakışta okunabilirlik; orijinallik kuralı metni korundu |
| Adım 2: TEK görsel upload (`custom-file-upload`), "300 x 300" boyut notu, preview + sil | `.up-zone` dashed drop-zone + `.up-grid` çoklu galeri (8'e kadar), **kapak yıldızı** (`.is-cover` + `.ui-star`), sil, `.up-add` tile, sayaç "4/8 görsel" | 300×300 piksel dayatması elendi → "en az 1200px" önerisi; çoklu galeri TD `.rd-thumbs` ile uyum |
| Adım 2: video alanı **YOKTU** | Opsiyonel Video URL `.fk-input` (YouTube/Vimeo) | **Bilinçli ekleme** — TD video modu besleniyor |
| Adım 3: "Kaç Kişilik" (number) | Porsiyon `.fk-suffix` (kişilik) | TD künye `Porsiyon` adıyla eşitlendi |
| Adım 3: süre ayrımı YOKTU; "Pişirme Derecesi" adlı number alan süre/derece karmaşasındaydı | Hazırlık Süresi (dk) + Pişirme Süresi (dk) ayrı; Pişirme Derecesi (°C, **opsiyonel**) ayrı alan | TD künye "Hazırlık + Pişirme" ve "Pişirme Derecesi 180°C" alanlarıyla bire bir |
| Adım 3: Zorluk select (Orta/Kolay/Zor/Çok Zor) | Zorluk `.fk-select` (Kolay/Orta/Zor/Çok Zor — sıralı) | Korundu |
| Mutfak alanı **YOKTU** | Mutfak `.fk-select` (Türk, İtalyan, ... Dünya) | **Bilinçli ekleme** — TD `.chip.cuisine` künyesi besleniyor |
| Adım 3 malzeme satırı: Miktar (number) + Ölçü Birimi (select2, dummy A–E) + Malzeme (select2, bozuk "20 Dk" listesi) + Grup (select2 multiple tags) + sil; "Yeni Malzeme Listesi" | `.ie-row`: tutamaç + Miktar (text — "3,5" gibi kesir yazılabilir) + Birim select (15 gerçek TR ölçüsü) + Malzeme adı (serbest metin) + sil; `.ie-group` grup başlığı satırı (Hamur / İç Harç — TD `.ing-group` kavramı); **"Satır Ekle" + "Grup Ekle"** | jQuery/select2 bağımlılığı elendi; grup "her satırda multiple-select etiketi" yerine listede görsel başlık satırı oldu (TD sunumuyla aynı zihinsel model) |
| Adım 4 adım kartı: numara + görsel (en fazla 3) + süre (number) + textarea + sil | `.st-card`: numara rozeti + textarea + adım görseli (1 adet, `.st-shot`/`.st-up`) + süre dk (`.fk-suffix`) + sil + sürükle tutamacı; "Adım Ekle"; silince otomatik yeniden numaralanır | Adım başına 3 görsel → 1 görsel (sadelik — açık soru #2) |
| Adım 4: "Editör Onayı" kutusu + "Onaya Gönder" → ayrı `tarif-onay.html` sayfası (yeşil check) | `.send-panel`: önizleme linki + **Taslak Kaydet (ghost)** + **Onaya Gönder (primary)**; gönderince aynı sayfada ONAYDA bandı (`.sbanner.review`) | Ayrı onay sayfası elendi — durum bandı aynı sayfada; "Taslaklarımı Görüntüle" işlevi üst bantta "Taslaklarım (3)" |
| Taslak kaydetme butonu **YOKTU** (yalnız Hesabım > Taslaklar'dan bahis) | Taslak Kaydet + her adımda "Taslağa otomatik kaydedildi · saat" notu (`.wf-note`) | **Bilinçli ekleme** |
| `tarif-duzenle.html` = tarif-ekle'nin birebir kopyası (yalnız başlık farklı) | Tek sayfa + `?state=draft\|review\|rejected` durum bantları | Düzenle ayrı template gerektirmiyor |
| RET/iade akışı **hiç yoktu** | `.sbanner.rejected`: ret gerekçesi alıntısı (`.sb-quote`, editör imzalı) + "Düzenle ve Tekrar Gönder" (ilgili adıma atlar) | **Bilinçli ekleme** — editör onay zincirinin görünür ucu |
| Sidebar'daki "* yıldızlı alanlar zorunlu" kutusu | `.fk-label` içinde alan bazında `.req` yıldız + `.opt` "(opsiyonel)" etiketi | Global kutu yerine alan-seviyesi işaret |

## 2. FORM KİTİ envanteri (sonraki sayfalar — auth, hesabım, diyetisyen — bunu miras alır)

**Çekirdek alan kiti (`.fk-*`)** — köken: shell `.fb-field/.fb-select`
- `.fk-field` alan sarmalı (+ `.has-error` durumu) · `.fk-label` (içinde `.req` zorunlu yıldızı, `.opt` opsiyonel etiketi, `.fk-count` sağa yaslı sayaç)
- `.fk-input` / `.fk-select` (fb-select'in svg ok'u verbatim) / `.fk-textarea` — gri zemin (`--bg`), focus'ta domates kenarlık + 3px domates-tint glow
- `.fk-help` ipucu satırı (domates ikon + muted metin) · `.fk-error` hata satırı (yalnız `.has-error`'da görünür)
- `.fk-grid.c2/.c3` çok kolonlu alan dizilimi (≤640'ta 2 kolona düşer) · `.fk-suffix` sonek birimli input (dk / °C / kişilik)

**Yükleme kiti (`.up-*`)** — köken: TD `.mw-up` dashed dili
- `.up-zone` büyük dashed drop-zone (domates-tint) · `.up-grid` 5'li önizleme grid'i (mobil 3)
- `.up-item` kare önizleme (div+bg-image; `.is-cover` domates çerçeve + `.ui-cover` "Kapak" rozeti; `.ui-btns` hover aksiyonları: `.ui-star` kapak yap, `.ui-del` sil) · `.up-add` dashed ekleme tile'ı

**Dinamik satır kiti (`.ie-*`)** — köken: TD `.ing-group` kavramı
- `.ie-list` · `.ie-row` (grid-area'lı: `.ie-drag` tutamaç, `.ie-amt`, `.ie-unit`, `.ie-name`, `.ie-del`; ≤640'ta iki kata kırılır) · `.ie-group` grup başlığı satırı (uppercase input + hairline + `.ie-gdel`)
- `.add-row` dashed ekleme butonu (shell `.fb-shot` dili; `.alt` kompakt varyant)

**Adım kartı kiti (`.st-*`)**
- `.st-list` · `.st-card` (`.st-num` domates numara rozeti, `.st-body`, `.st-meta`, `.st-shot` görsel önizleme / `.st-up` dashed ekleme, `.st-time` süre, `.st-side` tutamaç+sil)

**Sihirbaz iskeleti**
- `.stepper` + `.stp` (`.stp-num`, `.stp-lbl`; `.active`/`.done` durumları) + `.stp-line` bağlayıcı
- `.wstep` adım paneli · `.wiz-grid` (form + 340px sticky sidebar) · `.wiz-solo` (980px tek kolon) · `.form-card` + `.fc-head`/`.fc-step` · `.wiz-foot` (`.wf-note` otosave notu + `.wf-actions`) · `.send-panel` gönderim bölgesi
- `.sbanner` durum bandı (`.draft`/`.review`/`.rejected`; `.sb-ico .sb-tag .sb-quote`)
- `.tips-col` sticky sidebar (`.tips-card .tips-head .tips-list .tip`) + TD `.remind-box` verbatim

**SS/test paramları:** `?step=1..4` · `?state=draft|review|rejected` · `?err=1` (boş tarif adı hata durumu)

## 3. Bilinçli kararlar

1. **Kategori, Mutfak, Hazırlık/Pişirme süresi ayrımı, video URL, taslak kaydet, ret akışı** eski formda yoktu — TD künyesi ve editör zinciriyle tutarlılık için eklendi (tabloda işaretli).
2. **Miktar alanı number → text:** "3,5", "1/2" gibi mutfak kesirleri yazılabilsin.
3. **Malzeme adı serbest metin** (eski bozuk select2 yerine) — prod'da autocomplete'e dönüşebilir (açık soru).
4. **İpuçları carousel → statik liste:** 5 madde tek bakışta; eski prev/next+sayaç etkileşimi gereksiz sürtünmeydi.
5. **Onay sayfası → durum bandı:** `tarif-onay.html`'in tek işi yeşil check + link idi; bant aynı bilgiyi bağlamında veriyor, "Onaya Gönder" mock'u bunu canlı gösteriyor.
6. **İpuçları sidebar'ı yalnız Adım 1'de** (spec gereği); 2–4 adımlar 980px odaklı tek kolon (`.wiz-solo`) — form okunabilirliği.
7. Sürükleme **görsel tutamaç** düzeyinde (`.ie-drag` grip ikonu) — gerçek drag mockup kapsamı dışı (spec onayı).
8. Pişirme modu bu sayfada YOK (spec gereği).

## 4. Açık sorular (5)

1. Malzeme adı prod'da serbest metin mi kalsın, tanımlı malzeme havuzundan autocomplete mi (eski site select2+tags kullanıyordu — DB ilişkisi için önemli)?
2. Adım görseli adım başına 1 mi (yeni) yoksa eski gibi 3'e kadar mı?
3. Kategori tekli seçim mi kalsın, çoklu (örn. "Ana Yemek + Hamur İşi") mi?
4. ONAYDA (`review`) durumunda form alanları gerçekten kilitlensin mi? Şu an yalnız bantta "inceleme sürerken tarif düzenlenemez" notu var.
5. "Taslaklarım (3)" hedef sayfası Hesabım altında mı yaşayacak — hesabım teammate'ine bağlanacak link.

## 5. SS yolları (mockups/.ss-scratch/)

| Görünüm | 1440 | 390 |
|---|---|---|
| Adım 1 — Bilgi | `form-adim1-1440.png` | `form-adim1-390.png` |
| Adım 2 — Görseller | `form-adim2-1440.png` | `form-adim2-390.png` |
| Adım 3 — Künye+Malzeme (üst) | `form-adim3-1440.png` | `form-adim3-390.png` |
| Adım 3 — tam sayfa | `form-adim3-full-1440.png` | — |
| Adım 4 — Adımlar (üst) | `form-adim4-1440.png` | `form-adim4-390.png` |
| Adım 4 — tam (send-panel dahil) | `form-adim4-full-1440.png` | — |
| Doğrulama hatası (`?err=1`) | `form-hata-1440.png` | — |
| Durum: TASLAK | `form-state-draft-1440.png` | — |
| Durum: ONAYDA | `form-state-review-1440.png` | — |
| Durum: REDDEDİLDİ | `form-state-rejected-1440.png` | `form-state-rejected-390.png` |

**Bilinen artifact (kılavuz §4):** 390 headless SS'lerde layout viewport olduğundan geniş render olur (metinler görüntünün sağ kenarında kesik görünür) ve header aksiyon ikonları paint olmayabilir — onaylı `tarif-detay-v1` aynı komutla aynı görüntüyü veriyor; gerçek tarayıcıda sorun yok. Gerçek taşma iframe ölçümüyle doğrulandı: `mockups/.ss-scratch/check390.html` → 4 adımda da DOCW=375 (taşma sıfır).

## EK — Beyar SS Turu Kararları (2026-06-11)

- ✅ BEĞENİLDİ. **Eklendi:** ① malzeme adı autocomplete — 15'lik mock havuz + serbest metin karma; eşleşme yoksa "“X” — yeni malzeme öner" satırı (`.ie-sugg` fixed popover, dinamik satırlarda da çalışır). ② Adım görseli MAX 3 slot (`.st-figs` + sayaçlı "Görsel ekle n/3"; eski site + tarif detay paritesi).
- Kategori ÇOKLU seçim (max 2) — KARAR; mockup'ta hâlâ tekli select, stack/sonraki turda çoklu UI.
- ONAYDA durumunda form KİLİTLİ — KARAR; mockup'ta bant notu var, kilit davranışı stack işi.
- Taslaklarım hedefi → Hesabım'a stack fazında bağlanır.
