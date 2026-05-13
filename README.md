# Know Your Rights

**Plain-English federal and state rights education for justice-impacted individuals, families, and the organizations that support them.**

[![Deploy to GitHub Pages](https://github.com/Jozewski/know-your-federal-rights/actions/workflows/pages.yml/badge.svg)](https://github.com/Jozewski/know-your-federal-rights/actions/workflows/pages.yml)

---

## Table of Contents

- [Overview](#overview)
- [Live Site](#live-site)
- [Features](#features)
- [Topics Covered](#topics-covered)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Accessibility](#accessibility)
- [Legal Disclaimer](#legal-disclaimer)
- [Maintainer](#maintainer)

---

## Overview

Know Your Rights is a free, static educational website that surfaces plain-language rights information in one place. It is built for people in reentry, on parole, on probation, or otherwise navigating the legal system — as well as for the families and legal aid organizations that support them.

The site covers all seven core rights topics at the federal level and provides state-specific versions of those same topics for all 50 states. All content is structured, data-driven, and designed to be expanded without changing the underlying experience.

---

## Live Site

[https://jozewski.github.io/know-your-federal-rights](https://jozewski.github.io/know-your-federal-rights)

---

## Features

- **Federal / State jurisdiction toggle** — switch between a federal view and a state-specific view from the hero section
- **50-state flag selector** — alphabetical grid of all 50 state flags; select any state to load its specific content
- **Seven rights topic cards** — consistent card layout for both federal and state content, rendered from a structured data model
- **Real-time search** — filters topic cards as you type with keyword matching
- **Quick-jump topic pills** — one-click shortcuts to any topic card with smooth scroll and highlight feedback
- **Responsive layout** — mobile-first design with a hamburger navigation menu and reflowing content at all screen sizes
- **Data-driven content layer** — all federal and state content lives in `content-data.js`, keeping structure and presentation cleanly separated
- **No build step** — runs directly in any browser with no dependencies or tooling required

---

## Topics Covered

| Topic | Description |
|---|---|
| Voting Rights Restoration | How and when voting rights are restored after a conviction |
| Expungement | Eligibility and process for clearing or sealing a criminal record |
| Housing Rights | Fair chance housing protections and tenant rights |
| Employment Rights | Ban-the-box laws, background check rules, and hiring protections |
| Police Interactions | Rights during stops, searches, and arrests |
| Parole | Conditions, supervision rules, and violation procedures |
| Probation | Conditions, supervision rules, and violation procedures |

Each topic is covered at the federal level and with a state-specific version for all 50 states.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, responsive grid, flexbox) |
| Behavior | Vanilla JavaScript (ES6+) |
| Content | Structured data module (`content-data.js`) |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

No frameworks. No dependencies. No build step.

---

## Project Structure

```
know-your-federal-rights/
├── .github/
│   └── workflows/
│       └── pages.yml       — GitHub Pages deployment workflow
├── content-data.js         — all federal and state content, topic definitions, and state metadata
├── index.html              — single-page application shell and semantic structure
├── script.js               — jurisdiction switching, state rendering, search, scroll, and navigation logic
├── styles.css              — complete visual system, responsive layout, and component styles
├── favicon.svg             — brand favicon (SVG)
├── favicon.ico             — legacy favicon (ICO)
├── changes.md              — AI collaboration log and development decision record
└── README.md               — this file
```

---

## Local Development

No installation or build step is required.

**Option 1 — Open directly in a browser:**

```bash
git clone https://github.com/Jozewski/know-your-federal-rights.git
cd know-your-federal-rights
# Open index.html in your browser
```

**Option 2 — Live reload with a local server (recommended for active development):**

If you have [VS Code](https://code.visualstudio.com) with the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension:

1. Open the project folder in VS Code
2. Right-click `index.html` and select **Open with Live Server**

Or with Node.js:

```bash
npx serve .
```

The site will be available at `http://localhost:3000` (or the port your server assigns).

---

## Deployment

The site deploys automatically to GitHub Pages via the workflow in `.github/workflows/pages.yml`.

**Automatic deployment** triggers on every push to the `main` branch.

**Manual deployment** can be triggered from the Actions tab in the GitHub repository.

**First-time setup:**

1. Push the repository to GitHub
2. Go to **Settings → Pages**
3. Set the source to **GitHub Actions**
4. Push to `main` — the workflow handles the rest

The live URL will be `https://<your-github-username>.github.io/know-your-federal-rights/`.

---

## Accessibility

This project is built with accessibility as a baseline requirement, not an afterthought.

- Semantic HTML5 landmarks and heading hierarchy throughout
- Screen-reader-only labels (`sr-only`) on interactive controls that lack visible text
- `aria-label`, `aria-pressed`, `aria-live`, and `role` attributes on dynamic regions and controls
- Keyboard navigation support — the mobile menu closes on `Escape`
- Tap-outside-to-close behavior on the mobile navigation overlay
- Focus-visible outlines on all interactive elements
- Sufficient color contrast across all text and background combinations

---

## Legal Disclaimer

This website provides general educational information about federal and state law only. It is **not legal advice** and does not create an attorney-client relationship. Laws and their interpretation may change. The information on this site may not reflect the most current legal developments.

For advice about your specific situation, consult a licensed attorney or a free legal aid organization in your area.

Free legal aid resource: [LawHelp.org](https://www.lawhelp.org)

---

## Maintainer

**Joanne Liszewski**

&copy; 2026 Know Your Rights
