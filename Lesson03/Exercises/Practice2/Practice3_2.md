You are an expert full-stack web developer and UI/UX designer.

Create a simple Duolingo-style web application for students to practice beginner learning lessons.

Project Name:
MiniLingo Learning App

Technology Requirements:
- Use HTML, CSS, and JavaScript only
- Do not use React, Next.js, backend, database, or external APIs
- The app should run directly in the browser by opening index.html
- Create three files:
  1. index.html
  2. style.css
  3. script.js

Main Goal:
Build a beginner-friendly language learning practice app inspired by Duolingo. The app should feel fun, colorful, interactive, and easy for middle school or high school students to use.

Core Features:

1. Home Screen
Create a clean home screen with:
- App title: MiniLingo
- Subtitle: Learn a little every day
- A “Start Lesson” button
- A progress display showing the user’s current XP and streak
- A simple mascot area using an emoji, such as 🦉 or 🐥

2. Lesson Screen
Create a lesson with 8 questions.
Use a mix of question types:
- Multiple choice
- Translate a word
- Fill in the blank
- Match the correct meaning

Example learning topic:
Spanish beginner vocabulary

Example words:
- hola = hello
- adiós = goodbye
- gracias = thank you
- perro = dog
- gato = cat
- agua = water
- comida = food
- escuela = school

3. Question UI
For each question:
- Show the question number
- Show a progress bar
- Show the question text
- Show answer choices as large clickable buttons
- Give immediate feedback after the student answers:
  - Correct: green message, “Great job!”
  - Incorrect: red message, “Not quite. The correct answer is ...”
- Add a “Continue” button after feedback

4. Scoring System
Track:
- Number of correct answers
- XP earned
- Streak count
- Lesson progress percentage

Rules:
- Each correct answer gives 10 XP
- At the end of the lesson, show total XP earned
- Show accuracy percentage

5. Lesson Complete Screen
At the end, show:
- “Lesson Complete!”
- Total correct answers
- Accuracy percentage
- XP earned
- Encouraging message
- Button: “Practice Again”
- Button: “Back to Home”

6. Visual Design
Make the design similar in spirit to Duolingo:
- Bright, friendly colors
- Rounded cards
- Large buttons
- Smooth hover effects
- Mobile-friendly layout
- Clean typography
- Use emojis where helpful
- Add a simple animated progress bar
- Make the app look polished and fun

7. Code Quality
Please write clean and beginner-friendly code.
Add comments explaining important parts.
Keep the logic easy to understand for students learning JavaScript.

8. Optional Nice Features
If possible, add:
- Sound effect placeholders using comments
- Simple confetti animation when the lesson is complete
- LocalStorage to save total XP and streak
- A small heart/lives system with 3 hearts
- Disable answer buttons after the student chooses an answer

Important:
Generate the complete code for all three files.
Make sure the app works immediately after I copy the files into a folder and open index.html.
Do not leave TODO placeholders for required features.