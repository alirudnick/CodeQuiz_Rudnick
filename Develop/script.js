const introEl = document.querySelector("#intro");

let timeEl = document.querySelector("p.time");
let secondsLeft = 45;
let scoreEl = document.querySelector("#score");

const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;

const finalScoreEl = document.querySelector("#finalScore");

const finalEl = document.querySelector("#final");
let initialsInput = document.querySelector("#initials");

const highscoresEl = document.querySelector("#highscores");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];


const startBtn = document.querySelector("#start");
const ansBtn = document.querySelectorAll("button.ansBtn")
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");
const answer3 = document.querySelector("#answer3");
const answer4 = document.querySelector("#answer4");
const submitScoreBtn = document.querySelector("#submit-score");
const goBackBtn = document.querySelector("#goback");
const clearScoreBtn = document.querySelector("#clearscores");
const viewScoreBtn = document.querySelector("#view-scores");

function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        answer1.textContent = questions[id].answers[0];
        answer2.textContent = questions[id].answers[1];
        answer3.textContent = questions[id].answers[2];
        answer4.textContent = questions[id].answers[3];
    }
}

const questions = [ 
    {
        // question 0
        question: "Indoor cycling is commonly referred to as:",
        answers: ["1. spinning", "2. running", "3. weight training", "4. crazy!"],
        correctAnswer: "0"
    },
    {
        // question 1
        question: "What is the most important nutrient to consume during prolonged exercise?",
        answers: ["1. sugars", "2. water", "3. oils", "4. carbs"],
        correctAnswer: "3"
    },
    {
        // question 2
        question: "Lower intensity workouts burn more...",
        answers: ["1. brain cells", "2. muscles", "3. fat", "4. glucose"],
        correctAnswer: "3"
    },
    {
        // question 3
        question: "What are clipless pedals?",
        answers: ["1. No such thing", "2. Gives you the ability to ride barefoot", "3. They attach to the soles of clipless cycling shoes", "4. Cages for your sneakers"],
        correctAnswer: "2"
    },
    {
        // question 4
        question: "If your hips are moving side to side when riding, that usually indicates..",
        answers: ["1. Your shoes are too tight ", "2. Your seat is too high", "3. Your seat is too low", "4. You are too tired to ride"],
        correctAnswer: "1"
    }
];

function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}



function checkAnswer(event) {
    event.preventDefault();

    finalScoreEl.style.display = "block";
    let p = document.createElement("p");
    finalScoreEl.appendChild(p);

    // time out after 1 second
    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}


startBtn.addEventListener("click", startQuiz);

ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScoreBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 45;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

clearScoreBtn.addEventListener("click", clearScores);

viewScoreBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("Start the quiz to log scores!");
    }
});