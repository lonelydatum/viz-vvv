<?php
	require_once('common_mysql.php');
	
	$INDIA = $_REQUEST['india'];
	$IRAQ = $_REQUEST['iraq'];
	$MEXICO = $_REQUEST['mexico'];
	$UGANDA = $_REQUEST['uganda'];
	$UKRAINE = $_REQUEST['ukraine'];

	$COUNTRY = $_REQUEST['country'];
	$STATUS_COUNTRY = $_REQUEST['status_country'];
	$STATUS_HOUSEHOLD = $_REQUEST['status_household'];
	
	$countriesSelected = array();
	$countriesSQLappend = "(";
	

	if($INDIA=="true") array_push( $countriesSelected, "india" );	
	if($IRAQ =="true") array_push( $countriesSelected, "iraq" );
	if($MEXICO =="true") array_push( $countriesSelected, "mexico" );	
	if($UGANDA =="true") array_push( $countriesSelected, "uganda" );
	if($UKRAINE =="true") array_push( $countriesSelected, "ukraine" );
		
	for( $i=0; $i<count($countriesSelected); $i++ ){
		$ORappend = "";
		if( $i != 0 ){
			$ORappend = " OR ";
		}
		$countriesSQLappend = $countriesSQLappend . $ORappend. "country='" . $countriesSelected[$i] . "'";
	}
	
	$countriesSQLappend = $countriesSQLappend. ")";
	
	
	$q = "SELECT * FROM allcountries WHERE ".$countriesSQLappend;
	
	
	// echo $q;
	
	// $q = "SELECT * FROM iraq LIMIT 110";
	$result = $conn->query($q);
	// $result = mysqli_query($conn, $q) or die("Error in Selecting " . mysqli_error($connection));

	

$rows = array();

while($r = mysqli_fetch_assoc($result)) {
	// $rows[] = $r;
    // $rows[] = array("country" => $r["country"]);

    $object = new stdClass();
	$object->country = $r['country'];
	$object->country_status = $r['country_status'];
	$object->household_status = $r['household_status'];


	$object->household_changes = $r['household_changes'];
	$object->qualitylife_changes = $r['qualitylife_changes'];	
	$object->future = $r['future'];
	
	$fuckedupshit = json_encode($object);
	$rows[] = json_decode($fuckedupshit);
    
}

// echo ($rows);

echo json_encode($rows);	
mysqli_close($connection);


?>
