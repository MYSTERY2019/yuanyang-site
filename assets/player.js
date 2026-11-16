/* minimal accessible player: one button, one seek range, no library */
document.querySelectorAll('.player2').forEach(function (root) {
  var audio = new Audio(root.dataset.src);
  audio.preload = 'metadata';
  var btn = root.querySelector('.p2-btn');
  var range = root.querySelector('input[type=range]');
  var time = root.querySelector('.p2-time');
  var label = root.dataset.label;

  function fmt(s) {
    if (!isFinite(s) || s < 0) return '0:00';
    var m = Math.floor(s / 60), x = Math.floor(s % 60);
    return m + ':' + (x < 10 ? '0' : '') + x;
  }
  function paint() {
    time.textContent = fmt(audio.currentTime) + ' / ' + fmt(audio.duration);
  }
  btn.addEventListener('click', function () {
    if (audio.paused) { audio.play(); } else { audio.pause(); }
  });
  audio.addEventListener('play', function () {
    btn.textContent = '\u275A\u275A'; btn.setAttribute('aria-label', 'Pause ' + label);
  });
  audio.addEventListener('pause', function () {
    btn.textContent = '\u25B6'; btn.setAttribute('aria-label', 'Play ' + label);
  });
  audio.addEventListener('loadedmetadata', paint);
  audio.addEventListener('timeupdate', function () {
    paint();
    if (audio.duration) range.value = (audio.currentTime / audio.duration) * 100;
  });
  range.addEventListener('input', function () {
    if (audio.duration) audio.currentTime = (range.value / 100) * audio.duration;
  });
});
