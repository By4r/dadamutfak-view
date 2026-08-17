/* ============================================================================
   DadaCampus — VERİ MODELİ (campus-data.js)
   ----------------------------------------------------------------------------
   Kaynak sözleşme : docs/DADACAMPUS-REVIZYON.md §18 (içerik modeli), §8.1 (terim
                     ayrımı), §26.7 (benzersiz slug), §26.14 (demo içeriği sabit
                     HTML olarak çoğaltma)
   Plan            : docs/PLAN.md §1
   Dersler         : docs/lessons.md §4 (render sırası tuzağı), §11 (onay kaydı kapısı)

   NEDEN VAR: DadaCampus sayfalarında eğitim/program/kurum/eğitmen içeriği HTML'e
   hardcode EDİLMEZ. Tüm listeler bu dosyadan render edilir, tüm detay sayfaları
   ?slug= ile buradan okur. Kabuk (CSS/JS) her sayfada inline kalır — ortak dosya
   YALNIZCA bu veridir (Beyar kararı, 2026-08-17: "hibrit").

   🔴 TERİM DİSİPLİNİ (§8.1) — bunlar birbirinin yerine KULLANILMAZ:
      Eğitim         : tek konu/beceriye odaklı ders seti          → DC.egitimler
      Program        : çok eğitimli + değerlendirmeli yapı          → DC.programlar
      Atölye         : belirli tarihli canlı/yüz yüze uygulama      → DC.atolyeler
      Ortak Program  : kurumla birlikte yürütülen program           → programlar[tur='universite-ortak'|…]
      Kurum Kohortu  : belirli kuruma özel katılımcı grubu          → DC.kohortlar
      Etkinlik       : seminer, söyleşi, yarışma, panel             → DC.etkinlikler

   🔴 DEMO NOTU: buradaki kişi, kurum, tarih, sayı ve fiyatların TAMAMI kurgudur
   (§2.3). Kurum adları bilinçli olarak gerçek hiçbir kuruma karşılık gelmez —
   gerçek bir kurumu DadaCampus partneri gibi göstermek onay kaydı olmadan
   yapılamaz (§26.13, §20).

   🔴 GÖRSEL: yalnızca akademi-v1.html'de zaten canlı olan 14 Unsplash foto ID'si
   kullanıldı (yeni ID uydurmak sessiz 404 riski — docs/lessons.md ve
   tasks/lessons.md "remote görsel 200 testi" dersi). Filtre suffix'i v3a kanonu.

   🔴 RENK: bu dosya renk taşımaz. Petrol kimliği CSS'te var(--tomato) ile gelir
   (docs/lessons.md §1).
   ========================================================================= */

(function (w) {
  'use strict';

  /* --- görsel yardımcıları: v3a filtre suffix'i tek yerde ------------------ */
  var FLT = 'auto=format&fit=crop&exp=7&gam=6&sat=-9&high=8&vib=5';
  function img(id, width) { return 'https://images.unsplash.com/photo-' + id + '?w=' + width + '&q=80&' + FLT; }

  /* Onaylı foto ID'leri (akademi-v1.html'de canlı — yenisi eklenmez) */
  var F = {
    temelMutfak:  '1556910103-1c02745aae4d',
    ekmek:        '1509440159596-0249088772ff',
    et:           '1544025162-d76694265947',
    pasta:        '1488477181946-6428a0291777',
    dunya:        '1466637574441-749b8f19452f',
    sunum:        '1504674900247-0877df9cc836',
    bicak:        '1593618998160-e34014e67546',
    sos:          '1547592180-85f173990554',
    baharat:      '1532336414038-cf19250c5757',
    guvenlik:     '1606787366850-de6330128bfc',
    avMehmet:     '1577219491135-ce391730fb2c',
    avBurak:      '1583394293214-28ded15ee548',
    avSelin:      '1438761681033-6461ffad8d80',
    avAyse:       '1607631568010-a87245c0daf8'
  };

  /* ======================================================================
     1. REFERANS LİSTELERİ (filtre seçenekleri — tek kaynak)
     ====================================================================== */

  /* §4.2 — 10 konu alanı. slug'lar Eğitimler Merkezi filtresinde ?konu= değeri. */
  var konuAlanlari = [
    { slug: 'temel-mutfak',        ad: 'Temel Mutfak ve Bıçak Becerileri',            ikon: 'fa-kitchen-set',    ozet: 'Doğrama, bileme, mise en place', kapak: F.bicak },
    { slug: 'pisirme-soslar',      ad: 'Pişirme Teknikleri, Soslar ve Fonlar',        ikon: 'fa-fire-burner',    ozet: 'Sote, haşlama, fırın, 5 ana sos', kapak: F.sos },
    { slug: 'turk-mutfagi',        ad: 'Türk Mutfağı ve Yerel Mutfaklar',             ikon: 'fa-bowl-food',      ozet: 'Bölgesel teknik ve tarifler',    kapak: F.baharat },
    { slug: 'dunya-mutfaklari',    ad: 'Dünya Mutfakları',                            ikon: 'fa-earth-americas', ozet: 'Akdeniz, Uzakdoğu, İtalyan',     kapak: F.dunya },
    { slug: 'ekmek-fermantasyon',  ad: 'Ekmek, Fırıncılık ve Fermantasyon',           ikon: 'fa-bread-slice',    ozet: 'Maya, ekşi maya, fırın',         kapak: F.ekmek },
    { slug: 'pastacilik',          ad: 'Pastacılık ve Tatlı Sanatı',                  ikon: 'fa-cake-candles',   ozet: 'Pasta, tart, plating',           kapak: F.pasta },
    { slug: 'gida-guvenligi',      ad: 'Gıda Güvenliği, Hijyen ve Saklama',           ikon: 'fa-shield-halved',  ozet: 'HACCP temelleri, soğuk zincir',  kapak: F.guvenlik },
    { slug: 'menu-yonetimi',       ad: 'Menü Planlama, Maliyet ve Mutfak Yönetimi',   ikon: 'fa-list-check',     ozet: 'Maliyet, porsiyon, denge',       kapak: F.dunya },
    { slug: 'surdurulebilirlik',   ad: 'Sürdürülebilirlik ve Atıksız Mutfak',         ikon: 'fa-leaf',           ozet: 'Atık azaltma, yerel ürün',       kapak: F.sos },
    { slug: 'girisimcilik',        ad: 'Gastronomi Girişimciliği ve Profesyonel Gelişim', ikon: 'fa-briefcase',  ozet: 'Sunum, marka, işletme',          kapak: F.sunum }
  ];

  var seviyeler = [
    { slug: 'baslangic', ad: 'Başlangıç' },
    { slug: 'orta',      ad: 'Orta' },
    { slug: 'ileri',     ad: 'İleri' }
  ];

  /* §4.2 — formata göre */
  var formatlar = [
    { slug: 'video',        ad: 'Video' },
    { slug: 'canli',        ad: 'Canlı' },
    { slug: 'hibrit',       ad: 'Hibrit' },
    { slug: 'yuz-yuze',     ad: 'Yüz Yüze Destekli' }
  ];

  /* §7.2 — erişim tipleri */
  var erisimTipleri = [
    { slug: 'ucretsiz',        ad: 'Ücretsiz' },
    { slug: 'tek-satin',       ad: 'Tek Satın Alma' },
    { slug: 'uyelik',          ad: 'Üyelik' },
    { slug: 'kurum-lisansi',   ad: 'Kurum Lisansı' }
  ];

  /* §15.1 — belge türleri + ZORUNLU açıklama metni (arayüz bunu göstermek zorunda) */
  var belgeTurleri = [
    { slug: 'katilim',        ad: 'Katılım Belgesi',            kullanim: 'Belirli devam koşulunu karşılama',
      zorunluAciklama: 'Bu belge bir başarı belgesi değildir; belirli devam koşulunun karşılandığını gösterir.' },
    { slug: 'basari',         ad: 'Başarı Sertifikası',         kullanim: 'Değerlendirme ve başarı koşulu',
      zorunluAciklama: 'Ölçüt, puan ve belgeyi veren kurum belge üzerinde gösterilir.' },
    { slug: 'mikro-kazanim',  ad: 'Mikro Kazanım / Rozet',      kullanim: 'Belirli beceri veya modül',
      zorunluAciklama: 'Hangi kazanımı temsil ettiği belge üzerinde yazılıdır.' },
    { slug: 'ortak-program',  ad: 'Ortak Program Sertifikası',  kullanim: 'DadaCampus ve partner kurum onayı',
      zorunluAciklama: 'Her kurumun rolü ve yetkisi belge üzerinde açıklanır.' },
    { slug: 'kurum-ici',      ad: 'Kurum İçi Tamamlama Kaydı',  kullanim: 'Kapalı kurumsal program',
      zorunluAciklama: 'Kamuya açık geçerlilik iddiası taşımaz; kapalı kurumsal program kaydıdır.' }
  ];

  /* §3.2 — kullanıcı rolleri (Rol Değiştirici bu listeden beslenir) */
  var roller = [
    { slug: 'ogrenci',      ad: 'Öğrenci',             panel: 'dadacampus-kampusum-v1.html' },
    { slug: 'egitmen',      ad: 'Eğitmen',             panel: 'dadacampus-egitmen-panel-v1.html' },
    { slug: 'koordinator',  ad: 'Kurum Koordinatörü',  panel: 'dadacampus-kurum-panel-v1.html' },
    { slug: 'degerlendirici', ad: 'Değerlendirici',    panel: 'dadacampus-egitmen-panel-v1.html' }
  ];

  /* §11.1 / §11.3 — EĞİTMEN rolleri. `roller` (yukarıda) platform rol
     değiştiricisinin listesidir; bu ayrı kavramdır ve karıştırılmaz:
     eğitmenler[].rol bu listeden gelir, eğitmen dizini bununla süzülür. */
  var egitmenRolleri = [
    { slug: 'sef',            ad: 'Şef Eğitmen',      ikon: 'fa-utensils',
      yetki: 'Uygulamalı ders ve canlı atölye verir, uygulama teslimlerini değerlendirir.' },
    { slug: 'akademisyen',    ad: 'Akademisyen',      ikon: 'fa-building-columns',
      yetki: 'Müfredat ve kazanım tasarımına katılır, akademik incelemeyi yürütür.' },
    { slug: 'uzman',          ad: 'Sektör Uzmanı',    ikon: 'fa-user-tie',
      yetki: 'Alan bilgisiyle içerik üretir; gıda güvenliği gibi konularda kontrol verir.' },
    { slug: 'mentor',         ad: 'Mentor',           ikon: 'fa-compass',
      yetki: 'Bire bir yönlendirme, portfolyo ve kariyer görüşmesi yapar.' },
    { slug: 'degerlendirici', ad: 'Değerlendirici',   ikon: 'fa-clipboard-check',
      yetki: 'Yalnız değerlendirme kuyruğunda çalışır; içerik üretmez.' },
    { slug: 'konuk',          ad: 'Konuk Eğitmen',    ikon: 'fa-user-clock',
      yetki: 'Tek oturum veya kısa seri için davet edilir; panel erişimi süreye bağlıdır.' }
  ];

  /* §9.2 — 10 iş birliği modeli (Kurumlar Merkezi'nin ana tablosu) */
  var isbirligiModelleri = [
    { slug: 'ortak-sertifika',  ad: 'Ortak sertifika programı', kapsam: 'Birlikte hazırlanan müfredat, eğitmen ve değerlendirme', deger: 'Ortak görünürlük, yeni katılımcı ve gelir paylaşımı', ikon: 'fa-certificate',      kurumTurleri: ['universite', 'mutfak-okulu'] },
    { slug: 'ders-destek',      ad: 'Ders destek modeli',       kapsam: 'Üniversite/okul dersine dijital içerik ve uygulama desteği', deger: 'Eğitim materyali standardı ve erişim', ikon: 'fa-book-open',        kurumTurleri: ['universite', 'mutfak-okulu', 'meslek'] },
    { slug: 'surekli-egitim',   ad: 'Sürekli eğitim programı',  kapsam: 'Kısa dönem mesleki gelişim ve uzmanlık programı', deger: 'Üniversite-kamu-sektör etkileşimi', ikon: 'fa-arrows-rotate',    kurumTurleri: ['universite', 'kamu', 'isletme'] },
    { slug: 'hibrit-atolye',    ad: 'Hibrit atölye modeli',     kapsam: 'Online teori + kurum mutfağında uygulama', deger: 'Ölçeklenebilir ve uygulamalı öğrenme', ikon: 'fa-video',            kurumTurleri: ['mutfak-okulu', 'meslek', 'isletme'] },
    { slug: 'icerik-ortakligi', ad: 'İçerik üretim ortaklığı',  kapsam: 'Kurum uzmanlarıyla video, rehber ve eğitim seti', deger: 'Kurumsal bilgi birikiminin dijitalleştirilmesi', ikon: 'fa-clapperboard',     kurumTurleri: ['universite', 'kamu', 'isletme'] },
    { slug: 'kamu-sosyal-etki', ad: 'Kamu sosyal etki programı', kapsam: 'Yerel kalkınma, kooperatif, kadın/genç ve istihdam odaklı eğitim', deger: 'Ölçülebilir kamu değeri', ikon: 'fa-hand-holding-heart', kurumTurleri: ['kamu'] },
    { slug: 'yerel-gastronomi', ad: 'Yerel gastronomi projesi', kapsam: 'Yöresel ürün, tarif, rota, arşiv ve eğitim', deger: 'Kültürel miras ve tanıtım', ikon: 'fa-map-location-dot', kurumTurleri: ['kamu', 'universite'] },
    { slug: 'ogrenci-proje',    ad: 'Öğrenci proje ve yarışmaları', kapsam: 'Gerçek problem, mentor, jüri ve sergileme', deger: 'Portfolyo ve sektör bağlantısı', ikon: 'fa-trophy',           kurumTurleri: ['universite', 'mutfak-okulu', 'isletme'] },
    { slug: 'egitici-egitimi',  ad: 'Eğitici eğitimi',          kapsam: 'Akademik/mesleki kadroya dijital öğretim ve içerik desteği', deger: 'Kurumsal kapasite artışı', ikon: 'fa-chalkboard-user',  kurumTurleri: ['universite', 'meslek', 'kamu'] },
    { slug: 'kurumsal-lisans',  ad: 'Kurumsal lisans',          kapsam: 'Belirli kontenjan için platform ve raporlama erişimi', deger: 'Düzenli kullanım ve yönetilebilir maliyet', ikon: 'fa-id-card-clip',     kurumTurleri: ['universite', 'mutfak-okulu', 'kamu', 'meslek', 'isletme'] }
  ];

  /* §9.1 / §9.3 — 5 kurum türü. Her biri tek şablon + ?tur= ile açılır (§26.14). */
  var kurumTurleri = [
    { slug: 'universite',   ad: 'Üniversiteler',                      kisaAd: 'Üniversite',        ikon: 'fa-building-columns', vaat: 'Dijital ders desteği, ortak sertifika ve sürekli eğitim' },
    { slug: 'mutfak-okulu', ad: 'Mutfak Sanatları Okulları',          kisaAd: 'Mutfak Okulu',      ikon: 'fa-utensils',         vaat: 'Hibrit eğitim, içerik lisansı ve uzman havuzu' },
    { slug: 'kamu',         ad: 'Kamu Kurumları ve Belediyeler',      kisaAd: 'Kamu',              ikon: 'fa-landmark',         vaat: 'Meslek edindirme, yerel ürün ve sosyal etki programları' },
    { slug: 'meslek',       ad: 'Mesleki Eğitim Kurumları',           kisaAd: 'Mesleki Eğitim',    ikon: 'fa-school',           vaat: 'Tamamlayıcı eğitim ve öğretici içerik' },
    { slug: 'isletme',      ad: 'İşletmeler ve Sektör Kuruluşları',   kisaAd: 'İşletme',           ikon: 'fa-hotel',            vaat: 'Kurum içi yetkinlik programları' }
  ];

  /* §8.2 — program türleri */
  var programTurleri = [
    { slug: 'sertifika',         ad: 'Sertifika Programları',              ikon: 'fa-certificate' },
    { slug: 'universite-ortak',  ad: 'Üniversite Ortak Programları',       ikon: 'fa-building-columns' },
    { slug: 'mutfak-okulu',      ad: 'Mutfak Sanatları Okulu Programları', ikon: 'fa-utensils' },
    { slug: 'kamu',              ad: 'Kamu ve Sosyal Etki Programları',    ikon: 'fa-landmark' },
    { slug: 'kurumsal',          ad: 'Kurumsal Mesleki Gelişim Programları', ikon: 'fa-briefcase' }
  ];

  /* §13.1 — etkinlik/atölye türleri */
  var etkinlikTurleri = [
    { slug: 'canli-uygulama', ad: 'Canlı Uygulama Atölyesi', ikon: 'fa-video' },
    { slug: 'soylesi',        ad: 'Şef/Akademisyen Söyleşisi', ikon: 'fa-microphone' },
    { slug: 'panel',          ad: 'Panel ve Seminer',        ikon: 'fa-users' },
    { slug: 'yuz-yuze',       ad: 'Yüz Yüze Kurum Atölyesi', ikon: 'fa-people-roof' },
    { slug: 'yarisma',        ad: 'Öğrenci Yarışması / Proje Sunumu', ikon: 'fa-trophy' },
    { slug: 'acik-ders',      ad: 'Tanıtım ve Açık Ders',    ikon: 'fa-door-open' },
    { slug: 'kapali-oturum',  ad: 'Kuruma Özel Kapalı Oturum', ikon: 'fa-lock' }
  ];

  /* ======================================================================
     2. EĞİTMENLER (§11.2)  — 4'ü akademi-v1.html'den taşındı, 2 akademisyen
        eklendi (dizin rol filtresi §11.1 tek rolle test edilemez)
     ====================================================================== */
  var egitmenler = [
    {
      id: 'eg-01', slug: 'mehmet-aydin', ad: 'Şef Mehmet Aydın',
      foto: F.avMehmet, unvan: 'Yönetici Şef', rol: 'sef', kurumId: null,
      biyografi: 'Yirmi yılı aşkın süredir Akdeniz ve et mutfağı üzerine çalışıyor; otel ve à la carte mutfaklarında yönetici şeflik yaptı.',
      uzmanliklar: ['Izgara', 'Et pişirme', 'Akdeniz'],
      diller: ['Türkçe'], ogretimYaklasimi: 'Tekniği önce tek başına çalıştırır, sonra tam tarifte birleştirir.',
      egitimIds: ['ed-01', 'ed-03'], programIds: ['pr-01'],
      yayinlar: [], kurulRolleri: [], dogrulandi: true, belgeDurumu: 'gecerli', basvuruDurumu: 'aktif'
    },
    {
      id: 'eg-02', slug: 'selin-korkmaz', ad: 'Pastane Şefi Selin Korkmaz',
      foto: F.avSelin, unvan: 'Pastane Şefi', rol: 'sef', kurumId: null,
      biyografi: 'Pastane ve tatlı sanatı üzerine uzmanlaştı; tabak tasarımı ve sunum atölyeleri yürütüyor.',
      uzmanliklar: ['Pasta', 'Tart', 'Plating'],
      diller: ['Türkçe', 'İngilizce'], ogretimYaklasimi: 'Ölçü ve sıcaklık disiplinini görsel sonuçla birlikte anlatır.',
      egitimIds: ['ed-04', 'ed-06'], programIds: ['pr-01', 'pr-03'],
      yayinlar: [], kurulRolleri: ['degerlendirici'], dogrulandi: true, belgeDurumu: 'gecerli', basvuruDurumu: 'aktif'
    },
    {
      id: 'eg-03', slug: 'burak-demirtas', ad: 'Şef Burak Demirtaş',
      foto: F.avBurak, unvan: 'Fırıncı Şef', rol: 'sef', kurumId: null,
      biyografi: 'Ekşi maya ve fırıncılık üzerine çalışıyor; kendi fırınında mayalı hamur atölyeleri veriyor.',
      uzmanliklar: ['Mayalı hamur', 'Ekşi maya', 'Fırın'],
      diller: ['Türkçe'], ogretimYaklasimi: 'Hamurun davranışını okumayı öğretir; ölçüden çok hisse dayalı kontrol.',
      egitimIds: ['ed-02'], programIds: ['pr-04'],
      yayinlar: [], kurulRolleri: [], dogrulandi: true, belgeDurumu: 'gecerli', basvuruDurumu: 'aktif'
    },
    {
      id: 'eg-04', slug: 'ayse-yildiz', ad: 'Şef Ayşe Yıldız',
      foto: F.avAyse, unvan: 'Şef', rol: 'sef', kurumId: null,
      biyografi: 'Dünya mutfakları üzerine çalışıyor; Uzakdoğu ve İtalyan mutfağı teknikleri üzerine eğitim veriyor.',
      uzmanliklar: ['Uzakdoğu', 'İtalyan', 'Baharat'],
      diller: ['Türkçe', 'İngilizce'], ogretimYaklasimi: 'Mutfakları teknik ortaklıkları üzerinden karşılaştırarak anlatır.',
      egitimIds: ['ed-05'], programIds: ['pr-02'],
      yayinlar: [], kurulRolleri: [], dogrulandi: true, belgeDurumu: 'gecerli', basvuruDurumu: 'aktif'
    },
    {
      id: 'eg-05', slug: 'nurcan-toprak', ad: 'Doç. Dr. Nurcan Toprak',
      foto: F.avAyse, unvan: 'Doç. Dr., Gastronomi ve Mutfak Sanatları', rol: 'akademisyen', kurumId: 'ku-01',
      biyografi: 'Gıda güvenliği ve duyusal analiz üzerine çalışıyor; ortak program müfredat tasarımında akademik danışman.',
      uzmanliklar: ['Gıda güvenliği', 'Duyusal analiz', 'Müfredat tasarımı'],
      diller: ['Türkçe', 'İngilizce'], ogretimYaklasimi: 'Kazanım-değerlendirme eşleşmesini her modülde açık tutar.',
      egitimIds: ['ed-06'], programIds: ['pr-02'],
      yayinlar: ['Duyusal analizde panel eğitimi (derleme)'], kurulRolleri: ['danisma-kurulu', 'akademik-onay'],
      dogrulandi: true, belgeDurumu: 'gecerli', basvuruDurumu: 'aktif'
    },
    {
      id: 'eg-06', slug: 'kemal-sarikaya', ad: 'Kemal Sarıkaya',
      foto: F.avMehmet, unvan: 'Mutfak Operasyon Danışmanı', rol: 'mentor', kurumId: 'ku-05',
      biyografi: 'Otel ve zincir restoran mutfaklarında maliyet ve operasyon kurdu; girişimcilik hattında mentorluk yapıyor.',
      uzmanliklar: ['Maliyet', 'Menü mühendisliği', 'Operasyon'],
      diller: ['Türkçe'], ogretimYaklasimi: 'Gerçek işletme verisiyle vaka çalışması yürütür.',
      egitimIds: [], programIds: ['pr-05'],
      yayinlar: [], kurulRolleri: ['mentor'], dogrulandi: true, belgeDurumu: 'gecerli', basvuruDurumu: 'aktif'
    }
  ];

  /* ======================================================================
     3. KURUMLAR (§10.1)
        🔴 onayKaydi null ise arayüz "üniversite onaylı / ortak sertifika /
        resmî geçerli" ifadesini GÖSTERMEZ ve etkiGostergeleri YAYIMLANMAZ
        (§26.13, §20). Tek kapı: DC.onayliMi().
        Kurum adları kurgudur — gerçek bir kuruma karşılık gelmez.
     ====================================================================== */
  var kurumlar = [
    {
      id: 'ku-01', slug: 'yesilova-universitesi', ad: 'Yeşilova Üniversitesi',
      tur: 'universite', sehir: 'Yeşilova', ulke: 'Türkiye', web: null,
      logo: null, monogram: 'YÜ', ikon: 'fa-building-columns',
      dogrulanmisPartner: true,
      tanitim: 'Gastronomi ve Mutfak Sanatları bölümüyle sürekli eğitim ve ortak sertifika programları yürütüyor.',
      isbirligiKapsami: 'Ders destek + ortak sertifika programı',
      isbirligiModelleri: ['ortak-sertifika', 'ders-destek', 'surekli-egitim'],
      programIds: ['pr-02'], egitmenIds: ['eg-05'], etkinlikIds: ['et-02'],
      etkiGostergeleri: [
        { ad: 'Tamamlama oranı', deger: '%84' },
        { ad: 'Kayıtlı katılımcı', deger: '210' }
      ],
      onayKaydi: { tarih: '2026-03-14', yetkili: 'Sürekli Eğitim Merkezi Müdürlüğü', kapsam: 'Ortak sertifika programı ve logo kullanımı', belgeRef: 'PROT-2026-018' },
      durum: 'aktif'
    },
    {
      id: 'ku-02', slug: 'nar-mutfak-sanatlari-okulu', ad: 'Nar Mutfak Sanatları Okulu',
      tur: 'mutfak-okulu', sehir: 'İzmir', ulke: 'Türkiye', web: null,
      logo: null, monogram: 'NM', ikon: 'fa-utensils',
      dogrulanmisPartner: true,
      tanitim: 'Kendi uygulama mutfağında hibrit atölye modeliyle online teoriyi yüz yüze uygulamayla birleştiriyor.',
      isbirligiKapsami: 'Hibrit atölye + içerik lisansı',
      isbirligiModelleri: ['hibrit-atolye', 'ders-destek', 'kurumsal-lisans'],
      programIds: ['pr-04'], egitmenIds: [], etkinlikIds: ['et-01'],
      etkiGostergeleri: [{ ad: 'Yüz yüze atölye', deger: '12 oturum' }],
      onayKaydi: { tarih: '2026-04-02', yetkili: 'Okul Müdürlüğü', kapsam: 'Hibrit atölye programı ve ad kullanımı', belgeRef: 'PROT-2026-024' },
      durum: 'aktif'
    },
    {
      id: 'ku-03', slug: 'yesilova-belediyesi', ad: 'Yeşilova Belediyesi',
      tur: 'kamu', sehir: 'Yeşilova', ulke: 'Türkiye', web: null,
      logo: null, monogram: 'YB', ikon: 'fa-landmark',
      dogrulanmisPartner: true,
      tanitim: 'Kadın kooperatifleri ve genç istihdamı odaklı meslek edindirme programları yürütüyor.',
      isbirligiKapsami: 'Kamu sosyal etki programı',
      isbirligiModelleri: ['kamu-sosyal-etki', 'yerel-gastronomi', 'egitici-egitimi'],
      programIds: ['pr-03'], egitmenIds: [], etkinlikIds: ['et-03'],
      etkiGostergeleri: [
        { ad: 'Programı tamamlayan', deger: '96 katılımcı' },
        { ad: 'Kurulan kooperatif mutfağı', deger: '3' }
      ],
      onayKaydi: { tarih: '2026-02-20', yetkili: 'Sosyal Destek Hizmetleri Müdürlüğü', kapsam: 'Sosyal etki programı, katılımcı verisi ve rapor yayımı', belgeRef: 'PROT-2026-009' },
      durum: 'aktif'
    },
    {
      id: 'ku-04', slug: 'yesilova-mesleki-egitim-merkezi', ad: 'Yeşilova Mesleki Eğitim Merkezi',
      tur: 'meslek', sehir: 'Yeşilova', ulke: 'Türkiye', web: null,
      logo: null, monogram: 'YM', ikon: 'fa-school',
      dogrulanmisPartner: false,
      tanitim: 'Tamamlayıcı eğitim ve öğretici içerik desteği için ihtiyaç analizi aşamasında.',
      isbirligiKapsami: 'Görüşme sürüyor',
      isbirligiModelleri: ['ders-destek', 'egitici-egitimi'],
      programIds: [], egitmenIds: [], etkinlikIds: [],
      etkiGostergeleri: [],
      onayKaydi: null,               /* 🔴 onay yok → ortaklık/onay iddiası gösterilmez */
      durum: 'ihtiyac-analizi'
    },
    {
      id: 'ku-05', slug: 'zeytin-otelleri-grubu', ad: 'Zeytin Otelleri Grubu',
      tur: 'isletme', sehir: 'Muğla', ulke: 'Türkiye', web: null,
      logo: null, monogram: 'ZO', ikon: 'fa-hotel',
      dogrulanmisPartner: true,
      tanitim: 'Mutfak ekipleri için kurum içi yetkinlik ve eğitici eğitimi programları yürütüyor.',
      isbirligiKapsami: 'Kurumsal lisans + kurum içi program',
      isbirligiModelleri: ['kurumsal-lisans', 'surekli-egitim', 'ogrenci-proje'],
      programIds: ['pr-05'], egitmenIds: ['eg-06'], etkinlikIds: [],
      etkiGostergeleri: [{ ad: 'Kurum içi tamamlama', deger: '%78' }],
      onayKaydi: { tarih: '2026-05-11', yetkili: 'İnsan Kaynakları Direktörlüğü', kapsam: 'Kurumsal lisans, kohort yönetimi ve rapor erişimi', belgeRef: 'SOZ-2026-031' },
      durum: 'aktif'
    },
    {
      id: 'ku-06', slug: 'altinkum-universitesi', ad: 'Altınkum Üniversitesi',
      tur: 'universite', sehir: 'Aydın', ulke: 'Türkiye', web: null,
      logo: null, monogram: 'AÜ', ikon: 'fa-building-columns',
      dogrulanmisPartner: false,
      tanitim: 'Turizm Fakültesi ile ortak sürekli eğitim programı için teklif aşamasında.',
      isbirligiKapsami: 'Teklif aşaması',
      isbirligiModelleri: ['surekli-egitim', 'ortak-sertifika'],
      programIds: [], egitmenIds: [], etkinlikIds: [],
      etkiGostergeleri: [],
      onayKaydi: null,               /* 🔴 onay yok */
      durum: 'teklif'
    }
  ];

  /* ======================================================================
     4. RUBRİKLER (§14.2)
     ====================================================================== */
  var rubrikler = [
    {
      id: 'rb-01', ad: 'Uygulama Değerlendirme Rubriği (temel)',
      gecmeNotu: 70,
      kriterler: [
        { ad: 'Teknik doğruluk',            aciklama: 'Tekniğin adımlarına ve sırasına uyum',              maxPuan: 25, ornek: 'Bıçak tutuşu ve doğrama boyutu tutarlı' },
        { ad: 'Hijyen ve güvenlik',         aciklama: 'Çapraz bulaşma, sıcaklık ve alan düzeni',           maxPuan: 20, ornek: 'Çiğ/pişmiş ayrı tahta kullanımı' },
        { ad: 'Süreç yönetimi',             aciklama: 'Mise en place, zamanlama ve sıralama',              maxPuan: 15, ornek: 'Tüm malzeme pişirmeden önce hazır' },
        { ad: 'Tat / doku değerlendirmesi', aciklama: 'Yalnız uygun gözlem varsa puanlanır',               maxPuan: 15, ornek: 'Eğitmen canlı oturumda tattıysa' },
        { ad: 'Sunum ve görsel düzen',      aciklama: 'Tabak dengesi, temizlik, porsiyon',                 maxPuan: 10, ornek: 'Kenarlar temiz, porsiyon dengeli' },
        { ad: 'Görev kriterine uyum',       aciklama: 'Tarif/görev yönergesine uygunluk',                  maxPuan: 10, ornek: 'İstenen pişirme derecesi tutturulmuş' },
        { ad: 'Yansıtma notu',              aciklama: 'Ne zorlandı, nasıl çözüldü açıklaması',             maxPuan: 5,  ornek: 'Hamur açılmadı; dinlenme süresi uzatıldı' }
      ]
    }
  ];

  /* ======================================================================
     5. EĞİTİMLER (§18.1)
        6 eğitim akademi-v1.html'den birebir taşındı (ad, seviye, ders sayısı,
        süre, uygulama sayısı, kapak, eğitmen). Ürün durumu KAYIT DÖNEMİ olduğu
        için durum='yayinda' (§6.3 satır 2, Beyar kararı) — "Yakında" yok.
     ====================================================================== */
  var egitimler = [
    {
      id: 'ed-01', slug: 'sifirdan-mutfak-temel-teknikler',
      ad: 'Sıfırdan Mutfak: Temel Teknikler Atölyesi',
      ozet: 'Bıçak tutuşundan temel pişirme tekniklerine kadar mutfağın taban becerileri.',
      kategori: 'temel-mutfak', seviye: 'baslangic', format: 'video', dil: 'Türkçe', altyazi: ['Türkçe'],
      sureDk: 380, dersSayisi: 14, uygulamaSayisi: 9,
      erisim: 'tek-satin', fiyat: 1290, erisimSuresi: '12 ay',
      egitmenId: 'eg-01', kurumIds: [], onayTuru: null,
      kapak: F.temelMutfak,
      onKosullar: ['Ön koşul yok — sıfırdan başlayanlar için tasarlandı.'],
      kazanimlar: [
        'Bıçağı güvenli tutar ve dört temel doğrama biçimini uygular.',
        'Sote, haşlama ve fırın tekniklerini malzemeye göre seçer.',
        'Mise en place kurar ve çok adımlı bir tarifi zamanlar.',
        'Temel hijyen ve çapraz bulaşma kurallarını uygular.'
      ],
      bolumler: [
        { ad: 'Mutfağa Hazırlık', dersler: [
          { ad: 'Mutfak düzeni ve mise en place', sureDk: 18, onizleme: true },
          { ad: 'Bıçak türleri ve güvenli tutuş',  sureDk: 22, onizleme: true },
          { ad: 'Dört temel doğrama',              sureDk: 26, onizleme: false }
        ]},
        { ad: 'Isı ve Teknik', dersler: [
          { ad: 'Sote: yüksek ısı, az yağ',        sureDk: 24, onizleme: false },
          { ad: 'Haşlama ve buharda pişirme',      sureDk: 21, onizleme: false },
          { ad: 'Fırın: kuru ısı davranışı',       sureDk: 28, onizleme: false }
        ]},
        { ad: 'Uygulama', dersler: [
          { ad: 'Uygulama: sebzeli sote tabağı',   sureDk: 32, onizleme: false },
          { ad: 'Uygulama: fırında tavuk',         sureDk: 35, onizleme: false }
        ]}
      ],
      uygulamalar: ['Sebzeli sote tabağı', 'Fırında bütün tavuk', 'Temel et suyu'],
      quizler: ['Bıçak ve doğrama', 'Isı transferi'],
      rubrikId: 'rb-01', belgeTuru: 'basari',
      basariKosulu: 'Zorunlu 14 dersin tamamlanması + 9 uygulamanın en az 7\'sinin kabulü + quiz ortalaması ≥70.',
      durum: 'yayinda', surum: '1.0',
      hazirlayan: 'DadaCampus İçerik Ekibi', editor: 'DadaCampus Editoryal', akademikKontrol: null,
      sonGuncelleme: '2026-07-28'
    },
    {
      id: 'ed-02', slug: 'mayali-hamurun-sirri-ekmek-firin',
      ad: 'Mayalı Hamurun Sırrı: Ekmek & Fırın',
      ozet: 'Maya, fermantasyon ve fırın kontrolüyle evde tutarlı ekmek.',
      kategori: 'ekmek-fermantasyon', seviye: 'orta', format: 'video', dil: 'Türkçe', altyazi: ['Türkçe'],
      sureDk: 310, dersSayisi: 12, uygulamaSayisi: 7,
      erisim: 'tek-satin', fiyat: 1190, erisimSuresi: '12 ay',
      egitmenId: 'eg-03', kurumIds: ['ku-02'], onayTuru: 'icerik-ortakligi',
      kapak: F.ekmek,
      onKosullar: ['Temel mutfak deneyimi önerilir.'],
      kazanimlar: [
        'Hidrasyon oranını hesaplar ve hamura göre ayarlar.',
        'Birinci ve ikinci fermantasyonu hamurun davranışından okur.',
        'Ekşi maya başlatır ve besleme döngüsünü sürdürür.',
        'Fırın buharı ve sıcaklık eğrisini kabuk hedefine göre kurar.'
      ],
      bolumler: [
        { ad: 'Hamurun Temelleri', dersler: [
          { ad: 'Un, su, tuz, maya: dört değişken', sureDk: 20, onizleme: true },
          { ad: 'Hidrasyon ve yoğurma',             sureDk: 26, onizleme: false },
          { ad: 'Gluten gelişimi nasıl anlaşılır',  sureDk: 22, onizleme: false }
        ]},
        { ad: 'Fermantasyon', dersler: [
          { ad: 'Birinci fermantasyon',             sureDk: 24, onizleme: false },
          { ad: 'Şekillendirme ve gerginlik',       sureDk: 28, onizleme: false },
          { ad: 'Ekşi maya başlatma ve besleme',    sureDk: 30, onizleme: false }
        ]},
        { ad: 'Fırın', dersler: [
          { ad: 'Buhar, sıcaklık ve kabuk',         sureDk: 25, onizleme: false },
          { ad: 'Uygulama: ekşi mayalı somun',      sureDk: 38, onizleme: false }
        ]}
      ],
      uygulamalar: ['Temel beyaz somun', 'Ekşi mayalı somun', 'Focaccia'],
      quizler: ['Hidrasyon hesabı', 'Fermantasyon işaretleri'],
      rubrikId: 'rb-01', belgeTuru: 'basari',
      basariKosulu: 'Zorunlu 12 dersin tamamlanması + 7 uygulamanın en az 5\'inin kabulü.',
      durum: 'yayinda', surum: '1.0',
      hazirlayan: 'DadaCampus İçerik Ekibi', editor: 'DadaCampus Editoryal', akademikKontrol: null,
      sonGuncelleme: '2026-07-30'
    },
    {
      id: 'ed-03', slug: 'et-izgara-teknikleri',
      ad: 'Et & Izgara Teknikleri: Dereceyi Tutturmak',
      ozet: 'Et kesimleri, dinlendirme ve pişirme derecesi kontrolü.',
      kategori: 'pisirme-soslar', seviye: 'orta', format: 'video', dil: 'Türkçe', altyazi: ['Türkçe'],
      sureDk: 280, dersSayisi: 10, uygulamaSayisi: 6,
      erisim: 'tek-satin', fiyat: 1190, erisimSuresi: '12 ay',
      egitmenId: 'eg-01', kurumIds: [], onayTuru: null,
      kapak: F.et,
      onKosullar: ['Temel pişirme tekniklerini bilmek önerilir.'],
      kazanimlar: [
        'Kesimi hedeflenen pişirme yöntemine göre seçer.',
        'İç sıcaklıkla pişirme derecesini tutturur.',
        'Maillard reaksiyonu için yüzey ve ısı koşulunu kurar.',
        'Dinlendirme süresini kesim kalınlığına göre ayarlar.'
      ],
      bolumler: [
        { ad: 'Et Bilgisi', dersler: [
          { ad: 'Kesimler ve hangi teknik',   sureDk: 24, onizleme: true },
          { ad: 'Tuzlama ve kuru salamura',   sureDk: 20, onizleme: false }
        ]},
        { ad: 'Isı Kontrolü', dersler: [
          { ad: 'Maillard ve yüzey kuruluğu', sureDk: 26, onizleme: false },
          { ad: 'İç sıcaklık ve dereceler',   sureDk: 30, onizleme: false },
          { ad: 'Dinlendirme',                sureDk: 18, onizleme: false }
        ]},
        { ad: 'Uygulama', dersler: [
          { ad: 'Uygulama: kontrfile',        sureDk: 34, onizleme: false },
          { ad: 'Uygulama: bütün tavuk baget', sureDk: 30, onizleme: false }
        ]}
      ],
      uygulamalar: ['Kontrfile (medium rare)', 'Izgara tavuk', 'Pan sauce'],
      quizler: ['Kesim–teknik eşleşmesi', 'İç sıcaklık tablosu'],
      rubrikId: 'rb-01', belgeTuru: 'basari',
      basariKosulu: 'Zorunlu 10 dersin tamamlanması + 6 uygulamanın en az 4\'ünün kabulü.',
      durum: 'yayinda', surum: '1.0',
      hazirlayan: 'DadaCampus İçerik Ekibi', editor: 'DadaCampus Editoryal', akademikKontrol: null,
      sonGuncelleme: '2026-07-22'
    },
    {
      id: 'ed-04', slug: 'pastane-sanati-pasta-tart-tatli',
      ad: 'Pastane Sanatı: Pasta, Tart & Tatlı',
      ozet: 'Ölçü disiplini, kremalar ve tart hamurundan tam pastaya.',
      kategori: 'pastacilik', seviye: 'ileri', format: 'video', dil: 'Türkçe', altyazi: ['Türkçe', 'İngilizce'],
      sureDk: 435, dersSayisi: 16, uygulamaSayisi: 11,
      erisim: 'tek-satin', fiyat: 1490, erisimSuresi: '18 ay',
      egitmenId: 'eg-02', kurumIds: [], onayTuru: null,
      kapak: F.pasta,
      onKosullar: ['Temel hamur ve fırın deneyimi gerekir.', 'Mutfak terazisi zorunlu.'],
      kazanimlar: [
        'Gramaj disiplinini kurar ve tarifi ölçekler.',
        'Pastacı kreması, ganaj ve İtalyan beze yapar.',
        'Tart hamurunu büzülmeden pişirir.',
        'Katlı pastayı düzgün kaplar ve sıcaklık zincirini korur.'
      ],
      bolumler: [
        { ad: 'Ölçü ve Temel', dersler: [
          { ad: 'Terazi, gramaj, ölçekleme',   sureDk: 22, onizleme: true },
          { ad: 'Tart hamuru',                 sureDk: 28, onizleme: false },
          { ad: 'Pastacı kreması',             sureDk: 26, onizleme: false }
        ]},
        { ad: 'Kremalar ve Bezeler', dersler: [
          { ad: 'Ganaj oranları',              sureDk: 24, onizleme: false },
          { ad: 'İtalyan beze',                sureDk: 30, onizleme: false }
        ]},
        { ad: 'Bitirme', dersler: [
          { ad: 'Katlı pasta kaplama',         sureDk: 36, onizleme: false },
          { ad: 'Uygulama: meyveli tart',      sureDk: 40, onizleme: false }
        ]}
      ],
      uygulamalar: ['Meyveli tart', 'Çikolatalı ganaj pasta', 'Limonlu beze tart'],
      quizler: ['Gramaj ve ölçekleme', 'Krema kararlılığı'],
      rubrikId: 'rb-01', belgeTuru: 'basari',
      basariKosulu: 'Zorunlu 16 dersin tamamlanması + 11 uygulamanın en az 8\'inin kabulü + quiz ortalaması ≥70.',
      durum: 'yayinda', surum: '1.0',
      hazirlayan: 'DadaCampus İçerik Ekibi', editor: 'DadaCampus Editoryal', akademikKontrol: null,
      sonGuncelleme: '2026-08-04'
    },
    {
      id: 'ed-05', slug: 'dunya-mutfaklari-akdeniz-uzakdogu',
      ad: 'Dünya Mutfakları: Akdeniz\'den Uzakdoğu\'ya',
      ozet: 'Mutfakları teknik ortaklıkları üzerinden karşılaştırmalı öğrenme.',
      kategori: 'dunya-mutfaklari', seviye: 'orta', format: 'hibrit', dil: 'Türkçe', altyazi: ['Türkçe', 'İngilizce'],
      sureDk: 485, dersSayisi: 18, uygulamaSayisi: 12,
      erisim: 'uyelik', fiyat: null, erisimSuresi: 'Üyelik süresince',
      egitmenId: 'eg-04', kurumIds: [], onayTuru: null,
      kapak: F.dunya,
      onKosullar: ['Temel doğrama ve pişirme tekniklerini bilmek gerekir.'],
      kazanimlar: [
        'Beş mutfağın taban tat profilini kurar.',
        'Wok ve tava arasındaki ısı davranışı farkını uygular.',
        'Baharat kavurma ve yağ aktarma tekniklerini kullanır.',
        'Bir tarifi bulunabilir malzemeyle uyarlar.'
      ],
      bolumler: [
        { ad: 'Akdeniz', dersler: [
          { ad: 'Zeytinyağı, limon, otlar', sureDk: 24, onizleme: true },
          { ad: 'Uygulama: İtalyan makarna', sureDk: 32, onizleme: false }
        ]},
        { ad: 'Uzakdoğu', dersler: [
          { ad: 'Wok ısısı ve hazırlık',    sureDk: 28, onizleme: false },
          { ad: 'Umami katmanları',         sureDk: 26, onizleme: false },
          { ad: 'Uygulama: wok sote',       sureDk: 34, onizleme: false }
        ]},
        { ad: 'Baharat', dersler: [
          { ad: 'Kavurma ve yağ aktarma',   sureDk: 25, onizleme: false }
        ]}
      ],
      uygulamalar: ['İtalyan makarna', 'Wok sote', 'Baharat karışımı'],
      quizler: ['Tat profili eşleştirme'],
      rubrikId: 'rb-01', belgeTuru: 'basari',
      basariKosulu: 'Zorunlu 18 dersin tamamlanması + 12 uygulamanın en az 9\'unun kabulü.',
      durum: 'yayinda', surum: '1.0',
      hazirlayan: 'DadaCampus İçerik Ekibi', editor: 'DadaCampus Editoryal', akademikKontrol: null,
      sonGuncelleme: '2026-08-09'
    },
    {
      id: 'ed-06', slug: 'profesyonel-sunum-tabak-tasarimi',
      ad: 'Profesyonel Sunum & Tabak Tasarımı',
      ozet: 'Tabak kompozisyonu, servis sıcaklığı ve görsel denge.',
      kategori: 'girisimcilik', seviye: 'ileri', format: 'video', dil: 'Türkçe', altyazi: ['Türkçe'],
      sureDk: 210, dersSayisi: 8, uygulamaSayisi: 5,
      erisim: 'ucretsiz', fiyat: 0, erisimSuresi: 'Süresiz',
      egitmenId: 'eg-02', kurumIds: ['ku-01'], onayTuru: 'akademik-inceleme',
      kapak: F.sunum,
      onKosullar: ['Ön koşul yok.'],
      kazanimlar: [
        'Tabakta odak noktası ve boşluk dengesi kurar.',
        'Servis sıcaklığını tabak ve zamanlamayla korur.',
        'Sos ve garnitürü kompozisyona göre yerleştirir.'
      ],
      bolumler: [
        { ad: 'Kompozisyon', dersler: [
          { ad: 'Odak, boşluk, denge',   sureDk: 22, onizleme: true },
          { ad: 'Renk ve doku karşıtlığı', sureDk: 24, onizleme: true },
          { ad: 'Sos yerleştirme',        sureDk: 26, onizleme: false }
        ]},
        { ad: 'Servis', dersler: [
          { ad: 'Tabak sıcaklığı ve zamanlama', sureDk: 20, onizleme: false },
          { ad: 'Uygulama: üç tabak kompozisyonu', sureDk: 34, onizleme: false }
        ]}
      ],
      uygulamalar: ['Ana yemek tabağı', 'Tatlı tabağı', 'Meze kompozisyonu'],
      quizler: ['Kompozisyon ilkeleri'],
      rubrikId: 'rb-01', belgeTuru: 'mikro-kazanim',
      basariKosulu: 'Zorunlu 8 dersin tamamlanması + 5 uygulamanın en az 3\'ünün kabulü.',
      durum: 'yayinda', surum: '1.1',
      hazirlayan: 'DadaCampus İçerik Ekibi', editor: 'DadaCampus Editoryal',
      akademikKontrol: 'eg-05', sonGuncelleme: '2026-08-12'
    }
  ];

  /* ======================================================================
     6. PROGRAMLAR (§18.2) — her türden en az bir örnek (§8.2 tür filtresi)
     ====================================================================== */
  var programlar = [
    {
      id: 'pr-01', slug: 'temel-mutfak-uzmanlik-programi',
      ad: 'Temel Mutfak Uzmanlık Programı', tur: 'sertifika',
      ozet: 'Temel teknikten sunuma, değerlendirmeli ve belgeli uzmanlık hattı.',
      donem: '2026 Güz', durum: 'kayit-acik',
      partnerKurumIds: [], kurumRolleri: {},
      yoneticiId: 'eg-01', koordinatorId: null,
      egitmenIds: ['eg-01', 'eg-02'], degerlendiriciIds: ['eg-02'],
      hedefKitle: 'Mutfağa yeni başlayan ve yapılandırılmış bir yol arayan bireysel öğrenenler.',
      kabulKosullari: ['Ön koşul yok.', '18 yaş ve üzeri.'],
      basvuruBelgeleri: ['Kimlik doğrulama'],
      kontenjan: 60, basvuranSayisi: 41,
      basvuruBaslangic: '2026-08-01', basvuruBitis: '2026-09-15',
      baslangic: '2026-09-28', bitis: '2027-01-18',
      haftalikYuk: '4–6 saat',
      moduller: [
        { ad: 'Modül 1 — Taban Beceriler', egitimIds: ['ed-01'] },
        { ad: 'Modül 2 — Isı ve Teknik',   egitimIds: ['ed-03'] },
        { ad: 'Modül 3 — Sunum',           egitimIds: ['ed-06'] }
      ],
      akademikTakvim: [
        { tarih: '2026-09-28', ad: 'Program açılış oturumu', tur: 'acik-ders' },
        { tarih: '2026-10-26', ad: 'Canlı uygulama atölyesi 1', tur: 'canli-uygulama' },
        { tarih: '2026-12-14', ad: 'Ara değerlendirme teslimi', tur: 'teslim' },
        { tarih: '2027-01-18', ad: 'Bitirme uygulaması sunumu', tur: 'yarisma' }
      ],
      kazanimMatrisi: [
        { kazanim: 'Temel doğrama ve mise en place', degerlendirme: 'Uygulama 1 + quiz' },
        { kazanim: 'Isı kontrolü ve pişirme derecesi', degerlendirme: 'Uygulama 2 + quiz' },
        { kazanim: 'Tabak kompozisyonu', degerlendirme: 'Bitirme uygulaması' }
      ],
      devamKurali: 'Canlı oturumların en az %70\'ine katılım.',
      basariKosulu: 'Tüm zorunlu eğitimlerin tamamlanması + uygulama teslimlerinin kabulü + quiz ortalaması ≥70.',
      tekrarHakki: 'Başarısız uygulama için bir revizyon + bir tekrar hakkı.',
      itirazSureci: 'Sonuç bildiriminden itibaren 7 gün içinde yazılı itiraz; program yöneticisi ve bir bağımsız değerlendirici inceler.',
      belgeTuru: 'basari', verenKurumIds: [],
      ucret: 3490, burs: 'Kontenjanın %10\'u ihtiyaç bursu.',
      kapak: F.temelMutfak
    },
    {
      id: 'pr-02', slug: 'gastronomi-surekli-egitim-programi',
      ad: 'Gastronomi Sürekli Eğitim Programı', tur: 'universite-ortak',
      ozet: 'Yeşilova Üniversitesi Sürekli Eğitim Merkezi ile birlikte yürütülen ortak program.',
      donem: '2026 Güz', durum: 'kayit-acik',
      partnerKurumIds: ['ku-01'],
      kurumRolleri: { 'ku-01': 'Akademik onay ve ortak belge' },
      yoneticiId: 'eg-05', koordinatorId: 'eg-05',
      egitmenIds: ['eg-04', 'eg-05'], degerlendiriciIds: ['eg-05'],
      hedefKitle: 'Gastronomi öğrencileri, sektör çalışanları ve mesleki gelişim arayan profesyoneller.',
      kabulKosullari: ['Ön lisans/lisans öğrencisi veya mezunu ya da 2 yıl sektör deneyimi.'],
      basvuruBelgeleri: ['Öğrenci belgesi veya deneyim beyanı', 'Kimlik doğrulama'],
      kontenjan: 40, basvuranSayisi: 33,
      basvuruBaslangic: '2026-08-05', basvuruBitis: '2026-09-20',
      baslangic: '2026-10-05', bitis: '2027-02-08',
      haftalikYuk: '6–8 saat',
      moduller: [
        { ad: 'Modül 1 — Karşılaştırmalı Mutfak', egitimIds: ['ed-05'] },
        { ad: 'Modül 2 — Sunum ve Duyusal Değerlendirme', egitimIds: ['ed-06'] }
      ],
      akademikTakvim: [
        { tarih: '2026-10-05', ad: 'Ortak açılış dersi', tur: 'acik-ders' },
        { tarih: '2026-11-09', ad: 'Yüz yüze kurum atölyesi', tur: 'yuz-yuze' },
        { tarih: '2027-01-11', ad: 'Duyusal analiz paneli', tur: 'panel' },
        { tarih: '2027-02-08', ad: 'Bitirme projesi sunumu', tur: 'yarisma' }
      ],
      kazanimMatrisi: [
        { kazanim: 'Karşılaştırmalı teknik analiz', degerlendirme: 'Modül 1 uygulaması' },
        { kazanim: 'Duyusal değerlendirme paneli yürütme', degerlendirme: 'Panel katılımı + rapor' }
      ],
      devamKurali: 'Yüz yüze oturuma katılım zorunlu; canlı oturumlarda %70 devam.',
      basariKosulu: 'Modül teslimlerinin kabulü + bitirme projesinin ≥70 puan alması + yüz yüze oturuma katılım.',
      tekrarHakki: 'Bitirme projesi için bir revizyon hakkı.',
      itirazSureci: 'Kurum ve DadaCampus temsilcisinin birlikte incelediği 10 günlük itiraz süreci.',
      belgeTuru: 'ortak-program', verenKurumIds: ['ku-01'],
      ucret: 4900, burs: 'Kurum öğrencilerine %25 indirim.',
      kapak: F.dunya
    },
    {
      id: 'pr-03', slug: 'kooperatif-mutfagi-meslek-edindirme',
      ad: 'Kooperatif Mutfağı Meslek Edindirme Programı', tur: 'kamu',
      ozet: 'Yeşilova Belediyesi ile yürütülen, kadın kooperatiflerine yönelik sosyal etki programı.',
      donem: '2026 Güz', durum: 'aktif',
      partnerKurumIds: ['ku-03'],
      kurumRolleri: { 'ku-03': 'Katılımcı seçimi, mekân ve sosyal etki raporlaması' },
      yoneticiId: 'eg-02', koordinatorId: 'eg-02',
      egitmenIds: ['eg-02', 'eg-03'], degerlendiriciIds: ['eg-02'],
      hedefKitle: 'Kooperatif üyesi kadınlar ve yerel üretici gruplar.',
      kabulKosullari: ['Kurum tarafından yönlendirilmiş katılımcı olmak.'],
      basvuruBelgeleri: ['Kurum yönlendirme yazısı'],
      kontenjan: 30, basvuranSayisi: 30,
      basvuruBaslangic: '2026-06-01', basvuruBitis: '2026-07-15',
      baslangic: '2026-08-03', bitis: '2026-11-30',
      haftalikYuk: '8 saat (hibrit)',
      moduller: [
        { ad: 'Modül 1 — Gıda Güvenliği ve Hijyen', egitimIds: ['ed-01'] },
        { ad: 'Modül 2 — Üretim ve Paketleme',      egitimIds: ['ed-02'] }
      ],
      akademikTakvim: [
        { tarih: '2026-08-03', ad: 'Program tanıtımı', tur: 'acik-ders' },
        { tarih: '2026-09-07', ad: 'Kurum mutfağında yüz yüze atölye', tur: 'yuz-yuze' },
        { tarih: '2026-11-30', ad: 'Program kapanışı ve etki raporu', tur: 'panel' }
      ],
      kazanimMatrisi: [
        { kazanim: 'Hijyen ve saklama uygulaması', degerlendirme: 'Yüz yüze gözlem + kontrol listesi' },
        { kazanim: 'Küçük ölçekli üretim planı', degerlendirme: 'Modül 2 teslimi' }
      ],
      devamKurali: 'Yüz yüze oturumların en az %80\'ine katılım.',
      basariKosulu: 'Devam koşulu + kontrol listesinin karşılanması.',
      tekrarHakki: 'Kaçırılan yüz yüze oturum bir sonraki kohortta telafi edilir.',
      itirazSureci: 'Kurum koordinatörüne yazılı başvuru; 7 gün içinde yanıt.',
      belgeTuru: 'katilim', verenKurumIds: ['ku-03'],
      ucret: 0, burs: 'Program kamu bütçesiyle desteklenir; katılımcıdan ücret alınmaz.',
      kapak: F.baharat
    },
    {
      id: 'pr-04', slug: 'hibrit-firincilik-atolye-programi',
      ad: 'Hibrit Fırıncılık Atölye Programı', tur: 'mutfak-okulu',
      ozet: 'Nar Mutfak Sanatları Okulu\'nun uygulama mutfağında online teori + yüz yüze uygulama.',
      donem: '2026 Güz', durum: 'kayit-acik',
      partnerKurumIds: ['ku-02'],
      kurumRolleri: { 'ku-02': 'Uygulama mutfağı, yüz yüze eğitmen ve iş sağlığı sorumluluğu' },
      yoneticiId: 'eg-03', koordinatorId: null,
      egitmenIds: ['eg-03'], degerlendiriciIds: ['eg-03'],
      hedefKitle: 'Fırıncılık alanında pratik yapmak isteyen orta seviye öğrenenler.',
      kabulKosullari: ['Temel hamur deneyimi.', 'Yüz yüze oturumlara İzmir\'de katılabilmek.'],
      basvuruBelgeleri: ['Kimlik doğrulama'],
      kontenjan: 18, basvuranSayisi: 15,
      basvuruBaslangic: '2026-08-10', basvuruBitis: '2026-09-25',
      baslangic: '2026-10-12', bitis: '2026-12-21',
      haftalikYuk: '5 saat + 2 haftada bir yüz yüze',
      moduller: [
        { ad: 'Modül 1 — Online Teori',       egitimIds: ['ed-02'] },
        { ad: 'Modül 2 — Uygulama Mutfağı',   egitimIds: [] }
      ],
      akademikTakvim: [
        { tarih: '2026-10-12', ad: 'Online açılış', tur: 'acik-ders' },
        { tarih: '2026-10-26', ad: 'Yüz yüze atölye 1', tur: 'yuz-yuze' },
        { tarih: '2026-11-23', ad: 'Yüz yüze atölye 2', tur: 'yuz-yuze' },
        { tarih: '2026-12-21', ad: 'Bitirme fırınlaması', tur: 'yuz-yuze' }
      ],
      kazanimMatrisi: [
        { kazanim: 'Ekşi maya döngüsü yönetimi', degerlendirme: 'Online teslim + yüz yüze gözlem' },
        { kazanim: 'Profesyonel fırın kullanımı', degerlendirme: 'Yüz yüze gözlem' }
      ],
      devamKurali: 'Dört yüz yüze oturumdan en az üçüne katılım zorunlu.',
      basariKosulu: 'Devam koşulu + bitirme fırınlamasının kabulü.',
      tekrarHakki: 'Bir yüz yüze oturum sonraki dönemde telafi edilebilir.',
      itirazSureci: 'Okul ve DadaCampus ortak incelemesi, 10 gün.',
      belgeTuru: 'ortak-program', verenKurumIds: ['ku-02'],
      ucret: 5200, burs: 'Okul öğrencilerine %20 indirim.',
      kapak: F.ekmek
    },
    {
      id: 'pr-05', slug: 'mutfak-ekibi-yetkinlik-programi',
      ad: 'Mutfak Ekibi Yetkinlik Programı', tur: 'kurumsal',
      ozet: 'Zeytin Otelleri Grubu mutfak ekipleri için kurum içi yetkinlik ve maliyet programı.',
      donem: '2026 Güz', durum: 'aktif',
      partnerKurumIds: ['ku-05'],
      kurumRolleri: { 'ku-05': 'Katılımcı ataması, kontenjan lisansı ve rapor erişimi' },
      yoneticiId: 'eg-06', koordinatorId: 'eg-06',
      egitmenIds: ['eg-01', 'eg-06'], degerlendiriciIds: ['eg-06'],
      hedefKitle: 'Kurumun kendi mutfak ekipleri; kapalı kurumsal program.',
      kabulKosullari: ['Kurum tarafından atanmış olmak.'],
      basvuruBelgeleri: [],
      kontenjan: 120, basvuranSayisi: 94,
      basvuruBaslangic: '2026-07-01', basvuruBitis: '2026-08-15',
      baslangic: '2026-09-01', bitis: '2027-03-01',
      haftalikYuk: '3 saat',
      moduller: [
        { ad: 'Modül 1 — Standart Teknikler', egitimIds: ['ed-01', 'ed-03'] },
        { ad: 'Modül 2 — Maliyet ve Menü',    egitimIds: [] }
      ],
      akademikTakvim: [
        { tarih: '2026-09-01', ad: 'Kuruma özel açılış oturumu', tur: 'kapali-oturum' },
        { tarih: '2026-12-08', ad: 'Ara değerlendirme', tur: 'teslim' }
      ],
      kazanimMatrisi: [
        { kazanim: 'Standart tarif uygulaması', degerlendirme: 'Kurum içi gözlem + teslim' },
        { kazanim: 'Porsiyon maliyeti hesaplama', degerlendirme: 'Vaka çalışması' }
      ],
      devamKurali: 'Kurumun belirlediği devam kuralı geçerlidir.',
      basariKosulu: 'Modül teslimlerinin kabulü + kurum yetkilisinin onayı.',
      tekrarHakki: 'Kurum kuralına bağlı.',
      itirazSureci: 'Kurum koordinatörü üzerinden yürütülür.',
      belgeTuru: 'kurum-ici', verenKurumIds: ['ku-05'],
      ucret: null, burs: null, lisansModeli: 'Kurum koltuk lisansı (120 kontenjan / 1 dönem)',
      kapak: F.sunum
    }
  ];

  /* ======================================================================
     7. ATÖLYELER (§13.2) — belirli tarihli canlı/yüz yüze uygulama
     ====================================================================== */
  var atolyeler = [
    {
      id: 'at-01', slug: 'canli-eksi-maya-atolyesi',
      ad: 'Canlı Ekşi Maya Atölyesi', tur: 'canli-uygulama',
      ozet: 'Ekşi mayayı başlatıp beslemeyi şefle aynı anda uygulayın.',
      tarih: '2026-09-19', saat: '20:00', saatDilimi: 'Europe/Istanbul', sureDk: 120,
      format: 'canli', konum: null, onlineBaglanti: true,
      egitmenId: 'eg-03', partnerKurumId: null, programId: null,
      kontenjan: 80, kayitliSayisi: 52, kayitKapanis: '2026-09-18',
      malzeme: ['500 g ekmek unu', '400 ml su', '10 g tuz', 'Cam kavanoz'],
      ekipman: ['Mutfak terazisi', 'Hamur kazıyıcı'],
      onHazirlik: 'Atölyeden 3 gün önce ekşi maya başlatma videosunu izleyin.',
      ucret: 240, kurumErisimi: false,
      kayitAlinacak: true, erisimSuresi: '30 gün',
      katilimBelgesi: { verilir: true, kosul: 'Oturumun en az %80\'ine katılım.' },
      iptalKurali: 'Oturumdan 48 saat öncesine kadar tam iade.',
      durum: 'kayit-acik', kapak: F.ekmek
    },
    {
      id: 'at-02', slug: 'yuz-yuze-firincilik-atolyesi-izmir',
      ad: 'Yüz Yüze Fırıncılık Atölyesi (İzmir)', tur: 'yuz-yuze',
      ozet: 'Nar Mutfak Sanatları Okulu uygulama mutfağında profesyonel fırın deneyimi.',
      tarih: '2026-10-26', saat: '10:00', saatDilimi: 'Europe/Istanbul', sureDk: 300,
      format: 'yuz-yuze', konum: 'Nar Mutfak Sanatları Okulu, İzmir', onlineBaglanti: false,
      egitmenId: 'eg-03', partnerKurumId: 'ku-02', programId: 'pr-04',
      kontenjan: 18, kayitliSayisi: 15, kayitKapanis: '2026-10-20',
      malzeme: ['Kurum tarafından sağlanır'],
      ekipman: ['Önlük ve kapalı ayakkabı katılımcıda'],
      onHazirlik: 'İş sağlığı ve güvenliği bilgilendirmesini onaylayın.',
      ucret: null, kurumErisimi: true,
      kayitAlinacak: false, erisimSuresi: null,
      katilimBelgesi: { verilir: true, kosul: 'Oturumun tamamına katılım ve güvenlik kurallarına uyum.' },
      iptalKurali: 'Kontenjan devri yalnız program koordinatörü onayıyla.',
      durum: 'kayit-acik', kapak: F.temelMutfak
    },
    {
      id: 'at-03', slug: 'canli-tabak-tasarimi-atolyesi',
      ad: 'Canlı Tabak Tasarımı Atölyesi', tur: 'canli-uygulama',
      ozet: 'Üç tabak kompozisyonunu birlikte kurup geri bildirim alın.',
      tarih: '2026-09-30', saat: '21:00', saatDilimi: 'Europe/Istanbul', sureDk: 90,
      format: 'canli', konum: null, onlineBaglanti: true,
      egitmenId: 'eg-02', partnerKurumId: null, programId: 'pr-01',
      kontenjan: 60, kayitliSayisi: 28, kayitKapanis: '2026-09-29',
      malzeme: ['Beyaz düz tabak (2 adet)', 'Hazır garnitür malzemeleri'],
      ekipman: ['Pens', 'Sos şişesi'],
      onHazirlik: 'Sunum modülünün ilk iki dersini izleyin.',
      ucret: 180, kurumErisimi: false,
      kayitAlinacak: true, erisimSuresi: '30 gün',
      katilimBelgesi: { verilir: false, kosul: null },
      iptalKurali: 'Oturumdan 24 saat öncesine kadar tam iade.',
      durum: 'kayit-acik', kapak: F.sunum
    },
    {
      id: 'at-04', slug: 'kooperatif-mutfagi-kapali-oturum',
      ad: 'Kooperatif Mutfağı Kapalı Oturumu', tur: 'kapali-oturum',
      ozet: 'Yalnız program kohortuna açık yüz yüze uygulama oturumu.',
      tarih: '2026-09-07', saat: '09:30', saatDilimi: 'Europe/Istanbul', sureDk: 240,
      format: 'yuz-yuze', konum: 'Yeşilova Belediyesi Kooperatif Mutfağı', onlineBaglanti: false,
      egitmenId: 'eg-02', partnerKurumId: 'ku-03', programId: 'pr-03',
      kontenjan: 30, kayitliSayisi: 30, kayitKapanis: '2026-09-01',
      malzeme: ['Kurum tarafından sağlanır'], ekipman: ['Kurum tarafından sağlanır'],
      onHazirlik: 'Hijyen modülünü tamamlayın.',
      ucret: 0, kurumErisimi: true,
      kayitAlinacak: false, erisimSuresi: null,
      katilimBelgesi: { verilir: true, kosul: 'Oturuma katılım ve kontrol listesinin karşılanması.' },
      iptalKurali: 'Kurum koordinatörü yönetir.',
      durum: 'kontenjan-doldu', kapak: F.baharat
    }
  ];

  /* ======================================================================
     8. ETKİNLİKLER (§13.1) — seminer, söyleşi, panel, yarışma
     ====================================================================== */
  var etkinlikler = [
    {
      id: 'et-01', slug: 'yerel-urunler-paneli',
      ad: 'Yerel Ürünler Paneli', tur: 'panel',
      konu: 'Yerel üretici–mutfak ilişkisi ve tedarik',
      hedefKitle: 'Öğrenciler, üreticiler, işletme sahipleri',
      tarih: '2026-10-08', saat: '19:00', sureDk: 90, format: 'canli',
      konusmaciId: 'eg-04', partnerKurumId: 'ku-02', programId: null,
      kontenjan: 300, ucret: 0, kayitAlinacak: true,
      durum: 'kayit-acik'
    },
    {
      id: 'et-02', slug: 'duyusal-analiz-soylesisi',
      ad: 'Duyusal Analizde Panel Eğitimi Söyleşisi', tur: 'soylesi',
      konu: 'Duyusal değerlendirme panelleri nasıl kurulur',
      hedefKitle: 'Gastronomi öğrencileri ve sektör profesyonelleri',
      tarih: '2027-01-11', saat: '20:00', sureDk: 75, format: 'canli',
      konusmaciId: 'eg-05', partnerKurumId: 'ku-01', programId: 'pr-02',
      kontenjan: 200, ucret: 0, kayitAlinacak: true,
      durum: 'yakinda'
    },
    {
      id: 'et-03', slug: 'ogrenci-proje-sunum-gunu',
      ad: 'Öğrenci Proje Sunum Günü', tur: 'yarisma',
      konu: 'Kooperatif mutfağı bitirme projeleri sergisi',
      hedefKitle: 'Program katılımcıları, kurum yetkilileri, kamuya açık',
      tarih: '2026-11-30', saat: '14:00', sureDk: 180, format: 'yuz-yuze',
      konusmaciId: null, partnerKurumId: 'ku-03', programId: 'pr-03',
      kontenjan: 120, ucret: 0, kayitAlinacak: false,
      durum: 'yakinda'
    }
  ];

  /* ======================================================================
     9. KURUM KOHORTLARI (§8.1) — belirli kuruma özel katılımcı grubu
     ====================================================================== */
  var kohortlar = [
    {
      id: 'ko-01', programId: 'pr-02', kurumId: 'ku-01',
      ad: 'Yeşilova Üniversitesi — 2026 Güz Kohortu', donem: '2026 Güz',
      kontenjan: 40, katilimciSayisi: 33,
      egitmenIds: ['eg-04', 'eg-05'], koordinatorId: 'eg-05',
      baslangic: '2026-10-05', bitis: '2027-02-08',
      devamOrani: 0.91, tamamlamaOrani: null, durum: 'aktif'
    },
    {
      id: 'ko-02', programId: 'pr-03', kurumId: 'ku-03',
      ad: 'Yeşilova Belediyesi — Kadın Kooperatifi Grubu', donem: '2026 Güz',
      kontenjan: 30, katilimciSayisi: 30,
      egitmenIds: ['eg-02', 'eg-03'], koordinatorId: 'eg-02',
      baslangic: '2026-08-03', bitis: '2026-11-30',
      devamOrani: 0.86, tamamlamaOrani: null, durum: 'aktif'
    },
    {
      id: 'ko-03', programId: 'pr-05', kurumId: 'ku-05',
      ad: 'Zeytin Otelleri — Mutfak Ekibi A Kohortu', donem: '2026 Güz',
      kontenjan: 60, katilimciSayisi: 48,
      egitmenIds: ['eg-01', 'eg-06'], koordinatorId: 'eg-06',
      baslangic: '2026-09-01', bitis: '2027-03-01',
      devamOrani: 0.78, tamamlamaOrani: null, durum: 'aktif'
    }
  ];

  /* ======================================================================
     10. SERTİFİKALAR (§15) — doğrulama sayfasının demo kayıtları.
         Her durum bir kez temsil edilir (§26.15 durum kapsaması).
     ====================================================================== */
  var sertifikalar = [
    {
      id: 'DC-2026-004182', tur: 'basari',
      programId: 'pr-01', egitimId: null,
      katilimciAdi: 'E. Y.',                 /* §15.3 gizlilik: sınırlı gösterim */
      tarih: '2026-06-20', verenKurumIds: [],
      kazanimlar: ['Temel doğrama ve mise en place', 'Isı kontrolü ve pişirme derecesi', 'Tabak kompozisyonu'],
      basariKosulu: 'Tüm zorunlu eğitimler tamamlandı; uygulama teslimleri kabul edildi; quiz ortalaması 82.',
      puan: 82, durum: 'gecerli', qr: true
    },
    {
      id: 'DC-2026-004183', tur: 'ortak-program',
      programId: 'pr-02', egitimId: null,
      katilimciAdi: 'M. K.',
      tarih: '2026-07-02', verenKurumIds: ['ku-01'],
      kazanimlar: ['Karşılaştırmalı teknik analiz', 'Duyusal değerlendirme paneli yürütme'],
      basariKosulu: 'Modül teslimleri kabul edildi; bitirme projesi 88 puan; yüz yüze oturuma katıldı.',
      puan: 88, durum: 'gecerli', qr: true
    },
    {
      id: 'DC-2026-003940', tur: 'katilim',
      programId: 'pr-03', egitimId: null,
      katilimciAdi: 'S. D.',
      tarih: '2026-05-30', verenKurumIds: ['ku-03'],
      kazanimlar: ['Hijyen ve saklama uygulaması'],
      basariKosulu: 'Devam koşulu karşılandı. Bu belge bir başarı belgesi değildir.',
      puan: null, durum: 'duzeltilmis',
      duzeltmeNotu: 'Program adı 2026-06-04 tarihinde düzeltildi; belge yeniden yayımlandı.',
      qr: true
    },
    {
      id: 'DC-2025-001077', tur: 'mikro-kazanim',
      programId: null, egitimId: 'ed-06',
      katilimciAdi: 'B. A.',
      tarih: '2025-04-11', verenKurumIds: [],
      kazanimlar: ['Tabak kompozisyonu'],
      basariKosulu: 'Mikro kazanım rozeti; erişim süresi doldu.',
      puan: null, durum: 'suresi-dolmus', qr: true
    },
    {
      id: 'DC-2026-002311', tur: 'basari',
      programId: 'pr-01', egitimId: null,
      katilimciAdi: '—',
      tarih: '2026-03-18', verenKurumIds: [],
      kazanimlar: [],
      basariKosulu: null,
      puan: null, durum: 'iptal',
      iptalNotu: 'Kimlik doğrulama uyuşmazlığı nedeniyle 2026-04-02 tarihinde iptal edildi.',
      qr: false
    }
  ];

  /* ======================================================================
     11. SSS (§26.5 — Yardım Merkezi'ne taşınan içerik)
         5 madde akademi-v1.html'den taşındı, kayıt dönemi diline çekildi;
         kurum ve eğitmen konuları eklendi.
     ====================================================================== */
  /* Yardım Merkezi konu dizini (§26.5). `bolum` alanı: konu kartı hangi bölüme
     götürür — SSS süzgeci mi (#sss) yoksa kendi içerik bölümü mü. */
  var yardimKonulari = [
    { slug: 'kayit',           ad: 'Kayıt ve Başvuru',      ikon: 'fa-user-check',      bolum: 'sss',
      ozet: 'Eğitime kayıt, programa başvuru, kabul koşulları ve kurum kodu ile katılım.' },
    { slug: 'odeme',           ad: 'Ücret ve Erişim',       ikon: 'fa-tag',             bolum: 'sss',
      ozet: 'Ücretsiz içerik, tek satın alma, üyelik, kurum lisansı ve iade koşulları.' },
    { slug: 'sertifika',       ad: 'Belge ve Doğrulama',    ikon: 'fa-certificate',     bolum: 'sss',
      ozet: 'Belge türleri, uygunluk koşulları, doğrulama ve düzeltme/iptal durumları.' },
    { slug: 'teknik',          ad: 'Teknik Yardım',         ikon: 'fa-laptop-code',     bolum: 'sss',
      ozet: 'Video oynatma, altyazı, indirme, canlı oturuma katılım ve hesap erişimi.' },
    { slug: 'kurum',           ad: 'Kurum Desteği',         ikon: 'fa-building-columns', bolum: 'kurum',
      ozet: 'İş birliği başvurusu, protokol süreci, kohort kurulumu ve kurum portalı.' },
    { slug: 'egitmen',         ad: 'Eğitmen Ol',            ikon: 'fa-user-plus',        bolum: 'egitmen',
      ozet: 'Eğitmen rolleri, yeterlilik, başvuru adımları ve değerlendirme süreci.' },
    { slug: 'telif',           ad: 'İçerik ve Telif',       ikon: 'fa-copyright',        bolum: 'telif',
      ozet: 'Video, tarif ve teslim sahipliği; kullanım kapsamı ve marka izinleri.' },
    { slug: 'erisilebilirlik', ad: 'Erişilebilirlik',       ikon: 'fa-universal-access', bolum: 'erisilebilirlik',
      ozet: 'Klavye kullanımı, altyazı ve transkript, odak göstergesi, bildirim kanalı.' }
  ];

  var sss = [
    { konu: 'kayit',      soru: 'Eğitimlere nasıl kayıt olurum?',                 cevap: 'Eğitimler Merkezi\'nden ilgilendiğin eğitimi aç, "Eğitime Başla" ile kaydını tamamla. Programlarda kayıt yerine başvuru vardır; program detayında kabul koşulları ve başvuru tarihleri yazılıdır.' },
    { konu: 'odeme',      soru: 'Eğitimler ücretli mi?',                          cevap: 'Bir kısmı ücretsiz, bir kısmı tek satın alma veya üyelik kapsamındadır. Kurum lisansı olan katılımcılarda erişim kurumun kontenjanından sağlanır. Her eğitim kartında ve detayında erişim tipi yazılıdır.' },
    { konu: 'sertifika',  soru: 'Sertifika geçerli ve doğrulanabilir mi?',        cevap: 'Her belgenin benzersiz kimliği ve QR kodu vardır; Sertifika Doğrula sayfasından belge türü, veren kurumlar ve geçerlilik durumu görülebilir. DadaCampus belgesi tek başına akademik kredi veya kamu geçerliliği iddiası taşımaz — bir belgede kurum onayı varsa bu belge üzerinde ve doğrulama sayfasında açıkça gösterilir.' },
    { konu: 'kayit',      soru: 'Hiç deneyimim yok, başlayabilir miyim?',         cevap: 'Evet. Temel Mutfak konu alanı sıfırdan başlayanlar için tasarlandı. Emin değilsen "Bana Uygun Eğitimi Bul" yönlendirmesini kullan.' },
    { konu: 'teknik',     soru: 'Eğitimleri istediğim zaman izleyebilir miyim?',  cevap: 'Video eğitimleri dilediğin hızda, istediğin zaman izlersin. Canlı atölyeler belirli tarihlerde yapılır; kaçırdığın oturumun kaydı varsa Kampüsüm > Takvimim üzerinden erişilir.' },
    { konu: 'kurum',      soru: 'Kurumumla iş birliği nasıl kurulur?',            cevap: 'Kurumlar Merkezi\'nde kurum türüne uygun modeli inceleyip "İş Birliği Başlat" formunu doldurun. Başvurunuz ihtiyaç analizi görüşmesiyle değerlendirilir; süreç adımları Kurumlar Merkezi\'nde yazılıdır.' },
    { konu: 'kurum',      soru: 'Kurumumun verileri diğer kurumlara görünür mü?', cevap: 'Görünmez. Kurum yöneticisi yalnız kendi kurumuna bağlı program ve katılımcıları görür; rapor görüntüleme, öğrenci verisi, belge onayı ve finans ayrı izinlerdir.' },
    { konu: 'egitmen',    soru: 'Eğitmen olmak için nereye başvururum?',          cevap: 'DadaCampus eğitmen başvurusu, DadaGastro "Şef Ol" formundan ayrıdır. Eğitmenler menüsündeki "Eğitmen Ol" bağlantısını kullanın; akademik ve mesleki yeterlilik alanları içerir.' }
  ];

  /* ======================================================================
     12. YARDIMCILAR — tek kapı (docs/PLAN.md §1)
     ====================================================================== */

  var DC = {
    /* veri */
    egitimler: egitimler,
    programlar: programlar,
    atolyeler: atolyeler,
    etkinlikler: etkinlikler,
    kohortlar: kohortlar,
    egitmenler: egitmenler,
    kurumlar: kurumlar,
    sertifikalar: sertifikalar,
    rubrikler: rubrikler,
    sss: sss,
    yardimKonulari: yardimKonulari,

    /* referans listeleri */
    konuAlanlari: konuAlanlari,
    seviyeler: seviyeler,
    formatlar: formatlar,
    erisimTipleri: erisimTipleri,
    belgeTurleri: belgeTurleri,
    roller: roller,
    egitmenRolleri: egitmenRolleri,
    kurumTurleri: kurumTurleri,
    programTurleri: programTurleri,
    etkinlikTurleri: etkinlikTurleri,
    isbirligiModelleri: isbirligiModelleri,

    /* görsel */
    img: img,

    /* --- arama / çözümleme ------------------------------------------------ */

    /** slug ile kayıt getirir. Detay sayfalarının TEK giriş noktası. */
    bul: function (koleksiyon, slug) {
      var arr = DC[koleksiyon] || [];
      for (var i = 0; i < arr.length; i++) { if (arr[i].slug === slug) return arr[i]; }
      return null;
    },

    /** id ile kayıt getirir. */
    bulId: function (koleksiyon, id) {
      var arr = DC[koleksiyon] || [];
      for (var i = 0; i < arr.length; i++) { if (arr[i].id === id) return arr[i]; }
      return null;
    },

    egitmen: function (id) { return DC.bulId('egitmenler', id); },
    kurum:   function (id) { return DC.bulId('kurumlar', id); },
    program: function (id) { return DC.bulId('programlar', id); },
    egitim:  function (id) { return DC.bulId('egitimler', id); },
    rubrik:  function (id) { return DC.bulId('rubrikler', id); },

    /** Referans listesinden etiket çözer: DC.etiket('seviyeler','orta') → 'Orta' */
    etiket: function (liste, slug) {
      var arr = DC[liste] || [];
      for (var i = 0; i < arr.length; i++) { if (arr[i].slug === slug) return arr[i].ad; }
      return slug || '';
    },

    /* --- 🔴 ONAY KAYDI KAPISI (§26.13, §15.1, §20) ----------------------- */

    /**
     * Kurumun onay kaydı var mı?
     * false ise arayüz "üniversite onaylı", "resmî geçerli", "ortak sertifika"
     * benzeri ifadeleri GÖSTERMEZ ve etki göstergelerini YAYIMLAMAZ.
     * Sponsor/partner logosu akademik onay göstergesi gibi sunulmaz.
     */
    onayliMi: function (kurumId) {
      var k = DC.kurum(kurumId);
      return !!(k && k.onayKaydi && k.onayKaydi.belgeRef);
    },

    /** Yalnız onay kaydı olan partner kurumları döner (Partner Kurumlar bölümü). */
    onayliKurumlar: function () {
      return kurumlar.filter(function (k) { return DC.onayliMi(k.id); });
    },

    /**
     * "Ortak sertifika" / "kurum onaylı" ifadesi bu program için kullanılabilir mi?
     * İKİ koşul birlikte gerekir (§15.1 kritik ifade kuralı):
     *   (1) belge türü GERÇEKTEN ortak program sertifikası olmalı — katılım belgesi
     *       veya kurum içi tamamlama kaydı "ortak sertifika" diye sunulamaz;
     *   (2) belgeyi veren TÜM kurumların onay kaydı bulunmalı.
     * Yalnız (2)'ye bakmak katılım belgesini ortak sertifika gibi göstermeye izin
     * verirdi — bu §26.13'ün yasakladığı durumdur.
     */
    ortakBelgeGosterilirMi: function (program) {
      if (!program || program.belgeTuru !== 'ortak-program') return false;
      if (!program.verenKurumIds || !program.verenKurumIds.length) return false;
      return program.verenKurumIds.every(function (id) { return DC.onayliMi(id); });
    },

    /**
     * Belgeyi veren kurumların adı gösterilebilir mi? (§7.3, §15.3)
     * Ortak sertifika iddiasından BAĞIMSIZ: bir katılım belgesinde de veren kurum
     * yazılır — yeter ki o kurumun onay kaydı olsun.
     */
    verenKurumlar: function (kayit) {
      if (!kayit || !kayit.verenKurumIds) return [];
      return kayit.verenKurumIds
        .filter(function (id) { return DC.onayliMi(id); })
        .map(function (id) { return DC.kurum(id); });
    },

    /** Belge türünün zorunlu açıklaması (§15.1 — arayüz göstermek zorunda). */
    belgeAciklamasi: function (belgeTuruSlug) {
      for (var i = 0; i < belgeTurleri.length; i++) {
        if (belgeTurleri[i].slug === belgeTuruSlug) return belgeTurleri[i].zorunluAciklama;
      }
      return '';
    },

    /* --- filtre motoru (§17.2) -------------------------------------------- */

    /**
     * Basit facet filtresi. kriterler = { alan: 'slug' | ['slug1','slug2'] }.
     * 'q' anahtarı serbest metin aramasıdır (Türkçe-duyarlı).
     * Boş/undefined kriterler yok sayılır → "Filtreyi Temizle" davranışı bedava.
     */
    filtrele: function (koleksiyon, kriterler) {
      var arr = DC[koleksiyon] || [];
      kriterler = kriterler || {};
      var q = kriterler.q ? DC.norm(kriterler.q) : '';

      return arr.filter(function (kayit) {
        for (var alan in kriterler) {
          if (!Object.prototype.hasOwnProperty.call(kriterler, alan)) continue;
          if (alan === 'q') continue;
          var beklenen = kriterler[alan];
          if (beklenen === null || beklenen === undefined || beklenen === '' ||
              (Array.isArray(beklenen) && !beklenen.length)) continue;

          var deger = kayit[alan];
          if (Array.isArray(beklenen)) {
            if (Array.isArray(deger)) {
              if (!deger.some(function (d) { return beklenen.indexOf(d) > -1; })) return false;
            } else if (beklenen.indexOf(deger) === -1) return false;
          } else {
            if (Array.isArray(deger)) {
              if (deger.indexOf(beklenen) === -1) return false;
            } else if (deger !== beklenen) return false;
          }
        }
        if (q && DC.norm(DC.aramaMetni(koleksiyon, kayit)).indexOf(q) === -1) return false;
        return true;
      });
    },

    /** Bir kaydın arama indeksine giren metni (koleksiyona göre). */
    aramaMetni: function (koleksiyon, kayit) {
      var parcalar = [kayit.ad || '', kayit.ozet || ''];
      if (kayit.kategori) parcalar.push(DC.etiket('konuAlanlari', kayit.kategori));
      if (kayit.seviye)   parcalar.push(DC.etiket('seviyeler', kayit.seviye));
      if (kayit.tur) {
        parcalar.push(DC.etiket('programTurleri', kayit.tur));
        parcalar.push(DC.etiket('kurumTurleri', kayit.tur));
        parcalar.push(DC.etiket('etkinlikTurleri', kayit.tur));
      }
      if (kayit.egitmenId)   { var e = DC.egitmen(kayit.egitmenId);   if (e) parcalar.push(e.ad); }
      if (kayit.konusmaciId) { var k = DC.egitmen(kayit.konusmaciId); if (k) parcalar.push(k.ad); }
      if (kayit.yoneticiId)  { var y = DC.egitmen(kayit.yoneticiId);  if (y) parcalar.push(y.ad); }
      /* partner/veren kurum adları da aranabilir olmalı (§17.1 sonuç türü etiketi) */
      (kayit.partnerKurumIds || []).concat(kayit.verenKurumIds || []).forEach(function (id) {
        var ku = DC.kurum(id); if (ku) parcalar.push(ku.ad + ' ' + ku.sehir);
      });
      if (kayit.donem) parcalar.push(kayit.donem);
      if (kayit.uzmanliklar) parcalar.push(kayit.uzmanliklar.join(' '));
      if (kayit.kazanimlar)  parcalar.push(kayit.kazanimlar.join(' '));
      if (kayit.unvan)       parcalar.push(kayit.unvan);
      if (kayit.sehir)       parcalar.push(kayit.sehir);
      return parcalar.join(' ');
    },

    /**
     * Türkçe-duyarlı normalizasyon.
     * akademi-v1.html blok 3'teki norm() ile AYNI davranış — yeniden yazılmadı,
     * tek yere taşındı (docs/lessons.md: yeni yardımcı icat etme).
     */
    norm: function (s) {
      return String(s == null ? '' : s)
        .toLocaleLowerCase('tr-TR')
        .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g')
        .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u');
    },

    /* --- URL parametresi (§17.2: filtre URL'ye yansır, geri tuşunda korunur) */

    /** Mevcut query string'i düz nesne olarak döner. */
    qs: function () {
      var out = {};
      var s = w.location.search.replace(/^\?/, '');
      if (!s) return out;
      s.split('&').forEach(function (par) {
        if (!par) return;
        var i = par.indexOf('=');
        var ad = decodeURIComponent(i < 0 ? par : par.slice(0, i)).replace(/\+/g, ' ');
        var dg = i < 0 ? '' : decodeURIComponent(par.slice(i + 1).replace(/\+/g, ' '));
        out[ad] = dg;
      });
      return out;
    },

    /**
     * Query string'i yazar. degistir=false ise pushState (geri tuşu çalışır),
     * true ise replaceState (ilk yükleme normalizasyonu).
     * Boş değerli anahtarlar URL'den DÜŞER — "Filtreyi Temizle" temiz URL bırakır.
     */
    qsYaz: function (obj, degistir) {
      var parcalar = [];
      for (var ad in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, ad)) continue;
        var dg = obj[ad];
        if (dg === null || dg === undefined || dg === '' || (Array.isArray(dg) && !dg.length)) continue;
        parcalar.push(encodeURIComponent(ad) + '=' + encodeURIComponent(Array.isArray(dg) ? dg.join(',') : dg));
      }
      var url = w.location.pathname + (parcalar.length ? '?' + parcalar.join('&') : '') + w.location.hash;
      try {
        if (degistir) w.history.replaceState(obj, '', url);
        else w.history.pushState(obj, '', url);
      } catch (e) { /* file:// altında pushState kısıtlı olabilir — sessiz geç */ }
    },

    /**
     * Sayfanın SAHİP OLDUĞU anahtarları günceller, YABANCI anahtarları KORUR.
     *
     * 🔴 Neden var (Faz 1'de yakalandı): qsYaz(o) tüm query string'i baştan yazar.
     * Filtre sayfası ilk açılışta durumu normalize etmek için qsYaz({}) çağırırsa
     * URL'deki `?sheet=1`, `?auth=1`, `?cc=1`, `?drawer=1`, `?role=…` gibi KABUK
     * demo parametrelerini de siler — kabuk sözleşmesi sessizce bozulur.
     * Filtre yazan her sayfa qsYaz DEĞİL bunu kullanır.
     *
     * @param sahip   sayfanın yönettiği anahtar adları (silinebilir olanlar)
     * @param yeni    yazılacak anahtar/değerler (boş değerliler düşer)
     * @param degistir true → replaceState (normalizasyon), false → pushState (geri tuşu)
     */
    qsSahipli: function (sahip, yeni, degistir) {
      var mev = DC.qs(), o = {};
      Object.keys(mev).forEach(function (k) {
        if (sahip.indexOf(k) === -1) o[k] = mev[k];      /* yabancı anahtar korunur */
      });
      Object.keys(yeni).forEach(function (k) { o[k] = yeni[k]; });
      DC.qsYaz(o, degistir);
    },

    /* --- ızgara tamlama (§23.2) ------------------------------------------- */

    /**
     * KEŞİF RAYINI yarım satır bırakmayacak şekilde çizer.
     *
     * .crs-grid masaüstünde 3, ≤1024'te 2 sütun, ≤640'ta yatay ray (flex).
     * Tek/çift uyuşmazlığında son satırda yetim kart kalıyordu (ör. 3 kart /
     * 2 sütun → 2+1). Çözüm: o anki SÜTUN SAYISI ölçülür ve liste tam katına
     * indirilir; artan kart bölümün "Tümünü Gör" bağlantısından erişilir.
     *
     * 🔴 Arama SONUÇ ızgarasında KULLANILMAZ — sonucu saklamak veri kaybıdır;
     *    orada sayfalama var ve son satırın kısa kalması beklenen davranıştır.
     * 🔴 Yeni CSS sınıfı veya grid modifier üretmez; .crs-grid'e dokunmaz.
     *
     * Kart sayısı `{min, max}` aralığında SÜTUN SAYISININ TAM KATINA oturtulur:
     *   3 sütun / max 4 → 3 kart · 2 sütun / max 4 → 4 kart · yatay ray → max
     * Böylece hiçbir genişlikte yarım satır oluşmaz ve içerik gizlenmez —
     * yalnız gösterilen örnek sayısı düzene göre 2–4 arasında oynar.
     *
     * @param gridEl  ızgara elemanı
     * @param liste   kayıt listesi (sıralı; baştan alınır)
     * @param kartFn  kayıt → HTML
     * @param opt     { min: en az kaç kart, max: en fazla kaç kart }
     * @returns tekrar çizen fonksiyon (dışarıdan da çağrılabilir)
     */
    sigdir: function (gridEl, liste, kartFn, opt) {
      opt = opt || {};
      var min = opt.min || 1;
      function adet() {
        var ust = Math.min(opt.max || liste.length, liste.length);
        var g = w.getComputedStyle(gridEl).gridTemplateColumns;
        var k = (!g || g === 'none') ? 0 : g.split(' ').filter(function (x) { return x; }).length;
        if (k < 2) return ust;                          /* yatay ray / tek sütun */
        var n = Math.floor(ust / k) * k;                /* tam satır */
        if (n < min) n = Math.min(ust, Math.ceil(min / k) * k);
        return Math.min(n, ust) || ust;
      }
      function ciz() {
        gridEl.innerHTML = liste.slice(0, adet()).map(kartFn).join('');
      }
      ciz();
      var t;
      w.addEventListener('resize', function () {
        clearTimeout(t); t = setTimeout(ciz, 160);
      });
      return ciz;
    },

    /* --- biçimlendirme ---------------------------------------------------- */

    /** 380 → "6 sa 20 dk" (akademi-v1.html kart meta biçimiyle aynı). */
    sure: function (dk) {
      if (dk == null) return '';
      var s = Math.floor(dk / 60), d = dk % 60;
      if (!s) return d + ' dk';
      return s + ' sa' + (d ? ' ' + (d < 10 ? '0' + d : d) + ' dk' : '');
    },

    /** 1290 → "1.290 ₺" · 0 → "Ücretsiz" · null → "" */
    fiyat: function (tl) {
      if (tl === 0) return 'Ücretsiz';
      if (tl == null) return '';
      return String(tl).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' ₺';
    },

    /** '2026-09-28' → '28 Eylül 2026' */
    tarih: function (iso) {
      if (!iso) return '';
      var AY = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
      var p = String(iso).split('-');
      if (p.length !== 3) return iso;
      return parseInt(p[2], 10) + ' ' + AY[parseInt(p[1], 10) - 1] + ' ' + p[0];
    },

    /** HTML metin kaçışı — veriden gelen her metin bununla basılır. */
    esc: function (s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    },

    /* --- detay bağlantıları (§26.7 — slug → doğru detay hedefi) ----------- */
    link: {
      egitim:    function (slug) { return 'dadacampus-egitim-detay-v1.html?egitim=' + encodeURIComponent(slug); },
      ders:      function (slug, n) { return 'dadacampus-ders-v1.html?egitim=' + encodeURIComponent(slug) + '&ders=' + n; },
      program:   function (slug) { return 'dadacampus-program-detay-v1.html?program=' + encodeURIComponent(slug); },
      atolye:    function (slug) { return 'dadacampus-atolye-detay-v1.html?atolye=' + encodeURIComponent(slug); },
      etkinlik:  function (slug) { return 'dadacampus-atolye-detay-v1.html?etkinlik=' + encodeURIComponent(slug); },
      egitmen:   function (slug) { return 'dadacampus-egitmen-v1.html?egitmen=' + encodeURIComponent(slug); },
      kurum:     function (slug) { return 'dadacampus-kurum-v1.html?kurum=' + encodeURIComponent(slug); },
      kurumTur:  function (slug) { return 'dadacampus-kurum-tur-v1.html?tur=' + encodeURIComponent(slug); },
      sertifika: function (kod)  { return 'dadacampus-sertifika-dogrula-v1.html?kod=' + encodeURIComponent(kod); },
      egitimler: function (kri)  { var q = []; for (var a in (kri || {})) if (kri[a]) q.push(a + '=' + encodeURIComponent(kri[a])); return 'dadacampus-egitimler-v1.html' + (q.length ? '?' + q.join('&') : ''); },
      programlar:function (kri)  { var q = []; for (var a in (kri || {})) if (kri[a]) q.push(a + '=' + encodeURIComponent(kri[a])); return 'dadacampus-programlar-v1.html' + (q.length ? '?' + q.join('&') : ''); },
      yardim:    function (konu) { return 'dadacampus-yardim-v1.html' + (konu ? '?konu=' + encodeURIComponent(konu) : ''); }
    }
  };

  /* ======================================================================
     13. NORMALİZASYON — sayaçlar VERİDEN türetilir, elle yazılmaz
     ----------------------------------------------------------------------
     Neden: kartta "14 ders" yazıp oynatıcıda 8 ders göstermek, "eğitim kartı
     doğru eğitim detayını açar" kabul kriterini (§27) görünürde ihlal eder.
     dersSayisi / sureDk / uygulamaSayisi tek doğruluk kaynağından (bolumler,
     uygulamalar) hesaplanır; elle girilen değer varsa ÜZERİNE YAZILIR.
     Böylece içerik büyüdükçe sayaçlar kendiliğinden doğru kalır (drift yok).
     ====================================================================== */
  egitimler.forEach(function (e) {
    var dersler = 0, sure = 0;
    (e.bolumler || []).forEach(function (b) {
      (b.dersler || []).forEach(function (d) { dersler++; sure += (d.sureDk || 0); });
    });
    e.dersSayisi = dersler;
    e.sureDk = sure;
    e.uygulamaSayisi = (e.uygulamalar || []).length;
    e.onizlemeSayisi = (e.bolumler || []).reduce(function (t, b) {
      return t + (b.dersler || []).filter(function (d) { return d.onizleme; }).length;
    }, 0);
    e.bolumSayisi = (e.bolumler || []).length;
  });

  /* Program süresi/eğitim sayısı da modüllerden türetilir. */
  programlar.forEach(function (p) {
    var ids = [];
    (p.moduller || []).forEach(function (m) {
      (m.egitimIds || []).forEach(function (id) { if (ids.indexOf(id) === -1) ids.push(id); });
    });
    p.egitimIds = ids;
    p.egitimSayisi = ids.length;
    p.modulSayisi = (p.moduller || []).length;
    p.toplamSureDk = ids.reduce(function (t, id) {
      var e = DC.egitim(id); return t + (e ? e.sureDk : 0);
    }, 0);
  });

  /* Kohort doluluk oranı kontenjandan türetilir. */
  kohortlar.forEach(function (k) {
    k.dolulukOrani = k.kontenjan ? (k.katilimciSayisi / k.kontenjan) : 0;
  });

  w.DC = DC;
})(window);
