// ============================================
// Space Mission Control Dashboard — JavaScript
// ============================================

// --- Mission data (all percentages are 0–100 unless noted) ---
const mission = {
  fuel: 100,
  oxygen: 100,
  shipHealth: 100,
  distanceToMars: 1000, // in km — reaches Mars at 0
  crewMorale: 80,
  launched: false,       // true after Launch Rocket is clicked
  missionComplete: false // true when distance reaches 0
};

// Starting distance used to calculate the distance progress bar
const STARTING_DISTANCE = 1000;

// Warn the commander when any critical stat drops below this number
const CRITICAL_LEVEL = 20;

// Maximum log entries to keep on screen
const MAX_LOG_ENTRIES = 12;

// --- HTML elements ---
const fuelValue = document.getElementById("fuelValue");
const oxygenValue = document.getElementById("oxygenValue");
const healthValue = document.getElementById("healthValue");
const distanceValue = document.getElementById("distanceValue");
const moraleValue = document.getElementById("moraleValue");

const fuelBar = document.getElementById("fuelBar");
const oxygenBar = document.getElementById("oxygenBar");
const healthBar = document.getElementById("healthBar");
const distanceBar = document.getElementById("distanceBar");
const moraleBar = document.getElementById("moraleBar");

const alertBanner = document.getElementById("alertBanner");
const alertText = document.getElementById("alertText");
const successBanner = document.getElementById("successBanner");
const successText = document.getElementById("successText");
const missionPhase = document.getElementById("missionPhase");
const missionLog = document.getElementById("missionLog");

const launchBtn = document.getElementById("launchBtn");
const boostBtn = document.getElementById("boostBtn");
const repairBtn = document.getElementById("repairBtn");
const saveOxygenBtn = document.getElementById("saveOxygenBtn");
const messageBtn = document.getElementById("messageBtn");
const randomBtn = document.getElementById("randomBtn");

// Keep a percentage stat between 0 and 100
function clampPercent(value) {
  return Math.max(0, Math.min(100, value));
}

// Keep distance from going below 0
function clampDistance(value) {
  return Math.max(0, value);
}

// Change a percentage stat safely
function changeStat(statName, amount) {
  mission[statName] = clampPercent(mission[statName] + amount);
}

// Add a timestamped entry to the mission log
function addLogEntry(text, type) {
  const entry = document.createElement("li");
  entry.className = "log-entry" + (type ? " " + type : "");

  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  entry.textContent = "[" + time + "] " + text;

  // Add newest entry at the top
  missionLog.insertBefore(entry, missionLog.firstChild);

  // Remove old entries if the list gets too long
  while (missionLog.children.length > MAX_LOG_ENTRIES) {
    missionLog.removeChild(missionLog.lastChild);
  }
}

// Update all numbers and progress bars on the dashboard
function updateDisplay() {
  fuelValue.textContent = Math.round(mission.fuel);
  oxygenValue.textContent = Math.round(mission.oxygen);
  healthValue.textContent = Math.round(mission.shipHealth);
  distanceValue.textContent = Math.round(mission.distanceToMars);
  moraleValue.textContent = Math.round(mission.crewMorale);

  fuelBar.style.width = mission.fuel + "%";
  oxygenBar.style.width = mission.oxygen + "%";
  healthBar.style.width = mission.shipHealth + "%";
  moraleBar.style.width = mission.crewMorale + "%";

  // Distance bar shows progress toward Mars (full = far, empty = arrived)
  const distanceProgress = (mission.distanceToMars / STARTING_DISTANCE) * 100;
  distanceBar.style.width = distanceProgress + "%";

  // Mark critical bars in red
  setCriticalStyle(fuelBar, mission.fuel);
  setCriticalStyle(oxygenBar, mission.oxygen);
  setCriticalStyle(healthBar, mission.shipHealth);

  checkWarnings();
  checkMissionComplete();
  updateButtonStates();
}

// Add or remove the "critical" style on a progress bar
function setCriticalStyle(barElement, value) {
  if (value <= CRITICAL_LEVEL) {
    barElement.classList.add("critical");
  } else {
    barElement.classList.remove("critical");
  }
}

// Show warning banner if fuel, oxygen, or health is too low
function checkWarnings() {
  const warnings = [];

  if (mission.fuel <= CRITICAL_LEVEL) {
    warnings.push("Fuel critically low!");
  }
  if (mission.oxygen <= CRITICAL_LEVEL) {
    warnings.push("Oxygen critically low!");
  }
  if (mission.shipHealth <= CRITICAL_LEVEL) {
    warnings.push("Ship health critical!");
  }

  if (warnings.length > 0 && !mission.missionComplete) {
    alertBanner.classList.remove("hidden");
    alertText.textContent = warnings.join(" ");
  } else {
    alertBanner.classList.add("hidden");
  }
}

// Check if the crew has reached Mars
function checkMissionComplete() {
  if (mission.distanceToMars <= 0 && mission.launched && !mission.missionComplete) {
    mission.missionComplete = true;
    successBanner.classList.remove("hidden");
    successText.textContent = "SUCCESS! Your crew has landed on Mars! 🚀🔴";
    missionPhase.textContent = "Status: MISSION COMPLETE — Welcome to Mars, Commander!";
    addLogEntry("🎉 MISSION SUCCESS — Crew has reached Mars!", "success");
  }
}

// Enable or disable buttons based on mission state
function updateButtonStates() {
  const disabled = mission.missionComplete;

  boostBtn.disabled = disabled || !mission.launched;
  repairBtn.disabled = disabled || !mission.launched;
  saveOxygenBtn.disabled = disabled || !mission.launched;
  messageBtn.disabled = disabled || !mission.launched;
  randomBtn.disabled = disabled || !mission.launched;

  if (mission.launched) {
    launchBtn.disabled = true;
    launchBtn.textContent = "🚀 Launched!";
  }
}

// Stop actions if mission is already complete
function canAct() {
  return mission.launched && !mission.missionComplete;
}

// ============================================
// COMMAND ACTIONS
// ============================================

// Launch Rocket — starts the mission
function launchRocket() {
  if (mission.launched) return;

  mission.launched = true;
  changeStat("fuel", -5);
  changeStat("crewMorale", 10);

  missionPhase.textContent = "Status: IN FLIGHT — En route to Mars.";
  addLogEntry("🚀 Rocket launched! Mission to Mars has begun!", "success");
  updateDisplay();
}

// Boost Speed — burns fuel to travel faster
function boostSpeed() {
  if (!canAct()) return;

  changeStat("fuel", -15);
  mission.distanceToMars = clampDistance(mission.distanceToMars - 120);
  changeStat("shipHealth", -3);
  changeStat("crewMorale", 5);

  addLogEntry("⚡ Speed boost engaged! Closing distance to Mars.");
  updateDisplay();
}

// Repair Ship — fixes damage but tires the crew
function repairShip() {
  if (!canAct()) return;

  changeStat("shipHealth", 20);
  changeStat("crewMorale", -8);
  changeStat("fuel", -5);

  addLogEntry("🔧 Repair crew fixed hull damage. Morale dipped from hard work.");
  updateDisplay();
}

// Save Oxygen — conserve air supply
function saveOxygen() {
  if (!canAct()) return;

  changeStat("oxygen", 15);
  changeStat("crewMorale", -10);

  addLogEntry("🫁 Oxygen conservation mode activated. Crew is uncomfortable.");
  updateDisplay();
}

// Send Message to Earth — boosts morale
function sendMessage() {
  if (!canAct()) return;

  changeStat("crewMorale", 12);
  changeStat("fuel", -2);

  addLogEntry("📡 Message sent to Earth! Crew morale improved.");
  updateDisplay();
}

// Random Space Event — surprise events with different effects
const spaceEvents = [
  {
    name: "Meteor shower",
    log: "☄️ Meteor shower detected! Shields activated — minor hull damage.",
    effects: function () {
      changeStat("shipHealth", -12);
      changeStat("fuel", -5);
      changeStat("crewMorale", -5);
    },
  },
  {
    name: "Alien signal detected",
    log: "👽 Unknown signal detected! Crew morale surges with excitement!",
    effects: function () {
      changeStat("crewMorale", 15);
      changeStat("fuel", -3);
    },
  },
  {
    name: "Solar storm",
    log: "🌞 Solar storm hit the ship! Systems strained, oxygen leaking.",
    effects: function () {
      changeStat("shipHealth", -10);
      changeStat("oxygen", -15);
      changeStat("crewMorale", -8);
    },
  },
  {
    name: "Crew discovers space ice cream",
    log: "🍦 Crew found space ice cream in storage! Morale skyrockets!",
    effects: function () {
      changeStat("crewMorale", 20);
      changeStat("oxygen", -3);
    },
  },
  {
    name: "Fuel leak patched",
    log: "⛽ Engineer patched a tiny fuel leak. Crisis avoided!",
    effects: function () {
      changeStat("fuel", 8);
      changeStat("crewMorale", 5);
    },
  },
  {
    name: "Beautiful nebula sighting",
    log: "🌌 Crew spotted a stunning nebula! Science and morale boost!",
    effects: function () {
      changeStat("crewMorale", 10);
      mission.distanceToMars = clampDistance(mission.distanceToMars - 30);
    },
  },
];

function randomSpaceEvent() {
  if (!canAct()) return;

  const event = spaceEvents[Math.floor(Math.random() * spaceEvents.length)];
  event.effects();

  addLogEntry(event.log, "event");
  updateDisplay();
}

// ============================================
// Connect buttons to actions
// ============================================
launchBtn.addEventListener("click", launchRocket);
boostBtn.addEventListener("click", boostSpeed);
repairBtn.addEventListener("click", repairShip);
saveOxygenBtn.addEventListener("click", saveOxygen);
messageBtn.addEventListener("click", sendMessage);
randomBtn.addEventListener("click", randomSpaceEvent);

// --- Initialize the dashboard ---
updateDisplay();
