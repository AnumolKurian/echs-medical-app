<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    exit;
}

// Database connection
$host = "localhost";
$username = "root";
$password = "";
$database = "echs_app";

$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed: " . $conn->connect_error
    ]));
}

// Retrieve echs_member_id from the URL
$username = isset($_GET['username']) ? $_GET['username'] : '';

if (empty($username)) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid username."
    ]);
    exit;
}

// Retrieve echs_member_id based on email
$query = "SELECT echs_member_id FROM echs_member WHERE email = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to prepare statement for echs_member lookup: " . $conn->error
    ]);
    exit;
}

// Bind parameters and execute query
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "No member found with the given email."
    ]);
    exit;
}

// Fetch the echs_member_id
$row = $result->fetch_assoc();
$echs_member_id = $row['echs_member_id'];

$stmt->close();

// Retrieve data from the POST request
$data = json_decode(file_get_contents("php://input"), true);

$year = $data['year'] ?? null;
$month = $data['month'] ?? null;
$bills = $data['bills'] ?? [];

// Validate data
if (empty($year) || empty($month) || empty($bills)) {
    echo json_encode([
        "status" => "error",
        "message" => "Year, month, and bills data are required."
    ]);
    exit;
}

// Initialize total amount
$totalAmount = 0;
foreach ($bills as $bill) {
    $totalAmount += floatval($bill['amount']);
}

// Set other required fields
$status = "Pending";
$createdDate = date("Y-m-d H:i:s");

// Insert into `medical_bill` table
$sql = "INSERT INTO medical_bill (created_date, bill_year, bill_month, total_amount, fk_echs_member_id, status) 
        VALUES (?, ?, ?, ?, ?, ?) ";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to prepare statement: " . $conn->error
    ]);
    exit;
}

// Bind parameters
$stmt->bind_param("siidis", $createdDate, $year, $month, $totalAmount, $echs_member_id, $status);

// Execute the query
if ($stmt->execute()) {
    // Get the ID of the inserted medical bill
    $mbillId = $stmt->insert_id;

    // Insert individual bills into `medical_bill_items` table
    $itemSql = "INSERT INTO medical_bill_items (bill_no, bill_date, total_bill_amount, fk_mbill_id) 
                VALUES (?, ?, ?, ?)";
    $itemStmt = $conn->prepare($itemSql);

    if (!$itemStmt) {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to prepare statement for bill items: " . $conn->error
        ]);
        exit;
    }

    foreach ($bills as $bill) {
        $billNo = $bill['billNo'];
        $billDate = $bill['billDate'];
        $billAmount = floatval($bill['amount']);

        $itemStmt->bind_param("ssdi", $billNo, $billDate, $billAmount, $mbillId);

        if (!$itemStmt->execute()) {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to save bill item: " . $itemStmt->error
            ]);
            exit;
        }
    }

    echo json_encode([
        "status" => "success",
        "message" => "Bills and bill items saved successfully."
    ]);

    $itemStmt->close();
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to save bills: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
