<?php
	include("../MPDF57/mpdf.php");
	
	// post data
	$data = $_POST['data'];
	$name = $_POST['name'];
	$term =  $_POST['term'];

	// css
	$stylesheet = file_get_contents('pdf.css');

	// save folder
	$path= dirname(dirname(dirname(__FILE__))) . "/pdf/";

	// write pdf
	$mpdf=new mPDF('A4'); 

	$mpdf->WriteHTML($stylesheet,1);    // The parameter 1 tells that this is css/style only and no body/html/text
	$mpdf->WriteHTML($data);
	$mpdf->Output($path . $name . "-" . $term .".pdf",'F');

	// say hi and give back the path to the pdf
	echo $path . $name . "-" . $term .".pdf";
 ?>