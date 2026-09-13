# Workflow: UI/UX & Real Browser QA Governance (`uiux-browser-qa-governance`)

## Purpose
Govern frontend design quality and prove that a browser-facing UI actually works, rather than inferring correctness from unit tests or static markup alone.

## Inputs
- UI/UX requirements, wireframes, or design references.
- A running local build or preview of the target application (when one exists).
- Target breakpoints and accessibility requirements (WCAG level, keyboard/screen-reader expectations).

## Execution Steps
1. **Design Governance Review**: Evaluate proposed UI/UX against existing design conventions in the target repository (spacing, component reuse, naming). Flag ad-hoc styling that diverges from established patterns.
2. **Delegate Visual Prototyping**: When an interactive mockup, diagram, or widget preview is useful to validate a design direction before implementation, delegate rendering to the `generative-ui` skill.
3. **Launch and Drive the Real Application**: Start the actual dev server or preview build (never only read source) and exercise the golden path plus edge cases in a real browser.
4. **Responsive & Accessibility Pass**: Verify layout at mobile/tablet/desktop breakpoints and check keyboard navigation, focus order, color contrast, and semantic markup.
5. **Classify Results Honestly**: Record each check as `Passed`, `Failed`, `Blocked` (no browser-capable UI reachable), or `Not Run`. Never substitute a static code read or unit test for a real browser check.

## Outputs
- A UI/UX review noting divergences from existing design conventions.
- A real-browser QA report (functional, responsive, accessibility) with an honest classification per check, or an explicit `Blocked`/`Not Run` statement when no browser-capable UI exists to test.

## Delegation Rule
This workflow does not duplicate `generative-ui`; it invokes that skill only for interactive prototyping/preview artifacts, and performs the actual functional/responsive/accessibility verification itself against the real running application.
