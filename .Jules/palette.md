# Palette's Journal 🎨

> "Good UX is invisible - it just works"

This journal tracks critical UX and accessibility learnings, surprising user behaviors, and reusable patterns.

## 2024-05-22 - Reset Feedback on Interaction
**Learning:** Users can be confused by stale success/error messages when they start a new action.
**Action:** Implement `onChange` handlers that reset status/messages to 'idle' when the user modifies the input.
