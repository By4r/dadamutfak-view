/* Uygulama Modu (brief §11) — bağımsız stepper. bindCookmode() (ui.js)
   BİLEREK çağrılmadı (gerekçe: uygulama.blade.php dosya başı yorumu — 3 somut
   neden). Aynı görsel dil (.cookmode/.cm-*), farklı veri kaynağı (lesson_steps
   success/mistake/safety) ve farklı davranış (ilerleme POST + tamamlama). */
(function () {
  var modal = document.getElementById('uygMode');
  if (!modal) return;

  var isAuth = document.body.classList.contains('is-auth');
  var token = document.querySelector('meta[name="csrf-token"]')?.content;
  var cards = Array.prototype.slice.call(modal.querySelectorAll('[data-um-source] .step-card'));
  if (!cards.length) return;

  // Bu sayfanın TEK içeriği Uygulama Modu — bindCookmode()'un open()'ında
  // yaptığı gibi arka plan scroll'unu kilitle (aksi halde fixed overlay'in
  // ALTINDAKİ minimal sayfa gövdesi kaydırılıp footer/app-banner görünür).
  document.body.style.overflow = 'hidden';

  var esc = function (s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; };

  var steps = cards.map(function (card) {
    return {
      title: (card.querySelector('[data-um-title]')?.textContent || '').trim(),
      body: (card.querySelector('.step-card__body p')?.textContent || '').trim(),
      timeText: (card.querySelector('.step-time')?.textContent || '').trim(),
      secs: parseInt(card.getAttribute('data-um-secs'), 10) || 0,
      heat: (card.querySelector('[data-um-heat]')?.textContent || '').trim(),
      success: (card.querySelector('[data-um-success]')?.textContent || '').trim(),
      safety: (card.querySelector('[data-um-safety]')?.textContent || '').trim(),
      img: card.querySelector('.step-img')?.style.backgroundImage || '',
    };
  });

  var L = {
    step: modal.dataset.lStep || 'Adım',
    next: modal.dataset.lNext || 'Sonraki Adım',
    finish: modal.dataset.lFinish || 'Bitir',
    doneTitle: modal.dataset.lDoneTitle || 'Tamamlandı!',
    doneText: modal.dataset.lDoneText || '',
  };

  var inner = modal.querySelector('[data-um-inner]');
  var count = modal.querySelector('[data-um-count]');
  var bar = modal.querySelector('[data-um-bar]');
  var dotsWrap = modal.querySelector('[data-um-dots]');
  var prevBtn = modal.querySelector('[data-um-prev]');
  var nextBtn = modal.querySelector('[data-um-next]');
  var timer = modal.querySelector('[data-um-timer]');
  var timeOut = modal.querySelector('[data-um-time]');
  var startBtn = modal.querySelector('[data-um-start]');
  var resetBtn = modal.querySelector('[data-um-reset]');

  var idx = Math.min(Math.max(parseInt(modal.dataset.startStep, 10) || 0, 0), steps.length - 1);
  var finished = false;
  var done = [];
  var lastPosted = -1;

  steps.forEach(function (_, i) {
    var d = document.createElement('i');
    d.addEventListener('click', function () { idx = i; render(); });
    dotsWrap.appendChild(d);
  });

  function postProgress(stepIdx) {
    if (!isAuth || stepIdx === lastPosted) return;
    lastPosted = stepIdx;
    var percent = Math.round(((stepIdx + 1) / steps.length) * 100);
    fetch(modal.dataset.progressUrl, {
      method: 'POST',
      headers: { 'X-CSRF-TOKEN': token, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ current_step: stepIdx, percent: percent }),
    }).catch(function () { /* ağ hatası — sessiz, ilerleme kaybı UI'ı bozmasın */ });
  }

  function render() {
    finished = false;
    nextBtn.style.display = '';
    var s = steps[idx];
    var html = '<div class="cm-num"><span class="cm-num__n">' + (idx + 1) + '</span>';
    if (s.timeText) html += '<span class="cm-num__time"><i class="fa-regular fa-clock" aria-hidden="true"></i> ' + esc(s.timeText) + '</span>';
    if (s.heat) html += '<span class="um-heat"><i class="fa-solid fa-fire" aria-hidden="true"></i> ' + esc(s.heat) + '</span>';
    html += '</div>';
    if (s.title) html += '<h3 class="cm-num__title">' + esc(s.title) + '</h3>';
    html += '<p class="cm-text">' + esc(s.body) + '</p>';
    if (s.img) html += '<div class="cm-figs"><div class="cm-fig" style="background-image:' + s.img + '"></div></div>';
    if (s.success) html += '<div class="um-check"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> <span><b>Kontrol:</b> ' + esc(s.success) + '</span></div>';
    if (s.safety) html += '<div class="um-warn"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i> <span><b>Uyarı:</b> ' + esc(s.safety) + '</span></div>';
    inner.innerHTML = html;
    inner.scrollTop = 0;
    count.textContent = L.step + ' ' + (idx + 1) + ' / ' + steps.length;
    bar.style.width = Math.round((idx + 1) / steps.length * 100) + '%';
    Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
      d.className = i === idx ? 'on' : (done.indexOf(i) > -1 ? 'done' : '');
    });
    prevBtn.disabled = idx === 0;
    nextBtn.innerHTML = idx === steps.length - 1
      ? esc(L.finish) + ' <i class="fa-solid fa-flag-checkered" aria-hidden="true"></i>'
      : esc(L.next) + ' <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>';
    timerLoad();
    postProgress(idx);
  }

  function renderDone(apiData) {
    finished = true;
    timerStop();
    steps.forEach(function (_, i) { if (done.indexOf(i) < 0) done.push(i); });

    var nextUrl = apiData?.nextLesson?.url || modal.dataset.nextLessonUrl;
    var nextTitle = apiData?.nextLesson?.title || modal.dataset.nextLessonTitle;
    var applyUrl = apiData?.applyRecipe?.url || modal.dataset.applyRecipeUrl;
    var applyTitle = apiData?.applyRecipe?.title || modal.dataset.applyRecipeTitle;

    var html = '<div class="cm-done">'
      + '<div class="cd-ico"><i class="fa-solid fa-champagne-glasses" aria-hidden="true"></i></div>'
      + '<h2>' + esc(L.doneTitle) + '</h2>'
      + '<p>' + esc(L.doneText) + '</p>';

    (apiData?.badgesEarned || []).forEach(function (badge) {
      html += '<p class="um-check"><i class="fa-solid ' + (badge.icon || 'fa-award') + '" aria-hidden="true"></i> <span>Rozet kazandın: ' + esc(badge.name) + '</span></p>';
    });

    html += '<div class="cd-acts">';
    if (applyUrl) html += '<a class="btn btn-primary" href="' + esc(applyUrl) + '"><i class="fa-solid fa-utensils" aria-hidden="true"></i> Şimdi Uygula: ' + esc(applyTitle) + '</a>';
    if (nextUrl) html += '<a class="btn btn-ghost" href="' + esc(nextUrl) + '"><i class="fa-solid fa-forward" aria-hidden="true"></i> Sıradaki Ders: ' + esc(nextTitle) + '</a>';
    html += '<a class="btn btn-ghost" href="' + esc(modal.dataset.backUrl) + '"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Derse Dön</a>';
    html += '</div></div>';

    inner.innerHTML = html;
    inner.scrollTop = 0;
    count.textContent = L.finish;
    bar.style.width = '100%';
    Array.prototype.forEach.call(dotsWrap.children, function (d) { d.className = 'done'; });
    prevBtn.disabled = false;
    nextBtn.style.display = 'none';
    timer.style.visibility = 'hidden';
  }

  function complete() {
    if (!isAuth) {
      renderDone(null);
      return;
    }
    fetch(modal.dataset.completeUrl, {
      method: 'POST',
      headers: { 'X-CSRF-TOKEN': token, Accept: 'application/json' },
    })
      .then(function (res) { return res.ok ? res.json() : Promise.reject(res); })
      .then(function (data) { renderDone(data); })
      .catch(function () { renderDone(null); });
  }

  // --- Adım sayacı (bindCookmode() ile AYNI teknik: start/pause/reset + alarm) ---
  var left = 0;
  var tick = null;
  var running = false;
  var fmt = function (sec) { var m = Math.floor(sec / 60); var x = sec % 60; return (m < 10 ? '0' : '') + m + ':' + (x < 10 ? '0' : '') + x; };
  var timerRender = function () { timeOut.textContent = fmt(Math.max(0, left)); };
  function timerStop() {
    running = false; clearInterval(tick); tick = null;
    startBtn.querySelector('i').className = 'fa-solid fa-play';
    timer.classList.remove('running');
  }
  function timerLoad() {
    timerStop();
    timer.classList.remove('cm-timer--alarm');
    left = steps[idx].secs;
    timer.style.visibility = left ? 'visible' : 'hidden';
    timerRender();
  }
  function finish() {
    timerStop();
    timer.classList.add('cm-timer--alarm');
  }
  startBtn.addEventListener('click', function () {
    if (running) { timerStop(); return; }
    if (left <= 0) left = steps[idx].secs;
    if (left <= 0) return;
    running = true;
    timer.classList.remove('cm-timer--alarm');
    timer.classList.add('running');
    startBtn.querySelector('i').className = 'fa-solid fa-pause';
    tick = setInterval(function () { left--; timerRender(); if (left <= 0) finish(); }, 1000);
  });
  resetBtn.addEventListener('click', timerLoad);

  prevBtn.addEventListener('click', function () {
    if (finished) { render(); return; }
    if (idx > 0) { idx--; render(); }
  });
  nextBtn.addEventListener('click', function () {
    if (done.indexOf(idx) < 0) done.push(idx);
    if (idx < steps.length - 1) { idx++; render(); } else complete();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' && !finished) nextBtn.click();
    else if (e.key === 'ArrowLeft') prevBtn.click();
  });

  render();
})();
