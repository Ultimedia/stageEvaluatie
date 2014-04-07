<?php
	require_once("core_functions.php");

	$dbc = getDBConnection();		
	$sql = "SELECT * FROM stageapp_internships";
	
	$result = $dbc->query($sql);
	$interns = array();

	while($row = $result->fetch_assoc()){
		$intern = array("internship_id"=>$row["internship_id"], 
			"international" => $row["int"], 
			"student"=>$row["student"],
			"email"=>$row["email"], 
			"organisation"=>$row["organisation"], 
			"mentor"=> $row["mentor"],  
			"location"=> $row["location"], 
			"discipline"=> $row["discipline"], 
			"coach"=>$row['coach']);

		$intern = array_map('utf8_encode', $intern);
		$interns[] = $intern;
	}
	
	$dbc->close();
	print json_encode($interns);

?>
