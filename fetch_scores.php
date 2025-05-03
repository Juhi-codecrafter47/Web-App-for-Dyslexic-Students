<?php
session_start();  // Start session

// Ensure the user is logged in
if (!isset($_SESSION['user_id'])) {
    die("Error: User is not logged in.");
}

$user_id = $_SESSION['user_id'];  // Get the logged-in user's ID

// Database connection
$servername = "localhost";
$username = "root";
$password = "Samu@2004";
$dbname = "user_profiles";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to fetch quiz results for the logged-in user
$sql = "SELECT lesson_id, score, created_at FROM quiz_results WHERE user_id = ? ORDER BY created_at DESC";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Prepare the data
$scores = [];
$lessons = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $lessons[] = "Lesson " . $row['lesson_id'];  // You can customize this label
        $scores[] = $row['score'];
    }
}

// Return data as JSON
echo json_encode(['lessons' => $lessons, 'scores' => $scores]);

$stmt->close();
$conn->close();
?>
