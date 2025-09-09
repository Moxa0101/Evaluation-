const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});


window.onload = function () {
  // find the nav link that has 'active'
  const activeLink = document.querySelector(".navbar-nav .nav-link.active");

  if (activeLink) {
    const targetId = activeLink.getAttribute("href"); // e.g. #faqShow
    const targetEl = document.querySelector(targetId);

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  }
};


document.querySelectorAll(".carousel-container").forEach((container) => {
  const slides = document.querySelectorAll(".carousel-slide");
  const arrowLeft = document.querySelector(".arrow-left");
  const arrowRight = document.querySelector(".arrow-right");
  let currentSlide = 0;
  let autoSlide;

  function updateCarousel() {
    slides.forEach((slide, index) => {
      slide.classList.remove("slide-left", "slide-center", "slide-right", "leftBehind", "rightBehind");

      let diff = (index - currentSlide + slides.length) % slides.length;

      switch (diff) {
        case 0: slide.classList.add("slide-center"); break;   // active
        case 1: slide.classList.add("slide-right"); break;    // next
        case 2: slide.classList.add("rightBehind"); break;    // next behind
        case slides.length - 1: slide.classList.add("slide-left"); break; // prev
        case slides.length - 2: slide.classList.add("leftBehind"); break; // prev behind
        default:
          // Any slides further away just stay hidden
          slide.style.display = "none";
          return;
      }
      slide.style.display = "block"; // only show active range
    });
  }


  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateCarousel();
    resetAutoSlide();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateCarousel();
    resetAutoSlide();
  }

  if (arrowRight) arrowRight.addEventListener("click", nextSlide);
  if (arrowLeft) arrowLeft.addEventListener("click", prevSlide);

  // --- Auto slide setup ---
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 5000);
  }
  function stopAutoSlide() {
    clearInterval(autoSlide);
  }
  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Pause on hover
  container.addEventListener("mouseenter", stopAutoSlide);
  container.addEventListener("mouseleave", startAutoSlide);

  // Initialize
  updateCarousel();
  startAutoSlide();
});

// function answerShow(element) {
//   const cardBody = element.closest(".card-body");
//   const span = cardBody.querySelector(".answer");
//   const icon = element.querySelector(".toggle-icon"); // get the icon inside clicked div

//   // Close all other answers
//   document.querySelectorAll(".answer").forEach(ans => {
//     if (ans !== span) {
//       ans.style.display = "none";
//       const otherIcon = ans.closest(".card-body").querySelector(".toggle-icon");
//       if (otherIcon) otherIcon.classList.remove("open");
//     }
//   });

//   // Toggle clicked answer
//   span.style.display = (span.style.display === "block") ? "none" : "block";
//   if (icon) icon.classList.toggle("open");
// }

function answerShow(element) {
  const cardBody = element.closest(".card-body");
  const span = cardBody.querySelector(".answer");
  const icon = element.querySelector(".toggle-icon");

  // Close all others
  document.querySelectorAll(".answer").forEach(ans => {
    if (ans !== span) {
      ans.style.maxHeight = null;
      ans.classList.remove("open");
      const otherIcon = ans.closest(".card-body").querySelector(".toggle-icon");
      if (otherIcon) otherIcon.classList.remove("open");
    }
  });

  // Toggle clicked
  if (span.classList.contains("open")) {
    span.style.maxHeight = null;
    span.classList.remove("open");
  } else {
    span.style.maxHeight = span.scrollHeight + "px";
    span.classList.add("open");
  }

  if (icon) icon.classList.toggle("open");
}


document.querySelectorAll(".custom_container").forEach(container => {
  const prevBtn = container.parentElement.querySelector(".custom-prev");
  const nextBtn = container.parentElement.querySelector(".custom-next");

  const cardWidth = container.querySelector(".card").offsetWidth + 16;
  let currentIndex = 0;

  function scrollToIndex(index) {
    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
  }

  if (prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % container.children.length; // loop forward
      scrollToIndex(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + container.children.length) % container.children.length; // loop back
      scrollToIndex(currentIndex);
    });
  }
});


document.querySelectorAll(".read-more").forEach(btn => {
  btn.addEventListener("click", () => {
    const reviewText = btn.previousElementSibling.getAttribute("data-full");
    document.getElementById("modalReviewText").textContent = reviewText;
    const reviewModal = new bootstrap.Modal(document.getElementById("reviewModal"));
    reviewModal.show();
  });
});


document.querySelectorAll(".reviews_container").forEach((container, i) => {
  const prevBtn = document.querySelectorAll(".review-prev")[i];
  const nextBtn = document.querySelectorAll(".review-next")[i];

  let currentIndex = 0;

  function scrollToIndex(index) {
    const cardWidth = container.querySelector(".card").offsetWidth + 16; // include gap
    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
  }

  if (prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % container.children.length; // loop forward
      scrollToIndex(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + container.children.length) % container.children.length; // loop backward
      scrollToIndex(currentIndex);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btns = document.querySelectorAll(".faqBtn");
  const panes = document.querySelectorAll(".faqSec");

  btns.forEach(btn => {
    btn.addEventListener("click", () => {
      btns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      panes.forEach(p => p.classList.add("d-none"));
      const target = document.querySelector(btn.dataset.target);
      if (target) target.classList.remove("d-none");
    });
  });
});


document.querySelectorAll(".glow-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
    card.style.setProperty("--glowOpacity", 1);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--glowOpacity", 0);
  });
});

