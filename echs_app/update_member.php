<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Respond with 200 OK for preflight requests
    header("HTTP/1.1 200 OK");
    exit;
}

$echs_member_id = $_REQUEST['echs_member_id'];
require_once("connectionclass.php");
$obj = new ConnectionClass();

$official_name = $_REQUEST["official_name"];
$cmp_address = $_REQUEST["cmp_address"];
$cmp_phone = $_REQUEST["cmp_phone"];
$email = $_REQUEST["email"];
$gender = $_REQUEST["gender"];
$rank = $_REQUEST["rank"];
$echs_card_no = $_REQUEST["echs_card_no"];
$aadhar_no = $_REQUEST["aadhar_no"];
$bank_account_no = $_REQUEST["bank_account_no"];
$bank_ifsc_code = $_REQUEST["bank_ifsc_code"];
$password = $_REQUEST["password"];

// Update query
$query = "UPDATE echs_member SET 
    official_name = '$official_name', 
    cmp_address = '$cmp_address', 
    cmp_phone = '$cmp_phone', 
    email = '$email', 
    gender = '$gender', 
    rank = '$rank', 
    echs_card_no = '$echs_card_no', 
    aadhar_no = '$aadhar_no', 
    bank_account_no = '$bank_account_no', 
    bank_ifsc_code = '$bank_ifsc_code', 
    password = '$password' 
WHERE echs_member_id = '$echs_member_id'";

$responds = $obj->Manipulation($query);

// Return the response (success or failure)
echo json_encode($responds);
?>
