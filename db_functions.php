<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    $pdo = new PDO('mysql:host=localhost;dbname=user_profiles', 'root', 'Samu@2004');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

// Logs user interactions into the database.
  
 // @param string $username The username of the user.
 //@param int $content_id The ID of the content being interacted with.
 
function logUserInteraction($username, $content_id) {
    global $pdo; // Use the PDO connection from above

    $sql = "INSERT INTO user_interactions (username, content_id, interaction_time) VALUES (:username, :content_id, NOW())";
    
    try {
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':content_id', $content_id);
        $stmt->execute();
    } catch (PDOException $e) {
        error_log("Error logging interaction: " . $e->getMessage()); // Log error for debugging
    }
}

// Handle AJAX requests
if (!empty($_POST['username']) && !empty($_POST['content_id']) && is_numeric($_POST['content_id'])) {
    $username = $_POST['username'];
    $content_id = $_POST['content_id'];
    error_log("Received: Username = $username, Content ID = $content_id");

    logUserInteraction($username, $content_id);
    echo json_encode(['status' => 'success', 'message' => 'Interaction logged.']);
} else {
    error_log("Invalid data received: " . json_encode($_POST));
}
?>
