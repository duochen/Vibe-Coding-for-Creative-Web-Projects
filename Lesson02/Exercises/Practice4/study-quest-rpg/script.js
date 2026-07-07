// ============================================
// Study Quest RPG — JavaScript
// ============================================
// HOW THE XP & LEVEL SYSTEM WORKS:
//
// 1. Complete a quest → you earn XP and coins, but lose energy.
// 2. XP fills up a progress bar. When XP reaches the goal, you LEVEL UP!
// 3. On level up: your level increases, leftover XP carries over, and
//    energy is fully restored. Your rank title also changes.
// 4. Each level needs MORE XP than the last (level × 100).
//    Example: Level 1 → 2 needs 100 XP. Level 2 → 3 needs 200 XP.
//
// TIP: Change the numbers below to customize your game!

// --- Player character stats ---
// Edit "name" to use your own character name!
const player = {
  name: "Alex the Adventurer",
  level: 1,
  xp: 0,
  coins: 0,
  energy: 100,
  maxEnergy: 100,
};

// How much XP is needed to reach the NEXT level.
// Formula: level × 100 (Level 1 needs 100 XP, Level 2 needs 200 XP, etc.)
// Change the "100" to make leveling faster or slower.
function xpNeededForLevel(level) {
  return level * 100;
}

// Minimum energy required to start a quest
const MIN_ENERGY_TO_QUEST = 15;

// Energy restored when resting
const REST_ENERGY = 30;

// Energy fully restored on level up
const LEVEL_UP_ENERGY = 100;

// --- Rank titles based on player level ---
const RANKS = [
  { minLevel: 1, title: "Beginner Scholar" },
  { minLevel: 3, title: "Focus Knight" },
  { minLevel: 5, title: "Homework Hero" },
  { minLevel: 7, title: "Exam Master" },
  { minLevel: 9, title: "Knowledge Legend" },
];

// Get the rank title for the current level
function getRankTitle(level) {
  let rank = RANKS[0].title;
  for (let i = 0; i < RANKS.length; i++) {
    if (level >= RANKS[i].minLevel) {
      rank = RANKS[i].title;
    }
  }
  return rank;
}

// --- Study quests the player can complete ---
const quests = [
  {
    id: "read",
    icon: "📖",
    title: "Read for 20 minutes",
    xp: 25,
    coins: 10,
    energyCost: 15,
  },
  {
    id: "math",
    icon: "🔢",
    title: "Finish math homework",
    xp: 40,
    coins: 20,
    energyCost: 25,
  },
  {
    id: "vocab",
    icon: "📝",
    title: "Review vocabulary",
    xp: 20,
    coins: 8,
    energyCost: 12,
  },
  {
    id: "code",
    icon: "💻",
    title: "Practice coding",
    xp: 35,
    coins: 18,
    energyCost: 20,
  },
  {
    id: "quiz",
    icon: "🎯",
    title: "Study for quiz",
    xp: 45,
    coins: 25,
    energyCost: 30,
  },
  {
    id: "help",
    icon: "🤝",
    title: "Help a classmate",
    xp: 30,
    coins: 15,
    energyCost: 18,
  },
];

// Track which quests have been completed (resets on page reload)
const completedQuests = {};

// --- Daily challenges (one is picked randomly on page load) ---
const dailyChallenges = [
  {
    title: "Complete 3 quests today",
    description: "Finish any 3 study quests for a bonus!",
    xp: 50,
    coins: 30,
    energyCost: 0,
    type: "complete3",
  },
  {
    title: "Study before noon",
    description: "Start your day with a learning quest!",
    xp: 40,
    coins: 25,
    energyCost: 10,
    type: "morning",
  },
  {
    title: "Master of Focus",
    description: "Complete the hardest quest: Study for quiz!",
    xp: 60,
    coins: 40,
    energyCost: 30,
    type: "quizQuest",
  },
  {
    title: "Reading Champion",
    description: "Complete the reading quest today!",
    xp: 35,
    coins: 20,
    energyCost: 15,
    type: "readQuest",
  },
  {
    title: "Code Warrior",
    description: "Practice coding and earn bonus rewards!",
    xp: 45,
    coins: 30,
    energyCost: 20,
    type: "codeQuest",
  },
];

let dailyChallenge = null;
let dailyCompleted = false;
let questsCompletedToday = 0;

// --- HTML elements ---
const levelValue = document.getElementById("levelValue");
const xpValue = document.getElementById("xpValue");
const coinsValue = document.getElementById("coinsValue");
const energyValue = document.getElementById("energyValue");
const energyText = document.getElementById("energyText");
const energyBar = document.getElementById("energyBar");
const xpText = document.getElementById("xpText");
const xpBar = document.getElementById("xpBar");
const charRank = document.getElementById("charRank");
const charName = document.getElementById("charName");
const questList = document.getElementById("questList");
const restBtn = document.getElementById("restBtn");
const toast = document.getElementById("toast");
const levelUpOverlay = document.getElementById("levelUpOverlay");
const levelUpNumber = document.getElementById("levelUpNumber");
const levelUpRank = document.getElementById("levelUpRank");
const dailyTitle = document.getElementById("dailyTitle");
const dailyReward = document.getElementById("dailyReward");
const dailyBtn = document.getElementById("dailyBtn");
const characterPanel = document.querySelector(".character-panel");

// Keep energy between 0 and maxEnergy
function clampEnergy(value) {
  return Math.max(0, Math.min(player.maxEnergy, value));
}

// Show a temporary message at the bottom of the screen
function showToast(message, type) {
  toast.textContent = message;
  toast.className = "toast " + (type || "");
  toast.classList.remove("hidden");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(function () {
    toast.classList.add("hidden");
  }, 3000);
}

// Add XP and check if the player should level up.
// The "while" loop handles earning lots of XP at once (e.g. multiple level-ups).
function addXP(amount) {
  player.xp += amount;

  while (player.xp >= xpNeededForLevel(player.level)) {
    player.xp -= xpNeededForLevel(player.level);
    levelUp();
  }

  updateDisplay();
}

// Level up: increase level, restore energy, show celebration
function levelUp() {
  player.level += 1;
  player.energy = LEVEL_UP_ENERGY;

  // Show the level-up animation overlay
  levelUpNumber.textContent = player.level;
  levelUpRank.textContent = getRankTitle(player.level);
  levelUpOverlay.classList.remove("hidden");

  // Hide overlay after 2.5 seconds
  setTimeout(function () {
    levelUpOverlay.classList.add("hidden");
  }, 2500);

  showToast("🎉 Level Up! You are now " + getRankTitle(player.level) + "!", "success");
}

// Update all stats on the screen
function updateDisplay() {
  levelValue.textContent = player.level;
  xpValue.textContent = player.xp;
  coinsValue.textContent = player.coins;
  energyValue.textContent = player.energy;
  charName.textContent = player.name;
  charRank.textContent = getRankTitle(player.level);

  const xpNeeded = xpNeededForLevel(player.level);
  xpText.textContent = player.xp + " / " + xpNeeded;
  xpBar.style.width = (player.xp / xpNeeded) * 100 + "%";

  energyText.textContent = player.energy + " / " + player.maxEnergy;
  energyBar.style.width = (player.energy / player.maxEnergy) * 100 + "%";

  const isLowEnergy = player.energy < MIN_ENERGY_TO_QUEST;
  if (isLowEnergy) {
    characterPanel.classList.add("low-energy");
    energyValue.classList.add("low");
    energyBar.classList.add("low");
  } else {
    characterPanel.classList.remove("low-energy");
    energyValue.classList.remove("low");
    energyBar.classList.remove("low");
  }
}

// Build the quest cards in the HTML
function renderQuests() {
  questList.innerHTML = "";

  quests.forEach(function (quest) {
    const li = document.createElement("li");
    li.className = "quest-item";
    if (completedQuests[quest.id]) {
      li.classList.add("completed");
    }

    li.innerHTML =
      '<span class="quest-icon">' + quest.icon + "</span>" +
      '<p class="quest-title">' + quest.title + "</p>" +
      '<p class="quest-rewards">+' + quest.xp + " XP · +" + quest.coins +
      " coins · -" + quest.energyCost + " energy</p>" +
      '<button class="quest-btn" data-id="' + quest.id + '">' +
      (completedQuests[quest.id] ? "✓ Completed" : "Complete Quest") +
      "</button>";

    const btn = li.querySelector(".quest-btn");
    btn.disabled = !!completedQuests[quest.id];
    btn.addEventListener("click", function () {
      completeQuest(quest.id);
    });

    questList.appendChild(li);
  });
}

// Complete a study quest
function completeQuest(questId) {
  const quest = quests.find(function (q) {
    return q.id === questId;
  });

  if (!quest || completedQuests[questId]) return;

  // Block quest if energy is too low
  if (player.energy < MIN_ENERGY_TO_QUEST) {
    showToast("😴 Too tired! Rest to restore energy first.", "warning");
    return;
  }

  if (player.energy < quest.energyCost) {
    showToast("⚡ Not enough energy for this quest. Try resting!", "warning");
    return;
  }

  // Apply rewards and costs
  player.energy = clampEnergy(player.energy - quest.energyCost);
  player.coins += quest.coins;
  completedQuests[questId] = true;
  questsCompletedToday += 1;

  addXP(quest.xp);
  renderQuests();

  showToast(
    "🏆 Quest complete! +" + quest.xp + " XP, +" + quest.coins + " coins!",
    "success"
  );
}

// Rest button — restore energy
function rest() {
  player.energy = clampEnergy(player.energy + REST_ENERGY);
  updateDisplay();
  showToast("🛏️ You rested and recovered " + REST_ENERGY + " energy!", "success");
}

// Pick a random daily challenge when the page loads
function setupDailyChallenge() {
  dailyChallenge =
    dailyChallenges[Math.floor(Math.random() * dailyChallenges.length)];

  dailyTitle.textContent = dailyChallenge.title;
  dailyReward.textContent =
    dailyChallenge.description +
    " (+" + dailyChallenge.xp + " XP, +" + dailyChallenge.coins + " coins)";

  dailyBtn.addEventListener("click", completeDailyChallenge);
}

// Complete the daily challenge (with simple validation)
function completeDailyChallenge() {
  if (dailyCompleted) return;

  if (player.energy < MIN_ENERGY_TO_QUEST && dailyChallenge.energyCost > 0) {
    showToast("😴 Too tired for the daily challenge. Rest first!", "warning");
    return;
  }

  // Check challenge-specific requirements
  let canComplete = false;

  switch (dailyChallenge.type) {
    case "complete3":
      canComplete = questsCompletedToday >= 3;
      if (!canComplete) {
        showToast("Complete 3 quests first! (" + questsCompletedToday + "/3)", "warning");
      }
      break;
    case "morning":
      canComplete = new Date().getHours() < 12;
      if (!canComplete) {
        showToast("This challenge is for morning studiers! Try again tomorrow.", "warning");
      }
      break;
    case "quizQuest":
      canComplete = completedQuests["quiz"];
      if (!canComplete) {
        showToast("Complete the 'Study for quiz' quest first!", "warning");
      }
      break;
    case "readQuest":
      canComplete = completedQuests["read"];
      if (!canComplete) {
        showToast("Complete the reading quest first!", "warning");
      }
      break;
    case "codeQuest":
      canComplete = completedQuests["code"];
      if (!canComplete) {
        showToast("Complete the coding quest first!", "warning");
      }
      break;
    default:
      canComplete = true;
  }

  if (!canComplete) return;

  if (dailyChallenge.energyCost > 0) {
    player.energy = clampEnergy(player.energy - dailyChallenge.energyCost);
  }

  player.coins += dailyChallenge.coins;
  dailyCompleted = true;
  dailyBtn.disabled = true;
  dailyBtn.textContent = "✓ Daily Challenge Complete!";
  dailyBtn.classList.add("completed");

  addXP(dailyChallenge.xp);
  showToast("🌟 Daily challenge complete! Bonus rewards earned!", "success");
}

// --- Start the game ---
restBtn.addEventListener("click", rest);
setupDailyChallenge();
renderQuests();
updateDisplay();
