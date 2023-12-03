<?php
$servername = "localhost";
$username = "root";
$password = "admin";
$dbname = "diet";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Nieudane połączenie: " . $conn->connect_error);
}


$sql = "SELECT * FROM Warzywa";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $rows = array();
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    echo json_encode($rows);
} else {
    echo "Brak danych w bazie.";
}
$conn->close();
?>
