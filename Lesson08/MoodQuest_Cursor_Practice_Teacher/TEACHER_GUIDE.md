# Teacher Guide: Lesson 8 Cursor UX Practice

## Recommended lesson flow (90 minutes)

| Time | Activity | Teacher move |
|---|---|---|
| 0–8 min | Frustrating app warm-up | Ask students to name a recent confusing app and one exact change. |
| 8–15 min | UI versus UX mini-lesson | Use the car analogy: UI is the paint; UX is how it drives. |
| 15–25 min | Run starter and inspect with Cursor | Require students to ask for an explanation before requesting edits. |
| 25–40 min | Silent peer test | Builders must not coach testers. Capture exact observations. |
| 40–50 min | Impact/difficulty prioritization | Require one “Do First” item, not a feature list. |
| 50–72 min | Cursor implementation | Review diffs; reject whole-project rewrites. |
| 72–82 min | Regression and mobile test | Test missing inputs, successful result, reset, keyboard, narrow width. |
| 82–90 min | Before/after demos and exit ticket | Ask why the change improved UX rather than only appearance. |

## Concepts covered from the lesson materials

- UI is appearance; UX is clarity, flow, ease of use, and usefulness.
- A visually attractive app can still be confusing.
- Good UX provides a clear purpose, easy navigation, simple instructions, helpful feedback, and few unnecessary steps.
- First-time users reveal problems builders miss.
- Feedback should be specific and actionable.
- Builders observe silently during testing.
- Improvements are prioritized by impact and difficulty.
- AI should make a small, safe change rather than rewrite the project.
- Every improvement must be retested.

## Starter's intentional issues

1. Vague heading and purpose.
2. Numeric field labels.
3. Ambiguous options and “Go” button.
4. Silent failure for incomplete input.
5. Tiny icon-only reset control.
6. Long, unstructured result.
7. No obvious next step.
8. No responsive layout.
9. Minimal focus and feedback states.

## Solution mapping

| Feedback | Solution |
|---|---|
| “I do not know what this app does.” | Clear title, description, and 3-step onboarding. |
| “What do 1, 2, and 3 mean?” | Descriptive labels and legends. |
| “Nothing happened.” | Accessible error, loading, and success messages. |
| “The result is hard to read.” | Quest card, metadata chips, and start-now checklist. |
| “How do I restart?” | Large labeled Start Over button and focus reset. |
| “It is cramped on my phone.” | Single-column mobile layout and large tap targets. |

## Cursor habits to reinforce

1. Give context: target user, current problem, observed feedback.
2. Limit scope: name the files and ask for the smallest safe change.
3. Ask for an explanation before accepting code.
4. Inspect the diff.
5. Run explicit tests.
6. Undo or restore when the change is too broad.

## Assessment rubric (20 points)

| Category | 4 points | 3 points | 2 points | 1 point |
|---|---|---|---|---|
| Feedback evidence | Exact observation and user quote | Clear observation | General feedback | No real feedback |
| Prioritization | Impact/difficulty reasoning is strong | Reasonable choice | Weak explanation | No prioritization |
| Cursor prompt | Specific, scoped, testable | Mostly clear | Vague | Requests full rewrite |
| UX improvement | Clearly improves user flow | Helpful improvement | Mostly visual | Does not solve feedback |
| Testing/reflection | Complete regression test and explanation | Most tests done | Limited testing | No evidence of testing |

## Discussion answers

- Changing background color is mainly a UI change.
- “The menu button is too small for me to tap” is stronger feedback than “I hate the menu” because it identifies a concrete obstacle.
- The best first improvement is usually high impact and low or medium difficulty.
- Feedback is information about user needs, not a personal judgment of the builder.
