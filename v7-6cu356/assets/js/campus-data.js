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
    { slug: 'temel-mutfak',        ad: 'Temel Mutfak ve Bıçak Becerileri',            ikon: 'fa-kitchen-set',    ozet: 'Doğrama, bileme, mise en place', kapak: F.bicak, kisaAd: 'Temel Mutfak' },
    { slug: 'pisirme-soslar',      ad: 'Pişirme Teknikleri, Soslar ve Fonlar',        ikon: 'fa-fire-burner',    ozet: 'Sote, haşlama, fırın, 5 ana sos', kapak: F.sos, kisaAd: 'Pişirme & Soslar' },
    { slug: 'turk-mutfagi',        ad: 'Türk Mutfağı ve Yerel Mutfaklar',             ikon: 'fa-bowl-food',      ozet: 'Bölgesel teknik ve tarifler',    kapak: F.baharat, kisaAd: 'Türk Mutfağı' },
    { slug: 'dunya-mutfaklari',    ad: 'Dünya Mutfakları',                            ikon: 'fa-earth-americas', ozet: 'Akdeniz, Uzakdoğu, İtalyan',     kapak: F.dunya, kisaAd: 'Dünya Mutfakları' },
    { slug: 'ekmek-fermantasyon',  ad: 'Ekmek, Fırıncılık ve Fermantasyon',           ikon: 'fa-bread-slice',    ozet: 'Maya, ekşi maya, fırın',         kapak: F.ekmek, kisaAd: 'Ekmek & Fermantasyon' },
    { slug: 'pastacilik',          ad: 'Pastacılık ve Tatlı Sanatı',                  ikon: 'fa-cake-candles',   ozet: 'Pasta, tart, plating',           kapak: F.pasta, kisaAd: 'Pastacılık' },
    { slug: 'gida-guvenligi',      ad: 'Gıda Güvenliği, Hijyen ve Saklama',           ikon: 'fa-shield-halved',  ozet: 'HACCP temelleri, soğuk zincir',  kapak: F.guvenlik, kisaAd: 'Gıda Güvenliği' },
    { slug: 'menu-yonetimi',       ad: 'Menü Planlama, Maliyet ve Mutfak Yönetimi',   ikon: 'fa-list-check',     ozet: 'Maliyet, porsiyon, denge',       kapak: F.dunya, kisaAd: 'Menü Yönetimi' },
    { slug: 'surdurulebilirlik',   ad: 'Sürdürülebilirlik ve Atıksız Mutfak',         ikon: 'fa-leaf',           ozet: 'Atık azaltma, yerel ürün',       kapak: F.sos, kisaAd: 'Sürdürülebilirlik' },
    { slug: 'girisimcilik',        ad: 'Gastronomi Girişimciliği ve Profesyonel Gelişim', ikon: 'fa-briefcase',  ozet: 'Sunum, marka, işletme',          kapak: F.sunum, kisaAd: 'Girişimcilik' }
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

  /* R1/D8 — "Bana Uygun Başlangıcı Bul" sihirbazının süre sorusu.
     Kova ELLE yazılmaz: eğitimin toplam süresi ve programın haftalık yükü
     aşağıdaki normalizasyon bloğunda bu üç kovaya eşlenir (tek kaynak). */
  var sureKovalari = [
    { slug: 'az',   ad: 'Haftada 1–3 saat',        ikon: 'fa-hourglass-start', ozet: 'Yoğun bir dönemdeyim' },
    { slug: 'orta', ad: 'Haftada 4–6 saat',        ikon: 'fa-hourglass-half',  ozet: 'Düzenli ilerleyebilirim' },
    { slug: 'cok',  ad: 'Haftada 7 saat ve üzeri', ikon: 'fa-hourglass-end',   ozet: 'Hızlı ilerlemek istiyorum' }
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
  /* 🔴 ROLLERDE KAPAK YOK (R1/D7 öz denetim): rol soyut bir kavram; yemek fotoğrafı
   "Akademisyen"i anlatmıyor, kişi fotoğrafı da belirli bir kişiyi ima ederdi.
   Görselli kart YALNIZ somut alanlarda (konu alanı, program türü) kullanılır;
   rol kartı ikonla çizilir (facet motoru kapak yoksa ikona düşer). */
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
  /* §9.3 her kurum türü sayfasında AYNI yapı: değer önerisi · çözülen problem ·
     uygun modeller · örnek program · kaynak paylaşımı · süreç · göstergeler · SSS.
     Bu içerik Faz 1'de Kurumlar Merkezi'nin JS'inde hardcoded duruyordu; Faz 4'te
     kurum türü sayfası da aynı içeriği kullandığı için veriye taşındı (§26.14 —
     demo içeriği sabit HTML olarak çoğaltma). */
  var kurumTurleri = [
    {
      slug: 'universite', ad: 'Üniversiteler', kisaAd: 'Üniversite',
      ikon: 'fa-building-columns',
      vaat: 'Dijital ders desteği, ortak sertifika ve sürekli eğitim',
      hedefBirim: 'Gastronomi ve Mutfak Sanatları bölümleri, Sürekli Eğitim Merkezleri, Turizm fakülteleri',
      problem: ['Dijital ders materyali standardı yok', 'Uygulama saatleri fiziki mutfakla sınırlı',
                'Sürekli eğitim programı için içerik ve eğitmen kapasitesi yetersiz'],
      kaynak: ['Kurum: akademik kadro, onay süreci, kontenjan ve mekân',
               'DadaCampus: içerik üretimi, platform, eğitmen havuzu, değerlendirme altyapısı'],
      gosterge: ['Kayıt ve tamamlama oranı', 'Kazanım bazlı başarı', 'Memnuniyet ve öneri'],
      zamanCizelgesi: [
        { adim: 'İhtiyaç analizi ve model seçimi', sure: '2–3 hafta' },
        { adim: 'Müfredat eşleştirme ve akademik inceleme', sure: '3–4 hafta' },
        { adim: 'Protokol ve logo kullanım izni', sure: '2 hafta' },
        { adim: 'Kohort kurulumu ve eğitmen ataması', sure: '2 hafta' },
        { adim: 'İlk dönem yürütme', sure: '1 akademik dönem' }
      ],
      sss: [
        { soru: 'Ortak sertifikayı kim veriyor?',
          cevap: 'Belge, protokolde tanımlı yetkilinin onayıyla düzenlenir ve her iki kurumun rolü belge üzerinde ayrı ayrı yazılır. Onay kaydı tamamlanmadan ortak belge ifadesi kullanılmaz.' },
        { soru: 'Mevcut ders içeriğimizle çakışır mı?',
          cevap: 'Müfredat eşleştirme adımında kazanımlar karşılaştırılır; DadaCampus içeriği dersin yerine değil tamamlayıcısı olarak konumlanır.' },
        { soru: 'Öğrenci verisi kimde kalır?',
          cevap: 'Kurum yöneticisi yalnız kendi kurumunun katılımcılarını görür. Rapor görüntüleme, öğrenci verisi, belge onayı ve finans ayrı izinlerdir.' }
      ]
    },
    {
      slug: 'mutfak-okulu', ad: 'Mutfak Sanatları Okulları', kisaAd: 'Mutfak Okulu',
      ikon: 'fa-utensils',
      vaat: 'Hibrit eğitim, içerik lisansı ve uzman havuzu',
      hedefBirim: 'Özel mutfak sanatları okulları, aşçılık kursları, uygulama mutfağı olan eğitim kurumları',
      problem: ['Teori saatleri uygulama mutfağını meşgul ediyor', 'Uzman eğitmen erişimi dönemsel',
                'İçerik güncelleme yükü yüksek'],
      kaynak: ['Kurum: uygulama mutfağı, yüz yüze eğitmen, iş sağlığı ve güvenliği sorumluluğu',
               'DadaCampus: online teori, ölçme, kohort yönetimi, içerik lisansı'],
      gosterge: ['Yüz yüze oturum devam oranı', 'Uygulama teslimi kabul oranı', 'Dönem tamamlama'],
      zamanCizelgesi: [
        { adim: 'İhtiyaç analizi ve mutfak kapasitesi incelemesi', sure: '2 hafta' },
        { adim: 'Hibrit program tasarımı (online teori + yüz yüze uygulama)', sure: '3 hafta' },
        { adim: 'Protokol, lisans ve iş sağlığı sorumluluk paylaşımı', sure: '2 hafta' },
        { adim: 'Eğitmen eşleştirme ve takvim', sure: '1–2 hafta' },
        { adim: 'İlk kohort', sure: '8–16 hafta' }
      ],
      sss: [
        { soru: 'İçerik lisansı ne kapsıyor?',
          cevap: 'Belirli kontenjan ve dönem için içeriğe erişim, kohort yönetimi ve raporlama. Kullanım süresi, kanalı ve dönem sonunda erişimin ne olacağı sözleşmede yazılır.' },
        { soru: 'Yüz yüze oturumda sorumluluk kimde?',
          cevap: 'Mutfak, malzeme ve iş sağlığı/güvenliği sorumluluğu kurumdadır; bu protokolün zorunlu karar noktalarından biridir.' },
        { soru: 'Kendi eğitmenimiz içerik üretebilir mi?',
          cevap: 'Evet. İçerik üretim ortaklığı modelinde kurum uzmanlarıyla birlikte içerik hazırlanır; hak paylaşımı ve kullanım süresi ayrıca tanımlanır.' }
      ]
    },
    {
      slug: 'kamu', ad: 'Kamu Kurumları ve Belediyeler', kisaAd: 'Kamu',
      ikon: 'fa-landmark',
      vaat: 'Meslek edindirme, yerel ürün ve sosyal etki programları',
      hedefBirim: 'Belediyeler, kalkınma ajansları, kooperatifler, halk eğitim yapıları, kamu sosyal destek birimleri',
      problem: ['Meslek edindirme programlarında ölçülebilir çıktı eksik',
                'Yerel ürün ve kooperatif bilgisi dijitalleşmemiş',
                'Kadın ve genç istihdamına yönelik içerik dağınık'],
      kaynak: ['Kurum: katılımcı seçimi, mekân, sosyal etki raporlaması, bütçe/proje kaynağı',
               'DadaCampus: müfredat, eğitmen, hijyen ve güvenlik içeriği, raporlama'],
      gosterge: ['Programı tamamlayan katılımcı', 'Kurulan üretim birimi', 'İstihdam/kooperatif çıktısı'],
      zamanCizelgesi: [
        { adim: 'İhtiyaç analizi ve hedef grup tanımı', sure: '2–3 hafta' },
        { adim: 'Program tasarımı ve bütçe/proje eşleştirmesi', sure: '3–4 hafta' },
        { adim: 'Protokol ve katılımcı verisi izinleri', sure: '2–3 hafta' },
        { adim: 'Katılımcı seçimi ve kohort kurulumu', sure: '2 hafta' },
        { adim: 'Program yürütme ve etki raporu', sure: '3–5 ay' }
      ],
      sss: [
        { soru: 'Katılımcı verisi nasıl işleniyor?',
          cevap: 'Verinin kim tarafından, hangi amaçla işleneceği protokolde yazılır. Reşit olmayan katılımcıda yaş ve veli/kurum onayı ayrıca aranır.' },
        { soru: 'Sosyal etki nasıl ölçülüyor?',
          cevap: 'Program başında tanımlı çıktı ve sonuç göstergeleri belirlenir; rapor yalnız kurumun onayıyla yayımlanır.' },
        { soru: 'Katılımcıdan ücret alınıyor mu?',
          cevap: 'Kamu bütçesi veya sponsor destekli programlarda katılımcıdan ücret alınmaz; bu, program detayında açıkça yazılır.' }
      ]
    },
    {
      slug: 'meslek', ad: 'Mesleki Eğitim Kurumları', kisaAd: 'Mesleki Eğitim',
      ikon: 'fa-school',
      vaat: 'Tamamlayıcı eğitim ve öğretici içerik',
      hedefBirim: 'Meslek liseleri, halk eğitim merkezleri, mesleki eğitim merkezleri, çıraklık eğitimi birimleri',
      problem: ['Müfredatı tamamlayıcı dijital içerik yok', 'Öğretici kadroya dijital öğretim desteği gerekiyor',
                'Öğrenci uygulama geri bildirimi ölçeklenmiyor'],
      kaynak: ['Kurum: öğrenci grubu, atölye saatleri, öğretici kadro',
               'DadaCampus: tamamlayıcı içerik, eğitici eğitimi, rubrik ve değerlendirme'],
      gosterge: ['Derse entegrasyon oranı', 'Öğrenci tamamlama', 'Öğretici memnuniyeti'],
      zamanCizelgesi: [
        { adim: 'Müfredat inceleme ve boşluk analizi', sure: '2 hafta' },
        { adim: 'Tamamlayıcı içerik seçimi ve eğitici eğitimi planı', sure: '3 hafta' },
        { adim: 'Protokol ve erişim tanımları', sure: '2 hafta' },
        { adim: 'Öğretici eğitimi', sure: '2–3 hafta' },
        { adim: 'Sınıfa entegrasyon ve dönem takibi', sure: '1 dönem' }
      ],
      sss: [
        { soru: 'Öğretici kadromuz nasıl destekleniyor?',
          cevap: 'Eğitici eğitimi modelinde kadroya dijital öğretim, içerik hazırlama ve rubrikle değerlendirme desteği verilir.' },
        { soru: 'Öğrenciler kendi cihazlarından mı erişecek?',
          cevap: 'Erişim kurum lisansı üzerinden tanımlanır; sınıf içi ortak erişim veya bireysel hesap seçenekleri protokolde belirlenir.' },
        { soru: 'Belge veriliyor mu?',
          cevap: 'Kurumun tercihine göre katılım belgesi veya kurum içi tamamlama kaydı düzenlenir. Kurum içi kayıt kamuya açık geçerlilik iddiası taşımaz.' }
      ]
    },
    {
      slug: 'isletme', ad: 'İşletmeler ve Sektör Kuruluşları', kisaAd: 'İşletme',
      ikon: 'fa-hotel',
      vaat: 'Kurum içi yetkinlik programları',
      hedefBirim: 'Otel ve restoran grupları, gıda şirketleri, catering işletmeleri, sektör dernekleri',
      problem: ['Şubeler arası standart tarif ve teknik farkı', 'Yeni işe alımda eğitim süresi uzun',
                'Maliyet ve porsiyon disiplini ekipçe oturmuyor'],
      kaynak: ['Kurum: katılımcı ataması, vardiya planı, kurum içi mentor',
               'DadaCampus: standart içerik, kohort, ölçme, kurum içi tamamlama kaydı'],
      gosterge: ['Kurum içi tamamlama oranı', 'Standart tarif uyumu', 'Eğitim süresi kısalması'],
      zamanCizelgesi: [
        { adim: 'Yetkinlik boşluğu analizi', sure: '1–2 hafta' },
        { adim: 'Program ve kohort tasarımı (vardiyaya uygun)', sure: '2–3 hafta' },
        { adim: 'Kurumsal lisans ve kontenjan sözleşmesi', sure: '1–2 hafta' },
        { adim: 'Kurum içi mentor eğitimi', sure: '1 hafta' },
        { adim: 'Yürütme ve dönemsel rapor', sure: '3–6 ay' }
      ],
      sss: [
        { soru: 'Vardiyalı ekip nasıl katılıyor?',
          cevap: 'Video içerik istenen zamanda izlenir; canlı oturum ve yüz yüze atölye takvimi kurumun vardiya planına göre kurulur.' },
        { soru: 'Rapor kimlere açık?',
          cevap: 'Kurum paneli katılım, ilerleme ve tamamlama raporunu yalnız yetkili kullanıcılara açar; dışa aktarma izni ayrıdır.' },
        { soru: 'Belge kurum dışında geçerli mi?',
          cevap: 'Kurum içi tamamlama kaydı kapalı kurumsal program kaydıdır ve kamuya açık geçerlilik iddiası taşımaz. Kamuya açık belge isteniyorsa program türü farklı kurgulanır.' }
      ]
    }
  ];

  /* §8.2 — program türleri */
  var programTurleri = [
    { slug: 'sertifika',         ad: 'Sertifika Programları',              ikon: 'fa-certificate', kapak: F.sunum },
    { slug: 'universite-ortak',  ad: 'Üniversite Ortak Programları',       ikon: 'fa-building-columns', kapak: F.dunya },
    { slug: 'mutfak-okulu',      ad: 'Mutfak Sanatları Okulu Programları', ikon: 'fa-utensils', kapak: F.bicak },
    { slug: 'kamu',              ad: 'Kamu ve Sosyal Etki Programları',    ikon: 'fa-landmark', kapak: F.guvenlik },
    { slug: 'kurumsal',          ad: 'Kurumsal Mesleki Gelişim Programları', ikon: 'fa-briefcase', kapak: F.baharat }
  ];

  /* §19.1 — iş birliği yaşam döngüsü (12 adım).
     R1/D8: metin Kurumlar Merkezi'nin ve iş birliği başvurusunun sayfa JS'inde
     İKİ AYRI KOPYA olarak duruyordu (devir notu AB-6). Tek kaynağa alındı;
     her iki sayfa da artık bu listeyi okur. */
  var isbirligiSureci = [
    'Kurum iş birliği formunu gönderir veya yönetici kurum adayı oluşturur.',
    'Kurum türü, hedefi, katılımcı sayısı ve zaman ihtiyacı doğrulanır.',
    'İhtiyaç analizi görüşmesi yapılır ve notları kaydedilir.',
    'Uygun iş birliği modeli ve taslak program hazırlanır.',
    'Teklif, bütçe, sorumluluklar, içerik hakları ve takvim netleştirilir.',
    'Protokol/sözleşme ve logo kullanım izinleri yüklenir.',
    'Program, eğitmen, kohort ve değerlendirme sistemi kurulur.',
    'Akademik ve kurumsal yetkililer onay verir.',
    'Katılımcılar davet edilir veya sisteme entegre edilir.',
    'Program yürütülür; devam, değerlendirme ve destek takip edilir.',
    'Sertifika ve rapor onayları tamamlanır.',
    'Etki raporu, memnuniyet ve yenileme kararı oluşturulur.'
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
  /* Faz 3: §13.2 etkinlik detay sayfası atölyeyle AYNI bilgi bloklarını istiyor
     (konum/bağlantı, kayıt kapanışı, ön hazırlık, katılım belgesi, iptal kuralı,
     kayıt erişim süresi). Alanlar bu yüzden atölye şemasıyla hizalandı — iki
     varlık §8.1'de AYRI kalır, yalnız detay şablonu ortaktır. */
  var etkinlikler = [
    {
      id: 'et-01', slug: 'yerel-urunler-paneli',
      ad: 'Yerel Ürünler Paneli', tur: 'panel',
      ozet: 'Yerel üreticiyle çalışan şeflerin tedarik, mevsim ve fiyat gerçeğini konuştuğu açık panel.',
      konu: 'Yerel üretici–mutfak ilişkisi ve tedarik',
      hedefKitle: 'Öğrenciler, üreticiler, işletme sahipleri',
      tarih: '2026-10-08', saat: '19:00', saatDilimi: 'Europe/Istanbul', sureDk: 90,
      format: 'canli', konum: null, onlineBaglanti: true,
      konusmaciId: 'eg-04', partnerKurumId: 'ku-02', programId: null,
      kontenjan: 300, kayitliSayisi: 186, kayitKapanis: '2026-10-07',
      malzeme: [], ekipman: [],
      onHazirlik: 'Ön hazırlık gerekmez; soru göndermek isteyenler kayıt formundaki alanı kullanabilir.',
      ucret: 0, kurumErisimi: false,
      kayitAlinacak: true, erisimSuresi: '90 gün',
      katilimBelgesi: { verilir: false, kosul: null },
      iptalKurali: 'Oturum ertelenirse kayıtlı katılımcılara yeni tarih bildirilir; ücret alınmadığı için iade söz konusu değildir.',
      durum: 'kayit-acik', kapak: F.baharat
    },
    {
      id: 'et-02', slug: 'duyusal-analiz-soylesisi',
      ad: 'Duyusal Analizde Panel Eğitimi Söyleşisi', tur: 'soylesi',
      ozet: 'Duyusal değerlendirme panelinin nasıl kurulduğu ve panelistin nasıl eğitildiği üzerine söyleşi.',
      konu: 'Duyusal değerlendirme panelleri nasıl kurulur',
      hedefKitle: 'Gastronomi öğrencileri ve sektör profesyonelleri',
      tarih: '2027-01-11', saat: '20:00', saatDilimi: 'Europe/Istanbul', sureDk: 75,
      format: 'canli', konum: null, onlineBaglanti: true,
      konusmaciId: 'eg-05', partnerKurumId: 'ku-01', programId: 'pr-02',
      kontenjan: 200, kayitliSayisi: 74, kayitKapanis: '2027-01-10',
      malzeme: [], ekipman: ['Not almak için kâğıt veya dijital defter'],
      onHazirlik: 'Programın duyusal değerlendirme modülünü izlemiş olmak konuşmayı kolaylaştırır.',
      ucret: 0, kurumErisimi: false,
      kayitAlinacak: true, erisimSuresi: '90 gün',
      katilimBelgesi: { verilir: false, kosul: null },
      iptalKurali: 'Erteleme durumunda kayıtlı katılımcılara bildirim gönderilir.',
      durum: 'yakinda', kapak: F.sunum
    },
    {
      id: 'et-03', slug: 'ogrenci-proje-sunum-gunu',
      ad: 'Öğrenci Proje Sunum Günü', tur: 'yarisma',
      ozet: 'Kooperatif mutfağı programının bitirme projelerinin jüri ve kurum yetkilileri önünde sunulduğu gün.',
      konu: 'Kooperatif mutfağı bitirme projeleri sergisi',
      hedefKitle: 'Program katılımcıları, kurum yetkilileri, kamuya açık',
      tarih: '2026-11-30', saat: '14:00', saatDilimi: 'Europe/Istanbul', sureDk: 180,
      format: 'yuz-yuze', konum: 'Yeşilova Belediyesi Kültür Merkezi', onlineBaglanti: false,
      konusmaciId: null, partnerKurumId: 'ku-03', programId: 'pr-03',
      kontenjan: 120, kayitliSayisi: 120, kayitKapanis: '2026-11-25',
      malzeme: ['Sunum yapacak katılımcılar tabaklarını kendileri getirir'],
      ekipman: ['Sunum masaları ve servis ekipmanı kurum tarafından sağlanır'],
      onHazirlik: 'Katılımcılar proje özetini bir hafta önce koordinatöre iletir.',
      ucret: 0, kurumErisimi: true,
      kayitAlinacak: false, erisimSuresi: null,
      katilimBelgesi: { verilir: true, kosul: 'Projeyi sunmak ve jüri değerlendirmesini tamamlamak.' },
      iptalKurali: 'Tarih değişikliği kurum koordinatörü tarafından duyurulur.',
      durum: 'kontenjan-doldu', kapak: F.dunya
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
     12. KULLANICI DURUMU (Faz 2) — Kampüsüm ve ders oynatıcı demo verisi
     ----------------------------------------------------------------------
     🔴 Bunlar KULLANICIYA AİT kayıtlardır ve YALNIZ `body.is-auth` iken
     gösterilir (§26.15 yetkisiz erişim durumu). Ayrı bir "kullanıcı verisi"
     dosyası açılmadı — hibrit kararı gereği tek veri dosyası var.
     ====================================================================== */

  var kullanici = {
    ad: 'Beyar Güneş', kisaAd: 'Beyar', bas: 'B.G.',
    foto: F.avMehmet,
    roller: ['ogrenci'],
    kurumId: null,                 /* kurum kohortu üyesi değil */
    saatDilimi: 'Europe/Istanbul'
  };

  /* ---- BİLDİRİMLER (R1/D3) --------------------------------------------------
     DadaCampus'un KENDİ bildirim türleri; DadaGastro'nun tarif/yorum bildirimleriyle
     karışmaz (karar C1=A). Her kayıt var olan bir varlığa REFERANS verir — metin
     burada, hedef ilgili koleksiyondan çözülür. Uydurma bağlantı üretilmez. */
  var bildirimTurleri = [
    { slug: 'ders',    ad: 'Ders',        ikon: 'fa-circle-play',      renk: 'bilgi' },
    { slug: 'teslim',  ad: 'Teslim',      ikon: 'fa-clipboard-check',  renk: 'uyari' },
    { slug: 'oturum',  ad: 'Canlı Oturum', ikon: 'fa-video',           renk: 'bilgi' },
    { slug: 'belge',   ad: 'Belge',       ikon: 'fa-award',            renk: 'ok'    },
    { slug: 'kurum',   ad: 'Kurum',       ikon: 'fa-building-columns', renk: 'bilgi' }
  ];

  var bildirimler = [
    { id: 'bd-01', tur: 'teslim', okundu: false, zaman: '2026-08-18T09:20',
      baslik: 'Teslimin için revizyon istendi',
      ozet: 'Sebzeli sote tabağı çalışmana eğitmen geri bildirimi bırakıldı; yeni sürüm yükleyebilirsin.',
      hedef: { tip: 'teslim', id: 'ts-01' } },
    { id: 'bd-02', tur: 'ders', okundu: false, zaman: '2026-08-18T07:05',
      baslik: 'Kaldığın ders seni bekliyor',
      ozet: 'Sıfırdan Mutfak: Temel Teknikler Atölyesi — 7. derse kaldığın yerden devam et.',
      hedef: { tip: 'ders', egitimId: 'ed-01', ders: 7 } },
    { id: 'bd-03', tur: 'oturum', okundu: false, zaman: '2026-08-17T18:40',
      baslik: 'Canlı atölye yarın başlıyor',
      ozet: 'Canlı Ekşi Maya Atölyesi oturumuna kayıtlısın. Malzeme listesi oturum detayında.',
      hedef: { tip: 'atolye', id: 'at-01' } },
    { id: 'bd-04', tur: 'belge', okundu: true, zaman: '2026-08-14T12:00',
      baslik: 'Belgen düzenlendi',
      ozet: 'Başarı sertifikan doğrulanabilir kimlikle verildi; belge kimliğiyle herkese açık doğrulanabilir.',
      hedef: { tip: 'sertifika', id: 'DC-2026-004182' } },
    { id: 'bd-05', tur: 'ders', okundu: true, zaman: '2026-08-13T16:30',
      baslik: 'Yeni ders yayında',
      ozet: 'Mayalı Hamurun Sırrı: Ekmek & Fırın eğitimine yeni bir bölüm eklendi.',
      hedef: { tip: 'egitim', id: 'ed-02' } },
    { id: 'bd-06', tur: 'teslim', okundu: true, zaman: '2026-08-11T10:15',
      baslik: 'Teslim son tarihi yaklaşıyor',
      ozet: 'Fırında bütün tavuk uygulaman taslak durumda; son tarihe kadar gönderebilirsin.',
      hedef: { tip: 'teslim', id: 'ts-02' } },
    { id: 'bd-07', tur: 'kurum', okundu: true, zaman: '2026-08-08T09:00',
      baslik: 'Programına yeni kohort açıldı',
      ozet: 'Temel Mutfak Uzmanlık Programı için yeni bir dönem takvimi yayımlandı.',
      hedef: { tip: 'program', id: 'pr-01' } }
  ];

  /* Eğitim ilerlemesi. tamamlanan = ders sıra numarası (1'den başlar). */
  var ilerlemeler = [
    { egitimId: 'ed-01', kayitli: true,  tamamlanan: [1, 2, 3, 4, 5, 6], sonDers: 7, sonErisim: '2026-08-15' },
    { egitimId: 'ed-02', kayitli: true,  tamamlanan: [1, 2], sonDers: 3, sonErisim: '2026-08-11' },
    { egitimId: 'ed-06', kayitli: true,  tamamlanan: [1, 2, 3, 4, 5], sonDers: 5, sonErisim: '2026-07-02' },  /* ed-06 = 5 ders → tamamlandı */
    { egitimId: 'ed-04', kayitli: false, tamamlanan: [], sonDers: 1, sonErisim: null }  /* kaydedildi, başlanmadı */
  ];

  /* Program kayıtları — §18.3 katılımcı yaşam döngüsü */
  var programKayitlari = [
    { programId: 'pr-01', durum: 'devam',    modul: 2, not: 'Modül 2 · uygulama teslimi bekliyor' },
    { programId: 'pr-02', durum: 'kabul',    modul: 0, not: 'Kayıt onayı bekleniyor · 5 Ekim 2026 başlıyor' },
    { programId: 'pr-04', durum: 'basvurdu', modul: 0, not: 'Değerlendirme sürüyor' }
  ];

  /* §14.1–14.3 uygulama teslimleri — her durum bir kez temsil edilir */
  var teslimler = [
    { id: 'ts-01', egitimId: 'ed-01', programId: 'pr-01', ad: 'Sebzeli sote tabağı',
      sonTarih: '2026-08-24', durum: 'revizyon', surum: 2, puan: null, rubrikId: 'rb-01',
      geriBildirim: 'Doğrama boyutları tutarlı; sotelemede tava fazla dolu olduğu için buharda pişmiş. Daha az miktarla tekrar dene.',
      degerlendiriciId: 'eg-01' },
    { id: 'ts-02', egitimId: 'ed-01', programId: 'pr-01', ad: 'Fırında bütün tavuk',
      sonTarih: '2026-08-31', durum: 'taslak', surum: 1, puan: null, rubrikId: 'rb-01',
      geriBildirim: null, degerlendiriciId: null },
    { id: 'ts-03', egitimId: 'ed-01', programId: 'pr-01', ad: 'Temel et suyu',
      sonTarih: '2026-08-10', durum: 'kabul', surum: 1, puan: 84, rubrikId: 'rb-01',
      geriBildirim: 'Berraklık ve tat dengesi iyi. Süzme adımında bezi iki kat kullanırsan daha temiz sonuç alırsın.',
      degerlendiriciId: 'eg-01' },
    { id: 'ts-04', egitimId: 'ed-02', programId: null, ad: 'Ekşi mayalı somun',
      sonTarih: '2026-08-28', durum: 'inceleniyor', surum: 1, puan: null, rubrikId: 'rb-01',
      geriBildirim: null, degerlendiriciId: 'eg-03' },
    { id: 'ts-05', egitimId: 'ed-06', programId: null, ad: 'Ana yemek tabağı',
      sonTarih: '2026-06-28', durum: 'gonderildi', surum: 1, puan: null, rubrikId: 'rb-01',
      geriBildirim: null, degerlendiriciId: null },
    { id: 'ts-06', egitimId: 'ed-06', programId: null, ad: 'Tatlı tabağı',
      sonTarih: '2026-06-14', durum: 'basarisiz', surum: 2, puan: 52, rubrikId: 'rb-01',
      geriBildirim: 'Kompozisyon dengeli değil ve sos sıcaklığı tabağı ısıtmış. Tekrar hakkın var; bir revizyon daha yükleyebilirsin.',
      degerlendiriciId: 'eg-02' }
  ];

  /* §14.3 teslim durumları — etiket + ikon + öğrenci aksiyonu */
  var teslimDurumlari = [
    { slug: 'taslak',      ad: 'Taslak',           ikon: 'fa-pen',            sinif: 'off',  aksiyon: 'Düzenle ve gönder' },
    { slug: 'gonderildi',  ad: 'Gönderildi',       ikon: 'fa-paper-plane',    sinif: 'wait', aksiyon: 'Sonucu bekle' },
    { slug: 'inceleniyor', ad: 'İnceleniyor',      ikon: 'fa-hourglass-half', sinif: 'wait', aksiyon: 'Değişiklik yapma' },
    { slug: 'revizyon',    ad: 'Revizyon İstendi',  ikon: 'fa-rotate-left',    sinif: 'warm', aksiyon: 'Yeni sürüm yükle' },
    { slug: 'kabul',       ad: 'Kabul Edildi',     ikon: 'fa-circle-check',   sinif: 'ok',   aksiyon: 'Sonraki adıma geç' },
    { slug: 'basarisiz',   ad: 'Başarısız',        ikon: 'fa-circle-xmark',   sinif: 'warm', aksiyon: 'Tekrarla veya itiraz et' }
  ];

  /* §12.4 ders içi zaman damgalı notlar */
  var notlar = [
    { id: 'nt-01', egitimId: 'ed-01', ders: 3, dk: 4,  metin: 'Jülyen için bıçağı 45° tutup parmak eklemini kılavuz yapıyor.' },
    { id: 'nt-02', egitimId: 'ed-01', ders: 5, dk: 12, metin: 'Tavayı doldurmamak: buhar yerine kızarma için tek kat.' },
    { id: 'nt-03', egitimId: 'ed-02', ders: 2, dk: 8,  metin: 'Hidrasyon %70 üstünde hamur elde tutulmuyor — kazıyıcı şart.' },
    { id: 'nt-04', egitimId: 'ed-06', ders: 4, dk: 21, metin: 'Tabakta boşluk da bir öğe; üç noktaya yerleştir.' }
  ];

  /* §7.4 / §16.1 ders içi soru-cevap */
  var sorular = [
    { id: 'sr-01', egitimId: 'ed-01', ders: 5, soranBas: 'E. Y.', tarih: '2026-08-12',
      soru: 'Döküm tava yerine çelik tava kullansam mühürleme aynı olur mu?',
      yanitlayanId: 'eg-01', enIyi: true,
      yanit: 'Olur, ama çelik daha hızlı ısı kaybeder. Tavayı bir tık daha uzun ısıt ve eti tek seferde koymayı bırak; iki partiye böl.' },
    { id: 'sr-02', egitimId: 'ed-01', ders: 5, soranBas: 'M. K.', tarih: '2026-08-14',
      soru: 'Etin dinlenme süresi kalınlığa göre değişiyor mu?',
      yanitlayanId: null, enIyi: false, yanit: null },
    { id: 'sr-03', egitimId: 'ed-02', ders: 3, soranBas: 'S. D.', tarih: '2026-08-09',
      soru: 'Buzdolabında gecelik fermantasyonda hamur ekşiyor, normal mi?',
      yanitlayanId: 'eg-03', enIyi: true,
      yanit: 'Normal — soğuk fermantasyon asitliği artırır. İstemiyorsan süreyi 8 saate indir ya da maya oranını biraz düşür.' }
  ];

  /* §7.4 ders içi kısa kontrol soruları (quiz) */
  var quizler = [
    { egitimId: 'ed-01', ders: 3, soru: 'Jülyen doğramada hedeflenen kesit hangisidir?',
      secenekler: ['2×2 mm küp', 'Kibrit çöpü şeridi', '1 cm kalınlığında dilim'], dogru: 1,
      aciklama: 'Jülyen ince şerittir; 2×2 mm küp brunoise, kalın dilim ise dilimlemedir.' },
    { egitimId: 'ed-01', ders: 5, soru: 'Tavada mühürleme yaparken en sık yapılan hata nedir?',
      secenekler: ['Tavayı fazla doldurmak', 'Eti tuzlamak', 'Tavayı ön ısıtmak'], dogru: 0,
      aciklama: 'Fazla dolu tavada sıcaklık düşer, et suyunu bırakır ve kızarmak yerine buğulanır.' },
    { egitimId: 'ed-02', ders: 3, soru: 'Hidrasyon oranı neyi ifade eder?',
      secenekler: ['Su / un ağırlık oranı', 'Maya / un oranı', 'Fermantasyon süresi'], dogru: 0,
      aciklama: 'Hidrasyon, unun ağırlığına göre su ağırlığının yüzdesidir.' }
  ];

  /* ======================================================================
     13. KURUM PANELİ VERİSİ (Faz 4, §10.2–10.3)
     ----------------------------------------------------------------------
     🔴 §10.3: kurum yöneticisi YALNIZ kendi kurumuna bağlı program ve
     katılımcıyı görür. Bu yüzden panel verisi her zaman `kurumId` taşır ve
     arayüz `DC.kurumKapsami()` süzgecinden geçmeden hiçbir kaydı basmaz.
     Demo panel kullanıcısı Yeşilova Üniversitesi (ku-01) koordinatörüdür;
     ku-02/03/05 kayıtları veride VARDIR ama panelde GÖRÜNMEZ — sızma testi.
     ====================================================================== */

  var kurumKullanicisi = {
    ad: 'Dr. Elif Şahin', bas: 'E. Ş.', unvan: 'Sürekli Eğitim Merkezi Koordinatörü',
    kurumId: 'ku-01', foto: F.avSelin,
    /* §10.3 — rapor, öğrenci verisi, belge onayı ve finans AYRI izinlerdir */
    izinler: { program: true, kohort: true, katilimci: true, mufredat: true, takvim: true,
               degerlendirme: true, belgeOnay: true, rapor: true, disaAktar: true,
               dosya: true, finans: false }
  };

  /* Katılımcılar — kohorta bağlı; §18.3 katılımcı yaşam döngüsü */
  var katilimcilar = [
    { id: 'ka-01', kohortId: 'ko-01', bas: 'E. Y.', durum: 'devam',     devam: 0.94, ilerleme: 0.62, sonErisim: '2026-08-16' },
    { id: 'ka-02', kohortId: 'ko-01', bas: 'M. K.', durum: 'devam',     devam: 0.88, ilerleme: 0.71, sonErisim: '2026-08-15' },
    { id: 'ka-03', kohortId: 'ko-01', bas: 'S. A.', durum: 'kayitli',   devam: 0.00, ilerleme: 0.00, sonErisim: null },
    { id: 'ka-04', kohortId: 'ko-01', bas: 'B. T.', durum: 'devam',     devam: 0.79, ilerleme: 0.44, sonErisim: '2026-08-12' },
    { id: 'ka-05', kohortId: 'ko-01', bas: 'N. D.', durum: 'ayrildi',   devam: 0.21, ilerleme: 0.08, sonErisim: '2026-07-04' },
    { id: 'ka-06', kohortId: 'ko-01', bas: 'H. Ö.', durum: 'tamamladi', devam: 0.97, ilerleme: 1.00, sonErisim: '2026-08-09' },
    /* başka kurumun kohortları — panelde GÖRÜNMEMELİ (§10.3 sızma testi) */
    { id: 'ka-07', kohortId: 'ko-02', bas: 'Z. K.', durum: 'devam',     devam: 0.91, ilerleme: 0.55, sonErisim: '2026-08-14' },
    { id: 'ka-08', kohortId: 'ko-03', bas: 'C. R.', durum: 'devam',     devam: 0.66, ilerleme: 0.39, sonErisim: '2026-08-10' }
  ];

  /* §18.3 katılımcı durumları — etiket + ikon + sınıf */
  var katilimciDurumlari = [
    { slug: 'basvurdu',  ad: 'Başvurdu',     ikon: 'fa-paper-plane',        sinif: 'off' },
    { slug: 'kabul',     ad: 'Kabul',        ikon: 'fa-hourglass-half',     sinif: 'wait' },
    { slug: 'kayitli',   ad: 'Kayıtlı',      ikon: 'fa-clipboard-check',    sinif: 'wait' },
    { slug: 'devam',     ad: 'Devam Ediyor', ikon: 'fa-circle-play',        sinif: 'ok' },
    { slug: 'tamamladi', ad: 'Tamamladı',    ikon: 'fa-circle-check',       sinif: 'ok' },
    { slug: 'basarisiz', ad: 'Başarısız',    ikon: 'fa-circle-xmark',       sinif: 'warm' },
    { slug: 'ayrildi',   ad: 'Ayrıldı',      ikon: 'fa-right-from-bracket', sinif: 'off' }
  ];

  /* §10.2 Dosyalar — protokol, sözleşme, müfredat, logo izni ve ekler */
  var kurumDosyalari = [
    { id: 'df-01', kurumId: 'ku-01', ad: 'İş birliği protokolü', tur: 'protokol', ref: 'PROT-2026-018',
      tarih: '2026-03-14', gecerlilik: '2027-03-14', boy: '1,4 MB', durum: 'gecerli' },
    { id: 'df-02', kurumId: 'ku-01', ad: 'Logo kullanım izni', tur: 'izin', ref: 'IZN-2026-007',
      tarih: '2026-03-14', gecerlilik: '2027-03-14', boy: '320 KB', durum: 'gecerli' },
    { id: 'df-03', kurumId: 'ku-01', ad: 'Ortak müfredat ve kazanım eşleştirmesi', tur: 'mufredat', ref: 'MUF-2026-021',
      tarih: '2026-04-02', gecerlilik: null, boy: '860 KB', durum: 'gecerli' },
    { id: 'df-04', kurumId: 'ku-01', ad: 'Öğrenci verisi işleme eki', tur: 'ek', ref: 'EK-2026-003',
      tarih: '2026-04-19', gecerlilik: '2027-03-14', boy: '240 KB', durum: 'gecerli' },
    { id: 'df-05', kurumId: 'ku-01', ad: 'Önceki dönem protokolü', tur: 'protokol', ref: 'PROT-2025-044',
      tarih: '2025-03-10', gecerlilik: '2026-03-10', boy: '1,3 MB', durum: 'suresi-dolmus' },
    { id: 'df-06', kurumId: 'ku-02', ad: 'Hibrit atölye protokolü', tur: 'protokol', ref: 'PROT-2026-024',
      tarih: '2026-04-02', gecerlilik: '2027-04-02', boy: '1,1 MB', durum: 'gecerli' }
  ];

  /* §10.2 Lisans — kontenjan, erişim dönemi, faturalama ve kullanım özeti */
  var kurumLisanslari = [
    { kurumId: 'ku-01', model: 'Kurum koltuk lisansı', kontenjan: 40, kullanilan: 33,
      donemBaslangic: '2026-09-01', donemBitis: '2027-08-31',
      faturalama: 'Yıllık, dönem başında', yenileme: '2027-06-01 tarihine kadar bildirim' },
    { kurumId: 'ku-02', model: 'İçerik lisansı', kontenjan: 25, kullanilan: 18,
      donemBaslangic: '2026-08-01', donemBitis: '2027-07-31',
      faturalama: 'Yıllık', yenileme: '2027-05-01 tarihine kadar bildirim' },
    { kurumId: 'ku-05', model: 'Kurum koltuk lisansı', kontenjan: 120, kullanilan: 48,
      donemBaslangic: '2026-09-01', donemBitis: '2027-02-28',
      faturalama: 'Dönemlik', yenileme: '2027-01-15 tarihine kadar bildirim' }
  ];

  /* §10.3 / §24.2 — kritik işlem kaydı: tarih, kullanıcı, eski → yeni değer */
  var islemGecmisi = [
    { id: 'ig-01', kurumId: 'ku-01', tarih: '2026-08-14', kullanici: 'Dr. Elif Şahin',
      islem: 'Katılımcı durumu değiştirildi', hedef: 'Katılımcı N. D.', eski: 'Devam Ediyor', yeni: 'Ayrıldı' },
    { id: 'ig-02', kurumId: 'ku-01', tarih: '2026-08-09', kullanici: 'Doç. Dr. Nurcan Toprak',
      islem: 'Belge uygunluğu onaylandı', hedef: 'Katılımcı H. Ö.', eski: 'Uygunluk Bekliyor', yeni: 'Onay Bekliyor' },
    { id: 'ig-03', kurumId: 'ku-01', tarih: '2026-07-28', kullanici: 'Dr. Elif Şahin',
      islem: 'Kohort kontenjanı güncellendi', hedef: '2026 Güz Kohortu', eski: '35', yeni: '40' },
    { id: 'ig-04', kurumId: 'ku-01', tarih: '2026-04-19', kullanici: 'Dr. Elif Şahin',
      islem: 'Dosya yüklendi', hedef: 'Öğrenci verisi işleme eki', eski: '—', yeni: 'EK-2026-003' },
    { id: 'ig-05', kurumId: 'ku-02', tarih: '2026-08-11', kullanici: 'Nar Okul Müdürlüğü',
      islem: 'Eğitmen ataması', hedef: 'Hibrit Fırıncılık Atölye Programı', eski: '—', yeni: 'Şef Burak Demirtaş' }
  ];

  /* ======================================================================
     14. EĞİTMEN PANELİ VERİSİ (Faz 5, §11.3–11.4)
     ----------------------------------------------------------------------
     🔴 §26.10 / §26.2: DadaCampus eğitmeni ile DadaGastro tarif şefi AYRI
     rollerdir; başvuru ve panel karışmaz. Buradaki başvuru akışı §11.3'ün
     kendi durum dizisidir (Taslak → Gönderildi → Ön İnceleme → Görüşme →
     Onay/Red → Sözleşme → Aktif) ve `sef-ol-v1.html` ile ilgisi yoktur.
     ====================================================================== */

  var egitmenKullanicisi = {
    egitmenId: 'eg-01',                /* Şef Mehmet Aydın — panel demo kullanıcısı */
    basvuruDurumu: 'aktif',
    /* §11.4 — hakediş ve ödeme ayrı izindir; içerik ve değerlendirme ayrı */
    izinler: { icerik: true, canliDers: true, kohort: true, degerlendirme: true,
               rubrik: true, duyuru: true, analitik: true, hakedis: true, belge: true }
  };

  /* §11.3 başvuru durum dizisi — sıra ÖNEMLİ, arayüz bu sırayı gösterir */
  var egitmenBasvuruDurumlari = [
    { slug: 'taslak',      ad: 'Taslak',        ikon: 'fa-pen',              sinif: 'off',
      not: 'Kaydettin, henüz göndermedin.' },
    { slug: 'gonderildi',  ad: 'Gönderildi',    ikon: 'fa-paper-plane',      sinif: 'wait',
      not: 'Başvurun sıraya alındı.' },
    { slug: 'on-inceleme', ad: 'Ön İnceleme',   ikon: 'fa-magnifying-glass', sinif: 'wait',
      not: 'Belgeler ve yeterlilik kontrol ediliyor.' },
    { slug: 'gorusme',     ad: 'Görüşme',       ikon: 'fa-comments',         sinif: 'wait',
      not: 'Öğretim yaklaşımı ve konu planı görüşülüyor.' },
    { slug: 'onay',        ad: 'Onaylandı',     ikon: 'fa-circle-check',     sinif: 'ok',
      not: 'Başvurun kabul edildi.' },
    { slug: 'red',         ad: 'Reddedildi',    ikon: 'fa-circle-xmark',     sinif: 'warm',
      not: 'Gerekçe yazılı olarak bildirilir; yeniden başvuru hakkın vardır.' },
    { slug: 'sozlesme',    ad: 'Sözleşme',      ikon: 'fa-file-signature',   sinif: 'wait',
      not: 'İçerik kullanım hakkı, telif ve süre koşulları imzalanıyor.' },
    { slug: 'aktif',       ad: 'Aktif',         ikon: 'fa-circle-play',      sinif: 'ok',
      not: 'Panel erişimin açık.' },
    { slug: 'pasif',       ad: 'Pasif',         ikon: 'fa-pause',            sinif: 'off',
      not: 'Sözleşme dönemi sona erdi veya ara verildi.' }
  ];

  /* §11.4 içerik sürüm durumları (Taslak → İnceleme → Yayında → Arşiv) */
  var icerikDurumlari = [
    { slug: 'taslak',     ad: 'Taslak',            ikon: 'fa-pen',            sinif: 'off' },
    { slug: 'inceleme',   ad: 'Editoryal İnceleme', ikon: 'fa-magnifying-glass', sinif: 'wait' },
    { slug: 'akademik',   ad: 'Akademik İnceleme',  ikon: 'fa-graduation-cap', sinif: 'wait' },
    { slug: 'kurum-onay', ad: 'Kurum Onayı',        ikon: 'fa-building-columns', sinif: 'wait' },
    { slug: 'planlandi',  ad: 'Planlandı',          ikon: 'fa-calendar-check', sinif: 'wait' },
    { slug: 'yayinda',    ad: 'Yayında',            ikon: 'fa-circle-check',   sinif: 'ok' },
    { slug: 'arsiv',      ad: 'Arşiv',              ikon: 'fa-box-archive',    sinif: 'off' }
  ];

  /* Eğitmenin içerik kalemleri — §18.3 eğitim yaşam döngüsünde farklı adımlarda */
  var egitmenIcerikleri = [
    { id: 'ic-01', egitmenId: 'eg-01', egitimId: 'ed-01', ad: 'Sıfırdan Mutfak: Temel Teknikler Atölyesi',
      durum: 'yayinda', surum: '1.0', sonGuncelleme: '2026-07-28', izlenme: 1840, tamamlama: 0.61, memnuniyet: 4.6 },
    { id: 'ic-02', egitmenId: 'eg-01', egitimId: 'ed-03', ad: 'Et & Izgara Teknikleri: Dereceyi Tutturmak',
      durum: 'yayinda', surum: '1.0', sonGuncelleme: '2026-07-22', izlenme: 1120, tamamlama: 0.54, memnuniyet: 4.7 },
    { id: 'ic-03', egitmenId: 'eg-01', egitimId: null, ad: 'Sous-vide ve Düşük Sıcaklık Pişirme (yeni)',
      durum: 'akademik', surum: '0.4', sonGuncelleme: '2026-08-12', izlenme: 0, tamamlama: null, memnuniyet: null },
    { id: 'ic-04', egitmenId: 'eg-01', egitimId: null, ad: 'Izgara Teknikleri — 2. sürüm revizyonu',
      durum: 'taslak', surum: '2.0', sonGuncelleme: '2026-08-16', izlenme: 0, tamamlama: null, memnuniyet: null }
  ];

  /* §11.4 hazır geri bildirim şablonları (rubrik kriterine bağlı) */
  var geriBildirimSablonlari = [
    { id: 'gb-01', kriter: 'Teknik doğruluk',    metin: 'Tekniğin adımları doğru sırada; kesit boyutları tutarlı. Bir sonraki denemede hızını değil tutarlılığını koru.' },
    { id: 'gb-02', kriter: 'Hijyen ve güvenlik', metin: 'Çiğ ve pişmiş için ayrı tahta kullanımı doğru. Tezgah düzeni fotoğrafta görünmüyor; bir sonraki teslimde çalışma alanını da çek.' },
    { id: 'gb-03', kriter: 'Süreç yönetimi',     metin: 'Mise en place tamamlanmadan pişirmeye geçilmiş. Tüm malzemeyi hazırlayıp öyle başlamak sonucu belirgin biçimde değiştirir.' },
    { id: 'gb-04', kriter: 'Sunum ve görsel düzen', metin: 'Porsiyon dengeli ancak tabak kenarında iz var. Servis öncesi kenarı silmek sunumu tek adımda düzeltir.' },
    { id: 'gb-05', kriter: 'Revizyon talebi',    metin: 'Teslimin kriterlerin bir kısmını karşılıyor; belirtilen adımı düzeltip yeni sürüm yükleyebilirsin. Revizyon hakkın duruyor.' }
  ];

  /* §11.4 sözleşme, hakediş ve ödeme — demo kayıt */
  var egitmenSozlesmesi = {
    egitmenId: 'eg-01', ref: 'SOZ-2026-112', baslangic: '2026-01-15', bitis: '2027-01-14',
    icerikLisansi: 'Platform içi kullanım · sözleşme süresi + 12 ay arşiv erişimi',
    gelirModeli: 'Eğitim satışında gelir paylaşımı + canlı atölye başına sabit ücret',
    belgeDurumu: 'gecerli', belgeYenileme: '2026-12-01',
    hakedis: [
      { donem: '2026 Haziran', tutar: 18400, durum: 'odendi',   tarih: '2026-07-05' },
      { donem: '2026 Temmuz',  tutar: 21250, durum: 'odendi',   tarih: '2026-08-05' },
      { donem: '2026 Ağustos', tutar: 14900, durum: 'bekliyor', tarih: null }
    ]
  };

  /* ======================================================================
     15. TOPLULUK · PROJE · KARİYER (Faz 6, §16)
     ----------------------------------------------------------------------
     🔴 §16.1: kuruma özel KAPALI topluluk vardır — kohort dışı kullanıcıya
     başlık bile içeriğiyle gösterilmez (§24.2). `kapali:true` olan konu
     `DC.toplulukKonulari()` süzgecinden geçmeden basılmaz.
     ====================================================================== */

  var toplulukKonulari = [
    { id: 'tp-01', kapsam: 'egitim', hedefId: 'ed-01', kapali: false,
      baslik: 'Bıçak bileme taşı seçimi — hangi grit ile başlamalı?',
      acanBas: 'E. Y.', tarih: '2026-08-14', yanit: 7, sabit: false,
      enIyiYanitId: 'eg-01',
      ozet: 'Çift taraflı taşta 1000/6000 mu yoksa 400/1000 mi başlangıç için doğru?' },
    { id: 'tp-02', kapsam: 'egitim', hedefId: 'ed-01', kapali: false,
      baslik: 'Duyuru: Modül 2 uygulama teslim tarihi bir hafta uzatıldı',
      acanBas: 'Şef Mehmet Aydın', tarih: '2026-08-10', yanit: 0, sabit: true,
      enIyiYanitId: null,
      ozet: 'Canlı atölye tarihi değiştiği için teslim son tarihi 31 Ağustos oldu.' },
    { id: 'tp-03', kapsam: 'egitim', hedefId: 'ed-02', kapali: false,
      baslik: 'Ekşi maya buzdolabında kaç gün beslenmeden dayanır?',
      acanBas: 'S. D.', tarih: '2026-08-09', yanit: 4, sabit: false,
      enIyiYanitId: 'eg-03',
      ozet: 'Tatile çıkacağım, mayayı ne yapmalıyım?' },
    { id: 'tp-04', kapsam: 'program', hedefId: 'pr-02', kapali: false,
      baslik: 'Bitirme projesi konusu nasıl seçilir?',
      acanBas: 'M. K.', tarih: '2026-08-06', yanit: 3, sabit: false,
      enIyiYanitId: 'eg-05',
      ozet: 'Duyusal analiz mi yoksa karşılaştırmalı teknik mi daha uygun?' },
    /* 🔴 kuruma özel kapalı topluluk — kohort dışına AYRINTISIYLA gösterilmez */
    { id: 'tp-05', kapsam: 'kohort', hedefId: 'ko-01', kurumId: 'ku-01', kapali: true,
      baslik: 'Kohort içi değerlendirme takvimi',
      acanBas: 'Koordinatör', tarih: '2026-08-12', yanit: 5, sabit: true,
      enIyiYanitId: null,
      ozet: 'Yalnız kohort üyelerine açık.' },
    { id: 'tp-06', kapsam: 'kohort', hedefId: 'ko-02', kurumId: 'ku-03', kapali: true,
      baslik: 'Kooperatif mutfağı vardiya planı',
      acanBas: 'Koordinatör', tarih: '2026-08-08', yanit: 9, sabit: false,
      enIyiYanitId: null,
      ozet: 'Yalnız kohort üyelerine açık.' }
  ];

  /* §16.1 sabitlenmiş kaynaklar — topluluk içinde üste tutturulan içerik */
  var toplulukKaynaklari = [
    { id: 'tk-01', kapsam: 'egitim', hedefId: 'ed-01', ad: 'Doğrama boyutları tablosu', tur: 'PDF' },
    { id: 'tk-02', kapsam: 'egitim', hedefId: 'ed-01', ad: 'Uygulama teslim kontrol listesi', tur: 'PDF' },
    { id: 'tk-03', kapsam: 'egitim', hedefId: 'ed-02', ad: 'Hidrasyon hesap kâğıdı', tur: 'PDF' },
    { id: 'tk-04', kapsam: 'program', hedefId: 'pr-02', ad: 'Duyusal analiz panel kurulum notu', tur: 'PDF' }
  ];

  /* §16.1 topluluk kuralları — moderasyon ve bildirim */
  var toplulukKurallari = [
    'Soru sorarken hangi derste ve hangi adımda takıldığını yaz; bu, yanıtı hızlandırır.',
    'Başkasının teslimini izni olmadan paylaşma (§24.3 öğrenci teslimlerinin kullanımı ayrı izne bağlıdır).',
    'Ticari tanıtım, iş ilanı ve bağlantı paylaşımı Kariyer alanına aittir.',
    'Uygunsuz içeriği bildir; bildirim moderasyon kaydına işlenir ve içerik inceleme süresince kısıtlanabilir.',
    'Eğitmen yanıtı "en iyi yanıt" olarak işaretlenir ve konunun üstüne çıkar.',
    'Kuruma özel kapalı topluluk içeriği kurum dışına taşınamaz (§24.2).'
  ];

  /* §16.2 ortak projeler — altı proje türü */
  var projeler = [
    { id: 'pj-01', slug: 'yerel-tarif-arsivi', tur: 'arsiv', ad: 'Yerel Tarif ve Ürün Arşivi',
      ozet: 'Kaybolmakta olan yöresel tarifleri kaynağıyla birlikte kayda geçiren açık arşiv.',
      kurumId: 'ku-03', programId: 'pr-03', durum: 'aktif',
      katilimci: 24, cikti: '38 tarif kaydı, 12 üretici görüşmesi',
      kapak: F.baharat, katilimKosulu: 'Kooperatif Mutfağı programına kayıtlı olmak' },
    { id: 'pj-02', slug: 'bolgesel-gastronomi-haritasi', tur: 'harita', ad: 'Bölgesel Gastronomi Haritası',
      ozet: 'Yöresel ürünün nerede, hangi mevsimde ve kim tarafından üretildiğini gösteren harita çalışması.',
      kurumId: 'ku-01', programId: 'pr-02', durum: 'aktif',
      katilimci: 18, cikti: '3 ilçe, 46 üretici kaydı',
      kapak: F.dunya, katilimKosulu: 'Sürekli Eğitim Programı katılımcısı olmak' },
    { id: 'pj-03', slug: 'atiksiz-mutfak-calismasi', tur: 'surdurulebilirlik', ad: 'Atıksız Mutfak Çalışması',
      ozet: 'Mutfak atığını ölçen, azaltan ve yeniden değerlendiren uygulama seti.',
      kurumId: 'ku-05', programId: 'pr-05', durum: 'aktif',
      katilimci: 31, cikti: 'Ortalama %22 atık azalması (kurum ölçümü)',
      kapak: F.sunum, katilimKosulu: 'Kurum kohortu üyesi olmak' },
    { id: 'pj-04', slug: 'ogrenci-proje-yarismasi', tur: 'yarisma', ad: 'Öğrenci Proje Yarışması',
      ozet: 'Gerçek bir problem, mentor eşliğinde çözüm ve jüri önünde sunum.',
      kurumId: null, programId: 'pr-01', durum: 'kayit-acik',
      katilimci: 0, cikti: 'Sunum günü 30 Kasım 2026',
      kapak: F.temelMutfak, katilimKosulu: 'Herhangi bir programa kayıtlı olmak' },
    { id: 'pj-05', slug: 'kurum-sektor-atolyesi', tur: 'atolye', ad: 'Kurum–Sektör Problem Çözme Atölyesi',
      ozet: 'Bir işletmenin gerçek operasyon problemine ekip hâlinde çözüm geliştirme.',
      kurumId: 'ku-05', programId: null, durum: 'yakinda',
      katilimci: 0, cikti: 'Dönem sonunda uygulanabilir öneri raporu',
      kapak: F.et, katilimKosulu: 'Davet usulü; kurum koordinatörü belirler' },
    { id: 'pj-06', slug: 'dijital-sergi', tur: 'sergi', ad: 'Dijital Sergi ve Mezuniyet Sunumu',
      ozet: 'Tamamlanan uygulamaların herkese açık dijital sergisi.',
      kurumId: null, programId: null, durum: 'yakinda',
      katilimci: 0, cikti: 'Portfolyodan seçilen çalışmalar',
      kapak: F.pasta, katilimKosulu: 'Portfolyosunda kabul edilmiş çalışma bulunmak' }
  ];

  var projeTurleri = [
    { slug: 'arsiv',             ad: 'Yerel tarif ve ürün arşivi',        ikon: 'fa-box-archive' },
    { slug: 'harita',            ad: 'Bölgesel gastronomi haritası',      ikon: 'fa-map-location-dot' },
    { slug: 'surdurulebilirlik', ad: 'Sürdürülebilir mutfak ve atık azaltma', ikon: 'fa-recycle' },
    { slug: 'yarisma',           ad: 'Öğrenci proje yarışması',           ikon: 'fa-trophy' },
    { slug: 'atolye',            ad: 'Kurum–sektör problem çözme atölyesi', ikon: 'fa-people-group' },
    { slug: 'sergi',             ad: 'Dijital sergi ve mezuniyet sunumu', ikon: 'fa-images' }
  ];

  /* §16.3 kariyer ve fırsatlar — 🔴 ilan yalnız DOĞRULANMIŞ kurum/işletmeden */
  var firsatlar = [
    { id: 'fr-01', tur: 'staj', ad: 'Mutfak Stajı — Zeytin Otelleri Grubu',
      kurumId: 'ku-05', sehir: 'Muğla', sure: '3 ay', tarih: '2026-09-15',
      nitelik: ['Temel mutfak eğitimi tamamlanmış olmak', 'Hijyen belgesi'],
      aciklama: 'Otel mutfağında rotasyonlu staj; her istasyonda iki hafta.', durum: 'acik' },
    { id: 'fr-02', tur: 'is', ad: 'Pastane Komi — Nar Mutfak Sanatları Okulu uygulama mutfağı',
      kurumId: 'ku-02', sehir: 'İzmir', sure: 'Tam zamanlı', tarih: '2026-10-01',
      nitelik: ['Pastacılık eğitimi', 'Vardiyalı çalışabilmek'],
      aciklama: 'Okulun uygulama mutfağında öğrenci gruplarına destek.', durum: 'acik' },
    { id: 'fr-03', tur: 'mentor', ad: 'Mentor Görüşmesi — Mutfak Operasyonu ve Maliyet',
      kurumId: null, mentorId: 'eg-06', sehir: 'Çevrim içi', sure: '45 dk', tarih: '2026-09-05',
      nitelik: ['Program katılımcısı olmak'],
      aciklama: 'Birebir görüşme; menü maliyeti ve porsiyon disiplini.', durum: 'acik' },
    { id: 'fr-04', tur: 'portfolyo-gunu', ad: 'Portfolyo Günü — Güz Dönemi',
      kurumId: 'ku-01', sehir: 'Yeşilova', sure: '1 gün', tarih: '2026-12-12',
      nitelik: ['Portfolyoda en az üç kabul edilmiş çalışma'],
      aciklama: 'Katılımcılar çalışmalarını sektör temsilcilerine sunar.', durum: 'yakinda' },
    { id: 'fr-05', tur: 'etkinlik', ad: 'Sektör Buluşması — Yerel Tedarik',
      kurumId: 'ku-03', sehir: 'Yeşilova', sure: '3 saat', tarih: '2026-10-08',
      nitelik: [], aciklama: 'Üretici ve işletme temsilcileriyle açık buluşma.', durum: 'acik' },
    /* onaysız kurumdan gelen ilan — YAYIMLANMAZ (§16.3 "kurum/işletme doğrulamasıyla") */
    { id: 'fr-06', tur: 'is', ad: 'Aşçı Yardımcısı — Altınkum Üniversitesi yemekhanesi',
      kurumId: 'ku-06', sehir: 'Aydın', sure: 'Tam zamanlı', tarih: '2026-09-20',
      nitelik: [], aciklama: 'Doğrulanmamış kurum ilanı.', durum: 'acik' }
  ];

  var firsatTurleri = [
    { slug: 'staj',           ad: 'Staj',                ikon: 'fa-user-graduate' },
    { slug: 'is',             ad: 'İş İlanı',            ikon: 'fa-briefcase' },
    { slug: 'mentor',         ad: 'Mentor Görüşmesi',    ikon: 'fa-compass' },
    { slug: 'portfolyo-gunu', ad: 'Portfolyo Günü',      ikon: 'fa-images' },
    { slug: 'etkinlik',       ad: 'Sektör Etkinliği',    ikon: 'fa-users' }
  ];

  /* Kullanıcının kariyer başvuruları — Kampüsüm içinde takip edilir (§16.3) */
  var firsatBasvurulari = [
    { firsatId: 'fr-01', durum: 'inceleniyor', tarih: '2026-08-13' },
    { firsatId: 'fr-03', durum: 'kabul',       tarih: '2026-08-05' }
  ];

  /* ======================================================================
     16. YARDIMCILAR — tek kapı (docs/PLAN.md §1)
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
    bildirimTurleri: bildirimTurleri,
    bildirimler: bildirimler,

    /** Bildirimin hedef adresini VAR OLAN kayıttan çözer; kayıt yoksa null döner
        (ölü bağlantı üretilmez — R1/D3). */
    bildirimHedefi: function (b) {
      var h = b && b.hedef; if (!h) return null;
      var D = w.DC;
      if (h.tip === 'teslim') {
        var t = D.bulId('teslimler', h.id);
        return t ? 'dadacampus-kampusum-v1.html?bolum=odevler' : null;
      }
      if (h.tip === 'ders') {
        var e = D.bulId('egitimler', h.egitimId);
        return e ? D.link.ders(e.slug, h.ders) : null;
      }
      if (h.tip === 'egitim')  { var g = D.bulId('egitimler', h.id);  return g ? D.link.egitim(g.slug) : null; }
      if (h.tip === 'program') { var p = D.bulId('programlar', h.id); return p ? D.link.program(p.slug) : null; }
      if (h.tip === 'atolye')  { var a = D.bulId('atolyeler', h.id);  return a ? D.link.atolye(a.slug) : null; }
      if (h.tip === 'sertifika') return 'dadacampus-sertifika-dogrula-v1.html?kod=' + encodeURIComponent(h.id);
      return null;
    },

    /** Okunmamış bildirim sayısı — kabuk zil rozeti bunu okur. */
    okunmamisSayi: function () {
      return (w.DC.bildirimler || []).filter(function (b) { return !b.okundu; }).length;
    },

    /* kullanıcı durumu (yalnız body.is-auth iken gösterilir) */
    kullanici: kullanici,
    ilerlemeler: ilerlemeler,
    programKayitlari: programKayitlari,
    teslimler: teslimler,
    teslimDurumlari: teslimDurumlari,
    notlar: notlar,
    sorular: sorular,
    quizler: quizler,

    /* kurum paneli (§10.2–10.3) — panel bunlara DOĞRUDAN erişmez,
       DC.kurumKapsami() süzgecinden geçer */
    kurumKullanicisi: kurumKullanicisi,
    katilimcilar: katilimcilar,
    katilimciDurumlari: katilimciDurumlari,
    kurumDosyalari: kurumDosyalari,
    kurumLisanslari: kurumLisanslari,
    islemGecmisi: islemGecmisi,

    /* eğitmen paneli (§11.3–11.4) — DadaGastro "Şef Ol" akışından AYRI (§26.10) */
    egitmenKullanicisi: egitmenKullanicisi,
    egitmenBasvuruDurumlari: egitmenBasvuruDurumlari,
    icerikDurumlari: icerikDurumlari,
    egitmenIcerikleri: egitmenIcerikleri,
    geriBildirimSablonlari: geriBildirimSablonlari,
    egitmenSozlesmesi: egitmenSozlesmesi,

    /* topluluk · proje · kariyer (§16) */
    toplulukKonulari: toplulukKonulari,
    toplulukKaynaklari: toplulukKaynaklari,
    toplulukKurallari: toplulukKurallari,
    projeler: projeler,
    projeTurleri: projeTurleri,
    firsatlar: firsatlar,
    firsatTurleri: firsatTurleri,
    firsatBasvurulari: firsatBasvurulari,

    /* referans listeleri */
    konuAlanlari: konuAlanlari,
    seviyeler: seviyeler,
    formatlar: formatlar,
    sureKovalari: sureKovalari,
    erisimTipleri: erisimTipleri,
    belgeTurleri: belgeTurleri,
    roller: roller,
    egitmenRolleri: egitmenRolleri,
    kurumTurleri: kurumTurleri,
    programTurleri: programTurleri,
    etkinlikTurleri: etkinlikTurleri,
    isbirligiModelleri: isbirligiModelleri,
    isbirligiSureci: isbirligiSureci,

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

    /* --- 🧭 "BANA UYGUN BAŞLANGICI BUL" EŞLEŞTİRMESİ (R1/D8) --------
       Sihirbaz sayfası (dadacampus-sihirbaz-v1.html) DOM'da eşleştirme yapmaz;
       kriterleri buraya verir ve sıralı öneri alır. Sayfa JS'ine gömülseydi
       aynı mantık programlar tarafında ikinci kez yazılırdı (§26.14).

       Kriter: { tip:'egitim'|'program', hedef:<konu slug>, seviye, sure, format }
       Boş bırakılan kriter ELEMEZ, yalnız puan katmaz — kullanıcı dört soruyu
       da yanıtlamak zorunda değil (§ "baskı değil denge").

       Dönen kayıt: { kayit, puan, enCok, nedenler[] } — `nedenler` arayüzde
       "neden bu öneri" satırı olarak yazılır; kapalı kutu bırakılmaz.
       Süre toleranslıdır: haftada çok vakti olan kısa eğitimi de alabilir,
       tersi doğru değildir (kova sırası az < orta < cok). */
    oner: function (kri) {
      var k = kri || {};
      var sira = { az: 0, orta: 1, cok: 2 };

      function sureUyum(kova, istek) {
        if (!istek || !kova) return null;
        if (kova === istek) return { p: 2, n: 'Ayırdığın süreye uygun kapsamda' };
        if (sira[kova] < sira[istek]) return { p: 1, n: 'Daha kısa kapsamlı — ayırdığın süreden az yer tutar' };
        return null;
      }

      function puanla(x, tip) {
        var p = 0, n = [];
        if (k.hedef && x.kategori === k.hedef) { p += 3; n.push(DC.etiket('konuAlanlari', k.hedef) + ' alanında'); }
        if (k.seviye && x.seviye === k.seviye) { p += 2; n.push(DC.etiket('seviyeler', k.seviye) + ' seviyesi için'); }
        if (k.format && x.formatlar && x.formatlar.indexOf(k.format) > -1) {
          p += 2; n.push(DC.etiket('formatlar', k.format) + ' formatı var');
        }
        var su = sureUyum(x.sureKovasi, k.sure);
        if (su) { p += su.p; n.push(su.n); }
        return { kayit: x, tip: tip, puan: p, nedenler: n };
      }

      /* eğitim/program kayıtları aynı alan adlarıyla okunabilsin diye ince bir
         görünüm kurulur — veri KOPYALANMAZ, kayda referans taşınır. */
      function egitimGorunum(e) {
        return { kategori: e.kategori, seviye: e.seviye, formatlar: [e.format],
                 sureKovasi: e.sureKovasi };
      }
      function programGorunum(pr) {
        var kats = [], sevs = [], fmts = [];
        (pr.egitimIds || []).forEach(function (id) {
          var e = DC.egitim(id); if (!e) return;
          if (kats.indexOf(e.kategori) === -1) kats.push(e.kategori);
          if (sevs.indexOf(e.seviye) === -1) sevs.push(e.seviye);
          if (fmts.indexOf(e.format) === -1) fmts.push(e.format);
        });
        return { kategori: kats.indexOf(k.hedef) > -1 ? k.hedef : kats[0],
                 seviye: sevs.indexOf(k.seviye) > -1 ? k.seviye : sevs[0],
                 formatlar: fmts, sureKovasi: pr.yukKovasi };
      }

      function sirala(liste) {
        return liste.sort(function (a, b) { return b.puan - a.puan; });
      }

      var eg = sirala(egitimler.map(function (e) {
        var r = puanla(egitimGorunum(e), 'egitim'); r.kayit = e; return r;
      }));
      var pg = sirala(programlar.map(function (pr) {
        var r = puanla(programGorunum(pr), 'program'); r.kayit = pr; return r;
      }));
      var enIyi = (eg[0] && eg[0].puan) || 0;
      eg.forEach(function (r) { r.enCok = r.puan > 0 && r.puan === enIyi; });
      var enIyiP = (pg[0] && pg[0].puan) || 0;
      pg.forEach(function (r) { r.enCok = r.puan > 0 && r.puan === enIyiP; });
      return { egitimler: eg, programlar: pg, kriterSayisi:
        ['hedef', 'seviye', 'sure', 'format'].filter(function (a) { return !!k[a]; }).length };
    },

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

    /* --- öğrenme durumu (Faz 2) ------------------------------------------- */

    /** Girişli mi? Kabuk `body.is-auth` ile işaretliyor; tek okuma noktası. */
    girisli: function () {
      return !!(w.document.body && w.document.body.classList.contains('is-auth'));
    },

    /** Eğitimin düz ders listesi: [{no, ad, sureDk, onizleme, bolum, bolumNo}] */
    dersler: function (egitim) {
      var out = [], no = 0;
      (egitim && egitim.bolumler || []).forEach(function (b, bi) {
        (b.dersler || []).forEach(function (d) {
          no++;
          out.push({ no: no, ad: d.ad, sureDk: d.sureDk, onizleme: !!d.onizleme,
                     bolum: b.ad, bolumNo: bi + 1 });
        });
      });
      return out;
    },

    /** Eğitim ilerleme kaydı (yoksa boş iskelet — çağıran null kontrolü yapmasın) */
    ilerleme: function (egitimId) {
      for (var i = 0; i < ilerlemeler.length; i++) {
        if (ilerlemeler[i].egitimId === egitimId) return ilerlemeler[i];
      }
      return { egitimId: egitimId, kayitli: false, tamamlanan: [], sonDers: 1, sonErisim: null };
    },

    /** Tamamlanma yüzdesi — ders sayısından TÜRETİLİR, elle yazılmaz. */
    yuzde: function (egitimId) {
      var e = DC.egitim(egitimId);
      if (!e || !e.dersSayisi) return 0;
      return Math.round(DC.ilerleme(egitimId).tamamlanan.length / e.dersSayisi * 100);
    },

    /** Program kaydı (başvurdu/kabul/devam/tamamlandi) */
    programKaydi: function (programId) {
      for (var i = 0; i < programKayitlari.length; i++) {
        if (programKayitlari[i].programId === programId) return programKayitlari[i];
      }
      return null;
    },

    /** §14.3 teslim durumu tanımı (etiket + ikon + sınıf + öğrenci aksiyonu) */
    teslimDurumu: function (slug) {
      for (var i = 0; i < teslimDurumlari.length; i++) {
        if (teslimDurumlari[i].slug === slug) return teslimDurumlari[i];
      }
      return { slug: slug, ad: slug, ikon: 'fa-circle', sinif: 'off', aksiyon: '' };
    },

    /** Bir eğitimin belgesini veren kurum(lar) — onay kaydı süzgeciyle */
    egitimVerenler: function (egitim) {
      if (!egitim || !egitim.kurumIds) return [];
      return egitim.kurumIds
        .filter(function (id) { return DC.onayliMi(id); })
        .map(function (id) { return DC.kurum(id); });
    },

    /** §17.3 — eğitimi içeren programlar (çapraz bağlantı) */
    egitiminProgramlari: function (egitimId) {
      return programlar.filter(function (p) { return (p.egitimIds || []).indexOf(egitimId) > -1; });
    },

    /** §17.3 — benzer eğitimler: aynı konu alanı, kendisi hariç */
    benzerEgitimler: function (egitim, adet) {
      var ayni = egitimler.filter(function (e) {
        return e.id !== egitim.id && e.kategori === egitim.kategori;
      });
      /* aynı seviye, sonra kalan her şey — liste ASLA boş dönmez (tek kayıtlı
         konu alanında "benzer eğitim yok" boşluğu oluşuyordu; ölçümle yakalandı) */
      var seviye = egitimler.filter(function (e) {
        return e.id !== egitim.id && e.kategori !== egitim.kategori && e.seviye === egitim.seviye;
      });
      var kalan = egitimler.filter(function (e) {
        return e.id !== egitim.id && e.kategori !== egitim.kategori && e.seviye !== egitim.seviye;
      });
      return ayni.concat(seviye, kalan).slice(0, adet || 3);
    },

    /** Bir eğitime bağlı atölyeler (aynı programa bağlı canlı oturumlar) */
    egitiminAtolyeleri: function (egitimId) {
      var pids = DC.egitiminProgramlari(egitimId).map(function (p) { return p.id; });
      return atolyeler.filter(function (a) { return a.programId && pids.indexOf(a.programId) > -1; });
    },

    /* --- program / kohort / takvim (Faz 3) -------------------------------- */

    atolye:   function (id) { return DC.bulId('atolyeler', id); },
    etkinlik: function (id) { return DC.bulId('etkinlikler', id); },
    kohort:   function (id) { return DC.bulId('kohortlar', id); },

    /** Programın kurum kohortları (§8.1 — kohort programdan AYRI varlıktır). */
    programKohortlari: function (programId) {
      return kohortlar.filter(function (k) { return k.programId === programId; });
    },

    /**
     * Programın eğitmen kadrosu, ROLE göre ayrılmış (§8.3).
     * yonetici · koordinator · egitmen · degerlendirici · akademik danışman.
     * Aynı kişi birden fazla rolde görünebilir; roller karıştırılmaz (§3.3).
     */
    programKadro: function (p) {
      if (!p) return [];
      var out = [], ekle = function (id, rol) {
        if (!id) return;
        var e = DC.egitmen(id);
        if (!e) return;
        var v = out.filter(function (x) { return x.egitmen.id === id; })[0];
        if (v) { if (v.roller.indexOf(rol) === -1) v.roller.push(rol); }
        else out.push({ egitmen: e, roller: [rol] });
      };
      ekle(p.yoneticiId, 'Program yöneticisi');
      ekle(p.koordinatorId, 'Koordinatör');
      (p.egitmenIds || []).forEach(function (id) { ekle(id, 'Eğitmen'); });
      (p.degerlendiriciIds || []).forEach(function (id) { ekle(id, 'Değerlendirici'); });
      /* akademik onay rolü olan eğitmen partner kurumdan gelir */
      (p.partnerKurumIds || []).forEach(function (kid) {
        var k = DC.kurum(kid);
        (k && k.egitmenIds || []).forEach(function (id) {
          var e = DC.egitmen(id);
          if (e && (e.kurulRolleri || []).indexOf('akademik-onay') > -1) ekle(id, 'Akademik danışman');
        });
      });
      return out;
    },

    /** Programa bağlı atölyeler + etkinlikler, tarih sırasıyla. */
    programOturumlari: function (programId) {
      var a = atolyeler.filter(function (x) { return x.programId === programId; })
        .map(function (x) { return { tip: 'atolye', k: x }; });
      var e = etkinlikler.filter(function (x) { return x.programId === programId; })
        .map(function (x) { return { tip: 'etkinlik', k: x }; });
      return a.concat(e).sort(function (x, y) { return x.k.tarih.localeCompare(y.k.tarih); });
    },

    /**
     * GENEL AKADEMİK TAKVİM (§13) — tarihli her kayıt tek eksende.
     * Kayıt biçimi: { tarih, saat, ad, alt, tur, etiket, href, kurumId, programId }
     * `tur`: program-adimi | atolye | etkinlik | son-tarih
     * 🔴 Kuruma özel KAPALI oturum (tur='kapali-oturum') herkese açık takvimde
     *    ad ve konumuyla listelenmez — yalnız kohort üyesine görünür (§24.2).
     */
    takvim: function (opt) {
      opt = opt || {};
      var out = [];
      programlar.forEach(function (p) {
        (p.akademikTakvim || []).forEach(function (t) {
          out.push({ tarih: t.tarih, saat: null, ad: t.ad, alt: p.ad, tur: 'program-adimi',
            etiket: 'Program adımı', href: DC.link.program(p.slug),
            programId: p.id, kurumId: (p.partnerKurumIds || [])[0] || null });
        });
        if (p.basvuruBitis) {
          out.push({ tarih: p.basvuruBitis, saat: '23:59', ad: 'Başvuru kapanışı', alt: p.ad,
            tur: 'son-tarih', etiket: 'Son tarih', href: DC.link.program(p.slug),
            programId: p.id, kurumId: (p.partnerKurumIds || [])[0] || null });
        }
      });
      atolyeler.forEach(function (a) {
        var kapali = a.tur === 'kapali-oturum';
        if (kapali && !opt.kohortUyesi) {
          out.push({ tarih: a.tarih, saat: a.saat, ad: 'Kuruma özel kapalı oturum',
            alt: 'Ayrıntılar yalnız kohort üyelerine görünür', tur: 'atolye',
            etiket: 'Kapalı oturum', href: null, kapali: true,
            programId: a.programId, kurumId: a.partnerKurumId });
          return;
        }
        out.push({ tarih: a.tarih, saat: a.saat, ad: a.ad,
          alt: DC.etiket('etkinlikTurleri', a.tur) +
            (a.format === 'yuz-yuze' ? ' · ' + (a.konum || 'yüz yüze') : ' · canlı, çevrim içi'),
          tur: 'atolye', etiket: DC.etiket('etkinlikTurleri', a.tur),
          href: DC.link.atolye(a.slug), programId: a.programId, kurumId: a.partnerKurumId });
      });
      etkinlikler.forEach(function (x) {
        out.push({ tarih: x.tarih, saat: x.saat, ad: x.ad,
          alt: DC.etiket('etkinlikTurleri', x.tur) +
            (x.format === 'yuz-yuze' ? ' · ' + (x.konum || 'yüz yüze') : ' · canlı, çevrim içi'),
          tur: 'etkinlik', etiket: DC.etiket('etkinlikTurleri', x.tur),
          href: DC.link.etkinlik(x.slug), programId: x.programId, kurumId: x.partnerKurumId });
      });
      return out.sort(function (a, b) { return a.tarih.localeCompare(b.tarih) || String(a.saat).localeCompare(String(b.saat)); });
    },

    /** 'YYYY-MM' → o ayın kayıtları. */
    takvimAy: function (ay, opt) {
      return DC.takvim(opt).filter(function (o) { return o.tarih.slice(0, 7) === ay; });
    },

    /** Takvimde geçen ayların sıralı listesi ['2026-08', …] */
    takvimAylari: function (opt) {
      var g = {}, out = [];
      DC.takvim(opt).forEach(function (o) {
        var a = o.tarih.slice(0, 7);
        if (!g[a]) { g[a] = 1; out.push(a); }
      });
      return out.sort();
    },

    /** '2026-09' → 'Eylül 2026' */
    ayAdi: function (ay) {
      var AY = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
      var p = String(ay).split('-');
      return AY[parseInt(p[1], 10) - 1] + ' ' + p[0];
    },

    /** Programın belge kaydı (varsa) — sertifikalar koleksiyonundan örnek. */
    programBelgesi: function (programId) {
      for (var i = 0; i < sertifikalar.length; i++) {
        if (sertifikalar[i].programId === programId) return sertifikalar[i];
      }
      return null;
    },

    /* --- kurum paneli kapsamı (Faz 4, §10.3) ------------------------------ */

    /**
     * 🔴 KURUM KAPSAM KAPISI — panelin TEK veri girişi.
     * §10.3: "Kurum yöneticisi yalnız kendi kurumuna bağlı program ve
     * katılımcıları görmelidir." §26.2: "Kurum kullanıcılarına başka kurumların
     * öğrenci ve raporlarını göstermek" yapılmaması gerekenler listesinde.
     * Bu yüzden panel hiçbir koleksiyona doğrudan erişmez; her şey buradan geçer.
     */
    kurumKapsami: function (kurumId) {
      var kid = kurumId || (kurumKullanicisi && kurumKullanicisi.kurumId);
      var kurum = DC.kurum(kid);
      var prog = programlar.filter(function (p) { return (p.partnerKurumIds || []).indexOf(kid) > -1; });
      var progIds = prog.map(function (p) { return p.id; });
      var koh = kohortlar.filter(function (k) { return k.kurumId === kid; });
      var kohIds = koh.map(function (k) { return k.id; });
      var kat = katilimcilar.filter(function (k) { return kohIds.indexOf(k.kohortId) > -1; });
      var egt = [];
      prog.forEach(function (p) {
        DC.programKadro(p).forEach(function (x) {
          if (egt.indexOf(x.egitmen) === -1) egt.push(x.egitmen);
        });
      });
      return {
        kurum: kurum,
        programlar: prog,
        kohortlar: koh,
        katilimcilar: kat,
        egitmenler: egt,
        oturumlar: atolyeler.filter(function (a) { return a.partnerKurumId === kid || progIds.indexOf(a.programId) > -1; })
          .concat(etkinlikler.filter(function (x) { return x.partnerKurumId === kid || progIds.indexOf(x.programId) > -1; })),
        dosyalar: kurumDosyalari.filter(function (d) { return d.kurumId === kid; }),
        lisans: kurumLisanslari.filter(function (l) { return l.kurumId === kid; })[0] || null,
        gecmis: islemGecmisi.filter(function (g) { return g.kurumId === kid; }),
        teslimler: teslimler.filter(function (t) { return progIds.indexOf(t.programId) > -1; })
      };
    },

    /** §18.3 katılımcı durumu tanımı. */
    katilimciDurumu: function (slug) {
      for (var i = 0; i < katilimciDurumlari.length; i++) {
        if (katilimciDurumlari[i].slug === slug) return katilimciDurumlari[i];
      }
      return { slug: slug, ad: slug, ikon: 'fa-circle', sinif: 'off' };
    },

    /**
     * §21.2 kurum raporu — sayılar VERİDEN türetilir, elle yazılmaz.
     * §23.2 gereği geniş tablo yerine özet kart + detay yaklaşımı kullanılır.
     */
    kurumRaporu: function (kurumId) {
      var k = DC.kurumKapsami(kurumId);
      var kat = k.katilimcilar;
      var say = function (d) { return kat.filter(function (x) { return x.durum === d; }).length; };
      var ort = function (alan) {
        var v = kat.filter(function (x) { return x.durum !== 'kayitli'; });
        if (!v.length) return 0;
        return v.reduce(function (t, x) { return t + (x[alan] || 0); }, 0) / v.length;
      };
      return {
        kayitli: kat.length,
        aktif: say('devam'),
        tamamlayan: say('tamamladi'),
        ayrilan: say('ayrildi'),
        devamOrani: ort('devam'),
        ilerlemeOrani: ort('ilerleme'),
        tamamlamaOrani: kat.length ? say('tamamladi') / kat.length : 0,
        programSayisi: k.programlar.length,
        kohortSayisi: k.kohortlar.length,
        oturumSayisi: k.oturumlar.length,
        bekleyenDegerlendirme: k.teslimler.filter(function (t) {
          return t.durum === 'gonderildi' || t.durum === 'inceleniyor';
        }).length,
        lisansKullanim: k.lisans ? k.lisans.kullanilan / k.lisans.kontenjan : 0
      };
    },

    /* --- eğitmen paneli kapsamı (Faz 5, §11.4) ---------------------------- */

    /**
     * 🔴 EĞİTMEN KAPSAM KAPISI — panelin tek veri girişi.
     * Eğitmen yalnız KENDİ içeriğini, kohortunu ve değerlendirme kuyruğunu görür.
     * §3.3: öğrenci, şef, akademisyen ve kurum koordinatörü fonksiyonları aynı
     * ekranda karışmaz. §26.2: rolleri karıştırmak yapılmaması gerekenlerde.
     */
    egitmenKapsami: function (egitmenId) {
      var eid = egitmenId || (egitmenKullanicisi && egitmenKullanicisi.egitmenId);
      var e = DC.egitmen(eid);
      var egt = egitimler.filter(function (x) { return x.egitmenId === eid; });
      var egtIds = egt.map(function (x) { return x.id; });
      var prog = programlar.filter(function (p) {
        return (p.egitmenIds || []).indexOf(eid) > -1 ||
               (p.degerlendiriciIds || []).indexOf(eid) > -1 ||
               p.yoneticiId === eid || p.koordinatorId === eid;
      });
      var progIds = prog.map(function (p) { return p.id; });
      return {
        egitmen: e,
        egitimler: egt,
        icerikler: egitmenIcerikleri.filter(function (i) { return i.egitmenId === eid; }),
        programlar: prog,
        kohortlar: kohortlar.filter(function (k) { return (k.egitmenIds || []).indexOf(eid) > -1 || k.koordinatorId === eid; }),
        oturumlar: atolyeler.filter(function (a) { return a.egitmenId === eid; })
          .concat(etkinlikler.filter(function (x) { return x.konusmaciId === eid; })),
        /* değerlendirme kuyruğu: kendi eğitimlerinin ya da programlarının teslimleri */
        kuyruk: teslimler.filter(function (t) {
          return egtIds.indexOf(t.egitimId) > -1 || progIds.indexOf(t.programId) > -1;
        }),
        sorular: sorular.filter(function (q) { return egtIds.indexOf(q.egitimId) > -1; }),
        sozlesme: egitmenSozlesmesi.egitmenId === eid ? egitmenSozlesmesi : null
      };
    },

    /** §11.3 başvuru durumu tanımı. */
    basvuruDurumu: function (slug) {
      for (var i = 0; i < egitmenBasvuruDurumlari.length; i++) {
        if (egitmenBasvuruDurumlari[i].slug === slug) return egitmenBasvuruDurumlari[i];
      }
      return { slug: slug, ad: slug, ikon: 'fa-circle', sinif: 'off', not: '' };
    },

    /** §18.3 eğitim/içerik yayın durumu tanımı. */
    icerikDurumu: function (slug) {
      for (var i = 0; i < icerikDurumlari.length; i++) {
        if (icerikDurumlari[i].slug === slug) return icerikDurumlari[i];
      }
      return { slug: slug, ad: slug, ikon: 'fa-circle', sinif: 'off' };
    },

    /** §11.1 eğitmen dizini süzgeci — rol / uzmanlık / dil / kurum. */
    egitmenAra: function (kri) {
      kri = kri || {};
      var q = kri.q ? DC.norm(kri.q) : '';
      return egitmenler.filter(function (e) {
        if (kri.rol && e.rol !== kri.rol) return false;
        if (kri.uzmanlik && (e.uzmanliklar || []).indexOf(kri.uzmanlik) === -1) return false;
        if (kri.dil && (e.diller || []).indexOf(kri.dil) === -1) return false;
        /* 🔴 kurum süzgeci yalnız ONAY KAYDI olan kurumlar üzerinden (§26.13) */
        if (kri.kurum && !(e.kurumId === kri.kurum && DC.onayliMi(e.kurumId))) return false;
        if (kri.dogrulandi && !e.dogrulandi) return false;
        if (q) {
          var m = [e.ad, e.unvan, e.biyografi, (e.uzmanliklar || []).join(' '),
                   (e.diller || []).join(' ')].join(' ');
          if (DC.norm(m).indexOf(q) === -1) return false;
        }
        return true;
      });
    },

    /** Eğitmenin verdiği eğitim ve programlar (§11.2 profil çapraz bağlantısı). */
    egitmenIsleri: function (e) {
      if (!e) return { egitimler: [], programlar: [], oturumlar: [] };
      return {
        egitimler: (e.egitimIds || []).map(function (id) { return DC.egitim(id); }).filter(Boolean),
        programlar: (e.programIds || []).map(function (id) { return DC.program(id); }).filter(Boolean),
        oturumlar: atolyeler.filter(function (a) { return a.egitmenId === e.id; })
          .concat(etkinlikler.filter(function (x) { return x.konusmaciId === e.id; }))
      };
    },

    /* --- topluluk / proje / kariyer (Faz 6, §16) --------------------------- */

    /**
     * 🔴 TOPLULUK KAPISI (§16.1 kuruma özel kapalı topluluk, §24.2).
     * Kohort dışı kullanıcıya kapalı konunun BAŞLIĞI ve ÖZETİ gösterilmez;
     * yalnız "kuruma özel kapalı topluluk var" bilgisi kalır. Kapalı konu
     * listeden tamamen silinmez — varlığını gizlemek, kohort üyesinin
     * göremediği bir içerik olduğunu da gizlerdi.
     * @param opt.kohortIds kullanıcının üyesi olduğu kohort id'leri
     */
    topluluk: function (opt) {
      opt = opt || {};
      var uye = opt.kohortIds || [];
      return toplulukKonulari.map(function (k) {
        if (!k.kapali || uye.indexOf(k.hedefId) > -1) return k;
        /* maskeli kopya — özgün kayıt değiştirilmez */
        return { id: k.id, kapsam: k.kapsam, hedefId: k.hedefId, kurumId: k.kurumId,
                 kapali: true, maskeli: true,
                 baslik: 'Kuruma özel kapalı topluluk konusu',
                 acanBas: '—', tarih: k.tarih, yanit: k.yanit, sabit: false,
                 enIyiYanitId: null,
                 ozet: 'Bu konu yalnız ilgili kurum kohortunun üyelerine açıktır.' };
      });
    },

    /** Bir eğitim/program/kohort için topluluk konuları (sabitlenmiş üstte). */
    toplulukKapsam: function (kapsam, hedefId, opt) {
      return DC.topluluk(opt)
        .filter(function (k) { return k.kapsam === kapsam && k.hedefId === hedefId; })
        .sort(function (a, b) { return (b.sabit ? 1 : 0) - (a.sabit ? 1 : 0); });
    },

    /** Proje kaydı; kurum adı yalnız onay kaydı varsa çözülür (§26.13). */
    projeKurumu: function (p) {
      return (p && p.kurumId && DC.onayliMi(p.kurumId)) ? DC.kurum(p.kurumId) : null;
    },

    /**
     * §16.3 — İlan yalnız DOĞRULANMIŞ kurum/işletmeden yayımlanır.
     * `kurumId` varsa onay kaydı aranır; kurumsuz kayıt (mentor görüşmesi gibi)
     * platformun kendi programıdır ve yayımlanır.
     */
    yayindakiFirsatlar: function () {
      return firsatlar.filter(function (f) {
        return !f.kurumId || DC.onayliMi(f.kurumId);
      });
    },

    /** Kullanıcının bir fırsata başvuru durumu (yoksa null). */
    firsatBasvurusu: function (firsatId) {
      for (var i = 0; i < firsatBasvurulari.length; i++) {
        if (firsatBasvurulari[i].firsatId === firsatId) return firsatBasvurulari[i];
      }
      return null;
    },

    /**
     * §21.1 öğrenci raporu — sayılar VERİDEN türetilir.
     * §14.2 rubrik sonuçları ve §15.2 belge uygunluğu birlikte.
     */
    ogrenciRaporu: function () {
      var kayitli = ilerlemeler.filter(function (i) { return i.kayitli; });
      var toplamDers = 0, bitenDers = 0;
      kayitli.forEach(function (i) {
        var e = DC.egitim(i.egitimId);
        if (!e) return;
        toplamDers += e.dersSayisi;
        bitenDers += i.tamamlanan.length;
      });
      var kabul = teslimler.filter(function (t) { return t.durum === 'kabul'; });
      var puanli = teslimler.filter(function (t) { return t.puan != null; });
      return {
        kayitliEgitim: kayitli.length,
        tamamlananEgitim: kayitli.filter(function (i) { return DC.yuzde(i.egitimId) >= 100; }).length,
        dersIlerlemesi: toplamDers ? bitenDers / toplamDers : 0,
        toplamDers: toplamDers, bitenDers: bitenDers,
        teslim: teslimler.length,
        kabulEdilen: kabul.length,
        revizyon: teslimler.filter(function (t) { return t.durum === 'revizyon'; }).length,
        ortalamaPuan: puanli.length
          ? Math.round(puanli.reduce(function (t, x) { return t + x.puan; }, 0) / puanli.length) : null,
        programKaydi: programKayitlari.length,
        belge: sertifikalar.filter(function (s) { return s.durum === 'gecerli'; }).length
      };
    },

    /** §21.3 platform raporu — toplam görünüm (yetkiye bağlı gösterilir). */
    platformRaporu: function () {
      var yayinda = egitimler.filter(function (e) { return e.durum === 'yayinda'; }).length;
      var acik = programlar.filter(function (p) { return p.durum === 'kayit-acik'; }).length;
      return {
        egitim: egitimler.length, yayindaEgitim: yayinda,
        program: programlar.length, basvuruAcik: acik,
        kurum: kurumlar.length, onayliKurum: DC.onayliKurumlar().length,
        egitmen: egitmenler.length,
        kohort: kohortlar.length,
        katilimci: kohortlar.reduce(function (t, k) { return t + k.katilimciSayisi; }, 0),
        oturum: atolyeler.length + etkinlikler.length,
        belge: sertifikalar.length,
        belgeGecerli: sertifikalar.filter(function (s) { return s.durum === 'gecerli'; }).length,
        belgeIptal: sertifikalar.filter(function (s) { return s.durum === 'iptal'; }).length
      };
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
    /* R1/D8 — sihirbazın süre sorusu için KAPSAM kovası. Elle yazılmaz:
       toplam süreden türetilir (eşikler mevcut 126–213 dk yayılımına göre),
       içerik büyüyünce kendiliğinden doğru kalır. Kova bir SÜRE VAADİ değil,
       kapsam işaretidir: az vakti olana kısa kapsamlı eğitim önerilir. */
    e.sureKovasi = e.sureDk < 150 ? 'az' : (e.sureDk <= 200 ? 'orta' : 'cok');
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
    /* R1/D8 — haftalık yük metninin BAŞINDAKİ sayıdan kova türetilir
       ('4–6 saat' → 4 → orta). Ayrı bir alan girilmez. */
    var hy = parseInt((((p.haftalikYuk || '').match(/\d+/)) || ['0'])[0], 10);
    p.yukKovasi = !hy ? 'orta' : (hy < 4 ? 'az' : (hy <= 6 ? 'orta' : 'cok'));
  });

  /* Kohort doluluk oranı kontenjandan türetilir. */
  kohortlar.forEach(function (k) {
    k.dolulukOrani = k.kontenjan ? (k.katilimciSayisi / k.kontenjan) : 0;
  });

  w.DC = DC;
})(window);
