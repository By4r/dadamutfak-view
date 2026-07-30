/* Mutfağa Giriş ders detayı — P1 EKLERİ (mutfaga-giris-plan.md §6 pub-detail):
   §10.11 Mini Test gönderimi (content.lesson.test) + §10.12 Dersi Tamamla
   (content.lesson.tamamla). İkisi de yalnız @auth altında render edildiği
   için (bkz. _quiz.blade.php/_complete.blade.php) burada misafir dallanması
   YOK — csrf-token deseni ui.js bindEngagementToggles() ile AYNI. */

(function () {
  var form = document.getElementById('lsQuizForm');
  if (!form) return;

  var token = document.querySelector('meta[name="csrf-token"]')?.content;
  var submitBtn = document.getElementById('lsQuizSubmit');
  var hint = document.getElementById('lsQuizHint');
  var resultBox = document.getElementById('lsQuizResult');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var fieldsets = Array.prototype.slice.call(form.querySelectorAll('.ls-q'));
    var unanswered = fieldsets.some(function (fs) {
      return !fs.querySelector('input[type="radio"]:checked');
    });

    if (unanswered) {
      hint.textContent = 'Devam etmeden önce tüm soruları yanıtla';
      hint.className = 'ls-q-hint err';
      return;
    }

    var answers = {};
    fieldsets.forEach(function (fs) {
      var qi = fs.getAttribute('data-q');
      var checked = fs.querySelector('input[type="radio"]:checked');
      answers[qi] = checked ? parseInt(checked.value, 10) : null;
    });

    submitBtn.disabled = true;

    fetch(form.dataset.quizUrl, {
      method: 'POST',
      headers: { 'X-CSRF-TOKEN': token, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ answers: answers }),
    })
      .then(function (res) { return res.ok ? res.json() : Promise.reject(res); })
      .then(function (data) {
        (data.explanations || []).forEach(function (item) {
          var fs = form.querySelector('.ls-q[data-q="' + item.question + '"]');
          if (!fs) return;
          var picked = fs.querySelector('input[type="radio"]:checked');
          var answerIdx = picked ? parseInt(picked.value, 10) : null;
          fs.classList.add(item.correct ? 'is-correct' : 'is-wrong');
          fs.querySelectorAll('.ls-opt').forEach(function (opt, oi) {
            if (item.correct && oi === answerIdx) opt.classList.add('is-answer');
            if (!item.correct && oi === answerIdx) opt.classList.add('is-picked');
          });
          var explainEl = fs.querySelector('.ls-q-explain');
          if (explainEl && item.explanation) {
            explainEl.textContent = item.explanation;
            explainEl.hidden = false;
          }
          fs.querySelectorAll('input[type="radio"]').forEach(function (input) { input.disabled = true; });
        });

        hint.textContent = '';
        resultBox.hidden = false;
        var passed = !!data.passed;
        resultBox.innerHTML = '<span class="lq-score">' + data.score + '%</span>'
          + '<span class="lq-verdict ' + (passed ? 'pass' : 'fail') + '">'
          + (passed ? '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> ' : '<i class="fa-solid fa-circle-xmark" aria-hidden="true"></i> ')
          + (passed ? 'Testi geçtin' : 'Tekrar deneyebilirsin')
          + '</span>';
        submitBtn.hidden = true;
      })
      .catch(function () {
        hint.textContent = 'Test gönderilemedi, tekrar dene.';
        hint.className = 'ls-q-hint err';
        submitBtn.disabled = false;
      });
  });
})();

(function () {
  var box = document.getElementById('lsCompleteBox');
  if (!box) return;

  // ui.js bindCookmode() emsali — sunucudan/admin'den gelen serbest metni
  // (rozet adı, ders/tarif başlığı) innerHTML'e basmadan ÖNCE kaçır.
  var esc = function (s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; };

  var btn = document.getElementById('lsCompleteBtn');
  var resultBox = document.getElementById('lsCompleteResult');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var token = document.querySelector('meta[name="csrf-token"]')?.content;
    btn.disabled = true;

    fetch(box.dataset.completeUrl, {
      method: 'POST',
      headers: { 'X-CSRF-TOKEN': token, Accept: 'application/json' },
    })
      .then(function (res) { return res.ok ? res.json() : Promise.reject(res); })
      .then(function (data) {
        var html = '<p class="ls-complete-ok"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Bu dersi tamamladın.</p>';

        (data.badgesEarned || []).forEach(function (badge) {
          html += '<span class="ls-complete-badge"><i class="fa-solid ' + (badge.icon || 'fa-award') + '" aria-hidden="true"></i> ' + esc(badge.name) + '</span>';
        });

        var nextUrl = data.nextLesson ? data.nextLesson.url : box.dataset.nextLessonUrl;
        var nextTitle = data.nextLesson ? data.nextLesson.title : box.dataset.nextLessonTitle;
        var applyUrl = data.applyRecipe ? data.applyRecipe.url : box.dataset.applyRecipeUrl;
        var applyTitle = data.applyRecipe ? data.applyRecipe.title : box.dataset.applyRecipeTitle;

        if (nextUrl) {
          html += '<div class="ls-complete-next">'
            + '<a href="' + esc(nextUrl) + '"><i class="fa-solid fa-forward" aria-hidden="true"></i> Sıradaki ders: ' + esc(nextTitle) + '</a>';
          if (applyUrl) {
            html += '<a href="' + esc(applyUrl) + '"><i class="fa-solid fa-utensils" aria-hidden="true"></i> Şimdi uygula: ' + esc(applyTitle) + '</a>';
          }
          html += '</div>';
        }

        resultBox.innerHTML = html;
        resultBox.hidden = false;
        btn.hidden = true;
      })
      .catch(function () {
        btn.disabled = false;
      });
  });
})();
