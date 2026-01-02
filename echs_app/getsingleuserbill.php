<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$host = "localhost";
$username = "root";
$password = "";
$database = "echs_app";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $conn->connect_error
    ]);
    exit;
}

$echs_member_id = isset($_GET['echs_member_id']) ? intval($_GET['echs_member_id']) : null;

if (empty($echs_member_id)) {
    echo json_encode([
        "status" => "error",
        "message" => "ECHS Member ID is required."
    ]);
    exit;
}

$query = "
    SELECT 
        em.official_name,
        em.echs_card_no,
        em.bank_account_no,
        em.bank_ifsc_code,
        em.aadhar_no,
        mb.bill_month,
        mb.bill_year,
        mb.total_amount,
        mb.mbill_id
    FROM 
        echs_member AS em
    INNER JOIN 
        medical_bill AS mb
    ON 
        em.echs_member_id = mb.fk_echs_member_id
    WHERE 
        em.echs_member_id = ?
";

$stmt = $conn->prepare($query);
if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to prepare statement: " . $conn->error
    ]);
    exit;
}

$stmt->bind_param("i", $echs_member_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "No details found for the given ECHS Member ID."
    ]);
    exit;
}

$memberDetails = $result->fetch_assoc();

$queryItems = "
    SELECT 
        item_id,
        bill_no,
        bill_date,
        total_bill_amount
    FROM 
        medical_bill_items
    WHERE 
        fk_mbill_id = ?
";

$stmtItems = $conn->prepare($queryItems);
if (!$stmtItems) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to prepare statement for items: " . $conn->error
    ]);
    exit;
}

$mbillId = $memberDetails['mbill_id'];
$stmtItems->bind_param("i", $mbillId);
$stmtItems->execute();
$resultItems = $stmtItems->get_result();

$billItems = [];
while ($row = $resultItems->fetch_assoc()) {
    $billItems[] = [
        "billNo" => $row['bill_no'],
        "billDate" => $row['bill_date'],
        "amount" => floatval($row['total_bill_amount']),
    ];
}

$response = [
    "status" => "success",
    "official_name" => $memberDetails['official_name'],
    "echs_card_no" => $memberDetails['echs_card_no'],
    "bill_month" => $memberDetails['bill_month'],
    "bill_year" => $memberDetails['bill_year'],
    "bank_ifsc_code" => $memberDetails['bank_ifsc_code'],
    "bank_account_no" => $memberDetails['bank_account_no'],
    "aadhar_no" => $memberDetails['aadhar_no'],
    "bills" => $billItems,
    "total_amount" => floatval($memberDetails['total_amount'])
];

echo json_encode($response, JSON_PRETTY_PRINT);

$stmtItems->close();
$stmt->close();
$conn->close();
?>
