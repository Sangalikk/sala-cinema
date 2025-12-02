drop table if exists usuarios;
drop table if exists poltronas;

CREATE TABLE usuarios (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL UNIQUE,         
    senha VARCHAR(32) NOT NULL                  
);

CREATE TABLE poltronas (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  
    fila CHAR(1) NOT NULL,                       
    coluna INT NOT NULL,                          
    usuario_id INT,                               
    UNIQUE KEY uk_fila_coluna (fila, coluna), 
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) 
);