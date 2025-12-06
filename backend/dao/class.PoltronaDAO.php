<?php 

class PoltronaDAO {
    private $pdo;

    function __construct(){$this->pdo = Banco::getConexao();}

    function getById($id){
        $sql = 'select * from poltronas where id = :id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, Poltrona::class);
        $poltrona = $stmt->fetch();

        return $poltrona ?? [];
    }

    function getAll(){
        $sql = 'select * from poltronas';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_CLASS, Poltrona::class);
        $poltronas = $stmt->fetchAll();

        return $poltronas ?? [];
    }

    function update($id, $usuario_id){
        $sql = 'UPDATE poltronas SET usuario_id = :usuario_id WHERE id = :id';
        $stmt = $this->pdo->prepare($sql);
        $result = $stmt->execute([
            'id' => $id,
            'usuario_id' => $usuario_id
        ]);
        
        if($result){
            return $this->getById($id);
        }
        return false;
    }
}