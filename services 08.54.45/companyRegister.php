<?php
	require_once("core_functions.php");

	$company_email = $_POST['company_email'];
	$company_name = $_POST['company_name'];
	$company_title = $_POST['company_title'];

	$dbc = getDBConnection();		
	$sql = "INSERT INTO stageapp_companies (company_email, company_name, company_title) VALUES (?,?,?)";
	$stmt = null;
	
	if($stmt = $dbc->prepare($sql)){
		$stmt->bind_param("sss", $company_email, $company_name, $company_title);
		
		if($stmt->execute())
		{
			if($count == 0)
			{
				$status['id'] = mysqli_insert_id($dbc);
				$status['value'] = true;
			}else{
				$status['value'] = false;
			}
			print json_encode($status);
		}else{
			$status['value'] = false;
			print json_encode($status);
		}
	}else{
		$dbc->close();
		return false;
	}
?>

