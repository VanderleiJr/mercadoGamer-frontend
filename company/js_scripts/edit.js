window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

async function edit_company(){
    const form_edit_company = document.getElementById('form_edit_company')

    form_edit_company.onsubmit = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.put('http://127.0.0.1:8000/company/edit', {
                name: form_edit_company.name.value,
                email: form_edit_company.email.value,
                description: form_edit_company.description.value
            })
            alert('Empresa alterada com sucesso!')

        } catch(e) {
            error_message = e.message
            if(error_message.includes('401')) {
                alert('Logue-se como empresa para acessar... Redirecionando')
                window.location.href = '../copmany/signin.html'
            } 
        }
    }
}

function app(){
    edit_company()
}

app()