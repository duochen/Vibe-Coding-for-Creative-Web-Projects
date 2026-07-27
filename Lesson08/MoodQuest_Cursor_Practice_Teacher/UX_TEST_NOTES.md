# UX Test Notes — Teacher Solution

**Builder:** Jordan  
**Tester:** Maya

## First-time user questions

### 1. What do you think this app is for?

The tester thought MoodQuest recommends a short activity or mini-adventure based on the user's mood, available time, and preferred location.

### 2. What did you try first?

The tester first read the three-step instructions and then opened the **How are you feeling?** menu.

### 3. What was easy to understand?

- The title and description clearly explained the app's purpose.
- The three numbered steps showed what information to provide.
- The field labels were descriptive.
- The **Create My MoodQuest** button clearly described the action.
- The recommendation card was easy to scan.

### 4. Where did you hesitate or get stuck?

The tester briefly hesitated when choosing between two similar moods, but did not get stuck. The tester also checked whether all three choices were required before selecting the main button.

### 5. What did you expect to happen after clicking the main button?

The tester expected the app to create one activity recommendation that matched the selected mood, time, and location. The actual result matched this expectation and included clear next steps.

### 6. What is one specific improvement you recommend?

Add a short example under each selection field, such as **“Example: Energetic”**, to help younger students choose more quickly.

## Silent observation

- **First click:** The tester selected the mood dropdown.
- **Confusing label or control:** No major confusing control. The tester paused briefly at the mood choices because two options felt similar.
- **Error or unexpected result:** When the tester intentionally left the location blank, the app displayed a clear message identifying the missing choice. No unexpected result occurred.
- **Exact words the tester said:** “I know what to do, and the checklist tells me how to start right away.”

## Three possible improvements

| Improvement | User impact | Difficulty | Demo value | Do now? |
|---|---|---|---|---|
| 1. Add short examples beneath the three selection fields. | Medium | Low | Medium | Yes |
| 2. Add a **Try Another Quest** button that keeps the current choices but creates a different recommendation. | High | Medium | High | No — save for the next iteration |
| 3. Add optional sound effects or animations when a quest appears. | Low | Medium | Medium | No |

## Priority decision

**Improvement selected:** Add short examples beneath the three selection fields.

**Why this is the best next change:** It addresses the tester's only moment of hesitation, has useful impact, is quick to implement, and does not risk changing the app's main logic before the demo.

## Post-change verification

- [x] The app opens correctly.
- [x] The purpose is clear to a first-time user.
- [x] Missing selections produce a specific error message.
- [x] The main button creates a recommendation.
- [x] The result is organized into a title, details, and action checklist.
- [x] The **Start Over** button resets the app.
- [x] Keyboard focus returns to the first field after reset.
- [x] The layout remains readable on a narrow mobile screen.
- [x] No existing feature broke after the UX change.

## Teacher reflection

The solution demonstrates that UX improvement is not only about making the page more attractive. The most important changes clarify the app's purpose, guide the user's first action, provide feedback when something is missing, organize the result, and make the next step obvious. The remaining recommendation is intentionally small so students can see that product improvement continues through repeated testing and iteration.
