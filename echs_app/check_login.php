<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
   
    header("HTTP/1.1 200 OK");
    exit;
}

$username=$_REQUEST["username"];
$password=$_REQUEST["password"];

$_SESSION['username'] = $username;

$qry = "select * from login where username='$username' and password='$password'";
require_once("connectionclass.php");
$obj= new ConnectionClass();

$responds = $obj->GetSingleRow($qry);
$json_responds=array();

if($responds==null){
    $json_responds["Status"] = "false";
    $json_responds["Message"] = "Invalid username or password";

}else{

    $json_responds["Status"] = "true";
    $json_responds["Role"] = ($username === 'admin@gmail.com') ? "admin" : "user";
} 

echo json_encode($json_responds);
?>