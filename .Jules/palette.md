# Palette's Journal 🎨

> "Good UX is invisible - it just works"

This journal tracks critical UX and accessibility learnings, surprising user behaviors, and reusable patterns.

## 2024-05-21 - Standard Colors & Contrast

**Learning:** Standard Material Design colors like Red 500 (`#f44336`) and Green 500 (`#4caf50`) may not meet WCAG AA contrast requirements on white backgrounds for normal text.
**Action:** Use darker shades (700/800 series) like `#d32f2f` (Red) and `#2e7d32` (Green) for text to ensure sufficient contrast ratios (>4.5:1).

## 2024-05-21 - Invisible UX Enhancements

**Learning:** Simple attributes like `autoComplete="email"` and `spellCheck={false}` significantly improve the user experience for email inputs without any visual change.
**Action:** Always check input attributes for specific data types to enable browser autofill and prevent unnecessary spellchecking.

## 2026-02-11 - Form Error Focus & Recovery

**Learning:** Users are often frustrated when they have to manually find and click an input field after a form submission error. Additionally, persisting error states while the user is correcting the input creates confusion.
**Action:** Programmatically shift focus to the first invalid input on submission error, and clear error states/messages immediately when the user starts typing to correct the value.

## 2026-02-11 - Accessible Form Error Messages

**Learning:** Visually displaying an error message next to an input is not enough for screen reader users. The error message needs to be programmatically associated with the input field.
**Action:** Use `React.useId()` to generate a unique ID for the error message element, and reference this ID in the input's `aria-describedby` attribute when an error is present.
