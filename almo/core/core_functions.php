<?php

function getDBConnection(){
		$dbc = new mysqli('localhost', 'root', 'root', 'stagetool');
		//$dbc = new mysqli("mysqlhost2", "devine", "8W3w03oA5iq32jt", "devine");
		if( mysqli_connect_error() ){
			$error = "Er deed zich een probleem voor bij het connecteren naar de database!<br />";
			$error .= " Extra info: " . mysqli_connect_errno() . " - " . mysqli_connect_error();
			die( $error );
		}
		else{	
			return $dbc;
		}
	}
	
?>