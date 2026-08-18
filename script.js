document.addEventListener("DOMContentLoaded", function () {

  /* ===== MOBILE MENU ===== */
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menu && nav) {
    menu.addEventListener("click", function () {
      nav.classList.toggle("active");
    });

    // close menu when a link is clicked (mobile)
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("active"));
    });
  }

  /* ===== STICKY NAVBAR SHADOW ON SCROLL ===== */
  const header = document.querySelector(".header_class, .header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  /* ===== ACTIVE NAV LINK ON SCROLL ===== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

  if (sections.length && navLinks.length) {
    const setActive = () => {
      let currentId = "";
      sections.forEach(section => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) currentId = section.getAttribute("id");
      });
      navLinks.forEach(link => {
        link.classList.toggle("active-link", link.getAttribute("href") === "#" + currentId);
      });
    };
    window.addEventListener("scroll", setActive);
    setActive();
  }

  /* ===== SCROLL REVEAL ANIMATIONS ===== */
  const revealTargets = document.querySelectorAll(
    ".feature, .program-card, .gallery-item, .about-image, .about-text, .testimonial-card, .stat-box, .info-box"
  );
  revealTargets.forEach(el => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("in-view"));
  }

  /* ===== ANIMATED COUNTERS ===== */
  const counters = document.querySelectorAll(".stat-number[data-target]");
  if (counters.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-target"), 10);
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value + suffix;
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  /* ===== GALLERY LIGHTBOX ===== */
  const galleryItems = document.querySelectorAll(".gallery-item img");
  if (galleryItems.length) {
    const overlay = document.createElement("div");
    overlay.className = "lightbox-overlay";
    overlay.innerHTML = `
      <button class="lightbox-close" aria-label="Close">✕</button>
      <button class="lightbox-prev" aria-label="Previous">‹</button>
      <img src="" alt="Gallery preview">
      <button class="lightbox-next" aria-label="Next">›</button>
    `;
    document.body.appendChild(overlay);

    const lbImg = overlay.querySelector("img");
    const closeBtn = overlay.querySelector(".lightbox-close");
    const prevBtn = overlay.querySelector(".lightbox-prev");
    const nextBtn = overlay.querySelector(".lightbox-next");

    let imgList = Array.from(galleryItems);
    let currentIndex = 0;

    function updateVisibleList() {
      imgList = Array.from(galleryItems).filter(img => img.closest(".gallery-item").style.display !== "none");
    }

    function openLightbox(img) {
      updateVisibleList();
      currentIndex = imgList.indexOf(img);
      lbImg.src = img.src;
      overlay.classList.add("open");
    }

    function showAt(index) {
      if (!imgList.length) return;
      currentIndex = (index + imgList.length) % imgList.length;
      lbImg.src = imgList[currentIndex].src;
    }

    galleryItems.forEach(img => {
      img.setAttribute("loading", "lazy");
      img.addEventListener("click", () => openLightbox(img));
    });

    closeBtn.addEventListener("click", () => overlay.classList.remove("open"));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("open");
    });
    prevBtn.addEventListener("click", () => showAt(currentIndex - 1));
    nextBtn.addEventListener("click", () => showAt(currentIndex + 1));

    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("open")) return;
      if (e.key === "Escape") overlay.classList.remove("open");
      if (e.key === "ArrowLeft") showAt(currentIndex - 1);
      if (e.key === "ArrowRight") showAt(currentIndex + 1);
    });
  }

});