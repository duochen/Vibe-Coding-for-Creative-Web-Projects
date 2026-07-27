const form = document.querySelector('#quest-form');
const result = document.querySelector('#result');
const resetButton = document.querySelector('#reset-button');

const quests = {
  energetic: ['Create a 3-song dance challenge', 'Try a speed scavenger hunt', 'Build a paper airplane obstacle course'],
  creative: ['Design a new superhero logo', 'Write a six-panel comic', 'Make a stop-motion clip with toys'],
  calm: ['Draw a tiny nature journal page', 'Try a 10-minute no-phone reset', 'Make a cozy reading fort'],
  social: ['Invent a two-player trivia game', 'Call a friend for a mini photo challenge', 'Create a snack taste-test tournament']
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const mood = document.querySelector('#mood').value;
  const time = document.querySelector('#time').value;
  const place = document.querySelector('input[name="place"]:checked')?.value;

  if (!mood || !time || !place) {
    return;
  }

  const ideas = quests[mood];
  const idea = ideas[Math.floor(Math.random() * ideas.length)];
  result.textContent = `${idea}. You chose ${time} minutes and ${place}. Get started now and make it your own!`;
});

resetButton.addEventListener('click', () => {
  form.reset();
  result.textContent = '';
});
