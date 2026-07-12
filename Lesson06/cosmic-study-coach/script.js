/* ============================================
   Cosmic Study Coach — JavaScript
   Smart study quest builder (no external AI)
   Does NOT collect or save personal information
   ============================================ */

// At least six motivational messages — one is chosen at random each launch
const motivationalMessages = [
  "Every small step counts — you are building real skills!",
  "Stars form slowly. Your understanding can too. Keep going!",
  "You showed up today. That already makes you a cosmic champion.",
  "Mistakes are just practice in disguise. Launch again when ready!",
  "Focus like an astronaut: one task, one breath, one win.",
  "Your future self will thank you for this study mission.",
  "Courage + curiosity = unstoppable learning fuel.",
  "You do not need to be perfect. You just need to begin."
];

// Wait until the HTML is fully loaded before running our code
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("mission-form");
  const resultArea = document.getElementById("result-area");
  const subjectInput = document.getElementById("subject");
  const difficultySelect = document.getElementById("difficulty");
  const studyTimeSelect = document.getElementById("study-time");
  const energySelect = document.getElementById("energy");
  const launchBtn = document.getElementById("launch-btn");

  // Safety check: stop if something is missing
  if (!form || !resultArea || !subjectInput) {
    console.warn("Cosmic Study Coach: required elements not found.");
    return;
  }

  // When the student clicks "Launch My Study Quest"...
  form.addEventListener("submit", function (event) {
    // Stop the browser from refreshing the page
    event.preventDefault();

    // =========================================
    // 1) READING USER INPUT
    // =========================================
    // .trim() removes extra spaces at the start and end
    const subject = subjectInput.value.trim();
    const difficulty = difficultySelect.value; // "easy", "medium", or "hard"
    const studyTime = studyTimeSelect.value; // "15", "30", "45", or "60"
    const energy = energySelect.value; // "low", "medium", or "high"

    // =========================================
    // 2) VALIDATION
    // =========================================
    // If the subject box is blank, show a friendly error and stop here
    if (subject === "") {
      showError("Please enter a school subject so we can chart your mission!");
      subjectInput.focus();
      return;
    }

    // Disable the button while we "scan" so the user does not click twice
    launchBtn.disabled = true;

    // =========================================
    // 3) SHOW SCANNING MESSAGE, THEN WAIT ~1.2s
    // =========================================
    showScanningMessage();

    setTimeout(function () {
      // =========================================
      // 4) DECISION RULES → build the quest
      // =========================================
      const quest = buildStudyQuest(subject, difficulty, studyTime, energy);

      // =========================================
      // 5) DISPLAYING THE RESULT
      // =========================================
      displayQuest(quest);
      launchBtn.disabled = false;
    }, 1200);
  });

  // "Try Another Quest" button is created later, so we listen on resultArea
  resultArea.addEventListener("click", function (event) {
    if (event.target.id === "try-again-btn") {
      resultArea.innerHTML = "";
      resultArea.className = "result-area";
      subjectInput.focus();
      subjectInput.select();
    }
  });
});

/* -------------------------------------------
   Helper: show a friendly error message
   ------------------------------------------- */
function showError(message) {
  const resultArea = document.getElementById("result-area");
  resultArea.className = "result-area has-content";
  resultArea.innerHTML =
    '<div class="result-message error-message" role="alert">' +
    message +
    "</div>";
}

/* -------------------------------------------
   Helper: show the animated scanning message
   ------------------------------------------- */
function showScanningMessage() {
  const resultArea = document.getElementById("result-area");
  resultArea.className = "result-area has-content";
  resultArea.innerHTML =
    '<div class="result-message scanning-message">' +
    '<span class="scan-dots" aria-hidden="true"></span>' +
    "Scanning the learning galaxy..." +
    "</div>";
}

/* ===========================================
   DECISION RULES: build a personalized quest
   =========================================== */
function buildStudyQuest(subject, difficulty, studyTime, energy) {
  // --- TIME rule: how many tasks? ---
  let taskCount = 3;

  if (studyTime === "15") {
    taskCount = 2; // 2 short tasks
  } else if (studyTime === "30") {
    taskCount = 3; // 3 tasks
  } else if (studyTime === "45") {
    taskCount = 4; // 4 tasks
  } else if (studyTime === "60") {
    taskCount = 5; // 5 tasks including a final review
  }

  // Build the numbered study plan using if/else rules
  const tasks = createTasks(subject, difficulty, energy, taskCount, studyTime);

  // Mission title uses the subject
  const missionTitle = "Mission: Master " + subject;

  // Personalized explanation
  const explanation = buildExplanation(subject, difficulty, studyTime, energy);

  // Pick one motivational message at random
  const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
  const motivation = motivationalMessages[randomIndex];

  return {
    title: missionTitle,
    tasks: tasks,
    explanation: explanation,
    motivation: motivation
  };
}

/* -------------------------------------------
   Create the list of study tasks
   Uses DIFFICULTY, ENERGY, and TIME rules
   ------------------------------------------- */
function createTasks(subject, difficulty, energy, taskCount, studyTime) {
  const tasks = [];

  // --- ENERGY rule: choose work-block style ---
  let blockLabel = "about 8 minutes";
  let toneStart = "";
  let toneEnd = "";

  if (energy === "low") {
    // Low: short 5-minute work blocks + encouraging language
    blockLabel = "about 5 minutes";
    toneStart = "Gently start: ";
    toneEnd = " You’ve got this!";
  } else if (energy === "medium") {
    // Medium: balanced work blocks
    blockLabel = "a balanced block of time";
    toneStart = "";
    toneEnd = "";
  } else if (energy === "high") {
    // High: still balanced blocks (bonus added later)
    blockLabel = "a focused block of time";
    toneStart = "";
    toneEnd = "";
  }

  // --- DIFFICULTY rule: shape the mission style ---
  // We always prepare up to 5 "base" ideas, then keep only taskCount of them.
  // For 60 minutes, the last slot is reserved for a final review.

  let slotsToFill = taskCount;
  if (studyTime === "60") {
    slotsToFill = taskCount - 1; // leave the last task for final review
  }

  if (difficulty === "easy") {
    // Easy: confidence, review, and one small challenge
    const easyIdeas = [
      toneStart +
        "Warm-up: review your " +
        subject +
        " notes for " +
        blockLabel +
        " to build confidence." +
        toneEnd,
      "Explain one " + subject + " idea out loud in simple words.",
      "Try one small challenge question in " + subject + ".",
      "List 3 things you already understand about " + subject + ".",
      "Skim one example and star anything that still feels fuzzy."
    ];
    for (let i = 0; i < slotsToFill; i++) {
      tasks.push(easyIdeas[i]);
    }
  } else if (difficulty === "medium") {
    // Medium: combine review and practice
    const mediumIdeas = [
      toneStart +
        "Review key " +
        subject +
        " ideas for " +
        blockLabel +
        "." +
        toneEnd,
      "Practice " + subject + " with mixed problems for " + blockLabel + ".",
      "Check your work and fix one mistake carefully.",
      "Do a second practice round on the trickiest " + subject + " question.",
      "Write a short summary of what you practiced in " + subject + "."
    ];
    for (let i = 0; i < slotsToFill; i++) {
      tasks.push(mediumIdeas[i]);
    }
  } else if (difficulty === "hard") {
    // Hard: concept review → guided practice → challenge
    const hardIdeas = [
      toneStart +
        "Concept review: map the big ideas in " +
        subject +
        " for " +
        blockLabel +
        "." +
        toneEnd,
      "Guided practice: work through " +
        subject +
        " examples step by step.",
      "Challenge: try a tougher " + subject + " problem without peeking first.",
      "Debrief: write what made that hard problem tricky.",
      "Retry one hard step with a clearer strategy."
    ];
    for (let i = 0; i < slotsToFill; i++) {
      tasks.push(hardIdeas[i]);
    }
  }

  // --- ENERGY: Low → include a break ---
  if (energy === "low") {
    if (tasks.length >= 3) {
      // Put a break in the middle of longer plans
      const mid = Math.floor(tasks.length / 2);
      tasks[mid] =
        "Take a short break (2–3 minutes). Stretch, sip water, then return kindly.";
    } else if (tasks.length === 2) {
      // Keep both short tasks; add a micro-break between them
      tasks[0] = tasks[0] + " Then take a 1–2 minute micro-break before the next step.";
    } else if (tasks.length === 1) {
      tasks[0] =
        tasks[0] + " (Remember: pause anytime you need a tiny reset.)";
    }
  }

  // --- ENERGY: High → include a bonus challenge ---
  if (energy === "high") {
    const bonus =
      "Bonus challenge: invent or find one extra-hard " +
      subject +
      " question and give it your best shot!";

    if (studyTime === "60") {
      // Keep room for final review; replace the last non-review task
      if (tasks.length > 0) {
        tasks[tasks.length - 1] = bonus;
      } else {
        tasks.push(bonus);
      }
    } else if (tasks.length > 0) {
      // Swap the last task for the bonus so the count stays correct
      tasks[tasks.length - 1] = bonus;
    }
  }

  // --- TIME: 60 minutes → final review as the last task ---
  if (studyTime === "60") {
    tasks.push(
      "Final review: skim your " +
        subject +
        " notes and star your top 3 takeaways from this mission."
    );
  }

  return tasks;
}

/* -------------------------------------------
   Personalized explanation of the plan
   ------------------------------------------- */
function buildExplanation(subject, difficulty, studyTime, energy) {
  let difficultyText = "";
  let energyText = "";
  let timeText = "";

  if (difficulty === "easy") {
    difficultyText =
      "Because you chose Easy, this quest focuses on confidence, review, and one small challenge.";
  } else if (difficulty === "medium") {
    difficultyText =
      "Because you chose Medium, this quest combines review and practice.";
  } else if (difficulty === "hard") {
    difficultyText =
      "Because you chose Hard, you begin with concept review, then guided practice, then a challenge.";
  }

  if (energy === "low") {
    energyText =
      " Your energy is Low, so the plan uses short 5-minute work blocks, includes a break, and uses encouraging language.";
  } else if (energy === "medium") {
    energyText =
      " Your energy is Medium, so the plan uses balanced work blocks.";
  } else if (energy === "high") {
    energyText =
      " Your energy is High, so the plan includes a bonus challenge.";
  }

  if (studyTime === "15") {
    timeText = " With 15 minutes available, you get 2 short tasks.";
  } else if (studyTime === "30") {
    timeText = " With 30 minutes available, you get 3 tasks.";
  } else if (studyTime === "45") {
    timeText = " With 45 minutes available, you get 4 tasks.";
  } else if (studyTime === "60") {
    timeText =
      " With 60 minutes available, you get 5 tasks including a final review.";
  }

  return (
    "This personalized " +
    subject +
    " quest was charted just for this session. " +
    difficultyText +
    energyText +
    timeText
  );
}

/* ===========================================
   BUILDING THE OUTPUT & DISPLAYING THE RESULT
   =========================================== */
function displayQuest(quest) {
  const resultArea = document.getElementById("result-area");

  // Build a numbered list (<ol>) from the tasks array
  let taskListHtml = '<ol class="quest-plan">';
  for (let i = 0; i < quest.tasks.length; i++) {
    taskListHtml += "<li>" + escapeHtml(quest.tasks[i]) + "</li>";
  }
  taskListHtml += "</ol>";

  // Assemble the attractive result card
  const cardHtml =
    '<article class="quest-card">' +
    '<h2 class="quest-title">' +
    escapeHtml(quest.title) +
    "</h2>" +
    '<h3 class="quest-heading">Your study plan</h3>' +
    taskListHtml +
    '<p class="quest-explanation">' +
    escapeHtml(quest.explanation) +
    "</p>" +
    '<p class="quest-motivation">“' +
    escapeHtml(quest.motivation) +
    "”</p>" +
    '<button type="button" class="try-again-btn" id="try-again-btn">' +
    "Try Another Quest" +
    "</button>" +
    "</article>";

  resultArea.className = "result-area has-content";
  resultArea.innerHTML = cardHtml;

  // Smoothly bring the card into view (helpful on phones)
  const card = resultArea.querySelector(".quest-card");
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

/* -------------------------------------------
   Keep user-typed text from breaking our HTML
   (still does NOT save any personal data)
   ------------------------------------------- */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
