<?php
// Step 1: Simulate user registration
$password = 'Sam@123'; // The password to register
$hashedPassword = password_hash($password, PASSWORD_DEFAULT); // Create a hash

// Simulate storing the hashed password in a variable
$storedHash = $hashedPassword;

// Display the generated hash (for testing purposes only)
echo "Generated hash (to be stored): " . $storedHash . "<br>";

// Step 2: Simulate user login
$inputPassword = 'Sam@123'; // The password the user enters during login

// Now verify it
if (password_verify($inputPassword, $storedHash)) {
    echo "Password is valid! Login successful.";
} else {
    echo "Invalid password.";
}

?>