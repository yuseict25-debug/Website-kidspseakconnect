/**
 * main.js
 * Handles shared components (Header, Footer) and interactions.
 * This script injects the navbar and footer into every page to avoid copy-pasting HTML.
 */

const NAV_HTML = `
<nav class="navbar">
  <div class="container nav-container">
    <a href="index.html" class="logo">
      <img src="assets/logo.png" alt="KidsSpeakConnect Logo" style="height: 50px; width: auto;">
      <span>KidsSpeakConnect</span>
    </a>
    <button class="mobile-menu-btn" aria-label="Toggle Menu">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </button>
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">Home</a></li>
      <li><a href="mission.html" class="nav-link">Mission</a></li>
      <li><a href="programs.html" class="nav-link">Programs</a></li>
      <li><a href="calendar.html" class="nav-link">Events</a></li>
      <li><a href="meet_the_team.html" class="nav-link">Team</a></li>
      <li><a href="blog.html" class="nav-link">Blog</a></li>
      <li><a href="contact.html" class="nav-link">Contact</a></li>
      <li><a href="apply.html" class="btn btn-primary">Apply Now</a></li>
    </ul>
  </div>
</nav>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <h3>KidsSpeakConnect</h3>
        <p>Fun & Practical English for Kids!</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <ul class="footer-links">
          <li><a href="mission.html">Mission & Values</a></li>
          <li><a href="programs.html">Programs</a></li>
          <li><a href="calendar.html">Event Schedule</a></li>
          <li><a href="meet_the_team.html">Our Team</a></li>
          <li><a href="apply.html">Join Us</a></li>
        </ul>
      </div>
      <div>
        <h3>Contact</h3>
        <ul class="footer-links">
          <li><a href="contact.html">Contact Form</a></li>
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

document.addEventListener('DOMContentLoaded', () => {
  // Inject Header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = NAV_HTML;
  }

  // Inject Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = FOOTER_HTML;
  }

  // Mobile Menu Logic
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Highlight active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.style.color = '#EE4B4B'; // Active Color (Red)
    }
  });
});
