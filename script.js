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
  const detailsPanel = document.getElementById("project-details");
  const detailsContent = detailsPanel?.querySelector(".project-details-content");
  const detailsCloseBtn = detailsPanel?.querySelector(".project-details-close");

  const closeDetailsPanel = () => {
    projectCards.forEach((card) => card.classList.remove("flipped"));
    if (detailsPanel) {
      detailsPanel.classList.add("hidden");
    }
  };

  projectCards.forEach((card) => {
    const frontBtn = card.querySelector(".project-toggle-front");
    const backBtn = card.querySelector(".project-toggle-back");
    const backBody = card.querySelector(".project-back-body");

    if (frontBtn) {
      frontBtn.addEventListener("click", (event) => {
        event.preventDefault();
        projectCards.forEach((c) => c.classList.remove("flipped"));
        card.classList.add("flipped");
        if (detailsContent && backBody) {
          detailsContent.innerHTML = backBody.innerHTML;
        }
        if (detailsPanel) {
          detailsPanel.classList.remove("hidden");
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener("click", (event) => {
        event.preventDefault();
        card.classList.remove("flipped");
        if (detailsPanel) {
          detailsPanel.classList.add("hidden");
        }
      });
    }
  });

  if (detailsCloseBtn) {
    detailsCloseBtn.addEventListener("click", () => {
      closeDetailsPanel();
    });
  }

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

