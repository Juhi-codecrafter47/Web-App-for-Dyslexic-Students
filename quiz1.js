// Total number of questions
const totalQuestions = 10; // Change this if you have a different number of questions

function showHint(questionId) {
    const hintElement = document.getElementById(`hint-${questionId}`);
    hintElement.style.display = hintElement.style.display === "none" ? "block" : "none";
}

function submitQuiz() {
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);
    let score = 0; // Ensure score is defined with let

    // Correct answers
    const correctAnswers = {
        question1: '15',
        question2: '30',
        question3: '6',
        question4: '16',
        question5: '30',
        question6: '3',
        question7: '49',
        question8: '14',
        question9: '30',
        question10: '85',
    };

    // Reset previous results
    document.querySelectorAll('.answer').forEach(answer => {
        answer.classList.remove('correct', 'incorrect');
    });

    // Calculate score and display feedback
    for (let [key, value] of formData.entries()) {
        const questionElement = document.querySelector(`input[name="${key}"]`);
        const answerElement = questionElement.closest('.form-group');
        
        if (correctAnswers[key] === value) {
            score++;
            answerElement.querySelector(`input[value="${value}"]`).parentElement.classList.add('correct');
        } else {
            answerElement.querySelector(`input[value="${value}"]`).parentElement.classList.add('incorrect');
            answerElement.querySelector(`input[value="${correctAnswers[key]}"]`).parentElement.classList.add('correct');
        }
    }

    // Display result
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Your score is ${score} out of ${totalQuestions}.`;

    // Optionally, you can provide feedback based on score
    if (score === totalQuestions) {
        resultElement.innerHTML += "<br>Great job! You got all the answers correct!";
    } else if (score > totalQuestions / 2) {
        resultElement.innerHTML += "<br>Good effort! Keep practicing!";
    } else {
        resultElement.innerHTML += "<br>Don't worry, try again and you'll improve!";
    }
    console.log("Submitting quiz...")
    fetch('store_quiz_result.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(getUsernamefromsession())}&score=${score}&total_questions=${totalQuestions}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Handle response from PHP (for debugging)
    })
    .catch(error => {
        console.error('Error:', error);
    });
    function getUsernamefromsession() {
        return "<?php echo isset($_SESSION['username']) ? '$_SESSION['username']' : ''; ?>"
    }
    // Store result
    storeResult(score);
}
