document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (navbar) {
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open", navMenu.classList.contains("active"));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (window.location.pathname === href || (href !== "/" && window.location.pathname.startsWith(href))) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll("[data-flash]").forEach((flash) => {
    setTimeout(() => flash.classList.add("flash-hide"), 3200);
  });

  const revealItems = document.querySelectorAll(".reveal");
  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" },
    );

    revealItems.forEach((item) => observer.observe(item));
  }

  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const ripple = document.createElement("span");
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.className = "btn-ripple";
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    });
  });

  const track = document.querySelector("[data-testimonial-track]");
  if (track) {
    const slides = Array.from(track.querySelectorAll(".testimonial-slide"));
    const prev = document.querySelector("[data-testimonial-prev]");
    const next = document.querySelector("[data-testimonial-next]");
    let index = 0;

    const render = () => {
      track.style.transform = `translateX(-${index * 100}%)`;
    };

    prev?.addEventListener("click", () => {
      index = index === 0 ? slides.length - 1 : index - 1;
      render();
    });

    next?.addEventListener("click", () => {
      index = index === slides.length - 1 ? 0 : index + 1;
      render();
    });

    if (slides.length > 1) {
      setInterval(() => {
        index = index === slides.length - 1 ? 0 : index + 1;
        render();
      }, 5200);
    }

    render();
  }

  const searchInput = document.querySelector("[data-menu-search]");
  const filterButtons = document.querySelectorAll("[data-filter]");
  const menuCards = document.querySelectorAll("[data-menu-card]");
  let activeFilter = "all";

  const filterCards = () => {
    const query = (searchInput?.value || "").trim().toLowerCase();
    menuCards.forEach((card) => {
      const category = (card.dataset.category || "").toLowerCase();
      const name = (card.dataset.name || "").toLowerCase();
      const description = (card.dataset.description || "").toLowerCase();
      const matchesFilter = activeFilter === "all" || category === activeFilter;
      const matchesSearch = !query || `${name} ${description}`.includes(query);
      card.classList.toggle("is-hidden", !(matchesFilter && matchesSearch));
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = (button.dataset.filter || "all").toLowerCase();
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      filterCards();
    });
  });

  searchInput?.addEventListener("input", filterCards);
});

