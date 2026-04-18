const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

revealElements.forEach((el, index) => {
  el.style.transitionDelay = `${index * 60}ms`;
  observer.observe(el);
});

const toggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const moodMap = {
  Happy: 'Try a feel-good comedy playlist and trending upbeat picks.',
  Focused: 'Recommended: deep-focus instrumentals and productivity podcasts.',
  Relaxed: 'Recommended: calm acoustic mixes and light storytelling content.',
  Energetic: 'Recommended: action highlights and high-tempo motivation tracks.',
};

const moodButtonsWrap = document.getElementById('moodButtons');
const moodResult = document.getElementById('moodResult');

if (moodButtonsWrap && moodResult) {
  moodButtonsWrap.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }
    const mood = target.dataset.mood;
    if (!mood || !moodMap[mood]) {
      return;
    }

    moodButtonsWrap.querySelectorAll('.chip').forEach((btn) => btn.classList.remove('active'));
    target.classList.add('active');
    moodResult.textContent = `${mood}: ${moodMap[mood]}`;
  });
}

const newsData = {
  technology: [
    'AI-powered assistants become standard in daily workflows.',
    'Cloud-native apps dominate modern software architecture.',
    'New frontend tooling speeds up web performance audits.',
  ],
  sports: [
    'Local league finals draw record fan attendance this season.',
    'Rising athletes lead a new wave of performance analytics.',
    'Teams adopt smarter recovery routines to reduce injuries.',
  ],
  business: [
    'Startups focus on sustainable growth over rapid expansion.',
    'Digital payments continue strong growth in regional markets.',
    'Hiring trends favor engineers with full-stack problem-solving skills.',
  ],
};

const newsCategory = document.getElementById('newsCategory');
const newsFetchBtn = document.getElementById('newsFetchBtn');
const newsList = document.getElementById('newsList');

if (newsCategory && newsFetchBtn && newsList) {
  newsFetchBtn.addEventListener('click', () => {
    const category = newsCategory.value;
    const headlines = newsData[category] || [];

    newsList.innerHTML = '';
    headlines.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      newsList.appendChild(li);
    });
  });
}

const noteInput = document.getElementById('noteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const loadNoteBtn = document.getElementById('loadNoteBtn');
const clearNoteBtn = document.getElementById('clearNoteBtn');
const noteStatus = document.getElementById('noteStatus');
const noteStorageKey = 'nilesh_portfolio_demo_note';

if (noteInput && saveNoteBtn && loadNoteBtn && clearNoteBtn && noteStatus) {
  saveNoteBtn.addEventListener('click', () => {
    localStorage.setItem(noteStorageKey, noteInput.value.trim());
    noteStatus.textContent = 'Note saved locally in your browser.';
  });

  loadNoteBtn.addEventListener('click', () => {
    const saved = localStorage.getItem(noteStorageKey);
    noteInput.value = saved || '';
    noteStatus.textContent = saved ? 'Saved note loaded.' : 'No saved note found.';
  });

  clearNoteBtn.addEventListener('click', () => {
    localStorage.removeItem(noteStorageKey);
    noteInput.value = '';
    noteStatus.textContent = 'Saved note cleared.';
  });
}

const storyText = document.getElementById('storyText');
const storyChoices = document.getElementById('storyChoices');

const storyNodes = {
  start: {
    text: 'You are at a crossroad in a neon city. Where do you go?',
    choices: [
      { label: 'Enter the Code Lab', next: 'lab' },
      { label: 'Walk to the News Tower', next: 'tower' },
    ],
  },
  lab: {
    text: 'Inside the lab, your prototype compiles on first run. Success feels real.',
    choices: [
      { label: 'Publish project', next: 'publish' },
      { label: 'Restart story', next: 'start' },
    ],
  },
  tower: {
    text: 'At the tower, live headlines stream in and your dashboard stays stable.',
    choices: [
      { label: 'Analyze trends', next: 'trends' },
      { label: 'Restart story', next: 'start' },
    ],
  },
  publish: {
    text: 'You deploy your work and users start sharing positive feedback.',
    choices: [{ label: 'Play again', next: 'start' }],
  },
  trends: {
    text: 'Your insights guide a better product roadmap for the next release.',
    choices: [{ label: 'Play again', next: 'start' }],
  },
};

function renderStory(nodeKey) {
  if (!storyText || !storyChoices || !storyNodes[nodeKey]) {
    return;
  }

  const node = storyNodes[nodeKey];
  storyText.textContent = node.text;
  storyChoices.innerHTML = '';

  node.choices.forEach((choice) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chip';
    button.textContent = choice.label;
    button.addEventListener('click', () => renderStory(choice.next));
    storyChoices.appendChild(button);
  });
}

renderStory('start');
