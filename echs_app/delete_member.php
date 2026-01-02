<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond with 200 OK for preflight requests
    header("HTTP/1.1 200 OK");
    exit;
}
$email=$_REQUEST["email"];
$echs_member_id = $_REQUEST["echs_member_id"];
$qry = "delete from echs_member where echs_member_id=$echs_member_id";
require_once("connectionclass.php");
$obj= new ConnectionClass();
$responds = $obj->Manipulation($qry);

$qry2= "delete from login where username ='$email'";
$obj2= new ConnectionClass();
$responds2= $obj2->Manipulation($qry2);
echo json_encode($responds);