// Adding questions and answer in an array
const quizQuestions = [
    {
        question: "What is JavaScript primarily used for?",
        answer: [
            { text: "Creating responsive and interactive web pages", correct: true },
            { text: "Writing server-side applications", correct: false },
            { text: "Designing graphical user interfaces", correct: false },
            { text: "Data analysis and manipulation", correct: false }
        ]
    },
    {
        question: "Which of the following data types is NOT valid in JavaScript?",
        answer: [
            { text: "Number", correct: false },
            { text: "Boolean", correct: false },
            { text: "Character", correct: true },
            { text: "Symbol", correct: false }
        ]
    },
    {
        question: "Which operator is used for strict equality comparison in JavaScript?",
        answer: [
            { text: "==", correct: false },
            { text: "=", correct: false },
            { text: "!=", correct: false },
            { text: "===", correct: true }
        ]
    },
    {
        question: "What does the DOM stand for in the context of web development?",
        answer: [
            { text: "Data Object Model", correct: false },
            { text: "Document Object Model", correct: true },
            { text: "Design Object Model", correct: false },
            { text: "Document Order Model", correct: false }
        ]
    },
    {
        question: "Which data type represents a collection of key-value pairs in JavaScript?",
        answer: [
            { text: "Array", correct: false },
            { text: "String", correct: false },
            { text: "Object", correct: true },
            { text: "Boolean", correct: false }
        ]
    }
];

const question = document.querySelector('.question');
const answerButtons = document.querySelector('.answer-option');
const nextBtn = document.querySelector('.next-btn');

let currentQuestionIndex = 0;
let score = 0;

// Function to start quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = quizQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(ans => {
        const button = document.createElement('button');
        button.innerHTML = ans.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (ans.correct) {
            button.dataset.correct = true
        }
        button.addEventListener('click', selectAnswer)
    });

};


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextBtn.style.display = 'block';
};

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizQuestions.length) {
        handleNextButton();
    }
    else {
        startQuiz()
    }

})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < quizQuestions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore(){
    resetState();
    question.innerHTML = `You have scored ${score} out of ${quizQuestions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display='block';
}



startQuiz();