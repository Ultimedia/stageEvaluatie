<?php

require 'Slim/Slim.php';

$app = new Slim();
$app->contentType('text/html; charset=utf-8');
$app->get('/internships', 'getInternships');
$app->get('/companies', 'getCompanies');
$app->post('/companies', 'addCompany');
$app->get('/questions', 'getQuestions');
$app->get('/scores', 'getScores');
$app->get('/answers/:id', 'getAnswers');
$app->post('/answers', 'addAnswer');
$app->post('/evaluation', 'updateEvalution');
$app->run();


function updateEvalution(){
	$request = Slim::getInstance()->request();
	$evaluation = json_decode($request->getBody());
	$sql = "SELECT * FROM stageapp_evaluations WHERE internship_id = :internship_id AND evaluate_term = :evaluate_term";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("internship_id", $evaluation->internship_id);
		$stmt->bindParam("evaluate_term", $evaluation->evaluate_term);
		$stmt->execute();
		$evalution = $stmt->fetchObject();  
		$db = null;
		echo json_encode($evalution); 

	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addAnswer(){
	$request = Slim::getInstance()->request();
	$answer = json_decode($request->getBody());
	$sql = "INSERT INTO stageapp_answers_data (answer_id, question_id, question_rating_id, remarks) VALUES (:answer_id, :question_id, :question_rating_id, :remarks)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("answer_id", $answer->answer_id);
		$stmt->bindParam("question_id", $answer->question_id);
		$stmt->bindParam("question_rating_id", $answer->question_rating_id);
		$stmt->bindParam("remarks", $answer->remarks);
		$stmt->execute();
		$answer->id = $db->lastInsertId();
		$db = null;
		echo json_encode($answer); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getAnswers($id) {
	$sql = "SELECT * FROM stageapp_answers_data 
			LEFT JOIN stageapp_questions ON stageapp_answers_data.question_id = stageapp_questions.question_id 
			LEFT JOIN stageapp_question_ratings ON stageapp_answers_data.question_rating_id = stageapp_question_ratings.question_rating_id 
			WHERE answer_id = :id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$answers = $stmt->fetchObject();  
		$db = null;
		echo json_encode($answers); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

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