// MiniLingo - Duolingo-style Spanish vocabulary lesson app

// Spanish beginner vocabulary used in this lesson
const VOCABULARY = [
  { spanish: "hola", english: "hello" },
  { spanish: "adiós", english: "goodbye" },
  { spanish: "gracias", english: "thank you" },
  { spanish: "perro", english: "dog" },
  { spanish: "gato", english: "cat" },
  { spanish: "agua", english: "water" },
  { spanish: "comida", english: "food" },
  { spanish: "escuela", english: "school" }
];

// 8 questions mixing multiple choice, translate, fill-in-blank, and match meaning
const QUESTIONS = [
  {
    type: "multiple-choice",
    text: 'What does "hola" mean?',
    options: ["hello", "goodbye", "thank you", "water"],
    correct: "hello"
  },
  {
    type: "translate",
    text: 'What is the Spanish word for "dog"?',
    options: ["perro", "gato", "agua", "comida"],
    correct: "perro"
  },
  {
    type: "fill-blank",
    text: '"_____" means thank you in Spanish.',
    blankWord: "gracias",
    options: ["gracias", "hola", "adiós", "escuela"],
    correct: "gracias"
  },
  {
    type: "match",
    text: 'Match the meaning: "gato"',
    options: ["cat", "dog", "food", "school"],
    correct: "cat"
  },
  {
    type: "multiple-choice",
    text: 'What does "adiós" mean?',
    options: ["hello", "goodbye", "cat", "water"],
    correct: "goodbye"
  },
  {
    type: "translate",
    text: 'What is the Spanish word for "water"?',
    options: ["agua", "comida", "escuela", "gracias"],
    correct: "agua"
  },
  {
    type: "fill-blank",
    text: '"escuela" means _____ in English.',
    blankWord: "school",
    options: ["school", "food", "cat", "hello"],
    correct: "school"
  },
  {
    type: "match",
    text: 'Match the meaning: "comida"',
    options: ["food", "water", "dog", "goodbye"],
    correct: "food"
  }
];

const XP_PER_CORRECT = 10;
const MAX_HEARTS = 3;
const TOTAL_QUESTIONS = QUESTIONS.length;

// Lesson state (resets each time a lesson starts)
let currentQuestionIndex = 0;
let correctCount = 0;
let lessonXpEarned = 0;
let hearts = MAX_HEARTS;
let answered = false;

// Persistent user progress (saved in localStorage)
let totalXp = 0;
let streak = 0;

// DOM elements
const screens = {
  home: document.getElementById("home-screen"),
  lesson: document.getElementById("lesson-screen"),
  complete: document.getElementById("complete-screen"),
  failed: document.getElementById("failed-screen")
};

const homeXpEl = document.getElementById("home-xp");
const homeStreakEl = document.getElementById("home-streak");
const startLessonBtn = document.getElementById("start-lesson-btn");
const exitLessonBtn = document.getElementById("exit-lesson-btn");
const lessonProgressFill = document.getElementById("lesson-progress-fill");
const heartsDisplay = document.getElementById("hearts-display");
const questionNumberEl = document.getElementById("question-number");
const questionTextEl = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const feedbackArea = document.getElementById("feedback-area");
const feedbackMessage = document.getElementById("feedback-message");
const continueBtn = document.getElementById("continue-btn");
const practiceAgainBtn = document.getElementById("practice-again-btn");
const backHomeBtn = document.getElementById("back-home-btn");
const retryBtn = document.getElementById("retry-btn");
const failedHomeBtn = document.getElementById("failed-home-btn");
const confettiCanvas = document.getElementById("confetti-canvas");

// Show one screen and hide the others
function showScreen(screenName) {
  Object.keys(screens).forEach(function (name) {
    screens[name].classList.toggle("active", name === screenName);
  });
}

// Load saved XP and streak from localStorage
function loadProgress() {
  const savedXp = localStorage.getItem("minilingo-total-xp");
  const savedStreak = localStorage.getItem("minilingo-streak");
  const savedLastDate = localStorage.getItem("minilingo-last-lesson-date");

  totalXp = savedXp ? parseInt(savedXp, 10) : 0;
  streak = savedStreak ? parseInt(savedStreak, 10) : 0;

  // Reset streak if user missed a day (more than 1 day since last lesson)
  if (savedLastDate) {
    const lastDate = new Date(savedLastDate);
    const today = new Date();
    const daysDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (daysDiff > 1) {
      streak = 0;
      saveProgress();
    }
  }

  updateHomeStats();
}

// Save XP and streak to localStorage
function saveProgress() {
  localStorage.setItem("minilingo-total-xp", String(totalXp));
  localStorage.setItem("minilingo-streak", String(streak));
}

// Update streak when a lesson is finished successfully
function updateStreak() {
  const todayStr = new Date().toDateString();
  const lastDateStr = localStorage.getItem("minilingo-last-lesson-date");

  if (lastDateStr === todayStr) {
    // Already practiced today — streak stays the same
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastDateStr === yesterday.toDateString()) {
    streak += 1;
  } else {
    streak = 1;
  }

  localStorage.setItem("minilingo-last-lesson-date", todayStr);
  saveProgress();
}

// Update XP and streak on the home screen
function updateHomeStats() {
  homeXpEl.textContent = totalXp;
  homeStreakEl.textContent = streak;
}

// Render heart icons in the lesson header
function renderHearts() {
  let html = "";
  for (let i = 0; i < MAX_HEARTS; i++) {
    const lost = i >= hearts;
    html += '<span class="' + (lost ? "heart-lost" : "") + '">❤️</span>';
  }
  heartsDisplay.innerHTML = html;
}

// Update the animated lesson progress bar
function updateProgressBar() {
  const percent = (currentQuestionIndex / TOTAL_QUESTIONS) * 100;
  lessonProgressFill.style.width = percent + "%";
}

// Sound effect placeholders — uncomment and add audio files to enable sounds
function playCorrectSound() {
  // const audio = new Audio("sounds/correct.mp3");
  // audio.play();
}

function playIncorrectSound() {
  // const audio = new Audio("sounds/incorrect.mp3");
  // audio.play();
}

function playCompleteSound() {
  // const audio = new Audio("sounds/complete.mp3");
  // audio.play();
}

// Start a new lesson from the beginning
function startLesson() {
  currentQuestionIndex = 0;
  correctCount = 0;
  lessonXpEarned = 0;
  hearts = MAX_HEARTS;
  answered = false;

  showScreen("lesson");
  renderHearts();
  showQuestion();
}

// Display the current question and answer buttons
function showQuestion() {
  answered = false;
  const question = QUESTIONS[currentQuestionIndex];

  updateProgressBar();
  questionNumberEl.textContent =
    "Question " + (currentQuestionIndex + 1) + " of " + TOTAL_QUESTIONS;

  // Fill-in-blank questions highlight the blank word
  if (question.type === "fill-blank" && question.blankWord) {
    questionTextEl.innerHTML = question.text.replace(
      "_____",
      '<span class="blank-highlight">_____</span>'
    );
  } else {
    questionTextEl.textContent = question.text;
  }

  // Build answer buttons
  answersContainer.innerHTML = "";
  question.options.forEach(function (option) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = option;
    button.addEventListener("click", function () {
      handleAnswer(option, question.correct, button);
    });
    answersContainer.appendChild(button);
  });

  // Hide feedback until the student answers
  feedbackArea.className = "feedback hidden";
  continueBtn.classList.add("hidden");
}

// Handle when the student picks an answer
function handleAnswer(selected, correctAnswer, clickedButton) {
  if (answered) {
    return;
  }
  answered = true;

  const isCorrect = selected === correctAnswer;
  const allButtons = answersContainer.querySelectorAll(".answer-btn");

  // Disable all answer buttons after a choice is made
  allButtons.forEach(function (btn) {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else if (btn === clickedButton) {
      btn.classList.add("incorrect");
    } else {
      btn.classList.add("dimmed");
    }
  });

  feedbackArea.classList.remove("hidden");
  continueBtn.classList.remove("hidden");

  if (isCorrect) {
    correctCount += 1;
    lessonXpEarned += XP_PER_CORRECT;
    feedbackArea.className = "feedback correct";
    feedbackMessage.textContent = "Great job! 🎉";
    playCorrectSound();
  } else {
    hearts -= 1;
    renderHearts();
    feedbackArea.className = "feedback incorrect";
    feedbackMessage.textContent =
      "Not quite. The correct answer is " + correctAnswer + ".";
    playIncorrectSound();
  }
}

// Move to next question or end the lesson
function continueLesson() {
  if (hearts <= 0) {
    showFailedScreen();
    return;
  }

  currentQuestionIndex += 1;

  if (currentQuestionIndex >= TOTAL_QUESTIONS) {
    finishLesson();
  } else {
    showQuestion();
  }
}

// Show results when all questions are answered
function finishLesson() {
  totalXp += lessonXpEarned;
  updateStreak();
  saveProgress();
  updateHomeStats();

  const accuracy = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

  document.getElementById("result-correct").textContent = correctCount;
  document.getElementById("result-accuracy").textContent = accuracy + "%";
  document.getElementById("result-xp").textContent = lessonXpEarned;

  // Pick an encouraging message based on accuracy
  const encouragingEl = document.getElementById("encouraging-message");
  if (accuracy === 100) {
    encouragingEl.textContent = "Perfect score! You are unstoppable! 🌟";
  } else if (accuracy >= 75) {
    encouragingEl.textContent = "Awesome work! Keep up the great learning! 💪";
  } else if (accuracy >= 50) {
    encouragingEl.textContent = "Good effort! Practice again to improve even more! 📚";
  } else {
    encouragingEl.textContent = "Every mistake is a chance to learn. You got this! 🦉";
  }

  showScreen("complete");
  playCompleteSound();
  startConfetti();
}

// Show screen when student runs out of hearts
function showFailedScreen() {
  document.getElementById("failed-correct").textContent = correctCount;
  document.getElementById("failed-xp").textContent = lessonXpEarned;

  if (lessonXpEarned > 0) {
    totalXp += lessonXpEarned;
    saveProgress();
    updateHomeStats();
  }

  showScreen("failed");
}

// Simple confetti animation on lesson complete
function startConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const colors = ["#58cc02", "#1cb0f6", "#ffc800", "#ff4b4b", "#ce82ff"];
  const particles = [];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      spin: Math.random() * 6 - 3
    });
  }

  let frame = 0;
  const maxFrames = 180;

  function animate() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    particles.forEach(function (p) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.spin;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    });

    frame += 1;
    if (frame < maxFrames) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  animate();
}

// Event listeners
startLessonBtn.addEventListener("click", startLesson);
practiceAgainBtn.addEventListener("click", startLesson);
retryBtn.addEventListener("click", startLesson);
continueBtn.addEventListener("click", continueLesson);

backHomeBtn.addEventListener("click", function () {
  showScreen("home");
});

failedHomeBtn.addEventListener("click", function () {
  showScreen("home");
});

exitLessonBtn.addEventListener("click", function () {
  if (confirm("Leave this lesson? Your progress for this round will be lost.")) {
    showScreen("home");
  }
});

// Resize confetti canvas if window size changes
window.addEventListener("resize", function () {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});

// Start the app
loadProgress();
showScreen("home");
