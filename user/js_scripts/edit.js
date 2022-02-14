window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

async function edit_user(){
    const form_edit_user = document.getElementById('form_edit_user')

    form_edit_user.onsubmit = async (event) => {
        event.preventDefault()
        try{
            const response = await axios.put('http://127.0.0.1:8000/user/edit', {
                name: form_edit_user.name.value,
                email: form_edit_user.email.value,
                telephone: form_edit_user.telephone.value,
                sex: form_edit_user.sex.value,
                birth_date: form_edit_user.birth_date.value
            })
            alert('Usuário alterado com sucesso!')

        } catch(e) {
            error_message = e.message
            if(error_message.includes('401')) {
                alert('Logue-se como usuário para acessar... Redirecionando')
                window.location.href = '../user/signin.html'
            } 
        }
    }
}

function app(){
    edit_user()
}

app()