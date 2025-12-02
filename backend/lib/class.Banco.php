<?php
class Banco {
    private static $pdo;

    static function getConexao(){
        global $CONEXAO;

        if (!self::$pdo){
            self::$pdo = new PDO("{$CONEXAO['banco']}:dbname={$CONEXAO['dbname']};host={$CONEXAO['host']}", $CONEXAO['user'], $CONEXAO['password']);
        }

        return self::$pdo;
    }
}
?>