function showHint(questionId) {
    const hintElement = document.getElementById(`hint-${questionId}`);
    if (hintElement.style.display === "none") {
        hintElement.style.display = "block";
    } else {
        hintElement.style.display = "none";
    }
}

function showPopup(message) {
    alert(message); // You can customize this with a modal instead of an alert for a better user experience.
}

function submitQuiz() {
    const totalQuestions = 10;
    let score = 0;
    let unanswered = false;

    // Check answers
    for (let i = 1; i <= totalQuestions; i++) {
        const question = document.querySelector(`input[name="question${i}"]:checked`);
        if (!question) {
            unanswered = true;
            showPopup(`Please select an answer for question ${i}.`);
            return; // Exit the function if there's an unanswered question
        } else if (question.value === 'scribble' || 
                   question.value === 'comfort' || 
                   question.value === 'spectacle' || 
                   question.value === 'bravery' || 
                   question.value === 'consider' || 
                   question.value === 'near' || 
                   question.value === 'slow' || 
                   question.value === 'skill' || 
                   question.value === 'routine' || 
                   question.value === 'error') {
            score++;
        }
    }

    // Display result creatively
    const result = document.getElementById('result');
    result.innerHTML = `<h3>Your Score: ${score} out of ${totalQuestions}</h3>`;
    if (score === totalQuestions) {
        result.innerHTML += '<p>🎉 Excellent! You nailed it! 🎉</p>';
    } else if (score >= totalQuestions / 2) {
        result.innerHTML += '<p>👍 Good job! Keep practicing!</p>';
    } else {
        result.innerHTML += '<p>📝 Don\'t worry! Practice makes perfect!</p>';
    }

    // Send the results to the PHP script
    const name = prompt("Please enter your name:");
    
    fetch('submit_quiz.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(name)}&score=${score}&total_questions=${totalQuestions}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data); // Handle response from PHP (for debugging)
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
