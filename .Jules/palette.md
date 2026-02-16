# Palette's Journal 🎨

> "Good UX is invisible - it just works"

This journal tracks critical UX and accessibility learnings, surprising user behaviors, and reusable patterns.

## 2024-05-21 - Standard Colors & Contrast
**Learning:** Standard Material Design colors like Red 500 (`#f44336`) and Green 500 (`#4caf50`) may not meet WCAG AA contrast requirements on white backgrounds for normal text.
**Action:** Use darker shades (700/800 series) like `#d32f2f` (Red) and `#2e7d32` (Green) for text to ensure sufficient contrast ratios (>4.5:1).

## 2024-05-21 - Invisible UX Enhancements
**Learning:** Simple attributes like `autoComplete="email"` and `spellCheck={false}` significantly improve the user experience for email inputs without any visual change.
**Action:** Always check input attributes for specific data types to enable browser autofill and prevent unnecessary spellchecking.

## 2024-05-22 - Error Focus & Description
**Learning:** When displaying error messages asynchronously (e.g., after API call), simply rendering the message is insufficient for screen reader users and keyboard navigation. Using `useId` for stable linking via `aria-describedby` and programmatically shifting focus to the input ensures users immediately perceive and can correct the error. Also, `useEffect` is reliable for triggering focus on state changes compared to inline callbacks which might run before DOM updates.
**Action:** Always pair form validation errors with `aria-describedby` on the input and shift focus to the invalid field. Use `useId` for generating unique IDs to avoid collisions.
