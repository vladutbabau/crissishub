const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const section2 = document.querySelector("#section--2");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/* NAVIGATION */
document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

btnScrollTo.addEventListener("click", function (e) {
  e.preventDefault();

  section2.scrollIntoView({ behavior: "smooth" });
});

const section1 = document.querySelector(".hero");
const headerHeight = header.getBoundingClientRect().height;
//console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) header.classList.add("sticky");
  else header.classList.remove("sticky");
};

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.5,
  rootMargin: `-${headerHeight}px`,
});
observer.observe(section1);

// Sections reveal

// const allSections = document.querySelectorAll(".section");
// const allNavLinks = document.querySelectorAll(".nav__link");
// const activateNavLink = function (id) {
//   allNavLinks.forEach((link) => {
//     link.classList.remove("active");
//     if (link.getAttribute("href") === `#${id}`) {
//       console.log(link);
//       link.classList.add("active");
//     }
//   });
// };
// const revealSection = function (entries, observer) {
//   entries.forEach((entry) => {
//     if (!entry.isIntersecting) return;
//     entry.target.classList.remove("section--hidden");
//     const sectionId = entry.target.getAttribute("id");
//     activateNavLink(sectionId);
//     observer.unobserve(entry.target);
//   });
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0,
// });

// allSections.forEach((section) => {
//   sectionObserver.observe(section);
//   section.classList.add("section--hidden");
// });
const allSections = document.querySelectorAll(".section");
const allNavLinks = document.querySelectorAll(".nav__link");

const activateNavLink = function (id) {
  allNavLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${id}`) {
      link.classList.add("active");
    }
  });
};

let visibilityMap = {};

const revealSection = function (entries) {
  entries.forEach((entry) => {
    const sectionId = entry.target.getAttribute("id");

    // Arată secțiunea
    if (entry.isIntersecting) {
      entry.target.classList.remove("section--hidden");
      visibilityMap[sectionId] = entry.intersectionRatio;
    } else {
      delete visibilityMap[sectionId];
    }
  });

  // Găsește secțiunea cu vizibilitatea cea mai mare
  const mostVisible = Object.entries(visibilityMap).sort(
    (a, b) => b[1] - a[1]
  )[0];
  if (mostVisible) {
    activateNavLink(mostVisible[0]);
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: Array.from({ length: 100 }, (_, i) => i / 100),
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/* Buton afisare card */
document.querySelectorAll(".card__toggle").forEach((btn) => {
  btn.addEventListener("click", function () {
    const currentCard = btn.closest(".card");

    // Închide toate cardurile
    document.querySelectorAll(".card").forEach((card) => {
      if (card !== currentCard) {
        card.classList.remove("expanded");
        const icon = card.querySelector(".card__toggle i");
        icon.classList.add("fa-chevron-down");
        icon.classList.remove("fa-chevron-up");
      }
    });

    // Toggle doar pe cardul curent
    currentCard.classList.toggle("expanded");
    const icon = btn.querySelector("i");
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  });
});
/* ELIMINAREA LITERELOR DIN NR DE TELEFON*/
document.getElementById("phone").addEventListener("input", function (e) {
  this.value = this.value.replace(/[^0-9]/g, "");
});

/* HAMBURGER MENU */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

// Toggle la click pe hamburger
hamburger.addEventListener("click", function () {
  navLinks.classList.toggle("show");
  hamburger.classList.toggle("open");
});

// Închide meniul când se apasă pe un link
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    hamburger.classList.remove("open");
  });
});

// Închide meniul când se apasă în afara lui
document.addEventListener("click", function (e) {
  const clickedInsideMenu = navLinks.contains(e.target);
  const clickedOnHamburger = hamburger.contains(e.target);

  if (!clickedInsideMenu && !clickedOnHamburger) {
    navLinks.classList.remove("show");
    hamburger.classList.remove("open");
  }
});

// Blochează propagarea clickului în interiorul meniului
navLinks.addEventListener("click", function (e) {
  e.stopPropagation();
});
hamburger.addEventListener("click", function (e) {
  e.stopPropagation();
});

const btnModal = document.querySelector(".btn--modal");
btnModal.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("S-a trimis");
  let html = `<div class="solicitare">Solicitarea ta a fost trimisa cu success</div>`;
  const modal = document.querySelector(".modal");
  modal.insertAdjacentHTML("beforeend", html);
});
