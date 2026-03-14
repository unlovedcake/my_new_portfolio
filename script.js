// Handle loader + initial page animation
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  const wrapper = document.querySelector(".page-wrapper");

  setTimeout(() => {
    if (loader) loader.classList.add("hidden");
    if (wrapper) wrapper.classList.add("ready");
  }, 600);
});

// Scroll reveal animations using IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -40px 0px",
  }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Contact form handler - opens user's email client
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector("#name")?.value || "";
  const fromEmail = form.querySelector("#email")?.value || "";
  const project = form.querySelector("#project")?.value || "";
  const messageEl = document.getElementById("form-message");

  const to = "mdelavictoria.binary@gmail.com";
  const subject = `New project inquiry from ${name || "someone"}`;
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${fromEmail}`,
    "",
    "Project details:",
    project,
  ];

  const mailtoLink = `mailto:${encodeURIComponent(
    to
  )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    bodyLines.join("\n")
  )}`;

  window.location.href = mailtoLink;

  if (messageEl) {
    messageEl.textContent =
      "Your email app should open now so you can send the message.";
    messageEl.style.color = "#a0e9e6";
  }
}

// Footer year + navbar active state
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));

  function setActiveLink() {
    const scrollPos = window.scrollY;
    const offset = 120; // account for sticky navbar height

    let currentId = "hero";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const top = rect.top + window.scrollY - offset;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const targetId = link.getAttribute("href").replace("#", "");
      if (targetId === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Initialize on load
  setActiveLink();

  // Update on scroll
  window.addEventListener("scroll", setActiveLink);

  // Smooth scroll for nav links + immediate active state on click
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "start" });

      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

