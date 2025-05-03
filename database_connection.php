<?php
// database_connection.php
$servername = "localhost: 3307";
$username = "root"; // Use your MySQL username
$password = "";     // Use your MySQL password
$dbname = "phonics_learning";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>


