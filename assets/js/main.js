// OneConsumer Documentation - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = mainNav?.contains(event.target);
    const isClickOnToggle = menuToggle?.contains(event.target);

    if (!isClickInsideNav && !isClickOnToggle && mainNav?.classList.contains('active')) {
      mainNav.classList.remove('active');
      menuToggle?.classList.remove('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});
