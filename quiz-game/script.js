const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startButton = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');
const maxScoreSpan = document.getElementById('max-score');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart-button');
const progressBar = document.getElementById('progress');

const quizQuestions = [
    {
        question: 'What is the smallest country in the world by area?',
        answers: [
            { text: 'Vatican City', correct: true },
            { text: 'Monaco', correct: false },
            { text: 'San Marino', correct: false },
            { text: 'Liechtenstein', correct: false }
        ],
    },
    {
        question: 'How many bones are in the adult human body?',
        answers: [
            { text: '206', correct: true },
            { text: '208', correct: false },
            { text: '210', correct: false },
            { text: '212', correct: false }
        ],
    },
    {
        question: 'In what year did World War II end?',
        answers: [
            { text: '1945', correct: true },
            { text: '1946', correct: false },
            { text: '1947', correct: false },
            { text: '1948', correct: false }
        ],
    },
    {
        question: 'What is the best-selling video game of all time?',
        answers: [
            { text: 'Minecraft', correct: true },
            { text: 'Tetris', correct: false },
            { text: 'Grand Theft Auto V', correct: false },
            { text: "PlayerUnknown's Battlegrounds", correct: false }
        ],
    },
    {
        question: 'Which country has won the most FIFA World Cup titles?',
        answers: [
            { text: 'Brazil', correct: true },
            { text: 'Germany', correct: false },
            { text: 'Argentina', correct: false },
            { text: 'Italy', correct: false }
        ],
    },
    {
        question: 'Who directed the movie "Inception" (2010)?',
        answers: [
            { text: 'Christopher Nolan', correct: true },
            { text: 'Steven Spielberg', correct: false },
            { text: 'Quentin Tarantino', correct: false },
            { text: 'Martin Scorsese', correct: false }
        ],
    },
    {
        question: 'What planet is known as the Red Planet?',
        answers: [
            { text: 'Mars', correct: true },
            { text: 'Venus', correct: false },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ],
    },
    {
        question: 'Who was the first person to walk on the moon?',
        answers: [
            { text: 'Neil Armstrong', correct: true },
            { text: 'Buzz Aldrin', correct: false },
            { text: 'Michael Collins', correct: false },
            { text: 'Yuri Gagarin', correct: false }
        ],
    },
];

let currentQuestionIndex = 0;
let score = 0;
let hasReadQuestion = false;
let isReadyToAnswer = false;
let hasAnswered = false;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    hasReadQuestion = false;
    isReadyToAnswer = false;
    hasAnswered = false;
    document.getElementById('result-screen').classList.remove('active');

    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    showQuestion();
}




function showQuestion() {
    questionText.textContent = quizQuestions[currentQuestionIndex].question;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    totalQuestionsSpan.textContent = quizQuestions.length;
    answersContainer.innerHTML = '';
    answersContainer.classList.add('hidden');
    const percentage = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = percentage + '%';
    const readyContainer = document.createElement('div');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');
    checkbox.type = 'checkbox';
    checkbox.id = 'ready-checkbox';
    label.htmlFor = 'ready-checkbox';
    label.textContent = 'I\'m Ready To Answer';
    readyContainer.appendChild(checkbox);
    readyContainer.appendChild(label);
    quizQuestions[currentQuestionIndex].answers.forEach(answer => {

        const button = document.createElement('button');
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.classList.add('answer-btn');
        button.addEventListener('click', checkAnswer);
        answersContainer.appendChild(button);
    });
    answersContainer.before(readyContainer);
    checkbox.addEventListener('change', ()=>  {
        if (checkbox.checked) {
            isReadyToAnswer = true;
            answersContainer.classList.remove('hidden'); 
            readyContainer.remove();
        }
    },{once:true});
};

function checkAnswer(event) {
    const clickedButton = event.target;
    const scoreSpan = document.getElementById('score');    
    if (!isReadyToAnswer) return; 
    if (clickedButton.dataset.correct==='true') {
        clickedButton.classList.add('correct');
        score++;
        scoreSpan.textContent = score;
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        clickedButton.classList.add('incorrect');
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 5000);
}




function showResult() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    document.getElementById('result-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
    maxScoreSpan.textContent = quizQuestions.length;
    
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        resultMessage.textContent = "Great job! You know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! Keep learning!";
    } else if (percentage >= 40) {
        resultMessage.textContent = "Not bad! Try again to improve!";
    } else {
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}


startButton.addEventListener('click', startQuiz);

restartButton.addEventListener('click', startQuiz);