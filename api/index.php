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
$app->post('/answer', 'addAnswer');
$app->post('/internshipd/:id', 'updateInternship');
$app->post('/evaluation', 'updateEvalution');
$app->run();



function updateInternship($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$internship = json_decode($body);
	$sql = "UPDATE stageapp_internships SET final_score=:final_score, interim_score=:interim_score WHERE internship_id=:internship_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("final_score", $internship->final_score);
		$stmt->bindParam("interim_score", $internship->interim_score);
		$stmt->bindParam("internship_id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($internship); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

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
		$matchingEvaluation = $stmt->fetchObject();  
		
		// do we already have an evaluation for this student?
		if($matchingEvaluation){

			if($evaluation->update_score){
				$sql = "UPDATE stageapp_evaluations SET final_score=:final_score, pdf=:pdf WHERE internship_id = :internship_id AND evaluate_term = :evaluate_term";
				try {
					$db = getConnection();
					$stmt = $db->prepare($sql);  
					$stmt->bindParam("internship_id", $evaluation->internship_id);
					$stmt->bindParam("evaluate_term", $evaluation->evaluate_term);
					$stmt->bindParam("pdf", $evaluation->pdf);
					$stmt->bindParam("final_score", $evaluation->final_score);
					$stmt->execute();
					$db = null;
					echo json_encode($matchingEvaluation); 
				} catch(PDOException $e) {
					echo '{"error":{"text":'. $e->getMessage() .'}}'; 
				}
			}else{
				echo json_encode($matchingEvaluation); 
			}

		// if not insert this as a new entry in the database to create the unique evaluation id
		}else{
			$sql = "INSERT INTO stageapp_evaluations (company_id, evaluate_term, internship_id, pdf) VALUES (:company_id, :evaluate_term, :internship_id, :pdf)";
			$stmt = $db->prepare($sql);  
			$stmt->bindParam("internship_id", $evaluation->internship_id);
			$stmt->bindParam("company_id", $evaluation->company_id);
			$stmt->bindParam("evaluate_term", $evaluation->evaluate_term);
			$stmt->bindParam("pdf", $evaluation->pdf);
			$stmt->execute();
			$evaluation->evaluation_id = $db->lastInsertId();
			$db = null;
			echo json_encode($evaluation); 
		}
		$db = null;

	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addAnswer(){
	$request = Slim::getInstance()->request();
	$evaluation = json_decode($request->getBody());
	
	$sql = "SELECT * FROM stageapp_evaluations_data WHERE evaluation_id = :evaluation_id AND question_id = :question_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("question_id", $evaluation->question_id);
		$stmt->bindParam("evaluation_id", $evaluation->evaluation_id);
		$stmt->execute();
		$matchingEvaluation = $stmt->fetchObject();  
		
		// do we already have an evaluation if so update
		if($matchingEvaluation){
			$sql = "UPDATE stageapp_evaluations_data SET question_rating_id=:question_rating_id, remarks=:remarks WHERE evaluation_id=:evaluation_id AND question_id = :question_id";
			try {
				$db = getConnection();
				$stmt = $db->prepare($sql);  
				$stmt->bindParam("question_id", $evaluation->question_id);
				$stmt->bindParam("evaluation_id", $evaluation->evaluation_id);
				$stmt->bindParam("question_rating_id", $evaluation->question_rating_id);
				$stmt->bindParam("remarks", $evaluation->remarks);
				$stmt->execute();
				$db = null;
				echo json_encode($evaluation); 
			} catch(PDOException $e) {
				echo '{"error":{"text":'. $e->getMessage() .'}}'; 
			}

		// if not insert this as a new entry in the database to create the unique evaluation id
		}else{
			$sql = "INSERT INTO stageapp_evaluations_data (evaluation_id, question_id, question_rating_id, remarks) VALUES (:evaluation_id, :question_id, :question_rating_id, :remarks)";
			try {
				$db = getConnection();
				$stmt = $db->prepare($sql);  
				$stmt->bindParam("evaluation_id", $evaluation->evaluation_id);
				$stmt->bindParam("question_id", $evaluation->question_id);
				$stmt->bindParam("question_rating_id", $evaluation->question_rating_id);
				$stmt->bindParam("remarks", $evaluation->remarks);
				$stmt->execute();
				$evaluation->in_id = $db->lastInsertId();
				$db = null;
				echo json_encode($evaluation); 
			} catch(PDOException $e) {
				error_log($e->getMessage(), 3, '/var/tmp/php.log');
				echo '{"error":{"text":'. $e->getMessage() .'}}'; 
			}
		}
		$db = null;

	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getAnswers($id) {
	$sql = "SELECT * FROM stageapp_evaluations_data 
			LEFT JOIN stageapp_questions ON stageapp_evaluations_data.question_id = stageapp_questions.question_id 
			LEFT JOIN stageapp_question_ratings ON stageapp_evaluations_data.question_rating_id = stageapp_question_ratings.question_rating_id 
			WHERE evaluation_id = :id ORDER BY stageapp_evaluations_data.question_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$answers = $stmt->fetchAll(PDO::FETCH_OBJ);
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
		$internships = $stmt->fetchAll(PDO::FETCH_OBJ);

		// get evaluation data
		foreach ($internships as $internship) {
		    $sql = "select * FROM stageapp_evaluations WHERE stageapp_evaluations.internship_id = " . $internship->internship_id;
			$stmt = $db->query($sql);  	
			$internship->evaluations = $stmt->fetchAll(PDO::FETCH_OBJ);
		}
		$db = null;

		echo json_encode($internships);
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


function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="devine";
	$dbpass="8W3w03oA5iq32jt";
	$dbname="devine";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$dbh -> exec("set names utf8");
	return $dbh;
}

?>