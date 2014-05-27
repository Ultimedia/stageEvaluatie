<?php
	require_once("../core/core_functions.php");

	$companyData = json_decode(file_get_contents('php://input'), true);
	$verification_code = $companyData["verify_code"];
	$company_contact = $companyData["company_contact"];
	$company_email = $companyData["company_email"];
	$company_name = $companyData["company_name"];

	$dbc = getDBConnection();		

	// first check the verification code
	if($verification_code == "140613"){

		$sql = "INSERT INTO stageapp_companies (company_contact, company_email, company_name) VALUES (?,?,?)";
		$stmt = null;
	
		if($stmt = $dbc->prepare($sql)){
			$stmt->bind_param('sss',$company_contact, $company_email, $company_name);
			
			if($stmt->execute()){
				$company = array(
					"company_contact"=>$company_contact,
					"company_email"=>$company_email, 
					"company_name"=>$company_name,
					"company_id"=>mysqli_insert_id($dbc));

				echo json_encode($company); 
			}else{
				echo false;
			}
		}
	}else{
		echo false;
	}
?>
