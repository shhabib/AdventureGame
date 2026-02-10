# Palette's Journal 🎨

> "Good UX is invisible - it just works"

This journal tracks critical UX and accessibility learnings, surprising user behaviors, and reusable patterns.

## 2024-05-21 - Standard Colors & Contrast

**Learning:** Standard Material Design colors like Red 500 (`#f44336`) and Green 500 (`#4caf50`) may not meet WCAG AA contrast requirements on white backgrounds for normal text.
**Action:** Use darker shades (700/800 series) like `#d32f2f` (Red) and `#2e7d32` (Green) for text to ensure sufficient contrast ratios (>4.5:1).

## 2024-05-21 - Invisible UX Enhancements

**Learning:** Simple attributes like `autoComplete="email"` and `spellCheck={false}` significantly improve the user experience for email inputs without any visual change.
**Action:** Always check input attributes for specific data types to enable browser autofill and prevent unnecessary spellchecking.

## 2026-02-03 - Immediate Error Recovery
**Learning:** Users find it frustrating when an input field remains in an error state (red border, error message) while they are actively correcting the input.
**Action:** Always clear the error state and message immediately upon user interaction (e.g., `onChange` or `onInput`) to provide immediate feedback that the system acknowledges the correction attempt.

## 2026-02-03 - Dynamic Error Accessibility
**Learning:** Screen readers may not announce error messages immediately unless they are programmatically associated with the input field.
**Action:** Use `aria-describedby` on the input element pointing to the ID of the error message container to ensure the message is announced when the input receives focus or changes.
