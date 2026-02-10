function setRealViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setRealViewportHeight();
window.addEventListener('resize', setRealViewportHeight);
/* ===============================
   CORE ELEMENTS
================================ */
const gallery = document.querySelector(".gallery");
const screen = document.getElementById("valentine-screen");
const valentineScreen = document.getElementById("valentine-screen");
const secret = document.getElementById("secret");

const question = document.getElementById("question");
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

const loader = document.getElementById("loader");
const progress = document.querySelector(".progress");
const percentText = document.querySelector(".progress-percent");

const replayBtn = document.getElementById("replay-btn");
const zoomViewer = document.getElementById("zoomViewer");
const zoomImage = document.getElementById("zoomImage");

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
  "Alright fine… mann jao na yaar 😤❤️",
"mai ro dunga bata raha😫😫",
"dekh le meri kasam de raha🤧",
"Jo bolegi woh khilaunga bata raha😉😉",
"Jaisa bolegi waisa karunga yaar,maan jao na!! 😭😭",
"Koi chara nhi hai mann na he pagega, Yes pe kardo click please🥺🥺"

];

let noCount = 0;

/* ===============================
   TIMER / LOADER (ISOLATED)
================================ */
const SHOW_AFTER = 15000;
const INTERVAL = 100;

let isReady = false;
let startTime = 0;
let pausedAt = null;
let pausedDuration = 0;
let isPaused = false;
let hasTransitioned = false;
let loaderTimer = null;
let hoverPaused = false;
let hoverStartTime = 0;
let totalHoverPausedTime = 0;

gallery.addEventListener("mouseenter", () => {
  hoverPaused = true;
  hoverStartTime = Date.now();
});

gallery.addEventListener("mouseleave", () => {
  if (!hoverPaused) return;

  hoverPaused = false;
  totalHoverPausedTime += Date.now() - hoverStartTime;
});

function pauseAll() {
  if (!isReady) return;   // 🔑 ignore early hover
 

  isPaused = true;
  pausedAt = Date.now();
}

function resumeAll() {
  if (!isReady) return;
  if (!isPaused) return;

  isPaused = false;
  pausedDuration += Date.now() - pausedAt;
  pausedAt = null;
}




function startLoaderTimer() {
  clearInterval(loaderTimer);

  hasTransitioned = false;
  startTime = Date.now();
  totalHoverPausedTime = 0;
  hoverPaused = false;
  hoverStartTime = 0;

  loaderTimer = setInterval(() => {

    const elapsed =
      Date.now() - startTime
      - totalHoverPausedTime
      - (hoverPaused ? Date.now() - hoverStartTime : 0);

    const percent = Math.min((elapsed / SHOW_AFTER) * 100, 100);

    progress.style.width = percent + "%";
    percentText.textContent = Math.floor(percent) + "%";

    if (elapsed >= SHOW_AFTER) {
      clearInterval(loaderTimer);
      showQuestionScreen();
    }

  }, INTERVAL);
}

/* ===============================
   SHOW QUESTION
================================ */
function showQuestionScreen() {
  gallery.classList.add("paused");
  gallery.style.opacity = "0";
  loader.style.opacity = "0";

  setTimeout(() => {
    loader.style.display = "none";
    screen.classList.remove("hidden");
    screen.classList.add("show");
  }, 800);
}

/* ===============================
   NO BUTTON
================================ */
function moveButton() {
  noCount++;

  // Update question text
  question.textContent =
    questions[noCount] || questions[questions.length - 1];

  // 🔥 FINAL QUESTION → HIDE NO BUTTON
 if (noCount >= questions.length - 1) {

  // Hide No button
  noBtn.style.display = "none";

  // 🔥 Animate Yes button
  yesBtn.classList.add("attention");

  return;
}


  // Move the No button randomly
  const maxX = window.innerWidth - noBtn.offsetWidth - 20;
  const maxY = window.innerHeight - noBtn.offsetHeight - 20;

  noBtn.style.position = "fixed";
  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";
}


noBtn.addEventListener("mouseenter", moveButton);
noBtn.addEventListener("click", moveButton);
noBtn.addEventListener("touchstart", moveButton);

/* ===============================
   YES → SECRET
================================ */
yesBtn.addEventListener("click", () => {
  explodeHearts();
  valentineScreen.classList.remove("show");

  setTimeout(() => {
    secret.classList.remove("hidden");
    secret.classList.add("show");
    initCarousel();   // 🔑 only here
  }, 2000);
});

function explodeHearts() {
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = Math.random() * window.innerHeight + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}

/* ===============================
   CAROUSEL (LAZY INIT)
================================ */
let track, slides, nextBtn, prevBtn, index, slideWidth, bg;

function initCarousel() {
  track = document.querySelector(".carousel-track");
  slides = document.querySelectorAll(".slide");
  nextBtn = document.querySelector(".next");
  prevBtn = document.querySelector(".prev");
  bg = document.querySelector(".carousel-bg");

  if (!track || slides.length === 0) return;

  index = 1;
  slideWidth = slides[0].offsetWidth + 20;
  track.style.transform = `translateX(-${slideWidth * index}px)`;

  nextBtn.onclick = () => { index++; moveCarousel(); };
  prevBtn.onclick = () => { index--; moveCarousel(); };

  track.addEventListener("transitionend", onTransitionEnd);
  enableSwipe();
  enableZoom();
  updateActiveSlide();
}

function moveCarousel() {
  track.style.transition = "transform 0.6s ease";
  track.style.transform = `translateX(-${slideWidth * index}px)`;
}

function onTransitionEnd() {
  if (slides[index].classList.contains("clone")) {
    track.style.transition = "none";
    index = index === slides.length - 1 ? 1 : slides.length - 2;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }
  updateActiveSlide();
}

function updateActiveSlide() {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");

  if (bg) {
    bg.style.backgroundImage =
      `url(${slides[index].querySelector("img").src})`;
  }
}

/* ===============================
   SWIPE
================================ */
function enableSwipe() {
  let startX = 0;

  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextBtn.click();
    if (endX - startX > 50) prevBtn.click();
  });
}

/* ===============================
   ZOOM (SAFE DELEGATION)
================================ */
let startDist = 0;
let currentScale = 2;

function enableZoom() {
  track.addEventListener("click", e => {
    const slide = e.target.closest(".slide");
    if (!slide) return;

    const img = slide.querySelector("img");
    if (!img) return;

    const rect = img.getBoundingClientRect();
    zoomImage.src = img.src;

    zoomImage.style.transform = `
      translate(${rect.left + rect.width / 2 - innerWidth / 2}px,
                ${rect.top + rect.height / 2 - innerHeight / 2}px)
      scale(0.4)
    `;

    zoomViewer.classList.add("show");

    requestAnimationFrame(() => {
      zoomImage.style.transform = "translate(0,0) scale(2)";
    });

    spawnZoomHearts();
  });

  zoomViewer.onclick = closeZoom;
}

zoomImage.addEventListener("touchstart", e => {
  if (e.touches.length === 2)
    startDist = getDistance(e.touches[0], e.touches[1]);
});

zoomImage.addEventListener("touchmove", e => {
  if (e.touches.length === 2) {
    e.preventDefault();
    const scale = Math.min(Math.max(
      currentScale * (getDistance(e.touches[0], e.touches[1]) / startDist),
      1.5), 3);
    zoomImage.style.transform = `scale(${scale})`;
  }
});

zoomImage.addEventListener("touchend", () => currentScale = 2);

function getDistance(a, b) {
  return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
}

function closeZoom() {
  zoomViewer.classList.remove("show");
  zoomImage.style.transform = "scale(0.4)";
  currentScale = 2;
}

function spawnZoomHearts() {
  for (let i = 0; i < 8; i++) {
    const h = document.createElement("div");
    h.className = "zoom-heart";
    h.textContent = "❤️";
    h.style.left = innerWidth / 2 + Math.random() * 60 - 30 + "px";
    h.style.top = innerHeight / 2 + Math.random() * 60 - 30 + "px";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2000);
  }
}

/* ===============================
   REPLAY
================================ */
/*--replay button */
replayBtn.addEventListener("click", restartExperience);

function restartExperience() {

  /* ---- STOP OLD TIMER ---- */
  clearInterval(loaderTimer);

  /* ---- RESET STATE FLAGS ---- */
  hasTransitioned = false;
  isPaused = false;
  pausedDuration = 0;
  pausedAt = null;

  /* ---- RESET LOADER UI (NO BACKWARD ANIMATION) ---- */
  progress.style.transition = "none";
  progress.style.width = "0%";
  percentText.textContent = "0%";
  progress.offsetHeight;                 // force reflow
  progress.style.transition = "width 0.3s ease";

  loader.style.display = "block";
  loader.style.opacity = "1";

  /* ---- RESET SCREENS ---- */
  screen.classList.remove("show");
  screen.classList.add("hidden");

  secret.classList.remove("show");
  secret.classList.add("hidden");

  /* ---- RESET GALLERY ---- */
  gallery.classList.remove("paused");
  gallery.style.opacity = "1";

  gallery.querySelectorAll("img").forEach(img => {
    img.style.animation = "none";
    img.offsetHeight;
    img.style.animation = "";
  });

  /* ---- RESET QUESTION ---- */
  noCount = 0;
  question.textContent = questions[0];

/* ---- RESET NO BUTTON ---- */
noBtn.style.display = "inline-block";
noBtn.style.position = "relative";
noBtn.style.left = "auto";
noBtn.style.top = "auto";
noBtn.style.transform = "none";

/* ---- RESET YES BUTTON ---- */
yesBtn.classList.remove("attention");



  /* ---- RESET CAROUSEL (SAFE) ---- */
  if (typeof track !== "undefined" && track) {
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
  }
hoverPaused = false;
hoverStartTime = 0;
totalHoverPausedTime = 0;

  /* ---- START FRESH TIMER (ONLY PLACE THAT SETS startTime) ---- */
  startLoaderTimer();
}


startLoaderTimer();

