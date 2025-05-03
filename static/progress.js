// progress.js
document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const wordsRead = params.get('wordsRead');
    const sentencesCompleted = params.get('sentencesCompleted');
    const totalTime = params.get('totalTime');
    const lessonsCompleted = params.get('lessonsCompleted');
    const assessmentScore = params.get('assessmentScore');

    document.getElementById('wordsReadDisplay').innerText = `Words Read: ${wordsRead}`;
    document.getElementById('sentencesCompletedDisplay').innerText = `Sentences Completed: ${sentencesCompleted}`;
    document.getElementById('totalTimeDisplay').innerText = `Total Time: ${totalTime} seconds`;
    document.getElementById('lessonsCompletedDisplay').innerText = `Lessons Completed: ${lessonsCompleted}`;
    document.getElementById('assessmentScoreDisplay').innerText = `Assessment Score: ${assessmentScore}`;
});
