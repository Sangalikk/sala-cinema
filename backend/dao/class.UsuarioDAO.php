<?php 

class UsuarioDAO {
    private $pdo;

    function __construct() {
        $this->pdo = Banco::getConexao();
    }

    function getById($id) {
        $sql = 'SELECT id, email, senha FROM usuarios WHERE id = :id';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['id' => $id]);

        $stmt->setFetchMode(PDO::FETCH_CLASS, Usuario::class);
        $usuario = $stmt->fetch();

        return $usuario ?: null;
    }

    function getAll() {
        $sql = 'SELECT id, email FROM usuarios';
        $stmt = $this->pdo->query($sql);

        $stmt->setFetchMode(PDO::FETCH_CLASS, Usuario::class);
        return $stmt->fetchAll();
    }
}
