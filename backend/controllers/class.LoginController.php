<?php
require "vendor/autoload.php";
use Firebase\JWT\JWT;
class LoginController{
    private $dao;
    function __construct(){$this->dao = new LoginDAO();}

    function login(){
        global $key;
        
        $data = json_decode(file_get_contents('php://input'), true); 
        if(!isset($data['email']) || !isset($data['senha'])) throw new Exception('Login ou senha faltando.');
        $s = $this->getUser($data['email']);
        if(!isset($data['email']) || md5($data['senha']) !== $s->getSenha()) throw new Exception("Credenciais inválidas");
        $payload = [
            'iss'=> 'http://localhost',
            'iat' => time(),
            'exp' => time() + 60 * 60 * 16,
            'userId' => $s->getId(),
        ];
        
        $jwt = JWT::encode($payload, $key, 'HS256');

        return [
            'token' => $jwt,
            'userId' => $s->getId()
        ];
        
    }

    function getUser($email){return $this->dao->getUser($email);}


}