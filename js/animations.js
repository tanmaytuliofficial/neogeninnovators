/**
 * Neo Gen Innovators - GSAP Motion & Interaction Engine
 * Features:
 * - GSAP Core & ScrollTrigger animations
 * - Staggered typography reveals
 * - Specular mouse-driven micro-border card glow
 * - Dynamic numerical stat counter transitions
 */

export function initMotion() {
  if (typeof gsap === 'undefined') {
    console.warn('[GSAP] Library not loaded');
    return;
  }

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Set default ease
  gsap.defaults({
    ease: 'power3.out',
    duration: 1
  });

  // 1. Initial Hero Staggered Reveal
  initHeroReveal();

  // 2. Navigation bar blur transition
  initNavScroll();

  // 3. ScrollTrigger for About & Founder Section
  initAboutSection();

  // 4. Interactive Card Spotlight / Specular Glow Tracking
  initCardSpotlights();

  // 5. Stat Counter Animations
  initCounters();

  // 6. Section Header Reveals
  initSectionHeaders();
}

/**
 * Hero Section entrance animation
 */
function initHeroReveal() {
  const tl = gsap.timeline({ delay: 0.15 });

  // Floating Pill Badge
  tl.fromTo(
    '.hero-badge',
    { opacity: 0, y: -20, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.8 }
  );

  // Big Staggered Headline Lines
  tl.fromTo(
    '.hero-title-line',
    { opacity: 0, y: 40, skewY: 2 },
    { opacity: 1, y: 0, skewY: 0, stagger: 0.12, duration: 1 },
    '-=0.5'
  );

  // Subtitle
  tl.fromTo(
    '.hero-subheadline',
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.9 },
    '-=0.6'
  );

  // Action Buttons
  tl.fromTo(
    '.hero-cta-btn',
    { opacity: 0, y: 20, scale: 0.96 },
    { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8 },
    '-=0.6'
  );

  // Stats Ticker
  tl.fromTo(
    '.hero-stats-panel',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1 },
    '-=0.5'
  );
}

/**
 * Sticky Navigation Bar elevation on scroll
 */
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 'top -40',
    onUpdate: (self) => {
      if (self.progress > 0) {
        nav.classList.add('bg-zinc-950/80', 'backdrop-blur-xl', 'border-zinc-800/80', 'shadow-2xl', 'shadow-black/50');
        nav.classList.remove('bg-transparent', 'border-transparent');
      } else {
        nav.classList.remove('bg-zinc-950/80', 'backdrop-blur-xl', 'border-zinc-800/80', 'shadow-2xl', 'shadow-black/50');
        nav.classList.add('bg-transparent', 'border-transparent');
      }
    }
  });
}

/**
 * About & Founder Vision scroll triggered animation
 */
function initAboutSection() {
  if (!document.querySelector('.about-container')) return;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-container',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });

  tl.fromTo(
    '.about-badge',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.6 }
  )
  .fromTo(
    '.about-heading',
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.8 },
    '-=0.4'
  )
  .fromTo(
    '.about-text',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.15, duration: 0.8 },
    '-=0.5'
  )
  .fromTo(
    '.founder-card',
    { opacity: 0, x: 40, scale: 0.97 },
    { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
    '-=0.7'
  )
  .fromTo(
    '.pillar-card',
    { opacity: 0, y: 35 },
    { opacity: 1, y: 0, stagger: 0.1, duration: 0.8 },
    '-=0.5'
  );
}

/**
 * Animate Team Cards after dynamic fetch completes
 */
export function animateTeamCards() {
  const cards = document.querySelectorAll('.team-card');
  if (!cards.length) return;

  gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 40,
      scale: 0.96
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: {
        each: 0.08,
        from: 'start'
      },
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#team-grid',
        start: 'top 85%'
      }
    }
  );

  // Re-bind mouse spotlight glow for newly injected cards
  initCardSpotlights();
}

/**
 * Dynamic Counter animation when scrolled into view
 */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  counters.forEach((counter) => {
    const rawTarget = counter.getAttribute('data-target') || counter.innerText;
    // Extract numeric portion and suffix (e.g. "500+" -> num: 500, suffix: "+", "$85K+" -> prefix: "$", num: 85, suffix: "K+")
    const match = rawTarget.match(/([^0-9]*)([0-9]+)([^0-9]*)/);
    
    if (match) {
      const prefix = match[1] || '';
      const targetVal = parseInt(match[2], 10);
      const suffix = match[3] || '';

      const obj = { val: 0 };

      gsap.to(obj, {
        val: targetVal,
        duration: 2.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 90%',
          once: true
        },
        onUpdate: () => {
          counter.innerText = `${prefix}${Math.floor(obj.val)}${suffix}`;
        }
      });
    }
  });
}

/**
 * Generic section header reveals
 */
function initSectionHeaders() {
  document.querySelectorAll('.section-reveal').forEach((sec) => {
    gsap.fromTo(
      sec,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

/**
 * Specular Cursor Spotlight Glow for high-end micro-borders
 * Creates an ultra-premium Linear/Stripe/Apple dark mode glow following mouse
 */
export function initCardSpotlights() {
  const cards = document.querySelectorAll('.glow-card');

  cards.forEach((card) => {
    // Avoid double attaching
    if (card.dataset.spotlightBound) return;
    card.dataset.spotlightBound = 'true';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
