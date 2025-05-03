<?php
session_start(); // Start session

error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "Samu@2004";
$dbname = "user_profiles";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Debugging Output
var_dump($_SESSION);
var_dump($_POST);

// Use session username if not provided in POST
if (!isset($_POST['user_id']) || empty(trim($_POST['user_id']))) {
    if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
        $_POST['user_id'] = $_SESSION['user_id'];
    } else {
        die("Error: User id is missing in session and request.");
    }
}

$userid = intval($_POST['user_id']); 
$lesson_id = isset($_POST['lesson_id']) ? intval($_POST['lesson_id']) : 0;
$score = isset($_POST['score']) ? intval($_POST['score']) : 0;
if (!isset($_POST['total_questions']) || empty($_POST['total_questions'])) {
    die("Error: total_questions is missing in the request.");
}

$total_questions = intval($_POST['total_questions']);
$check_lesson = $conn->prepare("SELECT id FROM lessons WHERE id = ?");
$check_lesson->bind_param("i", $lesson_id);
$check_lesson->execute();
$lesson_result = $check_lesson->get_result();

if ($lesson_result->num_rows === 0) {
    die("Error: The provided lesson_id ($lesson_id) does not exist in the lessons table.");
}
// Check if username exists in database
$check_user = $conn->prepare("SELECT id FROM users WHERE id = ?");
$check_user->bind_param("i", $userid);
$check_user->execute();
$result = $check_user->get_result();

if ($result->num_rows === 0) {
    die("Error: Username does not exist in the database.");
}

// Insert into quiz_results table
$stmt = $conn->prepare("INSERT INTO quiz_results (user_id, lesson_id, score, total_questions, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP())");
$stmt->bind_param("iiii", $userid, $lesson_id, $score, $total_questions);

if ($stmt->execute()) {
    echo "Score stored successfully";
} else {
    echo "Error storing score: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
