# Lesson 8 Practice: Turn MoodQuest into an App People Enjoy Using

**Mission:** You are the product team for MoodQuest. The app works, but first-time users find it confusing. Use Cursor, real feedback, and small code changes to make it clearer, easier, and more helpful.

**Suggested time:** 75–100 minutes

## Learning goals

By the end, you can explain UI versus UX, observe a first-time user, collect specific feedback, prioritize improvements by impact and difficulty, use Cursor for a small safe change, and test that nothing broke.

---

## Part 1 — Launch and investigate (10 minutes)

1. Open this folder in Cursor.
2. Run `index.html` in a browser.
3. Do not read the code yet. Pretend you are a first-time user.
4. Try to get a recommendation.
5. Write down at least four confusing moments.

Use these detective questions:

- What is the app for?
- What should I click first?
- Did something happen after I clicked?
- Did I get the result I expected?

### UI or UX?

Classify each observation:

- UI: colors, fonts, buttons, spacing, images, layout.
- UX: clarity, flow, ease of use, feedback, usefulness.

Example: “The button is pink” is UI. “I do not know what the button will do” is UX.

---

## Part 2 — Ask Cursor to explain the project (10 minutes)

Open Cursor Chat and use:

> Read `index.html`, `styles.css`, and `script.js`. Explain how MoodQuest works in beginner-friendly language. For each file, list its job and identify one possible UX problem. Do not change any code yet.

Check Cursor's answer against the code. Ask one follow-up question about a line you do not understand.

Suggested follow-up:

> In `script.js`, explain how the app chooses a random quest. Use a simple example.

---

## Part 3 — Peer usability test: watch, do not teach (15 minutes)

1. Pair with another student.
2. The builder opens the app and says only: “Please try this app.”
3. The builder must not explain where to click.
4. The tester tries to get a recommendation.
5. The builder silently writes where the tester hesitates, clicks the wrong thing, or looks confused.
6. Ask the questions in `UX_TEST_NOTES.md`.
7. Switch roles.

Good feedback is specific and actionable:

- Helpful: “I did not know what the numbers 1, 2, and 3 meant.”
- Weak: “It is bad.”

Remember: feedback is data, not criticism.

---

## Part 4 — Prioritize, do not fix everything (10 minutes)

List three possible improvements in `UX_TEST_NOTES.md` and score each one.

Use this decision rule:

- **Do first:** high impact, low or medium difficulty.
- **Maybe later:** high impact, high difficulty.
- **Optional:** low impact, low difficulty.
- **Avoid for now:** low impact, high difficulty.

Ask Cursor:

> Here are three possible MoodQuest improvements: [paste them]. Rank them by user impact, difficulty, and demo value. Recommend one improvement that a beginner can complete in 20 minutes. Do not write code yet.

Choose one improvement only.

---

## Part 5 — Cursor Challenge A: clearer words (10–15 minutes)

Recommended first improvement: replace vague labels and instructions.

Prompt:

> I want to make one small UX improvement to MoodQuest. First-time users do not understand the labels “1”, “2”, “3”, the title “Choose”, or the button “Go”. Suggest clear, short wording for middle and high school students. Then update only `index.html`. Do not change CSS or JavaScript. Explain each wording change and give me three browser tests.

After Cursor edits the file:

1. Review the diff before accepting.
2. Confirm it changed only `index.html`.
3. Run the app again.
4. Test the complete form.

Checkpoint: A new user should understand the app's purpose and first action within five seconds.

---

## Part 6 — Cursor Challenge B: helpful feedback messages (15–20 minutes)

Current problem: submitting an incomplete form appears to do nothing.

Prompt:

> Improve MoodQuest so users receive a friendly error message when any choice is missing. The message should say what to do next. Make the smallest safe change. You may update `index.html`, `styles.css`, and `script.js`, but do not rewrite the project. Use an accessible live message. Explain the change and give me tests for all missing-input cases.

Required tests:

1. Submit with every field empty.
2. Submit with only mood selected.
3. Submit with all fields complete.
4. Confirm the error disappears after a successful result.

Stretch idea: briefly show “Finding your quest…” before displaying the result.

---

## Part 7 — Cursor Challenge C: make the result useful (15–20 minutes)

Current problem: the result is one long paragraph with no next step.

Prompt:

> Improve the MoodQuest result so it is easy to scan. Show a clear quest title, the selected time and location, and a simple three-step “Start now” checklist. Keep the existing random recommendation logic. Make the smallest safe code and style changes. Do not add a framework. Tell me exactly what changed and how to test it.

Success criteria:

- The recommendation title stands out.
- Details are grouped clearly.
- The user sees an obvious next step.
- The app still generates a random idea.

---

## Part 8 — Responsive and accessible polish (optional, 10–15 minutes)

Choose one:

### Option 1: mobile layout

> On screens narrower than 600px, make the MoodQuest form use one column, make tap targets at least 44px tall, and keep text readable. Change only the CSS needed. Show me the media query and three mobile tests.

### Option 2: reset control

> The reset control is a tiny icon-only button. Replace it with a clearly labeled “Start Over” button that is easy to tap and still resets the form and result. Make the smallest safe change and preserve accessibility.

### Option 3: short onboarding

> Add a compact “How it works” section with three steps above the form. Keep it short and friendly. Do not add a modal or new page.

---

## Part 9 — Regression test: did anything break? (8 minutes)

Run every test below:

- App opens without console errors.
- Main form accepts input.
- Incomplete input gets a helpful message.
- Complete input creates a result.
- Result is readable.
- Reset works.
- Keyboard users can tab through controls.
- Layout remains readable on a narrow browser window.

Ask Cursor only when a test fails:

> I made a small UX improvement, but this test now fails: [describe test]. What I changed: [describe or paste diff]. Diagnose the cause step by step. Make the smallest fix and do not rewrite the project.

---

## Part 10 — Before-and-after reflection (5 minutes)

Complete these sentences:

- Before the improvement, users struggled with…
- The most useful feedback was…
- I chose this improvement because its impact was… and difficulty was…
- Cursor helped me by…
- I verified the change by…
- One improvement for later is…

## Demo challenge

Give a 45-second product demo:

1. Explain the target user.
2. Show the original problem.
3. Show the improved flow.
4. Quote one piece of user feedback.
5. Explain why the change improved UX, not just UI.
