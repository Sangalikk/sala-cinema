<?php
require_once 'autoload.php';
class Rotas{
    private $rotas;

    function __construct(){$this->rotas = [];}

    function get($url, $action, $protected = false){$this->add('GET', $url, $action, $protected);}
    function post($url, $action, $protected = false){$this->add('POST', $url, $action, $protected);}
    function put($url, $action, $protected = false){$this->add('PUT', $url, $action, $protected);}
    function delete($url, $action, $protected = false){$this->add('DELETE', $url, $action, $protected);}
    function add($method, $url, $action, $protected = false){$this->rotas[] = compact('method', 'url', 'action', 'protected');}
    function execute(){
        $urlBase = 'salaCinema/sala-cinema/backend/';
        $method = $_SERVER['REQUEST_METHOD'];
        $url =  rtrim(str_ireplace($urlBase, '', $_SERVER['REQUEST_URI']),'/');

        foreach($this->rotas as $rota){
            if($method !== $rota['method']) continue;

            $padrao = "@^" . preg_replace('/\{[^\}]+\}/','([^/]+)', $rota['url']) . "$@";

            if(!preg_match($padrao, $url, $matches)) continue;
            array_shift($matches);

            
            [$controllerNome, $action] =  explode('@',$rota['action']);

            require_once "controllers/class.$controllerNome.php";
            $controller = new $controllerNome();
            
            return call_user_func_array([$controller, $action], $matches);  
        }
        http_response_code(404);
        return ['error'=>"Url não encontrada"];
    }
}

