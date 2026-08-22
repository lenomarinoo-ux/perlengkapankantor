/* ============================================================
   SCROLL ANIMATIONS - Stature Corporate Furnishings
   Lightweight scroll-triggered animations using IntersectionObserver.
   Only uses transform & opacity (GPU-composited) — zero LCP impact.
   ============================================================ */

(function () {
  "use strict";

  // ---- Inject Animation Styles ----
  var css = document.createElement("style");
  css.textContent = `
    /* ---- Base hidden state (before animation) ---- */
    .scf-anim {
      opacity: 0;
      will-change: transform, opacity;
      transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                  transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }

    /* ---- Variants ---- */
    .scf-anim-up    { transform: translateY(30px); }
    .scf-anim-down  { transform: translateY(-30px); }
    .scf-anim-left  { transform: translateX(30px); }
    .scf-anim-right { transform: translateX(-30px); }
    .scf-anim-scale { transform: scale(0.95); }
    .scf-anim-fade  { transform: none; }

    /* ---- Visible state ---- */
    .scf-anim.scf-visible {
      opacity: 1;
      transform: none;
    }

    /* ---- Stagger delays (children) ---- */
    .scf-stagger > .scf-anim:nth-child(1) { transition-delay: 0s; }
    .scf-stagger > .scf-anim:nth-child(2) { transition-delay: 0.08s; }
    .scf-stagger > .scf-anim:nth-child(3) { transition-delay: 0.16s; }
    .scf-stagger > .scf-anim:nth-child(4) { transition-delay: 0.24s; }
    .scf-stagger > .scf-anim:nth-child(5) { transition-delay: 0.32s; }
    .scf-stagger > .scf-anim:nth-child(6) { transition-delay: 0.40s; }

    /* ---- Hover micro-interactions ---- */
    .scf-hover-lift {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .scf-hover-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px -8px rgba(80, 44, 18, 0.15);
    }

    /* ---- Respect reduced motion ---- */
    @media (prefers-reduced-motion: reduce) {
      .scf-anim {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
      }
      .scf-hover-lift:hover {
        transform: none;
      }
    }
  `;
  document.head.appendChild(css);

  // ---- Wait for DOM ----
  document.addEventListener("DOMContentLoaded", function () {
    applyAnimationClasses();
    initObserver();
    initScrollTop();
  });

  // ---- Automatically tag elements for animation ----
  function applyAnimationClasses() {
    // Section headers — fade up
    tag(".scf-section-header", "scf-anim scf-anim-up");
    tag(".scf-section-title", "scf-anim scf-anim-up");
    tag(".scf-section-subtitle", "scf-anim scf-anim-up");
    tag(".scf-section-badge", "scf-anim scf-anim-up");

    // Hero content
    tag(".scf-hero-badge", "scf-anim scf-anim-up");
    tag(".scf-hero-title", "scf-anim scf-anim-up");
    tag(".scf-hero-desc", "scf-anim scf-anim-up");
    tag(".scf-hero-actions", "scf-anim scf-anim-up");

    // Value proposition cards — stagger parent
    tagParentStagger(".scf-value-grid");
    tag(".scf-value-item", "scf-anim scf-anim-up");

    // Bento / collection cards — scale in
    tag(".scf-bento-card", "scf-anim scf-anim-scale scf-hover-lift");

    // Package cards
    tag(".scf-package-card", "scf-anim scf-anim-up scf-hover-lift");
    tag(".scf-package-card-highlight", "scf-anim scf-anim-up scf-hover-lift");

    // Testimonial cards
    tag(".scf-testimonial-card", "scf-anim scf-anim-up scf-hover-lift");

    // About section
    tag(".scf-about-text", "scf-anim scf-anim-right");
    tag(".scf-about-image", "scf-anim scf-anim-left");

    // Why choose us — boxes
    tagAll(".scf-bg-surface.scf-rounded-soft", "scf-anim scf-anim-up scf-hover-lift");

    // FAQ accordion
    tag(".scf-faq-accordion", "scf-anim scf-anim-up");

    // CTA banner
    tag(".scf-cta-banner", "scf-anim scf-anim-fade");

    // Footer
    tag(".scf-footer", "scf-anim scf-anim-fade");

    // Stagger grids: testimonial grid, row g-4
    tagParentStagger(".scf-testimonial-grid");
    tagChildrenStagger(".row.g-4", "[class*='col-']", "scf-anim scf-anim-up");
  }

  // ---- Helper: add classes to first match ----
  function tag(selector, classes) {
    var els = document.querySelectorAll(selector);
    for (var i = 0; i < els.length; i++) {
      addClasses(els[i], classes);
    }
  }

  // ---- Helper: add classes to all matches ----
  function tagAll(selector, classes) {
    var els = document.querySelectorAll(selector);
    for (var i = 0; i < els.length; i++) {
      addClasses(els[i], classes);
    }
  }

  // ---- Helper: mark parent as stagger container ----
  function tagParentStagger(selector) {
    var els = document.querySelectorAll(selector);
    for (var i = 0; i < els.length; i++) {
      els[i].classList.add("scf-stagger");
    }
  }

  // ---- Helper: stagger children within parent ----
  function tagChildrenStagger(parentSelector, childSelector, classes) {
    var parents = document.querySelectorAll(parentSelector);
    for (var i = 0; i < parents.length; i++) {
      parents[i].classList.add("scf-stagger");
      var children = parents[i].querySelectorAll(childSelector);
      for (var j = 0; j < children.length; j++) {
        addClasses(children[j], classes);
      }
    }
  }

  // ---- Helper: add space-separated classes ----
  function addClasses(el, classString) {
    var arr = classString.split(" ");
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) el.classList.add(arr[i]);
    }
  }

  // ---- IntersectionObserver ----
  function initObserver() {
    // Fallback for very old browsers
    if (!("IntersectionObserver" in window)) {
      var all = document.querySelectorAll(".scf-anim");
      for (var i = 0; i < all.length; i++) {
        all[i].classList.add("scf-visible");
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.classList.add("scf-visible");
            observer.unobserve(entries[i].target); // animate once only
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    var targets = document.querySelectorAll(".scf-anim");
    for (var i = 0; i < targets.length; i++) {
      observer.observe(targets[i]);
    }
  }

  // ---- Scroll to Top Button ----
  function initScrollTop() {
    var scrollTopBtn = document.getElementById("scf-scroll-top");

    // Auto-create button if missing from DOM
    if (!scrollTopBtn) {
      scrollTopBtn = document.createElement("button");
      scrollTopBtn.id = "scf-scroll-top";
      scrollTopBtn.className = "scf-scroll-top";
      scrollTopBtn.setAttribute("aria-label", "Kembali ke atas");
      scrollTopBtn.setAttribute("title", "Kembali ke atas");
      scrollTopBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"/>
        </svg>
      `;
      var waFab = document.querySelector(".scf-wa-fab");
      if (waFab && waFab.parentNode) {
        waFab.parentNode.insertBefore(scrollTopBtn, waFab);
      } else {
        document.body.appendChild(scrollTopBtn);
      }
    }

    function toggleScrollTop() {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("scf-show");
      } else {
        scrollTopBtn.classList.remove("scf-show");
      }
    }

    window.addEventListener("scroll", toggleScrollTop, { passive: true });
    toggleScrollTop();

    scrollTopBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
})();
