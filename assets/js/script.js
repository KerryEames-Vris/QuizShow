var startBtn = document.querySelector("#startBtn");
var clickBtn1 = document.querySelector("#examBtn1");
var clickBtn2 = document.querySelector("#examBtn2");
var clickBtn3 = document.querySelector("#examBtn3");
var clickBtn4 = document.querySelector("#examBtn4");
var examQuestion = document.querySelector("#examQuestion");
var countdown = document.querySelector("#timer");
var quizShow = document.querySelector("#quizShow");
var bigQuestions = document.querySelector(".choice")
var bigClock = document.querySelector("#bigClock")
var scoreBoard = document.querySelector("#scoreBoard")
var leaderBoard = document.querySelector("#leaderboard")
var finalScore = document.querySelector("#finalScore")
var initials = document.querySelector(".initials");
var questionIndex = 0
var time = 15;
var score = 0;
var timer;

var questions = [
  {
    newQuestion: "Which of these animals can fly?",
    newAnswers: ["Dog", "Cat", "Bird", "Walrus"],
    correctAnswer: "Bird",
  },
  {
    newQuestion: "Which of these animals is NOT a standard mammal?",
    newAnswers: ["Racoon", "Squirrel", "Bat", "Opossum"],
    correctAnswer: "Opossum",
  },
  {
    newQuestion:
      "Many lizards will sacrifice what body part to escape a predator?",
    newAnswers: ["Leg", "Tail", "Eye", "Tongue"],
    correctAnswer: "Tail"
  },
  {
    newQuestion:
      "Which of the following birds would be considered a bird of prey?",
    newAnswers: ["Pigeon", "Blue Jay", "Osprey", "Kiwi"],
    correctAnswer: "Osprey",
  },
  {
    newQuestion: "An elk can be listed under which of the following?",
    newAnswers: [
      "Large Ungulates",
      "Horned Mammals",
      "Furred Bipedals",
      "Toothed Piscines",
    ],
    correctAnswer: "Large Ungulates",
  },
  {
    newQuestion: "Which of these birds is the heaviest?",
    newAnswers: [
      "Harpy Eagle",
      "Emperor Penguin",
      "Great Albatross",
      "Turkey Vulture",
    ],
    correctAnswer: "Emperor Penguin",
  },
];

function hideStartBtn() {
  startBtn.setAttribute("class", "invisible");
bigClock.classList.remove("invisible")
}

function endGame() {
  quizShow.classList.add("invisible")
  scoreBoard.classList.remove("invisible")
  finalScore.textContent = score;
}

function clock() {
  time--;
  countdown.innerHTML = time;
  if (time <= 0) {
    clearInterval(timer);
    endGame();
  }
}

function renderQuestions() {
    var questionList = "";
    questions.forEach(function (question, index) {
      let choices = "";
      question.newAnswers.forEach(function (choice, index) {
        const button = `
          <button id="examBtn${index + 1}" class="btn buttonColor choiceBtn ${
          choice === question.correctAnswer ? "correct-answer" : "wrong-answer"
        }">${choice}</button>
        `;
        choices += button;
      });
      questionList += `
        <div class="choice quest${index+1} invisible">
        <h2 class="examQuestion" id="examQuestion">${question.newQuestion}</h2>
            
        <div class="d-grid gap-2 col-4 mx-auto" id="examBtns">
          ${choices}
          </div>
        </div>
      `;
    });
    return questionList;
  }

  function renderLeaderBoard() {
    var rows = "";
    getLocal().forEach(function ({ initials, score }, i) {
      rows += `<tr>
          <th scope="row">${i + 1}/</th>
          <td id="userName" colspan="1">${initials}/</td>
          <td id="userScore">${score} | </td>
        </tr>`;
    });
    leaderBoard.innerHTML = rows;
  }

startBtn.addEventListener("click", function startQuiz(event) {
  event.preventDefault();
  hideStartBtn();
  timer = setInterval(clock, 1000);
  time = 15;
  countdown.textContent = time;
});



if (quizShow) quizShow.innerHTML = renderQuestions();

document.querySelector(".choice").classList.remove("invisible");

//need an event to select answers
document.addEventListener("click", function (event) {
  console.log(event.target);
  if (event.target.classList.contains("choiceBtn")) {
    if (event.target.classList.contains("correct-answer")) {
      score += 1;
      time += 5;
    } else {
      score -= 1;
      time -= 2;
    }
    if (questionIndex >= 5) {
      endGame();
    } else {
    document
      .querySelectorAll(".choice")
      [questionIndex].classList.add("invisible");
    document
      .querySelectorAll(".choice")
      [++questionIndex].classList.remove("invisible");
    }
  }
});

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("endBtn")) {
      event.preventDefault();
      setLocal();
      renderLeaderBoard()
    }
  });

//local storage

function setLocal() {
  let result = getLocal();
  let userValues = { initials: initials.value, score: score };
  result.push(userValues);
  let finalValues = JSON.stringify(result);
  localStorage.setItem("User-Info", finalValues);
}

function getLocal() {
  var retrieve = localStorage.getItem("User-Info");
  if (retrieve === null) {
    return [];
  }
  return JSON.parse(retrieve);
}
