drop table if exists tokens;
drop table if exists poltronas;
drop table if exists usuarios;

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

CREATE TABLE tokens(
    id int not null primary key auto_increment,
    token text not null,
    data_exp datetime not null,
    data_cr datetime default current_timestamp,
    user_id int not null,
    foreign key (user_id) references usuarios(id) on delete cascade
)