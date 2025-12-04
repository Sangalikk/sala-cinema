<?php
require_once 'vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class Auth
{
    static function check()
    {
        global $key;

        $headers = getallheaders();

        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? null;

        if (!$authHeader) return false;
        $parts = explode(" ", $authHeader);
        if (count($parts) !== 2) return false;
        $token = trim($parts[1]);
        $payload = JWT::decode($token, new Key($key, 'HS256'));
        if (!isset($payload->userId)) return false;
        $controller = new UsuarioController();
        $user = $controller->getById($payload->userId);
        if (!isset($user)) return false;

        return true;
    }
}