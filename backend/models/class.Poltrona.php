<?php

class Poltrona implements JsonSerializable{
    private $id;
    private $fila;
    private $coluna;
    private $usuario_id;

    function setFila($p){$this->fila = $p;}
    function setColuna($p){$this->coluna = $p;}
    function setIdUsuario($p){$this->usuario_id = $p;}

    function getFila(){return $this->fila;}
    function getColuna(){return $this->coluna;}
    function getIdUsuario(){return $this->usuario_id;}

    function jsonSerialize(){
        return [
            'id' => $this->id,
            'fila' => $this->fila,
            'coluna'=> $this->coluna,
            'usuario_id' => $this->usuario_id
        ];
    }

}