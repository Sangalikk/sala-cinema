<?php
class LoginDAO{
    private $pdo;

    function __construct(){$this->pdo = Banco::getConexao();}

    function getUser($email){
        $sql = 'select id, email, senha, from usuarios where email = :email';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['email' => $email]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, Usuario::class);
        $result = $stmt->fetch();
        return $result ?? [];
    }

    function storeToken($user_id, $token, $data_exp){
        $sql = "insert into tokens values(null, :token, :data_exp, null, :user_id)";
        $stmt = $this->pdo->prepare($sql);
        $result = $stmt->execute([
            'token' => $token,
            'user_id' => $user_id,
            'data_exp' => $data_exp
        ]);
        return $result? true : false;
    }

    function getValidToken($token){
        $sql = 'select * from tokens where token = :token';
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['token' => $token]);
        return $stmt->fetch(PDO::FETCH_OBJ);
    }

    function deleteToken ($user_id){
        $sql = "delete from tokens where user_id = :user_id";
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute(['user_id' => $user_id]);
    }
}