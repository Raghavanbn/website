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
  tabs.forEach((tab, idx) => {
    tab.classList.remove('active');
    tab.classList.add('hidden');     // hide all
  });

  tabs[i].classList.add('active');
  tabs[i].classList.remove('hidden'); // show active tab

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
  "Innovate. Create. Lead.",
  "Creativity Meets Code"
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

function toggleBlog(el){
  const card = el.parentElement;
  const full = card.querySelector('.full-content');
  const allCards = document.querySelectorAll('.blog-card');
  const buttons = document.querySelectorAll('.category-filters button');

  if(full.classList.contains('expanded')){
    full.classList.remove('expanded');
    el.innerText = 'Read More ▼';
    allCards.forEach(c => c.style.display = 'block');
    buttons.forEach(b => b.classList.remove('active'));
    buttons[0].classList.add('active');
  } else {
    allCards.forEach(c => {
      if(c !== card) c.style.display='none';
      const f = c.querySelector('.full-content');
      f.classList.remove('expanded');
      c.querySelector('.read-more').innerText='Read More ▼';
    });
    full.classList.add('expanded');
    el.innerText='Read Less ▲';

    const category = card.dataset.category;
    buttons.forEach(b=>b.classList.remove('active'));
    buttons.forEach(b=>{ if(b.innerText===category) b.classList.add('active'); });
  }
}

function filterCategory(category){
  const allCards = document.querySelectorAll('.blog-card');
  const buttons = document.querySelectorAll('.category-filters button');
  buttons.forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
  allCards.forEach(c=>{
    if(category==='all' || c.dataset.category===category) c.style.display='block';
    else c.style.display='none';
    c.querySelector('.full-content').classList.remove('expanded');
    c.querySelector('.read-more').innerText='Read More ▼';
  });
}

// Case Studies Carousel
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const carouselCards = document.querySelectorAll('.case-card');

let currentIndex = 0;
const cardsPerPage = 3; // change how many cards are visible at once
const gap = 20; // same as CSS gap

function updateCarousel() {
  const cardWidth = carouselCards[0].offsetWidth;
  const offset = currentIndex * (cardWidth + gap);
  track.style.transform = `translateX(-${offset}px)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex = Math.max(0, currentIndex - cardsPerPage);
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  const maxIndex = carouselCards.length - cardsPerPage;
  currentIndex = Math.min(maxIndex, currentIndex + cardsPerPage);
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);

// Careers
  const hasJobs = true; // true = show job openings, false = show 'no opportunities' message

  const jobsGrid = document.getElementById("jobsGrid");
  const noJobs = document.getElementById("noJobs");

  if (hasJobs) {
    jobsGrid.style.display = "grid";
    noJobs.style.display = "none";
  } else {
    jobsGrid.style.display = "none";
    noJobs.style.display = "block";
  }
 