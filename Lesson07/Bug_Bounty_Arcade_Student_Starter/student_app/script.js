let snacks = 0;
let score = 0;

const snackCount = document.getElementById("snackCount");
const snackBar = document.getElementById("snackBar");
const scoreValue = document.getElementById("scoreValue");

// Case 2: The score looks strange after adding points more than once.
document.getElementById("addPointsBtn").addEventListener("click", () => {
  const points = document.getElementById("pointsSelect").value;
  score += points; // BUG: points is text, so values can join instead of add.
  scoreValue.textContent = score;
});

// Case 3: The confirmation flashes and then disappears.
document.getElementById("pilotForm").addEventListener("submit", (event) => {
  const name = document.getElementById("pilotName").value;
  document.getElementById("pilotMessage").textContent = `Welcome, ${name}!`;
  // BUG: the form's default page reload is not prevented.
});

// Case 4: Correct code is accepted internally, but no message appears.
document.getElementById("checkCodeBtn").addEventListener("click", () => {
  const code = document.getElementById("secretCode").value.trim().toUpperCase();
  const message = document.getElementById("caseMessage"); // BUG: wrong element ID.
  if (code === "ORBIT") {
    message.textContent = "Access granted! 🚀";
  } else {
    message.textContent = "Try again, detective.";
  }
});

// Case 1: Clicking Feed Alien does nothing.
const feedButton = document.getElementById("feedBtn"); // BUG: HTML uses feedAlienBtn.
feedButton.addEventListener("click", () => {
  if (snacks < 5) snacks += 1;
  snackCount.textContent = snacks;
  snackBar.style.width = `${snacks * 20}%`;
});
