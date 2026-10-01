document.addEventListener('DOMContentLoaded', () => {
  const config = window.weddingConfig || {};
  const page = document.body.dataset.page;

  applyConfiguration(config);

  if (page === 'opening') {
    initOpeningPage(config);
  }

  if (page === 'invitation') {
    initInvitationPage(config);
  }
});

function applyConfiguration(config) {
  const textTargets = document.querySelectorAll('[data-config]');
  textTargets.forEach((element) => {
    const key = element.dataset.config;
    if (config[key]) {
      element.textContent = config[key];
    }
  });

  const configuredImages = {
    couple: config.coupleImage,
    secondaryCouple: config.secondaryCoupleImage
  };
  document.querySelectorAll('[data-image-config]').forEach((image) => {
    const imagePath = configuredImages[image.dataset.imageConfig];
    if (imagePath) {
      image.src = imagePath;
    }
  });

  document.title = `${config.groomName || 'Couple'} ❤️ ${config.brideName || 'Partner'} — Wedding Invitation`;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute(
      'content',
      `You're invited to celebrate our special day on 13 November 2026 in Madurai.`
    );
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', `${config.groomName || 'Couple'} ❤️ ${config.brideName || 'Partner'} — Wedding Invitation`);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute(
      'content',
      `You're invited to celebrate our special day on 13 November 2026 in Madurai.`
    );
  }

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage && config.coupleImage) {
    ogImage.setAttribute('content', config.coupleImage);
  }

  const mapsLink = document.getElementById('mapsLink');
  if (mapsLink && config.mapsUrl) {
    mapsLink.setAttribute('href', config.mapsUrl);
  }

  const whatsappShare = document.getElementById('whatsappShare');
  if (whatsappShare) {
    const text = `You're invited to our wedding ❤️\n\n${config.groomName || 'Groom'} & ${config.brideName || 'Bride'}\n13 November 2026\nMadurai\n\nWe would love to celebrate our special day with you!`;
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n\n${window.location.href}`)}`;
    whatsappShare.setAttribute('href', shareUrl);
  }

  const saveDateBtn = document.getElementById('saveDateBtn');
  if (saveDateBtn) {
    saveDateBtn.addEventListener('click', () => downloadCalendarInvite(config));
  }
}

function initOpeningPage(config) {
  const button = document.getElementById('openInvitationBtn');
  if (!button) return;

  button.addEventListener('click', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.add('page-transitioning');
    if (!reducedMotion) {
      button.classList.add('is-animating');
    }

    if (config.music) {
      sessionStorage.setItem('weddingMusicAutoplay', 'true');
    }

    setTimeout(() => {
      window.location.href = 'invitation.html';
    }, reducedMotion ? 120 : 650);
  });
}


function downloadCalendarInvite(config) {
  const startDate = new Date(config.weddingDate);
  const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);

  const formatICSDate = (dateValue) => {
    const iso = dateValue.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    return iso;
  };

  const calendarText = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WeddingInvitation//EN',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@wedding-invitation`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    'SUMMARY:' + `${config.groomName || 'Groom'} & ${config.brideName || 'Bride'} Wedding`,
    'LOCATION:' + `${config.venueName || 'Wedding Venue'}, ${config.venueAddress || 'Madurai'}`,
    'DESCRIPTION:You are invited to celebrate our wedding day.',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([calendarText], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'wedding-invitation.ics';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function initInvitationPage(config) {
  initRevealSections();

  const autoplayMusic = sessionStorage.getItem('weddingMusicAutoplay') === 'true';
  initMusicToggle(config, autoplayMusic);

  if (autoplayMusic) {
    sessionStorage.removeItem('weddingMusicAutoplay');
  }

  initializeCountdown(config.weddingDate);
}

function initRevealSections() {
  const revealButtons = document.querySelectorAll('[data-next-target]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  revealButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetSelector = button.dataset.nextTarget;
      if (!targetSelector) return;

      const targetSection = document.querySelector(targetSelector);
      if (!targetSection) return;

      targetSection.classList.add('is-visible');
      if (!reducedMotion) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function playOptionalMusic(config) {
  const { music } = config || {};
  if (!music) return;

  const audio = new Audio(music);
  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = 'auto';

  audio
    .play()
    .then(() => {
      window.weddingAudio = audio;
    })
    .catch(() => {
      window.weddingAudio = audio;
    });
}

function initMusicToggle(config, autoplay = false) {
  const musicButton = document.getElementById('musicToggle');
  if (!musicButton || !config.music) {
    if (musicButton) {
      musicButton.style.display = 'none';
    }
    return;
  }

  const audio = new Audio(config.music);
  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = 'auto';
  window.weddingAudio = audio;

  audio.addEventListener('error', () => {
    musicButton.style.display = 'none';
  });

  const startPlayback = async () => {
    try {
      await audio.play();
      musicButton.classList.add('is-playing');
    } catch (error) {
      console.warn('Music playback was blocked until user interaction.', error);
    }
  };

  if (autoplay) {
    startPlayback();
  }

  musicButton.addEventListener('click', async () => {
    try {
      if (audio.paused) {
        await audio.play();
        musicButton.classList.add('is-playing');
      } else {
        audio.pause();
        musicButton.classList.remove('is-playing');
      }
    } catch (error) {
      console.warn('Music playback was blocked until user interaction.', error);
    }
  });
}

