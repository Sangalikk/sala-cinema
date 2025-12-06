<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; chatset=utf-8;");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
require_once "lib/class.Rotas.php";

$r = new Rotas();

$r->get('/poltronas/{id}', "PoltronaController@getById");
$r->get('/poltronas', "PoltronaController@getAll", false);
$r->put('/poltronas', "PoltronaController@update");

$r->get('/usuarios/{id}', "UsuarioController@getById");
$r->get('/usuarios', "UsuarioController@getAll");


$r->post('/login', "LoginController@login", false);


try{
    $a = $r->execute();
    echo json_encode($a);
}
catch(Exception $e){
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}