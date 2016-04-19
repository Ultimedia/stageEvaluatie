<?php
	require_once("../core/core_functions.php");

	$loginData = json_decode(file_get_contents('php://input'), true);
	$email = $loginData["email"];
	$password = $loginData["password"];

	$dbc = getDBConnection();		

	// first see if this user has login permissions
	$sql = "SELECT user_id FROM stageapp_users WHERE user_email = ? AND user_admin = 1";
	if($stmt = $dbc->prepare($sql))
	{
		$stmt->bind_param('s',$email);
		if($stmt->execute())
		{
			$stmt->store_result();
			$stmt->bind_result($user_id);
			$stmt->fetch();

			if($stmt->num_rows() == 0)
			{
				echo false;
			}else{
				echo 13;
				/*
				$client=new soapclient('https://services.howest.be/Howest.Identity.Web.Service/v1.1/facade.asmx?WSDL', array('trace' => 1));
				$result = $client->AuthenticateUserByEmail(array('email'=>$email,'password'=>$password)); // Kan niet encrypteren voor webservice, moet zo verstuurd worden... 
				
				if($result->AuthenticateUserByEmailResult == true) {
					
					// login session
					session_start(); 
					$_SESSION['login']=mysqli_insert_id($dbc); 

					// Login correct
					echo $user_id;

				} else {
					// Login fout
					echo false;
				}*/
			}
		}else{
			echo false;
		}
	}else{
		return false;
	}
?>