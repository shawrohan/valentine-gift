/* ===============================
   CONFIGURATION
================================ */
const LOOP_TIME = 5000;              // same as CSS --d (ms)
const LOOPS_BEFORE_QUESTION = 3;
const QUESTIONS = [
  "Are you really sure? 🥺",
  "Think again... my heart is fragile 💔",
  "Last chance 😭",
  "What if I bring chocolates? 🍫",
  "You can’t escape love 😎❤️",
  "Say yes alreadyyy 🙈💕"
];

/* ===============================
   DOM ELEMENTS
================================ */
const gallery = document.querySelector(".gallery");
const images = document.querySelectorAll(".gallery img");
const dotsContainer = document.getElementById("dots");
const gallerySection = document.getElementById("gallerySection");
const finalSection = document.getElementById("finalSection");
const questionText = document.getElementById("question");
const replyText = document.getElementById("reply");
const btnContainer = document.querySelector(".btns");

/* ===============================
   STATE
================================ */
let isPaused = false;
let activeDot = 0;
let questionIndex = 0;
let questionTimer = null;

/* ===============================
   DOTS SETUP
================================ */
function createDots() {
  images.forEach(() => {
    const dot = document.createElement("div");
    dot.className = "dot";
    dotsContainer.appendChild(dot);
  });
}

const dots = () => document.querySelectorAll(".dot");

/* ===============================
   DOT ANIMATION
================================ */
function startDotAnimation() {
  return setInterval(() => {
    const allDots = dots();
    allDots.forEach(d => d.classList.remove("active"));
    allDots[activeDot]?.classList.add("active");
    activeDot = (activeDot + 1) % allDots.length;
  }, LOOP_TIME / images.length);
}

/* ===============================
   GALLERY ↔ QUESTION FLOW
================================ */
const TOTAL_TIME = LOOP_TIME * LOOPS_BEFORE_QUESTION;

function showQuestion() {
  gallerySection.style.display = "none";
  dotsContainer.style.display = "none";
  finalSection.style.display = "block";
}

function startQuestionTimer() {
  clearTimeout(questionTimer);
  questionTimer = setTimeout(showQuestion, TOTAL_TIME);
}

function backToGallery() {
  finalSection.style.display = "none";
  gallerySection.style.display = "block";
  dotsContainer.style.display = "flex";
  startQuestionTimer();
}

/* ===============================
   INTERACTIONS
================================ */
gallery.addEventListener("touchend", () => {
  isPaused = !isPaused;
  gallery.classList.toggle("paused", isPaused);
});

function moveNo() {
  const noBtn = document.getElementById("noBtn");

  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 120);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  questionText.innerText =
    QUESTIONS[questionIndex++ % QUESTIONS.length];
}

function yesClicked() {
  questionText.innerText = "Yaaay!! I knew it 😍❤️";
  btnContainer.style.display = "none";
  replyText.innerText =
    "Thank you for making me the happiest person 💖\nHappy Valentine's Day 💕";
}

/* ===============================
   INIT
================================ */
createDots();
startDotAnimation();
startQuestionTimer();
