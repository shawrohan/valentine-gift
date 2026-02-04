/* ===============================
   CORE ELEMENTS
================================ */
const gallery = document.querySelector(".gallery");
const screen = document.getElementById("valentine-screen");
const valentineScreen = document.getElementById("valentine-screen");

const question = document.getElementById("question");

const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

const secret = document.getElementById("secret");

const loader = document.getElementById("loader");
const progress = document.querySelector(".progress");
const percentText = document.querySelector(".progress-percent");

/* ===============================
   QUESTIONS
================================ */
const questions = [
  "Will you be my Valentine? 💖",
  "Are you absolutely sure? 😳",
  "Think again… I made this website 🥺",
  "What if I say please? 🙈",
  "Okay but we’d look cute together 😌",
  "Last chance… don’t break my heart 💔",
  "Alright fine… say Yes already 😤❤️"
];

let noCount = 0;

/* ===============================
   TIMING
================================ */
const SHOW_AFTER = 15000; // 10s total
const INTERVAL = 100;

let startTime = Date.now();
let pausedAt = null;
let pausedDuration = 0;
let isPaused = false;
let hasTransitioned = false;

/* ===============================
   PAUSE / RESUME
================================ */
function pauseAll() {
  if (isPaused) return;
  isPaused = true;
  pausedAt = Date.now();
}

function resumeAll() {
  if (!isPaused) return;
  isPaused = false;
  pausedDuration += Date.now() - pausedAt;
  pausedAt = null;
}

/* Pause on hover */
gallery.addEventListener("mouseenter", pauseAll);
gallery.addEventListener("mouseleave", resumeAll);
loader.addEventListener("mouseenter", pauseAll);
loader.addEventListener("mouseleave", resumeAll);

/* ===============================
   LOADER + TRANSITION DRIVER
================================ */
let loaderTimer = null;

function startLoaderTimer() {
  if (loaderTimer) clearInterval(loaderTimer);

  loaderTimer = setInterval(() => {
    if (isPaused || hasTransitioned) return;

    const now = Date.now();
    const elapsed = now - startTime - pausedDuration;

    const percent = Math.min((elapsed / SHOW_AFTER) * 100, 100);
    progress.style.width = percent + "%";
    percentText.textContent = Math.floor(percent) + "%";

    if (elapsed >= SHOW_AFTER) {
      hasTransitioned = true;
      clearInterval(loaderTimer);
      showQuestionScreen();
    }
  }, INTERVAL);
}

/* ===============================
   SHOW QUESTION SCREEN
================================ */
function showQuestionScreen() {
  gallery.classList.add("paused");
  gallery.style.opacity = "0";
  gallery.style.transition = "opacity 1s ease";

  loader.style.opacity = "0";
  loader.style.transition = "opacity 0.8s ease";

  setTimeout(() => {
    loader.style.display = "none";
    screen.classList.remove("hidden");
    screen.classList.add("show");
  }, 1000);
}

/* ===============================
   NO BUTTON LOGIC
================================ */
noBtn.addEventListener("mouseenter", moveButton);
noBtn.addEventListener("click", moveButton);
noBtn.addEventListener("touchstart", moveButton);

function moveButton() {
  noCount++;
  question.textContent =
    questions[noCount] || "You have no choice now 😈❤️";

  question.classList.add("bump");
  setTimeout(() => question.classList.remove("bump"), 300);

  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  noBtn.style.position = "fixed";
  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
}

/* ===============================
   YES → HEART EXPLOSION
================================ */
yesBtn.addEventListener("click", () => {
  explodeHearts();
  valentineScreen.classList.remove("show");

  setTimeout(() => {
    secret.classList.remove("hidden");
    secret.classList.add("show");
  }, 2000);
});

function explodeHearts() {
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";

    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = Math.random() * window.innerHeight + "px";
    heart.style.fontSize = 16 + Math.random() * 24 + "px";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 4000);
  }
}

const replayBtn = document.getElementById("replay-btn");

replayBtn.addEventListener("click", restartExperience);

function restartExperience() {
  /* Reset timing */
  startTime = Date.now();
  pausedDuration = 0;
  pausedAt = null;
  isPaused = false;
  hasTransitioned = false;

  /* Reset loader */
  progress.style.width = "0%";
  percentText.textContent = "0%";
  loader.style.display = "block";
  loader.style.opacity = "1";

  /* Reset gallery */
  gallery.classList.remove("paused");
  gallery.style.opacity = "1";

  /* Reset screens */
  screen.classList.remove("show");
  screen.classList.add("hidden");

  secret.classList.remove("show");
  secret.classList.add("hidden");

  /* Reset questions */
  noCount = 0;
  question.textContent = questions[0];

  /* Reset No button position */
  noBtn.style.position = "relative";
  noBtn.style.left = "auto";
  noBtn.style.top = "auto";

  /* Restart loader timer */
  startLoaderTimer();
}

startLoaderTimer();


