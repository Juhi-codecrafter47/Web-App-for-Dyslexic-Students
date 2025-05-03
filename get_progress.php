<?php
session_start();

try {
    $pdo = new PDO('mysql:host=localhost;dbname=user_profiles', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

$username = $_GET['user_name']; // Get user name from the request


$query = "SELECT lesson_id, completion FROM progress WHERE user_name = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$username]); // Bind both parameters as strings

$progress = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $progress[$row['lesson_id']] = $row['completion'];
}

$response = [
    'success' => true,
    'progress' => $progress
];
echo json_encode($response);
?>
