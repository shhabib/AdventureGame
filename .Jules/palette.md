# Palette's Journal 🎨

> "Good UX is invisible - it just works"

This journal tracks critical UX and accessibility learnings, surprising user behaviors, and reusable patterns.

## 2026-11-10 - Newsletter Form Accessibility

**Learning:** Linking error/success feedback messages to their respective inputs using `aria-describedby` significantly improves context for screen reader users when navigating the form.
**Action:** Always map dynamic feedback messages to their respective inputs using a generated `useId()` in React and conditionally applying `aria-describedby`.
