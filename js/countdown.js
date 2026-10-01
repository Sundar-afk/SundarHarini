function initializeCountdown(targetDateString) {
  const countdownRoot = document.querySelector('#countdown');
  if (!countdownRoot) return;

  const dayNode = countdownRoot.querySelector('[data-countdown="days"]');
  const hourNode = countdownRoot.querySelector('[data-countdown="hours"]');
  const minuteNode = countdownRoot.querySelector('[data-countdown="minutes"]');
  const secondNode = countdownRoot.querySelector('[data-countdown="seconds"]');
  const message = document.getElementById('countdownMessage');

  function updateCountdown() {
    const weddingTime = new Date(targetDateString);
    const now = new Date();
    const diff = weddingTime.getTime() - now.getTime();

    if (diff <= 0) {
      dayNode.textContent = '00';
      hourNode.textContent = '00';
      minuteNode.textContent = '00';
      secondNode.textContent = '00';
      if (message) {
        message.textContent = 'TODAY IS THE DAY ❤️';
        message.classList.add('is-visible');
      }
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    dayNode.textContent = String(days).padStart(2, '0');
    hourNode.textContent = String(hours).padStart(2, '0');
    minuteNode.textContent = String(minutes).padStart(2, '0');
    secondNode.textContent = String(seconds).padStart(2, '0');

    if (message) {
      message.classList.remove('is-visible');
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
