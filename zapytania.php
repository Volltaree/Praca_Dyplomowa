/* w późniejszym etapie */

<?php
$conn = new mysqli("localhost", "root", "admin", "diet");

if ($conn->connect_error) {
    die("Błąd połączenia z bazą danych: " . $conn->connect_error);
}

$sql = "SELECT nazwa, kalorie, bialko, weglowodany, tluszcze FROM warzywa";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $warzywa = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($warzywa);
} else {
    echo json_encode([]);
}

$conn->close();
?>

