<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $wordsRead = $_POST['wordsRead'];
    $sentencesCompleted = $_POST['sentencesCompleted'];
    $totalTime = $_POST['totalTime'];
    $lessonsCompleted = $_POST['lessonsCompleted'];
    $assessmentScore = $_POST['assessmentScore'];
} else {
    // Redirect if accessed without POST data
    header("Location: /MINI%20PROJECT/Home.php"); // Change to your main page
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Progress Results</title>
</head>
<body>
    <h1>Progress Results</h1>
    <p>Words Read: <?php echo htmlspecialchars($wordsRead); ?></p>
    <p>Sentences Completed: <?php echo htmlspecialchars($sentencesCompleted); ?></p>
    <p>Total TTS Time: <?php echo htmlspecialchars($totalTime); ?> seconds</p>
    <p>Lessons Completed: <?php echo htmlspecialchars($lessonsCompleted); ?></p>
    <p>Last Assessment Score: <?php echo htmlspecialchars($assessmentScore); ?></p>

    <a href="/MINI%20PROJECT/Home.php">Go Back</a> <!-- Link back to the initial page -->
</body>
</html>
