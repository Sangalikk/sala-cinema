INSERT INTO usuarios (email, senha) VALUES
('joao.silva@exemplo.com', MD5('senha123')),
('maria.admin@exemplo.com', MD5('admin456')),
('cliente.vip@exemplo.com', MD5('reserva789'));

INSERT INTO poltronas (fila, coluna) VALUES
('A', 1), ('A', 2), ('A', 3), ('A', 4), ('A', 5), ('A', 6), ('A', 7), ('A', 8),
('B', 1), ('B', 2), ('B', 3), ('B', 4), ('B', 5), ('B', 6), ('B', 7), ('B', 8),
('C', 1), ('C', 2), ('C', 3), ('C', 4), ('C', 5), ('C', 6), ('C', 7), ('C', 8),
('D', 1), ('D', 2), ('D', 3), ('D', 4), ('D', 5), ('D', 6), ('D', 7), ('D', 8);