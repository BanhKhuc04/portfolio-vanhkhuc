/**
 * vanhkhuc.dev — i18n Engine
 * Handles language switching between EN and VI
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'vk-lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED = ['en', 'vi'];

  let currentLang = DEFAULT_LANG;

  // ============================
  // INIT
  // ============================
  function init() {
    // Load saved language
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED.includes(saved)) {
      currentLang = saved;
    }

    // Apply translations
    applyTranslations(currentLang);
    updateToggleUI(currentLang);

    // Bind toggle events
    bindEvents();
  }

  // ============================
  // APPLY TRANSLATIONS
  // ============================
  function applyTranslations(lang) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) return;

    const dict = window.TRANSLATIONS[lang];

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        // Check if element has child elements we should preserve
        const target = el.getAttribute('data-i18n-target');
        if (target === 'placeholder') {
          el.placeholder = dict[key];
        } else if (target === 'aria-label') {
          el.setAttribute('aria-label', dict[key]);
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang === 'vi' ? 'vi' : 'en';

    // Set data attribute for CSS hooks
    document.documentElement.setAttribute('data-lang', lang);

    currentLang = lang;
  }

  // ============================
  // TOGGLE UI
  // ============================
  function updateToggleUI(lang) {
    // Update all toggle buttons
    document.querySelectorAll('.lang-toggle-text').forEach(el => {
      el.textContent = lang.toUpperCase();
    });

    // Update dropdown active states
    document.querySelectorAll('.lang-option').forEach(el => {
      const optionLang = el.getAttribute('data-lang');
      if (optionLang === lang) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }

  // ============================
  // SWITCH LANGUAGE
  // ============================
  function switchLanguage(lang) {
    if (!SUPPORTED.includes(lang) || lang === currentLang) return;

    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
    updateToggleUI(lang);

    // Close dropdown
    document.querySelectorAll('.lang-dropdown').forEach(d => {
      d.classList.remove('open');
    });
  }

  // ============================
  // BIND EVENTS
  // ============================
  function bindEvents() {
    // Toggle dropdown
    document.querySelectorAll('.lang-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = btn.closest('.lang-switcher').querySelector('.lang-dropdown');
        if (dropdown) {
          dropdown.classList.toggle('open');
        }
      });
    });

    // Language options
    document.querySelectorAll('.lang-option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = option.getAttribute('data-lang');
        switchLanguage(lang);
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      document.querySelectorAll('.lang-dropdown').forEach(d => {
        d.classList.remove('open');
      });
    });
  }

  // ============================
  // PUBLIC API
  // ============================
  window.VKi18n = {
    init,
    switchLanguage,
    getCurrentLang: () => currentLang,
  };

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
