// how long one full gallery loop takes (same as --d in CSS)
const loopTime = 10000; // 10s
const loopsBeforeQuestion = 3;

let totalTime = loopTime * loopsBeforeQuestion;

setTimeout(() => {
  showQuestion();
}, totalTime);

function showQuestion() {
  document.getElementById("gallerySection").classList.add("hidden");
  document.getElementById("finalSection").classList.remove("hidden");
}

// Back to gallery and restart loop timer
function backToGallery() {
  document.getElementById("finalSection").classList.add("hidden");
  document.getElementById("gallerySection").classList.remove("hidden");

  // restart auto question timer
  setTimeout(() => {
    showQuestion();
  }, totalTime);
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
