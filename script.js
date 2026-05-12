// ============================================================
//  Know Your Rights — app.js
//  Handles topic search/filter and smooth scroll with highlight
// ============================================================

/**
 * filterTopics
 * Filters topic cards in real time based on the search input value.
 * Matches against data-keywords, the card heading, and description text.
 * @param {string} query - The current value of the search input
 */
function filterTopics(query) {
  const q     = query.toLowerCase().trim();
  const cards = document.querySelectorAll('#topics-grid article');
  let visible = 0;

  cards.forEach(card => {
    const keywords = card.dataset.keywords || '';
    const title    = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const desc     = card.querySelector('p')?.textContent.toLowerCase()  || '';
    const match    = !q || keywords.includes(q) || title.includes(q) || desc.includes(q);

    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });

  document.getElementById('no-results').classList.toggle('hidden', visible > 0);
}

/**
 * scrollToTopic
 * Smoothly scrolls to a topic card by id and briefly highlights it
 * with a teal focus ring so the user knows which card was targeted.
 * @param {string} id - The id attribute of the target article element
 */
function scrollToTopic(id) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  el.classList.add('topic-card-highlight');
  setTimeout(() => el.classList.remove('topic-card-highlight'), 2000);
}

const navToggle = document.querySelector('.nav-toggle');
const primaryMenu = document.getElementById('primary-menu');
const menuBackdrop = document.querySelector('.menu-backdrop');

function setMobileMenuState(isOpen) {
  if (!navToggle || !primaryMenu) return;

  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  primaryMenu.classList.toggle('is-open', isOpen);
  menuBackdrop?.classList.toggle('is-visible', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
}

if (navToggle && primaryMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    setMobileMenuState(!isOpen);
  });

  primaryMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMobileMenuState(false));
  });

  menuBackdrop?.addEventListener('click', () => {
    setMobileMenuState(false);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setMobileMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      setMobileMenuState(false);
    }
  });
}
