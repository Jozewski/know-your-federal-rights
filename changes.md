# CHANGES.md — Know Your Rights
## AI Collaboration Change Log
**Project:** know-your-federal-rights  
**Developer:** Joanne Liszewski  
**Session:** Phase 1 — May 2026

---

| # | What AI Generated | What I Modified / Directed | Why I Changed It |
|---|---|---|---|
| 1 | Full `index.html` with navbar, hero section, 7 topic cards, disclaimer, and footer | Accepted the structure as designed | Layout matched the wireframe spec I provided |
| 2 | JavaScript embedded inline inside a `<script>` block at the bottom of `index.html` | Directed AI to separate JS into its own file | Separation of concerns — JS belongs in its own file per project standards |
| 3 | Separate JS file created as `app.js` | Renamed to `script.js` | Standard naming convention for this project |
| 4 | HTML file named `know-your-rights.html` | Renamed to `index.html` | Standard entry point naming convention |
| 5 | `README.md` with project description, tech stack, file structure, getting started guide, feature list, and roadmap | Accepted content — no changes required | Accurately reflected the project as a solo build |
| 6 | README and HTML footer credited "Banyan Labs LLC" as the organization | Removed all Banyan Labs references from both files | This is a solo project — no organizational affiliation |
| 7 | AI suggested five repo name options | Selected `know-your-rights-federal` | Clear, descriptive, and sets a naming convention for future state-specific repos |
| 8 | AI drafted three repo description options | Accepted the GitHub one-liner and README intro paragraph | Both matched the tone and scope of the project |
| 9 | Tailwind loaded from the CDN with custom config and a small inline `<style>` block inside `index.html` | Directed AI to remove the CDN dependency and move all styling into `styles.css` | Prevent production CDN warnings and keep project CSS in a dedicated stylesheet |
| 10 | Search highlight relied on Tailwind `ring-*` utility classes in JavaScript | Replaced with a local `topic-card-highlight` class in `styles.css` | Keeps the project independent from Tailwind and centralizes styling in one file |
| 11 | README local setup instructions used the wrong repository name and a macOS-only `open index.html` command | Rewrote the local run section to use the correct folder name and browser-based static-site instructions | Makes the documentation platform-neutral and accurate for the current repo |
| 12 | Header navigation stayed in a desktop horizontal layout at all screen sizes | Directed AI to implement a mobile-first hamburger menu with responsive layout updates across the hero, cards, disclaimer, footer, and link wrapping | Ensures the site is truly responsive and usable on small screens |
| 13 | Mobile nav links (`Topics`, `Disclaimer`, `Find Legal Aid`) were visible as a sticky block instead of being controlled by the hamburger button | Removed conflicting utility classes from the primary nav list and let the menu state be controlled by dedicated mobile nav CSS | Prevents duplicate-looking navigation and ensures links appear as true hamburger menu items on mobile |
| 14 | Mobile menu opened abruptly with no overlay context | Added animated open/close behavior (slide + fade) to the mobile menu panel and introduced a dim backdrop layer behind the menu | Improves mobile UX clarity and makes menu state feel intentional and easier to follow |
| 15 | Mobile menu could only be closed from the toggle button, nav links, or Escape key | Added backdrop click handling in `script.js` and synchronized backdrop visibility with menu open/close state | Gives users a standard tap-outside-to-close behavior on mobile |
| 16 | `README.md` still reflected older setup details and stale stack notes | Rewrote README to match current project state: static HTML/CSS/JS build, current feature set, accurate structure, and GitHub Pages workflow deployment | Keeps onboarding and deployment documentation aligned with the real codebase |
| 17 | Footer/internal hash links still used mixed behavior and could jump inconsistently across sections | Directed AI to unify in-page anchor handling so header and footer links both use smooth scroll with consistent routing logic | Removes inconsistent navigation behavior and improves UX predictability |
| 18 | Topic card links and non-card section links were not handled through one shared internal-link flow | Applied the same global hash-link behavior across all internal `#` links and kept URL hash updates after navigation | Ensures consistent deep-link behavior and supports reliable section sharing/bookmarking |
| 19 | `index.html` had limited structural documentation for major page regions | Directed AI to add concise, industry-style comments for major sections and key sub-sections without over-commenting | Improves maintainability and readability for future edits and handoffs |
| 20 | Commenting style between JavaScript and CSS was not fully aligned with the updated HTML documentation approach | Added the same descriptive, best-practice comment style to `script.js` and `styles.css` without altering behavior | Creates consistent documentation standards across the codebase while preserving functionality |
| 21 | Project branding did not yet include a linked favicon set in document metadata | Added brand-matching favicon assets and linked them in the HTML head for SVG and ICO support | Improves polish and browser tab identity across modern and legacy favicon handling |
| 22 | Federal rights cards were hard-coded directly in `index.html` | Directed AI to refactor the site into a data-driven render model using `content-data.js` plus shared rendering logic in `script.js` | Makes federal/state expansion maintainable and keeps one consistent card system |
| 23 | Site experience only supported a federal view | Directed AI to add a Federal/State jurisdiction toggle, dynamic hero/section copy, and conditional state-selection UI | Creates one shared experience for federal and state guidance without changing the theme |
| 24 | Early state support only covered an initial rollout and still hid reviewed state content behind draft/review gating | Updated the state metadata so reviewed states could render publicly in the selector and card view | State content had been reviewed and was ready to be shown |
| 25 | Expanded 50-state source data still built only the rollout subset and was missing several state content blocks | Directed AI to merge the broader dataset, patch the build logic, add the missing state records, and complete all 50 states alphabetically | Ensures the state layer is complete and the selector/render system can support all states consistently |
| 26 | State mode kept the full selection grid visible even after a user chose a state | Directed AI to collapse the state grid after selection and add a `Back to Selection Grid` control | Keeps the state view cleaner while still making it easy to switch states |
| 27 | Collapsed selected-state view only showed the state name as text | Added the selected state's flag beside the selected-state label | Makes the active state easier to recognize at a glance |
| 28 | Federal selection used the same active pill styling but had no flag cue | Added the U.S. flag to the active Federal pill | Keeps the federal control visually consistent with the new state-selection cues |
| 29 | State selector rendered as a fixed 5-column grid of large flag tiles that did not scale well | Directed AI to replace the tile grid with a flex-wrap pill layout matching the Federal pill style | Improves mobile usability by allowing pills to reflow naturally at any scr
een width while keeping the selection UI visually consistent with the existing jurisdiction switcher |

---

## Phase 2 — Before / After Accessibility Audit

| What AI Generated | What I Modified / Directed | Why I Changed It |
|---|---|---|
| Color contrast | Low-contrast text remained in key places, including resource subheadings, footer legal/meta text, and the teal CTA button styling. | Updated those styles to accessible contrast values so the site now passes the automated WCAG AA contrast check. |
| State selector semantics | The state picker used `role="listbox"` / `role="option"` even though it behaved like a set of clickable pills, not a true listbox widget. | Reworked it to a grouped button-based pattern with pressed-state semantics that matches the actual interaction model. |
| Skip navigation and focus movement | There was no skip link, and quick jumps / internal anchor links only scrolled visually without moving keyboard focus to the destination. | Added a skip link to main content and moved focus to the target section or topic card after in-page navigation. |
| Mobile menu accessibility | The mobile menu opened visually, but focus was not moved into it, not contained while open, and not restored when the menu closed; background content also stayed interactive. | Added focus entry, focus containment, focus restoration, background inertness, and scroll locking so the mobile menu behaves like an accessible modal-style navigation panel. |
| External link context | Links opening in a new tab gave no screen-reader warning, creating an unexpected context change. | Added screen-reader-only text announcing when key external links open in a new tab. |
| Focus visibility support | Some interactive elements had inconsistent or limited visible focus treatment outside the existing button styles. | Added clearer `:focus-visible` outlines for links and quick-action controls to strengthen keyboard usability across the interface. |

---

## File Structure

```
know-your-federal-rights/
├── .github/
│   └── workflows/
│       └── pages.yml   — GitHub Pages deployment workflow
├── content-data.js     — structured federal/state content and state metadata
├── index.html          — main resource page
├── script.js           — jurisdiction switching, state rendering, search, scrolling, and mobile nav logic
├── styles.css          — all project styling and responsive layout rules
├── README.md           — project documentation
└── changes.md          — this file
```

---

*Updated throughout Phase 1 development.*
