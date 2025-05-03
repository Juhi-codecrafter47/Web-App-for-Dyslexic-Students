<?php
session_start();
echo "<pre>SESSION data:\n";
print_r($_SESSION);
echo "</pre>";
try {
    $pdo = new PDO('mysql:host=localhost;dbname=user_profiles', 'root', 'Samu@2004'); 
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

// Check if user is logged in
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $logout_time = date('Y-m-d H:i:s');

    // Debugging output
    echo "User ID: " . $user_id . "<br>";
    echo "Logout Time: " . $logout_time . "<br>";

    // Check if session exists before updating
    $checkStmt = $pdo->prepare("SELECT * FROM user_sessions WHERE user_id = ? AND logout_time IS NULL");
    $checkStmt->execute([$user_id]);
    $session = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($session) {
        echo "Session Found. Proceeding with logout update.<br>";

        // Update the user_sessions table
        $stmt = $pdo->prepare("
            UPDATE user_sessions 
            SET logout_time = ?, 
                session_duration = TIMESTAMPDIFF(SECOND, login_time, ?) 
            WHERE user_id = ? 
              AND logout_time IS NULL
        ");
        
        if ($stmt->execute([$logout_time, $logout_time, $user_id])) {
            echo "Logout time updated successfully!<br>";
        } else {
            echo "Failed to update logout time.<br>";
        }
    } else {
        echo "No active session found for this user.<br>";
    }

    // Destroy session
    session_destroy();
    exit();
}
?>
