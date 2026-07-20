# Teacher Answer Key

1. **Feed Alien button:** `script.js` searches for `feedBtn`, but HTML uses `feedAlienBtn`.
2. **Score arithmetic:** `select.value` is a string. Convert it with `Number(...)` before adding.
3. **Registration form:** call `event.preventDefault()` in the submit handler.
4. **Secret code status:** JavaScript searches for `caseMessage`, but HTML uses `statusMessage`.
5. **Mobile layout:** replace fixed `width: 1100px` with `width: min(1100px, 100%)` or use `max-width: 1100px; width: 100%`.
