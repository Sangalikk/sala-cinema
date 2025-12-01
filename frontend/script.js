// Constantes da sala
const ROWS = ['A', 'B', 'C', 'D']; // 4 filas
const COLS = 8; // 8 colunas
const TOTAL_SEATS = ROWS.length * COLS;

// Elementos DOM (Mantidos)
const seatGrid = document.getElementById('seat-grid');
const colLabelsContainer = document.getElementById('col-labels');
const seatCounter = document.getElementById('seat-counter');
const modal = document.getElementById('modal-box');
const modalDetails = document.getElementById('modal-details');
const cancelBtn = document.getElementById('cancel-btn');
const buyBtn = document.getElementById('buy-btn');

// Variáveis de estado (Mantidas)
let selectedSeat = null; 
let seatsData = []; 

// --- 1. Inicialização e Geração das Poltronas (NOVO) ---

function generateColLabels() {
    // Adiciona o espaçamento (gap) inicial no topo esquerdo
    const emptySpan = document.createElement('span');
    colLabelsContainer.appendChild(emptySpan);

    for (let col = 1; col <= COLS; col++) {
        const label = document.createElement('div');
        label.classList.add('col-label-item');
        label.textContent = col; // 1, 2, 3...
        colLabelsContainer.appendChild(label);
    }
}

function initializeSeats() {
    // Limpa e inicializa os dados
    seatGrid.innerHTML = '';
    colLabelsContainer.innerHTML = '';
    seatsData = [];
    
    generateColLabels(); // Gera os números (1 a 8) no topo

    let index = 0;
    for (const row of ROWS) {
        
        // 1. Cria o RÓTULO DA FILA (Letra A, B, C, D)
        const rowLabel = document.createElement('div');
        rowLabel.classList.add('row-label');
        rowLabel.textContent = row;
        seatGrid.appendChild(rowLabel);

        // 2. Cria as 8 POLTRONAS daquela fila
        for (let col = 1; col <= COLS; col++) {
            const seatId = `${row}${col}`; 
            const isOccupied = index % 5 === 0; 
            
            seatsData.push({
                id: seatId,
                row: row,
                col: col,
                status: isOccupied ? 'occupied' : 'free' 
            });

            const seatElement = document.createElement('div');
            seatElement.classList.add('seat', isOccupied ? 'occupied' : 'free');
            
            // ALTERAÇÃO: Remove o texto de dentro da poltrona
            seatElement.textContent = ''; 
            
            seatElement.dataset.id = seatId;
            seatElement.dataset.row = row;
            seatElement.dataset.col = col;

            seatElement.addEventListener('click', handleSeatClick);
            seatGrid.appendChild(seatElement);
            index++;
        }
    }
    updateCounter();
}

// --- 2. Manipulação de Eventos (Mantida) ---

function handleSeatClick(event) {
    const seat = event.target;
    const seatId = seat.dataset.id;
    const seatData = seatsData.find(s => s.id === seatId);

    if (seatData.status === 'occupied') {
        alert("Esta poltrona já está ocupada e indisponível.");
        return;
    }

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

// --- Ações do Modal (Mantidas) ---

buyBtn.addEventListener('click', () => {
    if (selectedSeat) {
        const seatId = selectedSeat.dataset.id;
        const seatData = seatsData.find(s => s.id === seatId);
        seatData.status = 'occupied';
        selectedSeat.classList.remove('selected');
        selectedSeat.classList.add('occupied');
        selectedSeat = null; 
        modal.style.display = 'none';
        updateCounter();
    }
});

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

// --- 3. Atualização do Contador (Mantida) ---

function updateCounter() {
    const occupiedCount = seatsData.filter(s => s.status === 'occupied').length;
    const selectedCount = seatsData.filter(s => s.status === 'selected').length;
    const totalOccupied = occupiedCount + selectedCount;

    seatCounter.textContent = `${totalOccupied}/${TOTAL_SEATS}`;
}

// Inicializa o sistema ao carregar a página
initializeSeats();