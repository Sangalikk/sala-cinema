<?php
interface ControllerInterface {
    function listar();
    function detalhar($id);
    function criar();
    function editar($id);
    function remover($id);
}
?>