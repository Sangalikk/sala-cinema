// Constantes
const ROWS = ['A', 'B', 'C', 'D']; 
const COLS = 8; 
const TOTAL_SEATS = ROWS.length * COLS;
// ALTERAÇÃO: Aponta para um arquivo PHP que irá processar as requisições
const API_BASE_URL = 'api.php'; 

// Elementos DOM (Mantidos)
const seatGrid = document.getElementById('seat-grid');
const colLabelsContainer = document.getElementById('col-labels');
const seatCounter = document.getElementById('seat-counter');
const modal = document.getElementById('modal-box');
const modalDetails = document.getElementById('modal-details');
const cancelBtn = document.getElementById('cancel-btn');
const buyBtn = document.getElementById('buy-btn');

// Variável de estado (será populada via fetch)
let selectedSeat = null; 
let seatsData = []; 

// --- 1. Requisição Inicial (GET) ---

function generateColLabels() {
    // Gera os rótulos de coluna (1-8)
    const emptySpan = document.createElement('span');
    colLabelsContainer.appendChild(emptySpan);

    for (let col = 1; col <= COLS; col++) {
        const label = document.createElement('div');
        label.classList.add('col-label-item');
        label.textContent = col;
        colLabelsContainer.appendChild(label);
    }
}

async function fetchSeatsData() {
    try {
        // Pede os dados de status das poltronas para o PHP, passando a ação 'get'
        const response = await fetch(`${API_BASE_URL}?action=get_all`);
        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }
        seatsData = await response.json(); // PHP retorna JSON
        
        initializeSeats();
    } catch (error) {
        console.error("Falha ao carregar dados das poltronas:", error);
        alert("Não foi possível conectar ao servidor PHP. Verifique o arquivo api.php.");
    }
}

// --- 2. Renderização das Poltronas (Mantida) ---

function initializeSeats() {
    seatGrid.innerHTML = '';
    colLabelsContainer.innerHTML = '';
    
    generateColLabels();

    for (const row of ROWS) {
        // RÓTULO DA FILA
        const rowLabel = document.createElement('div');
        rowLabel.classList.add('row-label');
        rowLabel.textContent = row;
        seatGrid.appendChild(rowLabel);

        // Poltronas
        for (let col = 1; col <= COLS; col++) {
            const seatId = `${row}${col}`;
            const seatData = seatsData.find(s => s.id === seatId); 
            const status = seatData ? seatData.status : 'free';

            const seatElement = document.createElement('div');
            seatElement.classList.add('seat', status);
            seatElement.textContent = ''; 
            
            seatElement.dataset.id = seatId;
            seatElement.dataset.row = row;
            seatElement.dataset.col = col;

            if (status !== 'occupied') {
                seatElement.addEventListener('click', handleSeatClick);
            }
            seatGrid.appendChild(seatElement);
        }
    }
    updateCounter();
}

// --- 3. Manipulação de Eventos e Requisições (POST para PHP) ---

function handleSeatClick(event) {
    const seat = event.target;
    const seatId = seat.dataset.id;
    const seatData = seatsData.find(s => s.id === seatId);

    if (seatData.status === 'occupied') { return; }
    
    // Lógica de seleção local
    if (selectedSeat && selectedSeat.dataset.id !== seatId) {
        const prevSeatData = seatsData.find(s => s.id === selectedSeat.dataset.id);
        if (prevSeatData.status === 'selected') {
            prevSeatData.status = 'free';
            selectedSeat.classList.remove('selected');
            selectedSeat.classList.add('free');
        }
    }
    
    seatData.status = 'selected';
    seat.classList.remove('free');
    seat.classList.add('selected');
    selectedSeat = seat;

    modalDetails.textContent = `Coordenada: ${seatData.id}`; 
    modal.style.display = 'block';
}

// Botão "Comprar / Ocupar" (Requisição POST)
buyBtn.addEventListener('click', async () => {
    if (selectedSeat) {
        const seatId = selectedSeat.dataset.id;
        
        try {
            // Envia a requisição POST para o PHP para reservar a poltrona
            const response = await fetch(API_BASE_URL, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                // Passa a ação e o ID da poltrona para o PHP
                body: JSON.stringify({ action: 'reserve', seatId: seatId, userId: 1 }) 
            });

            if (!response.ok) {
                throw new Error(`Erro ao reservar poltrona: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                // Sucesso na reserva
                selectedSeat.classList.remove('selected');
                selectedSeat.classList.add('occupied');
                
                const seatData = seatsData.find(s => s.id === seatId);
                seatData.status = 'occupied';
                
                selectedSeat = null; 
                modal.style.display = 'none';
                updateCounter();
                alert(`Poltrona ${seatId} reservada com sucesso!`);
            } else {
                // Falha de lógica no PHP (ex: poltrona já ocupada)
                throw new Error(result.message || "Falha na reserva.");
            }
        } catch (error) {
            console.error("Erro na compra:", error);
            alert(`Falha na reserva: ${error.message}.`);
            
            // Reverte a seleção visual em caso de erro
            if (selectedSeat) {
                 selectedSeat.classList.remove('selected');
                 selectedSeat.classList.add('free');
                 seatsData.find(s => s.id === seatId).status = 'free';
                 selectedSeat = null;
            }
            modal.style.display = 'none';
        }
    }
});

// Botão "Cancelar Seleção" (Mantido local)
cancelBtn.addEventListener('click', () => {
    if (selectedSeat) {
        const seatId = selectedSeat.dataset.id;
        const seatData = seatsData.find(s => s.id === seatId);
        
        seatData.status = 'free';
        selectedSeat.classList.remove('selected');
        selectedSeat.classList.add('free');

        selectedSeat = null; 
    }
    modal.style.display = 'none';
    updateCounter();
});

// --- 4. Atualização do Contador (Mantida) ---

function updateCounter() {
    const occupiedCount = seatsData.filter(s => s.status === 'occupied').length;
    const selectedCount = seatsData.filter(s => s.status === 'selected').length;
    const totalOccupied = occupiedCount + selectedCount;

    seatCounter.textContent = `${totalOccupied}/${TOTAL_SEATS}`;
}

// Inicia o processo de carregamento de dados
fetchSeatsData();