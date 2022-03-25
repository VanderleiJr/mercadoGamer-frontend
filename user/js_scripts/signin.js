function signin_user() {

    const form_signup_user = document.getElementById('form_signin_user')

    form_signin_user.onsubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post('http://127.0.0.1:8000/user/signin', {
                cpf: form_signup_user.cpf.value,
                password: form_signup_user.password.value
            }).then(response => {
                localStorage.setItem('token', response.data.access_token)
                window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
            })

            window.location.href = '../user/home.html'

        } catch(e) {
            error_message = e.message
            if(error_message.includes('404')) {
                alert('Usuário Não Encontrado!')
            } if(error_message.includes('400')) {
                alert('Senha Incorreta!')
            }
        }
    }
}

function app(){
    signin_user()
}

app()
