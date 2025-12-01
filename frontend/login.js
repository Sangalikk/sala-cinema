const API_AUTH_URL = 'api.php'; // Aponta para o seu manipulador PHP
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', handleLogin);

async function handleLogin(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    const email = emailInput.value;
    const senha = senhaInput.value;
    
    // Limpa a mensagem anterior
    loginMessage.textContent = 'Autenticando...';
    loginMessage.style.color = '#008CBA'; // Cor de carregamento
    
    try {
        const response = await fetch(API_AUTH_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            // Envia a ação, email e senha (IMPORTANTE: Lembre-se que senhas devem ser hasheadas no back-end)
            body: JSON.stringify({ 
                action: 'login', 
                email: email, 
                senha: senha // A senha é enviada em texto e comparada com o hash no PHP
            }) 
        });

        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            // LOGIN BEM-SUCEDIDO
            loginMessage.textContent = 'Login bem-sucedido!';
            loginMessage.style.color = '#4CAF50'; // Verde
            
            // Armazenar informações do usuário (como token/ID) no LocalStorage ou Cookie
            // Para simplicidade, vamos apenas redirecionar:
            // O back-end idealmente retornaria o ID do usuário para ser usado na reserva.
            
            alert('Bem-vindo(a)! Redirecionando para o mapa de reservas.');
            window.location.href = 'index.html'; 
            
        } else {
            // LOGIN FALHOU (ex: senha ou email incorretos)
            loginMessage.textContent = result.message || 'Email ou senha inválidos.';
            loginMessage.style.color = '#f44336'; // Vermelho
        }

    } catch (error) {
        console.error("Erro no processo de login:", error);
        loginMessage.textContent = `Erro: Não foi possível conectar ao servidor.`;
        loginMessage.style.color = '#f44336'; 
    }
}