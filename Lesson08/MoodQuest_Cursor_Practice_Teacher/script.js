const form = document.querySelector('#quest-form');
const result = document.querySelector('#result');
const resetButton = document.querySelector('#reset-button');
const formMessage = document.querySelector('#form-message');

const quests = {
  energetic: ['Create a 3-song dance challenge', 'Try a speed scavenger hunt', 'Build a paper airplane obstacle course'],
  creative: ['Design a new superhero logo', 'Write a six-panel comic', 'Make a stop-motion clip with toys'],
  calm: ['Draw a tiny nature journal page', 'Try a 10-minute no-phone reset', 'Make a cozy reading fort'],
  social: ['Invent a two-player trivia game', 'Call a friend for a mini photo challenge', 'Create a snack taste-test tournament']
};

const placeLabels = {
  indoor: 'Indoors',
  outdoor: 'Outdoors',
  either: 'Surprise location'
};

function showMessage(text, type = '') {
  formMessage.textContent = text;
  formMessage.className = `form-message ${type}`.trim();
}

function showEmptyState() {
  result.innerHTML = `
    <div class="empty-state">
      <span aria-hidden="true">🧭</span>
      <p>Your quest will appear here.</p>
    </div>`;
}

function showQuest(idea, time, place) {
  result.innerHTML = `
    <article class="quest-card">
      <p class="eyebrow">Your MoodQuest</p>
      <h2>${idea}</h2>
      <div class="quest-meta">
        <span>⏱ ${time} minutes</span>
        <span>📍 ${placeLabels[place]}</span>
      </div>
      <h3>Start now</h3>
      <ol class="quest-steps">
        <li>Gather what you need.</li>
        <li>Set a timer for ${time} minutes.</li>
        <li>Make it your own and have fun.</li>
      </ol>
    </article>`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const mood = document.querySelector('#mood').value;
  const time = document.querySelector('#time').value;
  const place = document.querySelector('input[name="place"]:checked')?.value;

  const missing = [];
  if (!mood) missing.push('a mood');
  if (!time) missing.push('how much time you have');
  if (!place) missing.push('a location');

  if (missing.length > 0) {
    showMessage(`Almost there! Please choose ${missing.join(', ')}.`, 'error');
    return;
  }

  showMessage('Great choices! Your quest is ready.', 'success');
  result.innerHTML = '<p class="loading">Finding your quest…</p>';

  window.setTimeout(() => {
    const ideas = quests[mood];
    const idea = ideas[Math.floor(Math.random() * ideas.length)];
    showQuest(idea, time, place);
  }, 450);
});

resetButton.addEventListener('click', () => {
  form.reset();
  showMessage('');
  showEmptyState();
  document.querySelector('#mood').focus();
});
