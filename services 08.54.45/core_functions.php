<?php
	function getDBConnection(){
		$dbc = new mysqli('localhost', 'deb31925_watm', 'miniketen', 'deb31925_watm');
		
		
		if(mysqli_connect_error()){
			$error = "Connection error";
			$error .= mysql_errno() . " - " . mysqli_connect_error();
			die($error);
		}else{ return $dbc;}
	}
?>