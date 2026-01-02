<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
 header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token");
 if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
     // Respond with 200 OK for preflight requests
     header("HTTP/1.1 200 OK");
     exit;
 }
$full_name=$_REQUEST["full_name"];
$company_name=$_REQUEST["company_name"];
$cmp_phone=$_REQUEST["cmp_phone"];
$cmp_address=$_REQUEST["cmp_address"];
$email=$_REQUEST["email"];
$password=$_REQUEST["password"];
$usertype="company";
require_once("connectionclass.php");
$obj=new ConnectionClass();

$sql2="select * from login where username='$email'";
$log_data=$obj->GetTable($sql2);
if(count(value:$log_data)==0){

    
    $sql="insert into login(username,password,usertype)values('$email','$password','$usertype')";
    $responds2=$obj->Manipulation($sql);
    $qry="insert into registration(full_name,company_name,cmp_phone,cmp_address,email) values('$full_name','$company_name','$cmp_phone','$cmp_address','$email')";
 
    $responds=$obj->Manipulation($qry);
    
}
else
{
    $responds=array("status"=>"false","message"=>"username already exits");
}
echo json_encode($responds);
?>