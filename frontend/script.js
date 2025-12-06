const url = 'http://localhost/salaCinema/sala-cinema/backend';

// =============================
// 1. VERIFICA LOGIN
// =============================
const token = localStorage.getItem("Authorization");
const userId = localStorage.getItem("user_id");

if (!token || !userId) {
    alert("Faça login para continuar.");
    window.location.href = "login.html";
}

// =============================
// 2. ELEMENTOS DO DOM
// =============================
const seatGrid = document.getElementById('seat-grid');
const colLabelsContainer = document.getElementById('col-labels');
const seatCounter = document.getElementById('seat-counter');
const modal = document.getElementById('modal-box');
const modalDetails = document.getElementById('modal-details');
const cancelBtn = document.getElementById('cancel-btn');
const buyBtn = document.getElementById('buy-btn');

let selectedSeat = null;  
let seatsData = [];       

const ROWS = ['A', 'B', 'C', 'D'];
const COLS = 8;
const TOTAL_SEATS = ROWS.length * COLS;

// =============================
// 3. BUSCA AS POLTRONAS DO BANCO
// =============================
async function loadSeats() {
    try {
        const response = await fetch(`${url}/poltronas`);
        seatsData = await response.json();

        renderSeatGrid();
    } catch (err) {
        console.error("Erro ao carregar poltronas:", err);
        alert("Erro ao carregar poltronas do servidor.");
    }
}

// =============================
// 4. GERA AS POLTRONAS NA TELA
// =============================
function renderSeatGrid() {
    seatGrid.innerHTML = '';
    colLabelsContainer.innerHTML = '';

    // topo dos números
    const emptySpan = document.createElement('span');
    colLabelsContainer.appendChild(emptySpan);

    for (let c = 1; c <= COLS; c++) {
        const div = document.createElement('div');
        div.classList.add('col-label-item');
        div.textContent = c;
        colLabelsContainer.appendChild(div);
    }

    // gerar grid
    for (const row of ROWS) {

        // rótulo da fila (letra)
        const rowLabel = document.createElement('div');
        rowLabel.classList.add('row-label');
        rowLabel.textContent = row;
        seatGrid.appendChild(rowLabel);

        for (let col = 1; col <= COLS; col++) {
            const seatObj = seatsData.find(s => s.fila === row && s.coluna == col);
            const seatElement = document.createElement('div');

            let status = 'free';
            if (seatObj.usuario_id != null) {
                status = 'occupied';
            }

            seatElement.classList.add('seat', status);
            seatElement.dataset.id = seatObj.id;
            seatElement.dataset.row = row;
            seatElement.dataset.col = col;

            seatElement.textContent = ""; // sem texto

            seatElement.addEventListener('click', handleSeatClick);
            seatGrid.appendChild(seatElement);
        }
    }

    updateCounter();
}

// =============================
// 5. SELECIONA POLTRONA
// =============================
function handleSeatClick(e) {
    const seatElement = e.target;
    const seatId = seatElement.dataset.id;
    const seatObj = seatsData.find(s => s.id == seatId);

    if (seatObj.usuario_id != null) {
        alert("Essa poltrona já está ocupada.");
        return;
    }

    const userAlreadyReserved = seatsData.some(s => s.usuario_id == userId);

    if (userAlreadyReserved) {
        alert("Você já reservou uma poltrona. Só é permitido 1 por usuário.");
        return;
    }

    selectedSeat = seatObj;

    modalDetails.textContent = `Poltrona: ${seatObj.fila}${seatObj.coluna}`;
    modal.style.display = 'block';
}

// =============================
// 6. CONFIRMAR COMPRA
// =============================
buyBtn.addEventListener('click', async () => {
    if (!selectedSeat) return;

    try {
        const response = await fetch(`${url}/poltronas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                id: selectedSeat.id,
                user_id: userId
            })
        });

        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        alert("Poltrona reservada com sucesso!");

        modal.style.display = 'none';
        await loadSeats(); // recarrega poltronas

    } catch (err) {
        console.error("Erro ao reservar:", err);
    }
});

// =============================
// 7. CANCELAR MODAL
// =============================
cancelBtn.addEventListener('click', () => {
    selectedSeat = null;
    modal.style.display = 'none';
});

// =============================
// 8. CONTADOR
// =============================
function updateCounter() {
    const occupied = seatsData.filter(s => s.usuario_id != null).length;
    seatCounter.textContent = `${occupied}/${TOTAL_SEATS}`;
}

// =============================
// 9. INICIA A TELA
// =============================
loadSeats();
