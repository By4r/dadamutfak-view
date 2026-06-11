# Mutfak Defteri v1 — Rapor (F7, public kullanıcı profili · patron m8 ⭐)

**Durum: TAMAM** · Dosya: `mockups/mutfak-defteri-v1.html` · Konsol: 0 hata (1440 + mobil) · Yatay taşma: YOK (probe ile doğrulandı: `body.scrollWidth == clientWidth`)

Persona: **Ayşe Demir — @aysemutfakta**, "Ayşe'nin Mutfak Defteri", Usta Aşçı derecesi, İzmir, Mart 2021'den beri üye, 8.450 topluluk puanı.

---

## L1 Kıyas Tablosu (eski template → yeni)

Kaynaklar: `kullanici-profili.html` (2511 satır), `menulerim.html`, `sefler.html` (göz atıldı).

| Eski blok | Yeni karşılığı / karar |
|---|---|
| Breadcrumb (anasayfa ikonu › Şefler › ad) | `.pf-crumb` — TD `.rd-crumb` dili, aynı hiyerarşi (Anasayfa › Şefler › Ayşe Demir) |
| `profile-header`: 150px avatar + ad + @handle | `.pf-head` kimlik kartı: 128px avatar **banner'a biner** + h1 + @handle. **YENİ:** banner görseli, bio, konum/üyelik meta satırı (eski sitede yok — m8 "defter" hissi) |
| "Usta Şef" + expert.svg rozeti | `.tbadge.t-dada` "Usta Aşçı" — TD rozet dili (ikon: fa-medal) |
| Sayaçlar: Takipçi / Tarif / Püf Noktası (3'lü düz satır) | `.pf-stats` 5'li şerit kart (TD `.rd-facts` künye dili): Tarif / Püf / **Takipçi (tıkla→modal)** / **Takip (tıkla→modal)** / **Topluluk Puanı (sarı — m8)** |
| `follow-btn` / `unfollow-btn` (iki ayrı buton, yorum satırıyla) | `.pf-follow` tek buton JS toggle: "Takip Et ↔ Takip Ediliyor" + paylaş icon-btn |
| Sol `dashboard-menu` (Takipçileri / Takip Ettikleri / İçerikleri) | **Bilinçli elendi:** sol sidebar kaldırıldı. Takipçi/Takip listeleri sayaca tıklayınca açılan `.flw-modal`'a taşındı (mobilde sidebar zaten kullanışsızdı); "İçerikleri" ana sekme çubuğu oldu |
| `profile-row-card` takipçi satırları (avatar + ad) | `.flw-row` modal satırı: avatar + ad + @handle + derece + mini takip butonu (shell `.fb-panel` kabuğu referans, kendi `flw-` class'ları) |
| `tablinks` alt sekmeler: Tariflerim / Püf Noktalarım (2 sekme) | `.pf-tabs` (v3a `.disc-tabs/.dt` dili, sticky) **6 sekme:** Tarifleri / Püf Noktaları / **Kaydedilenler / Denedikleri / Favorileri / Menüleri** (m8 genişletmesi) + sayaç rozetli |
| `product-cart-wrap` tarif kartları (recipe-info-tag'lı) | `.r-card` v3a anatomisi verbatim (r-chip, r-save, m-types, r-facts, r-stats) |
| Püf noktası grid kartları | `.puf-card` — v3a kartının **açık zemin uyarlaması** (aşağıda) |
| Yorumlanmış boş durum satırları ("Kullanıcının henüz bir Tarifi bulunmamakta.") | `.pf-empty` tam tasarımlı boş durum (kılavuz dili: tint ikon kutusu + başlık + açıklama + CTA) — **her 6 sekmede**, `?tab=X&empty=1` ile gösterilebilir |
| `menulerim.html`: arama + accordion menü + Sil / Tarif Ekle / Menüyü Düzenle | `.menu-card` public okuma kartı: menü adı + açıklama + 4'lü mini thumb (`+N` overlay) + toplam süre/kalori/porsiyon. **Yönetim butonları bilinçli elendi** — bu sayfa PUBLIC profil; sahibi-görünümü (düzenle/sil/onay bekleyenler) ayrı faz |
| Menü içi "Menüden Kaldır" butonu | Elendi (public okuma görünümü) |
| — (eski sitede yok) | **YENİ: Rozet vitrini** — 9 kazanılmış + 3 kilitli (dashed, soluk, "X kaldı" ilerleme metni) — m8/m9 oyunlaştırma |
| — (eski sitede yok) | **YENİ:** Denedikleri sekmesinde `.r-tried` "Denedi ✓" + kullanıcının foto/yorum/yıldız mini satırı (`.try-note`) — "Ben de Yaptım" mirası |
| — (eski sitede yok) | **YENİ:** Kaydedilenler'de koleksiyon chip satırı (Tümü / Tatlılar / Denenecekler / Ege Sofrası / Misafir Menüsü) |

## Kullanılan Bileşenler

- **Shell'den (dokunulmadı):** chrome katmanı komple, `.chips/.chip`, `.btn`, `.icon-btn`, `.sec-head`, `.see-all`, `.eyebrow`. Shell JS'i `.r-save` toggle ve `.grid-4` drag-scroll'u otomatik yakaladı.
- **v3a'dan verbatim:** r-card sistemi (289–312 + anatomi 770–807), `.grid-4` + mobil snap (1132–1138), `.m-types/.mt`, `.r-tried`, `.r-save/.p-fav`, `.disc-tabs/.dt` dili, puf-card iskeleti, tablet `.grid-4{1fr 1fr}`.
- **TD'den (class referansı, CSS kopya):** `.rd-crumb`→`.pf-crumb`, `.tbadge`, `.rd-follow` dili→`.pf-follow`/`.flw-fol`, `.rd-facts/.rdf` künye şeridi→`.pf-stats/.pfs`.
- **Yeni (token dilinde):** `.pf-banner/.pf-mark/.pf-head/.pf-ava`, `.badge-grid/.badge-card`, `.try-note`, `.menu-card/.menu-thumbs`, `.pf-empty`, `.flw-*` modal. Radius yalnız token; pill yok; görseller div+bg + Unsplash filtre suffix'i.

## Bilinçli Kararlar

1. **Defter karakteri (m8):** banner üstünde "AYŞE'NİN MUTFAK DEFTERİ" etiketi (`.pf-mark`), rozet bölümü başlığı "Defterin Madalyaları", boş durum metinleri defter diliyle ("Defterin ilk sayfası seni bekliyor"). Sayfa sıradan profil değil, kişisel arşiv vitrini olarak kurgulandı.
2. **puf-card açık zemin uyarlaması:** v3a'daki koyu zemin glass (`rgba(255,255,255,.93)` + backdrop-blur + 40px koyu gölge) → beyaz kart + hairline border + `--sh-sm`; mask'li sol görsel ve `.puf-ico` aynen korundu.
3. **r-card'larda `.r-foot` yazar satırı atlandı** — Tarifleri/Püf sekmelerinde tüm içerik zaten profil sahibinin; tekrar gürültü olurdu. Kaydedilen/Favori kartlarında da sade tutuldu (açık soru #3).
4. **Sticky sekme çubuğu:** `.pf-tabbar` header altına yapışır (112px / mobil 62px) — uzun gridlerde sekme değiştirme kaybolmasın.
5. **`?empty=1` davranışı:** yalnız `?tab=` ile gelen sekmenin boş durumu gösterilir; diğer sekmelere tıklanınca dolu içerik görünür (tek URL ile tüm boş durumlar gezilebilir).
6. **Eski 3'lü sayaç 5'liye çıktı** (Takip + Puan eklendi) — m8 "puan toplar" gereksinimi; sarı yalnız puan ikonuna.
7. **Mobil fix:** `.pf-head` column+center hizada `.pf-id` shrink-to-fit kalıp meta satırı sarmıyordu → `.pf-id{width:100%}` eklendi.

## SS Yolları (`mockups/.ss-scratch/`)

| SS | Dosya |
|---|---|
| 1440 hero | `profil-1440-hero.png` |
| 1440 tam sayfa | `profil-1440-full.png` |
| 1440 sekmeler | `profil-1440-tab-{puf,kaydedilenler,denedikleri,favoriler,menuler}.png` (Tarifleri varsayılan — full SS'te) |
| 1440 boş durum | `profil-1440-empty.png` (`?tab=menuler&empty=1`) |
| 1440 takipçi modalı | `profil-1440-flw.png` (`?flw=1`) |
| Mobil hero / tam / sekme / modal | `profil-390-hero.png`, `profil-390-full.png`, `profil-390-tab-menuler.png`, `profil-390-flw.png` |

**SS notları:**
- **Headless Chrome min pencere genişliği 500px** (macOS): `--window-size=390,...` ile layout 500px'te kurulup PNG 390'a KIRPILIYOR (sağ kenar kayıp görünüyor — sayfa hatası değil). Bu yüzden mobil SS'ler 500px genişlikte alındı (aynı ≤640 kırılımı). 390 doğrulaması probe ile yapıldı: layout akışkan, `scrollWidth==clientWidth`, taşma yok. Kılavuz §4'teki header ikon artifact'ına ek olarak bu da bilinen artifact listesine girebilir (lessons önerisi).
- Çerez banner'ı headless'ta temiz localStorage nedeniyle bazı SS'lerde görünür — sayfanın parçası, hata değil.

## Açık Sorular (5)

1. **Şef profili ayrımı:** research'e göre şef profili = bu şablonun rozetli varyantı. Tek şablon mu kalacak, yoksa şefe özel ek blok (video rayı, "Şefin Tercihi") gelecek mi?
2. **Sahibi-görünümü:** kendi profilinde "onay bekleyen içerikler + puan geçmişi" (research 273-274) — bu mockup'a varyant mı eklensin, ayrı sayfa mı?
3. **Kaydedilen/Favori kartlarında yazar satırı:** bu tarifler başka kullanıcıların — `.r-foot` yazar satırı eklensin mi? (Şu an sade, yazarsız.)
4. **Puan sayacı linki:** "Topluluk Puanı" Rozetler & Liderlik sayfasına (F-liderlik) mi linklensin? Şu an statik.
5. **Takipçi modalı ölçeği:** 12,4B takipçide gerçek üründe arama + sayfalama gerekir; mockup 6 satır gösteriyor — modal mı kalsın, ayrı sayfaya mı taşınsın?

## EK — Beyar SS Turu Kararları (2026-06-11)

- ✅ BEĞENİLDİ. **Revize işlendi:** rozet vitrini tonlandı — büyük 6'lı kart vitrini KALDIRILDI, sekmelerin ALTINA kompakt teaser bandı (`.badge-band`: küçük başlık "Rozetler · 9 kazanıldı · 3 yolda" + yatay mini kartlar, nötr ikon zemini, hover'da domates; "Tüm Rozetler" linki teaser görevinde). Hero "9 rozet" metası bandı çapalar (#rozetler).
- **Eklendi:** kaydedilen + favori kartlarına `.r-foot` yazar satırı (v3a anatomisi, 8 kart); Topluluk Puanı sayacı liderlik mock linki oldu (#liderlik, F-liderlik stack'te).
- Şef profili TEK ŞABLON (ek blok varyantı ileride).
- Sahibi-görünümü AYNI SAYFA varyantı — `?owner=1` İLERİDE eklenecek (not).
- Takipçi MODAL kalır.
