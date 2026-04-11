/**
 * vanhkhuc.dev — Parallax Engine
 * Multi-layer parallax, floating animations, star system, theme toggle
 */

(function () {
  'use strict';

  // ============================
  // CONFIG
  // ============================
  const CONFIG = {
    parallaxIntensity: 1.0,
    mouseParallaxIntensity: 0.02,
    shootingStarInterval: [6000, 15000], // min/max ms
    starCount: 200,
    starMaxSize: 2.5,
    fpsTarget: 60,
  };

  // ============================
  // STATE
  // ============================
  let scrollY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let ticking = false;
  let heroRect = null;
  let isHeroVisible = true;

  // ============================
  // DOM REFS
  // ============================
  const hero = document.getElementById('hero');
  const starsCanvas = document.getElementById('starsCanvas');
  const layers = document.querySelectorAll('.parallax-layer[data-depth]');
  const themeToggle = document.getElementById('themeToggle');

  if (!hero) return;

  // ============================
  // PARALLAX ENGINE
  // ============================
  function updateParallax() {
    if (!isHeroVisible) return;

    const scrollProgress = Math.max(0, Math.min(1, window.scrollY / (hero.offsetHeight || 1)));

    // Lerp mouse position for smoothness
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    layers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth) || 0;
      const scrollOffset = scrollProgress * depth * 300 * CONFIG.parallaxIntensity;
      const mouseOffsetX = mouseX * depth * CONFIG.mouseParallaxIntensity * 50;
      const mouseOffsetY = mouseY * depth * CONFIG.mouseParallaxIntensity * 30;

      layer.style.transform = `translate3d(${mouseOffsetX}px, ${-scrollOffset + mouseOffsetY}px, 0)`;
    });

    ticking = false;
  }

  function requestParallaxUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  // Scroll listener
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    requestParallaxUpdate();
  }, { passive: true });

  // Mouse listener
  window.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    requestParallaxUpdate();
  }, { passive: true });

  // Visibility observer — disable parallax when hero is off-screen
  const heroObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      isHeroVisible = entry.isIntersecting;
    });
  }, { threshold: 0 });
  heroObserver.observe(hero);

  // Continuous mouse lerp for smooth feel
  function continuousUpdate() {
    if (isHeroVisible) {
      requestParallaxUpdate();
    }
    requestAnimationFrame(continuousUpdate);
  }
  requestAnimationFrame(continuousUpdate);


  // ============================
  // STAR SYSTEM (Canvas)
  // ============================
  let stars = [];
  let ctx = null;

  function initStars() {
    if (!starsCanvas) return;
    ctx = starsCanvas.getContext('2d');
    resizeStarsCanvas();

    stars = [];
    for (let i = 0; i < CONFIG.starCount; i++) {
      stars.push({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height * 0.7, // mostly upper portion
        size: Math.random() * CONFIG.starMaxSize + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  function resizeStarsCanvas() {
    if (!starsCanvas) return;
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
  }

  function drawStars(timestamp) {
    if (!ctx || !isHeroVisible) {
      requestAnimationFrame(drawStars);
      return;
    }

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (!isDark) {
      ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      requestAnimationFrame(drawStars);
      return;
    }

    ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);

    stars.forEach(star => {
      const twinkle = Math.sin(timestamp * star.twinkleSpeed + star.twinklePhase) * 0.4 + 0.6;
      const alpha = star.opacity * twinkle;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();

      // Subtle glow for larger stars
      if (star.size > 1.5) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${alpha * 0.15})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(drawStars);
  }

  window.addEventListener('resize', () => {
    resizeStarsCanvas();
    // Redistribute stars on resize
    stars.forEach(star => {
      star.x = Math.random() * starsCanvas.width;
      star.y = Math.random() * starsCanvas.height * 0.7;
    });
  });

  initStars();
  requestAnimationFrame(drawStars);


  // ============================
  // SHOOTING STARS (Dark Mode)
  // ============================
  function createShootingStar() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (!isDark || !isHeroVisible) {
      scheduleShootingStar();
      return;
    }

    // Remove existing
    const existing = hero.querySelector('.shooting-star');
    if (existing) existing.remove();

    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.top = `${Math.random() * 30 + 5}%`;
    star.style.left = `${Math.random() * 60 + 20}%`;

    const atmosphere = hero.querySelector('.atmosphere-layer');
    if (atmosphere) {
      atmosphere.appendChild(star);

      // Trigger animation
      requestAnimationFrame(() => {
        star.classList.add('active');
      });

      // Clean up
      setTimeout(() => {
        star.remove();
      }, 1500);
    }

    scheduleShootingStar();
  }

  function scheduleShootingStar() {
    const delay = CONFIG.shootingStarInterval[0] +
      Math.random() * (CONFIG.shootingStarInterval[1] - CONFIG.shootingStarInterval[0]);
    setTimeout(createShootingStar, delay);
  }

  scheduleShootingStar();


  // ============================
  // THEME TOGGLE
  // ============================
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('vk-theme', theme);
  }

  function initTheme() {
    const saved = localStorage.getItem('vk-theme');
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('vk-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  initTheme();


  // ============================
  // SCROLL INDICATOR FADE
  // ============================
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      const progress = window.scrollY / 200;
      scrollIndicator.style.opacity = Math.max(0, 0.5 - progress);
    }, { passive: true });
  }

})();
