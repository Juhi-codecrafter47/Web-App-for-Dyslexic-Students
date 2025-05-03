<?php
// Database connection
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = "Samu@2004"; // Default XAMPP password is empty
$dbname = "user_profiles";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Display errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
?>

<html>
<head>
    <link rel="stylesheet" href="home.css">
</head>
<body>
    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Collecting and sanitizing form data
        $fullname = isset($_POST["fullname"]) ? htmlspecialchars($_POST["fullname"]) : 'Guest';
        $age = isset($_POST["age"]) ? htmlspecialchars($_POST["age"]) : '9-12 years';
        $email = isset($_POST["email"]) ? htmlspecialchars($_POST["email"]) : '';
        $password = isset($_POST['password']) ? $_POST["password"] : ''; // No need to use htmlspecialchars here
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Prepare and bind the SQL statement
        $stmt = $conn->prepare("INSERT INTO users (fullname, age, email, password) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $fullname, $age, $email, $hashedPassword);
        
        // Execute and check for success
        if ($stmt->execute()) {
            echo "Registration successful! Welcome, " . $fullname . "<br>";
            echo "Your Age is between " . $age . "<br>";
            echo "Your email address is: " . $email;
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement and connection
        $stmt->close();
        $conn->close();
    } else {
        echo "Form was not submitted.";
    }
    ?>
</body>
</html>
