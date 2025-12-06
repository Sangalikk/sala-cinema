const url = 'http://localhost/salaCinema/sala-cinema/backend';
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', fazerLogin);

async function fazerLogin(e) {
    e.preventDefault();
    
    const email = emailInput.value;
    const senha = senhaInput.value;

    loginMessage.textContent = 'Autenticando...';
    loginMessage.style.color = '#008CBA';

    try {
        const response = await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email, 
                senha: senha 
            })
        });

        const data = await response.json();

        if (data.error) {
            loginMessage.textContent = data.error;
            loginMessage.style.color = '#f44336';
            return;
        }

        if (data.token && data.userId) {

            localStorage.setItem("Authorization", data.token);
            localStorage.setItem("user_id", data.userId);


            loginMessage.textContent = 'Login bem-sucedido!';
            loginMessage.style.color = '#4CAF50';

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
            
            return;
        }

        loginMessage.textContent = 'Erro inesperado no login.';
        loginMessage.style.color = '#f44336';

    } catch (err) {
        console.error("Erro no processo de login:", err);
        loginMessage.textContent = 'Erro: Não foi possível conectar ao servidor.';
        loginMessage.style.color = '#f44336';
    }
}
