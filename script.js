// how long one full gallery loop takes (same as --d in CSS)
const loopTime = 5000; // 10s
const loopsBeforeQuestion = 3;
const images = document.querySelectorAll(".gallery img");
const dotsContainer = document.getElementById("dots");
let activeDot = 0;

const gallery = document.querySelector(".gallery");

let isPaused = false;

gallery.addEventListener("touchend", () => {
  isPaused = !isPaused;
  gallery.classList.toggle("paused", isPaused);
});


images.forEach((_, i) => {
  const d = document.createElement("div");
  d.className = "dot";
  dotsContainer.appendChild(d);
});

const dots = document.querySelectorAll(".dot");

setInterval(() => {
  dots.forEach(d => d.classList.remove("active"));
  dots[activeDot].classList.add("active");
  activeDot = (activeDot + 1) % dots.length;
}, loopTime / images.length);

let totalTime = loopTime * loopsBeforeQuestion;

setTimeout(() => {
  showQuestion();
}, totalTime);

// function showQuestion() {
//   document.getElementById("gallerySection").classList.add("hidden");
//   document.getElementById("finalSection").classList.remove("hidden");
// }

function showQuestion() {
  document.getElementById("gallerySection").style.display = "none";
  document.getElementById("dots").style.display = "none";
  document.getElementById("finalSection").style.display = "block";
}

let questionTimer;

function startQuestionTimer() {
  clearTimeout(questionTimer);
  questionTimer = setTimeout(showQuestion, totalTime);
}

startQuestionTimer();

// Back to gallery and restart loop timer
// function backToGallery() {
//   document.getElementById("finalSection").classList.add("hidden");
//   document.getElementById("gallerySection").classList.remove("hidden");
function backToGallery() {
  document.getElementById("finalSection").style.display = "none";
  document.getElementById("gallerySection").style.display = "block";
  document.getElementById("dots").style.display = "flex";
  startQuestionTimer();
  // // restart auto question timer
  // setTimeout(() => {
  //   showQuestion();
  // }, totalTime);
}

// Playful NO button
let questions = [
  "Are you really sure? 🥺",
  "Think again... my heart is fragile 💔",
  "Last chance 😭",
  "What if I bring chocolates? 🍫",
  "You can’t escape love 😎❤️",
  "Say yes alreadyyy 🙈💕"
];
let qIndex = 0;

function moveNo() {
  let noBtn = document.getElementById("noBtn");

  let x = Math.random() * (window.innerWidth - 100);
  let y = Math.random() * (window.innerHeight - 100);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";

  document.getElementById("question").innerText =
    questions[qIndex++ % questions.length];
}

// YES clicked
function yesClicked() {
  document.getElementById("question").innerText = "Yaaay!! I knew it 😍❤️";
  document.querySelector(".btns").style.display = "none";
  document.getElementById("reply").innerText =
    "Thank you for making me the happiest person 💖\nHappy Valentine's Day 💕";
}






