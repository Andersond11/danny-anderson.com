/**
 * Main JS — navigation interactions (mobile toggle + dropdown).
 * No frameworks or libraries required.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');

    // Mobile hamburger toggle
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      });
    }

    // Dropdown menus
    dropdownToggles.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = btn.closest('.nav-item--dropdown');
        const isOpen = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      document.querySelectorAll('.nav-item--dropdown.open').forEach((item) => {
        item.classList.remove('open');
        const btn = item.querySelector('.nav-dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    });
  });
})();
