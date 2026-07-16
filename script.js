// ===========================================================
// Ash T. — Portfolio interactions
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Mobile navigation ---------- */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  /* ---------- Theme toggle (dark / light) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = window.__portfolioTheme || "dark";
  if (savedTheme === "light") document.body.classList.add("light-mode");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    window.__portfolioTheme = document.body.classList.contains("light-mode") ? "light" : "dark";
  });

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById("scrollProgress");
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }

  /* ---------- Scroll-to-top button ---------- */
  const scrollTopBtn = document.getElementById("scrollTop");
  function updateScrollTop() {
    if (window.scrollY > 500) scrollTopBtn.classList.add("visible");
    else scrollTopBtn.classList.remove("visible");
  }
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");
  function updateActiveNav() {
    let current = "";
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute("id");
    });
    navItems.forEach(item => {
      item.classList.toggle("active", item.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", () => {
    updateProgress();
    updateScrollTop();
    updateActiveNav();
  });
  updateProgress();
  updateScrollTop();

  /* ---------- Typing effect ---------- */
  const typingEl = document.getElementById("typingText");
  const roles = [
    "Front-End Web Developer",
    "HTML, CSS & JavaScript",
    "BCA Student in Nepal",
    "Open for Freelance Work"
  ];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------- Reveal on scroll + skill bars + counters ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  const skillCards = document.querySelectorAll(".skill-card");
  const statNums = document.querySelectorAll(".stat-num");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");

      if (entry.target.classList.contains("skill-card")) {
        const level = entry.target.getAttribute("data-level");
        const fill = entry.target.querySelector(".skill-fill");
        requestAnimationFrame(() => { fill.style.width = level + "%"; });
      }

      if (entry.target.classList.contains("stat")) {
        const numEl = entry.target.querySelector(".stat-num");
        if (numEl && !numEl.dataset.animated) {
          numEl.dataset.animated = "true";
          animateCounter(numEl);
        }
      }

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  revealEls.forEach(el => observer.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const duration = 1200;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  /* ---------- Project filtering ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const cat = card.getAttribute("data-cat");
        const show = filter === "all" || cat === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

});
