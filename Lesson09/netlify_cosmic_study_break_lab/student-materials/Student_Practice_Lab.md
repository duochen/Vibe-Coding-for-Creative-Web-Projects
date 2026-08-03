# Student Practice Lab: Launch the Cosmic Study Break App with Netlify

## Mission
Turn a web app that works only on your computer into a live website that classmates and family can open with a link. You do not need GitHub or the command line.

## Why Netlify for this lesson?
Both Netlify and Vercel can publish static sites. For first-time students, this lab uses **Netlify Drop** because the core workflow is easy to see and explain: keep the site files in one folder, drag that folder into the browser, and receive a shareable `netlify.app` address. Later, GitHub can be added for automatic updates.

## What you will deploy
**Cosmic Study Break** is a playful HTML/CSS/JavaScript app. A student chooses an energy level and mission length, receives a random mini-break mission, runs a timer, earns XP, and unlocks a rank.

## Learning goals
By the end, you can explain deployment, identify a site's three main files, test locally, deploy without GitHub, verify a live URL, update a deployment, follow a demo flow, document a known issue, and prepare a backup.

## Time
About 60-75 minutes.

## Materials
- A laptop or Chromebook with a modern browser
- Internet access
- The downloaded ZIP package
- A Netlify account or a teacher-managed classroom deployment process

> Privacy rule: do not put your full name, home address, school schedule, passwords, API keys, or other private information inside a public website.

# Part 1 - Meet the project

1. Unzip the downloaded package.
2. Open `deploy-this-folder`.
3. Confirm that it contains `index.html`, `styles.css`, and `script.js`.
4. Double-click `index.html`.
5. The Cosmic Study Break app should open in a browser.

### File detective
- `index.html`: the structure and words
- `styles.css`: colors, spacing, layout, animation
- `script.js`: buttons, random missions, timer, XP, saved progress

Do not rename or separate these files before deployment.

# Part 2 - Test locally before deployment

Complete this mission flow:

1. Choose **Medium** energy.
2. Move the slider to **1 minute**.
3. Click **Launch My Mission**.
4. Confirm that a mission appears.
5. Click **Start Timer** and watch it count down.
6. Click **Mission Complete +10 XP**.
7. Confirm that XP and mission count change.
8. Click the moon button and confirm the theme changes.
9. Refresh the page. Confirm that XP is still saved in that browser.

### Pre-deployment checklist
- [ ] The page opens.
- [ ] Text is readable.
- [ ] Energy buttons work.
- [ ] The slider works.
- [ ] A random mission appears.
- [ ] The timer starts and pauses.
- [ ] XP changes.
- [ ] The theme button works.
- [ ] No major visible error appears.

# Part 3 - Deploy with Netlify Drop

Netlify may adjust button names over time, but the workflow remains folder -> upload -> live URL.

1. Open the Netlify Drop page in a new browser tab （https://app.netlify.com/drop）.
2. Sign in when your teacher instructs you to do so.
3. Return to File Explorer or Finder.
4. Locate the **`deploy-this-folder`** folder.
5. Drag the entire folder into the upload area. Do not drag only `index.html`.
6. Wait for the upload and deployment to finish. Do not close the tab.
7. Netlify displays a website address ending with **`.netlify.app`**.
8. Open the address.
9. Copy the address into your milestone worksheet.

### Stop-and-check
Your page should have colors and working buttons. If you see plain text, missing styles, or broken buttons, you probably uploaded only one file instead of the whole folder.

# Part 4 - Test the live website

Open the live URL in a new private/incognito window or another browser.

- [ ] The URL opens without your local files.
- [ ] The page title is Cosmic Study Break.
- [ ] CSS design is visible.
- [ ] All buttons work.
- [ ] The mission generator works.
- [ ] The timer works.
- [ ] The layout works at a narrow phone-like browser width.
- [ ] No private information appears.

Ask a partner to open the link and complete one mission. Record one observation:

**My partner noticed:** ______________________________________________

# Part 5 - Make one safe customization

Choose only one beginner-friendly change:

A. Change the heading in `index.html`.
B. Add one mission to a list in `script.js`.
C. Change the `--accent` value in `styles.css`.
D. Change the XP reward in `script.js` from 10 to 15 in both the calculation and button text.

After editing:

1. Save the file.
2. Open `index.html` locally again.
3. Test the changed feature.
4. Confirm that the rest of the app still works.

### Safe AI prompt
> I am preparing a beginner HTML, CSS, and JavaScript project for a class demo. I want to change only [describe one small change]. Do not rewrite the project. Tell me which file and exact small section to edit. Keep the code beginner-friendly, explain the change simply, and give me a five-step test checklist.

# Part 6 - Update the deployed site

1. Open your Netlify project dashboard.
2. Find the production deploy area or manual drag-and-drop area.
3. Drag the updated `deploy-this-folder` folder into that area.
4. Wait for the new deploy to finish.
5. Refresh the live URL. A hard refresh may be needed: `Ctrl+Shift+R` on Windows/Chromebook or `Command+Shift+R` on Mac.
6. Confirm your change is visible.

# Part 7 - Troubleshooting mission

## I see a 404 or Page Not Found
Check that `index.html` is directly inside the uploaded folder, not hidden inside another nested folder.

## The page has no design
Make sure `styles.css` was uploaded beside `index.html`, with the same spelling and lowercase letters.

## Buttons do nothing
Make sure `script.js` was uploaded beside `index.html`. Open the browser developer console only with teacher help and look for a red error.

## My update is not visible
Wait for deployment to finish, reload the live URL, then try a hard refresh or private window.

## The URL is hard to remember
Use Netlify's project/domain settings to choose an available site name. Do not spend class time searching for a perfect name.

## XP is different on another device
That is expected. This app uses `localStorage`, so progress is stored separately in each browser and device. This is a useful **known issue**, not a deployment failure.

# Part 8 - Prepare a 2-minute demo

Follow this exact user flow:

1. Open the live URL.
2. Say the problem: students sometimes need a short, healthy reset while studying.
3. Say the target user: middle and high school students.
4. Choose an energy level and mission length.
5. Launch a mission.
6. Start the timer briefly.
7. Complete the mission and show XP.
8. Explain one change you made.
9. Explain one known issue and one future improvement.

### Demo script
Hi, my project is called **Cosmic Study Break**. The problem I am solving is ____________. My target users are ____________. The app helps them by ____________. Now I will choose ____________ energy and a ____________-minute mission. When I click Launch My Mission, the app ____________. One improvement I made was ____________. One known issue is ____________. If I had more time, I would ____________. Thank you.

# Part 9 - Backup plan

Prepare at least two:

- [ ] Keep the local project folder.
- [ ] Take two screenshots: home screen and generated mission.
- [ ] Keep the live URL in a document.
- [ ] Keep a second browser tab open.
- [ ] Record a 30-60 second screen video.
- [ ] Print or save the demo script.

# Submission checklist

Submit:

- [ ] Live Netlify URL
- [ ] Screenshot of live site
- [ ] Completed testing checklist
- [ ] One customization description
- [ ] One known issue
- [ ] Demo script
- [ ] Backup-plan choice

# Exit ticket

1. Deployment means: ______________________________________________
2. The file that opens first is: ___________________________________
3. One test I performed was: ______________________________________
4. My live URL is: _________________________________________________
5. One known issue is: _____________________________________________
6. During my demo, I will show this first: __________________________
