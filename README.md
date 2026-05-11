# Know Your Rights — Federal Rights Education Resource

A free, plain-English resource for people navigating the federal legal system. Whether you are in reentry, on supervision, or supporting a loved one, this site brings together trusted federal resources on voting rights restoration, expungement, housing, employment, police interactions, parole, and probation — all in one place. No legal jargon. No paywalls. Just your rights, clearly explained.

---

## About This Project

Know Your Rights will become a capstone project built by **Joanne Liszewski** 

This is **Phase 1** of a three-phase roadmap. The current build is a static resource link page covering federal law across seven core topics. Future phases will introduce an AI-powered Q&A assistant, user accounts, state-level content, and an organizational portal for reentry programs and case managers.

---

## Live Topics

| Topic | Federal Law Coverage |
|---|---|
| Voting Rights Restoration | Federal framework, state dependency, resources |
| Expungement | Federal limits, clemency, record-clearing options |
| Housing Rights | Fair Housing Act, HUD guidance on criminal records |
| Employment Rights | EEOC Title VII, Ban the Box, DOL reentry resources |
| Police Interactions | Fourth and Fifth Amendment rights, Miranda, search and seizure |
| On Parole | Federal supervised release conditions and rights |
| On Probation | Federal probation conditions, search rights, violation triggers |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN) |
| Scripting | Vanilla JavaScript |
| Accessibility | WCAG 2.1 AA |
| Hosting | GitHub Pages (via GitHub Actions) |

---

## Project Structure

```
know-your-rights-federal/
├── index.html      # Main resource page — all seven topic cards
├── script.js       # Search/filter and scroll-highlight logic
└── README.md       # You are here
```

---

## Getting Started

No build step required. This project runs entirely in the browser.

**To run locally:**

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/know-your-rights-federal.git
   ```

2. Open `index.html` in your browser
   ```bash
   cd know-your-rights-federal
   open index.html
   ```

That is it. No dependencies to install, no server to run.

---

## Deploying to GitHub Pages

This repository is set up to deploy the site automatically with **GitHub Actions**.

1. Push this repository to GitHub.
2. In **Settings -> Pages**, set **Source** to **GitHub Actions**.
3. Push to your default branch.

GitHub will publish the site from the repository root using the workflow at `.github/workflows/pages.yml`.

If your repository is named `know-your-federal-rights`, the site URL will be:

`https://<your-github-username>.github.io/know-your-federal-rights/`

---

## Features

- **Live search** — filter all seven topic cards in real time by keyword
- **Quick-jump navigation** — pill buttons in the hero scroll directly to any topic card
- **Curated federal resource links** — every link points to a primary federal source (DOJ, EEOC, HUD, U.S. Courts, ACLU, Brennan Center)
- **Supervision-specific callouts** — Parole and Probation cards are visually distinguished with dedicated badges
- **Legal disclaimer** — prominent disclaimer section with a direct link to free federal legal aid
- **Accessible** — semantic HTML, ARIA labels, keyboard navigable, screen reader compatible

---

## Roadmap

### Phase 1 — Current Build
Static resource link page. Seven federal topics. Curated federal links. WCAG 2.1 AA compliant.

### Phase 2 — AI Q&A Assistant
Per-topic AI chat powered by Google Gemini API, grounded in Michael Peacock's knowledge base. Context-injected responses. Non-lawyer disclaimer on every answer.

### Phase 3 — Full Platform
React + TypeScript frontend. Node/Express backend. MongoDB Atlas for content storage. User accounts. State-level content starting with Arizona. Organizational portal for reentry programs.

---

## Contributing

This project is in active development. If you would like to suggest a federal resource link, report an inaccurate description, or propose a new topic, please open an issue.

---

## Legal Disclaimer

This website provides general educational information about federal law only. It is **not legal advice** and does not create an attorney-client relationship. Laws and their interpretation may change. Always consult a licensed attorney or a federal legal aid organization for advice specific to your personal situation.

Free federal legal aid: [lawhelp.org](https://www.lawhelp.org)

---

## Built By

**Joanne Liszewski** — Full-Stack Developer
