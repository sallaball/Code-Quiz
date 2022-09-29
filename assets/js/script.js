
const restartButton = document.getElementById('restart');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
restartButton.addEventListener('click', restart)
;
function startGame() {
    console.log('started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
        }
    }


function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
} else {
    restartButton.innerText = 'Restart'
    restartButton.classList.remove('hide')
}
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        } else {
            element.classList.add('wrong')
        }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions =[
    {
        question: "Resolving errors in a program is known as:",
        answers: [
            { text: "1. Debugging", correct:true },
            {text: "2. Error Checking", correct: false },
            { text: "3. Refixing", correct: false },
            { text: "4. Problem solving", correct: false },
        ]
    },      
        {
            question: "What is the only thing that computers understand?",
            answers: [
                { text: "1. Low Level Languages", correct: false },
                { text: "2. High Level Languages", correct: false },
                { text: "3. Machine Code", correct: true },
                { text: "4. Algorithms", correct: false }
            ]
         },
        
        {
         question: "Before a computer can understand a program, it must be...",
         answers: [
            { text: "1. Translated into a high level language", correct: false },
            { text: "2. converted into binary", correct: false },
            { text: "3. Translated into a low level language", correct: false },
            { text: "4. Translated into its machine code", correct: true }
        ]
         },
        
        {
            question: "Which of the following is not a high level programming language?",
            answers: [
                { text: "1. Assembly", correct: true },
                { text: "2. C++", correct: false },
                { text: "3. JavaScript", correct: false },
                { text: "4. Python", correct: false }
            ]
            },
            {
              question: "What data types can a function return?",
              answers: [
                { text: "1. string", correct: false },
                { text: "2. number", correct: false },
                { text: "3. boolean", correct: false },
                { text: "4. all of the above", correct: true }
            ]
             }
]

function restart() {
        title.setAttribute("style", "align-self: center");
        content.setAttribute("style", "align-self: center; font-size: 110%");
        // document.getElementById("restart").remove();
        title.textContent = "Coding Quiz Challenge";
        content.textContent = "Answer questions within the timelimit and remember that incorrect answers will deduct 10 seconds from time left.";

        startButton.classList.remove('hide');
        resetState();
        
    }