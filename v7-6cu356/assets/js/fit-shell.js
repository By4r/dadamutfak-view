/* =====================================================================
   DADAFIT — ORTAK KABUK JS (TEK KAYNAK)
   ---------------------------------------------------------------------
   Bu dosya DadaFit public sayfalarının ortak kabuğunu (üst bant, header,
   ana menü, mobil drawer, mobil alt bar, görüş bildir, çerez, giriş kapısı,
   footer, DadaMentor FAB, başa dön) TEK YERDEN üretir ve davranışını kurar.

   Menüye kalem eklemek = aşağıdaki NAV / BOTTOM / FOOTER_COLS dizilerinde
   TEK satır. Sayfa dosyalarına kabuk markup'ı KOPYALANMAZ.
   Desen kaynağı: assets/js/sa-shell.js (yönetim paneli bölüm listesi).
   Eşi: assets/css/fit-shell.css

   Sayfa sözleşmesi:
     <body data-brand="fit" data-fit-page="<anahtar>">
       <div id="fitShellTop"></div>
       <main class="page-main" id="pageMain"> … </main>
       <div id="fitShellBottom"></div>
       <script src="assets/js/fit-shell.js"></script>
       <script> … sayfa JS … </script>
   data-fit-page verilmezse dosya adından çözülür.
   ===================================================================== */
(function(){
'use strict';

/* ============================================================
   1 · TEK MENÜ LİSTESİ
   ============================================================ */
var NAV = [
  /* 1 · HAREKET — Egzersiz Kütüphanesi ile Hareket Rehberi bu şemsiye altında (belge §3.1) */
  { key:'hareket', label:'Hareket', href:'hareket-merkezi-v1.html', icon:'fa-solid fa-person-running',
    match:['hareket-merkezi-v1','egzersiz-kutuphane-v1','egzersiz-detay-v1','hareket-rehberi-v1',
           'hareket-yeni-baslayanlar-v1','hareket-dogru-form-v1','hareket-sureye-gore-v1',
           'hareket-hedefe-gore-v1','hareket-bolgeye-gore-v1','hareket-masa-basi-v1',
           'hareket-isinma-soguma-v1','hareket-sozluk-v1'],
    dd:[
      {label:'Hareket Merkezi', desc:'Nereden başlayacağını seç', href:'hareket-merkezi-v1.html', icon:'fa-solid fa-compass'},
      {label:'Egzersiz Kütüphanesi', desc:'Tek tek hareketleri bul ve uygula', href:'egzersiz-kutuphane-v1.html', icon:'fa-solid fa-dumbbell'},
      {label:'Hareket Rehberi', desc:'Nasıl ve neden — öğretici içerik', href:'hareket-rehberi-v1.html', icon:'fa-solid fa-book-open'},
      {label:'Hareket Sözlüğü', desc:'Set, tekrar, core, mobilite…', href:'hareket-sozluk-v1.html', icon:'fa-solid fa-spell-check'},
      {group:'Kısa rutinler'},
      {label:'Bugün kaç dakikan var?', desc:'5 · 10 · 15 · 20 · 30 dakika', href:'hareket-merkezi-v1.html#sure', icon:'fa-solid fa-stopwatch'},
      {group:'Vücut bölgesi'},
      {label:'Üst Vücut', desc:'Kol, omuz, sırt, göğüs', href:'egzersiz-kutuphane-v1.html?bolge=ust-vucut', icon:'fa-solid fa-dumbbell'},
      {label:'Alt Vücut', desc:'Bacak, kalça, kalf', href:'egzersiz-kutuphane-v1.html?bolge=alt-vucut', icon:'fa-solid fa-person-walking'},
      {label:'Karın & Core', desc:'Merkez bölge, denge', href:'egzersiz-kutuphane-v1.html?bolge=karin', icon:'fa-solid fa-child-reaching'}
    ] },

  /* 2 · PROGRAMLAR — Challenge burada özel bir program türüdür (belge §8.4) */
  { key:'programlar', label:'Programlar', href:'programlar-merkezi-v1.html', icon:'fa-solid fa-clipboard-list',
    match:['programlar-merkezi-v1','program-liste-v1','program-detay-v1','challenge-v1'],
    dd:[
      {label:'Programlar Merkezi', desc:'Hedefe, süreye, seviyeye göre', href:'programlar-merkezi-v1.html', icon:'fa-solid fa-compass'},
      {label:'Tüm Programlar', desc:'4 · 8 · 12 haftalık planlar', href:'program-liste-v1.html', icon:'fa-solid fa-clipboard-list'},
      {label:"Challenge'lar", desc:'7 · 21 · 30 günlük kısa meydan okumalar', href:'challenge-v1.html', icon:'fa-solid fa-trophy'},
      {group:'Süreye göre'},
      {label:'Tek günlük rutin', desc:'Bugün bir şey yap', href:'hareket-merkezi-v1.html#sure', icon:'fa-solid fa-bolt'},
      {label:'Ücretsiz ve Pro', desc:'Neyin ücretsiz olduğunu gör', href:'program-liste-v1.html#pro', icon:'fa-solid fa-crown'}
    ] },

  /* 3 · FİT PLANIM — kişisel alan. Ziyaretçide örnek görünüm, üyede kişisel veri (belge §9).
     NOT: kabuğun 10 kalemi Faz 2'de kurulur; bu listede yalnız BUGÜN VAR OLAN hedefler durur. */
  { key:'fit-planim', label:'Fit Planım', href:'fit-planim-v1.html', icon:'fa-solid fa-bolt',
    match:['fit-planim-v1','enerji-defteri-v1','dadafit-kopru-v1','fit-planim-programim-v1',
           'fit-planim-gecmis-v1','fit-planim-ilerleme-v1','fit-planim-rozetler-v1',
           'fit-planim-kaydettiklerim-v1','fit-planim-randevular-v1',
           'fit-planim-saglik-profil-v1','fit-planim-veri-izin-v1'],
    dd:[
      {label:'Bugün', desc:'Bugünkü plan, sıradaki antrenman', href:'fit-planim-v1.html', icon:'fa-solid fa-sun'},
      {label:'Enerji Defteri', desc:'Aldığın · harcadığın · denge', href:'enerji-defteri-v1.html', icon:'fa-solid fa-bolt'},
      {label:'Programım', desc:'Aktif programın ve takvimi', href:'fit-planim-programim-v1.html', icon:'fa-solid fa-clipboard-list'},
      {label:'İlerlemem', desc:'Süre, seri, gelişim', href:'fit-planim-ilerleme-v1.html', icon:'fa-solid fa-chart-line'},
      {label:'Kaydettiklerim', desc:'Hareket, program, rehber', href:'fit-planim-kaydettiklerim-v1.html', icon:'fa-solid fa-bookmark'},
      {group:'Kavram'},
      {label:'Enerji Köprüsü', desc:'Beslenme ile hareketin buluştuğu yer', href:'dadafit-kopru-v1.html', icon:'fa-solid fa-arrow-right-arrow-left'}
    ] },

  /* 4 · ANTRENÖRLER — ticari dönüşüm nedeniyle bağımsız başlık (belge §1) */
  { key:'antrenorler', label:'Antrenörler', href:'antrenorler-v1.html', icon:'fa-solid fa-user-tie',
    match:['antrenorler-v1','antrenor-detay-v1','antrenor-ol-v1'],
    dd:[
      {label:'Antrenör Bul', desc:'Uzmanlık, çalışma şekli, uygunluk', href:'antrenorler-v1.html', icon:'fa-solid fa-user-tie'},
      {label:'Online destek', desc:'Uzaktan çalışan antrenörler', href:'antrenorler-v1.html?calisma=online', icon:'fa-solid fa-video'},
      {label:'Yüz yüze çalışma', desc:'Şehrindeki antrenörler', href:'antrenorler-v1.html?calisma=yuzyuze', icon:'fa-solid fa-location-dot'},
      {group:'Uzman tarafı'},
      {label:'Antrenör Ol', desc:'Başvuru ve belge doğrulama', href:'antrenor-ol-v1.html', icon:'fa-solid fa-id-badge'}
    ] }
];

/* Mobil alt bar — belge §3.2 / §19: BEŞTEN FAZLA sabit öğe olamaz. */
var BOTTOM = [
  {label:'Ana Sayfa',  href:'dadafit-hub-v1.html',        icon:'fa-solid fa-house',           match:['dadafit-hub-v1']},
  {label:'Hareket',    href:'hareket-merkezi-v1.html',    icon:'fa-solid fa-person-running',  match:['hareket-merkezi-v1','egzersiz-kutuphane-v1','egzersiz-detay-v1','hareket-rehberi-v1','hareket-yeni-baslayanlar-v1','hareket-dogru-form-v1','hareket-sureye-gore-v1','hareket-hedefe-gore-v1','hareket-bolgeye-gore-v1','hareket-masa-basi-v1','hareket-isinma-soguma-v1','hareket-sozluk-v1']},
  {label:'Programlar', href:'programlar-merkezi-v1.html', icon:'fa-solid fa-dumbbell', center:true, match:['programlar-merkezi-v1','program-liste-v1','program-detay-v1','challenge-v1']},
  {label:'Fit Planım', href:'fit-planim-v1.html',         icon:'fa-solid fa-bolt',            match:['fit-planim-v1','enerji-defteri-v1','dadafit-kopru-v1','fit-planim-programim-v1','fit-planim-gecmis-v1','fit-planim-ilerleme-v1','fit-planim-rozetler-v1','fit-planim-kaydettiklerim-v1','fit-planim-randevular-v1','fit-planim-saglik-profil-v1','fit-planim-veri-izin-v1']},
  {label:'Hesabım',    href:'giris-v1.html',              icon:'fa-solid fa-user', id:'bnAccount'}
];

/* Footer — belge §3.3'ün saydığı kalemler */
var FOOTER_COLS = [
  { title:'DadaFit', links:[
      {label:'Hareket',     href:'hareket-merkezi-v1.html'},
      {label:'Programlar',  href:'programlar-merkezi-v1.html'},
      {label:'Fit Planım',  href:'fit-planim-v1.html'},
      {label:'Antrenörler', href:'antrenorler-v1.html'}
  ]},
  { title:'Hızlı Erişim', links:[
      {label:'Hakkımızda', href:'hakkimizda-v1.html'},
      {label:'Künye',      href:'hakkimizda-v1.html#kunye'},
      {label:'S.S.S.',     href:'sss-v1.html'}
  ]},
  { title:'İletişim & İş Birliği', links:[
      {label:'Bize Ulaşın',       href:'iletisim-v1.html'},
      {label:'Öneri ve Şikayet',  href:'#', fb:true},
      {label:'İş Birliği',        href:'reklam-ver-v1.html'}
  ]},
  { title:'Yasal & Sağlık', links:[
      {label:'Kullanım Koşulları',   href:'yasal-v1.html?metin=kullanim'},
      {label:'Gizlilik (KVKK)',      href:'yasal-v1.html?metin=kvkk'},
      {label:'Sağlık Bilgilendirmesi', href:'saglik-bilgilendirme-v1.html'}
  ]}
];

/* ============================================================
   FİT PLANIM — kişisel alan alt menüsü (belge §9.1, on kalem)
   Kalem eklemek = bu dizide TEK SATIR. Sayfa yalnız
   <div id="fitPlanTop" data-plan-page="…" data-plan-title="…"
        data-plan-sub="…"></div> yazar; başlık, breadcrumb ve
   sekme rayı buradan üretilir.
   ============================================================ */
var PLAN_NAV = [
  {key:'bugun',        label:'Bugün',                     href:'fit-planim-v1.html',                icon:'fa-solid fa-sun'},
  {key:'defter',       label:'Enerji Defteri',            href:'enerji-defteri-v1.html',            icon:'fa-solid fa-bolt'},
  {key:'programim',    label:'Programım',                 href:'fit-planim-programim-v1.html',      icon:'fa-solid fa-clipboard-list'},
  {key:'gecmis',       label:'Antrenman Geçmişim',        href:'fit-planim-gecmis-v1.html',         icon:'fa-solid fa-clock-rotate-left'},
  {key:'ilerleme',     label:'İlerlemem',                 href:'fit-planim-ilerleme-v1.html',       icon:'fa-solid fa-chart-line'},
  {key:'rozetler',     label:'Challenge ve Rozetler',     href:'fit-planim-rozetler-v1.html',       icon:'fa-solid fa-medal'},
  {key:'kaydettiklerim',label:'Kaydettiklerim',           href:'fit-planim-kaydettiklerim-v1.html', icon:'fa-solid fa-bookmark'},
  {key:'randevular',   label:'Randevularım ve Mesajlar',  href:'fit-planim-randevular-v1.html',     icon:'fa-solid fa-calendar-check'},
  {key:'saglik',       label:'Sağlık ve Hareket Profilim',href:'fit-planim-saglik-profil-v1.html',  icon:'fa-solid fa-heart-pulse'},
  {key:'veri',         label:'Veri ve İzinlerim',         href:'fit-planim-veri-izin-v1.html',      icon:'fa-solid fa-shield-halved'}
];

/* Hesap menüsü — belge §3.3: Dada Gastro hesap aksiyonları (Mutfak Defterim /
   Tarif Ekle / Alışveriş Listem …) DadaFit hesap menüsünde DURMAZ; onlara
   ekosistem değiştiriciden (üst bant marka barı · drawer "DadaMutfak'a dön")
   geçilir. Burada yalnız DadaFit kalemleri var. */
var ACCOUNT = [
  {label:'Fit Planım',        href:'fit-planim-v1.html',     icon:'fa-solid fa-bolt'},
  {label:'Enerji Köprüsü',    href:'dadafit-kopru-v1.html',  icon:'fa-solid fa-arrow-right-arrow-left'},
  {label:'Programım',         href:'program-liste-v1.html',  icon:'fa-solid fa-clipboard-list'},
  {label:'Rozetlerim',        href:'rozetler-v1.html',       icon:'fa-solid fa-medal'},
  {label:'Bildirimler',       href:'bildirimler-v1.html',    icon:'fa-solid fa-bell'},
  {sep:true},
  {label:"Pro'ya Yükselt",    href:'pro-v1.html',            icon:'fa-solid fa-crown', cls:'acct-pro'},
  {label:'Ayarlar / Hesabım', href:'hesabim-v1.html',        icon:'fa-solid fa-gear'},
  {sep:true},
  {label:'DadaMutfak\'a dön', href:'anasayfa-portal-v3a.html', icon:'fa-solid fa-arrow-left-long'},
  {label:'Çıkış',             href:'anasayfa-portal-v3a.html?auth=0', icon:'fa-solid fa-right-from-bracket', cls:'acct-logout'}
];

/* ============================================================
   2 · AKTİF SAYFA ÇÖZÜMÜ
   ============================================================ */
var FILE = (location.pathname.split('/').pop() || 'dadafit-hub-v1.html').replace(/\.html$/,'');
var PAGE = document.body.getAttribute('data-fit-page') || FILE;
function isActive(item){
  if(!item.match) return false;
  for(var i=0;i<item.match.length;i++){ if(item.match[i]===PAGE) return true; }
  return false;
}
var AVA = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop&exp=7&gam=6&sat=-9&high=8&vib=5";
var MARK = '<svg class="fit-mark" viewBox="0 0 44 44" aria-hidden="true"><rect x="2" y="2" width="40" height="40" rx="11.5" fill="#009d4f"/><path d="M25 8 L13.6 26 H19.8 L18.2 36 L30.4 17.6 H23.8 Z" fill="#fff"/></svg>';
var WORD = '<span class="fit-word"><b>Dada</b><span class="ft">Fit</span></span>';

/* ============================================================
   3 · KABUK MARKUP ÜRETİMİ
   ============================================================ */
function navHtml(){
  return NAV.map(function(it){
    var act = isActive(it) ? ' class="active"' : '';
    if(!it.dd) return '<div class="nav-item"><a href="'+it.href+'"'+act+'>'+it.label+'</a></div>';
    var items = it.dd.map(function(d){
      if(d.group) return '<div class="dd-group">'+d.group+'</div>';
      return '<a href="'+d.href+'"><i class="'+d.icon+'"></i> <span>'+d.label+(d.desc?'<small>'+d.desc+'</small>':'')+'</span></a>';
    }).join('\n            ');
    return '<div class="nav-item">\n          <a href="'+it.href+'"'+(act||' class=""')+' aria-haspopup="true" aria-expanded="false">'+it.label+' <i class="fa-solid fa-chevron-down"></i></a>\n          <div class="dropdown">\n            '+items+'\n          </div>\n        </div>';
  }).join('\n        ');
}

function drawerNavHtml(){
  return NAV.map(function(it){
    var act = isActive(it) ? ' active' : '';
    if(!it.dd) return '<div class="d-item"><a class="d-link'+act+'" href="'+it.href+'"><i class="'+it.icon+'"></i> '+it.label+'</a></div>';
    var subs = it.dd.filter(function(d){return !d.group && !d.ddOnly;}).map(function(d){
      return '<a href="'+d.href+'"><i class="'+d.icon+'"></i> '+d.label+'</a>';
    }).join('\n        ');
    return '<div class="d-item d-has-sub'+(act?' open':'')+'">\n      <button class="d-link'+act+'">'+it.label+' <i class="fa-solid fa-chevron-down"></i></button>\n      <div class="d-sub">\n        '+subs+'\n      </div>\n    </div>';
  }).join('\n    ');
}

function bottomNavHtml(){
  return BOTTOM.map(function(b){
    var act = isActive(b) ? ' active' : '';
    var id  = b.id ? ' id="'+b.id+'"' : '';
    var ico = b.center ? '<span class="bn-fab"><i class="'+b.icon+'"></i></span>' : '<i class="'+b.icon+'"></i>';
    return '<a href="'+b.href+'"'+id+' class="bn-item'+(b.center?' bn-center':'')+act+'">'+ico+'<span>'+b.label+'</span></a>';
  }).join('\n  ');
}

function footerColsHtml(){
  return FOOTER_COLS.map(function(c){
    var links = c.links.map(function(l){
      var on = l.fb ? ' onclick="document.getElementById(\'fbTab\').click();return false;"' : '';
      return '<a href="'+l.href+'"'+on+'>'+l.label+'</a>';
    }).join('\n        ');
    return '<div class="foot-col">\n        <h5>'+c.title+'</h5>\n        '+links+'\n      </div>';
  }).join('\n      ');
}

var TOPBAR = ''+
'<div class="topbar">\n'+
'  <div class="wrap">\n'+
'    <div class="tb-left">\n'+
'      <a href="egzersiz-kutuphane-v1.html"><i class="fa-solid fa-dumbbell" style="color:var(--tomato)"></i> 320+ egzersiz</a>\n'+
'      <span class="tb-div"></span>\n'+
'      <div class="tb-soc">\n'+
'        <a href="#"><i class="fa-brands fa-instagram"></i></a>\n'+
'        <a href="#"><i class="fa-brands fa-youtube"></i></a>\n'+
'        <a href="#"><i class="fa-brands fa-pinterest"></i></a>\n'+
'      </div>\n'+
'    </div>\n'+
'    <div class="tb-right">\n'+
'      <nav class="brand-switch" aria-label="Dada dünyaları">\n'+
'        <a class="bs-item bs-gastro" href="anasayfa-portal-v3a.html" title="DadaGastro"><i class="fa-solid fa-utensils"></i><span class="bs-name"><span class="bd">Dada</span><span class="sf">Gastro</span></span></a>\n'+
'        <a class="bs-item bs-diet" href="saglik-hub-v1.html" title="DadaDiet"><i class="fa-solid fa-leaf"></i><span class="bs-name"><span class="bd">Dada</span><span class="sf">Diet</span></span></a>\n'+
'        <a class="bs-item bs-fit is-active" href="dadafit-hub-v1.html" aria-current="page"><i class="fa-solid fa-dumbbell"></i><span class="bs-name"><span class="bd">Dada</span><span class="sf">Fit</span></span></a>\n'+
'        <a class="bs-item bs-gourmet" href="kesfet-v1.html" title="DadaGourmet"><i class="fa-solid fa-map-location-dot"></i><span class="bs-name"><span class="bd">Dada</span><span class="sf">Gourmet</span></span></a>\n'+
'        <a class="bs-item bs-campus" href="akademi-v1.html" title="DadaCampus"><i class="fa-solid fa-graduation-cap"></i><span class="bs-name"><span class="bd">Dada</span><span class="sf">Campus</span></span></a>\n'+
'      </nav>\n'+
'      <div class="tb-lang" id="tbLang">\n'+
'        <button class="tb-lang-btn" id="tbLangBtn" type="button" aria-haspopup="true" aria-expanded="false">\n'+
'          <i class="fa-solid fa-globe"></i><span>EN</span><i class="fa-solid fa-chevron-down tb-lang-caret"></i>\n'+
'        </button>\n'+
'        <div class="tb-lang-menu" id="tbLangMenu" role="menu">\n'+
'          <a href="#" role="menuitem" data-lang="tr">TR <span>Türkçe</span></a>\n'+
'          <a href="#" role="menuitem" class="active" data-lang="en">EN <span>English</span></a>\n'+
'        </div>\n'+
'      </div>\n'+
'    </div>\n'+
'  </div>\n'+
'</div>';

function accountHtml(){
  return ACCOUNT.map(function(a){
    if(a.sep) return '<div class="acct-div"></div>';
    return '<a href="'+a.href+'"'+(a.cls?' class="'+a.cls+'"':'')+'><i class="'+a.icon+'"></i> <span>'+a.label+'</span></a>';
  }).join('\n            ');
}

function headerHtml(){
  return ''+
'<header class="header">\n'+
'  <div class="h-top">\n'+
'    <div class="wrap">\n'+
'      <a class="brand fit-brand" href="dadafit-hub-v1.html" aria-label="DadaFit">'+MARK+WORD+'</a>\n'+
'      <nav class="nav">\n        '+navHtml()+'\n      </nav>\n'+
'      <div class="head-actions">\n'+
'        <button class="icon-btn" aria-label="Ara" onclick="location.href=\'arama-fit-v1.html\'"><i class="fa-solid fa-magnifying-glass"></i></button>\n'+
'        <button class="btn-login" onclick="location.href=\'giris-v1.html\'"><i class="fa-regular fa-user"></i> Giriş Yap</button>\n'+
'        <a class="icon-btn head-bell" href="bildirimler-v1.html" aria-label="Bildirimler"><i class="fa-solid fa-bell"></i><span class="hb-badge">3</span></a>\n'+
'        <div class="acct-item acct-wrap">\n'+
'          <button class="acct-btn" aria-label="Hesabım" aria-haspopup="true">\n'+
'            <span class="acct-ava" style="background-image:url(\''+AVA+'\')"></span>\n'+
'            <i class="fa-solid fa-chevron-down acct-caret"></i>\n'+
'          </button>\n'+
'          <div class="acct-menu">\n'+
'            <div class="acct-id">\n'+
'              <span class="acct-ava" style="background-image:url(\''+AVA+'\')"></span>\n'+
'              <span class="acct-id-txt"><b>Elif Şahin</b><small>@elifsahin</small></span>\n'+
'            </div>\n'+
'            <div class="acct-div"></div>\n'+
'            '+accountHtml()+'\n'+
'          </div>\n'+
'        </div>\n'+
'        <button class="icon-btn hamburger" id="hamburger" aria-label="Menü"><i class="fa-solid fa-bars"></i></button>\n'+
'      </div>\n'+
'    </div>\n'+
'  </div>\n'+
'</header>';
}

function drawerHtml(){
  return ''+
'<div class="drawer-overlay" id="drawerOverlay"></div>\n'+
'<aside class="drawer" id="drawer" aria-label="Mobil menü">\n'+
'  <div class="drawer-head">\n'+
'    <a class="drawer-brand" href="dadafit-hub-v1.html" aria-label="DadaFit">'+MARK+WORD+'</a>\n'+
'    <button class="drawer-close" id="drawerClose" aria-label="Menüyü kapat"><i class="fa-solid fa-xmark"></i></button>\n'+
'  </div>\n'+
'  <nav class="drawer-nav">\n    '+drawerNavHtml()+'\n  </nav>\n'+
'  <div class="drawer-foot">\n'+
'    <button class="btn btn-primary drawer-login" style="width:100%" onclick="location.href=\'giris-v1.html\'"><i class="fa-regular fa-user"></i> Giriş Yap</button>\n'+
'    <div class="drawer-acct">\n'+
'      <span class="da-ava" style="background-image:url(\''+AVA+'\')"></span>\n'+
'      <div class="da-info">\n'+
'        <b>Elif Şahin</b>\n'+
'        <div class="da-links">\n'+
'          <a href="fit-planim-v1.html">Fit Planım</a>\n'+
'          <a href="bildirimler-v1.html">Bildirimler</a>\n'+
'          <a href="hesabim-v1.html">Ayarlar</a>\n'+
'          <a href="anasayfa-portal-v3a.html?auth=0">Çıkış</a>\n'+
'        </div>\n'+
'      </div>\n'+
'    </div>\n'+
'    <a href="fit-planim-v1.html" class="drawer-add"><i class="fa-solid fa-bolt"></i> Fit Planım</a>\n'+
'    <a href="antrenorler-v1.html" class="drawer-add"><i class="fa-solid fa-user-tie"></i> Antrenör Bul</a>\n'+
'    <a href="anasayfa-portal-v3a.html" class="drawer-add"><i class="fa-solid fa-arrow-left-long"></i> DadaMutfak\'a dön</a>\n'+
'    <div class="drawer-lang" id="drawerLang">\n'+
'      <button class="drawer-lang-toggle" type="button" aria-haspopup="true" aria-expanded="false">\n'+
'        <span class="drawer-lang-label"><i class="fa-solid fa-globe"></i> Dil</span>\n'+
'        <span class="drawer-lang-cur"><span id="drawerLangCur">EN — English</span> <i class="fa-solid fa-chevron-down"></i></span>\n'+
'      </button>\n'+
'      <div class="drawer-lang-list" role="menu">\n'+
'        <button type="button" data-lang="tr" data-name="Türkçe"><b>TR</b> Türkçe</button>\n'+
'        <button type="button" class="active" data-lang="en" data-name="English"><b>EN</b> English</button>\n'+
'      </div>\n'+
'    </div>\n'+
'  </div>\n'+
'</aside>';
}

var FEEDBACK_HTML = `<a class="feedback-tab" href="#" id="fbTab" aria-label="Görüş Bildir — öneri ve şikayet">
  <i class="fa-solid fa-comment-dots"></i> Görüş Bildir
</a>

<!-- ===== GÖRÜŞ BİLDİR MODAL ===== -->
<div class="fb-overlay" id="fbOverlay"></div>
<div class="fb-modal" id="fbModal" role="dialog" aria-modal="true" aria-label="Görüş Bildir">
  <div class="fb-panel">
    <div class="fb-head">
      <div>
        <h3>Görüş Bildir</h3>
        <p>Önerin, şikayetin veya sorun — hepsine kulak veriyoruz.</p>
      </div>
      <button class="fb-close" id="fbClose" type="button" aria-label="Kapat"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="fb-body">
      <form id="fbForm">
        <!-- M17: konu tipine göre alan seti değişir (Onedio referansı, mevcut dil korunarak) -->
        <div class="fb-topics" role="group" aria-label="Konu seç">
          <button class="fb-topic active" type="button" data-topic="oneri"><i class="fa-solid fa-lightbulb"></i> Önerim var</button>
          <button class="fb-topic" type="button" data-topic="soru"><i class="fa-solid fa-circle-question"></i> Bir sorum var</button>
          <button class="fb-topic" type="button" data-topic="sorun"><i class="fa-solid fa-bug"></i> Teknik sorun</button>
          <button class="fb-topic" type="button" data-topic="ihlal"><i class="fa-solid fa-shield-halved"></i> İhlal bildirimi</button>
          <button class="fb-topic" type="button" data-topic="puan"><i class="fa-solid fa-face-smile"></i> Puan ver</button>
        </div>

        <div class="fb-fields active" data-for="oneri">
          <div class="fb-chiprow" role="group" aria-label="İlgili alan">
            <button class="chip active" type="button">Tarifler</button>
            <button class="chip" type="button">Keşfet</button>
            <button class="chip" type="button">DadaStore</button>
            <button class="chip" type="button">Uygulama</button>
            <button class="chip" type="button">Diğer</button>
          </div>
          <div class="fb-field"><textarea required placeholder="Önerini anlat *"></textarea></div>
          <div class="fb-field"><input type="email" placeholder="E-posta adresin (opsiyonel)" /></div>
        </div>

        <div class="fb-fields" data-for="soru">
          <div class="fb-field">
            <select class="fb-select" required>
              <option value="" selected disabled>Sorunun konusu *</option>
              <option>Üyelik & Hesap</option>
              <option>Tarif ekleme</option>
              <option>Antrenör randevusu</option>
              <option>Sipariş & DadaStore</option>
              <option>Diğer</option>
            </select>
          </div>
          <div class="fb-field"><textarea required placeholder="Sorunu yaz *"></textarea></div>
          <div class="fb-field"><input type="email" required placeholder="E-posta adresin (cevap için) *" /></div>
        </div>

        <div class="fb-fields" data-for="sorun">
          <div class="fb-field">
            <select class="fb-select" required>
              <option value="" selected disabled>Sorunu nerede yaşadın? *</option>
              <option>Anasayfa</option>
              <option>Tarif sayfası</option>
              <option>Arama / Dolapta Ne Var?</option>
              <option>Üyelik & Giriş</option>
              <option>DadaStore</option>
              <option>Mobil uygulama</option>
            </select>
          </div>
          <div class="fb-field"><textarea required placeholder="Sorunu kısaca anlat — ne yaptın, ne oldu? *"></textarea></div>
          <button class="fb-shot" type="button"><i class="fa-solid fa-image"></i> Ekran görüntüsü ekle <small>(opsiyonel)</small></button>
          <div class="fb-field"><input type="email" placeholder="E-posta adresin (opsiyonel)" /></div>
        </div>

        <div class="fb-fields" data-for="ihlal">
          <div class="fb-field"><input type="url" required placeholder="İhlal içeren sayfanın linki *" /></div>
          <div class="fb-field">
            <select class="fb-select" required>
              <option value="" selected disabled>İhlal türü *</option>
              <option>Telif hakkı</option>
              <option>Uygunsuz içerik</option>
              <option>Spam / yanıltıcı içerik</option>
              <option>Diğer</option>
            </select>
          </div>
          <div class="fb-field"><textarea required placeholder="Açıklama *"></textarea></div>
          <div class="fb-field"><input type="email" required placeholder="E-posta adresin *" /></div>
        </div>

        <div class="fb-fields" data-for="puan">
          <p class="fb-q">DadaMutfak deneyimini nasıl puanlarsın?</p>
          <div class="fb-emoji" role="group" aria-label="Puan">
            <button type="button" data-val="1" aria-label="Çok kötü">😡</button>
            <button type="button" data-val="2" aria-label="Kötü">🙁</button>
            <button type="button" data-val="3" aria-label="İdare eder">😐</button>
            <button type="button" data-val="4" aria-label="İyi">🙂</button>
            <button type="button" data-val="5" aria-label="Harika">😍</button>
          </div>
          <div class="fb-field"><textarea placeholder="Eklemek istediğin bir şey var mı? (opsiyonel)"></textarea></div>
          <div class="fb-field"><input type="email" placeholder="E-posta adresin (opsiyonel)" /></div>
        </div>

        <label class="fb-kvkk">
          <input type="checkbox" required />
          <span><a href="yasal-v1.html?metin=aydinlatma">Aydınlatma Metni</a>'ni ve <a href="yasal-v1.html?metin=kvkk">KVKK Metni</a>'ni okudum, onaylıyorum.</span>
        </label>
        <button class="btn btn-primary fb-send" type="submit"><i class="fa-solid fa-paper-plane"></i> Gönder</button>
      </form>
      <div class="fb-success" id="fbSuccess" hidden>
        <span class="ok"><i class="fa-solid fa-check"></i></span>
        <h4>Görüşün bize ulaştı</h4>
        <p>Teşekkürler! Ekibimiz en kısa sürede inceleyip gerekirse e-posta ile dönüş yapacak.</p>
      </div>
    </div>
  </div>
</div>`;

var COOKIE_HTML = `<div class="cookie-banner" id="cookieBanner" role="dialog" aria-label="Çerez onayı" aria-live="polite">
  <div class="cookie-inner">
    <div class="cookie-text">
      <span class="cookie-ico"><i class="fa-solid fa-cookie-bite"></i></span>
      <p>Sana daha iyi bir deneyim sunmak için çerezler kullanıyoruz. Siteyi kullanmaya devam ederek çerez kullanımını kabul etmiş olursun. <a href="yasal-v1.html?metin=cerez">Çerez Politikası</a> · <a href="yasal-v1.html?metin=aydinlatma">KVKK Aydınlatma Metni</a></p>
    </div>
    <div class="cookie-actions">
      <button type="button" class="btn-cookie-reject" id="cookieReject">Reddet</button>
      <button type="button" class="btn-cookie-accept" id="cookieAccept">Tümünü Kabul Et</button>
    </div>
  </div>
</div>
`;

var LGGATE_HTML = `<div class="lg-overlay" id="lgOverlay"></div>
<div class="lg-gate" id="lgGate" role="dialog" aria-modal="true" aria-label="Giriş gerekli">
  <div class="lg-panel">
    <button class="lg-close" id="lgClose" type="button" aria-label="Kapat"><i class="fa-solid fa-xmark"></i></button>
    <span class="lg-ico"><i class="fa-solid fa-lock"></i></span>
    <h4 id="lgTitle">Bu işlem için giriş yap</h4>
    <p id="lgDesc">Kaydetmek, yorum yapmak ve takip etmek için DadaMutfak hesabına giriş yapman gerekiyor.</p>
    <div class="lg-acts">
      <a class="btn btn-primary" href="giris-v1.html"><i class="fa-regular fa-user"></i> Giriş Yap</a>
      <a class="btn btn-ghost" href="giris-v1.html?tab=kayit">Üye Ol</a>
    </div>
  </div>
</div>

<!-- ===== PRO-GATE (ücretli premium kilit — pro-v1 F1 dili) ===== -->
<div class="pg-overlay" id="pgOverlay"></div>
<div class="pro-gate" id="proGate" role="dialog" aria-modal="true" aria-label="Pro içerik">
  <div class="pg-panel">
    <button class="pg-close" id="pgClose" type="button" aria-label="Kapat"><i class="fa-solid fa-xmark"></i></button>
    <span class="pg-ico"><i class="fa-solid fa-crown"></i></span>
    <span class="pg-tag"><i class="fa-solid fa-lock"></i> DadaMutfak Pro</span>
    <h4 id="pgTitle">Bu içerik Pro'da</h4>
    <p id="pgDesc">Derin program ve video içeriği DadaMutfak Pro üyeliğinle açılır.</p>
    <ul class="pg-feats">
      <li><i class="fa-solid fa-check"></i> İleri çok-haftalık programlar</li>
      <li><i class="fa-solid fa-check"></i> Eğitmen eşliğinde video serileri</li>
      <li><i class="fa-solid fa-check"></i> Diyetisyen + antrenör ortak plan</li>
    </ul>
    <div class="pg-acts">
      <a class="btn btn-ghost" href="pro-v1.html">Pro'yu İncele</a>
      <a class="btn btn-fit" href="pro-odeme-v1.html"><i class="fa-solid fa-crown"></i> Pro'ya Geç</a>
    </div>
  </div>
</div>


`;

var MENTOR_HTML = `<aside class="mentor-panel floating mini" id="mentorPanel" data-state="mini" aria-label="DadaMentor asistan">
  <div class="mp-media">
    <div class="mp-atmos"></div>
    <video id="mentorVideo" autoplay muted loop playsinline preload="auto">
      <source src="assets/video/mentor-panel.mp4" type="video/mp4" />
    </video>
  </div>
  <div class="mp-fade"></div>
  <div class="mp-mini-overlay" id="mpMiniOv" aria-hidden="false">
    <span class="mav"><i class="fa-solid fa-compass"></i></span>
    <span class="mp-mini-lbl">Mentör</span>
  </div>
  <div class="mp-top">
    <span class="mp-tag"><i class="fa-solid fa-comment-dots"></i> Mentor</span>
    <button class="mp-toggle" type="button" id="mpToggle" aria-label="Paneli küçült">
      <i class="fa-solid fa-minus" id="mpToggleIco"></i>
    </button>
  </div>
  <div class="mp-chat">
    <div class="mp-id">
      <span class="mp-av"><i class="fa-solid fa-compass"></i></span>
      <span>
        <span class="nm"><span class="bd">Dada</span><span class="sf">Mentor</span></span><br>
        <span class="on"><span class="d"></span> çevrimiçi</span>
      </span>
    </div>
    <div class="mp-bubble" id="mpBubble">Bugün sana nasıl yardımcı olayım?</div>
    <div class="mp-row">
      <a class="mp-opt" href="egzersiz-kutuphane-v1.html">Egzersizler</a>
      <a class="mp-opt" href="program-liste-v1.html">Programlar</a>
      <a class="mp-opt" href="antrenorler-v1.html">Antrenörler</a>
      <a class="mp-opt w-gastro" href="anasayfa-portal-v3a.html"><span class="bd">Dada</span><span class="sf">Gastro</span></a>
      <a class="mp-opt w-diet" href="saglik-hub-v1.html"><span class="bd">Dada</span><span class="sf">Diet</span></a>
    </div>
  </div>
</aside>
<button class="to-top" id="toTop" type="button" aria-label="Başa dön"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>`;

var FOOTER_RAW = `<footer class="footer orange">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <div class="foot-lockup"><span class="fl-mark"><i class="fa-solid fa-bolt"></i></span><span class="fl-word"><span class="bd">Dada</span><span class="sf">Fit</span></span></div>
        <p class="foot-tag">Harekete geçmenin en kolay yolu — çalış, ölç, güçlen.</p>
        <div class="foot-soc">
          <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
          <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
          <a href="#" aria-label="X"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
        </div>
      </div>
      <!--FOOT-COLS-->
    </div>
    <div class="foot-bottom">
      <span class="fb-left">© 2026 <b><span class="bd">Dada</span><span class="sf">Fit</span></b> · Tüm hakları saklıdır.</span>
      <a href="https://gaviaworks.com" target="_blank" rel="noopener"><span class="gw-code">&lt;/&gt;</span> GaviaWorks</a>
    </div>
  </div>
</footer>
`;

function footerHtml(){
  return FOOTER_RAW.replace('<!--FOOT-COLS-->', footerColsHtml());
}

/* ============================================================
   4 · MOUNT — kabuk markup'i sayfaya basilir
   ============================================================ */
var _top = document.getElementById('fitShellTop');
if(_top){
  _top.outerHTML = TOPBAR + '\n' + headerHtml() + '\n' + drawerHtml() +
    '\n<nav class="bottom-nav" aria-label="Mobil alt navigasyon">\n  ' + bottomNavHtml() + '\n</nav>\n' +
    FEEDBACK_HTML + '\n' + COOKIE_HTML;
}
var _bot = document.getElementById('fitShellBottom');
if(_bot){
  _bot.outerHTML = LGGATE_HTML + '\n' + footerHtml() + '\n' + MENTOR_HTML +
    '\n<button class="to-top" id="toTop" type="button" aria-label="Basa don"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>';
}

/* ---- FİT PLANIM kişisel kabuğu: banner + breadcrumb + sekme rayı ---- */
var _plan = document.getElementById('fitPlanTop');
if(_plan){
  var pk    = _plan.getAttribute('data-plan-page') || 'bugun';
  var ptit  = _plan.getAttribute('data-plan-title') || 'Fit Planım';
  var psub  = _plan.getAttribute('data-plan-sub') || '';
  var cur   = null;
  for(var pi=0;pi<PLAN_NAV.length;pi++){ if(PLAN_NAV[pi].key===pk) cur=PLAN_NAV[pi]; }
  var tabs = PLAN_NAV.map(function(it){
    var on = it.key===pk;
    return '<a class="dt'+(on?' active':'')+'" href="'+it.href+'"'+(on?' aria-current="page"':'')+
           '><i class="'+it.icon+'"></i> '+it.label+'</a>';
  }).join('\n        ');
  _plan.outerHTML =
   '<section class="lib-top fp-top">\n'+
   '  <div class="wrap">\n'+
   '    <nav class="lib-crumb" aria-label="Sayfa yolu">\n'+
   '      <a href="dadafit-hub-v1.html"><i class="fa-solid fa-house"></i> DadaFit</a>\n'+
   '      <i class="fa-solid fa-chevron-right"></i>\n'+
   '      <a href="fit-planim-v1.html">Fit Planım</a>\n'+
   '      <i class="fa-solid fa-chevron-right"></i>\n'+
   '      <span class="cur">'+(cur?cur.label:ptit)+'</span>\n'+
   '    </nav>\n'+
   '    <span class="eyebrow"><i class="fa-solid fa-bolt"></i> Fit Planım · kişisel alanın</span>\n'+
   '    <h1>'+ptit+'</h1>\n'+
   (psub? '    <p class="lib-sub">'+psub+'</p>\n' : '')+
   '    <div class="fp-who">\n'+
   '      <span class="fp-ava" style="background-image:url(\''+AVA+'\')"></span>\n'+
   '      <span class="fp-who-txt"><b class="fp-name">Elif Şahin</b><small class="fp-state">Ücretsiz üye · 3 haftadır burada</small></span>\n'+
   '      <span class="demo-tag fp-demo"><i class="fa-solid fa-eye"></i> Örnek görünüm</span>\n'+
   '    </div>\n'+
   '  </div>\n'+
   '</section>\n'+
   '<div class="pf-tabbar fp-tabbar">\n'+
   '  <div class="wrap">\n'+
   '    <nav class="pf-tabs" aria-label="Fit Planım bölümleri">\n        '+tabs+'\n    </nav>\n'+
   '  </div>\n'+
   '</div>\n'+
   '<div class="wrap fp-gate" data-lg-only>\n'+
   '  <div class="fp-gate-in">\n'+
   '    <i class="fa-solid fa-circle-info"></i>\n'+
   '    <p>Bu sayfadaki veriler <b>örnektir</b> — Fit Planım\'ın nasıl çalıştığını göstermek için. Giriş yaptığında burada kendi verin olur.</p>\n'+
   '    <span class="fp-gate-acts"><a class="btn btn-primary" href="giris-v1.html"><i class="fa-regular fa-user"></i> Giriş Yap</a><a class="btn btn-ghost" href="giris-v1.html?tab=kayit">Ücretsiz hesap oluştur</a></span>\n'+
   '  </div>\n'+
   '</div>';
}

/* hero'lu sayfa: body[data-fit-hero="1"] → header hero uzerinde seffaf baslar */
var HERO_MODE = document.body.getAttribute('data-fit-hero') === '1';

/* ============================================================
   5 · KABUK DAVRANISI
   ============================================================ */
/* ---- ortak chrome davranışı (hub satır içi bloklarından birebir) ---- */
/* ===== ORTAK CHROME JS (v3a'dan, sayfa-bağımsız hale getirildi) =====
   SS paramları: ?dd=1 (mega+dil açık) · ?drawer=1 · ?cc=1 (çerez) · ?fb=1 (görüş modal)
   Header VARSAYILAN KATI. Hero'lu sayfa şeffaf başlangıç isterse aşağıdaki
   heroMode bayrağını kendi kopyasında true yapar (v3a davranışı). */

// SS paramları
// ===== Login-state simülasyonu (mockup) — İA §2.3 sözleşmesi =====
// ?auth=1 → localStorage dm_auth='1' + body.is-auth ; ?auth=0 → temizle (logout)
// param yoksa localStorage'a bakılır. Çıkış linkleri ?auth=0'a yönlendirir (M7).
(function(){
  /* C1 — tek auth/rol token dm_user{auth,roles[],verified,level}. Eski dm_auth/dm_business
     migrate+silinir. Kök kuralı: auth ⟹ roles "kullanici" ile başlar; isletme operatörü
     ["kullanici","isletme"]. Class additive (is-auth/has-business AYNEN) + body[data-roles]. */
  var KEY='dm_user', OK={kullanici:1,antrenor:1,diyetisyen:1,isletme:1};
  function rd(){ try{var r=localStorage.getItem(KEY);return r?JSON.parse(r):null;}catch(e){return null;} }
  function wr(u){ try{localStorage.setItem(KEY,JSON.stringify(u));}catch(e){} }
  var u=rd();
  if(!u){                                   // migrasyon: eski binary flag → dm_user (bir kez)
    var oa=false,ob=false;
    try{oa=localStorage.getItem('dm_auth')==='1';}catch(e){}
    try{ob=localStorage.getItem('dm_business')==='1';}catch(e){}
    if(oa||ob){ u={auth:true,roles:['kullanici'],verified:false,level:0}; if(ob)u.roles.push('isletme'); wr(u); }
  }
  try{localStorage.removeItem('dm_auth');localStorage.removeItem('dm_business');}catch(e){}  // eski anahtar temizliği
  var qs=location.search;                    // URL-param (demo/SS akışı korunur + yeni roller)
  function ens(){ if(!u)u={auth:false,roles:[],verified:false,level:0}; }
  function addR(r){ ens(); if(OK[r]&&u.roles.indexOf(r)<0)u.roles.push(r); }
  if(qs.indexOf('auth=1')>-1){ ens(); u.auth=true; }
  else if(qs.indexOf('auth=0')>-1){ u=null; try{localStorage.removeItem(KEY);}catch(e){} }
  if(qs.indexOf('business=1')>-1){ ens(); u.auth=true; addR('isletme'); }
  else if(qs.indexOf('business=0')>-1){ if(u){var bi=u.roles.indexOf('isletme'); if(bi>-1)u.roles.splice(bi,1);} }
  var rm=/[?&]role=(antrenor|diyetisyen|isletme)/.exec(qs); if(rm){ ens(); u.auth=true; addR(rm[1]); }
  if(u){
    if(qs.indexOf('verified=1')>-1)u.verified=true; else if(qs.indexOf('verified=0')>-1)u.verified=false;
    var lm=/[?&]level=(\d+)/.exec(qs); if(lm)u.level=parseInt(lm[1],10)||0;
    if(u.auth&&u.roles.indexOf('kullanici')<0)u.roles.unshift('kullanici');   // kök her zaman önde
    wr(u);
  }
  var b=document.body, authed=!!(u&&u.auth);   // DOM: eski class kanalı (additive) + data-roles
  if(authed){
    b.classList.add('is-auth');
    if(u.roles.indexOf('isletme')>-1)b.classList.add('has-business');   // C3 köprü sinyali — AYNEN
    b.setAttribute('data-roles',u.roles.join(' '));
    if(u.verified)b.setAttribute('data-verified','1');
    if(u.level)b.setAttribute('data-level',String(u.level));
  }
  var bnA=document.getElementById('bnAccount');   // M6 — bottom-nav Hesap hedefi
  /* belge §3.3: Fit alt barında hesap kalemi Gastro defterine değil hesaba gider */
  if(bnA)bnA.setAttribute('href', authed?'hesabim-v1.html':'giris-v1.html');
})();

if(location.search.indexOf('dd=1')>-1){document.querySelector('.nav-item').classList.add('open');var _l=document.getElementById('tbLang');if(_l)_l.classList.add('open');}
if(location.search.indexOf('drawer=1')>-1){window.addEventListener('DOMContentLoaded',function(){document.getElementById('drawer').classList.add('open');document.getElementById('drawerOverlay').classList.add('open');var _s=document.querySelector('.d-has-sub');if(_s)_s.classList.add('open');});}

// header: VARSAYILAN katı (içerik sayfası). heroMode=true → hero üstünde şeffaf,
// ~60px scroll sonrası katı (v3a davranışı; ?hdr=solid ile yine zorla katı)
(function(){
  var header=document.querySelector('.header');
  var heroMode=HERO_MODE;                                   // full-viewport hero — header şeffaf, ~60px scroll'da katı
  var forceSolid=location.search.indexOf('hdr=solid')>-1;
  if(!heroMode||forceSolid)return;                     // katı kal — at-top hiç eklenmez
  function onScroll(){ if(window.scrollY<60){header.classList.add('at-top');} else {header.classList.remove('at-top');} }
  onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
})();

// save / favorite toggle (recipes + products) — sayfada varsa çalışır
document.querySelectorAll('.r-save, .p-fav, .feat-save').forEach(function(btn){
  btn.addEventListener('click',function(e){
    e.stopPropagation();
    btn.classList.toggle('saved');
    var i=btn.querySelector('i');
    if(btn.classList.contains('saved')){i.classList.remove('fa-regular');i.classList.add('fa-solid');}
    else{i.classList.remove('fa-solid');i.classList.add('fa-regular');}
  });
});

// "tümünü gör" slider okları — data-track / data-dir ile genel
document.querySelectorAll('.row-nav button').forEach(function(b){
  b.addEventListener('click',function(){
    var t=document.getElementById(b.getAttribute('data-track'));
    if(t){t.scrollBy({left:b.getAttribute('data-dir')==='prev'?-620:620,behavior:'smooth'});if(t._pauseAuto)t._pauseAuto();}
  });
});

// nav dropdown click toggle (hover also works via CSS)
document.querySelectorAll('.nav-item').forEach(function(it){
  var trigger=it.querySelector(':scope > a');
  if(!it.querySelector('.dropdown,.mega'))return;
  trigger.addEventListener('click',function(e){
    e.preventDefault();
    var wasOpen=it.classList.contains('open');
    document.querySelectorAll('.nav-item.open').forEach(function(o){o.classList.remove('open');var t=o.querySelector(':scope > a');if(t)t.setAttribute('aria-expanded','false');});
    if(!wasOpen){it.classList.add('open');trigger.setAttribute('aria-expanded','true');}
  });
});
document.addEventListener('click',function(e){
  if(!e.target.closest('.nav-item'))document.querySelectorAll('.nav-item.open').forEach(function(o){o.classList.remove('open');var t=o.querySelector(':scope > a');if(t)t.setAttribute('aria-expanded','false');});
});
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape')return;
  var open=document.querySelector('.nav-item.open');
  if(open){var t=open.querySelector(':scope > a');open.classList.remove('open');if(t){t.setAttribute('aria-expanded','false');t.focus();}}
});

// ---- HESAP / EKLE dropdown (header sağ blok, login-state) tıkla-aç ----
document.querySelectorAll('.acct-item').forEach(function(it){
  var trigger=it.querySelector('.icon-btn,.acct-btn');
  if(!trigger||!it.querySelector('.acct-menu'))return;
  trigger.addEventListener('click',function(e){
    e.preventDefault();
    var wasOpen=it.classList.contains('open');
    document.querySelectorAll('.acct-item.open').forEach(function(o){o.classList.remove('open')});
    if(!wasOpen)it.classList.add('open');
  });
});
document.addEventListener('click',function(e){
  if(!e.target.closest('.acct-item'))document.querySelectorAll('.acct-item.open').forEach(function(o){o.classList.remove('open')});
});

// ---- LG-GATE (giriş kapısı) — logged-out mikro-aksiyon kapısı ----
(function(){
  var gate=document.getElementById('lgGate');
  var overlay=document.getElementById('lgOverlay');
  if(!gate)return;
  function open(title,desc){
    if(document.body.classList.contains('is-auth'))return false;   // logged-in: kapı yok
    if(title)document.getElementById('lgTitle').textContent=title;
    if(desc)document.getElementById('lgDesc').textContent=desc;
    gate.classList.add('show');overlay.classList.add('show');document.body.style.overflow='hidden';
    return true;
  }
  function close(){gate.classList.remove('show');overlay.classList.remove('show');document.body.style.overflow='';}
  window.__lgGate=open;window.__lgGateClose=close;
  document.getElementById('lgClose').addEventListener('click',close);
  overlay.addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&gate.classList.contains('show'))close();});
  // data-lg-gate taşıyan öğeler logged-out'ta kapıyı açar (capture: sayfa toggle'ından önce keser)
  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-lg-gate]');
    if(!t)return;
    if(document.body.classList.contains('is-auth'))return;          // logged-in: normal davranış
    e.preventDefault();e.stopPropagation();
    open(t.getAttribute('data-lg-title'),t.getAttribute('data-lg-desc'));
  },true);
  if(location.search.indexOf('lg=1')>-1){open();}                    // SS paramı
})();

// ---- DİL SEÇİCİ (üst bant dropdown) ----
(function(){
  var lang=document.getElementById('tbLang');
  if(!lang)return;
  var btn=document.getElementById('tbLangBtn');
  btn.addEventListener('click',function(e){
    e.preventDefault();e.stopPropagation();
    var open=lang.classList.toggle('open');
    btn.setAttribute('aria-expanded',open?'true':'false');
  });
  lang.querySelectorAll('.tb-lang-menu a').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      lang.querySelectorAll('.tb-lang-menu a').forEach(function(x){x.classList.remove('active')});
      a.classList.add('active');
      btn.querySelector('span').textContent=a.getAttribute('data-lang').toUpperCase();
      lang.classList.remove('open');btn.setAttribute('aria-expanded','false');
    });
  });
  document.addEventListener('click',function(e){
    if(!e.target.closest('#tbLang')){lang.classList.remove('open');btn.setAttribute('aria-expanded','false');}
  });
})();

// ---- MOBİL DRAWER aç/kapa ----
(function(){
  var drawer=document.getElementById('drawer');
  var overlay=document.getElementById('drawerOverlay');
  var burger=document.getElementById('hamburger');
  var closeBtn=document.getElementById('drawerClose');
  function open(){drawer.classList.add('open');overlay.classList.add('open');document.body.style.overflow='hidden';}
  function close(){drawer.classList.remove('open');overlay.classList.remove('open');document.body.style.overflow='';}
  burger.addEventListener('click',open);
  closeBtn.addEventListener('click',close);
  overlay.addEventListener('click',close);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  // accordion: alt menülü öğeler tıkla-aç
  drawer.querySelectorAll('.d-has-sub > .d-link').forEach(function(lnk){
    lnk.addEventListener('click',function(){
      var item=lnk.parentElement;
      var wasOpen=item.classList.contains('open');
      drawer.querySelectorAll('.d-item.open').forEach(function(o){o.classList.remove('open')});
      if(!wasOpen)item.classList.add('open');
    });
  });
  // alt link veya direkt linke tıklayınca drawer kapansın
  drawer.querySelectorAll('.d-sub a, .d-item > a.d-link, .drawer-foot a, .drawer-foot > button').forEach(function(a){
    a.addEventListener('click',close);
  });
  // drawer dil seçici — aç/kapa liste + seçim (drawer kapanmaz, N dile ölçeklenir)
  var dl=document.getElementById('drawerLang');
  if(dl){
    var dlToggle=dl.querySelector('.drawer-lang-toggle');
    dlToggle.addEventListener('click',function(){
      var open=dl.classList.toggle('open');
      dlToggle.setAttribute('aria-expanded',open?'true':'false');
    });
    dl.querySelectorAll('.drawer-lang-list button').forEach(function(b){
      b.addEventListener('click',function(){
        dl.querySelectorAll('.drawer-lang-list button').forEach(function(x){x.classList.remove('active')});
        b.classList.add('active');
        document.getElementById('drawerLangCur').textContent=b.getAttribute('data-lang').toUpperCase()+' — '+b.getAttribute('data-name');
        dl.classList.remove('open');dlToggle.setAttribute('aria-expanded','false');
      });
    });
  }
})();

// ---- SÜRÜKLE-KAYDIR (mouse ile yatay slider'lar) ----
// Sayfa kendi track selector'larını alttaki listeye ekler (.row-track hazır gelir)
(function(){
  function enableDrag(el){
    el.classList.add('drag-scroll');
    var down=false,startX=0,startScroll=0,moved=false;
    el.addEventListener('pointerdown',function(e){
      if(e.pointerType==='touch')return;           // touch zaten native kayar
      down=true;moved=false;startX=e.clientX;startScroll=el.scrollLeft;
    });
    el.addEventListener('pointermove',function(e){
      if(!down)return;
      var dx=e.clientX-startX;
      if(Math.abs(dx)>4){moved=true;el.classList.add('dragging');}
      el.scrollLeft=startScroll-dx;
    });
    function up(){down=false;setTimeout(function(){el.classList.remove('dragging');},0);}
    el.addEventListener('pointerup',up);
    el.addEventListener('pointercancel',up);
    el.addEventListener('pointerleave',up);
    // sürükleme sonrası yanlışlıkla tıklamayı engelle
    el.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false;}},true);
    // dikey wheel'i yatay scroll'a çevir (trackpad/mouse)
    el.addEventListener('wheel',function(e){
      if(el.scrollWidth<=el.clientWidth)return;
      if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
      e.preventDefault();el.scrollLeft+=e.deltaY;
    },{passive:false});
  }
  ['.row-track','.cat-track','.grid-4','.vid-grid','.chips','.chef-row','.disc-grid'].forEach(function(sel){
    document.querySelectorAll(sel).forEach(enableDrag);
  });
})();

// ---- FOOTER REVEAL — footer yüksekliğini ölç, içerik sonuna boşluk aç ----
(function(){
  var main=document.getElementById('pageMain');
  var foot=document.querySelector('.footer');
  if(!main||!foot)return;
  function fit(){
    if(window.matchMedia('(min-width:641px)').matches){
      main.style.marginBottom=foot.offsetHeight+'px';
    }else{
      main.style.marginBottom='';
    }
  }
  fit();
  window.addEventListener('resize',fit);
  window.addEventListener('load',fit);          // logo/font yüklenince yükseklik oturur
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
})();

// ---- GÖRÜŞ BİLDİR (kenar etiketi → modal) ----
(function(){
  var tab=document.getElementById('fbTab');
  var modal=document.getElementById('fbModal');
  var overlay=document.getElementById('fbOverlay');
  if(!tab||!modal)return;
  var form=document.getElementById('fbForm');
  var success=document.getElementById('fbSuccess');
  function open(){modal.classList.add('show');overlay.classList.add('show');document.body.style.overflow='hidden';}
  function close(){
    modal.classList.remove('show');overlay.classList.remove('show');document.body.style.overflow='';
    setTimeout(function(){form.hidden=false;success.hidden=true;form.reset();},300);
  }
  tab.addEventListener('click',function(e){e.preventDefault();open();});
  document.getElementById('fbClose').addEventListener('click',close);
  overlay.addEventListener('click',close);
  modal.addEventListener('click',function(e){if(e.target===modal)close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  // M17 — konu tipine göre alan seti: aktif pane görünür, pasif pane'lerin
  // input'ları disable edilir (gizli required alanlar submit'i bloklamasın)
  function syncPanes(){
    var cur=modal.querySelector('.fb-topic.active').getAttribute('data-topic');
    modal.querySelectorAll('.fb-fields').forEach(function(p){
      var on=p.getAttribute('data-for')===cur;
      p.classList.toggle('active',on);
      p.querySelectorAll('input,textarea,select,button').forEach(function(el){el.disabled=!on});
    });
  }
  modal.querySelectorAll('.fb-topic').forEach(function(t){
    t.addEventListener('click',function(){
      modal.querySelectorAll('.fb-topic').forEach(function(x){x.classList.remove('active')});
      t.classList.add('active');
      syncPanes();
    });
  });
  syncPanes();
  // emoji + chip seçimleri (tek seçim)
  modal.querySelectorAll('.fb-emoji button').forEach(function(b){
    b.addEventListener('click',function(){
      modal.querySelectorAll('.fb-emoji button').forEach(function(x){x.classList.remove('active')});
      b.classList.add('active');
    });
  });
  modal.querySelectorAll('.fb-chiprow .chip').forEach(function(c){
    c.addEventListener('click',function(){
      modal.querySelectorAll('.fb-chiprow .chip').forEach(function(x){x.classList.remove('active')});
      c.classList.add('active');
    });
  });
  form.addEventListener('submit',function(e){
    e.preventDefault();
    form.hidden=true;success.hidden=false;
  });
  if(location.search.indexOf('fb=1')>-1){open();}
})();

// ---- ÇEREZ ONAY BANNER ----
(function(){
  var banner=document.getElementById('cookieBanner');
  if(!banner)return;
  var KEY='dm-cookie-consent';
  var force=location.search.indexOf('cc=1')>-1;   // SS/test için zorla göster
  function stored(){try{return localStorage.getItem(KEY);}catch(e){return null;}}
  function dismiss(val){
    try{localStorage.setItem(KEY,val);}catch(e){}
    banner.classList.remove('show');if(window.__bnUpdate)window.__bnUpdate();
  }
  if(force || !stored()){
    setTimeout(function(){banner.classList.add('show');if(window.__bnUpdate)window.__bnUpdate();},700);
  }
  document.getElementById('cookieAccept').addEventListener('click',function(){dismiss('accepted');});
  document.getElementById('cookieReject').addEventListener('click',function(){dismiss('rejected');});
})();


/* ---- mobil alt katman yöneticisi ---- */
/* ===== MOBİL ALT KATMAN YÖNETİCİSİ (revize2/mobil1 — kanonik) =====
   Kural: ekranda en fazla 1 sabit alt şerit. Çerez onayı (geçici, öncelikli)
   ya da sayfanın kendi aksiyon şeridi (window.__bottomStrips) açıkken global
   bottom-nav gizlenir; şerit olan sayfalarda nav ayrıca aşağı kaydırınca gizlenir. */
window.__bottomStrips=window.__bottomStrips||[];
setTimeout(function(){
  var nav=document.querySelector('.bottom-nav');
  if(!nav)return;
  var cookie=document.getElementById('cookieBanner');
  var strips=window.__bottomStrips.map(function(s){return document.querySelector(s);}).filter(Boolean);
  var lastY=window.scrollY||0;
  function stripShown(){for(var i=0;i<strips.length;i++){if(strips[i]&&strips[i].classList.contains('show'))return true;}return false;}
  function update(){
    var y=window.scrollY||0;
    if(stripShown()){nav.classList.add('bn-hidden');lastY=y;return;}
    if(strips.length===0||y<80){nav.classList.remove('bn-hidden');lastY=y;return;}
    if(y-lastY>12){nav.classList.add('bn-hidden');lastY=y;}
    else if(lastY-y>12){nav.classList.remove('bn-hidden');lastY=y;}
  }
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update,{passive:true});
  document.addEventListener('click',function(){setTimeout(update,60);},true);
  window.__bnUpdate=update;update();
},0);

/* ---- aktif nav: aria-current + self-link başa kaydırma ---- */
(function(){
  if(window.__dfActiveNav)return; window.__dfActiveNav=true;
  // mevcut sayfa dosya adı (querystring/hash hariç)
  var here=(location.pathname.split('/').pop()||'').toLowerCase();
  // aktif nav linkleri: desktop nav, mobil drawer, bottom-nav
  var sel='.nav a.active, .d-link.active, .bn-item.active';
  var links=document.querySelectorAll(sel);
  links.forEach(function(a){
    if(a.tagName!=='A')return;                 // drawer'da <button> trigger'lar hariç
    a.setAttribute('aria-current','page');
    var href=(a.getAttribute('href')||'').trim();
    if(!href||href.charAt(0)==='#')return;     // pür anchor → dokunma
    var file=href.split('#')[0].split('?')[0].split('/').pop().toLowerCase();
    if(file && file===here){                   // SELF link → boş-tık yerine başa kaydır
      a.addEventListener('click',function(e){
        e.preventDefault();
        window.scrollTo({top:0,behavior:'smooth'});
      });
    }
  });
})();

/* ---- DadaMentor FAB + scroll-reveal + başa dön ---- */
/* ===== ADIM 3 KABUK JS (DadaMentor + reveal + scroll-top) ===== */
// ---- DADAMENTOR ASİSTAN PANELİ (floating collapse/expand morph + footer-hide) ----
(function(){
  var panel=document.getElementById('mentorPanel');
  if(!panel)return;
  var mpToggle=document.getElementById('mpToggle');
  var mpToggleIco=document.getElementById('mpToggleIco');
  var mpMiniOv=document.getElementById('mpMiniOv');
  var panelState='mini';
  function collapse(){
    panelState='mini';panel.setAttribute('data-state','mini');panel.classList.add('mini');
    if(mpToggleIco)mpToggleIco.className='fa-solid fa-plus';
    if(mpToggle)mpToggle.setAttribute('aria-label','Paneli büyüt');
    if(mpMiniOv)mpMiniOv.setAttribute('aria-hidden','false');
  }
  function expand(){
    panelState='full';panel.setAttribute('data-state','full');panel.classList.remove('mini');
    if(mpToggleIco)mpToggleIco.className='fa-solid fa-minus';
    if(mpToggle)mpToggle.setAttribute('aria-label','Paneli küçült');
    if(mpMiniOv)mpMiniOv.setAttribute('aria-hidden','true');
  }
  if(mpToggle)mpToggle.addEventListener('click',function(e){e.stopPropagation();panelState==='full'?collapse():expand();});
  if(mpMiniOv)mpMiniOv.addEventListener('click',expand);
  function onFootScroll(){
    var y=window.scrollY||document.documentElement.scrollTop;
    var max=document.documentElement.scrollHeight-window.innerHeight;
    panel.classList.toggle('foot-hide',(max-y)<260);
  }
  window.addEventListener('scroll',onFootScroll,{passive:true});
  window.addEventListener('resize',onFootScroll);
  onFootScroll();
})();
// ---- ÖLÇÜLÜ SCROLL-REVEAL (FOUC-güvenli; .reveal hedefi yoksa no-op; class 'in') ----
(function(){
  var els=document.querySelectorAll('.reveal');
  if(!els.length)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(!('IntersectionObserver' in window))return;
  document.documentElement.classList.add('reveal-ready');
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.12,rootMargin:'0px 0px -7% 0px'});
  els.forEach(function(el){io.observe(el);});
})();
// ---- SCROLL-TO-TOP (sağ-alt; scrollY eşiği, dipte gizle) ----
(function(){
  var btn=document.getElementById('toTop');
  if(!btn)return;
  var smooth=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function upd(){
    var y=window.scrollY||document.documentElement.scrollTop;
    var max=document.documentElement.scrollHeight-window.innerHeight;
    btn.classList.toggle('show', y>620 && (max-y)>120);
  }
  btn.addEventListener('click',function(){window.scrollTo({top:0,behavior:smooth?'smooth':'auto'});});
  window.addEventListener('scroll',upd,{passive:true});
  window.addEventListener('resize',upd);
  upd();
})();
/* ---- Ziyaretçi ↔ üye: "örnek görünüm" işaretleri (belge §9.3 · §19) ----
   Giriş yapılmışsa demo etiketleri ve giriş şeridi kalkar. Her sayfada tekrar
   yazılmasın diye kabukta. */
(function(){
  function sync(){
    var authed = document.body.classList.contains('is-auth');
    document.querySelectorAll('[data-lg-only]').forEach(function(el){ el.style.display = authed ? 'none' : ''; });
    document.querySelectorAll('.fp-demo').forEach(function(el){ el.style.display = authed ? 'none' : ''; });
    var st = document.querySelector('.fp-state');
    if(st && authed) st.textContent = 'Ücretsiz üye · kendi verin';
  }
  sync();
  window.addEventListener('storage', sync);
  window.FIT_SHELL = window.FIT_SHELL || {};
  window.FIT_SHELL.syncAuthView = sync;
})();


})();
