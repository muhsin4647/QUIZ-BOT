// Homepage functionality
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.sets-grid')) {
        const setsGrid = document.querySelector('.sets-grid');
        
        // Generate 30 set cards
        for (let i = 1; i <= 30; i++) {
            const setCard = document.createElement('div');
            setCard.className = 'set-card';
            setCard.innerHTML = `Set ${i}`;
            setCard.addEventListener('click', () => startQuiz(i));
            setsGrid.appendChild(setCard);
        }
    }
});

function startQuiz(setNumber) {
    localStorage.setItem('selectedSet', setNumber);
    window.location.href = 'quiz.html';
}

// Quiz functionality
if (document.querySelector('.quiz-container')) {
    let currentQuestion = 0;
    let score = 0;
    let questions = [];

    const questionElement = document.querySelector('.question-text');
    const optionsContainer = document.querySelector('.options-container');
    const scoreElement = document.querySelector('.score span');
    const progressElement = document.querySelector('.progress span');

    // Load questions
    fetch(`data/questions/set${localStorage.getItem('selectedSet')}.json`)
        .then(response => response.json())
        .then(data => {
            questions = data;
            showQuestion();
        });

    function showQuestion() {
        const question = questions[currentQuestion];
        questionElement.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(optionElement);
        });

        progressElement.textContent = `${currentQuestion + 1}/${questions.length}`;
    }

    function selectAnswer(selectedIndex) {
        const correctIndex = questions[currentQuestion].correctAnswer;
        const options = document.querySelectorAll('.option');

        options.forEach((option, index) => {
            if (index === correctIndex) {
                option.style.backgroundColor = '#28a745';
            }
            if (index === selectedIndex && index !== correctIndex) {
                option.style.backgroundColor = '#dc3545';
            }
        });

        if (selectedIndex === correctIndex) {
            score++;
            scoreElement.textContent = score;
        }

        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                alert(`Quiz Completed! Score: ${score}/${questions.length}`);
                window.location.href = 'index.html';
            }
        }, 1500);
    }
}