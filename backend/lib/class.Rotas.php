<?php
require_once 'autoload.php';
require_once 'Auth.php';
require_once 'config/key.php';
class Rotas{
    private $rotas;

    function __construct(){$this->rotas = [];}

    function get($url, $action, $protected = true){$this->add('GET', $url, $action, $protected, $access);}
    function post($url, $action, $protected = true){$this->add('POST', $url, $action, $protected, $access);}
    function add($method, $url, $action, $protected = true){$this->rotas[] = compact('method', 'url', 'action', 'protected');}
    function execute(){
        
        $urlBase = 'salaCinema/sala-cinema/backend/';
        $method = $_SERVER['REQUEST_METHOD'];
        $url =  rtrim(str_ireplace($urlBase, '', $_SERVER['REQUEST_URI']),'/');

        foreach($this->rotas as $rota){
            if($method !== $rota['method']) continue;

            $padrao = "@^" . preg_replace('/\{[^\}]+\}/','([^/]+)', $rota['url']) . "$@";

            if(!preg_match($padrao, $url, $matches)) continue;
            array_shift($matches);

            [$controllerName, $action] =  explode('@',$rota['action']);
            require_once "controllers/class.$controllerName.php";
            $controller = new $controllerName();
            $auth = $rota !== false? Auth::check($rota): Auth::check();
            if($rota['protected'] && !$auth){
                http_response_code(404);
                echo json_encode(['error'=>"Você não está autenticado."]);
                return;
            }
            return call_user_func_array([$controller, $action], $matches);  
        }
        http_response_code(404);
        return ['error'=>"Url não encontrada"];
    }
}