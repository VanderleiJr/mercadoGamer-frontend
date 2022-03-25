function signin_company() {

    const form_signup_company = document.getElementById('form_signin_company')

    form_signin_company.onsubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post('http://127.0.0.1:8000/company/signin', {
                cnpj: form_signup_company.cnpj.value,
                password: form_signup_company.password.value
            }).then(response => {
                localStorage.setItem('token', response.data.access_token)
            })

            window.location.href = '../company/home.html'
            
        } catch(e) {
            error_message = e.message
            if(error_message.includes('404')) {
                alert('Empresa Não Encontrada!')
            } if(error_message.includes('400')) {
                alert('Senha Incorreta!')
            }
        }
    }
}

function app(){
    signin_company()
}

app()
