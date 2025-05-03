<?php
$servername = "localhost"; // Your server name
$username = "root"; // Your database username
$password = ""; // Your database password
$dbname = "user_profiles"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the name and score from the request
    $name = $_POST['name'] ?? 'Anonymous'; // Default to 'Anonymous' if no name provided
    $score = isset($_POST['score']) ? intval($_POST['score']) : 0;
    $total_questions = isset($_POST['total_questions']) ? intval($_POST['total_questions']) : 0;


    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO results (name, score, total_questions, created_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP())");
    $stmt->bind_param("sii", $name, $score, $total_questions);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
}

// Close connection
$conn->close();
?>
