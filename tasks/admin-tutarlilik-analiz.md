# Admin Tutarlılık Analizi — Kategori/Taksonomi + Görsel Placeholder

> READ-ONLY tarama (kod yok, commit yok). Tarih: 2026-06-23. Kapsam: `v6/sa-admin-*.html`
> (+ görsel için operatör/public formları). İki paralel Explore ajanı + lead hedefli teyit.
> Kaynak handoff KALAN-1 (taksonomi, sistemik) + KALAN-2 (placeholder merkezleme).

---

## 1. Kategori/Taksonomi Bulgu Tablosu

| Modül | Taksonomi var mı | Vocab konumu (dosya:satır) | Yönetim yüzü | Not |
|---|---|---|---|---|
| **sa-admin-tarifler** (liste) | Sadece DURUM chip | `sa-admin-tarifler.html:177-181` | Yok | Kategori FİLTRESİ yok; ama her satırda `.cat-tag` rozeti hardcoded (`:213,236,260,283,307,331,354,377`) → asimetri |
| **sa-admin-tarifler-form** | Kategori select + beslenme/tip chip | Kategori `<select>` `:298-307` (8 değer); beslenme/tip 14 chip `:465-478`; birim ×4+JS `:362,372,387,573` | Yok | Tümü hardcoded |
| **sa-admin-icerik** (liste) | İçerik TİPİ chip + kategori kolonu | Tip chip `:152-157` (5); `.cat` kolonu serbest metin `:183-404` | Yok | Kategori kolonu kapalı vocab DEĞİL, dağınık |
| **sa-admin-icerik-form** | Çok-katmanlı (tipe göre) | Tip `<select>` `:329-334`; kategori `:340-345`; ansiklopedi kategori `:420-439` (18); sofra türü `:509-517`; ders seviye `:370-373` | Yok | Conditional vocab |
| **sa-admin-sozluk** (liste) | Kategori chip + A-Z | Kategori chip `:163-168` (teknik/hamur/malzeme/arac/dunya); `.tg-cat` rozet `:193+` | Yok | A-Z JS ile üretilir |
| **sa-admin-sozluk-form** | Kategori select + harf | `<select>` `:145-149` (key'ler liste ile AYNI) | Yok | Hardcoded |
| **sa-admin-kullanicilar** (liste) | ROL chip filtresi | `:223-228` (super/saglik/store/dadafit/isletme) | Yok | — |
| **sa-admin-kullanicilar-form** | Rol + durum select | Rol `<select>` `:160-165` (key'ler liste ile AYNI); durum `:171-174` | Yok | Hardcoded |
| **sa-admin-sefler** (liste) | Sadece DURUM chip | `:165-168` | Yok | Uzmanlık filtresi yok |
| **sa-admin-sefler-form** | Ünvan select + uzmanlık serbest etiket | Ünvan `<select>` `:171-175`; uzmanlık free-text chip `:208-213` | Yok | Uzmanlık kapalı vocab değil |
| **sa-admin-slider** (liste) | KONUM chip | `:144-147` | Yok | — |
| **sa-admin-slider-form** | Konum + durum select | Konum `<select>` `:188-191`; durum `:251-253` | Yok | Liste chip ile etiket granülerliği farklı |
| **sa-admin-sayfalar / -form** | Sadece DURUM | liste `:144-146` / form `:190-192` | Yok | Kategori kavramı yok |
| **sa-admin-fiyatlandirma** | — (entity'nin kendisi) | — | **VAR — plan CRUD** | Kart grid + form + sil → referans pattern |
| **sa-admin-kademeler** | — (entity'nin kendisi) | — | **VAR — kademe CRUD** | "Yeni Kademe" `:103` + düzenle/sil `:119-146` → referans pattern |
| **sa-admin-menu** | — (navigasyon ağacı) | tip switch `:148-149` | Öğe CRUD (JS) | Taksonomi değil |
| **sa-admin-ayarlar / -raporlar** | — (tab / tarih) | `:132-135` / `:191-193` | Yok | Taksonomi değil |

**Standalone taksonomi/kategori yönetim sayfası: YOK.** `sa-admin-kategori*` / `-taksonomi*` / `-etiket*` diye dosya yok. Tüm taksonomi vocab'ları HTML'e gömülü, admin'den ekle/çıkar/düzenle EDİLEMİYOR.

### Tutarsızlık / Duplikasyon (senkronizasyon riski)

1. **sozluk — EN NET DUP (yüksek):** aynı 5 kategori birebir iki yerde — liste chip `sa-admin-sozluk.html:163-168` ↔ form select `sa-admin-sozluk-form.html:145-149` (key'ler eşleşiyor). Birine eklenince diğeri elle güncellenmezse kopar.
2. **kullanicilar — rol dup (yüksek):** liste chip `:223-228` ↔ form select `:160-165` (aynı 5 değer).
3. **tarifler — kategori 3 yere dağılmış + asimetrik (orta-yüksek):** form select 8 kategori `:298-307` ↔ liste satır rozetleri bağımsız hardcoded ↔ liste tarafında kategori FİLTRESİ hiç yok (sadece durum). Kullanıcı kategoriye göre süzemiyor ama kategori gösteriliyor.
4. **icerik — tip dup + serbest kategori (orta):** tip liste `:152-157` ↔ form `:329-334` (mirror). Ama liste kategori kolonu serbest metin, form'daki kapalı kategori vocab'ları ile HİZALI DEĞİL.
5. **slider — konum kısmi uyumsuz (düşük):** liste chip etiketleri ↔ form select etiketleri farklı granülerlik, ortak key yok.

---

## 2. Kategori Çözüm Önerisi (a/b/c)

> Mockup gerçekliği: backend YOK. Hiçbir seçenek gerçek senkronizasyonu çözmez (vocab HTML'de
> kalır). Seçeneklerin işi **yönetim arayüzünü görsel olarak göstermek** (spec/akış demosu).

**(a) Her liste sayfasına "Kategorileri Yönet" modal/giriş**
- Artı: bağlamsal (kategori, kullanıldığı modülde yönetilir); küçük JS modal.
- Eksi: 4+ modül = 4+ ayrı modal yüzeyi (sozluk, tarifler, icerik, +rol?); "tüm kategoriler nerede" sorusunu cevaplamaz; dağınık.
- Efor: orta-yüksek (her modüle ayrı modal + mock CRUD).

**(b) Merkezi taksonomi ekranı — `sa-admin-taksonomi.html` (ÖNERİLEN)**
- Tek izole sayfa, modül-gruplu (Tarif Kategorileri · Sözlük Kategorileri · İçerik Tipleri · Ansiklopedi Maddeleri · Kullanıcı Rolleri…), her grup `sa-admin-kademeler` desenli mini-CRUD (kart/satır + Ekle + düzenle/sil + sayaç "N tarifte kullanılıyor").
- Artı: kanonik CRUD pattern hazır (kademeler/fiyatlandirma); tek nav girişi; "tüm taksonomi tek yerde" mesajını net verir; kavramsal tek-kaynak; SECTIONS'a +1 satır (izinli dokunuş).
- Eksi: gruplar büyürse uzun sayfa (tab/akordeon ile çözülür).
- Efor: orta (1 yeni izole sayfa + nav + dizin + mock JS; ~Sözlük modülü büyüklüğü).

**(c) Modül-içi inline yönetim (liste başında editable chip bar)**
- Artı: en hafif algı.
- Eksi: liste ekranının gözetim disiplinini bozar (liste = oku+filtre, CRUD değil); inline edit kanonik desene aykırı; sync sorununu maskeler.
- Efor: orta ama desen-dışı.

**✅ KARAR (Beyar onayı, 2026-06-23): (b) merkezi ekran. Görsel placeholder maddesi KAPATILDI (bozukluk yok).**

**NET ÖNERİ: (b) merkezi `sa-admin-taksonomi` ekranı.** Gerekçe: kanonik kademeler/fiyatlandirma CRUD pattern'ını birebir miras alır (sıfırdan tasarım yok), tek nav girişi + tek izole dosya ile sistemik açığı görsel olarak kapatır, "kategoriler nerede yönetiliyor" sorusuna tek yanıt verir. (a) dağıtır, (c) gözetim disiplinini bozar. Mockup düzeyinde her grup mock-CRUD; "kullanım sayısı" rozeti spec'i zenginleştirir.

---

## 3. Görsel Placeholder Bulgu Listesi

**BOZUK (sol-üste yapışık) bulgu: YOK.** İki bağımsız tarama + lead hedefli teyit: taranan
tüm boş görsel/upload placeholder kutuları DOĞRU merkezlenmiş.

DOĞRU (referans desen) örnekleri:
- `.img-upload-zone` (slider-form `:41` · tarifler-form `:46` · store-urunler-form `:45`): `flex column + align/justify center`.
- `.img-upload` + `.iu-icon` (dadafit challenge/egzersizler/programlar -form): flex-center + ikon `grid place-items:center`.
- `.cover-shot.is-empty` (icerik-form `:63`): flex column center ("Kapak görseli yok").
- `.ava-preview` (kullanicilar-form `:49`): flex center (`fa-user` fallback).
- `.upload-prev` (ayarlar `:69`): `grid place-items:center`.
- `.up-zone` / `.up-add` (tarif-ekle, puf-noktasi-ekle, antrenor-ol, diyetisyen-ol, isletme-ekle, sef-ol, mekan-ayarlar): flex column center + text-align center.

**Not:** Form sağ-panel "canlı önizleme"leri metin tabanlı (sözlük terim kartı, SERP kartı) —
görsel placeholder değil, hizalama dışı.

**⚠️ Premise uyarısı:** handoff KALAN-2 "ikonlar sol-üste yapışık → merkeze al" diyordu; tarama
bunu DOĞRULAMADI. Olası açıklama: (i) önceki bir commit'te zaten düzeldi, (ii) çok özel bir
ekran/state kastediliyor. **Beyar'dan somut örnek (hangi sayfa + boş mu dolu mu state) gelmeden
bu maddeye dokunmaya gerek yok** — ortada düzeltilecek bozukluk görünmüyor.

---

## 4. Görsel Fix Önerisi (merkezleme deseni)

Düzeltilecek bozukluk OLMADIĞINDAN merkezleme fix'i GEREKMİYOR. Tek opsiyonel iyileştirme (davranış
değişmez, salt DRY): `.img-upload-zone` (3 dosya) · `.img-upload` (3) · `.up-zone` (7) blokları
inline `<style>`'larda kopyala-yapıştır tekrarlanıyor; istenirse `sa-ui.css`'e ortak komponent
class olarak taşınabilir. **Ancak kanonik kabuğa dokunma kuralı + "bozukluk yok" → DÜŞÜK öncelik,
öneri düzeyinde bırak.** Kanonik merkezleme util'ı şu an YOK; gerekirse desen:
`display:flex;flex-direction:column;align-items:center;justify-content:center` (kutu) +
`display:grid;place-items:center` (ikon chip).

---

## 5. Uygulama Sırası + Efor

| # | İş | Önkoşul | Efor |
|---|---|---|---|
| 1 | **a/b/c desen kararı** (Beyar onayı) | bu rapor | — (karar) |
| 2 | (b seçilirse) `sa-admin-taksonomi.html` — kademeler desenli modül-gruplu mini-CRUD + mock JS | karar | **orta** (~Sözlük modülü) |
| 3 | SECTIONS'a nav +1 satır + `dizin.html` ADMIN_GROUPS +1 link (izinli kabuk dokunuşu) | #2 | düşük |
| 4 | QA: 1440/390 render · nav is-active · dizin link 200 · filtre/CRUD/boş-durum · console 0 | #2-3 | düşük |
| — | Görsel placeholder merkezleme | — | **İPTAL/BEKLE** — bozukluk yok; Beyar somut örnek verirse aç |
| — | (ops.) upload blok DRY → sa-ui.css | ayrı karar | düşük, öncelik yok |

**Toplam (b yolu):** orta efor, tek izole sayfa + minimal kabuk dokunuşu. Görsel iş şu an boş çıktı.
