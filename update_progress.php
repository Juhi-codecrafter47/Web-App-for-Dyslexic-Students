<?php
// update_progress.php
include 'database_connection.php'; // Include the database connection

// Get the input data
$data = json_decode(file_get_contents('php://input'), true);
$userId = $data['userId'];
$lessonId = $data['lessonId'];
$completion = $data['completion'];
$subject = $data['subject']; // Add subject parameter

// Update the progress in the database
$query = "INSERT INTO progress (user_id, lesson_id, completion, subject)
          VALUES (?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE completion = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("iiisi", $userId, $lessonId, $completion, $subject, $completion);

$response = [];
if ($stmt->execute()) {
    $response['success'] = true;
} else {
    $response['success'] = false;
}
echo json_encode($response);
?>
