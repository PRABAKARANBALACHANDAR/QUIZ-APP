let currentPage = 1;
const totalPages = 4;
let timeLeft = 300; 
let timerInterval;

function init() {
    showPage(currentPage);
    startTimer();
}

function showPage(page) {
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById(`page${i}`).style.display = 'none';
    }
    document.getElementById(`page${page}`).style.display = 'block';
    if (page === 1) {
        document.getElementById('prevBtn').style.display = 'none';
    } else {
        document.getElementById('prevBtn').style.display = 'inline';
    }
    if (page === totalPages) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'inline';
    } else {
        document.getElementById('nextBtn').style.display = 'inline';
        document.getElementById('submitBtn').style.display = 'none';
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

function submitQuiz() {
    clearInterval(timerInterval);

    let score = 0;
    const totalQuestions = document.querySelectorAll('.question').length;

    document.querySelectorAll('.question').forEach(question => {
        const inputs = question.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked, input[type="text"], select');
        const userAnswers = Array.from(inputs).map(input => {
            if (input.tagName === 'SELECT') {
                return input.value;
            } else if (input.type === 'checkbox') {
                return input.value;
            } else if (input.type === 'text') {
                return input.value.trim().toLowerCase();
            } else {
                return input.value;
            }
        }).join(',');

        const correctAnswers = {
            'question1': "print('Hello, World!')",
            'question2': ["_name", "first_name"],
            'question3': "4",
            'question4': "HTML",
            'question5': "<ul>",
            'question6': "All of the above",
            'question7': "Cascading Style Sheets",
            'question8': ["<header>", "<footer>"],
            'question9': "hello world",
            'question10': "background-color",
            'question11': "React",
            'question12': "/* comment */",
            'question13': "<div>",
            'question14': "Structured Query Language",
            'question15': "All of the above",
            'question16': "To specify alternate text for the image",
            'question17': "All of the above",
            'question18': "Application Programming Interface",
            'question19': "x = 5",
            'question20': "red"
        };

        const questionId = question.id;
        if (Array.isArray(correctAnswers[questionId])) {
            const correctValues = correctAnswers[questionId].sort().join(',');
            if (userAnswers === correctValues) {
                score++;
            }
        } else {
            if (userAnswers.toLowerCase() === correctAnswers[questionId].toLowerCase()) {
                score++;
            }
        }
    });

    showScore(score, totalQuestions);
}

function showScore(score, totalQuestions) {
    const scorePercentage = (score / totalQuestions) * 100;
    const scoreMessage = `You scored ${score} out of ${totalQuestions} (${scorePercentage.toFixed(2)}%)`;

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('score-container').style.display = 'block';
    document.getElementById('score-message').innerText = scoreMessage;
}

function resetQuiz() {
    clearInterval(timerInterval);
    currentPage = 1;
    timeLeft = 600;
    showPage(currentPage);
    startTimer();

    document.querySelectorAll('.question input[type="radio"], .question input[type="checkbox"], .question input[type="text"], .question select').forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });

    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('score-container').style.display = 'none';
}
document.addEventListener('DOMContentLoaded', function() {
    init();
    document.getElementById('prevBtn').addEventListener('click', prevPage);
    document.getElementById('nextBtn').addEventListener('click', nextPage);
    document.getElementById('submitBtn').addEventListener('click', submitQuiz);
    document.getElementById('resetBtn').addEventListener('click', resetQuiz);
});
