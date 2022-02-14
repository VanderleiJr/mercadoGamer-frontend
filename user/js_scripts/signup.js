function signup_user() {
    const form_signup_user = document.getElementById('form_signup_user')

    form_signup_user.onsubmit = async (event) => {
        event.preventDefault()

        try {
            await axios.post('http://127.0.0.1:8000/user/signup', {
                name: form_signup_user.name.value,
                cpf: form_signup_user.cpf.value,
                email: form_signup_user.email.value,
                telephone: form_signup_user.telephone.value,
                sex: form_signup_user.sex.value,
                birth_date: form_signup_user.birth_date.value,
                password: form_signup_user.password.value
            })
            alert(`Usuário cadastrado com sucesso! Bem-vindo ${form_signup_user.name.value}`)
            window.location.href = '../user/signin.html'
            return false
        } catch(e) {
            error_message = e.message
            if(error_message.includes('409')) {
                alert('CPF já cadastrado...')
            } 
        }
    }
}

function app(){
    signup_user()
}

app()
