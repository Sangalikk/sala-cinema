const form = document.querySelector("#form")
const email = document.querySelector("#email")
const senha = document.querySelector("#senha")
const url = 'http://localhost/pw2/1030'
form.addEventListener('submit', async e => {
    e.preventDefault()
    const resposta = await post(`${url}/login`, {
        email: email.value, senha: senha.value
    })
    const dados = resposta.json(); 
})
const post = async (url, objeto) => {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(objeto)
    })
}