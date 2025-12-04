<?php

class Usuario implements JsonSerializable{
    private $id;
    private $email;
    private $senha;

    function setEmail($p){$this->email = $p;}
    function setSenha($p){$this->senha = $p;}

    function getEmail(){return $this->email;}
    function getSenha(){return $this->senha;}

    function jsonSerialize(){
        return [
            'id' => $this->id,
            'email' => $this->email,
            'senha'=> $this->senha,
        ];
    }

}