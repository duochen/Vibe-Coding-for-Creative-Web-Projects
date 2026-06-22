Create a simple beginner-friendly web application using only HTML, CSS, and JavaScript.

The app should help a student generate a simple personalized study plan.

Requirements:

1. Technology
- Use plain HTML, CSS, and JavaScript only.
- Do not use React, Next.js, backend, database, or external libraries.
- Put everything in one folder.
- Create three files:
  - index.html
  - style.css
  - script.js

2. App Pages / Screens

The app should have the following screens:

A. Home Page
- Show the title: "Study Plan Generator"
- Show a short description: "Create a simple study plan based on your topic and difficulty level."
- Show a button: "Open App"
- When the user clicks "Open App", show the form screen.

B. Form Page
- Show a form with:
  - Topic input box
    - Label: "Enter Topic"
    - Example placeholder: "Python, Algebra, Biology, Web Development"
  - Difficulty dropdown
    - Label: "Select Difficulty"
    - Options:
      - Beginner
      - Intermediate
      - Advanced
  - Button:
    - Text: "Click to Create"
- When the user clicks the button:
  - Validate that the topic is not empty.
  - If the topic is empty, show a friendly error message.
  - If the topic is filled, generate a simple study plan and show the data page.

C. Data Page
- Show the title: "Your Personalized Study Plan"
- Display:
  - Topic
  - Difficulty
  - Recommended learning goal
  - 3-step study plan
  - Suggested practice activity
- Add a button: "Create Another Plan"
- When the user clicks it, return to the form page and clear the previous input.

3. Workflow

The user workflow should be:

1. Start on the main input screen.
2. Click "Open App".
3. Fill out the study preference form.
4. Click "Click to Create".
5. Receive and review the personalized data page.

4. JavaScript Logic

The JavaScript should:
- Hide and show different screens without reloading the page.
- Read the topic and difficulty values from the form.
- Generate different study plan text based on difficulty:
  - Beginner: simple explanation, basic goals, easy practice.
  - Intermediate: more structured plan, small project or exercises.
  - Advanced: deeper learning, challenge project, research or real-world application.
- Display the generated result on the data page.

5. Design Requirements

Use clean, student-friendly styling:
- Centered layout
- Card-style sections
- Clear buttons
- Light background
- Good spacing
- Large readable text
- Mobile-friendly design

6. Code Quality

- Use clear class names and IDs.
- Add helpful comments in the JavaScript.
- Make the code easy for middle school and high school students to understand.
- Keep the app simple but complete.