<?php
// update_passwords.php
session_start();
try {
    // Update the database connection details as needed
    $pdo = new PDO('mysql:host=localhost;dbname=user_profiles', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}

// Fetch users and update passwords
$stmt = $pdo->query("SELECT fullname, password_hash FROM users"); // Adjust the field name if necessary

while ($user = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // Hash the existing plain text password
    $hashedPassword = password_hash($user['password'], PASSWORD_DEFAULT);
    
    // Update the password_hash field using placeholders
    $updateStmt = $pdo->prepare("UPDATE users SET password_hash = ? WHERE fullname = ?");
    // Make sure to pass both the hashed password and the user's fullname
    $updateStmt->execute([$hashedPassword, $user['fullname']]);
}

echo "Passwords updated successfully!";
?>
