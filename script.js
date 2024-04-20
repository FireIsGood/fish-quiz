// Yeah this is really hacky, but it was good practice for basic web stuff!

// Elements
const uiHelp = document.getElementById("help");
const uiClose = document.getElementById("close");

// Fish quiz
const fishQuiz = document.getElementById("fish-quiz");
const questionCounter = document.getElementById("question-counter");
const questionText = document.getElementById("question-text");
const fishLevelIndicator = document.getElementById("fish-level");
const fishMeter = document.getElementById("fish-meter");
const buttonYes = document.getElementById("btn-yes");
const buttonNo = document.getElementById("btn-no");
const buttonPossibly = document.getElementById("btn-possibly");

// Loading screen
const loadingScreen = document.getElementById("loading");
const dots = document.getElementById("dots");

// Fish Results
const fishResults = document.getElementById("fish-results");
const resultYesCount = document.getElementById("yes-count");
const resultNoCount = document.getElementById("no-count");
const resultPossiblyCount = document.getElementById("possibly-count");
const resultLevel = document.getElementById("result-level");
const resultRating = document.getElementById("result-rating");
const buttonRetry = document.getElementById("btn-retry");

// UI buttons
const helpDialog = document.getElementById("help-dialog");

// Globals
const fishQuestions = [
  '"I feel most at peace when near water."',
  '"I enjoy swimming."',
  '"I am graceful and fluid in my movements."',
  '"I often dream of oceans, rivers, or lakes."',
  '"I love the taste of seafood."',
  '"I have fond memories of being a fish."',
  '"I prefer a calm and serene environment."',
  '"I am adaptable to different situations."',
  '"I believe in going with the flow."',
  '"I am attracted to shiny or reflective objects."',
  '"I enjoy exploring new places."',
  '"I am comfortable with change."',
  '"I believe in the power of intuition."',
  '"I can be secretive or elusive at times."',
  '"I find the colors and patterns of other fish fascinating."',
  '"I value freedom and independence."',
  '"I have a strong connection to nature."',
  '"I believe in the power of worms."',
  '"I am patient and persistent."',
  '"I am curious about the unknown."',
  '"I wish to see the ocean once more."',
  '"I am skilled at navigating challenges."',
  '"I prefer a simple and uncomplicated lifestyle."',
  '"I believe in the importance of balance."',
  '"I am attracted to beauty and aesthetics."',
  '"I enjoy spending time alone."',
  '"I have a calming presence."',
  '"I am adaptable to different social settings."',
  '"I value harmony and peace."',
  '"I am sensitive to my surroundings."',
  '"I am good at hiding my emotions."',
  '"I am independent and self-sufficient."',
  '"I am drawn to mysterious or mystical things."',
  '"I am empathetic towards others."',
  '"I enjoy learning about different cultures."',
  '"I am comfortable with silence."',
  '"I believe in the power of reflection."',
  '"I am good at finding solutions to problems."',
  '"I am attracted to adventure and exploration."',
  '"I enjoy being part of a community."',
  '"I am adaptable to changing circumstances."',
  '"I am patient with myself and others."',
  '"I am good at keeping secrets."',
  '"I am empathetic towards animals."',
  '"I am a good judge of character."',
  '"I am drawn to creativity and imagination."',
  '"I believe in the interconnectedness of all things."',
  '"I am calm under pressure."',
  '"I am good at understanding nonverbal communication."',
  '"I am attracted to mystery and the unknown."',
  '"I am compassionate towards those in need."',
];
const fishTiers = {
  0: "Human",
  1: "Human?",
  5: "Guppy",
  10: "Goldfish",
  15: "Betta",
  20: "Minnow",
  25: "Salmon",
  30: "Bass",
  40: "Tuna",
  50: "Angelfish",
};
let currentQuestion = 0;
let fishLevel = 0;
let yesCount = 0;
let noCount = 0;
let possiblyCount = 0;

// Reset all state
function resetQuiz() {
  currentQuestion = 0;
  fishLevel = 0;
  yesCount = 0;
  noCount = 0;
  possiblyCount = 0;
  updateQuestion();
  updateFishLevel();
  goQuiz();
}

// Update the state
function updateQuestion() {
  questionText.innerText = fishQuestions[currentQuestion];
  questionCounter.innerText = `${currentQuestion}/${fishQuestions.length - 1}`;
}
function updateFishLevel() {
  fishMeter.style = `--fish-count: ${fishLevel}`;
  fishLevelIndicator.innerText = fishLevel;
}

// General functions
function nextQuestion() {
  if (currentQuestion === fishQuestions.length - 1) {
    goResults();
  }
  currentQuestion += 1;
  updateQuestion();
}
function modifyFishLevel(change) {
  fishLevel = fishLevel + change;
  if (fishLevel < 0) {
    fishLevel = 0;
  }
  updateFishLevel();
}

// Navigation
function goQuiz() {
  fishQuiz.style = "";
  fishResults.style = "display: none";
}
function goResults() {
  fishQuiz.style = "display: none";
  loadingScreen.style = "";
  calculateResults();
  setTimeout(() => {
    loadingScreen.style = "display: none";
    fishResults.style = "";
  }, 3000);
}

function calculateResults() {
  resultYesCount.innerText = `${yesCount}`;
  resultNoCount.innerText = `${noCount}`;
  resultPossiblyCount.innerText = `${possiblyCount}`;
  // Level
  resultLevel.innerText = `${fishLevel}`;
  let rating = "";
  for (const [level, name] of Object.entries(fishTiers)) {
    if (level <= fishLevel) {
      rating = name;
    }
  }
  // Rating
  resultRating.innerText = rating;
}

// Event listeners
uiHelp.addEventListener("click", () => {
  helpDialog.showModal();
});
uiClose.addEventListener("click", resetQuiz);
buttonYes.addEventListener("click", () => {
  yesCount += 1;
  nextQuestion();
  modifyFishLevel(1);
});
buttonNo.addEventListener("click", () => {
  noCount += 1;
  nextQuestion();
  modifyFishLevel(-1);
});
buttonPossibly.addEventListener("click", () => {
  possiblyCount += 1;
  nextQuestion();
});
buttonRetry.addEventListener("click", () => {
  resetQuiz();
});

helpDialog.addEventListener("click", () => {
  helpDialog.close();
});

// Intervals
let dotCount = 0;
setInterval(() => {
  dots.innerText = ".".repeat(dotCount);
  dotCount = (dotCount + 1) % 4;
  console.log("doing it");
}, 500);

// Initial state
updateQuestion();
updateFishLevel();
calculateResults();
