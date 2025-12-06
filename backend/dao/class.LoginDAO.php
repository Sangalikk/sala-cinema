<?php
class LoginDAO{
    private $pdo;

    function __construct(){$this->pdo = Banco::getConexao();}

    function getUser($email){
        $sql = 'select id, email, senha from usuarios where email = :email';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['email' => $email]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, Usuario::class);
        $result = $stmt->fetch();
        return $result ?? [];
    }
    
}