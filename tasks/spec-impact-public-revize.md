# Spec Etki Analizi — Public Revizelerin Admin Mimarisine Etkisi (READ-ONLY)

> Salt **etki analizi**. **Kod/değişiklik/commit YOK · public siteye DOKUNULMAZ.**
> Patron public sitede 2 revize verdi; public **şimdi değişmiyor** (ayrı faz). Bu doküman
> yalnız bu revizelerin **admin mimari/spec'e** etkisini kayıt altına alır → Faz 2 forward-compatible kurulsun.
> Public özelliğini TASARLAMAZ; yalnız "admin'e ne düşer" yazar.
> Tarih: 2026-06-20. Tutarlı kaynak: `tasks/faz2-envanter.md`, `tasks/sa-entegrasyon-plan.md`.

---

## 0. ÖZET

| Revize | Public özet | Admin etkisi | Faz 2 aksiyonu |
|---|---|---|---|
| **R1 — Rol-bazlı kayıt** | Kayıt rol olarak ayrılıyor (Antrenör/Diyetisyen/İşletme doğrudan rol); eski "üye→işletme başvur" kalkıyor | **KÜÇÜK** — onay kuyruğu **besleme** mantığı değişir, pattern AYNI | Onay-kuyruğu modüllerini "rol kayıt onayı" diliyle kur |
| **R2 — Güzergah / yol haritası** | İnteraktif rota + waypoint + alternatif yol + şehir önerileri + "yol üzeri" işareti | **BÜYÜK** — yeni veri boyutu (koordinat, flag, şehir-öneri içeriği) | lat-lng + "yol üzeri" flag **LARAVEL fazına ertelendi** (bu dokümanda kayıtlı, migration'da eklenecek); şehir/güzergah modülü de ertelenir |

> İki revize de public faz'da uygulanacak. Burada amaç: Faz 2 admin işini yaparken **geri-uyumlu**
> davranmak — public'e sıkı bağlı tasarımı erteleyerek israfı önle. **Karar (güncel):** koordinat/flag
> dahil veri-modeli işleri mockup'a girmez, Laravel fazına bırakılır; forward-compat bu **dokümanla** korunur.

---

## 1. REVİZE 1 — Rol-bazlı kayıt (KÜÇÜK etki)

### Public değişiklik (referans — bizim işimiz değil)
- Girişler **mail ile** (aynı, değişmez).
- Kayıt **rol-bazlı** ayrılıyor: "Antrenör olarak kaydol" · "Diyetisyen olarak kaydol" (yapıldı) · "İşletme olarak kaydol".
- **ESKİ yanlış akış KALDIRILIYOR:** her üyenin "işletme olarak başvur" (üyelik üzerinden başvuru) →
  işletme/antrenör artık **doğrudan rol** olarak kaydolacak.

### Admin etkisi
- Onay kuyruklarının **BESLEME** mantığı değişir: `üye-başvuru` → `doğrudan-rol-kayıt`.
- **Yapısal pattern AYNI:** liste + onayla/reddet kuyruğu (`sa-saglik-diyetisyenler` gözetim ikizi;
  yıkıcı/onay aksiyonu = `saConfirm`). Mimari kırılma YOK — adlandırma/akış nüansı.
- Etkilenen modüller:
  | Modül (faz2-envanter) | Şimdiki dil | R1 sonrası dil |
  |---|---|---|
  | `admin-rozet#isletmeler` — "İşletme Başvuruları" | üye-başvuru kuyruğu | "İşletme **Kayıt Onayları**" (doğrudan-rol) |
  | İşletme → **Onaylar** (faz2 §3) | belge/başvuru onay kuyruğu | rol kayıt onay kuyruğu |
  | DadaFit → **Antrenörler** (faz2 §3) | onay/askı gözetimi | antrenör **kayıt/onay** kuyruğu |
  | Sağlık → Diyetisyenler | zaten var (liste+detay) | değişmez (ref pattern) |

### Faz 2 aksiyonu
- Bu onay-kuyruğu modüllerini **"rol kayıt onayı"** diliyle kur (liste + detay + onayla/reddet).
- §6 açık not (Onaylar ↔ İşletme Başvuruları örtüşmesi, faz2-envanter) R1 ile **netleşir**:
  ikisi de "doğrudan-rol kayıt onayı" → tek modülde birleştirme artık daha güçlü gerekçeli.
- Ekran tipi değişmez (liste+detay); yalnız başlık/etiket/boş-durum metni rol-kayıt diline geçer.

---

## 2. REVİZE 2 — Güzergah / yol haritası (BÜYÜK etki, yeni veri boyutu)

### Public değişiklik (referans — bizim işimiz değil)
- İnteraktif rota (Google Maps tarzı): başlangıç–varış + ara durak ekle/çıkar (waypoint).
- Alternatif güzergahlar (otoban vs şehir yolu).
- Yol üzerindeki şehre tıklayınca o şehrin önerileri ("şehrin meşhuru" + Dada'nın önerdiği mekanlar).
- Yola yakın yerler **"yol üzeri"** tag'li/işaretli; diğerleri yine listeleniyor.

### Admin etkisi (özelliği BESLEYEN veri admin'de yönetilecek)
1. **Koordinat (lat-lng)** — mekan/işletme kaydında. Yola-yakınlık hesabı + harita pin için ŞART
   (şu an yalnız metin adres var).
2. **"Yol üzeri / öne çıkan" FLAG** — işletme/mekan kaydında işaret (bool/curated).
3. **Şehir-bazlı öneri içeriği** ("şehrin meşhuru" + "Dada önerileri") — muhtemelen **YENİ MODÜL**
   (Şehirler / Bölge Önerileri) **veya** mekan kayıtlarına şehir-tag + curated işareti.
4. *(ops.)* **"Dada'nın önerdiği hazır güzergahlar"** içerik tanımı — yeni içerik varlığı.

### Faz 2 envanterinde durum
- (1) ve (2) → mevcut İşletme/Mekan **form**larına eklenebilir alanlar (ucuz, izole).
- (3) ve (4) → `tasks/faz2-envanter.md`'de **YOK**. Yeni modül(ler); public'e sıkı bağlı.

---

## 3. FORWARD-COMPAT KARARLARI (Faz 2'yi nasıl hazırlarız)

1. **Koordinat + flag'i MOCKUP'A EKLEME — Laravel fazına bırak.** *(Karar güncellendi: önceki "şimdiden forma ekle" tersine çevrildi.)*
   İşletme + Mekan mockup modülleri Faz 2'de **DÜZ** kalır (koordinat/flag YOK).
   - **Gerekçe:** Mockup UI/UX katmanı; lat-lng + flag **veri-modeli + güzergah-bağlı**. Anlamlı UI'ları
     (harita pin) public harita işine bağlı. Mockup→Laravel zaten **baştan implementasyon** olduğu için
     mockup input'u "hazır kod" sağlamıyor → şimdi koymak forward-compat kazandırmaz, israf eder.
     Forward-compat zaten **bu dokümanla** korunuyor.
   - **Laravel fazı teknik standardı (migration'da):**
     - `latitude` **DECIMAL(10,8)** + `longitude` **DECIMAL(11,8)** — **iki ayrı alan**.
       String DEĞİL, tek birleşik alan DEĞİL.
     - Spatial **POINT + index** ihtiyacı (yola-yakınlık sorgusu) **Laravel fazında değerlendirilir** —
       erken optimize YOK (gerek kanıtlanınca eklenir).
     - "yol üzeri / öne çıkan" = **boolean flag** (curated işaret), kayıtta.
   - Mekan operatör `mekan-ayarlar` profil bloğu da aynı: bu faz DOKUNULMUYOR; veri Laravel'de gelir.
2. **Şehir/Bölge Öneri modülü + hazır güzergah = tamamen yeni; ERTELE.** Public spec netleşince ayrı ele alınır.
   - **Şimdi placeholder bile KOYMA** (public'le sıkı bağlı; erken tasarım israf).
   - `SECTIONS`'a "Şehirler/Güzergahlar" gibi `soon` item bile EKLEME — spec gelene kadar.
3. **Antrenör operatör paneli (Faz 2 ilk dalga) bu 2 revizeden İZOLE.** Etkilenmez, bekletme yok —
   planlandığı gibi ilerler (`tasks/faz2-envanter.md §4`).

---

## 4. FAZ 2 ENVANTERİNE DÜŞEN NET DEĞİŞİKLİK (özet)

| faz2-envanter referansı | R1/R2 etkisi | Ne yapılır |
|---|---|---|
| İşletme → İşletmeler (form) | R2 (1)(2) | **Laravel fazı (migration)** — mockup'a DOKUNMA, form düz kalır; lat-lng DECIMAL + flag orada |
| İşletme → Onaylar | R1 | "rol kayıt onayı" dili (liste+detay aynı) |
| `admin-rozet#isletmeler` | R1 | "İşletme Kayıt Onayları" diline geç |
| DadaFit → Antrenörler | R1 | "antrenör kayıt/onay kuyruğu" dili |
| Antrenör operatör paneli | — | etkilenmez, izole |
| *(yeni)* Şehir/Bölge Önerileri | R2 (3) | **ERTELE** — envantere ekleme, placeholder yok |
| *(yeni)* Hazır Güzergahlar | R2 (4) | **ERTELE** |

> §6 faz2-envanter açık notlarından **"Onaylar ↔ İşletme Başvuruları örtüşmesi"** → R1 ile birleştirme
> yönünde netleşti (her ikisi doğrudan-rol kayıt onayı).

---

## 5. AÇIK (public faz'a taşınan — şimdi karar YOK)

- Şehir öneri modülünün yapısı (ayrı modül mü, mekan-tag mı).
- Güzergah veri modeli (waypoint/alternatif yol saklama).
- Harita entegrasyonu (sağlayıcı, yola-yakınlık hesabı).
- → Hepsi **public spec geldiğinde** karara bağlanır. Bu faz mockup'ta **koordinat/flag DAHİL hiçbir
  veri-modeli alanı hazırlamaz** — hepsi Laravel'e taşındı.

### Koordinat/flag saklama standardı (Laravel migration — kayıt)
- `latitude` **DECIMAL(10,8)** · `longitude` **DECIMAL(11,8)** — **iki ayrı kolon**. String DEĞİL, tek alan DEĞİL.
- "yol üzeri / öne çıkan" = **boolean** flag (curated).
- Spatial **POINT + index** (yola-yakınlık) → **Laravel fazında değerlendirilir, erken optimize YOK**.
- Mockup'ta bu alanlar **görünmez/yok**; UI gerçekleşmesi (harita pin) public harita işine bağlı.

---

*Bu rapor etki kaydıdır; public özellik tasarlamaz, implement/commit içermez. Faz 2 admin işi forward-compatible kurulsun diye yazıldı.*
