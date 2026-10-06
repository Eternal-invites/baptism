const baptismConfig = {
  childName: "",
  invitationDate: "ሰኔ 04 2018 ዓ.ም",
  displayDate: "October 13 | ጥር 3",
  countdownDate: "2026-10-13T12:30:00",
  hosts: "ብሩክ ደበበ እና ነብያት ሳሙኤል",
  churchLocation: "ቅድስት ስላሴ ቤ/ክ 4ኪሎ",
  lunchLocation: "ቦሌ ቡልቡላ 93 ማዞሪያ ወረዳ 12 ጀርባ",
  churchMapUrl: "https://maps.app.goo.gl/Vd88qD2ZfNSq82i99?g_st=ic",
  lunchMapUrl: "https://maps.app.goo.gl/24fEhbyx2XdZ3bGTA?g_st=ic"
};

(function () {
  "use strict";

  const loading = document.getElementById("loading");
  const opening = document.getElementById("opening");
  const openBtn = document.getElementById("openInvite");
  const main = document.getElementById("mainContent");
  const nav = document.getElementById("mainNav");
  const musicBtn = document.getElementById("musicToggle");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const msgEl = document.getElementById("countdownMessage");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("navMenu");
  const particlesContainer = document.getElementById("particles");
  const closing = document.getElementById("closing");

  const audio = new Audio("audio/baptism.mp3");
  audio.loop = true;
  audio.preload = "none";

  function showOpening() {
    loading.classList.add("fade-out");
    setTimeout(() => {
      loading.style.display = "none";
      opening.removeAttribute("aria-hidden");
      openBtn.focus();
    }, 1000);
  }

  function startLoading() {
    const img = new Image();
    img.src = "images/loading.jpg";
    img.onload = () => {
      setTimeout(showOpening, 3000);
    };
    img.onerror = () => {
      setTimeout(showOpening, 3000);
    };
  }

  function openInvitation() {
    opening.classList.add("fade-out");
    opening.setAttribute("aria-hidden", "true");
    main.classList.add("main-content--visible");
    main.removeAttribute("aria-hidden");
    nav.classList.add("main-nav--visible");
    nav.removeAttribute("aria-hidden");
    musicBtn.hidden = false;
    document.body.classList.add("is-open");

    audio.play().then(() => {
      musicBtn.classList.add("playing");
      musicBtn.setAttribute("aria-pressed", "true");
    }).catch(() => {
      musicBtn.classList.remove("playing");
      musicBtn.setAttribute("aria-pressed", "false");
    });

    setTimeout(() => {
      opening.style.display = "none";
    }, 1000);
  }

  openBtn.addEventListener("click", openInvitation);

  musicBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        musicBtn.classList.add("playing");
        musicBtn.setAttribute("aria-pressed", "true");
      }).catch(() => {});
    } else {
      audio.pause();
      musicBtn.classList.remove("playing");
      musicBtn.setAttribute("aria-pressed", "false");
    }
  });

  const target = new Date(baptismConfig.countdownDate);
  const elements = {
    days: daysEl,
    hours: hoursEl,
    minutes: minutesEl,
    seconds: secondsEl
  };
  let lastValues = {};

  function updateCountdown() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      msgEl.textContent = "ዛሬ የደስታችን ቀን ነው!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const values = { days, hours, minutes, seconds };

    for (const key of Object.keys(values)) {
      const text = String(values[key]).padStart(2, "0");
      if (lastValues[key] !== text) {
        elements[key].textContent = text;
        elements[key].classList.remove("pop");
        void elements[key].offsetWidth;
        elements[key].classList.add("pop");
      }
    }
    lastValues = values;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  document.querySelectorAll("[data-map]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = baptismConfig[btn.dataset.map];
      if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const closingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.3 }
  );

  closingObserver.observe(closing);

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("open");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  function createParticles() {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = Math.random() * 100 + "vw";
      p.style.top = Math.random() * 100 + "vh";
      p.style.width = (4 + Math.random() * 6) + "px";
      p.style.height = p.style.width;
      p.style.animationDuration = (10 + Math.random() * 12) + "s";
      p.style.animationDelay = (Math.random() * 6) + "s";
      p.style.opacity = (0.2 + Math.random() * 0.3).toString();
      particlesContainer.appendChild(p);
    }
  }

  createParticles();

  window.addEventListener("load", startLoading);
}());
