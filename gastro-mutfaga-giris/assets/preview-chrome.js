/* preview-chrome.js — statik önizleme kromu (yeni dosya).
   Sunucu gerektiren kontroller HTML seviyesinde zaten devre dışı bırakıldı
   (form onsubmit="return false;", inert <a> onclick="return false;",
   gerçek "disabled" öznitelikli düğmeler). Bu betik yalnızca sessiz bir
   toast bildirimi ekler — engelleme mantığının kendisi bu betiğe bağlı
   DEĞİLDİR, betik hiç yüklenmese bile kontroller inert kalır. */
(function () {
  var toast;
  var timer;

  function ensureToast() {
    if (toast) return toast;
    toast = document.createElement('div');
    toast.className = 'sp-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = 'Bu statik önizlemede etkin değil';
    document.body.appendChild(toast);
    return toast;
  }

  function showToast() {
    var t = ensureToast();
    t.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest(
      '[aria-disabled="true"], .sp-inert, button[disabled], ' +
      'form.sp-inert-form button, form.sp-inert-form input[type="submit"]'
    );
    if (el) showToast();
  }, true);
})();
