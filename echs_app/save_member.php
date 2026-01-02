<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond with 200 OK for preflight requests
    header("HTTP/1.1 200 OK");
    exit;
}

 	 
$official_name =$_REQUEST["official_name"];
$cmp_address =$_REQUEST["cmp_address"];
$cmp_phone =$_REQUEST["cmp_phone"];
$email =$_REQUEST["email"];
$gender =$_REQUEST["gender"];
$rank =$_REQUEST["rank"];
$echs_card_no =$_REQUEST["echs_card_no"];
$aadhar_no = $_REQUEST["aadhar_no"];
$bank_account_no =$_REQUEST["bank_account_no"];
$bank_ifsc_code =$_REQUEST["bank_ifsc_code"];
$password= $_REQUEST["password"];
$type= "user";

require_once("connectionclass.php");
$obj= new ConnectionClass();
$obj1 = new ConnectionClass();
 
$qry = "INSERT INTO echs_member (official_name, cmp_address, cmp_phone, email, gender, rank, echs_card_no, aadhar_no, bank_account_no, bank_ifsc_code, password) 
        VALUES ('$official_name', '$cmp_address', '$cmp_phone', '$email', '$gender', '$rank', '$echs_card_no','$aadhar_no','$bank_account_no','$bank_ifsc_code','$password')";
$sql2= "INSERT INTO login (username, password, usertype) VALUES ('$email','$password','$type')";




$responds = $obj->Manipulation($qry);
$responds1=$obj1->Manipulation($sql2);


echo json_encode($responds);