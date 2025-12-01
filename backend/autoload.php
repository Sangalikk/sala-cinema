<?php
require_once "config/conexao.php";

spl_autoload_register(function($nome){
    $paths = ["controllers", "models", "dao", "lib", "config"];

    foreach($paths as $path) {
        $file = dirname(__FILE__) . "/{$path}/class.{$nome}.php";
        if (file_exists($file)){
            require_once $file;
            break;
        }
    }
});
?>  