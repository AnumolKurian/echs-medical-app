<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond with 200 OK for preflight requests
    header("HTTP/1.1 200 OK");
    exit;
}
$cname = $_REQUEST["cname"];
$qry = "insert into job_category(cat_name) values('$cname')";
require_once("connectionclass.php");

$obj= new ConnectionClass();
$responds = $obj->Manipulation(qry: $qry);


echo json_encode(value: $responds);



