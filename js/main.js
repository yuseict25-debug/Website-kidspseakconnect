/**
 * shared components and interactions
 * dynamic header/footer injection and language toggles.
 */

// Nav links and configs
const NAV_ITEMS = [
  { id: 'index', label: { en: 'Home', ja: 'ホーム' } },
  { id: 'mission', label: { en: 'Mission', ja: 'ミッション' } },
  { id: 'programs', label: { en: 'Programs', ja: 'プログラム' } },
  { id: 'calendar', label: { en: 'Events', ja: 'イベント' } },
  { id: 'meet_the_team', label: { en: 'Team', ja: 'チーム' } },
  { id: 'blog', label: { en: 'Blog', ja: 'ブログ' } },
  { id: 'contact', label: { en: 'Contact', ja: 'お問い合わせ' } },
  { id: 'apply', label: { en: 'Apply Now', ja: '応募する' }, isButton: true }
];

// Footer quick links config
const FOOTER_LINKS = [
  { id: 'mission', label: { en: 'Mission & Values', ja: 'ミッションと価値観' } },
  { id: 'programs', label: { en: 'Programs', ja: 'プログラム' } },
  { id: 'calendar', label: { en: 'Event Schedule', ja: 'イベントスケジュール' } },
  { id: 'meet_the_team', label: { en: 'Our Team', ja: 'チーム紹介' } },
  { id: 'apply', label: { en: 'Join Us', ja: '参加する' } }
];

// returns the filename after swapping language suffixes
function getLanguageToggleLinks(currentFilename) {
  const isJa = currentFilename.endsWith('-ja.html');
  let enLink, jaLink;

  if (isJa) {
    enLink = currentFilename.replace('-ja.html', '.html');
    jaLink = currentFilename;
  } else {
    enLink = currentFilename;
    jaLink = currentFilename.replace('.html', '-ja.html');
  }

  return { enLink, jaLink, isJa };
}

/**
 * Builds the HTML structure for the responsive navigation header. dont touch this part as much as you can its fragile 
 */
function renderNavbar(isJa, currentFilename, enLink, jaLink) {
  const navLinksMarkup = NAV_ITEMS.map(item => {
    const href = isJa ? `${item.id}-ja.html` : `${item.id}.html`;
    const label = isJa ? item.label.ja : item.label.en;

    if (item.isButton) {
      return `<li><a href="${href}" class="btn btn-primary" style="padding: 0.5rem 1rem;">${label}</a></li>`;
    }

    const isActive = currentFilename === href;
    const activeStyle = isActive ? ' style="color: #EE4B4B;"' : '';
    return `<li><a href="${href}" class="nav-link"${activeStyle}>${label}</a></li>`;
  }).join('\n');

  return `
<nav class="navbar">
  <div class="container nav-container">
    <a href="${isJa ? 'index-ja.html' : 'index.html'}" class="logo">
      <img src="assets/logo.png" alt="KidsSpeakConnect Logo" style="height: 50px; width: auto;">
      <span>KidsSpeakConnect</span>
    </a>
    
    <button class="mobile-menu-btn" aria-label="Toggle Menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>
    
    <ul class="nav-links">
      ${navLinksMarkup}
      <li class="nav-lang-switcher">
        <a href="${enLink}" class="${!isJa ? 'active' : ''}">EN</a>
        <span class="separator">|</span>
        <a href="${jaLink}" class="${isJa ? 'active' : ''}">JP</a>
      </li>
    </ul>
  </div>
</nav>
`;
}

/**
 * Builds the HTML structure for the footer.
 */
function renderFooter(isJa) {
  const brandDesc = isJa ? '子供のための楽しく実践的な英語！' : 'Fun & Practical English for Kids!';
  const quickLinksTitle = isJa ? 'クイックリンク' : 'Quick Links';
  const contactTitle = isJa ? 'お問い合わせ' : 'Contact';
  const contactFormLabel = isJa ? 'お問い合わせフォーム' : 'Contact Form';

  const quickLinksMarkup = FOOTER_LINKS.map(item => {
    const href = isJa ? `${item.id}-ja.html` : `${item.id}.html`;
    const label = isJa ? item.label.ja : item.label.en;
    return `<li><a href="${href}">${label}</a></li>`;
  }).join('\n');

  return `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h3>KidsSpeakConnect</h3>
        <p>${brandDesc}</p>
      </div>
      <div>
        <h3>${quickLinksTitle}</h3>
        <ul class="footer-links">
          ${quickLinksMarkup}
        </ul>
      </div>
      <div>
        <h3>${contactTitle}</h3>
        <ul class="footer-links">
          <li><a href="${isJa ? 'contact-ja.html' : 'contact.html'}">${contactFormLabel}</a></li>
          <li>kidsspeakconnect@gmail.com</li>
          <li>
             <a href="https://instagram.com/kidspeak.connect" target="_blank">Instagram</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="copyright">
      &copy; ${new Date().getFullYear()} KidsSpeakConnect. All rights reserved.
    </div>
  </div>
</footer>
`;
}

// Initialize header/footer dynamic layouts and register event listeners
document.addEventListener('DOMContentLoaded', () => {
  const currentFilename = window.location.pathname.split('/').pop() || 'index.html';
  const { enLink, jaLink, isJa } = getLanguageToggleLinks(currentFilename);

  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = renderNavbar(isJa, currentFilename, enLink, jaLink);
  }

  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = renderFooter(isJa);
  }

  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // handles dynamic redirect target for formsubmit 
  const nextField = document.getElementById('next-field');
  if (nextField) {
    const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    const origin = window.location.origin || (window.location.protocol + "//" + window.location.host);
    const thankYouPage = isJa ? 'thank_you-ja.html' : 'thank_you.html';
    nextField.value = `${origin}${basePath}/${thankYouPage}`;
  }
});
