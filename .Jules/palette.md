# Palette's Journal 🎨

> "Good UX is invisible - it just works"

This journal tracks critical UX and accessibility learnings, surprising user behaviors, and reusable patterns.

## 2024-06-09 - Newsletter Form Error Handling UX & A11y

**Learning:** It's important to programmatically move focus to inputs when errors occur so that keyboard/screen reader users don't have to navigate backwards to correct their mistakes. Also, clearing error messages instantly on `onChange` prevents lingering invalid states which causes cognitive load.
**Action:** Always pair `aria-describedby` for error text with a `useEffect` that calls `.focus()` on the invalid input ref when the form transitions to an error state. Use `aria-hidden="true"` on visual indicators for `required` fields that already have the `required` HTML attribute to reduce redundancy for screen readers.
