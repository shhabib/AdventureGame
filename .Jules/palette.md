# Palette's Journal 🎨

> "Good UX is invisible - it just works"

This journal tracks critical UX and accessibility learnings, surprising user behaviors, and reusable patterns.

## 2024-05-21 - Standard Colors & Contrast
**Learning:** Standard Material Design colors like Red 500 (`#f44336`) and Green 500 (`#4caf50`) may not meet WCAG AA contrast requirements on white backgrounds for normal text.
**Action:** Use darker shades (700/800 series) like `#d32f2f` (Red) and `#2e7d32` (Green) for text to ensure sufficient contrast ratios (>4.5:1).

## 2024-05-21 - Invisible UX Enhancements
**Learning:** Simple attributes like `autoComplete="email"` and `spellCheck={false}` significantly improve the user experience for email inputs without any visual change.
**Action:** Always check input attributes for specific data types to enable browser autofill and prevent unnecessary spellchecking.

## 2026-02-08 - Contextual Error Association
**Learning:** Providing error messages in a live region is good, but explicitly linking them to the input via `aria-describedby` ensures immediate context when the input is focused.
**Action:** Always use `aria-describedby` to associate validation messages with their form controls, especially when managing focus programmatically.
