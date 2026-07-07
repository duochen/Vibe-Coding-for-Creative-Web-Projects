// ============================================
// AI Pet Mood Simulator — JavaScript Logic
// ============================================

// --- Pet mood stats (each value is 0 to 100) ---
const pet = {
  happiness: 70,
  hunger: 40,    // higher = more hungry
  energy: 60,
  curiosity: 50,
  health: 80,
};

// --- Grab HTML elements we need to update ---
const happinessBar = document.getElementById("happinessBar");
const hungerBar = document.getElementById("hungerBar");
const energyBar = document.getElementById("energyBar");
const curiosityBar = document.getElementById("curiosityBar");
const healthBar = document.getElementById("healthBar");

const happinessValue = document.getElementById("happinessValue");
const hungerValue = document.getElementById("hungerValue");
const energyValue = document.getElementById("energyValue");
const curiosityValue = document.getElementById("curiosityValue");
const healthValue = document.getElementById("healthValue");

const messageText = document.getElementById("messageText");
const petBody = document.getElementById("petBody");
const petEyes = document.getElementById("petEyes");
const petMouth = document.getElementById("petMouth");
const petEmoji = document.getElementById("petEmoji");
const petMoodLabel = document.getElementById("petMoodLabel");

// --- Button elements ---
const feedBtn = document.getElementById("feedBtn");
const playBtn = document.getElementById("playBtn");
const sleepBtn = document.getElementById("sleepBtn");
const trickBtn = document.getElementById("trickBtn");
const sickBtn = document.getElementById("sickBtn");
const randomBtn = document.getElementById("randomBtn");

// Keep a value between 0 and 100
function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

// Change a stat and keep it in range
function changeStat(statName, amount) {
  pet[statName] = clamp(pet[statName] + amount);
}

// Update all mood bars and number labels on screen
function updateDisplay() {
  happinessBar.style.width = pet.happiness + "%";
  hungerBar.style.width = pet.hunger + "%";
  energyBar.style.width = pet.energy + "%";
  curiosityBar.style.width = pet.curiosity + "%";
  healthBar.style.width = pet.health + "%";

  happinessValue.textContent = pet.happiness;
  hungerValue.textContent = pet.hunger;
  energyValue.textContent = pet.energy;
  curiosityValue.textContent = pet.curiosity;
  healthValue.textContent = pet.health;

  updatePetAppearance();
}

// Show a message in the message box with a fade-in effect
function showMessage(text) {
  messageText.textContent = text;
  messageText.classList.remove("fade-in");
  // Force the browser to restart the animation
  void messageText.offsetWidth;
  messageText.classList.add("fade-in");
}

// Play a quick click animation on a button
function animateButton(button) {
  button.classList.add("clicked");
  setTimeout(function () {
    button.classList.remove("clicked");
  }, 200);
}

// Play a bounce or shake animation on the pet
function animatePet(type) {
  petBody.classList.remove("bounce", "shake");
  void petBody.offsetWidth;
  petBody.classList.add(type);
}

// Flash a mood bar when its value changes
function flashBar(barElement) {
  barElement.classList.remove("flash");
  void barElement.offsetWidth;
  barElement.classList.add("flash");
}

// Change the pet's face, color, and emoji based on current moods
function updatePetAppearance() {
  // Reset CSS classes on the pet body
  petBody.classList.remove("happy", "hungry", "tired", "sleepy", "excited", "sick");
  petEyes.classList.remove("sleepy");

  // Sick is the top priority — show it before other moods
  if (pet.health < 40) {
    petBody.classList.add("sick");
    petMouth.textContent = "×";
    petEmoji.textContent = "🤒";
    petMoodLabel.textContent = "Not feeling well...";
  } else if (pet.energy < 25) {
    petBody.classList.add("sleepy");
    petEyes.classList.add("sleepy");
    petMouth.textContent = "—";
    petEmoji.textContent = "😴";
    petMoodLabel.textContent = "Feeling sleepy...";
  } else if (pet.hunger > 75) {
    petBody.classList.add("hungry");
    petMouth.textContent = "○";
    petEmoji.textContent = "🍽️";
    petMoodLabel.textContent = "So hungry!";
  } else if (pet.happiness > 75) {
    petBody.classList.add("happy");
    petMouth.textContent = "◡";
    petEmoji.textContent = "🥳";
    petMoodLabel.textContent = "Super happy!";
  } else if (pet.curiosity > 75) {
    petBody.classList.add("excited");
    petMouth.textContent = "o";
    petEmoji.textContent = "🤔";
    petMoodLabel.textContent = "Full of curiosity!";
  } else if (pet.energy < 40) {
    petBody.classList.add("tired");
    petMouth.textContent = "~";
    petEmoji.textContent = "😪";
    petMoodLabel.textContent = "Getting tired.";
  } else {
    petMouth.textContent = "◡";
    petEmoji.textContent = "🐣";
    petMoodLabel.textContent = "Feeling pretty good!";
  }
}

// --- Action: Feed the pet ---
function feedPet() {
  changeStat("hunger", -20);
  changeStat("happiness", 10);
  changeStat("energy", 5);
  changeStat("health", 5);

  flashBar(hungerBar);
  flashBar(happinessBar);
  flashBar(healthBar);
  animatePet("bounce");
  animateButton(feedBtn);
  showMessage("Yum! Your pet enjoyed a tasty snack!");
  updateDisplay();
}

// --- Action: Play with the pet ---
function playWithPet() {
  changeStat("happiness", 15);
  changeStat("energy", -15);
  changeStat("hunger", 10);
  changeStat("curiosity", 5);
  changeStat("health", 3);

  flashBar(happinessBar);
  flashBar(energyBar);
  animatePet("bounce");
  animateButton(playBtn);
  showMessage("Your pet is super happy after playing!");
  updateDisplay();
}

// --- Action: Let the pet sleep ---
function sleepPet() {
  changeStat("energy", 25);
  changeStat("happiness", 5);
  changeStat("hunger", 8);
  changeStat("health", 8);

  flashBar(energyBar);
  flashBar(healthBar);
  animatePet("shake");
  animateButton(sleepBtn);
  showMessage("Your pet is getting sleepy. Zzz...");
  updateDisplay();
}

// --- Action: Teach a trick ---
function teachTrick() {
  changeStat("curiosity", 20);
  changeStat("happiness", 10);
  changeStat("energy", -10);

  flashBar(curiosityBar);
  flashBar(happinessBar);
  animatePet("bounce");
  animateButton(trickBtn);
  showMessage("Your pet learned a new trick!");
  updateDisplay();
}

// --- Action: Pet gets sick ---
function getSick() {
  changeStat("health", -30);
  changeStat("happiness", -15);
  changeStat("energy", -10);

  flashBar(healthBar);
  flashBar(happinessBar);
  animatePet("shake");
  animateButton(sickBtn);
  showMessage("Your pet is sick. Time for rest and snacks!");
  updateDisplay();
}

// --- Action: Random funny event ---
const randomEvents = [
  {
    message: "Your pet found a glowing mushroom! ✨",
    changes: { happiness: 10, curiosity: 15, energy: -5 },
  },
  {
    message: "Your pet chased a robot butterfly! 🤖🦋",
    changes: { happiness: 12, energy: -12, hunger: 8 },
  },
  {
    message: "Your pet tried to code in JavaScript! 💻",
    changes: { curiosity: 20, happiness: 8, energy: -8 },
  },
  {
    message: "Your pet discovered a hidden dance floor! 💃",
    changes: { happiness: 18, energy: -10 },
  },
  {
    message: "Your pet befriended a pixel cloud! ☁️",
    changes: { happiness: 10, curiosity: 10 },
  },
  {
    message: "Your pet ate too many virtual cookies! 🍪",
    changes: { hunger: -15, happiness: 5, energy: -5 },
  },
  {
    message: "Your pet had a dream about flying tacos! 🌮",
    changes: { happiness: 8, curiosity: 12, energy: 10 },
  },
];

function randomEvent() {
  // Pick a random event from the list
  const event = randomEvents[Math.floor(Math.random() * randomEvents.length)];

  // Apply each stat change from the event
  for (const stat in event.changes) {
    changeStat(stat, event.changes[stat]);
  }

  animatePet("shake");
  animateButton(randomBtn);
  showMessage(event.message);
  updateDisplay();
}

// --- Connect buttons to their actions ---
feedBtn.addEventListener("click", feedPet);
playBtn.addEventListener("click", playWithPet);
sleepBtn.addEventListener("click", sleepPet);
trickBtn.addEventListener("click", teachTrick);
sickBtn.addEventListener("click", getSick);
randomBtn.addEventListener("click", randomEvent);

// --- Start the app with the first display update ---
updateDisplay();
