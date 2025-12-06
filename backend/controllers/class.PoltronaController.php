<?php

class PoltronaController
{
    private $dao;

    function __construct(){
        $this->dao = new PoltronaDAO();
    }

    function getById($id){
        return $this->dao->getById($id);
    }

    function getAll(){
        return $this->dao->getAll();
    }

    function update(){
        $data = json_decode(file_get_contents('php://input'), true);

        if (json_last_error() !== JSON_ERROR_NONE)
            throw new Exception("Json inválido");

        if (!isset($data['id']) || !isset($data['user_id'])) {
            throw new Exception("Dados incompletos. ID da poltrona e ID do usuário são obrigatórios.");
        }

        $idPoltrona = $data['id'];
        $idUsuario = $data['user_id'];
        
        try {
            $resultado = $this->dao->update($idPoltrona, $idUsuario);

            if (!$resultado) {
                throw new Exception("Poltrona não encontrada ou erro ao reservar.");
            }
            
            return $resultado;
            
        } catch (PDOException $e) {
            throw new Exception("Erro no banco de dados durante a reserva: " . $e->getMessage());
        }
    }
}