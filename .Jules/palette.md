# Palette's Journal 🎨

> "Good UX is invisible - it just works"

This journal tracks critical UX and accessibility learnings, surprising user behaviors, and reusable patterns.

## 2024-05-21 - Standard Colors & Contrast

**Learning:** Standard Material Design colors like Red 500 (`#f44336`) and Green 500 (`#4caf50`) may not meet WCAG AA contrast requirements on white backgrounds for normal text.
**Action:** Use darker shades (700/800 series) like `#d32f2f` (Red) and `#2e7d32` (Green) for text to ensure sufficient contrast ratios (>4.5:1).

## 2024-05-21 - Invisible UX Enhancements

**Learning:** Simple attributes like `autoComplete="email"` and `spellCheck={false}` significantly improve the user experience for email inputs without any visual change.
**Action:** Always check input attributes for specific data types to enable browser autofill and prevent unnecessary spellchecking.

## 2024-05-22 - Error Focus & Clarity

**Learning:** Users often miss error messages if focus isn't managed. Focusing the input on error and clearing the error state on type creates a much smoother correction loop.
**Action:** Implement 'focus-on-error' and 'clear-on-type' patterns for all form validation flows.

## 2026-03-05 - Disabled State Visual Feedback

**Learning:** Relying solely on the default HTML `disabled` attribute can sometimes leave elements looking active, which might confuse users trying to interact with a busy form.
**Action:** Enhance disabled form inputs and buttons with explicit visual cues like `opacity: 0.7` and `cursor: not-allowed` to make non-interactive states immediately apparent.
