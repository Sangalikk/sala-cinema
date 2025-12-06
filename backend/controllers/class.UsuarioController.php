<?php

class UsuarioController
{
    private $dao;

    function __construct(){
        $this->dao = new UsuarioDAO();
    }

    function getById($id){
        return $this->dao->getById($id);
    }
    function getAll(){
        return $this->dao->getAll();
    }
}
