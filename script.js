document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-links");
  const backToTop = document.getElementById("backToTop");
  const yearEl = document.getElementById("year");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      target.scrollIntoView({ behavior: "smooth" });
      navList.classList.remove("open");
    });
  });

  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const projectCards = document.querySelectorAll(".project-card");
  const focus = document.getElementById("project-focus");
  const focusCard = focus ? focus.querySelector(".project-focus-card") : null;
  const focusContent = focus ? focus.querySelector(".project-focus-content") : null;
  const focusClose = focus ? focus.querySelector(".project-focus-close") : null;

  if (focus && focusCard && focusContent && focusClose) {
    document.querySelectorAll(".project-toggle-front").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const card = btn.closest(".project-card");
        if (!card) return;

        const backBody = card.querySelector(".project-back-body");
        projectCards.forEach((c) => c.classList.remove("flipped"));
        card.classList.add("flipped");

        if (backBody) {
          focusContent.innerHTML = backBody.innerHTML;
        }

        focus.classList.remove("hidden");
        setTimeout(() => {
          focus.classList.add("show");
        }, 10);

        focus.dataset.activeCard = [...projectCards].indexOf(card).toString();
      });
    });

    const closeFocus = () => {
      const activeIndex = focus.dataset.activeCard;
      if (activeIndex !== undefined) {
        const card = projectCards[Number(activeIndex)];
        if (card) {
          card.classList.remove("flipped");
        }
      }

      focus.classList.remove("show");
      setTimeout(() => {
        focus.classList.add("hidden");
      }, 300);
    };

    document.querySelectorAll(".project-toggle-back").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        closeFocus();
      });
    });

    focusClose.addEventListener("click", closeFocus);

    focus.addEventListener("click", (e) => {
      if ((e.target).classList.contains("project-focus-backdrop")) {
        closeFocus();
      }
    });
  }

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Fade-in on scroll
  const sections = document.querySelectorAll(".section");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          sectionObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => {
    if (section.id === "home") {
      section.classList.add("visible");
    } else {
      sectionObserver.observe(section);
    }
  });

  // Theme toggle
  const themeToggle = document.querySelector(".theme-toggle");
  const root = document.documentElement;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
    const iconSpan = themeToggle.querySelector(".theme-toggle-icon");
    if (iconSpan) {
      iconSpan.textContent = savedTheme === "light" ? "☀️" : "🌙";
    }
  } else {
    root.setAttribute("data-theme", "dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);

      const iconSpan = themeToggle.querySelector(".theme-toggle-icon");
      if (iconSpan) {
        iconSpan.textContent = next === "light" ? "☀️" : "🌙";
      }
    });
  }
});

