<?php

require 'Slim/Slim.php';

$app = new Slim();
$app->contentType('text/html; charset=utf-8');
$app->get('/internships', 'getInternships');
$app->get('/companies', 'getCompanies');
$app->post('/companies', 'addCompany');
$app->get('/questions', 'getQuestions');
$app->get('/scores', 'getScores');
$app->run();

function getQuestions() {
	$sql = "select * FROM stageapp_questions";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$question = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		echo json_encode($question);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getInternships() {
	$sql = "select * FROM stageapp_internships";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$internship = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		echo json_encode($internship);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getCompanies() {
	$sql = "select * FROM stageapp_companies";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$companies = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		echo json_encode($companies);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getScores() {
	$sql = "select * FROM stageapp_question_ratings";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$scores = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		echo json_encode($scores);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addCompany() {
	$request = Slim::getInstance()->request();
	$company = json_decode($request->getBody());
	$sql = "INSERT INTO stageapp_companies (company_contact, company_email, company_name) VALUES (:company_contact, :company_email, :company_name)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("company_contact", $company->company_contact);
		$stmt->bindParam("company_email", $company->company_email);
		$stmt->bindParam("company_name", $company->company_name);
		$stmt->execute();
		$company->id = $db->lastInsertId();
		$db = null;
		echo json_encode($company); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="deb31925_watm";
	$dbpass="miniketen";
	$dbname="deb31925_watm";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$dbh -> exec("set names utf8");
	return $dbh;
}

?>