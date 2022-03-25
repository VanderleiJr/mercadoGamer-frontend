function signup_company() {
    const form_signup_company = document.getElementById('form_signup_company')

    form_signup_company.onsubmit = async (event) => {
        event.preventDefault()

        try {
            await axios.post('http://127.0.0.1:8000/company/signup', {
                name: form_signup_company.name.value,
                cnpj: form_signup_company.cnpj.value,
                email: form_signup_company.email.value,
                description: form_signup_company.description.value,
                password: form_signup_company.password.value
            })
            alert(`Empresa cadastrada com sucesso! Bem-vindos ${form_signup_company.name.value}`)
            window.location.href = '../company/signin.html'
        } catch(e) {
            error_message = e.message
            if(error_message.includes('409')) {
                alert('CNPJ já cadastrado...')
            } 
        }
    }
}

function app(){
    signup_company()
}

app()
