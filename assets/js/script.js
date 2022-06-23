//variables

var scores = document.querySelector("#scores");
var timer = document.querySelector("#timer");
var intro = document.querySelector("#header-intro");
var title = document.querySelector("#title");
var content = document.querySelector("#content");
var start = document.querySelector("#start-button");
var questions = document.querySelector("#questions");

class Questions {
    constructor(queston, options, answser) {
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
}
//questions and answers
var questonsList = [];

var options1 = ["1. Debugging", "2. Error Checking", "3. Reficing", "4. Problem solving"];
var question1 = new Questions("Resolving errors in a program is known as:", options1, "1. Debugging");

var options2 = ["1. Low Level Languages", "2. High Level Languages", "3. Machine Code", "4. Algorithms"];
var question2 = new Questions("What is the only thing that computers understand?", options2, "3. Machine Code");

var options3 = ["1. Translated into a high level language", "2. converted into binary", "3. Translated into a low level language", "4. Translated into its machine code"];
var question2 = new Questions("Before a computer can understand a program, it must be...", options3, "4. Translated into its machine code");

var options4 = ["1. Assembly", "2. C++", "3. JavaScript", "4. Python"];
var questions4 = new Questions("Which of the following is not a high level programming language?", options4, "1. Assembly");

var options5 = ["1. True", "2. False"];
var questions5 = new Questions("Machine code uses the binary nubmer system", options5, "1. True");


var optionList = [];
var currentQues = 0;
var score = 0;
var timeLeft = 61;
var isQuizOngoing = false;
var leaderboard = [];
var initials = "";
var isClearingAnswer = false;
var cleaingAnswerCode = 0;
var isCorrect = false;

function init() {
    start.addEventListener("click", questionLoop);
    scores.addEventListener("click", showScores);

}


// makes elements invisible

function questionLoop() {
    runTimer();
    isQuizOngoing = true;
    start.setAttribute("style", "display: none");
    content.setAttribute("style", "display: none");
    var numOfOptions = questionList[0].options.length;
    for(var i = 0; i < numOfOptions; i++) {
        var option = document.createElement("button");
        container.appendChild(option);
        optionList.push(option);
        option.setAttribute("id", `buton${i + 1}`);
    }
    nextQuestion();
}



