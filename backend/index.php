<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; chatset=utf-8;");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
require_once "lib/class.Rotas.php";


$r->post('/login', "LoginController@login", false);

$r->get('/login/{user_id}', 'LoginController@changeRequest', true);

try{
    $a = $r->execute();
    echo json_encode($a);
}
catch(Exception $e){
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}