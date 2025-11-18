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
  projectCards.forEach((card) => {
    const flipButtons = card.querySelectorAll(".flip-btn");
    flipButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        if (btn.classList.contains("project-toggle-back")) {
          card.classList.remove("flipped");
        } else {
          card.classList.add("flipped");
        }
      });
    });
  });

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

