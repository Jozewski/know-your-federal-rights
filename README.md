# Know Your Rights

Know Your Rights is a static educational website that collects plain-language federal rights information in one place. It is designed for justice-impacted individuals, people on supervision, families, and anyone who needs a clearer starting point for understanding federal rights and finding reputable legal resources.

## Current State

This project is currently a front-end-only site built with HTML, CSS, and vanilla JavaScript. It is ready to run locally without a build step and is configured to deploy to GitHub Pages through GitHub Actions.

The site currently includes:

- A responsive header with a mobile hamburger menu
- A hero section with search and quick-jump topic buttons
- Seven federal rights topic cards
- Real-time topic filtering
- Smooth scroll-to-topic navigation with highlight feedback
- A legal disclaimer section
- A footer with topic and federal resource links

## Topics Covered

- Voting Rights Restoration
- Expungement
- Housing Rights
- Employment Rights
- Police Interactions
- On Parole
- On Probation

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Pages
- GitHub Actions for deployment

## Project Structure

```text
know-your-federal-rights/
|-- .github/
|   `-- workflows/
|       `-- pages.yml
|-- changes.md
|-- index.html
|-- README.md
|-- script.js
`-- styles.css
```

## File Overview

- `index.html` contains the page structure and content for the site
- `styles.css` contains the full visual system, responsive layout rules, and mobile navigation styling
- `script.js` handles search filtering, topic jump behavior, and mobile menu interactions
- `changes.md` tracks AI-assisted project changes and developer decisions
- `.github/workflows/pages.yml` deploys the site to GitHub Pages

## Running Locally

There is no install step and no build step.

1. Clone the repository.
2. Open `index.html` in a browser.

If you want live reload during development, you can also open the folder in VS Code and use a local static server extension, but it is not required.

## Deployment

The site is configured to deploy with GitHub Pages using the workflow in `.github/workflows/pages.yml`.

Deployment runs when:

- You push to the repository's default branch
- You manually trigger the workflow from GitHub Actions

To publish the site:

1. Push the repository to GitHub.
2. In the repository settings, enable GitHub Pages with the source set to GitHub Actions.
3. Push changes to the default branch.

## Accessibility and UX Notes

The current site includes:

- Semantic HTML structure
- Screen-reader-only labels where needed
- Keyboard-close support for the mobile menu with `Escape`
- A clickable backdrop for mobile navigation
- Responsive layout behavior for smaller screens

## Project Purpose

The goal of this project is to make federal rights information easier to find and easier to understand. It is intentionally simple in its current form: a fast, static, low-friction resource page that can be expanded over time.

## Legal Disclaimer

This website provides general educational information about federal law only. It is not legal advice and does not create an attorney-client relationship. Laws and interpretations change over time. Anyone using this site should consult a licensed attorney or legal aid organization for advice about their specific situation.

Free legal aid resource: [LawHelp.org](https://www.lawhelp.org)

## Maintainer

Joanne Liszewski
