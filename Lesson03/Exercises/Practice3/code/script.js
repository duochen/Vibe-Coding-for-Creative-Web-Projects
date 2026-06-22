// Study Plan Generator - simple screen switching and plan generation

// References to each screen section
const homeScreen = document.getElementById("home-screen");
const formScreen = document.getElementById("form-screen");
const dataScreen = document.getElementById("data-screen");

// Form elements
const studyForm = document.getElementById("study-form");
const topicInput = document.getElementById("topic-input");
const difficultySelect = document.getElementById("difficulty-select");
const formError = document.getElementById("form-error");

// Buttons
const openAppBtn = document.getElementById("open-app-btn");
const backHomeBtn = document.getElementById("back-home-btn");
const createAnotherBtn = document.getElementById("create-another-btn");

// Result display elements on the data page
const resultTopic = document.getElementById("result-topic");
const resultDifficulty = document.getElementById("result-difficulty");
const resultGoal = document.getElementById("result-goal");
const resultSteps = document.getElementById("result-steps");
const resultActivity = document.getElementById("result-activity");

// Show one screen and hide the others (no page reload)
function showScreen(screen) {
  homeScreen.classList.remove("active");
  formScreen.classList.remove("active");
  dataScreen.classList.remove("active");
  screen.classList.add("active");
}

// Capitalize the first letter of a string for display
function capitalize(text) {
  if (!text) {
    return "";
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Build a study plan based on topic and difficulty level
function generateStudyPlan(topic, difficulty) {
  const plans = {
    beginner: {
      goal:
        "Build a solid foundation in " +
        topic +
        " by learning the core ideas and practicing a little each day.",
      steps: [
        "Week 1: Learn the basics — read an introductory guide or watch beginner videos about " +
          topic +
          ". Focus on understanding key terms and simple examples.",
        "Week 2: Practice daily — complete short exercises or quizzes for 15–20 minutes each day to reinforce what you learned.",
        "Week 3: Review and apply — summarize what you know, fix any confusing parts, and try one small hands-on task related to " +
          topic +
          "."
      ],
      activity:
        "Create a one-page cheat sheet of the most important " +
        topic +
        " concepts and explain each one in your own words."
    },
    intermediate: {
      goal:
        "Strengthen your " +
        topic +
        " skills with structured practice, small projects, and regular review.",
      steps: [
        "Week 1: Review fundamentals and fill gaps — identify weak areas in " +
          topic +
          " and study those topics with guided tutorials or textbook chapters.",
        "Week 2: Work on exercises — complete a set of practice problems or coding challenges that match your current skill level.",
        "Week 3: Build a small project — apply " +
          topic +
          " to create something useful, such as a mini app, study guide, or presentation."
      ],
      activity:
        "Complete a small project using " +
        topic +
        ", then write a short reflection on what you learned and what was challenging."
    },
    advanced: {
      goal:
        "Master " +
        topic +
        " through deep study, challenging projects, and real-world application.",
      steps: [
        "Week 1: Deep dive — study advanced concepts in " +
          topic +
          ", read technical articles, and explore how experts use it in practice.",
        "Week 2: Challenge yourself — tackle complex exercises, open-source contributions, or research papers related to " +
          topic +
          ".",
        "Week 3: Real-world application — design and build a substantial project or case study that solves a real problem using " +
          topic +
          "."
      ],
      activity:
        "Research a real-world use of " +
        topic +
        ", then create a challenge project that demonstrates advanced skills and present your findings to a classmate or teacher."
    }
  };

  return plans[difficulty];
}

// Fill the data page with the generated study plan
function displayStudyPlan(topic, difficulty) {
  const plan = generateStudyPlan(topic, difficulty);

  resultTopic.textContent = topic;
  resultDifficulty.textContent = capitalize(difficulty);
  resultGoal.textContent = plan.goal;

  // Clear old steps and add the new 3-step plan
  resultSteps.innerHTML = "";
  plan.steps.forEach(function (step) {
    const listItem = document.createElement("li");
    listItem.textContent = step;
    resultSteps.appendChild(listItem);
  });

  resultActivity.textContent = plan.activity;
}

// Open App button — go from home to form
openAppBtn.addEventListener("click", function () {
  showScreen(formScreen);
});

// Back to Home link on the form page
backHomeBtn.addEventListener("click", function () {
  showScreen(homeScreen);
});

// Form submit — validate topic and show the data page
studyForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const topic = topicInput.value.trim();
  const difficulty = difficultySelect.value;

  // Show a friendly error if the topic is empty
  if (topic === "") {
    formError.classList.remove("hidden");
    topicInput.focus();
    return;
  }

  formError.classList.add("hidden");
  displayStudyPlan(topic, difficulty);
  showScreen(dataScreen);
});

// Create Another Plan — return to form and clear previous input
createAnotherBtn.addEventListener("click", function () {
  topicInput.value = "";
  difficultySelect.value = "beginner";
  formError.classList.add("hidden");
  showScreen(formScreen);
  topicInput.focus();
});

// Hide error message when the user starts typing again
topicInput.addEventListener("input", function () {
  if (topicInput.value.trim() !== "") {
    formError.classList.add("hidden");
  }
});

// Start on the home page
showScreen(homeScreen);
