
let scores = document.getElementById("scores");
let timer = document.getElementById("timer");
let container = document.getElementById("container");
let title = document.getElementById("title");
let content = document.getElementById("content");
let start = document.getElementById("start");
let answer = document.getElementById("answer");
var time_start = false;
var time = 100;


class Question {
    constructor(question, options, answer) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}

let questions = [

{
question: "Resolving errors in a program is known as:",
options: ["1. Debugging", "2. Error Checking", "3. Refixing", "4. Problem solving"],
correctAnswer: 1
},

{
    question: "What is the only thing that computers understand?",
    options: ["1. Low Level Languages", "2. High Level Languages", "3. Machine Code", "4. Algorithms"],
    correctAnswer: 3
    },

{
 question: "Before a computer can understand a program, it must be...",
 options: ["1. Translated into a high level language", "2. converted into binary", "3. Translated into a low level language", "4. Translated into its machine code"],
 correctAnswer: 4
 },

        {
            question: "Which of the following is not a high level programming language?",
            options: ["1. Assembly", "2. C++", "3. JavaScript", "4. Python"],
            correctAnswer: 1
            },

            {
                question: "What data types can a function return?",
                options: ["1. string", "2. number", "3. boolean", "4. all of the above"],
                correctAnswer: 4
                },

];

//countdown timer

var countdownTimerInterval = setInterval(countdownTimer, 1000);

function countdownTimer () {
    if (time_start)
    time--;
    if(time<= 0) {
    end_quiz();
    time = 0;    
    }
    document.getElementById("timer").innerHTML = time;
}


let optionList = [];
let currentQues = 0;
let score = 0;
let timeLeft = 100;
let isQuizOngoing = false;
let leaderboard = [];
let initials = "";
let isClearingAnswer = false;
let clearingAnswerCode = 0;
let isCorrect = false;


function init() {
    start.addEventListener("click", questionLoop);
    scores.addEventListener("click", showScores);
}


function questionLoop () {
    countdownTimer();
    isQuizOngoing = true;
    start.setAttribute("style", "display: none");
    content.setAttribute("style", "display: none");
    let numOfOptions = questions.options;
    for(let i = 0; i < numOfOptions; i++) {
        let option = document.createElement("button");
        container.appendChild(option);
        optionList.push(option);
        option.setAttribute("id", `button${i + 1}`);
    }
    nextQuestion();
}





function nextQuestion(event) {
    writeAnswer(event);
    if(currentQues < questions.length) {
        changeQuestion();
    } else {
        endOfQuiz();
    }
}



function writeAnswer(event) {
    if(event !== undefined) {
        if(event.currentTarget.textContent === questions[currentQues - 1].answer) {
            isCorrect = true;
            answer.textContent = "Correct";
            answer.setAttribute("style", "color: green");
            score += 10;
        } else {
            isCorrect = false;
            answer.textContent = "Incorrect";
            answer.setAttribute("style", "color: red");
            if(timeLeft > 10) {
                timeLeft -= 10;
            } else {
                timeLeft = 1;
            }
            timer.setAttribute("style", "color: red");
            setTimeout(function () {
                timer.setAttribute("style", "color: black");
            },1000);
        }
        clearAnswer();
    }
}


function clearAnswer() {
    if(isClearingAnswer) {
        isClearingAnswer = false;
        clearTimeout(clearingAnswerCode);
        clearAnswer();
    } else {
        isClearingAnswer = true;
        clearingAnswerCode = setTimeout(function() {
            answer.textContent = "";
            isClearingAnswer = false;
        }, 3000);
    }
}


function changeQuestion() {
    title.textContent = questions[currentQues].question;
    for(let i = 0; i < questions[currentQues].options; i++) {
        optionList[i].textContent = questions[currentQues].options[i];        
        optionList[i].addEventListener("click", nextQuestion);
    }
    currentQues++;
}


function endOfQuiz() {
    title.textContent = "All Done.";
    timeLeft = 1;
    clearOptions();
    clearAnswer();
    content.setAttribute("style", "display: visible");
    content.textContent = `Your final score is ${score}`;
    inputFields();
}


function clearOptions() {
    for(let i = 0; i < optionList.length; i++) {
        optionList[i].remove();
    }
    optionList = [];
}


function inputFields() {
    let initialsForm = document.createElement("form");
    container.appendChild(initialsForm);
    initialsForm.setAttribute("id", "form");
    let label = document.createElement("label");
    initialsForm.appendChild(label);
    label.textContent = "Enter initials: "
    let input = document.createElement("input")
    initialsForm.appendChild(input);
    input.setAttribute("id", "initials");
    let submit = document.createElement("button");
    initialsForm.appendChild(submit);
    submit.setAttribute("id", "submit");
    submit.textContent = "Submit";

    title.setAttribute("style", "align-self: start")
    content.setAttribute("style", "align-self: start; font-size: 150%");

    
    input.addEventListener("keydown", stopReload);
    submit.addEventListener("click", addScore);
    
}


function stopReload(event) {
    if(event.key === "Enter") {
        event.preventDefault();
    }
}


function addScore(event) {
    if(event !== undefined) {
        event.preventDefault();
    }
    let id = document.getElementById("initials");
    if(id.value.length > 3 || id.value.length === 0) {
        invalidInput();
        return;
    }
    isQuizOngoing = false;
    document.getElementById("form").remove();
    saveScore(id);
}


function saveScore(id) {
    if(localStorage.getItem("leaderboard") !== null) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    leaderboard.push(`${score} ${id.value}`);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    showScores();    
}


function invalidInput() {
    answer.textContent = "Initials must be entered and three characters or less";
    answer.setAttribute("style", "color: black");
    clearAnswer();
    let submit = document.getElementById("submit");
    submit.addEventListener("click", addScore);
}


function showScores() {
    if(!isQuizOngoing) {
        title.textContent = "High Scores";
        
        start.setAttribute("style", "display: none");
        writeScores();
        createEndButtons();
    } else if(title.textContent === "All Done.") {
        answer.textContent = "Please enter your initials first";
        answer.setAttribute("style", "color: black");
        clearAnswer();
    } else {
        answer.textContent = "Cannot view scores until the quiz is over";
        answer.setAttribute("style", "color: black");
        clearAnswer();
    }
}


function writeScores() {
    content.textContent = "";
    content.setAttribute("style", "white-space: pre-wrap; font-size: 150%");
    if(localStorage.getItem("leaderboard") !== null) {
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    }
    leaderboard.sort();
    leaderboard.reverse();
    let limit = 11;
    if(limit > leaderboard.length) {
        limit = leaderboard.length;
    }
    for(let i = 0; i < limit; i++) {
        content.textContent += leaderboard[i] + '\n';
    }
}


function createEndButtons() {
    if(!document.getElementById("restart")) {
        let restartVar = document.createElement("button");
        container.appendChild(restartVar);
        restartVar.textContent = "Go Back";
        restartVar.setAttribute("id", "restart");
        
        let clearScoresVar = document.createElement("button");
        container.appendChild(clearScoresVar);
        clearScoresVar.textContent = "Clear High Scores";
        clearScoresVar.setAttribute("id", "clearScores");
        
        restartVar.addEventListener("click", restart);
        clearScoresVar.addEventListener("click", clearScores)
    }
}


function restart() {
    title.setAttribute("style", "align-self: center");
    content.setAttribute("style", "align-self: center; font-size: 110%");
    document.getElementById("restart").remove();
    document.getElementById("clearScores").remove();
    title.textContent = "Coding Quiz Challenge";
    content.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your time by reducing it by ten seconds.";
    start.setAttribute("style", "display: visible");
    currentQues = 0;
    score = 0;
    timeLeft = 61;
    init();
}


function clearScores() {
    localStorage.clear();
    content.textContent = "";
    leaderboard = [];
}

init()

