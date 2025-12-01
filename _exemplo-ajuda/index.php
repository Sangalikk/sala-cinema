<?php
header("Content-Type: Application/JSON");

require_once "config/index.php";
require_once "lib/Auth.php";
require_once "lib/Rotas.php";

$rotas = new Rotas();
$rotas->get('/musicas','MusicaController@listar', false);
$rotas->get('/musicas/{id}','MusicaController@detalhar');
$rotas->post('/musicas','MusicaController@criar');
$rotas->put('/musicas/{id}','MusicaController@editar');
$rotas->delete('/musicas/{id}','MusicaController@remover');

$rotas->post('/login', 'LoginController@login', false);

echo json_encode($rotas->executar());
?>