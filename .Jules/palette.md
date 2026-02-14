# Palette's Journal 🎨

> "Good UX is invisible - it just works"

This journal tracks critical UX and accessibility learnings, surprising user behaviors, and reusable patterns.

## 2024-05-21 - Standard Colors & Contrast

**Learning:** Standard Material Design colors like Red 500 (`#f44336`) and Green 500 (`#4caf50`) may not meet WCAG AA contrast requirements on white backgrounds for normal text.
**Action:** Use darker shades (700/800 series) like `#d32f2f` (Red) and `#2e7d32` (Green) for text to ensure sufficient contrast ratios (>4.5:1).

## 2024-05-21 - Invisible UX Enhancements

**Learning:** Simple attributes like `autoComplete="email"` and `spellCheck={false}` significantly improve the user experience for email inputs without any visual change.
**Action:** Always check input attributes for specific data types to enable browser autofill and prevent unnecessary spellchecking.

## 2024-05-24 - Focus Management with Disabled Inputs

**Learning:** `input.focus()` fails silently if the element is disabled. When shifting focus after an async error state that re-enables the input, direct calls often fail due to race conditions.
**Action:** Use `useEffect` with the state dependency to ensure focus is applied after the re-render where `disabled` is removed.

## 2024-05-25 - Contextual Error Feedback

**Learning:** Moving focus to an invalid input is good, but without `aria-describedby`, screen reader users might not know *why* focus moved.
**Action:** Use `aria-describedby` linked to the error message ID (generated with `useId`) to ensure the error is announced immediately upon focus.
