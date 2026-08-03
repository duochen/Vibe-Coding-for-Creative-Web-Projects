const missions = {
  low: [
    ["🌬️", "Orbit Breathing", "Breathe in for 4 counts, hold for 2, and breathe out for 6. Repeat slowly."],
    ["👀", "Window Explorer", "Look away from the screen. Find five things you can see and three sounds you can hear."],
    ["🧘", "Zero-Gravity Reset", "Relax your shoulders, unclench your jaw, and take five calm breaths."]
  ],
  medium: [
    ["🕺", "Moonwalk Minute", "Stand up and move, dance, or march in place. Make it as silly as you like."],
    ["✏️", "Alien Doodle", "Draw an alien using only circles, triangles, and rectangles."],
    ["🤸", "Astronaut Stretch", "Reach high, touch your toes, roll your shoulders, and stretch each arm."]
  ],
  high: [
    ["🚀", "Rocket Boost", "Do jumping jacks, run in place, or invent a safe movement combo."],
    ["🧠", "Rapid-Fire Riddle", "Name ten foods, animals, or places before the timer ends."],
    ["🎭", "Space Character", "Invent a space hero name and perform their victory pose three times."]
  ]
};

let selectedEnergy = "low";
let selectedMinutes = 2;
let remainingSeconds = 120;
let timerId = null;
let currentMission = null;
let progress = JSON.parse(localStorage.getItem("cosmicProgress")) || { xp: 0, count: 0 };

const energyButtons = document.querySelectorAll(".energy-button");
const minutes = document.querySelector("#minutes");
const minuteValue = document.querySelector("#minuteValue");
const resultCard = document.querySelector("#resultCard");
const timerDisplay = document.querySelector("#timerDisplay");

energyButtons.forEach(button => button.addEventListener("click", () => {
  energyButtons.forEach(item => item.classList.remove("selected"));
  button.classList.add("selected");
  selectedEnergy = button.dataset.energy;
}));

minutes.addEventListener("input", () => {
  selectedMinutes = Number(minutes.value);
  minuteValue.textContent = selectedMinutes;
});

document.querySelector("#launchButton").addEventListener("click", () => {
  const choices = missions[selectedEnergy];
  currentMission = choices[Math.floor(Math.random() * choices.length)];
  document.querySelector("#missionEmoji").textContent = currentMission[0];
  document.querySelector("#missionTitle").textContent = currentMission[1];
  document.querySelector("#missionText").textContent = currentMission[2];
  remainingSeconds = selectedMinutes * 60;
  stopTimer();
  updateTimerDisplay();
  document.querySelector("#startTimerButton").textContent = "Start Timer";
  resultCard.classList.remove("hidden");
  resultCard.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelector("#startTimerButton").addEventListener("click", () => {
  if (timerId) { stopTimer(); showToast("Timer paused"); return; }
  if (remainingSeconds === 0) remainingSeconds = selectedMinutes * 60;
  document.querySelector("#startTimerButton").textContent = "Pause Timer";
  timerId = setInterval(() => {
    remainingSeconds--;
    updateTimerDisplay();
    if (remainingSeconds <= 0) {
      stopTimer();
      showToast("Mission timer complete!");
    }
  }, 1000);
});

document.querySelector("#completeButton").addEventListener("click", () => {
  if (!currentMission) return;
  progress.xp += 10;
  progress.count += 1;
  localStorage.setItem("cosmicProgress", JSON.stringify(progress));
  updateStats();
  confetti();
  showToast("+10 XP! Mission logged.");
  currentMission = null;
});

document.querySelector("#themeButton").addEventListener("click", event => {
  document.body.classList.toggle("sunrise");
  event.currentTarget.textContent = document.body.classList.contains("sunrise") ? "🌌" : "🌙";
});

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
  document.querySelector("#startTimerButton").textContent = remainingSeconds === 0 ? "Restart Timer" : "Start Timer";
}
function updateTimerDisplay() {
  const mins = Math.floor(remainingSeconds / 60).toString().padStart(2,"0");
  const secs = (remainingSeconds % 60).toString().padStart(2,"0");
  timerDisplay.textContent = `${mins}:${secs}`;
}
function updateStats() {
  document.querySelector("#xpValue").textContent = progress.xp;
  document.querySelector("#missionCount").textContent = progress.count;
  document.querySelector("#rankValue").textContent = progress.xp >= 100 ? "Captain" : progress.xp >= 50 ? "Pilot" : "Cadet";
}
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}
function confetti() {
  for (let i=0; i<35; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random()*100}vw`;
    piece.style.background = `hsl(${Math.random()*360} 90% 65%)`;
    piece.style.animationDelay = `${Math.random()*.4}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 2300);
  }
}
updateStats();
updateTimerDisplay();
