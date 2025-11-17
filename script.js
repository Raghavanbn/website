// ==============================
// SERVICES CARD FLIP
// ==============================
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    // Remove flipped class from all cards
    cards.forEach(c => c.classList.remove('flipped'));
    // Flip the hovered card
    card.classList.add('flipped');
  });
});

// ==============================
// FADE-IN ON SCROLL
// ==============================
const faders = document.querySelectorAll('.fade-in-section');

const appearOptions = { threshold: 0.3 };

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// ==============================
// ABOUT / VISION / MISSION PROGRESS BAR AUTOMATIC
// ==============================
const tabs = document.querySelectorAll('.tab');
const progress = document.querySelector('.progress');
let index = 0;

function showTab(i){
  tabs.forEach(tab => tab.classList.remove('active'));
  tabs[i].classList.add('active');
  progress.style.height = `${((i+1)/tabs.length)*100}%`;
}

showTab(index);

setInterval(() => {
  index = (index + 1) % tabs.length;
  showTab(index);
}, 4000);

// ==============================
// OPTIONAL: VIDEO SECTION FADE-IN
// Already handled by .fade-in-section
// Just ensure <section id="video" class="fade-in-section"> exists
// ==============================
/* NAVBAR STYLING */
// Hero typing effect
const heroPhrases = [
  "Innovating Tomorrow, Today",
  "Transforming Ideas into Impact",
  "Where Innovation Meets Excellence",
  "Innovate. Create. Lead."
];

let heroIndex = 0;
let charIndex = 0;
const typingSpeed = 100; // milliseconds
const eraseSpeed = 50;
const delayBetweenPhrases = 2000;

const heroTextElement = document.getElementById('hero-text');

function type() {
  if (charIndex < heroPhrases[heroIndex].length) {
    heroTextElement.textContent += heroPhrases[heroIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, delayBetweenPhrases);
  }
}

function erase() {
  if (charIndex > 0) {
    heroTextElement.textContent = heroPhrases[heroIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, eraseSpeed);
  } else {
    heroIndex = (heroIndex + 1) % heroPhrases.length;
    setTimeout(type, typingSpeed);
  }
}

// Start the typing effect
document.addEventListener("DOMContentLoaded", () => {
  type();
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}


