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

---

## File Structure

```
know-your-federal-rights/
├── .github/
│   └── workflows/
│       └── pages.yml   — GitHub Pages deployment workflow
├── index.html          — main resource page
├── script.js           — search, scroll highlight, and mobile nav logic
├── styles.css          — all project styling and responsive layout rules
├── README.md           — project documentation
└── changes.md          — this file
```

---

*Updated throughout Phase 1 development.*
