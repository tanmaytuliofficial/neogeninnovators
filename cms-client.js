/**
 * NeoGen Universal CMS Client
 * Automatically syncs texts, quotes, and content across all pages in real-time.
 */
(function () {
  const CMS_DEFAULTS = {
    heroTagline: "Building the Next Generation of Student Builders.",
    heroBoxHeadline: "A HARDWARE BUILDER NETWORK ACROSS INDIA.",
    heroBoxSubtitle: "BUILT BY INNOVATORS, DESIGNED TO SHIP PHYSICAL SILICON.",
    heroDescription: "NeoGen is a private builders community where passionate students collaborate on hardware hackathons, IoT labs, robotics, edge silicon, and open-source innovation.",
    heroCtaExplore: "Explore Team →",
    heroCtaJourney: "Our Journey",
    founderTag: "",
    founderLine1: "HI, MY NAME IS",
    founderName: "RAUSHAN KUMAR.",
    founderLine3: "I AM THE FOUNDER OF",
    founderLine4: "NEO GEN INNOVATORS.",
    founderQuote: "\"We don't build slide decks or pitch imaginary AI wrappers. At Neo Gen Innovators, our mission is to unite passionate builders across India to solder custom microcontrollers, write bare-metal RTOS firmware, and deploy quantized neural models directly onto physical silicon.\"",
    founderSigName: "Raushan Kumar",
    founderSigTitle: "FOUNDER & CHIEF ARCHITECT — NEO GEN INNOVATORS",
    founderBadge: "DIRECTOR",
    founderAvatarUrl: "raushan-avatar-nobg.png",
    teamHeroHeadline: "THE MINDS BEHIND NEOGEN.",
    teamHeroSubtitle: "We are a collective of hardcore hardware hackers, embedded engineers, and physical computing builders across India. We don't just write theoretical code — we design boards, flash silicon, and ship cyber-physical systems.",
    teamStat1Num: "1,200+",
    teamStat1Label: "Student Builders",
    teamStat2Num: "28+",
    teamStat2Label: "Hardware Sprints",
    teamStat3Num: "15+",
    teamStat3Label: "Silicon Tapeouts",
    teamStat4Num: "100%",
    teamStat4Label: "Student-Run & Open",
    teamFounderManifesto: "\"Engineering college culture across the country is trapped in rigid textbooks, stale theory, and beginner web tutorials. We built Neo Gen Innovators to break those walls. When you solder your first custom PCB, debug a high-speed bus with a logic analyzer, and flash your own RTOS firmware, you aren't just a student anymore — you are an innovator shipping real silicon.\"",
    ctaHeading: "WANT TO BUILD WITH US?",
    ctaBody: "If you have ideas for real electronics, embedded firmware, robotic platforms, or hardware hackathons, there is a workbench waiting for you in NeoGen.",
    footerCopyright: "© 2026 Neo Gen Innovators. All rights reserved."
  };

  function updateTeamStatsLayout(data) {
    const strip = document.getElementById('team-stats-strip');
    const c1 = document.getElementById('stat-card-1');
    const c2 = document.getElementById('stat-card-2');
    const c3 = document.getElementById('stat-card-3');
    const c4 = document.getElementById('stat-card-4');
    if (!strip || !c1 || !c2 || !c3 || !c4) return;

    const has3 = !!(data && data.teamStat3Num && data.teamStat3Num.trim());
    const has4 = !!(data && data.teamStat4Num && data.teamStat4Num.trim());

    if (!has3 && !has4) {
      strip.className = "grid grid-cols-2 gap-4 p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md max-w-2xl";
      c3.classList.add('hidden');
      c4.classList.add('hidden');
      c2.classList.remove('border-r', 'border-zinc-800/60');
    } else {
      strip.className = "grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md";
      c2.classList.add('border-r', 'border-zinc-800/60');
      if (has3) c3.classList.remove('hidden'); else c3.classList.add('hidden');
      if (has4) c4.classList.remove('hidden'); else c4.classList.add('hidden');
    }
  }

  function applyContent(data) {
    if (!data) return;
    document.querySelectorAll('[data-cms]').forEach(el => {
      const key = el.getAttribute('data-cms');
      if (data[key] !== undefined && data[key] !== null) {
        if (el.tagName === 'IMG') {
          el.src = data[key];
        } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.value = data[key];
        } else {
          el.textContent = data[key];
        }
      }
    });
    updateTeamStatsLayout(data);
  }

  function syncCMS() {
    let localUpdatedAt = 0;
    // 1. Immediately apply from cache if available (0ms instant render)
    try {
      const cached = localStorage.getItem('neogen_site_content');
      if (cached) {
        const parsed = JSON.parse(cached);
        localUpdatedAt = parsed._updatedAt || parsed._clientUpdatedAt || 0;
        applyContent(parsed);
      }
    } catch (e) {}

    // 2. Fetch fresh from server API
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && Object.keys(data).length) {
          const serverUpdatedAt = data._serverUpdatedAt || data._updatedAt || 0;
          // Never overwrite newer local user edits with stale static git assets!
          if (localUpdatedAt && localUpdatedAt > serverUpdatedAt) {
            return;
          }
          applyContent(data);
          localStorage.setItem('neogen_site_content', JSON.stringify(data));
        }
      })
      .catch(() => {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncCMS);
  } else {
    syncCMS();
  }

  // Live real-time sync across open tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'neogen_site_content' && e.newValue) {
      try {
        applyContent(JSON.parse(e.newValue));
      } catch (err) {}
    }
  });

  // Expose global helper for admin
  window.NeoGenCMS = {
    applyContent,
    syncCMS,
    DEFAULTS: CMS_DEFAULTS
  };
})();
