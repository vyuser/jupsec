document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
     MOBILE NAV
  ================================================== */

  const mobileToggle = document.getElementById("mobileToggle");

  const mobileNav = document.getElementById("mobileNav");

  const navbar = document.querySelector(".navbar");

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
      mobileNav.classList.toggle("active");

      const isOpen = mobileNav.classList.contains("active");

      mobileToggle.innerHTML = isOpen ? "✕" : "☰";

      document.body.style.overflow = isOpen ? "hidden" : "auto";
    });

    document.querySelectorAll(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active");

        mobileToggle.innerHTML = "☰";

        document.body.style.overflow = "auto";
      });
    });
  }

  /* ==================================================
     MOBILE DROPDOWN
  ================================================== */

  const dropdowns = document.querySelectorAll(".mobile-dropdown");

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".mobile-dropdown-btn");

    if (btn) {
      btn.addEventListener("click", () => {
        dropdown.classList.toggle("active");
      });
    }
  });

  /* ==================================================
     NAVBAR BG
  ================================================== */

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.style.background =
        window.scrollY > 20 ? "rgba(6,8,22,0.96)" : "rgba(6,8,22,0.72)";
    });
  }

  /* ==================================================
   PURE JS SHOWCASE STICKY
================================================== */

  const showcaseSection = document.querySelector(".product-showcase");

  const showcaseVisual = document.querySelector(".showcase-image-card");

  const showcaseItems = document.querySelectorAll(".showcase-item");

  const showcaseImage = document.getElementById("showcaseImage");

  const showcaseImages = {
    1: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1400",

    2: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1400",

    3: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400",

    4: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400",
  };

  if (showcaseSection && showcaseVisual && window.innerWidth > 1100) {
    window.addEventListener("scroll", () => {
      const sectionTop = showcaseSection.offsetTop;

      const sectionHeight = showcaseSection.offsetHeight;

      const scrollY = window.scrollY;

      const stopPoint = sectionTop + sectionHeight - window.innerHeight;

      /* ---------- FIXED IMAGE ---------- */

      if (scrollY > sectionTop && scrollY < stopPoint) {
        showcaseVisual.classList.add("fixed");

        showcaseVisual.classList.remove("bottom");
      } else if (scrollY >= stopPoint) {
        showcaseVisual.classList.remove("fixed");

        showcaseVisual.classList.add("bottom");
      } else {
        showcaseVisual.classList.remove("fixed");

        showcaseVisual.classList.remove("bottom");
      }

      /* ---------- ACTIVE CONTENT ---------- */
      showcaseItems.forEach((item) => {
        const rect = item.getBoundingClientRect();

        const middle = window.innerHeight / 2;

        if (rect.top <= middle && rect.bottom >= middle) {
          showcaseItems.forEach((i) => i.classList.remove("active"));

          item.classList.add("active");

          const imageId = item.dataset.image;

          showcaseImage.style.opacity = 0;

          setTimeout(() => {
            showcaseImage.src = showcaseImages[imageId];

            showcaseImage.style.opacity = 1;
          }, 150);
        }
      });
    });
  }

  /* ==================================================
   FAQ ACCORDION
================================================== */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    const answer = item.querySelector(".faq-answer");

    if (item.classList.contains("active")) {
      answer.style.maxHeight = answer.scrollHeight + "px";
    }

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");

        faq.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");

        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* =====================================================
AI FLOW MODAL
===================================================== */

  const aiFlowImage = document.getElementById("aiFlowImage");

  const imageModal = document.getElementById("imageModal");

  const closeModal = document.getElementById("closeModal");

  /* OPEN MODAL */

  aiFlowImage.addEventListener("click", () => {
    imageModal.classList.add("active");

    document.body.style.overflow = "hidden";
  });

  /* CLOSE BUTTON */

  closeModal.addEventListener("click", () => {
    imageModal.classList.remove("active");

    document.body.style.overflow = "auto";
  });

  /* CLOSE OUTSIDE */

  imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) {
      imageModal.classList.remove("active");

      document.body.style.overflow = "auto";
    }
  });

  /* ESC KEY */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      imageModal.classList.remove("active");

      document.body.style.overflow = "auto";
    }
  });

  // onloaded
});
