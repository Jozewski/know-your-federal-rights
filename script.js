// ============================================================
//  Know Your Rights — script.js
//  Behavior layer for:
//  - federal/state view switching
//  - reviewed-state selection
//  - topic rendering and search
//  - smooth scrolling
//  - mobile navigation interactions
//
//  Content itself lives in content-data.js so this file can stay
//  focused on UI behavior as more states are added over time.
// ============================================================

const appState = {
  jurisdiction: 'federal',
  stateCode: '',
  searchQuery: '',
  isSelectingState: false
};

const heroEyebrow = document.getElementById('hero-eyebrow');
const heroHeading = document.getElementById('hero-heading');
const heroCopy = document.getElementById('hero-copy');
const topicsHeading = document.getElementById('topics-heading');
const topicsDescription = document.getElementById('topics-description');
const topicsGrid = document.getElementById('topics-grid');
const topicsEmpty = document.getElementById('topics-empty');
const noResults = document.getElementById('no-results');
const stateSelectorGroup = document.getElementById('state-selector-group');
const stateSelectorLabel = document.getElementById('state-selector-label');
const stateSelectorBackButton = document.getElementById('state-selector-back');
const stateFlagGrid = document.getElementById('state-flag-grid');
const stateSelectorHelp = document.getElementById('state-selector-help');
const jurisdictionButtons = document.querySelectorAll('[data-jurisdiction]');
const searchInput = document.getElementById('search-input');
const searchSubmitButton = document.getElementById('search-submit');
const mainContent = document.getElementById('topics');
const heroSection = document.querySelector('.hero-section');
const disclaimerSection = document.getElementById('disclaimer');
const footer = document.querySelector('footer');
const newTabScreenReaderText = '<span class="sr-only"> (opens in a new tab)</span>';
const menuManagedRegions = [heroSection, mainContent, disclaimerSection, footer].filter(Boolean);
let lastFocusedElementBeforeMenu = null;
let activeHighlightedTopicCard = null;
let topicHighlightObserver = null;
let hasHighlightedTopicCardBeenVisible = false;

function getPublicStates() {
  return siteContent.states.filter(state => state.enabled && state.reviewStatus === 'reviewed');
}

function getSelectedState() {
  return getPublicStates().find(state => state.code === appState.stateCode) || null;
}

function isStateView() {
  return appState.jurisdiction === 'state';
}

function isStateSelectionOpen() {
  return isStateView() && (!appState.stateCode || appState.isSelectingState);
}

function getContextCopy() {
  if (!isStateView()) {
    return siteContent.heroCopy.federal;
  }

  const selectedState = getSelectedState();
  if (!selectedState) {
    return siteContent.heroCopy.state;
  }

  return {
    eyebrow: selectedState.name + ' Rights Education',
    heading: 'Know Your ' + selectedState.name + ' Rights',
    description: 'Explore the same seven rights topics with state-specific guidance and resources for ' + selectedState.name + '.'
  };
}

function getSectionCopy() {
  if (!isStateView()) {
    return siteContent.sectionCopy.federal;
  }

  const selectedState = getSelectedState();
  if (!selectedState) {
    return siteContent.sectionCopy.state;
  }

  return {
    title: selectedState.name + ' Rights Topics',
    description: 'Select a topic to explore state-specific rights guidance and resources for ' + selectedState.name + '.'
  };
}

function renderContextCopy() {
  const heroContext = getContextCopy();
  const sectionContext = getSectionCopy();

  heroEyebrow.textContent = heroContext.eyebrow;
  heroHeading.textContent = heroContext.heading;
  heroCopy.textContent = heroContext.description;
  topicsHeading.textContent = sectionContext.title;
  topicsDescription.textContent = sectionContext.description;
}

function renderStateSelector() {
  if (!isStateView()) {
    stateSelectorGroup.classList.add('hidden');
    stateSelectorGroup.classList.remove('is-collapsed');
    stateSelectorLabel.textContent = 'Choose a state';
    stateSelectorBackButton.classList.add('hidden');
    stateFlagGrid.innerHTML = '';
    stateSelectorHelp.textContent = '';
    return;
  }

  const publicStates = getPublicStates();
  const selectedState = getSelectedState();
  const showSelectionGrid = isStateSelectionOpen();
  stateSelectorGroup.classList.remove('hidden');
  stateSelectorGroup.classList.toggle('is-collapsed', Boolean(selectedState) && !showSelectionGrid);
  stateSelectorBackButton.classList.toggle('hidden', !(selectedState && !showSelectionGrid));
  if (selectedState && !showSelectionGrid) {
    const flagCode = 'us-' + selectedState.code.toLowerCase();
    stateSelectorLabel.innerHTML =
      '<span class="selected-state-summary">' +
        '<img src="https://flagcdn.com/w40/' + flagCode + '.png" alt=\"\" class="selected-state-flag" width="40" height="27" loading="lazy">' +
        '<span>Selected state: ' + selectedState.name + '</span>' +
      '</span>';
  } else {
    stateSelectorLabel.textContent = 'Choose a state';
  }

  stateFlagGrid.innerHTML = publicStates.map(state => {
    const isSelected = state.code === appState.stateCode;
    const flagCode = 'us-' + state.code.toLowerCase();
    return '<button type="button" class="state-flag-tile' + (isSelected ? ' is-selected' : '') + '" data-state-code="' + state.code + '" aria-pressed="' + isSelected + '" aria-label="' + state.name + '">' +
      '<img src="https://flagcdn.com/w40/' + flagCode + '.png" alt="" class="state-flag-img" width="20" height="14" loading="lazy">' +
      '<span class="state-flag-name">' + state.name + '</span>' +
      '</button>';
    }).join('');

  stateFlagGrid.classList.toggle('hidden', !showSelectionGrid);

  if (!appState.stateCode) {
    stateSelectorHelp.textContent = siteContent.stateSelectorCopy.prompt;
  } else {
    stateSelectorHelp.textContent = selectedState
      ? 'Showing state-specific rights guidance for ' + selectedState.name + '.'
      : siteContent.stateSelectorCopy.prompt;
  }
}

function getActiveEntries() {
  if (!isStateView()) {
    return siteContent.entries.filter(entry => entry.jurisdiction === 'federal');
  }

  const selectedState = getSelectedState();
  if (!selectedState) {
    return [];
  }

  return siteContent.entries.filter(entry =>
    entry.jurisdiction === 'state' &&
    entry.stateCode === selectedState.code &&
    entry.reviewStatus === 'reviewed'
  );
}

function filterEntries(entries) {
  const query = appState.searchQuery.toLowerCase().trim();
  if (!query) {
    return entries;
  }

  return entries.filter(entry => {
    const title = siteContent.topicDefinitions[entry.topicId].title.toLowerCase();
    const summary = entry.summary.toLowerCase();
    const keywords = entry.keywords.toLowerCase();
    return title.includes(query) || summary.includes(query) || keywords.includes(query);
  });
}

function getBadgeClass(topicId) {
  return siteContent.topicDefinitions[topicId].badgeVariant === 'supervision'
    ? 'text-xs bg-amber-100 text-amber-700 font-medium uppercase tracking-wide px-2 py-0.5 rounded-full'
    : 'text-xs text-teal-600 font-medium uppercase tracking-wide';
}

function renderResourceItem(resource) {
  if (resource.url) {
    return '<li><a href="' + resource.url + '" target="_blank" rel="noopener noreferrer" class="resource-link resource-item flex items-start gap-2 text-sm text-teal-600 transition-colors"><span class="mt-0.5 flex-shrink-0" aria-hidden="true">&#x1F517;</span><span>' + resource.label + newTabScreenReaderText + '</span></a></li>';
  }

  return '<li><span class="resource-note resource-item flex items-start gap-2 text-sm text-gray-500"><span class="mt-0.5 flex-shrink-0" aria-hidden="true">&#x23F3;</span><span>' + resource.label + '</span></span></li>';
}

// Cards are rendered from shared content data so federal and state views
// stay visually consistent while switching the underlying dataset.
function renderTopicCard(entry) {
  const topic = siteContent.topicDefinitions[entry.topicId];
  const resourcesHeading = isStateView() ? 'Reviewed Resources' : 'Federal Resources';
  const learnMoreLink = entry.learnMoreUrl
    ? '<a href="' + entry.learnMoreUrl + '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors">Learn More' + newTabScreenReaderText + ' <span aria-hidden="true">&#8594;</span></a>'
    : '<p class="resource-note text-sm">State-specific source links will appear here after subject matter expert review.</p>';

  return '<article id="' + entry.topicId + '" class="topic-card bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200" data-keywords="' + entry.keywords + '" tabindex="-1">' +
    '<div class="flex items-start gap-4 mb-4">' +
      '<div class="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0" aria-hidden="true">' + topic.icon + '</div>' +
      '<div><h3 class="font-semibold text-gray-900 text-base">' + topic.title + '</h3><span class="' + getBadgeClass(entry.topicId) + '">' + entry.label + '</span></div>' +
    '</div>' +
    '<p class="text-sm text-gray-600 leading-relaxed mb-5">' + entry.summary + '</p>' +
    '<div class="border-t border-gray-100 pt-4 mb-5"><p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">' + resourcesHeading + '</p><ul class="space-y-2 list-none p-0 m-0">' +
      entry.resources.map(renderResourceItem).join('') +
    '</ul></div>' +
    learnMoreLink +
  '</article>';
}

function renderTopics() {
  const activeEntries = getActiveEntries();
  const filteredEntries = filterEntries(activeEntries);

  clearTopicCardHighlight();
  topicsEmpty.classList.add('hidden');
  topicsEmpty.textContent = '';
  noResults.classList.add('hidden');

  if (activeEntries.length === 0) {
    topicsGrid.innerHTML = '';
    if (isStateView()) {
      topicsEmpty.textContent = getPublicStates().length === 0
        ? siteContent.stateSelectorCopy.empty
        : siteContent.stateSelectorCopy.prompt;
      topicsEmpty.classList.remove('hidden');
    }
    return;
  }

  if (filteredEntries.length === 0) {
    topicsGrid.innerHTML = '';
    noResults.textContent = isStateView() ? siteContent.noResultsCopy.state : siteContent.noResultsCopy.federal;
    noResults.classList.remove('hidden');
    return;
  }

  topicsGrid.innerHTML = filteredEntries.map(renderTopicCard).join('');
}

function renderApp() {
  renderContextCopy();
  renderStateSelector();
  renderTopics();
}

function clearTopicCardHighlight() {
  if (topicHighlightObserver) {
    topicHighlightObserver.disconnect();
    topicHighlightObserver = null;
  }

  if (activeHighlightedTopicCard) {
    activeHighlightedTopicCard.classList.remove('topic-card-highlight-pop');
    activeHighlightedTopicCard.classList.remove('topic-card-highlight');
    activeHighlightedTopicCard = null;
  }

  hasHighlightedTopicCardBeenVisible = false;
}

function triggerTopicCardPop(target) {
  if (!target) {
    return;
  }

  target.classList.remove('topic-card-highlight-pop');
  void target.offsetWidth;
  target.classList.add('topic-card-highlight-pop');
}

function observeHighlightedTopicCard(target) {
  if (!('IntersectionObserver' in window)) {
    hasHighlightedTopicCardBeenVisible = true;
    triggerTopicCardPop(target);
    return;
  }

  topicHighlightObserver = new IntersectionObserver(entries => {
    const entry = entries[0];
    if (!entry) {
      return;
    }

    if (entry.intersectionRatio >= 0.65 && entry.target === activeHighlightedTopicCard) {
      hasHighlightedTopicCardBeenVisible = true;
    }

    if (entry.intersectionRatio >= 0.65 && entry.target === activeHighlightedTopicCard && !entry.target.classList.contains('topic-card-highlight-pop')) {
      triggerTopicCardPop(entry.target);
    }

    if (hasHighlightedTopicCardBeenVisible && entry.intersectionRatio < 0.35) {
      clearTopicCardHighlight();
    }
  }, {
    threshold: [0, 0.35, 0.65, 1]
  });

  topicHighlightObserver.observe(target);
}

function highlightTopicCard(target) {
  if (!target) {
    return;
  }

  clearTopicCardHighlight();
  activeHighlightedTopicCard = target;
  target.classList.add('topic-card-highlight');
  focusTarget(target);
  observeHighlightedTopicCard(target);
}

function focusTarget(target) {
  if (!target || typeof target.focus !== 'function') {
    return;
  }

  target.focus({ preventScroll: true });
}

function scrollMainContentIntoView() {
  if (!mainContent) {
    return;
  }

  mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getFirstVisibleTopicCard() {
  return topicsGrid.querySelector('.topic-card');
}

function resetInitialScrollPosition() {
  if (window.location.hash) {
    return;
  }

  window.scrollTo(0, 0);
}

function setJurisdiction(jurisdiction) {
  appState.jurisdiction = jurisdiction;
  if (jurisdiction === 'federal') {
    appState.stateCode = '';
    appState.isSelectingState = false;
  } else if (!appState.stateCode) {
    appState.isSelectingState = true;
  }

  jurisdictionButtons.forEach(button => {
    const isActive = button.dataset.jurisdiction === jurisdiction;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  renderApp();
}

/**
 * filterTopics
 * Re-renders the active dataset using the current search string.
 * @param {string} query - The current value of the search input
 */
function filterTopics(query) {
  appState.searchQuery = query;
  renderTopics();
}

function submitTopicSearch() {
  const trimmedQuery = appState.searchQuery.trim();
  if (!trimmedQuery) {
    return;
  }

  scrollMainContentIntoView();

  const firstVisibleTopicCard = getFirstVisibleTopicCard();
  if (!firstVisibleTopicCard) {
    focusTarget(mainContent);
    return;
  }

  focusTarget(firstVisibleTopicCard);
  highlightTopicCard(firstVisibleTopicCard);
}

function clearTopicSearch() {
  appState.searchQuery = '';
  if (searchInput) {
    searchInput.value = '';
  }
  renderTopics();
}

/**
 * scrollToTopic
 * Smoothly scrolls to a topic card by id and keeps it highlighted while visible.
 * @param {string} id - The id attribute of the target article element
 */
function scrollToTopic(id) {
  let el = document.getElementById(id);
  if (!el && appState.searchQuery.trim()) {
    clearTopicSearch();
    el = document.getElementById(id);
  }

  if (!el) {
    return false;
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  focusTarget(el);
  highlightTopicCard(el);
  return true;
}

jurisdictionButtons.forEach(button => {
  button.addEventListener('click', () => {
    setJurisdiction(button.dataset.jurisdiction || 'federal');
  });
});

stateFlagGrid?.addEventListener('click', event => {
  const tile = event.target.closest('.state-flag-tile');
  if (!tile) return;
  const code = tile.dataset.stateCode;
  if (!code) return;
  appState.stateCode = code;
  appState.isSelectingState = false;
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

stateSelectorBackButton?.addEventListener('click', () => {
  appState.isSelectingState = true;
  renderApp();
});

searchInput?.addEventListener('keydown', event => {
  if (event.key !== 'Enter') {
    return;
  }

  event.preventDefault();
  submitTopicSearch();
});

searchSubmitButton?.addEventListener('click', () => {
  submitTopicSearch();
});

renderApp();

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

window.addEventListener('load', resetInitialScrollPosition);
window.addEventListener('pageshow', resetInitialScrollPosition);

// ---------------------------------
// Global Internal Anchor Navigation
// ---------------------------------
// Applies consistent smooth scrolling for all in-page hash links.
// Topic cards receive highlight treatment; non-card targets do not.

const internalHashLinks = document.querySelectorAll('a[href^="#"]');

internalHashLinks.forEach(link => {
  link.addEventListener('click', event => {
    const targetHash = link.getAttribute('href') || '';
    const targetId = targetHash.replace('#', '').trim();
    if (!targetId) return;

    if (siteContent.topicDefinitions[targetId]) {
      event.preventDefault();
      if (scrollToTopic(targetId)) {
        history.replaceState(null, '', '#' + targetId);
      }
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    event.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    focusTarget(targetEl);

    history.replaceState(null, '', '#' + targetId);
  });
});

// ----------------------
// Mobile Menu Management
// ----------------------

const navToggle = document.querySelector('.nav-toggle');
const primaryMenu = document.getElementById('primary-menu');
const menuBackdrop = document.querySelector('.menu-backdrop');

function setManagedRegionsInert(isInert) {
  menuManagedRegions.forEach(region => {
    region.inert = isInert;
    region.setAttribute('aria-hidden', String(isInert));
  });
}

function getMenuFocusableElements() {
  if (!navToggle || !primaryMenu) {
    return [];
  }

  return [navToggle].concat(Array.from(primaryMenu.querySelectorAll('a')));
}

function setMobileMenuState(isOpen, options) {
  if (!navToggle || !primaryMenu) return;
  const settings = options || {};

  if (isOpen) {
    lastFocusedElementBeforeMenu = document.activeElement;
  }

  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  primaryMenu.classList.toggle('is-open', isOpen);
  primaryMenu.setAttribute('aria-hidden', String(!isOpen));
  menuBackdrop?.classList.toggle('is-visible', isOpen);
  menuBackdrop?.setAttribute('aria-hidden', String(!isOpen));
  document.body.classList.toggle('menu-open', isOpen);
  setManagedRegionsInert(isOpen);

  if (isOpen && settings.moveFocus !== false) {
    const focusableMenuItems = getMenuFocusableElements();
    focusTarget(focusableMenuItems[1] || focusableMenuItems[0] || navToggle);
  }

  if (!isOpen && settings.restoreFocus !== false) {
    if (lastFocusedElementBeforeMenu && document.contains(lastFocusedElementBeforeMenu)) {
      focusTarget(lastFocusedElementBeforeMenu);
    } else {
      focusTarget(navToggle);
    }
  }
}

// Wire toggle, backdrop, keyboard, and viewport handlers.
if (navToggle && primaryMenu) {
  primaryMenu.setAttribute('aria-hidden', 'true');

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    setMobileMenuState(!isOpen);
  });

  primaryMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMobileMenuState(false, { restoreFocus: false, moveFocus: false }));
  });

  menuBackdrop?.addEventListener('click', () => {
    setMobileMenuState(false);
  });

  document.addEventListener('keydown', event => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';

    if (event.key === 'Escape' && isOpen) {
      event.preventDefault();
      setMobileMenuState(false);
      return;
    }

    if (event.key === 'Tab' && isOpen) {
      const focusableMenuItems = getMenuFocusableElements();
      if (!focusableMenuItems.length) {
        return;
      }

      const firstItem = focusableMenuItems[0];
      const lastItem = focusableMenuItems[focusableMenuItems.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        focusTarget(lastItem);
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        focusTarget(firstItem);
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      setMobileMenuState(false, { restoreFocus: false, moveFocus: false });
    }
  });
}
