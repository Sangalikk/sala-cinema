<?php
require_once "lib/interface.Controller.php";

class MusicaController implements ControllerInterface {
    function __construct(){}
    function listar(){
        return [
            ['nome' => 'Musica1'], ['nome' => 'Musica2']
        ];
    }
    function detalhar($id){}
    function criar(){}
    function editar($id){}
    function remover($id){}
}

?>