<?php
// Exemplo BÁSICO de como seria a estrutura do seu api.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Permite requisições de outras portas (para testes)

// 1. Lógica para GET (Carregar o mapa)
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get_all') {
    // 1.1 Conecte ao seu banco de dados MySQL
    // 1.2 Execute a consulta SQL: SELECT fila, coluna, usuario_id FROM poltronas;
    // 1.3 Formate o resultado em um array JSON com os campos 'id' (fila+coluna) e 'status' ('occupied' ou 'free')
    
    // Simulação de dados do banco de dados (Você substituiria isso pela consulta real)
    $simulated_data = [
        ['id' => 'A1', 'status' => 'occupied'],
        ['id' => 'B3', 'status' => 'free'],
        ['id' => 'C8', 'status' => 'occupied'],
        // ... as outras 29 poltronas
    ];

    echo json_encode($simulated_data);
    exit;
}

// 2. Lógica para POST (Reservar a poltrona)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 2.1 Pega o JSON do corpo da requisição
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['action']) && $data['action'] === 'reserve') {
        $seat_id = $data['seatId']; // Ex: 'B5'
        $user_id = $data['userId']; // Ex: 1

        // 2.2 Conecte ao banco de dados e atualize o estado
        // Ex: UPDATE poltronas SET usuario_id = :user_id WHERE fila = :fila AND coluna = :coluna AND usuario_id IS NULL;
        
        // Simulação de sucesso
        echo json_encode(['success' => true, 'message' => "Poltrona $seat_id reservada com sucesso!"]);
        exit;
    }
}

// Se nenhuma ação for reconhecida
http_response_code(400); // Bad Request
echo json_encode(['success' => false, 'message' => 'Ação inválida.']);
?>