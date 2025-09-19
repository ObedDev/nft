document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.getElementById("mobile-nav");

  function setMobileNav(open) {
    if (!mobileNav) return;
    mobileNav.style.display = open ? "block" : "none";
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
  }

  setMobileNav(false);

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.getAttribute("aria-expanded") === "true";
    setMobileNav(!isOpen);
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!mobileNav || !hamburger) return;
    if (mobileNav.contains(target) || hamburger.contains(target)) return;

    setMobileNav(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) setMobileNav(false);
  });

  const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const cards = Array.from(document.querySelectorAll(".card"));

  function applyFilter(filter) {
    filterButtons.forEach((btn) =>
      btn.classList.toggle("active", btn.dataset.filter === filter)
    );

    cards.forEach((card) => {
      const cat = card.dataset.category || "all";
      if (filter === "all" || filter === cat) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  applyFilter("all");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      applyFilter(filter);
    });

    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });

  const mobileLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];
  mobileLinks.forEach((a) =>
    a.addEventListener("click", () => setMobileNav(false))
  );
});
