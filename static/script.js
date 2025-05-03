// script.js

const currentUserId = 1; // Example user ID, replace with actual user authentication

// Lesson IDs for Mathematics (you can change these based on your actual lesson IDs)
const lessonIds = {
    addition: 1,
    subtraction: 2,
    multiplication: 3,
    division: 4,
    fractions: 5,
};

// Function to update the progress bar
function setProgressBar(percentage) {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = percentage + '%';
    progressBar.setAttribute('aria-valuenow', percentage);
    progressBar.textContent = percentage + '%';
}

// Function to update progress in the backend
function updateProgress(lessonId, completionPercentage) {
    fetch('update_progress.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: currentUserId,
            lessonId: lessonId,
            completion: completionPercentage
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Progress updated successfully!');
            setProgressBar(completionPercentage);
        } else {
            console.log('Failed to update progress.');
        }
    });
}

// Fetch user progress when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Fetch progress for all Mathematics lessons
    Object.values(lessonIds).forEach(lessonId => {
        fetch('get_progress.php?userId=' + currentUserId)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const progress = data.progress[lessonId] || 0; // Get progress for each lesson
                    setProgressBar(progress);
                }
            });
    });
});

// Example usage: updating progress for a specific lesson
// Call this function when the user completes a lesson, for example, when a button is clicked.
// updateProgress(lessonIds.addition, 100); // Replace 100 with the actual completion percentage
