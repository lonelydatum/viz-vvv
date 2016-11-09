<?php
	$servername = "localhost";
	$username = "vizzywizz";
	$password = "88**Honda";
	$dbname = "garliuvvv";


	// $connection = mysqli_connect(localhost, 'vizzywizz', '88**Honda', "garliuvvv") or 	die(mysql_error());

	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 


// 	$sql = "SELECT * FROM allcountries";
// $result = $conn->query($sql);

// if ($result->num_rows > 0) {
//     // output data of each row
//     while($row = $result->fetch_assoc()) {
//         echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
//     }
// } else {
//     echo "0 results";
// }

// $conn->close();


	// echo "Connected successfully";

?>